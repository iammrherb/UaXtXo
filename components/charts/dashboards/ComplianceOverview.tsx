"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Shield, CheckCircle, AlertTriangle, FileText, Award, Lock, Eye, Users } from "lucide-react"

const complianceStandards = [
  {
    name: "SOC 2 Type II",
    portnox: 95,
    cisco: 88,
    aruba: 85,
    status: "Certified",
    description: "Security, availability, and confidentiality controls",
  },
  {
    name: "ISO 27001",
    portnox: 92,
    cisco: 85,
    aruba: 82,
    status: "Certified",
    description: "Information security management systems",
  },
  {
    name: "NIST Cybersecurity Framework",
    portnox: 94,
    cisco: 87,
    aruba: 84,
    status: "Compliant",
    description: "Comprehensive cybersecurity risk management",
  },
  {
    name: "HIPAA",
    portnox: 96,
    cisco: 89,
    aruba: 86,
    status: "Certified",
    description: "Healthcare data protection requirements",
  },
  {
    name: "PCI DSS",
    portnox: 93,
    cisco: 86,
    aruba: 83,
    status: "Certified",
    description: "Payment card industry data security",
  },
  {
    name: "GDPR",
    portnox: 97,
    cisco: 90,
    aruba: 87,
    status: "Compliant",
    description: "European data protection regulation",
  },
]

const zeroTrustPillars = [
  { pillar: "Identity", portnox: 95, cisco: 85, aruba: 82 },
  { pillar: "Device", portnox: 92, cisco: 88, aruba: 85 },
  { pillar: "Network", portnox: 94, cisco: 86, aruba: 83 },
  { pillar: "Application", portnox: 91, cisco: 82, aruba: 79 },
  { pillar: "Data", portnox: 96, cisco: 87, aruba: 84 },
  { pillar: "Visibility", portnox: 98, cisco: 89, aruba: 86 },
]

const industryCompliance = {
  healthcare: {
    requirements: ["HIPAA", "HITECH", "FDA 21 CFR Part 11"],
    portnoxScore: 96,
    challenges: ["Patient data protection", "Medical device security", "Audit trails"],
  },
  finance: {
    requirements: ["PCI DSS", "SOX", "FFIEC", "GLBA"],
    portnoxScore: 94,
    challenges: ["Transaction security", "Customer data protection", "Regulatory reporting"],
  },
  education: {
    requirements: ["FERPA", "COPPA", "State privacy laws"],
    portnoxScore: 93,
    challenges: ["Student data privacy", "Research data protection", "BYOD management"],
  },
  government: {
    requirements: ["FedRAMP", "FISMA", "NIST 800-53"],
    portnoxScore: 95,
    challenges: ["Classified data handling", "Continuous monitoring", "Zero trust architecture"],
  },
}

export function ComplianceOverview() {
  return (
    <div className="space-y-6">
      {/* Compliance Alert */}
      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Compliance Advantage:</strong> Portnox CLEAR maintains the highest compliance scores across all major
          standards, with automated reporting reducing audit preparation time by 75%.
        </AlertDescription>
      </Alert>

      {/* Compliance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">95%</div>
            <p className="text-xs text-muted-foreground">Average across standards</p>
            <Progress value={95} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">12</div>
            <p className="text-xs text-muted-foreground">Active certifications</p>
            <div className="flex gap-1 mt-2">
              <Badge variant="secondary" className="text-xs">
                SOC 2
              </Badge>
              <Badge variant="secondary" className="text-xs">
                ISO 27001
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audit Readiness</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <p className="text-xs text-muted-foreground">Continuous monitoring</p>
            <Progress value={100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Reduction</CardTitle>
            <Lock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">92%</div>
            <p className="text-xs text-muted-foreground">Breach risk reduction</p>
            <Progress value={92} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="standards" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="standards">Compliance Standards</TabsTrigger>
          <TabsTrigger value="zerotrust">Zero Trust</TabsTrigger>
          <TabsTrigger value="industry">Industry Specific</TabsTrigger>
          <TabsTrigger value="reporting">Automated Reporting</TabsTrigger>
        </TabsList>

        <TabsContent value="standards" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Standards Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Standards Comparison</CardTitle>
                <CardDescription>Vendor performance across major compliance frameworks</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={complianceStandards}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="portnox" fill="#10b981" name="Portnox CLEAR" />
                    <Bar dataKey="cisco" fill="#3b82f6" name="Cisco ISE" />
                    <Bar dataKey="aruba" fill="#f59e0b" name="Aruba ClearPass" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Compliance Details */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Standards Details</CardTitle>
                <CardDescription>Current certification status and scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceStandards.map((standard) => (
                    <div key={standard.name} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{standard.name}</h4>
                        <Badge
                          variant={standard.status === "Certified" ? "default" : "secondary"}
                          className={standard.status === "Certified" ? "bg-green-100 text-green-800" : ""}
                        >
                          {standard.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{standard.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Portnox Score:</span>
                        <Progress value={standard.portnox} className="flex-1" />
                        <span className="text-sm font-bold">{standard.portnox}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="zerotrust" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Zero Trust Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Zero Trust Architecture Assessment</CardTitle>
                <CardDescription>Comprehensive evaluation across six pillars</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={zeroTrustPillars}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="pillar" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Portnox CLEAR" dataKey="portnox" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Radar name="Cisco ISE" dataKey="cisco" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                    <Radar name="Aruba ClearPass" dataKey="aruba" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Zero Trust Pillar Details */}
            <Card>
              <CardHeader>
                <CardTitle>Zero Trust Pillar Analysis</CardTitle>
                <CardDescription>Detailed breakdown of security capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {zeroTrustPillars.map((pillar) => (
                    <div key={pillar.pillar} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{pillar.pillar}</span>
                        <span className="text-sm font-bold">{pillar.portnox}%</span>
                      </div>
                      <Progress value={pillar.portnox} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Cisco: {pillar.cisco}%</span>
                        <span>Aruba: {pillar.aruba}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="industry" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(industryCompliance).map(([industry, data]) => (
              <Card key={industry}>
                <CardHeader>
                  <CardTitle className="capitalize">{industry} Compliance</CardTitle>
                  <CardDescription>Industry-specific requirements and challenges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Portnox Compliance Score</h4>
                      <div className="flex items-center gap-2">
                        <Progress value={data.portnoxScore} className="flex-1" />
                        <span className="font-bold">{data.portnoxScore}%</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Key Requirements</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.requirements.map((req) => (
                          <Badge key={req} variant="outline">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Common Challenges</h4>
                      <ul className="text-sm space-y-1">
                        {data.challenges.map((challenge) => (
                          <li key={challenge} className="flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 text-amber-500" />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reporting" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Automated Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>SOC 2 Reports</span>
                    <Badge variant="secondary">Daily</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Compliance Dashboards</span>
                    <Badge variant="secondary">Real-time</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Audit Trails</span>
                    <Badge variant="secondary">Continuous</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Risk Assessments</span>
                    <Badge variant="secondary">Weekly</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Monitoring & Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Policy Violations</span>
                    <Badge variant="destructive">Immediate</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Compliance Drift</span>
                    <Badge variant="secondary">Real-time</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Certificate Expiry</span>
                    <Badge variant="secondary">30-day notice</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Audit Preparation</span>
                    <Badge variant="secondary">Automated</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Stakeholder Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Executive Dashboards</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Auditor Portals</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Compliance Team Access</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Custom Report Builder</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
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
