"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  ComposedChart,
  Legend,
} from "recharts"
import {
  DollarSign,
  TrendingUp,
  PieChartIcon,
  BarChart3,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Zap,
  Clock,
  Users,
  Server,
  Wrench,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface DetailedCostsViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

const COLORS = ["#00D4AA", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"]

export default function DetailedCostsView({ results, config }: DetailedCostsViewProps) {
  const [selectedVendor, setSelectedVendor] = useState<string>("all")
  const [costCategory, setCostCategory] = useState<string>("all")
  const [timeView, setTimeView] = useState<string>("annual")
  const [showHiddenCosts, setShowHiddenCosts] = useState<boolean>(true)

  // Process results for detailed analysis
  const processedResults = results.map((result) => ({
    ...result,
    vendorName: result.vendor.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    annualCost: result.totalCost / config.years,
    costPerDevice: result.totalCost / config.devices,
    costPerUser: result.totalCost / config.users,
  }))

  // Cost breakdown data for pie chart
  const costBreakdownData = (vendorId: string) => {
    const vendor = results.find((r) => r.vendor === vendorId)
    if (!vendor) return []

    return [
      { name: "Licensing", value: vendor.breakdown.licensing, color: COLORS[0] },
      { name: "Hardware", value: vendor.breakdown.hardware, color: COLORS[1] },
      { name: "Services", value: vendor.breakdown.services, color: COLORS[2] },
      { name: "Operations", value: vendor.breakdown.operations, color: COLORS[3] },
    ].filter((item) => item.value > 0)
  }

  // Year-over-year cost progression
  const yearlyProgressionData = Array.from({ length: config.years }, (_, yearIndex) => {
    const year = yearIndex + 1
    const yearData: any = { year: `Year ${year}` }

    results.forEach((result) => {
      const vendorName = result.vendor.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
      yearData[vendorName] = result.totalCost / config.years / 1000 // Convert to thousands
    })

    return yearData
  })

  // Hidden costs analysis
  const hiddenCostsData = [
    {
      category: "Hardware Refresh",
      portnox: 0,
      traditional: 150000,
      description: "3-year hardware lifecycle costs",
    },
    {
      category: "Maintenance Windows",
      portnox: 0,
      traditional: 75000,
      description: "Downtime and maintenance overhead",
    },
    {
      category: "Training & Certification",
      portnox: 5000,
      traditional: 45000,
      description: "Staff training and certification costs",
    },
    {
      category: "Integration Complexity",
      portnox: 10000,
      traditional: 85000,
      description: "Custom integration and API development",
    },
    {
      category: "Compliance Auditing",
      portnox: 15000,
      traditional: 65000,
      description: "Manual compliance and audit preparation",
    },
  ]

  // Cost efficiency metrics
  const efficiencyMetrics = processedResults.map((result) => ({
    vendor: result.vendorName,
    costPerDevice: result.costPerDevice,
    costPerUser: result.costPerUser,
    deploymentTime: result.vendor === "portnox" ? 0.02 : result.vendor.includes("cisco") ? 6 : 3, // months
    adminHours: result.vendor === "portnox" ? 2 : result.vendor.includes("cisco") ? 40 : 20, // hours/week
  }))

  // ROI comparison data
  const roiComparisonData = processedResults.map((result) => {
    const portnoxCost = results.find((r) => r.vendor === "portnox")?.totalCost || 0
    const savings = result.totalCost - portnoxCost
    const roi = portnoxCost > 0 ? (savings / portnoxCost) * 100 : 0

    return {
      vendor: result.vendorName,
      totalCost: result.totalCost / 1000,
      savings: Math.max(0, savings / 1000),
      roi: Math.max(0, roi),
      payback: savings > 0 ? portnoxCost / (savings / config.years) : 0,
    }
  })

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Detailed Cost Analysis</h2>
          <p className="text-muted-foreground">Comprehensive TCO breakdown and cost optimization insights</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Select value={selectedVendor} onValueChange={setSelectedVendor}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select vendor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vendors</SelectItem>
              {processedResults.map((result) => (
                <SelectItem key={result.vendor} value={result.vendor}>
                  {result.vendorName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeView} onValueChange={setTimeView}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="annual">Annual</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="total">Total</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={showHiddenCosts ? "default" : "outline"}
            size="sm"
            onClick={() => setShowHiddenCosts(!showHiddenCosts)}
          >
            {showHiddenCosts ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
            Hidden Costs
          </Button>
        </div>
      </div>

      <Tabs defaultValue="breakdown" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="comparison">Vendor Comparison</TabsTrigger>
          <TabsTrigger value="timeline">Cost Timeline</TabsTrigger>
          <TabsTrigger value="efficiency">Cost Efficiency</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
        </TabsList>

        {/* Cost Breakdown Tab */}
        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Portnox Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-green-600" />
                  Portnox CLEAR Cost Structure
                </CardTitle>
                <CardDescription>Transparent, predictable OpEx model</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={costBreakdownData("portnox")}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {costBreakdownData("portnox").map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`$${Math.round(value / 1000)}K`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {costBreakdownData("portnox").map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">${Math.round(item.value / 1000)}K</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Traditional NAC Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-red-600" />
                  Traditional NAC Cost Structure
                </CardTitle>
                <CardDescription>Complex CapEx + OpEx model with hidden costs</CardDescription>
              </CardHeader>
              <CardContent>
                {results.find((r) => r.vendor.includes("cisco")) && (
                  <>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={costBreakdownData(results.find((r) => r.vendor.includes("cisco"))!.vendor)}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {costBreakdownData(results.find((r) => r.vendor.includes("cisco"))!.vendor).map(
                            (entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ),
                          )}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`$${Math.round(value / 1000)}K`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {costBreakdownData(results.find((r) => r.vendor.includes("cisco"))!.vendor).map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span>{item.name}</span>
                          </div>
                          <span className="font-medium">${Math.round(item.value / 1000)}K</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Hidden Costs Analysis */}
          {showHiddenCosts && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Hidden Cost Analysis
                </CardTitle>
                <CardDescription>Often overlooked costs that significantly impact TCO</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hiddenCostsData.map((cost, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{cost.category}</h4>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="text-green-600">
                            Portnox: ${Math.round(cost.portnox / 1000)}K
                          </Badge>
                          <Badge variant="outline" className="text-red-600">
                            Traditional: ${Math.round(cost.traditional / 1000)}K
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{cost.description}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Cost Comparison</span>
                            <span>
                              {Math.round(((cost.traditional - cost.portnox) / cost.traditional) * 100)}% savings
                            </span>
                          </div>
                          <Progress
                            value={((cost.traditional - cost.portnox) / cost.traditional) * 100}
                            className="h-2"
                          />
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-green-600">
                            ${Math.round((cost.traditional - cost.portnox) / 1000)}K saved
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">Total Hidden Cost Savings</span>
                  </div>
                  <p className="text-green-700">
                    Portnox CLEAR eliminates $
                    {Math.round(
                      hiddenCostsData.reduce((sum, cost) => sum + (cost.traditional - cost.portnox), 0) / 1000,
                    )}
                    K in hidden costs over {config.years} years through cloud-native architecture and operational
                    simplicity.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Vendor Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Comprehensive Vendor Cost Comparison
              </CardTitle>
              <CardDescription>Total cost of ownership across all evaluated vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={processedResults}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendorName" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      name === "totalCost"
                        ? `$${Math.round(value / 1000)}K`
                        : name === "costPerDevice"
                          ? `$${Math.round(value)}`
                          : `$${Math.round(value)}`,
                      name === "totalCost"
                        ? "Total Cost"
                        : name === "costPerDevice"
                          ? "Cost per Device"
                          : "Cost per User",
                    ]}
                  />
                  <Bar yAxisId="left" dataKey="totalCost" fill="#00D4AA" name="totalCost" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="costPerDevice"
                    stroke="#FF6B6B"
                    strokeWidth={3}
                    name="costPerDevice"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cost Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processedResults.map((result, index) => (
              <Card key={index} className={result.vendor === "portnox" ? "border-green-500 bg-green-50" : ""}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{result.vendorName}</CardTitle>
                  <CardDescription>
                    {result.vendor === "portnox" ? "Recommended Solution" : "Alternative Option"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Total Cost</p>
                      <p className="font-bold text-lg">${Math.round(result.totalCost / 1000)}K</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Annual Cost</p>
                      <p className="font-bold text-lg">${Math.round(result.annualCost / 1000)}K</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Per Device</p>
                      <p className="font-bold">${Math.round(result.costPerDevice)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Per User</p>
                      <p className="font-bold">${Math.round(result.costPerUser)}</p>
                    </div>
                  </div>
                  {result.vendor === "portnox" && (
                    <div className="pt-2 border-t">
                      <Badge className="bg-green-600">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Best Value
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Cost Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Cost Progression Over Time
              </CardTitle>
              <CardDescription>Annual cost comparison across {config.years} years</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={yearlyProgressionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => [`$${value}K`, ""]} />
                  <Legend />
                  {results.map((result, index) => (
                    <Line
                      key={result.vendor}
                      type="monotone"
                      dataKey={result.vendor.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={result.vendor === "portnox" ? 4 : 2}
                      strokeDasharray={result.vendor === "portnox" ? "0" : "5 5"}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost Efficiency Tab */}
        <TabsContent value="efficiency" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Deployment Efficiency
                </CardTitle>
                <CardDescription>Time and resource requirements for deployment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={efficiencyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        name === "deploymentTime" ? `${value} months` : `${value} hours/week`,
                        name === "deploymentTime" ? "Deployment Time" : "Admin Hours",
                      ]}
                    />
                    <Bar dataKey="deploymentTime" fill="#FF6B6B" name="deploymentTime" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Operational Efficiency
                </CardTitle>
                <CardDescription>Ongoing administrative overhead comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={efficiencyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`${value} hours/week`, "Admin Hours"]} />
                    <Bar dataKey="adminHours" fill="#4ECDC4" name="adminHours" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Efficiency Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Efficiency Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-semibold">Deployment Speed</h4>
                  <p className="text-2xl font-bold text-green-600">99%</p>
                  <p className="text-sm text-gray-600">faster than traditional</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold">Admin Reduction</h4>
                  <p className="text-2xl font-bold text-blue-600">90%</p>
                  <p className="text-sm text-gray-600">less administrative overhead</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Server className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-semibold">Infrastructure</h4>
                  <p className="text-2xl font-bold text-purple-600">0</p>
                  <p className="text-sm text-gray-600">hardware required</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Wrench className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <h4 className="font-semibold">Maintenance</h4>
                  <p className="text-2xl font-bold text-orange-600">100%</p>
                  <p className="text-sm text-gray-600">automated updates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROI Analysis Tab */}
        <TabsContent value="roi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                ROI Comparison Analysis
              </CardTitle>
              <CardDescription>Return on investment and payback period comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={roiComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      name === "roi"
                        ? `${value.toFixed(1)}%`
                        : name === "payback"
                          ? `${value.toFixed(1)} years`
                          : `$${Math.round(value)}K`,
                      name === "roi"
                        ? "ROI"
                        : name === "payback"
                          ? "Payback Period"
                          : name === "savings"
                            ? "Savings vs Portnox"
                            : "Total Cost",
                    ]}
                  />
                  <Bar yAxisId="left" dataKey="savings" fill="#00D4AA" name="savings" />
                  <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#FF6B6B" strokeWidth={3} name="roi" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* ROI Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">Maximum ROI</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {Math.max(...roiComparisonData.map((r) => r.roi)).toFixed(0)}%
                    </p>
                    <p className="text-sm text-green-600">3-year projection</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">Fastest Payback</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.min(...roiComparisonData.filter((r) => r.payback > 0).map((r) => r.payback)).toFixed(1)}y
                    </p>
                    <p className="text-sm text-blue-600">investment recovery</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-800">Total Savings</h3>
                    <p className="text-2xl font-bold text-purple-600">
                      ${Math.round(Math.max(...roiComparisonData.map((r) => r.savings)))}K
                    </p>
                    <p className="text-sm text-purple-600">vs highest cost option</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
