"use client"

import { Skeleton } from "@/components/ui/skeleton"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Brain,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Target,
  DollarSign,
  Clock,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Shield,
  BarChart3,
  Zap,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { AIInsight, ExecutiveSummary, SmartRecommendation } from "@/lib/ai/insight-generator"

interface AIInsightsPanelProps {
  executiveSummary: ExecutiveSummary | null
  insights: AIInsight[]
  recommendations: SmartRecommendation[]
  trendAnalysis: string | null
  isLoading: boolean
  error: string | null
  onRegenerate: (type?: "summary" | "insights" | "recommendations" | "trends") => void
  onGenerateAll: () => void
}

const InsightIcon = ({ category }: { category: AIInsight["category"] }) => {
  switch (category) {
    case "recommendation":
      return <Lightbulb className="h-5 w-5 text-blue-500" />
    case "opportunity":
      return <Zap className="h-5 w-5 text-green-500" />
    case "risk":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    case "strength":
      return <ShieldCheck className="h-5 w-5 text-purple-500" />
    default:
      return <Lightbulb className="h-5 w-5 text-gray-500" />
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "security":
      return Shield
    case "compliance":
      return Target
    case "cost":
      return DollarSign
    case "operational":
      return BarChart3
    case "strategic":
      return TrendingUp
    default:
      return Lightbulb
  }
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({
  executiveSummary,
  insights,
  recommendations,
  trendAnalysis,
  isLoading,
  error,
  onRegenerate,
  onGenerateAll,
}) => {
  const [expandedInsights, setExpandedInsights] = useState<Set<string>>(new Set())
  const [expandedRecommendations, setExpandedRecommendations] = useState<Set<string>>(new Set())

  const toggleInsightExpansion = (id: string) => {
    const newExpanded = new Set(expandedInsights)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedInsights(newExpanded)
  }

  const toggleRecommendationExpansion = (id: string) => {
    const newExpanded = new Set(expandedRecommendations)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRecommendations(newExpanded)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getInsightTypeIcon = (type: string) => {
    switch (type) {
      case "risk_analysis":
        return AlertTriangle
      case "cost_optimization":
        return DollarSign
      case "compliance_gap":
        return Target
      case "strategic_recommendation":
        return TrendingUp
      case "trend_analysis":
        return BarChart3
      default:
        return Lightbulb
    }
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Could not load AI insights. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI-Powered Insights</h2>
            <p className="text-slate-400">Intelligent analysis and recommendations</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isLoading && (
            <div className="flex items-center gap-2 text-blue-400">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm">Generating insights...</span>
            </div>
          )}
          <Button
            onClick={() => onGenerateAll()}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isLoading ? "Generating..." : "Generate Insights"}
          </Button>
        </div>
      </div>

      {/* Content */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="summary" className="data-[state=active]:bg-slate-700">
            Executive Summary
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-slate-700">
            Insights ({insights.length})
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="data-[state=active]:bg-slate-700">
            Recommendations ({recommendations.length})
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-slate-700">
            Trend Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-6">
          <ExecutiveSummaryCard
            summary={executiveSummary}
            isLoading={isLoading}
            onRegenerate={() => onRegenerate("summary")}
          />
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          {isLoading ? (
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : insights.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <Brain className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400 mb-4">No insights generated yet</p>
                <Button onClick={() => onRegenerate("insights")} variant="outline">
                  Generate Insights
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">AI-Generated Insights</h3>
                <Button
                  onClick={() => onRegenerate("insights")}
                  size="sm"
                  variant="ghost"
                  className="text-slate-400 hover:text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AnimatePresence>
                  {insights.map((insight, index) => {
                    const Icon = getInsightTypeIcon(insight.type)
                    const isExpanded = expandedInsights.has(insight.id)

                    return (
                      <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div
                                  className={cn(
                                    "p-2 rounded-lg",
                                    insight.priority === "critical"
                                      ? "bg-red-500/20 text-red-400"
                                      : insight.priority === "high"
                                        ? "bg-orange-500/20 text-orange-400"
                                        : insight.priority === "medium"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-green-500/20 text-green-400",
                                  )}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <CardTitle className="text-sm text-white mb-1">{insight.title}</CardTitle>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge
                                      variant="outline"
                                      className={cn(
                                        "text-xs",
                                        getPriorityColor(insight.priority),
                                        "text-white border-0",
                                      )}
                                    >
                                      {insight.priority.toUpperCase()}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-xs text-slate-400">
                                      <span>Confidence:</span>
                                      <Progress value={insight.confidence} className="w-12 h-1" />
                                      <span>{insight.confidence}%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleInsightExpansion(insight.id)}
                                className="p-1 h-auto text-slate-400 hover:text-white"
                              >
                                {isExpanded ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronRight className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-slate-300 text-sm mb-3">{insight.summary}</p>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="space-y-4"
                                >
                                  <Separator className="bg-slate-700" />

                                  <div>
                                    <h5 className="font-medium text-white mb-2">Detailed Analysis</h5>
                                    <p className="text-slate-300 text-sm">{insight.details}</p>
                                  </div>

                                  {insight.actionItems.length > 0 && (
                                    <div>
                                      <h5 className="font-medium text-white mb-2">Action Items</h5>
                                      <ul className="space-y-1">
                                        {insight.actionItems.map((item, idx) => (
                                          <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                                            <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="text-slate-400">Financial Impact:</span>
                                      <p className="text-white font-medium">
                                        ${(insight.potentialImpact.financial / 1000).toFixed(0)}K
                                      </p>
                                    </div>
                                    <div>
                                      <span className="text-slate-400">Timeframe:</span>
                                      <p className="text-white font-medium">{insight.timeframe}</p>
                                    </div>
                                  </div>

                                  {insight.relatedVendors.length > 0 && (
                                    <div>
                                      <span className="text-slate-400 text-sm">Related Vendors:</span>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {insight.relatedVendors.map((vendor, idx) => (
                                          <Badge key={idx} variant="secondary" className="text-xs">
                                            {vendor}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="mt-6">
          <RecommendationsGrid
            recommendations={recommendations}
            expandedRecommendations={expandedRecommendations}
            onToggleExpansion={toggleRecommendationExpansion}
            isLoading={isLoading}
            onRegenerate={() => onRegenerate("recommendations")}
          />
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <TrendAnalysisCard
            analysis={trendAnalysis}
            isLoading={isLoading}
            onRegenerate={() => onRegenerate("trends")}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

const ExecutiveSummaryCard: React.FC<{
  summary: ExecutiveSummary | null
  isLoading: boolean
  onRegenerate: () => void
}> = ({ summary, isLoading, onRegenerate }) => {
  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-700 rounded w-full"></div>
              <div className="h-3 bg-slate-700 rounded w-full"></div>
              <div className="h-3 bg-slate-700 rounded w-3/4"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!summary) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6 text-center">
          <Brain className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400 mb-4">No executive summary generated yet</p>
          <Button onClick={onRegenerate} variant="outline">
            Generate Summary
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              Executive Summary
            </CardTitle>
            <Button onClick={onRegenerate} size="sm" variant="ghost" className="text-slate-400 hover:text-white">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overview */}
          <div>
            <h4 className="font-semibold text-white mb-2">Overview</h4>
            <p className="text-slate-300 leading-relaxed">{summary.overview}</p>
          </div>

          <Separator className="bg-slate-700" />

          {/* Key Findings */}
          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-400" />
              Key Findings
            </h4>
            <ul className="space-y-2">
              {summary.keyFindings.map((finding, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  {finding}
                </li>
              ))}
            </ul>
          </div>

          {/* Critical Risks */}
          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Critical Risks
            </h4>
            <ul className="space-y-2">
              {summary.criticalRisks.map((risk, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              Strategic Recommendations
            </h4>
            <ul className="space-y-2">
              {summary.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <Separator className="bg-slate-700" />

          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-white mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                Financial Impact
              </h5>
              <p className="text-slate-300 text-sm">{summary.financialImpact}</p>
            </div>
            <div>
              <h5 className="font-medium text-white mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                Timeline
              </h5>
              <p className="text-slate-300 text-sm">{summary.timeline}</p>
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              Next Steps
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {summary.nextSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-slate-700/50 rounded-lg">
                  <div className="w-6 h-6 bg-green-400 text-slate-900 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-slate-300 text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const RecommendationsGrid: React.FC<{
  recommendations: SmartRecommendation[]
  expandedRecommendations: Set<string>
  onToggleExpansion: (id: string) => void
  isLoading: boolean
  onRegenerate: () => void
}> = ({ recommendations, expandedRecommendations, onToggleExpansion, isLoading, onRegenerate }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                <div className="h-3 bg-slate-700 rounded w-full"></div>
                <div className="h-3 bg-slate-700 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6 text-center">
          <Target className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400 mb-4">No recommendations generated yet</p>
          <Button onClick={onRegenerate} variant="outline">
            Generate Recommendations
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Smart Recommendations</h3>
        <Button onClick={onRegenerate} size="sm" variant="ghost" className="text-slate-400 hover:text-white">
          <RefreshCw className="w-4 h-4 mr-2" />
          Regenerate
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {recommendations.map((recommendation, index) => {
            const Icon = getCategoryIcon(recommendation.category)
            const isExpanded = expandedRecommendations.has(recommendation.id)
            const roi = recommendation.estimatedSavings - recommendation.estimatedCost

            return (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={cn(
                            "p-2 rounded-lg",
                            recommendation.category === "security"
                              ? "bg-blue-500/20 text-blue-400"
                              : recommendation.category === "compliance"
                                ? "bg-green-500/20 text-green-400"
                                : recommendation.category === "cost"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : recommendation.category === "operational"
                                    ? "bg-purple-500/20 text-purple-400"
                                    : "bg-pink-500/20 text-pink-400",
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-sm text-white mb-1">{recommendation.title}</CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs capitalize">
                              {recommendation.category}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                recommendation.riskLevel === "high"
                                  ? "border-red-400 text-red-400"
                                  : recommendation.riskLevel === "medium"
                                    ? "border-yellow-400 text-yellow-400"
                                    : "border-green-400 text-green-400",
                              )}
                            >
                              {recommendation.riskLevel} risk
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-slate-400">
                              <span>Confidence:</span>
                              <Progress value={recommendation.confidence} className="w-12 h-1" />
                              <span>{recommendation.confidence}%</span>
                            </div>
                          </div>
                          <p className="text-slate-300 text-sm">{recommendation.description}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleExpansion(recommendation.id)}
                        className="p-1 h-auto text-slate-400 hover:text-white"
                      >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center p-2 bg-slate-700/50 rounded-lg">
                        <div className="text-lg font-bold text-green-400">
                          ${(recommendation.estimatedSavings / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-slate-400">Est. Savings</div>
                      </div>
                      <div className="text-center p-2 bg-slate-700/50 rounded-lg">
                        <div className="text-lg font-bold text-orange-400">
                          ${(recommendation.estimatedCost / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-slate-400">Est. Cost</div>
                      </div>
                      <div className="text-center p-2 bg-slate-700/50 rounded-lg">
                        <div className={cn("text-lg font-bold", roi > 0 ? "text-green-400" : "text-red-400")}>
                          ${(roi / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-slate-400">Net ROI</div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <Separator className="bg-slate-700" />

                          <div>
                            <h5 className="font-medium text-white mb-2">Rationale</h5>
                            <p className="text-slate-300 text-sm">{recommendation.rationale}</p>
                          </div>

                          {recommendation.expectedBenefits.length > 0 && (
                            <div>
                              <h5 className="font-medium text-white mb-2">Expected Benefits</h5>
                              <ul className="space-y-1">
                                {recommendation.expectedBenefits.map((benefit, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                                    <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {recommendation.implementationSteps.length > 0 && (
                            <div>
                              <h5 className="font-medium text-white mb-2">Implementation Steps</h5>
                              <ol className="space-y-2">
                                {recommendation.implementationSteps.map((step, idx) => (
                                  <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                                    <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                      {idx + 1}
                                    </div>
                                    {step}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-slate-400">Implementation Time:</span>
                              <p className="text-white font-medium">{recommendation.timeToImplement}</p>
                            </div>
                            <div>
                              <span className="text-slate-400">Risk Level:</span>
                              <p
                                className={cn(
                                  "font-medium capitalize",
                                  recommendation.riskLevel === "high"
                                    ? "text-red-400"
                                    : recommendation.riskLevel === "medium"
                                      ? "text-yellow-400"
                                      : "text-green-400",
                                )}
                              >
                                {recommendation.riskLevel}
                              </p>
                            </div>
                          </div>

                          {recommendation.affectedVendors.length > 0 && (
                            <div>
                              <span className="text-slate-400 text-sm">Affected Vendors:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {recommendation.affectedVendors.map((vendor, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {vendor}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

const TrendAnalysisCard: React.FC<{
  analysis: string | null
  isLoading: boolean
  onRegenerate: () => void
}> = ({ analysis, isLoading, onRegenerate }) => {
  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-700 rounded w-full"></div>
              <div className="h-3 bg-slate-700 rounded w-full"></div>
              <div className="h-3 bg-slate-700 rounded w-3/4"></div>
              <div className="h-3 bg-slate-700 rounded w-full"></div>
              <div className="h-3 bg-slate-700 rounded w-2/3"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!analysis) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6 text-center">
          <TrendingUp className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400 mb-4">No trend analysis generated yet</p>
          <Button onClick={onRegenerate} variant="outline">
            Generate Analysis
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Industry Trend Analysis
            </CardTitle>
            <Button onClick={onRegenerate} size="sm" variant="ghost" className="text-slate-400 hover:text-white">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="prose prose-invert max-w-none">
              <div className="text-slate-300 leading-relaxed whitespace-pre-line">{analysis}</div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  )
}
