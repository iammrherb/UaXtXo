"use client"

import type React from "react"
import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
} from "recharts"
import {
  Users,
  Building,
  Star,
  Shield,
  Award,
  Target,
  Search,
  Download,
  Share,
  Info,
  AlertTriangle,
  CheckCircle,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface PeerProfile {
  id: string
  name: string
  displayName: string
  industry: string
  subIndustry: string
  size: "startup" | "small" | "medium" | "large" | "enterprise"
  region: string
  country: string
  employees: number
  revenue: number
  devices: number
  users: number
  locations: number
  isPublic: boolean
  isAnonymized: boolean
  dataQuality: "high" | "medium" | "low"
  lastUpdated: Date

  // NAC Implementation Details
  implementation: {
    vendor: string
    deploymentModel: "cloud" | "on-premise" | "hybrid"
    implementationDate: Date
    implementationDuration: number // months
    complexity: "simple" | "moderate" | "complex"
    customizations: number
    integrations: string[]
  }

  // Performance Metrics
  metrics: {
    tcoPerDevice: number
    tcoPerUser: number
    totalTCO: number
    roi: number
    paybackPeriod: number
    implementationCost: number
    operationalCost: number
    securityScore: number
    complianceScore: number
    uptimePercentage: number
    userSatisfaction: number
    adminEfficiency: number
    incidentReduction: number
    timeToValue: number // months
  }

  // Similarity Factors
  similarity: {
    overall: number
    industry: number
    size: number
    geography: number
    technology: number
    business: number
  }

  // Benchmarking Data
  benchmarks: {
    industryPercentile: number
    sizePercentile: number
    regionPercentile: number
    overallRanking: number
  }
}

interface CompetitiveAnalysis {
  metric: string
  yourValue: number
  peerAverage: number
  topPerformer: number
  bottomPerformer: number
  yourRank: number
  totalPeers: number
  gap: number
  opportunity: number
}

interface SimilarityWeights {
  industry: number
  size: number
  geography: number
  technology: number
  business: number
}

const SAMPLE_PEER_DATA: PeerProfile[] = [
  {
    id: "peer_001",
    name: "Regional Medical Center",
    displayName: "Anonymous Healthcare Org A",
    industry: "healthcare",
    subIndustry: "hospitals",
    size: "large",
    region: "north_america",
    country: "USA",
    employees: 8500,
    revenue: 2800000000,
    devices: 2800,
    users: 1650,
    locations: 3,
    isPublic: false,
    isAnonymized: true,
    dataQuality: "high",
    lastUpdated: new Date("2024-01-10"),

    implementation: {
      vendor: "portnox",
      deploymentModel: "hybrid",
      implementationDate: new Date("2023-03-15"),
      implementationDuration: 8,
      complexity: "moderate",
      customizations: 3,
      integrations: ["Active Directory", "Epic EMR", "Cisco Infrastructure", "SIEM"],
    },

    metrics: {
      tcoPerDevice: 78,
      tcoPerUser: 132,
      totalTCO: 218400,
      roi: 48.5,
      paybackPeriod: 16.2,
      implementationCost: 85000,
      operationalCost: 133400,
      securityScore: 82,
      complianceScore: 89,
      uptimePercentage: 99.7,
      userSatisfaction: 4.2,
      adminEfficiency: 65,
      incidentReduction: 78,
      timeToValue: 6,
    },

    similarity: {
      overall: 0.92,
      industry: 1.0,
      size: 0.88,
      geography: 0.95,
      technology: 0.85,
      business: 0.9,
    },

    benchmarks: {
      industryPercentile: 75,
      sizePercentile: 82,
      regionPercentile: 78,
      overallRanking: 23,
    },
  },
  {
    id: "peer_002",
    name: "Metro Financial Corp",
    displayName: "Anonymous Financial Org B",
    industry: "financial_services",
    subIndustry: "banking",
    size: "enterprise",
    region: "north_america",
    country: "USA",
    employees: 15000,
    revenue: 8500000000,
    devices: 4200,
    users: 2800,
    locations: 12,
    isPublic: true,
    isAnonymized: true,
    dataQuality: "high",
    lastUpdated: new Date("2024-01-08"),

    implementation: {
      vendor: "cisco",
      deploymentModel: "on-premise",
      implementationDate: new Date("2022-09-20"),
      implementationDuration: 14,
      complexity: "complex",
      customizations: 8,
      integrations: ["Active Directory", "Core Banking", "Cisco Infrastructure", "Splunk", "ServiceNow"],
    },

    metrics: {
      tcoPerDevice: 125,
      tcoPerUser: 188,
      totalTCO: 525000,
      roi: 35.8,
      paybackPeriod: 22.5,
      implementationCost: 180000,
      operationalCost: 345000,
      securityScore: 88,
      complianceScore: 94,
      uptimePercentage: 99.9,
      userSatisfaction: 3.8,
      adminEfficiency: 45,
      incidentReduction: 65,
      timeToValue: 12,
    },

    similarity: {
      overall: 0.75,
      industry: 0.0,
      size: 0.95,
      geography: 0.95,
      technology: 0.7,
      business: 0.85,
    },

    benchmarks: {
      industryPercentile: 65,
      sizePercentile: 88,
      regionPercentile: 72,
      overallRanking: 45,
    },
  },
  {
    id: "peer_003",
    name: "TechFlow Solutions",
    displayName: "Anonymous Tech Org C",
    industry: "technology",
    subIndustry: "software",
    size: "medium",
    region: "north_america",
    country: "USA",
    employees: 2200,
    revenue: 450000000,
    devices: 1850,
    users: 1200,
    locations: 2,
    isPublic: false,
    isAnonymized: true,
    dataQuality: "medium",
    lastUpdated: new Date("2024-01-12"),

    implementation: {
      vendor: "portnox",
      deploymentModel: "cloud",
      implementationDate: new Date("2023-06-10"),
      implementationDuration: 4,
      complexity: "simple",
      customizations: 1,
      integrations: ["Azure AD", "Okta", "AWS Infrastructure", "Datadog"],
    },

    metrics: {
      tcoPerDevice: 52,
      tcoPerUser: 80,
      totalTCO: 96200,
      roi: 58.7,
      paybackPeriod: 12.8,
      implementationCost: 25000,
      operationalCost: 71200,
      securityScore: 88,
      complianceScore: 82,
      uptimePercentage: 99.5,
      userSatisfaction: 4.5,
      adminEfficiency: 78,
      incidentReduction: 85,
      timeToValue: 3,
    },

    similarity: {
      overall: 0.78,
      industry: 0.0,
      size: 0.92,
      geography: 0.95,
      technology: 0.95,
      business: 0.8,
    },

    benchmarks: {
      industryPercentile: 85,
      sizePercentile: 90,
      regionPercentile: 88,
      overallRanking: 12,
    },
  },
  {
    id: "peer_004",
    name: "Global Manufacturing Inc",
    displayName: "Anonymous Manufacturing Org D",
    industry: "manufacturing",
    subIndustry: "automotive",
    size: "enterprise",
    region: "global",
    country: "Multiple",
    employees: 25000,
    revenue: 12000000000,
    devices: 6500,
    users: 4200,
    locations: 28,
    isPublic: true,
    isAnonymized: true,
    dataQuality: "high",
    lastUpdated: new Date("2024-01-05"),

    implementation: {
      vendor: "aruba",
      deploymentModel: "hybrid",
      implementationDate: new Date("2023-01-15"),
      implementationDuration: 11,
      complexity: "complex",
      customizations: 6,
      integrations: ["Active Directory", "SAP", "Aruba Infrastructure", "QRadar", "Maximo"],
    },

    metrics: {
      tcoPerDevice: 95,
      tcoPerUser: 147,
      totalTCO: 617500,
      roi: 42.3,
      paybackPeriod: 18.8,
      implementationCost: 220000,
      operationalCost: 397500,
      securityScore: 79,
      complianceScore: 76,
      uptimePercentage: 99.8,
      userSatisfaction: 4.0,
      adminEfficiency: 58,
      incidentReduction: 72,
      timeToValue: 9,
    },

    similarity: {
      overall: 0.68,
      industry: 0.0,
      size: 0.85,
      geography: 0.7,
      technology: 0.75,
      business: 0.8,
    },

    benchmarks: {
      industryPercentile: 70,
      sizePercentile: 75,
      regionPercentile: 68,
      overallRanking: 38,
    },
  },
  {
    id: "peer_005",
    name: "Retail Chain Plus",
    displayName: "Anonymous Retail Org E",
    industry: "retail",
    subIndustry: "omnichannel",
    size: "large",
    region: "north_america",
    country: "USA",
    employees: 12000,
    revenue: 3200000000,
    devices: 3200,
    users: 2100,
    locations: 85,
    isPublic: true,
    isAnonymized: true,
    dataQuality: "medium",
    lastUpdated: new Date("2024-01-14"),

    implementation: {
      vendor: "fortinet",
      deploymentModel: "hybrid",
      implementationDate: new Date("2022-11-08"),
      implementationDuration: 9,
      complexity: "moderate",
      customizations: 4,
      integrations: ["Active Directory", "Oracle Retail", "Fortinet Infrastructure", "Splunk"],
    },

    metrics: {
      tcoPerDevice: 88,
      tcoPerUser: 134,
      totalTCO: 281600,
      roi: 38.2,
      paybackPeriod: 20.5,
      implementationCost: 95000,
      operationalCost: 186600,
      securityScore: 75,
      complianceScore: 78,
      uptimePercentage: 99.4,
      userSatisfaction: 3.9,
      adminEfficiency: 52,
      incidentReduction: 68,
      timeToValue: 8,
    },

    similarity: {
      overall: 0.82,
      industry: 0.0,
      size: 0.9,
      geography: 0.95,
      technology: 0.8,
      business: 0.85,
    },

    benchmarks: {
      industryPercentile: 60,
      sizePercentile: 68,
      regionPercentile: 65,
      overallRanking: 52,
    },
  },
]

const DEFAULT_SIMILARITY_WEIGHTS: SimilarityWeights = {
  industry: 0.3,
  size: 0.25,
  geography: 0.15,
  technology: 0.2,
  business: 0.1,
}

const PeerAnalysisEngine: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("healthcare")
  const [organizationSize, setOrganizationSize] = useState("medium")
  const [region, setRegion] = useState("north_america")
  const [deviceCount, setDeviceCount] = useState(2500)
  const [userCount, setUserCount] = useState(1500)
  const [similarityWeights, setSimilarityWeights] = useState<SimilarityWeights>(DEFAULT_SIMILARITY_WEIGHTS)
  const [minSimilarity, setMinSimilarity] = useState(70)
  const [maxPeers, setMaxPeers] = useState(10)
  const [showAnonymizedOnly, setShowAnonymizedOnly] = useState(true)
  const [selectedMetrics, setSelectedMetrics] = useState(["tcoPerDevice", "roi", "securityScore"])
  const [viewMode, setViewMode] = useState<"overview" | "detailed" | "competitive" | "insights">("overview")
  const [searchTerm, setSearchTerm] = useState("")

  // User's current metrics (would come from their scenario)
  const userMetrics = {
    tcoPerDevice: 68,
    roi: 45.2,
    paybackPeriod: 18.5,
    securityScore: 78,
    complianceScore: 82,
    adminEfficiency: 55,
    incidentReduction: 70,
    timeToValue: 7,
  }

  // Calculate weighted similarity
  const calculateSimilarity = useCallback(
    (peer: PeerProfile): number => {
      const industryMatch = peer.industry === selectedIndustry ? 1 : 0
      const sizeMatch =
        peer.size === organizationSize ? 1 : Math.max(0, 1 - Math.abs(peer.devices - deviceCount) / deviceCount)
      const geoMatch = peer.region === region ? 1 : 0.5
      const techMatch = peer.implementation.vendor === "portnox" ? 1 : 0.7 // Assuming user is considering Portnox
      const businessMatch = Math.max(0, 1 - Math.abs(peer.users - userCount) / userCount)

      return (
        industryMatch * similarityWeights.industry +
        sizeMatch * similarityWeights.size +
        geoMatch * similarityWeights.geography +
        techMatch * similarityWeights.technology +
        businessMatch * similarityWeights.business
      )
    },
    [selectedIndustry, organizationSize, region, deviceCount, userCount, similarityWeights],
  )

  // Filter and rank peers
  const relevantPeers = useMemo(() => {
    return SAMPLE_PEER_DATA.map((peer) => ({
      ...peer,
      calculatedSimilarity: calculateSimilarity(peer),
    }))
      .filter(
        (peer) =>
          peer.calculatedSimilarity * 100 >= minSimilarity &&
          (!showAnonymizedOnly || peer.isAnonymized) &&
          (searchTerm === "" ||
            peer.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            peer.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
            peer.subIndustry.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      .sort((a, b) => b.calculatedSimilarity - a.calculatedSimilarity)
      .slice(0, maxPeers)
  }, [calculateSimilarity, minSimilarity, showAnonymizedOnly, searchTerm, maxPeers])

  // Competitive analysis
  const competitiveAnalysis = useMemo((): CompetitiveAnalysis[] => {
    const metrics = [
      { key: "tcoPerDevice", name: "TCO per Device", unit: "$", higherIsBetter: false },
      { key: "roi", name: "ROI", unit: "%", higherIsBetter: true },
      { key: "paybackPeriod", name: "Payback Period", unit: "months", higherIsBetter: false },
      { key: "securityScore", name: "Security Score", unit: "points", higherIsBetter: true },
      { key: "complianceScore", name: "Compliance Score", unit: "points", higherIsBetter: true },
      { key: "adminEfficiency", name: "Admin Efficiency", unit: "%", higherIsBetter: true },
      { key: "incidentReduction", name: "Incident Reduction", unit: "%", higherIsBetter: true },
      { key: "timeToValue", name: "Time to Value", unit: "months", higherIsBetter: false },
    ]

    return metrics.map((metric) => {
      const peerValues = relevantPeers.map((peer) => peer.metrics[metric.key as keyof typeof peer.metrics])
      const yourValue = userMetrics[metric.key as keyof typeof userMetrics]

      if (peerValues.length === 0) {
        return {
          metric: metric.name,
          yourValue,
          peerAverage: yourValue,
          topPerformer: yourValue,
          bottomPerformer: yourValue,
          yourRank: 1,
          totalPeers: 1,
          gap: 0,
          opportunity: 0,
        }
      }

      const peerAverage = peerValues.reduce((sum, val) => sum + val, 0) / peerValues.length
      const sortedValues = [...peerValues, yourValue].sort((a, b) => (metric.higherIsBetter ? b - a : a - b))

      const yourRank = sortedValues.indexOf(yourValue) + 1
      const topPerformer = sortedValues[0]
      const bottomPerformer = sortedValues[sortedValues.length - 1]

      const gap = metric.higherIsBetter ? topPerformer - yourValue : yourValue - topPerformer
      const opportunity = (Math.abs(gap) / Math.abs(topPerformer)) * 100

      return {
        metric: metric.name,
        yourValue,
        peerAverage,
        topPerformer,
        bottomPerformer,
        yourRank,
        totalPeers: sortedValues.length,
        gap,
        opportunity,
      }
    })
  }, [relevantPeers, userMetrics])

  // Prepare chart data
  const scatterData = useMemo(() => {
    return relevantPeers
      .map((peer) => ({
        name: peer.displayName,
        x: peer.metrics.tcoPerDevice,
        y: peer.metrics.roi,
        size: peer.devices,
        similarity: peer.calculatedSimilarity * 100,
        vendor: peer.implementation.vendor,
      }))
      .concat([
        {
          name: "Your Organization",
          x: userMetrics.tcoPerDevice,
          y: userMetrics.roi,
          size: deviceCount,
          similarity: 100,
          vendor: "portnox",
        },
      ])
  }, [relevantPeers, userMetrics, deviceCount])

  const radarData = useMemo(() => {
    const metrics = ["securityScore", "complianceScore", "adminEfficiency", "incidentReduction"]
    const maxValues = {
      securityScore: 100,
      complianceScore: 100,
      adminEfficiency: 100,
      incidentReduction: 100,
    }

    return [
      {
        metric: "Your Organization",
        ...metrics.reduce((acc, metric) => {
          acc[metric] =
            (userMetrics[metric as keyof typeof userMetrics] / maxValues[metric as keyof typeof maxValues]) * 100
          return acc
        }, {} as any),
      },
    ].concat(
      relevantPeers.slice(0, 3).map((peer) => ({
        metric: peer.displayName,
        ...metrics.reduce((acc, metric) => {
          acc[metric] =
            (peer.metrics[metric as keyof typeof peer.metrics] / maxValues[metric as keyof typeof maxValues]) * 100
          return acc
        }, {} as any),
      })),
    )
  }, [relevantPeers, userMetrics])

  // Format functions
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Peer Analysis Engine</h1>
          <p className="text-slate-400 mt-1">Deep dive into similar organizations and competitive positioning</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Analysis
          </Button>
          <Button variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Share Report
          </Button>
        </div>
      </div>

      {/* Configuration Panel */}
      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Peer Matching Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
              <Label className="text-slate-300">Size</Label>
              <Select value={organizationSize} onValueChange={setOrganizationSize}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
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
              <Label className="text-slate-300">Min Similarity: {minSimilarity}%</Label>
              <Slider
                value={[minSimilarity]}
                onValueChange={([value]) => setMinSimilarity(value)}
                min={50}
                max={95}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Max Peers: {maxPeers}</Label>
              <Slider
                value={[maxPeers]}
                onValueChange={([value]) => setMaxPeers(value)}
                min={5}
                max={20}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search peers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Similarity Weights */}
          <div className="mt-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <h4 className="font-semibold text-white mb-4">Similarity Weights</h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Object.entries(similarityWeights).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label className="text-slate-300 capitalize">
                    {key}: {(value * 100).toFixed(0)}%
                  </Label>
                  <Slider
                    value={[value * 100]}
                    onValueChange={([newValue]) => setSimilarityWeights((prev) => ({ ...prev, [key]: newValue / 100 }))}
                    min={0}
                    max={50}
                    step={5}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch id="anonymized-only" checked={showAnonymizedOnly} onCheckedChange={setShowAnonymizedOnly} />
              <Label htmlFor="anonymized-only" className="text-slate-300">
                Show anonymized data only
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Matched Peers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-400">{relevantPeers.length}</div>
            <div className="text-sm text-slate-400">
              {relevantPeers.length > 0
                ? `Avg similarity: ${((relevantPeers.reduce((sum, peer) => sum + peer.calculatedSimilarity, 0) / relevantPeers.length) * 100).toFixed(0)}%`
                : "No matches found"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Target className="h-5 w-5" />
              Your Ranking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">
              #{competitiveAnalysis.find((c) => c.metric === "ROI")?.yourRank || "N/A"}
            </div>
            <div className="text-sm text-slate-400">
              of {competitiveAnalysis.find((c) => c.metric === "ROI")?.totalPeers || 0} in ROI
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Award className="h-5 w-5" />
              Best Opportunity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const bestOpp = competitiveAnalysis.reduce((best, current) =>
                current.opportunity > best.opportunity ? current : best,
              )
              return (
                <>
                  <div className="text-3xl font-bold text-yellow-400">{bestOpp.opportunity.toFixed(0)}%</div>
                  <div className="text-sm text-slate-400">{bestOpp.metric} improvement</div>
                </>
              )
            })()}
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Star className="h-5 w-5" />
              Top Performer
            </CardTitle>
          </CardHeader>
          <CardContent>
            {relevantPeers.length > 0 ? (
              <>
                <div className="text-lg font-bold text-green-400">
                  {relevantPeers[0].displayName.split(" ").slice(-2).join(" ")}
                </div>
                <div className="text-sm text-slate-400">{relevantPeers[0].metrics.roi.toFixed(1)}% ROI</div>
              </>
            ) : (
              <div className="text-slate-400">No data</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="detailed" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Peer Details
          </TabsTrigger>
          <TabsTrigger value="competitive" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Competitive Analysis
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* TCO vs ROI Scatter Plot */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">TCO vs ROI Positioning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={scatterData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="x"
                        stroke="#9CA3AF"
                        name="TCO per Device"
                        tickFormatter={(value) => `$${value}`}
                      />
                      <YAxis dataKey="y" stroke="#9CA3AF" name="ROI" tickFormatter={(value) => `${value}%`} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                        formatter={(value: any, name: string) => [
                          name === "x" ? `$${value}` : `${value}%`,
                          name === "x" ? "TCO per Device" : "ROI",
                        ]}
                        labelFormatter={(label) => `Organization: ${label}`}
                      />
                      <Scatter dataKey="y" fill="#10b981">
                        {scatterData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.name === "Your Organization" ? "#10b981" : "#3b82f6"}
                          />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Performance Radar */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Multi-Dimensional Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#374151" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#9CA3AF", fontSize: 10 }} />
                      <Radar
                        name="Your Organization"
                        dataKey="securityScore"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      {relevantPeers.slice(0, 2).map((peer, index) => (
                        <Radar
                          key={peer.id}
                          name={peer.displayName}
                          dataKey="securityScore"
                          stroke={`hsl(${200 + index * 60}, 70%, 50%)`}
                          fill={`hsl(${200 + index * 60}, 70%, 50%)`}
                          fillOpacity={0.1}
                          strokeWidth={1}
                        />
                      ))}
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Detailed Peer Analysis */}
        <TabsContent value="detailed" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Peer Organization Details</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {relevantPeers.map((peer, index) => (
                    <motion.div
                      key={peer.id}
                      className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Building className="h-5 w-5 text-slate-400" />
                          <div>
                            <h3 className="font-semibold text-white">{peer.displayName}</h3>
                            <p className="text-sm text-slate-400">
                              {peer.subIndustry} • {peer.size} • {peer.region}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-yellow-400 font-semibold">
                            {(peer.calculatedSimilarity * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Organization Details */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-white text-sm">Organization</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Employees:</span>
                              <span className="text-white">{peer.employees.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Devices:</span>
                              <span className="text-white">{peer.devices.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Users:</span>
                              <span className="text-white">{peer.users.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Locations:</span>
                              <span className="text-white">{peer.locations}</span>
                            </div>
                          </div>
                        </div>

                        {/* Implementation Details */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-white text-sm">Implementation</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Vendor:</span>
                              <Badge variant="outline" className="text-xs">
                                {peer.implementation.vendor}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Model:</span>
                              <span className="text-white capitalize">{peer.implementation.deploymentModel}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Duration:</span>
                              <span className="text-white">{peer.implementation.implementationDuration} months</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Complexity:</span>
                              <Badge
                                variant={
                                  peer.implementation.complexity === "simple"
                                    ? "default"
                                    : peer.implementation.complexity === "moderate"
                                      ? "secondary"
                                      : "destructive"
                                }
                                className="text-xs"
                              >
                                {peer.implementation.complexity}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-white text-sm">Performance</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-400">TCO/Device:</span>
                              <span className="text-emerald-400 font-semibold">${peer.metrics.tcoPerDevice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">ROI:</span>
                              <span className="text-blue-400 font-semibold">{peer.metrics.roi.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Security Score:</span>
                              <span className="text-purple-400 font-semibold">{peer.metrics.securityScore}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Time to Value:</span>
                              <span className="text-yellow-400 font-semibold">{peer.metrics.timeToValue} months</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Integrations */}
                      <div className="mt-4">
                        <h4 className="font-semibold text-white text-sm mb-2">Key Integrations</h4>
                        <div className="flex flex-wrap gap-2">
                          {peer.implementation.integrations.map((integration) => (
                            <Badge key={integration} variant="outline" className="text-xs">
                              {integration}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competitive Analysis */}
        <TabsContent value="competitive" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Competitive Positioning Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300">Metric</th>
                      <th className="text-center py-3 px-4 text-slate-300">Your Value</th>
                      <th className="text-center py-3 px-4 text-slate-300">Peer Average</th>
                      <th className="text-center py-3 px-4 text-slate-300">Top Performer</th>
                      <th className="text-center py-3 px-4 text-slate-300">Your Rank</th>
                      <th className="text-center py-3 px-4 text-slate-300">Gap to Leader</th>
                      <th className="text-center py-3 px-4 text-slate-300">Opportunity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitiveAnalysis.map((analysis, index) => (
                      <motion.tr
                        key={analysis.metric}
                        className="border-b border-slate-800 hover:bg-slate-800/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="py-3 px-4 font-medium text-white">{analysis.metric}</td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={cn(
                              "font-semibold",
                              analysis.yourRank <= 3
                                ? "text-green-400"
                                : analysis.yourRank <= analysis.totalPeers / 2
                                  ? "text-yellow-400"
                                  : "text-red-400",
                            )}
                          >
                            {analysis.metric.includes("TCO") || analysis.metric.includes("Cost")
                              ? formatCurrency(analysis.yourValue)
                              : analysis.metric.includes("%") ||
                                  analysis.metric.includes("ROI") ||
                                  analysis.metric.includes("Efficiency") ||
                                  analysis.metric.includes("Reduction")
                                ? formatPercentage(analysis.yourValue)
                                : analysis.yourValue.toFixed(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-slate-300">
                          {analysis.metric.includes("TCO") || analysis.metric.includes("Cost")
                            ? formatCurrency(analysis.peerAverage)
                            : analysis.metric.includes("%") ||
                                analysis.metric.includes("ROI") ||
                                analysis.metric.includes("Efficiency") ||
                                analysis.metric.includes("Reduction")
                              ? formatPercentage(analysis.peerAverage)
                              : analysis.peerAverage.toFixed(1)}
                        </td>
                        <td className="py-3 px-4 text-center text-emerald-400 font-semibold">
                          {analysis.metric.includes("TCO") || analysis.metric.includes("Cost")
                            ? formatCurrency(analysis.topPerformer)
                            : analysis.metric.includes("%") ||
                                analysis.metric.includes("ROI") ||
                                analysis.metric.includes("Efficiency") ||
                                analysis.metric.includes("Reduction")
                              ? formatPercentage(analysis.topPerformer)
                              : analysis.topPerformer.toFixed(1)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge
                            variant={
                              analysis.yourRank <= 3
                                ? "default"
                                : analysis.yourRank <= analysis.totalPeers / 2
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            #{analysis.yourRank} of {analysis.totalPeers}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={cn(
                              "font-semibold",
                              Math.abs(analysis.gap) < analysis.topPerformer * 0.1
                                ? "text-green-400"
                                : Math.abs(analysis.gap) < analysis.topPerformer * 0.25
                                  ? "text-yellow-400"
                                  : "text-red-400",
                            )}
                          >
                            {analysis.gap > 0 ? "+" : ""}
                            {analysis.gap.toFixed(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={cn(
                              "font-semibold",
                              analysis.opportunity < 10
                                ? "text-green-400"
                                : analysis.opportunity < 25
                                  ? "text-yellow-400"
                                  : "text-red-400",
                            )}
                          >
                            {analysis.opportunity.toFixed(0)}%
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Insights */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Top Opportunities */}
                {competitiveAnalysis
                  .filter((analysis) => analysis.opportunity > 15)
                  .slice(0, 3)
                  .map((analysis) => (
                    <Alert key={analysis.metric} className="border-yellow-500/50 bg-yellow-500/10">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-yellow-200">
                        <strong>{analysis.metric}:</strong> You rank #{analysis.yourRank} of {analysis.totalPeers}.
                        There's a {analysis.opportunity.toFixed(0)}% improvement opportunity to reach top performer
                        levels.
                      </AlertDescription>
                    </Alert>
                  ))}

                {/* Strengths */}
                {competitiveAnalysis
                  .filter((analysis) => analysis.yourRank <= 3)
                  .slice(0, 2)
                  .map((analysis) => (
                    <Alert key={analysis.metric} className="border-green-500/50 bg-green-500/10">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription className="text-green-200">
                        <strong>Strength in {analysis.metric}:</strong> You rank #{analysis.yourRank} of{" "}
                        {analysis.totalPeers}, performing better than{" "}
                        {(((analysis.totalPeers - analysis.yourRank) / analysis.totalPeers) * 100).toFixed(0)}% of
                        peers.
                      </AlertDescription>
                    </Alert>
                  ))}

                {/* General Insights */}
                <Alert className="border-blue-500/50 bg-blue-500/10">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-blue-200">
                    <strong>Peer Analysis Summary:</strong> Based on {relevantPeers.length} similar organizations,
                    cloud-native deployments show 25% faster time-to-value and 18% better ROI on average.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Strategic Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Implementation Recommendations */}
                <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-purple-400" />
                    <span className="font-semibold text-white">Implementation Strategy</span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Top-performing peers in your industry favor cloud-native deployments with minimal customizations.
                    Consider this approach for faster time-to-value.
                  </p>
                </div>

                {/* Vendor Insights */}
                <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-green-400" />
                    <span className="font-semibold text-white">Vendor Performance</span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Organizations using Portnox show 32% better ROI and 40% faster implementation compared to
                    traditional NAC vendors in your peer group.
                  </p>
                </div>

                {/* Best Practices */}
                <div className="p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-orange-400" />
                    <span className="font-semibold text-white">Best Practices</span>
                  </div>
                  <p className="text-sm text-slate-300">
                    High-performing peers invest in automation and integration. Focus on reducing manual processes to
                    improve admin efficiency by 30-50%.
                  </p>
                </div>

                {/* Risk Mitigation */}
                <div className="p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-red-400" />
                    <span className="font-semibold text-white">Risk Considerations</span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Complex implementations in your peer group show 60% longer deployment times. Prioritize simplicity
                    and phased rollouts for better outcomes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PeerAnalysisEngine
