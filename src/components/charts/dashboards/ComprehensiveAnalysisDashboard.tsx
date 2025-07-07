"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { DollarSign, Shield, Clock, Download, Filter, Settings, BarChart3, Activity } from "lucide-react"
import type { VendorId } from "@/hooks/useVendorData"
import { cn } from "@/lib/utils"

// Comprehensive vendor analysis data
const comprehensiveVendorData = [
  {
    id: "portnox",
    name: "Portnox CLEAR",
    tco5Year: 485000,
    deploymentDays: 7,
    securityScore: 95,
    complianceScore: 92,
    riskReduction: 98,
    marketPosition: { x: 95, y: 15 }, // High capability, low complexity
    deploymentType: "Cloud-Native",
    category: "Zero Trust Leader",
  },
  {
    id: "cisco_ise",
    name: "Cisco ISE",
    tco5Year: 1250000,
    deploymentDays: 120,
    securityScore: 88,
    complianceScore: 85,
    riskReduction: 85,
    marketPosition: { x: 85, y: 85 },
    deploymentType: "On-Premise",
    category: "Enterprise Legacy",
  },
  {
    id: "aruba_clearpass",
    name: "Aruba ClearPass",
    tco5Year: 950000,
    deploymentDays: 90,
    securityScore: 82,
    complianceScore: 80,
    riskReduction: 80,
    marketPosition: { x: 80, y: 70 },
    deploymentType: "Hybrid",
    category: "Enterprise Legacy",
  },
  {
    id: "fortinac",
    name: "FortiNAC",
    tco5Year: 875000,
    deploymentDays: 75,
    securityScore: 78,
    complianceScore: 75,
    riskReduction: 75,
    marketPosition: { x: 75, y: 60 },
    deploymentType: "On-Premise",
    category: "Security Focused",
  },
  {
    id: "forescout",
    name: "Forescout",
    tco5Year: 1100000,
    deploymentDays: 105,
    securityScore: 85,
    complianceScore: 82,
    riskReduction: 82,
    marketPosition: { x: 82, y: 80 },
    deploymentType: "On-Premise",
    category: "Visibility Leader",
  },
]

const COLORS = ["#00D4AA", "#FF6B35", "#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"]

interface ComprehensiveAnalysisDashboardProps {
  selectedVendors?: VendorId[]
  analysisType?: "tco" | "security" | "deployment" | "comprehensive"
}

const ComprehensiveAnalysisDashboard: React.FC<ComprehensiveAnalysisDashboardProps> = ({
  selectedVendors = ["portnox", "cisco_ise", "aruba_clearpass"],
  analysisType = "comprehensive",
}) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedMetric, setSelectedMetric] = useState("tco")
  const [filterByCategory, setFilterByCategory] = useState<string[]>([])
  const [deploymentTypeFilter, setDeploymentTypeFilter] = useState<string[]>([])

  const filteredData = useMemo(() => {
    return comprehensiveVendorData.filter((vendor) => {
      const categoryMatch = filterByCategory.length === 0 || filterByCategory.includes(vendor.category)
      const deploymentMatch = deploymentTypeFilter.length === 0 || deploymentTypeFilter.includes(vendor.deploymentType)
      const vendorMatch = selectedVendors.includes(vendor.id as VendorId)
      return categoryMatch && deploymentMatch && vendorMatch
    })
  }, [filterByCategory, deploymentTypeFilter, selectedVendors])

  const tcoComparisonData = filteredData.map((vendor) => ({
    name: vendor.name,
    tco: vendor.tco5Year,
    savings: vendor.id === "portnox" ? 0 : vendor.tco5Year - 485000,
    savingsPercent: vendor.id === "portnox" ? 0 : ((vendor.tco5Year - 485000) / vendor.tco5Year) * 100,
  }))

  const securityRadarData = [
    { subject: "Zero Trust", portnox: 95, cisco: 75, aruba: 70 },
    { subject: "Threat Detection", portnox: 92, cisco: 85, aruba: 78 },
    { subject: "Policy Enforcement", portnox: 98, cisco: 88, aruba: 82 },
    { subject: "Risk Assessment", portnox: 94, cisco: 80, aruba: 75 },
    { subject: "Compliance", portnox: 92, cisco: 85, aruba: 80 },
    { subject: "Automation", portnox: 96, cisco: 70, aruba: 65 },
  ]

  const deploymentComparisonData = filteredData.map((vendor) => ({
    name: vendor.name,
    days: vendor.deploymentDays,
    complexity: vendor.marketPosition.y,
    type: vendor.deploymentType,
  }))

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            Comprehensive NAC Analysis Suite
          </h1>
          <p className="text-muted-foreground mt-2">
            Deep-dive analysis across all major NAC vendors with advanced metrics and comparisons
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

      {/* Filters */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Filter className="mr-2 h-5 w-5" />
            Analysis Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Vendor Category</label>
              <div className="space-y-2">
                {["Zero Trust Leader", "Enterprise Legacy", "Security Focused", "Visibility Leader"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filterByCategory.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilterByCategory([...filterByCategory, category])
                        } else {
                          setFilterByCategory(filterByCategory.filter((c) => c !== category))
                        }
                      }}
                    />
                    <label htmlFor={category} className="text-sm text-slate-300">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Deployment Type</label>
              <div className="space-y-2">
                {["Cloud-Native", "On-Premise", "Hybrid"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={deploymentTypeFilter.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setDeploymentTypeFilter([...deploymentTypeFilter, type])
                        } else {
                          setDeploymentTypeFilter(deploymentTypeFilter.filter((t) => t !== type))
                        }
                      }}
                    />
                    <label htmlFor={type} className="text-sm text-slate-300">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Primary Metric</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tco">Total Cost of Ownership</SelectItem>
                  <SelectItem value="security">Security Score</SelectItem>
                  <SelectItem value="deployment">Deployment Speed</SelectItem>
                  <SelectItem value="risk">Risk Reduction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tco-analysis" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            TCO Analysis
          </TabsTrigger>
          <TabsTrigger value="security-metrics" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="deployment" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Deployment
          </TabsTrigger>
          <TabsTrigger value="market-position" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Market Position
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredData.map((vendor, index) => (
              <Card key={vendor.id} className="bg-slate-800/30 border-slate-700/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white flex items-center justify-between">
                    {vendor.name}
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        vendor.id === "portnox" ? "border-green-400 text-green-300" : "border-slate-400 text-slate-300",
                      )}
                    >
                      {vendor.category}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">5-Year TCO</span>
                    <span className="font-semibold text-white">${(vendor.tco5Year / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Deployment</span>
                    <span className="font-semibold text-white">{vendor.deploymentDays} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Security Score</span>
                    <span className="font-semibold text-white">{vendor.securityScore}/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Risk Reduction</span>
                    <span className="font-semibold text-white">{vendor.riskReduction}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Comparison Chart */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Quick Comparison - 5-Year TCO</CardTitle>
              <CardDescription>Total cost of ownership comparison across selected vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tcoComparisonData}>
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
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "TCO"]}
                  />
                  <Bar dataKey="tco" fill="#00D4AA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TCO Analysis Tab */}
        <TabsContent value="tco-analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">TCO Breakdown</CardTitle>
                <CardDescription>5-year total cost comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={tcoComparisonData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <YAxis type="category" dataKey="name" stroke="#9CA3AF" width={120} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "TCO"]}
                    />
                    <Bar dataKey="tco" fill="#00D4AA" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Cost Savings Analysis</CardTitle>
                <CardDescription>Savings compared to Portnox CLEAR</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tcoComparisonData
                    .filter((v) => v.name !== "Portnox CLEAR")
                    .map((vendor, index) => (
                      <div key={vendor.name} className="p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-white">{vendor.name}</span>
                          <Badge variant="destructive" className="bg-red-500/20 text-red-300">
                            +${(vendor.savings / 1000).toFixed(0)}K
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-400">
                          {vendor.savingsPercent.toFixed(0)}% more expensive than Portnox
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Metrics Tab */}
        <TabsContent value="security-metrics" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Security Capabilities Radar</CardTitle>
              <CardDescription>Comprehensive security feature comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={securityRadarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#9CA3AF", fontSize: 10 }} />
                  <Radar
                    name="Portnox"
                    dataKey="portnox"
                    stroke="#00D4AA"
                    fill="#00D4AA"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Cisco ISE"
                    dataKey="cisco"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Aruba"
                    dataKey="aruba"
                    stroke="#F59E0B"
                    fill="#F59E0B"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deployment Tab */}
        <TabsContent value="deployment" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Deployment Time Comparison</CardTitle>
              <CardDescription>Time to full deployment across vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={deploymentComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" label={{ value: "Days", angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                    formatter={(value: number) => [`${value} days`, "Deployment Time"]}
                  />
                  <Bar dataKey="days" fill="#00D4AA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Market Position Tab */}
        <TabsContent value="market-position" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Market Positioning Analysis</CardTitle>
              <CardDescription>Capability vs Complexity positioning</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Capability Score"
                    domain={[60, 100]}
                    stroke="#9CA3AF"
                    label={{ value: "Capability Score", position: "insideBottom", offset: -10 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Complexity Score"
                    domain={[0, 100]}
                    stroke="#9CA3AF"
                    label={{ value: "Implementation Complexity", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                    formatter={(value: number, name: string) => [value, name === "x" ? "Capability" : "Complexity"]}
                  />
                  <Scatter
                    name="Vendors"
                    data={filteredData.map((v) => ({ ...v.marketPosition, name: v.name }))}
                    fill="#00D4AA"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ComprehensiveAnalysisDashboard
