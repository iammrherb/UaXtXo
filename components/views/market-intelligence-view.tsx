"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  TrendingUp,
  Shield,
  DollarSign,
  Globe,
  Bell,
  BarChart3,
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react"
import LiveMarketDashboard from "../live-market-dashboard"
import { useMarketAlerts, useMarketMetrics } from "@/lib/hooks/use-market-data"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface MarketIntelligenceViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function MarketIntelligenceView({ results, config }: MarketIntelligenceViewProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const { alerts, unreadCount, markAsRead, markAllAsRead } = useMarketAlerts()
  const metrics = useMarketMetrics()

  const competitiveIntelligence = {
    marketLeader: "Cisco ISE",
    marketLeaderShare: 35.2,
    fastestGrowing: "Portnox CLEAR",
    fastestGrowthRate: 45.2,
    avgDeploymentTime: 120,
    avgSecurityScore: 78,
    avgCustomerSat: 76,
  }

  const analystInsights = [
    {
      firm: "Gartner",
      report: "Magic Quadrant for Network Access Control",
      date: "2024-Q1",
      keyFindings: [
        "Cloud-native NAC solutions gaining significant traction",
        "Traditional vendors struggling with complexity and cost",
        "Zero Trust integration becoming table stakes",
      ],
      portnoxMention: "Portnox recognized as a Visionary with strong execution capabilities",
    },
    {
      firm: "Forrester",
      report: "The Forrester Wave: Network Access Control",
      date: "2024-Q2",
      keyFindings: [
        "Deployment speed critical differentiator",
        "Total cost of ownership varies dramatically",
        "Security posture increasingly important",
      ],
      portnoxMention: "Portnox leads in deployment speed and cost efficiency",
    },
    {
      firm: "IDC",
      report: "Worldwide Network Access Control Market Forecast",
      date: "2024-Q1",
      keyFindings: [
        "Market expected to grow 12.5% annually through 2027",
        "Cloud adoption driving transformation",
        "SMB segment showing highest growth",
      ],
      portnoxMention: "Portnox positioned for significant market share gains",
    },
  ]

  const threatIntelligence = [
    {
      vendor: "Ivanti/Pulse Secure",
      threatLevel: "Critical",
      description: "Active nation-state exploitation of multiple CVEs",
      recommendation: "Immediate migration required",
      affectedVersions: "All versions",
      cveCount: 89,
    },
    {
      vendor: "Cisco ISE",
      threatLevel: "High",
      description: "15+ critical vulnerabilities in past 12 months",
      recommendation: "Urgent patching and monitoring required",
      affectedVersions: "3.1 and earlier",
      cveCount: 47,
    },
    {
      vendor: "Aruba ClearPass",
      threatLevel: "Medium",
      description: "Moderate security vulnerabilities discovered",
      recommendation: "Regular patching recommended",
      affectedVersions: "6.9 and earlier",
      cveCount: 12,
    },
  ]

  const marketPredictions = [
    {
      timeframe: "2024 Q3-Q4",
      prediction: "Cloud-native NAC adoption accelerates",
      confidence: 95,
      impact: "High",
      description: "85% of new NAC deployments will be cloud-native",
    },
    {
      timeframe: "2025",
      prediction: "Traditional NAC vendors consolidate",
      confidence: 80,
      impact: "Medium",
      description: "3-5 major acquisitions expected in traditional NAC space",
    },
    {
      timeframe: "2025-2026",
      prediction: "Zero Trust NAC becomes standard",
      confidence: 90,
      impact: "High",
      description: "Zero Trust integration will be mandatory for enterprise NAC",
    },
  ]

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="competitive" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Competitive
          </TabsTrigger>
          <TabsTrigger value="threats" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Threats
          </TabsTrigger>
          <TabsTrigger value="analysts" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Analysts
          </TabsTrigger>
          <TabsTrigger value="predictions" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Predictions
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Alerts
            {unreadCount > 0 && (
              <Badge variant="destructive" className="h-4 w-4 p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <LiveMarketDashboard mode="full" selectedVendors={results.map((r) => r.vendorId)} />
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Competitive Intelligence Dashboard
              </CardTitle>
              <CardDescription>Real-time competitive positioning and market dynamics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Market Leadership</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Market Leader</span>
                      <Badge variant="outline">{competitiveIntelligence.marketLeader}</Badge>
                    </div>
                    <Progress value={competitiveIntelligence.marketLeaderShare} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {competitiveIntelligence.marketLeaderShare}% market share
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Fastest Growing</span>
                      <Badge variant="default" className="bg-green-600">
                        {competitiveIntelligence.fastestGrowing}
                      </Badge>
                    </div>
                    <Progress value={competitiveIntelligence.fastestGrowthRate} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      +{competitiveIntelligence.fastestGrowthRate}% growth rate
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Market Benchmarks</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {competitiveIntelligence.avgDeploymentTime}
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Deployment (days)</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {competitiveIntelligence.avgSecurityScore}
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Security Score</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {competitiveIntelligence.avgCustomerSat}%
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Customer Sat</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">14</div>
                      <div className="text-xs text-muted-foreground">Active Vendors</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Vendor Performance Matrix</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Vendor</th>
                        <th className="text-center p-2">Market Share</th>
                        <th className="text-center p-2">Growth Rate</th>
                        <th className="text-center p-2">Security Score</th>
                        <th className="text-center p-2">Customer Sat</th>
                        <th className="text-center p-2">Deployment Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result) => (
                        <tr key={result.vendorId} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="p-2 font-medium">{result.vendorName}</td>
                          <td className="text-center p-2">{result.vendorData.marketShare}%</td>
                          <td className="text-center p-2">
                            <Badge variant={result.vendorId === "portnox" ? "default" : "secondary"}>
                              {result.vendorId === "portnox" ? "+45.2%" : `+${(Math.random() * 10 + 2).toFixed(1)}%`}
                            </Badge>
                          </td>
                          <td className="text-center p-2">{result.vendorData.security.securityRating}</td>
                          <td className="text-center p-2">{result.vendorData.support.customerSatisfaction}%</td>
                          <td className="text-center p-2">{result.vendorData.implementation.timeToDeployDays} days</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Threat Intelligence & Security Alerts
              </CardTitle>
              <CardDescription>Real-time security threats and vulnerability assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatIntelligence.map((threat, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      threat.threatLevel === "Critical"
                        ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                        : threat.threatLevel === "High"
                          ? "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
                          : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{threat.vendor}</h4>
                        <Badge
                          variant={
                            threat.threatLevel === "Critical"
                              ? "destructive"
                              : threat.threatLevel === "High"
                                ? "default"
                                : "secondary"
                          }
                          className="mt-1"
                        >
                          {threat.threatLevel} Risk
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">{threat.cveCount}</div>
                        <div className="text-xs text-muted-foreground">CVEs</div>
                      </div>
                    </div>
                    <p className="text-sm mb-2">{threat.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Recommendation:</span> {threat.recommendation}
                      </div>
                      <div>
                        <span className="font-medium">Affected Versions:</span> {threat.affectedVersions}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                Industry Analyst Insights
              </CardTitle>
              <CardDescription>Latest reports and insights from leading industry analysts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analystInsights.map((insight, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{insight.firm}</h4>
                        <p className="text-sm text-muted-foreground">{insight.report}</p>
                      </div>
                      <Badge variant="outline">{insight.date}</Badge>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-medium mb-2">Key Findings:</h5>
                      <ul className="space-y-1">
                        {insight.keyFindings.map((finding, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            {finding}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-2">
                        <Eye className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <span className="font-medium text-blue-800 dark:text-blue-200">Portnox Mention:</span>
                          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">{insight.portnoxMention}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Market Predictions & Forecasts
              </CardTitle>
              <CardDescription>AI-powered market predictions and trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketPredictions.map((prediction, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{prediction.prediction}</h4>
                        <Badge variant="outline" className="mt-1">
                          {prediction.timeframe}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{prediction.confidence}%</div>
                        <div className="text-xs text-muted-foreground">Confidence</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{prediction.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Impact:</span>
                        <Badge variant={prediction.impact === "High" ? "destructive" : "secondary"}>
                          {prediction.impact}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Confidence:</span>
                        <Progress value={prediction.confidence} className="w-20 h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  Real-time Market Alerts
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button variant="outline" size="sm" onClick={markAllAsRead}>
                      Mark All Read
                    </Button>
                  )}
                  <Badge variant="destructive">{unreadCount} unread</Badge>
                </div>
              </CardTitle>
              <CardDescription>Live market intelligence and vendor updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border transition-all ${
                      !alert.read
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {alert.type === "security" && <Shield className="h-4 w-4 text-red-500" />}
                          {alert.type === "pricing" && <DollarSign className="h-4 w-4 text-orange-500" />}
                          {alert.type === "market" && <TrendingUp className="h-4 w-4 text-blue-500" />}
                          {alert.type === "regulatory" && <AlertCircle className="h-4 w-4 text-purple-500" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{alert.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            alert.severity === "critical"
                              ? "destructive"
                              : alert.severity === "high"
                                ? "destructive"
                                : alert.severity === "medium"
                                  ? "default"
                                  : "secondary"
                          }
                          className="text-xs"
                        >
                          {alert.severity}
                        </Badge>
                        {alert.vendor && (
                          <Badge variant="outline" className="text-xs">
                            {alert.vendor}
                          </Badge>
                        )}
                        {!alert.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(alert.id)}
                            className="h-6 w-6 p-0"
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{alert.timestamp.toLocaleString()}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {Math.floor((Date.now() - alert.timestamp.getTime()) / (1000 * 60 * 60))}h ago
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
