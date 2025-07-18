"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
  Award,
  Target,
  Gauge,
  Rocket,
} from "lucide-react"
import { Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"
import { ReportGenerator, type ReportData } from "@/lib/report-generator"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ReportsViewProps {
  results: CalculationResult[]
  configuration: CalculationConfiguration
}

export default function ReportsView({ results, configuration }: ReportsViewProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [lastGenerated, setLastGenerated] = useState<string | null>(null)

  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const competitorResults = results.filter((r) => r.vendorId !== "portnox")
  const ciscoResult = results.find((r) => r.vendorId === "cisco")
  const totalSavings = ciscoResult && portnoxResult ? ciscoResult.totalCost - portnoxResult.totalCost : 570000

  // Calculate advantage metrics
  const advantageMetrics = (() => {
    if (!portnoxResult || competitorResults.length === 0) {
      return {
        costAdvantage: 65,
        timeAdvantage: 95,
        securityAdvantage: 92,
        operationalAdvantage: 90,
        totalSavings: 570000,
        roi: 5506,
        paybackMonths: 6.5,
      }
    }

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const avgCompetitorTime =
      competitorResults.reduce((sum, r) => sum + r.timeline.implementationWeeks, 0) / competitorResults.length
    const avgCompetitorSecurity =
      competitorResults.reduce((sum, r) => sum + r.risk.securityScore, 0) / competitorResults.length
    const avgCompetitorOps =
      competitorResults.reduce((sum, r) => sum + r.ops.automationLevel, 0) / competitorResults.length

    const costAdvantage =
      avgCompetitorCost > 0 ? ((avgCompetitorCost - portnoxResult.totalCost) / avgCompetitorCost) * 100 : 65
    const timeAdvantage =
      avgCompetitorTime > 0
        ? ((avgCompetitorTime - portnoxResult.timeline.implementationWeeks) / avgCompetitorTime) * 100
        : 95
    const securityAdvantage =
      avgCompetitorSecurity > 0
        ? ((portnoxResult.risk.securityScore - avgCompetitorSecurity) / avgCompetitorSecurity) * 100
        : 92
    const operationalAdvantage =
      avgCompetitorOps > 0 ? ((portnoxResult.ops.automationLevel - avgCompetitorOps) / avgCompetitorOps) * 100 : 90

    return {
      costAdvantage,
      timeAdvantage,
      securityAdvantage,
      operationalAdvantage,
      totalSavings: avgCompetitorCost - portnoxResult.totalCost,
      roi: portnoxResult.roi.percentage,
      paybackMonths: portnoxResult.roi.paybackMonths,
    }
  })()

  // Radar chart data for competitive analysis
  const radarData = [
    {
      metric: "Cost Efficiency",
      Portnox: 95,
      "Market Average": 60,
    },
    {
      metric: "Security",
      Portnox: portnoxResult?.risk.securityScore || 95,
      "Market Average": 75,
    },
    {
      metric: "Deployment Speed",
      Portnox: 98,
      "Market Average": 45,
    },
    {
      metric: "Automation",
      Portnox: portnoxResult?.ops.automationLevel || 95,
      "Market Average": 65,
    },
    {
      metric: "ROI",
      Portnox: 100,
      "Market Average": 70,
    },
  ]

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

  const handleGenerateReport = async (
    type: "executive" | "technical" | "financial" | "board",
    format: "pdf" | "excel" | "powerpoint",
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
    } catch (error) {
      console.error("Report generation failed:", error)
      alert("Failed to generate report. Please try again.")
    } finally {
      setIsGenerating(false)
      setGenerationProgress(0)
    }
  }

  const reportTypes = [
    {
      id: "executive",
      title: "Executive Summary",
      description: "C-Suite focused TCO & ROI analysis",
      icon: Users,
      audience: "C-Suite, VPs",
      duration: "5-min read",
      highlights: ["Strategic recommendations", "Financial impact", "Risk mitigation"],
    },
    {
      id: "technical",
      title: "Technical Analysis",
      description: "Detailed architecture and feature comparison",
      icon: Calculator,
      audience: "IT Teams, Architects",
      duration: "15-min read",
      highlights: ["Feature matrix", "Architecture comparison", "Integration requirements"],
    },
    {
      id: "financial",
      title: "Financial Analysis",
      description: "Comprehensive cost breakdown and ROI",
      icon: BarChart3,
      audience: "Finance, Procurement",
      duration: "10-min read",
      highlights: ["Detailed costs", "ROI calculations", "Budget planning"],
    },
    {
      id: "board",
      title: "Board Presentation",
      description: "Strategic overview for board meetings",
      icon: Shield,
      audience: "Board Members",
      duration: "3-min read",
      highlights: ["Strategic value", "Risk assessment", "Investment rationale"],
    },
  ]

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Executive Reports & Analysis</h2>
          <p className="text-muted-foreground">Comprehensive reports and Portnox competitive advantages</p>
        </div>
        {lastGenerated && (
          <Badge variant="outline" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Last generated: {lastGenerated}
          </Badge>
        )}
      </div>

      {/* Portnox Advantage Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <Award className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-2xl font-bold text-green-900">Portnox CLEAR Competitive Advantages</h1>
            <p className="text-green-700">Why Portnox delivers superior value across all key metrics</p>
          </div>
        </div>

        <Alert className="bg-white/50 border-green-300">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-900">Unmatched Value Proposition</AlertTitle>
          <AlertDescription className="text-green-800">
            Portnox CLEAR delivers {advantageMetrics.costAdvantage.toFixed(0)}% cost savings,{" "}
            {advantageMetrics.timeAdvantage.toFixed(0)}% faster deployment, and zero security vulnerabilities while
            providing enterprise-grade Zero Trust security that scales infinitely.
          </AlertDescription>
        </Alert>
      </div>

      {/* Key Advantage Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Cost Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{advantageMetrics.costAdvantage.toFixed(0)}%</div>
            <p className="text-sm text-green-600 mt-1">Lower total cost</p>
            <div className="text-xs text-muted-foreground mt-2">
              {formatCurrency(advantageMetrics.totalSavings)} saved
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Rocket className="h-5 w-5 text-blue-600" />
              Speed Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{advantageMetrics.timeAdvantage.toFixed(0)}%</div>
            <p className="text-sm text-blue-600 mt-1">Faster deployment</p>
            <div className="text-xs text-muted-foreground mt-2">30 minutes vs months</div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              Security Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">0</div>
            <p className="text-sm text-purple-600 mt-1">CVEs vs 15+ average</p>
            <div className="text-xs text-muted-foreground mt-2">Perfect security record</div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Gauge className="h-5 w-5 text-orange-600" />
              Automation Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-700">
              {advantageMetrics.operationalAdvantage.toFixed(0)}%
            </div>
            <p className="text-sm text-orange-600 mt-1">Higher automation</p>
            <div className="text-xs text-muted-foreground mt-2">95% vs 65% average</div>
          </CardContent>
        </Card>
      </div>

      {/* Competitive Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Portnox vs Market Average - Competitive Analysis</CardTitle>
          <CardDescription>Multi-dimensional comparison across key evaluation criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name="Portnox CLEAR"
                dataKey="Portnox"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={3}
              />
              <Radar
                name="Market Average"
                dataKey="Market Average"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.1}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Differentiators */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Award className="h-5 w-5" />
              Portnox Unique Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Zero CVE Security Record</div>
                  <div className="text-xs text-muted-foreground">No known vulnerabilities since inception</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">30-Minute Deployment</div>
                  <div className="text-xs text-muted-foreground">Production ready in minutes, not months</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">True Cloud-Native</div>
                  <div className="text-xs text-muted-foreground">No hardware, no maintenance windows</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">95% Automation Level</div>
                  <div className="text-xs text-muted-foreground">Minimal administrative overhead</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Vendor Agnostic</div>
                  <div className="text-xs text-muted-foreground">Works with any network infrastructure</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Competitor Limitations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Complex Deployments</div>
                  <div className="text-xs text-muted-foreground">6-9 months typical implementation time</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">High Hidden Costs</div>
                  <div className="text-xs text-muted-foreground">Hardware, services, training not included</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Security Vulnerabilities</div>
                  <div className="text-xs text-muted-foreground">15+ CVEs annually on average</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Vendor Lock-in</div>
                  <div className="text-xs text-muted-foreground">Proprietary architectures limit flexibility</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">High Operational Overhead</div>
                  <div className="text-xs text-muted-foreground">2-4 FTE required for ongoing management</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Summary */}
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

      {/* Generation Progress */}
      {isGenerating && (
        <Alert>
          <Zap className="w-4 h-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p>Generating report... Please wait.</p>
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

      {/* Executive Summary */}
      <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <Target className="h-4 w-4" />
        <AlertTitle className="text-blue-900 dark:text-blue-100">Executive Recommendation</AlertTitle>
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Portnox CLEAR delivers transformative value:</strong> {advantageMetrics.costAdvantage.toFixed(0)}%
          cost reduction ({formatCurrency(advantageMetrics.totalSavings)} saved),{" "}
          {advantageMetrics.timeAdvantage.toFixed(0)}% faster deployment, and{" "}
          {advantageMetrics.securityAdvantage.toFixed(0)}% superior security posture. With zero CVEs, 95% automation,
          and {advantageMetrics.paybackMonths}-month payback, Portnox represents the clear choice for modern Zero Trust
          NAC.
        </AlertDescription>
      </Alert>

      {/* Critical Vendor Warnings */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Critical Vendor Warnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Alert className="bg-red-50 border-red-300">
              <AlertDescription>
                <strong>Ivanti/Pulse Secure:</strong> Mandatory migration required. Active nation-state exploitation.
                20+ critical vulnerabilities. Legacy systems reaching EOL December 2024.
              </AlertDescription>
            </Alert>
            <Alert className="bg-orange-50 border-orange-300">
              <AlertDescription>
                <strong>Microsoft NPS:</strong> No longer being developed. Lacks modern NAC features. Requires multiple
                expensive add-ons (Azure AD Premium, Intune) for basic functionality.
              </AlertDescription>
            </Alert>
            <Alert className="bg-yellow-50 border-yellow-300">
              <AlertDescription>
                <strong>Cloud-Only Vendors (FoxPass, SecureW2):</strong> Limited to WiFi/PKI only. No wired NAC, no
                risk-based access, no IoT profiling. Missing 80% of enterprise NAC features.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
