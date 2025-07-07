"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Filter, TrendingUp, DollarSign, Shield, Clock, ChevronDown, ChevronUp, Pause, Activity } from "lucide-react"
import { calculateComprehensiveTCO } from "@/lib/calculators/comprehensive-tco-calculator"
import { COMPREHENSIVE_VENDOR_DATA } from "@/lib/vendors/comprehensive-vendor-data"

// Types
interface FilterState {
  vendors: string[]
  priceRange: [number, number]
  securityRange: [number, number]
  implementationTime: [number, number]
  deploymentModels: string[]
  complianceFrameworks: string[]
  sortBy: string
  sortOrder: "asc" | "desc"
}

interface DashboardConfig {
  industry: string
  deviceCount: number
  timeframe: number
  deploymentModel: string
  complianceRequirements: string[]
}

interface InteractiveDashboardProps {
  initialConfig: DashboardConfig
  onConfigChange?: (config: DashboardConfig) => void
}

// Chart color schemes
const CHART_COLORS = {
  primary: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316", "#84cc16"],
  secondary: ["#065f46", "#1e40af", "#92400e", "#991b1b", "#5b21b6", "#0c4a6e", "#9a3412", "#365314"],
  gradients: [
    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  ],
}

export default function InteractiveDashboard({ initialConfig, onConfigChange }: InteractiveDashboardProps) {
  // Memoize initial config to prevent infinite re-renders
  const stableInitialConfig = useMemo(
    () => ({
      industry: initialConfig?.industry || "HEALTHCARE",
      deviceCount: initialConfig?.deviceCount || 500,
      timeframe: initialConfig?.timeframe || 3,
      deploymentModel: initialConfig?.deploymentModel || "CLOUD",
      complianceRequirements: initialConfig?.complianceRequirements || [],
    }),
    [],
  ) // Empty dependency array to make it truly stable

  const [config, setConfig] = useState<DashboardConfig>(stableInitialConfig)
  const [filters, setFilters] = useState<FilterState>({
    vendors: Object.keys(COMPREHENSIVE_VENDOR_DATA),
    priceRange: [0, 2000000],
    securityRange: [0, 100],
    implementationTime: [0, 365],
    deploymentModels: ["CLOUD", "ON_PREMISE", "HYBRID"],
    complianceFrameworks: [],
    sortBy: "totalCost",
    sortOrder: "asc",
  })

  // Real-time update state
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [updateInterval, setUpdateInterval] = useState(5) // seconds
  const [showFilters, setShowFilters] = useState(true)
  const [chartType, setChartType] = useState<"bar" | "line" | "area" | "scatter">("bar")

  // Debounced config update to prevent infinite loops
  const debouncedConfigUpdate = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout
      return (newConfig: DashboardConfig) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          if (onConfigChange && JSON.stringify(newConfig) !== JSON.stringify(config)) {
            onConfigChange(newConfig)
          }
        }, 300) // 300ms debounce
      }
    })(),
    [onConfigChange, config],
  )

  // Update parent config when local config changes
  useEffect(() => {
    debouncedConfigUpdate(config)
  }, [config, debouncedConfigUpdate])

  // Real-time update effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isRealTimeEnabled) {
      intervalId = setInterval(() => {
        setLastUpdate(new Date())
        // Simulate minor data fluctuations for real-time effect
        setConfig((prev) => ({
          ...prev,
          deviceCount: prev.deviceCount + Math.floor(Math.random() * 10 - 5),
        }))
      }, updateInterval * 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRealTimeEnabled, updateInterval])

  // Calculate TCO data with error handling
  const tcoData = useMemo(() => {
    try {
      const results: Record<string, any> = {}

      Object.keys(COMPREHENSIVE_VENDOR_DATA).forEach((vendorId) => {
        try {
          const result = calculateComprehensiveTCO(vendorId, config)
          if (result) {
            results[vendorId] = {
              ...result,
              vendorName: COMPREHENSIVE_VENDOR_DATA[vendorId]?.name || vendorId,
              securityScore: COMPREHENSIVE_VENDOR_DATA[vendorId]?.security?.overallScore || 0,
              implementationTime: COMPREHENSIVE_VENDOR_DATA[vendorId]?.implementation?.timeline || 0,
            }
          }
        } catch (error) {
          console.warn(`Failed to calculate TCO for ${vendorId}:`, error)
        }
      })

      return results
    } catch (error) {
      console.error("Failed to calculate TCO data:", error)
      return {}
    }
  }, [config])

  // Filter and sort vendor data
  const filteredVendorData = useMemo(() => {
    try {
      const vendorEntries = Object.entries(tcoData).filter(([vendorId, data]) => {
        if (!data || !filters.vendors.includes(vendorId)) return false

        const totalCost = data.totalCost || 0
        const securityScore = data.securityScore || 0
        const implementationTime = data.implementationTime || 0

        return (
          totalCost >= filters.priceRange[0] &&
          totalCost <= filters.priceRange[1] &&
          securityScore >= filters.securityRange[0] &&
          securityScore <= filters.securityRange[1] &&
          implementationTime >= filters.implementationTime[0] &&
          implementationTime <= filters.implementationTime[1]
        )
      })

      // Sort the filtered data
      vendorEntries.sort(([, a], [, b]) => {
        const aValue = a?.[filters.sortBy] || 0
        const bValue = b?.[filters.sortBy] || 0

        if (filters.sortOrder === "asc") {
          return aValue - bValue
        } else {
          return bValue - aValue
        }
      })

      return vendorEntries
    } catch (error) {
      console.error("Failed to filter vendor data:", error)
      return []
    }
  }, [tcoData, filters])

  // Chart data preparation
  const chartData = useMemo(() => {
    return filteredVendorData.map(([vendorId, data]) => ({
      vendor: data?.vendorName || vendorId,
      totalCost: data?.totalCost || 0,
      year1: data?.year1 || 0,
      year3: data?.year3 || 0,
      year5: data?.year5 || 0,
      roi: data?.roi?.totalSavings || 0,
      securityScore: data?.securityScore || 0,
      paybackPeriod: data?.roi?.paybackPeriod || 0,
      implementationTime: data?.implementationTime || 0,
    }))
  }, [filteredVendorData])

  // Real-time metrics
  const metrics = useMemo(() => {
    if (chartData.length === 0) {
      return {
        lowestCost: 0,
        highestROI: 0,
        averageSecurity: 0,
        fastestDeployment: 0,
      }
    }

    return {
      lowestCost: Math.min(...chartData.map((d) => d.totalCost)),
      highestROI: Math.max(...chartData.map((d) => d.roi)),
      averageSecurity: chartData.reduce((sum, d) => sum + d.securityScore, 0) / chartData.length,
      fastestDeployment: Math.min(...chartData.map((d) => d.implementationTime)),
    }
  }, [chartData])

  // Memoized event handlers
  const handleVendorToggle = useCallback((vendorId: string) => {
    setFilters((prev) => ({
      ...prev,
      vendors: prev.vendors.includes(vendorId)
        ? prev.vendors.filter((id) => id !== vendorId)
        : [...prev.vendors, vendorId],
    }))
  }, [])

  const handlePriceRangeChange = useCallback((value: number[]) => {
    setFilters((prev) => ({ ...prev, priceRange: [value[0], value[1]] }))
  }, [])

  const handleSecurityRangeChange = useCallback((value: number[]) => {
    setFilters((prev) => ({ ...prev, securityRange: [value[0], value[1]] }))
  }, [])

  const handleImplementationTimeChange = useCallback((value: number[]) => {
    setFilters((prev) => ({ ...prev, implementationTime: [value[0], value[1]] }))
  }, [])

  const handleSortChange = useCallback((sortBy: string) => {
    setFilters((prev) => ({ ...prev, sortBy }))
  }, [])

  const handleSortOrderToggle = useCallback(() => {
    setFilters((prev) => ({ ...prev, sortOrder: prev.sortOrder === "asc" ? "desc" : "asc" }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({
      vendors: Object.keys(COMPREHENSIVE_VENDOR_DATA),
      priceRange: [0, 2000000],
      securityRange: [0, 100],
      implementationTime: [0, 365],
      deploymentModels: ["CLOUD", "ON_PREMISE", "HYBRID"],
      complianceFrameworks: [],
      sortBy: "totalCost",
      sortOrder: "asc",
    })
  }, [])

  // Custom chart components
  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    }

    switch (chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="vendor" />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
            <Legend />
            <Bar dataKey="totalCost" fill={CHART_COLORS.primary[0]} name="Total Cost" />
            <Bar dataKey="roi" fill={CHART_COLORS.primary[1]} name="ROI" />
          </BarChart>
        )
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="vendor" />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
            <Legend />
            <Line type="monotone" dataKey="totalCost" stroke={CHART_COLORS.primary[0]} name="Total Cost" />
            <Line type="monotone" dataKey="roi" stroke={CHART_COLORS.primary[1]} name="ROI" />
          </LineChart>
        )
      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="vendor" />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
            <Legend />
            <Area
              type="monotone"
              dataKey="totalCost"
              stackId="1"
              stroke={CHART_COLORS.primary[0]}
              fill={CHART_COLORS.primary[0]}
              fillOpacity={0.6}
              name="Total Cost"
            />
            <Area
              type="monotone"
              dataKey="roi"
              stackId="2"
              stroke={CHART_COLORS.primary[1]}
              fill={CHART_COLORS.primary[1]}
              fillOpacity={0.6}
              name="ROI"
            />
          </AreaChart>
        )
      case "scatter":
        return (
          <ScatterChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="totalCost" name="Total Cost" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <YAxis dataKey="securityScore" name="Security Score" />
            <Tooltip
              formatter={(value, name) => (name === "totalCost" ? `$${Number(value).toLocaleString()}` : `${value}%`)}
            />
            <Scatter name="Vendors" dataKey="securityScore" fill={CHART_COLORS.primary[0]} />
          </ScatterChart>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Header with Real-time Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Interactive NAC Analysis Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time vendor comparison with advanced filtering • {filteredVendorData.length} of{" "}
            {Object.keys(tcoData).length} vendors shown
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Real-time Toggle */}
          <div className="flex items-center gap-2">
            <Switch checked={isRealTimeEnabled} onCheckedChange={setIsRealTimeEnabled} id="realtime-toggle" />
            <Label htmlFor="realtime-toggle" className="flex items-center gap-1">
              {isRealTimeEnabled ? <Activity className="h-4 w-4 text-green-500" /> : <Pause className="h-4 w-4" />}
              Real-time
            </Label>
          </div>

          {/* Update Interval */}
          {isRealTimeEnabled && (
            <Select value={updateInterval.toString()} onValueChange={(value) => setUpdateInterval(Number(value))}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1s</SelectItem>
                <SelectItem value="5">5s</SelectItem>
                <SelectItem value="10">10s</SelectItem>
                <SelectItem value="30">30s</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Last Update */}
          <div className="text-sm text-muted-foreground">Updated: {lastUpdate.toLocaleTimeString()}</div>

          {/* Filter Toggle */}
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "Hide" : "Show"} Filters
            {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </div>

      {/* Real-time Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Lowest Cost</p>
                <p className="text-2xl font-bold text-green-600">${(metrics.lowestCost / 1000).toFixed(0)}k</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Highest ROI</p>
                <p className="text-2xl font-bold text-blue-600">${(metrics.highestROI / 1000).toFixed(0)}k</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Security</p>
                <p className="text-2xl font-bold text-purple-600">{metrics.averageSecurity.toFixed(0)}%</p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fastest Deploy</p>
                <p className="text-2xl font-bold text-orange-600">{metrics.fastestDeployment} days</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Advanced Filters</span>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Reset All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Vendor Selection */}
            <div>
              <Label className="text-sm font-medium">Vendor Selection</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {Object.entries(COMPREHENSIVE_VENDOR_DATA).map(([vendorId, vendor]) => (
                  <div key={vendorId} className="flex items-center space-x-2">
                    <Checkbox
                      id={vendorId}
                      checked={filters.vendors.includes(vendorId)}
                      onCheckedChange={() => handleVendorToggle(vendorId)}
                    />
                    <Label htmlFor={vendorId} className="text-sm">
                      {vendor.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
              <Label className="text-sm font-medium">
                Price Range: ${(filters.priceRange[0] / 1000).toFixed(0)}k - $
                {(filters.priceRange[1] / 1000).toFixed(0)}k
              </Label>
              <Slider
                value={filters.priceRange}
                onValueChange={handlePriceRangeChange}
                max={2000000}
                min={0}
                step={50000}
                className="mt-2"
              />
            </div>

            {/* Security Score Range */}
            <div>
              <Label className="text-sm font-medium">
                Security Score: {filters.securityRange[0]}% - {filters.securityRange[1]}%
              </Label>
              <Slider
                value={filters.securityRange}
                onValueChange={handleSecurityRangeChange}
                max={100}
                min={0}
                step={5}
                className="mt-2"
              />
            </div>

            {/* Implementation Time */}
            <div>
              <Label className="text-sm font-medium">
                Implementation Time: {filters.implementationTime[0]} - {filters.implementationTime[1]} days
              </Label>
              <Slider
                value={filters.implementationTime}
                onValueChange={handleImplementationTimeChange}
                max={365}
                min={0}
                step={7}
                className="mt-2"
              />
            </div>

            <Separator />

            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <div>
                <Label className="text-sm font-medium">Sort By</Label>
                <Select value={filters.sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="totalCost">Total Cost</SelectItem>
                    <SelectItem value="roi">ROI</SelectItem>
                    <SelectItem value="securityScore">Security Score</SelectItem>
                    <SelectItem value="paybackPeriod">Payback Period</SelectItem>
                    <SelectItem value="implementationTime">Implementation Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Order</Label>
                <Button variant="outline" size="sm" onClick={handleSortOrderToggle} className="ml-2 bg-transparent">
                  {filters.sortOrder === "asc" ? "Ascending" : "Descending"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interactive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Vendor Comparison</span>
              <div className="flex items-center gap-2">
                <Select value={chartType} onValueChange={(value: any) => setChartType(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                    <SelectItem value="scatter">Scatter Plot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80" data-chart="vendor-comparison">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* ROI Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>ROI Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80" data-chart="roi-analysis">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  <Area
                    type="monotone"
                    dataKey="roi"
                    stroke={CHART_COLORS.primary[1]}
                    fill={CHART_COLORS.primary[1]}
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Vendor Ranking */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Vendor Ranking</CardTitle>
          <CardDescription>
            Click on vendors to see detailed information • Sorted by {filters.sortBy} ({filters.sortOrder})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredVendorData.map(([vendorId, data], index) => (
              <div
                key={vendorId}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <div>
                    <h4 className="font-medium">{data?.vendorName || vendorId}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${(data?.totalCost || 0).toLocaleString()} total cost
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-medium">${((data?.roi?.totalSavings || 0) / 1000).toFixed(0)}k ROI</p>
                    <p className="text-xs text-muted-foreground">
                      {(data?.roi?.paybackPeriod || 0).toFixed(1)} mo payback
                    </p>
                  </div>

                  <div className="w-24">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Security</span>
                      <span>{data?.securityScore || 0}%</span>
                    </div>
                    <Progress value={data?.securityScore || 0} className="h-2" />
                  </div>

                  <Badge
                    variant={
                      data?.implementationTime <= 30
                        ? "default"
                        : data?.implementationTime <= 90
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {data?.implementationTime || 0}d deploy
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Status */}
      {isRealTimeEnabled && (
        <Alert>
          <Activity className="h-4 w-4" />
          <AlertDescription>
            Real-time updates are active. Data refreshes every {updateInterval} seconds. Last update:{" "}
            {lastUpdate.toLocaleTimeString()}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
