"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Search,
  Star,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Cloud,
  Server,
  Zap,
  Award,
  Target,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { ComprehensiveVendorDatabase, searchVendors, getVendorLogoPath } from "@/lib/comprehensive-vendor-data"
import type { VendorData } from "@/lib/comprehensive-vendor-data"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  onVendorToggle: (vendorId: string) => void
  onClearAll: () => void
  onSelectRecommended: () => void
  darkMode: boolean
}

const VendorCompactCard = ({
  vendor,
  isSelected,
  onToggle,
}: {
  vendor: VendorData
  isSelected: boolean
  onToggle: (id: string) => void
}) => {
  const [showDetails, setShowDetails] = useState(false)

  const getDeploymentIcon = (deployment: string) => {
    switch (deployment) {
      case "cloud":
        return <Cloud className="h-3 w-3" />
      case "onprem":
        return <Server className="h-3 w-3" />
      case "hybrid":
        return <Zap className="h-3 w-3" />
      default:
        return <Server className="h-3 w-3" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "leader":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "challenger":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "visionary":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "niche":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getSecurityRatingColor = (rating: number) => {
    if (rating >= 90) return "text-green-600"
    if (rating >= 80) return "text-yellow-600"
    if (rating >= 70) return "text-orange-600"
    return "text-red-600"
  }

  const isRecommended = vendor.id === "portnox"
  const isHighRisk = vendor.security.cveCount > 20 || vendor.security.securityRating < 70

  return (
    <Card
      className={`transition-all duration-200 ${
        isSelected
          ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20"
          : "hover:shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800/50"
      } ${isRecommended ? "border-green-500 shadow-md" : ""} ${isHighRisk ? "border-red-300" : ""}`}
    >
      <CardHeader className="pb-2 px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="relative flex-shrink-0">
              <Image
                src={getVendorLogoPath(vendor.id) || "/placeholder.svg"}
                alt={`${vendor.name} logo`}
                width={32}
                height={32}
                className="rounded object-contain bg-white p-0.5 border"
              />
              {isRecommended && (
                <div className="absolute -top-1 -right-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                </div>
              )}
              {isHighRisk && (
                <div className="absolute -top-1 -right-1">
                  <AlertTriangle className="h-3 w-3 text-red-500 fill-current" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <h3 className="font-medium text-sm truncate">{vendor.name}</h3>
                <Badge className={`${getCategoryColor(vendor.category)} text-xs px-1 py-0`}>
                  {vendor.category.charAt(0).toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  {getDeploymentIcon(vendor.deployment)}
                  {vendor.deployment}
                </span>
                <span>{vendor.marketShare}%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Collapsible open={showDetails} onOpenChange={setShowDetails}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
            <Checkbox checked={isSelected} onCheckedChange={() => onToggle(vendor.id)} />
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-4 gap-1 text-xs mt-2">
          <div className="text-center">
            <div className="font-medium">${vendor.pricing.pricePerDevice}</div>
            <div className="text-muted-foreground text-xs">$/mo</div>
          </div>
          <div className="text-center">
            <div className="font-medium">{vendor.implementation.deploymentTime.fullDeployment}</div>
            <div className="text-muted-foreground text-xs">deploy</div>
          </div>
          <div className="text-center">
            <div className={`font-medium ${getSecurityRatingColor(vendor.security.securityRating)}`}>
              {vendor.security.securityRating}
            </div>
            <div className="text-muted-foreground text-xs">security</div>
          </div>
          <div className="text-center">
            <div className="font-medium">{vendor.customerSatisfaction}%</div>
            <div className="text-muted-foreground text-xs">satisfaction</div>
          </div>
        </div>

        {/* Key Highlights */}
        {(isRecommended ||
          vendor.security.cveCount === 0 ||
          vendor.security.cveCount > 20 ||
          vendor.features.advanced.cloudNative) && (
          <div className="space-y-1 mt-2">
            {isRecommended && (
              <div className="flex items-center gap-1 p-1 bg-green-50 dark:bg-green-950/20 rounded text-xs">
                <Award className="h-3 w-3 text-green-600" />
                <span className="font-medium text-green-800 dark:text-green-200">Recommended</span>
              </div>
            )}

            {vendor.security.cveCount === 0 && (
              <div className="flex items-center gap-1 p-1 bg-blue-50 dark:bg-blue-950/20 rounded text-xs">
                <Shield className="h-3 w-3 text-blue-600" />
                <span className="font-medium text-blue-800 dark:text-blue-200">Zero CVEs</span>
              </div>
            )}

            {vendor.security.cveCount > 20 && (
              <div className="flex items-center gap-1 p-1 bg-red-50 dark:bg-red-950/20 rounded text-xs">
                <AlertTriangle className="h-3 w-3 text-red-600" />
                <span className="font-medium text-red-800 dark:text-red-200">High Risk</span>
              </div>
            )}

            {vendor.features.advanced.cloudNative && (
              <div className="flex items-center gap-1 p-1 bg-purple-50 dark:bg-purple-950/20 rounded text-xs">
                <Cloud className="h-3 w-3 text-purple-600" />
                <span className="font-medium text-purple-800 dark:text-purple-200">Cloud-Native</span>
              </div>
            )}
          </div>
        )}
      </CardHeader>

      <Collapsible open={showDetails} onOpenChange={setShowDetails}>
        <CollapsibleContent>
          <CardContent className="pt-0 px-3 pb-3">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-8">
                <TabsTrigger value="overview" className="text-xs">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="features" className="text-xs">
                  Features
                </TabsTrigger>
                <TabsTrigger value="pricing" className="text-xs">
                  Pricing
                </TabsTrigger>
                <TabsTrigger value="security" className="text-xs">
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-3 mt-3">
                <div>
                  <h4 className="font-medium mb-2 text-sm">Implementation</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Complexity:</span>
                      <Badge variant="outline" className="ml-1 text-xs">
                        {vendor.implementation.complexity}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Planning:</span>
                      <span className="ml-1">{vendor.implementation.deploymentTime.planning}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2 text-sm">Best For</h4>
                  <div className="flex flex-wrap gap-1">
                    {vendor.bestFor.slice(0, 3).map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h4 className="font-medium mb-2 text-sm text-green-600">Strengths</h4>
                    <ul className="text-xs space-y-1">
                      {vendor.pros.slice(0, 2).map((pro, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-sm text-red-600">Considerations</h4>
                    <ul className="text-xs space-y-1">
                      {vendor.cons.slice(0, 2).map((con, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-3 mt-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Core Features</h4>
                    <div className="space-y-1">
                      {Object.entries(vendor.features.core)
                        .slice(0, 4)
                        .map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between text-xs">
                            <span className="capitalize truncate">{key.replace(/([A-Z])/g, " $1")}</span>
                            {value ? (
                              <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                            ) : (
                              <div className="h-3 w-3 rounded-full bg-gray-300 flex-shrink-0" />
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Advanced Features</h4>
                    <div className="space-y-1">
                      {Object.entries(vendor.features.advanced)
                        .slice(0, 4)
                        .map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between text-xs">
                            <span className="capitalize truncate">{key.replace(/([A-Z])/g, " $1")}</span>
                            {value ? (
                              <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                            ) : (
                              <div className="h-3 w-3 rounded-full bg-gray-300 flex-shrink-0" />
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-3 mt-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Pricing Model</h4>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {vendor.pricing.model.charAt(0).toUpperCase() + vendor.pricing.model.slice(1)}
                    </Badge>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Base Price:</span>
                        <span className="font-medium">
                          {vendor.pricing.basePrice === 0 ? "Free" : `$${vendor.pricing.basePrice.toLocaleString()}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Per Device:</span>
                        <span className="font-medium">${vendor.pricing.pricePerDevice}/mo</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Additional Costs</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Hardware:</span>
                        <span className="font-medium">
                          {vendor.pricing.additionalCosts.hardware === 0
                            ? "None"
                            : `$${vendor.pricing.additionalCosts.hardware.toLocaleString()}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Services:</span>
                        <span className="font-medium">
                          {vendor.pricing.additionalCosts.services === 0
                            ? "None"
                            : `$${vendor.pricing.additionalCosts.services.toLocaleString()}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-3 mt-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Security Rating</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Overall Score</span>
                          <span className={`font-medium ${getSecurityRatingColor(vendor.security.securityRating)}`}>
                            {vendor.security.securityRating}/100
                          </span>
                        </div>
                        <Progress value={vendor.security.securityRating} className="h-1" />
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span>CVE Count:</span>
                          <span
                            className={
                              vendor.security.cveCount === 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"
                            }
                          >
                            {vendor.security.cveCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Compliance</h4>
                    <div className="flex flex-wrap gap-1">
                      {vendor.security.complianceSupport.slice(0, 4).map((framework, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {framework}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

export default function EnhancedVendorSelection({
  selectedVendors,
  onVendorToggle,
  onClearAll,
  onSelectRecommended,
  darkMode,
}: EnhancedVendorSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("marketShare")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterDeployment, setFilterDeployment] = useState("all")

  const filteredAndSortedVendors = useMemo(() => {
    let vendors = searchTerm ? searchVendors(searchTerm) : Object.values(ComprehensiveVendorDatabase)

    // Apply filters
    if (filterCategory !== "all") {
      vendors = vendors.filter((vendor) => vendor.category === filterCategory)
    }

    if (filterDeployment !== "all") {
      vendors = vendors.filter((vendor) => vendor.deployment === filterDeployment)
    }

    // Apply sorting
    vendors.sort((a, b) => {
      switch (sortBy) {
        case "marketShare":
          return b.marketShare - a.marketShare
        case "security":
          return b.security.securityRating - a.security.securityRating
        case "satisfaction":
          return b.customerSatisfaction - a.customerSatisfaction
        case "price":
          return a.pricing.pricePerDevice - b.pricing.pricePerDevice
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    // Put Portnox first if it's in the results
    const portnoxIndex = vendors.findIndex((v) => v.id === "portnox")
    if (portnoxIndex > 0) {
      const portnox = vendors.splice(portnoxIndex, 1)[0]
      vendors.unshift(portnox)
    }

    return vendors
  }, [searchTerm, sortBy, filterCategory, filterDeployment])

  const vendorStats = useMemo(() => {
    const total = filteredAndSortedVendors.length
    const selected = selectedVendors.length
    const categories = {
      leader: filteredAndSortedVendors.filter((v) => v.category === "leader").length,
      challenger: filteredAndSortedVendors.filter((v) => v.category === "challenger").length,
      visionary: filteredAndSortedVendors.filter((v) => v.category === "visionary").length,
      niche: filteredAndSortedVendors.filter((v) => v.category === "niche").length,
    }
    const deployments = {
      cloud: filteredAndSortedVendors.filter((v) => v.deployment === "cloud").length,
      hybrid: filteredAndSortedVendors.filter((v) => v.deployment === "hybrid").length,
      onprem: filteredAndSortedVendors.filter((v) => v.deployment === "onprem").length,
    }
    return { total, selected, categories, deployments }
  }, [filteredAndSortedVendors, selectedVendors])

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 space-y-3 border-b bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span className="font-medium text-sm">Vendors</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {vendorStats.selected}/{vendorStats.total}
          </Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-7 h-8 text-sm"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-1">
          <Button size="sm" variant="default" onClick={onSelectRecommended} className="flex-1 h-7 text-xs">
            <Star className="h-3 w-3 mr-1" />
            Recommended
          </Button>
          <Button size="sm" variant="outline" onClick={onClearAll} className="h-7 text-xs bg-transparent">
            Clear
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-3 gap-1">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="h-7 text-xs">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="leader">Leaders</SelectItem>
              <SelectItem value="challenger">Challengers</SelectItem>
              <SelectItem value="visionary">Visionaries</SelectItem>
              <SelectItem value="niche">Niche</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterDeployment} onValueChange={setFilterDeployment}>
            <SelectTrigger className="h-7 text-xs">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="cloud">Cloud</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="onprem">On-Prem</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-7 text-xs">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="marketShare">Market</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="satisfaction">Satisfaction</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Portnox Comparison */}
        <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded text-xs">
          <Image src="/portnox-logo.png" alt="Portnox" width={16} height={16} className="rounded" />
          <span className="font-medium text-green-800 dark:text-green-200">Compare vs Portnox CLEAR</span>
        </div>
      </div>

      {/* Vendor List */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-3 space-y-2">
            {filteredAndSortedVendors.length === 0 ? (
              <div className="text-center py-8">
                <Search className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-medium mb-1 text-sm">No vendors found</h3>
                <p className="text-xs text-muted-foreground">Try adjusting your filters</p>
              </div>
            ) : (
              filteredAndSortedVendors.map((vendor) => (
                <VendorCompactCard
                  key={vendor.id}
                  vendor={vendor}
                  isSelected={selectedVendors.includes(vendor.id)}
                  onToggle={onVendorToggle}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
