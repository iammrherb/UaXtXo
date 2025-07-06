"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, DollarSign, AlertTriangle, CheckCircle, Zap, Target, BarChart3 } from "lucide-react"
import { enhancedVendorDatabase } from "@/lib/vendors/enhanced-vendor-data"

interface OperationalAnalysisViewProps {
  selectedVendors: string[]
  devices: number
  users: number
}

const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

export default function OperationalAnalysisView({ selectedVendors, devices, users }: OperationalAnalysisViewProps) {
  const [timeframe, setTimeframe] = useState<"monthly" | "quarterly" | "annual">("annual")

  // Calculate operational metrics for each vendor
  const operationalData = useMemo(() => {
    return selectedVendors
      .map((vendorId) => {
        const vendor = enhancedVendorDatabase[vendorId]
        if (!vendor) return null

        const metrics = vendor.operationalMetrics
        const devicesInThousands = devices / 1000

        // Calculate staffing requirements
        const requiredAdmins = Math.ceil((metrics.staffingRequirements.administrators * devices) / 10000)
        const requiredSpecialists = Math.ceil((metrics.staffingRequirements.specialists * devices) / 10000)
        const totalStaff = requiredAdmins + requiredSpecialists

        // Calculate operational costs
        const monthlyMaintenanceCost = metrics.operationalCosts.monthlyMaintenance * devices
        const annualOperationalCost = 
          monthlyMaintenanceCost * 12 + 
          metrics.operationalCosts.monitoring * 12 +
          (metrics.operationalCosts.incidentResponse * 12) + // Assume 1 incident per month
          (metrics.operationalCosts.changeManagement * 24) // Assume 2 changes per month

        // Calculate efficiency scores
        const efficiencyScore = Math.round(
          (metrics.automationLevel * 0.4) +
          ((100 - metrics.adminEffort) * 0.3) +
          ((10 - metrics.troubleshootingTime) * 10 * 0.2) +
          ((metrics.upgradeComplexity === "low" ? 100 : metrics.upgradeComplexity === "medium" ? 75 : metrics.upgradeComplexity === "high" ? 50 : 25) * 0.1)
        )

        return {
          vendorId,
          vendorName: vendor.name,
          category: vendor.category,
          
          // Staffing metrics
          requiredAdmins,
          requiredSpecialists,
          totalStaff,
          trainingDaysPerYear: metrics.staffingRequirements.trainingDays,
          
          // Time metrics
          adminEffortHours: metrics.adminEffort * devicesInThousands * 52, // Weekly hours * 52 weeks
          troubleshootingTime: metrics.troubleshootingTime,
          maintenanceWindows: metrics.maintenanceWindows,
          
          // Cost metrics
          monthlyMaintenanceCost,
          annualOperationalCost,
          costPerDevice: annualOperationalCost / devices,
          
          // Efficiency metrics
          automationLevel: metrics.automationLevel,
          efficiencyScore,
          upgradeComplexity: metrics.upgradeComplexity,
          
          // Capabilities
          apiAvailability: metrics.apiAvailability,
          cloudManagement: metrics.cloudManagement,
          reportingCapabilities: metrics.reportingCapabilities,
        }
      })
      .filter(Boolean)
  }, [selectedVendors, devices])

  // Calculate comparative metrics
  const comparativeMetrics = useMemo(() => {
    if (operationalData.length === 0) return null

    const avgEfficiency = operationalData.reduce((sum, vendor) => sum + vendor.efficiencyScore, 0) / operationalData.length
    const avgCostPerDevice = operationalData.reduce((sum, vendor) => sum + vendor.costPerDevice, 0) / operationalData.length
    const avgStaffing = operationalData.reduce((sum, vendor) => sum + vendor.totalStaff, 0) / operationalData.length

    return {
      avgEfficiency: Math.round(avgEfficiency),
      avgCostPerDevice: Math.round(avgCostPerDevice),
      avgStaffing: Math.round(avgStaffing),
      bestEfficiency: Math.max(...operationalData.map(v => v.efficiencyScore)),
      lowestCost: Math.min(...operationalData.map(v => v.costPerDevice)),
      minStaffing: Math.min(...operationalData.map(v => v.totalStaff)),
    }
  }, [operationalData])

  // Prepare chart data
  const efficiencyComparisonData = operationalData.map(vendor => ({
    vendor: vendor.vendorName,
    efficiency: vendor.efficiencyScore,
    automation: vendor.automationLevel,
    adminEffort: 100 - (vendor.adminEffortHours / (40 * 52)) * 100, // Convert to efficiency percentage
  }))

  const costAnalysisData = operationalData.map(vendor => ({
    vendor: vendor.vendorName,
    annualCost: vendor.annualOperationalCost,
    costPerDevice: vendor.costPerDevice,
    maintenanceCost: vendor.monthlyMaintenanceCost * 12,
  }))

  const staffingComparisonData = operationalData.map(vendor => ({
    vendor: vendor.vendorName,
    admins: vendor.requiredAdmins,
    specialists: vendor.requiredSpecialists,
    total: vendor.totalStaff,
    trainingDays: vendor.trainingDaysPerYear,
  }))

  // Operational maturity radar data
  const maturityRadarData = [
    {
      capability: "Automation",
      ...operationalData.reduce((acc, vendor) => {
        acc[vendor.vendorName] = vendor.automationLevel
        return acc
      }, {} as Record<string, number>)
    },
    {
      capability: "Efficiency",
      ...operationalData.reduce((acc, vendor) => {
        acc[vendor.vendorName] = vendor.efficiencyScore
        return acc
      }, {} as Record<string, number>)
    },
    {
      capability: "Cloud Readiness",
      ...operationalData.reduce((acc, vendor) => {
        acc[vendor.vendorName] = vendor.cloudManagement ? 100 : 50
        return acc
      }, {} as Record<string, number>)
    },
    {
      capability: "API Integration",
      ...operationalData.reduce((acc, vendor) => {
        acc[vendor.vendorName] = vendor.apiAvailability ? 100 : 0
        return acc
      }, {} as Record<string, number>)
    },
    {
      capability: "Reporting",
      ...operationalData.reduce((acc, vendor) => {
        acc[vendor.vendorName] = vendor.reportingCapabilities === "enterprise" ? 100 : 
                                 vendor.reportingCapabilities === "advanced" ? 75 : 50
        return acc
      }, {} as Record<string, number>)
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Operational Analysis & Impact Assessment</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis of operational efficiency, costs, and resource requirements
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Analysis
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Avg Efficiency Score</p>
                <p className="text-2xl font-bold">{comparativeMetrics?.avgEfficiency || 0}/100</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Avg Cost/Device</p>
                <p className="text-2xl font-bold">${comparativeMetrics?.avgCostPerDevice || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Avg Staffing Need</p>
                <p className="text-2xl font-bold">{comparativeMetrics?.avgStaffing || 0} FTE</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Best Automation</p>
                <p className="text-2xl font-bold">
                  {Math.max(...operationalData.map(v => v.automationLevel))}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="efficiency" className="space-y-4">
        <TabsList>
          <TabsTrigger value="efficiency">Efficiency Analysis</TabsTrigger>
          <TabsTrigger value="staffing">Staffing Impact</TabsTrigger>
          <TabsTrigger value="costs">Operational Costs</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance & Support</TabsTrigger>
          <TabsTrigger value="maturity">Operational Maturity</TabsTrigger>
        </TabsList>

        <TabsContent value="efficiency" className="space-y-6">
          {/* Efficiency Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Efficiency Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={efficiencyComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="efficiency" fill="#00D4AA" name="Overall Efficiency" />
                  <Bar dataKey="automation" fill="#0EA5E9" name="Automation Level" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Efficiency Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {operationalData.slice(0, 6).map((vendor, index) => (
              <Card key={vendor.vendorId}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {vendor.vendorName}
                    <Badge variant={vendor.efficiencyScore > 80 ? "default" : vendor.efficiencyScore > 60 ? "secondary" : "destructive"}>
                      {vendor.efficiencyScore}/100
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Automation Level</span>
                        <span>{vendor.automationLevel}%</span>
                      </div>
                      <Progress value={vendor.automationLevel} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Admin Effort (hrs/week)</span>
                        <span>{Math.round(vendor.adminEffortHours / 52)}</span>
                      </div>
                      <Progress value={Math.max(0, 100 - (vendor.adminEffortHours / 52 / 40 * 100))} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Troubleshooting Time</span>
                        <span>{vendor.troubleshootingTime} hrs</span>
                      </div>
                      <Progress value={Math.max(0, 100 - (vendor.troubleshootingTime * 10))} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        {vendor.apiAvailability ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <span>API Available</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {vendor.cloudManagement ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <span>Cloud Managed</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="staffing" className="space-y-6">
          {/* Staffing Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Staffing Requirements Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={staffingComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="admins" stackId="staff" fill="#0EA5E9" name="Administrators" />
                  <Bar dataKey="specialists" stackId="staff" fill="#8B5CF6" name="Specialists" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Staffing Impact Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills Gap Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {operationalData.slice(0, 5).map((vendor) => {
                    const currentStaff = 3 // Assume current staffing
                    const gap = Math.max(0, vendor.totalStaff - currentStaff)
                    
                    return (
                      <div key={vendor.vendorId} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{vendor.vendorName}</h4>
                          <Badge variant={gap === 0 ? "default" : gap <= 2 ? "secondary" : "destructive"}>
                            {gap === 0 ? "Adequate" : `+${gap} needed`}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Required Staff:</span>
                            <div className="font-medium">{vendor.totalStaff} FTE</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Training Days/Year:</span>
                            <div className="font-medium">{vendor.trainingDaysPerYear} days</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Training & Development Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={operationalData.slice(0, 5).map((vendor, index) => ({
                        name: vendor.vendorName,
                        value: vendor.trainingDaysPerYear,
                        color: COLORS[index % COLORS.length]
                      }))}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}d`}
                    >
                      {operationalData.slice(0, 5).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Staffing Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Staffing Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <Users className="h-4 w-4" />
                <AlertDescription>
                  Based on the analysis, cloud-native solutions like Portnox require 60-70% fewer staff resources 
                  compared to traditional on-premise solutions. Consider vendor solutions with high automation 
                  levels\
