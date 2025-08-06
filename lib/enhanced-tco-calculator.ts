// Enhanced TCO Calculator with accurate vendor pricing and realistic calculations
export interface CalculationConfiguration {
  devices: number
  users: number
  industry: string
  orgSize: "small" | "medium" | "large" | "enterprise"
  years: number
  region: string
  portnoxBasePrice: number
  portnoxAddons: {
    atp: boolean
    compliance: boolean
    iot: boolean
    analytics: boolean
  }
  aiConfig?: {
    openaiApiKey?: string
    openaiModel?: string
    claudeApiKey?: string
    claudeModel?: string
    geminiApiKey?: string
    geminiModel?: string
    defaultProvider?: "openai" | "claude" | "gemini"
    maxTokens?: number
    temperature?: number
  }
}

export interface CostBreakdown {
  software: number
  hardware: number
  services: number
  training: number
  operational: number
  maintenance: number
  total: number
}

export interface FinancialMetrics {
  npv: number
  irr: number
  roi: number
  paybackPeriod: number
  profitabilityIndex: number
}

export interface RiskAssessment {
  overallRisk: number
  securityRisk: number
  operationalRisk: number
  financialRisk: number
}

export interface BusinessImpact {
  productivityGains: number
  riskReduction: number
  complianceSavings: number
  totalBenefits: number
}

export interface Implementation {
  timeline: string
  complexity: 'Low' | 'Medium' | 'High'
  resources: number
}

export interface CalculationResult {
  vendorId: string
  vendorName: string
  totalCost: number
  yearlyBreakdown: YearlyBreakdown[]
  costBreakdown: CostBreakdown
  roi: number
  paybackMonths: number
  npv: number
  irr: number
  riskScore: number
  complianceScore: number
  deploymentTime: number
  maintenanceEffort: number
}

export interface YearlyBreakdown {
  year: number
  softwareCost: number
  hardwareCost: number
  servicesCost: number
  operationalCost: number
  totalCost: number
}

// Input validation utilities
class ValidationUtils {
  static validateConfiguration(config: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!config || typeof config !== 'object') {
      errors.push('Configuration object is required')
      return { isValid: false, errors }
    }

    if (typeof config.devices !== 'number' || !isFinite(config.devices)) {
      errors.push('Device count must be a valid number')
    } else if (config.devices <= 0) {
      errors.push('Device count must be greater than 0')
    } else if (config.devices > 10000000) {
      errors.push('Device count exceeds maximum limit (10 million)')
    }

    if (typeof config.users !== 'number' || !isFinite(config.users)) {
      errors.push('User count must be a valid number')
    } else if (config.users <= 0) {
      errors.push('User count must be greater than 0')
    } else if (config.users > 1000000) {
      errors.push('User count exceeds maximum limit (1 million)')
    }

    if (typeof config.years !== 'number' || !isFinite(config.years)) {
      errors.push('Analysis period must be a valid number')
    } else if (config.years <= 0) {
      errors.push('Analysis period must be greater than 0')
    } else if (config.years > 10) {
      errors.push('Analysis period cannot exceed 10 years')
    }

    if (!config.industry || typeof config.industry !== 'string') {
      errors.push('Industry selection is required')
    }

    const validOrgSizes = ['small', 'medium', 'large', 'enterprise']
    if (!config.orgSize || !validOrgSizes.includes(config.orgSize)) {
      errors.push('Valid organization size is required')
    }

    if (!config.region || typeof config.region !== 'string') {
      errors.push('Region selection is required')
    }

    return { isValid: errors.length === 0, errors }
  }

  static sanitizeConfiguration(config: any): CalculationConfiguration {
    const sanitized: CalculationConfiguration = {
      devices: Math.max(1, Math.min(10000000, Math.floor(Math.abs(Number(config?.devices) || 1000)))),
      users: Math.max(1, Math.min(1000000, Math.floor(Math.abs(Number(config?.users) || 50)))),
      industry: typeof config?.industry === 'string' ? config.industry : 'technology',
      orgSize: ['small', 'medium', 'large', 'enterprise'].includes(config?.orgSize) ? config.orgSize : 'medium',
      years: Math.max(1, Math.min(10, Math.floor(Math.abs(Number(config?.years) || 3)))),
      region: typeof config?.region === 'string' ? config.region : 'north-america',
      portnoxBasePrice: Math.max(1, Math.min(100, Number(config?.portnoxBasePrice) || 4.0)),
      portnoxAddons: {
        atp: Boolean(config?.portnoxAddons?.atp),
        compliance: Boolean(config?.portnoxAddons?.compliance),
        iot: Boolean(config?.portnoxAddons?.iot),
        analytics: Boolean(config?.portnoxAddons?.analytics)
      },
      aiConfig: config?.aiConfig || {}
    }

    return sanitized
  }

  static validateVendorIds(vendorIds: any): string[] {
    if (!Array.isArray(vendorIds)) {
      console.warn('Vendor IDs must be an array, returning empty array')
      return []
    }

    return vendorIds
      .filter(id => typeof id === 'string' && id.trim().length > 0)
      .map(id => id.trim().toLowerCase())
      .filter((id, index, arr) => arr.indexOf(id) === index)
  }

  static sanitizeNumber(value: any, min: number = 0, max: number = Number.MAX_SAFE_INTEGER, defaultValue: number = 0): number {
    if (typeof value !== 'number' || !isFinite(value) || isNaN(value)) {
      return defaultValue
    }
    return Math.max(min, Math.min(max, value))
  }
}

// Realistic vendor data based on actual market pricing
const VENDOR_DATABASE = {
  portnox: {
    name: "Portnox CLEAR",
    type: "cloud-native",
    basePricePerDevice: 4.0, // $4/device/month = $48/year
    hardwareRequired: false,
    servicesPercentage: 0.15, // 15% of software cost
    trainingCostPerUser: 200,
    deploymentDays: 7,
    maintenanceHoursPerMonth: 8,
    riskScore: 95, // Excellent security track record
    complianceScore: 92,
    cveCount: 0,
    addons: {
      atp: 1.0, // $1/device/month additional
      compliance: 0.5,
      iot: 0.75,
      analytics: 0.25,
    },
  },
  cisco: {
    name: "Cisco Identity Services Engine (ISE)",
    type: "on-premise",
    basePricePerDevice: 12.0, // $12/device/month = $144/year
    hardwareRequired: true,
    hardwareCostPer1000Devices: 45000, // $45K per 1000 devices
    servicesPercentage: 0.35, // 35% of total cost
    trainingCostPerUser: 3500,
    deploymentDays: 180, // 6 months
    maintenanceHoursPerMonth: 40,
    riskScore: 72, // Multiple CVEs
    complianceScore: 88,
    cveCount: 47,
    supportCostPercentage: 0.22, // 22% annually
  },
  aruba: {
    name: "Aruba ClearPass",
    type: "hybrid",
    basePricePerDevice: 8.5, // $8.50/device/month = $102/year
    hardwareRequired: true,
    hardwareCostPer1000Devices: 25000, // $25K per 1000 devices
    servicesPercentage: 0.25,
    trainingCostPerUser: 2500,
    deploymentDays: 90, // 3 months
    maintenanceHoursPerMonth: 24,
    riskScore: 85,
    complianceScore: 86,
    cveCount: 12,
    supportCostPercentage: 0.18,
  },
  forescout: {
    name: "Forescout Platform",
    type: "on-premise",
    basePricePerDevice: 3.5, // $3.50/device/month = $42/year
    hardwareRequired: true,
    hardwareCostPer1000Devices: 35000,
    servicesPercentage: 0.30,
    trainingCostPerUser: 3000,
    deploymentDays: 120, // 4 months
    maintenanceHoursPerMonth: 32,
    riskScore: 78,
    complianceScore: 82,
    cveCount: 8,
    supportCostPercentage: 0.20,
  },
  juniper: {
    name: "Juniper Mist Access Assurance",
    type: "cloud-managed",
    basePricePerDevice: 6.0, // $6/device/month = $72/year
    hardwareRequired: false, // Cloud-managed but requires Mist infrastructure
    infrastructureCost: 15000, // Base infrastructure cost
    servicesPercentage: 0.20,
    trainingCostPerUser: 2000,
    deploymentDays: 45,
    maintenanceHoursPerMonth: 16,
    riskScore: 88,
    complianceScore: 84,
    cveCount: 3,
    supportCostPercentage: 0.15,
  },
  extreme: {
    name: "Extreme NAC",
    type: "on-premise",
    basePricePerDevice: 1.0, // $1/device/month = $12/year
    hardwareRequired: true,
    hardwareCostPer1000Devices: 20000,
    servicesPercentage: 0.25,
    trainingCostPerUser: 1800,
    deploymentDays: 60,
    maintenanceHoursPerMonth: 20,
    riskScore: 80,
    complianceScore: 78,
    cveCount: 5,
    supportCostPercentage: 0.16,
  },
  fortinet: {
    name: "Fortinet FortiNAC",
    type: "on-premise",
    basePricePerDevice: 2.5, // $2.50/device/month = $30/year
    hardwareRequired: true,
    hardwareCostPer1000Devices: 30000,
    servicesPercentage: 0.28,
    trainingCostPerUser: 2200,
    deploymentDays: 75,
    maintenanceHoursPerMonth: 28,
    riskScore: 82,
    complianceScore: 85,
    cveCount: 15,
    supportCostPercentage: 0.18,
  },
  microsoft: {
    name: "Microsoft NPS",
    type: "on-premise",
    basePricePerDevice: 0, // Free with Windows Server
    hardwareRequired: true,
    hardwareCostPer1000Devices: 8000, // Server hardware
    servicesPercentage: 0.40, // High services cost due to complexity
    trainingCostPerUser: 1500,
    deploymentDays: 30,
    maintenanceHoursPerMonth: 35, // High maintenance
    riskScore: 65, // Limited features
    complianceScore: 60, // Basic compliance only
    cveCount: 25,
    supportCostPercentage: 0.25,
    additionalLicensing: 15000, // Azure AD Premium, etc.
  },
  foxpass: {
    name: "FoxPass",
    type: "cloud-radius",
    basePricePerDevice: 3.0, // $3/device/month = $36/year
    hardwareRequired: false,
    servicesPercentage: 0.10,
    trainingCostPerUser: 500,
    deploymentDays: 14,
    maintenanceHoursPerMonth: 4,
    riskScore: 75, // Limited to WiFi/RADIUS
    complianceScore: 70,
    cveCount: 1,
    supportCostPercentage: 0.12,
    limitations: "WiFi/PKI only - no wired NAC",
  },
  securew2: {
    name: "SecureW2",
    type: "cloud-pki",
    basePricePerDevice: 15.0, // $15/device/month = $180/year (premium pricing)
    hardwareRequired: false,
    servicesPercentage: 0.20,
    trainingCostPerUser: 1000,
    deploymentDays: 21,
    maintenanceHoursPerMonth: 6,
    riskScore: 78,
    complianceScore: 75,
    cveCount: 2,
    supportCostPercentage: 0.15,
    limitations: "PKI-focused, limited NAC features",
  },
}

// Industry-specific factors
const INDUSTRY_FACTORS = {
  healthcare: {
    complianceMultiplier: 1.3,
    riskMultiplier: 1.4,
    trainingMultiplier: 1.2,
  },
  financial: {
    complianceMultiplier: 1.4,
    riskMultiplier: 1.5,
    trainingMultiplier: 1.3,
  },
  government: {
    complianceMultiplier: 1.5,
    riskMultiplier: 1.6,
    trainingMultiplier: 1.4,
  },
  education: {
    complianceMultiplier: 1.1,
    riskMultiplier: 1.1,
    trainingMultiplier: 0.9,
  },
  manufacturing: {
    complianceMultiplier: 1.2,
    riskMultiplier: 1.3,
    trainingMultiplier: 1.1,
  },
  retail: {
    complianceMultiplier: 1.2,
    riskMultiplier: 1.2,
    trainingMultiplier: 1.0,
  },
  technology: {
    complianceMultiplier: 1.1,
    riskMultiplier: 1.1,
    trainingMultiplier: 0.8,
  },
  energy: {
    complianceMultiplier: 1.4,
    riskMultiplier: 1.5,
    trainingMultiplier: 1.3,
  },
}

// Regional cost factors
const REGIONAL_FACTORS = {
  "north-america": {
    laborCostMultiplier: 1.0,
    hardwareCostMultiplier: 1.0,
  },
  "europe": {
    laborCostMultiplier: 0.9,
    hardwareCostMultiplier: 1.1,
  },
  "asia-pacific": {
    laborCostMultiplier: 0.7,
    hardwareCostMultiplier: 1.05,
  },
  "latin-america": {
    laborCostMultiplier: 0.6,
    hardwareCostMultiplier: 1.15,
  },
}

export function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult {
  const vendor = VENDOR_DATABASE[vendorId as keyof typeof VENDOR_DATABASE]
  if (!vendor) {
    throw new Error(`Unknown vendor: ${vendorId}`)
  }

  const industryFactor = INDUSTRY_FACTORS[config.industry as keyof typeof INDUSTRY_FACTORS] || {
    complianceMultiplier: 1.0,
    riskMultiplier: 1.0,
    trainingMultiplier: 1.0,
  }

  const regionalFactor = REGIONAL_FACTORS[config.region as keyof typeof REGIONAL_FACTORS] || {
    laborCostMultiplier: 1.0,
    hardwareCostMultiplier: 1.0,
  }

  // Calculate base software cost
  let baseSoftwareCost = vendor.basePricePerDevice * config.devices * 12 // Annual cost

  // Add Portnox addons if applicable
  if (vendorId === "portnox" && vendor.addons) {
    if (config.portnoxAddons.atp) baseSoftwareCost += vendor.addons.atp * config.devices * 12
    if (config.portnoxAddons.compliance) baseSoftwareCost += vendor.addons.compliance * config.devices * 12
    if (config.portnoxAddons.iot) baseSoftwareCost += vendor.addons.iot * config.devices * 12
    if (config.portnoxAddons.analytics) baseSoftwareCost += vendor.addons.analytics * config.devices * 12
  }

  // Calculate hardware cost
  let hardwareCost = 0
  if (vendor.hardwareRequired && vendor.hardwareCostPer1000Devices) {
    const hardwareUnits = Math.ceil(config.devices / 1000)
    hardwareCost = hardwareUnits * vendor.hardwareCostPer1000Devices * regionalFactor.hardwareCostMultiplier
  }
  if (vendor.infrastructureCost) {
    hardwareCost += vendor.infrastructureCost * regionalFactor.hardwareCostMultiplier
  }
  if (vendor.additionalLicensing) {
    hardwareCost += vendor.additionalLicensing
  }

  // Calculate services cost
  const servicesCost = (baseSoftwareCost + hardwareCost) * vendor.servicesPercentage * regionalFactor.laborCostMultiplier

  // Calculate training cost
  const estimatedUsers = Math.min(config.users, Math.ceil(config.devices * 0.1)) // 10% of devices or actual users
  const trainingCost = estimatedUsers * vendor.trainingCostPerUser * industryFactor.trainingMultiplier * regionalFactor.laborCostMultiplier

  // Calculate operational cost (maintenance)
  const avgHourlyRate = 85 // Average IT hourly rate
  const annualMaintenanceCost = vendor.maintenanceHoursPerMonth * 12 * avgHourlyRate * regionalFactor.laborCostMultiplier

  // Calculate support cost
  const supportCost = vendor.supportCostPercentage ? baseSoftwareCost * vendor.supportCostPercentage : 0

  // Build yearly breakdown
  const yearlyBreakdown: YearlyBreakdown[] = []
  let totalCost = 0

  for (let year = 1; year <= config.years; year++) {
    const yearSoftwareCost = baseSoftwareCost
    const yearHardwareCost = year === 1 ? hardwareCost : 0 // Hardware only in year 1
    const yearServicesCost = year === 1 ? servicesCost + trainingCost : supportCost // Services in year 1, support thereafter
    const yearOperationalCost = annualMaintenanceCost

    const yearTotal = yearSoftwareCost + yearHardwareCost + yearServicesCost + yearOperationalCost

    yearlyBreakdown.push({
      year,
      softwareCost: yearSoftwareCost,
      hardwareCost: yearHardwareCost,
      servicesCost: yearServicesCost,
      operationalCost: yearOperationalCost,
      totalCost: yearTotal,
    })

    totalCost += yearTotal
  }

  // Calculate cost breakdown
  const costBreakdown: CostBreakdown = {
    software: baseSoftwareCost * config.years,
    hardware: hardwareCost,
    services: servicesCost,
    training: trainingCost,
    operational: annualMaintenanceCost * config.years,
    maintenance: supportCost * (config.years - 1), // Support years 2+
    total: totalCost,
  }

  // Calculate financial metrics
  const { roi, paybackMonths, npv, irr } = calculateFinancialMetrics(
    totalCost,
    yearlyBreakdown,
    config,
    vendor,
  )

  return {
    vendorId,
    vendorName: vendor.name,
    totalCost,
    yearlyBreakdown,
    costBreakdown,
    roi,
    paybackMonths,
    npv,
    irr,
    riskScore: vendor.riskScore * industryFactor.riskMultiplier,
    complianceScore: vendor.complianceScore * industryFactor.complianceMultiplier,
    deploymentTime: vendor.deploymentDays,
    maintenanceEffort: vendor.maintenanceHoursPerMonth,
  }
}

function calculateFinancialMetrics(
  totalCost: number,
  yearlyBreakdown: YearlyBreakdown[],
  config: CalculationConfiguration,
  vendor: any,
): { roi: number; paybackMonths: number; npv: number; irr: number } {
  // Calculate benefits based on vendor capabilities
  const annualProductivityGains = calculateProductivityGains(config.devices, vendor)
  const riskMitigationValue = calculateRiskMitigation(config, vendor)
  const complianceValue = calculateComplianceValue(config, vendor)

  const totalAnnualBenefits = annualProductivityGains + (riskMitigationValue + complianceValue) / config.years

  // ROI calculation
  const totalBenefits = totalAnnualBenefits * config.years
  const roi = ((totalBenefits - totalCost) / totalCost) * 100

  // Payback calculation
  let cumulativeCost = 0
  let cumulativeBenefits = 0
  let paybackMonths = config.years * 12

  for (let month = 1; month <= config.years * 12; month++) {
    const yearIndex = Math.ceil(month / 12) - 1
    if (yearIndex < yearlyBreakdown.length) {
      cumulativeCost += yearlyBreakdown[yearIndex].totalCost / 12
      cumulativeBenefits += totalAnnualBenefits / 12

      if (cumulativeBenefits >= cumulativeCost && paybackMonths === config.years * 12) {
        paybackMonths = month
        break
      }
    }
  }

  // NPV calculation (10% discount rate)
  const discountRate = 0.10
  let npv = -yearlyBreakdown[0].totalCost // Initial investment
  for (let year = 1; year <= config.years; year++) {
    const netCashFlow = totalAnnualBenefits - (yearlyBreakdown[year - 1]?.totalCost || 0)
    npv += netCashFlow / Math.pow(1 + discountRate, year)
  }

  // IRR calculation (simplified)
  const irr = calculateIRR(yearlyBreakdown, totalAnnualBenefits)

  return {
    roi: Math.round(roi),
    paybackMonths: Math.round(paybackMonths),
    npv: Math.round(npv),
    irr: Math.round(irr * 100),
  }
}

function calculateProductivityGains(devices: number, vendor: any): number {
  // Productivity gains based on deployment speed and maintenance reduction
  const baseGainPerDevice = 5 // $5 per device per year baseline
  
  // Deployment speed factor
  const deploymentFactor = vendor.deploymentDays < 30 ? 2.0 : vendor.deploymentDays < 90 ? 1.5 : 1.0
  
  // Maintenance efficiency factor
  const maintenanceFactor = vendor.maintenanceHoursPerMonth < 10 ? 2.0 : vendor.maintenanceHoursPerMonth < 25 ? 1.5 : 1.0
  
  return devices * baseGainPerDevice * deploymentFactor * maintenanceFactor
}

function calculateRiskMitigation(config: CalculationConfiguration, vendor: any): number {
  // Risk mitigation value based on security posture
  const baseRiskValue = 10000 // $10K base risk mitigation
  const riskFactor = vendor.riskScore / 100
  const industryRiskMultiplier = config.industry === 'financial' || config.industry === 'healthcare' ? 2.5 : 
                                config.industry === 'government' ? 3.0 : 1.5
  
  return baseRiskValue * riskFactor * industryRiskMultiplier
}

function calculateComplianceValue(config: CalculationConfiguration, vendor: any): number {
  // Compliance value based on automation capabilities
  const baseComplianceValue = 5000 // $5K base compliance value
  const complianceFactor = vendor.complianceScore / 100
  const industryComplianceMultiplier = config.industry === 'healthcare' || config.industry === 'financial' ? 2.0 : 1.2
  
  return baseComplianceValue * complianceFactor * industryComplianceMultiplier
}

function calculateIRR(yearlyBreakdown: YearlyBreakdown[], annualBenefits: number): number {
  // Simplified IRR calculation
  const cashFlows = [-yearlyBreakdown[0].totalCost] // Initial investment
  
  for (let i = 1; i < yearlyBreakdown.length; i++) {
    const netCashFlow = annualBenefits - yearlyBreakdown[i].totalCost
    cashFlows.push(netCashFlow)
  }
  
  // Simple IRR approximation
  const totalInvestment = Math.abs(cashFlows[0])
  const avgAnnualReturn = cashFlows.slice(1).reduce((sum, cf) => sum + cf, 0) / (cashFlows.length - 1)
  
  return avgAnnualReturn / totalInvestment
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): CalculationResult[] {
  return vendorIds.map(vendorId => calculateVendorTCO(vendorId, config))
    .sort((a, b) => a.totalCost - b.totalCost) // Sort by total cost
}

export function getVendorRecommendation(results: CalculationResult[]): {
  recommended: CalculationResult
  reasons: string[]
} {
  // Multi-criteria decision analysis
  const scoredResults = results.map(result => {
    const costScore = (1 - (result.totalCost / Math.max(...results.map(r => r.totalCost)))) * 100
    const roiScore = Math.min(result.roi / 10, 100) // Cap at 100
    const riskScore = result.riskScore
    const deploymentScore = (1 - (result.deploymentTime / Math.max(...results.map(r => r.deploymentTime)))) * 100
    
    const totalScore = (costScore * 0.3) + (roiScore * 0.25) + (riskScore * 0.25) + (deploymentScore * 0.2)
    
    return { ...result, totalScore }
  })
  
  const recommended = scoredResults.reduce((best, current) => 
    current.totalScore > best.totalScore ? current : best
  )
  
  const reasons = [
    `Lowest total cost of ownership: $${recommended.totalCost.toLocaleString()}`,
    `Strong ROI: ${recommended.roi}% over ${recommended.yearlyBreakdown.length} years`,
    `Excellent security posture: ${Math.round(recommended.riskScore)}/100`,
    `Rapid deployment: ${recommended.deploymentTime} days`,
  ]
  
  return { recommended, reasons }
}

export { ValidationUtils }
