"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></div>
                <span className="text-sm font-medium">Market Intelligence</span>
              </div>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="h-5 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsLive(!isLive)} className="h-6 w-6 p-0">
              <RefreshCw className={`h-3 w-3 ${isLive ? "animate-spin" : ""}`} />
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">+{marketMetrics.portnoxGrowth}%</div>
              <div className="text-xs text-muted-foreground">Portnox Growth</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">${marketMetrics.nacMarketSize}B</div>
              <div className="text-xs text-muted-foreground">Market Size</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">{marketMetrics.customerSatisfaction}%</div>
              <div className="text-xs text-muted-foreground">Satisfaction</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">{marketMetrics.threatLevel}</div>
              <div className="text-xs text-muted-foreground">Threat Level</div>
            </div>
          </div>

          {recentAlerts.length > 0 && (
            <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
              <div className="text-xs text-muted-foreground mb-2">Latest Alert:</div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-3 w-3 text-orange-500" />
                <span className="text-xs font-medium truncate">{recentAlerts[0].title}</span>
                <Badge variant="outline" className="text-xs h-4">
                  {recentAlerts[0].vendor}
                </Badge>
              </div>
            </div>
          )}

          <div className="mt-3 text-xs text-muted-foreground text-center">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Live Market Intelligence
            <div className={`w-2 h-2 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Market Size</span>
              </div>
              <div className="text-2xl font-bold">${marketMetrics.nacMarketSize}B</div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-3 w-3" />+{marketMetrics.growthRate}% YoY
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Portnox Growth</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">+{marketMetrics.portnoxGrowth}%</div>
              <div className="text-sm text-muted-foreground">Market leading growth</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">Threat Level</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">{marketMetrics.threatLevel}</div>
              <Progress value={60} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Customer Satisfaction</span>
              </div>
              <div className="text-2xl font-bold">{marketMetrics.customerSatisfaction}%</div>
              <Progress value={marketMetrics.customerSatisfaction} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">Avg Price Change</span>
              </div>
              <div className="text-2xl font-bold text-red-600">{marketMetrics.avgPriceChange}%</div>
              <div className="text-sm text-muted-foreground">Competitive pressure</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Market Activity</span>
              </div>
              <div className="text-2xl font-bold text-green-600">High</div>
              <div className="text-sm text-muted-foreground">Active consolidation</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-orange-600" />
              Real-time Market Alerts
            </div>
            {unreadCount > 0 && <Badge variant="destructive">{unreadCount} new</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-lg border bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {alert.type === "security" && <Shield className="h-4 w-4 text-red-500" />}
                  {alert.type === "pricing" && <DollarSign className="h-4 w-4 text-orange-500" />}
                  {alert.type === "market" && <TrendingUp className="h-4 w-4 text-blue-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{alert.title}</h4>
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
                    <Badge variant="outline" className="text-xs">
                      {alert.vendor}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                  <div className="text-xs text-muted-foreground">{alert.timestamp.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-600" />
            Market Trends & Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800 dark:text-green-200">Cloud-Native NAC Adoption</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                85% of enterprises plan to migrate to cloud-native NAC solutions by 2025. Portnox CLEAR leading this
                transformation.
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800 dark:text-blue-200">Zero Trust Integration</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                NAC solutions with native Zero Trust capabilities showing 40% higher adoption rates.
              </p>
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-800 dark:text-orange-200">Legacy Vendor Challenges</span>
              </div>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Traditional NAC vendors facing increased security vulnerabilities and deployment complexity issues.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></div>
          Live data feed {isLive ? "active" : "paused"} • Last updated: {lastUpdate.toLocaleString()}
        </div>
      </div>
    </div>
  )
}
