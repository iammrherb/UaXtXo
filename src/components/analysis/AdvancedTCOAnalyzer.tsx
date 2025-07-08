"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DollarSign, TrendingUp, Calculator, Download, Settings, BarChart3, PieChartIcon, Clock } from "lucide-react"

// Advanced TCO calculation data
const advancedTcoData = {
  portnox: {
    name: "Portnox CLEAR",
    software: { year1: 45000, year3: 135000, year5: 225000 },
    hardware: { year1: 0, year3: 0, year5: 0 },
    implementation: { year1: 25000, year3: 35000, year5: 45000 },
    operational: { year1: 15000, year3: 45000, year5: 75000 },
    support: { year1: 12000, year3: 36000, year5: 60000 },
    hidden: { year1: 8000, year3: 24000, year5: 40000 },
    riskAdjustment: { breachPrevention: 150000, complianceSavings: 75000 },
  },
  cisco_ise: {
    name: "Cisco ISE",
    software: { year1: 85000, year3: 255000, year5: 425000 },
    hardware: { year1: 120000, year3: 180000, year5: 240000 },
    implementation: { year1: 150000, year3: 200000, year5: 250000 },
    operational: { year1: 45000, year3: 135000, year5: 225000 },
    support: { year1: 35000, year3: 105000, year5: 175000 },
    hidden: { year1: 65000, year3: 195000, year5: 325000 },
    riskAdjustment: { breachPrevention: 85000, complianceSavings: 45000 },
  },
  aruba_clearpass: {
    name: "Aruba ClearPass",
    software: { year1: 65000, year3: 195000, year5: 325000 },
    hardware: { year1: 85000, year3: 125000, year5: 165000 },
    implementation: { year1: 95000, year3: 135000, year5: 175000 },
    operational: { year1: 35000, year3: 105000, year5: 175000 },
    support: { year1: 25000, year3: 75000, year5: 125000 },
    hidden: { year1: 45000, year3: 135000, year5: 225000 },
    riskAdjustment: { breachPrevention: 75000, complianceSavings: 35000 },
  },
  fortinac: {
    name: "FortiNAC",
    software: { year1: 55000, year3: 165000, year5: 275000 },
    hardware: { year1: 75000, year3: 110000, year5: 145000 },
    implementation: { year1: 85000, year3: 115000, year5: 145000 },
    operational: { year1: 30000, year3: 90000, year5: 150000 },
    support: { year1: 22000, year3: 66000, year5: 110000 },
    hidden: { year1: 38000, year3: 114000, year5: 190000 },
    riskAdjustment: { breachPrevention: 65000, complianceSavings: 30000 },
  },
}

const COLORS = ["#00D4AA", "#FF6B35", "#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"]

interface AdvancedTCOAnalyzerProps {
  selectedVendors?: string[]
  projectionYears?: number
  orgSize?: "small" | "medium" | "large" | "enterprise"
  industry?: string
}

const AdvancedTCOAnalyzer: React.FC<AdvancedTCOAnalyzerProps> = ({
  selectedVendors = ["portnox", "cisco_ise", "aruba_clearpass"],
  projectionYears = 5,
  orgSize = "medium",
  industry = "technology",
}) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [riskAdjusted, setRiskAdjusted] = useState(true)
  const [includeHiddenCosts, setIncludeHiddenCosts] = useState(true)
  const [inflationRate, setInflationRate] = useState([3])
  const [discountRate, setDiscountRate] = useState([8])

  // Calculate comprehensive TCO data
  const comprehensiveTcoData = useMemo(() => {
    return selectedVendors
      .map((vendorId) => {
        const vendor = advancedTcoData[vendorId as keyof typeof advancedTcoData]
        if (!vendor) return null

        const calculateTotal = (year: "year1" | "year3" | "year5") => {
          let total =
            vendor.software[year] +
            vendor.hardware[year] +
            vendor.implementation[year] +
            vendor.operational[year] +
            vendor.support[year]

          if (includeHiddenCosts) {
            total += vendor.hidden[year]
          }

          if (riskAdjusted) {
            total -= vendor.riskAdjustment.breachPrevention + vendor.riskAdjustment.complianceSavings
          }

          return Math.max(total, 0)
        }

        return {
          id: vendorId,
          name: vendor.name,
          year1: calculateTotal("year1"),
          year3: calculateTotal("year3"),
          year5: calculateTotal("year5"),
          breakdown: {
            software: vendor.software.year5,
            hardware: vendor.hardware.year5,
            implementation: vendor.implementation.year5,
            operational: vendor.operational.year5,
            support: vendor.support.year5,
            hidden: includeHiddenCosts ? vendor.hidden.year5 : 0,
          },
          riskSavings: riskAdjusted
            ? vendor.riskAdjustment.breachPrevention + vendor.riskAdjustment.complianceSavings
            : 0,
        }
      })
      .filter(Boolean)
  }, [selectedVendors, riskAdjusted, includeHiddenCosts])

  // Timeline data for cumulative cost analysis
  const timelineData = useMemo(() => {
    const years = Array.from({ length: projectionYears }, (_, i) => i + 1)
    return years.map((year) => {
      const yearData: any = { year }

      comprehensiveTcoData.forEach((vendor) => {
        if (vendor) {
          // Linear interpolation for intermediate years
          let cost = 0
          if (year === 1) cost = vendor.year1
          else if (year <= 3) cost = vendor.year1 + ((vendor.year3 - vendor.year1) * (year - 1)) / 2
          else cost = vendor.year3 + ((vendor.year5 - vendor.year3) * (year - 3)) / 2

          yearData[vendor.id] = cost
        }
      })

      return yearData
    })
  }, [comprehensiveTcoData, projectionYears])

  // Cost breakdown pie chart data
  const costBreakdownData = useMemo(() => {
    if (comprehensiveTcoData.length === 0) return []

    const portnoxData = comprehensiveTcoData.find((v) => v?.id === "portnox")
    if (!portnoxData) return []

    return [
      { name: "Software", value: portnoxData.breakdown.software, color: COLORS[0] },
      { name: "Hardware", value: portnoxData.breakdown.hardware, color: COLORS[1] },
      { name: "Implementation", value: portnoxData.breakdown.implementation, color: COLORS[2] },
      { name: "Operational", value: portnoxData.breakdown.operational, color: COLORS[3] },
      { name: "Support", value: portnoxData.breakdown.support, color: COLORS[4] },
      { name: "Hidden Costs", value: portnoxData.breakdown.hidden, color: COLORS[5] },
    ].filter((item) => item.value > 0)
  }, [comprehensiveTcoData])

  // ROI calculation
  const roiAnalysis = useMemo(() => {
    if (comprehensiveTcoData.length < 2) return null

    const portnox = comprehensiveTcoData.find((v) => v?.id === "portnox")
    const competitors = comprehensiveTcoData.filter((v) => v?.id !== "portnox")

    if (!portnox || competitors.length === 0) return null

    const avgCompetitorCost = competitors.reduce((sum, comp) => sum + (comp?.year5 || 0), 0) / competitors.length
    const savings = avgCompetitorCost - portnox.year5
    const roi = (savings / portnox.year5) * 100
    const paybackPeriod = portnox.year5 / (savings / projectionYears)

    return {
      totalSavings: savings,
      roi: roi,
      paybackPeriod: Math.max(paybackPeriod, 0),
      portnoxCost: portnox.year5,
      competitorAvgCost: avgCompetitorCost,
    }
  }, [comprehensiveTcoData, projectionYears])

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500">
            Advanced TCO Analyzer
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive Total Cost of Ownership analysis with risk adjustments and hidden cost factors
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Analysis
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
        </div>
      </div>

      {/* Configuration Panel */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Calculator className="mr-2 h-5 w-5" />
            Analysis Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Risk Adjusted</label>
              <Button
                variant={riskAdjusted ? "default" : "outline"}
                size="sm"
                onClick={() => setRiskAdjusted(!riskAdjusted)}
                className="w-full"
              >
                {riskAdjusted ? "Enabled" : "Disabled"}
              </Button>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Hidden Costs</label>
              <Button
                variant={includeHiddenCosts ? "default" : "outline"}
                size="sm"
                onClick={() => setIncludeHiddenCosts(!includeHiddenCosts)}
                className="w-full"
              >
                {includeHiddenCosts ? "Included" : "Excluded"}
              </Button>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                Inflation Rate: {inflationRate[0]}%
              </label>
              <Slider
                value={inflationRate}
                onValueChange={setInflationRate}
                max={10}
                min={0}
                step={0.5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Discount Rate: {discountRate[0]}%</label>
              <Slider
                value={discountRate}
                onValueChange={setDiscountRate}
                max={15}
                min={0}
                step={0.5}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      {roiAnalysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Total Savings</p>
                  <p className="text-2xl font-bold text-green-400">${roiAnalysis.totalSavings.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">ROI</p>
                  <p className="text-2xl font-bold text-blue-400">{roiAnalysis.roi.toFixed(1)}%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Payback Period</p>
                  <p className="text-2xl font-bold text-purple-400">{roiAnalysis.paybackPeriod.toFixed(1)} years</p>
                </div>
                <Clock className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Portnox TCO</p>
                  <p className="text-2xl font-bold text-cyan-400">${roiAnalysis.portnoxCost.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="breakdown" className="flex items-center gap-2">
            <PieChartIcon className="w-4 h-4" />
            Breakdown
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Comparison
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">5-Year TCO Comparison</CardTitle>
              <CardDescription>
                Total cost of ownership over {projectionYears} years
                {riskAdjusted && " (Risk Adjusted)"}
                {includeHiddenCosts && " (Including Hidden Costs)"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comprehensiveTcoData}>
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
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "5-Year TCO"]}
                  />
                  <Bar dataKey="year5" fill="#00D4AA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Cumulative Cost Timeline</CardTitle>
              <CardDescription>Cost accumulation over time for each vendor</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={timelineData}>
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
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Cumulative Cost"]}
                  />
                  <Legend />
                  {comprehensiveTcoData.map((vendor, index) => (
                    <Area
                      key={vendor?.id}
                      type="monotone"
                      dataKey={vendor?.id}
                      stackId="1"
                      stroke={COLORS[index]}
                      fill={COLORS[index]}
                      fillOpacity={0.6}
                      name={vendor?.name}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Breakdown Tab */}
        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Portnox Cost Breakdown</CardTitle>
                <CardDescription>5-year cost distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={costBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {costBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Cost"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Cost Category Details</CardTitle>
                <CardDescription>Detailed breakdown by cost category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costBreakdownData.map((category, index) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="text-white font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">${category.value.toLocaleString()}</div>
                        <div className="text-sm text-slate-400">
                          {(
                            (category.value / costBreakdownData.reduce((sum, item) => sum + item.value, 0)) *
                            100
                          ).toFixed(1)}
                          %
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Detailed Vendor Comparison</CardTitle>
              <CardDescription>Side-by-side comparison of all cost factors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300">Vendor</th>
                      <th className="text-right py-3 px-4 text-slate-300">Year 1</th>
                      <th className="text-right py-3 px-4 text-slate-300">Year 3</th>
                      <th className="text-right py-3 px-4 text-slate-300">Year 5</th>
                      <th className="text-right py-3 px-4 text-slate-300">Risk Savings</th>
                      <th className="text-right py-3 px-4 text-slate-300">Net TCO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comprehensiveTcoData.map((vendor, index) => (
                      <tr key={vendor?.id} className="border-b border-slate-800 hover:bg-slate-700/20">
                        <td className="py-3 px-4 font-medium text-white">{vendor?.name}</td>
                        <td className="py-3 px-4 text-right text-slate-300">${vendor?.year1.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-slate-300">${vendor?.year3.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-slate-300">${vendor?.year5.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-green-400">${vendor?.riskSavings.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right font-semibold text-white">
                          ${(vendor?.year5 || 0 - (vendor?.riskSavings || 0)).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Savings Analysis */}
          {roiAnalysis && (
            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Savings Analysis</CardTitle>
                <CardDescription>Financial benefits of choosing Portnox CLEAR</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      ${roiAnalysis.totalSavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-400">Total 5-Year Savings</div>
                  </div>
                  <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{roiAnalysis.roi.toFixed(1)}%</div>
                    <div className="text-sm text-slate-400">Return on Investment</div>
                  </div>
                  <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {roiAnalysis.paybackPeriod.toFixed(1)}
                    </div>
                    <div className="text-sm text-slate-400">Years to Payback</div>
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

export default AdvancedTCOAnalyzer
