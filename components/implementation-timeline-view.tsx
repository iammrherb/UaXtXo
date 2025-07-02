"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import { SectionTitle, MetricCard, StatusBadge, staggerChildren, fadeInUp } from "./shared-ui"
import { Clock, Calendar, Users, AlertTriangle, CheckCircle, Zap, Settings, Rocket } from "lucide-react"

interface ImplementationTimelineViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

const IMPLEMENTATION_PHASES = [
  { name: "Planning & Design", duration: 2, description: "Requirements gathering and solution design" },
  { name: "Infrastructure Setup", duration: 1, description: "Hardware/software installation and configuration" },
  { name: "Integration", duration: 2, description: "Connect with existing systems and identity sources" },
  { name: "Testing & Validation", duration: 1, description: "Pilot testing and validation" },
  { name: "Rollout", duration: 2, description: "Phased deployment across the organization" },
  { name: "Training & Handover", duration: 1, description: "Staff training and knowledge transfer" },
]

export default function ImplementationTimelineView({ results, config }: ImplementationTimelineViewProps) {
  const implementationData = useMemo(() => {
    return results.map((result) => {
      const vendor = ComprehensiveVendorDatabase[result.vendor]

      // Estimate implementation timeline based on vendor characteristics
      let baseWeeks = 12 // Default implementation time
      let complexity = "medium"
      let riskLevel = "medium"

      if (result.vendor === "portnox") {
        baseWeeks = 2
        complexity = "low"
        riskLevel = "low"
      } else if (result.vendor === "cisco") {
        baseWeeks = 16
        complexity = "high"
        riskLevel = "high"
      } else if (result.vendor === "meraki") {
        baseWeeks = 4
        complexity = "low"
        riskLevel = "low"
      } else if (["aruba", "fortinet"].includes(result.vendor)) {
        baseWeeks = 10
        complexity = "medium"
        riskLevel = "medium"
      } else {
        baseWeeks = 14
        complexity = "high"
        riskLevel = "high"
      }

      return {
        vendor: result.vendorName,
        vendorId: result.vendor,
        implementationWeeks: baseWeeks,
        complexity,
        riskLevel,
        fteRequired: vendor.tcoFactors.fteRequirement,
        downtimeRisk: vendor.tcoFactors.downtimeRisk,
        upgradeComplexity: vendor.tcoFactors.upgradeComplexity,
        phases: IMPLEMENTATION_PHASES.map((phase) => ({
          ...phase,
          adjustedDuration: Math.ceil(phase.duration * (baseWeeks / 12)),
        })),
      }
    })
  }, [results])

  const fastestImplementation = implementationData.reduce((fastest, current) =>
    current.implementationWeeks < fastest.implementationWeeks ? current : fastest,
  )

  const averageImplementationTime = Math.round(
    implementationData.reduce((sum, item) => sum + item.implementationWeeks, 0) / implementationData.length,
  )

  return (
    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <SectionTitle
          icon={<Rocket className="h-6 w-6" />}
          title="Implementation Timeline & Operations"
          description="Deployment timelines, complexity analysis, and operational requirements"
        />
      </motion.div>

      {/* Implementation Metrics */}
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Fastest Implementation"
            value={`${fastestImplementation.implementationWeeks} weeks`}
            detail={fastestImplementation.vendor}
            icon={<Zap className="h-4 w-4" />}
            gradient="forest"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Average Timeline"
            value={`${averageImplementationTime} weeks`}
            detail="Across all vendors"
            icon={<Calendar className="h-4 w-4" />}
            gradient="ocean"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Min FTE Required"
            value={`${Math.min(...implementationData.map((d) => d.fteRequired))}`}
            detail="Operational staffing"
            icon={<Users className="h-4 w-4" />}
            gradient="royal"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Low Risk Options"
            value={`${implementationData.filter((d) => d.riskLevel === "low").length}`}
            detail={`Out of ${implementationData.length} vendors`}
            icon={<CheckCircle className="h-4 w-4" />}
            gradient="sunset"
          />
        </motion.div>
      </motion.div>

      {/* Implementation Comparison */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Implementation Complexity Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {implementationData.map((item) => (
                <div key={item.vendorId} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">{item.vendor}</h4>
                      <StatusBadge
                        status={
                          item.riskLevel === "low" ? "success" : item.riskLevel === "medium" ? "warning" : "error"
                        }
                      >
                        {item.riskLevel} risk
                      </StatusBadge>
                      <Badge variant="outline">{item.complexity} complexity</Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{item.implementationWeeks} weeks</div>
                      <div className="text-sm text-muted-foreground">{item.fteRequired} FTE required</div>
                    </div>
                  </div>

                  <Progress
                    value={
                      (item.implementationWeeks / Math.max(...implementationData.map((d) => d.implementationWeeks))) *
                      100
                    }
                    className="h-2"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Downtime Risk:</span>
                      <div className="font-medium capitalize">{item.downtimeRisk}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Upgrade Complexity:</span>
                      <div className="font-medium capitalize">{item.upgradeComplexity}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Operational FTE:</span>
                      <div className="font-medium">{item.fteRequired}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Implementation Phases Timeline */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Typical Implementation Phases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {IMPLEMENTATION_PHASES.map((phase, index) => (
                <div key={phase.name} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">{phase.name}</div>
                    <div className="text-sm text-muted-foreground">{phase.description}</div>
                  </div>
                  <div className="text-sm font-medium">
                    {phase.duration} week{phase.duration !== 1 ? "s" : ""}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Risk Assessment */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Implementation Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {implementationData.map((item) => (
                <div key={item.vendorId} className="space-y-3">
                  <h4 className="font-semibold">{item.vendor}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Implementation Risk</span>
                      <StatusBadge
                        status={
                          item.riskLevel === "low" ? "success" : item.riskLevel === "medium" ? "warning" : "error"
                        }
                      >
                        {item.riskLevel}
                      </StatusBadge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Downtime Risk</span>
                      <StatusBadge
                        status={
                          item.downtimeRisk === "low" ? "success" : item.downtimeRisk === "medium" ? "warning" : "error"
                        }
                      >
                        {item.downtimeRisk}
                      </StatusBadge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Upgrade Complexity</span>
                      <StatusBadge
                        status={
                          item.upgradeComplexity === "low"
                            ? "success"
                            : item.upgradeComplexity === "medium"
                              ? "warning"
                              : "error"
                        }
                      >
                        {item.upgradeComplexity}
                      </StatusBadge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
