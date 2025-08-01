export interface TCOConfig {
  industry: string
  users: number
  devices: number
  timeframe: number
  currentVendor?: string
  requirements?: string[]
}

export interface VendorResult {
  vendorId: string
  vendorName: string
  totalCost: number
  perDevicePerMonth: number
  breakdown: {
    software: number
    hardware: number
    services: number
    operations: number
  }
  roi: {
    annualSavings: number
    breachReduction: number
    paybackMonths: number
  }
  operational: {
    automationLevel: number
    fteSaved: number
    maintenanceWindows: number
    mttr: number
  }
  risk: {
    securityScore: number
    complianceScore: number
  }
  competitive: {
    innovationScore: number
    futureReadiness: number
  }
  timeline: {
    timeToValue: number
    implementationWeeks: number
  }
}

export interface TCOResults {
  results: VendorResult[]
  config: TCOConfig
  timestamp: string
}
