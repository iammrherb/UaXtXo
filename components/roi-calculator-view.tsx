"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  DollarSign,
  Calculator,
  Target,
  Clock,
  Shield,
  Users,
  Zap,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

interface ROICalculatorViewProps {
  selectedVendors: string[]
  results: any[]
  config: any
}

const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

export default function ROICalculatorView({ selectedVendors, results, config }: ROICalculatorViewProps) {
  // ROI Calculator State
  const [roiInputs, setROIInputs] = useState({
    devices: config?.devices || 1000,
    users: config?.users || 2500,
    currentNACCost: 250000,
    breachRisk: 3.86, // Average breach cost in millions
    complianceViolationRisk: 500000,
    downtimeHourlyCost: 50000,
    itStaffHourlyCost: 150,
    timeframe: 3,
    industryMultiplier: 1.2,
    securityIncidents: 12, // per year
    complianceAudits: 2, // per year
    maintenanceWindows: 24, // per year
  })

  // Calculate comprehensive ROI metrics
  const roiCalculations = useMemo(() => {
    const portnoxCosts = {
      year1: {
        software: roiInputs.devices * 12 * 12, // $12/device/month
        implementation: 50000,
        training: 15000,
        migration: 25000,
        total: 0,
      },
      year2: {
        software: roiInputs.devices * 12 * 12,
        implementation: 0,
        training: 5000,
        migration: 0,
        total: 0,
      },
      year3: {
        software: roiInputs.devices * 12 * 12,
        implementation: 0,
        training: 5000,
        migration: 0,
        total: 0,
      },
    }

    // Calculate totals
    Object.keys(portnoxCosts).forEach((year) => {
      const yearData = portnoxCosts[year as keyof typeof portnoxCosts]
      yearData.total = yearData.software + yearData.implementation + yearData.training + yearData.migration
    })

    const traditionalCosts = {
      year1: {
        software: roiInputs.currentNACCost * 0.4,
        hardware: roiInputs.currentNACCost * 0.3,
        implementation: roiInputs.currentNACCost * 0.2,
        training: 45000,
        migration: 75000,
        maintenance: roiInputs.currentNACCost * 0.1,
        total: 0,
      },
      year2: {
        software: roiInputs.currentNACCost * 0.2,
        hardware: 0,
        implementation: 0,
        training: 15000,
        migration: 0,
        maintenance: roiInputs.currentNACCost * 0.15,
        total: 0,
      },
      year3: {
        software: roiInputs.currentNACCost * 0.2,
        hardware: roiInputs.currentNACCost * 0.1, // Hardware refresh
        implementation: 0,
        training: 15000,
        migration: 0,
        maintenance: roiInputs.currentNACCost * 0.15,
        total: 0,
      },
    }

    // Calculate totals
    Object.keys(traditionalCosts).forEach((year) => {
      const yearData = traditionalCosts[year as keyof typeof traditionalCosts]
      yearData.total =
        yearData.software +
        yearData.hardware +
        yearData.implementation +
        yearData.training +
        yearData.migration +
        yearData.maintenance
    })

    // Calculate benefits
    const benefits = {
      year1: {
        breachPrevention: roiInputs.breachRisk * 1000000 * 0.8, // 80% risk reduction
        operationalSavings: roiInputs.itStaffHourlyCost * 2000, // 2000 hours saved
        complianceSavings: roiInputs.complianceViolationRisk * 0.7, // 70% risk reduction
        downtimeReduction: roiInputs.downtimeHourlyCost * 48, // 48 hours saved
        total: 0,
      },
      year2: {
        breachPrevention: roiInputs.breachRisk * 1000000 * 0.85,
        operationalSavings: roiInputs.itStaffHourlyCost * 2500,
        complianceSavings: roiInputs.complianceViolationRisk * 0.8,
        downtimeReduction: roiInputs.downtimeHourlyCost * 72,
        total: 0,
      },
      year3: {
        breachPrevention: roiInputs.breachRisk * 1000000 * 0.9,
        operationalSavings: roiInputs.itStaffHourlyCost * 3000,
        complianceSavings: roiInputs.complianceViolationRisk * 0.85,
        downtimeReduction: roiInputs.downtimeHourlyCost * 96,
        total: 0,
      },
    }

    // Calculate benefit totals
    Object.keys(benefits).forEach((year) => {
      const yearData = benefits[year as keyof typeof benefits]
      yearData.total =
        yearData.breachPrevention +
        yearData.operationalSavings +
        yearData.complianceSavings +
        yearData.downtimeReduction
    })

    // Calculate net benefits and ROI
    const netBenefits = {
      year1: benefits.year1.total - (traditionalCosts.year1.total - portnoxCosts.year1.total),
      year2: benefits.year2.total - (traditionalCosts.year2.total - portnoxCosts.year2.total),
      year3: benefits.year3.total - (traditionalCosts.year3.total - portnoxCosts.year3.total),
    }

    const totalInvestment =
      portnoxCosts.year1.total + portnoxCosts.year2.total + portnoxCosts.year3.total - roiInputs.currentNACCost
    const totalBenefits = benefits.year1.total + benefits.year2.total + benefits.year3.total
    const totalSavings =
      traditionalCosts.year1.total +
      traditionalCosts.year2.total +
      traditionalCosts.year3.total -
      (portnoxCosts.year1.total + portnoxCosts.year2.total + portnoxCosts.year3.total)

    const roi = totalInvestment > 0 ? ((totalBenefits + totalSavings - totalInvestment) / totalInvestment) * 100 : 0
    const paybackPeriod = totalInvestment > 0 ? totalInvestment / ((totalBenefits + totalSavings) / 3) : 0

    return {
      portnoxCosts,
      traditionalCosts,
      benefits,
      netBenefits,
      totalInvestment,
      totalBenefits,
      totalSavings,
      roi,
      paybackPeriod,
    }
  }, [roiInputs])

  // Prepare chart data
  const cashFlowData = [
    {
      year: "Year 0",
      investment: -roiCalculations.totalInvestment,
      benefits: 0,
      cumulative: -roiCalculations.totalInvestment,
    },
    {
      year: "Year 1",
      investment: 0,
      benefits:
        roiCalculations.benefits.year1.total +
        roiCalculations.traditionalCosts.year1.total -
        roiCalculations.portnoxCosts.year1.total,
      cumulative:
        -roiCalculations.totalInvestment +
        (roiCalculations.benefits.year1.total +
          roiCalculations.traditionalCosts.year1.total -
          roiCalculations.portnoxCosts.year1.total),
    },
    {
      year: "Year 2",
      investment: 0,
      benefits:
        roiCalculations.benefits.year2.total +
        roiCalculations.traditionalCosts.year2.total -
        roiCalculations.portnoxCosts.year2.total,
      cumulative:
        -roiCalculations.totalInvestment +
        (roiCalculations.benefits.year1.total +
          roiCalculations.traditionalCosts.year1.total -
          roiCalculations.portnoxCosts.year1.total) +
        (roiCalculations.benefits.year2.total +
          roiCalculations.traditionalCosts.year2.total -
          roiCalculations.portnoxCosts.year2.total),
    },
    {
      year: "Year 3",
      investment: 0,
      benefits:
        roiCalculations.benefits.year3.total +
        roiCalculations.traditionalCosts.year3.total -
        roiCalculations.portnoxCosts.year3.total,
      cumulative:
        -roiCalculations.totalInvestment +
        (roiCalculations.benefits.year1.total +
          roiCalculations.traditionalCosts.year1.total -
          roiCalculations.portnoxCosts.year1.total) +
        (roiCalculations.benefits.year2.total +
          roiCalculations.traditionalCosts.year2.total -
          roiCalculations.portnoxCosts.year2.total) +
        (roiCalculations.benefits.year3.total +
          roiCalculations.traditionalCosts.year3.total -
          roiCalculations.portnoxCosts.year3.total),
    },
  ]

  const benefitsBreakdownData = [
    { name: "Breach Prevention", value: roiCalculations.benefits.year1.breachPrevention },
    { name: "Operational Savings", value: roiCalculations.benefits.year1.operationalSavings },
    { name: "Compliance Savings", value: roiCalculations.benefits.year1.complianceSavings },
    { name: "Downtime Reduction", value: roiCalculations.benefits.year1.downtimeReduction },
  ]

  const costComparisonData = [
    {
      category: "Year 1",
      portnox: roiCalculations.portnoxCosts.year1.total,
      traditional: roiCalculations.traditionalCosts.year1.total,
    },
    {
      category: "Year 2",
      portnox: roiCalculations.portnoxCosts.year2.total,
      traditional: roiCalculations.traditionalCosts.year2.total,
    },
    {
      category: "Year 3",
      portnox: roiCalculations.portnoxCosts.year3.total,
      traditional: roiCalculations.traditionalCosts.year3.total,
    },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const updateROIInput = (key: string, value: number) => {
    setROIInputs((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">ROI Calculator & Financial Analysis</h2>
          <p className="text-muted-foreground">Comprehensive return on investment analysis with payback calculations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calculator className="mr-2 h-4 w-4" />
            Export Analysis
          </Button>
          <Button>
            <Target className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key ROI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">ROI</p>
                <p className="text-2xl font-bold text-green-600">{formatPercent(roiCalculations.roi)}</p>
                <p className="text-xs text-muted-foreground">3-year return</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Payback Period</p>
                <p className="text-2xl font-bold text-blue-600">{roiCalculations.paybackPeriod.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">years</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Total Savings</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(roiCalculations.totalSavings)}</p>
                <p className="text-xs text-muted-foreground">3-year total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Risk Reduction</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(roiCalculations.totalBenefits)}</p>
                <p className="text-xs text-muted-foreground">3-year value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">ROI Calculator</TabsTrigger>
          <TabsTrigger value="analysis">Financial Analysis</TabsTrigger>
          <TabsTrigger value="benefits">Benefits Breakdown</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Planning</TabsTrigger>
        </TabsList>

        {/* ROI Calculator Tab */}
        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Parameters */}
            <Card>
              <CardHeader>
                <CardTitle>ROI Parameters</CardTitle>
                <p className="text-muted-foreground">Adjust inputs to see impact on ROI calculations</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="devices">Number of Devices</Label>
                    <Input
                      id="devices"
                      type="number"
                      value={roiInputs.devices}
                      onChange={(e) => updateROIInput("devices", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="users">Number of Users</Label>
                    <Input
                      id="users"
                      type="number"
                      value={roiInputs.users}
                      onChange={(e) => updateROIInput("users", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentCost">Current NAC Annual Cost</Label>
                    <Input
                      id="currentCost"
                      type="number"
                      value={roiInputs.currentNACCost}
                      onChange={(e) => updateROIInput("currentNACCost", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label>Breach Risk ($ millions)</Label>
                    <div className="px-3">
                      <Slider
                        value={[roiInputs.breachRisk]}
                        onValueChange={(value) => updateROIInput("breachRisk", value[0])}
                        max={10}
                        min={1}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>$1M</span>
                        <span>${roiInputs.breachRisk.toFixed(1)}M</span>
                        <span>$10M</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Downtime Hourly Cost</Label>
                    <div className="px-3">
                      <Slider
                        value={[roiInputs.downtimeHourlyCost]}
                        onValueChange={(value) => updateROIInput("downtimeHourlyCost", value[0])}
                        max={100000}
                        min={10000}
                        step={5000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>$10K</span>
                        <span>{formatCurrency(roiInputs.downtimeHourlyCost)}</span>
                        <span>$100K</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>IT Staff Hourly Rate</Label>
                    <div className="px-3">
                      <Slider
                        value={[roiInputs.itStaffHourlyCost]}
                        onValueChange={(value) => updateROIInput("itStaffHourlyCost", value[0])}
                        max={300}
                        min={75}
                        step={25}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>$75</span>
                        <span>${roiInputs.itStaffHourlyCost}</span>
                        <span>$300</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cash Flow Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Analysis</CardTitle>
                <p className="text-muted-foreground">Cumulative cash flow over time</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => [formatCurrency(value as number), "Cash Flow"]} />
                    <Line
                      type="monotone"
                      dataKey="cumulative"
                      stroke="#00D4AA"
                      strokeWidth={3}
                      dot={{ fill: "#00D4AA", strokeWidth: 2, r: 6 }}
                    />
                    <Line type="monotone" dataKey="benefits" stroke="#0EA5E9" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* ROI Summary */}
          <Card>
            <CardHeader>
              <CardTitle>ROI Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600">Investment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Initial Investment</span>
                      <span className="font-medium">{formatCurrency(roiCalculations.totalInvestment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3-Year Portnox Cost</span>
                      <span className="font-medium">
                        {formatCurrency(
                          roiCalculations.portnoxCosts.year1.total +
                            roiCalculations.portnoxCosts.year2.total +
                            roiCalculations.portnoxCosts.year3.total,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-600">Returns</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cost Savings</span>
                      <span className="font-medium">{formatCurrency(roiCalculations.totalSavings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Reduction Value</span>
                      <span className="font-medium">{formatCurrency(roiCalculations.totalBenefits)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2">
                      <span>Total Returns</span>
                      <span>{formatCurrency(roiCalculations.totalSavings + roiCalculations.totalBenefits)}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-purple-600">Key Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>ROI</span>
                      <Badge className="bg-green-100 text-green-800">{formatPercent(roiCalculations.roi)}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Payback Period</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        {roiCalculations.paybackPeriod.toFixed(1)} years
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Break-even</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        Month {Math.round(roiCalculations.paybackPeriod * 12)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cost Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>3-Year Cost Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={costComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => [formatCurrency(value as number), "Cost"]} />
                    <Legend />
                    <Bar dataKey="portnox" fill="#00D4AA" name="Portnox CLEAR" />
                    <Bar dataKey="traditional" fill="#EF4444" name="Traditional NAC" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Benefits Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Annual Benefits Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={benefitsBreakdownData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {benefitsBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [formatCurrency(value as number), "Annual Value"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Financial Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Financial Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Category</th>
                      <th className="text-right p-2">Year 1</th>
                      <th className="text-right p-2">Year 2</th>
                      <th className="text-right p-2">Year 3</th>
                      <th className="text-right p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-green-50">
                      <td className="p-2 font-medium">Portnox CLEAR Costs</td>
                      <td className="text-right p-2">{formatCurrency(roiCalculations.portnoxCosts.year1.total)}</td>
                      <td className="text-right p-2">{formatCurrency(roiCalculations.portnoxCosts.year2.total)}</td>
                      <td className="text-right p-2">{formatCurrency(roiCalculations.portnoxCosts.year3.total)}</td>
                      <td className="text-right p-2 font-bold">
                        {formatCurrency(
                          roiCalculations.portnoxCosts.year1.total +
                            roiCalculations.portnoxCosts.year2.total +
                            roiCalculations.portnoxCosts.year3.total,
                        )}
                      </td>
                    </tr>
                    <tr className="border-b bg-red-50">
                      <td className="p-2 font-medium">Traditional NAC Costs</td>
                      <td className="text-right p-2">{formatCurrency(roiCalculations.traditionalCosts.year1.total)}</td>
                      <td className="text-right p-2">{formatCurrency(roiCalculations.traditionalCosts.year2.total)}</td>
                      <td className="text-right p-2">{formatCurrency(roiCalculations.traditionalCosts.year3.total)}</td>
                      <td className="text-right p-2 font-bold">
                        {formatCurrency(
                          roiCalculations.traditionalCosts.year1.total +
                            roiCalculations.traditionalCosts.year2.total +
                            roiCalculations.traditionalCosts.year3.total,
                        )}
                      </td>
                    </tr>
                    <tr className="border-b bg-blue-50">
                      <td className="p-2 font-medium">Cost Savings</td>
                      <td className="text-right p-2 text-blue-600 font-medium">
                        {formatCurrency(
                          roiCalculations.traditionalCosts.year1.total - roiCalculations.portnoxCosts.year1.total,
                        )}
                      </td>
                      <td className="text-right p-2 text-blue-600 font-medium">
                        {formatCurrency(
                          roiCalculations.traditionalCosts.year2.total - roiCalculations.portnoxCosts.year2.total,
                        )}
                      </td>
                      <td className="text-right p-2 text-blue-600 font-medium">
                        {formatCurrency(
                          roiCalculations.traditionalCosts.year3.total - roiCalculations.portnoxCosts.year3.total,
                        )}
                      </td>
                      <td className="text-right p-2 font-bold text-blue-600">
                        {formatCurrency(roiCalculations.totalSavings)}
                      </td>
                    </tr>
                    <tr className="border-b bg-purple-50">
                      <td className="p-2 font-medium">Risk Reduction Benefits</td>
                      <td className="text-right p-2 text-purple-600 font-medium">
                        {formatCurrency(roiCalculations.benefits.year1.total)}
                      </td>
                      <td className="text-right p-2 text-purple-600 font-medium">
                        {formatCurrency(roiCalculations.benefits.year2.total)}
                      </td>
                      <td className="text-right p-2 text-purple-600 font-medium">
                        {formatCurrency(roiCalculations.benefits.year3.total)}
                      </td>
                      <td className="text-right p-2 font-bold text-purple-600">
                        {formatCurrency(roiCalculations.totalBenefits)}
                      </td>
                    </tr>
                    <tr className="border-b-2 border-gray-400 bg-gray-100">
                      <td className="p-2 font-bold">Net Benefit</td>
                      <td className="text-right p-2 font-bold">{formatCurrency(roiCalculations.netBenefits.year1)}</td>
                      <td className="text-right p-2 font-bold">{formatCurrency(roiCalculations.netBenefits.year2)}</td>
                      <td className="text-right p-2 font-bold">{formatCurrency(roiCalculations.netBenefits.year3)}</td>
                      <td className="text-right p-2 font-bold text-green-600">
                        {formatCurrency(roiCalculations.totalSavings + roiCalculations.totalBenefits)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Benefits Breakdown Tab */}
        <TabsContent value="benefits" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Breach Prevention Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  Breach Prevention Value
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-red-600">
                  {formatCurrency(roiCalculations.benefits.year1.breachPrevention)}
                </div>
                <div className="text-sm text-muted-foreground">Annual risk reduction value</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Average breach cost</span>
                    <span>{formatCurrency(roiInputs.breachRisk * 1000000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk reduction</span>
                    <Badge className="bg-green-100 text-green-800">80%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual incidents prevented</span>
                    <span>0.8 breaches</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Operational Savings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Operational Savings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(roiCalculations.benefits.year1.operationalSavings)}
                </div>
                <div className="text-sm text-muted-foreground">Annual staff time savings</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Hours saved annually</span>
                    <span>2,000 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average hourly rate</span>
                    <span>${roiInputs.itStaffHourlyCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Efficiency improvement</span>
                    <Badge className="bg-blue-100 text-blue-800">90%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Savings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Compliance Savings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(roiCalculations.benefits.year1.complianceSavings)}
                </div>
                <div className="text-sm text-muted-foreground">Annual compliance cost reduction</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Violation risk reduction</span>
                    <Badge className="bg-green-100 text-green-800">70%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Audit preparation time</span>
                    <span className="text-green-600">-80%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Automated reporting</span>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Downtime Reduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  Downtime Reduction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-orange-600">
                  {formatCurrency(roiCalculations.benefits.year1.downtimeReduction)}
                </div>
                <div className="text-sm text-muted-foreground">Annual downtime cost savings</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Hours saved annually</span>
                    <span>48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hourly downtime cost</span>
                    <span>{formatCurrency(roiInputs.downtimeHourlyCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Availability improvement</span>
                    <Badge className="bg-orange-100 text-orange-800">99.9%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits Realization Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={[
                    {
                      year: "Year 1",
                      breachPrevention: roiCalculations.benefits.year1.breachPrevention,
                      operationalSavings: roiCalculations.benefits.year1.operationalSavings,
                      complianceSavings: roiCalculations.benefits.year1.complianceSavings,
                      downtimeReduction: roiCalculations.benefits.year1.downtimeReduction,
                    },
                    {
                      year: "Year 2",
                      breachPrevention: roiCalculations.benefits.year2.breachPrevention,
                      operationalSavings: roiCalculations.benefits.year2.operationalSavings,
                      complianceSavings: roiCalculations.benefits.year2.complianceSavings,
                      downtimeReduction: roiCalculations.benefits.year2.downtimeReduction,
                    },
                    {
                      year: "Year 3",
                      breachPrevention: roiCalculations.benefits.year3.breachPrevention,
                      operationalSavings: roiCalculations.benefits.year3.operationalSavings,
                      complianceSavings: roiCalculations.benefits.year3.complianceSavings,
                      downtimeReduction: roiCalculations.benefits.year3.downtimeReduction,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(value) => [formatCurrency(value as number), "Annual Value"]} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="breachPrevention"
                    stackId="1"
                    stroke="#EF4444"
                    fill="#EF4444"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="operationalSavings"
                    stackId="1"
                    stroke="#0EA5E9"
                    fill="#0EA5E9"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="complianceSavings"
                    stackId="1"
                    stroke="#00D4AA"
                    fill="#00D4AA"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="downtimeReduction"
                    stackId="1"
                    stroke="#F97316"
                    fill="#F97316"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scenario Planning Tab */}
        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Conservative Scenario */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowDown className="h-5 w-5 text-orange-600" />
                  Conservative Scenario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>ROI</span>
                    <Badge className="bg-orange-100 text-orange-800">{formatPercent(roiCalculations.roi * 0.7)}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Payback</span>
                    <span>{(roiCalculations.paybackPeriod * 1.3).toFixed(1)} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Benefits</span>
                    <span>{formatCurrency((roiCalculations.totalBenefits + roiCalculations.totalSavings) * 0.7)}</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Assumes 30% lower benefits realization and 30% longer implementation timeline.
                </div>
              </CardContent>
            </Card>

            {/* Realistic Scenario */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Realistic Scenario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>ROI</span>
                    <Badge className="bg-blue-100 text-blue-800">{formatPercent(roiCalculations.roi)}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Payback</span>
                    <span>{roiCalculations.paybackPeriod.toFixed(1)} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Benefits</span>
                    <span>{formatCurrency(roiCalculations.totalBenefits + roiCalculations.totalSavings)}</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Based on current inputs and industry benchmarks. Most likely outcome.
                </div>
              </CardContent>
            </Card>

            {/* Optimistic Scenario */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUp className="h-5 w-5 text-green-600" />
                  Optimistic Scenario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>ROI</span>
                    <Badge className="bg-green-100 text-green-800">{formatPercent(roiCalculations.roi * 1.4)}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Payback</span>
                    <span>{(roiCalculations.paybackPeriod * 0.8).toFixed(1)} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Benefits</span>
                    <span>{formatCurrency((roiCalculations.totalBenefits + roiCalculations.totalSavings) * 1.4)}</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Assumes 40% higher benefits and faster implementation with additional use cases.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sensitivity Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Sensitivity Analysis</CardTitle>
              <p className="text-muted-foreground">Impact of key variables on ROI</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">High Impact Variables</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Breach Cost (+/-$1M)</span>
                        <Badge variant="outline">±{formatPercent(25)}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Device Count (+/-500)</span>
                        <Badge variant="outline">±{formatPercent(15)}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Downtime Cost (+/-$25K/hr)</span>
                        <Badge variant="outline">±{formatPercent(12)}</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Medium Impact Variables</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>IT Staff Rate (+/-$50/hr)</span>
                        <Badge variant="outline">±{formatPercent(8)}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Implementation Time (+/-2 months)</span>
                        <Badge variant="outline">±{formatPercent(6)}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Training Costs (+/-$10K)</span>
                        <Badge variant="outline">±{formatPercent(3)}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
