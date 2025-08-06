"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts"
import { DollarSign, TrendingUp, TrendingDown, Calculator, PieChartIcon, BarChart3, Info } from 'lucide-react'
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface DetailedCostsViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function DetailedCostsView({ results = [], config }: DetailedCostsViewProps) {
  // Cost breakdown data for stacked bar chart
  const costBreakdownData = useMemo(() => {
    return results
      .sort((a, b) => a.totalCost - b.totalCost)
      .map((result) => ({
        vendor: result.vendorName,
        licensing: result.costBreakdown.licensing,
        hardware: result.costBreakdown.hardware,
        services: result.costBreakdown.services,
        training: result.costBreakdown.training,
        maintenance: result.costBreakdown.maintenance,
        operational: result.costBreakdown.operational,
        total: result.totalCost,
        isPortnox: result.vendorId === "portnox",
      }))
  }, [results])

  // Per-device cost analysis
  const perDeviceCostData = useMemo(() => {
    if (!config?.devices) return []
    
    return results.map((result) => ({
      vendor: result.vendorName,
      perDeviceTotal: Math.round(result.totalCost / config.devices),
      perDeviceLicensing: Math.round(result.costBreakdown.licensing / config.devices),
      perDeviceHardware: Math.round(result.costBreakdown.hardware / config.devices),
      perDeviceServices: Math.round(result.costBreakdown.services / config.devices),
      perDeviceOperational: Math.round(result.costBreakdown.operational / config.devices),
      isPortnox: result.vendorId === "portnox",
    }))
  }, [results, config])

  // Year-over-year cost projection
  const yearlyProjectionData = useMemo(() => {
    if (!config?.years) return []

    const years = Array.from({ length: config.years }, (_, i) => i + 1)
    
    return years.map((year) => {
      const yearData: any = { year }
      
      results.forEach((result) => {
        // Calculate cumulative cost for each year
        const annualLicensing = result.costBreakdown.licensing / config.years
        const annualOperational = result.costBreakdown.operational / config.years
        const annualMaintenance = result.costBreakdown.maintenance / config.years
        
        let cumulativeCost = 0
        
        // Year 1 includes all upfront costs
        if (year === 1) {
          cumulativeCost = result.costBreakdown.hardware + 
                          result.costBreakdown.services + 
                          result.costBreakdown.training +
                          annualLicensing + 
                          annualOperational + 
                          annualMaintenance
        } else {
          // Subsequent years only include recurring costs
          const year1Cost = result.costBreakdown.hardware + 
                           result.costBreakdown.services + 
                           result.costBreakdown.training +
                           annualLicensing + 
                           annualOperational + 
                           annualMaintenance
          
          const recurringAnnualCost = annualLicensing + annualOperational + annualMaintenance
          cumulativeCost = year1Cost + (recurringAnnualCost * (year - 1))
        }
        
        yearData[result.vendorName] = Math.round(cumulativeCost)
      })
      
      return yearData
    })
  }, [results, config])

  // Cost category analysis
  const costCategoryData = useMemo(() => {
    const categories = ['licensing', 'hardware', 'services', 'training', 'maintenance', 'operational']
    
    return categories.map((category) => {
      const categoryData: any = { category: category.charAt(0).toUpperCase() + category.slice(1) }
      
      results.forEach((result) => {
        categoryData[result.vendorName] = result.costBreakdown[category as keyof typeof result.costBreakdown]
      })
      
      return categoryData
    })
  }, [results])

  // Hidden costs analysis
  const hiddenCostsData = useMemo(() => {
    return results.map((result) => {
      // Calculate hidden/indirect costs
      const trainingCost = result.costBreakdown.training
      const maintenanceCost = result.costBreakdown.maintenance
      const operationalCost = result.costBreakdown.operational
      const servicesCost = result.costBreakdown.services
      
      const totalHiddenCosts = trainingCost + maintenanceCost + operationalCost + servicesCost
      const directCosts = result.costBreakdown.licensing + result.costBreakdown.hardware
      const hiddenPercentage = (totalHiddenCosts / result.totalCost) * 100
      
      return {
        vendor: result.vendorName,
        directCosts,
        hiddenCosts: totalHiddenCosts,
        hiddenPercentage,
        training: trainingCost,
        maintenance: maintenanceCost,
        operational: operationalCost,
        services: servicesCost,
        isPortnox: result.vendorId === "portnox",
      }
    })
  }, [results])

  // Colors for charts
  const COLORS = {
    licensing: "#3B82F6",
    hardware: "#8B5CF6", 
    services: "#F59E0B",
    training: "#10B981",
    maintenance: "#EF4444",
    operational: "#6B7280",
    portnox: "#10B981",
    primary: "#3B82F6",
  }

  const PIE_COLORS = ["#3B82F6", "#8B5CF6", "#F59E0B", "#10B981", "#EF4444", "#6B7280"]

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Please select vendors to compare detailed costs.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cost Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              Lowest Total Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${Math.min(...results.map(r => r.totalCost)).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {results.find(r => r.totalCost === Math.min(...results.map(r => r.totalCost)))?.vendorName}
            </p>
            <Progress 
              value={100} 
              className="mt-2 h-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calculator className="h-4 w-4 text-blue-600" />
              Average Cost per Device
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${config?.devices ? Math.round(results.reduce((sum, r) => sum + r.totalCost, 0) / results.length / config.devices) : 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              across all vendors over {config?.years} years
            </p>
            <Badge variant="outline" className="mt-2 text-xs">
              {config?.devices.toLocaleString()} devices
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              Cost Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {(((Math.max(...results.map(r => r.totalCost)) - Math.min(...results.map(r => r.totalCost))) / Math.min(...results.map(r => r.totalCost))) * 100).toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              variation between highest and lowest
            </p>
            <div className="text-xs text-muted-foreground mt-1">
              ${(Math.max(...results.map(r => r.totalCost)) - Math.min(...results.map(r => r.totalCost))).toLocaleString()} difference
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <PieChartIcon className="h-4 w-4 text-amber-600" />
              Hidden Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {Math.round(hiddenCostsData.reduce((sum, h) => sum + h.hiddenPercentage, 0) / hiddenCostsData.length)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              average hidden cost percentage
            </p>
            <Badge variant="outline" className="mt-2 text-xs">
              Beyond licensing
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Cost Analysis */}
      <Tabs defaultValue="breakdown" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="perdevice">Per Device</TabsTrigger>
          <TabsTrigger value="yearly">Year-over-Year</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="hidden">Hidden Costs</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-6">
          {/* Stacked Cost Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Total Cost Breakdown by Vendor</CardTitle>
              <CardDescription>
                Detailed cost components for {config?.devices.toLocaleString()} devices over {config?.years} years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={costBreakdownData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="vendor" 
                    tick={{ fontSize: 12 }} 
                    angle={-45} 
                    textAnchor="end" 
                    height={80}
                  />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip 
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                    labelFormatter={(label) => `Vendor: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="licensing" stackId="a" fill={COLORS.licensing} name="Licensing" />
                  <Bar dataKey="hardware" stackId="a" fill={COLORS.hardware} name="Hardware" />
                  <Bar dataKey="services" stackId="a" fill={COLORS.services} name="Services" />
                  <Bar dataKey="training" stackId="a" fill={COLORS.training} name="Training" />
                  <Bar dataKey="maintenance" stackId="a" fill={COLORS.maintenance} name="Maintenance" />
                  <Bar dataKey="operational" stackId="a" fill={COLORS.operational} name="Operational" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cost Summary Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Cost Summary</CardTitle>
              <CardDescription>Complete breakdown of all cost components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Vendor</th>
                      <th className="text-right p-2 font-medium">Licensing</th>
                      <th className="text-right p-2 font-medium">Hardware</th>
                      <th className="text-right p-2 font-medium">Services</th>
                      <th className="text-right p-2 font-medium">Training</th>
                      <th className="text-right p-2 font-medium">Maintenance</th>
                      <th className="text-right p-2 font-medium">Operational</th>
                      <th className="text-right p-2 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {costBreakdownData.map((vendor, index) => (
                      <tr key={vendor.vendor} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                        <td className="p-2 font-medium">
                          {vendor.vendor}
                          {vendor.isPortnox && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              Recommended
                            </Badge>
                          )}
                        </td>
                        <td className="text-right p-2">${vendor.licensing.toLocaleString()}</td>
                        <td className="text-right p-2">${vendor.hardware.toLocaleString()}</td>
                        <td className="text-right p-2">${vendor.services.toLocaleString()}</td>
                        <td className="text-right p-2">${vendor.training.toLocaleString()}</td>
                        <td className="text-right p-2">${vendor.maintenance.toLocaleString()}</td>
                        <td className="text-right p-2">${vendor.operational.toLocaleString()}</td>
                        <td className="text-right p-2 font-bold">${vendor.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="perdevice" className="space-y-6">
          {/* Per Device Cost Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Per Device Analysis</CardTitle>
              <CardDescription>
                Total cost of ownership per device over {config?.years} years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={perDeviceCostData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="vendor" 
                    tick={{ fontSize: 12 }} 
                    angle={-45} 
                    textAnchor="end" 
                    height={80}
                  />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                    labelFormatter={(label) => `${label} - Per Device Cost`}
                  />
                  <Legend />
                  <Bar dataKey="perDeviceLicensing" stackId="a" fill={COLORS.licensing} name="Licensing" />
                  <Bar dataKey="perDeviceHardware" stackId="a" fill={COLORS.hardware} name="Hardware" />
                  <Bar dataKey="perDeviceServices" stackId="a" fill={COLORS.services} name="Services" />
                  <Bar dataKey="perDeviceOperational" stackId="a" fill={COLORS.operational} name="Operational" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Per Device Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Per Device Cost Comparison</CardTitle>
              <CardDescription>Detailed per-device breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Vendor</th>
                      <th className="text-right p-2 font-medium">Per Device Total</th>
                      <th className="text-right p-2 font-medium">Monthly Cost</th>
                      <th className="text-right p-2 font-medium">Annual Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {perDeviceCostData
                      .sort((a, b) => a.perDeviceTotal - b.perDeviceTotal)
                      .map((vendor, index) => (
                        <tr key={vendor.vendor} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                          <td className="p-2 font-medium">
                            {vendor.vendor}
                            {vendor.isPortnox && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Lowest
                              </Badge>
                            )}
                          </td>
                          <td className="text-right p-2 font-bold">${vendor.perDeviceTotal}</td>
                          <td className="text-right p-2">${Math.round(vendor.perDeviceTotal / (config?.years || 1) / 12)}</td>
                          <td className="text-right p-2">${Math.round(vendor.perDeviceTotal / (config?.years || 1))}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yearly" className="space-y-6">
          {/* Year-over-Year Cost Projection */}
          <Card>
            <CardHeader>
              <CardTitle>Cumulative Cost Projection</CardTitle>
              <CardDescription>
                Total cost accumulation over {config?.years} years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={yearlyProjectionData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip 
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Legend />
                  {results.map((result, index) => (
                    <Line
                      key={result.vendorId}
                      type="monotone"
                      dataKey={result.vendorName}
                      stroke={result.vendorId === "portnox" ? COLORS.portnox : PIE_COLORS[index % PIE_COLORS.length]}
                      strokeWidth={result.vendorId === "portnox" ? 3 : 2}
                      dot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {/* Cost Categories Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Categories Comparison</CardTitle>
              <CardDescription>Side-by-side comparison of each cost category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={costCategoryData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="category" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Legend />
                  {results.map((result, index) => (
                    <Bar
                      key={result.vendorId}
                      dataKey={result.vendorName}
                      fill={result.vendorId === "portnox" ? COLORS.portnox : PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hidden" className="space-y-6">
          {/* Hidden Costs Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Hidden Costs Analysis</CardTitle>
              <CardDescription>
                Costs beyond licensing that significantly impact TCO
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={hiddenCostsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="vendor" 
                    tick={{ fontSize: 12 }} 
                    angle={-45} 
                    textAnchor="end" 
                    height={80}
                  />
                  <YAxis yAxisId="left" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="directCosts" fill={COLORS.primary} name="Direct Costs" />
                  <Bar yAxisId="left" dataKey="hiddenCosts" fill={COLORS.services} name="Hidden Costs" />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="hiddenPercentage" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    name="Hidden Cost %"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Hidden Costs Breakdown */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Hidden Cost Components</CardTitle>
                <CardDescription>Breakdown of indirect costs by vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hiddenCostsData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="vendor" 
                      tick={{ fontSize: 12 }} 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                    />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="training" stackId="a" fill={COLORS.training} name="Training" />
                    <Bar dataKey="services" stackId="a" fill={COLORS.services} name="Services" />
                    <Bar dataKey="maintenance" stackId="a" fill={COLORS.maintenance} name="Maintenance" />
                    <Bar dataKey="operational" stackId="a" fill={COLORS.operational} name="Operational" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hidden Cost Impact</CardTitle>
                <CardDescription>Percentage of total cost from hidden expenses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {hiddenCostsData
                  .sort((a, b) => a.hiddenPercentage - b.hiddenPercentage)
                  .map((vendor) => (
                    <div key={vendor.vendor} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{vendor.vendor}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            ${vendor.hiddenCosts.toLocaleString()}
                          </span>
                          <Badge 
                            variant={vendor.hiddenPercentage < 30 ? "default" : vendor.hiddenPercentage < 50 ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {vendor.hiddenPercentage.toFixed(0)}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={vendor.hiddenPercentage} className="h-2" />
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Cost Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Analysis Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">Cost Optimization Opportunity</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                The cost difference between the lowest and highest options is $
                {(Math.max(...results.map(r => r.totalCost)) - Math.min(...results.map(r => r.totalCost))).toLocaleString()}, 
                representing a {(((Math.max(...results.map(r => r.totalCost)) - Math.min(...results.map(r => r.totalCost))) / Math.min(...results.map(r => r.totalCost))) * 100).toFixed(0)}% 
                potential savings opportunity.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
            <TrendingUp className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-amber-900 dark:text-amber-100">Hidden Costs Impact</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                On average, {Math.round(hiddenCostsData.reduce((sum, h) => sum + h.hiddenPercentage, 0) / hiddenCostsData.length)}% 
                of total costs come from hidden expenses like training, services, and operational overhead. 
                Consider vendors with lower hidden cost percentages for better budget predictability.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
            <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-green-900 dark:text-green-100">Per-Device Economics</h4>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                The most cost-effective solution costs $
                {Math.min(...perDeviceCostData.map(p => p.perDeviceTotal))} per device over {config?.years} years, 
                or approximately $
                {Math.round(Math.min(...perDeviceCostData.map(p => p.perDeviceTotal)) / (config?.years || 1) / 12)} per device per month.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
