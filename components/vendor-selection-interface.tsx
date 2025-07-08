"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { COMPREHENSIVE_VENDOR_DATA } from "@/lib/vendors/comprehensive-vendor-data"
import {
  Search,
  Filter,
  Star,
  Building2,
  Cloud,
  Server,
  Shield,
  DollarSign,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  Info,
  Zap,
  Target,
} from "lucide-react"

interface VendorSelectionInterfaceProps {
  selectedVendors: string[]
  onVendorSelectionChange: (vendors: string[]) => void
  maxSelections?: number
  showRecommendations?: boolean
}

interface FilterState {
  search: string
  category: string
  priceRange: string
  deploymentModel: string
  complexity: string
  securityScore: number
  sortBy: string
  sortOrder: "asc" | "desc"
}

const VENDOR_CATEGORIES = {
  all: "All Categories",
  "cloud-native": "Cloud-Native",
  "on-premise": "On-Premise",
  hybrid: "Hybrid",
  specialized: "Specialized",
}

const PRICE_RANGES = {
  all: "All Price Ranges",
  low: "Under $50/device/year",
  medium: "$50-$150/device/year",
  high: "Over $150/device/year",
}

const DEPLOYMENT_MODELS = {
  all: "All Deployment Models",
  cloud: "Cloud-Only",
  "on-premise": "On-Premise",
  hybrid: "Hybrid",
  saas: "SaaS",
}

const COMPLEXITY_LEVELS = {
  all: "All Complexity Levels",
  low: "Low Complexity",
  medium: "Medium Complexity",
  high: "High Complexity",
}

export default function VendorSelectionInterface({
  selectedVendors,
  onVendorSelectionChange,
  maxSelections = 10,
  showRecommendations = true,
}: VendorSelectionInterfaceProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    priceRange: "all",
    deploymentModel: "all",
    complexity: "all",
    securityScore: 0,
    sortBy: "name",
    sortOrder: "asc",
  })

  const [showFilters, setShowFilters] = useState(false)
  const [recommendations, setRecommendations] = useState<string[]>([])

  // Get vendor data with error handling
  const getVendorData = (vendorId: string) => {
    return (
      COMPREHENSIVE_VENDOR_DATA[vendorId] || {
        name: vendorId,
        category: "unknown",
        pricing: { basePrice: 0 },
        implementation: { complexity: "medium" },
        security: { overallScore: 0 },
        deployment: { models: [] },
      }
    )
  }

  // Filter vendors based on current filters
  const filteredVendors = Object.keys(COMPREHENSIVE_VENDOR_DATA).filter((vendorId) => {
    const vendor = getVendorData(vendorId)

    // Search filter
    if (filters.search && !vendor.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }

    // Category filter
    if (filters.category !== "all" && vendor.category !== filters.category) {
      return false
    }

    // Price range filter
    if (filters.priceRange !== "all") {
      const basePrice = vendor.pricing?.basePrice || 0
      switch (filters.priceRange) {
        case "low":
          if (basePrice >= 50) return false
          break
        case "medium":
          if (basePrice < 50 || basePrice > 150) return false
          break
        case "high":
          if (basePrice <= 150) return false
          break
      }
    }

    // Deployment model filter
    if (filters.deploymentModel !== "all") {
      const deploymentModels = vendor.deployment?.models || []
      if (!deploymentModels.includes(filters.deploymentModel)) {
        return false
      }
    }

    // Complexity filter
    if (filters.complexity !== "all" && vendor.implementation?.complexity !== filters.complexity) {
      return false
    }

    // Security score filter
    const securityScore = vendor.security?.overallScore || 0
    if (securityScore < filters.securityScore) {
      return false
    }

    return true
  })

  // Sort filtered vendors
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    const vendorA = getVendorData(a)
    const vendorB = getVendorData(b)

    let comparison = 0
    switch (filters.sortBy) {
      case "name":
        comparison = vendorA.name.localeCompare(vendorB.name)
        break
      case "price":
        comparison = (vendorA.pricing?.basePrice || 0) - (vendorB.pricing?.basePrice || 0)
        break
      case "security":
        comparison = (vendorA.security?.overallScore || 0) - (vendorB.security?.overallScore || 0)
        break
      case "complexity":
        const complexityOrder = { low: 1, medium: 2, high: 3 }
        comparison =
          complexityOrder[vendorA.implementation?.complexity || "medium"] -
          complexityOrder[vendorB.implementation?.complexity || "medium"]
        break
      default:
        comparison = vendorA.name.localeCompare(vendorB.name)
    }

    return filters.sortOrder === "asc" ? comparison : -comparison
  })

  // Generate recommendations based on common use cases
  useEffect(() => {
    const recommended = []

    // Always recommend Portnox as primary
    if (COMPREHENSIVE_VENDOR_DATA["portnox"]) {
      recommended.push("portnox")
    }

    // Add market leaders
    if (COMPREHENSIVE_VENDOR_DATA["cisco_ise"]) {
      recommended.push("cisco_ise")
    }

    // Add cloud-native alternatives
    if (COMPREHENSIVE_VENDOR_DATA["aruba_clearpass"]) {
      recommended.push("aruba_clearpass")
    }

    // Add specialized solutions
    if (COMPREHENSIVE_VENDOR_DATA["forescout"]) {
      recommended.push("forescout")
    }

    setRecommendations(recommended)
  }, [])

  const handleVendorToggle = (vendorId: string) => {
    const isSelected = selectedVendors.includes(vendorId)
    let newSelection: string[]

    if (isSelected) {
      newSelection = selectedVendors.filter((id) => id !== vendorId)
    } else {
      if (selectedVendors.length >= maxSelections) {
        return // Don't add if max selections reached
      }
      newSelection = [...selectedVendors, vendorId]
    }

    onVendorSelectionChange(newSelection)
  }

  const handleSelectRecommended = () => {
    onVendorSelectionChange(recommendations.slice(0, maxSelections))
  }

  const handleClearSelection = () => {
    onVendorSelectionChange([])
  }

  const handleSelectAll = () => {
    const allVendors = sortedVendors.slice(0, maxSelections)
    onVendorSelectionChange(allVendors)
  }

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      priceRange: "all",
      deploymentModel: "all",
      complexity: "all",
      securityScore: 0,
      sortBy: "name",
      sortOrder: "asc",
    })
  }

  const VendorCard = ({ vendorId }: { vendorId: string }) => {
    const vendor = getVendorData(vendorId)
    const isSelected = selectedVendors.includes(vendorId)
    const isRecommended = recommendations.includes(vendorId)
    const isPrimary = vendorId === "portnox"

    return (
      <Card
        className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
          isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
        } ${isPrimary ? "border-primary/50" : ""}`}
        onClick={() => handleVendorToggle(vendorId)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Building2 className="h-5 w-5" />
                </div>
                {isPrimary && <Star className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 fill-current" />}
              </div>
              <div>
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  {vendor.name}
                  {isPrimary && (
                    <Badge variant="secondary" className="text-xs">
                      Primary
                    </Badge>
                  )}
                  {isRecommended && (
                    <Badge variant="outline" className="text-xs">
                      Recommended
                    </Badge>
                  )}
                </h4>
                <p className="text-xs text-muted-foreground capitalize">{vendor.category}</p>
              </div>
            </div>
            <Checkbox checked={isSelected} onChange={() => handleVendorToggle(vendorId)} className="mt-1" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-green-600" />
              <span>${vendor.pricing?.basePrice || 0}/device</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-blue-600" />
              <span>{vendor.security?.overallScore || 0}% security</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-orange-600" />
              <span className="capitalize">{vendor.implementation?.complexity || "medium"} setup</span>
            </div>
            <div className="flex items-center gap-1">
              {vendor.category === "cloud-native" ? (
                <Cloud className="h-3 w-3 text-purple-600" />
              ) : (
                <Server className="h-3 w-3 text-gray-600" />
              )}
              <span className="capitalize">{vendor.category}</span>
            </div>
          </div>

          {vendor.deployment?.models && vendor.deployment.models.length > 0 && (
            <div className="mt-3 pt-2 border-t">
              <div className="flex flex-wrap gap-1">
                {vendor.deployment.models.slice(0, 2).map((model, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs capitalize">
                    {model}
                  </Badge>
                ))}
                {vendor.deployment.models.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{vendor.deployment.models.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Vendor Selection</h2>
          <p className="text-muted-foreground">
            Choose up to {maxSelections} NAC vendors for comparison • {selectedVendors.length} selected
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "Hide" : "Show"} Filters
          </Button>
        </div>
      </div>

      {/* Selection Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5" />
            Selection Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{selectedVendors.length}</div>
                <div className="text-sm text-muted-foreground">Selected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">{maxSelections}</div>
                <div className="text-sm text-muted-foreground">Maximum</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{sortedVendors.length}</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
            </div>
            <Progress value={(selectedVendors.length / maxSelections) * 100} className="w-32" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {selectedVendors.length > 0 ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Ready for analysis
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  Select vendors to begin
                </>
              )}
            </div>
            <div className="flex gap-2">
              {showRecommendations && (
                <Button variant="outline" size="sm" onClick={handleSelectRecommended}>
                  <Star className="h-4 w-4 mr-2" />
                  Select Recommended
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                <Users className="h-4 w-4 mr-2" />
                Select All Filtered
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearSelection}>
                Clear All
              </Button>
            </div>
          </div>

          {selectedVendors.length >= maxSelections && (
            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Maximum selection limit reached. Deselect vendors to choose different ones.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Advanced Filters</span>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Reset Filters
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <Label htmlFor="search">Search Vendors</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name..."
                    value={filters.search}
                    onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    className="pl-8"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(VENDOR_CATEGORIES).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <Label htmlFor="priceRange">Price Range</Label>
                <Select
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PRICE_RANGES).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Deployment Model */}
              <div>
                <Label htmlFor="deploymentModel">Deployment Model</Label>
                <Select
                  value={filters.deploymentModel}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, deploymentModel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(DEPLOYMENT_MODELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Complexity */}
              <div>
                <Label htmlFor="complexity">Implementation Complexity</Label>
                <Select
                  value={filters.complexity}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, complexity: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(COMPLEXITY_LEVELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Options */}
              <div>
                <Label htmlFor="sortBy">Sort By</Label>
                <div className="flex gap-2">
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="security">Security Score</SelectItem>
                      <SelectItem value="complexity">Complexity</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, sortOrder: prev.sortOrder === "asc" ? "desc" : "asc" }))
                    }
                  >
                    {filters.sortOrder === "asc" ? "↑" : "↓"}
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Security Score Filter */}
            <div>
              <Label htmlFor="securityScore">Minimum Security Score: {filters.securityScore}%</Label>
              <input
                type="range"
                id="securityScore"
                min="0"
                max="100"
                step="5"
                value={filters.securityScore}
                onChange={(e) => setFilters((prev) => ({ ...prev, securityScore: Number(e.target.value) }))}
                className="w-full mt-2"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vendor Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Available Vendors ({sortedVendors.length})</h3>
          <div className="text-sm text-muted-foreground">
            Showing {sortedVendors.length} of {Object.keys(COMPREHENSIVE_VENDOR_DATA).length} vendors
          </div>
        </div>

        {sortedVendors.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No vendors found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters to see more vendors.</p>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedVendors.map((vendorId) => (
              <VendorCard key={vendorId} vendorId={vendorId} />
            ))}
          </div>
        )}
      </div>

      {/* Recommendations */}
      {showRecommendations && recommendations.length > 0 && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Recommended Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Based on market analysis and common use cases, we recommend starting with these vendors:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {recommendations.map((vendorId) => {
                const vendor = getVendorData(vendorId)
                return (
                  <Badge key={vendorId} variant="outline" className="flex items-center gap-1">
                    {vendorId === "portnox" && <Star className="h-3 w-3 text-yellow-500" />}
                    {vendor.name}
                  </Badge>
                )
              })}
            </div>
            <Button variant="outline" size="sm" onClick={handleSelectRecommended}>
              <Zap className="h-4 w-4 mr-2" />
              Use Recommended Selection
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
