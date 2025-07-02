"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid, // CartesianGrid variable is declared here
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { staggerChildren, fadeInUp } from "./shared-ui"

const VIBRANT_COLORS = ["#00D4AA", "#FF6B35", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"]

export default function FinancialAnalysisView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  const chartData = useMemo(
    () =>
      results.map((r) => {
        const dataPoint: { [key: string]: string | number } = { name: r.vendorName }
        r.breakdown.forEach((b) => {
          dataPoint[b.name] = b.value
        })
        return dataPoint
      }),
    [results],
  )

  const breakdownCategories = useMemo(
    () => Array.from(new Set(results.flatMap((r) => r.breakdown.map((b) => b.name)))),
    [results],
  )

  const portnoxBreakdown = useMemo(() => {
    const portnoxRes = results.find((r) => r.vendor === "portnox")
    return portnoxRes ? portnoxRes.breakdown : []
  }, [results])

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>TCO Breakdown Comparison</CardTitle>
            <CardDescription>{config.years}-Year Cost Analysis by Category</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" /> {/* CartesianGrid is now declared */}
                <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]} />
                <Legend />
                {breakdownCategories.map((cat, index) => (
                  <Bar key={cat} dataKey={cat} stackId="a" fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Portnox Cost Distribution</CardTitle>
            <CardDescription>Breakdown of Portnox's {config.years}-Year TCO</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portnoxBreakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={(entry) =>
                    `${entry.name} (${((entry.value / results.find((r) => r.vendor === "portnox")!.total) * 100).toFixed(0)}%)`
                  }
                >
                  {portnoxBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Detailed Cost Table</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  {breakdownCategories.map((cat) => (
                    <TableHead key={cat} className="text-right">
                      {cat}
                    </TableHead>
                  ))}
                  <TableHead className="text-right font-bold">Total TCO</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((r) => (
                  <TableRow key={r.vendor}>
                    <TableCell className="font-medium">{r.vendorName}</TableCell>
                    {breakdownCategories.map((cat) => (
                      <TableCell key={cat} className="text-right">
                        ${(r.breakdown.find((b) => b.name === cat)?.value || 0).toLocaleString()}
                      </TableCell>
                    ))}
                    <TableCell className="text-right font-bold">${r.total.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
