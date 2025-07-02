"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  ComprehensiveVendorDatabase,
  getVendorLogoPath,
  getVendorsByCategory,
  searchVendors,
} from "@/lib/comprehensive-vendor-data"
import { cn } from "@/lib/utils"
import { Search, X } from "lucide-react"

const VENDOR_CATEGORIES = ["cloud-native", "enterprise", "mid-market", "sme", "open-source"]

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  handleVendorToggle: (vendorId: string) => void
  onClearAll: () => void
  onSelectRecommended: () => void
  darkMode: boolean
}

export default function EnhancedVendorSelection({
  selectedVendors,
  handleVendorToggle,
  onClearAll,
  onSelectRecommended,
  darkMode,
}: EnhancedVendorSelectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredVendors =
    searchQuery.length > 2
      ? searchVendors(searchQuery)
      : activeCategory === "all"
        ? Object.values(ComprehensiveVendorDatabase)
        : getVendorsByCategory(activeCategory)

  return (
    <Card className={cn("transition-colors", darkMode ? "bg-gray-900" : "bg-white")}>
      <CardHeader>
        <CardTitle>Select Vendors</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-7 w-7"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("all")}
          >
            All
          </Button>
          {VENDOR_CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="capitalize"
            >
              {cat.replace("-", " ")}
            </Button>
          ))}
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
          <AnimatePresence>
            {filteredVendors.map((vendor) => (
              <motion.div
                key={vendor.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Label
                  htmlFor={vendor.id}
                  className={cn(
                    "flex items-center p-3 rounded-md transition-colors cursor-pointer",
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100",
                    selectedVendors.includes(vendor.id) && "bg-primary/10",
                  )}
                >
                  <Checkbox
                    id={vendor.id}
                    checked={selectedVendors.includes(vendor.id)}
                    onCheckedChange={() => handleVendorToggle(vendor.id)}
                  />
                  <Image
                    src={getVendorLogoPath(vendor.id) || "/placeholder.svg"}
                    alt={`${vendor.name} logo`}
                    width={80}
                    height={20}
                    className="h-5 w-auto mx-3 object-contain"
                  />
                  <span className="flex-1 font-medium">{vendor.name}</span>
                </Label>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-4 pt-4 border-t">
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear All
          </Button>
          <Button variant="outline" size="sm" onClick={onSelectRecommended}>
            Select Recommended
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
