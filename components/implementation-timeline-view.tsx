"use client"

import type React from "react"
import { motion } from "framer-motion"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { SectionTitle, fadeInUp, staggerChildren } from "./shared-ui"
import { SlidersHorizontal, ClipboardList, Network, UsersIcon, RocketIcon, TrendingUpIcon } from "lucide-react"

interface ImplementationTimelineViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

const phaseIcons: { [key: string]: React.ReactElement } = {
  "Planning & Design": <ClipboardList />,
  "Integration & Setup": <Network />,
  "Pilot Deployment": <UsersIcon />,
  "Production Rollout": <RocketIcon />,
  Optimization: <TrendingUpIcon />,
}

export default function ImplementationTimelineView({ results, config }: ImplementationTimelineViewProps) {
  const selectedVendor = ComprehensiveVendorDatabase[results[0]?.vendor || "portnox"]

  return (
    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
      <motion.div variants={fadeInUp}>
        <SectionTitle
          icon={<SlidersHorizontal />}
          title="Implementation & Operations"
          description="Comparing deployment timelines, operational overhead, and implementation roadmaps."
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Implementation Roadmap for {selectedVendor.name}</h3>
            <p className="text-sm text-muted-foreground">A high-level plan for a successful deployment.</p>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6">
              <div className="absolute left-12 top-4 bottom-4 w-0.5 bg-border -translate-x-1/2"></div>
              <div className="space-y-12">
                {selectedVendor.implementation.roadmap.map((phase, index) => (
                  <motion.div
                    key={phase.name}
                    className="relative flex items-start"
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: (i) => ({
                        opacity: 1,
                        x: 0,
                        transition: { delay: i * 0.1 },
                      }),
                    }}
                  >
                    <div className="absolute left-0 top-1 flex h-14 w-14 items-center justify-center rounded-full bg-background border -translate-x-1/2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {phaseIcons[phase.name] || <ClipboardList />}
                      </div>
                    </div>
                    <div className="ml-20">
                      <h4 className="font-semibold text-lg">
                        {phase.name}{" "}
                        <span className="text-sm font-normal text-muted-foreground">({phase.duration})</span>
                      </h4>
                      <ul className="mt-2 list-disc list-inside text-muted-foreground space-y-1 text-sm">
                        {phase.tasks.map((task) => (
                          <li key={task}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
