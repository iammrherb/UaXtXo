"use client"

import { useCallback } from "react"
import { useQuery } from "@tanstack/react-query"

// Compliance standards data
export interface ComplianceStandard {
  id: string
  name: string
  description: string
  applicableIndustries: string[]
  requirements: string[]
  automationLevel: number
  coverageScore: number
}

const complianceStandardsList: ComplianceStandard[] = [
  {
    id: "hipaa",
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act",
    applicableIndustries: ["healthcare"],
    requirements: ["Access Controls", "Audit Logs", "Data Encryption", "Risk Assessment"],
    automationLevel: 85,
    coverageScore: 92,
  },
  {
    id: "pci_dss",
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard",
    applicableIndustries: ["retail", "financial_services"],
    requirements: ["Network Security", "Access Controls", "Monitoring", "Testing"],
    automationLevel: 80,
    coverageScore: 88,
  },
  {
    id: "gdpr",
    name: "GDPR",
    description: "General Data Protection Regulation",
    applicableIndustries: ["technology", "retail", "financial_services"],
    requirements: ["Data Protection", "Privacy Controls", "Breach Notification", "Consent Management"],
    automationLevel: 75,
    coverageScore: 85,
  },
  {
    id: "sox",
    name: "SOX",
    description: "Sarbanes-Oxley Act",
    applicableIndustries: ["financial_services"],
    requirements: ["Financial Controls", "Audit Trails", "Access Management", "Change Control"],
    automationLevel: 82,
    coverageScore: 90,
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    description: "Information Security Management System",
    applicableIndustries: ["technology", "manufacturing", "healthcare"],
    requirements: ["Security Management", "Risk Assessment", "Access Controls", "Incident Management"],
    automationLevel: 88,
    coverageScore: 93,
  },
  {
    id: "nist",
    name: "NIST Cybersecurity Framework",
    description: "National Institute of Standards and Technology Framework",
    applicableIndustries: ["government", "energy_utilities", "manufacturing"],
    requirements: ["Identify", "Protect", "Detect", "Respond", "Recover"],
    automationLevel: 85,
    coverageScore: 91,
  },
  {
    id: "fedramp",
    name: "FedRAMP",
    description: "Federal Risk and Authorization Management Program",
    applicableIndustries: ["government"],
    requirements: ["Cloud Security", "Continuous Monitoring", "Authorization", "Assessment"],
    automationLevel: 78,
    coverageScore: 89,
  },
]

const getComplianceStandardById = (id: string): ComplianceStandard | undefined => {
  return complianceStandardsList.find((standard) => standard.id === id)
}

// Simulate async data fetching
const fetchAllComplianceStandards = async (): Promise<ComplianceStandard[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return complianceStandardsList
}

const fetchComplianceStandardById = async (id: string): Promise<ComplianceStandard | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return getComplianceStandardById(id)
}

export function useComplianceData() {
  const {
    data: allStandards,
    isLoading: isLoadingAllStandards,
    error: errorAllStandards,
  } = useQuery<ComplianceStandard[], Error>({
    queryKey: ["allComplianceStandards"],
    queryFn: fetchAllComplianceStandards,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const getComplianceStandardById = useCallback(
    (id: string): ComplianceStandard | undefined => {
      return allStandards?.find((standard) => standard.id === id)
    },
    [allStandards],
  )

  const getStandardsByIndustry = useCallback(
    (industryId: string): ComplianceStandard[] => {
      if (!allStandards) return []
      return allStandards.filter((standard) => standard.applicableIndustries.includes(industryId))
    },
    [allStandards],
  )

  const useSingleComplianceStandard = (id: string | null) => {
    return useQuery<ComplianceStandard | undefined, Error>({
      queryKey: ["complianceStandard", id],
      queryFn: () => (id ? fetchComplianceStandardById(id) : Promise.resolve(undefined)),
      enabled: !!id,
      staleTime: Number.POSITIVE_INFINITY,
    })
  }

  return {
    allStandards,
    isLoadingAllStandards,
    errorAllStandards,
    getComplianceStandardById,
    getStandardsByIndustry,
    useSingleComplianceStandard,
  }
}
