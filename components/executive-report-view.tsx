"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionTitle, fadeInUp, staggerChildren } from "./shared-ui"
import { FileText, Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ExecutiveReportViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

const formatCurrency = (value: number | undefined | null) => {
  if (typeof value !== "number" || isNaN(value)) {
    return "$0"
  }
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
}

const safeNumber = (value: any, fallback = 0): number => {
  if (typeof value === "number" && !isNaN(value)) {
    return value
  }
  return fallback
}

export default function ExecutiveReportView({
  results = [],
  config = {} as CalculationConfiguration,
}: ExecutiveReportViewProps) {
  const safeResults = Array.isArray(results) ? results : []
  const safeConfig = config || ({} as CalculationConfiguration)

  const portnoxResult = useMemo(() => safeResults.find((r) => r?.vendor === "portnox"), [safeResults])

  const lowestCompetitor = useMemo(() => {
    const competitors = safeResults.filter((r) => r?.vendor !== "portnox" && r?.totalTco)
    if (competitors.length === 0) return null
    return competitors.sort((a, b) => safeNumber(a.totalTco) - safeNumber(b.totalTco))[0]
  }, [safeResults])

  const handlePrint = () => {
    window.print()
  }

  // Safe access to config properties
  const devices = safeNumber(safeConfig.devices, 1000)
  const years = safeNumber(safeConfig.years, 3)

  if (!portnoxResult) {
    return (
      <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary Report</CardTitle>
              <CardDescription>Generate comprehensive TCO analysis reports</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Please select vendors and configure settings to generate the executive report.
              </p>
              <Button disabled>
                <Download className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    )
  }

  const portnoxTotalTco = safeNumber(portnoxResult.totalTco)
  const competitorTotalTco = safeNumber(lowestCompetitor?.totalTco)
  const savings = competitorTotalTco > 0 ? competitorTotalTco - portnoxTotalTco : 0
  const savingsPercentage = competitorTotalTco > 0 ? (savings / competitorTotalTco) * 100 : 0

  return (
    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
      <motion.div variants={fadeInUp} className="flex justify-between items-center">
        <SectionTitle
          icon={<FileText />}
          title="Executive Summary Report"
          description={`A consolidated report of the ${years}-year TCO analysis.`}
        />
        <Button onClick={handlePrint}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Key Findings</CardTitle>
            <CardDescription>
              Based on an organization with {devices.toLocaleString()} devices over {years} years.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              This analysis reveals that <strong>Portnox</strong> offers a significantly lower Total Cost of Ownership
              (TCO) compared to its competitors. The primary drivers for this are the elimination of hardware costs,
              reduced operational overhead due to its cloud-native architecture, and inclusive licensing for advanced
              features.
            </p>
            {lowestCompetitor && savings > 0 && (
              <p>
                Portnox delivers a <strong className="text-green-600">{savingsPercentage.toFixed(0)}%</strong> lower TCO
                than the next best alternative, {lowestCompetitor.vendorName || "competitor"}, resulting in total
                savings of <strong className="text-green-600">{formatCurrency(savings)}</strong> over {years} years.
              </p>
            )}
            <p>
              The cloud-native architecture of Portnox eliminates the need for on-premises hardware, reduces maintenance
              overhead, and provides automatic updates and scaling capabilities that traditional solutions cannot match.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>TCO & ROI Comparison</CardTitle>
            <CardDescription>Comprehensive comparison of all evaluated vendors</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="text-right">Total TCO ({years}yr)</TableHead>
                  <TableHead className="text-right">Total ROI ({years}yr)</TableHead>
                  <TableHead className="text-right">Payback (Months)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {safeResults.map((r) => {
                  const totalTco = safeNumber(r?.totalTco)
                  const totalRoi = safeNumber(r?.roi?.totalRoi)
                  const paybackMonths = safeNumber(r?.roi?.paybackMonths)

                  return (
                    <TableRow
                      key={r?.vendor || Math.random()}
                      className={r?.vendor === "portnox" ? "bg-primary/10" : ""}
                    >
                      <TableCell className="font-medium">{r?.vendorName || r?.vendor || "Unknown"}</TableCell>
                      <TableCell className="text-right font-bold">{formatCurrency(totalTco)}</TableCell>
                      <TableCell className="text-right font-bold text-green-600">
                        {(totalRoi * 100).toFixed(0)}%
                      </TableCell>
                      <TableCell className="text-right">{paybackMonths.toFixed(1)}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown Analysis</CardTitle>
            <CardDescription>Detailed breakdown of Portnox TCO components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(safeNumber(portnoxResult.licensing))}
                </div>
                <div className="text-sm text-muted-foreground">Licensing</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(safeNumber(portnoxResult.implementation))}
                </div>
                <div className="text-sm text-muted-foreground">Implementation</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(safeNumber(portnoxResult.support))}
                </div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(safeNumber(portnoxResult.training))}
                </div>
                <div className="text-sm text-muted-foreground">Training</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Strategic Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              For organizations seeking a modern, scalable, and cost-effective Network Access Control solution,{" "}
              <strong className="text-primary">Portnox</strong> is the recommended choice. Its cloud-native platform not
              only provides substantial cost savings but also enhances security posture and operational efficiency,
              delivering a rapid and high-value return on investment.
            </p>

            <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
              <h4 className="font-semibold text-primary mb-2">Key Benefits:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Zero hardware requirements - fully cloud-native architecture</li>
                <li>• Automatic updates and feature enhancements</li>
                <li>• Scalable licensing model that grows with your organization</li>
                <li>• Comprehensive security coverage with advanced threat detection</li>
                <li>• Simplified management and reduced operational overhead</li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground">
              This analysis is based on current market data and organizational requirements. Actual results may vary
              based on specific implementation details and organizational factors.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
