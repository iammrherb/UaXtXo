"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { getVendorLogoPath } from "@/lib/comprehensive-vendor-data"
import { type CalculationResult, compareVendors, type CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/lib/utils"
import { cn } from "@/lib/utils"
import EnhancedVendorSelection from "./enhanced-vendor-selection"
import SettingsPanel from "./settings-panel"
import ExecutiveDashboardView from "./executive-dashboard-view"
import FinancialAnalysisView from "./financial-analysis-view"
import CybersecurityPostureView from "./cybersecurity-posture-view"
import BusinessImpactView from "./business-impact-view"
import OperationalAnalysisView from "./operational-analysis-view"
import FeatureMatrixView from "./feature-matrix-view"
import ExecutiveReportView from "./executive-report-view"
import IntegrationHubView from "./integration-hub-view"
import ComplianceRiskView from "./compliance-risk-view"
import SecurityRiskAssessmentView from "./security-risk-assessment-view"
import IndustryAnalysisView from "./industry-analysis-view"
import EnhancedFeatureComparisonView from "./enhanced-feature-comparison-view"
import ImplementationTimelineView from "./implementation-timeline-view"
import MigrationPlanningView from "./migration-planning-view"
import ROICalculatorView from "./roi-calculator-view"
import {
  BarChart3,
  Calculator,
  Shield,
  TrendingUp,
  Users,
  Settings,
  FileText,
  Network,
  AlertTriangle,
  Building2,
  Zap,
  Clock,
  Download,
  Calendar,
  Sun,
  Moon,
  Menu,
  X,
  Star,
  CheckCircle2,
  MapPin,
  Target,
} from "lucide-react"

const NAVIGATION_ITEMS = [
  {
    id: "vendor-selection",
    label: "Vendor Selection",
    icon: <Users className="h-4 w-4" />,
    description: "Choose your comparison vendors",
  },
  {
    id: "tco-analysis",
    label: "TCO Analysis",
    icon: <Calculator className="h-4 w-4" />,
    description: "Total cost of ownership analysis",
  },
  {
    id: "vendor-comparison",
    label: "Vendor Comparison",
    icon: <BarChart3 className="h-4 w-4" />,
    description: "Compare vendors side by side",
  },
  {
    id: "compliance-risk",
    label: "Compliance & Risk",
    icon: <Shield className="h-4 w-4" />,
    description: "Risk assessment and compliance",
  },
  {
    id: "migration-planning",
    label: "Migration Planning",
    icon: <MapPin className="h-4 w-4" />,
    description: "Migration readiness and planning",
  },
  {
    id: "roi-calculator",
    label: "ROI Calculator",
    icon: <Target className="h-4 w-4" />,
    description: "Financial analysis and payback",
  },
  {
    id: "reports",
    label: "Reports",
    icon: <FileText className="h-4 w-4" />,
    description: "Executive reports and analysis",
  },
]

const TCO_VIEWS = [
  { id: "executive-dashboard", label: "Executive Dashboard", icon: <TrendingUp className="h-4 w-4" /> },
  { id: "financial-analysis", label: "Financial Analysis", icon: <Calculator className="h-4 w-4" /> },
  { id: "cybersecurity-posture", label: "Security Posture", icon: <Shield className="h-4 w-4" /> },
  { id: "business-impact", label: "Business Impact", icon: <Building2 className="h-4 w-4" /> },
  { id: "operational-analysis", label: "Operational Analysis", icon: <Users className="h-4 w-4" /> },
]

const VENDOR_COMPARISON_VIEWS = [
  { id: "feature-matrix", label: "Feature Matrix", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "enhanced-feature-comparison", label: "Feature Comparison", icon: <Zap className="h-4 w-4" /> },
  { id: "implementation-timeline", label: "Implementation", icon: <Clock className="h-4 w-4" /> },
  { id: "industry-analysis", label: "Industry Analysis", icon: <Building2 className="h-4 w-4" /> },
]

const COMPLIANCE_VIEWS = [
  { id: "compliance-risk", label: "Compliance Overview", icon: <Shield className="h-4 w-4" /> },
  { id: "security-risk-assessment", label: "Security Assessment", icon: <AlertTriangle className="h-4 w-4" /> },
]

const MIGRATION_VIEWS = [
  { id: "migration-planning", label: "Migration Planning", icon: <MapPin className="h-4 w-4" /> },
]

const ROI_VIEWS = [{ id: "roi-calculator", label: "ROI Calculator", icon: <Target className="h-4 w-4" /> }]

const REPORTS_VIEWS = [
  { id: "executive-report", label: "Executive Report", icon: <FileText className="h-4 w-4" /> },
  { id: "integration-hub", label: "Integration Hub", icon: <Network className="h-4 w-4" /> },
]

export default function TCOAnalyzer() {
  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco", "fortinet", "aruba"])
  const [results, setResults] = useState<CalculationResult[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [activeTab, setActiveTab] = useState("vendor-selection")
  const [activeSubView, setActiveSubView] = useState("executive-dashboard")
  const [showSettings, setShowSettings] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [configuration, setConfiguration] = useState<CalculationConfiguration>({
    devices: 1000,
    users: 2500,
    years: 3,
    industry: "technology",
    companySize: "medium",
    securityLevel: "high",
    complianceRequirements: ["SOC2", "ISO27001"],
    currentSolution: "basic",
    deploymentComplexity: "medium",
    supportLevel: "premium",
    integrationRequirements: ["active-directory", "siem"],
    geographicScope: "multi-region",
    budgetConstraints: "moderate",
  })

  const handleVendorToggle = useCallback((vendorId: string) => {
    setSelectedVendors((prev) => {
      if (prev.includes(vendorId)) {
        return prev.filter((id) => id !== vendorId)
      } else {
        return [...prev, vendorId]
      }
    })
  }, [])

  const handleCalculate = useCallback(async () => {
    if (selectedVendors.length === 0) return

    setIsCalculating(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const calculationResults = compareVendors(selectedVendors, configuration)
      setResults(calculationResults)
      setActiveTab("tco-analysis")
    } catch (error) {
      console.error("Calculation error:", error)
    } finally {
      setIsCalculating(false)
    }
  }, [selectedVendors, configuration])

  const handleExportPDF = () => {
    console.log("Exporting PDF...")
  }

  const handleScheduleDemo = () => {
    console.log("Scheduling demo...")
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  useEffect(() => {
    if (selectedVendors.length > 0 && results.length === 0) {
      handleCalculate()
    }
  }, [selectedVendors, handleCalculate, results.length])

  const getSubViews = (tabId: string) => {
    switch (tabId) {
      case "tco-analysis":
        return TCO_VIEWS
      case "vendor-comparison":
        return VENDOR_COMPARISON_VIEWS
      case "compliance-risk":
        return COMPLIANCE_VIEWS
      case "migration-planning":
        return MIGRATION_VIEWS
      case "roi-calculator":
        return ROI_VIEWS
      case "reports":
        return REPORTS_VIEWS
      default:
        return []
    }
  }

  const renderContent = () => {
    if (activeTab === "vendor-selection") {
      return (
        <EnhancedVendorSelection
          selectedVendors={selectedVendors}
          onVendorToggle={handleVendorToggle}
          onCalculate={handleCalculate}
          configuration={configuration}
        />
      )
    }

    if (results.length === 0 && activeTab !== "vendor-selection") {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Calculator className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Analysis Available</h3>
            <p className="text-muted-foreground mb-4">Select vendors and run calculations to view analysis</p>
            <Button onClick={() => setActiveTab("vendor-selection")}>Select Vendors</Button>
          </div>
        </div>
      )
    }

    switch (activeTab) {
      case "tco-analysis":
        switch (activeSubView) {
          case "executive-dashboard":
            return <ExecutiveDashboardView results={results} config={configuration} />
          case "financial-analysis":
            return <FinancialAnalysisView results={results} config={configuration} />
          case "cybersecurity-posture":
            return <CybersecurityPostureView results={results} config={configuration} />
          case "business-impact":
            return <BusinessImpactView results={results} config={configuration} />
          case "operational-analysis":
            return (
              <OperationalAnalysisView
                selectedVendors={selectedVendors}
                devices={configuration.devices}
                users={configuration.users}
              />
            )
          default:
            return <ExecutiveDashboardView results={results} config={configuration} />
        }

      case "vendor-comparison":
        switch (activeSubView) {
          case "feature-matrix":
            return <FeatureMatrixView selectedVendors={selectedVendors} />
          case "enhanced-feature-comparison":
            return <EnhancedFeatureComparisonView selectedVendors={selectedVendors} />
          case "implementation-timeline":
            return <ImplementationTimelineView selectedVendors={selectedVendors} />
          case "industry-analysis":
            return <IndustryAnalysisView results={results} config={configuration} />
          default:
            return <FeatureMatrixView selectedVendors={selectedVendors} />
        }

      case "compliance-risk":
        switch (activeSubView) {
          case "compliance-risk":
            return <ComplianceRiskView results={results} config={configuration} />
          case "security-risk-assessment":
            return <SecurityRiskAssessmentView results={results} config={configuration} />
          default:
            return <ComplianceRiskView results={results} config={configuration} />
        }

      case "migration-planning":
        switch (activeSubView) {
          case "migration-planning":
            return <MigrationPlanningView selectedVendors={selectedVendors} results={results} config={configuration} />
          default:
            return <MigrationPlanningView selectedVendors={selectedVendors} results={results} config={configuration} />
        }

      case "roi-calculator":
        switch (activeSubView) {
          case "roi-calculator":
            return <ROICalculatorView selectedVendors={selectedVendors} results={results} config={configuration} />
          default:
            return <ROICalculatorView selectedVendors={selectedVendors} results={results} config={configuration} />
        }

      case "reports":
        switch (activeSubView) {
          case "executive-report":
            return <ExecutiveReportView results={results} config={configuration} />
          case "integration-hub":
            return <IntegrationHubView selectedVendors={selectedVendors} config={configuration} />
          default:
            return <ExecutiveReportView results={results} config={configuration} />
        }

      default:
        return <ExecutiveDashboardView results={results} config={configuration} />
    }
  }

  const subViews = getSubViews(activeTab)

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Image src="/portnox-logo.png" alt="Portnox" width={32} height={32} className="rounded-lg" />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                    Total Cost Analyzer
                  </h1>
                  <p className="text-xs text-muted-foreground">Executive Intelligence Decision Platform</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)}>
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button size="sm" onClick={handleScheduleDemo} className="bg-teal-600 hover:bg-teal-700">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Demo
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside
            className={cn(
              "fixed inset-y-0 left-0 z-40 w-80 transform bg-background/95 backdrop-blur border-r transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <div className="flex h-full flex-col">
              <div className="flex-1 overflow-y-auto p-4 pt-20 md:pt-4">
                {/* Vendor Selection Summary */}
                <Card className="mb-6 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm">Vendor Selection</h3>
                    <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                      {selectedVendors.length} selected
                    </span>
                  </div>
                  <div className="space-y-2">
                    {selectedVendors.slice(0, 4).map((vendorId) => (
                      <div key={vendorId} className="flex items-center gap-2">
                        <Image
                          src={getVendorLogoPath(vendorId) || "/placeholder.svg"}
                          alt={vendorId}
                          width={20}
                          height={20}
                          className="rounded"
                        />
                        <span className="text-sm capitalize flex items-center gap-1">
                          {vendorId === "portnox" && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                          {vendorId}
                          {vendorId === "portnox" && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-1 rounded">BEST</span>
                          )}
                        </span>
                        <CheckCircle2 className="h-3 w-3 text-green-600 ml-auto" />
                      </div>
                    ))}
                    {selectedVendors.length > 4 && (
                      <div className="text-xs text-muted-foreground">+{selectedVendors.length - 4} more</div>
                    )}
                  </div>
                </Card>

                {/* Navigation */}
                <nav className="space-y-2">
                  {NAVIGATION_ITEMS.map((item) => (
                    <Tooltip key={item.id}>
                      <TooltipTrigger asChild>
                        <Button
                          variant={activeTab === item.id ? "default" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-3 h-auto p-3",
                            activeTab === item.id && "bg-teal-600 hover:bg-teal-700",
                          )}
                          onClick={() => {
                            setActiveTab(item.id)
                            if (subViews.length > 0) {
                              setActiveSubView(subViews[0].id)
                            }
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            {item.icon}
                            <div className="text-left">
                              <div className="font-medium">{item.label}</div>
                              <div className="text-xs opacity-70">{item.description}</div>
                            </div>
                          </div>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </nav>

                {/* Sub-navigation */}
                {subViews.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-muted-foreground px-2 mb-2">Views</h4>
                      {subViews.map((view) => (
                        <Button
                          key={view.id}
                          variant={activeSubView === view.id ? "secondary" : "ghost"}
                          size="sm"
                          className="w-full justify-start gap-2"
                          onClick={() => setActiveSubView(view.id)}
                        >
                          {view.icon}
                          {view.label}
                        </Button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <div className="container py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTab}-${activeSubView}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </main>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => setShowSettings(false)}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="absolute right-0 top-0 h-full w-96 bg-background border-l"
                onClick={(e) => e.stopPropagation()}
              >
                <SettingsPanel
                  configuration={configuration}
                  onConfigurationChange={setConfiguration}
                  onClose={() => setShowSettings(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isCalculating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-background rounded-lg p-8 text-center"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Analyzing Vendors</h3>
                <p className="text-muted-foreground">Calculating TCO and generating insights...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
}
