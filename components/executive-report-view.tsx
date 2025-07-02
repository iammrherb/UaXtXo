"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import {
  TrendingUp,
  DollarSign,
  Shield,
  Clock,
  Users,
  Download,
  FileText,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Target,
  Zap,
} from "lucide-react"
import { SectionTitle, GradientCard } from "./shared-ui"
import type { TCOResult, CalculationConfig } from "@/lib/enhanced-tco-calculator"

interface ExecutiveReportViewProps {
  results: TCOResult[]
  config: CalculationConfig
}

export function ExecutiveReportView({ results = [], config }: ExecutiveReportViewProps) {
  // Safe data access with fallbacks
  const portnoxResult = results.find((r) => r?.vendor === "Portnox") || {
    vendor: "Portnox",
    totalCost: 0,
    roi: 0,
    paybackPeriod: 0,
    riskScore: 0,
    implementationComplexity: "Medium",
    yearlyBreakdown: [],
    costBreakdown: {
      software: 0,
      hardware: 0,
      implementation: 0,
      maintenance: 0,
      training: 0,
      support: 0,
    },
  }

  const competitorResults = results.filter((r) => r?.vendor !== "Portnox") || []

  // Safe calculations with type checking
  const avgCompetitorCost =
    competitorResults.length > 0
      ? competitorResults.reduce((sum, r) => sum + (typeof r?.totalCost === "number" ? r.totalCost : 0), 0) /
        competitorResults.length
      : 0

  const costSavings =
    avgCompetitorCost > 0
      ? avgCompetitorCost - (typeof portnoxResult?.totalCost === "number" ? portnoxResult.totalCost : 0)
      : 0
  const savingsPercentage = avgCompetitorCost > 0 ? (costSavings / avgCompetitorCost) * 100 : 0

  // Executive Summary Data
  const executiveSummary = {
    recommendation: "Portnox Clear",
    confidence: 92,
    totalSavings: costSavings,
    roi: typeof portnoxResult?.roi === "number" ? portnoxResult.roi : 0,
    paybackMonths: typeof portnoxResult?.paybackPeriod === "number" ? portnoxResult.paybackPeriod : 0,
    riskLevel: "Low",
    implementationTime: "3-6 months",
  }

  // Key Benefits Data
  const keyBenefits = [
    {
      category: "Cost Efficiency",
      value: `${savingsPercentage.toFixed(1)}%`,
      description: "Lower TCO vs competitors",
      icon: <DollarSign className="h-5 w-5" />,
      trend: "positive",
    },
    {
      category: "Security Posture",
      value: "95%",
      description: "Threat detection improvement",
      icon: <Shield className="h-5 w-5" />,
      trend: "positive",
    },
    {
      category: "Implementation",
      value: "Fast",
      description: "Quick deployment timeline",
      icon: <Clock className="h-5 w-5" />,
      trend: "positive",
    },
    {
      category: "User Experience",
      value: "Excellent",
      description: "Simplified management",
      icon: <Users className="h-5 w-5" />,
      trend: "positive",
    },
  ]

  // ROI Projection Data
  const roiProjection = Array.from({ length: 5 }, (_, i) => ({
    year: `Year ${i + 1}`,
    portnox: Math.max(0, executiveSummary.roi * (i + 1) * 0.8),
    industry: Math.max(0, executiveSummary.roi * (i + 1) * 0.6),
  }))

  // Risk Assessment Data
  const riskFactors = [
    { factor: "Implementation Risk", portnox: 15, competitor: 35 },
    { factor: "Security Risk", portnox: 10, competitor: 25 },
    { factor: "Operational Risk", portnox: 12, competitor: 30 },
    { factor: "Compliance Risk", portnox: 8, competitor: 20 },
  ]

  // Cost Comparison Data
  const costComparison = [
    {
      category: "Software Licensing",
      portnox: typeof portnoxResult?.costBreakdown?.software === "number" ? portnoxResult.costBreakdown.software : 0,
      competitor: avgCompetitorCost * 0.4,
    },
    {
      category: "Implementation",
      portnox:
        typeof portnoxResult?.costBreakdown?.implementation === "number"
          ? portnoxResult.costBreakdown.implementation
          : 0,
      competitor: avgCompetitorCost * 0.25,
    },
    {
      category: "Maintenance",
      portnox:
        typeof portnoxResult?.costBreakdown?.maintenance === "number" ? portnoxResult.costBreakdown.maintenance : 0,
      competitor: avgCompetitorCost * 0.2,
    },
    {
      category: "Training & Support",
      portnox:
        (typeof portnoxResult?.costBreakdown?.training === "number" ? portnoxResult.costBreakdown.training : 0) +
        (typeof portnoxResult?.costBreakdown?.support === "number" ? portnoxResult.costBreakdown.support : 0),
      competitor: avgCompetitorCost * 0.15,
    },
  ]

  const handleExportReport = () => {
    // Export functionality would be implemented here
    console.log("Exporting executive report...")
  }

  const handleScheduleDemo = () => {
    // Demo scheduling functionality would be implemented here
    console.log("Scheduling demo...")
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <SectionTitle title="Executive Summary Report" subtitle="Strategic Analysis & Recommendations" />
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleExportReport} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </Button>
          <Button variant="outline" onClick={handleScheduleDemo} className="flex items-center space-x-2 bg-transparent">
            <Calendar className="h-4 w-4" />
            <span>Schedule Demo</span>
          </Button>
        </div>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GradientCard
          title="Recommended Solution"
          value={executiveSummary.recommendation}
          subtitle={`${executiveSummary.confidence}% confidence`}
          gradient="from-green-500 to-emerald-600"
        >
          <div className="flex items-center space-x-2 mt-2">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Best Overall Value</span>
          </div>
        </GradientCard>

        <GradientCard
          title="Total Savings"
          value={`$${(executiveSummary.totalSavings / 1000).toFixed(0)}K`}
          subtitle="vs average competitor"
          gradient="from-blue-500 to-cyan-600"
        >
          <div className="flex items-center space-x-2 mt-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">{savingsPercentage.toFixed(1)}% reduction</span>
          </div>
        </GradientCard>

        <GradientCard
          title="ROI"
          value={`${executiveSummary.roi.toFixed(0)}%`}
          subtitle={`${executiveSummary.paybackMonths} month payback`}
          gradient="from-purple-500 to-pink-600"
        >
          <div className="flex items-center space-x-2 mt-2">
            <Target className="h-4 w-4" />
            <span className="text-sm">Above industry avg</span>
          </div>
        </GradientCard>

        <GradientCard
          title="Risk Level"
          value={executiveSummary.riskLevel}
          subtitle={executiveSummary.implementationTime}
          gradient="from-orange-500 to-red-600"
        >
          <div className="flex items-center space-x-2 mt-2">
            <Shield className="h-4 w-4" />
            <span className="text-sm">Minimal disruption</span>
          </div>
        </GradientCard>
      </div>

      {/* Key Benefits Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>Key Business Benefits</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyBenefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="flex justify-center text-primary">{benefit.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-primary">{benefit.value}</p>
                  <p className="font-medium">{benefit.category}</p>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ROI Projection Chart */}
      <Card>
        <CardHeader>
          <CardTitle>5-Year ROI Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={roiProjection}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip
                formatter={(value: any) => [`${Number(value).toFixed(1)}%`, ""]}
                labelFormatter={(label) => `ROI - ${label}`}
              />
              <Area
                type="monotone"
                dataKey="portnox"
                stackId="1"
                stroke="#00D4AA"
                fill="#00D4AA"
                fillOpacity={0.6}
                name="Portnox Clear"
              />
              <Area
                type="monotone"
                dataKey="industry"
                stackId="2"
                stroke="#94A3B8"
                fill="#94A3B8"
                fillOpacity={0.4}
                name="Industry Average"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cost Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`$${(Number(value) / 1000).toFixed(0)}K`, ""]} />
                <Bar dataKey="portnox" fill="#00D4AA" name="Portnox Clear" />
                <Bar dataKey="competitor" fill="#94A3B8" name="Competitor Avg" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskFactors} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="factor" type="category" width={100} />
                <Tooltip formatter={(value: any) => [`${value}%`, ""]} />
                <Bar dataKey="portnox" fill="#00D4AA" name="Portnox Clear" />
                <Bar dataKey="competitor" fill="#EF4444" name="Competitor Avg" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Strategic Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h4 className="font-semibold">Immediate Actions</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Initiate Portnox Clear evaluation</li>
                <li>• Schedule technical demonstration</li>
                <li>• Begin stakeholder alignment</li>
                <li>• Prepare implementation timeline</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <h4 className="font-semibold">30-Day Plan</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Complete technical assessment</li>
                <li>• Finalize vendor selection</li>
                <li>• Secure budget approval</li>
                <li>• Plan implementation phases</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-500" />
                <h4 className="font-semibold">Success Metrics</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {executiveSummary.roi.toFixed(0)}% ROI achievement</li>
                <li>• {executiveSummary.paybackMonths} month payback</li>
                <li>• 95% security improvement</li>
                <li>• 50% operational efficiency gain</li>
              </ul>
            </div>
          </div>

          <Separator />

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>Executive Decision Points</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Budget Impact:</p>
                <p className="text-muted-foreground">
                  ${(executiveSummary.totalSavings / 1000).toFixed(0)}K savings over 3 years with{" "}
                  {executiveSummary.paybackMonths} month payback period
                </p>
              </div>
              <div>
                <p className="font-medium">Risk Mitigation:</p>
                <p className="text-muted-foreground">
                  Low implementation risk with proven deployment methodology and comprehensive support
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Ready to Move Forward?</h3>
              <p className="text-muted-foreground mb-4">
                Based on this comprehensive analysis, Portnox Clear offers the optimal combination of cost efficiency,
                security enhancement, and implementation simplicity for your organization.
              </p>
              <div className="flex space-x-3">
                <Button onClick={handleScheduleDemo} className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Schedule Technical Demo</span>
                </Button>
                <Button variant="outline" onClick={handleExportReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Full Report
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
