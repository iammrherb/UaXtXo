"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
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
  AlertTriangle,
  DollarSign,
  Brain,
  Sparkles,
  ChevronRight,
  RefreshCw,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDashboardContext } from "@/context/DashboardContext"
import { useAIInsights } from "@/hooks/useAIInsights"
import { useTcoCalculator } from "@/hooks/useTcoCalculator"
import { useComplianceData } from "@/hooks/useComplianceData"
import { formatCurrency } from "@/lib/utils"
import type { NewVendorData } from "@/lib/vendors/data"
import type { RiskAssessmentResult } from "@/lib/compliance/risk-assessment"

interface ExecutiveSummaryProps {
  vendors: NewVendorData[]
  riskAssessments: Record<string, RiskAssessmentResult>
  className?: string
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ vendors, riskAssessments, className }) => {
  const { selectedVendors, industry, orgSize, baseVendor } = useDashboardContext()
  const [activeTab, setActiveTab] = useState("overview")

  // AI Insights Integration
  const {
    executiveSummary,
    insights,
    recommendations,
    isLoading: aiLoading,
    hasInsights,
    generateInsights,
  } = useAIInsights(vendors, riskAssessments, industry, orgSize)

  // TCO and Compliance Data Integration
  const { vendorTco, isLoading: isLoadingTco } = useTcoCalculator()
  const { vendorRiskAssessments, isLoading: isLoadingCompliance } = useComplianceData()

  const isLoading = isLoadingTco || isLoadingCompliance

  const baseTco = vendorTco[baseVendor]
  const baseRisk = vendorRiskAssessments[baseVendor]

  const averageCompetitorTco =
    selectedVendors.filter((v) => v !== baseVendor).reduce((acc, v) => acc + (vendorTco[v]?.totalCost || 0), 0) /
      (selectedVendors.length - 1 || 1) || 0

  const averageCompetitorRisk =
    selectedVendors
      .filter((v) => v !== baseVendor)
      .reduce((acc, v) => acc + (vendorRiskAssessments[v]?.overallRiskScore || 0), 0) /
      (selectedVendors.length - 1 || 1) || 0

  const tcoSavings = averageCompetitorTco - (baseTco?.totalCost || 0)
  const riskReduction = averageCompetitorRisk - (baseRisk?.overallRiskScore || 0)

  const summaryData = [
    {
      title: "TCO Savings",
      value: formatCurrency(tcoSavings),
      description: `vs. competitor average`,
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Risk Reduction",
      value: `${riskReduction.toFixed(1)} pts`,
      description: `Lower risk score`,
      icon: ShieldCheck,
      color: "text-blue-500",
    },
    {
      title: "ROI",
      value: `${baseTco?.roi.toFixed(1) || 0}%`,
      description: `Over ${baseTco?.years} years`,
      icon: TrendingUp,
      color: "text-purple-500",
    },
    {
      title: "Top Compliance Gap",
      value: baseRisk?.complianceGaps[0]?.standardName || "N/A",
      description: "Area for improvement",
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
  ]

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-24 mt-1" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Calculate key metrics
  const totalVendors = vendors.length
  const assessedVendors = Object.keys(riskAssessments).length
  const avgRiskScore =
    assessedVendors > 0
      ? Object.values(riskAssessments).reduce((sum, assessment) => sum + assessment.overallRiskScore, 0) /
        assessedVendors
      : 0

  const riskDistribution = Object.values(riskAssessments).reduce(
    (acc, assessment) => {
      acc[assessment.riskLevel] = (acc[assessment.riskLevel] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const totalComplianceGaps = Object.values(riskAssessments).reduce(
    (sum, assessment) => sum + assessment.complianceGaps.length,
    0,
  )

  const totalCostRisk = Object.values(riskAssessments).reduce(
    (sum, assessment) => sum + assessment.costOfNonCompliance.total,
    0,
  )

  const criticalInsights = insights.filter((i) => i.priority === "critical").length
  const highPriorityItems = insights.filter((i) => i.priority === "high" || i.priority === "critical").length

  // Chart data
  const riskChartData = Object.entries(riskDistribution).map(([level, count]) => ({
    level: level.charAt(0).toUpperCase() + level.slice(1),
    count,
    color: level === "critical" ? "#ef4444" : level === "high" ? "#f97316" : level === "medium" ? "#eab308" : "#22c55e",
  }))

  const vendorRiskData = vendors
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

  const trendData = [
    { month: "Jan", riskScore: 65, complianceGaps: 12 },
    { month: "Feb", riskScore: 68, complianceGaps: 15 },
    { month: "Mar", riskScore: 62, complianceGaps: 10 },
    { month: "Apr", riskScore: 58, complianceGaps: 8 },
    { month: "May", riskScore: 55, complianceGaps: 6 },
    {
      month: "Jun",
      riskScore: Math.round(avgRiskScore),
      complianceGaps: Math.round(totalComplianceGaps / totalVendors),
    },
  ]

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with AI Integration */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Executive Summary</h2>
          <p className="text-slate-400">Comprehensive overview of your vendor risk landscape</p>
        </div>
        <div className="flex items-center gap-3">
          {hasInsights && (
            <Badge variant="outline" className="text-green-400 border-green-400">
              <Brain className="w-3 h-3 mr-1" />
              AI Enhanced
            </Badge>
          )}
          <Button
            onClick={() => generateInsights(true)}
            disabled={aiLoading}
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {aiLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            {aiLoading ? "Generating..." : "AI Insights"}
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                <item.icon className={`h-4 w-4 text-muted-foreground ${item.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Executive Summary Integration */}
      {executiveSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                AI-Generated Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Key Findings</h4>
                <p className="text-slate-300 leading-relaxed">{executiveSummary.overview}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-white mb-2">Critical Risks</h5>
                  <ul className="space-y-1">
                    {executiveSummary.criticalRisks.slice(0, 3).map((risk, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-2">Top Recommendations</h5>
                  <ul className="space-y-1">
                    {executiveSummary.recommendations.slice(0, 3).map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                <div className="text-sm text-slate-400">Financial Impact: {executiveSummary.financialImpact}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-400 hover:text-purple-300"
                  onClick={() => window.open("/ai-insights", "_blank")}
                >
                  View Full Analysis
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* AI Insights Summary */}
      {hasInsights && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">AI Insights Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for AI Insights Summary content */}
              <p className="text-slate-400 text-center py-8">AI Insights Summary content goes here</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Detailed Analysis Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700">
              Risk Overview
            </TabsTrigger>
            <TabsTrigger value="vendors" className="data-[state=active]:bg-slate-700">
              Vendor Analysis
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-slate-700">
              Risk Trends
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-slate-700">
              Compliance Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Risk Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={riskChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="count"
                        label={({ level, count }) => `${level}: ${count}`}
                      >
                        {riskChartData.map((entry, index) => (
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

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Key Risk Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Overall Risk Level</span>
                      <span className="text-white">{Math.round(avgRiskScore)}/100</span>
                    </div>
                    <Progress value={avgRiskScore} className="h-2" />
                  </div>

                  <Separator className="bg-slate-700" />

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">Critical Risk Vendors</span>
                      <Badge variant="destructive">{riskDistribution.critical || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">High Risk Vendors</span>
                      <Badge variant="outline" className="border-orange-500 text-orange-400">
                        {riskDistribution.high || 0}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">Total Compliance Gaps</span>
                      <Badge variant="outline">{totalComplianceGaps}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">Estimated Cost Risk</span>
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        ${Math.round(totalCostRisk / 1000)}K
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vendors" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Vendor Risk Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={vendorRiskData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                    <Bar dataKey="riskScore" fill="#f97316" name="Risk Score" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Risk Trend Analysis</CardTitle>
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
                      stroke="#f97316"
                      fill="#f97316"
                      fillOpacity={0.3}
                      name="Risk Score"
                    />
                    <Area
                      type="monotone"
                      dataKey="complianceGaps"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.3}
                      name="Compliance Gaps"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Compliance Status Overview</CardTitle>
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
                      .slice(0, 5)
                      .map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300 text-sm">{item.standard}</span>
                            <Badge variant="outline" className="text-red-400 border-red-400">
                              {item.gaps} gaps
                            </Badge>
                          </div>
                          <Progress value={(item.totalRisk / item.gaps) * 10} className="h-2" />
                        </div>
                      ))
                  ) : (
                    <p className="text-slate-400 text-center py-8">No compliance data available</p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Remediation Priority</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.values(riskAssessments)
                      .flatMap((assessment) => assessment.complianceGaps)
                      .sort((a, b) => b.riskScore - a.riskScore)
                      .slice(0, 5)
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
                          <p className="text-slate-400 text-xs">{gap.standardName}</p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
