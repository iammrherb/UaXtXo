"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
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
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Settings,
  Zap,
  Target,
  Activity,
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

        // Calculate efficiency metrics
        const automationLevel = vendor.automation?.level || 0.6
        const managementEfficiency = vendor.management?.efficiency || 0.7
        const supportRequirement = vendor.support?.hoursPerMonth || 40

        // Staffing analysis
        const requiredStaff = Math.ceil(devices / 1000) + Math.ceil(locations / 5)
        const staffingGap = Math.max(0, requiredStaff - currentStaffing)
        const staffingEfficiency = Math.min(100, (currentStaffing / requiredStaff) * 100)

        // Cost analysis
        const monthlyCosts = {
          licensing: (vendor.pricing?.monthly || 0) * devices,
          support: supportRequirement * 150, // $150/hour
          training: 5000 / 12, // Amortized training costs
          maintenance: (vendor.pricing?.monthly || 0) * devices * 0.2,
        }

        const totalMonthlyCost = Object.values(monthlyCosts).reduce((sum, cost) => sum + cost, 0)

        // Maturity assessment
        const maturityScore = {
          automation: automationLevel * 100,
          integration: (vendor.integrations?.length || 0) * 10,
          scalability: vendor.scalability?.score || 70,
          reliability: vendor.reliability?.uptime || 99,
        }

        const overallMaturity = Object.values(maturityScore).reduce((sum, score) => sum + score, 0) / 4

        return {
          vendorId,
          vendorName: vendor.name,
          category: vendor.category,
          efficiency: {
            automation: automationLevel * 100,
            management: managementEfficiency * 100,
            deviceRatio: devices / currentStaffing,
            responseTime: vendor.support?.responseTime || 24,
          },
          staffing: {
            current: currentStaffing,
            required: requiredStaff,
            gap: staffingGap,
            efficiency: staffingEfficiency,
            skillsRequired: vendor.skills?.required || [],
          },
          costs: {
            monthly: monthlyCosts,
            total: totalMonthlyCost,
            perDevice: totalMonthlyCost / devices,
            perUser: totalMonthlyCost / users,
          },
          maturity: {
            scores: maturityScore,
            overall: overallMaturity,
            recommendations: generateMaturityRecommendations(maturityScore),
          },
          kpis: {
            uptime: vendor.reliability?.uptime || 99,
            incidentReduction: automationLevel * 80,
            timeToResolution: Math.max(1, 24 - automationLevel * 20),
            userSatisfaction: 70 + managementEfficiency * 25,
          },
        }
      })
      .filter(Boolean)
  }, [selectedVendors, config])

  const selectedVendorData = operationalData.find((v) => v?.vendorId === selectedVendor) || operationalData[0]

  // Generate maturity recommendations
  function generateMaturityRecommendations(scores: any) {
    const recommendations = []
    if (scores.automation < 70) {
      recommendations.push("Implement additional automation workflows")
    }
    if (scores.integration < 50) {
      recommendations.push("Expand integration capabilities")
    }
    if (scores.scalability < 80) {
      recommendations.push("Plan for scalability improvements")
    }
    if (scores.reliability < 95) {
      recommendations.push("Enhance reliability and monitoring")
    }
    return recommendations
  }

  // Prepare chart data
  const efficiencyTrendData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    return months.map((month, index) => ({
      month,
      automation: selectedVendorData?.efficiency.automation + index * 2,
      management: selectedVendorData?.efficiency.management + index * 1.5,
      incidents: Math.max(0, 50 - index * 8),
    }))
  }, [selectedVendorData])

  const costBreakdownData = useMemo(() => {
    if (!selectedVendorData) return []
    return Object.entries(selectedVendorData.costs.monthly).map(([category, amount]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      amount,
      percentage: (amount / selectedVendorData.costs.total) * 100,
    }))
  }, [selectedVendorData])

  const maturityRadarData = useMemo(() => {
    if (!selectedVendorData) return []
    return Object.entries(selectedVendorData.maturity.scores).map(([category, score]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      score,
      fullMark: 100,
    }))
  }, [selectedVendorData])

  const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316"]

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Operational Analysis</h2>
          <p className="text-muted-foreground">
            Comprehensive operational efficiency and resource optimization analysis
          </p>
        </div>
        <div className="flex items-center space-x-4">
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
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">System Uptime</p>
                <p className="text-2xl font-bold">{selectedVendorData.kpis.uptime}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Automation Level</p>
                <p className="text-2xl font-bold">{Math.round(selectedVendorData.efficiency.automation)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Avg Resolution</p>
                <p className="text-2xl font-bold">{selectedVendorData.kpis.timeToResolution}h</p>
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
                <p className="text-2xl font-bold">${Math.round(selectedVendorData.costs.perDevice)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="efficiency" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="efficiency">Efficiency Metrics</TabsTrigger>
          <TabsTrigger value="staffing">Staffing Analysis</TabsTrigger>
          <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="maturity">Maturity Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="efficiency" className="space-y-6">
          {/* Efficiency Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Efficiency Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={efficiencyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="automation" stroke="#00D4AA" name="Automation %" />
                  <Line type="monotone" dataKey="management" stroke="#0EA5E9" name="Management Efficiency %" />
                  <Line type="monotone" dataKey="incidents" stroke="#EF4444" name="Monthly Incidents" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Current Efficiency Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Automation Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Policy Automation</span>
                    <span>{Math.round(selectedVendorData.efficiency.automation)}%</span>
                  </div>
                  <Progress value={selectedVendorData.efficiency.automation} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Incident Response</span>
                    <span>{Math.round(selectedVendorData.kpis.incidentReduction)}%</span>
                  </div>
                  <Progress value={selectedVendorData.kpis.incidentReduction} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>User Satisfaction</span>
                    <span>{Math.round(selectedVendorData.kpis.userSatisfaction)}%</span>
                  </div>
                  <Progress value={selectedVendorData.kpis.userSatisfaction} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Devices per Admin</span>
                  <Badge variant="secondary">{Math.round(selectedVendorData.efficiency.deviceRatio)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Response Time</span>
                  <Badge variant="secondary">{selectedVendorData.efficiency.responseTime}h</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>System Uptime</span>
                  <Badge variant="secondary">{selectedVendorData.kpis.uptime}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Management Efficiency</span>
                  <Badge variant="secondary">{Math.round(selectedVendorData.efficiency.management)}%</Badge>
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
                    <p className="text-2xl font-bold">{selectedVendorData.staffing.current}</p>
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
                    <p className="text-2xl font-bold">{selectedVendorData.staffing.required}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Efficiency</p>
                    <p className="text-2xl font-bold">{Math.round(selectedVendorData.staffing.efficiency)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Staffing Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Staffing Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current Capacity</span>
                      <span>{Math.round(selectedVendorData.staffing.efficiency)}%</span>
                    </div>
                    <Progress value={selectedVendorData.staffing.efficiency} className="h-2" />
                  </div>
                  {selectedVendorData.staffing.gap > 0 && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Staffing gap of {selectedVendorData.staffing.gap} personnel identified. Consider hiring or
                        training additional staff.
                      </AlertDescription>
                    </Alert>
                  )}
                  {selectedVendorData.staffing.gap === 0 && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Current staffing levels are adequate for the selected solution.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedVendorData.staffing.skillsRequired.length > 0 ? (
                    selectedVendorData.staffing.skillsRequired.map((skill: string, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{skill}</span>
                        <Badge variant="outline">Required</Badge>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Network Administration</span>
                        <Badge variant="outline">Required</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Security Management</span>
                        <Badge variant="outline">Required</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Policy Configuration</span>
                        <Badge variant="outline">Preferred</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Troubleshooting</span>
                        <Badge variant="outline">Required</Badge>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          {/* Cost Breakdown Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={costBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percentage }) => `${category} (${percentage.toFixed(1)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {costBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-4">
                  {costBreakdownData.map((item, index) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{item.category}</span>
                      </div>
                      <span className="font-semibold">${item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Efficiency Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Cost per Device</span>
                  <Badge variant="secondary">${selectedVendorData.costs.perDevice.toFixed(2)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cost per User</span>
                  <Badge variant="secondary">${selectedVendorData.costs.perUser.toFixed(2)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Monthly Cost</span>
                  <Badge variant="secondary">${selectedVendorData.costs.total.toLocaleString()}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Annual Cost</span>
                  <Badge variant="secondary">${(selectedVendorData.costs.total * 12).toLocaleString()}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>Automation features can reduce operational costs by up to 30%</AlertDescription>
                </Alert>
                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertDescription>Consider volume discounts for licensing costs</AlertDescription>
                </Alert>
                <Alert>
                  <Users className="h-4 w-4" />
                  <AlertDescription>Training investment can improve staff efficiency by 25%</AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maturity" className="space-y-6">
          {/* Maturity Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Maturity Assessment</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">{Math.round(selectedVendorData.maturity.overall)}</span>
                <span className="text-muted-foreground">/ 100</span>
                <Badge
                  variant={
                    selectedVendorData.maturity.overall >= 80
                      ? "default"
                      : selectedVendorData.maturity.overall >= 60
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {selectedVendorData.maturity.overall >= 80
                    ? "Advanced"
                    : selectedVendorData.maturity.overall >= 60
                      ? "Intermediate"
                      : "Basic"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {Object.entries(selectedVendorData.maturity.scores).map(([category, score]) => (
                    <div key={category}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize">{category}</span>
                        <span>{Math.round(score as number)}/100</span>
                      </div>
                      <Progress value={score as number} className="h-2" />
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Improvement Recommendations</h4>
                  <div className="space-y-2">
                    {selectedVendorData.maturity.recommendations.map((rec: string, index: number) => (
                      <Alert key={index}>
                        <Target className="h-4 w-4" />
                        <AlertDescription>{rec}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maturity Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle>Maturity Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-2 border-green-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Phase 1: Foundation</CardTitle>
                      <Badge variant="secondary">0-6 months</Badge>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-1">
                        <li>• Basic policy implementation</li>
                        <li>• Staff training programs</li>
                        <li>• Initial automation setup</li>
                        <li>• Monitoring establishment</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Phase 2: Enhancement</CardTitle>
                      <Badge variant="secondary">6-12 months</Badge>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-1">
                        <li>• Advanced automation</li>
                        <li>• Integration expansion</li>
                        <li>• Performance optimization</li>
                        <li>• Process refinement</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-purple-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Phase 3: Optimization</CardTitle>
                      <Badge variant="secondary">12+ months</Badge>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-1">
                        <li>• AI-driven insights</li>
                        <li>• Predictive analytics</li>
                        <li>• Full automation</li>
                        <li>• Continuous improvement</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
