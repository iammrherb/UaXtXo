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
import { staggerChildren, fadeInUp, SectionTitle, VIBRANT_COLORS, MetricCard } from "./shared-ui"
import { Users, Zap, Clock } from "lucide-react"

export default function BusinessImpactView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  const portnoxResult = results.find((r) => r.vendor === "portnox")
  if (!portnoxResult) return null

  const fteData = results
    .map((r, i) => ({
      name: r.vendorDetails.shortName,
      fte: r.hiddenCosts.fteRequirement,
      fill: VIBRANT_COLORS[i % VIBRANT_COLORS.length],
    }))
    .sort((a, b) => a.fte - b.fte)

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      <SectionTitle
        title="Operational & Business Impact"
        subtitle="Analyzing efficiency gains and productivity improvements."
      />

      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="FTE Savings"
            value={`${portnoxResult.operationalImpact.fteSavings.toFixed(1)}`}
            detail="Full-Time Equivalents saved vs. average"
            icon={<Users />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Productivity Gain"
            value={`$${(portnoxResult.operationalImpact.productivityGains / 1000).toFixed(0)}K`}
            detail="Annual value from reduced downtime"
            icon={<Zap />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Alert Reduction"
            value={`${portnoxResult.operationalImpact.alertReduction.toFixed(0)}%`}
            detail="Decrease in security alert fatigue"
            icon={<Clock />}
          />
        </motion.div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>FTE Requirements for Ongoing Management</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <BarChart data={fteData} layout="vertical">
                <CartesianGrid horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="fte" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
