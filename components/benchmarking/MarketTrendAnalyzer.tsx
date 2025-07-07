"use client"

interface MarketTrend {
  id: string
  metric: string
  category: "cost" | "security" | "operational" | "adoption"
  timeframe: "quarterly" | "yearly" | "multi_year"
  direction: "increasing" | "decreasing" | "stable" | "volatile"
  magnitude: number // percentage change
  confidence: "high" | "medium" | "low"
  impact: "high" | "medium" | "low"
  description: string
  drivers: string[]
  implications: string[]
  forecast: {
    shortTerm: string
    longTerm: string
  }
  data: {
    period: string
    value: number
    benchmark: number
    forecast?: number
  }[]
}

interface IndustryForecast {
  industry: string
  year: number
  metrics: {
    avgTCOPerDevice: number
    avgROI: number
    cloudAdoption: number
    securityScore: number
    automationLevel: number
    breachCost: number
  }
  confidence: number
  keyDrivers: string[]
}

interface TechnologyAdoption {
  technology: string
  currentAdoption: number
  projectedAdoption: number
  growthRate: number
  maturityStage: "emerging" | "growing" | "mature" | "declining"
  industryVariation: Record<string, number>
  benefits: string[]
  challenges: string[]
}

const MARKET_TRENDS: MarketTrend[] = [
  {
    id: "cloud_migration",
    metric: "Cloud NAC Adoption",
    category: "adoption",
    timeframe: "yearly",
    direction: "increasing",
    magnitude: 45.2,
    confidence: "high",
    impact: "high",
    description: "Rapid shift from on-premise to cloud-native NAC solutions",
    drivers: [
      "Remote work acceleration",
      "Cost optimization pressures",
      "Scalability requirements",
      "Faster deployment needs",
    ],
    implications: [
      "Reduced implementation times",
      "Lower total cost of ownership",
      "Improved scalability",
      "Enhanced security posture",
    ],
    forecast: {
      shortTerm: "Continued acceleration with 50%+ growth expected",
      longTerm: "Cloud-first becomes the default by 2026",
    },
    data: [
      { period: "2020", value: 15, benchmark: 15 },
      { period: "2021", value: 22, benchmark: 20 },
      { period: "2022", value: 35, benchmark: 28 },
      { period: "2023", value: 52, benchmark: 40 },
      { period: "2024", value: 68, benchmark: 55, forecast: 75 },
      { period: "2025", value: 0, benchmark: 0, forecast: 85 },
    ],
  },
  {
    id: "tco_reduction",
    metric: "TCO per Device",
    category: "cost",
    timeframe: "yearly",
    direction: "decreasing",
    magnitude: -18.5,
    confidence: "high",
    impact: "high",
    description: "Significant reduction in total cost of ownership across all industries",
    drivers: [
      "Cloud-native architectures",
      "Automation improvements",
      "Vendor competition",
      "Operational efficiency gains",
    ],
    implications: [
      "Better ROI for NAC investments",
      "Faster payback periods",
      "Increased budget availability",
      "Higher adoption rates",
    ],
    forecast: {
      shortTerm: "15-20% additional reduction expected",
      longTerm: "Stabilization around $45-55 per device",
    },
    data: [
      { period: "2020", value: 125, benchmark: 125 },
      { period: "2021", value: 118, benchmark: 120 },
      { period: "2022", value: 105, benchmark: 110 },
      { period: "2023", value: 88, benchmark: 95 },
      { period: "2024", value: 72, benchmark: 80, forecast: 68 },
      { period: "2025", value: 0, benchmark: 0, forecast: 58 },
    ],
  },
  {
    id: "security_scores",
    metric: "Average Security Score",
    category: "security",
    timeframe: "yearly",
    direction: "increasing",
    magnitude: 12.8,
    confidence: "medium",
    impact: "high",
    description: "Steady improvement in security posture across organizations",
    drivers: ["Zero trust adoption", "Advanced threat detection", "Compliance requirements", "Security awareness"],
    implications: ["Reduced breach risk", "Lower insurance premiums", "Improved compliance", "Enhanced reputation"],
    forecast: {
      shortTerm: "Continued gradual improvement",
      longTerm: "Plateau around 85-90 score range",
    },
    data: [
      { period: "2020", value: 68, benchmark: 68 },
      { period: "2021", value: 71, benchmark: 70 },
      { period: "2022", value: 75, benchmark: 73 },
      { period: "2023", value: 79, benchmark: 77 },
      { period: "2024", value: 82, benchmark: 80, forecast: 84 },
      { period: "2025", value: 0, benchmark: 0, forecast: 87 },
    ],
  },
  {
    id: "implementation_time",
    metric: "Implementation Time",
    category: "operational",
    timeframe: "yearly",
    direction: "decreasing",
    magnitude: -35.4,
    confidence: "high",
    impact: "medium",
    description: "Dramatic reduction in deployment and implementation timeframes",
    drivers: ["Cloud-native solutions", "Pre-built integrations", "Automation tools", "Improved methodologies"],
    implications: [
      "Faster time to value",
      "Reduced project risk",
      "Lower implementation costs",
      "Improved user satisfaction",
    ],
    forecast: {
      shortTerm: "Further 20-30% reduction possible",
      longTerm: "Stabilization around 2-4 months",
    },
    data: [
      { period: "2020", value: 18, benchmark: 18 },
      { period: "2021", value: 15, benchmark: 16 },
      { period: "2022", value: 12, benchmark: 14 },
      { period: "2023", value: 9, benchmark: 11 },
      { period: "2024", value: 7, benchmark: 8, forecast: 6 },
      { period: "2025", value: 0, benchmark: 0, forecast: 4 },
    ],
  },
  {
    id: "roi_improvement",
    metric: "Average ROI",
    category: "cost",
    timeframe: "yearly",
    direction: "increasing",
    magnitude: 28.7,
    confidence: "high",
    impact: "high",
    description: "Substantial improvement in return on investment across all sectors",
    drivers: [
      "Lower implementation costs",
      "Operational efficiency gains",
      "Reduced security incidents",
      "Automation benefits",
    ],
    implications: ["Stronger business case", "Increased investment", "Faster adoption", "Better stakeholder buy-in"],
    forecast: {
      shortTerm: "Continued strong growth",
      longTerm: "Stabilization around 55-65% ROI",
    },
    data: [
      { period: "2020", value: 28, benchmark: 28 },
      { period: "2021", value: 32, benchmark: 30 },
      { period: "2022", value: 38, benchmark: 35 },
      { period: "2023", value: 45, benchmark: 42 },
      { period: "2024", value: 52, benchmark: 48, forecast: 58 },
      { period: "2025", value: 0, benchmark: 0, forecast: 62 },
    ],
  },
]

const INDUSTRY_FORECASTS: IndustryForecast[] = [
  {
    industry: "healthcare",
    year: 2025,
    metrics: {
      avgTCOPerDevice: 68,
      avgROI: 58.5,
      cloudAdoption: 78,
      securityScore: 88,
      automationLevel: 72,
      breachCost: 9800000,
    },
    confidence: 0.85,
    keyDrivers: ["Regulatory compliance", "Patient data protection", "Operational efficiency"]
  },
  {
    industry: "financial_services",
    year: 2025,
    metrics: {
      avgTCOPerDevice: 75,
      avgROI: 52.3,
      cloudAdoption: 85,
      securityScore: 92,
      automationLevel: 78,
      breachCost: 5200000,
    },
    confidence: 0.88,
    keyDrivers: ["Regulatory pressure", "Digital transformation", "Risk management"]
  },
  {
    industry: "manufacturing",
    year: 2025,
    metrics: {
      avgTCOPerDevice: 58,
      avgROI: 62.8,
      cloudAdoption: 68,
      securityScore: 82,
      automationLevel: 85,\
