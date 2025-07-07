"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TrendingUp, Shield, DollarSign, Clock, Award, Zap, Target, Eye, Download, Share2 } from "lucide-react"
import ChartComparisonView from "./ChartComparisonView"
import InteractiveTCOChart from "../advanced/InteractiveTCOChart"

// Sample drill-down data for the interactive charts
const sampleDrillDownLevels = [
  {
    id: "tco-breakdown",
    title: "TCO Cost Breakdown",
    chartType: "pie" as const,
    parentId: "root",
    data: [
      { name: "Licensing", value: 135000, category: "Software" },
      { name: "Implementation", value: 15000, category: "Services" },
      { name: "Maintenance", value: 27000, category: "Support" },
      { name: "Training", value: 2500, category: "Services" },
      { name: "Staffing", value: 90000, category: "Personnel" },
    ],
    filters: [
      {
        id: "category",
        label: "Cost Category",
        type: "select" as const,
        options: ["Software", "Services", "Support", "Personnel"],
      },
      {
        id: "timeframe",
        label: "Time Frame",
        type: "select" as const,
        options: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
      },
    ],
  },
  {
    id: "licensing-details",
    title: "Licensing Cost Details",
    chartType: "bar" as const,
    parentId: "tco-breakdown",
    data: [
      { name: "Base License", value: 108000, vendor: "portnox" },
      { name: "Premium Features", value: 18000, vendor: "portnox" },
      { name: "API Access", value: 6000, vendor: "portnox" },
      { name: "Mobile App", value: 3000, vendor: "portnox" },
    ],
    filters: [
      {
        id: "license_type",
        label: "License Type",
        type: "select" as const,
        options: ["Base License", "Premium Features", "API Access", "Mobile App"],
      },
    ],
  },
  {
    id: "roi-breakdown",
    title: "ROI Components Analysis",
    chartType: "area" as const,
    parentId: "root",
    data: [
      { name: "Q1", breachReduction: 112500, operationalSavings: 31250, complianceSavings: 18750 },
      { name: "Q2", breachReduction: 112500, operationalSavings: 31250, complianceSavings: 18750 },
      { name: "Q3", breachReduction: 112500, operationalSavings: 31250, complianceSavings: 18750 },
      { name: "Q4", breachReduction: 112500, operationalSavings: 31250, complianceSavings: 18750 },
    ],
    filters: [
      {
        id: "quarter",
        label: "Quarter",
        type: "select" as const,
        options: ["Q1", "Q2", "Q3", "Q4"],
      },
    ],
  },
]

const sampleTCOData = [
  { name: "Portnox CLEAR", value: 269500, vendor: "portnox", category: "Cloud-Native" },
  { name: "Cisco ISE", value: 771250, vendor: "cisco", category: "Traditional" },
  { name: "Aruba ClearPass", value: 546750, vendor: "aruba", category: "Traditional" },
  { name: "Forescout", value: 659500, vendor: "forescout", category: "Traditional" },
]

const ComparisonDashboard: React.FC = () => {
  const [activeComparison, setActiveComparison] = useState<"tco" | "features" | "roi">("tco")
  const [selectedVendors, setSelectedVendors] = useState(["portnox", "cisco", "aruba"])

  const comparisonInsights = {
    tco: {
      title: "Total Cost of Ownership Analysis",
      description: "5-year comprehensive cost comparison across all NAC vendors",
      keyInsight: "Portnox CLEAR delivers 65% lower TCO than Cisco ISE over 5 years",
      savings: "$501,750",
      icon: DollarSign,
      color: "text-green-600",
    },
    features: {
      title: "Feature Capability Comparison",
      description: "Detailed analysis of security, usability, and technical capabilities",
      keyInsight: "Portnox leads in 6 out of 8 key feature categories",
      savings: "95/100 avg score",
      icon: Shield,
      color: "text-blue-600",
    },
    roi: {
      title: "Return on Investment Analysis",
      description: "Business value and financial benefits comparison",
      keyInsight: "247% ROI with 12-month payback period for Portnox",
      savings: "$760K annual benefits",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  }

  const currentInsight = comparisonInsights[activeComparison]

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Vendor Comparison Dashboard</h1>
          <p className="text-slate-400 mt-1">Comprehensive side-by-side analysis of NAC vendors across key metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share Analysis
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(comparisonInsights).map(([key, insight]) => (
          <Card
            key={key}
            className={`cursor-pointer transition-all duration-200 ${
              activeComparison === key
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                : "border-slate-700 bg-slate-900/50 hover:border-slate-600"
            }`}
            onClick={() => setActiveComparison(key as any)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">{insight.title}</CardTitle>
              <insight.icon className={`h-4 w-4 ${insight.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${insight.color}`}>{insight.savings}</div>
              <p className="text-xs text-slate-400 mt-1">{insight.keyInsight}</p>
              {activeComparison === key && (
                <Badge variant="default" className="mt-2">
                  Active Analysis
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Analysis Alert */}
      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
        <currentInsight.icon className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Current Analysis:</strong> {currentInsight.description}
          <br />
          <strong>Key Finding:</strong> {currentInsight.keyInsight}
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="comparison" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="comparison">Side-by-Side Comparison</TabsTrigger>
          <TabsTrigger value="interactive">Interactive Analysis</TabsTrigger>
          <TabsTrigger value="drill-down">Detailed Breakdown</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          <ChartComparisonView defaultVendors={selectedVendors} defaultMetric={activeComparison} enableExport={true} />
        </TabsContent>

        <TabsContent value="interactive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Primary Interactive Chart */}
            <InteractiveTCOChart
              initialData={sampleTCOData}
              title="Interactive TCO Analysis"
              enableRealTime={true}
              drillDownLevels={sampleDrillDownLevels}
              enableFiltering={true}
              enableExport={true}
            />

            {/* Secondary Comparison Chart */}
            <InteractiveTCOChart
              initialData={sampleTCOData.map((item) => ({
                ...item,
                value: item.value * 0.8 + Math.random() * item.value * 0.4, // Simulate different metric
              }))}
              title="Feature Score Comparison"
              enableRealTime={false}
              drillDownLevels={[]}
              enableFiltering={true}
              enableExport={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="drill-down" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Detailed Breakdown with Full Drill-Down */}
            <InteractiveTCOChart
              initialData={sampleTCOData}
              title="Comprehensive Cost Breakdown Analysis"
              enableRealTime={true}
              drillDownLevels={sampleDrillDownLevels}
              enableFiltering={true}
              enableExport={true}
              className="min-h-[600px]"
            />

            {/* Cost Category Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { category: "Licensing", amount: "$135K", change: "-65%", trend: "down", color: "green" },
                { category: "Implementation", amount: "$15K", change: "-67%", trend: "down", color: "green" },
                { category: "Infrastructure", amount: "$0", change: "-100%", trend: "down", color: "green" },
                { category: "Staffing", amount: "$90K", change: "-67%", trend: "down", color: "green" },
              ].map((item) => (
                <Card key={item.category} className="bg-slate-900/50 border-slate-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-300">{item.category}</CardTitle>
                    <Badge variant={item.color === "green" ? "default" : "destructive"}>{item.change}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{item.amount}</div>
                    <p className="text-xs text-slate-400">vs Cisco ISE</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI-Generated Insights */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <Target className="w-4 h-4" />
                    <span className="font-semibold">Cost Optimization</span>
                  </div>
                  <p className="text-sm text-green-300">
                    Portnox CLEAR's cloud-native architecture eliminates 100% of infrastructure costs, resulting in
                    $125K savings over 5 years compared to traditional solutions.
                  </p>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">Deployment Speed</span>
                  </div>
                  <p className="text-sm text-blue-300">
                    7-day deployment vs 90+ days for traditional NAC solutions represents 92% faster time-to-value and
                    reduced opportunity costs.
                  </p>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-purple-400 mb-2">
                    <Shield className="w-4 h-4" />
                    <span className="font-semibold">Security Advantage</span>
                  </div>
                  <p className="text-sm text-purple-300">
                    95/100 Zero Trust maturity score provides 87% breach risk reduction, translating to $450K annual
                    risk mitigation value.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recommendation Engine */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Award className="w-5 h-5 text-blue-500" />
                  Smart Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-white">Immediate Action</h4>
                      <p className="text-sm text-slate-300">
                        Schedule Portnox CLEAR demo to validate 24-hour proof of concept capabilities
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-white">Strategic Planning</h4>
                      <p className="text-sm text-slate-300">
                        Plan cloud-first NAC migration to achieve 65% TCO reduction over 5 years
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-white">Risk Mitigation</h4>
                      <p className="text-sm text-slate-300">
                        Implement Zero Trust NAC to reduce breach probability by 87%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-white">Budget Optimization</h4>
                      <p className="text-sm text-slate-300">
                        Reallocate $500K+ in infrastructure savings to other security initiatives
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Next Steps</h4>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                      Schedule Portnox Demo
                    </Button>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Download Detailed Report
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full">
                      Contact Sales Team
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Competitive Analysis Summary */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Eye className="w-5 h-5 text-cyan-500" />
                Competitive Analysis Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-400">Portnox Advantages</h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• 65% lower TCO than Cisco ISE</li>
                    <li>• 92% faster deployment (7 vs 90 days)</li>
                    <li>• 100% cloud-native architecture</li>
                    <li>• 95/100 Zero Trust maturity score</li>
                    <li>• No infrastructure requirements</li>
                    <li>• 247% ROI with 12-month payback</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-yellow-400">Market Positioning</h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• Leader in cloud-native NAC</li>
                    <li>• Fastest growing NAC vendor</li>
                    <li>• Highest customer satisfaction</li>
                    <li>• Most comprehensive Zero Trust</li>
                    <li>• Best ease-of-use ratings</li>
                    <li>• Strongest ROI metrics</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-400">Business Impact</h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• $760K annual business benefits</li>
                    <li>• 87% breach risk reduction</li>
                    <li>• 90% automation level</li>
                    <li>• 5 hours/week admin effort</li>
                    <li>• 30% insurance premium discount</li>
                    <li>• 65% audit cost reduction</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ComparisonDashboard
