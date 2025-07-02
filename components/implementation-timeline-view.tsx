"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Calendar, Clock, CheckCircle, AlertCircle, Users, Wrench } from "lucide-react"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"

interface ImplementationTimelineViewProps {
  results: any[]
  config: any
}

export default function ImplementationTimelineView({ results, config }: ImplementationTimelineViewProps) {
  if (!results || results.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>No implementation data available</p>
        </CardContent>
      </Card>
    )
  }

  const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

  // Implementation phases
  const phases = [
    { name: "Planning & Design", duration: 2, description: "Requirements gathering, architecture design" },
    { name: "Infrastructure Setup", duration: 3, description: "Hardware/VM deployment, network configuration" },
    { name: "Core Configuration", duration: 4, description: "Policy setup, authentication configuration" },
    { name: "Integration", duration: 3, description: "SIEM, MDM, and security tool integrations" },
    { name: "Testing & Validation", duration: 2, description: "User acceptance testing, security validation" },
    { name: "Rollout & Training", duration: 3, description: "Phased deployment, user training" },
    { name: "Go-Live & Support", duration: 1, description: "Production cutover, initial support" },
  ]

  // Calculate implementation timelines for each vendor
  const getImplementationTimeline = (vendorId: string) => {
    const vendor = ComprehensiveVendorDatabase[vendorId]
    if (!vendor) return { totalWeeks: 18, complexity: "medium", phases: [] }

    let multiplier = 1
    switch (vendor.tcoFactors.upgradeComplexity) {
      case "low":
        multiplier = 0.7
        break
      case "medium":
        multiplier = 1.0
        break
      case "high":
        multiplier = 1.5
        break
    }

    // Cloud-native solutions are typically faster
    if (vendor.category === "cloud-native") {
      multiplier *= 0.6
    }

    const adjustedPhases = phases.map((phase) => ({
      ...phase,
      duration: Math.ceil(phase.duration * multiplier),
    }))

    return {
      totalWeeks: adjustedPhases.reduce((sum, phase) => sum + phase.duration, 0),
      complexity: vendor.tcoFactors.upgradeComplexity,
      phases: adjustedPhases,
    }
  }

  // Prepare timeline data
  const timelineData = results.map((result) => {
    const timeline = getImplementationTimeline(result.vendor)
    return {
      vendor: result.vendorName,
      totalWeeks: timeline.totalWeeks,
      complexity: timeline.complexity,
      phases: timeline.phases,
      fteRequired: ComprehensiveVendorDatabase[result.vendor]?.tcoFactors.fteRequirement || 1,
    }
  })

  // Prepare chart data for timeline comparison
  const chartData = timelineData.map((data) => ({
    vendor: data.vendor,
    weeks: data.totalWeeks,
    fte: data.fteRequired,
  }))

  // Prepare detailed timeline for the fastest implementation
  const fastestImplementation = timelineData.reduce((min, current) =>
    current.totalWeeks < min.totalWeeks ? current : min,
  )

  const detailedTimeline = fastestImplementation.phases.map((phase, index) => {
    const startWeek = fastestImplementation.phases.slice(0, index).reduce((sum, p) => sum + p.duration, 0)
    return {
      ...phase,
      startWeek: startWeek + 1,
      endWeek: startWeek + phase.duration,
    }
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Implementation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Fastest Implementation</p>
                <p className="text-2xl font-bold">{Math.min(...timelineData.map((d) => d.totalWeeks))} weeks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Average Timeline</p>
                <p className="text-2xl font-bold">
                  {Math.round(timelineData.reduce((sum, d) => sum + d.totalWeeks, 0) / timelineData.length)} weeks
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Min FTE Required</p>
                <p className="text-2xl font-bold">{Math.min(...timelineData.map((d) => d.fteRequired))}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wrench className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Implementation Phases</p>
                <p className="text-2xl font-bold">{phases.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Implementation Timeline Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === "weeks" ? `${value} weeks` : `${value} FTE`,
                    name === "weeks" ? "Timeline" : "Resources",
                  ]}
                />
                <Bar dataKey="weeks" fill="#00D4AA" name="weeks" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} FTE`, "Resources"]} />
                <Bar dataKey="fte" fill="#0EA5E9" name="fte" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Implementation Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Implementation Plan - {fastestImplementation.vendor}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Total Duration: {fastestImplementation.totalWeeks} weeks | Complexity: {fastestImplementation.complexity} |
            Resources: {fastestImplementation.fteRequired} FTE
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {detailedTimeline.map((phase, index) => (
              <div key={phase.name} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold">{phase.name}</h3>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">
                      Week {phase.startWeek}-{phase.endWeek}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">{phase.duration} weeks</p>
                  </div>
                </div>
                <Progress value={(phase.duration / fastestImplementation.totalWeeks) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Comparison Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Vendor</th>
                  <th className="text-center p-2">Timeline</th>
                  <th className="text-center p-2">Complexity</th>
                  <th className="text-center p-2">FTE Required</th>
                  <th className="text-center p-2">Professional Services</th>
                  <th className="text-center p-2">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {timelineData.map((data, index) => {
                  const vendor = ComprehensiveVendorDatabase[results[index].vendor]
                  const psService = vendor?.professionalServices.vendor[0]

                  return (
                    <tr key={data.vendor} className="border-b">
                      <td className="p-2">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="font-medium">{data.vendor}</span>
                        </div>
                      </td>
                      <td className="text-center p-2">
                        <Badge variant="outline">{data.totalWeeks} weeks</Badge>
                      </td>
                      <td className="text-center p-2">
                        <Badge
                          variant={
                            data.complexity === "low"
                              ? "default"
                              : data.complexity === "medium"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {data.complexity}
                        </Badge>
                      </td>
                      <td className="text-center p-2">{data.fteRequired} FTE</td>
                      <td className="text-center p-2">
                        {psService
                          ? formatCurrency(
                              typeof psService.cost === "string"
                                ? Number.parseInt(psService.cost.split("-")[0]) || 0
                                : psService.cost,
                            )
                          : "N/A"}
                      </td>
                      <td className="text-center p-2">
                        <Badge
                          variant={
                            vendor?.tcoFactors.downtimeRisk === "low"
                              ? "default"
                              : vendor?.tcoFactors.downtimeRisk === "medium"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {vendor?.tcoFactors.downtimeRisk || "unknown"}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                Best Practices
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Start with a pilot group of 100-500 users</li>
                <li>• Implement during maintenance windows</li>
                <li>• Maintain parallel systems during transition</li>
                <li>• Conduct thorough testing before full rollout</li>
                <li>• Plan for user training and change management</li>
                <li>• Establish monitoring and alerting early</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                Common Pitfalls
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Underestimating integration complexity</li>
                <li>• Insufficient testing of edge cases</li>
                <li>• Inadequate user communication</li>
                <li>• Rushing the rollout timeline</li>
                <li>• Neglecting backup and rollback plans</li>
                <li>• Insufficient post-implementation support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
