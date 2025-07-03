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
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId>("technology")
  const [selectedOrgSize, setSelectedOrgSize] = useState<OrgSizeId>("medium")
  const [comparisonYears, setComparisonYears] = useState<number>(3)
  const [selectedVendors, setSelectedVendors] = useState<VendorId[]>(["portnox", "cisco_ise", "aruba_clearpass"])
  const [baseVendor, setBaseVendor] = useState<VendorId>("portnox")

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
    }),
    [selectedIndustry, selectedOrgSize, comparisonYears, selectedVendors, baseVendor],
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
