"use client"

import { useState, useEffect } from "react"

export interface IndustryData {
  id: string
  name: string
  description: string
  riskMultiplier: number
  complianceRequirements: string[]
  avgBreachCost: number
  regulatoryFines: number
  deviceTypes: {
    endpoints: number
    iot: number
    servers: number
    mobile: number
  }
  securityPriorities: string[]
}

const INDUSTRY_DATA: IndustryData[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Hospitals, clinics, and healthcare providers",
    riskMultiplier: 2.5,
    complianceRequirements: ["HIPAA", "HITECH", "FDA", "State Privacy Laws"],
    avgBreachCost: 10930000,
    regulatoryFines: 1600000,
    deviceTypes: {
      endpoints: 60,
      iot: 25,
      servers: 10,
      mobile: 5,
    },
    securityPriorities: ["Patient Data Protection", "Medical Device Security", "Access Control", "Audit Trails"],
  },
  {
    id: "financial",
    name: "Financial Services",
    description: "Banks, credit unions, and financial institutions",
    riskMultiplier: 2.8,
    complianceRequirements: ["PCI DSS", "SOX", "GLBA", "FFIEC"],
    avgBreachCost: 5720000,
    regulatoryFines: 5000000,
    deviceTypes: {
      endpoints: 70,
      iot: 10,
      servers: 15,
      mobile: 5,
    },
    securityPriorities: [
      "Transaction Security",
      "Customer Data Protection",
      "Fraud Prevention",
      "Regulatory Compliance",
    ],
  },
  {
    id: "education",
    name: "Education",
    description: "Schools, universities, and educational institutions",
    riskMultiplier: 1.8,
    complianceRequirements: ["FERPA", "COPPA", "State Privacy Laws"],
    avgBreachCost: 3740000,
    regulatoryFines: 500000,
    deviceTypes: {
      endpoints: 50,
      iot: 20,
      servers: 15,
      mobile: 15,
    },
    securityPriorities: ["Student Data Protection", "Research Security", "BYOD Management", "Network Segmentation"],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Industrial and manufacturing companies",
    riskMultiplier: 2.2,
    complianceRequirements: ["ISO 27001", "NIST", "Industry Standards"],
    avgBreachCost: 4280000,
    regulatoryFines: 1000000,
    deviceTypes: {
      endpoints: 40,
      iot: 40,
      servers: 15,
      mobile: 5,
    },
    securityPriorities: ["OT Security", "IP Protection", "Supply Chain Security", "Industrial IoT"],
  },
  {
    id: "retail",
    name: "Retail",
    description: "Retail stores and e-commerce companies",
    riskMultiplier: 2.0,
    complianceRequirements: ["PCI DSS", "State Privacy Laws", "CCPA"],
    avgBreachCost: 3280000,
    regulatoryFines: 750000,
    deviceTypes: {
      endpoints: 55,
      iot: 25,
      servers: 15,
      mobile: 5,
    },
    securityPriorities: ["Payment Security", "Customer Data Protection", "POS Security", "E-commerce Protection"],
  },
  {
    id: "government",
    name: "Government",
    description: "Federal, state, and local government agencies",
    riskMultiplier: 3.0,
    complianceRequirements: ["FISMA", "NIST 800-53", "FedRAMP", "CJIS"],
    avgBreachCost: 4650000,
    regulatoryFines: 2000000,
    deviceTypes: {
      endpoints: 65,
      iot: 15,
      servers: 15,
      mobile: 5,
    },
    securityPriorities: ["Classified Data Protection", "Citizen Privacy", "Critical Infrastructure", "Zero Trust"],
  },
]

export function useIndustryData() {
  const [industryData, setIndustryData] = useState<IndustryData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIndustryData(INDUSTRY_DATA)
      setLoading(false)
    }, 300)
  }, [])

  const getIndustryById = (id: string): IndustryData | undefined => {
    return INDUSTRY_DATA.find((industry) => industry.id === id)
  }

  const getIndustryRiskProfile = (industryId: string) => {
    const industry = getIndustryById(industryId)
    if (!industry) return null

    return {
      riskLevel: industry.riskMultiplier > 2.5 ? "High" : industry.riskMultiplier > 2.0 ? "Medium" : "Low",
      breachProbability: Math.min(industry.riskMultiplier * 15, 85),
      avgCostPerRecord: industry.avgBreachCost / 25000,
      complianceComplexity: industry.complianceRequirements.length,
      regulatoryRisk: industry.regulatoryFines,
    }
  }

  const getIndustryBenchmarks = (industryId: string) => {
    const industry = getIndustryById(industryId)
    if (!industry) return null

    return {
      avgSecuritySpend: industry.avgBreachCost * 0.1,
      nacAdoptionRate: 65,
      avgDeploymentTime: 120,
      complianceScore: 75,
      incidentResponseTime: 24,
    }
  }

  return {
    industryData,
    loading,
    getIndustryById,
    getIndustryRiskProfile,
    getIndustryBenchmarks,
  }
}
