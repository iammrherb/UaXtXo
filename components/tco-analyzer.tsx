"use client"

import { useState, useCallback, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart3,
  Calculator,
  Shield,
  Target,
  Crown,
  Zap,
  CheckCircle2,
  Settings,
  Download,
  Share,
} from "lucide-react"

import EnhancedVendorSelection from "./enhanced-vendor-selection"
import CSuiteDashboard from "./views/c-suite-dashboard"
import { compareVendors, type CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

export default function TCOAnalyzer() {
  // Configuration state
  const [config, setConfig] = useState<CalculationConfiguration>({
    devices: 1000,
    users: 1200,
    years: 3,
    industry: "technology",
    orgSize: "medium",
    region: "north-america",
    portnoxBasePrice: 60,
    portnoxAddons: {
      atp: false,
      compliance: false,
      iot: false,
      analytics: false,
    },
  })

  // UI state
  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco", "aruba"])
  const [activeTab, setActiveTab] = useState("c-suite")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Calculate results
  const results = useMemo(() => {
    try {
      return compareVendors(selectedVendors, config)
    } catch (error) {
      console.error("Error calculating vendor comparison:", error)
      return []
    }
  }, [selectedVendors, config])

  // Update configuration
  const updateConfig = useCallback((updates: Partial<CalculationConfiguration>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }, [])

  // Handle vendor selection
  const handleVendorToggle = useCallback((vendorId: string) => {
    setSelectedVendors((prev) => {
      if (prev.includes(vendorId)) {
        // Don't allow removing Portnox
        if (vendorId === "portnox") return prev
        return prev.filter((id) => id !== vendorId)
      } else {
        // Limit to 3 vendors
        if (prev.length >= 3) return prev
        return [...prev, vendorId]
      }
    })
  }, [])

  const handleClearAll = useCallback(() => {
    setSelectedVendors(["portnox"]) // Keep Portnox always selected
  }, [])

  const handleSelectRecommended = useCallback(() => {
    setSelectedVendors(["portnox", "cisco", "aruba"])
  }, [])

  // Get summary metrics
  const summaryMetrics = useMemo(() => {
    const portnoxResult = results.find((r) => r.vendorId === "portnox")
    const competitorResults = results.filter((r) => r.vendorId !== "portnox")

    if (!portnoxResult || competitorResults.length === 0) {
      return null
    }

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const percentSavings = avgCompetitorCost > 0 ? (totalSavings / avgCompetitorCost) * 100 : 0

    return {
      totalSavings,
      percentSavings,
      portnoxCost: portnoxResult.totalCost,
      avgCompetitorCost,
      roi: portnoxResult.totalCost > 0 ? (totalSavings / portnoxResult.totalCost) * 100 : 0,
    }
  }, [results])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Ultimate Portnox TCO Analyzer
                </h1>
                <p className="text-xl text-muted-foreground">Enterprise Edition</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive Network Access Control vendor analysis with real-time cost calculations, security
              assessments, and ROI projections across 14 major vendors.
            </p>
          </div>

          {/* Configuration Panel */}
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Vendor Selection & Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EnhancedVendorSelection
                    selectedVendors={selectedVendors}
                    onVendorToggle={handleVendorToggle}
                    onClearAll={handleClearAll}
                    onSelectRecommended={handleSelectRecommended}
                    darkMode={darkMode}
                  />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Devices</label>
                    <input
                      type="number"
                      value={config.devices}
                      onChange={(e) => updateConfig({ devices: Number.parseInt(e.target.value) || 0 })}
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Users</label>
                    <input
                      type="number"
                      value={config.users}
                      onChange={(e) => updateConfig({ users: Number.parseInt(e.target.value) || 0 })}
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Analysis Period</label>
                    <select
                      value={config.years}
                      onChange={(e) => updateConfig({ years: Number.parseInt(e.target.value) })}
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                    >
                      <option value={1}>1 Year</option>
                      <option value={3}>3 Years</option>
                      <option value={5}>5 Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Industry</label>
                    <select
                      value={config.industry}
                      onChange={(e) => updateConfig({ industry: e.target.value as any })}
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                    >
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="education">Education</option>
                      <option value="government">Government</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Organization Size</label>
                    <select
                      value={config.orgSize}
                      onChange={(e) => updateConfig({ orgSize: e.target.value as any })}
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                    >
                      <option value="small">Small (&lt; 500 employees)</option>
                      <option value="medium">Medium (500-5000)</option>
                      <option value="large">Large (5000+ employees)</option>
                    </select>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setDarkMode(!darkMode)} className="w-full">
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Summary Metrics */}
          {summaryMetrics && (
            <Alert className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div>
                    <strong>Total Savings:</strong> {formatCurrency(summaryMetrics.totalSavings)} (
                    {summaryMetrics.percentSavings.toFixed(0)}%)
                  </div>
                  <div>
                    <strong>ROI:</strong> {summaryMetrics.roi.toFixed(0)}%
                  </div>
                  <div>
                    <strong>Portnox TCO:</strong> {formatCurrency(summaryMetrics.portnoxCost)}
                  </div>
                  <div>
                    <strong>Competitor Avg:</strong> {formatCurrency(summaryMetrics.avgCompetitorCost)}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share Analysis
            </Button>
          </div>

          {/* Main Analysis */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-1 lg:grid-cols-3 h-auto p-1">
              <TabsTrigger value="c-suite" className="flex items-center gap-2 p-4">
                <Crown className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">C-Suite Dashboard</div>
                  <div className="text-xs text-muted-foreground">Executive Decision Metrics</div>
                </div>
              </TabsTrigger>
              <TabsTrigger value="detailed-analysis" className="flex items-center gap-2 p-4">
                <BarChart3 className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Detailed Analysis</div>
                  <div className="text-xs text-muted-foreground">Comprehensive Breakdown</div>
                </div>
              </TabsTrigger>
              <TabsTrigger value="competitive" className="flex items-center gap-2 p-4">
                <Zap className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Competitive Advantage</div>
                  <div className="text-xs text-muted-foreground">Portnox vs Competition</div>
                </div>
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <TabsContent value="c-suite" className="space-y-6">
              <CSuiteDashboard results={results} config={config} />
            </TabsContent>

            <TabsContent value="detailed-analysis" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Cost Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {results.map((result) => (
                        <div key={result.vendorId} className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <div className="font-medium capitalize">{result.vendorId}</div>
                            <div className="text-sm text-muted-foreground">{config.years} year total cost</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{formatCurrency(result.totalCost)}</div>
                            <div className="text-sm text-muted-foreground">
                              ${Math.round(result.totalCost / config.devices)}/device
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {results.map((result) => (
                        <div key={result.vendorId} className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <div className="font-medium capitalize">{result.vendorId}</div>
                            <div className="text-sm text-muted-foreground">Security Rating</div>
                          </div>
                          <div className="text-right">
                            <Badge variant={result.vendorId === "portnox" ? "default" : "secondary"}>
                              {result.vendorId === "portnox" ? "95%" : "75-85%"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="competitive" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Portnox Competitive Advantages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100">Cost Advantage</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                          65-75% lower TCO than traditional NAC solutions
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                        <h3 className="font-semibold text-green-900 dark:text-green-100">Security Excellence</h3>
                        <p className="text-sm text-green-700 dark:text-green-200 mt-1">
                          Zero CVEs since inception, 95% Zero Trust maturity
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
                        <h3 className="font-semibold text-purple-900 dark:text-purple-100">Deployment Speed</h3>
                        <p className="text-sm text-purple-700 dark:text-purple-200 mt-1">
                          30 minutes to production vs 3-9 months for competitors
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                        <h3 className="font-semibold text-orange-900 dark:text-orange-100">Operational Efficiency</h3>
                        <p className="text-sm text-orange-700 dark:text-orange-200 mt-1">
                          95% automation, 90% less admin overhead
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
