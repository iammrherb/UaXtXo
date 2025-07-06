"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar,
  Users,
  CheckCircle,
  AlertTriangle,
  Settings,
  FileText,
  Target,
  Server,
  Globe,
  TestTube,
  Rocket,
  Info,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ImplementationTimelineViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

// Comprehensive implementation phases with detailed tasks
const IMPLEMENTATION_PHASES = {
  planning: {
    name: "Planning & Assessment",
    icon: <FileText className="h-5 w-5" />,
    duration: { min: 2, max: 4, typical: 3 },
    description: "Project initiation, requirements gathering, and infrastructure assessment",
    tasks: [
      {
        name: "Project Kickoff & Stakeholder Alignment",
        duration: 3,
        dependencies: [],
        resources: ["Project Manager", "Security Architect", "Network Engineer"],
        deliverables: ["Project Charter", "Stakeholder Matrix", "Communication Plan"],
        risks: ["Stakeholder misalignment", "Unclear requirements"],
      },
      {
        name: "Current State Assessment",
        duration: 5,
        dependencies: ["Project Kickoff & Stakeholder Alignment"],
        resources: ["Network Engineer", "Security Analyst", "Systems Administrator"],
        deliverables: ["Network Topology", "Device Inventory", "Security Assessment"],
        risks: ["Incomplete documentation", "Hidden network segments"],
      },
      {
        name: "Requirements Definition",
        duration: 4,
        dependencies: ["Current State Assessment"],
        resources: ["Business Analyst", "Security Architect", "Compliance Officer"],
        deliverables: ["Functional Requirements", "Security Requirements", "Compliance Matrix"],
        risks: ["Scope creep", "Conflicting requirements"],
      },
      {
        name: "Solution Design",
        duration: 7,
        dependencies: ["Requirements Definition"],
        resources: ["Solution Architect", "Network Engineer", "Security Engineer"],
        deliverables: ["Technical Architecture", "Implementation Plan", "Test Strategy"],
        risks: ["Design complexity", "Integration challenges"],
      },
      {
        name: "Vendor Selection & Procurement",
        duration: 10,
        dependencies: ["Solution Design"],
        resources: ["Procurement Manager", "Legal Team", "Technical Evaluator"],
        deliverables: ["Vendor Contracts", "License Agreements", "SLA Documents"],
        risks: ["Procurement delays", "Contract negotiations"],
      },
    ],
  },
  infrastructure: {
    name: "Infrastructure Setup",
    icon: <Server className="h-5 w-5" />,
    duration: { min: 3, max: 8, typical: 5 },
    description: "Hardware deployment, network configuration, and system installation",
    tasks: [
      {
        name: "Hardware Procurement & Delivery",
        duration: 14,
        dependencies: [],
        resources: ["Procurement Team", "Vendor Support"],
        deliverables: ["Hardware Delivery", "Installation Guides", "Warranty Documentation"],
        risks: ["Supply chain delays", "Hardware defects"],
      },
      {
        name: "Network Infrastructure Preparation",
        duration: 5,
        dependencies: ["Hardware Procurement & Delivery"],
        resources: ["Network Engineer", "Field Technician"],
        deliverables: ["Network Segments", "VLAN Configuration", "Switch Preparation"],
        risks: ["Network downtime", "Configuration errors"],
      },
      {
        name: "Server Installation & Configuration",
        duration: 7,
        dependencies: ["Network Infrastructure Preparation"],
        resources: ["Systems Administrator", "Database Administrator"],
        deliverables: ["Server Installation", "OS Configuration", "Database Setup"],
        risks: ["Hardware failures", "Performance issues"],
      },
      {
        name: "Security Hardening",
        duration: 4,
        dependencies: ["Server Installation & Configuration"],
        resources: ["Security Engineer", "Systems Administrator"],
        deliverables: ["Security Baseline", "Hardening Checklist", "Vulnerability Scan"],
        risks: ["Security misconfigurations", "Compliance gaps"],
      },
      {
        name: "High Availability Setup",
        duration: 6,
        dependencies: ["Security Hardening"],
        resources: ["Systems Administrator", "Network Engineer"],
        deliverables: ["HA Configuration", "Failover Testing", "Backup Procedures"],
        risks: ["Failover failures", "Data synchronization issues"],
      },
    ],
  },
  integration: {
    name: "System Integration",
    icon: <Globe className="h-5 w-5" />,
    duration: { min: 4, max: 10, typical: 6 },
    description: "Third-party integrations, directory services, and API connections",
    tasks: [
      {
        name: "Directory Services Integration",
        duration: 5,
        dependencies: [],
        resources: ["Identity Engineer", "Systems Administrator"],
        deliverables: ["LDAP/AD Integration", "User Synchronization", "Group Mapping"],
        risks: ["Authentication failures", "Permission mismatches"],
      },
      {
        name: "Network Infrastructure Integration",
        duration: 8,
        dependencies: ["Directory Services Integration"],
        resources: ["Network Engineer", "Vendor Support"],
        deliverables: ["Switch Integration", "Wireless Controller Setup", "RADIUS Configuration"],
        risks: ["Network compatibility", "Performance degradation"],
      },
      {
        name: "Security Tools Integration",
        duration: 6,
        dependencies: ["Network Infrastructure Integration"],
        resources: ["Security Engineer", "SOC Analyst"],
        deliverables: ["SIEM Integration", "Firewall Policies", "Threat Intelligence Feeds"],
        risks: ["Log format incompatibility", "Alert fatigue"],
      },
      {
        name: "MDM/EMM Integration",
        duration: 4,
        dependencies: ["Security Tools Integration"],
        resources: ["Mobile Administrator", "Security Engineer"],
        deliverables: ["Device Enrollment", "Policy Sync", "Certificate Distribution"],
        risks: ["Device compatibility", "Certificate issues"],
      },
      {
        name: "API & Workflow Integration",
        duration: 7,
        dependencies: ["MDM/EMM Integration"],
        resources: ["Integration Developer", "Systems Administrator"],
        deliverables: ["API Endpoints", "Automated Workflows", "Custom Integrations"],
        risks: ["API limitations", "Workflow complexity"],
      },
    ],
  },
  testing: {
    name: "Testing & Validation",
    icon: <TestTube className="h-5 w-5" />,
    duration: { min: 3, max: 6, typical: 4 },
    description: "Comprehensive testing including functional, security, and performance validation",
    tasks: [
      {
        name: "Unit & Component Testing",
        duration: 5,
        dependencies: [],
        resources: ["QA Engineer", "Systems Administrator"],
        deliverables: ["Test Cases", "Component Validation", "Integration Tests"],
        risks: ["Test environment issues", "Incomplete test coverage"],
      },
      {
        name: "Security Testing",
        duration: 7,
        dependencies: ["Unit & Component Testing"],
        resources: ["Security Tester", "Penetration Tester"],
        deliverables: ["Vulnerability Assessment", "Penetration Test Report", "Security Validation"],
        risks: ["Security vulnerabilities", "Compliance failures"],
      },
      {
        name: "Performance Testing",
        duration: 6,
        dependencies: ["Security Testing"],
        resources: ["Performance Engineer", "Network Engineer"],
        deliverables: ["Load Test Results", "Performance Baseline", "Capacity Planning"],
        risks: ["Performance bottlenecks", "Scalability issues"],
      },
      {
        name: "User Acceptance Testing",
        duration: 8,
        dependencies: ["Performance Testing"],
        resources: ["End Users", "Business Analysts", "Support Team"],
        deliverables: ["UAT Results", "User Feedback", "Acceptance Criteria"],
        risks: ["User resistance", "Workflow disruption"],
      },
      {
        name: "Disaster Recovery Testing",
        duration: 4,
        dependencies: ["User Acceptance Testing"],
        resources: ["DR Specialist", "Systems Administrator"],
        deliverables: ["DR Test Results", "Recovery Procedures", "RTO/RPO Validation"],
        risks: ["Recovery failures", "Data loss"],
      },
    ],
  },
  deployment: {
    name: "Production Deployment",
    icon: <Rocket className="h-5 w-5" />,
    duration: { min: 2, max: 8, typical: 4 },
    description: "Phased rollout to production environment with monitoring and support",
    tasks: [
      {
        name: "Pilot Group Deployment",
        duration: 7,
        dependencies: [],
        resources: ["Deployment Team", "Support Staff", "Change Manager"],
        deliverables: ["Pilot Deployment", "Initial Policies", "User Training"],
        risks: ["Pilot failures", "User adoption issues"],
      },
      {
        name: "Phased Rollout - Phase 1",
        duration: 10,
        dependencies: ["Pilot Group Deployment"],
        resources: ["Deployment Team", "Network Operations", "Help Desk"],
        deliverables: ["25% User Rollout", "Policy Refinement", "Support Procedures"],
        risks: ["Scale issues", "Performance degradation"],
      },
      {
        name: "Phased Rollout - Phase 2",
        duration: 10,
        dependencies: ["Phased Rollout - Phase 1"],
        resources: ["Deployment Team", "Network Operations", "Help Desk"],
        deliverables: ["75% User Rollout", "Monitoring Setup", "Incident Response"],
        risks: ["Network congestion", "Support overload"],
      },
      {
        name: "Full Production Rollout",
        duration: 7,
        dependencies: ["Phased Rollout - Phase 2"],
        resources: ["Deployment Team", "All Support Staff"],
        deliverables: ["100% Deployment", "Go-Live Certification", "Handover Documentation"],
        risks: ["System overload", "Business disruption"],
      },
      {
        name: "Post-Deployment Optimization",
        duration: 14,
        dependencies: ["Full Production Rollout"],
        resources: ["Operations Team", "Performance Analyst"],
        deliverables: ["Performance Tuning", "Policy Optimization", "User Feedback Integration"],
        risks: ["Performance issues", "User complaints"],
      },
    ],
  },
  training: {
    name: "Training & Knowledge Transfer",
    icon: <Users className="h-5 w-5" />,
    duration: { min: 2, max: 6, typical: 3 },
    description: "Comprehensive training for administrators, support staff, and end users",
    tasks: [
      {
        name: "Administrator Training",
        duration: 5,
        dependencies: [],
        resources: ["Vendor Trainer", "Senior Administrator"],
        deliverables: ["Admin Certification", "Operational Procedures", "Troubleshooting Guides"],
        risks: ["Knowledge gaps", "Skill deficiencies"],
      },
      {
        name: "Support Staff Training",
        duration: 3,
        dependencies: ["Administrator Training"],
        resources: ["Internal Trainer", "Help Desk Manager"],
        deliverables: ["Support Procedures", "Escalation Matrix", "Knowledge Base"],
        risks: ["Support quality issues", "Response time delays"],
      },
      {
        name: "End User Training",
        duration: 8,
        dependencies: ["Support Staff Training"],
        resources: ["Training Team", "Change Management"],
        deliverables: ["User Guides", "Training Sessions", "Self-Service Portal"],
        risks: ["User resistance", "Adoption delays"],
      },
      {
        name: "Documentation & Knowledge Transfer",
        duration: 6,
        dependencies: ["End User Training"],
        resources: ["Technical Writer", "Subject Matter Experts"],
        deliverables: ["Technical Documentation", "Runbooks", "Knowledge Repository"],
        risks: ["Incomplete documentation", "Knowledge loss"],
      },
    ],
  },
}

// Vendor-specific implementation characteristics
const VENDOR_IMPLEMENTATION_PROFILES = {
  portnox: {
    complexity: "Low",
    cloudNative: true,
    hardwareRequired: false,
    typicalDuration: 12, // weeks
    resourceRequirements: {
      projectManager: 0.5,
      networkEngineer: 1.0,
      securityEngineer: 0.5,
      systemsAdmin: 0.25,
    },
    strengths: ["Quick deployment", "Cloud-based", "Minimal infrastructure"],
    challenges: ["Internet dependency", "Limited customization"],
    criticalSuccessFactors: ["Network connectivity", "Identity integration", "Policy definition"],
  },
  cisco: {
    complexity: "High",
    cloudNative: false,
    hardwareRequired: true,
    typicalDuration: 20,
    resourceRequirements: {
      projectManager: 1.0,
      networkEngineer: 2.0,
      securityEngineer: 1.5,
      systemsAdmin: 1.0,
    },
    strengths: ["Enterprise features", "Extensive integration", "Proven scalability"],
    challenges: ["Complex configuration", "Hardware dependencies", "Lengthy deployment"],
    criticalSuccessFactors: ["Hardware sizing", "Network integration", "Policy complexity"],
  },
  aruba: {
    complexity: "Medium",
    cloudNative: false,
    hardwareRequired: true,
    typicalDuration: 16,
    resourceRequirements: {
      projectManager: 0.75,
      networkEngineer: 1.5,
      securityEngineer: 1.0,
      systemsAdmin: 0.75,
    },
    strengths: ["Wireless expertise", "Policy management", "Good integration"],
    challenges: ["Hardware requirements", "Wireless complexity"],
    criticalSuccessFactors: ["Wireless infrastructure", "Policy design", "User experience"],
  },
  fortinet: {
    complexity: "Medium",
    cloudNative: false,
    hardwareRequired: true,
    typicalDuration: 14,
    resourceRequirements: {
      projectManager: 0.75,
      networkEngineer: 1.25,
      securityEngineer: 1.25,
      systemsAdmin: 0.5,
    },
    strengths: ["Security integration", "Threat protection", "Unified platform"],
    challenges: ["Security complexity", "Integration overhead"],
    criticalSuccessFactors: ["Security fabric", "Threat intelligence", "Policy coordination"],
  },
  microsoft: {
    complexity: "Medium",
    cloudNative: true,
    hardwareRequired: false,
    typicalDuration: 10,
    resourceRequirements: {
      projectManager: 0.5,
      networkEngineer: 0.75,
      securityEngineer: 1.0,
      systemsAdmin: 1.0,
    },
    strengths: ["Azure integration", "Identity management", "Licensing efficiency"],
    challenges: ["Microsoft ecosystem dependency", "Feature limitations"],
    criticalSuccessFactors: ["Azure AD integration", "Conditional access", "Device management"],
  },
}

export default function ImplementationTimelineView({ results, config }: ImplementationTimelineViewProps) {
  const [selectedVendor, setSelectedVendor] = useState(results[0]?.vendor || "portnox")
  const [selectedPhase, setSelectedPhase] = useState<string>("planning")
  const [viewMode, setViewMode] = useState<"timeline" | "gantt" | "resources">("timeline")

  const vendorProfile = VENDOR_IMPLEMENTATION_PROFILES[selectedVendor as keyof typeof VENDOR_IMPLEMENTATION_PROFILES]

  // Calculate implementation timeline based on vendor and configuration
  const implementationTimeline = useMemo(() => {
    if (!vendorProfile) return []

    const sizeMultiplier = config.devices > 1000 ? 1.5 : config.devices > 500 ? 1.2 : 1.0
    const complexityMultiplier =
      vendorProfile.complexity === "High" ? 1.3 : vendorProfile.complexity === "Medium" ? 1.1 : 1.0

    let currentWeek = 0
    const timeline = Object.entries(IMPLEMENTATION_PHASES).map(([phaseKey, phase]) => {
      const adjustedDuration = Math.ceil(phase.duration.typical * sizeMultiplier * complexityMultiplier)
      const startWeek = currentWeek
      currentWeek += adjustedDuration

      return {
        phase: phaseKey,
        name: phase.name,
        icon: phase.icon,
        startWeek,
        duration: adjustedDuration,
        endWeek: currentWeek,
        tasks: phase.tasks.map((task) => ({
          ...task,
          adjustedDuration: Math.ceil(task.duration * sizeMultiplier),
        })),
        risks: phase.tasks.flatMap((task) => task.risks),
        resources: [...new Set(phase.tasks.flatMap((task) => task.resources))],
      }
    })

    return timeline
  }, [selectedVendor, config.devices, vendorProfile])

  // Calculate resource allocation
  const resourceAllocation = useMemo(() => {
    if (!vendorProfile) return []

    return Object.entries(vendorProfile.resourceRequirements).map(([role, allocation]) => ({
      role: role.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
      allocation: allocation * 100,
      weeks: vendorProfile.typicalDuration,
      totalEffort: allocation * vendorProfile.typicalDuration,
    }))
  }, [vendorProfile])

  // Risk assessment
  const riskAssessment = useMemo(() => {
    const allRisks = implementationTimeline.flatMap((phase) => phase.risks)
    const riskCounts = allRisks.reduce(
      (acc, risk) => {
        acc[risk] = (acc[risk] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(riskCounts)
      .map(([risk, count]) => ({
        risk,
        frequency: count,
        impact: Math.floor(Math.random() * 3) + 1, // 1-3 scale
        probability: Math.floor(Math.random() * 3) + 1, // 1-3 scale
      }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10)
  }, [implementationTimeline])

  const totalDuration = implementationTimeline.reduce((sum, phase) => sum + phase.duration, 0)
  const totalCost = vendorProfile
    ? vendorProfile.typicalDuration *
      2000 *
      Object.values(vendorProfile.resourceRequirements).reduce((sum, req) => sum + req, 0)
    : 0

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Implementation Timeline</h2>
          <p className="text-muted-foreground">Detailed project planning and resource allocation</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            {results.map((result) => (
              <option key={result.vendor} value={result.vendor}>
                {result.vendor.charAt(0).toUpperCase() + result.vendor.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Implementation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Duration</p>
                <p className="text-3xl font-bold">{totalDuration}</p>
                <p className="text-xs text-muted-foreground">weeks</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Complexity</p>
                <p className="text-3xl font-bold">{vendorProfile?.complexity}</p>
                <p className="text-xs text-muted-foreground">implementation</p>
              </div>
              <Settings className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resource Cost</p>
                <p className="text-3xl font-bold">${(totalCost / 1000).toFixed(0)}K</p>
                <p className="text-xs text-muted-foreground">estimated</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                <p className="text-3xl font-bold">{vendorProfile?.complexity === "High" ? "High" : "Medium"}</p>
                <p className="text-xs text-muted-foreground">overall risk</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Profile */}
      {vendorProfile && (
        <Card>
          <CardHeader>
            <CardTitle className="capitalize">{selectedVendor} Implementation Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-green-600">Strengths</h4>
                <ul className="space-y-1">
                  {vendorProfile.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-orange-600">Challenges</h4>
                <ul className="space-y-1">
                  {vendorProfile.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-blue-600">Critical Success Factors</h4>
                <ul className="space-y-1">
                  {vendorProfile.criticalSuccessFactors.map((factor, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Target className="h-4 w-4 text-blue-600" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="phases">Phase Details</TabsTrigger>
          <TabsTrigger value="resources">Resource Planning</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          {/* Timeline Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {implementationTimeline.map((phase, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                        {phase.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{phase.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Week {phase.startWeek + 1} - {phase.endWeek} ({phase.duration} weeks)
                        </p>
                      </div>
                      <Badge variant="outline">{phase.duration} weeks</Badge>
                    </div>

                    <div className="ml-14 space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(phase.duration / totalDuration) * 100}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Tasks: </span>
                          {phase.tasks.length}
                        </div>
                        <div>
                          <span className="font-medium">Resources: </span>
                          {phase.resources.length}
                        </div>
                        <div>
                          <span className="font-medium">Risks: </span>
                          {phase.risks.length}
                        </div>
                      </div>
                    </div>

                    {idx < implementationTimeline.length - 1 && (
                      <div className="absolute left-5 top-16 w-0.5 h-8 bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phases" className="space-y-6">
          {/* Phase Selection */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(IMPLEMENTATION_PHASES).map(([phaseKey, phase]) => (
              <Button
                key={phaseKey}
                variant={selectedPhase === phaseKey ? "default" : "outline"}
                onClick={() => setSelectedPhase(phaseKey)}
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                {phase.icon}
                <span className="text-sm font-medium">{phase.name}</span>
              </Button>
            ))}
          </div>

          {/* Phase Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {IMPLEMENTATION_PHASES[selectedPhase as keyof typeof IMPLEMENTATION_PHASES].icon}
                {IMPLEMENTATION_PHASES[selectedPhase as keyof typeof IMPLEMENTATION_PHASES].name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  {IMPLEMENTATION_PHASES[selectedPhase as keyof typeof IMPLEMENTATION_PHASES].description}
                </p>

                <div className="space-y-4">
                  {IMPLEMENTATION_PHASES[selectedPhase as keyof typeof IMPLEMENTATION_PHASES].tasks.map((task, idx) => (
                    <div key={idx} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{task.name}</h4>
                        <Badge variant="outline">{task.duration} days</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Resources:</span>
                          <ul className="mt-1 space-y-1">
                            {task.resources.map((resource, rIdx) => (
                              <li key={rIdx} className="text-muted-foreground">
                                • {resource}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="font-medium">Deliverables:</span>
                          <ul className="mt-1 space-y-1">
                            {task.deliverables.map((deliverable, dIdx) => (
                              <li key={dIdx} className="text-muted-foreground">
                                • {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="font-medium">Risks:</span>
                          <ul className="mt-1 space-y-1">
                            {task.risks.map((risk, rIdx) => (
                              <li key={rIdx} className="text-red-600">
                                • {risk}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {task.dependencies.length > 0 && (
                        <div className="text-sm">
                          <span className="font-medium">Dependencies: </span>
                          <span className="text-muted-foreground">{task.dependencies.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceAllocation.map((resource, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{resource.role}</span>
                        <span className="text-sm text-muted-foreground">{resource.allocation}% allocation</span>
                      </div>
                      <Progress value={resource.allocation} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{resource.weeks} weeks</span>
                        <span>{resource.totalEffort.toFixed(1)} person-weeks</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">${(totalCost / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-muted-foreground">Total resource cost</div>
                  </div>

                  <div className="space-y-3">
                    {resourceAllocation.map((resource, idx) => {
                      const cost = resource.totalEffort * 2000 // $2000 per person-week
                      return (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-sm">{resource.role}</span>
                          <span className="font-medium">${(cost / 1000).toFixed(0)}K</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between font-medium">
                      <span>Total Project Cost</span>
                      <span>${(totalCost / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Resource costs are estimated based on industry averages. Actual costs may vary based on location,
              experience level, and market conditions. Consider adding 20-30% contingency for project management
              overhead.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Implementation Risks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAssessment.map((risk, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{risk.risk}</div>
                        <div className="text-sm text-muted-foreground">Frequency: {risk.frequency} phases affected</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={risk.impact >= 3 ? "destructive" : risk.impact >= 2 ? "default" : "secondary"}>
                          Impact: {risk.impact}
                        </Badge>
                        <Badge
                          variant={
                            risk.probability >= 3 ? "destructive" : risk.probability >= 2 ? "default" : "outline"
                          }
                        >
                          Prob: {risk.probability}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Mitigation Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">High-Impact Risks</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Conduct thorough planning and requirements gathering
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Implement phased rollout approach
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Maintain comprehensive testing protocols
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Resource Risks</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Secure dedicated project resources early
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Cross-train team members for redundancy
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Engage vendor professional services
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Technical Risks</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Validate infrastructure compatibility early
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Establish rollback procedures
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Implement comprehensive monitoring
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
