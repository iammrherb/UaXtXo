"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Settings,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  BarChart3,
  DollarSign,
  TrendingUp,
  Shield,
  FileCheck,
  Users,
  LayoutGrid,
  MapPin,
  Building2,
  FileText,
  Calendar,
  HelpCircle,
  RefreshCw,
  Save,
  Download,
  AlertTriangle
} from "lucide-react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { LoadingState, LoadingSpinner, ProgressiveLoading } from "@/components/ui/loading-states"

import EnhancedVendorSelection from "./enhanced-vendor-selection"
import SettingsPanel from "./settings-panel"
import AnimatedPortnoxLogo from "./animated-portnox-logo"
import AdvancedCostComparison from "./enhanced-charts/advanced-cost-comparison"
import ComprehensiveROIAnalysis from "./enhanced-charts/comprehensive-roi-analysis"
import InteractiveSecurityDashboard from "./enhanced-charts/interactive-security-dashboard"
import OperationalEfficiencyChart from "./enhanced-charts/operational-efficiency-chart"

import { EnhancedCalculationService } from "@/lib/services/enhanced-calculation-service"
import { isSupabaseAvailable } from "@/lib/database/enhanced-client"
import type { UltimateCalculationResult } from "@/lib/services/enhanced-calculation-service"
import type { CalculationConfiguration } from "@/lib/types"

const DEFAULT_VENDORS = ["portnox", "cisco_ise", "aruba_clearpass", "forescout"]

export default function TcoAnalyzerUltimate() {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isCalculating, setIsCalculating] = useState(false)
  const [loadingError, setLoadingError] = useState<string | null>(null)
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const [configuration, setConfiguration] = useState<CalculationConfiguration>({
    orgSize: "medium",
    devices: 2500,
    users: 1500,
    industry: "technology",
    years: 3,
    region: "north-america",
    portnoxBasePrice: 4.0,
    portnoxAddons: { atp: false, compliance: false, iot: false, analytics: false },
  })

  const [selectedVendors, setSelectedVendors] = useState<string[]>(DEFAULT_VENDORS)
  const [results, setResults] = useState<UltimateCalculationResult[]>([])

  useEffect(() => {
    setIsClient(true)
    loadSavedData().catch(error => {
      console.error('Failed to load initial data:', error)
      setLoadingError('Failed to load application data. Please refresh the page.')
      setIsLoading(false)
    })
  }, [])

  const loadSavedData = async () => {
    try {
      // Check if Supabase is available
      if (isSupabaseAvailable()) {
        // Try to load from database first
        const saved = await EnhancedCalculationService.loadCalculation(sessionId)
        if (saved) {
          setConfiguration(saved.config)
          setSelectedVendors(saved.selectedVendors)
          setResults(saved.results)
          setLastUpdated(new Date())
          return
        }
      }
      
      // Fallback to localStorage
      const localSaved = localStorage.getItem("portnox-tco-config")
      if (localSaved) {
        try {
          const { configuration: savedConfig, selectedVendors: savedVendors, darkMode: savedDarkMode } = JSON.parse(localSaved)
          if (savedConfig) setConfiguration(savedConfig)
          if (savedVendors) setSelectedVendors(savedVendors)
          if (typeof savedDarkMode === "boolean") setDarkMode(savedDarkMode)
        } catch (parseError) {
          console.error('Failed to parse saved configuration:', parseError)
          // Clear corrupted data
          localStorage.removeItem("portnox-tco-config")
        }
      }
      
      // Show warning if Supabase is not configured
      if (!isSupabaseAvailable()) {
        console.warn('Supabase not configured - using mock data. Some features may be limited.')
        toast.info("Running in demo mode - database features unavailable")
      }
    } catch (error) {
      console.error("Failed to load saved data", error)
      setLoadingError("Failed to load saved configuration")
    } finally {
      setIsLoading(false)
    }
  }

  const calculateResults = useCallback(async () => {
    if (selectedVendors.length === 0) {
      setResults([])
      return
    }

    setIsCalculating(true)
    try {
      const newResults = await EnhancedCalculationService.compareVendors(selectedVendors, configuration)
      if (!newResults || newResults.length === 0) {
        throw new Error('No calculation results returned')
      }
      setResults(newResults)
      setLastUpdated(new Date())
      
      // Save to database and localStorage
      try {
        if (isSupabaseAvailable()) {
          await EnhancedCalculationService.saveCalculation(sessionId, configuration, selectedVendors, newResults)
        }
        localStorage.setItem("portnox-tco-config", JSON.stringify({ configuration, selectedVendors, darkMode }))
      } catch (saveError) {
        console.warn('Failed to save calculation:', saveError)
        // Continue without saving - don't block the user
      }
      
      toast.success(`Analysis updated for ${newResults.length} vendors`)
    } catch (error) {
      console.error("Failed to calculate results", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to update analysis"
      toast.error(errorMessage)
      setLoadingError(errorMessage)
    } finally {
      setIsCalculating(false)
    }
  }, [selectedVendors, configuration, darkMode, sessionId])

  useEffect(() => {
    if (!isLoading) {
      calculateResults()
    }
  }, [selectedVendors, configuration, isLoading, calculateResults])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleVendorToggle = (vendorId: string) => {
    setSelectedVendors((prev) => (prev.includes(vendorId) ? prev.filter((v) => v !== vendorId) : [...prev, vendorId]))
    toast.success(`Vendor selection updated`)
  }

  const handleClearAll = () => {
    setSelectedVendors([])
    toast.info("All vendors cleared")
  }

  const handleSelectRecommended = () => {
    setSelectedVendors(DEFAULT_VENDORS)
    toast.success("Recommended vendors selected")
  }

  const handleConfigChange = (newConfig: any) => {
    setConfiguration((prev) => ({ ...prev, ...newConfig }))
  }

  const handleAddonsChange = (newAddons: any) => {
    setConfiguration((prev) => ({
      ...prev,
      portnoxAddons: { ...prev.portnoxAddons, ...newAddons },
    }))
  }

  const handleRefreshData = async () => {
    toast.info("Refreshing vendor data...")
    await calculateResults()
  }

  const handleSaveAnalysis = async () => {
    try {
      if (isSupabaseAvailable()) {
        const success = await EnhancedCalculationService.saveCalculation(sessionId, configuration, selectedVendors, results)
        if (success) {
          toast.success("Analysis saved successfully")
        } else {
          toast.error("Failed to save analysis")
        }
      } else {
        toast.info("Database not available - analysis saved locally only")
        localStorage.setItem("portnox-tco-config", JSON.stringify({ configuration, selectedVendors, results, darkMode }))
      }
    } catch (error) {
      toast.error("Failed to save analysis")
    }
  }

  const handleExportData = () => {
    const exportData = {
      configuration,
      selectedVendors,
      results,
      timestamp: new Date().toISOString(),
      version: "3.0"
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tco-analysis-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success("Analysis exported successfully")
  }

  if (!isClient || isLoading) {
    return (
      <LoadingState
        loading={isLoading && !loadingError}
        error={loadingError}
        onRetry={() => {
          setLoadingError(null)
          setIsLoading(true)
          loadSavedData().catch(error => {
            setLoadingError('Failed to load application data')
            setIsLoading(false)
          })
        }}
        loadingComponent={
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="text-center">
              <AnimatedPortnoxLogo width={120} height={40} animate={true} />
              <div className="mt-6 space-y-2">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Executive Intelligence Decision Platform
                </h2>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading comprehensive analysis...</p>
                <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto mt-4">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        }
      >
        {null}
      </LoadingState>
    )
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <AnimatedPortnoxLogo width={140} height={40} showText={true} animate={true} />
              <Separator orientation="vertical" className="h-8" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Executive Intelligence Decision Platform
                </h1>
                <p className="text-sm text-muted-foreground">
                  Real-time data-driven insights for Network Access Control vendor evaluation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Status Indicators */}
              <div className="hidden md:flex items-center gap-2">
                {isCalculating && (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-sm text-muted-foreground">Calculating...</span>
                  </div>
                )}
                {lastUpdated && (
                  <div className="text-xs text-muted-foreground">
                    Updated: {lastUpdated.toLocaleTimeString()}
                  </div>
                )}
              </div>

              <Badge variant="outline" className="hidden md:flex">
                v3.0
              </Badge>
              
              <Button variant="ghost" size="sm" onClick={handleRefreshData} disabled={isCalculating}>
                <RefreshCw className={`h-4 w-4 mr-1 ${isCalculating ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <Sheet open={!sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <AnimatedPortnoxLogo width={24} height={24} showText={false} animate={false} />
                      <span className="font-semibold text-sm">Vendor Selection</span>
                    </div>
                    <EnhancedVendorSelection
                      selectedVendors={selectedVendors}
                      onVendorToggle={handleVendorToggle}
                      onClearAll={handleClearAll}
                      onSelectRecommended={handleSelectRecommended}
                      darkMode={darkMode}
                    />
                  </div>
                </SheetContent>
              </Sheet>
              
              <Button variant="outline" size="sm" onClick={() => setSettingsOpen(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleSaveAnalysis}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Schedule Demo
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full w-full">
            {/* Sidebar Panel */}
            <ResizablePanel
              defaultSize={sidebarCollapsed ? 5 : 28}
              minSize={5}
              maxSize={40}
              className={`${!sidebarOpen ? "hidden md:block" : ""}`}
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="h-full flex flex-col bg-gray-50 dark:bg-gray-900/50"
              >
                {/* Sidebar Header */}
                <div className="p-4 border-b bg-white dark:bg-gray-900">
                  <div className="flex items-center justify-between">
                    {!sidebarCollapsed && (
                      <div className="flex items-center gap-2">
                        <AnimatedPortnoxLogo width={24} height={24} showText={false} animate={false} />
                        <span className="font-semibold text-sm">Vendor Selection</span>
                        {selectedVendors.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {selectedVendors.length}
                          </Badge>
                        )}
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      className="h-8 w-8 p-0"
                    >
                      {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Sidebar Content */}
                <div className="flex-1 overflow-hidden">
                  {sidebarCollapsed ? (
                    <div className="p-2 space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarCollapsed(false)}
                        className="w-full h-10 p-0"
                        title="Expand vendor selection"
                      >
                        <Menu className="h-4 w-4" />
                      </Button>
                      <div className="text-center">
                        <Badge variant="secondary" className="text-xs">
                          {selectedVendors.length}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <EnhancedVendorSelection
                      selectedVendors={selectedVendors}
                      onVendorToggle={handleVendorToggle}
                      onClearAll={handleClearAll}
                      onSelectRecommended={handleSelectRecommended}
                      darkMode={darkMode}
                    />
                  )}
                </div>
              </motion.div>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-gray-200 dark:bg-gray-700" />

            {/* Main Content Panel */}
            <ResizablePanel defaultSize={sidebarCollapsed ? 95 : 72}>
              <div className="flex flex-col h-full">
                {/* Enhanced Tab Navigation */}
                <div className="border-b bg-white dark:bg-gray-900 px-6 py-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <h2 className="text-lg font-semibold">Analysis Dashboard</h2>
                      {results.length > 0 && (
                        <ProgressiveLoading delay={100}>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <BarChart3 className="w-3 h-3" />
                            {results.length} vendors analyzed
                          </Badge>
                        </ProgressiveLoading>
                      )}
                    </div>
                    
                    {isCalculating && (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                        <span className="text-sm text-muted-foreground">Updating analysis...</span>
                      </div>
                    )}
                  </div>

                  <Tabs defaultValue="costs" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 h-auto bg-gray-100 dark:bg-gray-800">
                      <TabsTrigger
                        value="costs"
                        className="text-sm px-4 py-3 flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                      >
                        <DollarSign className="h-4 w-4" />
                        <span>Cost Analysis</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="roi"
                        className="text-sm px-4 py-3 flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                      >
                        <TrendingUp className="h-4 w-4" />
                        <span>ROI Analysis</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="security"
                        className="text-sm px-4 py-3 flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                      >
                        <Shield className="h-4 w-4" />
                        <span>Security</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="operations"
                        className="text-sm px-4 py-3 flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                      >
                        <Users className="h-4 w-4" />
                        <span>Operations</span>
                      </TabsTrigger>
                    </TabsList>

                    {/* Enhanced Tab Content */}
                    <div className="mt-6">
                      <TabsContent value="costs" className="mt-0">
                        <div className="h-[calc(100vh-240px)] overflow-y-auto pr-4" role="main" aria-label="Cost analysis content">
                          <Suspense fallback={
                            <div className="flex justify-center py-8">
                              <LoadingSpinner message="Loading cost analysis..." />
                            </div>
                          }>
                          <AdvancedCostComparison 
                            results={results} 
                            config={configuration}
                            onExport={handleExportData}
                            onShare={() => toast.info("Share functionality coming soon")}
                          />
                          </Suspense>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="roi" className="mt-0">
                        <div className="h-[calc(100vh-240px)] overflow-y-auto pr-4" role="main" aria-label="ROI analysis content">
                          <Suspense fallback={
                            <div className="flex justify-center py-8">
                              <LoadingSpinner message="Loading ROI analysis..." />
                            </div>
                          }>
                          <ComprehensiveROIAnalysis 
                            results={results} 
                            config={configuration}
                          />
                          </Suspense>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="security" className="mt-0">
                        <div className="h-[calc(100vh-240px)] overflow-y-auto pr-4" role="main" aria-label="Security analysis content">
                          <Suspense fallback={
                            <div className="flex justify-center py-8">
                              <LoadingSpinner message="Loading security analysis..." />
                            </div>
                          }>
                          <InteractiveSecurityDashboard 
                            results={results} 
                            config={configuration}
                          />
                          </Suspense>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="operations" className="mt-0">
                        <div className="h-[calc(100vh-240px)] overflow-y-auto pr-4" role="main" aria-label="Operations analysis content">
                          <Suspense fallback={
                            <div className="flex justify-center py-8">
                              <LoadingSpinner message="Loading operations analysis..." />
                            </div>
                          }>
                          <OperationalEfficiencyChart 
                            results={results} 
                            config={configuration}
                          />
                          </Suspense>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Enhanced Footer */}
        <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AnimatedPortnoxLogo width={100} height={28} showText={true} animate={false} />
              <Separator orientation="vertical" className="h-6" />
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Executive Intelligence Decision Platform</span>
                <span className="mx-2">•</span>
                <span>Powered by Portnox CLEAR</span>
                <span className="mx-2">•</span>
                <span>© 2024 Portnox Ltd.</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {lastUpdated && (
                <span>Last Updated: {lastUpdated.toLocaleDateString()}</span>
              )}
              <Badge variant="outline" className="text-xs">
                {selectedVendors.length} vendors selected
              </Badge>
              <Badge variant="outline" className="text-xs">
                {configuration.devices.toLocaleString()} devices
              </Badge>
              <Badge variant="outline" className="text-xs">
                {configuration.years} year analysis
              </Badge>
              {results.length > 0 && (
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {((results.find(r => r.vendorId === 'portnox')?.roi.percentage || 0)).toFixed(0)}% ROI
                </Badge>
              )}
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                <HelpCircle className="h-3 w-3 mr-1" />
                Help
              </Button>
            </div>
          </div>
        </motion.footer>

        {/* Settings Panel */}
        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setSettingsOpen(false)}
          configuration={configuration}
          onConfigurationChange={handleConfigChange}
          portnoxAddons={configuration.portnoxAddons}
          onAddonsChange={handleAddonsChange}
          darkMode={darkMode}
          onDarkModeChange={setDarkMode}
        />

        <Toaster />
      </div>
    </div>
  )
}