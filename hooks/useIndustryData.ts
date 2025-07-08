"use client"

import { useCallback } from "react"
import { useQuery } from "@tanstack/react-query"

export type IndustryId =
  | "healthcare"
  | "financial_services"
  | "manufacturing"
  | "retail"
  | "technology"
  | "education"
  | "government"
  | "energy_utilities"

export interface Industry {
  id: IndustryId
  name: string
  description: string
  riskLevel: "low" | "medium" | "high" | "critical"
  avgBreachCost: number
  complianceRequirements: string[]
  securityPriorities: string[]
  regulatoryPressure: "low" | "medium" | "high" | "critical"
}

const industriesList: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Healthcare organizations including hospitals, clinics, and medical practices",
    riskLevel: "critical",
    avgBreachCost: 10930000,
    complianceRequirements: ["HIPAA", "HITECH", "PCI DSS"],
    securityPriorities: ["Patient Data Protection", "Medical Device Security", "Access Controls"],
    regulatoryPressure: "critical",
  },
  {
    id: "financial_services",
    name: "Financial Services",
    description: "Banks, credit unions, investment firms, and financial institutions",
    riskLevel: "critical",
    avgBreachCost: 5850000,
    complianceRequirements: ["PCI DSS", "SOX", "GDPR", "FFIEC"],
    securityPriorities: ["Transaction Security", "Customer Data Protection", "Fraud Prevention"],
    regulatoryPressure: "critical",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Manufacturing companies and industrial organizations",
    riskLevel: "high",
    avgBreachCost: 4990000,
    complianceRequirements: ["ISO 27001", "NIST", "ITAR"],
    securityPriorities: ["OT Security", "Supply Chain Protection", "Intellectual Property"],
    regulatoryPressure: "high",
  },
  {
    id: "retail",
    name: "Retail",
    description: "Retail organizations and e-commerce companies",
    riskLevel: "medium",
    avgBreachCost: 3280000,
    complianceRequirements: ["PCI DSS", "GDPR"],
    securityPriorities: ["Payment Security", "Customer Data", "Point of Sale Protection"],
    regulatoryPressure: "medium",
  },
  {
    id: "technology",
    name: "Technology",
    description: "Technology companies and software organizations",
    riskLevel: "medium",
    avgBreachCost: 5040000,
    complianceRequirements: ["ISO 27001", "SOC 2", "GDPR"],
    securityPriorities: ["Intellectual Property", "Customer Data", "Cloud Security"],
    regulatoryPressure: "medium",
  },
  {
    id: "education",
    name: "Education",
    description: "Educational institutions and universities",
    riskLevel: "low",
    avgBreachCost: 3790000,
    complianceRequirements: ["FERPA", "ISO 27001"],
    securityPriorities: ["Student Data Protection", "Research Security", "Campus Network"],
    regulatoryPressure: "low",
  },
  {
    id: "government",
    name: "Government",
    description: "Government agencies and public sector organizations",
    riskLevel: "critical",
    avgBreachCost: 4910000,
    complianceRequirements: ["FedRAMP", "FISMA", "NIST", "CJIS"],
    securityPriorities: ["Citizen Data Protection", "National Security", "Critical Infrastructure"],
    regulatoryPressure: "critical",
  },
  {
    id: "energy_utilities",
    name: "Energy & Utilities",
    description: "Energy companies and utility providers",
    riskLevel: "critical",
    avgBreachCost: 6720000,
    complianceRequirements: ["NERC CIP", "ISO 27001", "NIST"],
    securityPriorities: ["Critical Infrastructure", "SCADA Security", "Grid Protection"],
    regulatoryPressure: "critical",
  },
]

const getIndustryById = (id: IndustryId): Industry | undefined => {
  return industriesList.find((industry) => industry.id === id)
}

// Simulate async data fetching
const fetchAllIndustries = async (): Promise<Industry[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return industriesList
}

const fetchIndustryById = async (id: IndustryId): Promise<Industry | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return getIndustryById(id)
}

export function useIndustryData() {
  const {
    data: allIndustries,
    isLoading: isLoadingAllIndustries,
    error: errorAllIndustries,
  } = useQuery<Industry[], Error>({
    queryKey: ["allIndustries"],
    queryFn: fetchAllIndustries,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const getIndustryById = useCallback(
    (id: IndustryId): Industry | undefined => {
      return allIndustries?.find((industry) => industry.id === id)
    },
    [allIndustries],
  )

  const useSingleIndustry = (id: IndustryId | null) => {
    return useQuery<Industry | undefined, Error>({
      queryKey: ["industry", id],
      queryFn: () => (id ? fetchIndustryById(id) : Promise.resolve(undefined)),
      enabled: !!id,
      staleTime: Number.POSITIVE_INFINITY,
    })
  }

  return {
    allIndustries,
    isLoadingAllIndustries,
    errorAllIndustries,
    getIndustryById,
    useSingleIndustry,
  }
}
