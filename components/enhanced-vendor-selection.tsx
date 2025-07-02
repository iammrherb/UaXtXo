"use client"

import type React from "react"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ComprehensiveVendorDatabase,
  getVendorLogoPath,
  searchVendors,
  getVendorsByCategory,
  type VendorData,
} from "@/lib/comprehensive-vendor-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  Search,
  X,
  Check,
  Star,
  Users,
  Building,
  Cloud,
  Shield,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Info,
  Trash2,
} from "lucide-react"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  onVendorToggle: (vendorId: string) => void
  onClearAll: () => void
  onSelectRecommended: () => void
  darkMode?: boolean
}

const CATEGORY_ICONS: { [key: string]: React.ReactNode } = {
  "cloud-native": <Cloud className="h-4 w-4" />,
  enterprise: <Building className="h-4 w-4" />,
  "mid-market": <Users className="h-4 w-4" />,
  sme: <Star className="h-4 w-4" />,
}

const MARKET_POSITION_COLORS: { [key: string]: string } = {
  leader: "bg-green-500",
  challenger: "bg-blue-500",
  visionary: "bg-purple-500",
  niche: "bg-orange-500",
}

const RECOMMENDED_VENDORS = ["portnox", "cisco", "aruba", "meraki"]
const POPULAR_COMPARISONS = [
  { name: "Enterprise Leaders", vendors: ["portnox", "cisco", "fortinet"] },
  { name: "Cloud-First", vendors: ["portnox", "meraki", "microsoft"] },
  { name: "Mid-Market", vendors: ["portnox", "aruba", "extreme"] },
  { name: "Budget-Conscious", vendors: ["portnox", "packetfence", "foxpass"] },
]

const ALL_VENDORS = Object.values(ComprehensiveVendorDatabase).sort((a, b) => a.name.localeCompare(b.name))

export default function EnhancedVendorSelection({
  selectedVendors,
  onVendorToggle,
  onClearAll,
  onSelectRecommended,
  darkMode = false,
}: EnhancedVendorSelectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortBy, setSortBy] = useState("marketShare")

  const filteredVendors = useMemo(() => {
    let vendors: VendorData[] = [...ALL_VENDORS]

    // Apply search filter
    if (searchQuery.trim()) {
      vendors = searchVendors(searchQuery)
    }

    // Apply category filter
    if (activeCategory !== "all") {
      vendors = vendors.filter((vendor) => vendor.category === activeCategory)
    }

    // Sort vendors
    vendors.sort((a, b) => {
      switch (sortBy) {
        case "marketShare":
          return (b.marketShare || 0) - (a.marketShare || 0)
        case "npsScore":
          return (b.npsScore || 0) - (a.npsScore || 0)
        case "pricing":
          return (a.pricing?.basePrice || 0) - (b.pricing?.basePrice || 0)
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return vendors
  }, [searchQuery, activeCategory, sortBy])

  const categories = useMemo(() => {
    const cats = ["all", ...new Set(ALL_VENDORS.map((v) => v.category))]
    return cats.map((cat) => ({
      id: cat,
      name: cat === "all" ? "All Vendors" : cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " "),
      count: cat === "all" ? ALL_VENDORS.length : getVendorsByCategory(cat).length,
    }))
  }, [])

  const VendorCard = ({ vendor }: { vendor: VendorData }) => {
    const isSelected = selectedVendors.includes(vendor.id)
    const isPortnox = vendor.id === "portnox"

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -2 }}
        className="relative"
      >
        <Card
          className={cn(
            "cursor-pointer transition-all duration-200 hover:shadow-lg",
            isSelected
              ? isPortnox
                ? "ring-2 ring-portnox-primary bg-portnox-primary/5"
                : "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20"
              : darkMode
                ? "hover:bg-gray-800 border-gray-700"
                : "hover:bg-gray-50 border-gray-200",
          )}
          onClick={() => onVendorToggle(vendor.id)}
        >
          {isSelected && (
            <div className="absolute -top-2 -right-2 z-10">
              <div className={cn("rounded-full p-1", isPortnox ? "bg-portnox-primary" : "bg-blue-500")}>
                <Check className="h-3 w-3 text-white" />
              </div>
            </div>
          )}

          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={getVendorLogoPath(vendor.id) || "/placeholder.svg"}
                    alt={`${vendor.name} logo`}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain rounded-md"
                  />
                  {isPortnox && (
                    <div className="absolute -top-1 -right-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm font-semibold truncate">{vendor.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className={cn("text-xs px-1.5 py-0.5", darkMode ? "border-gray-600" : "border-gray-300")}
                    >
                      {CATEGORY_ICONS[vendor.category] || <Star className="h-4 w-4" />}
                      <span className="ml-1 capitalize">{vendor.category.replace("-", " ")}</span>
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {vendor.marketPosition && (
                  <div
                    className={cn("w-2 h-2 rounded-full", MARKET_POSITION_COLORS[vendor.marketPosition])}
                    title={`Market Position: ${vendor.marketPosition}`}
                  />
                )}
                {vendor.marketShare !== undefined ? (
                  <span className="text-xs text-gray-500">{vendor.marketShare.toFixed(1)}%</span>
                ) : (
                  <span className="text-xs text-gray-500">N/A</span>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{vendor.description || ""}</p>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3 text-green-500" />
                <span className="text-xs font-medium">${vendor.pricing?.basePrice || "N/A"}/mo</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-blue-500" />
                <span className="text-xs">{vendor.implementation?.deploymentTime?.fullDeployment || "N/A"}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-purple-500" />
                <span className="text-xs">NPS {vendor.npsScore || "N/A"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-orange-500" />
                <span className="text-xs">{vendor.compliance?.frameworks?.length || 0} frameworks</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {(vendor.strengths || []).slice(0, 2).map((strength: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {strength}
                </Badge>
              ))}
              {vendor.strengths && vendor.strengths.length > 2 && (
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  +{vendor.strengths.length - 2}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <Card className={cn("h-fit", darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200")}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Vendor Selection</CardTitle>
          <Badge variant="outline" className="text-xs">
            {selectedVendors.length} selected
          </Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onSelectRecommended} className="flex-1 text-xs bg-transparent">
            <Star className="h-3 w-3 mr-1" />
            Recommended
          </Button>
          <Button variant="outline" size="sm" onClick={onClearAll} className="flex-1 text-xs bg-transparent">
            <Trash2 className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-4">
          <TabsList className="grid w-full grid-cols-2 h-auto p-1">
            {categories.slice(0, 4).map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-xs py-1.5 data-[state=active]:bg-portnox-primary data-[state=active]:text-white"
              >
                {category.name}
                <Badge variant="secondary" className="ml-1 text-xs px-1">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Sort Options */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-gray-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={cn(
              "text-xs border rounded px-2 py-1",
              darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300",
            )}
          >
            <option value="marketShare">Market Share</option>
            <option value="npsScore">NPS Score</option>
            <option value="pricing">Price</option>
            <option value="name">Name</option>
          </select>
        </div>

        {/* Popular Comparisons */}
        {!searchQuery && activeCategory === "all" && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Popular Comparisons</h4>
            <div className="grid grid-cols-2 gap-2">
              {POPULAR_COMPARISONS.map((comparison) => (
                <Button
                  key={comparison.name}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    comparison.vendors.forEach((vendorId) => {
                      if (!selectedVendors.includes(vendorId)) {
                        onVendorToggle(vendorId)
                      }
                    })
                  }}
                  className="text-xs h-8 justify-start"
                >
                  {comparison.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Separator className="mb-4" />

        {/* Vendor Grid */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </AnimatePresence>

          {filteredVendors.length === 0 && (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No vendors found matching your criteria</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("all")
                }}
                className="mt-2"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Selection Summary */}
        {selectedVendors.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">
                {selectedVendors.length} vendor{selectedVendors.length !== 1 ? "s" : ""} selected
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedVendors.map((vendorId) => {
                const vendor = ComprehensiveVendorDatabase[vendorId]
                return (
                  <Badge key={vendorId} variant={vendorId === "portnox" ? "default" : "secondary"} className="text-xs">
                    {vendor?.name || vendorId}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}

        {/* Info Note */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-md">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                <strong>Tip:</strong> Select 3-6 vendors for optimal comparison. Portnox is recommended as the baseline
                for all analyses.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
