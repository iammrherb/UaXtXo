"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
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
  RefreshCw,
} from "lucide-react"
import { useMarketAlerts } from "@/lib/hooks/use-market-data"

interface LiveMarketDashboardProps {
  mode?: "compact" | "full"
  selectedVendors: string[]
}

export default function LiveMarketDashboard({ mode = "full", selectedVendors }: LiveMarketDashboardProps) {
  const [isLive, setIsLive] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const { alerts, unreadCount, markAsRead } = useMarketAlerts()

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        setLastUpdate(new Date())
      }
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [isLive])

  const marketMetrics = {
    nacMarketSize: 2.8, // Billion USD
    growthRate: 12.5, // Percentage
    portnoxGrowth: 45.2, // Percentage
    threatLevel: "Medium",
    avgPriceChange: -8.3, // Percentage
    customerSatisfaction: 94, // Percentage
  }

  const recentAlerts = [
    {
      id: 1,
      type: "security",
      severity: "high",
      title: "New CVE discovered in Cisco ISE",
      description: "CVE-2024-0001 affects ISE versions 3.1 and earlier",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      vendor: "cisco",
    },
    {
      id: 2,
      type: "pricing",
      severity: "medium",
      title: "Aruba ClearPass price increase announced",
      description: "15% price increase effective Q2 2024",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      vendor: "aruba",
    },
    {
      id: 3,
      type: "market",
      severity: "low",
      title: "Portnox expands European presence",
      description: "New data centers in Frankfurt and Amsterdam",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      vendor: "portnox",
    },
  ]

  if (mode === "compact") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gradient-to-r from-slate-900/80 to-gray-900/80 border-gray-700/50 backdrop-blur-xl shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className={`w-3 h-3 rounded-full ${isLive ? "bg-green-400 shadow-lg shadow-green-400/50" : "bg-gray-500"}`}
                  ></motion.div>
                  <span className="text-sm font-semibold text-gray-200">Market Intelligence</span>
                </div>
                {unreadCount > 0 && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Badge variant="destructive" className="h-5 text-xs bg-red-600 shadow-lg">
                      {unreadCount}
                    </Badge>
                  </motion.div>
                )}
              </div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLive(!isLive)}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <RefreshCw className={`h-4 w-4 ${isLive ? "animate-spin" : ""}`} />
                </Button>
              </motion.div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-lg bg-green-900/30 border border-green-700/50"
              >
                <div className="text-xl font-bold text-green-400">+{marketMetrics.portnoxGrowth}%</div>
                <div className="text-xs text-green-300">Portnox Growth</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-lg bg-blue-900/30 border border-blue-700/50"
              >
                <div className="text-xl font-bold text-blue-400">${marketMetrics.nacMarketSize}B</div>
                <div className="text-xs text-blue-300">Market Size</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-lg bg-purple-900/30 border border-purple-700/50"
              >
                <div className="text-xl font-bold text-purple-400">{marketMetrics.customerSatisfaction}%</div>
                <div className="text-xs text-purple-300">Satisfaction</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-lg bg-orange-900/30 border border-orange-700/50"
              >
                <div className="text-xl font-bold text-orange-400">{marketMetrics.threatLevel}</div>
                <div className="text-xs text-orange-300">Threat Level</div>
              </motion.div>
            </div>

            {recentAlerts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-700/50"
              >
                <div className="text-xs text-gray-400 mb-2">Latest Alert:</div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <AlertTriangle className="h-3 w-3 text-orange-400" />
                  </motion.div>
                  <span className="text-xs font-medium truncate text-gray-200">{recentAlerts[0].title}</span>
                  <Badge variant="outline" className="text-xs h-4 bg-gray-800/50 border-gray-600 text-gray-300">
                    {recentAlerts[0].vendor}
                  </Badge>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-xs text-gray-500 text-center"
            >
              Last updated: {lastUpdate.toLocaleTimeString()}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Market Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 border-gray-700/50 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="p-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg shadow-lg"
              >
                <Globe className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Live Market Intelligence
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className={`w-3 h-3 rounded-full ${isLive ? "bg-green-400 shadow-lg shadow-green-400/50" : "bg-gray-500"}`}
              ></motion.div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-700/50"
              >
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  <span className="text-sm font-medium text-green-300">Market Size</span>
                </div>
                <div className="text-3xl font-bold text-green-200">${marketMetrics.nacMarketSize}B</div>
                <div className="flex items-center gap-1 text-sm text-green-400">
                  <TrendingUp className="h-4 w-4" />+{marketMetrics.growthRate}% YoY
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-purple-900/30 to-violet-900/30 border border-purple-700/50"
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-400" />
                  <span className="text-sm font-medium text-purple-300">Portnox Growth</span>
                </div>
                <div className="text-3xl font-bold text-purple-200">+{marketMetrics.portnoxGrowth}%</div>
                <div className="text-sm text-purple-400">Market leading growth</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-orange-900/30 to-amber-900/30 border border-orange-700/50"
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-400" />
                  <span className="text-sm font-medium text-orange-300">Threat Level</span>
                </div>
                <div className="text-3xl font-bold text-orange-200">{marketMetrics.threatLevel}</div>
                <Progress value={60} className="h-2 bg-orange-900/50" />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-700/50"
              >
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Customer Satisfaction</span>
                </div>
                <div className="text-3xl font-bold text-blue-200">{marketMetrics.customerSatisfaction}%</div>
                <Progress value={marketMetrics.customerSatisfaction} className="h-2 bg-blue-900/50" />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-red-900/30 to-pink-900/30 border border-red-700/50"
              >
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-red-400" />
                  <span className="text-sm font-medium text-red-300">Avg Price Change</span>
                </div>
                <div className="text-3xl font-bold text-red-200">{marketMetrics.avgPriceChange}%</div>
                <div className="text-sm text-red-400">Competitive pressure</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-teal-900/30 to-cyan-900/30 border border-teal-700/50"
              >
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-teal-400" />
                  <span className="text-sm font-medium text-teal-300">Market Activity</span>
                </div>
                <div className="text-3xl font-bold text-teal-200">High</div>
                <div className="text-sm text-teal-400">Active consolidation</div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Real-time Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 border-gray-700/50 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="p-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg shadow-lg"
                >
                  <Bell className="h-6 w-6 text-white" />
                </motion.div>
                <span className="text-xl font-bold text-gray-200">Real-time Market Alerts</span>
              </div>
              {unreadCount > 0 && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Badge variant="destructive" className="bg-red-600 shadow-lg">
                    {unreadCount} new
                  </Badge>
                </motion.div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AnimatePresence>
                {recentAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {alert.type === "security" && (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Shield className="h-5 w-5 text-red-400" />
                        </motion.div>
                      )}
                      {alert.type === "pricing" && <DollarSign className="h-5 w-5 text-orange-400" />}
                      {alert.type === "market" && <TrendingUp className="h-5 w-5 text-blue-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-sm text-gray-200">{alert.title}</h4>
                        <Badge
                          variant={
                            alert.severity === "high"
                              ? "destructive"
                              : alert.severity === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {alert.severity}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-gray-800/50 border-gray-600 text-gray-300">
                          {alert.vendor}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{alert.description}</p>
                      <div className="text-xs text-gray-500">{alert.timestamp.toLocaleString()}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Market Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 border-gray-700/50 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg"
              >
                <Activity className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-gray-200">Market Trends & Predictions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-6 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl border border-green-700/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </motion.div>
                  <span className="font-semibold text-green-200">Cloud-Native NAC Adoption</span>
                </div>
                <p className="text-sm text-green-300">
                  85% of enterprises plan to migrate to cloud-native NAC solutions by 2025. Portnox CLEAR leading this
                  transformation with 95% faster deployment times.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-6 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl border border-blue-700/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Shield className="h-5 w-5 text-blue-400" />
                  </motion.div>
                  <span className="font-semibold text-blue-200">Zero Trust Integration</span>
                </div>
                <p className="text-sm text-blue-300">
                  NAC solutions with native Zero Trust capabilities showing 40% higher adoption rates. Portnox achieves
                  95% Zero Trust maturity.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-6 bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-xl border border-orange-700/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                  </motion.div>
                  <span className="font-semibold text-orange-200">Legacy Vendor Challenges</span>
                </div>
                <p className="text-sm text-orange-300">
                  Traditional NAC vendors facing increased security vulnerabilities and deployment complexity issues.
                  Cisco ISE has 47+ CVEs in 3 years vs Portnox's zero CVE record.
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-sm text-gray-500"
      >
        <div className="flex items-center justify-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className={`w-2 h-2 rounded-full ${isLive ? "bg-green-400 shadow-lg shadow-green-400/50" : "bg-gray-500"}`}
          ></motion.div>
          <span className="text-gray-400">
            Live data feed {isLive ? "active" : "paused"} • Last updated: {lastUpdate.toLocaleString()}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
