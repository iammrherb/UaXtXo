"use client"

import type React from "react"
import { useMemo, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDashboardSettings } from "@/context/DashboardContext"
import { useVendorData, type VendorId } from "@/hooks/useVendorData"
import { useTcoCalculator } from "@/hooks/useTcoCalculator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Search,
  Star,
  TrendingUp,
  Award,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Download,
  Eye,
  ContrastIcon as Compare,
} from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  Cell,
} from "recharts"
import { cn } from "@/lib/utils"

interface ComparisonMetric {
  id: string
  label: string
  portnoxScore: number
  competitorScores: { [vendorId: string]: number }
  weight: number
  category: "security" | "performance" | "cost" | "usability" | "support"
  description: string
  unit?: string
}

interface VendorComparisonData {
  vendorId: VendorId
  vendorName: string
  overallScore: number
  categoryScores: {
    security: number
    performance: number
    cost: number
    usability: number
    support: number
  }
  strengths: string[]
  weaknesses: string[]
  marketPosition: "leader" | "challenger" | "niche" | "visionary"
  recommendationScore: number
}

const VendorComparisonView: React.FC = () => {
  const { selectedOrgSize, selectedIndustry, comparisonYears } = useDashboardSettings()
  const { getAllVendorIds, getVendor, vendorsMap, isLoadingAllVendors } = useVendorData()
  const { calculateAllSelectedVendorsTco } = useTcoCalculator()

  const [selectedVendors, setSelectedVendors] = useState<VendorId[]>(["portnox", "cisco_ise", "aruba_clearpass"])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [comparisonData, setComparisonData] = useState<VendorComparisonData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Comparison metrics configuration
  const comparisonMetrics: ComparisonMetric[] = useMemo(
    () => [
      {
        id: "security_coverage",
        label: "Security Coverage",
        portnoxScore: 95,
        competitorScores: { cisco_ise: 88, aruba_clearpass: 85, fortinac: 82 },
        weight: 0.25,
        category: "security",
        description: "Comprehensive security feature coverage",
        unit: "%",
      },
      {
        id: "deployment_speed",
        label: "Deployment Speed",
        portnoxScore: 92,
        competitorScores: { cisco_ise: 65, aruba_clearpass: 70, fortinac: 68 },
        weight: 0.15,
        category: "performance",
        description: "Time to full deployment and configuration",
        unit: "score",
      },
      {
        id: "total_cost",
        label: "Cost Efficiency",
        portnoxScore: 90,
        competitorScores: { cisco_ise: 60, aruba_clearpass: 65, fortinac: 70 },
        weight: 0.2,
        category: "cost",
        description: "Total cost of ownership efficiency",
        unit: "score",
      },
      {
        id: "user_experience",
        label: "User Experience",
        portnoxScore: 88,
        competitorScores: { cisco_ise: 75, aruba_clearpass: 78, fortinac: 72 },
        weight: 0.15,
        category: "usability",
        description: "Ease of use and interface quality",
        unit: "score",
      },
      {
        id: "support_quality",
        label: "Support Quality",
        portnoxScore: 91,
        competitorScores: { cisco_ise: 82, aruba_clearpass: 80, fortinac: 78 },
        weight: 0.1,
        category: "support",
        description: "Technical support and documentation quality",
        unit: "score",
      },
      {
        id: "scalability",
        label: "Scalability",
        portnoxScore: 94,
        competitorScores: { cisco_ise: 85, aruba_clearpass: 83, fortinac: 80 },
        weight: 0.15,
        category: "performance",
        description: "Ability to scale with organization growth",
        unit: "score",
      },
    ],
    [],
  )

  // Generate comparison data
  useEffect(() => {
    if (isLoadingAllVendors) return

    setIsLoading(true)

    const generateComparisonData = () => {
      const allVendorIds = getAllVendorIds()
      const data: VendorComparisonData[] = []

      for (const vendorId of allVendorIds) {
        const vendor = getVendor(vendorId)
        if (!vendor) continue

        // Calculate category scores
        const categoryScores = {
          security: 0,
          performance: 0,
          cost: 0,
          usability: 0,
          support: 0,
        }

        let totalWeightedScore = 0
        let totalWeight = 0

        comparisonMetrics.forEach((metric) => {
          const score = vendorId === "portnox" ? metric.portnoxScore : metric.competitorScores[vendorId] || 70

          categoryScores[metric.category] += score * metric.weight
          totalWeightedScore += score * metric.weight
          totalWeight += metric.weight
        })

        // Normalize category scores
        Object.keys(categoryScores).forEach((category) => {
          const categoryWeight = comparisonMetrics
            .filter((m) => m.category === category)
            .reduce((sum, m) => sum + m.weight, 0)
          if (categoryWeight > 0) {
            categoryScores[category as keyof typeof categoryScores] /= categoryWeight
          }
        })

        const overallScore = totalWeight > 0 ? totalWeightedScore / totalWeight : 0

        // Determine market position based on overall score
        let marketPosition: "leader" | "challenger" | "niche" | "visionary"
        if (overallScore >= 85) marketPosition = "leader"
        else if (overallScore >= 75) marketPosition = "challenger"
        else if (overallScore >= 65) marketPosition = "visionary"
        else marketPosition = "niche"

        // Generate strengths and weaknesses
        const strengths: string[] = []
        const weaknesses: string[] = []

        Object.entries(categoryScores).forEach(([category, score]) => {
          if (score >= 85) {
            strengths.push(`Excellent ${category} capabilities`)
          } else if (score < 70) {
            weaknesses.push(`${category.charAt(0).toUpperCase() + category.slice(1)} needs improvement`)
          }
        })

        data.push({
          vendorId,
          vendorName: vendor.name,
          overallScore,
          categoryScores,
          strengths,
          weaknesses,
          marketPosition,
          recommendationScore: vendorId === "portnox" ? 95 : overallScore * 0.9,
        })
      }

      return data.sort((a, b) => b.overallScore - a.overallScore)
    }

    const data = generateComparisonData()
    setComparisonData(data)
    setIsLoading(false)
  }, [isLoadingAllVendors, getAllVendorIds, getVendor, comparisonMetrics])

  // Filter vendors based on search and category
  const filteredVendors = useMemo(() => {
    return comparisonData.filter((vendor) => {
      const matchesSearch = vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        activeCategory === "all" ||
        (activeCategory === "recommended" && vendor.recommendationScore >= 80) ||
        (activeCategory === "leaders" && vendor.marketPosition === "leader") ||
        (activeCategory === "challengers" && vendor.marketPosition === "challenger")

      return matchesSearch && matchesCategory
    })
  }, [comparisonData, searchTerm, activeCategory])

  // Prepare radar chart data
  const radarData = useMemo(() => {
    const categories = ["security", "performance", "cost", "usability", "support"]
    return categories.map((category) => {
      const dataPoint: any = {
        category: category.charAt(0).toUpperCase() + category.slice(1),
        fullMark: 100,
      }

      selectedVendors.forEach((vendorId) => {
        const vendor = comparisonData.find((v) => v.vendorId === vendorId)
        if (vendor) {
          dataPoint[vendor.vendorName] = vendor.categoryScores[category as keyof typeof vendor.categoryScores]
        }
      })

      return dataPoint
    })
  }, [comparisonData, selectedVendors])

  // Prepare scatter plot data for market positioning
  const scatterData = useMemo(() => {
    return comparisonData.map((vendor) => ({
      x: vendor.categoryScores.performance,
      y: vendor.categoryScores.security,
      z: vendor.overallScore,
      name: vendor.vendorName,
      marketPosition: vendor.marketPosition,
    }))
  }, [comparisonData])

  const getMarketPositionColor = (position: string) => {
    switch (position) {
      case "leader":
        return "#10B981"
      case "challenger":
        return "#3B82F6"
      case "visionary":
        return "#8B5CF6"
      case "niche":
        return "#F59E0B"
      default:
        return "#6B7280"
    }
  }

  const getMarketPositionIcon = (position: string) => {
    switch (position) {
      case "leader":
        return Award
      case "challenger":
        return TrendingUp
      case "visionary":
        return Eye
      case "niche":
        return BarChart3
      default:
        return Activity
    }
  }

  if (isLoading || isLoadingAllVendors) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Vendor Comparison Center</h1>
        </div>
        <div className="p-10 rounded-2xl bg-slate-800/50 animate-pulse h-64 flex items-center justify-center text-slate-400">
          <Compare className="animate-spin h-8 w-8 mr-3" /> Loading Vendor Analysis...
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
          Advanced Vendor Comparison
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Comprehensive analysis and comparison of NAC vendors across multiple dimensions including security,
          performance, cost, usability, and support quality.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                {["all", "recommended", "leaders", "challengers"].map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className="text-xs"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-slate-300">
                {filteredVendors.length} vendors
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="radar" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Radar Analysis
          </TabsTrigger>
          <TabsTrigger value="matrix" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Feature Matrix
          </TabsTrigger>
          <TabsTrigger value="positioning" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Market Position
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Vendor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredVendors.map((vendor, index) => {
                const PositionIcon = getMarketPositionIcon(vendor.marketPosition)

                return (
                  <motion.div
                    key={vendor.vendorId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={cn(
                        "bg-slate-900/50 border-slate-700/50 backdrop-blur-lg hover:bg-slate-800/50 transition-all duration-300 cursor-pointer",
                        selectedVendors.includes(vendor.vendorId) && "ring-2 ring-cyan-400/50 bg-slate-800/70",
                      )}
                      onClick={() => {
                        if (selectedVendors.includes(vendor.vendorId)) {
                          setSelectedVendors((prev) => prev.filter((id) => id !== vendor.vendorId))
                        } else if (selectedVendors.length < 4) {
                          setSelectedVendors((prev) => [...prev, vendor.vendorId])
                        }
                      }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-white flex items-center gap-2">
                            <PositionIcon
                              className="w-5 h-5"
                              style={{ color: getMarketPositionColor(vendor.marketPosition) }}
                            />
                            {vendor.vendorName}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={{
                                borderColor: getMarketPositionColor(vendor.marketPosition),
                                color: getMarketPositionColor(vendor.marketPosition),
                              }}
                            >
                              {vendor.marketPosition}
                            </Badge>
                            {selectedVendors.includes(vendor.vendorId) && (
                              <CheckCircle className="w-4 h-4 text-cyan-400" />
                            )}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Overall Score */}
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white mb-1">{vendor.overallScore.toFixed(0)}</div>
                          <div className="text-sm text-slate-400">Overall Score</div>
                          <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                            <div
                              className="h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${vendor.overallScore}%`,
                                background: `linear-gradient(90deg, ${getMarketPositionColor(vendor.marketPosition)}, ${getMarketPositionColor(vendor.marketPosition)}80)`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Category Scores */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(vendor.categoryScores).map(([category, score]) => (
                            <div key={category} className="flex justify-between">
                              <span className="text-slate-400 capitalize">{category}:</span>
                              <span className="text-white font-medium">{score.toFixed(0)}</span>
                            </div>
                          ))}
                        </div>

                        {/* Strengths */}
                        {vendor.strengths.length > 0 && (
                          <div>
                            <div className="text-sm font-medium text-green-400 mb-1">Strengths</div>
                            <div className="space-y-1">
                              {vendor.strengths.slice(0, 2).map((strength, idx) => (
                                <div key={idx} className="flex items-center gap-1 text-xs text-slate-300">
                                  <CheckCircle className="w-3 h-3 text-green-400" />
                                  {strength}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Recommendation Score */}
                        <div className="pt-2 border-t border-slate-700">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Recommendation:</span>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "w-3 h-3",
                                    i < Math.round(vendor.recommendationScore / 20)
                                      ? "text-yellow-400 fill-current"
                                      : "text-slate-600",
                                  )}
                                />
                              ))}
                              <span className="text-white font-medium ml-1">
                                {vendor.recommendationScore.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="radar" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Multi-Dimensional Comparison</CardTitle>
              <CardDescription className="text-slate-400">
                Radar chart comparing selected vendors across key performance dimensions
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#475569" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: "#94A3B8", fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#94A3B8", fontSize: 10 }} />
                  {selectedVendors.map((vendorId, index) => {
                    const vendor = comparisonData.find((v) => v.vendorId === vendorId)
                    if (!vendor) return null

                    const colors = ["#00D4AA", "#3B82F6", "#8B5CF6", "#F59E0B"]
                    return (
                      <Radar
                        key={vendorId}
                        name={vendor.vendorName}
                        dataKey={vendor.vendorName}
                        stroke={colors[index % colors.length]}
                        fill={colors[index % colors.length]}
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    )
                  })}
                  <Legend />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(30, 41, 59, 0.95)",
                      borderColor: "#475569",
                      borderRadius: "0.75rem",
                      color: "#F1F5F9",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matrix" className="space-y-6">
          {/* Feature Comparison Matrix */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Feature Comparison Matrix</CardTitle>
              <CardDescription className="text-slate-400">
                Detailed comparison of features and capabilities across vendors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                  <thead className="bg-slate-800/70">
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-100">Feature</th>
                      {selectedVendors.map((vendorId) => {
                        const vendor = comparisonData.find((v) => v.vendorId === vendorId)
                        return (
                          <th key={vendorId} className="px-3 py-3.5 text-center text-sm font-semibold text-slate-100">
                            {vendor?.vendorName}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                    {comparisonMetrics.map((metric) => (
                      <tr key={metric.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="py-3 pl-4 pr-3 text-sm">
                          <div>
                            <div className="font-medium text-slate-200">{metric.label}</div>
                            <div className="text-xs text-slate-400">{metric.description}</div>
                          </div>
                        </td>
                        {selectedVendors.map((vendorId) => {
                          const score =
                            vendorId === "portnox" ? metric.portnoxScore : metric.competitorScores[vendorId] || 70

                          return (
                            <td key={vendorId} className="px-3 py-3 text-center">
                              <div className="flex items-center justify-center">
                                <div className="text-lg font-bold text-white mr-2">
                                  {score}
                                  {metric.unit}
                                </div>
                                {score >= 90 ? (
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                ) : score >= 75 ? (
                                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-400" />
                                )}
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positioning" className="space-y-6">
          {/* Market Positioning Scatter Plot */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Market Positioning Analysis</CardTitle>
              <CardDescription className="text-slate-400">
                Performance vs Security positioning with overall score as bubble size
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={scatterData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" strokeOpacity={0.3} />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Performance"
                    domain={[60, 100]}
                    stroke="#94A3B8"
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Security"
                    domain={[60, 100]}
                    stroke="#94A3B8"
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{
                      backgroundColor: "rgba(30, 41, 59, 0.95)",
                      borderColor: "#475569",
                      borderRadius: "0.75rem",
                      color: "#F1F5F9",
                    }}
                    formatter={(value, name) => [value.toFixed(1), name]}
                  />
                  <Scatter name="Vendors" dataKey="z" fill="#8884d8">
                    {scatterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getMarketPositionColor(entry.marketPosition)} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Market Position Legend */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { position: "leader", label: "Leaders", description: "High performance, strong market presence" },
                  {
                    position: "challenger",
                    label: "Challengers",
                    description: "Strong capabilities, growing market share",
                  },
                  {
                    position: "visionary",
                    label: "Visionaries",
                    description: "Innovative solutions, emerging technologies",
                  },
                  { position: "niche", label: "Niche Players", description: "Specialized solutions, focused markets" },
                ].map(({ position, label, description }) => {
                  const Icon = getMarketPositionIcon(position)
                  return (
                    <div key={position} className="flex items-start gap-3">
                      <Icon className="w-5 h-5 mt-1" style={{ color: getMarketPositionColor(position) }} />
                      <div>
                        <div className="font-medium text-white">{label}</div>
                        <div className="text-xs text-slate-400">{description}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

export default VendorComparisonView
