"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { CheckCircle, Settings, BarChart3, FileText, Download, RefreshCw } from "lucide-react"

import { enhancedVendorDatabase, compareMultipleVendorsTCOLegacy } from "@/lib/calculators/tco"

const VENDOR_COLORS = {
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
  radiusaas: "#9B59B6",
}

const CHART_COLORS = ["#00D4AA", "#1BA1E2", "#FF6900", "#EE3124", "#00A651", "#84BD00", "#009639", "#58C4DC"]

interface AdvancedTCOAnalyzerProps {
  defaultVendors?: string[]
}

const AdvancedTCOAnalyzer: React.FC<AdvancedTCOAnalyzerProps> = ({
  defaultVendors = ["portnox", "cisco", "aruba", "fortinet", "forescout"],
}) => {
  // Configuration state
  const [selectedVendors, setSelectedVendors] = useState<string[]>(defaultVendors)
  const [devices, setDevices] = useState([1000])
  const [users, setUsers] = useState([1500])
  const [industry, setIndustry] = useState("healthcare")
  const [region, setRegion] = useState("north_america")
  const [projectionYears, setProjectionYears] = useState([3])
  const [includeHiddenCosts, setIncludeHiddenCosts] = useState(true)
  const [includeRiskBenefits, setIncludeRiskBenefits] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate TCO results
  const tcoResults = useMemo(() => {
    const orgConfig = {
      devices: devices[0],
      users: users[0],
      industry,
      region,
    }

    const analysisConfig = {
      years: projectionYears[0],
    }

    return compareMultipleVendorsTCOLegacy(selectedVendors, orgConfig, analysisConfig)
  }, [selectedVendors, devices, users, industry, region, projectionYears])

  // Prepare chart data
  const chartData = useMemo(() => {
    return tcoResults.map((result, index) => ({
      name: result.vendorName,
      vendor: result.vendor,
      totalTCO: result.total,
      year1: result.year1,
      year2: result.year2,
      year3: result.year3,
      year5: result.year5,
      licensing: result.licensing,
      implementation: result.implementation,
      operations: result.operations,
      paybackMonths: result.roi.paybackMonths,
      roiPercentage: result.roi.percentage,
      color: VENDOR_COLORS[result.vendor] || CHART_COLORS[index % CHART_COLORS.length],
    }))
  }, [tcoResults])

  // Cost breakdown data
  const costBreakdownData = useMemo(() => {
    return tcoResults.map((result) => ({
      vendor: result.vendorName,
      software: result.breakdown.software[0] || 0,
      implementation: result.breakdown.implementation[0] || 0,
      operations: result.breakdown.operations[0] || 0,
      support: result.breakdown.support[0] || 0,
      infrastructure: result.breakdown.infrastructure?.[0] || 0,
    }))
  }, [tcoResults])

  // Savings analysis
  const savingsAnalysis = useMemo(() => {
    if (chartData.length < 2) return null

    const baseline = chartData.find((d) => d.vendor === "cisco") || chartData[1]
    const portnox = chartData.find((d) => d.vendor === "portnox") || chartData[0]

    if (!baseline || !portnox) return null

    return {
      totalSavings: baseline.totalTCO - portnox.totalTCO,
      percentageSavings: ((baseline.totalTCO - portnox.totalTCO) / baseline.totalTCO) * 100,
      paybackDifference: baseline.paybackMonths - portnox.paybackMonths,
      roiDifference: portnox.roiPercentage - baseline.roiPercentage,
    }
  }, [chartData])

  // Risk-adjusted TCO
  const riskAdjustedData = useMemo(() => {
    return tcoResults
      .map((result) => {
        const vendor = enhancedVendorDatabase[result.vendor]
        if (!vendor) return null

        const riskReduction = vendor.security.breachRiskReduction / 100
        const avgBreachCost = 4500000 // Average breach cost
        const annualRiskSavings = avgBreachCost * 0.28 * riskReduction // 28% annual breach probability
        const totalRiskSavings = annualRiskSavings * projectionYears[0]

        return {
          vendor: result.vendorName,
          nominalTCO: result.total,
          riskAdjustedTCO: result.total - totalRiskSavings,
          riskSavings: totalRiskSavings,
          riskReduction: vendor.security.breachRiskReduction,
        }
      })
      .filter(Boolean)
  }, [tcoResults, projectionYears])

  // Vendor selection handlers
  const toggleVendor = (vendorId: string) => {
    setSelectedVendors((prev) => (prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]))
  }

  const availableVendors = Object.keys(enhancedVendorDatabase)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Configuration Panel */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Analysis Configuration
          </CardTitle>
          <CardDescription className="text-slate-400">Customize your TCO analysis parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Organization Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-white">Devices: {devices[0].toLocaleString()}</Label>
              <Slider value={devices} onValueChange={setDevices} max={10000} min={100} step={100} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Users: {users[0].toLocaleString()}</Label>
              <Slider value={users} onValueChange={setUsers} max={15000} min={150} step={50} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Industry</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="financial_services">Financial Services</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="energy_utilities">Energy & Utilities</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Projection Years: {projectionYears[0]}</Label>
              <Slider
                value={projectionYears}
                onValueChange={setProjectionYears}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Vendor Selection */}
          <div className="space-y-3">
            <Label className="text-white">Selected Vendors ({selectedVendors.length})</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {availableVendors.map((vendorId) => {
                const vendor = enhancedVendorDatabase[vendorId]
                const isSelected = selectedVendors.includes(vendorId)

                return (
                  <Button
                    key={vendorId}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleVendor(vendorId)}
                    className={`justify-start ${isSelected ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                  >
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: VENDOR_COLORS[vendorId] || "#64748B" }}
                    />
                    {vendor.name}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Analysis Options */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Switch id="hidden-costs" checked={includeHiddenCosts} onCheckedChange={setIncludeHiddenCosts} />
              <Label htmlFor="hidden-costs" className="text-white">
                Include Hidden Costs
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="risk-benefits" checked={includeRiskBenefits} onCheckedChange={setIncludeRiskBenefits} />
              <Label htmlFor="risk-benefits" className="text-white">
                Include Risk Benefits
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      {savingsAnalysis && (
        <Alert className="bg-emerald-500/10 border-emerald-500/30">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          <AlertDescription className="text-emerald-300">
            <strong>Key Finding:</strong> Portnox CLEAR offers ${savingsAnalysis.totalSavings.toLocaleString()}(
            {savingsAnalysis.percentageSavings.toFixed(1)}%) in savings compared to traditional NAC solutions, with{" "}
            {savingsAnalysis.paybackDifference} months faster payback period.
          </AlertDescription>
        </Alert>
      )}

      {/* Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="timeline">Timeline Analysis</TabsTrigger>
          <TabsTrigger value="risk-adjusted">Risk-Adjusted TCO</TabsTrigger>
          <TabsTrigger value="comparison">Vendor Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* TCO Overview Chart */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Total Cost of Ownership Overview</CardTitle>
              <CardDescription className="text-slate-400">
                {projectionYears[0]}-year TCO comparison for {devices[0].toLocaleString()} devices
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

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chartData.slice(0, 4).map((vendor, index) => (
              <motion.div
                key={vendor.vendor}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/30 border-slate-700/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-white flex items-center justify-between">
                      {vendor.name}
                      <Badge variant={index === 0 ? "default" : "secondary"}>
                        {index === 0 ? "Best" : `#${index + 1}`}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-2xl font-bold text-white">${vendor.totalTCO.toLocaleString()}</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Payback</span>
                        <span className="text-white">{vendor.paybackMonths} months</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">ROI</span>
                        <span className="text-emerald-400">{vendor.roiPercentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          {/* Stacked Cost Breakdown */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Detailed Cost Breakdown</CardTitle>
              <CardDescription className="text-slate-400">Cost components by vendor and category</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costBreakdownData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="vendor" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="software" stackId="a" fill="#00D4AA" name="Software" />
                  <Bar dataKey="implementation" stackId="a" fill="#1BA1E2" name="Implementation" />
                  <Bar dataKey="operations" stackId="a" fill="#FF6900" name="Operations" />
                  <Bar dataKey="support" stackId="a" fill="#EE3124" name="Support" />
                  <Bar dataKey="infrastructure" stackId="a" fill="#84BD00" name="Infrastructure" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cost Category Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-white">Cost Distribution</CardTitle>
                <CardDescription className="text-slate-400">Average cost allocation across vendors</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Software",
                          value: costBreakdownData.reduce((sum, d) => sum + d.software, 0) / costBreakdownData.length,
                          fill: "#00D4AA",
                        },
                        {
                          name: "Implementation",
                          value:
                            costBreakdownData.reduce((sum, d) => sum + d.implementation, 0) / costBreakdownData.length,
                          fill: "#1BA1E2",
                        },
                        {
                          name: "Operations",
                          value: costBreakdownData.reduce((sum, d) => sum + d.operations, 0) / costBreakdownData.length,
                          fill: "#FF6900",
                        },
                        {
                          name: "Support",
                          value: costBreakdownData.reduce((sum, d) => sum + d.support, 0) / costBreakdownData.length,
                          fill: "#EE3124",
                        },
                        {
                          name: "Infrastructure",
                          value:
                            costBreakdownData.reduce((sum, d) => sum + d.infrastructure, 0) / costBreakdownData.length,
                          fill: "#84BD00",
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    ></Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-white">Hidden Costs Analysis</CardTitle>
                <CardDescription className="text-slate-400">Often overlooked cost factors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Training & Certification</span>
                    <span className="text-sm font-medium text-white">$15K - $45K</span>
                  </div>
                  <Progress value={75} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Integration Complexity</span>
                    <span className="text-sm font-medium text-white">$25K - $85K</span>
                  </div>
                  <Progress value={60} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Downtime During Migration</span>
                    <span className="text-sm font-medium text-white">$10K - $150K</span>
                  </div>
                  <Progress value={90} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Ongoing Maintenance</span>
                    <span className="text-sm font-medium text-white">$20K - $75K/year</span>
                  </div>
                  <Progress value={55} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          {/* TCO Timeline */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">TCO Timeline Analysis</CardTitle>
              <CardDescription className="text-slate-400">
                Cumulative costs over {projectionYears[0]} years
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    {
                      year: "Year 1",
                      ...chartData.reduce((acc, vendor) => ({ ...acc, [vendor.vendor]: vendor.year1 }), {}),
                    },
                    {
                      year: "Year 2",
                      ...chartData.reduce((acc, vendor) => ({ ...acc, [vendor.vendor]: vendor.year2 }), {}),
                    },
                    {
                      year: "Year 3",
                      ...chartData.reduce((acc, vendor) => ({ ...acc, [vendor.vendor]: vendor.year3 }), {}),
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
                  <Legend />
                  {chartData.slice(0, 5).map((vendor, index) => (
                    <Area
                      key={vendor.vendor}
                      type="monotone"
                      dataKey={vendor.vendor}
                      stackId="1"
                      stroke={vendor.color}
                      fill={vendor.color}
                      fillOpacity={0.6}
                      name={vendor.name}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Payback Analysis */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Payback Period Analysis</CardTitle>
              <CardDescription className="text-slate-400">Time to recover initial investment</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
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
                    formatter={(value) => [`${value} months`, "Payback Period"]}
                  />
                  <Bar dataKey="paybackMonths" fill="#00D4AA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-adjusted" className="space-y-6">
          {/* Risk-Adjusted TCO */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Risk-Adjusted TCO Analysis</CardTitle>
              <CardDescription className="text-slate-400">
                TCO adjusted for security risk reduction benefits
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskAdjustedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="vendor" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="nominalTCO" fill="#64748B" name="Nominal TCO" />
                  <Bar dataKey="riskAdjustedTCO" fill="#00D4AA" name="Risk-Adjusted TCO" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Risk Reduction Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-white">Risk Reduction Impact</CardTitle>
                <CardDescription className="text-slate-400">Security risk reduction by vendor</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskAdjustedData}>
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
                    <Bar dataKey="riskReduction" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-white">Risk Savings Value</CardTitle>
                <CardDescription className="text-slate-400">Monetary value of risk reduction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskAdjustedData.slice(0, 4).map((vendor, index) => (
                  <div key={vendor.vendor} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white">{vendor.vendor}</span>
                      <span className="text-sm text-emerald-400">${vendor.riskSavings.toLocaleString()}</span>
                    </div>
                    <Progress
                      value={(vendor.riskSavings / Math.max(...riskAdjustedData.map((d) => d.riskSavings))) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          {/* Vendor Comparison Matrix */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Comprehensive Vendor Comparison</CardTitle>
              <CardDescription className="text-slate-400">
                Multi-dimensional analysis across key metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={[
                    {
                      metric: "Cost Efficiency",
                      portnox: 95,
                      cisco: 35,
                      aruba: 55,
                      fortinet: 65,
                      forescout: 45,
                    },
                    {
                      metric: "Security Score",
                      portnox: 95,
                      cisco: 85,
                      aruba: 82,
                      fortinet: 78,
                      forescout: 80,
                    },
                    {
                      metric: "Deployment Speed",
                      portnox: 95,
                      cisco: 25,
                      aruba: 45,
                      fortinet: 55,
                      forescout: 35,
                    },
                    {
                      metric: "Operational Efficiency",
                      portnox: 90,
                      cisco: 45,
                      aruba: 50,
                      fortinet: 55,
                      forescout: 48,
                    },
                    {
                      metric: "Compliance Coverage",
                      portnox: 92,
                      cisco: 78,
                      aruba: 75,
                      fortinet: 72,
                      forescout: 76,
                    },
                  ]}
                >
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" stroke="#9CA3AF" />
                  <PolarRadiusAxis stroke="#9CA3AF" />
                  <Radar name="Portnox" dataKey="portnox" stroke="#00D4AA" fill="#00D4AA" fillOpacity={0.3} />
                  <Radar name="Cisco ISE" dataKey="cisco" stroke="#1BA1E2" fill="#1BA1E2" fillOpacity={0.3} />
                  <Radar name="Aruba" dataKey="aruba" stroke="#FF6900" fill="#FF6900" fillOpacity={0.3} />
                  <Radar name="Fortinet" dataKey="fortinet" stroke="#EE3124" fill="#EE3124" fillOpacity={0.3} />
                  <Radar name="Forescout" dataKey="forescout" stroke="#00A651" fill="#00A651" fillOpacity={0.3} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Comparison Table */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Detailed Metrics Comparison</CardTitle>
              <CardDescription className="text-slate-400">Side-by-side comparison of key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-white">Vendor</th>
                      <th className="text-right py-3 px-4 text-white">Total TCO</th>
                      <th className="text-right py-3 px-4 text-white">Payback (months)</th>
                      <th className="text-right py-3 px-4 text-white">ROI %</th>
                      <th className="text-right py-3 px-4 text-white">Risk Reduction %</th>
                      <th className="text-center py-3 px-4 text-white">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.map((vendor, index) => (
                      <tr key={vendor.vendor} className="border-b border-slate-700/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vendor.color }} />
                            <span className="text-white font-medium">{vendor.name}</span>
                          </div>
                        </td>
                        <td className="text-right py-3 px-4 text-white">${vendor.totalTCO.toLocaleString()}</td>
                        <td className="text-right py-3 px-4 text-white">{vendor.paybackMonths}</td>
                        <td className="text-right py-3 px-4 text-emerald-400">{vendor.roiPercentage.toFixed(1)}%</td>
                        <td className="text-right py-3 px-4 text-blue-400">
                          {enhancedVendorDatabase[vendor.vendor]?.security.breachRiskReduction || 0}%
                        </td>
                        <td className="text-center py-3 px-4">
                          {index === 0 && <Badge className="bg-emerald-600">Recommended</Badge>}
                          {index === 1 && <Badge variant="secondary">Alternative</Badge>}
                          {index > 1 && <Badge variant="outline">Consider</Badge>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export Options */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-lg text-white">Export Analysis</CardTitle>
          <CardDescription className="text-slate-400">Generate reports and share findings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export PDF Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <FileText className="h-4 w-4" />
              Generate Executive Summary
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <BarChart3 className="h-4 w-4" />
              Export Raw Data
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Refresh Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default AdvancedTCOAnalyzer
