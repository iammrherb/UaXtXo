"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AccessibleDropdown } from "@/components/ui/accessible-dropdown"
import { LoadingState, SkeletonCard } from "@/components/ui/loading-states"
import {
  Search,
  Filter,
  X,
  CheckCircle2,
  AlertTriangle,
  Cloud,
  Server,
  Hybrid,
  Star,
  TrendingUp,
  Shield,
  DollarSign,
  Users,
  Building,
  Zap,
  Award,
  AlertCircle,
  Info
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  onVendorToggle: (vendorId: string) => void
  onClearAll: () => void
  onSelectRecommended: () => void
  darkMode: boolean
}

const VENDOR_CATEGORIES = {
  leader: { icon: Star, color: "text-yellow-600", bg: "bg-yellow-50", label: "Market Leader" },
  challenger: { icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50", label: "Strong Challenger" },
  visionary: { icon: Zap, color: "text-purple-600", bg: "bg-purple-50", label: "Visionary" },
  niche: { icon: Building, color: "text-gray-600", bg: "bg-gray-50", label: "Niche Player" }
}

const DEPLOYMENT_TYPES = {
  cloud: { icon: Cloud, color: "text-green-600", label: "Cloud" },
  "on-premise": { icon: Server, color: "text-red-600", label: "On-Premise" },
  hybrid: { icon: Hybrid, color: "text-orange-600", label: "Hybrid" }
}

export default function EnhancedVendorSelection({
  selectedVendors,
  onVendorToggle,
  onClearAll,
  onSelectRecommended,
  darkMode
}: EnhancedVendorSelectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedDeployment, setSelectedDeployment] = useState<string>("")
  const [showOnlySelected, setShowOnlySelected] = useState(false)
  const [sortBy, setSortBy] = useState<string>("marketShare")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const vendors = useMemo(() => Object.values(ComprehensiveVendorDatabase), [])

  const filteredAndSortedVendors = useMemo(() => {
    let filtered = vendors.filter(vendor => {
      const matchesSearch = !searchQuery || 
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = !selectedCategory || vendor.category === selectedCategory
      const matchesDeployment = !selectedDeployment || vendor.deploymentType === selectedDeployment
      const matchesSelected = !showOnlySelected || selectedVendors.includes(vendor.id)

      return matchesSearch && matchesCategory && matchesDeployment && matchesSelected
    })

    // Sort vendors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "marketShare":
          return b.marketShare - a.marketShare
        case "name":
          return a.name.localeCompare(b.name)
        case "security":
          return b.security.securityRating - a.security.securityRating
        case "price":
          return a.pricing.pricePerDevice - b.pricing.pricePerDevice
        default:
          return 0
      }
    })

    return filtered
  }, [vendors, searchQuery, selectedCategory, selectedDeployment, showOnlySelected, sortBy, selectedVendors])

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "leader", label: "Market Leaders" },
    { value: "challenger", label: "Strong Challengers" },
    { value: "visionary", label: "Visionaries" },
    { value: "niche", label: "Niche Players" }
  ]

  const deploymentOptions = [
    { value: "", label: "All Deployment Types" },
    { value: "cloud", label: "Cloud-Native" },
    { value: "on-premise", label: "On-Premise" },
    { value: "hybrid", label: "Hybrid" }
  ]

  const sortOptions = [
    { value: "marketShare", label: "Market Share" },
    { value: "name", label: "Name" },
    { value: "security", label: "Security Rating" },
    { value: "price", label: "Price" }
  ]

  const getVendorIcon = (vendor: any) => {
    if (vendor.id === "portnox") return <Award className="h-5 w-5 text-green-600" />
    if (vendor.security.cveCount === 0) return <Shield className="h-5 w-5 text-blue-600" />
    if (vendor.security.cveCount > 20) return <AlertTriangle className="h-5 w-5 text-red-600" />
    return <CheckCircle2 className="h-5 w-5 text-gray-600" />
  }

  const getVendorStatus = (vendor: any) => {
    if (vendor.id === "ivanti") {
      return { type: "critical", message: "Security Risk - Migration Required", color: "text-red-600" }
    }
    if (vendor.id === "portnox") {
      return { type: "recommended", message: "Recommended Solution", color: "text-green-600" }
    }
    if (vendor.security.cveCount === 0) {
      return { type: "secure", message: "Zero CVE Record", color: "text-blue-600" }
    }
    if (vendor.security.cveCount > 20) {
      return { type: "warning", message: "High CVE Count", color: "text-orange-600" }
    }
    return { type: "standard", message: "Standard Option", color: "text-gray-600" }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setSelectedDeployment("")
    setShowOnlySelected(false)
    setSortBy("marketShare")
  }

  const hasActiveFilters = searchQuery || selectedCategory || selectedDeployment || showOnlySelected

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Vendor Selection</h3>
          <Badge variant="outline" className="text-xs">
            {selectedVendors.length} selected
          </Badge>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectRecommended}
            className="flex-1 text-xs"
            aria-label="Select recommended vendors"
          >
            <Star className="h-3 w-3 mr-1" />
            Recommended
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="flex-1 text-xs"
            aria-label="Clear all selections"
            disabled={selectedVendors.length === 0}
          >
            <X className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-sm"
            aria-label="Search vendors"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Filters */}
        <Tabs defaultValue="filters" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-8">
            <TabsTrigger value="filters" className="text-xs">
              <Filter className="h-3 w-3 mr-1" />
              Filters
            </TabsTrigger>
            <TabsTrigger value="sort" className="text-xs">
              Sort
            </TabsTrigger>
          </TabsList>

          <TabsContent value="filters" className="space-y-3 mt-3">
            <AccessibleDropdown
              options={categoryOptions}
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value as string)}
              placeholder="All Categories"
              ariaLabel="Filter by vendor category"
              showSearch={false}
            />

            <AccessibleDropdown
              options={deploymentOptions}
              value={selectedDeployment}
              onValueChange={(value) => setSelectedDeployment(value as string)}
              placeholder="All Deployment Types"
              ariaLabel="Filter by deployment type"
              showSearch={false}
            />

            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-selected"
                checked={showOnlySelected}
                onCheckedChange={setShowOnlySelected}
                aria-describedby="show-selected-desc"
              />
              <label
                htmlFor="show-selected"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show only selected
              </label>
            </div>
            <p id="show-selected-desc" className="text-xs text-muted-foreground">
              Filter to show only currently selected vendors
            </p>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="w-full text-xs"
                aria-label="Clear all filters"
              >
                <X className="h-3 w-3 mr-1" />
                Clear Filters
              </Button>
            )}
          </TabsContent>

          <TabsContent value="sort" className="mt-3">
            <AccessibleDropdown
              options={sortOptions}
              value={sortBy}
              onValueChange={(value) => setSortBy(value as string)}
              placeholder="Sort by..."
              ariaLabel="Sort vendors by"
              showSearch={false}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Vendor List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          <LoadingState
            loading={isLoading}
            error={error}
            onRetry={() => setError(null)}
            isEmpty={filteredAndSortedVendors.length === 0}
            emptyState={
              <div className="text-center py-8">
                <Info className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  {hasActiveFilters ? "No vendors match your filters" : "No vendors available"}
                </p>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="mt-2"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            }
            loadingComponent={
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonCard key={i} showAvatar lines={2} />
                ))}
              </div>
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredAndSortedVendors.map((vendor, index) => {
                const isSelected = selectedVendors.includes(vendor.id)
                const categoryInfo = VENDOR_CATEGORIES[vendor.category]
                const deploymentInfo = DEPLOYMENT_TYPES[vendor.deploymentType]
                const status = getVendorStatus(vendor)

                return (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        isSelected
                          ? "ring-2 ring-primary bg-primary/5"
                          : "hover:bg-muted/50"
                      } ${
                        vendor.id === "ivanti" ? "border-red-300 bg-red-50 dark:bg-red-950/20" : ""
                      }`}
                      onClick={() => onVendorToggle(vendor.id)}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      aria-label={`${isSelected ? 'Deselect' : 'Select'} ${vendor.name}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          onVendorToggle(vendor.id)
                        }
                      }}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2 flex-1">
                            {getVendorIcon(vendor)}
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-sm font-medium truncate">
                                {vendor.name}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${categoryInfo.color} border-current`}
                                >
                                  {categoryInfo.label}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${deploymentInfo.color} border-current`}
                                >
                                  <deploymentInfo.icon className="h-3 w-3 mr-1" />
                                  {deploymentInfo.label}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {isSelected && (
                              <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
                            )}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <CardDescription className="text-xs line-clamp-2 mb-3">
                          {vendor.description}
                        </CardDescription>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span>{vendor.marketShare.toFixed(1)}% market</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                            <span>${vendor.pricing.pricePerDevice}/device</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3 text-muted-foreground" />
                            <span>{vendor.security.securityRating}/100 security</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap className="h-3 w-3 text-muted-foreground" />
                            <span>{vendor.implementation.timeToDeployDays}d deploy</span>
                          </div>
                        </div>

                        {/* Status indicator */}
                        <div className={`mt-2 text-xs ${status.color} flex items-center gap-1`}>
                          {status.type === "critical" && <AlertCircle className="h-3 w-3" />}
                          {status.type === "recommended" && <Award className="h-3 w-3" />}
                          {status.type === "secure" && <Shield className="h-3 w-3" />}
                          {status.type === "warning" && <AlertTriangle className="h-3 w-3" />}
                          <span>{status.message}</span>
                        </div>

                        {/* Critical vendor warning */}
                        {vendor.id === "ivanti" && (
                          <Alert className="mt-2 border-red-300 bg-red-50 dark:bg-red-950/20">
                            <AlertTriangle className="h-3 w-3" />
                            <AlertDescription className="text-xs">
                              Active exploitation - immediate migration required
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </LoadingState>
        </div>
      </ScrollArea>

      {/* Footer Summary */}
      <div className="p-4 border-t bg-muted/30">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Total vendors:</span>
            <span>{vendors.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Filtered results:</span>
            <span>{filteredAndSortedVendors.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Selected:</span>
            <span className="font-medium text-primary">{selectedVendors.length}</span>
          </div>
        </div>

        {selectedVendors.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-muted-foreground mb-2">Selected vendors:</p>
            <div className="flex flex-wrap gap-1">
              {selectedVendors.map(vendorId => {
                const vendor = vendors.find(v => v.id === vendorId)
                return vendor ? (
                  <Badge
                    key={vendorId}
                    variant="secondary"
                    className="text-xs flex items-center gap-1"
                  >
                    {vendor.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-3 w-3 p-0 hover:bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        onVendorToggle(vendorId)
                      }}
                      aria-label={`Remove ${vendor.name}`}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </Badge>
                ) : null
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}