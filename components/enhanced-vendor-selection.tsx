"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
  Filter,
  Star,
  Shield,
  Cloud,
  Building2,
  AlertTriangle,
  CheckCircle2,
  X,
  Plus,
  Target,
  Zap,
  DollarSign,
} from "lucide-react"

import { getAllVendors, type VendorData } from "@/lib/comprehensive-vendor-data"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  onVendorChange: (vendors: string[]) => void
  maxSelections?: number
}

export default function EnhancedVendorSelection({
  selectedVendors,
  onVendorChange,
  maxSelections = 4,
}: EnhancedVendorSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [positionFilter, setPositionFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  const allVendors = getAllVendors()

  const filteredVendors = useMemo(() => {
    return allVendors.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = categoryFilter === "all" || vendor.category === categoryFilter
      const matchesPosition = positionFilter === "all" || vendor.marketPosition === positionFilter

      return matchesSearch && matchesCategory && matchesPosition
    })
  }, [allVendors, searchTerm, categoryFilter, positionFilter])

  const handleVendorToggle = (vendorId: string) => {
    if (selectedVendors.includes(vendorId)) {
      // Don't allow removing Portnox
      if (vendorId === "portnox") return
      onVendorChange(selectedVendors.filter((id) => id !== vendorId))
    } else {
      // Check max selections
      if (selectedVendors.length >= maxSelections) return
      onVendorChange([...selectedVendors, vendorId])
    }
  }

  const handleClearAll = () => {
    onVendorChange(["portnox"]) // Keep Portnox always selected
  }

  const handleSelectRecommended = () => {
    onVendorChange(["portnox", "cisco", "aruba", "forescout"])
  }

  const getVendorIcon = (vendor: VendorData) => {
    switch (vendor.category) {
      case "cloud-native":
        return <Cloud className="h-4 w-4 text-blue-500" />
      case "traditional":
        return <Building2 className="h-4 w-4 text-gray-500" />
      case "hybrid":
        return <Zap className="h-4 w-4 text-purple-500" />
      case "open-source":
        return <Star className="h-4 w-4 text-green-500" />
      default:
        return <Shield className="h-4 w-4 text-gray-400" />
    }
  }

  const getSecurityBadge = (vendor: VendorData) => {
    if (vendor.id === "ivanti") {
      return (
        <Badge variant="destructive" className="text-xs">
          ⚠️ CRITICAL RISK
        </Badge>
      )
    }
    if (vendor.security.securityRating >= 90) {
      return <Badge className="bg-green-600 text-xs">Excellent</Badge>
    }
    if (vendor.security.securityRating >= 80) {
      return <Badge className="bg-blue-600 text-xs">Good</Badge>
    }
    if (vendor.security.securityRating >= 70) {
      return (
        <Badge variant="secondary" className="text-xs">
          Fair
        </Badge>
      )
    }
    return (
      <Badge variant="destructive" className="text-xs">
        Poor
      </Badge>
    )
  }

  const getMarketPositionBadge = (position: VendorData["marketPosition"]) => {
    const badges = {
      leader: <Badge className="bg-green-600 text-xs">Leader</Badge>,
      challenger: <Badge className="bg-blue-600 text-xs">Challenger</Badge>,
      visionary: <Badge className="bg-purple-600 text-xs">Visionary</Badge>,
      niche: (
        <Badge variant="secondary" className="text-xs">
          Niche
        </Badge>
      ),
    }
    return badges[position]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Vendor Selection
          <Badge variant="outline" className="ml-auto">
            {selectedVendors.length}/{maxSelections} selected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {showFilters && (
            <div className="grid gap-4 md:grid-cols-2 p-4 border rounded-lg bg-muted/50">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="cloud-native">Cloud-Native</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="open-source">Open Source</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Market Position</label>
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Positions</SelectItem>
                    <SelectItem value="leader">Leader</SelectItem>
                    <SelectItem value="challenger">Challenger</SelectItem>
                    <SelectItem value="visionary">Visionary</SelectItem>
                    <SelectItem value="niche">Niche</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleSelectRecommended}>
            <Plus className="h-4 w-4 mr-1" />
            Recommended
          </Button>
          <Button variant="outline" size="sm" onClick={handleClearAll}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>

        {/* Selected Vendors Summary */}
        {selectedVendors.length > 0 && (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedVendors.map((vendorId) => {
                  const vendor = allVendors.find((v) => v.id === vendorId)
                  if (!vendor) return null
                  return (
                    <Badge key={vendorId} variant="secondary" className="flex items-center gap-1">
                      {vendor.name}
                      {vendorId !== "portnox" && (
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-destructive"
                          onClick={() => handleVendorToggle(vendorId)}
                        />
                      )}
                    </Badge>
                  )
                })}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Separator />

        {/* Vendor Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredVendors.map((vendor) => {
            const isSelected = selectedVendors.includes(vendor.id)
            const isPortnox = vendor.id === "portnox"
            const canSelect = selectedVendors.length < maxSelections || isSelected
            const isIvanti = vendor.id === "ivanti"

            return (
              <Card
                key={vendor.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? isPortnox
                      ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20"
                    : canSelect
                      ? "hover:ring-1 hover:ring-gray-300"
                      : "opacity-50 cursor-not-allowed"
                } ${isIvanti ? "border-red-500 bg-red-50 dark:bg-red-900/20" : ""}`}
                onClick={() => canSelect && handleVendorToggle(vendor.id)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getVendorIcon(vendor)}
                        <div>
                          <h3 className="font-semibold text-sm">{vendor.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            {getMarketPositionBadge(vendor.marketPosition)}
                            {getSecurityBadge(vendor)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {isPortnox && <Badge className="bg-blue-600 text-xs">Required</Badge>}
                        <Checkbox
                          checked={isSelected}
                          disabled={!canSelect || isPortnox}
                          className="data-[state=checked]:bg-green-600"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground line-clamp-2">{vendor.description}</p>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-blue-500" />
                        <span>Security: {vendor.security.securityRating}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-green-500" />
                        <span>${vendor.pricing.pricePerDevice}/device</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-purple-500" />
                        <span>{vendor.implementation.deploymentDays}d deploy</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-orange-500" />
                        <span>{vendor.security.cveCount} CVEs</span>
                      </div>
                    </div>

                    {/* Special Warnings */}
                    {isIvanti && (
                      <Alert className="border-red-500">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <AlertDescription className="text-xs text-red-700">
                          ⚠️ CRITICAL: Active nation-state exploitation. Immediate migration required.
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Portnox Highlight */}
                    {isPortnox && (
                      <div className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                        ✨ Zero CVEs • 30min deployment • 95% automation
                      </div>
                    )}

                    {/* Key Features */}
                    <div className="flex flex-wrap gap-1">
                      {vendor.features.zeroTrust && (
                        <Badge variant="outline" className="text-xs">
                          Zero Trust
                        </Badge>
                      )}
                      {vendor.features.cloudNative && (
                        <Badge variant="outline" className="text-xs">
                          Cloud
                        </Badge>
                      )}
                      {vendor.features.aiMl && (
                        <Badge variant="outline" className="text-xs">
                          AI/ML
                        </Badge>
                      )}
                      {vendor.features.iot && (
                        <Badge variant="outline" className="text-xs">
                          IoT
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-8">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold">No vendors found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
