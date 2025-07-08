"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Users,
  Shield,
  Calendar,
  Target,
  Zap,
  Award,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface MigrationPlanningViewProps {
  selectedVendors: string[]
  results: any[]
  config: any
}

const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

export default function MigrationPlanningView({ selectedVendors, results, config }: MigrationPlanningViewProps) {
  const [selectedPhase, setSelectedPhase] = useState(0)
  const [expandedPhases, setExpandedPhases] = useState<number[]>([0])

  // Migration readiness assessment data
  const readinessData = [
    { category: "Infrastructure", portnox: 95, traditional: 65, maxScore: 100 },
    { category: "Security", portnox: 92, traditional: 70, maxScore: 100 },
    { category: "Organization", portnox: 88, traditional: 60, maxScore: 100 },
    { category: "Compliance", portnox: 94, traditional: 72, maxScore: 100 },
  ]

  const overallReadiness = Math.round(readinessData.reduce((sum, item) => sum + item.portnox, 0) / readinessData.length)

  // Migration phases data
  const migrationPhases = [
    {
      name: "Assessment & Planning",
      duration: "2-3 weeks",
      status: "ready",
      progress: 100,
      tasks: [
        "Current state assessment",
        "Network topology review",
        "Integration requirements mapping",
        "Risk assessment and mitigation planning",
        "Resource allocation and team formation",
      ],
      deliverables: [
        "Migration readiness report",
        "Detailed migration plan",
        "Risk mitigation strategy",
        "Resource allocation plan",
      ],
      risks: ["Incomplete discovery", "Resource constraints"],
      cost: 15000,
    },
    {
      name: "Preparation & Setup",
      duration: "3-4 weeks",
      status: "in-progress",
      progress: 65,
      tasks: [
        "Portnox CLEAR environment setup",
        "Integration configuration",
        "Policy framework design",
        "Test environment preparation",
        "Team training and certification",
      ],
      deliverables: [
        "Configured Portnox environment",
        "Integration test results",
        "Policy templates",
        "Trained team members",
      ],
      risks: ["Integration complexity", "Training delays"],
      cost: 25000,
    },
    {
      name: "Pilot Deployment",
      duration: "4-6 weeks",
      status: "pending",
      progress: 0,
      tasks: [
        "Select pilot user groups",
        "Deploy to pilot environment",
        "Monitor and validate functionality",
        "Gather user feedback",
        "Refine policies and procedures",
      ],
      deliverables: [
        "Pilot deployment report",
        "User feedback analysis",
        "Refined policies",
        "Go/No-go recommendation",
      ],
      risks: ["User resistance", "Performance issues"],
      cost: 20000,
    },
    {
      name: "Production Rollout",
      duration: "6-8 weeks",
      status: "pending",
      progress: 0,
      tasks: [
        "Phased production deployment",
        "Legacy system decommissioning",
        "User onboarding and support",
        "Performance monitoring",
        "Issue resolution and optimization",
      ],
      deliverables: [
        "Production deployment",
        "Decommissioned legacy systems",
        "User training completion",
        "Performance baseline",
      ],
      risks: ["Deployment issues", "User adoption"],
      cost: 35000,
    },
    {
      name: "Optimization & Closure",
      duration: "2-3 weeks",
      status: "pending",
      progress: 0,
      tasks: [
        "Performance optimization",
        "Final documentation",
        "Knowledge transfer",
        "Project closure activities",
        "Success metrics validation",
      ],
      deliverables: ["Optimized system", "Complete documentation", "Project closure report", "Success metrics report"],
      risks: ["Knowledge gaps", "Incomplete documentation"],
      cost: 10000,
    },
  ]

  // Cost comparison data
  const costComparisonData = [
    { category: "Professional Services", portnox: 45000, traditional: 120000 },
    { category: "Training & Certification", portnox: 15000, traditional: 45000 },
    { category: "Infrastructure Setup", portnox: 0, traditional: 80000 },
    { category: "Downtime & Disruption", portnox: 0, traditional: 25000 },
  ]

  const totalPortnoxCost = costComparisonData.reduce((sum, item) => sum + item.portnox, 0)
  const totalTraditionalCost = costComparisonData.reduce((sum, item) => sum + item.traditional, 0)
  const savings = totalTraditionalCost - totalPortnoxCost
  const savingsPercentage = Math.round((savings / totalTraditionalCost) * 100)

  // Risk assessment data
  const riskData = [
    { risk: "Downtime", portnox: 1, traditional: 8, impact: "High" },
    { risk: "Data Loss", portnox: 1, traditional: 6, impact: "Critical" },
    { risk: "Security Gaps", portnox: 2, traditional: 7, impact: "High" },
    { risk: "User Disruption", portnox: 2, traditional: 8, impact: "Medium" },
    { risk: "Integration Issues", portnox: 3, traditional: 9, impact: "High" },
    { risk: "Timeline Delays", portnox: 2, traditional: 7, impact: "Medium" },
  ]

  // Resource planning data
  const resourceData = [
    { role: "Project Manager", allocation: "100%", duration: "17 weeks", cost: 45000 },
    { role: "Network Engineer", allocation: "75%", duration: "12 weeks", cost: 36000 },
    { role: "Security Architect", allocation: "50%", duration: "8 weeks", cost: 28000 },
    { role: "System Administrator", allocation: "60%", duration: "10 weeks", cost: 24000 },
    { role: "Training Coordinator", allocation: "25%", duration: "6 weeks", cost: 9000 },
    { role: "Change Manager", allocation: "40%", duration: "15 weeks", cost: 18000 },
  ]

  const totalResourceCost = resourceData.reduce((sum, item) => sum + item.cost, 0)
  const totalFTE = resourceData.reduce((sum, item) => sum + Number.parseFloat(item.allocation) / 100, 0)

  const togglePhaseExpansion = (phaseIndex: number) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseIndex) ? prev.filter((i) => i !== phaseIndex) : [...prev, phaseIndex],
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "pending":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-100 text-green-800">Ready</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Migration Planning & Readiness Assessment</h2>
          <p className="text-muted-foreground">
            Comprehensive migration strategy with readiness assessment and risk analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Review
          </Button>
          <Button>
            <Target className="mr-2 h-4 w-4" />
            Start Migration
          </Button>
        </div>
      </div>

      {/* Overall Readiness Score */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Migration Readiness Score</h3>
              <p className="text-muted-foreground">Based on infrastructure, security, organization, and compliance</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">{overallReadiness}%</div>
              <Badge className="bg-green-100 text-green-800">Excellent</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="readiness" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="readiness">Readiness Assessment</TabsTrigger>
          <TabsTrigger value="timeline">Migration Timeline</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
          <TabsTrigger value="resources">Resource Planning</TabsTrigger>
        </TabsList>

        {/* Readiness Assessment Tab */}
        <TabsContent value="readiness" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Readiness Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Readiness Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={readinessData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Portnox Migration"
                      dataKey="portnox"
                      stroke="#00D4AA"
                      fill="#00D4AA"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Traditional NAC"
                      dataKey="traditional"
                      stroke="#EF4444"
                      fill="#EF4444"
                      fillOpacity={0.6}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detailed Readiness Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Readiness Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {readinessData.map((item, index) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-sm text-muted-foreground">{item.portnox}%</span>
                    </div>
                    <Progress value={item.portnox} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {item.portnox >= 90 && "Excellent readiness"}
                      {item.portnox >= 80 && item.portnox < 90 && "Good readiness"}
                      {item.portnox >= 70 && item.portnox < 80 && "Fair readiness"}
                      {item.portnox < 70 && "Needs improvement"}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Key Readiness Factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Security Posture</p>
                    <p className="text-2xl font-bold">92%</p>
                    <p className="text-xs text-green-600">Ready for Zero Trust</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Infrastructure</p>
                    <p className="text-2xl font-bold">95%</p>
                    <p className="text-xs text-blue-600">Cloud-ready network</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Team Readiness</p>
                    <p className="text-2xl font-bold">88%</p>
                    <p className="text-xs text-purple-600">Skilled team available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Compliance</p>
                    <p className="text-2xl font-bold">94%</p>
                    <p className="text-xs text-orange-600">Audit-ready</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Migration Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>17-Week Migration Timeline</CardTitle>
              <p className="text-muted-foreground">Phased approach with minimal disruption</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {migrationPhases.map((phase, index) => (
                  <Collapsible
                    key={index}
                    open={expandedPhases.includes(index)}
                    onOpenChange={() => togglePhaseExpansion(index)}
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center space-x-4">
                          <div className={`w-4 h-4 rounded-full ${getStatusColor(phase.status)}`} />
                          <div>
                            <h4 className="font-semibold">
                              Phase {index + 1}: {phase.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">{phase.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {getStatusBadge(phase.status)}
                          <div className="text-right">
                            <p className="text-sm font-medium">${phase.cost.toLocaleString()}</p>
                            <Progress value={phase.progress} className="w-20 h-2" />
                          </div>
                          {expandedPhases.includes(index) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-4 border-t bg-muted/20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h5 className="font-medium mb-2">Key Tasks</h5>
                            <ul className="text-sm space-y-1">
                              {phase.tasks.map((task, taskIndex) => (
                                <li key={taskIndex} className="flex items-center space-x-2">
                                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Deliverables</h5>
                            <ul className="text-sm space-y-1">
                              {phase.deliverables.map((deliverable, delIndex) => (
                                <li key={delIndex} className="flex items-center space-x-2">
                                  <Target className="h-3 w-3 text-blue-600" />
                                  <span>{deliverable}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Risk Factors</h5>
                            <ul className="text-sm space-y-1">
                              {phase.risks.map((risk, riskIndex) => (
                                <li key={riskIndex} className="flex items-center space-x-2">
                                  <AlertTriangle className="h-3 w-3 text-orange-600" />
                                  <span>{risk}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost Analysis Tab */}
        <TabsContent value="costs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cost Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Migration Cost Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={costComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Cost"]} />
                    <Legend />
                    <Bar dataKey="portnox" fill="#00D4AA" name="Portnox Migration" />
                    <Bar dataKey="traditional" fill="#EF4444" name="Traditional NAC" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cost Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Portnox Migration</span>
                  <span className="text-xl font-bold text-green-600">${totalPortnoxCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">Traditional NAC</span>
                  <span className="text-xl font-bold text-red-600">${totalTraditionalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <span className="font-bold">Total Savings</span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">${savings.toLocaleString()}</div>
                    <div className="text-sm text-blue-600">{savingsPercentage}% savings</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Cost Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Category</th>
                      <th className="text-right p-2">Portnox</th>
                      <th className="text-right p-2">Traditional</th>
                      <th className="text-right p-2">Savings</th>
                      <th className="text-right p-2">% Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {costComparisonData.map((item, index) => {
                      const itemSavings = item.traditional - item.portnox
                      const itemSavingsPercent = Math.round((itemSavings / item.traditional) * 100)
                      return (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{item.category}</td>
                          <td className="text-right p-2">${item.portnox.toLocaleString()}</td>
                          <td className="text-right p-2">${item.traditional.toLocaleString()}</td>
                          <td className="text-right p-2 text-green-600 font-medium">${itemSavings.toLocaleString()}</td>
                          <td className="text-right p-2">
                            <Badge className="bg-green-100 text-green-800">{itemSavingsPercent}%</Badge>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Assessment Tab */}
        <TabsContent value="risks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Level Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="risk" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="portnox" fill="#00D4AA" name="Portnox Migration" />
                    <Bar dataKey="traditional" fill="#EF4444" name="Traditional NAC" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Risk Matrix */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {riskData.map((risk, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle
                          className={`h-4 w-4 ${
                            risk.impact === "Critical"
                              ? "text-red-600"
                              : risk.impact === "High"
                                ? "text-orange-600"
                                : "text-yellow-600"
                          }`}
                        />
                        <div>
                          <span className="font-medium">{risk.risk}</span>
                          <Badge
                            variant="outline"
                            className={`ml-2 ${
                              risk.impact === "Critical"
                                ? "border-red-200 text-red-800"
                                : risk.impact === "High"
                                  ? "border-orange-200 text-orange-800"
                                  : "border-yellow-200 text-yellow-800"
                            }`}
                          >
                            {risk.impact}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Portnox</div>
                          <div className="text-lg font-bold text-green-600">{risk.portnox}/10</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Traditional</div>
                          <div className="text-lg font-bold text-red-600">{risk.traditional}/10</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Mitigation Strategies */}
          <Card>
            <CardHeader>
              <CardTitle>Portnox Risk Mitigation Advantages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-600">Zero Downtime Migration</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Cloud-native architecture eliminates hardware dependencies</li>
                    <li>• Parallel operation with existing systems</li>
                    <li>• Gradual policy migration with rollback capability</li>
                    <li>• Real-time monitoring and validation</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-600">Automated Migration Tools</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Policy import and conversion utilities</li>
                    <li>• Device discovery and profiling automation</li>
                    <li>• Certificate migration assistance</li>
                    <li>• Integration testing frameworks</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-purple-600">Expert Support</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Dedicated migration specialists</li>
                    <li>• 24/7 support during migration phases</li>
                    <li>• Best practices guidance and training</li>
                    <li>• Post-migration optimization support</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-orange-600">Proven Methodology</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 500+ successful enterprise migrations</li>
                    <li>• Industry-specific migration playbooks</li>
                    <li>• Comprehensive testing and validation</li>
                    <li>• Success metrics and KPI tracking</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resource Planning Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resource Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Team Composition</CardTitle>
                <p className="text-muted-foreground">
                  {totalFTE.toFixed(1)} FTE • {Math.round(totalFTE * 40 * 17)} total hours
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceData.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">{resource.role}</span>
                        <div className="text-sm text-muted-foreground">
                          {resource.allocation} • {resource.duration}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${resource.cost.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          {(Number.parseFloat(resource.allocation) / 100).toFixed(1)} FTE
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resource Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Resource Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-2 text-xs text-center font-medium">
                    <div>Phase 1</div>
                    <div>Phase 2</div>
                    <div>Phase 3</div>
                    <div>Phase 4</div>
                    <div>Phase 5</div>
                  </div>
                  {resourceData.map((resource, index) => (
                    <div key={index} className="space-y-1">
                      <div className="text-sm font-medium">{resource.role}</div>
                      <div className="grid grid-cols-5 gap-2 h-6">
                        <div className="bg-blue-200 rounded"></div>
                        <div className="bg-blue-400 rounded"></div>
                        <div className="bg-blue-300 rounded"></div>
                        <div className="bg-blue-500 rounded"></div>
                        <div className="bg-blue-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>Skills Assessment & Training Needs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">Current Capabilities</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Network administration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Security policy management</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Active Directory integration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Certificate management</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-orange-600">Training Required</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span>Portnox CLEAR administration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span>Zero Trust architecture</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span>Cloud security best practices</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span>API integration and automation</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">Training Plan</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium">Portnox Certification</div>
                      <div className="text-sm text-muted-foreground">40 hours • $5,000</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium">Zero Trust Workshop</div>
                      <div className="text-sm text-muted-foreground">16 hours • $2,000</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium">Ongoing Support</div>
                      <div className="text-sm text-muted-foreground">As needed • Included</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
