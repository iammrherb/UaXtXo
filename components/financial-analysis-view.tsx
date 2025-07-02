"use client"
import { motion } from "framer-motion"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SectionTitle, fadeInUp, staggerChildren, VIBRANT_COLORS } from "./shared-ui"
import { FilePieChart } from "lucide-react"

interface FinancialAnalysisViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

const formatCurrency = (value: number) => `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`

export default function FinancialAnalysisView({ results, config }: FinancialAnalysisViewProps) {
  const chartData = results.map((r) => ({
    name: r.vendorName,
    "Direct Costs": r.costs.direct,
    "Hidden Costs": r.costs.hidden,
    "Operational Costs": r.costs.operational,
  }))

  const costCategories = ["Direct Costs", "Hidden Costs", "Operational Costs"]

  const pieData = results.map((r) => ({
    name: r.vendorName,
    data: [
      { name: "Direct", value: r.costs.direct },
      { name: "Hidden", value: r.costs.hidden },
      { name: "Operational", value: r.costs.operational },
    ],
  }))

  return (
    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
      <motion.div variants={fadeInUp}>
        <SectionTitle
          icon={<FilePieChart />}
          title="Financial Analysis"
          description={`Detailed ${config.years}-year cost breakdown for all selected vendors.`}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <h3 className="font-semibold">TCO Breakdown Comparison</h3>
            <p className="text-sm text-muted-foreground">Comparing direct, hidden, and operational costs.</p>
          </CardHeader>
          <CardContent className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  type="number"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                {costCategories.map((cat, index) => (
                  <Bar key={cat} dataKey={cat} stackId="a" fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Detailed Cost Table</h3>
            <p className="text-sm text-muted-foreground">Line-item breakdown of the total cost of ownership.</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead className="text-right">Direct Costs</TableHead>
                    <TableHead className="text-right">Hidden Costs</TableHead>
                    <TableHead className="text-right">Operational Costs</TableHead>
                    <TableHead className="text-right font-bold">Total TCO</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((r) => (
                    <TableRow key={r.vendor}>
                      <TableCell className="font-medium">{r.vendorName}</TableCell>
                      <TableCell className="text-right">{formatCurrency(r.costs.direct)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(r.costs.hidden)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(r.costs.operational)}</TableCell>
                      <TableCell className="text-right font-bold">{formatCurrency(r.totalTco)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Cost Category Distribution</h3>
            <p className="text-sm text-muted-foreground">Percentage breakdown of cost types for each vendor.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[300px]">
              {pieData.map((vendorPie) => (
                <div key={vendorPie.name} className="flex flex-col items-center">
                  <h4 className="font-medium mb-2">{vendorPie.name}</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={vendorPie.data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {vendorPie.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
