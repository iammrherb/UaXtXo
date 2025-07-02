"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { staggerChildren, fadeInUp, VIBRANT_COLORS, GradientCard, GRADIENTS } from "./shared-ui"
import { DollarSign, TrendingUp, TrendingDown, Calculator, PieChartIcon, BarChart3 } from "lucide-react"

interface FinancialAnalysisViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function FinancialAnalysisView({ results, config }: FinancialAnalysisViewProps) {
  // Safe results processing
  const safeResults = useMemo(() => {
    return (results || []).filter((result) => result && typeof result === "object" && result.totalCost)
  }, [results])

  const costComparisonData = useMemo(() => {
    return safeResults.map((result) => ({
      vendor: result.vendorName || "Unknown",
      totalCost: result.totalCost || 0,
      licensing: result.costCategories?.licensing || 0,
      hardware: result.costCategories?.hardware || 0,
      services: result.costCategories?.professionalServices || 0,
      maintenance: result.costCategories?.maintenance || 0,
      training: result.costCategories?.training || 0,
      operational: result.costCategories?.operational || 0,
    }))
  }, [safeResults])

  const yearlyProjectionData = useMemo(() => {
    if (!safeResults.length) return []

    return Array.from({ length: config.years || 5 }, (_, index) => {
      const year = index + 1
      const yearData: any = { year: `Year ${year}` }

      safeResults.forEach((result) => {
        const annualCost = (result.totalCost || 0) / (config.years || 5)
        const savings = year > 1 ? annualCost * 0.1 * (year - 1) : 0 // Increasing savings over time
        yearData[result.vendorName || "Unknown"] = Math.max(0, annualCost - savings)
      })

      return yearData
    })
  }, [safeResults, config.years])

  const costBreakdownData = useMemo(() => {
    if (!safeResults.length) return []

    const categories = ["licensing", "hardware", "professionalServices", "maintenance", "training", "operational"]
    return categories.map((category) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      ...safeResults.reduce(
        (acc, result) => {
          acc[result.vendorName || "Unknown"] =
            result.costCategories?.[category as keyof typeof result.costCategories] || 0
          return acc
        },
        {} as Record<string, number>,
      ),
    }))
  }, [safeResults])

  const roiComparisonData = useMemo(() => {
    return safeResults.map((result) => ({
      vendor: result.vendorName || "Unknown",
      roi: result.roi?.percentage || 0,
      payback: result.roi?.paybackPeriod || 0,
      npv: result.roi?.npv || 0,
    }))
  }, [safeResults])

  const totalInvestment = useMemo(() => {
    return safeResults.reduce((sum, result) => sum + (result.totalCost || 0), 0)
  }, [safeResults])

  const averageROI = useMemo(() => {
    if (!safeResults.length) return 0
    return safeResults.reduce((sum, result) => sum + (result.roi?.percentage || 0), 0) / safeResults.length
  }, [safeResults])

  const bestValue = useMemo(() => {
    if (!safeResults.length) return null
    return safeResults.reduce((best, current) => {
      const currentROI = current.roi?.percentage || 0
      const bestROI = best.roi?.percentage || 0
      return currentROI > bestROI ? current : best
    })
  }, [safeResults])

  if (!safeResults.length) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No financial data available. Please select vendors to analyze.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      {/* Financial Overview */}
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <GradientCard
            title="Total Investment"
            value={`$${(totalInvestment / 1000000).toFixed(1)}M`}
            subtitle="Across all vendors"
            gradient={GRADIENTS.primary}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <GradientCard
            title="Average ROI"
            value={`${averageROI.toFixed(1)}%`}
            subtitle="Expected return"
            gradient={GRADIENTS.success}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <GradientCard
            title="Best Value"
            value={bestValue?.vendorName || "N/A"}
            subtitle={`${(bestValue?.roi?.percentage || 0).toFixed(1)}% ROI`}
            gradient={GRADIENTS.warning}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <GradientCard
            title="Time Horizon"
            value={`${config.years || 5} Years`}
            subtitle="Analysis period"
            gradient={GRADIENTS.danger}
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Cost Comparison */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Total Cost Comparison</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Total Cost"]} />
                  <Bar dataKey="totalCost" fill={VIBRANT_COLORS[0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* ROI Comparison */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>ROI Comparison</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roiComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, "ROI"]} />
                  <Bar dataKey="roi" fill={VIBRANT_COLORS[1]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Cost Breakdown by Category */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5" />
              <span>Cost Breakdown by Category</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costBreakdownData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <YAxis dataKey="category" type="category" width={100} />
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Cost"]} />
                <Legend />
                {safeResults.map((result, index) => (
                  <Bar
                    key={result.vendor}
                    dataKey={result.vendorName}
                    fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Yearly Cost Projection */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5" />
              <span>Yearly Cost Projection</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyProjectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Annual Cost"]} />
                <Legend />
                {safeResults.map((result, index) => (
                  <Area
                    key={result.vendor}
                    type="monotone"
                    dataKey={result.vendorName}
                    stackId="1"
                    stroke={VIBRANT_COLORS[index % VIBRANT_COLORS.length]}
                    fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]}
                    fillOpacity={0.6}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Financial Table */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Detailed Financial Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="text-right">Total Cost</TableHead>
                  <TableHead className="text-right">ROI</TableHead>
                  <TableHead className="text-right">Payback Period</TableHead>
                  <TableHead className="text-right">NPV</TableHead>
                  <TableHead>Value Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {safeResults.map((result) => {
                  const roi = result.roi?.percentage || 0
                  const payback = result.roi?.paybackPeriod || 0
                  const npv = result.roi?.npv || 0

                  return (
                    <TableRow key={result.vendor}>
                      <TableCell className="font-medium">{result.vendorName}</TableCell>
                      <TableCell className="text-right">${(result.totalCost || 0).toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className={roi > 0 ? "text-green-600" : "text-red-600"}>{roi.toFixed(1)}%</span>
                      </TableCell>
                      <TableCell className="text-right">{payback.toFixed(1)} months</TableCell>
                      <TableCell className="text-right">
                        <span className={npv > 0 ? "text-green-600" : "text-red-600"}>${npv.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={roi > 20 ? "default" : roi > 10 ? "secondary" : "destructive"}>
                          {roi > 20 ? "Excellent" : roi > 10 ? "Good" : "Fair"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
