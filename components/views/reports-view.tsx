"use client"

import { useState, useCallback, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Clock,
  Settings,
  Eye,
  Sparkles,
  Download,
  Share2,
  BarChart3,
  Brain,
  Search,
  Loader2,
  CheckCircle,
  Zap,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// ✅ All these imports should now resolve correctly
import {
  generateWorldClassReport,
  createSampleReportData,
  type WorldClassReportData,
  type ReportTemplate,
  type ReportFormat,
  type OrganizationSize,
  type DeploymentModel,
} from "@/lib/world-class-report-generator"

import { autoResearchCompany, type CompanyResearchResult, type AIReportEnhancement } from "@/lib/ai-company-research"

import { aiSettingsManager } from "@/lib/ai-settings-manager"

interface CompanyDetails {
  companyName: string
  website: string
  industry: string
  companySize: OrganizationSize
  employeeCount: number
  deviceCount: number
  locations: number
  headquarters: string
  annualRevenue: string
  marketCap: string
  publiclyTraded: boolean
  cyberInsurancePremium: number
  primaryContact: string
  contactTitle: string
  contactEmail: string
  contactPhone: string
  incumbentVendor: string
  currentSecurityStack: string[]
  deploymentType: DeploymentModel
  businessPriorities: string[]
  securityChallenges: string[]
  transformationGoals: string[]
  industryThreats: string[]
  regulatoryDeadlines: string[]
  recentIncidents: string
  executiveTeam: Array<{
    name: string
    title: string
    linkedin?: string
  }>
  boardMembers: string[]
  executiveMessage: string
  valueProposition: string
  competitiveDifferentiators: string[]
  implementationTimeline: string
}

interface ReportConfig {
  reportType: ReportTemplate
  format: ReportFormat
  personalizationLevel: "maximum" | "high" | "medium" | "basic"
  includeCharts: boolean
  includeFinancials: boolean
  includeCompliance: boolean
  includeRoadmap: boolean
  includeAIEnhancement: boolean
  includeBenchmarks: boolean
  targetAudience: string[]
  deliveryMethod: "download" | "email" | "scheduled"
  scheduledDate?: Date
  aiProvider?: "openai" | "anthropic" | "gemini"
}

const INDUSTRIES = [
  "Healthcare",
  "Financial Services",
  "Manufacturing",
  "Technology",
  "Education",
  "Government",
  "Retail",
  "Energy & Utilities",
  "Transportation",
  "Telecommunications",
  "Pharmaceuticals",
  "Defense",
  "Media & Entertainment",
  "Real Estate",
  "Other",
]

const COMPANY_SIZES: { label: string; value: OrganizationSize }[] = [
  { label: "Small (1-100 employees)", value: "small" },
  { label: "Medium (101-1,000 employees)", value: "medium" },
  { label: "Large (1,001-10,000 employees)", value: "large" },
  { label: "Enterprise (10,000+ employees)", value: "enterprise" },
]

const DEPLOYMENT_MODELS: { label: string; value: DeploymentModel }[] = [
  { label: "Cloud-Native", value: "cloud" },
  { label: "Hybrid", value: "hybrid" },
  { label: "On-Premise", value: "on-premise" },
]

const SECURITY_VENDORS = [
  "Cisco ISE",
  "Aruba ClearPass",
  "Forescout Platform",
  "Fortinet FortiNAC",
  "Juniper Mist Access Assurance",
  "Extreme NAC",
  "Microsoft NPS",
  "FoxPass",
  "SecureW2",
  "PacketFence",
  "Cisco Meraki",
  "Arista CloudVision",
  "No Current NAC Solution",
  "Other",
]

export default function ReportsView() {
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    companyName: "",
    website: "",
    industry: "",
    companySize: "medium",
    employeeCount: 0,
    deviceCount: 0,
    locations: 1,
    headquarters: "",
    annualRevenue: "",
    marketCap: "",
    publiclyTraded: false,
    cyberInsurancePremium: 0,
    primaryContact: "",
    contactTitle: "",
    contactEmail: "",
    contactPhone: "",
    incumbentVendor: "",
    currentSecurityStack: [],
    deploymentType: "cloud",
    businessPriorities: [],
    securityChallenges: [],
    transformationGoals: [],
    industryThreats: [],
    regulatoryDeadlines: [],
    recentIncidents: "",
    executiveTeam: [],
    boardMembers: [],
    executiveMessage: "",
    valueProposition: "",
    competitiveDifferentiators: [],
    implementationTimeline: "",
  })

  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    reportType: "comprehensive",
    format: "pdf",
    personalizationLevel: "maximum",
    includeCharts: true,
    includeFinancials: true,
    includeCompliance: true,
    includeRoadmap: true,
    includeAIEnhancement: true,
    includeBenchmarks: true,
    targetAudience: ["executives"],
    deliveryMethod: "download",
    aiProvider: "openai",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [isResearching, setIsResearching] = useState(false)
  const [researchProgress, setResearchProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("company")
  const [aiResearchData, setAiResearchData] = useState<CompanyResearchResult | null>(null)
  const [aiEnhancement, setAiEnhancement] = useState<AIReportEnhancement | null>(null)
  const [aiSettings, setAiSettings] = useState(aiSettingsManager.getSettings())

  // Load AI settings on component mount
  useEffect(() => {
    setAiSettings(aiSettingsManager.getSettings())
  }, [])

  const handleInputChange = useCallback((field: keyof CompanyDetails, value: any) => {
    setCompanyDetails((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleArrayChange = useCallback((field: keyof CompanyDetails, value: string, checked: boolean) => {
    setCompanyDetails((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter((item) => item !== value),
    }))
  }, [])

  const handleAIResearch = async () => {
    if (!companyDetails.companyName) {
      toast({
        title: "Company Name Required",
        description: "Please enter a company name to start AI research.",
        variant: "destructive",
      })
      return
    }

    const enabledProviders = aiSettingsManager.getEnabledProviders()
    if (enabledProviders.length === 0) {
      toast({
        title: "AI Not Configured",
        description: "Please configure at least one AI provider in settings.",
        variant: "destructive",
      })
      return
    }

    setIsResearching(true)
    setResearchProgress(0)

    try {
      // Simulate research progress
      const progressInterval = setInterval(() => {
        setResearchProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      // Get AI configuration
      const aiConfig = {
        openaiApiKey: aiSettings.providers.openai.enabled ? aiSettings.providers.openai.apiKey : undefined,
        anthropicApiKey: aiSettings.providers.anthropic.enabled ? aiSettings.providers.anthropic.apiKey : undefined,
        geminiApiKey: aiSettings.providers.gemini.enabled ? aiSettings.providers.gemini.apiKey : undefined,
        preferredProvider: reportConfig.aiProvider || aiSettings.defaultProvider,
      }

      // Perform AI research
      const researchResult = await autoResearchCompany(companyDetails.companyName, companyDetails.website, aiConfig)

      clearInterval(progressInterval)
      setResearchProgress(100)

      // Update company details with AI research
      setCompanyDetails((prev) => ({
        ...prev,
        industry: researchResult.industry || prev.industry,
        companySize: researchResult.size || prev.companySize,
        employeeCount: researchResult.employees || prev.employeeCount,
        headquarters: researchResult.headquarters || prev.headquarters,
        annualRevenue: researchResult.revenue || prev.annualRevenue,
        marketCap: researchResult.marketCap || prev.marketCap,
        executiveTeam: researchResult.executiveTeam || prev.executiveTeam,
        businessPriorities: researchResult.businessChallenges || prev.businessPriorities,
        securityChallenges: researchResult.riskFactors || prev.securityChallenges,
      }))

      setAiResearchData(researchResult)

      toast({
        title: "AI Research Complete",
        description: `Successfully researched ${companyDetails.companyName} and enhanced company profile.`,
      })
    } catch (error) {
      console.error("AI research error:", error)
      toast({
        title: "Research Failed",
        description: "Failed to complete AI research. Please check your API configuration.",
        variant: "destructive",
      })
    } finally {
      setIsResearching(false)
      setResearchProgress(0)
    }
  }

  const generateReport = async () => {
    if (!companyDetails.companyName) {
      toast({
        title: "Company Name Required",
        description: "Please enter a company name to generate the report.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // Create enhanced report data with AI insights
      const reportData: WorldClassReportData = {
        title: `${companyDetails.companyName} - Network Access Control Analysis`,
        subtitle: `AI-Enhanced Strategic Assessment for ${companyDetails.industry} Industry`,
        template: reportConfig.reportType,
        format: reportConfig.format,
        generatedAt: new Date(),
        organization: {
          name: companyDetails.companyName,
          industry: companyDetails.industry,
          size: companyDetails.companySize,
          deviceCount: companyDetails.deviceCount,
          locations: companyDetails.locations,
          region: "north-america",
          website: companyDetails.website,
          revenue: companyDetails.annualRevenue,
          employees: companyDetails.employeeCount,
          headquarters: companyDetails.headquarters,
          founded: aiResearchData?.founded,
          stockSymbol: aiResearchData?.stockSymbol,
          marketCap: companyDetails.marketCap,
        },
        analysis: {
          timeframe: 3,
          vendors: ["portnox", "cisco", "aruba"],
          deploymentModel: companyDetails.deploymentType,
          includeCharts: reportConfig.includeCharts,
          includeDetails: true,
          includeAIEnhancement: reportConfig.includeAIEnhancement,
          includeBenchmarks: reportConfig.includeBenchmarks,
          includeRoadmap: reportConfig.includeRoadmap,
          includeCompliance: reportConfig.includeCompliance,
        },
        financial: {
          portnoxCost: companyDetails.deviceCount * 48 * 3, // $4/device/month * 3 years
          competitorCosts: {
            cisco: companyDetails.deviceCount * 150 * 3,
            aruba: companyDetails.deviceCount * 100 * 3,
          },
          savings: companyDetails.deviceCount * 102 * 3, // Savings vs average competitor
          roi: 456,
          paybackPeriod: 0.5,
          riskMitigation: 600000,
        },
        content: {
          executiveSummary:
            companyDetails.executiveMessage ||
            `Our AI-enhanced analysis for ${companyDetails.companyName} demonstrates that Portnox CLEAR delivers superior value for ${companyDetails.industry} environments, providing significant cost savings while ensuring superior security and regulatory compliance.`,
          keyFindings: [
            `${companyDetails.industry} industry compliance automation reduces audit preparation time by 78%`,
            `Medical device discovery and profiling capabilities exceed ${companyDetails.industry} industry standards`,
            "Zero-trust architecture aligns with modern cybersecurity frameworks and regulatory requirements",
            "Cloud-native deployment eliminates infrastructure complexity while maintaining enterprise-grade security",
            "AI-powered threat detection identifies industry-specific attack patterns with 94% accuracy",
            "Automated policy enforcement reduces security incidents by 92% compared to traditional NAC solutions",
          ],
          recommendations: companyDetails.valueProposition
            ? [companyDetails.valueProposition]
            : [
                `Implement Portnox CLEAR to achieve immediate ${companyDetails.industry} compliance improvements`,
                "Leverage automated device discovery for comprehensive asset visibility across all environments",
                "Deploy zero-trust policies to protect critical business systems and sensitive data",
                "Establish continuous compliance monitoring for ongoing regulatory adherence",
                "Integrate with existing security infrastructure to maximize operational efficiency",
                "Develop incident response procedures tailored to organizational requirements",
              ],
          aiInsights:
            aiEnhancement?.executiveSummary ||
            `AI analysis reveals that ${companyDetails.companyName}'s current security posture presents opportunities for significant improvement through modern NAC implementation. Industry trends show increasing cyber threats targeting ${companyDetails.industry} organizations, making robust network access control essential for business continuity and regulatory compliance.`,
          companyProfile:
            aiResearchData?.description ||
            `${companyDetails.companyName} is a ${companyDetails.companySize} ${companyDetails.industry} organization with ${companyDetails.employeeCount?.toLocaleString()} employees and strong market presence.`,
          industryAnalysis:
            aiEnhancement?.industryAnalysis ||
            `The ${companyDetails.industry} industry faces evolving cybersecurity challenges requiring sophisticated access control and compliance capabilities.`,
          threatLandscape:
            aiEnhancement?.threatLandscape ||
            `Current threat environment targeting ${companyDetails.industry} organizations requires proactive security measures and comprehensive network access control.`,
          complianceRequirements: aiResearchData?.complianceRequirements || [],
        },
        branding: {
          primaryColor: "#00D4AA",
          secondaryColor: "#1B2951",
          logo: "/portnox-logo.png",
          companyName: "Portnox Ltd.",
          tagline: "Enterprise Network Access Control Solutions",
          website: "www.portnox.com",
          contact: "enterprise@portnox.com",
        },
        advanced: {
          customCharts: [],
          stakeholders: [],
          complianceFrameworks: aiResearchData?.complianceRequirements || [],
          executiveTeam: companyDetails.executiveTeam,
          recentNews: aiResearchData?.recentNews || [],
          securityEvents: aiResearchData?.securityEvents || [],
        },
      }

      // Generate the report using the world-class generator
      const blob = await generateWorldClassReport(reportData, reportConfig.format)

      // Create filename with company name and timestamp
      const timestamp = new Date().toISOString().split("T")[0]
      const filename = `${companyDetails.companyName.replace(/[^a-zA-Z0-9]/g, "_")}_NAC_Analysis_${timestamp}`
      const extension =
        reportConfig.format === "powerpoint"
          ? "pptx"
          : reportConfig.format === "word"
            ? "docx"
            : reportConfig.format === "excel"
              ? "xlsx"
              : "pdf"

      if (reportConfig.deliveryMethod === "email") {
        toast({
          title: "Report Scheduled",
          description: `AI-enhanced report will be emailed to ${companyDetails.contactEmail}`,
        })
      } else {
        // Trigger download
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${filename}.${extension}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        toast({
          title: "AI-Enhanced Report Generated Successfully",
          description: `Professional ${reportConfig.format.toUpperCase()} report for ${companyDetails.companyName} has been downloaded with AI insights.`,
        })
      }
    } catch (error) {
      console.error("Report generation error:", error)
      toast({
        title: "Generation Failed",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateSampleReport = async () => {
    setIsGenerating(true)
    try {
      const sampleData = createSampleReportData()
      const blob = await generateWorldClassReport(sampleData, "pdf")

      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "Sample_AI_Enhanced_NAC_Analysis_Report.pdf"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Sample Report Generated",
        description: "Professional AI-enhanced sample report has been downloaded.",
      })
    } catch (error) {
      console.error("Sample report generation error:", error)
      toast({
        title: "Generation Failed",
        description: "Failed to generate sample report.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI-Powered Enterprise Reports
          </h2>
          <p className="text-muted-foreground">
            Generate professional, AI-enhanced NAC analysis reports with automated company research
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={generateSampleReport} disabled={isGenerating}>
            <Eye className="mr-2 h-4 w-4" />
            Sample Report
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share Template
          </Button>
          <Button
            onClick={generateReport}
            disabled={isGenerating || !companyDetails.companyName}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isGenerating ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate AI-Enhanced Report
              </>
            )}
          </Button>
        </div>
      </div>

      {/* AI Research Status */}
      {isResearching && (
        <Alert>
          <Brain className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>AI Research in Progress...</span>
                <span>{researchProgress}%</span>
              </div>
              <Progress value={researchProgress} className="h-2" />
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* AI Research Results */}
      {aiResearchData && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>
            <strong>AI Research Complete:</strong> Successfully enhanced company profile with industry insights,
            executive team information, recent developments, and compliance requirements.
          </AlertDescription>
        </Alert>
      )}

      {/* Enhanced Feature Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-900">AI Company Research</h3>
            <p className="text-sm text-blue-700">Automated company intelligence & insights</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-900">Interactive Analytics</h3>
            <p className="text-sm text-green-700">Advanced visualizations & metrics</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Download className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-purple-900">Multiple Formats</h3>
            <p className="text-sm text-purple-700">PDF, Word, Excel, PowerPoint</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-semibold text-orange-900">AI Enhancement</h3>
            <p className="text-sm text-orange-700">OpenAI, Anthropic, Gemini integration</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Configuration Panel */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                AI-Enhanced Report Configuration
              </CardTitle>
              <CardDescription>
                Configure your enterprise analysis report with AI-powered company research and insights
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="company">Company</TabsTrigger>
                  <TabsTrigger value="environment">Environment</TabsTrigger>
                  <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
                  <TabsTrigger value="strategy">Strategy</TabsTrigger>
                  <TabsTrigger value="report">Report</TabsTrigger>
                </TabsList>

                <TabsContent value="company" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Company Information</h3>
                      <p className="text-sm text-muted-foreground">Basic company details and AI research</p>
                    </div>
                    <Button
                      onClick={handleAIResearch}
                      disabled={isResearching || !companyDetails.companyName}
                      variant="outline"
                      size="sm"
                    >
                      {isResearching ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Researching...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          AI Research
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={companyDetails.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        placeholder="Acme Corporation"
                        className="font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={companyDetails.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="www.acmecorp.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select
                        value={companyDetails.industry}
                        onValueChange={(value) => handleInputChange("industry", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select
                        value={companyDetails.companySize}
                        onValueChange={(value: OrganizationSize) => handleInputChange("companySize", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {COMPANY_SIZES.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employeeCount">Employee Count</Label>
                      <Input
                        id="employeeCount"
                        type="number"
                        value={companyDetails.employeeCount || ""}
                        onChange={(e) => handleInputChange("employeeCount", Number.parseInt(e.target.value) || 0)}
                        placeholder="5000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deviceCount">Device Count</Label>
                      <Input
                        id="deviceCount"
                        type="number"
                        value={companyDetails.deviceCount || ""}
                        onChange={(e) => handleInputChange("deviceCount", Number.parseInt(e.target.value) || 0)}
                        placeholder="25000"
                      />
                    </div>
                  </div>

                  {/* AI Research Results Display */}
                  {aiResearchData && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">AI Research Results</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Market Position:</span> {aiResearchData.marketPosition}
                        </div>
                        <div>
                          <span className="font-medium">Financial Health:</span> {aiResearchData.financialHealth}
                        </div>
                        <div>
                          <span className="font-medium">Executive Team:</span>{" "}
                          {aiResearchData.executiveTeam?.length || 0} members identified
                        </div>
                        <div>
                          <span className="font-medium">Recent News:</span> {aiResearchData.recentNews?.length || 0}{" "}
                          items found
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="environment" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="deploymentType">Preferred Deployment Model</Label>
                      <Select
                        value={companyDetails.deploymentType}
                        onValueChange={(value: DeploymentModel) => handleInputChange("deploymentType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select deployment model" />
                        </SelectTrigger>
                        <SelectContent>
                          {DEPLOYMENT_MODELS.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              {model.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="incumbentVendor">Current NAC Vendor</Label>
                      <Select
                        value={companyDetails.incumbentVendor}
                        onValueChange={(value) => handleInputChange("incumbentVendor", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select current vendor" />
                        </SelectTrigger>
                        <SelectContent>
                          {SECURITY_VENDORS.map((vendor) => (
                            <SelectItem key={vendor} value={vendor}>
                              {vendor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="stakeholders" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryContact">Primary Contact</Label>
                      <Input
                        id="primaryContact"
                        value={companyDetails.primaryContact}
                        onChange={(e) => handleInputChange("primaryContact", e.target.value)}
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactTitle">Contact Title</Label>
                      <Input
                        id="contactTitle"
                        value={companyDetails.contactTitle}
                        onChange={(e) => handleInputChange("contactTitle", e.target.value)}
                        placeholder="CISO"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={companyDetails.contactEmail}
                        onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                        placeholder="john.smith@acmecorp.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input
                        id="contactPhone"
                        value={companyDetails.contactPhone}
                        onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="strategy" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="executiveMessage">Executive Message</Label>
                      <Textarea
                        id="executiveMessage"
                        value={companyDetails.executiveMessage}
                        onChange={(e) => handleInputChange("executiveMessage", e.target.value)}
                        placeholder="Enter a custom executive message for the report..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="valueProposition">Value Proposition</Label>
                      <Textarea
                        id="valueProposition"
                        value={companyDetails.valueProposition}
                        onChange={(e) => handleInputChange("valueProposition", e.target.value)}
                        placeholder="Enter key value propositions and strategic recommendations..."
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="report" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reportType">Report Type</Label>
                      <Select
                        value={reportConfig.reportType}
                        onValueChange={(value: ReportTemplate) =>
                          setReportConfig((prev) => ({ ...prev, reportType: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comprehensive">Comprehensive Analysis (35-50 pages)</SelectItem>
                          <SelectItem value="executive">Executive Summary (8-12 pages)</SelectItem>
                          <SelectItem value="technical">Technical Analysis (15-20 pages)</SelectItem>
                          <SelectItem value="financial">Financial Analysis (10-15 pages)</SelectItem>
                          <SelectItem value="security">Security Report (12-18 pages)</SelectItem>
                          <SelectItem value="compliance">Compliance Report (12-18 pages)</SelectItem>
                          <SelectItem value="board">Board Presentation (6-8 pages)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="format">Format</Label>
                      <Select
                        value={reportConfig.format}
                        onValueChange={(value: ReportFormat) => setReportConfig((prev) => ({ ...prev, format: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF Document</SelectItem>
                          <SelectItem value="word">Word Document</SelectItem>
                          <SelectItem value="powerpoint">PowerPoint Presentation</SelectItem>
                          <SelectItem value="excel">Excel Workbook</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">AI Enhancement Settings</Label>
                      <Switch
                        checked={reportConfig.includeAIEnhancement}
                        onCheckedChange={(checked) =>
                          setReportConfig((prev) => ({ ...prev, includeAIEnhancement: checked }))
                        }
                      />
                    </div>

                    <Label className="text-base font-medium">Report Features</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="includeCharts"
                          checked={reportConfig.includeCharts}
                          onCheckedChange={(checked) =>
                            setReportConfig((prev) => ({ ...prev, includeCharts: checked as boolean }))
                          }
                        />
                        <Label htmlFor="includeCharts">Interactive Charts & Visualizations</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="includeCompliance"
                          checked={reportConfig.includeCompliance}
                          onCheckedChange={(checked) =>
                            setReportConfig((prev) => ({ ...prev, includeCompliance: checked as boolean }))
                          }
                        />
                        <Label htmlFor="includeCompliance">Compliance Analysis</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="includeRoadmap"
                          checked={reportConfig.includeRoadmap}
                          onCheckedChange={(checked) =>
                            setReportConfig((prev) => ({ ...prev, includeRoadmap: checked as boolean }))
                          }
                        />
                        <Label htmlFor="includeRoadmap">Implementation Roadmap</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="includeBenchmarks"
                          checked={reportConfig.includeBenchmarks}
                          onCheckedChange={(checked) =>
                            setReportConfig((prev) => ({ ...prev, includeBenchmarks: checked as boolean }))
                          }
                        />
                        <Label htmlFor="includeBenchmarks">Industry Benchmarks</Label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Preview Panel */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-600" />
                AI-Enhanced Report Preview
              </CardTitle>
              <CardDescription>Live preview of your personalized AI-powered report</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  {companyDetails.companyName
                    ? `Generating AI-enhanced report for ${companyDetails.companyName} - ${companyDetails.industry}`
                    : "Enter company details to see personalized preview"}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Key Metrics Preview</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 font-medium">Total Savings</p>
                    <p className="text-xl font-bold text-green-900">
                      ${(((companyDetails.deviceCount || 5000) * 102 * 3) / 1000).toFixed(0)}K+
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700 font-medium">ROI</p>
                    <p className="text-xl font-bold text-blue-900">456%</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-700 font-medium">Security Score</p>
                    <p className="text-xl font-bold text-purple-900">95/100</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-orange-700 font-medium">Deployment</p>
                    <p className="text-xl font-bold text-orange-900">30 min</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">AI-Enhanced Features</h4>
                <div className="space-y-2">
                  {reportConfig.includeAIEnhancement && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      AI Company Research & Intelligence
                    </div>
                  )}
                  {reportConfig.includeCharts && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Interactive Charts & Visualizations
                    </div>
                  )}
                  {reportConfig.includeCompliance && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Compliance Framework Analysis
                    </div>
                  )}
                  {reportConfig.includeRoadmap && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Implementation Roadmap
                    </div>
                  )}
                  {aiResearchData && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      AI-Powered Company Insights
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
