"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts"
import {
  Users,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle,
  Target,
  Activity,
  Gauge,
  Wrench,
  UserCheck,
  Timer,
  Award,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface OperationsImpactViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function OperationsImpactView({ results = [], config }: OperationsImpactViewProps) {
  const operationalData = useMemo(() => {
    if (results.length === 0) return null

    const portnoxResult = results.find((r) => r.vendorId === "portnox")
    const traditionalResults = results.filter((r) => r.vendorId !== "portnox")

    if (!portnoxResult || traditionalResults.length === 0) return null

    // Safe access with default values for operational metrics
    const portnoxOps = {
      dailyAdminHours: portnoxResult.vendorData?.operations?.dailyAdminHours || 0.5,
      monthlyMaintenanceHours: portnoxResult.vendorData?.operations?.monthlyMaintenanceHours || 2,
      incidentResponseTime: portnoxResult.vendorData?.operations?.incidentResponseTime || 15,
      automationLevel: portnoxResult.vendorData?.operations?.automationLevel || 95,
      staffingRequirement: portnoxResult.vendorData?.operations?.staffingRequirement || 0.2,
      trainingHours: portnoxResult.vendorData?.implementation?.trainingHours || 2,
    }

    const traditionalAvg = traditionalResults.reduce(
      (acc, result) => {
        const ops = result.vendorData?.operations || {}
        return {
          dailyAdminHours: acc.dailyAdminHours + (ops.dailyAdminHours || 4),
          monthlyMaintenanceHours: acc.monthlyMaintenanceHours + (ops.monthlyMaintenanceHours || 40),
          incidentResponseTime: acc.incidentResponseTime + (ops.incidentResponseTime || 120),
          automationLevel: acc.automationLevel + (ops.automationLevel || 30),
          staffingRequirement: acc.staffingRequirement + (ops.staffingRequirement || 2.5),
          trainingHours: acc.trainingHours + (result.vendorData?.implementation?.trainingHours || 40),
        }
      },
      {
        dailyAdminHours: 0,
        monthlyMaintenanceHours: 0,
        incidentResponseTime: 0,
        automationLevel: 0,
        staffingRequirement: 0,
        trainingHours: 0,
      },
    )

    const count = traditionalResults.length
    const traditionalOps = {
      dailyAdminHours: traditionalAvg.dailyAdminHours / count,
      monthlyMaintenanceHours: traditionalAvg.monthlyMaintenanceHours / count,
      incidentResponseTime: traditionalAvg.incidentResponseTime / count,
      automationLevel: traditionalAvg.automationLevel / count,
      staffingRequirement: traditionalAvg.staffingRequirement / count,
      trainingHours: traditionalAvg.trainingHours / count,
    }

    return {
      portnox: portnoxOps,
      traditional: traditionalOps,
      savings: {
        dailyHoursSaved: traditionalOps.dailyAdminHours - portnoxOps.dailyAdminHours,
        monthlyHoursSaved: traditionalOps.monthlyMaintenanceHours - portnoxOps.monthlyMaintenanceHours,
        responseTimeImprovement: traditionalOps.incidentResponseTime - portnoxOps.incidentResponseTime,
        automationIncrease: portnoxOps.automationLevel - traditionalOps.automationLevel,
        staffingReduction: traditionalOps.staffingRequirement - portnoxOps.staffingRequirement,
        trainingReduction: traditionalOps.trainingHours - portnoxOps.trainingHours,
      },
    }
  }, [results])

  const efficiencyData = useMemo(() => {
    if (!operationalData) return []

    return [
      {
        metric: "Daily Admin Hours",
        portnox: operationalData.portnox.dailyAdminHours,
        traditional: operationalData.traditional.dailyAdminHours,
        improvement: Math.round(
          ((operationalData.traditional.dailyAdminHours - operationalData.portnox.dailyAdminHours) /
            operationalData.traditional.dailyAdminHours) *
            100,
        ),
      },
      {
        metric: "Monthly Maintenance",
        portnox: operationalData.portnox.monthlyMaintenanceHours,
        traditional: operationalData.traditional.monthlyMaintenanceHours,
        improvement: Math.round(
          ((operationalData.traditional.monthlyMaintenanceHours - operationalData.portnox.monthlyMaintenanceHours) /
            operationalData.traditional.monthlyMaintenanceHours) *
            100,
        ),
      },
      {
        metric: "Incident Response (min)",
        portnox: operationalData.portnox.incidentResponseTime,
        traditional: operationalData.traditional.incidentResponseTime,
        improvement: Math.round(
          ((operationalData.traditional.incidentResponseTime - operationalData.portnox.incidentResponseTime) /
            operationalData.traditional.incidentResponseTime) *
            100,
        ),
      },
      {
        metric: "Staffing (FTEs)",
        portnox: operationalData.portnox.staffingRequirement,
        traditional: operationalData.traditional.staffingRequirement,
        improvement: Math.round(
          ((operationalData.traditional.staffingRequirement - operationalData.portnox.staffingRequirement) /
            operationalData.traditional.staffingRequirement) *
            100,
        ),
      },
    ]
  }, [operationalData])

  const automationData = useMemo(() => {
    if (!operationalData) return []

    return [
      {
        name: "Portnox CLEAR",
        automation: operationalData.portnox.automationLevel,
        manual: 100 - operationalData.portnox.automationLevel,
      },
      {
        name: "Traditional NAC",
        automation: operationalData.traditional.automationLevel,
        manual: 100 - operationalData.traditional.automationLevel,
      },
    ]
  }, [operationalData])

  const taskBreakdownData = useMemo(() => {
    if (!operationalData) return []

    return [
      { task: "Policy Management", portnox: 10, traditional: 120, color: "#10b981" },
      { task: "User Provisioning", portnox: 5, traditional: 60, color: "#3b82f6" },
      { task: "Device Onboarding", portnox: 2, traditional: 45, color: "#8b5cf6" },
      { task: "Incident Response", portnox: 15, traditional: 120, color: "#f59e0b" },
      { task: "System Maintenance", portnox: 30, traditional: 240, color: "#ef4444" },
      { task: "Reporting & Compliance", portnox: 10, traditional: 90, color: "#06b6d4" },
    ]
  }, [operationalData])

  const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#06b6d4"]

  if (results.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
        <CardContent className="pt-6 text-center text-muted-foreground">
          <div className="flex flex-col items-center gap-4">
            <Activity className="h-12 w-12 text-slate-400" />
            <p className="text-lg font-medium">No Operations Data Available</p>
            <p className="text-sm">Please select vendors to compare operational impact and efficiency metrics.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!operationalData) {
    return (
      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
        <CardContent className="pt-6 text-center text-muted-foreground">
          <div className="flex flex-col items-center gap-4">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
            <p className="text-lg font-medium">Insufficient Data for Comparison</p>
            <p className="text-sm">Please select both Portnox and traditional NAC vendors for operational analysis.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Executive Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800">Daily Admin Time</CardTitle>
            <Clock className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-700">
              {operationalData.savings.dailyHoursSaved.toFixed(1)}h
            </div>
            <p className="text-xs text-emerald-600 mt-1">saved per day</p>
            <div className="text-xs text-emerald-600 mt-1">
              {Math.round(
                (operationalData.savings.dailyHoursSaved / operationalData.traditional.dailyAdminHours) * 100,
              )}
              % reduction
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Staffing Reduction</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">
              {operationalData.savings.staffingReduction.toFixed(1)}
            </div>
            <p className="text-xs text-blue-600 mt-1">fewer FTEs required</p>
            <div className="text-xs text-blue-600 mt-1">
              {Math.round(
                (operationalData.savings.staffingReduction / operationalData.traditional.staffingRequirement) * 100,
              )}
              % staff reduction
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Response Time</CardTitle>
            <Timer className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">
              {operationalData.savings.responseTimeImprovement}min
            </div>
            <p className="text-xs text-purple-600 mt-1">faster incident response</p>
            <div className="text-xs text-purple-600 mt-1">
              {Math.round(
                (operationalData.savings.responseTimeImprovement / operationalData.traditional.incidentResponseTime) *
                  100,
              )}
              % improvement
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Automation Level</CardTitle>
            <Zap className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-700">{operationalData.portnox.automationLevel}%</div>
            <p className="text-xs text-amber-600 mt-1">vs {operationalData.traditional.automationLevel}% traditional</p>
            <div className="text-xs text-amber-600 mt-1">
              +{operationalData.savings.automationIncrease}% more automated
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operational Efficiency Comparison */}
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Operational Efficiency Comparison
          </CardTitle>
          <CardDescription className="text-slate-600">
            Key operational metrics comparing Portnox CLEAR vs Traditional NAC solutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={efficiencyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="metric" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="portnox" fill="url(#portnoxGradient)" name="Portnox CLEAR" radius={[4, 4, 0, 0]} />
                <Bar
                  dataKey="traditional"
                  fill="url(#traditionalGradient)"
                  name="Traditional NAC"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="portnoxGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="traditionalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Automation Level Comparison */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-indigo-800 flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Automation Levels
            </CardTitle>
            <CardDescription className="text-indigo-600">Comparison of automated vs manual processes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Automated", value: operationalData.portnox.automationLevel, fill: "#10b981" },
                      { name: "Manual", value: 100 - operationalData.portnox.automationLevel, fill: "#e5e7eb" },
                    ]}
                    cx="25%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                  />
                  <Pie
                    data={[
                      { name: "Automated", value: operationalData.traditional.automationLevel, fill: "#ef4444" },
                      { name: "Manual", value: 100 - operationalData.traditional.automationLevel, fill: "#e5e7eb" },
                    ]}
                    cx="75%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <div className="font-semibold text-emerald-700">Portnox CLEAR</div>
                <div className="text-sm text-emerald-600">{operationalData.portnox.automationLevel}% Automated</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-red-700">Traditional NAC</div>
                <div className="text-sm text-red-600">{operationalData.traditional.automationLevel}% Automated</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Task-Specific Time Savings
            </CardTitle>
            <CardDescription className="text-green-600">
              Monthly hours required for common operational tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taskBreakdownData.map((task, index) => (
                <div key={task.task} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{task.task}</span>
                    <Badge variant="outline" style={{ backgroundColor: `${task.color}20`, color: task.color }}>
                      {Math.round(((task.traditional - task.portnox) / task.traditional) * 100)}% savings
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Portnox: {task.portnox} min/month</span>
                      <span>Traditional: {task.traditional} min/month</span>
                    </div>
                    <div className="relative">
                      <Progress value={(task.portnox / task.traditional) * 100} className="h-2" />
                      <div
                        className="absolute top-0 left-0 h-2 rounded-full"
                        style={{
                          width: `${(task.portnox / task.traditional) * 100}%`,
                          backgroundColor: task.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operational Impact Summary */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Operational Impact Summary
          </CardTitle>
          <CardDescription className="text-blue-600">
            Comprehensive analysis of operational improvements with Portnox CLEAR
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white/50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <UserCheck className="h-5 w-5 text-emerald-600" />
                <span className="font-semibold text-slate-800">Staff Productivity</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Daily admin time saved:</span>
                  <span className="font-medium text-emerald-600">
                    {operationalData.savings.dailyHoursSaved.toFixed(1)}h
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly maintenance saved:</span>
                  <span className="font-medium text-emerald-600">{operationalData.savings.monthlyHoursSaved}h</span>
                </div>
                <div className="flex justify-between">
                  <span>Training time reduced:</span>
                  <span className="font-medium text-emerald-600">{operationalData.savings.trainingReduction}h</span>
                </div>
              </div>
            </div>

            <div className="bg-white/50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-slate-800">Security Operations</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Incident response time:</span>
                  <span className="font-medium text-blue-600">{operationalData.portnox.incidentResponseTime} min</span>
                </div>
                <div className="flex justify-between">
                  <span>Automation level:</span>
                  <span className="font-medium text-blue-600">{operationalData.portnox.automationLevel}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Policy management:</span>
                  <span className="font-medium text-blue-600">Automated</span>
                </div>
              </div>
            </div>

            <div className="bg-white/50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-slate-800">Resource Optimization</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Staffing requirement:</span>
                  <span className="font-medium text-purple-600">{operationalData.portnox.staffingRequirement} FTE</span>
                </div>
                <div className="flex justify-between">
                  <span>Staff reduction:</span>
                  <span className="font-medium text-purple-600">
                    {operationalData.savings.staffingReduction.toFixed(1)} FTE
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Efficiency gain:</span>
                  <span className="font-medium text-purple-600">
                    {Math.round(
                      (operationalData.savings.staffingReduction / operationalData.traditional.staffingRequirement) *
                        100,
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                Portnox CLEAR Operational Benefits
              </h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• 95% automation reduces manual intervention</li>
                <li>• Cloud-native architecture eliminates maintenance overhead</li>
                <li>• Intuitive interface minimizes training requirements</li>
                <li>• Real-time monitoring and automated incident response</li>
                <li>• Continuous updates without operational disruption</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                Traditional NAC Operational Challenges
              </h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• High manual administration overhead</li>
                <li>• Complex maintenance and update procedures</li>
                <li>• Extensive training requirements for staff</li>
                <li>• Slow incident response and resolution times</li>
                <li>• Resource-intensive ongoing operations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
