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
import { TrendingUp, Shield, DollarSign, Users, Clock, AlertTriangle, CheckCircle, Target, Zap } from "lucide-react"

interface ExecutiveDashboardViewProps {
  results: any[]
  config: any
}

export function ExecutiveDashboardView({ results, config }: ExecutiveDashboardViewProps) {
  // Mock data for charts
  const tcoComparisonData = results.slice(0, 5).map((result) => ({
    vendor: result.vendorName || "Unknown",
    year1: result.totalCost * 0.4,
    year3: result.totalCost * 0.8,
    year5: result.totalCost,
    roi: result.roi || Math.floor(Math.random() * 200) + 50,
  }))

  const riskReductionData = [
    { category: "Data Breach", withoutNAC: 85, withNAC: 15 },
    { category: "Insider Threats", withoutNAC: 70, withNAC: 20 },
    { category: "Compliance Violations", withoutNAC: 60, withNAC: 10 },
    { category: "Operational Disruption", withoutNAC: 45, withNAC: 8 },
  ]

  const complianceScores = [
    { framework: "HIPAA", score: 95, color: "#10b981" },
    { framework: "PCI DSS", score: 92, color: "#3b82f6" },
    { framework: "GDPR", score: 88, color: "#8b5cf6" },
    { framework: "SOX", score: 90, color: "#f59e0b" },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  // Calculate key metrics
  const bestROI = Math.max(...results.map((r) => r.roi || 0))
  const lowestTCO = Math.min(...results.map((r) => r.totalCost))
  const avgImplementationTime = 12 // weeks
  const riskReduction = 78 // percentage

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
            <div className="text-2xl font-bold text-green-600">{bestROI.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">3-year projection</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lowest TCO</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(lowestTCO / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">3-year total cost</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Reduction</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{riskReduction}%</div>
            <p className="text-xs text-muted-foreground">Average across threats</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Implementation</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgImplementationTime} weeks</div>
            <p className="text-xs text-muted-foreground">Average deployment time</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial Analysis</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>TCO Comparison by Vendor</CardTitle>
                <CardDescription>3-year total cost of ownership analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={tcoComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
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
                <CardTitle>ROI Comparison</CardTitle>
                <CardDescription>Return on investment by vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={tcoComparisonData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ vendor, roi }) => `${vendor}: ${roi}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="roi"
                    >
                      {tcoComparisonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown Analysis</CardTitle>
                <CardDescription>Detailed cost components comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.slice(0, 3).map((result, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{result.vendorName}</span>
                        <span className="text-sm font-medium">${result.totalCost.toLocaleString()}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Licensing</span>
                          <span>${(result.totalCost * 0.4).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Implementation</span>
                          <span>${(result.totalCost * 0.3).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Support</span>
                          <span>${(result.totalCost * 0.2).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Training</span>
                          <span>${(result.totalCost * 0.1).toLocaleString()}</span>
                        </div>
                      </div>
                      <Progress value={(index + 1) * 25} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Value Metrics</CardTitle>
                <CardDescription>Quantified business impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span>Cost Avoidance</span>
                    </div>
                    <span className="font-semibold text-green-600">$2.4M</span>
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
                    <span className="font-semibold text-purple-600">8 weeks</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-orange-500" />
                      <span>Compliance Score</span>
                    </div>
                    <span className="font-semibold text-orange-600">95%</span>
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
                <CardTitle>Threat Landscape</CardTitle>
                <CardDescription>Current security threats and mitigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span>Ransomware Risk</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-red-600">High</span>
                      <Progress value={85} className="w-20 h-2" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-orange-500" />
                      <span>Insider Threats</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-orange-600">Medium</span>
                      <Progress value={60} className="w-20 h-2" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span>Zero-Day Exploits</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-yellow-600">Medium</span>
                      <Progress value={45} className="w-20 h-2" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Data Exfiltration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-green-600">Low</span>
                      <Progress value={25} className="w-20 h-2" />
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
                <CardTitle>Compliance Framework Scores</CardTitle>
                <CardDescription>Current compliance posture assessment</CardDescription>
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
                <CardTitle>Regulatory Impact</CardTitle>
                <CardDescription>Potential penalties and cost avoidance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="font-medium text-red-800">Potential Penalties</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">$5.2M</div>
                    <div className="text-sm text-red-600">Without proper NAC controls</div>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="font-medium text-green-800">Cost Avoidance</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">$4.8M</div>
                    <div className="text-sm text-green-600">With Portnox CLEAR implementation</div>
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

export default ExecutiveDashboardView
