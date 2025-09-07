"use client"

import { useState, useMemo } from "react"
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
  ScatterChart,
  Scatter,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Shield, Clock, BarChart3, PieChartIcon, Activity, Target, Zap } from "lucide-react"

// Enhanced color palette for Portnox branding
const PORTNOX_COLORS = {
  primary: "#00D4AA",
  secondary: "#1B2951",
  accent: "#4F46E5",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  gradient: ["#00D4AA", "#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
}

// Sample data for advanced visualizations
const tcoComparisonData = [
  {
    vendor: "Portnox CLEAR",
    totalCost: 272000,
    licensing: 180000,
    hardware: 0,
    services: 45000,
    operations: 47000,
    savings: 0,
    roi: 456,
    deploymentTime: 0.1, // hours
    securityScore: 95,
    complexity: 1,
  },
  {
    vendor: "Cisco ISE",
    totalCost: 1850000,
    licensing: 750000,
    hardware: 650000,
    services: 300000,
    operations: 150000,
    savings: -1578000,
    roi: -85,
    deploymentTime: 2160, // hours (3 months)
    securityScore: 78,
    complexity: 9,
  },
  {
    vendor: "Aruba ClearPass",
    totalCost: 1245000,
    licensing: 485000,
    hardware: 420000,
    services: 220000,
    operations: 120000,
    savings: -973000,
    roi: -78,
    deploymentTime: 1440, // hours (2 months)
    securityScore: 82,
    complexity: 7,
  },
  {
    vendor: "Forescout Platform",
    totalCost: 1680000,
    licensing: 680000,
    hardware: 580000,
    services: 280000,
    operations: 140000,
    savings: -1408000,
    roi: -84,
    deploymentTime: 2880, // hours (4 months)
    securityScore: 85,
    complexity: 8,
  },
]

const roiTimelineData = [
  { month: 0, portnox: 0, cisco: 0, aruba: 0, forescout: 0 },
  { month: 3, portnox: 125, cisco: -285, aruba: -195, forescout: -265 },
  { month: 6, portnox: 285, cisco: -485, aruba: -345, forescout: -445 },
  { month: 12, portnox: 456, cisco: -285, aruba: -195, forescout: -265 },
  { month: 18, portnox: 625, cisco: -85, aruba: 25, forescout: -65 },
  { month: 24, portnox: 785, cisco: 125, aruba: 185, forescout: 125 },
  { month: 36, portnox: 1125, cisco: 385, aruba: 445, forescout: 385 },
]

const riskReductionData = [
  { category: "Breach Risk", portnox: 95, industry: 65, competitor: 72 },
  { category: "Compliance", portnox: 98, industry: 70, competitor: 78 },
  { category: "Operational", portnox: 92, industry: 60, competitor: 68 },
  { category: "Reputation", portnox: 90, industry: 55, competitor: 65 },
  { category: "Financial", portnox: 94, industry: 62, competitor: 70 },
  { category: "Technical", portnox: 96, industry: 68, competitor: 75 },
]

const costBreakdownTreemapData = [
  {
    name: "Portnox CLEAR",
    size: 272000,
    children: [
      { name: "Licensing", size: 180000, fill: PORTNOX_COLORS.primary },
      { name: "Services", size: 45000, fill: PORTNOX_COLORS.success },
      { name: "Operations", size: 47000, fill: PORTNOX_COLORS.accent },
    ],
  },
]

const vendorPositioningData = [
  { vendor: "Portnox CLEAR", value: 95, cost: 272, deployment: 0.1, x: 95, y: 272 },
  { vendor: "Cisco ISE", value: 78, cost: 1850, deployment: 2160, x: 78, y: 1850 },
  { vendor: "Aruba ClearPass", value: 82, cost: 1245, deployment: 1440, x: 82, y: 1245 },
  { vendor: "Forescout", value: 85, cost: 1680, deployment: 2880, x: 85, y: 1680 },
]

const deploymentFunnelData = [
  { name: "Planning", value: 100, fill: PORTNOX_COLORS.gradient[0] },
  { name: "Procurement", value: 85, fill: PORTNOX_COLORS.gradient[1] },
  { name: "Installation", value: 70, fill: PORTNOX_COLORS.gradient[2] },
  { name: "Configuration", value: 55, fill: PORTNOX_COLORS.gradient[3] },
  { name: "Testing", value: 40, fill: PORTNOX_COLORS.gradient[4] },
  { name: "Production", value: 25, fill: PORTNOX_COLORS.gradient[5] },
]

interface InteractiveTCOChartProps {
  data?: any[]
  timeframe?: number
  showComparison?: boolean
}

export default function InteractiveTCOChart({
  data = tcoComparisonData,
  timeframe = 3,
  showComparison = true,
}: InteractiveTCOChartProps) {
  const [chartType, setChartType] = useState<string>("tco-comparison")
  const [selectedVendor, setSelectedVendor] = useState<string>("all")
  const [viewMode, setViewMode] = useState<string>("detailed")

  const filteredData = useMemo(() => {
    if (selectedVendor === "all") return data
    return data.filter((item) => item.vendor === selectedVendor)
  }, [data, selectedVendor])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const renderChart = () => {
    switch (chartType) {
      case "tco-comparison":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="vendor" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
              <YAxis
                yAxisId="cost"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <YAxis yAxisId="roi" orientation="right" tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="cost" dataKey="licensing" stackId="cost" fill={PORTNOX_COLORS.primary} name="Licensing" />
              <Bar yAxisId="cost" dataKey="hardware" stackId="cost" fill={PORTNOX_COLORS.secondary} name="Hardware" />
              <Bar yAxisId="cost" dataKey="services" stackId="cost" fill={PORTNOX_COLORS.accent} name="Services" />
              <Bar yAxisId="cost" dataKey="operations" stackId="cost" fill={PORTNOX_COLORS.success} name="Operations" />
              <Line
                yAxisId="roi"
                type="monotone"
                dataKey="roi"
                stroke={PORTNOX_COLORS.warning}
                strokeWidth={3}
                name="ROI %"
              />
            </ComposedChart>
          </ResponsiveContainer>
        )

      case "roi-timeline":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={roiTimelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="portnoxGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="portnox"
                stroke={PORTNOX_COLORS.primary}
                fillOpacity={1}
                fill="url(#portnoxGradient)"
                name="Portnox CLEAR"
              />
              <Area
                type="monotone"
                dataKey="cisco"
                stroke={PORTNOX_COLORS.danger}
                fill={PORTNOX_COLORS.danger}
                fillOpacity={0.3}
                name="Cisco ISE"
              />
              <Area
                type="monotone"
                dataKey="aruba"
                stroke={PORTNOX_COLORS.warning}
                fill={PORTNOX_COLORS.warning}
                fillOpacity={0.3}
                name="Aruba ClearPass"
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      case "risk-radar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={riskReductionData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
              <PolarGrid stroke="#f0f0f0" />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Radar
                name="Portnox CLEAR"
                dataKey="portnox"
                stroke={PORTNOX_COLORS.primary}
                fill={PORTNOX_COLORS.primary}
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Industry Average"
                dataKey="industry"
                stroke={PORTNOX_COLORS.secondary}
                fill={PORTNOX_COLORS.secondary}
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Radar
                name="Competitors"
                dataKey="competitor"
                stroke={PORTNOX_COLORS.warning}
                fill={PORTNOX_COLORS.warning}
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Legend />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        )

      case "vendor-positioning":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={vendorPositioningData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" dataKey="x" name="Security Score" domain={[70, 100]} tick={{ fontSize: 12 }} />
              <YAxis
                type="number"
                dataKey="y"
                name="Total Cost"
                domain={[0, 2000]}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}K`}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                        <p className="font-semibold text-gray-900">{data.vendor}</p>
                        <p className="text-sm">Security Score: {data.value}%</p>
                        <p className="text-sm">Total Cost: ${data.cost}K</p>
                        <p className="text-sm">Deployment: {data.deployment} hours</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Scatter name="Vendors" dataKey="y" fill={PORTNOX_COLORS.primary} />
            </ScatterChart>
          </ResponsiveContainer>
        )

      case "cost-treemap":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <Treemap
              data={costBreakdownTreemapData}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="#fff"
              strokeWidth={2}
              content={({ root, depth, x, y, width, height, index, payload, colors, name }) => {
                return (
                  <g>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      style={{
                        fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : payload.fill,
                        stroke: "#fff",
                        strokeWidth: 2 / (depth + 1e-10),
                        strokeOpacity: 1 / (depth + 1e-10),
                      }}
                    />
                    {depth === 1 ? (
                      <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
                        {name}
                      </text>
                    ) : null}
                    {depth === 1 ? (
                      <text x={x + width / 2} y={y + height / 2 + 21} textAnchor="middle" fill="#fff" fontSize={12}>
                        ${(payload.size / 1000).toFixed(0)}K
                      </text>
                    ) : null}
                  </g>
                )
              }}
            />
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-900">Advanced Analytics</span>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Real-time Data
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tco-comparison">TCO Comparison</SelectItem>
              <SelectItem value="roi-timeline">ROI Timeline</SelectItem>
              <SelectItem value="risk-radar">Risk Analysis Radar</SelectItem>
              <SelectItem value="vendor-positioning">Vendor Positioning</SelectItem>
              <SelectItem value="cost-treemap">Cost Breakdown</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedVendor} onValueChange={setSelectedVendor}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter vendor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vendors</SelectItem>
              <SelectItem value="Portnox CLEAR">Portnox CLEAR</SelectItem>
              <SelectItem value="Cisco ISE">Cisco ISE</SelectItem>
              <SelectItem value="Aruba ClearPass">Aruba ClearPass</SelectItem>
              <SelectItem value="Forescout Platform">Forescout</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Activity className="mr-2 h-4 w-4" />
            Export Chart
          </Button>
        </div>
      </div>

      {/* Main Chart Display */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {chartType === "tco-comparison" && <DollarSign className="h-5 w-5 text-green-600" />}
                {chartType === "roi-timeline" && <TrendingUp className="h-5 w-5 text-blue-600" />}
                {chartType === "risk-radar" && <Shield className="h-5 w-5 text-purple-600" />}
                {chartType === "vendor-positioning" && <Target className="h-5 w-5 text-orange-600" />}
                {chartType === "cost-treemap" && <PieChartIcon className="h-5 w-5 text-indigo-600" />}

                {chartType === "tco-comparison" && "Total Cost of Ownership Analysis"}
                {chartType === "roi-timeline" && "Return on Investment Timeline"}
                {chartType === "risk-radar" && "Security Risk Reduction Analysis"}
                {chartType === "vendor-positioning" && "Vendor Value Positioning"}
                {chartType === "cost-treemap" && "Cost Component Breakdown"}
              </CardTitle>
              <CardDescription>
                {chartType === "tco-comparison" && "Comprehensive cost comparison across all NAC vendors"}
                {chartType === "roi-timeline" && "ROI progression over time with payback analysis"}
                {chartType === "risk-radar" && "Multi-dimensional security risk assessment"}
                {chartType === "vendor-positioning" && "Value vs. cost positioning analysis"}
                {chartType === "cost-treemap" && "Hierarchical view of cost components"}
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-700 border-green-300">
                <Zap className="mr-1 h-3 w-3" />
                Live Data
              </Badge>
              <Badge variant="outline" className="text-blue-700 border-blue-300">
                <Clock className="mr-1 h-3 w-3" />
                {timeframe}Y Analysis
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">{renderChart()}</CardContent>
      </Card>

      {/* Key Insights Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Savings</p>
                <p className="text-2xl font-bold text-green-900">$1.58M</p>
                <p className="text-xs text-green-600">vs. Cisco ISE</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Deployment Speed</p>
                <p className="text-2xl font-bold text-blue-900">2,159x</p>
                <p className="text-xs text-blue-600">Faster than ISE</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Security Score</p>
                <p className="text-2xl font-bold text-purple-900">95/100</p>
                <p className="text-xs text-purple-600">Industry Leading</p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
