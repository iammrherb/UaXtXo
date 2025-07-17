"use client"

import { useState } from "react"
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
} from "lucide-react"
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
          <p className="text-muted-foreground">Generate comprehensive reports for different stakeholders</p>
        </div>
        {lastGenerated && (
          <Badge variant="outline" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Last generated: {lastGenerated}
          </Badge>
        )}
      </div>

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
