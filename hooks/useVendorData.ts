"use client"

import { useCallback } from "react"
import { useQuery } from "@tanstack/react-query"

export type VendorId =
  | "portnox"
  | "cisco_ise"
  | "aruba_clearpass"
  | "fortinac"
  | "forescout"
  | "juniper_mist"
  | "extreme_nac"
  | "cisco_meraki"
  | "microsoft_nps"
  | "packetfence"
  | "foxpass"
  | "securew2"
  | "arista_agni"

export interface VendorData {
  id: VendorId
  name: string
  vendorType: string
  logoUrl?: string
  shortDescription?: string
  description: string
  marketShare?: number
  customerSatisfaction?: number
  deploymentComplexity: "low" | "medium" | "high" | "very_high"
  avgDeploymentDays: number
  pricingModel: string
  basePrice: number
  tcoFactors: {
    software: number
    hardware: number
    implementation: number
    operational: number
    support: number
    hidden: number
  }
  strengths: string[]
  weaknesses: string[]
  securityScore: number
  complianceScore: number
  usabilityScore: number
  supportScore: number
}

const vendorDataList: VendorData[] = [
  {
    id: "portnox",
    name: "Portnox CLEAR",
    vendorType: "Cloud-Native Zero Trust NAC",
    logoUrl: "/portnox-logo-color.png",
    shortDescription: "AI-powered, cloud-native Zero Trust Network Access Control",
    description:
      "AI-powered, cloud-native Zero Trust Network Access Control with risk-based authentication and continuous compliance monitoring",
    marketShare: 5.2,
    customerSatisfaction: 94,
    deploymentComplexity: "low",
    avgDeploymentDays: 7,
    pricingModel: "Per device/month",
    basePrice: 4.0,
    tcoFactors: {
      software: 45000,
      hardware: 0,
      implementation: 5000,
      operational: 15000,
      support: 6750,
      hidden: 2250,
    },
    strengths: [
      "Zero infrastructure requirements",
      "30-minute deployment",
      "95% Zero Trust maturity score",
      "98% automated remediation rate",
      "67% lower TCO than traditional NAC",
      "No CVEs - secure by design",
    ],
    weaknesses: ["Newer market presence", "May require change management"],
    securityScore: 95,
    complianceScore: 95,
    usabilityScore: 92,
    supportScore: 91,
  },
  {
    id: "cisco_ise",
    name: "Cisco Identity Services Engine",
    vendorType: "Traditional Enterprise NAC",
    logoUrl: "/cisco-logo.png",
    shortDescription: "Enterprise-grade identity services engine",
    description:
      "Enterprise-grade identity services engine with comprehensive policy management and network access control",
    marketShare: 25.3,
    customerSatisfaction: 78,
    deploymentComplexity: "very_high",
    avgDeploymentDays: 120,
    pricingModel: "Per user/month",
    basePrice: 10.0,
    tcoFactors: {
      software: 125000,
      hardware: 85000,
      implementation: 50000,
      operational: 125000,
      support: 27500,
      hidden: 43750,
    },
    strengths: [
      "Market leader with 25.3% share",
      "Comprehensive feature set",
      "Strong Cisco ecosystem integration",
      "Mature product with extensive documentation",
    ],
    weaknesses: [
      "Complex deployment (6-9 months)",
      "High total cost of ownership",
      "Requires dedicated hardware",
      "47 CVEs in last 3 years",
      "Requires 2.5 FTE for management",
    ],
    securityScore: 85,
    complianceScore: 80,
    usabilityScore: 65,
    supportScore: 82,
  },
  {
    id: "aruba_clearpass",
    name: "Aruba ClearPass Policy Manager",
    vendorType: "Traditional Enterprise NAC",
    logoUrl: "/aruba-logo.png",
    shortDescription: "Comprehensive network access control with policy enforcement",
    description: "Comprehensive network access control with advanced policy enforcement and device management",
    marketShare: 18.7,
    customerSatisfaction: 88,
    deploymentComplexity: "high",
    avgDeploymentDays: 90,
    pricingModel: "Per device/month",
    basePrice: 7.5,
    tcoFactors: {
      software: 85000,
      hardware: 55000,
      implementation: 25500,
      operational: 75000,
      support: 17000,
      hidden: 17000,
    },
    strengths: [
      "Best value traditional NAC",
      "88% customer satisfaction",
      "Strong policy management",
      "Good Aruba integration",
    ],
    weaknesses: [
      "3-6 month deployment",
      "Requires hardware appliances",
      "Complex policy configuration",
      "Limited cloud-native features",
    ],
    securityScore: 82,
    complianceScore: 82,
    usabilityScore: 72,
    supportScore: 78,
  },
]

const getVendorById = (id: VendorId): VendorData | undefined => {
  return vendorDataList.find((vendor) => vendor.id === id)
}

// Simulate async data fetching
const fetchAllVendors = async (): Promise<VendorData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return vendorDataList
}

const fetchVendorById = async (id: VendorId): Promise<VendorData | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return getVendorById(id)
}

export function useVendorData() {
  const {
    data: allVendors,
    isLoading: isLoadingAllVendors,
    error: errorAllVendors,
  } = useQuery<VendorData[], Error>({
    queryKey: ["allVendors"],
    queryFn: fetchAllVendors,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const getVendorById = useCallback(
    (id: VendorId): VendorData | undefined => {
      return allVendors?.find((vendor) => vendor.id === id)
    },
    [allVendors],
  )

  const getVendorsByType = useCallback(
    (type: string): VendorData[] => {
      if (!allVendors) return []
      return allVendors.filter((vendor) => vendor.vendorType === type)
    },
    [allVendors],
  )

  const useSingleVendor = (id: VendorId | null) => {
    return useQuery<VendorData | undefined, Error>({
      queryKey: ["vendor", id],
      queryFn: () => (id ? fetchVendorById(id) : Promise.resolve(undefined)),
      enabled: !!id,
      staleTime: Number.POSITIVE_INFINITY,
    })
  }

  return {
    allVendors,
    isLoadingAllVendors,
    errorAllVendors,
    getVendorById,
    getVendorsByType,
    useSingleVendor,
  }
}
