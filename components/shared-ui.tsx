"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

// Animation variants
export const staggerChildren = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
}

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Color palettes
export const VIBRANT_COLORS = [
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#3B82F6", // Blue
  "#8B5A2B", // Brown
  "#6B7280", // Gray
]

export const GRADIENTS = {
  primary: "from-purple-500 to-pink-500",
  secondary: "from-blue-500 to-cyan-500",
  success: "from-green-500 to-emerald-500",
  warning: "from-yellow-500 to-orange-500",
  danger: "from-red-500 to-pink-500",
}

export const colorPalette = {
  primary: "#8B5CF6",
  secondary: "#06B6D4",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
}

// Utility Components
interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  trend?: "up" | "down" | "neutral"
  className?: string
  icon?: React.ReactNode
}

export function MetricCard({ title, value, change, trend, className, icon }: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon}
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold">{value}</div>
          {change !== undefined && (
            <div className="flex items-center space-x-1">
              {getTrendIcon()}
              <span
                className={cn("text-xs", {
                  "text-green-500": trend === "up",
                  "text-red-500": trend === "down",
                  "text-gray-500": trend === "neutral",
                })}
              >
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface GradientCardProps {
  title: string
  value: string | number
  gradient: keyof typeof GRADIENTS
  className?: string
  children?: React.ReactNode
}

export function GradientCard({ title, value, gradient, className, children }: GradientCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className={cn("bg-gradient-to-r p-6 text-white", GRADIENTS[gradient])}>
        <div className="space-y-2">
          <p className="text-sm font-medium opacity-90">{title}</p>
          <div className="text-3xl font-bold">{value}</div>
        </div>
      </div>
      {children && <CardContent className="p-6">{children}</CardContent>}
    </Card>
  )
}

interface StatusBadgeProps {
  status: "high" | "medium" | "low" | "excellent" | "good" | "fair" | "poor"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case "high":
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
      case "good":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
      case "fair":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "poor":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Badge variant="outline" className={cn(getStatusColor(), "capitalize", className)}>
      {status}
    </Badge>
  )
}

interface ProgressRingProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  children?: React.ReactNode
}

export function ProgressRing({ value, size = 120, strokeWidth = 8, className, children }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted-foreground/20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-primary transition-all duration-300 ease-in-out"
          strokeLinecap="round"
        />
      </svg>
      {children && <div className="absolute inset-0 flex items-center justify-center">{children}</div>}
    </div>
  )
}

interface ComparisonTableProps {
  data: Array<{
    vendor: string
    metrics: Record<string, string | number>
  }>
  className?: string
}

export function ComparisonTable({ data, className }: ComparisonTableProps) {
  if (!data.length) return null

  const metricKeys = Object.keys(data[0]?.metrics || {})

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 font-medium">Vendor</th>
            {metricKeys.map((key) => (
              <th key={key} className="text-left p-4 font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b hover:bg-muted/50">
              <td className="p-4 font-medium">{row.vendor}</td>
              {metricKeys.map((key) => (
                <td key={key} className="p-4">
                  {row.metrics[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
      </div>
    </div>
  )
}
