"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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
} from "recharts"
import { Download, Calculator, TrendingUp, Shield, Clock, DollarSign } from "lucide-react"
import {
  performTCOAnalysis,
  exportTCOAnalysis,
  type TCOInputs,
  type TCOAnalysisResult,
} from "@/src/lib/calculators/tco"
import type { OrgSizeId, IndustryId } from "@/src/types/common"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

const ORG_SIZES: { value: OrgSizeId; label: string }[] = [
  { value: "small_business", label: "Small Business (1-100 employees)" },
  { value: "mid_market", label: "Mid-Market (101-1,000 employees)" },
  { value: "enterprise", label: "Enterprise (1,001-10,000 employees)" },
  { value: "global_enterprise", label: "Global Enterprise (10,000+ employees)" },
]

const INDUSTRIES: { value: IndustryId; label: string }[] = [
  { value: "healthcare", label: "Healthcare" },
  { value: "financial_services", label: "Financial Services" },
  { value: "government", label: "Government" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "education", label: "Education" },
  { value: "technology", label: "Technology" },
  { value: "retail", label: "Retail" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "energy_utilities", label: "Energy & Utilities" },
  { value: "legal_services", label: "Legal Services" },
  { value: "insurance", label: "Insurance" },
  { value: "pharmaceuticals", label: "Pharmaceuticals" },
]

const REGIONS = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East & Africa"]

const COMPLIANCE_STANDARDS = [
  { id: "hipaa", label: "HIPAA" },
  { id: "pci_dss", label: "PCI-DSS" },
  { id: "sox", label: "SOX" },
  { id: "gdpr", label: "GDPR" },
  { id: "iso27001", label: "ISO 27001" },
]

export default function TCOAnalyzer() {
  const [inputs, setInputs] = useState<TCOInputs>({
    orgSize: "mid_market",
    industry: "technology",
    employeeCount: 500,
    deviceCount: 750,
    analysisYears: 3,
    region: "North America",
    complianceRequirements: [],
  })

  const [analysis, setAnalysis] = useState<TCOAnalysisResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: keyof TCOInputs, value: any) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handleComplianceChange = (standardId: string, checked: boolean) => {
    setInputs((prev) => ({
      ...prev,
      complianceRequirements: checked
        ? [...prev.complianceRequirements, standardId]
        : prev.complianceRequirements.filter((id) => id !== standardId),
    }))
  }

  const calculateTCO = async () => {
    setIsCalculating(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const result = performTCOAnalysis(inputs)
      setAnalysis(result)
    } catch (error) {
      console.error("Error calculating TCO:", error)
    } finally {
      setIsCalculating(false)
    }
  }

  const exportResults = (format: "csv" | "pdf" | "excel") => {
    if (!analysis) return

    const exportData = exportTCOAnalysis(analysis, format)

    if (format === "csv") {
      const blob = new Blob([exportData as string], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "tco-analysis.csv"
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const chartData = useMemo(() => {
    if (!analysis) return []

    return analysis.vendors.slice(0, 6).map((vendor) => ({
      name: vendor.vendorName.replace(/\s+/g, "\n"),
      totalTCO: vendor.totalTCO,
      roi: vendor.roi,
      payback: vendor.paybackPeriod,
    }))
  }, [analysis])

  const pieData = useMemo(() => {
    if (!analysis || !analysis.vendors[0]) return []

    const vendor = analysis.vendors[0]
    const breakdown = vendor.yearlyBreakdown[0]

    return [
      { name: "Licensing", value: breakdown.licensing },
      { name: "Hardware", value: breakdown.hardware },
      { name: "Personnel", value: breakdown.personnel },
      { name: "Support", value: breakdown.support },
      { name: "Implementation", value: breakdown.implementation },
      { name: "Hidden Costs", value: breakdown.hiddenCosts },
    ].filter((item) => item.value > 0)
  }, [analysis])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">TCO Calculator</h1>
        <p className="text-muted-foreground">Compare total cost of ownership across NAC vendors</p>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Configuration
          </CardTitle>
          <CardDescription>Enter your organization details to calculate TCO</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orgSize">Organization Size</Label>
              <Select value={inputs.orgSize} onValueChange={(value: OrgSizeId) => handleInputChange("orgSize", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ORG_SIZES.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={inputs.industry}
                onValueChange={(value: IndustryId) => handleInputChange("industry", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry.value} value={industry.value}>
                      {industry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select value={inputs.region} onValueChange={(value) => handleInputChange("region", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
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
                value={inputs.employeeCount}
                onChange={(e) => handleInputChange("employeeCount", Number.parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deviceCount">Device Count</Label>
              <Input
                id="deviceCount"
                type="number"
                value={inputs.deviceCount}
                onChange={(e) => handleInputChange("deviceCount", Number.parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="analysisYears">Analysis Period (Years)</Label>
              <Select
                value={inputs.analysisYears.toString()}
                onValueChange={(value) => handleInputChange("analysisYears", Number.parseInt(value))}
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
          </div>

          <div className="space-y-3">
            <Label>Compliance Requirements</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {COMPLIANCE_STANDARDS.map((standard) => (
                <div key={standard.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={standard.id}
                    checked={inputs.complianceRequirements.includes(standard.id)}
                    onCheckedChange={(checked) => handleComplianceChange(standard.id, checked as boolean)}
                  />
                  <Label htmlFor={standard.id} className="text-sm">
                    {standard.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={calculateTCO} disabled={isCalculating} className="w-full">
            {isCalculating ? "Calculating..." : "Calculate TCO"}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Portnox Advantage</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${analysis.portnoxAdvantage.costSavings.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Time to Value</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {analysis.portnoxAdvantage.timeToValue} months faster
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Risk Reduction</p>
                    <p className="text-2xl font-bold text-purple-600">{analysis.portnoxAdvantage.riskReduction}%</p>
                  </div>
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Compliance Coverage</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {analysis.portnoxAdvantage.complianceAdvantage}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Analysis */}
          <Tabs defaultValue="comparison" className="space-y-4">
            <TabsList>
              <TabsTrigger value="comparison">Vendor Comparison</TabsTrigger>
              <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
              <TabsTrigger value="timeline">Timeline Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Cost of Ownership Comparison</CardTitle>
                  <CardDescription>{inputs.analysisYears}-year TCO analysis across vendors</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Total TCO"]} />
                      <Bar dataKey="totalTCO" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vendor Rankings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.vendors.slice(0, 6).map((vendor, index) => (
                      <div key={vendor.vendorId} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant={index === 0 ? "default" : "secondary"}>#{index + 1}</Badge>
                          <div>
                            <h4 className="font-semibold">{vendor.vendorName}</h4>
                            <p className="text-sm text-muted-foreground">
                              Payback: {vendor.paybackPeriod} months | ROI: {vendor.roi}%
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${vendor.totalTCO.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            ${vendor.averageYearlyTCO.toLocaleString()}/year
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown - {analysis.vendors[0]?.vendorName}</CardTitle>
                  <CardDescription>First year cost distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Multi-Year Cost Projection</CardTitle>
                  <CardDescription>Annual costs over {inputs.analysisYears} years</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                      data={analysis.vendors[0]?.yearlyBreakdown.map((year, index) => ({
                        year: `Year ${index + 1}`,
                        total: year.total,
                        licensing: year.licensing,
                        personnel: year.personnel,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                      <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="licensing" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="personnel" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      {index + 1}
                    </Badge>
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle>Export Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => exportResults("csv")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button variant="outline" onClick={() => exportResults("pdf")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" onClick={() => exportResults("excel")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Excel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
