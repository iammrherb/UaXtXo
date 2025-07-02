"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { staggerChildren, fadeInUp, GradientCard } from "./shared-ui"
import Image from "next/image"
import { getVendorLogoPath } from "@/lib/comprehensive-vendor-data"

const VIBRANT_COLORS = ["#00D4AA", "#FF6B35", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"]

export default function BusinessImpactView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  const roiData = useMemo(
    () =>
      results.map((r) => ({
        name: r.vendorName,
        "ROI (%)": r.roi.percentage,
        "Payback (Months)": r.roi.paybackMonths,
      })),
    [results],
  )

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" variants={staggerChildren}>
        {results.map((r, i) => (
          <motion.div variants={fadeInUp} key={r.vendor}>
            <GradientCard className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Image
                    src={getVendorLogoPath(r.vendor) || "/placeholder.svg"}
                    alt={`${r.vendorName} logo`}
                    width={100}
                    height={25}
                    className="h-6 w-auto"
                  />
                  <CardTitle>{r.vendorName}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">ROI %</p>
                  <p className="font-bold text-lg">{r.roi.percentage.toFixed(0)}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Payback</p>
                  <p className="font-bold text-lg">{r.roi.paybackMonths} mo</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Annual Savings</p>
                  <p className="font-bold text-lg">${(r.roi.annualSavings / 1000).toFixed(0)}K</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">FTE Saved</p>
                  <p className="font-bold text-lg">{r.ops.fteSaved}</p>
                </div>
              </CardContent>
            </GradientCard>
          </motion.div>
        ))}
      </motion.div>
      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>ROI Comparison</CardTitle>
            <CardDescription>Return on Investment over {config.years} years</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke={VIBRANT_COLORS[0]} />
                <YAxis yAxisId="right" orientation="right" stroke={VIBRANT_COLORS[1]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="ROI (%)" fill={VIBRANT_COLORS[0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payback Period Comparison</CardTitle>
            <CardDescription>Time to recoup initial investment</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Payback (Months)" fill={VIBRANT_COLORS[1]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Business Value Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="text-right">3-Year ROI</TableHead>
                  <TableHead className="text-right">Payback Period (Months)</TableHead>
                  <TableHead className="text-right">Annual Net Savings</TableHead>
                  <TableHead className="text-right">FTE Saved</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((r) => (
                  <TableRow key={r.vendor}>
                    <TableCell className="font-medium">{r.vendorName}</TableCell>
                    <TableCell className="text-right">{r.roi.percentage.toFixed(0)}%</TableCell>
                    <TableCell className="text-right">{r.roi.paybackMonths}</TableCell>
                    <TableCell className="text-right">${r.roi.annualSavings.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{r.ops.fteSaved}</TableCell>
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
