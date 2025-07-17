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
      const { implementation } = result.vendorData
      const isPortnox = result.vendorId === "portnox"

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

      return {
        vendorName: result.vendorName,
        vendorId: result.vendorId,
        totalTime: implementation.deploymentTime.fullDeployment,
        complexity: implementation.complexity,
        resources: implementation.resourcesRequired.technical + implementation.resourcesRequired.administrative,
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {roadmapData.map((vendor) => (
          <Card key={vendor.vendorId} className={vendor.isPortnox ? "border-portnox-primary" : ""}>
            <CardHeader>
              <CardTitle>{vendor.vendorName}</CardTitle>
              <CardDescription>Implementation Overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{vendor.totalTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <Badge variant={vendor.complexity === "low" ? "default" : "destructive"}>
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

      <div className="grid gap-6 lg:grid-cols-2">
        {roadmapData.map((vendor) => (
          <Card key={vendor.vendorId}>
            <CardHeader>
              <CardTitle className={vendor.isPortnox ? "text-portnox-primary" : ""}>
                {vendor.vendorName} Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6">
                <div className="absolute left-3 top-0 h-full w-0.5 bg-border" />
                {vendor.phases.map((phase, index) => (
                  <div key={phase.name} className="relative mb-8">
                    <div className="absolute -left-[29px] top-1 flex h-7 w-7 items-center justify-center rounded-full bg-background border-2 border-primary">
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{phase.name}</h4>
                        <Badge variant="secondary">{phase.duration}</Badge>
                      </div>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
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
    </div>
  )
}
