"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useDashboardContext } from "@/context/DashboardContext"
import { useVendorData } from "./useVendorData"
import { useComplianceData } from "./useComplianceData"
import { getOrGenerateAIAnalysis } from "@/app/actions/ai"

export function useAIInsights() {
  const { selectedVendors, selectedIndustry, selectedOrgSize } = useDashboardContext()
  const { vendors, isSuccess: vendorsLoaded } = useVendorData()
  const { riskAssessments, isSuccess: complianceDataLoaded } = useComplianceData(
    selectedVendors,
    selectedIndustry,
    selectedOrgSize,
  )

  const selectedVendorData = useMemo(() => {
    return vendors.filter((v) => selectedVendors.includes(v.id))
  }, [vendors, selectedVendors])

  const isEnabled = vendorsLoaded && complianceDataLoaded && selectedVendors.length > 0

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["aiAnalysis", selectedVendors, selectedIndustry, selectedOrgSize],
    queryFn: () => getOrGenerateAIAnalysis(selectedVendorData, riskAssessments, selectedIndustry, selectedOrgSize),
    enabled: isEnabled,
    staleTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
  })

  const hasInsights = data && (data.insights.length > 0 || data.recommendations.length > 0 || !!data.executiveSummary)

  return {
    // State
    insights: data?.insights || [],
    recommendations: data?.recommendations || [],
    executiveSummary: data?.executiveSummary || null,
    trendAnalysis: data?.trendAnalysis || null,
    isLoading,
    error: error ? (error as Error).message : null,
    lastGenerated: data?.fromCache ? "cached" : new Date().toISOString(),

    // Derived state
    hasInsights,
    isCacheValid: data?.fromCache,

    // Actions
    generateInsights: refetch,
    refreshInsights: refetch,
    clearInsights: () => {
      console.warn("Clearing specific cache entries requires a dedicated server action. Refetching to get fresh data.")
      refetch()
    },
    regenerateSpecific: async (type: "summary" | "insights" | "recommendations" | "trends") => {
      console.warn(`Regenerating only '${type}' is not supported with the current caching strategy. Refetching all.`)
      await refetch()
    },
    refetch,
  }
}
