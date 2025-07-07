"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts"
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Users,
  Shield,
  Zap,
  Target,
  TrendingUp,
  FileText,
  Settings,
  Eye,
  ArrowRight,
  Star,
  Info,
  XCircle,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface MigrationPlanningViewProps {
  selectedVendors: string[]
  results: CalculationResult[]
  config: CalculationConfiguration
}

interface ReadinessAssessment {
  category: string
  score: number
  maxScore: number
  status: "excellent" | "good" | "fair" | "poor"
  items: {
    name: string
    status: "complete" | "partial" | "missing"
    impact: "high" | "medium" | "low"
    description: string
  }[]
}

interface MigrationPhase {
  id: string
  name: string
  duration: number
  dependencies: string[]
  tasks: {
    name: string
    duration: number
    resources: string[]
    risk: "low" | "medium" | "high"
    critical: boolean
  }[]
  deliverables: string[]
  successCriteria: string[]
  risks: {
    description: string
    probability: number
    impact: number
    mitigation: string
  }[]
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]

export default function MigrationPlanningView({ selectedVendors, results, config }: MigrationPlanningViewProps) {
  const [selectedPhase, setSelectedPhase] = useState<string>("assessment")
  const [activeTab, setActiveTab] = useState("readiness")

  // Mock readiness assessment data
  const readinessAssessment: ReadinessAssessment[] = [
    {
      category: "Infrastructure Readiness",
      score: 85,
      maxScore: 100,
      status: "good",
      items: [
        {
          name: "Network Infrastructure",
          status: "complete",
          impact: "high",
          description: "Switches support 802.1X and RADIUS",
        },
        {
          name: "RADIUS Infrastructure",
          status: "partial",
          impact: "high",
          description: "Legacy RADIUS servers need upgrade",
        },
        {
          name: "Certificate Authority",
          status: "missing",
          impact: "medium",
          description: "PKI infrastructure not deployed",
        },
        {
          name: "VLAN Segmentation",
          status: "complete",
          impact: "high",
          description: "Dynamic VLAN assignment configured",
        },
      ],
    },
    {
      category: "Security Posture",
      score: 72,
      maxScore: 100,
      status: "fair",
      items: [
        {
          name: "Identity Management",
          status: "complete",
          impact: "high",
          description: "Active Directory integrated",
        },
        {
          name: "Device Inventory",
          status: "partial",
          impact: "high",
          description: "50% of devices catalogued",
        },
        {
          name: "Security Policies",
          status: "partial",
          impact: "medium",
          description: "Basic policies defined, need enhancement",
        },
        {
          name: "Incident Response",
          status: "complete",
          impact: "high",
          description: "SOC and SIEM integration ready",
        },
      ],
    },
    {
      category: "Organizational Readiness",
      score: 68,
      maxScore: 100,
      status: "fair",
      items: [
        {
          name: "Executive Sponsorship",
          status: "complete",
          impact: "high",
          description: "C-level support secured",
        },
        {
          name: "Team Skills",
          status: "partial",
          impact: "high",
          description: "Training required for NAC technologies",
        },
        {
          name: "Change Management",
          status: "partial",
          impact: "medium",
          description: "Process defined but not tested",
        },
        {
          name: "Budget Approval",
          status: "complete",
          impact: "high",
          description: "Funding allocated for migration",
        },
      ],
    },
    {
      category: "Compliance Requirements",
      score: 90,
      maxScore: 100,
      status: "excellent",
      items: [
        {
          name: "Regulatory Mapping",
          status: "complete",
          impact: "high",
          description: "All compliance requirements documented",
        },
        {
          name: "Audit Preparation",
          status: "complete",
          impact: "medium",
          description: "Audit trail requirements defined",
        },
        {
          name: "Data Protection",
          status: "complete",
          impact: "high",
          description: "GDPR and privacy controls mapped",
        },
        {
          name: "Risk Assessment",
          status: "partial",
          impact: "medium",
          description: "Initial assessment complete, ongoing monitoring needed",
        },
      ],
    },
  ]

  // Migration phases data
  const migrationPhases: MigrationPhase[] = [
    {
      id: "assessment",
      name: "Assessment & Planning",
      duration: 2,
      dependencies: [],
      tasks: [
        {
          name: "Current State Analysis",
          duration: 1,
          resources: ["Network Architect", "Security Analyst"],
          risk: "low",
          critical: true,
        },
        {
          name: "Requirements Gathering",
          duration: 0.5,
          resources: ["Business Analyst", "Stakeholders"],
          risk: "low",
          critical: true,
        },
        {
          name: "Migration Strategy Design",
          duration: 0.5,
          resources: ["Solution Architect", "Project Manager"],
          risk: "medium",
          critical: true,
        },
      ],
      deliverables: [
        "Current State Assessment Report",
        "Migration Strategy Document",
        "Risk Assessment Matrix",
        "Resource Requirements Plan",
      ],
      successCriteria: [
        "Complete inventory of current NAC infrastructure",
        "Stakeholder alignment on migration approach",
        "Approved migration timeline and budget",
      ],
      risks: [
        {
          description: "Incomplete current state documentation",
          probability: 30,
          impact: 60,
          mitigation: "Conduct thorough discovery workshops with all teams",
        },
      ],
    },
    {
      id: "preparation",
      name: "Environment Preparation",
      duration: 3,
      dependencies: ["assessment"],
      tasks: [
        {
          name: "Portnox Cloud Setup",
          duration: 0.5,
          resources: ["Cloud Engineer", "Portnox Support"],
          risk: "low",
          critical: true,
        },
        {
          name: "Network Preparation",
          duration: 1,
          resources: ["Network Engineer", "Security Engineer"],
          risk: "medium",
          critical: true,
        },
        {
          name: "Integration Testing",
          duration: 1,
          resources: ["Test Engineer", "Network Engineer"],
          risk: "medium",
          critical: false,
        },
        {
          name: "Team Training",
          duration: 0.5,
          resources: ["Training Coordinator", "Portnox Trainer"],
          risk: "low",
          critical: false,
        },
      ],
      deliverables: [
        "Portnox Cloud Environment",
        "Network Configuration Updates",
        "Integration Test Results",
        "Trained Operations Team",
      ],
      successCriteria: [
        "Portnox cloud environment operational",
        "All network integrations tested",
        "Team certified on Portnox platform",
      ],
      risks: [
        {
          description: "Network configuration conflicts",
          probability: 25,
          impact: 70,
          mitigation: "Comprehensive testing in isolated environment first",
        },
      ],
    },
    {
      id: "pilot",
      name: "Pilot Deployment",
      duration: 4,
      dependencies: ["preparation"],
      tasks: [
        {
          name: "Pilot Group Selection",
          duration: 0.5,
          resources: ["Project Manager", "Business Stakeholders"],
          risk: "low",
          critical: true,
        },
        {
          name: "Portnox Deployment",
          duration: 1,
          resources: ["Implementation Engineer", "Portnox Support"],
          risk: "medium",
          critical: true,
        },
        {
          name: "User Onboarding",
          duration: 1.5,
          resources: ["Support Team", "End Users"],
          risk: "medium",
          critical: false,
        },
        {
          name: "Monitoring & Optimization",
          duration: 1,
          resources: ["Operations Team", "Security Analyst"],
          risk: "low",
          critical: false,
        },
      ],
      deliverables: [
        "Pilot Environment Deployed",
        "User Feedback Report",
        "Performance Metrics",
        "Optimization Recommendations",
      ],
      successCriteria: [
        "100% pilot users successfully onboarded",
        "Zero security incidents during pilot",
        "User satisfaction score > 85%",
      ],
      risks: [
        {
          description: "User adoption resistance",
          probability: 40,
          impact: 50,
          mitigation: "Comprehensive change management and user support",
        },
      ],
    },
    {
      id: "rollout",
      name: "Production Rollout",
      duration: 6,
      dependencies: ["pilot"],
      tasks: [
        {
          name: "Phased Deployment",
          duration: 3,
          resources: ["Implementation Team", "Operations Team"],
          risk: "medium",
          critical: true,
        },
        {
          name: "Legacy System Migration",
          duration: 2,
          resources: ["Migration Specialist", "Database Admin"],
          risk: "high",
          critical: true,
        },
        {
          name: "User Migration",
          duration: 1,
          resources: ["Support Team", "Communications Team"],
          risk: "medium",
          critical: false,
        },
      ],
      deliverables: ["Production Environment", "Migrated User Base", "Decommissioned Legacy Systems", "Go-Live Report"],
      successCriteria: ["All users migrated successfully", "Legacy systems decommissioned", "Performance targets met"],
      risks: [
        {
          description: "Data migration issues",
          probability: 20,
          impact: 80,
          mitigation: "Extensive testing and rollback procedures",
        },
      ],
    },
    {
      id: "optimization",
      name: "Optimization & Handover",
      duration: 2,
      dependencies: ["rollout"],
      tasks: [
        {
          name: "Performance Tuning",
          duration: 1,
          resources: ["Performance Engineer", "Portnox Support"],
          risk: "low",
          critical: false,
        },
        {
          name: "Knowledge Transfer",
          duration: 0.5,
          resources: ["Implementation Team", "Operations Team"],
          risk: "low",
          critical: true,
        },
        {
          name: "Documentation Finalization",
          duration: 0.5,
          resources: ["Technical Writer", "Project Manager"],
          risk: "low",
          critical: false,
        },
      ],
      deliverables: [
        "Optimized Configuration",
        "Operations Runbooks",
        "Project Closure Report",
        "Lessons Learned Document",
      ],
      successCriteria: [
        "System performance optimized",
        "Operations team fully autonomous",
        "All documentation complete",
      ],
      risks: [
        {
          description: "Knowledge transfer gaps",
          probability: 15,
          impact: 40,
          mitigation: "Structured handover process with sign-offs",
        },
      ],
    },
  ]

  // Calculate overall readiness score
  const overallReadiness = useMemo(() => {
    const totalScore = readinessAssessment.reduce((sum, category) => sum + category.score, 0)
    const maxTotalScore = readinessAssessment.reduce((sum, category) => sum + category.maxScore, 0)
    return Math.round((totalScore / maxTotalScore) * 100)
  }, [readinessAssessment])

  // Migration timeline data
  const timelineData = migrationPhases.map((phase, index) => ({
    name: phase.name,
    duration: phase.duration,
    start: migrationPhases.slice(0, index).reduce((sum, p) => sum + p.duration, 0),
    tasks: phase.tasks.length,
    risks: phase.risks.length,
  }))

  // Cost breakdown data
  const migrationCosts = [
    { category: "Professional Services", portnox: 45000, traditional: 120000 },
    { category: "Training & Certification", portnox: 8000, traditional: 25000 },
    { category: "Infrastructure Changes", portnox: 5000, traditional: 35000 },
    { category: "Downtime Costs", portnox: 0, traditional: 50000 },
    { category: "Risk Mitigation", portnox: 2000, traditional: 15000 },
  ]

  // Risk assessment data
  const riskData = [
    { name: "Technical Risk", portnox: 15, traditional: 65 },
    { name: "Timeline Risk", portnox: 10, traditional: 70 },
    { name: "Cost Overrun Risk", portnox: 20, traditional: 60 },
    { name: "User Impact Risk", portnox: 5, traditional: 45 },
    { name: "Security Risk", portnox: 10, traditional: 55 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-500"
      case "good":
        return "bg-blue-500"
      case "fair":
        return "bg-yellow-500"
      case "poor":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "missing":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Info className="h-4 w-4 text-gray-600" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600 bg-green-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "high":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Migration Planning</h2>
          <p className="text-muted-foreground">Comprehensive migration assessment and planning for NAC deployment</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-sm">
            Overall Readiness: {overallReadiness}%
          </Badge>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Export Plan
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="readiness">Readiness Assessment</TabsTrigger>
          <TabsTrigger value="timeline">Migration Timeline</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
          <TabsTrigger value="resources">Resource Planning</TabsTrigger>
        </TabsList>

        {/* Readiness Assessment Tab */}
        <TabsContent value="readiness" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Overall Readiness Score */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Overall Readiness
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{overallReadiness}%</div>
                  <Progress value={overallReadiness} className="w-full" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {overallReadiness >= 80
                      ? "Ready to proceed"
                      : overallReadiness >= 60
                        ? "Some preparation needed"
                        : "Significant preparation required"}
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Recommendations</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      Infrastructure mostly ready
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3 text-yellow-600" />
                      Team training required
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3 text-yellow-600" />
                      Device inventory needs completion
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Readiness Categories */}
            <div className="lg:col-span-2 space-y-4">
              {readinessAssessment.map((category, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(category.status)}`} />
                        <span className="text-sm font-medium">
                          {category.score}/{category.maxScore}
                        </span>
                      </div>
                    </div>
                    <Progress value={(category.score / category.maxScore) * 100} className="w-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-3 p-3 rounded-lg border">
                          {getStatusIcon(item.status)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium text-sm">{item.name}</h5>
                              <Badge variant="outline" className="text-xs">
                                {item.impact} impact
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Migration Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Timeline Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Migration Timeline</CardTitle>
                <CardDescription>Phase duration and dependencies</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="duration" fill="#10b981" name="Duration (weeks)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Timeline Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline Summary</CardTitle>
                <CardDescription>Key milestones and duration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-green-50">
                    <div className="text-2xl font-bold text-green-600">17</div>
                    <div className="text-sm text-green-700">Total Weeks</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-blue-50">
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-blue-700">Phases</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  {migrationPhases.map((phase, index) => (
                    <div key={phase.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{phase.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {phase.duration} weeks • {phase.tasks.length} tasks
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Week {timelineData[index].start + 1}-{timelineData[index].start + phase.duration}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Phase Details */}
          <Card>
            <CardHeader>
              <CardTitle>Phase Details</CardTitle>
              <CardDescription>Select a phase to view detailed information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4 flex-wrap">
                {migrationPhases.map((phase) => (
                  <Button
                    key={phase.id}
                    variant={selectedPhase === phase.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPhase(phase.id)}
                  >
                    {phase.name}
                  </Button>
                ))}
              </div>

              {(() => {
                const phase = migrationPhases.find((p) => p.id === selectedPhase)
                if (!phase) return null

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Tasks ({phase.tasks.length})
                        </h4>
                        <div className="space-y-2">
                          {phase.tasks.map((task, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm">{task.name}</span>
                                  {task.critical && <Star className="h-3 w-3 text-yellow-500" />}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {task.duration} weeks
                                  <Users className="h-3 w-3 ml-2" />
                                  {task.resources.join(", ")}
                                </div>
                              </div>
                              <Badge className={getRiskColor(task.risk)}>{task.risk} risk</Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Deliverables
                        </h4>
                        <ul className="space-y-1">
                          {phase.deliverables.map((deliverable, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-3 w-3 text-green-600" />
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Success Criteria
                        </h4>
                        <ul className="space-y-1">
                          {phase.successCriteria.map((criteria, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-3 w-3 text-blue-600" />
                              {criteria}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Risks & Mitigation
                        </h4>
                        <div className="space-y-2">
                          {phase.risks.map((risk, index) => (
                            <div key={index} className="p-3 rounded-lg border border-yellow-200 bg-yellow-50">
                              <div className="font-medium text-sm mb-1">{risk.description}</div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                                <span>Probability: {risk.probability}%</span>
                                <span>Impact: {risk.impact}%</span>
                              </div>
                              <div className="text-sm">
                                <strong>Mitigation:</strong> {risk.mitigation}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost Analysis Tab */}
        <TabsContent value="costs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Migration Cost Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Migration Cost Comparison</CardTitle>
                <CardDescription>Portnox vs Traditional NAC Migration</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={migrationCosts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="portnox" fill="#10b981" name="Portnox CLEAR" />
                    <Bar dataKey="traditional" fill="#ef4444" name="Traditional NAC" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cost Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Migration Cost Summary</CardTitle>
                <CardDescription>Total migration investment comparison</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-green-50">
                    <div className="text-2xl font-bold text-green-600">$60K</div>
                    <div className="text-sm text-green-700">Portnox Migration</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-red-50">
                    <div className="text-2xl font-bold text-red-600">$245K</div>
                    <div className="text-sm text-red-700">Traditional Migration</div>
                  </div>
                </div>

                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>75% Cost Savings</strong> - Portnox migration costs $185K less than traditional NAC
                    solutions
                  </AlertDescription>
                </Alert>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold">Key Cost Advantages</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      No hardware procurement delays
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Zero downtime migration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Minimal training requirements
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Automated migration tools
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Cost Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Cost Breakdown</CardTitle>
              <CardDescription>Phase-by-phase migration costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Migration Phase</th>
                      <th className="text-right p-2">Portnox Cost</th>
                      <th className="text-right p-2">Traditional Cost</th>
                      <th className="text-right p-2">Savings</th>
                      <th className="text-right p-2">% Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {migrationCosts.map((cost, index) => {
                      const savings = cost.traditional - cost.portnox
                      const percentSavings = ((savings / cost.traditional) * 100).toFixed(0)
                      return (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{cost.category}</td>
                          <td className="p-2 text-right text-green-600">${cost.portnox.toLocaleString()}</td>
                          <td className="p-2 text-right text-red-600">${cost.traditional.toLocaleString()}</td>
                          <td className="p-2 text-right font-medium">${savings.toLocaleString()}</td>
                          <td className="p-2 text-right">
                            <Badge variant="outline" className="text-green-600">
                              {percentSavings}%
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
        </TabsContent>

        {/* Risk Assessment Tab */}
        <TabsContent value="risks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Comparison Radar */}
            <Card>
              <CardHeader>
                <CardTitle>Migration Risk Comparison</CardTitle>
                <CardDescription>Risk levels: Portnox vs Traditional NAC</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={riskData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Portnox CLEAR" dataKey="portnox" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Radar
                      name="Traditional NAC"
                      dataKey="traditional"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.6}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Risk Mitigation Strategies */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Mitigation Strategies</CardTitle>
                <CardDescription>How Portnox reduces migration risks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800">Zero Downtime Migration</h4>
                      <p className="text-sm text-green-700">
                        Cloud-native architecture eliminates service interruptions during migration
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                    <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Automated Migration Tools</h4>
                      <p className="text-sm text-blue-700">
                        Built-in migration utilities reduce manual errors and accelerate deployment
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50">
                    <Users className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-purple-800">Expert Support</h4>
                      <p className="text-sm text-purple-700">
                        Dedicated migration specialists guide the entire process
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50">
                    <Eye className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Real-time Monitoring</h4>
                      <p className="text-sm text-yellow-700">
                        Continuous monitoring ensures smooth transition and quick issue resolution
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Migration Risk Matrix</CardTitle>
              <CardDescription>Comprehensive risk assessment across all migration phases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Risk Category</th>
                      <th className="text-center p-3">Probability</th>
                      <th className="text-center p-3">Impact</th>
                      <th className="text-center p-3">Risk Level</th>
                      <th className="text-left p-3">Mitigation Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Technical Integration</td>
                      <td className="p-3 text-center">Low</td>
                      <td className="p-3 text-center">Medium</td>
                      <td className="p-3 text-center">
                        <Badge className="bg-green-100 text-green-800">Low</Badge>
                      </td>
                      <td className="p-3">Comprehensive testing and validation protocols</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">User Adoption</td>
                      <td className="p-3 text-center">Medium</td>
                      <td className="p-3 text-center">Medium</td>
                      <td className="p-3 text-center">
                        <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                      </td>
                      <td className="p-3">Change management program and user training</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Timeline Delays</td>
                      <td className="p-3 text-center">Low</td>
                      <td className="p-3 text-center">Low</td>
                      <td className="p-3 text-center">
                        <Badge className="bg-green-100 text-green-800">Low</Badge>
                      </td>
                      <td className="p-3">Agile methodology with buffer time built-in</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Data Migration</td>
                      <td className="p-3 text-center">Low</td>
                      <td className="p-3 text-center">High</td>
                      <td className="p-3 text-center">
                        <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                      </td>
                      <td className="p-3">Automated migration tools with rollback capability</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Security Gaps</td>
                      <td className="p-3 text-center">Very Low</td>
                      <td className="p-3 text-center">High</td>
                      <td className="p-3 text-center">
                        <Badge className="bg-green-100 text-green-800">Low</Badge>
                      </td>
                      <td className="p-3">Parallel operation during transition period</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resource Planning Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resource Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Resource Requirements</CardTitle>
                <CardDescription>Team composition and effort allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-blue-50">
                      <div className="text-2xl font-bold text-blue-600">8</div>
                      <div className="text-sm text-blue-700">Team Members</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-green-50">
                      <div className="text-2xl font-bold text-green-600">2.5</div>
                      <div className="text-sm text-green-700">FTE Months</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-semibold">Core Team Roles</h4>
                    <div className="space-y-2">
                      {[
                        { role: "Project Manager", effort: "100%", duration: "17 weeks" },
                        { role: "Network Architect", effort: "75%", duration: "12 weeks" },
                        { role: "Security Engineer", effort: "50%", duration: "15 weeks" },
                        { role: "Implementation Engineer", effort: "100%", duration: "8 weeks" },
                        { role: "Test Engineer", effort: "25%", duration: "6 weeks" },
                        { role: "Training Coordinator", effort: "25%", duration: "4 weeks" },
                      ].map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded border">
                          <span className="font-medium text-sm">{resource.role}</span>
                          <div className="text-right text-sm text-muted-foreground">
                            <div>{resource.effort}</div>
                            <div>{resource.duration}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Assessment */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
                <CardDescription>Current team capabilities vs requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { skill: "Network Security", current: 85, required: 90, gap: 5 },
                    { skill: "Cloud Technologies", current: 70, required: 80, gap: 10 },
                    { skill: "Identity Management", current: 90, required: 85, gap: 0 },
                    { skill: "Project Management", current: 95, required: 90, gap: 0 },
                    { skill: "Change Management", current: 60, required: 80, gap: 20 },
                  ].map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{skill.skill}</span>
                        <span className="text-sm text-muted-foreground">
                          {skill.current}% / {skill.required}%
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Progress value={skill.current} className="flex-1" />
                        {skill.gap > 0 && (
                          <Badge variant="outline" className="text-xs text-yellow-600">
                            {skill.gap}% gap
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-semibold mb-2">Training Recommendations</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-blue-600" />
                      Cloud security fundamentals training
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-blue-600" />
                      Change management certification
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-blue-600" />
                      Portnox platform training
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resource Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation Timeline</CardTitle>
              <CardDescription>Team member allocation across migration phases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Role</th>
                      <th className="text-center p-2">Assessment</th>
                      <th className="text-center p-2">Preparation</th>
                      <th className="text-center p-2">Pilot</th>
                      <th className="text-center p-2">Rollout</th>
                      <th className="text-center p-2">Optimization</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Project Manager</td>
                      <td className="p-2 text-center">100%</td>
                      <td className="p-2 text-center">100%</td>
                      <td className="p-2 text-center">100%</td>
                      <td className="p-2 text-center">100%</td>
                      <td className="p-2 text-center">50%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Network Architect</td>
                      <td className="p-2 text-center">100%</td>
                      <td className="p-2 text-center">75%</td>
                      <td className="p-2 text-center">50%</td>
                      <td className="p-2 text-center">25%</td>
                      <td className="p-2 text-center">25%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Security Engineer</td>
                      <td className="p-2 text-center">75%</td>
                      <td className="p-2 text-center">50%</td>
                      <td className="p-2 text-center">75%</td>
                      <td className="p-2 text-center">50%</td>
                      <td className="p-2 text-center">25%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Implementation Engineer</td>
                      <td className="p-2 text-center">-</td>
                      <td className="p-2 text-center">100%</td>
                      <td className="p-2 text-center">100%</td>
                      <td className="p-2 text-center">100%</td>
                      <td className="p-2 text-center">50%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Test Engineer</td>
                      <td className="p-2 text-center">-</td>
                      <td className="p-2 text-center">50%</td>
                      <td className="p-2 text-center">25%</td>
                      <td className="p-2 text-center">25%</td>
                      <td className="p-2 text-center">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
