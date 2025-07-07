"use client"

interface ComparisonScenario {
  id: string
  name: string
  description: string
  color: string
  parameters: Record<string, number>
  results: {
    totalCost: number
    roi: number
    paybackPeriod: number
    riskScore: number
    npv: number
    irr: number
  }
  isBaseline?: boolean
  createdAt: Date
}

interface ComparisonMetric {
  id: string
  name: string
  unit: string
  format: (value: number) => string
  category: "financial" | "operational" | "risk"
  higherIsBetter: boolean
}

const COMPARISON_METRICS: ComparisonMetric[] = [
  {
    id: "totalCost",
    name: "Total Cost",
    unit: "$",
    format: (value) => `$${(value / 1000).toFixed(0)}K`,
    category: "financial",
    higherIsBetter: false,
  },
  {
    id: "roi",
    name: "ROI",
    unit: "%",
    format: (value) => `${value.toFixed(1)}%`,
    category: "financial",
    higherIsBetter: true,
  },
  {
    id: "paybackPeriod",
    name: "Payback Period",
    unit: "months",
    format: (value) => `${value.toFixed(1)}m`,
    category: "financial",
    higherIsBetter: false,
  },
  {
    id: "riskScore",
    name: "Risk Score",
    unit: "points",
    format: (value) => `${value.toFixed(0)}`,
    category: "risk",
    higherIsBetter: false,
  },
  {
    id: "npv",
    name: "Net Present Value",
    unit: "$",
    format: (value) => `$${(value / 1000).toFixed(0)}K`,
    category: "financial",
    higherIsBetter: true,
  },
  {
    id: "irr",
    name: "Internal Rate of Return",
    unit: "%",
    format: (value) => `${value.toFixed(1)}%`,
    category: "financial",
    higherIsBetter: true,
  },
]

const SAMPLE_SCENARIOS: ComparisonScenario[] = [
  {
    id: "baseline",
    name: "Baseline Scenario",
    description: "Current assumptions and market conditions",
    color: "#10b981",
    parameters: {
      device_count: 2500,
      growth_rate: 15,
      staff_efficiency: 40,
      breach_probability: 5,
      implementation_time: 6
    },
    results: {
      totalCost: 1500000,
      roi: 45.2,
      paybackPeriod: 18.5,
      riskScore: 35,
      npv: 850000,
      irr: 28.5
    },
    isBaseline: true,
    createdAt: new Date()
  },
  {
    id: "optimistic",
    name: "Optimistic Growth",
    description: "High growth, maximum efficiency gains",
    color: "#3b82f6",
    parameters: {
      device_count: 3500,
      growth_rate: 25,
      staff_efficiency: 60,
      breach_probability
