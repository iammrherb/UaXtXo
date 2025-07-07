"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getVendorData } from "@/lib/comprehensive-vendor-data"
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  Settings,
  Zap,
  Shield,
  Network,
  FileText,
  Download,
  Calendar,
} from "lucide-react"

interface ImplementationTimelineViewProps {
  selectedVendors: string[]
}

const IMPLEMENTATION_PHASES = [
  {
    id: "planning",
    name: "Planning & Assessment",
    description: "Requirements gathering, network assessment, and project planning",
    icon: <FileText className="h-4 w-4" />,
    color: "bg-blue-500",
  },
  {
    id: "design",
    name: "Solution Design",
    description: "Architecture design, policy definition, and integration planning",
    icon: <Settings className="h-4 w-4" />,
    color: "bg-purple-500",
  },
  {
    id: "deployment",
    name: "Deployment & Configuration",
    description: "Hardware/software installation and initial configuration",
    icon: <Network className="h-4 w-4" />,
    color: "bg-orange-500",
  },
  {
    id: "integration",
    name: "Integration & Testing",
    description: "System integration, testing, and validation",
    icon: <Zap className="h-4 w-4" />,
    color: "bg-green-500",
  },
  {
    id: "training",
    name: "Training & Handover",
    description: "User training, documentation, and knowledge transfer",
    icon: <Users className="h-4 w-4" />,
    color: "bg-teal-500",
  },
  {
    id: "optimization",
    name: "Optimization & Go-Live",
    description: "Performance tuning, final testing, and production rollout",
    icon: <CheckCircle2 className="h-4 w-4" />,
    color: "bg-emerald-500",
  },
]

const VENDOR_TIMELINES = {
  portnox: {
    totalWeeks: 4,
    phases: {
      planning: { weeks: 0.5, effort: "low" },
      design: { weeks: 0.5, effort: "low" },
      deployment: { weeks: 1, effort: "low" },
      integration: { weeks: 1, effort: "medium" },
      training: { weeks: 0.5, effort: "low" },
      optimization: { weeks: 0.5, effort: "low" },
    },
    complexity: "low",
    riskLevel: "low",
    resources: 2,
  },
  cisco: {
    totalWeeks: 16,
    phases: {
      planning: { weeks: 2, effort: "high" },
      design: { weeks: 3, effort: "high" },
      deployment: { weeks: 4, effort: "high" },
      integration: { weeks: 3, effort: "high" },
      training: { weeks: 2, effort: "medium" },
      optimization: { weeks: 2, effort: "medium" },
    },
    complexity: "high",
    riskLevel: "medium",
    resources: 6,
  },
  aruba: {
    totalWeeks: 12,
    phases: {
      planning: { weeks: 1.5, effort: "medium" },
      design: { weeks: 2, effort: "medium" },
      deployment: { weeks: 3, effort: "medium" },
      integration: { weeks: 2.5, effort: "medium" },
      training: { weeks: 1.5, effort: "medium" },
      optimization: { weeks: 1.5, effort: "medium" },
    },
    complexity: "medium",
    riskLevel: "low",
    resources: 4,
  },
  fortinet: {
    totalWeeks: 10,
    phases: {
      planning: { weeks: 1, effort: "medium" },
      design: { weeks: 2, effort: "medium" },
      deployment: { weeks: 2.5, effort: "medium" },
      integration: { weeks: 2, effort: "medium" },
      training: { weeks: 1.5, effort: "medium" },
      optimization: { weeks: 1, effort: "low" },
    },
    complexity: "medium",
    riskLevel: "low",
    resources: 3,
  },
  microsoft: {
    totalWeeks: 8,
    phases: {
      planning: { weeks: 1, effort: "low" },
      design: { weeks: 1.5, effort: "medium" },
      deployment: { weeks: 2, effort: "medium" },
      integration: { weeks: 2, effort: "medium" },
      training: { weeks: 1, effort: "low" },
      optimization: { weeks: 0.5, effort: "low" },
    },
    complexity: "medium",
    riskLevel: "low",
    resources: 3,
  },
  securew2: {
    totalWeeks: 6,
    phases: {
      planning: { weeks: 0.5, effort: "low" },
      design: { weeks: 1, effort: "low" },
      deployment: { weeks: 1.5, effort: "low" },
      integration: { weeks: 1.5, effort: "medium" },
      training: { weeks: 1, effort: "low" },
      optimization: { weeks: 0.5, effort: "low" },
    },
    complexity: "low",
    riskLevel: "low",
    resources: 2,
  },
  foxpass: {
    totalWeeks: 4,
    phases: {
      planning: { weeks: 0.5, effort: "low" },
      design: { weeks: 0.5, effort: "low" },
      deployment: { weeks: 1, effort: "low" },
      integration: { weeks: 1, effort: "medium" },
      training: { weeks: 0.5, effort: "low" },
      optimization: { weeks: 0.5, effort: "low" },
    },
    complexity: "low",
    riskLevel: "low",
    resources: 1,
  },
  pulse: {
    totalWeeks: 14,
    phases: {
      planning: { weeks: 2, effort: "high" },
      design: { weeks: 2.5, effort: "high" },
      deployment: { weeks: 3.5, effort: "high" },
      integration: { weeks: 3, effort: "high" },
      training: { weeks: 2, effort: "medium" },
      optimization: { weeks: 1, effort: "medium" },
    },
    complexity: "high",
    riskLevel: "medium",
    resources: 5,
  },
}

export default function ImplementationTimelineView({ selectedVendors }: ImplementationTimelineViewProps) {
  const [selectedVendor, setSelectedVendor] = useState(selectedVendors[0] || "portnox")
  const [viewMode, setViewMode] = useState<"timeline" | "comparison" | "gantt">("timeline")

  const vendors = selectedVendors
    .map((id) => ({
      id,
      name: getVendorData(id)?.name || id,
      timeline: VENDOR_TIMELINES[id as keyof typeof VENDOR_TIMELINES] || VENDOR_TIMELINES.portnox,
    }))
    .filter(Boolean)

  const selectedVendorData = vendors.find((v) => v.id === selectedVendor)

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge variant="destructive">High Risk</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Risk</Badge>
      case "low":
        return <Badge variant="default">Low Risk</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getComplexityBadge = (complexity: string) => {
    switch (complexity) {
      case "high":
        return <Badge variant="destructive">High Complexity</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Complexity</Badge>
      case "low":
        return <Badge variant="default">Low Complexity</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Implementation Timeline</h2>
          <p className="text-muted-foreground">Deployment schedules and project planning for selected vendors</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Timeline
          </Button>
        </div>
      </div>

      {/* Vendor Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Select Vendor:</span>
            <div className="flex gap-2">
              {vendors.map((vendor) => (
                <Button
                  key={vendor.id}
                  variant={selectedVendor === vendor.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedVendor(vendor.id)}
                >
                  {vendor.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="comparison">Vendor Comparison</TabsTrigger>
          <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          {selectedVendorData && (
            <>
              {/* Timeline Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Total Duration</p>
                        <p className="text-2xl font-bold">{selectedVendorData.timeline.totalWeeks} weeks</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Resources Needed</p>
                        <p className="text-2xl font-bold">{selectedVendorData.timeline.resources} FTE</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium">Complexity</p>
                        <div className="mt-1">{getComplexityBadge(selectedVendorData.timeline.complexity)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium">Risk Level</p>
                        <div className="mt-1">{getRiskBadge(selectedVendorData.timeline.riskLevel)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Phase Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Implementation Phases - {selectedVendorData.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {IMPLEMENTATION_PHASES.map((phase, index) => {
                      const phaseData =
                        selectedVendorData.timeline.phases[phase.id as keyof typeof selectedVendorData.timeline.phases]
                      const startWeek = IMPLEMENTATION_PHASES.slice(0, index).reduce(
                        (sum, p) =>
                          sum +
                          (selectedVendorData.timeline.phases[p.id as keyof typeof selectedVendorData.timeline.phases]
                            ?.weeks || 0),
                        0,
                      )

                      return (
                        <div key={phase.id} className="relative">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-8 h-8 rounded-full ${phase.color} flex items-center justify-center text-white`}
                            >
                              {phase.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{phase.name}</h4>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{phaseData.weeks} weeks</Badge>
                                  <div className={`w-3 h-3 rounded-full ${getEffortColor(phaseData.effort)}`} />
                                  <span className="text-xs text-muted-foreground capitalize">
                                    {phaseData.effort} effort
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{phase.description}</p>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${phase.color}`}
                                  style={{
                                    width: `${(phaseData.weeks / selectedVendorData.timeline.totalWeeks) * 100}%`,
                                  }}
                                />
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>Week {Math.ceil(startWeek + 1)}</span>
                                <span>Week {Math.ceil(startWeek + phaseData.weeks)}</span>
                              </div>
                            </div>
                          </div>
                          {index < IMPLEMENTATION_PHASES.length - 1 && (
                            <div className="absolute left-4 top-8 w-0.5 h-8 bg-gray-300" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Risk Factors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Risk Assessment & Mitigation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Potential Risks</h4>
                      <div className="space-y-2">
                        {selectedVendorData.timeline.complexity === "high" && (
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              High complexity deployment may require additional expertise and extended timelines.
                            </AlertDescription>
                          </Alert>
                        )}
                        {selectedVendorData.timeline.resources > 4 && (
                          <Alert>
                            <Users className="h-4 w-4" />
                            <AlertDescription>
                              Large resource requirement may impact other projects and require careful resource
                              planning.
                            </AlertDescription>
                          </Alert>
                        )}
                        {selectedVendorData.timeline.riskLevel === "medium" && (
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              Medium risk deployment requires careful monitoring and contingency planning.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Mitigation Strategies</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Conduct thorough pre-deployment assessment</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Establish clear project milestones and checkpoints</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Maintain regular communication with vendor support</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Plan for parallel testing and rollback procedures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Timeline Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendors.map((vendor) => (
                  <div key={vendor.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{vendor.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{vendor.timeline.totalWeeks} weeks</Badge>
                        {getComplexityBadge(vendor.timeline.complexity)}
                        {getRiskBadge(vendor.timeline.riskLevel)}
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2 mb-2">
                      {IMPLEMENTATION_PHASES.map((phase) => {
                        const phaseData = vendor.timeline.phases[phase.id as keyof typeof vendor.timeline.phases]
                        const widthPercentage = (phaseData.weeks / vendor.timeline.totalWeeks) * 100
                        return (
                          <div
                            key={phase.id}
                            className={`h-6 rounded ${phase.color} flex items-center justify-center text-white text-xs`}
                            style={{ width: `${widthPercentage}%`, minWidth: "40px" }}
                            title={`${phase.name}: ${phaseData.weeks} weeks`}
                          >
                            {phaseData.weeks}w
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{vendor.timeline.resources} FTE required</span>
                      <span>{vendor.timeline.complexity} complexity</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gantt" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Gantt Chart View
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedVendorData && (
                <div className="space-y-4">
                  <div className="grid grid-cols-12 gap-1 text-xs text-muted-foreground mb-4">
                    {Array.from({ length: Math.ceil(selectedVendorData.timeline.totalWeeks) }, (_, i) => (
                      <div key={i} className="text-center">
                        W{i + 1}
                      </div>
                    ))}
                  </div>
                  {IMPLEMENTATION_PHASES.map((phase, index) => {
                    const phaseData =
                      selectedVendorData.timeline.phases[phase.id as keyof typeof selectedVendorData.timeline.phases]
                    const startWeek = IMPLEMENTATION_PHASES.slice(0, index).reduce(
                      (sum, p) =>
                        sum +
                        (selectedVendorData.timeline.phases[p.id as keyof typeof selectedVendorData.timeline.phases]
                          ?.weeks || 0),
                      0,
                    )
                    const startCol = Math.floor(startWeek)
                    const duration = Math.ceil(phaseData.weeks)

                    return (
                      <div key={phase.id} className="grid grid-cols-12 gap-1 items-center mb-2">
                        <div className="col-span-12 flex items-center">
                          <div className="w-32 text-sm font-medium mr-4">{phase.name}</div>
                          <div className="flex-1 grid grid-cols-12 gap-1">
                            {Array.from({ length: 12 }, (_, i) => (
                              <div
                                key={i}
                                className={`h-6 rounded ${
                                  i >= startCol && i < startCol + duration ? phase.color : "bg-gray-100"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
