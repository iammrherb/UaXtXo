"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DollarSign, Calculator, AlertTriangle, CheckCircle } from "lucide-react"
import { useDashboardSettings } from "@/context/DashboardContext"

// Enhanced vendor data with comprehensive TCO breakdown
const vendorTCOData = {
  portnox: {
    name: "Portnox CLEAR",
    licensing: { year1: 27000, year3: 81000, year5: 135000 },
    implementation: { year1: 15000, year3: 15000, year5: 15000 },
    maintenance: { year1: 5400, year3: 16200, year5: 27000 },
    training: { year1: 2500, year3: 2500, year5: 2500 },
    infrastructure: { year1: 0, year3: 0, year5: 0 },
    staffing: { year1: 18000, year3: 54000, year5: 90000 },
    total: { year1: 67900, year3: 168700, year5: 269500 },
  },
  cisco: {
    name: "Cisco ISE",
    licensing: { year1: 62500, year3: 187500, year5: 312500 },
    implementation: { year1: 45000, year3: 45000, year5: 45000 },
    maintenance: { year1: 18750, year3: 56250, year5: 93750 },
    training: { year1: 15000, year3: 15000, year5: 15000 },
    infrastructure: { year1: 35000, year3: 35000, year5: 35000 },
    staffing: { year1: 54000, year3: 162000, year5: 270000 },
    total: { year1: 230250, year3: 500750, year5: 771250 },
  },
  aruba: {
    name: "Aruba ClearPass",
    licensing: { year1: 47500, year3: 142500, year5: 237500 },
    implementation: { year1: 30000, year3: 30000, year5: 30000 },
    maintenance: { year1: 14250, year3: 42750, year5: 71250 },
    training: { year1: 8000, year3: 8000, year5: 8000 },
    infrastructure: { year1: 20000, year3: 20000, year5: 20000 },
    staffing: { year1: 36000, year3: 108000, year5: 180000 },
    total: { year1: 155750, year3: 351250, year5: 546750 },
  },
  forescout: {
    name: "Forescout",
    licensing: { year1: 55000, year3: 165000, year5: 275000 },
    implementation: { year1: 40000, year3: 40000, year5: 40000 },
    maintenance: { year1: 16500, year3: 49500, year5: 82500 },
    training: { year1: 12000, year3: 12000, year5: 12000 },
    infrastructure: { year1: 25000, year3: 25000, year5: 25000 },
    staffing: { year1: 45000, year3: 135000, year5: 225000 },
    total: { year1: 193500, year3: 426500, year5: 659500 },
  },
}

const hiddenCostFactors = [
  { category: "Downtime During Implementation", portnox: 0, cisco: 25000, aruba: 15000, forescout: 20000 },
  { category: "Additional Hardware", portnox: 0, cisco: 35000, aruba: 20000, forescout: 25000 },
  { category: "Extended Training", portnox: 2500, cisco: 15000, aruba: 8000, forescout: 12000 },
  { category: "Integration Complexity", portnox: 5000, cisco: 30000, aruba: 18000, forescout: 22000 },
  { category: "Ongoing Support", portnox: 8000, cisco: 25000, aruba: 15000, forescout: 18000 },
]

const roiMetrics = {
  portnox: {
    breachRiskReduction: 450000,
    operationalSavings: 125000,
    complianceSavings: 75000,
    insuranceSavings: 25000,
    productivityGains: 85000,
  },
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]

export function TcoAnalysisView() {
  const { settings } = useDashboardSettings()
  const [selectedTimeframe, setSelectedTimeframe] = useState(3)
  const [includeHiddenCosts, setIncludeHiddenCosts] = useState(true)

  // Calculate TCO data based on settings
  const tcoComparison = useMemo(() => {
    const timeframeKey = `year${selectedTimeframe}` as keyof typeof vendorTCOData.portnox.total

    return Object.entries(vendorTCOData).map(([key, vendor]) => ({
      vendor: vendor.name,
      vendorKey: key,
      licensing: vendor.licensing[timeframeKey],
      implementation: vendor.implementation[timeframeKey],
      maintenance: vendor.maintenance[timeframeKey],
      training: vendor.training[timeframeKey],
      infrastructure: vendor.infrastructure[timeframeKey],
      staffing: vendor.staffing[timeframeKey],
      total: vendor.total[timeframeKey],
      savings: vendor.total[timeframeKey] - vendorTCOData.portnox.total[timeframeKey],
    }))
  }, [selectedTimeframe])

  const costBreakdownData = useMemo(() => {
    const portnoxData = vendorTCOData.portnox
    const timeframeKey = `year${selectedTimeframe}` as keyof typeof portnoxData.total

    return [
      { name: "Licensing", value: portnoxData.licensing[timeframeKey], color: "#10b981" },
      { name: "Implementation", value: portnoxData.implementation[timeframeKey], color: "#3b82f6" },
      { name: "Maintenance", value: portnoxData.maintenance[timeframeKey], color: "#f59e0b" },
      { name: "Training", value: portnoxData.training[timeframeKey], color: "#ef4444" },
      { name: "Staffing", value: portnoxData.staffing[timeframeKey], color: "#8b5cf6" },
    ]
  }, [selectedTimeframe])

  return (
    <div className="space-y-6">
      {/* TCO Overview Alert */}
      <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <Calculator className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          <strong>TCO Analysis:</strong> Portnox CLEAR delivers 65% lower total cost of ownership compared to Cisco ISE
          over {selectedTimeframe} years, with savings of{" "}
          <strong>${(tcoComparison.find((v) => v.vendorKey === "cisco")?.savings || 0).toLocaleString()}</strong>
        </AlertDescription>
      </Alert>

      {/* TCO Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tcoComparison.map((vendor, index) => (
          <Card
            key={vendor.vendorKey}
            className={vendor.vendorKey === "portnox" ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{vendor.vendor}</CardTitle>
              <DollarSign
                className={`h-4 w-4 ${vendor.vendorKey === "portnox" ? "text-green-600" : "text-muted-foreground"}`}
              />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${vendor.vendorKey === "portnox" ? "text-green-600" : ""}`}>
                ${vendor.total.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">{selectedTimeframe}-year TCO</p>
              {vendor.vendorKey !== "portnox" && (
                <div className="mt-2">
                  <Badge variant="destructive" className="text-xs">
                    +${vendor.savings.toLocaleString()} vs Portnox
                  </Badge>
                </div>
              )}
              {vendor.vendorKey === "portnox" && (
                <div className="mt-2">
                  <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                    Lowest TCO
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="comparison" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="comparison">TCO Comparison</TabsTrigger>
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="hidden">Hidden Costs</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* TCO Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Total Cost of Ownership Comparison</CardTitle>
                <CardDescription>{selectedTimeframe}-Year Analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-2">
                  {[1, 3, 5].map((years) => (
                    <Button
                      key={years}
                      variant={selectedTimeframe === years ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTimeframe(years)}
                    >
                      {years} Year{years > 1 ? "s" : ""}
                    </Button>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={tcoComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="total" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Savings Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Savings vs Portnox CLEAR</CardTitle>
                <CardDescription>Potential savings by choosing Portnox</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tcoComparison
                    .filter((v) => v.vendorKey !== "portnox")
                    .map((vendor) => (
                      <div key={vendor.vendorKey} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{vendor.vendor}</span>
                          <span className="font-bold text-green-600">${vendor.savings.toLocaleString()} saved</span>
                        </div>
                        <Progress value={(vendor.savings / vendor.total) * 100} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {Math.round((vendor.savings / vendor.total) * 100)}% cost reduction
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cost Breakdown Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Portnox CLEAR Cost Breakdown</CardTitle>
                <CardDescription>{selectedTimeframe}-year cost distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={costBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {costBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detailed Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Cost Analysis</CardTitle>
                <CardDescription>Cost category comparison across vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={tcoComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="licensing" stackId="a" fill="#10b981" name="Licensing" />
                    <Bar dataKey="implementation" stackId="a" fill="#3b82f6" name="Implementation" />
                    <Bar dataKey="maintenance" stackId="a" fill="#f59e0b" name="Maintenance" />
                    <Bar dataKey="training" stackId="a" fill="#ef4444" name="Training" />
                    <Bar dataKey="staffing" stackId="a" fill="#8b5cf6" name="Staffing" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hidden" className="space-y-6">
          <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              <strong>Hidden Costs Alert:</strong> Traditional NAC solutions often have significant hidden costs that
              can increase TCO by 30-50%. Portnox CLEAR's cloud-native architecture eliminates most of these hidden
              expenses.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hidden Costs Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Hidden Cost Comparison</CardTitle>
                <CardDescription>Often overlooked expenses in NAC implementations</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={hiddenCostFactors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="portnox" fill="#10b981" name="Portnox CLEAR" />
                    <Bar dataKey="cisco" fill="#3b82f6" name="Cisco ISE" />
                    <Bar dataKey="aruba" fill="#f59e0b" name="Aruba ClearPass" />
                    <Bar dataKey="forescout" fill="#ef4444" name="Forescout" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Hidden Cost Details */}
            <Card>
              <CardHeader>
                <CardTitle>Hidden Cost Analysis</CardTitle>
                <CardDescription>Breakdown of additional expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hiddenCostFactors.map((factor) => (
                    <div key={factor.category} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{factor.category}</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>Portnox:</span>
                            <span className="font-bold text-green-600">${factor.portnox.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Cisco ISE:</span>
                            <span className="font-bold">${factor.cisco.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>Aruba:</span>
                            <span className="font-bold">${factor.aruba.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Forescout:</span>
                            <span className="font-bold">${factor.forescout.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roi" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ROI Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Return on Investment Analysis</CardTitle>
                <CardDescription>Portnox CLEAR business value realization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">247%</div>
                      <p className="text-sm text-muted-foreground">24-Month ROI</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">12 mo</div>
                      <p className="text-sm text-muted-foreground">Payback Period</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(roiMetrics.portnox).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="capitalize text-sm">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <span className="font-bold text-green-600">${value.toLocaleString()}/year</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total Annual Benefits:</span>
                      <span className="text-green-600">
                        $
                        {Object.values(roiMetrics.portnox)
                          .reduce((a, b) => a + b, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ROI Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>ROI Timeline Projection</CardTitle>
                <CardDescription>Cumulative benefits over 5 years</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart
                    data={[
                      { year: "Year 0", investment: -67900, benefits: 0, netROI: -67900 },
                      { year: "Year 1", investment: -67900, benefits: 760000, netROI: 692100 },
                      { year: "Year 2", investment: -135800, benefits: 1520000, netROI: 1384200 },
                      { year: "Year 3", investment: -168700, benefits: 2280000, netROI: 2111300 },
                      { year: "Year 4", investment: -219100, benefits: 3040000, netROI: 2820900 },
                      { year: "Year 5", investment: -269500, benefits: 3800000, netROI: 3530500 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Area
                      type="monotone"
                      dataKey="netROI"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                      name="Net ROI"
                    />
                    <Line type="monotone" dataKey="benefits" stroke="#3b82f6" name="Cumulative Benefits" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom CTA */}
      <Card className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <CheckCircle className="h-5 w-5" />
            Ready to Realize These Savings?
          </CardTitle>
          <CardDescription>
            Start your TCO analysis with a personalized assessment and 24-hour proof of concept
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Calculate My TCO
            </Button>
            <Button variant="outline" size="lg">
              Download TCO Report
            </Button>
            <Button variant="ghost" size="lg">
              Schedule Consultation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
