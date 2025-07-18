"use client"

import { useState, useEffect } from "react"

export interface MarketAlert {
  id: number
  type: "security" | "pricing" | "market" | "regulatory"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  timestamp: Date
  vendor: string
  read: boolean
  impact?: string
  source?: string
  recommendation?: string
  effectiveDate?: string
  affectedVersions?: string
  regions?: string
}

export interface MarketMetrics {
  nacMarketSize: number
  growthRate: number
  portnoxMarketShare: number
  portnoxGrowth: number
  threatLevel: string
  avgPriceChange: number
  customerSatisfaction: number
}

export function useMarketAlerts() {
  const [alerts, setAlerts] = useState<MarketAlert[]>([
    {
      id: 1,
      type: "security",
      severity: "critical",
      title: "Critical CVE discovered in Cisco ISE",
      description: "CVE-2024-0001 affects ISE versions 3.1 and earlier",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      vendor: "cisco",
      read: false,
      impact: "High",
      source: "NIST CVE Database",
      recommendation: "Apply security patch immediately",
      affectedVersions: "3.1 and earlier",
    },
    {
      id: 2,
      type: "pricing",
      severity: "medium",
      title: "Aruba ClearPass price increase announced",
      description: "15% price increase effective Q2 2024",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      vendor: "aruba",
      read: false,
      impact: "Medium",
      source: "Aruba Official Announcement",
      recommendation: "Consider alternative solutions",
      effectiveDate: "Q2 2024",
    },
    {
      id: 3,
      type: "market",
      severity: "low",
      title: "Portnox expands European presence",
      description: "New data centers in Frankfurt and Amsterdam",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      vendor: "portnox",
      read: true,
      impact: "Positive",
      source: "Portnox Press Release",
      recommendation: "Evaluate for European deployments",
      regions: "Germany, Netherlands",
    },
    {
      id: 4,
      type: "regulatory",
      severity: "high",
      title: "New EU cybersecurity regulations impact NAC",
      description: "NIS2 directive requires enhanced network access controls",
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
      vendor: "all",
      read: false,
      impact: "High",
      source: "European Commission",
      recommendation: "Review compliance requirements",
      effectiveDate: "October 2024",
    },
  ])

  const unreadCount = alerts.filter((alert) => !alert.read).length

  const markAsRead = (alertId: number) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert)))
  }

  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })))
  }

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        // 20% chance every 30 seconds
        const newAlert: MarketAlert = {
          id: Date.now(),
          type: ["security", "pricing", "market", "regulatory"][Math.floor(Math.random() * 4)] as any,
          severity: ["low", "medium", "high", "critical"][Math.floor(Math.random() * 4)] as any,
          title: "New market development detected",
          description: "AI-generated market intelligence update",
          timestamp: new Date(),
          vendor: ["cisco", "aruba", "portnox", "forescout"][Math.floor(Math.random() * 4)],
          read: false,
          impact: "Medium",
          source: "AI Market Analysis",
          recommendation: "Monitor situation closely",
        }
        setAlerts((prev) => [newAlert, ...prev.slice(0, 9)]) // Keep only 10 most recent
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return {
    alerts,
    unreadCount,
    markAsRead,
    markAllAsRead,
  }
}

export function useMarketData(): MarketMetrics {
  const [metrics, setMetrics] = useState<MarketMetrics>({
    nacMarketSize: 2.8,
    growthRate: 12.5,
    portnoxMarketShare: 8.7,
    portnoxGrowth: 45.2,
    threatLevel: "Medium",
    avgPriceChange: -8.3,
    customerSatisfaction: 94,
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        portnoxMarketShare: prev.portnoxMarketShare + (Math.random() - 0.5) * 0.1,
        portnoxGrowth: prev.portnoxGrowth + (Math.random() - 0.5) * 0.5,
        customerSatisfaction: Math.max(90, Math.min(98, prev.customerSatisfaction + (Math.random() - 0.5) * 0.2)),
      }))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return metrics
}
