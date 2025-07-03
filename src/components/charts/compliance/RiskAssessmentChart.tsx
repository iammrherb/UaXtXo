"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts"
import { AlertTriangle, Shield, TrendingUp, DollarSign } from "lucide-react"
import type { RiskAssessmentResult } from "@/lib/compliance/risk-assessment"

interface RiskAssessmentChartProps {
  riskAssessments: Record<string, RiskAssessmentResult>
  vendorNames: Record<string, string>
}

const getRiskColor = (level: string) => {
  switch (level) {
    case "critical":
      return "#ef4444"
    case "high":
      return "#f97316"
    case "medium":
      return "#eab308"
    case "low":
      return "#22c55e"
    default:
      return "#6b7280"
  }
}

const getRiskBadgeVariant = (level: string) => {
  switch (level) {
    case "critical":
      return "destructive"
    case "high":
      return "destructive"
    case "medium":
      return "secondary"
    case "low":
      return "default"
    default:
      return "outline"
  }
}

export const RiskAssessmentChart: React.FC<RiskAssessmentChartProps> = ({ riskAssessments, vendorNames }) => {
  // Prepare data for charts
  const riskComparisonData = Object.entries(riskAssessments).map(([vendorId, assessment]) => ({
    vendor: vendorNames[vendorId] || vendorId,
    riskScore: assessment.overallRiskScore,
    riskLevel: assessment.riskLevel,
    gapCount: assessment.complianceGaps.length,
    totalCost: assessment.costOfNonCompliance.total,
  }))

  const riskDistributionData = Object.values(riskAssessments).reduce(
    (acc, assessment) => {
      const level = assessment.riskLevel
      acc[level] = (acc[level] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const pieData = Object.entries(riskDistributionData).map(([level, count]) => ({
    name: level.charAt(0).toUpperCase() + level.slice(1),
    value: count,
    color: getRiskColor(level),
  }))

  // Get the vendor with lowest risk for recommendations
  const lowestRiskVendor = riskComparisonData.reduce((min, vendor) => (vendor.riskScore < min.riskScore ? vendor : min))

  return (
    <div className="space-y-6">
      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">Avg Risk Score</p>
                <p className="text-2xl font-bold text-white">
                  {Math.round(riskComparisonData.reduce((sum, v) => sum + v.riskScore, 0) / riskComparisonData.length)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <div>
                <p className="text-sm text-slate-400">Total Gaps</p>
                <p className="text-2xl font-bold text-white">
                  {riskComparisonData.reduce((sum, v) => sum + v.gapCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">Avg Cost Risk</p>
                <p className="text-2xl font-bold text-white">
                  $
                  {Math.round(
                    riskComparisonData.reduce((sum, v) => sum + v.totalCost, 0) / riskComparisonData.length / 1000,
                  )}
                  K
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <div>
                <p className="text-sm text-slate-400">Best Option</p>
                <p className="text-lg font-bold text-white truncate">{lowestRiskVendor.vendor}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Comparison Bar Chart */}
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Compliance Risk Comparison</CardTitle>
          <CardDescription className="text-slate-400">Overall risk scores by vendor (lower is better)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="vendor"
                  tick={{ fill: "#E5E7EB", fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: "#E5E7EB", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 41, 59, 0.95)",
                    borderColor: "#475569",
                    borderRadius: "0.75rem",
                    color: "#E5E7EB",
                  }}
                  formatter={(value: any, name: string) => [
                    name === "riskScore" ? `${value}/100` : value,
                    name === "riskScore" ? "Risk Score" : name === "gapCount" ? "Compliance Gaps" : "Cost Risk ($)",
                  ]}
                />
                <Bar dataKey="riskScore" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Risk Distribution and Detailed Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Level Distribution */}
        <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Risk Level Distribution</CardTitle>
            <CardDescription className="text-slate-400">Distribution of vendors by risk level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(30, 41, 59, 0.95)",
                      borderColor: "#475569",
                      borderRadius: "0.75rem",
                      color: "#E5E7EB",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Risk Details */}
        <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Risk Assessment Details</CardTitle>
            <CardDescription className="text-slate-400">Detailed risk breakdown by vendor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskComparisonData.map((vendor) => (
              <div key={vendor.vendor} className="p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{vendor.vendor}</h4>
                  <Badge variant={getRiskBadgeVariant(vendor.riskLevel)}>{vendor.riskLevel.toUpperCase()}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Risk Score:</span>
                    <span className="text-white">{vendor.riskScore}/100</span>
                  </div>
                  <Progress
                    value={vendor.riskScore}
                    className="h-2"
                    style={{
                      backgroundColor: "rgba(71, 85, 105, 0.3)",
                    }}
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Compliance Gaps:</span>
                    <span className="text-white">{vendor.gapCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Cost Risk:</span>
                    <span className="text-white">${(vendor.totalCost / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Risk Recommendations */}
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Risk Mitigation Recommendations</CardTitle>
          <CardDescription className="text-slate-400">Prioritized actions to reduce compliance risk</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(riskAssessments).map(([vendorId, assessment]) => {
              const vendorName = vendorNames[vendorId] || vendorId
              return assessment.recommendations.slice(0, 2).map((rec, index) => (
                <Alert key={`${vendorId}-${index}`} className="bg-slate-700/30 border-slate-600">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{vendorName}</span>
                        <Badge variant={rec.priority === "high" ? "destructive" : "secondary"}>
                          {rec.priority.toUpperCase()} PRIORITY
                        </Badge>
                      </div>
                      <p className="text-slate-300">{rec.action}</p>
                      <div className="flex justify-between text-sm text-slate-400">
                        <span>Impact: {rec.expectedImpact}</span>
                        <span>Cost: ${(rec.estimatedCost / 1000).toFixed(0)}K</span>
                        <span>Timeline: {rec.timeframe}</span>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
