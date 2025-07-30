"use client"

import { useMemo, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area,
  AreaChart,
  ReferenceLine
} from "recharts"
import { 
  TrendingUp, 
  DollarSign, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Target, 
  Zap, 
  Award,
  AlertTriangle,
  Users,
  Building2,
  Gauge,
  Calendar,
  FileCheck,
  ArrowUpRight,
  TrendingDown,
  Star,
  Briefcase,
  Globe,
  BarChart3,
  Cloud,
  RefreshCw,
  Download,
  Share2,
  AlertCircle,
  Info,
  Wifi,
  Database,
  Settings,
  Activity
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { EnhancedCalculationService } from "@/lib/services/enhanced-calculation-service"
import { RealTimeDataService } from "@/lib/services/real-time-data-service"
import type { UltimateCalculationResult } from "@/lib/services/enhanced-calculation-service"
import type { CalculationConfiguration } from "@/lib/types"

interface ExecutiveDashboardViewProps {
  results?: UltimateCalculationResult[]
  config?: CalculationConfiguration
}

export default function ExecutiveDashboardView({ results = [], config }: ExecutiveDashboardViewProps) {
  const [realTimeData, setRealTimeData] = useState<any>(null)
  const [isRealTimeActive, setIsRealTimeActive] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const competitorResults = results.filter((r) => r.vendorId !== "portnox")

  // Real-time data monitoring
  useEffect(() => {
    if (results.length === 0) return

    const vendorIds = results.map(r => r.vendorId)
    
    const cleanup = EnhancedCalculationService.startRealTimeMonitoring(vendorIds, (data) => {
      setRealTimeData(data)
      setLastUpdate(new Date())
      setIsRealTimeActive(true)
    })

    return cleanup
  }, [results])

  const executiveSummary = useMemo(() => {
    if (!portnoxResult || competitorResults.length === 0) {
      return {
        totalSavings: 0,
        percentSavings: 0,
        roi: 0,
        paybackMonths: 0,
        riskReduction: 0,
        deploymentAdvantage: 0,
        avgCompetitorCost: 0,
        portnoxAdvantages: [],
        businessValue: 0,
        strategicImpact: 0
      }
    }

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const percentSavings = avgCompetitorCost > 0 ? (totalSavings / avgCompetitorCost) * 100 : 0
    const roi = portnoxResult.roi.percentage
    const paybackMonths = portnoxResult.roi.paybackMonths
    const riskReduction = portnoxResult.roi.breachReduction
    const avgCompetitorDeployment = competitorResults.reduce((sum, r) => sum + r.timeline.timeToValue, 0) / competitorResults.length
    const deploymentAdvantage = ((avgCompetitorDeployment - portnoxResult.timeline.timeToValue) / avgCompetitorDeployment) * 100
    const businessValue = portnoxResult.roi.totalBusinessValue
    const strategicImpact = (portnoxResult.competitive.digitalTransformationAlignment + 
                           portnoxResult.competitive.futureReadiness + 
                           portnoxResult.competitive.innovationScore) / 3

    const portnoxAdvantages = [
      `${percentSavings.toFixed(0)}% cost reduction vs competitors`,
      `${deploymentAdvantage.toFixed(0)}% faster deployment (${portnoxResult.timeline.timeToValue} days vs ${avgCompetitorDeployment.toFixed(0)} days)`,
      `${riskReduction.toFixed(0)}% breach risk reduction`,
      `Zero infrastructure requirements - pure SaaS`,
      `${portnoxResult.operational.automationLevel}% automation level`,
      `Zero CVE security record vs ${competitorResults.reduce((sum, r) => sum + (r.vendorData?.security?.cveCount || 0), 0)} competitor CVEs`,
      `All-inclusive pricing with no hidden costs`,
      `${portnoxResult.roi.netPresentValue > 0 ? '+' : ''}${(portnoxResult.roi.netPresentValue / 1000000).toFixed(1)}M NPV over ${config?.years || 3} years`
    ]

    return {
      totalSavings,
      percentSavings,
      roi,
      paybackMonths,
      riskReduction,
      deploymentAdvantage,
      avgCompetitorCost,
      portnoxAdvantages,
      businessValue,
      strategicImpact
    }
  }, [results, config, portnoxResult, competitorResults])

  const costComparisonData = useMemo(() => {
    return results
      .sort((a, b) => a.totalCost - b.totalCost)
      .map((result, index) => ({
        vendor: result.vendorName,
        vendorId: result.vendorId,
        totalCost: result.totalCost,
        licensing: result.breakdown.licensing,
        hardware: result.breakdown.hardware,
        implementation: result.breakdown.implementation,
        support: result.breakdown.support,
        training: result.breakdown.training,
        maintenance: result.breakdown.maintenance,
        operational: result.breakdown.operational,
        hidden: result.breakdown.hidden,
        compliance: result.breakdown.compliance,
        migration: result.breakdown.migration,
        consulting: result.breakdown.consulting,
        integration: result.breakdown.integration,
        savings: executiveSummary.avgCompetitorCost - result.totalCost,
        isPortnox: result.vendorId === "portnox",
        rank: index + 1,
        deploymentDays: result.timeline.timeToValue,
        roi: result.roi.percentage,
        riskLevel: result.recommendations.riskLevel,
        overallScore: result.recommendations.overallScore,
        securityScore: result.risk.securityScore,
        automationLevel: result.operational.automationLevel
      }))
  }, [results, executiveSummary])

  const roiTimelineData = useMemo(() => {
    if (!portnoxResult || !executiveSummary.totalSavings) return []

    const timeframe = config?.years || 3
    const monthlyBenefit = executiveSummary.totalSavings / (timeframe * 12)
    const data = []

    for (let month = 0; month <= timeframe * 12; month += 1) {
      const cumulativeBenefit = monthlyBenefit * month
      const netValue = cumulativeBenefit - portnoxResult.totalCost
      const roi = portnoxResult.totalCost > 0 ? (netValue / portnoxResult.totalCost) * 100 : 0
      const riskAdjustedROI = roi * (1 - portnoxResult.risk.vendorRisk / 100 * 0.2)

      data.push({
        month,
        quarter: `Q${Math.ceil((month + 1) / 3)}`,
        cumulativeBenefit,
        netValue,
        roi,
        riskAdjustedROI,
        breakeven: netValue >= 0,
        monthlyBenefit: month > 0 ? monthlyBenefit : 0
      })
    }

    return data
  }, [portnoxResult, executiveSummary, config])

  const businessImpactMetrics = useMemo(() => {
    if (!portnoxResult) return []

    const totalValue = portnoxResult.roi.totalBusinessValue

    return [
      {
        category: "Security Enhancement",
        impact: portnoxResult.roi.breachReduction,
        value: portnoxResult.roi.valueDrivers.securityValue,
        description: "Breach risk reduction and security posture improvement",
        color: "#EF4444",
        trend: "increasing",
        confidence: 95
      },
      {
        category: "Operational Efficiency", 
        impact: portnoxResult.operational.automationLevel,
        value: portnoxResult.roi.valueDrivers.operationalValue,
        description: "Automation and reduced administrative overhead",
        color: "#3B82F6",
        trend: "increasing",
        confidence: 90
      },
      {
        category: "Compliance Automation",
        impact: portnoxResult.complianceSummary?.automationLevel || 95,
        value: portnoxResult.roi.valueDrivers.complianceValue,
        description: "Automated compliance and audit readiness",
        color: "#10B981",
        trend: "stable",
        confidence: 88
      },
      {
        category: "Infrastructure Savings",
        impact: 100, // 100% infrastructure elimination
        value: portnoxResult.roi.valueDrivers.infrastructureValue,
        description: "Eliminated hardware and maintenance costs",
        color: "#F59E0B",
        trend: "stable",
        confidence: 98
      },
      {
        category: "Productivity Gains",
        impact: portnoxResult.operational.productivityGains,
        value: portnoxResult.roi.valueDrivers.productivityValue,
        description: "User productivity and experience improvements",
        color: "#8B5CF6",
        trend: "increasing",
        confidence: 85
      }
    ]
  }, [portnoxResult])

  const implementationComparison = useMemo(() => {
    return results.map(result => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      deploymentDays: result.timeline.timeToValue,
      complexity: result.recommendations.implementationComplexity,
      professionalServices: result.vendorData?.implementation?.professionalServicesRequired || false,
      trainingHours: result.vendorData?.implementation?.trainingHours || 0,
      hardwareRequired: result.vendorData?.infrastructure?.hardwareRequired || false,
      maintenanceWindows: result.vendorData?.infrastructure?.maintenanceWindows || 0,
      ongoingFTE: result.vendorData?.implementation?.resourcesRequired?.ongoing || 0,
      automationLevel: result.operational.automationLevel,
      securityScore: result.risk.securityScore,
      cveCount: result.vendorData?.security?.cveCount || 0,
      isPortnox: result.vendorId === "portnox",
      riskLevel: result.recommendations.riskLevel,
      overallScore: result.recommendations.overallScore
    }))
  }, [results])

  const competitiveAnalysis = useMemo(() => {
    return results.map(result => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      innovationScore: result.competitive.innovationScore,
      futureReadiness: result.competitive.futureReadiness,
      marketPosition: result.competitive.marketPosition,
      technologyLeadership: result.competitive.technologyLeadership,
      cloudReadiness: result.competitive.cloudReadiness,
      securityMaturity: result.competitive.securityMaturity,
      overallCompetitive: (result.competitive.innovationScore + 
                          result.competitive.futureReadiness + 
                          result.competitive.technologyLeadership) / 3,
      isPortnox: result.vendorId === "portnox"
    }))
  }, [results])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatCurrencyShort = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return formatCurrency(value)
  }

  const formatPercent = (value: number) => `${value.toFixed(1)}%`

  const handleExportAnalysis = () => {
    const exportData = {
      executiveSummary,
      results,
      config,
      timestamp: new Date().toISOString(),
      realTimeData
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `executive-tco-analysis-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleShareAnalysis = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Executive TCO Analysis',
        text: `Portnox CLEAR delivers ${executiveSummary.roi.toFixed(0)}% ROI with ${executiveSummary.paybackMonths.toFixed(1)}-month payback`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-8 text-center">
          <CardContent>
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Select vendors to begin your executive analysis
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Real-Time Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg p-4 border"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isRealTimeActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-sm font-medium">
                {isRealTimeActive ? 'Real-Time Data Active' : 'Static Analysis'}
              </span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="text-sm text-muted-foreground">
              Last Updated: {lastUpdate.toLocaleTimeString()}
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1">
              <Activity className="h-4 w-4 text-blue-600" />
              <span className="text-sm">{results.length} vendors analyzed</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShareAnalysis}>
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportAnalysis}>
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh Data
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Executive Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 border"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Executive Investment Analysis
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Strategic recommendation for Network Access Control modernization
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Badge variant="outline" className="text-sm">
                {config?.industry?.charAt(0).toUpperCase() + config?.industry?.slice(1)} Industry
              </Badge>
              <Badge variant="outline" className="text-sm">
                {(config?.devices || 0).toLocaleString()} Devices
              </Badge>
              <Badge variant="outline" className="text-sm">
                {config?.years || 3} Year Analysis
              </Badge>
              <Badge variant="outline" className="text-sm">
                {config?.region?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Region
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total Business Value</div>
            <div className="text-4xl font-bold text-green-600">
              {formatCurrencyShort(executiveSummary.businessValue)}
            </div>
            <div className="text-sm text-muted-foreground">
              Strategic Impact Score: {executiveSummary.strategicImpact.toFixed(0)}/100
            </div>
          </div>
        </div>

        {/* Key Executive Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">Total Savings</p>
                    <p className="text-3xl font-bold text-green-800 dark:text-green-200">
                      {formatCurrencyShort(executiveSummary.totalSavings)}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {executiveSummary.percentSavings.toFixed(0)}% cost reduction
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <Progress value={Math.min(executiveSummary.percentSavings, 100)} className="mt-4 h-2" />
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">Immediate impact</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">ROI & NPV</p>
                    <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">
                      {executiveSummary.roi.toFixed(0)}%
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      NPV: {formatCurrencyShort(portnoxResult?.roi.netPresentValue || 0)}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">
                    {executiveSummary.paybackMonths.toFixed(1)} month payback
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">
                    IRR: {formatPercent(portnoxResult?.roi.internalRateOfReturn || 0)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Risk Reduction</p>
                    <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">
                      {executiveSummary.riskReduction.toFixed(0)}%
                    </p>
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      Security Score: {portnoxResult?.risk.securityScore || 0}/100
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <Badge variant="outline" className="mt-4 text-xs border-purple-300 text-purple-700">
                  Zero CVE Record
                </Badge>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-purple-600">Enterprise-grade security</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Deployment Speed</p>
                    <p className="text-3xl font-bold text-orange-800 dark:text-orange-200">
                      {executiveSummary.deploymentAdvantage.toFixed(0)}%
                    </p>
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      Faster than competitors
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Zap className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-600">
                    {portnoxResult?.timeline.timeToValue || 1} day to production
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Zap className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-600">
                    {portnoxResult?.operational.automationLevel || 95}% automation
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Strategic Recommendation Alert */}
      <Alert className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <Award className="h-5 w-5" />
        <AlertTitle className="text-green-900 dark:text-green-100 text-xl">
          Strategic Recommendation: Portnox CLEAR
        </AlertTitle>
        <AlertDescription className="text-green-800 dark:text-green-200 text-base mt-3">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="font-semibold mb-2">Financial Impact:</p>
              <ul className="space-y-1 text-sm">
                <li>• {formatCurrency(executiveSummary.totalSavings)} total savings over {config?.years || 3} years</li>
                <li>• {executiveSummary.roi.toFixed(0)}% ROI with {executiveSummary.paybackMonths.toFixed(1)}-month payback</li>
                <li>• {formatCurrencyShort(portnoxResult?.roi.netPresentValue || 0)} net present value</li>
                <li>• Zero infrastructure investment required</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Strategic Benefits:</p>
              <ul className="space-y-1 text-sm">
                <li>• {executiveSummary.deploymentAdvantage.toFixed(0)}% faster deployment enables immediate value</li>
                <li>• {executiveSummary.riskReduction.toFixed(0)}% breach risk reduction</li>
                <li>• Zero maintenance windows or downtime</li>
                <li>• Future-proof cloud-native architecture</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Competitive Advantages:</p>
              <ul className="space-y-1 text-sm">
                <li>• Zero CVE security record vs {competitorResults.reduce((sum, r) => sum + (r.vendorData?.security?.cveCount || 0), 0)} competitor CVEs</li>
                <li>• {portnoxResult?.operational.automationLevel || 95}% automation vs industry average 45%</li>
                <li>• All-inclusive pricing eliminates hidden costs</li>
                <li>• Infinite cloud scalability</li>
              </ul>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Critical Vendor Warnings */}
      {results.some(r => r.vendorId === 'ivanti_neurons') && (
        <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-red-900 dark:text-red-100">
            CRITICAL SECURITY ALERT: Ivanti Neurons
          </AlertTitle>
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>IMMEDIATE ACTION REQUIRED:</strong> Ivanti Neurons (formerly Pulse Secure) has 89+ known vulnerabilities 
            with active nation-state exploitation. This platform poses significant security and compliance risks. 
            <strong> Emergency migration to Portnox CLEAR recommended within 30 days.</strong>
          </AlertDescription>
        </Alert>
      )}

      {/* Comprehensive Cost Analysis */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Total Cost of Ownership Analysis
            </CardTitle>
            <CardDescription>
              {config?.years || 3}-year comprehensive TCO for {(config?.devices || 0).toLocaleString()} devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={costComparisonData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(value) => formatCurrencyShort(value)} tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Vendor: ${label}`}
                />
                <Legend />
                <Bar dataKey="licensing" stackId="a" fill="#3B82F6" name="Licensing" />
                <Bar dataKey="hardware" stackId="a" fill="#EF4444" name="Hardware" />
                <Bar dataKey="implementation" stackId="a" fill="#F59E0B" name="Implementation" />
                <Bar dataKey="support" stackId="a" fill="#8B5CF6" name="Support" />
                <Bar dataKey="training" stackId="a" fill="#06B6D4" name="Training" />
                <Bar dataKey="maintenance" stackId="a" fill="#84CC16" name="Maintenance" />
                <Bar dataKey="operational" stackId="a" fill="#F97316" name="Operational" />
                <Bar dataKey="hidden" stackId="a" fill="#6B7280" name="Hidden Costs" />
                <Bar dataKey="compliance" stackId="a" fill="#EC4899" name="Compliance" />
                <Bar dataKey="migration" stackId="a" fill="#14B8A6" name="Migration" />
                <Bar dataKey="consulting" stackId="a" fill="#F43F5E" name="Consulting" />
                <Bar dataKey="integration" stackId="a" fill="#8B5CF6" name="Integration" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              ROI Development & Risk Analysis
            </CardTitle>
            <CardDescription>
              Return on investment progression with risk adjustments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={roiTimelineData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tickFormatter={(value) => `${value}m`} tick={{ fontSize: 12 }} />
                <YAxis 
                  yAxisId="left"
                  tickFormatter={(value) => `${value.toFixed(0)}%`} 
                  tick={{ fontSize: 12 }} 
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) => formatCurrencyShort(value)} 
                  tick={{ fontSize: 12 }} 
                />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    if (name.includes('ROI')) return `${value.toFixed(1)}%`
                    return formatCurrency(value)
                  }}
                  labelFormatter={(value) => `Month ${value}`}
                />
                <Legend />
                <ReferenceLine yAxisId="left" y={0} stroke="#666" strokeDasharray="2 2" />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="cumulativeBenefit"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Cumulative Benefit"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="roi"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                  name="ROI %"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="riskAdjustedROI"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  name="Risk-Adjusted ROI %"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Business Impact Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Target className="h-6 w-6 text-purple-600" />
            Business Impact & Value Creation Analysis
          </CardTitle>
          <CardDescription>
            Comprehensive business value assessment across key strategic areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              {businessImpactMetrics.map((metric, index) => (
                <motion.div
                  key={metric.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      {metric.category}
                      <Badge variant="outline" className="text-xs">
                        {metric.confidence}% confidence
                      </Badge>
                    </h4>
                    <div className="text-right">
                      <div className="text-lg font-bold" style={{ color: metric.color }}>
                        {metric.impact.toFixed(0)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrencyShort(metric.value)}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{metric.description}</p>
                  <div className="flex items-center justify-between">
                    <Progress 
                      value={metric.impact} 
                      className="flex-1 mr-4 h-2"
                      style={{ backgroundColor: `${metric.color}20` }}
                    />
                    <div className="flex items-center gap-1">
                      {metric.trend === 'increasing' ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-gray-600" />
                      )}
                      <span className="text-xs text-muted-foreground">{metric.trend}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={businessImpactMetrics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, value }) => `${category}: ${formatCurrencyShort(value)}`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {businessImpactMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation & Deployment Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-6 w-6 text-orange-600" />
            Implementation & Deployment Analysis
          </CardTitle>
          <CardDescription>
            Comprehensive deployment timeline, complexity, and resource requirements comparison
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Implementation Timeline Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={implementationComparison}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                  <YAxis 
                    yAxisId="left"
                    tickFormatter={(value) => `${value}d`} 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => `${value}%`} 
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => {
                      if (name.includes('Days')) return `${value} days`
                      if (name.includes('Score') || name.includes('Automation')) return `${value}%`
                      return value
                    }}
                    labelFormatter={(label) => `Vendor: ${label}`}
                  />
                  <Legend />
                  <Bar 
                    yAxisId="left"
                    dataKey="deploymentDays" 
                    fill="#F59E0B" 
                    name="Deployment Days" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="automationLevel"
                    stroke="#10B981"
                    strokeWidth={3}
                    name="Automation Level %"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="securityScore"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    name="Security Score %"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Implementation Comparison */}
            <div className="grid gap-4">
              {implementationComparison.map((impl, index) => (
                <motion.div
                  key={impl.vendorId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    impl.isPortnox 
                      ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20' 
                      : impl.riskLevel === 'critical'
                        ? 'border-red-300 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20'
                        : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={index === 0 ? "default" : "secondary"} 
                        className={`${index === 0 ? "bg-green-600" : ""} text-sm px-3 py-1`}
                      >
                        #{index + 1}
                      </Badge>
                      <div>
                        <h4 className="font-bold text-lg flex items-center gap-2">
                          {impl.vendor}
                          {impl.isPortnox && (
                            <Badge className="bg-green-600 text-white">
                              <Award className="w-3 h-3 mr-1" />
                              Recommended
                            </Badge>
                          )}
                          {impl.riskLevel === 'critical' && (
                            <Badge variant="destructive">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Critical Risk
                            </Badge>
                          )}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={
                            impl.riskLevel === 'low' ? 'default' :
                            impl.riskLevel === 'medium' ? 'secondary' :
                            impl.riskLevel === 'high' ? 'outline' : 'destructive'
                          }>
                            {impl.riskLevel} risk
                          </Badge>
                          <Badge variant="outline">
                            Score: {impl.overallScore.toFixed(0)}/100
                          </Badge>
                          <Badge variant="outline">
                            {impl.complexity} complexity
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-bold">{impl.deploymentDays} days</div>
                      <div className="text-sm text-muted-foreground">to production</div>
                      {impl.cveCount > 0 && (
                        <div className="text-sm text-red-600 font-medium mt-1">
                          {impl.cveCount} CVEs
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="text-lg font-bold">{impl.trainingHours}h</div>
                      <div className="text-xs text-muted-foreground">Training Required</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="text-lg font-bold">{impl.ongoingFTE.toFixed(1)}</div>
                      <div className="text-xs text-muted-foreground">Ongoing FTE</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="text-lg font-bold">{impl.maintenanceWindows}</div>
                      <div className="text-xs text-muted-foreground">Maintenance/Year</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="text-lg font-bold">{impl.automationLevel}%</div>
                      <div className="text-xs text-muted-foreground">Automation</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="text-lg font-bold">{impl.securityScore}/100</div>
                      <div className="text-xs text-muted-foreground">Security Score</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-1">
                      {impl.hardwareRequired ? (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                      <span>{impl.hardwareRequired ? "Hardware Required" : "No Hardware"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {impl.professionalServices ? (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                      <span>{impl.professionalServices ? "Prof. Services Required" : "Self-Service"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wifi className="h-4 w-4 text-blue-500" />
                      <span>Automation: {impl.automationLevel}%</span>
                    </div>
                  </div>

                  {impl.riskLevel === 'critical' && (
                    <Alert className="mt-4 border-red-300 bg-red-50 dark:bg-red-950/20">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <strong>CRITICAL:</strong> This vendor poses significant security risks. 
                        Immediate migration to a secure platform is strongly recommended.
                      </AlertDescription>
                    </Alert>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitive Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-600" />
            Strategic Competitive Analysis
          </CardTitle>
          <CardDescription>
            Innovation, market position, and future readiness assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={competitiveAnalysis}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: number) => `${value.toFixed(0)}/100`} />
                <Legend />
                <Bar dataKey="innovationScore" fill="#8B5CF6" name="Innovation Score" />
                <Bar dataKey="futureReadiness" fill="#3B82F6" name="Future Readiness" />
                <Bar dataKey="technologyLeadership" fill="#10B981" name="Technology Leadership" />
                <Bar dataKey="cloudReadiness" fill="#F59E0B" name="Cloud Readiness" />
                <Bar dataKey="securityMaturity" fill="#EF4444" name="Security Maturity" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Portnox Competitive Advantages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-600" />
            Why Portnox CLEAR is the Strategic Choice
          </CardTitle>
          <CardDescription>
            Comprehensive analysis of Portnox advantages over traditional NAC solutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Cloud,
                title: "Cloud-Native Architecture",
                description: "Zero infrastructure requirements eliminate hardware costs, maintenance, and scaling limitations",
                benefit: "100% infrastructure cost elimination",
                color: "text-blue-600",
                value: formatCurrencyShort(portnoxResult?.roi.valueDrivers.infrastructureValue || 0)
              },
              {
                icon: Zap,
                title: "Rapid Deployment",
                description: "30-minute deployment vs 6-9 months for traditional solutions enables immediate value realization",
                benefit: `${executiveSummary.deploymentAdvantage.toFixed(0)}% faster time to value`,
                color: "text-orange-600",
                value: `${portnoxResult?.timeline.timeToValue || 1} day`
              },
              {
                icon: Shield,
                title: "Zero CVE Security Record",
                description: "Industry-leading security with no known vulnerabilities provides superior protection",
                benefit: `${executiveSummary.riskReduction.toFixed(0)}% breach risk reduction`,
                color: "text-green-600",
                value: formatCurrencyShort(portnoxResult?.roi.valueDrivers.securityValue || 0)
              },
              {
                icon: DollarSign,
                title: "All-Inclusive Pricing",
                description: "Single per-device price includes all features - RADIUS, NAC, PKI, IoT profiling, risk assessment",
                benefit: "No hidden costs or add-ons",
                color: "text-purple-600",
                value: "$4/device/month"
              },
              {
                icon: Gauge,
                title: "Advanced Automation",
                description: "AI-powered automation reduces administrative overhead by 95% compared to manual processes",
                benefit: `${portnoxResult?.operational.fteSaved || 2.5} FTE savings annually`,
                color: "text-indigo-600",
                value: formatCurrencyShort(portnoxResult?.roi.valueDrivers.operationalValue || 0)
              },
              {
                icon: Globe,
                title: "Infinite Scalability",
                description: "Cloud-native platform scales globally without infrastructure investment or performance degradation",
                benefit: "Future-proof growth support",
                color: "text-teal-600",
                value: "Unlimited scale"
              }
            ].map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg border bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${advantage.color}`}>
                    <advantage.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{advantage.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{advantage.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`text-xs ${advantage.color} border-current`}>
                        {advantage.benefit}
                      </Badge>
                      <div className="text-right">
                        <div className="text-lg font-bold">{advantage.value}</div>
                        <div className="text-xs text-muted-foreground">Value</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Vendor Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-gray-600" />
            Comprehensive Vendor Analysis Matrix
          </CardTitle>
          <CardDescription>
            Detailed comparison across all critical evaluation criteria with real-time data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Vendor</th>
                  <th className="text-center p-3 font-medium">Total Cost</th>
                  <th className="text-center p-3 font-medium">ROI %</th>
                  <th className="text-center p-3 font-medium">Deployment</th>
                  <th className="text-center p-3 font-medium">Security Score</th>
                  <th className="text-center p-3 font-medium">CVEs</th>
                  <th className="text-center p-3 font-medium">Automation</th>
                  <th className="text-center p-3 font-medium">Hardware</th>
                  <th className="text-center p-3 font-medium">Risk Level</th>
                  <th className="text-center p-3 font-medium">Overall Score</th>
                </tr>
              </thead>
              <tbody>
                {costComparisonData.map((vendor, index) => (
                  <tr key={vendor.vendorId} className={`border-b transition-colors hover:bg-muted/50 ${
                    vendor.isPortnox ? 'bg-green-50 dark:bg-green-950/20' : 
                    vendor.riskLevel === 'critical' ? 'bg-red-50 dark:bg-red-950/20' : ''
                  }`}>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={index === 0 ? "default" : "secondary"} className={index === 0 ? "bg-green-600" : ""}>
                          #{vendor.rank}
                        </Badge>
                        <div>
                          <span className="font-medium">{vendor.vendor}</span>
                          {vendor.isPortnox && (
                            <Badge className="bg-green-600 text-white ml-2">Best Choice</Badge>
                          )}
                          {vendor.riskLevel === 'critical' && (
                            <Badge variant="destructive" className="ml-2">Critical Risk</Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <div className="font-bold text-lg">{formatCurrencyShort(vendor.totalCost)}</div>
                      {vendor.savings > 0 && (
                        <div className="text-xs text-red-600">+{formatCurrencyShort(vendor.savings)}</div>
                      )}
                    </td>
                    <td className="text-center p-3">
                      <div className={`font-bold ${vendor.roi > 200 ? 'text-green-600' : vendor.roi > 100 ? 'text-blue-600' : 'text-orange-600'}`}>
                        {vendor.roi.toFixed(0)}%
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <div className="font-medium">{vendor.deploymentDays}d</div>
                      <div className="text-xs text-muted-foreground">
                        {vendor.deploymentDays <= 7 ? "Rapid" : vendor.deploymentDays <= 30 ? "Fast" : vendor.deploymentDays <= 90 ? "Standard" : "Slow"}
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <div className={`font-bold ${
                        vendor.securityScore >= 90 ? 'text-green-600' : 
                        vendor.securityScore >= 70 ? 'text-blue-600' : 
                        vendor.securityScore >= 50 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {vendor.securityScore}/100
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <div className={`font-bold ${
                        results.find(r => r.vendorId === vendor.vendorId)?.vendorData?.security?.cveCount === 0 
                          ? 'text-green-600' 
                          : results.find(r => r.vendorId === vendor.vendorId)?.vendorData?.security?.cveCount > 20
                            ? 'text-red-600'
                            : 'text-orange-600'
                      }`}>
                        {results.find(r => r.vendorId === vendor.vendorId)?.vendorData?.security?.cveCount || 0}
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <div className={`font-bold ${
                        vendor.automationLevel >= 80 ? 'text-green-600' : 
                        vendor.automationLevel >= 60 ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {vendor.automationLevel}%
                      </div>
                    </td>
                    <td className="text-center p-3">
                      {results.find(r => r.vendorId === vendor.vendorId)?.vendorData?.infrastructure?.hardwareRequired ? (
                        <AlertTriangle className="h-5 w-5 text-red-500 mx-auto" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      )}
                    </td>
                    <td className="text-center p-3">
                      <Badge variant={
                        vendor.riskLevel === 'low' ? 'default' :
                        vendor.riskLevel === 'medium' ? 'secondary' : 
                        vendor.riskLevel === 'high' ? 'outline' : 'destructive'
                      }>
                        {vendor.riskLevel}
                      </Badge>
                    </td>
                    <td className="text-center p-3">
                      <div className={`font-bold ${
                        vendor.overallScore >= 80 ? 'text-green-600' : 
                        vendor.overallScore >= 60 ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {vendor.overallScore.toFixed(0)}/100
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Executive Action Items */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-600" />
            Executive Action Items & Strategic Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-lg mb-4 text-blue-900 dark:text-blue-100">Immediate Actions (Next 30 Days)</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Approve Portnox CLEAR implementation</span>
                    <p className="text-sm text-muted-foreground">Executive decision and budget approval</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Schedule 30-minute deployment window</span>
                    <p className="text-sm text-muted-foreground">Coordinate with IT for minimal-impact deployment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Begin legacy NAC migration planning</span>
                    <p className="text-sm text-muted-foreground">Develop transition strategy and timeline</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Reallocate saved IT resources</span>
                    <p className="text-sm text-muted-foreground">{portnoxResult?.operational.fteSaved || 2.5} FTE to strategic initiatives</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4 text-blue-900 dark:text-blue-100">Strategic Benefits (90 Days)</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <ArrowUpRight className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Immediate competitive advantage</span>
                    <p className="text-sm text-muted-foreground">Superior security posture and operational efficiency</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowUpRight className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Enable digital transformation</span>
                    <p className="text-sm text-muted-foreground">Cloud-native architecture supports innovation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowUpRight className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Future-proof investment</span>
                    <p className="text-sm text-muted-foreground">Automatic updates and feature additions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowUpRight className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Eliminate vendor lock-in</span>
                    <p className="text-sm text-muted-foreground">Standards-based approach ensures flexibility</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Financial Summary */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
              <div className="text-2xl font-bold text-green-600">{formatCurrencyShort(executiveSummary.totalSavings)}</div>
              <div className="text-sm text-green-700 dark:text-green-300">Total Savings</div>
              <div className="text-xs text-muted-foreground mt-1">Over {config?.years || 3} years</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <div className="text-2xl font-bold text-blue-600">{executiveSummary.roi.toFixed(0)}%</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Return on Investment</div>
              <div className="text-xs text-muted-foreground mt-1">{executiveSummary.paybackMonths.toFixed(1)} month payback</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <div className="text-2xl font-bold text-purple-600">{formatCurrencyShort(portnoxResult?.roi.netPresentValue || 0)}</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Net Present Value</div>
              <div className="text-xs text-muted-foreground mt-1">Risk-adjusted value</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Executive Demo
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              See Portnox CLEAR in action with a personalized demonstration
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}