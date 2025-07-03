"use client"

import { DashboardProvider } from "@/context/DashboardContext"
import TcoAnalyzer from "@/components/tco-analyzer"

export default function TcoAnalysisPage() {
  return (
    <DashboardProvider>
      <TcoAnalyzer />
    </DashboardProvider>
  )
}
