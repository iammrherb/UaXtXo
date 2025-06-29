"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingDown, TrendingUp, Calculator, PieChart, BarChart3, Clock } from "lucide-react"
import { useDashboardSettings } from "@/context/DashboardContext"
import {
  Bar,
  BarChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function TcoAnalysisView() {
  const { settings } = useDashboardSettings()

  // Sample TCO data based on settings
  const yearlyTcoData = Array.from({ length: settings.comparisonYears }, (_, i) => ({
    year: `Year ${i + 1}`,
    portnox: 450000 + i * 50000,
    traditional: 650000 + i * 80000,
    savings: 200000 + i * 30000,
  }))

  const costBreakdown = [
    { category: "Software Licenses", portnox: 180000, traditional: 320000, color: "#0066CC" },
    { category: "Infrastructure", portnox: 120000, traditional: 200000, color: "#00A3CC" },
    { category: "Implementation", portnox: 80000, traditional: 150000, color: "#66B3FF" },
    { category: "Maintenance", portnox: 70000, traditional: 130000, color: "#99CCFF" },
    { category: "Training", portnox: 30000, traditional: 60000, color: "#CCE6FF" },
  ]

  const pieData = costBreakdown.map((item) => ({
    name: item.category,
    value: item.portnox,
    color: item.color,
  }))

  const totalPortnoxCost = costBreakdown.reduce((sum, item) => sum + item.portnox, 0)
  const totalTraditionalCost = costBreakdown.reduce((sum, item) => sum + item.traditional, 0)
  const totalSavings = totalTraditionalCost - totalPortnoxCost
  const savingsPercentage = Math.round((totalSavings / totalTraditionalCost) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">TCO Analysis</h2>
          <p className="text-gray-600">
            {settings.comparisonYears}-year cost comparison for {settings.orgSize} {settings.industry} organization
          </p>
        </div>
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{savingsPercentage}% Cost Savings</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-portnox-blue/10 to-portnox-blue/5 border-portnox-blue/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Portnox TCO</CardTitle>
              <DollarSign className="h-4 w-4 text-portnox-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-portnox-blue">${(totalPortnoxCost / 1000).toFixed(0)}K</div>
            <p className="text-xs text-gray-600">{settings.comparisonYears}-year total</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-100 to-gray-50 border-gray-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Traditional TCO</CardTitle>
              <Calculator className="h-4 w-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-700">${(totalTraditionalCost / 1000).toFixed(0)}K</div>
            <p className="text-xs text-gray-600">{settings.comparisonYears}-year total</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
              <TrendingDown className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${(totalSavings / 1000).toFixed(0)}K</div>
            <p className="text-xs text-gray-600">{savingsPercentage}% reduction</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">ROI</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">285%</div>
            <p className="text-xs text-gray-600">{settings.comparisonYears}-year return</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yearly TCO Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-portnox-blue" />
              Yearly TCO Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                portnox: {
                  label: "Portnox",
                  color: "hsl(var(--chart-1))",
                },
                traditional: {
                  label: "Traditional",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyTcoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="portnox" fill="var(--color-portnox)" name="Portnox" />
                  <Bar dataKey="traditional" fill="var(--color-traditional)" name="Traditional" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-portnox-blue" />
              Portnox Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Cost",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Cost Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Cost Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costBreakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.category}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-portnox-blue font-medium">${(item.portnox / 1000).toFixed(0)}K</span>
                    <span className="text-sm text-gray-500">vs</span>
                    <span className="text-sm text-gray-600">${(item.traditional / 1000).toFixed(0)}K</span>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      -{Math.round(((item.traditional - item.portnox) / item.traditional) * 100)}%
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Progress value={(item.portnox / item.traditional) * 100} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Timeline */}
      <Card className="bg-gradient-to-r from-portnox-blue/5 to-portnox-teal/5 border-portnox-blue/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-portnox-blue">
            <Clock className="h-5 w-5" />
            Implementation & Payback Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-portnox-blue">6 weeks</div>
              <p className="text-sm text-gray-600">Implementation Time</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">8 months</div>
              <p className="text-sm text-gray-600">Payback Period</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                ${(totalSavings / settings.comparisonYears / 1000).toFixed(0)}K
              </div>
              <p className="text-sm text-gray-600">Annual Savings</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
