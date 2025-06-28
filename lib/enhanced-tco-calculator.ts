import Decimal from "decimal.js"

export interface CalculationConfiguration {
  orgSize: "small" | "medium" | "large" | "enterprise"
  devices: number
  users: number
  industry:
    | "healthcare"
    | "financial"
    | "retail"
    | "technology"
    | "manufacturing"
    | "energy"
    | "government"
    | "education"
  years: number
  region: "north-america" | "europe" | "asia-pacific" | "latin-america"
  portnoxBasePrice: number
  portnoxAddons: {
    atp: boolean
    compliance: boolean
    iot: boolean
    analytics: boolean
  }
}

export interface CalculationResult {
  vendor: string
  name: string
  total: number
  breakdown: {
    licensing: number
    hardware: number
    implementation: number
    support: number
    training: number
    maintenance: number
    hidden: number
  }
  yearlyBreakdown: Array<{
    year: number
    cost: number
    cumulative: number
  }>
  roi: {
    percentage: number
    paybackMonths: number
    netPresentValue: number
    savings: number
  }
  riskFactors: {
    complexity: number
    vendor: number
    technology: number
    implementation: number
  }
}

// Industry-specific multipliers
const INDUSTRY_MULTIPLIERS = {
  healthcare: { compliance: 1.4, security: 1.3, implementation: 1.2 },
  financial: { compliance: 1.5, security: 1.4, implementation: 1.3 },
  retail: { compliance: 1.2, security: 1.2, implementation: 1.1 },
  technology: { compliance: 1.1, security: 1.1, implementation: 1.0 },
  manufacturing: { compliance: 1.3, security: 1.2, implementation: 1.2 },
  energy: { compliance: 1.4, security: 1.4, implementation: 1.3 },
  government: { compliance: 1.6, security: 1.5, implementation: 1.4 },
  education: { compliance: 1.2, security: 1.1, implementation: 1.1 },
}

// Regional cost multipliers
const REGIONAL_MULTIPLIERS = {
  "north-america": 1.0,
  europe: 1.15,
  "asia-pacific": 0.85,
  "latin-america": 0.75,
}

// Organization size multipliers
const ORG_SIZE_MULTIPLIERS = {
  small: { volume: 1.2, complexity: 0.8, support: 1.1 },
  medium: { volume: 1.0, complexity: 1.0, support: 1.0 },
  large: { volume: 0.9, complexity: 1.2, support: 0.9 },
  enterprise: { volume: 0.8, complexity: 1.4, support: 0.8 },
}

// Vendor-specific calculation data
const VENDOR_CALCULATIONS = {
  portnox: {
    licensing: { perDevice: 3.0, model: "subscription" },
    hardware: { required: false, cost: 0 },
    implementation: { baseCost: 0, complexity: 0.1, timeWeeks: 2 },
    support: { included: true, premium: 0.5 },
    training: { required: false, cost: 0 },
    maintenance: { percentage: 0, annual: 0 },
    hidden: { downtime: 0, complexity: 0, integration: 0 },
    addons: {
      atp: { perDevice: 1.5, description: "Advanced Threat Protection" },
      compliance: { perDevice: 1.0, description: "Compliance Automation" },
      iot: { perDevice: 2.0, description: "IoT/OT Security" },
      analytics: { perDevice: 1.5, description: "Risk Analytics" },
    },
  },
  cisco: {
    licensing: { perDevice: 12.0, model: "perpetual" },
    hardware: { required: true, baseCost: 65000, perDevice: 0.5 },
    implementation: { baseCost: 150000, complexity: 3.0, timeWeeks: 24 },
    support: { included: false, annual: 0.22 },
    training: { required: true, cost: 25000 },
    maintenance: { percentage: 0.22, annual: 0 },
    hidden: { downtime: 100000, complexity: 80000, integration: 70000 },
  },
  aruba: {
    licensing: { perDevice: 8.5, model: "perpetual" },
    hardware: { required: true, baseCost: 28995, perDevice: 0.3 },
    implementation: { baseCost: 80000, complexity: 2.0, timeWeeks: 12 },
    support: { included: false, annual: 0.2 },
    training: { required: true, cost: 15000 },
    maintenance: { percentage: 0.2, annual: 0 },
    hidden: { downtime: 50000, complexity: 50000, integration: 40000 },
  },
  meraki: {
    licensing: { perDevice: 15.0, model: "subscription" },
    hardware: { required: true, baseCost: 50000, perDevice: 1.0 },
    implementation: { baseCost: 25000, complexity: 1.5, timeWeeks: 12 },
    support: { included: true, premium: 0 },
    training: { required: true, cost: 5000 },
    maintenance: { percentage: 0, annual: 0 },
    hidden: { downtime: 25000, complexity: 15000, integration: 20000 },
  },
  forescout: {
    licensing: { perDevice: 15.0, model: "subscription" },
    hardware: { required: true, baseCost: 55000, perDevice: 0.4 },
    implementation: { baseCost: 80000, complexity: 2.5, timeWeeks: 16 },
    support: { included: false, annual: 0.25 },
    training: { required: true, cost: 20000 },
    maintenance: { percentage: 0.25, annual: 0 },
    hidden: { downtime: 75000, complexity: 30000, integration: 45000 },
  },
  fortinet: {
    licensing: { perDevice: 9.5, model: "perpetual" },
    hardware: { required: true, baseCost: 20000, perDevice: 0.25 },
    implementation: { baseCost: 40000, complexity: 2.0, timeWeeks: 8 },
    support: { included: false, annual: 0.18 },
    training: { required: true, cost: 12000 },
    maintenance: { percentage: 0.18, annual: 0 },
    hidden: { downtime: 30000, complexity: 25000, integration: 20000 },
  },
  juniper: {
    licensing: { perDevice: 8.0, model: "subscription" },
    hardware: { required: false, baseCost: 0, perDevice: 0 },
    implementation: { baseCost: 12000, complexity: 0.5, timeWeeks: 4 },
    support: { included: true, premium: 0.3 },
    training: { required: true, cost: 8000 },
    maintenance: { percentage: 0, annual: 0 },
    hidden: { downtime: 5000, complexity: 8000, integration: 5000 },
  },
  arista: {
    licensing: { perDevice: 7.0, model: "subscription" },
    hardware: { required: false, baseCost: 0, perDevice: 0 },
    implementation: { baseCost: 10000, complexity: 1.0, timeWeeks: 6 },
    support: { included: true, premium: 0.2 },
    training: { required: true, cost: 6000 },
    maintenance: { percentage: 0, annual: 0 },
    hidden: { downtime: 8000, complexity: 12000, integration: 8000 },
  },
}

export function compareVendors(
  selectedVendors: string[],
  configuration: CalculationConfiguration,
): CalculationResult[] {
  return selectedVendors.map((vendorId) => calculateVendorTCO(vendorId, configuration))
}

export function calculateVendorTCO(vendorId: string, configuration: CalculationConfiguration): CalculationResult {
  const vendorData = VENDOR_CALCULATIONS[vendorId as keyof typeof VENDOR_CALCULATIONS]
  if (!vendorData) {
    throw new Error(`Vendor ${vendorId} not found in calculations`)
  }

  const industryMultiplier = INDUSTRY_MULTIPLIERS[configuration.industry]
  const regionalMultiplier = REGIONAL_MULTIPLIERS[configuration.region]
  const orgMultiplier = ORG_SIZE_MULTIPLIERS[configuration.orgSize]

  // Calculate base costs using Decimal for precision
  const devices = new Decimal(configuration.devices || 1000)
  const years = new Decimal(configuration.years || 3)

  // Licensing costs
  let licensingCost = new Decimal(0)
  if (vendorId === "portnox") {
    // Portnox with addons
    let basePrice = new Decimal(configuration.portnoxBasePrice || 3.0)

    // Add addon costs
    if (configuration.portnoxAddons?.atp) {
      basePrice = basePrice.plus(vendorData.addons?.atp?.perDevice || 0)
    }
    if (configuration.portnoxAddons?.compliance) {
      basePrice = basePrice.plus(vendorData.addons?.compliance?.perDevice || 0)
    }
    if (configuration.portnoxAddons?.iot) {
      basePrice = basePrice.plus(vendorData.addons?.iot?.perDevice || 0)
    }
    if (configuration.portnoxAddons?.analytics) {
      basePrice = basePrice.plus(vendorData.addons?.analytics?.perDevice || 0)
    }

    licensingCost = basePrice.mul(devices).mul(12).mul(years) // Monthly to total
  } else {
    const baseDeviceCost = new Decimal(vendorData.licensing.perDevice)
    if (vendorData.licensing.model === "subscription") {
      licensingCost = baseDeviceCost.mul(devices).mul(12).mul(years)
    } else {
      licensingCost = baseDeviceCost.mul(devices)
    }
  }

  // Apply volume discounts
  const volumeDiscount = calculateVolumeDiscount(devices.toNumber())
  licensingCost = licensingCost.mul(new Decimal(1).minus(volumeDiscount))

  // Hardware costs
  const hardwareCost = vendorData.hardware.required
    ? new Decimal(vendorData.hardware.baseCost).plus(new Decimal(vendorData.hardware.perDevice).mul(devices))
    : new Decimal(0)

  // Implementation costs
  const baseImplementation = new Decimal(vendorData.implementation.baseCost)
  const complexityMultiplier = new Decimal(vendorData.implementation.complexity)
  const implementationCost = baseImplementation.plus(
    devices
      .mul(complexityMultiplier)
      .mul(100), // $100 per device per complexity point
  )

  // Support costs
  const supportCost = vendorData.support.included ? new Decimal(0) : licensingCost.mul(vendorData.support.annual || 0)

  // Training costs
  const trainingCost = new Decimal(vendorData.training?.cost || 0)

  // Maintenance costs
  const maintenanceCost = vendorData.maintenance.percentage
    ? hardwareCost.plus(licensingCost).mul(vendorData.maintenance.percentage).mul(years)
    : new Decimal(vendorData.maintenance.annual || 0).mul(years)

  // Hidden costs
  const hiddenCost = new Decimal(vendorData.hidden.downtime || 0)
    .plus(vendorData.hidden.complexity || 0)
    .plus(vendorData.hidden.integration || 0)

  // Apply multipliers
  const industryFactor = new Decimal(industryMultiplier.implementation)
  const regionalFactor = new Decimal(regionalMultiplier)
  const orgFactor = new Decimal(orgMultiplier.complexity)

  const totalMultiplier = industryFactor.mul(regionalFactor).mul(orgFactor)

  // Calculate final costs
  const finalLicensing = licensingCost.mul(totalMultiplier)
  const finalHardware = hardwareCost.mul(regionalFactor)
  const finalImplementation = implementationCost.mul(totalMultiplier)
  const finalSupport = supportCost.mul(regionalFactor)
  const finalTraining = trainingCost.mul(regionalFactor)
  const finalMaintenance = maintenanceCost.mul(regionalFactor)
  const finalHidden = hiddenCost.mul(totalMultiplier)

  const totalCost = finalLicensing
    .plus(finalHardware)
    .plus(finalImplementation)
    .plus(finalSupport)
    .plus(finalTraining)
    .plus(finalMaintenance)
    .plus(finalHidden)

  // Calculate yearly breakdown
  const yearlyBreakdown = []
  let cumulative = new Decimal(0)

  for (let year = 1; year <= configuration.years; year++) {
    let yearCost = new Decimal(0)

    // Year 1 includes implementation, hardware, training
    if (year === 1) {
      yearCost = yearCost.plus(finalImplementation).plus(finalHardware).plus(finalTraining).plus(finalHidden)
    }

    // Annual costs (licensing, support, maintenance)
    const annualLicensing = finalLicensing.div(years)
    const annualSupport = finalSupport.div(years)
    const annualMaintenance = finalMaintenance.div(years)

    yearCost = yearCost.plus(annualLicensing).plus(annualSupport).plus(annualMaintenance)

    cumulative = cumulative.plus(yearCost)

    yearlyBreakdown.push({
      year,
      cost: yearCost.toNumber(),
      cumulative: cumulative.toNumber(),
    })
  }

  // Calculate ROI
  const roi = calculateROI(vendorId, totalCost.toNumber(), configuration)

  // Calculate risk factors
  const riskFactors = calculateRiskFactors(vendorId, configuration)

  return {
    vendor: vendorId,
    name: getVendorName(vendorId),
    total: totalCost.toNumber(),
    breakdown: {
      licensing: finalLicensing.toNumber(),
      hardware: finalHardware.toNumber(),
      implementation: finalImplementation.toNumber(),
      support: finalSupport.toNumber(),
      training: finalTraining.toNumber(),
      maintenance: finalMaintenance.toNumber(),
      hidden: finalHidden.toNumber(),
    },
    yearlyBreakdown,
    roi,
    riskFactors,
  }
}

function calculateVolumeDiscount(devices: number): number {
  if (devices >= 50000) return 0.35
  if (devices >= 25000) return 0.3
  if (devices >= 10000) return 0.25
  if (devices >= 5000) return 0.2
  if (devices >= 2500) return 0.15
  if (devices >= 1000) return 0.1
  if (devices >= 500) return 0.05
  return 0
}

function calculateROI(vendorId: string, totalCost: number, configuration: CalculationConfiguration) {
  // ROI benefits vary by vendor
  const roiBenefits = {
    portnox: {
      laborSavings: 850000,
      incidentReduction: 0.85,
      complianceSavings: 200000,
      breachRiskReduction: 0.8,
      paybackMonths: 6,
    },
    cisco: {
      laborSavings: 150000,
      incidentReduction: 0.6,
      complianceSavings: 75000,
      breachRiskReduction: 0.55,
      paybackMonths: 36,
    },
    aruba: {
      laborSavings: 180000,
      incidentReduction: 0.55,
      complianceSavings: 60000,
      breachRiskReduction: 0.5,
      paybackMonths: 30,
    },
    meraki: {
      laborSavings: 200000,
      incidentReduction: 0.5,
      complianceSavings: 50000,
      breachRiskReduction: 0.45,
      paybackMonths: 24,
    },
    forescout: {
      laborSavings: 120000,
      incidentReduction: 0.6,
      complianceSavings: 80000,
      breachRiskReduction: 0.5,
      paybackMonths: 18,
    },
    fortinet: {
      laborSavings: 160000,
      incidentReduction: 0.55,
      complianceSavings: 65000,
      breachRiskReduction: 0.48,
      paybackMonths: 22,
    },
    juniper: {
      laborSavings: 300000,
      incidentReduction: 0.75,
      complianceSavings: 120000,
      breachRiskReduction: 0.75,
      paybackMonths: 10,
    },
    arista: {
      laborSavings: 250000,
      incidentReduction: 0.7,
      complianceSavings: 100000,
      breachRiskReduction: 0.7,
      paybackMonths: 12,
    },
  }

  const benefits = roiBenefits[vendorId as keyof typeof roiBenefits] || roiBenefits.cisco

  const annualBenefits = benefits.laborSavings + benefits.complianceSavings
  const totalBenefits = annualBenefits * configuration.years
  const netBenefit = totalBenefits - totalCost
  const roiPercentage = totalCost > 0 ? (netBenefit / totalCost) * 100 : 0

  // Calculate NPV with 10% discount rate
  const discountRate = 0.1
  let npv = -totalCost // Initial investment
  for (let year = 1; year <= configuration.years; year++) {
    npv += annualBenefits / Math.pow(1 + discountRate, year)
  }

  return {
    percentage: Math.round(roiPercentage),
    paybackMonths: benefits.paybackMonths,
    netPresentValue: Math.round(npv),
    savings: Math.round(netBenefit),
  }
}

function calculateRiskFactors(vendorId: string, configuration: CalculationConfiguration) {
  const riskProfiles = {
    portnox: { complexity: 1, vendor: 2, technology: 1, implementation: 1 },
    cisco: { complexity: 9, vendor: 2, technology: 3, implementation: 9 },
    aruba: { complexity: 7, vendor: 3, technology: 4, implementation: 7 },
    meraki: { complexity: 5, vendor: 3, technology: 5, implementation: 6 },
    forescout: { complexity: 8, vendor: 5, technology: 4, implementation: 8 },
    fortinet: { complexity: 6, vendor: 4, technology: 4, implementation: 6 },
    juniper: { complexity: 3, vendor: 4, technology: 2, implementation: 3 },
    arista: { complexity: 4, vendor: 4, technology: 3, implementation: 4 },
  }

  return riskProfiles[vendorId as keyof typeof riskProfiles] || riskProfiles.cisco
}

function getVendorName(vendorId: string): string {
  const names = {
    portnox: "Portnox CLEAR",
    cisco: "Cisco ISE",
    aruba: "Aruba ClearPass",
    meraki: "Cisco Meraki",
    forescout: "Forescout eyeSight",
    fortinet: "FortiNAC",
    juniper: "Juniper Mist Access Assurance",
    arista: "Arista CUE",
  }

  return names[vendorId as keyof typeof names] || vendorId
}
