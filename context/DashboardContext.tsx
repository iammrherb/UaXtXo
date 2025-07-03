"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { IndustryId, OrgSizeId } from "@/types/common"

interface DashboardSettings {
  selectedVendors: string[]
  industry: IndustryId
  orgSize: OrgSizeId
  baseVendor: string
  comparisonYears: number
}

interface DashboardContextType extends DashboardSettings {
  // Setters
  setSelectedVendors: (vendors: string[]) => void
  setIndustry: (industry: IndustryId) => void
  setOrgSize: (orgSize: OrgSizeId) => void
  setBaseVendor: (vendor: string) => void
  setComparisonYears: (years: number) => void

  // Computed values
  selectedIndustry: IndustryId
  selectedOrgSize: OrgSizeId

  // Actions
  addVendor: (vendorId: string) => void
  removeVendor: (vendorId: string) => void
  toggleVendor: (vendorId: string) => void
  resetSettings: () => void
}

const defaultSettings: DashboardSettings = {
  selectedVendors: ["portnox"],
  industry: "technology",
  orgSize: "medium",
  baseVendor: "portnox",
  comparisonYears: 3,
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

interface DashboardProviderProps {
  children: ReactNode
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [settings, setSettings] = useState<DashboardSettings>(defaultSettings)

  const setSelectedVendors = useCallback((vendors: string[]) => {
    setSettings((prev) => ({ ...prev, selectedVendors: vendors }))
  }, [])

  const setIndustry = useCallback((industry: IndustryId) => {
    setSettings((prev) => ({ ...prev, industry }))
  }, [])

  const setOrgSize = useCallback((orgSize: OrgSizeId) => {
    setSettings((prev) => ({ ...prev, orgSize }))
  }, [])

  const setBaseVendor = useCallback((vendor: string) => {
    setSettings((prev) => ({ ...prev, baseVendor: vendor }))
  }, [])

  const setComparisonYears = useCallback((years: number) => {
    setSettings((prev) => ({ ...prev, comparisonYears: years }))
  }, [])

  const addVendor = useCallback((vendorId: string) => {
    setSettings((prev) => ({
      ...prev,
      selectedVendors: prev.selectedVendors.includes(vendorId)
        ? prev.selectedVendors
        : [...prev.selectedVendors, vendorId],
    }))
  }, [])

  const removeVendor = useCallback((vendorId: string) => {
    setSettings((prev) => ({
      ...prev,
      selectedVendors: prev.selectedVendors.filter((id) => id !== vendorId),
    }))
  }, [])

  const toggleVendor = useCallback((vendorId: string) => {
    setSettings((prev) => ({
      ...prev,
      selectedVendors: prev.selectedVendors.includes(vendorId)
        ? prev.selectedVendors.filter((id) => id !== vendorId)
        : [...prev.selectedVendors, vendorId],
    }))
  }, [])

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings)
  }, [])

  const contextValue: DashboardContextType = {
    ...settings,
    selectedIndustry: settings.industry,
    selectedOrgSize: settings.orgSize,
    setSelectedVendors,
    setIndustry,
    setOrgSize,
    setBaseVendor,
    setComparisonYears,
    addVendor,
    removeVendor,
    toggleVendor,
    resetSettings,
  }

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>
}

export function useDashboardContext(): DashboardContextType {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboardContext must be used within a DashboardProvider")
  }
  return context
}

export function useDashboardSettings() {
  return useDashboardContext()
}
