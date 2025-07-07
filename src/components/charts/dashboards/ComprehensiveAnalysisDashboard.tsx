"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useDashboardSettings } from "@/context/DashboardContext"
import { useVendorData } from "@/hooks/useVendorData"
import { useTcoCalculator } from "@/hooks/useTcoCalculator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ResponsiveContainer,
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
  ScatterChart,
  Scatter,
} from "recharts"
import {
  DollarSign,
  TrendingUp,
  Shield,
  Clock,
  Users,
  CheckCircle,
  BarChart3,
  Award,
  Target,
  Zap,
  Building,
  FileText,
  Download,
  Eye,
} from "lucide-react"

const COLORS = {
  portnox: "#00D4AA",
  cisco: "#1BA1E2",
  aruba: "#FF6900",
  fortinet: "#EE3124",
  forescout: "#00A651",
  juniper: "#84BD00",
  extreme: "#009639",
  meraki: "#58C4DC",
  microsoft: "#00BCF2",
  packetfence: "#2E8B57",
  foxpass: "#FF6B35",
  securew2: "#4A90E2",
  arista: "#F39C12",
}

const CHART_COLORS = ["#00D4AA", "#1BA1E2", "#FF6900", "#EE3124", "#00A651", "#84BD00", "#009639", "#58C4DC"]

interface ComprehensiveAnalysisDashboardProps {
  selectedVendors?: string[]
}

const ComprehensiveAnalysisDashboard: React.FC<ComprehensiveAnalysisDashboardProps> = ({
  selectedVendors = ["portnox", "cisco_ise", "aruba_clearpass", "fortinac", "forescout"],
}) => {
  const { selectedOrgSize, selectedIndustry, comparisonYears } = useDashboardSettings()
  const { getAllVendorIds, getVendor, isLoadingAllVendors } = useVendorData()
  const { calculateAllSelectedVendorsTco } = useTcoCalculator()

  const [activeTab, setActiveTab] = useState("overview")
  const [selectedMetric, setSelectedMetric] = useState("totalTCO")

  // Calculate TCO results for selected vendors
  const tcoResults = useMemo(() => {
    if (isLoadingAllVendors) return []

    return calculateAllSelectedVendorsTco({
      vendorIds: selectedVendors,
      orgSizeId: selectedOrgSize,
      industryId: selectedIndustry,
      projectionYears: comparisonYears,
    })
  }, [
    selectedVendors,
    selectedOrgSize,
    selectedIndustry,
    comparisonYears,
    calculateAllSelectedVendorsTco,
    isLoadingAllVendors,
  ])

  // Prepare chart data
  const chartData = useMemo(() => {
    return tcoResults.map((result, index) => ({
      name: result.vendorName,
      totalTCO: result.totalTCO,
      software: result.breakdown.software,
      hardware: result.breakdown.hardware,
      implementation: result.breakdown.implementation,
      operational: result.breakdown.operational,
      support: result.breakdown.support,
      hidden: result.breakdown.hidden,
      paybackMonths: result.roiMetrics.paybackPeriodMonths,
      riskReduction: result.riskReduction.breachProbabilityReduction,
      complianceScore: result.complianceMetrics.coverageScore,
      fteReduction: result.operationalMetrics.fteReduction,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }))
  }, [tcoResults])

  // Industry risk analysis data
  const industryRiskData = useMemo(() => {
    const riskFactors = {
      healthcare: { risk: 95, compliance: 90, cost: 85 },
      financial_services: { risk: 98, compliance: 95, cost: 88 },
      manufacturing: { risk: 78, compliance: 70, cost: 75 },
      retail: { risk: 72, compliance: 65, cost: 70 },
      technology: { risk: 80, compliance: 75, cost: 78 },
      education: { risk: 65, compliance: 60, cost: 62 },
      government: { risk: 100, compliance: 98, cost: 92 },
      energy_utilities: { risk: 96, compliance: 88, cost: 90 },
    }

    return Object.entries(riskFactors).map(([industry, factors]) => ({
      industry: industry.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      ...factors,
      isSelected: industry === selectedIndustry,
    }))
  }, [selectedIndustry])

  // Compliance framework coverage
  const complianceData = useMemo(() => {
    const frameworks = ["HIPAA", "PCI-DSS", "GDPR", "SOX", "ISO27001", "NIST", "FedRAMP"]

    return frameworks.map((framework) => {
      const portnoxVendor = getVendor("portnox")
      const portnoxCoverage =
        portnoxVendor?.complianceSupport.find((c) =>
          c.standardId.toLowerCase().replace(/[_-]/g, "").includes(framework.toLowerCase().replace(/[_-]/g, "")),
        )?.coveragePercent || 0

      const avgCompetitorCoverage =
        tcoResults
          .filter((r) => r.vendorId !== "portnox")
          .reduce((sum, result) => {
            const vendor = getVendor(result.vendorId)
            const coverage =
              vendor?.complianceSupport.find((c) =>
                c.standardId.toLowerCase().replace(/[_-]/g, "").includes(framework.toLowerCase().replace(/[_-]/g, "")),
              )?.coveragePercent || 0
            return sum + coverage
          }, 0) / Math.max(1, tcoResults.filter((r) => r.vendorId !== "portnox").length)

      return {
        framework,
        portnox: portnoxCoverage,
        competitors: avgCompetitorCoverage,
        gap: portnoxCoverage - avgCompetitorCoverage,
      }
    })
  }, [tcoResults, getVendor])

  // FTE and operational analysis
  const operationalData = useMemo(() => {
    return tcoResults.map((result) => ({
      vendor: result.vendorName,
      fteRequired: 2.5 - result.operationalMetrics.fteReduction, // Baseline 2.5 FTE
      efficiencyGain: result.operationalMetrics.efficiencyGains,
      maintenanceReduction: result.operationalMetrics.maintenanceReduction,
      deploymentDays: getVendor(result.vendorId)?.implementation.averageDeploymentTimeDays || 0,
    }))
  }, [tcoResults, getVendor])

  // Risk vs Cost scatter plot data
  const riskCostData = useMemo(() => {
    return tcoResults.map((result) => ({
      x: result.totalTCO / 1000, // TCO in thousands
      y: result.riskReduction.breachProbabilityReduction,
      z: result.complianceMetrics.coverageScore,
      name: result.vendorName,
      vendorId: result.vendorId,
    }))
  }, [tcoResults])

  if (isLoadingAllVendors) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading comprehensive analysis...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                Total Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                ${((chartData[1]?.totalTCO || 0) - (chartData[0]?.totalTCO || 0)).toLocaleString()}
              </div>
              <p className="text-sm text-emerald-300">vs. Traditional NAC</p>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-emerald-400">
                  {chartData[1] && chartData[0]
                    ? Math.round(((chartData[1].totalTCO - chartData[0].totalTCO) / chartData[1].totalTCO) * 100)
                    : 0}
                  % reduction
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-400" />
                Risk Reduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">{chartData[0]?.riskReduction || 0}%</div>
              <p className="text-sm text-blue-300">Breach probability reduction</p>
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-400">Industry leading</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-400" />
                Deployment Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">{operationalData[0]?.deploymentDays || 0} days</div>
              <p className="text-sm text-purple-300">vs. 120+ days traditional</p>
              <div className="flex items-center gap-2 mt-2">
                <Zap className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-purple-400">95% faster</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-400/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-400" />
                FTE Reduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {(operationalData[0]?.fteRequired || 0).toFixed(1)} FTE
              </div>
              <p className="text-sm text-orange-300">vs. 2.5 FTE traditional</p>
              <div className="flex items-center gap-2 mt-2">
                <Target className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-orange-400">
                  {Math.round(((2.5 - (operationalData[0]?.fteRequired || 0)) / 2.5) * 100)}% reduction
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tco-analysis" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            TCO Analysis
          </TabsTrigger>
          <TabsTrigger value="risk-compliance" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Risk & Compliance
          </TabsTrigger>
          <TabsTrigger value="operational" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Operational
          </TabsTrigger>
          <TabsTrigger value="industry" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Industry Analysis
          </TabsTrigger>
          <TabsTrigger value="executive" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Executive Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* TCO Comparison Chart */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Total Cost of Ownership Comparison</CardTitle>
              <CardDescription className="text-slate-400">
                {comparisonYears}-year TCO analysis across selected vendors
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, "Total TCO"]}
                  />
                  <Bar dataKey="totalTCO" fill="#00D4AA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-xl text-white">Cost Breakdown Analysis</CardTitle>
                <CardDescription className="text-slate-400">Detailed cost components by vendor</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <YAxis type="category" dataKey="name" stroke="#9CA3AF" width={100} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Bar dataKey="software" stackId="a" fill="#00D4AA" />
                    <Bar dataKey="hardware" stackId="a" fill="#1BA1E2" />
                    <Bar dataKey="implementation" stackId="a" fill="#FF6900" />
                    <Bar dataKey="operational" stackId="a" fill="#EE3124" />
                    <Bar dataKey="hidden" stackId="a" fill="#84BD00" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-xl text-white">ROI & Payback Analysis</CardTitle>
                <CardDescription className="text-slate-400">Return on investment metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="paybackMonths"
                      stroke="#00D4AA"
                      strokeWidth={3}
                      dot={{ fill: "#00D4AA", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tco-analysis" className="space-y-6">
          {/* Detailed TCO Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {chartData.slice(0, 3).map((vendor, index) => (
              <motion.div
                key={vendor.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/30 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center justify-between">
                      {vendor.name}
                      <Badge variant={index === 0 ? "default" : "secondary"}>
                        {index === 0 ? "Recommended" : `#${index + 1}`}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      ${vendor.totalTCO.toLocaleString()} total TCO
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-300">Software</span>
                        <span className="text-sm font-medium text-white">${vendor.software.toLocaleString()}</span>
                      </div>
                      <Progress value={(vendor.software / vendor.totalTCO) * 100} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-300">Implementation</span>
                        <span className="text-sm font-medium text-white">
                          ${vendor.implementation.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={(vendor.implementation / vendor.totalTCO) * 100} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-300">Operational</span>
                        <span className="text-sm font-medium text-white">${vendor.operational.toLocaleString()}</span>
                      </div>
                      <Progress value={(vendor.operational / vendor.totalTCO) * 100} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-300">Hidden Costs</span>
                        <span className="text-sm font-medium text-white">${vendor.hidden.toLocaleString()}</span>
                      </div>
                      <Progress value={(vendor.hidden / vendor.totalTCO) * 100} className="h-2" />
                    </div>

                    <Separator className="bg-slate-700" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Payback Period</span>
                      <span className="text-sm font-medium text-emerald-400">{vendor.paybackMonths} months</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* TCO Trends */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">TCO Trends Over Time</CardTitle>
              <CardDescription className="text-slate-400">Cumulative costs and savings projection</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    {
                      year: "Year 1",
                      portnox: chartData[0]?.totalTCO * 0.4,
                      cisco: chartData[1]?.totalTCO * 0.6,
                      aruba: chartData[2]?.totalTCO * 0.5,
                    },
                    {
                      year: "Year 2",
                      portnox: chartData[0]?.totalTCO * 0.7,
                      cisco: chartData[1]?.totalTCO * 0.8,
                      aruba: chartData[2]?.totalTCO * 0.75,
                    },
                    {
                      year: "Year 3",
                      portnox: chartData[0]?.totalTCO,
                      cisco: chartData[1]?.totalTCO,
                      aruba: chartData[2]?.totalTCO,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="year" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                  <Line type="monotone" dataKey="portnox" stroke="#00D4AA" strokeWidth={3} />
                  <Line type="monotone" dataKey="cisco" stroke="#1BA1E2" strokeWidth={3} />
                  <Line type="monotone" dataKey="aruba" stroke="#FF6900" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-compliance" className="space-y-6">
          {/* Risk vs Cost Scatter Plot */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Risk Reduction vs Total Cost</CardTitle>
              <CardDescription className="text-slate-400">
                Vendor positioning analysis - bubble size represents compliance coverage
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={riskCostData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Total Cost"
                    unit="K"
                    stroke="#9CA3AF"
                    tickFormatter={(value) => `$${value}K`}
                  />
                  <YAxis type="number" dataKey="y" name="Risk Reduction" unit="%" stroke="#9CA3AF" />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                    formatter={(value, name) => [
                      name === "x" ? `$${value}K` : `${value}%`,
                      name === "x" ? "Total Cost" : "Risk Reduction",
                    ]}
                  />
                  <Scatter dataKey="z" fill="#00D4AA" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Compliance Framework Coverage */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Compliance Framework Coverage</CardTitle>
              <CardDescription className="text-slate-400">
                Portnox vs competitor average across major frameworks
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={complianceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="framework" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="portnox" fill="#00D4AA" name="Portnox CLEAR" />
                  <Bar dataKey="competitors" fill="#64748B" name="Competitor Average" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational" className="space-y-6">
          {/* FTE Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-xl text-white">FTE Requirements</CardTitle>
                <CardDescription className="text-slate-400">
                  Full-time equivalent staff needed for operations
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={operationalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="vendor" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Bar dataKey="fteRequired" fill="#00D4AA" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-xl text-white">Deployment Timeline</CardTitle>
                <CardDescription className="text-slate-400">Time to full deployment by vendor</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={operationalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="vendor" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Bar dataKey="deploymentDays" fill="#1BA1E2" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Operational Efficiency Radar */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Operational Efficiency Comparison</CardTitle>
              <CardDescription className="text-slate-400">Multi-dimensional operational analysis</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={[
                    {
                      metric: "Deployment Speed",
                      portnox: 95,
                      cisco: 25,
                      aruba: 45,
                    },
                    {
                      metric: "Automation Level",
                      portnox: 90,
                      cisco: 45,
                      aruba: 50,
                    },
                    {
                      metric: "Maintenance Reduction",
                      portnox: 85,
                      cisco: 40,
                      aruba: 55,
                    },
                    {
                      metric: "Staff Efficiency",
                      portnox: 88,
                      cisco: 35,
                      aruba: 48,
                    },
                    {
                      metric: "Cost Efficiency",
                      portnox: 92,
                      cisco: 30,
                      aruba: 52,
                    },
                  ]}
                >
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" stroke="#9CA3AF" />
                  <PolarRadiusAxis stroke="#9CA3AF" />
                  <Radar name="Portnox" dataKey="portnox" stroke="#00D4AA" fill="#00D4AA" fillOpacity={0.3} />
                  <Radar name="Cisco ISE" dataKey="cisco" stroke="#1BA1E2" fill="#1BA1E2" fillOpacity={0.3} />
                  <Radar name="Aruba" dataKey="aruba" stroke="#FF6900" fill="#FF6900" fillOpacity={0.3} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="industry" className="space-y-6">
          {/* Industry Risk Analysis */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Industry Risk Profile Analysis</CardTitle>
              <CardDescription className="text-slate-400">
                Risk, compliance, and cost factors by industry
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryRiskData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="industry" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="risk" fill="#EE3124" name="Risk Level" />
                  <Bar dataKey="compliance" fill="#00D4AA" name="Compliance Requirements" />
                  <Bar dataKey="cost" fill="#1BA1E2" name="Cost Impact" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Industry-Specific Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-white">Industry Recommendations</CardTitle>
                <CardDescription className="text-slate-400">
                  Tailored recommendations for {selectedIndustry.replace("_", " ")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">Zero Trust Architecture</p>
                      <p className="text-xs text-slate-400">Essential for regulatory compliance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">Automated Compliance Reporting</p>
                      <p className="text-xs text-slate-400">Reduces audit preparation time by 75%</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">Risk-Based Authentication</p>
                      <p className="text-xs text-slate-400">Adaptive security based on threat level</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-white">Compliance Requirements</CardTitle>
                <CardDescription className="text-slate-400">Key frameworks for your industry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {complianceData.slice(0, 4).map((framework) => (
                  <div key={framework.framework} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white">{framework.framework}</span>
                      <span className="text-sm text-emerald-400">{framework.portnox}%</span>
                    </div>
                    <Progress value={framework.portnox} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="executive" className="space-y-6">
          {/* Executive Summary */}
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Award className="h-6 w-6 text-yellow-400" />
                Executive Summary
              </CardTitle>
              <CardDescription className="text-slate-400">
                Key findings and recommendations for {selectedIndustry.replace("_", " ")} organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <div className="text-2xl font-bold text-emerald-400">
                    ${((chartData[1]?.totalTCO || 0) - (chartData[0]?.totalTCO || 0)).toLocaleString()}
                  </div>
                  <div className="text-sm text-emerald-300">Total Savings</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">{chartData[0]?.paybackMonths || 0}</div>
                  <div className="text-sm text-blue-300">Months Payback</div>
                </div>
                <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400">{chartData[0]?.riskReduction || 0}%</div>
                  <div className="text-sm text-purple-300">Risk Reduction</div>
                </div>
                <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <div className="text-2xl font-bold text-orange-400">{operationalData[0]?.deploymentDays || 0}</div>
                  <div className="text-sm text-orange-300">Days to Deploy</div>
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Recommendations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Strategic Recommendations</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-white">Immediate Implementation</p>
                        <p className="text-sm text-slate-400">
                          Deploy Portnox CLEAR for immediate risk reduction and cost savings
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-white">Phased Migration</p>
                        <p className="text-sm text-slate-400">
                          Start with critical assets and expand organization-wide
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-white">Compliance Automation</p>
                        <p className="text-sm text-slate-400">
                          Leverage automated reporting for regulatory requirements
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        4
                      </div>
                      <div>
                        <p className="font-medium text-white">Staff Optimization</p>
                        <p className="text-sm text-slate-400">
                          Reallocate FTE savings to strategic security initiatives
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Action Items */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Next Steps</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <span className="text-sm text-white">Schedule 24-hour POC with Portnox team</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <FileText className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm text-white">Review detailed implementation timeline</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <Users className="h-5 w-5 text-purple-400" />
                    <span className="text-sm text-white">Identify key stakeholders for migration planning</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Export & Share</CardTitle>
              <CardDescription className="text-slate-400">Generate reports for stakeholders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Executive Summary PDF
                </Button>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <FileText className="h-4 w-4" />
                  Detailed Analysis Report
                </Button>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <BarChart3 className="h-4 w-4" />
                  TCO Comparison Spreadsheet
                </Button>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Eye className="h-4 w-4" />
                  Live Dashboard Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

export default ComprehensiveAnalysisDashboard
