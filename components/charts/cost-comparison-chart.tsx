"use client"

import { useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { CalculationResult } from "@/lib/enhanced-tco-calculator"

interface CostComparisonChartProps {
  results: CalculationResult[]
}

export default function CostComparisonChart({ results }: CostComparisonChartProps) {
  const chartData = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      totalCost: result.totalCost,
      software: result.costs.software,
      hardware: result.costs.hardware,
      services: result.costs.services,
      operational: result.costs.operational,
      isPortnox: result.vendorId === "portnox",
    }))
  }, [results])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
        <Tooltip formatter={(value: number) => formatCurrency(value)} labelFormatter={(label) => `Vendor: ${label}`} />
        <Legend />
        <Bar dataKey="totalCost" fill={(entry: any) => (entry.isPortnox ? "#10b981" : "#3b82f6")} name="Total Cost" />
      </BarChart>
    </ResponsiveContainer>
  )
}
