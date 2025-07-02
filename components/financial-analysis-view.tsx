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
  const costBreakdownData = useMemo(() => {
    return results.map((result) => {
      const breakdown = result.breakdown.reduce(
        (acc, item) => {
          acc[item.name] = item.value
          return acc
        },
        {} as Record<string, number>,
      )

      return {
        name: result.vendorName,
        ...breakdown,
        total: result.total,
      }
    })
  }, [results])

  const yearlyProjection = useMemo(() => {
    const years = Array.from({ length: config.years }, (_, i) => i + 1)
    return years.map((year) => {
      const yearData: any = { year: `Year ${year}` }
      results.forEach((result) => {
        const annualCost = result.total / config.years
        const cumulativeCost = annualCost * year
        yearData[result.vendorName] = cumulativeCost
      })
      return yearData
    })
  }, [results, config.years])

  const savingsComparison = useMemo(() => {
    const baseline = Math.max(...results.map((r) => r.total))
    return results.map((result) => ({
      vendor: result.vendorName,
      cost: result.total,
      savings: baseline - result.total,
      savingsPercent: (((baseline - result.total) / baseline) * 100).toFixed(1),
    }))
  }, [results])

  const costCategories = useMemo(() => {
    const categories = new Set<string>()
    results.forEach((result) => {
      result.breakdown.forEach((item) => categories.add(item.name))
    })
    return Array.from(categories)
  }, [results])

  return (
    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <SectionTitle
          icon={<Calculator className="h-6 w-6" />}
          title="Financial Analysis"
          description="Detailed cost breakdown and financial projections"
        />
      </motion.div>

      {/* Financial Metrics */}
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Lowest Total Cost"
            value={`$${Math.min(...results.map((r) => r.total)).toLocaleString()}`}
            detail={results.find((r) => r.total === Math.min(...results.map((r) => r.total)))?.vendorName}
            icon={<DollarSign className="h-4 w-4" />}
            gradient="forest"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Maximum Savings"
            value={`$${Math.max(...savingsComparison.map((s) => s.savings)).toLocaleString()}`}
            detail="vs. highest cost option"
            icon={<TrendingDown className="h-4 w-4" />}
            gradient="ocean"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Average Annual Cost"
            value={`$${Math.round(results.reduce((sum, r) => sum + r.total, 0) / results.length / config.years).toLocaleString()}`}
            detail="Across all vendors"
            icon={<BarChart3 className="h-4 w-4" />}
            gradient="royal"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Cost Range"
            value={`${(((Math.max(...results.map((r) => r.total)) - Math.min(...results.map((r) => r.total))) / Math.min(...results.map((r) => r.total))) * 100).toFixed(0)}%`}
            detail="Price variation"
            icon={<Wallet className="h-4 w-4" />}
            gradient="sunset"
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
                {results.map((result, index) => (
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
                {results.map((result, index) => {
                  const savings = savingsComparison.find((s) => s.vendor === result.vendorName)
                  return (
                    <TableRow key={result.vendor}>
                      <TableCell className="font-medium">{result.vendorName}</TableCell>
                      <TableCell className="text-right font-mono">${result.total.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono">
                        ${Math.round(result.total / config.years).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        ${Math.round(result.total / config.devices).toLocaleString()}
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
              headers={results.map((r) => r.vendorName)}
              data={costCategories.map((category) => ({
                label: category,
                values: results.reduce(
                  (acc, result) => {
                    const categoryItem = result.breakdown.find((item) => item.name === category)
                    acc[result.vendorName] = categoryItem ? `$${categoryItem.value.toLocaleString()}` : "$0"
                    return acc
                  },
                  {} as Record<string, string>,
                ),
              }))}
            />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
