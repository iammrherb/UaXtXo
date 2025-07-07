"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, Shield, DollarSign, Clock, Award, CheckCircle, Target } from "lucide-react"

const tcoComparisonData = [
  { vendor: "Portnox", year1: 54000, year3: 162000, year5: 270000, savings: 0 },
  { vendor: "Cisco ISE", year1: 139000, year3: 417000, year5: 845000, savings: 575000 },
  { vendor: "Aruba", year1: 95000, year3: 285000, year5: 545000, savings: 275000 },
  { vendor: "Forescout", year1: 115000, year3: 345000, year5: 675000, savings: 405000 },
  { vendor: "Juniper", year1: 72000, year3: 216000, year5: 360000, savings: 90000 },
]

const zeroTrustScores = [
  { vendor: "Portnox CLEAR", score: 95, color: "#10b981" },
  { vendor: "Juniper Mist", score: 88, color: "#3b82f6" },
  { vendor: "Cisco ISE", score: 85, color: "#f59e0b" },
  { vendor: "Aruba ClearPass", score: 82, color: "#ef4444" },
  { vendor: "Forescout", score: 78, color: "#8b5cf6" },
]

const implementationTimeline = [
  { vendor: "Portnox", days: 7, complexity: "Low" },
  { vendor: "Juniper", days: 45, complexity: "Medium" },
  { vendor: "Aruba", days: 60, complexity: "High" },
  { vendor: "Cisco", days: 90, complexity: "Very High" },
  { vendor: "Forescout", days: 120, complexity: "Very High" },
]

const roiProjection = [
  { year: "Year 0", investment: -54000, savings: 0, netBenefit: -54000 },
  { year: "Year 1", investment: -54000, savings: 125000, netBenefit: 71000 },
  { year: "Year 2", investment: -108000, savings: 275000, netBenefit: 167000 },
  { year: "Year 3", investment: -162000, savings: 450000, netBenefit: 288000 },
  { year: "Year 4", investment: -216000, savings: 650000, netBenefit: 434000 },
  { year: "Year 5", investment: -270000, savings: 875000, netBenefit: 605000 },
]

export function ExecutiveSummary() {
  return (
    <div className="space-y-6">
      {/* Executive Alert */}
      <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <Award className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          <strong>Executive Recommendation:</strong> Portnox CLEAR delivers 68% lower TCO than Cisco ISE with 95% Zero
          Trust maturity and 7-day deployment. Expected 5-year savings: <strong>$575,000</strong>
        </AlertDescription>
      </Alert>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">5-Year TCO Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$575K</div>
            <p className="text-xs text-muted-foreground">vs Cisco ISE</p>
            <Progress value={68} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">68% cost reduction</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Zero Trust Maturity</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">95/100</div>
            <p className="text-xs text-muted-foreground">Industry leading</p>
            <Progress value={95} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">vs 85 avg competitor</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Implementation Speed</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">7 days</div>
            <p className="text-xs text-muted-foreground">Time to deployment</p>
            <Progress value={95} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">95% faster than ISE</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Achievement</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">247%</div>
            <p className="text-xs text-muted-foreground">24-month ROI</p>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">12mo payback period</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TCO Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle>5-Year TCO Comparison</CardTitle>
            <CardDescription>Total cost of ownership analysis across major NAC vendors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tcoComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Bar dataKey="year5" fill="#3b82f6" name="5-Year TCO" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Zero Trust Scores */}
        <Card>
          <CardHeader>
            <CardTitle>Zero Trust Security Maturity</CardTitle>
            <CardDescription>Comprehensive security capability assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {zeroTrustScores.map((item) => (
                <div key={item.vendor} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium">{item.vendor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={item.score} className="w-20" />
                    <span className="font-bold text-sm w-8">{item.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Implementation Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Timeline</CardTitle>
            <CardDescription>Time to deployment and complexity assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={implementationTimeline} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `${value}d`} />
                <YAxis dataKey="vendor" type="category" />
                <Tooltip formatter={(value) => `${value} days`} />
                <Bar dataKey="days" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ROI Projection */}
        <Card>
          <CardHeader>
            <CardTitle>ROI Projection - Portnox CLEAR</CardTitle>
            <CardDescription>5-year return on investment analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={roiProjection}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Area
                  type="monotone"
                  dataKey="netBenefit"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                  name="Net Benefit"
                />
                <Line type="monotone" dataKey="savings" stroke="#3b82f6" name="Cumulative Savings" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Recommendations */}
      <Card className="border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Immediate Actions
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• Start 24-hour Portnox POC</li>
                <li>• Assess current NAC gaps</li>
                <li>• Calculate organization-specific ROI</li>
                <li>• Plan migration timeline</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Benefits
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• 95% Zero Trust maturity</li>
                <li>• Cloud-native architecture</li>
                <li>• Real-time threat response</li>
                <li>• Automated compliance</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-purple-600 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Financial Impact
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• $575K 5-year savings vs ISE</li>
                <li>• 247% ROI in 24 months</li>
                <li>• 68% lower operational costs</li>
                <li>• Reduced insurance premiums</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
