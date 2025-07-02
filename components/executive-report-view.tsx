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

const formatCurrency = (value: number) => `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`

export default function ExecutiveReportView({ results, config }: ExecutiveReportViewProps) {
  const portnoxResult = useMemo(() => results.find((r) => r.vendor === "portnox"), [results])
  const lowestCompetitor = useMemo(
    () => results.filter((r) => r.vendor !== "portnox").sort((a, b) => a.totalTco - b.totalTco)[0],
    [results],
  )

  const handlePrint = () => {
    window.print()
  }

  if (!portnoxResult)
    return (
      <Card>
        <CardContent>Portnox data is required for the report.</CardContent>
      </Card>
    )

  return (
    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
      <motion.div variants={fadeInUp} className="flex justify-between items-center">
        <SectionTitle
          icon={<FileText />}
          title="Executive Summary Report"
          description={`A consolidated report of the ${config.years}-year TCO analysis.`}
        />
        <Button onClick={handlePrint}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Reports & Export</CardTitle>
            <CardDescription>Generate and download comprehensive reports.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p>Report generation is coming soon.</p>
            <Button className="mt-4">
              <Download className="mr-2 h-4 w-4" /> Download Sample PDF
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Key Findings</CardTitle>
            <CardDescription>
              Based on an organization with {config.devices} devices over {config.years} years.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              This analysis reveals that <strong>Portnox</strong> offers a significantly lower Total Cost of Ownership
              (TCO) compared to its competitors. The primary drivers for this are the elimination of hardware costs,
              reduced operational overhead due to its cloud-native architecture, and inclusive licensing for advanced
              features.
            </p>
            <p>
              Portnox delivers a{" "}
              <strong>
                {(((lowestCompetitor.totalTco - portnoxResult.totalTco) / lowestCompetitor.totalTco) * 100).toFixed(0)}%
              </strong>{" "}
              lower TCO than the next best alternative, {lowestCompetitor.vendorName}, resulting in total savings of{" "}
              <strong>{formatCurrency(lowestCompetitor.totalTco - portnoxResult.totalTco)}</strong> over {config.years}{" "}
              years.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>TCO & ROI Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="text-right">Total TCO ({config.years}yr)</TableHead>
                  <TableHead className="text-right">Total ROI ({config.years}yr)</TableHead>
                  <TableHead className="text-right">Payback (Months)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((r) => (
                  <TableRow key={r.vendor} className={r.vendor === "portnox" ? "bg-primary/10" : ""}>
                    <TableCell className="font-medium">{r.vendorName}</TableCell>
                    <TableCell className="text-right font-bold">{formatCurrency(r.totalTco)}</TableCell>
                    <TableCell className="text-right font-bold text-green-500">
                      {(r.roi.totalRoi * 100).toFixed(0)}%
                    </TableCell>
                    <TableCell className="text-right">{r.roi.paybackMonths.toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              For organizations seeking a modern, scalable, and cost-effective Network Access Control solution,{" "}
              <strong>Portnox</strong> is the recommended choice. Its cloud-native platform not only provides
              substantial cost savings but also enhances security posture and operational efficiency, delivering a rapid
              and high-value return on investment.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
