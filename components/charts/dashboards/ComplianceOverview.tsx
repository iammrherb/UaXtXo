"use client"

import type React from "react"
import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts"
import { Shield } from "lucide-react"
import { useDashboardContext } from "@/context/DashboardContext"
import { useVendorData } from "@/hooks/useVendorData"
import { useComplianceData } from "@/hooks/useComplianceData"

export const ComplianceOverview: React.FC = () => {
  const { selectedIndustry } = useDashboardContext()
  const { isLoadingAllVendors } = useVendorData()
  const { vendorRiskAssessments, applicableStandards, isLoading: isLoadingCompliance } = useComplianceData()

  const complianceData = useMemo(() => {
    return Object.entries(vendorRiskAssessments).map(([vendorId, assessment]) => ({
      vendorId,
      vendorName: vendorId, // Placeholder, should be fetched
      overallRiskScore: assessment.overallRiskScore,
      riskLevel: assessment.riskLevel,
      complianceGaps: assessment.complianceGaps.length,
      averageCoverage: 100 - assessment.overallRiskScore, // Simplified
      costRisk: assessment.costOfNonCompliance.total,
    }))
  }, [vendorRiskAssessments])

  const riskDistribution = useMemo(() => {
    const distribution = complianceData.reduce(
      (acc, vendor) => {
        acc[vendor.riskLevel] = (acc[vendor.riskLevel] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
    return Object.entries(distribution).map(([level, count]) => ({
      name: level.charAt(0).toUpperCase() + level.slice(1),
      value: count,
      color:
        level === "critical" ? "#ef4444" : level === "high" ? "#f97316" : level === "medium" ? "#eab308" : "#22c55e",
    }))
  }, [complianceData])

  if (isLoadingAllVendors || isLoadingCompliance) {
    return <div>Loading...</div>
  }

  return (
    <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white">Compliance Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="bg-blue-900/20 border-blue-500/50">
          <Shield className="h-4 w-4" />
          <AlertDescription className="text-blue-100">
            <strong>Industry Compliance Focus:</strong> Analysis tailored for{" "}
            <Badge variant="outline" className="text-blue-300">
              {selectedIndustry.replace("_", " ").toUpperCase()}
            </Badge>
          </AlertDescription>
        </Alert>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white">Risk Level Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "rgba(30, 41, 59, 0.95)", borderColor: "#475569" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white">Applicable Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {applicableStandards.map((standard) => (
                  <div key={standard.id} className="p-2 bg-slate-700/30 rounded-lg">
                    <h4 className="font-semibold text-white">{standard.name}</h4>
                    <p className="text-xs text-slate-400">{standard.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
