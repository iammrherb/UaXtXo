"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Clock, Zap, Users, CheckCircle2, AlertTriangle } from "lucide-react"
import type { CalculationResult } from "@/lib/enhanced-tco-calculator"

interface ImplementationTimelineVisualProps {
  results: CalculationResult[]
}

export default function ImplementationTimelineVisual({ results }: ImplementationTimelineVisualProps) {
  const implementationData = useMemo(() => {
    // Mock implementation phases and timelines based on vendor complexity
    const vendorTimelines: Record<
      string,
      {
        planning: number
        procurement: number
        installation: number
        configuration: number
        testing: number
        deployment: number
        training: number
        total: number
        complexity: "low" | "medium" | "high" | "critical"
        resourcesRequired: number
      }
    > = {
      portnox: {
        planning: 0.5,
        procurement: 0,
        installation: 0,
        configuration: 0.5,
        testing: 1,
        deployment: 0.5,
        training: 0.5,
        total: 3,
        complexity: "low",
        resourcesRequired: 1,
      },
      cisco: {
        planning: 14,
        procurement: 21,
        installation: 7,
        configuration: 21,
        testing: 14,
        deployment: 7,
        training: 14,
        total: 98,
        complexity: "critical",
        resourcesRequired: 8,
      },
      aruba: {
        planning: 7,
        procurement: 14,
        installation: 7,
        configuration: 14,
        testing: 7,
        deployment: 7,
        training: 7,
        total: 63,
        complexity: "high",
        resourcesRequired: 5,
      },
      forescout: {
        planning: 10,
        procurement: 14,
        installation: 7,
        configuration: 21,
        testing: 10,
        deployment: 7,
        training: 10,
        total: 79,
        complexity: "high",
        resourcesRequired: 6,
      },
      juniper: {
        planning: 5,
        procurement: 7,
        installation: 3,
        configuration: 10,
        testing: 5,
        deployment: 3,
        training: 5,
        total: 38,
        complexity: "medium",
        resourcesRequired: 3,
      },
      extreme: {
        planning: 6,
        procurement: 10,
        installation: 5,
        configuration: 12,
        testing: 6,
        deployment: 5,
        training: 6,
        total: 50,
        complexity: "medium",
        resourcesRequired: 4,
      },
      fortinet: {
        planning: 7,
        procurement: 10,
        installation: 5,
        configuration: 14,
        testing: 7,
        deployment: 5,
        training: 7,
        total: 55,
        complexity: "medium",
        resourcesRequired: 4,
      },
      arista: {
        planning: 3,
        procurement: 5,
        installation: 2,
        configuration: 7,
        testing: 3,
        deployment: 2,
        training: 3,
        total: 25,
        complexity: "low",
        resourcesRequired: 2,
      },
      meraki: {
        planning: 2,
        procurement: 3,
        installation: 1,
        configuration: 5,
        testing: 2,
        deployment: 1,
        training: 2,
        total: 16,
        complexity: "low",
        resourcesRequired: 2,
      },
      ivanti: {
        planning: 21,
        procurement: 28,
        installation: 14,
        configuration: 35,
        testing: 21,
        deployment: 14,
        training: 21,
        total: 154,
        complexity: "critical",
        resourcesRequired: 10,
      },
      microsoft: {
        planning: 10,
        procurement: 0,
        installation: 7,
        configuration: 21,
        testing: 14,
        deployment: 10,
        training: 14,
        total: 76,
        complexity: "high",
        resourcesRequired: 5,
      },
      foxpass: {
        planning: 1,
        procurement: 0,
        installation: 0,
        configuration: 2,
        testing: 1,
        deployment: 1,
        training: 1,
        total: 6,
        complexity: "low",
        resourcesRequired: 1,
      },
      securew2: {
        planning: 4,
        procurement: 7,
        installation: 3,
        configuration: 10,
        testing: 4,
        deployment: 3,
        training: 7,
        total: 38,
        complexity: "medium",
        resourcesRequired: 3,
      },
      packetfence: {
        planning: 21,
        procurement: 0,
        installation: 14,
        configuration: 35,
        testing: 21,
        deployment: 14,
        training: 28,
        total: 133,
        complexity: "critical",
        resourcesRequired: 8,
      },
    }

    return results
      .map((result) => {
        const timeline = vendorTimelines[result.vendorId] || vendorTimelines.cisco
        return {
          vendor: result.vendorName,
          vendorId: result.vendorId,
          ...timeline,
          isPortnox: result.vendorId === "portnox",
        }
      })
      .sort((a, b) => a.total - b.total)
  }, [results])

  const phaseComparisonData = useMemo(() => {
    const phases = ["planning", "procurement", "installation", "configuration", "testing", "deployment", "training"]
    return phases.map((phase) => {
      const phaseData: any = { phase: phase.charAt(0).toUpperCase() + phase.slice(1) }
      implementationData.forEach((vendor) => {
        phaseData[vendor.vendorId] = vendor[phase as keyof typeof vendor]
      })
      return phaseData
    })
  }, [implementationData])

  const resourceComparisonData = useMemo(() => {
    return implementationData.map((vendor) => ({
      vendor: vendor.vendor,
      resources: vendor.resourcesRequired,
      timeline: vendor.total,
      efficiency: vendor.total > 0 ? (1 / vendor.total) * 100 : 100,
      isPortnox: vendor.isPortnox,
    }))
  }, [implementationData])

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "low":
        return "#10b981"
      case "medium":
        return "#f59e0b"
      case "high":
        return "#ef4444"
      case "critical":
        return "#dc2626"
      default:
        return "#6b7280"
    }
  }

  const portnoxData = implementationData.find((d) => d.isPortnox)
  const avgCompetitorTime =
    implementationData.filter((d) => !d.isPortnox).reduce((sum, d) => sum + d.total, 0) /
    Math.max(implementationData.filter((d) => !d.isPortnox).length, 1)

  return (
    <div className="space-y-6">
      {/* Implementation Overview Alert */}
      <Alert className="border-green-200 bg-green-50">
        <Zap className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <div className="space-y-2">
            <div className="font-semibold">
              Portnox CLEAR deploys in 30 minutes vs {Math.round(avgCompetitorTime)} days average
            </div>
            <div className="text-sm">
              While traditional NAC solutions require months of planning, procurement, and complex configuration,
              Portnox's cloud-native architecture enables instant deployment with zero infrastructure requirements.
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Implementation Timeline Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Timeline Comparison</CardTitle>
          <CardDescription>Total deployment time from planning to production (in days)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={implementationData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" label={{ value: "Days", position: "insideBottom", offset: -10 }} />
              <YAxis dataKey="vendor" type="category" width={100} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: number) => `${value} days`} />
              <Bar
                dataKey="total"
                fill={(entry: any) => (entry.isPortnox ? "#10b981" : "#ef4444")}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Phase Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Phase Breakdown</CardTitle>
          <CardDescription>Time required for each implementation phase</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={phaseComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="phase" />
              <YAxis label={{ value: "Days", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              {results.map((result) => (
                <Bar
                  key={result.vendorId}
                  dataKey={result.vendorId}
                  stackId="a"
                  fill={
                    result.vendorId === "portnox"
                      ? "#10b981"
                      : result.vendorId === "cisco"
                        ? "#ef4444"
                        : result.vendorId === "ivanti"
                          ? "#dc2626"
                          : "#3b82f6"
                  }
                  name={result.vendorName}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Resource Requirements vs Timeline */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resource Requirements</CardTitle>
            <CardDescription>FTE resources needed for implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={resourceComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                <YAxis label={{ value: "FTE Required", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="resources"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Implementation Complexity</CardTitle>
            <CardDescription>Complexity rating and timeline analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {implementationData.map((vendor) => (
                <div key={vendor.vendorId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{vendor.vendor}</span>
                      <Badge
                        variant="outline"
                        className="text-xs border-2"
                        style={{
                          borderColor: getComplexityColor(vendor.complexity),
                          color: getComplexityColor(vendor.complexity),
                        }}
                      >
                        {vendor.complexity}
                      </Badge>
                      {vendor.isPortnox && (
                        <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                          Fastest
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">{vendor.total} days</div>
                      <div className="text-xs text-muted-foreground">{vendor.resourcesRequired} FTE required</div>
                    </div>
                  </div>
                  <Progress
                    value={Math.min(100, (vendor.total / Math.max(...implementationData.map((d) => d.total))) * 100)}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Advantages */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Portnox Implementation Advantages
          </CardTitle>
          <CardDescription className="text-green-700">
            Why Portnox CLEAR deploys 95% faster than traditional NAC
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-800">Zero Infrastructure</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>No hardware procurement or installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>No network redesign required</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Cloud-native scalability</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-green-800">Simplified Deployment</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>30-minute configuration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Automated policy deployment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>No specialized training required</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time-to-Value Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Time-to-Value Analysis</CardTitle>
          <CardDescription>When you start seeing security benefits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 rounded-lg border border-green-200 bg-green-50">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">30 min</div>
              <div className="text-sm text-green-600">Portnox CLEAR</div>
              <div className="text-xs text-muted-foreground mt-1">Production ready</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-orange-200 bg-orange-50">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-700">{Math.round(avgCompetitorTime)} days</div>
              <div className="text-sm text-orange-600">Traditional NAC</div>
              <div className="text-xs text-muted-foreground mt-1">Average deployment</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-red-200 bg-red-50">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-700">6+ months</div>
              <div className="text-sm text-red-600">Complex Solutions</div>
              <div className="text-xs text-muted-foreground mt-1">Enterprise deployments</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
