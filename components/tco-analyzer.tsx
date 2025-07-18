"use client"

import { useState, useEffect, useMemo } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
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
  AlertTriangle,
  CheckCircle2,
  Clock,
  Activity,
  Globe,
  Sparkles,
} from "lucide-react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

import EnhancedVendorSelection from "./enhanced-vendor-selection"
import SettingsPanel from "./settings-panel"
import ExecutiveDashboardView from "./views/executive-dashboard-view"
import DetailedCostsView from "./views/detailed-costs-view"
import ROIView from "./views/roi-view"
import SecurityPostureView from "./views/security-posture-view"
import ComplianceRiskView from "./views/compliance-risk-view"
import OperationsImpactView from "./views/operations-impact-view"
import FeatureMatrixView from "./views/feature-matrix-view"
import ImplementationRoadmapView from "./views/implementation-roadmap-view"
import BusinessImpactView from "./views/business-impact-view"
import ReportsView from "./views/reports-view"
import MarketIntelligenceView from "./views/market-intelligence-view"
import AnimatedPortnoxLogo from "./animated-portnox-logo"
import LiveMarketDashboard from "./live-market-dashboard"

import { compareVendors } from "@/lib/enhanced-tco-calculator"
import type { CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { useMarketAlerts } from "@/lib/hooks/use-market-data"

const DEFAULT_VENDORS = ["portnox", "cisco", "aruba", "forescout"]

export default function TcoAnalyzerUltimate() {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("executive")

  const [configuration, setConfiguration] = useState<CalculationConfiguration>({
    devices: 2500,
    users: 1500,
    industry: "technology",
    orgSize: "medium",
    years: 3,
    region: "north-america",
    portnoxBasePrice: 4.0,
    portnoxAddons: { atp: false, compliance: false, iot: false, analytics: false },
  })

  const [selectedVendors, setSelectedVendors] = useState<string[]>(DEFAULT_VENDORS)
  const { unreadCount } = useMarketAlerts()

  // Calculate results
  const results = useMemo(() => {
    if (!isLoading) {
      return compareVendors(selectedVendors, configuration)
    }
    return []
  }, [selectedVendors, configuration, isLoading])

  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const avgCompetitorCost =
    results.filter((r) => r.vendorId !== "portnox").reduce((sum, r) => sum + r.totalCost, 0) /
    Math.max(1, results.filter((r) => r.vendorId !== "portnox").length)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  useEffect(() => {
    setIsClient(true)
    // Load from localStorage
    try {
      const saved = localStorage.getItem("portnox-tco-config")
      if (saved) {
        const { configuration: savedConfig, selectedVendors: savedVendors, darkMode: savedDarkMode } = JSON.parse(saved)
        if (savedConfig) setConfiguration(savedConfig)
        if (savedVendors) setSelectedVendors(savedVendors)
        if (typeof savedDarkMode === "boolean") setDarkMode(savedDarkMode)
      }
    } catch (error) {
      console.error("Failed to load from localStorage", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      // Save to localStorage
      localStorage.setItem("portnox-tco-config", JSON.stringify({ configuration, selectedVendors, darkMode }))
    }
  }, [selectedVendors, configuration, darkMode, isLoading])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleVendorToggle = (vendorId: string) => {
    setSelectedVendors((prev) => (prev.includes(vendorId) ? prev.filter((v) => v !== vendorId) : [...prev, vendorId]))
    toast(`${vendorId} selection updated.`)
  }

  const handleClearAll = () => {
    setSelectedVendors([])
    toast("All vendors cleared.")
  }

  const handleSelectRecommended = () => {
    setSelectedVendors(DEFAULT_VENDORS)
    toast("Recommended vendors selected.")
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

  if (!isClient || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <AnimatedPortnoxLogo width={160} height={60} animate={true} />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <Sparkles className="h-6 w-6 text-purple-600 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Executive Intelligence Decision Platform
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Loading comprehensive NAC vendor analysis and market intelligence...
            </p>
            <div className="w-80 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const TABS = [
    {
      value: "executive",
      label: "Executive Dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
      component: <ExecutiveDashboardView results={results} config={configuration} />,
      description: "High-level KPIs and strategic insights",
    },
    {
      value: "costs",
      label: "Detailed Costs",
      icon: <DollarSign className="h-4 w-4" />,
      component: <DetailedCostsView results={results} config={configuration} />,
      description: "Comprehensive cost breakdown analysis",
    },
    {
      value: "roi",
      label: "ROI Analysis",
      icon: <TrendingUp className="h-4 w-4" />,
      component: <ROIView results={results} config={configuration} />,
      description: "Return on investment calculations",
    },
    {
      value: "security",
      label: "Security Posture",
      icon: <Shield className="h-4 w-4" />,
      component: <SecurityPostureView results={results} config={configuration} />,
      description: "Security metrics and risk assessment",
    },
    {
      value: "compliance",
      label: "Compliance & Risk",
      icon: <FileCheck className="h-4 w-4" />,
      component: <ComplianceRiskView results={results} config={configuration} />,
      description: "Regulatory compliance analysis",
    },
    {
      value: "operations",
      label: "Operations Impact",
      icon: <Users className="h-4 w-4" />,
      component: <OperationsImpactView results={results} config={configuration} />,
      description: "Operational efficiency metrics",
    },
    {
      value: "features",
      label: "Feature Matrix",
      icon: <LayoutGrid className="h-4 w-4" />,
      component: <FeatureMatrixView results={results} config={configuration} />,
      description: "Feature comparison matrix",
    },
    {
      value: "roadmap",
      label: "Implementation",
      icon: <MapPin className="h-4 w-4" />,
      component: <ImplementationRoadmapView results={results} config={configuration} />,
      description: "Implementation timeline and roadmap",
    },
    {
      value: "business",
      label: "Business Impact",
      icon: <Building2 className="h-4 w-4" />,
      component: <BusinessImpactView results={results} config={configuration} />,
      description: "Business value and impact analysis",
    },
    {
      value: "reports",
      label: "Reports",
      icon: <FileText className="h-4 w-4" />,
      component: <ReportsView results={results} configuration={configuration} />,
      description: "Generate executive reports",
    },
    {
      value: "market",
      label: "Market Intelligence",
      icon: <Activity className="h-4 w-4" />,
      component: <MarketIntelligenceView results={results} config={configuration} />,
      description: "Real-time market data and insights",
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
  ]

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-foreground min-h-screen flex flex-col">
        {/* Modern Header */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                </div>
                <AnimatedPortnoxLogo width={140} height={40} showText={true} animate={true} />
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Executive Intelligence Decision Platform
                </h1>
                <p className="text-sm text-muted-foreground">
                  AI-powered NAC vendor evaluation with real-time market intelligence
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Live Market Data Indicator */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700 dark:text-green-300">Live Data</span>
              </div>

              <Badge
                variant="outline"
                className="hidden md:flex bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
              >
                v3.0 Pro
              </Badge>

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

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSettingsOpen(true)}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>

              <Button
                size="sm"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Schedule Demo
              </Button>
            </div>
          </div>

          {/* Live Market Data Compact View */}
          <div className="px-6 pb-4">
            <LiveMarketDashboard mode="compact" selectedVendors={selectedVendors} />
          </div>
        </header>

        {/* Results Summary Cards */}
        {results.length > 0 && (
          <div className="px-6 py-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-700 dark:text-green-300">
                    <TrendingUp className="h-4 w-4" />
                    Lowest Cost Solution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                    {formatCurrency(Math.min(...results.map((r) => r.totalCost)))}
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    {results.find((r) => r.totalCost === Math.min(...results.map((r) => r.totalCost)))?.vendorName}
                  </p>
                  <Progress value={100} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <DollarSign className="h-4 w-4" />
                    Portnox Savings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                    {portnoxResult ? formatCurrency(avgCompetitorCost - portnoxResult.totalCost) : "N/A"}
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    {portnoxResult
                      ? `${Math.round(((avgCompetitorCost - portnoxResult.totalCost) / avgCompetitorCost) * 100)}% reduction`
                      : "vs competitors"}
                  </p>
                  <Progress
                    value={
                      portnoxResult ? ((avgCompetitorCost - portnoxResult.totalCost) / avgCompetitorCost) * 100 : 0
                    }
                    className="mt-2 h-2"
                  />
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-purple-700 dark:text-purple-300">
                    <Clock className="h-4 w-4" />
                    Fastest Deployment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                    {Math.min(...results.map((r) => r.vendorData?.implementation?.timeToDeployDays || 180))} days
                  </div>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                    {
                      results.find(
                        (r) =>
                          (r.vendorData?.implementation?.timeToDeployDays || 180) ===
                          Math.min(...results.map((r) => r.vendorData?.implementation?.timeToDeployDays || 180)),
                      )?.vendorName
                    }
                  </p>
                  <Progress value={100} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-700 dark:text-orange-300">
                    <Shield className="h-4 w-4" />
                    Best Security Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                    {Math.max(...results.map((r) => r.risk?.securityScore || 0))}
                  </div>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                    {
                      results.find(
                        (r) =>
                          (r.risk?.securityScore || 0) === Math.max(...results.map((r) => r.risk?.securityScore || 0)),
                      )?.vendorName
                    }
                  </p>
                  <Progress value={Math.max(...results.map((r) => r.risk?.securityScore || 0))} className="mt-2 h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Portnox Advantage Alert */}
            {portnoxResult && (
              <Alert className="mt-4 border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <AlertDescription className="text-emerald-700 dark:text-emerald-300">
                  <strong>🚀 Portnox CLEAR Advantage:</strong> Save{" "}
                  <strong>{formatCurrency(avgCompetitorCost - portnoxResult.totalCost)}</strong> (
                  {Math.round(((avgCompetitorCost - portnoxResult.totalCost) / avgCompetitorCost) * 100)}% reduction)
                  with <strong>zero infrastructure requirements</strong>,{" "}
                  <strong>{Math.round(portnoxResult.roi?.paybackMonths || 6.5)} month payback</strong>, and{" "}
                  <strong>95% faster deployment</strong> than traditional NAC solutions.
                </AlertDescription>
              </Alert>
            )}

            {/* Critical Vendor Warnings */}
            <Alert className="mt-4 border-red-200 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700 dark:text-red-300">
                <strong>⚠️ Critical Vendor Warnings:</strong> Ivanti/Pulse Secure requires immediate migration due to
                active nation-state exploitation. Microsoft NPS lacks modern NAC features. Cloud-only vendors (FoxPass,
                SecureW2) are limited to WiFi/PKI only.
              </AlertDescription>
            </Alert>
          </div>
        )}

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
              <div className="h-full flex flex-col bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/50">
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    {!sidebarCollapsed && (
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md">
                          <LayoutGrid className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-semibold text-sm">Vendor Selection</span>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
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
              </div>
            </ResizablePanel>

            <ResizableHandle
              withHandle
              className="bg-gray-200/50 dark:bg-gray-700/50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            />

            {/* Main Content Panel */}
            <ResizablePanel defaultSize={sidebarCollapsed ? 95 : 72}>
              <div className="flex flex-col h-full">
                {/* Enhanced Tab Navigation */}
                <div className="border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 py-2">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-5 lg:grid-cols-11 h-auto bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm">
                      {TABS.map((tab) => (
                        <TabsTrigger
                          key={tab.value}
                          value={tab.value}
                          className="text-xs px-2 py-2 flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm relative"
                        >
                          {tab.icon}
                          <span className="hidden sm:inline">{tab.label}</span>
                          {tab.badge && (
                            <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-red-600 text-white">
                              {tab.badge}
                            </Badge>
                          )}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {/* Tab Content with Enhanced Styling */}
                    <div className="mt-4">
                      {TABS.map((tab) => (
                        <TabsContent key={tab.value} value={tab.value} className="mt-0">
                          <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                            <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">{tab.label}</h2>
                            <p className="text-sm text-blue-700 dark:text-blue-300">{tab.description}</p>
                          </div>
                          <div className="h-[calc(100vh-300px)] overflow-y-auto pr-2">
                            <div className="space-y-6">{tab.component}</div>
                          </div>
                        </TabsContent>
                      ))}
                    </div>
                  </Tabs>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Enhanced Footer */}
        <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 px-6 py-4">
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
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Data Active</span>
              </div>
              <span>Last Updated: {new Date().toLocaleDateString()}</span>
              <Badge
                variant="outline"
                className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
              >
                {selectedVendors.length} vendors selected
              </Badge>
              <Badge variant="outline" className="text-xs">
                {configuration.devices.toLocaleString()} devices
              </Badge>
              <Badge variant="outline" className="text-xs">
                {configuration.years} year analysis
              </Badge>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-800">
                <HelpCircle className="h-3 w-3 mr-1" />
                Help
              </Button>
            </div>
          </div>
        </footer>

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
