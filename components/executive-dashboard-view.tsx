"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GradientCard, MetricCard, fadeInUp, staggerChildren, PORTNOX_COLORS, VIBRANT_COLORS } from "./shared-ui"
import { DollarSign, RocketIcon, Shield, UsersIcon, TrendingUpIcon, BarChart3 } from "lucide-react"

interface ExecutiveDashboardViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function ExecutiveDashboardView({ results, config }: ExecutiveDashboardViewProps) {
  const portnoxResult = useMemo(() => results.find((r) => r.vendor === "portnox"), [results])
  const competitors = useMemo(() => results.filter((r) => r.vendor !== "portnox"), [results])
  const lowestCompetitor = useMemo(() => competitors.sort((a, b) => a.totalTco - b.totalTco)[0], [competitors])

  const totalSavings = useMemo(() => {
    if (!portnoxResult || !lowestCompetitor) return 0
    return lowestCompetitor.totalTco - portnoxResult.totalTco
  }, [portnoxResult, lowestCompetitor])

  const savingsPercent = useMemo(() => {
    if (!lowestCompetitor || lowestCompetitor.totalTco === 0) return 0
    return (totalSavings / lowestCompetitor.totalTco) * 100
  }, [totalSavings, lowestCompetitor])

  const roiTimelineData = useMemo(() => {
    if (!portnoxResult) return []
    const data = []
    for (let year = 0; year <= config.years; year++) {
      data.push({
        year: `Year ${year}`,
        portnox: (portnoxResult.roi.cumulativeRoi[year] || 0) * 100,
        average: (lowestCompetitor?.roi.cumulativeRoi[year] || 0) * 100,
      })
    }
    return data
  }, [portnoxResult, lowestCompetitor, config.years])

  if (!portnoxResult) {
    return <Card className="p-6">Portnox data not available for comparison.</Card>
  }

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      <motion.div variants={fadeInUp}>
        <GradientCard gradient="vibrant" className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Executive Summary</h2>
              <p className="text-sm sm:text-base text-white/80">{config.years}-Year Total Cost of Ownership Analysis</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-xs sm:text-sm text-white/80">Portnox Advantage</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{savingsPercent.toFixed(0)}% Lower TCO</p>
              </div>
            </div>
          </div>
        </GradientCard>
      </motion.div>

      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Total Savings"
            value={`$${(totalSavings / 1000).toLocaleString("en-US", { maximumFractionDigits: 0 })}K`}
            detail={`vs. ${lowestCompetitor?.vendorName || "Next Best"}`}
            icon={<DollarSign />}
            trend="up"
            trendValue={`${savingsPercent.toFixed(0)}%`}
            gradient="vibrant"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="ROI Achievement"
            value={`${portnoxResult.roi.paybackMonths.toFixed(1)} mo`}
            detail="Payback period"
            icon={<RocketIcon />}
            trend="down"
            trendValue="Faster"
            gradient="fire"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Risk Reduction"
            value={`${(portnoxResult.risk.reduction * 100).toFixed(0)}%`}
            detail="Breach probability decrease"
            icon={<Shield />}
            trend="up"
            trendValue="Significant"
            gradient="ocean"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Efficiency Gain"
            value={`${portnoxResult.operational.fteSaved.toFixed(1)} FTE`}
            detail="Staff hours saved"
            icon={<UsersIcon />}
            trend="up"
            trendValue="Notable"
            gradient="sunset"
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div className="lg:col-span-3" variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>TCO Comparison</span>
              </CardTitle>
              <CardDescription>{config.years}-year total cost across vendors</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={results.map((r) => ({
                    name: r.vendorName,
                    TCO: r.totalTco,
                    fill: r.vendor === "portnox" ? PORTNOX_COLORS.primary : VIBRANT_COLORS[1],
                  }))}
                  layout="vertical"
                  margin={{ right: 30, left: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    type="number"
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={100}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    interval={0}
                  />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Total TCO"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                    }}
                    cursor={{ fill: "hsl(var(--accent-foreground) / 0.1)" }}
                  />
                  <Bar dataKey="TCO" radius={[0, 6, 6, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div className="lg:col-span-2" variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <TrendingUpIcon className="h-5 w-5 text-primary" />
                <span>ROI Timeline</span>
              </CardTitle>
              <CardDescription>Cumulative value over {config.years} years</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={roiTimelineData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="roiGradientFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.6} />
                      <stop offset="95%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <YAxis
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value.toFixed(0)}%`, name]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="portnox"
                    stroke={PORTNOX_COLORS.primary}
                    strokeWidth={2.5}
                    fill="url(#roiGradientFill)"
                    name="Portnox ROI"
                  />
                  <Area
                    type="monotone"
                    dataKey="average"
                    stroke={VIBRANT_COLORS[2]}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fill="transparent"
                    name="Competitor Avg. ROI"
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
