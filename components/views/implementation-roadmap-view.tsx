"use client"

import type React from "react"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Zap,
  Shield,
  Settings,
  Rocket,
  Target,
  TrendingUp,
  Award,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ImplementationRoadmapViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

interface RoadmapPhase {
  phase: string
  duration: number
  description: string
  tasks: string[]
  icon: React.ReactNode
  color: string
  dependencies?: string[]
}

export default function ImplementationRoadmapView({ results = [], config }: ImplementationRoadmapViewProps) {
  const portnoxRoadmap: RoadmapPhase[] = useMemo(
    () => [
      {
        phase: "Planning & Preparation",
        duration: 2,
        description: "Initial setup and configuration planning",
        tasks: [
          "Define network requirements and policies",
          "Identify key stakeholders and team members",
          "Review existing network infrastructure",
          "Plan integration with current systems",
        ],
        icon: <Target className="h-4 w-4" />,
        color: "blue",
      },
      {
        phase: "Cloud Setup",
        duration: 4,
        description: "Configure Portnox CLEAR cloud instance",
        tasks: [
          "Create Portnox cloud account",
          "Configure initial policies and rules",
          "Set up user authentication integration",
          "Configure network device connections",
        ],
        icon: <Zap className="h-4 w-4" />,
        color: "emerald",
      },
      {
        phase: "Pilot Deployment",
        duration: 8,
        description: "Deploy to limited network segment for testing",
        tasks: [
          "Deploy to pilot network segment",
          "Test device authentication and policies",
          "Validate user access and guest portal",
          "Monitor and adjust configurations",
        ],
        icon: <Rocket className="h-4 w-4" />,
        color: "purple",
      },
      {
        phase: "Full Production",
        duration: 16,
        description: "Complete rollout across entire network",
        tasks: [
          "Extend to all network segments",
          "Migrate all devices and users",
          "Implement advanced security policies",
          "Complete staff training and documentation",
        ],
        icon: <CheckCircle className="h-4 w-4" />,
        color: "green",
      },
    ],
    [],
  )

  const traditionalRoadmap: RoadmapPhase[] = useMemo(
    () => [
      {
        phase: "Planning & Design",
        duration: 30,
        description: "Extensive planning and architecture design",
        tasks: [
          "Conduct detailed network assessment",
          "Design NAC architecture and topology",
          "Plan hardware procurement and placement",
          "Develop implementation project plan",
        ],
        icon: <Settings className="h-4 w-4" />,
        color: "slate",
      },
      {
        phase: "Hardware Procurement",
        duration: 45,
        description: "Order and receive necessary hardware",
        tasks: [
          "Finalize hardware specifications",
          "Process procurement and approvals",
          "Receive and inventory equipment",
          "Prepare installation sites",
        ],
        icon: <AlertCircle className="h-4 w-4" />,
        color: "orange",
      },
      {
        phase: "Installation & Configuration",
        duration: 60,
        description: "Install hardware and configure software",
        tasks: [
          "Install NAC appliances and servers",
          "Configure network infrastructure",
          "Set up management interfaces",
          "Implement basic policies and rules",
        ],
        icon: <Users className="h-4 w-4" />,
        color: "red",
      },
      {
        phase: "Testing & Validation",
        duration: 30,
        description: "Comprehensive testing and validation",
        tasks: [
          "Conduct system integration testing",
          "Validate policy enforcement",
          "Test failover and redundancy",
          "Performance and load testing",
        ],
        icon: <Shield className="h-4 w-4" />,
        color: "amber",
      },
      {
        phase: "Production Rollout",
        duration: 45,
        description: "Gradual rollout to production environment",
        tasks: [
          "Phase rollout across network segments",
          "Monitor system performance",
          "Address issues and fine-tune",
          "Complete user training and documentation",
        ],
        icon: <TrendingUp className="h-4 w-4" />,
        color: "indigo",
      },
    ],
    [],
  )

  const comparisonData = useMemo(() => {
    if (results.length === 0) return null

    const portnoxResult = results.find((r) => r.vendorId === "portnox")
    const otherResults = results.filter((r) => r.vendorId !== "portnox")

    if (!portnoxResult || otherResults.length === 0) return null

    // Safe access with default values
    const portnoxDays = portnoxResult.vendorData?.implementation?.timeToDeployDays || 30
    const avgTraditionalDays =
      otherResults.reduce((sum, result) => {
        return sum + (result.vendorData?.implementation?.timeToDeployDays || 180)
      }, 0) / otherResults.length

    return {
      portnox: {
        name: "Portnox CLEAR",
        days: portnoxDays,
        complexity: portnoxResult.vendorData?.implementation?.complexity || "low",
        professionalServices: portnoxResult.vendorData?.implementation?.professionalServicesRequired || false,
        trainingHours: portnoxResult.vendorData?.implementation?.trainingHours || 2,
      },
      traditional: {
        name: "Traditional NAC Average",
        days: Math.round(avgTraditionalDays),
        complexity: "high",
        professionalServices: true,
        trainingHours: Math.round(
          otherResults.reduce((sum, result) => {
            return sum + (result.vendorData?.implementation?.trainingHours || 40)
          }, 0) / otherResults.length,
        ),
      },
    }
  }, [results])

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
      purple: "bg-purple-50 border-purple-200 text-purple-800",
      green: "bg-green-50 border-green-200 text-green-800",
      slate: "bg-slate-50 border-slate-200 text-slate-800",
      orange: "bg-orange-50 border-orange-200 text-orange-800",
      red: "bg-red-50 border-red-200 text-red-800",
      amber: "bg-amber-50 border-amber-200 text-amber-800",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.slate
  }

  const getBadgeVariant = (complexity: string) => {
    switch (complexity) {
      case "low":
        return "default"
      case "medium":
        return "secondary"
      case "high":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (results.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
        <CardContent className="pt-6 text-center text-muted-foreground">
          <div className="flex flex-col items-center gap-4">
            <Calendar className="h-12 w-12 text-slate-400" />
            <p className="text-lg font-medium">No Implementation Data Available</p>
            <p className="text-sm">Please select vendors to compare implementation roadmaps and timelines.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Executive Summary */}
      {comparisonData && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-800">Portnox Deployment</CardTitle>
              <Rocket className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-700">{comparisonData.portnox.days} Days</div>
              <p className="text-xs text-emerald-600 mt-1">Complete implementation time</p>
              <Badge variant="default" className="mt-2 bg-emerald-200 text-emerald-800">
                {comparisonData.portnox.complexity} complexity
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-800">Traditional NAC</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-700">{comparisonData.traditional.days} Days</div>
              <p className="text-xs text-red-600 mt-1">Average implementation time</p>
              <Badge variant="destructive" className="mt-2">
                {comparisonData.traditional.complexity} complexity
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Time Savings</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">
                {Math.round(
                  ((comparisonData.traditional.days - comparisonData.portnox.days) / comparisonData.traditional.days) *
                    100,
                )}
                %
              </div>
              <p className="text-xs text-blue-600 mt-1">Faster than traditional NAC</p>
              <div className="text-xs text-blue-600 mt-1">
                ({comparisonData.traditional.days - comparisonData.portnox.days} days saved)
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Training Required</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-700">{comparisonData.portnox.trainingHours}h</div>
              <p className="text-xs text-purple-600 mt-1">vs {comparisonData.traditional.trainingHours}h traditional</p>
              <div className="text-xs text-purple-600 mt-1">
                {Math.round(
                  ((comparisonData.traditional.trainingHours - comparisonData.portnox.trainingHours) /
                    comparisonData.traditional.trainingHours) *
                    100,
                )}
                % less training
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Implementation Roadmaps Comparison */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Portnox CLEAR Roadmap */}
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-emerald-800 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Portnox CLEAR Implementation
                </CardTitle>
                <CardDescription className="text-emerald-600">Rapid cloud-native deployment in 30 days</CardDescription>
              </div>
              <Badge className="bg-emerald-200 text-emerald-800">30 Days Total</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {portnoxRoadmap.map((phase, index) => (
              <div key={phase.phase} className="relative">
                {index < portnoxRoadmap.length - 1 && (
                  <div className="absolute left-4 top-8 w-0.5 h-16 bg-emerald-200" />
                )}
                <div className={`rounded-lg border p-4 ${getColorClasses(phase.color)}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      {phase.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{phase.phase}</h4>
                      <p className="text-sm opacity-80">{phase.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {phase.duration} days
                    </Badge>
                  </div>
                  <ul className="space-y-1 ml-11">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="text-sm flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Traditional NAC Roadmap */}
        <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Traditional NAC Implementation
                </CardTitle>
                <CardDescription className="text-slate-600">Complex on-premise deployment in 6+ months</CardDescription>
              </div>
              <Badge variant="destructive">210 Days Total</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {traditionalRoadmap.map((phase, index) => (
              <div key={phase.phase} className="relative">
                {index < traditionalRoadmap.length - 1 && (
                  <div className="absolute left-4 top-8 w-0.5 h-16 bg-slate-200" />
                )}
                <div className={`rounded-lg border p-4 ${getColorClasses(phase.color)}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      {phase.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{phase.phase}</h4>
                      <p className="text-sm opacity-80">{phase.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {phase.duration} days
                    </Badge>
                  </div>
                  <ul className="space-y-1 ml-11">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="text-sm flex items-center gap-2">
                        <AlertCircle className="h-3 w-3 text-amber-600 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Implementation Comparison Summary */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Implementation Advantage Analysis
          </CardTitle>
          <CardDescription className="text-blue-600">
            Key advantages of Portnox CLEAR's implementation approach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white/50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="h-5 w-5 text-emerald-600" />
                <span className="font-semibold text-slate-800">Rapid Deployment</span>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                Deploy in 30 days vs 6+ months for traditional NAC solutions.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Portnox CLEAR</span>
                  <span className="font-medium">30 days</span>
                </div>
                <Progress value={14} className="h-2" />
                <div className="flex justify-between text-xs">
                  <span>Traditional NAC</span>
                  <span className="font-medium">210 days</span>
                </div>
                <Progress value={100} className="h-2 opacity-60" />
              </div>
            </div>

            <div className="bg-white/50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-slate-800">Zero Infrastructure</span>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                No hardware procurement, installation, or maintenance required.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-emerald-100 rounded p-2 text-center">
                  <div className="font-medium text-emerald-800">Portnox</div>
                  <div className="text-emerald-600">Cloud-Native</div>
                </div>
                <div className="bg-red-100 rounded p-2 text-center">
                  <div className="font-medium text-red-800">Traditional</div>
                  <div className="text-red-600">Hardware Required</div>
                </div>
              </div>
            </div>

            <div className="bg-white/50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-slate-800">Minimal Training</span>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                Intuitive interface requires minimal training compared to complex traditional systems.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Portnox Training</span>
                  <span className="font-medium">2 hours</span>
                </div>
                <Progress value={5} className="h-2" />
                <div className="flex justify-between text-xs">
                  <span>Traditional Training</span>
                  <span className="font-medium">40 hours</span>
                </div>
                <Progress value={100} className="h-2 opacity-60" />
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                Portnox CLEAR Advantages
              </h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• Cloud-native architecture eliminates hardware dependencies</li>
                <li>• Automated deployment and configuration processes</li>
                <li>• Minimal professional services requirements</li>
                <li>• Rapid time-to-value with immediate security benefits</li>
                <li>• Continuous updates without maintenance windows</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                Traditional NAC Challenges
              </h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• Complex hardware procurement and installation</li>
                <li>• Extensive professional services requirements</li>
                <li>• Long testing and validation phases</li>
                <li>• High risk of deployment delays and cost overruns</li>
                <li>• Ongoing maintenance and update complexities</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
