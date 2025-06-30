"use client"

import type React from "react"
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
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, TrendingUp, TrendingDown, BarChart3, PieChartIcon, Activity, Eye, Download } from "lucide-react"
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
  chartType: "bar" | "pie" | "treemap" | "line" | "area"
  parentId?: string
}

interface InteractiveTCOChartProps {
  initialData: any[]
  title: string
  className?: string
  enableRealTime?: boolean
  drillDownLevels?: DrillDownLevel[]
}

const InteractiveTCOChart: React.FC<InteractiveTCOChartProps> = ({
  initialData,
  title,
  className,
  enableRealTime = true,
  drillDownLevels = [],
}) => {
  const [currentLevel, setCurrentLevel] = useState<string>("root")
  const [chartData, setChartData] = useState(initialData)
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [isRealTimeActive, setIsRealTimeActive] = useState(enableRealTime)
  const [chartType, setChartType] = useState<"bar" | "pie" | "treemap" | "line" | "area">("bar")
  const [timeRange, setTimeRange] = useState<"1M" | "3M" | "6M" | "1Y" | "3Y">("1Y")

  // Real-time data simulation
  useEffect(() => {
    if (!isRealTimeActive) return

    const interval = setInterval(() => {
      setChartData((prevData) =>
        prevData.map((item) => ({
          ...item,
          value: item.value + (Math.random() - 0.5) * item.value * 0.02, // ±2% variation
          trend: Math.random() > 0.5 ? "up" : "down",
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [isRealTimeActive])

  const currentLevelData = useMemo(() => {
    if (currentLevel === "root") return chartData
    const level = drillDownLevels.find((l) => l.id === currentLevel)
    return level?.data || chartData
  }, [currentLevel, chartData, drillDownLevels])

  const currentLevelInfo = useMemo(() => {
    if (currentLevel === "root") return { title, chartType }
    const level = drillDownLevels.find((l) => l.id === currentLevel)
    return { title: level?.title || title, chartType: level?.chartType || chartType }
  }, [currentLevel, title, chartType, drillDownLevels])

  const handleDrillDown = useCallback(
    (dataKey: string) => {
      const targetLevel = drillDownLevels.find((l) => l.parentId === currentLevel && l.id.includes(dataKey))
      if (targetLevel) {
        setCurrentLevel(targetLevel.id)
        setSelectedSegment(dataKey)
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
  }, [currentLevel, drillDownLevels])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/95 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4 shadow-2xl"
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
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-slate-700">
            <p className="text-xs text-slate-400">Click to drill down</p>
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

    switch (currentLevelInfo.chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <defs>
              {CHART_GRADIENTS.map((gradient, index) => (
                <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GRADIENT_COLORS.portnox[0]} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={GRADIENT_COLORS.portnox[2]} stopOpacity={0.3} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tick={{ fill: "#9CA3AF" }} />
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
              onClick={(data) => handleDrillDown(data.name)}
            >
              {currentLevelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#gradient-${index % CHART_GRADIENTS.length})`} />
              ))}
            </Bar>
          </BarChart>
        )

      case "pie":
        return (
          <PieChart {...commonProps}>
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
              onClick={(data) => handleDrillDown(data.name)}
              cursor="pointer"
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
          <LineChart {...commonProps}>
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
            />
          </LineChart>
        )

      case "area":
        return (
          <AreaChart {...commonProps}>
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
            />
          </AreaChart>
        )

      default:
        return null
    }
  }

  return (
    <Card className={cn("bg-slate-900/50 border-slate-700/50 backdrop-blur-lg", className)}>
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
              </TabsList>
            </Tabs>

            {/* Export button */}
            <Button variant="outline" size="sm" className="text-xs bg-transparent">
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
          </div>
        </div>

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
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentLevel}-${currentLevelInfo.chartType}`}
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
        </div>

        {/* Chart insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-300">Highest Value</span>
            </div>
            <p className="text-lg font-bold text-white">
              ${Math.max(...currentLevelData.map((d) => d.value)).toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span className="text-sm text-slate-300">Lowest Value</span>
            </div>
            <p className="text-lg font-bold text-white">
              ${Math.min(...currentLevelData.map((d) => d.value)).toLocaleString()}
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
                currentLevelData.reduce((acc, d) => acc + d.value, 0) / currentLevelData.length,
              ).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Drill-down hint */}
        {drillDownLevels.length > 0 && currentLevel === "root" && (
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-blue-400">
              <Eye className="w-4 h-4" />
              <span className="text-sm">Click on any chart element to drill down for detailed analysis</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default InteractiveTCOChart
