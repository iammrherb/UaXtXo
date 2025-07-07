"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Calendar, Users, AlertTriangle, CheckCircle, Shield, Target } from "lucide-react"
import { enhancedVendorDatabase } from "@/lib/vendors/enhanced-vendor-data"

interface ImplementationTimelineViewProps {
  results?: any[]
  config?: any
  selectedVendors: string[]
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

export default function ImplementationTimelineView({
  results = [],
  config = {},
  selectedVendors = [],
}: ImplementationTimelineViewProps) {
  const [selectedVendor, setSelectedVendor] = useState(selectedVendors[0] || "portnox")
  const [viewMode, setViewMode] = useState<"timeline" | "comparison" | "gantt">("timeline")

  // Get real-time vendor data based on current selections
  const vendorTimelines = useMemo(() => {
    if (!selectedVendors || selectedVendors.length === 0) return []

    return selectedVendors
      .map((vendorId) => {
        const vendor = enhancedVendorDatabase[vendorId]
        if (!vendor) return null

        // Find result for this vendor (with fallback)
        const result = Array.isArray(results) ? results.find((r) => r?.vendor === vendorId) : null

        // Calculate implementation phases based on vendor complexity and config
        const baseWeeks = vendor.implementation?.timeToValue?.medium || 12
        const complexityMultiplier =
          config.deploymentComplexity === "simple"
            ? 0.7
            : config.deploymentComplexity === "complex"
              ? 1.3
              : config.deploymentComplexity === "enterprise"
                ? 1.5
                : 1.0

        const totalWeeks = Math.ceil(baseWeeks * complexityMultiplier)
        const devices = safeNumber(config.devices, 1000)

        // Phase breakdown based on vendor characteristics
        const phases = {
          planning: Math.ceil(totalWeeks * 0.15),
          procurement: Math.ceil(totalWeeks * 0.1),
          installation: Math.ceil(totalWeeks * 0.25),
          configuration: Math.ceil(totalWeeks * 0.3),
          testing: Math.ceil(totalWeeks * 0.15),
          deployment: Math.ceil(totalWeeks * 0.05),
        }

        // Resource requirements based on vendor and config
        const resourceMultiplier = devices > 5000 ? 1.5 : devices > 2000 ? 1.2 : 1.0
        const complexityLevel = vendor.implementation?.complexity || "medium"

        const resources = {
          projectManager: 1,
          networkEngineers: Math.ceil(
            (complexityLevel === "very high"
              ? 4
              : complexityLevel === "high"
                ? 3
                : complexityLevel === "medium"
                  ? 2
                  : 1) * resourceMultiplier,
          ),
          securityEngineers: Math.ceil(
            (complexityLevel === "high" || complexityLevel === "very high" ? 2 : 1) * resourceMultiplier,
          ),
          systemAdmins: Math.ceil(2 * resourceMultiplier),
          vendorSupport: vendor.pricing?.support?.enterprise ? 2 : 1,
        }

        // Risk assessment based on real vendor data
        const risks = []
        if (complexityLevel === "high" || complexityLevel === "very high") {
          risks.push({
            type: "Technical Complexity",
            level: "high",
            impact: "Schedule delay of 2-4 weeks",
            mitigation: "Engage vendor professional services early",
          })
        }
        if (devices > 3000) {
          risks.push({
            type: "Scale Challenges",
            level: "medium",
            impact: "Performance issues during rollout",
            mitigation: "Implement phased deployment approach",
          })
        }
        if (config.integrationRequirements?.length > 3) {
          risks.push({
            type: "Integration Complexity",
            level: "medium",
            impact: "Extended testing phase",
            mitigation: "Parallel integration testing",
          })
        }

        return {
          vendorId,
          vendorName: vendor.name,
          totalWeeks,
          phases,
          resources,
          risks,
          complexity: complexityLevel,
          readinessScore: calculateReadinessScore(vendor, config),
          milestones: generateMilestones(phases, vendor.name),
        }
      })
      .filter(Boolean)
  }, [selectedVendors, results, config])

  const selectedVendorData = vendorTimelines.find((v) => v?.vendorId === selectedVendor) || vendorTimelines[0]

  // Calculate readiness score based on vendor and config
  function calculateReadinessScore(vendor: any, config: any) {
    let score = 70 // Base score

    // Vendor factors
    const complexity = vendor.implementation?.complexity || "medium"
    if (complexity === "low") score += 15
    else if (complexity === "high") score -= 10
    else if (complexity === "very high") score -= 15

    if (vendor.category === "cloud-native") score += 10
    if (vendor.pricing?.support?.enterprise) score += 5

    // Config factors
    if (config.deploymentComplexity === "simple") score += 10
    else if (config.deploymentComplexity === "complex") score -= 10

    if (config.currentSolution === "none") score -= 5
    if (config.securityLevel === "critical") score -= 5

    return Math.max(0, Math.min(100, score))
  }

  // Generate milestones based on phases
  function generateMilestones(phases: any, vendorName: string) {
    let currentWeek = 0
    const milestones: any[] = []

    Object.entries(phases).forEach(([phase, weeks]) => {
      currentWeek += safeNumber(weeks, 0)
      milestones.push({
        phase: phase.charAt(0).toUpperCase() + phase.slice(1),
        week: currentWeek,
        status: "pending",
        description: getMilestoneDescription(phase, vendorName),
      })
    })

    return milestones
  }

  function getMilestoneDescription(phase: string, vendorName: string) {
    const descriptions: Record<string, string> = {
      planning: `Complete ${vendorName} implementation planning and resource allocation`,
      procurement: `Finalize ${vendorName} licensing and hardware procurement`,
      installation: `Install and configure ${vendorName} infrastructure components`,
      configuration: `Configure ${vendorName} policies and integration settings`,
      testing: `Complete ${vendorName} testing and validation procedures`,
      deployment: `Full production deployment of ${vendorName} solution`,
    }
    return descriptions[phase] || `Complete ${phase} phase`
  }

  // Prepare timeline chart data
  const timelineChartData = useMemo(() => {
    if (!selectedVendorData) return []

    const data: any[] = []
    let cumulativeWeeks = 0

    Object.entries(selectedVendorData.phases).forEach(([phase, weeks]) => {
      const phaseWeeks = safeNumber(weeks, 0)
      data.push({
        phase: phase.charAt(0).toUpperCase() + phase.slice(1),
        weeks: phaseWeeks,
        start: cumulativeWeeks,
        end: cumulativeWeeks + phaseWeeks,
        resources: selectedVendorData.resources.networkEngineers + selectedVendorData.resources.securityEngineers,
      })
      cumulativeWeeks += phaseWeeks
    })

    return data
  }, [selectedVendorData])

  // Prepare comparison data
  const comparisonData = useMemo(() => {
    return vendorTimelines.map((timeline) => ({
      vendor: timeline?.vendorName || "Unknown",
      totalWeeks: timeline?.totalWeeks || 0,
      readinessScore: timeline?.readinessScore || 0,
      riskLevel: timeline?.risks?.length || 0,
      resourceCount: Object.values(timeline?.resources || {}).reduce((sum, count) => sum + safeNumber(count, 0), 0),
    }))
  }, [vendorTimelines])

  // Prepare Gantt chart data
  const ganttData = useMemo(() => {
    if (!selectedVendorData) return []

    const weeks = Array.from({ length: selectedVendorData.totalWeeks }, (_, i) => i + 1)
    const data: any[] = []
    const currentWeek = 0

    weeks.forEach((week) => {
      const weekData: any = { week }
      let weekAssigned = false

      Object.entries(selectedVendorData.phases).forEach(([phase, phaseWeeks]) => {
        const phaseStart = currentWeek + 1
        const phaseEnd = currentWeek + safeNumber(phaseWeeks, 0)

        if (week >= phaseStart && week <= phaseEnd && !weekAssigned) {
          weekData[phase] = 1
          weekAssigned = true
        } else {
          weekData[phase] = 0
        }
      })

      data.push(weekData)
    })

    return data
  }, [selectedVendorData])

  const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

  // Handle empty state
  if (!selectedVendors || selectedVendors.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
          <p>No vendors selected for timeline analysis</p>
        </CardContent>
      </Card>
    )
  }

  if (!selectedVendorData) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
          <p>No implementation timeline data available for selected vendors</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with vendor selection */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Implementation Timeline</h2>
          <p className="text-muted-foreground">Detailed implementation planning and resource allocation</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedVendor} onValueChange={setSelectedVendor}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {selectedVendors.map((vendorId) => {
                const vendor = enhancedVendorDatabase[vendorId]
                return (
                  <SelectItem key={vendorId} value={vendorId}>
                    {vendor?.name || vendorId}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Duration</p>
                <p className="text-2xl font-bold">{selectedVendorData.totalWeeks} weeks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Team Size</p>
                <p className="text-2xl font-bold">
                  {Object.values(selectedVendorData.resources).reduce((sum, count) => sum + safeNumber(count, 0), 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Readiness Score</p>
                <p className="text-2xl font-bold">{selectedVendorData.readinessScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Risk Factors</p>
                <p className="text-2xl font-bold">{selectedVendorData.risks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="comparison">Vendor Comparison</TabsTrigger>
          <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          {/* Phase Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Phases</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timelineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="phase" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "weeks" ? `${safeNumber(value, 0)} weeks` : safeNumber(value, 0),
                      name === "weeks" ? "Duration" : "Resources",
                    ]}
                  />
                  <Bar dataKey="weeks" fill="#00D4AA" name="weeks" />
                  <Bar dataKey="resources" fill="#0EA5E9" name="resources" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle>Key Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedVendorData.milestones.map((milestone: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <span className="text-sm font-semibold">{milestone.week}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{milestone.phase}</h4>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                    <Badge variant="outline">Week {milestone.week}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resource Allocation */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {Object.entries(selectedVendorData.resources).map(([role, count]) => (
                    <div key={role} className="flex items-center justify-between">
                      <span className="font-medium">
                        {role.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </span>
                      <Badge variant="secondary">
                        {safeNumber(count, 0)} person{safeNumber(count, 0) !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Readiness Assessment</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Readiness</span>
                        <span>{selectedVendorData.readinessScore}%</span>
                      </div>
                      <Progress value={selectedVendorData.readinessScore} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment & Mitigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedVendorData.risks.length > 0 ? (
                  selectedVendorData.risks.map((risk: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{risk.type}</h4>
                        <Badge
                          variant={
                            risk.level === "high" ? "destructive" : risk.level === "medium" ? "default" : "secondary"
                          }
                        >
                          {risk.level} risk
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{risk.impact}</p>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Mitigation:</span>
                        <span className="text-sm">{risk.mitigation}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <p>Low risk implementation profile</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Implementation Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalWeeks" fill="#00D4AA" name="Total Weeks" />
                  <Bar dataKey="readinessScore" fill="#0EA5E9" name="Readiness Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {vendorTimelines.map((timeline, index) => (
              <Card key={timeline?.vendorId || index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {timeline?.vendorName}
                    <Badge
                      variant={
                        timeline?.complexity === "low"
                          ? "secondary"
                          : timeline?.complexity === "high" || timeline?.complexity === "very high"
                            ? "destructive"
                            : "default"
                      }
                    >
                      {timeline?.complexity} complexity
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-semibold">{timeline?.totalWeeks} weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Team Size:</span>
                      <span className="font-semibold">
                        {Object.values(timeline?.resources || {}).reduce((sum, count) => sum + safeNumber(count, 0), 0)}{" "}
                        people
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Readiness:</span>
                      <span className="font-semibold">{timeline?.readinessScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Factors:</span>
                      <span className="font-semibold">{timeline?.risks?.length || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gantt" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Gantt Chart</CardTitle>
              <p className="text-sm text-muted-foreground">
                Week-by-week breakdown of {selectedVendorData.vendorName} implementation
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={ganttData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  {Object.keys(selectedVendorData.phases).map((phase, index) => (
                    <Area
                      key={phase}
                      type="monotone"
                      dataKey={phase}
                      stackId="1"
                      stroke={COLORS[index % COLORS.length]}
                      fill={COLORS[index % COLORS.length]}
                      fillOpacity={0.6}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phase Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(selectedVendorData.phases).map(([phase, weeks], index) => (
                  <div key={phase} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <h4 className="font-semibold capitalize">{phase}</h4>
                    </div>
                    <p className="text-2xl font-bold">{safeNumber(weeks, 0)} weeks</p>
                    <p className="text-sm text-muted-foreground">
                      {Math.round((safeNumber(weeks, 0) / selectedVendorData.totalWeeks) * 100)}% of total time
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
