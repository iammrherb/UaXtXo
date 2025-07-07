"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { OrgSizeId, IndustryId } from "@/types/common"

interface DashboardSettings {
  selectedOrgSize: OrgSizeId
  selectedIndustry: IndustryId
  comparisonYears: number
  devices: number
  users: number
  hasExistingNAC: boolean
  existingVendor: string
  includeCompliance: boolean
  includeRiskReduction: boolean
  includeHiddenCosts: boolean
  discountRate: number
  inflationRate: number
  riskFactor: "low" | "medium" | "high"
  growthRate: number
  region: string
  portnoxBasePrice: number
  portnoxAddons: Record<string, boolean>
}

interface DashboardContextType extends DashboardSettings {
  setSelectedOrgSize: (orgSize: OrgSizeId) => void
  setSelectedIndustry: (industry: IndustryId) => void
  setComparisonYears: (years: number) => void
  setDevices: (devices: number) => void
  setUsers: (users: number) => void
  setHasExistingNAC: (hasExisting: boolean) => void
  setExistingVendor: (vendor: string) => void
  setIncludeCompliance: (include: boolean) => void
  setIncludeRiskReduction: (include: boolean) => void
  setIncludeHiddenCosts: (include: boolean) => void
  setDiscountRate: (rate: number) => void
  setInflationRate: (rate: number) => void
  setRiskFactor: (factor: "low" | "medium" | "high") => void
  setGrowthRate: (rate: number) => void
  setRegion: (region: string) => void
  setPortnoxBasePrice: (price: number) => void
  setPortnoxAddons: (addons: Record<string, boolean>) => void
  updateSettings: (settings: Partial<DashboardSettings>) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

const defaultSettings: DashboardSettings = {
  selectedOrgSize: "mid_market",
  selectedIndustry: "technology",
  comparisonYears: 3,
  devices: 500,
  users: 500,
  hasExistingNAC: false,
  existingVendor: "cisco_ise",
  includeCompliance: true,
  includeRiskReduction: true,
  includeHiddenCosts: true,
  discountRate: 8,
  inflationRate: 3,
  riskFactor: "medium",
  growthRate: 5,
  region: "north_america",
  portnoxBasePrice: 3.5,
  portnoxAddons: {
    atp: true,
    compliance: true,
    iot: false,
    analytics: true,
  },
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<DashboardSettings>(defaultSettings)

  const updateSettings = useCallback((newSettings: Partial<DashboardSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }, [])

  const contextValue: DashboardContextType = {
    ...settings,
    setSelectedOrgSize: (orgSize) => updateSettings({ selectedOrgSize: orgSize }),
    setSelectedIndustry: (industry) => updateSettings({ selectedIndustry: industry }),
    setComparisonYears: (years) => updateSettings({ comparisonYears: years }),
    setDevices: (devices) => updateSettings({ devices }),
    setUsers: (users) => updateSettings({ users }),
    setHasExistingNAC: (hasExisting) => updateSettings({ hasExistingNAC: hasExisting }),
    setExistingVendor: (vendor) => updateSettings({ existingVendor: vendor }),
    setIncludeCompliance: (include) => updateSettings({ includeCompliance: include }),
    setIncludeRiskReduction: (include) => updateSettings({ includeRiskReduction: include }),
    setIncludeHiddenCosts: (include) => updateSettings({ includeHiddenCosts: include }),
    setDiscountRate: (rate) => updateSettings({ discountRate: rate }),
    setInflationRate: (rate) => updateSettings({ inflationRate: rate }),
    setRiskFactor: (factor) => updateSettings({ riskFactor: factor }),
    setGrowthRate: (rate) => updateSettings({ growthRate: rate }),
    setRegion: (region) => updateSettings({ region }),
    setPortnoxBasePrice: (price) => updateSettings({ portnoxBasePrice: price }),
    setPortnoxAddons: (addons) => updateSettings({ portnoxAddons: addons }),
    updateSettings,
  }

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>
}

export function useDashboardSettings() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboardSettings must be used within a DashboardProvider")
  }
  return context
}
