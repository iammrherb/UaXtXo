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
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import {
  TrendingUp,
  Building,
  Users,
  Target,
  Award,
  AlertTriangle,
  Info,
  Download,
  Filter,
  BarChart3,
  Activity,
  Zap,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface IndustryBenchmark {
  industry: string
  segment: string
  metrics: {
    avgTCOPerDevice: number
    avgROI: number
    avgPaybackPeriod: number
    avgImplementationTime: number
    avgSecurityScore: number
    avgComplianceScore: number
    avgEfficiencyGain: number
    avgBreachCost: number
    avgBreachFrequency: number
  }
  percentiles: {
    p25: Record<string, number>
    p50: Record<string, number>
    p75: Record<string, number>
    p90: Record<string, number>
  }
  sampleSize: number
  lastUpdated: Date
  trends: {
    metric: string
    direction: "up" | "down" | "stable"
    change: number
    period: string
  }[]
}

interface PeerOrganization {
  id: string
  name: string
  industry: string
  size: "small" | "medium" | "large" | "enterprise"
  region: string
  devices: number
  users: number
  metrics: {
    tcoPerDevice: number
    roi: number
    paybackPeriod: number
    securityScore: number
    complianceScore: number
    efficiencyGain: number
  }
  isAnonymized: boolean
  similarity: number
}

interface BenchmarkComparison {
  metric: string
  userValue: number
  industryAvg: number
  industryP50: number
  industryP75: number
  industryP90: number
  percentileRank: number
  performance: "excellent" | "good" | "average" | "below_average" | "poor"
  gap: number
  recommendation: string
}

const INDUSTRY_BENCHMARKS: IndustryBenchmark[] = [
  {
    industry: "healthcare",
    segment: "hospitals",
    metrics: {
      avgTCOPerDevice: 85,
      avgROI: 42.5,
      avgPaybackPeriod: 19.2,
      avgImplementationTime: 8.5,
      avgSecurityScore: 78,
      avgComplianceScore: 85,
      avgEfficiencyGain: 35,
      avgBreachCost: 10930000,
      avgBreachFrequency: 0.08,
    },
    percentiles: {
      p25: { tcoPerDevice: 65, roi: 28, paybackPeriod: 24, securityScore: 65, complianceScore: 75 },
      p50: { tcoPerDevice: 82, roi: 41, paybackPeriod: 19, securityScore: 76, complianceScore: 83 },
      p75: { tcoPerDevice: 105, roi: 58, paybackPeriod: 15, securityScore: 88, complianceScore: 92 },
      p90: { tcoPerDevice: 125, roi: 72, paybackPeriod: 12, securityScore: 95, complianceScore: 98 },
    },
    sampleSize: 247,
    lastUpdated: new Date("2024-01-15"),
    trends: [
      { metric: "TCO", direction: "down", change: -8.5, period: "YoY" },
      { metric: "ROI", direction: "up", change: 12.3, period: "YoY" },
      { metric: "Security Score", direction: "up", change: 6.8, period: "YoY" },
    ],
  },
  {
    industry: "financial_services",
    segment: "banks",
    metrics: {
      avgTCOPerDevice: 95,
      avgROI: 38.7,
      avgPaybackPeriod: 16.8,
      avgImplementationTime: 12.3,
      avgSecurityScore: 82,
      avgComplianceScore: 88,
      avgEfficiencyGain: 42,
      avgBreachCost: 5850000,
      avgBreachFrequency: 0.12,
    },
    percentiles: {
      p25: { tcoPerDevice: 72, roi: 25, paybackPeriod: 22, securityScore: 70, complianceScore: 80 },
      p50: { tcoPerDevice: 92, roi: 37, paybackPeriod: 17, securityScore: 80, complianceScore: 87 },
      p75: { tcoPerDevice: 118, roi: 52, paybackPeriod: 13, securityScore: 92, complianceScore: 95 },
      p90: { tcoPerDevice: 145, roi: 68, paybackPeriod: 10, securityScore: 98, complianceScore: 99 },
    },
    sampleSize: 189,
    lastUpdated: new Date("2024-01-15"),
    trends: [
      { metric: "TCO", direction: "stable", change: 1.2, period: "YoY" },
      { metric: "ROI", direction: "up", change: 8.9, period: "YoY" },
      { metric: "Compliance Score", direction: "up", change: 4.5, period: "YoY" },
    ],
  },
  {
    industry: "manufacturing",
    segment: "automotive",
    metrics: {
      avgTCOPerDevice: 72,
      avgROI: 45.8,
      avgPaybackPeriod: 18.5,
      avgImplementationTime: 7.2,
      avgSecurityScore: 75,
      avgComplianceScore: 72,
      avgEfficiencyGain: 48,
      avgBreachCost: 4990000,
      avgBreachFrequency: 0.06,
    },
    percentiles: {
      p25: { tcoPerDevice: 55, roi: 32, paybackPeriod: 24, securityScore: 62, complianceScore: 60 },
      p50: { tcoPerDevice: 70, roi: 44, paybackPeriod: 18, securityScore: 73, complianceScore: 70 },
      p75: { tcoPerDevice: 88, roi: 58, paybackPeriod: 14, securityScore: 85, complianceScore: 82 },
      p90: { tcoPerDevice: 108, roi: 72, paybackPeriod: 11, securityScore: 92, complianceScore: 90 },
    },
    sampleSize: 156,
    lastUpdated: new Date("2024-01-15"),
    trends: [
      { metric: "TCO", direction: "down", change: -12.8, period: "YoY" },
      { metric: "ROI", direction: "up", change: 15.6, period: "YoY" },
      { metric: "Efficiency Gain", direction: "up", change: 9.2, period: "YoY" },
    ],
  },
  {
    industry: "technology",
    segment: "software",
    metrics: {
      avgTCOPerDevice: 58,
      avgROI: 52.3,
      avgPaybackPeriod: 14.2,
      avgImplementationTime: 5.8,
      avgSecurityScore: 85,
      avgComplianceScore: 78,
      avgEfficiencyGain: 55,
      avgBreachCost: 5040000,
      avgBreachFrequency: 0.09,
    },
    percentiles: {
      p25: { tcoPerDevice: 42, roi: 38, paybackPeriod: 18, securityScore: 75, complianceScore: 65 },
      p50: { tcoPerDevice: 56, roi: 51, paybackPeriod: 14, securityScore: 83, complianceScore: 76 },
      p75: { tcoPerDevice: 72, roi: 65, paybackPeriod: 11, securityScore: 92, complianceScore: 88 },
      p90: { tcoPerDevice: 88, roi: 78, paybackPeriod: 8, securityScore: 97, complianceScore: 95 },
    },
    sampleSize: 203,
    lastUpdated: new Date("2024-01-15"),
    trends: [
      { metric: "TCO", direction: "down", change: -15.2, period: "YoY" },
      { metric: "ROI", direction: "up", change: 18.7, period: "YoY" },
      { metric: "Implementation Time", direction: "down", change: -22.5, period: "YoY" },
    ],
  },
  {
    industry: "retail",
    segment: "ecommerce",
    metrics: {
      avgTCOPerDevice: 68,
      avgROI: 39.4,
      avgPaybackPeriod: 20.8,
      avgImplementationTime: 6.5,
      avgSecurityScore: 72,
      avgComplianceScore: 75,
      avgEfficiencyGain: 38,
      avgBreachCost: 3280000,
      avgBreachFrequency: 0.11,
    },
    percentiles: {
      p25: { tcoPerDevice: 48, roi: 26, paybackPeriod: 28, securityScore: 58, complianceScore: 62 },
      p50: { tcoPerDevice: 65, roi: 38, paybackPeriod: 21, securityScore: 70, complianceScore: 73 },
      p75: { tcoPerDevice: 85, roi: 52, paybackPeriod: 16, securityScore: 82, complianceScore: 85 },
      p90: { tcoPerDevice: 105, roi: 65, paybackPeriod: 12, securityScore: 90, complianceScore: 92 },
    },
    sampleSize: 134,
    lastUpdated: new Date("2024-01-15"),
    trends: [
      { metric: "TCO", direction: "down", change: -6.8, period: "YoY" },
      { metric: "ROI", direction: "up", change: 9.5, period: "YoY" },
      { metric: "Security Score", direction: "up", change: 8.2, period: "YoY" },
    ],
  },
]

const PEER_ORGANIZATIONS: PeerOrganization[] = [
  {
    id: "peer_001",
    name: "Regional Medical Center",
    industry: "healthcare",
    size: "large",
    region: "north_america",
    devices: 2800,
    users: 1650,
    metrics: {
      tcoPerDevice: 78,
      roi: 48.5,
      paybackPeriod: 16.2,
      securityScore: 82,
      complianceScore: 89,
      efficiencyGain: 42,
    },
    isAnonymized: true,
    similarity: 0.92,
  },
  {
    id: "peer_002",
    name: "Metro Bank Corp",
    industry: "financial_services",
    size: "enterprise",
    region: "north_america",
    devices: 4200,
    users: 2800,
    metrics: {
      tcoPerDevice: 88,
      roi: 41.2,
      paybackPeriod: 18.5,
      securityScore: 85,
      complianceScore: 92,
      efficiencyGain: 38,
    },
    isAnonymized: true,
    similarity: 0.85,
  },
  {
    id: "peer_003",
    name: "TechFlow Solutions",
    industry: "technology",
    size: "medium",
    region: "north_america",
    devices: 1850,
    users: 1200,
    metrics: {
      tcoPerDevice: 52,
      roi: 58.7,
      paybackPeriod: 12.8,
      securityScore: 88,
      complianceScore: 82,
      efficiencyGain: 62,
    },
    isAnonymized: true,
    similarity: 0.78,
  },
  {
    id: "peer_004",
    name: "Global Manufacturing Inc",
    industry: "manufacturing",
    size: "enterprise",
    region: "global",
    devices: 6500,
    users: 4200,
    metrics: {
      tcoPerDevice: 65,
      roi: 52.3,
      paybackPeriod: 15.2,
      securityScore: 79,
      complianceScore: 76,
      efficiencyGain: 55,
    },
    isAnonymized: true,
    similarity: 0.71,
  },
  {
    id: "peer_005",
    name: "Retail Chain Plus",
    industry: "retail",
    size: "large",
    region: "north_america",
    devices: 3200,
    users: 2100,
    metrics: {
      tcoPerDevice: 72,
      roi: 44.8,
      paybackPeriod: 19.5,
      securityScore: 75,
      complianceScore: 78,
      efficiencyGain: 41,
    },
    isAnonymized: true,
    similarity: 0.88,
  },
]

const IndustryBenchmarkAnalyzer: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("healthcare")
  const [selectedSegment, setSelectedSegment] = useState("hospitals")
  const [organizationSize, setOrganizationSize] = useState("medium")
  const [region, setRegion] = useState("north_america")
  const [deviceCount, setDeviceCount] = useState(2500)
  const [userScenario, setUserScenario] = useState({
    tcoPerDevice: 68,
    roi: 45.2,
    paybackPeriod: 18.5,
    securityScore: 78,
    complianceScore: 82,
    efficiencyGain: 40,
  })
  const [viewMode, setViewMode] = useState<"overview" | "detailed" | "peers" | "trends">("overview")
  const [showConfidenceIntervals, setShowConfidenceIntervals] = useState(true)
  const [similarityThreshold, setSimilarityThreshold] = useState(75)

  // Get current industry benchmark
  const currentBenchmark = useMemo(() => {
    return (
      INDUSTRY_BENCHMARKS.find((b) => b.industry === selectedIndustry && b.segment === selectedSegment) ||
      INDUSTRY_BENCHMARKS[0]
    )
  }, [selectedIndustry, selectedSegment])

  // Calculate benchmark comparisons
  const benchmarkComparisons = useMemo((): BenchmarkComparison[] => {
    const metrics = [
      { key: "tcoPerDevice", name: "TCO per Device", unit: "$", higherIsBetter: false },
      { key: "roi", name: "ROI", unit: "%", higherIsBetter: true },
      { key: "paybackPeriod", name: "Payback Period", unit: "months", higherIsBetter: false },
      { key: "securityScore", name: "Security Score", unit: "points", higherIsBetter: true },
      { key: "complianceScore", name: "Compliance Score", unit: "points", higherIsBetter: true },
      { key: "efficiencyGain", name: "Efficiency Gain", unit: "%", higherIsBetter: true },
    ]

    return metrics.map((metric) => {
      const userValue = userScenario[metric.key as keyof typeof userScenario]
      const industryAvg = currentBenchmark.metrics[
        `avg${metric.key.charAt(0).toUpperCase() + metric.key.slice(1)}` as keyof typeof currentBenchmark.metrics
      ] as number
      const p50 = currentBenchmark.percentiles.p50[metric.key] || industryAvg
      const p75 = currentBenchmark.percentiles.p75[metric.key] || industryAvg * 1.2
      const p90 = currentBenchmark.percentiles.p90[metric.key] || industryAvg * 1.4

      // Calculate percentile rank
      let percentileRank: number
      if (metric.higherIsBetter) {
        if (userValue >= p90) percentileRank = 95
        else if (userValue >= p75) percentileRank = 80
        else if (userValue >= p50) percentileRank = 60
        else percentileRank = 30
      } else {
        if (userValue <= currentBenchmark.percentiles.p25[metric.key]) percentileRank = 95
        else if (userValue <= p50) percentileRank = 80
        else if (userValue <= p75) percentileRank = 60
        else percentileRank = 30
      }

      // Determine performance level
      let performance: BenchmarkComparison["performance"]
      if (percentileRank >= 90) performance = "excellent"
      else if (percentileRank >= 75) performance = "good"
      else if (percentileRank >= 50) performance = "average"
      else if (percentileRank >= 25) performance = "below_average"
      else performance = "poor"

      const gap = metric.higherIsBetter ? p75 - userValue : userValue - p75

      let recommendation = ""
      if (performance === "poor" || performance === "below_average") {
        recommendation = `Consider optimization strategies to improve ${metric.name.toLowerCase()}`
      } else if (performance === "excellent") {
        recommendation = `Excellent performance - consider sharing best practices`
      } else {
        recommendation = `Good performance with room for improvement`
      }

      return {
        metric: metric.name,
        userValue,
        industryAvg,
        industryP50: p50,
        industryP75: p75,
        industryP90: p90,
        percentileRank,
        performance,
        gap,
        recommendation,
      }
    })
  }, [userScenario, currentBenchmark])

  // Filter peer organizations
  const relevantPeers = useMemo(() => {
    return PEER_ORGANIZATIONS.filter(
      (peer) =>
        peer.industry === selectedIndustry &&
        peer.similarity * 100 >= similarityThreshold &&
        Math.abs(peer.devices - deviceCount) / deviceCount < 0.5, // Within 50% of device count
    ).sort((a, b) => b.similarity - a.similarity)
  }, [selectedIndustry, similarityThreshold, deviceCount])

  // Prepare chart data
  const benchmarkChartData = useMemo(() => {
    return benchmarkComparisons.map((comp) => ({
      metric: comp.metric,
      "Your Organization": comp.userValue,
      "Industry Average": comp.industryAvg,
      "75th Percentile": comp.industryP75,
      "90th Percentile": comp.industryP90,
      percentile: comp.percentileRank,
    }))
  }, [benchmarkComparisons])

  // Prepare peer comparison data
  const peerComparisonData = useMemo(() => {
    const metrics = ["tcoPerDevice", "roi", "securityScore"]
    return metrics.map((metric) => {
      const dataPoint: any = { metric: metric.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()) }

      dataPoint["Your Organization"] = userScenario[metric as keyof typeof userScenario]

      relevantPeers.forEach((peer, index) => {
        dataPoint[`Peer ${index + 1}`] = peer.metrics[metric as keyof typeof peer.metrics]
      })

      return dataPoint
    })
  }, [userScenario, relevantPeers])

  // Format currency
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`

  // Get performance color
  const getPerformanceColor = (performance: BenchmarkComparison["performance"]) => {
    switch (performance) {
      case "excellent":
        return "text-green-400"
      case "good":
        return "text-blue-400"
      case "average":
        return "text-yellow-400"
      case "below_average":
        return "text-orange-400"
      case "poor":
        return "text-red-400"
      default:
        return "text-slate-400"
    }
  }

  const getPerformanceBadgeVariant = (performance: BenchmarkComparison["performance"]) => {
    switch (performance) {
      case "excellent":
        return "default"
      case "good":
        return "secondary"
      case "average":
        return "outline"
      case "below_average":
        return "destructive"
      case "poor":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Industry Benchmark Analysis</h1>
          <p className="text-slate-400 mt-1">
            Compare your NAC investment against industry standards and peer organizations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
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
          <CardTitle className="text-white">Benchmark Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-300">Industry</Label>
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
              <Label className="text-slate-300">Segment</Label>
              <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {selectedIndustry === "healthcare" && (
                    <>
                      <SelectItem value="hospitals">Hospitals</SelectItem>
                      <SelectItem value="clinics">Clinics</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                    </>
                  )}
                  {selectedIndustry === "financial_services" && (
                    <>
                      <SelectItem value="banks">Banks</SelectItem>
                      <SelectItem value="credit_unions">Credit Unions</SelectItem>
                      <SelectItem value="investment">Investment Firms</SelectItem>
                    </>
                  )}
                  {selectedIndustry === "manufacturing" && (
                    <>
                      <SelectItem value="automotive">Automotive</SelectItem>
                      <SelectItem value="aerospace">Aerospace</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </>
                  )}
                  {selectedIndustry === "technology" && (
                    <>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                    </>
                  )}
                  {selectedIndustry === "retail" && (
                    <>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="brick_mortar">Brick & Mortar</SelectItem>
                      <SelectItem value="omnichannel">Omnichannel</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Organization Size</Label>
              <Select value={organizationSize} onValueChange={setOrganizationSize}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (100-500 devices)</SelectItem>
                  <SelectItem value="medium">Medium (500-2500 devices)</SelectItem>
                  <SelectItem value="large">Large (2500-10000 devices)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (10000+ devices)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Region</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north_america">North America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia_pacific">Asia Pacific</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Device Count: {deviceCount.toLocaleString()}</Label>
              <Slider
                value={[deviceCount]}
                onValueChange={([value]) => setDeviceCount(value)}
                min={100}
                max={10000}
                step={100}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benchmark Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Building className="h-5 w-5" />
              Industry Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Sample Size:</span>
                <span className="text-white font-semibold">{currentBenchmark.sampleSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Last Updated:</span>
                <span className="text-white font-semibold">{currentBenchmark.lastUpdated.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Avg TCO/Device:</span>
                <span className="text-white font-semibold">${currentBenchmark.metrics.avgTCOPerDevice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Avg ROI:</span>
                <span className="text-white font-semibold">{currentBenchmark.metrics.avgROI.toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Target className="h-5 w-5" />
              Your Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {benchmarkComparisons.slice(0, 2).map((comp) => (
                <div key={comp.metric} className="flex justify-between items-center">
                  <span className="text-slate-400">{comp.metric}:</span>
                  <div className="text-right">
                    <div className="text-white font-semibold">
                      {comp.metric.includes("TCO")
                        ? formatCurrency(comp.userValue)
                        : comp.metric.includes("%") || comp.metric.includes("ROI") || comp.metric.includes("Efficiency")
                          ? formatPercentage(comp.userValue)
                          : comp.userValue.toFixed(1)}
                    </div>
                    <Badge variant={getPerformanceBadgeVariant(comp.performance)} className="text-xs">
                      {comp.percentileRank}th percentile
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Market Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentBenchmark.trends.slice(0, 3).map((trend) => (
                <div key={trend.metric} className="flex justify-between items-center">
                  <span className="text-slate-400">{trend.metric}:</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "font-semibold",
                        trend.direction === "up"
                          ? "text-green-400"
                          : trend.direction === "down"
                            ? "text-red-400"
                            : "text-yellow-400",
                      )}
                    >
                      {trend.direction === "up" ? "+" : trend.direction === "down" ? "" : "±"}
                      {Math.abs(trend.change).toFixed(1)}%
                    </span>
                    {trend.direction === "up" && <TrendingUp className="h-3 w-3 text-green-400" />}
                    {trend.direction === "down" && <TrendingUp className="h-3 w-3 text-red-400 rotate-180" />}
                    {trend.direction === "stable" && <Activity className="h-3 w-3 text-yellow-400" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Peer Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Similar Orgs:</span>
                <span className="text-white font-semibold">{relevantPeers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Avg Similarity:</span>
                <span className="text-white font-semibold">
                  {relevantPeers.length > 0
                    ? (
                        (relevantPeers.reduce((sum, peer) => sum + peer.similarity, 0) / relevantPeers.length) *
                        100
                      ).toFixed(0) + "%"
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Best Performer:</span>
                <span className="text-emerald-400 font-semibold">
                  {relevantPeers.length > 0
                    ? relevantPeers
                        .reduce((best, peer) => (peer.metrics.roi > best.metrics.roi ? peer : best), relevantPeers[0])
                        .metrics.roi.toFixed(1) + "% ROI"
                    : "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="detailed" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Detailed Analysis
          </TabsTrigger>
          <TabsTrigger value="peers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Peer Comparison
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Market Trends
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Benchmark Comparison Chart */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Performance vs Industry Benchmarks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={benchmarkChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="metric" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} fontSize={12} />
                      <YAxis stroke="#9CA3AF" />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="Your Organization" fill="#10b981" name="Your Organization" />
                      <Bar dataKey="Industry Average" fill="#6b7280" name="Industry Average" />
                      <Bar dataKey="75th Percentile" fill="#3b82f6" name="75th Percentile" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {benchmarkComparisons.map((comp) => (
                      <motion.div
                        key={comp.metric}
                        className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-white">{comp.metric}</span>
                          <Badge variant={getPerformanceBadgeVariant(comp.performance)}>
                            {comp.performance.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">Your Value:</span>
                            <div className={cn("font-semibold", getPerformanceColor(comp.performance))}>
                              {comp.metric.includes("TCO")
                                ? formatCurrency(comp.userValue)
                                : comp.metric.includes("%") ||
                                    comp.metric.includes("ROI") ||
                                    comp.metric.includes("Efficiency")
                                  ? formatPercentage(comp.userValue)
                                  : comp.userValue.toFixed(1)}
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-400">Percentile:</span>
                            <div className="font-semibold text-white">{comp.percentileRank}th</div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <Progress value={comp.percentileRank} className="h-2" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Detailed Analysis Tab */}
        <TabsContent value="detailed" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Detailed Benchmark Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300">Metric</th>
                      <th className="text-center py-3 px-4 text-slate-300">Your Value</th>
                      <th className="text-center py-3 px-4 text-slate-300">Industry Avg</th>
                      <th className="text-center py-3 px-4 text-slate-300">50th %ile</th>
                      <th className="text-center py-3 px-4 text-slate-300">75th %ile</th>
                      <th className="text-center py-3 px-4 text-slate-300">90th %ile</th>
                      <th className="text-center py-3 px-4 text-slate-300">Performance</th>
                      <th className="text-left py-3 px-4 text-slate-300">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {benchmarkComparisons.map((comp, index) => (
                      <motion.tr
                        key={comp.metric}
                        className="border-b border-slate-800 hover:bg-slate-800/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="py-3 px-4 font-medium text-white">{comp.metric}</td>
                        <td
                          className={cn("py-3 px-4 text-center font-semibold", getPerformanceColor(comp.performance))}
                        >
                          {comp.metric.includes("TCO")
                            ? formatCurrency(comp.userValue)
                            : comp.metric.includes("%") ||
                                comp.metric.includes("ROI") ||
                                comp.metric.includes("Efficiency")
                              ? formatPercentage(comp.userValue)
                              : comp.userValue.toFixed(1)}
                        </td>
                        <td className="py-3 px-4 text-center text-slate-300">
                          {comp.metric.includes("TCO")
                            ? formatCurrency(comp.industryAvg)
                            : comp.metric.includes("%") ||
                                comp.metric.includes("ROI") ||
                                comp.metric.includes("Efficiency")
                              ? formatPercentage(comp.industryAvg)
                              : comp.industryAvg.toFixed(1)}
                        </td>
                        <td className="py-3 px-4 text-center text-slate-300">
                          {comp.metric.includes("TCO")
                            ? formatCurrency(comp.industryP50)
                            : comp.metric.includes("%") ||
                                comp.metric.includes("ROI") ||
                                comp.metric.includes("Efficiency")
                              ? formatPercentage(comp.industryP50)
                              : comp.industryP50.toFixed(1)}
                        </td>
                        <td className="py-3 px-4 text-center text-slate-300">
                          {comp.metric.includes("TCO")
                            ? formatCurrency(comp.industryP75)
                            : comp.metric.includes("%") ||
                                comp.metric.includes("ROI") ||
                                comp.metric.includes("Efficiency")
                              ? formatPercentage(comp.industryP75)
                              : comp.industryP75.toFixed(1)}
                        </td>
                        <td className="py-3 px-4 text-center text-slate-300">
                          {comp.metric.includes("TCO")
                            ? formatCurrency(comp.industryP90)
                            : comp.metric.includes("%") ||
                                comp.metric.includes("ROI") ||
                                comp.metric.includes("Efficiency")
                              ? formatPercentage(comp.industryP90)
                              : comp.industryP90.toFixed(1)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={getPerformanceBadgeVariant(comp.performance)}>{comp.percentileRank}th</Badge>
                        </td>
                        <td className="py-3 px-4 text-slate-300 text-xs max-w-xs">{comp.recommendation}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Peer Comparison Tab */}
        <TabsContent value="peers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Peer Comparison Chart */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Peer Organization Comparison</CardTitle>
                <div className="flex items-center gap-4">
                  <Label className="text-slate-300">Similarity Threshold: {similarityThreshold}%</Label>
                  <Slider
                    value={[similarityThreshold]}
                    onValueChange={([value]) => setSimilarityThreshold(value)}
                    min={50}
                    max={95}
                    step={5}
                    className="w-32"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={peerComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="metric" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#9CA3AF" />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="Your Organization" fill="#10b981" name="Your Organization" />
                      {relevantPeers.slice(0, 3).map((peer, index) => (
                        <Bar
                          key={peer.id}
                          dataKey={`Peer ${index + 1}`}
                          fill={`hsl(${200 + index * 40}, 70%, 50%)`}
                          name={`Peer ${index + 1}`}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Peer Details */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Similar Organizations</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {relevantPeers.map((peer, index) => (
                      <motion.div
                        key={peer.id}
                        className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-slate-400" />
                            <span className="font-semibold text-white">
                              {peer.isAnonymized ? `Anonymous Peer ${index + 1}` : peer.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-yellow-400 font-semibold">{(peer.similarity * 100).toFixed(0)}%</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">Size:</span>
                            <div className="text-white">{peer.size}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Devices:</span>
                            <div className="text-white">{peer.devices.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">TCO/Device:</span>
                            <div className="text-emerald-400 font-semibold">${peer.metrics.tcoPerDevice}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">ROI:</span>
                            <div className="text-blue-400 font-semibold">{peer.metrics.roi.toFixed(1)}%</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {relevantPeers.length === 0 && (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">No similar organizations found</p>
                        <p className="text-slate-500 text-sm mt-2">
                          Try adjusting the similarity threshold or industry filters
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Market Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trend Analysis */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Market Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentBenchmark.trends.map((trend, index) => (
                    <motion.div
                      key={trend.metric}
                      className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-white">{trend.metric}</span>
                        <div className="flex items-center gap-2">
                          {trend.direction === "up" && <TrendingUp className="h-4 w-4 text-green-400" />}
                          {trend.direction === "down" && <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />}
                          {trend.direction === "stable" && <Activity className="h-4 w-4 text-yellow-400" />}
                          <span
                            className={cn(
                              "font-semibold",
                              trend.direction === "up"
                                ? "text-green-400"
                                : trend.direction === "down"
                                  ? "text-red-400"
                                  : "text-yellow-400",
                            )}
                          >
                            {trend.direction === "up" ? "+" : trend.direction === "down" ? "" : "±"}
                            {Math.abs(trend.change).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <div className="text-sm text-slate-400">
                        {trend.period} change in industry {trend.metric.toLowerCase()}
                      </div>

                      <div className="mt-3">
                        <Progress value={Math.min(100, Math.abs(trend.change) * 5)} className="h-2" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Industry Insights */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Industry Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="border-blue-500/50 bg-blue-500/10">
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-blue-200">
                      <strong>Cost Optimization Trend:</strong> Organizations in {selectedIndustry} are seeing average
                      TCO reductions of 8-15% year-over-year through cloud-native NAC solutions.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-green-500/50 bg-green-500/10">
                    <AlertDescription className="text-green-200">
                      <strong>ROI Improvement:</strong> The median ROI in your industry has increased by
                      {currentBenchmark.trends.find((t) => t.metric === "ROI")?.change.toFixed(1) || "10"}% over the
                      past year, driven by automation and efficiency gains.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-yellow-500/50 bg-yellow-500/10">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-yellow-200">
                      <strong>Security Focus:</strong> Organizations are prioritizing security scores, with top
                      performers achieving 90+ security ratings through comprehensive NAC implementations.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-purple-500/50 bg-purple-500/10">
                    <AlertDescription className="text-purple-200">
                      <strong>Implementation Speed:</strong> Leading organizations are reducing implementation times by
                      20-30% through better planning and cloud-native solutions.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Items */}
      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benchmarkComparisons
              .filter((comp) => comp.performance === "below_average" || comp.performance === "poor")
              .slice(0, 3)
              .map((comp, index) => (
                <motion.div
                  key={comp.metric}
                  className="p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    <span className="font-semibold text-white">{comp.metric}</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">{comp.recommendation}</p>
                  <div className="text-xs text-orange-400">
                    Gap to 75th percentile: {comp.gap > 0 ? "+" : ""}
                    {comp.gap.toFixed(1)}
                  </div>
                </motion.div>
              ))}

            {benchmarkComparisons.filter((comp) => comp.performance === "below_average" || comp.performance === "poor")
              .length === 0 && (
              <div className="col-span-full text-center py-8">
                <Award className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <p className="text-green-400 font-semibold">Excellent Performance!</p>
                <p className="text-slate-400 text-sm mt-2">
                  Your organization is performing well across all benchmarked metrics
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default IndustryBenchmarkAnalyzer
