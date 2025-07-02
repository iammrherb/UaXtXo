"use client"
import { motion } from "framer-motion"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SectionTitle, fadeInUp, staggerChildren, VIBRANT_COLORS, MetricCard } from "./shared-ui"
import { TrendingUp, Users, Clock, Shield } from "lucide-react"

interface BusinessImpactViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

const formatCurrency = (value: number) => `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`

export default function BusinessImpactView({ results, config }: BusinessImpactViewProps) {
  const chartData = results.map((r) => ({
    name: r.vendorName,
    "Payback (Months)": r.roi.paybackMonths,
    "FTE Saved": r.operational.fteSaved,
    fill: VIBRANT_COLORS[results.indexOf(r) % VIBRANT_COLORS.length],
  }))

  return (
    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
      <motion.div variants={fadeInUp}>
        <SectionTitle
          icon={<TrendingUp />}
          title="ROI & Business Value"
          description="Quantifying the financial and operational benefits beyond direct cost savings."
        />
      </motion.div>

      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        {results.map((r) => (
          <motion.div variants={fadeInUp} key={r.vendor}>
            <MetricCard
              title={`${r.vendorName} ROI`}
              value={`${(r.roi.totalRoi * 100).toFixed(0)}%`}
              detail={`${config.years}-Year Return on Investment`}
              icon={<TrendingUp />}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Payback Period Comparison</h3>
              <p className="text-sm text-muted-foreground">Time to recoup initial investment.</p>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis label={{ value: "Months", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(value: number) => [`${value.toFixed(1)} months`, "Payback"]} />
                  <Bar dataKey="Payback (Months)" fill={VIBRANT_COLORS[1]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Operational Efficiency Gains</h3>
              <p className="text-sm text-muted-foreground">Full-Time Equivalents (FTE) saved annually.</p>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis label={{ value: "FTEs", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(value: number) => [`${value.toFixed(1)} FTEs`, "Saved"]} />
                  <Bar dataKey="FTE Saved" fill={VIBRANT_COLORS[3]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Business Value Metrics</h3>
            <p className="text-sm text-muted-foreground">
              A detailed look at the key performance indicators for business impact.
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <TrendingUp className="h-4 w-4" /> ROI ({config.years}yr)
                    </div>
                  </TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Clock className="h-4 w-4" /> Payback (Months)
                    </div>
                  </TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Users className="h-4 w-4" /> FTE Saved
                    </div>
                  </TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Shield className="h-4 w-4" /> Risk Reduction
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((r) => (
                  <TableRow key={r.vendor}>
                    <TableCell className="font-medium">{r.vendorName}</TableCell>
                    <TableCell className="text-right font-bold text-green-500">
                      {(r.roi.totalRoi * 100).toFixed(0)}%
                    </TableCell>
                    <TableCell className="text-right">{r.roi.paybackMonths.toFixed(1)}</TableCell>
                    <TableCell className="text-right">{r.operational.fteSaved.toFixed(1)}</TableCell>
                    <TableCell className="text-right">{(r.risk.reduction * 100).toFixed(0)}%</TableCell>
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
