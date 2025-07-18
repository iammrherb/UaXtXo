"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Zap, Shield, DollarSign, Clock, CheckCircle2, TrendingUp, Award, Target } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import CostBreakdownComparison from "@/components/charts/cost-breakdown-comparison"
import SecurityVulnerabilityTimeline from "@/components/charts/security-vulnerability-timeline"
import ImplementationTimelineVisual from "@/components/charts/implementation-timeline-visual"

interface PortnoxAdvantageDashboardProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function PortnoxAdvantageDashboard({ results, config }: PortnoxAdvantageDashboardProps) {
  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const competitorResults = results.filter((r) => r.vendorId !== "portnox")

  const advantageMetrics = React.useMemo(() => {
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
      costAdvantage: percentSavings,
      totalSavings,
      deploymentAdvantage: ((avgCompetitorDeployment - 0.02) / avgCompetitorDeployment) * 100, // 30 minutes vs average
      securityAdvantage: avgCompetitorCVEs, // Portnox has 0 CVEs
      automationAdvantage: 95 - 65, // 95% vs 65% average automation
      maintenanceAdvantage: 100, // 0 maintenance vs regular maintenance
    }
  }, [portnoxResult, competitorResults])

  const competitiveComparison = React.useMemo(() => {
    return [
      {
        metric: "Total Cost",
        portnox: portnoxResult?.totalCost || 0,
        competitor: competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length,
        unit: "USD",
        advantage: "Lower",
      },
      {
        metric: "Deployment Time",
        portnox: 0.02, // 30 minutes in days
        competitor:
          competitorResults.reduce((sum, r) => {
            return sum + (r.vendorData?.implementation?.deploymentDays || 90)
          }, 0) / competitorResults.length,
        unit: "Days",
        advantage: "Faster",
      },
      {
        metric: "CVE Count",
        portnox: 0,
        competitor:
          competitorResults.reduce((sum, r) => {
            return sum + (r.vendorData?.security?.cveCount || 0)
          }, 0) / competitorResults.length,
        unit: "Vulnerabilities",
        advantage: "Safer",
      },
      {
        metric: "Automation Level",
        portnox: 95,
        competitor: 65,
        unit: "Percent",
        advantage: "Higher",
      },
    ]
  }, [portnoxResult, competitorResults])

  const uniqueAdvantages = React.useMemo(() => {
    return [
      {
        title: "Cloud-Native Architecture",
        description: "Zero infrastructure, infinite scalability",
        impact: "Eliminates hardware costs and maintenance",
        savings: "$150K+ annually",
        icon: Zap,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
      },
      {
        title: "Zero CVE Security Record",
        description: "Perfect security track record",
        impact: "92% breach risk reduction",
        savings: "$4.1M risk mitigation",
        icon: Shield,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
      },
      {
        title: "30-Minute Deployment",
        description: "Production-ready in minutes",
        impact: "95% faster time-to-value",
        savings: "6 months time savings",
        icon: Clock,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
      },
      {
        title: "95% Automation",
        description: "Self-healing operations",
        impact: "90% admin overhead reduction",
        savings: "2.5 FTE savings",
        icon: Target,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
      },
    ]
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatLargeCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return formatCurrency(value)
  }

  if (!advantageMetrics) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No advantage data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Portnox Advantage Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <Award className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-2xl font-bold text-green-900">Portnox CLEAR Competitive Advantages</h1>
            <p className="text-green-700">Why Portnox delivers superior value across all key metrics</p>
          </div>
        </div>

        <Alert className="bg-white/50 border-green-300">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-900">Unmatched Value Proposition</AlertTitle>
          <AlertDescription className="text-green-800">
            Portnox CLEAR delivers {advantageMetrics.costAdvantage.toFixed(0)}% cost savings,
            {advantageMetrics.deploymentAdvantage.toFixed(0)}% faster deployment, and zero security vulnerabilities
            while providing enterprise-grade Zero Trust security that scales infinitely.
          </AlertDescription>
        </Alert>
      </div>

      {/* Key Advantage Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Cost Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{advantageMetrics.costAdvantage.toFixed(0)}%</div>
            <p className="text-sm text-green-600 mt-1">Lower total cost</p>
            <div className="text-xs text-muted-foreground mt-2">
              {formatLargeCurrency(advantageMetrics.totalSavings)} saved
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
            <div className="text-3xl font-bold text-blue-700">{advantageMetrics.deploymentAdvantage.toFixed(0)}%</div>
            <p className="text-sm text-blue-600 mt-1">Faster deployment</p>
            <div className="text-xs text-muted-foreground mt-2">30 minutes vs months</div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              Security Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">0</div>
            <p className="text-sm text-purple-600 mt-1">CVEs vs {Math.round(advantageMetrics.securityAdvantage)}</p>
            <div className="text-xs text-muted-foreground mt-2">Perfect security record</div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-600" />
              Automation Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-700">{advantageMetrics.automationAdvantage}%</div>
            <p className="text-sm text-orange-600 mt-1">Higher automation</p>
            <div className="text-xs text-muted-foreground mt-2">95% vs 65% average</div>
          </CardContent>
        </Card>
      </div>

      {/* Unique Advantages Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {uniqueAdvantages.map((advantage, index) => (
          <Card key={index} className={`${advantage.borderColor} ${advantage.bgColor}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 ${advantage.color}`}>
                <advantage.icon className="h-6 w-6" />
                {advantage.title}
              </CardTitle>
              <CardDescription className="text-gray-700">{advantage.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Business Impact:</span>
                  <span className="text-sm text-muted-foreground">{advantage.impact}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Value Creation:</span>
                  <span className={`text-sm font-bold ${advantage.color}`}>{advantage.savings}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Competitive Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Head-to-Head Comparison</CardTitle>
          <CardDescription>Portnox CLEAR vs Average Competitor across key metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {competitiveComparison.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{metric.metric}</span>
                  <Badge variant="outline" className="text-green-700 border-green-300">
                    {metric.advantage}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Portnox CLEAR</div>
                    <div className="text-lg font-bold text-green-700">
                      {metric.unit === "USD"
                        ? formatLargeCurrency(metric.portnox)
                        : metric.unit === "Days"
                          ? metric.portnox < 1
                            ? "30 minutes"
                            : `${metric.portnox} days`
                          : `${metric.portnox}${metric.unit === "Percent" ? "%" : ""}`}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Competitor Average</div>
                    <div className="text-lg font-bold text-red-700">
                      {metric.unit === "USD"
                        ? formatLargeCurrency(metric.competitor)
                        : metric.unit === "Days"
                          ? `${Math.round(metric.competitor)} days`
                          : `${Math.round(metric.competitor)}${metric.unit === "Percent" ? "%" : ""}`}
                    </div>
                  </div>
                </div>
                <Progress
                  value={
                    metric.advantage === "Lower" || metric.advantage === "Safer"
                      ? ((metric.competitor - metric.portnox) / metric.competitor) * 100
                      : ((metric.portnox - metric.competitor) / Math.max(metric.portnox, metric.competitor)) * 100
                  }
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Visual Comparisons */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Cost Advantage Analysis</CardTitle>
            <CardDescription>Comprehensive cost breakdown showing where Portnox delivers savings</CardDescription>
          </CardHeader>
          <CardContent>
            <CostBreakdownComparison results={results} config={config} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Superiority</CardTitle>
            <CardDescription>Zero CVE track record vs competitor vulnerability exposure</CardDescription>
          </CardHeader>
          <CardContent>
            <SecurityVulnerabilityTimeline results={results} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deployment Speed Advantage</CardTitle>
            <CardDescription>30-minute deployment vs traditional NAC complexity</CardDescription>
          </CardHeader>
          <CardContent>
            <ImplementationTimelineVisual results={results} />
          </CardContent>
        </Card>
      </div>

      {/* Why Portnox Wins */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Why Portnox CLEAR Wins Every Time
          </CardTitle>
          <CardDescription className="text-green-700">
            The fundamental advantages that make Portnox the clear choice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-800">Architectural Advantages</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Cloud-Native:</strong> No hardware, no maintenance, infinite scale
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Zero Trust:</strong> 95% maturity vs 45% industry average
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>API-First:</strong> Seamless integration with any infrastructure
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Vendor Agnostic:</strong> Works with any network equipment
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-green-800">Operational Advantages</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>30-Minute Deployment:</strong> Production ready in minutes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>95% Automation:</strong> Self-healing, self-optimizing
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Zero Maintenance:</strong> Always current, no patches
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Global Scale:</strong> Multi-region redundancy included
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
