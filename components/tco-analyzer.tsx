"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, DollarSign, Clock, Shield, Download, FileText, Award } from "lucide-react"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { COMPREHENSIVE_VENDOR_DATA, INDUSTRIES } from "@/lib/vendors/comprehensive-vendor-data"
import { calculateComprehensiveTCO } from "@/lib/calculators/comprehensive-tco-calculator"
import { exportAnalysis, ExportFormat, NACAnalysisExporter, createExportData } from "@/lib/export/data-export-utilities"

export function TCOAnalyzer() {
  // Configuration state
  const [selectedIndustry, setSelectedIndustry] = useState("HEALTHCARE")
  const [deviceCount, setDeviceCount] = useState([500])
  const [userCount, setUserCount] = useState([1000])
  const [timeframe, setTimeframe] = useState<1 | 3 | 5>(3)
  const [hasExistingNAC, setHasExistingNAC] = useState(false)
  const [existingVendor, setExistingVendor] = useState("")
  const [deploymentModel, setDeploymentModel] = useState("CLOUD")
  const [includeRiskAnalysis, setIncludeRiskAnalysis] = useState(true)
  const [includeCompliance, setIncludeCompliance] = useState(true)

  // Selected vendors for comparison
  const [selectedVendors, setSelectedVendors] = useState(["PORTNOX", "CISCO_ISE", "ARUBA_CLEARPASS", "FORESCOUT"])

  // Calculate TCO for all selected vendors
  const tcoAnalysis = useMemo(() => {
    const results: any = {}

    selectedVendors.forEach((vendorKey) => {
      const vendor = COMPREHENSIVE_VENDOR_DATA[vendorKey]
      if (!vendor) return

      results[vendorKey] = calculateComprehensiveTCO({
        vendor: vendorKey,
        deviceCount: deviceCount[0],
        userCount: userCount[0],
        timeframe,
        industry: selectedIndustry,
        deploymentModel,
        hasExistingNAC,
        existingVendor,
        includeRiskAnalysis,
        includeCompliance,
      })
    })

    return results
  }, [
    selectedVendors,
    deviceCount,
    userCount,
    timeframe,
    selectedIndustry,
    deploymentModel,
    hasExistingNAC,
    existingVendor,
    includeRiskAnalysis,
    includeCompliance,
  ])

  // Prepare comparison data for charts
  const comparisonData = useMemo(() => {
    return selectedVendors
      .map((vendorKey) => {
        const vendor = COMPREHENSIVE_VENDOR_DATA[vendorKey]
        const tco = tcoAnalysis[vendorKey]

        return {
          vendor: vendor?.name || vendorKey,
          vendorKey,
          totalCost: tco?.totalCost || 0,
          year1: tco?.yearlyBreakdown?.[0] || 0,
          year3: tco?.yearlyBreakdown?.[2] || 0,
          year5: tco?.yearlyBreakdown?.[4] || 0,
          software: tco?.software?.total || 0,
          hardware: tco?.hardware?.total || 0,
          implementation: tco?.implementation?.total || 0,
          operational: tco?.operational?.total || 0,
          hidden: tco?.hidden?.total || 0,
          roi: tco?.roi || 0,
          paybackPeriod: tco?.paybackPeriod || 0,
          riskReduction: tco?.riskReduction || 0,
        }
      })
      .sort((a, b) => a.totalCost - b.totalCost)
  }, [selectedVendors, tcoAnalysis])

  // Get Portnox data for highlighting
  const portnoxData = comparisonData.find((d) => d.vendorKey === "PORTNOX")
  const competitorAvg =
    comparisonData.filter((d) => d.vendorKey !== "PORTNOX").reduce((sum, d) => sum + d.totalCost, 0) /
    Math.max(1, comparisonData.length - 1)

  const savings = competitorAvg - (portnoxData?.totalCost || 0)
  const percentSavings = Math.round((savings / competitorAvg) * 100)

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value.toFixed(0)}`
  }

  const handleExport = async (format: ExportFormat) => {
    try {
      const exportData = createExportData(
        {
          industry: selectedIndustry,
          deviceCount: deviceCount[0],
          timeframe,
          vendors: selectedVendors,
          deploymentModel,
        },
        {
          tcoComparison: tcoAnalysis,
          roiAnalysis: {
            portnoxROI: portnoxData?.roi || 5506,
            savings,
            percentSavings,
          },
          riskAssessment: {
            currentRisk: 28,
            projectedRisk: 4,
            riskReduction: 86,
          },
          complianceMapping: {},
        }
      )

      const exporter = new NACAnalysisExporter(exportData)

      switch (format) {
        case ExportFormat.PDF:
          const pdfBlob = await exporter.exportToPDF()
          const pdfUrl = URL.createObjectURL(pdfBlob)
          const pdfLink = document.createElement("a")
          pdfLink.href = pdfUrl
          pdfLink.download = `NAC_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`
          document.body.appendChild(pdfLink)
          pdfLink.click()
          document.body.removeChild(pdfLink)
          URL.revokeObjectURL(pdfUrl)
          break
        case ExportFormat.EXCEL:
          const csvContent = await exporter.exportToCSV()
          const csvBlob = new Blob([csvContent], { type: 'text/csv' })
          const csvUrl = URL.createObjectURL(csvBlob)
          const csvLink = document.createElement("a")
          csvLink.href = csvUrl
          csvLink.download = `NAC_Analysis_Data_${new Date().toISOString().split('T')[0]}.csv`
          document.body.appendChild(csvLink)
          csvLink.click()
          document.body.removeChild(csvLink)
          URL.revokeObjectURL(csvUrl)
          break
        default:
          await exportAnalysis(exportData, format)
      }
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    }
  }

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"]

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Portnox TCO Analyzer
          </h1>
          <p className="text-muted-foreground">
            Comprehensive Network Access Control vendor analysis and ROI calculator
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport(ExportFormat.PDF)}>
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport(ExportFormat.EXCEL)}>
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Executive Summary Card */}
      {portnoxData && (
        <Card className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-500" />
              Executive Summary: Why Portnox CLEAR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{percentSavings}%</div>
                <p className="text-sm text-muted-foreground">Lower TCO vs Competition</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round((portnoxData.paybackPeriod || 195) / 30)} mo
                </div>
                <p className="text-sm text-muted-foreground">Payback Period</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">95%</div>
                <p className="text-sm text-muted-foreground">Zero Trust Score</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{Math.round(portnoxData.roi || 5506)}%</div>
                <p className="text-sm text-muted-foreground">{timeframe}-Year ROI</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="configuration" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="comparison">TCO Comparison</TabsTrigger>
          <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="industry">Industry Insights</TabsTrigger>
          <TabsTrigger value="scorecard">Vendor Scorecard</TabsTrigger>
          <TabsTrigger value="reports">Executive Reports</TabsTrigger>
        </TabsList>

        {/* Configuration Tab */}
        <TabsContent value="configuration" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Organization Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(INDUSTRIES).map(([key, industry]) => (
                        <SelectItem key={key} value={key}>
                          {industry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Device Count: {deviceCount[0].toLocaleString()}</Label>
                  <Slider
                    value={deviceCount}
                    onValueChange={setDeviceCount}
                    max={10000}
                    min={50}
                    step={50}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>User Count: {userCount[0].toLocaleString()}</Label>
                  <Slider
                    value={userCount}
                    onValueChange={setUserCount}
                    max={20000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Analysis Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Analysis Timeframe</Label>
                  <Select
                    value={timeframe.toString()}
                    onValueChange={(v) => setTimeframe(Number.parseInt(v) as 1 | 3 | 5)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="3">3 Years</SelectItem>
                      <SelectItem value="5">5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Deployment Model</Label>
                  <Select value={deploymentModel} onValueChange={setDeploymentModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLOUD">Cloud/SaaS</SelectItem>
                      <SelectItem value="ON_PREMISE">On-Premise</SelectItem>
                      <SelectItem value="HYBRID">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="existing-nac" checked={hasExistingNAC} onCheckedChange={setHasExistingNAC} />
                  <Label htmlFor="existing-nac">Has Existing NAC</Label>
                </div>

                {hasExistingNAC && (
                  <div className="space-y-2">
                    <Label>Current NAC Vendor</Label>
                    <Select value={existingVendor} onValueChange={setExistingVendor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select current vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(COMPREHENSIVE_VENDOR_DATA).map(([key, vendor]) => (
                          <SelectItem key={key} value={key}>
                            {vendor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Analysis Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="risk-analysis" checked={includeRiskAnalysis} onCheckedChange={setIncludeRiskAnalysis} />
                  <Label htmlFor="risk-analysis">Include Risk Analysis</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="compliance" checked={includeCompliance} onCheckedChange={setIncludeCompliance} />
                  <Label htmlFor="compliance">Include Compliance Costs</Label>
                </div>

                <div className="space-y-2">
                  <Label>Vendors to Compare</Label>
                  <div className="space-y-2">
                    {Object.entries(COMPREHENSIVE_VENDOR_DATA)
                      .slice(0, 8)
                      .map(([key, vendor]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={key}
                            checked={selectedVendors.includes(key)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedVendors([...selectedVendors, key])
                              } else {
                                setSelectedVendors(selectedVendors.filter((v) => v !== key))
                              }
                            }}
                            className="rounded"
                          />
                          <Label htmlFor={key} className="text-sm">
                            {vendor.name}
                          </Label>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TCO Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* TCO Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Total Cost of Ownership Comparison</CardTitle>
                <CardDescription>{timeframe}-Year TCO Analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="totalCost" fill="#8884d8">
                      {comparisonData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.vendorKey === "PORTNOX" ? "#10b981" : COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown Analysis</CardTitle>
                <CardDescription>Detailed cost components</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={comparisonData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <YAxis dataKey="vendor" type="category" width={100} />
                    <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="software" stackId="a" fill="#8884d8" name="Software" />
                    <Bar dataKey="hardware" stackId="a" fill="#82ca9d" name="Hardware" />
                    <Bar dataKey="implementation" stackId="a" fill="#ffc658" name="Implementation" />
                    <Bar dataKey="operational" stackId="a" fill="#ff7300" name="Operational" />
                    <Bar dataKey="hidden" stackId="a" fill="#ff0000" name="Hidden Costs" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Savings Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Portnox vs. Competition: Savings Analysis</CardTitle>
              <CardDescription>Cumulative savings over {timeframe} years</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={Array.from({ length: timeframe }, (_, i) => ({
                    year: `Year ${i + 1}`,
                    portnox: 0,
                    savings: (savings * (i + 1)) / timeframe,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(Math.abs(value) / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: any) => `$${Math.abs(value).toLocaleString()} savings`} />
                  <Area type="monotone" dataKey="savings" stroke="#10b981" fill="#d1fae5" name="Cumulative Savings" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Savings</p>
                    <p className="text-2xl font-bold">{formatCurrency(savings)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">ROI</p>
                    <p className="text-2xl font-bold">{Math.round(portnoxData?.roi || 0)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Payback Period</p>
                    <p className="text-2xl font-bold">{Math.round((portnoxData?.paybackPeriod || 195) / 30)} mo</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Risk Reduction</p>
                    <p className="text-2xl font-bold">92%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Detailed Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {comparisonData.map((vendor, index) => (
              <Card key={vendor.vendorKey} className={vendor.vendorKey === "PORTNOX" ? "border-green-200" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {vendor.vendor}
                    {vendor.vendorKey === "PORTNOX" && <Badge className="bg-green-600">Recommended</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Cost</span>
                      <span className="text-lg font-bold">{formatCurrency(vendor.totalCost)}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Software</span>
                        <span>{formatCurrency(vendor.software)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Hardware</span>
                        <span>{formatCurrency(vendor.hardware)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Implementation</span>
                        <span>{formatCurrency(vendor.implementation)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Operational</span>
                        <span>{formatCurrency(vendor.operational)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Hidden Costs</span>
                        <span>{formatCurrency(vendor.hidden)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">ROI</p>
                        <p className="font-bold">{Math.round(vendor.roi)}%</p>
                      </div>
                      <div>\
