"use client"

import type React from "react"
import { useMemo } from "react"
import { useDashboardSettings } from "@/context/DashboardContext"
import { useVendorData } from "@/hooks/useVendorData"
import { ReportBuilder } from "@/components/report-builder/ReportBuilder"
import { compareVendorRisks } from "@/lib/compliance/risk-assessment"
import { complianceStandards } from "@/lib/compliance/standards"
import type { NewVendorData } from "@/lib/vendors/data"
import type { ReportTemplate } from "@/types/report-builder"

const ReportBuilderPage: React.FC = () => {
  const { selectedOrgSize, selectedIndustry } = useDashboardSettings()
  const { getAllVendorIds, getVendor, isLoadingAllVendors } = useVendorData()

  const vendors = useMemo(() => {
    if (isLoadingAllVendors) return []
    return getAllVendorIds()
      .map((id) => getVendor(id))
      .filter(Boolean) as NewVendorData[]
  }, [getAllVendorIds, getVendor, isLoadingAllVendors])

  const applicableStandards = useMemo(() => {
    return complianceStandards.filter(
      (standard) =>
        standard.applicableIndustries.includes(selectedIndustry) || standard.applicableIndustries.includes("all"),
    )
  }, [selectedIndustry])

  const riskAssessments = useMemo(() => {
    if (vendors.length === 0) return {}
    return compareVendorRisks(vendors, selectedIndustry, selectedOrgSize, applicableStandards)
  }, [vendors, selectedIndustry, selectedOrgSize, applicableStandards])

  const exportData = useMemo(
    () => ({
      vendors,
      riskAssessments,
      industry: selectedIndustry,
      orgSize: selectedOrgSize,
      generatedAt: new Date().toISOString(),
    }),
    [vendors, riskAssessments, selectedIndustry, selectedOrgSize],
  )

  const handleSave = (template: ReportTemplate) => {
    // Save template to local storage or backend
    const savedTemplates = JSON.parse(localStorage.getItem("reportTemplates") || "[]")
    const updatedTemplates = savedTemplates.filter((t: ReportTemplate) => t.id !== template.id)
    updatedTemplates.push(template)
    localStorage.setItem("reportTemplates", JSON.stringify(updatedTemplates))
    console.log("Template saved:", template.name)
  }

  const handleExport = (template: ReportTemplate) => {
    // Export template or generate report
    console.log("Exporting template:", template.name)
  }

  if (isLoadingAllVendors) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Loading Report Builder...</p>
        </div>
      </div>
    )
  }

  return <ReportBuilder data={exportData} onSave={handleSave} onExport={handleExport} />
}

export default ReportBuilderPage
