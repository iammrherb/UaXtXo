"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Download,
  FileText,
  Mail,
  Calendar,
  Settings,
  Eye,
  Share2,
  Printer,
  Save,
  Clock,
  Building,
  BarChart3,
  TrendingUp,
  Shield,
  DollarSign,
  Zap,
  Award,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Brain,
  Target,
  Globe,
  Users,
  Lock,
} from "lucide-react"
import AnimatedPortnoxLogo from "@/components/animated-portnox-logo"
import { EnhancedReportGenerator } from "@/lib/report-generator"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ReportsViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function ReportsView({ results = [], config }: ReportsViewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("executive")
  const [reportTitle, setReportTitle] = useState("Enterprise Network Access Control Strategic Analysis")
  const [reportDescription, setReportDescription] = useState(
    "Comprehensive evaluation and strategic recommendations for NAC vendor selection with AI-enhanced insights and competitive intelligence.",
  )
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeDetails, setIncludeDetails] = useState(true)
  const [includeAIEnhancement, setIncludeAIEnhancement] = useState(true)
  const [includeBenchmarks, setIncludeBenchmarks] = useState(true)
  const [includeRoadmap, setIncludeRoadmap] = useState(true)
  const [includeCompliance, setIncludeCompliance] = useState(true)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [scheduleFrequency, setScheduleFrequency] = useState("none")
  const [executiveSummary, setExecutiveSummary] = useState("")
  const [keyRecommendations, setKeyRecommendations] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  // Enhanced report templates with comprehensive content
  const reportTemplates = [
    {
      id: "executive",
      name: "Executive Strategic Brief",
      description: "C-suite focused strategic analysis with ROI justification and competitive positioning",
      pages: "8-12 pages",
      audience: "CEO, CTO, CISO, Board Members",
      icon: <Building className="h-4 w-4" />,
      sections: [
        "Executive Summary",
        "Strategic Recommendations",
        "Financial Impact",
        "Risk Assessment",
        "Implementation Roadmap",
      ],
      aiPrompt:
        "Generate executive-level strategic analysis focusing on business impact, competitive advantage, and ROI justification for NAC investment decisions.",
    },
    {
      id: "technical",
      name: "Technical Architecture Assessment",
      description: "Comprehensive technical evaluation with architecture diagrams and integration analysis",
      pages: "15-25 pages",
      audience: "IT Architects, Engineering Teams, Technical Leadership",
      icon: <Settings className="h-4 w-4" />,
      sections: [
        "Architecture Analysis",
        "Integration Requirements",
        "Security Assessment",
        "Performance Benchmarks",
        "Implementation Guide",
      ],
      aiPrompt:
        "Provide detailed technical analysis including architecture comparisons, integration complexity, security posture evaluation, and implementation best practices.",
    },
    {
      id: "financial",
      name: "Financial Impact & ROI Analysis",
      description: "Detailed financial modeling with TCO analysis and budget planning",
      pages: "12-18 pages",
      audience: "CFO, Finance Teams, Procurement, Budget Planners",
      icon: <DollarSign className="h-4 w-4" />,
      sections: ["TCO Analysis", "ROI Calculations", "Budget Planning", "Cost Optimization", "Financial Projections"],
      aiPrompt:
        "Generate comprehensive financial analysis with detailed TCO breakdowns, ROI projections, budget impact assessment, and cost optimization strategies.",
    },
    {
      id: "security",
      name: "Cybersecurity & Risk Assessment",
      description: "Security posture analysis with threat modeling and compliance mapping",
      pages: "10-15 pages",
      audience: "CISO, Security Teams, Risk Management, Compliance Officers",
      icon: <Shield className="h-4 w-4" />,
      sections: ["Security Posture", "Threat Analysis", "Compliance Mapping", "Risk Mitigation", "Security Roadmap"],
      aiPrompt:
        "Analyze security capabilities, threat landscape, compliance requirements, and risk mitigation strategies for NAC solutions.",
    },
    {
      id: "compliance",
      name: "Regulatory Compliance Report",
      description: "Compliance framework analysis with audit readiness and regulatory mapping",
      pages: "8-12 pages",
      audience: "Compliance Officers, Legal Teams, Auditors, Risk Management",
      icon: <Award className="h-4 w-4" />,
      sections: ["Compliance Framework", "Regulatory Mapping", "Audit Readiness", "Gap Analysis", "Remediation Plan"],
      aiPrompt:
        "Evaluate compliance capabilities against regulatory frameworks, identify gaps, and provide remediation strategies.",
    },
    {
      id: "board",
      name: "Board Presentation Deck",
      description: "High-level strategic presentation with key metrics and recommendations",
      pages: "20-30 slides",
      audience: "Board of Directors, Executive Committee, Investors",
      icon: <TrendingUp className="h-4 w-4" />,
      sections: [
        "Strategic Overview",
        "Market Analysis",
        "Investment Justification",
        "Risk & Opportunity",
        "Next Steps",
      ],
      aiPrompt:
        "Create board-level presentation focusing on strategic value, market positioning, investment rationale, and business impact.",
    },
    {
      id: "comprehensive",
      name: "Complete Enterprise Analysis",
      description: "All-inclusive analysis combining all perspectives and stakeholder needs",
      pages: "35-50 pages",
      audience: "All Stakeholders, Project Teams, Decision Makers",
      icon: <Globe className="h-4 w-4" />,
      sections: [
        "All Sections Combined",
        "Cross-functional Analysis",
        "Stakeholder Matrix",
        "Decision Framework",
        "Action Plan",
      ],
      aiPrompt:
        "Provide comprehensive analysis covering all aspects: strategic, technical, financial, security, and compliance perspectives.",
    },
  ]

  // Generate report preview data with enhanced metrics
  const reportPreview = useMemo(() => {
    if (results.length === 0) return null

    const portnoxResult = results.find((r) => r.vendorId === "portnox")
    const competitorResults = results.filter((r) => r.vendorId !== "portnox")

    if (!portnoxResult || competitorResults.length === 0) return null

    const lowestCost = Math.min(...results.map((r) => r.totalCost))
    const highestCost = Math.max(...results.map((r) => r.totalCost))
    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const savings = avgCompetitorCost - portnoxResult.totalCost
    const savingsPercent = ((savings / avgCompetitorCost) * 100).toFixed(0)

    const roi = portnoxResult.financialMetrics.roi
    const payback = portnoxResult.financialMetrics.paybackPeriod

    const lowestCostVendor = results.find((r) => r.totalCost === lowestCost)
    const bestROIVendor = results.find(
      (r) => r.financialMetrics.roi === Math.max(...results.map((r) => r.financialMetrics.roi)),
    )

    return {
      totalVendors: results.length,
      analysisDevices: config?.devices || 0,
      analysisPeriod: config?.years || 3,
      maxSavings: savings,
      savingsPercent,
      lowestCostVendor: lowestCostVendor?.vendorName,
      lowestCost,
      portnoxCost: portnoxResult.totalCost,
      avgCompetitorCost,
      bestROI: roi,
      bestROIVendor: bestROIVendor?.vendorName,
      avgPayback: payback,
      industry: config?.industry || "technology",
      orgSize: config?.orgSize || "medium",
      securityScore: portnoxResult.securityScore,
      complianceScore: portnoxResult.complianceScore,
      riskReduction: 92, // Based on Portnox's security posture
      deploymentTime: "30 minutes",
      competitorDeploymentTime: "3-6 months",
    }
  }, [results, config])

  // AI Enhancement prompts for different report types
  const getAIPrompt = (templateId: string) => {
    const template = reportTemplates.find((t) => t.id === templateId)
    const basePrompt = template?.aiPrompt || ""

    const contextPrompt = `
    Context: Network Access Control vendor analysis for ${config?.industry || "technology"} industry, 
    ${config?.devices || 0} devices, ${config?.years || 3} year analysis period.
    
    Key Data Points:
    - Portnox CLEAR: $${reportPreview?.portnoxCost?.toLocaleString() || "0"} total cost
    - Average Competitor: $${reportPreview?.avgCompetitorCost?.toLocaleString() || "0"} total cost  
    - Potential Savings: $${reportPreview?.maxSavings?.toLocaleString() || "0"} (${reportPreview?.savingsPercent || "0"}%)
    - ROI: ${reportPreview?.bestROI || "0"}%
    - Payback Period: ${reportPreview?.avgPayback || "0"} years
    - Security Score: ${reportPreview?.securityScore || "0"}/100
    - Deployment Time: ${reportPreview?.deploymentTime || "N/A"} vs ${reportPreview?.competitorDeploymentTime || "N/A"}
    
    ${basePrompt}
    
    Please provide detailed, professional analysis with specific recommendations, 
    quantified benefits, and actionable insights suitable for ${template?.audience || "stakeholders"}.
    Include industry-specific considerations and competitive intelligence.
    `

    return contextPrompt
  }

  // Handle report generation with AI enhancement
  const handleGenerateReport = async (format: string) => {
    if (!reportPreview) {
      alert("Please complete your vendor analysis first.")
      return
    }

    setIsGenerating(true)

    try {
      const selectedTemplateData = reportTemplates.find((t) => t.id === selectedTemplate)

      // Prepare enhanced report data
      const reportData = {
        title: reportTitle,
        subtitle: reportDescription,
        template: selectedTemplate,
        templateData: selectedTemplateData,
        format,
        generatedAt: new Date(),
        industry: config?.industry || "technology",
        deviceCount: config?.devices || 0,
        timeframe: config?.years || 3,
        organizationSize: config?.orgSize || "medium",
        region: config?.region || "north-america",

        // Analysis results
        results,
        config,
        preview: reportPreview,

        // Report options
        includeCharts,
        includeDetails,
        includeAIEnhancement,
        includeBenchmarks,
        includeRoadmap,
        includeCompliance,

        // Custom content
        executiveSummary: executiveSummary || "AI-generated executive summary will be included",
        keyRecommendations: keyRecommendations || "AI-generated recommendations will be included",

        // AI enhancement
        aiPrompt: includeAIEnhancement ? getAIPrompt(selectedTemplate) : null,

        // Branding
        branding: {
          logo: "/portnox-logo.png",
          primaryColor: "#10B981",
          secondaryColor: "#047857",
          companyName: "Portnox Ltd.",
          tagline: "Enterprise Network Access Control Solutions",
        },
      }

      // Initialize report generator
      const generator = new EnhancedReportGenerator(reportData)

      let blob: Blob

      // Generate report based on format
      switch (format.toLowerCase()) {
        case "pdf":
          blob = await generator.generatePDF(selectedTemplate as any)
          break
        case "docx":
        case "word":
          blob = await generator.generateWord(selectedTemplate as any)
          break
        case "pptx":
        case "powerpoint":
          blob = await generator.generatePowerPoint(selectedTemplate as any)
          break
        case "xlsx":
        case "excel":
          blob = await generator.generateExcel(selectedTemplate as any)
          break
        default:
          blob = await generator.generatePDF(selectedTemplate as any)
      }

      // Download the generated report
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${reportTitle.replace(/\s+/g, "_")}_${selectedTemplate}_${format.toLowerCase()}.${format.toLowerCase()}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Report generation failed:", error)
      alert("Report generation failed. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Handle email scheduling
  const handleScheduleEmail = () => {
    console.log(`Scheduling ${scheduleFrequency} email reports to ${recipientEmail}`)
    alert(`Email scheduling configured: ${scheduleFrequency} reports to ${recipientEmail}`)
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Analysis Required</h3>
              <p className="text-muted-foreground mb-4">
                Please complete your vendor analysis to generate professional reports.
              </p>
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Start Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Portnox Branding */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AnimatedPortnoxLogo width={60} height={40} showText={true} animate={true} />
              <div>
                <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Enterprise Report Generator
                </CardTitle>
                <CardDescription className="text-lg">
                  AI-Enhanced Professional Reports for Strategic Decision Making
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-green-600 text-white px-3 py-1">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Report Configuration
          </CardTitle>
          <CardDescription>Customize your professional analysis report settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="report-title">Report Title</Label>
              <Input
                id="report-title"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                placeholder="Enter professional report title"
                className="font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-template">Report Template</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select professional template" />
                </SelectTrigger>
                <SelectContent>
                  {reportTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex items-center gap-2">
                        {template.icon}
                        {template.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="report-description">Executive Summary</Label>
            <Textarea
              id="report-description"
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              placeholder="Add executive summary or key message for stakeholders..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="key-recommendations">Key Recommendations (Optional)</Label>
            <Textarea
              id="key-recommendations"
              value={keyRecommendations}
              onChange={(e) => setKeyRecommendations(e.target.value)}
              placeholder="Add specific recommendations or strategic guidance..."
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Report Options */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Report Enhancement Options</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="include-charts" checked={includeCharts} onCheckedChange={setIncludeCharts} />
                <Label htmlFor="include-charts" className="text-sm flex items-center gap-1">
                  <BarChart3 className="h-3 w-3" />
                  Charts & Graphs
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-details" checked={includeDetails} onCheckedChange={setIncludeDetails} />
                <Label htmlFor="include-details" className="text-sm flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  Detailed Analysis
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-ai" checked={includeAIEnhancement} onCheckedChange={setIncludeAIEnhancement} />
                <Label htmlFor="include-ai" className="text-sm flex items-center gap-1">
                  <Brain className="h-3 w-3" />
                  AI Enhancement
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-benchmarks" checked={includeBenchmarks} onCheckedChange={setIncludeBenchmarks} />
                <Label htmlFor="include-benchmarks" className="text-sm flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  Industry Benchmarks
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-roadmap" checked={includeRoadmap} onCheckedChange={setIncludeRoadmap} />
                <Label htmlFor="include-roadmap" className="text-sm flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Implementation Roadmap
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-compliance" checked={includeCompliance} onCheckedChange={setIncludeCompliance} />
                <Label htmlFor="include-compliance" className="text-sm flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Compliance Analysis
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Professional Report Templates
          </CardTitle>
          <CardDescription>Choose the perfect template for your audience and objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportTemplates.map((template) => (
              <div
                key={template.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate === template.id
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20 shadow-md"
                    : "border-muted hover:border-green-300"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {template.icon}
                    <h4 className="font-semibold text-sm">{template.name}</h4>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {template.pages}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span className="font-medium">Target Audience:</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-4">{template.audience}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3" />
                    <span className="font-medium">Key Sections:</span>
                  </div>
                  <div className="flex flex-wrap gap-1 pl-4">
                    {template.sections.slice(0, 3).map((section) => (
                      <Badge key={section} variant="secondary" className="text-[10px] py-0 h-4">
                        {section}
                      </Badge>
                    ))}
                    {template.sections.length > 3 && (
                      <Badge variant="secondary" className="text-[10px] py-0 h-4">
                        +{template.sections.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Preview and Generation */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Enhanced Report Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Report Preview
            </CardTitle>
            <CardDescription>
              Preview of your {reportTemplates.find((t) => t.id === selectedTemplate)?.name} report
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportPreview && (
              <>
                {/* Report Header Preview */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-3">
                    <AnimatedPortnoxLogo width={40} height={28} showText={false} animate={false} />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-green-800 dark:text-green-200">{reportTitle}</h3>
                      <p className="text-sm text-green-600 dark:text-green-300">
                        {reportTemplates.find((t) => t.id === selectedTemplate)?.name}
                      </p>
                    </div>
                    {includeAIEnhancement && (
                      <Badge className="bg-blue-600 text-white">
                        <Brain className="h-3 w-3 mr-1" />
                        AI Enhanced
                      </Badge>
                    )}
                  </div>
                  {reportDescription && (
                    <p className="text-sm text-muted-foreground italic border-l-2 border-green-300 pl-3">
                      "{reportDescription}"
                    </p>
                  )}
                </div>

                {/* Analysis Scope */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Analysis Scope</span>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Vendors Analyzed:</span>
                        <span className="font-medium">{reportPreview.totalVendors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Device Count:</span>
                        <span className="font-medium">{reportPreview.analysisDevices.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Period:</span>
                        <span className="font-medium">{reportPreview.analysisPeriod} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Industry:</span>
                        <span className="font-medium capitalize">{reportPreview.industry}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Key Metrics</span>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Total Savings:</span>
                        <span className="font-medium text-green-600">${reportPreview.maxSavings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ROI:</span>
                        <span className="font-medium text-blue-600">{reportPreview.bestROI.toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payback:</span>
                        <span className="font-medium">{reportPreview.avgPayback.toFixed(1)} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Security Score:</span>
                        <span className="font-medium text-green-600">{reportPreview.securityScore}/100</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Findings Preview */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    Executive Key Findings:
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <span>
                        <strong>Cost Leadership:</strong> Portnox CLEAR delivers $
                        {reportPreview.maxSavings.toLocaleString()}({reportPreview.savingsPercent}%) in total cost
                        savings compared to traditional NAC solutions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span>
                        <strong>Exceptional ROI:</strong> {reportPreview.bestROI.toFixed(0)}% return on investment with{" "}
                        {reportPreview.avgPayback.toFixed(1)}-year payback period demonstrates compelling business value
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                      <span>
                        <strong>Deployment Advantage:</strong> {reportPreview.deploymentTime} deployment vs
                        {reportPreview.competitorDeploymentTime} for competitors represents 99% faster time-to-value
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <span>
                        <strong>Security Excellence:</strong> {reportPreview.securityScore}/100 security rating with
                        {reportPreview.riskReduction}% risk reduction through zero-vulnerability architecture
                      </span>
                    </li>
                  </ul>
                </div>

                {/* AI Enhancement Preview */}
                {includeAIEnhancement && (
                  <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                    <Brain className="h-4 w-4" />
                    <AlertTitle className="text-blue-900 dark:text-blue-100">AI Enhancement Active</AlertTitle>
                    <AlertDescription className="text-blue-800 dark:text-blue-200">
                      This report will include AI-powered insights, industry-specific analysis, and intelligent
                      recommendations tailored for {reportTemplates.find((t) => t.id === selectedTemplate)?.audience}.
                      <div className="mt-2 p-2 bg-blue-100 dark:bg-blue-900/30 rounded text-xs">
                        <strong>AI Prompt Preview:</strong> {getAIPrompt(selectedTemplate).substring(0, 200)}...
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Generation Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Professional Report Generation
            </CardTitle>
            <CardDescription>Generate boardroom-ready reports in multiple formats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Export Formats */}
            <div className="space-y-3">
              <h4 className="font-semibold">Export Formats</h4>
              <div className="grid gap-3">
                <Button
                  onClick={() => handleGenerateReport("PDF")}
                  className="justify-start h-12 bg-red-600 hover:bg-red-700"
                  disabled={isGenerating}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Professional PDF Report</div>
                    <div className="text-xs opacity-90">Executive-ready with charts & branding</div>
                  </div>
                  {isGenerating && <div className="ml-auto animate-spin">⏳</div>}
                </Button>

                <Button
                  onClick={() => handleGenerateReport("DOCX")}
                  className="justify-start h-12 bg-blue-600 hover:bg-blue-700"
                  disabled={isGenerating}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Microsoft Word Document</div>
                    <div className="text-xs opacity-90">Editable format with full formatting</div>
                  </div>
                  {isGenerating && <div className="ml-auto animate-spin">⏳</div>}
                </Button>

                <Button
                  onClick={() => handleGenerateReport("PPTX")}
                  className="justify-start h-12 bg-orange-600 hover:bg-orange-700"
                  disabled={isGenerating}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">PowerPoint Presentation</div>
                    <div className="text-xs opacity-90">Board-ready slides with visuals</div>
                  </div>
                  {isGenerating && <div className="ml-auto animate-spin">⏳</div>}
                </Button>

                <Button
                  onClick={() => handleGenerateReport("XLSX")}
                  className="justify-start h-12 bg-green-600 hover:bg-green-700"
                  disabled={isGenerating}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Excel Workbook</div>
                    <div className="text-xs opacity-90">Data analysis with interactive charts</div>
                  </div>
                  {isGenerating && <div className="ml-auto animate-spin">⏳</div>}
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h4 className="font-semibold">Quick Actions</h4>
              <div className="grid gap-2">
                <Button variant="outline" className="justify-start bg-transparent">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Report Preview
                </Button>
                <Button variant="outline" className="justify-start bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Analysis Link
                </Button>
                <Button variant="outline" className="justify-start bg-transparent">
                  <Save className="h-4 w-4 mr-2" />
                  Save Report Template
                </Button>
              </div>
            </div>

            {/* Generation Progress */}
            {isGenerating && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="animate-spin">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-blue-900 dark:text-blue-100">
                    Generating Professional Report...
                  </span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                  {includeAIEnhancement ? "AI enhancement in progress..." : "Formatting professional content..."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Email Scheduling */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Automated Report Distribution
          </CardTitle>
          <CardDescription>Schedule automatic report delivery to stakeholders</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="manual" className="space-y-4">
            <TabsList>
              <TabsTrigger value="manual">Send Now</TabsTrigger>
              <TabsTrigger value="schedule">Schedule Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="recipient-email">Recipient Email</Label>
                  <Input
                    id="recipient-email"
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="stakeholder@company.com"
                  />
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Professional Report
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="schedule-email">Stakeholder Email</Label>
                  <Input
                    id="schedule-email"
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="executive@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule-frequency">Frequency</Label>
                  <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Schedule</SelectItem>
                      <SelectItem value="weekly">Weekly Updates</SelectItem>
                      <SelectItem value="monthly">Monthly Reports</SelectItem>
                      <SelectItem value="quarterly">Quarterly Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={handleScheduleEmail}
                    disabled={scheduleFrequency === "none" || !recipientEmail}
                    className="w-full"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Distribution
                  </Button>
                </div>
              </div>

              {scheduleFrequency !== "none" && (
                <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle className="text-green-900 dark:text-green-100">Scheduling Configured</AlertTitle>
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    Professional {scheduleFrequency} reports will be automatically generated and sent to{" "}
                    {recipientEmail}. Each report will include the latest analysis data and AI-enhanced insights.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Report History & Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Report History & Analytics
          </CardTitle>
          <CardDescription>Track report generation and stakeholder engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Mock report history with enhanced details */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Executive Strategic Brief - NAC Analysis</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Generated 2 hours ago</span>
                    <Badge variant="outline">PDF</Badge>
                    <Badge variant="outline">AI Enhanced</Badge>
                    <span>12 pages</span>
                    <span>3 downloads</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Technical Architecture Assessment</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Generated yesterday</span>
                    <Badge variant="outline">DOCX</Badge>
                    <Badge variant="outline">Standard</Badge>
                    <span>18 pages</span>
                    <span>7 downloads</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">Board Presentation Deck - Q4 Security Investment</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Generated 3 days ago</span>
                    <Badge variant="outline">PPTX</Badge>
                    <Badge variant="outline">AI Enhanced</Badge>
                    <span>25 slides</span>
                    <span>12 downloads</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer with Portnox Branding */}
      <Card className="bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-900 dark:to-green-950/20 border-green-200 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AnimatedPortnoxLogo width={80} height={32} showText={true} animate={false} />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium">Professional Report Generation Platform</p>
                <p>© 2024 Portnox Ltd. All rights reserved. | Enterprise NAC Solutions</p>
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>AI-Enhanced Business Intelligence</p>
              <p>Powered by Advanced Analytics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
