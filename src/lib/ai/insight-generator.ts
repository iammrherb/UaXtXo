import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"
import { groq } from "@ai-sdk/groq"
import type { NewVendorData } from "@/lib/vendors/data"
import type { RiskAssessmentResult } from "@/lib/compliance/risk-assessment"
import type { IndustryId, OrgSizeId } from "@/types/common"

export interface AIInsight {
  id: string
  type: "risk_analysis" | "cost_optimization" | "compliance_gap" | "strategic_recommendation" | "trend_analysis"
  title: string
  summary: string
  details: string
  priority: "critical" | "high" | "medium" | "low"
  confidence: number // 0-100
  actionItems: string[]
  potentialImpact: {
    financial: number
    operational: string
    compliance: string
  }
  timeframe: string
  relatedVendors: string[]
}

export interface SmartRecommendation {
  id: string
  category: "security" | "compliance" | "cost" | "operational" | "strategic"
  title: string
  description: string
  rationale: string
  expectedBenefits: string[]
  implementationSteps: string[]
  estimatedCost: number
  estimatedSavings: number
  timeToImplement: string
  riskLevel: "low" | "medium" | "high"
  confidence: number
  affectedVendors: string[]
}

export interface ExecutiveSummary {
  overview: string
  keyFindings: string[]
  criticalRisks: string[]
  recommendations: string[]
  financialImpact: string
  timeline: string
  nextSteps: string[]
}

class AIInsightGenerator {
  private primaryModel = xai("grok-3")
  private fallbackModel = groq("llama-3.3-70b-versatile")

  async generateInsights(
    vendors: NewVendorData[],
    riskAssessments: Record<string, RiskAssessmentResult>,
    industry: IndustryId,
    orgSize: OrgSizeId,
  ): Promise<AIInsight[]> {
    const prompt = this.buildInsightsPrompt(vendors, riskAssessments, industry, orgSize)

    try {
      const { text } = await generateText({
        model: this.primaryModel,
        prompt,
        maxTokens: 4000,
        temperature: 0.7,
      })

      return this.parseInsightsResponse(text)
    } catch (error) {
      console.warn("Primary AI model failed, using fallback:", error)

      try {
        const { text } = await generateText({
          model: this.fallbackModel,
          prompt,
          maxTokens: 4000,
          temperature: 0.7,
        })

        return this.parseInsightsResponse(text)
      } catch (fallbackError) {
        console.error("Both AI models failed:", fallbackError)
        return this.generateFallbackInsights(vendors, riskAssessments)
      }
    }
  }

  async generateSmartRecommendations(
    vendors: NewVendorData[],
    riskAssessments: Record<string, RiskAssessmentResult>,
    industry: IndustryId,
    orgSize: OrgSizeId,
  ): Promise<SmartRecommendation[]> {
    const prompt = this.buildRecommendationsPrompt(vendors, riskAssessments, industry, orgSize)

    try {
      const { text } = await generateText({
        model: this.primaryModel,
        prompt,
        maxTokens: 3000,
        temperature: 0.6,
      })

      return this.parseRecommendationsResponse(text)
    } catch (error) {
      console.warn("Primary AI model failed for recommendations, using fallback:", error)

      try {
        const { text } = await generateText({
          model: this.fallbackModel,
          prompt,
          maxTokens: 3000,
          temperature: 0.6,
        })

        return this.parseRecommendationsResponse(text)
      } catch (fallbackError) {
        console.error("Both AI models failed for recommendations:", fallbackError)
        return this.generateFallbackRecommendations(vendors, riskAssessments)
      }
    }
  }

  async generateExecutiveSummary(
    vendors: NewVendorData[],
    riskAssessments: Record<string, RiskAssessmentResult>,
    industry: IndustryId,
    orgSize: OrgSizeId,
  ): Promise<ExecutiveSummary> {
    const prompt = this.buildExecutiveSummaryPrompt(vendors, riskAssessments, industry, orgSize)

    try {
      const { text } = await generateText({
        model: this.primaryModel,
        prompt,
        maxTokens: 2000,
        temperature: 0.5,
      })

      return this.parseExecutiveSummaryResponse(text)
    } catch (error) {
      console.warn("Primary AI model failed for executive summary, using fallback:", error)

      try {
        const { text } = await generateText({
          model: this.fallbackModel,
          prompt,
          maxTokens: 2000,
          temperature: 0.5,
        })

        return this.parseExecutiveSummaryResponse(text)
      } catch (fallbackError) {
        console.error("Both AI models failed for executive summary:", fallbackError)
        return this.generateFallbackExecutiveSummary(vendors, riskAssessments, industry)
      }
    }
  }

  async generateTrendAnalysis(
    vendors: NewVendorData[],
    riskAssessments: Record<string, RiskAssessmentResult>,
    industry: IndustryId,
  ): Promise<string> {
    const prompt = this.buildTrendAnalysisPrompt(vendors, riskAssessments, industry)

    try {
      const { text } = await generateText({
        model: this.primaryModel,
        prompt,
        maxTokens: 1500,
        temperature: 0.6,
      })

      return text
    } catch (error) {
      console.warn("Primary AI model failed for trend analysis, using fallback:", error)

      try {
        const { text } = await generateText({
          model: this.fallbackModel,
          prompt,
          maxTokens: 1500,
          temperature: 0.6,
        })

        return text
      } catch (fallbackError) {
        console.error("Both AI models failed for trend analysis:", fallbackError)
        return this.generateFallbackTrendAnalysis(industry)
      }
    }
  }

  private buildInsightsPrompt(
    vendors: NewVendorData[],
    riskAssessments: Record<string, RiskAssessmentResult>,
    industry: IndustryId,
    orgSize: OrgSizeId,
  ): string {
    const vendorSummary = vendors.map((v) => `${v.name} (${v.vendorType})`).join(", ")
    const avgRiskScore =
      Object.values(riskAssessments).reduce((sum, r) => sum + r.overallRiskScore, 0) /
      Object.values(riskAssessments).length
    const totalGaps = Object.values(riskAssessments).reduce((sum, r) => sum + r.complianceGaps.length, 0)

    return `As a cybersecurity and compliance expert, analyze the following NAC vendor assessment data and generate 3-5 key insights in JSON format.

Industry: ${industry.replace("_", " ")}
Organization Size: ${orgSize.replace("_", " ")}
Vendors: ${vendorSummary}
Average Risk Score: ${Math.round(avgRiskScore)}/100
Total Compliance Gaps: ${totalGaps}

Risk Assessment Summary:
${Object.entries(riskAssessments)
  .map(
    ([vendorId, assessment]) =>
      `${vendorId}: Risk Level ${assessment.riskLevel}, Score ${assessment.overallRiskScore}, ${assessment.complianceGaps.length} gaps`,
  )
  .join("\n")}

Generate insights as a JSON array with this structure:
[{
  "id": "unique_id",
  "type": "risk_analysis|cost_optimization|compliance_gap|strategic_recommendation|trend_analysis",
  "title": "Brief title",
  "summary": "2-3 sentence summary",
  "details": "Detailed analysis paragraph",
  "priority": "critical|high|medium|low",
  "confidence": 85,
  "actionItems": ["action1", "action2"],
  "potentialImpact": {
    "financial": 50000,
    "operational": "description",
    "compliance": "description"
  },
  "timeframe": "timeframe description",
  "relatedVendors": ["vendor1", "vendor2"]
}]

Focus on actionable insights that help decision-makers understand risks, costs, and strategic implications.`
  }

  private buildRecommendationsPrompt(
    vendors: NewVendorData[],
    riskAssessments: Record<string, RiskAssessmentResult>,
    industry: IndustryId,
    orgSize: OrgSizeId,
  ): string {
    const criticalGaps = Object.values(riskAssessments).flatMap((r) =>
      r.complianceGaps.filter((g) => g.businessImpact === "critical"),
    )

    return `As a cybersecurity consultant, provide 3-4 strategic recommendations based on this NAC vendor analysis.

Industry: ${industry.replace("_", " ")}
Organization Size: ${orgSize.replace("_", " ")}
Critical Compliance Gaps: ${criticalGaps.length}

Vendor Analysis:
${vendors.map((v) => `${v.name}: ${v.strengths?.slice(0, 2).join(", ")} | Weaknesses: ${v.weaknesses?.slice(0, 2).join(", ")}`).join("\n")}

Generate recommendations as JSON array:
[{
  "id": "unique_id",
  "category": "security|compliance|cost|operational|strategic",
  "title": "Recommendation title",
  "description": "Brief description",
  "rationale": "Why this recommendation",
  "expectedBenefits": ["benefit1", "benefit2"],
  "implementationSteps": ["step1", "step2", "step3"],
  "estimatedCost": 75000,
  "estimatedSavings": 150000,
  "timeToImplement": "3-6 months",
  "riskLevel": "low|medium|high",
  "confidence": 90,
  "affectedVendors": ["vendor1"]
}]

Focus on practical, business-focused recommendations with clear ROI.`
  }

  private buildExecutiveSummaryPrompt(
    vendors: NewVendorData[],
    riskAssessments: Record<string, RiskAssessmentResult>,
    industry: IndustryId,
    orgSize: OrgSizeId,
  ): string {
    const totalCostRisk = Object.values(riskAssessments).reduce((sum, r) => sum + r.costOfNonCompliance.total, 0)

    return `Create an executive summary for a ${industry.replace("_", " ")} organization's NAC vendor assessment.

Key Data:
- ${vendors.length} vendors evaluated
- Total cost at risk: $${Math.round(totalCostRisk / 1000)}K
- Organization size: ${orgSize.replace("_", " ")}

Vendor Performance:
${Object.entries(riskAssessments)
  .map(([id, assessment]) => `${id}: ${assessment.riskLevel} risk (${assessment.overallRiskScore}/100)`)
  .join("\n")}

Generate as JSON:
{
  "overview": "2-3 sentence executive overview",
  "keyFindings": ["finding1", "finding2", "finding3"],
  "criticalRisks": ["risk1", "risk2"],
  "recommendations": ["rec1", "rec2", "rec3"],
  "financialImpact": "Financial impact summary",
  "timeline": "Implementation timeline",
  "nextSteps": ["step1", "step2", "step3", "step4"]
}

Write for C-level executives focusing on business impact, not technical details.`
  }

  private buildTrendAnalysisPrompt(
    vendors: NewVendorData[],
    riskAssessments: Record<string, RiskAssessmentResult>,
    industry: IndustryId,
  ): string {
    return `Analyze current trends in NAC solutions for the ${industry.replace("_", " ")} industry based on this vendor assessment.

Vendors Analyzed: ${vendors.map((v) => `${v.name} (${v.vendorType})`).join(", ")}

Key Observations:
- Cloud-native vs Traditional solutions
- Compliance automation capabilities
- Cost structures and TCO trends
- Industry-specific requirements

Provide a comprehensive trend analysis covering:
1. Market direction and vendor positioning
2. Technology evolution (cloud-native, AI/ML, automation)
3. Compliance and regulatory trends
4. Cost optimization opportunities
5. Future recommendations for ${industry.replace("_", " ")} organizations

Write 3-4 paragraphs with actionable insights for strategic planning.`
  }

  private parseInsightsResponse(text: string): AIInsight[] {
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      // If no JSON found, return fallback
      return this.generateFallbackInsights([], {})
    } catch (error) {
      console.error("Failed to parse insights response:", error)
      return this.generateFallbackInsights([], {})
    }
  }

  private parseRecommendationsResponse(text: string): SmartRecommendation[] {
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      return this.generateFallbackRecommendations([], {})
    } catch (error) {
      console.error("Failed to parse recommendations response:", error)
      return this.generateFallbackRecommendations([], {})
    }
  }

  private parseExecutiveSummaryResponse(text: string): ExecutiveSummary {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      return this.generateFallbackExecutiveSummary([], {}, "technology")
    } catch (error) {
      console.error("Failed to parse executive summary response:", error)
      return this.generateFallbackExecutiveSummary([], {}, "technology")
    }
  }

  private generateFallbackInsights(
    vendors: NewVendorData[],
    riskAssessments: Record<string, RiskAssessmentResult>,
  ): AIInsight[] {
    return [
      {
        id: "fallback-risk-1",
        type: "risk_analysis",
        title: "Vendor Risk Assessment Complete",
        summary:
          "Analysis of selected NAC vendors reveals varying risk levels across compliance and operational dimensions.",
        details:
          "The assessment shows different risk profiles among vendors, with traditional solutions showing higher operational complexity while cloud-native solutions demonstrate better compliance automation.",
        priority: "medium",
        confidence: 75,
        actionItems: [
          "Review vendor risk scores in detail",
          "Prioritize compliance gap remediation",
          "Consider cloud-native alternatives",
        ],
        potentialImpact: {
          financial: 100000,
          operational: "Improved security posture and reduced manual overhead",
          compliance: "Better alignment with industry standards",
        },
        timeframe: "3-6 months",
        relatedVendors: Object.keys(riskAssessments),
      },
    ]
  }

  private generateFallbackRecommendations(
    vendors: NewVendorData[],
    riskAssessments: Record<string, RiskAssessmentResult>,
  ): SmartRecommendation[] {
    return [
      {
        id: "fallback-rec-1",
        category: "strategic",
        title: "Evaluate Cloud-Native NAC Solutions",
        description:
          "Consider migrating to cloud-native NAC solutions for improved scalability and compliance automation.",
        rationale: "Cloud-native solutions typically offer better automation, lower TCO, and faster deployment times.",
        expectedBenefits: [
          "Reduced operational overhead",
          "Improved compliance automation",
          "Lower total cost of ownership",
        ],
        implementationSteps: [
          "Assess current infrastructure requirements",
          "Evaluate cloud-native vendor capabilities",
          "Plan migration strategy",
          "Execute pilot deployment",
        ],
        estimatedCost: 75000,
        estimatedSavings: 150000,
        timeToImplement: "6-12 months",
        riskLevel: "medium",
        confidence: 80,
        affectedVendors: [],
      },
    ]
  }

  private generateFallbackExecutiveSummary(
    vendors: NewVendorData[],
    riskAssessments: Record<string, RiskAssessmentResult>,
    industry: string,
  ): ExecutiveSummary {
    return {
      overview:
        "Comprehensive NAC vendor assessment completed, revealing opportunities for risk reduction and cost optimization through strategic vendor selection and implementation planning.",
      keyFindings: [
        "Multiple vendor options available with varying risk profiles",
        "Cloud-native solutions show advantages in automation and TCO",
        "Compliance gaps exist that require strategic remediation",
      ],
      criticalRisks: [
        "Potential compliance violations if gaps not addressed",
        "Operational complexity with traditional solutions",
      ],
      recommendations: [
        "Prioritize vendors with strong compliance automation",
        "Consider cloud-native solutions for better TCO",
        "Develop comprehensive implementation timeline",
      ],
      financialImpact:
        "Potential savings of $100K-500K annually through optimized vendor selection and reduced operational overhead.",
      timeline: "6-12 months for full implementation with immediate wins possible in 90 days.",
      nextSteps: [
        "Review detailed vendor analysis",
        "Engage stakeholders for decision making",
        "Develop implementation roadmap",
        "Begin vendor negotiations",
      ],
    }
  }

  private generateFallbackTrendAnalysis(industry: string): string {
    return `The NAC market is experiencing significant transformation, particularly in the ${industry.replace("_", " ")} sector. Key trends include the shift toward cloud-native architectures, increased emphasis on zero-trust security models, and growing demand for compliance automation.

Organizations are increasingly prioritizing solutions that offer comprehensive API integration, AI-powered threat detection, and simplified management interfaces. The traditional hardware-based NAC solutions are giving way to software-defined approaches that provide greater flexibility and lower total cost of ownership.

For ${industry.replace("_", " ")} organizations, regulatory compliance remains a critical driver, with vendors that offer automated compliance reporting and audit trail capabilities gaining competitive advantage. The market is also seeing consolidation around platforms that can integrate with existing security infrastructure.

Looking ahead, expect continued innovation in areas such as behavioral analytics, automated policy enforcement, and cloud-first architectures. Organizations should prioritize vendors that demonstrate strong roadmaps in these areas while maintaining robust security and compliance capabilities.`
  }
}

export const aiInsightGenerator = new AIInsightGenerator()
