"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { calculateVendorTCO, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import SettingsPanel from "./settings-panel"
import TCOOverview from "./tco-overview"
import VendorComparison from "./vendor-comparison"
import FeatureMatrix from "./feature-matrix"
import DetailedCostBreakdown from "./detailed-cost-breakdown"
import ROIBusinessValue from "./roi-business-value"
import ComplianceRiskView from "./compliance-risk-view"

import {
  BarChart3,
  LayoutGrid,
  ShieldCheck,
  BarChartHorizontal,
  FilePieChart,
  SlidersHorizontal,
  UsersIcon,
  Settings,
} from "lucide-react"

type CalculationResult = NonNullable<ReturnType<typeof calculateVendorTCO>>

// Enhanced color palette with vibrant Portnox branding
const PORTNOX_COLORS = {
  primary: "#00D4AA",
  primaryDark: "#00A88A",
  primaryLight: "#33DDBB",
  secondary: "#0A1628",
  secondaryLight: "#1A2638",
  accent: "#FF6B35",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
  purple: "#8B5CF6",
  pink: "#EC4899",
  textPrimaryDark: "#E0E0E0",
  textSecondaryDark: "#A0A0A0",
  textPrimaryLight: "#1F2937",
  textSecondaryLight: "#6B7280",
  gradient: {
    primary: "linear-gradient(135deg, #00D4AA 0%, #00A88A 100%)",
    secondary: "linear-gradient(135deg, #0A1628 0%, #1A2638 100%)",
    vibrant: "linear-gradient(135deg, #00D4AA 0%, #3B82F6 50%, #8B5CF6 100%)",
    fire: "linear-gradient(135deg, #FF6B35 0%, #F59E0B 50%, #EF4444 100%)",
    ocean: "linear-gradient(135deg, #00D4AA 0%, #06B6D4 50%, #3B82F6 100%)",
    sunset: "linear-gradient(135deg, #FF6B35 0%, #EC4899 50%, #8B5CF6 100%)",
  },
}

const VIBRANT_COLORS = [
  PORTNOX_COLORS.primary,
  PORTNOX_COLORS.accent,
  PORTNOX_COLORS.info,
  PORTNOX_COLORS.success,
  PORTNOX_COLORS.warning,
  PORTNOX_COLORS.purple,
  PORTNOX_COLORS.pink,
  "#06B6D4",
  "#EF4444",
  "#6366F1",
  "#14B8A6",
  "#F97316",
]

// Animation variants
const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } }
const staggerChildren = { animate: { transition: { staggerChildren: 0.07 } } }
const pulseAnimation = {
  scale: [1, 1.03, 1],
  transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
}

const TABS_CONFIG = [
  { value: "dashboard", label: "Executive Dashboard", icon: <BarChartHorizontal /> },
  { value: "cost-breakdown", label: "Detailed Costs", icon: <FilePieChart /> },
  { value: "roi-analysis", label: "ROI & Business Value", icon: <BarChart3 /> },
  { value: "compliance", label: "Compliance & Risk", icon: <ShieldCheck /> },
  { value: "operations", label: "Operations Impact", icon: <SlidersHorizontal /> },
  { value: "feature-matrix", label: "Feature Matrix", icon: <LayoutGrid /> },
  { value: "vendor-comparison", label: "Vendor Comparison", icon: <UsersIcon /> },
]

interface TCOAnalyzerProps {
  results: { [vendor: string]: CalculationResult }
  selectedVendors: string[]
  darkMode: boolean
  configuration: CalculationConfiguration
  setConfiguration: React.Dispatch<React.SetStateAction<CalculationConfiguration>>
}

const TCOAnalyzer: React.FC<TCOAnalyzerProps> = ({
  results,
  selectedVendors,
  darkMode,
  configuration,
  setConfiguration,
}) => {
  const [activeTab, setActiveTab] = useState(TABS_CONFIG[0].value)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue)
  }

  const toggleSettingsPanel = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  const sortedVendors = useMemo(() => {
    if (!results || Object.keys(results).length === 0) {
      return []
    }

    const vendorsWithTCO = Object.entries(results)
      .filter(([vendor]) => selectedVendors.includes(vendor))
      .sort(([, a], [, b]) => a.totalCostOfOwnership - b.totalCostOfOwnership)
      .map(([vendor]) => vendor)

    return vendorsWithTCO
  }, [results, selectedVendors])

  const bestVendor = sortedVendors.length > 0 ? sortedVendors[0] : null

  const worstVendor = sortedVendors.length > 1 ? sortedVendors[sortedVendors.length - 1] : null

  const vendorComparisonData = useMemo(() => {
    if (!results || Object.keys(results).length === 0) {
      return []
    }

    return Object.entries(results)
      .filter(([vendor]) => selectedVendors.includes(vendor))
      .map(([vendor, data]) => ({
        vendor,
        tco: data.totalCostOfOwnership,
        roi: data.roi,
        complianceScore: data.complianceScore,
        featureScore: data.featureScore,
      }))
  }, [results, selectedVendors])

  const handleConfigurationChange = (newConfiguration: CalculationConfiguration) => {
    setConfiguration(newConfiguration)
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full">
        {/* Header with Tabs and Settings */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-grow">
            <TabsList className="flex space-x-2 lg:space-x-4">
              {TABS_CONFIG.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center space-x-2 data-[state=active]:bg-secondary-foreground data-[state=active]:text-secondary"
                >
                  {tab.icon}
                  <span className="hidden lg:block">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" size="icon" onClick={toggleSettingsPanel}>
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adjust Calculation Settings</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-grow overflow-auto">
          {/* Settings Panel (Sidebar) */}
          <AnimatePresence>
            {isSettingsOpen && (
              <motion.aside
                key="settings-panel"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="w-full md:w-80 border-l border-gray-200 dark:border-gray-700 bg-secondary-background p-4"
              >
                <SettingsPanel
                  configuration={configuration}
                  setConfiguration={setConfiguration}
                  onConfigurationChange={handleConfigurationChange}
                />
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Content Views */}
          <div className="flex-grow p-4">
            <AnimatePresence mode="wait" initial={false}>
              {activeTab === "dashboard" && (
                <motion.div
                  key="dashboard"
                  className="flex flex-col space-y-4"
                  variants={staggerChildren}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div variants={fadeInUp}>
                    <TCOOverview results={results} configuration={configuration} darkMode={darkMode} />
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "cost-breakdown" && (
                <motion.div
                  key="cost-breakdown"
                  className="flex flex-col space-y-4"
                  variants={staggerChildren}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div variants={fadeInUp}>
                    <DetailedCostBreakdown
                      results={results}
                      years={configuration.years}
                      darkMode={darkMode}
                      configuration={configuration}
                    />
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "roi-analysis" && (
                <motion.div
                  key="roi-analysis"
                  className="flex flex-col space-y-4"
                  variants={staggerChildren}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div variants={fadeInUp}>
                    <ROIBusinessValue results={results} configuration={configuration} darkMode={darkMode} />
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "compliance" && (
                <motion.div
                  key="compliance"
                  className="flex flex-col space-y-4"
                  variants={staggerChildren}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div variants={fadeInUp}>
                    <ComplianceRiskView
                      results={results}
                      industry={configuration.industry}
                      selectedVendors={selectedVendors}
                      darkMode={darkMode}
                    />
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "vendor-comparison" && (
                <motion.div
                  key="vendor-comparison"
                  className="flex flex-col space-y-4"
                  variants={staggerChildren}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div variants={fadeInUp}>
                    <VendorComparison results={results} selectedVendors={selectedVendors} darkMode={darkMode} />
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "feature-matrix" && (
                <motion.div
                  key="feature-matrix"
                  className="flex flex-col space-y-4"
                  variants={staggerChildren}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div variants={fadeInUp}>
                    <FeatureMatrix results={results} selectedVendors={selectedVendors} darkMode={darkMode} />
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "operations" && (
                <motion.div
                  key="operations"
                  className="flex flex-col space-y-4"
                  variants={staggerChildren}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div variants={fadeInUp}>
                    <div>Operations View Content</div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default TCOAnalyzer
