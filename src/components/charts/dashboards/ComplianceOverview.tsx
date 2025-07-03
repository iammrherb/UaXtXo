"use client"

import type React from "react"
import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Treemap,
} from "recharts"
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Eye, FileText } from "lucide-react"
import { useDashboardSettings } from "@/context/DashboardContext"
import { useVendorData } from "@/hooks/useVendorData"
import { complianceStandards } from "@/lib/compliance/standards"
import { ComplianceRiskAssessor } from "@/lib/compliance/risk-assessment"
import type { NewVendorData } from "@/lib/vendors/data"

const ComplianceOverview: React.FC = () => {
  const { selectedOrgSize, selectedIndustry } = useDashboardSettings()
  const { getAllVendorIds, getVendor, isLoadingAllVendors } = useVendorData()

  const vendors = useMemo(() => {
    if (isLoadingAllVendors) return []
    return getAllVendorIds()
      .map((id) => getVendor(id))
      .filter(Boolean) as NewVendorData[]
  }, [getAllVendorIds, getVendor, isLoadingAllVendors])

  const applicableStandards = useMemo(() => {
    return complianceStandards.filter(
      (standard) =>
        standard.applicableIndustries.includes(selectedIndustry) || standard.applicableIndustries.includes("all"),
    )
  }, [selectedIndustry])

  const complianceData = useMemo(() => {
    if (vendors.length === 0) return []

    return vendors.map((vendor) => {
      const assessor = new ComplianceRiskAssessor(selectedIndustry, selectedOrgSize, applicableStandards)
      const riskAssessment = assessor.assessVendorRisk(vendor)

      const coverageByStandard = applicableStandards.map((standard) => {
        const support = vendor.complianceSupport?.find((cs) => cs.standardId === standard.id)
        let coverage = 0
        if (support?.coverageLevel?.toLowerCase().includes("certified")) coverage = 100
        else if (support?.coverageLevel?.toLowerCase().includes("compliant")) coverage = 90
        else if (support?.coverageLevel?.toLowerCase().includes("partial")) coverage = 60
        else coverage = 0

        return {
          standardId: standard.id,
          standardName: standard.name,
          coverage,
          riskLevel: riskAssessment.riskLevel,
        }
      })

      return {
        vendorId: vendor.id,
        vendorName: vendor.name,
        overallRiskScore: riskAssessment.overallRiskScore,
        riskLevel: riskAssessment.riskLevel,
        complianceGaps: riskAssessment.complianceGaps.length,
        coverageByStandard,
        averageCoverage: coverageByStandard.reduce((sum, s) => sum + s.coverage, 0) / coverageByStandard.length,
        costRisk: riskAssessment.costOfNonCompliance.total,
      }
    })
  }, [vendors, selectedIndustry, selectedOrgSize, applicableStandards])

  const industryBenchmarks = useMemo(() => {
    const benchmarks = {
      healthcare: { avgCompliance: 85, criticalStandards: ["HIPAA", "HITECH"] },
      financial_services: { avgCompliance: 88, criticalStandards: ["PCI-DSS", "SOX"] },
      government: { avgCompliance: 82, criticalStandards: ["FedRAMP", "FISMA"] },
      education: { avgCompliance: 75, criticalStandards: ["FERPA", "COPPA"] },
      energy_utilities: { avgCompliance: 90, criticalStandards: ["NERC CIP"] },
      default: { avgCompliance: 78, criticalStandards: ["ISO 27001", "SOC 2"] },
    }
    return benchmarks[selectedIndustry as keyof typeof benchmarks] || benchmarks.default
  }, [selectedIndustry])

  const heatmapData = useMemo(() => {
    const data: any[] = []
    complianceData.forEach((vendor) => {
      vendor.coverageByStandard.forEach((standard) => {
        data.push({
          vendor: vendor.vendorName,
          standard: standard.standardName,
          coverage: standard.coverage,
          size: 1,
          riskLevel: standard.riskLevel,
        })
      })
    })
    return data
  }, [complianceData])

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

  const topRisks = useMemo(() => {
    return complianceData
      .sort((a, b) => b.overallRiskScore - a.overallRiskScore)
      .slice(0, 5)
      .map((vendor) => ({
        vendor: vendor.vendorName,
        riskScore: vendor.overallRiskScore,
        gaps: vendor.complianceGaps,
        costRisk: vendor.costRisk / 1000,
      }))
  }, [complianceData])

  if (isLoadingAllVendors) {
    return (
      <div className="p-8 rounded-2xl bg-slate-800/50 animate-pulse h-64 flex items-center justify-center text-slate-400">
        <Shield className="animate-spin h-8 w-8 mr-3" /> Loading Compliance Overview...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Industry Context Alert */}
      <Alert className="bg-blue-900/20 border-blue-500/50">
        <Shield className="h-4 w-4" />
        <AlertDescription className="text-blue-100">
          <strong>Industry Compliance Focus:</strong> Analysis tailored for{" "}
          <Badge variant="outline" className="text-blue-300">
            {selectedIndustry.replace("_", " ").toUpperCase()}
          </Badge>{" "}
          with {applicableStandards.length} applicable standards. Industry benchmark:{" "}
          <strong>{industryBenchmarks.avgCompliance}% compliance</strong>
        </AlertDescription>
      </Alert>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">Avg Compliance</p>
                <p className="text-2xl font-bold text-white">
                  {Math.round(
                    complianceData.reduce((sum, v) => sum + v.averageCoverage, 0) / complianceData.length || 0,
                  )}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <div>
                <p className="text-sm text-slate-400">High Risk Vendors</p>
                <p className="text-2xl font-bold text-white">
                  {complianceData.filter((v) => v.riskLevel === "high" || v.riskLevel === "critical").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">Standards Covered</p>
                <p className="text-2xl font-bold text-white">{applicableStandards.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-slate-400">Total Cost Risk</p>
                <p className="text-2xl font-bold text-white">
                  ${Math.round(complianceData.reduce((sum, v) => sum + v.costRisk, 0) / 1000)}K
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Heatmap */}
        <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Compliance Coverage Heatmap</CardTitle>
            <CardDescription className="text-slate-400">Coverage levels across vendors and standards</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap data={heatmapData} dataKey="size" aspectRatio={4 / 3} stroke="#374151" fill="#8884d8">
                {heatmapData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.coverage >= 90
                        ? "#22c55e"
                        : entry.coverage >= 70
                          ? "#eab308"
                          : entry.coverage >= 50
                            ? "#f97316"
                            : "#ef4444"
                    }
                  />
                ))}
              </Treemap>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Risk Level Distribution</CardTitle>
            <CardDescription className="text-slate-400">
              Distribution of vendors by compliance risk level
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 41, 59, 0.95)",
                    borderColor: "#475569",
                    borderRadius: "0.75rem",
                    color: "#F1F5F9",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Risk Vendors */}
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Highest Risk Vendors</CardTitle>
          <CardDescription className="text-slate-400">
            Vendors requiring immediate attention for compliance risk mitigation
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topRisks} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="vendor"
                tick={{ fill: "#E5E7EB", fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: "#E5E7EB", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30, 41, 59, 0.95)",
                  borderColor: "#475569",
                  borderRadius: "0.75rem",
                  color: "#E5E7EB",
                }}
              />
              <Bar dataKey="riskScore" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Compliance Standards Overview */}
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Applicable Compliance Standards</CardTitle>
          <CardDescription className="text-slate-400">
            Standards relevant to your industry with coverage analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applicableStandards.map((standard) => {
              const avgCoverage =
                complianceData.reduce((sum, vendor) => {
                  const standardCoverage = vendor.coverageByStandard.find((s) => s.standardId === standard.id)
                  return sum + (standardCoverage?.coverage || 0)
                }, 0) / complianceData.length

              const isCritical = industryBenchmarks.criticalStandards.includes(standard.name)

              return (
                <div key={standard.id} className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{standard.name}</h4>
                    {isCritical && (
                      <Badge variant="destructive" className="text-xs">
                        CRITICAL
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{standard.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Avg Coverage:</span>
                      <span className="text-white">{Math.round(avgCoverage)}%</span>
                    </div>
                    <Progress value={avgCoverage} className="h-2" />
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Audit Frequency:</span>
                      <span className="text-white capitalize">{standard.auditFrequency}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Compliance Actions</h3>
              <p className="text-slate-400">Take action on compliance findings and risk assessments</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Risk Assessment
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ComplianceOverview
