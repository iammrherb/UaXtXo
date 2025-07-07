"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, DollarSign, Zap, ShieldCheck, CheckCircle, TrendingUp } from "lucide-react"
import { useDashboardSettings } from "@/context/DashboardContext"
import { calculatePortnoxTCO, getCompetitorComparisons } from "@/lib/calculators/enhanced-portnox-tco"
import { industryComplianceData } from "@/lib/compliance/industry-compliance-data"
import { cn } from "@/lib/utils"

// Enhanced Metric Card component
interface MetricCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ElementType
  trend?: "up" | "down" | "neutral"
  trendText?: string
  previousValue?: string | number
  benchmark?: string | number
  unit?: string
  variant?: "default" | "primary" | "highlight"
  isLoading?: boolean
}

const GlassMetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendText,
  previousValue,
  benchmark,
  unit,
  variant,
  isLoading,
}) => {
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : null

  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl p-6 transition-all duration-300 hover:bg-white/10",
        variant === "primary" && "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400/30",
        variant === "highlight" && "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400/30",
      )}
      whileHover={{ y: -5 }}
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
            {Icon && <Icon className="h-6 w-6 text-emerald-400" />}
          </div>
          <p className="text-3xl font-bold text-white mb-1">
            {value}
            {unit && <span className="text-xl ml-1 text-slate-400">{unit}</span>}
          </p>
          {description && <p className="text-xs text-slate-400 mb-3">{description}</p>}

          {/* Previous Period Comparison */}
          {previousValue && (
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-400">Previous Period:</span>
              <span className="font-medium text-white">{previousValue}</span>
            </div>
          )}

          {/* Growth Rate */}
          {trend && TrendIcon && trendText && (
            <div
              className={cn(
                "flex items-center text-xs mb-2",
                trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : "text-slate-400",
              )}
            >
              <TrendIcon className="h-4 w-4 mr-1" />
              <span>Growth Rate: {trendText}</span>
            </div>
          )}

          {/* Benchmark */}
          {benchmark && (
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Industry Benchmark:</span>
              <span className="font-medium text-slate-300">{benchmark}</span>
            </div>
          )}
        </>
      )}
    </motion.div>
  )
}

export default function ExecutiveSummary() {
  const { devices, users, selectedIndustry, selectedOrgSize, comparisonYears, portnoxAddons, portnoxBasePrice } =
    useDashboardSettings()

  const [isLoading, setIsLoading] = useState(false)

  // Calculate Portnox-specific TCO and metrics
  const portnoxTCO = useMemo(() => {
    return calculatePortnoxTCO(
      devices,
      users,
      selectedIndustry,
      selectedOrgSize,
      comparisonYears,
      portnoxAddons,
      portnoxBasePrice,
    )
  }, [devices, users, selectedIndustry, selectedOrgSize, comparisonYears, portnoxAddons, portnoxBasePrice])

  // Calculate competitor comparisons
  const competitorComparisons = useMemo(() => {
    const comparisons = getCompetitorComparisons(devices, comparisonYears)

    // Calculate savings vs Portnox
    comparisons.forEach((comp) => {
      comp.savingsVsPortnox = comp.tco3Year - portnoxTCO.totalTCO
    })

    return comparisons
  }, [devices, comparisonYears, portnoxTCO.totalTCO])

  // Get industry data for context
  const industryData = industryComplianceData[selectedIndustry]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  }

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate" className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 mb-4">
          Portnox CLEAR Executive Intelligence
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Strategic analysis of Portnox CLEAR's Total Cost of Ownership, security benefits, and business value for{" "}
          {devices.toLocaleString()} devices across {comparisonYears} years in the{" "}
          {industryData?.industry || "Technology"} sector.
        </p>
      </div>

      {/* Key Portnox Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassMetricCard
          title="Portnox Total TCO"
          value={`$${(portnoxTCO.totalTCO / 1000).toFixed(0)}K`}
          description={`${comparisonYears}-year total investment`}
          icon={DollarSign}
          trend="down"
          trendText={`${portnoxTCO.previousPeriod.tcoGrowth}%`}
          previousValue={`$${((portnoxTCO.totalTCO * 1.152) / 1000).toFixed(0)}K`}
          benchmark={`$${(portnoxTCO.previousPeriod.industryBenchmark / 1000).toFixed(0)}K`}
          variant="highlight"
          isLoading={isLoading}
        />

        <GlassMetricCard
          title="Net Business Value"
          value={`$${(portnoxTCO.netValue / 1000).toFixed(0)}K`}
          description="Total benefits minus costs"
          icon={TrendingUp}
          trend="up"
          trendText={`${portnoxTCO.previousPeriod.benefitsGrowth}%`}
          previousValue={`$${((portnoxTCO.netValue * 0.762) / 1000).toFixed(0)}K`}
          benchmark={`$${(portnoxTCO.previousPeriod.industryBenchmark / 1000).toFixed(0)}K`}
          variant="highlight"
          isLoading={isLoading}
        />

        <GlassMetricCard
          title="Compliance Coverage"
          value={`${industryData?.coverage || 90}%`}
          description="Against industry regulations"
          icon={ShieldCheck}
          trend="up"
          trendText="+5%"
          previousValue="85%"
          benchmark="92%"
          isLoading={isLoading}
        />

        <GlassMetricCard
          title="Automated Remediation"
          value="98%"
          description="Of policy violations & threats"
          icon={Zap}
          trend="up"
          trendText="+3%"
          previousValue="95%"
          benchmark="99%"
          variant="highlight"
          isLoading={isLoading}
        />

        <GlassMetricCard
          title="Risk Reduction"
          value="45%"
          description="Decrease in security breach probability"
          icon={CheckCircle}
          trend="up"
          trendText="+12%"
          previousValue="33%"
          benchmark="50%"
          isLoading={isLoading}
        />

        <GlassMetricCard
          title="Agentless Deployment"
          value="99%"
          description="Of devices supported"
          icon={Zap}
          trend="neutral"
          trendText="Steady"
          previousValue="99%"
          benchmark="100%"
          isLoading={isLoading}
        />
      </div>

      {/* Competitor Comparison */}
      <div className="mt-12 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-4 text-center">Competitor TCO Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competitorComparisons.map((comp) => (
            <div key={comp.vendor} className="p-4 bg-white/5 rounded-lg text-center">
              <h4 className="text-lg font-semibold text-white mb-2">{comp.vendor}</h4>
              <p className="text-sm text-slate-300">3-Year TCO</p>
              <p className="text-xl font-bold text-white">${(comp.tco3Year / 1000).toFixed(0)}K</p>
              <p className="text-xs text-green-400 mt-2">
                Savings vs. Portnox: ${(comp.savingsVsPortnox / 1000).toFixed(0)}K
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Compliance */}
      {industryData && (
        <div className="mt-12 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">Industry Compliance Highlights</h3>
          <p className="text-lg text-slate-300 text-center">
            Key compliance standards for the {industryData.industry} sector:
          </p>
          <ul className="list-disc list-inside text-slate-300">
            {industryData.standards.map((standard, index) => (
              <li key={index} className="mb-2">
                {standard}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )
}
