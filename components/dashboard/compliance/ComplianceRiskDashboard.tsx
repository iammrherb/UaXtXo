"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComplianceOverview } from "@/components/charts/dashboards/ComplianceOverview"
import { ExecutiveSummary } from "@/components/charts/dashboards/ExecutiveSummary"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Shield, AlertTriangle, TrendingUp, Download, Settings, BarChart3, PieChart } from "lucide-react"
import { useComplianceData } from "@/hooks/useComplianceData"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"

export function ComplianceRiskDashboard() {
  const { applicableStandards, riskAssessments, complianceMetrics, selectedVendorData, isLoading, hasData } =
    useComplianceData()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 bg-muted animate-pulse rounded" />
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!hasData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Compliance Risk Dashboard</CardTitle>
          <CardDescription>Select vendors to view compliance risk assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No compliance data available. Please select vendors to analyze.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical":
        return "text-red-600"
      case "high":
        return "text-orange-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Compliance Risk Dashboard
          </h1>
          <p className="text-muted-foreground">Comprehensive vendor compliance and risk assessment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendors Assessed</CardTitle>
              <Shield className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{selectedVendorData.length}</div>
              <p className="text-xs text-muted-foreground">{applicableStandards.length} standards applied</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Risk Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${getRiskColor(complianceMetrics.averageRiskScore >= 80 ? "critical" : complianceMetrics.averageRiskScore >= 60 ? "high" : complianceMetrics.averageRiskScore >= 40 ? "medium" : "low")}`}
              >
                {complianceMetrics.averageRiskScore}/100
              </div>
              <Progress value={complianceMetrics.averageRiskScore} className="mt-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{complianceMetrics.criticalGaps}</div>
              <p className="text-xs text-muted-foreground">of {complianceMetrics.totalGaps} total gaps</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Financial Risk</CardTitle>
              <FileText className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(complianceMetrics.totalCostRisk)}</div>
              <p className="text-xs text-muted-foreground">Potential compliance costs</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="executive" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Executive Summary
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Detailed Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <ComplianceOverview />
          </TabsContent>

          <TabsContent value="executive" className="space-y-4">
            <ExecutiveSummary />
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            {/* Detailed Vendor Analysis */}
            <div className="grid gap-6">
              {Object.entries(riskAssessments).map(([vendorId, assessment], index) => {
                const vendor = selectedVendorData.find((v) => v.id === vendorId)
                if (!vendor) return null

                return (
                  <motion.div
                    key={vendorId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {vendor.name}
                              <Badge variant={getRiskBadgeVariant(assessment.riskLevel)}>
                                {assessment.riskLevel.toUpperCase()}
                              </Badge>
                            </CardTitle>
                            <CardDescription>
                              {vendor.category} • Risk Score: {assessment.overallRiskScore}/100
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${getRiskColor(assessment.riskLevel)}`}>
                              {assessment.overallRiskScore}
                            </div>
                            <div className="text-sm text-muted-foreground">{assessment.complianceGaps.length} gaps</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Risk Progress */}
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Risk Level</span>
                              <span>{assessment.overallRiskScore}/100</span>
                            </div>
                            <Progress value={assessment.overallRiskScore} />
                          </div>

                          {/* Top Compliance Gaps */}
                          {assessment.complianceGaps.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2">Top Compliance Gaps</h4>
                              <div className="space-y-2">
                                {assessment.complianceGaps.slice(0, 3).map((gap, gapIndex) => (
                                  <div key={gapIndex} className="flex items-center justify-between text-sm">
                                    <span className="flex-1">{gap.requirementName}</span>
                                    <Badge variant={getRiskBadgeVariant(gap.gapSeverity)} className="ml-2">
                                      {gap.gapSeverity}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Cost Impact */}
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Potential Fines:</span>
                              <div className="font-medium">{formatCurrency(assessment.costOfNonCompliance.fines)}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Total Risk:</span>
                              <div className="font-medium">{formatCurrency(assessment.costOfNonCompliance.total)}</div>
                            </div>
                          </div>

                          {/* Top Recommendations */}
                          {assessment.recommendations.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2">Priority Actions</h4>
                              <ul className="space-y-1 text-sm">
                                {assessment.recommendations
                                  .filter((rec) => rec.priority === "critical" || rec.priority === "high")
                                  .slice(0, 2)
                                  .map((rec, recIndex) => (
                                    <li key={recIndex} className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                                      <span>{rec.action}</span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

export default ComplianceRiskDashboard
