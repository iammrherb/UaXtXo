"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ConfigurationBar } from "@/components/layout/ConfigurationBar"
import { TcoAnalysisView } from "@/components/dashboard/tco/TcoAnalysisView"
import { VendorComparisonView } from "@/components/dashboard/vendorcomp/VendorComparisonView"
import { PortnoxPlatformView } from "@/components/dashboard/portnox/PortnoxPlatformView"
import { ExecutiveSummary } from "@/components/charts/dashboards/ExecutiveSummary"
import { ComplianceOverview } from "@/components/charts/dashboards/ComplianceOverview"
import { Shield, TrendingUp, Award, CheckCircle, AlertTriangle } from "lucide-react"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Zero Trust Cost Analyzer
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive NAC vendor comparison with security metrics, compliance mapping, and TCO analysis
          </p>
        </div>

        {/* Configuration Bar */}
        <ConfigurationBar />

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portnox Advantage</CardTitle>
              <Award className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">68%</div>
              <p className="text-xs text-muted-foreground">Lower TCO vs Cisco ISE</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Zero Trust Score</CardTitle>
              <Shield className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">95/100</div>
              <p className="text-xs text-muted-foreground">Industry leading security</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROI Timeline</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">12 mo</div>
              <p className="text-xs text-muted-foreground">Payback period</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Implementation</CardTitle>
              <CheckCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">7 days</div>
              <p className="text-xs text-muted-foreground">Time to deployment</p>
            </CardContent>
          </Card>
        </div>

        {/* Executive Alert */}
        <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>Executive Insight:</strong> Organizations switching to Portnox CLEAR achieve an average of
            <span className="font-bold"> $575,000 in 5-year savings</span> compared to Cisco ISE, with
            <span className="font-bold"> 95% faster deployment</span> and superior Zero Trust capabilities.
          </AlertDescription>
        </Alert>

        {/* Main Analysis Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Executive Summary</TabsTrigger>
            <TabsTrigger value="tco">TCO Analysis</TabsTrigger>
            <TabsTrigger value="vendors">Vendor Comparison</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="portnox">Portnox Platform</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ExecutiveSummary />
          </TabsContent>

          <TabsContent value="tco" className="space-y-6">
            <TcoAnalysisView />
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            <VendorComparisonView />
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <ComplianceOverview />
          </TabsContent>

          <TabsContent value="portnox" className="space-y-6">
            <PortnoxPlatformView />
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <Card className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <Award className="h-5 w-5" />
              Ready to Experience Portnox CLEAR?
            </CardTitle>
            <CardDescription>
              Start your 24-hour proof of concept and see the difference cloud-native NAC makes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Start 24-Hour POC
              </Button>
              <Button variant="outline" size="lg">
                Schedule Executive Briefing
              </Button>
              <Button variant="ghost" size="lg">
                Download Full Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
