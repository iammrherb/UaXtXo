"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import { staggerChildren, fadeInUp } from "./shared-ui"
import { UsersIcon, RocketIcon, TrendingUpIcon, ClipboardList, Network } from "lucide-react"

export default function ImplementationTimelineView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  const vendorId = results[0]?.vendor || "portnox"
  const vendor = ComprehensiveVendorDatabase[vendorId]

  if (!vendor) return <Card className="p-6 text-center">Select a vendor to see the roadmap.</Card>

  const roadmapPhases = [
    {
      name: "Phase 1: Planning & Design",
      duration: "1-2 Weeks",
      icon: <ClipboardList />,
      tasks: ["Define project scope & goals", "Identify stakeholders", "Analyze existing infrastructure"],
    },
    {
      name: "Phase 2: Integration & Setup",
      duration: "1-3 Weeks",
      icon: <Network />,
      tasks: ["Integrate with Identity Providers", "Setup cloud connectors/virtual appliances"],
    },
    {
      name: "Phase 3: Pilot Deployment",
      duration: "2-4 Weeks",
      icon: <UsersIcon />,
      tasks: ["Onboard a pilot group", "Develop and test initial policies"],
    },
    {
      name: "Phase 4: Production Rollout",
      duration: "Varies",
      icon: <RocketIcon />,
      tasks: ["Phased rollout to all users/sites", "Monitor system performance"],
    },
    {
      name: "Phase 5: Optimization",
      duration: "Ongoing",
      icon: <TrendingUpIcon />,
      tasks: ["Fine-tune policies", "Expand automation"],
    },
  ]

  return (
    <motion.div initial="initial" animate="animate" variants={staggerChildren}>
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Implementation Roadmap for {vendor.name}</CardTitle>
            <CardDescription>A high-level plan for a successful deployment.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6">
              <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-border"></div>
              <div className="space-y-8">
                {roadmapPhases.map((phase) => (
                  <div key={phase.name} className="relative flex items-start">
                    <div className="absolute left-0 top-1 flex h-14 w-14 items-center justify-center rounded-full bg-background border">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {phase.icon}
                      </div>
                    </div>
                    <div className="ml-20">
                      <h4 className="font-semibold text-lg">
                        {phase.name}{" "}
                        <span className="text-sm font-normal text-muted-foreground">({phase.duration})</span>
                      </h4>
                      <ul className="mt-2 list-disc list-inside text-muted-foreground space-y-1">
                        {phase.tasks.map((task) => (
                          <li key={task}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
