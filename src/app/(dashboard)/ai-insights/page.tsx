"use client"
import { motion } from "framer-motion"
import { useDashboardContext } from "@/context/DashboardContext"
import { useVendorData } from "@/hooks/useVendorData"
import { useComplianceData } from "@/hooks/useComplianceData"
import { useAIInsights } from "@/hooks/useAIInsights"
import { AIInsightsPanel } from "@/components/ai/AIInsightsPanel"
import { AIInsightsSummary } from "@/components/ai/AIInsightsSummary"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, AlertCircle, TrendingUp } from "lucide-react"

export default function AIInsightsPage() {
  const { selectedVendors, industry, orgSize } = useDashboardContext()
  const { vendors } = useVendorData()
  const { riskAssessments } = useComplianceData(selectedVendors, industry, orgSize)

  const selectedVendorData = vendors.filter((v) => selectedVendors.includes(v.id))

  const {
    executiveSummary,
    insights,
    recommendations,
    trendAnalysis,
    isLoading,
    error,
    hasInsights,
    generateInsights,
    regenerateSpecific,
  } = useAIInsights(selectedVendorData, riskAssessments, industry, orgSize)

  const handleRegenerate = (type?: "summary" | "insights" | "recommendations" | "trends") => {
    if (type) {
      regenerateSpecific(type)
    } else {
      generateInsights(true)
    }
  }

  if (selectedVendors.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <Card className="bg-slate-800/50 border-slate-700 max-w-md mx-auto">
              <CardContent className="p-8">
                <Brain className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">No Vendors Selected</h2>
                <p className="text-slate-400 mb-6">
                  Please select vendors from the dashboard to generate AI-powered insights and recommendations.
                </p>
                <Button
                  onClick={() => window.history.back()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Go Back to Dashboard
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">AI-Powered Insights</h1>
            <p className="text-slate-400">Intelligent analysis of your vendor risk assessment data</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-slate-300">
              {selectedVendors.length} vendor{selectedVendors.length !== 1 ? "s" : ""} selected
            </Badge>
            <Badge variant="outline" className="text-slate-300 capitalize">
              {industry.replace("_", " ")} industry
            </Badge>
          </div>
        </motion.div>

        {/* Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-700/50">
            <CardContent className="p-4 text-center">
              <Brain className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">{insights.length}</div>
              <div className="text-xs text-slate-400">AI Insights</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/20 to-teal-900/20 border-green-700/50">
            <CardContent className="p-4 text-center">
              <Sparkles className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">{recommendations.length}</div>
              <div className="text-xs text-slate-400">Smart Recommendations</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-700/50">
            <CardContent className="p-4 text-center">
              <AlertCircle className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">
                {insights.filter((i) => i.priority === "critical" || i.priority === "high").length}
              </div>
              <div className="text-xs text-slate-400">High Priority Items</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-700/50">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">{trendAnalysis ? "1" : "0"}</div>
              <div className="text-xs text-slate-400">Trend Analysis</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Insights Summary */}
        {hasInsights && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AIInsightsSummary insights={insights} recommendations={recommendations} />
          </motion.div>
        )}

        {/* Main AI Insights Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AIInsightsPanel
            executiveSummary={executiveSummary}
            insights={insights}
            recommendations={recommendations}
            trendAnalysis={trendAnalysis}
            isLoading={isLoading}
            error={error}
            onRegenerate={handleRegenerate}
            onGenerateAll={() => generateInsights(true)}
          />
        </motion.div>
      </div>
    </div>
  )
}
