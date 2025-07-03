"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, TrendingUp, AlertTriangle, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AIInsight, SmartRecommendation } from "@/lib/ai/insight-generator"

export const AIInsightsSummary: React.FC<{
  insights: AIInsight[]
  recommendations: SmartRecommendation[]
  className?: string
}> = ({ insights, recommendations, className }) => {
  const criticalInsights = insights.filter((i) => i.priority === "critical").length
  const totalPotentialSavings = recommendations.reduce((sum, r) => sum + r.estimatedSavings, 0)

  return (
    <Card className={cn("bg-slate-800/50 border-slate-700", className)}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          AI Insights Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <div>
            <p className="text-2xl font-bold text-white">{criticalInsights}</p>
            <p className="text-sm text-slate-400">Critical Insights</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-green-400" />
          <div>
            <p className="text-2xl font-bold text-white">{recommendations.length}</p>
            <p className="text-sm text-slate-400">Recommendations</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-yellow-400" />
          <div>
            <p className="text-2xl font-bold text-white">${(totalPotentialSavings / 1000).toFixed(0)}K</p>
            <p className="text-sm text-slate-400">Potential ROI</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
