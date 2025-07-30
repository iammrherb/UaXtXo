"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Shield,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle2,
  Award,
  Target,
  Zap,
  Building2,
  BarChart3,
  Activity,
  Wifi,
  Cloud,
  Server,
  HardDrive,
  Gauge,
  Brain,
  Lock,
  Eye,
  RefreshCw,
  Download,
  Share2,
  Calendar,
  Info,
  Star,
  Briefcase,
  Globe,
  Layers,
  Database,
  Settings,
  Smartphone,
  Monitor,
  Cpu,
  Network,
  FileText,
  PieChart as PieChartIcon
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import numeral from "numeral"
import type { UltimateCalculationResult, CalculationConfiguration } from "@/lib/services/enhanced-calculation-service"

interface ExecutiveDashboardViewProps {
  results: UltimateCalculationResult[]
  config: CalculationConfiguration
}

export default function ExecutiveDashboardView({ results, config }: ExecutiveDashboardViewProps) {
  const portnoxResult = results.find(r => r.vendorId === 'portnox')
  const competitorResults = results.filter(r => r.vendorId !== 'portnox')

  // Executive Summary Metrics
  const executiveSummary = useMemo(() => {
    if (!portnoxResult || competitorResults.length === 0) return null

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const savingsPercentage = (totalSavings / avgCompetitorCost) * 100

    return {
      totalSavings,
      savingsPercentage,
      roi: portnoxResult.roi.percentage,
      paybackMonths: portnoxResult.roi.paybackMonths,
      breachReduction: portnoxResult.roi.breachReduction,
      deploymentSpeed: `${portnoxResult.vendorData.implementation.timeToDeployDays} day${portnoxResult.vendorData.implementation.timeToDeployDays > 1 ? 's' : ''}`,
      automationLevel: portnoxResult.operational.automationLevel,
      securityScore: portnoxResult.risk.securityScore,
      complianceScore: portnoxResult.risk.complianceScore,
      fteSaved: portnoxResult.operational.fteSaved,
      annualSavings: portnoxResult.roi.annualSavings
    }
  }, [portnoxResult, competitorResults])

  // Cost Comparison Data
  const costComparisonData = useMemo(() => {
    return results.map(result => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      totalCost: result.totalCost,
      licensing: result.breakdown.licensing,
      hardware: result.breakdown.hardware,
      implementation: result.breakdown.implementation,
      operational: result.breakdown.operational,
      support: result.breakdown.support,
      training: result.breakdown.training,
      maintenance: result.breakdown.maintenance,
      hidden: result.breakdown.hidden,
      perDevicePerMonth: result.perDevicePerMonth,
      isPortnox: result.vendorId === 'portnox',
      riskLevel: result.recommendations.riskLevel
    })).sort((a, b) => a.totalCost - b.totalCost)
  }, [results])

  // ROI Timeline Data
  const roiTimelineData = useMemo(() => {
    if (!portnoxResult || !executiveSummary) return []

    const data = []
    const monthlyBenefit = executiveSummary.annualSavings / 12

    for (let month = 0; month <= config.years * 12; month += 3) {
      const cumulativeBenefit = monthlyBenefit * month
      const netValue = cumulativeBenefit - portnoxResult.totalCost
      const roi = portnoxResult.totalCost > 0 ? (netValue / portnoxResult.totalCost) * 100 : 0

      data.push({
        quarter: `Q${Math.ceil((month + 1) / 3)}`,
        month,
        cumulativeBenefit,
        netValue,
        roi,
        breakeven: netValue >= 0
      })
    }

    return data
  }, [portnoxResult, executiveSummary, config.years])

  // Security Comparison Data
  const securityComparisonData = useMemo(() => {
    return results.map(result => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      securityScore: result.risk.securityScore,
      cveCount: result.vendorData.security.cveCount,
      criticalCves: result.vendorData.security.criticalCveCount,
      zeroTrustMaturity: result.vendorData.security.zeroTrustMaturity,
      complianceScore: result.risk.complianceScore,
      breachReduction: result.roi.breachReduction,
      isPortnox: result.vendorId === 'portnox'
    })).sort((a, b) => b.securityScore - a.securityScore)
  }, [results])

  // Implementation Comparison
  const implementationData = useMemo(() => {
    return results.map(result => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      deploymentDays: result.vendorData.implementation.timeToDeployDays,
      complexity: result.vendorData.implementation.complexity,
      requiredFTE: result.vendorData.implementation.resourcesRequired.technical + 
                   result.vendorData.implementation.resourcesRequired.administrative,
      trainingHours: result.vendorData.implementation.trainingHours,
      automationLevel: result.operational.automationLevel,
      professionalServicesRequired: result.vendorData.implementation.professionalServicesRequired,
      isPortnox: result.vendorId === 'portnox'
    })).sort((a, b) => a.deploymentDays - b.deploymentDays)
  }, [results])

  // Business Impact Metrics
  const businessImpactData = useMemo(() => {
    return results.map(result => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      digitalTransformation: result.businessImpact.digitalTransformation,
      operationalExcellence: result.businessImpact.operationalExcellence,
      riskMitigation: result.businessImpact.riskMitigation,
      complianceAutomation: result.businessImpact.complianceAutomation,
      productivityGains: result.businessImpact.productivityGains,
      strategicValue: result.businessImpact.strategicValue,
      overallScore: result.recommendations.overallScore,
      isPortnox: result.vendorId === 'portnox'
    })).sort((a, b) => b.overallScore - a.overallScore)
  }, [results])

  // Feature Comparison Matrix
  const featureComparisonData = useMemo(() => {
    const features = [
      { key: 'deviceDiscovery', name: 'Device Discovery', category: 'core' },
      { key: 'policyEnforcement', name: 'Policy Enforcement', category: 'core' },
      { key: 'certificateManagement', name: 'Certificate Management', category: 'core' },
      { key: 'aiDriven', name: 'AI-Driven Analytics', category: 'advanced' },
      { key: 'zeroTrust', name: 'Zero Trust Architecture', category: 'advanced' },
      { key: 'iotProfiling', name: 'IoT Profiling', category: 'advanced' },
      { key: 'automatedCompliance', name: 'Automated Compliance', category: 'compliance' },
      { key: 'cloudConnectors', name: 'Cloud Connectors', category: 'integrations' }
    ]

    return features.map(feature => {
      const featureData: any = { feature: feature.name, category: feature.category }
      
      results.forEach(result => {
        const vendor = result.vendorData
        let hasFeature = false
        
        if (feature.category === 'core') {
          hasFeature = vendor.features.core[feature.key as keyof typeof vendor.features.core] || false
        } else if (feature.category === 'advanced') {
          hasFeature = vendor.features.advanced[feature.key as keyof typeof vendor.features.advanced] || false
        } else if (feature.category === 'compliance') {
          hasFeature = vendor.features.compliance[feature.key as keyof typeof vendor.features.compliance] || false
        } else if (feature.category === 'integrations') {
          hasFeature = vendor.features.integrations[feature.key as keyof typeof vendor.features.integrations] || false
        }
        
        featureData[result.vendorName] = hasFeature
      })
      
      return featureData
    })
  }, [results])

  // Vendor Risk Assessment
  const riskAssessmentData = useMemo(() => {
    return results.map(result => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      overallRisk: result.recommendations.riskLevel,
      securityRisk: result.risk.vendorRisk,
      operationalRisk: result.risk.operationalRisk,
      financialRisk: result.risk.financialRisk,
      migrationPriority: result.recommendations.migrationPriority,
      overallScore: result.recommendations.overallScore,
      isPortnox: result.vendorId === 'portnox'
    }))
  }, [results])

  const formatCurrency = (value: number) => numeral(value).format('$0,0')
  const formatCurrencyShort = (value: number) => numeral(value).format('$0.0a')
  const formatPercent = (value: number) => `${value.toFixed(1)}%`

  const getVendorColor = (vendorId: string) => {
    const colors = {
      portnox: '#10B981',
      cisco_ise: '#3B82F6',
      aruba_clearpass: '#8B5CF6',
      forescout: '#F59E0B',
      fortinet_fortinac: '#EF4444',
      microsoft_nps: '#6B7280',
      securew2: '#06B6D4',
      foxpass: '#84CC16'
    }
    return colors[vendorId as keyof typeof colors] || '#6B7280'
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return '#10B981'
      case 'medium': return '#F59E0B'
      case 'high': return '#EF4444'
      case 'critical': return '#DC2626'
      default: return '#6B7280'
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl">
          <h4 className="font-semibold mb-2">{label}</h4>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm">
                  {entry.name}: {
                    typeof entry.value === 'number' && entry.value > 1000 
                      ? formatCurrency(entry.value)
                      : entry.value
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-8 text-center">
          <CardContent>
            <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Analysis Data</h3>
            <p className="text-muted-foreground">
              Please select vendors and configure your analysis parameters to view the executive dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Executive Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Executive Investment Analysis
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Comprehensive TCO and ROI analysis for {config.devices.toLocaleString()} devices over {config.years} years
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share Analysis
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Demo
            </Button>
          </div>
        </div>

        {executiveSummary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Total Savings</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                    {formatCurrencyShort(executiveSummary.totalSavings)}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {formatPercent(executiveSummary.savingsPercentage)} vs competitors
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <TrendingDown className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">ROI</p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                    {formatPercent(executiveSummary.roi)}
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {executiveSummary.paybackMonths.toFixed(1)} month payback
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-purple-200 dark:border-purple-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Security Improvement</p>
                  <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                    {formatPercent(executiveSummary.breachReduction)}
                  </p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    Risk reduction vs baseline
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-orange-200 dark:border-orange-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Deployment Speed</p>
                  <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                    {executiveSummary.deploymentSpeed}
                  </p>
                  <p className="text-sm text-orange-600 dark:text-orange-400">
                    vs 90-180 days traditional
                  </p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Critical Vendor Alerts */}
      <AnimatePresence>
        {results.some(r => r.recommendations.riskLevel === 'critical') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle className="text-red-900 dark:text-red-100 text-lg">
                CRITICAL SECURITY ALERT
              </AlertTitle>
              <AlertDescription className="text-red-800 dark:text-red-200 mt-2">
                <div className="space-y-2">
                  {results
                    .filter(r => r.recommendations.riskLevel === 'critical')
                    .map(r => (
                      <div key={r.vendorId} className="p-3 bg-red-100 dark:bg-red-900/30 rounded-md">
                        <p className="font-semibold">{r.vendorName}</p>
                        <p className="text-sm">{r.recommendations.recommendation}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="destructive">
                            {r.vendorData.security.cveCount} CVEs
                          </Badge>
                          <Badge variant="destructive">
                            {r.vendorData.security.criticalCveCount} Critical
                          </Badge>
                          <Badge variant="destructive">
                            Immediate Migration Required
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Total Cost Comparison */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  Total Cost of Ownership Comparison
                </CardTitle>
                <CardDescription>
                  {config.years}-year TCO analysis including all cost factors
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Cost Range</div>
                <div className="text-lg font-semibold">
                  {formatCurrencyShort(Math.min(...costComparisonData.map(d => d.totalCost)))} - {formatCurrencyShort(Math.max(...costComparisonData.map(d => d.totalCost)))}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={costComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="vendor" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tickFormatter={formatCurrencyShort}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  
                  <Bar dataKey="licensing" stackId="a" fill="#3B82F6" name="Licensing" />
                  <Bar dataKey="hardware" stackId="a" fill="#10B981" name="Hardware" />
                  <Bar dataKey="implementation" stackId="a" fill="#F59E0B" name="Implementation" />
                  <Bar dataKey="operational" stackId="a" fill="#EF4444" name="Operational" />
                  <Bar dataKey="support" stackId="a" fill="#8B5CF6" name="Support" />
                  <Bar dataKey="training" stackId="a" fill="#06B6D4" name="Training" />
                  <Bar dataKey="maintenance" stackId="a" fill="#84CC16" name="Maintenance" />
                  <Bar dataKey="hidden" stackId="a" fill="#F97316" name="Hidden Costs" />
                  
                  <Line
                    type="monotone"
                    dataKey="perDevicePerMonth"
                    stroke="#DC2626"
                    strokeWidth={3}
                    name="Per Device/Month ($)"
                    yAxisId="right"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* ROI Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              ROI Development Timeline
            </CardTitle>
            <CardDescription>
              Portnox CLEAR return on investment over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={roiTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="quarter" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={formatPercent} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value: number) => formatPercent(value)}
                    labelFormatter={(label) => `Quarter: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="roi"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {executiveSummary && (
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-2 bg-green-50 dark:bg-green-950/20 rounded">
                  <div className="font-semibold text-green-700 dark:text-green-300">Break-even</div>
                  <div className="text-lg font-bold text-green-800 dark:text-green-200">
                    {executiveSummary.paybackMonths.toFixed(1)}m
                  </div>
                </div>
                <div className="text-center p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                  <div className="font-semibold text-blue-700 dark:text-blue-300">Final ROI</div>
                  <div className="text-lg font-bold text-blue-800 dark:text-blue-200">
                    {formatPercent(executiveSummary.roi)}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Posture Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Shield className="h-6 w-6 text-red-600" />
              Security Posture Analysis
            </CardTitle>
            <CardDescription>
              Comprehensive security assessment across vendors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={securityComparisonData.slice(0, 4)}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="vendor" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fontSize: 8 }}
                  />
                  <Tooltip />
                  <Radar
                    name="Security Score"
                    dataKey="securityScore"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Zero Trust Maturity"
                    dataKey="zeroTrustMaturity"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {securityComparisonData.slice(0, 3).map((vendor, index) => (
                <div key={vendor.vendorId} className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      #{index + 1}
                    </Badge>
                    <span className="font-medium text-sm">{vendor.vendor}</span>
                    {vendor.isPortnox && (
                      <Badge className="bg-green-600">Best</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">{vendor.securityScore}/100</span>
                    <span className={`font-bold ${vendor.cveCount === 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {vendor.cveCount} CVEs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Implementation & Operational Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Clock className="h-6 w-6 text-orange-600" />
              Implementation Timeline
            </CardTitle>
            <CardDescription>
              Deployment speed and resource requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={implementationData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="vendor" type="category" width={100} tick={{ fontSize: 10 }} />
                  <Tooltip 
                    formatter={(value: number) => `${value} days`}
                  />
                  <Bar 
                    dataKey="deploymentDays" 
                    fill="#F59E0B" 
                    name="Deployment Days"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {implementationData.slice(0, 3).map((vendor, index) => (
                <div key={vendor.vendorId} className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      #{index + 1}
                    </Badge>
                    <span className="font-medium text-sm">{vendor.vendor}</span>
                    {vendor.isPortnox && (
                      <Badge className="bg-green-600">Fastest</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">{vendor.deploymentDays}d</span>
                    <Badge variant="outline" className="text-xs">
                      {vendor.complexity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Gauge className="h-6 w-6 text-purple-600" />
              Operational Efficiency
            </CardTitle>
            <CardDescription>
              Automation levels and operational savings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.slice(0, 4).map((result, index) => (
                <motion.div
                  key={result.vendorId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 ${
                    result.vendorId === 'portnox' 
                      ? 'border-green-300 bg-green-50 dark:bg-green-950/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={index === 0 ? "default" : "secondary"}>
                        #{index + 1}
                      </Badge>
                      <span className="font-medium">{result.vendorName}</span>
                      {result.vendorId === 'portnox' && (
                        <Badge className="bg-green-600">Most Efficient</Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{result.operational.automationLevel}%</div>
                      <div className="text-xs text-muted-foreground">Automation</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Automation Level</span>
                      <span className="font-medium">{result.operational.automationLevel}%</span>
                    </div>
                    <Progress value={result.operational.automationLevel} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                      <div>
                        <span className="text-muted-foreground">FTE Saved:</span>
                        <span className="ml-2 font-medium">{result.operational.fteSaved.toFixed(1)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">MTTR:</span>
                        <span className="ml-2 font-medium">{result.operational.mttr}h</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Impact Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-indigo-600" />
            Strategic Business Impact Assessment
          </CardTitle>
          <CardDescription>
            Comprehensive evaluation of business value and strategic alignment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={businessImpactData.slice(0, 4)}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="vendor" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fontSize: 8 }}
                  />
                  <Tooltip />
                  <Legend />
                  
                  {businessImpactData.slice(0, 4).map((vendor, index) => (
                    <Radar
                      key={vendor.vendorId}
                      name={vendor.vendor}
                      dataKey="strategicValue"
                      stroke={getVendorColor(vendor.vendorId)}
                      fill={getVendorColor(vendor.vendorId)}
                      fillOpacity={vendor.isPortnox ? 0.3 : 0.1}
                      strokeWidth={vendor.isPortnox ? 3 : 2}
                    />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Business Value Drivers</h4>
              {businessImpactData.slice(0, 3).map((vendor, index) => (
                <motion.div
                  key={vendor.vendorId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${
                    vendor.isPortnox 
                      ? 'border-green-200 bg-green-50 dark:bg-green-950/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={index === 0 ? "default" : "secondary"}>
                        #{index + 1}
                      </Badge>
                      <span className="font-medium">{vendor.vendor}</span>
                      {vendor.isPortnox && (
                        <Badge className="bg-green-600">Strategic Leader</Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{vendor.overallScore.toFixed(0)}/100</div>
                      <div className="text-xs text-muted-foreground">Overall Score</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Digital Transform:</span>
                      <span className="ml-2 font-medium">{vendor.digitalTransformation.toFixed(0)}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Risk Mitigation:</span>
                      <span className="ml-2 font-medium">{vendor.riskMitigation.toFixed(0)}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Operational Excel:</span>
                      <span className="ml-2 font-medium">{vendor.operationalExcellence.toFixed(0)}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Compliance Auto:</span>
                      <span className="ml-2 font-medium">{vendor.complianceAutomation.toFixed(0)}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Comparison Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Layers className="h-6 w-6 text-cyan-600" />
            Comprehensive Feature Comparison
          </CardTitle>
          <CardDescription>
            Detailed feature support across all vendors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Feature</th>
                  {results.map(result => (
                    <th key={result.vendorId} className="text-center p-3 font-medium min-w-32">
                      {result.vendorName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureComparisonData.map((feature, index) => (
                  <tr key={feature.feature} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                    <td className="p-3 font-medium">{feature.feature}</td>
                    {results.map(result => (
                      <td key={result.vendorId} className="text-center p-3">
                        {feature[result.vendorName] ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <div className="h-5 w-5 rounded-full bg-gray-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            Vendor Risk Assessment
          </CardTitle>
          <CardDescription>
            Comprehensive risk analysis across security, operational, and financial dimensions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {riskAssessmentData.map((vendor, index) => (
              <motion.div
                key={vendor.vendorId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 ${
                  vendor.overallRisk === 'critical' 
                    ? 'border-red-300 bg-red-50 dark:bg-red-950/20'
                    : vendor.overallRisk === 'high'
                      ? 'border-orange-300 bg-orange-50 dark:bg-orange-950/20'
                      : vendor.overallRisk === 'low'
                        ? 'border-green-300 bg-green-50 dark:bg-green-950/20'
                        : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">{vendor.vendor}</span>
                    <Badge 
                      style={{ 
                        backgroundColor: getRiskColor(vendor.overallRisk),
                        color: 'white'
                      }}
                    >
                      {vendor.overallRisk.toUpperCase()} RISK
                    </Badge>
                    <Badge variant="outline">
                      Score: {vendor.overallScore.toFixed(0)}/100
                    </Badge>
                  </div>
                  <Badge 
                    variant={
                      vendor.migrationPriority === 'immediate' ? 'destructive' :
                      vendor.migrationPriority === 'high' ? 'secondary' : 'outline'
                    }
                  >
                    {vendor.migrationPriority} priority
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Security Risk:</span>
                    <div className="mt-1">
                      <Progress value={100 - vendor.securityRisk} className="h-2" />
                      <span className="text-xs font-medium">{(100 - vendor.securityRisk).toFixed(0)}% secure</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Operational Risk:</span>
                    <div className="mt-1">
                      <Progress value={100 - vendor.operationalRisk} className="h-2" />
                      <span className="text-xs font-medium">{(100 - vendor.operationalRisk).toFixed(0)}% stable</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Financial Risk:</span>
                    <div className="mt-1">
                      <Progress value={100 - vendor.financialRisk} className="h-2" />
                      <span className="text-xs font-medium">{(100 - vendor.financialRisk).toFixed(0)}% stable</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Executive Recommendation */}
      {portnoxResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-3">
                Strategic Recommendation: Portnox CLEAR
              </h3>
              <p className="text-green-800 dark:text-green-200 text-lg mb-4">
                Based on comprehensive financial, security, and operational analysis, Portnox CLEAR delivers 
                exceptional value with <strong>{formatPercent(portnoxResult.roi.percentage)} ROI</strong>, 
                <strong> {formatCurrencyShort(executiveSummary?.totalSavings || 0)} savings</strong>, and 
                <strong> {portnoxResult.roi.paybackMonths.toFixed(1)}-month payback</strong> while providing 
                industry-leading security and operational efficiency.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-green-700 dark:text-green-300">
                    Zero infrastructure investment required
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-green-700 dark:text-green-300">
                    Perfect security record (0 CVEs)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-green-700 dark:text-green-300">
                    Fastest deployment in market
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-green-700 dark:text-green-300">
                    All features included - no add-ons
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-green-700 dark:text-green-300">
                    98% automation reduces overhead
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-green-700 dark:text-green-300">
                    Comprehensive compliance automation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}