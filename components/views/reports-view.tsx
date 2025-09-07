"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, Settings, Eye, Sparkles, Download, Mail, Share2, FileText, BarChart3 } from "lucide-react"
import { toast } from "@/components/ui/toast"
import {
  generateWorldClassReport,
  createSampleReportData,
  type WorldClassReportData,
  type ReportTemplate,
  type ReportFormat,
  type OrganizationSize,
  type DeploymentModel,
} from "@/lib/world-class-report-generator"

interface ReportsViewProps {
  results?: any[]
  config?: any
}

interface CompanyDetails {
  companyName: string
  industry: string
  companySize: OrganizationSize
  employeeCount: number
  deviceCount: number
  locations: number
  headquarters: string
  website: string
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
  ceo: string
  cfo: string
  ciso: string
  cio: string
  itDirector: string
  complianceOfficer: string[]
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
  "Other",
]

export default function ReportsView() {
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    companyName: "",
    industry: "",
    companySize: "medium",
    employeeCount: 0,
    deviceCount: 0,
    locations: 1,
    headquarters: "",
    website: "",
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
    ceo: "",
    cfo: "",
    ciso: "",
    cio: "",
    itDirector: "",
    complianceOfficer: [],
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
    includeAIEnhancement: false,
    includeBenchmarks: true,
    targetAudience: ["executives"],
    deliveryMethod: "download",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("company")

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
      // Create world-class report data
      const reportData: WorldClassReportData = {
        title: `${companyDetails.companyName} - Network Access Control Analysis`,
        subtitle: `Strategic Assessment for ${companyDetails.industry} Industry`,
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
          portnoxCost: 250000,
          competitorCosts: { cisco: 750000, aruba: 625000 },
          savings: 500000,
          roi: 456,
          paybackPeriod: 0.5,
          riskMitigation: 600000,
        },

        content: {
          executiveSummary: companyDetails.executiveMessage || "",
          keyFindings: [],
          recommendations: companyDetails.valueProposition ? [companyDetails.valueProposition] : [],
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
          complianceFrameworks: [],
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
          description: `Report will be emailed to ${companyDetails.contactEmail}`,
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
          title: "World-Class Report Generated Successfully",
          description: `Professional ${reportConfig.format.toUpperCase()} report for ${companyDetails.companyName} has been downloaded.`,
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
      a.download = "Sample_NAC_Analysis_Report.pdf"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Sample Report Generated",
        description: "Professional sample report has been downloaded.",
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
            World-Class Enterprise Reports
          </h2>
          <p className="text-muted-foreground">
            Generate professional, comprehensive NAC analysis reports with advanced features
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
                Generate World-Class Report
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Enhanced Feature Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-900">Professional PDFs</h3>
            <p className="text-sm text-blue-700">Enterprise-grade layouts with charts</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-900">Interactive Charts</h3>
            <p className="text-sm text-green-700">Advanced visualizations & analytics</p>
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
            <Mail className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-semibold text-orange-900">Smart Delivery</h3>
            <p className="text-sm text-orange-700">Email scheduling & automation</p>
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
                World-Class Report Configuration
              </CardTitle>
              <CardDescription>
                Customize your enterprise analysis report with advanced personalization features
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
                    <div className="space-y-2">
                      <Label htmlFor="locations">Locations</Label>
                      <Input
                        id="locations"
                        type="number"
                        value={companyDetails.locations || ""}
                        onChange={(e) => handleInputChange("locations", Number.parseInt(e.target.value) || 1)}
                        placeholder="15"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="headquarters">Headquarters</Label>
                      <Input
                        id="headquarters"
                        value={companyDetails.headquarters}
                        onChange={(e) => handleInputChange("headquarters", e.target.value)}
                        placeholder="New York, NY"
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
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="annualRevenue">Annual Revenue</Label>
                      <Input
                        id="annualRevenue"
                        value={companyDetails.annualRevenue}
                        onChange={(e) => handleInputChange("annualRevenue", e.target.value)}
                        placeholder="$500M"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="marketCap">Market Cap</Label>
                      <Input
                        id="marketCap"
                        value={companyDetails.marketCap}
                        onChange={(e) => handleInputChange("marketCap", e.target.value)}
                        placeholder="$2.5B"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cyberInsurance">Cyber Insurance Premium</Label>
                      <Input
                        id="cyberInsurance"
                        type="number"
                        value={companyDetails.cyberInsurancePremium || ""}
                        onChange={(e) =>
                          handleInputChange("cyberInsurancePremium", Number.parseInt(e.target.value) || 0)
                        }
                        placeholder="250000"
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <Checkbox
                        id="publiclyTraded"
                        checked={companyDetails.publiclyTraded}
                        onCheckedChange={(checked) => handleInputChange("publiclyTraded", checked)}
                      />
                      <Label htmlFor="publiclyTraded">Publicly Traded</Label>
                    </div>
                  </div>
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

                    <div className="space-y-2">
                      <Label>Current Security Stack</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {SECURITY_VENDORS.map((vendor) => (
                          <div key={vendor} className="flex items-center space-x-2">
                            <Checkbox
                              id={vendor}
                              checked={companyDetails.currentSecurityStack.includes(vendor)}
                              onCheckedChange={(checked) =>
                                handleArrayChange("currentSecurityStack", vendor, checked as boolean)
                              }
                            />
                            <Label htmlFor={vendor}>{vendor}</Label>
                          </div>
                        ))}
                      </div>
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

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ceo">CEO</Label>
                      <Input
                        id="ceo"
                        value={companyDetails.ceo}
                        onChange={(e) => handleInputChange("ceo", e.target.value)}
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cfo">CFO</Label>
                      <Input
                        id="cfo"
                        value={companyDetails.cfo}
                        onChange={(e) => handleInputChange("cfo", e.target.value)}
                        placeholder="Mike Johnson"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ciso">CISO</Label>
                      <Input
                        id="ciso"
                        value={companyDetails.ciso}
                        onChange={(e) => handleInputChange("ciso", e.target.value)}
                        placeholder="Sarah Wilson"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cio">CIO</Label>
                      <Input
                        id="cio"
                        value={companyDetails.cio}
                        onChange={(e) => handleInputChange("cio", e.target.value)}
                        placeholder="David Brown"
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

                    <div className="space-y-2">
                      <Label className="text-base font-medium">Business Priorities</Label>
                      <Textarea
                        placeholder="Enter key business priorities (e.g., Digital transformation, Cost reduction, Security improvement, Compliance, Growth initiatives)"
                        value={companyDetails.businessPriorities.join(", ")}
                        onChange={(e) => {
                          const priorities = e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter((s) => s)
                          handleInputChange("businessPriorities", priorities)
                        }}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-medium">Security Challenges</Label>
                      <Textarea
                        placeholder="Enter current security challenges (e.g., Legacy infrastructure, Skills shortage, Compliance gaps, Incident response)"
                        value={companyDetails.securityChallenges.join(", ")}
                        onChange={(e) => {
                          const challenges = e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter((s) => s)
                          handleInputChange("securityChallenges", challenges)
                        }}
                        rows={2}
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
                    <Label className="text-base font-medium">Advanced Features</Label>
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
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="includeAIEnhancement"
                          checked={reportConfig.includeAIEnhancement}
                          onCheckedChange={(checked) =>
                            setReportConfig((prev) => ({ ...prev, includeAIEnhancement: checked as boolean }))
                          }
                        />
                        <Label htmlFor="includeAIEnhancement">AI-Enhanced Insights</Label>
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
                Report Preview
              </CardTitle>
              <CardDescription>Live preview of your personalized world-class report</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  {companyDetails.companyName
                    ? `Generating world-class report for ${companyDetails.companyName} - ${companyDetails.industry}`
                    : "Enter company details to see personalized preview"}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Key Metrics Preview</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 font-medium">Total Savings</p>
                    <p className="text-xl font-bold text-green-900">$500,000+</p>
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
                <h4 className="font-semibold">Report Features</h4>
                <div className="space-y-2">
                  {reportConfig.includeCharts && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Interactive Charts & Visualizations
                    </div>
                  )}
                  {reportConfig.includeCompliance && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Compliance Framework Analysis
                    </div>
                  )}
                  {reportConfig.includeRoadmap && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Implementation Roadmap
                    </div>
                  )}
                  {reportConfig.includeAIEnhancement && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      AI-Enhanced Insights
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Report Quality Guarantee</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Professional enterprise-grade layouts
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Advanced charts and visualizations
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Industry-specific analysis
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Executive-ready presentations
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
