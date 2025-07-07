"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Plug,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  Cloud,
  Shield,
  Zap,
  Database,
  Network,
  Settings,
  Search,
  Download,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"

interface IntegrationHubViewProps {
  selectedVendors?: string[]
  config?: any
}

// Safe helper functions
const safeNumber = (value: any, fallback = 0): number => {
  if (typeof value === "number" && !isNaN(value) && isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value)
    return !isNaN(parsed) && isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

const safeArray = (value: any): any[] => {
  return Array.isArray(value) ? value : []
}

const safeObject = (value: any): Record<string, any> => {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {}
}

// Enhanced integration data with comprehensive vendor coverage
const INTEGRATION_CATEGORIES = {
  identity: {
    name: "Identity & Access Management",
    icon: Shield,
    color: "#10b981",
    integrations: [
      { name: "Active Directory", type: "native", complexity: "low", cost: 0 },
      { name: "Azure AD", type: "native", complexity: "low", cost: 0 },
      { name: "Okta", type: "api", complexity: "medium", cost: 5000 },
      { name: "Ping Identity", type: "api", complexity: "medium", cost: 8000 },
      { name: "LDAP", type: "native", complexity: "low", cost: 0 },
      { name: "SAML", type: "native", complexity: "medium", cost: 0 },
      { name: "OAuth 2.0", type: "native", complexity: "medium", cost: 0 },
    ],
  },
  security: {
    name: "Security & Compliance",
    icon: Shield,
    color: "#3b82f6",
    integrations: [
      { name: "Splunk", type: "api", complexity: "medium", cost: 12000 },
      { name: "QRadar", type: "api", complexity: "high", cost: 15000 },
      { name: "ArcSight", type: "api", complexity: "high", cost: 18000 },
      { name: "Sentinel", type: "native", complexity: "medium", cost: 0 },
      { name: "CrowdStrike", type: "api", complexity: "medium", cost: 8000 },
      { name: "Carbon Black", type: "api", complexity: "medium", cost: 10000 },
      { name: "Qualys", type: "api", complexity: "medium", cost: 6000 },
    ],
  },
  network: {
    name: "Network Infrastructure",
    icon: Network,
    color: "#8b5cf6",
    integrations: [
      { name: "Cisco Switches", type: "native", complexity: "low", cost: 0 },
      { name: "Aruba Switches", type: "native", complexity: "low", cost: 0 },
      { name: "Juniper", type: "api", complexity: "medium", cost: 5000 },
      { name: "Extreme Networks", type: "api", complexity: "medium", cost: 4000 },
      { name: "Fortinet", type: "api", complexity: "medium", cost: 6000 },
      { name: "Palo Alto", type: "api", complexity: "medium", cost: 8000 },
      { name: "pfSense", type: "custom", complexity: "high", cost: 15000 },
    ],
  },
  cloud: {
    name: "Cloud Platforms",
    icon: Cloud,
    color: "#f59e0b",
    integrations: [
      { name: "AWS", type: "native", complexity: "low", cost: 0 },
      { name: "Azure", type: "native", complexity: "low", cost: 0 },
      { name: "Google Cloud", type: "api", complexity: "medium", cost: 3000 },
      { name: "VMware vSphere", type: "api", complexity: "medium", cost: 8000 },
      { name: "Hyper-V", type: "api", complexity: "medium", cost: 5000 },
      { name: "OpenStack", type: "custom", complexity: "high", cost: 20000 },
    ],
  },
  itsm: {
    name: "IT Service Management",
    icon: Settings,
    color: "#ef4444",
    integrations: [
      { name: "ServiceNow", type: "api", complexity: "medium", cost: 10000 },
      { name: "Jira Service Desk", type: "api", complexity: "medium", cost: 5000 },
      { name: "Remedy", type: "api", complexity: "high", cost: 15000 },
      { name: "Cherwell", type: "api", complexity: "medium", cost: 8000 },
      { name: "Freshservice", type: "api", complexity: "low", cost: 3000 },
    ],
  },
  database: {
    name: "Database & Analytics",
    icon: Database,
    color: "#06b6d4",
    integrations: [
      { name: "SQL Server", type: "native", complexity: "low", cost: 0 },
      { name: "Oracle", type: "api", complexity: "medium", cost: 8000 },
      { name: "MySQL", type: "native", complexity: "low", cost: 0 },
      { name: "PostgreSQL", type: "native", complexity: "low", cost: 0 },
      { name: "Elasticsearch", type: "api", complexity: "medium", cost: 5000 },
      { name: "MongoDB", type: "api", complexity: "medium", cost: 4000 },
    ],
  },
}

export default function IntegrationHubView({ selectedVendors = [], config = {} }: IntegrationHubViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [complexityFilter, setComplexityFilter] = useState("all")

  // Calculate integration compatibility for each vendor
  const calculateCompatibility = (vendor: any) => {
    const vendorData = safeObject(vendor)
    const integrations = safeObject(vendorData.integrations)

    let total = 0
    let supported = 0
    let nativeCost = 0
    let totalCost = 0

    Object.entries(INTEGRATION_CATEGORIES).forEach(([categoryKey, category]) => {
      const categoryIntegrations = safeArray(category.integrations)
      categoryIntegrations.forEach((integration) => {
        total++

        // Check if vendor supports this integration
        const vendorIntegrations = safeArray(integrations[categoryKey])
        const isSupported = vendorIntegrations.some((vInt: any) => safeObject(vInt).name === integration.name)

        if (isSupported) {
          supported++
          if (integration.type === "native") {
            nativeCost += safeNumber(integration.cost, 0)
          }
        }

        totalCost += safeNumber(integration.cost, 0)
      })
    })

    return {
      total,
      supported,
      percentage: total > 0 ? Math.round((supported / total) * 100) : 0,
      nativeCost,
      totalCost,
      score: total > 0 ? (supported / total) * 100 + (nativeCost / Math.max(totalCost, 1)) * 20 : 0,
    }
  }

  // Get vendor integration data
  const vendorIntegrationData = useMemo(() => {
    return Object.entries(ComprehensiveVendorDatabase).map(([vendorId, vendor]) => {
      const compatibility = calculateCompatibility(vendor)
      return {
        id: vendorId,
        name: safeObject(vendor).name || vendorId,
        category: safeObject(vendor).category || "niche",
        ...compatibility,
        deployment: safeArray(safeObject(vendor).deployment),
        implementationTime: safeNumber(safeObject(vendor).implementation?.timeToValue, 30),
        supportQuality: safeNumber(safeObject(vendor).implementation?.supportQuality, 70),
      }
    })
  }, [])

  // Filter integrations based on search and filters
  const filteredIntegrations = useMemo(() => {
    let allIntegrations: any[] = []

    Object.entries(INTEGRATION_CATEGORIES).forEach(([categoryKey, category]) => {
      if (selectedCategory === "all" || selectedCategory === categoryKey) {
        const categoryIntegrations = safeArray(category.integrations).map((integration) => ({
          ...integration,
          category: categoryKey,
          categoryName: category.name,
          categoryColor: category.color,
        }))
        allIntegrations = [...allIntegrations, ...categoryIntegrations]
      }
    })

    return allIntegrations.filter((integration) => {
      const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesComplexity = complexityFilter === "all" || integration.complexity === complexityFilter
      return matchesSearch && matchesComplexity
    })
  }, [searchTerm, selectedCategory, complexityFilter])

  // Chart data
  const compatibilityData = vendorIntegrationData.map((vendor) => ({
    name: vendor.name,
    supported: vendor.supported,
    total: vendor.total,
    percentage: vendor.percentage,
    score: Math.round(vendor.score),
  }))

  const categoryData = Object.entries(INTEGRATION_CATEGORIES).map(([key, category]) => ({
    category: category.name,
    integrations: safeArray(category.integrations).length,
    avgCost: Math.round(
      safeArray(category.integrations).reduce((sum, int) => sum + safeNumber(int.cost, 0), 0) /
        Math.max(safeArray(category.integrations).length, 1),
    ),
    nativeCount: safeArray(category.integrations).filter((int) => int.type === "native").length,
  }))

  const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Integration Hub</h2>
          <p className="text-muted-foreground">
            Comprehensive integration analysis and vendor compatibility assessment
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Analysis
          </Button>
          <Button size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Integration Guide
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search & Filter Integrations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Integrations</Label>
              <Input
                id="search"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(INTEGRATION_CATEGORIES).map(([key, category]) => (
                    <SelectItem key={key} value={key}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="complexity">Complexity</Label>
              <Select value={complexityFilter} onValueChange={setComplexityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="compatibility">Vendor Compatibility</TabsTrigger>
          <TabsTrigger value="catalog">Integration Catalog</TabsTrigger>
          <TabsTrigger value="analysis">Cost Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Plug className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Integrations</p>
                    <p className="text-2xl font-bold">
                      {Object.values(INTEGRATION_CATEGORIES).reduce(
                        (sum, cat) => sum + safeArray(cat.integrations).length,
                        0,
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Native Integrations</p>
                    <p className="text-2xl font-bold">
                      {Object.values(INTEGRATION_CATEGORIES).reduce(
                        (sum, cat) => sum + safeArray(cat.integrations).filter((int) => int.type === "native").length,
                        0,
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Compatibility</p>
                    <p className="text-2xl font-bold">
                      {vendorIntegrationData.length > 0
                        ? Math.round(
                            vendorIntegrationData.reduce((sum, vendor) => sum + vendor.percentage, 0) /
                              vendorIntegrationData.length,
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Categories</p>
                    <p className="text-2xl font-bold">{Object.keys(INTEGRATION_CATEGORIES).length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration Categories</CardTitle>
                <CardDescription>Distribution of integrations by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="integrations"
                      label={({ category, integrations }) => `${category}: ${integrations}`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vendor Compatibility Scores</CardTitle>
                <CardDescription>Overall integration compatibility by vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={compatibilityData.slice(0, 8)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="percentage" fill="#00D4AA" name="Compatibility %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compatibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Integration Matrix</CardTitle>
              <CardDescription>Detailed compatibility analysis for each vendor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendorIntegrationData.slice(0, 10).map((vendor) => (
                  <div key={vendor.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold">{vendor.name}</h4>
                        <Badge variant={vendor.category === "leader" ? "default" : "secondary"}>
                          {vendor.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{vendor.percentage}% Compatible</p>
                          <p className="text-xs text-muted-foreground">
                            {vendor.supported}/{vendor.total} integrations
                          </p>
                        </div>
                        <Progress value={vendor.percentage} className="w-20" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Deployment</p>
                        <p className="font-medium">{vendor.deployment.join(", ")}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Implementation</p>
                        <p className="font-medium">{vendor.implementationTime} days</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Support Quality</p>
                        <p className="font-medium">{vendor.supportQuality}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Overall Score</p>
                        <p className="font-medium">{Math.round(vendor.score)}/100</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="catalog" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Catalog</CardTitle>
              <CardDescription>
                Browse all available integrations ({filteredIntegrations.length} results)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIntegrations.map((integration, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{integration.name}</h4>
                      <Badge
                        variant={integration.type === "native" ? "default" : "secondary"}
                        style={{ backgroundColor: integration.categoryColor, color: "white" }}
                      >
                        {integration.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{integration.categoryName}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={cn(
                            integration.complexity === "low" && "border-green-500 text-green-700",
                            integration.complexity === "medium" && "border-yellow-500 text-yellow-700",
                            integration.complexity === "high" && "border-red-500 text-red-700",
                          )}
                        >
                          {integration.complexity}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">
                        {integration.cost === 0 ? "Free" : `$${integration.cost.toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration Costs by Category</CardTitle>
                <CardDescription>Average implementation costs</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} fontSize={12} />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => [`$${safeNumber(value, 0).toLocaleString()}`, "Avg Cost"]} />
                    <Bar dataKey="avgCost" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Native vs API Integrations</CardTitle>
                <CardDescription>Distribution by integration type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} fontSize={12} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="nativeCount" fill="#00D4AA" name="Native" />
                    <Bar dataKey="integrations" fill="#0EA5E9" name="Total" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Integration Complexity Analysis</CardTitle>
              <CardDescription>Implementation effort and cost implications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Cost Impact:</strong> High complexity integrations can increase implementation costs by
                    200-400% and extend timelines by 3-6 months.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold">Low Complexity</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Native integrations, standard protocols</p>
                    <p className="text-lg font-bold text-green-600">
                      {filteredIntegrations.filter((int) => int.complexity === "low").length} integrations
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <h4 className="font-semibold">Medium Complexity</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">API integrations, custom development</p>
                    <p className="text-lg font-bold text-yellow-600">
                      {filteredIntegrations.filter((int) => int.complexity === "medium").length} integrations
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <h4 className="font-semibold">High Complexity</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Custom development, legacy systems</p>
                    <p className="text-lg font-bold text-red-600">
                      {filteredIntegrations.filter((int) => int.complexity === "high").length} integrations
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
