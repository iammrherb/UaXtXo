"use client"
import { motion } from "framer-motion"
import { useDashboardContext } from "@/context/DashboardContext"
import { useVendorData } from "@/hooks/useVendorData"
import { useComplianceData } from "@/hooks/useComplianceData"
import { useAIInsights } from "@/hooks/useAIInsights"
import { ExecutiveSummary } from "@/components/charts/dashboards/ExecutiveSummary"
import { AIInsightsSummary } from "@/components/ai/AIInsightsSummary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  DollarSign,
  Users,
  Brain,
  Sparkles,
  ChevronRight,
  RefreshCw,
  BarChart3,
  PieChartIcon,
  Activity,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function OverviewPage() {
  const { selectedVendors, selectedIndustry, selectedOrgSize, comparisonYears, showAdvancedMetrics } =
    useDashboardContext()

  const { getAllVendorIds, getVendor, isLoadingAllVendors } = useVendorData()
  const {
    riskAssessments,
    summary,
    isLoading: complianceLoading,
  } = useComplianceData(selectedVendors, selectedIndustry, selectedOrgSize)

  // Get vendor data for selected vendors
  const selectedVendorData = selectedVendors.map((vendorId) => getVendor(vendorId)).filter(Boolean)

  // AI Insights
  const {
    insights,
    recommendations,
    hasInsights,
    generateInsights,
    isLoading: aiLoading,
  } = useAIInsights(selectedVendorData, riskAssessments, selectedIndustry, selectedOrgSize)

  // Chart data
  const riskChartData = selectedVendorData
    .map((vendor) => {
      const assessment = riskAssessments[vendor.id]
      return {
        name: vendor.name.length > 10 ? vendor.name.substring(0, 10) + "..." : vendor.name,
        riskScore: assessment?.overallRiskScore || 0,
        complianceGaps: assessment?.complianceGaps.length || 0,
        costRisk: assessment?.costOfNonCompliance.total || 0,
      }
    })
    .sort((a, b) => b.riskScore - a.riskScore)

  const riskDistributionData = Object.entries(summary.riskDistribution).map(([level, count]) => ({
    level: level.charAt(0).toUpperCase() + level.slice(1),
    count,
    color: level === "critical" ? "#ef4444" : level === "high" ? "#f97316" : level === "medium" ? "#eab308" : "#22c55e",
  }))

  const trendData = [
    { month: "Jan", riskScore: 65, complianceGaps: 12, costRisk: 450 },
    { month: "Feb", riskScore: 68, complianceGaps: 15, costRisk: 520 },
    { month: "Mar", riskScore: 62, complianceGaps: 10, costRisk: 380 },
    { month: "Apr", riskScore: 58, complianceGaps: 8, costRisk: 320 },
    { month: "May", riskScore: 55, complianceGaps: 6, costRisk: 280 },
    {
      month: "Jun",
      riskScore: summary.averageRiskScore,
      complianceGaps: Math.round(summary.totalComplianceGaps / summary.totalVendors) || 0,
      costRisk: Math.round(summary.totalCostRisk / 1000) || 0,
    },
  ]

  const isLoading = isLoadingAllVendors || complianceLoading

  if (selectedVendors.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Card className="bg-slate-800/50 border-slate-700 max-w-md mx-auto">
            <CardContent className="p-8">
              <Users className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">No Vendors Selected</h2>
              <p className="text-slate-400 mb-6">
                Please select vendors from the configuration bar to view the overview dashboard.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">Configure Vendors</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-slate-400">
            Comprehensive analysis of {selectedVendors.length} vendor{selectedVendors.length !== 1 ? "s" : ""} in the{" "}
            {selectedIndustry.replace("_", " ")} industry
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-slate-300">
            {selectedOrgSize.replace("_", " ").toUpperCase()}
          </Badge>
          <Badge variant="outline" className="text-slate-300">
            {comparisonYears} Year Analysis
          </Badge>
          {hasInsights && (
            <Badge variant="outline" className="text-green-400 border-green-400">
              <Brain className="w-3 h-3 mr-1" />
              AI Enhanced
            </Badge>
          )}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-blue-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Total Vendors</p>
                <p className="text-3xl font-bold text-white">{summary.totalVendors}</p>
                <p className="text-xs text-blue-400 mt-1">{selectedVendors.length} selected for analysis</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-300 text-sm font-medium">Avg Risk Score</p>
                <p className="text-3xl font-bold text-white">{summary.averageRiskScore}/100</p>
                <div className="flex items-center gap-1 text-xs mt-1">
                  {summary.averageRiskScore > 70 ? (
                    <>
                      <TrendingUp className="w-3 h-3 text-red-400" />
                      <span className="text-red-400">High Risk</span>
                    </>
                  ) : summary.averageRiskScore > 40 ? (
                    <>
                      <Activity className="w-3 h-3 text-orange-400" />
                      <span className="text-orange-400">Medium Risk</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-3 h-3 text-green-400" />
                      <span className="text-green-400">Low Risk</span>
                    </>
                  )}
                </div>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-900/20 to-pink-900/20 border-red-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-300 text-sm font-medium">Compliance Gaps</p>
                <p className="text-3xl font-bold text-white">{summary.totalComplianceGaps}</p>
                <p className="text-xs text-red-400 mt-1">
                  {summary.criticalRiskVendors + summary.highRiskVendors} high priority
                </p>
              </div>
              <div className="p-3 bg-red-500/20 rounded-lg">
                <Shield className="w-8 h-8 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">Cost at Risk</p>
                <p className="text-3xl font-bold text-white">${Math.round(summary.totalCostRisk / 1000)}K</p>
                <p className="text-xs text-green-400 mt-1">Potential exposure</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Insights Summary */}
      {hasInsights && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AIInsightsSummary insights={insights} recommendations={recommendations} />
        </motion.div>
      )}

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Tabs defaultValue="executive" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="executive" className="data-[state=active]:bg-slate-700">
              Executive Summary
            </TabsTrigger>
            <TabsTrigger value="risk-analysis" className="data-[state=active]:bg-slate-700">
              Risk Analysis
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-slate-700">
              Trends & Forecasts
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-slate-700">
              Compliance Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="executive" className="mt-6">
            <ExecutiveSummary vendors={selectedVendorData} riskAssessments={riskAssessments} />
          </TabsContent>

          <TabsContent value="risk-analysis" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    Vendor Risk Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={riskChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #475569",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="riskScore" fill="#f97316" name="Risk Score" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5 text-green-400" />
                    Risk Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={riskDistributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        dataKey="count"
                        label={({ level, count }) => `${level}: ${count}`}
                      >
                        {riskDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #475569",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-red-400" />
                    Top Compliance Gaps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.values(riskAssessments)
                      .flatMap((assessment) => assessment.complianceGaps)
                      .sort((a, b) => b.riskScore - a.riskScore)
                      .slice(0, 5)
                      .map((gap, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{gap.requirementName}</h4>
                            <p className="text-slate-400 text-sm">{gap.standardName}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-white font-medium">Risk: {gap.riskScore}/10</div>
                              <div className="text-slate-400 text-sm">
                                Cost: ${Math.round(gap.remediationCost / 1000)}K
                              </div>
                            </div>
                            <Badge
                              variant={
                                gap.businessImpact === "critical"
                                  ? "destructive"
                                  : gap.businessImpact === "high"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {gap.businessImpact}
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    Risk Trend Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #475569",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="riskScore"
                        stackId="1"
                        stroke="#f97316"
                        fill="#f97316"
                        fillOpacity={0.6}
                        name="Risk Score"
                      />
                      <Area
                        type="monotone"
                        dataKey="complianceGaps"
                        stackId="2"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.6}
                        name="Compliance Gaps"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {showAdvancedMetrics && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Predictive Risk Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Next Quarter Risk Score</span>
                          <span className="text-white font-bold">{Math.max(0, summary.averageRiskScore - 5)}/100</span>
                        </div>
                        <Progress value={Math.max(0, summary.averageRiskScore - 5)} className="h-2" />
                        <p className="text-xs text-slate-400">Based on current trends and remediation efforts</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Cost Trend Projection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Projected Annual Savings</span>
                          <span className="text-green-400 font-bold">
                            ${Math.round((summary.totalCostRisk * 0.3) / 1000)}K
                          </span>
                        </div>
                        <Progress value={30} className="h-2" />
                        <p className="text-xs text-slate-400">With recommended remediation actions</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Compliance Standards Coverage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.values(riskAssessments).length > 0 ? (
                    Object.values(riskAssessments)[0]
                      .complianceGaps.reduce(
                        (acc, gap) => {
                          const existing = acc.find((item) => item.standard === gap.standardName)
                          if (existing) {
                            existing.gaps += 1
                            existing.totalRisk += gap.riskScore
                          } else {
                            acc.push({
                              standard: gap.standardName,
                              gaps: 1,
                              totalRisk: gap.riskScore,
                            })
                          }
                          return acc
                        },
                        [] as Array<{ standard: string; gaps: number; totalRisk: number }>,
                      )
                      .slice(0, 6)
                      .map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300 text-sm">{item.standard}</span>
                            <Badge variant="outline" className="text-red-400 border-red-400">
                              {item.gaps} gaps
                            </Badge>
                          </div>
                          <Progress value={Math.max(0, 100 - (item.totalRisk / item.gaps) * 10)} className="h-2" />
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>Coverage: {Math.max(0, 100 - (item.totalRisk / item.gaps) * 10).toFixed(0)}%</span>
                            <span>Avg Risk: {(item.totalRisk / item.gaps).toFixed(1)}/10</span>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-slate-400 text-center py-8">No compliance data available</p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Remediation Priority Queue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.values(riskAssessments)
                      .flatMap((assessment) => assessment.complianceGaps)
                      .sort((a, b) => b.riskScore - a.riskScore)
                      .slice(0, 6)
                      .map((gap, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white text-sm font-medium">{gap.requirementName}</h4>
                            <Badge
                              variant="outline"
                              className={cn(
                                gap.riskScore >= 8
                                  ? "border-red-400 text-red-400"
                                  : gap.riskScore >= 6
                                    ? "border-orange-400 text-orange-400"
                                    : "border-yellow-400 text-yellow-400",
                              )}
                            >
                              Risk: {gap.riskScore}/10
                            </Badge>
                          </div>
                          <p className="text-slate-400 text-xs mb-2">{gap.standardName}</p>
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>Impact: {gap.businessImpact}</span>
                            <span>Cost: ${Math.round(gap.remediationCost / 1000)}K</span>
                            <span>Time: {gap.timeToRemediate} days</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center justify-center gap-4 pt-8"
      >
        <Button
          onClick={() => generateInsights(true)}
          disabled={aiLoading}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {aiLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
          {aiLoading ? "Generating..." : "Generate AI Insights"}
        </Button>
        <Button variant="outline" onClick={() => window.open("/report-builder", "_blank")}>
          <ChevronRight className="w-4 h-4 mr-2" />
          Build Custom Report
        </Button>
      </motion.div>
    </div>
  )
}
