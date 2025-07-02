"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Shield, AlertTriangle, CheckCircle, Lock } from "lucide-react"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"

interface CybersecurityPostureViewProps {
  results: any[]
  config: any
}

export default function CybersecurityPostureView({ results, config }: CybersecurityPostureViewProps) {
  if (!results || results.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>No security data available</p>
        </CardContent>
      </Card>
    )
  }

  const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

  // Calculate security scores
  const getSecurityScore = (vendorId: string) => {
    const vendor = ComprehensiveVendorDatabase[vendorId]
    if (!vendor) return 0

    const score = 0
    const features = vendor.featureSupport

    // Authentication capabilities (30%)
    const authFeatures = Object.values(features.authentication)
    const authScore = (authFeatures.filter((f) => f === "✓✓✓").length / authFeatures.length) * 30

    // Advanced features (40%)
    const advancedFeatures = Object.values(features.advanced)
    const advancedScore = (advancedFeatures.filter((f) => f === "✓✓✓").length / advancedFeatures.length) * 40

    // Compliance (30%)
    const complianceFeatures = Object.values(features.compliance)
    const complianceScore = (complianceFeatures.filter((f) => f === "✓✓✓").length / complianceFeatures.length) * 30

    return Math.round(authScore + advancedScore + complianceScore)
  }

  // Prepare security assessment data
  const securityData = results.map((result) => {
    const vendor = ComprehensiveVendorDatabase[result.vendor]
    return {
      vendor: result.vendorName,
      securityScore: getSecurityScore(result.vendor),
      riskReduction: (result.risk?.breachReduction || 0) * 100,
      complianceScore: vendor
        ? Object.values(vendor.featureSupport.compliance).filter((f) => f === "✓✓✓").length * 10
        : 0,
      zeroTrust:
        vendor?.featureSupport.advanced["Zero Trust"] === "✓✓✓"
          ? 100
          : vendor?.featureSupport.advanced["Zero Trust"] === "✓✓"
            ? 75
            : vendor?.featureSupport.advanced["Zero Trust"] === "✓"
              ? 50
              : 0,
    }
  })

  // Prepare radar chart data for security capabilities
  const radarData = [
    {
      capability: "Authentication",
      ...results.reduce(
        (acc, result) => {
          const vendor = ComprehensiveVendorDatabase[result.vendor]
          if (vendor) {
            const authFeatures = Object.values(vendor.featureSupport.authentication)
            acc[result.vendorName] = (authFeatures.filter((f) => f === "✓✓✓").length / authFeatures.length) * 100
          }
          return acc
        },
        {} as Record<string, number>,
      ),
    },
    {
      capability: "Network Security",
      ...results.reduce(
        (acc, result) => {
          const vendor = ComprehensiveVendorDatabase[result.vendor]
          if (vendor) {
            const networkFeatures = Object.values(vendor.featureSupport.network)
            acc[result.vendorName] = (networkFeatures.filter((f) => f === "✓✓✓").length / networkFeatures.length) * 100
          }
          return acc
        },
        {} as Record<string, number>,
      ),
    },
    {
      capability: "Advanced Security",
      ...results.reduce(
        (acc, result) => {
          const vendor = ComprehensiveVendorDatabase[result.vendor]
          if (vendor) {
            const advancedFeatures = Object.values(vendor.featureSupport.advanced)
            acc[result.vendorName] =
              (advancedFeatures.filter((f) => f === "✓✓✓").length / advancedFeatures.length) * 100
          }
          return acc
        },
        {} as Record<string, number>,
      ),
    },
    {
      capability: "Compliance",
      ...results.reduce(
        (acc, result) => {
          const vendor = ComprehensiveVendorDatabase[result.vendor]
          if (vendor) {
            const complianceFeatures = Object.values(vendor.featureSupport.compliance)
            acc[result.vendorName] =
              (complianceFeatures.filter((f) => f === "✓✓✓").length / complianceFeatures.length) * 100
          }
          return acc
        },
        {} as Record<string, number>,
      ),
    },
    {
      capability: "Zero Trust",
      ...results.reduce(
        (acc, result) => {
          const vendor = ComprehensiveVendorDatabase[result.vendor]
          if (vendor) {
            const ztScore =
              vendor.featureSupport.advanced["Zero Trust"] === "✓✓✓"
                ? 100
                : vendor.featureSupport.advanced["Zero Trust"] === "✓✓"
                  ? 75
                  : vendor.featureSupport.advanced["Zero Trust"] === "✓"
                    ? 50
                    : 0
            acc[result.vendorName] = ztScore
          }
          return acc
        },
        {} as Record<string, number>,
      ),
    },
  ]

  // Risk distribution data
  const riskData = [
    { name: "Low Risk", value: securityData.filter((d) => d.riskReduction > 60).length, color: "#00D4AA" },
    {
      name: "Medium Risk",
      value: securityData.filter((d) => d.riskReduction > 30 && d.riskReduction <= 60).length,
      color: "#F97316",
    },
    { name: "High Risk", value: securityData.filter((d) => d.riskReduction <= 30).length, color: "#EF4444" },
  ]

  const averageSecurityScore = securityData.reduce((sum, d) => sum + d.securityScore, 0) / securityData.length
  const averageRiskReduction = securityData.reduce((sum, d) => sum + d.riskReduction, 0) / securityData.length

  return (
    <div className="space-y-6">
      {/* Security Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Avg Security Score</p>
                <p className="text-2xl font-bold">{Math.round(averageSecurityScore)}/100</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Risk Reduction</p>
                <p className="text-2xl font-bold">{Math.round(averageRiskReduction)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Compliance Ready</p>
                <p className="text-2xl font-bold">{securityData.filter((d) => d.complianceScore > 50).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Zero Trust Ready</p>
                <p className="text-2xl font-bold">{securityData.filter((d) => d.zeroTrust > 75).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Score Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={securityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="securityScore" fill="#00D4AA" name="Security Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Security Capabilities Radar */}
      <Card>
        <CardHeader>
          <CardTitle>Security Capabilities Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="capability" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              {results.map((result, index) => (
                <Radar
                  key={result.vendorName}
                  name={result.vendorName}
                  dataKey={result.vendorName}
                  stroke={COLORS[index % COLORS.length]}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              ))}
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Security Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Security Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {results.map((result, index) => {
              const vendor = ComprehensiveVendorDatabase[result.vendor]
              if (!vendor) return null

              return (
                <div key={result.vendor} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <h3 className="font-semibold text-lg">{result.vendorName}</h3>
                    </div>
                    <Badge variant={getSecurityScore(result.vendor) > 70 ? "default" : "secondary"}>
                      Security Score: {getSecurityScore(result.vendor)}/100
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Authentication</p>
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={
                            (Object.values(vendor.featureSupport.authentication).filter((f) => f === "✓✓✓").length /
                              Object.values(vendor.featureSupport.authentication).length) *
                            100
                          }
                          className="h-2 flex-1"
                        />
                        <span className="text-xs">
                          {Object.values(vendor.featureSupport.authentication).filter((f) => f === "✓✓✓").length}/
                          {Object.values(vendor.featureSupport.authentication).length}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Network Security</p>
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={
                            (Object.values(vendor.featureSupport.network).filter((f) => f === "✓✓✓").length /
                              Object.values(vendor.featureSupport.network).length) *
                            100
                          }
                          className="h-2 flex-1"
                        />
                        <span className="text-xs">
                          {Object.values(vendor.featureSupport.network).filter((f) => f === "✓✓✓").length}/
                          {Object.values(vendor.featureSupport.network).length}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Advanced Features</p>
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={
                            (Object.values(vendor.featureSupport.advanced).filter((f) => f === "✓✓✓").length /
                              Object.values(vendor.featureSupport.advanced).length) *
                            100
                          }
                          className="h-2 flex-1"
                        />
                        <span className="text-xs">
                          {Object.values(vendor.featureSupport.advanced).filter((f) => f === "✓✓✓").length}/
                          {Object.values(vendor.featureSupport.advanced).length}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Compliance</p>
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={
                            (Object.values(vendor.featureSupport.compliance).filter((f) => f === "✓✓✓").length /
                              Object.values(vendor.featureSupport.compliance).length) *
                            100
                          }
                          className="h-2 flex-1"
                        />
                        <span className="text-xs">
                          {Object.values(vendor.featureSupport.compliance).filter((f) => f === "✓✓✓").length}/
                          {Object.values(vendor.featureSupport.compliance).length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Reduction</p>
                      <p className="text-xl font-semibold">{Math.round((result.risk?.breachReduction || 0) * 100)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Zero Trust Readiness</p>
                      <p className="text-xl font-semibold">
                        {vendor.featureSupport.advanced["Zero Trust"] === "✓✓✓"
                          ? "Excellent"
                          : vendor.featureSupport.advanced["Zero Trust"] === "✓✓"
                            ? "Good"
                            : vendor.featureSupport.advanced["Zero Trust"] === "✓"
                              ? "Basic"
                              : "None"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">AI/ML Capabilities</p>
                      <p className="text-xl font-semibold">
                        {vendor.featureSupport.advanced["AI/ML"] === "✓✓✓"
                          ? "Advanced"
                          : vendor.featureSupport.advanced["AI/ML"] === "✓✓"
                            ? "Moderate"
                            : vendor.featureSupport.advanced["AI/ML"] === "✓"
                              ? "Basic"
                              : "None"}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
