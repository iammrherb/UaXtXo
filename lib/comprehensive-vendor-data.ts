export interface VendorData {
  name: string
  category: string
  description: string
  riskScore: number
  complexity: "low" | "medium" | "high"
  scalability: "low" | "medium" | "high"
  customerSatisfaction: number
  complianceScore: number
  pricing: {
    model: "per_device" | "per_user" | "flat_rate"
    basePrice: number
    tiers?: Array<{
      min: number
      max: number
      price: number
    }>
  }
  implementationCost?: number
  trainingCost?: number
  supportCost?: number
  maintenanceCost?: number
  features: {
    [key: string]: boolean | string | number
  }
}

export const vendorDatabase: Record<string, VendorData> = {
  portnox: {
    name: "Portnox",
    category: "Cloud NAC",
    description: "Cloud-native Network Access Control with zero-trust security",
    riskScore: 2,
    complexity: "low",
    scalability: "high",
    customerSatisfaction: 4.8,
    complianceScore: 95,
    pricing: {
      model: "per_device",
      basePrice: 8,
      tiers: [
        { min: 1, max: 100, price: 12 },
        { min: 101, max: 500, price: 8 },
        { min: 501, max: 1000, price: 6 },
        { min: 1001, max: 5000, price: 4 },
        { min: 5001, max: 999999, price: 3 },
      ],
    },
    implementationCost: 15000,
    trainingCost: 5000,
    supportCost: 12000,
    maintenanceCost: 8000,
    features: {
      cloudNative: true,
      zeroTrust: true,
      deviceVisibility: true,
      policyEnforcement: true,
      guestAccess: true,
      byod: true,
      iot: true,
      compliance: true,
      integration: true,
      automation: true,
    },
  },
  cisco: {
    name: "Cisco ISE",
    category: "Enterprise NAC",
    description: "Identity Services Engine for comprehensive network access control",
    riskScore: 4,
    complexity: "high",
    scalability: "high",
    customerSatisfaction: 4.2,
    complianceScore: 90,
    pricing: {
      model: "per_device",
      basePrice: 25,
      tiers: [
        { min: 1, max: 100, price: 35 },
        { min: 101, max: 500, price: 25 },
        { min: 501, max: 1000, price: 20 },
        { min: 1001, max: 5000, price: 15 },
        { min: 5001, max: 999999, price: 12 },
      ],
    },
    implementationCost: 75000,
    trainingCost: 25000,
    supportCost: 35000,
    maintenanceCost: 45000,
    features: {
      cloudNative: false,
      zeroTrust: true,
      deviceVisibility: true,
      policyEnforcement: true,
      guestAccess: true,
      byod: true,
      iot: true,
      compliance: true,
      integration: true,
      automation: false,
    },
  },
  aruba: {
    name: "Aruba ClearPass",
    category: "Enterprise NAC",
    description: "Policy management platform for secure network access",
    riskScore: 3,
    complexity: "high",
    scalability: "high",
    customerSatisfaction: 4.1,
    complianceScore: 88,
    pricing: {
      model: "per_device",
      basePrice: 22,
      tiers: [
        { min: 1, max: 100, price: 30 },
        { min: 101, max: 500, price: 22 },
        { min: 501, max: 1000, price: 18 },
        { min: 1001, max: 5000, price: 14 },
        { min: 5001, max: 999999, price: 11 },
      ],
    },
    implementationCost: 65000,
    trainingCost: 20000,
    supportCost: 30000,
    maintenanceCost: 40000,
    features: {
      cloudNative: false,
      zeroTrust: true,
      deviceVisibility: true,
      policyEnforcement: true,
      guestAccess: true,
      byod: true,
      iot: true,
      compliance: true,
      integration: true,
      automation: false,
    },
  },
  fortinet: {
    name: "Fortinet FortiNAC",
    category: "Enterprise NAC",
    description: "Network Access Control with integrated security fabric",
    riskScore: 3,
    complexity: "medium",
    scalability: "high",
    customerSatisfaction: 4.0,
    complianceScore: 85,
    pricing: {
      model: "per_device",
      basePrice: 18,
      tiers: [
        { min: 1, max: 100, price: 25 },
        { min: 101, max: 500, price: 18 },
        { min: 501, max: 1000, price: 15 },
        { min: 1001, max: 5000, price: 12 },
        { min: 5001, max: 999999, price: 10 },
      ],
    },
    implementationCost: 50000,
    trainingCost: 15000,
    supportCost: 25000,
    maintenanceCost: 35000,
    features: {
      cloudNative: false,
      zeroTrust: true,
      deviceVisibility: true,
      policyEnforcement: true,
      guestAccess: true,
      byod: true,
      iot: true,
      compliance: true,
      integration: true,
      automation: false,
    },
  },
  microsoft: {
    name: "Microsoft Intune",
    category: "Cloud MDM/NAC",
    description: "Cloud-based mobile device management and application management",
    riskScore: 2,
    complexity: "medium",
    scalability: "high",
    customerSatisfaction: 4.3,
    complianceScore: 92,
    pricing: {
      model: "per_user",
      basePrice: 6,
      tiers: [
        { min: 1, max: 100, price: 8 },
        { min: 101, max: 500, price: 6 },
        { min: 501, max: 1000, price: 5 },
        { min: 1001, max: 5000, price: 4 },
        { min: 5001, max: 999999, price: 3 },
      ],
    },
    implementationCost: 25000,
    trainingCost: 10000,
    supportCost: 15000,
    maintenanceCost: 20000,
    features: {
      cloudNative: true,
      zeroTrust: true,
      deviceVisibility: true,
      policyEnforcement: true,
      guestAccess: false,
      byod: true,
      iot: false,
      compliance: true,
      integration: true,
      automation: true,
    },
  },
  securew2: {
    name: "SecureW2",
    category: "Cloud RADIUS",
    description: "Cloud-based RADIUS and certificate management platform",
    riskScore: 2,
    complexity: "low",
    scalability: "high",
    customerSatisfaction: 4.5,
    complianceScore: 88,
    pricing: {
      model: "per_device",
      basePrice: 4,
      tiers: [
        { min: 1, max: 100, price: 6 },
        { min: 101, max: 500, price: 4 },
        { min: 501, max: 1000, price: 3 },
        { min: 1001, max: 5000, price: 2.5 },
        { min: 5001, max: 999999, price: 2 },
      ],
    },
    implementationCost: 10000,
    trainingCost: 3000,
    supportCost: 8000,
    maintenanceCost: 5000,
    features: {
      cloudNative: true,
      zeroTrust: false,
      deviceVisibility: false,
      policyEnforcement: true,
      guestAccess: true,
      byod: true,
      iot: false,
      compliance: true,
      integration: true,
      automation: true,
    },
  },
  foxpass: {
    name: "Foxpass",
    category: "Cloud RADIUS",
    description: "Cloud directory and RADIUS service for device authentication",
    riskScore: 3,
    complexity: "low",
    scalability: "medium",
    customerSatisfaction: 4.2,
    complianceScore: 82,
    pricing: {
      model: "per_user",
      basePrice: 3,
      tiers: [
        { min: 1, max: 100, price: 5 },
        { min: 101, max: 500, price: 3 },
        { min: 501, max: 1000, price: 2.5 },
        { min: 1001, max: 5000, price: 2 },
        { min: 5001, max: 999999, price: 1.5 },
      ],
    },
    implementationCost: 8000,
    trainingCost: 2000,
    supportCost: 6000,
    maintenanceCost: 4000,
    features: {
      cloudNative: true,
      zeroTrust: false,
      deviceVisibility: false,
      policyEnforcement: false,
      guestAccess: true,
      byod: true,
      iot: false,
      compliance: false,
      integration: true,
      automation: false,
    },
  },
  pulse: {
    name: "Pulse Secure",
    category: "VPN/NAC",
    description: "Secure access solution with VPN and NAC capabilities",
    riskScore: 4,
    complexity: "medium",
    scalability: "medium",
    customerSatisfaction: 3.8,
    complianceScore: 80,
    pricing: {
      model: "per_user",
      basePrice: 15,
      tiers: [
        { min: 1, max: 100, price: 20 },
        { min: 101, max: 500, price: 15 },
        { min: 501, max: 1000, price: 12 },
        { min: 1001, max: 5000, price: 10 },
        { min: 5001, max: 999999, price: 8 },
      ],
    },
    implementationCost: 40000,
    trainingCost: 12000,
    supportCost: 20000,
    maintenanceCost: 25000,
    features: {
      cloudNative: false,
      zeroTrust: true,
      deviceVisibility: true,
      policyEnforcement: true,
      guestAccess: true,
      byod: true,
      iot: false,
      compliance: true,
      integration: false,
      automation: false,
    },
  },
  "no-nac": {
    name: "No NAC Solution",
    category: "Alternative",
    description: "Operating without a dedicated Network Access Control solution",
    riskScore: 9,
    complexity: "low",
    scalability: "low",
    customerSatisfaction: 2.0,
    complianceScore: 30,
    pricing: {
      model: "flat_rate",
      basePrice: 0,
    },
    implementationCost: 0,
    trainingCost: 0,
    supportCost: 0,
    maintenanceCost: 0,
    features: {
      cloudNative: false,
      zeroTrust: false,
      deviceVisibility: false,
      policyEnforcement: false,
      guestAccess: false,
      byod: false,
      iot: false,
      compliance: false,
      integration: false,
      automation: false,
    },
  },
}

export function getVendorLogoPath(vendorId: string): string | null {
  const logoMap: Record<string, string> = {
    portnox: "/portnox-logo.png",
    cisco: "/cisco-logo.png",
    aruba: "/aruba-logo.png",
    fortinet: "/fortinet-logo.png",
    microsoft: "/microsoft-logo.png",
    securew2: "/securew2-logo.png",
    foxpass: "/foxpass-logo.png",
    pulse: "/pulse-logo.png",
    "no-nac": "/no-nac-logo.png",
  }

  return logoMap[vendorId] || null
}

export function getVendorsByCategory(category: string): string[] {
  return Object.entries(vendorDatabase)
    .filter(([_, vendor]) => vendor.category.toLowerCase().includes(category.toLowerCase()))
    .map(([id]) => id)
}
