"use client"

import { createContext, useContext, useState, useMemo, type ReactNode } from "react"
import type { IndustryId, OrgSizeId } from "@/types/common"
import type { VendorId } from "@/lib/vendors/data"

interface DashboardContextType {
  selectedIndustry: IndustryId
  setSelectedIndustry: (industry: IndustryId) => void
  selectedOrgSize: OrgSizeId
  setSelectedOrgSize: (orgSize: OrgSizeId) => void
  comparisonYears: number
  setComparisonYears: (years: number) => void
  selectedVendors: VendorId[]
  setSelectedVendors: (vendors: VendorId[]) => void
  baseVendor: VendorId
  setBaseVendor: (vendor: VendorId) => void
  showAdvancedMetrics: boolean
  setShowAdvancedMetrics: (show: boolean) => void
  resetToDefaults: () => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

const defaultState = {
  selectedIndustry: "technology" as IndustryId,
  selectedOrgSize: "medium" as OrgSizeId,
  comparisonYears: 3,
  selectedVendors: ["portnox", "cisco_ise", "aruba_clearpass"] as VendorId[],
  baseVendor: "portnox" as VendorId,
  showAdvancedMetrics: false,
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId>(defaultState.selectedIndustry)
  const [selectedOrgSize, setSelectedOrgSize] = useState<OrgSizeId>(defaultState.selectedOrgSize)
  const [comparisonYears, setComparisonYears] = useState<number>(defaultState.comparisonYears)
  const [selectedVendors, setSelectedVendors] = useState<VendorId[]>(defaultState.selectedVendors)
  const [baseVendor, setBaseVendor] = useState<VendorId>(defaultState.baseVendor)
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState<boolean>(defaultState.showAdvancedMetrics)

  const resetToDefaults = () => {
    setSelectedIndustry(defaultState.selectedIndustry)
    setSelectedOrgSize(defaultState.selectedOrgSize)
    setComparisonYears(defaultState.comparisonYears)
    setSelectedVendors(defaultState.selectedVendors)
    setBaseVendor(defaultState.baseVendor)
    setShowAdvancedMetrics(defaultState.showAdvancedMetrics)
  }

  const value = useMemo(
    () => ({
      selectedIndustry,
      setSelectedIndustry,
      selectedOrgSize,
      setSelectedOrgSize,
      comparisonYears,
      setComparisonYears,
      selectedVendors,
      setSelectedVendors,
      baseVendor,
      setBaseVendor,
      showAdvancedMetrics,
      setShowAdvancedMetrics,
      resetToDefaults,
    }),
    [selectedIndustry, selectedOrgSize, comparisonYears, selectedVendors, baseVendor, showAdvancedMetrics],
  )

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export function useDashboardContext() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboardContext must be used within a DashboardProvider")
  }
  return context
}
