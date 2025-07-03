"use server"

import { createHash } from "crypto"
import { sql } from "@/lib/db"
import { aiInsightGenerator } from "@/lib/ai/insight-generator"
import type { NewVendorData } from "@/lib/vendors/data"
import type { RiskAssessmentResult } from "@/lib/compliance/risk-assessment"
import type { IndustryId, OrgSizeId } from "@/types/common"
import type { ExecutiveSummary, AIInsight, SmartRecommendation } from "@/lib/ai/insight-generator"

function generateCacheKey(data: any): string {
  const hash = createHash("sha256")
  hash.update(JSON.stringify(data))
  return hash.digest("hex")
}

interface AIResults {
  executiveSummary: ExecutiveSummary
  insights: AIInsight[]
  recommendations: SmartRecommendation[]
  trendAnalysis: string
  fromCache: boolean
}

export async function getOrGenerateAIAnalysis(
  vendors: NewVendorData[],
  riskAssessments: Record<string, RiskAssessmentResult>,
  industry: IndustryId,
  orgSize: OrgSizeId,
): Promise<AIResults> {
  const context = {
    vendorIds: vendors.map((v) => v.id).sort(),
    riskAssessmentKeys: Object.keys(riskAssessments).sort(),
    industry,
    orgSize,
  }
  const cacheKey = generateCacheKey(context)

  // Check cache first
  const [cachedSummary, cachedInsights, cachedRecs, cachedTrends] = await Promise.all([
    sql`SELECT summary FROM ai_executive_summaries WHERE cache_key = ${cacheKey}`,
    sql`SELECT insights FROM ai_insights WHERE cache_key = ${cacheKey}`,
    sql`SELECT recommendations FROM ai_recommendations WHERE cache_key = ${cacheKey}`,
    sql`SELECT analysis FROM ai_trend_analysis WHERE cache_key = ${cacheKey}`,
  ])

  if (
    cachedSummary.rows.length > 0 &&
    cachedInsights.rows.length > 0 &&
    cachedRecs.rows.length > 0 &&
    cachedTrends.rows.length > 0
  ) {
    console.log("AI analysis found in cache.")
    return {
      executiveSummary: cachedSummary.rows[0].summary as ExecutiveSummary,
      insights: cachedInsights.rows[0].insights as AIInsight[],
      recommendations: cachedRecs.rows[0].recommendations as SmartRecommendation[],
      trendAnalysis: cachedTrends.rows[0].analysis as string,
      fromCache: true,
    }
  }

  console.log("AI analysis not in cache. Generating...")

  // If not in cache, generate and store
  const [executiveSummary, insights, recommendations, trendAnalysis] = await Promise.all([
    aiInsightGenerator.generateExecutiveSummary(vendors, riskAssessments, industry, orgSize),
    aiInsightGenerator.generateInsights(vendors, riskAssessments, industry, orgSize),
    aiInsightGenerator.generateSmartRecommendations(vendors, riskAssessments, industry, orgSize),
    aiInsightGenerator.generateTrendAnalysis(vendors, riskAssessments, industry),
  ])

  // Store in DB
  await Promise.all([
    sql`INSERT INTO ai_executive_summaries (cache_key, summary) VALUES (${cacheKey}, ${JSON.stringify(executiveSummary)}) ON CONFLICT (cache_key) DO UPDATE SET summary = EXCLUDED.summary, created_at = NOW()`,
    sql`INSERT INTO ai_insights (cache_key, insights) VALUES (${cacheKey}, ${JSON.stringify(insights)}) ON CONFLICT (cache_key) DO UPDATE SET insights = EXCLUDED.insights, created_at = NOW()`,
    sql`INSERT INTO ai_recommendations (cache_key, recommendations) VALUES (${cacheKey}, ${JSON.stringify(recommendations)}) ON CONFLICT (cache_key) DO UPDATE SET recommendations = EXCLUDED.recommendations, created_at = NOW()`,
    sql`INSERT INTO ai_trend_analysis (cache_key, analysis) VALUES (${cacheKey}, ${trendAnalysis}) ON CONFLICT (cache_key) DO UPDATE SET analysis = EXCLUDED.analysis, created_at = NOW()`,
  ])

  console.log("AI analysis generated and cached.")

  return { executiveSummary, insights, recommendations, trendAnalysis, fromCache: false }
}
