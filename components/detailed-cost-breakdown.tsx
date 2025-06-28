"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
  Line,
  Area,
  ComposedChart,
  Treemap,
} from "recharts"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Eye,
  EyeOff,
  Calculator,
  Clock,
  Building,
  BarChart3,
  PieChartIcon,
} from "lucide-react"

const PORTNOX_COLORS = {
  primary: "#00D4AA",
  primaryDark: "#00A88A",
  accent: "#FF6B35",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
  purple: "#8B5CF6",
  pink: "#EC4899",
}

const COST_COLORS = [
  PORTNOX_COLORS.primary,
  PORTNOX_COLORS.accent,
  PORTNOX_COLORS.info,
  PORTNOX_COLORS.success,
  PORTNOX_COLORS.warning,
  PORTNOX_COLORS.purple,
  PORTNOX_COLORS.pink,
  "#06B6D4",
  "#EF4444",
  "#6366F1",
]

interface DetailedCostBreakdownProps {
  results: any[]
  years: number
  darkMode: boolean
  configuration: any
}

export default function DetailedCostBreakdown({ results, years, darkMode, configuration }: DetailedCostBreakdownProps) {
  const [selectedVendor, setSelectedVendor] = useState(results?.[0]?.vendor || "portnox")
  const [viewMode, setViewMode] = useState<"absolute" | "percentage" | "per-device">("absolute")
  const [showHiddenCosts, setShowHiddenCosts] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const selectedResult = useMemo(() => results?.find((r) => r.vendor === selectedVendor), [results, selectedVendor])

  const costComparisonData = useMemo(() => {
    if (!results) return []

    return results.map((result) => ({
      vendor: result.vendorName,
      vendorId: result.vendor,
      software: result.breakdown.find((b) => b.name === "Software")?.value || 0,
      hardware: result.breakdown.find((b) => b.name === "Hardware")?.value || 0,
      implementation: result.breakdown.find((b) => b.name === "Implementation")?.value || 0,
      support: result.breakdown.find((b) => b.name === "Support")?.value || 0,
      operations: result.breakdown.find((b) => b.name === "Operations")?.value || 0,
      hidden: showHiddenCosts ? result.breakdown.find((b) => b.name === "Hidden")?.value || 0 : 0,
      total: result.total,
      perDeviceMonthly: result.total / (configuration.devices * years * 12),
    }))
  }, [results, showHiddenCosts, configuration.devices, years])

  const yearlyProjectionData = useMemo(() => {
    if (!selectedResult) return []

    const data = []
    const annualCost = selectedResult.total / years

    for (let year = 1; year <= Math.min(years, 5); year++) {
      data.push({
        year,
        cumulative: annualCost * year,
        annual: annualCost,
        savings: selectedResult.roi.annualSavings * year,
        netValue: selectedResult.roi.annualSavings * year - annualCost * year,
      })
    }

    return data
  }, [selectedResult, years])

  const costTreemapData = useMemo(() => {
    if (!selectedResult) return []

    return selectedResult.breakdown.map((item, index) => ({
      name: item.name,
      value: item.value,
      percentage: item.percentage,
      fill: COST_COLORS[index % COST_COLORS.length],
    }))
  }, [selectedResult])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return `$${value.toLocaleString()}`
  }

  const CostMetricCard = ({ title, value, change, icon, color = "primary" }: any) => (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      className={cn(
        "p-4 rounded-lg border transition-all duration-200",
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={cn("text-sm font-medium", darkMode ? "text-gray-300" : "text-gray-600")}>{title}</p>
          <p className={cn("text-2xl font-bold mt-1", darkMode ? "text-white" : "text-gray-900")}>
            {typeof value === "number" ? formatCurrency(value) : value}
          </p>
          {change && (
            <div className={cn("flex items-center text-sm mt-1", change > 0 ? "text-red-500" : "text-green-500")}>
              {change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {Math.abs(change)}% vs baseline
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-full", color === "primary" ? "bg-portnox-primary/10" : `bg-${color}-100`)}>
          {React.cloneElement(icon, {
            className: cn("h-6 w-6", color === "primary" ? "text-portnox-primary" : `text-${color}-600`),
          })}
        </div>
      </div>
    </motion.div>
  )

  if (!results || results.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Calculator className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Cost Data Available</h3>
        <p className="text-gray-600">Select vendors and configure your environment to see detailed cost breakdowns.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Detailed Cost Analysis</h2>
          <p className={cn("text-sm", darkMode ? "text-gray-400" : "text-gray-600")}>
            Comprehensive {years}-year TCO breakdown with vendor-specific cost components
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowHiddenCosts(!showHiddenCosts)} className="gap-2">
            {showHiddenCosts ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            {showHiddenCosts ? "Hide" : "Show"} Hidden Costs
          </Button>

          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as any)}
            className={cn(
              "px-3 py-2 border rounded-md text-sm",
              darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300",
            )}
          >
            <option value="absolute">Absolute Values</option>
            <option value="percentage">Percentage View</option>
            <option value="per-device">Per Device/Month</option>
          </select>

          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CostMetricCard title="Total TCO" value={selectedResult?.total} icon={<DollarSign />} color="primary" />
        <CostMetricCard
          title="Per Device/Month"
          value={selectedResult ? `$${(selectedResult.total / (configuration.devices * years * 12)).toFixed(2)}` : "$0"}
          icon={<Calculator />}
          color="info"
        />
        <CostMetricCard
          title="Implementation Time"
          value={selectedResult?.implementation?.timeToValue || "N/A"}
          icon={<Clock />}
          color="warning"
        />
        <CostMetricCard
          title="ROI Payback"
          value={selectedResult ? `${selectedResult.roi.paybackMonths} months` : "N/A"}
          icon={<TrendingUp />}
          color="success"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Vendor Comparison</TabsTrigger>
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
          <TabsTrigger value="analysis">Deep Analysis</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vendor Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Vendor Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {results.map((result) => (
                    <motion.button
                      key={result.vendor}
                      onClick={() => setSelectedVendor(result.vendor)}
                      className={cn(
                        "p-4 border rounded-lg text-left transition-all duration-200",
                        selectedVendor === result.vendor
                          ? "border-portnox-primary bg-portnox-primary/5"
                          : darkMode
                            ? "border-gray-700 hover:border-gray-600"
                            : "border-gray-200 hover:border-gray-300",
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{result.vendorName}</h4>
                          <p className="text-sm text-gray-600">{formatCurrency(result.total)} total</p>
                        </div>
                        <Badge variant={result.vendor === "portnox" ? "default" : "outline"}>
                          {result.vendor === "portnox" ? "Recommended" : "Alternative"}
                        </Badge>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cost Distribution Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Cost Distribution - {selectedResult?.vendorName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costTreemapData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {costTreemapData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ReTooltip formatter={(value: number) => formatCurrency(value)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Components Detail */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Components Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedResult?.breakdown.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn("p-4 border rounded-lg", darkMode ? "border-gray-700" : "border-gray-200")}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: COST_COLORS[index % COST_COLORS.length] }}
                        />
                        <h4 className="font-semibold">{item.name}</h4>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(item.value)}</p>
                        <p className="text-sm text-gray-600">{item.percentage}% of total</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">{item.description}</p>

                    {/* Progress bar */}
                    <div className="mt-3 ml-7">
                      <div
                        className={cn("w-full bg-gray-200 rounded-full h-2", darkMode ? "bg-gray-700" : "bg-gray-200")}
                      >
                        <motion.div
                          className="h-2 rounded-full"
                          style={{ backgroundColor: COST_COLORS[index % COST_COLORS.length] }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vendor Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Vendor Cost Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={costComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                    <XAxis
                      dataKey="vendor"
                      tick={{ fill: darkMode ? "#9CA3AF" : "#6B7280", fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      tick={{ fill: darkMode ? "#9CA3AF" : "#6B7280", fontSize: 12 }}
                      tickFormatter={formatCurrency}
                    />
                    <ReTooltip
                      formatter={(value: number, name: string) => [formatCurrency(value), name]}
                      contentStyle={{
                        backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                        border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="software" stackId="a" fill={COST_COLORS[0]} name="Software" />
                    <Bar dataKey="hardware" stackId="a" fill={COST_COLORS[1]} name="Hardware" />
                    <Bar dataKey="implementation" stackId="a" fill={COST_COLORS[2]} name="Implementation" />
                    <Bar dataKey="support" stackId="a" fill={COST_COLORS[3]} name="Support" />
                    <Bar dataKey="operations" stackId="a" fill={COST_COLORS[4]} name="Operations" />
                    {showHiddenCosts && <Bar dataKey="hidden" stackId="a" fill={COST_COLORS[5]} name="Hidden Costs" />}
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke={PORTNOX_COLORS.accent}
                      strokeWidth={3}
                      name="Total Cost"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Savings Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Savings vs Portnox</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results
                    .filter((r) => r.vendor !== "portnox")
                    .map((result) => {
                      const portnoxResult = results.find((r) => r.vendor === "portnox")
                      const savings = portnoxResult ? result.total - portnoxResult.total : 0
                      const savingsPercent = portnoxResult ? (savings / result.total) * 100 : 0

                      return (
                        <div key={result.vendor} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">{result.vendorName}</h4>
                            <p className="text-sm text-gray-600">vs Portnox</p>
                          </div>
                          <div className="text-right">
                            <p className={cn("font-bold", savings > 0 ? "text-green-600" : "text-red-600")}>
                              {savings > 0 ? "+" : ""}
                              {formatCurrency(Math.abs(savings))}
                            </p>
                            <p className="text-sm text-gray-600">
                              {savingsPercent > 0 ? "+" : ""}
                              {savingsPercent.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Per Device Monthly Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costComparisonData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={(value) => `$${value.toFixed(2)}`} tick={{ fontSize: 12 }} />
                      <YAxis type="category" dataKey="vendor" width={100} tick={{ fontSize: 12 }} />
                      <ReTooltip formatter={(value: number) => [`$${value.toFixed(2)}`, "Per Device/Month"]} />
                      <Bar dataKey="perDeviceMonthly" fill={PORTNOX_COLORS.primary} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cost Breakdown Tab */}
        <TabsContent value="breakdown" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Cost Treemap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap data={costTreemapData} dataKey="value" ratio={4 / 3} stroke="#fff" fill="#8884d8">
                    <ReTooltip formatter={(value: number, name: string) => [formatCurrency(value), name]} />
                  </Treemap>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Cost Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {["Software", "Hardware", "Operations"].map((category) => {
              const categoryData = selectedResult?.breakdown.find((b) => b.name === category)
              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category} Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold">{formatCurrency(categoryData?.value || 0)}</p>
                      <p className="text-sm text-gray-600">{categoryData?.percentage}% of total</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      {category === "Software" && (
                        <>
                          <div className="flex justify-between">
                            <span>Base Licensing</span>
                            <span>{formatCurrency((categoryData?.value || 0) * 0.7)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Volume Discounts</span>
                            <span className="text-green-600">-{formatCurrency((categoryData?.value || 0) * 0.1)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Multi-year Savings</span>
                            <span className="text-green-600">-{formatCurrency((categoryData?.value || 0) * 0.05)}</span>
                          </div>
                        </>
                      )}
                      {category === "Hardware" && (
                        <>
                          <div className="flex justify-between">
                            <span>Appliances</span>
                            <span>{formatCurrency((categoryData?.value || 0) * 0.6)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Installation</span>
                            <span>{formatCurrency((categoryData?.value || 0) * 0.2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Refresh Costs</span>
                            <span>{formatCurrency((categoryData?.value || 0) * 0.2)}</span>
                          </div>
                        </>
                      )}
                      {category === "Operations" && (
                        <>
                          <div className="flex justify-between">
                            <span>Admin Time</span>
                            <span>{formatCurrency((categoryData?.value || 0) * 0.5)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Training</span>
                            <span>{formatCurrency((categoryData?.value || 0) * 0.3)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monitoring</span>
                            <span>{formatCurrency((categoryData?.value || 0) * 0.2)}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Projections Tab */}
        <TabsContent value="projections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>5-Year Cost and Value Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={yearlyProjectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={formatCurrency} />
                    <ReTooltip formatter={(value: number) => formatCurrency(value)} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="cumulative"
                      fill={PORTNOX_COLORS.primary}
                      fillOpacity={0.3}
                      stroke={PORTNOX_COLORS.primary}
                      name="Cumulative Cost"
                    />
                    <Line
                      type="monotone"
                      dataKey="savings"
                      stroke={PORTNOX_COLORS.success}
                      strokeWidth={3}
                      name="Cumulative Savings"
                    />
                    <Line
                      type="monotone"
                      dataKey="netValue"
                      stroke={PORTNOX_COLORS.accent}
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Net Value"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* ROI Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payback Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-portnox-primary">{selectedResult?.roi.paybackMonths || 0}</p>
                  <p className="text-sm text-gray-600">Months to Payback</p>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Break-even Point</span>
                    <span>Month {selectedResult?.roi.paybackMonths || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>5-Year ROI</span>
                    <span className="text-green-600">{selectedResult?.roi.percentage || 0}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Annual Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600">
                    {formatCurrency(selectedResult?.roi.annualSavings || 0)}
                  </p>
                  <p className="text-sm text-gray-600">Per Year</p>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Labor Savings</span>
                    <span>{formatCurrency((selectedResult?.roi.annualSavings || 0) * 0.4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Reduction</span>
                    <span>{formatCurrency((selectedResult?.roi.annualSavings || 0) * 0.6)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Efficiency Gains</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600">{selectedResult?.roi.laborSavingsFTE || 0}</p>
                  <p className="text-sm text-gray-600">FTE Saved</p>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Admin Time Reduction</span>
                    <span>75%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Incident Response</span>
                    <span>60% Faster</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Deep Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Sensitivity Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Device Count Impact</h4>
                    <p className="text-sm text-gray-600 mb-3">How costs change with different device counts</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>50% fewer devices</span>
                        <span className="text-green-600">-42% total cost</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current devices</span>
                        <span>{formatCurrency(selectedResult?.total || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>50% more devices</span>
                        <span className="text-red-600">+38% total cost</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Time Horizon Impact</h4>
                    <p className="text-sm text-gray-600 mb-3">Cost efficiency over different time periods</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>1 Year</span>
                        <span>{formatCurrency((selectedResult?.total || 0) / years)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>3 Years</span>
                        <span>{formatCurrency(selectedResult?.total || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>5 Years</span>
                        <span>{formatCurrency((selectedResult?.total || 0) * 1.67)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk-Adjusted TCO</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Security Risk Costs</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Breach Probability</span>
                        <span>15% annually</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Breach Cost</span>
                        <span>{formatCurrency(4500000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk-Adjusted Cost</span>
                        <span className="text-red-600">{formatCurrency(675000)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Compliance Risk</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Audit Failure Risk</span>
                        <span>8% annually</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Penalty Exposure</span>
                        <span>{formatCurrency(500000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk-Adjusted Cost</span>
                        <span className="text-red-600">{formatCurrency(40000)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                    <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">Total Risk-Adjusted TCO</h4>
                    <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                      {formatCurrency((selectedResult?.total || 0) + 715000)}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      Including security and compliance risks
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Financial Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">12.5%</p>
                  <p className="text-sm text-gray-600">Internal Rate of Return</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">2.3</p>
                  <p className="text-sm text-gray-600">Benefit-Cost Ratio</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{formatCurrency(850000)}</p>
                  <p className="text-sm text-gray-600">Net Present Value</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">18 mo</p>
                  <p className="text-sm text-gray-600">Discounted Payback</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
