"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getAllVendors, getVendorLogoPath, type VendorData } from "@/lib/comprehensive-vendor-data"
import { cn } from "@/lib/utils"
import {
  Search,
  Filter,
  Star,
  TrendingUp,
  Shield,
  Server,
  Smartphone,
  Wifi,
  Lock,
  Building,
  CheckCircle2,
  Info,
  Trash2,
  RotateCcw,
} from "lucide-react"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  handleVendorToggle: (vendorId: string) => void
  darkMode: boolean
  onClearAll: () => void
  onSelectRecommended: () => void
}

const getCategoryIcon = (category: VendorData["category"]) => {
  switch (category) {
    case "nac":
      return <Shield className="h-4 w-4" />
    case "certificate":
      return <Lock className="h-4 w-4" />
    case "vpn":
      return <Wifi className="h-4 w-4" />
    case "endpoint":
      return <Smartphone className="h-4 w-4" />
    case "siem":
      return <Server className="h-4 w-4" />
    case "firewall":
      return <Shield className="h-4 w-4" />
    default:
      return <Building className="h-4 w-4" />
  }
}

const getCategoryColor = (category: VendorData["category"]) => {
  switch (category) {
    case "nac":
      return "bg-blue-500/10 text-blue-600 border-blue-200"
    case "certificate":
      return "bg-green-500/10 text-green-600 border-green-200"
    case "vpn":
      return "bg-purple-500/10 text-purple-600 border-purple-200"
    case "endpoint":
      return "bg-orange-500/10 text-orange-600 border-orange-200"
    case "siem":
      return "bg-red-500/10 text-red-600 border-red-200"
    case "firewall":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-200"
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-200"
  }
}

const getCategoryLabel = (category: VendorData["category"]) => {
  switch (category) {
    case "nac":
      return "Network Access Control"
    case "certificate":
      return "Certificate Management"
    case "vpn":
      return "VPN & Remote Access"
    case "endpoint":
      return "Endpoint Security"
    case "siem":
      return "SIEM & Analytics"
    case "firewall":
      return "Firewall & Network Security"
    default:
      return "Other"
  }
}

const getComplexityColor = (complexity: string) => {
  switch (complexity) {
    case "low":
      return "text-green-600"
    case "medium":
      return "text-yellow-600"
    case "high":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

const getScalabilityIcon = (scalability: string) => {
  switch (scalability) {
    case "high":
      return <TrendingUp className="h-3 w-3 text-green-600" />
    case "medium":
      return <TrendingUp className="h-3 w-3 text-yellow-600" />
    case "low":
      return <TrendingUp className="h-3 w-3 text-red-600" />
    default:
      return <TrendingUp className="h-3 w-3 text-gray-600" />
  }
}

export default function EnhancedVendorSelection({
  selectedVendors,
  handleVendorToggle,
  darkMode,
  onClearAll,
  onSelectRecommended,
}: EnhancedVendorSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<"name" | "price" | "satisfaction" | "marketShare">("name")

  const vendors = getAllVendors()

  const filteredAndSortedVendors = useMemo(() => {
    const filtered = vendors.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || vendor.category === categoryFilter
      return matchesSearch && matchesCategory
    })

    // Sort vendors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.pricing.basePrice - b.pricing.basePrice
        case "satisfaction":
          return b.customerSatisfaction - a.customerSatisfaction
        case "marketShare":
          return b.marketShare - a.marketShare
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [vendors, searchTerm, categoryFilter, sortBy])

  const categories = Array.from(new Set(vendors.map((v) => v.category)))

  const VendorCard = ({ vendor }: { vendor: VendorData }) => {
    const isSelected = selectedVendors.includes(vendor.id)
    const isPortnox = vendor.id === "portnox"

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ scale: 1.02 }}
        className="relative"
      >
        <Card
          className={cn(
            "cursor-pointer transition-all duration-200 hover:shadow-lg",
            isSelected && "ring-2 ring-primary shadow-lg",
            isPortnox && "border-primary/50 bg-primary/5",
          )}
          onClick={() => handleVendorToggle(vendor.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={getVendorLogoPath(vendor.id) || "/placeholder.svg"}
                    alt={`${vendor.name} logo`}
                    width={40}
                    height={40}
                    className="rounded-lg object-contain"
                  />
                  {isPortnox && (
                    <div className="absolute -top-1 -right-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm font-semibold truncate">{vendor.name}</CardTitle>
                  <Badge variant="outline" className={cn("text-xs mt-1", getCategoryColor(vendor.category))}>
                    {getCategoryIcon(vendor.category)}
                    <span className="ml-1">{getCategoryLabel(vendor.category)}</span>
                  </Badge>
                </div>
              </div>
              <Checkbox checked={isSelected} onChange={() => handleVendorToggle(vendor.id)} className="mt-1" />
            </div>
          </CardHeader>

          <CardContent className="pt-0 space-y-3">
            <p className="text-xs text-muted-foreground line-clamp-2">{vendor.description}</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Pricing:</span>
                <span className="font-medium">
                  ${vendor.pricing.basePrice}
                  {vendor.pricing.model === "per_device" && "/device"}
                  {vendor.pricing.model === "per_user" && "/user"}
                  {vendor.pricing.model === "flat_rate" && "/month"}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Satisfaction:</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{vendor.customerSatisfaction.toFixed(1)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Complexity:</span>
                <span className={cn("font-medium capitalize", getComplexityColor(vendor.complexity))}>
                  {vendor.complexity}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Scalability:</span>
                <div className="flex items-center space-x-1">
                  {getScalabilityIcon(vendor.scalability)}
                  <span className="font-medium capitalize">{vendor.scalability}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Key Features:</div>
              <div className="flex flex-wrap gap-1">
                {vendor.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs px-1.5 py-0.5">
                    {feature}
                  </Badge>
                ))}
                {vendor.features.length > 3 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                          +{vendor.features.length - 3}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1">
                          {vendor.features.slice(3).map((feature, index) => (
                            <div key={index} className="text-xs">
                              {feature}
                            </div>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>

            {vendor.complianceFeatures.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Compliance:</div>
                <div className="flex flex-wrap gap-1">
                  {vendor.complianceFeatures.slice(0, 2).map((compliance, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs px-1.5 py-0.5 text-green-600 border-green-200"
                    >
                      <CheckCircle2 className="h-2 w-2 mr-1" />
                      {compliance}
                    </Badge>
                  ))}
                  {vendor.complianceFeatures.length > 2 && (
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                      +{vendor.complianceFeatures.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <TooltipProvider>
      <Card className="h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Vendor Selection</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {selectedVendors.length} selected
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="text-xs">
                <Filter className="h-3 w-3 mr-1" />
                Filters
              </Button>

              <div className="flex space-x-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onSelectRecommended}
                        className="text-xs bg-transparent"
                      >
                        <Star className="h-3 w-3 mr-1" />
                        Recommended
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select recommended vendors for comparison</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={onClearAll} className="text-xs bg-transparent">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Clear
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Clear all selections (except Portnox)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-3 overflow-hidden"
                >
                  <Separator />

                  <div className="space-y-2">
                    <label className="text-xs font-medium">Category:</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full text-xs border rounded px-2 py-1 bg-background"
                    >
                      <option value="all">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {getCategoryLabel(category)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium">Sort by:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full text-xs border rounded px-2 py-1 bg-background"
                    >
                      <option value="name">Name</option>
                      <option value="price">Price</option>
                      <option value="satisfaction">Customer Satisfaction</option>
                      <option value="marketShare">Market Share</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-3">
              <AnimatePresence>
                {filteredAndSortedVendors.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </AnimatePresence>

              {filteredAndSortedVendors.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Info className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">No vendors match your criteria</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("")
                      setCategoryFilter("all")
                    }}
                    className="mt-2 text-xs"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
