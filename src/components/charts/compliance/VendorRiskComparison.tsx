"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import {
  Shield,
  AlertTriangle,
  DollarSign,
  CheckCircle,
  XCircle,
  MinusCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  ContrastIcon as Compare,
  Download,
} from "lucide-react"
import type { RiskAssessmentResult } from "@/lib/compliance/risk-assessment"
import type { NewVendorData } from "@/lib/vendors/data"
import type { IndustryId, OrgSizeId } from "@/types/common"
import { ExportDialog } from "@/components/export/ExportDialog"
import { QuickExportButtons } from "@/components/export/QuickExportButtons"

interface VendorRiskComparisonProps {
  vendors: NewVendorData[]
  riskAssessments: Record<string, RiskAssessmentResult>
  selectedVendors?: string[]
  onVendorSelectionChange?: (vendors: string[]) => void
  industry: IndustryId
  orgSize: OrgSizeId
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

const getRiskIcon = (level: string) => {
  switch (level) {
    case "critical":
      return <XCircle className="w-5 h-5 text-red-500" />
    case "high":
      return <AlertTriangle className="w-5 h-5 text-orange-500" />
    case "medium":
      return <MinusCircle className="w-5 h-5 text-yellow-500" />
    case "low":
      return <CheckCircle className="w-5 h-5 text-green-500" />
    default:
      return <MinusCircle className="w-5 h-5 text-gray-500" />
  }
}

const getComparisonIcon = (value1: number, value2: number) => {
  if (value1 > value2) return <TrendingUp className="w-4 h-4 text-green-500" />
  if (value1 < value2) return <TrendingDown className="w-4 h-4 text-red-500" />
  return <Minus className="w-4 h-4 text-gray-500" />
}

export const VendorRiskComparison: React.FC<VendorRiskComparisonProps> = ({
  vendors,
  riskAssessments,
  selectedVendors = [],
  onVendorSelectionChange,
  industry,
  orgSize,
}) => {
  const [primaryVendor, setPrimaryVendor] = useState<string>(selectedVendors[0] || vendors[0]?.id || "")
  const [comparisonVendors, setComparisonVendors] = useState<string[]>(
    selectedVendors.slice(1, 3) || vendors.slice(1, 3).map((v) => v.id),
  )

  const availableVendors = vendors.filter((v) => riskAssessments[v.id])

  const handleVendorChange = (vendorId: string, type: "primary" | "comparison", index?: number) => {
    if (type === "primary") {
      setPrimaryVendor(vendorId)
      const newSelection = [vendorId, ...comparisonVendors].slice(0, 3)
      onVendorSelectionChange?.(newSelection)
    } else if (type === "comparison" && index !== undefined) {
      const newComparison = [...comparisonVendors]
      newComparison[index] = vendorId
      setComparisonVendors(newComparison)
      const newSelection = [primaryVendor, ...newComparison].filter(Boolean).slice(0, 3)
      onVendorSelectionChange?.(newSelection)
    }
  }

  const comparisonData = useMemo(() => {
    const allVendors = [primaryVendor, ...comparisonVendors].filter(Boolean)
    return allVendors.map((vendorId) => {
      const vendor = vendors.find((v) => v.id === vendorId)
      const assessment = riskAssessments[vendorId]
      return {
        id: vendorId,
        name: vendor?.name || vendorId,
        vendor,
        assessment,
      }
    })
  }, [primaryVendor, comparisonVendors, vendors, riskAssessments])

  const exportData = useMemo(
    () => ({
      vendors: comparisonData.map((item) => item.vendor).filter(Boolean) as NewVendorData[],
      riskAssessments: Object.fromEntries(
        comparisonData.map((item) => [item.id, item.assessment]).filter(([_, assessment]) => assessment),
      ),
      industry,
      orgSize,
      generatedAt: new Date().toISOString(),
      selectedVendors: comparisonData.map((item) => item.id),
    }),
    [comparisonData, industry, orgSize],
  )

  const radarData = useMemo(() => {
    const categories = [
      { key: "overallRiskScore", label: "Overall Risk", invert: true },
      { key: "securityEffectiveness", label: "Security", invert: false },
      { key: "complianceCoverage", label: "Compliance", invert: false },
      { key: "deploymentEase", label: "Deployment", invert: false },
      { key: "costEffectiveness", label: "Cost", invert: false },
    ]

    return categories.map((category) => {
      const dataPoint: any = { category: category.label }
      comparisonData.forEach((item) => {
        let value = 0
        if (category.key === "overallRiskScore") {
          value = category.invert
            ? 100 - (item.assessment?.overallRiskScore || 0)
            : item.assessment?.overallRiskScore || 0
        } else if (category.key === "securityEffectiveness") {
          value = item.vendor?.comparativeScores?.securityEffectiveness || 0
        } else if (category.key === "complianceCoverage") {
          value = item.vendor?.comparativeScores?.complianceCoverageScore || 0
        } else if (category.key === "deploymentEase") {
          value = item.vendor?.comparativeScores?.easeOfDeployment || 0
        } else if (category.key === "costEffectiveness") {
          value = item.vendor?.comparativeScores?.totalCostOfOwnershipScore || 0
        }
        dataPoint[item.name] = Math.max(0, Math.min(100, value))
      })
      return dataPoint
    })
  }, [comparisonData])

  const costComparisonData = useMemo(() => {
    return comparisonData.map((item) => ({
      vendor: item.name,
      nonComplianceCost: (item.assessment?.costOfNonCompliance.total || 0) / 1000,
      remediationCost: item.assessment?.complianceGaps.reduce((sum, gap) => sum + gap.remediationCost, 0) / 1000 || 0,
      totalCost:
        ((item.assessment?.costOfNonCompliance.total || 0) +
          (item.assessment?.complianceGaps.reduce((sum, gap) => sum + gap.remediationCost, 0) || 0)) /
        1000,
    }))
  }, [comparisonData])

  if (!primaryVendor || comparisonData.length === 0) {
    return (
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardContent className="p-8 text-center">
          <Compare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-400">Select vendors to begin risk comparison</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Vendor Selection */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Compare className="w-5 h-5" />
                Vendor Risk Comparison
              </CardTitle>
              <CardDescription className="text-slate-400">
                Compare compliance risk profiles across multiple vendors
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <QuickExportButtons data={exportData} />
              <ExportDialog
                data={exportData}
                trigger={
                  <button className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                }
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Primary Vendor</label>
              <Select value={primaryVendor} onValueChange={(value) => handleVendorChange(value, "primary")}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select primary vendor" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {availableVendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id} className="text-white hover:bg-slate-700">
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {[0, 1].map((index) => (
              <div key={index}>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Comparison Vendor {index + 1}</label>
                <Select
                  value={comparisonVendors[index] || ""}
                  onValueChange={(value) => handleVendorChange(value, "comparison", index)}
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder={`Select vendor ${index + 1}`} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {availableVendors
                      .filter((v) => v.id !== primaryVendor && !comparisonVendors.includes(v.id))
                      .map((vendor) => (
                        <SelectItem key={vendor.id} value={vendor.id} className="text-white hover:bg-slate-700">
                          {vendor.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="costs">Cost Comparison</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Risk Score Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparisonData.map((item, index) => (
              <Card
                key={item.id}
                className={`bg-slate-800/30 border-slate-700/50 ${index === 0 ? "ring-2 ring-blue-500/50" : ""}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">{item.name}</CardTitle>
                    {index === 0 && <Badge variant="outline">Primary</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {getRiskIcon(item.assessment?.riskLevel || "medium")}
                      <span className="ml-2 text-2xl font-bold text-white">
                        {item.assessment?.overallRiskScore || 0}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      style={{ color: getRiskColor(item.assessment?.riskLevel || "medium") }}
                      className="mb-3"
                    >
                      {(item.assessment?.riskLevel || "medium").toUpperCase()} RISK
                    </Badge>
                    <Progress
                      value={item.assessment?.overallRiskScore || 0}
                      className="h-2"
                      style={{
                        backgroundColor: "rgba(71, 85, 105, 0.3)",
                      }}
                    />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Compliance Gaps:</span>
                      <span className="text-white">{item.assessment?.complianceGaps.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cost Risk:</span>
                      <span className="text-white">
                        ${((item.assessment?.costOfNonCompliance.total || 0) / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Security Score:</span>
                      <span className="text-white">{item.vendor?.comparativeScores?.securityEffectiveness || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Radar Chart Comparison */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Multi-Dimensional Risk Analysis</CardTitle>
              <CardDescription className="text-slate-400">
                Comprehensive comparison across key risk and performance dimensions
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#475569" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: "#94A3B8", fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#94A3B8", fontSize: 10 }} />
                  {comparisonData.map((item, index) => {
                    const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"]
                    return (
                      <Radar
                        key={item.id}
                        name={item.name}
                        dataKey={item.name}
                        stroke={colors[index % colors.length]}
                        fill={colors[index % colors.length]}
                        fillOpacity={index === 0 ? 0.3 : 0.1}
                        strokeWidth={index === 0 ? 3 : 2}
                      />
                    )
                  })}
                  <Legend />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(30, 41, 59, 0.95)",
                      borderColor: "#475569",
                      borderRadius: "0.75rem",
                      color: "#F1F5F9",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {/* Detailed Side-by-Side Comparison */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Detailed Risk Breakdown</CardTitle>
              <CardDescription className="text-slate-400">
                Side-by-side comparison of risk factors and compliance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                  <thead className="bg-slate-800/70">
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-100">Metric</th>
                      {comparisonData.map((item, index) => (
                        <th
                          key={item.id}
                          className={`px-3 py-3.5 text-center text-sm font-semibold text-slate-100 ${
                            index === 0 ? "bg-blue-900/30" : ""
                          }`}
                        >
                          {item.name}
                          {index === 0 && <div className="text-xs text-blue-400 mt-1">Primary</div>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                    <tr>
                      <td className="py-3 pl-4 pr-3 text-sm font-medium text-slate-200">Overall Risk Score</td>
                      {comparisonData.map((item, index) => (
                        <td key={item.id} className={`px-3 py-3 text-center ${index === 0 ? "bg-blue-900/10" : ""}`}>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-white font-semibold">{item.assessment?.overallRiskScore || 0}</span>
                            {index > 0 &&
                              getComparisonIcon(
                                comparisonData[0].assessment?.overallRiskScore || 0,
                                item.assessment?.overallRiskScore || 0,
                              )}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 pl-4 pr-3 text-sm font-medium text-slate-200">Risk Level</td>
                      {comparisonData.map((item, index) => (
                        <td key={item.id} className={`px-3 py-3 text-center ${index === 0 ? "bg-blue-900/10" : ""}`}>
                          <Badge
                            variant="outline"
                            style={{ color: getRiskColor(item.assessment?.riskLevel || "medium") }}
                          >
                            {(item.assessment?.riskLevel || "medium").toUpperCase()}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 pl-4 pr-3 text-sm font-medium text-slate-200">Compliance Gaps</td>
                      {comparisonData.map((item, index) => (
                        <td key={item.id} className={`px-3 py-3 text-center ${index === 0 ? "bg-blue-900/10" : ""}`}>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-white">{item.assessment?.complianceGaps.length || 0}</span>
                            {index > 0 &&
                              getComparisonIcon(
                                (comparisonData[0].assessment?.complianceGaps.length || 0) * -1,
                                (item.assessment?.complianceGaps.length || 0) * -1,
                              )}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 pl-4 pr-3 text-sm font-medium text-slate-200">Security Effectiveness</td>
                      {comparisonData.map((item, index) => (
                        <td key={item.id} className={`px-3 py-3 text-center ${index === 0 ? "bg-blue-900/10" : ""}`}>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-white">
                              {item.vendor?.comparativeScores?.securityEffectiveness || 0}
                            </span>
                            {index > 0 &&
                              getComparisonIcon(
                                comparisonData[0].vendor?.comparativeScores?.securityEffectiveness || 0,
                                item.vendor?.comparativeScores?.securityEffectiveness || 0,
                              )}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 pl-4 pr-3 text-sm font-medium text-slate-200">Compliance Coverage</td>
                      {comparisonData.map((item, index) => (
                        <td key={item.id} className={`px-3 py-3 text-center ${index === 0 ? "bg-blue-900/10" : ""}`}>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-white">
                              {item.vendor?.comparativeScores?.complianceCoverageScore || 0}
                            </span>
                            {index > 0 &&
                              getComparisonIcon(
                                comparisonData[0].vendor?.comparativeScores?.complianceCoverageScore || 0,
                                item.vendor?.comparativeScores?.complianceCoverageScore || 0,
                              )}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 pl-4 pr-3 text-sm font-medium text-slate-200">Deployment Ease</td>
                      {comparisonData.map((item, index) => (
                        <td key={item.id} className={`px-3 py-3 text-center ${index === 0 ? "bg-blue-900/10" : ""}`}>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-white">{item.vendor?.comparativeScores?.easeOfDeployment || 0}</span>
                            {index > 0 &&
                              getComparisonIcon(
                                comparisonData[0].vendor?.comparativeScores?.easeOfDeployment || 0,
                                item.vendor?.comparativeScores?.easeOfDeployment || 0,
                              )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Gaps Comparison */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Compliance Gaps Analysis</CardTitle>
              <CardDescription className="text-slate-400">
                Detailed breakdown of compliance gaps by vendor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {comparisonData.map((item, index) => (
                  <div
                    key={item.id}
                    className={`space-y-4 ${index === 0 ? "ring-2 ring-blue-500/30 p-4 rounded-lg" : ""}`}
                  >
                    <h4 className="font-semibold text-white flex items-center gap-2">
                      {item.name}
                      {index === 0 && (
                        <Badge variant="outline" className="text-xs">
                          Primary
                        </Badge>
                      )}
                    </h4>
                    <div className="space-y-3">
                      {(item.assessment?.complianceGaps.slice(0, 5) || []).map((gap, gapIndex) => (
                        <div key={gapIndex} className="p-3 bg-slate-700/30 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white">{gap.standardName}</span>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                gap.businessImpact === "critical"
                                  ? "text-red-400"
                                  : gap.businessImpact === "high"
                                    ? "text-orange-400"
                                    : "text-yellow-400"
                              }`}
                            >
                              {gap.businessImpact}
                            </Badge>
                          </div>
                          <div className="text-xs text-slate-400 space-y-1">
                            <div>Risk Score: {gap.riskScore}/10</div>
                            <div>Cost: ${(gap.remediationCost / 1000).toFixed(0)}K</div>
                            <div>Timeline: {gap.timeToRemediate} days</div>
                          </div>
                        </div>
                      ))}
                      {(item.assessment?.complianceGaps.length || 0) === 0 && (
                        <div className="p-3 bg-green-900/20 rounded-lg text-center">
                          <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                          <span className="text-sm text-green-400">No compliance gaps identified</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          {/* Cost Comparison Chart */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Cost Risk Comparison</CardTitle>
              <CardDescription className="text-slate-400">
                Financial impact comparison across vendors (in thousands)
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="vendor" tick={{ fill: "#E5E7EB", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#E5E7EB", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(30, 41, 59, 0.95)",
                      borderColor: "#475569",
                      borderRadius: "0.75rem",
                      color: "#E5E7EB",
                    }}
                    formatter={(value: any) => [`$${value}K`, ""]}
                  />
                  <Legend />
                  <Bar dataKey="nonComplianceCost" stackId="a" fill="#ef4444" name="Non-Compliance Cost" />
                  <Bar dataKey="remediationCost" stackId="a" fill="#f97316" name="Remediation Cost" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Cost Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {comparisonData.map((item, index) => (
              <Card
                key={item.id}
                className={`bg-slate-800/30 border-slate-700/50 ${index === 0 ? "ring-2 ring-blue-500/50" : ""}`}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    {item.name}
                    {index === 0 && (
                      <Badge variant="outline" className="text-xs">
                        Primary
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Non-Compliance Fines:</span>
                      <span className="text-white font-semibold">
                        ${((item.assessment?.costOfNonCompliance.fines || 0) / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Reputational Damage:</span>
                      <span className="text-white font-semibold">
                        ${((item.assessment?.costOfNonCompliance.reputationalDamage || 0) / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Operational Disruption:</span>
                      <span className="text-white font-semibold">
                        ${((item.assessment?.costOfNonCompliance.operationalDisruption || 0) / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <Separator className="bg-slate-600" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Remediation Cost:</span>
                      <span className="text-white font-semibold">
                        $
                        {(
                          (item.assessment?.complianceGaps.reduce((sum, gap) => sum + gap.remediationCost, 0) || 0) /
                          1000
                        ).toFixed(0)}
                        K
                      </span>
                    </div>
                    <Separator className="bg-slate-600" />
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-slate-300 font-semibold">Total Risk Cost:</span>
                      <span className="text-white font-bold">
                        ${((item.assessment?.costOfNonCompliance.total || 0) / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {/* Recommendations Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {comparisonData.map((item, index) => (
              <Card
                key={item.id}
                className={`bg-slate-800/30 border-slate-700/50 ${index === 0 ? "ring-2 ring-blue-500/50" : ""}`}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    {item.name} Recommendations
                    {index === 0 && (
                      <Badge variant="outline" className="text-xs">
                        Primary
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(item.assessment?.recommendations.slice(0, 3) || []).map((rec, recIndex) => (
                    <div key={recIndex} className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant={
                            rec.priority === "high"
                              ? "destructive"
                              : rec.priority === "medium"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {rec.priority.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-slate-400">{rec.timeframe}</span>
                      </div>
                      <p className="text-sm text-white mb-2">{rec.action}</p>
                      <p className="text-xs text-slate-400 mb-2">{rec.expectedImpact}</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Cost:</span>
                        <span className="text-white">${(rec.estimatedCost / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  ))}
                  {(item.assessment?.recommendations.length || 0) === 0 && (
                    <div className="p-3 bg-green-900/20 rounded-lg text-center">
                      <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <span className="text-sm text-green-400">No specific recommendations needed</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Recommendation */}
          {comparisonData.length > 1 && (
            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-xl text-white">Comparison Summary & Recommendation</CardTitle>
                <CardDescription className="text-slate-400">
                  Based on the risk analysis, here's our recommendation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">Recommended Choice</h4>
                      <p className="text-slate-300 mb-4">
                        Based on the comprehensive risk analysis, <strong>{comparisonData[0].name}</strong> appears to
                        be the optimal choice for your organization, offering the best balance of security, compliance
                        coverage, and risk mitigation.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Risk Score:</span>
                          <span className="text-white font-semibold ml-2">
                            {comparisonData[0].assessment?.overallRiskScore}/100
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Compliance Gaps:</span>
                          <span className="text-white font-semibold ml-2">
                            {comparisonData[0].assessment?.complianceGaps.length || 0}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Total Cost Risk:</span>
                          <span className="text-white font-semibold ml-2">
                            ${((comparisonData[0].assessment?.costOfNonCompliance.total || 0) / 1000).toFixed(0)}K
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
