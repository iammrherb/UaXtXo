"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { MetricCard, GradientCard, fadeInUp, staggerChildren } from "./shared-ui"
import { DollarSign, RocketIcon, Shield, UsersIcon, TrendingUpIcon, BarChart3 } from "lucide-react"

const VIBRANT_COLORS = ["#00D4AA", "#FF6B35", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"]

export default function ExecutiveDashboardView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  const portnoxResult = useMemo(() => results.find((r) => r.vendor === "portnox"), [results])
  const competitors = useMemo(() => results.filter((r) => r.vendor !== "portnox"), [results])
  const lowestCompetitor = useMemo(() => competitors.sort((a, b) => a.total - b.total)[0], [competitors])

  const totalSavings = useMemo(() => {
    if (!portnoxResult || !lowestCompetitor) return 0
    return lowestCompetitor.total - portnoxResult.total
  }, [portnoxResult, lowestCompetitor])

  const savingsPercent = useMemo(() => {
    if (!portnoxResult || !lowestCompetitor || lowestCompetitor.total === 0) return 0
    return (totalSavings / lowestCompetitor.total) * 100
  }, [totalSavings, lowestCompetitor, portnoxResult])

  const roiTimelineData = useMemo(() => {
    if (!portnoxResult) return []
    const months = config.years * 12
    const data = []
    for (let month = 0; month <= months; month += Math.max(1, Math.floor(months / 12))) {
      let portnoxROI = 0
      if (portnoxResult.roi.paybackMonths > 0 && portnoxResult.total > 0) {
        if (month >= portnoxResult.roi.paybackMonths) {
          const annualNetBenefit = portnoxResult.roi.annualSavings - portnoxResult.total / config.years
          portnoxROI = ((annualNetBenefit * (month / 12)) / portnoxResult.total) * 100
        }
      }
      data.push({ month, portnox: Math.max(0, portnoxROI) })
    }
    return data
  }, [portnoxResult, config.years])

  if (!portnoxResult) {
    return <Card className="p-6">Portnox data not available for comparison.</Card>
  }

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      <motion.div variants={fadeInUp}>
        <GradientCard className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-1 sm:mb-2">Executive Summary</h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                {config.years}-Year Total Cost of Ownership Analysis
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-xs sm:text-sm text-muted-foreground">Portnox Advantage</p>
                <p className="text-xl sm:text-2xl font-bold text-primary">{savingsPercent.toFixed(0)}% Lower TCO</p>
              </div>
            </div>
          </div>
        </GradientCard>
      </motion.div>

      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Total Savings"
            value={`$${Math.round(Math.abs(totalSavings) / 1000).toLocaleString()}K`}
            detail={`vs. ${lowestCompetitor?.vendorName || "Next Best"}`}
            icon={<DollarSign />}
            trend="up"
            trendValue={`${savingsPercent.toFixed(0)}%`}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="ROI Achievement"
            value={`${portnoxResult.roi.paybackMonths} mo`}
            detail="Payback period"
            icon={<RocketIcon />}
            trend="down"
            trendValue="Faster"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Risk Reduction"
            value={`${portnoxResult.risk.breachReduction * 100}%`}
            detail="Breach probability decrease"
            icon={<Shield />}
            trend="up"
            trendValue="Significant"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Efficiency Gain"
            value={`${portnoxResult.ops.fteSaved} FTE`}
            detail="Staff hours saved"
            icon={<UsersIcon />}
            trend="up"
            trendValue="Notable"
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
                  data={results.map((r) => ({ name: r.vendorName, TCO: r.total }))}
                  layout="vertical"
                  margin={{ right: 30, left: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="name" width={100} interval={0} />
                  <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Total TCO"]} />
                  <Bar dataKey="TCO" radius={[0, 6, 6, 0]} barSize={20}>
                    {results.map((entry, index) => (
                      <Bar
                        key={`cell-${index}`}
                        fill={
                          entry.vendor === "portnox"
                            ? VIBRANT_COLORS[0]
                            : VIBRANT_COLORS[(index + 1) % VIBRANT_COLORS.length]
                        }
                      />
                    ))}
                  </Bar>
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
              <CardDescription>Cumulative value over {config.years * 12} months</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={roiTimelineData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="roiGradientFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={VIBRANT_COLORS[0]} stopOpacity={0.6} />
                      <stop offset="95%" stopColor={VIBRANT_COLORS[0]} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickFormatter={(value) => `M${value}`} />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value: number) => [`${value.toFixed(0)}%`, "Portnox ROI"]} />
                  <Area
                    type="monotone"
                    dataKey="portnox"
                    stroke={VIBRANT_COLORS[0]}
                    strokeWidth={2.5}
                    fill="url(#roiGradientFill)"
                    name="Portnox ROI"
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
