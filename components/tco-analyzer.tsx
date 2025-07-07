"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import {
  getAllVendorComparisons,
  getIndustryRecommendations,
  calculateMigrationComplexity,
} from "@/lib/calculators/comprehensive-tco-calculator"

export function TCOAnalyzer() {
  // Configuration state
  const [industry, setIndustry] = useState('HEALTHCARE')
  const [deviceCount, setDeviceCount] = useState(500)
  const [timeframe, setTimeframe] = useState<1 | 3 | 5>(3)
  const [deploymentModel, setDeploymentModel] = useState<'CLOUD' | 'HYBRID' | 'ON_PREMISE'>('CLOUD')
  const [hasExistingNAC, setHasExistingNAC] = useState(false)
  const [currentVendor, setCurrentVendor] = useState<string>('')
  const [includeCompliance, setIncludeCompliance] = useState(true)
  const [includeRiskReduction, setIncludeRiskReduction] = useState(true)
  
  // View state
  const [activeTab, setActiveTab] = useState('quick-assessment')
  const [selectedVendors, setSelectedVendors] = useState([
    'PORTNOX', 'CISCO_ISE', 'ARUBA_CLEARPASS', 'FORESCOUT'
  ])

  // Calculate TCO for all vendors
  const vendorComparisons = useMemo(() => {
    return getAllVendorComparisons({
      deviceCount,
      timeframe,
      industry,
      deploymentModel,
      hasExistingNAC,
      currentVendor,
      includeCompliance,
      includeRiskReduction
    })
  }, [deviceCount, timeframe, industry, deploymentModel, hasExistingNAC, currentVendor, includeCompliance, includeRiskReduction])

  // Get industry recommendations
  const industryRecommendations = useMemo(() => {
    return getIndustryRecommendations(industry, deviceCount)
  }, [industry, deviceCount])

  // Calculate migration complexity if applicable
  const migrationComplexity = useMemo(() => {
    if (hasExistingNAC && currentVendor) {
      return calculateMigrationComplexity(currentVendor, 'PORTNOX', deviceCount)
    }
    return null
  }, [hasExistingNAC, currentVendor, deviceCount])

  // Quick assessment data
  const quickAssessment = useMemo(() => {
    const portnoxData = vendorComparisons['PORTNOX']
    const avgCompetitorCost = Object.entries(vendorComparisons)
      .filter(([key]) => key !== 'PORTNOX')
      .reduce((acc, [_, data]) => acc + data.totalCost, 0) / (Object.keys(vendorComparisons).length - 1)

    return {
      portnoxTCO: portnoxData.totalCost,
      avgCompetitorTCO: avgCompetitorCost,
      savings: avgCompetitorCost - portnoxData.totalCost,
      percentSavings: Math.round(((avgCompetitorCost - portnoxData.totalCost) / avgCompetitorCost) * 100),
      roi: portnoxData.roi,
      paybackDays: portnoxData.paybackPeriod
    }
  }, [vendorComparisons])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value.toFixed(0)}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          NAC Total Cost of Ownership Analyzer
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare all major NAC vendors with comprehensive cost analysis
        </p>
      </div>

      {/* Configuration Panel */}
      <Card>\
