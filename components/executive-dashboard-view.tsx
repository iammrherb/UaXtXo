"use client"
import { motion } from "framer-motion"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "@/components/ui/chart"
import { DollarSign, Shield, Crown, RocketIcon, UsersIcon } from "lucide-react"
import { GradientCard, MetricCard, staggerChildren, fadeInUp, VIBRANT_COLORS } from "./shared-ui"

export default function ExecutiveDashboardView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  const portnoxResult = results.find((r) => r.vendor === "portnox")
  if (!portnoxResult) return null

  const chartData = results
    .map((r, i) => ({
      name: r.vendorDetails.shortName,
      tco: r.financialSummary.totalTco,
      fill: VIBRANT_COLORS[i % VIBRANT_COLORS.length],
    }))
    .sort((a, b) => a.tco - b.tco)

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      <motion.div variants={fadeInUp}>
        <GradientCard className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <motion.h2
                className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Executive Summary
              </motion.h2>
              <motion.p
                className="text-sm sm:text-base text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {config.years}-Year Financial & Risk Analysis
              </motion.p>
            </div>
            <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
              <Crown className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-400" />
              <div className="text-right">
                <p className="text-xs sm:text-sm text-muted-foreground">Portnox Advantage</p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  {portnoxResult.financialSummary.savingsPercent.toFixed(0)}% Lower TCO
                </p>
              </div>
            </motion.div>
          </div>
        </GradientCard>
      </motion.div>

      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Total Savings"
            value={`$${(portnoxResult.financialSummary.savingsVsCompetitor / 1000).toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}K`}
            detail={`vs. Next Best Alternative`}
            icon={<DollarSign />}
            trend="up"
            trendValue={`${portnoxResult.financialSummary.savingsPercent.toFixed(0)}%`}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Payback Period"
            value={`${portnoxResult.roi.paybackMonths} mo`}
            detail="Time to recoup investment"
            icon={<RocketIcon />}
            trend="down"
            trendValue="Faster ROI"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Breach Cost Avoided"
            value={`$${(portnoxResult.risk.breachCostAvoidance / 1000000).toFixed(2)}M`}
            detail="Annualized risk reduction"
            icon={<Shield />}
            trend="up"
            trendValue="Lower Risk"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="FTE Requirement"
            value={`${portnoxResult.hiddenCosts.fteRequirement}`}
            detail="For ongoing management"
            icon={<UsersIcon />}
            trend="down"
            trendValue="Higher Efficiency"
          />
        </motion.div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Total Cost of Ownership (TCO) Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
              <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--foreground-muted)" }}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="tco" radius={5}></Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
