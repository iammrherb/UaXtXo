"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ComprehensiveVendorDatabase, getVendorLogoPath } from "@/lib/comprehensive-vendor-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  Search,
  Filter,
  Star,
  Check,
  X,
  Cloud,
  Server,
  BinaryIcon as Hybrid,
  Zap,
  Award,
  TrendingUp,
  Globe,
  Crown,
} from "lucide-react"

interface VendorSelectionProps {
  selectedVendors: string[]
  onVendorToggle: (vendorId: string) => void
  onClearAll: () => void
  onSelectRecommended: () => void
  darkMode?: boolean
}

const VendorTypeIcons = {
  "cloud-native": <Cloud className="h-4 w-4" />,
  "on-premise": <Server className="h-4 w-4" />,
  hybrid: <Hybrid className="h-4 w-4" />,
  "cloud-managed": <Cloud className="h-4 w-4" />,
  "cloud-radius": <Cloud className="h-4 w-4" />,
  "open-source": <Server className="h-4 w-4" />,
}

const MarketPositionBadges = {
  Leader: { color: "bg-green-500", icon: <Crown className="h-3 w-3" /> },
  "Legacy Leader": { color: "bg-blue-500", icon: <Award className="h-3 w-3" /> },
  "Strong Contender": { color: "bg-purple-500", icon: <TrendingUp className="h-3 w-3" /> },
  Challenger: { color: "bg-orange-500", icon: <Zap className="h-3 w-3" /> },
  Emerging: { color: "bg-cyan-500", icon: <Star className="h-3 w-3" /> },
}

export default function EnhancedVendorSelection({
  selectedVendors,
  onVendorToggle,
  onClearAll,
  onSelectRecommended,
  darkMode = false,
}: VendorSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("recommended")

  const vendors = useMemo(() => {
    return Object.values(ComprehensiveVendorDatabase).filter((vendor) => vendor.id)
  }, [])

  const categories = useMemo(() => {
    const cats = new Set(vendors.map((v) => v.category))
    return Array.from(cats).sort()
  }, [vendors])

  const types = useMemo(() => {
    const typeSet = new Set(vendors.map((v) => v.type))
    return Array.from(typeSet).sort()
  }, [vendors])

  const filteredAndSortedVendors = useMemo(() => {
    const filtered = vendors.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || vendor.category === selectedCategory
      const matchesType = selectedType === "all" || vendor.type === selectedType

      return matchesSearch && matchesCategory && matchesType
    })

    // Sort vendors
    filtered.sort((a, b) => {
      if (sortBy === "recommended") {
        // Portnox first, then by market position
        if (a.id === "portnox") return -1
        if (b.id === "portnox") return 1
        const positionOrder = ["Leader", "Legacy Leader", "Strong Contender", "Challenger", "Emerging"]
        const aPos = positionOrder.indexOf(a.marketPosition || "")
        const bPos = positionOrder.indexOf(b.marketPosition || "")
        return aPos - bPos
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "category") {
        return a.category.localeCompare(b.category)
      } else if (sortBy === "type") {
        return a.type.localeCompare(b.type)
      }
      return 0
    })

    return filtered
  }, [vendors, searchTerm, selectedCategory, selectedType, sortBy])

  const recommendedVendors = ["portnox", "cisco", "aruba", "meraki"]

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Select Vendors to Compare</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Choose up to 6 vendors for comprehensive analysis. Portnox is included by default.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {selectedVendors.length}/6 selected
            </Badge>
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" onClick={onClearAll} className="gap-2 bg-transparent">
              <X className="h-4 w-4" />
              Clear All
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onSelectRecommended}
              className="gap-2 bg-gradient-to-r from-portnox-primary to-portnox-primaryDark"
            >
              <Star className="h-4 w-4" />
              Recommended
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search vendors by name, category, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <Card className={cn("p-4", darkMode ? "bg-gray-800 border-gray-700" : "bg-white")}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={cn(
                          "w-full p-2 border rounded-md text-sm",
                          darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300",
                        )}
                      >
                        <option value="all">All Categories</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Deployment Type</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className={cn(
                          "w-full p-2 border rounded-md text-sm",
                          darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300",
                        )}
                      >
                        <option value="all">All Types</option>
                        {types.map((type) => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={cn(
                          "w-full p-2 border rounded-md text-sm",
                          darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300",
                        )}
                      >
                        <option value="recommended">Recommended</option>
                        <option value="name">Name</option>
                        <option value="category">Category</option>
                        <option value="type">Type</option>
                      </select>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredAndSortedVendors.map((vendor, index) => {
              const isSelected = selectedVendors.includes(vendor.id)
              const isPortnox = vendor.id === "portnox"
              const isRecommended = recommendedVendors.includes(vendor.id)
              const marketBadge = MarketPositionBadges[vendor.marketPosition as keyof typeof MarketPositionBadges]

              return (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="h-full"
                >
                  <Card
                    className={cn(
                      "relative h-full cursor-pointer transition-all duration-300 hover:shadow-lg",
                      isSelected ? "ring-2 ring-portnox-primary bg-portnox-primary/5" : "hover:shadow-md",
                      isPortnox && "border-portnox-primary bg-gradient-to-br from-portnox-primary/10 to-transparent",
                      darkMode ? "bg-gray-800 border-gray-700" : "bg-white",
                    )}
                    onClick={() => onVendorToggle(vendor.id)}
                  >
                    {/* Selection Indicator */}
                    <div
                      className={cn(
                        "absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                        isSelected
                          ? "bg-portnox-primary border-portnox-primary"
                          : "border-gray-300 dark:border-gray-600",
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {isPortnox && (
                        <Badge className="bg-gradient-to-r from-portnox-primary to-portnox-primaryDark text-white text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          Recommended
                        </Badge>
                      )}
                      {isRecommended && !isPortnox && (
                        <Badge variant="secondary" className="text-xs">
                          Popular
                        </Badge>
                      )}
                      {marketBadge && (
                        <Badge className={cn("text-white text-xs", marketBadge.color)}>
                          {marketBadge.icon}
                          <span className="ml-1">{vendor.marketPosition}</span>
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-6 pt-16">
                      {/* Vendor Logo */}
                      <div className="flex items-center justify-center h-16 mb-4">
                        <Image
                          src={getVendorLogoPath(vendor.id) || "/placeholder.svg"}
                          alt={vendor.name}
                          width={120}
                          height={60}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg"
                          }}
                        />
                      </div>

                      {/* Vendor Info */}
                      <div className="text-center space-y-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{vendor.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{vendor.category}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-2">{vendor.description}</p>
                      </div>

                      {/* Vendor Details */}
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-400">Type:</span>
                          <div className="flex items-center gap-1">
                            {VendorTypeIcons[vendor.type]}
                            <span className="capitalize">{vendor.type.replace("-", " ")}</span>
                          </div>
                        </div>

                        {vendor.yearFounded && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Founded:</span>
                            <span>{vendor.yearFounded}</span>
                          </div>
                        )}

                        {vendor.headquarters && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">HQ:</span>
                            <span>{vendor.headquarters}</span>
                          </div>
                        )}

                        {vendor.globalPresence && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Presence:</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="flex items-center gap-1">
                                  <Globe className="h-3 w-3" />
                                  <span>{vendor.globalPresence.length} regions</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="text-xs">{vendor.globalPresence.join(", ")}</div>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        )}
                      </div>

                      {/* Quick Stats */}
                      {vendor.customerMetrics && (
                        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {vendor.customerMetrics.nps && (
                              <div className="text-center">
                                <div className="font-semibold text-portnox-primary">{vendor.customerMetrics.nps}</div>
                                <div className="text-gray-500 dark:text-gray-400">NPS</div>
                              </div>
                            )}
                            {vendor.customerMetrics.csat && (
                              <div className="text-center">
                                <div className="font-semibold text-portnox-primary">
                                  {vendor.customerMetrics.csat}/5
                                </div>
                                <div className="text-gray-500 dark:text-gray-400">CSAT</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredAndSortedVendors.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No vendors found</h3>
              <p className="text-sm">Try adjusting your search criteria or filters</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedType("all")
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Selection Summary */}
        {selectedVendors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-4 rounded-lg border",
              darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200",
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Selected for Comparison</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedVendors.length} vendor{selectedVendors.length !== 1 ? "s" : ""} selected
                </p>
              </div>
              <div className="flex items-center gap-2">
                {selectedVendors.slice(0, 4).map((vendorId) => {
                  const vendor = ComprehensiveVendorDatabase[vendorId]
                  return (
                    <Tooltip key={vendorId}>
                      <TooltipTrigger>
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center overflow-hidden">
                          <Image
                            src={getVendorLogoPath(vendorId) || "/placeholder.svg"}
                            alt={vendor?.name || vendorId}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{vendor?.name || vendorId}</TooltipContent>
                    </Tooltip>
                  )
                })}
                {selectedVendors.length > 4 && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium">
                    +{selectedVendors.length - 4}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </TooltipProvider>
  )
}
