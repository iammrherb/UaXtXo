"use client"

import type React from "react"
import { useState, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pause,
  Play,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Download,
  Settings,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricDataPoint {
  timestamp: string
  value: number
  trend?: "up" | "down" | "stable"
  alert?: boolean
  metadata?: Record<string, any>
}

interface MetricConfig {
  id: string
  name: string
  color: string
  unit: string
  threshold?: {
    warning: number
    critical: number
  }
  visible: boolean
  smoothing?: boolean
}

interface RealTimeMetricsProps {
  metrics: MetricConfig[]
  initialData?: Record<string, MetricDataPoint[]>
  title: string
  className?: string
  updateInterval?: number
  maxDataPoints?: number
  enableAlerts?: boolean
  enableExport?: boolean
}

const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({
  metrics: initialMetrics,
  initialData = {},
  title,
  className,
  updateInterval = 2000,
  maxDataPoints = 50,
  enableAlerts = true,
  enableExport = true,
}) => {
  const [isRunning, setIsRunning] = useState(true)
  const [data, setData] = useState<Record<string, MetricDataPoint[]>>(initialData)
  const [metrics, setMetrics] = useState<MetricConfig[]>(initialMetrics)
  const [chartType, setChartType] = useState<"line" | "area" | "bar">("line")
  const [timeWindow, setTimeWindow] = useState<"1m" | "5m" | "15m" | "1h">("5m")
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [alertThreshold, setAlertThreshold] = useState(80)
  const [smoothingFactor, setSmoothingFactor] = useState(0.3)
  const [autoScale, setAutoScale] = useState(true)
  const [showBrush, setShowBrush] = useState(false)
  const [alerts, setAlerts] = useState<
    Array<{ id: string; message: string; type: "warning" | "critical"; timestamp: string }>
  >([])

  // Time window configurations
  const timeWindows = {
    "1m": { duration: 60000, label: "1 Minute" },
    "5m": { duration: 300000, label: "5 Minutes" },
    "15m": { duration: 900000, label: "15 Minutes" },
    "1h": { duration: 3600000, label: "1 Hour" },
  }

  // Generate realistic data simulation
  const generateDataPoint = useCallback(
    (metricId: string, previousValue?: number): MetricDataPoint => {
      const baseValue = previousValue || Math.random() * 100
      const variation = (Math.random() - 0.5) * 20
      const newValue = Math.max(0, Math.min(100, baseValue + variation))

      const trend = newValue > (previousValue || 50) ? "up" : newValue < (previousValue || 50) ? "down" : "stable"
      const alert = enableAlerts && (newValue > alertThreshold || newValue < 20)

      return {
        timestamp: new Date().toISOString(),
        value: newValue,
        trend,
        alert,
        metadata: {
          change: previousValue ? newValue - previousValue : 0,
          changePercent: previousValue ? ((newValue - previousValue) / previousValue) * 100 : 0,
        },
      }
    },
    [alertThreshold, enableAlerts],
  )

  // Real-time data updates
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = { ...prevData }

        metrics.forEach((metric) => {
          if (!newData[metric.id]) {
            newData[metric.id] = []
          }

          const lastValue = newData[metric.id][newData[metric.id].length - 1]?.value
          const newPoint = generateDataPoint(metric.id, lastValue)

          newData[metric.id] = [...newData[metric.id].slice(-maxDataPoints + 1), newPoint]

          // Check for alerts
          if (enableAlerts && newPoint.alert) {
            const alertType = newPoint.value > 90 ? "critical" : "warning"
            setAlerts((prev) => [
              ...prev.slice(-9), // Keep last 10 alerts
              {
                id: `${metric.id}-${Date.now()}`,
                message: `${metric.name} ${alertType === "critical" ? "critically high" : "elevated"}: ${newPoint.value.toFixed(1)}${metric.unit}`,
                type: alertType,
                timestamp: newPoint.timestamp,
              },
            ])
          }
        })

        return newData
      })
    }, updateInterval)

    return () => clearInterval(interval)
  }, [isRunning, metrics, updateInterval, maxDataPoints, generateDataPoint, enableAlerts])

  // Filter data based on time window
  const filteredData = useMemo(() => {
    const windowDuration = timeWindows[timeWindow].duration
    const cutoffTime = new Date(Date.now() - windowDuration).toISOString()

    const filtered: Record<string, MetricDataPoint[]> = {}

    Object.entries(data).forEach(([metricId, points]) => {
      filtered[metricId] = points.filter((point) => point.timestamp >= cutoffTime)
    })

    return filtered
  }, [data, timeWindow])

  // Prepare chart data
  const chartData = useMemo(() => {
    const allTimestamps = new Set<string>()
    Object.values(filteredData).forEach((points) => {
      points.forEach((point) => allTimestamps.add(point.timestamp))
    })

    const sortedTimestamps = Array.from(allTimestamps).sort()

    return sortedTimestamps.map((timestamp) => {
      const dataPoint: any = {
        timestamp,
        time: new Date(timestamp).toLocaleTimeString(),
        fullTime: new Date(timestamp).toLocaleString(),
      }

      metrics.forEach((metric) => {
        const point = filteredData[metric.id]?.find((p) => p.timestamp === timestamp)
        if (point) {
          dataPoint[metric.id] = point.value
          dataPoint[`${metric.id}_trend`] = point.trend
          dataPoint[`${metric.id}_alert`] = point.alert
          dataPoint[`${metric.id}_metadata`] = point.metadata
        }
      })

      return dataPoint
    })
  }, [filteredData, metrics])

  // Calculate statistics
  const statistics = useMemo(() => {
    const stats: Record<string, any> = {}

    metrics.forEach((metric) => {
      const points = filteredData[metric.id] || []
      if (points.length === 0) {
        stats[metric.id] = { current: 0, avg: 0, min: 0, max: 0, trend: "stable" }
        return
      }

      const values = points.map((p) => p.value)
      const current = values[values.length - 1] || 0
      const avg = values.reduce((a, b) => a + b, 0) / values.length
      const min = Math.min(...values)
      const max = Math.max(...values)

      // Calculate trend over last 10 points
      const recentPoints = values.slice(-10)
      const firstHalf = recentPoints.slice(0, Math.floor(recentPoints.length / 2))
      const secondHalf = recentPoints.slice(Math.floor(recentPoints.length / 2))
      const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length
      const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length

      const trend = secondAvg > firstAvg * 1.05 ? "up" : secondAvg < firstAvg * 0.95 ? "down" : "stable"

      stats[metric.id] = { current, avg, min, max, trend }
    })

    return stats
  }, [filteredData, metrics])

  const toggleMetricVisibility = useCallback((metricId: string) => {
    setMetrics((prev) => prev.map((m) => (m.id === metricId ? { ...m, visible: !m.visible } : m)))
  }, [])

  const exportData = useCallback(() => {
    const exportData = {
      title,
      metrics,
      data: filteredData,
      statistics,
      alerts,
      settings: {
        timeWindow,
        chartType,
        alertThreshold,
        smoothingFactor,
      },
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `realtime-metrics-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [title, metrics, filteredData, statistics, alerts, timeWindow, chartType, alertThreshold, smoothingFactor])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/95 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4 shadow-2xl max-w-sm"
        >
          <p className="text-slate-200 font-semibold mb-2">{new Date(label).toLocaleString()}</p>
          {payload.map((entry: any, index: number) => {
            const metric = metrics.find((m) => m.id === entry.dataKey)
            if (!metric || !metric.visible) return null

            return (
              <div key={index} className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-300 text-sm">
                  {metric.name}:{" "}
                  <span className="font-bold text-white">
                    {entry.value?.toFixed(1)}
                    {metric.unit}
                  </span>
                </span>
                {entry.payload[`${metric.id}_alert`] && <AlertTriangle className="w-3 h-3 text-red-400" />}
                {entry.payload[`${metric.id}_trend`] && (
                  <span
                    className={cn(
                      "text-xs",
                      entry.payload[`${metric.id}_trend`] === "up"
                        ? "text-green-400"
                        : entry.payload[`${metric.id}_trend`] === "down"
                          ? "text-red-400"
                          : "text-slate-400",
                    )}
                  >
                    {entry.payload[`${metric.id}_trend`] === "up"
                      ? "↗"
                      : entry.payload[`${metric.id}_trend`] === "down"
                        ? "↘"
                        : "→"}
                  </span>
                )}
              </div>
            )
          })}
        </motion.div>
      )
    }
    return null
  }

  const renderChart = () => {
    const visibleMetrics = metrics.filter((m) => m.visible)

    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    }

    switch (chartType) {
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} tick={{ fill: "#9CA3AF" }} />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tick={{ fill: "#9CA3AF" }}
              domain={autoScale ? ["dataMin - 5", "dataMax + 5"] : [0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {visibleMetrics.map((metric) => (
              <Line
                key={metric.id}
                type="monotone"
                dataKey={metric.id}
                stroke={metric.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: metric.color, strokeWidth: 2 }}
                connectNulls={false}
              />
            ))}
            {showBrush && <Brush dataKey="time" height={30} stroke="#8884d8" />}
          </LineChart>
        )

      case "area":
        return (
          <AreaChart {...commonProps}>
            <defs>
              {visibleMetrics.map((metric) => (
                <linearGradient key={metric.id} id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={metric.color} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={metric.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} domain={autoScale ? ["dataMin - 5", "dataMax + 5"] : [0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {visibleMetrics.map((metric) => (
              <Area
                key={metric.id}
                type="monotone"
                dataKey={metric.id}
                stroke={metric.color}
                strokeWidth={2}
                fill={`url(#gradient-${metric.id})`}
                connectNulls={false}
              />
            ))}
            {showBrush && <Brush dataKey="time" height={30} stroke="#8884d8" />}
          </AreaChart>
        )

      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} domain={autoScale ? ["dataMin - 5", "dataMax + 5"] : [0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {visibleMetrics.map((metric) => (
              <Bar key={metric.id} dataKey={metric.id} fill={metric.color} opacity={0.8} />
            ))}
          </BarChart>
        )

      default:
        return null
    }
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
            <CardTitle className="text-xl text-white">{title}</CardTitle>
            <div className="flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", isRunning ? "bg-green-400 animate-pulse" : "bg-red-400")} />
              <span className="text-sm text-slate-400">{isRunning ? "Live" : "Paused"}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <Button variant="outline" size="sm" onClick={() => setIsRunning(!isRunning)} className="text-xs">
              {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </Button>

            {/* Chart Type */}
            <Tabs value={chartType} onValueChange={(value: any) => setChartType(value)}>
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger value="line" className="text-xs">
                  Line
                </TabsTrigger>
                <TabsTrigger value="area" className="text-xs">
                  Area
                </TabsTrigger>
                <TabsTrigger value="bar" className="text-xs">
                  Bar
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Time Window */}
            <Select value={timeWindow} onValueChange={(value: any) => setTimeWindow(value)}>
              <SelectTrigger className="w-24 bg-slate-800 border-slate-700 text-white text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(timeWindows).map(([key, config]) => (
                  <SelectItem key={key} value={key} className="text-xs">
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Settings */}
            <Button
              variant={showSettings ? "default" : "outline"}
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-xs"
            >
              <Settings className="w-3 h-3" />
            </Button>

            {/* Expand */}
            <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-xs">
              {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </Button>

            {/* Export */}
            {enableExport && (
              <Button variant="outline" size="sm" onClick={exportData} className="text-xs bg-transparent">
                <Download className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-800/50 rounded-lg p-4 mt-4 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Alert Threshold</Label>
                  <Slider
                    value={[alertThreshold]}
                    onValueChange={(value) => setAlertThreshold(value[0])}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-xs text-slate-400 text-center">{alertThreshold}%</div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Smoothing Factor</Label>
                  <Slider
                    value={[smoothingFactor]}
                    onValueChange={(value) => setSmoothingFactor(value[0])}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-xs text-slate-400 text-center">{smoothingFactor.toFixed(1)}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-scale" checked={autoScale} onCheckedChange={setAutoScale} />
                    <Label htmlFor="auto-scale" className="text-slate-300">
                      Auto Scale
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="show-brush" checked={showBrush} onCheckedChange={setShowBrush} />
                    <Label htmlFor="show-brush" className="text-slate-300">
                      Show Brush
                    </Label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Metrics Controls */}
        <div className="mb-4 flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <Button
              key={metric.id}
              variant={metric.visible ? "default" : "outline"}
              size="sm"
              onClick={() => toggleMetricVisibility(metric.id)}
              className="text-xs"
              style={{
                backgroundColor: metric.visible ? metric.color : undefined,
                borderColor: metric.color,
              }}
            >
              {metric.visible ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
              {metric.name}
            </Button>
          ))}
        </div>

        {/* Chart */}
        <div className={cn("w-full", isExpanded ? "h-[calc(100vh-400px)]" : "h-[400px]")}>
          <ResponsiveContainer width="100%" height="100%">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${chartType}-${timeWindow}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {renderChart()}
              </motion.div>
            </AnimatePresence>
          </ResponsiveContainer>
        </div>

        {/* Statistics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics
            .filter((m) => m.visible)
            .map((metric) => {
              const stats = statistics[metric.id]
              if (!stats) return null

              return (
                <div key={metric.id} className="bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.color }} />
                    <span className="text-sm font-medium text-white">{metric.name}</span>
                    {stats.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-green-400" />
                    ) : stats.trend === "down" ? (
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-slate-400" />
                    )}
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current:</span>
                      <span className="text-white font-medium">
                        {stats.current.toFixed(1)}
                        {metric.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Average:</span>
                      <span className="text-slate-300">
                        {stats.avg.toFixed(1)}
                        {metric.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Range:</span>
                      <span className="text-slate-300">
                        {stats.min.toFixed(1)} - {stats.max.toFixed(1)}
                        {metric.unit}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>

        {/* Recent Alerts */}
        {enableAlerts && alerts.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              Recent Alerts
            </h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {alerts
                .slice(-5)
                .reverse()
                .map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-lg text-sm",
                      alert.type === "critical"
                        ? "bg-red-500/10 border border-red-500/20"
                        : "bg-yellow-500/10 border border-yellow-500/20",
                    )}
                  >
                    {alert.type === "critical" ? (
                      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    )}
                    <span className="text-white flex-1">{alert.message}</span>
                    <span className="text-slate-400 text-xs">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RealTimeMetrics
