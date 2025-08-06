"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Clock, Shield, Award, AlertTriangle, CheckCircle2, Download, FileText } from 'lucide-react'
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ExecutiveDashboardViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function ExecutiveDashboardView({ results = [], config }: ExecutiveDashboardViewProps) {
  // Find Portnox result for highlighting
  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const lowestCostResult = results.reduce((min, current) => 
    current.totalCost < min.totalCost ? current : min, results[0])

  // Calculate key metrics
  const keyMetrics = useMemo(() => {
    if (results.length === 0) return null

    const totalCosts = results.map(r => r.totalCost)
    const avgCost = totalCosts.reduce((sum, cost) => sum + cost, 0) / totalCosts.length
    const minCost = Math.min(...totalCosts)
    const maxCost = Math.max(...totalCosts)
    const costSavings = maxCost - minCost
    const savingsPercentage = ((costSavings / maxCost) * 100)

    const avgROI = results.reduce((sum, r) => sum + r.financialMetrics.roi, 0) / results.length
    const bestROI = Math.max(...results.map(r => r.financialMetrics.roi))
    const avgPayback = results.reduce((sum, r) => sum + r.financialMetrics.paybackPeriod, 0) / results.length
    const bestPayback = Math.min(...results.map(r => r.financialMetrics.paybackPeriod))

    const avgRisk = results.reduce((sum, r) => sum + r.riskAssessment.overallRisk, 0) / results.length
    const lowestRisk = Math.min(...results.map(r => r.riskAssessment.overallRisk))

    return {
      avgCost,
      minCost,
      maxCost,
      costSavings,
      savingsPercentage,
      avgROI,
      bestROI,
      avgPayback,
      bestPayback,
      avgRisk,
      lowestRisk,
    }
  }, [results])

  // Cost comparison data for charts
  const costComparisonData = useMemo(() => {
    return results
      .sort((a, b) => a.totalCost - b.totalCost)
      .map((result) => ({
        vendor: result.vendorName,
        totalCost: result.totalCost,
        licensing: result.costBreakdown.licensing,
        hardware: result.costBreakdown.hardware,
        services: result.costBreakdown.services,
        operational: result.costBreakdown.operational,
        isPortnox: result.vendorId === "portnox",
        isLowest: result.vendorId === lowestCostResult?.vendorId,
      }))
  }, [results, lowestCostResult])

  // ROI comparison data
  const roiComparisonData = useMemo(() => {
    return results
      .sort((a, b) => b.financialMetrics.roi - a.financialMetrics.roi)
      .map((result) => ({
        vendor: result.vendorName,
        roi: result.financialMetrics.roi,
        payback: result.financialMetrics.paybackPeriod,
        npv: result.financialMetrics.npv,
        isPortnox: result.vendorId === "portnox",
      }))
  }, [results])

  // Risk assessment data
  const riskData = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      securityRisk: result.riskAssessment.securityRisk,
      operationalRisk: result.riskAssessment.operationalRisk,
      financialRisk: result.riskAssessment.financialRisk,
      overallRisk: result.riskAssessment.overallRisk,
      isPortnox: result.vendorId === "portnox",
    }))
  }, [results])

  // Implementation timeline data
  const implementationData = useMemo(() => {
    return results
      .sort((a, b) => parseInt(a.implementation.timeline) - parseInt(b.implementation.timeline))
      .map((result) => ({
        vendor: result.vendorName,
        timeline: parseInt(result.implementation.timeline),
        complexity: result.implementation.complexity,
        resources: result.implementation.resources,
        isPortnox: result.vendorId === "portnox",
      }))
  }, [results])

  // Colors for charts
  const COLORS = {
    portnox: "#10B981",
    primary: "#3B82F6",
    secondary: "#8B5CF6",
    accent: "#F59E0B",
    danger: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
    muted: "#6B7280",
  }

  const getBarColor = (item: any) => {
    if (item.isPortnox) return COLORS.portnox
    if (item.isLowest) return COLORS.success
    return COLORS.primary
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Please configure your analysis parameters and select vendors to compare.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Executive Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              Maximum Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${keyMetrics?.costSavings.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {keyMetrics?.savingsPercentage.toFixed(0)}% cost reduction vs highest option
            </p>
            <div className="flex items-center gap-2 mt-2">
              <TrendingDown className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">
                {lowestCostResult?.vendorName} vs most expensive
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Best ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {keyMetrics?.bestROI.toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {roiComparisonData[0]?.vendor} leads in return on investment
            </p>
            <Progress value={Math.min(keyMetrics?.bestROI || 0, 100)} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              Fastest Deployment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {implementationData[0]?.timeline} days
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {implementationData[0]?.vendor} fastest to deploy
            </p>
            <Badge variant="outline" className="mt-2 text-xs">
              {implementationData[0]?.complexity} complexity
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-600" />
              Lowest Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {keyMetrics?.lowestRisk.toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {riskData.find(r => r.overallRisk === keyMetrics?.lowestRisk)?.vendor} risk score
            </p>
            <Progress 
              value={100 - (keyMetrics?.lowestRisk || 0)} 
              className="mt-2 h-2" 
            />
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Total Cost Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Total Cost of Ownership Comparison</CardTitle>
            <CardDescription>
              {config?.years}-year TCO for {config?.devices.toLocaleString()} devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={costComparisonData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="vendor" 
                  tick={{ fontSize: 12 }} 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Total Cost"]}
                  labelFormatter={(label) => `Vendor: ${label}`}
                />
                <Bar 
                  dataKey="totalCost" 
                  radius={[8, 8, 0, 0]}
                  fill={(entry: any) => getBarColor(entry)}
                >
                  {costComparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ROI vs Payback Period */}
        <Card>
          <CardHeader>
            <CardTitle>ROI vs Payback Period</CardTitle>
            <CardDescription>Financial performance comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={roiComparisonData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="vendor" 
                  tick={{ fontSize: 12 }} 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="roi" 
                  fill={COLORS.primary}
                  name="ROI (%)"
                  radius={[4, 4, 0, 0]}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="payback" 
                  stroke={COLORS.accent}
                  name="Payback (years)"
                  strokeWidth={2}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown and Risk Analysis */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown Analysis</CardTitle>
            <CardDescription>Detailed cost components by vendor</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={costComparisonData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="vendor" 
                  tick={{ fontSize: 12 }} 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="licensing" stackId="a" fill={COLORS.primary} name="Licensing" />
                <Bar dataKey="hardware" stackId="a" fill={COLORS.secondary} name="Hardware" />
                <Bar dataKey="services" stackId="a" fill={COLORS.accent} name="Services" />
                <Bar dataKey="operational" stackId="a" fill={COLORS.muted} name="Operational" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment Overview</CardTitle>
            <CardDescription>Security, operational, and financial risk factors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="vendor" 
                  tick={{ fontSize: 12 }} 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="securityRisk" stackId="a" fill={COLORS.danger} name="Security Risk" />
                <Bar dataKey="operationalRisk" stackId="a" fill={COLORS.warning} name="Operational Risk" />
                <Bar dataKey="financialRisk" stackId="a" fill={COLORS.accent} name="Financial Risk" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Timeline Comparison</CardTitle>
          <CardDescription>Deployment time and resource requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={implementationData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="vendor" />
              <YAxis />
              <Tooltip formatter={(value: number, name: string) => {
                if (name === "timeline") return [`${value} days`, "Deployment Time"]
                if (name === "resources") return [`${value} FTE`, "Resource Requirements"]
                return [value, name]
              }} />
              <Legend />
              <Bar dataKey="timeline" fill={COLORS.primary} name="Days to Deploy" />
              <Bar dataKey="resources" fill={COLORS.secondary} name="Resources Required" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Executive Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Cost Leadership Insight */}
          {lowestCostResult && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
              <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-green-900 dark:text-green-100">Cost Leadership</h4>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  {lowestCostResult.vendorName} offers the lowest total cost of ownership at $
                  {lowestCostResult.totalCost.toLocaleString()}, providing {keyMetrics?.savingsPercentage.toFixed(0)}% 
                  savings compared to the most expensive option.
                </p>
              </div>
            </div>
          )}

          {/* ROI Leadership */}
          {roiComparisonData[0] && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Best Financial Returns</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  {roiComparisonData[0].vendor} delivers the highest ROI at {roiComparisonData[0].roi.toFixed(0)}% 
                  with a payback period of {roiComparisonData[0].payback.toFixed(1)} years.
                </p>
              </div>
            </div>
          )}

          {/* Implementation Speed */}
          {implementationData[0] && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
              <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100">Rapid Deployment</h4>
                <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                  {implementationData[0].vendor} can be deployed in just {implementationData[0].timeline} days 
                  with {implementationData[0].complexity.toLowerCase()} complexity, enabling faster time-to-value.
                </p>
              </div>
            </div>
          )}

          {/* Risk Assessment */}
          {keyMetrics && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100">Risk Mitigation</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  The lowest-risk solution has a risk score of {keyMetrics.lowestRisk.toFixed(0)}, 
                  significantly below the average of {keyMetrics.avgRisk.toFixed(0)}. Consider security 
                  posture and operational complexity in your decision.
                </p>
              </div>
            </div>
          )}

          {/* Portnox Specific Insight */}
          {portnoxResult && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
              <Award className="h-5 w-5 text-emerald-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-emerald-900 dark:text-emerald-100">Portnox CLEAR Advantage</h4>
                <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                  Portnox CLEAR combines cost efficiency ($
                  {portnoxResult.totalCost.toLocaleString()}) with rapid deployment and strong security posture, 
                  offering {portnoxResult.financialMetrics.roi.toFixed(0)}% ROI and industry-leading risk mitigation.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
          <CardDescription>Strategic actions based on your analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Immediate Actions
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Schedule vendor demonstrations with top 3 solutions</li>
                <li>• Validate cost assumptions with procurement team</li>
                <li>• Review security and compliance requirements</li>
                <li>• Assess current infrastructure compatibility</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                Risk Considerations
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Evaluate vendor financial stability and roadmap</li>
                <li>• Plan for change management and user training</li>
                <li>• Consider integration complexity with existing systems</li>
                <li>• Develop implementation timeline and milestones</li>
              </ul>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6 pt-4 border-t">
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Executive Summary
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Generate Detailed Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
