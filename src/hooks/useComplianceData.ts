"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { complianceStandards, type ComplianceStandard } from "@/lib/compliance/standards"
import { useDashboardContext } from "@/context/DashboardContext"
import { compareVendorRisks, type RiskAssessmentResult } from "@/lib/compliance/risk-assessment"
import { useVendorData } from "./useVendorData"

// Simulate async data fetching
const fetchComplianceStandards = async (): Promise<ComplianceStandard[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return complianceStandards
}

export function useComplianceData() {
  const { selectedIndustry, selectedOrgSize, selectedVendors } = useDashboardContext()
  const { getAllVendorsList } = useVendorData()

  const {
    data: allStandards,
    isLoading: isLoadingStandards,
    error: errorStandards,
  } = useQuery<ComplianceStandard[], Error>({
    queryKey: ["complianceStandards"],
    queryFn: fetchComplianceStandards,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const applicableStandards = useMemo(() => {
    if (!allStandards) return []
    return allStandards.filter(
      (standard) =>
        standard.applicableIndustries.includes("all") || standard.applicableIndustries.includes(selectedIndustry),
    )
  }, [allStandards, selectedIndustry])

  const vendorRiskAssessments = useMemo((): Record<string, RiskAssessmentResult> => {
    const vendorsToCompare = getAllVendorsList().filter((v) => selectedVendors.includes(v.id))
    if (vendorsToCompare.length === 0 || applicableStandards.length === 0) {
      return {}
    }
    return compareVendorRisks(vendorsToCompare, selectedIndustry, selectedOrgSize, applicableStandards)
  }, [getAllVendorsList, selectedVendors, selectedIndustry, selectedOrgSize, applicableStandards])

  return {
    allStandards,
    isLoadingStandards,
    errorStandards,
    applicableStandards,
    vendorRiskAssessments,
  }
}
