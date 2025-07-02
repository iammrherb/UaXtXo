"use client"

import { useMemo } from "react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"

interface ExecutiveReportViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function ExecutiveReportView({ results, config }: ExecutiveReportViewProps) {
  const reportData = useMemo(() => {
    const bestValue = results[0] // Assuming sorted by total cost
    const bestRoi = results.reduce((best, current) => 
      current.roi.percentage > best.roi.percentage ? current : best
    )
    const fastestPayback = results.reduce((fastest, current) => 
      current.roi.paybackMonths < fastest.roi.paybackMonths ? current : fastest
    )
    
    const totalSavings = Math.max(...results.map(r => r.total)) - Math.min(...results.map(r => r.total))
    const avgImplementationTime = results.length > 0 ? 
      results.reduce((sum, r) => {
        const vendor = ComprehensiveVendorDatabase[r.vendor]\
        return sum + (vendor.id === "por\
