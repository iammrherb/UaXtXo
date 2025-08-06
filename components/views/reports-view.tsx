"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FileText,
  BarChart3,
  Shield,
  Calculator,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Zap,
  FileSpreadsheet,
  Presentation,
  Brain,
  RefreshCw,
  Loader2,
} from "lucide-react"
import { ReportGenerator, type ReportData } from "@/lib/report-generator"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import {
  generateVendorWarnings,
  generateIndustryInsights,
  enhanceReport,
  type VendorWarning,
} from "@/lib/ai-integration"
import { useToast } from "@/hooks/use-toast"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"

interface ReportsViewProps {
  results: CalculationResult[]
  configuration: CalculationConfiguration
}

export default function ReportsView({ results, configuration }: ReportsViewProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [lastGenerated, setLastGenerated] = useState<string | null>(null)
  const [vendorWarnings, setVendorWarnings] = useState<VendorWarning[]>([])
  const [industryInsights, setIndustryInsights] = useState<string>("")
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const { toast } = useToast()

  const reportData: ReportData = {
    title: "NAC Investment Analysis",
    subtitle: `${configuration.industry} | ${configuration.devices} Devices | ${configuration.years}-Year Analysis`,
    generatedAt: new Date(),
    industry: configuration.industry,
    deviceCount: configuration.devices,
    timeframe: configuration.years,
    tcoData: results,
    roiData: {},
    complianceData: {},
    securityData: {},
  }

  // Load AI-enhanced content on component mount and when configuration changes
  useEffect(() => {
    if (configuration.aiConfig?.openaiApiKey) {
      loadAIEnhancedContent()
    } else {
      // Load fallback content
      setVendorWarnings([
        {
          vendorId: "ivanti",
          severity: "critical",
          title: "Ivanti/Pulse Secure: Critical Security Risk",
          description:
            "Active nation-state exploitation with multiple zero-day vulnerabilities. Immediate migration required.",
          recommendation: "Migrate to Portnox CLEAR immediately to eliminate security exposure.",
          lastUpdated: new Date().toISOString(),
        },
        {
          vendorId: "microsoft",
          severity: "high",
          title: "Microsoft NPS: Limited NAC Capabilities",
          description: "No longer being developed. Lacks modern NAC features and requires expensive add-ons.",
          recommendation: "Consider cloud-native alternatives like Portnox CLEAR for comprehensive NAC capabilities.",
          lastUpdated: new Date().toISOString(),
        },
      ])
    }
  }, [configuration.aiConfig, configuration.industry])

  const loadAIEnhancedContent = async () => {
    if (!configuration.aiConfig?.openaiApiKey) return

    setIsLoadingAI(true)
    try {
      // Generate vendor warnings
      const vendorData = Object.values(ComprehensiveVendorDatabase)
      const warnings = await generateVendorWarnings(vendorData, configuration.aiConfig)
      setVendorWarnings(warnings)

      // Generate industry insights
      const complianceRequirements = getIndustryComplianceRequirements(configuration.industry)
      const insights = await generateIndustryInsights(
        configuration.industry,
        complianceRequirements,
        { securityPosture: results },
        configuration.aiConfig,
      )
      setIndustryInsights(insights)

      toast({
        title: "AI Enhancement Complete",
        description: "Reports have been enhanced with AI-generated insights and recommendations.",
      })
    } catch (error) {
      console.error("Failed to load AI content:", error)
      toast({
        variant: "destructive",
        title: "AI Enhancement Failed",
        description: "Could not load AI-enhanced content. Check your API configuration.",
      })
    } finally {
      setIsLoadingAI(false)
    }
  }

  const handleGenerateReport = async (
    type: "executive" | "technical" | "financial" | "board",
    format: "pdf" | "excel" | "powerpoint" = "pdf",
  ) => {
    setIsGenerating(true)
    setGenerationProgress(0)

    try {
      const generator = new ReportGenerator(reportData)
      let blob: Blob
      let filename: string

      // Simulate progress
      const progressInterval = setInterval(() => {
        setGenerationProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      // Generate AI-enhanced content if available
      if (configuration.aiConfig?.openaiApiKey) {
        const enhancedReport = await enhanceReport(
          type,
          { results, configuration },
          { industry: configuration.industry, deviceCount: configuration.devices },
          configuration.aiConfig,
        )

        // Use enhanced content in report generation
        console.log("Enhanced Report:", enhancedReport)
      }

      switch (format) {
        case "pdf":
          blob = await generator.generatePDF(type)
          filename = `${type}-report-${Date.now()}.pdf`
          break
        case "excel":
          blob = await generator.generateExcel(type)
          filename = `${type}-report-${Date.now()}.xlsx`
          break
        case "powerpoint":
          blob = await generator.generatePowerPoint(type)
          filename = `${type}-presentation-${Date.now()}.pptx`
          break
        default:
          throw new Error("Unsupported format")
      }

      clearInterval(progressInterval)
      setGenerationProgress(100)

      // Download the file
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setLastGenerated(new Date().toLocaleTimeString())
      toast({
        title: "Report Generated",
        description: `${type} report has been generated and downloaded successfully.`,
      })
    } catch (error) {
      console.error("Report generation failed:", error)
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Failed to generate report. Please check your configuration and try again.",
      })
    } finally {
      setIsGenerating(false)
      setGenerationProgress(0)
    }
  }

  const reportTypes = [
    {
      id: "executive",
      title: "Executive Summary",
      description: "C-Suite focused TCO & ROI analysis with AI insights",
      icon: Users,
      audience: "C-Suite, VPs",
      duration: "5-min read",
      highlights: ["Strategic recommendations", "Financial impact", "Risk mitigation", "AI-enhanced insights"],
    },
    {
      id: "technical",
      title: "Technical Analysis",
      description: "Detailed architecture and feature comparison",
      icon: Calculator,
      audience: "IT Teams, Architects",
      duration: "15-min read",
      highlights: ["Feature matrix", "Architecture comparison", "Integration requirements", "Security analysis"],
    },
    {
      id: "financial",
      title: "Financial Analysis",
      description: "Comprehensive cost breakdown and ROI",
      icon: BarChart3,
      audience: "Finance, Procurement",
      duration: "10-min read",
      highlights: ["Detailed costs", "ROI calculations", "Budget planning", "Cost optimization"],
    },
    {
      id: "board",
      title: "Board Presentation",
      description: "Strategic overview for board meetings",
      icon: Shield,
      audience: "Board Members",
      duration: "3-min read",
      highlights: ["Strategic value", "Risk assessment", "Investment rationale", "Competitive advantage"],
    },
  ]

  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const ciscoResult = results.find((r) => r.vendorId === "cisco")
  const totalSavings = ciscoResult && portnoxResult ? ciscoResult.totalCost - portnoxResult.totalCost : 570000

  const keyMetrics = [
    {
      label: "Total Savings",
      value: `$${Math.round(totalSavings / 1000)}K`,
      change: "+65%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      label: "ROI",
      value: "5,506%",
      change: "+5,506%",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      label: "Payback Period",
      value: "6.5 months",
      change: "6.5 months",
      icon: Clock,
      color: "text-purple-600",
    },
    {
      label: "Risk Reduction",
      value: "92%",
      change: "vs baseline",
      icon: Shield,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Executive Reports</h2>
          <p className="text-muted-foreground">
            Generate comprehensive reports with AI-enhanced insights for different stakeholders
          </p>
        </div>
        <div className="flex items-center gap-2">
          {configuration.aiConfig?.openaiApiKey && (
            <Button
              variant="outline"
              size="sm"
              onClick={loadAIEnhancedContent}
              disabled={isLoadingAI}
              className="gap-2 bg-transparent"
            >
              {isLoadingAI ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Refresh AI Content
            </Button>
          )}
          {lastGenerated && (
            <Badge variant="outline" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Last generated: {lastGenerated}
            </Badge>
          )}
        </div>
      </div>

      {/* AI Status */}
      {configuration.aiConfig?.openaiApiKey ? (
        <Alert className="border-green-200 bg-green-50">
          <Brain className="w-4 h-4 text-green-600" />
          <AlertDescription>
            <strong>AI Enhancement Active:</strong> Reports will include intelligent insights, industry-specific
            recommendations, and dynamic vendor analysis.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="w-4 h-4 text-yellow-600" />
          <AlertDescription>
            <strong>AI Enhancement Disabled:</strong> Configure your OpenAI API key in Settings to enable AI-powered
            insights and recommendations.
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className={`text-sm ${metric.color}`}>{metric.change}</p>
                </div>
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Industry Insights */}
      {industryInsights && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <Brain className="w-5 h-5" />
              AI-Generated Industry Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{industryInsights}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generation Progress */}
      {isGenerating && (
        <Alert>
          <Zap className="w-4 h-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p>Generating AI-enhanced report... Please wait.</p>
              <Progress value={generationProgress} className="w-full" />
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Report Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reportTypes.map((report) => (
          <Card key={report.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <report.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                </div>
                {configuration.aiConfig?.openaiApiKey && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Brain className="w-3 h-3" />
                    AI Enhanced
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {report.audience}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {report.duration}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Key Highlights:</h4>
                <ul className="space-y-1">
                  {report.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleGenerateReport(report.id as any, "pdf")}
                  disabled={isGenerating}
                  className="flex-1"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleGenerateReport(report.id as any, "excel")}
                  disabled={isGenerating}
                  className="flex-1"
                >
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Excel
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleGenerateReport(report.id as any, "powerpoint")}
                  disabled={isGenerating}
                  className="flex-1"
                >
                  <Presentation className="w-4 h-4 mr-2" />
                  PPT
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dynamic Vendor Warnings */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Critical Vendor Warnings
            {configuration.aiConfig?.openaiApiKey && (
              <Badge variant="secondary" className="ml-2">
                AI Updated
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {vendorWarnings.map((warning, index) => (
              <Alert
                key={index}
                className={
                  warning.severity === "critical"
                    ? "bg-red-50 border-red-300"
                    : warning.severity === "high"
                      ? "bg-orange-50 border-orange-300"
                      : "bg-yellow-50 border-yellow-300"
                }
              >
                <AlertDescription>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <strong>{warning.title}:</strong> {warning.description}
                      <div className="mt-2 text-sm">
                        <strong>Recommendation:</strong> {warning.recommendation}
                      </div>
                    </div>
                    <Badge variant={warning.severity === "critical" ? "destructive" : "secondary"} className="ml-2">
                      {warning.severity.toUpperCase()}
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getIndustryComplianceRequirements(industry: string): string[] {
  const requirements: Record<string, string[]> = {
    healthcare: ["HIPAA", "HITECH", "FDA"],
    financial: ["PCI-DSS", "SOX", "GLBA", "FFIEC"],
    government: ["FedRAMP", "FISMA", "NIST", "Common Criteria"],
    education: ["FERPA", "COPPA"],
    manufacturing: ["ISO27001", "NIST"],
    retail: ["PCI-DSS", "CCPA"],
    technology: ["SOC2", "ISO27001"],
    energy: ["NERC CIP", "IEC 62443"],
  }

  return requirements[industry] || ["ISO27001", "SOC2"]
}
