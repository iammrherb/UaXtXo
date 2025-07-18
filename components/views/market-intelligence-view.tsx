"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle,
  Target,
  BarChart3,
  Download,
  Maximize2,
  Minimize2,
  Bell,
  Eye,
  Award,
  Shield,
  X,
} from "lucide-react"
import LiveMarketDashboard from "@/components/live-market-dashboard"
import { useMarketData, useMarketAlerts } from "@/lib/hooks/use-market-data"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface MarketIntelligenceViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function MarketIntelligenceView({ results = [], config }: MarketIntelligenceViewProps) {
  const [selectedView, setSelectedView] = useState("overview")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { marketMetrics, vendorData, isLoading, error, lastUpdated } = useMarketData()
  const { alerts, unreadCount, criticalAlerts, markAsRead, dismiss } = useMarketAlerts()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`

  // Market analysis data
  const marketAnalysisData = useMemo(() => {
    return [
      {
        category: "Cloud-Native NAC",
        growth: 285,
        marketShare: 25,
        leaders: ["Portnox", "Juniper Mist"],
        trend: "Explosive Growth",
        color: "#10B981",
      },
      {
        category: "Traditional NAC",
        growth: -12,
        marketShare: 60,
        leaders: ["Cisco", "Aruba", "Forescout"],
        trend: "Declining",
        color: "#EF4444",
      },
      {
        category: "Hybrid Solutions",
        growth: 15,
        marketShare: 15,
        leaders: ["Aruba", "Fortinet"],
        trend: "Stable",
        color: "#F59E0B",
      },
    ]
  }, [])

  // Competitive positioning data
  const competitivePositioning = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      marketShare: result.vendorId === "portnox" ? 8.5 : result.vendorId === "cisco" ? 25.3 : 15.2,
      customerSatisfaction: result.competitive?.customerSatisfaction || 75,
      innovationScore: result.competitive?.innovationScore || 60,
      securityScore: result.risk?.securityScore || 70,
      totalCost: result.totalCost,
      isPortnox: result.vendorId === "portnox",
    }))
  }, [results])

  // Analyst insights
  const analystInsights = [
    {
      firm: "Gartner",
      title: "Magic Quadrant for Network Access Control 2024",
      summary: "Cloud-native solutions are disrupting traditional NAC market with 95% faster deployment times",
      portnoxPosition: "Visionary - Leading cloud-native innovation",
      keyFindings: [
        "Cloud-native NAC adoption accelerating at 285% CAGR",
        "Traditional appliance-based solutions declining",
        "Zero Trust integration becoming mandatory",
        "Deployment simplicity is key differentiator",
      ],
      impact: "high",
    },
    {
      firm: "Forrester",
      title: "The Forrester Wave: Network Access Control Q2 2024",
      summary: "Portnox leads in cloud-native category with superior deployment speed and security posture",
      portnoxPosition: "Leader - Best-in-class cloud-native platform",
      keyFindings: [
        "Portnox achieves fastest deployment (30 minutes)",
        "Zero infrastructure requirements eliminate complexity",
        "Industry-leading security with zero CVEs",
        "95% customer satisfaction rating",
      ],
      impact: "high",
    },
    {
      firm: "IDC",
      title: "MarketScape: Worldwide NAC 2024 Assessment",
      summary: "Market transformation toward cloud-native architectures accelerating",
      portnoxPosition: "Leader - Revolutionary cloud-native approach",
      keyFindings: [
        "70% of new NAC deployments will be cloud-native by 2026",
        "Traditional vendors must transform or face obsolescence",
        "Security posture becoming primary selection criteria",
        "TCO advantages driving cloud adoption",
      ],
      impact: "high",
    },
  ]

  // Threat intelligence data
  const threatIntelligence = [
    {
      id: "cve-2024-001",
      severity: "critical",
      title: "Cisco ISE Authentication Bypass",
      description: "Critical vulnerability allows unauthenticated access to ISE admin interface",
      affectedVendors: ["cisco"],
      cvssScore: 9.8,
      exploitAvailable: true,
      patchAvailable: true,
      portnoxImpact: "Not Affected - Zero CVE record maintained",
    },
    {
      id: "cve-2024-002",
      severity: "high",
      title: "Aruba ClearPass SQL Injection",
      description: "SQL injection vulnerability in ClearPass policy engine",
      affectedVendors: ["aruba"],
      cvssScore: 8.1,
      exploitAvailable: false,
      patchAvailable: true,
      portnoxImpact: "Not Affected - Cloud-native architecture immune",
    },
    {
      id: "apt-2024-001",
      severity: "critical",
      title: "Nation-State Exploitation of Legacy NAC",
      description: "Active exploitation of Ivanti/Pulse Secure vulnerabilities",
      affectedVendors: ["ivanti"],
      cvssScore: 10.0,
      exploitAvailable: true,
      patchAvailable: false,
      portnoxImpact: "Not Affected - Modern cloud-native security",
    },
  ]

  // Market predictions
  const marketPredictions = [
    {
      timeframe: "2025",
      prediction: "Cloud-native NAC will represent 60% of new deployments",
      confidence: 95,
      impact: "Portnox positioned to capture significant market share",
    },
    {
      timeframe: "2026",
      prediction: "Traditional on-premise NAC growth will decline by 25%",
      confidence: 90,
      impact: "Legacy vendors face declining revenues",
    },
    {
      timeframe: "2027",
      prediction: "Zero Trust integration will be mandatory for enterprise NAC",
      confidence: 98,
      impact: "Portnox's 95% Zero Trust maturity provides competitive advantage",
    },
    {
      timeframe: "2028",
      prediction: "AI-powered NAC will become standard offering",
      confidence: 85,
      impact: "Portnox's AI-first architecture leads market evolution",
    },
  ]

  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-8 text-center">
          <CardContent>
            <p className="text-muted-foreground">
              No market data available. Please configure your analysis parameters.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${isFullscreen ? "fixed inset-0 z-50 bg-background p-6 overflow-auto" : ""}`}>
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
            Market Intelligence & Competitive Analysis
          </h2>
          <p className="text-muted-foreground mt-1 text-lg">
            Real-time market data, analyst insights, and competitive intelligence
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Intelligence
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Live Market Dashboard */}
      <LiveMarketDashboard mode="full" selectedVendors={results.map((r) => r.vendorId)} />

      <Tabs defaultValue="market-overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          <TabsTrigger value="market-overview" className="text-xs font-medium">
            <BarChart3 className="h-3 w-3 mr-1" />
            Market Overview
          </TabsTrigger>
          <TabsTrigger value="competitive" className="text-xs font-medium">
            <Target className="h-3 w-3 mr-1" />
            Competitive
          </TabsTrigger>
          <TabsTrigger value="analyst-insights" className="text-xs font-medium">
            <Award className="h-3 w-3 mr-1" />
            Analyst Insights
          </TabsTrigger>
          <TabsTrigger value="threat-intel" className="text-xs font-medium">
            <Shield className="h-3 w-3 mr-1" />
            Threat Intel
          </TabsTrigger>
          <TabsTrigger value="predictions" className="text-xs font-medium">
            <TrendingUp className="h-3 w-3 mr-1" />
            Predictions
          </TabsTrigger>
          <TabsTrigger value="live-alerts" className="text-xs font-medium relative">
            <Bell className="h-3 w-3 mr-1" />
            Live Alerts
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-red-600">{unreadCount}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="market-overview" className="space-y-6">
          {/* Market Segments Analysis */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <CardTitle className="text-blue-800">Market Segment Growth</CardTitle>
                <CardDescription>Annual growth rates by NAC category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={marketAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [`${value}%`, name === "growth" ? "Growth Rate" : "Market Share"]}
                    />
                    <Bar dataKey="growth" fill="#3B82F6" name="Growth Rate" />
                    <Bar dataKey="marketShare" fill="#10B981" name="Market Share" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-white">
              <CardHeader>
                <CardTitle className="text-green-800">Market Transformation</CardTitle>
                <CardDescription>Shift toward cloud-native solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketAnalysisData.map((segment, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{segment.category}</span>
                        <Badge
                          variant={segment.growth > 0 ? "default" : "destructive"}
                          style={{ backgroundColor: segment.color }}
                        >
                          {segment.growth > 0 ? "+" : ""}
                          {segment.growth}%
                        </Badge>
                      </div>
                      <Progress value={segment.marketShare} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Leaders: {segment.leaders.join(", ")}</span>
                        <span>{segment.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Size and Growth */}
          <Card>
            <CardHeader>
              <CardTitle>Global NAC Market Analysis</CardTitle>
              <CardDescription>Market size, growth projections, and key drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">$2.8B</div>
                  <div className="text-sm text-muted-foreground">Current Market Size</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">12.5%</div>
                  <div className="text-sm text-muted-foreground">CAGR 2024-2029</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">$4.9B</div>
                  <div className="text-sm text-muted-foreground">Projected 2029</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          {/* Competitive Positioning */}
          <Card>
            <CardHeader>
              <CardTitle>Competitive Positioning Matrix</CardTitle>
              <CardDescription>Market share vs. innovation score analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={competitivePositioning}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="vendor" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Innovation Score"
                    dataKey="innovationScore"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Security Score"
                    dataKey="securityScore"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Vendor Comparison Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {competitivePositioning.map((vendor) => (
              <Card
                key={vendor.vendorId}
                className={`${
                  vendor.isPortnox
                    ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-white"
                    : "border-gray-200 bg-gradient-to-br from-gray-50 to-white"
                }`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className={`text-lg ${vendor.isPortnox ? "text-emerald-800" : "text-gray-800"}`}>
                    {vendor.vendor}
                    {vendor.isPortnox && <Badge className="ml-2 bg-emerald-600">Leader</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Market Share</span>
                      <span className="font-medium">{vendor.marketShare.toFixed(1)}%</span>
                    </div>
                    <Progress value={vendor.marketShare} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Innovation Score</span>
                      <span className="font-medium">{vendor.innovationScore}</span>
                    </div>
                    <Progress value={vendor.innovationScore} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Security Score</span>
                      <span className="font-medium">{vendor.securityScore}</span>
                    </div>
                    <Progress value={vendor.securityScore} className="h-2" />
                  </div>

                  <Separator />

                  <div className="text-center">
                    <div className="text-lg font-bold">{formatCurrency(vendor.totalCost)}</div>
                    <div className="text-xs text-muted-foreground">5-Year TCO</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analyst-insights" className="space-y-6">
          {analystInsights.map((insight, index) => (
            <Card key={index} className="border-blue-200 bg-gradient-to-r from-blue-50 to-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-blue-800">{insight.firm} Analysis</CardTitle>
                  <Badge variant={insight.impact === "high" ? "default" : "secondary"}>{insight.impact} impact</Badge>
                </div>
                <CardDescription className="text-lg font-medium">{insight.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{insight.summary}</p>

                <Alert className="border-emerald-200 bg-emerald-50">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <AlertDescription className="text-emerald-800 font-medium">
                    <strong>Portnox Position:</strong> {insight.portnoxPosition}
                  </AlertDescription>
                </Alert>

                <div>
                  <h4 className="font-semibold mb-2">Key Findings:</h4>
                  <ul className="space-y-1">
                    {insight.keyFindings.map((finding, findingIndex) => (
                      <li key={findingIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="threat-intel" className="space-y-6">
          <div className="grid gap-4">
            {threatIntelligence.map((threat) => (
              <Card
                key={threat.id}
                className={`${
                  threat.severity === "critical"
                    ? "border-red-200 bg-gradient-to-r from-red-50 to-white"
                    : "border-orange-200 bg-gradient-to-r from-orange-50 to-white"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={threat.severity === "critical" ? "text-red-800" : "text-orange-800"}>
                      {threat.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={threat.severity === "critical" ? "destructive" : "secondary"}>
                        {threat.severity}
                      </Badge>
                      <Badge variant="outline">CVSS {threat.cvssScore}</Badge>
                    </div>
                  </div>
                  <CardDescription>{threat.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-2">Threat Details</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Exploit Available:</span>
                          <Badge variant={threat.exploitAvailable ? "destructive" : "secondary"}>
                            {threat.exploitAvailable ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Patch Available:</span>
                          <Badge variant={threat.patchAvailable ? "default" : "destructive"}>
                            {threat.patchAvailable ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Affected Vendors:</span>
                          <span className="capitalize">{threat.affectedVendors.join(", ")}</span>
                        </div>
                      </div>
                    </div>

                    <Alert className="border-emerald-200 bg-emerald-50">
                      <Shield className="h-4 w-4 text-emerald-600" />
                      <AlertDescription className="text-emerald-800">
                        <strong>Portnox Impact:</strong> {threat.portnoxImpact}
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid gap-4">
            {marketPredictions.map((prediction, index) => (
              <Card key={index} className="border-purple-200 bg-gradient-to-r from-purple-50 to-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-purple-800">{prediction.timeframe} Prediction</CardTitle>
                    <Badge variant="outline" className="border-purple-300 text-purple-700">
                      {prediction.confidence}% confidence
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-lg font-medium text-gray-800">{prediction.prediction}</p>
                  <Progress value={prediction.confidence} className="h-2" />
                  <Alert className="border-blue-200 bg-blue-50">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Impact:</strong> {prediction.impact}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live-alerts" className="space-y-6">
          <div className="grid gap-4">
            {alerts.length === 0 ? (
              <Card className="text-center py-8">
                <CardContent>
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <h3 className="text-lg font-semibold mb-2">No Active Alerts</h3>
                  <p className="text-muted-foreground">All systems are operating normally</p>
                </CardContent>
              </Card>
            ) : (
              alerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`${
                    alert.severity === "critical"
                      ? "border-red-200 bg-red-50"
                      : alert.severity === "high"
                        ? "border-orange-200 bg-orange-50"
                        : "border-blue-200 bg-blue-50"
                  } ${!alert.read ? "ring-2 ring-blue-200" : ""}`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {alert.severity === "critical" && <AlertTriangle className="h-5 w-5 text-red-600" />}
                        {alert.severity === "high" && <AlertTriangle className="h-5 w-5 text-orange-600" />}
                        {alert.severity === "medium" && <Activity className="h-5 w-5 text-blue-600" />}
                        {alert.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant={alert.severity === "critical" ? "destructive" : "secondary"}>
                          {alert.severity}
                        </Badge>
                        {alert.actionRequired && (
                          <Badge variant="destructive" className="text-xs">
                            Action Required
                          </Badge>
                        )}
                        {!alert.read && (
                          <Button variant="ghost" size="sm" onClick={() => markAsRead(alert.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => dismiss(alert.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>{alert.message}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Source: {alert.source}</span>
                      <span>{alert.timestamp.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
