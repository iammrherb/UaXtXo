"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { CheckCircle, XCircle, Award } from "lucide-react"
import { COMPREHENSIVE_VENDOR_DATA } from "@/lib/vendors/comprehensive-vendor-data"
import { calculateComprehensiveTCO } from "@/lib/calculators/comprehensive-tco-calculator"

interface VendorComparisonMatrixProps {
  selectedVendors?: string[]
  onVendorSelectionChange?: (vendors: string[]) => void
}

// Vendor scorecard component
export function VendorScorecard({
  vendorId,
  config = {
    deviceCount: 500,
    industry: "HEALTHCARE",
    timeframe: 3,
    deploymentModel: "CLOUD",
    complianceRequirements: [],
  },
}: {
  vendorId: string
  config?: any
}) {
  const vendor = COMPREHENSIVE_VENDOR_DATA[vendorId]
  const tcoResult = calculateComprehensiveTCO(vendorId, config)

  if (!vendor || !tcoResult) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Vendor data not available</div>
        </CardContent>
      </Card>
    )
  }

  const overallScore = Math.round(
    tcoResult.security.overallScore * 0.3 +
      (100 - tcoResult.totalCost / 50000) * 0.25 +
      (100 - tcoResult.implementation.timeline / 3.65) * 0.2 +
      tcoResult.security.complianceScore * 0.25,
  )

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            {vendor.name} Scorecard
          </CardTitle>
          <Badge variant={getScoreBadge(overallScore)}>{overallScore}/100</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Security Score</span>
              <span className={`text-sm font-medium ${getScoreColor(tcoResult.security.overallScore)}`}>
                {tcoResult.security.overallScore}%
              </span>
            </div>
            <Progress value={tcoResult.security.overallScore} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Cost Efficiency</span>
              <span className={`text-sm font-medium ${getScoreColor(100 - tcoResult.totalCost / 50000)}`}>
                {Math.round(100 - tcoResult.totalCost / 50000)}%
              </span>
            </div>
            <Progress value={100 - tcoResult.totalCost / 50000} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Deployment Speed</span>
              <span className={`text-sm font-medium ${getScoreColor(100 - tcoResult.implementation.timeline / 3.65)}`}>
                {Math.round(100 - tcoResult.implementation.timeline / 3.65)}%
              </span>
            </div>
            <Progress value={100 - tcoResult.implementation.timeline / 3.65} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Compliance</span>
              <span className={`text-sm font-medium ${getScoreColor(tcoResult.security.complianceScore)}`}>
                {tcoResult.security.complianceScore}%
              </span>
            </div>
            <Progress value={tcoResult.security.complianceScore} className="h-2" />
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                ${(tcoResult.roi.totalSavings / 1000).toFixed(0)}k
              </div>
              <div className="text-xs text-muted-foreground">Total Savings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{tcoResult.roi.paybackPeriod.toFixed(1)}mo</div>
              <div className="text-xs text-muted-foreground">Payback Period</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{tcoResult.implementation.timeline}d</div>
              <div className="text-xs text-muted-foreground">Deploy Time</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function VendorComparisonMatrix({ 
  selectedVendors = ["portnox", "cisco_ise", "aruba_clearpass", "forescout"],
  onVendorSelectionChange 
}: VendorComparisonMatrixProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [sortBy, setSortBy] = useState("totalCost")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // Default configuration
  const config = {
    deviceCount: 500,
    industry: "HEALTHCARE",
    timeframe: 3,
    deploymentModel: "CLOUD",
    complianceRequirements: ["HIPAA", "SOC2"]
  }

  // Calculate TCO for all selected vendors
  const vendorResults = useMemo(() => {
    return selectedVendors.map(vendorId => {
      const vendor = COMPREHENSIVE_VENDOR_DATA[vendorId]
      const tcoResult = calculateComprehensiveTCO(vendorId, config)
      
      return {
        vendorId,
        vendor,
        tcoResult,
        overallScore: tcoResult ? Math.round(
          (tcoResult.security.overallScore * 0.3) +
          ((100 - (tcoResult.totalCost / 50000)) * 0.25) +
          ((100 - tcoResult.implementation.timeline / 3.65) * 0.2) +
          (tcoResult.security.complianceScore * 0.25)
        ) : 0
      }
    }).filter(result => result.vendor && result.tcoResult)
  }, [selectedVendors])

  // Sort vendors based on selected criteria
  const sortedVendors = useMemo(() => {
    return [...vendorResults].sort((a, b) => {
      let aValue: number, bValue: number
      
      switch (sortBy) {
        case "totalCost":
          aValue = a.tcoResult?.totalCost || 0
          bValue = b.tcoResult?.totalCost || 0
          break
        case "securityScore":
          aValue = a.tcoResult?.security.overallScore || 0
          bValue = b.tcoResult?.security.overallScore || 0
          break
        case "deploymentTime":
          aValue = a.tcoResult?.implementation.timeline || 0
          bValue = b.tcoResult?.implementation.timeline || 0
          break
        case "overallScore":
          aValue = a.overallScore
          bValue = b.overallScore
          break
        default:
          aValue = a.overallScore
          bValue = b.overallScore
      }
      
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    })
  }, [vendorResults, sortBy, sortOrder])

  // Chart data for visualizations
  const chartData = sortedVendors.map(({ vendorId, vendor, tcoResult }) => ({
    name: vendor?.name || vendorId,
    totalCost: tcoResult?.totalCost || 0,
    securityScore: tcoResult?.security.overallScore || 0,
    deploymentTime: tcoResult?.implementation.timeline || 0,
    roi: tcoResult?.roi.totalSavings || 0
  }))

  const handleVendorToggle = (vendorId: string) => {
    const newSelection = selectedVendors.includes(vendorId)
      ? selectedVendors.filter(id => id !== vendorId)
      : [...selectedVendors, vendorId]
    
    onVendorSelectionChange?.(newSelection)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Vendor Comparison Matrix</h2>
          <p className="text-muted-foreground">
            Comprehensive side-by-side analysis of NAC vendors • {selectedVendors.length} vendors selected
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overallScore">Overall Score</SelectItem>
              <SelectItem value="totalCost">Total Cost</SelectItem>
              <SelectItem value="securityScore">Security Score</SelectItem>
              <SelectItem value="deploymentTime">Deployment Time</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "↑" : "↓"} {sortOrder.toUpperCase()}
          </Button>
        </div>
      </div>

      {/* Vendor Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Selection</CardTitle>
          <CardDescription>Select vendors to include in the comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(COMPREHENSIVE_VENDOR_DATA).map(([vendorId, vendor]) => (
              <div key={vendorId} className="flex items-center space-x-2">
                <Checkbox
                  id={vendorId}
                  checked={selectedVendors.includes(vendorId)}
                  onCheckedChange={() => handleVendorToggle(vendorId)}
                />
                <label htmlFor={vendorId} className="text-sm font-medium">
                  {vendor.name}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Comparison Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
          <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sortedVendors.slice(0, 4).map(({ vendorId, vendor, tcoResult, overallScore }) => (
              <Card key={vendorId}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {vendor?.name}
                    <Badge variant={overallScore >= 80 ? "default" : overallScore >= 60 ? "secondary" : "destructive"}>
                      {overallScore}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Cost</span>
                    <span className="font-medium">${(tcoResult?.totalCost || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Security</span>
                    <span className="font-medium">{tcoResult?.security.overallScore || 0}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Deploy Time</span>
                    <span className="font-medium">{tcoResult?.implementation.timeline || 0}d</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ROI</span>
                    <span className="font-medium text-green-600">
                      ${((tcoResult?.roi.totalSavings || 0) / 1000).toFixed(0)}k
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                    <Bar dataKey="totalCost" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security vs Deployment Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Radar dataKey="securityScore" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Comparison Matrix</CardTitle>
              <CardDescription>Detailed capability comparison across all vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      {sortedVendors.map(({ vendorId, vendor }) => (
                        <TableHead key={vendorId} className="text-center">
                          {vendor?.name}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { key: "wirelessNAC", label: "Wireless NAC" },
                      { key: "wiredNAC", label: "Wired NAC" },
                      { key: "zeroTrust", label: "Zero Trust" },
                      { key: "riskBasedAccess", label: "Risk-Based Access" },
                      { key: "deviceTrust", label: "Device Trust" },
                      { key: "iotProfiling", label: "IoT Profiling" },
                      { key: "behaviorAnalytics", label: "Behavior Analytics" },
                      { key: "microSegmentation", label: "Micro-Segmentation" },
                      { key: "cloudPKI", label: "Cloud PKI" },
                      { key: "multiTenant", label: "Multi-Tenant" }
                    ].map(({ key, label }) => (
                      <TableRow key={key}>
                        <TableCell className="font-medium">{label}</TableCell>
                        {sortedVendors.map(({ vendorId, vendor }) => (
                          <TableCell key={vendorId} className="text-center">
                            {vendor?.capabilities[key as keyof typeof vendor.capabilities] ? (
                              <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-400 mx-auto" />
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Scorecard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedVendors.map(({ vendorId, vendor, tcoResult }) => (
                    <div key={vendorId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{vendor?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Risk Reduction: {tcoResult?.security.riskReduction || 0}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {tcoResult?.security.overallScore || 0}%
                        </div>
                        <div className="text-xs text-muted-foreground">Security Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedVendors.map(({ vendorId, vendor, tcoResult }) => (
                    <div key={vendorId} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{vendor?.name}</span>
                        <span className="text-sm">{tcoResult?.security.complianceScore || 0}%</span>
                      </div>
                      <Progress value={tcoResult?.security.complianceScore || 0} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Software</TableHead>
                      <TableHea\
