"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Save, Eye } from "lucide-react"
import { useComplianceData } from "@/hooks/useComplianceData"
import { useAIInsights } from "@/hooks/useAIInsights"
import { saveReport } from "@/app/actions/ai"
import { formatCurrency } from "@/lib/utils"

interface ReportSection {
  id: string
  type:
    | "executive_summary"
    | "risk_overview"
    | "vendor_analysis"
    | "recommendations"
    | "compliance_gaps"
    | "financial_impact"
  title: string
  content: any
  order: number
  enabled: boolean
}

export function ReportBuilder() {
  const { selectedVendorData, riskAssessments, complianceMetrics, selectedIndustry, selectedOrgSize } =
    useComplianceData()

  const { executiveSummary, insights, recommendations, metadata } = useAIInsights(
    selectedVendorData,
    riskAssessments,
    selectedIndustry,
    selectedOrgSize,
  )

  const [reportName, setReportName] = useState("Vendor Risk Assessment Report")
  const [reportDescription, setReportDescription] = useState(
    "Comprehensive analysis of vendor compliance and security risks",
  )
  const [sections, setSections] = useState<ReportSection[]>([
    {
      id: "exec-summary",
      type: "executive_summary",
      title: "Executive Summary",
      content: executiveSummary,
      order: 1,
      enabled: true,
    },
    {
      id: "risk-overview",
      type: "risk_overview",
      title: "Risk Overview",
      content: complianceMetrics,
      order: 2,
      enabled: true,
    },
    {
      id: "vendor-analysis",
      type: "vendor_analysis",
      title: "Vendor Analysis",
      content: riskAssessments,
      order: 3,
      enabled: true,
    },
    {
      id: "recommendations",
      type: "recommendations",
      title: "Recommendations",
      content: recommendations,
      order: 4,
      enabled: true,
    },
    {
      id: "compliance-gaps",
      type: "compliance_gaps",
      title: "Compliance Gaps",
      content: Object.values(riskAssessments).flatMap((r) => r.complianceGaps),
      order: 5,
      enabled: true,
    },
    {
      id: "financial-impact",
      type: "financial_impact",
      title: "Financial Impact",
      content: Object.values(riskAssessments).reduce(
        (acc, r) => ({
          ...acc,
          [r.vendorId]: r.costOfNonCompliance,
        }),
        {},
      ),
      order: 6,
      enabled: true,
    },
  ])

  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("builder")

  const handleSaveReport = async () => {
    setIsSaving(true)
    try {
      const templateData = {
        sections: sections.filter((s) => s.enabled),
        metadata: {
          ...metadata,
          generatedAt: new Date().toISOString(),
          vendorIds: selectedVendorData.map((v) => v.id),
          industry: selectedIndustry,
          orgSize: selectedOrgSize,
        },
      }

      const result = await saveReport(
        reportName,
        reportDescription,
        templateData,
        selectedVendorData.map((v) => v.id),
        selectedIndustry,
        selectedOrgSize,
      )

      if (result.success) {
        // Handle success
        console.log("Report saved successfully")
      }
    } catch (error) {
      console.error("Error saving report:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const toggleSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) => (section.id === sectionId ? { ...section, enabled: !section.enabled } : section)),
    )
  }

  const moveSection = (sectionId: string, direction: "up" | "down") => {
    setSections((prev) => {
      const currentIndex = prev.findIndex((s) => s.id === sectionId)
      if (currentIndex === -1) return prev

      const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
      if (newIndex < 0 || newIndex >= prev.length) return prev

      const newSections = [...prev]
      const [movedSection] = newSections.splice(currentIndex, 1)
      newSections.splice(newIndex, 0, movedSection)

      return newSections.map((section, index) => ({
        ...section,
        order: index + 1,
      }))
    })
  }

  const renderSectionPreview = (section: ReportSection) => {
    switch (section.type) {
      case "executive_summary":
        return (
          <div className="space-y-4">
            {executiveSummary && (
              <>
                <p className="text-sm text-muted-foreground">{executiveSummary.overview}</p>
                <div>
                  <h4 className="font-medium mb-2">Key Metrics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Average Risk Score: {executiveSummary.keyMetrics.avgRiskScore}/100</div>
                    <div>Total Gaps: {executiveSummary.keyMetrics.totalGaps}</div>
                    <div>High Risk Vendors: {executiveSummary.keyMetrics.highRiskVendors}</div>
                    <div>Cost Risk: {formatCurrency(executiveSummary.keyMetrics.estimatedCostRisk)}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        )

      case "risk_overview":
        return (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Average Risk Score: {complianceMetrics.averageRiskScore}/100</div>
            <div>Total Gaps: {complianceMetrics.totalGaps}</div>
            <div>Critical Gaps: {complianceMetrics.criticalGaps}</div>
            <div>High Risk Vendors: {complianceMetrics.highRiskVendors}</div>
          </div>
        )

      case "vendor_analysis":
        return (
          <div className="space-y-2">
            {Object.entries(riskAssessments)
              .slice(0, 3)
              .map(([vendorId, assessment]) => {
                const vendor = selectedVendorData.find((v) => v.id === vendorId)
                return (
                  <div key={vendorId} className="flex justify-between text-sm">
                    <span>{vendor?.name}</span>
                    <Badge
                      variant={
                        assessment.riskLevel === "high" || assessment.riskLevel === "critical"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {assessment.riskLevel}
                    </Badge>
                  </div>
                )
              })}
          </div>
        )

      case "recommendations":
        return (
          <div className="space-y-2">
            {recommendations.slice(0, 3).map((rec, index) => (
              <div key={index} className="text-sm">
                <div className="font-medium">{rec.title}</div>
                <div className="text-muted-foreground">{rec.description.substring(0, 100)}...</div>
              </div>
            ))}
          </div>
        )

      case "compliance_gaps":
        const allGaps = Object.values(riskAssessments).flatMap((r) => r.complianceGaps)
        return (
          <div className="space-y-2">
            {allGaps.slice(0, 3).map((gap, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{gap.requirementName}</span>
                <Badge
                  variant={gap.gapSeverity === "critical" || gap.gapSeverity === "high" ? "destructive" : "outline"}
                >
                  {gap.gapSeverity}
                </Badge>
              </div>
            ))}
          </div>
        )

      case "financial_impact":
        return (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Total Cost Risk: {formatCurrency(complianceMetrics.totalCostRisk)}</div>
            <div>Vendors Assessed: {selectedVendorData.length}</div>
          </div>
        )

      default:
        return <div className="text-sm text-muted-foreground">No preview available</div>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Report Builder</h1>
          <p className="text-muted-foreground">Create custom compliance and risk assessment reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setActiveTab("preview")}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSaveReport} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Report"}
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Report Configuration */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Report Configuration</CardTitle>
                <CardDescription>Configure basic report settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="report-name">Report Name</Label>
                  <Input id="report-name" value={reportName} onChange={(e) => setReportName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="report-description">Description</Label>
                  <Textarea
                    id="report-description"
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Report Sections</Label>
                  {sections.map((section) => (
                    <div key={section.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={section.enabled}
                          onChange={() => toggleSection(section.id)}
                          className="rounded"
                        />
                        <span className="text-sm">{section.title}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveSection(section.id, "up")}
                          disabled={section.order === 1}
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveSection(section.id, "down")}
                          disabled={section.order === sections.length}
                        >
                          ↓
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Section Previews */}
            <div className="lg:col-span-2 space-y-4">
              {sections
                .filter((section) => section.enabled)
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <Card key={section.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <Badge variant="outline">Section {section.order}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>{renderSectionPreview(section)}</CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {/* Full Report Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{reportName}</CardTitle>
              <CardDescription>{reportDescription}</CardDescription>
              <div className="flex gap-2 mt-4">
                <Badge variant="outline">{selectedVendorData.length} Vendors</Badge>
                <Badge variant="outline">{selectedIndustry}</Badge>
                <Badge variant="outline">{selectedOrgSize}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {sections
                .filter((section) => section.enabled)
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <div key={section.id}>
                    <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                    {renderSectionPreview(section)}
                    <Separator className="mt-6" />
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Settings</CardTitle>
              <CardDescription>Configure how your report will be exported</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Export Format</Label>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm">
                    PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    Word
                  </Button>
                  <Button variant="outline" size="sm">
                    Excel
                  </Button>
                  <Button variant="outline" size="sm">
                    PowerPoint
                  </Button>
                </div>
              </div>
              <div>
                <Label>Include Charts</Label>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Include visual charts and graphs</span>
                </div>
              </div>
              <div>
                <Label>Branding</Label>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" />
                  <span className="text-sm">Include company logo and branding</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
