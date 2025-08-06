// Enhanced TCO Calculator with accurate vendor pricing and realistic calculations
export interface CalculationConfiguration {
  devices: number
  users: number
  industry: string
  orgSize: 'small' | 'medium' | 'large' | 'enterprise'
  years: number
  region: string
  portnoxBasePrice?: number
  portnoxAddons?: {
    atp: boolean
    compliance: boolean
    iot: boolean
    analytics: boolean
  }
  aiConfig?: {
    openaiApiKey: string
    openaiModel: string
    claudeApiKey: string
    claudeModel: string
    geminiApiKey: string
    geminiModel: string
    defaultProvider: string
    maxTokens: number
    temperature: number
  }
  discountRate?: number
  inflationRate?: number
  taxRate?: number
}

export interface CostBreakdown {
  licensing: number
  hardware: number
  services: number
  training: number
  maintenance: number
  operational: number
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
  costBreakdown: CostBreakdown
  financialMetrics: FinancialMetrics
  riskAssessment: RiskAssessment
  businessImpact: BusinessImpact
  implementation: Implementation
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
      discountRate: Math.max(0.01, Math.min(1.0, Number(config?.discountRate) || 0.10)),
      inflationRate: Math.max(0, Math.min(0.20, Number(config?.inflationRate) || 0.03)),
      taxRate: Math.max(0, Math.min(0.60, Number(config?.taxRate) || 0.25))
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

// Accurate vendor database based on real market pricing
const VENDOR_DATABASE = {
  portnox: {
    name: 'Portnox CLEAR',
    category: 'cloud-native',
    pricing: {
      basePrice: 4.0, // $4/device/month = $48/device/year
      hardwareRequired: false,
      hardwareCost: 0,
      servicesMultiplier: 0.0, // No professional services required
      trainingCost: 0, // Included in subscription
      maintenanceMultiplier: 0.0, // Included in SaaS
      operationalEfficiency: 0.15 // 15% reduction in operational costs
    },
    implementation: {
      timelineDays: 1,
      complexity: 'Low' as const,
      resourcesRequired: 0.25, // 0.25 FTE for deployment
      ongoingResources: 0.1 // 0.1 FTE for ongoing management
    },
    risks: {
      securityScore: 95, // High security (lower risk)
      operationalScore: 90, // High operational reliability
      financialScore: 85 // Predictable SaaS pricing
    },
    benefits: {
      productivityPerDevice: 25, // $25/device/year productivity gain
      riskMitigationTotal: 15000, // $15K total risk mitigation
      complianceTotal: 8000 // $8K compliance benefits
    }
  },
  cisco: {
    name: 'Cisco Identity Services Engine (ISE)',
    category: 'traditional',
    pricing: {
      basePrice: 12.0, // $12/device/month = $144/device/year (includes base + plus licenses)
      hardwareRequired: true,
      hardwareCost: 75000, // Average appliance cost for medium deployment
      servicesMultiplier: 0.30, // 30% of software cost for professional services
      trainingCost: 15000, // Training costs
      maintenanceMultiplier: 0.22, // 22% annual maintenance
      operationalEfficiency: -0.10 // 10% increase in operational costs due to complexity
    },
    implementation: {
      timelineDays: 180, // 6 months typical deployment
      complexity: 'High' as const,
      resourcesRequired: 2.5, // 2.5 FTE for deployment
      ongoingResources: 1.5 // 1.5 FTE for ongoing management
    },
    risks: {
      securityScore: 75, // Good security but with CVEs
      operationalScore: 65, // Complex operations
      financialScore: 60 // Complex licensing, potential cost overruns
    },
    benefits: {
      productivityPerDevice: 15, // $15/device/year productivity gain
      riskMitigationTotal: 25000, // $25K total risk mitigation
      complianceTotal: 12000 // $12K compliance benefits
    }
  },
  aruba: {
    name: 'Aruba ClearPass',
    category: 'traditional',
    pricing: {
      basePrice: 8.5, // $8.50/device/month = $102/device/year
      hardwareRequired: true,
      hardwareCost: 45000, // Average appliance cost
      servicesMultiplier: 0.25, // 25% of software cost for professional services
      trainingCost: 8000, // Training costs
      maintenanceMultiplier: 0.18, // 18% annual maintenance
      operationalEfficiency: -0.05 // 5% increase in operational costs
    },
    implementation: {
      timelineDays: 120, // 4 months typical deployment
      complexity: 'Medium' as const,
      resourcesRequired: 1.5, // 1.5 FTE for deployment
      ongoingResources: 1.0 // 1.0 FTE for ongoing management
    },
    risks: {
      securityScore: 80, // Good security
      operationalScore: 75, // Moderate operational complexity
      financialScore: 70 // Reasonable cost predictability
    },
    benefits: {
      productivityPerDevice: 18, // $18/device/year productivity gain
      riskMitigationTotal: 20000, // $20K total risk mitigation
      complianceTotal: 10000 // $10K compliance benefits
    }
  },
  forescout: {
    name: 'Forescout Platform',
    category: 'traditional',
    pricing: {
      basePrice: 3.5, // $3.50/device/month = $42/device/year (eyeSight tier)
      hardwareRequired: true,
      hardwareCost: 55000, // Average appliance cost
      servicesMultiplier: 0.35, // 35% of total for professional services
      trainingCost: 12000, // Training costs
      maintenanceMultiplier: 0.20, // 20% annual maintenance
      operationalEfficiency: -0.08 // 8% increase in operational costs
    },
    implementation: {
      timelineDays: 150, // 5 months typical deployment
      complexity: 'High' as const,
      resourcesRequired: 2.0, // 2.0 FTE for deployment
      ongoingResources: 1.2 // 1.2 FTE for ongoing management
    },
    risks: {
      securityScore: 85, // Strong security focus
      operationalScore: 70, // Moderate operational complexity
      financialScore: 65 // Moderate cost predictability
    },
    benefits: {
      productivityPerDevice: 20, // $20/device/year productivity gain
      riskMitigationTotal: 22000, // $22K total risk mitigation
      complianceTotal: 11000 // $11K compliance benefits
    }
  },
  extreme: {
    name: 'Extreme Networks NAC',
    category: 'traditional',
    pricing: {
      basePrice: 10.0, // $10/device/month = $120/device/year
      hardwareRequired: true,
      hardwareCost: 35000, // Controller cost
      servicesMultiplier: 0.20, // 20% of software cost for services
      trainingCost: 6000, // Training costs
      maintenanceMultiplier: 0.15, // 15% annual maintenance
      operationalEfficiency: -0.03 // 3% increase in operational costs
    },
    implementation: {
      timelineDays: 90, // 3 months typical deployment
      complexity: 'Medium' as const,
      resourcesRequired: 1.0, // 1.0 FTE for deployment
      ongoingResources: 0.8 // 0.8 FTE for ongoing management
    },
    risks: {
      securityScore: 78, // Good security
      operationalScore: 80, // Simpler operations
      financialScore: 75 // Good cost predictability
    },
    benefits: {
      productivityPerDevice: 16, // $16/device/year productivity gain
      riskMitigationTotal: 18000, // $18K total risk mitigation
      complianceTotal: 9000 // $9K compliance benefits
    }
  },
  fortinet: {
    name: 'Fortinet FortiNAC',
    category: 'traditional',
    pricing: {
      basePrice: 7.0, // $7/device/month = $84/device/year
      hardwareRequired: true,
      hardwareCost: 40000, // Appliance cost
      servicesMultiplier: 0.25, // 25% of software cost for services
      trainingCost: 10000, // Training costs
      maintenanceMultiplier: 0.20, // 20% annual maintenance
      operationalEfficiency: -0.06 // 6% increase in operational costs
    },
    implementation: {
      timelineDays: 120, // 4 months typical deployment
      complexity: 'Medium' as const,
      resourcesRequired: 1.5, // 1.5 FTE for deployment
      ongoingResources: 1.0 // 1.0 FTE for ongoing management
    },
    risks: {
      securityScore: 82, // Good security with Fortinet integration
      operationalScore: 75, // Moderate operational complexity
      financialScore: 70 // Reasonable cost predictability
    },
    benefits: {
      productivityPerDevice: 17, // $17/device/year productivity gain
      riskMitigationTotal: 19000, // $19K total risk mitigation
      complianceTotal: 9500 // $9.5K compliance benefits
    }
  },
  juniper: {
    name: 'Juniper Mist Access Assurance',
    category: 'cloud-native',
    pricing: {
      basePrice: 6.0, // $6/device/month = $72/device/year
      hardwareRequired: false, // Cloud-native but requires Mist infrastructure
      hardwareCost: 25000, // Mist infrastructure investment
      servicesMultiplier: 0.15, // 15% of software cost for services
      trainingCost: 4000, // Training costs
      maintenanceMultiplier: 0.0, // Included in SaaS
      operationalEfficiency: 0.08 // 8% reduction in operational costs
    },
    implementation: {
      timelineDays: 30, // 1 month typical deployment
      complexity: 'Low' as const,
      resourcesRequired: 0.5, // 0.5 FTE for deployment
      ongoingResources: 0.3 // 0.3 FTE for ongoing management
    },
    risks: {
      securityScore: 88, // Good cloud-native security
      operationalScore: 85, // AI-driven operations
      financialScore: 80 // Predictable SaaS pricing
    },
    benefits: {
      productivityPerDevice: 22, // $22/device/year productivity gain
      riskMitigationTotal: 16000, // $16K total risk mitigation
      complianceTotal: 8500 // $8.5K compliance benefits
    }
  },
  arista: {
    name: 'Arista CloudVision AGNI',
    category: 'cloud-native',
    pricing: {
      basePrice: 8.0, // $8/device/month = $96/device/year
      hardwareRequired: false, // Cloud-native but requires Arista switches
      hardwareCost: 30000, // Arista infrastructure investment
      servicesMultiplier: 0.20, // 20% of software cost for services
      trainingCost: 8000, // Training costs
      maintenanceMultiplier: 0.0, // Included in SaaS
      operationalEfficiency: 0.05 // 5% reduction in operational costs
    },
    implementation: {
      timelineDays: 45, // 1.5 months typical deployment
      complexity: 'Medium' as const,
      resourcesRequired: 0.8, // 0.8 FTE for deployment
      ongoingResources: 0.5 // 0.5 FTE for ongoing management
    },
    risks: {
      securityScore: 85, // Good security
      operationalScore: 82, // Good operations with CloudVision
      financialScore: 78 // Good cost predictability
    },
    benefits: {
      productivityPerDevice: 19, // $19/device/year productivity gain
      riskMitigationTotal: 17000, // $17K total risk mitigation
      complianceTotal: 9000 // $9K compliance benefits
    }
  },
  microsoft: {
    name: 'Microsoft Network Policy Server (NPS)',
    category: 'basic',
    pricing: {
      basePrice: 0.0, // Free with Windows Server
      hardwareRequired: true,
      hardwareCost: 15000, // Windows Server infrastructure
      servicesMultiplier: 0.15, // 15% for basic setup services
      trainingCost: 3000, // Basic training
      maintenanceMultiplier: 0.10, // 10% for Windows Server maintenance
      operationalEfficiency: -0.15 // 15% increase due to manual processes
    },
    implementation: {
      timelineDays: 30, // 1 month for basic setup
      complexity: 'Medium' as const,
      resourcesRequired: 1.0, // 1.0 FTE for deployment
      ongoingResources: 1.5 // 1.5 FTE for ongoing management (manual processes)
    },
    risks: {
      securityScore: 60, // Basic security capabilities
      operationalScore: 50, // Manual processes, limited automation
      financialScore: 85 // Predictable Windows licensing
    },
    benefits: {
      productivityPerDevice: 5, // $5/device/year productivity gain (limited)
      riskMitigationTotal: 8000, // $8K total risk mitigation
      complianceTotal: 4000 // $4K compliance benefits
    }
  },
  foxpass: {
    name: 'FoxPass',
    category: 'cloud-radius',
    pricing: {
      basePrice: 1.5, // $1.50/user/month = $18/user/year
      hardwareRequired: false,
      hardwareCost: 0,
      servicesMultiplier: 0.05, // 5% for minimal setup services
      trainingCost: 1000, // Minimal training
      maintenanceMultiplier: 0.0, // Included in SaaS
      operationalEfficiency: 0.05 // 5% reduction in operational costs
    },
    implementation: {
      timelineDays: 7, // 1 week deployment
      complexity: 'Low' as const,
      resourcesRequired: 0.1, // 0.1 FTE for deployment
      ongoingResources: 0.1 // 0.1 FTE for ongoing management
    },
    risks: {
      securityScore: 70, // Basic cloud security
      operationalScore: 85, // Simple operations
      financialScore: 90 // Very predictable pricing
    },
    benefits: {
      productivityPerDevice: 8, // $8/device/year productivity gain (limited NAC)
      riskMitigationTotal: 5000, // $5K total risk mitigation
      complianceTotal: 3000 // $3K compliance benefits
    }
  },
  securew2: {
    name: 'SecureW2',
    category: 'cloud-radius',
    pricing: {
      basePrice: 2.5, // $2.50/user/month = $30/user/year
      hardwareRequired: false,
      hardwareCost: 0,
      servicesMultiplier: 0.10, // 10% for setup services
      trainingCost: 2000, // Training costs
      maintenanceMultiplier: 0.0, // Included in SaaS
      operationalEfficiency: 0.03 // 3% reduction in operational costs
    },
    implementation: {
      timelineDays: 14, // 2 weeks deployment
      complexity: 'Low' as const,
      resourcesRequired: 0.2, // 0.2 FTE for deployment
      ongoingResources: 0.15 // 0.15 FTE for ongoing management
    },
    risks: {
      securityScore: 75, // Good certificate-based security
      operationalScore: 80, // Simple operations
      financialScore: 85 // Predictable pricing
    },
    benefits: {
      productivityPerDevice: 10, // $10/device/year productivity gain
      riskMitigationTotal: 6000, // $6K total risk mitigation
      complianceTotal: 4000 // $4K compliance benefits
    }
  },
  packetfence: {
    name: 'PacketFence',
    category: 'open-source',
    pricing: {
      basePrice: 0.0, // Open source
      hardwareRequired: true,
      hardwareCost: 20000, // Server infrastructure
      servicesMultiplier: 0.50, // 50% for extensive professional services
      trainingCost: 15000, // Significant training required
      maintenanceMultiplier: 0.25, // 25% for support contracts
      operationalEfficiency: -0.20 // 20% increase due to complexity
    },
    implementation: {
      timelineDays: 180, // 6 months for proper deployment
      complexity: 'High' as const,
      resourcesRequired: 3.0, // 3.0 FTE for deployment
      ongoingResources: 2.0 // 2.0 FTE for ongoing management
    },
    risks: {
      securityScore: 70, // Good security but requires expertise
      operationalScore: 45, // High operational complexity
      financialScore: 60 // Unpredictable total costs
    },
    benefits: {
      productivityPerDevice: 12, // $12/device/year productivity gain
      riskMitigationTotal: 15000, // $15K total risk mitigation
      complianceTotal: 8000 // $8K compliance benefits
    }
  },
  meraki: {
    name: 'Cisco Meraki',
    category: 'cloud-managed',
    pricing: {
      basePrice: 15.0, // $15/device/month = $180/device/year (includes hardware amortization)
      hardwareRequired: true,
      hardwareCost: 50000, // Meraki infrastructure investment
      servicesMultiplier: 0.15, // 15% for setup services
      trainingCost: 5000, // Training costs
      maintenanceMultiplier: 0.0, // Included in subscription
      operationalEfficiency: 0.02 // 2% reduction in operational costs
    },
    implementation: {
      timelineDays: 60, // 2 months deployment
      complexity: 'Medium' as const,
      resourcesRequired: 1.0, // 1.0 FTE for deployment
      ongoingResources: 0.5 // 0.5 FTE for ongoing management
    },
    risks: {
      securityScore: 78, // Good security
      operationalScore: 85, // Simple cloud management
      financialScore: 75 // Subscription-based predictability
    },
    benefits: {
      productivityPerDevice: 14, // $14/device/year productivity gain
      riskMitigationTotal: 12000, // $12K total risk mitigation
      complianceTotal: 7000 // $7K compliance benefits
    }
  }
}

// Industry-specific multipliers (realistic adjustments)
const INDUSTRY_MULTIPLIERS = {
  healthcare: { cost: 1.15, risk: 1.3, compliance: 1.8 },
  financial: { cost: 1.20, risk: 1.4, compliance: 2.0 },
  government: { cost: 1.10, risk: 1.2, compliance: 2.2 },
  education: { cost: 0.85, risk: 0.9, compliance: 1.1 },
  manufacturing: { cost: 1.05, risk: 1.1, compliance: 1.3 },
  retail: { cost: 0.95, risk: 1.0, compliance: 1.2 },
  technology: { cost: 1.00, risk: 1.0, compliance: 1.0 },
  energy: { cost: 1.25, risk: 1.3, compliance: 1.9 }
}

// Organization size multipliers (realistic scaling)
const ORG_SIZE_MULTIPLIERS = {
  small: { cost: 1.15, complexity: 0.8, resources: 0.6 },
  medium: { cost: 1.00, complexity: 1.0, resources: 1.0 },
  large: { cost: 0.92, complexity: 1.1, resources: 1.3 },
  enterprise: { cost: 0.85, complexity: 1.2, resources: 1.6 }
}

// Regional multipliers (realistic labor and cost differences)
const REGIONAL_MULTIPLIERS = {
  'north-america': { cost: 1.00, labor: 1.00 },
  'europe': { cost: 1.08, labor: 1.15 },
  'asia-pacific': { cost: 0.85, labor: 0.75 },
  'latin-america': { cost: 0.75, labor: 0.65 },
  'middle-east': { cost: 1.12, labor: 0.85 }
}

// Financial calculator with accurate calculations
class FinancialCalculator {
  private static validateCashFlows(cashFlows: number[]): boolean {
    if (!Array.isArray(cashFlows) || cashFlows.length < 2) return false
    
    const validFlows = cashFlows.filter(flow => 
      typeof flow === 'number' && 
      isFinite(flow) && 
      Math.abs(flow) > 0.01
    )
    
    return validFlows.length >= 2
  }

  private static calculateNPV(cashFlows: number[], discountRate: number): number {
    try {
      if (!this.validateCashFlows(cashFlows)) return 0
      
      const rate = ValidationUtils.sanitizeNumber(discountRate, 0.01, 0.50, 0.10)
      
      return cashFlows.reduce((npv, cashFlow, index) => {
        const sanitizedCashFlow = ValidationUtils.sanitizeNumber(cashFlow, -1e10, 1e10, 0)
        const discountFactor = Math.pow(1 + rate, index)
        
        if (!isFinite(discountFactor) || discountFactor === 0) return npv
        
        const presentValue = sanitizedCashFlow / discountFactor
        return isFinite(presentValue) ? npv + presentValue : npv
      }, 0)
    } catch (error) {
      console.warn('NPV calculation error:', error)
      return 0
    }
  }

  private static calculateIRR(cashFlows: number[]): number {
    try {
      if (!this.validateCashFlows(cashFlows)) return 0
      
      // Use bisection method for stability
      let lowerBound = -0.99
      let upperBound = 5.0
      
      const lowerNPV = this.calculateNPV(cashFlows, lowerBound)
      const upperNPV = this.calculateNPV(cashFlows, upperBound)
      
      if (!isFinite(lowerNPV) || !isFinite(upperNPV)) return 0
      if (lowerNPV * upperNPV > 0) return 0 // No solution in range
      
      const maxIterations = 100
      const tolerance = 1e-6
      
      for (let i = 0; i < maxIterations; i++) {
        const midPoint = (lowerBound + upperBound) / 2
        const midNPV = this.calculateNPV(cashFlows, midPoint)
        
        if (!isFinite(midNPV)) break
        if (Math.abs(midNPV) < tolerance) return midPoint
        
        if (lowerNPV * midNPV < 0) {
          upperBound = midPoint
        } else {
          lowerBound = midPoint
        }
        
        if (Math.abs(upperBound - lowerBound) < tolerance) {
          return (lowerBound + upperBound) / 2
        }
      }
      
      return 0
    } catch (error) {
      console.warn('IRR calculation error:', error)
      return 0
    }
  }

  static calculateFinancialMetrics(
    initialInvestment: number,
    annualCashFlows: number[],
    discountRate: number = 0.10
  ): FinancialMetrics {
    try {
      const sanitizedInvestment = ValidationUtils.sanitizeNumber(initialInvestment, 0, 1e10, 0)
      const sanitizedCashFlows = Array.isArray(annualCashFlows) 
        ? annualCashFlows.map(flow => ValidationUtils.sanitizeNumber(flow, -1e10, 1e10, 0))
        : []
      const sanitizedDiscountRate = ValidationUtils.sanitizeNumber(discountRate, 0.01, 0.50, 0.10)

      if (sanitizedInvestment === 0 || sanitizedCashFlows.length === 0) {
        return {
          npv: 0,
          irr: 0,
          roi: 0,
          paybackPeriod: 0,
          profitabilityIndex: 0
        }
      }

      // Create cash flow array (initial investment is negative)
      const cashFlows = [-sanitizedInvestment, ...sanitizedCashFlows]
      
      // Calculate NPV
      const npv = this.calculateNPV(cashFlows, sanitizedDiscountRate)
      
      // Calculate IRR
      const irr = this.calculateIRR(cashFlows)
      
      // Calculate ROI
      const totalCashFlows = sanitizedCashFlows.reduce((sum, flow) => sum + flow, 0)
      const roi = sanitizedInvestment > 0 ? ((totalCashFlows - sanitizedInvestment) / sanitizedInvestment) * 100 : 0
      
      // Calculate Payback Period
      const paybackPeriod = this.calculatePaybackPeriod(sanitizedInvestment, sanitizedCashFlows)
      
      // Calculate Profitability Index
      const presentValueOfCashFlows = this.calculateNPV([0, ...sanitizedCashFlows], sanitizedDiscountRate)
      const profitabilityIndex = sanitizedInvestment > 0 ? presentValueOfCashFlows / sanitizedInvestment : 0
      
      return {
        npv: ValidationUtils.sanitizeNumber(npv, -1e10, 1e10, 0),
        irr: ValidationUtils.sanitizeNumber(irr * 100, -1000, 1000, 0),
        roi: ValidationUtils.sanitizeNumber(roi, -1000, 1000, 0),
        paybackPeriod: ValidationUtils.sanitizeNumber(paybackPeriod, 0, 50, 0),
        profitabilityIndex: ValidationUtils.sanitizeNumber(profitabilityIndex, 0, 50, 0)
      }
    } catch (error) {
      console.warn('Financial metrics calculation error:', error)
      return {
        npv: 0,
        irr: 0,
        roi: 0,
        paybackPeriod: 0,
        profitabilityIndex: 0
      }
    }
  }

  private static calculatePaybackPeriod(initialInvestment: number, annualCashFlows: number[]): number {
    if (initialInvestment <= 0 || annualCashFlows.length === 0) return 0
    
    let cumulativeCashFlow = 0
    
    for (let i = 0; i < annualCashFlows.length; i++) {
      const cashFlow = ValidationUtils.sanitizeNumber(annualCashFlows[i], -1e10, 1e10, 0)
      cumulativeCashFlow += cashFlow
      
      if (cumulativeCashFlow >= initialInvestment) {
        const previousCumulative = cumulativeCashFlow - cashFlow
        const remainingAmount = initialInvestment - previousCumulative
        const fractionOfYear = cashFlow > 0 ? remainingAmount / cashFlow : 0
        
        return ValidationUtils.sanitizeNumber(i + fractionOfYear, 0, 50, 0)
      }
    }
    
    return annualCashFlows.length + 1
  }
}

function calculateVendorCosts(
  vendorId: string,
  config: CalculationConfiguration
): CalculationResult {
  try {
    const vendor = VENDOR_DATABASE[vendorId as keyof typeof VENDOR_DATABASE]
    if (!vendor) {
      console.warn(`Unknown vendor: ${vendorId}, using default values`)
      return createDefaultResult(vendorId)
    }

    // Get multipliers with fallbacks
    const industryMult = INDUSTRY_MULTIPLIERS[config.industry as keyof typeof INDUSTRY_MULTIPLIERS] || INDUSTRY_MULTIPLIERS.technology
    const orgSizeMult = ORG_SIZE_MULTIPLIERS[config.orgSize] || ORG_SIZE_MULTIPLIERS.medium
    const regionalMult = REGIONAL_MULTIPLIERS[config.region as keyof typeof REGIONAL_MULTIPLIERS] || REGIONAL_MULTIPLIERS['north-america']

    // Calculate realistic costs
    let licensingCost: number
    
    // Handle per-user pricing for cloud RADIUS solutions
    if (vendor.category === 'cloud-radius') {
      licensingCost = vendor.pricing.basePrice * config.users * 12 * config.years * industryMult.cost * regionalMult.cost
    } else {
      licensingCost = vendor.pricing.basePrice * config.devices * 12 * config.years * industryMult.cost * regionalMult.cost
    }
    
    const hardwareCost = vendor.pricing.hardwareCost * orgSizeMult.cost * regionalMult.cost
    
    const totalSoftwareHardware = licensingCost + hardwareCost
    const servicesCost = totalSoftwareHardware * vendor.pricing.servicesMultiplier
    
    const trainingCost = vendor.pricing.trainingCost * orgSizeMult.resources * regionalMult.labor
    
    const maintenanceCost = totalSoftwareHardware * vendor.pricing.maintenanceMultiplier * config.years
    
    // Calculate operational costs based on IT staff requirements
    const avgItSalary = 95000 * regionalMult.labor // Average IT salary
    const baseOperationalCost = avgItSalary * vendor.implementation.ongoingResources * config.years
    
    // Apply operational efficiency (positive = cost reduction, negative = cost increase)
    const operationalEfficiencyImpact = baseOperationalCost * vendor.pricing.operationalEfficiency
    const operationalCost = baseOperationalCost - operationalEfficiencyImpact

    const totalCost = licensingCost + hardwareCost + servicesCost + trainingCost + maintenanceCost + operationalCost

    // Calculate realistic benefits
    const productivityGains = vendor.benefits.productivityPerDevice * config.devices * config.years
    const riskReduction = vendor.benefits.riskMitigationTotal * industryMult.risk
    const complianceSavings = vendor.benefits.complianceTotal * industryMult.compliance

    // Calculate financial metrics
    const initialInvestment = licensingCost + hardwareCost + servicesCost + trainingCost
    const annualBenefit = (productivityGains + riskReduction + complianceSavings) / config.years
    const annualCost = (maintenanceCost + operationalCost) / config.years
    const annualCashFlows = Array(config.years).fill(Math.max(0, annualBenefit - annualCost))

    const financialMetrics = FinancialCalculator.calculateFinancialMetrics(
      initialInvestment,
      annualCashFlows,
      config.discountRate || 0.10
    )

    // Calculate risk scores (convert security scores to risk percentages)
    const securityRisk = Math.max(0, 100 - vendor.risks.securityScore)
    const operationalRisk = Math.max(0, 100 - vendor.risks.operationalScore)
    const financialRisk = Math.max(0, 100 - vendor.risks.financialScore)
    const overallRisk = (securityRisk + operationalRisk + financialRisk) / 3

    return {
      vendorId,
      vendorName: vendor.name,
      totalCost: ValidationUtils.sanitizeNumber(totalCost, 0, 1e10, 0),
      costBreakdown: {
        licensing: ValidationUtils.sanitizeNumber(licensingCost, 0, 1e10, 0),
        hardware: ValidationUtils.sanitizeNumber(hardwareCost, 0, 1e10, 0),
        services: ValidationUtils.sanitizeNumber(servicesCost, 0, 1e10, 0),
        training: ValidationUtils.sanitizeNumber(trainingCost, 0, 1e10, 0),
        maintenance: ValidationUtils.sanitizeNumber(maintenanceCost, 0, 1e10, 0),
        operational: ValidationUtils.sanitizeNumber(operationalCost, 0, 1e10, 0)
      },
      financialMetrics,
      riskAssessment: {
        overallRisk: ValidationUtils.sanitizeNumber(overallRisk, 0, 100, 50),
        securityRisk: ValidationUtils.sanitizeNumber(securityRisk, 0, 100, 50),
        operationalRisk: ValidationUtils.sanitizeNumber(operationalRisk, 0, 100, 50),
        financialRisk: ValidationUtils.sanitizeNumber(financialRisk, 0, 100, 50)
      },
      businessImpact: {
        productivityGains: ValidationUtils.sanitizeNumber(productivityGains, 0, 1e10, 0),
        riskReduction: ValidationUtils.sanitizeNumber(riskReduction, 0, 1e10, 0),
        complianceSavings: ValidationUtils.sanitizeNumber(complianceSavings, 0, 1e10, 0),
        totalBenefits: ValidationUtils.sanitizeNumber(productivityGains + riskReduction + complianceSavings, 0, 1e10, 0)
      },
      implementation: {
        timeline: `${vendor.implementation.timelineDays} days`,
        complexity: vendor.implementation.complexity,
        resources: ValidationUtils.sanitizeNumber(vendor.implementation.resourcesRequired * orgSizeMult.resources, 0, 50, 1)
      }
    }
  } catch (error) {
    console.error(`Error calculating costs for vendor ${vendorId}:`, error)
    return createDefaultResult(vendorId)
  }
}

function createDefaultResult(vendorId: string): CalculationResult {
  return {
    vendorId,
    vendorName: vendorId.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    totalCost: 0,
    costBreakdown: {
      licensing: 0,
      hardware: 0,
      services: 0,
      training: 0,
      maintenance: 0,
      operational: 0
    },
    financialMetrics: {
      npv: 0,
      irr: 0,
      roi: 0,
      paybackPeriod: 0,
      profitabilityIndex: 0
    },
    riskAssessment: {
      overallRisk: 50,
      securityRisk: 50,
      operationalRisk: 50,
      financialRisk: 50
    },
    businessImpact: {
      productivityGains: 0,
      riskReduction: 0,
      complianceSavings: 0,
      totalBenefits: 0
    },
    implementation: {
      timeline: 'Unknown',
      complexity: 'Medium',
      resources: 1
    }
  }
}

export function compareVendors(
  vendorIds: any,
  config: any
): CalculationResult[] {
  try {
    const validatedVendorIds = ValidationUtils.validateVendorIds(vendorIds)
    const sanitizedConfig = ValidationUtils.sanitizeConfiguration(config)
    
    const { isValid, errors } = ValidationUtils.validateConfiguration(sanitizedConfig)
    if (!isValid) {
      console.warn('Configuration validation failed:', errors)
      return []
    }

    if (validatedVendorIds.length === 0) {
      console.warn('No valid vendor IDs provided')
      return []
    }

    return validatedVendorIds
      .map(vendorId => {
        try {
          return calculateVendorCosts(vendorId, sanitizedConfig)
        } catch (error) {
          console.warn(`Error calculating costs for vendor ${vendorId}:`, error)
          return createDefaultResult(vendorId)
        }
      })
      .filter(result => result !== null)
  } catch (error) {
    console.error('Error in compareVendors:', error)
    return []
  }
}

export function getVendorList(): Array<{ id: string; name: string; category: string }> {
  return Object.entries(VENDOR_DATABASE).map(([id, vendor]) => ({
    id,
    name: vendor.name,
    category: vendor.category
  }))
}

export function getIndustryList(): Array<{ value: string; label: string }> {
  return [
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'financial', label: 'Financial Services' },
    { value: 'government', label: 'Government' },
    { value: 'education', label: 'Education' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail' },
    { value: 'technology', label: 'Technology' },
    { value: 'energy', label: 'Energy & Utilities' }
  ]
}

export { ValidationUtils }
