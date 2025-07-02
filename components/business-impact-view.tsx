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
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { TrendingUp, Users, Shield, Target } from "lucide-react"

interface BusinessImpactViewProps {
  results: any[]
  config: any
}

// Safe number helper function
const safeNumber = (value: any, fallback = 0): number => {
  if (typeof value === "number" && !isNaN(value) && isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value)
    return !isNaN(parsed) && isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

export default function BusinessImpactView({ results, config }: BusinessImpactViewProps) {
  if (!results || results.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>No business impact data available</p>
        </CardContent>
      </Card>
    )
  }

  const formatCurrency = (value: number) => {
    const safeValue = safeNumber(value, 0)
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(safeValue)
  }

  const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

  // Calculate business metrics with safe numbers
  const totalFTESaved = results.reduce((sum, r) => sum + safeNumber(r.ops?.fteSaved, 0), 0)
  const totalAnnualSavings = results.reduce((sum, r) => sum + safeNumber(r.roi?.annualSavings, 0), 0)
  const averageRiskReduction =
    results.reduce((sum, r) => sum + safeNumber(r.risk?.breachReduction, 0), 0) / Math.max(results.length, 1)

  // Prepare business value data
  const businessValueData = results.map((result) => ({
    vendor: result.vendorName,
    fteSaved: safeNumber(result.ops?.fteSaved, 0),
    annualSavings: safeNumber(result.roi?.annualSavings, 0),
    riskReduction: safeNumber(result.risk?.breachReduction, 0) * 100,
    roi: safeNumber(result.roi?.percentage, 0),
  }))

  // Prepare radar chart data for business capabilities
  const radarData = [
    {
      capability: "Cost Efficiency",
      ...results.reduce(
        (acc, result) => {
          const roiValue = safeNumber(result.roi?.percentage, 0)
          acc[result.vendorName] = Math.min(100, Math.max(0, roiValue + 50))
          return acc
        },
        {} as Record<string, number>,
      ),
    },
    {
      capability: "Risk Reduction",
      ...results.reduce(
        (acc, result) => {
          acc[result.vendorName] = safeNumber(result.risk?.breachReduction, 0) * 100
          return acc
        },
        {} as Record<string, number>,
      ),
    },
    {
      capability: "Operational Efficiency",
      ...results.reduce(
        (acc, result) => {
          acc[result.vendorName] = Math.min(100, safeNumber(result.ops?.fteSaved, 0) * 20)
          return acc
        },
        {} as Record<string, number>,
      ),
    },
    {
      capability: "Implementation Speed",
      ...results.reduce(
        (acc, result) => {
          const months = safeNumber(result.roi?.paybackMonths, 12)
          acc[result.vendorName] = Math.max(0, Math.min(100, 100 - months * 5))
          return acc
        },
        {} as Record<string, number>,
      ),
    },
    {
      capability: "Scalability",
      ...results.reduce(
        (acc, result) => {
          acc[result.vendorName] = result.vendor === "portnox" ? 95 : 70
          return acc
        },
        {} as Record<string, number>,
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Business Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">FTE Savings</p>
                <p className="text-2xl font-bold">{totalFTESaved.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Annual Savings</p>
                <p className="text-2xl font-bold">{formatCurrency(totalAnnualSavings)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Risk Reduction</p>
                <p className="text-2xl font-bold">{Math.round(averageRiskReduction * 100)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Business Value</p>
                <p className="text-2xl font-bold">High</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Value Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Operational Efficiency Gains</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={businessValueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="fteSaved" fill="#00D4AA" name="FTE Saved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Capability Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ROI Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>ROI Timeline Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={Array.from({ length: 36 }, (_, i) => ({
                month: i + 1,
                ...results.reduce(
                  (acc, result) => {
                    const roiPercentage = safeNumber(result.roi?.percentage, 0)
                    const monthlyROI = (roiPercentage / 36) * (i + 1)
                    acc[result.vendorName] = safeNumber(monthlyROI, 0)
                    return acc
                  },
                  {} as Record<string, number>,
                ),
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${safeNumber(value, 0).toFixed(1)}%`, "ROI"]} />
              {results.map((result, index) => (
                <Line
                  key={result.vendorName}
                  type="monotone"
                  dataKey={result.vendorName}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Business Impact Details */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Business Impact Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {results.map((result, index) => {
              const roiPercentage = safeNumber(result.roi?.percentage, 0)
              const fteSaved = safeNumber(result.ops?.fteSaved, 0)
              const annualOpsSaving = safeNumber(result.ops?.annualOpsSaving, 0)
              const breachReduction = safeNumber(result.risk?.breachReduction, 0)
              const paybackMonths = safeNumber(result.roi?.paybackMonths, 0)
              const businessValueScore = Math.min(100, Math.max(0, roiPercentage + 50))

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
                    <Badge variant="outline">
                      {roiPercentage > 50 ? "High Impact" : roiPercentage > 20 ? "Medium Impact" : "Low Impact"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Operational Savings</p>
                      <p className="text-xl font-semibold">{formatCurrency(annualOpsSaving)}/year</p>
                      <p className="text-xs text-muted-foreground">{fteSaved.toFixed(1)} FTE saved</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Mitigation</p>
                      <p className="text-xl font-semibold">{Math.round(breachReduction * 100)}%</p>
                      <p className="text-xs text-muted-foreground">Breach risk reduction</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Payback Period</p>
                      <p className="text-xl font-semibold">{paybackMonths > 0 ? `${paybackMonths} months` : "N/A"}</p>
                      <p className="text-xs text-muted-foreground">Time to break even</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Business Value Score</p>
                    <Progress value={businessValueScore} className="h-2" />
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
