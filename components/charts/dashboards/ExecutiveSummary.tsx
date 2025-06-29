"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Shield, Clock, Users } from "lucide-react"
import { useDashboardSettings } from "@/context/DashboardContext"

export function GlassMetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ElementType
  description?: string
}) {
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-gray-600",
  }

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Clock

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
          <Icon className="h-4 w-4 text-portnox-blue" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="flex items-center gap-2">
            <TrendIcon className={`h-4 w-4 ${trendColors[trend]}`} />
            <span className={`text-sm font-medium ${trendColors[trend]}`}>{change}</span>
          </div>
          {description && <p className="text-xs text-gray-600">{description}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ExecutiveSummary() {
  const { settings } = useDashboardSettings()

  const metrics = [
    {
      title: "Total Cost of Ownership",
      value: "$2.4M",
      change: "15% lower than industry avg",
      trend: "up" as const,
      icon: DollarSign,
      description: `${settings.comparisonYears}-year projection for ${settings.orgSize} organization`,
    },
    {
      title: "Security Score",
      value: "94/100",
      change: "8% improvement",
      trend: "up" as const,
      icon: Shield,
      description: "Comprehensive security posture rating",
    },
    {
      title: "Implementation Time",
      value: "6 weeks",
      change: "40% faster deployment",
      trend: "up" as const,
      icon: Clock,
      description: "Average time to full deployment",
    },
    {
      title: "User Impact",
      value: "Minimal",
      change: "95% user satisfaction",
      trend: "up" as const,
      icon: Users,
      description: "Seamless user experience maintained",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Executive Summary</h2>
          <p className="text-gray-600">
            TCO Analysis for {settings.industry} organization ({settings.orgSize})
          </p>
        </div>
        <Badge variant="outline" className="bg-portnox-blue/10 text-portnox-blue border-portnox-blue/20">
          {settings.comparisonYears}-Year Analysis
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <GlassMetricCard key={index} {...metric} />
        ))}
      </div>

      <Card className="bg-gradient-to-r from-portnox-blue/5 to-portnox-teal/5 border-portnox-blue/20">
        <CardHeader>
          <CardTitle className="text-portnox-blue">Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-portnox-blue mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                Portnox NAC solution delivers 15% lower TCO compared to traditional solutions while maintaining
                enterprise-grade security.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-portnox-teal mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                Cloud-native architecture reduces infrastructure costs by 40% and accelerates deployment timelines.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-portnox-blue mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                Automated policy enforcement and zero-touch provisioning minimize operational overhead and human error.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
