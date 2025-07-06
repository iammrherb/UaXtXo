import { VENDOR_DATA, type NewVendorData } from "../vendors/data"
import type { OrgSizeId, IndustryId } from "@/types/common"

export interface TCOInputs {
  orgSize: OrgSizeId
  industry: IndustryId
  employeeCount: number
  deviceCount: number
  analysisYears: number
  region: string
  complianceRequirements: string[]
  currentSolution?: string
  budgetConstraints?: number
}

export interface TCOBreakdown {
  licensing: number
  hardware: number
  implementation: number
  training: number
  support: number
  personnel: number
  hiddenCosts: number
  total: number
}

export interface VendorTCOResult {
  vendorId: string
  vendorName: string
  yearlyBreakdown: TCOBreakdown[]
  totalTCO: number
  averageYearlyTCO: number
  paybackPeriod: number
  roi: number
  riskReduction: number
  complianceCoverage: number
}

export interface TCOAnalysisResult {
  vendors: VendorTCOResult[]
  portnoxAdvantage: {
    costSavings: number
    timeToValue: number
    riskReduction: number
    complianceAdvantage: number
  }
  recommendations: string[]
}

// Organization size multipliers
const ORG_SIZE_MULTIPLIERS: Record<OrgSizeId, number> = {
  small_business: 0.5,
  mid_market: 1.0,
  enterprise: 2.0,
  global_enterprise: 4.0,
}

// Industry complexity multipliers
const INDUSTRY_MULTIPLIERS: Record<IndustryId, number> = {
  healthcare: 1.3,
  financial_services: 1.4,
  government: 1.5,
  manufacturing: 1.2,
  education: 0.9,
  technology: 1.1,
  retail: 1.0,
  telecommunications: 1.2,
  energy_utilities: 1.3,
  legal_services: 1.1,
  insurance: 1.2,
  pharmaceuticals: 1.4,
}

// Average IT salary by region (annual)
const REGIONAL_IT_SALARIES: Record<string, number> = {
  "North America": 85000,
  Europe: 65000,
  "Asia Pacific": 55000,
  "Latin America": 45000,
  "Middle East & Africa": 50000,
}

export function calculateVendorTCO(vendor: NewVendorData, inputs: TCOInputs): VendorTCOResult {
  const orgMultiplier = ORG_SIZE_MULTIPLIERS[inputs.orgSize] || 1.0
  const industryMultiplier = INDUSTRY_MULTIPLIERS[inputs.industry] || 1.0
  const itSalary = REGIONAL_IT_SALARIES[inputs.region] || 75000

  const yearlyBreakdown: TCOBreakdown[] = []
  let totalTCO = 0

  for (let year = 1; year <= inputs.analysisYears; year++) {
    const isFirstYear = year === 1

    // Base costs from vendor data
    const baseLicensing = vendor.tcoFactors.licensingCostPerYear || 30000
    const baseHardware = vendor.tcoFactors.hardwareCostPerYear || 0
    const basePersonnel = (vendor.tcoFactors.personnelCostFactor || 1) * itSalary
    const baseTraining = isFirstYear ? vendor.tcoFactors.trainingCostInitial || 5000 : 0
    const baseSupport = baseLicensing * (vendor.tcoFactors.supportCostFactor || 0.2)
    const baseHidden = baseLicensing * (vendor.tcoFactors.hiddenCostFactor || 0.1)

    // Apply multipliers
    const licensing = baseLicensing * orgMultiplier * industryMultiplier
    const hardware = baseHardware * orgMultiplier
    const personnel = basePersonnel * orgMultiplier
    const training = baseTraining * orgMultiplier
    const support = baseSupport * orgMultiplier
    const hiddenCosts = baseHidden * orgMultiplier * industryMultiplier

    // Implementation costs (first year only)
    const implementation = isFirstYear ? licensing * (vendor.implementation.professionalServicesCostFactor || 0.2) : 0

    const yearTotal = licensing + hardware + implementation + training + support + personnel + hiddenCosts

    yearlyBreakdown.push({
      licensing,
      hardware,
      implementation,
      training,
      support,
      personnel,
      hiddenCosts,
      total: yearTotal,
    })

    totalTCO += yearTotal
  }

  const averageYearlyTCO = totalTCO / inputs.analysisYears
  const paybackPeriod = vendor.roiFactors.avgPaybackPeriodMonths || 24
  const roi = calculateROI(totalTCO, vendor, inputs)
  const riskReduction = vendor.roiFactors.incidentReductionPercent || 50
  const complianceCoverage = calculateComplianceCoverage(vendor, inputs.complianceRequirements)

  return {
    vendorId: vendor.id,
    vendorName: vendor.name,
    yearlyBreakdown,
    totalTCO,
    averageYearlyTCO,
    paybackPeriod,
    roi,
    riskReduction,
    complianceCoverage,
  }
}

function calculateROI(totalTCO: number, vendor: NewVendorData, inputs: TCOInputs): number {
  const incidentReduction = vendor.roiFactors.incidentReductionPercent || 50
  const operationalEfficiency = vendor.roiFactors.operationalEfficiencyGainPercent || 30
  const complianceAutomation = vendor.roiFactors.complianceAutomationSavingsFactor || 0.1

  // Estimate annual benefits
  const avgIncidentCost = 50000 // Average cost per security incident
  const avgIncidentsPerYear = 3
  const incidentSavings = ((avgIncidentCost * avgIncidentsPerYear * incidentReduction) / 100) * inputs.analysisYears

  const operationalSavings = (totalTCO * operationalEfficiency) / 100
  const complianceSavings = totalTCO * complianceAutomation

  const totalBenefits = incidentSavings + operationalSavings + complianceSavings
  const roi = ((totalBenefits - totalTCO) / totalTCO) * 100

  return Math.round(roi)
}

function calculateComplianceCoverage(vendor: NewVendorData, requirements: string[]): number {
  if (!requirements.length) return 0

  const supportedStandards = vendor.complianceSupport.map((cs) => cs.standardId)
  const coveredRequirements = requirements.filter((req) => supportedStandards.includes(req))

  return Math.round((coveredRequirements.length / requirements.length) * 100)
}

export function performTCOAnalysis(inputs: TCOInputs): TCOAnalysisResult {
  const vendorResults = VENDOR_DATA.map((vendor) => calculateVendorTCO(vendor, inputs))

  // Sort by total TCO
  vendorResults.sort((a, b) => a.totalTCO - b.totalTCO)

  // Find Portnox results
  const portnoxResult = vendorResults.find((v) => v.vendorId === "portnox")
  const lowestTCO = vendorResults[0]
  const highestTCO = vendorResults[vendorResults.length - 1]

  // Calculate Portnox advantages
  const portnoxAdvantage = {
    costSavings: portnoxResult ? highestTCO.totalTCO - portnoxResult.totalTCO : 0,
    timeToValue: portnoxResult ? 36 - portnoxResult.paybackPeriod : 0,
    riskReduction: portnoxResult ? portnoxResult.riskReduction : 0,
    complianceAdvantage: portnoxResult ? portnoxResult.complianceCoverage : 0,
  }

  // Generate recommendations
  const recommendations = generateRecommendations(vendorResults, inputs)

  return {
    vendors: vendorResults,
    portnoxAdvantage,
    recommendations,
  }
}

function generateRecommendations(results: VendorTCOResult[], inputs: TCOInputs): string[] {
  const recommendations: string[] = []

  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const lowestTCO = results[0]

  if (portnoxResult && portnoxResult.vendorId === lowestTCO.vendorId) {
    recommendations.push("Portnox CLEAR offers the lowest total cost of ownership for your organization.")
  }

  if (portnoxResult && portnoxResult.paybackPeriod < 18) {
    recommendations.push("Portnox CLEAR provides rapid ROI with payback in less than 18 months.")
  }

  if (inputs.complianceRequirements.length > 0) {
    const highestCompliance = results.reduce((prev, current) =>
      current.complianceCoverage > prev.complianceCoverage ? current : prev,
    )
    if (highestCompliance.complianceCoverage > 80) {
      recommendations.push(
        `${highestCompliance.vendorName} provides the best compliance coverage for your requirements.`,
      )
    }
  }

  if (inputs.orgSize === "small_business" || inputs.orgSize === "mid_market") {
    recommendations.push("Consider cloud-native solutions for faster deployment and lower operational overhead.")
  }

  return recommendations
}

export function getVendorComparison(vendorIds: string[], inputs: TCOInputs) {
  const selectedVendors = VENDOR_DATA.filter((v) => vendorIds.includes(v.id))
  const results = selectedVendors.map((vendor) => calculateVendorTCO(vendor, inputs))

  return results.sort((a, b) => a.totalTCO - b.totalTCO)
}

export function exportTCOAnalysis(analysis: TCOAnalysisResult, format: "csv" | "pdf" | "excel" = "csv") {
  // Implementation would depend on the format
  // For now, return CSV data
  if (format === "csv") {
    const headers = ["Vendor", "Total TCO", "Yearly Average", "Payback Period", "ROI %", "Risk Reduction %"]
    const rows = analysis.vendors.map((v) => [
      v.vendorName,
      v.totalTCO.toFixed(0),
      v.averageYearlyTCO.toFixed(0),
      v.paybackPeriod.toString(),
      v.roi.toString(),
      v.riskReduction.toString(),
    ])

    return [headers, ...rows].map((row) => row.join(",")).join("\n")
  }

  return analysis
}
