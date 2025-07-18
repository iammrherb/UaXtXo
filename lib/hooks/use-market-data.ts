"use client"

import { useState, useEffect } from "react"

interface MarketAlert {
  id: number
  type: "security" | "pricing" | "market" | "compliance"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  timestamp: Date
  vendor: string
  read: boolean
}

export function useMarketAlerts() {
  const [alerts, setAlerts] = useState<MarketAlert[]>([
    {
      id: 1,
      type: "security",
      severity: "high",
      title: "Critical CVE discovered in Cisco ISE",
      description: "CVE-2024-0001 affects ISE versions 3.1 and earlier - immediate patching required",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      vendor: "cisco",
      read: false,
    },
    {
      id: 2,
      type: "pricing",
      severity: "medium",
      title: "Aruba ClearPass announces price increase",
      description: "15% price increase effective Q2 2024 across all licensing tiers",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      vendor: "aruba",
      read: false,
    },
    {
      id: 3,
      type: "market",
      severity: "low",
      title: "Portnox expands global infrastructure",
      description: "New data centers launched in Frankfurt, Amsterdam, and Singapore",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      vendor: "portnox",
      read: true,
    },
    {
      id: 4,
      type: "security",
      severity: "critical",
      title: "Ivanti Pulse Secure under active attack",
      description: "Nation-state actors exploiting zero-day vulnerabilities - immediate migration recommended",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      vendor: "ivanti",
      read: false,
    },
    {
      id: 5,
      type: "compliance",
      severity: "medium",
      title: "New GDPR requirements for NAC solutions",
      description: "Updated data processing requirements effective January 2025",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      vendor: "general",
      read: false,
    },
  ])

  const unreadCount = alerts.filter((alert) => !alert.read).length

  const markAsRead = (alertId: number) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert)))
  }

  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })))
  }

  // Simulate new alerts coming in
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldAddAlert = Math.random() < 0.1 // 10% chance every minute

      if (shouldAddAlert) {
        const newAlert: MarketAlert = {
          id: Date.now(),
          type: ["security", "pricing", "market", "compliance"][Math.floor(Math.random() * 4)] as any,
          severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as any,
          title: "New market development detected",
          description: "Real-time market intelligence update",
          timestamp: new Date(),
          vendor: ["cisco", "aruba", "portnox", "forescout"][Math.floor(Math.random() * 4)],
          read: false,
        }

        setAlerts((prev) => [newAlert, ...prev.slice(0, 9)]) // Keep only 10 most recent
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  return {
    alerts,
    unreadCount,
    markAsRead,
    markAllAsRead,
  }
}

export function useMarketData() {
  const [marketData, setMarketData] = useState({
    nacMarketSize: 2.8,
    growthRate: 12.5,
    portnoxMarketShare: 8.2,
    competitorPricing: {
      cisco: { trend: "up", change: 12 },
      aruba: { trend: "up", change: 8 },
      forescout: { trend: "stable", change: 2 },
      portnox: { trend: "down", change: -5 },
    },
    securityIncidents: {
      total: 47,
      critical: 12,
      byVendor: {
        cisco: 15,
        aruba: 8,
        forescout: 12,
        ivanti: 23,
        portnox: 0,
      },
    },
    customerSatisfaction: {
      portnox: 94,
      cisco: 72,
      aruba: 78,
      forescout: 69,
    },
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) => ({
        ...prev,
        nacMarketSize: prev.nacMarketSize + (Math.random() - 0.5) * 0.1,
        portnoxMarketShare: Math.max(0, Math.min(100, prev.portnoxMarketShare + (Math.random() - 0.5) * 0.5)),
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return marketData
}
