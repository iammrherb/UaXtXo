"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  Shield,
  Smartphone,
  Activity,
  Cloud,
  Database,
  Zap,
  CheckCircle,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Search,
  TrendingUp,
  Users,
  Wifi,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"

// Integration Categories and Types
const INTEGRATION_CATEGORIES = {
  identity: {
    name: "Identity & Access",
    icon: <Users className="h-4 w-4" />,
    color: "bg-blue-500",
    description: "Identity providers and directory services",
  },
  mdm: {
    name: "Mobile Device Management",
    icon: <Smartphone className="h-4 w-4" />,
    color: "bg-green-500",
    description: "Device management and compliance platforms",
  },
  siem: {
    name: "SIEM & Analytics",
    icon: <Activity className="h-4 w-4" />,
    color: "bg-purple-500",
    description: "Security information and event management",
  },
  security: {
    name: "Security Tools",
    icon: <Shield className="h-4 w-4" />,
    color: "bg-red-500",
    description: "Endpoint protection and security platforms",
  },
  network: {
    name: "Network Infrastructure",
    icon: <Wifi className="h-4 w-4" />,
    color: "bg-orange-500",
    description: "Network devices and management platforms",
  },
  cloud: {
    name: "Cloud Platforms",
    icon: <Cloud className="h-4 w-4" />,
    color: "bg-cyan-500",
    description: "Cloud services and infrastructure",
  },
}

// Sample integration data
const AVAILABLE_INTEGRATIONS = {
  identity: [
    {
      id: "azure-ad",
      name: "Microsoft Azure AD",
      vendor: "Microsoft",
      type: "SAML/OIDC",
      complexity: "low",
      cost: 0,
      setupTime: "2-4 hours",
      features: ["SSO", "MFA", "Conditional Access", "User Provisioning"],
      status: "available",
      popularity: 95,
    },
    {
      id: "okta",
      name: "Okta",
      vendor: "Okta",
      type: "SAML/OIDC",
      complexity: "low",
      cost: 0,
      setupTime: "1-2 hours",
      features: ["SSO", "MFA", "Universal Directory", "Lifecycle Management"],
      status: "available",
      popularity: 88,
    },
    {
      id: "ping-identity",
      name: "PingIdentity",
      vendor: "Ping Identity",
      type: "SAML/OIDC",
      complexity: "medium",
      cost: 5000,
      setupTime: "4-8 hours",
      features: ["SSO", "MFA", "API Security", "Risk-based Auth"],
      status: "available",
      popularity: 72,
    },
  ],
  mdm: [
    {
      id: "intune",
      name: "Microsoft Intune",
      vendor: "Microsoft",
      type: "REST API",
      complexity: "low",
      cost: 0,
      setupTime: "2-4 hours",
      features: ["Device Compliance", "App Management", "Conditional Access", "Endpoint Analytics"],
      status: "available",
      popularity: 92,
    },
    {
      id: "jamf",
      name: "Jamf Pro",
      vendor: "Jamf",
      type: "REST API",
      complexity: "medium",
      cost: 2500,
      setupTime: "4-6 hours",
      features: ["macOS/iOS Management", "Zero Touch Deployment", "Security Compliance"],
      status: "available",
      popularity: 85,
    },
    {
      id: "workspace-one",
      name: "VMware Workspace ONE",
      vendor: "VMware",
      type: "REST API",
      complexity: "high",
      cost: 8000,
      setupTime: "8-12 hours",
      features: ["Unified Endpoint Management", "Digital Workspace", "Zero Trust"],
      status: "available",
      popularity: 78,
    },
  ],
  siem: [
    {
      id: "splunk",
      name: "Splunk Enterprise",
      vendor: "Splunk",
      type: "Syslog/API",
      complexity: "medium",
      cost: 15000,
      setupTime: "6-10 hours",
      features: ["Log Analysis", "Real-time Monitoring", "Custom Dashboards", "ML Analytics"],
      status: "available",
      popularity: 89,
    },
    {
      id: "sentinel",
      name: "Microsoft Sentinel",
      vendor: "Microsoft",
      type: "REST API",
      complexity: "low",
      cost: 0,
      setupTime: "2-4 hours",
      features: ["Cloud-native SIEM", "AI/ML Detection", "Automated Response"],
      status: "available",
      popularity: 82,
    },
    {
      id: "qradar",
      name: "IBM QRadar",
      vendor: "IBM",
      type: "Syslog/API",
      complexity: "high",
      cost: 25000,
      setupTime: "12-16 hours",
      features: ["Advanced Analytics", "Threat Intelligence", "Compliance Reporting"],
      status: "available",
      popularity: 75,
    },
  ],
  security: [
    {
      id: "crowdstrike",
      name: "CrowdStrike Falcon",
      vendor: "CrowdStrike",
      type: "REST API",
      complexity: "medium",
      cost: 12000,
      setupTime: "4-6 hours",
      features: ["Endpoint Detection", "Threat Intelligence", "Incident Response"],
      status: "available",
      popularity: 91,
    },
    {
      id: "defender",
      name: "Microsoft Defender",
      vendor: "Microsoft",
      type: "Graph API",
      complexity: "low",
      cost: 0,
      setupTime: "2-3 hours",
      features: ["Endpoint Protection", "Threat Analytics", "Automated Investigation"],
      status: "available",
      popularity: 87,
    },
    {
      id: "carbon-black",
      name: "VMware Carbon Black",
      vendor: "VMware",
      type: "REST API",
      complexity: "medium",
      cost: 10000,
      setupTime: "6-8 hours",
      features: ["Behavioral Analysis", "Application Control", "Threat Hunting"],
      status: "available",
      popularity: 73,
    },
  ],
}

interface IntegrationHubViewProps {
  selectedVendors: string[]
  config: any
}

// Safe number helper function
const safeNumber = (value: any, fallback = 0): number => {
  if (typeof value === "number" && !isNaN(value) && isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value)
    return !isNaN(parsed) && isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

export default function IntegrationHubView({ selectedVendors, config }: IntegrationHubViewProps) {
  const [activeCategory, setActiveCategory] = useState("identity")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([
    "azure-ad",
    "intune",
    "splunk",
    "crowdstrike",
  ])
  const [showConfigDialog, setShowConfigDialog] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null)

  // Get vendor-specific integration data
  const getVendorIntegrations = (vendorId: string) => {
    const vendor = ComprehensiveVendorDatabase[vendorId]
    if (!vendor) return { identity: [], mdm: [], siem: [], security: [] }
    return vendor.integrations || { identity: [], mdm: [], siem: [], security: [] }
  }

  // Calculate integration compatibility
  const calculateCompatibility = () => {
    const compatibility: Record<string, number> = {}
    selectedVendors.forEach((vendorId) => {
      const vendor = ComprehensiveVendorDatabase[vendorId]
      if (vendor && vendor.integrations) {
        let score = 0
        let total = 0
        Object.entries(vendor.integrations).forEach(([category, integrations]) => {
          if (Array.isArray(integrations)) {
            integrations.forEach((integration) => {
              total++
              const cost = safeNumber(integration.cost, 0)
              if (cost === 0) score++
            })
          }
        })
        compatibility[vendorId] = total > 0 ? Math.round((score / total) * 100) : 0
      } else {
        compatibility[vendorId] = 0
      }
    })
    return compatibility
  }

  // Get integration cost analysis
  const getIntegrationCosts = () => {
    const costs: Record<string, number> = {}
    selectedVendors.forEach((vendorId) => {
      const vendor = ComprehensiveVendorDatabase[vendorId]
      if (vendor && vendor.integrations) {
        let totalCost = 0
        Object.values(vendor.integrations).forEach((integrations) => {
          if (Array.isArray(integrations)) {
            integrations.forEach((integration) => {
              totalCost += safeNumber(integration.cost, 0)
            })
          }
        })
        costs[vendorId] = totalCost
      } else {
        costs[vendorId] = 0
      }
    })
    return costs
  }

  const compatibility = calculateCompatibility()
  const integrationCosts = getIntegrationCosts()

  const filteredIntegrations = AVAILABLE_INTEGRATIONS[activeCategory as keyof typeof AVAILABLE_INTEGRATIONS]?.filter(
    (integration) => integration.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const IntegrationCard = ({ integration }: { integration: any }) => {
    const isSelected = selectedIntegrations.includes(integration.id)
    const complexityColor =
      integration.complexity === "low"
        ? "text-green-600"
        : integration.complexity === "medium"
          ? "text-yellow-600"
          : "text-red-600"

    const popularityValue = safeNumber(integration.popularity, 0)

    return (
      <Card
        className={cn(
          "cursor-pointer transition-all duration-200 hover:shadow-md",
          isSelected && "ring-2 ring-primary ring-offset-2",
        )}
        onClick={() => {
          setSelectedIntegrations((prev) =>
            isSelected ? prev.filter((id) => id !== integration.id) : [...prev, integration.id],
          )
        }}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div
                className={cn(
                  "w-3 h-3 rounded-full",
                  INTEGRATION_CATEGORIES[activeCategory as keyof typeof INTEGRATION_CATEGORIES].color,
                )}
              />
              <div>
                <h4 className="font-semibold text-sm">{integration.name}</h4>
                <p className="text-xs text-muted-foreground">{integration.vendor}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isSelected && <CheckCircle className="h-4 w-4 text-green-600" />}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedIntegration(integration)
                  setShowConfigDialog(true)
                }}
              >
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Complexity:</span>
              <span className={cn("font-medium capitalize", complexityColor)}>{integration.complexity}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Setup Time:</span>
              <span className="font-medium">{integration.setupTime}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Cost:</span>
              <span className="font-medium">
                {safeNumber(integration.cost, 0) === 0
                  ? "Free"
                  : `$${safeNumber(integration.cost, 0).toLocaleString()}`}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Popularity:</span>
              <div className="flex items-center space-x-1">
                <Progress value={popularityValue} className="w-12 h-1" />
                <span className="font-medium">{popularityValue}%</span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {integration.features.slice(0, 3).map((feature: string) => (
                <Badge key={feature} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {integration.features.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{integration.features.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const VendorCompatibilityChart = () => {
    const data = selectedVendors.map((vendorId) => {
      const vendor = ComprehensiveVendorDatabase[vendorId]
      return {
        name: vendor?.name || vendorId,
        compatibility: safeNumber(compatibility[vendorId], 0),
        cost: safeNumber(integrationCosts[vendorId], 0),
      }
    })

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Vendor Integration Compatibility</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  name === "compatibility" ? `${safeNumber(value, 0)}%` : `$${safeNumber(value, 0).toLocaleString()}`,
                  name === "compatibility" ? "Compatibility" : "Integration Cost",
                ]}
              />
              <Bar dataKey="compatibility" fill="#00D4AA" name="compatibility" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )
  }

  const IntegrationCostBreakdown = () => {
    const data = Object.entries(INTEGRATION_CATEGORIES).map(([key, category]) => {
      const categoryIntegrations = AVAILABLE_INTEGRATIONS[key as keyof typeof AVAILABLE_INTEGRATIONS] || []
      const selectedCategoryIntegrations = categoryIntegrations.filter((integration) =>
        selectedIntegrations.includes(integration.id),
      )
      const totalCost = selectedCategoryIntegrations.reduce(
        (sum, integration) => sum + safeNumber(integration.cost, 0),
        0,
      )
      return {
        name: category.name,
        cost: totalCost,
        count: selectedCategoryIntegrations.length,
      }
    })

    const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Integration Cost Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data.filter((d) => d.cost > 0)}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="cost"
                  label={({ name, cost }) => `${name}: $${safeNumber(cost, 0).toLocaleString()}`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${safeNumber(value, 0).toLocaleString()}`, "Cost"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {data.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={cn("w-3 h-3 rounded-full")} style={{ backgroundColor: COLORS[index] }} />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.count} integrations</p>
                    </div>
                  </div>
                  <span className="font-semibold">${safeNumber(item.cost, 0).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const avgCompatibility =
    Object.values(compatibility).length > 0
      ? Math.round(
          Object.values(compatibility).reduce((sum, score) => sum + safeNumber(score, 0), 0) /
            Object.values(compatibility).length,
        )
      : 0

  const totalIntegrationCost = Object.values(integrationCosts).reduce((sum, cost) => sum + safeNumber(cost, 0), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Integration Hub</h2>
          <p className="text-muted-foreground">Manage and configure security tool integrations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Config
          </Button>
          <Button size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync All
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Active Integrations</p>
                <p className="text-2xl font-bold">{selectedIntegrations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Available</p>
                <p className="text-2xl font-bold">
                  {Object.values(AVAILABLE_INTEGRATIONS).reduce((sum, integrations) => sum + integrations.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Avg Compatibility</p>
                <p className="text-2xl font-bold">{avgCompatibility}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Total Cost</p>
                <p className="text-2xl font-bold">${totalIntegrationCost.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VendorCompatibilityChart />
        <IntegrationCostBreakdown />
      </div>

      {/* Integration Management */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Catalog</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search integrations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-6">
              {Object.entries(INTEGRATION_CATEGORIES).map(([key, category]) => (
                <TabsTrigger key={key} value={key} className="flex items-center space-x-2">
                  {category.icon}
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(INTEGRATION_CATEGORIES).map(([key, category]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <div className="mb-4">
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredIntegrations?.map((integration) => (
                    <IntegrationCard key={integration.id} integration={integration} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Configuration Dialog */}
      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configure Integration: {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>Set up and configure the integration parameters</DialogDescription>
          </DialogHeader>
          {selectedIntegration && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Integration Type</Label>
                  <Input value={selectedIntegration.type} disabled />
                </div>
                <div>
                  <Label>Complexity Level</Label>
                  <Input value={selectedIntegration.complexity} disabled className="capitalize" />
                </div>
              </div>
              <div>
                <Label>Features</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedIntegration.features.map((feature: string) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-semibold">Configuration Options</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Enable Real-time Sync</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Auto-remediation</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Send Notifications</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfigDialog(false)}>
              Cancel
            </Button>
            <Button>Save Configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
