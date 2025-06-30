"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Zap,
  Shield,
  Users,
  AlertTriangle,
  CheckCircle,
  DollarSign,
} from "lucide-react"
import { ResponsiveContainer, Tooltip, AreaChart, Area } from "recharts"
import { cn } from "@/lib/utils"

interface MetricData {
  id: string
  label: string
  value: number
  unit: string
  trend: "up" | "down" | "stable"
  trendValue: number
  icon: React.ElementType
  color: string
  gradient: string
  sparklineData: Array<{ time: number; value: number }>
  status: "healthy" | "warning" | "critical"
  target?: number
}

interface RealTimeMetricsProps {
  className?: string
  updateInterval?: number
  showSparklines?: boolean
}

const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({
  className,
  updateInterval = 2000,
  showSparklines = true,
}) => {
  const [isLive, setIsLive] = useState(true)
  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Initialize metrics
  const initialMetrics: MetricData[] = useMemo(
    () => [
      {
        id: "tco-savings",
        label: "TCO Savings",
        value: 2450000,
        unit: "$",
        trend: "up",
        trendValue: 12.5,
        icon: DollarSign,
        color: "#10B981",
        gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        sparklineData: [],
        status: "healthy",
        target: 2000000,
      },
      {
        id: "security-score",
        label: "Security Score",
        value: 94,
        unit: "%",
        trend: "up",
        trendValue: 2.1,
        icon: Shield,
        color: "#3B82F6",
        gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
        sparklineData: [],
        status: "healthy",
        target: 95,
      },
      {
        id: "active-users",
        label: "Active Users",
        value: 15420,
        unit: "",
        trend: "up",
        trendValue: 8.3,
        icon: Users,
        color: "#8B5CF6",
        gradient: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
        sparklineData: [],
        status: "healthy",
        target: 15000,
      },
      {
        id: "threat-detection",
        label: "Threats Blocked",
        value: 1247,
        unit: "/hr",
        trend: "down",
        trendValue: -5.2,
        icon: AlertTriangle,
        color: "#EF4444",
        gradient: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
        sparklineData: [],
        status: "warning",
        target: 1000,
      },
      {
        id: "compliance-rate",
        label: "Compliance Rate",
        value: 98.7,
        unit: "%",
        trend: "stable",
        trendValue: 0.1,
        icon: CheckCircle,
        color: "#10B981",
        gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        sparklineData: [],
        status: "healthy",
        target: 98,
      },
      {
        id: "response-time",
        label: "Avg Response Time",
        value: 145,
        unit: "ms",
        trend: "down",
        trendValue: -12.8,
        icon: Zap,
        color: "#F59E0B",
        gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
        sparklineData: [],
        status: "healthy",
        target: 200,
      },
    ],
    [],
  )

  // Initialize sparkline data
  useEffect(() => {
    const initializeSparklines = () => {
      const now = Date.now()
      const sparklineData = Array.from({ length: 20 }, (_, i) => ({
        time: now - (19 - i) * 30000, // 30 seconds intervals
        value: Math.random() * 100,
      }))

      setMetrics(
        initialMetrics.map((metric) => ({
          ...metric,
          sparklineData: sparklineData.map((point) => ({
            ...point,
            value: metric.value + (Math.random() - 0.5) * metric.value * 0.1,
          })),
        })),
      )
    }

    initializeSparklines()
  }, [initialMetrics])

  // Real-time updates
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setMetrics((prevMetrics) =>
        prevMetrics.map((metric) => {
          const variation = (Math.random() - 0.5) * 0.05 // ±5% variation
          const newValue = Math.max(0, metric.value * (1 + variation))
          const newTrend = variation > 0.01 ? "up" : variation < -0.01 ? "down" : "stable"

          // Update sparkline data
          const now = Date.now()
          const newSparklineData = [...metric.sparklineData.slice(1), { time: now, value: newValue }]

          // Determine status based on target
          let status: "healthy" | "warning" | "critical" = "healthy"
          if (metric.target) {
            const performance = newValue / metric.target
            if (performance < 0.8) status = "critical"
            else if (performance < 0.95) status = "warning"
          }

          return {
            ...metric,
            value: newValue,
            trend: newTrend,
            trendValue: Math.abs(variation * 100),
            sparklineData: newSparklineData,
            status,
          }
        }),
      )
      setLastUpdate(new Date())
    }, updateInterval)

    return () => clearInterval(interval)
  }, [isLive, updateInterval])

  const formatValue = (value: number, unit: string) => {
    if (unit === "$") {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    if (unit === "" && value > 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return `${value.toFixed(unit === "%" || unit === "ms" ? 1 : 0)}${unit}`
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return TrendingUp
      case "down":
        return TrendingDown
      default:
        return Activity
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "critical":
        return "text-red-400"
      default:
        return "text-slate-400"
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Real-Time Metrics</h2>
          <p className="text-slate-400 text-sm">Last updated: {lastUpdate.toLocaleTimeString()}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant={isLive ? "default" : "secondary"}
            className={cn("flex items-center gap-1", isLive && "bg-green-500/20 text-green-400 border-green-500/30")}
          >
            <div className={cn("w-2 h-2 rounded-full", isLive ? "bg-green-400 animate-pulse" : "bg-slate-400")} />
            {isLive ? "Live" : "Paused"}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLive(!isLive)}
            className="text-slate-300 border-slate-600 hover:bg-slate-700"
          >
            {isLive ? "Pause" : "Resume"}
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const TrendIcon = getTrendIcon(metric.trend)
          const IconComponent = metric.icon

          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-lg hover:bg-slate-800/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg" style={{ background: metric.gradient }}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">{metric.label}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">
                            {formatValue(metric.value, metric.unit)}
                          </span>
                          <div className={cn("flex items-center gap-1 text-xs", getStatusColor(metric.status))}>
                            <div
                              className={cn(
                                "w-2 h-2 rounded-full",
                                metric.status === "healthy"
                                  ? "bg-green-400"
                                  : metric.status === "warning"
                                    ? "bg-yellow-400"
                                    : "bg-red-400",
                              )}
                            />
                            {metric.status}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-1 text-xs px-2 py-1 rounded-full",
                        metric.trend === "up"
                          ? "bg-green-500/20 text-green-400"
                          : metric.trend === "down"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-slate-500/20 text-slate-400",
                      )}
                    >
                      <TrendIcon className="w-3 h-3" />
                      {metric.trendValue.toFixed(1)}%
                    </div>
                  </div>

                  {/* Sparkline Chart */}
                  {showSparklines && metric.sparklineData.length > 0 && (
                    <div className="h-16 -mx-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={metric.sparklineData}>
                          <defs>
                            <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={metric.color} stopOpacity={0.3} />
                              <stop offset="100%" stopColor={metric.color} stopOpacity={0.05} />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={metric.color}
                            strokeWidth={2}
                            fill={`url(#gradient-${metric.id})`}
                            dot={false}
                          />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-slate-800 border border-slate-600 rounded-lg p-2 text-xs">
                                    <p className="text-white">{formatValue(payload[0].value as number, metric.unit)}</p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Target Progress */}
                  {metric.target && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Target: {formatValue(metric.target, metric.unit)}</span>
                        <span>{((metric.value / metric.target) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, (metric.value / metric.target) * 100)}%`,
                            background: metric.gradient,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Summary Stats */}
      <Card className="bg-slate-900/30 border-slate-700/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {metrics.filter((m) => m.status === "healthy").length}
              </div>
              <div className="text-sm text-slate-400">Healthy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {metrics.filter((m) => m.status === "warning").length}
              </div>
              <div className="text-sm text-slate-400">Warning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {metrics.filter((m) => m.status === "critical").length}
              </div>
              <div className="text-sm text-slate-400">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{metrics.filter((m) => m.trend === "up").length}</div>
              <div className="text-sm text-slate-400">Trending Up</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RealTimeMetrics
