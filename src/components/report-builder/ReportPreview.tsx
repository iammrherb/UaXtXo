"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"
import { Shield, AlertTriangle, TrendingUp, DollarSign, CheckCircle, XCircle, Target, BarChart3 } from "lucide-react"
import type { ReportTemplate } from "@/types/report-builder"
import type { ExportData } from "@/lib/export/report-generator"

interface ReportPreviewProps {
  template: ReportTemplate
  data: ExportData
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({ template, data }) => {
  const themeClasses = {
    light: "bg-white text-gray-900",
    dark: "bg-slate-900 text-white",
    corporate: "bg-blue-50 text-blue-900",
    modern: "bg-gradient-to-br from-purple-50 to-pink-50 text-purple-900",
  }

  const generateMockData = (section: any) => {
    switch (section.config?.dataSource) {
      case "vendorRiskScores":
        return Object.entries(data.riskAssessments).map(([vendorId, assessment]) => {
          const vendor = data.vendors.find((v) => v.id === vendorId)
          return {
            vendor: vendor?.name || vendorId,
            riskScore: assessment.overallRiskScore,
            riskLevel: assessment.riskLevel,
            complianceGaps: assessment.complianceGaps.length,
          }
        })

      case "costRiskData":
        return Object.entries(data.riskAssessments).map(([vendorId, assessment]) => {
          const vendor = data.vendors.find((v) => v.id === vendorId)
          return {
            vendor: vendor?.name || vendorId,
            nonComplianceCost: assessment.costOfNonCompliance.total / 1000,
            remediationCost: assessment.complianceGaps.reduce((sum, gap) => sum + gap.remediationCost, 0) / 1000,
          }
        })

      default:
        return []
    }
  }

  const renderSection = (section: any) => {
    if (!section.isVisible) return null

    const sectionData = generateMockData(section)

    switch (section.type) {
      case "summary":
        return (
          <Card key={section.id} className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="mb-4">
                  This comprehensive compliance risk assessment analyzes {data.vendors.length} vendors across{" "}
                  {Object.keys(data.riskAssessments).length} risk categories for the {data.industry.replace("_", " ")}{" "}
                  industry.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-4 bg-slate-100 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(
                        Object.values(data.riskAssessments).reduce((sum, a) => sum + a.overallRiskScore, 0) /
                          Object.values(data.riskAssessments).length,
                      )}
                    </div>
                    <div className="text-sm text-gray-600">Avg Risk Score</div>
                  </div>
                  <div className="text-center p-4 bg-slate-100 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {Object.values(data.riskAssessments).reduce((sum, a) => sum + a.complianceGaps.length, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Gaps</div>
                  </div>
                  <div className="text-center p-4 bg-slate-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      $
                      {Math.round(
                        Object.values(data.riskAssessments).reduce((sum, a) => sum + a.costOfNonCompliance.total, 0) /
                          Object.values(data.riskAssessments).length /
                          1000,
                      )}
                      K
                    </div>
                    <div className="text-sm text-gray-600">Avg Cost Risk</div>
                  </div>
                  <div className="text-center p-4 bg-slate-100 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {
                        Object.values(data.riskAssessments).filter(
                          (a) => a.riskLevel === "high" || a.riskLevel === "critical",
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-600">High Risk</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "metrics":
        return (
          <Card key={section.id} className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {section.config.metrics?.map((metric: string, index: number) => {
                  const values = [75, 12, 450, 3, 85, 92]
                  const icons = [Shield, AlertTriangle, DollarSign, XCircle, CheckCircle, TrendingUp]
                  const colors = ["blue", "orange", "green", "red", "emerald", "purple"]
                  const Icon = icons[index % icons.length]
                  const color = colors[index % colors.length]

                  return (
                    <div key={metric} className="text-center p-4 bg-slate-100 rounded-lg">
                      <Icon className={`w-6 h-6 mx-auto mb-2 text-${color}-600`} />
                      <div className={`text-2xl font-bold text-${color}-600`}>{values[index % values.length]}</div>
                      <div className="text-sm text-gray-600">
                        {metric.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )

      case "chart":
        return (
          <Card key={section.id} className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {section.config.chartType === "bar" && (
                    <BarChart data={sectionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={section.config.xAxis || "vendor"} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey={section.config.yAxis || "riskScore"} fill="#3B82F6" />
                    </BarChart>
                  )}
                  {section.config.chartType === "line" && (
                    <LineChart data={sectionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={section.config.xAxis || "vendor"} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey={section.config.yAxis || "riskScore"}
                        stroke="#3B82F6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  )}
                  {section.config.chartType === "area" && (
                    <AreaChart data={sectionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={section.config.xAxis || "vendor"} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey={section.config.yAxis || "riskScore"}
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )

      case "table":
        return (
          <Card key={section.id} className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {section.config.columns?.map((column: string) => (
                        <th
                          key={column}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {column.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(data.riskAssessments)
                      .slice(0, section.config.pageSize || 10)
                      .map(([vendorId, assessment], index) => {
                        const vendor = data.vendors.find((v) => v.id === vendorId)
                        return (
                          <tr key={vendorId} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {vendor?.name || vendorId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {assessment.overallRiskScore}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {assessment.complianceGaps.length}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${Math.round(assessment.costOfNonCompliance.total / 1000)}K
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )

      case "recommendations":
        return (
          <Card key={section.id} className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(data.riskAssessments)
                  .slice(0, 3)
                  .map(([vendorId, assessment]) => {
                    const vendor = data.vendors.find((v) => v.id === vendorId)
                    return (
                      <div key={vendorId} className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{vendor?.name}</h4>
                        <div className="space-y-2">
                          {assessment.recommendations.slice(0, 2).map((rec, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <Badge
                                  variant={
                                    rec.priority === "high"
                                      ? "destructive"
                                      : rec.priority === "medium"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {rec.priority.toUpperCase()}
                                </Badge>
                                <span className="text-sm text-gray-500">{rec.timeframe}</span>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{rec.action}</p>
                              <div className="flex justify-between text-sm text-gray-500">
                                <span>Cost: ${Math.round(rec.estimatedCost / 1000)}K</span>
                                <span>Impact: {rec.expectedImpact}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        )

      case "gaps":
        return (
          <Card key={section.id} className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(data.riskAssessments)
                  .slice(0, 3)
                  .map(([vendorId, assessment]) => {
                    const vendor = data.vendors.find((v) => v.id === vendorId)
                    return (
                      <div key={vendorId}>
                        <h4 className="font-semibold text-gray-900 mb-3">{vendor?.name}</h4>
                        {assessment.complianceGaps.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {assessment.complianceGaps.slice(0, 4).map((gap, index) => (
                              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-sm">{gap.standardName}</span>
                                  <Badge
                                    variant={
                                      gap.businessImpact === "critical"
                                        ? "destructive"
                                        : gap.businessImpact === "high"
                                          ? "secondary"
                                          : "outline"
                                    }
                                  >
                                    {gap.businessImpact}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{gap.requirementName}</p>
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>Risk: {gap.riskScore}/10</span>
                                  <span>Cost: ${Math.round(gap.remediationCost / 1000)}K</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-green-600">
                            <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                            <p>No compliance gaps identified</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        )

      default:
        return (
          <Card key={section.id} className="mb-6">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Section content would appear here</p>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className={`min-h-screen p-8 ${themeClasses[template.theme]}`}>
      <div className="max-w-6xl mx-auto">
        {/* Report Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{template.name}</h1>
          <p className="text-lg opacity-75 mb-4">{template.description}</p>
          <div className="flex items-center justify-center gap-4 text-sm opacity-60">
            <span>Generated: {new Date().toLocaleDateString()}</span>
            <span>•</span>
            <span>Industry: {data.industry.replace("_", " ").toUpperCase()}</span>
            <span>•</span>
            <span>Organization: {data.orgSize.replace("_", " ").toUpperCase()}</span>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Report Sections */}
        <div className="space-y-6">
          {template.sections.sort((a, b) => a.position.y - b.position.y).map((section) => renderSection(section))}
        </div>

        {/* Report Footer */}
        <div className="mt-12 pt-8 border-t text-center text-sm opacity-60">
          <p>This report was generated using the Portnox TCO Analyzer Report Builder</p>
          <p>© {new Date().getFullYear()} - Confidential and Proprietary</p>
        </div>
      </div>
    </div>
  )
}
