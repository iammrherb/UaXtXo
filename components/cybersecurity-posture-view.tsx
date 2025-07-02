"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Shield, AlertTriangle, CheckCircle, Lock } from "lucide-react"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"

interface CybersecurityPostureViewProps {
  results: any[]
  config: any
}

// Safe number helper function
const safeNumber = (value: any, fallback = 0): number => {
  if (typeof value === "number" && !isNaN(value) && isFinite(value)) {
    return value
  }
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value)
    if (!isNaN(parsed) && isFinite(parsed)) {
      return parsed
    }
  }
  return fallback
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

    const features = vendor.featureSupport

    // Authentication capabilities (30%)
    const authFeatures = Object.values(features.authentication || {})
    const authScore =
      authFeatures.length > 0 ? (authFeatures.filter((f) => f === "✓✓✓").length / authFeatures.length) * 30 : 0

    // Advanced features (40%)
    const advancedFeatures = Object.values(features.advanced || {})
    const advancedScore =
      advancedFeatures.length > 0
        ? (advancedFeatures.filter((f) => f === "✓✓✓").length / advancedFeatures.length) * 40
        : 0

    // Compliance (30%)
    const complianceFeatures = Object.values(features.compliance || {})
    const complianceScore =
      complianceFeatures.length > 0
        ? (complianceFeatures.filter((f) => f === "✓✓✓").length / complianceFeatures.length) * 30
        : 0

    return Math.round(safeNumber(authScore + advancedScore + complianceScore))
  }

  // Prepare security assessment data
  const securityData = results.map((result) => {
    const vendor = ComprehensiveVendorDatabase[result.vendor]
    const riskReduction = safeNumber((result.risk?.breachReduction || 0) * 100)
    const complianceScore = vendor
      ? safeNumber(Object.values(vendor.featureSupport?.compliance || {}).filter((f) => f === "✓✓✓").length * 10)
      : 0

    let zeroTrust = 0
    if (vendor?.featureSupport?.advanced?.["Zero Trust"]) {
      const ztValue = vendor.featureSupport.advanced["Zero Trust"]
      zeroTrust = ztValue === "✓✓✓" ? 100 : ztValue === "✓✓" ? 75 : ztValue === "✓" ? 50 : 0
    }

    return {
      vendor: result.vendorName || "Unknown",
      securityScore: getSecurityScore(result.vendor),
      riskReduction,
      complianceScore,
      zeroTrust,
    }
  })

  // Prepare radar chart data for security capabilities
  const radarData = [
    {
      capability: "Authentication",
      ...results.reduce(
        (acc, result) => {
          const vendor = ComprehensiveVendorDatabase[result.vendor]
          if (vendor && vendor.featureSupport?.authentication) {
            const authFeatures = Object.values(vendor.featureSupport.authentication)
            acc[result.vendorName] =
              authFeatures.length > 0
                ? safeNumber((authFeatures.filter((f) => f === "✓✓✓").length / authFeatures.length) * 100)
                : 0
          } else {
            acc[result.vendorName] = 0
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
          if (vendor && vendor.featureSupport?.network) {
            const networkFeatures = Object.values(vendor.featureSupport.network)
            acc[result.vendorName] =
              networkFeatures.length > 0
                ? safeNumber((networkFeatures.filter((f) => f === "✓✓✓").length / networkFeatures.length) * 100)
                : 0
          } else {
            acc[result.vendorName] = 0
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
          if (vendor && vendor.featureSupport?.advanced) {
            const advancedFeatures = Object.values(vendor.featureSupport.advanced)
            acc[result.vendorName] =
              advancedFeatures.length > 0
                ? safeNumber((advancedFeatures.filter((f) => f === "✓✓✓").length / advancedFeatures.length) * 100)
                : 0
          } else {
            acc[result.vendorName] = 0
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
          if (vendor && vendor.featureSupport?.compliance) {
            const complianceFeatures = Object.values(vendor.featureSupport.compliance)
            acc[result.vendorName] =
              complianceFeatures.length > 0
                ? safeNumber((complianceFeatures.filter((f) => f === "✓✓✓").length / complianceFeatures.length) * 100)
                : 0
          } else {
            acc[result.vendorName] = 0
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
          if (vendor && vendor.featureSupport?.advanced?.["Zero Trust"]) {
            const ztValue = vendor.featureSupport.advanced["Zero Trust"]
            const ztScore = ztValue === "✓✓✓" ? 100 : ztValue === "✓✓" ? 75 : ztValue === "✓" ? 50 : 0
            acc[result.vendorName] = safeNumber(ztScore)
          } else {
            acc[result.vendorName] = 0
          }
          return acc
        },
        {} as Record<string, number>,
      ),
    },
  ]

  // Risk distribution data
  const riskData = [
    {
      name: "Low Risk",
      value: securityData.filter((d) => safeNumber(d.riskReduction) > 60).length,
      color: "#00D4AA",
    },
    {
      name: "Medium Risk",
      value: securityData.filter((d) => {
        const risk = safeNumber(d.riskReduction)
        return risk > 30 && risk <= 60
      }).length,
      color: "#F97316",
    },
    {
      name: "High Risk",
      value: securityData.filter((d) => safeNumber(d.riskReduction) <= 30).length,
      color: "#EF4444",
    },
  ]

  const averageSecurityScore =
    securityData.length > 0
      ? safeNumber(securityData.reduce((sum, d) => sum + safeNumber(d.securityScore), 0) / securityData.length)
      : 0
  const averageRiskReduction =
    securityData.length > 0
      ? safeNumber(securityData.reduce((sum, d) => sum + safeNumber(d.riskReduction), 0) / securityData.length)
      : 0

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
                <p className="text-2xl font-bold">
                  {securityData.filter((d) => safeNumber(d.complianceScore) > 50).length}
                </p>
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
                <p className="text-2xl font-bold">{securityData.filter((d) => safeNumber(d.zeroTrust) > 75).length}</p>
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
                <Tooltip formatter={(value) => [safeNumber(value), "Security Score"]} />
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
                  label={({ name, value }) => `${name}: ${safeNumber(value)}`}
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [safeNumber(value), "Count"]} />
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
                />
              ))}
              <Tooltip formatter={(value) => [safeNumber(value), "Score"]} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Security Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Security Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityData.map((data, index) => (
              <div key={data.vendor} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{data.vendor}</h3>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">{safeNumber(data.securityScore)}/100</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Risk Reduction</p>
                    <p className="font-medium">{Math.round(safeNumber(data.riskReduction))}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Compliance Score</p>
                    <p className="font-medium">{safeNumber(data.complianceScore)}/100</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Zero Trust Readiness</p>
                    <p className="font-medium">{safeNumber(data.zeroTrust)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
