"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  Shield,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Target,
  Award,
  FileText,
  Download,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"

interface ExecutiveDashboardViewProps {
  tcoData: Record<string, any>
  config: any
  industryData?: any
  summaryMetrics?: any
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

// Safe array helper function
const safeArray = (value: any): any[] => {
  return Array.isArray(value) ? value : []
}

// Safe object helper function
const safeObject = (value: any): Record<string, any> => {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {}
}

export { ExecutiveDashboardView }
export default function ExecutiveDashboardView({
  tcoData = {},
  config = {},
  industryData = {},
  summaryMetrics = {},
}: ExecutiveDashboardViewProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Convert tcoData to array format for charts
  const vendorData = Object.entries(safeObject(tcoData)).map(([vendorId, data]) => {
    const vendor = ComprehensiveVendorDatabase[vendorId]
    const vendorInfo = safeObject(data)

    return {
      id: vendorId,
      name: vendor?.name || vendorId,
      year1: safeNumber(vendorInfo.year1, 0),
      year3: safeNumber(vendorInfo.year3, 0),
      year5: safeNumber(vendorInfo.year5, 0),
      totalCost: safeNumber(vendorInfo.year5, 0),
      roi: safeNumber(vendorInfo.roi?.totalSavings, 0),
      paybackPeriod: safeNumber(vendorInfo.roi?.paybackPeriod, 0),
      riskReduction: safeNumber(vendorInfo.roi?.breachRiskReduction, 0),
      complianceScore: safeNumber(vendor?.compliance?.automationLevel, 0),
      securityScore: safeNumber(vendor?.security?.zeroTrustScore, 0),
      implementationTime: safeNumber(vendor?.implementation?.timeToValue, 0),
    }
  })

  // Calculate key metrics
  const bestVendor = vendorData.reduce(
    (best, current) => (current.totalCost < best.totalCost ? current : best),
    vendorData[0] || { totalCost: Number.POSITIVE_INFINITY, name: "N/A" },
  )

  const avgCost =
    vendorData.length > 0 ? vendorData.reduce((sum, vendor) => sum + vendor.totalCost, 0) / vendorData.length : 0

  const maxSavings = vendorData.length > 0 ? Math.max(...vendorData.map((v) => v.roi)) : 0

  const avgPayback =
    vendorData.length > 0 ? vendorData.reduce((sum, vendor) => sum + vendor.paybackPeriod, 0) / vendorData.length : 0

  // ROI Analysis Data
  const roiData = vendorData.map((vendor) => ({
    name: vendor.name,
    savings: vendor.roi,
    investment: vendor.year1,
    netBenefit: vendor.roi - vendor.year1,
  }))

  // Risk Analysis Data
  const riskData = vendorData.map((vendor) => ({
    name: vendor.name,
    riskReduction: vendor.riskReduction,
    securityScore: vendor.securityScore,
    complianceScore: vendor.complianceScore,
  }))

  // Implementation Timeline Data
  const timelineData = vendorData.map((vendor) => ({
    name: vendor.name,
    implementationTime: vendor.implementationTime,
    paybackPeriod: vendor.paybackPeriod,
    timeToValue: vendor.implementationTime + vendor.paybackPeriod * 30, // Convert months to days
  }))

  const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

  const ExecutiveSummaryCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Best TCO</p>
              <p className="text-2xl font-bold">${bestVendor.totalCost.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{bestVendor.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Max ROI</p>
              <p className="text-2xl font-bold">${maxSavings.toLocaleString()}</p>
              <p className="text-xs text-green-600">5-year savings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Payback</p>
              <p className="text-2xl font-bold">{avgPayback.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">months</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Risk Reduction</p>
              <p className="text-2xl font-bold">
                {vendorData.length > 0
                  ? Math.round(vendorData.reduce((sum, v) => sum + v.riskReduction, 0) / vendorData.length)
                  : 0}
                %
              </p>
              <p className="text-xs text-muted-foreground">average</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const TCOComparisonChart = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart className="h-5 w-5" />
          <span>Total Cost of Ownership Comparison</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={vendorData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => [`$${safeNumber(value, 0).toLocaleString()}`, "Cost"]} />
            <Bar dataKey="year1" fill="#8884d8" name="Year 1" />
            <Bar dataKey="year3" fill="#82ca9d" name="Year 3" />
            <Bar dataKey="year5" fill="#ffc658" name="Year 5" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )

  const ROIAnalysisChart = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>ROI Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={roiData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => [`$${safeNumber(value, 0).toLocaleString()}`, ""]} />
            <Area type="monotone" dataKey="savings" stackId="1" stroke="#00D4AA" fill="#00D4AA" />
            <Area type="monotone" dataKey="investment" stackId="2" stroke="#EF4444" fill="#EF4444" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )

  const VendorRankingTable = () => {
    const rankedVendors = [...vendorData].sort((a, b) => {
      // Composite score: lower cost + higher ROI + higher security score
      const scoreA = (1 / a.totalCost) * 1000000 + a.roi + a.securityScore
      const scoreB = (1 / b.totalCost) * 1000000 + b.roi + b.securityScore
      return scoreB - scoreA
    })

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Vendor Performance Ranking</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rankedVendors.map((vendor, index) => (
              <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{vendor.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${vendor.totalCost.toLocaleString()} • {vendor.paybackPeriod.toFixed(1)} months payback
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">${vendor.roi.toLocaleString()} savings</p>
                    <p className="text-xs text-muted-foreground">{vendor.securityScore}% security score</p>
                  </div>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor((5 - index) * 0.8) + 1 ? "text-yellow-400 fill-current" : "text-gray-300",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const ComplianceOverview = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5" />
          <span>Compliance & Risk Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Compliance Scores</h4>
            <div className="space-y-3">
              {vendorData.map((vendor, index) => (
                <div key={vendor.id} className="flex items-center justify-between">
                  <span className="text-sm">{vendor.name}</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={vendor.complianceScore} className="w-20" />
                    <span className="text-sm font-medium">{vendor.complianceScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Security Scores</h4>
            <div className="space-y-3">
              {vendorData.map((vendor, index) => (
                <div key={vendor.id} className="flex items-center justify-between">
                  <span className="text-sm">{vendor.name}</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={vendor.securityScore} className="w-20" />
                    <span className="text-sm font-medium">{vendor.securityScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const ExecutiveRecommendations = () => {
    const topVendor = vendorData.reduce((best, current) => {
      const bestScore = (1 / best.totalCost) * 1000000 + best.roi + best.securityScore
      const currentScore = (1 / current.totalCost) * 1000000 + current.roi + current.securityScore
      return currentScore > bestScore ? current : best
    }, vendorData[0] || { name: "N/A", totalCost: 0, roi: 0, securityScore: 0 })

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Executive Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Recommended Solution:</strong> {topVendor.name} offers the best balance of cost, ROI, and security
              with ${topVendor.totalCost.toLocaleString()} total cost and ${topVendor.roi.toLocaleString()} in projected
              savings.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Key Benefits</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Fastest payback period: {topVendor.paybackPeriod.toFixed(1)} months</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Highest security score: {topVendor.securityScore}%</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Lowest total cost of ownership</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Quick implementation: {topVendor.implementationTime} days</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Risk Considerations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>Ensure adequate training budget</span>
                </li>
                <li className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>Plan for integration complexity</span>
                </li>
                <li className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>Consider vendor lock-in implications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>Validate compliance requirements</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Executive Dashboard</h2>
          <p className="text-muted-foreground">Strategic overview and vendor recommendations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Executive Summary
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Executive Summary Cards */}
      <ExecutiveSummaryCards />

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="risk">Risk & Compliance</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TCOComparisonChart />
            <ROIAnalysisChart />
          </div>
          <VendorRankingTable />
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown by Year</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={vendorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => [`$${safeNumber(value, 0).toLocaleString()}`, ""]} />
                    <Line type="monotone" dataKey="year1" stroke="#8884d8" name="Year 1" />
                    <Line type="monotone" dataKey="year3" stroke="#82ca9d" name="Year 3" />
                    <Line type="monotone" dataKey="year5" stroke="#ffc658" name="Year 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={vendorData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="roi"
                      label={({ name, roi }) => `${name}: $${safeNumber(roi, 0).toLocaleString()}`}
                    >
                      {vendorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${safeNumber(value, 0).toLocaleString()}`, "ROI"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <ComplianceOverview />
          <Card>
            <CardHeader>
              <CardTitle>Risk vs Security Score</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={riskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="riskReduction" fill="#00D4AA" name="Risk Reduction %" />
                  <Bar dataKey="securityScore" fill="#8B5CF6" name="Security Score %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <ExecutiveRecommendations />
          <Card>
            <CardHeader>
              <CardTitle>Implementation Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${safeNumber(value, 0)} days`, ""]} />
                  <Bar dataKey="implementationTime" fill="#0EA5E9" name="Implementation Time" />
                  <Bar dataKey="timeToValue" fill="#F97316" name="Time to Value" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
