"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, Users, Zap } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ImplementationRoadmapViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function ImplementationRoadmapView({ results = [], config }: ImplementationRoadmapViewProps) {
  const roadmapData = useMemo(() => {
    return results.map((result) => {
      const isPortnox = result.vendorId === "portnox"

      // Safe access to implementation data with defaults
      const implementation = result.vendorData?.implementation || {}
      const deploymentTime = implementation.deploymentTime || {}
      const resourcesRequired = implementation.resourcesRequired || {}

      const phases = isPortnox
        ? [
            {
              name: "Setup & Discovery",
              duration: "1-2 Days",
              tasks: ["Account Provisioning", "Network Discovery", "Initial Policy Setup"],
            },
            {
              name: "Policy Deployment",
              duration: "2-3 Days",
              tasks: ["User Group Policies", "Device Compliance", "Enforcement Testing"],
            },
            {
              name: "Production Rollout",
              duration: "1 Week",
              tasks: ["Gradual Rollout", "User Training", "Full Production"],
            },
          ]
        : [
            {
              name: "Planning & Design",
              duration: "1-2 Months",
              tasks: ["Requirements Gathering", "Architecture Design", "Hardware Procurement"],
            },
            {
              name: "Infrastructure Setup",
              duration: "2-3 Months",
              tasks: ["Hardware Installation", "Network Changes", "System Integration"],
            },
            {
              name: "Deployment & Training",
              duration: "2-3 Months",
              tasks: ["Policy Configuration", "User Certification", "Phased Rollout"],
            },
          ]

      // Get deployment time with fallbacks
      const totalTime = deploymentTime.fullDeployment || getDefaultDeploymentTime(result.vendorId)

      // Get complexity with fallback
      const complexity = implementation.complexity || getDefaultComplexity(result.vendorId)

      // Calculate resources with fallbacks
      const technical = resourcesRequired.technical || getDefaultTechnicalResources(result.vendorId)
      const administrative = resourcesRequired.administrative || getDefaultAdminResources(result.vendorId)
      const totalResources = technical + administrative

      return {
        vendorName: result.vendorName,
        vendorId: result.vendorId,
        totalTime,
        complexity,
        resources: totalResources,
        phases,
        isPortnox,
      }
    })
  }, [results])

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Please select vendors to compare implementation roadmaps.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {roadmapData.map((vendor) => (
          <Card key={vendor.vendorId} className={vendor.isPortnox ? "border-green-200 bg-green-50" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {vendor.vendorName}
                {vendor.isPortnox && <Badge className="bg-green-600">Recommended</Badge>}
              </CardTitle>
              <CardDescription>Implementation Overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{vendor.totalTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <Badge
                  variant={
                    vendor.complexity === "low"
                      ? "default"
                      : vendor.complexity === "medium"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {vendor.complexity} complexity
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{vendor.resources.toFixed(1)} FTEs required</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Roadmaps */}
      <div className="grid gap-6 lg:grid-cols-2">
        {roadmapData.map((vendor) => (
          <Card key={vendor.vendorId}>
            <CardHeader>
              <CardTitle className={vendor.isPortnox ? "text-green-600" : ""}>
                {vendor.vendorName} Implementation Roadmap
              </CardTitle>
              <CardDescription>
                Total Timeline: {vendor.totalTime} • Complexity: {vendor.complexity}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6">
                <div className="absolute left-3 top-0 h-full w-0.5 bg-border" />
                {vendor.phases.map((phase, index) => (
                  <div key={phase.name} className="relative mb-8 last:mb-0">
                    <div className="absolute -left-[29px] top-1 flex h-7 w-7 items-center justify-center rounded-full bg-background border-2 border-primary">
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{phase.name}</h4>
                        <Badge variant="outline">{phase.duration}</Badge>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {phase.tasks.map((task) => (
                          <li key={task} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Implementation Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Comparison Summary</CardTitle>
          <CardDescription>Key differences in deployment approach and timeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Vendor</th>
                  <th className="text-left p-2">Timeline</th>
                  <th className="text-left p-2">Complexity</th>
                  <th className="text-left p-2">Resources</th>
                  <th className="text-left p-2">Key Advantage</th>
                </tr>
              </thead>
              <tbody>
                {roadmapData.map((vendor) => (
                  <tr key={vendor.vendorId} className="border-b">
                    <td className="p-2 font-medium">{vendor.vendorName}</td>
                    <td className="p-2">{vendor.totalTime}</td>
                    <td className="p-2">
                      <Badge
                        variant={
                          vendor.complexity === "low"
                            ? "default"
                            : vendor.complexity === "medium"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {vendor.complexity}
                      </Badge>
                    </td>
                    <td className="p-2">{vendor.resources.toFixed(1)} FTEs</td>
                    <td className="p-2 text-muted-foreground">{getKeyAdvantage(vendor.vendorId)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper functions to provide default values
function getDefaultDeploymentTime(vendorId: string): string {
  const times: Record<string, string> = {
    portnox: "30 minutes",
    foxpass: "1-2 days",
    securew2: "1-2 weeks",
    aruba: "3-6 months",
    forescout: "2-4 months",
    cisco: "6-9 months",
    extreme: "2-3 months",
    juniper: "1-3 months",
    fortinet: "3-6 months",
    arista: "2-4 months",
    microsoft: "1-2 months",
    meraki: "1-2 months",
    packetfence: "4-8 months",
    ivanti: "6-12 months",
  }
  return times[vendorId] || "3-6 months"
}

function getDefaultComplexity(vendorId: string): string {
  const complexity: Record<string, string> = {
    portnox: "low",
    foxpass: "low",
    securew2: "medium",
    aruba: "medium",
    forescout: "medium",
    cisco: "high",
    extreme: "medium",
    juniper: "medium",
    fortinet: "high",
    arista: "medium",
    microsoft: "low",
    meraki: "low",
    packetfence: "high",
    ivanti: "high",
  }
  return complexity[vendorId] || "medium"
}

function getDefaultTechnicalResources(vendorId: string): number {
  const resources: Record<string, number> = {
    portnox: 0.1,
    foxpass: 0.2,
    securew2: 0.5,
    aruba: 1.5,
    forescout: 1.2,
    cisco: 2.5,
    extreme: 1.0,
    juniper: 1.2,
    fortinet: 2.0,
    arista: 1.0,
    microsoft: 0.8,
    meraki: 0.5,
    packetfence: 2.0,
    ivanti: 2.5,
  }
  return resources[vendorId] || 1.0
}

function getDefaultAdminResources(vendorId: string): number {
  const resources: Record<string, number> = {
    portnox: 0.1,
    foxpass: 0.2,
    securew2: 0.3,
    aruba: 0.8,
    forescout: 0.8,
    cisco: 1.5,
    extreme: 0.5,
    juniper: 0.8,
    fortinet: 1.0,
    arista: 0.5,
    microsoft: 0.5,
    meraki: 0.3,
    packetfence: 1.0,
    ivanti: 1.5,
  }
  return resources[vendorId] || 0.5
}

function getKeyAdvantage(vendorId: string): string {
  const advantages: Record<string, string> = {
    portnox: "Zero infrastructure, instant deployment",
    cisco: "Comprehensive feature set",
    aruba: "Best traditional NAC value",
    forescout: "Excellent IoT/OT support",
    extreme: "Flexible deployment options",
    juniper: "AI-driven insights",
    fortinet: "Security fabric integration",
    arista: "Cloud-native architecture",
    foxpass: "Simple cloud RADIUS",
    securew2: "Managed PKI expertise",
    microsoft: "Windows integration",
    meraki: "Cloud management",
    packetfence: "Open source flexibility",
    ivanti: "Legacy support (EOL)",
  }
  return advantages[vendorId] || "Established solution"
}
