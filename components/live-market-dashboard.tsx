"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert } from "@/components/ui/alert"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wifi,
  WifiOff,
  RefreshCw,
  Bell,
  X,
  Eye,
  DollarSign,
  BarChart3,
} from "lucide-react"
import { useMarketData, useMarketAlerts } from "@/lib/hooks/use-market-data"

interface LiveMarketDashboardProps {
  mode?: "compact" | "full"
  selectedVendors?: string[]
}

export function LiveMarketDashboard({ mode = "full", selectedVendors = [] }: LiveMarketDashboardProps) {
  const { marketMetrics, vendorData, isLoading, error, lastUpdated } = useMarketData()
  const { alerts, unreadCount, criticalAlerts, markAsRead, dismiss } = useMarketAlerts()
  const [showAlerts, setShowAlerts] = useState(false)

  const formatCurrency = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
    return `$${value.toLocaleString()}`
  }

  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`

  const getConnectionStatus = () => {
    if (isLoading) return { status: "connecting", color: "text-yellow-600", icon: RefreshCw }
    if (error) return { status: "disconnected", color: "text-red-600", icon: WifiOff }
    return { status: "connected", color: "text-green-600", icon: Wifi }
  }

  const connectionStatus = getConnectionStatus()
  const ConnectionIcon = connectionStatus.icon

  if (mode === "compact") {
    return (
      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
        {/* Connection Status */}
        <div className="flex items-center gap-2">
          <ConnectionIcon className={`h-4 w-4 ${connectionStatus.color} ${isLoading ? "animate-spin" : ""}`} />
          <span className="text-xs font-medium capitalize">{connectionStatus.status}</span>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Key Metrics */}
        {marketMetrics && (
          <>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-sm font-bold">{formatCurrency(marketMetrics.marketSize)}</div>
                <div className="text-xs text-muted-foreground">Market Size</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-sm font-bold">{formatPercentage(marketMetrics.growthRate)}</div>
                <div className="text-xs text-muted-foreground">Growth Rate</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-sm font-bold">{marketMetrics.demandIndex}</div>
                <div className="text-xs text-muted-foreground">Demand Index</div>
              </div>
            </div>
          </>
        )}

        <Separator orientation="vertical" className="h-6" />

        {/* Alerts */}
        <Button variant="outline" size="sm" onClick={() => setShowAlerts(!showAlerts)} className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-600">{unreadCount}</Badge>
          )}
        </Button>

        {lastUpdated && <div className="text-xs text-muted-foreground">Updated {lastUpdated.toLocaleTimeString()}</div>}
      </div>
    )
  }

  // Full dashboard mode
  return (
    <div className="space-y-6">
      {/* Header with Connection Status */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Live Market Intelligence</h2>
          <p className="text-muted-foreground">Real-time NAC market data and competitive intelligence</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ConnectionIcon className={`h-5 w-5 ${connectionStatus.color} ${isLoading ? "animate-spin" : ""}`} />
            <span className="text-sm font-medium capitalize">{connectionStatus.status}</span>
          </div>
          {lastUpdated && (
            <div className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</div>
          )}
        </div>
      </div>

      {/* Market Metrics Cards */}
      {marketMetrics && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-700">
                <BarChart3 className="h-4 w-4" />
                Market Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{formatCurrency(marketMetrics.marketSize)}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">Growing</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-700">
                <TrendingUp className="h-4 w-4" />
                Growth Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{formatPercentage(marketMetrics.growthRate)}</div>
              <div className="text-xs text-green-600 mt-1">CAGR 2024-2029</div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-purple-700">
                <Activity className="h-4 w-4" />
                Demand Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{marketMetrics.demandIndex}</div>
              <Progress value={marketMetrics.demandIndex} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-700">
                <DollarSign className="h-4 w-4" />
                Pricing Pressure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{marketMetrics.pricingPressure}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingDown className="h-3 w-3 text-red-600" />
                <span className="text-xs text-red-600">High pressure</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Vendor Performance and Alerts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Vendor Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live Vendor Performance</CardTitle>
            <CardDescription>Real-time market share and sentiment tracking</CardDescription>
          </CardHeader>
          <CardContent>
            {vendorData.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vendorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendorId" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "marketShare" ? `${Number(value).toFixed(1)}%` : Number(value).toFixed(0),
                      name === "marketShare" ? "Market Share" : "Customer Sentiment",
                    ]}
                  />
                  <Bar dataKey="marketShare" fill="#3B82F6" name="Market Share" />
                  <Bar dataKey="customerSentiment" fill="#10B981" name="Customer Sentiment" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Live Alerts Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Live Market Alerts
              <Badge variant={criticalAlerts.length > 0 ? "destructive" : "secondary"}>{unreadCount} unread</Badge>
            </CardTitle>
            <CardDescription>Real-time market intelligence and security alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p>No active alerts</p>
              </div>
            ) : (
              alerts.slice(0, 10).map((alert) => (
                <Alert
                  key={alert.id}
                  className={`${
                    alert.severity === "critical"
                      ? "border-red-200 bg-red-50"
                      : alert.severity === "high"
                        ? "border-orange-200 bg-orange-50"
                        : "border-blue-200 bg-blue-50"
                  } ${!alert.read ? "ring-2 ring-blue-200" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {alert.severity === "critical" && <AlertTriangle className="h-4 w-4 text-red-600" />}
                        {alert.severity === "high" && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                        {alert.severity === "medium" && <Activity className="h-4 w-4 text-blue-600" />}
                        {alert.severity === "low" && <CheckCircle className="h-4 w-4 text-green-600" />}
                        <Badge variant="outline" className="text-xs">
                          {alert.type}
                        </Badge>
                        {alert.actionRequired && (
                          <Badge variant="destructive" className="text-xs">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-sm">{alert.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{alert.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      {!alert.read && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(alert.id)} className="h-6 w-6 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => dismiss(alert.id)} className="h-6 w-6 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Alert>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Market Trends */}
      {vendorData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pricing Trends & Market Pressure</CardTitle>
            <CardDescription>Real-time pricing pressure and market dynamics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={vendorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendorId" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    `${Number(value).toFixed(1)}${name === "pricingTrend" ? "%" : ""}`,
                    name === "pricingTrend" ? "Pricing Trend" : "Market Pressure",
                  ]}
                />
                <Line type="monotone" dataKey="pricingTrend" stroke="#EF4444" strokeWidth={2} name="Pricing Trend" />
                <Line
                  type="monotone"
                  dataKey="marketPressure"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  name="Market Pressure"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default LiveMarketDashboard
