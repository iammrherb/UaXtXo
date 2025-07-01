"use client"

import React from "react"
import { useMemo, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDashboardSettings } from "@/context/DashboardContext"
import { useVendorData, type VendorId, type NewVendorData } from "@/hooks/useVendorData"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Search,
  TrendingUp,
  Award,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  Activity,
  Download,
  Eye,
  MinusCircle,
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
  Tooltip as RechartsTooltip,
  Legend,
  ScatterChart,
  Scatter,
  Cell,
} from "recharts"
import { cn } from "@/lib/utils"

// --- FEATURE MATRIX CONFIGURATION ---
const featureMatrixConfig = {
  "Authentication Methods": ["802.1X", "MAB", "Web Auth", "SAML 2.0", "OAuth 2.0", "TACACS+", "Cert-Based"],
  "Device & Network Support": ["Wired", "Wireless", "VPN", "BYOD", "IoT", "OT", "Guest", "Mobile"],
  "Advanced Features": ["Zero Trust", "AI/ML", "Cloud Native", "HA/DR", "API", "Automation"],
  "Compliance & Security": ["PCI", "HIPAA", "SOC2", "ISO27001", "GDPR", "Posture"],
}

type FeatureCategory = keyof typeof featureMatrixConfig
type FeatureName = (typeof featureMatrixConfig)[FeatureCategory][number]

const VendorComparisonView: React.FC = () => {
  const { selectedOrgSize, selectedIndustry, comparisonYears } = useDashboardSettings()
  const { getAllVendorIds, getVendor, vendorsMap, isLoadingAllVendors } = useVendorData()

  const [selectedVendors, setSelectedVendors] = useState<VendorId[]>(["portnox", "cisco_ise", "aruba_clearpass"])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [comparisonData, setComparisonData] = useState<NewVendorData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoadingAllVendors) return

    setIsLoading(true)
    const allVendors = getAllVendorIds()
      .map((id) => getVendor(id))
      .filter(Boolean) as NewVendorData[]
    setComparisonData(
      allVendors.sort(
        (a, b) =>
          (b.comparativeScores?.totalCostOfOwnershipScore || 0) - (a.comparativeScores?.totalCostOfOwnershipScore || 0),
      ),
    )
    setIsLoading(false)
  }, [isLoadingAllVendors, getAllVendorIds, getVendor])

  const filteredVendors = useMemo(() => {
    return comparisonData.filter((vendor) => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
      // Add category filtering logic if needed later
      return matchesSearch
    })
  }, [comparisonData, searchTerm, activeCategory])

  const radarData = useMemo(() => {
    const categories = [
      "securityEffectiveness",
      "easeOfDeployment",
      "scalability",
      "integrationCapabilities",
      "totalCostOfOwnershipScore",
      "complianceCoverageScore",
    ]
    const categoryLabels = {
      securityEffectiveness: "Security",
      easeOfDeployment: "Deployment",
      scalability: "Scalability",
      integrationCapabilities: "Integrations",
      totalCostOfOwnershipScore: "TCO Score",
      complianceCoverageScore: "Compliance",
    }

    return categories.map((category) => {
      const dataPoint: any = {
        category: categoryLabels[category as keyof typeof categoryLabels],
        fullMark: 100,
      }
      selectedVendors.forEach((vendorId) => {
        const vendor = comparisonData.find((v) => v.id === vendorId)
        if (vendor && vendor.comparativeScores) {
          dataPoint[vendor.name] = vendor.comparativeScores[category as keyof typeof vendor.comparativeScores]
        }
      })
      return dataPoint
    })
  }, [comparisonData, selectedVendors])

  const scatterData = useMemo(() => {
    return comparisonData.map((vendor) => ({
      x: vendor.comparativeScores?.easeOfDeployment || 0,
      y: vendor.comparativeScores?.securityEffectiveness || 0,
      z: vendor.comparativeScores?.totalCostOfOwnershipScore || 0,
      name: vendor.name,
    }))
  }, [comparisonData])

  const getMarketPositionColor = (score: number) => {
    if (score >= 90) return "#10B981" // Leader (Emerald)
    if (score >= 80) return "#3B82F6" // Challenger (Blue)
    if (score >= 70) return "#8B5CF6" // Visionary (Violet)
    return "#F59E0B" // Niche (Amber)
  }

  const getMarketPositionIcon = (score: number) => {
    if (score >= 90) return Award
    if (score >= 80) return TrendingUp
    if (score >= 70) return Eye
    return BarChart3
  }

  const renderFeatureScore = (score: number) => {
    if (score >= 95) return <CheckCircle className="w-5 h-5 text-emerald-400" />
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-500" />
    if (score >= 60) return <MinusCircle className="w-5 h-5 text-yellow-500" />
    return <XCircle className="w-5 h-5 text-red-500" />
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
          Comprehensive analysis of NAC vendors across features, cost, security, and performance.
        </p>
      </div>

      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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

      <Tabs defaultValue="matrix" className="w-full">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredVendors.map((vendor, index) => {
                const overallScore = vendor.comparativeScores?.totalCostOfOwnershipScore || 0
                const PositionIcon = getMarketPositionIcon(overallScore)
                return (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={cn(
                        "bg-slate-900/50 border-slate-700/50 backdrop-blur-lg hover:bg-slate-800/50 transition-all duration-300 cursor-pointer h-full flex flex-col",
                        selectedVendors.includes(vendor.id) && "ring-2 ring-cyan-400/50 bg-slate-800/70",
                      )}
                      onClick={() => {
                        if (selectedVendors.includes(vendor.id)) {
                          setSelectedVendors((prev) => prev.filter((id) => id !== vendor.id))
                        } else if (selectedVendors.length < 4) {
                          setSelectedVendors((prev) => [...prev, vendor.id])
                        }
                      }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-white flex items-center gap-2">
                            <PositionIcon className="w-5 h-5" style={{ color: getMarketPositionColor(overallScore) }} />
                            {vendor.name}
                          </CardTitle>
                          {selectedVendors.includes(vendor.id) && <CheckCircle className="w-5 h-5 text-cyan-400" />}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="text-center mb-4">
                            <div className="text-3xl font-bold text-white mb-1">{overallScore.toFixed(0)}</div>
                            <div className="text-sm text-slate-400">Overall Score</div>
                            <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                              <div
                                className="h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: `${overallScore}%`,
                                  background: `linear-gradient(90deg, ${getMarketPositionColor(overallScore)}, ${getMarketPositionColor(overallScore)}80)`,
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            {vendor.strengths?.slice(0, 2).map((strength, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                                <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>{strength}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="pt-2 border-t border-slate-700 mt-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Deployment:</span>
                            <span className="text-white font-medium">
                              {vendor.implementation.averageDeploymentTimeDays} days
                            </span>
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

        <TabsContent value="matrix" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Feature Comparison Matrix</CardTitle>
              <CardDescription className="text-slate-400">
                Detailed comparison of features across selected vendors. Scores are from 0-100.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                  <thead className="bg-slate-800/70 sticky top-0 z-10">
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-100">Feature</th>
                      {selectedVendors.map((vendorId) => {
                        const vendor = comparisonData.find((v) => v.id === vendorId)
                        return (
                          <th key={vendorId} className="px-3 py-3.5 text-center text-sm font-semibold text-slate-100">
                            {vendor?.name}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                    {Object.entries(featureMatrixConfig).map(([category, features]) => (
                      <React.Fragment key={category}>
                        <tr className="bg-slate-800">
                          <td
                            colSpan={selectedVendors.length + 1}
                            className="py-2 pl-4 text-sm font-bold text-cyan-400"
                          >
                            {category}
                          </td>
                        </tr>
                        {features.map((feature) => (
                          <tr key={feature} className="hover:bg-slate-700/30 transition-colors">
                            <td className="py-3 pl-6 pr-3 text-sm font-medium text-slate-200">{feature}</td>
                            {selectedVendors.map((vendorId) => {
                              const vendor = comparisonData.find((v) => v.id === vendorId)
                              const score = vendor?.features?.[category]?.[feature]?.score || 0
                              return (
                                <td key={`${vendorId}-${feature}`} className="px-3 py-3 text-center">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div className="flex items-center justify-center">
                                          {renderFeatureScore(score)}
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-slate-900 border-slate-700 text-white">
                                        <p>
                                          {vendor?.name}: {feature}
                                        </p>
                                        <p>Score: {score}/100</p>
                                        <p className="text-xs text-slate-400">
                                          {vendor?.features?.[category]?.[feature]?.details}
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </td>
                              )
                            })}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="radar" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Multi-Dimensional Comparison</CardTitle>
              <CardDescription className="text-slate-400">
                Radar chart comparing selected vendors across key performance dimensions.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#475569" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: "#94A3B8", fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#94A3B8", fontSize: 10 }} />
                  {selectedVendors.map((vendorId, index) => {
                    const vendor = comparisonData.find((v) => v.id === vendorId)
                    if (!vendor) return null
                    const colors = ["#00D4AA", "#3B82F6", "#8B5CF6", "#F59E0B"]
                    return (
                      <Radar
                        key={vendorId}
                        name={vendor.name}
                        dataKey={vendor.name}
                        stroke={colors[index % colors.length]}
                        fill={colors[index % colors.length]}
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    )
                  })}
                  <Legend />
                  <RechartsTooltip
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

        <TabsContent value="positioning" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Market Positioning Analysis</CardTitle>
              <CardDescription className="text-slate-400">
                Ease of Deployment vs. Security Effectiveness, with TCO score as bubble size.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={scatterData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" strokeOpacity={0.3} />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Ease of Deployment"
                    domain={[0, 100]}
                    stroke="#94A3B8"
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Security Effectiveness"
                    domain={[50, 100]}
                    stroke="#94A3B8"
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                  />
                  <RechartsTooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{
                      backgroundColor: "rgba(30, 41, 59, 0.95)",
                      borderColor: "#475569",
                      borderRadius: "0.75rem",
                      color: "#F1F5F9",
                    }}
                  />
                  <Legend />
                  <Scatter name="Vendors" dataKey="z" fill="#8884d8">
                    {scatterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getMarketPositionColor(entry.y)} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

export default VendorComparisonView
