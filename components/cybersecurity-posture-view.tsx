"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import { staggerChildren, fadeInUp, MetricCard } from "./shared-ui"
import { CheckCircle2, ShieldCheck, XCircle } from "lucide-react"

const VIBRANT_COLORS = ["#00D4AA", "#FF6B35", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"]

export default function CybersecurityPostureView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  const complianceFrameworks = ["PCI DSS", "HIPAA", "SOC2", "ISO 27001", "GDPR"]
  const radarData = useMemo(() => {
    const subjects = results.map((r) => r.vendorName)
    return complianceFrameworks.map((framework) => {
      const point: { [key: string]: string | number } = { subject: framework }
      results.forEach((r) => {
        const vendorData = ComprehensiveVendorDatabase[r.vendor]
        point[r.vendorName] =
          vendorData.featureSupport.compliance[framework] === "✓✓✓"
            ? 100
            : vendorData.featureSupport.compliance[framework] === "✓✓"
              ? 75
              : 50
      })
      return point
    })
  }, [results, complianceFrameworks])

  const allCerts = useMemo(() => {
    const certs = new Set<string>()
    results.forEach((r) => {
      const vendorData = ComprehensiveVendorDatabase[r.vendor]
      Object.keys(vendorData.featureSupport.compliance).forEach((cert) => {
        if (vendorData.featureSupport.compliance[cert] !== "✗") {
          certs.add(cert)
        }
      })
    })
    return Array.from(certs)
  }, [results])

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" variants={staggerChildren}>
        {results.map((r) => (
          <motion.div variants={fadeInUp} key={r.vendor}>
            <MetricCard
              title={`${r.vendorName} Risk Reduction`}
              value={`${(r.risk.breachReduction * 100).toFixed(0)}%`}
              detail="Breach Probability Reduction"
              icon={<ShieldCheck />}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Coverage</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  {results.map((r, i) => (
                    <Radar
                      key={r.vendor}
                      name={r.vendorName}
                      dataKey={r.vendorName}
                      stroke={VIBRANT_COLORS[i % VIBRANT_COLORS.length]}
                      fill={VIBRANT_COLORS[i % VIBRANT_COLORS.length]}
                      fillOpacity={0.6}
                    />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Security Certifications Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certification</TableHead>
                    {results.map((r) => (
                      <TableHead key={r.vendor} className="text-center">
                        {r.vendorName}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allCerts.map((cert) => (
                    <TableRow key={cert}>
                      <TableCell>{cert}</TableCell>
                      {results.map((r) => (
                        <TableCell key={r.vendor} className="text-center">
                          {ComprehensiveVendorDatabase[r.vendor].featureSupport.compliance[cert] !== "✗" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
