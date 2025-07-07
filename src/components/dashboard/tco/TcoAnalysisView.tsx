"use client"

import type React from "react"
import { useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useDashboardSettings } from "@/context/DashboardContext"
import { useVendorData, type VendorId } from "@/hooks/useVendorData"
import { useTcoCalculator, type TCOResult, type TCOResultBreakdown } from "@/hooks/useTcoCalculator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { cn } from "@/lib/utils"
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity,
  Download,
} from "lucide-react"

// Import our new advanced chart components
import InteractiveTCOChart from "@/components/charts/advanced/InteractiveTCOChart"
import RealTimeMetrics from "@/components/charts/advanced/RealTimeMetrics"
import DrillDownTreemap from "@/components/charts/advanced/DrillDownTreemap"

// Define colors for chart segments and vendors
const COST_CATEGORY_COLORS: { [key in keyof TCOResultBreakdown]: string } = {
  software: "#3B82F6", // Blue
  hardware: "#EF4444", // Red
  implementation: "#F59E0B", // Amber
  operational: "#10B981", // Emerald
  support: "#8B5CF6", // Violet
  hidden: "#64748B", // Slate
}

const VENDOR_COLORS = [
  "#00D4AA", // Portnox Primary
  "#FF6B35", // Portnox Accent
  "#3B82F6", // Blue
  "#8B5CF6", // Violet
  "#10B981", // Emerald
  "#F59E0B", // Amber
]

// Enhanced Metric Card component
interface MetricCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ElementType
  trend?: "up" | "down" | "neutral"
  trendText?: string
  unit?: string
  variant?: "default" | "primary" | "highlight"
  isLoading?: boolean
}

const EnhancedMetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendText,
  unit,
  variant,
  isLoading,
}) => {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : null

  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-105",
        variant === "primary" && "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400/30",
        variant === "highlight" && "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400/30",
      )}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {isLoading ? (
        <div className="h-36 animate-pulse space-y-3">
          <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
          <div className="h-10 bg-slate-600/50 rounded w-1/2"></div>
          <div className="h-4 bg-slate-700/50 rounded w-full"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-300 group-hover:text-white">{title}</h3>
            {Icon && <Icon className="h-6 w-6 text-cyan-400" />}
          </div>
          <p className="text-3xl font-bold text-white mb-1">
            {value}
            {unit && <span className="text-xl ml-1 text-slate-400">{unit}</span>}
          </p>
          {description && <p className="text-xs text-slate-400 mb-3">{description}</p>}
          {trend && TrendIcon && trendText && (
            <div
              className={cn(
                "flex items-center text-xs",
                trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : "text-slate-400",
              )}
            >
              <TrendIcon className="h-4 w-4 mr-1" />
              {trendText}
            </div>
          )}
        </>
      )}
    </motion.div>
  )
}

const TcoAnalysisView: React.FC = () => {
  const { selectedOrgSize, selectedIndustry, comparisonYears } = useDashboardSettings()
  const { getAllVendorIds, getVendor, isLoadingAllVendors } = useVendorData()
  const { calculateAllSelectedVendorsTco } = useTcoCalculator()

  const [isLoadingCalculations, setIsLoadingCalculations] = useState(true)
  const [tcoResults, setTcoResults] = useState<TCOResult[]>([])
  const [activeTab, setActiveTab] = useState("overview")

  // For this initial view, let's use a predefined set of vendors or all.
  const vendorIdsForAnalysis: VendorId[] = useMemo(() => {
    const allIds = getAllVendorIds()
    const mainCompetitors: VendorId[] = ["cisco_ise", "aruba_clearpass", "fortinac"]
    const selected: VendorId[] = ["portnox"]
    for (const competitor of mainCompetitors) {
      if (allIds.includes(competitor) && selected.length < 4) {
        selected.push(competitor)
      }
      if (selected.length >= 4) break
    }
    if (selected.length < 4) {
      for (const id of allIds) {
        if (!selected.includes(id) && selected.length < 4) {
          selected.push(id)
        }
        if (selected.length >= 4) break
      }
    }
    return selected
  }, [getAllVendorIds])

  useEffect(() => {
    if (isLoadingAllVendors || vendorIdsForAnalysis.length === 0) {
      setIsLoadingCalculations(true)
      return
    }

    setIsLoadingCalculations(true)
    const results = calculateAllSelectedVendorsTco({
      vendorIds: vendorIdsForAnalysis,
      orgSizeId: selectedOrgSize,
      industryId: selectedIndustry,
      projectionYears: comparisonYears,
    })
    setTcoResults(results)
    setIsLoadingCalculations(false)
  }, [
    vendorIdsForAnalysis,
    selectedOrgSize,
    selectedIndustry,
    comparisonYears,
    calculateAllSelectedVendorsTco,
    isLoadingAllVendors,
  ])

  const chartData = useMemo(() => {
    return tcoResults.map((result) => ({
      name: result.vendorName,
      ...result.breakdown,
      total: result.totalTCO,
    }))
  }, [tcoResults])

  // Prepare drill-down data for interactive charts
  const drillDownLevels = useMemo(() => {
    if (tcoResults.length === 0) return []

    return [
      {
        id: "cost-categories",
        title: "Cost Categories Breakdown",
        chartType: "pie" as const,
        parentId: "root",
        data: Object.keys(COST_CATEGORY_COLORS).map((category) => ({
          name: category.charAt(0).toUpperCase() + category.slice(1),
          value: tcoResults.reduce(
            (acc, result) => acc + (result.breakdown[category as keyof TCOResultBreakdown] || 0),
            0,
          ),
        })),
      },
      {
        id: "vendor-comparison",
        title: "Vendor Comparison",
        chartType: "bar" as const,
        parentId: "root",
        data: tcoResults.map((result) => ({
          name: result.vendorName,
          value: result.totalTCO,
          trend: Math.random() > 0.5 ? "up" : "down",
        })),
      },
    ]
  }, [tcoResults])

  // Prepare treemap data
  const treemapData = useMemo(() => {
    return tcoResults.map((vendor) => ({
      name: vendor.vendorName,
      value: vendor.totalTCO,
      children: Object.entries(vendor.breakdown).map(([category, value]) => ({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        value: value || 0,
        category: "Cost Category",
        description: `${category} costs for ${vendor.vendorName}`,
        trend: Math.random() > 0.5 ? "up" : ("down" as const),
        trendValue: Math.round(Math.random() * 20 - 10),
      })),
    }))
  }, [tcoResults])

  const portnoxResult = tcoResults.find((r) => r.vendorId === "portnox")
  const averageCompetitorTCO = useMemo(() => {
    const competitors = tcoResults.filter((r) => r.vendorId !== "portnox")
    if (competitors.length === 0) return null
    return competitors.reduce((acc, curr) => acc + curr.totalTCO, 0) / competitors.length
  }, [tcoResults])

  let portnoxSavings = 0
  let portnoxSavingsPercent = 0
  if (portnoxResult && averageCompetitorTCO && averageCompetitorTCO > 0) {
    portnoxSavings = averageCompetitorTCO - portnoxResult.totalTCO
    portnoxSavingsPercent = (portnoxSavings / averageCompetitorTCO) * 100
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  }

  if (isLoadingAllVendors || isLoadingCalculations) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">TCO Analysis Center</h1>
        </div>
        <div className="p-10 rounded-2xl bg-slate-800/50 animate-pulse h-64 flex items-center justify-center text-slate-400">
          <RefreshCw className="animate-spin h-8 w-8 mr-3" /> Loading Advanced TCO Analytics...
        </div>
      </div>
    )
  }

  if (tcoResults.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">TCO Analysis Center</h1>
        </div>
        <div className="p-10 rounded-2xl bg-slate-800/50 text-center text-slate-400">
          <AlertTriangle size={48} className="mx-auto mb-4 text-yellow-500" />
          No TCO data available for the current selection. Please adjust vendor selection or other parameters.
        </div>
      </div>
    )
  }

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate" className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 mb-4">
          Advanced TCO Analysis Center
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Interactive analysis with drill-down capabilities and real-time insights for Total Cost of Ownership across
          selected vendors over a {comparisonYears}-year period in the {selectedIndustry} industry ({selectedOrgSize}).
        </p>
      </div>

      {/* Enhanced Key Metrics */}
      {portnoxResult && averageCompetitorTCO && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EnhancedMetricCard
            title="Portnox TCO"
            value={portnoxResult.totalTCO.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            })}
            description={`${comparisonYears}-Year Total Investment`}
            icon={DollarSign}
            variant="highlight"
            trend="down"
            trendText="Optimized Cost Structure"
          />
          <EnhancedMetricCard
            title="Market Average TCO"
            value={averageCompetitorTCO.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            })}
            description={`${comparisonYears}-Year Competitor Average`}
            icon={BarChart3}
            trend="neutral"
          />
          <EnhancedMetricCard
            title="Portnox Advantage"
            value={portnoxSavings.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            })}
            unit={`(${portnoxSavingsPercent.toFixed(0)}%)`}
            description={`Savings Over ${comparisonYears} Years`}
            icon={portnoxSavings > 0 ? TrendingUp : TrendingDown}
            trend={portnoxSavings > 0 ? "up" : "down"}
            trendText={portnoxSavings > 0 ? "Significant Savings" : "Higher Investment"}
            variant={portnoxSavings > 0 ? "primary" : undefined}
          />
        </div>
      )}

      {/* Advanced Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="interactive" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Interactive
          </TabsTrigger>
          <TabsTrigger value="realtime" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Real-Time
          </TabsTrigger>
          <TabsTrigger value="breakdown" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Breakdown
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Traditional Stacked Bar Chart */}
          <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-white">TCO Breakdown by Vendor & Category</CardTitle>
                  <CardDescription className="text-slate-400">
                    Visual comparison of cost components for each solution over {comparisonYears} years.
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="text-slate-300 border-slate-600 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export Chart
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-[500px] pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    {Object.entries(COST_CATEGORY_COLORS).map(([key, color]) => (
                      <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                        <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} stroke="#475569" />
                  <XAxis
                    type="number"
                    stroke="#94A3B8"
                    tickFormatter={(value) => `$${(value / 1000).toLocaleString()}K`}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis type="category" dataKey="name" stroke="#94A3B8" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: "rgba(71, 85, 105, 0.3)" }}
                    contentStyle={{
                      backgroundColor: "rgba(30, 41, 59, 0.95)",
                      borderColor: "#475569",
                      borderRadius: "0.75rem",
                      color: "#F1F5F9",
                      backdropFilter: "blur(8px)",
                    }}
                    formatter={(value: number, name: string) => [
                      `$${value.toLocaleString()}`,
                      name.charAt(0).toUpperCase() + name.slice(1),
                    ]}
                    labelStyle={{ fontWeight: "bold", color: "#E2E8F0" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                  {Object.keys(COST_CATEGORY_COLORS).map((key) => (
                    <Bar
                      key={key}
                      dataKey={key}
                      stackId="a"
                      fill={`url(#gradient-${key})`}
                      name={key.charAt(0).toUpperCase() + key.slice(1)}
                      radius={[0, 6, 6, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Cost Table */}
          <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Detailed Cost Breakdown Table</CardTitle>
              <CardDescription className="text-slate-400">
                Numerical values for each cost category per vendor over {comparisonYears} years. All figures in USD.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-slate-700">
                <table className="min-w-full divide-y divide-slate-700">
                  <thead className="bg-slate-800/70">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-100 sm:pl-6 sticky left-0 bg-slate-800/70 z-10"
                      >
                        Cost Category
                      </th>
                      {tcoResults.map((vendor) => (
                        <th
                          key={vendor.vendorId}
                          scope="col"
                          className="px-3 py-3.5 text-right text-sm font-semibold text-slate-100"
                        >
                          {vendor.vendorName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                    {(Object.keys(COST_CATEGORY_COLORS) as Array<keyof TCOResultBreakdown>).map((categoryKey) => (
                      <tr key={categoryKey} className="hover:bg-slate-700/30 transition-colors duration-150">
                        <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-6 sticky left-0 bg-slate-900/50 hover:bg-slate-700/30 z-10">
                          {categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}
                        </td>
                        {tcoResults.map((vendor) => (
                          <td
                            key={`${vendor.vendorId}-${categoryKey}`}
                            className="whitespace-nowrap px-3 py-3 text-sm text-right text-slate-300"
                          >
                            {vendor.breakdown[categoryKey]?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 0,
                            }) || "$0"}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="bg-slate-800/70 hover:bg-slate-700/50 transition-colors duration-150">
                      <td className="whitespace-nowrap py-3.5 pl-4 pr-3 text-sm font-bold text-white sm:pl-6 sticky left-0 bg-slate-800/70 z-10">
                        Total {comparisonYears}-Year TCO
                      </td>
                      {tcoResults.map((vendor) => (
                        <td
                          key={`${vendor.vendorId}-total`}
                          className="whitespace-nowrap px-3 py-3.5 text-sm text-right font-bold text-white"
                        >
                          {vendor.totalTCO.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                          })}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-6">
          <InteractiveTCOChart
            initialData={chartData}
            title="Interactive TCO Analysis"
            enableRealTime={true}
            drillDownLevels={drillDownLevels}
          />
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <RealTimeMetrics updateInterval={3000} showSparklines={true} />
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <DrillDownTreemap data={treemapData} title="TCO Cost Structure Analysis" colorScheme="cost" />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

export default TcoAnalysisView
