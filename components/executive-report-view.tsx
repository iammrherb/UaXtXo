"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
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
  Legend,
} from "recharts"
import { Download, TrendingUp, Shield, CheckCircle2, Target, Zap } from "lucide-react"

interface ExecutiveReportViewProps {
  results?: any[]
  config?: any
}

// Mock data for executive report
const EXECUTIVE_SUMMARY_DATA = {
  recommendation: "Portnox CLEAR",
  paybackPeriod: 0.3,
  totalROI: 485,
  riskReduction: 85,
  complianceImprovement: 92,
  operationalEfficiency: 78,
  keyFindings: [
    "Fastest payback in healthcare industry at 0.3 months",
    "85% reduction in security breach risk",
    "92% improvement in compliance automation",
    "78% increase in operational efficiency",
    "$4.9M annual risk mitigation value",
  ],
  industryComparison: {
    yourOrganization: 95,
    industryAverage: 68,
    topPerformers: 88,
  },
  implementationTimeline: [
    { phase: "Planning", duration: 2, status: "ready" },
    { phase: "Deployment", duration: 5, status: "ready" },
    { phase: "Integration", duration: 3, status: "ready" },
    { phase: "Optimization", duration: 2, status: "ready" },
  ],
  riskMitigation: [
    { category: "Data Breach", current: 28, withNAC: 4, reduction: 86 },
    { category: "Compliance Violation", current: 35, withNAC: 8, reduction: 77 },
    { category: "Operational Downtime", current: 15, withNAC: 3, reduction: 80 },
    { category: "Insider Threats", current: 22, withNAC: 6, reduction: 73 },
  ],
  costBreakdown: [
    { category: "Licensing", amount: 120000, percentage: 52 },
    { category: "Implementation", amount: 25000, percentage: 11 },
    { category: "Training", amount: 15000, percentage: 6 },
    { category: "Support", amount: 35000, percentage: 15 },
    { category: "Infrastructure", amount: 35000, percentage: 15 },
  ],
  benefitsBreakdown: [
    { category: "Breach Cost Avoidance", amount: 4900000, percentage: 68 },
    { category: "Operational Savings", amount: 850000, percentage: 12 },
    { category: "Compliance Savings", amount: 650000, percentage: 9 },
    { category: "Productivity Gains", amount: 800000, percentage: 11 },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export const ExecutiveReportGenerator = ExecutiveReportView

export default function ExecutiveReportView({ results = [], config = {} }: ExecutiveReportViewProps) {
  const [selectedSection, setSelectedSection] = useState<string>("summary")
  const [exportFormat, setExportFormat] = useState<"pdf" | "pptx" | "docx">("pdf")

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${Math.round(value).toLocaleString()}`
  }

  const handleExport = () => {
    // Mock export functionality
    console.log(`Exporting executive report as ${exportFormat}`)
    // In a real implementation, this would generate and download the file
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Executive Report</h2>
          <p className="text-muted-foreground">Comprehensive NAC investment analysis and recommendations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={selectedSection} onValueChange={setSelectedSection} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="summary">Executive Summary</TabsTrigger>
          <TabsTrigger value="financial">Financial Analysis</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="appendix">Appendix</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          {/* Executive Summary Header */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50">
            <CardHeader>
              <CardTitle className="text-2xl">Executive Summary</CardTitle>
              <CardDescription className="text-lg">
                Strategic NAC Investment Recommendation for Healthcare Organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{EXECUTIVE_SUMMARY_DATA.paybackPeriod} mo</div>
                  <div className="text-sm text-muted-foreground">Payback Period</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{EXECUTIVE_SUMMARY_DATA.totalROI}%</div>
                  <div className="text-sm text-muted-foreground">3-Year ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{EXECUTIVE_SUMMARY_DATA.riskReduction}%</div>
                  <div className="text-sm text-muted-foreground">Risk Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {EXECUTIVE_SUMMARY_DATA.complianceImprovement}%
                  </div>
                  <div className="text-sm text-muted-foreground">Compliance Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Recommendation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Strategic Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription className="text-lg">
                  <strong>Recommended Solution:</strong> Implement {EXECUTIVE_SUMMARY_DATA.recommendation} immediately
                  to achieve fastest ROI and maximum risk reduction in the healthcare industry.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Key Business Drivers</h4>
                  <ul className="space-y-2">
                    {EXECUTIVE_SUMMARY_DATA.keyFindings.map((finding, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Industry Position</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Your Organization (Projected)</span>
                        <span className="font-medium">
                          {EXECUTIVE_SUMMARY_DATA.industryComparison.yourOrganization}%
                        </span>
                      </div>
                      <Progress value={EXECUTIVE_SUMMARY_DATA.industryComparison.yourOrganization} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Top Performers</span>
                        <span className="font-medium">{EXECUTIVE_SUMMARY_DATA.industryComparison.topPerformers}%</span>
                      </div>
                      <Progress value={EXECUTIVE_SUMMARY_DATA.industryComparison.topPerformers} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Industry Average</span>
                        <span className="font-medium">
                          {EXECUTIVE_SUMMARY_DATA.industryComparison.industryAverage}%
                        </span>
                      </div>
                      <Progress value={EXECUTIVE_SUMMARY_DATA.industryComparison.industryAverage} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Wins */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Immediate Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Device visibility within 24 hours</li>
                  <li>• Policy enforcement in 48 hours</li>
                  <li>• Compliance reporting in 1 week</li>
                  <li>• Full ROI realization in 0.3 months</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  Risk Mitigation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• 85% reduction in breach probability</li>
                  <li>• $4.9M annual risk value protection</li>
                  <li>• HIPAA compliance automation</li>
                  <li>• Real-time threat detection</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  Operational Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• 78% efficiency improvement</li>
                  <li>• 60% reduction in admin overhead</li>
                  <li>• Automated guest access</li>
                  <li>• Simplified device onboarding</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Breakdown</CardTitle>
                <CardDescription>3-year total cost of ownership</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={EXECUTIVE_SUMMARY_DATA.costBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {EXECUTIVE_SUMMARY_DATA.costBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefits Realization</CardTitle>
                <CardDescription>Annual value creation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={EXECUTIVE_SUMMARY_DATA.benefitsBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {EXECUTIVE_SUMMARY_DATA.benefitsBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* ROI Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>ROI Timeline</CardTitle>
              <CardDescription>Cumulative return on investment over 3 years</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[
                    { month: 0, investment: -230000, benefits: 0, cumulative: -230000 },
                    { month: 1, investment: -230000, benefits: 720000, cumulative: 490000 },
                    { month: 6, investment: -250000, benefits: 4320000, cumulative: 4070000 },
                    { month: 12, investment: -280000, benefits: 8640000, cumulative: 8360000 },
                    { month: 24, investment: -320000, benefits: 17280000, cumulative: 16960000 },
                    { month: 36, investment: -360000, benefits: 25920000, cumulative: 25560000 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" label={{ value: "Months", position: "insideBottom", offset: -10 }} />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line type="monotone" dataKey="cumulative" stroke="#8884d8" strokeWidth={3} name="Cumulative ROI" />
                  <Line type="monotone" dataKey="benefits" stroke="#82ca9d" strokeWidth={2} name="Benefits" />
                  <Line type="monotone" dataKey="investment" stroke="#ff7c7c" strokeWidth={2} name="Investment" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Financial Summary Table */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-xl font-bold text-red-600">$230K</div>
                  <div className="text-sm text-muted-foreground">Initial Investment</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-xl font-bold text-green-600">$7.2M</div>
                  <div className="text-sm text-muted-foreground">Annual Benefits</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-xl font-bold text-blue-600">$25.6M</div>
                  <div className="text-sm text-muted-foreground">3-Year Net Value</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-xl font-bold text-purple-600">11,130%</div>
                  <div className="text-sm text-muted-foreground">3-Year ROI</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          {/* Risk Mitigation Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Mitigation Analysis</CardTitle>
              <CardDescription>Current vs. projected risk levels with NAC implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={EXECUTIVE_SUMMARY_DATA.riskMitigation}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis label={{ value: "Risk Level (%)", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" fill="#ff7c7c" name="Current Risk" />
                  <Bar dataKey="withNAC" fill="#82ca9d" name="With NAC" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Risk Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXECUTIVE_SUMMARY_DATA.riskMitigation.map((risk, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{risk.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Current Risk Level</span>
                        <span className="font-medium text-red-600">{risk.current}%</span>
                      </div>
                      <Progress value={risk.current} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>With NAC Implementation</span>
                        <span className="font-medium text-green-600">{risk.withNAC}%</span>
                      </div>
                      <Progress value={risk.withNAC} className="h-2" />
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{risk.reduction}%</div>
                      <div className="text-sm text-muted-foreground">Risk Reduction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Compliance Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Impact</CardTitle>
              <CardDescription>HIPAA compliance improvement with automated controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">65%</div>
                  <div className="text-sm text-muted-foreground mb-2">Current Compliance Score</div>
                  <Badge variant="destructive">Non-Compliant</Badge>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-2xl">→</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">92%</div>
                  <div className="text-sm text-muted-foreground mb-2">With NAC Implementation</div>
                  <Badge variant="default" className="bg-green-600">
                    Fully Compliant
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-6">
          {/* Implementation Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Timeline</CardTitle>
              <CardDescription>12-week deployment plan with key milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {EXECUTIVE_SUMMARY_DATA.implementationTimeline.map((phase, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{phase.phase}</h4>
                      <p className="text-sm text-muted-foreground">{phase.duration} weeks</p>
                    </div>
                    <Badge variant={phase.status === "ready" ? "default" : "secondary"}>{phase.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resource Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Project Manager</span>
                    <Badge variant="outline">1 FTE</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Network Engineer</span>
                    <Badge variant="outline">0.5 FTE</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Security Analyst</span>
                    <Badge variant="outline">0.5 FTE</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Portnox Professional Services</span>
                    <Badge variant="outline">Included</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Device Visibility</span>
                    <Badge variant="default">100%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Policy Compliance</span>
                    <Badge variant="default">95%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Incident Reduction</span>
                    <Badge variant="default">85%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>User Satisfaction</span>
                    <Badge variant="default">90%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Executive Approval</h4>
                    <p className="text-sm text-muted-foreground">
                      Secure executive sponsorship and budget approval for NAC implementation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Vendor Selection</h4>
                    <p className="text-sm text-muted-foreground">
                      Finalize contract negotiations with Portnox and establish implementation timeline
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Project Kickoff</h4>
                    <p className="text-sm text-muted-foreground">
                      Assemble project team and initiate planning phase with Portnox professional services
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appendix" className="space-y-6">
          {/* Methodology */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Methodology</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Data Sources</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Industry breach cost reports (IBM, Ponemon Institute)</li>
                    <li>• Healthcare compliance requirements (HIPAA, HITECH)</li>
                    <li>• Vendor pricing and capability assessments</li>
                    <li>• Internal operational cost analysis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Assumptions</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• 2,500 devices in scope for NAC implementation</li>
                    <li>• Current breach probability: 28% annually</li>
                    <li>• Average healthcare breach cost: $10.9M</li>
                    <li>• Implementation timeline: 12 weeks</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Comparison Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Vendor Evaluation Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Vendor</th>
                      <th className="text-left p-2">Payback (Months)</th>
                      <th className="text-left p-2">3-Year TCO</th>
                      <th className="text-left p-2">Risk Reduction</th>
                      <th className="text-left p-2">Complexity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-green-50">
                      <td className="p-2 font-medium">Portnox CLEAR</td>
                      <td className="p-2">0.3</td>
                      <td className="p-2">$230K</td>
                      <td className="p-2">85%</td>
                      <td className="p-2">Low</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Cisco ISE</td>
                      <td className="p-2">8.5</td>
                      <td className="p-2">$850K</td>
                      <td className="p-2">78%</td>
                      <td className="p-2">Very High</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Aruba ClearPass</td>
                      <td className="p-2">6.2</td>
                      <td className="p-2">$620K</td>
                      <td className="p-2">75%</td>
                      <td className="p-2">High</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Project Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Internal Team</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <div className="font-medium">John Smith</div>
                      <div className="text-muted-foreground">CISO</div>
                      <div className="text-muted-foreground">john.smith@company.com</div>
                    </div>
                    <div>
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="text-muted-foreground">IT Director</div>
                      <div className="text-muted-foreground">sarah.johnson@company.com</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Portnox Team</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <div className="font-medium">Michael Chen</div>
                      <div className="text-muted-foreground">Solutions Engineer</div>
                      <div className="text-muted-foreground">michael.chen@portnox.com</div>
                    </div>
                    <div>
                      <div className="font-medium">Lisa Rodriguez</div>
                      <div className="text-muted-foreground">Customer Success Manager</div>
                      <div className="text-muted-foreground">lisa.rodriguez@portnox.com</div>
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
