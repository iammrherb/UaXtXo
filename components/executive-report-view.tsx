"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  DollarSign,
  Shield,
  Clock,
  Download,
  FileText,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Target,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface ExecutiveReportViewProps {
  results: any[]
  config: any
}

export default function ExecutiveReportView({ results = [], config = {} }: ExecutiveReportViewProps) {
  // Safe data access with fallbacks
  const safeResults = Array.isArray(results) ? results : []
  const safeConfig = config || {}

  // Find Portnox result safely
  const portnoxResult = safeResults.find((r) => r?.vendor?.toLowerCase().includes("portnox")) || {}

  // Safe numeric access with type checking
  const getNumericValue = (obj: any, path: string, fallback = 0): number => {
    const keys = path.split(".")
    let value = obj

    for (const key of keys) {
      if (value && typeof value === "object" && key in value) {
        value = value[key]
      } else {
        return fallback
      }
    }

    return typeof value === "number" ? value : fallback
  }

  // Safe string access
  const getStringValue = (obj: any, path: string, fallback = ""): string => {
    const keys = path.split(".")
    let value = obj

    for (const key of keys) {
      if (value && typeof value === "object" && key in value) {
        value = value[key]
      } else {
        return fallback
      }
    }

    return typeof value === "string" ? value : fallback
  }

  // Calculate key metrics safely
  const totalDevices = getNumericValue(safeConfig, "devices", 5000)
  const totalUsers = getNumericValue(safeConfig, "users", 5000)
  const analysisYears = getNumericValue(safeConfig, "years", 3)

  const portnoxTotalCost = getNumericValue(portnoxResult, "totalCost", 0)
  const portnoxROI = getNumericValue(portnoxResult, "roi.percentage", 0)
  const portnoxPayback = getNumericValue(portnoxResult, "roi.paybackPeriod", 0)

  // Comparison data
  const comparisonData = safeResults
    .map((result) => ({
      vendor: getStringValue(result, "vendor", "Unknown"),
      totalCost: getNumericValue(result, "totalCost", 0),
      roi: getNumericValue(result, "roi.percentage", 0),
      payback: getNumericValue(result, "roi.paybackPeriod", 0),
    }))
    .filter((item) => item.vendor !== "Unknown")

  // Cost breakdown data
  const costBreakdownData = [
    { name: "Licensing", value: getNumericValue(portnoxResult, "licensing", 0), color: "#00D4AA" },
    { name: "Implementation", value: getNumericValue(portnoxResult, "implementation", 0), color: "#0EA5E9" },
    { name: "Support", value: getNumericValue(portnoxResult, "support", 0), color: "#8B5CF6" },
    { name: "Training", value: getNumericValue(portnoxResult, "training", 0), color: "#F59E0B" },
  ].filter((item) => item.value > 0)

  // ROI projection data
  const roiProjectionData = Array.from({ length: analysisYears }, (_, i) => ({
    year: `Year ${i + 1}`,
    savings: Math.round(((portnoxROI / 100) * portnoxTotalCost * (i + 1)) / analysisYears),
    investment: Math.round((portnoxTotalCost / analysisYears) * (i + 1)),
  }))

  const handleExportPDF = () => {
    console.log("Exporting executive report as PDF...")
  }

  const handleSchedulePresentation = () => {
    console.log("Scheduling executive presentation...")
  }

  return (
    <div className="space-y-6">
      {/* Executive Summary Header */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Executive Summary Report
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Strategic NAC Investment Analysis • {totalDevices.toLocaleString()} Devices •{" "}
                {totalUsers.toLocaleString()} Users • {analysisYears} Year Analysis
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportPDF}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button onClick={handleSchedulePresentation}>
                <Target className="h-4 w-4 mr-2" />
                Schedule Presentation
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Investment</p>
                <p className="text-2xl font-bold">${(portnoxTotalCost / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                {analysisYears} Year TCO
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Expected ROI</p>
                <p className="text-2xl font-bold text-green-600">{portnoxROI.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                Annual Return
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payback Period</p>
                <p className="text-2xl font-bold">{portnoxPayback.toFixed(1)} mo</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                Break-even Point
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Risk Reduction</p>
                <p className="text-2xl font-bold text-orange-600">85%</p>
              </div>
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                Security Improvement
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Recommended Actions
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span>Proceed with Portnox implementation for optimal ROI and security posture</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span>Prioritize integration with existing SIEM and MDM solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span>Plan phased rollout starting with critical network segments</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span>Invest in comprehensive staff training for maximum adoption</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-orange-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Risk Considerations
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span>Ensure adequate change management for user adoption</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span>Plan for potential network performance impact during rollout</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span>Consider compliance requirements for your industry</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span>Budget for ongoing maintenance and updates</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Vendor TCO Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value: any) => [`$${(value / 1000).toFixed(0)}K`, "Total Cost"]} />
                <Bar dataKey="totalCost" fill="#00D4AA" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `$${(value / 1000).toFixed(0)}K`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ROI Projection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            ROI Projection Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={roiProjectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value: any) => `$${(value / 1000).toFixed(0)}K`} />
              <Line type="monotone" dataKey="savings" stroke="#00D4AA" strokeWidth={3} name="Cumulative Savings" />
              <Line type="monotone" dataKey="investment" stroke="#0EA5E9" strokeWidth={2} name="Investment" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Implementation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recommended Implementation Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { phase: "Phase 1: Planning & Design", duration: "4-6 weeks", progress: 100 },
              { phase: "Phase 2: Pilot Deployment", duration: "2-3 weeks", progress: 75 },
              { phase: "Phase 3: Full Rollout", duration: "8-12 weeks", progress: 50 },
              { phase: "Phase 4: Optimization", duration: "4-6 weeks", progress: 25 },
            ].map((phase, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{phase.phase}</span>
                  <Badge variant="outline">{phase.duration}</Badge>
                </div>
                <Progress value={phase.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            Based on our comprehensive analysis of {totalDevices.toLocaleString()} devices and{" "}
            {totalUsers.toLocaleString()} users over a {analysisYears}-year period,
            <strong className="text-foreground"> Portnox emerges as the optimal NAC solution</strong> with a total cost
            of ownership of
            <strong className="text-foreground"> ${(portnoxTotalCost / 1000).toFixed(0)}K</strong> and an expected ROI
            of
            <strong className="text-green-600"> {portnoxROI.toFixed(1)}%</strong>.
          </p>

          <Separator className="my-4" />

          <p className="text-muted-foreground leading-relaxed">
            The investment will pay for itself in approximately{" "}
            <strong className="text-foreground">{portnoxPayback.toFixed(1)} months</strong>, delivering significant
            security improvements and operational efficiencies. Key benefits include enhanced threat detection,
            streamlined compliance reporting, and reduced manual security operations overhead.
          </p>

          <Separator className="my-4" />

          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Recommendation:</strong> Proceed with Portnox implementation following
            the phased approach outlined above. This strategic investment will strengthen your security posture while
            delivering measurable business value and supporting your organization's zero trust security initiatives.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
