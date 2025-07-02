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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import { staggerChildren, fadeInUp, MetricCard, VIBRANT_COLORS, ProgressRing } from "./shared-ui"
import { CheckCircle2, ShieldCheck, XCircle, AlertTriangle, Shield, Lock, Eye } from "lucide-react"

interface CybersecurityPostureViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function CybersecurityPostureView({ results, config }: CybersecurityPostureViewProps) {
  // Safe results processing
  const safeResults = useMemo(() => {
    return (results || []).filter((result) => result && typeof result === "object")
  }, [results])

  const complianceFrameworks = ["PCI DSS", "HIPAA", "SOC2", "ISO 27001", "GDPR"]

  const radarData = useMemo(() => {
    if (!safeResults.length) return []

    return complianceFrameworks.map((framework) => {
      const point: { [key: string]: string | number } = { subject: framework }
      safeResults.forEach((result) => {
        const vendorData = ComprehensiveVendorDatabase[result.vendor]
        if (vendorData?.featureSupport?.compliance) {
          const complianceLevel = vendorData.featureSupport.compliance[framework]
          point[result.vendorName || "Unknown"] =
            complianceLevel === "✓✓✓" ? 100 : complianceLevel === "✓✓" ? 75 : complianceLevel === "✓" ? 50 : 25
        } else {
          point[result.vendorName || "Unknown"] = 25
        }
      })
      return point
    })
  }, [safeResults, complianceFrameworks])

  const securityMetrics = useMemo(() => {
    return safeResults.map((result) => {
      const riskMetrics = result.riskMetrics || {}
      return {
        vendor: result.vendorName || "Unknown",
        breachReduction: (riskMetrics.breachProbabilityReduction || 0) * 100,
        complianceScore: riskMetrics.complianceScore || 0,
        securityPosture: Math.min(100, (riskMetrics.complianceScore || 0) + 20),
        threatDetection: Math.random() * 40 + 60, // Simulated data
        incidentResponse: Math.random() * 30 + 70, // Simulated data
      }
    })
  }, [safeResults])

  const allCerts = useMemo(() => {
    const certs = new Set<string>()
    safeResults.forEach((result) => {
      const vendorData = ComprehensiveVendorDatabase[result.vendor]
      if (vendorData?.featureSupport?.compliance) {
        Object.keys(vendorData.featureSupport.compliance).forEach((cert) => {
          if (vendorData.featureSupport.compliance[cert] !== "✗") {
            certs.add(cert)
          }
        })
      }
    })
    return Array.from(certs)
  }, [safeResults])

  const riskAssessment = useMemo(() => {
    if (!safeResults.length) return { high: 0, medium: 0, low: 0 }

    return safeResults.reduce(
      (acc, result) => {
        const breachReduction = result.riskMetrics?.breachProbabilityReduction || 0
        if (breachReduction > 0.7) acc.high++
        else if (breachReduction > 0.4) acc.medium++
        else acc.low++
        return acc
      },
      { high: 0, medium: 0, low: 0 },
    )
  }, [safeResults])

  if (!safeResults.length) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No security data available. Please select vendors to analyze.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      {/* Security Metrics Overview */}
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Average Breach Reduction"
            value={`${Math.round(
              safeResults.reduce((sum, r) => sum + (r.riskMetrics?.breachProbabilityReduction || 0) * 100, 0) /
                safeResults.length,
            )}%`}
            detail="Across all selected vendors"
            icon={<ShieldCheck className="h-5 w-5" />}
            trend="up"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Compliance Coverage"
            value={`${allCerts.length}/${complianceFrameworks.length}`}
            detail="Frameworks supported"
            icon={<CheckCircle2 className="h-5 w-5" />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="High Security Vendors"
            value={riskAssessment.high}
            detail="With >70% breach reduction"
            icon={<Lock className="h-5 w-5" />}
            trend="up"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Risk Mitigation"
            value="Advanced"
            detail="Overall security posture"
            icon={<Eye className="h-5 w-5" />}
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Framework Coverage */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Compliance Framework Coverage</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              {radarData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    {safeResults.map((result, i) => (
                      <Radar
                        key={result.vendor}
                        name={result.vendorName}
                        dataKey={result.vendorName}
                        stroke={VIBRANT_COLORS[i % VIBRANT_COLORS.length]}
                        fill={VIBRANT_COLORS[i % VIBRANT_COLORS.length]}
                        fillOpacity={0.6}
                      />
                    ))}
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No compliance data available
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Metrics Comparison */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Security Metrics Comparison</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              {securityMetrics.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={securityMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="breachReduction" fill={VIBRANT_COLORS[0]} name="Breach Reduction %" />
                    <Bar dataKey="threatDetection" fill={VIBRANT_COLORS[1]} name="Threat Detection %" />
                    <Bar dataKey="incidentResponse" fill={VIBRANT_COLORS[2]} name="Incident Response %" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No security metrics available
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Security Certifications Matrix */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Security Certifications Matrix</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {allCerts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certification</TableHead>
                    {safeResults.map((result) => (
                      <TableHead key={result.vendor} className="text-center">
                        {result.vendorName}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allCerts.map((cert) => (
                    <TableRow key={cert}>
                      <TableCell className="font-medium">{cert}</TableCell>
                      {safeResults.map((result) => {
                        const vendorData = ComprehensiveVendorDatabase[result.vendor]
                        const hasCompliance =
                          vendorData?.featureSupport?.compliance?.[cert] &&
                          vendorData.featureSupport.compliance[cert] !== "✗"
                        return (
                          <TableCell key={result.vendor} className="text-center">
                            {hasCompliance ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No certification data available</div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Risk Assessment Summary */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Risk Assessment Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <ProgressRing value={(riskAssessment.high / safeResults.length) * 100} color="#22C55E" />
                <h3 className="font-semibold mt-4">High Security</h3>
                <p className="text-sm text-muted-foreground">{riskAssessment.high} vendors</p>
              </div>
              <div className="text-center">
                <ProgressRing value={(riskAssessment.medium / safeResults.length) * 100} color="#F59E0B" />
                <h3 className="font-semibold mt-4">Medium Security</h3>
                <p className="text-sm text-muted-foreground">{riskAssessment.medium} vendors</p>
              </div>
              <div className="text-center">
                <ProgressRing value={(riskAssessment.low / safeResults.length) * 100} color="#EF4444" />
                <h3 className="font-semibold mt-4">Lower Security</h3>
                <p className="text-sm text-muted-foreground">{riskAssessment.low} vendors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Security Breakdown */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Detailed Security Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {safeResults.map((result, index) => {
                const riskMetrics = result.riskMetrics || {}
                const breachReduction = (riskMetrics.breachProbabilityReduction || 0) * 100
                const complianceScore = riskMetrics.complianceScore || 0

                return (
                  <div key={result.vendor} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg">{result.vendorName}</h4>
                      <Badge
                        variant={breachReduction > 70 ? "default" : breachReduction > 40 ? "secondary" : "destructive"}
                      >
                        {breachReduction > 70
                          ? "High Security"
                          : breachReduction > 40
                            ? "Medium Security"
                            : "Basic Security"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Breach Reduction</p>
                        <Progress value={breachReduction} className="mb-1" />
                        <p className="text-sm font-medium">{Math.round(breachReduction)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Compliance Score</p>
                        <Progress value={Math.min(100, complianceScore)} className="mb-1" />
                        <p className="text-sm font-medium">{Math.round(complianceScore)}/100</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Overall Security</p>
                        <Progress value={Math.min(100, (breachReduction + complianceScore) / 2)} className="mb-1" />
                        <p className="text-sm font-medium">{Math.round((breachReduction + complianceScore) / 2)}/100</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
