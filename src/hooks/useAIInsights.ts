"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useDashboardContext } from "@/context/DashboardContext"
import { useTcoCalculator } from "./useTcoCalculator"
import { useComplianceData } from "./useComplianceData"
import {
  aiInsightGenerator,
  type AIInsight,
  type SmartRecommendation,
  type ExecutiveSummary,
} from "@/lib/ai/insight-generator"

interface AIInsightsState {
  insights: AIInsight[]
  recommendations: SmartRecommendation[]
  executiveSummary: ExecutiveSummary | null
  trendAnalysis: string | null
  isLoading: boolean
  error: string | null
  lastGenerated: string | null
  cacheKey: string | null
}

const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes
const CACHE_PREFIX = "ai-insights-"

const fetchAIInsights = async (context: any, tcoData: any, complianceData: any): Promise<AIInsight[] | null> => {
  // Simulate network delay and AI processing time
  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (!context || !tcoData || !complianceData) {
    return null
  }

  try {
    const insights = aiInsightGenerator.generateInsights(context, tcoData, complianceData)
    return insights
  } catch (error) {
    console.error("Error generating AI insights:", error)
    // In a real app, you might want to return a more specific error object
    throw new Error("Failed to generate AI insights")
  }
}

export function useAIInsights() {
  const dashboardContext = useDashboardContext()
  const tcoData = useTcoCalculator()
  const complianceData = useComplianceData()

  const queryKey = useMemo(
    () => ["aiInsights", dashboardContext, tcoData.vendorTco, complianceData.vendorRiskAssessments],
    [dashboardContext, tcoData.vendorTco, complianceData.vendorRiskAssessments],
  )

  const {
    data: insights,
    isLoading,
    error,
    refetch,
  } = useQuery<AIInsight[] | null, Error>({
    queryKey,
    queryFn: () => fetchAIInsights(dashboardContext, tcoData, complianceData),
    enabled:
      !!dashboardContext &&
      Object.keys(tcoData.vendorTco).length > 0 &&
      Object.keys(complianceData.vendorRiskAssessments).length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })

  const [state, setState] = useState<AIInsightsState>({
    insights: insights || [],
    recommendations: [],
    executiveSummary: null,
    trendAnalysis: null,
    isLoading: isLoading || false,
    error: error?.message || null,
    lastGenerated: null,
    cacheKey: null,
  })

  // Generate cache key based on input parameters
  const cacheKey = useMemo(() => {
    if (!dashboardContext) return null

    const vendorIds = Object.keys(tcoData.vendorTco).sort().join(",")
    const assessmentHash = Object.keys(complianceData.vendorRiskAssessments).sort().join(",")
    return `${CACHE_PREFIX}${vendorIds}-${assessmentHash}-${dashboardContext.industry}-${dashboardContext.orgSize}`
  }, [dashboardContext, tcoData, complianceData])

  // Load cached insights on mount or when cache key changes
  useEffect(() => {
    if (!cacheKey) return

    const cached = localStorage.getItem(cacheKey)
    if (cached) {
      try {
        const parsedCache = JSON.parse(cached)
        const cacheAge = Date.now() - new Date(parsedCache.timestamp).getTime()

        if (cacheAge < CACHE_DURATION) {
          setState((prev) => ({
            ...prev,
            insights: parsedCache.insights || [],
            recommendations: parsedCache.recommendations || [],
            executiveSummary: parsedCache.executiveSummary || null,
            trendAnalysis: parsedCache.trendAnalysis || null,
            lastGenerated: parsedCache.timestamp,
            cacheKey,
          }))
          return
        } else {
          // Cache expired, remove it
          localStorage.removeItem(cacheKey)
        }
      } catch (error) {
        console.error("Failed to parse cached AI insights:", error)
        localStorage.removeItem(cacheKey)
      }
    }

    setState((prev) => ({ ...prev, cacheKey }))
  }, [cacheKey])

  const generateInsights = useCallback(
    async (forceRefresh = false) => {
      if (
        !dashboardContext ||
        Object.keys(tcoData.vendorTco).length === 0 ||
        Object.keys(complianceData.vendorRiskAssessments).length === 0
      ) {
        setState((prev) => ({
          ...prev,
          error: "No vendors or risk assessments available for analysis",
        }))
        return
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        const [insights, recommendations, executiveSummary, trendAnalysis] = await Promise.all([
          aiInsightGenerator.generateInsights(
            tcoData.vendorTco,
            complianceData.vendorRiskAssessments,
            dashboardContext.industry,
            dashboardContext.orgSize,
          ),
          aiInsightGenerator.generateSmartRecommendations(
            tcoData.vendorTco,
            complianceData.vendorRiskAssessments,
            dashboardContext.industry,
            dashboardContext.orgSize,
          ),
          aiInsightGenerator.generateExecutiveSummary(
            tcoData.vendorTco,
            complianceData.vendorRiskAssessments,
            dashboardContext.industry,
            dashboardContext.orgSize,
          ),
          aiInsightGenerator.generateTrendAnalysis(
            tcoData.vendorTco,
            complianceData.vendorRiskAssessments,
            dashboardContext.industry,
          ),
        ])

        const timestamp = new Date().toISOString()

        setState((prev) => ({
          ...prev,
          insights,
          recommendations,
          executiveSummary,
          trendAnalysis,
          isLoading: false,
          lastGenerated: timestamp,
        }))

        // Cache the results
        if (cacheKey) {
          const cacheData = {
            insights,
            recommendations,
            executiveSummary,
            trendAnalysis,
            timestamp,
          }

          try {
            localStorage.setItem(cacheKey, JSON.stringify(cacheData))
          } catch (cacheError) {
            console.warn("Failed to cache AI insights:", cacheError)
          }
        }
      } catch (error) {
        console.error("Error generating AI insights:", error)
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Failed to generate AI insights",
        }))
      }
    },
    [dashboardContext, tcoData, complianceData, cacheKey],
  )

  const clearInsights = useCallback(() => {
    setState((prev) => ({
      ...prev,
      insights: [],
      recommendations: [],
      executiveSummary: null,
      trendAnalysis: null,
      lastGenerated: null,
    }))

    if (cacheKey) {
      localStorage.removeItem(cacheKey)
    }
  }, [cacheKey])

  const refreshInsights = useCallback(() => {
    return generateInsights(true)
  }, [generateInsights])

  const regenerateSpecific = useCallback(
    async (type: "summary" | "insights" | "recommendations" | "trends") => {
      if (
        !dashboardContext ||
        Object.keys(tcoData.vendorTco).length === 0 ||
        Object.keys(complianceData.vendorRiskAssessments).length === 0
      ) {
        return
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        switch (type) {
          case "summary":
            const executiveSummary = await aiInsightGenerator.generateExecutiveSummary(
              tcoData.vendorTco,
              complianceData.vendorRiskAssessments,
              dashboardContext.industry,
              dashboardContext.orgSize,
            )
            setState((prev) => ({ ...prev, executiveSummary, isLoading: false }))
            break
          case "insights":
            const insights = await aiInsightGenerator.generateInsights(
              tcoData.vendorTco,
              complianceData.vendorRiskAssessments,
              dashboardContext.industry,
              dashboardContext.orgSize,
            )
            setState((prev) => ({ ...prev, insights, isLoading: false }))
            break
          case "recommendations":
            const recommendations = await aiInsightGenerator.generateSmartRecommendations(
              tcoData.vendorTco,
              complianceData.vendorRiskAssessments,
              dashboardContext.industry,
              dashboardContext.orgSize,
            )
            setState((prev) => ({ ...prev, recommendations, isLoading: false }))
            break
          case "trends":
            const trendAnalysis = await aiInsightGenerator.generateTrendAnalysis(
              tcoData.vendorTco,
              complianceData.vendorRiskAssessments,
              dashboardContext.industry,
            )
            setState((prev) => ({ ...prev, trendAnalysis, isLoading: false }))
            break
        }
      } catch (error) {
        console.error(`Error regenerating ${type}:`, error)
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : `Failed to regenerate ${type}`,
        }))
      }
    },
    [dashboardContext, tcoData, complianceData],
  )

  // Auto-load cached insights on mount
  useEffect(() => {
    if (dashboardContext && !state.lastGenerated) {
      const timer = setTimeout(() => {
        generateInsights()
      }, 2000) // 2 second debounce

      return () => clearTimeout(timer)
    }
  }, [dashboardContext, generateInsights, state.lastGenerated])

  // Derived state
  const hasInsights = state.insights.length > 0 || state.recommendations.length > 0 || !!state.executiveSummary
  const isCacheValid = state.lastGenerated && Date.now() - new Date(state.lastGenerated).getTime() < CACHE_DURATION

  const insightsSummary = useMemo(() => {
    if (!hasInsights) return null

    const criticalInsights = state.insights.filter((i) => i.priority === "critical").length
    const highPriorityInsights = state.insights.filter((i) => i.priority === "high").length
    const totalRecommendations = state.recommendations.length
    const highImpactRecommendations = state.recommendations.filter((r) => r.estimatedSavings > 100000).length

    return {
      totalInsights: state.insights.length,
      criticalInsights,
      highPriorityInsights,
      totalRecommendations,
      highImpactRecommendations,
      averageConfidence: Math.round(
        state.insights.reduce((sum, i) => sum + i.confidence, 0) / state.insights.length || 0,
      ),
      potentialSavings: state.recommendations.reduce((sum, r) => sum + r.estimatedSavings, 0),
    }
  }, [state.insights, state.recommendations, hasInsights])

  return {
    // State
    insights: state.insights,
    recommendations: state.recommendations,
    executiveSummary: state.executiveSummary,
    trendAnalysis: state.trendAnalysis,
    isLoading: state.isLoading,
    error: state.error,
    lastGenerated: state.lastGenerated,

    // Derived state
    hasInsights,
    isCacheValid,
    insightsSummary,

    // Actions
    generateInsights,
    refreshInsights,
    clearInsights,
    regenerateSpecific,
    refetch,
  }
}
