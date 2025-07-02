"use client"

import { Tooltip } from "@/components/ui/tooltip"

import type React from "react"
import type { NewVendorData } from "@/lib/vendors/data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle, XCircle, MinusCircle } from "lucide-react"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts"

interface ComplianceRiskTabProps {
  vendorData: NewVendorData[]
}

const complianceStandards = ["pci_dss", "hipaa", "soc2", "iso27001", "gdpr", "ccpa"]

const ComplianceIcon = ({ level }: { level: string | undefined }) => {
  if (!level) return <MinusCircle className="w-5 h-5 text-slate-500" />
  const lowerLevel = level.toLowerCase()
  if (lowerLevel.includes("compliant") || lowerLevel.includes("certified")) {
    return <CheckCircle className="w-5 h-5 text-emerald-400" />
  }
  if (lowerLevel.includes("partial") || lowerLevel.includes("covered")) {
    return <CheckCircle className="w-5 h-5 text-amber-400" />
  }
  return <XCircle className="w-5 h-5 text-red-500" />
}

const ComplianceRiskTab: React.FC<ComplianceRiskTabProps> = ({ vendorData }) => {
  const radarChartData = vendorData.map((vendor) => ({
    subject: vendor.name,
    A: vendor.comparativeScores?.securityEffectiveness || 0,
    B: vendor.comparativeScores?.complianceCoverageScore || 0,
    fullMark: 100,
  }))

  return (
    <div className="space-y-8">
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Compliance & Risk Posture</CardTitle>
          <CardDescription className="text-slate-400">
            Side-by-side comparison of compliance certifications and security effectiveness scores.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="overflow-x-auto rounded-lg border border-slate-700">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-800/70">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-100 sm:pl-6">
                    Standard
                  </th>
                  {vendorData.map((vendor) => (
                    <th
                      key={vendor.id}
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-slate-100"
                    >
                      {vendor.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                {complianceStandards.map((standard) => (
                  <tr key={standard} className="hover:bg-slate-700/30 transition-colors duration-150">
                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-6">
                      {standard.toUpperCase().replace("_", " ")}
                    </td>
                    {vendorData.map((vendor) => {
                      const support = vendor.complianceSupport?.find(
                        (cs) => cs.standardId === standard || cs.standardId.includes(standard),
                      )
                      return (
                        <td
                          key={`${vendor.id}-${standard}`}
                          className="whitespace-nowrap px-3 py-3 text-sm text-center text-slate-300"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <ComplianceIcon level={support?.coverageLevel} />
                            <span className="hidden md:inline">{support?.coverageLevel || "N/A"}</span>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                <PolarGrid stroke="#475569" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#E2E8F0", fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#94A3B8", fontSize: 10 }} />
                <Radar name="Security Effectiveness" dataKey="A" stroke="#00D4AA" fill="#00D4AA" fillOpacity={0.6} />
                <Radar name="Compliance Coverage" dataKey="B" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 41, 59, 0.95)",
                    borderColor: "#475569",
                    borderRadius: "0.75rem",
                  }}
                  labelStyle={{ fontWeight: "bold", color: "#E2E8F0" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ComplianceRiskTab
