"use client"
import { motion } from "framer-motion"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SectionTitle, fadeInUp, staggerChildren, VIBRANT_COLORS, MetricCard } from "./shared-ui"
import { ShieldCheck, CheckCircle2, XCircle } from "lucide-react"

interface CybersecurityPostureViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function CybersecurityPostureView({ results, config }: CybersecurityPostureViewProps) {
  const complianceFrameworks = ["pci", "hipaa", "soc2", "gdpr", "iso27001"]
  const radarData = complianceFrameworks.map((fw) => {
    const dataPoint: { [key: string]: string | number } = { subject: fw.toUpperCase() }
    results.forEach((r) => {
      const vendorData = ComprehensiveVendorDatabase[r.vendor]
      const hasCompliance = vendorData.compliance.certifications.some((c) => c.toLowerCase().includes(fw))
      dataPoint[r.vendorName] = hasCompliance ? 100 : 20
    })
    return dataPoint
  })

  const allCerts = Array.from(
    new Set(results.flatMap((r) => ComprehensiveVendorDatabase[r.vendor].compliance.certifications)),
  )

  return (
    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
      <motion.div variants={fadeInUp}>
        <SectionTitle
          icon={<ShieldCheck />}
          title="Cybersecurity Posture & Risk"
          description="Evaluating compliance coverage, risk reduction, and security certifications."
        />
      </motion.div>

      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        {results.map((r) => (
          <motion.div variants={fadeInUp} key={r.vendor}>
            <MetricCard
              title={`${r.vendorName} Risk Reduction`}
              value={`${(r.risk.reduction * 100).toFixed(0)}%`}
              detail="Breach Probability Reduction"
              icon={<ShieldCheck />}
              gradient="ocean"
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Compliance Framework Coverage</h3>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
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
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Security Certifications Matrix</h3>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] overflow-y-auto">
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
                            {ComprehensiveVendorDatabase[r.vendor].compliance.certifications.includes(cert) ? (
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
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
