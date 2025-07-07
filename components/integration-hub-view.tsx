"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Shield, Cloud, Users, Settings, CheckCircle2, AlertTriangle, Info, Network, Monitor } from "lucide-react"

interface IntegrationHubViewProps {
  selectedVendors: string[]
}

const integrationCategories = [
  {
    id: "identity",
    name: "Identity & Access Management",
    icon: Users,
    color: "bg-blue-500",
    integrations: [
      {
        name: "Active Directory",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "5 min" },
          cisco: { native: true, complexity: "medium", cost: 0, setup: "2 hours" },
          aruba: { native: true, complexity: "medium", cost: 0, setup: "1 hour" },
          juniper: { native: true, complexity: "low", cost: 0, setup: "15 min" },
        },
        description: "Seamless user authentication and authorization",
      },
      {
        name: "Azure AD / Entra ID",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "10 min" },
          cisco: { native: false, complexity: "high", cost: 15000, setup: "1 week" },
          aruba: { native: true, complexity: "medium", cost: 0, setup: "4 hours" },
          microsoft: { native: true, complexity: "low", cost: 0, setup: "5 min" },
        },
        description: "Cloud identity integration with conditional access",
      },
      {
        name: "Okta",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "20 min" },
          cisco: { native: false, complexity: "high", cost: 25000, setup: "2 weeks" },
          aruba: { native: false, complexity: "medium", cost: 5000, setup: "3 days" },
        },
        description: "Single sign-on and multi-factor authentication",
      },
    ],
  },
  {
    id: "security",
    name: "Security & Compliance",
    icon: Shield,
    color: "bg-red-500",
    integrations: [
      {
        name: "Splunk SIEM",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "30 min" },
          cisco: { native: true, complexity: "medium", cost: 0, setup: "4 hours" },
          aruba: { native: false, complexity: "high", cost: 10000, setup: "1 week" },
          forescout: { native: true, complexity: "medium", cost: 0, setup: "2 hours" },
        },
        description: "Security event correlation and threat detection",
      },
      {
        name: "CrowdStrike",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "15 min" },
          cisco: { native: false, complexity: "high", cost: 20000, setup: "2 weeks" },
          aruba: { native: false, complexity: "medium", cost: 8000, setup: "5 days" },
        },
        description: "Endpoint detection and response integration",
      },
      {
        name: "Qualys VMDR",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "20 min" },
          cisco: { native: false, complexity: "high", cost: 15000, setup: "1 week" },
          aruba: { native: false, complexity: "medium", cost: 7500, setup: "4 days" },
        },
        description: "Vulnerability management and device risk scoring",
      },
    ],
  },
  {
    id: "cloud",
    name: "Cloud Platforms",
    icon: Cloud,
    color: "bg-green-500",
    integrations: [
      {
        name: "AWS",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "10 min" },
          cisco: { native: false, complexity: "high", cost: 30000, setup: "3 weeks" },
          aruba: { native: true, complexity: "medium", cost: 0, setup: "2 hours" },
          juniper: { native: true, complexity: "low", cost: 0, setup: "30 min" },
        },
        description: "Cloud workload protection and network segmentation",
      },
      {
        name: "Microsoft Azure",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "15 min" },
          cisco: { native: false, complexity: "high", cost: 25000, setup: "2 weeks" },
          microsoft: { native: true, complexity: "low", cost: 0, setup: "5 min" },
          aruba: { native: true, complexity: "medium", cost: 0, setup: "1 hour" },
        },
        description: "Azure network security and conditional access",
      },
      {
        name: "Google Cloud",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "20 min" },
          cisco: { native: false, complexity: "high", cost: 35000, setup: "4 weeks" },
          aruba: { native: false, complexity: "medium", cost: 12000, setup: "1 week" },
        },
        description: "GCP security integration and network policies",
      },
    ],
  },
  {
    id: "infrastructure",
    name: "Network Infrastructure",
    icon: Network,
    color: "bg-purple-500",
    integrations: [
      {
        name: "Cisco Switches",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "30 min" },
          cisco: { native: true, complexity: "low", cost: 0, setup: "1 hour" },
          aruba: { native: false, complexity: "high", cost: 15000, setup: "2 weeks" },
          meraki: { native: true, complexity: "low", cost: 0, setup: "15 min" },
        },
        description: "Dynamic VLAN assignment and port control",
      },
      {
        name: "Aruba Switches",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "20 min" },
          cisco: { native: false, complexity: "high", cost: 20000, setup: "3 weeks" },
          aruba: { native: true, complexity: "low", cost: 0, setup: "30 min" },
        },
        description: "ClearPass integration and policy enforcement",
      },
      {
        name: "Juniper Networks",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "25 min" },
          cisco: { native: false, complexity: "high", cost: 18000, setup: "2 weeks" },
          juniper: { native: true, complexity: "low", cost: 0, setup: "20 min" },
        },
        description: "Mist AI integration and automated remediation",
      },
    ],
  },
  {
    id: "itsm",
    name: "IT Service Management",
    icon: Settings,
    color: "bg-orange-500",
    integrations: [
      {
        name: "ServiceNow",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "45 min" },
          cisco: { native: true, complexity: "medium", cost: 0, setup: "6 hours" },
          aruba: { native: true, complexity: "medium", cost: 0, setup: "3 hours" },
          forescout: { native: true, complexity: "medium", cost: 0, setup: "4 hours" },
        },
        description: "Automated ticket creation and workflow integration",
      },
      {
        name: "Jira Service Management",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "30 min" },
          cisco: { native: false, complexity: "high", cost: 12000, setup: "1 week" },
          aruba: { native: false, complexity: "medium", cost: 6000, setup: "3 days" },
        },
        description: "Issue tracking and change management integration",
      },
    ],
  },
  {
    id: "monitoring",
    name: "Monitoring & Analytics",
    icon: Monitor,
    color: "bg-teal-500",
    integrations: [
      {
        name: "Datadog",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "20 min" },
          cisco: { native: false, complexity: "high", cost: 15000, setup: "2 weeks" },
          aruba: { native: false, complexity: "medium", cost: 8000, setup: "5 days" },
        },
        description: "Network performance monitoring and alerting",
      },
      {
        name: "Elastic Stack",
        vendors: {
          portnox: { native: true, complexity: "low", cost: 0, setup: "40 min" },
          cisco: { native: false, complexity: "high", cost: 20000, setup: "3 weeks" },
          aruba: { native: false, complexity: "medium", cost: 10000, setup: "1 week" },
        },
        description: "Log analysis and security event correlation",
      },
    ],
  },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export default function IntegrationHubView({ selectedVendors }: IntegrationHubViewProps) {
  const [activeCategory, setActiveCategory] = useState("identity")
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)

  const calculateIntegrationScore = (vendorId: string) => {
    let totalScore = 0
    let totalIntegrations = 0

    integrationCategories.forEach((category) => {
      category.integrations.forEach((integration) => {
        if (integration.vendors[vendorId]) {
          const vendor = integration.vendors[vendorId]
          let score = vendor.native ? 100 : 50
          score -= vendor.complexity === "high" ? 30 : vendor.complexity === "medium" ? 15 : 0
          score -= vendor.cost > 0 ? 20 : 0
          totalScore += Math.max(0, score)
          totalIntegrations++
        }
      })
    })

    return totalIntegrations > 0 ? Math.round(totalScore / totalIntegrations) : 0
  }

  const getIntegrationComplexityData = () => {
    const vendors = ["portnox", "cisco", "aruba", "juniper", "microsoft", "forescout", "meraki"]
    return vendors.map((vendorId) => {
      let native = 0
      let custom = 0
      let total = 0

      integrationCategories.forEach((category) => {
        category.integrations.forEach((integration) => {
          if (integration.vendors[vendorId]) {
            total++
            if (integration.vendors[vendorId].native) {
              native++
            } else {
              custom++
            }
          }
        })
      })

      return {
        vendor: vendorId.charAt(0).toUpperCase() + vendorId.slice(1),
        native,
        custom,
        total,
        score: calculateIntegrationScore(vendorId),
      }
    })
  }

  const getSetupTimeComparison = () => {
    const activeIntegrations = integrationCategories.find((cat) => cat.id === activeCategory)?.integrations || []

    return activeIntegrations.map((integration) => {
      const data = { name: integration.name }
      Object.entries(integration.vendors).forEach(([vendorId, vendor]) => {
        const timeInMinutes = parseSetupTime(vendor.setup)
        data[vendorId] = timeInMinutes
      })
      return data
    })
  }

  const parseSetupTime = (setupTime: string): number => {
    if (setupTime.includes("min")) {
      return Number.parseInt(setupTime)
    } else if (setupTime.includes("hour")) {
      return Number.parseInt(setupTime) * 60
    } else if (setupTime.includes("day")) {
      return Number.parseInt(setupTime) * 60 * 8 // 8 hour work day
    } else if (setupTime.includes("week")) {
      return Number.parseInt(setupTime) * 60 * 8 * 5 // 5 day work week
    }
    return 0
  }

  const getCostAnalysis = () => {
    const vendors = ["portnox", "cisco", "aruba", "juniper", "microsoft"]
    return vendors.map((vendorId) => {
      let totalCost = 0
      let integrationCount = 0

      integrationCategories.forEach((category) => {
        category.integrations.forEach((integration) => {
          if (integration.vendors[vendorId]) {
            totalCost += integration.vendors[vendorId].cost
            integrationCount++
          }
        })
      })

      return {
        vendor: vendorId.charAt(0).toUpperCase() + vendorId.slice(1),
        totalCost,
        avgCostPerIntegration: integrationCount > 0 ? totalCost / integrationCount : 0,
        integrationCount,
      }
    })
  }

  const complexityData = getIntegrationComplexityData()
  const setupTimeData = getSetupTimeComparison()
  const costAnalysisData = getCostAnalysis()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Integration Hub</h2>
          <p className="text-muted-foreground">Comprehensive integration capabilities and vendor ecosystem analysis</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {integrationCategories.reduce((sum, cat) => sum + cat.integrations.length, 0)} Integrations
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="comparison">Vendor Comparison</TabsTrigger>
          <TabsTrigger value="analysis">Cost Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration Complexity by Vendor</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={complexityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="native" fill="#00C49F" name="Native Integrations" />
                    <Bar dataKey="custom" fill="#FF8042" name="Custom Integrations" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complexityData.map((vendor, index) => (
                    <div key={vendor.vendor} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{vendor.vendor}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Progress value={vendor.score} className="w-24" />
                        <span className="text-sm font-medium w-12">{vendor.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {integrationCategories.slice(0, 3).map((category) => {
              const IconComponent = category.icon
              return (
                <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${category.color} text-white`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{category.integrations.length} integrations</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.integrations.slice(0, 2).map((integration) => (
                        <div key={integration.name} className="flex items-center justify-between text-sm">
                          <span>{integration.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {Object.keys(integration.vendors).length} vendors
                          </Badge>
                        </div>
                      ))}
                      {category.integrations.length > 2 && (
                        <p className="text-xs text-muted-foreground">+{category.integrations.length - 2} more...</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {integrationCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{category.name}</span>
                </Button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Setup Time Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={setupTimeData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `${value}min`} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip formatter={(value) => [`${value} minutes`, ""]} />
                    <Bar dataKey="portnox" fill="#00C49F" name="Portnox" />
                    <Bar dataKey="cisco" fill="#FF8042" name="Cisco" />
                    <Bar dataKey="aruba" fill="#8884d8" name="Aruba" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrationCategories
                    .find((cat) => cat.id === activeCategory)
                    ?.integrations.map((integration) => (
                      <div key={integration.name} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{integration.name}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setSelectedIntegration(selectedIntegration === integration.name ? null : integration.name)
                            }
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(integration.vendors).map(([vendorId, vendor]) => (
                            <div key={vendorId} className="flex items-center justify-between text-xs">
                              <span className="capitalize">{vendorId}</span>
                              <div className="flex items-center space-x-1">
                                {vendor.native ? (
                                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                                ) : (
                                  <AlertTriangle className="h-3 w-3 text-yellow-500" />
                                )}
                                <Badge
                                  variant={
                                    vendor.complexity === "low"
                                      ? "default"
                                      : vendor.complexity === "medium"
                                        ? "secondary"
                                        : "destructive"
                                  }
                                  className="text-xs"
                                >
                                  {vendor.complexity}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Integration Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Vendor</th>
                      <th className="text-center p-3">Native</th>
                      <th className="text-center p-3">Custom</th>
                      <th className="text-center p-3">Total</th>
                      <th className="text-center p-3">Score</th>
                      <th className="text-center p-3">Avg Setup</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complexityData.map((vendor, index) => (
                      <tr key={vendor.vendor} className="border-b">
                        <td className="p-3 font-medium">{vendor.vendor}</td>
                        <td className="text-center p-3">
                          <Badge variant="default">{vendor.native}</Badge>
                        </td>
                        <td className="text-center p-3">
                          <Badge variant="secondary">{vendor.custom}</Badge>
                        </td>
                        <td className="text-center p-3">{vendor.total}</td>
                        <td className="text-center p-3">
                          <Badge
                            variant={vendor.score >= 80 ? "default" : vendor.score >= 60 ? "secondary" : "destructive"}
                          >
                            {vendor.score}%
                          </Badge>
                        </td>
                        <td className="text-center p-3">
                          {vendor.vendor === "Portnox" ? "20 min" : vendor.vendor === "Cisco" ? "4 hours" : "2 hours"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration Radar Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart
                    data={integrationCategories.map((category) => ({
                      category: category.name.split(" ")[0],
                      portnox: calculateCategoryScore("portnox", category.id),
                      cisco: calculateCategoryScore("cisco", category.id),
                      aruba: calculateCategoryScore("aruba", category.id),
                    }))}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Portnox" dataKey="portnox" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} />
                    <Radar name="Cisco" dataKey="cisco" stroke="#FF8042" fill="#FF8042" fillOpacity={0.6} />
                    <Radar name="Aruba" dataKey="aruba" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Integration Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Portnox CLEAR</strong> leads with 95% native integrations and fastest setup times averaging
                    20 minutes per integration.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Traditional NAC solutions</strong> require custom development for 60% of integrations,
                    increasing costs by $15K-$30K per integration.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Cloud-native platforms</strong> offer API-first architecture enabling rapid integration
                    development and deployment.
                  </AlertDescription>
                </Alert>

                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Integration Priorities</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Identity Management</span>
                      <Badge variant="default">Critical</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Security Tools</span>
                      <Badge variant="default">High</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cloud Platforms</span>
                      <Badge variant="secondary">Medium</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ITSM Tools</span>
                      <Badge variant="secondary">Medium</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Cost Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costAnalysisData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                  <Legend />
                  <Bar dataKey="totalCost" fill="#FF8042" name="Total Integration Cost" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown by Vendor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costAnalysisData.map((vendor, index) => (
                    <div key={vendor.vendor} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{vendor.vendor}</h4>
                        <Badge variant="outline">${vendor.totalCost.toLocaleString()}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Integrations:</span>
                          <span className="ml-2 font-medium">{vendor.integrationCount}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Avg Cost:</span>
                          <span className="ml-2 font-medium">
                            ${Math.round(vendor.avgCostPerIntegration).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={Math.min(
                          100,
                          (vendor.totalCost / Math.max(...costAnalysisData.map((v) => v.totalCost))) * 100,
                        )}
                        className="mt-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Impact of Integrations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Native Integrations</h4>
                      <p className="text-sm text-muted-foreground">Immediate value, no custom development</p>
                    </div>
                    <Badge variant="default">+$50K ROI</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">API-Based Integrations</h4>
                      <p className="text-sm text-muted-foreground">Quick setup, standardized approach</p>
                    </div>
                    <Badge variant="secondary">+$30K ROI</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Custom Integrations</h4>
                      <p className="text-sm text-muted-foreground">High cost, long development time</p>
                    </div>
                    <Badge variant="destructive">-$20K ROI</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold">Integration Value Drivers</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Reduced manual processes (40% time savings)</li>
                    <li>• Automated incident response (60% faster)</li>
                    <li>• Centralized security visibility (90% coverage)</li>
                    <li>• Compliance automation (80% reduction in audit time)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function calculateCategoryScore(vendorId: string, categoryId: string): number {
  const category = integrationCategories.find((cat) => cat.id === categoryId)
  if (!category) return 0

  let totalScore = 0
  let count = 0

  category.integrations.forEach((integration) => {
    if (integration.vendors[vendorId]) {
      const vendor = integration.vendors[vendorId]
      let score = vendor.native ? 100 : 50
      score -= vendor.complexity === "high" ? 30 : vendor.complexity === "medium" ? 15 : 0
      score -= vendor.cost > 0 ? 20 : 0
      totalScore += Math.max(0, score)
      count++
    }
  })

  return count > 0 ? Math.round(totalScore / count) : 0
}
