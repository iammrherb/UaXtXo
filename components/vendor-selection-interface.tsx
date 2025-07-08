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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { COMPREHENSIVE_VENDOR_DATA } from "@/lib/vendors/comprehensive-vendor-data"
import { VendorDetailsModal } from "./vendor-details-modal"
import { VendorComparisonTable } from "./vendor-comparison-table"
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
  Eye,
  GitCompare,
  Award,
  Globe,
  BarChart3,
  Lock,
  Wifi,
  Smartphone,
  CloudLightning,
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
  enterprise: "Enterprise",
  "mid-market": "Mid-Market",
  sme: "SME",
  "open-source": "Open Source",
}

const PRICE_RANGES = {
  all: "All Price Ranges",
  free: "Free/Open Source",
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
  virtual: "Virtual Appliance",
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
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([])
  const [showComparison, setShowComparison] = useState(false)
  const [selectedVendorDetails, setSelectedVendorDetails] = useState<string | null>(null)

  // Get vendor data with comprehensive details
  const getVendorData = (vendorId: string) => {
    return COMPREHENSIVE_VENDOR_DATA[vendorId] || null
  }

  // Filter vendors based on current filters
  const filteredVendors = Object.keys(COMPREHENSIVE_VENDOR_DATA).filter((vendorId) => {
    const vendor = getVendorData(vendorId)
    if (!vendor) return false

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
      const basePrice = vendor.licensing?.base?.[0]?.listPrice || 0
      switch (filters.priceRange) {
        case "free":
          if (basePrice > 0) return false
          break
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
      const hasCloudDeployment = vendor.hardware?.cloud && vendor.hardware.cloud.length > 0
      const hasPhysicalDeployment = vendor.hardware?.physical && vendor.hardware.physical.length > 0
      const hasVirtualDeployment = vendor.hardware?.virtual && vendor.hardware.virtual.length > 0

      switch (filters.deploymentModel) {
        case "cloud":
          if (!hasCloudDeployment) return false
          break
        case "on-premise":
          if (!hasPhysicalDeployment) return false
          break
        case "virtual":
          if (!hasVirtualDeployment) return false
          break
        case "hybrid":
          if (!hasCloudDeployment && !hasPhysicalDeployment) return false
          break
      }
    }

    return true
  })

  // Sort filtered vendors
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    const vendorA = getVendorData(a)
    const vendorB = getVendorData(b)
    if (!vendorA || !vendorB) return 0

    let comparison = 0
    switch (filters.sortBy) {
      case "name":
        comparison = vendorA.name.localeCompare(vendorB.name)
        break
      case "price":
        const priceA = vendorA.licensing?.base?.[0]?.listPrice || 0
        const priceB = vendorB.licensing?.base?.[0]?.listPrice || 0
        comparison = priceA - priceB
        break
      case "category":
        comparison = vendorA.category.localeCompare(vendorB.category)
        break
      case "position":
        const positionOrder = { leader: 1, challenger: 2, visionary: 3, niche: 4 }
        comparison = positionOrder[vendorA.marketPosition] - positionOrder[vendorB.marketPosition]
        break
      default:
        comparison = vendorA.name.localeCompare(vendorB.name)
    }

    return filters.sortOrder === "asc" ? comparison : -comparison
  })

  // Generate recommendations based on market position and capabilities
  useEffect(() => {
    const recommended = []

    // Always recommend Portnox as primary cloud-native solution
    if (COMPREHENSIVE_VENDOR_DATA["portnox"]) {
      recommended.push("portnox")
    }

    // Add market leaders
    Object.entries(COMPREHENSIVE_VENDOR_DATA).forEach(([id, vendor]) => {
      if (vendor.marketPosition === "leader" && !recommended.includes(id)) {
        recommended.push(id)
      }
    })

    // Add challengers for comparison
    Object.entries(COMPREHENSIVE_VENDOR_DATA).forEach(([id, vendor]) => {
      if (vendor.marketPosition === "challenger" && recommended.length < 6 && !recommended.includes(id)) {
        recommended.push(id)
      }
    })

    setRecommendations(recommended.slice(0, 6))
  }, [])

  const handleVendorToggle = (vendorId: string) => {
    const isSelected = selectedVendors.includes(vendorId)
    let newSelection: string[]

    if (isSelected) {
      newSelection = selectedVendors.filter((id) => id !== vendorId)
    } else {
      if (selectedVendors.length >= maxSelections) {
        return
      }
      newSelection = [...selectedVendors, vendorId]
    }

    onVendorSelectionChange(newSelection)
  }

  const handleComparisonToggle = (vendorId: string) => {
    const isSelected = selectedForComparison.includes(vendorId)
    let newSelection: string[]

    if (isSelected) {
      newSelection = selectedForComparison.filter((id) => id !== vendorId)
    } else {
      if (selectedForComparison.length >= 4) {
        return
      }
      newSelection = [...selectedForComparison, vendorId]
    }

    setSelectedForComparison(newSelection)
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

  const getVendorIcon = (vendor: any) => {
    if (vendor.category === "cloud-native") return <CloudLightning className="h-5 w-5 text-blue-500" />
    if (vendor.category === "enterprise") return <Building2 className="h-5 w-5 text-purple-500" />
    if (vendor.category === "open-source") return <Globe className="h-5 w-5 text-green-500" />
    return <Server className="h-5 w-5 text-gray-500" />
  }

  const getMarketPositionBadge = (position: string) => {
    const badges = {
      leader: { variant: "default" as const, color: "text-green-600", label: "Leader" },
      challenger: { variant: "secondary" as const, color: "text-blue-600", label: "Challenger" },
      visionary: { variant: "outline" as const, color: "text-purple-600", label: "Visionary" },
      niche: { variant: "outline" as const, color: "text-orange-600", label: "Niche" },
    }
    const badge = badges[position as keyof typeof badges] || badges.niche
    return (
      <Badge variant={badge.variant} className={`text-xs ${badge.color}`}>
        {badge.label}
      </Badge>
    )
  }

  const VendorCard = ({ vendorId }: { vendorId: string }) => {
    const vendor = getVendorData(vendorId)
    if (!vendor) return null

    const isSelected = selectedVendors.includes(vendorId)
    const isSelectedForComparison = selectedForComparison.includes(vendorId)
    const isRecommended = recommendations.includes(vendorId)
    const isPrimary = vendorId === "portnox"

    const basePrice = vendor.licensing?.base?.[0]?.listPrice || 0
    const hasCloudDeployment = vendor.hardware?.cloud && vendor.hardware.cloud.length > 0
    const hasPhysicalDeployment = vendor.hardware?.physical && vendor.hardware.physical.length > 0

    return (
      <Card
        className={`transition-all duration-200 hover:shadow-lg cursor-pointer ${
          isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
        } ${isPrimary ? "border-primary/50 shadow-md" : ""}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  {getVendorIcon(vendor)}
                </div>
                {isPrimary && <Star className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 fill-current" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{vendor.name}</h4>
                  {isPrimary && (
                    <Badge variant="secondary" className="text-xs">
                      Recommended
                    </Badge>
                  )}
                  {isRecommended && !isPrimary && (
                    <Badge variant="outline" className="text-xs">
                      Popular
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground capitalize">{vendor.category}</p>
                  {getMarketPositionBadge(vendor.marketPosition)}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Checkbox
                checked={isSelected}
                onChange={() => handleVendorToggle(vendorId)}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>

          <div className="space-y-3">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3 text-green-600" />
                <span>{basePrice > 0 ? `$${basePrice}/device` : "Contact Sales"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-orange-600" />
                <span>{vendor.tcoFactors?.upgradeComplexity || "Medium"} setup</span>
              </div>
              <div className="flex items-center gap-1">
                {hasCloudDeployment ? (
                  <Cloud className="h-3 w-3 text-blue-600" />
                ) : (
                  <Server className="h-3 w-3 text-gray-600" />
                )}
                <span>{hasCloudDeployment ? "Cloud" : "On-Premise"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-purple-600" />
                <span>Enterprise Security</span>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">Key Features:</div>
              <div className="flex flex-wrap gap-1">
                {vendor.featureSupport?.authentication?.["802.1X"] === "✓✓✓" && (
                  <Badge variant="outline" className="text-xs">
                    <Wifi className="h-3 w-3 mr-1" />
                    802.1X
                  </Badge>
                )}
                {vendor.featureSupport?.advanced?.["Zero Trust"] === "✓✓✓" && (
                  <Badge variant="outline" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    Zero Trust
                  </Badge>
                )}
                {vendor.featureSupport?.advanced?.["Cloud Native"] === "✓✓✓" && (
                  <Badge variant="outline" className="text-xs">
                    <Cloud className="h-3 w-3 mr-1" />
                    Cloud Native
                  </Badge>
                )}
                {vendor.featureSupport?.network?.IoT === "✓✓✓" && (
                  <Badge variant="outline" className="text-xs">
                    <Smartphone className="h-3 w-3 mr-1" />
                    IoT
                  </Badge>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedVendorDetails(vendorId)
                  }}
                  className="text-xs h-7"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleComparisonToggle(vendorId)
                  }}
                  className={`text-xs h-7 ${isSelectedForComparison ? "bg-blue-100 text-blue-700" : ""}`}
                  disabled={!isSelectedForComparison && selectedForComparison.length >= 4}
                >
                  <GitCompare className="h-3 w-3 mr-1" />
                  Compare
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">{vendor.tcoFactors?.fteRequirement || 1} FTE req.</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Vendor Selection & Analysis</h2>
          <p className="text-muted-foreground">
            Choose up to {maxSelections} NAC vendors for comprehensive analysis • {selectedVendors.length} selected
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComparison(true)}
            disabled={selectedForComparison.length < 2}
          >
            <GitCompare className="h-4 w-4 mr-2" />
            Compare ({selectedForComparison.length})
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "Hide" : "Show"} Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="selection" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="selection">Vendor Selection</TabsTrigger>
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="comparison">Quick Compare</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="selection" className="space-y-6">
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
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{selectedVendors.length}</div>
                    <div className="text-sm text-muted-foreground">Selected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-muted-foreground">{maxSelections}</div>
                    <div className="text-sm text-muted-foreground">Maximum</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{sortedVendors.length}</div>
                    <div className="text-sm text-muted-foreground">Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{selectedForComparison.length}</div>
                    <div className="text-sm text-muted-foreground">For Compare</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={(selectedVendors.length / maxSelections) * 100} className="w-32" />
                  <div className="text-xs text-center text-muted-foreground">
                    {Math.round((selectedVendors.length / maxSelections) * 100)}% of limit
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {selectedVendors.length > 0 ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Ready for comprehensive analysis
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      Select vendors to begin analysis
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
                  <span>Advanced Filters & Sorting</span>
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Reset All Filters
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                </div>

                <Separator />

                {/* Sort Options */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="sortBy">Sort By:</Label>
                    <Select
                      value={filters.sortBy}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                        <SelectItem value="position">Market Position</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, sortOrder: prev.sortOrder === "asc" ? "desc" : "asc" }))
                    }
                  >
                    {filters.sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Vendor Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Available Vendors ({sortedVendors.length})</h3>
              <div className="text-sm text-muted-foreground">
                Showing {sortedVendors.length} of {Object.keys(COMPREHENSIVE_VENDOR_DATA).length} vendors
              </div>
            </div>

            {sortedVendors.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No vendors found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters to see more vendors, or reset all filters to start over.
                  </p>
                  <Button variant="outline" onClick={resetFilters}>
                    <Filter className="h-4 w-4 mr-2" />
                    Reset All Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedVendors.map((vendorId) => (
                  <VendorCard key={vendorId} vendorId={vendorId} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold">Total Vendors</h3>
                </div>
                <div className="text-3xl font-bold">{Object.keys(COMPREHENSIVE_VENDOR_DATA).length}</div>
                <p className="text-sm text-muted-foreground">Available for analysis</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold">Market Leaders</h3>
                </div>
                <div className="text-3xl font-bold">
                  {Object.values(COMPREHENSIVE_VENDOR_DATA).filter((v) => v.marketPosition === "leader").length}
                </div>
                <p className="text-sm text-muted-foreground">Industry leaders</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <CloudLightning className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold">Cloud-Native</h3>
                </div>
                <div className="text-3xl font-bold">
                  {Object.values(COMPREHENSIVE_VENDOR_DATA).filter((v) => v.category === "cloud-native").length}
                </div>
                <p className="text-sm text-muted-foreground">Modern solutions</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-5 w-5 text-orange-600" />
                  <h3 className="font-semibold">Open Source</h3>
                </div>
                <div className="text-3xl font-bold">
                  {Object.values(COMPREHENSIVE_VENDOR_DATA).filter((v) => v.category === "open-source").length}
                </div>
                <p className="text-sm text-muted-foreground">Free alternatives</p>
              </CardContent>
            </Card>
          </div>

          {/* Market Position Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Market Position Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["leader", "challenger", "visionary", "niche"].map((position) => {
                  const count = Object.values(COMPREHENSIVE_VENDOR_DATA).filter(
                    (v) => v.marketPosition === position,
                  ).length
                  const percentage = Math.round((count / Object.keys(COMPREHENSIVE_VENDOR_DATA).length) * 100)

                  return (
                    <div key={position} className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold mb-1">{count}</div>
                      <div className="text-sm font-medium capitalize mb-1">{position}s</div>
                      <div className="text-xs text-muted-foreground">{percentage}% of market</div>
                      <Progress value={percentage} className="mt-2" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          {selectedForComparison.length < 2 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <GitCompare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Select Vendors to Compare</h3>
                <p className="text-muted-foreground mb-6">
                  Choose 2-4 vendors from the selection tab to see a detailed comparison.
                </p>
                <Button variant="outline" onClick={() => setSelectedForComparison(recommendations.slice(0, 3))}>
                  <Star className="h-4 w-4 mr-2" />
                  Compare Recommended Vendors
                </Button>
              </CardContent>
            </Card>
          ) : (
            <VendorComparisonTable vendors={selectedForComparison} />
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {/* Recommended Selection */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Expert Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Based on market analysis, customer feedback, and technical capabilities, we recommend these vendor
                combinations for different use cases:
              </p>

              <div className="space-y-6">
                {/* Primary Recommendation */}
                <div className="p-4 border rounded-lg bg-white/50 dark:bg-gray-900/50">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Best Overall Choice
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {recommendations.slice(0, 1).map((vendorId) => {
                      const vendor = getVendorData(vendorId)
                      return vendor ? (
                        <Badge key={vendorId} variant="default" className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {vendor.name}
                        </Badge>
                      ) : null
                    })}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Portnox CLEAR offers the best combination of features, ease of deployment, and total cost of
                    ownership. Ideal for organizations seeking modern, cloud-native NAC with zero-trust capabilities.
                  </p>
                </div>

                {/* Comprehensive Analysis */}
                <div className="p-4 border rounded-lg bg-white/50 dark:bg-gray-900/50">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Comprehensive Analysis Set
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {recommendations.slice(0, 4).map((vendorId) => {
                      const vendor = getVendorData(vendorId)
                      return vendor ? (
                        <Badge key={vendorId} variant="outline" className="flex items-center gap-1">
                          {getVendorIcon(vendor)}
                          {vendor.name}
                        </Badge>
                      ) : null
                    })}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Compare market leaders and innovative solutions to make an informed decision. This set covers
                    different deployment models, price points, and feature sets.
                  </p>
                </div>

                {/* Budget-Conscious */}
                <div className="p-4 border rounded-lg bg-white/50 dark:bg-gray-900/50">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Budget-Conscious Selection
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {Object.entries(COMPREHENSIVE_VENDOR_DATA)
                      .filter(([_, vendor]) => {
                        const basePrice = vendor.licensing?.base?.[0]?.listPrice || 0
                        return basePrice < 50 || basePrice === 0
                      })
                      .slice(0, 3)
                      .map(([vendorId, vendor]) => (
                        <Badge key={vendorId} variant="outline" className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {vendor.name}
                        </Badge>
                      ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Cost-effective solutions that still provide essential NAC capabilities. Consider total cost of
                    ownership including implementation and maintenance.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button onClick={handleSelectRecommended}>
                  <Zap className="h-4 w-4 mr-2" />
                  Use Expert Recommendations
                </Button>
                <Button variant="outline" onClick={() => setSelectedForComparison(recommendations.slice(0, 4))}>
                  <GitCompare className="h-4 w-4 mr-2" />
                  Compare Recommended
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Selection Guidance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Why These Recommendations?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Market Leadership</div>
                    <div className="text-sm text-muted-foreground">Proven track record and strong market position</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Feature Completeness</div>
                    <div className="text-sm text-muted-foreground">
                      Comprehensive NAC capabilities and modern features
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Total Cost of Ownership</div>
                    <div className="text-sm text-muted-foreground">Optimized for long-term value and ROI</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Customer Satisfaction</div>
                    <div className="text-sm text-muted-foreground">High ratings and positive feedback</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Selection Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Start with 3-5 Vendors</div>
                    <div className="text-sm text-muted-foreground">
                      Optimal number for thorough comparison without analysis paralysis
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Include Different Categories</div>
                    <div className="text-sm text-muted-foreground">
                      Mix cloud-native, enterprise, and specialized solutions
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Consider Your Requirements</div>
                    <div className="text-sm text-muted-foreground">
                      Match vendor capabilities to your specific needs
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Plan for Growth</div>
                    <div className="text-sm text-muted-foreground">
                      Choose solutions that scale with your organization
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Vendor Details Modal */}
      {selectedVendorDetails && (
        <VendorDetailsModal
          vendorId={selectedVendorDetails}
          isOpen={!!selectedVendorDetails}
          onClose={() => setSelectedVendorDetails(null)}
        />
      )}

      {/* Comparison Modal */}
      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-w-6xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Vendor Comparison</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh]">
            <VendorComparisonTable vendors={selectedForComparison} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
