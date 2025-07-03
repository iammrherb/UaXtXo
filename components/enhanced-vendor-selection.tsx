"use client"

import { Button } from "@/components/ui/button"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { getVendorLogoPath, ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  handleVendorToggle: (vendorId: string) => void
  darkMode: boolean
  onClearAll: () => void
  onSelectRecommended: () => void
}

const VendorCard = ({ vendorId, selectedVendors, handleVendorToggle, darkMode }: any) => {
  const isSelected = selectedVendors.includes(vendorId)
  const vendor = ComprehensiveVendorDatabase[vendorId]

  if (!vendor) return null

  return (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors hover:bg-secondary",
        isSelected ? "border-primary ring-2 ring-primary ring-offset-1" : "border-border",
      )}
      onClick={() => handleVendorToggle(vendorId)}
    >
      <div className="relative h-16 w-16 mb-2">
        <Image
          src={getVendorLogoPath(vendorId) || "/placeholder.svg"}
          alt={`${vendor.name} Logo`}
          layout="fill"
          objectFit="contain"
          className="rounded-md"
        />
      </div>
      <h3 className="text-sm font-semibold text-center">{vendor.name}</h3>
      {isSelected && (
        <div className="absolute top-1 right-1">
          <span className="inline-flex items-center rounded-md bg-green-500 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-green-600/20">
            Selected
          </span>
        </div>
      )}
    </div>
  )
}

export default function EnhancedVendorSelection({
  selectedVendors,
  handleVendorToggle,
  darkMode,
  onClearAll,
  onSelectRecommended,
}: EnhancedVendorSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [marketPositionFilter, setMarketPositionFilter] = useState("all")

  const filteredVendors = Object.entries(ComprehensiveVendorDatabase)
    .filter(([vendorId, vendor]) => {
      const searchTermMatch = searchTerm === "" || vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
      const categoryMatch = categoryFilter === "all" || vendor.category === categoryFilter
      const marketPositionMatch = marketPositionFilter === "all" || vendor.marketPosition === marketPositionFilter
      return searchTermMatch && categoryMatch && marketPositionMatch
    })
    .sort(([, a], [, b]) => a.name.localeCompare(b.name))

  const handleClearSearch = () => {
    setSearchTerm("")
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Vendors</h2>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search vendors..."
          className="w-full px-4 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background border-border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button onClick={handleClearSearch} className="px-3 py-1 rounded-md bg-muted hover:bg-accent text-sm">
            Clear
          </button>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <select
          className="px-3 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background border-border"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="enterprise">Enterprise</option>
          <option value="mid-market">Mid-Market</option>
          <option value="sme">SME</option>
          <option value="cloud-native">Cloud-Native</option>
          <option value="open-source">Open Source</option>
        </select>

        <select
          className="px-3 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background border-border"
          value={marketPositionFilter}
          onChange={(e) => setMarketPositionFilter(e.target.value)}
        >
          <option value="all">All Positions</option>
          <option value="leader">Leader</option>
          <option value="challenger">Challenger</option>
          <option value="visionary">Visionary</option>
          <option value="niche">Niche</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredVendors.map(([vendorId]) => (
          <VendorCard
            key={vendorId}
            vendorId={vendorId}
            selectedVendors={selectedVendors}
            handleVendorToggle={handleVendorToggle}
            darkMode={darkMode}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onClearAll}>
          Clear All
        </Button>
        <Button variant="secondary" size="sm" onClick={onSelectRecommended}>
          Select Recommended
        </Button>
      </div>
    </div>
  )
}
