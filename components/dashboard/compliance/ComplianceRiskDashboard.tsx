"use client"

import type React from "react"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { useDashboardContext } from "@/context/DashboardContext"
import { useVendorData } from "@/hooks/useVendorData"
import { useComplianceData } from "@/hooks/useComplianceData"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, ContrastIcon as Compare, TrendingUp } from "lucide-react"
import { ComplianceOverview } from "@/components/charts/dashboards/ComplianceOverview"
import { VendorRiskComparison } from "@/components/charts/compliance/VendorRiskComparison"
import { ExportDialog } from "@/components/export/ExportDialog"
import { QuickExportButtons } from "@/components/export/QuickExportButtons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ComplianceRiskDashboard: React.FC = () => {
  const { selectedVendors, selectedOrgSize, selectedIndustry } = useDashboardContext()
  const { vendorsMap, isLoadingAllVendors } = useVendorData()
  const { vendorRiskAssessments, isLoading: isLoadingCompliance } = useComplianceData()

  const vendors = useMemo(() => Array.from(vendorsMap?.values() || []), [vendorsMap])
  const exportData = useMemo(
    () => ({ vendors, riskAssessments: vendorRiskAssessments, industry: selectedIndustry, orgSize: selectedOrgSize }),
    [vendors, vendorRiskAssessments, selectedIndustry, selectedOrgSize],
  )

  if (isLoadingAllVendors || isLoadingCompliance) {
    return <div>Loading Compliance Dashboard...</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>Compliance & Risk Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 mb-4">
                Compliance Risk Assessment
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <QuickExportButtons data={exportData} />
              <ExportDialog data={exportData} />
            </div>
          </div>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="overview">
                <Shield className="w-4 h-4 mr-2" />
                Risk Overview
              </TabsTrigger>
              <TabsTrigger value="comparison">
                <Compare className="w-4 h-4 mr-2" />
                Vendor Comparison
              </TabsTrigger>
              <TabsTrigger value="trends">
                <TrendingUp className="w-4 h-4 mr-2" />
                Risk Trends
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <ComplianceOverview />
            </TabsContent>
            <TabsContent value="comparison" className="mt-6">
              <VendorRiskComparison
                riskData={vendorRiskAssessments}
                selectedVendors={selectedVendors}
                onVendorSelectionChange={() => {}}
              />
            </TabsContent>
            <TabsContent value="trends" className="mt-6">
              <p>Risk trends will be displayed here.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ComplianceRiskDashboard
