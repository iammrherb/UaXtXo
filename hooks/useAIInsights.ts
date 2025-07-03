"use client"

import { useState, useCallback } from "react"
import { generateAIInsights } from "@/app/actions/ai"
import type { NewVendorData } from "@/lib/vendors/data"
import type { RiskAssessmentResult } from "@/lib/compliance/risk-assessment"

interface AIInsightData {
  executiveSummary: {
    overview: string
    criticalRisks: string[]
    recommendations: string[]
    financialImpact: string
    keyMetrics: {
      avgRiskScore: number
      totalGaps: number
      estimatedCostRisk: number
      highRiskVendors: number
    }
  }
  insights: Array<{
    id: string
    type: "risk" | "cost" | "compliance" | "operational"
    title: string
    summary: string
    details: string
    priority: "low" | "medium" | "high" | "critical"
    confidence: number
    potentialImpact: number
    recommendations: string[]
    affectedVendors: string[]
  }>
  recommendations: Array<{
    id: string
    category: "security" | "compliance" | "cost" | "operational"
    title: string
    description: string
    priority: "low" | "medium" | "high" | "critical"
    estimatedCost: number
    estimatedSavings: number
    timeframe: string
    confidence: number
    riskLevel: "low" | "medium" | "high" | "critical"
    implementationSteps: string[]
    expectedOutcomes: string[]
  }>
  metadata: {
    vendorCount: number
    avgRiskScore: number
    totalGaps: number
    generatedAt: string
  }
}

export function useAIInsights(
  vendors: NewVendorData[],
  riskAssessments: Record<string, RiskAssessmentResult>,
  industry: string,
  orgSize: string,
) {
  const [data, setData] = useState<AIInsightData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCached, setIsCached] = useState(false)

  const generateInsights = useCallback(
    async (forceRegenerate = false) => {
      if (vendors.length === 0 || Object.keys(riskAssessments).length === 0) {
        setError("No vendor or risk assessment data available")
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const result = await generateAIInsights(vendors, riskAssessments, industry, orgSize, forceRegenerate)

        if (result.success) {
          setData(result.data)
          setIsCached(result.cached)
        } else {
          setError(result.error || "Failed to generate insights")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    },
    [vendors, riskAssessments, industry, orgSize],
  )

  return {
    // Data
    executiveSummary: data?.executiveSummary || null,
    insights: data?.insights || [],
    recommendations: data?.recommendations || [],
    metadata: data?.metadata || null,

    // State
    isLoading,
    error,
    hasInsights: !!data,
    isCached,

    // Actions
    generateInsights,
  }
}
