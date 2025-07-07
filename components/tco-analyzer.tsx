"use client"

import { useState, useMemo, useRef } from "react"
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
import { IndustryAnalysisDashboard } from "./industry-analysis-view"
import { ExecutiveReportGenerator } from "./executive-report-view"
import { VendorScorecard } from "./vendor-comparison-matrix"
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

  // Chart refs for capturing
  const tcoChartRef = useRef<HTMLDivElement>(null)
  const costBreakdownChartRef = useRef<HTMLDivElement>(null)
  const savingsChartRef = useRef<HTMLDivElement>(null)
  const vendorComparisonChartRef = useRef<HTMLDivElement>(null)
  const roiChartRef = useRef<HTMLDivElement>(null)
  const riskChartRef = useRef<HTMLDivElement>(null)

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
        },
      )

      const exporter = new NACAnalysisExporter(exportData)

      switch (format) {
        case ExportFormat.PDF:
          const pdfBlob = await exporter.exportToPDF()
          const pdfUrl = URL.createObjectURL(pdfBlob)
          const pdfLink = document.createElement("a")
          pdfLink.href = pdfUrl
          pdfLink.download = `NAC_Analysis_Report_${new Date().toISOString().split("T")[0]}.pdf`
          document.body.appendChild(pdfLink)
          pdfLink.click()
          document.body.removeChild(pdfLink)
          URL.revokeObjectURL(pdfUrl)
          break
        case ExportFormat.EXCEL:
          const csvContent = await exporter.exportToCSV()
          const csvBlob = new Blob([csvContent], { type: "text/csv" })
          const csvUrl = URL.createObjectURL(csvBlob)
          const csvLink = document.createElement("a")
          csvLink.href = csvUrl
          csvLink.download = `NAC_Analysis_Data_${new Date().toISOString().split("T")[0]}.csv`
          document.body.appendChild(csvLink)
          csvLink.click()
          document.body.removeChild(csvLink)
          URL.revokeObjectURL(csvUrl)
          break
        default:
          await exportAnalysis(exportData, format)
      }
    } catch (error) {
      console.error("Export failed:", error)
      alert("Export failed. Please try again.")
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

      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Configuration</CardTitle>
          <CardDescription>Configure your organization's parameters for accurate TCO analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
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
              <Label htmlFor="deployment">Deployment Model</Label>
              <Select value={deploymentModel} onValueChange={setDeploymentModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select deployment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CLOUD">Cloud</SelectItem>
                  <SelectItem value="ON_PREMISE">On-Premise</SelectItem>
                  <SelectItem value="HYBRID">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeframe">Analysis Timeframe</Label>
              <Select
                value={timeframe.toString()}
                onValueChange={(value) => setTimeframe(Number.parseInt(value) as 1 | 3 | 5)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Year</SelectItem>
                  <SelectItem value="3">3 Years</SelectItem>
                  <SelectItem value="5">5 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Switch id="existing-nac" checked={hasExistingNAC} onCheckedChange={setHasExistingNAC} />
              <Label htmlFor="existing-nac">Has Existing NAC</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="risk-analysis" checked={includeRiskAnalysis} onCheckedChange={setIncludeRiskAnalysis} />
              <Label htmlFor="risk-analysis">Include Risk Analysis</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="compliance" checked={includeCompliance} onCheckedChange={setIncludeCompliance} />
              <Label htmlFor="compliance">Include Compliance</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Analysis Tabs */}
      <Tabs defaultValue="tco-comparison" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="tco-comparison">TCO Analysis</TabsTrigger>
          <TabsTrigger value="cost-breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="roi-analysis">ROI Analysis</TabsTrigger>
          <TabsTrigger value="vendor-comparison">Vendor Matrix</TabsTrigger>
          <TabsTrigger value="industry-analysis">Industry Analysis</TabsTrigger>
          <TabsTrigger value="executive-report">Executive Report</TabsTrigger>
        </TabsList>

        {/* TCO Comparison Tab */}
        <TabsContent value="tco-comparison" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* TCO Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Total Cost of Ownership Comparison</CardTitle>
                <CardDescription>{timeframe}-Year TCO Analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div ref={tcoChartRef} data-chart="tco-comparison">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="vendor" />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Bar dataKey="totalCost" fill="#3b82f6" name="Total Cost">
                        {comparisonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.vendorKey === "PORTNOX" ? "#10b981" : "#3b82f6"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Financial Metrics</CardTitle>
                <CardDescription>Portnox CLEAR vs Competition</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Cost Savings</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(savings)}</div>
                    <div className="text-sm text-muted-foreground">{percentSavings}% reduction</div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">ROI</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{Math.round(portnoxData?.roi || 5506)}%</div>
                    <div className="text-sm text-muted-foreground">{timeframe}-year return</div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">Payback</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.round((portnoxData?.paybackPeriod || 195) / 30)} mo
                    </div>
                    <div className="text-sm text-muted-foreground">Break-even point</div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Risk Reduction</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">92%</div>
                    <div className="text-sm text-muted-foreground">Security improvement</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold">Why Portnox CLEAR Wins:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Zero infrastructure investment required</li>
                    <li>• 95% faster deployment (7 days vs 6-9 months)</li>
                    <li>• 90% reduction in administrative overhead</li>
                    <li>• Cloud-native architecture with automatic updates</li>
                    <li>• Comprehensive zero-trust security model</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vendor Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Vendor Comparison</CardTitle>
              <CardDescription>Complete TCO breakdown by vendor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Vendor</th>
                      <th className="text-right p-2">Total Cost</th>
                      <th className="text-right p-2">Software</th>
                      <th className="text-right p-2">Hardware</th>
                      <th className="text-right p-2">Implementation</th>
                      <th className="text-right p-2">Operational</th>
                      <th className="text-right p-2">ROI</th>
                      <th className="text-right p-2">Payback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((vendor, index) => (
                      <tr
                        key={vendor.vendorKey}
                        className={`border-b ${vendor.vendorKey === "PORTNOX" ? "bg-green-50 font-semibold" : ""}`}
                      >
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            {vendor.vendor}
                            {vendor.vendorKey === "PORTNOX" && (
                              <Badge variant="default" className="bg-green-500">
                                Recommended
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="text-right p-2">{formatCurrency(vendor.totalCost)}</td>
                        <td className="text-right p-2">{formatCurrency(vendor.software)}</td>
                        <td className="text-right p-2">{formatCurrency(vendor.hardware)}</td>
                        <td className="text-right p-2">{formatCurrency(vendor.implementation)}</td>
                        <td className="text-right p-2">{formatCurrency(vendor.operational)}</td>
                        <td className="text-right p-2">{Math.round(vendor.roi)}%</td>
                        <td className="text-right p-2">{Math.round(vendor.paybackPeriod / 30)} mo</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost Breakdown Tab */}
        <TabsContent value="cost-breakdown" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown by Category</CardTitle>
                <CardDescription>Detailed cost analysis across all vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <div ref={costBreakdownChartRef} data-chart="cost-breakdown">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="vendor" />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Bar dataKey="software" stackId="a" fill="#3b82f6" name="Software" />
                      <Bar dataKey="hardware" stackId="a" fill="#ef4444" name="Hardware" />
                      <Bar dataKey="implementation" stackId="a" fill="#f59e0b" name="Implementation" />
                      <Bar dataKey="operational" stackId="a" fill="#8b5cf6" name="Operational" />
                      <Bar dataKey="hidden" stackId="a" fill="#6b7280" name="Hidden Costs" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portnox Cost Advantage</CardTitle>
                <CardDescription>Why Portnox delivers superior value</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Zero Hardware Costs</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      100% Cloud
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Minimal Implementation</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      7 Days
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Low Operational Overhead</span>
                    <Badge variant="outline" className="bg-purple-100 text-purple-800">
                      90% Less
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium">No Hidden Costs</span>
                    <Badge variant="outline" className="bg-orange-100 text-orange-800">
                      Transparent
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold">Cost Savings Breakdown:</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Hardware Elimination:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(comparisonData.find((d) => d.vendorKey === "CISCO_ISE")?.hardware || 200000)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reduced Implementation:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(
                          (comparisonData.find((d) => d.vendorKey === "CISCO_ISE")?.implementation || 150000) -
                            (portnoxData?.implementation || 25000),
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lower Operational Costs:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(
                          (comparisonData.find((d) => d.vendorKey === "CISCO_ISE")?.operational || 100000) -
                            (portnoxData?.operational || 50000),
                        )}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total Savings:</span>
                      <span className="text-green-600">{formatCurrency(savings)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ROI Analysis Tab */}
        <TabsContent value="roi-analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ROI Projection Over Time</CardTitle>
                <CardDescription>Return on investment analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div ref={roiChartRef} data-chart="roi-analysis">
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart
                      data={Array.from({ length: timeframe }, (_, i) => ({
                        year: i + 1,
                        portnox: ((portnoxData?.roi || 5506) * (i + 1)) / timeframe,
                        cisco: (285 * (i + 1)) / timeframe,
                        aruba: (420 * (i + 1)) / timeframe,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${Math.round(Number(value))}%`} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="portnox"
                        stackId="1"
                        stroke="#10b981"
                        fill="#10b981"
                        name="Portnox CLEAR"
                      />
                      <Area
                        type="monotone"
                        dataKey="cisco"
                        stackId="2"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        name="Cisco ISE"
                      />
                      <Area
                        type="monotone"
                        dataKey="aruba"
                        stackId="3"
                        stroke="#f59e0b"
                        fill="#f59e0b"
                        name="Aruba ClearPass"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cumulative Savings Analysis</CardTitle>
                <CardDescription>Total savings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div ref={savingsChartRef} data-chart="savings-analysis">
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart
                      data={Array.from({ length: timeframe }, (_, i) => ({
                        year: i + 1,
                        savings: savings * (i + 1),
                        investment: ((portnoxData?.totalCost || 230000) * (i + 1)) / timeframe,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="savings"
                        stroke="#10b981"
                        fill="#10b981"
                        name="Cumulative Savings"
                      />
                      <Area type="monotone" dataKey="investment" stroke="#ef4444" fill="#ef4444" name="Investment" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment & Mitigation</CardTitle>
              <CardDescription>Security risk analysis and financial impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div ref={riskChartRef} data-chart="risk-assessment">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-600">28%</div>
                    <p className="text-sm text-muted-foreground">Current Breach Risk</p>
                    <p className="text-xs text-red-600 mt-2">Without NAC Protection</p>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">4%</div>
                    <p className="text-sm text-muted-foreground">Risk with Portnox</p>
                    <p className="text-xs text-green-600 mt-2">86% Risk Reduction</p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">$4.9M</div>
                    <p className="text-sm text-muted-foreground">Annual Risk Value</p>
                    <p className="text-xs text-blue-600 mt-2">Potential Loss Avoided</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vendor Comparison Tab */}
        <TabsContent value="vendor-comparison">
          <div ref={vendorComparisonChartRef} data-chart="vendor-comparison">
            <VendorScorecard
              selectedVendors={selectedVendors}
              deviceCount={deviceCount[0]}
              industry={selectedIndustry}
            />
          </div>
        </TabsContent>

        {/* Industry Analysis Tab */}
        <TabsContent value="industry-analysis">
          <IndustryAnalysisDashboard
            selectedIndustry={selectedIndustry}
            deviceCount={deviceCount[0]}
            timeframe={timeframe}
          />
        </TabsContent>

        {/* Executive Report Tab */}
        <TabsContent value="executive-report">
          <ExecutiveReportGenerator
            tcoAnalysis={tcoAnalysis}
            configuration={{
              industry: selectedIndustry,
              deviceCount: deviceCount[0],
              timeframe,
              deploymentModel,
            }}
            onExport={handleExport}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
