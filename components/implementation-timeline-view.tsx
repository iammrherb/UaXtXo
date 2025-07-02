"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Clock, AlertTriangle, CheckCircle, Users, Settings, Rocket } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { SectionTitle, MetricCard, StatusBadge, fadeInUp, staggerContainer, colorPalette } from "./shared-ui"

export default function ImplementationTimelineView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  // Implementation complexity data
  const implementationData = results.map((result) => ({
    vendor: result.vendor,
    complexity: result.vendor === "portnox" ? 3 : Math.floor(Math.random() * 3) + 6, // Portnox is simpler
    timeline: result.vendor === "portnox" ? 8 : Math.floor(Math.random() * 8) + 12, // weeks
    risk: result.vendor === "portnox" ? "Low" : ["Medium", "High"][Math.floor(Math.random() * 2)],
  }))

  // Implementation phases
  const implementationPhases = [
    { phase: "Planning & Design", portnox: 2, competitor: 4, description: "Architecture planning and design" },
    { phase: "Infrastructure Setup", portnox: 1, competitor: 3, description: "Hardware and network configuration" },
    { phase: "Software Deployment", portnox: 2, competitor: 4, description: "Software installation and configuration" },
    { phase: "Integration", portnox: 1, competitor: 3, description: "Third-party system integration" },
    { phase: "Testing & Validation", portnox: 1, competitor: 2, description: "System testing and validation" },
    { phase: "Training & Go-Live", portnox: 1, competitor: 2, description: "User training and production deployment" },
  ]

  // Risk assessment matrix
  const riskAssessment = results.map((result) => ({
    vendor: result.vendor,
    technical: result.vendor === "portnox" ? "Low" : "Medium",
    operational: result.vendor === "portnox" ? "Low" : "High",
    timeline: result.vendor === "portnox" ? "Low" : "Medium",
    budget: result.vendor === "portnox" ? "Low" : "High",
  }))

  const portnoxData = implementationData.find((d) => d.vendor === "portnox")
  const avgCompetitorTimeline =
    implementationData.filter((d) => d.vendor !== "portnox").reduce((sum, d) => sum + d.timeline, 0) /
    implementationData.filter((d) => d.vendor !== "portnox").length

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
      <SectionTitle
        title="Implementation Timeline & Risk Analysis"
        subtitle="Planning and risk assessment for successful deployment"
      />

      {/* Implementation Metrics */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Portnox Timeline"
          value={`${portnoxData?.timeline || 0} weeks`}
          change="vs industry avg"
          changeType="positive"
          icon={<Clock className="h-5 w-5" />}
        />
        <MetricCard
          title="Complexity Score"
          value={`${portnoxData?.complexity || 0}/10`}
          change="simplified deployment"
          changeType="positive"
          icon={<Settings className="h-5 w-5" />}
        />
        <MetricCard
          title="Risk Level"
          value={portnoxData?.risk || "Low"}
          change="vs competitors"
          changeType="positive"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
        <MetricCard
          title="Time Savings"
          value={`${Math.round(avgCompetitorTimeline - (portnoxData?.timeline || 0))} weeks`}
          change="faster deployment"
          changeType="positive"
          icon={<Rocket className="h-5 w-5" />}
        />
      </motion.div>

      {/* Implementation Complexity Comparison */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Implementation Complexity & Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={implementationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="timeline" fill={colorPalette.primary[0]} name="Timeline (weeks)" />
                <Bar dataKey="complexity" fill={colorPalette.warning[0]} name="Complexity (1-10)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Implementation Phases Timeline */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Typical Implementation Phases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {implementationPhases.map((phase, index) => (
                <div key={phase.phase} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{phase.phase}</h4>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">
                        <span className="text-green-600 font-medium">Portnox: {phase.portnox}w</span>
                        {" | "}
                        <span className="text-gray-600">Avg: {phase.competitor}w</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Portnox</span>
                        <span>{phase.portnox} weeks</span>
                      </div>
                      <Progress
                        value={(phase.portnox / Math.max(phase.portnox, phase.competitor)) * 100}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Competitor Avg</span>
                        <span>{phase.competitor} weeks</span>
                      </div>
                      <Progress
                        value={(phase.competitor / Math.max(phase.portnox, phase.competitor)) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Risk Assessment Matrix */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Vendor</th>
                    <th className="text-left p-3 font-semibold">Technical Risk</th>
                    <th className="text-left p-3 font-semibold">Operational Risk</th>
                    <th className="text-left p-3 font-semibold">Timeline Risk</th>
                    <th className="text-left p-3 font-semibold">Budget Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {riskAssessment.map((assessment, index) => (
                    <tr key={assessment.vendor} className="border-b hover:bg-muted/50">
                      <td className="p-3 capitalize font-medium">{assessment.vendor}</td>
                      <td className="p-3">
                        <StatusBadge
                          status={
                            assessment.technical === "Low"
                              ? "success"
                              : assessment.technical === "Medium"
                                ? "warning"
                                : "error"
                          }
                        />
                      </td>
                      <td className="p-3">
                        <StatusBadge
                          status={
                            assessment.operational === "Low"
                              ? "success"
                              : assessment.operational === "Medium"
                                ? "warning"
                                : "error"
                          }
                        />
                      </td>
                      <td className="p-3">
                        <StatusBadge
                          status={
                            assessment.timeline === "Low"
                              ? "success"
                              : assessment.timeline === "Medium"
                                ? "warning"
                                : "error"
                          }
                        />
                      </td>
                      <td className="p-3">
                        <StatusBadge
                          status={
                            assessment.budget === "Low"
                              ? "success"
                              : assessment.budget === "Medium"
                                ? "warning"
                                : "error"
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Implementation Success Factors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={fadeInUp}>
          <Card className="text-center p-6">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h3 className="text-lg font-semibold mb-2">Proven Methodology</h3>
            <p className="text-muted-foreground">Battle-tested implementation process with 95% success rate</p>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="text-center p-6">
            <Users className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
            <p className="text-muted-foreground">Dedicated implementation team with deep technical expertise</p>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="text-center p-6">
            <Rocket className="h-12 w-12 mx-auto mb-4 text-purple-500" />
            <h3 className="text-lg font-semibold mb-2">Rapid Deployment</h3>
            <p className="text-muted-foreground">Cloud-native architecture enables faster time-to-value</p>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
