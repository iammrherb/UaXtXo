"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  TrendingUp,
  DollarSign,
  Shield,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle2,
  Calculator,
  Target,
  Zap,
  Building2,
  Download,
  ChevronRight,
} from "lucide-react"
import {
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
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
import { INDUSTRIES, INDUSTRY_ROI, PREVENTABLE_BREACHES } from "@/lib/vendors/comprehensive-vendor-data"

interface ROICalculatorProps {
  industry?: string
  deviceCount?: number
  currentSpend?: number
}

export function ComprehensiveROICalculator({
  industry = "HEALTHCARE",
  deviceCount = 500,
  currentSpend = 0,
}: ROICalculatorProps) {
  const [activeTab, setActiveTab] = useState("financial")

  // Input parameters
  const [avgSalary, setAvgSalary] = useState(120000)
  const [currentFTE, setCurrentFTE] = useState(2.5)
  const [breachInsurance, setBreachInsurance] = useState(250000)
  const [complianceFines, setComplianceFines] = useState(500000)
  const [downtime, setDowntime] = useState(24) // hours per year
  const [downtimeCost, setDowntimeCost] = useState(10000) // per hour
  const [helpDeskTickets, setHelpDeskTickets] = useState(200) // per month
  const [ticketCost, setTicketCost] = useState(50) // per ticket

  // Calculate financial benefits
  const financialBenefits = useMemo(() => {
    const industryData = INDUSTRIES[industry]
    const roiData = INDUSTRY_ROI[industry]

    // Direct cost savings
    const laborSavings = (currentFTE - 0.1) * avgSalary // Portnox requires only 0.1 FTE
    const downtimeReduction = downtime * 0.9 * downtimeCost // 90% reduction
    const helpDeskReduction = helpDeskTickets * 12 * ticketCost * 0.7 // 70% reduction

    // Risk reduction benefits
    const breachRiskReduction = industryData.avgBreachCost * 0.92 * 0.05 // 92% reduction, 5% annual probability
    const insurancePremiumReduction = breachInsurance * 0.3 // 30% reduction
    const complianceRiskReduction = complianceFines * 0.94 * 0.1 // 94% reduction, 10% annual probability

    // Productivity gains
    const userProductivity = deviceCount * 2 * 250 * (50 / 60) // 2 hours/year saved per user, $50/hour
    const itProductivity = currentFTE * avgSalary * 0.2 // 20% productivity gain

    // Portnox-specific benefits from industry data
    const industrySpecificBenefits = roiData ? roiData.totalAnnualBenefit : 0

    return {
      laborSavings,
      downtimeReduction,
      helpDeskReduction,
      breachRiskReduction,
      insurancePremiumReduction,
      complianceRiskReduction,
      userProductivity,
      itProductivity,
      industrySpecificBenefits,
      totalAnnualBenefit:
        laborSavings +
        downtimeReduction +
        helpDeskReduction +
        breachRiskReduction +
        insurancePremiumReduction +
        complianceRiskReduction +
        userProductivity +
        itProductivity,
    }
  }, [
    industry,
    deviceCount,
    avgSalary,
    currentFTE,
    breachInsurance,
    complianceFines,
    downtime,
    downtimeCost,
    helpDeskTickets,
    ticketCost,
  ])

  // Calculate Portnox investment
  const portnoxInvestment = useMemo(() => {
    const monthlyPerDevice = 4.0 // Base price
    const annualLicensing = deviceCount * monthlyPerDevice * 12
    const implementation = 5000 // Minimal implementation cost
    const training = 2000 // Minimal training cost
    const totalYear1 = annualLicensing + implementation + training

    return {
      annualLicensing,
      implementation,
      training,
      totalYear1,
      totalYear3: totalYear1 + annualLicensing * 2,
      totalYear5: totalYear1 + annualLicensing * 4,
    }
  }, [deviceCount])

  // ROI calculations
  const roiMetrics = useMemo(() => {
    const netBenefitYear1 = financialBenefits.totalAnnualBenefit - portnoxInvestment.totalYear1
    const netBenefitYear3 = financialBenefits.totalAnnualBenefit * 3 - portnoxInvestment.totalYear3
    const netBenefitYear5 = financialBenefits.totalAnnualBenefit * 5 - portnoxInvestment.totalYear5

    const roiYear1 = (netBenefitYear1 / portnoxInvestment.totalYear1) * 100
    const roiYear3 = (netBenefitYear3 / portnoxInvestment.totalYear3) * 100
    const roiYear5 = (netBenefitYear5 / portnoxInvestment.totalYear5) * 100

    const paybackMonths = portnoxInvestment.totalYear1 / (financialBenefits.totalAnnualBenefit / 12)

    return {
      netBenefitYear1,
      netBenefitYear3,
      netBenefitYear5,
      roiYear1,
      roiYear3,
      roiYear5,
      paybackMonths,
    }
  }, [financialBenefits, portnoxInvestment])

  // Chart data
  const roiTimelineData = [
    { year: 0, investment: -portnoxInvestment.totalYear1, benefit: 0, cumulative: -portnoxInvestment.totalYear1 },
    {
      year: 1,
      investment: 0,
      benefit: financialBenefits.totalAnnualBenefit,
      cumulative: financialBenefits.totalAnnualBenefit - portnoxInvestment.totalYear1,
    },
    {
      year: 2,
      investment: -portnoxInvestment.annualLicensing,
      benefit: financialBenefits.totalAnnualBenefit,
      cumulative:
        financialBenefits.totalAnnualBenefit * 2 - portnoxInvestment.totalYear1 - portnoxInvestment.annualLicensing,
    },
    {
      year: 3,
      investment: -portnoxInvestment.annualLicensing,
      benefit: financialBenefits.totalAnnualBenefit,
      cumulative: financialBenefits.totalAnnualBenefit * 3 - portnoxInvestment.totalYear3,
    },
    {
      year: 4,
      investment: -portnoxInvestment.annualLicensing,
      benefit: financialBenefits.totalAnnualBenefit,
      cumulative:
        financialBenefits.totalAnnualBenefit * 4 - portnoxInvestment.totalYear3 - portnoxInvestment.annualLicensing,
    },
    {
      year: 5,
      investment: -portnoxInvestment.annualLicensing,
      benefit: financialBenefits.totalAnnualBenefit,
      cumulative: financialBenefits.totalAnnualBenefit * 5 - portnoxInvestment.totalYear5,
    },
  ]

  const benefitBreakdownData = [
    { name: "Labor Savings", value: financialBenefits.laborSavings, color: "#10b981" },
    {
      name: "Risk Reduction",
      value: financialBenefits.breachRiskReduction + financialBenefits.complianceRiskReduction,
      color: "#3b82f6",
    },
    {
      name: "Operational Efficiency",
      value: financialBenefits.downtimeReduction + financialBenefits.helpDeskReduction,
      color: "#f59e0b",
    },
    {
      name: "Productivity Gains",
      value: financialBenefits.userProductivity + financialBenefits.itProductivity,
      color: "#8b5cf6",
    },
    { name: "Insurance Savings", value: financialBenefits.insurancePremiumReduction, color: "#ef4444" },
  ]

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return `$${value.toFixed(0)}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Calculator className="w-6 h-6 text-green-600" />
            Comprehensive ROI Calculator
          </CardTitle>
          <CardDescription>
            Calculate the complete financial impact of Portnox CLEAR for your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(financialBenefits.totalAnnualBenefit)}
              </div>
              <p className="text-sm text-muted-foreground">Annual Benefit</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{roiMetrics.roiYear3.toFixed(0)}%</div>
              <p className="text-sm text-muted-foreground">3-Year ROI</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{roiMetrics.paybackMonths.toFixed(1)} mo</div>
              <p className="text-sm text-muted-foreground">Payback Period</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{formatCurrency(roiMetrics.netBenefitYear5)}</div>
              <p className="text-sm text-muted-foreground">5-Year Net Benefit</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="financial">Financial Impact</TabsTrigger>
          <TabsTrigger value="risk">Risk Reduction</TabsTrigger>
          <TabsTrigger value="operational">Operational Benefits</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="summary">Executive Summary</TabsTrigger>
        </TabsList>

        {/* Financial Impact Tab */}
        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* ROI Timeline Chart */}
            <Card>
              <CardHeader>
                <CardTitle>ROI Timeline</CardTitle>
                <CardDescription>Investment vs. cumulative benefits over 5 years</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={roiTimelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip formatter={(value: any) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey="investment" fill="#ef4444" name="Investment" />
                    <Bar dataKey="benefit" fill="#10b981" name="Annual Benefit" />
                    <Line type="monotone" dataKey="cumulative" stroke="#3b82f6" strokeWidth={3} name="Cumulative ROI" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Benefit Breakdown Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Annual Benefit Breakdown</CardTitle>
                <CardDescription>Sources of financial value</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={benefitBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {benefitBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => formatCurrency(value)} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed financial breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Financial Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Benefits */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600">Annual Benefits</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Labor Cost Savings</span>
                      <span className="font-medium">{formatCurrency(financialBenefits.laborSavings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Downtime Reduction</span>
                      <span className="font-medium">{formatCurrency(financialBenefits.downtimeReduction)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Help Desk Reduction</span>
                      <span className="font-medium">{formatCurrency(financialBenefits.helpDeskReduction)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Breach Risk Reduction</span>
                      <span className="font-medium">{formatCurrency(financialBenefits.breachRiskReduction)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insurance Premium Reduction</span>
                      <span className="font-medium">{formatCurrency(financialBenefits.insurancePremiumReduction)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compliance Risk Reduction</span>
                      <span className="font-medium">{formatCurrency(financialBenefits.complianceRiskReduction)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>User Productivity Gains</span>
                      <span className="font-medium">{formatCurrency(financialBenefits.userProductivity)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IT Productivity Gains</span>
                      <span className="font-medium">{formatCurrency(financialBenefits.itProductivity)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-green-600">
                      <span>Total Annual Benefits</span>
                      <span>{formatCurrency(financialBenefits.totalAnnualBenefit)}</span>
                    </div>
                  </div>
                </div>

                {/* Investment */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-600">Investment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Annual Licensing</span>
                      <span className="font-medium">{formatCurrency(portnoxInvestment.annualLicensing)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Implementation (One-time)</span>
                      <span className="font-medium">{formatCurrency(portnoxInvestment.implementation)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Training (One-time)</span>
                      <span className="font-medium">{formatCurrency(portnoxInvestment.training)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-blue-600">
                      <span>Year 1 Total Investment</span>
                      <span>{formatCurrency(portnoxInvestment.totalYear1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3-Year Total Investment</span>
                      <span className="font-medium">{formatCurrency(portnoxInvestment.totalYear3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>5-Year Total Investment</span>
                      <span className="font-medium">{formatCurrency(portnoxInvestment.totalYear5)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Input parameters */}
          <Card>
            <CardHeader>
              <CardTitle>Adjust Your Parameters</CardTitle>
              <CardDescription>Customize the calculation based on your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Average IT Salary: ${avgSalary.toLocaleString()}</Label>
                    <Slider
                      value={[avgSalary]}
                      onValueChange={([value]) => setAvgSalary(value)}
                      min={80000}
                      max={200000}
                      step={5000}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Current NAC FTE: {currentFTE}</Label>
                    <Slider
                      value={[currentFTE]}
                      onValueChange={([value]) => setCurrentFTE(value)}
                      min={0.5}
                      max={5}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Annual Downtime Hours: {downtime}</Label>
                    <Slider
                      value={[downtime]}
                      onValueChange={([value]) => setDowntime(value)}
                      min={0}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Downtime Cost/Hour: ${downtimeCost.toLocaleString()}</Label>
                    <Slider
                      value={[downtimeCost]}
                      onValueChange={([value]) => setDowntimeCost(value)}
                      min={1000}
                      max={50000}
                      step={1000}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Cyber Insurance Premium: ${breachInsurance.toLocaleString()}</Label>
                    <Slider
                      value={[breachInsurance]}
                      onValueChange={([value]) => setBreachInsurance(value)}
                      min={50000}
                      max={1000000}
                      step={25000}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Potential Compliance Fines: ${complianceFines.toLocaleString()}</Label>
                    <Slider
                      value={[complianceFines]}
                      onValueChange={([value]) => setComplianceFines(value)}
                      min={100000}
                      max={5000000}
                      step={100000}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Monthly Help Desk Tickets: {helpDeskTickets}</Label>
                    <Slider
                      value={[helpDeskTickets]}
                      onValueChange={([value]) => setHelpDeskTickets(value)}
                      min={50}
                      max={1000}
                      step={25}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Cost per Ticket: ${ticketCost}</Label>
                    <Slider
                      value={[ticketCost]}
                      onValueChange={([value]) => setTicketCost(value)}
                      min={25}
                      max={200}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Reduction Tab */}
        <TabsContent value="risk" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Breach cost analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  Breach Cost Analysis
                </CardTitle>
                <CardDescription>Industry-specific breach costs and Portnox protection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Breach Cost ({INDUSTRIES[industry]?.name})</span>
                    <span className="font-bold text-red-600">
                      {formatCurrency(INDUSTRIES[industry]?.avgBreachCost || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Annual Breach Probability</span>
                    <Badge variant="destructive">5%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Portnox Risk Reduction</span>
                    <Badge variant="default" className="bg-green-600">
                      92%
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span>Annual Risk Value</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(financialBenefits.breachRiskReduction)}
                    </span>
                  </div>
                  <Progress value={92} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Portnox reduces your breach risk by 92% through AI-powered threat detection, Zero Trust
                    architecture, and continuous compliance monitoring.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Compliance risk */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Compliance Risk Reduction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>HIPAA Compliance</span>
                      <Badge variant="default" className="bg-green-600">
                        98% Coverage
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>PCI-DSS Compliance</span>
                      <Badge variant="default" className="bg-green-600">
                        96% Coverage
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>SOX Compliance</span>
                      <Badge variant="default" className="bg-green-600">
                        94% Coverage
                      </Badge>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Automated Reporting</span>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex justify-between">
                      <span>Real-time Monitoring</span>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex justify-between">
                      <span>Audit Trail</span>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                  <Alert className="bg-green-100 border-green-300">
                    <AlertDescription>
                      Annual compliance risk reduction value:{" "}
                      {formatCurrency(financialBenefits.complianceRiskReduction)}
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Historical breaches */}
          <Card>
            <CardHeader>
              <CardTitle>Major Breaches Portnox Could Have Prevented</CardTitle>
              <CardDescription>
                Real-world examples of security incidents that proper NAC would have stopped
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(PREVENTABLE_BREACHES).map(([key, breach]) => (
                  <Alert key={key} className="border-orange-200">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="font-semibold">{breach.name}</div>
                        <div className="text-sm">
                          <span className="font-medium">Impact:</span> {breach.impact}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Cost:</span> ${(breach.cost / 1000000).toFixed(0)}M
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Attack Vector:</span> {breach.vector}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Portnox Prevention:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {breach.preventable_by.map((method) => (
                              <Badge key={method} variant="secondary" className="text-xs">
                                {method}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operational Benefits Tab */}
        <TabsContent value="operational" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Labor efficiency */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Labor Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">96%</div>
                    <p className="text-sm text-muted-foreground">FTE Reduction</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current FTE</span>
                      <span>{currentFTE}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Portnox FTE</span>
                      <span>0.1</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Annual Savings</span>
                      <span>{formatCurrency(financialBenefits.laborSavings)}</span>
                    </div>
                  </div>
                  <Alert className="bg-blue-100 border-blue-300">
                    <AlertDescription className="text-sm">
                      Portnox automation eliminates 90% of manual NAC administration tasks
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Downtime reduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  Uptime Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">99.99%</div>
                    <p className="text-sm text-muted-foreground">Uptime SLA</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Downtime</span>
                      <span>{downtime} hrs/year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>With Portnox</span>
                      <span>{(downtime * 0.1).toFixed(1)} hrs/year</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Annual Savings</span>
                      <span>{formatCurrency(financialBenefits.downtimeReduction)}</span>
                    </div>
                  </div>
                  <Alert className="bg-green-100 border-green-300">
                    <AlertDescription className="text-sm">
                      Cloud-native architecture eliminates maintenance windows
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Help desk reduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Support Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">70%</div>
                    <p className="text-sm text-muted-foreground">Ticket Reduction</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Tickets</span>
                      <span>{helpDeskTickets}/month</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>With Portnox</span>
                      <span>{Math.round(helpDeskTickets * 0.3)}/month</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Annual Savings</span>
                      <span>{formatCurrency(financialBenefits.helpDeskReduction)}</span>
                    </div>
                  </div>
                  <Alert className="bg-purple-100 border-purple-300">
                    <AlertDescription className="text-sm">
                      Self-service onboarding and automated troubleshooting
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Productivity gains chart */}
          <Card>
            <CardHeader>
              <CardTitle>Productivity Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { category: "IT Staff", before: 100, after: 120, improvement: 20 },
                    { category: "End Users", before: 100, after: 105, improvement: 5 },
                    { category: "Security Team", before: 100, after: 130, improvement: 30 },
                    { category: "Compliance", before: 100, after: 150, improvement: 50 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="before" fill="#94a3b8" name="Before Portnox" />
                  <Bar dataKey="after" fill="#10b981" name="After Portnox" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scenarios Tab */}
        <TabsContent value="scenarios" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Conservative scenario */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Conservative Scenario</CardTitle>
                <CardDescription>Minimum expected benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Annual Benefit</span>
                    <span className="font-medium">{formatCurrency(financialBenefits.totalAnnualBenefit * 0.7)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3-Year ROI</span>
                    <span className="font-medium">{(roiMetrics.roiYear3 * 0.7).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payback</span>
                    <span className="font-medium">{(roiMetrics.paybackMonths / 0.7).toFixed(1)} mo</span>
                  </div>
                  <Alert className="bg-green-100 border-green-300">
                    <AlertDescription className="text-sm">
                      Even with conservative estimates, Portnox delivers strong ROI
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Realistic scenario */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600">Realistic Scenario</CardTitle>
                <CardDescription>Expected benefits based on industry data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Annual Benefit</span>
                    <span className="font-medium">{formatCurrency(financialBenefits.totalAnnualBenefit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3-Year ROI</span>
                    <span className="font-medium">{roiMetrics.roiYear3.toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payback</span>
                    <span className="font-medium">{roiMetrics.paybackMonths.toFixed(1)} mo</span>
                  </div>
                  <Alert className="bg-blue-100 border-blue-300">
                    <AlertDescription className="text-sm">
                      Most organizations achieve these results within 12 months
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Optimistic scenario */}
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-600">Optimistic Scenario</CardTitle>
                <CardDescription>Maximum potential benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Annual Benefit</span>
                    <span className="font-medium">{formatCurrency(financialBenefits.totalAnnualBenefit * 1.3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3-Year ROI</span>
                    <span className="font-medium">{(roiMetrics.roiYear3 * 1.3).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payback</span>
                    <span className="font-medium">{(roiMetrics.paybackMonths / 1.3).toFixed(1)} mo</span>
                  </div>
                  <Alert className="bg-purple-100 border-purple-300">
                    <AlertDescription className="text-sm">
                      Organizations with complex environments see higher benefits
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scenario comparison chart */}
          <Card>
            <CardHeader>
              <CardTitle>Scenario Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    {
                      scenario: "Conservative",
                      year1: roiMetrics.netBenefitYear1 * 0.7,
                      year3: roiMetrics.netBenefitYear3 * 0.7,
                      year5: roiMetrics.netBenefitYear5 * 0.7,
                    },
                    {
                      scenario: "Realistic",
                      year1: roiMetrics.netBenefitYear1,
                      year3: roiMetrics.netBenefitYear3,
                      year5: roiMetrics.netBenefitYear5,
                    },
                    {
                      scenario: "Optimistic",
                      year1: roiMetrics.netBenefitYear1 * 1.3,
                      year3: roiMetrics.netBenefitYear3 * 1.3,
                      year5: roiMetrics.netBenefitYear5 * 1.3,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="scenario" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip formatter={(value: any) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="year1" fill="#10b981" name="Year 1 Net Benefit" />
                  <Bar dataKey="year3" fill="#3b82f6" name="Year 3 Net Benefit" />
                  <Bar dataKey="year5" fill="#8b5cf6" name="Year 5 Net Benefit" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Executive Summary Tab */}
        <TabsContent value="summary" className="space-y-4">
          {/* Key metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-600">{roiMetrics.roiYear3.toFixed(0)}%</div>
                <p className="text-sm text-muted-foreground">3-Year ROI</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-blue-600">{roiMetrics.paybackMonths.toFixed(1)}</div>
                <p className="text-sm text-muted-foreground">Months to Payback</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(financialBenefits.totalAnnualBenefit)}
                </div>
                <p className="text-sm text-muted-foreground">Annual Benefit</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-orange-600">92%</div>
                <p className="text-sm text-muted-foreground">Risk Reduction</p>
              </CardContent>
            </Card>
          </div>

          {/* Executive summary */}
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="text-xl">Executive Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-lg">
                  Portnox CLEAR delivers exceptional financial returns with a{" "}
                  <strong>{roiMetrics.roiYear3.toFixed(0)}% ROI</strong> over 3 years and payback in just{" "}
                  <strong>{roiMetrics.paybackMonths.toFixed(1)} months</strong>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Key Financial Benefits:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {formatCurrency(financialBenefits.laborSavings)} annual labor savings
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {formatCurrency(financialBenefits.breachRiskReduction)} breach risk reduction
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {formatCurrency(financialBenefits.downtimeReduction)} downtime elimination
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {formatCurrency(financialBenefits.complianceRiskReduction)} compliance risk reduction
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Operational Improvements:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        96% reduction in NAC administration effort
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        70% reduction in help desk tickets
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        99.99% uptime with cloud architecture
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Automated compliance reporting
                      </li>
                    </ul>
                  </div>
                </div>

                <Alert className="bg-blue-100 border-blue-300">
                  <AlertDescription>
                    <strong>Bottom Line:</strong> Portnox CLEAR pays for itself in {roiMetrics.paybackMonths.toFixed(1)}{" "}
                    months and delivers {formatCurrency(roiMetrics.netBenefitYear5)} in net benefits over 5 years.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Next steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-600" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Schedule Executive Briefing</div>
                    <div className="text-sm text-muted-foreground">Present ROI findings to stakeholders</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-600 ml-auto" />
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Start 30-Day Pilot</div>
                    <div className="text-sm text-muted-foreground">Deploy in critical network segment</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-green-600 ml-auto" />
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-medium">Plan Full Deployment</div>
                    <div className="text-sm text-muted-foreground">Develop migration strategy</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-purple-600 ml-auto" />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button className="flex-1 bg-gradient-to-r from-green-600 to-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download ROI Report
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
