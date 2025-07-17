"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import {
  Search,
  Star,
  X,
  ChevronDown,
  ChevronUp,
  Shield,
  Cloud,
  Building,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Zap,
  Award,
  TrendingUp,
  Filter,
} from "lucide-react"

import { ComprehensiveVendorDatabase, type VendorData } from "@/lib/comprehensive-vendor-data"
import AnimatedPortnoxLogo from "./animated-portnox-logo"

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
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [deploymentFilter, setDeploymentFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("marketShare")
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null)

  const vendors = Object.values(ComprehensiveVendorDatabase)

  const filteredAndSortedVendors = useMemo(() => {
    const filtered = vendors.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.features.core.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = categoryFilter === "all" || vendor.category === categoryFilter
      const matchesDeployment = deploymentFilter === "all" || vendor.deploymentType === deploymentFilter

      return matchesSearch && matchesCategory && matchesDeployment
    })

    // Sort vendors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "marketShare":
          return b.marketShare - a.marketShare
        case "security":
          return b.security.securityRating - a.security.securityRating
        case "satisfaction":
          return b.support.customerSatisfaction - a.support.customerSatisfaction
        case "price":
          return a.pricing.pricePerDevice - b.pricing.pricePerDevice
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return filtered
  }, [vendors, searchQuery, categoryFilter, deploymentFilter, sortBy])

  const getCategoryStats = () => {
    const stats = {
      all: vendors.length,
      leader: vendors.filter((v) => v.category === "leader").length,
      challenger: vendors.filter((v) => v.category === "challenger").length,
      visionary: vendors.filter((v) => v.category === "visionary").length,
      niche: vendors.filter((v) => v.category === "niche").length,
    }
    return stats
  }

  const getDeploymentStats = () => {
    const stats = {
      all: vendors.length,
      cloud: vendors.filter((v) => v.deploymentType === "cloud").length,
      "on-premise": vendors.filter((v) => v.deploymentType === "on-premise").length,
      hybrid: vendors.filter((v) => v.deploymentType === "hybrid").length,
    }
    return stats
  }

  const categoryStats = getCategoryStats()
  const deploymentStats = getDeploymentStats()

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "leader":
        return "bg-green-500"
      case "challenger":
        return "bg-blue-500"
      case "visionary":
        return "bg-purple-500"
      case "niche":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDeploymentIcon = (type: string) => {
    switch (type) {
      case "cloud":
        return <Cloud className="h-3 w-3" />
      case "on-premise":
        return <Building className="h-3 w-3" />
      case "hybrid":
        return <Zap className="h-3 w-3" />
      default:
        return null
    }
  }

  const getSecurityBadge = (vendor: VendorData) => {
    if (vendor.security.cveCount === 0) {
      return (
        <Badge variant="outline" className="text-green-600 border-green-600">
          Zero CVE
        </Badge>
      )
    } else if (vendor.security.cveCount > 20) {
      return <Badge variant="destructive">High Risk</Badge>
    } else if (vendor.security.cveCount > 10) {
      return <Badge variant="secondary">Medium Risk</Badge>
    }
    return <Badge variant="outline">Low Risk</Badge>
  }

  const VendorCard = ({ vendor }: { vendor: VendorData }) => {
    const isSelected = selectedVendors.includes(vendor.id)
    const isExpanded = expandedVendor === vendor.id
    const isPortnox = vendor.id === "portnox"
    const isHighRisk = vendor.security.cveCount > 20

    return (
      <Card
        className={`transition-all hover:shadow-md ${
          isSelected ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20" : ""
        } ${isHighRisk ? "border-red-200 bg-red-50/50 dark:bg-red-950/10" : ""}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Checkbox checked={isSelected} onCheckedChange={() => onVendorToggle(vendor.id)} className="mt-1" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-sm truncate">{vendor.name}</CardTitle>
                  {isPortnox && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <Badge variant="secondary" className="text-xs">
                        Recommended
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${getCategoryColor(vendor.category)} text-white border-none`}
                  >
                    {vendor.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                    {getDeploymentIcon(vendor.deploymentType)}
                    {vendor.deploymentType}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {vendor.marketShare}% share
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <CardDescription className="text-xs line-clamp-2">{vendor.description}</CardDescription>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-green-600" />
              <span>${vendor.pricing.pricePerDevice}/device</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-blue-600" />
              <span>{vendor.implementation.timeToDeployDays} days</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-purple-600" />
              <span>{vendor.security.securityRating}% secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-orange-600" />
              <span>{vendor.support.customerSatisfaction}% satisfied</span>
            </div>
          </div>

          {/* Security & Risk Indicators */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              {getSecurityBadge(vendor)}
              {isHighRisk && (
                <div className="flex items-center gap-1 text-red-600">
                  <AlertTriangle className="h-3 w-3" />
                  <span className="text-xs">High Risk</span>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandedVendor(isExpanded ? null : vendor.id)}
              className="h-6 px-2"
            >
              {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
          </div>
        </CardHeader>

        <Collapsible open={isExpanded}>
          <CollapsibleContent>
            <CardContent className="pt-0">
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

                <TabsContent value="overview" className="mt-3 space-y-3">
                  <div>
                    <h5 className="text-xs font-semibold mb-1">Implementation</h5>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Time to Deploy: {vendor.implementation.timeToDeployDays} days</div>
                      <div>Complexity: {vendor.implementation.complexity}</div>
                      <div>Training: {vendor.implementation.trainingHours} hours</div>
                      <div>
                        Professional Services:{" "}
                        {vendor.implementation.professionalServicesRequired ? "Required" : "Optional"}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h5 className="text-xs font-semibold mb-1">Best For</h5>
                    <div className="flex flex-wrap gap-1">
                      {vendor.bestFor.slice(0, 3).map((use, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {use}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold mb-1">Strengths</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {vendor.strengths.slice(0, 3).map((strength, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="mt-3 space-y-3">
                  <div>
                    <h5 className="text-xs font-semibold mb-2">Core Features</h5>
                    <div className="grid grid-cols-1 gap-1">
                      {vendor.features.core.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold mb-2">Advanced Features</h5>
                    <div className="grid grid-cols-1 gap-1">
                      {vendor.features.advanced.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <Award className="h-3 w-3 text-blue-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="mt-3 space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Base Price:</span>
                      <span className="font-medium">${vendor.pricing.basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Per Device:</span>
                      <span className="font-medium">${vendor.pricing.pricePerDevice}/device</span>
                    </div>
                    {vendor.pricing.minimumDevices && (
                      <div className="flex justify-between text-xs">
                        <span>Minimum Devices:</span>
                        <span className="font-medium">{vendor.pricing.minimumDevices}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h5 className="text-xs font-semibold mb-2">Additional Costs</h5>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Hardware:</span>
                        <span>${vendor.pricing.additionalCosts.hardware.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Services:</span>
                        <span>${vendor.pricing.additionalCosts.services.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Training:</span>
                        <span>${vendor.pricing.additionalCosts.training.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maintenance:</span>
                        <span>${vendor.pricing.additionalCosts.maintenance.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="mt-3 space-y-3">
                  <div>
                    <h5 className="text-xs font-semibold mb-2">Security Rating</h5>
                    <div className="flex items-center gap-2">
                      <Progress value={vendor.security.securityRating} className="flex-1 h-2" />
                      <span className="text-xs font-medium">{vendor.security.securityRating}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-medium">CVE Count:</span>
                      <div
                        className={`font-bold ${
                          vendor.security.cveCount === 0
                            ? "text-green-600"
                            : vendor.security.cveCount > 20
                              ? "text-red-600"
                              : "text-yellow-600"
                        }`}
                      >
                        {vendor.security.cveCount}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Zero Trust:</span>
                      <div className="font-bold text-blue-600">{vendor.security.zeroTrustMaturity}%</div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold mb-1">Compliance Support</h5>
                    <div className="flex flex-wrap gap-1">
                      {vendor.security.complianceSupport.slice(0, 4).map((framework, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {framework}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold mb-1">Support</h5>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Availability: {vendor.support.availability}</div>
                      <div>Response Time: {vendor.support.responseTime}</div>
                      <div>Satisfaction: {vendor.support.customerSatisfaction}%</div>
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

  return (
    <div className="h-full flex flex-col space-y-4 p-4">
      {/* Header with Portnox branding */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AnimatedPortnoxLogo width={20} height={20} showText={false} animate={false} />
          <span className="font-semibold text-sm">Vendor Selection</span>
        </div>
        <Badge variant="outline" className="text-xs">
          {selectedVendors.length} selected
        </Badge>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search vendors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onSelectRecommended}
          className="flex items-center gap-1 text-xs bg-transparent"
        >
          <Star className="h-3 w-3" />
          Recommended
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearAll}
          className="flex items-center gap-1 text-xs bg-transparent"
        >
          <X className="h-3 w-3" />
          Clear All
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Filter className="h-3 w-3" />
            <span className="text-xs font-medium">Category</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-xs">
            {Object.entries(categoryStats).map(([category, count]) => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(category)}
                className="h-7 text-xs justify-between"
              >
                <span className="capitalize">{category}</span>
                <Badge variant="secondary" className="text-xs h-4 px-1">
                  {count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-medium">Deployment</span>
          <div className="grid grid-cols-2 gap-1 text-xs">
            {Object.entries(deploymentStats).map(([deployment, count]) => (
              <Button
                key={deployment}
                variant={deploymentFilter === deployment ? "default" : "outline"}
                size="sm"
                onClick={() => setDeploymentFilter(deployment)}
                className="h-7 text-xs justify-between"
              >
                <span className="capitalize">{deployment}</span>
                <Badge variant="secondary" className="text-xs h-4 px-1">
                  {count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <span className="text-xs font-medium">Sort by</span>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="marketShare">Market Share</SelectItem>
            <SelectItem value="security">Security Rating</SelectItem>
            <SelectItem value="satisfaction">Customer Satisfaction</SelectItem>
            <SelectItem value="price">Price (Low to High)</SelectItem>
            <SelectItem value="name">Name (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Vendor List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredAndSortedVendors.length === 0 ? (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              No vendors match your current filters. Try adjusting your search criteria.
            </AlertDescription>
          </Alert>
        ) : (
          filteredAndSortedVendors.map((vendor) => <VendorCard key={vendor.id} vendor={vendor} />)
        )}
      </div>

      {/* Portnox Comparison Footer */}
      <div className="border-t pt-3">
        <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/20">
          <TrendingUp className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <div className="flex items-center gap-2 mb-1">
              <AnimatedPortnoxLogo width={16} height={16} showText={false} animate={false} />
              <strong>Portnox Advantage:</strong>
            </div>
            Zero CVEs, 95% Zero Trust maturity, 7-day deployment vs industry average 3-6 months.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
