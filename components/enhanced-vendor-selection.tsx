"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
} from "recharts"
import { Search, Star, CheckCircle, Users, TrendingUp, Shield, Zap, Award, Filter } from "lucide-react"
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
  { id: "enterprise", name: "Enterprise", description: "Large-scale enterprise solutions", color: "#3B82F6" },
  { id: "mid-market", name: "Mid-Market", description: "Mid-market focused solutions", color: "#10B981" },
  { id: "smb", name: "SMB", description: "Small to medium business solutions", color: "#F59E0B" },
]

const FEATURE_CATEGORIES = [
  { id: "core", name: "Core NAC", weight: 0.3, color: "#3B82F6" },
  { id: "security", name: "Security", weight: 0.25, color: "#EF4444" },
  { id: "management", name: "Management", weight: 0.2, color: "#10B981" },
  { id: "integration", name: "Integration", weight: 0.15, color: "#8B5CF6" },
  { id: "analytics", name: "Analytics", weight: 0.1, color: "#F59E0B" },
]

const CHART_COLORS = ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444", "#06B6D4", "#84CC16", "#F97316"]

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
  const [showFilters, setShowFilters] = useState(false)

  // Memoize vendor data processing
  const vendorData = useMemo(() => {
    const vendors = Object.entries(ComprehensiveVendorDatabase).map(([id, vendor]) => {
      const result = results.find((r) => r.vendor === id)

      // Calculate feature scores
      const featureScore = calculateFeatureScore(vendor)
      const marketScore = calculateMarketScore(vendor)

      return {
        id,
        ...vendor,
        result,
        featureScore: Math.round(featureScore),
        marketScore: Math.round(marketScore),
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
        data[vendor.id] = getFeatureCategoryScore(vendor, category.id)
      })
      return data
    })

    // Market metrics comparison
    const marketData = selectedVendorData.map((vendor) => ({
      vendor: vendor.name,
      marketShare: vendor.marketMetrics?.marketShare || 0,
      satisfaction: (vendor.marketMetrics?.customerSatisfaction || 0) * 20, // Scale to 100
      deploymentSuccess: vendor.marketMetrics?.deploymentSuccess || 0,
      supportRating: (vendor.marketMetrics?.supportRating || 0) * 20, // Scale to 100
    }))

    // Cost vs ROI scatter plot
    const costRoiData = selectedVendorData.map((vendor, index) => ({
      vendor: vendor.name,
      cost: vendor.totalCost / 1000, // Convert to thousands
      roi: vendor.roi,
      payback: vendor.payback,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }))

    // Technical specifications comparison
    const techSpecsData = selectedVendorData.map((vendor) => ({
      vendor: vendor.name,
      uptime: vendor.technicalSpecs?.uptime || 99.0,
      mttr: vendor.technicalSpecs?.mttr || 60,
      maxDevices: typeof vendor.technicalSpecs?.maxDevices === "number" ? vendor.technicalSpecs.maxDevices : 1000000,
    }))

    return { radarData, marketData, costRoiData, techSpecsData, selectedVendorData }
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
      fortinet: "/fortinet-logo.png",
      juniper: "/juniper-logo.png",
      arista: "/arista-logo.png",
      extreme: "/extreme-logo.png",
      microsoft: "/microsoft-logo.png",
      packetfence: "/packetfence-logo.png",
      foxpass: "/foxpass-logo.png",
      securew2: "/securew2-logo.png",
      radiusaas: "/radiusaas-logo.png",
    }
    return logoMap[vendorId] || "/placeholder.svg?height=32&width=32"
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
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Vendor Filters</SheetTitle>
                <SheetDescription>Filter and search vendors by various criteria</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                {/* Search */}
                <div>
                  <Label htmlFor="search">Search Vendors</Label>
                  <div className="relative mt-2">
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

                {/* Category Filter */}
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded-md bg-background mt-2"
                  >
                    <option value="all">All Categories</option>
                    {VENDOR_CATEGORIES.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected Vendors */}
                <div>
                  <Label>Selected Vendors ({selectedVendors.length})</Label>
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                    {selectedVendors.map((vendorId) => {
                      const vendor = vendorData.find((v) => v.id === vendorId)
                      return (
                        <div key={vendorId} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <img
                            src={getVendorLogo(vendorId) || "/placeholder.svg"}
                            alt={vendor?.name || vendorId}
                            className="w-4 h-4 object-contain"
                          />
                          <span className="text-sm flex-1">{vendor?.name || vendorId}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVendorToggle(vendorId)}
                            className="h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Badge variant="outline" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            {selectedVendors.length} Selected
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Vendor Selection Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Available Vendors</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select vendors to compare ({selectedVendors.length} selected)
              </p>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {vendorData.map((vendor) => (
                <div
                  key={vendor.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    vendor.selected
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleVendorToggle(vendor.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox checked={vendor.selected} onChange={() => {}} />
                    <img
                      src={getVendorLogo(vendor.id) || "/placeholder.svg"}
                      alt={vendor.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=24&width=24"
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{vendor.name}</p>
                      <p className="text-xs text-gray-500 truncate">{vendor.category}</p>
                    </div>
                  </div>

                  {/* Quick metrics */}
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Features</span>
                      <span>{vendor.featureScore}%</span>
                    </div>
                    <Progress value={vendor.featureScore} className="h-1" />
                  </div>

                  {/* Portnox highlight */}
                  {vendor.id === "portnox" && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                      <Star className="h-3 w-3" />
                      <span>Recommended</span>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Comparison Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="selection">Overview</TabsTrigger>
              <TabsTrigger value="comparison">Features</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="selection" className="space-y-6">
              {comparisonData.selectedVendorData.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Vendors Selected</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Select vendors from the left panel to see detailed comparisons.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Selected Vendors Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {comparisonData.selectedVendorData.map((vendor) => (
                      <Card key={vendor.id}>
                        <CardHeader className="pb-3">
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

                          {/* Cost & ROI */}
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
                              {getTopFeatures(vendor).map((feature) => (
                                <Badge key={feature} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Quick Comparison Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={comparisonData.selectedVendorData.map((v) => ({
                              name: v.name,
                              features: v.featureScore,
                              cost: v.totalCost / 1000,
                              roi: v.roi,
                            }))}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="features" fill="#3B82F6" name="Feature Score" />
                            <Bar dataKey="roi" fill="#10B981" name="ROI %" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            {/* Feature Comparison Tab */}
            <TabsContent value="comparison" className="space-y-6">
              {comparisonData.selectedVendorData.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Vendors Selected</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Select vendors to see detailed feature comparisons.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Feature Radar Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Feature Comparison Radar</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Comprehensive feature comparison across key categories
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={comparisonData.radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="category" />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} />
                            {comparisonData.selectedVendorData.slice(0, 5).map((vendor, index) => (
                              <Radar
                                key={vendor.id}
                                name={vendor.name}
                                dataKey={vendor.id}
                                stroke={CHART_COLORS[index]}
                                fill={CHART_COLORS[index]}
                                fillOpacity={0.1}
                                strokeWidth={2}
                              />
                            ))}
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Feature Categories Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURE_CATEGORIES.map((category) => (
                      <Card key={category.id}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                            {category.name}
                          </CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Weight: {(category.weight * 100).toFixed(0)}% of total score
                          </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {comparisonData.selectedVendorData.map((vendor) => {
                            const score = getFeatureCategoryScore(vendor, category.id)
                            return (
                              <div key={vendor.id} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>{vendor.name}</span>
                                  <span className="font-medium">{score}%</span>
                                </div>
                                <Progress value={score} className="h-2" />
                              </div>
                            )
                          })}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>

            {/* Market Analysis Tab */}
            <TabsContent value="market" className="space-y-6">
              {comparisonData.selectedVendorData.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Vendors Selected</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Select vendors to see market analysis and positioning data.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Market Metrics Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Market Metrics Comparison</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Market share, customer satisfaction, and deployment success rates
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={comparisonData.marketData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="vendor" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="marketShare" fill="#3B82F6" name="Market Share %" />
                            <Bar dataKey="satisfaction" fill="#10B981" name="Customer Satisfaction" />
                            <Bar dataKey="deploymentSuccess" fill="#8B5CF6" name="Deployment Success %" />
                            <Bar dataKey="supportRating" fill="#F59E0B" name="Support Rating" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cost vs ROI Scatter Plot */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Cost vs ROI Analysis</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Investment cost plotted against expected returns
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart data={comparisonData.costRoiData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="cost"
                              name="Cost"
                              unit="K"
                              label={{ value: "Total Cost ($K)", position: "insideBottom", offset: -5 }}
                            />
                            <YAxis
                              dataKey="roi"
                              name="ROI"
                              unit="%"
                              label={{ value: "ROI (%)", angle: -90, position: "insideLeft" }}
                            />
                            <Tooltip
                              formatter={(value: number, name: string) => [
                                name === "cost" ? `$${value}K` : `${value}%`,
                                name === "cost" ? "Total Cost" : "ROI",
                              ]}
                              labelFormatter={(label) => `Vendor: ${label}`}
                            />
                            {comparisonData.costRoiData.map((entry, index) => (
                              <Scatter key={entry.vendor} dataKey="roi" fill={entry.color} name={entry.vendor} />
                            ))}
                          </ScatterChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            {/* Technical Specs Tab */}
            <TabsContent value="technical" className="space-y-6">
              {comparisonData.selectedVendorData.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Vendors Selected</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Select vendors to see technical specifications and performance metrics.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Technical Specifications Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Technical Specifications</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Performance metrics and technical capabilities
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-3">Vendor</th>
                              <th className="text-left p-3">Max Devices</th>
                              <th className="text-left p-3">Uptime SLA</th>
                              <th className="text-left p-3">MTTR (min)</th>
                              <th className="text-left p-3">Deployment</th>
                            </tr>
                          </thead>
                          <tbody>
                            {comparisonData.selectedVendorData.map((vendor) => (
                              <tr key={vendor.id} className="border-b">
                                <td className="p-3 font-medium">{vendor.name}</td>
                                <td className="p-3">
                                  {formatTechnicalSpec(vendor.technicalSpecs?.maxDevices || "N/A")}
                                </td>
                                <td className="p-3">{vendor.technicalSpecs?.uptime || 99.0}%</td>
                                <td className="p-3">{vendor.technicalSpecs?.mttr || 60}</td>
                                <td className="p-3">{vendor.implementation.deploymentTime.pilot}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          Reliability Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {comparisonData.selectedVendorData.map((vendor) => (
                          <div key={vendor.id} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{vendor.name}</span>
                              <span className="font-medium">{vendor.technicalSpecs?.uptime || 99.0}% uptime</span>
                            </div>
                            <Progress value={vendor.technicalSpecs?.uptime || 99.0} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          Customer Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {comparisonData.selectedVendorData.map((vendor) => (
                          <div key={vendor.id} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{vendor.name}</span>
                              <span className="font-medium">
                                {(vendor.marketMetrics?.customerSatisfaction || 0).toFixed(1)}/5.0
                              </span>
                            </div>
                            <Progress value={(vendor.marketMetrics?.customerSatisfaction || 0) * 20} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Helper functions
function calculateFeatureScore(vendor: any): number {
  const features = vendor.features || {}
  const weights = {
    cloudNative: 15,
    zeroTrust: 15,
    aiMl: 10,
    iotSupport: 10,
    byod: 8,
    guestAccess: 8,
    apiIntegration: 10,
    singleSignOn: 8,
    multiTenant: 6,
    agentless: 10,
  }

  let score = 0
  let totalWeight = 0

  Object.entries(weights).forEach(([feature, weight]) => {
    if (features[feature] === true) {
      score += weight
    }
    totalWeight += weight
  })

  return totalWeight > 0 ? (score / totalWeight) * 100 : 0
}

function calculateMarketScore(vendor: any): number {
  const metrics = vendor.marketMetrics || {}
  return (
    ((metrics.marketShare || 0) * 0.3 +
      (metrics.customerSatisfaction || 0) * 20 * 0.3 +
      (metrics.deploymentSuccess || 0) * 0.2 +
      (metrics.supportRating || 0) * 20 * 0.2) /
    4
  )
}

function getFeatureCategoryScore(vendor: any, category: string): number {
  const features = vendor.features || {}

  const categoryFeatures = {
    core: ["cloudNative", "zeroTrust", "realTimeVisibility", "agentless"],
    security: ["threatDetection", "behaviorAnalytics", "microsegmentation", "aiMl"],
    management: ["multiTenant", "apiIntegration", "singleSignOn"],
    integration: ["apiIntegration", "byod", "guestAccess"],
    analytics: ["behaviorAnalytics", "aiMl", "realTimeVisibility"],
  }

  const relevantFeatures = categoryFeatures[category as keyof typeof categoryFeatures] || []
  const enabledFeatures = relevantFeatures.filter((feature) => features[feature] === true)

  return relevantFeatures.length > 0 ? (enabledFeatures.length / relevantFeatures.length) * 100 : 0
}

function getTopFeatures(vendor: any): string[] {
  const features = vendor.features || {}
  const topFeatures: string[] = []

  if (features.cloudNative) topFeatures.push("Cloud Native")
  if (features.zeroTrust) topFeatures.push("Zero Trust")
  if (features.aiMl) topFeatures.push("AI/ML")
  if (features.iotSupport) topFeatures.push("IoT Support")
  if (features.agentless) topFeatures.push("Agentless")

  return topFeatures.slice(0, 3)
}

function formatTechnicalSpec(value: string | number): string {
  if (typeof value === "string") return value
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
  return value.toString()
}
