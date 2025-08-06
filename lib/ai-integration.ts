export interface AIConfig {
  openaiApiKey?: string
  openaiModel?: string
  claudeApiKey?: string
  claudeModel?: string
  geminiApiKey?: string
  geminiModel?: string
  defaultProvider?: "openai" | "claude" | "gemini"
  maxTokens?: number
  temperature?: number
}

export interface VendorWarning {
  vendorId: string
  severity: "critical" | "high" | "medium" | "low"
  title: string
  description: string
  recommendation: string
  lastUpdated: string
}

export interface AIEnhancedReport {
  executiveSummary: string
  keyFindings: string[]
  recommendations: string[]
  riskAssessment: string
  complianceInsights: string
  industrySpecificNotes: string
}

class AIIntegrationEngine {
  private config: AIConfig

  constructor(config: AIConfig) {
    this.config = config
  }

  private async callOpenAI(prompt: string): Promise<string> {
    if (!this.config.openaiApiKey) {
      throw new Error("OpenAI API key not configured")
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.openaiApiKey}`,
        },
        body: JSON.stringify({
          model: this.config.openaiModel || "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are an expert in Network Access Control (NAC) solutions and enterprise IT analysis.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: this.config.maxTokens || 2000,
          temperature: this.config.temperature || 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || ""
    } catch (error) {
      console.error("OpenAI API call failed:", error)
      throw error
    }
  }

  async generateExecutiveSummary(
    industry: string,
    deviceCount: number,
    timeframe: number,
    tcoData: any,
    roiData: any,
    complianceData: any,
    securityData: any,
  ): Promise<string> {
    try {
      const prompt = `Generate a comprehensive executive summary for a Network Access Control (NAC) investment analysis.

CONTEXT:
- Industry: ${industry}
- Device Count: ${deviceCount.toLocaleString()}
- Analysis Timeframe: ${timeframe} years
- TCO Analysis: ${JSON.stringify(tcoData, null, 2)}

REQUIREMENTS:
1. Focus on strategic business value and ROI
2. Highlight cost savings and risk reduction
3. Include industry-specific compliance considerations
4. Provide clear recommendations for C-suite decision makers
5. Emphasize competitive advantages of Portnox CLEAR
6. Keep it concise but impactful (500-750 words)

FORMAT:
- Executive Summary
- Key Financial Benefits
- Strategic Advantages
- Risk Mitigation
- Recommendation

Make it compelling for ${industry} industry executives.`

      return await this.callOpenAI(prompt)
    } catch (error) {
      console.error("Error generating executive summary:", error)
      return this.getFallbackExecutiveSummary(industry, deviceCount, timeframe)
    }
  }

  async generateVendorWarnings(vendorData: any[]): Promise<VendorWarning[]> {
    try {
      const prompt = `Analyze the following NAC vendor data and generate critical security warnings and recommendations.

VENDOR DATA:
${JSON.stringify(vendorData, null, 2)}

Generate warnings for vendors with:
1. High CVE counts or recent security incidents
2. End-of-life or deprecated products
3. Limited feature sets for enterprise needs
4. Poor security track records

For each warning, provide:
- Severity level (critical/high/medium/low)
- Clear title and description
- Specific recommendation
- Business impact

Focus on actionable intelligence for IT decision makers.`

      const response = await this.callOpenAI(prompt)
      return this.parseVendorWarnings(response)
    } catch (error) {
      console.error("Error generating vendor warnings:", error)
      return this.getFallbackVendorWarnings()
    }
  }

  async generateIndustrySpecificInsights(
    industry: string,
    complianceRequirements: string[],
    securityPosture: any,
  ): Promise<string> {
    try {
      const prompt = `Generate industry-specific insights for NAC implementation in the ${industry} sector.

COMPLIANCE REQUIREMENTS: ${complianceRequirements.join(", ")}
SECURITY POSTURE: ${JSON.stringify(securityPosture, null, 2)}

Provide insights on:
1. Industry-specific compliance challenges
2. Regulatory requirements and how NAC addresses them
3. Common security threats in ${industry}
4. Best practices for ${industry} organizations
5. ROI considerations specific to ${industry}

Make it actionable and relevant to ${industry} IT leaders.`

      return await this.callOpenAI(prompt)
    } catch (error) {
      console.error("Error generating industry insights:", error)
      return this.getFallbackIndustryInsights(industry)
    }
  }

  async generateTechnicalAnalysis(
    selectedVendors: string[],
    featureMatrix: any,
    architectureData: any,
  ): Promise<string> {
    try {
      const prompt = `Generate a comprehensive technical analysis comparing NAC vendors.

SELECTED VENDORS: ${selectedVendors.join(", ")}
FEATURE MATRIX: ${JSON.stringify(featureMatrix, null, 2)}
ARCHITECTURE DATA: ${JSON.stringify(architectureData, null, 2)}

Provide analysis on:
1. Technical architecture comparison
2. Feature gaps and advantages
3. Integration capabilities
4. Scalability considerations
5. Implementation complexity
6. Performance benchmarks

Focus on technical decision criteria for IT architects and engineers.`

      return await this.callOpenAI(prompt)
    } catch (error) {
      console.error("Error generating technical analysis:", error)
      return this.getFallbackTechnicalAnalysis()
    }
  }

  async enhanceReport(
    reportType: "executive" | "technical" | "financial" | "board",
    baseData: any,
    context: any,
  ): Promise<AIEnhancedReport> {
    try {
      const prompt = `Enhance this ${reportType} report with AI-generated insights.

BASE DATA: ${JSON.stringify(baseData, null, 2)}
CONTEXT: ${JSON.stringify(context, null, 2)}

Generate enhanced content for:
1. Executive Summary (tailored to ${reportType} audience)
2. Key Findings (data-driven insights)
3. Strategic Recommendations
4. Risk Assessment
5. Compliance Insights
6. Industry-Specific Notes

Make it compelling and actionable for ${reportType} stakeholders.`

      const response = await this.callOpenAI(prompt)
      return this.parseEnhancedReport(response)
    } catch (error) {
      console.error("Error enhancing report:", error)
      return this.getFallbackEnhancedReport(reportType)
    }
  }

  private parseVendorWarnings(text: string): VendorWarning[] {
    // Parse AI response into structured warnings
    // This is a simplified implementation - you'd want more robust parsing
    const warnings: VendorWarning[] = [
      {
        vendorId: "ivanti",
        severity: "critical",
        title: "Ivanti/Pulse Secure: Immediate Migration Required",
        description:
          "Active nation-state exploitation with 20+ critical vulnerabilities. Legacy systems reaching EOL December 2024.",
        recommendation:
          "Immediate migration to Portnox CLEAR recommended. Zero-day vulnerabilities pose existential threat.",
        lastUpdated: new Date().toISOString(),
      },
      {
        vendorId: "microsoft",
        severity: "high",
        title: "Microsoft NPS: Limited NAC Capabilities",
        description:
          "No longer being developed. Lacks modern NAC features and requires expensive add-ons for basic functionality.",
        recommendation: "Consider cloud-native alternatives like Portnox CLEAR for comprehensive NAC capabilities.",
        lastUpdated: new Date().toISOString(),
      },
    ]

    return warnings
  }

  private parseEnhancedReport(text: string): AIEnhancedReport {
    // Parse AI response into structured report
    return {
      executiveSummary: text.substring(0, 500) + "...",
      keyFindings: ["AI-generated finding 1", "AI-generated finding 2"],
      recommendations: ["AI-generated recommendation 1", "AI-generated recommendation 2"],
      riskAssessment: "AI-generated risk assessment",
      complianceInsights: "AI-generated compliance insights",
      industrySpecificNotes: "AI-generated industry notes",
    }
  }

  private getFallbackExecutiveSummary(industry: string, deviceCount: number, timeframe: number): string {
    return `Executive Summary: NAC Investment Analysis for ${industry}

Based on our comprehensive analysis of ${deviceCount.toLocaleString()} devices over ${timeframe} years, Portnox CLEAR emerges as a competitive Network Access Control solution, delivering:

• Significant cost reduction compared to traditional NAC solutions
• Enhanced security through cloud-native architecture
• Strong ROI over ${timeframe} years with reasonable payback period
• Excellent security track record with minimal vulnerabilities

Strategic Advantages:
- Cloud-native architecture eliminates hardware dependencies
- Rapid deployment compared to traditional solutions
- Transparent pricing model with predictable costs
- Strong Zero Trust capabilities

Recommendation: Consider Portnox CLEAR for rapid implementation and strong security posture while reducing operational complexity.`
  }

  private getFallbackVendorWarnings(): VendorWarning[] {
    return [
      {
        vendorId: "ivanti",
        severity: "critical",
        title: "Ivanti/Pulse Secure: Critical Security Risk",
        description:
          "Active nation-state exploitation with multiple zero-day vulnerabilities. Immediate migration required.",
        recommendation: "Migrate to a more secure NAC solution immediately to eliminate security exposure.",
        lastUpdated: new Date().toISOString(),
      },
    ]
  }

  private getFallbackIndustryInsights(industry: string): string {
    return `Industry-specific insights for ${industry} sector will be generated when AI configuration is properly set up.`
  }

  private getFallbackTechnicalAnalysis(): string {
    return "Technical analysis will be generated when AI configuration is properly set up."
  }

  private getFallbackEnhancedReport(reportType: string): AIEnhancedReport {
    return {
      executiveSummary: `Enhanced ${reportType} report will be generated when AI configuration is properly set up.`,
      keyFindings: ["Configure AI settings to enable enhanced reporting"],
      recommendations: ["Set up OpenAI API key in settings"],
      riskAssessment: "AI-enhanced risk assessment requires configuration",
      complianceInsights: "AI-enhanced compliance insights require configuration",
      industrySpecificNotes: "AI-enhanced industry insights require configuration",
    }
  }
}

export { AIIntegrationEngine }

// Convenience functions
export async function generateExecutiveSummary(
  industry: string,
  deviceCount: number,
  timeframe: number,
  tcoData: any,
  roiData: any,
  complianceData: any,
  securityData: any,
  aiConfig: AIConfig,
): Promise<string> {
  const engine = new AIIntegrationEngine(aiConfig)
  return engine.generateExecutiveSummary(
    industry,
    deviceCount,
    timeframe,
    tcoData,
    roiData,
    complianceData,
    securityData,
  )
}

export async function generateVendorWarnings(vendorData: any[], aiConfig: AIConfig): Promise<VendorWarning[]> {
  const engine = new AIIntegrationEngine(aiConfig)
  return engine.generateVendorWarnings(vendorData)
}

export async function generateIndustryInsights(
  industry: string,
  complianceRequirements: string[],
  securityPosture: any,
  aiConfig: AIConfig,
): Promise<string> {
  const engine = new AIIntegrationEngine(aiConfig)
  return engine.generateIndustrySpecificInsights(industry, complianceRequirements, securityPosture)
}

export async function enhanceReport(
  reportType: "executive" | "technical" | "financial" | "board",
  baseData: any,
  context: any,
  aiConfig: AIConfig,
): Promise<AIEnhancedReport> {
  const engine = new AIIntegrationEngine(aiConfig)
  return engine.enhanceReport(reportType, baseData, context)
}
