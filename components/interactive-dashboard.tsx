"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ScatterChart,
  Scatter,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import {
  Filter,
  RefreshCw,
  Download,
  Eye,
  EyeOff,
  TrendingUp,
  DollarSign,
  Shield,
  Clock,
  Target,
  BarChart3,
  Activity,
  Zap,
  X,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ENHANCED_VENDOR_DATABASE, calculateTCO, type CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface FilterState {
  selectedVendors: string[]
  priceRange: [number, number]
  timeframe: number
  industries: string[]
  deploymentModels: string[]
  complianceFrameworks: string[]
  securityScoreRange: [number, number]
  implementationTimeRange: [number, number]
  showOnlyRecommended: boolean
  sortBy: "cost" | "roi" | "security" | "implementation"
  sortOrder: "asc" | "desc"
}

interface ChartConfig {
  type: "bar" | "line" | "area" | "pie" | "scatter" | "radar"
  dataKey: string
  title: string
  visible: boolean
  color: string
}

interface InteractiveDashboardProps {
  initialConfig: CalculationConfiguration
  onConfigChange?: (config: CalculationConfiguration) => void
}

const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4", "#84CC16", "#F59E0B"]

export default function InteractiveDashboard({ initialConfig, onConfigChange }: InteractiveDashboardProps) {
  // Stabilize the initial config to prevent infinite loops
  const stableInitialConfig = useMemo(() => initialConfig, [])

  const [config, setConfig] = useState<CalculationConfiguration>(stableInitialConfig)
  const [filters, setFilters] = useState<FilterState>(() => ({
    selectedVendors: Object.keys(ENHANCED_VENDOR_DATABASE),
    priceRange: [0, 500000],
    timeframe: 3,
    industries: [stableInitialConfig.industry],
    deploymentModels: ["cloud", "on-premise", "hybrid"],
    complianceFrameworks: [],
    securityScoreRange: [0, 100],
    implementationTimeRange: [0, 120],
    showOnlyRecommended: false,
    sortBy: "cost",
    sortOrder: "asc",
  }))

  const [chartConfigs, setChartConfigs] = useState<ChartConfig[]>([
    { type: "bar", dataKey: "totalCost", title: "Total Cost Comparison", visible: true, color: "#00D4AA" },
    { type: "line", dataKey: "roi", title: "ROI Analysis", visible: true, color: "#0EA5E9" },
    { type: "scatter", dataKey: "security", title: "Security vs Cost", visible: true, color: "#8B5CF6" },
    { type: "radar", dataKey: "capabilities", title: "Vendor Capabilities", visible: true, color: "#EF4444" },
  ])

  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false) // Start disabled to prevent immediate updates
  const [refreshInterval, setRefreshInterval] = useState(5000)
  const [showFilters, setShowFilters] = useState(true)
  const [selectedMetric, setSelectedMetric] = useState<string>("totalCost")
  const [comparisonMode, setComparisonMode] = useState<"absolute" | "relative">("absolute")

  const refreshIntervalRef = useRef<NodeJS.Timeout>()
  const configUpdateTimeoutRef = useRef<NodeJS.Timeout>()

  // Calculate TCO data with current configuration - memoized to prevent recalculation
  const tcoData = useMemo(() => {
    try {
      return calculateTCO(config)
    } catch (error) {
      console.error("Error calculating TCO:", error)
      return {}
    }
  }, [config])

  // Filter and process vendor data - memoized with stable dependencies
  const filteredVendorData = useMemo(() => {
    if (!tcoData || Object.keys(tcoData).length === 0) {
      return []
    }

    try {
      const vendorEntries = Object.entries(tcoData)
        .filter(([vendorId]) => filters.selectedVendors.includes(vendorId))
        .map(([vendorId, data]) => {
          const vendor = ENHANCED_VENDOR_DATABASE[vendorId]
          if (!vendor || !data) return null

          return {
            id: vendorId,
            name: vendor.name,
            category: vendor.category,
            totalCost: data.totalCost || 0,
            year1: data.year1 || 0,
            year3: data.year3 || 0,
            year5: data.year5 || 0,
            roi: data.roi?.percentage || 0,
            roiSavings: (data.roi?.operationalSavings || 0) + (data.roi?.complianceSavings || 0),
            paybackPeriod: data.roi?.paybackPeriod || 0,
            securityScore: vendor.capabilities?.security || 0,
            implementationTime: vendor.implementation?.timeToValue || 0,
            deploymentModels: vendor.deployment || [],
            complianceFrameworks: vendor.compliance?.frameworks || [],
            automation: vendor.capabilities?.automation || 0,
            scalability: vendor.capabilities?.scalability || 0,
            integration: vendor.capabilities?.integration || 0,
            usability: vendor.capabilities?.usability || 0,
          }
        })
        .filter((vendor): vendor is NonNullable<typeof vendor> => vendor !== null)
        .filter((vendor) => {
          // Apply filters safely
          if (vendor.totalCost < filters.priceRange[0] || vendor.totalCost > filters.priceRange[1]) return false
          if (
            vendor.securityScore < filters.securityScoreRange[0] ||
            vendor.securityScore > filters.securityScoreRange[1]
          )
            return false
          if (
            vendor.implementationTime < filters.implementationTimeRange[0] ||
            vendor.implementationTime > filters.implementationTimeRange[1]
          )
            return false

          // Deployment model filter
          if (filters.deploymentModels.length > 0) {
            const hasMatchingDeployment = vendor.deploymentModels.some((model) =>
              filters.deploymentModels.includes(model),
            )
            if (!hasMatchingDeployment) return false
          }

          // Compliance framework filter
          if (filters.complianceFrameworks.length > 0) {
            const hasMatchingCompliance = vendor.complianceFrameworks.some((framework) =>
              filters.complianceFrameworks.includes(framework),
            )
            if (!hasMatchingCompliance) return false
          }

          return true
        })

      // Sort data safely
      const sortedData = [...vendorEntries].sort((a, b) => {
        let aValue: number, bValue: number

        switch (filters.sortBy) {
          case "cost":
            aValue = a.totalCost
            bValue = b.totalCost
            break
          case "roi":
            aValue = a.roi
            bValue = b.roi
            break
          case "security":
            aValue = a.securityScore
            bValue = b.securityScore
            break
          case "implementation":
            aValue = a.implementationTime
            bValue = b.implementationTime
            break
          default:
            aValue = a.totalCost
            bValue = b.totalCost
        }

        return filters.sortOrder === "asc" ? aValue - bValue : bValue - aValue
      })

      return sortedData
    } catch (error) {
      console.error("Error filtering vendor data:", error)
      return []
    }
  }, [tcoData, filters])

  // Chart data preparation - memoized to prevent recalculation
  const chartData = useMemo(() => {
    if (!filteredVendorData || filteredVendorData.length === 0) {
      return {
        costComparison: [],
        roiAnalysis: [],
        securityVsCost: [],
        capabilities: [],
        timeline: [],
      }
    }

    return {
      costComparison: filteredVendorData.map((vendor) => ({
        name: vendor.name,
        totalCost: vendor.totalCost,
        year1: vendor.year1,
        year3: vendor.year3,
        year5: vendor.year5,
      })),
      roiAnalysis: filteredVendorData.map((vendor) => ({
        name: vendor.name,
        roi: vendor.roi,
        savings: vendor.roiSavings,
        payback: vendor.paybackPeriod,
      })),
      securityVsCost: filteredVendorData.map((vendor) => ({
        name: vendor.name,
        security: vendor.securityScore,
        cost: vendor.totalCost,
        category: vendor.category,
      })),
      capabilities: filteredVendorData.map((vendor) => ({
        name: vendor.name,
        automation: vendor.automation,
        scalability: vendor.scalability,
        integration: vendor.integration,
        security: vendor.securityScore,
        usability: vendor.usability,
      })),
      timeline: filteredVendorData.map((vendor) => ({
        name: vendor.name,
        implementation: vendor.implementationTime,
        payback: vendor.paybackPeriod * 30, // Convert months to days
      })),
    }
  }, [filteredVendorData])

  // Debounced config update to prevent infinite loops
  const debouncedConfigUpdate = useCallback(
    (newConfig: CalculationConfiguration) => {
      if (configUpdateTimeoutRef.current) {
        clearTimeout(configUpdateTimeoutRef.current)
      }

      configUpdateTimeoutRef.current = setTimeout(() => {
        if (onConfigChange) {
          onConfigChange(newConfig)
        }
      }, 300) // 300ms debounce
    },
    [onConfigChange],
  )

  // Real-time updates with proper cleanup
  useEffect(() => {
    if (isRealTimeEnabled && refreshInterval > 0) {
      refreshIntervalRef.current = setInterval(() => {
        // Simulate real-time data updates (in a real app, this would fetch new data)
        setConfig((prev) => {
          const deviceCountChange = Math.floor(Math.random() * 10) - 5
          const newDeviceCount = Math.max(1, prev.deviceCount + deviceCountChange)

          if (newDeviceCount !== prev.deviceCount) {
            return { ...prev, deviceCount: newDeviceCount }
          }
          return prev
        })
      }, refreshInterval)
    } else {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
        refreshIntervalRef.current = undefined
      }
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
      }
    }
  }, [isRealTimeEnabled, refreshInterval])

  // Update parent configuration with debouncing
  useEffect(() => {
    debouncedConfigUpdate(config)
  }, [config, debouncedConfigUpdate])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
      }
      if (configUpdateTimeoutRef.current) {
        clearTimeout(configUpdateTimeoutRef.current)
      }
    }
  }, [])

  // Memoized update functions to prevent unnecessary re-renders
  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters((prev) => {
      if (prev[key] === value) return prev // Prevent unnecessary updates
      return { ...prev, [key]: value }
    })
  }, [])

  const updateChartConfig = useCallback((index: number, updates: Partial<ChartConfig>) => {
    setChartConfigs((prev) => prev.map((config, i) => (i === index ? { ...config, ...updates } : config)))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({
      selectedVendors: Object.keys(ENHANCED_VENDOR_DATABASE),
      priceRange: [0, 500000],
      timeframe: 3,
      industries: [config.industry],
      deploymentModels: ["cloud", "on-premise", "hybrid"],
      complianceFrameworks: [],
      securityScoreRange: [0, 100],
      implementationTimeRange: [0, 120],
      showOnlyRecommended: false,
      sortBy: "cost",
      sortOrder: "asc",
    })
  }, [config.industry])

  const exportData = useCallback(async (format: "pdf" | "excel" | "csv") => {
    // Implementation would use the export utilities
    console.log(`Exporting data as ${format}`)
  }, [])

  // Memoized handlers to prevent re-renders
  const handleVendorToggle = useCallback(
    (vendorId: string, checked: boolean) => {
      updateFilter(
        "selectedVendors",
        checked ? [...filters.selectedVendors, vendorId] : filters.selectedVendors.filter((v) => v !== vendorId),
      )
    },
    [filters.selectedVendors, updateFilter],
  )

  const handlePriceRangeChange = useCallback(
    (value: number[]) => {
      updateFilter("priceRange", value as [number, number])
    },
    [updateFilter],
  )

  const handleSecurityRangeChange = useCallback(
    (value: number[]) => {
      updateFilter("securityScoreRange", value as [number, number])
    },
    [updateFilter],
  )

  const handleSortChange = useCallback(
    (value: string) => {
      updateFilter("sortBy", value)
    },
    [updateFilter],
  )

  const handleSortOrderChange = useCallback(
    (checked: boolean) => {
      updateFilter("sortOrder", checked ? "desc" : "asc")
    },
    [updateFilter],
  )

  // Custom tooltip component - memoized
  const CustomTooltip = useCallback(({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }, [])

  // Memoized metrics to prevent recalculation
  const keyMetrics = useMemo(() => {
    if (filteredVendorData.length === 0) {
      return {
        lowestCost: 0,
        highestROI: 0,
        avgSecurity: 0,
        fastestDeploy: 0,
      }
    }

    return {
      lowestCost: Math.min(...filteredVendorData.map((v) => v.totalCost)),
      highestROI: Math.max(...filteredVendorData.map((v) => v.roi)),
      avgSecurity: filteredVendorData.reduce((sum, v) => sum + v.securityScore, 0) / filteredVendorData.length,
      fastestDeploy: Math.min(...filteredVendorData.map((v) => v.implementationTime)),
    }
  }, [filteredVendorData])

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Interactive Dashboard</h2>
          <p className="text-muted-foreground">Real-time vendor analysis with advanced filtering</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "Hide" : "Show"} Filters
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}>
            {isRealTimeEnabled ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
            Real-time
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportData("pdf")}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Real-time Status */}
      {isRealTimeEnabled && (
        <Alert>
          <Activity className="h-4 w-4" />
          <AlertDescription>
            Real-time updates enabled. Data refreshes every {refreshInterval / 1000} seconds.
            <Button variant="ghost" size="sm" className="ml-2" onClick={() => setIsRealTimeEnabled(false)}>
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Filter className="h-5 w-5" />
                    <span>Advanced Filters</span>
                  </span>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Vendor Selection */}
                  <div className="space-y-2">
                    <Label>Vendors</Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {Object.entries(ENHANCED_VENDOR_DATABASE).map(([id, vendor]) => (
                        <div key={id} className="flex items-center space-x-2">
                          <Checkbox
                            id={id}
                            checked={filters.selectedVendors.includes(id)}
                            onCheckedChange={(checked) => handleVendorToggle(id, !!checked)}
                          />
                          <Label htmlFor={id} className="text-sm">
                            {vendor.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-2">
                    <Label>Price Range</Label>
                    <div className="px-3">
                      <Slider
                        value={filters.priceRange}
                        onValueChange={handlePriceRangeChange}
                        max={500000}
                        min={0}
                        step={10000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>${(filters.priceRange[0] / 1000).toFixed(0)}k</span>
                        <span>${(filters.priceRange[1] / 1000).toFixed(0)}k</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Score Range */}
                  <div className="space-y-2">
                    <Label>Security Score</Label>
                    <div className="px-3">
                      <Slider
                        value={filters.securityScoreRange}
                        onValueChange={handleSecurityRangeChange}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>{filters.securityScoreRange[0]}%</span>
                        <span>{filters.securityScoreRange[1]}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="space-y-2">
                    <Label>Sort By</Label>
                    <Select value={filters.sortBy} onValueChange={handleSortChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cost">Total Cost</SelectItem>
                        <SelectItem value="roi">ROI</SelectItem>
                        <SelectItem value="security">Security Score</SelectItem>
                        <SelectItem value="implementation">Implementation Time</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Switch checked={filters.sortOrder === "desc"} onCheckedChange={handleSortOrderChange} />
                      <Label className="text-sm">Descending</Label>
                    </div>
                  </div>
                </div>

                {/* Filter Summary */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {filteredVendorData.length} of {Object.keys(ENHANCED_VENDOR_DATABASE).length} vendors
                      </Badge>
                      <Badge variant="outline">
                        ${(filters.priceRange[0] / 1000).toFixed(0)}k - ${(filters.priceRange[1] / 1000).toFixed(0)}k
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Sorted by {filters.sortBy} ({filters.sortOrder})
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Lowest Cost</p>
                <p className="text-2xl font-bold">${keyMetrics.lowestCost.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Highest ROI</p>
                <p className="text-2xl font-bold">{keyMetrics.highestROI.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Security</p>
                <p className="text-2xl font-bold">{keyMetrics.avgSecurity.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fastest Deploy</p>
                <p className="text-2xl font-bold">{keyMetrics.fastestDeploy} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Cost Comparison</span>
              </span>
              <div className="flex items-center space-x-2">
                <Select value={comparisonMode} onValueChange={(value: any) => setComparisonMode(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="absolute">Absolute</SelectItem>
                    <SelectItem value="relative">Relative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div data-chart="cost-comparison">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.costComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="totalCost" fill={COLORS[0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* ROI Analysis Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>ROI Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div data-chart="roi-analysis">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData.roiAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="roi" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Security vs Cost Scatter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Security vs Cost</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div data-chart="security-cost">
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={chartData.securityVsCost}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cost" name="Cost" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <YAxis dataKey="security" name="Security Score" />
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter dataKey="security" fill={COLORS[2]} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Capabilities Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Vendor Capabilities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div data-chart="capabilities-radar">
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={chartData.capabilities.length > 0 ? [chartData.capabilities[0]] : []}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Capabilities"
                    dataKey="automation"
                    stroke={COLORS[3]}
                    fill={COLORS[3]}
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Ranking Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Ranking</CardTitle>
          <CardDescription>
            Showing {filteredVendorData.length} vendors sorted by {filters.sortBy}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredVendorData.map((vendor, index) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{vendor.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{vendor.category}</Badge>
                      <span>${vendor.totalCost.toLocaleString()}</span>
                      <span>•</span>
                      <span>{vendor.implementationTime} days</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">ROI: {vendor.roi.toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground">Security: {vendor.securityScore}%</p>
                  </div>
                  <Progress value={vendor.securityScore} className="w-20" />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
