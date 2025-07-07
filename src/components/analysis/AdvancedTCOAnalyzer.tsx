"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
} from "recharts"
import { Calculator, DollarSign, Clock, Shield, Settings, Download, RefreshCw, BarChart3 } from "lucide-react"

// Enhanced TCO calculation with all cost factors
interface TCOFactors {
  software: number
  hardware: number
  implementation: number
  training: number
  maintenance: number
  support: number
  staffing: number
  downtime: number
  compliance: number
  security: number
  migration: number
  opportunity: number
}

interface VendorTCOData {
  id: string
  name: string
  type: "cloud" | "onprem" | "hybrid"
  baseCost: TCOFactors
  scalingFactor: number
  deploymentDays: number
  maintenanceMultiplier: number
  securityScore: number
  complianceScore: number
  riskReduction: number
  color: string
}

// Comprehensive vendor TCO data
const vendorTCOData: VendorTCOData[] = [
  {
    id: "portnox",
    name: "Portnox CLEAR",
    type: "cloud",
    baseCost: {
      software: 45000,
      hardware: 0,
      implementation: 15000,
      training: 8000,
      maintenance: 9000,
      support: 12000,
      staffing: 25000,
      downtime: 2000,
      compliance: 5000,
      security: 3000,
      migration: 10000,
      opportunity: 5000,
    },
    scalingFactor: 1.0,
    deploymentDays: 7,
    maintenanceMultiplier: 0.6,
    securityScore: 95,
    complianceScore: 92,
    riskReduction: 87,
    color: "#00D4AA",
  },
  {
    id: "cisco_ise",
    name: "Cisco ISE",
    type: "onprem",
    baseCost: {
      software: 85000,
      hardware: 45000,
      implementation: 65000,
      training: 25000,
      maintenance: 35000,
      support: 28000,
      staffing: 75000,
      downtime: 15000,
      compliance: 18000,
      security: 12000,
      migration: 35000,
      opportunity: 25000,
    },
    scalingFactor: 1.4,
    deploymentDays: 120,
    maintenanceMultiplier: 1.8,
    securityScore: 85,
    complianceScore: 88,
    riskReduction: 72,
    color: "#1BA0D7",
  },
  {
    id: "aruba_clearpass",
    name: "Aruba ClearPass",
    type: "hybrid",
    baseCost: {
      software: 65000,
      hardware: 25000,
      implementation: 45000,
      training: 18000,
      maintenance: 25000,
      support: 22000,
      staffing: 55000,
      downtime: 8000,
      compliance: 12000,
      security: 8000,
      migration: 25000,
      opportunity: 18000,
    },
    scalingFactor: 1.2,
    deploymentDays: 90,
    maintenanceMultiplier: 1.4,
    securityScore: 82,
    complianceScore: 85,
    riskReduction: 75,
    color: "#FF6900",
  },
  {
    id: "forescout",
    name: "Forescout",
    type: "hybrid",
    baseCost: {
      software: 95000,
      hardware: 35000,
      implementation: 55000,
      training: 22000,
      maintenance: 38000,
      support: 32000,
      staffing: 65000,
      downtime: 12000,
      compliance: 15000,
      security: 10000,
      migration: 30000,
      opportunity: 22000,
    },
    scalingFactor: 1.3,
    deploymentDays: 105,
    maintenanceMultiplier: 1.6,
    securityScore: 88,
    complianceScore: 90,
    riskReduction: 80,
    color: "#0066CC",
  },
  {
    id: "fortinac",
    name: "FortiNAC",
    type: "onprem",
    baseCost: {
      software: 55000,
      hardware: 28000,
      implementation: 38000,
      training: 15000,
      maintenance: 22000,
      support: 18000,
      staffing: 48000,
      downtime: 6000,
      compliance: 10000,
      security: 7000,
      migration: 20000,
      opportunity: 15000,
    },
    scalingFactor: 1.1,
    deploymentDays: 75,
    maintenanceMultiplier: 1.3,
    securityScore: 80,
    complianceScore: 82,
    riskReduction: 78,
    color: "#EE3124",
  },
]

// Organization size multipliers
const orgSizeMultipliers = {
  small: { multiplier: 0.6, devices: 500, users: 100 },
  medium: { multiplier: 1.0, devices: 2500, users: 500 },
  large: { multiplier: 2.2, devices: 10000, users: 2000 },
  enterprise: { multiplier: 4.5, devices: 25000, users: 5000 },
}

// Industry risk multipliers
const industryMultipliers = {
  healthcare: { risk: 1.8, compliance: 1.6, name: "Healthcare" },
  finance: { risk: 2.0, compliance: 1.8, name: "Financial Services" },
  government: { risk: 1.9, compliance: 1.9, name: "Government" },
  education: { risk: 1.2, compliance: 1.1, name: "Education" },
  manufacturing: { risk: 1.4, compliance: 1.3, name: "Manufacturing" },
  retail: { risk: 1.5, compliance: 1.2, name: "Retail" },
  technology: { risk: 1.3, compliance: 1.1, name: "Technology" },
}

const AdvancedTCOAnalyzer: React.FC = () => {
  // Configuration state
  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco_ise", "aruba_clearpass"])
  const [orgSize, setOrgSize] = useState<keyof typeof orgSizeMultipliers>("medium")
  const [industry, setIndustry] = useState<keyof typeof industryMultipliers>("technology")
  const [analysisYears, setAnalysisYears] = useState(5)
  const [includeRiskAdjustment, setIncludeRiskAdjustment] = useState(true)
  const [includeHiddenCosts, setIncludeHiddenCosts] = useState(true)
  const [customGrowthRate, setCustomGrowthRate] = useState(15)

  // Calculate TCO for each vendor
  const calculatedTCO = useMemo(() => {
    const orgMultiplier = orgSizeMultipliers[orgSize].multiplier
    const industryData = industryMultipliers[industry]

    return vendorTCOData
      .filter((vendor) => selectedVendors.includes(vendor.id))
      .map((vendor) => {
        const yearlyData = []
        let cumulativeCost = 0

        for (let year = 1; year <= analysisYears; year++) {
          // Base costs with scaling
          const scaledBaseCost = Object.entries(vendor.baseCost).reduce((acc, [key, value]) => {
            let adjustedValue = value * orgMultiplier * Math.pow(vendor.scalingFactor, year - 1)

            // Apply industry multipliers
            if (key === "compliance") {
              adjustedValue *= industryData.compliance
            }
            if (key === "security" || key === "downtime") {
              adjustedValue *= industryData.risk
            }

            // Apply maintenance multiplier for ongoing costs
            if (["maintenance", "support", "staffing"].includes(key) && year > 1) {
              adjustedValue *= vendor.maintenanceMultiplier
            }

            // Hide certain costs if hidden costs are disabled
            if (!includeHiddenCosts && ["opportunity", "migration", "downtime"].includes(key)) {
              adjustedValue = 0
            }

            return acc + adjustedValue
          }, 0)

          // Risk adjustment
          let riskAdjustedCost = scaledBaseCost
          if (includeRiskAdjustment) {
            const riskFactor = (100 - vendor.riskReduction) / 100
            const potentialBreachCost = 500000 * industryData.risk * orgMultiplier
            riskAdjustedCost += potentialBreachCost * riskFactor * 0.1 // 10% annual probability
          }

          cumulativeCost += riskAdjustedCost

          yearlyData.push({
            year,
            yearlyCost: Math.round(riskAdjustedCost),
            cumulativeCost: Math.round(cumulativeCost),
            vendor: vendor.name,
            vendorId: vendor.id,
            color: vendor.color,
          })
        }

        return {
          vendor: vendor.name,
          vendorId: vendor.id,
          type: vendor.type,
          totalTCO: Math.round(cumulativeCost),
          deploymentDays: vendor.deploymentDays,
          securityScore: vendor.securityScore,
          complianceScore: vendor.complianceScore,
          riskReduction: vendor.riskReduction,
          color: vendor.color,
          yearlyData,
          breakdown: Object.entries(vendor.baseCost).reduce(
            (acc, [key, value]) => {
              acc[key] = Math.round(value * orgMultiplier * analysisYears)
              return acc
            },
            {} as Record<string, number>,
          ),
        }
      })
  }, [selectedVendors, orgSize, industry, analysisYears, includeRiskAdjustment, includeHiddenCosts])

  // Prepare chart data
  const timelineData = useMemo(() => {
    const years = Array.from({ length: analysisYears }, (_, i) => i + 1)
    return years.map((year) => {
      const yearData: any = { year }
      calculatedTCO.forEach((vendor) => {
        const yearInfo = vendor.yearlyData.find((d) => d.year === year)
        yearData[vendor.vendorId] = yearInfo?.cumulativeCost || 0
      })
      return yearData
    })
  }, [calculatedTCO, analysisYears])

  const comparisonData = calculatedTCO.map((vendor) => ({
    name: vendor.vendor,
    totalTCO: vendor.totalTCO,
    deployment: vendor.deploymentDays,
    security: vendor.securityScore,
    compliance: vendor.complianceScore,
    risk: 100 - vendor.riskReduction,
    color: vendor.color,
  }))

  // Calculate savings vs baseline (Cisco ISE)
  const baselineVendor = calculatedTCO.find((v) => v.vendorId === "cisco_ise")
  const portnoxVendor = calculatedTCO.find((v) => v.vendorId === "portnox")

  let savings = 0
  let savingsPercent = 0
  if (baselineVendor && portnoxVendor) {
    savings = baselineVendor.totalTCO - portnoxVendor.totalTCO
    savingsPercent = (savings / baselineVendor.totalTCO) * 100
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 mb-4">
          Advanced TCO Analyzer
        </h1>
        <p className="text-lg text-slate-300 max-w-4xl mx-auto">
          Comprehensive Total Cost of Ownership analysis with risk adjustment, hidden costs, and industry-specific
          factors.
        </p>
      </div>

      {/* Configuration Panel */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Analysis Configuration
          </CardTitle>
          <CardDescription>Configure your analysis parameters for accurate TCO calculations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Organization Size</Label>
              <Select value={orgSize} onValueChange={(value: keyof typeof orgSizeMultipliers) => setOrgSize(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (500 devices)</SelectItem>
                  <SelectItem value="medium">Medium (2,500 devices)</SelectItem>
                  <SelectItem value="large">Large (10,000 devices)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (25,000+ devices)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Industry</Label>
              <Select value={industry} onValueChange={(value: keyof typeof industryMultipliers) => setIndustry(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(industryMultipliers).map(([key, data]) => (
                    <SelectItem key={key} value={key}>
                      {data.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Analysis Period</Label>
              <Select
                value={analysisYears.toString()}
                onValueChange={(value) => setAnalysisYears(Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Years</SelectItem>
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="7">7 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Growth Rate (%)</Label>
              <Input
                type="number"
                value={customGrowthRate}
                onChange={(e) => setCustomGrowthRate(Number.parseInt(e.target.value) || 0)}
                min="0"
                max="50"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="risk-adjustment" checked={includeRiskAdjustment} onCheckedChange={setIncludeRiskAdjustment} />
              <Label htmlFor="risk-adjustment">Include Risk Adjustment</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="hidden-costs" checked={includeHiddenCosts} onCheckedChange={setIncludeHiddenCosts} />
              <Label htmlFor="hidden-costs">Include Hidden Costs</Label>
            </div>
          </div>

          {/* Vendor Selection */}
          <div className="space-y-2">
            <Label>Select Vendors for Analysis</Label>
            <div className="flex flex-wrap gap-2">
              {vendorTCOData.map((vendor) => (
                <Badge
                  key={vendor.id}
                  variant={selectedVendors.includes(vendor.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  style={selectedVendors.includes(vendor.id) ? { backgroundColor: vendor.color } : {}}
                  onClick={() => {
                    if (selectedVendors.includes(vendor.id)) {
                      setSelectedVendors(selectedVendors.filter((v) => v !== vendor.id))
                    } else {
                      setSelectedVendors([...selectedVendors, vendor.id])
                    }
                  }}
                >
                  {vendor.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      {portnoxVendor && baselineVendor && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Total Savings</p>
                  <p className="text-2xl font-bold text-white">${(savings / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-slate-400">{savingsPercent.toFixed(0)}% reduction</p>
                </div>
                <DollarSign className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Portnox TCO</p>
                  <p className="text-2xl font-bold text-white">${(portnoxVendor.totalTCO / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-slate-400">{analysisYears}-year total</p>
                </div>
                <Calculator className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Deployment Speed</p>
                  <p className="text-2xl font-bold text-white">{portnoxVendor.deploymentDays}d</p>
                  <p className="text-xs text-slate-400">vs {baselineVendor.deploymentDays}d baseline</p>
                </div>
                <Clock className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-400/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Risk Reduction</p>
                  <p className="text-2xl font-bold text-white">{portnoxVendor.riskReduction}%</p>
                  <p className="text-xs text-slate-400">Security improvement</p>
                </div>
                <Shield className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analysis Tabs */}
      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">TCO Timeline</TabsTrigger>
          <TabsTrigger value="comparison">Vendor Comparison</TabsTrigger>
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle>Cumulative TCO Timeline</CardTitle>
              <CardDescription>Total cost of ownership progression over {analysisYears} years</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="year" stroke="#9CA3AF" tickFormatter={(value) => `Year ${value}`} />
                  <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Cumulative TCO"]}
                  />
                  <Legend />
                  {calculatedTCO.map((vendor) => (
                    <Line
                      key={vendor.vendorId}
                      type="monotone"
                      dataKey={vendor.vendorId}
                      stroke={vendor.color}
                      strokeWidth={3}
                      name={vendor.vendor}
                      dot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle>Vendor TCO Comparison</CardTitle>
              <CardDescription>Side-by-side comparison of total costs and key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="name"
                    stroke="#9CA3AF"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis yAxisId="left" stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="totalTCO" fill="#3B82F6" name="Total TCO" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="security"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Security Score"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {calculatedTCO.map((vendor) => (
              <Card key={vendor.vendorId} className="bg-slate-800/30 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: vendor.color }} />
                    {vendor.vendor} Cost Breakdown
                  </CardTitle>
                  <CardDescription>Detailed cost analysis over {analysisYears} years</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(vendor.breakdown)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 6)
                      .map(([category, cost]) => (
                        <div key={category} className="flex justify-between items-center">
                          <span className="text-sm text-slate-300 capitalize">
                            {category.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <span className="font-semibold text-white">${cost.toLocaleString()}</span>
                        </div>
                      ))}
                    <div className="border-t border-slate-600 pt-2 mt-2">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-white">Total TCO</span>
                        <span className="text-white">${vendor.totalTCO.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle>Risk vs Cost Analysis</CardTitle>
                <CardDescription>Security risk exposure relative to total investment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {calculatedTCO.map((vendor) => {
                    const riskLevel = 100 - vendor.riskReduction
                    const riskColor =
                      riskLevel < 20 ? "text-green-400" : riskLevel < 40 ? "text-yellow-400" : "text-red-400"

                    return (
                      <div key={vendor.vendorId} className="p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vendor.color }} />
                            <span className="font-semibold text-white">{vendor.vendor}</span>
                          </div>
                          <Badge variant="outline" className={riskColor}>
                            {riskLevel}% Risk
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-slate-400">Total Cost</p>
                            <p className="font-semibold text-white">${(vendor.totalTCO / 1000).toFixed(0)}K</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Security Score</p>
                            <p className="font-semibold text-white">{vendor.securityScore}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Compliance</p>
                            <p className="font-semibold text-white">{vendor.complianceScore}%</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle>Implementation Analysis</CardTitle>
                <CardDescription>Deployment timeline and operational impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {calculatedTCO.map((vendor) => (
                    <div key={vendor.vendorId} className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vendor.color }} />
                          <span className="font-semibold text-white">{vendor.vendor}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            vendor.deploymentDays <= 30
                              ? "text-green-400"
                              : vendor.deploymentDays <= 90
                                ? "text-yellow-400"
                                : "text-red-400"
                          }
                        >
                          {vendor.deploymentDays} days
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-400">Architecture</p>
                          <p className="font-semibold text-white capitalize">{vendor.type}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Complexity</p>
                          <p className="font-semibold text-white">
                            {vendor.deploymentDays <= 30 ? "Low" : vendor.deploymentDays <= 90 ? "Medium" : "High"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Export and Actions */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Analysis Complete</h3>
              <p className="text-sm text-slate-400">Export your TCO analysis or configure additional scenarios</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Recalculate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdvancedTCOAnalyzer
