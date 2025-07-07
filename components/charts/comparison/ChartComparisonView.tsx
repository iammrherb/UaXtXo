"use client"

import type React from "react"
import { useState, useMemo, useCallback } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeftRight,
  Columns2,
  BarChart3,
  TrendingUp,
  Activity,
  Layers,
  Download,
  Eye,
  Maximize2,
  Minimize2,
  Target,
  CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Enhanced vendor data for comparison
const vendorComparisonData = {
  portnox: {
    name: "Portnox CLEAR",
    color: "#00D4AA",
    data: {
      tco: [
        {
          period: "Year 1",
          value: 67900,
          breakdown: { licensing: 27000, implementation: 15000, maintenance: 5400, training: 2500, staffing: 18000 },
        },
        {
          period: "Year 2",
          value: 95300,
          breakdown: { licensing: 54000, implementation: 0, maintenance: 10800, training: 0, staffing: 30500 },
        },
        {
          period: "Year 3",
          value: 168700,
          breakdown: { licensing: 81000, implementation: 0, maintenance: 16200, training: 0, staffing: 71500 },
        },
        {
          period: "Year 4",
          value: 219100,
          breakdown: { licensing: 108000, implementation: 0, maintenance: 21600, training: 0, staffing: 89500 },
        },
        {
          period: "Year 5",
          value: 269500,
          breakdown: { licensing: 135000, implementation: 0, maintenance: 27000, training: 0, staffing: 107500 },
        },
      ],
      features: [
        { category: "Zero Trust", score: 95, benchmark: 85 },
        { category: "Cloud Native", score: 100, benchmark: 70 },
        { category: "Ease of Use", score: 92, benchmark: 75 },
        { category: "Scalability", score: 96, benchmark: 80 },
        { category: "Integration", score: 90, benchmark: 85 },
        { category: "Support", score: 88, benchmark: 82 },
        { category: "Compliance", score: 94, benchmark: 78 },
        { category: "Performance", score: 93, benchmark: 85 },
      ],
      roi: [
        { metric: "Breach Risk Reduction", value: 450000, percentage: 87 },
        { metric: "Operational Savings", value: 125000, percentage: 65 },
        { metric: "Compliance Savings", value: 75000, percentage: 45 },
        { metric: "Insurance Savings", value: 25000, percentage: 30 },
        { metric: "Productivity Gains", value: 85000, percentage: 55 },
      ],
    },
  },
  cisco: {
    name: "Cisco ISE",
    color: "#1BA0D7",
    data: {
      tco: [
        {
          period: "Year 1",
          value: 230250,
          breakdown: {
            licensing: 62500,
            implementation: 45000,
            maintenance: 18750,
            training: 15000,
            staffing: 54000,
            infrastructure: 35000,
          },
        },
        {
          period: "Year 2",
          value: 365500,
          breakdown: {
            licensing: 125000,
            implementation: 0,
            maintenance: 37500,
            training: 0,
            staffing: 108000,
            infrastructure: 35000,
          },
        },
        {
          period: "Year 3",
          value: 500750,
          breakdown: {
            licensing: 187500,
            implementation: 0,
            maintenance: 56250,
            training: 0,
            staffing: 162000,
            infrastructure: 35000,
          },
        },
        {
          period: "Year 4",
          value: 635000,
          breakdown: {
            licensing: 250000,
            implementation: 0,
            maintenance: 75000,
            training: 0,
            staffing: 216000,
            infrastructure: 35000,
          },
        },
        {
          period: "Year 5",
          value: 771250,
          breakdown: {
            licensing: 312500,
            implementation: 0,
            maintenance: 93750,
            training: 0,
            staffing: 270000,
            infrastructure: 35000,
          },
        },
      ],
      features: [
        { category: "Zero Trust", score: 85, benchmark: 85 },
        { category: "Cloud Native", score: 60, benchmark: 70 },
        { category: "Ease of Use", score: 65, benchmark: 75 },
        { category: "Scalability", score: 88, benchmark: 80 },
        { category: "Integration", score: 92, benchmark: 85 },
        { category: "Support", score: 90, benchmark: 82 },
        { category: "Compliance", score: 87, benchmark: 78 },
        { category: "Performance", score: 85, benchmark: 85 },
      ],
      roi: [
        { metric: "Breach Risk Reduction", value: 324000, percentage: 72 },
        { metric: "Operational Savings", value: 85000, percentage: 45 },
        { metric: "Compliance Savings", value: 52500, percentage: 35 },
        { metric: "Insurance Savings", value: 15000, percentage: 15 },
        { metric: "Productivity Gains", value: 45000, percentage: 30 },
      ],
    },
  },
  aruba: {
    name: "Aruba ClearPass",
    color: "#FF6B35",
    data: {
      tco: [
        {
          period: "Year 1",
          value: 155750,
          breakdown: {
            licensing: 47500,
            implementation: 30000,
            maintenance: 14250,
            training: 8000,
            staffing: 36000,
            infrastructure: 20000,
          },
        },
        {
          period: "Year 2",
          value: 253500,
          breakdown: {
            licensing: 95000,
            implementation: 0,
            maintenance: 28500,
            training: 0,
            staffing: 72000,
            infrastructure: 20000,
          },
        },
        {
          period: "Year 3",
          value: 351250,
          breakdown: {
            licensing: 142500,
            implementation: 0,
            maintenance: 42750,
            training: 0,
            staffing: 108000,
            infrastructure: 20000,
          },
        },
        {
          period: "Year 4",
          value: 449000,
          breakdown: {
            licensing: 190000,
            implementation: 0,
            maintenance: 57000,
            training: 0,
            staffing: 144000,
            infrastructure: 20000,
          },
        },
        {
          period: "Year 5",
          value: 546750,
          breakdown: {
            licensing: 237500,
            implementation: 0,
            maintenance: 71250,
            training: 0,
            staffing: 180000,
            infrastructure: 20000,
          },
        },
      ],
      features: [
        { category: "Zero Trust", score: 82, benchmark: 85 },
        { category: "Cloud Native", score: 70, benchmark: 70 },
        { category: "Ease of Use", score: 78, benchmark: 75 },
        { category: "Scalability", score: 85, benchmark: 80 },
        { category: "Integration", score: 88, benchmark: 85 },
        { category: "Support", score: 85, benchmark: 82 },
        { category: "Compliance", score: 84, benchmark: 78 },
        { category: "Performance", score: 82, benchmark: 85 },
      ],
      roi: [
        { metric: "Breach Risk Reduction", value: 306000, percentage: 68 },
        { metric: "Operational Savings", value: 75000, percentage: 40 },
        { metric: "Compliance Savings", value: 45000, percentage: 30 },
        { metric: "Insurance Savings", value: 12000, percentage: 12 },
        { metric: "Productivity Gains", value: 38000, percentage: 25 },
      ],
    },
  },
  forescout: {
    name: "Forescout",
    color: "#8B5CF6",
    data: {
      tco: [
        {
          period: "Year 1",
          value: 193500,
          breakdown: {
            licensing: 55000,
            implementation: 40000,
            maintenance: 16500,
            training: 12000,
            staffing: 45000,
            infrastructure: 25000,
          },
        },
        {
          period: "Year 2",
          value: 310000,
          breakdown: {
            licensing: 110000,
            implementation: 0,
            maintenance: 33000,
            training: 0,
            staffing: 90000,
            infrastructure: 25000,
          },
        },
        {
          period: "Year 3",
          value: 426500,
          breakdown: {
            licensing: 165000,
            implementation: 0,
            maintenance: 49500,
            training: 0,
            staffing: 135000,
            infrastructure: 25000,
          },
        },
        {
          period: "Year 4",
          value: 543000,
          breakdown: {
            licensing: 220000,
            implementation: 0,
            maintenance: 66000,
            training: 0,
            staffing: 180000,
            infrastructure: 25000,
          },
        },
        {
          period: "Year 5",
          value: 659500,
          breakdown: {
            licensing: 275000,
            implementation: 0,
            maintenance: 82500,
            training: 0,
            staffing: 225000,
            infrastructure: 25000,
          },
        },
      ],
      features: [
        { category: "Zero Trust", score: 78, benchmark: 85 },
        { category: "Cloud Native", score: 65, benchmark: 70 },
        { category: "Ease of Use", score: 70, benchmark: 75 },
        { category: "Scalability", score: 82, benchmark: 80 },
        { category: "Integration", score: 85, benchmark: 85 },
        { category: "Support", score: 82, benchmark: 82 },
        { category: "Compliance", score: 80, benchmark: 78 },
        { category: "Performance", score: 79, benchmark: 85 },
      ],
      roi: [
        { metric: "Breach Risk Reduction", value: 315000, percentage: 70 },
        { metric: "Operational Savings", value: 68000, percentage: 35 },
        { metric: "Compliance Savings", value: 48000, percentage: 32 },
        { metric: "Insurance Savings", value: 14000, percentage: 14 },
        { metric: "Productivity Gains", value: 42000, percentage: 28 },
      ],
    },
  },
}

interface ChartComparisonViewProps {
  className?: string
  defaultVendors?: string[]
  defaultMetric?: "tco" | "features" | "roi"
  enableExport?: boolean
}

const ChartComparisonView: React.FC<ChartComparisonViewProps> = ({
  className,
  defaultVendors = ["portnox", "cisco"],
  defaultMetric = "tco",
  enableExport = true,
}) => {
  const [selectedVendors, setSelectedVendors] = useState<string[]>(defaultVendors)
  const [comparisonMetric, setComparisonMetric] = useState<"tco" | "features" | "roi">(defaultMetric)
  const [chartType, setChartType] = useState<"bar" | "line" | "area" | "pie" | "scatter" | "composed">("bar")
  const [viewMode, setViewMode] = useState<"side-by-side" | "overlay" | "difference">("side-by-side")
  const [timeRange, setTimeRange] = useState<"all" | "1Y" | "3Y" | "5Y">("3Y")
  const [showBenchmark, setShowBenchmark] = useState(true)
  const [showPercentages, setShowPercentages] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1000)
  const [isExpanded, setIsExpanded] = useState(false)
  const [highlightDifferences, setHighlightDifferences] = useState(true)
  const [normalizeData, setNormalizeData] = useState(false)

  // Prepare comparison data based on selected vendors and metric
  const comparisonData = useMemo(() => {
    const vendors = selectedVendors.map((id) => vendorComparisonData[id]).filter(Boolean)

    switch (comparisonMetric) {
      case "tco":
        const periods = vendors[0]?.data.tco.map((item) => item.period) || []
        return periods
          .map((period) => {
            const dataPoint = { period }
            vendors.forEach((vendor) => {
              const periodData = vendor.data.tco.find((item) => item.period === period)
              dataPoint[vendor.name] = periodData?.value || 0
              dataPoint[`${vendor.name}_breakdown`] = periodData?.breakdown || {}
            })
            return dataPoint
          })
          .filter((_, index) => {
            if (timeRange === "1Y") return index === 0
            if (timeRange === "3Y") return index <= 2
            if (timeRange === "5Y") return index <= 4
            return true
          })

      case "features":
        const categories = vendors[0]?.data.features.map((item) => item.category) || []
        return categories.map((category) => {
          const dataPoint = { category }
          vendors.forEach((vendor) => {
            const featureData = vendor.data.features.find((item) => item.category === category)
            dataPoint[vendor.name] = featureData?.score || 0
            if (showBenchmark) {
              dataPoint[`${vendor.name}_benchmark`] = featureData?.benchmark || 0
            }
          })
          return dataPoint
        })

      case "roi":
        const metrics = vendors[0]?.data.roi.map((item) => item.metric) || []
        return metrics.map((metric) => {
          const dataPoint = { metric }
          vendors.forEach((vendor) => {
            const roiData = vendor.data.roi.find((item) => item.metric === metric)
            dataPoint[vendor.name] = showPercentages ? roiData?.percentage || 0 : roiData?.value || 0
          })
          return dataPoint
        })

      default:
        return []
    }
  }, [selectedVendors, comparisonMetric, timeRange, showBenchmark, showPercentages])

  // Calculate difference data for difference view
  const differenceData = useMemo(() => {
    if (selectedVendors.length !== 2 || viewMode !== "difference") return []

    const baseVendor = vendorComparisonData[selectedVendors[0]]
    const compareVendor = vendorComparisonData[selectedVendors[1]]

    return comparisonData.map((item) => {
      const result = { ...item }
      const baseValue = item[baseVendor.name] || 0
      const compareValue = item[compareVendor.name] || 0
      result.difference = compareValue - baseValue
      result.percentageDiff = baseValue !== 0 ? ((compareValue - baseValue) / baseValue) * 100 : 0
      return result
    })
  }, [comparisonData, selectedVendors, viewMode])

  // Normalize data for better comparison
  const normalizedData = useMemo(() => {
    if (!normalizeData) return comparisonData

    return comparisonData.map((item) => {
      const normalized = { ...item }
      selectedVendors.forEach((vendorId) => {
        const vendor = vendorComparisonData[vendorId]
        if (vendor && item[vendor.name]) {
          const maxValue = Math.max(...comparisonData.map((d) => d[vendor.name] || 0))
          normalized[`${vendor.name}_normalized`] = ((item[vendor.name] || 0) / maxValue) * 100
        }
      })
      return normalized
    })
  }, [comparisonData, selectedVendors, normalizeData])

  const activeData = viewMode === "difference" ? differenceData : normalizedData

  const handleVendorToggle = useCallback((vendorId: string) => {
    setSelectedVendors((prev) => {
      if (prev.includes(vendorId)) {
        return prev.filter((id) => id !== vendorId)
      } else if (prev.length < 4) {
        return [...prev, vendorId]
      }
      return prev
    })
  }, [])

  const exportComparison = useCallback(() => {
    const exportData = {
      vendors: selectedVendors.map((id) => vendorComparisonData[id].name),
      metric: comparisonMetric,
      viewMode,
      timeRange,
      data: activeData,
      settings: {
        chartType,
        showBenchmark,
        showPercentages,
        normalizeData,
        highlightDifferences,
      },
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `vendor-comparison-${comparisonMetric}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [
    selectedVendors,
    comparisonMetric,
    viewMode,
    timeRange,
    activeData,
    chartType,
    showBenchmark,
    showPercentages,
    normalizeData,
    highlightDifferences,
  ])

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
                {entry.name}:{" "}
                <span className="font-bold text-white">
                  {comparisonMetric === "tco" || comparisonMetric === "roi"
                    ? `$${entry.value?.toLocaleString()}`
                    : `${entry.value}`}
                </span>
              </span>
            </div>
          ))}
          {viewMode === "difference" && payload[0]?.payload?.percentageDiff && (
            <div className="mt-2 pt-2 border-t border-slate-700">
              <span
                className={cn(
                  "text-sm font-medium",
                  payload[0].payload.percentageDiff > 0 ? "text-red-400" : "text-green-400",
                )}
              >
                {payload[0].payload.percentageDiff > 0 ? "+" : ""}
                {payload[0].payload.percentageDiff.toFixed(1)}% difference
              </span>
            </div>
          )}
        </motion.div>
      )
    }
    return null
  }

  const renderChart = () => {
    const commonProps = {
      data: activeData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    }

    const colors = selectedVendors.map((id) => vendorComparisonData[id]?.color || "#8B5CF6")

    switch (chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis
              dataKey={comparisonMetric === "tco" ? "period" : comparisonMetric === "features" ? "category" : "metric"}
              stroke="#9CA3AF"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) =>
                comparisonMetric === "tco" || comparisonMetric === "roi" ? `$${(value / 1000).toFixed(0)}K` : `${value}`
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {selectedVendors.map((vendorId, index) => {
              const vendor = vendorComparisonData[vendorId]
              const dataKey = normalizeData ? `${vendor.name}_normalized` : vendor.name
              return (
                <Bar
                  key={vendorId}
                  dataKey={dataKey}
                  fill={colors[index]}
                  radius={[4, 4, 0, 0]}
                  animationDuration={animationSpeed}
                />
              )
            })}
            {viewMode === "difference" && (
              <Bar dataKey="difference" fill="#EF4444" radius={[4, 4, 0, 0]} name="Difference" />
            )}
          </BarChart>
        )

      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis
              dataKey={comparisonMetric === "tco" ? "period" : comparisonMetric === "features" ? "category" : "metric"}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {selectedVendors.map((vendorId, index) => {
              const vendor = vendorComparisonData[vendorId]
              const dataKey = normalizeData ? `${vendor.name}_normalized` : vendor.name
              return (
                <Line
                  key={vendorId}
                  type="monotone"
                  dataKey={dataKey}
                  stroke={colors[index]}
                  strokeWidth={3}
                  dot={{ fill: colors[index], strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: colors[index], strokeWidth: 2 }}
                  animationDuration={animationSpeed}
                />
              )
            })}
          </LineChart>
        )

      case "area":
        return (
          <AreaChart {...commonProps}>
            <defs>
              {colors.map((color, index) => (
                <linearGradient key={index} id={`area-gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis
              dataKey={comparisonMetric === "tco" ? "period" : comparisonMetric === "features" ? "category" : "metric"}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {selectedVendors.map((vendorId, index) => {
              const vendor = vendorComparisonData[vendorId]
              const dataKey = normalizeData ? `${vendor.name}_normalized` : vendor.name
              return (
                <Area
                  key={vendorId}
                  type="monotone"
                  dataKey={dataKey}
                  stroke={colors[index]}
                  strokeWidth={2}
                  fill={`url(#area-gradient-${index})`}
                  animationDuration={animationSpeed}
                />
              )
            })}
          </AreaChart>
        )

      case "composed":
        return (
          <ComposedChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis
              dataKey={comparisonMetric === "tco" ? "period" : comparisonMetric === "features" ? "category" : "metric"}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {selectedVendors.map((vendorId, index) => {
              const vendor = vendorComparisonData[vendorId]
              const dataKey = normalizeData ? `${vendor.name}_normalized` : vendor.name
              return index === 0 ? (
                <Bar key={vendorId} dataKey={dataKey} fill={colors[index]} radius={[4, 4, 0, 0]} />
              ) : (
                <Line
                  key={vendorId}
                  type="monotone"
                  dataKey={dataKey}
                  stroke={colors[index]}
                  strokeWidth={3}
                  dot={{ fill: colors[index], strokeWidth: 2, r: 4 }}
                />
              )
            })}
          </ComposedChart>
        )

      default:
        return null
    }
  }

  const renderSideBySideCharts = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {selectedVendors.slice(0, 2).map((vendorId, index) => {
          const vendor = vendorComparisonData[vendorId]
          const vendorData = activeData.map((item) => ({
            ...item,
            value: item[vendor.name] || 0,
          }))

          return (
            <div key={vendorId} className="border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: vendor.color }} />
                  {vendor.name}
                </h4>
                <Badge variant="outline" className="text-slate-300">
                  {comparisonMetric.toUpperCase()}
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vendorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
                  <XAxis
                    dataKey={
                      comparisonMetric === "tco" ? "period" : comparisonMetric === "features" ? "category" : "metric"
                    }
                    stroke="#9CA3AF"
                    fontSize={10}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    stroke="#9CA3AF"
                    fontSize={10}
                    tickFormatter={(value) =>
                      comparisonMetric === "tco" || comparisonMetric === "roi"
                        ? `$${(value / 1000).toFixed(0)}K`
                        : `${value}`
                    }
                  />
                  <Tooltip
                    formatter={(value) => [
                      comparisonMetric === "tco" || comparisonMetric === "roi"
                        ? `$${value.toLocaleString()}`
                        : `${value}`,
                      vendor.name,
                    ]}
                  />
                  <Bar dataKey="value" fill={vendor.color} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Card
      className={cn(
        "bg-slate-900/50 border-slate-700/50 backdrop-blur-lg",
        isExpanded && "fixed inset-4 z-50 overflow-auto",
        className,
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-white">Vendor Comparison Analysis</CardTitle>
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger value="side-by-side" className="text-xs">
                  <Columns2 className="w-3 h-3" />
                </TabsTrigger>
                <TabsTrigger value="overlay" className="text-xs">
                  <ArrowLeftRight className="w-3 h-3" />
                </TabsTrigger>
                <TabsTrigger value="difference" className="text-xs">
                  <Target className="w-3 h-3" />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Chart Type Selector */}
            <Tabs value={chartType} onValueChange={(value) => setChartType(value as any)}>
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger value="bar" className="text-xs">
                  <BarChart3 className="w-3 h-3" />
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

            {/* Expand/Export */}
            <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </Button>

            {enableExport && (
              <Button variant="outline" size="sm" onClick={exportComparison}>
                <Download className="w-3 h-3 mr-1" />
                Export
              </Button>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          {/* Vendor Selection */}
          <div className="space-y-2">
            <Label className="text-slate-300">Vendors (max 4)</Label>
            <div className="space-y-2">
              {Object.entries(vendorComparisonData).map(([id, vendor]) => (
                <div key={id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={id}
                    checked={selectedVendors.includes(id)}
                    onChange={() => handleVendorToggle(id)}
                    className="rounded border-slate-600"
                  />
                  <label htmlFor={id} className="text-sm text-slate-300 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vendor.color }} />
                    {vendor.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Metric Selection */}
          <div className="space-y-2">
            <Label className="text-slate-300">Comparison Metric</Label>
            <Select value={comparisonMetric} onValueChange={(value) => setComparisonMetric(value as any)}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tco">Total Cost of Ownership</SelectItem>
                <SelectItem value="features">Feature Comparison</SelectItem>
                <SelectItem value="roi">ROI Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Time Range */}
          {comparisonMetric === "tco" && (
            <div className="space-y-2">
              <Label className="text-slate-300">Time Range</Label>
              <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1Y">1 Year</SelectItem>
                  <SelectItem value="3Y">3 Years</SelectItem>
                  <SelectItem value="5Y">5 Years</SelectItem>
                  <SelectItem value="all">All Periods</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            <Label className="text-slate-300">Display Options</Label>
            <div className="space-y-2">
              {comparisonMetric === "features" && (
                <div className="flex items-center space-x-2">
                  <Switch id="benchmark" checked={showBenchmark} onCheckedChange={setShowBenchmark} />
                  <Label htmlFor="benchmark" className="text-xs text-slate-400">
                    Show Benchmark
                  </Label>
                </div>
              )}

              {comparisonMetric === "roi" && (
                <div className="flex items-center space-x-2">
                  <Switch id="percentages" checked={showPercentages} onCheckedChange={setShowPercentages} />
                  <Label htmlFor="percentages" className="text-xs text-slate-400">
                    Show Percentages
                  </Label>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch id="normalize" checked={normalizeData} onCheckedChange={setNormalizeData} />
                <Label htmlFor="normalize" className="text-xs text-slate-400">
                  Normalize Data
                </Label>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Comparison Insights */}
        {selectedVendors.length >= 2 && (
          <Alert className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
            <Eye className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              <strong>Comparison Insight:</strong>
              {comparisonMetric === "tco" &&
                ` Portnox CLEAR shows ${Math.round(((vendorComparisonData.cisco.data.tco[2].value - vendorComparisonData.portnox.data.tco[2].value) / vendorComparisonData.cisco.data.tco[2].value) * 100)}% lower 3-year TCO compared to Cisco ISE.`}
              {comparisonMetric === "features" &&
                ` Portnox CLEAR leads in ${vendorComparisonData.portnox.data.features.filter((f) => f.score > 90).length} out of ${vendorComparisonData.portnox.data.features.length} feature categories.`}
              {comparisonMetric === "roi" &&
                ` Portnox CLEAR delivers ${Math.round(vendorComparisonData.portnox.data.roi.reduce((sum, item) => sum + item.value, 0) / 1000)}K total annual benefits.`}
            </AlertDescription>
          </Alert>
        )}

        {/* Chart Display */}
        <div className={cn("w-full", isExpanded ? "h-[calc(100vh-400px)]" : "h-[500px]")}>
          {viewMode === "side-by-side" && selectedVendors.length >= 2 ? (
            renderSideBySideCharts()
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${comparisonMetric}-${chartType}-${viewMode}-${selectedVendors.join("-")}`}
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
          )}
        </div>

        {/* Summary Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {selectedVendors.map((vendorId) => {
            const vendor = vendorComparisonData[vendorId]
            let summaryValue = 0
            let summaryLabel = ""

            switch (comparisonMetric) {
              case "tco":
                summaryValue = vendor.data.tco[2]?.value || 0 // 3-year TCO
                summaryLabel = "3-Year TCO"
                break
              case "features":
                summaryValue = Math.round(
                  vendor.data.features.reduce((sum, f) => sum + f.score, 0) / vendor.data.features.length,
                )
                summaryLabel = "Avg Feature Score"
                break
              case "roi":
                summaryValue = vendor.data.roi.reduce((sum, r) => sum + r.value, 0)
                summaryLabel = "Total Annual ROI"
                break
            }

            return (
              <div key={vendorId} className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vendor.color }} />
                  <span className="text-sm text-slate-300">{vendor.name}</span>
                </div>
                <p className="text-lg font-bold text-white">
                  {comparisonMetric === "tco" || comparisonMetric === "roi"
                    ? `$${summaryValue.toLocaleString()}`
                    : summaryValue}
                </p>
                <p className="text-xs text-slate-400">{summaryLabel}</p>
              </div>
            )
          })}
        </div>

        {/* Recommendations */}
        {selectedVendors.includes("portnox") && (
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <CheckCircle className="w-4 h-4" />
              <span className="font-semibold">Recommendation</span>
            </div>
            <p className="text-sm text-green-300">
              Based on this comparison, Portnox CLEAR offers the best value proposition with
              {comparisonMetric === "tco" && " significantly lower total cost of ownership"}
              {comparisonMetric === "features" && " superior feature capabilities"}
              {comparisonMetric === "roi" && " highest return on investment"} compared to traditional NAC solutions.
              Consider Portnox for faster deployment, lower operational overhead, and better security outcomes.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ChartComparisonView
