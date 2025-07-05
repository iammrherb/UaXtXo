"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getAllVendors } from "@/lib/comprehensive-vendor-data"
import { Search, Star, Cloud, Server, BinaryIcon as Hybrid, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  handleVendorToggle: (vendorId: string) => void
  darkMode: boolean
  onClearAll: () => void
  onSelectRecommended: () => void
}

export default function EnhancedVendorSelection({
  selectedVendors,
  handleVendorToggle,
  darkMode,
  onClearAll,
  onSelectRecommended,
}: EnhancedVendorSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterByCategory, setFilterByCategory] = useState<string>("all")

  const vendors = getAllVendors()

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterByCategory === "all" || vendor.category === filterByCategory

    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "nac":
        return <Server className="h-4 w-4" />
      case "certificate":
        return <Cloud className="h-4 w-4" />
      case "vpn":
        return <Hybrid className="h-4 w-4" />
      default:
        return <Server className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "nac":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "certificate":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "vpn":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "nac":
        return "NAC"
      case "certificate":
        return "Certificate"
      case "vpn":
        return "VPN"
      default:
        return category.toUpperCase()
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Vendor Selection</CardTitle>
          <Badge variant="outline">{selectedVendors.length} selected</Badge>
        </div>

        {/* Search and Filter */}
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

          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterByCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterByCategory("all")}
            >
              All
            </Button>
            <Button
              variant={filterByCategory === "nac" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterByCategory("nac")}
            >
              <Server className="h-3 w-3 mr-1" />
              NAC
            </Button>
            <Button
              variant={filterByCategory === "certificate" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterByCategory("certificate")}
            >
              <Cloud className="h-3 w-3 mr-1" />
              Certificate
            </Button>
            <Button
              variant={filterByCategory === "vpn" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterByCategory("vpn")}
            >
              <Hybrid className="h-3 w-3 mr-1" />
              VPN
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onClearAll}>
            Clear All
          </Button>
          <Button variant="outline" size="sm" onClick={onSelectRecommended}>
            Recommended
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {filteredVendors.map((vendor) => {
          const isSelected = selectedVendors.includes(vendor.id)
          const isPortnox = vendor.id === "portnox"

          return (
            <div
              key={vendor.id}
              className={cn(
                "relative p-4 border rounded-lg cursor-pointer transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/50 hover:bg-muted/50",
                isPortnox && "ring-2 ring-primary/20",
              )}
              onClick={() => handleVendorToggle(vendor.id)}
            >
              <div className="flex items-start space-x-3">
                <Checkbox checked={isSelected} onChange={() => handleVendorToggle(vendor.id)} className="mt-1" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Image
                      src={vendor.logo || "/placeholder-logo.png"}
                      alt={`${vendor.name} logo`}
                      width={24}
                      height={24}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-sm truncate">{vendor.name}</h4>
                        {isPortnox && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{vendor.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className={cn("text-xs", getCategoryColor(vendor.category))}>
                      {getCategoryIcon(vendor.category)}
                      <span className="ml-1">{getCategoryLabel(vendor.category)}</span>
                    </Badge>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-xs">
                          <div className="space-y-1">
                            <p className="font-medium">{vendor.name}</p>
                            <p className="text-xs">{vendor.description}</p>
                            <Separator className="my-1" />
                            <p className="text-xs">
                              Pricing:{" "}
                              {vendor.pricing.model === "per_device"
                                ? "Per Device"
                                : vendor.pricing.model === "per_user"
                                  ? "Per User"
                                  : "Flat Rate"}
                            </p>
                            <p className="text-xs">
                              Base: ${vendor.pricing.basePrice}
                              {vendor.pricing.model !== "flat_rate" ? "/month" : ""}
                            </p>
                            <p className="text-xs">Complexity: {vendor.complexity}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Pricing Preview */}
                  <div className="mt-2 text-xs text-muted-foreground">
                    <span className="font-medium">${vendor.pricing.basePrice}</span>
                    <span className="ml-1">
                      {vendor.pricing.model === "per_device"
                        ? "/device/month"
                        : vendor.pricing.model === "per_user"
                          ? "/user/month"
                          : "flat rate"}
                    </span>
                  </div>

                  {/* Key Features Preview */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {vendor.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                        {feature}
                      </Badge>
                    ))}
                    {vendor.features.length > 2 && (
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        +{vendor.features.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {isPortnox && (
                <div className="absolute top-2 right-2">
                  <Badge className="text-xs bg-primary">Recommended</Badge>
                </div>
              )}
            </div>
          )
        })}

        {filteredVendors.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No vendors found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
