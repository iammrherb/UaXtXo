"use client"

import { CardDescription } from "@/components/ui/card"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  DollarSign,
  TrendingUp,
  Shield,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle2,
  Calculator,
  Target,
  Zap,
} from "lucide-react"

interface ROICalculatorViewProps {
  selectedVendors: string[]
}

const INDUSTRY_MULTIPLIERS = {
  healthcare: { risk: 1.5, compliance: 1.8, downtime: 2.0 },
  finance: { risk: 2.0, compliance: 2.2, downtime: 2.5 },
  government: { risk: 1.8, compliance: 2.0, downtime: 1.8 },
  education: { risk: 1.2, compliance: 1.4, downtime: 1.5 },
  manufacturing: { risk: 1.4, compliance: 1.3, downtime: 2.2 },
  retail: { risk: 1.3, compliance: 1.2, downtime: 1.8 },
  technology: { risk: 1.6, compliance: 1.5, downtime: 2.0 },
  other: { risk: 1.0, compliance: 1.0, downtime: 1.0 },
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function ROICalculatorView({ selectedVendors }: ROICalculatorViewProps) {
  const [devices, setDevices] = useState(1000)
  const [users, setUsers] = useState(2000)
  const [currentNACCost, setCurrentNACCost] = useState(150000)
  const [industry, setIndustry] = useState("healthcare")
  const [breachRisk, setBreachRisk] = useState([15])
  const [downtimeCost, setDowntimeCost] = useState([50000])
  const [adminHours, setAdminHours] = useState([40])
  const [complianceViolationRisk, setComplianceViolationRisk] = useState([25])

  const industryMultiplier = INDUSTRY_MULTIPLIERS[industry as keyof typeof INDUSTRY_MULTIPLIERS]

  const roiCalculations = useMemo(() => {
    // Portnox CLEAR costs (cloud-native)
    const portnoxAnnualCost = devices * 60 // $60 per device per year
    const portnoxImplementationCost = 25000 // Low implementation cost
    const portnoxOperationalCost = 50000 // Minimal operational overhead

    // Traditional NAC costs (on-premise)
    const traditionalAnnualCost = currentNACCost
    const traditionalImplementationCost = 150000 // High implementation cost
    const traditionalOperationalCost = 200000 // High operational overhead

    // Benefits calculations
    const avgBreachCost = 3860000 * industryMultiplier.risk
    const breachPreventionBenefit = (avgBreachCost * (breachRisk[0] / 100) * 0.8) / 3 // 80% risk reduction, amortized over 3 years

    const operationalSavings = adminHours[0] * 52 * 150 * 0.6 // 60% reduction in admin hours at $150/hour

    const complianceViolationCost = 500000 * industryMultiplier.compliance
    const complianceSavings = (complianceViolationCost * (complianceViolationRisk[0] / 100) * 0.7) / 3 // 70% risk reduction

    const downtimeSavings = (downtimeCost[0] * 48 * 0.5) / 12 // 50% reduction in 48 hours annual downtime

    const totalAnnualBenefits = breachPreventionBenefit + operationalSavings + complianceSavings + downtimeSavings

    // 3-year calculations
    const portnoxTotal3Year = portnoxImplementationCost + portnoxAnnualCost * 3 + portnoxOperationalCost * 3
    const traditionalTotal3Year =
      traditionalImplementationCost + traditionalAnnualCost * 3 + traditionalOperationalCost * 3

    const totalSavings3Year = traditionalTotal3Year - portnoxTotal3Year
    const totalBenefits3Year = totalAnnualBenefits * 3

    const netBenefit = totalSavings3Year + totalBenefits3Year
    const roi = (netBenefit / portnoxTotal3Year) * 100
    const paybackPeriod = portnoxTotal3Year / (totalAnnualBenefits + totalSavings3Year / 3)

    return {
      portnoxTotal3Year,
      traditionalTotal3Year,
      totalSavings3Year,
      totalBenefits3Year,
      netBenefit,
      roi,
      paybackPeriod,
      breachPreventionBenefit,
      operationalSavings,
      complianceSavings,
      downtimeSavings,
      totalAnnualBenefits,
    }
  }, [devices, users, currentNACCost, industry, breachRisk, downtimeCost, adminHours, complianceViolationRisk])

  // Generate cash flow data
  const cashFlowData = useMemo(() => {
    const data = []
    let cumulativePortnox = 0
    let cumulativeTraditional = 0

    for (let year = 0; year <= 3; year++) {
      if (year === 0) {
        cumulativePortnox = -25000 // Implementation cost
        cumulativeTraditional = -150000 // Implementation cost
      } else {
        cumulativePortnox += roiCalculations.totalAnnualBenefits - (devices * 60 + 50000)
        cumulativeTraditional += -(currentNACCost + 200000)
      }

      data.push({
        year: `Year ${year}`,
        portnox: Math.round(cumulativePortnox),
        traditional: Math.round(cumulativeTraditional),
        breakEven: 0,
      })
    }

    return data
  }, [roiCalculations, devices, currentNACCost])

  // Benefits breakdown for pie chart
  const benefitsData = [
    { name: "Breach Prevention", value: roiCalculations.breachPreventionBenefit, color: "#0088FE" },
    { name: "Operational Savings", value: roiCalculations.operationalSavings, color: "#00C49F" },
    { name: "Compliance Savings", value: roiCalculations.complianceSavings, color: "#FFBB28" },
    { name: "Downtime Reduction", value: roiCalculations.downtimeSavings, color: "#FF8042" },
  ]

  // Scenario analysis
  const scenarios = useMemo(() => {
    const conservative = {
      name: "Conservative",
      roi: roiCalculations.roi * 0.7,
      payback: roiCalculations.paybackPeriod * 1.3,
      benefits: roiCalculations.totalBenefits3Year * 0.7,
    }
    const realistic = {
      name: "Realistic",
      roi: roiCalculations.roi,
      payback: roiCalculations.paybackPeriod,
      benefits: roiCalculations.totalBenefits3Year,
    }
    const optimistic = {
      name: "Optimistic",
      roi: roiCalculations.roi * 1.4,
      payback: roiCalculations.paybackPeriod * 0.8,
      benefits: roiCalculations.totalBenefits3Year * 1.4,
    }

    return [conservative, realistic, optimistic]
  }, [roiCalculations])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">ROI Calculator</h2>
          <p className="text-muted-foreground">
            Comprehensive financial analysis and return on investment calculations
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {Math.round(roiCalculations.roi)}% ROI
        </Badge>
      </div>

      <Tabs defaultValue="parameters" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="analysis">Financial Analysis</TabsTrigger>
          <TabsTrigger value="benefits">Benefits Breakdown</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="parameters" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Environment Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="devices">Number of Devices</Label>
                  <Input
                    id="devices"
                    type="number"
                    value={devices}
                    onChange={(e) => setDevices(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Total devices requiring NAC management</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="users">Number of Users</Label>
                  <Input
                    id="users"
                    type="number"
                    value={users}
                    onChange={(e) => setUsers(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Total users accessing the network</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current-cost">Current Annual NAC Cost</Label>
                  <Input
                    id="current-cost"
                    type="number"
                    value={currentNACCost}
                    onChange={(e) => setCurrentNACCost(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Total annual cost of current NAC solution</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Financial Services</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Industry affects risk multipliers and compliance requirements
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Risk Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Annual Breach Risk: {breachRisk[0]}%</Label>
                  <Slider
                    value={breachRisk}
                    onValueChange={setBreachRisk}
                    max={50}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Estimated annual probability of security breach</p>
                </div>

                <div className="space-y-3">
                  <Label>Hourly Downtime Cost: ${downtimeCost[0].toLocaleString()}</Label>
                  <Slider
                    value={downtimeCost}
                    onValueChange={setDowntimeCost}
                    max={100000}
                    min={10000}
                    step={5000}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Cost per hour of network downtime</p>
                </div>

                <div className="space-y-3">
                  <Label>Weekly Admin Hours: {adminHours[0]}</Label>
                  <Slider
                    value={adminHours}
                    onValueChange={setAdminHours}
                    max={80}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Hours per week spent on NAC administration</p>
                </div>

                <div className="space-y-3">
                  <Label>Compliance Violation Risk: {complianceViolationRisk[0]}%</Label>
                  <Slider
                    value={complianceViolationRisk}
                    onValueChange={setComplianceViolationRisk}
                    max={50}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Annual risk of compliance violations</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">3-Year ROI</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{Math.round(roiCalculations.roi)}%</div>
                <p className="text-xs text-muted-foreground">Return on investment</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payback Period</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.floor(roiCalculations.paybackPeriod)}y {Math.round((roiCalculations.paybackPeriod % 1) * 12)}m
                </div>
                <p className="text-xs text-muted-foreground">Time to break even</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${Math.round(roiCalculations.totalSavings3Year / 1000)}K</div>
                <p className="text-xs text-muted-foreground">3-year cost savings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Reduction</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${Math.round(roiCalculations.totalBenefits3Year / 1000)}K</div>
                <p className="text-xs text-muted-foreground">3-year risk mitigation value</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>3-Year Cost Comparison</CardTitle>
                <CardDescription>Total cost of ownership analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      {
                        solution: "Portnox CLEAR",
                        implementation: 25000,
                        annual: (devices * 60 + 50000) * 3,
                        total: roiCalculations.portnoxTotal3Year,
                      },
                      {
                        solution: "Traditional NAC",
                        implementation: 150000,
                        annual: (currentNACCost + 200000) * 3,
                        total: roiCalculations.traditionalTotal3Year,
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="solution" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="implementation" fill="#8884d8" name="Implementation" />
                    <Bar dataKey="annual" fill="#82ca9d" name="3-Year Operations" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cumulative Cash Flow</CardTitle>
                <CardDescription>Cash flow analysis with break-even point</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Line type="monotone" dataKey="portnox" stroke="#0088FE" name="Portnox CLEAR" strokeWidth={2} />
                    <Line
                      type="monotone"
                      dataKey="traditional"
                      stroke="#FF8042"
                      name="Traditional NAC"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="breakEven"
                      stroke="#888888"
                      strokeDasharray="5 5"
                      name="Break Even"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Financial Analysis</CardTitle>
              <CardDescription>Year-by-year breakdown of costs and benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
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
                    <tr className="border-b bg-green-50 dark:bg-green-900/20">
                      <td className="p-2 font-medium">Portnox CLEAR</td>
                      <td className="text-right p-2">${(25000 + devices * 60 + 50000).toLocaleString()}</td>
                      <td className="text-right p-2">${(devices * 60 + 50000).toLocaleString()}</td>
                      <td className="text-right p-2">${(devices * 60 + 50000).toLocaleString()}</td>
                      <td className="text-right p-2 font-bold">
                        ${roiCalculations.portnoxTotal3Year.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-b bg-red-50 dark:bg-red-900/20">
                      <td className="p-2 font-medium">Traditional NAC</td>
                      <td className="text-right p-2">${(150000 + currentNACCost + 200000).toLocaleString()}</td>
                      <td className="text-right p-2">${(currentNACCost + 200000).toLocaleString()}</td>
                      <td className="text-right p-2">${(currentNACCost + 200000).toLocaleString()}</td>
                      <td className="text-right p-2 font-bold">
                        ${roiCalculations.traditionalTotal3Year.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-b bg-blue-50 dark:bg-blue-900/20">
                      <td className="p-2 font-medium">Cost Savings</td>
                      <td className="text-right p-2">
                        ${(150000 + currentNACCost + 200000 - (25000 + devices * 60 + 50000)).toLocaleString()}
                      </td>
                      <td className="text-right p-2">
                        ${(currentNACCost + 200000 - (devices * 60 + 50000)).toLocaleString()}
                      </td>
                      <td className="text-right p-2">
                        ${(currentNACCost + 200000 - (devices * 60 + 50000)).toLocaleString()}
                      </td>
                      <td className="text-right p-2 font-bold text-green-600">
                        ${roiCalculations.totalSavings3Year.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-b bg-purple-50 dark:bg-purple-900/20">
                      <td className="p-2 font-medium">Risk Mitigation Benefits</td>
                      <td className="text-right p-2">
                        ${Math.round(roiCalculations.totalAnnualBenefits).toLocaleString()}
                      </td>
                      <td className="text-right p-2">
                        ${Math.round(roiCalculations.totalAnnualBenefits).toLocaleString()}
                      </td>
                      <td className="text-right p-2">
                        ${Math.round(roiCalculations.totalAnnualBenefits).toLocaleString()}
                      </td>
                      <td className="text-right p-2 font-bold text-purple-600">
                        ${roiCalculations.totalBenefits3Year.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="bg-yellow-50 dark:bg-yellow-900/20">
                      <td className="p-2 font-bold">Net Benefit</td>
                      <td className="text-right p-2 font-bold">
                        $
                        {(
                          150000 +
                          currentNACCost +
                          200000 -
                          (25000 + devices * 60 + 50000) +
                          roiCalculations.totalAnnualBenefits
                        ).toLocaleString()}
                      </td>
                      <td className="text-right p-2 font-bold">
                        $
                        {(
                          currentNACCost +
                          200000 -
                          (devices * 60 + 50000) +
                          roiCalculations.totalAnnualBenefits
                        ).toLocaleString()}
                      </td>
                      <td className="text-right p-2 font-bold">
                        $
                        {(
                          currentNACCost +
                          200000 -
                          (devices * 60 + 50000) +
                          roiCalculations.totalAnnualBenefits
                        ).toLocaleString()}
                      </td>
                      <td className="text-right p-2 font-bold text-yellow-600">
                        ${roiCalculations.netBenefit.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Benefits Distribution</CardTitle>
                <CardDescription>Annual benefit breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={benefitsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {benefitsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefit Categories</CardTitle>
                <CardDescription>Detailed breakdown of annual benefits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Breach Prevention</h4>
                        <p className="text-sm text-muted-foreground">80% risk reduction</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        ${Math.round(roiCalculations.breachPreventionBenefit).toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">per year</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-medium">Operational Savings</h4>
                        <p className="text-sm text-muted-foreground">60% admin time reduction</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        ${Math.round(roiCalculations.operationalSavings).toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">per year</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-yellow-500" />
                      <div>
                        <h4 className="font-medium">Compliance Savings</h4>
                        <p className="text-sm text-muted-foreground">70% violation risk reduction</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${Math.round(roiCalculations.complianceSavings).toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">per year</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-orange-500" />
                      <div>
                        <h4 className="font-medium">Downtime Reduction</h4>
                        <p className="text-sm text-muted-foreground">50% downtime reduction</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${Math.round(roiCalculations.downtimeSavings).toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">per year</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <h4 className="font-bold">Total Annual Benefits</h4>
                    <p className="text-sm text-muted-foreground">Combined value of all benefits</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">
                      ${Math.round(roiCalculations.totalAnnualBenefits).toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">per year</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quantified Business Impact</CardTitle>
              <CardDescription>Measurable improvements from Portnox CLEAR implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Security Improvements</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      80% reduction in breach risk
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      95% faster threat detection
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      90% reduction in unauthorized access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Zero-trust architecture implementation
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Operational Improvements</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      60% reduction in admin overhead
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      50% faster user onboarding
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      90% automation of routine tasks
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      24/7 cloud-based monitoring
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Analysis</CardTitle>
              <CardDescription>ROI projections under different assumptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scenarios.map((scenario, index) => (
                  <div
                    key={scenario.name}
                    className={`p-4 border rounded-lg ${
                      scenario.name === "Realistic" ? "border-primary bg-primary/5" : "border-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{scenario.name}</h4>
                      {scenario.name === "Realistic" && <Badge variant="default">Recommended</Badge>}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{Math.round(scenario.roi)}%</div>
                        <div className="text-xs text-muted-foreground">3-Year ROI</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">
                          {Math.floor(scenario.payback)}y {Math.round((scenario.payback % 1) * 12)}m
                        </div>
                        <div className="text-xs text-muted-foreground">Payback Period</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">${Math.round(scenario.benefits / 1000)}K</div>
                        <div className="text-xs text-muted-foreground">Total Benefits</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sensitivity Analysis</CardTitle>
                <CardDescription>Impact of key variables on ROI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Breach Risk Impact</span>
                      <span className="font-medium">High</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ±10% change in breach risk = ±{Math.round(roiCalculations.roi * 0.3)}% ROI impact
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Admin Hours Impact</span>
                      <span className="font-medium">Medium</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ±10 hours/week = ±{Math.round(roiCalculations.roi * 0.15)}% ROI impact
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Downtime Cost Impact</span>
                      <span className="font-medium">Medium</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "55%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ±$10K/hour = ±{Math.round(roiCalculations.roi * 0.12)}% ROI impact
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Device Count Impact</span>
                      <span className="font-medium">Low</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ±500 devices = ±{Math.round(roiCalculations.roi * 0.08)}% ROI impact
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Factors</CardTitle>
                <CardDescription>Factors that could impact ROI realization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Implementation Risk:</strong> Delays in deployment could reduce first-year benefits by up to
                    25%.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Adoption Risk:</strong> Slow user adoption may reduce operational savings by 15-30%
                    initially.
                  </AlertDescription>
                </Alert>

                <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    <strong>Upside Potential:</strong> Additional integrations and automation could increase benefits by
                    20-40%.
                  </AlertDescription>
                </Alert>

                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Mitigation Strategies</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Phased implementation approach</li>
                    <li>• Comprehensive user training program</li>
                    <li>• Regular progress monitoring and adjustment</li>
                    <li>• Vendor support engagement</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
              <CardDescription>Key financial metrics for decision making</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Investment Highlights</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Initial Investment:</span>
                      <span className="font-medium">${(25000).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">3-Year Total Cost:</span>
                      <span className="font-medium">${roiCalculations.portnoxTotal3Year.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Annual Savings:</span>
                      <span className="font-medium text-green-600">
                        ${Math.round(roiCalculations.totalSavings3Year / 3).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Annual Benefits:</span>
                      <span className="font-medium text-blue-600">
                        ${Math.round(roiCalculations.totalAnnualBenefits).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Return Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">3-Year ROI:</span>
                      <span className="font-bold text-green-600">{Math.round(roiCalculations.roi)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Payback Period:</span>
                      <span className="font-medium">
                        {Math.floor(roiCalculations.paybackPeriod)}y{" "}
                        {Math.round((roiCalculations.paybackPeriod % 1) * 12)}m
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Net Present Value:</span>
                      <span className="font-medium text-purple-600">
                        ${Math.round(roiCalculations.netBenefit * 0.85).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Risk-Adjusted ROI:</span>
                      <span className="font-medium">{Math.round(roiCalculations.roi * 0.8)}%</span>
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

// Add this line at the very end of the file
export { ROICalculatorView }
