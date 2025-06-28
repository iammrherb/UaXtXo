"use client"

import React from "react"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  Search,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Building,
  Clock,
  DollarSign,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  onVendorChange: (vendors: string[]) => void
  configuration: CalculationConfiguration
  onConfigurationChange: (config: Partial<CalculationConfiguration>) => void
  results: CalculationResult[]
}

const VENDOR_CATEGORIES = [
  { id: "enterprise", name: "Enterprise", description: "Large-scale enterprise solutions" },
  { id: "cloud", name: "Cloud-Native", description: "Modern cloud-first platforms" },
  { id: "traditional", name: "Traditional", description: "Established on-premise solutions" },
]

const FEATURE_CATEGORIES = [
  { id: "core", name: "Core NAC", weight: 0.3 },
  { id: "security", name: "Security", weight: 0.25 },
  { id: "management", name: "Management", weight: 0.2 },
  { id: "integration", name: "Integration", weight: 0.15 },
  { id: "analytics", name: "Analytics", weight: 0.1 },
]

export default function EnhancedVendorSelection({
  selectedVendors,
  onVendorChange,
  configuration,
  onConfigurationChange,
  results = [],
}: EnhancedVendorSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("selection")
  const [comparisonMode, setComparisonMode] = useState(false)

  // Memoize vendor data processing
  const vendorData = useMemo(() => {
    const vendors = Object.entries(ComprehensiveVendorDatabase).map(([id, vendor]) => {
      const result = results.find((r) => r.vendor === id)

      // Calculate feature scores
      const featureScore = FEATURE_CATEGORIES.reduce((total, category) => {
        const categoryFeatures = vendor.features.filter((f) => f.category === category.id)
        const categoryScore =
          categoryFeatures.reduce((sum, feature) => sum + feature.score, 0) / categoryFeatures.length || 0
        return total + categoryScore * category.weight
      }, 0)

      return {
        id,
        ...vendor,
        result,
        featureScore: Math.round(featureScore),
        totalCost: result?.total || 0,
        roi: result?.roi?.percentage || 0,
        payback: result?.roi?.paybackMonths || 0,
        selected: selectedVendors.includes(id),
      }
    })

    // Filter vendors
    const filteredVendors = vendors.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || vendor.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort vendors by relevance score
    const sortedVendors = filteredVendors.sort((a, b) => {
      if (a.id === "portnox") return -1
      if (b.id === "portnox") return 1
      return b.featureScore - a.featureScore
    })

    return sortedVendors
  }, [searchTerm, selectedCategory, selectedVendors, results])

  // Comparison data for selected vendors
  const comparisonData = useMemo(() => {
    const selectedVendorData = vendorData.filter((v) => v.selected)

    // Feature comparison radar data
    const radarData = FEATURE_CATEGORIES.map((category) => {
      const data: any = { category: category.name }
      selectedVendorData.forEach((vendor) => {
        const categoryFeatures = vendor.features.filter((f) => f.category === category.id)
        const score = categoryFeatures.reduce((sum, feature) => sum + feature.score, 0) / categoryFeatures.length || 0
        data[vendor.id] = Math.round(score)
      })
      return data
    })

    // Cost comparison data
    const costData = selectedVendorData.map((vendor) => ({
      vendor: vendor.name,
      total: vendor.totalCost,
      roi: vendor.roi,
      payback: vendor.payback,
    }))

    return { radarData, costData, selectedVendorData }
  }, [vendorData])

  const handleVendorToggle = (vendorId: string) => {
    const newSelection = selectedVendors.includes(vendorId)
      ? selectedVendors.filter((id) => id !== vendorId)
      : [...selectedVendors, vendorId]

    onVendorChange(newSelection)
  }

  const getVendorLogo = (vendorId: string) => {
    const logoMap: Record<string, string> = {
      portnox: "/portnox-logo.png",
      cisco: "/cisco-logo.png",
      aruba: "/aruba-logo.png",
      meraki: "/meraki-logo.png",
      forescout: "/forescout-logo.png",
    }
    return logoMap[vendorId] || "/default-logo.png"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Vendor Selection & Comparison</h2>
          <p className="text-gray-600 dark:text-gray-400">Compare NAC vendors and select solutions for analysis</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={comparisonMode ? "default" : "outline"}
            size="sm"
            onClick={() => setComparisonMode(!comparisonMode)}
            className="gap-2 bg-transparent"
          >
            <Users className="h-4 w-4" />
            {comparisonMode ? "Exit" : "Compare"}
          </Button>
          <Badge variant="outline" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            {selectedVendors.length} Selected
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="selection">Vendor Selection</TabsTrigger>
          <TabsTrigger value="comparison">Feature Comparison</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        {/* Vendor Selection Tab */}
        <TabsContent value="selection" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Vendors</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by name or features..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="all">All Categories</option>
                    {VENDOR_CATEGORIES.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorData.map((vendor) => (
              <Card
                key={vendor.id}
                className={`cursor-pointer transition-all ${
                  vendor.selected ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "hover:border-gray-300"
                }`}
                onClick={() => handleVendorToggle(vendor.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={getVendorLogo(vendor.id) || "/placeholder.svg"}
                        alt={vendor.name}
                        className="w-8 h-8 object-contain"
                      />
                      <div>
                        <CardTitle className="text-lg">{vendor.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {vendor.category}
                        </Badge>
                      </div>
                    </div>
                    <Checkbox checked={vendor.selected} onChange={() => {}} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{vendor.description}</p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Feature Score</p>
                      <div className="flex items-center gap-2">
                        <Progress value={vendor.featureScore} className="h-2 flex-1" />
                        <span className="font-medium">{vendor.featureScore}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500">Deployment</p>
                      <p className="font-medium">{vendor.implementation.deploymentTime.pilot}</p>
                    </div>
                  </div>

                  {/* Cost & ROI (if calculated) */}
                  {vendor.result && (
                    <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
                      <div>
                        <p className="text-gray-500">Total Cost</p>
                        <p className="font-bold">${vendor.totalCost.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">ROI</p>
                        <p className="font-bold text-green-600">{vendor.roi}%</p>
                      </div>
                    </div>
                  )}

                  {/* Key Features */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {vendor.features.slice(0, 3).map((feature) => (
                        <Badge key={feature.name} variant="secondary" className="text-xs">
                          {feature.name}
                        </Badge>
                      ))}
                      {vendor.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{vendor.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Portnox Highlight */}
                  {vendor.id === "portnox" && (
                    <div className="flex items-center gap-2 text-sm text-green-600 bg-green-100 dark:bg-green-900/30 p-2 rounded">
                      <Star className="h-4 w-4" />
                      <span>Recommended Solution</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Feature Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          {comparisonData.selectedVendorData.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Vendors Selected</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Select at least 2 vendors to see detailed comparisons
                </p>
                <Button onClick={() => setActiveTab("selection")}>Select Vendors</Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Feature Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Feature Capability Comparison</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Comprehensive feature analysis across key categories
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={comparisonData.radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="category" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        {comparisonData.selectedVendorData.map((vendor, index) => (
                          <Radar
                            key={vendor.id}
                            name={vendor.name}
                            dataKey={vendor.id}
                            stroke={["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B"][index]}
                            fill={["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B"][index]}
                            fillOpacity={0.1}
                            strokeWidth={2}
                          />
                        ))}
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Feature Matrix */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Feature Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Feature</th>
                          {comparisonData.selectedVendorData.map((vendor) => (
                            <th key={vendor.id} className="text-center p-3">
                              {vendor.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {FEATURE_CATEGORIES.map((category) => (
                          <React.Fragment key={category.id}>
                            <tr className="bg-gray-50 dark:bg-gray-800">
                              <td colSpan={comparisonData.selectedVendorData.length + 1} className="p-3 font-medium">
                                {category.name} Features
                              </td>
                            </tr>
                            {comparisonData.selectedVendorData[0]?.features
                              .filter((f) => f.category === category.id)
                              .slice(0, 5)
                              .map((feature) => (
                                <tr key={feature.name} className="border-b">
                                  <td className="p-3">{feature.name}</td>
                                  {comparisonData.selectedVendorData.map((vendor) => {
                                    const vendorFeature = vendor.features.find((f) => f.name === feature.name)
                                    const score = vendorFeature?.score || 0
                                    return (
                                      <td key={vendor.id} className="p-3 text-center">
                                        {score >= 80 ? (
                                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                                        ) : score >= 60 ? (
                                          <AlertTriangle className="h-5 w-5 text-yellow-500 mx-auto" />
                                        ) : (
                                          <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                                        )}
                                      </td>
                                    )
                                  })}
                                </tr>
                              ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Cost & ROI Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Cost & ROI Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={comparisonData.costData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="vendor" />
                        <YAxis
                          yAxisId="cost"
                          orientation="left"
                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                        />
                        <YAxis yAxisId="roi" orientation="right" tickFormatter={(value) => `${value}%`} />
                        <Tooltip
                          formatter={(value: number, name: string) => [
                            name === "total" ? `$${value.toLocaleString()}` : `${value}%`,
                            name === "total" ? "Total Cost" : name === "roi" ? "ROI" : "Payback (months)",
                          ]}
                          labelStyle={{ color: "#374151" }}
                        />
                        <Bar yAxisId="cost" dataKey="total" fill="#3B82F6" name="Total Cost" />
                        <Bar yAxisId="roi" dataKey="roi" fill="#10B981" name="ROI %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Portnox Recommendation */}
            <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-green-600" />
                  Recommended: Portnox
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Highest ROI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Fastest Deployment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Best Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Cloud-Native</span>
                  </div>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Portnox offers the best combination of cost-effectiveness, security features, and ease of deployment
                  for your {configuration.industry} organization.
                </p>
              </CardContent>
            </Card>

            {/* Alternative Options */}
            <Card>
              <CardHeader>
                <CardTitle>Alternative Considerations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Enterprise Scale</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        For 10,000+ devices, consider Cisco ISE for maximum scalability
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Budget Constraints</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Aruba ClearPass offers good value for smaller deployments
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Existing Infrastructure</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Leverage existing vendor relationships for integration benefits
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Decision Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Decision Matrix</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Weighted scoring based on your organization's priorities
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Cost Effectiveness",
                  "Security Features",
                  "Ease of Deployment",
                  "Vendor Support",
                  "Future Roadmap",
                ].map((criterion, index) => (
                  <div key={criterion} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{criterion}</span>
                      <span>Weight: {[30, 25, 20, 15, 10][index]}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {comparisonData.selectedVendorData.slice(0, 3).map((vendor, vendorIndex) => {
                        const score = [95, 75, 70][vendorIndex] // Mock scores
                        return (
                          <div key={vendor.id} className="flex items-center gap-2">
                            <span className="text-sm w-16">{vendor.name}</span>
                            <Progress value={score} className="h-2 flex-1" />
                            <span className="text-sm w-8">{score}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
