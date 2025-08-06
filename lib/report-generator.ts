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
    if (data.aiConfig) {
      this.aiService = new AIIntegrationService(data.aiConfig)
    }
  }

  async generatePDF(type: "executive" | "technical" | "financial" | "board"): Promise<Blob> {
    return new Promise(async (resolve) => {
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
            console.warn('AI enhancement failed, proceeding with standard report')
          }
        }

        const doc = new jsPDF()
        let yPosition = 20

        // Add Portnox branding header
        this.addBrandedHeader(doc, yPosition)
        yPosition += 40

        // Executive Summary Section
        this.addExecutiveSummary(doc, yPosition, type, enhancement)
        yPosition += 60

        // Add page break if needed
        if (yPosition > 220) {
          doc.addPage()
          yPosition = 20
        }

        // Key Findings Section
        this.addKeyFindings(doc, yPosition, type, enhancement)
        yPosition += 50

        // Financial Analysis Section
        if (yPosition > 200) {
          doc.addPage()
          yPosition = 20
        }
        this.addFinancialAnalysis(doc, yPosition, type, enhancement)
        yPosition += 60

        // Strategic Recommendations Section
        if (yPosition > 200) {
          doc.addPage()
          yPosition = 20
        }
        this.addStrategicRecommendations(doc, yPosition, type, enhancement)
        yPosition += 50

        // Industry-Specific Analysis (if AI enhanced)
        if (enhancement && yPosition < 200) {
          this.addIndustryAnalysis(doc, yPosition, enhancement)
          yPosition += 40
        }

        // Add footer to all pages
        const pageCount = doc.getNumberOfPages()
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i)
          this.addBrandedFooter(doc)
        }

        const pdfBlob = new Blob([doc.output("blob")], { type: "application/pdf" })
        resolve(pdfBlob)

      } catch (error) {
        console.error('PDF generation failed:', error)
        // Fallback to basic report
        const basicBlob = await this.generateBasicPDF(type)
        resolve(basicBlob)
      }
    })
  }

  private addBrandedHeader(doc: jsPDF, yPosition: number) {
    // Portnox logo placeholder (in real implementation, would load actual logo)
    doc.setFillColor(16, 185, 129) // Portnox green
    doc.rect(20, yPosition, 30, 15, 'F')
    
    doc.setFontSize(12)
    doc.setTextColor(255, 255, 255)
    doc.text("PORTNOX", 22, yPosition + 10)
    
    // Report title and metadata
    doc.setFontSize(20)
    doc.setTextColor(0, 0, 0)
    doc.setFont("helvetica", "bold")
    doc.text(this.data.title, 60, yPosition + 8)
    
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 100, 100)
    doc.text(this.data.subtitle, 60, yPosition + 18)
    
    // Analysis parameters
    doc.setFontSize(10)
    doc.text(`Industry: ${this.data.industry.charAt(0).toUpperCase() + this.data.industry.slice(1)}`, 60, yPosition + 28)
    doc.text(`Analysis: ${this.data.deviceCount.toLocaleString()} devices • ${this.data.timeframe} years • ${this.data.organizationSize} organization`, 60, yPosition + 35)
    doc.text(`Generated: ${this.data.generatedAt.toLocaleDateString()} ${this.data.generatedAt.toLocaleTimeString()}`, 140, yPosition + 35)
  }

  private addBrandedFooter(doc: jsPDF) {
    const pageHeight = doc.internal.pageSize.height
    
    // Footer line
    doc.setDrawColor(16, 185, 129)
    doc.line(20, pageHeight - 20, 190, pageHeight - 20)
    
    // Footer text
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text("© 2024 Portnox Ltd. All rights reserved.", 20, pageHeight - 12)
    doc.text("Confidential and Proprietary - For Internal Use Only", 20, pageHeight - 6)
    
    // Contact information
    doc.text("www.portnox.com", 140, pageHeight - 12)
    doc.text("Enterprise NAC Solutions", 140, pageHeight - 6)
    
    // Page number
    const pageNumber = doc.getCurrentPageInfo().pageNumber
    const totalPages = doc.getNumberOfPages()
    doc.text(`Page ${pageNumber} of ${totalPages}`, 180, pageHeight - 6)
  }

  private addExecutiveSummary(doc: jsPDF, yPosition: number, type: string, enhancement?: ReportEnhancement) {
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0, 0, 0)
    doc.text("Executive Summary", 20, yPosition)
    
    yPosition += 10
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(60, 60, 60)
    
    const summary = enhancement?.executiveSummary || this.getDefaultExecutiveSummary(type)
    const summaryLines = doc.splitTextToSize(summary, 170)
    doc.text(summaryLines, 20, yPosition)
    
    yPosition += summaryLines.length * 4 + 10
    
    // Key metrics box
    doc.setFillColor(240, 252, 249) // Light green background
    doc.rect(20, yPosition, 170, 35, 'F')
    doc.setDrawColor(16, 185, 129)
    doc.rect(20, yPosition, 170, 35)
    
    // Metrics content
    const portnoxTCO = this.data.tcoData?.PORTNOX?.totalCost || 250000
    const competitorAvgTCO = this.calculateCompetitorAverage()
    const savings = competitorAvgTCO - portnoxTCO
    const savingsPercent = Math.round((savings / competitorAvgTCO) * 100)
    const roi = this.data.roiData?.roi || 456
    
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(16, 185, 129)
    doc.text("KEY FINANCIAL METRICS", 25, yPosition + 8)
    
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0)
    doc.text(`• Total Savings: $${Math.round(savings/1000)}K (${savingsPercent}% cost reduction)`, 25, yPosition + 16)
    doc.text(`• Return on Investment: ${roi}% over ${this.data.timeframe} years`, 25, yPosition + 22)
    doc.text(`• Deployment Speed: 99% faster (30 minutes vs 3-6 months)`, 25, yPosition + 28)
  }

  private addKeyFindings(doc: jsPDF, yPosition: number, type: string, enhancement?: ReportEnhancement) {
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Key Findings & Analysis", 20, yPosition)
    
    yPosition += 12
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    
    const findings = enhancement?.keyInsights || this.getDefaultKeyFindings(type)
    
    findings.forEach((finding, index) => {
      // Bullet point
      doc.setFillColor(16, 185, 129)
      doc.circle(23, yPosition + 2, 1, 'F')
      
      // Finding text
      const findingLines = doc.splitTextToSize(finding, 160)
      doc.text(findingLines, 28, yPosition)
      yPosition += findingLines.length * 4 + 3
    })
  }

  private addFinancialAnalysis(doc: jsPDF, yPosition: number, type: string, enhancement?: ReportEnhancement) {
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Financial Impact Analysis", 20, yPosition)
    
    yPosition += 15
    
    // Create financial comparison table
    const portnoxData = this.data.tcoData?.PORTNOX || { totalCost: 250000 }
    const ciscoData = this.data.tcoData?.CISCO_ISE || { totalCost: 750000 }
    const arubaData = this.data.tcoData?.ARUBA || { totalCost: 625000 }
    
    const tableData = [
      ['Vendor Solution', '3-Year TCO', 'Deployment Time', 'Annual OpEx', 'ROI %'],
      ['Portnox CLEAR (Recommended)', `$${Math.round(portnoxData.totalCost/1000)}K`, '30 minutes', `$${Math.round(portnoxData.totalCost/(this.data.timeframe*1000))}K`, `${this.data.roiData?.roi || 456}%`],
      ['Cisco ISE', `$${Math.round(ciscoData.totalCost/1000)}K`, '6 months', `$${Math.round(ciscoData.totalCost/(this.data.timeframe*1000))}K`, '145%'],
      ['Aruba ClearPass', `$${Math.round(arubaData.totalCost/1000)}K`, '3 months', `$${Math.round(arubaData.totalCost/(this.data.timeframe*1000))}K`, '180%'],
    ]
    
    doc.autoTable({
      startY: yPosition,
      head: [tableData[0]],
      body: tableData.slice(1),
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [16, 185, 129], textColor: [255, 255, 255], fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 50, fontStyle: 'bold' },
        1: { cellWidth: 30, halign: 'right' },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 20, halign: 'right' }
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
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Strategic Recommendations", 20, yPosition)
    
    yPosition += 12
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    
    const recommendations = enhancement?.strategicRecommendations || this.getDefaultRecommendations(type)
    
    recommendations.forEach((rec, index) => {
      // Priority indicator
      const priority = index < 2 ? 'HIGH' : index < 4 ? 'MED' : 'LOW'
      const priorityColor = index < 2 ? [220, 38, 127] : index < 4 ? [245, 158, 11] : [107, 114, 128]
      
      doc.setFillColor(...priorityColor)
      doc.rect(20, yPosition - 2, 20, 6, 'F')
      doc.setFontSize(7)
      doc.setTextColor(255, 255, 255)
      doc.setFont("helvetica", "bold")
      doc.text(priority, 22, yPosition + 1)
      
      // Recommendation text
      doc.setFontSize(10)
      doc.setTextColor(0, 0, 0)
      doc.setFont("helvetica", "normal")
      const recLines = doc.splitTextToSize(rec, 145)
      doc.text(recLines, 45, yPosition)
      yPosition += Math.max(recLines.length * 4, 8) + 3
    })
  }

  private addIndustryAnalysis(doc: jsPDF, yPosition: number, enhancement: ReportEnhancement) {
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text(`${this.data.industry.charAt(0).toUpperCase() + this.data.industry.slice(1)} Industry Analysis`, 20, yPosition)
    
    yPosition += 12
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    
    const analysisLines = doc.splitTextToSize(enhancement.industryAnalysis, 170)
    doc.text(analysisLines, 20, yPosition)
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

    return `Our comprehensive analysis of Network Access Control solutions for ${this.data.deviceCount.toLocaleString()} devices over ${this.data.timeframe} years demonstrates that Portnox CLEAR delivers superior value through ${savingsPercent}% cost savings ($${savings}K), industry-leading security with zero CVE vulnerabilities, and 99% faster deployment (30 minutes vs 3-6 months). This ${type} analysis validates Portnox CLEAR as the optimal solution for modern enterprise network security requirements, combining cloud-native architecture with comprehensive Zero Trust capabilities to deliver immediate ROI and long-term strategic value.`
  }

  private getDefaultKeyFindings(type: string): string[] {
    return [
      "Portnox CLEAR delivers 65-75% lower total cost of ownership compared to traditional NAC solutions through cloud-native architecture and operational simplicity",
      "Zero CVE security record provides unprecedented risk mitigation compared to legacy vendors with 15+ annual vulnerabilities",
      "30-minute deployment time represents 99% improvement over traditional NAC solutions requiring 3-6 months implementation",
      "95% compliance automation reduces audit preparation time and costs by 70% while ensuring continuous regulatory adherence",
      "Cloud-native architecture eliminates hardware refresh cycles, maintenance windows, and infrastructure complexity",
      "24/7/365 managed service model reduces IT administrative overhead by 90% compared to self-managed solutions"
    ]
  }

  private getDefaultRecommendations(type: string): string[] {
    return [
      "Immediately initiate Portnox CLEAR proof-of-concept deployment to validate technical capabilities and integration requirements",
      "Schedule executive briefing with Portnox leadership to discuss strategic implementation roadmap and business value realization",
      "Conduct comprehensive assessment of current NAC infrastructure to identify security gaps and migration opportunities",
      "Develop business case presentation for stakeholders highlighting quantified benefits and competitive advantages",
      "Plan phased migration strategy to minimize business disruption while maximizing security improvements",
      "Establish success metrics and performance benchmarks to measure deployment effectiveness and ROI realization"
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
    
    return new Blob([doc.output("blob")], { type: "application/pdf" })
  }

  async generateExcel(type: "executive" | "technical" | "financial" | "board"): Promise<Blob> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
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
            console.warn('AI enhancement failed for Excel generation')
          }
        }

        // Summary sheet with branding
        const summaryData = [
          ["PORTNOX CLEAR - Network Access Control Analysis", "", "", ""],
          ["", "", "", ""],
          ["Report Type", type.charAt(0).toUpperCase() + type.slice(1)],
          ["Industry", this.data.industry.charAt(0).toUpperCase() + this.data.industry.slice(1)],
          ["Device Count", this.data.deviceCount.toLocaleString()],
          ["Analysis Period", `${this.data.timeframe} years`],
          ["Organization Size", this.data.organizationSize],
          ["Generated", this.data.generatedAt.toLocaleDateString()],
          ["", "", "", ""],
          ["KEY FINANCIAL METRICS", "", "", ""],
          ["Portnox CLEAR TCO", `$${Math.round((this.data.tcoData?.PORTNOX?.totalCost || 250000)/1000)}K`],
          ["Industry Average TCO", `$${Math.round(this.calculateCompetitorAverage()/1000)}K`],
          ["Total Savings", `$${Math.round((this.calculateCompetitorAverage() - (this.data.tcoData?.PORTNOX?.totalCost || 250000))/1000)}K`],
          ["ROI Percentage", `${this.data.roiData?.roi || 456}%`],
          ["Payback Period", `${((this.data.roiData?.paybackPeriod || 0.5) * 12).toFixed(1)} months`],
          ["Deployment Time", "30 minutes"],
          ["Security Vulnerabilities", "0 CVEs"],
          ["", "", "", ""],
          ["STRATEGIC ADVANTAGES", "", "", ""],
          ["Cloud-Native Architecture", "✓"],
          ["Zero Infrastructure Required", "✓"],
          ["95% Compliance Automation", "✓"],
          ["24/7 Managed Service", "✓"],
          ["Industry-Leading Security", "✓"],
        ]

        const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
        
        // Style the summary sheet
        summarySheet['!cols'] = [
          { width: 30 }, { width: 20 }, { width: 15 }, { width: 15 }
        ]
        
        XLSX.utils.book_append_sheet(workbook, summarySheet, "Executive Summary")

        // Detailed TCO Analysis sheet
        const tcoData = [
          ["TOTAL COST OF OWNERSHIP ANALYSIS", "", "", "", ""],
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
          ["Category", "Amount", "Percentage", "", ""],
          ["Licensing", `$${Math.round((this.data.tcoData?.PORTNOX?.licensing || 180000)/1000)}K`, "72%"],
          ["Hardware", "$0K", "0%"],
          ["Professional Services", "$0K", "0%"],
          ["Training", "$0K", "0%"],
          ["Maintenance", `$${Math.round((this.data.tcoData?.PORTNOX?.maintenance || 70000)/1000)}K`, "28%"],
          ["", "", "", "", ""],
          ["ROI ANALYSIS", "", "", "", ""],
          ["Year 1 Benefits", `$${Math.round((this.data.roiData?.year1Benefits || 150000)/1000)}K`],
          ["Year 2 Benefits", `$${Math.round((this.data.roiData?.year2Benefits || 200000)/1000)}K`],
          ["Year 3 Benefits", `$${Math.round((this.data.roiData?.year3Benefits || 250000)/1000)}K`],
          ["Total Benefits", `$${Math.round((this.data.roiData?.totalBenefits || 600000)/1000)}K`],
          ["Net Present Value", `$${Math.round((this.data.roiData?.npv || 350000)/1000)}K`],
        ]

        const tcoSheet = XLSX.utils.aoa_to_sheet(tcoData)
        tcoSheet['!cols'] = [
          { width: 25 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }
        ]
        XLSX.utils.book_append_sheet(workbook, tcoSheet, "TCO Analysis")

        // Strategic Recommendations sheet
        const recommendationsData = [
          ["STRATEGIC RECOMMENDATIONS", "", ""],
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
          ["", "", ""],
          ["COMPETITIVE ADVANTAGES", "", ""],
          ["Advantage", "Portnox CLEAR", "Industry Average"],
          ["Security Vulnerabilities", "0 CVEs", "15+ CVEs"],
          ["Deployment Time", "30 minutes", "3-6 months"],
          ["Compliance Automation", "95%", "35%"],
          ["Infrastructure Required", "None", "Extensive"],
          ["Annual Maintenance", "Included", "22% of license"],
        ]

        const recommendationsSheet = XLSX.utils.aoa_to_sheet(recommendationsData)
        recommendationsSheet['!cols'] = [
          { width: 25 }, { width: 30 }, { width: 15 }
        ]
        XLSX.utils.book_append_sheet(workbook, recommendationsSheet, "Recommendations")

        // Add AI-enhanced insights sheet if available
        if (enhancement) {
          const insightsData = [
            ["AI-ENHANCED INSIGHTS", "", ""],
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
            ["Implementation Guidance", "", ""],
            [enhancement.implementationGuidance, "", ""],
          ]

          const insightsSheet = XLSX.utils.aoa_to_sheet(insightsData)
          insightsSheet['!cols'] = [{ width: 80 }, { width: 10 }, { width: 10 }]
          XLSX.utils.book_append_sheet(workbook, insightsSheet, "AI Insights")
        }

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
        const excelBlob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
        resolve(excelBlob)
      }, 2500)
    })
  }

  async generatePowerPoint(type: "executive" | "technical" | "financial" | "board"): Promise<Blob> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
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
            console.warn('AI enhancement failed for PowerPoint generation')
          }
        }

        // Create comprehensive PowerPoint structure
        const presentationData = {
          title: this.data.title,
          subtitle: this.data.subtitle,
          type,
          branding: {
            primaryColor: "#10B981", // Portnox green
            secondaryColor: "#047857",
            logoPlaceholder: "PORTNOX CLEAR"
          },
          metadata: {
            industry: this.data.industry,
            devices: this.data.deviceCount,
            timeframe: this.data.timeframe,
            generated: this.data.generatedAt.toISOString()
          },
          slides: [
            {
              type: "title",
              title: this.data.title,
              subtitle: this.data.subtitle,
              footer: `${this.data.industry.charAt(0).toUpperCase() + this.data.industry.slice(1)} Industry Analysis | ${this.data.deviceCount.toLocaleString()} Devices | ${this.data.timeframe} Year Projection`
            },
            {
              type: "agenda",
              title: "Presentation Agenda",
              content: [
                "Executive Summary & Key Findings",
                "Financial Impact Analysis",
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
              subtitle: "Strategic NAC Investment Analysis",
              content: enhancement?.executiveSummary || this.getDefaultExecutiveSummary(type),
              metrics: [
                { label: "Total Savings", value: `$${Math.round((this.calculateCompetitorAverage() - (this.data.tcoData?.PORTNOX?.totalCost || 250000))/1000)}K`, color: "#10B981" },
                { label: "ROI", value: `${this.data.roiData?.roi || 456}%`, color: "#3B82F6" },
                { label: "Payback Period", value: `${((this.data.roiData?.paybackPeriod || 0.5) * 12).toFixed(1)} months`, color: "#8B5CF6" },
                { label: "Risk Reduction", value: "92%", color: "#F59E0B" }
              ]
            },
            {
              type: "financial_impact",
              title: "Financial Impact Analysis",
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
              insights: [
                "65-75% cost reduction vs traditional solutions",
                "Zero infrastructure investment required",
                "Predictable OpEx model with no hidden costs",
                "Immediate ROI with sub-7 month payback"
              ]
            },
            {
              type: "security_assessment",
              title: "Security & Risk Assessment",
              subtitle: "Comprehensive Security Posture Evaluation",
              comparison: [
                { metric: "CVE Vulnerabilities", portnox: "0", competitors: "15+ annually", advantage: "100%" },
                { metric: "Security Score", portnox: "95/100", competitors: "65/100", advantage: "30 points" },
                { metric: "Incident Response", portnox: "15 minutes", competitors: "4-8 hours", advantage: "96% faster" },
                { metric: "Compliance Automation", portnox: "95%", competitors: "35%", advantage: "60% higher" }
              ],
              riskReduction: {
                breachPrevention: 92,
                complianceViolation: 94,
                operationalDowntime: 86,
                dataExposure: 89
              }
            },
            {
              type: "competitive_landscape",
              title: "Competitive Landscape Overview",
              subtitle: "Market Position & Vendor Comparison",
              vendors: [
                {
                  name: "Portnox CLEAR",
                  position: "Cloud-Native Leader",
                  marketShare: "8.5%",
                  strengths: ["Zero CVEs", "30-min deployment", "95% automation", "Lowest TCO"],
                  weaknesses: ["Newer market presence"],
                  trend: "rapidly growing"
                },
                {
                  name: "Cisco ISE",
                  position: "Legacy Leader",
                  marketShare: "35.2%",
                  strengths: ["Market presence", "Feature depth"],
                  weaknesses: ["55+ CVEs", "6-month deployment", "High TCO"],
                  trend: "declining"
                },
                {
                  name: "Aruba ClearPass",
                  position: "Challenger",
                  marketShare: "18.7%",
                  strengths: ["Good price/performance", "HPE ecosystem"],
                  weaknesses: ["Limited cloud capabilities", "35% automation"],
                  trend: "stable"
                }
              ],
              marketTrends: [
                "78% shift to cloud-native solutions",
                "89% adopting Zero Trust architectures",
                "65% seeking compliance automation",
                "92% prioritizing deployment speed"
              ]
            },
            {
              type: "strategic_recommendations",
              title: "Strategic Recommendations",
              subtitle: "Prioritized Action Plan for NAC Modernization",
              recommendations: enhancement?.strategicRecommendations || this.getDefaultRecommendations(type),
              timeline: [
                { phase: "Phase 1", duration: "Week 1-2", actions: ["PoC deployment", "Executive briefing", "Technical validation"] },
                { phase: "Phase 2", duration: "Week 3-4", actions: ["Business case development", "Stakeholder alignment", "Contract negotiation"] },
                { phase: "Phase 3", duration: "Week 5-6", actions: ["Production deployment", "Staff training", "Legacy migration"] }
              ]
            },
            {
              type: "implementation_roadmap",
              title: "Implementation Roadmap",
              subtitle: "Proven Deployment Methodology",
              phases: [
                {
                  name: "Discovery & Planning",
                  duration: "1-2 weeks",
                  activities: ["Current state assessment", "Requirements gathering", "Success criteria definition"],
                  deliverables: ["Technical requirements", "Implementation plan", "Success metrics"]
                },
                {
                  name: "Proof of Concept",
                  duration: "30 minutes - 1 week",
                  activities: ["Portnox CLEAR deployment", "Integration testing", "Performance validation"],
                  deliverables: ["Working system", "Performance report", "Technical validation"]
                },
                {
                  name: "Production Deployment",
                  duration: "1-2 weeks",
                  activities: ["Production configuration", "Policy migration", "User training"],
                  deliverables: ["Live system", "Trained staff", "Documentation"]
                },
                {
                  name: "Optimization & Growth",
                  duration: "Ongoing",
                  activities: ["Performance monitoring", "Feature expansion", "Continuous improvement"],
                  deliverables: ["Optimized performance", "Enhanced capabilities", "Measured ROI"]
                }
              ],
              benefits: {
                immediate: ["Enhanced security posture", "Simplified operations", "Cost savings realization"],
                shortTerm: ["Full policy automation", "Compliance alignment", "User productivity gains"],
                longTerm: ["Strategic platform foundation", "Innovation enablement", "Competitive advantage"]
              }
            },
            {
              type: "industry_specific",
              title: `${this.data.industry.charAt(0).toUpperCase() + this.data.industry.slice(1)} Industry Insights`,
              subtitle: "Industry-Specific NAC Requirements & Solutions",
              content: enhancement?.industryAnalysis || `${this.data.industry.charAt(0).toUpperCase() + this.data.industry.slice(1)} organizations face unique security challenges requiring specialized NAC capabilities including regulatory compliance, industry-specific threat protection, and operational requirements.`,
              compliance: this.getIndustryCompliance(this.data.industry),
              challenges: this.getIndustryChallenges(this.data.industry),
              solutions: [
                "Pre-built compliance templates",
                "Industry-specific device profiling",
                "Automated regulatory reporting",
                "Specialized security policies"
              ]
            },
            {
              type: "next_steps",
              title: "Next Steps & Action Items",
              subtitle: "Immediate Actions for NAC Modernization",
              immediateActions: [
                {
                  action: "Schedule Portnox CLEAR demonstration",
                  owner: "IT Leadership",
                  timeline: "This week",
                  priority: "High"
                },
                {
                  action: "Initiate proof-of-concept deployment",
                  owner: "Technical Team",
                  timeline: "Next week",
                  priority: "High"
                },
                {
                  action: "Prepare executive business case",
                  owner: "Project Sponsor",
                  timeline: "Week 2",
                  priority: "Medium"
                }
              ],
              contacts: {
                sales: "sales@portnox.com",
                technical: "support@portnox.com",
                executive: "leadership@portnox.com"
              },
              resources: [
                "Technical documentation: docs.portnox.com",
                "Customer success stories: portnox.com/customers",
                "ROI calculator: portnox.com/roi-calculator",
                "Security validation: portnox.com/security"
              ]
            },
            {
              type: "appendix",
              title: "Appendix: Technical Specifications",
              subtitle: "Detailed Technical Information",
              sections: [
                {
                  title: "Architecture Overview",
                  content: "Portnox CLEAR cloud-native architecture details"
                },
                {
                  title: "Integration Capabilities",
                  content: "Supported integrations and APIs"
                },
                {
                  title: "Compliance Frameworks",
                  content: "Detailed compliance coverage matrix"
                },
                {
                  title: "Performance Metrics",
                  content: "Benchmark performance data and SLAs"
                }
              ]
            }
          ],
          notes: enhancement ? [
            "This presentation includes AI-enhanced insights and recommendations",
            "Content is customized for your specific industry and requirements",
            "Financial calculations are based on real market data and proven methodologies",
            "Implementation timeline reflects proven deployment experience"
          ] : [
            "Financial calculations based on industry benchmarks and market data",
            "Implementation timeline reflects typical deployment experience",
            "Recommendations align with industry best practices",
            "Contact Portnox for customized analysis and demonstration"
          ]
        }

        // Convert to blob (simulated PowerPoint format)
        const pptBlob = new Blob([JSON.stringify(presentationData, null, 2)], {
          type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        })
        resolve(pptBlob)
      }, 3000)
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
