"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  DollarSign,
  Shield,
  Cloud,
  Users,
  Settings,
  Activity,
  Star,
  TrendingUp,
} from "lucide-react"

interface IntegrationHubViewProps {
  selectedVendors: string[]
}

const INTEGRATION_CATEGORIES = {
  identity: {
    name: "Identity & Access Management",
    icon: Users,
    color: "bg-blue-500",
    integrations: [
      {
        name: "Active Directory",
        vendor: "Microsoft",
        complexity: "Low",
        cost: 0,
        timeToImplement: 2,
        portnoxSupport: "Native",
        ciscoSupport: "Native",
        arubaSupport: "Native",
        benefits: ["Single Sign-On", "User Provisioning", "Group Policies"],
      },
      {
        name: "Azure AD",
        vendor: "Microsoft",
        complexity: "Low",
        cost: 0,
        timeToImplement: 1,
        portnoxSupport: "Native",
        ciscoSupport: "API",
        arubaSupport: "Native",
        benefits: ["Cloud Identity", "Conditional Access", "MFA Integration"],
      },
      {
        name: "Okta",
        vendor: "Okta",
        complexity: "Medium",
        cost: 5000,
        timeToImplement: 5,
        portnoxSupport: "Native",
        ciscoSupport: "Custom",
        arubaSupport: "API",
        benefits: ["Universal Directory", "Adaptive MFA", "Lifecycle Management"],
      },
      {
        name: "Ping Identity",
        vendor: "Ping Identity",
        complexity: "High",
        cost: 8000,
        timeToImplement: 10,
        portnoxSupport: "API",
        ciscoSupport: "Native",
        arubaSupport: "Custom",
        benefits: ["Federated Identity", "API Security", "Risk-Based Auth"],
      },
    ],
  },
  siem: {
    name: "SIEM & Security Analytics",
    icon: Shield,
    color: "bg-red-500",
    integrations: [
      {
        name: "Splunk",
        vendor: "Splunk",
        complexity: "Medium",
        cost: 3000,
        timeToImplement: 7,
        portnoxSupport: "Native",
        ciscoSupport: "Native",
        arubaSupport: "API",
        benefits: ["Log Analytics", "Threat Detection", "Compliance Reporting"],
      },
      {
        name: "QRadar",
        vendor: "IBM",
        complexity: "High",
        cost: 5000,
        timeToImplement: 14,
        portnoxSupport: "API",
        ciscoSupport: "Native",
        arubaSupport: "Custom",
        benefits: ["Security Intelligence", "Incident Response", "Risk Management"],
      },
      {
        name: "Sentinel",
        vendor: "Microsoft",
        complexity: "Medium",
        cost: 2000,
        timeToImplement: 5,
        portnoxSupport: "Native",
        ciscoSupport: "API",
        arubaSupport: "API",
        benefits: ["Cloud SIEM", "AI-Powered Detection", "Automated Response"],
      },
      {
        name: "ArcSight",
        vendor: "Micro Focus",
        complexity: "High",
        cost: 6000,
        timeToImplement: 21,
        portnoxSupport: "Custom",
        ciscoSupport: "Native",
        arubaSupport: "Custom",
        benefits: ["Real-time Monitoring", "Compliance Management", "Forensics"],
      },
    ],
  },
  itsm: {
    name: "IT Service Management",
    icon: Settings,
    color: "bg-green-500",
    integrations: [
      {
        name: "ServiceNow",
        vendor: "ServiceNow",
        complexity: "Medium",
        cost: 4000,
        timeToImplement: 10,
        portnoxSupport: "Native",
        ciscoSupport: "API",
        arubaSupport: "API",
        benefits: ["Incident Management", "Change Control", "Asset Tracking"],
      },
      {
        name: "Jira Service Management",
        vendor: "Atlassian",
        complexity: "Low",
        cost: 1000,
        timeToImplement: 3,
        portnoxSupport: "API",
        ciscoSupport: "Custom",
        arubaSupport: "API",
        benefits: ["Ticket Management", "SLA Tracking", "Knowledge Base"],
      },
      {
        name: "Remedy",
        vendor: "BMC",
        complexity: "High",
        cost: 7000,
        timeToImplement: 15,
        portnoxSupport: "Custom",
        ciscoSupport: "Native",
        arubaSupport: "Custom",
        benefits: ["ITIL Processes", "Configuration Management", "Problem Management"],
      },
    ],
  },
  network: {
    name: "Network Infrastructure",
    icon: Activity,
    color: "bg-purple-500",
    integrations: [
      {
        name: "Cisco DNA Center",
        vendor: "Cisco",
        complexity: "High",
        cost: 10000,
        timeToImplement: 20,
        portnoxSupport: "API",
        ciscoSupport: "Native",
        arubaSupport: "Custom",
        benefits: ["Network Automation", "Policy Orchestration", "Analytics"],
      },
      {
        name: "Aruba Central",
        vendor: "HPE Aruba",
        complexity: "Medium",
        cost: 3000,
        timeToImplement: 7,
        portnoxSupport: "API",
        ciscoSupport: "Custom",
        arubaSupport: "Native",
        benefits: ["Cloud Management", "AI Insights", "Zero Touch Provisioning"],
      },
      {
        name: "Juniper Mist",
        vendor: "Juniper",
        complexity: "Medium",
        cost: 4000,
        timeToImplement: 8,
        portnoxSupport: "API",
        ciscoSupport: "Custom",
        arubaSupport: "Custom",
        benefits: ["AI-Driven Operations", "Wireless Assurance", "Location Services"],
      },
    ],
  },
  cloud: {
    name: "Cloud Platforms",
    icon: Cloud,
    color: "bg-cyan-500",
    integrations: [
      {
        name: "AWS",
        vendor: "Amazon",
        complexity: "Medium",
        cost: 2000,
        timeToImplement: 5,
        portnoxSupport: "Native",
        ciscoSupport: "API",
        arubaSupport: "API",
        benefits: ["VPC Integration", "IAM Roles", "CloudTrail Logging"],
      },
      {
        name: "Azure",
        vendor: "Microsoft",
        complexity: "Low",
        cost: 1000,
        timeToImplement: 3,
        portnoxSupport: "Native",
        ciscoSupport: "API",
        arubaSupport: "Native",
        benefits: ["Virtual Networks", "Security Center", "Monitor Integration"],
      },
      {
        name: "Google Cloud",
        vendor: "Google",
        complexity: "Medium",
        cost: 2500,
        timeToImplement: 6,
        portnoxSupport: "API",
        ciscoSupport: "Custom",
        arubaSupport: "API",
        benefits: ["VPC Security", "Cloud Identity", "Security Command Center"],
      },
    ],
  },
}

export default function IntegrationHubView({ selectedVendors }: IntegrationHubViewProps) {
  const [activeCategory, setActiveCategory] = useState("identity")
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([])
  const [showCostAnalysis, setShowCostAnalysis] = useState(false)

  // Calculate integration costs and complexity
  const calculateIntegrationMetrics = () => {
    let totalCost = 0
    let totalTime = 0
    let complexityScore = 0
    let portnoxAdvantage = 0

    Object.values(INTEGRATION_CATEGORIES).forEach((category) => {
      category.integrations.forEach((integration) => {
        if (selectedIntegrations.includes(integration.name)) {
          totalCost += integration.cost
          totalTime += integration.timeToImplement

          // Complexity scoring
          const complexityPoints = {
            Low: 1,
            Medium: 2,
            High: 3,
          }[integration.complexity]
          complexityScore += complexityPoints

          // Portnox advantage calculation
          if (integration.portnoxSupport === "Native") {
            portnoxAdvantage += 3
          } else if (integration.portnoxSupport === "API") {
            portnoxAdvantage += 2
          } else {
            portnoxAdvantage += 1
          }
        }
      })
    })

    return {
      totalCost,
      totalTime,
      complexityScore,
      portnoxAdvantage: Math.min(100, (portnoxAdvantage / (selectedIntegrations.length * 3)) * 100),
    }
  }

  const metrics = calculateIntegrationMetrics()

  // Integration comparison data
  const integrationComparisonData = Object.values(INTEGRATION_CATEGORIES)
    .flatMap((category) => category.integrations)
    .filter((integration) => selectedIntegrations.includes(integration.name))
    .map((integration) => ({
      name: integration.name,
      portnox: integration.portnoxSupport === "Native" ? 100 : integration.portnoxSupport === "API" ? 75 : 25,
      cisco: integration.ciscoSupport === "Native" ? 100 : integration.ciscoSupport === "API" ? 75 : 25,
      aruba: integration.arubaSupport === "Native" ? 100 : integration.arubaSupport === "API" ? 75 : 25,
      cost: integration.cost,
      time: integration.timeToImplement,
    }))

  const toggleIntegration = (integrationName: string) => {
    setSelectedIntegrations((prev) =>
      prev.includes(integrationName) ? prev.filter((name) => name !== integrationName) : [...prev, integrationName],
    )
  }

  const IntegrationCard = ({ integration, category }: { integration: any; category: string }) => {
    const isSelected = selectedIntegrations.includes(integration.name)
    const getSupportBadge = (support: string) => {
      const variants = {
        Native: "default",
        API: "secondary",
        Custom: "outline",
      } as const
      return <Badge variant={variants[support as keyof typeof variants]}>{support}</Badge>
    }

    return (
      <Card
        className={`cursor-pointer transition-all ${isSelected ? "ring-2 ring-primary" : ""}`}
        onClick={() => toggleIntegration(integration.name)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{integration.name}</CardTitle>
            {isSelected && <CheckCircle2 className="h-5 w-5 text-green-600" />}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{integration.vendor}</Badge>
            <Badge
              variant={
                integration.complexity === "Low"
                  ? "default"
                  : integration.complexity === "Medium"
                    ? "secondary"
                    : "destructive"
              }
            >
              {integration.complexity}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="font-medium">Portnox</p>
              {getSupportBadge(integration.portnoxSupport)}
            </div>
            <div>
              <p className="font-medium">Cisco</p>
              {getSupportBadge(integration.ciscoSupport)}
            </div>
            <div>
              <p className="font-medium">Aruba</p>
              {getSupportBadge(integration.arubaSupport)}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{integration.timeToImplement} days</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>${integration.cost.toLocaleString()}</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">Benefits:</p>
            <div className="flex flex-wrap gap-1">
              {integration.benefits.map((benefit) => (
                <Badge key={benefit} variant="outline" className="text-xs">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Integration Hub</h2>
          <p className="text-muted-foreground">Analyze integration capabilities and costs across NAC vendors</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="cost-analysis">Show Cost Analysis</Label>
          <Switch id="cost-analysis" checked={showCostAnalysis} onCheckedChange={setShowCostAnalysis} />
        </div>
      </div>

      {/* Integration Metrics Summary */}
      {selectedIntegrations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Cost</p>
                  <p className="text-2xl font-bold">${metrics.totalCost.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Implementation Time</p>
                  <p className="text-2xl font-bold">{metrics.totalTime} days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Complexity Score</p>
                  <p className="text-2xl font-bold">{metrics.complexityScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Portnox Advantage</p>
                  <p className="text-2xl font-bold">{Math.round(metrics.portnoxAdvantage)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-5">
          {Object.entries(INTEGRATION_CATEGORIES).map(([key, category]) => {
            const Icon = category.icon
            return (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name.split(" ")[0]}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {Object.entries(INTEGRATION_CATEGORIES).map(([key, category]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${category.color}`}>
                <category.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="text-muted-foreground">{category.integrations.length} integrations available</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.integrations.map((integration) => (
                <IntegrationCard key={integration.name} integration={integration} category={key} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Integration Analysis */}
      {selectedIntegrations.length > 0 && showCostAnalysis && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Integration Analysis</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Support Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={integrationComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="portnox" fill="#00D4AA" name="Portnox" />
                    <Bar dataKey="cisco" fill="#0EA5E9" name="Cisco" />
                    <Bar dataKey="aruba" fill="#F97316" name="Aruba" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={integrationComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="time" stroke="#8884d8" name="Days" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Integration Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={integrationComparisonData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="cost"
                    label={({ name, cost }) => `${name}: $${cost.toLocaleString()}`}
                  >
                    {integrationComparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Cost"]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Integration Recommendations */}
          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              <strong>Integration Recommendation:</strong> Portnox CLEAR offers {Math.round(metrics.portnoxAdvantage)}%
              better integration support with{" "}
              {
                selectedIntegrations.filter((name) => {
                  const integration = Object.values(INTEGRATION_CATEGORIES)
                    .flatMap((cat) => cat.integrations)
                    .find((int) => int.name === name)
                  return integration?.portnoxSupport === "Native"
                }).length
              }{" "}
              native integrations out of {selectedIntegrations.length} selected. This translates to{" "}
              {Math.round(metrics.totalTime * 0.3)} fewer implementation days and $
              {Math.round(metrics.totalCost * 0.2).toLocaleString()} in reduced integration costs.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}
