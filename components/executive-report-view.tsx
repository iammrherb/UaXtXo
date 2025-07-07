"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Download,
  TrendingUp,
  Shield,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Target,
  Award,
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ExecutiveReportViewProps {
  analysisData: {
    totalSavings: number
    roi: number
    paybackPeriod: number
    riskReduction: number
    complianceScore: number
    implementationTime: number
    selectedVendor: string
    industry: string
    deviceCount: number
  }
}

// Executive summary data structure
const EXECUTIVE_INSIGHTS = {
  keyFindings: [
    {
      title: "Significant Cost Savings",
      value: "68% Lower TCO",
      description: "Portnox CLEAR delivers 68% lower total cost of ownership compared to traditional NAC solutions",
      impact: "HIGH",
      timeframe: "3-year analysis",
    },
    {
      title: "Rapid ROI Achievement",
      value: "12 Month Payback",
      description: "Investment pays for itself within 12 months through operational savings and risk reduction",
      impact: "HIGH",
      timeframe: "Year 1",
    },
    {
      title: "Enhanced Security Posture",
      value: "95% Zero Trust Score",
      description: "Industry-leading Zero Trust maturity with comprehensive visibility and control",
      impact: "CRITICAL",
      timeframe: "Immediate",
    },
    {
      title: "Simplified Operations",
      value: "90% Less Complexity",
      description: "Cloud-native architecture eliminates hardware dependencies and reduces operational overhead",
      impact: "MEDIUM",
      timeframe: "Ongoing",
    },
  ],
  riskMitigation: {
    breachPrevention: 92,
    complianceAutomation: 95,
    operationalResilience: 88,
    costAvoidance: 85,
  },
  competitiveAdvantage: [
    "First-to-market cloud-native NAC platform",
    "Agentless architecture reduces deployment complexity",
    "AI-powered risk scoring and behavioral analytics",
    "Comprehensive compliance automation",
    "Zero-downtime implementation",
  ],
}

// Industry-specific executive messaging
const INDUSTRY_MESSAGING = {
  HEALTHCARE: {
    primaryConcerns: ["Patient Safety", "HIPAA Compliance", "Medical Device Security"],
    businessImpact: "Protect patient data while ensuring clinical workflow continuity",
    regulatoryFocus: "HIPAA, HITECH, FDA guidelines",
    keyMetrics: ["Zero clinical disruption", "100% device visibility", "Automated compliance reporting"],
  },
  FINANCIAL: {
    primaryConcerns: ["Regulatory Compliance", "Fraud Prevention", "Trading Floor Performance"],
    businessImpact: "Maintain competitive advantage while meeting stringent regulatory requirements",
    regulatoryFocus: "PCI-DSS, SOX, GLBA, Basel III",
    keyMetrics: ["Sub-5ms latency", "99.99% uptime", "Real-time threat detection"],
  },
  MANUFACTURING: {
    primaryConcerns: ["Production Continuity", "IP Protection", "OT/IT Convergence"],
    businessImpact: "Secure industrial operations without disrupting production processes",
    regulatoryFocus: "ISO 27001, IEC 62443, NIST",
    keyMetrics: ["Zero production impact", "OT visibility", "Supply chain security"],
  },
  RETAIL: {
    primaryConcerns: ["POS Security", "Customer Data", "Multi-Site Management"],
    businessImpact: "Protect customer data across distributed retail operations",
    regulatoryFocus: "PCI-DSS, GDPR, CCPA",
    keyMetrics: ["POS isolation", "Guest WiFi security", "Centralized management"],
  },
  EDUCATION: {
    primaryConcerns: ["Student Privacy", "BYOD Management", "Budget Constraints"],
    businessImpact: "Enable secure learning environments within limited IT budgets",
    regulatoryFocus: "FERPA, COPPA, CIPA",
    keyMetrics: ["BYOD automation", "Student privacy", "Cost efficiency"],
  },
  GOVERNMENT: {
    primaryConcerns: ["National Security", "Classified Data", "Compliance"],
    businessImpact: "Protect sensitive government data and critical infrastructure",
    regulatoryFocus: "NIST 800-53, FedRAMP, FISMA",
    keyMetrics: ["Security clearance integration", "Air-gap support", "Continuous monitoring"],
  },
}

export default function ExecutiveReportView({ analysisData }: ExecutiveReportViewProps) {
  const [activeSection, setActiveSection] = useState("summary")
  const [exportFormat, setExportFormat] = useState<"pdf" | "pptx" | "docx">("pdf")

  const industryContext =
    INDUSTRY_MESSAGING[analysisData.industry as keyof typeof INDUSTRY_MESSAGING] || INDUSTRY_MESSAGING.HEALTHCARE

  // Calculate executive metrics
  const executiveMetrics = useMemo(() => {
    const annualSavings = analysisData.totalSavings / 3 // 3-year to annual
    const riskValue = analysisData.deviceCount * 2500 * (analysisData.riskReduction / 100) // Risk value calculation
    const productivityGains = analysisData.deviceCount * 150 // Productivity per device
    const complianceSavings = 125000 * (analysisData.complianceScore / 100)

    return {
      annualSavings,
      riskValue,
      productivityGains,
      complianceSavings,
      totalBusinessValue: annualSavings + riskValue + productivityGains + complianceSavings,
    }
  }, [analysisData])

  // ROI projection data
  const roiProjection = [
    { year: "Year 0", investment: -200000, savings: 0, cumulative: -200000 },
    { year: "Year 1", investment: -50000, savings: 180000, cumulative: -70000 },
    { year: "Year 2", investment: -50000, savings: 220000, cumulative: 100000 },
    { year: "Year 3", investment: -50000, savings: 250000, cumulative: 300000 },
    { year: "Year 4", investment: -50000, savings: 280000, cumulative: 530000 },
    { year: "Year 5", investment: -50000, savings: 300000, cumulative: 780000 },
  ]

  const handleExport = (format: "pdf" | "pptx" | "docx") => {
    // Export functionality would be implemented here
    console.log(`Exporting executive report as ${format}`)
  }

  return (
    <div className="space-y-6">
      {/* Executive Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Executive Summary</h1>
            <p className="text-blue-100">
              Network Access Control Strategic Analysis for {industryContext.businessImpact}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => handleExport("pdf")}>
              <FileText className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="secondary" onClick={() => handleExport("pptx")}>
              <Download className="mr-2 h-4 w-4" />
              Export PPT
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Savings</p>
                <p className="text-2xl font-bold text-green-700">
                  ${(analysisData.totalSavings / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">ROI</p>
                <p className="text-2xl font-bold text-blue-700">{analysisData.roi}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Payback Period</p>
                <p className="text-2xl font-bold text-purple-700">{analysisData.paybackPeriod} mo</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Risk Reduction</p>
                <p className="text-2xl font-bold text-orange-700">{analysisData.riskReduction}%</p>
              </div>
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="summary">Executive Summary</TabsTrigger>
          <TabsTrigger value="financial">Financial Impact</TabsTrigger>
          <TabsTrigger value="strategic">Strategic Benefits</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        {/* Executive Summary Tab */}
        <TabsContent value="summary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Key Findings & Recommendations
              </CardTitle>
              <CardDescription>Critical insights for executive decision-making</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {EXECUTIVE_INSIGHTS.keyFindings.map((finding, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <Badge
                        variant={
                          finding.impact === "CRITICAL"
                            ? "destructive"
                            : finding.impact === "HIGH"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {finding.impact}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{finding.title}</h4>
                      <p className="text-2xl font-bold text-green-600 mb-2">{finding.value}</p>
                      <p className="text-sm text-muted-foreground mb-1">{finding.description}</p>
                      <p className="text-xs text-blue-600">{finding.timeframe}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Industry-Specific Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Primary Concerns Addressed:</h4>
                    <div className="flex flex-wrap gap-2">
                      {industryContext.primaryConcerns.map((concern, index) => (
                        <Badge key={index} variant="outline">
                          {concern}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Key Metrics:</h4>
                    <ul className="space-y-1">
                      {industryContext.keyMetrics.map((metric, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Mitigation Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(EXECUTIVE_INSIGHTS.riskMitigation).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <span className="text-sm font-bold">{value}%</span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Impact Tab */}
        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>5-Year Financial Projection</CardTitle>
              <CardDescription>Cumulative ROI and cash flow analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={roiProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                  <Area type="monotone" dataKey="cumulative" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="savings" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Annual Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    ${(executiveMetrics.annualSavings / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-muted-foreground">Per year operational savings</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risk Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    ${(executiveMetrics.riskValue / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-sm text-muted-foreground">Annual risk mitigation value</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Business Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">
                    ${(executiveMetrics.totalBusinessValue / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-sm text-muted-foreground">Combined annual value</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Strategic Benefits Tab */}
        <TabsContent value="strategic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Advantages</CardTitle>
              <CardDescription>Strategic differentiators and market positioning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {EXECUTIVE_INSIGHTS.competitiveAdvantage.map((advantage, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm">{advantage}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Operational Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Deployment Complexity</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      90% Reduction
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Maintenance Overhead</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      85% Reduction
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Time to Value</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      7 Days
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Scalability</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Unlimited
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance & Governance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Regulatory Frameworks</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      95%+ Coverage
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Audit Readiness</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Continuous
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reporting Automation</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      100%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Policy Enforcement</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Real-time
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Implementation Tab */}
        <TabsContent value="implementation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Roadmap</CardTitle>
              <CardDescription>Phased approach to deployment and value realization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <h4 className="font-semibold">Phase 1: Foundation</h4>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Cloud platform setup</li>
                      <li>• Initial device discovery</li>
                      <li>• Basic policy deployment</li>
                      <li>• Staff training</li>
                    </ul>
                    <div className="mt-3 text-xs text-blue-600">Timeline: 1-2 weeks</div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <h4 className="font-semibold">Phase 2: Expansion</h4>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Advanced policy rules</li>
                      <li>• Integration deployment</li>
                      <li>• Compliance automation</li>
                      <li>• Risk scoring activation</li>
                    </ul>
                    <div className="mt-3 text-xs text-green-600">Timeline: 2-4 weeks</div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <h4 className="font-semibold">Phase 3: Optimization</h4>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• AI/ML model tuning</li>
                      <li>• Advanced analytics</li>
                      <li>• Custom integrations</li>
                      <li>• Full automation</li>
                    </ul>
                    <div className="mt-3 text-xs text-purple-600">Timeline: 4-6 weeks</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Success Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Executive sponsorship secured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Dedicated project team assigned</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Clear success metrics defined</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Stakeholder communication plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Change management strategy</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Mitigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium">Technical Risk</span>
                      <p className="text-xs text-muted-foreground">Mitigated by cloud-native architecture</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium">Operational Risk</span>
                      <p className="text-xs text-muted-foreground">Reduced through phased deployment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium">Budget Risk</span>
                      <p className="text-xs text-muted-foreground">Controlled with predictable OpEx model</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium">Timeline Risk</span>
                      <p className="text-xs text-muted-foreground">Minimized with rapid deployment</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <Alert className="bg-green-50 border-green-200">
            <Target className="h-4 w-4" />
            <AlertDescription>
              <strong>Primary Recommendation:</strong> Proceed with Portnox CLEAR implementation to achieve immediate
              security improvements, significant cost savings, and regulatory compliance automation.
            </AlertDescription>
          </Alert>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Immediate Actions (Next 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span className="text-sm">Secure executive approval and budget allocation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span className="text-sm">Initiate Portnox CLEAR proof of concept</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span className="text-sm">Establish project governance and team structure</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <span className="text-sm">Begin stakeholder communication and change management</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Strategic Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 text-green-600">Opportunities</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Market-leading Zero Trust implementation</li>
                      <li>• Significant competitive advantage</li>
                      <li>• Enhanced regulatory posture</li>
                      <li>• Operational efficiency gains</li>
                      <li>• Future-proof architecture</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-orange-600">Risks of Inaction</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Continued security vulnerabilities</li>
                      <li>• Increasing operational costs</li>
                      <li>• Compliance gaps and potential fines</li>
                      <li>• Competitive disadvantage</li>
                      <li>• Technical debt accumulation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Executive Decision Framework</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      ${(analysisData.totalSavings / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-blue-700">3-Year Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{analysisData.paybackPeriod} mo</div>
                    <div className="text-sm text-blue-700">Payback Period</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{analysisData.riskReduction}%</div>
                    <div className="text-sm text-blue-700">Risk Reduction</div>
                  </div>
                </div>
                <Separator className="my-4" />
                <p className="text-sm text-center text-blue-700">
                  <strong>Recommendation:</strong> The financial and strategic benefits clearly support immediate
                  implementation of Portnox CLEAR as the organization's NAC solution.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Export the report generator component
export function ExecutiveReportGenerator({ analysisData }: ExecutiveReportViewProps) {
  return <ExecutiveReportView analysisData={analysisData} />
}
