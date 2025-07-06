export type OrgSizeId = "small_business" | "mid_market" | "enterprise" | "global_enterprise"

export interface OrgSizeDetails {
  devices: number
  users: number
  label: string
}

export interface CalculationConfig {
  orgSize: OrgSizeId
  devices: number
  users: number
  industry: string
  region: string
  projectionYears: number
}

export interface VendorComparisonResult {
  vendorId: string
  vendorName: string
  totalTCO: number
  breakdown: {
    licensing: number
    implementation: number
    operations: number
    support: number
    hardware: number
    hidden: number
  }
  roi: {
    percentage: number
    paybackMonths: number
  }
}
