"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import IndustryBenchmarkAnalyzer from "@/components/benchmarking/IndustryBenchmarkAnalyzer"
import PeerAnalysisEngine from "@/components/benchmarking/PeerAnalysisEngine"
import MarketTrendAnalyzer from "@/components/benchmarking/MarketTrendAnalyzer"
import { Building, Users, TrendingUp, BarChart3, Target, Globe, Download, Share } from "lucide-react"

export default function BenchmarkingPage() {
  const [activeTab, setActiveTab] = useState("industry")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Industry Benchmarking Suite</h1>
              <p className="text-slate-400 text-lg">
                Compare your NAC investment against industry standards, peer organizations, and market trends
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export All Reports
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
                <Share className="h-4 w-4 mr-2" />
                Share Analysis
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-400" />
                Industry Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400 mb-1">1,200+</div>
              <div className="text-sm text-slate-400">Organizations analyzed</div>
              <div className="text-xs text-slate-500 mt-1">Across 5 major industries</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-400" />
                Peer Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-400 mb-1">350+</div>
              <div className="text-sm text-slate-400">Similar organizations</div>
              <div className="text-xs text-slate-500 mt-1">Anonymized peer data</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                Market Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400 mb-1">15+</div>
              <div className="text-sm text-slate-400">Key trends tracked</div>
              <div className="text-xs text-slate-500 mt-1">Real-time market data</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400 mb-1">87%</div>
              <div className="text-sm text-slate-400">Forecast accuracy</div>
              <div className="text-xs text-slate-500 mt-1">Validated predictions</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Benchmarking Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-2xl grid-cols-3 bg-slate-800/50 border border-slate-700/50">
              <TabsTrigger
                value="industry"
                className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
              >
                <BarChart3 className="h-4 w-4" />
                Industry Benchmarks
              </TabsTrigger>
              <TabsTrigger
                value="peers"
                className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
              >
                <Users className="h-4 w-4" />
                Peer Analysis
              </TabsTrigger>
              <TabsTrigger
                value="trends"
                className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
              >
                <Globe className="h-4 w-4" />
                Market Trends
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                Live Data
              </Badge>
              <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                Updated Daily
              </Badge>
            </div>
          </div>

          {/* Industry Benchmarks Tab */}
          <TabsContent value="industry" className="space-y-6">
            <Card className="bg-slate-900/30 border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Industry Benchmark Analysis</h2>
                  <p className="text-slate-400">
                    Compare your organization's NAC performance against industry standards and percentiles
                  </p>
                </div>
              </div>
              <IndustryBenchmarkAnalyzer />
            </Card>
          </TabsContent>

          {/* Peer Analysis Tab */}
          <TabsContent value="peers" className="space-y-6">
            <Card className="bg-slate-900/30 border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <Users className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Peer Analysis Engine</h2>
                  <p className="text-slate-400">
                    Deep dive into similar organizations and competitive positioning analysis
                  </p>
                </div>
              </div>
              <PeerAnalysisEngine />
            </Card>
          </TabsContent>

          {/* Market Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card className="bg-slate-900/30 border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Globe className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Market Trend Analysis</h2>
                  <p className="text-slate-400">Industry trends, forecasts, and technology adoption patterns</p>
                </div>
              </div>
              <MarketTrendAnalyzer />
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Information */}
        <div className="mt-12 p-6 rounded-lg bg-slate-900/50 border border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-2">Data Sources</h3>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Industry research reports</li>
                <li>• Anonymized customer data</li>
                <li>• Market analyst insights</li>
                <li>• Vendor performance metrics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Update Frequency</h3>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Industry benchmarks: Monthly</li>
                <li>• Peer data: Weekly</li>
                <li>• Market trends: Daily</li>
                <li>• Forecasts: Quarterly</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Privacy & Security</h3>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• All peer data anonymized</li>
                <li>• GDPR compliant</li>
                <li>• SOC 2 Type II certified</li>
                <li>• End-to-end encryption</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
