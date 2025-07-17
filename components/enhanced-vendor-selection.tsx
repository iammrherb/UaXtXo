"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ComprehensiveVendorDatabase, searchVendors, getVendorLogoPath } from "@/lib/comprehensive-vendor-data"
import type { VendorData } from "@/lib/comprehensive-vendor-data"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  onVendorToggle: (vendorId: string) => void
  onClearAll: () => void
  onSelectRecommended: () => void
  darkMode: boolean
}

const VendorItem = ({
  vendor,
  isSelected,
  onToggle,
}: {
  vendor: VendorData
  isSelected: boolean
  onToggle: (id: string) => void
}) => (
  <div
    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
      isSelected ? "bg-blue-100 dark:bg-blue-900/50" : "hover:bg-gray-100 dark:hover:bg-gray-800"
    }`}
    onClick={() => onToggle(vendor.id)}
    role="checkbox"
    aria-checked={isSelected}
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onToggle(vendor.id)
      }
    }}
  >
    <div className="flex items-center gap-3">
      <Image
        src={getVendorLogoPath(vendor.id) || "/placeholder.svg"}
        alt={`${vendor.name} logo`}
        width={32}
        height={32}
        className="rounded-md object-contain bg-white p-1"
      />
      <span className="font-medium">{vendor.name}</span>
    </div>
    <Checkbox checked={isSelected} tabIndex={-1} />
  </div>
)

export default function EnhancedVendorSelection({
  selectedVendors,
  onVendorToggle,
  onClearAll,
  onSelectRecommended,
}: EnhancedVendorSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVendors = useMemo(() => {
    if (!searchTerm) {
      return Object.values(ComprehensiveVendorDatabase)
    }
    return searchVendors(searchTerm)
  }, [searchTerm])

  const vendorCategories = useMemo(() => {
    const categories: { [key: string]: VendorData[] } = {
      Leaders: [],
      Challengers: [],
      Visionaries: [],
      "Niche Players": [],
    }
    filteredVendors.forEach((vendor) => {
      switch (vendor.category) {
        case "leader":
          categories["Leaders"].push(vendor)
          break
        case "challenger":
          categories["Challengers"].push(vendor)
          break
        case "visionary":
          categories["Visionaries"].push(vendor)
          break
        case "niche":
          categories["Niche Players"].push(vendor)
          break
      }
    })
    return categories
  }, [filteredVendors])

  return (
    <Card className="h-full flex flex-col border-r">
      <CardHeader className="border-b">
        <CardTitle>Select Vendors</CardTitle>
        <Input
          placeholder="Search vendors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2"
          aria-label="Search vendors"
        />
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="outline" onClick={onSelectRecommended}>
            Select Recommended
          </Button>
          <Button size="sm" variant="ghost" onClick={onClearAll}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {Object.entries(vendorCategories).map(([category, vendors]) =>
              vendors.length > 0 ? (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-3">{category}</h3>
                  <div className="space-y-1">
                    {vendors.map((vendor) => (
                      <VendorItem
                        key={vendor.id}
                        vendor={vendor}
                        isSelected={selectedVendors.includes(vendor.id)}
                        onToggle={onVendorToggle}
                      />
                    ))}
                  </div>
                </div>
              ) : null,
            )}
            {filteredVendors.length === 0 && <p className="text-center text-muted-foreground p-4">No vendors found.</p>}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
