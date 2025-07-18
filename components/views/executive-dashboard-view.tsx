"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingDown, Shield, Zap, CheckCircle2, DollarSign, Clock, BarChart3 } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import CostBreakdownComparison from "@/components/charts/cost-breakdown-comparison"
import SecurityVulnerabilityTimeline from "@/components/charts/security-vulnerability-timeline"
import ImplementationTimelineVisual from "@/components/charts/implementation-timeline-visual"

interface ExecutiveDashboardViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function ExecutiveDashboardView({ results, config }: ExecutiveDashboardViewProps) {
  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const competitorResults = results.filter((r) => r.vendorId !== "portnox")

  const executiveMetrics = React.useMemo(() => {
    if (!portnoxResult || competitorResults.length === 0) return null

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const percentSavings = avgCompetitorCost > 0 ? (totalSavings / avgCompetitorCost) * 100 : 0

    const avgCompetitorDeployment =
      competitorResults.reduce((sum, r) => {
        return sum + (r.vendorData?.implementation?.deploymentDays || 90)
      }, 0) / competitorResults.length

    const avgCompetitorCVEs =
      competitorResults.reduce((sum, r) => {
        return sum + (r.vendorData?.security?.cveCount || 0)
      }, 0) / competitorResults.length

    return {
      totalSavings,
      percentSavings,
      deploymentAdvantage: avgCompetitorDeployment - 0.02, // 30 minutes vs average
      securityAdvantage: avgCompetitorCVEs, // Portnox has 0 CVEs
      roiPercentage: avgCompetitorCost > 0 ? (totalSavings / portnoxResult.totalCost) * 100 : 0,
      paybackMonths: portnoxResult.totalCost > 0 ? portnoxResult.totalCost / (totalSavings / (config.years * 12)) : 0,
    }
  }, [portnoxResult, competitorResults, config.years])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (!executiveMetrics) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No executive metrics available</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Executive Summary Alert */}
      <Alert className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <AlertDescription className="text-green-800">
          <div className="space-y-3">
            <div className="text-lg font-semibold">
              Executive Summary: Portnox CLEAR delivers {executiveMetrics.percentSavings.toFixed(0)}% cost savings with
              95% faster deployment and zero security vulnerabilities.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="font-bold text-xl text-green-700">{formatCurrency(executiveMetrics.totalSavings)}</div>
                <div className="text-green-600">Total Savings</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="font-bold text-xl text-green-700">
                  {Math.round(executiveMetrics.deploymentAdvantage)} days
                </div>
                <div className="text-green-600">Time Saved</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="font-bold text-xl text-green-700">{Math.round(executiveMetrics.roiPercentage)}%</div>
                <div className="text-green-600">ROI</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="font-bold text-xl text-green-700">{Math.round(executiveMetrics.paybackMonths)}</div>
                <div className="text-green-600">Payback (months)</div>
              </div>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Executive KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Cost Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{executiveMetrics.percentSavings.toFixed(0)}%</div>
            <p className="text-sm text-green-600 mt-1">Lower TCO vs competitors</p>
            <div className="text-xs text-muted-foreground mt-2">
              {formatCurrency(executiveMetrics.totalSavings)} saved over {config.years} years
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Speed Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">95%</div>
            <p className="text-sm text-blue-600 mt-1">Faster deployment</p>
            <div className="text-xs text-muted-foreground mt-2">
              30 minutes vs {Math.round(executiveMetrics.deploymentAdvantage)} days average
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              Security Excellence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">0</div>
            <p className="text-sm text-purple-600 mt-1">CVEs (vulnerabilities)</p>
            <div className="text-xs text-muted-foreground mt-2">
              vs {Math.round(executiveMetrics.securityAdvantage)} average CVEs
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-orange-600" />
              ROI Excellence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-700">{Math.round(executiveMetrics.roiPercentage)}%</div>
            <p className="text-sm text-orange-600 mt-1">Return on investment</p>
            <div className="text-xs text-muted-foreground mt-2">
              {Math.round(executiveMetrics.paybackMonths)} month payback period
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="cost" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cost" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Cost Analysis
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security Analysis
          </TabsTrigger>
          <TabsTrigger value="implementation" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Implementation Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cost" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Cost Analysis</CardTitle>
              <CardDescription>Detailed cost breakdown showing where Portnox delivers savings</CardDescription>
            </CardHeader>
            <CardContent>
              <CostBreakdownComparison results={results} config={config} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Vulnerability Analysis</CardTitle>
              <CardDescription>Historical security track record and risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <SecurityVulnerabilityTimeline results={results} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Timeline Analysis</CardTitle>
              <CardDescription>Deployment speed and resource requirement comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ImplementationTimelineVisual results={results} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Strategic Recommendations */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="text-blue-800">Strategic Recommendations</CardTitle>
          <CardDescription className="text-blue-700">Key decision factors for executive consideration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-800">Financial Impact</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    {formatCurrency(executiveMetrics.totalSavings)} in direct cost savings over {config.years} years
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    {Math.round(executiveMetrics.paybackMonths)} month payback period with{" "}
                    {Math.round(executiveMetrics.roiPercentage)}% ROI
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Zero hidden costs from hardware, maintenance, or complexity</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-800">Operational Benefits</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>95% faster deployment (30 minutes vs months)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Zero CVE security track record vs industry average</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Cloud-native scalability without infrastructure constraints</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
