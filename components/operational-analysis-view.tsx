"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Target,
  Settings,
  Shield,
  DollarSign,
  Activity,
  BarChart3,
} from "lucide-react"
import { enhancedVendorDatabase } from "@/lib/vendors/enhanced-vendor-data"

interface OperationalAnalysisViewProps {
  selectedVendors?: string[]
  config?: {
    devices?: number
    users?: number
    locations?: number
    industry?: string
    currentStaffing?: number
  }
  results?: any[]
}

export default function OperationalAnalysisView({
  selectedVendors = [],
  config = {},
  results = [],
}: OperationalAnalysisViewProps) {
  const [selectedVendor, setSelectedVendor] = useState<string>(selectedVendors[0] || "")
  const [timeframe, setTimeframe] = useState<"monthly" | "quarterly" | "yearly">("monthly")

  // Calculate operational metrics for each vendor
  const operationalData = useMemo(() => {
    return selectedVendors
      .map((vendorId) => {
        const vendor = enhancedVendorDatabase[vendorId]
        if (!vendor) return null

        const devices = config.devices || 1000
        const users = config.users || 500
        const locations = config.locations || 1
        const currentStaffing = config.currentStaffing || 5

        // Calculate automation level based on vendor capabilities
        const automationLevel = vendor.features?.automation ? 85 : vendor.features?.selfService ? 70 : 45

        // Calculate management efficiency
        const managementEfficiency = Math.min(
          100,
          automationLevel * 0.6 + (vendor.features?.centralManagement ? 30 : 10),
        )

        // Calculate required staffing
        const baseStaffingRatio = devices / 1000 // 1 person per 1000 devices baseline
        const vendorEfficiencyMultiplier = automationLevel / 100
        const requiredStaffing = Math.max(1, Math.ceil(baseStaffingRatio / vendorEfficiencyMultiplier))

        // Calculate operational costs
        const baseMonthlyCost = devices * 2 // $2 per device per month baseline
        const staffingCost = requiredStaffing * 8000 // $8k per month per staff member
        const totalMonthlyCost = baseMonthlyCost + staffingCost

        // Performance trends (simulated)
        const performanceTrends = Array.from({ length: 12 }, (_, i) => ({
          month: `Month ${i + 1}`,
          efficiency: Math.max(60, automationLevel + Math.random() * 10 - 5),
          incidents: Math.max(0, Math.floor((100 - automationLevel) / 10 + Math.random() * 5)),
          uptime: Math.min(100, 95 + automationLevel / 20 + Math.random() * 2),
        }))

        return {
          vendorId,
          vendorName: vendor.name,
          automationLevel,
          managementEfficiency,
          requiredStaffing,
          currentStaffing,
          staffingGap: requiredStaffing - currentStaffing,
          totalMonthlyCost,
          costPerDevice: totalMonthlyCost / devices,
          performanceTrends,
          maturityScore: calculateMaturityScore(vendor, automationLevel),
          kpis: {
            mttr: Math.max(15, 120 - automationLevel), // Mean Time to Resolution in minutes
            availability: Math.min(99.9, 95 + automationLevel / 20),
            userSatisfaction: Math.min(100, 70 + automationLevel / 3),
            complianceScore: vendor.features?.compliance ? 95 : 75,
          },
        }
      })
      .filter(Boolean)
  }, [selectedVendors, config])

  // Calculate maturity score
  function calculateMaturityScore(vendor: any, automationLevel: number) {
    let score = 0

    // Automation maturity (40%)
    score += (automationLevel / 100) * 40

    // Feature maturity (30%)
    const featureCount = Object.values(vendor.features || {}).filter(Boolean).length
    score += Math.min(30, (featureCount / 10) * 30)

    // Integration maturity (20%)
    const integrationCount = vendor.integrations?.length || 0
    score += Math.min(20, (integrationCount / 15) * 20)

    // Support maturity (10%)
    score += vendor.support?.level === "premium" ? 10 : vendor.support?.level === "standard" ? 7 : 5

    return Math.round(score)
  }

  // Early return if no vendors selected
  if (selectedVendors.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>Please select at least one vendor to view operational analysis.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const selectedVendorData = operationalData.find((v) => v?.vendorId === selectedVendor) || operationalData[0]

  if (!selectedVendorData) {
    return (
      <div className="flex items-center justify-center h-64">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>No operational data available for selected vendors.</AlertDescription>
        </Alert>
      </div>
    )
  }

  // Prepare cost breakdown data
  const costBreakdownData = [
    { name: "Infrastructure", value: selectedVendorData.totalMonthlyCost * 0.4, color: "#00D4AA" },
    { name: "Staffing", value: selectedVendorData.totalMonthlyCost * 0.45, color: "#0EA5E9" },
    { name: "Support", value: selectedVendorData.totalMonthlyCost * 0.1, color: "#8B5CF6" },
    { name: "Training", value: selectedVendorData.totalMonthlyCost * 0.05, color: "#EF4444" },
  ]

  // Prepare efficiency comparison data
  const efficiencyComparisonData = operationalData.map((data) => ({
    vendor: data?.vendorName || "Unknown",
    automation: data?.automationLevel || 0,
    efficiency: data?.managementEfficiency || 0,
    cost: data?.costPerDevice || 0,
    staffing: data?.requiredStaffing || 0,
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Operational Analysis</h2>
          <p className="text-muted-foreground">Comprehensive operational efficiency and cost analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedVendor} onValueChange={setSelectedVendor}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {operationalData.map((vendor) => (
                <SelectItem key={vendor?.vendorId} value={vendor?.vendorId || ""}>
                  {vendor?.vendorName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeframe} onValueChange={(value: any) => setTimeframe(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Automation Level</p>
                <p className="text-2xl font-bold">{selectedVendorData.automationLevel}%</p>
                <p className="text-xs text-muted-foreground">
                  {selectedVendorData.automationLevel > 80
                    ? "Excellent"
                    : selectedVendorData.automationLevel > 60
                      ? "Good"
                      : "Needs Improvement"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">MTTR</p>
                <p className="text-2xl font-bold">{selectedVendorData.kpis.mttr}m</p>
                <p className="text-xs text-muted-foreground">Mean Time to Resolution</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Availability</p>
                <p className="text-2xl font-bold">{selectedVendorData.kpis.availability.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">System uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Cost per Device</p>
                <p className="text-2xl font-bold">${selectedVendorData.costPerDevice.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground">Monthly operational cost</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="efficiency" className="space-y-4">
        <TabsList>
          <TabsTrigger value="efficiency">Efficiency Metrics</TabsTrigger>
          <TabsTrigger value="staffing">Staffing Analysis</TabsTrigger>
          <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="maturity">Maturity Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="efficiency" className="space-y-6">
          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends - {selectedVendorData.vendorName}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={selectedVendorData.performanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="efficiency" stroke="#00D4AA" name="Efficiency %" />
                  <Line type="monotone" dataKey="uptime" stroke="#0EA5E9" name="Uptime %" />
                  <Line type="monotone" dataKey="incidents" stroke="#EF4444" name="Incidents" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Efficiency Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Vendor Efficiency Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={efficiencyComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="automation" fill="#00D4AA" name="Automation %" />
                  <Bar dataKey="efficiency" fill="#0EA5E9" name="Management Efficiency %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Operational Efficiency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Management Efficiency</span>
                    <span>{selectedVendorData.managementEfficiency}%</span>
                  </div>
                  <Progress value={selectedVendorData.managementEfficiency} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>User Satisfaction</span>
                    <span>{selectedVendorData.kpis.userSatisfaction}%</span>
                  </div>
                  <Progress value={selectedVendorData.kpis.userSatisfaction} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Compliance Score</span>
                    <span>{selectedVendorData.kpis.complianceScore}%</span>
                  </div>
                  <Progress value={selectedVendorData.kpis.complianceScore} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mean Time to Resolution</span>
                  <Badge variant={selectedVendorData.kpis.mttr < 60 ? "default" : "destructive"}>
                    {selectedVendorData.kpis.mttr} minutes
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">System Availability</span>
                  <Badge variant={selectedVendorData.kpis.availability > 99 ? "default" : "secondary"}>
                    {selectedVendorData.kpis.availability.toFixed(2)}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Automation Coverage</span>
                  <Badge variant={selectedVendorData.automationLevel > 70 ? "default" : "secondary"}>
                    {selectedVendorData.automationLevel}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staffing" className="space-y-6">
          {/* Staffing Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Current Staff</p>
                    <p className="text-2xl font-bold">{selectedVendorData.currentStaffing}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Required Staff</p>
                    <p className="text-2xl font-bold">{selectedVendorData.requiredStaffing}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  {selectedVendorData.staffingGap > 0 ? (
                    <TrendingUp className="h-5 w-5 text-red-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-green-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium">Staffing Gap</p>
                    <p className="text-2xl font-bold">
                      {selectedVendorData.staffingGap > 0 ? "+" : ""}
                      {selectedVendorData.staffingGap}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Staffing Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Staffing Requirements by Vendor</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={efficiencyComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="staffing" fill="#8B5CF6" name="Required Staff" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Skills Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Training Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Required Skills</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Network Administration</span>
                      <Badge variant="outline">Essential</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Management</span>
                      <Badge variant="outline">Essential</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Vendor-Specific Training</span>
                      <Badge variant="secondary">Required</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Automation/Scripting</span>
                      <Badge variant="secondary">Preferred</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Training Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Initial Training</span>
                      <span>2-3 weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Certification</span>
                      <span>1-2 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Advanced Features</span>
                      <span>3-6 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ongoing Training</span>
                      <span>Quarterly</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          {/* Cost Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={costBreakdownData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {costBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${Math.round(Number(value)).toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Efficiency Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Monthly Cost</span>
                  <span className="font-bold">${selectedVendorData.totalMonthlyCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost per Device</span>
                  <span className="font-bold">${selectedVendorData.costPerDevice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost per User</span>
                  <span className="font-bold">
                    ${(selectedVendorData.totalMonthlyCost / (config.users || 500)).toFixed(2)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Annual TCO</span>
                  <span className="font-bold text-lg">
                    ${(selectedVendorData.totalMonthlyCost * 12).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Vendor Cost Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={efficiencyComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                  <Bar dataKey="cost" fill="#EF4444" name="Cost per Device ($)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cost Optimization */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Optimization Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <TrendingDown className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Automation Impact:</strong> Higher automation levels can reduce staffing costs by up to 40%
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Efficiency Gains:</strong> Centralized management can reduce operational overhead by 25%
                  </AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Scale Benefits:</strong> Cost per device decreases with larger deployments
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maturity" className="space-y-6">
          {/* Maturity Score */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Maturity Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary mb-2">{selectedVendorData.maturityScore}/100</div>
                <p className="text-muted-foreground">Overall Maturity Score</p>
                <Badge
                  variant={
                    selectedVendorData.maturityScore >= 80
                      ? "default"
                      : selectedVendorData.maturityScore >= 60
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {selectedVendorData.maturityScore >= 80
                    ? "Advanced"
                    : selectedVendorData.maturityScore >= 60
                      ? "Intermediate"
                      : "Basic"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Maturity Dimensions</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Automation Maturity</span>
                        <span>{Math.round((selectedVendorData.automationLevel / 100) * 40)}/40</span>
                      </div>
                      <Progress value={(selectedVendorData.automationLevel / 100) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Feature Maturity</span>
                        <span>25/30</span>
                      </div>
                      <Progress value={83} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Integration Maturity</span>
                        <span>18/20</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Support Maturity</span>
                        <span>8/10</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Improvement Recommendations</h4>
                  <div className="space-y-2">
                    {selectedVendorData.automationLevel < 70 && (
                      <Alert>
                        <Target className="h-4 w-4" />
                        <AlertDescription>Increase automation to reduce manual tasks</AlertDescription>
                      </Alert>
                    )}
                    {selectedVendorData.kpis.mttr > 60 && (
                      <Alert>
                        <Clock className="h-4 w-4" />
                        <AlertDescription>Improve incident response procedures</AlertDescription>
                      </Alert>
                    )}
                    {selectedVendorData.staffingGap > 0 && (
                      <Alert>
                        <Users className="h-4 w-4" />
                        <AlertDescription>Address staffing gaps through hiring or training</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maturity Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle>Maturity Improvement Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>

                  <div className="relative flex items-center space-x-4 pb-6">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Immediate (0-3 months)</h4>
                      <p className="text-sm text-muted-foreground">Implement basic automation and monitoring</p>
                    </div>
                    <Badge variant="outline">Quick Wins</Badge>
                  </div>

                  <div className="relative flex items-center space-x-4 pb-6">
                    <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-sm font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Short-term (3-6 months)</h4>
                      <p className="text-sm text-muted-foreground">
                        Enhance integration capabilities and staff training
                      </p>
                    </div>
                    <Badge variant="secondary">Foundation</Badge>
                  </div>

                  <div className="relative flex items-center space-x-4 pb-6">
                    <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Medium-term (6-12 months)</h4>
                      <p className="text-sm text-muted-foreground">Advanced analytics and predictive capabilities</p>
                    </div>
                    <Badge variant="outline">Growth</Badge>
                  </div>

                  <div className="relative flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm font-bold">
                      4
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Long-term (12+ months)</h4>
                      <p className="text-sm text-muted-foreground">Full automation and AI-driven operations</p>
                    </div>
                    <Badge variant="outline">Optimization</Badge>
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
