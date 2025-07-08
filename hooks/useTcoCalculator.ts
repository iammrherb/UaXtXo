"use client"

import { useState, useMemo } from "react"

export interface TcoInputs {
  deviceCount: number
  timeframe: number // years
  industryId: string
  organizationSize: "small" | "medium" | "large" | "enterprise"
  currentSolution?: string
  deploymentComplexity: "simple" | "moderate" | "complex"
}

export interface TcoCostBreakdown {
  software: number
  hardware: number
  implementation: number
  training: number
  maintenance: number
  support: number
  operational: number
  total: number
}

export interface TcoComparison {
  portnox: TcoCostBreakdown
  competitor: TcoCostBreakdown
  savings: number
  savingsPercentage: number
  roi: number
  paybackMonths: number
}

export interface RiskMetrics {
  breachProbability: number
  avgBreachCost: number
  riskReduction: number
  insuranceSavings: number
  complianceSavings: number
}

const ORGANIZATION_MULTIPLIERS = {
  small: 0.7,
  medium: 1.0,
  large: 1.3,
  enterprise: 1.8,
}

const INDUSTRY_RISK_MULTIPLIERS = {
  healthcare: 2.5,
  financial: 2.8,
  education: 1.8,
  manufacturing: 2.2,
  retail: 2.0,
  government: 3.0,
  technology: 1.5,
  other: 1.0,
}

const COMPETITOR_PRICING = {
  "cisco-ise": { base: 125, hardware: 25000, implementation: 150000 },
  "aruba-clearpass": { base: 95, hardware: 15000, implementation: 75000 },
  forescout: { base: 42, hardware: 20000, implementation: 100000 },
  "extreme-nac": { base: 38, hardware: 12000, implementation: 60000 },
  "juniper-mist": { base: 65, hardware: 0, implementation: 40000 },
}

export function useTcoCalculator() {
  const [inputs, setInputs] = useState<TcoInputs>({
    deviceCount: 1000,
    timeframe: 3,
    industryId: "technology",
    organizationSize: "medium",
    deploymentComplexity: "moderate",
  })

  const [loading, setLoading] = useState(false)

  const calculatePortnoxTco = useMemo((): TcoCostBreakdown => {
    const { deviceCount, timeframe, organizationSize } = inputs
    const orgMultiplier = ORGANIZATION_MULTIPLIERS[organizationSize]

    const annualSoftwareCost = deviceCount * 48 * orgMultiplier // $48 per device per year
    const software = annualSoftwareCost * timeframe

    return {
      software,
      hardware: 0, // Cloud-native, no hardware required
      implementation: 5000 * orgMultiplier, // Minimal implementation cost
      training: 2000 * orgMultiplier, // 2 hours of training
      maintenance: 0, // Included in SaaS
      support: software * 0.1, // 10% of software cost
      operational: deviceCount * 0.5 * timeframe * orgMultiplier, // Minimal operational overhead
      total: 0,
    }
  }, [inputs])

  const calculateCompetitorTco = useMemo(() => {
    return (competitorId: string): TcoCostBreakdown => {
      const { deviceCount, timeframe, organizationSize, deploymentComplexity } = inputs
      const orgMultiplier = ORGANIZATION_MULTIPLIERS[organizationSize]
      const competitor = COMPETITOR_PRICING[competitorId as keyof typeof COMPETITOR_PRICING]

      if (!competitor) {
        return {
          software: 0,
          hardware: 0,
          implementation: 0,
          training: 0,
          maintenance: 0,
          support: 0,
          operational: 0,
          total: 0,
        }
      }

      const complexityMultiplier =
        deploymentComplexity === "complex" ? 1.5 : deploymentComplexity === "moderate" ? 1.2 : 1.0

      const annualSoftwareCost = deviceCount * competitor.base * orgMultiplier
      const software = annualSoftwareCost * timeframe
      const hardware = competitor.hardware * orgMultiplier * complexityMultiplier
      const implementation = competitor.implementation * orgMultiplier * complexityMultiplier
      const training = 15000 * orgMultiplier // 5 days of training
      const maintenance = hardware * 0.2 * timeframe // 20% annually for hardware
      const support = software * 0.2 // 20% of software cost
      const operational = deviceCount * 5 * timeframe * orgMultiplier // Higher operational overhead

      return {
        software,
        hardware,
        implementation,
        training,
        maintenance,
        support,
        operational,
        total: software + hardware + implementation + training + maintenance + support + operational,
      }
    }
  }, [inputs])

  const calculateRiskMetrics = useMemo((): RiskMetrics => {
    const { deviceCount, industryId } = inputs
    const riskMultiplier = INDUSTRY_RISK_MULTIPLIERS[industryId as keyof typeof INDUSTRY_RISK_MULTIPLIERS] || 1.0

    const breachProbability = Math.min(riskMultiplier * 15, 85) // Max 85% probability
    const avgBreachCost = deviceCount * 150 * riskMultiplier // $150 per record
    const riskReduction = 0.92 // 92% risk reduction with Portnox
    const insuranceSavings = avgBreachCost * 0.15 * riskReduction // 15% insurance savings
    const complianceSavings = 125000 * riskMultiplier // Compliance cost savings

    return {
      breachProbability,
      avgBreachCost,
      riskReduction,
      insuranceSavings,
      complianceSavings,
    }
  }, [inputs])

  const compareWithCompetitor = (competitorId: string): TcoComparison => {
    const portnoxTco = { ...calculatePortnoxTco }
    portnoxTco.total = Object.values(portnoxTco).reduce((sum, cost) => sum + cost, 0) - portnoxTco.total

    const competitorTco = calculateCompetitorTco(competitorId)
    const savings = competitorTco.total - portnoxTco.total
    const savingsPercentage = (savings / competitorTco.total) * 100

    // ROI calculation including risk benefits
    const riskMetrics = calculateRiskMetrics
    const annualBenefits = savings / inputs.timeframe + riskMetrics.insuranceSavings + riskMetrics.complianceSavings
    const roi = ((annualBenefits * inputs.timeframe) / portnoxTco.total) * 100
    const paybackMonths = (portnoxTco.total / annualBenefits) * 12

    return {
      portnox: portnoxTco,
      competitor: competitorTco,
      savings,
      savingsPercentage,
      roi,
      paybackMonths,
    }
  }

  const updateInputs = (newInputs: Partial<TcoInputs>) => {
    setInputs((prev) => ({ ...prev, ...newInputs }))
  }

  const runAnalysis = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const getQuickAssessment = () => {
    const ciscoComparison = compareWithCompetitor("cisco-ise")
    const arubaComparison = compareWithCompetitor("aruba-clearpass")
    const avgSavings = (ciscoComparison.savings + arubaComparison.savings) / 2
    const avgSavingsPercentage = (ciscoComparison.savingsPercentage + arubaComparison.savingsPercentage) / 2

    return {
      totalSavings: avgSavings,
      percentageSavings: Math.round(avgSavingsPercentage),
      roi: Math.round((ciscoComparison.roi + arubaComparison.roi) / 2),
      paybackMonths: Math.round((ciscoComparison.paybackMonths + arubaComparison.paybackMonths) / 2),
      riskReduction: Math.round(calculateRiskMetrics.riskReduction * 100),
    }
  }

  return {
    inputs,
    loading,
    calculatePortnoxTco,
    calculateCompetitorTco,
    calculateRiskMetrics,
    compareWithCompetitor,
    updateInputs,
    runAnalysis,
    getQuickAssessment,
  }
}
