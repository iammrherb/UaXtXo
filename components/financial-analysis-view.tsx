"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  ComposedChart,
  Scatter,
  ScatterChart,
  PieChart,
  Pie,
} from "recharts"
import { Award, Info } from "lucide-react"

// Import the enhanced vendor data
import { enhancedVendorDatabase, calculateTotalCostOfOwnership, calculateROI } from "@/lib/vendors/enhanced-vendor-data"
import { industryComplianceData, calculateComplianceSavings } from "@/lib/compliance/industry-compliance-data"

interface FinancialAnalysisViewProps {
  selectedVendors: string[]
  devices: number
  users: number
  industry: string
  projectionYears: number
}

export default function FinancialAnalysisView({
  selectedVendors,
  devices = 500,
  users = 1000,
  industry = "healthcare",
  projectionYears = 3,
}: FinancialAnalysisViewProps) {
  const [includeCompliance, setIncludeCompliance] = useState(true)
  const [includeRiskReduction, setIncludeRiskReduction] = useState(true)
  const [hasExistingNAC, setHasExistingNAC] = useState(false)
  const [existingVendor, setExistingVendor] = useState("cisco_ise")

  // Calculate TCO for all selected vendors
  const tcoAnalysis = useMemo(() => {
    const results: Record<string, any> = {}

    selectedVendors.forEach((vendorId) => {
      const vendor = enhancedVendorDatabase[vendorId]
      if (vendor) {
        const tco = calculateTotalCostOfOwnership(vendor, devices, projectionYears)
        const roi = calculateROI(vendor, tco, devices)

        // Calculate compliance savings if applicable
        let complianceSavings = 0
        if (includeCompliance && industryComplianceData[industry]) {
          const savings = calculateComplianceSavings(industryComplianceData[industry], vendor.security.zeroTrustScore)
          complianceSavings = savings.totalSavings
        }

        results[vendorId] = {
          vendor,
          tco,
          roi,
          complianceSavings,
          totalBenefits: roi.totalSavings + complianceSavings,
        }
      }
    })

    return results
  }, [selectedVendors, devices, projectionYears, includeCompliance, industry])

  // Prepare comparison data for charts
  const comparisonData = Object.entries(tcoAnalysis).map(([vendorId, data]) => ({
    vendor: data.vendor.name,
    year1: data.tco.year1,
    year3: data.tco.year3,
    year5: data.tco.year5,
    roi: data.totalBenefits,
    payback: data.roi.paybackPeriod,
    zeroTrustScore: data.vendor.security.zeroTrustScore,
  }))

  // Calculate savings vs baseline (typically Cisco ISE)
  const baselineVendor = tcoAnalysis["cisco_ise"] || Object.values(tcoAnalysis)[0]
  const savingsData = Object.entries(tcoAnalysis)
    .map(([vendorId, data]) => {
      if (!baselineVendor) return null

      const savings3Year = baselineVendor.tco.year3 - data.tco.year3
      const savingsPercent = (savings3Year / baselineVendor.tco.year3) * 100

      return {
        vendor: data.vendor.name,
        savings: savings3Year,
        savingsPercent: Math.round(savingsPercent),
        totalBenefits: data.totalBenefits,
      }
    })
    .filter(Boolean)

  // Risk-adjusted ROI calculation
  const riskAdjustedData = Object.entries(tcoAnalysis).map(([vendorId, data]) => ({
    vendor: data.vendor.name,
    investment: data.tco.year1,
    riskReduction: data.roi.breachRiskReduction,
    operationalSavings: data.roi.operationalSavings,
    complianceSavings: data.complianceSavings,
    netValue: data.totalBenefits - data.tco.year1,
  }))

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Analysis Configuration</CardTitle>
          <CardDescription>Adjust parameters for accurate financial modeling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch checked={includeCompliance} onCheckedChange={setIncludeCompliance} />
                <Label>Include Compliance Savings</Label>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch checked={includeRiskReduction} onCheckedChange={setIncludeRiskReduction} />
                <Label>Include Risk Reduction Benefits</Label>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch checked={hasExistingNAC} onCheckedChange={setHasExistingNAC} />
                <Label>Existing NAC Migration</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Analysis Tabs */}
      <Tabs defaultValue="tco-comparison" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tco-comparison">TCO Comparison</TabsTrigger>
          <TabsTrigger value="roi-analysis">ROI Analysis</TabsTrigger>
          <TabsTrigger value="cost-breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="risk-benefits">Risk & Benefits</TabsTrigger>
        </TabsList>

        {/* TCO Comparison Tab */}
        <TabsContent value="tco-comparison" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* TCO Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Total Cost of Ownership</CardTitle>
                <CardDescription>{projectionYears}-Year TCO Comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" angle={-15} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <RechartsTooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="year1" fill="#8884d8" name="Year 1" />
                    <Bar dataKey="year3" fill="#82ca9d" name="Year 3" />
                    {projectionYears >= 5 && <Bar dataKey="year5" fill="#ffc658" name="Year 5" />}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cost Savings Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Savings vs Baseline</CardTitle>
                <CardDescription>3-year savings compared to market leader</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savingsData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.vendor}</span>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">${(item.savings / 1000).toFixed(0)}k</div>
                          <div className="text-sm text-muted-foreground">{item.savingsPercent}% savings</div>
                        </div>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${Math.min(Math.abs(item.savingsPercent), 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* TCO Trend Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>TCO Trend Analysis</CardTitle>
              <CardDescription>Cumulative costs over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={[
                    {
                      year: "Year 0",
                      ...Object.fromEntries(Object.entries(tcoAnalysis).map(([id, data]) => [data.vendor.name, 0])),
                    },
                    {
                      year: "Year 1",
                      ...Object.fromEntries(
                        Object.entries(tcoAnalysis).map(([id, data]) => [data.vendor.name, data.tco.year1]),
                      ),
                    },
                    {
                      year: "Year 2",
                      ...Object.fromEntries(
                        Object.entries(tcoAnalysis).map(([id, data]) => [data.vendor.name, data.tco.year2]),
                      ),
                    },
                    {
                      year: "Year 3",
                      ...Object.fromEntries(
                        Object.entries(tcoAnalysis).map(([id, data]) => [data.vendor.name, data.tco.year3]),
                      ),
                    },
                    ...(projectionYears >= 5
                      ? [
                          {
                            year: "Year 5",
                            ...Object.fromEntries(
                              Object.entries(tcoAnalysis).map(([id, data]) => [data.vendor.name, data.tco.year5]),
                            ),
                          },
                        ]
                      : []),
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <RechartsTooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  {Object.entries(tcoAnalysis).map(([id, data], index) => (
                    <Line
                      key={id}
                      type="monotone"
                      dataKey={data.vendor.name}
                      stroke={["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00"][index % 5]}
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROI Analysis Tab */}
        <TabsContent value="roi-analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ROI Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Return on Investment</CardTitle>
                <CardDescription>Payback period and ROI metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" angle={-15} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value.toFixed(1)}y`} />
                    <RechartsTooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="roi" fill="#82ca9d" name="Annual Benefits" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="payback"
                      stroke="#ff7300"
                      strokeWidth={3}
                      name="Payback (Years)"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Risk-Adjusted Returns */}
            <Card>
              <CardHeader>
                <CardTitle>Risk-Adjusted Returns</CardTitle>
                <CardDescription>Investment vs. risk-adjusted benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ScatterChart data={riskAdjustedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="investment"
                      name="Investment"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <YAxis
                      dataKey="netValue"
                      name="Net Value"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <RechartsTooltip
                      formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                      labelFormatter={(value) => `Investment: $${value.toLocaleString()}`}
                    />
                    <Scatter dataKey="netValue" fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Annual Benefits Breakdown</CardTitle>
              <CardDescription>Detailed breakdown of financial benefits by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(tcoAnalysis).map(([vendorId, data]) => (
                  <div key={vendorId} className="space-y-3">
                    <h4 className="font-semibold text-lg">{data.vendor.name}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-secondary rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          ${(data.roi.breachRiskReduction / 1000).toFixed(0)}k
                        </div>
                        <p className="text-sm text-muted-foreground">Risk Reduction</p>
                      </div>
                      <div className="text-center p-4 bg-secondary rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          ${(data.roi.operationalSavings / 1000).toFixed(0)}k
                        </div>
                        <p className="text-sm text-muted-foreground">Operational</p>
                      </div>
                      <div className="text-center p-4 bg-secondary rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          ${(data.roi.complianceSavings / 1000).toFixed(0)}k
                        </div>
                        <p className="text-sm text-muted-foreground">Compliance</p>
                      </div>
                      <div className="text-center p-4 bg-primary text-primary-foreground rounded-lg">
                        <div className="text-2xl font-bold">${(data.totalBenefits / 1000).toFixed(0)}k</div>
                        <p className="text-sm opacity-90">Total Annual</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost Breakdown Tab */}
        <TabsContent value="cost-breakdown" className="space-y-6">
          {Object.entries(tcoAnalysis).map(([vendorId, data]) => (
            <Card key={vendorId}>
              <CardHeader>
                <CardTitle>{data.vendor.name} - Cost Breakdown</CardTitle>
                <CardDescription>Detailed cost analysis over {projectionYears} years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Cost Categories Pie Chart */}
                  <div>
                    <h4 className="font-medium mb-4">Cost Distribution</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: "Software",
                              value: data.tco.breakdown.software.reduce((a: number, b: number) => a + b, 0),
                              fill: "#8884d8",
                            },
                            {
                              name: "Hardware",
                              value: data.tco.breakdown.hardware.reduce((a: number, b: number) => a + b, 0),
                              fill: "#82ca9d",
                            },
                            {
                              name: "Implementation",
                              value: data.tco.breakdown.implementation.reduce((a: number, b: number) => a + b, 0),
                              fill: "#ffc658",
                            },
                            {
                              name: "Operations",
                              value: data.tco.breakdown.operations.reduce((a: number, b: number) => a + b, 0),
                              fill: "#ff7300",
                            },
                            {
                              name: "Support",
                              value: data.tco.breakdown.support.reduce((a: number, b: number) => a + b, 0),
                              fill: "#00ff00",
                            },
                            {
                              name: "Training",
                              value: data.tco.breakdown.training.reduce((a: number, b: number) => a + b, 0),
                              fill: "#ff00ff",
                            },
                          ].filter((item) => item.value > 0)}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          dataKey="value"
                        />
                        <RechartsTooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Yearly Breakdown */}
                  <div>
                    <h4 className="font-medium mb-4">Annual Cost Breakdown</h4>
                    <div className="space-y-3">
                      {[
                        { label: "Year 1", value: data.tco.year1 },
                        { label: "Year 2", value: data.tco.year2 },
                        { label: "Year 3", value: data.tco.year3 },
                        ...(projectionYears >= 5 ? [{ label: "Year 5", value: data.tco.year5 }] : []),
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                          <span className="font-medium">{item.label}</span>
                          <span className="text-lg font-bold">${item.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Risk & Benefits Tab */}
        <TabsContent value="risk-benefits" className="space-y-6">
          {/* Security Score vs TCO */}
          <Card>
            <CardHeader>
              <CardTitle>Security Value Analysis</CardTitle>
              <CardDescription>Zero Trust maturity vs. total cost of ownership</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year3"
                    name="3-Year TCO"
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <YAxis dataKey="zeroTrustScore" name="Zero Trust Score" domain={[0, 100]} />
                  <RechartsTooltip
                    formatter={(value, name) => [
                      name === "3-Year TCO" ? `$${value.toLocaleString()}` : `${value}%`,
                      name,
                    ]}
                    labelFormatter={(value) => `Vendor: ${value}`}
                  />
                  <Scatter dataKey="zeroTrustScore" fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Risk Reduction Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Reduction Comparison</CardTitle>
              <CardDescription>Security risk mitigation by vendor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(tcoAnalysis).map(([vendorId, data]) => (
                  <div key={vendorId} className="space-y-3">
                    <h4 className="font-semibold">{data.vendor.name}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {Object.entries(data.vendor.security.riskReduction).map(([risk, reduction]) => (
                        <div key={risk} className="text-center p-3 bg-secondary rounded-lg">
                          <div className="text-lg font-bold text-green-600">{reduction}%</div>
                          <p className="text-xs text-muted-foreground capitalize">{risk.replace("_", " ")}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Executive Summary */}
      <Card className="border-2 border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-green-500" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(tcoAnalysis).length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(
                      ((baselineVendor?.tco.year3 - Object.values(tcoAnalysis)[0]?.tco.year3) /
                        baselineVendor?.tco.year3) *
                        100,
                    )}
                    %
                  </div>
                  <p className="text-sm text-muted-foreground">Lower TCO</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Object.values(tcoAnalysis)[0]?.roi.paybackPeriod.toFixed(1)} yr
                  </div>
                  <p className="text-sm text-muted-foreground">Payback Period</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Object.values(tcoAnalysis)[0]?.vendor.security.zeroTrustScore}%
                  </div>
                  <p className="text-sm text-muted-foreground">Zero Trust Score</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${(Object.values(tcoAnalysis)[0]?.totalBenefits / 1000).toFixed(0)}k
                  </div>
                  <p className="text-sm text-muted-foreground">Annual Benefits</p>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Key Finding:</strong> The analysis shows significant cost advantages and security benefits.
                  The recommended solution provides superior Zero Trust capabilities while reducing total cost of
                  ownership and delivering measurable ROI within the first year.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
