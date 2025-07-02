"use client"

import type React from "react"
import { useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useDashboardSettings } from "@/context/DashboardContext"
import { useVendorData, type VendorId } from "@/hooks/useVendorData"
import { useTcoCalculator, type TCOResult } from "@/hooks/useTcoCalculator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, RefreshCw, BarChart3, ShieldCheck, TrendingUp, Wrench, Layers, DollarSign } from "lucide-react"

// Import the new detailed tab components
import DetailedCostAnalysisTab from "./DetailedCostAnalysisTab"
import RoiAnalysisTab from "./RoiAnalysisTab"
import ComplianceRiskTab from "./ComplianceRiskTab"
import OperationsImpactTab from "./OperationsImpactTab"
import FeatureMatrixTab from "./FeatureMatrixTab"
import ImplementationTab from "./ImplementationTab"

const TcoAnalysisView: React.FC = () => {
  const { selectedOrgSize, selectedIndustry, comparisonYears, selectedVendorIds } = useDashboardSettings()
  const { getAllVendorIds, getVendorById, isLoadingAllVendors } = useVendorData()
  const { calculateAllSelectedVendorsTco } = useTcoCalculator()

  const [isLoadingCalculations, setIsLoadingCalculations] = useState(true)
  const [tcoResults, setTcoResults] = useState<TCOResult[]>([])
  const [activeTab, setActiveTab] = useState("costs")

  const vendorIdsForAnalysis = useMemo(() => {
    if (selectedVendorIds.length > 0) {
      return selectedVendorIds
    }
    // Fallback to a default set if no vendors are selected
    const allIds = getAllVendorIds()
    const mainCompetitors: VendorId[] = ["cisco_ise", "aruba_clearpass", "fortinac"]
    const selected: VendorId[] = ["portnox"]
    for (const competitor of mainCompetitors) {
      if (allIds.includes(competitor) && selected.length < 4) {
        selected.push(competitor)
      }
    }
    return selected
  }, [selectedVendorIds, getAllVendorIds])

  const vendorDataForAnalysis = useMemo(() => {
    return vendorIdsForAnalysis.map((id) => getVendorById(id)).filter(Boolean)
  }, [vendorIdsForAnalysis, getVendorById])

  useEffect(() => {
    if (isLoadingAllVendors || vendorIdsForAnalysis.length === 0) {
      setIsLoadingCalculations(true)
      return
    }

    setIsLoadingCalculations(true)
    const results = calculateAllSelectedVendorsTco({
      vendorIds: vendorIdsForAnalysis,
      orgSizeId: selectedOrgSize,
      industryId: selectedIndustry,
      projectionYears: comparisonYears,
    })
    setTcoResults(results)
    setIsLoadingCalculations(false)
  }, [
    vendorIdsForAnalysis,
    selectedOrgSize,
    selectedIndustry,
    comparisonYears,
    calculateAllSelectedVendorsTco,
    isLoadingAllVendors,
  ])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  }

  if (isLoadingAllVendors) {
    return (
      <div className="space-y-8">
        <div className="p-10 rounded-2xl bg-slate-800/50 animate-pulse h-64 flex items-center justify-center text-slate-400">
          <RefreshCw className="animate-spin h-8 w-8 mr-3" /> Loading Vendor Data...
        </div>
      </div>
    )
  }

  if (tcoResults.length === 0 && !isLoadingCalculations) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">TCO Analysis Center</h1>
        </div>
        <div className="p-10 rounded-2xl bg-slate-800/50 text-center text-slate-400">
          <AlertTriangle size={48} className="mx-auto mb-4 text-yellow-500" />
          No TCO data available for the current selection. Please adjust vendor selection or other parameters.
        </div>
      </div>
    )
  }

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate" className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 mb-4">
          Ultimate NAC Vendor Analysis
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          An in-depth comparison of Total Cost of Ownership, ROI, features, and operational impact across selected
          vendors over a {comparisonYears}-year period.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-slate-800/50 border border-slate-700/50 h-auto py-2">
          <TabsTrigger value="costs" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Costs
          </TabsTrigger>
          <TabsTrigger value="roi" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            ROI
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Operations
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Features
          </TabsTrigger>
          <TabsTrigger value="implementation" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Implementation
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {isLoadingCalculations ? (
            <div className="p-10 rounded-2xl bg-slate-800/50 animate-pulse h-64 flex items-center justify-center text-slate-400">
              <RefreshCw className="animate-spin h-8 w-8 mr-3" /> Calculating TCO & ROI...
            </div>
          ) : (
            <>
              <TabsContent value="costs">
                <DetailedCostAnalysisTab tcoResults={tcoResults} comparisonYears={comparisonYears} />
              </TabsContent>
              <TabsContent value="roi">
                <RoiAnalysisTab tcoResults={tcoResults} />
              </TabsContent>
              <TabsContent value="compliance">
                <ComplianceRiskTab vendorData={vendorDataForAnalysis} />
              </TabsContent>
              <TabsContent value="operations">
                <OperationsImpactTab vendorData={vendorDataForAnalysis} />
              </TabsContent>
              <TabsContent value="features">
                <FeatureMatrixTab vendorData={vendorDataForAnalysis} />
              </TabsContent>
              <TabsContent value="implementation">
                <ImplementationTab vendorData={vendorDataForAnalysis} />
              </TabsContent>
            </>
          )}
        </div>
      </Tabs>
    </motion.div>
  )
}

export default TcoAnalysisView
