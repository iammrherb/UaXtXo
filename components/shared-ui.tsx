"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export const slideInLeft = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
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
export const VIBRANT_COLORS = ["#00D4AA", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"]

export const GRADIENTS = {
  primary: "from-blue-500 to-purple-600",
  success: "from-green-400 to-blue-500",
  warning: "from-yellow-400 to-orange-500",
  danger: "from-red-400 to-pink-500",
  info: "from-cyan-400 to-blue-500",
  forest: "from-green-600 to-teal-600",
  ocean: "from-blue-600 to-cyan-600",
  sunset: "from-orange-500 to-pink-500",
  royal: "from-purple-600 to-indigo-600",
}

export const colorPalette = {
  primary: ["#3B82F6", "#1D4ED8", "#1E40AF"],
  success: ["#10B981", "#059669", "#047857"],
  warning: ["#F59E0B", "#D97706", "#B45309"],
  danger: ["#EF4444", "#DC2626", "#B91C1C"],
  neutral: ["#6B7280", "#4B5563", "#374151"],
}

// Section Title Component
interface SectionTitleProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
}

export function SectionTitle({ title, subtitle, icon }: SectionTitleProps) {
  return (
    <div className="flex items-center space-x-3 mb-6">
      {icon && <div className="text-primary">{icon}</div>}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  )
}

// Metric Card Component
interface MetricCardProps {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: React.ReactNode
  gradient?: keyof typeof GRADIENTS
}

export function MetricCard({ title, value, change, changeType = "neutral", icon, gradient }: MetricCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", gradient && `bg-gradient-to-br ${GRADIENTS[gradient]}`)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={cn("text-sm font-medium", gradient ? "text-white/80" : "text-muted-foreground")}>{title}</p>
            <p className={cn("text-2xl font-bold", gradient ? "text-white" : "text-foreground")}>{value}</p>
            {change && (
              <p
                className={cn(
                  "text-xs",
                  gradient ? "text-white/70" : "text-muted-foreground",
                  changeType === "positive" && "text-green-600",
                  changeType === "negative" && "text-red-600",
                )}
              >
                {change}
              </p>
            )}
          </div>
          {icon && <div className={cn("h-8 w-8", gradient ? "text-white/80" : "text-muted-foreground")}>{icon}</div>}
        </div>
      </CardContent>
    </Card>
  )
}

// Gradient Card Component
interface GradientCardProps {
  children: React.ReactNode
  gradient: keyof typeof GRADIENTS
  className?: string
}

export function GradientCard({ children, gradient, className }: GradientCardProps) {
  return (
    <Card className={cn("relative overflow-hidden bg-gradient-to-br", GRADIENTS[gradient], className)}>{children}</Card>
  )
}

// Progress Ring Component
interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
}

export function ProgressRing({ progress, size = 120, strokeWidth = 8, color = "#3B82F6" }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
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
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold">{Math.round(progress)}%</span>
      </div>
    </div>
  )
}

// Status Badge Component
interface StatusBadgeProps {
  status: "excellent" | "good" | "fair" | "poor"
  children: React.ReactNode
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const variants = {
    excellent: "bg-green-100 text-green-800 border-green-200",
    good: "bg-blue-100 text-blue-800 border-blue-200",
    fair: "bg-yellow-100 text-yellow-800 border-yellow-200",
    poor: "bg-red-100 text-red-800 border-red-200",
  }

  return <Badge className={cn("border", variants[status])}>{children}</Badge>
}

// Comparison Table Component
interface ComparisonTableProps {
  data: Array<{
    vendor: string
    metrics: Record<string, string | number>
  }>
  highlightBest?: boolean
}

export function ComparisonTable({ data, highlightBest = true }: ComparisonTableProps) {
  if (!data.length) return null

  const metricKeys = Object.keys(data[0].metrics)

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3 font-semibold">Vendor</th>
            {metricKeys.map((key) => (
              <th key={key} className="text-left p-3 font-semibold capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.vendor} className={cn("border-b", index % 2 === 0 && "bg-muted/50")}>
              <td className="p-3 font-medium">{row.vendor}</td>
              {metricKeys.map((key) => (
                <td key={key} className="p-3">
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

// Loading Skeleton Component
export function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse bg-muted rounded", className)} />
}
