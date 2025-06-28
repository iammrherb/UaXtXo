import Decimal from "decimal.js"

const orgSizeDetails: Record<string, { devices: number; users: number; itStaff?: number }> = {
  startup: { devices: 100, users: 50, itStaff: 2 },
  smb: { devices: 500, users: 250, itStaff: 5 },
  medium: { devices: 2500, users: 1500, itStaff: 15 },
  enterprise: { devices: 10000, users: 7500, itStaff: 50 },
  xlarge: { devices: 50000, users: 35000, itStaff: 200 },
  custom: { devices: 2500, users: 1500, itStaff: 15 }, // Default for custom
}

const staffCostsByRegion: Record<string, { itAdmin: number; securityAnalyst: number; networkEngineer: number }> = {
  "north-america": { itAdmin: 125000, securityAnalyst: 145000, networkEngineer: 135000 },
  europe: { itAdmin: 95000, securityAnalyst: 115000, networkEngineer: 105000 },
  "asia-pacific": { itAdmin: 65000, securityAnalyst: 85000, networkEngineer: 75000 },
  "latin-america": { itAdmin: 55000, securityAnalyst: 70000, networkEngineer: 60000 },
  "middle-east": { itAdmin: 80000, securityAnalyst: 100000, networkEngineer: 90000 },
}

const industryFactors: Record<string, { breachCostMultiplier?: number; complianceComplexity?: number }> = {
  healthcare: { breachCostMultiplier: 1.5, complianceComplexity: 1.3 },
  finance: { breachCostMultiplier: 1.3, complianceComplexity: 1.4 },
  government: { breachCostMultiplier: 1.1, complianceComplexity: 1.2 },
  technology: { breachCostMultiplier: 1.0, complianceComplexity: 1.0 },
  // Add other industries as needed
}

// Updated Portnox Addons type
interface PortnoxAddons {
  atp: boolean
  compliance: boolean
  iot: boolean
  analytics: boolean
}

const VENDOR_DATA = {
  portnox: {
    name: "Portnox",
    basePrice: 3.0, // per device per month
    billingModel: "monthly",
    hardwareRequired: false,
    implementationComplexity: "low",
    deploymentTime: "2-4 weeks",
    professionalServicesCost: 15000,
    supportCostPercentage: 0.18,
    automationLevel: 0.9,
    complianceScore: 95,
    riskReduction: 0.85,
  },
  cisco: {
    name: "Cisco ISE",
    basePrice: 12.0,
    billingModel: "annual",
    hardwareRequired: true,
    implementationComplexity: "high",
    deploymentTime: "6-12 months",
    professionalServicesCost: 150000,
    supportCostPercentage: 0.22,
    automationLevel: 0.6,
    complianceScore: 85,
    riskReduction: 0.7,
  },
  aruba: {
    name: "Aruba ClearPass",
    basePrice: 8.5,
    billingModel: "annual",
    hardwareRequired: true,
    implementationComplexity: "medium",
    deploymentTime: "3-6 months",
    professionalServicesCost: 75000,
    supportCostPercentage: 0.2,
    automationLevel: 0.7,
    complianceScore: 80,
    riskReduction: 0.65,
  },
}

export interface CalculationConfiguration {
  orgSize: string
  devices: number
  users: number
  industry: string
  years: number
  region: string
  portnoxBasePrice: number
  portnoxAddons: {
    atp: boolean
    compliance: boolean
    iot: boolean
    analytics: boolean
  }
}

export interface CostBreakdown {
  name: string
  value: number
  percentage: number
  description: string
}

export interface ROIMetrics {
  paybackMonths: number
  percentage: number
  annualSavings: number
  breachReduction: number
  laborSavingsFTE: number
  complianceSavings: number
}

export interface CalculationResult {
  vendor: string
  vendorName: string
  total: number
  breakdown: CostBreakdown[]
  roi: ROIMetrics
  riskMetrics: {
    complianceScore: number
    securityPosture: number
    operationalRisk: number
  }
  implementation: {
    timeToValue: string
    complexity: string
    resourceRequirement: string
  }
}

function calculateSoftwareCosts(
  vendor: string,
  devices: number,
  years: number,
  portnoxAddons?: { atp: boolean; compliance: boolean; iot: boolean; analytics: boolean },
): Decimal {
  const vendorData = VENDOR_DATA[vendor as keyof typeof VENDOR_DATA]
  if (!vendorData) return new Decimal(0)

  let basePrice = new Decimal(vendorData.basePrice)

  // Apply volume discounts
  if (devices > 10000) {
    basePrice = basePrice.mul(0.7) // 30% discount
  } else if (devices > 5000) {
    basePrice = basePrice.mul(0.8) // 20% discount
  } else if (devices > 1000) {
    basePrice = basePrice.mul(0.9) // 10% discount
  }

  let monthlyCost = basePrice.mul(devices)

  // Add Portnox addons
  if (vendor === "portnox" && portnoxAddons) {
    if (portnoxAddons.atp) monthlyCost = monthlyCost.add(new Decimal(2.5).mul(devices))
    if (portnoxAddons.compliance) monthlyCost = monthlyCost.add(new Decimal(1.5).mul(devices))
    if (portnoxAddons.iot) monthlyCost = monthlyCost.add(new Decimal(1.0).mul(devices))
    if (portnoxAddons.analytics) monthlyCost = monthlyCost.add(new Decimal(2.0).mul(devices))
  }

  // Convert to annual cost
  const annualCost = vendorData.billingModel === "monthly" ? monthlyCost.mul(12) : monthlyCost

  return annualCost.mul(years)
}

function calculateHardwareCosts(vendor: string, devices: number, years: number): Decimal {
  const vendorData = VENDOR_DATA[vendor as keyof typeof VENDOR_DATA]
  if (!vendorData || !vendorData.hardwareRequired) return new Decimal(0)

  // Estimate hardware costs based on vendor
  let costPerDevice = new Decimal(0)
  switch (vendor) {
    case "cisco":
      costPerDevice = new Decimal(devices > 5000 ? 800 : 1200)
      break
    case "aruba":
      costPerDevice = new Decimal(devices > 5000 ? 600 : 900)
      break
    default:
      costPerDevice = new Decimal(500)
  }

  // Calculate number of appliances needed (rough estimate)
  const applianceCount = Math.max(1, Math.ceil(devices / 2000))
  const totalHardwareCost = costPerDevice.mul(applianceCount)

  // Add refresh costs for multi-year deployments
  const refreshCost = years > 3 ? totalHardwareCost.mul(0.5) : new Decimal(0)

  return totalHardwareCost.add(refreshCost)
}

function calculateImplementationCosts(vendor: string, devices: number, orgSize: string): Decimal {
  const vendorData = VENDOR_DATA[vendor as keyof typeof VENDOR_DATA]
  if (!vendorData) return new Decimal(0)

  let baseCost = new Decimal(vendorData.professionalServicesCost)

  // Scale based on organization size and device count
  const orgMultiplier =
    {
      small: 0.8,
      medium: 1.0,
      large: 1.3,
      enterprise: 1.6,
    }[orgSize] || 1.0

  const deviceScaleFactor = Math.log10(devices / 1000) * 0.3 + 1

  baseCost = baseCost.mul(orgMultiplier).mul(deviceScaleFactor)

  // Add internal resource costs (40% of professional services)
  const internalCosts = baseCost.mul(0.4)

  return baseCost.add(internalCosts)
}

function calculateSupportCosts(vendor: string, softwareCost: Decimal): Decimal {
  const vendorData = VENDOR_DATA[vendor as keyof typeof VENDOR_DATA]
  if (!vendorData) return new Decimal(0)

  return softwareCost.mul(vendorData.supportCostPercentage)
}

function calculateOperationsCosts(vendor: string, devices: number, years: number): Decimal {
  const vendorData = VENDOR_DATA[vendor as keyof typeof VENDOR_DATA]
  if (!vendorData) return new Decimal(0)

  // Estimate FTE requirements based on complexity
  let fteRequired = 0
  switch (vendorData.implementationComplexity) {
    case "low":
      fteRequired = Math.max(0.25, devices / 10000)
      break
    case "medium":
      fteRequired = Math.max(0.5, devices / 5000)
      break
    case "high":
      fteRequired = Math.max(1.0, devices / 2500)
      break
  }

  const annualFTECost = new Decimal(120000) // Average IT salary + benefits
  const annualOperationsCost = annualFTECost.mul(fteRequired)

  return annualOperationsCost.mul(years)
}

function calculateROI(
  vendor: string,
  totalCost: Decimal,
  devices: number,
  years: number,
  industry: string,
): ROIMetrics {
  const vendorData = VENDOR_DATA[vendor as keyof typeof VENDOR_DATA]
  if (!vendorData) {
    return {
      paybackMonths: 0,
      percentage: 0,
      annualSavings: 0,
      breachReduction: 0,
      laborSavingsFTE: 0,
      complianceSavings: 0,
    }
  }

  // Calculate labor savings based on automation
  const laborSavingsFTE = vendorData.automationLevel * Math.min(3, devices / 2000)
  const annualLaborSavings = new Decimal(120000).mul(laborSavingsFTE)

  // Calculate breach risk reduction savings
  const industryBreachCosts = {
    healthcare: 10930000,
    financial: 5720000,
    technology: 4880000,
    government: 4740000,
    education: 3790000,
    manufacturing: 4470000,
    retail: 3280000,
  }

  const breachCost = industryBreachCosts[industry as keyof typeof industryBreachCosts] || 4500000
  const breachProbability = 0.2 // 20% annual probability
  const breachSavings = new Decimal(breachCost).mul(breachProbability).mul(vendorData.riskReduction)

  // Calculate compliance savings
  const complianceSavings = new Decimal(vendorData.complianceScore).mul(2000) // $2K per compliance point

  const totalAnnualSavings = annualLaborSavings.add(breachSavings.div(years)).add(complianceSavings)
  const totalSavings = totalAnnualSavings.mul(years)

  // Calculate payback period
  const paybackMonths = totalAnnualSavings.gt(0) ? totalCost.div(totalAnnualSavings.div(12)) : new Decimal(999)

  // Calculate ROI percentage
  const roiPercentage = totalCost.gt(0) ? totalSavings.sub(totalCost).div(totalCost).mul(100) : new Decimal(0)

  return {
    paybackMonths: Math.max(1, Math.round(paybackMonths.toNumber())),
    percentage: Math.round(roiPercentage.toNumber()),
    annualSavings: Math.round(totalAnnualSavings.toNumber()),
    breachReduction: Math.round(vendorData.riskReduction * 100),
    laborSavingsFTE: Math.round(laborSavingsFTE * 10) / 10,
    complianceSavings: Math.round(complianceSavings.toNumber()),
  }
}

export function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult | null {
  const vendorData = VENDOR_DATA[vendorId as keyof typeof VENDOR_DATA]
  if (!vendorData) return null

  try {
    // Calculate cost components
    const softwareCost = calculateSoftwareCosts(vendorId, config.devices, config.years, config.portnoxAddons)
    const hardwareCost = calculateHardwareCosts(vendorId, config.devices, config.years)
    const implementationCost = calculateImplementationCosts(vendorId, config.devices, config.orgSize)
    const supportCost = calculateSupportCosts(vendorId, softwareCost)
    const operationsCost = calculateOperationsCosts(vendorId, config.devices, config.years)

    const totalCost = softwareCost.add(hardwareCost).add(implementationCost).add(supportCost).add(operationsCost)

    // Create breakdown
    const breakdown: CostBreakdown[] = [
      {
        name: "Software",
        value: Math.round(softwareCost.toNumber()),
        percentage: totalCost.gt(0) ? Math.round(softwareCost.div(totalCost).mul(100).toNumber()) : 0,
        description: "Licensing and subscription costs",
      },
      {
        name: "Hardware",
        value: Math.round(hardwareCost.toNumber()),
        percentage: totalCost.gt(0) ? Math.round(hardwareCost.div(totalCost).mul(100).toNumber()) : 0,
        description: "Appliances and infrastructure",
      },
      {
        name: "Implementation",
        value: Math.round(implementationCost.toNumber()),
        percentage: totalCost.gt(0) ? Math.round(implementationCost.div(totalCost).mul(100).toNumber()) : 0,
        description: "Professional services and deployment",
      },
      {
        name: "Support",
        value: Math.round(supportCost.toNumber()),
        percentage: totalCost.gt(0) ? Math.round(supportCost.div(totalCost).mul(100).toNumber()) : 0,
        description: "Maintenance and technical support",
      },
      {
        name: "Operations",
        value: Math.round(operationsCost.toNumber()),
        percentage: totalCost.gt(0) ? Math.round(operationsCost.div(totalCost).mul(100).toNumber()) : 0,
        description: "Ongoing management and administration",
      },
    ]

    // Calculate ROI
    const roi = calculateROI(vendorId, totalCost, config.devices, config.years, config.industry)

    return {
      vendor: vendorId,
      vendorName: vendorData.name,
      total: Math.round(totalCost.toNumber()),
      breakdown,
      roi,
      riskMetrics: {
        complianceScore: vendorData.complianceScore,
        securityPosture: Math.round(vendorData.riskReduction * 100),
        operationalRisk:
          vendorData.implementationComplexity === "low"
            ? 20
            : vendorData.implementationComplexity === "medium"
              ? 50
              : 80,
      },
      implementation: {
        timeToValue: vendorData.deploymentTime,
        complexity: vendorData.implementationComplexity,
        resourceRequirement: vendorData.professionalServicesCost > 50000 ? "High" : "Low",
      },
    }
  } catch (error) {
    console.error("Error calculating TCO for vendor:", vendorId, error)
    return null
  }
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): CalculationResult[] {
  const results: CalculationResult[] = []

  for (const vendorId of vendorIds) {
    const result = calculateVendorTCO(vendorId, config)
    if (result) {
      results.push(result)
    }
  }

  return results.sort((a, b) => a.total - b.total)
}
