"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Check, X, Star, Building, Cloud, Code, Zap } from "lucide-react"
import { ComprehensiveVendorDatabase, getVendorLogoPath, type VendorDetails } from "@/lib/comprehensive-vendor-data"
import { cn } from "@/lib/utils"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  handleVendorToggle: (vendorId: string) => void
  darkMode: boolean
  onClearAll: () => void
  onSelectRecommended: () => void
}

const categoryIcons = {
  enterprise: <Building className="h-4 w-4" />,
  "cloud-native": <Cloud className="h-4 w-4" />,
  "open-source": <Code className="h-4 w-4" />,
  "mid-market": <Zap className="h-4 w-4" />,
  sme: <Zap className="h-4 w-4" />,
}

const marketPositionColors = {
  leader: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  challenger: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  visionary: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  niche: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
}

export default function EnhancedVendorSelection({
  selectedVendors,
  handleVendorToggle,
  darkMode,
  onClearAll,
  onSelectRecommended,
}: EnhancedVendorSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const vendors = Object.values(ComprehensiveVendorDatabase)

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || vendor.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: "all", label: "All Vendors", count: vendors.length },
    { id: "enterprise", label: "Enterprise", count: vendors.filter((v) => v.category === "enterprise").length },
    { id: "cloud-native", label: "Cloud Native", count: vendors.filter((v) => v.category === "cloud-native").length },
    { id: "open-source", label: "Open Source", count: vendors.filter((v) => v.category === "open-source").length },
    { id: "mid-market", label: "Mid-Market", count: vendors.filter((v) => v.category === "mid-market").length },
  ]

  const recommendedVendors = ["portnox", "cisco", "aruba", "fortinet", "microsoft", "juniper"]

  const VendorCard = ({ vendor }: { vendor: VendorDetails }) => {
    const isSelected = selectedVendors.includes(vendor.id)
    const isRecommended = recommendedVendors.includes(vendor.id)

    return (
      <Card
        className={cn(
          "cursor-pointer transition-all duration-200 hover:shadow-md",
          isSelected && "ring-2 ring-primary bg-primary/5",
          "relative",
        )}
        onClick={() => handleVendorToggle(vendor.id)}
      >
        {isRecommended && (
          <div className="absolute -top-2 -right-2 z-10">
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            >
              <Star className="h-3 w-3 mr-1" />
              Recommended
            </Badge>
          </div>
        )}
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src={getVendorLogoPath(vendor.id) || "/placeholder.svg"}
                  alt={`${vendor.name} logo`}
                  width={40}
                  height={40}
                  className="rounded-lg object-contain"
                />
                {isSelected && (
                  <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">{vendor.name}</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className={cn("text-xs", marketPositionColors[vendor.marketPosition])}>
                    {vendor.marketPosition}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {categoryIcons[vendor.category]}
                    <span className="ml-1 capitalize">{vendor.category.replace("-", " ")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-xs text-muted-foreground line-clamp-2">{vendor.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {vendor.licensing.base.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  From ${vendor.licensing.base[0].listPrice}/{vendor.licensing.base[0].unit}
                </Badge>
              )}
            </div>
            <Button
              size="sm"
              variant={isSelected ? "default" : "outline"}
              className="h-7 text-xs"
              onClick={(e) => {
                e.stopPropagation()
                handleVendorToggle(vendor.id)
              }}
            >
              {isSelected ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
              {isSelected ? "Selected" : "Select"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Vendor Selection</CardTitle>
          <Badge variant="secondary">{selectedVendors.length} selected</Badge>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={onSelectRecommended} className="text-xs bg-transparent">
            <Star className="h-3 w-3 mr-1" />
            Recommended
          </Button>
          <Button size="sm" variant="outline" onClick={onClearAll} className="text-xs bg-transparent">
            Clear All
          </Button>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-3 h-auto">
            {categories.slice(0, 3).map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs py-2 flex flex-col">
                <span>{category.label}</span>
                <span className="text-xs text-muted-foreground">({category.count})</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsList className="grid w-full grid-cols-2 h-auto mt-2">
            {categories.slice(3).map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs py-2 flex flex-col">
                <span>{category.label}</span>
                <span className="text-xs text-muted-foreground">({category.count})</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <ScrollArea className="h-[600px]">
          <div className="space-y-3">
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
            {filteredVendors.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2" />
                <p>No vendors found matching your criteria</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
