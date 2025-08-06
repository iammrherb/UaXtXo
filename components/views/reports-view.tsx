"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, FileText, Mail, Calendar, Settings, Eye, Share2, Printer, Save, Clock, User, Building } from 'lucide-react'
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ReportsViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function ReportsView({ results = [], config }: ReportsViewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("executive")
  const [reportTitle, setReportTitle] = useState("NAC Vendor Analysis Report")
  const [reportDescription, setReportDescription] = useState("")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeDetails, setIncludeDetails] = useState(true)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [scheduleFrequency, setScheduleFrequency] = useState("none")

  // Report templates
  const reportTemplates = [
    {
      id: "executive",
      name: "Executive Summary",
      description: "High-level overview for C-suite decision makers",
      pages: "2-3 pages",
      audience: "Executives, Decision Makers",
    },
    {
      id: "technical",
      name: "Technical Analysis",
      description: "Detailed technical comparison and implementation details",
      pages: "8-12 pages", 
      audience: "IT Teams, Architects",
    },
    {
      id: "financial",
      name: "Financial Deep Dive",
      description: "Comprehensive cost analysis and ROI calculations",
      pages: "6-8 pages",
      audience: "Finance, Procurement",
    },
    {
      id: "compliance",
      name: "Compliance & Risk Assessment",
      description: "Security posture and regulatory compliance analysis",
      pages: "5-7 pages",
      audience: "Security, Compliance Teams",
    },
    {
      id: "comprehensive",
      name: "Complete Analysis",
      description: "All sections combined for thorough evaluation",
      pages: "15-20 pages",
      audience: "All Stakeholders",
    },
  ]

  // Generate report preview data
  const reportPreview = useMemo(() => {
    if (results.length === 0) return null

    const lowestCost = Math.min(...results.map(r => r.totalCost))
    const highestCost = Math.max(...results.map(r => r.totalCost))
    const savings = highestCost - lowestCost
    const savingsPercent = ((savings / highestCost) * 100).toFixed(0)
    
    const bestROI = Math.max(...results.map(r => r.financialMetrics.roi))
    const avgPayback = results.reduce((sum, r) => sum + r.financialMetrics.paybackPeriod, 0) / results.length
    
    const lowestCostVendor = results.find(r => r.totalCost === lowestCost)
    const bestROIVendor = results.find(r => r.financialMetrics.roi === bestROI)

    return {
      totalVendors: results.length,
      analysisDevices: config?.devices || 0,
      analysisPeriod: config?.years || 3,
      maxSavings: savings,
      savingsPercent,
      lowestCostVendor: lowestCostVendor?.vendorName,
      lowestCost,
      bestROI,
      bestROIVendor: bestROIVendor?.vendorName,
      avgPayback: avgPayback.toFixed(1),
      industry: config?.industry || "technology",
      orgSize: config?.orgSize || "medium",
    }
  }, [results, config])

  // Handle report generation
  const handleGenerateReport = (format: string) => {
    // In a real implementation, this would generate and download the report
    console.log(`Generating ${selectedTemplate} report in ${format} format`)
    
    // Simulate report generation
    const reportData = {
      template: selectedTemplate,
      format,
      title: reportTitle,
      description: reportDescription,
      includeCharts,
      includeDetails,
      results,
      config,
      preview: reportPreview,
    }
    
    // Create a blob with report data (simplified)
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${reportTitle.replace(/\s+/g, '_')}_${selectedTemplate}.${format.toLowerCase()}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Handle email scheduling
  const handleScheduleEmail = () => {
    console.log(`Scheduling ${scheduleFrequency} email reports to ${recipientEmail}`)
    // In a real implementation, this would set up email scheduling
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Please complete your vendor analysis to generate reports.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription>Customize your analysis report settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="report-title">Report Title</Label>
              <Input
                id="report-title"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                placeholder="Enter report title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-template">Report Template</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {reportTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="report-description">Report Description (Optional)</Label>
            <Textarea
              id="report-description"
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              placeholder="Add a custom description or executive summary..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Available Report Templates</CardTitle>
          <CardDescription>Choose the right template for your audience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportTemplates.map((template) => (
              <div
                key={template.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedTemplate === template.id
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-primary/50"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{template.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {template.pages}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {template.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  {template.audience}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Preview and Generation */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Report Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Report Preview
            </CardTitle>
            <CardDescription>
              Preview of your {reportTemplates.find(t => t.id === selectedTemplate)?.name} report
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportPreview && (
              <>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-bold text-lg mb-2">{reportTitle}</h3>
                  {reportDescription && (
                    <p className="text-sm text-muted-foreground mb-3">{reportDescription}</p>
                  )}
                  
                  <div className="grid gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Analysis Scope:</span>
                      <span>{reportPreview.totalVendors} vendors, {reportPreview.analysisDevices.toLocaleString()} devices</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time Period:</span>
                      <span>{reportPreview.analysisPeriod} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Industry:</span>
                      <span className="capitalize">{reportPreview.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Organization Size:</span>
                      <span className="capitalize">{reportPreview.orgSize}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Key Findings:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <span>
                        Maximum cost savings of ${reportPreview.maxSavings.toLocaleString()} 
                        ({reportPreview.savingsPercent}%) with {reportPreview.lowestCostVendor}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                      <span>
                        Best ROI of {reportPreview.bestROI.toFixed(0)}% achieved by {reportPreview.bestROIVendor}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                      <span>
                        Average payback period of {reportPreview.avgPayback} years across all vendors
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Generation Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Generation Options
            </CardTitle>
            <CardDescription>Configure report output and delivery</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Export Formats */}
            <div className="space-y-3">
              <h4 className="font-semibold">Export Formats</h4>
              <div className="grid gap-2">
                <Button 
                  onClick={() => handleGenerateReport('PDF')}
                  className="justify-start"
                  variant="outline"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate PDF Report
                </Button>
                <Button 
                  onClick={() => handleGenerateReport('DOCX')}
                  className="justify-start"
                  variant="outline"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Word Document
                </Button>
                <Button 
                  onClick={() => handleGenerateReport('PPTX')}
                  className="justify-start"
                  variant="outline"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate PowerPoint
                </Button>
                <Button 
                  onClick={() => handleGenerateReport('XLSX')}
                  className="justify-start"
                  variant="outline"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Excel Workbook
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h4 className="font-semibold">Quick Actions</h4>
              <div className="grid gap-2">
                <Button variant="outline" className="justify-start">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Report
                </Button>
                <Button variant="outline" className="justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Link
                </Button>
                <Button variant="outline" className="justify-start">
                  <Save className="h-4 w-4 mr-2" />
                  Save Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Scheduling */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Reports
          </CardTitle>
          <CardDescription>Schedule automatic report delivery</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="manual" className="space-y-4">
            <TabsList>
              <TabsTrigger value="manual">Send Now</TabsTrigger>
              <TabsTrigger value="schedule">Schedule Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="recipient-email">Recipient Email</Label>
                  <Input
                    id="recipient-email"
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="flex items-end">
                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Report Now
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="schedule-email">Email Address</Label>
                  <Input
                    id="schedule-email"
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule-frequency">Frequency</Label>
                  <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Schedule</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleScheduleEmail}
                    disabled={scheduleFrequency === "none" || !recipientEmail}
                    className="w-full"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Reports
                  </Button>
                </div>
              </div>
              
              {scheduleFrequency !== "none" && (
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      Reports will be sent {scheduleFrequency} to {recipientEmail}
                    </span>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Report History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports and templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Mock report history */}
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Executive Summary - NAC Analysis</p>
                  <p className="text-sm text-muted-foreground">Generated 2 hours ago • PDF • 3 pages</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Technical Analysis - Full Comparison</p>
                  <p className="text-sm text-muted-foreground">Generated yesterday • DOCX • 12 pages</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Financial Deep Dive - Cost Analysis</p>
                  <p className="text-sm text-muted-foreground">Generated 3 days ago • XLSX • Data + Charts</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
