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
export const VIBRANT_COLORS = ["#00D4AA", "#FF6B35", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"]

export const GRADIENTS = {
  primary: "from-blue-500 to-purple-600",
  success: "from-green-500 to-emerald-600",
  warning: "from-yellow-500 to-orange-600",
  danger: "from-red-500 to-pink-600",
}

export const colorPalette = {
  primary: "#3B82F6",
  secondary: "#10B981",
  accent: "#F59E0B",
  danger: "#EF4444",
  success: "#22C55E",
  warning: "#F97316",
}

// Utility Components
export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  )
}

export function MetricCard({
  title,
  value,
  detail,
  icon,
  trend,
  className,
}: {
  title: string
  value: string | number
  detail?: string
  icon?: React.ReactNode
  trend?: "up" | "down" | "neutral"
  className?: string
}) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
          </div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        {trend && (
          <div className="absolute top-2 right-2">
            <Badge
              variant={trend === "up" ? "default" : trend === "down" ? "destructive" : "secondary"}
              className="text-xs"
            >
              {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function GradientCard({
  title,
  value,
  subtitle,
  gradient,
  children,
}: {
  title: string
  value: string | number
  subtitle?: string
  gradient: string
  children?: React.ReactNode
}) {
  return (
    <Card className={`bg-gradient-to-br ${gradient} text-white border-0`}>
      <CardContent className="p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold opacity-90">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
          {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
          {children}
        </div>
      </CardContent>
    </Card>
  )
}

export function StatusBadge({ status, label }: { status: "high" | "medium" | "low"; label?: string }) {
  const variants = {
    high: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-red-100 text-red-800 border-red-200",
  }

  return (
    <Badge className={cn("border", variants[status])}>
      {label || status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
  color = "#3B82F6",
}: {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

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
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{Math.round(value)}%</span>
      </div>
    </div>
  )
}

export function ComparisonTable({
  data,
  columns,
}: {
  data: Array<Record<string, any>>
  columns: Array<{ key: string; label: string; format?: (value: any) => string }>
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            {columns.map((col) => (
              <th key={col.key} className="text-left p-3 font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b hover:bg-muted/50">
              {columns.map((col) => (
                <td key={col.key} className="p-3">
                  {col.format ? col.format(row[col.key]) : row[col.key]}
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
  return <div className={cn("animate-pulse bg-muted rounded", className)} />
}
