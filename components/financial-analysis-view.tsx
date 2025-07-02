"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { SectionTitle, MetricCard, staggerChildren, fadeInUp, VIBRANT_COLORS, ComparisonTable } from "./shared-ui"
import { DollarSign, TrendingDown, Calculator, PieChart, BarChart3, Wallet } from "lucide-react"

interface FinancialAnalysisViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function FinancialAnalysisView({ results, config }: FinancialAnalysisViewProps) {
  // Safe data processing with fallbacks
  const safeResults = useMemo(() => {
    if (!results || !Array.isArray(results)) return []
    return results.filter((result) => result && typeof result === "object")
  }, [results])

  const costBreakdownData = useMemo(() => {
    return safeResults.map((result) => {
      const costCategories = result.costCategories || {}
      return {
        name: result.vendorName || result.vendor || "Unknown",
        licensing: costCategories.licensing || 0,
        hardware: costCategories.hardware || 0,
        professionalServices: costCategories.professionalServices || 0,
        training: costCategories.training || 0,
        maintenance: costCategories.maintenance || 0,
        integration: costCategories.integration || 0,
        operational: costCategories.operational || 0,
        total: result.totalCost || 0,
      }
    })
  }, [safeResults])

  const yearlyProjection = useMemo(() => {
    const years = config?.years || 3
    return Array.from({ length: years }, (_, i) => {
      const year = i + 1
      const yearData: any = { year: `Year ${year}` }

      safeResults.forEach((result) => {
        const annualCost = (result.totalCost || 0) / years
        const cumulativeCost = annualCost * year
        yearData[result.vendorName || result.vendor || "Unknown"] = cumulativeCost
      })
      return yearData
    })
  }, [safeResults, config])

  const savingsComparison = useMemo(() => {
    if (safeResults.length === 0) return []

    const costs = safeResults.map((r) => r.totalCost || 0)
    const baseline = Math.max(...costs)

    return safeResults.map((result) => ({
      vendor: result.vendorName || result.vendor || "Unknown",
      cost: result.totalCost || 0,
      savings: baseline - (result.totalCost || 0),
      savingsPercent: baseline > 0 ? (((baseline - (result.totalCost || 0)) / baseline) * 100).toFixed(1) : "0",
    }))
  }, [safeResults])

  const costCategories = useMemo(() => {
    const categories = new Set<string>()
    safeResults.forEach((result) => {
      if (result.costCategories) {
        Object.keys(result.costCategories).forEach((key) => categories.add(key))
      }
    })
    return Array.from(categories)
  }, [safeResults])

  // Safe calculations with fallbacks
  const totalCosts = safeResults.map((r) => r.totalCost || 0)
  const lowestCost = totalCosts.length > 0 ? Math.min(...totalCosts) : 0
  const highestCost = totalCosts.length > 0 ? Math.max(...totalCosts) : 0
  const averageCost = totalCosts.length > 0 ? totalCosts.reduce((sum, cost) => sum + cost, 0) / totalCosts.length : 0
  const maxSavings = savingsComparison.length > 0 ? Math.max(...savingsComparison.map((s) => s.savings)) : 0
  const costRange = lowestCost > 0 ? ((highestCost - lowestCost) / lowestCost) * 100 : 0

  return (
    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <SectionTitle
          icon={<Calculator className="h-6 w-6" />}
          title="Financial Analysis"
          subtitle="Detailed cost breakdown and financial projections"
        />
      </motion.div>

      {/* Financial Metrics */}
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Lowest Total Cost"
            value={`$${lowestCost.toLocaleString()}`}
            detail={safeResults.find((r) => (r.totalCost || 0) === lowestCost)?.vendorName || "N/A"}
            icon={<DollarSign className="h-4 w-4" />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Maximum Savings"
            value={`$${maxSavings.toLocaleString()}`}
            detail="vs. highest cost option"
            icon={<TrendingDown className="h-4 w-4" />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Average Annual Cost"
            value={`$${Math.round(averageCost / (config?.years || 3)).toLocaleString()}`}
            detail="Across all vendors"
            icon={<BarChart3 className="h-4 w-4" />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Cost Range"
            value={`${costRange.toFixed(0)}%`}
            detail="Price variation"
            icon={<Wallet className="h-4 w-4" />}
          />
        </motion.div>
      </motion.div>

      {/* Cost Breakdown Chart */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Cost Breakdown by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={costBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                  labelFormatter={(label) => `Vendor: ${label}`}
                />
                {costCategories.map((category, index) => (
                  <Bar
                    key={category}
                    dataKey={category}
                    stackId="cost"
                    fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Yearly Projection */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Cumulative Cost Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={yearlyProjection}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                {safeResults.map((result, index) => (
                  <Area
                    key={result.vendor}
                    type="monotone"
                    dataKey={result.vendorName || result.vendor}
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

      {/* Detailed Cost Table */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Detailed Cost Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="text-right">Total Cost</TableHead>
                  <TableHead className="text-right">Annual Cost</TableHead>
                  <TableHead className="text-right">Cost per Device</TableHead>
                  <TableHead className="text-right">Savings vs. Highest</TableHead>
                  <TableHead>Rank</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {safeResults.map((result, index) => {
                  const savings = savingsComparison.find((s) => s.vendor === (result.vendorName || result.vendor))
                  const devices = config?.devices || 1000
                  const years = config?.years || 3

                  return (
                    <TableRow key={result.vendor || index}>
                      <TableCell className="font-medium">{result.vendorName || result.vendor || "Unknown"}</TableCell>
                      <TableCell className="text-right font-mono">
                        ${(result.totalCost || 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        ${Math.round((result.totalCost || 0) / years).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        ${Math.round((result.totalCost || 0) / devices).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {savings && savings.savings > 0 ? (
                          <div className="text-green-600">
                            ${savings.savings.toLocaleString()} ({savings.savingsPercent}%)
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={index === 0 ? "default" : "secondary"}>#{index + 1}</Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Cost Breakdown Table */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Cost Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ComparisonTable
              data={costCategories.map((category) => ({
                label: category,
                ...safeResults.reduce(
                  (acc, result) => {
                    const vendorName = result.vendorName || result.vendor || "Unknown"
                    const categoryValue = result.costCategories?.[category] || 0
                    acc[vendorName] = `$${categoryValue.toLocaleString()}`
                    return acc
                  },
                  {} as Record<string, string>,
                ),
              }))}
              columns={[
                { key: "label", label: "Category" },
                ...safeResults.map((result) => ({
                  key: result.vendorName || result.vendor || "Unknown",
                  label: result.vendorName || result.vendor || "Unknown",
                })),
              ]}
            />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
