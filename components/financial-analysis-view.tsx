"use client"
import { motion } from "framer-motion"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "@/components/ui/chart"
import { staggerChildren, fadeInUp, SectionTitle, VIBRANT_COLORS } from "./shared-ui"

export default function FinancialAnalysisView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  const portnoxResult = results.find((r) => r.vendor === "portnox")
  if (!portnoxResult) return null

  const tcoBreakdownData = results.map((r, i) => ({
    name: r.vendorDetails.shortName,
    Capex: r.financialSummary.totalCapex,
    Opex: r.financialSummary.totalOpex,
    Hidden: r.financialSummary.totalHiddenCosts,
    fill: VIBRANT_COLORS[i % VIBRANT_COLORS.length],
  }))

  const portnoxPieData = [
    { name: "Licensing", value: portnoxResult.financialSummary.totalCapex, fill: VIBRANT_COLORS[0] },
    { name: "Operational", value: portnoxResult.financialSummary.totalOpex, fill: VIBRANT_COLORS[1] },
    { name: "Hidden Costs", value: portnoxResult.financialSummary.totalHiddenCosts, fill: VIBRANT_COLORS[2] },
  ]

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      <SectionTitle
        title="Deep-Dive Financial Analysis"
        subtitle={`A ${config.years}-year projection of all associated costs and returns.`}
      />

      <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6" variants={staggerChildren}>
        <motion.div className="lg:col-span-2" variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>TCO Breakdown: Capex vs. Opex vs. Hidden Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px] w-full">
                <BarChart data={tcoBreakdownData} layout="vertical" stackOffset="expand">
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="Capex" stackId="a" fill={VIBRANT_COLORS[0]} radius={5} />
                  <Bar dataKey="Opex" stackId="a" fill={VIBRANT_COLORS[1]} radius={5} />
                  <Bar dataKey="Hidden" stackId="a" fill={VIBRANT_COLORS[2]} radius={5} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Portnox Cost Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px] w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={portnoxPieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {portnoxPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Detailed Cost Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="text-right">Total TCO</TableHead>
                  <TableHead className="text-right">vs. Portnox</TableHead>
                  <TableHead className="text-right">ROI</TableHead>
                  <TableHead className="text-right">Payback (Months)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((r) => (
                  <TableRow key={r.vendor}>
                    <TableCell className="font-medium">{r.vendorDetails.name}</TableCell>
                    <TableCell className="text-right">${r.financialSummary.totalTco.toLocaleString()}</TableCell>
                    <TableCell
                      className={`text-right font-semibold ${r.financialSummary.savingsVsPortnox > 0 ? "text-red-500" : "text-green-500"}`}
                    >
                      {r.vendor === "portnox"
                        ? "-"
                        : `${r.financialSummary.savingsVsPortnox > 0 ? "+" : ""}$${Math.abs(r.financialSummary.savingsVsPortnox).toLocaleString()}`}
                    </TableCell>
                    <TableCell className="text-right">{r.roi.roiPercentage.toFixed(0)}%</TableCell>
                    <TableCell className="text-right">{r.roi.paybackMonths}</TableCell>
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
