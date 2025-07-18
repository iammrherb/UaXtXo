"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion } from "framer-motion"
import {
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  DollarSign,
  Users,
  Globe,
  Zap,
  Bell,
  Target,
  Cpu,
  BarChart3,
  Download,
  Share,
  Star,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { useMarketAlerts, useMarketData } from "@/lib/hooks/use-market-data"
import LiveMarketDashboard from "../live-market-dashboard"

interface MarketIntelligenceViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function MarketIntelligenceView({ results = [], config }: MarketIntelligenceViewProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [timeRange, setTimeRange] = useState("7d")
  const { alerts, unreadCount, markAsRead, markAllAsRead } = useMarketAlerts()
  const marketData = useMarketData()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Market trend data
  const marketTrendData = [
    { month: "Jan", portnox: 7.2, cisco: 25.1, aruba: 18.3, forescout: 12.8, others: 36.6 },
    { month: "Feb", portnox: 7.5, cisco: 24.8, aruba: 18.1, forescout: 12.9, others: 36.7 },
    { month: "Mar", portnox: 7.8, cisco: 24.5, aruba: 17.9, forescout: 13.1, others: 36.7 },
    { month: "Apr", portnox: 8.1, cisco: 24.2, aruba: 17.7, forescout: 13.2, others: 36.8 },
    { month: "May", portnox: 8.4, cisco: 23.9, aruba: 17.5, forescout: 13.3, others: 36.9 },
    { month: "Jun", portnox: 8.7, cisco: 23.6, aruba: 17.3, forescout: 13.4, others: 37.0 },
  ]

  const securityIncidentData = [
    { vendor: "Portnox", incidents: 0, severity: "low", color: "#10b981" },
    { vendor: "Forescout", incidents: 12, severity: "medium", color: "#f59e0b" },
    { vendor: "Aruba", incidents: 8, severity: "medium", color: "#3b82f6" },
    { vendor: "Cisco", incidents: 15, severity: "high", color: "#ef4444" },
    { vendor: "Ivanti", incidents: 23, severity: "critical", color: "#dc2626" },
  ]

  const pricingTrendData = [
    { vendor: "Portnox", change: -5, trend: "down", color: "#10b981" },
    { vendor: "Forescout", change: 2, trend: "stable", color: "#6b7280" },
    { vendor: "Aruba", change: 8, trend: "up", color: "#f59e0b" },
    { vendor: "Cisco", change: 12, trend: "up", color: "#ef4444" },
  ]

  const customerSatisfactionData = [
    { vendor: "Portnox", score: 94, color: "#10b981" },
    { vendor: "Aruba", score: 78, color: "#3b82f6" },
    { vendor: "Cisco", score: 72, color: "#f59e0b" },
    { vendor: "Forescout", score: 69, color: "#ef4444" },
  ]

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

  return (
    <div className="space-y-6">
      {/* Market Intelligence Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="p-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl shadow-lg"
          >
            <Activity className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Market Intelligence Dashboard
            </h1>
            <p className="text-gray-400">Real-time NAC market analysis and competitive intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-gray-800/50 border-gray-700 text-gray-300">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="bg-gray-800/50 border-gray-700 text-gray-300">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} size="sm" className="bg-red-600 hover:bg-red-700">
              <Bell className="h-4 w-4 mr-2" />
              {unreadCount} Alerts
            </Button>
          )}
        </div>
      </motion.div>

      {/* Live Market Dashboard */}
      <LiveMarketDashboard mode="full" selectedVendors={results.map((r) => r.vendorId)} />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-900/50 border border-gray-800/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gray-800">
            Market Overview
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gray-800">
            Security Intelligence
          </TabsTrigger>
          <TabsTrigger value="pricing" className="data-[state=active]:bg-gray-800">
            Pricing Analysis
          </TabsTrigger>
          <TabsTrigger value="satisfaction" className="data-[state=active]:bg-gray-800">
            Customer Insights
          </TabsTrigger>
          <TabsTrigger value="predictions" className="data-[state=active]:bg-gray-800">
            AI Predictions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Market Share Trends */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 border-gray-700/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                  Market Share Evolution
                </CardTitle>
                <CardDescription>6-month trend analysis of NAC vendor market positions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={marketTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#f3f4f6",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="portnox"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.8}
                    />
                    <Area
                      type="monotone"
                      dataKey="cisco"
                      stackId="1"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.8}
                    />
                    <Area
                      type="monotone"
                      dataKey="aruba"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.8}
                    />
                    <Area
                      type="monotone"
                      dataKey="forescout"
                      stackId="1"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.8}
                    />
                    <Area
                      type="monotone"
                      dataKey="others"
                      stackId="1"
                      stroke="#6b7280"
                      fill="#6b7280"
                      fillOpacity={0.8}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Market Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-300">
                    <TrendingUp className="h-4 w-4" />
                    Portnox Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-200">+{marketData.portnoxMarketShare.toFixed(1)}%</div>
                  <p className="text-xs text-green-400 mt-1">Market share (6 months)</p>
                  <Progress value={marketData.portnoxMarketShare * 10} className="mt-3 h-2 bg-green-900/50" />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-700/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-300">
                    <Globe className="h-4 w-4" />
                    Total Market
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-200">${marketData.nacMarketSize.toFixed(1)}B</div>
                  <p className="text-xs text-blue-400 mt-1">NAC market size</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-blue-400" />
                    <span className="text-xs text-blue-400">+12.5% YoY</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 border-purple-700/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-purple-300">
                    <Zap className="h-4 w-4" />
                    Innovation Index
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-200">9.2/10</div>
                  <p className="text-xs text-purple-400 mt-1">Portnox innovation score</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-3 w-3 text-purple-400 fill-current" />
                    <span className="text-xs text-purple-400">Industry leading</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="bg-gradient-to-br from-orange-900/30 to-amber-900/30 border-orange-700/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-300">
                    <Target className="h-4 w-4" />
                    Competitive Advantage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-200">73%</div>
                  <p className="text-xs text-orange-400 mt-1">Cost advantage vs competitors</p>
                  <Progress value={73} className="mt-3 h-2 bg-orange-900/50" />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Incidents Analysis */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 border-gray-700/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-400" />
                  Security Incident Analysis
                </CardTitle>
                <CardDescription>CVE and security incident tracking across NAC vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={securityIncidentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="vendor" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#f3f4f6",
                        }}
                      />
                      <Bar dataKey="incidents" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="space-y-4">
                    {securityIncidentData.map((item, index) => (
                      <motion.div
                        key={item.vendor}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="font-medium text-gray-200">{item.vendor}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold" style={{ color: item.color }}>
                            {item.incidents}
                          </div>
                          <Badge
                            variant={
                              item.severity === "critical"
                                ? "destructive"
                                : item.severity === "high"
                                  ? "destructive"
                                  : item.severity === "medium"
                                    ? "default"
                                    : "secondary"
                            }
                            className="text-xs"
                          >
                            {item.severity}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Alerts */}
          <Alert className="border-red-700/50 bg-gradient-to-r from-red-900/30 to-pink-900/30">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertTitle className="text-red-200">Critical Security Alert</AlertTitle>
            <AlertDescription className="text-red-300">
              Portnox maintains a perfect security record with <strong>zero CVEs</strong> while competitors average 12+
              critical vulnerabilities annually. Ivanti/Pulse Secure currently under active nation-state attack.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          {/* Pricing Trends */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 border-gray-700/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  Pricing Trend Analysis
                </CardTitle>
                <CardDescription>6-month pricing changes across NAC vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pricingTrendData.map((item, index) => (
                    <motion.div
                      key={item.vendor}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="font-medium text-gray-200">{item.vendor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.trend === "up" && <TrendingUp className="h-4 w-4 text-red-400" />}
                        {item.trend === "down" && <TrendingDown className="h-4 w-4 text-green-400" />}
                        {item.trend === "stable" && <div className="w-4 h-0.5 bg-gray-400"></div>}
                        <span
                          className={`font-bold ${
                            item.change > 0 ? "text-red-400" : item.change < 0 ? "text-green-400" : "text-gray-400"
                          }`}
                        >
                          {item.change > 0 ? "+" : ""}
                          {item.change}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Alert className="border-green-700/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
            <TrendingDown className="h-4 w-4 text-green-400" />
            <AlertTitle className="text-green-200">Pricing Advantage</AlertTitle>
            <AlertDescription className="text-green-300">
              Portnox is the only vendor reducing prices (-5%) while competitors increase costs by 8-12%. This creates a{" "}
              <strong>73% cost advantage</strong> for new customers.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-6">
          {/* Customer Satisfaction */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 border-gray-700/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  Customer Satisfaction Scores
                </CardTitle>
                <CardDescription>Based on 2024 customer surveys and reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={customerSatisfactionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="score"
                        label={({ vendor, score }) => `${vendor}: ${score}%`}
                      >
                        {customerSatisfactionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>

                  <div className="space-y-4">
                    {customerSatisfactionData.map((item, index) => (
                      <motion.div
                        key={item.vendor}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-200">{item.vendor}</span>
                          <span className="font-bold" style={{ color: item.color }}>
                            {item.score}%
                          </span>
                        </div>
                        <Progress
                          value={item.score}
                          className="h-2"
                          style={{
                            backgroundColor: `${item.color}20`,
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          {/* AI Predictions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 border-gray-700/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-purple-400" />
                  AI-Powered Market Predictions
                </CardTitle>
                <CardDescription>Machine learning analysis of market trends and vendor positioning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl border border-green-700/50"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="h-6 w-6 text-green-400" />
                      <h3 className="text-lg font-semibold text-green-200">Portnox Market Position</h3>
                      <Badge className="bg-green-600">95% Confidence</Badge>
                    </div>
                    <p className="text-green-300 mb-4">
                      AI predicts Portnox will capture 15% market share by Q4 2025, driven by cloud-native architecture
                      advantages and zero-CVE security record.
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-200">15%</div>
                        <div className="text-xs text-green-400">Predicted Market Share</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-200">85%</div>
                        <div className="text-xs text-green-400">Cloud Migration Rate</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-200">$4.2B</div>
                        <div className="text-xs text-green-400">Market Opportunity</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-xl border border-red-700/50"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle className="h-6 w-6 text-red-400" />
                      <h3 className="text-lg font-semibold text-red-200">Legacy Vendor Decline</h3>
                      <Badge variant="destructive">88% Confidence</Badge>
                    </div>
                    <p className="text-red-300 mb-4">
                      Traditional NAC vendors (Cisco ISE, Ivanti) predicted to lose 25% market share by 2026 due to
                      security vulnerabilities and deployment complexity.
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-red-200">-25%</div>
                        <div className="text-xs text-red-400">Legacy Vendor Decline</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-200">47+</div>
                        <div className="text-xs text-red-400">Cisco ISE CVEs</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-200">6-9mo</div>
                        <div className="text-xs text-red-400">Deployment Time</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl border border-blue-700/50"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Zap className="h-6 w-6 text-blue-400" />
                      <h3 className="text-lg font-semibold text-blue-200">Technology Disruption</h3>
                      <Badge className="bg-blue-600">92% Confidence</Badge>
                    </div>
                    <p className="text-blue-300 mb-4">
                      Cloud-native NAC solutions will dominate by 2025, with AI-driven automation becoming the new
                      standard for network access control.
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-200">90%</div>
                        <div className="text-xs text-blue-400">Cloud Adoption</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-200">95%</div>
                        <div className="text-xs text-blue-400">Zero Trust Integration</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-200">30min</div>
                        <div className="text-xs text-blue-400">Deployment Standard</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
