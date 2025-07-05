"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { getAllVendors, getVendorLogoPath } from "@/lib/comprehensive-vendor-data"
import {
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Star,
  Shield,
  Cloud,
  Server,
  Wifi,
  X,
  RotateCcw,
  Sparkles,
} from "lucide-react"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  handleVendorToggle: (vendorId: string) => void
  darkMode: boolean
  onClearAll: () => void
  onSelectRecommended: () => void
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "nac":
      return <Shield className="h-4 w-4" />
    case "certificate":
      return <Server className="h-4 w-4" />
    case "vpn":
      return <Wifi className="h-4 w-4" />
    default:
      return <Cloud className="h-4 w-4" />
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "nac":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "certificate":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "vpn":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "nac":
      return "Network Access Control"
    case "certificate":
      return "Certificate Management"
    case "vpn":
      return "VPN & Remote Access"
    default:
      return "Other"
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

  const vendors = getAllVendors()

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || vendor.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [vendors, searchTerm, categoryFilter])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(vendors.map((v) => v.category)))
    return cats.map((cat) => ({
      value: cat,
      label: getCategoryLabel(cat),
      count: vendors.filter((v) => v.category === cat).length,
    }))
  }, [vendors])

  const selectedCount = selectedVendors.length
  const maxSelections = 10

  return (
    <TooltipProvider>
      <Card className="h-fit">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Vendor Selection
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {selectedCount}/{maxSelections}
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

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1"
              >
                <Filter className="h-3 w-3" />
                Filters
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClearAll}
                className="flex items-center gap-1 bg-transparent"
              >
                <X className="h-3 w-3" />
                Clear
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onSelectRecommended}
                className="flex items-center gap-1 bg-transparent"
              >
                <Sparkles className="h-3 w-3" />
                Recommended
              </Button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pt-2 border-t">
                    <p className="text-sm font-medium text-muted-foreground">Category</p>
                    <div className="flex flex-wrap gap-1">
                      <Button
                        variant={categoryFilter === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCategoryFilter("all")}
                        className="text-xs h-7"
                      >
                        All ({vendors.length})
                      </Button>
                      {categories.map((category) => (
                        <Button
                          key={category.value}
                          variant={categoryFilter === category.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCategoryFilter(category.value)}
                          className="text-xs h-7 flex items-center gap-1"
                        >
                          {getCategoryIcon(category.value)}
                          {category.label} ({category.count})
                        </Button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            <AnimatePresence>
              {filteredVendors.map((vendor) => {
                const isSelected = selectedVendors.includes(vendor.id)
                const isPortnox = vendor.id === "portnox"

                return (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      "group relative rounded-lg border p-3 cursor-pointer transition-all duration-200",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/50 hover:bg-muted/50",
                      isPortnox && "ring-2 ring-primary/20",
                    )}
                    onClick={() => handleVendorToggle(vendor.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border flex items-center justify-center overflow-hidden">
                          <Image
                            src={getVendorLogoPath(vendor.id) || "/placeholder.svg"}
                            alt={`${vendor.name} logo`}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        <div className="absolute -top-1 -right-1">
                          {isSelected ? (
                            <CheckCircle2 className="h-4 w-4 text-primary bg-background rounded-full" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground bg-background rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-sm truncate">{vendor.name}</h3>
                          {isPortnox && (
                            <Badge variant="default" className="text-xs px-1.5 py-0">
                              <Star className="h-3 w-3 mr-1" />
                              Recommended
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{vendor.description}</p>

                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className={cn("text-xs", getCategoryColor(vendor.category))}>
                            {getCategoryIcon(vendor.category)}
                            <span className="ml-1">{getCategoryLabel(vendor.category)}</span>
                          </Badge>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="text-xs font-medium text-primary">
                                ${vendor.pricing.basePrice}
                                {vendor.pricing.model === "per_device" && "/device"}
                                {vendor.pricing.model === "per_user" && "/user"}
                                {vendor.pricing.model === "flat_rate" && "/month"}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-xs">
                                <p className="font-medium">{vendor.name} Pricing</p>
                                <p>Model: {vendor.pricing.model.replace("_", " ")}</p>
                                <p>Base Price: ${vendor.pricing.basePrice}</p>
                                {vendor.pricing.tiers && <p>Volume discounts available</p>}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {filteredVendors.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No vendors found matching your criteria</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("")
                    setCategoryFilter("all")
                  }}
                  className="mt-2"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset filters
                </Button>
              </div>
            )}
          </div>

          {selectedCount > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {selectedCount} vendor{selectedCount !== 1 ? "s" : ""} selected
                </span>
                <span>Max {maxSelections} vendors</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(selectedCount / maxSelections) * 100}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
