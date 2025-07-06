"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
} from "recharts"
import { Users, Clock, AlertTriangle, CheckCircle, Zap, DollarSign, Activity, Target } from "lucide-react"

// Import the enhanced vendor data
import { enhancedVendorDatabase } from "@/lib/vendors/enhanced-vendor-data"

interface OperationalAnalysisViewProps {
  selectedVendors: string[]
  devices: number
  users: number
  currentStaffing?: {
    administrators: number
    specialists: number
    contractors: number
  }
}

export default function OperationalAnalysisView({
  selectedVendors,
  devices = 500,
  users = 1000,
  currentStaffing = { administrators: 2, specialists: 1, contractors: 0 },
}: OperationalAnalysisViewProps) {
  const [selectedMetric, setSelectedMetric] = useState("adminEffort")
  const [timeframe, setTimeframe] = useState("annual")

  // Calculate operational metrics for all selected vendors
  const operationalData = useMemo(() => {
    const results: Record<string, any> = {}

    selectedVendors.forEach((vendorId) => {
      const vendor = enhancedVendorDatabase[vendorId]
      if (vendor) {
        const deviceScale = devices / 1000
        const annualAdminHours = vendor.operationalMetrics.adminEffort * deviceScale * 52
        const annualCost = annualAdminHours * 75 // $75/hour average IT rate

        // Calculate staffing requirements
        const requiredAdmins = Math.ceil(
          (vendor.operationalMetrics.staffingRequirements.administrators * devices) / 10000,
        )
        const requiredSpecialists = Math.ceil(
          (vendor.operationalMetrics.staffingRequirements.specialists * devices) / 10000,
        )

        // Calculate operational efficiency
        const efficiencyScore =
          (vendor.operationalMetrics.automationLevel +
            (100 - vendor.operationalMetrics.adminEffort) +
            (vendor.operationalMetrics.upgradeComplexity === "low"
              ? 90
              : vendor.operationalMetrics.upgradeComplexity === "medium"
                ? 70
                : vendor.operationalMetrics.upgradeComplexity === "high"
                  ? 50
                  : 30)) /
          3

        // Calculate total operational cost
        const monthlyOperationalCost =
          vendor.operationalMetrics.operationalCosts.monthlyMaintenance * devices +
          vendor.operationalMetrics.operationalCosts.monitoring +
          annualCost / 12

        results[vendorId] = {
          vendor,
          annualAdminHours,
          annualCost,
          requiredAdmins,
          requiredSpecialists,
          efficiencyScore,
          monthlyOperationalCost,
          annualOperationalCost: monthlyOperationalCost * 12,
          staffingGap: {
            admins: Math.max(0, requiredAdmins - currentStaffing.administrators),
            specialists: Math.max(0, requiredSpecialists - currentStaffing.specialists),
          },
          maintenanceImpact: {
            hoursPerMonth: vendor.operationalMetrics.maintenanceWindows,
            businessImpact: vendor.operationalMetrics.maintenanceWindows * 2000, // $2000 per hour of downtime
          },
        }
      }
    })

    return results
  }, [selectedVendors, devices, currentStaffing])

  // Prepare comparison data for charts
  const comparisonData = Object.entries(operationalData).map(([vendorId, data]) => ({
    vendor: data.vendor.name,
    adminEffort: data.vendor.operationalMetrics.adminEffort,
    automationLevel: data.vendor.operationalMetrics.automationLevel,
    annualCost: data.annualCost,
    efficiencyScore: data.efficiencyScore,
    troubleshootingTime: data.vendor.operationalMetrics.troubleshootingTime,
    requiredStaff: data.requiredAdmins + data.requiredSpecialists,
    maintenanceHours: data.vendor.operationalMetrics.maintenanceWindows,
  }))

  // Calculate cost vs efficiency scatter data
  const costEfficiencyData = Object.entries(operationalData).map(([vendorId, data]) => ({
    vendor: data.vendor.name,
    cost: data.annualOperationalCost,
    efficiency: data.efficiencyScore,
    adminHours: data.annualAdminHours,
  }))

  // Operational maturity radar data
  const maturityData = Object.entries(operationalData).map(([vendorId, data]) => ({
    vendor: data.vendor.name,
    automation: data.vendor.operationalMetrics.automationLevel,
    reporting:
      data.vendor.operationalMetrics.reportingCapabilities === "enterprise"
        ? 90
        : data.vendor.operationalMetrics.reportingCapabilities === "advanced"
          ? 70
          : 50,
    api: data.vendor.operationalMetrics.apiAvailability ? 90 : 10,
    cloud: data.vendor.operationalMetrics.cloudManagement ? 90 : 10,
    maintenance: 100 - data.vendor.operationalMetrics.maintenanceWindows * 8.33, // Convert to score
    troubleshooting: 100 - data.vendor.operationalMetrics.troubleshootingTime * 10,
  }))

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4", "#10B981", "#F59E0B"]

  return (
    <div className="space-y-6">
      {/* Operational Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Current Staff</p>
                <p className="text-2xl font-bold">{currentStaffing.administrators + currentStaffing.specialists}</p>
                <p className="text-xs text-muted-foreground">Admins + Specialists</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Avg Admin Effort</p>
                <p className="text-2xl font-bold">
                  {Math.round(comparisonData.reduce((sum, d) => sum + d.adminEffort, 0) / comparisonData.length || 0)}
                  h/wk
                </p>
                <p className="text-xs text-muted-foreground">Per 1000 devices</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Avg Automation</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    comparisonData.reduce((sum, d) => sum + d.automationLevel, 0) / comparisonData.length || 0,
                  )}
                  %
                </p>
                <p className="text-xs text-muted-foreground">Process automation</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Annual Op Cost</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    Object.values(operationalData).reduce((sum: number, d: any) => sum + d.annualOperationalCost, 0) /
                      Object.values(operationalData).length || 0,
                  )}
                </p>
                <p className="text-xs text-muted-foreground">Average across vendors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs defaultValue="efficiency" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="efficiency">Efficiency Analysis</TabsTrigger>
          <TabsTrigger value="staffing">Staffing Impact</TabsTrigger>
          <TabsTrigger value="costs">Operational Costs</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance & Support</TabsTrigger>
          <TabsTrigger value="maturity">Operational Maturity</TabsTrigger>
        </TabsList>

        {/* Efficiency Analysis Tab */}
        <TabsContent value="efficiency" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Admin Effort vs Automation */}
            <Card>
              <CardHeader>
                <CardTitle>Administrative Effort vs Automation Level</CardTitle>
                <CardDescription>Lower admin effort + higher automation = better efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ScatterChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="adminEffort"
                      name="Admin Effort"
                      unit=" hrs/wk"
                      tickFormatter={(value) => `${value}h`}
                    />
                    <YAxis
                      dataKey="automationLevel"
                      name="Automation"
                      unit="%"
                      tickFormatter={(value) => `${value}%`}
                    />
                    <RechartsTooltip
                      formatter={(value, name) => [name === "Admin Effort" ? `${value} hrs/wk` : `${value}%`, name]}
                      labelFormatter={(value) => `Vendor: ${value}`}
                    />
                    <Scatter dataKey="automationLevel" fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Efficiency Scores */}
            <Card>
              <CardHeader>
                <CardTitle>Operational Efficiency Scores</CardTitle>
                <CardDescription>Composite score based on automation, admin effort, and complexity</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" angle={-15} textAnchor="end" height={80} />
                    <YAxis domain={[0, 100]} />
                    <RechartsTooltip formatter={(value) => [`${value.toFixed(1)}%`, "Efficiency Score"]} />
                    <Bar dataKey="efficiencyScore" fill="#00D4AA" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Troubleshooting and Maintenance Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Impact Comparison</CardTitle>
              <CardDescription>Time to resolve issues and maintenance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" angle={-15} textAnchor="end" height={80} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <RechartsTooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="troubleshootingTime" fill="#EF4444" name="Troubleshooting (hrs)" />
                  <Bar yAxisId="right" dataKey="maintenanceHours" fill="#F97316" name="Maintenance (hrs/month)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Staffing Impact Tab */}
        <TabsContent value="staffing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Staffing Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Staffing Requirements Analysis</CardTitle>
                <CardDescription>Required vs current staffing levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(operationalData).map(([vendorId, data], index) => (
                    <div key={vendorId} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{data.vendor.name}</h4>
                        <div className="flex space-x-2">
                          {data.staffingGap.admins > 0 && (
                            <Badge variant="destructive">+{data.staffingGap.admins} Admins</Badge>
                          )}
                          {data.staffingGap.specialists > 0 && (
                            <Badge variant="destructive">+{data.staffingGap.specialists} Specialists</Badge>
                          )}
                          {data.staffingGap.admins === 0 && data.staffingGap.specialists === 0 && (
                            <Badge variant="default">Adequate Staffing</Badge>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Required Administrators</p>
                          <p className="font-medium">{data.requiredAdmins}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Required Specialists</p>
                          <p className="font-medium">{data.requiredSpecialists}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Admin Capacity</span>
                          <span>
                            {currentStaffing.administrators}/{data.requiredAdmins}
                          </span>
                        </div>
                        <Progress
                          value={(currentStaffing.administrators / data.requiredAdmins) * 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Training Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Training & Skill Requirements</CardTitle>
                <CardDescription>Annual training days and expertise needed</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={Object.entries(operationalData).map(([vendorId, data]) => ({
                      vendor: data.vendor.name,
                      trainingDays: data.vendor.operationalMetrics.staffingRequirements.trainingDays,
                      complexity:
                        data.vendor.implementation.complexity === "low"
                          ? 1
                          : data.vendor.implementation.complexity === "medium"
                            ? 2
                            : data.vendor.implementation.complexity === "high"
                              ? 3
                              : 4,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" angle={-15} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="trainingDays" fill="#8B5CF6" name="Training Days/Year" />
                    <Bar yAxisId="right" dataKey="complexity" fill="#F59E0B" name="Complexity Level (1-4)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Skills Gap Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise Requirements</CardTitle>
              <CardDescription>Required technical expertise by vendor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(operationalData).map(([vendorId, data]) => (
                  <div key={vendorId} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">{data.vendor.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.vendor.implementation.requiredExpertise.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Implementation Complexity</p>
                        <p className="font-medium capitalize">{data.vendor.implementation.complexity}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Annual Training</p>
                        <p className="font-medium">
                          {data.vendor.operationalMetrics.staffingRequirements.trainingDays} days
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Upgrade Complexity</p>
                        <p className="font-medium capitalize">{data.vendor.operationalMetrics.upgradeComplexity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operational Costs Tab */}
        <TabsContent value="costs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cost vs Efficiency Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Cost vs Efficiency Analysis</CardTitle>
                <CardDescription>Annual operational cost vs efficiency score</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ScatterChart data={costEfficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="cost"
                      name="Annual Cost"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <YAxis dataKey="efficiency" name="Efficiency Score" domain={[0, 100]} />
                    <RechartsTooltip
                      formatter={(value, name) => [
                        name === "Annual Cost" ? formatCurrency(value) : `${value.toFixed(1)}%`,
                        name,
                      ]}
                      labelFormatter={(value) => `Vendor: ${value}`}
                    />
                    <Scatter dataKey="efficiency" fill="#00D4AA" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Operational Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Annual Operational Costs</CardTitle>
                <CardDescription>Total operational expenses by vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={Object.entries(operationalData).map(([vendorId, data]) => ({
                      vendor: data.vendor.name,
                      adminCost: data.annualCost,
                      maintenanceCost:
                        data.vendor.operationalMetrics.operationalCosts.monthlyMaintenance * devices * 12,
                      monitoringCost: data.vendor.operationalMetrics.operationalCosts.monitoring * 12,
                      incidentCost: data.vendor.operationalMetrics.operationalCosts.incidentResponse * 6, // Assume 6 incidents/year
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" angle={-15} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey="adminCost" stackId="a" fill="#8884d8" name="Admin Labor" />
                    <Bar dataKey="maintenanceCost" stackId="a" fill="#82ca9d" name="Maintenance" />
                    <Bar dataKey="monitoringCost" stackId="a" fill="#ffc658" name="Monitoring" />
                    <Bar dataKey="incidentCost" stackId="a" fill="#ff7300" name="Incident Response" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Cost Impact Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Cost Impact Analysis</CardTitle>
              <CardDescription>Detailed breakdown of operational expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(operationalData).map(([vendorId, data]) => (
                  <div key={vendorId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg">{data.vendor.name}</h4>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(data.annualOperationalCost)}
                        </div>
                        <div className="text-sm text-muted-foreground">Annual Total</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-secondary rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{formatCurrency(data.annualCost)}</div>
                        <p className="text-sm text-muted-foreground">Admin Labor</p>
                      </div>
                      <div className="text-center p-3 bg-secondary rounded-lg">
                        <div className="text-lg font-bold text-purple-600">
                          {formatCurrency(
                            data.vendor.operationalMetrics.operationalCosts.monthlyMaintenance * devices * 12,
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">Maintenance</p>
                      </div>
                      <div className="text-center p-3 bg-secondary rounded-lg">
                        <div className="text-lg font-bold text-orange-600">
                          {formatCurrency(data.vendor.operationalMetrics.operationalCosts.monitoring * 12)}
                        </div>
                        <p className="text-sm text-muted-foreground">Monitoring</p>
                      </div>
                      <div className="text-center p-3 bg-secondary rounded-lg">
                        <div className="text-lg font-bold text-red-600">
                          {formatCurrency(data.maintenanceImpact.businessImpact * 12)}
                        </div>
                        <p className="text-sm text-muted-foreground">Downtime Impact</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance & Support Tab */}
        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Maintenance Windows */}
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Requirements</CardTitle>
                <CardDescription>Monthly maintenance windows and business impact</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={Object.entries(operationalData).map(([vendorId, data]) => ({
                      vendor: data.vendor.name,
                      maintenanceHours: data.vendor.operationalMetrics.maintenanceWindows,
                      businessImpact: data.maintenanceImpact.businessImpact,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" angle={-15} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <RechartsTooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="maintenanceHours" fill="#8B5CF6" name="Hours/Month" />
                    <Bar yAxisId="right" dataKey="businessImpact" fill="#EF4444" name="Business Impact ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Support Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle>Support & Troubleshooting</CardTitle>
                <CardDescription>Average time to resolve issues and support quality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(operationalData).map(([vendorId, data]) => (
                    <div key={vendorId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{data.vendor.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {data.vendor.operationalMetrics.reportingCapabilities} reporting
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{data.vendor.operationalMetrics.troubleshootingTime}h</div>
                        <p className="text-sm text-muted-foreground">Avg resolution time</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upgrade and Change Management */}
          <Card>
            <CardHeader>
              <CardTitle>Change Management Impact</CardTitle>
              <CardDescription>Upgrade complexity and change management costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(operationalData).map(([vendorId, data]) => (
                  <div key={vendorId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{data.vendor.name}</h4>
                      <Badge
                        variant={
                          data.vendor.operationalMetrics.upgradeComplexity === "low"
                            ? "default"
                            : data.vendor.operationalMetrics.upgradeComplexity === "medium"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {data.vendor.operationalMetrics.upgradeComplexity} complexity
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Change Cost</p>
                        <p className="font-medium">
                          {formatCurrency(data.vendor.operationalMetrics.operationalCosts.changeManagement)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">API Available</p>
                        <p className="font-medium">
                          {data.vendor.operationalMetrics.apiAvailability ? (
                            <CheckCircle className="h-4 w-4 text-green-500 inline" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-red-500 inline" />
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Cloud Managed</p>
                        <p className="font-medium">
                          {data.vendor.operationalMetrics.cloudManagement ? (
                            <CheckCircle className="h-4 w-4 text-green-500 inline" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-red-500 inline" />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operational Maturity Tab */}
        <TabsContent value="maturity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Operational Maturity Radar */}
            <Card>
              <CardHeader>
                <CardTitle>Operational Maturity Assessment</CardTitle>
                <CardDescription>Multi-dimensional operational capability analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={maturityData[0] ? [maturityData[0]] : []}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Automation" dataKey="automation" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Reporting" dataKey="reporting" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Radar name="API" dataKey="api" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                    <Radar name="Cloud" dataKey="cloud" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
                    <Radar name="Maintenance" dataKey="maintenance" stroke="#00ff00" fill="#00ff00" fillOpacity={0.6} />
                    <Radar
                      name="Troubleshooting"
                      dataKey="troubleshooting"
                      stroke="#ff00ff"
                      fill="#ff00ff"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Automation Levels */}
            <Card>
              <CardHeader>
                <CardTitle>Automation Capabilities</CardTitle>
                <CardDescription>Process automation levels by vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(operationalData)
                    .sort(
                      (a, b) =>
                        b[1].vendor.operationalMetrics.automationLevel - a[1].vendor.operationalMetrics.automationLevel,
                    )
                    .map(([vendorId, data], index) => (
                      <div key={vendorId} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{data.vendor.name}</span>
                          <span className="text-sm font-bold">{data.vendor.operationalMetrics.automationLevel}%</span>
                        </div>
                        <Progress value={data.vendor.operationalMetrics.automationLevel} className="h-3" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Manual</span>
                          <span>Fully Automated</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Operational Readiness Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Readiness Assessment</CardTitle>
              <CardDescription>Overall operational maturity and readiness scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(operationalData).map(([vendorId, data]) => {
                  const readinessScore = Math.round(
                    (data.vendor.operationalMetrics.automationLevel +
                      (data.vendor.operationalMetrics.reportingCapabilities === "enterprise"
                        ? 90
                        : data.vendor.operationalMetrics.reportingCapabilities === "advanced"
                          ? 70
                          : 50) +
                      (data.vendor.operationalMetrics.apiAvailability ? 90 : 30) +
                      (data.vendor.operationalMetrics.cloudManagement ? 90 : 30) +
                      (100 - data.vendor.operationalMetrics.maintenanceWindows * 8.33)) /
                      5,
                  )

                  return (
                    <div key={vendorId} className="border rounded-lg p-4 text-center">
                      <h4 className="font-semibold mb-2">{data.vendor.name}</h4>
                      <div
                        className="text-3xl font-bold mb-2"
                        style={{
                          color: readinessScore >= 80 ? "#10b981" : readinessScore >= 60 ? "#f59e0b" : "#ef4444",
                        }}
                      >
                        {readinessScore}%
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Operational Readiness</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Automation:</span>
                          <span>{data.vendor.operationalMetrics.automationLevel}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>API Support:</span>
                          <span>{data.vendor.operationalMetrics.apiAvailability ? "✓" : "✗"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cloud Managed:</span>
                          <span>{data.vendor.operationalMetrics.cloudManagement ? "✓" : "✗"}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Executive Summary */}
      <Card className="border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Operational Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(operationalData).length > 0 && (
            <div className="space-y-4">
              <Alert>
                <Activity className="h-4 w-4" />
                <AlertDescription>
                  <strong>Key Operational Insights:</strong> Based on the analysis of {devices} devices across{" "}
                  {Object.entries(operationalData).length} vendors, the most operationally efficient solution offers{" "}
                  {Math.round(Math.max(...Object.values(operationalData).map((d: any) => d.efficiencyScore)))}%
                  operational efficiency with{" "}
                  {Math.min(...Object.values(operationalData).map((d: any) => d.annualAdminHours))} annual admin hours
                  required.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.min(
                      ...Object.values(operationalData).map((d: any) => d.requiredAdmins + d.requiredSpecialists),
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Min Staff Required</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.max(
                      ...Object.values(operationalData).map((d: any) => d.vendor.operationalMetrics.automationLevel),
                    )}
                    %
                  </div>
                  <p className="text-sm text-muted-foreground">Max Automation</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.min(
                      ...Object.values(operationalData).map(
                        (d: any) => d.vendor.operationalMetrics.troubleshootingTime,
                      ),
                    )}
                    h
                  </div>
                  <p className="text-sm text-muted-foreground">Fastest Resolution</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {formatCurrency(
                      Math.min(...Object.values(operationalData).map((d: any) => d.annualOperationalCost)),
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Lowest Op Cost</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
