"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertCircle, Check, ChevronDown, Cloud, Filter, Info, Search, Server, Shield, Star, X } from "lucide-react"
import Image from "next/image"

import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  onVendorToggle: (vendorId: string) => void
  onClearAll: () => void
  onSelectRecommended: () => void
  darkMode: boolean
}

export default function EnhancedVendorSelection({
  selectedVendors,
  onVendorToggle,
  onClearAll,
  onSelectRecommended,
  darkMode,
}: EnhancedVendorSelectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [filterDeployment, setFilterDeployment] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"name" | "marketShare" | "securityRating">("marketShare")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [activeTab, setActiveTab] = useState("all")

  const vendors = Object.values(ComprehensiveVendorDatabase)

  const filteredVendors = vendors.filter((vendor) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Category filter
    const matchesCategory = !filterCategory || vendor.category === filterCategory

    // Deployment filter
    const matchesDeployment = !filterDeployment || vendor.deploymentType === filterDeployment

    // Tab filter
    if (activeTab === "selected") {
      return matchesSearch && matchesCategory && matchesDeployment && selectedVendors.includes(vendor.id)
    } else if (activeTab === "cloud") {
      return matchesSearch && matchesCategory && vendor.deploymentType === "cloud"
    } else if (activeTab === "onprem") {
      return matchesSearch && matchesCategory && vendor.deploymentType === "on-premise"
    } else if (activeTab === "hybrid") {
      return matchesSearch && matchesCategory && vendor.deploymentType === "hybrid"
    }

    return matchesSearch && matchesCategory && matchesDeployment
  })

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (sortBy === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortBy === "marketShare") {
      return sortDirection === "asc" ? a.marketShare - b.marketShare : b.marketShare - a.marketShare
    } else {
      return sortDirection === "asc"
        ? a.security.securityRating - b.security.securityRating
        : b.security.securityRating - a.security.securityRating
    }
  })

  const handleSort = (newSortBy: "name" | "marketShare" | "securityRating") => {
    if (sortBy === newSortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(newSortBy)
      setSortDirection("desc")
    }
  }

  const handleFilterCategory = (category: string | null) => {
    setFilterCategory(category === filterCategory ? null : category)
  }

  const handleFilterDeployment = (deployment: string | null) => {
    setFilterDeployment(deployment === filterDeployment ? null : deployment)
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setFilterCategory(null)
    setFilterDeployment(null)
    setActiveTab("all")
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "leader":
        return "bg-blue-500 text-white"
      case "challenger":
        return "bg-green-500 text-white"
      case "visionary":
        return "bg-purple-500 text-white"
      case "niche":
        return "bg-orange-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getDeploymentIcon = (deploymentType: string) => {
    switch (deploymentType) {
      case "cloud":
        return <Cloud className="h-3 w-3 text-blue-500" />
      case "on-premise":
        return <Server className="h-3 w-3 text-gray-500" />
      case "hybrid":
        return (
          <div className="flex">
            <Cloud className="h-3 w-3 text-blue-500" />
            <Server className="h-3 w-3 text-gray-500 ml-0.5" />
          </div>
        )
      default:
        return <Server className="h-3 w-3" />
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-sm">Vendor Selection</h3>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs">
              {selectedVendors.length}/{vendors.length}
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Info className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Select vendors to compare</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 h-7 w-7 p-0"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                  <Filter className="h-3 w-3 mr-1" />
                  Filter
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <div className="p-2">
                  <h4 className="text-xs font-medium mb-1">Category</h4>
                  <div className="space-y-1">
                    {["leader", "challenger", "visionary", "niche"].map((category) => (
                      <div key={category} className="flex items-center">
                        <Checkbox
                          id={`category-${category}`}
                          checked={filterCategory === category}
                          onCheckedChange={() => handleFilterCategory(category)}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-xs ml-2 flex items-center gap-1 cursor-pointer"
                        >
                          <Badge className={`${getCategoryColor(category)} text-[10px] py-0 h-4`}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </Badge>
                        </label>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-2" />

                  <h4 className="text-xs font-medium mb-1">Deployment</h4>
                  <div className="space-y-1">
                    {["cloud", "on-premise", "hybrid"].map((deployment) => (
                      <div key={deployment} className="flex items-center">
                        <Checkbox
                          id={`deployment-${deployment}`}
                          checked={filterDeployment === deployment}
                          onCheckedChange={() => handleFilterDeployment(deployment)}
                        />
                        <label
                          htmlFor={`deployment-${deployment}`}
                          className="text-xs ml-2 flex items-center gap-1 cursor-pointer"
                        >
                          {getDeploymentIcon(deployment)}
                          <span>{deployment.charAt(0).toUpperCase() + deployment.slice(1)}</span>
                        </label>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-2" />

                  <Button variant="ghost" size="sm" className="w-full text-xs h-7" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                  <Star className="h-3 w-3 mr-1" />
                  Sort
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => handleSort("name")}>
                  <Check className={`mr-2 h-3 w-3 ${sortBy === "name" ? "opacity-100" : "opacity-0"}`} />
                  <span>Name</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("marketShare")}>
                  <Check className={`mr-2 h-3 w-3 ${sortBy === "marketShare" ? "opacity-100" : "opacity-0"}`} />
                  <span>Market Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("securityRating")}>
                  <Check className={`mr-2 h-3 w-3 ${sortBy === "securityRating" ? "opacity-100" : "opacity-0"}`} />
                  <span>Security Rating</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={onClearAll}>
              Clear All
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={onSelectRecommended}>
              Recommended
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-8">
            <TabsTrigger value="all" className="text-xs">
              All
            </TabsTrigger>
            <TabsTrigger value="selected" className="text-xs">
              Selected
            </TabsTrigger>
            <TabsTrigger value="cloud" className="text-xs">
              Cloud
            </TabsTrigger>
            <TabsTrigger value="onprem" className="text-xs">
              On-Prem
            </TabsTrigger>
            <TabsTrigger value="hybrid" className="text-xs">
              Hybrid
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Vendor List */}
      <div className="flex-1 overflow-y-auto p-2">
        {sortedVendors.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium mb-1">No vendors found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            <Button variant="outline" size="sm" className="mt-4 bg-transparent" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {sortedVendors.map((vendor) => {
              const isSelected = selectedVendors.includes(vendor.id)
              const isPortnox = vendor.id === "portnox"
              const hasWarning = vendor.id === "ivanti"

              return (
                <Card
                  key={vendor.id}
                  className={`overflow-hidden transition-all ${
                    isSelected
                      ? "ring-2 ring-blue-500 dark:ring-blue-400"
                      : "hover:border-blue-200 dark:hover:border-blue-800"
                  } ${isPortnox ? "bg-blue-50 dark:bg-blue-950/20" : ""}`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      {/* Logo */}
                      <div
                        className={`relative flex-shrink-0 w-10 h-10 rounded-md border overflow-hidden ${
                          darkMode ? "bg-gray-800" : "bg-white"
                        }`}
                      >
                        <Image
                          src={vendor.logo || "/placeholder.svg"}
                          alt={vendor.name}
                          width={40}
                          height={40}
                          className="object-contain p-1"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-sm flex items-center gap-1">
                              {vendor.name}
                              {isPortnox && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                              {hasWarning && <AlertCircle className="h-3 w-3 text-red-500" />}
                            </h3>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Badge
                                className={`${getCategoryColor(vendor.category)} text-[10px] py-0 h-4`}
                                variant="secondary"
                              >
                                {vendor.category.charAt(0).toUpperCase() + vendor.category.slice(1)}
                              </Badge>
                              <Badge variant="outline" className="text-[10px] py-0 h-4 flex items-center gap-0.5">
                                {getDeploymentIcon(vendor.deploymentType)}
                                <span className="capitalize">{vendor.deploymentType}</span>
                              </Badge>
                            </div>
                          </div>

                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => onVendorToggle(vendor.id)}
                            className={`${isPortnox ? "opacity-100" : ""}`}
                          />
                        </div>

                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{vendor.description}</p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Shield className="h-3 w-3 text-green-500" />
                              <span className="text-xs">{vendor.security.securityRating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs">{vendor.marketShare}%</span>
                            </div>
                          </div>

                          <div className="text-xs text-muted-foreground">${vendor.pricing.pricePerDevice}/device</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
