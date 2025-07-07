"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
} from "recharts"
import { DollarSign, Shield, Clock, AlertTriangle, BarChart3, Settings, Download, RefreshCw } from "lucide-react"

// Enhanced vendor data with all 14 vendors
const comprehensiveVendorData = {
  portnox: {
    name: "Portnox CLEAR",
    type: "Cloud-Native",
    deploymentDays: 7,
    tcoReduction: 67,
    securityScore: 95,
    complianceScore: 92,
    operationalEfficiency: 88,
    riskReduction: 87,
    color: "#00D4AA",
  },
  cisco_ise: {
    name: "Cisco ISE",
    type: "On-Premise",
    deploymentDays: 120,
    tcoReduction: 0,
    securityScore: 85,
    complianceScore: 88,
    operationalEfficiency: 65,
    riskReduction: 72,
    color: "#1BA0D7",
  },
  aruba_clearpass: {
    name: "Aruba ClearPass",
    type: "Hybrid",
    deploymentDays: 90,
    tcoReduction: -15,
    securityScore: 82,
    complianceScore: 85,
    operationalEfficiency: 70,
    riskReduction: 75,
    color: "#FF6900",
  },
  fortinac: {
    name: "FortiNAC",
    type: "On-Premise",
    deploymentDays: 75,
    tcoReduction: -8,
    securityScore: 80,
    complianceScore: 82,
    operationalEfficiency: 72,
    riskReduction: 78,
    color: "#EE3124",
  },
  forescout: {
    name: "Forescout",
    type: "Hybrid",
    deploymentDays: 105,
    tcoReduction: -25,
    securityScore: 88,
    complianceScore: 90,
    operationalEfficiency: 68,
    riskReduction: 80,
    color: "#0066CC",
  },
  extreme_nac: {
    name: "Extreme NAC",
    type: "On-Premise",
    deploymentDays: 85,
    tcoReduction: -12,
    securityScore: 78,
    complianceScore: 80,
    operationalEfficiency: 69,
    riskReduction: 74,
    color: "#662D91",
  },
  juniper_nac: {
    name: "Juniper NAC",
    type: "On-Premise",
    deploymentDays: 95,
    tcoReduction: -18,
    securityScore: 79,
    complianceScore: 83,
    operationalEfficiency: 67,
    riskReduction: 76,
    color: "#84BD00",
  },
  microsoft_nps: {
    name: "Microsoft NPS",
    type: "On-Premise",
    deploymentDays: 60,
    tcoReduction: 15,
    securityScore: 70,
    complianceScore: 75,
    operationalEfficiency: 75,
    riskReduction: 65,
    color: "#00BCF2",
  },
  packetfence: {
    name: "PacketFence",
    type: "Open Source",
    deploymentDays: 45,
    tcoReduction: 35,
    securityScore: 72,
    complianceScore: 70,
    operationalEfficiency: 60,
    riskReduction: 68,
    color: "#2E8B57",
  },
  arista_nac: {
    name: "Arista NAC",
    type: "On-Premise",
    deploymentDays: 80,
    tcoReduction: -10,
    securityScore: 81,
    complianceScore: 84,
    operationalEfficiency: 71,
    riskReduction: 77,
    color: "#FF4500",
  },
  securew2: {
    name: "SecureW2",
    type: "Cloud",
    deploymentDays: 30,
    tcoReduction: 20,
    securityScore: 76,
    complianceScore: 78,
    operationalEfficiency: 78,
    riskReduction: 70,
    color: "#4169E1",
  },
  radiusaas: {
    name: "RADIUSaaS",
    type: "Cloud",
    deploymentDays: 21,
    tcoReduction: 25,
    securityScore: 74,
    complianceScore: 76,
    operationalEfficiency: 80,
    riskReduction: 69,
    color: "#32CD32",
  },
  foxpass: {
    name: "Foxpass",
    type: "Cloud",
    deploymentDays: 14,
    tcoReduction: 30,
    securityScore: 73,
    complianceScore: 74,
    operationalEfficiency: 82,
    riskReduction: 67,
    color: "#FF69B4",
  },
  cisco_meraki: {
    name: "Cisco Meraki",
    type: "Cloud",
    deploymentDays: 35,
    tcoReduction: 10,
    securityScore: 77,
    complianceScore: 79,
    operationalEfficiency: 76,
    riskReduction: 71,
    color: "#00A651",
  },
}

// TCO Analysis data
const tcoAnalysisData = Object.entries(comprehensiveVendorData).map(([key, vendor]) => ({
  vendor: vendor.name,
  year1: Math.round(250000 * (1 - vendor.tcoReduction / 100) * 0.4),
  year3: Math.round(250000 * (1 - vendor.tcoReduction / 100) * 1.2),
  year5: Math.round(250000 * (1 - vendor.tcoReduction / 100) * 2.0),
  deployment: vendor.deploymentDays,
  efficiency: vendor.operationalEfficiency,
  color: vendor.color,
}))

// Risk vs Cost positioning data
const riskCostData = Object.entries(comprehensiveVendorData).map(([key, vendor]) => ({
  name: vendor.name,
  risk: 100 - vendor.riskReduction,
  cost: Math.round(250000 * (1 - vendor.tcoReduction / 100)),
  security: vendor.securityScore,
  type: vendor.type,
  color: vendor.color,
}))

// Compliance coverage data
const complianceData = Object.entries(comprehensiveVendorData).map(([key, vendor]) => ({
  vendor: vendor.name,
  sox: vendor.complianceScore * 0.95,
  pci: vendor.complianceScore * 0.98,
  hipaa: vendor.complianceScore * 0.92,
  gdpr: vendor.complianceScore * 0.96,
  nist: vendor.complianceScore * 0.94,
  iso27001: vendor.complianceScore * 0.97,
  color: vendor.color,
}))

const ComprehensiveAnalysisDashboard: React.FC = () => {
  const [selectedVendors, setSelectedVendors] = useState<string[]>([
    "portnox",
    "cisco_ise",
    "aruba_clearpass",
    "forescout",
  ])
  const [analysisType, setAnalysisType] = useState("tco")
  const [timeframe, setTimeframe] = useState(5)
  const [includeHiddenCosts, setIncludeHiddenCosts] = useState(true)
  const [riskAdjusted, setRiskAdjusted] = useState(true)

  const filteredTcoData = tcoAnalysisData.filter((item) =>
    selectedVendors.some(
      (vendorKey) => comprehensiveVendorData[vendorKey as keyof typeof comprehensiveVendorData]?.name === item.vendor,
    ),
  )

  const filteredRiskData = riskCostData.filter((item) =>
    selectedVendors.some(
      (vendorKey) => comprehensiveVendorData[vendorKey as keyof typeof comprehensiveVendorData]?.name === item.name,
    ),
  )

  const filteredComplianceData = complianceData.filter((item) =>
    selectedVendors.some(
      (vendorKey) => comprehensiveVendorData[vendorKey as keyof typeof comprehensiveVendorData]?.name === item.vendor,
    ),
  )

  // Calculate key metrics
  const portnoxData = comprehensiveVendorData.portnox
  const avgCompetitorTCO =
    tcoAnalysisData.filter((item) => item.vendor !== portnoxData.name).reduce((acc, curr) => acc + curr.year5, 0) /
    (tcoAnalysisData.length - 1)

  const portnoxTCO = tcoAnalysisData.find((item) => item.vendor === portnoxData.name)?.year5 || 0
  const savings = avgCompetitorTCO - portnoxTCO
  const savingsPercent = (savings / avgCompetitorTCO) * 100

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-4">
          Comprehensive NAC Analysis Suite
        </h1>
        <p className="text-lg text-slate-300 max-w-4xl mx-auto">
          Advanced analytics across all 14 major NAC vendors with TCO analysis, risk assessment, compliance mapping, and
          operational efficiency metrics.
        </p>
      </div>

      {/* Configuration Panel */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Analysis Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Analysis Timeframe</Label>
              <Select value={timeframe.toString()} onValueChange={(value) => setTimeframe(Number.parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Years</SelectItem>
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="7">7 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Analysis Type</Label>
              <Select value={analysisType} onValueChange={setAnalysisType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tco">TCO Analysis</SelectItem>
                  <SelectItem value="risk">Risk Assessment</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="hidden-costs" checked={includeHiddenCosts} onCheckedChange={setIncludeHiddenCosts} />
              <Label htmlFor="hidden-costs">Include Hidden Costs</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="risk-adjusted" checked={riskAdjusted} onCheckedChange={setRiskAdjusted} />
              <Label htmlFor="risk-adjusted">Risk-Adjusted TCO</Label>
            </div>
          </div>

          {/* Vendor Selection */}
          <div className="space-y-2">
            <Label>Selected Vendors for Comparison</Label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(comprehensiveVendorData).map(([key, vendor]) => (
                <Badge
                  key={key}
                  variant={selectedVendors.includes(key) ? "default" : "outline"}
                  className="cursor-pointer"
                  style={selectedVendors.includes(key) ? { backgroundColor: vendor.color } : {}}
                  onClick={() => {
                    if (selectedVendors.includes(key)) {
                      setSelectedVendors(selectedVendors.filter((v) => v !== key))
                    } else if (selectedVendors.length < 6) {
                      setSelectedVendors([...selectedVendors, key])
                    }
                  }}
                >
                  {vendor.name}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-slate-400">Select up to 6 vendors for comparison</p>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Portnox Advantage</p>
                <p className="text-2xl font-bold text-white">{savingsPercent.toFixed(0)}%</p>
                <p className="text-xs text-slate-400">TCO Reduction</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Deployment Speed</p>
                <p className="text-2xl font-bold text-white">{portnoxData.deploymentDays}</p>
                <p className="text-xs text-slate-400">Days vs 90+ avg</p>
              </div>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Security Score</p>
                <p className="text-2xl font-bold text-white">{portnoxData.securityScore}</p>
                <p className="text-xs text-slate-400">Industry Leading</p>
              </div>
              <Shield className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-400/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Risk Reduction</p>
                <p className="text-2xl font-bold text-white">{portnoxData.riskReduction}%</p>
                <p className="text-xs text-slate-400">Breach Prevention</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs defaultValue="tco-comparison" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="tco-comparison">TCO Analysis</TabsTrigger>
          <TabsTrigger value="risk-assessment">Risk vs Cost</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="market-position">Market Position</TabsTrigger>
        </TabsList>

        <TabsContent value="tco-comparison" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle>Total Cost of Ownership Comparison</CardTitle>
              <CardDescription>{timeframe}-Year TCO Analysis Across Selected Vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={filteredTcoData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="vendor"
                    stroke="#9CA3AF"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "TCO"]}
                  />
                  <Legend />
                  <Bar dataKey="year1" fill="#3B82F6" name="Year 1" />
                  <Bar dataKey="year3" fill="#10B981" name="Year 3" />
                  <Bar dataKey="year5" fill="#F59E0B" name="Year 5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-assessment" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle>Risk vs Cost Positioning</CardTitle>
              <CardDescription>Security risk exposure vs total cost of ownership</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={filteredRiskData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    type="number"
                    dataKey="cost"
                    name="Cost"
                    stroke="#9CA3AF"
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  />
                  <YAxis
                    type="number"
                    dataKey="risk"
                    name="Risk"
                    stroke="#9CA3AF"
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number, name: string) => [
                      name === "cost" ? `$${value.toLocaleString()}` : `${value}%`,
                      name === "cost" ? "Total Cost" : "Risk Level",
                    ]}
                  />
                  {filteredRiskData.map((entry, index) => (
                    <Scatter key={entry.name} data={[entry]} fill={entry.color} name={entry.name} />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle>Compliance Framework Coverage</CardTitle>
              <CardDescription>Coverage percentage across major compliance standards</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={filteredComplianceData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="vendor" tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#9CA3AF" }} />
                  <Radar name="SOX" dataKey="sox" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                  <Radar name="PCI-DSS" dataKey="pci" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                  <Radar name="HIPAA" dataKey="hipaa" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} />
                  <Radar name="GDPR" dataKey="gdpr" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle>Deployment Timeline</CardTitle>
                <CardDescription>Average deployment time in days</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filteredTcoData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9CA3AF" />
                    <YAxis type="category" dataKey="vendor" stroke="#9CA3AF" tick={{ fontSize: 10 }} width={100} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value} days`, "Deployment Time"]}
                    />
                    <Bar dataKey="deployment" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle>Operational Efficiency</CardTitle>
                <CardDescription>Efficiency score based on automation and management overhead</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filteredTcoData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="vendor"
                      stroke="#9CA3AF"
                      tick={{ fontSize: 10 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, "Efficiency Score"]}
                    />
                    <Bar dataKey="efficiency" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="market-position" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle>Market Positioning Analysis</CardTitle>
              <CardDescription>Vendor positioning by deployment type and market approach</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {["Cloud-Native", "Cloud", "Hybrid", "On-Premise", "Open Source"].map((type) => {
                  const vendors = Object.values(comprehensiveVendorData).filter((v) => v.type === type)
                  return (
                    <div key={type} className="p-4 bg-slate-700/30 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">{type}</h4>
                      <p className="text-2xl font-bold text-cyan-400">{vendors.length}</p>
                      <p className="text-xs text-slate-400">Vendors</p>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-4">
                {Object.entries(comprehensiveVendorData)
                  .filter(([key]) => selectedVendors.includes(key))
                  .map(([key, vendor]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-slate-700/20 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: vendor.color }} />
                        <div>
                          <h4 className="font-semibold text-white">{vendor.name}</h4>
                          <p className="text-sm text-slate-400">{vendor.type}</p>
                        </div>
                      </div>
                      <div className="flex space-x-6 text-sm">
                        <div className="text-center">
                          <p className="text-white font-semibold">{vendor.securityScore}</p>
                          <p className="text-slate-400">Security</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white font-semibold">{vendor.deploymentDays}d</p>
                          <p className="text-slate-400">Deploy</p>
                        </div>
                        <div className="text-center">
                          <p className={`font-semibold ${vendor.tcoReduction > 0 ? "text-green-400" : "text-red-400"}`}>
                            {vendor.tcoReduction > 0 ? "+" : ""}
                            {vendor.tcoReduction}%
                          </p>
                          <p className="text-slate-400">TCO</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export Options */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Export Analysis</h3>
              <p className="text-sm text-slate-400">Download comprehensive reports and data</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ComprehensiveAnalysisDashboard
