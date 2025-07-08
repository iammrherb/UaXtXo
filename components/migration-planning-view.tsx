"use client"

import { CardDescription } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Target,
  Shield,
  Zap,
  FileText,
  Download,
} from "lucide-react"

interface MigrationPlanningViewProps {
  selectedVendors: string[]
  currentEnvironment?: {
    devices: number
    users: number
    existingNAC?: string
    industry: string
  }
}

const MIGRATION_PHASES = [
  {
    id: "assessment",
    name: "Assessment & Planning",
    duration: "2-4 weeks",
    description: "Current state analysis and migration strategy development",
    tasks: [
      "Network infrastructure audit",
      "Current NAC configuration analysis",
      "Security policy review",
      "Stakeholder interviews",
      "Risk assessment",
      "Migration strategy development",
    ],
    deliverables: [
      "Current state assessment report",
      "Migration strategy document",
      "Risk mitigation plan",
      "Project timeline",
    ],
    risks: ["Incomplete discovery", "Stakeholder availability", "Legacy system complexity"],
  },
  {
    id: "design",
    name: "Solution Design",
    duration: "3-6 weeks",
    description: "Detailed solution architecture and configuration planning",
    tasks: [
      "Network architecture design",
      "Security policy mapping",
      "Integration planning",
      "Pilot environment setup",
      "Testing procedures development",
      "Rollback procedures",
    ],
    deliverables: [
      "Solution architecture document",
      "Configuration templates",
      "Integration specifications",
      "Test plans",
    ],
    risks: ["Design complexity", "Integration challenges", "Performance requirements"],
  },
  {
    id: "pilot",
    name: "Pilot Implementation",
    duration: "4-8 weeks",
    description: "Limited deployment for validation and refinement",
    tasks: [
      "Pilot environment deployment",
      "Initial configuration",
      "Limited user testing",
      "Performance validation",
      "Security testing",
      "Process refinement",
    ],
    deliverables: ["Pilot deployment report", "Performance metrics", "Refined configurations", "Updated procedures"],
    risks: ["Pilot scope creep", "User resistance", "Technical issues"],
  },
  {
    id: "deployment",
    name: "Production Deployment",
    duration: "6-12 weeks",
    description: "Phased rollout to production environment",
    tasks: [
      "Production environment setup",
      "Phased user migration",
      "Monitoring implementation",
      "User training delivery",
      "Support procedures activation",
      "Legacy system decommissioning",
    ],
    deliverables: [
      "Production deployment",
      "User training materials",
      "Support documentation",
      "Migration completion report",
    ],
    risks: ["Production issues", "User adoption", "Performance degradation"],
  },
  {
    id: "optimization",
    name: "Optimization & Handover",
    duration: "2-4 weeks",
    description: "Performance tuning and knowledge transfer",
    tasks: [
      "Performance optimization",
      "Policy fine-tuning",
      "Knowledge transfer",
      "Documentation finalization",
      "Support transition",
      "Project closure",
    ],
    deliverables: ["Optimized configuration", "Complete documentation", "Support handover", "Project closure report"],
    risks: ["Knowledge gaps", "Support readiness", "Ongoing optimization needs"],
  },
]

const READINESS_CRITERIA = [
  {
    category: "Technical Infrastructure",
    weight: 25,
    criteria: [
      { name: "Network infrastructure documented", required: true },
      { name: "Current NAC configuration analyzed", required: true },
      { name: "Integration points identified", required: true },
      { name: "Performance baselines established", required: false },
    ],
  },
  {
    category: "Organizational Readiness",
    weight: 20,
    criteria: [
      { name: "Executive sponsorship secured", required: true },
      { name: "Project team assembled", required: true },
      { name: "Change management plan developed", required: false },
      { name: "Communication plan established", required: false },
    ],
  },
  {
    category: "Security & Compliance",
    weight: 25,
    criteria: [
      { name: "Security policies reviewed", required: true },
      { name: "Compliance requirements mapped", required: true },
      { name: "Risk assessment completed", required: true },
      { name: "Audit trail requirements defined", required: false },
    ],
  },
  {
    category: "Resource Availability",
    weight: 15,
    criteria: [
      { name: "Technical resources allocated", required: true },
      { name: "Budget approved", required: true },
      { name: "Training budget allocated", required: false },
      { name: "External support contracted", required: false },
    ],
  },
  {
    category: "Risk Management",
    weight: 15,
    criteria: [
      { name: "Risk mitigation strategies defined", required: true },
      { name: "Rollback procedures documented", required: true },
      { name: "Business continuity plan updated", required: false },
      { name: "Incident response procedures ready", required: false },
    ],
  },
]

export default function MigrationPlanningView({
  selectedVendors = [],
  currentEnvironment = {
    devices: 1000,
    users: 500,
    industry: "GENERAL",
  },
}: MigrationPlanningViewProps) {
  const [selectedPhase, setSelectedPhase] = useState("assessment")
  const [readinessChecklist, setReadinessChecklist] = useState<Record<string, boolean>>({})

  const primaryVendor =
    selectedVendors && selectedVendors.length > 0 && selectedVendors[0]
      ? ComprehensiveVendorDatabase[selectedVendors[0]]
      : null

  const calculateReadinessScore = () => {
    let totalScore = 0
    let maxScore = 0

    READINESS_CRITERIA.forEach((category) => {
      category.criteria.forEach((criterion) => {
        const key = `${category.category}-${criterion.name}`
        const weight = criterion.required ? category.weight : category.weight * 0.5
        maxScore += weight
        if (readinessChecklist[key]) {
          totalScore += weight
        }
      })
    })

    return Math.round((totalScore / maxScore) * 100)
  }

  const toggleReadinessItem = (category: string, criterion: string) => {
    const key = `${category}-${criterion}`
    setReadinessChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const readinessScore = calculateReadinessScore()

  const getMigrationComplexity = () => {
    if (!primaryVendor) return "Unknown"

    const complexity = primaryVendor.implementation.complexity
    const deviceCount = currentEnvironment?.devices || 1000

    if (complexity === "low" && deviceCount < 1000) return "Simple"
    if (complexity === "low" && deviceCount < 5000) return "Moderate"
    if (complexity === "medium") return "Moderate"
    if (complexity === "high") return "Complex"
    return "Very Complex"
  }

  const getEstimatedDuration = () => {
    if (!primaryVendor) return "12-24 weeks"

    const deviceCount = currentEnvironment?.devices || 1000
    const complexity = primaryVendor.implementation.complexity

    if (complexity === "low" && deviceCount < 1000) return "8-16 weeks"
    if (complexity === "low" && deviceCount < 5000) return "12-20 weeks"
    if (complexity === "medium") return "16-24 weeks"
    if (complexity === "high") return "20-32 weeks"
    return "24-40 weeks"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Migration Planning</h2>
          <p className="text-muted-foreground">Comprehensive migration strategy and readiness assessment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Plan
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Timeline
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="readiness">Readiness Assessment</TabsTrigger>
          <TabsTrigger value="timeline">Migration Timeline</TabsTrigger>
          <TabsTrigger value="risks">Risk Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Migration Complexity</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getMigrationComplexity()}</div>
                <p className="text-xs text-muted-foreground">Based on {currentEnvironment?.devices || 1000} devices</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Estimated Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getEstimatedDuration()}</div>
                <p className="text-xs text-muted-foreground">End-to-end implementation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Readiness Score</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{readinessScore}%</div>
                <Progress value={readinessScore} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {primaryVendor && selectedVendors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Migration Strategy for {primaryVendor.name}</CardTitle>
                <CardDescription>Recommended approach based on vendor characteristics and environment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Deployment Model</h4>
                    <Badge variant="outline" className="mb-2">
                      {primaryVendor.category}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {primaryVendor.category === "cloud-native"
                        ? "Cloud-first deployment with minimal on-premise infrastructure"
                        : primaryVendor.category === "hybrid"
                          ? "Hybrid deployment balancing cloud and on-premise components"
                          : "Traditional on-premise deployment with full infrastructure requirements"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Implementation Approach</h4>
                    <Badge
                      variant={
                        primaryVendor.implementation.complexity === "low"
                          ? "default"
                          : primaryVendor.implementation.complexity === "medium"
                            ? "secondary"
                            : "destructive"
                      }
                      className="mb-2"
                    >
                      {primaryVendor.implementation.complexity} complexity
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {primaryVendor.implementation.complexity === "low"
                        ? "Streamlined deployment with automated configuration"
                        : primaryVendor.implementation.complexity === "medium"
                          ? "Structured deployment with moderate customization"
                          : "Complex deployment requiring extensive planning and expertise"}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Key Success Factors</h4>
                  <ul className="space-y-1 text-sm">
                    {primaryVendor.implementation.requiredExpertise.map((expertise, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                        {expertise}
                      </li>
                    ))}
                  </ul>
                </div>

                {primaryVendor.implementation.migrationFromExisting.effort !== "low" && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Migration from existing NAC requires {primaryVendor.implementation.migrationFromExisting.effort}{" "}
                      effort with approximately {primaryVendor.implementation.migrationFromExisting.downtime} hours of
                      potential downtime. Plan accordingly.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="readiness" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Migration Readiness Assessment</CardTitle>
              <CardDescription>
                Evaluate your organization's readiness for NAC migration across key dimensions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Overall Readiness Score</h3>
                  <div className="flex items-center gap-4">
                    <Progress value={readinessScore} className="w-32" />
                    <Badge
                      variant={readinessScore >= 80 ? "default" : readinessScore >= 60 ? "secondary" : "destructive"}
                    >
                      {readinessScore}%
                    </Badge>
                  </div>
                </div>

                {READINESS_CRITERIA.map((category) => (
                  <div key={category.category} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{category.category}</h4>
                      <Badge variant="outline">{category.weight}% weight</Badge>
                    </div>
                    <div className="space-y-2 pl-4">
                      {category.criteria.map((criterion) => {
                        const key = `${category.category}-${criterion.name}`
                        const isChecked = readinessChecklist[key] || false
                        return (
                          <div key={criterion.name} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={key}
                              checked={isChecked}
                              onChange={() => toggleReadinessItem(category.category, criterion.name)}
                              className="rounded border-gray-300"
                            />
                            <label htmlFor={key} className="text-sm flex-1">
                              {criterion.name}
                            </label>
                            {criterion.required && (
                              <Badge variant="destructive" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Readiness Recommendations</h4>
                  {readinessScore >= 80 ? (
                    <p className="text-sm text-green-700">
                      ✅ Your organization is well-prepared for migration. You can proceed with confidence.
                    </p>
                  ) : readinessScore >= 60 ? (
                    <p className="text-sm text-yellow-700">
                      ⚠️ Your organization has good readiness but should address remaining gaps before proceeding.
                    </p>
                  ) : (
                    <p className="text-sm text-red-700">
                      ❌ Significant readiness gaps exist. Focus on addressing critical requirements before migration.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Migration Phases</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {MIGRATION_PHASES.map((phase, index) => (
                    <Button
                      key={phase.id}
                      variant={selectedPhase === phase.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedPhase(phase.id)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{phase.name}</div>
                          <div className="text-xs text-muted-foreground">{phase.duration}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {MIGRATION_PHASES.filter((phase) => phase.id === selectedPhase).map((phase) => (
                <Card key={phase.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {phase.name}
                    </CardTitle>
                    <CardDescription>{phase.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Key Tasks
                        </h4>
                        <ul className="space-y-2">
                          {phase.tasks.map((task, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <ArrowRight className="h-3 w-3 mt-0.5 text-muted-foreground" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Deliverables
                        </h4>
                        <ul className="space-y-2">
                          {phase.deliverables.map((deliverable, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <ArrowRight className="h-3 w-3 mt-0.5 text-muted-foreground" />
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        Key Risks
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {phase.risks.map((risk, index) => (
                          <Badge key={index} variant="outline" className="justify-center">
                            {risk}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  High-Risk Areas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg bg-red-50 dark:bg-red-900/20">
                    <h4 className="font-semibold text-red-800 dark:text-red-200">Network Downtime</h4>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      Potential service disruption during cutover
                    </p>
                    <div className="mt-2">
                      <Badge variant="destructive" className="text-xs">
                        High Impact
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">User Adoption</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Resistance to new authentication processes
                    </p>
                    <div className="mt-2">
                      <Badge variant="secondary" className="text-xs">
                        Medium Impact
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg bg-orange-50 dark:bg-orange-900/20">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200">Integration Complexity</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                      Challenges with existing system integration
                    </p>
                    <div className="mt-2">
                      <Badge variant="secondary" className="text-xs">
                        Medium Impact
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Risk Mitigation Strategies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
                    <h4 className="font-semibold text-green-800 dark:text-green-200">Phased Rollout</h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Gradual deployment to minimize impact
                    </p>
                    <ul className="text-xs text-green-600 dark:text-green-400 mt-2 space-y-1">
                      <li>• Start with pilot group</li>
                      <li>• Validate before full deployment</li>
                      <li>• Maintain rollback capability</li>
                    </ul>
                  </div>

                  <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">Comprehensive Testing</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Thorough validation in non-production
                    </p>
                    <ul className="text-xs text-blue-600 dark:text-blue-400 mt-2 space-y-1">
                      <li>• Lab environment testing</li>
                      <li>• Performance validation</li>
                      <li>• Security verification</li>
                    </ul>
                  </div>

                  <div className="p-3 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">Change Management</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                      Structured approach to user adoption
                    </p>
                    <ul className="text-xs text-purple-600 dark:text-purple-400 mt-2 space-y-1">
                      <li>• User training programs</li>
                      <li>• Communication campaigns</li>
                      <li>• Support desk preparation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contingency Planning</CardTitle>
              <CardDescription>Backup plans for critical migration scenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Rollback Procedures</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Zap className="h-3 w-3 mt-0.5 text-yellow-500" />
                      Maintain parallel systems during transition
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-3 w-3 mt-0.5 text-yellow-500" />
                      Document rollback triggers and procedures
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-3 w-3 mt-0.5 text-yellow-500" />
                      Test rollback procedures in advance
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-3 w-3 mt-0.5 text-yellow-500" />
                      Establish decision-making authority
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Emergency Response</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-3 w-3 mt-0.5 text-red-500" />
                      24/7 support during critical phases
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-3 w-3 mt-0.5 text-red-500" />
                      Escalation procedures defined
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-3 w-3 mt-0.5 text-red-500" />
                      Vendor support engagement
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-3 w-3 mt-0.5 text-red-500" />
                      Communication protocols established
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
