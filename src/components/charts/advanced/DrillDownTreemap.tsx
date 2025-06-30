"use client"

import React, { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Treemap, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface TreemapNode {
  name: string
  value: number
  children?: TreemapNode[]
  color?: string
  category?: string
  description?: string
  trend?: "up" | "down" | "stable"
  trendValue?: number
}

interface DrillDownTreemapProps {
  data: TreemapNode[]
  title: string
  className?: string
  colorScheme?: "default" | "portnox" | "cost" | "security"
}

const COLOR_SCHEMES = {
  default: ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#6366F1"],
  portnox: ["#00D4AA", "#00B894", "#00A085", "#008F76", "#007A67", "#006558"],
  cost: ["#EF4444", "#F97316", "#F59E0B", "#EAB308", "#84CC16", "#22C55E"],
  security: ["#DC2626", "#EA580C", "#D97706", "#CA8A04", "#65A30D", "#16A34A"],
}

const DrillDownTreemap: React.FC<DrillDownTreemapProps> = ({ data, title, className, colorScheme = "default" }) => {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  const colors = COLOR_SCHEMES[colorScheme]

  const currentData = useMemo(() => {
    let current = data
    for (const pathSegment of currentPath) {
      const node = current.find((item) => item.name === pathSegment)
      if (node && node.children) {
        current = node.children
      } else {
        break
      }
    }
    return current
  }, [data, currentPath])

  const processedData = useMemo(() => {
    return currentData.map((item, index) => ({
      ...item,
      color: item.color || colors[index % colors.length],
      hasChildren: Boolean(item.children && item.children.length > 0),
    }))
  }, [currentData, colors])

  const handleCellClick = useCallback((data: any) => {
    if (data && data.hasChildren) {
      setCurrentPath((prev) => [...prev, data.name])
    }
  }, [])

  const handleDrillUp = useCallback(() => {
    setCurrentPath((prev) => prev.slice(0, -1))
  }, [])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/95 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4 shadow-2xl max-w-xs"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: data.color }} />
            <h3 className="font-semibold text-white">{data.name}</h3>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Value:</span>
              <span className="text-white font-medium">${data.value?.toLocaleString()}</span>
            </div>

            {data.category && (
              <div className="flex justify-between">
                <span className="text-slate-400">Category:</span>
                <Badge variant="outline" className="text-xs">
                  {data.category}
                </Badge>
              </div>
            )}

            {data.trend && (
              <div className="flex justify-between">
                <span className="text-slate-400">Trend:</span>
                <span
                  className={cn(
                    "text-xs font-medium",
                    data.trend === "up" ? "text-green-400" : data.trend === "down" ? "text-red-400" : "text-slate-400",
                  )}
                >
                  {data.trend === "up" ? "↗" : data.trend === "down" ? "↘" : "→"}
                  {data.trendValue ? ` ${data.trendValue}%` : ""}
                </span>
              </div>
            )}

            {data.description && (
              <p className="text-slate-300 text-xs mt-2 pt-2 border-t border-slate-700">{data.description}</p>
            )}

            {data.hasChildren && (
              <p className="text-blue-400 text-xs mt-2 pt-2 border-t border-slate-700">Click to drill down</p>
            )}
          </div>
        </motion.div>
      )
    }
    return null
  }

  const CustomizedContent = (props: any) => {
    const { root, depth, x, y, width, height, index, payload, colors } = props

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: payload.color,
            stroke: "#1F2937",
            strokeWidth: 2,
            cursor: payload.hasChildren ? "pointer" : "default",
          }}
          rx={4}
          className="transition-all duration-200 hover:brightness-110"
          onClick={() => handleCellClick(payload)}
        />

        {width > 60 && height > 40 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 10}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize={Math.min(width / 8, height / 4, 14)}
              fontWeight="bold"
            >
              {payload.name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 10}
              textAnchor="middle"
              fill="#E2E8F0"
              fontSize={Math.min(width / 10, height / 6, 12)}
            >
              ${(payload.value / 1000).toFixed(0)}K
            </text>
            {payload.hasChildren && width > 80 && height > 60 && (
              <text x={x + width - 8} y={y + 16} textAnchor="end" fill="#60A5FA" fontSize="10">
                ⤵
              </text>
            )}
          </>
        )}
      </g>
    )
  }

  const breadcrumbs = ["Root", ...currentPath]

  return (
    <Card
      className={cn(
        "bg-slate-900/50 border-slate-700/50 backdrop-blur-lg transition-all duration-300",
        isExpanded && "fixed inset-4 z-50",
        className,
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentPath.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleDrillUp} className="text-slate-400 hover:text-white">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
            <CardTitle className="text-xl text-white">{title}</CardTitle>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-400 hover:text-white"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="w-3 h-3 text-slate-500" />}
              <button
                onClick={() => setCurrentPath(currentPath.slice(0, index))}
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
      </CardHeader>

      <CardContent className="pt-0">
        <div className={cn("w-full", isExpanded ? "h-[calc(100vh-200px)]" : "h-[500px]")}>
          <ResponsiveContainer width="100%" height="100%">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPath.join("/")}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Treemap
                  data={processedData}
                  dataKey="value"
                  aspectRatio={4 / 3}
                  stroke="#1F2937"
                  strokeWidth={2}
                  content={<CustomizedContent />}
                >
                  <Tooltip content={<CustomTooltip />} />
                </Treemap>
              </motion.div>
            </AnimatePresence>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-white">{processedData.length}</div>
            <div className="text-sm text-slate-400">Items</div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-white">
              ${(processedData.reduce((acc, item) => acc + item.value, 0) / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-slate-400">Total Value</div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-white">
              ${(Math.max(...processedData.map((item) => item.value)) / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-slate-400">Largest</div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-white">
              {processedData.filter((item) => item.hasChildren).length}
            </div>
            <div className="text-sm text-slate-400">Expandable</div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-2">
          {processedData.slice(0, 6).map((item, index) => (
            <div key={item.name} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
              <span className="text-slate-300">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default DrillDownTreemap
