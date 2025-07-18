"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  DollarSign,
  Shield,
  Clock,
  Users,
  Building2,
  Target,
  Award,
  AlertTriangle,
  CheckCircle2,
  Zap,
  BarChart3,
  PieChartIcon,
  Calendar,
  Download,
} from "lucide-react"
import {
  ResponsiveContainer,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
} from "recharts"

import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface CSuiteDashboardProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function CSuiteDashboard({ results, config }: CSuiteDashboardProps) {
  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const competitorResults = results.filter((r) => r.vendorId !== "portnox")

  const executiveMetrics = useMemo(() => {
    if (!portnoxResult || competitorResults.length === 0) return null

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const percentSavings = (totalSavings / avgCompetitorCost) * 100

    // Calculate comprehensive business value
    const riskMitigationValue = 4100000 // $4.1M annual risk reduction
    const productivityGains = totalSavings * 0.3 // 30% of savings from productivity
    const complianceValue = 850000 // Annual compliance value
    const totalBusinessValue = totalSavings + riskMitigationValue + productivityGains + complianceValue

    return {
      totalBusinessValue,
      totalSavings,
      percentSavings,
      riskMitigationValue,
      productivityGains,
      complianceValue,
      roi: (totalBusinessValue / portnoxResult.totalCost) * 100,
      paybackMonths: (portnoxResult.totalCost / (totalBusinessValue / config.years)) * 12,
      portnoxCost: portnoxResult.totalCost,
      avgCompetitorCost,
    }
  }, [portnoxResult, competitorResults, config.years])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const businessValueData = executiveMetrics
    ? [
        { name: "Cost Savings", value: executiveMetrics.totalSavings, color: "#3B82F6" },
        { name: "Risk Mitigation", value: executiveMetrics.riskMitigationValue, color: "#10B981" },
        { name: "Productivity Gains", value: executiveMetrics.productivityGains, color: "#8B5CF6" },
        { name: "Compliance Value", value: executiveMetrics.complianceValue, color: "#F59E0B" },
      ]
    : []

  const roiTimelineData = [
    {
      quarter: "Q1",
      investment: -portnoxResult?.totalCost || 0,
      returns: 0,
      cumulative: -portnoxResult?.totalCost || 0,
    },
    {
      quarter: "Q2",
      investment: 0,
      returns: (executiveMetrics?.totalBusinessValue || 0) * 0.25,
      cumulative: (-portnoxResult?.totalCost || 0) + (executiveMetrics?.totalBusinessValue || 0) * 0.25,
    },
    {
      quarter: "Q3",
      investment: 0,
      returns: (executiveMetrics?.totalBusinessValue || 0) * 0.25,
      cumulative: (-portnoxResult?.totalCost || 0) + (executiveMetrics?.totalBusinessValue || 0) * 0.5,
    },
    {
      quarter: "Q4",
      investment: 0,
      returns: (executiveMetrics?.totalBusinessValue || 0) * 0.25,
      cumulative: (-portnoxResult?.totalCost || 0) + (executiveMetrics?.totalBusinessValue || 0) * 0.75,
    },
  ]

  const competitivePositionData = [
    { subject: "Cost Efficiency", portnox: 95, competitor: 60 },
    { subject: "Security Posture", portnox: 95, competitor: 75 },
    { subject: "Deployment Speed", portnox: 98, competitor: 30 },
    { subject: "Operational Efficiency", portnox: 95, competitor: 65 },
    { subject: "Scalability", portnox: 100, competitor: 70 },
    { subject: "Innovation", portnox: 90, competitor: 55 },
  ]

  const riskAssessmentData = [
    { category: "Cybersecurity", current: 85, withPortnox: 15 },
    { category: "Compliance", current: 70, withPortnox: 10 },
    { category: "Operational", current: 60, withPortnox: 5 },
    { category: "Financial", current: 45, withPortnox: 8 },
  ]

  if (!executiveMetrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Insufficient Data</h3>
          <p className="text-muted-foreground">Please select at least one competitor to compare with Portnox.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Executive Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Business Value</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {formatCurrency(executiveMetrics.totalBusinessValue)}
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">Over {config.years} years</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Strategic ROI</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {executiveMetrics.roi.toFixed(0)}%
                </p>
                <p className="text-xs text-green-700 dark:text-green-300">
                  {executiveMetrics.paybackMonths.toFixed(0)} month payback
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Risk Reduction</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {formatCurrency(executiveMetrics.riskMitigationValue)}
                </p>
                <p className="text-xs text-purple-700 dark:text-purple-300">Annual risk mitigation</p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Time to Value</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">30 min</p>
                <p className="text-xs text-orange-700 dark:text-orange-300">vs 3-9 months competitors</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Analysis Tabs */}
      <Tabs defaultValue="financial" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Financial Impact
          </TabsTrigger>
          <TabsTrigger value="strategic" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Strategic Position
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Risk Management
          </TabsTrigger>
          <TabsTrigger value="operational" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Operational Impact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Business Value Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={businessValueData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {businessValueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  ROI Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={roiTimelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="cumulative"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        name="Cumulative Value"
                      />
                      <Line
                        type="monotone"
                        dataKey="returns"
                        stroke="#10B981"
                        strokeWidth={2}
                        name="Quarterly Returns"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Metrics Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(executiveMetrics.totalSavings)}
                  </div>
                  <div className="text-sm text-muted-foreground">Direct Cost Savings</div>
                  <div className="text-xs text-green-600">vs Traditional NAC</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{executiveMetrics.percentSavings.toFixed(0)}%</div>
                  <div className="text-sm text-muted-foreground">Cost Reduction</div>
                  <div className="text-xs text-green-600">Compared to Competitors</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{executiveMetrics.paybackMonths.toFixed(0)}</div>
                  <div className="text-sm text-muted-foreground">Months to Payback</div>
                  <div className="text-xs text-purple-600">Investment Recovery</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategic" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Competitive Position Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={competitivePositionData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Portnox"
                        dataKey="portnox"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Competitors"
                        dataKey="competitor"
                        stroke="#EF4444"
                        fill="#EF4444"
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Competitive Advantages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-900 dark:text-blue-100">Cloud-Native Architecture</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      Zero infrastructure, unlimited scalability, 99.99% uptime SLA
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-green-900 dark:text-green-100">Superior Security</div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      Zero CVEs, 95% Zero Trust maturity, continuous threat protection
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-purple-900 dark:text-purple-100">Rapid Deployment</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">
                      30 minutes to production vs 3-9 months for traditional NAC
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg bg-orange-50 dark:bg-orange-900/20">
                  <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-orange-900 dark:text-orange-100">Operational Excellence</div>
                    <div className="text-sm text-orange-700 dark:text-orange-300">
                      95% automation, 90% less admin overhead, self-healing infrastructure
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Enterprise Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riskAssessmentData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="category" type="category" width={80} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" fill="#EF4444" name="Current Risk Level" />
                      <Bar dataKey="withPortnox" fill="#10B981" name="With Portnox" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Exposure Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-900/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-red-900 dark:text-red-100">Current State</span>
                    <Badge variant="destructive">High Risk</Badge>
                  </div>
                  <div className="text-sm text-red-700 dark:text-red-300 space-y-1">
                    <div>• 85% cybersecurity vulnerability exposure</div>
                    <div>• 70% compliance gap risk</div>
                    <div>• $2.1M average breach cost exposure</div>
                    <div>• 60% operational disruption risk</div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-green-900 dark:text-green-100">Protected State</span>
                    <Badge className="bg-green-600">Low Risk</Badge>
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <div>• 15% residual cybersecurity risk</div>
                    <div>• 10% compliance monitoring required</div>
                    <div>• $150K maximum breach exposure</div>
                    <div>• 5% operational risk maintained</div>
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-2xl font-bold text-blue-600">92%</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Overall Risk Reduction</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Quantified annual risk value: {formatCurrency(executiveMetrics.riskMitigationValue)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operational" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Efficiency Gains
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Admin Overhead Reduction</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Process Automation</span>
                    <span>95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Incident Response Time</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Policy Enforcement</span>
                    <span>98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Business Continuity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-xl font-bold text-green-600">99.99%</div>
                  <div className="text-sm text-muted-foreground">Uptime SLA</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-muted-foreground">Maintenance Windows</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-muted-foreground">Global Support</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Productivity Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">IT Team Productivity</div>
                  <div className="text-2xl font-bold text-green-600">+40%</div>
                  <div className="text-sm text-muted-foreground">Time saved on NAC management</div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">End User Experience</div>
                  <div className="text-2xl font-bold text-blue-600">+25%</div>
                  <div className="text-sm text-muted-foreground">Faster network access</div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Security Team Efficiency</div>
                  <div className="text-2xl font-bold text-purple-600">+60%</div>
                  <div className="text-sm text-muted-foreground">Automated threat response</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Executive Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Executive Action Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                30-Day Immediate Actions
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2 p-2 border rounded">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">Schedule Portnox Executive Demo</div>
                    <div className="text-muted-foreground">30-minute live demonstration</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-2 border rounded">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">Initiate Proof of Concept</div>
                    <div className="text-muted-foreground">30-day risk-free trial</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-2 border rounded">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">Security Architecture Review</div>
                    <div className="text-muted-foreground">Current state assessment</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                90-Day Strategic Planning
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2 p-2 border rounded">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">Budget Approval Process</div>
                    <div className="text-muted-foreground">ROI justification and funding</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-2 border rounded">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">Implementation Planning</div>
                    <div className="text-muted-foreground">Deployment strategy and timeline</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-2 border rounded">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">Stakeholder Alignment</div>
                    <div className="text-muted-foreground">Cross-functional team coordination</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Download className="h-4 w-4 mr-2" />
              Export Executive Summary
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Strategy Session
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
