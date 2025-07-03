"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useDashboardContext } from "@/context/DashboardContext"
import { useVendorData } from "@/hooks/useVendorData"
import { useComplianceData } from "@/hooks/useComplianceData"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Shield, AlertTriangle, TrendingUp, ContrastIcon as Compare, BarChart3 } from "lucide-react"
import { RiskAssessmentChart } from "@/components/charts/compliance/RiskAssessmentChart"
import { VendorRiskComparison } from "@/components/charts/compliance/VendorRiskComparison"
import { ComplianceOverview } from "@/components/charts/dashboards/ComplianceOverview"
import { ExportDialog } from "@/components/export/ExportDialog"
import { QuickExportButtons } from "@/components/export/QuickExportButtons"
import type { NewVendorData } from "@/lib/vendors/data"

const ComplianceRiskDashboard: React.FC = () => {
  const { selectedVendors, selectedOrgSize, selectedIndustry } = useDashboardContext()
  const { getAllVendorIds, getVendor, isLoadingAllVendors } = useVendorData()
  const { isLoadingStandards, errorStandards, vendorRiskAssessments, applicableStandards } = useComplianceData()
  const [selectedVendorsForComparison, setSelectedVendorsForComparison] = useState<string[]>(
    selectedVendors.slice(0, 3),
  )

  const vendors = useMemo(() => {
    if (isLoadingAllVendors) return []
    return getAllVendorIds()
      .map((id) => getVendor(id))
      .filter(Boolean) as NewVendorData[]
  }, [getAllVendorIds, getVendor, isLoadingAllVendors])

  const vendorNames = useMemo(() => {
    const names: Record<string, string> = {}
    vendors.forEach((vendor) => {
      names[vendor.id] = vendor.name
    })
    return names
  }, [vendors])

  const exportData = useMemo(
    () => ({
      vendors,
      riskAssessments: vendorRiskAssessments,
      industry: selectedIndustry,
      orgSize: selectedOrgSize,
      generatedAt: new Date().toISOString(),
      selectedVendors: selectedVendorsForComparison,
    }),
    [vendors, vendorRiskAssessments, selectedIndustry, selectedOrgSize, selectedVendorsForComparison],
  )

  const overallStats = useMemo(() => {
    const assessments = Object.values(vendorRiskAssessments)
    if (assessments.length === 0) return null

    const avgRiskScore = assessments.reduce((sum, a) => sum + a.overallRiskScore, 0) / assessments.length
    const totalGaps = assessments.reduce((sum, a) => sum + a.complianceGaps.length, 0)
    const avgCostRisk = assessments.reduce((sum, a) => sum + a.costOfNonCompliance.total, 0) / assessments.length
    const highRiskVendors = assessments.filter((a) => a.riskLevel === "high" || a.riskLevel === "critical").length

    return {
      avgRiskScore: Math.round(avgRiskScore),
      totalGaps,
      avgCostRisk: Math.round(avgCostRisk / 1000),
      highRiskVendors,
      totalVendors: assessments.length,
    }
  }, [vendorRiskAssessments])

  if (isLoadingAllVendors || isLoadingStandards) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    )
  }

  if (errorStandards) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load compliance data.</AlertDescription>
      </Alert>
    )
  }

  const hasData = selectedVendors.length > 0 && Object.keys(vendorRiskAssessments).length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 mb-4">
            Compliance Risk Assessment
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Comprehensive risk analysis and vendor comparison for {selectedIndustry.replace("_", " ")} industry
            compliance requirements.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <QuickExportButtons data={exportData} />
          <ExportDialog data={exportData} />
        </div>
      </div>

      {/* Overview Stats */}
      {overallStats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">{overallStats.totalVendors}</div>
              <div className="text-xs text-slate-400">Vendors Analyzed</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">{overallStats.avgRiskScore}</div>
              <div className="text-xs text-slate-400">Avg Risk Score</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">{overallStats.totalGaps}</div>
              <div className="text-xs text-slate-400">Total Gaps</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">${overallStats.avgCostRisk}K</div>
              <div className="text-xs text-slate-400">Avg Cost Risk</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-500 mb-1">{overallStats.highRiskVendors}</div>
              <div className="text-xs text-slate-400">High Risk</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700">
            <Shield className="w-4 h-4 mr-2" />
            Risk Overview
          </TabsTrigger>
          <TabsTrigger value="comparison" className="data-[state=active]:bg-slate-700">
            <Compare className="w-4 h-4 mr-2" />
            Vendor Comparison
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-slate-700">
            <TrendingUp className="w-4 h-4 mr-2" />
            Risk Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Overview */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">Compliance Overview</CardTitle>
                <CardDescription>Summary of compliance posture for selected vendors.</CardDescription>
              </CardHeader>
              <CardContent>
                {hasData ? (
                  <ComplianceOverview
                    riskAssessments={vendorRiskAssessments}
                    applicableStandards={applicableStandards}
                    selectedVendors={selectedVendors}
                  />
                ) : (
                  <p className="text-muted-foreground">Select vendors to see compliance overview.</p>
                )}
              </CardContent>
            </Card>

            {/* Risk Assessment Chart */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Risk Assessment Overview
                </CardTitle>
                <CardDescription>Overall risk distribution across all vendors</CardDescription>
              </CardHeader>
              <CardContent>
                {hasData ? (
                  <RiskAssessmentChart riskData={vendorRiskAssessments} />
                ) : (
                  <p className="text-muted-foreground">Select vendors to see risk scores.</p>
                )}
              </CardContent>
            </Card>

            {/* Compliance Standards */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  Applicable Standards
                </CardTitle>
                <CardDescription>
                  Compliance standards for {selectedIndustry.replace("_", " ")} industry
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {applicableStandards.map((standard) => (
                  <div key={standard.id} className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{standard.name}</h4>
                      <Badge variant={standard.certificationRequired ? "destructive" : "secondary"}>
                        {standard.certificationRequired ? "Required" : "Optional"}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-300 mb-2">{standard.description}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>Audit: {standard.auditFrequency}</span>
                      <span>•</span>
                      <span>
                        Penalties: ${standard.penaltyRange.min.toLocaleString()} - $
                        {standard.penaltyRange.max.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Critical Risks Alert */}
          {overallStats && overallStats.highRiskVendors > 0 && (
            <Alert className="bg-red-900/20 border-red-700/50 mt-6">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
                <strong>{overallStats.highRiskVendors}</strong> vendor(s) have been identified as high or critical risk.
                Immediate attention is recommended to address compliance gaps and reduce potential exposure.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Compare className="w-5 h-5 text-purple-400" />
                Vendor Risk Comparison
              </CardTitle>
              <CardDescription>Side-by-side comparison of vendor compliance risks</CardDescription>
            </CardHeader>
            <CardContent>
              {hasData ? (
                <VendorRiskComparison
                  riskData={vendorRiskAssessments}
                  selectedVendors={selectedVendorsForComparison}
                  onVendorSelectionChange={setSelectedVendorsForComparison}
                />
              ) : (
                <p className="text-muted-foreground">Select vendors to see risk comparison.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Industry Trends */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Industry Risk Trends
                </CardTitle>
                <CardDescription>Risk patterns in {selectedIndustry.replace("_", " ")} industry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Common Risk Factors</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Data breach exposure and unauthorized access</li>
                      <li>• Regulatory compliance gaps and audit failures</li>
                      <li>• Operational disruption and business continuity risks</li>
                      <li>• Reputational damage from security incidents</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Emerging Threats</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Cloud security misconfigurations</li>
                      <li>• Supply chain vulnerabilities</li>
                      <li>• AI/ML model security risks</li>
                      <li>• Remote work security challenges</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mitigation Strategies */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Risk Mitigation Strategies
                </CardTitle>
                <CardDescription>Recommended approaches to reduce compliance risks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Immediate Actions</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Conduct comprehensive risk assessments</li>
                      <li>• Implement multi-factor authentication</li>
                      <li>• Establish incident response procedures</li>
                      <li>• Regular security awareness training</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Long-term Strategies</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Zero-trust architecture implementation</li>
                      <li>• Continuous compliance monitoring</li>
                      <li>• Vendor risk management programs</li>
                      <li>• Regular penetration testing</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

export default ComplianceRiskDashboard
