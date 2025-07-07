"use client"

import React, { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Treemap, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Search, Filter, Download } from "lucide-react"
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
  metadata?: Record<string, any>
}

interface DrillDownTreemapProps {
  data: TreemapNode[]
  title: string
  className?: string
  colorScheme?: "default" | "portnox" | "cost" | "security"
  enableFiltering?: boolean
  enableSearch?: boolean
  enableExport?: boolean
}

const COLOR_SCHEMES = {
  default: ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#6366F1"],
  portnox: ["#00D4AA", "#00B894", "#00A085", "#008F76", "#007A67", "#006558"],
  cost: ["#EF4444", "#F97316", "#F59E0B", "#EAB308", "#84CC16", "#22C55E"],
  security: ["#DC2626", "#EA580C", "#D97706", "#CA8A04", "#65A30D", "#16A34A"],
}

const DrillDownTreemap: React.FC<DrillDownTreemapProps> = ({
  data,
  title,
  className,
  colorScheme = "default",
  enableFiltering = true,
  enableSearch = true,
  enableExport = true,
}) => {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [valueRange, setValueRange] = useState<[number, number]>([0, 1000000])
  const [sortBy, setSortBy] = useState<"name" | "value" | "trend">("value")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [showTrendOnly, setShowTrendOnly] = useState(false)

  const colors = COLOR_SCHEMES[colorScheme]

  // Get current data based on path
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

  // Get all available categories for filtering
  const availableCategories = useMemo(() => {
    const categories = new Set<string>()
    const collectCategories = (nodes: TreemapNode[]) => {
      nodes.forEach((node) => {
        if (node.category) categories.add(node.category)
        if (node.children) collectCategories(node.children)
      })
    }
    collectCategories(data)
    return Array.from(categories)
  }, [data])

  // Apply filters and search
  const filteredData = useMemo(() => {
    let filtered = [...currentData]

    // Search filter
    if (searchTerm && enableSearch) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) => item.category && selectedCategories.includes(item.category))
    }

    // Value range filter
    filtered = filtered.filter((item) => item.value >= valueRange[0] && item.value <= valueRange[1])

    // Trend filter
    if (showTrendOnly) {
      filtered = filtered.filter((item) => item.trend && item.trend !== "stable")
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "value":
          comparison = a.value - b.value
          break
        case "trend":
          const trendOrder = { up: 2, stable: 1, down: 0 }
          comparison = (trendOrder[a.trend || "stable"] || 0) - (trendOrder[b.trend || "stable"] || 0)
          break
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

    return filtered
  }, [currentData, searchTerm, selectedCategories, valueRange, showTrendOnly, sortBy, sortOrder, enableSearch])

  // Process data for treemap with enhanced properties
  const processedData = useMemo(() => {
    return filteredData.map((item, index) => ({
      ...item,
      color: item.color || colors[index % colors.length],
      hasChildren: Boolean(item.children && item.children.length > 0),
      displayValue: item.value,
      opacity: searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase()) ? 0.5 : 1,
    }))
  }, [filteredData, colors, searchTerm])

  const handleCellClick = useCallback((data: any) => {
    if (data && data.hasChildren) {
      setCurrentPath((prev) => [...prev, data.name])
    }
  }, [])

  const handleDrillUp = useCallback(() => {
    setCurrentPath((prev) => prev.slice(0, -1))
  }, [])

  const handleExport = useCallback(() => {
    const exportData = {
      title,
      currentPath,
      data: processedData,
      filters: {
        searchTerm,
        selectedCategories,
        valueRange,
        sortBy,
        sortOrder,
        showTrendOnly,
      },
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `treemap-${title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [title, currentPath, processedData, searchTerm, selectedCategories, valueRange, sortBy, sortOrder, showTrendOnly])

  const clearAllFilters = useCallback(() => {
    setSearchTerm("")
    setSelectedCategories([])
    setValueRange([0, 1000000])
    setShowTrendOnly(false)
    setSortBy("value")
    setSortOrder("desc")
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

            {data.metadata && Object.keys(data.metadata).length > 0 && (
              <div className="mt-2 pt-2 border-t border-slate-700">
                {Object.entries(data.metadata)
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-slate-400 capitalize">{key}:</span>
                      <span className="text-slate-300">{String(value)}</span>
                    </div>
                  ))}
              </div>
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
            opacity: payload.opacity || 1,
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
            {payload.trend && width > 100 && height > 80 && (
              <text
                x={x + 8}
                y={y + height - 8}
                textAnchor="start"
                fill={payload.trend === "up" ? "#10B981" : payload.trend === "down" ? "#EF4444" : "#6B7280"}
                fontSize="12"
              >
                {payload.trend === "up" ? "↗" : payload.trend === "down" ? "↘" : "→"}
              </text>
            )}
          </>
        )}
      </g>
    )
  }

  const breadcrumbs = ["Root", ...currentPath]

  const renderFilters = () => {
    if (!enableFiltering || !showFilters) return null

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
          {/* Search */}
          {enableSearch && (
            <div className="space-y-2">
              <Label className="text-slate-300">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search nodes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
            </div>
          )}

          {/* Category Filter */}
          {availableCategories.length > 0 && (
            <div className="space-y-2">
              <Label className="text-slate-300">Categories</Label>
              <Select
                value={selectedCategories.join(",")}
                onValueChange={(value) => setSelectedCategories(value ? value.split(",") : [])}
              >
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select categories..." />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Value Range */}
          <div className="space-y-2">
            <Label className="text-slate-300">Value Range</Label>
            <div className="px-2">
              <Slider
                value={valueRange}
                onValueChange={setValueRange}
                max={1000000}
                min={0}
                step={10000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>${(valueRange[0] / 1000).toFixed(0)}K</span>
                <span>${(valueRange[1] / 1000).toFixed(0)}K</span>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="space-y-2">
            <Label className="text-slate-300">Sort By</Label>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="value">Value</SelectItem>
                <SelectItem value="trend">Trend</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <div className="space-y-2">
            <Label className="text-slate-300">Order</Label>
            <Select value={sortOrder} onValueChange={(value: any) => setSortOrder(value)}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Show Trending Only */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="trending-only" checked={showTrendOnly} onCheckedChange={setShowTrendOnly} />
              <Label htmlFor="trending-only" className="text-slate-300">
                Show trending items only
              </Label>
            </div>
          </div>
        </div>
      </motion.div>
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
            {currentPath.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleDrillUp} className="text-slate-400 hover:text-white">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
            <CardTitle className="text-xl text-white">{title}</CardTitle>
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

            {/* Expand/Minimize */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-400 hover:text-white"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>

            {/* Export */}
            {enableExport && (
              <Button variant="outline" size="sm" onClick={handleExport} className="text-xs bg-transparent">
                <Download className="w-3 h-3 mr-1" />
                Export
              </Button>
            )}
          </div>
        </div>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 1 && (
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
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {/* Filters Panel */}
        <AnimatePresence>{renderFilters()}</AnimatePresence>

        {/* Treemap Container */}
        <div className={cn("w-full", isExpanded ? "h-[calc(100vh-300px)]" : "h-[500px]")}>
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

        {/* Enhanced Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-white">{processedData.length}</div>
            <div className="text-sm text-slate-400">
              {filteredData.length !== currentData.length ? "Filtered " : ""}Items
            </div>
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
            <div className="text-sm text-slate-400">Largest Item</div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-white">
              {processedData.filter((item) => item.hasChildren).length}
            </div>
            <div className="text-sm text-slate-400">Expandable</div>
          </div>
        </div>

        {/* Legend with enhanced information */}
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {processedData.slice(0, 8).map((item, index) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300">{item.name}</span>
                <span className="text-slate-400">(${(item.value / 1000).toFixed(0)}K)</span>
                {item.hasChildren && <ChevronRight className="w-3 h-3 text-blue-400" />}
              </div>
            ))}
            {processedData.length > 8 && (
              <span className="text-slate-400 text-sm">+{processedData.length - 8} more</span>
            )}
          </div>

          {/* Instructions */}
          <div className="text-xs text-slate-400 bg-slate-800/30 rounded p-2">
            💡 <strong>Tips:</strong> Click on rectangles with arrows to drill down. Use filters to focus on specific
            categories or value ranges. Hover over items for detailed information.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DrillDownTreemap
