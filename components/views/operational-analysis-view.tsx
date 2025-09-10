"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts"
import { Users, Clock, Zap, CheckCircle2, Brain, Gauge, HeartHandshake, Timer } from "lucide-react"

interface OperationalAnalysisViewProps {
  results: any[]
  config: any
}

export default function OperationalAnalysisView({ results, config }: OperationalAnalysisViewProps) {
  const portnoxResult = results.find((r) => r.vendor === "portnox")

  // Operational efficiency metrics
  const efficiencyMetrics = useMemo(() => {
    return results.map((r) => {
      const vendorData = r.vendorData || {}
      const operational = r.operational || {}
      const operationalMetrics = vendorData.operationalMetrics || {}

      const adminEfficiency = 100 - (operationalMetrics.adminEffort || 5) * 10
      const timeEfficiency = 100 - (operational.maintenanceWindows || 2) * 8
      const troubleshootingEfficiency = 100 - (operational.mttr || 2) * 10
      const automationLevel = operational.automationLevel || 40
      const overallEfficiency = (adminEfficiency + timeEfficiency + troubleshootingEfficiency + automationLevel) / 4

      return {
        vendor: r.vendorName,
        vendorId: r.vendor,
        adminEfficiency,
        timeEfficiency,
        troubleshootingEfficiency,
        automationLevel,
        overallEfficiency,
        adminEffort: operationalMetrics.adminEffort || 5,
        maintenanceWindows: operational.maintenanceWindows || 2,
        mttr: operational.mttr || 2,
      }
    })
  }, [results])

  // Staffing and skills analysis
  const staffingAnalysis = useMemo(() => {
    return results.map((r) => {
      const vendorData = r.vendorData || {}
      const operational = r.operational || {}
      const operationalMetrics = vendorData.operationalMetrics || {}
      const staffingRequirements = operationalMetrics.staffingRequirements || {}

      const administrators = staffingRequirements.administrators || 2
      const specialists = staffingRequirements.specialists || 1
      const totalFTE = administrators + specialists
      const trainingDays = staffingRequirements.trainingDays || 10
      const skillComplexity =
        operationalMetrics.upgradeComplexity === "complex"
          ? 90
          : operationalMetrics.upgradeComplexity === "moderate"
            ? 60
            : 30

      const annualStaffCost = totalFTE * 125000
      const annualTrainingCost = trainingDays * 1000 * totalFTE
      const monthlyMaintenance = operationalMetrics.operationalCosts?.monthlyMaintenance || 5000
      const totalOperationalCost = annualStaffCost + annualTrainingCost + monthlyMaintenance * 12

      return {
        vendor: r.vendorName,
        vendorId: r.vendor,
        administrators,
        specialists,
        totalFTE,
        trainingDays,
        skillComplexity,
        annualStaffCost,
        annualTrainingCost,
        totalOperationalCost,
        fteSaved: operational.fteSaved || 0,
      }
    })
  }, [results])

  // Automation capabilities analysis
  const automationAnalysis = useMemo(() => {
    const categories = [
      "Policy Management",
      "User Provisioning",
      "Device Onboarding",
      "Compliance Reporting",
      "Incident Response",
      "Patch Management",
      "Audit Logging",
      "Integration APIs",
    ]

    return categories.map((category) => {
      const dataPoint: any = { category }

      results.forEach((r) => {
        const vendorData = r.vendorData || {}
        const operational = r.operational || {}
        const features = vendorData.features || {}
        const advanced = features.advanced || {}
        const core = features.core || {}
        const compliance = vendorData.compliance || {}
        const operationalMetrics = vendorData.operationalMetrics || {}

        let score = 0
        const baseAutomation = operational.automationLevel || 40

        switch (category) {
          case "Policy Management":
            score = advanced.aiDriven ? baseAutomation : baseAutomation * 0.7
            break
          case "User Provisioning":
            score = vendorData.scalability?.cloudNative ? baseAutomation * 0.95 : baseAutomation * 0.6
            break
          case "Device Onboarding":
            score = core.agentless ? baseAutomation * 0.9 : baseAutomation * 0.5
            break
          case "Compliance Reporting":
            score = compliance.automatedCompliance ? baseAutomation : baseAutomation * 0.4
            break
          case "Incident Response":
            score = advanced.aiDriven ? baseAutomation * 0.85 : baseAutomation * 0.5
            break
          case "Patch Management":
            score = vendorData.category === "cloud" ? 95 : 40
            break
          case "Audit Logging":
            score = baseAutomation * 0.8
            break
          case "Integration APIs":
            score = operationalMetrics.apiAvailability ? baseAutomation : 30
            break
        }

        dataPoint[r.vendorName] = Math.round(score)
      })

      return dataPoint
    })
  }, [results])

  // Operational maturity model
  const maturityModel = useMemo(() => {
    return results.map((r) => {
      const vendorData = r.vendorData || {}
      const operational = r.operational || {}
      const features = vendorData.features || {}
      const core = features.core || {}
      const operationalMetrics = vendorData.operationalMetrics || {}

      const dimensions = {
        "Process Automation": operational.automationLevel || 40,
        "Self-Service": core.guestAccess && core.byod ? 80 : 40,
        "Monitoring & Analytics":
          operationalMetrics.reportingCapabilities === "advanced"
            ? 90
            : operationalMetrics.reportingCapabilities === "standard"
              ? 60
              : 30,
        "Integration Maturity": operationalMetrics.apiAvailability ? 85 : 40,
        "Change Management":
          operationalMetrics.upgradeComplexity === "automatic"
            ? 95
            : operationalMetrics.upgradeComplexity === "low"
              ? 70
              : operationalMetrics.upgradeComplexity === "moderate"
                ? 50
                : 20,
      }

      const overallMaturity =
        Object.values(dimensions).reduce((sum, val) => sum + val, 0) / Object.keys(dimensions).length

      return {
        vendor: r.vendorName,
        vendorId: r.vendor,
        dimensions,
        overallMaturity,
        maturityLevel:
          overallMaturity >= 80
            ? "Optimized"
            : overallMaturity >= 65
              ? "Managed"
              : overallMaturity >= 50
                ? "Defined"
                : overallMaturity >= 35
                  ? "Repeatable"
                  : "Initial",
      }
    })
  }, [results])

  // Daily operational impact
  const dailyImpact = useMemo(() => {
    return results.map((r) => {
      const operational = r.operational || {}
      const vendorData = r.vendorData || {}
      const operationalMetrics = vendorData.operationalMetrics || {}

      const dailyTasks = {
        "User Management": ((100 - (operational.automationLevel || 40)) * 2) / 100,
        "Policy Updates": (operationalMetrics.adminEffort || 5) * 0.5,
        Troubleshooting: (operational.mttr || 2) * 0.3,
        Reporting: operationalMetrics.reportingCapabilities === "advanced" ? 0.5 : 2,
        Maintenance: (operational.maintenanceWindows || 2) / 30,
      }

      const totalDailyHours = Object.values(dailyTasks).reduce((sum, hours) => sum + hours, 0)

      return {
        vendor: r.vendorName,
        vendorId: r.vendor,
        dailyTasks,
        totalDailyHours,
        efficiency: 100 - (totalDailyHours / 8) * 100,
      }
    })
  }, [results])

  // Colors
  const COLORS = {
    portnox: "#3B82F6",
    excellent: "#10B981",
    good: "#3B82F6",
    moderate: "#F59E0B",
    poor: "#EF4444",
    categories: ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#14B8A6"],
  }

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 85) return COLORS.excellent
    if (efficiency >= 70) return COLORS.good
    if (efficiency >= 50) return COLORS.moderate
    return COLORS.poor
  }

  return (
    <div className="space-y-6">
      {/* Operational Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-600" />
              Highest Automation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.max(...results.map((r) => r.operational?.automationLevel || 40))}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {
                results.find(
                  (r) =>
                    (r.operational?.automationLevel || 40) ===
                    Math.max(...results.map((r) => r.operational?.automationLevel || 40)),
                )?.vendorName
              }
            </p>
            <Progress
              value={Math.max(...results.map((r) => r.operational?.automationLevel || 40))}
              className="mt-2 h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-green-600" />
              FTE Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.max(...results.map((r) => r.operational?.fteSaved || 0)).toFixed(1)} FTE
            </div>
            <p className="text-xs text-muted-foreground mt-1">maximum staff reduction</p>
            <Badge variant="outline" className="mt-2 text-xs">
              ${(Math.max(...results.map((r) => r.operational?.fteSaved || 0)) * 125000).toLocaleString()}/year
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              Admin Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.max(...efficiencyMetrics.map((m) => m.overallEfficiency)).toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">operational efficiency</p>
            <div className="flex gap-1 mt-2">
              {results.map((r) => {
                const efficiency = efficiencyMetrics.find((m) => m.vendorId === r.vendor)?.overallEfficiency || 0
                return (
                  <div
                    key={r.vendor}
                    className="h-2 flex-1 rounded"
                    style={{ backgroundColor: getEfficiencyColor(efficiency) }}
                    title={`${r.vendorName}: ${efficiency.toFixed(0)}%`}
                  />
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Timer className="h-4 w-4 text-purple-600" />
              Fastest MTTR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.min(...results.map((r) => r.operational?.mttr || 2)).toFixed(1)}h
            </div>
            <p className="text-xs text-muted-foreground mt-1">mean time to resolve</p>
            {portnoxResult && (
              <Badge
                variant={
                  portnoxResult.operational?.mttr === Math.min(...results.map((r) => r.operational?.mttr || 2))
                    ? "default"
                    : "outline"
                }
                className="mt-2 text-xs"
              >
                Portnox: {(portnoxResult.operational?.mttr || 2).toFixed(1)}h
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Operational Analysis */}
      <Tabs defaultValue="efficiency" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="efficiency">Efficiency Analysis</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="staffing">Staffing & Skills</TabsTrigger>
          <TabsTrigger value="maturity">Maturity Model</TabsTrigger>
        </TabsList>

        <TabsContent value="efficiency" className="space-y-6">
          {/* Overall Efficiency Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Efficiency Analysis</CardTitle>
              <CardDescription>Multi-dimensional efficiency assessment across key operational areas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={efficiencyMetrics}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="vendor" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value: number) => `${value.toFixed(0)}%`} />
                  <Legend />
                  <Bar dataKey="adminEfficiency" fill="#10B981" name="Admin Efficiency" />
                  <Bar dataKey="timeEfficiency" fill="#3B82F6" name="Time Efficiency" />
                  <Bar dataKey="troubleshootingEfficiency" fill="#F59E0B" name="Troubleshooting" />
                  <Bar dataKey="automationLevel" fill="#8B5CF6" name="Automation" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Daily Operational Impact */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Operational Hours</CardTitle>
                <CardDescription>Estimated daily admin time requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyImpact} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" domain={[0, 8]} />
                    <YAxis dataKey="vendor" type="category" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value: number) => `${value.toFixed(1)}h`} />
                    <Bar
                      dataKey="totalDailyHours"
                      fill={COLORS.portnox}
                      name="Daily Hours Required"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Task Distribution</CardTitle>
                <CardDescription>Daily operational task breakdown (hours)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.keys(dailyImpact[0].dailyTasks).map((task) => (
                    <div key={task} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{task}</span>
                        <span className="text-xs text-muted-foreground">
                          {dailyImpact
                            .reduce((min, d) => Math.min(min, d.dailyTasks[task as keyof typeof d.dailyTasks]), 8)
                            .toFixed(1)}
                          h -
                          {dailyImpact
                            .reduce((max, d) => Math.max(max, d.dailyTasks[task as keyof typeof d.dailyTasks]), 0)
                            .toFixed(1)}
                          h
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {dailyImpact
                          .sort(
                            (a, b) =>
                              a.dailyTasks[task as keyof typeof a.dailyTasks] -
                              b.dailyTasks[task as keyof typeof b.dailyTasks],
                          )
                          .map((impact) => (
                            <div
                              key={impact.vendorId}
                              className="flex-1 h-4 rounded flex items-center justify-center text-xs font-medium"
                              style={{
                                backgroundColor: getEfficiencyColor(
                                  100 - (impact.dailyTasks[task as keyof typeof impact.dailyTasks] / 2) * 100,
                                ),
                                color:
                                  impact.dailyTasks[task as keyof typeof impact.dailyTasks] < 1 ? "white" : "inherit",
                              }}
                              title={`${impact.vendor}: ${impact.dailyTasks[task as keyof typeof impact.dailyTasks].toFixed(1)}h`}
                            >
                              {impact.dailyTasks[task as keyof typeof impact.dailyTasks] < 0.5 && "✓"}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          {/* Automation Capabilities Radar */}
          <Card>
            <CardHeader>
              <CardTitle>Automation Capabilities Analysis</CardTitle>
              <CardDescription>Automated functionality across key operational areas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={automationAnalysis}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="category" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  {results.slice(0, 4).map((result, index) => (
                    <Radar
                      key={result.vendor}
                      name={result.vendorName}
                      dataKey={result.vendorName}
                      stroke={
                        result.vendor === "portnox"
                          ? COLORS.portnox
                          : COLORS.categories[index % COLORS.categories.length]
                      }
                      fill={
                        result.vendor === "portnox"
                          ? COLORS.portnox
                          : COLORS.categories[index % COLORS.categories.length]
                      }
                      fillOpacity={result.vendor === "portnox" ? 0.3 : 0.1}
                      strokeWidth={result.vendor === "portnox" ? 2 : 1}
                    />
                  ))}
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Automation Benefits */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Automation Level Impact</CardTitle>
                <CardDescription>Correlation between automation and operational savings</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="automationLevel" name="Automation Level" unit="%" domain={[0, 100]} />
                    <YAxis
                      dataKey="annualOpsSaving"
                      name="Annual Savings"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <ZAxis dataKey="vendor" name="Vendor" />
                    <Tooltip
                      formatter={(value: any, name: string) => {
                        if (name === "Annual Savings") return `$${value.toLocaleString()}`
                        if (name === "Automation Level") return `${value}%`
                        return value
                      }}
                    />
                    <Scatter
                      data={results.map((r) => ({
                        vendor: r.vendorName,
                        automationLevel: r.operational?.automationLevel || 40,
                        annualOpsSaving: r.operational?.annualOpsSaving || 50000,
                        isPortnox: r.vendor === "portnox",
                      }))}
                      fill={COLORS.portnox}
                    >
                      {results.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.vendor === "portnox" ? COLORS.portnox : COLORS.moderate}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Automation Readiness</CardTitle>
                <CardDescription>Key automation enablers by vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["API Availability", "Cloud Management", "AI/ML Capabilities", "Self-Service"].map((feature) => {
                    const vendorsWithFeature = results.filter((r) => {
                      const vendorData = r.vendorData || {}
                      const operationalMetrics = vendorData.operationalMetrics || {}
                      const features = vendorData.features || {}
                      const advanced = features.advanced || {}
                      const core = features.core || {}

                      switch (feature) {
                        case "API Availability":
                          return operationalMetrics.apiAvailability
                        case "Cloud Management":
                          return operationalMetrics.cloudManagement
                        case "AI/ML Capabilities":
                          return advanced.aiDriven
                        case "Self-Service":
                          return core.guestAccess && core.byod
                        default:
                          return false
                      }
                    })

                    return (
                      <div key={feature} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{feature}</span>
                          <Badge variant="outline" className="text-xs">
                            {vendorsWithFeature.length}/{results.length} vendors
                          </Badge>
                        </div>
                        <div className="flex gap-1">
                          {results.map((r) => {
                            const hasFeature = vendorsWithFeature.some((v) => v.vendor === r.vendor)
                            return (
                              <div
                                key={r.vendor}
                                className={`h-6 flex-1 rounded flex items-center justify-center ${
                                  hasFeature ? (r.vendor === "portnox" ? "bg-blue-600" : "bg-green-500") : "bg-gray-300"
                                }`}
                                title={r.vendorName}
                              >
                                {hasFeature && <CheckCircle2 className="h-3 w-3 text-white" />}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staffing" className="space-y-6">
          {/* Staffing Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Staffing & Resource Requirements</CardTitle>
              <CardDescription>Personnel needs and associated costs by vendor</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={staffingAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="vendor" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis yAxisId="left" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => {
                      if (name.includes("Cost")) return `$${value.toLocaleString()}`
                      return value.toFixed(1)
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="administrators" stackId="a" fill="#10B981" name="Administrators" />
                  <Bar yAxisId="left" dataKey="specialists" stackId="a" fill="#3B82F6" name="Specialists" />
                  <Bar yAxisId="right" dataKey="totalOperationalCost" fill="#EF4444" name="Annual Op Cost" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Skills and Training */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Training Requirements</CardTitle>
                <CardDescription>Initial training days and complexity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {staffingAnalysis
                    .sort((a, b) => a.trainingDays - b.trainingDays)
                    .map((vendor) => (
                      <div key={vendor.vendorId} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{vendor.vendor}</span>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                vendor.skillComplexity <= 30
                                  ? "default"
                                  : vendor.skillComplexity <= 60
                                    ? "secondary"
                                    : "destructive"
                              }
                              className="text-xs"
                            >
                              {vendor.skillComplexity <= 30 ? "Low" : vendor.skillComplexity <= 60 ? "Medium" : "High"}{" "}
                              Complexity
                            </Badge>
                            <span className="text-sm font-medium">{vendor.trainingDays} days</span>
                          </div>
                        </div>
                        <Progress value={100 - vendor.skillComplexity} className="h-2" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">FTE Efficiency Analysis</CardTitle>
                <CardDescription>Required vs. saved FTE comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={staffingAnalysis} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" domain={[-3, 3]} />
                    <YAxis dataKey="vendor" type="category" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value: number) => `${Math.abs(value).toFixed(1)} FTE`} />
                    <Bar dataKey="totalFTE" fill={COLORS.poor} name="Required FTE" />
                    <Bar dataKey={(data: any) => -data.fteSaved} fill={COLORS.excellent} name="FTE Saved" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maturity" className="space-y-6">
          {/* Operational Maturity Model */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Maturity Assessment</CardTitle>
              <CardDescription>Evaluation across key operational maturity dimensions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {maturityModel
                  .sort((a, b) => b.overallMaturity - a.overallMaturity)
                  .map((vendor) => (
                    <div key={vendor.vendorId} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{vendor.vendor}</span>
                          <Badge
                            variant={
                              vendor.maturityLevel === "Optimized"
                                ? "default"
                                : vendor.maturityLevel === "Managed"
                                  ? "secondary"
                                  : vendor.maturityLevel === "Defined"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {vendor.maturityLevel}
                          </Badge>
                        </div>
                        <span className="text-sm font-semibold">{vendor.overallMaturity.toFixed(0)}%</span>
                      </div>
                      <div className="space-y-2">
                        {Object.entries(vendor.dimensions).map(([dimension, score]) => (
                          <div key={dimension} className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground min-w-[140px]">{dimension}</span>
                            <Progress value={score} className="flex-1 h-2" />
                            <span className="text-xs font-medium min-w-[40px] text-right">{score}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Maturity Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Maturity Level Distribution</CardTitle>
              <CardDescription>Vendors grouped by operational maturity level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {["Optimized", "Managed", "Defined", "Repeatable", "Initial"].map((level) => {
                  const vendorsAtLevel = maturityModel.filter((m) => m.maturityLevel === level)
                  if (vendorsAtLevel.length === 0) return null

                  return (
                    <Alert
                      key={level}
                      className={
                        level === "Optimized"
                          ? "border-green-200 dark:border-green-800"
                          : level === "Managed"
                            ? "border-blue-200 dark:border-blue-800"
                            : level === "Defined"
                              ? "border-amber-200 dark:border-amber-800"
                              : ""
                      }
                    >
                      <AlertTitle className="flex items-center justify-between">
                        {level} Level
                        <Badge variant="outline" className="ml-2">
                          {vendorsAtLevel.length} vendor{vendorsAtLevel.length > 1 ? "s" : ""}
                        </Badge>
                      </AlertTitle>
                      <AlertDescription className="mt-2">
                        <div className="flex flex-wrap gap-2">
                          {vendorsAtLevel.map((v) => (
                            <Badge key={v.vendorId} variant={v.vendorId === "portnox" ? "default" : "secondary"}>
                              {v.vendor} ({v.overallMaturity.toFixed(0)}%)
                            </Badge>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Operational Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Operational Excellence Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {portnoxResult &&
            efficiencyMetrics.find((m) => m.vendorId === "portnox")?.overallEfficiency ===
              Math.max(...efficiencyMetrics.map((m) => m.overallEfficiency)) && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <Gauge className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900 dark:text-green-100">Leading Operational Efficiency</h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Portnox achieves{" "}
                    {efficiencyMetrics.find((m) => m.vendorId === "portnox")?.overallEfficiency.toFixed(0)}% operational
                    efficiency through {portnoxResult.operational?.automationLevel || 85}% automation, saving{" "}
                    {(portnoxResult.operational?.fteSaved || 1.9).toFixed(1)} FTE and $
                    {(portnoxResult.operational?.annualOpsSaving || 237500).toLocaleString()} annually in operational
                    costs.
                  </p>
                </div>
              </div>
            )}

          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
            <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">Automation Impact Analysis</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Vendors with automation levels above 80% (
                {results
                  .filter((r) => (r.operational?.automationLevel || 40) > 80)
                  .map((r) => r.vendorName)
                  .join(", ")}
                ) reduce daily operational overhead by an average of{" "}
                {dailyImpact
                  .filter((d) =>
                    results.find((r) => r.vendorName === d.vendor && (r.operational?.automationLevel || 40) > 80),
                  )
                  .reduce((sum, d) => sum + d.efficiency, 0) /
                  Math.max(
                    1,
                    dailyImpact.filter((d) =>
                      results.find((r) => r.vendorName === d.vendor && (r.operational?.automationLevel || 40) > 80),
                    ).length,
                  )}
                %, freeing IT staff for strategic initiatives.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
            <HeartHandshake className="h-5 w-5 text-purple-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-purple-900 dark:text-purple-100">Skills & Training Considerations</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                Cloud-native solutions require{" "}
                {Math.round(
                  staffingAnalysis
                    .filter((s) =>
                      results.find((r) => r.vendorName === s.vendor && r.vendorData?.scalability?.cloudNative),
                    )
                    .reduce((sum, s) => sum + s.trainingDays, 0) /
                    Math.max(
                      1,
                      staffingAnalysis.filter((s) =>
                        results.find((r) => r.vendorName === s.vendor && r.vendorData?.scalability?.cloudNative),
                      ).length,
                    ),
                )}{" "}
                days of training on average, compared to{" "}
                {Math.round(
                  staffingAnalysis
                    .filter((s) =>
                      results.find((r) => r.vendorName === s.vendor && !r.vendorData?.scalability?.cloudNative),
                    )
                    .reduce((sum, s) => sum + s.trainingDays, 0) /
                    Math.max(
                      1,
                      staffingAnalysis.filter((s) =>
                        results.find((r) => r.vendorName === s.vendor && !r.vendorData?.scalability?.cloudNative),
                      ).length,
                    ),
                )}{" "}
                days for traditional solutions, accelerating time to productivity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
