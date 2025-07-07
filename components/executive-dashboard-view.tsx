"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  TrendingUp,
  Shield,
  DollarSign,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Target,
  Zap,
  Building,
  Award,
  TrendingDown,
} from "lucide-react"

interface ExecutiveDashboardViewProps {
  tcoData: Record<string, any>
  config: any
  industryData: any
  summaryMetrics: any
}

export default function ExecutiveDashboardView({
  tcoData,
  config,
  industryData,
  summaryMetrics,
}: ExecutiveDashboardViewProps) {
  // Convert tcoData to array format for charts
  const tcoArray = Object.entries(tcoData).map(([vendorId, data]) => ({
    vendor: data.vendorName || vendorId,
    vendorId,
    year1: data.year1 || 0,
    year2: data.year2 || 0,
    year3: data.year3 || 0,
    year5: data.year5 || 0,
    totalCost: data.totalCost || 0,
    roi: data.roi?.percentage || 0,
    payback: data.roi?.paybackPeriod || 0,
    riskReduction: data.roi?.breachRiskReduction || 0,
    operationalSavings: data.roi?.operationalSavings || 0,
    complianceSavings: data.roi?.complianceSavings || 0,
  }))

  // Sort by total cost for comparison
  const sortedVendors = [...tcoArray].sort((a, b) => a.totalCost - b.totalCost)
  const topVendors = sortedVendors.slice(0, 5)

  // Risk reduction data
  const riskReductionData = [
    { category: "Data Breach", withoutNAC: 85, withNAC: 15, reduction: 70 },
    { category: "Insider Threats", withoutNAC: 70, withNAC: 20, reduction: 50 },
    { category: "Compliance Violations", withoutNAC: 60, withNAC: 10, reduction: 50 },
    { category: "Operational Disruption", withoutNAC: 45, withNAC: 8, reduction: 37 },
  ]

  // Compliance scores by framework
  const complianceScores = [
    { framework: "HIPAA", score: 95, color: "#10b981" },
    { framework: "PCI DSS", score: 96, color: "#3b82f6" },
    { framework: "SOX", score: 95, color: "#8b5cf6" },
    { framework: "NIST 800-53", score: 95, color: "#f59e0b" },
    { framework: "GDPR", score: 93, color: "#ef4444" },
    { framework: "ISO 27001", score: 95, color: "#06b6d4" },
  ]

  // Cost breakdown for top 3 vendors
  const costBreakdownData = topVendors.slice(0, 3).map((vendor) => {
    const vendorData = tcoData[vendor.vendorId]
    return {
      vendor: vendor.vendor,
      licensing: vendorData.breakdown?.licensing || 0,
      implementation: vendorData.breakdown?.implementation || 0,
      maintenance: vendorData.breakdown?.maintenance || 0,
      training: vendorData.breakdown?.training || 0,
      infrastructure: vendorData.breakdown?.infrastructure || 0,
      hiddenCosts: vendorData.breakdown?.hiddenCosts || 0,
    }
  })

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Executive Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive overview of NAC vendor analysis and key business metrics
          </p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            {config.industry.charAt(0).toUpperCase() + config.industry.slice(1)}
          </Badge>
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            {config.deviceCount.toLocaleString()} Devices
          </Badge>
          <Badge variant="outline" className="text-purple-600 border-purple-600">
            {config.timeframe} Year Analysis
          </Badge>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.max(...tcoArray.map((v) => v.roi)).toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">{config.timeframe}-year projection</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lowest TCO</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(Math.min(...tcoArray.map((v) => v.totalCost)) / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">{config.timeframe}-year total cost</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Reduction</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.max(...tcoArray.map((v) => v.riskReduction)).toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">Maximum breach risk reduction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fastest Payback</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.min(...tcoArray.map((v) => v.payback)).toFixed(1)} mo</div>
            <p className="text-xs text-muted-foreground">Return on investment</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial Analysis</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>TCO Comparison by Vendor</CardTitle>
                <CardDescription>{config.timeframe}-year total cost of ownership analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topVendors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} fontSize={12} />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="year1" fill="#8884d8" name="Year 1" />
                    <Bar dataKey="year3" fill="#82ca9d" name="Year 3" />
                    <Bar dataKey="year5" fill="#ffc658" name="Year 5" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Distribution</CardTitle>
                <CardDescription>Return on investment by vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={topVendors}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ vendor, roi }) => `${vendor}: ${roi.toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="roi"
                    >
                      {topVendors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Vendor Ranking */}
          <Card>
            <CardHeader>
              <CardTitle>Vendor Performance Ranking</CardTitle>
              <CardDescription>Comprehensive scoring based on cost, ROI, and capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedVendors.slice(0, 5).map((vendor, index) => (
                  <div key={vendor.vendorId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{vendor.vendor}</h4>
                        <p className="text-sm text-muted-foreground">
                          ${(vendor.totalCost / 1000).toFixed(0)}K total cost
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">{vendor.roi.toFixed(0)}% ROI</p>
                        <p className="text-xs text-muted-foreground">{vendor.payback.toFixed(1)} mo payback</p>
                      </div>
                      {index === 0 && <Award className="h-5 w-5 text-yellow-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown Analysis</CardTitle>
                <CardDescription>Detailed cost components for top vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={costBreakdownData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="licensing" stackId="a" fill="#8884d8" name="Licensing" />
                    <Bar dataKey="implementation" stackId="a" fill="#82ca9d" name="Implementation" />
                    <Bar dataKey="maintenance" stackId="a" fill="#ffc658" name="Maintenance" />
                    <Bar dataKey="training" stackId="a" fill="#ff7300" name="Training" />
                    <Bar dataKey="infrastructure" stackId="a" fill="#8dd1e1" name="Infrastructure" />
                    <Bar dataKey="hiddenCosts" stackId="a" fill="#d084d0" name="Hidden Costs" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Value Metrics</CardTitle>
                <CardDescription>Quantified business impact and savings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span>Cost Avoidance</span>
                    </div>
                    <span className="font-semibold text-green-600">
                      ${(summaryMetrics.totalSavings / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>Productivity Gains</span>
                    </div>
                    <span className="font-semibold text-blue-600">25%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span>Time to Value</span>
                    </div>
                    <span className="font-semibold text-purple-600">{summaryMetrics.timeToValue} days</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-orange-500" />
                      <span>Compliance Score</span>
                    </div>
                    <span className="font-semibold text-orange-600">{summaryMetrics.complianceScore}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Reduction Analysis</CardTitle>
                <CardDescription>Security risk mitigation by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={riskReductionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="withoutNAC" fill="#ef4444" name="Without NAC" />
                    <Bar dataKey="withNAC" fill="#10b981" name="With NAC" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Industry Risk Profile</CardTitle>
                <CardDescription>Risk assessment for {industryData?.name || config.industry}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span>Average Breach Cost</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-red-600">
                        ${((industryData?.averageBreachCost || 5000000) / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-orange-500" />
                      <span>Regulatory Fines</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-orange-600">
                        ${((industryData?.regulatoryFines || 2000000) / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Risk Reduction</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600">{summaryMetrics.riskReduction}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-4 w-4 text-blue-500" />
                      <span>Cost Avoidance</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-blue-600">
                        ${(summaryMetrics.totalSavings / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Framework Coverage</CardTitle>
                <CardDescription>Portnox CLEAR compliance automation scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceScores.map((framework) => (
                    <div key={framework.framework} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{framework.framework}</span>
                        <span className="text-sm font-medium">{framework.score}%</span>
                      </div>
                      <Progress value={framework.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Impact</CardTitle>
                <CardDescription>Financial and operational benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="font-medium text-green-800">Audit Cost Reduction</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">75%</div>
                    <div className="text-sm text-green-600">Automated evidence collection</div>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-blue-800">Compliance Automation</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                    <div className="text-sm text-blue-600">Continuous monitoring and reporting</div>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="h-4 w-4 text-purple-500" />
                      <span className="font-medium text-purple-800">Penalty Avoidance</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      ${((industryData?.regulatoryFines || 2000000) / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-purple-600">Potential regulatory fine avoidance</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Executive Recommendations</CardTitle>
                <CardDescription>Strategic recommendations based on analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Award className="h-6 w-6 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-green-800">Recommended Solution: Portnox CLEAR</h4>
                        <p className="text-green-700 mt-1">
                          Best overall value with ${(summaryMetrics.totalSavings / 1000).toFixed(0)}K savings,
                          {summaryMetrics.paybackPeriod} month payback, and 95% compliance automation.
                        </p>
                        <ul className="mt-2 text-sm text-green-600 space-y-1">
                          <li>• Fastest deployment: {summaryMetrics.timeToValue} days</li>
                          <li>• Highest automation: 95% of security and compliance tasks</li>
                          <li>• Zero hardware requirements</li>
                          <li>• Comprehensive compliance coverage</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-6 w-6 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-blue-800">Security Benefits</h4>
                        <p className="text-blue-700 mt-1">
                          Implementing NAC reduces breach risk by {summaryMetrics.riskReduction}% and provides
                          continuous security monitoring across all network access points.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="h-6 w-6 text-purple-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-purple-800">Business Impact</h4>
                        <p className="text-purple-700 mt-1">
                          Expected {Math.round(summaryMetrics.savingsPercent)}% cost reduction compared to traditional
                          solutions, with significant operational efficiency gains.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-6 w-6 text-orange-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-orange-800">Implementation Timeline</h4>
                        <p className="text-orange-700 mt-1">
                          Recommended phased approach: Pilot deployment (Week 1), Full rollout (Week 2-4), Optimization
                          (Week 5-8).
                        </p>
                      </div>
                    </div>
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
