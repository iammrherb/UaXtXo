"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, RefreshCw, TrendingUp, AlertTriangle, ShieldCheck, DollarSign } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"
import { useDashboardContext } from "@/context/DashboardContext"
import { useAIInsights } from "@/hooks/useAIInsights"
import type { NewVendorData } from "@/lib/vendors/data"
import type { RiskAssessmentResult } from "@/lib/compliance/risk-assessment"

export const ExecutiveSummary: React.FC<{
  vendors: NewVendorData[]
  riskAssessments: Record<string, RiskAssessmentResult>
  className?: string
}> = ({ vendors, riskAssessments, className }) => {
  const { industry, orgSize } = useDashboardContext()
  const {
    executiveSummary,
    isLoading: aiLoading,
    hasInsights,
    generateInsights,
  } = useAIInsights(vendors, riskAssessments, industry, orgSize)

  const keyMetrics = [
    { title: "Total Vendors", value: vendors.length, icon: ShieldCheck },
    {
      title: "Avg. Risk Score",
      value: (Object.values(riskAssessments).reduce((sum, r) => sum + r.overallRiskScore, 0) / vendors.length).toFixed(
        1,
      ),
      icon: AlertTriangle,
    },
    { title: "Potential Savings", value: formatCurrency(250000), icon: DollarSign },
    { title: "Top Recommendation", value: "Adopt Cloud NAC", icon: TrendingUp },
  ]

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Executive Summary</h2>
          <p className="text-slate-400">Comprehensive overview of your vendor risk landscape</p>
        </div>
        <div className="flex items-center gap-3">
          {hasInsights && (
            <Badge variant="outline" className="text-green-400 border-green-400">
              <Brain className="w-3 h-3 mr-1" />
              AI Enhanced
            </Badge>
          )}
          <Button
            onClick={() => generateInsights()}
            disabled={aiLoading}
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {aiLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            {aiLoading ? "Generating..." : "AI Insights"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, i) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      {executiveSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                AI-Generated Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300 leading-relaxed">{executiveSummary.overview}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
