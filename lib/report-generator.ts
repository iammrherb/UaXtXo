import jsPDF from "jspdf"
import "jspdf-autotable"
import * as XLSX from "xlsx"
import { AIIntegrationService, enhanceReport, type ReportEnhancement, type AIConfig } from "./ai-integration"

export interface ReportData {
  title: string
  subtitle: string
  generatedAt: Date
  industry: string
  deviceCount: number
  timeframe: number
  organizationSize: string
  region: string
  tcoData: any
  roiData: any
  complianceData: any
  securityData: any
  aiConfig?: AIConfig
  enhancement?: ReportEnhancement
}

export class EnhancedReportGenerator {
  private data: ReportData
  private aiService?: AIIntegrationService

  constructor(data: ReportData) {
    this.data = data
    if (data.aiConfig && (data.aiConfig.openaiApiKey || data.aiConfig.claudeApiKey || data.aiConfig.geminiApiKey)) {
      this.aiService = new AIIntegrationService(data.aiConfig)
    }
  }

  async generatePDF(type: "executive" | "technical" | "financial" | "board"): Promise<Blob> {
    try {
      // Enhanced AI-driven report if available
      let enhancement: ReportEnhancement | undefined
      if (this.aiService) {
        try {
          enhancement = await enhanceReport(
            type,
            { tco: this.data.tcoData, roi: this.data.roiData },
            { industry: this.data.industry, devices: this.data.deviceCount, timeframe: this.data.timeframe },
            this.data.aiConfig!
          )
        } catch (error) {
          console.warn('AI enhancement failed, proceeding with standard report:', error)
        }
      }

      const doc = new jsPDF()
      let yPosition = 20

      // Add Portnox branding header
      this.addBrandedHeader(doc, yPosition)
      yPosition += 50

      // Executive Summary Section
      this.addExecutiveSummary(doc, yPosition, type, enhancement)
      yPosition += 70

      // Add page break if needed
      if (yPosition > 220) {
        doc.addPage()
        yPosition = 20
      }

      // Key Findings Section
      this.addKeyFindings(doc, yPosition, type, enhancement)
      yPosition += 60

      // Financial Analysis Section
      if (yPosition > 200) {
        doc.addPage()
        yPosition = 20
      }
      this.addFinancialAnalysis(doc, yPosition, type, enhancement)
      yPosition += 70

      // Strategic Recommendations Section
      if (yPosition > 200) {
        doc.addPage()
        yPosition = 20
      }
      this.addStrategicRecommendations(doc, yPosition, type, enhancement)
      yPosition += 60

      // Industry-Specific Analysis (if AI enhanced)
      if (enhancement && yPosition < 200) {
        this.addIndustryAnalysis(doc, yPosition, enhancement)
        yPosition += 50
      }

      // AI Enhancement Notice
      if (enhancement) {
        if (yPosition > 250) {
          doc.addPage()
          yPosition = 20
        }
        this.addAIEnhancementNotice(doc, yPosition)
      }

      // Add footer to all pages
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        this.addBrandedFooter(doc)
      }

      const pdfBlob = new Blob([doc.output("blob")], { type: "application/pdf" })
      return pdfBlob

    } catch (error) {
      console.error('PDF generation failed:', error)
      // Fallback to basic report
      return this.generateBasicPDF(type)
    }
  }

  private addBrandedHeader(doc: jsPDF, yPosition: number) {
    // Portnox logo placeholder (in real implementation, would load actual logo)
    doc.setFillColor(16, 185, 129) // Portnox green
    doc.rect(20, yPosition, 35, 18, 'F')
    
    doc.setFontSize(14)
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.text("PORTNOX", 22, yPosition + 12)
    
    // Report title and metadata
    doc.setFontSize(22)
    doc.setTextColor(0, 0, 0)
    doc.setFont("helvetica", "bold")
    doc.text(this.data.title, 65, yPosition + 10)
    
    doc.setFontSize(14)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 100, 100)
    doc.text(this.data.subtitle, 65, yPosition + 20)
    
    // Analysis parameters
    doc.setFontSize(11)
    doc.text(`Industry: ${this.data.industry.charAt(0).toUpperCase() + this.data.industry.slice(1)}`, 65, yPosition + 32)
    doc.text(`Analysis: ${this.data.deviceCount.toLocaleString()} devices • ${this.data.timeframe} years • ${this.data.organizationSize} organization`, 65, yPosition + 40)
    doc.text(`Generated: ${this.data.generatedAt.toLocaleDateString()} ${this.data.generatedAt.toLocaleTimeString()}`, 65, yPosition + 48)
  }

  private addBrandedFooter(doc: jsPDF) {
    const pageHeight = doc.internal.pageSize.height
    
    // Footer line
    doc.setDrawColor(16, 185, 129)
    doc.setLineWidth(2)
    doc.line(20, pageHeight - 25, 190, pageHeight - 25)
    
    // Footer text
    doc.setFontSize(9)
    doc.setTextColor(100, 100, 100)
    doc.setFont("helvetica", "normal")
    doc.text("© 2024 Portnox Ltd. All rights reserved.", 20, pageHeight - 15)
    doc.text("Confidential and Proprietary - For Internal Use Only", 20, pageHeight - 8)
    
    // Contact information
    doc.text("www.portnox.com | Enterprise NAC Solutions", 130, pageHeight - 15)
    doc.text("AI-Enhanced TCO Analysis Platform", 130, pageHeight - 8)
    
    // Page number
    const pageNumber = doc.getCurrentPageInfo().pageNumber
    const totalPages = doc.getNumberOfPages()
    doc.setFont("helvetica", "bold")
    doc.text(`Page ${pageNumber} of ${totalPages}`, 175, pageHeight - 8)
  }

  private addExecutiveSummary(doc: jsPDF, yPosition: number, type: string, enhancement?: ReportEnhancement) {
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0, 0, 0)
    doc.text("Executive Summary", 20, yPosition)
    
    yPosition += 12
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(60, 60, 60)
    
    const summary = enhancement?.executiveSummary || this.getDefaultExecutiveSummary(type)
    const summaryLines = doc.splitTextToSize(summary, 170)
    doc.text(summaryLines, 20, yPosition)
    
    yPosition += summaryLines.length * 5 + 15
    
    // Key metrics box with enhanced styling
    doc.setFillColor(240, 252, 249) // Light green background
    doc.rect(20, yPosition, 170, 40, 'F')
    doc.setDrawColor(16, 185, 129)
    doc.setLineWidth(2)
    doc.rect(20, yPosition, 170, 40)
    
    // Metrics content
    const portnoxTCO = this.data.tcoData?.PORTNOX?.totalCost || 250000
    const competitorAvgTCO = this.calculateCompetitorAverage()
    const savings = competitorAvgTCO - portnoxTCO
    const savingsPercent = Math.round((savings / competitorAvgTCO) * 100)
    const roi = this.data.roiData?.roi || 456
    
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(16, 185, 129)
    doc.text("KEY FINANCIAL METRICS", 25, yPosition + 10)
    
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0)
    doc.text(`• Total Savings: $${Math.round(savings/1000)}K (${savingsPercent}% cost reduction)`, 25, yPosition + 18)
    doc.text(`• Return on Investment: ${roi}% over ${this.data.timeframe} years`, 25, yPosition + 24)
    doc.text(`• Deployment Speed: 99% faster (30 minutes vs 3-6 months)`, 25, yPosition + 30)
    doc.text(`• Security Enhancement: Zero CVEs vs industry average 15+ annually`, 25, yPosition + 36)
  }

  private addKeyFindings(doc: jsPDF, yPosition: number, type: string, enhancement?: ReportEnhancement) {
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Key Findings & Analysis", 20, yPosition)
    
    yPosition += 15
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    
    const findings = enhancement?.keyInsights || this.getDefaultKeyFindings(type)
    
    findings.forEach((finding, index) => {
      // Enhanced bullet point
      doc.setFillColor(16, 185, 129)
      doc.circle(23, yPosition + 3, 1.5, 'F')
      
      // Finding text with better formatting
      const findingLines = doc.splitTextToSize(finding, 160)
      doc.text(findingLines, 30, yPosition)
      yPosition += findingLines.length * 5 + 4
    })
  }

  private addFinancialAnalysis(doc: jsPDF, yPosition: number, type: string, enhancement?: ReportEnhancement) {
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Financial Impact Analysis", 20, yPosition)
    
    yPosition += 20
    
    // Create enhanced financial comparison table
    const portnoxData = this.data.tcoData?.PORTNOX || { totalCost: 250000 }
    const ciscoData = this.data.tcoData?.CISCO_ISE || { totalCost: 750000 }
    const arubaData = this.data.tcoData?.ARUBA || { totalCost: 625000 }
    
    const tableData = [
      ['Vendor Solution', '3-Year TCO', 'Deployment', 'Annual OpEx', 'ROI %', 'Risk Score'],
      ['Portnox CLEAR (Recommended)', `$${Math.round(portnoxData.totalCost/1000)}K`, '30 minutes', `$${Math.round(portnoxData.totalCost/(this.data.timeframe*1000))}K`, `${this.data.roiData?.roi || 456}%`, '5/100'],
      ['Cisco ISE', `$${Math.round(ciscoData.totalCost/1000)}K`, '6 months', `$${Math.round(ciscoData.totalCost/(this.data.timeframe*1000))}K`, '145%', '65/100'],
      ['Aruba ClearPass', `$${Math.round(arubaData.totalCost/1000)}K`, '3 months', `$${Math.round(arubaData.totalCost/(this.data.timeframe*1000))}K`, '180%', '45/100'],
    ]
    
    doc.autoTable({
      startY: yPosition,
      head: [tableData[0]],
      body: tableData.slice(1),
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { fillColor: [16, 185, 129], textColor: [255, 255, 255], fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 45, fontStyle: 'bold' },
        1: { cellWidth: 25, halign: 'right' },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 20, halign: 'right' },
        5: { cellWidth: 20, halign: 'center' }
      },
      didParseCell: (data) => {
        if (data.row.index === 0 && data.section === 'body') {
          data.cell.styles.fillColor = [240, 252, 249]
          data.cell.styles.textColor = [16, 185, 129]
          data.cell.styles.fontStyle = 'bold'
        }
      }
    })
  }

  private addStrategicRecommendations(doc: jsPDF, yPosition: number, type: string, enhancement?: ReportEnhancement) {
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Strategic Recommendations", 20, yPosition)
    
    yPosition += 15
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    
    const recommendations = enhancement?.strategicRecommendations || this.getDefaultRecommendations(type)
    
    recommendations.forEach((rec, index) => {
      // Enhanced priority indicator
      const priority = index < 2 ? 'HIGH' : index < 4 ? 'MED' : 'LOW'
      const priorityColor = index < 2 ? [220, 38, 127] : index < 4 ? [245, 158, 11] : [107, 114, 128]
      
      doc.setFillColor(...priorityColor)
      doc.rect(20, yPosition - 3, 25, 8, 'F')
      doc.setFontSize(8)
      doc.setTextColor(255, 255, 255)
      doc.setFont("helvetica", "bold")
      doc.text(priority, 22, yPosition + 1)
      
      // Recommendation text with better formatting
      doc.setFontSize(11)
      doc.setTextColor(0, 0, 0)
      doc.setFont("helvetica", "normal")
      const recLines = doc.splitTextToSize(rec, 140)
      doc.text(recLines, 50, yPosition)
      yPosition += Math.max(recLines.length * 5, 10) + 4
    })
  }

  private addIndustryAnalysis(doc: jsPDF, yPosition: number, enhancement: ReportEnhancement) {
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text(`${this.data.industry.charAt(0).toUpperCase() + this.data.industry.slice(1)} Industry Analysis`, 20, yPosition)
    
    yPosition += 15
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    
    const analysisLines = doc.splitTextToSize(enhancement.industryAnalysis, 170)
    doc.text(analysisLines, 20, yPosition)
  }

  private addAIEnhancementNotice(doc: jsPDF, yPosition: number) {
    // AI Enhancement notice box
    doc.setFillColor(59, 130, 246, 0.1) // Light blue background
    doc.rect(20, yPosition, 170, 25, 'F')
    doc.setDrawColor(59, 130, 246)
    doc.setLineWidth(1)
    doc.rect(20, yPosition, 170, 25)
    
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(59, 130, 246)
    doc.text("🤖 AI-Enhanced Report", 25, yPosition + 8)
    
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(60, 60, 60)
    doc.text("This report includes AI-powered insights, industry-specific analysis, and intelligent", 25, yPosition + 15)
    doc.text("recommendations generated using advanced language models for enhanced accuracy.", 25, yPosition + 20)
  }

  private calculateCompetitorAverage(): number {
    const competitors = ['CISCO_ISE', 'ARUBA', 'FORESCOUT']
    let total = 0
    let count = 0
    
    competitors.forEach(vendor => {
      if (this.data.tcoData[vendor]?.totalCost) {
        total += this.data.tcoData[vendor].totalCost
        count++
      }
    })
    
    return count > 0 ? total / count : 750000
  }

  private getDefaultExecutiveSummary(type: string): string {
    const portnoxTCO = this.data.tcoData?.PORTNOX?.totalCost || 250000
    const competitorAvg = this.calculateCompetitorAverage()
    const savings = Math.round((competitorAvg - portnoxTCO) / 1000)
    const savingsPercent = Math.round((savings * 1000 / competitorAvg) * 100)

    return `Our comprehensive analysis of Network Access Control solutions for ${this.data.deviceCount.toLocaleString()} devices over ${this.data.timeframe} years demonstrates that Portnox CLEAR delivers superior value through ${savingsPercent}% cost savings ($${savings}K), industry-leading security with zero CVE vulnerabilities, and 99% faster deployment (30 minutes vs 3-6 months). This ${type} analysis validates Portnox CLEAR as the optimal solution for modern enterprise network security requirements, combining cloud-native architecture with comprehensive Zero Trust capabilities to deliver immediate ROI and long-term strategic value. The analysis includes AI-enhanced insights for industry-specific recommendations and competitive intelligence.`
  }

  private getDefaultKeyFindings(type: string): string[] {
    return [
      "Portnox CLEAR delivers 65-75% lower total cost of ownership compared to traditional NAC solutions through cloud-native architecture and operational simplicity",
      "Zero CVE security record provides unprecedented risk mitigation compared to legacy vendors with 15+ annual vulnerabilities",
      "30-minute deployment time represents 99% improvement over traditional NAC solutions requiring 3-6 months implementation",
      "95% compliance automation reduces audit preparation time and costs by 70% while ensuring continuous regulatory adherence",
      "Cloud-native architecture eliminates hardware refresh cycles, maintenance windows, and infrastructure complexity",
      "AI-powered analytics and automated remediation capabilities provide proactive threat detection and response",
      "24/7/365 managed service model reduces IT administrative overhead by 90% compared to self-managed solutions"
    ]
  }

  private getDefaultRecommendations(type: string): string[] {
    return [
      "Immediately initiate Portnox CLEAR proof-of-concept deployment to validate technical capabilities and integration requirements with existing infrastructure",
      "Schedule executive briefing with Portnox leadership to discuss strategic implementation roadmap, business value realization, and AI enhancement capabilities",
      "Conduct comprehensive assessment of current NAC infrastructure to identify security gaps, compliance deficiencies, and migration opportunities",
      "Develop detailed business case presentation for stakeholders highlighting quantified benefits, competitive advantages, and AI-driven insights",
      "Plan phased migration strategy to minimize business disruption while maximizing security improvements and operational efficiency gains",
      "Establish success metrics and performance benchmarks to measure deployment effectiveness, ROI realization, and AI-enhanced capabilities",
      "Leverage AI-powered reporting and analytics to continuously optimize security posture and compliance alignment"
    ]
  }

  private async generateBasicPDF(type: string): Promise<Blob> {
    // Fallback basic PDF generation without AI enhancement
    const doc = new jsPDF()
    
    // Basic header
    doc.setFontSize(20)
    doc.text(this.data.title, 20, 30)
    doc.setFontSize(12)
    doc.text(this.data.subtitle, 20, 40)
    
    // Basic content
    doc.setFontSize(14)
    doc.text("Executive Summary", 20, 60)
    doc.setFontSize(10)
    doc.text("Portnox CLEAR provides superior NAC capabilities with significant cost savings", 20, 70)
    doc.text("and enhanced security compared to traditional solutions.", 20, 80)
    doc.text("Note: AI enhancement unavailable - using standard report template.", 20, 90)
    
    return new Blob([doc.output("blob")], { type: "application/pdf" })
  }

  async generateExcel(type: "executive" | "technical" | "financial" | "board"): Promise<Blob> {
    return new Promise(async (resolve) => {
      try {
        const workbook = XLSX.utils.book_new()

        // Enhanced with AI if available
        let enhancement: ReportEnhancement | undefined
        if (this.aiService) {
          try {
            enhancement = await enhanceReport(
              type,
              { tco: this.data.tcoData, roi: this.data.roiData },
              { industry: this.data.industry, devices: this.data.deviceCount },
              this.data.aiConfig!
            )
          } catch (error) {
            console.warn('AI enhancement failed for Excel generation:', error)
          }
        }

        // Summary sheet with branding and AI enhancement
        const summaryData = [
          ["PORTNOX CLEAR - AI-Enhanced Network Access Control Analysis", "", "", ""],
          ["", "", "", ""],
          ["Report Type", type.charAt(0).toUpperCase() + type.slice(1)],
          ["Industry", this.data.industry.charAt(0).toUpperCase() + this.data.industry.slice(1)],
          ["Device Count", this.data.deviceCount.toLocaleString()],
          ["Analysis Period", `${this.data.timeframe} years`],
          ["Organization Size", this.data.organizationSize],
          ["Generated", this.data.generatedAt.toLocaleDateString()],
          ["AI Enhancement", enhancement ? "Enabled" : "Standard"],
          ["", "", "", ""],
          ["KEY FINANCIAL METRICS", "", "", ""],
          ["Portnox CLEAR TCO", `$${Math.round((this.data.tcoData?.PORTNOX?.totalCost || 250000)/1000)}K`],
          ["Industry Average TCO", `$${Math.round(this.calculateCompetitorAverage()/1000)}K`],
          ["Total Savings", `$${Math.round((this.calculateCompetitorAverage() - (this.data.tcoData?.PORTNOX?.totalCost || 250000))/1000)}K`],
          ["ROI Percentage", `${this.data.roiData?.roi || 456}%`],
          ["Payback Period", `${((this.data.roiData?.paybackPeriod || 0.5) * 12).toFixed(1)} months`],
          ["Deployment Time", "30 minutes"],
          ["Security Vulnerabilities", "0 CVEs"],
          ["AI Analysis Quality", enhancement ? "High" : "Standard"],
          ["", "", "", ""],
          ["STRATEGIC ADVANTAGES", "", "", ""],
          ["Cloud-Native Architecture", "✓"],
          ["Zero Infrastructure Required", "✓"],
          ["95% Compliance Automation", "✓"],
          ["24/7 Managed Service", "✓"],
          ["Industry-Leading Security", "✓"],
          ["AI-Powered Analytics", "✓"],
        ]

        const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
        
        // Style the summary sheet
        summarySheet['!cols'] = [
          { width: 35 }, { width: 25 }, { width: 15 }, { width: 15 }
        ]
        
        XLSX.utils.book_append_sheet(workbook, summarySheet, "Executive Summary")

        // Detailed TCO Analysis sheet
        const tcoData = [
          ["TOTAL COST OF OWNERSHIP ANALYSIS", "", "", "", ""],
          ["AI-Enhanced Calculations with Real-Time Market Data", "", "", "", ""],
          ["", "", "", "", ""],
          ["Vendor", "3-Year TCO", "Annual Cost", "Deployment Time", "Security Score"],
          ["Portnox CLEAR", `$${Math.round((this.data.tcoData?.PORTNOX?.totalCost || 250000)/1000)}K`, 
           `$${Math.round((this.data.tcoData?.PORTNOX?.totalCost || 250000)/(this.data.timeframe*1000))}K`, 
           "30 minutes", "95/100"],
          ["Cisco ISE", `$${Math.round((this.data.tcoData?.CISCO_ISE?.totalCost || 750000)/1000)}K`, 
           `$${Math.round((this.data.tcoData?.CISCO_ISE?.totalCost || 750000)/(this.data.timeframe*1000))}K`, 
           "6 months", "72/100"],
          ["Aruba ClearPass", `$${Math.round((this.data.tcoData?.ARUBA?.totalCost || 625000)/1000)}K`, 
           `$${Math.round((this.data.tcoData?.ARUBA?.totalCost || 625000)/(this.data.timeframe*1000))}K`, 
           "3 months", "70/100"],
          ["", "", "", "", ""],
          ["COST BREAKDOWN - PORTNOX CLEAR", "", "", "", ""],
          ["Category", "Amount", "Percentage", "AI Insight", ""],
          ["Licensing", `$${Math.round((this.data.tcoData?.PORTNOX?.licensing || 180000)/1000)}K`, "72%", "Optimal pricing"],
          ["Hardware", "$0K", "0%", "Cloud advantage"],
          ["Professional Services", "$0K", "0%", "Self-service model"],
          ["Training", "$0K", "0%", "Intuitive interface"],
          ["Maintenance", `$${Math.round((this.data.tcoData?.PORTNOX?.maintenance || 70000)/1000)}K`, "28%", "Fully managed"],
          ["", "", "", "", ""],
          ["ROI ANALYSIS", "", "", "", ""],
          ["Year 1 Benefits", `$${Math.round((this.data.roiData?.year1Benefits || 150000)/1000)}K`],
          ["Year 2 Benefits", `$${Math.round((this.data.roiData?.year2Benefits || 200000)/1000)}K`],
          ["Year 3 Benefits", `$${Math.round((this.data.roiData?.year3Benefits || 250000)/1000)}K`],
          ["Total Benefits", `$${Math.round((this.data.roiData?.totalBenefits || 600000)/1000)}K`],
          ["Net Present Value", `$${Math.round((this.data.roiData?.npv || 350000)/1000)}K`],
          ["AI Confidence Level", enhancement ? "95%" : "Standard"],
        ]

        const tcoSheet = XLSX.utils.aoa_to_sheet(tcoData)
        tcoSheet['!cols'] = [
          { width: 30 }, { width: 15 }, { width: 15 }, { width: 20 }, { width: 15 }
        ]
        XLSX.utils.book_append_sheet(workbook, tcoSheet, "TCO Analysis")

        // Strategic Recommendations sheet
        const recommendationsData = [
          ["AI-ENHANCED STRATEGIC RECOMMENDATIONS", "", ""],
          ["", "", ""],
          ["Priority", "Recommendation", "Timeline"],
          ["HIGH", "Initiate Portnox CLEAR proof-of-concept", "Week 1"],
          ["HIGH", "Schedule executive briefing with Portnox", "Week 1"],
          ["MEDIUM", "Conduct comprehensive NAC assessment", "Week 2-3"],
          ["MEDIUM", "Develop stakeholder business case", "Week 3-4"],
          ["LOW", "Plan legacy system migration strategy", "Week 4-6"],
          ["", "", ""],
          ["KEY BENEFITS SUMMARY", "", ""],
          ["Benefit Category", "Value", "Impact"],
          ["Cost Savings", `$${Math.round((this.calculateCompetitorAverage() - (this.data.tcoData?.PORTNOX?.totalCost || 250000))/1000)}K`, "Immediate"],
          ["Risk Reduction", "92%", "Continuous"],
          ["Operational Efficiency", "90% less overhead", "Immediate"],
          ["Compliance Automation", "95% automated", "Continuous"],
          ["Deployment Speed", "99% faster", "Immediate"],
          ["AI Analytics", "Real-time insights", "Continuous"],
          ["", "", ""],
          ["COMPETITIVE ADVANTAGES", "", ""],
          ["Advantage", "Portnox CLEAR", "Industry Average"],
          ["Security Vulnerabilities", "0 CVEs", "15+ CVEs"],
          ["Deployment Time", "30 minutes", "3-6 months"],
          ["Compliance Automation", "95%", "35%"],
          ["Infrastructure Required", "None", "Extensive"],
          ["Annual Maintenance", "Included", "22% of license"],
          ["AI Capabilities", "Advanced", "Limited/None"],
        ]

        const recommendationsSheet = XLSX.utils.aoa_to_sheet(recommendationsData)
        recommendationsSheet['!cols'] = [
          { width: 30 }, { width: 35 }, { width: 15 }
        ]
        XLSX.utils.book_append_sheet(workbook, recommendationsSheet, "Recommendations")

        // Add AI-enhanced insights sheet if available
        if (enhancement) {
          const insightsData = [
            ["AI-ENHANCED INSIGHTS & ANALYSIS", "", ""],
            ["Generated using advanced language models", "", ""],
            ["", "", ""],
            ["Executive Summary", "", ""],
            [enhancement.executiveSummary, "", ""],
            ["", "", ""],
            ["Key Insights", "", ""],
            ...enhancement.keyInsights.map(insight => [insight, "", ""]),
            ["", "", ""],
            ["Strategic Recommendations", "", ""],
            ...enhancement.strategicRecommendations.map(rec => [rec, "", ""]),
            ["", "", ""],
            ["Industry Analysis", "", ""],
            [enhancement.industryAnalysis, "", ""],
            ["", "", ""],
            ["Competitive Advantage", "", ""],
            ...enhancement.competitiveAdvantage.map(adv => [adv, "", ""]),
            ["", "", ""],
            ["Risk Assessment", "", ""],
            [enhancement.riskAssessment, "", ""],
            ["", "", ""],
            ["Implementation Guidance", "", ""],
            [enhancement.implementationGuidance, "", ""],
            ["", "", ""],
            ["ROI Justification", "", ""],
            [enhancement.roi_justification, "", ""],
          ]

          const insightsSheet = XLSX.utils.aoa_to_sheet(insightsData)
          insightsSheet['!cols'] = [{ width: 100 }, { width: 10 }, { width: 10 }]
          XLSX.utils.book_append_sheet(workbook, insightsSheet, "AI Insights")
        }

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
        const excelBlob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
        resolve(excelBlob)
      } catch (error) {
        console.error('Excel generation failed:', error)
        // Create a basic fallback Excel
        const workbook = XLSX.utils.book_new()
        const basicData = [["Error generating enhanced report", "Please try again"]]
        const basicSheet = XLSX.utils.aoa_to_sheet(basicData)
        XLSX.utils.book_append_sheet(workbook, basicSheet, "Error")
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
        const excelBlob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
        resolve(excelBlob)
      }
    })
  }

  async generatePowerPoint(type: "executive" | "technical" | "financial" | "board"): Promise<Blob> {
    return new Promise(async (resolve) => {
      try {
        // Enhanced with AI if available
        let enhancement: ReportEnhancement | undefined
        if (this.aiService) {
          try {
            enhancement = await enhanceReport(
              type,
              { tco: this.data.tcoData, roi: this.data.roiData },
              { industry: this.data.industry, devices: this.data.deviceCount },
              this.data.aiConfig!
            )
          } catch (error) {
            console.warn('AI enhancement failed for PowerPoint generation:', error)
          }
        }

        // Create comprehensive PowerPoint structure with AI enhancements
        const presentationData = {
          title: this.data.title,
          subtitle: this.data.subtitle,
          type,
          aiEnhanced: !!enhancement,
          branding: {
            primaryColor: "#10B981", // Portnox green
            secondaryColor: "#047857",
            logoPlaceholder: "PORTNOX CLEAR",
            aiIndicator: enhancement ? "🤖 AI-Enhanced" : "Standard"
          },
          metadata: {
            industry: this.data.industry,
            devices: this.data.deviceCount,
            timeframe: this.data.timeframe,
            generated: this.data.generatedAt.toISOString(),
            aiProvider: this.aiService?.getAvailableProviders().join(", ") || "None"
          },
          slides: [
            {
              type: "title",
              title: this.data.title,
              subtitle: this.data.subtitle + (enhancement ? " - AI Enhanced" : ""),
              footer: `${this.data.industry.charAt(0).toUpperCase() + this.data.industry.slice(1)} Industry Analysis | ${this.data.deviceCount.toLocaleString()} Devices | ${this.data.timeframe} Year Projection`
            },
            {
              type: "agenda",
              title: "Presentation Agenda",
              content: [
                "Executive Summary & Key Findings",
                "AI-Enhanced Financial Impact Analysis",
                "Security & Risk Assessment",
                "Competitive Landscape Overview",
                "Strategic Recommendations",
                "Implementation Roadmap",
                "Next Steps & Action Items"
              ]
            },
            {
              type: "executive_summary",
              title: "Executive Summary",
              subtitle: "AI-Powered Strategic NAC Investment Analysis",
              content: enhancement?.executiveSummary || this.getDefaultExecutiveSummary(type),
              metrics: [
                { label: "Total Savings", value: `$${Math.round((this.calculateCompetitorAverage() - (this.data.tcoData?.PORTNOX?.totalCost || 250000))/1000)}K`, color: "#10B981" },
                { label: "ROI", value: `${this.data.roiData?.roi || 456}%`, color: "#3B82F6" },
                { label: "Payback Period", value: `${((this.data.roiData?.paybackPeriod || 0.5) * 12).toFixed(1)} months`, color: "#8B5CF6" },
                { label: "Risk Reduction", value: "92%", color: "#F59E0B" }
              ],
              aiInsights: enhancement ? enhancement.keyInsights.slice(0, 3) : []
            },
            {
              type: "financial_impact",
              title: "AI-Enhanced Financial Impact Analysis",
              subtitle: `${this.data.timeframe}-Year Total Cost of Ownership Comparison`,
              chart: {
                type: "bar",
                data: [
                  { vendor: "Portnox CLEAR", cost: this.data.tcoData?.PORTNOX?.totalCost || 250000, recommended: true },
                  { vendor: "Cisco ISE", cost: this.data.tcoData?.CISCO_ISE?.totalCost || 750000 },
                  { vendor: "Aruba ClearPass", cost: this.data.tcoData?.ARUBA?.totalCost || 625000 },
                  { vendor: "Forescout", cost: this.data.tcoData?.FORESCOUT?.totalCost || 975000 }
                ]
              },
              insights: enhancement?.keyInsights || [
                "65-75% cost reduction vs traditional solutions",
                "Zero infrastructure investment required",
                "Predictable OpEx model with no hidden costs",
                "Immediate ROI with sub-7 month payback"
              ],
              aiAnalysis: enhancement ? "AI-powered cost optimization analysis included" : "Standard cost analysis"
            },
            // Additional slides would continue here...
          ],
          notes: enhancement ? [
            "This presentation includes AI-enhanced insights and recommendations",
            "Content is customized for your specific industry and requirements using advanced language models",
            "Financial calculations are based on real market data and proven methodologies",
            "Implementation timeline reflects proven deployment experience with AI optimization",
            `AI Provider: ${this.aiService?.getAvailableProviders().join(", ") || "None"}`
          ] : [
            "Financial calculations based on industry benchmarks and market data",
            "Implementation timeline reflects typical deployment experience",
            "Recommendations align with industry best practices",
            "Contact Portnox for AI-enhanced analysis and demonstration"
          ]
        }

        // Convert to blob (simulated PowerPoint format)
        const pptBlob = new Blob([JSON.stringify(presentationData, null, 2)], {
          type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        })
        resolve(pptBlob)
      } catch (error) {
        console.error('PowerPoint generation failed:', error)
        // Create basic fallback
        const basicData = { error: "PowerPoint generation failed", message: "Please try again" }
        const pptBlob = new Blob([JSON.stringify(basicData, null, 2)], {
          type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        })
        resolve(pptBlob)
      }
    })
  }

  private getIndustryCompliance(industry: string): string[] {
    const complianceMap = {
      healthcare: ["HIPAA", "HITECH", "FDA 21 CFR Part 11", "Joint Commission"],
      financial: ["PCI DSS", "SOX", "GLBA", "FFIEC", "PCI DSS"],
      government: ["FedRAMP", "FISMA", "NIST 800-53", "CMMC", "CJIS"],
      education: ["FERPA", "COPPA", "PPRA", "State privacy laws"],
      manufacturing: ["ISO 27001", "NIST CSF", "IEC 62443", "ITAR"],
      retail: ["PCI DSS", "CCPA", "GDPR", "SOX"],
      technology: ["SOC 2", "ISO 27001", "GDPR", "CCPA"],
      energy: ["NERC CIP", "IEC 62443", "NIST CSF", "TSA Pipeline"]
    }
    return complianceMap[industry as keyof typeof complianceMap] || ["ISO 27001", "SOC 2"]
  }

  private getIndustryChallenges(industry: string): string[] {
    const challengesMap = {
      healthcare: ["Medical device integration", "PHI protection", "24/7 availability", "Regulatory audits"],
      financial: ["Real-time transactions", "Fraud prevention", "Regulatory scrutiny", "Third-party risk"],
      government: ["Classified data", "Supply chain security", "Budget constraints", "Compliance complexity"],
      education: ["Student privacy", "BYOD management", "Budget limitations", "Diverse user base"],
      manufacturing: ["OT/IT convergence", "IP protection", "Safety systems", "Global operations"],
      retail: ["POS security", "Customer data", "Seasonal scaling", "Multi-location management"],
      technology: ["Rapid scaling", "IP protection", "Cloud security", "DevOps integration"],
      energy: ["Critical infrastructure", "SCADA security", "Physical security", "Regulatory oversight"]
    }
    return challengesMap[industry as keyof typeof challengesMap] || ["Security", "Compliance", "Operations"]
  }
}
