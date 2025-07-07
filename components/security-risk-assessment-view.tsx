"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts"
import { Shield, AlertTriangle, TrendingUp, TrendingDown, Eye, Zap } from "lucide-react"

interface SecurityRiskAssessmentViewProps {
  results: any[]
  config: any
}

export function SecurityRiskAssessmentView({ results, config }: SecurityRiskAssessmentViewProps) {
  // Security assessment data
  const securityPostureData = [
    { subject: "Identity & Access", A: 120, B: 110, fullMark: 150 },
    { subject: "Network Security", A: 98, B: 130, fullMark: 150 },
    { subject: "Device Management", A: 86, B: 130, fullMark: 150 },
    { subject: "Threat Detection", A: 99, B: 100, fullMark: 150 },
    { subject: "Incident Response", A: 85, B: 90, fullMark: 150 },
    { subject: "Compliance", A: 65, B: 85, fullMark: 150 },
  ]

  const threatLandscapeData = [
    { threat: "Ransomware", current: 85, withNAC: 15, reduction: 82 },
    { threat: "Insider Threats", current: 70, withNAC: 20, reduction: 71 },
    { threat: "Data Exfiltration", current: 65, withNAC: 12, reduction: 82 },
    { threat: "Lateral Movement", current: 80, withNAC: 8, reduction: 90 },
    { threat: "Privilege Escalation", current: 60, withNAC: 15, reduction: 75 },
    { threat: "Zero-Day Exploits", current: 45, withNAC: 25, reduction: 44 },
  ]

  const riskTimelineData = [
    { month: "Jan", withoutNAC: 85, withNAC: 25 },
    { month: "Feb", withoutNAC: 88, withNAC: 22 },
    { month: "Mar", withoutNAC: 92, withNAC: 20 },
    { month: "Apr", withoutNAC: 89, withNAC: 18 },
    { month: "May", withoutNAC: 94, withNAC: 15 },
    { month: "Jun", withoutNAC: 96, withNAC: 12 },
  ]

  const vulnerabilityCategories = [
    {
      category: "Network Access",
      description: "Unauthorized network access and lateral movement",
      currentRisk: "High",
      withNAC: "Low",
      impact: "Critical",
      likelihood: 85,
      mitigation: 90,
    },
    {
      category: "Device Security",
      description: "Unmanaged and compromised devices",
      currentRisk: "High",
      withNAC: "Low",
      impact: "High",
      likelihood: 75,
      mitigation: 85,
    },
    {
      category: "Identity Management",
      description: "Weak authentication and authorization",
      currentRisk: "Medium",
      withNAC: "Very Low",
      impact: "High",
      likelihood: 60,
      mitigation: 95,
    },
    {
      category: "Compliance Gaps",
      description: "Regulatory compliance violations",
      currentRisk: "Medium",
      withNAC: "Low",
      impact: "High",
      likelihood: 55,
      mitigation: 80,
    },
  ]

  const securityMetrics = [
    {
      metric: "Mean Time to Detection (MTTD)",
      current: "72 hours",
      withNAC: "15 minutes",
      improvement: "99.7%",
      icon: Eye,
    },
    {
      metric: "Mean Time to Response (MTTR)",
      current: "24 hours",
      withNAC: "5 minutes",
      improvement: "99.6%",
      icon: Zap,
    },
    {
      metric: "False Positive Rate",
      current: "35%",
      withNAC: "5%",
      improvement: "85.7%",
      icon: AlertTriangle,
    },
    {
      metric: "Security Coverage",
      current: "45%",
      withNAC: "95%",
      improvement: "111%",
      icon: Shield,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Security Risk Assessment</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis of current security posture and risk mitigation strategies
          </p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="destructive">High Risk</Badge>
          <Badge variant="outline">{config.deviceCount.toLocaleString()} Devices</Badge>
        </div>
      </div>

      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityMetrics.map((metric) => (
          <Card key={metric.metric}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{metric.improvement}</div>
              <p className="text-xs text-muted-foreground">improvement with NAC</p>
              <div className="flex justify-between text-xs mt-2">
                <span className="text-red-600">Current: {metric.current}</span>
                <span className="text-green-600">With NAC: {metric.withNAC}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="posture" className="space-y-4">
        <TabsList>
          <TabsTrigger value="posture">Security Posture</TabsTrigger>
          <TabsTrigger value="threats">Threat Analysis</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="timeline">Risk Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="posture" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Posture Radar</CardTitle>
                <CardDescription>Current vs. target security posture across key domains</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={securityPostureData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="Current" dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                    <Radar name="With NAC" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Score Breakdown</CardTitle>
                <CardDescription>Detailed scoring across security domains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityPostureData.map((domain) => (
                    <div key={domain.subject} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{domain.subject}</span>
                        <div className="flex space-x-2">
                          <Badge variant="destructive" className="text-xs">
                            {Math.round((domain.A / domain.fullMark) * 100)}%
                          </Badge>
                          <Badge variant="default" className="text-xs">
                            {Math.round((domain.B / domain.fullMark) * 100)}%
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Progress value={(domain.A / domain.fullMark) * 100} className="h-2 flex-1" />
                        <Progress value={(domain.B / domain.fullMark) * 100} className="h-2 flex-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Threat Mitigation Analysis</CardTitle>
                <CardDescription>Risk reduction by threat category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={threatLandscapeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="threat" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" fill="#ef4444" name="Current Risk" />
                    <Bar dataKey="withNAC" fill="#10b981" name="With NAC" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Threat Intelligence Summary</CardTitle>
                <CardDescription>Current threat landscape assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threatLandscapeData.map((threat) => (
                    <div key={threat.threat} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{threat.threat}</span>
                        <Badge variant={threat.reduction > 80 ? "default" : "secondary"}>
                          {threat.reduction}% Reduction
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Current Risk:</span>
                          <div className="font-medium text-red-600">{threat.current}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">With NAC:</span>
                          <div className="font-medium text-green-600">{threat.withNAC}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vulnerabilities" className="space-y-4">
          <div className="space-y-4">
            {vulnerabilityCategories.map((vuln) => (
              <Card key={vuln.category}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{vuln.category}</CardTitle>
                      <CardDescription>{vuln.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant={vuln.currentRisk === "High" ? "destructive" : "secondary"}>
                        Current: {vuln.currentRisk}
                      </Badge>
                      <Badge variant="default">With NAC: {vuln.withNAC}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Likelihood</span>
                        <span className="text-sm">{vuln.likelihood}%</span>
                      </div>
                      <Progress value={vuln.likelihood} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Impact</span>
                        <Badge variant={vuln.impact === "Critical" ? "destructive" : "secondary"}>{vuln.impact}</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Mitigation</span>
                        <span className="text-sm text-green-600">{vuln.mitigation}%</span>
                      </div>
                      <Progress value={vuln.mitigation} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Trend Analysis</CardTitle>
                <CardDescription>Risk levels over time with and without NAC implementation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={riskTimelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="withoutNAC" stroke="#ef4444" name="Without NAC" />
                    <Line type="monotone" dataKey="withNAC" stroke="#10b981" name="With NAC" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Projection</CardTitle>
                <CardDescription>12-month security risk forecast</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Critical Finding:</strong> Without NAC implementation, security risks are projected to
                      increase by 15% over the next 12 months due to expanding attack surface and evolving threats.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-red-500" />
                        <span className="font-medium text-red-800">Without NAC</span>
                      </div>
                      <div className="text-2xl font-bold text-red-600">96%</div>
                      <div className="text-sm text-red-600">Projected risk level</div>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingDown className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-green-800">With NAC</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">12%</div>
                      <div className="text-sm text-green-600">Projected risk level</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Key Risk Factors:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Increasing sophistication of cyber attacks</li>
                      <li>• Growing number of connected devices</li>
                      <li>• Remote work security challenges</li>
                      <li>• Regulatory compliance requirements</li>
                      <li>• Supply chain vulnerabilities</li>
                    </ul>
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

export default SecurityRiskAssessmentView
