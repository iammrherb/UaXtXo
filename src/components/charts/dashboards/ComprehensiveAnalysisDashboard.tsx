"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useDashboardSettings } from "@/context/DashboardContext"
import { useVendorData } from "@/hooks/useVendorData"
import { useTcoCalculator } from "@/hooks/useTcoCalculator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import {
  DollarSign,
  TrendingUp,
  Shield,
  Clock,
  Users,
  CheckCircle,
  BarChart3,
  Award,
  Target,
  Zap,
  Building,
} from "lucide-react"

const COLORS = {
  portnox: "#00D4AA",
  cisco: "#1BA1E2",
  aruba: "#FF6900",
  fortinet: "#EE3124",
  forescout: "#00A651",
  juniper: "#84BD00",
  extreme: "#009639",
  meraki: "#58C4DC",
  microsoft: "#00BCF2",
  packetfence: "#2E8B57",
  foxpass: "#FF6B35",
  securew2: "#4A90E2",
  arista: "#F39C12",
}

const CHART_COLORS = ["#00D4AA", "#1BA1E2", "#FF6900", "#EE3124", "#00A651", "#84BD00", "#009639", "#58C4DC"]

interface ComprehensiveAnalysisDashboardProps {
  selectedVendors?: string[]
}

const ComprehensiveAnalysisDashboard: React.FC<ComprehensiveAnalysisDashboardProps> = ({
  selectedVendors = ["portnox", "cisco_ise", "aruba_clearpass", "fortinac", "forescout"]
}) => {
  const { selectedOrgSize, selectedIndustry, comparisonYears } = useDashboardSettings()
  const { getAllVendorIds, getVendor, isLoadingAllVendors } = useVendorData()
  const { calculateAllSelectedVendorsTco } = useTcoCalculator()
  
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedMetric, setSelectedMetric] = useState("totalTCO")

  // Calculate TCO results for selected vendors
  const tcoResults = useMemo(() => {
    if (isLoadingAllVendors) return []
    
    return calculateAllSelectedVendorsTco({
      vendorIds: selectedVendors,
      orgSizeId: selectedOrgSize,
      industryId: selectedIndustry,
      projectionYears: comparisonYears,
    })
  }, [selectedVendors, selectedOrgSize, selectedIndustry, comparisonYears, calculateAllSelectedVendorsTco, isLoadingAllVendors])

  // Prepare chart data
  const chartData = useMemo(() => {
    return tcoResults.map((result, index) => ({
      name: result.vendorName,
      totalTCO: result.totalTCO,
      software: result.breakdown.software,
      hardware: result.breakdown.hardware,
      implementation: result.breakdown.implementation,
      operational: result.breakdown.operational,
      support: result.breakdown.support,
      hidden: result.breakdown.hidden,
      paybackMonths: result.roiMetrics.paybackPeriodMonths,
      riskReduction: result.riskReduction.breachProbabilityReduction,
      complianceScore: result.complianceMetrics.coverageScore,
      fteReduction: result.operationalMetrics.fteReduction,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }))
  }, [tcoResults])

  // Industry risk analysis data
  const industryRiskData = useMemo(() => {
    const riskFactors = {
      healthcare: { risk: 95, compliance: 90, cost: 85 },
      financial_services: { risk: 98, compliance: 95, cost: 88 },
      manufacturing: { risk: 78, compliance: 70, cost: 75 },
      retail: { risk: 72, compliance: 65, cost: 70 },
      technology: { risk: 80, compliance: 75, cost: 78 },
      education: { risk: 65, compliance: 60, cost: 62 },
      government: { risk: 100, compliance: 98, cost: 92 },
      energy_utilities: { risk: 96, compliance: 88, cost: 90 },
    }
    
    return Object.entries(riskFactors).map(([industry, factors]) => ({
      industry: industry.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      ...factors,
      isSelected: industry === selectedIndustry,
    }))
  }, [selectedIndustry])

  // Compliance framework coverage
  const complianceData = useMemo(() => {
    const frameworks = ['HIPAA', 'PCI-DSS', 'GDPR', 'SOX', 'ISO27001', 'NIST', 'FedRAMP']
    
    return frameworks.map(framework => {
      const portnoxVendor = getVendor("portnox")
      const portnoxCoverage = portnoxVendor?.complianceSupport.find(c => 
        c.standardId.toLowerCase().replace(/[_-]/g, '').includes(framework.toLowerCase().replace(/[_-]/g, ''))
      )?.coveragePercent || 0
      
      const avgCompetitorCoverage = tcoResults
        .filter(r => r.vendorId !== "portnox")
        .reduce((sum, result) => {
          const vendor = getVendor(result.vendorId)
          const coverage = vendor?.complianceSupport.find(c => 
            c.standardId.toLowerCase().replace(/[_-]/g, '').includes(framework.toLowerCase().replace(/[_-]/g, ''))
          )?.coveragePercent || 0
          return sum + coverage
        }, 0) / Math.max(1, tcoResults.filter(r => r.vendorId !== "portnox").length)
      
      return {
        framework,
        portnox: portnoxCoverage,
        competitors: avgCompetitorCoverage,
        gap: portnoxCoverage - avgCompetitorCoverage,
      }
    })
  }, [tcoResults, getVendor])

  // FTE and operational analysis
  const operationalData = useMemo(() => {
    return tcoResults.map(result => ({
      vendor: result.vendorName,
      fteRequired: 2.5 - result.operationalMetrics.fteReduction, // Baseline 2.5 FTE
      efficiencyGain: result.operationalMetrics.efficiencyGains,
      maintenanceReduction: result.operationalMetrics.maintenanceReduction,
      deploymentDays: getVendor(result.vendorId)?.implementation.averageDeploymentTimeDays || 0,
    }))
  }, [tcoResults, getVendor])

  // Risk vs Cost scatter plot data
  const riskCostData = useMemo(() => {
    return tcoResults.map(result => ({
      x: result.totalTCO / 1000, // TCO in thousands
      y: result.riskReduction.breachProbabilityReduction,
      z: result.complianceMetrics.coverageScore,
      name: result.vendorName,
      vendorId: result.vendorId,
    }))
  }, [tcoResults])

  if (isLoadingAllVendors) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading comprehensive analysis...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                Total Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                ${((chartData[1]?.totalTCO || 0) - (chartData[0]?.totalTCO || 0)).toLocaleString()}
              </div>
              <p className="text-sm text-emerald-300">vs. Traditional NAC</p>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-emerald-400">
                  {chartData[1] && chartData[0] ? 
                    Math.round(((chartData[1].totalTCO - chartData[0].totalTCO) / chartData[1].totalTCO) * 100) : 0}% reduction
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-400" />
                Risk Reduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {chartData[0]?.riskReduction || 0}%
              </div>
              <p className="text-sm text-blue-300">Breach probability reduction</p>
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-400">Industry leading</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-400" />
                Deployment Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {operationalData[0]?.deploymentDays || 0} days
              </div>
              <p className="text-sm text-purple-300">vs. 120+ days traditional</p>
              <div className="flex items-center gap-2 mt-2">
                <Zap className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-purple-400">95% faster</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-400/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-400" />
                FTE Reduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {(operationalData[0]?.fteRequired || 0).toFixed(1)} FTE
              </div>
              <p className="text-sm text-orange-300">vs. 2.5 FTE traditional</p>
              <div className="flex items-center gap-2 mt-2">
                <Target className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-orange-400">
                  {Math.round(((2.5 - (operationalData[0]?.fteRequired || 0)) / 2.5) * 100)}% reduction
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tco-analysis" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            TCO Analysis
          </TabsTrigger>
          <TabsTrigger value="risk-compliance" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Risk & Compliance
          </TabsTrigger>
          <TabsTrigger value="operational" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Operational
          </TabsTrigger>
          <TabsTrigger value="industry" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Industry Analysis
          </TabsTrigger>
          <TabsTrigger value="executive" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Executive Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* TCO Comparison Chart */}
          <Card className="bg-slate-800/30 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Total Cost of Ownership Comparison</CardTitle>
              <CardDescription className="text-slate-400">
                {comparisonYears}-year TCO analysis across selected vendors
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    \
