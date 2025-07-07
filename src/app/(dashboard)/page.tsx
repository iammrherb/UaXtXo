"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ConfigurationBar from "@/components/layout/ConfigurationBar"
import ExecutiveSummary from "@/components/charts/dashboards/ExecutiveSummary"
import TcoAnalysisView from "@/components/dashboard/tco/TcoAnalysisView"
import VendorComparisonView from "@/components/dashboard/vendorcomp/VendorComparisonView"
import ComplianceOverview from "@/components/charts/dashboards/ComplianceOverview"
import PortnoxPlatformView from "@/components/dashboard/portnox/PortnoxPlatformView"
import { useDashboardSettings, useDashboardDispatch } from "@/context/DashboardContext"
import {
  BarChart3,
  Shield,
  Building,
  Download,
  Share,
  Bookmark,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
} from "lucide-react"

const tabs = [
  {
    value: "executive",
    label: "Executive Summary",
    icon: TrendingUp,
    description: "High-level overview and key metrics",
  },
  {
    value: "tco-analysis",
    label: "TCO Analysis",
    icon: BarChart3,
    description: "Detailed cost breakdown and projections",
  },
  {
    value: "vendor-comparison",
    label: "Vendor Comparison",
    icon: Building,
    description: "Side-by-side vendor analysis",
  },
  {
    value: "compliance",
    label: "Compliance & Risk",
    icon: Shield,
    description: "Security and regulatory compliance",
  },
  {
    value: "portnox-platform",
    label: "Portnox Platform",
    icon: Users,
    description: "Portnox-specific features and benefits",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("executive")
  const { devices, users, selectedIndustry, comparisonYears } = useDashboardSettings()
  const dispatch = useDashboardDispatch()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Portnox TCO Analyzer
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Comprehensive Total Cost of Ownership analysis for Network Access Control solutions
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {comparisonYears} Year Analysis
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Users className="w-4 h-4 mr-1" />
              {devices.toLocaleString()} Devices
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Building className="w-4 h-4 mr-1" />
              {selectedIndustry.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Badge>
          </div>
        </motion.div>

        {/* Configuration Panel */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <ConfigurationBar />
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Portnox Advantage</p>
                  <p className="text-2xl font-bold">67% Savings</p>
                </div>
                <DollarSign className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Deployment Time</p>
                  <p className="text-2xl font-bold">7 Days</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Zero Trust Score</p>
                  <p className="text-2xl font-bold">95/100</p>
                </div>
                <Shield className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">ROI</p>
                  <p className="text-2xl font-bold">247%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5 bg-white/50 backdrop-blur-sm border">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save Analysis
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[600px]">
              <TabsContent value="executive" className="space-y-6 mt-0">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      <span>Executive Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ExecutiveSummary />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tco-analysis" className="space-y-6 mt-0">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <span>Total Cost of Ownership Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TcoAnalysisView />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vendor-comparison" className="space-y-6 mt-0">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="w-5 h-5 text-purple-600" />
                      <span>Vendor Comparison Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VendorComparisonView />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-6 mt-0">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-red-600" />
                      <span>Compliance & Risk Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ComplianceOverview />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portnox-platform" className="space-y-6 mt-0">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-emerald-600" />
                      <span>Portnox Platform Deep Dive</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PortnoxPlatformView />
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center text-sm text-muted-foreground"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <p>
            Analysis based on current market data and industry benchmarks. Results may vary based on specific
            organizational requirements.
          </p>
          <p className="mt-1">
            Last updated: {new Date().toLocaleDateString()} | Data sources: Vendor websites, industry reports, analyst
            research
          </p>
        </motion.div>
      </div>
    </div>
  )
}
