"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Star, Building2, Cloud, Shield, Zap } from "lucide-react"
import { comprehensiveVendorData, getVendorLogoPath } from "@/lib/comprehensive-vendor-data"
import { cn } from "@/lib/utils"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  onVendorToggle: (vendorId: string) => void
  darkMode: boolean
  onClearAll: () => void
  onSelectRecommended: () => void
}

export default function EnhancedVendorSelection({
  selectedVendors,
  onVendorToggle,
  darkMode,
  onClearAll,
  onSelectRecommended,
}: EnhancedVendorSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [marketPositionFilter, setMarketPositionFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  // Filter vendors based on search and filters
  const filteredVendors = comprehensiveVendorData.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || vendor.category === categoryFilter
    const matchesPosition = marketPositionFilter === "all" || vendor.marketPosition === marketPositionFilter

    return matchesSearch && matchesCategory && matchesPosition
  })

  // Group vendors by category
  const vendorsByCategory = filteredVendors.reduce(
    (acc, vendor) => {
      if (!acc[vendor.category]) {
        acc[vendor.category] = []
      }
      acc[vendor.category].push(vendor)
      return acc
    },
    {} as Record<string, typeof filteredVendors>,
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "enterprise":
        return <Building2 className="h-4 w-4" />
      case "cloud-native":
        return <Cloud className="h-4 w-4" />
      case "mid-market":
        return <Zap className="h-4 w-4" />
      case "open-source":
        return <Shield className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  const getMarketPositionColor = (position: string) => {
    switch (position) {
      case "leader":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "challenger":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "visionary":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "niche":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const VendorCard = ({ vendor }: { vendor: (typeof comprehensiveVendorData)[0] }) => {
    const isSelected = selectedVendors.includes(vendor.id)
    const isPortnox = vendor.id === "portnox"

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <Card
          className={cn(
            "cursor-pointer transition-all duration-200 hover:shadow-md",
            isSelected && "ring-2 ring-primary ring-offset-2",
            isPortnox && "border-primary/50 bg-primary/5",
          )}
          onClick={() => onVendorToggle(vendor.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Checkbox checked={isSelected} onChange={() => onVendorToggle(vendor.id)} className="mt-1" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <img
                    src={getVendorLogoPath(vendor.id) || "/placeholder.svg"}
                    alt={`${vendor.name} logo`}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                  <h4 className="font-semibold text-sm truncate">{vendor.name}</h4>
                  {isPortnox && (
                    <Badge className="text-xs bg-primary/10 text-primary border-primary/20">Recommended</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{vendor.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {getCategoryIcon(vendor.category)}
                    <span className="text-xs text-muted-foreground capitalize">
                      {vendor.category.replace("-", " ")}
                    </span>
                  </div>
                  <Badge className={cn("text-xs", getMarketPositionColor(vendor.marketPosition))}>
                    {vendor.marketPosition}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onClearAll}>
              Clear All
            </Button>
            <Button size="sm" onClick={onSelectRecommended}>
              Select Recommended
            </Button>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 border rounded-lg bg-muted/50"
          >
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="cloud-native">Cloud Native</SelectItem>
                  <SelectItem value="mid-market">Mid Market</SelectItem>
                  <SelectItem value="sme">SME</SelectItem>
                  <SelectItem value="open-source">Open Source</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Market Position</label>
              <Select value={marketPositionFilter} onValueChange={setMarketPositionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Positions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="leader">Leader</SelectItem>
                  <SelectItem value="challenger">Challenger</SelectItem>
                  <SelectItem value="visionary">Visionary</SelectItem>
                  <SelectItem value="niche">Niche Player</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Selection Summary */}
      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
        <span className="text-sm text-muted-foreground">
          {selectedVendors.length} of {comprehensiveVendorData.length} vendors selected
        </span>
        <Badge variant="outline">{filteredVendors.length} shown</Badge>
      </div>

      {/* Vendor List */}
      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="category">By Category</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-3">
          <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="category" className="space-y-4">
          <div className="max-h-96 overflow-y-auto space-y-4">
            {Object.entries(vendorsByCategory).map(([category, vendors]) => (
              <div key={category}>
                <div className="flex items-center space-x-2 mb-3">
                  {getCategoryIcon(category)}
                  <h3 className="font-semibold text-sm capitalize">
                    {category.replace("-", " ")} ({vendors.length})
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3 ml-6">
                  {vendors.map((vendor) => (
                    <VendorCard key={vendor.id} vendor={vendor} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredVendors.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No vendors found matching your criteria</p>
        </div>
      )}
    </div>
  )
}
