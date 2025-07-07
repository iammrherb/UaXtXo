"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  BarChart3,
  Zap,
  AlertTriangle,
  Star,
  Target,
  Download,
  Filter,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MarketTrend {
  id: string
  metric: string
  category: "cost" | "security" | "operational" | "adoption"
  timeframe: "quarterly" | "yearly" | "multi_year"
  direction: "increasing" | "decreasing" | "stable" | "volatile"
  magnitude: number // percentage change
  confidence: "high" | "medium" | "low"
  impact: "high" | "medium" | "low"
  description: string
  drivers: string[]
  implications: string[]
  forecast: {
    shortTerm: string
    longTerm: string
  }
  data: {
    period: string
    value: number
    benchmark: number
    forecast?: number
  }[]
}

interface IndustryForecast {
  industry: string
  year: number
  metrics: {
    avgTCOPerDevice: number
    avgROI: number
    cloudAdoption: number
    securityScore: number
    automationLevel: number
    breachCost: number
  }
  confidence: number
  keyDrivers: string[]
}

interface TechnologyAdoption {
  technology: string
  currentAdoption: number
  projectedAdoption: number
  growthRate: number
  maturityStage: "emerging" | "growing" | "mature" | "declining"
  industryVariation: Record<string, number>
  benefits: string[]
  challenges: string[]
}

const MARKET_TRENDS: MarketTrend[] = [
  {
    id: "cloud_migration",
    metric: "Cloud NAC Adoption",
    category: "adoption",
    timeframe: "yearly",
    direction: "increasing",
    magnitude: 45.2,
    confidence: "high",
    impact: "high",
    description: "Rapid shift from on-premise to cloud-native NAC solutions",
    drivers: [
      "Remote work acceleration",
      "Cost optimization pressures",
      "Scalability requirements",
      "Faster deployment needs",
    ],
    implications: [
      "Reduced implementation times",
      "Lower total cost of ownership",
      "Improved scalability",
      "Enhanced security posture",
    ],
    forecast: {
      shortTerm: "Continued acceleration with 50%+ growth expected",
      longTerm: "Cloud-first becomes the default by 2026",
    },
    data: [
      { period: "2020", value: 15, benchmark: 15 },
      { period: "2021", value: 22, benchmark: 20 },
      { period: "2022", value: 35, benchmark: 28 },
      { period: "2023", value: 52, benchmark: 40 },
      { period: "2024", value: 68, benchmark: 55, forecast: 75 },
      { period: "2025", value: 0, benchmark: 0, forecast: 85 },
    ],
  },
  {
    id: "tco_reduction",
    metric: "TCO per Device",
    category: "cost",
    timeframe: "yearly",
    direction: "decreasing",
    magnitude: -18.5,
    confidence: "high",
    impact: "high",
    description: "Significant reduction in total cost of ownership across all industries",
    drivers: [
      "Cloud-native architectures",
      "Automation improvements",
      "Vendor competition",
      "Operational efficiency gains",
    ],
    implications: [
      "Better ROI for NAC investments",
      "Faster payback periods",
      "Increased budget availability",
      "Higher adoption rates",
    ],
    forecast: {
      shortTerm: "15-20% additional reduction expected",
      longTerm: "Stabilization around $45-55 per device",
    },
    data: [
      { period: "2020", value: 125, benchmark: 125 },
      { period: "2021", value: 118, benchmark: 120 },
      { period: "2022", value: 105, benchmark: 110 },
      { period: "2023", value: 88, benchmark: 95 },
      { period: "2024", value: 72, benchmark: 80, forecast: 68 },
      { period: "2025", value: 0, benchmark: 0, forecast: 58 },
    ],
  },
  {
    id: "security_scores",
    metric: "Average Security Score",
    category: "security",
    timeframe: "yearly",
    direction: "increasing",
    magnitude: 12.8,
    confidence: "medium",
    impact: "high",
    description: "Steady improvement in security posture across organizations",
    drivers: ["Zero trust adoption", "Advanced threat detection", "Compliance requirements", "Security awareness"],
    implications: ["Reduced breach risk", "Lower insurance premiums", "Improved compliance", "Enhanced reputation"],
    forecast: {
      shortTerm: "Continued gradual improvement",
      longTerm: "Plateau around 85-90 score range",
    },
    data: [
      { period: "2020", value: 68, benchmark: 68 },
      { period: "2021", value: 71, benchmark: 70 },
      { period: "2022", value: 75, benchmark: 73 },
      { period: "2023", value: 79, benchmark: 77 },
      { period: "2024", value: 82, benchmark: 80, forecast: 84 },
      { period: "2025", value: 0, benchmark: 0, forecast: 87 },
    ],
  },
  {
    id: "implementation_time",
    metric: "Implementation Time",
    category: "operational",
    timeframe: "yearly",
    direction: "decreasing",
    magnitude: -35.4,
    confidence: "high",
    impact: "medium",
    description: "Dramatic reduction in deployment and implementation timeframes",
    drivers: ["Cloud-native solutions", "Pre-built integrations", "Automation tools", "Improved methodologies"],
    implications: [
      "Faster time to value",
      "Reduced project risk",
      "Lower implementation costs",
      "Improved user satisfaction",
    ],
    forecast: {
      shortTerm: "Further 20-30% reduction possible",
      longTerm: "Stabilization around 2-4 months",
    },
    data: [
      { period: "2020", value: 18, benchmark: 18 },
      { period: "2021", value: 15, benchmark: 16 },
      { period: "2022", value: 12, benchmark: 14 },
      { period: "2023", value: 9, benchmark: 11 },
      { period: "2024", value: 7, benchmark: 8, forecast: 6 },
      { period: "2025", value: 0, benchmark: 0, forecast: 4 },
    ],
  },
  {
    id: "roi_improvement",
    metric: "Average ROI",
    category: "cost",
    timeframe: "yearly",
    direction: "increasing",
    magnitude: 28.7,
    confidence: "high",
    impact: "high",
    description: "Substantial improvement in return on investment across all sectors",
    drivers: [
      "Lower implementation costs",
      "Operational efficiency gains",
      "Reduced security incidents",
      "Automation benefits",
    ],
    implications: ["Stronger business case", "Increased investment", "Faster adoption", "Better stakeholder buy-in"],
    forecast: {
      shortTerm: "Continued strong growth",
      longTerm: "Stabilization around 55-65% ROI",
    },
    data: [
      { period: "2020", value: 28, benchmark: 28 },
      { period: "2021", value: 32, benchmark: 30 },
      { period: "2022", value: 38, benchmark: 35 },
      { period: "2023", value: 45, benchmark: 42 },
      { period: "2024", value: 52, benchmark: 48, forecast: 58 },
      { period: "2025", value: 0, benchmark: 0, forecast: 62 },
    ],
  },
]

const INDUSTRY_FORECASTS: IndustryForecast[] = [
  {
    industry: "healthcare",
    year: 2025,
    metrics: {
      avgTCOPerDevice: 68,
      avgROI: 58.5,
      cloudAdoption: 78,
      securityScore: 88,
      automationLevel: 72,
      breachCost: 9800000,
    },
    confidence: 0.85,
    keyDrivers: ["Regulatory compliance", "Patient data protection", "Operational efficiency"],
  },
  {
    industry: "financial_services",
    year: 2025,
    metrics: {
      avgTCOPerDevice: 75,
      avgROI: 52.3,
      cloudAdoption: 85,
      securityScore: 92,
      automationLevel: 78,
      breachCost: 5200000,
    },
    confidence: 0.88,
    keyDrivers: ["Regulatory pressure", "Digital transformation", "Risk management"],
  },
  {
    industry: "manufacturing",
    year: 2025,
    metrics: {
      avgTCOPerDevice: 58,
      avgROI: 62.8,
      cloudAdoption: 68,
      securityScore: 82,
      automationLevel: 85,
      breachCost: 4200000,
    },
    confidence: 0.82,
    keyDrivers: ["Industry 4.0", "Supply chain security", "Operational technology integration"],
  },
  {
    industry: "technology",
    year: 2025,
    metrics: {
      avgTCOPerDevice: 45,
      avgROI: 68.2,
      cloudAdoption: 92,
      securityScore: 89,
      automationLevel: 88,
      breachCost: 4800000,
    },
    confidence: 0.9,
    keyDrivers: ["Innovation pressure", "Scalability needs", "Security-first culture"],
  },
  {
    industry: "retail",
    year: 2025,
    metrics: {
      avgTCOPerDevice: 55,
      avgROI: 48.5,
      cloudAdoption: 75,
      securityScore: 78,
      automationLevel: 65,
      breachCost: 2800000,
    },
    confidence: 0.78,
    keyDrivers: ["Omnichannel requirements", "Customer data protection", "Cost optimization"],
  },
]

const TECHNOLOGY_ADOPTION: TechnologyAdoption[] = [
  {
    technology: "Zero Trust Architecture",
    currentAdoption: 42,
    projectedAdoption: 78,
    growthRate: 85.7,
    maturityStage: "growing",
    industryVariation: {
      healthcare: 38,
      financial_services: 52,
      manufacturing: 35,
      technology: 58,
      retail: 28,
    },
    benefits: ["Enhanced security", "Reduced breach risk", "Better compliance"],
    challenges: ["Implementation complexity", "Cultural change", "Integration requirements"],
  },
  {
    technology: "AI-Powered Analytics",
    currentAdoption: 28,
    projectedAdoption: 65,
    growthRate: 132.1,
    maturityStage: "emerging",
    industryVariation: {
      healthcare: 22,
      financial_services: 35,
      manufacturing: 25,
      technology: 45,
      retail: 18,
    },
    benefits: ["Predictive insights", "Automated responses", "Improved efficiency"],
    challenges: ["Data quality", "Skills gap", "Privacy concerns"],
  },
  {
    technology: "Cloud-Native NAC",
    currentAdoption: 68,
    projectedAdoption: 88,
    growthRate: 29.4,
    maturityStage: "mature",
    industryVariation: {
      healthcare: 62,
      financial_services: 75,
      manufacturing: 58,
      technology: 82,
      retail: 65,
    },
    benefits: ["Faster deployment", "Lower costs", "Better scalability"],
    challenges: ["Migration complexity", "Vendor lock-in", "Compliance concerns"],
  },
  {
    technology: "Automated Remediation",
    currentAdoption: 35,
    projectedAdoption: 72,
    growthRate: 105.7,
    maturityStage: "growing",
    industryVariation: {
      healthcare: 28,
      financial_services: 42,
      manufacturing: 38,
      technology: 48,
      retail: 25,
    },
    benefits: ["Reduced response time", "Lower operational costs", "Improved consistency"],
    challenges: ["False positives", "Integration complexity", "Trust issues"],
  },
]

const MarketTrendAnalyzer: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("healthcare")
  const [selectedTimeframe, setSelectedTimeframe] = useState("yearly")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"trends" | "forecasts" | "adoption" | "insights">("trends")

  // Filter trends based on selections
  const filteredTrends = useMemo(() => {
    return MARKET_TRENDS.filter(
      (trend) =>
        (selectedTimeframe === "all" || trend.timeframe === selectedTimeframe) &&
        (selectedCategory === "all" || trend.category === selectedCategory),
    )
  }, [selectedTimeframe, selectedCategory])

  // Get industry forecast
  const industryForecast = useMemo(() => {
    return INDUSTRY_FORECASTS.find((f) => f.industry === selectedIndustry) || INDUSTRY_FORECASTS[0]
  }, [selectedIndustry])

  // Prepare trend chart data
  const trendChartData = useMemo(() => {
    const allPeriods = ["2020", "2021", "2022", "2023", "2024", "2025"]
    return allPeriods.map((period) => {
      const dataPoint: any = { period }
      filteredTrends.forEach((trend) => {
        const trendData = trend.data.find((d) => d.period === period)
        if (trendData) {
          dataPoint[trend.metric] = trendData.value || trendData.forecast
        }
      })
      return dataPoint
    })
  }, [filteredTrends])

  // Format functions
  const formatTrendValue = (value: number, metric: string) => {
    if (metric.includes("TCO") || metric.includes("Cost")) return `$${value}`
    if (metric.includes("ROI") || metric.includes("Adoption") || metric.includes("Score")) return `${value}%`
    if (metric.includes("Time")) return `${value} months`
    return value.toString()
  }

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-red-400" />
      case "stable":
        return <Activity className="h-4 w-4 text-yellow-400" />
      case "volatile":
        return <Activity className="h-4 w-4 text-orange-400" />
      default:
        return <Activity className="h-4 w-4 text-slate-400" />
    }
  }

  const getTrendColor = (direction: string, category: string) => {
    if (category === "cost") {
      return direction === "decreasing" ? "text-green-400" : "text-red-400"
    }
    return direction === "increasing"
      ? "text-green-400"
      : direction === "decreasing"
        ? "text-red-400"
        : "text-yellow-400"
  }

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case "high":
        return <Badge className="bg-green-500/20 text-green-400">High Confidence</Badge>
      case "medium":
        return <Badge className="bg-yellow-500/20 text-yellow-400">Medium Confidence</Badge>
      case "low":
        return <Badge className="bg-red-500/20 text-red-400">Low Confidence</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Market Trend Analysis</h1>
          <p className="text-slate-400 mt-1">Industry trends, forecasts, and technology adoption patterns</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Trends
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Configuration Panel */}
      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Analysis Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-slate-300 text-sm font-medium">Industry Focus</label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="financial_services">Financial Services</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-slate-300 text-sm font-medium">Timeframe</label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Timeframes</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="multi_year">Multi-Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-slate-300 text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cost">Cost Trends</SelectItem>
                  <SelectItem value="security">Security Trends</SelectItem>
                  <SelectItem value="operational">Operational Trends</SelectItem>
                  <SelectItem value="adoption">Adoption Trends</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-slate-300 text-sm font-medium">View Mode</label>
              <Select value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trends">Market Trends</SelectItem>
                  <SelectItem value="forecasts">Industry Forecasts</SelectItem>
                  <SelectItem value="adoption">Technology Adoption</SelectItem>
                  <SelectItem value="insights">Strategic Insights</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Positive Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">
              {
                filteredTrends.filter(
                  (t) =>
                    (t.category === "cost" && t.direction === "decreasing") ||
                    (t.category !== "cost" && t.direction === "increasing"),
                ).length
              }
            </div>
            <div className="text-sm text-slate-400">of {filteredTrends.length} tracked metrics</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              High Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">
              {filteredTrends.filter((t) => t.impact === "high").length}
            </div>
            <div className="text-sm text-slate-400">high-impact trends identified</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Target className="h-5 w-5" />
              High Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">
              {filteredTrends.filter((t) => t.confidence === "high").length}
            </div>
            <div className="text-sm text-slate-400">trends with high confidence</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Forecast Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">87%</div>
            <div className="text-sm text-slate-400">average prediction accuracy</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Market Trends
          </TabsTrigger>
          <TabsTrigger value="forecasts" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Industry Forecasts
          </TabsTrigger>
          <TabsTrigger value="adoption" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Technology Adoption
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Strategic Insights
          </TabsTrigger>
        </TabsList>

        {/* Market Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trend Chart */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Market Trend Evolution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="period" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      {filteredTrends.slice(0, 4).map((trend, index) => (
                        <Line
                          key={trend.id}
                          type="monotone"
                          dataKey={trend.metric}
                          stroke={`hsl(${index * 60 + 200}, 70%, 50%)`}
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Trend Details */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {filteredTrends.map((trend, index) => (
                      <motion.div
                        key={trend.id}
                        className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getTrendIcon(trend.direction)}
                            <span className="font-semibold text-white">{trend.metric}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getConfidenceBadge(trend.confidence)}
                            <Badge variant={trend.impact === "high" ? "default" : "outline"}>
                              {trend.impact} impact
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <span className="text-slate-400 text-sm">Change:</span>
                            <div
                              className={cn("font-semibold text-lg", getTrendColor(trend.direction, trend.category))}
                            >
                              {trend.direction === "increasing" ? "+" : trend.direction === "decreasing" ? "-" : "±"}
                              {Math.abs(trend.magnitude).toFixed(1)}%
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-400 text-sm">Category:</span>
                            <div className="text-white capitalize">{trend.category}</div>
                          </div>
                        </div>

                        <p className="text-sm text-slate-300 mb-3">{trend.description}</p>

                        <div className="space-y-2">
                          <div>
                            <span className="text-slate-400 text-xs">Short-term:</span>
                            <p className="text-slate-300 text-xs">{trend.forecast.shortTerm}</p>
                          </div>
                          <div>
                            <span className="text-slate-400 text-xs">Long-term:</span>
                            <p className="text-slate-300 text-xs">{trend.forecast.longTerm}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Industry Forecasts Tab */}
        <TabsContent value="forecasts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Forecast Chart */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">{selectedIndustry} Industry Forecast 2025</CardTitle>
                <div className="flex items-center gap-2">
                  <Progress value={industryForecast.confidence * 100} className="w-32 h-2" />
                  <span className="text-slate-400 text-sm">
                    {(industryForecast.confidence * 100).toFixed(0)}% confidence
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { metric: "TCO/Device", value: industryForecast.metrics.avgTCOPerDevice, unit: "$" },
                        { metric: "ROI", value: industryForecast.metrics.avgROI, unit: "%" },
                        { metric: "Cloud Adoption", value: industryForecast.metrics.cloudAdoption, unit: "%" },
                        { metric: "Security Score", value: industryForecast.metrics.securityScore, unit: "pts" },
                        { metric: "Automation", value: industryForecast.metrics.automationLevel, unit: "%" },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="metric" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#9CA3AF" />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                        formatter={(value: any, name: string, props: any) => [`${value}${props.payload.unit}`, name]}
                      />
                      <Bar dataKey="value" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Forecast Details */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Forecast Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-slate-800/50">
                      <div className="text-slate-400 text-sm">Avg TCO per Device</div>
                      <div className="text-2xl font-bold text-emerald-400">
                        ${industryForecast.metrics.avgTCOPerDevice}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50">
                      <div className="text-slate-400 text-sm">Expected ROI</div>
                      <div className="text-2xl font-bold text-blue-400">
                        {industryForecast.metrics.avgROI.toFixed(1)}%
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50">
                      <div className="text-slate-400 text-sm">Cloud Adoption</div>
                      <div className="text-2xl font-bold text-purple-400">
                        {industryForecast.metrics.cloudAdoption}%
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50">
                      <div className="text-slate-400 text-sm">Security Score</div>
                      <div className="text-2xl font-bold text-yellow-400">{industryForecast.metrics.securityScore}</div>
                    </div>
                  </div>

                  {/* Key Drivers */}
                  <div>
                    <h4 className="font-semibold text-white mb-3">Key Market Drivers</h4>
                    <div className="space-y-2">
                      {industryForecast.keyDrivers.map((driver, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-slate-300 text-sm">{driver}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risk Factors */}
                  <Alert className="border-yellow-500/50 bg-yellow-500/10">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-yellow-200">
                      <strong>Risk Factors:</strong> Economic uncertainty, regulatory changes, and technology disruption
                      could impact these forecasts by ±15%.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* All Industry Comparison */}
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Cross-Industry Forecast Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={INDUSTRY_FORECASTS}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="industry" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="#9CA3AF" />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="metrics.avgTCOPerDevice" fill="#10b981" name="TCO per Device ($)" />
                    <Bar dataKey="metrics.avgROI" fill="#3b82f6" name="ROI (%)" />
                    <Bar dataKey="metrics.cloudAdoption" fill="#8b5cf6" name="Cloud Adoption (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technology Adoption Tab */}
        <TabsContent value="adoption" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Adoption Chart */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Technology Adoption Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={TECHNOLOGY_ADOPTION}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="technology" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#9CA3AF" />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="currentAdoption" fill="#6b7280" name="Current Adoption (%)" />
                      <Bar dataKey="projectedAdoption" fill="#10b981" name="Projected Adoption (%)" />
                      <Line
                        type="monotone"
                        dataKey="growthRate"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        name="Growth Rate (%)"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Technology Details */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Technology Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {TECHNOLOGY_ADOPTION.map((tech, index) => (
                      <motion.div
                        key={tech.technology}
                        className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-white">{tech.technology}</span>
                          <Badge
                            variant={
                              tech.maturityStage === "mature"
                                ? "default"
                                : tech.maturityStage === "growing"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {tech.maturityStage}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div>
                            <span className="text-slate-400 text-sm">Current:</span>
                            <div className="text-white font-semibold">{tech.currentAdoption}%</div>
                          </div>
                          <div>
                            <span className="text-slate-400 text-sm">Projected:</span>
                            <div className="text-emerald-400 font-semibold">{tech.projectedAdoption}%</div>
                          </div>
                          <div>
                            <span className="text-slate-400 text-sm">Growth:</span>
                            <div className="text-yellow-400 font-semibold">+{tech.growthRate.toFixed(0)}%</div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <Progress value={tech.currentAdoption} className="h-2 mb-1" />
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>Current Adoption</span>
                            <span>{tech.currentAdoption}%</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <span className="text-slate-400 text-xs">Key Benefits:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {tech.benefits.slice(0, 2).map((benefit) => (
                                <Badge key={benefit} variant="outline" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Industry Variation */}
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Technology Adoption by Industry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={Object.keys(TECHNOLOGY_ADOPTION[0].industryVariation).map((industry) => ({
                      industry: industry.replace("_", " "),
                      ...TECHNOLOGY_ADOPTION.reduce((acc, tech) => {
                        acc[tech.technology] = tech.industryVariation[industry]
                        return acc
                      }, {} as any),
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="industry" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="#9CA3AF" />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    {TECHNOLOGY_ADOPTION.map((tech, index) => (
                      <Bar
                        key={tech.technology}
                        dataKey={tech.technology}
                        fill={`hsl(${index * 60 + 200}, 70%, 50%)`}
                        name={tech.technology}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strategic Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Market Opportunities */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Market Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-green-500/50 bg-green-500/10">
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription className="text-green-200">
                    <strong>Cloud Migration Acceleration:</strong> 45% YoY growth in cloud NAC adoption presents
                    significant opportunities for early movers and cost-conscious organizations.
                  </AlertDescription>
                </Alert>

                <Alert className="border-blue-500/50 bg-blue-500/10">
                  <AlertDescription className="text-blue-200">
                    <strong>ROI Improvement Trend:</strong> Average ROI has increased 28.7% annually, making NAC
                    investments increasingly attractive to CFOs and budget committees.
                  </AlertDescription>
                </Alert>

                <Alert className="border-purple-500/50 bg-purple-500/10">
                  <AlertDescription className="text-purple-200">
                    <strong>Automation Dividend:</strong> Organizations implementing automated remediation see 35%
                    reduction in operational costs and 50% faster incident response times.
                  </AlertDescription>
                </Alert>

                <Alert className="border-yellow-500/50 bg-yellow-500/10">
                  <AlertDescription className="text-yellow-200">
                    <strong>Zero Trust Momentum:</strong> 85% growth in zero trust adoption creates demand for
                    integrated NAC solutions that support zero trust architectures.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Strategic Recommendations */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Strategic Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-emerald-400" />
                    <span className="font-semibold text-white">Timing Advantage</span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Current market conditions favor NAC investments. TCO is at historic lows while ROI continues to
                    improve. Act within the next 12 months for optimal positioning.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-blue-400" />
                    <span className="font-semibold text-white">Technology Focus</span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Prioritize cloud-native solutions with AI-powered analytics and automated remediation capabilities.
                    These technologies show the highest growth and ROI potential.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-purple-400" />
                    <span className="font-semibold text-white">Implementation Strategy</span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Adopt a phased approach with quick wins first. Start with cloud deployment and basic automation,
                    then expand to advanced features as the organization matures.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    <span className="font-semibold text-white">Risk Mitigation</span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Avoid over-customization and complex on-premise deployments. Market trends favor standardized,
                    cloud-native approaches with faster time-to-value.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Industry-Specific Insights */}
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Industry-Specific Insights: {selectedIndustry}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Current State */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Current State</h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-slate-800/50">
                      <div className="text-slate-400 text-sm">Market Maturity</div>
                      <div className="text-white font-semibold">
                        {selectedIndustry === "healthcare"
                          ? "Moderate"
                          : selectedIndustry === "financial_services"
                            ? "High"
                            : selectedIndustry === "technology"
                              ? "High"
                              : "Moderate"}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50">
                      <div className="text-slate-400 text-sm">Adoption Rate</div>
                      <div className="text-emerald-400 font-semibold">
                        {industryForecast.metrics.cloudAdoption - 15}%
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50">
                      <div className="text-slate-400 text-sm">Avg Investment</div>
                      <div className="text-blue-400 font-semibold">
                        ${(industryForecast.metrics.avgTCOPerDevice * 1.2).toFixed(0)}/device
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Trends */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Key Trends</h4>
                  <div className="space-y-2">
                    {industryForecast.keyDrivers.map((driver, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2" />
                        <span className="text-slate-300 text-sm">{driver}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Future Outlook */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">2025 Outlook</h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-slate-800/50">
                      <div className="text-slate-400 text-sm">Expected Growth</div>
                      <div className="text-green-400 font-semibold">
                        {(
                          ((industryForecast.metrics.cloudAdoption - (industryForecast.metrics.cloudAdoption - 15)) /
                            (industryForecast.metrics.cloudAdoption - 15)) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50">
                      <div className="text-slate-400 text-sm">Investment Trend</div>
                      <div className="text-red-400 font-semibold">Decreasing</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50">
                      <div className="text-slate-400 text-sm">ROI Projection</div>
                      <div className="text-purple-400 font-semibold">{industryForecast.metrics.avgROI.toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MarketTrendAnalyzer
