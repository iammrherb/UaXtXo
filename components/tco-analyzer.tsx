"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { PanelLeftOpen, PanelRightOpen } from "lucide-react"

import { ComprehensiveVendorDatabase, getAllVendors } from "@/lib/comprehensive-vendor-data"
import { calculateTco, type CalculationResult, type CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

import EnhancedVendorSelection from "./enhanced-vendor-selection"
import SettingsPanel from "./settings-panel"
import ExecutiveDashboardView from "./executive-dashboard-view"
import FinancialAnalysisView from "./financial-analysis-view"
import BusinessImpactView from "./business-impact-view"
import CybersecurityPostureView from "./cybersecurity-posture-view"
import ImplementationTimelineView from "./implementation-timeline-view"
import FeatureMatrixView from "./feature-matrix-view"
import ExecutiveReportView from "./executive-report-view"

const allVendors = getAllVendors()

export default function TcoAnalyzer() {
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true)
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true)

  const [config, setConfig] = useState<CalculationConfiguration>({
    devices: 5000,
    years: 3,
    staffCount: 5,
    hourlyRate: 75,
    breachCost: 4450000,
  })

  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco", "aruba", "fortinet"])

  const handleVendorToggle = useCallback((vendorId: string) => {
    setSelectedVendors((prev) => (prev.includes(vendorId) ? prev.filter((v) => v !== vendorId) : [...prev, vendorId]))
  }, [])

  const handleSelectAll = useCallback(() => {
    setSelectedVendors(allVendors.map((v) => v.id))
  }, [])

  const handleClearAll = useCallback(() => {
    setSelectedVendors(["portnox"])
  }, [])

  const results: CalculationResult[] = useMemo(() => {
    if (selectedVendors.length === 0) return []
    return selectedVendors
      .map((vendorId) => {
        const vendorData = ComprehensiveVendorDatabase[vendorId]
        if (!vendorData) return null
        return calculateTco(vendorData, config)
      })
      .filter((r): r is CalculationResult => r !== null)
      .sort((a, b) => a.totalTco - b.totalTco)
  }, [selectedVendors, config])

  const LeftPanel = () => (
    <div className="p-4 h-full overflow-y-auto">
      <EnhancedVendorSelection
        vendors={allVendors}
        selectedVendors={selectedVendors}
        onVendorToggle={handleVendorToggle}
        onSelectAll={handleSelectAll}
        onClearAll={handleClearAll}
      />
    </div>
  )

  const RightPanel = () => (
    <div className="p-4 h-full overflow-y-auto">
      <SettingsPanel config={config} onConfigChange={setConfig} />
    </div>
  )

  return (
    <div className="h-screen w-full bg-background text-foreground flex flex-col">
      <header className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-2">
          <img src="/portnox-logo.png" alt="Portnox Logo" className="h-8" />
          <h1 className="text-lg font-semibold">ZTCA TCO Analyzer</h1>
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden bg-transparent">
                Vendors
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
              <LeftPanel />
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden bg-transparent">
                Settings
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <RightPanel />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <AnimatePresence>
          {isLeftPanelOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "25%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="hidden lg:block"
            >
              <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
                <LeftPanel />
              </ResizablePanel>
            </motion.div>
          )}
        </AnimatePresence>

        {!isLeftPanelOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLeftPanelOpen(true)}
            className="absolute top-1/2 left-0 z-10 -translate-y-1/2"
          >
            <PanelRightOpen className="h-4 w-4" />
          </Button>
        )}

        <ResizableHandle withHandle className="hidden lg:flex" />

        <ResizablePanel defaultSize={50}>
          <main className="p-2 sm:p-4 md:p-6 h-full overflow-y-auto">
            <Tabs defaultValue="executive-dashboard">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-7 mb-4">
                <TabsTrigger value="executive-dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="financial-analysis">Financial</TabsTrigger>
                <TabsTrigger value="business-impact">Business</TabsTrigger>
                <TabsTrigger value="cybersecurity-posture">Security</TabsTrigger>
                <TabsTrigger value="implementation-timeline">Implementation</TabsTrigger>
                <TabsTrigger value="feature-matrix">Features</TabsTrigger>
                <TabsTrigger value="executive-report">Report</TabsTrigger>
              </TabsList>
              <AnimatePresence mode="wait">
                <motion.div
                  key={results.length > 0 ? "content" : "empty"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {results.length > 0 ? (
                    <>
                      <TabsContent value="executive-dashboard">
                        <ExecutiveDashboardView results={results} config={config} />
                      </TabsContent>
                      <TabsContent value="financial-analysis">
                        <FinancialAnalysisView results={results} config={config} />
                      </TabsContent>
                      <TabsContent value="business-impact">
                        <BusinessImpactView results={results} config={config} />
                      </TabsContent>
                      <TabsContent value="cybersecurity-posture">
                        <CybersecurityPostureView results={results} config={config} />
                      </TabsContent>
                      <TabsContent value="implementation-timeline">
                        <ImplementationTimelineView results={results} config={config} />
                      </TabsContent>
                      <TabsContent value="feature-matrix">
                        <FeatureMatrixView results={results} config={config} />
                      </TabsContent>
                      <TabsContent value="executive-report">
                        <ExecutiveReportView results={results} config={config} />
                      </TabsContent>
                    </>
                  ) : (
                    <div className="text-center py-20">
                      <h2 className="text-xl font-semibold">No Vendors Selected</h2>
                      <p className="text-muted-foreground">Please select at least one vendor to see the analysis.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </main>
        </ResizablePanel>

        <ResizableHandle withHandle className="hidden lg:flex" />

        <AnimatePresence>
          {isRightPanelOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "25%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="hidden lg:block"
            >
              <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
                <RightPanel />
              </ResizablePanel>
            </motion.div>
          )}
        </AnimatePresence>

        {!isRightPanelOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsRightPanelOpen(true)}
            className="absolute top-1/2 right-0 z-10 -translate-y-1/2"
          >
            <PanelLeftOpen className="h-4 w-4" />
          </Button>
        )}
      </ResizablePanelGroup>
    </div>
  )
}
