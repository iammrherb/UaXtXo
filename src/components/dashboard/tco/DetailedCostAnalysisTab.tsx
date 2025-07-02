"use client"

import type React from "react"
import { useMemo } from "react"
import { motion } from "framer-motion"
import type { TCOResult, TCOResultBreakdown } from "@/hooks/useTcoCalculator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { cn } from "@/lib/utils"
import { DollarSign, TrendingDown, TrendingUp, BarChart3, Download } from "lucide-react"

const COST_CATEGORY_COLORS: { [key in keyof TCOResultBreakdown]: string } = {
  software: "#3B82F6",
  hardware: "#EF4444",
  implementation: "#F59E0B",
  operational: "#10B981",
  hidden: "#64748B",
}

interface MetricCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ElementType
  trend?: "up" | "down" | "neutral"
  trendText?: string
  unit?: string
  variant?: "default" | "primary" | "highlight"
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
    >
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
        <div className={cn("flex items-center text-xs", trend === "up" ? "text-emerald-400" : "text-red-400")}>
          <TrendIcon className="h-4 w-4 mr-1" />
          {trendText}
        </div>
      )}
    </motion.div>
  )
}

interface DetailedCostAnalysisTabProps {
  tcoResults: TCOResult[]
  comparisonYears: number
}

const DetailedCostAnalysisTab: React.FC<DetailedCostAnalysisTabProps> = ({ tcoResults, comparisonYears }) => {
  const chartData = useMemo(() => {
    return tcoResults.map((result) => ({
      name: result.vendorName,
      ...result.breakdown,
      total: result.totalTCO,
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

  return (
    <div className="space-y-8">
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
    </div>
  )
}

export default DetailedCostAnalysisTab
