"use client"

import { useState, useEffect } from "react"

export interface MarketAlert {
  id: string
  type: "security" | "pricing" | "market" | "regulatory"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  vendor?: string
  timestamp: Date
  read: boolean
}

export interface MarketMetrics {
  nacMarketSize: number
  growthRate: number
  portnoxGrowth: number
  threatLevel: string
  avgPriceChange: number
  customerSatisfaction: number
}

export function useMarketAlerts() {
  const [alerts, setAlerts] = useState<MarketAlert[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Simulate real-time alerts
    const mockAlerts: MarketAlert[] = [
      {
        id: "1",
        type: "security",
        severity: "high",
        title: "New CVE discovered in Cisco ISE",
        description: "CVE-2024-0001 affects ISE versions 3.1 and earlier",
        vendor: "cisco",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
      },
      {
        id: "2",
        type: "pricing",
        severity: "medium",
        title: "Aruba ClearPass price increase announced",
        description: "15% price increase effective Q2 2024",
        vendor: "aruba",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        read: false,
      },
      {
        id: "3",
        type: "market",
        severity: "low",
        title: "Portnox expands European presence",
        description: "New data centers in Frankfurt and Amsterdam",
        vendor: "portnox",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        read: true,
      },
    ]

    setAlerts(mockAlerts)
    setUnreadCount(mockAlerts.filter((alert) => !alert.read).length)

    // Simulate new alerts coming in
    const interval = setInterval(() => {
      const newAlert: MarketAlert = {
        id: Date.now().toString(),
        type: ["security", "pricing", "market", "regulatory"][Math.floor(Math.random() * 4)] as any,
        severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as any,
        title: "New market update available",
        description: "Market conditions have changed",
        timestamp: new Date(),
        read: false,
      }

      setAlerts((prev) => [newAlert, ...prev.slice(0, 9)]) // Keep only 10 most recent
      setUnreadCount((prev) => prev + 1)
    }, 60000) // New alert every minute

    return () => clearInterval(interval)
  }, [])

  const markAsRead = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })))
    setUnreadCount(0)
  }

  return {
    alerts,
    unreadCount,
    markAsRead,
    markAllAsRead,
  }
}

export function useMarketMetrics() {
  const [metrics, setMetrics] = useState<MarketMetrics>({
    nacMarketSize: 2.8,
    growthRate: 12.5,
    portnoxGrowth: 45.2,
    threatLevel: "Medium",
    avgPriceChange: -8.3,
    customerSatisfaction: 94,
  })

  useEffect(() => {
    // Simulate real-time metric updates
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        portnoxGrowth: prev.portnoxGrowth + (Math.random() - 0.5) * 2,
        customerSatisfaction: Math.max(85, Math.min(98, prev.customerSatisfaction + (Math.random() - 0.5))),
        avgPriceChange: prev.avgPriceChange + (Math.random() - 0.5) * 0.5,
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return metrics
}
