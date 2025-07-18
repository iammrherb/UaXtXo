"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  Eye,
  Clock,
  ExternalLink,
} from "lucide-react"
import { useMarketAlerts } from "@/lib/hooks/use-market-data"

interface LiveMarketDashboardProps {
  mode?: "compact" | "full"
  selectedVendors: string[]
}

export default function LiveMarketDashboard({ mode = "full", selectedVendors }: LiveMarketDashboardProps) {
  const [isLive, setIsLive] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
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
    nacMarketSize: 2.8,
    growthRate: 12.5,
    portnoxGrowth: 45.2,
    threatLevel: "Medium",
    avgPriceChange: -8.3,
    customerSatisfaction: 94,
  }

  const liveUpdates = [
    {
      id: 1,
      type: "security",
      severity: "critical",
      title: "Critical CVE-2024-0001 discovered in Cisco ISE",
      description:
        "Remote code execution vulnerability affects ISE versions 3.1 and earlier. Immediate patching required.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      vendor: "cisco",
      impact: "High",
      affectedVersions: "3.1 and earlier",
      recommendation: "Apply security patch immediately",
      source: "NIST CVE Database",
    },
    {
      id: 2,
      type: "pricing",
      severity: "medium",
      title: "Aruba ClearPass announces 15% price increase",
      description: "Price increase effective Q2 2024 for all new licenses and renewals.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      vendor: "aruba",
      impact: "Medium",
      effectiveDate: "Q2 2024",
      recommendation: "Consider alternative solutions",
      source: "Aruba Official Announcement",
    },
    {
      id: 3,
      type: "market",
      severity: "low",
      title: "Portnox expands European data center presence",
      description: "New data centers in Frankfurt and Amsterdam improve latency and compliance.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      vendor: "portnox",
      impact: "Positive",
      regions: "Germany, Netherlands",
      recommendation: "Evaluate for European deployments",
      source: "Portnox Press Release",
    },
    {
      id: 4,
      type: "regulatory",
      severity: "high",
      title: "New EU cybersecurity regulations impact NAC requirements",
      description: "NIS2 directive requires enhanced network access controls for critical infrastructure.",
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
      vendor: "all",
      impact: "High",
      effectiveDate: "October 2024",
      recommendation: "Review compliance requirements",
      source: "European Commission",
    },
  ]

  if (mode === "compact") {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="bg-gradient-to-r from-slate-900/60 to-gray-900/60 border-gray-700/30 backdrop-blur-xl shadow-lg">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className={`w-2 h-2 rounded-full ${isLive ? "bg-green-400 shadow-md shadow-green-400/50" : "bg-gray-500"}`}
                  ></motion.div>
                  <span className="text-sm font-medium text-gray-200">Live Intelligence</span>
                </div>
                {unreadCount > 0 && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Badge variant="destructive" className="h-4 text-xs bg-red-600 shadow-md px-1">
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
                  className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <RefreshCw className={`h-3 w-3 ${isLive ? "animate-spin" : ""}`} />
                </Button>
              </motion.div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center mb-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-md bg-green-900/20 border border-green-700/30"
              >
                <div className="text-sm font-bold text-green-400">+{marketMetrics.portnoxGrowth}%</div>
                <div className="text-xs text-green-300">Growth</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-md bg-blue-900/20 border border-blue-700/30"
              >
                <div className="text-sm font-bold text-blue-400">${marketMetrics.nacMarketSize}B</div>
                <div className="text-xs text-blue-300">Market</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-md bg-purple-900/20 border border-purple-700/30"
              >
                <div className="text-sm font-bold text-purple-400">{marketMetrics.customerSatisfaction}%</div>
                <div className="text-xs text-purple-300">Satisfaction</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-md bg-orange-900/20 border border-orange-700/30"
              >
                <div className="text-sm font-bold text-orange-400">{marketMetrics.threatLevel}</div>
                <div className="text-xs text-orange-300">Threat</div>
              </motion.div>
            </div>

            {/* Live Updates Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">Live Updates</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-5 px-2 text-xs text-gray-400 hover:text-white">
                      <Eye className="h-3 w-3 mr-1" />
                      View All
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] bg-slate-900 border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-white">Live Market Intelligence</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh] pr-4">
                      <div className="space-y-4">
                        {liveUpdates.map((update, index) => (
                          <motion.div
                            key={update.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                {update.type === "security" && <Shield className="h-5 w-5 text-red-400" />}
                                {update.type === "pricing" && <DollarSign className="h-5 w-5 text-orange-400" />}
                                {update.type === "market" && <TrendingUp className="h-5 w-5 text-blue-400" />}
                                {update.type === "regulatory" && <AlertTriangle className="h-5 w-5 text-purple-400" />}
                                <div>
                                  <h4 className="font-semibold text-white">{update.title}</h4>
                                  <p className="text-sm text-gray-400 mt-1">{update.description}</p>
                                </div>
                              </div>
                              <Badge
                                variant={
                                  update.severity === "critical"
                                    ? "destructive"
                                    : update.severity === "high"
                                      ? "destructive"
                                      : update.severity === "medium"
                                        ? "default"
                                        : "secondary"
                                }
                                className="text-xs"
                              >
                                {update.severity}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-300">Impact:</span>
                                <span className="ml-2 text-gray-400">{update.impact}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-300">Vendor:</span>
                                <span className="ml-2 text-gray-400">{update.vendor}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-300">Source:</span>
                                <span className="ml-2 text-gray-400">{update.source}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-300">Time:</span>
                                <span className="ml-2 text-gray-400">{update.timestamp.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="mt-3 p-3 bg-blue-900/20 rounded border border-blue-700/30">
                              <span className="font-medium text-blue-300">Recommendation:</span>
                              <p className="text-sm text-blue-200 mt-1">{update.recommendation}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>

              {liveUpdates.slice(0, 2).map((update, index) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 p-2 rounded bg-gray-800/30 border border-gray-700/30 cursor-pointer hover:bg-gray-800/50 transition-colors"
                  onClick={() => setSelectedAlert(update)}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {update.type === "security" && <Shield className="h-3 w-3 text-red-400" />}
                    {update.type === "pricing" && <DollarSign className="h-3 w-3 text-orange-400" />}
                    {update.type === "market" && <TrendingUp className="h-3 w-3 text-blue-400" />}
                    {update.type === "regulatory" && <AlertTriangle className="h-3 w-3 text-purple-400" />}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium text-gray-200 truncate block">{update.title}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className="text-xs h-3 px-1 bg-gray-800/50 border-gray-600 text-gray-300"
                      >
                        {update.vendor}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {Math.floor((Date.now() - update.timestamp.getTime()) / (1000 * 60 * 60))}h ago
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="h-3 w-3 text-gray-500" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-3 pt-2 border-t border-gray-700/30 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>Updated: {lastUpdate.toLocaleTimeString()}</span>
                <span className="mx-1">•</span>
                <span className="text-green-400">{isLive ? "Live" : "Paused"}</span>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Alert Detail Dialog */}
        <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
          <DialogContent className="max-w-2xl bg-slate-900 border-gray-700">
            {selectedAlert && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                    {selectedAlert.type === "security" && <Shield className="h-5 w-5 text-red-400" />}
                    {selectedAlert.type === "pricing" && <DollarSign className="h-5 w-5 text-orange-400" />}
                    {selectedAlert.type === "market" && <TrendingUp className="h-5 w-5 text-blue-400" />}
                    {selectedAlert.type === "regulatory" && <AlertTriangle className="h-5 w-5 text-purple-400" />}
                    {selectedAlert.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <p className="text-gray-300">{selectedAlert.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-400">Severity:</span>
                        <Badge
                          variant={
                            selectedAlert.severity === "critical"
                              ? "destructive"
                              : selectedAlert.severity === "high"
                                ? "destructive"
                                : selectedAlert.severity === "medium"
                                  ? "default"
                                  : "secondary"
                          }
                        >
                          {selectedAlert.severity}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-400">Impact:</span>
                        <span className="text-sm text-gray-300">{selectedAlert.impact}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-400">Vendor:</span>
                        <span className="text-sm text-gray-300">{selectedAlert.vendor}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-400">Source:</span>
                        <span className="text-sm text-gray-300">{selectedAlert.source}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-400">Time:</span>
                        <span className="text-sm text-gray-300">{selectedAlert.timestamp.toLocaleString()}</span>
                      </div>
                      {selectedAlert.effectiveDate && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-400">Effective:</span>
                          <span className="text-sm text-gray-300">{selectedAlert.effectiveDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                    <h4 className="font-medium text-blue-300 mb-2">Recommendation:</h4>
                    <p className="text-sm text-blue-200">{selectedAlert.recommendation}</p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
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
                {liveUpdates.slice(0, 3).map((update, index) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm cursor-pointer"
                    onClick={() => setSelectedAlert(update)}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {update.type === "security" && (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Shield className="h-5 w-5 text-red-400" />
                        </motion.div>
                      )}
                      {update.type === "pricing" && <DollarSign className="h-5 w-5 text-orange-400" />}
                      {update.type === "market" && <TrendingUp className="h-5 w-5 text-blue-400" />}
                      {update.type === "regulatory" && <AlertTriangle className="h-5 w-5 text-purple-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-sm text-gray-200">{update.title}</h4>
                        <Badge
                          variant={
                            update.severity === "critical"
                              ? "destructive"
                              : update.severity === "high"
                                ? "destructive"
                                : update.severity === "medium"
                                  ? "default"
                                  : "secondary"
                          }
                          className="text-xs"
                        >
                          {update.severity}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-gray-800/50 border-gray-600 text-gray-300">
                          {update.vendor}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{update.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{update.timestamp.toLocaleString()}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {Math.floor((Date.now() - update.timestamp.getTime()) / (1000 * 60 * 60))}h ago
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  </motion.div>
                ))}
              </AnimatePresence>
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

      {/* Alert Detail Dialog */}
      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="max-w-2xl bg-slate-900 border-gray-700">
          {selectedAlert && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                  {selectedAlert.type === "security" && <Shield className="h-5 w-5 text-red-400" />}
                  {selectedAlert.type === "pricing" && <DollarSign className="h-5 w-5 text-orange-400" />}
                  {selectedAlert.type === "market" && <TrendingUp className="h-5 w-5 text-blue-400" />}
                  {selectedAlert.type === "regulatory" && <AlertTriangle className="h-5 w-5 text-purple-400" />}
                  {selectedAlert.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <p className="text-gray-300">{selectedAlert.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-400">Severity:</span>
                      <Badge
                        variant={
                          selectedAlert.severity === "critical"
                            ? "destructive"
                            : selectedAlert.severity === "high"
                              ? "destructive"
                              : selectedAlert.severity === "medium"
                                ? "default"
                                : "secondary"
                        }
                      >
                        {selectedAlert.severity}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-400">Impact:</span>
                      <span className="text-sm text-gray-300">{selectedAlert.impact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-400">Vendor:</span>
                      <span className="text-sm text-gray-300">{selectedAlert.vendor}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-400">Source:</span>
                      <span className="text-sm text-gray-300">{selectedAlert.source}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-400">Time:</span>
                      <span className="text-sm text-gray-300">{selectedAlert.timestamp.toLocaleString()}</span>
                    </div>
                    {selectedAlert.effectiveDate && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-400">Effective:</span>
                        <span className="text-sm text-gray-300">{selectedAlert.effectiveDate}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                  <h4 className="font-medium text-blue-300 mb-2">Recommendation:</h4>
                  <p className="text-sm text-blue-200">{selectedAlert.recommendation}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
