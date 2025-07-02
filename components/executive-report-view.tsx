"use client"

import React from "react"
import { motion } from "framer-motion"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"
import ExecutiveDashboardView from "./executive-dashboard-view"
import FinancialAnalysisView from "./financial-analysis-view"
import CybersecurityPostureView from "./cybersecurity-posture-view"

const ExecutiveReportView = React.forwardRef<
  HTMLDivElement,
  {
    results: CalculationResult[]
    config: CalculationConfiguration
    darkMode: boolean
    handlePrint: () => void
  }
>(({ results, config, darkMode, handlePrint }, ref) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">Executive Report</h2>
          <p className="text-muted-foreground">A consolidated summary of the TCO & ROI analysis.</p>
        </div>
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print/Save as PDF
        </Button>
      </div>
      <motion.div
        ref={ref}
        className="p-8 bg-background text-foreground rounded-lg shadow-lg space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">TCO & ROI Analysis Report</h1>
          <p className="text-xl text-muted-foreground mt-2">Prepared for Your Organization</p>
          <p className="text-sm text-muted-foreground mt-1">Date: {new Date().toLocaleDateString()}</p>
        </div>
        <ExecutiveDashboardView results={results} config={config} />
        <FinancialAnalysisView results={results} config={config} />
        <CybersecurityPostureView results={results} config={config} />
      </motion.div>
    </div>
  )
})

ExecutiveReportView.displayName = "ExecutiveReportView"
export default ExecutiveReportView
