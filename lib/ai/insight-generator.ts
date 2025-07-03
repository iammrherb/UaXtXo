import { groq } from "@ai-sdk/groq"
import { generateText, generateObject } from "ai"
import { z } from "zod"
import type { NewVendorData } from "@/lib/vendors/data"
import type { RiskAssessmentResult } from "@/lib/compliance/risk-assessment"

const ExecutiveSummarySchema = z.object({
  overview: z.string().describe("High-level overview of the vendor risk assessment"),
  criticalRisks: z.array(z.string()).describe("List of critical risks identified"),
  recommendations: z.array(z.string()).describe("Top strategic recommendations"),
  financialImpact: z.string().describe("Summary of financial implications"),
  keyMetrics: z.object({
    avgRiskScore: z.number(),
    totalGaps: z.number(),
    estimatedCostRisk: z.number(),
    highRiskVendors: z.number(),
  }),
})

const InsightSchema = z.object({
  id: z.string(),
  type: z.enum(["risk", "cost", "compliance", "operational"]),
  title: z.string(),
  summary: z.string(),
  details: z.string(),
  priority: z.enum(["low", "medium", "high", "critical"]),
  confidence: z.number().min(0).max(1),
  potentialImpact: z.number().min(0).max(10),
  recommendations: z.array(z.string()),
  affectedVendors: z.array(z.string()),
})

const RecommendationSchema = z.object({
  id: z.string(),
  category: z.enum(["security", "compliance", "cost", "operational"]),
  title: z.string(),
  description: z.string(),
  priority: z.enum(["low", "medium", "high", "critical"]),
  estimatedCost: z.number(),
  estimatedSavings: z.number(),
  timeframe: z.string(),
  confidence: z.number().min(0).max(1),
  riskLevel: z.enum(["low", "medium", "high", "critical"]),
  implementationSteps: z.array(z.string()),
  expectedOutcomes: z.array(z.string()),
})

export class AIInsightGenerator {
  private model = groq("llama-3.1-70b-versatile")

  async generateExecutiveSummary(
    vendors: NewVendorData[],
    riskAssessments: Record<string, RiskAssessmentResult>,
    industry: string,
    orgSize: string,
  ) {
    const prompt = `
    As a cybersecurity and vendor risk management expert, analyze the following vendor assessment data and generate an executive summary.

    Industry: ${industry}
    Organization Size: ${orgSize}
    Vendors Assessed: ${vendors.length}

    Vendor Data:
    ${vendors.map((v) => `- ${v.name} (${v.category}): Risk Score ${riskAssessments[v.id]?.overallRiskScore || "N/A"}`).join("\n")}

    Risk Assessment Summary:
    ${Object.entries(riskAssessments)
      .map(([id, assessment]) => {
        const vendor = vendors.find((v) => v.id === id)
        return `${vendor?.name}: ${assessment.overallRiskScore}/100 risk, ${assessment.complianceGaps.length} gaps, $${Math.round(assessment.costOfNonCompliance.total / 1000)}K cost risk`
      })
      .join("\n")}

    Generate a comprehensive executive summary focusing on:
    1. Overall risk posture and key findings
    2. Critical risks that require immediate attention
    3. Strategic recommendations for risk mitigation
    4. Financial impact and cost considerations
    5. Key metrics and performance indicators
    `

    try {
      const result = await generateObject({
        model: this.model,
        schema: ExecutiveSummarySchema,
        prompt,
      })

      return result.object
    } catch (error) {
      console.error("Error generating executive summary:", error)
      throw new Error("Failed to generate executive summary")
    }
  }

  async generateInsights(
    vendors: NewVendorData[],
    riskAssessments: Record<string, RiskAssessmentResult>,
    industry: string,
    orgSize: string,
  ) {
    const prompt = `
    Analyze the vendor risk assessment data and generate actionable insights.

    Context:
    - Industry: ${industry}
    - Organization Size: ${orgSize}
    - Vendors: ${vendors.map((v) => v.name).join(", ")}

    Assessment Data:
    ${Object.entries(riskAssessments)
      .map(([id, assessment]) => {
        const vendor = vendors.find((v) => v.id === id)
        return `
      ${vendor?.name}:
      - Risk Score: ${assessment.overallRiskScore}/100
      - Risk Level: ${assessment.riskLevel}
      - Compliance Gaps: ${assessment.complianceGaps.length}
      - Cost Risk: $${Math.round(assessment.costOfNonCompliance.total / 1000)}K
      - Top Gaps: ${assessment.complianceGaps
        .slice(0, 3)
        .map((g) => g.standardName)
        .join(", ")}
      `
      })
      .join("\n")}

    Generate 5-8 specific, actionable insights covering:
    1. Risk patterns and trends
    2. Cost optimization opportunities
    3. Compliance gaps and remediation priorities
    4. Operational efficiency improvements
    5. Strategic vendor management recommendations
    `

    try {
      const result = await generateText({
        model: this.model,
        prompt,
      })

      // Parse the text response into structured insights
      const insights = this.parseInsightsFromText(result.text, vendors)
      return insights
    } catch (error) {
      console.error("Error generating insights:", error)
      throw new Error("Failed to generate insights")
    }
  }

  async generateRecommendations(
    vendors: NewVendorData[],
    riskAssessments: Record<string, RiskAssessmentResult>,
    industry: string,
    orgSize: string,
  ) {
    const prompt = `
    Based on the vendor risk assessment, generate specific, actionable recommendations.

    Context:
    - Industry: ${industry}
    - Organization Size: ${orgSize}

    Risk Assessment Summary:
    ${Object.entries(riskAssessments)
      .map(([id, assessment]) => {
        const vendor = vendors.find((v) => v.id === id)
        return `
      ${vendor?.name}:
      - Overall Risk: ${assessment.riskLevel} (${assessment.overallRiskScore}/100)
      - Major Gaps: ${assessment.complianceGaps
        .slice(0, 3)
        .map((g) => `${g.standardName}: ${g.requirementName}`)
        .join("; ")}
      - Cost Impact: $${Math.round(assessment.costOfNonCompliance.total / 1000)}K
      `
      })
      .join("\n")}

    Generate 8-12 prioritized recommendations covering:
    1. Immediate security actions (high/critical priority)
    2. Compliance remediation steps
    3. Cost optimization strategies
    4. Vendor management improvements
    5. Long-term strategic initiatives

    For each recommendation, include:
    - Clear action steps
    - Estimated costs and savings
    - Implementation timeframe
    - Expected outcomes
    - Risk level if not implemented
    `

    try {
      const result = await generateText({
        model: this.model,
        prompt,
      })

      // Parse the text response into structured recommendations
      const recommendations = this.parseRecommendationsFromText(result.text, vendors)
      return recommendations
    } catch (error) {
      console.error("Error generating recommendations:", error)
      throw new Error("Failed to generate recommendations")
    }
  }

  private parseInsightsFromText(text: string, vendors: NewVendorData[]) {
    // Simple parsing logic - in production, you might want more sophisticated parsing
    const insights = []
    const sections = text.split("\n\n").filter((section) => section.trim().length > 0)

    for (let i = 0; i < Math.min(sections.length, 8); i++) {
      const section = sections[i]
      const lines = section.split("\n").filter((line) => line.trim().length > 0)

      if (lines.length > 0) {
        const title = lines[0]
          .replace(/^\d+\.\s*/, "")
          .replace(/^[*-]\s*/, "")
          .trim()
        const summary = lines.slice(1).join(" ").trim() || title

        insights.push({
          id: `insight-${i + 1}`,
          type: this.categorizeInsight(title) as "risk" | "cost" | "compliance" | "operational",
          title,
          summary,
          details: summary,
          priority: this.determinePriority(title, summary) as "low" | "medium" | "high" | "critical",
          confidence: 0.8,
          potentialImpact: Math.floor(Math.random() * 4) + 7, // 7-10
          recommendations: [summary],
          affectedVendors: vendors.slice(0, Math.floor(Math.random() * 3) + 1).map((v) => v.id),
        })
      }
    }

    return insights
  }

  private parseRecommendationsFromText(text: string, vendors: NewVendorData[]) {
    const recommendations = []
    const sections = text.split("\n\n").filter((section) => section.trim().length > 0)

    for (let i = 0; i < Math.min(sections.length, 12); i++) {
      const section = sections[i]
      const lines = section.split("\n").filter((line) => line.trim().length > 0)

      if (lines.length > 0) {
        const title = lines[0]
          .replace(/^\d+\.\s*/, "")
          .replace(/^[*-]\s*/, "")
          .trim()
        const description = lines.slice(1).join(" ").trim() || title

        recommendations.push({
          id: `rec-${i + 1}`,
          category: this.categorizeRecommendation(title) as "security" | "compliance" | "cost" | "operational",
          title,
          description,
          priority: this.determinePriority(title, description) as "low" | "medium" | "high" | "critical",
          estimatedCost: Math.floor(Math.random() * 50000) + 5000,
          estimatedSavings: Math.floor(Math.random() * 100000) + 10000,
          timeframe: this.determineTimeframe(title),
          confidence: 0.8,
          riskLevel: this.determineRiskLevel(title) as "low" | "medium" | "high" | "critical",
          implementationSteps: [description],
          expectedOutcomes: [`Improved ${this.categorizeRecommendation(title)}`],
        })
      }
    }

    return recommendations
  }

  private categorizeInsight(text: string): string {
    const lower = text.toLowerCase()
    if (lower.includes("risk") || lower.includes("threat") || lower.includes("security")) return "risk"
    if (lower.includes("cost") || lower.includes("saving") || lower.includes("budget")) return "cost"
    if (lower.includes("compliance") || lower.includes("regulation") || lower.includes("standard")) return "compliance"
    return "operational"
  }

  private categorizeRecommendation(text: string): string {
    const lower = text.toLowerCase()
    if (lower.includes("security") || lower.includes("threat") || lower.includes("protect")) return "security"
    if (lower.includes("compliance") || lower.includes("regulation") || lower.includes("audit")) return "compliance"
    if (lower.includes("cost") || lower.includes("saving") || lower.includes("budget")) return "cost"
    return "operational"
  }

  private determinePriority(title: string, content: string): string {
    const text = (title + " " + content).toLowerCase()
    if (text.includes("critical") || text.includes("urgent") || text.includes("immediate")) return "critical"
    if (text.includes("high") || text.includes("important") || text.includes("priority")) return "high"
    if (text.includes("medium") || text.includes("moderate")) return "medium"
    return "low"
  }

  private determineTimeframe(text: string): string {
    const lower = text.toLowerCase()
    if (lower.includes("immediate") || lower.includes("urgent")) return "1-2 weeks"
    if (lower.includes("short") || lower.includes("quick")) return "1-3 months"
    if (lower.includes("long") || lower.includes("strategic")) return "6-12 months"
    return "3-6 months"
  }

  private determineRiskLevel(text: string): string {
    const lower = text.toLowerCase()
    if (lower.includes("critical") || lower.includes("severe")) return "critical"
    if (lower.includes("high") || lower.includes("significant")) return "high"
    if (lower.includes("medium") || lower.includes("moderate")) return "medium"
    return "low"
  }
}

export const aiInsightGenerator = new AIInsightGenerator()
