"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { ComplianceRiskAssessor, type RiskAssessmentResult } from "@/lib/compliance/risk-assessment"
import { useVendorData } from "./useVendorData"
import type { VendorId } from "@/lib/vendors/data"
import type { IndustryId, OrgSizeId } from "@/types/common"

const assessor = new ComplianceRiskAssessor()

const fetchComplianceData = async (
  vendors: ReturnType<typeof useVendorData>["vendors"],
  selectedVendorIds: VendorId[],
  industry: IndustryId,
  orgSize: OrgSizeId,
): Promise<Record<string, RiskAssessmentResult>> => {
  const selectedVendors = vendors.filter((v) => selectedVendorIds.includes(v.id))
  const assessments: Record<string, RiskAssessmentResult> = {}
  for (const vendor of selectedVendors) {
    assessments[vendor.id] = assessor.assess(vendor, industry, orgSize)
  }
  return assessments
}

export function useComplianceData(selectedVendorIds: VendorId[], industry: IndustryId, orgSize: OrgSizeId) {
  const { vendors, isSuccess: vendorsLoaded } = useVendorData()

  const { data, isSuccess } = useQuery({
    queryKey: ["complianceData", selectedVendorIds, industry, orgSize],
    queryFn: () => fetchComplianceData(vendors, selectedVendorIds, industry, orgSize),
    enabled: vendorsLoaded && selectedVendorIds.length > 0,
  })

  const riskAssessments = useMemo(() => data || {}, [data])

  return {
    riskAssessments,
    isSuccess,
  }
}
