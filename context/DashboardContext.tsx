"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface DashboardSettings {
  orgSize: string
  industry: string
  region: string
  comparisonYears: number
  selectedVendors: string[]
  analysisType: "basic" | "advanced"
  currency: string
  theme: "light" | "dark"
}

interface DashboardContextType {
  settings: DashboardSettings
  updateSettings: (updates: Partial<DashboardSettings>) => void
  resetSettings: () => void
}

const defaultSettings: DashboardSettings = {
  orgSize: "medium",
  industry: "technology",
  region: "north-america",
  comparisonYears: 3,
  selectedVendors: ["portnox", "cisco", "aruba"],
  analysisType: "basic",
  currency: "USD",
  theme: "light",
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<DashboardSettings>(defaultSettings)

  const updateSettings = (updates: Partial<DashboardSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  return (
    <DashboardContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboardSettings() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboardSettings must be used within a DashboardProvider")
  }
  return context
}
