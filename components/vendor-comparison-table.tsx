"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { COMPREHENSIVE_VENDOR_DATA } from "@/lib/vendors/comprehensive-vendor-data"
import {
  CheckCircle2,
  XCircle,
  MinusCircle,
  DollarSign,
  Clock,
  Users,
  Shield,
  Star,
  Building2,
  Cloud,
  Server,
  AlertTriangle,
  Download,
  FileText,
  Target,
} from "lucide-react"

interface VendorComparisonTableProps {
  vendors: string[]
}

export function VendorComparisonTable({ vendors }: VendorComparisonTableProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false)

  const vendorData = vendors.map((id) => COMPREHENSIVE_VENDOR_DATA[id]).filter(Boolean)

  if (vendorData.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Vendors Selected</h3>
          <p className="text-muted-foreground">Select vendors to see a detailed comparison.</p>
        </CardContent>
      </Card>
    )
  }

  const getFeatureIcon = (value: string) => {
    switch (value) {
      case "✓✓✓":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "✓✓":
        return <CheckCircle2 className="h-4 w-4 text-blue-600" />
      case "✓":
        return <MinusCircle className="h-4 w-4 text-yellow-600" />
      case "✗":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <span className="text-xs">{value}</span>
    }
  }

  const getFeatureScore = (features: Record<string, string>) => {
    const scores = { "✓✓✓": 100, "✓✓": 75, "✓": 50, "✗": 0 }
    const values = Object.values(features)
    const totalScore = values.reduce((sum, value) => sum + (scores[value as keyof typeof scores] || 0), 0)
    return values.length > 0 ? Math.round(totalScore / values.length) : 0
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cloud-native":
        return <Cloud className="h-4 w-4 text-blue-500" />
      case "enterprise":
        return <Building2 className="h-4 w-4 text-purple-500" />
      default:
        return <Server className="h-4 w-4 text-gray-500" />
    }
  }

  const getMarketPositionBadge = (position: string) => {
    const badges = {
      leader: { variant: "default" as const, color: "text-green-600", label: "Leader" },
      challenger: { variant: "secondary" as const, color: "text-blue-600", label: "Challenger" },
      visionary: { variant: "outline" as const, color: "text-purple-600", label: "Visionary" },
      niche: { variant: "outline" as const, color: "text-orange-600", label: "Niche" },
    }
    const badge = badges[position as keyof typeof badges] || badges.niche
    return (
      <Badge variant={badge.variant} className={`text-xs ${badge.color}`}>
        {badge.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Vendor Comparison</h2>
          <p className="text-muted-foreground">Detailed side-by-side analysis of {vendorData.length} vendors</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Comparison
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Vendor Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vendorData.map((vendor, index) => (
              <Card key={vendor.id} className={vendor.id === "portnox" ? "ring-2 ring-primary" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(vendor.category)}
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {vendor.name}
                          {vendor.id === "portnox" && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          {getMarketPositionBadge(vendor.marketPosition)}
                          <Badge variant="outline" className="text-xs capitalize">
                            {vendor.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>${vendor.licensing?.base?.[0]?.listPrice || "Contact"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="capitalize">{vendor.tcoFactors?.upgradeComplexity || "Medium"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span>{vendor.tcoFactors?.fteRequirement || 1} FTE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-orange-600" />
                      <span className="capitalize">{vendor.tcoFactors?.downtimeRisk || "Medium"}</span>
                    </div>
                  </div>

                  {/* Feature Scores */}
                  {vendor.featureSupport && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Feature Scores:</div>
                      {Object.entries(vendor.featureSupport).map(([category, features]) => {
                        const score = getFeatureScore(features)
                        return (
                          <div key={category} className="flex items-center justify-between">
                            <span className="text-xs capitalize">{category}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={score} className="w-16 h-2" />
                              <span className="text-xs w-8">{score}%</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Criteria</th>
                      {vendorData.map((vendor) => (
                        <th key={vendor.id} className="text-center p-3 font-medium min-w-32">
                          {vendor.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Market Position</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          {getMarketPositionBadge(vendor.marketPosition)}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Base Price</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          <span className="font-semibold">${vendor.licensing?.base?.[0]?.listPrice || "Contact"}</span>
                          <div className="text-xs text-muted-foreground">per device/year</div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Deployment</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          <div className="flex flex-col gap-1">
                            {vendor.hardware?.cloud && vendor.hardware.cloud.length > 0 && (
                              <Badge variant="outline" className="text-xs">
                                Cloud
                              </Badge>
                            )}
                            {vendor.hardware?.physical && vendor.hardware.physical.length > 0 && (
                              <Badge variant="outline" className="text-xs">
                                On-Premise
                              </Badge>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Implementation</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          <span className="capitalize">{vendor.tcoFactors?.upgradeComplexity || "Medium"}</span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">FTE Required</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          <span className="font-semibold">{vendor.tcoFactors?.fteRequirement || 1}</span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          {/* Pricing Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Licensing Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">License Tier</th>
                      {vendorData.map((vendor) => (
                        <th key={vendor.id} className="text-center p-3 font-medium min-w-40">
                          {vendor.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {["Base", "Professional", "Enterprise"].map((tier) => (
                      <tr key={tier} className="border-b">
                        <td className="p-3 font-medium">{tier}</td>
                        {vendorData.map((vendor) => {
                          const tierData =
                            vendor.licensing?.base?.find((t) => t.name.toLowerCase().includes(tier.toLowerCase())) ||
                            vendor.licensing?.base?.[0]

                          return (
                            <td key={vendor.id} className="p-3 text-center">
                              {tierData ? (
                                <div>
                                  <div className="font-semibold">
                                    {typeof tierData.listPrice === "number"
                                      ? `$${tierData.listPrice}`
                                      : tierData.listPrice}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    per {tierData.unit}/{tierData.period}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">N/A</span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* TCO Factors */}
          <Card>
            <CardHeader>
              <CardTitle>Total Cost of Ownership Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Cost Factor</th>
                      {vendorData.map((vendor) => (
                        <th key={vendor.id} className="text-center p-3 font-medium">
                          {vendor.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Hardware Required</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          {vendor.hardware?.physical && vendor.hardware.physical.length > 0 ? (
                            <Badge variant="outline" className="text-red-600">
                              Required
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-green-600">
                              None
                            </Badge>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Professional Services</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          {vendor.professionalServices?.vendor && vendor.professionalServices.vendor.length > 0 ? (
                            <span className="text-sm">{vendor.professionalServices.vendor[0].cost}</span>
                          ) : (
                            <span className="text-muted-foreground">Included</span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Training Cost</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          {vendor.professionalServices?.training && vendor.professionalServices.training.length > 0 ? (
                            <span className="text-sm">{vendor.professionalServices.training[0].cost}</span>
                          ) : (
                            <span className="text-muted-foreground">Minimal</span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">High Availability</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          <span className="text-sm">{vendor.highAvailability?.cost || "Extra cost"}</span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          {/* Feature Comparison by Category */}
          {vendorData[0]?.featureSupport &&
            Object.keys(vendorData[0].featureSupport).map((categoryKey) => {
              const categoryNames = {
                authentication: "Authentication & Identity",
                network: "Network Control",
                advanced: "Advanced Security",
                compliance: "Compliance & Reporting",
              }
              const categoryName = categoryNames[categoryKey as keyof typeof categoryNames] || categoryKey

              // Get all features in this category across all vendors
              const allFeatures = new Set<string>()
              vendorData.forEach((vendor) => {
                if (vendor.featureSupport?.[categoryKey]) {
                  Object.keys(vendor.featureSupport[categoryKey]).forEach((feature) => {
                    allFeatures.add(feature)
                  })
                }
              })

              const featuresArray = Array.from(allFeatures)

              return (
                <Card key={categoryKey}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{categoryName}</span>
                      <div className="flex items-center gap-2">
                        {vendorData.map((vendor) => {
                          const score = vendor.featureSupport?.[categoryKey]
                            ? getFeatureScore(vendor.featureSupport[categoryKey])
                            : 0
                          return (
                            <div key={vendor.id} className="text-center">
                              <div className="text-sm font-medium">{vendor.name}</div>
                              <Badge variant={score > 80 ? "default" : score > 60 ? "secondary" : "outline"}>
                                {score}%
                              </Badge>
                            </div>
                          )
                        })}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-medium">Feature</th>
                            {vendorData.map((vendor) => (
                              <th key={vendor.id} className="text-center p-3 font-medium">
                                {vendor.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {featuresArray.map((feature) => {
                            // Check if this feature has differences across vendors
                            const values = vendorData.map(
                              (vendor) => vendor.featureSupport?.[categoryKey]?.[feature] || "✗",
                            )
                            const hasDifferences = new Set(values).size > 1

                            if (showOnlyDifferences && !hasDifferences) return null

                            return (
                              <tr key={feature} className="border-b hover:bg-muted/50">
                                <td className="p-3 font-medium">{feature}</td>
                                {vendorData.map((vendor) => {
                                  const value = vendor.featureSupport?.[categoryKey]?.[feature] || "✗"
                                  return (
                                    <td key={vendor.id} className="p-3 text-center">
                                      <div className="flex items-center justify-center gap-2">
                                        {getFeatureIcon(value)}
                                        <span className="text-xs">{value}</span>
                                      </div>
                                    </td>
                                  )
                                })}
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          {/* Deployment Options */}
          <Card>
            <CardHeader>
              <CardTitle>Deployment Models</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Deployment Type</th>
                      {vendorData.map((vendor) => (
                        <th key={vendor.id} className="text-center p-3 font-medium">
                          {vendor.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Cloud/SaaS</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          {vendor.hardware?.cloud && vendor.hardware.cloud.length > 0 ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">On-Premise Physical</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          {vendor.hardware?.physical && vendor.hardware.physical.length > 0 ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Virtual Appliance</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          {vendor.hardware?.virtual && vendor.hardware.virtual.length > 0 ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Hybrid</td>
                      {vendorData.map((vendor) => {
                        const hasCloud = vendor.hardware?.cloud && vendor.hardware.cloud.length > 0
                        const hasOnPrem = vendor.hardware?.physical && vendor.hardware.physical.length > 0
                        return (
                          <td key={vendor.id} className="p-3 text-center">
                            {hasCloud && hasOnPrem ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600 mx-auto" />
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Factors */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation & Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Factor</th>
                      {vendorData.map((vendor) => (
                        <th key={vendor.id} className="text-center p-3 font-medium">
                          {vendor.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Implementation Complexity</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          <Badge
                            variant={
                              vendor.tcoFactors?.upgradeComplexity === "low"
                                ? "default"
                                : vendor.tcoFactors?.upgradeComplexity === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="capitalize"
                          >
                            {vendor.tcoFactors?.upgradeComplexity || "Medium"}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">FTE Requirement</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          <span className="font-semibold text-lg">{vendor.tcoFactors?.fteRequirement || 1}</span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Downtime Risk</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          <Badge
                            variant={
                              vendor.tcoFactors?.downtimeRisk === "low"
                                ? "default"
                                : vendor.tcoFactors?.downtimeRisk === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="capitalize"
                          >
                            {vendor.tcoFactors?.downtimeRisk || "Medium"}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">High Availability</td>
                      {vendorData.map((vendor) => (
                        <td key={vendor.id} className="p-3 text-center">
                          <div className="text-sm">
                            <div>{vendor.highAvailability?.failoverTime || "Manual"}</div>
                            <div className="text-xs text-muted-foreground">
                              {vendor.highAvailability?.cost || "Extra cost"}
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Recommendation Matrix */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Recommendation Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vendorData.map((vendor) => (
                  <div key={vendor.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="font-semibold">{vendor.name}</h4>
                      {vendor.id === "portnox" && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Market Position</span>
                        {getMarketPositionBadge(vendor.marketPosition)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Implementation</span>
                        <Badge variant="outline" className="capitalize">
                          {vendor.tcoFactors?.upgradeComplexity || "Medium"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>TCO Profile</span>
                        <Badge
                          variant={
                            vendor.tcoFactors?.fteRequirement && vendor.tcoFactors.fteRequirement < 1
                              ? "default"
                              : vendor.tcoFactors?.fteRequirement && vendor.tcoFactors.fteRequirement < 2
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {vendor.tcoFactors?.fteRequirement && vendor.tcoFactors.fteRequirement < 1
                            ? "Low"
                            : vendor.tcoFactors?.fteRequirement && vendor.tcoFactors.fteRequirement < 2
                              ? "Medium"
                              : "High"}
                        </Badge>
                      </div>
                    </div>

                    <Separator className="my-3" />

                    <div className="text-xs text-muted-foreground">
                      {vendor.id === "portnox"
                        ? "Recommended for modern cloud-native deployments with minimal operational overhead."
                        : vendor.marketPosition === "leader"
                          ? "Established solution with proven track record. Consider for enterprise environments."
                          : "Evaluate carefully against specific requirements and total cost of ownership."}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Strengths Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendorData.map((vendor) => (
                    <div key={vendor.id} className="space-y-2">
                      <h4 className="font-medium">{vendor.name}</h4>
                      <ul className="text-sm space-y-1">
                        {vendor.marketPosition === "leader" && (
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                            Market leadership
                          </li>
                        )}
                        {vendor.category === "cloud-native" && (
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                            Modern architecture
                          </li>
                        )}
                        {vendor.tcoFactors?.upgradeComplexity === "low" && (
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                            Simple deployment
                          </li>
                        )}
                        {vendor.highAvailability?.cost === "0" && (
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                            Built-in HA
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendorData.map((vendor) => (
                    <div key={vendor.id} className="space-y-2">
                      <h4 className="font-medium">{vendor.name}</h4>
                      <ul className="text-sm space-y-1">
                        {vendor.hiddenCosts?.licensingGotchas && vendor.hiddenCosts.licensingGotchas.length > 0 && (
                          <li className="flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 text-orange-600" />
                            Complex licensing
                          </li>
                        )}
                        {vendor.tcoFactors?.fteRequirement && vendor.tcoFactors.fteRequirement > 2 && (
                          <li className="flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 text-orange-600" />
                            High operational overhead
                          </li>
                        )}
                        {vendor.tcoFactors?.downtimeRisk === "high" && (
                          <li className="flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 text-orange-600" />
                            Higher downtime risk
                          </li>
                        )}
                        {vendor.hardware?.physical && vendor.hardware.physical.length > 0 && (
                          <li className="flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 text-orange-600" />
                            Hardware required
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
