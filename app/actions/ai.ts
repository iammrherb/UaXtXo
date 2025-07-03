"use server"

import { sql } from "@/lib/db"
import { aiInsightGenerator } from "@/lib/ai/insight-generator"
import type { NewVendorData } from "@/lib/vendors/data"
import type { RiskAssessmentResult } from "@/lib/compliance/risk-assessment"

export async function generateAIInsights(
  vendors: NewVendorData[],
  riskAssessments: Record<string, RiskAssessmentResult>,
  industry: string,
  orgSize: string,
  forceRegenerate = false,
) {
  const vendorIds = vendors.map((v) => v.id).sort()
  const cacheKey = `${vendorIds.join(",")}-${industry}-${orgSize}`

  try {
    // Check cache first (unless force regenerate)
    if (!forceRegenerate) {
      const cached = await sql`
        SELECT * FROM ai_insights 
        WHERE vendor_ids = ${JSON.stringify(vendorIds)}
        AND industry = ${industry}
        AND org_size = ${orgSize}
        AND expires_at > NOW()
        ORDER BY created_at DESC
        LIMIT 1
      `

      if (cached.length > 0) {
        return {
          success: true,
          data: cached[0].content,
          cached: true,
        }
      }
    }

    // Generate new insights
    const [executiveSummary, insights, recommendations] = await Promise.all([
      aiInsightGenerator.generateExecutiveSummary(vendors, riskAssessments, industry, orgSize),
      aiInsightGenerator.generateInsights(vendors, riskAssessments, industry, orgSize),
      aiInsightGenerator.generateRecommendations(vendors, riskAssessments, industry, orgSize),
    ])

    const aiData = {
      executiveSummary,
      insights,
      recommendations,
      metadata: {
        vendorCount: vendors.length,
        avgRiskScore:
          Object.values(riskAssessments).reduce((sum, r) => sum + r.overallRiskScore, 0) /
          Object.values(riskAssessments).length,
        totalGaps: Object.values(riskAssessments).reduce((sum, r) => sum + r.complianceGaps.length, 0),
        generatedAt: new Date().toISOString(),
      },
    }

    // Cache the results
    await sql`
      INSERT INTO ai_insights (vendor_ids, industry, org_size, insight_type, content, confidence_score)
      VALUES (
        ${JSON.stringify(vendorIds)},
        ${industry},
        ${orgSize},
        'comprehensive',
        ${JSON.stringify(aiData)},
        0.85
      )
    `

    return {
      success: true,
      data: aiData,
      cached: false,
    }
  } catch (error) {
    console.error("Error generating AI insights:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate insights",
      cached: false,
    }
  }
}

export async function saveReport(
  name: string,
  description: string,
  templateData: any,
  vendorIds: string[],
  industry: string,
  orgSize: string,
) {
  try {
    const result = await sql`
      INSERT INTO reports (name, description, template_data, vendor_ids, industry, org_size)
      VALUES (
        ${name},
        ${description},
        ${JSON.stringify(templateData)},
        ${JSON.stringify(vendorIds)},
        ${industry},
        ${orgSize}
      )
      RETURNING *
    `

    return {
      success: true,
      report: result[0],
    }
  } catch (error) {
    console.error("Error saving report:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save report",
    }
  }
}

export async function getReports(industry?: string, orgSize?: string) {
  try {
    let query = sql`SELECT * FROM reports ORDER BY created_at DESC`

    if (industry && orgSize) {
      query = sql`
        SELECT * FROM reports 
        WHERE industry = ${industry} AND org_size = ${orgSize}
        ORDER BY created_at DESC
      `
    }

    const reports = await query

    return {
      success: true,
      reports,
    }
  } catch (error) {
    console.error("Error fetching reports:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch reports",
    }
  }
}
