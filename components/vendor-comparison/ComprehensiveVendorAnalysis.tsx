"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  DollarSign,
  Clock,
  Users,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Zap,
  Download,
} from "lucide-react"
import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import {
  COMPREHENSIVE_VENDOR_DATA,
  INDUSTRIES,
  PREVENTABLE_BREACHES,
  INDUSTRY_ROI,
  PORTNOX_DIFFERENTIATORS,
} from "@/lib/vendors/comprehensive-vendor-data"

interface VendorComparisonProps {
  selectedIndustry?: string
  selectedDeviceCount?: number
  selectedTimeframe?: number
}

export function ComprehensiveVendorAnalysis({
  selectedIndustry = "HEALTHCARE",
  selectedDeviceCount = 500,
  selectedTimeframe = 3,
}: VendorComparisonProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedVendors, setSelectedVendors] = useState(["PORTNOX", "CISCO_ISE", "ARUBA_CLEARPASS"])
  const [deploymentModel, setDeploymentModel] = useState<"CLOUD" | "HYBRID" | "ON_PREMISE">("CLOUD")
  const [comparisonView, setComparisonView] = useState<"cost" | "features" | "security" | "deployment">("cost")

  // Calculate scaled costs based on device count
  const scaledCosts = useMemo(() => {
    const scaleFactor = selectedDeviceCount / 500
    return Object.entries(COMPREHENSIVE_VENDOR_DATA).reduce(
      (acc, [vendorKey, vendor]) => {
        const timeKey = selectedTimeframe === 1 ? 1 : selectedTimeframe === 3 ? 3 : 5
        const baseCosts = vendor.costs[timeKey]

        if (baseCosts) {
          acc[vendorKey] = {
            ...baseCosts,
            total: Math.round(baseCosts.total * scaleFactor),
          }
        }
        return acc
      },
      {} as Record<string, any>,
    )
  }, [selectedDeviceCount, selectedTimeframe])

  // TCO comparison chart data
  const tcoChartData = selectedVendors.map((vendorKey) => ({
    vendor: COMPREHENSIVE_VENDOR_DATA[vendorKey].name,
    software: scaledCosts[vendorKey]?.software?.base || 0,
    hardware: scaledCosts[vendorKey]?.hardware?.appliances || 0,
    implementation: scaledCosts[vendorKey]?.implementation?.professionalServices || 0,
    operational:
      scaledCosts[vendorKey]?.operational?.totalFteCost ||
      scaledCosts[vendorKey]?.operational?.fteRequired *
        scaledCosts[vendorKey]?.operational?.avgSalary *
        selectedTimeframe ||
      0,
    hidden: Object.values(scaledCosts[vendorKey]?.hidden || {}).reduce((a: number, b: any) => a + (b || 0), 0),
    total: scaledCosts[vendorKey]?.total || 0,
  }))

  // Feature comparison radar chart
  const featureRadarData = [
    {
      feature: "Zero Trust",
      ...selectedVendors.reduce(
        (acc, v) => ({ ...acc, [v]: COMPREHENSIVE_VENDOR_DATA[v].capabilities.zeroTrust ? 100 : 0 }),
        {},
      ),
    },
    {
      feature: "Risk-Based",
      ...selectedVendors.reduce(
        (acc, v) => ({ ...acc, [v]: COMPREHENSIVE_VENDOR_DATA[v].capabilities.riskBasedAccess ? 100 : 0 }),
        {},
      ),
    },
    {
      feature: "IoT Support",
      ...selectedVendors.reduce(
        (acc, v) => ({ ...acc, [v]: COMPREHENSIVE_VENDOR_DATA[v].capabilities.iotProfiling ? 100 : 0 }),
        {},
      ),
    },
    {
      feature: "Cloud Native",
      ...selectedVendors.reduce(
        (acc, v) => ({ ...acc, [v]: COMPREHENSIVE_VENDOR_DATA[v].deploymentModels.CLOUD?.available ? 100 : 0 }),
        {},
      ),
    },
    {
      feature: "API Access",
      ...selectedVendors.reduce(
        (acc, v) => ({ ...acc, [v]: COMPREHENSIVE_VENDOR_DATA[v].capabilities.apiAccess ? 100 : 0 }),
        {},
      ),
    },
    {
      feature: "Compliance",
      ...selectedVendors.reduce(
        (acc, v) => ({ ...acc, [v]: COMPREHENSIVE_VENDOR_DATA[v].complianceSupport?.HIPAA?.coverage || 0 }),
        {},
      ),
    },
  ]

  // Deployment timeline comparison
  const deploymentData = [
    { phase: "Planning", portnox: 2, traditional: 42 },
    { phase: "POC", portnox: 0.5, traditional: 35 },
    { phase: "Pilot", portnox: 3, traditional: 56 },
    { phase: "Production", portnox: 7, traditional: 84 },
  ]

  // ROI calculation for selected industry
  const industryROI = INDUSTRY_ROI[selectedIndustry]
  const portnoxROI = industryROI
    ? {
        investment: scaledCosts.PORTNOX?.total || 0,
        benefit: industryROI.totalAnnualBenefit * selectedTimeframe,
        roi: industryROI.threeYearROI,
      }
    : null

  const CapabilityIcon = ({ capable }: { capable: boolean }) =>
    capable ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Comprehensive NAC Vendor Analysis</CardTitle>
          <CardDescription>
            Detailed cost breakdown, features, and ROI comparison for {selectedDeviceCount} devices over{" "}
            {selectedTimeframe} year(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={deploymentModel} onValueChange={(v: any) => setDeploymentModel(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Deployment Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLOUD">Cloud</SelectItem>
                <SelectItem value="HYBRID">Hybrid</SelectItem>
                <SelectItem value="ON_PREMISE">On-Premise</SelectItem>
              </SelectContent>
            </Select>

            <Select value={comparisonView} onValueChange={(v: any) => setComparisonView(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Comparison View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cost">Total Cost Analysis</SelectItem>
                <SelectItem value="features">Feature Comparison</SelectItem>
                <SelectItem value="security">Security & Compliance</SelectItem>
                <SelectItem value="deployment">Implementation Timeline</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main content tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Executive Summary</TabsTrigger>
          <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          <TabsTrigger value="security">Security & Risk</TabsTrigger>
          <TabsTrigger value="roi">ROI & Benefits</TabsTrigger>
        </TabsList>

        {/* Executive Summary Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Portnox Advantages */}
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  Why Portnox CLEAR Wins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Deployment Time</span>
                  <Badge variant="default" className="bg-green-600">
                    1-7 days vs 3-9 months
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Cost Savings</span>
                  <Badge variant="default" className="bg-green-600">
                    65-75% lower TCO
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Admin Effort</span>
                  <Badge variant="default" className="bg-green-600">
                    90% reduction
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Zero Trust Score</span>
                  <Badge variant="default" className="bg-green-600">
                    95% vs 75% avg
                  </Badge>
                </div>
                <Separator className="my-2" />
                <Alert className="bg-green-100 border-green-300">
                  <AlertDescription className="text-sm">
                    <strong>Bottom Line:</strong> Portnox delivers enterprise security at{" "}
                    {Math.round((scaledCosts.PORTNOX?.total || 0) / 1000)}K vs{" "}
                    {Math.round((scaledCosts.CISCO_ISE?.total || 0) / 1000)}K for Cisco ISE over {selectedTimeframe}{" "}
                    years.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Critical Warnings */}
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Critical Vendor Warnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Alert className="bg-red-100 border-red-300">
                  <AlertDescription>
                    <strong>Legacy NAC:</strong> Active exploitation by nation-states. Immediate migration required. 20+
                    critical CVEs.
                  </AlertDescription>
                </Alert>
                <Alert className="bg-orange-100 border-orange-300">
                  <AlertDescription>
                    <strong>Cisco ISE:</strong> 15+ critical CVEs annually. Complex patching requires downtime.
                  </AlertDescription>
                </Alert>
                <Alert className="bg-yellow-100 border-yellow-300">
                  <AlertDescription>
                    <strong>Microsoft NPS:</strong> No longer being developed. Lacks modern NAC features. Requires
                    multiple add-ons.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Total Cost Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Total Cost of Ownership Comparison</CardTitle>
              <CardDescription>
                {selectedTimeframe}-year TCO for {selectedDeviceCount} devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={tcoChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <RechartsTooltip
                    formatter={(value: any) => `$${(value / 1000).toFixed(0)}K`}
                    labelStyle={{ color: "#000" }}
                  />
                  <Legend />
                  <Bar dataKey="software" stackId="a" fill="#3b82f6" name="Software" />
                  <Bar dataKey="hardware" stackId="a" fill="#ef4444" name="Hardware" />
                  <Bar dataKey="implementation" stackId="a" fill="#f59e0b" name="Implementation" />
                  <Bar dataKey="operational" stackId="a" fill="#8b5cf6" name="Operations" />
                  <Bar dataKey="hidden" stackId="a" fill="#6b7280" name="Hidden Costs" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost Analysis Tab */}
        <TabsContent value="cost" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {selectedVendors.map((vendorKey) => {
              const vendor = COMPREHENSIVE_VENDOR_DATA[vendorKey]
              const costs = scaledCosts[vendorKey]
              const deployment = vendor.deploymentModels[deploymentModel]

              return (
                <Card key={vendorKey} className={vendorKey === "PORTNOX" ? "border-green-200" : ""}>
                  <CardHeader>
                    <CardTitle className="text-lg">{vendor.name}</CardTitle>
                    <CardDescription>{vendor.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Deployment availability */}
                    <div className="flex items-center gap-2">
                      {deployment?.available ? (
                        <Badge variant="default" className="bg-green-600">
                          {deploymentModel} Available
                        </Badge>
                      ) : (
                        <Badge variant="destructive">{deploymentModel} Not Available</Badge>
                      )}
                    </div>

                    {/* Cost breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Software</span>
                        <span className="font-medium">${((costs?.software?.base || 0) / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Hardware</span>
                        <span className="font-medium">${((costs?.hardware?.appliances || 0) / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Implementation</span>
                        <span className="font-medium">
                          ${((costs?.implementation?.professionalServices || 0) / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Operations ({selectedTimeframe}yr)</span>
                        <span className="font-medium">
                          $
                          {(
                            (costs?.operational?.fteRequired * costs?.operational?.avgSalary * selectedTimeframe || 0) /
                            1000
                          ).toFixed(0)}
                          K
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>Total TCO</span>
                        <span className="text-lg">${((costs?.total || 0) / 1000).toFixed(0)}K</span>
                      </div>
                    </div>

                    {/* Additional metrics */}
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>FTE Required</span>
                        <Badge variant="outline">{costs?.operational?.fteRequired || 0}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Deployment Time</span>
                        <Badge variant="outline">{deployment?.deploymentTime || "N/A"}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Vendor Lock-in</span>
                        <Badge variant={vendor.vendorLockIn === "NONE" ? "default" : "destructive"}>
                          {vendor.vendorLockIn}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Detailed cost comparison table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Cost Factor Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Cost Factor</th>
                      {selectedVendors.map((v) => (
                        <th key={v} className="text-right py-2 px-4">
                          {COMPREHENSIVE_VENDOR_DATA[v].name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">License Model</td>
                      {selectedVendors.map((v) => (
                        <td key={v} className="text-right px-4">
                          {v === "PORTNOX" ? "Simple per-device" : v === "CISCO_ISE" ? "Complex tiers" : "Varies"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Hidden Costs</td>
                      {selectedVendors.map((v) => (
                        <td key={v} className="text-right px-4">
                          {v === "PORTNOX" ? (
                            <Badge variant="default">None</Badge>
                          ) : (
                            <Badge variant="destructive">Significant</Badge>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Training Required</td>
                      {selectedVendors.map((v) => (
                        <td key={v} className="text-right px-4">
                          {v === "PORTNOX" ? "2 hours" : v === "CISCO_ISE" ? "5+ days" : "3+ days"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Prof. Services</td>
                      {selectedVendors.map((v) => (
                        <td key={v} className="text-right px-4">
                          {v === "PORTNOX" ? "Optional" : "Mandatory"}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Capabilities Tab */}
        <TabsContent value="capabilities" className="space-y-4">
          {/* Feature radar chart */}
          <Card>
            <CardHeader>
              <CardTitle>Feature Capabilities Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={featureRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="feature" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  {selectedVendors.map((vendor, index) => (
                    <Radar
                      key={vendor}
                      name={COMPREHENSIVE_VENDOR_DATA[vendor].name}
                      dataKey={vendor}
                      stroke={index === 0 ? "#10b981" : index === 1 ? "#3b82f6" : "#f59e0b"}
                      fill={index === 0 ? "#10b981" : index === 1 ? "#3b82f6" : "#f59e0b"}
                      fillOpacity={0.3}
                    />
                  ))}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed capability matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Feature Matrix</CardTitle>
              <CardDescription>Detailed comparison of NAC capabilities across vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Capability</th>
                      {selectedVendors.map((v) => (
                        <th key={v} className="text-center py-2 px-4">
                          {COMPREHENSIVE_VENDOR_DATA[v].name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Core NAC Features */}
                    <tr className="bg-gray-50">
                      <td colSpan={selectedVendors.length + 1} className="py-2 font-semibold">
                        Core NAC Features
                      </td>
                    </tr>
                    {["wirelessNAC", "wiredNAC", "dot1x", "macAuth", "certificateAuth"].map((cap) => (
                      <tr key={cap} className="border-b">
                        <td className="py-2">{cap.replace(/([A-Z])/g, " $1").trim()}</td>
                        {selectedVendors.map((v) => (
                          <td key={v} className="text-center px-4">
                            <CapabilityIcon
                              capable={
                                COMPREHENSIVE_VENDOR_DATA[v].capabilities[
                                  cap as keyof (typeof COMPREHENSIVE_VENDOR_DATA)[typeof v]["capabilities"]
                                ]
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Advanced Features */}
                    <tr className="bg-gray-50">
                      <td colSpan={selectedVendors.length + 1} className="py-2 font-semibold">
                        Advanced Features
                      </td>
                    </tr>
                    {["riskBasedAccess", "zeroTrust", "behaviorAnalytics", "iotProfiling", "cloudPKI", "tacacs"].map(
                      (cap) => (
                        <tr key={cap} className="border-b">
                          <td className="py-2">{cap.replace(/([A-Z])/g, " $1").trim()}</td>
                          {selectedVendors.map((v) => (
                            <td key={v} className="text-center px-4">
                              <CapabilityIcon
                                capable={
                                  COMPREHENSIVE_VENDOR_DATA[v].capabilities[
                                    cap as keyof (typeof COMPREHENSIVE_VENDOR_DATA)[typeof v]["capabilities"]
                                  ]
                                }
                              />
                            </td>
                          ))}
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Unique Portnox advantages */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle>Portnox Unique Advantages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-green-600" />
                    Technical Excellence
                  </h4>
                  <ul className="text-sm space-y-1">
                    {PORTNOX_DIFFERENTIATORS.technicalAdvantages.slice(0, 4).map((adv, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    Business Value
                  </h4>
                  <ul className="text-sm space-y-1">
                    {PORTNOX_DIFFERENTIATORS.businessAdvantages.slice(0, 4).map((adv, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-600" />
                    Operational Benefits
                  </h4>
                  <ul className="text-sm space-y-1">
                    {PORTNOX_DIFFERENTIATORS.operationalAdvantages.slice(0, 4).map((adv, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security & Risk Tab */}
        <TabsContent value="security" className="space-y-4">
          {/* Breach prevention effectiveness */}
          <Card>
            <CardHeader>
              <CardTitle>Security Incident Prevention Analysis</CardTitle>
              <CardDescription>Major breaches that proper NAC implementation could have prevented</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(PREVENTABLE_BREACHES)
                  .slice(0, 4)
                  .map(([key, breach]) => (
                    <Alert key={key} className="border-orange-200">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="font-semibold">{breach.name}</div>
                        <div className="text-sm mt-1">
                          <span className="font-medium">Impact:</span> {breach.impact} |
                          <span className="font-medium"> Cost:</span> ${(breach.cost / 1000000).toFixed(0)}M
                        </div>
                        <div className="text-sm mt-1">
                          <span className="font-medium">Prevention:</span> {breach.preventable_by.join(", ")}
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Compliance coverage comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["HIPAA", "PCI_DSS", "NIST_800_53", "GDPR"].map((framework) => (
                  <div key={framework} className="space-y-2">
                    <div className="font-medium">{framework.replace(/_/g, "-")}</div>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedVendors.map((vendor) => {
                        const coverage =
                          COMPREHENSIVE_VENDOR_DATA[vendor].complianceSupport?.[
                            framework as keyof (typeof COMPREHENSIVE_VENDOR_DATA)[typeof vendor]["complianceSupport"]
                          ]?.coverage || 0
                        return (
                          <div key={vendor} className="flex items-center justify-between text-sm">
                            <span>{COMPREHENSIVE_VENDOR_DATA[vendor].name}</span>
                            <Badge variant={coverage >= 90 ? "default" : coverage >= 80 ? "secondary" : "destructive"}>
                              {coverage}%
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security vulnerabilities */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                Vendor Security Track Record
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4 bg-green-100 border-green-300">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  <strong>Portnox CLEAR:</strong> Zero CVEs since inception. Cloud-native secure by design. SOC 2 Type
                  II certified. Continuous security updates with zero downtime.
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Alert className="bg-red-100 border-red-300">
                  <AlertDescription>
                    <strong>Cisco ISE:</strong> 15+ critical CVEs annually. Recent: CVE-2025-20281 (CVSS 10.0)
                  </AlertDescription>
                </Alert>
                <Alert className="bg-orange-100 border-orange-300">
                  <AlertDescription>
                    <strong>Aruba ClearPass:</strong> 8-10 CVEs annually. Quarterly patch cycles.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROI & Benefits Tab */}
        <TabsContent value="roi" className="space-y-4">
          {/* Industry-specific ROI */}
          <Card>
            <CardHeader>
              <CardTitle>Industry-Specific ROI Analysis</CardTitle>
              <CardDescription>
                {INDUSTRIES[selectedIndustry]?.name} - {selectedDeviceCount} devices over {selectedTimeframe} years
              </CardDescription>
            </CardHeader>
            <CardContent>
              {portnoxROI && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">${(portnoxROI.investment / 1000).toFixed(0)}K</div>
                        <p className="text-sm text-muted-foreground">Total Investment</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">
                          ${(portnoxROI.benefit / 1000000).toFixed(1)}M
                        </div>
                        <p className="text-sm text-muted-foreground">Total Benefit</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">{portnoxROI.roi}%</div>
                        <p className="text-sm text-muted-foreground">Return on Investment</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Benefit breakdown */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">Annual Benefit Breakdown</h4>
                    {Object.entries(industryROI.portnoxBenefits).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span>{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <span className="font-medium">${(value / 1000).toFixed(0)}K</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Deployment timeline comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Time to Value Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deploymentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="phase" />
                  <YAxis label={{ value: "Days", angle: -90, position: "insideLeft" }} />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="portnox" fill="#10b981" name="Portnox" />
                  <Bar dataKey="traditional" fill="#ef4444" name="Traditional NAC" />
                </BarChart>
              </ResponsiveContainer>
              <Alert className="mt-4 bg-green-100 border-green-300">
                <AlertDescription>
                  Portnox deploys 95% faster, delivering value in days instead of months
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Executive Decision Summary */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="text-xl">Executive Decision Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="font-bold">95% Faster</div>
              <p className="text-sm text-muted-foreground">Deployment Time</p>
            </div>
            <div className="text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="font-bold">73% Lower</div>
              <p className="text-sm text-muted-foreground">Total Cost</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="font-bold">Zero CVEs</div>
              <p className="text-sm text-muted-foreground">Security Record</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="font-bold">{portnoxROI?.roi || 5506}%</div>
              <p className="text-sm text-muted-foreground">ROI</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
