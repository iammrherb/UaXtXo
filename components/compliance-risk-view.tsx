"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Shield, AlertTriangle, CheckCircle, XCircle, Award, Lock, FileText, Users } from "lucide-react"

const PORTNOX_COLORS = {
  primary: "#00D4AA",
  primaryDark: "#00A88A",
  accent: "#FF6B35",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
}

interface ComplianceRiskViewProps {
  results?: any
  industry?: string
  selectedVendors?: string[]
  darkMode?: boolean
}

const ComplianceRiskView: React.FC<ComplianceRiskViewProps> = ({
  results = {},
  industry = "technology",
  selectedVendors = ["portnox", "cisco", "aruba", "meraki"],
  darkMode = false,
}) => {
  // Compliance frameworks data
  const complianceFrameworks = {
    "SOC 2 Type II": {
      portnox: { status: "certified", score: 98, lastAudit: "2024-01" },
      cisco: { status: "certified", score: 92, lastAudit: "2023-11" },
      aruba: { status: "certified", score: 88, lastAudit: "2023-09" },
      meraki: { status: "certified", score: 90, lastAudit: "2023-12" },
    },
    "ISO 27001": {
      portnox: { status: "certified", score: 96, lastAudit: "2024-02" },
      cisco: { status: "certified", score: 89, lastAudit: "2023-10" },
      aruba: { status: "certified", score: 85, lastAudit: "2023-08" },
      meraki: { status: "partial", score: 78, lastAudit: "2023-11" },
    },
    HIPAA: {
      portnox: { status: "compliant", score: 95, lastAudit: "2024-01" },
      cisco: { status: "compliant", score: 87, lastAudit: "2023-12" },
      aruba: { status: "partial", score: 82, lastAudit: "2023-10" },
      meraki: { status: "partial", score: 75, lastAudit: "2023-11" },
    },
    "PCI DSS": {
      portnox: { status: "certified", score: 94, lastAudit: "2024-01" },
      cisco: { status: "certified", score: 91, lastAudit: "2023-11" },
      aruba: { status: "certified", score: 88, lastAudit: "2023-09" },
      meraki: { status: "partial", score: 80, lastAudit: "2023-12" },
    },
    GDPR: {
      portnox: { status: "compliant", score: 97, lastAudit: "2024-02" },
      cisco: { status: "partial", score: 83, lastAudit: "2023-10" },
      aruba: { status: "partial", score: 79, lastAudit: "2023-08" },
      meraki: { status: "partial", score: 81, lastAudit: "2023-11" },
    },
    "NIST Cybersecurity Framework": {
      portnox: { status: "compliant", score: 96, lastAudit: "2024-01" },
      cisco: { status: "compliant", score: 88, lastAudit: "2023-12" },
      aruba: { status: "compliant", score: 84, lastAudit: "2023-10" },
      meraki: { status: "partial", score: 82, lastAudit: "2023-11" },
    },
    FedRAMP: {
      portnox: { status: "authorized", score: 98, lastAudit: "2024-01" },
      cisco: { status: "none", score: 0, lastAudit: "N/A" },
      aruba: { status: "none", score: 0, lastAudit: "N/A" },
      meraki: { status: "none", score: 0, lastAudit: "N/A" },
    },
  }

  // Risk assessment data
  const riskAssessment = {
    portnox: {
      dataBreachRisk: 15,
      complianceRisk: 8,
      operationalRisk: 12,
      financialRisk: 10,
      reputationalRisk: 9,
      overallRisk: 11,
    },
    cisco: {
      dataBreachRisk: 35,
      complianceRisk: 25,
      operationalRisk: 45,
      financialRisk: 40,
      reputationalRisk: 30,
      overallRisk: 35,
    },
    aruba: {
      dataBreachRisk: 32,
      complianceRisk: 28,
      operationalRisk: 38,
      financialRisk: 35,
      reputationalRisk: 32,
      overallRisk: 33,
    },
    meraki: {
      dataBreachRisk: 28,
      complianceRisk: 22,
      operationalRisk: 30,
      financialRisk: 28,
      reputationalRisk: 25,
      overallRisk: 27,
    },
  }

  // Compliance score calculation
  const calculateComplianceScore = (vendor: string) => {
    const frameworks = Object.values(complianceFrameworks)
    const scores = frameworks.map((framework) => framework[vendor as keyof typeof framework]?.score || 0)
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
  }

  // Risk radar data
  const riskRadarData = selectedVendors.map((vendor) => ({
    vendor: vendor.charAt(0).toUpperCase() + vendor.slice(1),
    dataBreachRisk: 100 - (riskAssessment[vendor as keyof typeof riskAssessment]?.dataBreachRisk || 0),
    complianceRisk: 100 - (riskAssessment[vendor as keyof typeof riskAssessment]?.complianceRisk || 0),
    operationalRisk: 100 - (riskAssessment[vendor as keyof typeof riskAssessment]?.operationalRisk || 0),
    financialRisk: 100 - (riskAssessment[vendor as keyof typeof riskAssessment]?.financialRisk || 0),
    reputationalRisk: 100 - (riskAssessment[vendor as keyof typeof riskAssessment]?.reputationalRisk || 0),
  }))

  // Compliance comparison data
  const complianceComparisonData = selectedVendors.map((vendor) => ({
    vendor: vendor.charAt(0).toUpperCase() + vendor.slice(1),
    score: calculateComplianceScore(vendor),
    risk: riskAssessment[vendor as keyof typeof riskAssessment]?.overallRisk || 0,
  }))

  // Industry-specific requirements
  const industryRequirements = {
    healthcare: ["HIPAA", "SOC 2 Type II", "GDPR"],
    finance: ["PCI DSS", "SOC 2 Type II", "GDPR", "NIST Cybersecurity Framework"],
    government: ["FedRAMP", "NIST Cybersecurity Framework", "SOC 2 Type II"],
    technology: ["SOC 2 Type II", "ISO 27001", "GDPR"],
    retail: ["PCI DSS", "GDPR", "SOC 2 Type II"],
    education: ["GDPR", "SOC 2 Type II", "NIST Cybersecurity Framework"],
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "certified":
      case "authorized":
      case "compliant":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "partial":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "none":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <XCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "certified":
      case "authorized":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Certified</Badge>
      case "compliant":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Compliant</Badge>
      case "partial":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Partial</Badge>
      case "none":
        return <Badge className="bg-red-100 text-red-800 border-red-200">None</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Unknown</Badge>
    }
  }

  const ComplianceMetricCard = ({ title, value, subtitle, icon: Icon, trend, color = PORTNOX_COLORS.primary }: any) => (
    <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card className={`h-full ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20`, color: color }}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{title}</p>
                <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{value}</p>
                {subtitle && <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{subtitle}</p>}
              </div>
            </div>
            {trend && (
              <Badge variant={trend > 0 ? "default" : "destructive"} className="ml-2">
                {trend > 0 ? "+" : ""}
                {trend}%
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card
          className={`${darkMode ? "bg-gradient-to-r from-gray-800 to-gray-900" : "bg-gradient-to-r from-red-50 to-orange-50"}`}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <Shield className="h-8 w-8 text-red-600" />
                  Compliance & Risk Assessment
                </CardTitle>
                <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Comprehensive compliance framework analysis for {industry} industry
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{calculateComplianceScore("portnox")}%</div>
                <div className="text-sm text-green-600">Portnox Compliance Score</div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Key Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ComplianceMetricCard
          title="Overall Compliance"
          value={`${calculateComplianceScore("portnox")}%`}
          subtitle="Framework coverage"
          icon={Shield}
          trend={15}
          color={PORTNOX_COLORS.success}
        />
        <ComplianceMetricCard
          title="Risk Reduction"
          value={`${100 - (riskAssessment.portnox?.overallRisk || 0)}%`}
          subtitle="vs industry average"
          icon={AlertTriangle}
          trend={-89}
          color={PORTNOX_COLORS.primary}
        />
        <ComplianceMetricCard
          title="Audit Readiness"
          value="98%"
          subtitle="Automated compliance"
          icon={FileText}
          trend={25}
          color={PORTNOX_COLORS.info}
        />
        <ComplianceMetricCard
          title="Certifications"
          value="7/7"
          subtitle="Active certifications"
          icon={Award}
          trend={100}
          color={PORTNOX_COLORS.accent}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Comparison */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-600" />
              Compliance Score Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={complianceComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                <XAxis dataKey="vendor" tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Compliance Score"]}
                  contentStyle={{
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="score" fill={PORTNOX_COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Assessment Radar */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Risk Assessment Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={riskRadarData}>
                <PolarGrid stroke={darkMode ? "#374151" : "#E5E7EB"} />
                <PolarAngleAxis dataKey="vendor" tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 10 }}
                />
                {selectedVendors.map((vendor, index) => (
                  <Radar
                    key={vendor}
                    name={vendor.charAt(0).toUpperCase() + vendor.slice(1)}
                    dataKey={`${vendor}Risk`}
                    stroke={Object.values(PORTNOX_COLORS)[index % Object.values(PORTNOX_COLORS).length]}
                    fill={Object.values(PORTNOX_COLORS)[index % Object.values(PORTNOX_COLORS).length]}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                ))}
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Framework Matrix */}
      <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-purple-600" />
            Compliance Framework Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <th className={`text-left p-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Framework</th>
                  {selectedVendors.map((vendor) => (
                    <th key={vendor} className={`text-center p-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {vendor.charAt(0).toUpperCase() + vendor.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(complianceFrameworks).map(([framework, vendors]) => (
                  <tr key={framework} className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <td className={`p-3 font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <div className="flex items-center space-x-2">
                        <span>{framework}</span>
                        {industryRequirements[industry as keyof typeof industryRequirements]?.includes(framework) && (
                          <Badge variant="outline" className="text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                    </td>
                    {selectedVendors.map((vendor) => (
                      <td key={vendor} className="p-3 text-center">
                        <div className="flex flex-col items-center space-y-1">
                          {getStatusIcon(vendors[vendor as keyof typeof vendors]?.status || "none")}
                          <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {vendors[vendor as keyof typeof vendors]?.score || 0}%
                          </span>
                          {getStatusBadge(vendors[vendor as keyof typeof vendors]?.status || "none")}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Risk Mitigation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Data Breach Prevention",
            description: "Advanced threat detection and zero-trust architecture",
            value: `${100 - (riskAssessment.portnox?.dataBreachRisk || 0)}% Risk Reduction`,
            color: PORTNOX_COLORS.success,
            icon: Shield,
          },
          {
            title: "Compliance Automation",
            description: "Built-in compliance frameworks and automated reporting",
            value: `${100 - (riskAssessment.portnox?.complianceRisk || 0)}% Compliance Risk Reduction`,
            color: PORTNOX_COLORS.info,
            icon: FileText,
          },
          {
            title: "Operational Resilience",
            description: "Cloud-native architecture with 99.9% uptime SLA",
            value: `${100 - (riskAssessment.portnox?.operationalRisk || 0)}% Operational Risk Reduction`,
            color: PORTNOX_COLORS.accent,
            icon: Users,
          },
        ].map((mitigation, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`h-full ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
              <CardContent className="p-6">
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${mitigation.color}20` }}
                  >
                    <mitigation.icon className="h-6 w-6" style={{ color: mitigation.color }} />
                  </div>
                  <div className="text-lg font-bold mb-2" style={{ color: mitigation.color }}>
                    {mitigation.value}
                  </div>
                  <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {mitigation.title}
                  </h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{mitigation.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ComplianceRiskView
