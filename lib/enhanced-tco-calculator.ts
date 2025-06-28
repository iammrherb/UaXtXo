import { Decimal } from "decimal.js"

export interface CalculationConfiguration {
  orgSize: "small" | "medium" | "large" | "enterprise"
  devices: number
  users: number
  industry:
    | "technology"
    | "healthcare"
    | "financial"
    | "government"
    | "education"
    | "retail"
    | "manufacturing"
    | "other"
  years: number
  region: "north-america" | "europe" | "asia-pacific" | "latin-america" | "middle-east"
  portnoxBasePrice: number
  portnoxAddons: {
    atp: boolean
    compliance: boolean
    iot: boolean
    analytics: boolean
  }
}

export interface CostBreakdownItem {
  name: string
  value: number
  percentage: number
  description: string
}

export interface ROIMetrics {
  percentage: number
  paybackMonths: number
  annualSavings: number
  laborSavingsFTE: number
  breachReduction: number
  complianceSavings: number
}

export interface RiskMetrics {
  complianceScore: number
  securityPosture: number
  operationalRisk: number
}

export interface CalculationResult {
  vendor: string
  vendorName: string
  total: number
  breakdown: CostBreakdownItem[]
  roi?: ROIMetrics
  riskMetrics?: RiskMetrics
}

// Safe decimal operations
const safeDecimal = (value: number | undefined | null): Decimal => {
  if (value === undefined || value === null || isNaN(value)) {
    return new Decimal(0)
  }
  return new Decimal(value)
}

const safeNumber = (decimal: Decimal): number => {
  try {
    return decimal.toNumber()
  } catch {
    return 0
  }
}

// Industry risk multipliers
const INDUSTRY_MULTIPLIERS = {
  technology: 1.2,
  healthcare: 1.5,
  financial: 1.8,
  government: 1.6,
  education: 1.1,
  retail: 1.3,
  manufacturing: 1.2,
  other: 1.0,
}

// Regional cost multipliers
const REGIONAL_MULTIPLIERS = {
  "north-america": 1.0,
  europe: 1.1,
  "asia-pacific": 0.8,
  "latin-america": 0.7,
  "middle-east": 0.9,
}

// Vendor cost models
const VENDOR_MODELS = {
  portnox: {
    name: "Portnox",
    software: { perDevice: 3.0, annual: true },
    hardware: { required: false, cost: 0 },
    implementation: { baseHours: 160, hourlyRate: 200 },
    support: { percentage: 0.18 },
    operations: { fteReduction: 1.5, annualFteCost: 120000 },
    addons: {
      atp: 1.5,
      compliance: 1.0,
      iot: 2.0,
      analytics: 0.8,
    },
  },
  cisco: {
    name: "Cisco ISE",
    software: { perDevice: 8.5, annual: true },
    hardware: { required: true, baseCost: 50000, perDevice: 2.0 },
    implementation: { baseHours: 800, hourlyRate: 250 },
    support: { percentage: 0.22 },
    operations: { fteReduction: 0.5, annualFteCost: 120000 },
  },
  aruba: {
    name: "Aruba ClearPass",
    software: { perDevice: 7.2, annual: true },
    hardware: { required: true, baseCost: 35000, perDevice: 1.5 },
    implementation: { baseHours: 600, hourlyRate: 220 },
    support: { percentage: 0.2 },
    operations: { fteReduction: 0.3, annualFteCost: 120000 },
  },
  meraki: {
    name: "Cisco Meraki",
    software: { perDevice: 6.8, annual: true },
    hardware: { required: true, baseCost: 25000, perDevice: 3.0 },
    implementation: { baseHours: 200, hourlyRate: 180 },
    support: { percentage: 0.15 },
    operations: { fteReduction: 0.8, annualFteCost: 120000 },
  },
  forescout: {
    name: "Forescout",
    software: { perDevice: 9.2, annual: true },
    hardware: { required: true, baseCost: 75000, perDevice: 2.5 },
    implementation: { baseHours: 1000, hourlyRate: 275 },
    support: { percentage: 0.25 },
    operations: { fteReduction: 0.4, annualFteCost: 120000 },
  },
}

function calculateVendorCost(
  vendorId: string,
  config: CalculationConfiguration
): CalculationResult {
  const vendor = VENDOR_MODELS[vendorId as keyof typeof VENDOR_MODELS]
  if (!vendor) {
    throw new Error(`Unknown vendor: ${vendorId}`)
  }

  const devices = safeDecimal(config.devices)
  const years = safeDecimal(config.years)
  const industryMultiplier = safeDecimal(INDUSTRY_MULTIPLIERS[config.industry] || 1.0)
  const regionalMultiplier = safeDecimal(REGIONAL_MULTIPLIERS[config.region] || 1.0)

  // Software costs
  let softwarePerDevice = safeDecimal(vendor.software.perDevice)
  
  // Add Portnox addons if applicable
  if (vendorId === "portnox" && vendor.addons) {
    if (config.portnoxAddons?.atp) softwarePerDevice = softwarePerDevice.plus(vendor.addons.atp)
    if (config.portnoxAddons?.compliance) softwarePerDevice = softwarePerDevice.plus(vendor.addons.compliance)
    if (config.portnoxAddons?.iot) softwarePerDevice = softwarePerDevice.plus(vendor.addons.iot)
    if (config.portnoxAddons?.analytics) softwarePerDevice = softwarePerDevice.plus(vendor.addons.analytics)
  }

  // Override Portnox base price if configured
  if (vendorId === "portnox" && config.portnoxBasePrice) {
    softwarePerDevice = safeDecimal(config.portnoxBasePrice)
    if (vendor.addons) {
      if (config.portnoxAddons?.atp) softwarePerDevice = softwarePerDevice.plus(vendor.addons.atp)
      if (config.portnoxAddons?.compliance) softwarePerDevice = softwarePerDevice.plus(vendor.addons.compliance)
      if (config.portnoxAddons?.iot) softwarePerDevice = softwarePerDevice.plus(vendor.addons.iot)
      if (config.portnoxAddons?.analytics) softwarePerDevice = softwarePerDevice.plus(vendor.addons.analytics)
    }
  }

  const annualSoftwareCost = devices
    .times(softwarePerDevice)
    .times(12)
    .times(regionalMultiplier)

  const totalSoftwareCost = annualSoftwareCost.times(years)

  // Hardware costs
  let totalHardwareCost = new Decimal(0)
  if (vendor.hardware.required) {
    const baseCost = safeDecimal(vendor.hardware.baseCost)
    const perDeviceCost = safeDecimal(vendor.hardware.perDevice)
    totalHardwareCost = baseCost
      .plus(devices.times(perDeviceCost))
      .times(regionalMultiplier)
  }

  // Implementation costs
  const baseHours = safeDecimal(vendor.implementation.baseHours)
  const hourlyRate = safeDecimal(vendor.implementation.hourlyRate)
  const complexityMultiplier = devices.greaterThan(5000) ? new Decimal(1.5) : new Decimal(1.0)
  
  const totalImplementationCost = baseHours
    .times(hourlyRate)
    .times(complexityMultiplier)
    .times(industryMultiplier)
    .times(regionalMultiplier)

  // Support costs (annual)
  const supportPercentage = safeDecimal(vendor.support.percentage)
  const annualSupportCost = totalSoftwareCost
    .plus(totalHardwareCost)
    .times(supportPercentage)
    .dividedBy(years)

  const totalSupportCost = annualSupportCost.times(years)

  // Operations costs (savings are negative costs)
  const fteReduction = safeDecimal(vendor.operations.fteReduction)
  const annualFteCost = safeDecimal(vendor.operations.annualFteCost)
  const annualOperationsSavings = fteReduction.times(annualFteCost)
  const totalOperationsSavings = annualOperationsSavings.times(years)

  // Hidden costs (varies by vendor complexity)
  const hiddenCostMultipliers = {
    portnox: 0.05,
    cisco: 0.25,
    aruba: 0.18,
    meraki: 0.12,
    forescout: 0.22,
  }
  
  const hiddenMultiplier = safeDecimal(hiddenCostMultipliers[vendorId as keyof typeof hiddenCostMultipliers] || 0.15)
  const visibleCosts = totalSoftwareCost
    .plus(totalHardwareCost)
    .plus(totalImplementationCost)
    .plus(totalSupportCost)
  
  const totalHiddenCosts = visibleCosts.times(hiddenMultiplier)

  // Total cost calculation
  const totalCost = totalSoftwareCost
    .plus(totalHardwareCost)
    .plus(totalImplementationCost)
    .plus(totalSupportCost)
    .plus(totalHiddenCosts)
    .minus(totalOperationsSavings)

  // Cost breakdown
  const breakdown: CostBreakdownItem[] = [
    {
      name: "Software",
      value: safeNumber(totalSoftwareCost),
      percentage: safeNumber(totalSoftwareCost.dividedBy(totalCost.abs()).times(100)),
      description: "Licensing and subscription costs",
    },
    {
      name: "Hardware",
      value: safeNumber(totalHardwareCost),
      percentage: safeNumber(totalHardwareCost.dividedBy(totalCost.abs()).times(100)),
      description: "Appliances and infrastructure",
    },
    {
      name: "Implementation",
      value: safeNumber(totalImplementationCost),
      percentage: safeNumber(totalImplementationCost.dividedBy(totalCost.abs()).times(100)),
      description: "Professional services and deployment",
    },
    {
      name: "Support",
      value: safeNumber(totalSupportCost),
      percentage: safeNumber(totalSupportCost.dividedBy(totalCost.abs()).times(100)),
      description: "Ongoing support and maintenance",
    },
    {
      name: "Operations",
      value: safeNumber(totalOperationsSavings.negated()),
      percentage: safeNumber(totalOperationsSavings.negated().dividedBy(totalCost.abs()).times(100)),
      description: "Operational efficiency gains",
    },
    {
      name: "Hidden",
      value: safeNumber(totalHiddenCosts),
      percentage: safeNumber(totalHiddenCosts.dividedBy(totalCost.abs()).times(100)),
      description: "Training, downtime, and integration costs",
    },
  ]

  // ROI calculations
  const roi: ROIMetrics = {
    percentage: 0,
    paybackMonths: 0,
    annualSavings: safeNumber(\
