"use client"

import React from "react"
import { useState, useMemo, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  Area,
  AreaChart,
  ComposedChart,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChartIcon,
  Activity,
  Eye,
  Download,
  Filter,
  Search,
  Maximize2,
  Minimize2,
  Layers,
  ArrowLeftRight,
  Grid3X3,
  Columns2,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Enhanced color palettes for different chart types
const GRADIENT_COLORS = {
  portnox: ["#00D4AA", "#00B894", "#00A085"],
  cisco: ["#1BA0D7", "#0F7CB8", "#0A5A99"],
  aruba: ["#FF6B35", "#E55A2B", "#CC4921"],
  microsoft: ["#0078D4", "#106EBE", "#1B5FA8"],
  fortinet: ["#EE3124", "#D42B1C", "#BA2515"],
  default: ["#8B5CF6", "#7C3AED", "#6D28D9"],
}

const CHART_GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
]

interface DrillDownLevel {
  id: string
  title: string
  data: any[]
  chartType: "bar" | "pie" | "treemap" | "line" | "area" | "composed"
  parentId?: string
  filters?: FilterConfig[]
}

interface FilterConfig {
  id: string
  label: string
  type: "select" | "range" | "checkbox" | "search"
  options?: string[]
  min?: number
  max?: number
  defaultValue?: any
}

interface InteractiveTCOChartProps {
  initialData: any[]
  title: string
  className?: string
  enableRealTime?: boolean
  drillDownLevels?: DrillDownLevel[]
  enableFiltering?: boolean
  enableExport?: boolean
}

const InteractiveTCOChart: React.FC<InteractiveTCOChartProps> = ({
  initialData,
  title,
  className,
  enableRealTime = true,
  drillDownLevels = [],
  enableFiltering = true,
  enableExport = true,
}) => {
  const [currentLevel, setCurrentLevel] = useState<string>("root")
  const [chartData, setChartData] = useState(initialData)
  const [filteredData, setFilteredData] = useState(initialData)
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [isRealTimeActive, setIsRealTimeActive] = useState(enableRealTime)
  const [chartType, setChartType] = useState<"bar" | "pie" | "treemap" | "line" | "area" | "composed">("bar")
  const [timeRange, setTimeRange] = useState<"1M" | "3M" | "6M" | "1Y" | "3Y">("1Y")
  const [isExpanded, setIsExpanded] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})
  const [selectedVendors, setSelectedVendors] = useState<string[]>([])
  const [costRange, setCostRange] = useState<[number, number]>([0, 1000000])
  const [animationSpeed, setAnimationSpeed] = useState(1000)
  const [comparisonMode, setComparisonMode] = useState<"single" | "side-by-side" | "overlay">("single")
  const [comparisonData, setComparisonData] = useState<any[]>([])
  const [comparisonConfig, setComparisonConfig] = useState({
    leftChart: { data: initialData, title: title, chartType: "bar" as const },
    rightChart: { data: [], title: "Comparison", chartType: "bar" as const },
  })

  // Navigation breadcrumbs
  const breadcrumbs = useMemo(() => {
    const crumbs = ["Root"]
    let currentLevelInfo = drillDownLevels.find((l) => l.id === currentLevel)

    while (currentLevelInfo) {
      crumbs.push(currentLevelInfo.title)
      currentLevelInfo = drillDownLevels.find((l) => l.id === currentLevelInfo?.parentId)
    }

    return crumbs.reverse()
  }, [currentLevel, drillDownLevels])

  // Real-time data simulation with enhanced variability
  useEffect(() => {
    if (!isRealTimeActive) return

    const interval = setInterval(() => {
      setChartData((prevData) =>
        prevData.map((item) => ({
          ...item,
          value: Math.max(0, item.value + (Math.random() - 0.5) * item.value * 0.03), // ±3% variation
          trend: Math.random() > 0.5 ? "up" : "down",
          changePercent: (Math.random() - 0.5) * 10, // ±5% change indicator
          timestamp: new Date().toISOString(),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [isRealTimeActive])

  // Advanced filtering logic
  useEffect(() => {
    let filtered = [...chartData]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Vendor filter
    if (selectedVendors.length > 0) {
      filtered = filtered.filter((item) => selectedVendors.includes(item.vendor || item.name))
    }

    // Cost range filter
    filtered = filtered.filter((item) => item.value >= costRange[0] && item.value <= costRange[1])

    // Custom filters from drill-down levels
    Object.entries(activeFilters).forEach(([filterId, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        filtered = filtered.filter((item) => {
          const filterConfig = getCurrentLevelFilters()?.find((f) => f.id === filterId)
          if (!filterConfig) return true

          switch (filterConfig.type) {
            case "select":
              return item[filterId] === value
            case "checkbox":
              return value ? item[filterId] : true
            case "range":
              return item[filterId] >= value[0] && item[filterId] <= value[1]
            default:
              return true
          }
        })
      }
    })

    setFilteredData(filtered)
  }, [chartData, searchTerm, selectedVendors, costRange, activeFilters])

  const currentLevelData = useMemo(() => {
    if (currentLevel === "root") return filteredData
    const level = drillDownLevels.find((l) => l.id === currentLevel)
    return level?.data || filteredData
  }, [currentLevel, filteredData, drillDownLevels])

  const currentLevelInfo = useMemo(() => {
    if (currentLevel === "root") return { title, chartType, filters: [] }
    const level = drillDownLevels.find((l) => l.id === currentLevel)
    return {
      title: level?.title || title,
      chartType: level?.chartType || chartType,
      filters: level?.filters || [],
    }
  }, [currentLevel, title, chartType, drillDownLevels])

  const getCurrentLevelFilters = useCallback(() => {
    return currentLevelInfo.filters || []
  }, [currentLevelInfo])

  const handleDrillDown = useCallback(
    (dataKey: string, additionalData?: any) => {
      const targetLevel = drillDownLevels.find(
        (l) =>
          l.parentId === currentLevel &&
          (l.id.includes(dataKey) || l.title.toLowerCase().includes(dataKey.toLowerCase())),
      )

      if (targetLevel) {
        setCurrentLevel(targetLevel.id)
        setSelectedSegment(dataKey)
        setChartType(targetLevel.chartType)

        // Reset filters for new level
        setActiveFilters({})
        setSearchTerm("")
      }
    },
    [currentLevel, drillDownLevels],
  )

  const handleDrillUp = useCallback(() => {
    if (currentLevel === "root") return
    const currentLevelInfo = drillDownLevels.find((l) => l.id === currentLevel)
    const parentLevel = currentLevelInfo?.parentId || "root"
    setCurrentLevel(parentLevel)
    setSelectedSegment(null)

    // Reset chart type to parent level's type
    if (parentLevel === "root") {
      setChartType("bar")
    } else {
      const parentLevelInfo = drillDownLevels.find((l) => l.id === parentLevel)
      if (parentLevelInfo) {
        setChartType(parentLevelInfo.chartType)
      }
    }
  }, [currentLevel, drillDownLevels])

  const handleFilterChange = useCallback((filterId: string, value: any) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }))
  }, [])

  const clearAllFilters = useCallback(() => {
    setActiveFilters({})
    setSearchTerm("")
    setSelectedVendors([])
    setCostRange([0, 1000000])
  }, [])

  const exportData = useCallback(() => {
    const dataToExport = {
      level: currentLevel,
      title: currentLevelInfo.title,
      data: currentLevelData,
      filters: activeFilters,
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `tco-analysis-${currentLevel}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [currentLevel, currentLevelInfo, currentLevelData, activeFilters])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/95 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4 shadow-2xl max-w-sm"
        >
          <p className="text-slate-200 font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-300 text-sm">
                {entry.name}: <span className="font-bold text-white">${entry.value?.toLocaleString()}</span>
              </span>
              {entry.payload?.trend && (
                <Badge variant={entry.payload.trend === "up" ? "default" : "destructive"} className="ml-2">
                  {entry.payload.trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                </Badge>
              )}
              {entry.payload?.changePercent && (
                <span
                  className={cn("text-xs ml-1", entry.payload.changePercent > 0 ? "text-green-400" : "text-red-400")}
                >
                  ({entry.payload.changePercent > 0 ? "+" : ""}
                  {entry.payload.changePercent.toFixed(1)}%)
                </span>
              )}
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-slate-700">
            <p className="text-xs text-slate-400">Click to drill down • Right-click for options</p>
          </div>
        </motion.div>
      )
    }
    return null
  }

  const renderChart = () => {
    const commonProps = {
      data: currentLevelData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    }

    const handleChartClick = (data: any) => {
      if (data && data.activePayload && data.activePayload[0]) {
        const clickedData = data.activePayload[0].payload
        handleDrillDown(clickedData.name || clickedData.category, clickedData)
      }
    }

    switch (currentLevelInfo.chartType) {
      case "bar":
        return (
          <BarChart {...commonProps} onClick={handleChartClick}>
            <defs>
              {CHART_GRADIENTS.map((gradient, index) => (
                <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GRADIENT_COLORS.portnox[0]} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={GRADIENT_COLORS.portnox[2]} stopOpacity={0.3} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis
              dataKey="name"
              stroke="#9CA3AF"
              fontSize={12}
              tick={{ fill: "#9CA3AF" }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tick={{ fill: "#9CA3AF" }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="value"
              fill="url(#gradient-0)"
              radius={[4, 4, 0, 0]}
              cursor="pointer"
              animationDuration={animationSpeed}
            >
              {currentLevelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#gradient-${index % CHART_GRADIENTS.length})`} />
              ))}
            </Bar>
          </BarChart>
        )

      case "pie":
        return (
          <PieChart {...commonProps} onClick={handleChartClick}>
            <defs>
              {CHART_GRADIENTS.map((gradient, index) => (
                <linearGradient key={index} id={`pie-gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={GRADIENT_COLORS.portnox[0]} />
                  <stop offset="100%" stopColor={GRADIENT_COLORS.portnox[2]} />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={currentLevelData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={40}
              paddingAngle={2}
              dataKey="value"
              cursor="pointer"
              animationDuration={animationSpeed}
            >
              {currentLevelData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#pie-gradient-${index % CHART_GRADIENTS.length})`}
                  stroke="#1F2937"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        )

      case "line":
        return (
          <LineChart {...commonProps} onClick={handleChartClick}>
            <defs>
              <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={GRADIENT_COLORS.portnox[0]} stopOpacity={0.8} />
                <stop offset="100%" stopColor={GRADIENT_COLORS.portnox[2]} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={GRADIENT_COLORS.portnox[0]}
              strokeWidth={3}
              dot={{ fill: GRADIENT_COLORS.portnox[0], strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: GRADIENT_COLORS.portnox[0], strokeWidth: 2 }}
              animationDuration={animationSpeed}
            />
          </LineChart>
        )

      case "area":
        return (
          <AreaChart {...commonProps} onClick={handleChartClick}>
            <defs>
              <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={GRADIENT_COLORS.portnox[0]} stopOpacity={0.6} />
                <stop offset="100%" stopColor={GRADIENT_COLORS.portnox[2]} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={GRADIENT_COLORS.portnox[0]}
              strokeWidth={2}
              fill="url(#area-gradient)"
              animationDuration={animationSpeed}
            />
          </AreaChart>
        )

      case "composed":
        return (
          <ComposedChart {...commonProps} onClick={handleChartClick}>
            <defs>
              <linearGradient id="composed-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={GRADIENT_COLORS.portnox[0]} stopOpacity={0.6} />
                <stop offset="100%" stopColor={GRADIENT_COLORS.portnox[2]} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" fill="url(#composed-gradient)" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="trend" stroke={GRADIENT_COLORS.cisco[0]} strokeWidth={2} dot={{ r: 4 }} />
          </ComposedChart>
        )

      default:
        return null
    }
  }

  const renderFilters = () => {
    if (!enableFiltering || !showFilters) return null

    const filters = getCurrentLevelFilters()

    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="bg-slate-800/50 rounded-lg p-4 mb-4 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Filters & Controls</h3>
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search Filter */}
          <div className="space-y-2">
            <Label className="text-slate-300">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
          </div>

          {/* Cost Range Filter */}
          <div className="space-y-2">
            <Label className="text-slate-300">Cost Range</Label>
            <div className="px-2">
              <Slider
                value={costRange}
                onValueChange={setCostRange}
                max={1000000}
                min={0}
                step={10000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>${(costRange[0] / 1000).toFixed(0)}K</span>
                <span>${(costRange[1] / 1000).toFixed(0)}K</span>
              </div>
            </div>
          </div>

          {/* Animation Speed */}
          <div className="space-y-2">
            <Label className="text-slate-300">Animation Speed</Label>
            <div className="px-2">
              <Slider
                value={[animationSpeed]}
                onValueChange={(value) => setAnimationSpeed(value[0])}
                max={3000}
                min={200}
                step={200}
                className="w-full"
              />
              <div className="text-xs text-slate-400 mt-1 text-center">{animationSpeed}ms</div>
            </div>
          </div>

          {/* Custom Filters from Level Config */}
          {filters.map((filter) => (
            <div key={filter.id} className="space-y-2">
              <Label className="text-slate-300">{filter.label}</Label>
              {filter.type === "select" && (
                <Select
                  value={activeFilters[filter.id] || ""}
                  onValueChange={(value) => handleFilterChange(filter.id, value)}
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {filter.type === "checkbox" && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={filter.id}
                    checked={activeFilters[filter.id] || false}
                    onCheckedChange={(checked) => handleFilterChange(filter.id, checked)}
                  />
                  <Label htmlFor={filter.id} className="text-slate-300">
                    {filter.label}
                  </Label>
                </div>
              )}
              {filter.type === "range" && (
                <div className="px-2">
                  <Slider
                    value={activeFilters[filter.id] || [filter.min || 0, filter.max || 100]}
                    onValueChange={(value) => handleFilterChange(filter.id, value)}
                    max={filter.max || 100}
                    min={filter.min || 0}
                    step={1}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  const renderComparisonChart = (side: "left" | "right") => {
    const chartConfig = side === "left" ? comparisonConfig.leftChart : comparisonConfig.rightChart
    const data = chartConfig.data
    const chartType = chartConfig.chartType

    const commonProps = {
      data: data,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    }

    switch (chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" fill={GRADIENT_COLORS.portnox[0]} radius={[4, 4, 0, 0]} />
          </BarChart>
        )
      case "pie":
        return (
          <PieChart {...commonProps}>
            <Pie data={data} cx="50%" cy="50%" outerRadius={80} innerRadius={20} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_GRADIENTS[index % CHART_GRADIENTS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        )
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="value" stroke={GRADIENT_COLORS.portnox[0]} strokeWidth={2} />
          </LineChart>
        )
      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="value" stroke={GRADIENT_COLORS.portnox[0]} fill="url(#colorPv)" />
          </AreaChart>
        )
      default:
        return null
    }
  }

  const renderOverlayChart = () => {
    const commonProps = {
      data: currentLevelData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    }

    return (
      <ComposedChart {...commonProps}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
        <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
        <YAxis stroke="#9CA3AF" fontSize={12} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="value" fill={GRADIENT_COLORS.portnox[0]} radius={[4, 4, 0, 0]} />
        {comparisonData.length > 0 && (
          <Line type="monotone" dataKey="comparisonValue" stroke={GRADIENT_COLORS.cisco[0]} strokeWidth={2} />
        )}
      </ComposedChart>
    )
  }

  return (
    <Card
      className={cn(
        "bg-slate-900/50 border-slate-700/50 backdrop-blur-lg transition-all duration-300",
        isExpanded && "fixed inset-4 z-50 overflow-auto",
        className,
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentLevel !== "root" && (
              <Button variant="ghost" size="sm" onClick={handleDrillUp} className="text-slate-400 hover:text-white">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
            <CardTitle className="text-xl text-white">{currentLevelInfo.title}</CardTitle>
            {selectedSegment && (
              <Badge variant="outline" className="text-slate-300 border-slate-600">
                {selectedSegment}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Toggle */}
            {enableFiltering && (
              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="text-xs"
              >
                <Filter className="w-3 h-3 mr-1" />
                Filters
              </Button>
            )}

            {/* Real-time toggle */}
            <Button
              variant={isRealTimeActive ? "default" : "outline"}
              size="sm"
              onClick={() => setIsRealTimeActive(!isRealTimeActive)}
              className="text-xs"
            >
              <Activity className="w-3 h-3 mr-1" />
              {isRealTimeActive ? "Live" : "Static"}
            </Button>

            {/* Chart type selector */}
            <Tabs value={currentLevelInfo.chartType} onValueChange={(value) => setChartType(value as any)}>
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger value="bar" className="text-xs">
                  <BarChart3 className="w-3 h-3" />
                </TabsTrigger>
                <TabsTrigger value="pie" className="text-xs">
                  <PieChartIcon className="w-3 h-3" />
                </TabsTrigger>
                <TabsTrigger value="line" className="text-xs">
                  <TrendingUp className="w-3 h-3" />
                </TabsTrigger>
                <TabsTrigger value="area" className="text-xs">
                  <Activity className="w-3 h-3" />
                </TabsTrigger>
                <TabsTrigger value="composed" className="text-xs">
                  <Layers className="w-3 h-3" />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Comparison Mode Toggle */}
            <Tabs value={comparisonMode} onValueChange={(value) => setComparisonMode(value as any)}>
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger value="single" className="text-xs">
                  <Grid3X3 className="w-3 h-3" />
                </TabsTrigger>
                <TabsTrigger value="side-by-side" className="text-xs">
                  <Columns2 className="w-3 h-3" />
                </TabsTrigger>
                <TabsTrigger value="overlay" className="text-xs">
                  <ArrowLeftRight className="w-3 h-3" />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Expand/Minimize */}
            <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-xs">
              {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </Button>

            {/* Export button */}
            {enableExport && (
              <Button variant="outline" size="sm" onClick={exportData} className="text-xs bg-transparent">
                <Download className="w-3 h-3 mr-1" />
                Export
              </Button>
            )}
          </div>
        </div>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 1 && (
          <div className="flex items-center gap-2 text-sm mt-2">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-slate-500">/</span>}
                <button
                  onClick={() => {
                    if (index === 0) {
                      setCurrentLevel("root")
                    } else {
                      // Navigate to specific level
                      const targetLevel = drillDownLevels.find((l) => l.title === crumb)
                      if (targetLevel) {
                        setCurrentLevel(targetLevel.id)
                      }
                    }
                  }}
                  className={cn(
                    "hover:text-white transition-colors",
                    index === breadcrumbs.length - 1 ? "text-white font-medium" : "text-slate-400",
                  )}
                >
                  {crumb}
                </button>
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Time range selector */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm text-slate-400">Time Range:</span>
          {(["1M", "3M", "6M", "1Y", "3Y"] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="text-xs h-7 px-3"
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Filters Panel */}
        <AnimatePresence>{renderFilters()}</AnimatePresence>

        {/* Chart Container */}
        <div className={cn("w-full", isExpanded ? "h-[calc(100vh-300px)]" : "h-[400px]")}>
          {comparisonMode === "single" ? (
            <ResponsiveContainer width="100%" height="100%">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentLevel}-${currentLevelInfo.chartType}-${filteredData.length}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {renderChart()}
                </motion.div>
              </AnimatePresence>
            </ResponsiveContainer>
          ) : comparisonMode === "side-by-side" ? (
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="border border-slate-700 rounded-lg p-2">
                <h4 className="text-sm font-medium text-slate-300 mb-2">{comparisonConfig.leftChart.title}</h4>
                <ResponsiveContainer width="100%" height="90%">
                  {renderComparisonChart("left")}
                </ResponsiveContainer>
              </div>
              <div className="border border-slate-700 rounded-lg p-2">
                <h4 className="text-sm font-medium text-slate-300 mb-2">{comparisonConfig.rightChart.title}</h4>
                <ResponsiveContainer width="100%" height="90%">
                  {renderComparisonChart("right")}
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {renderOverlayChart()}
            </ResponsiveContainer>
          )}
        </div>

        {/* Enhanced Chart Insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-300">Highest Value</span>
            </div>
            <p className="text-lg font-bold text-white">
              ${Math.max(...currentLevelData.map((d) => d.value || 0)).toLocaleString()}
            </p>
            <p className="text-xs text-slate-400">
              {
                currentLevelData.find((d) => d.value === Math.max(...currentLevelData.map((item) => item.value || 0)))
                  ?.name
              }
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span className="text-sm text-slate-300">Lowest Value</span>
            </div>
            <p className="text-lg font-bold text-white">
              ${Math.min(...currentLevelData.map((d) => d.value || 0)).toLocaleString()}
            </p>
            <p className="text-xs text-slate-400">
              {
                currentLevelData.find((d) => d.value === Math.min(...currentLevelData.map((item) => item.value || 0)))
                  ?.name
              }
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Average</span>
            </div>
            <p className="text-lg font-bold text-white">
              $
              {Math.round(
                currentLevelData.reduce((acc, d) => acc + (d.value || 0), 0) / Math.max(currentLevelData.length, 1),
              ).toLocaleString()}
            </p>
            <p className="text-xs text-slate-400">Across {currentLevelData.length} items</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-slate-300">Data Points</span>
            </div>
            <p className="text-lg font-bold text-white">{currentLevelData.length}</p>
            <p className="text-xs text-slate-400">
              {filteredData.length !== chartData.length && `${filteredData.length} filtered`}
            </p>
          </div>
        </div>

        {/* Drill-down hint */}
        {drillDownLevels.length > 0 && currentLevel === "root" && (
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-blue-400">
              <Eye className="w-4 h-4" />
              <span className="text-sm">
                Click on any chart element to drill down for detailed analysis. Use filters to refine your view.
              </span>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {(Object.keys(activeFilters).length > 0 || searchTerm || selectedVendors.length > 0) && (
          <div className="mt-4 p-3 bg-slate-800/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">Active Filters:</span>
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="secondary" className="text-xs">
                  Search: {searchTerm}
                </Badge>
              )}
              {selectedVendors.map((vendor) => (
                <Badge key={vendor} variant="secondary" className="text-xs">
                  Vendor: {vendor}
                </Badge>
              ))}
              {Object.entries(activeFilters).map(([key, value]) => (
                <Badge key={key} variant="secondary" className="text-xs">
                  {key}: {Array.isArray(value) ? value.join("-") : String(value)}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default InteractiveTCOChart
