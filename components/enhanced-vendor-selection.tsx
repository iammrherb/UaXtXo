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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Search, X, Check, Star, Users, Building, Cloud, AlertCircle, Trash2, Briefcase } from "lucide-react"

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
  "platform-add-on": <Briefcase className="h-4 w-4" />,
  baseline: <div className="h-4 w-4" />,
}

const MARKET_POSITION_COLORS: { [key: string]: string } = {
  leader: "bg-green-500",
  challenger: "bg-blue-500",
  visionary: "bg-purple-500",
  niche: "bg-orange-500",
}

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

  const filteredVendors = useMemo(() => {
    let vendors: VendorData[] = [...ALL_VENDORS]
    if (searchQuery.trim()) {
      vendors = searchVendors(searchQuery)
    }
    if (activeCategory !== "all") {
      vendors = vendors.filter((vendor) => vendor.category === activeCategory)
    }
    return vendors.sort((a, b) => (b.marketShare || 0) - (a.marketShare || 0))
  }, [searchQuery, activeCategory])

  const categories = useMemo(() => {
    const cats = ["all", ...new Set(ALL_VENDORS.map((v) => v.category))]
    return cats.map((cat) => ({
      id: cat,
      name: cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " "),
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

          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
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
              <div className="flex flex-col items-end gap-1">
                {vendor.marketPosition && (
                  <div
                    className={cn("w-2 h-2 rounded-full", MARKET_POSITION_COLORS[vendor.marketPosition])}
                    title={`Market Position: ${vendor.marketPosition}`}
                  />
                )}
                <span className="text-xs text-gray-500">{(vendor.marketShare || 0).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <Card className={cn("h-fit", darkMode ? "bg-gray-800/90 border-gray-700" : "bg-white/90 border-gray-200")}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Vendor Selection</CardTitle>
          <Badge variant="outline" className="text-xs">
            {selectedVendors.length} / 6
          </Badge>
        </div>
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
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-4">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1">
            {categories.slice(0, 6).map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-xs py-1.5 data-[state=active]:bg-portnox-primary data-[state=active]:text-white"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
          <AnimatePresence>
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </AnimatePresence>
          {filteredVendors.length === 0 && (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No vendors found.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
