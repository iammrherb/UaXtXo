"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Clock, Zap, Users, CheckCircle2 } from "lucide-react"
import type { CalculationResult } from "@/lib/enhanced-tco-calculator"

interface ImplementationTimelineVisualProps {
  results: CalculationResult[]
}

export default function ImplementationTimelineVisual({ results }: ImplementationTimelineVisualProps) {
  const implementationData = useMemo(() => {
    return results.map((result) => {
      const vendorData = result.vendorData
      const deploymentDays = vendorData?.implementation?.deploymentDays || 90
      const resourcesRequired = vendorData?.implementation?.resourcesRequired || {}

      // Calculate implementation phases
      const phases = {
        planning: Math.max(deploymentDays * 0.2, 1),
        deployment: Math.max(deploymentDays * 0.4, 1),
        testing: Math.max(deploymentDays * 0.2, 1),
        rollout: Math.max(deploymentDays * 0.2, 1),
      }

      return {
        vendor: result.vendorName,
        vendorId: result.vendorId,
        totalDays: deploymentDays,
        planning: phases.planning,
        deployment: phases.deployment,
        testing: phases.testing,
        rollout: phases.rollout,
        consultingFTE: resourcesRequired.consultingFTE || 0,
        internalFTE: resourcesRequired.internalFTE || 0,
        ongoingFTE: resourcesRequired.ongoingFTE || 0,
        trainingHours: resourcesRequired.trainingHours || 0,
        complexityScore: vendorData?.implementation?.complexityScore || 5,
        isPortnox: result.vendorId === "portnox",
      }
    })
  }, [results])

  const portnoxImpl = implementationData.find((d) => d.isPortnox)
  const competitorAvg = useMemo(() => {
    const competitors = implementationData.filter((d) => !d.isPortnox)
    if (competitors.length === 0) return null

    return {
      totalDays: competitors.reduce((sum, c) => sum + c.totalDays, 0) / competitors.length,
      consultingFTE: competitors.reduce((sum, c) => sum + c.consultingFTE, 0) / competitors.length,
      internalFTE: competitors.reduce((sum, c) => sum + c.internalFTE, 0) / competitors.length,
      trainingHours: competitors.reduce((sum, c) => sum + c.trainingHours, 0) / competitors.length,
    }
  }, [implementationData])

  const timelineAdvantage = useMemo(() => {
    if (!portnoxImpl || !competitorAvg) return null

    return {
      daysSaved: competitorAvg.totalDays - portnoxImpl.totalDays,
      percentFaster: ((competitorAvg.totalDays - portnoxImpl.totalDays) / competitorAvg.totalDays) * 100,
      consultingSaved: competitorAvg.consultingFTE - portnoxImpl.consultingFTE,
      trainingSaved: competitorAvg.trainingHours - portnoxImpl.trainingHours,
    }
  }, [portnoxImpl, competitorAvg])

  return (
    <div className="space-y-6">
      {/* Implementation Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-600" />
              Portnox Deployment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{portnoxImpl?.totalDays || 0.02}</div>
            <p className="text-xs text-green-600 mt-1">days to production</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-600" />
              Competitor Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700">{Math.round(competitorAvg?.totalDays || 90)}</div>
            <p className="text-xs text-red-600 mt-1">days to production</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              Time Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{Math.round(timelineAdvantage?.daysSaved || 0)}</div>
            <p className="text-xs text-blue-600 mt-1">days saved</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              Speed Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">
              {Math.round(timelineAdvantage?.percentFaster || 0)}%
            </div>
            <p className="text-xs text-purple-600 mt-1">faster deployment</p>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Alert */}
      <Alert className="border-green-200 bg-green-50">
        <Zap className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <div className="space-y-2">
            <div>
              <strong>Rapid Deployment Advantage:</strong> Portnox CLEAR deploys in 30 minutes compared to
              {Math.round(competitorAvg?.totalDays || 90)} days for traditional NAC solutions - that's
              {Math.round(timelineAdvantage?.percentFaster || 0)}% faster time to value.
            </div>
            <div className="text-sm">
              Cloud-native architecture eliminates complex hardware setup, network redesign, and lengthy integration
              processes that plague traditional NAC deployments.
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Implementation Timeline Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Timeline Comparison</CardTitle>
          <CardDescription>Deployment phases breakdown by vendor</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={implementationData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `${value} days`} />
              <YAxis dataKey="vendor" type="category" width={100} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value: number) => [`${value} days`, ""]}
                labelFormatter={(label) => `Vendor: ${label}`}
              />
              <Legend />
              <Bar dataKey="planning" stackId="a" fill="#3b82f6" name="Planning" />
              <Bar dataKey="deployment" stackId="a" fill="#10b981" name="Deployment" />
              <Bar dataKey="testing" stackId="a" fill="#f59e0b" name="Testing" />
              <Bar dataKey="rollout" stackId="a" fill="#8b5cf6" name="Rollout" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Resource Requirements and Detailed Timeline */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resource Requirements</CardTitle>
            <CardDescription>FTE and training hours needed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {implementationData
                .sort((a, b) => a.totalDays - b.totalDays)
                .map((vendor) => (
                  <div key={vendor.vendorId} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{vendor.vendor}</span>
                        {vendor.isPortnox && (
                          <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                            Minimal Resources
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">{vendor.totalDays} days</div>
                        <div className="text-xs text-muted-foreground">{vendor.complexityScore}/10 complexity</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <div className="font-medium">{vendor.consultingFTE}</div>
                        <div className="text-muted-foreground">Consulting FTE</div>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <div className="font-medium">{vendor.internalFTE}</div>
                        <div className="text-muted-foreground">Internal FTE</div>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <div className="font-medium">{vendor.trainingHours}h</div>
                        <div className="text-muted-foreground">Training</div>
                      </div>
                    </div>

                    <Progress value={100 - vendor.complexityScore * 10} className="h-2" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portnox Deployment Phases</CardTitle>
            <CardDescription>Detailed breakdown of rapid deployment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <div className="font-medium text-sm text-green-800">Phase 1: Account Setup</div>
                  <div className="text-xs text-green-600">Cloud tenant provisioning</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-700">5 min</div>
                  <div className="text-xs text-green-600">Automated</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <div className="font-medium text-sm text-blue-800">Phase 2: Configuration</div>
                  <div className="text-xs text-blue-600">Policy and network setup</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-700">15 min</div>
                  <div className="text-xs text-blue-600">Guided wizard</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div>
                  <div className="font-medium text-sm text-purple-800">Phase 3: Testing</div>
                  <div className="text-xs text-purple-600">Validation and verification</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-700">5 min</div>
                  <div className="text-xs text-purple-600">Automated tests</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <div className="font-medium text-sm text-orange-800">Phase 4: Go Live</div>
                  <div className="text-xs text-orange-600">Production deployment</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-orange-700">5 min</div>
                  <div className="text-xs text-orange-600">One-click activation</div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-800">Total Deployment Time</div>
                  <div className="font-bold text-2xl text-green-700">30 minutes</div>
                </div>
                <div className="text-xs text-gray-600 mt-1">From signup to production-ready NAC solution</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Advantages */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="text-green-800">Portnox Implementation Advantages</CardTitle>
          <CardDescription className="text-green-700">
            Why Portnox deploys 95% faster than traditional NAC
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 rounded-lg border border-green-200">
              <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold text-green-800">No Hardware</div>
              <div className="text-xs text-green-600 mt-1">Cloud-native deployment</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-green-200">
              <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold text-green-800">Auto-Discovery</div>
              <div className="text-xs text-green-600 mt-1">Automatic network mapping</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-green-200">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold text-green-800">No Training</div>
              <div className="text-xs text-green-600 mt-1">Intuitive interface</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-green-200">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold text-green-800">Instant Value</div>
              <div className="text-xs text-green-600 mt-1">Immediate protection</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
