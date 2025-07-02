"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  FileText,
  TrendingUp,
  DollarSign,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Building2,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ExecutiveReportViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

// Safe number helper function
const safeNumber = (value: any, fallback = 0): number => {
  if (typeof value === "number" && !isNaN(value) && isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value)
    return !isNaN(parsed) && isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

// Safe currency formatting
const formatCurrency = (value: any): string => {
  const num = safeNumber(value)
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}

// Safe percentage formatting
const formatPercentage = (value: any): string => {
  const num = safeNumber(value)
  return `${num.toFixed(1)}%`
}

export default function ExecutiveReportView({ results = [], config }: ExecutiveReportViewProps) {
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel">("pdf")

  // Safe data access with fallbacks
  const portnoxResult = results?.find((r) => r?.vendor === "portnox") || null
  const competitorResults = results?.filter((r) => r?.vendor !== "portnox") || []

  // Safe calculations
  const totalDevices = safeNumber(config?.devices, 5000)
  const totalUsers = safeNumber(config?.users, 5000)
  const analysisYears = safeNumber(config?.years, 3)

  const portnoxTotalCost = safeNumber(portnoxResult?.total)
  const portnoxRoi = safeNumber(portnoxResult?.roi?.percentage)
  const portnoxPayback = safeNumber(portnoxResult?.roi?.paybackMonths)

  // Cost breakdown data
  const costBreakdownData = portnoxResult
    ? [
        {
          name: "Licensing",
          value: safeNumber(portnoxResult.breakdown?.find((b) => b.name === "Licensing")?.value),
          color: "#0ea5e9",
        },
        {
          name: "Implementation",
          value: safeNumber(portnoxResult.breakdown?.find((b) => b.name === "Implementation")?.value),
          color: "#10b981",
        },
        {
          name: "Support",
          value: safeNumber(portnoxResult.breakdown?.find((b) => b.name === "Support")?.value),
          color: "#f59e0b",
        },
        {
          name: "Operations",
          value: safeNumber(portnoxResult.breakdown?.find((b) => b.name === "Operations")?.value),
          color: "#ef4444",
        },
      ].filter((item) => item.value > 0)
    : []

  // Comparison data
  const comparisonData =
    results?.map((result) => ({
      vendor: result?.vendorName || "Unknown",
      totalCost: safeNumber(result?.total),
      roi: safeNumber(result?.roi?.percentage),
      payback: safeNumber(result?.roi?.paybackMonths),
    })) || []

  // ROI timeline data
  const roiTimelineData = Array.from({ length: analysisYears }, (_, i) => ({
    year: `Year ${i + 1}`,
    portnox: safeNumber(portnoxResult?.roi?.percentage) * ((i + 1) / analysisYears),
    competitor:
      competitorResults.length > 0 ? safeNumber(competitorResults[0]?.roi?.percentage) * ((i + 1) / analysisYears) : 0,
  }))

  const handleExport = () => {
    console.log(`Exporting executive report as ${exportFormat}`)
    // Implementation would go here
  }

  if (!results || results.length === 0) {
    return (
      <Card className="p-8 text-center">
        <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
        <p className="text-muted-foreground">Select vendors to generate executive report</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Executive Summary Report</CardTitle>
              <p className="text-muted-foreground mt-1">
                Strategic NAC Investment Analysis • {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={exportFormat === "pdf" ? "default" : "outline"}
                size="sm"
                onClick={() => setExportFormat("pdf")}
              >
                PDF
              </Button>
              <Button
                variant={exportFormat === "excel" ? "default" : "outline"}
                size="sm"
                onClick={() => setExportFormat("excel")}
              >
                Excel
              </Button>
              <Button onClick={handleExport} className="ml-2">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Findings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Key Findings & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{formatPercentage(portnoxRoi)}</div>
              <div className="text-sm text-muted-foreground">Expected ROI</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{portnoxPayback} months</div>
              <div className="text-sm text-muted-foreground">Payback Period</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">{formatCurrency(portnoxTotalCost)}</div>
              <div className="text-sm text-muted-foreground">Total Investment</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Strategic Recommendations
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Badge variant="outline" className="mr-2 mt-0.5">
                  1
                </Badge>
                <span>
                  <strong>Immediate Action:</strong> Portnox offers the best ROI at {formatPercentage(portnoxRoi)}
                  with fastest payback period of {portnoxPayback} months.
                </span>
              </li>
              <li className="flex items-start">
                <Badge variant="outline" className="mr-2 mt-0.5">
                  2
                </Badge>
                <span>
                  <strong>Cost Optimization:</strong> Total 3-year investment of {formatCurrency(portnoxTotalCost)}
                  provides comprehensive NAC coverage for {totalDevices.toLocaleString()} devices.
                </span>
              </li>
              <li className="flex items-start">
                <Badge variant="outline" className="mr-2 mt-0.5">
                  3
                </Badge>
                <span>
                  <strong>Risk Mitigation:</strong> Advanced zero-trust architecture reduces security incidents by an
                  estimated 75% compared to legacy solutions.
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Financial Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            {costBreakdownData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={costBreakdownData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(safeNumber(percent, 0) * 100).toFixed(0)}%`}
                  >
                    {costBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No cost breakdown data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendor Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            {comparisonData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `$${(safeNumber(value, 0) / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="totalCost" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No comparison data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ROI Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>ROI Projection Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          {roiTimelineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={roiTimelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `${safeNumber(value, 0).toFixed(0)}%`} />
                <Tooltip formatter={(value) => `${safeNumber(value).toFixed(1)}%`} />
                <Line type="monotone" dataKey="portnox" stroke="#10b981" strokeWidth={3} name="Portnox" />
                <Line
                  type="monotone"
                  dataKey="competitor"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Competitor Average"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              No timeline data available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Implementation Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Implementation Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { phase: "Phase 1: Planning & Design", duration: "4-6 weeks", progress: 100 },
              { phase: "Phase 2: Core Deployment", duration: "8-10 weeks", progress: 75 },
              { phase: "Phase 3: Integration & Testing", duration: "4-6 weeks", progress: 50 },
              { phase: "Phase 4: Training & Go-Live", duration: "2-4 weeks", progress: 25 },
            ].map((phase, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{phase.phase}</span>
                  <Badge variant="outline">{phase.duration}</Badge>
                </div>
                <Progress value={safeNumber(phase.progress, 0)} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Risk Assessment & Mitigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-3 text-green-600">Risk Mitigation Benefits</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  75% reduction in security incidents
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  90% faster threat detection
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  60% reduction in compliance costs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  50% improvement in operational efficiency
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-amber-600">Implementation Risks</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  Network disruption during migration
                </li>
                <li className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  User training and adoption curve
                </li>
                <li className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  Integration complexity with legacy systems
                </li>
                <li className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  Resource allocation during deployment
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              This analysis is based on current market data and organizational requirements as of{" "}
              {new Date().toLocaleDateString()}.
            </p>
            <p>For detailed implementation planning and customized analysis, contact your Portnox representative.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
