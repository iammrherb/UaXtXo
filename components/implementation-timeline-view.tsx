"use client"
import { motion } from "framer-motion"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { staggerChildren, fadeInUp, SectionTitle } from "./shared-ui"
import { CheckCircle, Clock } from "lucide-react"

const TimelinePhase = ({
  phase,
  duration,
  tasks,
  isCompleted,
}: { phase: string; duration: string; tasks: string[]; isCompleted: boolean }) => (
  <div className="relative pl-8">
    <div className={`absolute left-0 top-0 h-full w-0.5 ${isCompleted ? "bg-primary" : "bg-border"}`}></div>
    <div
      className={`absolute left-[-9px] top-1 h-5 w-5 rounded-full flex items-center justify-center ${isCompleted ? "bg-primary" : "bg-border"}`}
    >
      {isCompleted ? (
        <CheckCircle className="h-3 w-3 text-primary-foreground" />
      ) : (
        <Clock className="h-3 w-3 text-muted-foreground" />
      )}
    </div>
    <motion.div variants={fadeInUp} className="pb-8">
      <p className="font-semibold">{phase}</p>
      <p className="text-sm text-muted-foreground mb-2">{duration}</p>
      <ul className="list-disc list-inside text-sm space-y-1">
        {tasks.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
    </motion.div>
  </div>
)

export default function ImplementationTimelineView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  const portnoxTimeline = results.find((r) => r.vendor === "portnox")?.implementation.timeline
  if (!portnoxTimeline) return null

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      <SectionTitle
        title="Portnox Implementation Roadmap"
        subtitle="A phased approach to achieving Zero Trust Network Access."
      />
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Phased Rollout Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              {portnoxTimeline.map((phase, index) => (
                <TimelinePhase key={phase.phase} {...phase} isCompleted={index < 2} />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
