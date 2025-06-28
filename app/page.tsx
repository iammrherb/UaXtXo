"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Calculator, Settings, BarChart3, Shield, TrendingUp, Users, Building, Clock, DollarSign } from "lucide-react"

// Import components
import EnhancedVendorSelection from "@/components/enhanced-vendor-selection"
import DetailedCostBreakdown from "@/components/detailed-cost-breakdown"
import ROIBusinessValue from "@/components/roi-business-value"
import SettingsPanel from "@/components/settings-panel"
import ComplianceRiskView from "@/components/compliance-risk-view"
import TCOAnalyzer from "@/components/tco-analyzer"

// Import calculation functions
import { compareVendors, type CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

export default function PortnoxTCOCalculator() {
  const [activeView, setActiveView] = useState("overview")
  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco", "aruba"])
  const [showSettings, setShowSettings] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Configuration state with proper defaults
  const [configuration, setConfiguration] = useState<CalculationConfiguration>({
    orgSize: "medium",
    devices: 2500,
    users: 1500,
    industry: "technology",
    years: 3,
    region: "north-america",
    portnoxBasePrice: 3.0,
    portnoxAddons: {
      atp: false,
      compliance: false,
      iot: false,
      analytics: false,
    },
  })

  const [portnoxAddons, setPortnoxAddons] = useState({
    atp: false,
    compliance: false,
    iot: false,
    analytics: false,
  })

  // Load saved configuration on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("portnox-tco-config")
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.configuration) {
          // Ensure all required fields have default values
          const mergedConfig = {
            orgSize: "medium",
            devices: 2500,
            users: 1500,
            industry: "technology",
            years: 3,
            region: "north-america",
            portnoxBasePrice: 3.0,
            portnoxAddons: {
              atp: false,
              compliance: false,
              iot: false,
              analytics: false,
            },
            ...parsed.configuration,
          }
          setConfiguration(mergedConfig)
        }
        if (parsed.portnoxAddons) setPortnoxAddons(parsed.portnoxAddons)
        if (typeof parsed.darkMode === "boolean") setDarkMode(parsed.darkMode)
      }
    } catch (error) {
      console.error("Failed to load saved configuration:", error)
    }
  }, [])

  // Memoize the calculation results to prevent infinite re-renders
  const results = useMemo(() => {
    try {
      // Ensure configuration has all required values
      const safeConfig = {
        ...configuration,
        devices: configuration.devices || 2500,
        users: configuration.users || 1500,
        years: configuration.years || 3,
        portnoxBasePrice: configuration.portnoxBasePrice || 3.0,
        portnoxAddons: configuration.portnoxAddons || {
          atp: false,
          compliance: false,
          iot: false,
          analytics: false,
        },
      }

      return compareVendors(selectedVendors, safeConfig)
    } catch (error) {
      console.error("Calculation error:", error)
      return []
    }
  }, [configuration, selectedVendors])

  const handleConfigurationChange = useCallback((newConfig: Partial<CalculationConfiguration>) => {
    setConfiguration((prev) => ({
      ...prev,
      ...newConfig,
      // Ensure numeric values are valid
      devices: typeof newConfig.devices === "number" ? newConfig.devices : prev.devices,
      users: typeof newConfig.users === "number" ? newConfig.users : prev.users,
      years: typeof newConfig.years === "number" ? newConfig.years : prev.years,
      portnoxBasePrice:
        typeof newConfig.portnoxBasePrice === "number" ? newConfig.portnoxBasePrice : prev.portnoxBasePrice,
    }))
  }, [])

  const handleVendorSelectionChange = useCallback((vendors: string[]) => {
    setSelectedVendors(vendors)
  }, [])

  const views = [
    {
      id: "overview",
      label: "TCO Overview",
      icon: BarChart3,
      description: "Executive summary and key metrics",
    },
    {
      id: "breakdown",
      label: "Cost Breakdown",
      icon: Calculator,
      description: "Detailed cost analysis by category",
    },
    {
      id: "roi",
      label: "ROI & Business Value",
      icon: TrendingUp,
      description: "Return on investment and business impact",
    },
    {
      id: "compliance",
      label: "Compliance & Risk",
      icon: Shield,
      description: "Security posture and compliance analysis",
    },
    {
      id: "comparison",
      label: "Vendor Comparison",
      icon: Users,
      description: "Side-by-side vendor analysis",
    },
  ]

  // Calculate savings for display
  const savings = useMemo(() => {
    if (results.length < 2) return null

    const portnoxResult = results.find((r) => r.vendor === "portnox")
    const competitorResults = results.filter((r) => r.vendor !== "portnox")

    if (!portnoxResult || competitorResults.length === 0) return null

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + (r.total || 0), 0) / competitorResults.length
    const savingsAmount = avgCompetitorCost - portnoxResult.total

    return savingsAmount > 0 ? savingsAmount : 0
  }, [results])

  return (
    <div className={cn("min-h-screen transition-colors duration-300", darkMode ? "dark bg-gray-900" : "bg-gray-50")}>
      {/* Header */}
      <header
        className={cn(
          "border-b transition-colors",
          darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img src="/portnox-logo.png" alt="Portnox" className="h-8 w-auto" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">TCO Calculator</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Cost of Ownership Analysis</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:flex">
                v3.0
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="gap-2 bg-transparent"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Building className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Devices</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(configuration.devices || 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Users</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(configuration.users || 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Analysis Period</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{configuration.years || 3} years</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Portnox Savings</p>
                  <p className="text-2xl font-bold text-green-600">${(savings || 0).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            {views.map((view) => (
              <TabsTrigger key={view.id} value={view.id} className="gap-2">
                <view.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{view.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Content Areas */}
          <TabsContent value="overview">
            <TCOAnalyzer
              results={results}
              configuration={configuration}
              onConfigurationChange={handleConfigurationChange}
              selectedVendors={selectedVendors}
              onVendorSelectionChange={handleVendorSelectionChange}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="breakdown">
            <DetailedCostBreakdown results={results} configuration={configuration} selectedVendors={selectedVendors} />
          </TabsContent>

          <TabsContent value="roi">
            <ROIBusinessValue results={results} configuration={configuration} selectedVendors={selectedVendors} />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceRiskView results={results} configuration={configuration} selectedVendors={selectedVendors} />
          </TabsContent>

          <TabsContent value="comparison">
            <EnhancedVendorSelection
              selectedVendors={selectedVendors}
              onVendorChange={handleVendorSelectionChange}
              configuration={configuration}
              onConfigurationChange={handleConfigurationChange}
              results={results}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        configuration={configuration}
        onConfigurationChange={handleConfigurationChange}
        portnoxAddons={portnoxAddons}
        onAddonsChange={setPortnoxAddons}
        darkMode={darkMode}
        onDarkModeChange={setDarkMode}
      />
    </div>
  )
}
