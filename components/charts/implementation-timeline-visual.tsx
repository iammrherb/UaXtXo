"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Clock, Zap, Users, CheckCircle2, AlertTriangle } from "lucide-react"
import type { CalculationResult } from "@/lib/enhanced-tco-calculator"

interface ImplementationTimelineVisualProps {
  results: CalculationResult[]
}

export default function ImplementationTimelineVisual({ results }: ImplementationTimelineVisualProps) {
  const implementationData = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      weeks: result.timeline.implementationWeeks,
      complexity: result.vendorData.implementation.complexityScore,
      timeToValue: result.timeline.timeToValue,
      trainingHours: result.vendorData.implementation.trainingRequired,
      fteRequired: result.vendorData.implementation.fteRequired,
      isPortnox: result.vendorId === "portnox",
      deploymentType:
        result.timeline.implementationWeeks <= 1
          ? "Instant"
          : result.timeline.implementationWeeks <= 4
            ? "Fast"
            : result.timeline.implementationWeeks <= 12
              ? "Standard"
              : "Complex",
    }))
  }, [results])

  const timelineOverview = useMemo(() => {
    const portnox = implementationData.find((d) => d.isPortnox)
    const competitors = implementationData.filter((d) => !d.isPortnox)

    const fastestCompetitor = competitors.reduce((min, curr) => (curr.weeks < min.weeks ? curr : min), competitors[0])
    const slowestCompetitor = competitors.reduce((max, curr) => (curr.weeks > max.weeks ? curr : max), competitors[0])
    const avgCompetitorTime = competitors.reduce((sum, d) => sum + d.weeks, 0) / competitors.length

    return {
      portnoxTime: portnox?.weeks || 0,
      fastestCompetitor: fastestCompetitor?.weeks || 0,
      slowestCompetitor: slowestCompetitor?.weeks || 0,
      avgCompetitorTime,
      timeAdvantage: portnox ? ((avgCompetitorTime - portnox.weeks) / avgCompetitorTime) * 100 : 0,
    }
  }, [implementationData])

  const phaseBreakdown = useMemo(() => {
    return [
      {
        phase: "Planning & Design",
        portnox: 0.1,
        traditional: 4,
        description: "Architecture planning and design",
      },
      {
        phase: "Hardware Procurement",
        portnox: 0,
        traditional: 6,
        description: "Hardware ordering and delivery",
      },
      {
        phase: "Installation & Setup",
        portnox: 0.1,
        traditional: 8,
        description: "Physical installation and configuration",
      },
      {
        phase: "Integration & Testing",
        portnox: 0.3,
        traditional: 12,
        description: "Network integration and testing",
      },
      {
        phase: "Training & Go-Live",
        portnox: 0.5,
        traditional: 6,
        description: "Staff training and production deployment",
      },
    ]
  }, [])

  return (
    <div className="space-y-6">
      {/* Implementation Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-600" />
              Fastest Deployment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{timelineOverview.portnoxTime}w</div>
            <p className="text-xs text-green-600 mt-1">Portnox CLEAR</p>
            <Badge variant="outline" className="mt-2 text-xs border-green-300 text-green-700">
              30 minutes
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-600" />
              Longest Deployment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700">{timelineOverview.slowestCompetitor}w</div>
            <p className="text-xs text-red-600 mt-1">Traditional NAC</p>
            <div className="text-xs text-muted-foreground mt-1">6-9 months typical</div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              Time Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{timelineOverview.timeAdvantage.toFixed(0)}%</div>
            <p className="text-xs text-blue-600 mt-1">faster than average</p>
            <div className="text-xs text-muted-foreground mt-1">
              vs {timelineOverview.avgCompetitorTime.toFixed(1)}w avg
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-600" />
              Time to Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">1</div>
            <p className="text-xs text-purple-600 mt-1">day with Portnox</p>
            <div className="text-xs text-muted-foreground mt-1">Immediate protection</div>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Timeline Bars */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Timeline Comparison</CardTitle>
          <CardDescription>Deployment time in weeks across all vendors</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={implementationData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `${value}w`} />
              <YAxis dataKey="vendor" type="category" width={120} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value: number) => [`${value} weeks`, "Implementation Time"]}
                labelFormatter={(label) => `Vendor: ${label}`}
              />
              <Bar
                dataKey="weeks"
                fill={(entry: any) => (entry.isPortnox ? "#10b981" : "#6b7280")}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Resource Requirements Comparison */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resource Requirements</CardTitle>
            <CardDescription>FTE and training requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {implementationData
                .sort((a, b) => a.fteRequired - b.fteRequired)
                .map((vendor) => (
                  <div key={vendor.vendor} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{vendor.vendor}</span>
                        {vendor.isPortnox && (
                          <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                            Minimal Resources
                          </Badge>
                        )}
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-medium">{vendor.fteRequired} FTE</div>
                        <div className="text-muted-foreground">{vendor.trainingHours}h training</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">FTE Required</div>
                        <Progress
                          value={(vendor.fteRequired / 5) * 100}
                          className={`h-2 ${vendor.isPortnox ? "bg-green-100" : ""}`}
                        />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Training Hours</div>
                        <Progress
                          value={(vendor.trainingHours / 200) * 100}
                          className={`h-2 ${vendor.isPortnox ? "bg-green-100" : ""}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deployment Phases</CardTitle>
            <CardDescription>Portnox vs Traditional NAC phases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {phaseBreakdown.map((phase, index) => (
                <div key={phase.phase} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{phase.phase}</span>
                    <div className="text-right text-xs">
                      <div className="text-green-600">Portnox: {phase.portnox}w</div>
                      <div className="text-red-600">Traditional: {phase.traditional}w</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-green-600 mb-1">Portnox</div>
                      <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${(phase.portnox / phase.traditional) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-red-600 mb-1">Traditional</div>
                      <div className="h-2 bg-red-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: "100%" }} />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{phase.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Alerts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <Zap className="h-4 w-4" />
          <AlertTitle className="text-green-900 dark:text-green-100">Rapid Deployment Advantage</AlertTitle>
          <AlertDescription className="text-green-800 dark:text-green-200">
            <strong>30-minute deployment.</strong> Portnox CLEAR's cloud-native architecture enables instant deployment
            with zero hardware requirements. Start protecting your network in minutes, not months, with immediate
            time-to-value and minimal resource requirements.
          </AlertDescription>
        </Alert>

        <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="text-red-900 dark:text-red-100">Traditional NAC Complexity</AlertTitle>
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>6-9 month implementations.</strong> Traditional NAC solutions require extensive planning, hardware
            procurement, complex integrations, and significant training. High resource requirements and extended
            timelines delay security benefits and increase project risk.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
