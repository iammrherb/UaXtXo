"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  ComposedChart
} from "recharts"
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Info, Calculator, PieChartIcon, BarChart3, Activity, Target, Clock, Shield, Zap } from 'lucide-react'
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface DetailedCostsViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

// Color palette for charts
const CHART_COLORS = [
  '#3B82F6', // Blue
  '#EF4444', // Red  
  '#10B981', // Green
  '#F59E0B', // Amber
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#84CC16'  // Lime
]

// Cost category colors
const COST_COLORS = {
  licensing: '#3B82F6',
  hardware: '#EF4444', 
  services: '#10B981',
  training: '#F59E0B',
  maintenance: '#8B5CF6',
  operational: '#06B6D4'
}

export default function DetailedCostsView({ results, config }: DetailedCostsViewProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null)

  // Input validation and error handling
  const validationErrors = useMemo(() => {
    const errors: string[] = []
    
    if (!results || !Array.isArray(results)) {
      errors.push("Invalid results data provided")
    }
    
    if (!config) {
      errors.push("Configuration is required")
    }
    
    if (results && results.length === 0) {
      errors.push("No vendor data available for analysis")
    }
    
    if (config) {
      if (!config.devices || config.devices <= 0) {
        errors.push("Device count must be greater than 0")
      }
      
      if (!config.users || config.users <= 0) {
        errors.push("User count must be greater than 0") 
      }
      
      if (!config.years || config.years <= 0 || config.years > 10) {
        errors.push("Analysis period must be between 1-10 years")
      }
      
      if (!config.industry) {
        errors.push("Industry selection is required")
      }
    }
    
    return errors
  }, [results, config])

  // Sanitize and validate results data
  const sanitizedResults = useMemo(() => {
    if (!results || !Array.isArray(results)) return []
    
    return results.filter(result => {
      if (!result || typeof result !== 'object') return false
      if (!result.vendorId || !result.vendorName) return false
      if (typeof result.totalCost !== 'number' || !isFinite(result.totalCost)) return false
      if (!result.costBreakdown || typeof result.costBreakdown !== 'object') return false
      
      // Validate cost breakdown
      const breakdown = result.costBreakdown
      const requiredFields = ['licensing', 'hardware', 'services', 'training', 'maintenance', 'operational']
      
      for (const field of requiredFields) {
        if (typeof breakdown[field] !== 'number' || !isFinite(breakdown[field])) {
          console.warn(`Invalid ${field} cost for vendor ${result.vendorId}`)
          breakdown[field] = 0
        }
      }
      
      // Validate financial metrics
      if (result.financialMetrics) {
        const metrics = result.financialMetrics
        Object.keys(metrics).forEach(key => {
          if (typeof metrics[key] !== 'number' || !isFinite(metrics[key])) {
            console.warn(`Invalid ${key} metric for vendor ${result.vendorId}`)
            metrics[key] = 0
          }
        })
      }
      
      return true
    }).map(result => ({
      ...result,
      totalCost: Math.max(0, result.totalCost),
      costBreakdown: {
        ...result.costBreakdown,
        licensing: Math.max(0, result.costBreakdown.licensing),
        hardware: Math.max(0, result.costBreakdown.hardware),
        services: Math.max(0, result.costBreakdown.services),
        training: Math.max(0, result.costBreakdown.training),
        maintenance: Math.max(0, result.costBreakdown.maintenance),
        operational: Math.max(0, result.costBreakdown.operational)
      }
    }))
  }, [results])

  // Calculate summary metrics with error handling
  const summaryMetrics = useMemo(() => {
    if (sanitizedResults.length === 0) {
      return {
        lowestCost: null,
        highestCost: null,
        averageCost: 0,
        totalSavings: 0,
        bestROI: null,
        lowestRisk: null
      }
    }

    try {
      const costs = sanitizedResults.map(r => r.totalCost).filter(cost => isFinite(cost))
      const validResults = sanitizedResults.filter(r => isFinite(r.totalCost))
      
      if (costs.length === 0 || validResults.length === 0) {
        return {
          lowestCost: null,
          highestCost: null,
          averageCost: 0,
          totalSavings: 0,
          bestROI: null,
          lowestRisk: null
        }
      }

      const lowestCost = validResults.reduce((min, current) => 
        current.totalCost < min.totalCost ? current : min
      )
      
      const highestCost = validResults.reduce((max, current) => 
        current.totalCost > max.totalCost ? current : max
      )
      
      const averageCost = costs.reduce((sum, cost) => sum + cost, 0) / costs.length
      
      const totalSavings = highestCost.totalCost - lowestCost.totalCost
      
      const bestROI = validResults
        .filter(r => r.financialMetrics && isFinite(r.financialMetrics.roi))
        .reduce((best, current) => 
          !best || (current.financialMetrics.roi > best.financialMetrics.roi) ? current : best
        , null)
      
      const lowestRisk = validResults
        .filter(r => r.riskAssessment && isFinite(r.riskAssessment.overallRisk))
        .reduce((lowest, current) => 
          !lowest || (current.riskAssessment.overallRisk < lowest.riskAssessment.overallRisk) ? current : lowest
        , null)

      return {
        lowestCost,
        highestCost,
        averageCost,
        totalSavings,
        bestROI,
        lowestRisk
      }
    } catch (error) {
      console.error("Error calculating summary metrics:", error)
      return {
        lowestCost: null,
        highestCost: null,
        averageCost: 0,
        totalSavings: 0,
        bestROI: null,
        lowestRisk: null
      }
    }
  }, [sanitizedResults])

  // Prepare chart data with validation
  const chartData = useMemo(() => {
    if (sanitizedResults.length === 0) return []
    
    return sanitizedResults.map((result, index) => ({
      name: result.vendorName || `Vendor ${index + 1}`,
      vendorId: result.vendorId,
      totalCost: Math.round(result.totalCost),
      licensing: Math.round(result.costBreakdown.licensing),
      hardware: Math.round(result.costBreakdown.hardware),
      services: Math.round(result.costBreakdown.services),
      training: Math.round(result.costBreakdown.training),
      maintenance: Math.round(result.costBreakdown.maintenance),
      operational: Math.round(result.costBreakdown.operational),
      roi: result.financialMetrics?.roi || 0,
      payback: result.financialMetrics?.paybackPeriod || 0,
      npv: result.financialMetrics?.npv || 0,
      risk: result.riskAssessment?.overallRisk || 0,
      fill: CHART_COLORS[index % CHART_COLORS.length]
    }))
  }, [sanitizedResults])

  // Prepare breakdown data for pie charts
  const breakdownData = useMemo(() => {
    if (!selectedVendor) return []
    
    const vendor = sanitizedResults.find(r => r.vendorId === selectedVendor)
    if (!vendor) return []
    
    const breakdown = vendor.costBreakdown
    return [
      { name: 'Licensing', value: breakdown.licensing, color: COST_COLORS.licensing },
      { name: 'Hardware', value: breakdown.hardware, color: COST_COLORS.hardware },
      { name: 'Services', value: breakdown.services, color: COST_COLORS.services },
      { name: 'Training', value: breakdown.training, color: COST_COLORS.training },
      { name: 'Maintenance', value: breakdown.maintenance, color: COST_COLORS.maintenance },
      { name: 'Operational', value: breakdown.operational, color: COST_COLORS.operational }
    ].filter(item => item.value > 0)
  }, [selectedVendor, sanitizedResults])

  // Timeline data for multi-year analysis
  const timelineData = useMemo(() => {
    if (!config.years || sanitizedResults.length === 0) return []
    
    const years = Array.from({ length: config.years }, (_, i) => i + 1)
    
    return years.map(year => {
      const yearData: any = { year: `Year ${year}` }
      
      sanitizedResults.forEach(result => {
        // More realistic year-over-year cost modeling
        let yearCost = 0
        
        if (year === 1) {
          // Year 1: All upfront costs plus first year operational
          yearCost = result.costBreakdown.licensing / config.years +
                    result.costBreakdown.hardware +
                    result.costBreakdown.services +
                    result.costBreakdown.training +
                    result.costBreakdown.maintenance / config.years +
                    result.costBreakdown.operational / config.years
        } else {
          // Subsequent years: Only recurring costs
          yearCost = result.costBreakdown.licensing / config.years +
                    result.costBreakdown.maintenance / config.years +
                    result.costBreakdown.operational / config.years
        }
        
        yearData[result.vendorName] = Math.round(yearCost)
      })
      
      return yearData
    })
  }, [config.years, sanitizedResults])

  // Format currency with error handling
  const formatCurrency = (value: number): string => {
    if (!isFinite(value) || isNaN(value)) return "$0"
    
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Math.abs(value))
    } catch (error) {
      return `$${Math.abs(value).toLocaleString()}`
    }
  }

  // Format percentage with error handling
  const formatPercentage = (value: number): string => {
    if (!isFinite(value) || isNaN(value)) return "0%"
    return `${Math.round(value * 100) / 100}%`
  }

  // Custom tooltip component with error handling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null
    
    try {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 dark:text-gray-100">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    } catch (error) {
      return null
    }
  }

  // Show validation errors if any
  if (validationErrors.length > 0) {
    return (
      <div className="space-y-4">
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-medium text-red-800">Configuration Errors:</p>
              <ul className="list-disc list-inside space-y-1 text-red-700">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Invalid Configuration
            </CardTitle>
            <CardDescription>
              Please correct the configuration errors above to view the detailed cost analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <Calculator className="h-16 w-16 mx-auto" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Cost analysis will be available once configuration is corrected.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show empty state if no valid results
  if (sanitizedResults.length === 0) {
    return (
      <div className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            No vendor data available for analysis. Please select at least one vendor to compare.
          </AlertDescription>
        </Alert>
        
        <Card>
          <CardHeader>
            <CardTitle>No Data Available</CardTitle>
            <CardDescription>
              Select vendors from the sidebar to begin your cost analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <BarChart3 className="h-16 w-16 mx-auto" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Choose vendors to see detailed cost comparisons and analysis.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Detailed Cost Analysis</h2>
          <p className="text-muted-foreground">
            Comprehensive TCO breakdown for {sanitizedResults.length} vendor{sanitizedResults.length !== 1 ? 's' : ''} over {config.years} year{config.years !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{config.devices?.toLocaleString() || 0} devices</Badge>
          <Badge variant="outline">{config.industry || 'Unknown'} industry</Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Lowest Cost Solution</p>
                <p className="text-2xl font-bold text-green-600">
                  {summaryMetrics.lowestCost ? formatCurrency(summaryMetrics.lowestCost.totalCost) : 'N/A'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {summaryMetrics.lowestCost?.vendorName || 'No data'}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Potential Savings</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(summaryMetrics.totalSavings)}
                </p>
                <p className="text-sm text-muted-foreground">
                  vs highest cost option
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Best ROI</p>
                <p className="text-2xl font-bold text-purple-600">
                  {summaryMetrics.bestROI ? formatPercentage(summaryMetrics.bestROI.financialMetrics.roi) : 'N/A'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {summaryMetrics.bestROI?.vendorName || 'No data'}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Lowest Risk</p>
                <p className="text-2xl font-bold text-orange-600">
                  {summaryMetrics.lowestRisk ? `${Math.round(summaryMetrics.lowestRisk.riskAssessment.overallRisk)}%` : 'N/A'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {summaryMetrics.lowestRisk?.vendorName || 'No data'}
                </p>
              </div>
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="breakdown" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            Breakdown
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="roi" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            ROI Analysis
          </TabsTrigger>
          <TabsTrigger value="detailed" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Detailed View
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Cost Comparison</CardTitle>
              <CardDescription>
                Complete {config.years}-year TCO analysis across all selected vendors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      interval={0}
                    />
                    <YAxis 
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar 
                      dataKey="totalCost" 
                      name="Total Cost"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Distribution</CardTitle>
                <CardDescription>
                  Average cost breakdown across all vendors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={Object.entries(COST_COLORS).map(([key, color]) => {
                          const totalValue = sanitizedResults.reduce((sum, result) => 
                            sum + (result.costBreakdown[key as keyof typeof result.costBreakdown] || 0), 0
                          )
                          return {
                            name: key.charAt(0).toUpperCase() + key.slice(1),
                            value: totalValue / sanitizedResults.length,
                            color
                          }
                        }).filter(item => item.value > 0)}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {Object.values(COST_COLORS).map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Metrics Comparison</CardTitle>
                <CardDescription>
                  ROI and payback period analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="roi" name="ROI %" fill="#3B82F6" />
                      <Line yAxisId="right" type="monotone" dataKey="payback" name="Payback (Years)" stroke="#EF4444" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Breakdown Tab */}
        <TabsContent value="breakdown" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Selection</CardTitle>
              <CardDescription>
                Select a vendor to view detailed cost breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {sanitizedResults.map((result) => (
                  <Button
                    key={result.vendorId}
                    variant={selectedVendor === result.vendorId ? "default" : "outline"}
                    onClick={() => setSelectedVendor(result.vendorId)}
                    className="flex items-center gap-2"
                  >
                    {result.vendorName}
                    <Badge variant="secondary" className="ml-2">
                      {formatCurrency(result.totalCost)}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedVendor && breakdownData.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown</CardTitle>
                  <CardDescription>
                    {sanitizedResults.find(r => r.vendorId === selectedVendor)?.vendorName} cost distribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={breakdownData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                        >
                          {breakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Details</CardTitle>
                  <CardDescription>
                    Itemized breakdown of all cost components
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {breakdownData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{formatCurrency(item.value)}</div>
                          <div className="text-sm text-muted-foreground">
                            {((item.value / sanitizedResults.find(r => r.vendorId === selectedVendor)!.totalCost) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedVendor && breakdownData.length === 0 && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                No cost breakdown data available for the selected vendor.
              </AlertDescription>
            </Alert>
          )}

          {!selectedVendor && (
            <Card>
              <CardContent className="p-8 text-center">
                <PieChartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Select a vendor above to view detailed cost breakdown
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Year Cost Projection</CardTitle>
              <CardDescription>
                Annual cost comparison over {config.years} year analysis period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {sanitizedResults.map((result, index) => (
                      <Area
                        key={result.vendorId}
                        type="monotone"
                        dataKey={result.vendorName}
                        stackId="1"
                        stroke={CHART_COLORS[index % CHART_COLORS.length]}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                        fillOpacity={0.6}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Year-over-Year Cost Analysis</CardTitle>
              <CardDescription>
                Individual vendor cost progression over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {sanitizedResults.map((result, index) => (
                      <Line
                        key={result.vendorId}
                        type="monotone"
                        dataKey={result.vendorName}
                        stroke={CHART_COLORS[index % CHART_COLORS.length]}
                        strokeWidth={3}
                        dot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROI Analysis Tab */}
        <TabsContent value="roi" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Return on Investment</CardTitle>
                <CardDescription>
                  ROI comparison across all vendors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Bar dataKey="roi" name="ROI %" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payback Period</CardTitle>
                <CardDescription>
                  Time to recover initial investment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis tickFormatter={(value) => `${value}y`} />
                      <Tooltip formatter={(value) => `${value} years`} />
                      <Bar dataKey="payback" name="Payback Period" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Net Present Value Analysis</CardTitle>
              <CardDescription>
                NPV comparison showing present value of future cash flows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="npv" name="Net Present Value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Detailed View Tab */}
        <TabsContent value="detailed" className="space-y-6">
          <div className="space-y-6">
            {sanitizedResults.map((result, index) => (
              <Card key={result.vendorId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {result.vendorName}
                        <Badge variant="outline" style={{ borderColor: CHART_COLORS[index % CHART_COLORS.length] }}>
                          {formatCurrency(result.totalCost)}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Complete financial analysis and breakdown
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Risk Score</div>
                      <div className="text-2xl font-bold text-orange-600">
                        {result.riskAssessment ? Math.round(result.riskAssessment.overallRisk) : 'N/A'}%
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Cost Breakdown */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Cost Breakdown</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Licensing:</span>
                          <span className="font-medium">{formatCurrency(result.costBreakdown.licensing)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hardware:</span>
                          <span className="font-medium">{formatCurrency(result.costBreakdown.hardware)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Services:</span>
                          <span className="font-medium">{formatCurrency(result.costBreakdown.services)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Training:</span>
                          <span className="font-medium">{formatCurrency(result.costBreakdown.training)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Maintenance:</span>
                          <span className="font-medium">{formatCurrency(result.costBreakdown.maintenance)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Operational:</span>
                          <span className="font-medium">{formatCurrency(result.costBreakdown.operational)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Financial Metrics */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Financial Metrics</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>ROI:</span>
                          <span className="font-medium text-green-600">
                            {result.financialMetrics ? formatPercentage(result.financialMetrics.roi) : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>NPV:</span>
                          <span className="font-medium">
                            {result.financialMetrics ? formatCurrency(result.financialMetrics.npv) : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>IRR:</span>
                          <span className="font-medium">
                            {result.financialMetrics ? formatPercentage(result.financialMetrics.irr) : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payback:</span>
                          <span className="font-medium">
                            {result.financialMetrics ? `${result.financialMetrics.paybackPeriod.toFixed(1)}y` : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Profitability Index:</span>
                          <span className="font-medium">
                            {result.financialMetrics ? result.financialMetrics.profitabilityIndex.toFixed(2) : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Risk Assessment</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Overall Risk:</span>
                          <span className="font-medium text-orange-600">
                            {result.riskAssessment ? Math.round(result.riskAssessment.overallRisk) : 'N/A'}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Security Risk:</span>
                          <span className="font-medium">
                            {result.riskAssessment ? Math.round(result.riskAssessment.securityRisk) : 'N/A'}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Operational Risk:</span>
                          <span className="font-medium">
                            {result.riskAssessment ? Math.round(result.riskAssessment.operationalRisk) : 'N/A'}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Financial Risk:</span>
                          <span className="font-medium">
                            {result.riskAssessment ? Math.round(result.riskAssessment.financialRisk) : 'N/A'}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Implementation */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Implementation</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Timeline:</span>
                          <span className="font-medium">{result.implementation?.timeline || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Complexity:</span>
                          <Badge 
                            variant={
                              result.implementation?.complexity === 'Low' ? 'default' :
                              result.implementation?.complexity === 'Medium' ? 'secondary' : 'destructive'
                            }
                            className="text-xs"
                          >
                            {result.implementation?.complexity || 'N/A'}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Resources:</span>
                          <span className="font-medium">
                            {result.implementation?.resources ? `${result.implementation.resources} FTE` : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Business Impact:</span>
                          <span className="font-medium text-green-600">
                            {result.businessImpact ? formatCurrency(result.businessImpact.totalBenefits) : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
