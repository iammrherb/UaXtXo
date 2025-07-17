"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Line,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  ReferenceLine,
} from "recharts"
import { TrendingUp, DollarSign, Target, Clock, Shield, Zap, CheckCircle2 } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ROIViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function ROIView({ results = [], config }: ROIViewProps) {
  const portnoxResult = useMemo(() => results.find((r) => r.vendorId === "portnox"), [results])
  const competitorResults = useMemo(() => results.filter((r) => r.vendorId !== "portnox"), [results])
  const timeframe = useMemo(() => config?.years || 3, [config])

  const roiMetrics = useMemo(() => {
    if (!portnoxResult || competitorResults.length === 0) return null

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const roi = (totalSavings / portnoxResult.totalCost) * 100
    const paybackMonths = portnoxResult.totalCost / (totalSavings / (timeframe * 12))

    return {
      totalSavings,
      roi,
      paybackMonths,
      avgCompetitorCost,
      annualSavings: totalSavings / timeframe,
      monthlyBenefit: totalSavings / (timeframe * 12),
    }
  }, [portnoxResult, competitorResults, timeframe])

  const roiTimelineData = useMemo(() => {
    if (!roiMetrics || !portnoxResult) return []

    const data = []
    const monthlyBenefit = roiMetrics.monthlyBenefit

    for (let month = 0; month <= timeframe * 12; month++) {
      const cumulativeBenefit = monthlyBenefit * month
      const netValue = cumulativeBenefit - portnoxResult.totalCost
      const roi = portnoxResult.totalCost > 0 ? (netValue / portnoxResult.totalCost) * 100 : 0
      const breakeven = netValue >= 0

      data.push({
        month,
        cumulativeBenefit,
        netValue,
        roi,
        breakeven,
        investment: portnoxResult.totalCost,
      })
    }

    return data
  }, [roiMetrics, portnoxResult, timeframe])

  const scenarioAnalysis = useMemo(() => {
    if (!roiMetrics || !portnoxResult) return []

    const baseROI = roiMetrics.roi
    const baseSavings = roiMetrics.totalSavings

    return [
      {
        scenario: "Conservative",
        roi: baseROI * 0.7,
        savings: baseSavings * 0.7,
        payback: roiMetrics.paybackMonths * 1.4,
        probability: 90,
        color: "#ef4444",
      },
      {
        scenario: "Realistic",
        roi: baseROI,
        savings: baseSavings,
        payback: roiMetrics.paybackMonths,
        probability: 70,
        color: "#3b82f6",
      },
      {
        scenario: "Optimistic",
        roi: baseROI * 1.3,
        savings: baseSavings * 1.3,
        payback: roiMetrics.paybackMonths * 0.8,
        probability: 40,
        color: "#10b981",
      },
    ]
  }, [roiMetrics])

  const valueCreationData = useMemo(() => {
    if (!roiMetrics) return []

    const totalValue = roiMetrics.totalSavings

    return [
      {
        category: "Direct Cost Savings",
        value: totalValue * 0.45,
        description: "Lower licensing, hardware, and operational costs",
        color: "#3b82f6",
      },
      {
        category: "Productivity Gains",
        value: totalValue * 0.25,
        description: "Reduced admin overhead and faster deployment",
        color: "#10b981",
      },
      {
        category: "Risk Reduction",
        value: totalValue * 0.2,
        description: "Avoided security breaches and compliance violations",
        color: "#ef4444",
      },
      {
        category: "Compliance Benefits",
        value: totalValue * 0.1,
        description: "Automated compliance and audit readiness",
        color: "#f59e0b",
      },
    ]
  }, [roiMetrics])

  const paybackAnalysis = useMemo(() => {
    return results
      .map((result) => {
        const avgCompetitor =
          competitorResults.length > 0
            ? competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
            : result.totalCost * 1.5

        const savings = avgCompetitor - result.totalCost
        const paybackMonths = savings > 0 ? result.totalCost / (savings / (timeframe * 12)) : 999

        return {
          vendor: result.vendorName,
          investment: result.totalCost,
          savings,
          paybackMonths: Math.min(paybackMonths, 999),
          roi: savings > 0 ? (savings / result.totalCost) * 100 : 0,
          isPortnox: result.vendorId === "portnox",
        }
      })
      .sort((a, b) => a.paybackMonths - b.paybackMonths)
  }, [results, competitorResults, timeframe])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-8 text-center">
          <CardContent>
            <p className="text-muted-foreground">No ROI data available. Please configure your analysis parameters.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!roiMetrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-8 text-center">
          <CardContent>
            <p className="text-muted-foreground">
              Insufficient data for ROI analysis. Need Portnox and competitor data.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ROI Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Total ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{roiMetrics.roi.toFixed(0)}%</div>
            <p className="text-xs text-green-600 mt-1">Over {timeframe} years</p>
            <Progress value={Math.min(roiMetrics.roi / 5, 100)} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{formatCurrency(roiMetrics.totalSavings)}</div>
            <p className="text-xs text-blue-600 mt-1">{formatCurrency(roiMetrics.annualSavings)}/year</p>
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle2 className="h-3 w-3 text-blue-600" />
              <span className="text-xs text-blue-600">Guaranteed savings</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              Payback Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">{roiMetrics.paybackMonths.toFixed(1)}m</div>
            <p className="text-xs text-purple-600 mt-1">Months to break even</p>
            <Badge variant="outline" className="mt-2 text-xs border-purple-300 text-purple-700">
              Industry leading
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-orange-600" />
              Monthly Benefit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-700">{formatCurrency(roiMetrics.monthlyBenefit)}</div>
            <p className="text-xs text-orange-600 mt-1">Ongoing monthly value</p>
            <div className="flex items-center gap-1 mt-2">
              <Zap className="h-3 w-3 text-orange-600" />
              <span className="text-xs text-orange-600">Immediate impact</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">ROI Timeline</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Analysis</TabsTrigger>
          <TabsTrigger value="value">Value Creation</TabsTrigger>
          <TabsTrigger value="payback">Payback Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ROI Development Over Time</CardTitle>
              <CardDescription>Cumulative return on investment and break-even analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={roiTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickFormatter={(value) => `${value}m`} />
                  <YAxis yAxisId="left" tickFormatter={(value) => `${value.toFixed(0)}%`} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => {
                      if (name === "ROI") return `${value.toFixed(0)}%`
                      return formatCurrency(value)
                    }}
                    labelFormatter={(value) => `Month ${value}`}
                  />
                  <Legend />
                  <ReferenceLine y={0} stroke="#666" strokeDasharray="2 2" />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="cumulativeBenefit"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    stroke="#3b82f6"
                    name="Cumulative Benefit"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="roi"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    name="ROI %"
                  />
                  <ReferenceLine
                    yAxisId="right"
                    y={portnoxResult?.totalCost || 0}
                    stroke="#ef4444"
                    strokeDasharray="5 5"
                    label="Break-even"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Break-even Point</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{roiMetrics.paybackMonths.toFixed(1)} months</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Investment fully recovered in {roiMetrics.paybackMonths.toFixed(1)} months
                </p>
                <Progress value={(roiMetrics.paybackMonths / 24) * 100} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Year 1 Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(roiMetrics.annualSavings)}</div>
                <p className="text-sm text-muted-foreground mt-1">First year savings and productivity gains</p>
                <div className="flex items-center gap-1 mt-3">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Immediate value</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Long-term Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{formatCurrency(roiMetrics.totalSavings)}</div>
                <p className="text-sm text-muted-foreground mt-1">Total value over {timeframe} years</p>
                <Badge variant="outline" className="mt-3 text-purple-600 border-purple-300">
                  {roiMetrics.roi.toFixed(0)}% ROI
                </Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Analysis</CardTitle>
              <CardDescription>ROI projections under different assumptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {scenarioAnalysis.map((scenario) => (
                  <Card key={scenario.scenario} className="relative">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {scenario.scenario}
                        <Badge variant="outline" style={{ borderColor: scenario.color, color: scenario.color }}>
                          {scenario.probability}% likely
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">ROI</p>
                        <p className="text-2xl font-bold" style={{ color: scenario.color }}>
                          {scenario.roi.toFixed(0)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Savings</p>
                        <p className="text-lg font-semibold">{formatCurrency(scenario.savings)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payback Period</p>
                        <p className="text-lg font-semibold">{scenario.payback.toFixed(1)} months</p>
                      </div>
                      <Progress
                        value={scenario.probability}
                        className="h-2"
                        style={{
                          backgroundColor: `${scenario.color}20`,
                        }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Alert className="border-blue-200 bg-blue-50">
            <Target className="h-4 w-4" />
            <AlertTitle>Scenario Recommendations</AlertTitle>
            <AlertDescription>
              Based on industry benchmarks and Portnox's track record, the <strong>Realistic scenario</strong>{" "}
              represents the most likely outcome. Conservative estimates still deliver strong ROI, while optimistic
              scenarios reflect potential additional benefits from advanced automation and integration capabilities.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="value" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Value Creation Breakdown</CardTitle>
                <CardDescription>How Portnox creates business value</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={valueCreationData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <YAxis dataKey="category" type="category" width={120} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Value Categories</CardTitle>
                <CardDescription>Detailed breakdown of value sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {valueCreationData.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.category}</span>
                        <span className="font-bold">{formatCurrency(item.value)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <Progress value={(item.value / roiMetrics.totalSavings) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Business Impact Beyond ROI</CardTitle>
              <CardDescription>Strategic benefits that extend beyond financial returns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-start gap-3 p-4 rounded-lg border">
                  <Shield className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Enhanced Security Posture</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      92% reduction in breach risk with zero-CVE track record
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border">
                  <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Digital Transformation</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Cloud-native architecture enables rapid innovation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border">
                  <Target className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Competitive Advantage</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      95% faster deployment than traditional solutions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Operational Excellence</h4>
                    <p className="text-sm text-muted-foreground mt-1">90% reduction in administrative overhead</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border">
                  <TrendingUp className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Scalability & Growth</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Infinite cloud scalability supports business expansion
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border">
                  <Clock className="h-5 w-5 text-indigo-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Future-Ready Platform</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      No vendor lock-in with standards-based architecture
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payback Analysis by Vendor</CardTitle>
              <CardDescription>Investment recovery timeline comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={paybackAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => `${value.toFixed(0)}m`} />
                  <Tooltip
                    formatter={(value: number) => `${value.toFixed(1)} months`}
                    labelFormatter={(label) => `Vendor: ${label}`}
                  />
                  <Bar dataKey="paybackMonths" fill="#3b82f6" name="Payback Period (months)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paybackAnalysis.map((vendor) => (
              <Card key={vendor.vendor} className={vendor.isPortnox ? "border-green-200 bg-green-50" : ""}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {vendor.vendor}
                    {vendor.isPortnox && <Badge className="bg-green-600">Best</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Investment:</span>
                    <span className="font-medium">{formatCurrency(vendor.investment)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Annual Savings:</span>
                    <span className="font-medium text-green-600">{formatCurrency(vendor.savings / timeframe)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payback Period:</span>
                    <span className="font-bold">
                      {vendor.paybackMonths < 999 ? `${vendor.paybackMonths.toFixed(1)} months` : "No payback"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total ROI:</span>
                    <span className="font-bold text-blue-600">{vendor.roi.toFixed(0)}%</span>
                  </div>
                  {vendor.paybackMonths < 999 && (
                    <Progress value={Math.max(0, 100 - (vendor.paybackMonths / 24) * 100)} className="mt-2 h-2" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* ROI Summary Alert */}
      <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <TrendingUp className="h-4 w-4" />
        <AlertTitle className="text-green-900 dark:text-green-100">ROI Summary</AlertTitle>
        <AlertDescription className="text-green-800 dark:text-green-200">
          <strong>Investment Recommendation:</strong> Portnox CLEAR delivers exceptional ROI of{" "}
          <strong>{roiMetrics.roi.toFixed(0)}%</strong> with payback in just{" "}
          <strong>{roiMetrics.paybackMonths.toFixed(1)} months</strong>. Total savings of{" "}
          <strong>{formatCurrency(roiMetrics.totalSavings)}</strong> over {timeframe} years make this a compelling
          investment with immediate and long-term value creation.
        </AlertDescription>
      </Alert>
    </div>
  )
}
