"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, Zap, Users, CheckCircle2, AlertTriangle } from "lucide-react"
import type { CalculationResult } from "@/lib/enhanced-tco-calculator"

interface ImplementationTimelineVisualProps {
  results: CalculationResult[]
}

export function ImplementationTimelineVisual({ results }: ImplementationTimelineVisualProps) {
  const timelineData = useMemo(() => {
    return results
      .map((result) => ({
        vendor: result.vendorName,
        vendorId: result.vendorId,
        weeks: result.timeline.implementationWeeks,
        complexity: result.vendorData.implementation.complexityScore,
        internalFTE: result.vendorData.implementation.resourcesRequired.internalFTE,
        vendorFTE: result.vendorData.implementation.resourcesRequired.vendorFTE,
        trainingHours: result.vendorData.implementation.resourcesRequired.trainingHours,
        ongoingFTE: result.vendorData.implementation.resourcesRequired.ongoingFTE,
        timeToValue: result.timeline.timeToValue,
        migrationRisk: result.timeline.migrationRisk,
        isPortnox: result.vendorId === "portnox",
        deploymentPhases:
          result.vendorId === "portnox"
            ? [
                { phase: "Setup", duration: 0.1, description: "Cloud account setup" },
                { phase: "Configuration", duration: 0.2, description: "Policy configuration" },
                { phase: "Testing", duration: 0.1, description: "Connectivity testing" },
                { phase: "Go-Live", duration: 0.1, description: "Production deployment" },
              ]
            : [
                { phase: "Planning", duration: 0.15, description: "Architecture and planning" },
                { phase: "Hardware", duration: 0.25, description: "Hardware procurement and setup" },
                { phase: "Installation", duration: 0.2, description: "Software installation" },
                { phase: "Configuration", duration: 0.25, description: "Complex configuration" },
                { phase: "Testing", duration: 0.1, description: "Testing and validation" },
                { phase: "Go-Live", duration: 0.05, description: "Production deployment" },
              ],
      }))
      .sort((a, b) => a.weeks - b.weeks)
  }, [results])

  const maxWeeks = Math.max(...timelineData.map((d) => d.weeks))
  const portnoxData = timelineData.find((d) => d.isPortnox)
  const avgImplementationTime = timelineData.reduce((sum, d) => sum + d.weeks, 0) / timelineData.length

  const getComplexityColor = (score: number) => {
    if (score <= 3) return "text-green-600"
    if (score <= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getComplexityBadge = (score: number) => {
    if (score <= 3) return { variant: "default" as const, label: "Simple" }
    if (score <= 6) return { variant: "outline" as const, label: "Moderate" }
    return { variant: "destructive" as const, label: "Complex" }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Implementation Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-600" />
              Fastest Deployment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {Math.min(...timelineData.map((d) => d.weeks))} weeks
            </div>
            <p className="text-xs text-green-600 mt-1">Portnox CLEAR</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-gradient-to-br from-red-50 to-rose-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-600" />
              Longest Deployment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{Math.max(...timelineData.map((d) => d.weeks))} weeks</div>
            <p className="text-xs text-red-600 mt-1">Traditional NAC</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              Average Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {(timelineData.reduce((sum, d) => sum + d.internalFTE, 0) / timelineData.length).toFixed(1)} FTE
            </div>
            <p className="text-xs text-blue-600 mt-1">Internal resources needed</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-600" />
              Time Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">
              {portnoxData
                ? (((avgImplementationTime - portnoxData.weeks) / avgImplementationTime) * 100).toFixed(0)
                : 0}
              %
            </div>
            <p className="text-xs text-purple-600 mt-1">Faster than average</p>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Timeline Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Timeline Comparison</CardTitle>
          <CardDescription>Deployment duration and complexity across vendors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {timelineData.map((vendor) => (
              <div key={vendor.vendorId} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm min-w-[140px]">{vendor.vendor}</span>
                    {vendor.isPortnox && (
                      <Badge variant="default" className="text-xs bg-green-100 text-green-800 border-green-300">
                        Fastest
                      </Badge>
                    )}
                    <Badge {...getComplexityBadge(vendor.complexity)} className="text-xs">
                      {getComplexityBadge(vendor.complexity).label}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{vendor.weeks} weeks</div>
                    <div className="text-xs text-muted-foreground">{vendor.internalFTE} internal FTE</div>
                  </div>
                </div>

                {/* Timeline Bar */}
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        vendor.isPortnox
                          ? "bg-gradient-to-r from-green-400 to-green-600"
                          : "bg-gradient-to-r from-gray-400 to-gray-600"
                      }`}
                      style={{ width: `${(vendor.weeks / maxWeeks) * 100}%` }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">{vendor.weeks} weeks</span>
                  </div>
                </div>

                {/* Deployment Phases */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Training Hours:</span>
                    <span className="ml-1 font-medium">{vendor.trainingHours}h</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Vendor Support:</span>
                    <span className="ml-1 font-medium">{vendor.vendorFTE} FTE</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time to Value:</span>
                    <span className="ml-1 font-medium">{vendor.timeToValue} weeks</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Migration Risk:</span>
                    <span className={`ml-1 font-medium capitalize ${getRiskColor(vendor.migrationRisk)}`}>
                      {vendor.migrationRisk}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Phase Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        {portnoxData && (
          <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle className="text-green-800">Portnox Implementation Phases</CardTitle>
              <CardDescription>Streamlined deployment process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portnoxData.deploymentPhases.map((phase, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{phase.phase}</span>
                      <span className="text-xs text-muted-foreground">
                        {(phase.duration * portnoxData.weeks).toFixed(1)} weeks
                      </span>
                    </div>
                    <Progress value={phase.duration * 100} className="h-2 bg-green-100" />
                    <p className="text-xs text-muted-foreground">{phase.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Resource Requirements Comparison</CardTitle>
            <CardDescription>FTE and training requirements by vendor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timelineData.map((vendor) => (
                <div key={vendor.vendorId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{vendor.vendor}</span>
                    <div className="text-right text-xs">
                      <div>Total: {(vendor.internalFTE + vendor.vendorFTE).toFixed(1)} FTE</div>
                      <div className="text-muted-foreground">{vendor.trainingHours}h training</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Internal FTE</div>
                      <Progress
                        value={(vendor.internalFTE / 4) * 100}
                        className={`h-2 ${vendor.isPortnox ? "bg-green-100" : ""}`}
                      />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Ongoing FTE</div>
                      <Progress
                        value={(vendor.ongoingFTE / 3) * 100}
                        className={`h-2 ${vendor.isPortnox ? "bg-green-100" : ""}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Alerts */}
      <div className="space-y-4">
        {portnoxData && (
          <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
            <Zap className="h-4 w-4" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              <strong>Rapid Deployment:</strong> Portnox CLEAR can be deployed in just {portnoxData.weeks} week(s) with
              minimal resources, delivering immediate value and{" "}
              {(((avgImplementationTime - portnoxData.weeks) / avgImplementationTime) * 100).toFixed(0)}% faster
              time-to-market compared to traditional NAC solutions.
            </AlertDescription>
          </Alert>
        )}

        {timelineData.some((v) => v.weeks > 20) && (
          <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              <strong>Extended Timeline Risk:</strong> Some vendors require 20+ weeks for deployment, significantly
              delaying security improvements and increasing project risk. Consider solutions with faster implementation
              timelines.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
