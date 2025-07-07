"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, Zap, Target, CheckCircle2, AlertTriangle } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface OperationalAnalysisViewProps {
  selectedVendors?: string[]
  devices?: number
  users?: number
}

export default function OperationalAnalysisView({
  selectedVendors = ["portnox"],
  devices = 1000,
  users = 2500,
}: OperationalAnalysisViewProps) {
  const [activeTab, setActiveTab] = useState("efficiency")

  // Efficiency metrics data
  const efficiencyData = useMemo(() => {
    return [
      {
        metric: "Admin Time Reduction",
        portnox: 90,
        traditional: 10,
        unit: "%",
      },
      {
        metric: "Deployment Speed",
        portnox: 95,
        traditional: 20,
        unit: "%",
      },
      {
        metric: "Automation Level",
        portnox: 85,
        traditional: 30,
        unit: "%",
      },
      {
        metric: "Self-Service Rate",
        portnox: 95,
        traditional: 25,
        unit: "%",
      },
    ]
  }, [])

  // Staffing analysis
  const staffingData = useMemo(() => {
    const baseStaffing = Math.ceil(devices / 1000) // Base staffing per 1000 devices

    return {
      current: {
        fte: baseStaffing * 2.5, // Traditional NAC requires 2.5 FTE per 1000 devices
        cost: baseStaffing * 2.5 * 120000, // $120k average salary
        skills: ["Network Engineering", "Security Architecture", "Certificate Management", "Troubleshooting"],
      },
      withPortnox: {
        fte: baseStaffing * 0.1, // Portnox requires only 0.1 FTE per 1000 devices
        cost: baseStaffing * 0.1 * 120000,
        skills: ["Basic Network Knowledge"],
      },
      savings: {
        fte: baseStaffing * 2.5 - baseStaffing * 0.1,
        cost: baseStaffing * 2.5 * 120000 - baseStaffing * 0.1 * 120000,
      },
    }
  }, [devices])

  // Cost breakdown data
  const costBreakdownData = [
    { name: "Personnel", portnox: 12000, traditional: 300000 },
    { name: "Training", portnox: 0, traditional: 25000 },
    { name: "Maintenance", portnox: 0, traditional: 50000 },
    { name: "Downtime", portnox: 0, traditional: 75000 },
    { name: "Tools & Licenses", portnox: 36000, traditional: 150000 },
  ]

  // Maturity assessment
  const maturityLevels = [
    {
      area: "Automation",
      current: 2,
      withPortnox: 5,
      description: "Policy deployment and device onboarding",
    },
    {
      area: "Visibility",
      current: 3,
      withPortnox: 5,
      description: "Real-time device and user insights",
    },
    {
      area: "Compliance",
      current: 2,
      withPortnox: 5,
      description: "Automated reporting and audit trails",
    },
    {
      area: "Scalability",
      current: 2,
      withPortnox: 5,
      description: "Cloud-native infinite scaling",
    },
    {
      area: "Security",
      current: 3,
      withPortnox: 5,
      description: "Zero Trust and risk-based access",
    },
  ]

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444"]

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value.toFixed(0)}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Operational Analysis</h2>
          <p className="text-muted-foreground">
            Comprehensive operational impact assessment for {devices} devices and {users} users
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="efficiency">Efficiency Metrics</TabsTrigger>
          <TabsTrigger value="staffing">Staffing Analysis</TabsTrigger>
          <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="maturity">Maturity Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="efficiency" className="space-y-4">
          {/* KPI Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Admin Efficiency</p>
                    <p className="text-3xl font-bold text-green-600">90%</p>
                    <p className="text-xs text-muted-foreground">time reduction</p>
                  </div>
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Deployment Speed</p>
                    <p className="text-3xl font-bold text-blue-600">95%</p>
                    <p className="text-xs text-muted-foreground">faster than traditional</p>
                  </div>
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Automation Level</p>
                    <p className="text-3xl font-bold text-purple-600">85%</p>
                    <p className="text-xs text-muted-foreground">of tasks automated</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Self-Service</p>
                    <p className="text-3xl font-bold text-orange-600">95%</p>
                    <p className="text-xs text-muted-foreground">user success rate</p>
                  </div>
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Efficiency Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Efficiency Comparison</CardTitle>
              <CardDescription>Portnox vs Traditional NAC Solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="portnox" fill="#10b981" name="Portnox CLEAR" />
                  <Bar dataKey="traditional" fill="#6b7280" name="Traditional NAC" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends Over Time</CardTitle>
              <CardDescription>Operational metrics improvement trajectory</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[
                    { month: "Month 1", efficiency: 60, automation: 40, satisfaction: 70 },
                    { month: "Month 3", efficiency: 75, automation: 60, satisfaction: 80 },
                    { month: "Month 6", efficiency: 85, automation: 75, satisfaction: 90 },
                    { month: "Month 12", efficiency: 90, automation: 85, satisfaction: 95 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="efficiency" stroke="#10b981" name="Efficiency" />
                  <Line type="monotone" dataKey="automation" stroke="#3b82f6" name="Automation" />
                  <Line type="monotone" dataKey="satisfaction" stroke="#f59e0b" name="User Satisfaction" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staffing" className="space-y-4">
          {/* Staffing Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Staffing</CardTitle>
                <CardDescription>Traditional NAC requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{staffingData.current.fte}</div>
                    <p className="text-sm text-muted-foreground">Full-Time Equivalent</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold">{formatCurrency(staffingData.current.cost)}</div>
                    <p className="text-sm text-muted-foreground">Annual Cost</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-lg">With Portnox</CardTitle>
                <CardDescription>Optimized staffing model</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{staffingData.withPortnox.fte}</div>
                    <p className="text-sm text-muted-foreground">Full-Time Equivalent</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-green-600">
                      {formatCurrency(staffingData.withPortnox.cost)}
                    </div>
                    <p className="text-sm text-muted-foreground">Annual Cost</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg">Savings</CardTitle>
                <CardDescription>Annual cost reduction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{staffingData.savings.fte}</div>
                    <p className="text-sm text-muted-foreground">FTE Reduction</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-green-600">
                      {formatCurrency(staffingData.savings.cost)}
                    </div>
                    <p className="text-sm text-muted-foreground">Cost Savings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Traditional NAC Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {staffingData.current.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
                <Alert className="mt-4 bg-orange-50 border-orange-200">
                  <AlertDescription className="text-sm">
                    Requires specialized expertise and extensive training. High dependency on skilled personnel.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle>Portnox Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {staffingData.withPortnox.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
                <Alert className="mt-4 bg-green-50 border-green-200">
                  <AlertDescription className="text-sm">
                    Minimal training required. Cloud-native design eliminates complexity and reduces skill dependencies.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Training Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Training & Onboarding Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Traditional NAC Training</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Initial Training</span>
                        <Badge variant="outline">40+ hours</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Certification</span>
                        <Badge variant="outline">$15,000</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Ongoing Training</span>
                        <Badge variant="outline">20 hours/year</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Time to Proficiency</span>
                        <Badge variant="destructive">6+ months</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Portnox Training</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Initial Training</span>
                        <Badge variant="default" className="bg-green-600">
                          2 hours
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Certification</span>
                        <Badge variant="default" className="bg-green-600">
                          FREE
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Ongoing Training</span>
                        <Badge variant="default" className="bg-green-600">
                          Optional webinars
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Time to Proficiency</span>
                        <Badge variant="default" className="bg-green-600">
                          1 week
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          {/* Cost Breakdown Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Annual Operational Cost Breakdown</CardTitle>
              <CardDescription>Detailed cost comparison across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={costBreakdownData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="portnox" fill="#10b981" name="Portnox CLEAR" />
                  <Bar dataKey="traditional" fill="#6b7280" name="Traditional NAC" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cost Efficiency Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(
                      costBreakdownData.reduce((acc, item) => acc + (item.traditional - item.portnox), 0),
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Annual Savings</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(
                      (costBreakdownData.reduce((acc, item) => acc + (item.traditional - item.portnox), 0) /
                        costBreakdownData.reduce((acc, item) => acc + item.traditional, 0)) *
                        100,
                    )}
                    %
                  </div>
                  <p className="text-sm text-muted-foreground">Cost Reduction</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(
                      costBreakdownData.reduce((acc, item) => acc + (item.traditional - item.portnox), 0) /
                        (costBreakdownData.reduce((acc, item) => acc + item.portnox, 0) / 365),
                    )}{" "}
                    days
                  </div>
                  <p className="text-sm text-muted-foreground">Payback Period</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Optimization Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Optimization Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Immediate Savings</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>Eliminate hardware procurement and maintenance costs</li>
                    <li>Reduce professional services requirements by 90%</li>
                    <li>Remove training and certification expenses</li>
                    <li>Eliminate downtime-related productivity losses</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Long-term Benefits</h4>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>Predictable OpEx model with no surprise costs</li>
                    <li>Automatic scaling without additional investment</li>
                    <li>Continuous feature updates at no extra cost</li>
                    <li>Reduced cyber insurance premiums</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maturity" className="space-y-4">
          {/* Maturity Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Maturity Assessment</CardTitle>
              <CardDescription>Current state vs future state with Portnox</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {maturityLevels.map((area) => (
                  <div key={area.area} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{area.area}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Current: {area.current}/5</Badge>
                        <Badge variant="default" className="bg-green-600">
                          Target: {area.withPortnox}/5
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">Current</div>
                        <Progress value={area.current * 20} className="h-2" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">With Portnox</div>
                        <Progress value={area.withPortnox * 20} className="h-2 bg-green-100" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Maturity Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle>Maturity Improvement Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      Foundation (Month 1-3)
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>Deploy Portnox CLEAR</li>
                      <li>Basic policy implementation</li>
                      <li>User onboarding automation</li>
                      <li>Initial reporting setup</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      Optimization (Month 4-6)
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>Advanced policy refinement</li>
                      <li>Risk-based access controls</li>
                      <li>Integration with SIEM/SOAR</li>
                      <li>Compliance automation</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      Excellence (Month 7-12)
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>Zero Trust architecture</li>
                      <li>AI-driven insights</li>
                      <li>Predictive analytics</li>
                      <li>Continuous optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Metrics */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle>Success Metrics & KPIs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Operational KPIs</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mean Time to Resolution</span>
                      <Badge variant="default" className="bg-green-600">
                        &lt; 15 minutes
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>User Onboarding Time</span>
                      <Badge variant="default" className="bg-green-600">
                        &lt; 5 minutes
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Policy Deployment Speed</span>
                      <Badge variant="default" className="bg-green-600">
                        Instant
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>System Availability</span>
                      <Badge variant="default" className="bg-green-600">
                        99.99%
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Business KPIs</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Help Desk Ticket Reduction</span>
                      <Badge variant="default" className="bg-green-600">
                        70%
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>User Satisfaction Score</span>
                      <Badge variant="default" className="bg-green-600">
                        95%
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Compliance Audit Readiness</span>
                      <Badge variant="default" className="bg-green-600">
                        100%
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ROI Achievement Timeline</span>
                      <Badge variant="default" className="bg-green-600">
                        &lt; 90 days
                      </Badge>
                    </div>
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
