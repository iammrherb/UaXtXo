"use client"

import { useState, useMemo } from "react"
import { complianceStandards } from "@/lib/compliance/standards"
import { compareVendorRisks } from "@/lib/compliance/risk-assessment"
import { useVendorData } from "./useVendorData"
import { useDashboardContext } from "@/context/DashboardContext"

export function useComplianceData() {
  const { vendors, isLoadingAllVendors } = useVendorData()
  const { selectedIndustry, selectedOrgSize, selectedVendors } = useDashboardContext()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const applicableStandards = useMemo(() => {
    return complianceStandards.filter(
      (standar) =>
        standar.applicableIndustries.includes(selectedIndustry) || standar.applicableIndustries.includes("all"),
    )
  }, [selectedIndustry])

  const selectedVendorData = useMemo(() => {
    return vendors.filter((vendor) => selectedVendors.includes(vendor.id))
  }, [vendors, selectedVendors])

  const riskAssessments = useMemo(() => {
    if (selectedVendorData.length === 0 || applicableStandards.length === 0) {
      return {}
    }

    try {
      return compareVendorRisks(selectedVendorData, selectedIndustry, selectedOrgSize, applicableStandards)
    } catch (err) {
      console.error("Error calculating risk assessments:", err)
      return {}
    }
  }, [selectedVendorData, selectedIndustry, selectedOrgSize, applicableStandards])

  const complianceMetrics = useMemo(() => {
    const assessments = Object.values(riskAssessments)
    if (assessments.length === 0) {
      return {
        averageRiskScore: 0,
        totalGaps: 0,
        criticalGaps: 0,
        highRiskVendors: 0,
        totalCostRisk: 0,
      }
    }

    const averageRiskScore =
      assessments.reduce((sum, assessment) => sum + assessment.overallRiskScore, 0) / assessments.length
    const totalGaps = assessments.reduce((sum, assessment) => sum + assessment.complianceGaps.length, 0)
    const criticalGaps = assessments.reduce(
      (sum, assessment) => sum + assessment.complianceGaps.filter((gap) => gap.gapSeverity === "critical").length,
      0,
    )
    const highRiskVendors = assessments.filter(
      (assessment) => assessment.riskLevel === "high" || assessment.riskLevel === "critical",
    ).length
    const totalCostRisk = assessments.reduce((sum, assessment) => sum + assessment.costOfNonCompliance.total, 0)

    return {
      averageRiskScore: Math.round(averageRiskScore),
      totalGaps,
      criticalGaps,
      highRiskVendors,
      totalCostRisk: Math.round(totalCostRisk),
    }
  }, [riskAssessments])

  return {
    // Data
    applicableStandards,
    riskAssessments,
    complianceMetrics,
    selectedVendorData,

    // State
    isLoading: isLoadingAllVendors || isLoading,
    error,
    hasData: Object.keys(riskAssessments).length > 0,

    // Computed
    vendorCount: selectedVendorData.length,
    standardCount: applicableStandards.length,
  }
}
