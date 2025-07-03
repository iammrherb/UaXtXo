"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { useDashboardContext } from "@/context/DashboardContext"
import { useVendorData } from "@/hooks/useVendorData"
import { ChevronsUpDown, X, Users, Search, Filter } from "lucide-react"

export const VendorSelector: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  const { selectedVendors, toggleVendor, clearVendors } = useDashboardContext()
  const { getAllVendorIds, getVendor, isLoadingAllVendors } = useVendorData()

  const allVendorIds = getAllVendorIds()

  const filteredVendors = allVendorIds
    .map((id) => getVendor(id))
    .filter((vendor) => {
      if (!vendor) return false

      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesFilter = filterType === "all" || vendor.vendorType === filterType

      return matchesSearch && matchesFilter
    })

  const vendorTypes = Array.from(new Set(allVendorIds.map((id) => getVendor(id)?.vendorType).filter(Boolean)))

  const selectedVendorData = selectedVendors.map((id) => getVendor(id)).filter(Boolean)

  return (
    <div className="space-y-3">
      {/* Selected Vendors Display */}
      {selectedVendors.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {selectedVendorData.map((vendor) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 pr-1">
                  {vendor.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0.5 ml-1 hover:bg-blue-500/30"
                    onClick={() => toggleVendor(vendor.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
          {selectedVendors.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearVendors}
              className="h-6 px-2 text-xs text-slate-400 hover:text-red-400"
            >
              Clear All
            </Button>
          )}
        </div>
      )}

      {/* Vendor Selection Popover */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            disabled={isLoadingAllVendors}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {selectedVendors.length === 0
                ? "Select vendors..."
                : `${selectedVendors.length} vendor${selectedVendors.length !== 1 ? "s" : ""} selected`}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 bg-slate-800 border-slate-700" align="start">
          <Command className="bg-slate-800">
            <div className="flex items-center border-b border-slate-700 px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            {/* Filter by Type */}
            <div className="p-2 border-b border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-400">Filter by type:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                <Button
                  variant={filterType === "all" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setFilterType("all")}
                  className="h-6 px-2 text-xs"
                >
                  All
                </Button>
                {vendorTypes.slice(0, 3).map((type) => (
                  <Button
                    key={type}
                    variant={filterType === type ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilterType(type)}
                    className="h-6 px-2 text-xs"
                  >
                    {type.replace(/[-_]/g, " ")}
                  </Button>
                ))}
              </div>
            </div>

            <CommandList>
              <CommandEmpty>No vendors found.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-64">
                  {filteredVendors.map((vendor) => (
                    <CommandItem
                      key={vendor.id}
                      value={vendor.id}
                      onSelect={() => toggleVendor(vendor.id)}
                      className="flex items-start gap-3 p-3 cursor-pointer hover:bg-slate-700"
                    >
                      <Checkbox checked={selectedVendors.includes(vendor.id)} className="mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white">{vendor.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {vendor.vendorType.replace(/[-_]/g, " ")}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">{vendor.shortDescription}</p>
                        {vendor.comparativeScores && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="text-xs text-slate-500">
                              Security: {vendor.comparativeScores.securityEffectiveness}/100
                            </div>
                            <div className="text-xs text-slate-500">
                              TCO: {vendor.comparativeScores.totalCostOfOwnershipScore}/100
                            </div>
                          </div>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Quick Selection Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            clearVendors()
            toggleVendor("portnox")
            toggleVendor("cisco_ise")
          }}
          className="text-xs bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
        >
          Portnox vs Cisco
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            clearVendors()
            toggleVendor("portnox")
            toggleVendor("aruba_clearpass")
            toggleVendor("fortinac")
          }}
          className="text-xs bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
        >
          Top 3 NAC
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            clearVendors()
            allVendorIds.slice(0, 5).forEach((id) => toggleVendor(id))
          }}
          className="text-xs bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
        >
          Top 5
        </Button>
      </div>
    </div>
  )
}
