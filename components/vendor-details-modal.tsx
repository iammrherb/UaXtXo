"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { COMPREHENSIVE_VENDOR_DATA } from "@/lib/vendors/comprehensive-vendor-data"
import {
  Building2,
  DollarSign,
  Shield,
  Clock,
  Users,
  Star,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  ExternalLink,
  Download,
  Cloud,
  Server,
  Layers,
  Network,
  Lock,
  Zap,
  Target,
  TrendingUp,
  Award,
  FileText,
  Settings,
  Globe,
  Smartphone,
  Monitor,
  Activity,
  BarChart3,
} from "lucide-react"

interface VendorDetailsModalProps {
  vendorId: string
  isOpen: boolean
  onClose: () => void
}

export function VendorDetailsModal({ vendorId, isOpen, onClose }: VendorDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const vendor = COMPREHENSIVE_VENDOR_DATA[vendorId]

  if (!vendor) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vendor Not Found</DialogTitle>
          </DialogHeader>
          <div className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <p>The requested vendor information could not be found.</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const getFeatureIcon = (value: string) => {
    switch (value) {
      case "✓✓✓":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "✓✓":
        return <CheckCircle2 className="h-4 w-4 text-blue-600" />
      case "✓":
        return <CheckCircle2 className="h-4 w-4 text-yellow-600" />
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

  const getMarketPositionColor = (position: string) => {
    const colors = {
      leader: "text-green-600 bg-green-100",
      challenger: "text-blue-600 bg-blue-100",
      visionary: "text-purple-600 bg-purple-100",
      niche: "text-orange-600 bg-orange-100",
    }
    return colors[position as keyof typeof colors] || colors.niche
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cloud-native":
        return <Cloud className="h-5 w-5 text-blue-500" />
      case "enterprise":
        return <Building2 className="h-5 w-5 text-purple-500" />
      case "open-source":
        return <Globe className="h-5 w-5 text-green-500" />
      default:
        return <Server className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                {getCategoryIcon(vendor.category)}
              </div>
              <div>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  {vendor.name}
                  {vendorId === "portnox" && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`${getMarketPositionColor(vendor.marketPosition)} border-0`}>
                    {vendor.marketPosition}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {vendor.category}
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Website
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh] px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="deployment">Deployment</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">${vendor.licensing?.base?.[0]?.listPrice || "Contact"}</div>
                    <div className="text-sm text-muted-foreground">Per Device/Year</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold capitalize">
                      {vendor.tcoFactors?.upgradeComplexity || "Medium"}
                    </div>
                    <div className="text-sm text-muted-foreground">Implementation</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{vendor.tcoFactors?.fteRequirement || 1}</div>
                    <div className="text-sm text-muted-foreground">FTE Required</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold capitalize">{vendor.tcoFactors?.downtimeRisk || "Medium"}</div>
                    <div className="text-sm text-muted-foreground">Risk Level</div>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About {vendor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{vendor.description}</p>
                </CardContent>
              </Card>

              {/* Key Strengths & Considerations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Key Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {vendor.marketPosition === "leader" && (
                      <div className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-green-600 mt-0.5" />
                        <span className="text-sm">Market leader with proven track record</span>
                      </div>
                    )}
                    {vendor.category === "cloud-native" && (
                      <div className="flex items-start gap-2">
                        <Cloud className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span className="text-sm">Modern cloud-native architecture</span>
                      </div>
                    )}
                    {vendor.tcoFactors?.upgradeComplexity === "low" && (
                      <div className="flex items-start gap-2">
                        <Zap className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <span className="text-sm">Simple deployment and management</span>
                      </div>
                    )}
                    {vendor.highAvailability?.failoverTime?.includes("Automatic") && (
                      <div className="flex items-start gap-2">
                        <Activity className="h-4 w-4 text-green-600 mt-0.5" />
                        <span className="text-sm">Built-in high availability</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-600 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Considerations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {vendor.hiddenCosts?.licensingGotchas && vendor.hiddenCosts.licensingGotchas.length > 0 && (
                      <div className="flex items-start gap-2">
                        <DollarSign className="h-4 w-4 text-orange-600 mt-0.5" />
                        <span className="text-sm">{vendor.hiddenCosts.licensingGotchas[0]}</span>
                      </div>
                    )}
                    {vendor.tcoFactors?.upgradeComplexity === "high" && (
                      <div className="flex items-start gap-2">
                        <Settings className="h-4 w-4 text-orange-600 mt-0.5" />
                        <span className="text-sm">Complex implementation and management</span>
                      </div>
                    )}
                    {vendor.hiddenCosts?.operationalOverhead && vendor.hiddenCosts.operationalOverhead.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Users className="h-4 w-4 text-orange-600 mt-0.5" />
                        <span className="text-sm">{vendor.hiddenCosts.operationalOverhead[0]}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              {/* Base Licensing */}
              <Card>
                <CardHeader>
                  <CardTitle>Base Licensing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vendor.licensing?.base?.map((tier, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{tier.name}</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {tier.features.slice(0, 3).map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {tier.features.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{tier.features.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {typeof tier.listPrice === "number" ? `$${tier.listPrice}` : tier.listPrice}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            per {tier.unit} / {tier.period}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Modules */}
              {vendor.licensing?.modules && vendor.licensing.modules.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Modules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {vendor.licensing.modules.map((module, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{module.name}</h4>
                            <p className="text-sm text-muted-foreground">{module.features.join(", ")}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              {typeof module.listPrice === "number" ? `$${module.listPrice}` : module.listPrice}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              per {module.unit} / {module.period}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Hardware Requirements */}
              {((vendor.hardware?.physical && vendor.hardware.physical.length > 0) ||
                (vendor.hardware?.virtual && vendor.hardware.virtual.length > 0)) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Hardware & Infrastructure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="physical" className="space-y-4">
                      <TabsList>
                        {vendor.hardware?.physical && vendor.hardware.physical.length > 0 && (
                          <TabsTrigger value="physical">Physical Appliances</TabsTrigger>
                        )}
                        {vendor.hardware?.virtual && vendor.hardware.virtual.length > 0 && (
                          <TabsTrigger value="virtual">Virtual Appliances</TabsTrigger>
                        )}
                        {vendor.hardware?.cloud && vendor.hardware.cloud.length > 0 && (
                          <TabsTrigger value="cloud">Cloud Infrastructure</TabsTrigger>
                        )}
                      </TabsList>

                      {vendor.hardware?.physical && vendor.hardware.physical.length > 0 && (
                        <TabsContent value="physical">
                          <div className="space-y-3">
                            {vendor.hardware.physical.map((hw, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                  <h4 className="font-medium">{hw.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {hw.capacity} - {hw.useCase}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold">${hw.listPrice.toLocaleString()}</div>
                                  {hw.streetPrice && (
                                    <div className="text-sm text-green-600">Street: {hw.streetPrice}</div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      )}

                      {vendor.hardware?.virtual && vendor.hardware.virtual.length > 0 && (
                        <TabsContent value="virtual">
                          <div className="space-y-3">
                            {vendor.hardware.virtual.map((hw, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                  <h4 className="font-medium">{hw.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {hw.capacity} - {hw.useCase}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold">${hw.listPrice.toLocaleString()}</div>
                                  {hw.streetPrice && (
                                    <div className="text-sm text-green-600">Street: {hw.streetPrice}</div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      )}

                      {vendor.hardware?.cloud && vendor.hardware.cloud.length > 0 && (
                        <TabsContent value="cloud">
                          <div className="space-y-3">
                            {vendor.hardware.cloud.map((hw, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                  <h4 className="font-medium">{hw.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {hw.capacity} - {hw.useCase}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold">
                                    {hw.listPrice > 0 ? `$${hw.listPrice.toLocaleString()}` : "Included"}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      )}
                    </Tabs>
                  </CardContent>
                </Card>
              )}

              {/* Professional Services */}
              {vendor.professionalServices && (
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {vendor.professionalServices.vendor && vendor.professionalServices.vendor.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Vendor Services</h4>
                          <div className="space-y-2">
                            {vendor.professionalServices.vendor.map((service, index) => (
                              <div key={index} className="flex items-center justify-between p-2 border rounded">
                                <span className="text-sm">{service.name}</span>
                                <span className="text-sm font-medium">{service.cost}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {vendor.professionalServices.training && vendor.professionalServices.training.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Training & Certification</h4>
                          <div className="space-y-2">
                            {vendor.professionalServices.training.map((service, index) => (
                              <div key={index} className="flex items-center justify-between p-2 border rounded">
                                <span className="text-sm">{service.name}</span>
                                <span className="text-sm font-medium">
                                  {typeof service.cost === "number" ? `$${service.cost}` : service.cost}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Hidden Costs */}
              {vendor.hiddenCosts && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-600">Hidden Costs & Considerations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {vendor.hiddenCosts.licensingGotchas && vendor.hiddenCosts.licensingGotchas.length > 0 && (
                        <div>
                          <h4 className="font-medium text-orange-600 mb-2">Licensing Gotchas</h4>
                          <ul className="space-y-1">
                            {vendor.hiddenCosts.licensingGotchas.map((item, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {vendor.hiddenCosts.commonExpenses && vendor.hiddenCosts.commonExpenses.length > 0 && (
                        <div>
                          <h4 className="font-medium text-orange-600 mb-2">Common Additional Expenses</h4>
                          <div className="space-y-2">
                            {vendor.hiddenCosts.commonExpenses.map((expense, index) => (
                              <div key={index} className="flex items-center justify-between p-2 border rounded">
                                <span className="text-sm">{expense.name}</span>
                                <span className="text-sm font-medium">{expense.cost}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              {/* Feature Categories */}
              {vendor.featureSupport && (
                <div className="space-y-6">
                  {Object.entries(vendor.featureSupport).map(([categoryKey, features]) => {
                    const categoryNames = {
                      authentication: "Authentication & Identity",
                      network: "Network Control",
                      advanced: "Advanced Security",
                      compliance: "Compliance & Reporting",
                    }
                    const categoryName = categoryNames[categoryKey as keyof typeof categoryNames] || categoryKey
                    const categoryScore = getFeatureScore(features)

                    return (
                      <Card key={categoryKey}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              {categoryKey === "authentication" && <Lock className="h-5 w-5 text-blue-600" />}
                              {categoryKey === "network" && <Network className="h-5 w-5 text-green-600" />}
                              {categoryKey === "advanced" && <Zap className="h-5 w-5 text-purple-600" />}
                              {categoryKey === "compliance" && <FileText className="h-5 w-5 text-orange-600" />}
                              {categoryName}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                              <Progress value={categoryScore} className="w-20" />
                              <Badge
                                variant={categoryScore > 80 ? "default" : categoryScore > 60 ? "secondary" : "outline"}
                              >
                                {categoryScore}%
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Object.entries(features).map(([feature, value]) => (
                              <div key={feature} className="flex items-center justify-between p-2 border rounded">
                                <span className="text-sm font-medium">{feature}</span>
                                <div className="flex items-center gap-2">
                                  {getFeatureIcon(value)}
                                  <span className="text-xs text-muted-foreground">{value}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="deployment" className="space-y-6">
              {/* High Availability */}
              {vendor.highAvailability && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-green-600" />
                      High Availability & Disaster Recovery
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Licensing</h4>
                        <p className="text-sm text-muted-foreground">{vendor.highAvailability.licensing}</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Additional Cost</h4>
                        <p className="text-sm text-muted-foreground">{vendor.highAvailability.cost}</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Failover Time</h4>
                        <p className="text-sm text-muted-foreground">{vendor.highAvailability.failoverTime}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* TCO Factors */}
              {vendor.tcoFactors && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      Operational Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-medium mb-1">FTE Requirement</h4>
                        <p className="text-2xl font-bold">{vendor.tcoFactors.fteRequirement}</p>
                        <p className="text-xs text-muted-foreground">Full-time employees needed</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <h4 className="font-medium mb-1">Downtime Risk</h4>
                        <p className="text-2xl font-bold capitalize">{vendor.tcoFactors.downtimeRisk}</p>
                        <p className="text-xs text-muted-foreground">Risk level assessment</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <Settings className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <h4 className="font-medium mb-1">Upgrade Complexity</h4>
                        <p className="text-2xl font-bold capitalize">{vendor.tcoFactors.upgradeComplexity}</p>
                        <p className="text-xs text-muted-foreground">Implementation difficulty</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Deployment Models */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-green-600" />
                    Deployment Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vendor.hardware?.cloud && vendor.hardware.cloud.length > 0 && (
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Cloud className="h-6 w-6 text-blue-600" />
                        <div>
                          <h4 className="font-medium">Cloud-Native</h4>
                          <p className="text-sm text-muted-foreground">Fully managed SaaS solution</p>
                        </div>
                        <Badge variant="default" className="ml-auto">
                          Available
                        </Badge>
                      </div>
                    )}
                    {vendor.hardware?.physical && vendor.hardware.physical.length > 0 && (
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Server className="h-6 w-6 text-gray-600" />
                        <div>
                          <h4 className="font-medium">On-Premise</h4>
                          <p className="text-sm text-muted-foreground">Physical appliances in your datacenter</p>
                        </div>
                        <Badge variant="secondary" className="ml-auto">
                          Available
                        </Badge>
                      </div>
                    )}
                    {vendor.hardware?.virtual && vendor.hardware.virtual.length > 0 && (
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Monitor className="h-6 w-6 text-purple-600" />
                        <div>
                          <h4 className="font-medium">Virtual Appliance</h4>
                          <p className="text-sm text-muted-foreground">VM deployment in your infrastructure</p>
                        </div>
                        <Badge variant="outline" className="ml-auto">
                          Available
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              {/* Integration Categories */}
              {vendor.integrations && (
                <div className="space-y-6">
                  {Object.entries(vendor.integrations).map(([categoryKey, integrations]) => {
                    const categoryNames = {
                      identity: "Identity & Directory Services",
                      mdm: "Mobile Device Management",
                      siem: "SIEM & Security Analytics",
                      security: "Security Tools",
                    }
                    const categoryName = categoryNames[categoryKey as keyof typeof categoryNames] || categoryKey

                    return (
                      <Card key={categoryKey}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            {categoryKey === "identity" && <Users className="h-5 w-5 text-blue-600" />}
                            {categoryKey === "mdm" && <Smartphone className="h-5 w-5 text-green-600" />}
                            {categoryKey === "siem" && <Activity className="h-5 w-5 text-purple-600" />}
                            {categoryKey === "security" && <Shield className="h-5 w-5 text-red-600" />}
                            {categoryName}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {integrations.map((integration, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                  <h4 className="font-medium text-sm">{integration.name}</h4>
                                  {integration.complexity && (
                                    <p className="text-xs text-muted-foreground capitalize">
                                      {integration.complexity} complexity
                                    </p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium">
                                    {typeof integration.cost === "number"
                                      ? integration.cost === 0
                                        ? "Free"
                                        : `$${integration.cost}`
                                      : integration.cost}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {/* Competitive Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Competitive Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium text-green-600 mb-2">Competitive Advantages</h4>
                        <ul className="space-y-2 text-sm">
                          {vendor.marketPosition === "leader" && (
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              Market leadership position
                            </li>
                          )}
                          {vendor.category === "cloud-native" && (
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              Modern cloud-native architecture
                            </li>
                          )}
                          {vendor.tcoFactors?.upgradeComplexity === "low" && (
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              Simple deployment and management
                            </li>
                          )}
                          {vendor.highAvailability?.cost === "0" && (
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              Built-in high availability at no extra cost
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium text-orange-600 mb-2">Areas for Consideration</h4>
                        <ul className="space-y-2 text-sm">
                          {vendor.hiddenCosts?.licensingGotchas && vendor.hiddenCosts.licensingGotchas.length > 0 && (
                            <li className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-orange-600" />
                              Complex licensing model
                            </li>
                          )}
                          {vendor.tcoFactors?.fteRequirement && vendor.tcoFactors.fteRequirement > 2 && (
                            <li className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-orange-600" />
                              High operational overhead
                            </li>
                          )}
                          {vendor.tcoFactors?.downtimeRisk === "high" && (
                            <li className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-orange-600" />
                              Higher downtime risk
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vendorId === "portnox" ? (
                      <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800 dark:text-green-200">
                          <strong>Highly Recommended:</strong> Portnox CLEAR offers the best combination of modern
                          architecture, ease of deployment, and total cost of ownership. Ideal for organizations seeking
                          cloud-native NAC with zero-trust capabilities and minimal operational overhead.
                        </AlertDescription>
                      </Alert>
                    ) : vendor.marketPosition === "leader" ? (
                      <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800 dark:text-blue-200">
                          <strong>Market Leader:</strong> {vendor.name} is a proven solution with strong market
                          presence. Consider for environments requiring established vendor relationships and
                          comprehensive feature sets, but evaluate total cost of ownership carefully.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <AlertDescription className="text-orange-800 dark:text-orange-200">
                          <strong>Evaluate Carefully:</strong> {vendor.name} may be suitable for specific use cases.
                          Thoroughly assess feature gaps, implementation complexity, and long-term costs before making a
                          decision.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="text-center p-3 border rounded-lg">
                        <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <h4 className="font-medium">Best For</h4>
                        <p className="text-sm text-muted-foreground">
                          {vendor.category === "cloud-native"
                            ? "Modern cloud environments"
                            : vendor.category === "enterprise"
                              ? "Large enterprises"
                              : vendor.category === "open-source"
                                ? "Budget-conscious organizations"
                                : "Specialized requirements"}
                        </p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-medium">Time to Value</h4>
                        <p className="text-sm text-muted-foreground">
                          {vendor.tcoFactors?.upgradeComplexity === "low"
                            ? "Days to weeks"
                            : vendor.tcoFactors?.upgradeComplexity === "medium"
                              ? "Weeks to months"
                              : "Months to quarters"}
                        </p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <DollarSign className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <h4 className="font-medium">TCO Profile</h4>
                        <p className="text-sm text-muted-foreground">
                          {vendor.tcoFactors?.fteRequirement && vendor.tcoFactors.fteRequirement < 1
                            ? "Low TCO"
                            : vendor.tcoFactors?.fteRequirement && vendor.tcoFactors.fteRequirement < 2
                              ? "Medium TCO"
                              : "High TCO"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        <div className="p-6 pt-0">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Details
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
