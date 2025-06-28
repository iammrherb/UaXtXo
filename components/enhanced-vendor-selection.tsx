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
import { Search, Star, CheckCircle, Users } from "lucide-react"
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
        const categoryScore = categoryFeatures.reduce((sum, feature) => sum + feature.score, 0) / categoryFeatures.length || 0
        return total + (categoryScore * category.weight)
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
      const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <p className="text-gray-600 dark:text-gray-400">
            Compare NAC vendors and select solutions for analysis
          </p>
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
                  vendor.selected
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "hover:border-gray-300"
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {vendor.description}
                  </p>

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
          {comparisonData.selectedVendorData.length ===
