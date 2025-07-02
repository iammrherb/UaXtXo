import { ComprehensiveVendorDatabase } from "./comprehensive-vendor-data"

export interface CalculationConfiguration {
  devices: number
  users: number
  years: number
  licenseTier: string // e.g., 'Premier', 'Enterprise'
  integrations: {
    mdm: boolean
    siem: boolean
    edr: boolean
  }
  professionalServices: "basic" | "advanced"
  includeTraining: boolean
}

export interface CostComponent {
  name: string
  cost: number
  description: string
}

export interface CalculationResult {
  vendorId: string
  vendorName: string
  totalTco: number
  annualTco: number
  costBreakdown: CostComponent[]
  roi: {
    paybackMonths: number
    annualizedRoi: number
    fteSavings: number
  }
  riskReduction: number // Percentage
  implementationTimeline: string // e.g., "1-2 weeks"
}

const FTE_SALARY = 150000 // Average fully-loaded salary for a security engineer

export function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult | null {
  const vendor = ComprehensiveVendorDatabase[vendorId]
  if (!vendor) return null

  let totalCost = 0
  const costBreakdown: CostComponent[] = []

  // 1. Licensing Costs
  const tier =
    vendor.licensing.base.find((t) => t.name.toLowerCase() === config.licenseTier.toLowerCase()) ||
    vendor.licensing.base[vendor.licensing.base.length - 1]
  const unitCount = tier.unit === "user" ? config.users : config.devices
  const annualLicenseCost = tier.listPrice * unitCount
  const totalLicenseCost = annualLicenseCost * config.years
  totalCost += totalLicenseCost
  costBreakdown.push({
    name: "Software Licensing",
    cost: totalLicenseCost,
    description: `${config.years} years of ${tier.name} tier`,
  })

  // 2. Hardware Costs
  let totalHardwareCost = 0
  if (vendor.hardware.physical.length > 0) {
    // Simple logic: pick an appliance that fits the device count
    const suitableAppliance =
      vendor.hardware.physical.find((h) => Number.parseInt(h.capacity.replace(/,/g, "")) >= config.devices) ||
      vendor.hardware.physical[vendor.hardware.physical.length - 1]
    const haMultiplier = vendor.id === "cisco" ? 2 : 1.5 // Cisco HA is often 2x
    totalHardwareCost = (suitableAppliance?.listPrice || 0) * haMultiplier
  }
  totalCost += totalHardwareCost
  costBreakdown.push({
    name: "Hardware & HA",
    cost: totalHardwareCost,
    description: "Initial hardware and high-availability setup",
  })

  // 3. Professional Services
  let psCost = 0
  if (config.professionalServices === "advanced" && vendor.professionalServices.vendor.length > 1) {
    psCost = Number(vendor.professionalServices.vendor[1].cost) || 0
  } else {
    psCost = Number(vendor.professionalServices.vendor[0]?.cost || 0)
  }
  if (config.includeTraining) {
    psCost += Number(vendor.professionalServices.training[0]?.cost || 0) * 2 // Assume 2 people trained
  }
  totalCost += psCost
  costBreakdown.push({
    name: "Implementation & Training",
    cost: psCost,
    description: `One-time ${config.professionalServices} services and training`,
  })

  // 4. Integration Costs
  let integrationCost = 0
  if (config.integrations.mdm) integrationCost += Number(vendor.integrations.mdm[0]?.cost || 0)
  if (config.integrations.siem) integrationCost += Number(vendor.integrations.siem[0]?.cost || 0)
  if (config.integrations.edr) integrationCost += Number(vendor.integrations.security[0]?.cost || 0)
  totalCost += integrationCost
  costBreakdown.push({
    name: "Integrations",
    cost: integrationCost,
    description: "Cost for key 3rd-party integrations",
  })

  // 5. Operational Costs (FTE)
  const totalFteCost = vendor.tcoFactors.fteRequirement * FTE_SALARY * config.years
  totalCost += totalFteCost
  costBreakdown.push({
    name: "Operational Staffing",
    cost: totalFteCost,
    description: `FTE requirement over ${config.years} years`,
  })

  // 6. Hidden Costs
  const totalHiddenCost =
    vendor.hiddenCosts.commonExpenses.reduce((acc, expense) => {
      const costStr = String(expense.cost).split("-")[0].replace(/,/g, "")
      const cost = Number(costStr) || 0
      return acc + cost
    }, 0) * config.years
  totalCost += totalHiddenCost
  costBreakdown.push({
    name: "Common Hidden Costs",
    cost: totalHiddenCost,
    description: `Recurring hidden expenses over ${config.years} years`,
  })

  // ROI & Other Metrics
  const baselineFte = 3.0 // Assume a "No NAC" baseline requires 3 FTEs
  const fteSavings = (baselineFte - vendor.tcoFactors.fteRequirement) * FTE_SALARY * config.years
  const totalBenefit = fteSavings // Simplified benefit model
  const netBenefit = totalBenefit - totalCost
  const paybackMonths = totalCost / (totalBenefit / config.years / 12)

  // Simplified implementation timeline extraction
  const timeline = vendor.professionalServices.vendor[0]?.name.includes("Quick") ? "1-3 Months" : "3-9 Months"
  if (vendor.id === "portnox") {
    // timeline = '1-2 Weeks'; // This level of detail is not in the new data structure, so I'll stick to a generic calculation
  }

  return {
    vendorId,
    vendorName: vendor.name,
    totalTco: Math.round(totalCost),
    annualTco: Math.round(totalCost / config.years),
    costBreakdown,
    roi: {
      paybackMonths: paybackMonths > 0 && paybackMonths < 120 ? Math.round(paybackMonths) : 0,
      annualizedRoi: totalCost > 0 ? (netBenefit / totalCost / config.years) * 100 : 0,
      fteSavings: baselineFte - vendor.tcoFactors.fteRequirement,
    },
    riskReduction: vendor.featureSupport.advanced["Zero Trust"] === "✓✓✓" ? 0.35 : 0.15,
    implementationTimeline: timeline,
  }
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): CalculationResult[] {
  return vendorIds
    .map((id) => calculateVendorTCO(id, config))
    .filter((r): r is CalculationResult => r !== null)
    .sort((a, b) => a.totalTco - b.totalTco)
}
