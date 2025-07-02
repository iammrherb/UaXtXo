"use client"
import { motion } from "framer-motion"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "@/components/ui/chart"
import { staggerChildren, fadeInUp, SectionTitle, VIBRANT_COLORS, MetricCard } from "./shared-ui"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"

export default function CybersecurityPostureView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  const portnoxResult = results.find((r) => r.vendor === "portnox")
  if (!portnoxResult) return null

  const featureCategories = Object.keys(results[0].featureMatrix)
  const radarData = featureCategories.map((category) => {
    const entry: { [key: string]: string | number } = { category }
    results.forEach((r) => {
      entry[r.vendorDetails.shortName] = r.featureMatrix[category as keyof typeof r.featureMatrix].score
    })
    return entry
  })

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      <SectionTitle
        title="Cybersecurity Posture Analysis"
        subtitle="Evaluating risk reduction and threat coverage capabilities."
      />

      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Breach Cost Avoidance"
            value={`$${(portnoxResult.risk.breachCostAvoidance / 1_000_000).toFixed(2)}M`}
            detail="Annualized savings from reduced risk"
            icon={<Shield />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Risk Reduction"
            value={`${portnoxResult.risk.riskReductionPercent.toFixed(0)}%`}
            detail="Compared to having no NAC solution"
            icon={<AlertTriangle />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Compliance Alignment"
            value={`${portnoxResult.risk.complianceScore.toFixed(0)}%`}
            detail="Score based on key frameworks"
            icon={<CheckCircle />}
          />
        </motion.div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Security Feature Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[400px] w-full">
              <RadarChart data={radarData}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                {results.map((r, i) => (
                  <Radar
                    key={r.vendor}
                    name={r.vendorDetails.shortName}
                    dataKey={r.vendorDetails.shortName}
                    stroke={VIBRANT_COLORS[i % VIBRANT_COLORS.length]}
                    fill={VIBRANT_COLORS[i % VIBRANT_COLORS.length]}
                    fillOpacity={0.2}
                  />
                ))}
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
