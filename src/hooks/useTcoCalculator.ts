"use client"

import { useMemo } from "react"
import { useDashboardSettings } from "@/context/DashboardContext"
import { compareMultipleVendorsTCO, type TCOResult } from "@/lib/calculators/tco"

export type { TCOResult, TCOResultBreakdown } from "@/lib/calculators/tco"

export function useTcoCalculator() {
  const { settings } = useDashboardSettings()
  const { selectedVendorIds, orgSizeKey, industry, projectionYears } = settings

  const tcoResults: TCOResult[] = useMemo(() => {
    if (selectedVendorIds.length === 0) {
      return []
    }
    try {
      return compareMultipleVendorsTCO(selectedVendorIds, orgSizeKey, industry, projectionYears)
    } catch (error) {
      console.error("TCO Calculation Error:", error)
      return []
    }
  }, [selectedVendorIds, orgSizeKey, industry, projectionYears])

  const portnoxResult = useMemo(() => tcoResults.find((r) => r.vendorId === "portnox"), [tcoResults])

  const averageCompetitorTCO = useMemo(() => {
    const competitors = tcoResults.filter((r) => r.vendorId !== "portnox")
    if (competitors.length === 0) return null
    return competitors.reduce((acc, curr) => acc + curr.totalTCO, 0) / competitors.length
  }, [tcoResults])

  const { savings, savingsPercent } = useMemo(() => {
    if (portnoxResult && averageCompetitorTCO && averageCompetitorTCO > 0) {
      const savings = averageCompetitorTCO - portnoxResult.totalTCO
      const savingsPercent = (savings / averageCompetitorTCO) * 100
      return { savings, savingsPercent }
    }
    return { savings: 0, savingsPercent: 0 }
  }, [portnoxResult, averageCompetitorTCO])

  return {
    tcoResults,
    portnoxResult,
    averageCompetitorTCO,
    savings,
    savingsPercent,
    isLoading: false, // In a real app, this would be true during async calculations
  }
}
