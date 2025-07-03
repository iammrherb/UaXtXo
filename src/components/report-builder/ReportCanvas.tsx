"use client"

import type React from "react"
import { useCallback, useState } from "react"
import { useDrop } from "react-dnd"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Move, Eye, EyeOff, BarChart3, Table, FileText, TrendingUp, Target, Brain } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReportTemplate, ReportSection } from "@/types/report-builder"
import type { ExportData } from "@/lib/export/report-generator"

interface ReportCanvasProps {
  template: ReportTemplate
  selectedSection: ReportSection | null
  onSectionSelect: (section: ReportSection | null) => void
  onSectionUpdate: (sectionId: string, updates: Partial<ReportSection>) => void
  data: ExportData
}

const GRID_SIZE = 40
const GRID_COLS = 12

export const ReportCanvas: React.FC<ReportCanvasProps> = ({
  template,
  selectedSection,
  onSectionSelect,
  onSectionUpdate,
  data,
}) => {
  const [draggedSection, setDraggedSection] = useState<string | null>(null)

  const [{ isOver }, drop] = useDrop({
    accept: "section",
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset()
      if (offset) {
        // Handle drop logic here
        console.log("Dropped section:", item)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  const handleSectionClick = useCallback(
    (section: ReportSection) => {
      onSectionSelect(selectedSection?.id === section.id ? null : section)
    },
    [selectedSection, onSectionSelect],
  )

  const handleSectionMove = useCallback(
    (sectionId: string, newPosition: { x: number; y: number }) => {
      onSectionUpdate(sectionId, { position: newPosition })
    },
    [onSectionUpdate],
  )

  const handleSectionResize = useCallback(
    (sectionId: string, newSize: { width: number; height: number }) => {
      onSectionUpdate(sectionId, { size: newSize })
    },
    [onSectionUpdate],
  )

  const generateMockData = (section: ReportSection) => {
    switch (section.config?.dataSource) {
      case "vendorRiskScores":
        return data.vendors.map((vendor) => {
          const assessment = data.riskAssessments[vendor.id]
          return {
            vendorName: vendor.name,
            riskScore: assessment?.overallRiskScore || 0,
            riskLevel: assessment?.riskLevel || "unknown",
            complianceGaps: assessment?.complianceGaps.length || 0,
          }
        })

      case "costRiskData":
        return data.vendors.map((vendor) => {
          const assessment = data.riskAssessments[vendor.id]
          return {
            vendorName: vendor.name,
            nonComplianceCost: assessment?.costOfNonCompliance.total / 1000 || 0,
            remediationCost: assessment?.complianceGaps.reduce((sum, gap) => sum + gap.remediationCost, 0) / 1000 || 0,
          }
        })

      default:
        return []
    }
  }

  const renderSectionContent = (section: ReportSection) => {
    const sectionData = generateMockData(section)

    switch (section.type) {
      case "summary":
        return (
          <div className="p-4">
            <div className="prose prose-sm max-w-none text-slate-300">
              <p>
                This executive summary provides a comprehensive overview of the vendor risk assessment conducted for{" "}
                {data.vendors.length} vendors in the {data.industry.replace("_", " ")} industry.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                  <div className="text-xl font-bold text-blue-400">
                    {Math.round(
                      Object.values(data.riskAssessments).reduce((sum, a) => sum + a.overallRiskScore, 0) /
                        Object.values(data.riskAssessments).length || 0,
                    )}
                  </div>
                  <div className="text-xs text-slate-400">Avg Risk Score</div>
                </div>
                <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                  <div className="text-xl font-bold text-red-400">
                    {Object.values(data.riskAssessments).reduce((sum, a) => sum + a.complianceGaps.length, 0)}
                  </div>
                  <div className="text-xs text-slate-400">Total Gaps</div>
                </div>
              </div>
            </div>
          </div>
        )

      case "chart":
        const config = section.config as any
        return (
          <div className="p-4 h-full">
            <ResponsiveContainer width="100%" height="100%">
              {config.chartType === "bar" && (
                <BarChart data={sectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey={config.xAxis || "vendorName"} stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E293B",
                      border: "1px solid #475569",
                      borderRadius: "8px",
                    }}
                  />
                  {config.showLegend && <Legend />}
                  <Bar dataKey={config.yAxis || "riskScore"} fill="#3B82F6" />
                </BarChart>
              )}
              {config.chartType === "pie" && (
                <PieChart>
                  <Pie
                    data={sectionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey={config.yAxis || "riskScore"}
                    label
                  >
                    {sectionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              )}
              {config.chartType === "line" && (
                <LineChart data={sectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey={config.xAxis || "vendorName"} stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip />
                  {config.showLegend && <Legend />}
                  <Line type="monotone" dataKey={config.yAxis || "riskScore"} stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        )

      case "table":
        const tableConfig = section.config as any
        return (
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-700">
                <thead className="bg-slate-800">
                  <tr>
                    {tableConfig.columns?.map((column: string) => (
                      <th
                        key={column}
                        className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                      >
                        {column.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-slate-900 divide-y divide-slate-700">
                  {Object.entries(data.riskAssessments)
                    .slice(0, tableConfig.pageSize || 5)
                    .map(([vendorId, assessment], index) => {
                      const vendor = data.vendors.find((v) => v.id === vendorId)
                      return (
                        <tr key={vendorId} className={index % 2 === 0 ? "bg-slate-900" : "bg-slate-800"}>
                          <td className="px-4 py-2 text-sm text-slate-300">{vendor?.name || vendorId}</td>
                          <td className="px-4 py-2 text-sm text-slate-300">{assessment.overallRiskScore}</td>
                          <td className="px-4 py-2 text-sm text-slate-300">
                            <Badge
                              variant={
                                assessment.riskLevel === "critical"
                                  ? "destructive"
                                  : assessment.riskLevel === "high"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {assessment.riskLevel.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="px-4 py-2 text-sm text-slate-300">{assessment.complianceGaps.length}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )

      case "metrics":
        const metricsConfig = section.config as any
        const metrics = [
          {
            label: "Avg Risk Score",
            value: Math.round(
              Object.values(data.riskAssessments).reduce((sum, a) => sum + a.overallRiskScore, 0) /
                Object.values(data.riskAssessments).length || 0,
            ),
            unit: "/100",
            color: "text-orange-400",
          },
          {
            label: "Total Gaps",
            value: Object.values(data.riskAssessments).reduce((sum, a) => sum + a.complianceGaps.length, 0),
            unit: "",
            color: "text-red-400",
          },
          {
            label: "Cost Risk",
            value: Math.round(
              Object.values(data.riskAssessments).reduce((sum, a) => sum + a.costOfNonCompliance.total, 0) / 1000,
            ),
            unit: "K",
            color: "text-green-400",
          },
          {
            label: "High Risk",
            value: Object.values(data.riskAssessments).filter(
              (a) => a.riskLevel === "high" || a.riskLevel === "critical",
            ).length,
            unit: "",
            color: "text-red-400",
          },
        ]

        return (
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center p-3 bg-slate-700/50 rounded-lg">
                  <div className={`text-xl font-bold ${metric.color}`}>
                    {metric.value}
                    {metric.unit}
                  </div>
                  <div className="text-xs text-slate-400">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        )

      case "recommendations":
        return (
          <div className="p-4">
            <div className="space-y-3">
              {Object.entries(data.riskAssessments)
                .slice(0, 3)
                .map(([vendorId, assessment], index) => {
                  const vendor = data.vendors.find((v) => v.id === vendorId)
                  return (
                    <div key={vendorId} className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{vendor?.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {assessment.recommendations.length} recommendations
                        </Badge>
                      </div>
                      {assessment.recommendations.slice(0, 2).map((rec, idx) => (
                        <div key={idx} className="text-sm text-slate-300 mb-1">
                          • {rec.action}
                        </div>
                      ))}
                    </div>
                  )
                })}
            </div>
          </div>
        )

      case "gaps":
        return (
          <div className="p-4">
            <div className="space-y-3">
              {Object.values(data.riskAssessments)
                .flatMap((assessment) => assessment.complianceGaps)
                .slice(0, 5)
                .map((gap, index) => (
                  <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white text-sm">{gap.standardName}</h4>
                      <Badge
                        variant={
                          gap.businessImpact === "critical"
                            ? "destructive"
                            : gap.businessImpact === "high"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {gap.businessImpact}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400">{gap.requirementName}</p>
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>Risk: {gap.riskScore}/10</span>
                      <span>Cost: ${Math.round(gap.remediationCost / 1000)}K</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="p-4 text-center text-slate-400">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Section content will appear here</p>
          </div>
        )
    }
  }

  const getSectionIcon = (type: string) => {
    switch (type) {
      case "chart":
        return BarChart3
      case "table":
        return Table
      case "metrics":
        return TrendingUp
      case "recommendations":
        return Brain
      case "gaps":
        return Target
      default:
        return FileText
    }
  }

  return (
    <div
      ref={drop}
      className={cn(
        "relative w-full min-h-screen p-6 transition-colors",
        isOver && "bg-blue-500/10",
        template.theme === "light" ? "bg-gray-50" : "bg-slate-900",
      )}
      style={{
        backgroundImage: `
          linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
      }}
    >
      {/* Grid Layout Guide */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: GRID_COLS + 1 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 border-l border-slate-600/20"
            style={{ left: `${(i / GRID_COLS) * 100}%` }}
          />
        ))}
      </div>

      {/* Report Header */}
      <div className="relative z-10 mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">{template.name}</h1>
          <p className="text-slate-400">{template.description}</p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-slate-500">
            <span>Layout: {template.layout}</span>
            <span>•</span>
            <span>Theme: {template.theme}</span>
            <span>•</span>
            <span>Sections: {template.sections.length}</span>
          </div>
        </div>
      </div>

      {/* Report Sections */}
      <div className="relative z-10">
        <AnimatePresence>
          {template.sections.map((section) => {
            const Icon = getSectionIcon(section.type)
            const isSelected = selectedSection?.id === section.id
            const isDragging = draggedSection === section.id

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: section.isVisible ? 1 : 0.5, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "absolute cursor-pointer transition-all duration-200",
                  isSelected && "ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-900",
                  isDragging && "opacity-50 scale-95",
                  !section.isVisible && "opacity-50",
                )}
                style={{
                  left: `${(section.position.x / GRID_COLS) * 100}%`,
                  top: `${section.position.y * GRID_SIZE + 200}px`,
                  width: `${(section.size.width / GRID_COLS) * 100}%`,
                  height: `${section.size.height * GRID_SIZE}px`,
                }}
                onClick={() => handleSectionClick(section)}
                onMouseDown={() => setDraggedSection(section.id)}
                onMouseUp={() => setDraggedSection(null)}
              >
                <Card
                  className={cn(
                    "h-full bg-slate-800/90 border-slate-700 hover:bg-slate-800 transition-colors",
                    isSelected && "border-blue-500",
                    template.theme === "light" && "bg-white border-gray-200",
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-white flex items-center gap-2">
                        <Icon className="w-4 h-4 text-blue-400" />
                        {section.title}
                      </CardTitle>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs">
                          {section.type}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-auto text-slate-400 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            onSectionUpdate(section.id, { isVisible: !section.isVisible })
                          }}
                        >
                          {section.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 h-full overflow-hidden">
                    <div className="h-full">{renderSectionContent(section)}</div>
                  </CardContent>
                </Card>

                {/* Resize Handles */}
                {isSelected && (
                  <>
                    <div
                      className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-se-resize"
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        // Handle resize logic
                      }}
                    />
                    <div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-blue-500 cursor-move rounded-b"
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        // Handle move logic
                      }}
                    >
                      <Move className="w-3 h-3 text-white mx-auto" />
                    </div>
                  </>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {template.sections.length === 0 && (
        <div className="relative z-10 text-center py-20">
          <FileText className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Sections Added</h3>
          <p className="text-slate-400 mb-6">Start building your report by adding sections from the library.</p>
          <Button className="bg-blue-600 hover:bg-blue-700">Add Your First Section</Button>
        </div>
      )}
    </div>
  )
}
