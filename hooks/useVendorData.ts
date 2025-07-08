"use client"

import { useState, useEffect } from "react"

export interface VendorData {
  id: string
  name: string
  category: "cloud-native" | "traditional" | "hybrid"
  marketShare: number
  pricing: {
    model: "per-device" | "per-user" | "tiered" | "quote-based"
    basePrice: number
    maxPrice: number
    currency: "USD"
  }
  deployment: {
    timeToValue: number // days
    complexity: "low" | "medium" | "high"
    requiresHardware: boolean
    cloudNative: boolean
  }
  features: {
    zeroTrust: number // 0-100
    automation: number
    scalability: number
    integration: number
    usability: number
  }
  support: {
    availability: string
    responseTime: number // hours
    satisfaction: number // 0-100
  }
  security: {
    cveCount: number
    lastCriticalCve: string | null
    securityScore: number // 0-100
  }
  compliance: {
    standards: string[]
    certifications: string[]
    coverage: number // 0-100
  }
}

const VENDOR_DATA: VendorData[] = [
  {
    id: "portnox-clear",
    name: "Portnox CLEAR",
    category: "cloud-native",
    marketShare: 8.5,
    pricing: {
      model: "per-device",
      basePrice: 36,
      maxPrice: 60,
      currency: "USD",
    },
    deployment: {
      timeToValue: 1,
      complexity: "low",
      requiresHardware: false,
      cloudNative: true,
    },
    features: {
      zeroTrust: 95,
      automation: 92,
      scalability: 98,
      integration: 90,
      usability: 95,
    },
    support: {
      availability: "24/7",
      responseTime: 2,
      satisfaction: 94,
    },
    security: {
      cveCount: 0,
      lastCriticalCve: null,
      securityScore: 98,
    },
    compliance: {
      standards: ["PCI DSS", "HIPAA", "SOX", "GDPR", "ISO 27001"],
      certifications: ["SOC 2 Type II", "FedRAMP Ready"],
      coverage: 95,
    },
  },
  {
    id: "cisco-ise",
    name: "Cisco Identity Services Engine",
    category: "traditional",
    marketShare: 25.3,
    pricing: {
      model: "tiered",
      basePrice: 100,
      maxPrice: 200,
      currency: "USD",
    },
    deployment: {
      timeToValue: 180,
      complexity: "high",
      requiresHardware: true,
      cloudNative: false,
    },
    features: {
      zeroTrust: 75,
      automation: 65,
      scalability: 80,
      integration: 85,
      usability: 60,
    },
    support: {
      availability: "Business Hours",
      responseTime: 24,
      satisfaction: 72,
    },
    security: {
      cveCount: 47,
      lastCriticalCve: "2024-01-15",
      securityScore: 65,
    },
    compliance: {
      standards: ["PCI DSS", "HIPAA", "SOX"],
      certifications: ["Common Criteria", "FIPS 140-2"],
      coverage: 78,
    },
  },
  {
    id: "aruba-clearpass",
    name: "Aruba ClearPass",
    category: "traditional",
    marketShare: 18.7,
    pricing: {
      model: "per-device",
      basePrice: 80,
      maxPrice: 125,
      currency: "USD",
    },
    deployment: {
      timeToValue: 90,
      complexity: "medium",
      requiresHardware: true,
      cloudNative: false,
    },
    features: {
      zeroTrust: 78,
      automation: 70,
      scalability: 82,
      integration: 80,
      usability: 75,
    },
    support: {
      availability: "24/7",
      responseTime: 8,
      satisfaction: 88,
    },
    security: {
      cveCount: 12,
      lastCriticalCve: "2023-11-20",
      securityScore: 78,
    },
    compliance: {
      standards: ["PCI DSS", "HIPAA", "SOX", "GDPR"],
      certifications: ["SOC 2 Type II", "ISO 27001"],
      coverage: 82,
    },
  },
  {
    id: "forescout",
    name: "Forescout Platform",
    category: "hybrid",
    marketShare: 12.1,
    pricing: {
      model: "per-device",
      basePrice: 35,
      maxPrice: 50,
      currency: "USD",
    },
    deployment: {
      timeToValue: 60,
      complexity: "medium",
      requiresHardware: true,
      cloudNative: false,
    },
    features: {
      zeroTrust: 82,
      automation: 85,
      scalability: 85,
      integration: 88,
      usability: 70,
    },
    support: {
      availability: "24/7",
      responseTime: 6,
      satisfaction: 85,
    },
    security: {
      cveCount: 8,
      lastCriticalCve: "2023-09-12",
      securityScore: 82,
    },
    compliance: {
      standards: ["PCI DSS", "HIPAA", "SOX", "GDPR", "ISO 27001"],
      certifications: ["SOC 2 Type II", "Common Criteria"],
      coverage: 85,
    },
  },
]

export function useVendorData() {
  const [vendorData, setVendorData] = useState<VendorData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setVendorData(VENDOR_DATA)
      setLoading(false)
    }, 400)
  }, [])

  const getVendorById = (id: string): VendorData | undefined => {
    return VENDOR_DATA.find((vendor) => vendor.id === id)
  }

  const compareVendors = (vendorIds: string[]) => {
    const vendors = vendorIds.map((id) => getVendorById(id)).filter(Boolean) as VendorData[]

    return {
      pricing: vendors.map((v) => ({
        name: v.name,
        basePrice: v.pricing.basePrice,
        maxPrice: v.pricing.maxPrice,
      })),
      features: vendors.map((v) => ({
        name: v.name,
        ...v.features,
      })),
      deployment: vendors.map((v) => ({
        name: v.name,
        timeToValue: v.deployment.timeToValue,
        complexity: v.deployment.complexity,
        requiresHardware: v.deployment.requiresHardware,
      })),
      security: vendors.map((v) => ({
        name: v.name,
        cveCount: v.security.cveCount,
        securityScore: v.security.securityScore,
      })),
    }
  }

  const getMarketLeaders = () => {
    return VENDOR_DATA.sort((a, b) => b.marketShare - a.marketShare).slice(0, 5)
  }

  const getCloudNativeVendors = () => {
    return VENDOR_DATA.filter((vendor) => vendor.category === "cloud-native")
  }

  return {
    vendorData,
    loading,
    getVendorById,
    compareVendors,
    getMarketLeaders,
    getCloudNativeVendors,
  }
}
