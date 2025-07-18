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
  Clock,
  Activity,
  Sparkles,
  Star,
} from "lucide-react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

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
  const [darkMode, setDarkMode] = useState(true)
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            className="absolute inset-0"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 relative z-10"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"
            ></motion.div>
            <div className="relative z-10">
              <AnimatedPortnoxLogo width={200} height={80} animate={true} />
            </div>
          </div>
          <div className="space-y-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="flex items-center justify-center"
            >
              <div className="relative">
                <Loader2 className="h-16 w-16 text-cyan-400" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0"
                >
                  <Sparkles className="h-16 w-16 text-purple-400" />
                </motion.div>
              </div>
            </motion.div>
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Executive Intelligence Platform
            </motion.h2>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Initializing AI-powered NAC vendor analysis with real-time market intelligence, competitive insights, and
              predictive analytics...
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className="w-96 h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full mx-auto overflow-hidden"
            >
              <motion.div
                animate={{ x: [-100, 500] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="h-full w-32 bg-white rounded-full opacity-80"
              />
            </motion.div>
          </div>
        </motion.div>
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
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      value: "costs",
      label: "Detailed Costs",
      icon: <DollarSign className="h-4 w-4" />,
      component: <DetailedCostsView results={results} config={configuration} />,
      description: "Comprehensive cost breakdown analysis",
      gradient: "from-green-600 to-emerald-600",
    },
    {
      value: "roi",
      label: "ROI Analysis",
      icon: <TrendingUp className="h-4 w-4" />,
      component: <ROIView results={results} config={configuration} />,
      description: "Return on investment calculations",
      gradient: "from-purple-600 to-violet-600",
    },
    {
      value: "security",
      label: "Security Posture",
      icon: <Shield className="h-4 w-4" />,
      component: <SecurityPostureView results={results} config={configuration} />,
      description: "Security metrics and risk assessment",
      gradient: "from-red-600 to-pink-600",
    },
    {
      value: "compliance",
      label: "Compliance & Risk",
      icon: <FileCheck className="h-4 w-4" />,
      component: <ComplianceRiskView results={results} config={configuration} />,
      description: "Regulatory compliance analysis",
      gradient: "from-orange-600 to-amber-600",
    },
    {
      value: "operations",
      label: "Operations Impact",
      icon: <Users className="h-4 w-4" />,
      component: <OperationsImpactView results={results} config={configuration} />,
      description: "Operational efficiency metrics",
      gradient: "from-indigo-600 to-blue-600",
    },
    {
      value: "features",
      label: "Feature Matrix",
      icon: <LayoutGrid className="h-4 w-4" />,
      component: <FeatureMatrixView results={results} config={configuration} />,
      description: "Feature comparison matrix",
      gradient: "from-teal-600 to-cyan-600",
    },
    {
      value: "roadmap",
      label: "Implementation",
      icon: <MapPin className="h-4 w-4" />,
      component: <ImplementationRoadmapView results={results} config={configuration} />,
      description: "Implementation timeline and roadmap",
      gradient: "from-pink-600 to-rose-600",
    },
    {
      value: "business",
      label: "Business Impact",
      icon: <Building2 className="h-4 w-4" />,
      component: <BusinessImpactView results={results} config={configuration} />,
      description: "Business value and impact analysis",
      gradient: "from-slate-600 to-gray-600",
    },
    {
      value: "reports",
      label: "Reports",
      icon: <FileText className="h-4 w-4" />,
      component: <ReportsView results={results} configuration={configuration} />,
      description: "Generate executive reports",
      gradient: "from-yellow-600 to-orange-600",
    },
    {
      value: "market",
      label: "Market Intelligence",
      icon: <Activity className="h-4 w-4" />,
      component: <MarketIntelligenceView results={results} config={configuration} />,
      description: "Real-time market data and insights",
      gradient: "from-emerald-600 to-teal-600",
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
  ]

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-foreground min-h-screen flex flex-col relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
            className="absolute inset-0"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-pink-500/5 to-orange-500/5 rounded-full blur-3xl"
          />
        </div>

        {/* Ultra Modern Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-black/40 backdrop-blur-2xl border-b border-gray-800/50 shadow-2xl sticky top-0 z-50 relative"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
                <AnimatedPortnoxLogo width={180} height={50} showText={true} animate={true} />
              </motion.div>
              <Separator orientation="vertical" className="h-10 bg-gray-700" />
              <div>
                <motion.h1
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  Executive Intelligence Platform
                </motion.h1>
                <motion.p
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-gray-400"
                >
                  AI-powered NAC vendor evaluation with predictive market analytics
                </motion.p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Live Intelligence Indicator */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="hidden lg:flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-700/50 rounded-full backdrop-blur-sm"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                ></motion.div>
                <span className="text-xs font-medium text-green-300">Live Intelligence Active</span>
                <Badge variant="outline" className="text-xs bg-green-900/30 border-green-700 text-green-300">
                  Real-time
                </Badge>
              </motion.div>

              <Sheet open={!sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0 bg-slate-900 border-gray-800">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <AnimatedPortnoxLogo width={24} height={24} showText={false} animate={false} />
                      <span className="font-semibold text-sm text-gray-200">Vendor Selection</span>
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

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSettingsOpen(true)}
                  className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white backdrop-blur-sm"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule Demo
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Compact Live Market Data */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="px-6 pb-3"
          >
            <LiveMarketDashboard mode="compact" selectedVendors={selectedVendors} />
          </motion.div>
        </motion.header>

        {/* Enhanced Results Summary Cards */}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="px-6 py-6 bg-black/20 backdrop-blur-sm border-b border-gray-800/50 relative"
            >
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="border-green-800/50 bg-gradient-to-br from-green-900/30 to-emerald-900/30 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-300">
                        <TrendingUp className="h-4 w-4" />
                        Lowest Cost Solution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-200">
                        {formatCurrency(Math.min(...results.map((r) => r.totalCost)))}
                      </div>
                      <p className="text-xs text-green-400 mt-1">
                        {results.find((r) => r.totalCost === Math.min(...results.map((r) => r.totalCost)))?.vendorName}
                      </p>
                      <Progress value={100} className="mt-3 h-2 bg-green-900/50" />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="border-blue-800/50 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-300">
                        <DollarSign className="h-4 w-4" />
                        Portnox Savings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-200">
                        {portnoxResult ? formatCurrency(avgCompetitorCost - portnoxResult.totalCost) : "N/A"}
                      </div>
                      <p className="text-xs text-blue-400 mt-1">
                        {portnoxResult
                          ? `${Math.round(((avgCompetitorCost - portnoxResult.totalCost) / avgCompetitorCost) * 100)}% reduction`
                          : "vs competitors"}
                      </p>
                      <Progress
                        value={
                          portnoxResult ? ((avgCompetitorCost - portnoxResult.totalCost) / avgCompetitorCost) * 100 : 0
                        }
                        className="mt-3 h-2 bg-blue-900/50"
                      />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="border-purple-800/50 bg-gradient-to-br from-purple-900/30 to-violet-900/30 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2 text-purple-300">
                        <Clock className="h-4 w-4" />
                        Fastest Deployment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-200">
                        {Math.min(...results.map((r) => r.vendorData?.implementation?.timeToDeployDays || 180))} days
                      </div>
                      <p className="text-xs text-purple-400 mt-1">
                        {
                          results.find(
                            (r) =>
                              (r.vendorData?.implementation?.timeToDeployDays || 180) ===
                              Math.min(...results.map((r) => r.vendorData?.implementation?.timeToDeployDays || 180)),
                          )?.vendorName
                        }
                      </p>
                      <Progress value={100} className="mt-3 h-2 bg-purple-900/50" />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="border-orange-800/50 bg-gradient-to-br from-orange-900/30 to-amber-900/30 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-300">
                        <Shield className="h-4 w-4" />
                        Best Security Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-orange-200">
                        {Math.max(...results.map((r) => r.risk?.securityScore || 0))}
                      </div>
                      <p className="text-xs text-orange-400 mt-1">
                        {
                          results.find(
                            (r) =>
                              (r.risk?.securityScore || 0) ===
                              Math.max(...results.map((r) => r.risk?.securityScore || 0)),
                          )?.vendorName
                        }
                      </p>
                      <Progress
                        value={Math.max(...results.map((r) => r.risk?.securityScore || 0))}
                        className="mt-3 h-2 bg-orange-900/50"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Enhanced Portnox Advantage Alert */}
              {portnoxResult && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <Alert className="border-emerald-700/50 bg-gradient-to-r from-emerald-900/30 to-green-900/30 backdrop-blur-sm">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Star className="h-4 w-4 text-emerald-400" />
                    </motion.div>
                    <AlertDescription className="text-emerald-200">
                      <strong className="text-emerald-100">🚀 Portnox CLEAR Advantage:</strong> Save{" "}
                      <strong className="text-white">
                        {formatCurrency(avgCompetitorCost - portnoxResult.totalCost)}
                      </strong>{" "}
                      ({Math.round(((avgCompetitorCost - portnoxResult.totalCost) / avgCompetitorCost) * 100)}%
                      reduction) with <strong className="text-cyan-300">zero infrastructure requirements</strong>,{" "}
                      <strong className="text-purple-300">
                        {Math.round(portnoxResult.roi?.paybackMonths || 6.5)} month payback
                      </strong>
                      , and <strong className="text-pink-300">95% faster deployment</strong> than traditional NAC
                      solutions.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {/* Enhanced Critical Vendor Warnings */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Alert className="border-red-700/50 bg-gradient-to-r from-red-900/30 to-pink-900/30 backdrop-blur-sm">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  </motion.div>
                  <AlertDescription className="text-red-200">
                    <strong className="text-red-100">⚠️ Critical Vendor Warnings:</strong> Ivanti/Pulse Secure requires
                    immediate migration due to active nation-state exploitation. Microsoft NPS lacks modern NAC
                    features. Cloud-only vendors (FoxPass, SecureW2) are limited to WiFi/PKI only.
                  </AlertDescription>
                </Alert>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden relative">
          <ResizablePanelGroup direction="horizontal" className="h-full w-full">
            {/* Enhanced Sidebar Panel */}
            <ResizablePanel
              defaultSize={sidebarCollapsed ? 5 : 28}
              minSize={5}
              maxSize={40}
              className={`${!sidebarOpen ? "hidden md:block" : ""}`}
            >
              <div className="h-full flex flex-col bg-black/20 backdrop-blur-sm border-r border-gray-800/50">
                {/* Sidebar Header */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="p-4 border-b border-gray-800/50 bg-black/30 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    {!sidebarCollapsed && (
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg shadow-lg">
                          <LayoutGrid className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-semibold text-sm text-gray-200">Vendor Selection</span>
                      </div>
                    )}
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
                      >
                        {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Sidebar Content */}
                <div className="flex-1 overflow-hidden">
                  {sidebarCollapsed ? (
                    <div className="p-2 space-y-2">
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSidebarCollapsed(false)}
                          className="w-full h-10 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
                          title="Expand vendor selection"
                        >
                          <Menu className="h-4 w-4" />
                        </Button>
                      </motion.div>
                      <div className="text-center">
                        <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
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

            <ResizableHandle withHandle className="bg-gray-800/50 hover:bg-gray-700 transition-colors duration-200" />

            {/* Enhanced Main Content Panel */}
            <ResizablePanel defaultSize={sidebarCollapsed ? 95 : 72}>
              <div className="flex flex-col h-full">
                {/* Ultra Modern Tab Navigation */}
                <div className="border-b border-gray-800/50 bg-black/30 backdrop-blur-sm px-6 py-3">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-5 lg:grid-cols-11 h-auto bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 p-1">
                      {TABS.map((tab, index) => (
                        <motion.div
                          key={tab.value}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <TabsTrigger
                            value={tab.value}
                            className="text-xs px-3 py-3 flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-800 data-[state=active]:to-gray-700 data-[state=active]:shadow-lg data-[state=active]:text-white relative transition-all duration-200 hover:bg-gray-800/50 rounded-md"
                          >
                            {tab.icon}
                            <span className="hidden sm:inline">{tab.label}</span>
                            {tab.badge && (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                className="absolute -top-1 -right-1"
                              >
                                <Badge className="h-4 w-4 p-0 text-xs bg-red-600 text-white border-0">
                                  {tab.badge}
                                </Badge>
                              </motion.div>
                            )}
                            {activeTab === tab.value && (
                              <motion.div
                                layoutId="activeTab"
                                className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} opacity-20 rounded-md`}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}
                          </TabsTrigger>
                        </motion.div>
                      ))}
                    </TabsList>

                    {/* Enhanced Tab Content with proper spacing */}
                    <div className="mt-6">
                      <AnimatePresence mode="wait">
                        {TABS.map((tab) => (
                          <TabsContent key={tab.value} value={tab.value} className="mt-0 focus-visible:outline-none">
                            {activeTab === tab.value && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                              >
                                <div
                                  className={`p-6 bg-gradient-to-r ${tab.gradient} bg-opacity-10 rounded-xl border border-gray-800/50 backdrop-blur-sm`}
                                >
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className={`p-2 bg-gradient-to-r ${tab.gradient} rounded-lg shadow-lg`}>
                                      {tab.icon}
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">{tab.label}</h2>
                                    {tab.badge && <Badge className="bg-red-600 text-white">{tab.badge} new</Badge>}
                                  </div>
                                  <p className="text-gray-300">{tab.description}</p>
                                </div>
                                <div className="h-[calc(100vh-400px)] overflow-y-auto pr-2 custom-scrollbar">
                                  <div className="pb-6">{tab.component}</div>
                                </div>
                              </motion.div>
                            )}
                          </TabsContent>
                        ))}
                      </AnimatePresence>
                    </div>
                  </Tabs>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Ultra Modern Footer */}
        <motion.footer
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-black/40 backdrop-blur-2xl border-t border-gray-800/50 px-6 py-4 relative"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AnimatedPortnoxLogo width={120} height={32} showText={true} animate={false} />
              <Separator orientation="vertical" className="h-6 bg-gray-700" />
              <div className="text-sm text-gray-400">
                <span className="font-medium text-gray-300">Executive Intelligence Platform</span>
                <span className="mx-2">•</span>
                <span>Powered by Portnox CLEAR</span>
                <span className="mx-2">•</span>
                <span>© 2024 Portnox Ltd.</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-green-400">Live Intelligence Active</span>
              </motion.div>
              <span>Updated: {new Date().toLocaleDateString()}</span>
              <Badge
                variant="outline"
                className="text-xs bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700/50 text-purple-300"
              >
                {selectedVendors.length} vendors
              </Badge>
              <Badge variant="outline" className="text-xs bg-gray-800/50 border-gray-700 text-gray-300">
                {configuration.devices.toLocaleString()} devices
              </Badge>
              <Badge variant="outline" className="text-xs bg-gray-800/50 border-gray-700 text-gray-300">
                {configuration.years}Y analysis
              </Badge>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <HelpCircle className="h-3 w-3 mr-1" />
                  Help
                </Button>
              </motion.div>
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

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.8);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.9);
        }
      `}</style>
    </div>
  )
}
