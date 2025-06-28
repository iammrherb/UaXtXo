"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, DollarSign, Clock, Shield, Users, Zap, Award, Target, CheckCircle } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ROIBusinessValueProps {
  results: CalculationResult[]
  configuration: CalculationConfiguration
  selectedVendors: string[]
}

export default function ROIBusinessValue({ results = [], configuration, selectedVendors = [] }: ROIBusinessValueProps) {
  const [activeTab, setActiveTab] = useState("roi-timeline")
  const [timeHorizon, setTimeHorizon] = useState(5)

  // Memoize ROI calculations
  const roiData = useMemo(() => {
    const safeResults = results.filter((result) => result && result.roi)

    // ROI Timeline data
    const roiTimelineData = Array.from({ length: timeHorizon }, (_, i) => {
      const year = i + 1
      const data: any = { year: `Year ${year}` }

      safeResults.forEach((result) => {
        const cumulativeInvestment = ((result.total || 0) / (configuration.years || 3)) * year
        const cumulativeSavings = (result.roi?.annualSavings || 0) * year
        const netValue = cumulativeSavings - cumulativeInvestment

        data[`${result.vendor}_investment`] = cumulativeInvestment
        data[`${result.vendor}_savings`] = cumulativeSavings
        data[`${result.vendor}_net`] = netValue
      })

      return data
    })

    // Business value radar data
    const businessValueData = [
      { metric: "Cost Reduction", portnox: 95, cisco: 70, aruba: 65 },
      { metric: "Security Enhancement", portnox: 90, cisco: 75, aruba: 70 },
      { metric: "Operational Efficiency", portnox: 88, cisco: 65, aruba: 60 },
      { metric: "Compliance Automation", portnox: 92, cisco: 60, aruba: 55 },
      { metric: "Time to Value", portnox: 85, cisco: 50, aruba: 45 },
      { metric: "Scalability", portnox: 90, cisco: 70, aruba: 65 },
    ]

    // Risk vs Return scatter data
    const riskReturnData = safeResults.map((result) => ({
      vendor: result.vendorName || result.vendor,
      risk: 100 - (result.riskMetrics?.complianceScore || 70),
      return: result.roi?.percentage || 0,
      size: (result.total || 0) / 100000, // Bubble size based on cost
    }))

    // Payback analysis
    const paybackData = safeResults.map((result) => ({
      vendor: result.vendorName || result.vendor,
      paybackMonths: result.roi?.paybackMonths || 0,
      roiPercentage: result.roi?.percentage || 0,
      annualSavings: result.roi?.annualSavings || 0,
    }))

    return {
      roiTimelineData,
      businessValueData,
      riskReturnData,
      paybackData,
      safeResults,
    }
  }, [results, configuration.years, timeHorizon])

  const { roiTimelineData, businessValueData, riskReturnData, paybackData, safeResults } = roiData

  // Calculate key metrics
  const portnoxResult = safeResults.find((r) => r.vendor === "portnox")
  const competitorResults = safeResults.filter((r) => r.vendor !== "portnox")
  const avgCompetitorROI =
    competitorResults.length > 0
      ? competitorResults.reduce((sum, r) => sum + (r.roi?.percentage || 0), 0) / competitorResults.length
      : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ROI & Business Value Analysis</h2>
          <p className="text-gray-600 dark:text-gray-400">Return on investment and business impact assessment</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeHorizon === 3 ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeHorizon(3)}
            className="bg-transparent"
          >
            3 Years
          </Button>
          <Button
            variant={timeHorizon === 5 ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeHorizon(5)}
            className="bg-transparent"
          >
            5 Years
          </Button>
        </div>
      </div>

      {/* Key ROI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">Portnox ROI</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {portnoxResult?.roi?.percentage || 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Payback Period</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {portnoxResult?.roi?.paybackMonths || 0} months
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Annual Savings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${(portnoxResult?.roi?.annualSavings || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">FTE Savings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {portnoxResult?.roi?.laborSavingsFTE || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="roi-timeline">ROI Timeline</TabsTrigger>
          <TabsTrigger value="business-value">Business Value</TabsTrigger>
          <TabsTrigger value="risk-return">Risk vs Return</TabsTrigger>
          <TabsTrigger value="payback">Payback Analysis</TabsTrigger>
        </TabsList>

        {/* ROI Timeline Tab */}
        <TabsContent value="roi-timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ROI Timeline - {timeHorizon} Year Projection</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cumulative return on investment over time</p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={roiTimelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip
                      formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                      labelStyle={{ color: "#374151" }}
                    />
                    {safeResults.map((result, index) => (
                      <Line
                        key={`${result.vendor}_net`}
                        type="monotone"
                        dataKey={`${result.vendor}_net`}
                        stroke={["#10B981", "#3B82F6", "#8B5CF6"][index]}
                        strokeWidth={3}
                        name={`${result.vendorName || result.vendor} Net Value`}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* ROI Milestones */}
          <Card>
            <CardHeader>
              <CardTitle>ROI Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {safeResults.map((result, index) => {
                  const breakEvenPoint = (result.total || 0) / (result.roi?.annualSavings || 1)
                  return (
                    <div key={result.vendor} className="text-center p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">{result.vendorName || result.vendor}</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Break-even</p>
                          <p className="text-lg font-bold">{breakEvenPoint.toFixed(1)} years</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">5-Year ROI</p>
                          <p className="text-lg font-bold text-green-600">
                            {(
                              (((result.roi?.annualSavings || 0) * 5 - (result.total || 0)) / (result.total || 1)) *
                              100
                            ).toFixed(0)}
                            %
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Value Tab */}
        <TabsContent value="business-value" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Value Radar</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comprehensive business impact assessment across key dimensions
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={businessValueData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Portnox"
                      dataKey="portnox"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Cisco"
                      dataKey="cisco"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Aruba"
                      dataKey="aruba"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Business Value Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Operational Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-200">Reduced IT Overhead</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Save {portnoxResult?.roi?.laborSavingsFTE || 0} FTE annually through automation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">Faster Deployment</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Cloud-native architecture reduces time-to-value by 60%
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-800 dark:text-purple-200">User Productivity</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Seamless access improves user experience and productivity
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <Shield className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800 dark:text-red-200">Breach Risk Reduction</h4>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {portnoxResult?.roi?.breachReduction || 0}% reduction in security breach probability
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <Award className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-800 dark:text-orange-200">Compliance Savings</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      ${(portnoxResult?.roi?.complianceSavings || 0).toLocaleString()} in audit and compliance costs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-indigo-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-indigo-800 dark:text-indigo-200">Threat Detection</h4>
                    <p className="text-sm text-indigo-700 dark:text-indigo-300">
                      AI-powered detection improves security posture by 40%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Risk vs Return Tab */}
        <TabsContent value="risk-return" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk vs Return Analysis</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Investment risk plotted against expected returns (bubble size = total cost)
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={riskReturnData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="risk"
                      name="Risk Score"
                      unit="%"
                      label={{ value: "Risk Score (%)", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                      dataKey="return"
                      name="ROI"
                      unit="%"
                      label={{ value: "ROI (%)", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        name === "risk" ? `${value}%` : name === "return" ? `${value}%` : value,
                        name === "risk" ? "Risk Score" : name === "return" ? "ROI" : name,
                      ]}
                      labelFormatter={(label) => `Vendor: ${label}`}
                    />
                    <Scatter dataKey="return" fill="#10B981" name="ROI" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Risk Factors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Implementation Complexity</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Low
                    </Badge>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Technology Risk</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Low
                    </Badge>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Vendor Lock-in</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Low
                    </Badge>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Scalability Risk</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Low
                    </Badge>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Return Confidence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cost Savings Certainty</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      High
                    </Badge>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Security ROI</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      High
                    </Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Operational Efficiency</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      High
                    </Badge>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Compliance Benefits</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      High
                    </Badge>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payback Analysis Tab */}
        <TabsContent value="payback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payback Period Comparison</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Time to recover initial investment across vendors
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={paybackData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis label={{ value: "Months", angle: -90, position: "insideLeft" }} />
                    <Tooltip
                      formatter={(value: number) => [`${value} months`, "Payback Period"]}
                      labelStyle={{ color: "#374151" }}
                    />
                    <Bar dataKey="paybackMonths" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Payback Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paybackData.map((vendor, index) => (
              <Card
                key={vendor.vendor}
                className={index === 0 ? "border-green-200 bg-green-50 dark:bg-green-900/20" : ""}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{vendor.vendor}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{vendor.paybackMonths} months</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Payback Period</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>ROI</span>
                      <span className="font-medium">{vendor.roiPercentage}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Annual Savings</span>
                      <span className="font-medium">${vendor.annualSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Monthly Savings</span>
                      <span className="font-medium">${(vendor.annualSavings / 12).toLocaleString()}</span>
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      Fastest Payback
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Investment Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Recovery Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={roiTimelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip
                      formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                      labelStyle={{ color: "#374151" }}
                    />
                    {safeResults.map((result, index) => (
                      <Area
                        key={`${result.vendor}_net`}
                        type="monotone"
                        dataKey={`${result.vendor}_net`}
                        stackId="1"
                        stroke={["#10B981", "#3B82F6", "#8B5CF6"][index]}
                        fill={["#10B981", "#3B82F6", "#8B5CF6"][index]}
                        fillOpacity={0.6}
                        name={`${result.vendorName || result.vendor} Net Value`}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
