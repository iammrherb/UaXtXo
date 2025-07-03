"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Shield, TrendingUp, DollarSign, CheckCircle, XCircle } from "lucide-react"
import { useComplianceData } from "@/hooks/useComplianceData"
import { formatCurrency } from "@/lib/utils"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export function ComplianceOverview() {
  const { complianceMetrics, riskAssessments, selectedVendorData, isLoading, error } = useComplianceData()

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 w-24 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>Error loading compliance data: {error}</AlertDescription>
      </Alert>
    )
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-600"
    if (score >= 60) return "text-orange-600"
    if (score >= 40) return "text-yellow-600"
    return "text-green-600"
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

  // Risk distribution data for pie chart
  const riskDistribution = Object.values(riskAssessments).reduce(
    (acc, assessment) => {
      const level = assessment.riskLevel
      acc[level] = (acc[level] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const pieData = Object.entries(riskDistribution).map(([level, count]) => ({
    name: level.charAt(0).toUpperCase() + level.slice(1),
    value: count,
    color: level === "critical" ? "#ef4444" : level === "high" ? "#f97316" : level === "medium" ? "#eab308" : "#22c55e",
  }))

  // Compliance score data for bar chart
  const complianceScoreData = selectedVendorData.map((vendor) => {
    const assessment = riskAssessments[vendor.id]
    return {
      name: vendor.name.length > 10 ? vendor.name.substring(0, 10) + "..." : vendor.name,
      score: assessment ? 100 - assessment.overallRiskScore : 0,
      riskScore: assessment?.overallRiskScore || 0,
    }
  })

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Risk Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getRiskColor(complianceMetrics.averageRiskScore)}`}>
              {complianceMetrics.averageRiskScore}/100
            </div>
            <Progress value={complianceMetrics.averageRiskScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Compliance Gaps</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceMetrics.totalGaps}</div>
            <p className="text-xs text-muted-foreground">{complianceMetrics.criticalGaps} critical gaps</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Vendors</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceMetrics.highRiskVendors}</div>
            <p className="text-xs text-muted-foreground">of {selectedVendorData.length} vendors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Cost Risk</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(complianceMetrics.totalCostRisk)}</div>
            <p className="text-xs text-muted-foreground">Potential non-compliance costs</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Risk Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Level Distribution</CardTitle>
            <CardDescription>Distribution of vendors by risk level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Scores Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Vendor Compliance Scores</CardTitle>
            <CardDescription>Compliance scores by vendor (higher is better)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={complianceScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#22c55e" name="Compliance Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Risk Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Risk Assessment</CardTitle>
          <CardDescription>Individual risk scores and compliance status for each vendor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(riskAssessments).map(([vendorId, assessment]) => {
              const vendor = selectedVendorData.find((v) => v.id === vendorId)
              if (!vendor) return null

              return (
                <div key={vendorId} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {assessment.riskLevel === "low" ? (
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      ) : (
                        <XCircle className="h-8 w-8 text-red-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{vendor.name}</h4>
                      <p className="text-sm text-muted-foreground">{vendor.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className={`text-lg font-semibold ${getRiskColor(assessment.overallRiskScore)}`}>
                        {assessment.overallRiskScore}/100
                      </div>
                      <div className="text-sm text-muted-foreground">{assessment.complianceGaps.length} gaps</div>
                    </div>

                    <Badge variant={getRiskBadgeVariant(assessment.riskLevel)}>
                      {assessment.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Critical Gaps Summary */}
      {complianceMetrics.criticalGaps > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>{complianceMetrics.criticalGaps} critical compliance gaps</strong> require immediate attention.
            These gaps pose significant regulatory and business risks.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default ComplianceOverview
