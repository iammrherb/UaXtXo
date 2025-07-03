"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Shield,
  FileText,
  Download,
  RefreshCw,
  Brain,
  Sparkles,
} from "lucide-react"
import { useAIInsights } from "@/hooks/useAIInsights"
import { useComplianceData } from "@/hooks/useComplianceData"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { motion } from "framer-motion"

export function GlassMetricCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
}: {
  title: string
  value: string | number
  icon: React.ElementType
  description?: string
  trend?: "up" | "down" | "neutral"
}) {
  const trendColor = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden"
    >
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white/90">{title}</CardTitle>
          <Icon className="h-4 w-4 text-white/70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{value}</div>
          {description && <p className={`text-xs ${trendColor} mt-1`}>{description}</p>}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function ExecutiveSummary() {
  const { selectedVendorData, riskAssessments, complianceMetrics, selectedIndustry, selectedOrgSize } =
    useComplianceData()

  const {
    executiveSummary,
    insights,
    recommendations,
    metadata,
    isLoading,
    error,
    hasInsights,
    isCached,
    generateInsights,
  } = useAIInsights(selectedVendorData, riskAssessments, selectedIndustry, selectedOrgSize)

  const handleGenerateInsights = () => {
    generateInsights(false)
  }

  const handleRefreshInsights = () => {
    generateInsights(true)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="h-6 w-48 bg-muted animate-pulse rounded mb-2" />
                <div className="h-4 w-64 bg-muted animate-pulse rounded" />
              </div>
              <RefreshCw className="h-4 w-4 animate-spin" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Error generating executive summary: {error}
          <Button variant="outline" size="sm" onClick={handleGenerateInsights} className="ml-2 bg-transparent">
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!hasInsights) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Executive Summary
          </CardTitle>
          <CardDescription>
            Generate AI-powered insights and recommendations for your vendor risk assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              No executive summary available. Generate insights to see AI-powered analysis.
            </p>
            <Button onClick={handleGenerateInsights} className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Executive Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-600"
      case "high":
        return "text-orange-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-white">
                <Brain className="h-5 w-5 text-purple-400" />
                Executive Summary
              </CardTitle>
              <CardDescription className="text-purple-200">
                AI-powered analysis of your vendor risk assessment
                {isCached && (
                  <Badge variant="outline" className="ml-2 text-purple-300 border-purple-400">
                    Cached
                  </Badge>
                )}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleRefreshInsights} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics with Glass Effect */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <GlassMetricCard
          title="Average Risk Score"
          value={`${executiveSummary?.keyMetrics.avgRiskScore || complianceMetrics.averageRiskScore}/100`}
          icon={Shield}
          description={`Across ${metadata?.vendorCount || selectedVendorData.length} vendors`}
          trend="neutral"
        />

        <GlassMetricCard
          title="Total Gaps"
          value={executiveSummary?.keyMetrics.totalGaps || complianceMetrics.totalGaps}
          icon={AlertTriangle}
          description="Compliance gaps identified"
          trend="down"
        />

        <GlassMetricCard
          title="High Risk Vendors"
          value={executiveSummary?.keyMetrics.highRiskVendors || complianceMetrics.highRiskVendors}
          icon={TrendingUp}
          description="Require immediate attention"
          trend="down"
        />

        <GlassMetricCard
          title="Cost Risk"
          value={formatCurrency(executiveSummary?.keyMetrics.estimatedCostRisk || complianceMetrics.totalCostRisk)}
          icon={DollarSign}
          description="Potential non-compliance cost"
          trend="down"
        />
      </div>

      {/* Executive Overview */}
      {executiveSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-700/50">
            <CardHeader>
              <CardTitle className="text-white">Executive Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-100 leading-relaxed">{executiveSummary.overview}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Critical Risks */}
      {executiveSummary?.criticalRisks && executiveSummary.criticalRisks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Critical Risks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {executiveSummary.criticalRisks.map((risk, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-red-100">{risk}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Strategic Recommendations */}
      {executiveSummary?.recommendations && executiveSummary.recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-700/50">
            <CardHeader>
              <CardTitle className="text-white">Strategic Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {executiveSummary.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-green-100">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Financial Impact */}
      {executiveSummary?.financialImpact && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border-yellow-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <DollarSign className="h-5 w-5 text-yellow-400" />
                Financial Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-100">{executiveSummary.financialImpact}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Key Insights */}
      {insights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>AI-generated insights based on your vendor risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.slice(0, 5).map((insight) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge variant={getPriorityBadge(insight.priority)}>{insight.priority.toUpperCase()}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{insight.summary}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Impact: {insight.potentialImpact}/10</span>
                    <span>Confidence: {formatPercentage(insight.confidence * 100)}</span>
                    <span>Type: {insight.type}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Priority Action Items */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Priority Action Items</CardTitle>
            <CardDescription>Recommended actions based on risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations
                .filter((rec) => rec.priority === "critical" || rec.priority === "high")
                .slice(0, 5)
                .map((recommendation) => (
                  <motion.div
                    key={recommendation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{recommendation.title}</h4>
                      <div className="flex gap-2">
                        <Badge variant={getPriorityBadge(recommendation.priority)}>
                          {recommendation.priority.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{recommendation.category}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{recommendation.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Cost:</span>
                        <div className="font-medium">{formatCurrency(recommendation.estimatedCost)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Savings:</span>
                        <div className="font-medium text-green-600">
                          {formatCurrency(recommendation.estimatedSavings)}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeframe:</span>
                        <div className="font-medium">{recommendation.timeframe}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Risk Level:</span>
                        <div className={`font-medium ${getPriorityColor(recommendation.riskLevel)}`}>
                          {recommendation.riskLevel.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generation Metadata */}
      {metadata && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="text-xs text-muted-foreground">
              Generated on {new Date(metadata.generatedAt).toLocaleString()} • {metadata.vendorCount} vendors analyzed •
              {metadata.totalGaps} gaps identified
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ExecutiveSummary
