"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, Info, Target, DollarSign, Activity, CheckCircle2 } from "lucide-react"

interface PaybackSensitivityAnalysisProps {
  baseScenario?: {
    devices: number
    breachRisk: number
    adminHours: number
    downtimeCost: number
    complianceRisk: number
  }
}

export default function PaybackSensitivityAnalysis({
  baseScenario = {
    devices: 1000,
    breachRisk: 15,
    adminHours: 40,
    downtimeCost: 50000,
    complianceRisk: 25,
  },
}: PaybackSensitivityAnalysisProps) {
  // Sensitivity analysis parameters
  const [breachRiskRange, setBreachRiskRange] = useState([baseScenario.breachRisk])
  const [adminHoursRange, setAdminHoursRange] = useState([baseScenario.adminHours])
  const [downtimeCostRange, setDowntimeCostRange] = useState([baseScenario.downtimeCost])
  const [deviceCountRange, setDeviceCountRange] = useState([baseScenario.devices])
  const [complianceRiskRange, setComplianceRiskRange] = useState([baseScenario.complianceRisk])

  // Calculate payback period for given parameters
  const calculatePaybackPeriod = (params: {
    devices: number
    breachRisk: number
    adminHours: number
    downtimeCost: number
    complianceRisk: number
  }) => {
    // Portnox CLEAR costs
    const initialInvestment = 25000
    const annualLicenseCost = params.devices * 60
    const annualOperationalCost = 50000

    // Benefits calculation
    const avgBreachCost = 3860000
    const breachPreventionBenefit = (avgBreachCost * (params.breachRisk / 100) * 0.8) / 12 // Monthly

    const operationalSavings = (params.adminHours * 52 * 150 * 0.6) / 12 // Monthly

    const complianceViolationCost = 500000
    const complianceSavings = (complianceViolationCost * (params.complianceRisk / 100) * 0.7) / 12 // Monthly

    const downtimeSavings = (params.downtimeCost * 48 * 0.5) / 12 // Monthly

    const totalMonthlyBenefits = breachPreventionBenefit + operationalSavings + complianceSavings + downtimeSavings
    const totalMonthlyCosts = (annualLicenseCost + annualOperationalCost) / 12
    const netMonthlyBenefit = totalMonthlyBenefits - totalMonthlyCosts

    // Payback period in months
    const paybackPeriod = netMonthlyBenefit > 0 ? initialInvestment / netMonthlyBenefit : 999

    return {
      paybackPeriod: Math.max(0.1, Math.min(36, paybackPeriod)),
      monthlyBenefit: totalMonthlyBenefits,
      monthlyCost: totalMonthlyCosts,
      netMonthlyBenefit,
      totalAnnualROI: netMonthlyBenefit * 12,
    }
  }

  // Base case calculation
  const baseCase = useMemo(() => calculatePaybackPeriod(baseScenario), [baseScenario])

  // Sensitivity analysis data
  const sensitivityData = useMemo(() => {
    const variables = [
      {
        name: "Breach Risk",
        baseValue: baseScenario.breachRisk,
        currentValue: breachRiskRange[0],
        range: [-50, 50], // Percentage change
        unit: "%",
        impact: "High",
      },
      {
        name: "Admin Hours",
        baseValue: baseScenario.adminHours,
        currentValue: adminHoursRange[0],
        range: [-50, 100], // Percentage change
        unit: "hrs/week",
        impact: "Medium",
      },
      {
        name: "Downtime Cost",
        baseValue: baseScenario.downtimeCost,
        currentValue: downtimeCostRange[0],
        range: [-50, 100], // Percentage change
        unit: "$/hour",
        impact: "Medium",
      },
      {
        name: "Device Count",
        baseValue: baseScenario.devices,
        currentValue: deviceCountRange[0],
        range: [-50, 200], // Percentage change
        unit: "devices",
        impact: "Low",
      },
      {
        name: "Compliance Risk",
        baseValue: baseScenario.complianceRisk,
        currentValue: complianceRiskRange[0],
        range: [-50, 50], // Percentage change
        unit: "%",
        impact: "Medium",
      },
    ]

    return variables.map((variable) => {
      const variations = []
      for (let change = variable.range[0]; change <= variable.range[1]; change += 10) {
        const adjustedValue = variable.baseValue * (1 + change / 100)
        const testScenario = { ...baseScenario }

        switch (variable.name) {
          case "Breach Risk":
            testScenario.breachRisk = Math.max(1, Math.min(50, adjustedValue))
            break
          case "Admin Hours":
            testScenario.adminHours = Math.max(10, Math.min(80, adjustedValue))
            break
          case "Downtime Cost":
            testScenario.downtimeCost = Math.max(10000, Math.min(200000, adjustedValue))
            break
          case "Device Count":
            testScenario.devices = Math.max(100, Math.min(10000, adjustedValue))
            break
          case "Compliance Risk":
            testScenario.complianceRisk = Math.max(1, Math.min(50, adjustedValue))
            break
        }

        const result = calculatePaybackPeriod(testScenario)
        variations.push({
          change,
          adjustedValue,
          paybackPeriod: result.paybackPeriod,
          roi: result.totalAnnualROI,
        })
      }

      return {
        ...variable,
        variations,
        currentPayback: calculatePaybackPeriod({
          ...baseScenario,
          [variable.name === "Breach Risk"
            ? "breachRisk"
            : variable.name === "Admin Hours"
              ? "adminHours"
              : variable.name === "Downtime Cost"
                ? "downtimeCost"
                : variable.name === "Device Count"
                  ? "devices"
                  : "complianceRisk"]: variable.currentValue,
        }).paybackPeriod,
      }
    })
  }, [baseScenario, breachRiskRange, adminHoursRange, downtimeCostRange, deviceCountRange, complianceRiskRange])

  // Current scenario calculation
  const currentScenario = useMemo(() => {
    return calculatePaybackPeriod({
      devices: deviceCountRange[0],
      breachRisk: breachRiskRange[0],
      adminHours: adminHoursRange[0],
      downtimeCost: downtimeCostRange[0],
      complianceRisk: complianceRiskRange[0],
    })
  }, [deviceCountRange, breachRiskRange, adminHoursRange, downtimeCostRange, complianceRiskRange])

  // Tornado chart data (impact of each variable)
  const tornadoData = sensitivityData
    .map((variable) => {
      const minPayback = Math.min(...variable.variations.map((v) => v.paybackPeriod))
      const maxPayback = Math.max(...variable.variations.map((v) => v.paybackPeriod))
      const impact = maxPayback - minPayback

      return {
        name: variable.name,
        impact,
        minPayback,
        maxPayback,
        basePayback: baseCase.paybackPeriod,
        impactLevel: variable.impact,
      }
    })
    .sort((a, b) => b.impact - a.impact)

  // Monte Carlo simulation data
  const monteCarloData = useMemo(() => {
    const simulations = 1000
    const results = []

    for (let i = 0; i < simulations; i++) {
      // Random variations within realistic ranges
      const scenario = {
        devices: baseScenario.devices * (0.8 + Math.random() * 0.4), // ±20%
        breachRisk: Math.max(5, Math.min(30, baseScenario.breachRisk * (0.7 + Math.random() * 0.6))), // ±30%
        adminHours: Math.max(20, Math.min(60, baseScenario.adminHours * (0.8 + Math.random() * 0.4))), // ±20%
        downtimeCost: baseScenario.downtimeCost * (0.6 + Math.random() * 0.8), // ±40%
        complianceRisk: Math.max(10, Math.min(40, baseScenario.complianceRisk * (0.7 + Math.random() * 0.6))), // ±30%
      }

      const result = calculatePaybackPeriod(scenario)
      results.push({
        simulation: i + 1,
        paybackPeriod: result.paybackPeriod,
        roi: result.totalAnnualROI,
      })
    }

    return results
  }, [baseScenario])

  // Statistical analysis of Monte Carlo results
  const monteCarloStats = useMemo(() => {
    const paybackPeriods = monteCarloData.map((d) => d.paybackPeriod).sort((a, b) => a - b)
    const rois = monteCarloData.map((d) => d.roi).sort((a, b) => a - b)

    return {
      payback: {
        mean: paybackPeriods.reduce((sum, val) => sum + val, 0) / paybackPeriods.length,
        median: paybackPeriods[Math.floor(paybackPeriods.length / 2)],
        p10: paybackPeriods[Math.floor(paybackPeriods.length * 0.1)],
        p90: paybackPeriods[Math.floor(paybackPeriods.length * 0.9)],
        min: Math.min(...paybackPeriods),
        max: Math.max(...paybackPeriods),
      },
      roi: {
        mean: rois.reduce((sum, val) => sum + val, 0) / rois.length,
        median: rois[Math.floor(rois.length / 2)],
        p10: rois[Math.floor(rois.length * 0.1)],
        p90: rois[Math.floor(rois.length * 0.9)],
        min: Math.min(...rois),
        max: Math.max(...rois),
      },
    }
  }, [monteCarloData])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payback Sensitivity Analysis</h2>
          <p className="text-muted-foreground">Analyze how key variables impact payback timing and ROI</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            Base: {baseCase.paybackPeriod.toFixed(1)} months
          </Badge>
          <Badge variant="default" className="text-lg px-4 py-2">
            Current: {currentScenario.paybackPeriod.toFixed(1)} months
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="interactive" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="interactive">Interactive Analysis</TabsTrigger>
          <TabsTrigger value="tornado">Impact Ranking</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Planning</TabsTrigger>
          <TabsTrigger value="monte-carlo">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="interactive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Variable Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Breach Risk: {breachRiskRange[0]}%</Label>
                  <Slider
                    value={breachRiskRange}
                    onValueChange={setBreachRiskRange}
                    max={50}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Annual probability of security breach</p>
                </div>

                <div className="space-y-3">
                  <Label>Admin Hours: {adminHoursRange[0]} hrs/week</Label>
                  <Slider
                    value={adminHoursRange}
                    onValueChange={setAdminHoursRange}
                    max={80}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Weekly hours spent on NAC administration</p>
                </div>

                <div className="space-y-3">
                  <Label>Downtime Cost: ${downtimeCostRange[0].toLocaleString()}/hour</Label>
                  <Slider
                    value={downtimeCostRange}
                    onValueChange={setDowntimeCostRange}
                    max={200000}
                    min={10000}
                    step={5000}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Cost per hour of network downtime</p>
                </div>

                <div className="space-y-3">
                  <Label>Device Count: {deviceCountRange[0].toLocaleString()}</Label>
                  <Slider
                    value={deviceCountRange}
                    onValueChange={setDeviceCountRange}
                    max={5000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Total devices requiring NAC management</p>
                </div>

                <div className="space-y-3">
                  <Label>Compliance Risk: {complianceRiskRange[0]}%</Label>
                  <Slider
                    value={complianceRiskRange}
                    onValueChange={setComplianceRiskRange}
                    max={50}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Annual risk of compliance violations</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Real-time Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{currentScenario.paybackPeriod.toFixed(1)}</div>
                    <div className="text-sm text-muted-foreground">Months to Payback</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ${Math.round(currentScenario.totalAnnualROI / 1000)}K
                    </div>
                    <div className="text-sm text-muted-foreground">Annual ROI</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">vs. Base Case</span>
                    <Badge
                      variant={
                        currentScenario.paybackPeriod < baseCase.paybackPeriod
                          ? "default"
                          : currentScenario.paybackPeriod > baseCase.paybackPeriod
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {currentScenario.paybackPeriod < baseCase.paybackPeriod
                        ? `${(baseCase.paybackPeriod - currentScenario.paybackPeriod).toFixed(1)} months faster`
                        : currentScenario.paybackPeriod > baseCase.paybackPeriod
                          ? `${(currentScenario.paybackPeriod - baseCase.paybackPeriod).toFixed(1)} months slower`
                          : "Same"}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Benefit Breakdown (Monthly)</h4>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span>Breach Prevention:</span>
                        <span>${Math.round((currentScenario.monthlyBenefit * 0.6) / 1000)}K</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Operational Savings:</span>
                        <span>${Math.round((currentScenario.monthlyBenefit * 0.25) / 1000)}K</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compliance Savings:</span>
                        <span>${Math.round((currentScenario.monthlyBenefit * 0.15) / 1000)}K</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {currentScenario.paybackPeriod < 1
                      ? "Exceptional payback - benefits exceed costs immediately"
                      : currentScenario.paybackPeriod < 6
                        ? "Excellent payback period - strong business case"
                        : currentScenario.paybackPeriod < 12
                          ? "Good payback period - solid investment"
                          : "Extended payback - review assumptions"}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sensitivity Curves</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="change" domain={[-50, 100]} tickFormatter={(value) => `${value}%`} />
                  <YAxis
                    tickFormatter={(value) => `${value.toFixed(1)}m`}
                    label={{ value: "Payback Period (months)", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    formatter={(value, name) => [`${Number(value).toFixed(1)} months`, name]}
                    labelFormatter={(value) => `${value}% change`}
                  />
                  <Legend />
                  <ReferenceLine y={baseCase.paybackPeriod} stroke="#888" strokeDasharray="5 5" />
                  {sensitivityData.map((variable, index) => (
                    <Line
                      key={variable.name}
                      type="monotone"
                      dataKey="paybackPeriod"
                      data={variable.variations}
                      stroke={COLORS[index % COLORS.length]}
                      name={variable.name}
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tornado" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Variable Impact Ranking (Tornado Chart)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={tornadoData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `${value.toFixed(1)}m`} />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip formatter={(value) => [`${Number(value).toFixed(1)} months`, "Impact Range"]} />
                  <Bar dataKey="impact" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tornadoData.map((variable, index) => (
                  <div key={variable.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{variable.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {variable.minPayback.toFixed(1)} - {variable.maxPayback.toFixed(1)} months
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          variable.impactLevel === "High"
                            ? "destructive"
                            : variable.impactLevel === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {variable.impactLevel}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">±{(variable.impact / 2).toFixed(1)}m</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Breach Risk</strong> has the highest impact on payback timing. A 10% increase in breach
                    probability can reduce payback by 2-3 months.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Activity className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Admin Hours</strong> significantly affect operational savings. Reducing admin overhead by
                    50% improves payback by 1-2 months.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <DollarSign className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Downtime Costs</strong> create substantial value when reduced. High-availability
                    environments see faster payback.
                  </AlertDescription>
                </Alert>

                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Optimization Strategies</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Focus on high-risk environments for faster ROI</li>
                    <li>• Quantify current admin overhead accurately</li>
                    <li>• Include all downtime costs in calculations</li>
                    <li>• Consider compliance penalty avoidance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Conservative",
                description: "Lower benefits, higher costs",
                multiplier: 0.7,
                color: "bg-red-50 border-red-200",
              },
              {
                name: "Realistic",
                description: "Expected scenario",
                multiplier: 1.0,
                color: "bg-blue-50 border-blue-200",
              },
              {
                name: "Optimistic",
                description: "Higher benefits, lower costs",
                multiplier: 1.4,
                color: "bg-green-50 border-green-200",
              },
            ].map((scenario) => {
              const scenarioResult = calculatePaybackPeriod({
                devices: baseScenario.devices,
                breachRisk: baseScenario.breachRisk * scenario.multiplier,
                adminHours: baseScenario.adminHours,
                downtimeCost: baseScenario.downtimeCost * scenario.multiplier,
                complianceRisk: baseScenario.complianceRisk * scenario.multiplier,
              })

              return (
                <Card key={scenario.name} className={`${scenario.color}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{scenario.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{scenario.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{scenarioResult.paybackPeriod.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">months</div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Annual ROI:</span>
                          <span className="font-medium">${Math.round(scenarioResult.totalAnnualROI / 1000)}K</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Benefit:</span>
                          <span className="font-medium">${Math.round(scenarioResult.monthlyBenefit / 1000)}K</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Net Monthly:</span>
                          <span className="font-medium">${Math.round(scenarioResult.netMonthlyBenefit / 1000)}K</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

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
                      payback: calculatePaybackPeriod({
                        ...baseScenario,
                        breachRisk: baseScenario.breachRisk * 0.7,
                        downtimeCost: baseScenario.downtimeCost * 0.7,
                        complianceRisk: baseScenario.complianceRisk * 0.7,
                      }).paybackPeriod,
                      roi:
                        calculatePaybackPeriod({
                          ...baseScenario,
                          breachRisk: baseScenario.breachRisk * 0.7,
                          downtimeCost: baseScenario.downtimeCost * 0.7,
                          complianceRisk: baseScenario.complianceRisk * 0.7,
                        }).totalAnnualROI / 1000,
                    },
                    {
                      scenario: "Realistic",
                      payback: baseCase.paybackPeriod,
                      roi: baseCase.totalAnnualROI / 1000,
                    },
                    {
                      scenario: "Optimistic",
                      payback: calculatePaybackPeriod({
                        ...baseScenario,
                        breachRisk: baseScenario.breachRisk * 1.4,
                        downtimeCost: baseScenario.downtimeCost * 1.4,
                        complianceRisk: baseScenario.complianceRisk * 1.4,
                      }).paybackPeriod,
                      roi:
                        calculatePaybackPeriod({
                          ...baseScenario,
                          breachRisk: baseScenario.breachRisk * 1.4,
                          downtimeCost: baseScenario.downtimeCost * 1.4,
                          complianceRisk: baseScenario.complianceRisk * 1.4,
                        }).totalAnnualROI / 1000,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="scenario" />
                  <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => `${value.toFixed(1)}m`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `$${value}K`} />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "payback" ? `${Number(value).toFixed(1)} months` : `$${Math.round(Number(value))}K`,
                      name === "payback" ? "Payback Period" : "Annual ROI",
                    ]}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="payback" fill="#8884d8" name="Payback Period (months)" />
                  <Bar yAxisId="right" dataKey="roi" fill="#82ca9d" name="Annual ROI ($K)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monte-carlo" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monte Carlo Simulation Results</CardTitle>
                <p className="text-sm text-muted-foreground">1,000 simulations with random variable distributions</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{monteCarloStats.payback.median.toFixed(1)}</div>
                    <div className="text-sm text-muted-foreground">Median Payback</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-xl font-bold text-green-600">
                      ${Math.round(monteCarloStats.roi.median / 1000)}K
                    </div>
                    <div className="text-sm text-muted-foreground">Median ROI</div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>10th Percentile:</span>
                    <span>{monteCarloStats.payback.p10.toFixed(1)} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>90th Percentile:</span>
                    <span>{monteCarloStats.payback.p90.toFixed(1)} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Case:</span>
                    <span>{monteCarloStats.payback.min.toFixed(1)} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Worst Case:</span>
                    <span>{monteCarloStats.payback.max.toFixed(1)} months</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart
                    data={Array.from({ length: 20 }, (_, i) => {
                      const bucket = i * 2 // 2-month buckets
                      const count = monteCarloData.filter(
                        (d) => d.paybackPeriod >= bucket && d.paybackPeriod < bucket + 2,
                      ).length
                      return {
                        bucket: `${bucket}-${bucket + 2}`,
                        count,
                        probability: (count / monteCarloData.length) * 100,
                      }
                    })}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bucket" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, "Probability"]} />
                    <Area type="monotone" dataKey="probability" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    <strong>90% Confidence:</strong> Payback within {monteCarloStats.payback.p90.toFixed(1)} months
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Target className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Expected Value:</strong> {monteCarloStats.payback.mean.toFixed(1)} months average payback
                  </AlertDescription>
                </Alert>

                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Upside Potential:</strong> Best case {monteCarloStats.payback.min.toFixed(1)} months
                  </AlertDescription>
                </Alert>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-3">Key Risk Factors</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium mb-2">Controllable Risks:</h5>
                    <ul className="space-y-1">
                      <li>• Implementation timeline adherence</li>
                      <li>• User adoption and training</li>
                      <li>• Integration complexity management</li>
                      <li>• Change management effectiveness</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">External Risks:</h5>
                    <ul className="space-y-1">
                      <li>• Market breach frequency changes</li>
                      <li>• Regulatory requirement evolution</li>
                      <li>• Technology landscape shifts</li>
                      <li>• Economic condition impacts</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <h4 className="font-semibold">Investment Recommendation</h4>
                  <p className="text-sm text-muted-foreground">Based on {monteCarloData.length} simulation scenarios</p>
                </div>
                <Badge variant="default" className="text-lg px-4 py-2">
                  {monteCarloStats.payback.p90 < 12
                    ? "STRONG BUY"
                    : monteCarloStats.payback.p90 < 24
                      ? "BUY"
                      : "CONSIDER"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
