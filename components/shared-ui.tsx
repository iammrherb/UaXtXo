"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertCircle, XCircle } from "lucide-react"

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
    x: -50,
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
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Color palette
export const VIBRANT_COLORS = [
  "#00D4AA", // Portnox primary
  "#FF6B35", // Orange
  "#3B82F6", // Blue
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#8B5CF6", // Violet
  "#EF4444", // Red
  "#06B6D4", // Cyan
]

// Gradient definitions
export const GRADIENTS = {
  portnox: "from-[#00D4AA] to-[#00B894]",
  ocean: "from-blue-500 to-cyan-500",
  sunset: "from-orange-500 to-red-500",
  forest: "from-green-500 to-emerald-500",
  royal: "from-purple-500 to-indigo-500",
  gold: "from-yellow-500 to-orange-500",
}

export const colorPalette = {
  primary: ["#3b82f6", "#1d4ed8", "#1e40af", "#1e3a8a"],
  success: ["#10b981", "#059669", "#047857", "#065f46"],
  warning: ["#f59e0b", "#d97706", "#b45309", "#92400e"],
  danger: ["#ef4444", "#dc2626", "#b91c1c", "#991b1b"],
  neutral: ["#6b7280", "#4b5563", "#374151", "#1f2937"],
}

// Section Title Component
interface SectionTitleProps {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  description?: string
  className?: string
}

export function SectionTitle({ icon, title, subtitle, description, className }: SectionTitleProps) {
  return (
    <div className={cn("flex items-start gap-3 mb-6", className)}>
      {icon && <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>}
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {(subtitle || description) && <p className="text-muted-foreground mt-1">{subtitle || description}</p>}
      </div>
    </div>
  )
}

// Metric Card Component
interface MetricCardProps {
  title: string
  value: string | number
  detail?: string
  change?: string | number
  changeType?: "positive" | "negative" | "neutral"
  icon?: React.ReactNode
  gradient?: keyof typeof GRADIENTS
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function MetricCard({
  title,
  value,
  detail,
  change,
  changeType = "neutral",
  icon,
  gradient = "portnox",
  trend,
  className,
}: MetricCardProps) {
  const getTrendIcon = () => {
    if (trend) {
      return trend.isPositive ? (
        <TrendingUp className="h-4 w-4 text-green-500" />
      ) : (
        <TrendingDown className="h-4 w-4 text-red-500" />
      )
    }

    switch (changeType) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "negative":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            {icon && <div className="text-muted-foreground">{icon}</div>}
            {(change || trend) && (
              <div className="flex items-center space-x-1">
                {getTrendIcon()}
                <span
                  className={cn(
                    "text-sm font-medium",
                    (changeType === "positive" || (trend && trend.isPositive)) && "text-green-500",
                    (changeType === "negative" || (trend && !trend.isPositive)) && "text-red-500",
                    changeType === "neutral" && "text-gray-500",
                  )}
                >
                  {change || (trend && `${Math.abs(trend.value)}%`)}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-2xl font-bold">{value}</div>
          {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
        </div>
      </CardContent>
      <div className={cn("absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r", GRADIENTS[gradient])} />
    </Card>
  )
}

// Gradient Card Component
interface GradientCardProps {
  title?: string
  children: React.ReactNode
  gradient?: keyof typeof GRADIENTS | "primary" | "success" | "warning" | "danger"
  className?: string
}

export function GradientCard({ title, children, gradient = "portnox", className }: GradientCardProps) {
  const gradients = {
    ...GRADIENTS,
    primary: "from-blue-500 to-blue-600",
    success: "from-green-500 to-green-600",
    warning: "from-yellow-500 to-yellow-600",
    danger: "from-red-500 to-red-600",
  }

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      {title && (
        <div className={cn("bg-gradient-to-r p-6 text-white", gradients[gradient])}>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      {!title && <div className={cn("absolute inset-0 bg-gradient-to-br opacity-5", gradients[gradient])} />}
      <div className="relative">{title ? <CardContent className="p-6">{children}</CardContent> : children}</div>
    </Card>
  )
}

// Loading Skeleton Component
export function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse bg-muted rounded-md", className)} />
}

// Status Badge Component
interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "info"
  children?: React.ReactNode
  className?: string
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  const variants = {
    success: {
      icon: <CheckCircle className="h-4 w-4" />,
      className: "bg-green-100 text-green-800 border-green-200",
    },
    warning: {
      icon: <AlertCircle className="h-4 w-4" />,
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    error: {
      icon: <XCircle className="h-4 w-4" />,
      className: "bg-red-100 text-red-800 border-red-200",
    },
    info: {
      icon: <AlertCircle className="h-4 w-4" />,
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
  }

  const variant = variants[status]

  return (
    <Badge className={cn("flex items-center space-x-1 border", variant.className, className)}>
      {variant.icon}
      <span className="capitalize">{children || status}</span>
    </Badge>
  )
}

// Progress Ring Component
interface ProgressRingProps {
  progress?: number
  value?: number
  size?: number
  strokeWidth?: number
  color?: string
  className?: string
}

export function ProgressRing({
  progress,
  value,
  size = 60,
  strokeWidth = 4,
  color = "#3b82f6",
  className,
}: ProgressRingProps) {
  const actualValue = progress || value || 0
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (actualValue / 100) * circumference

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg className="transform -rotate-90" width={size} height={size}>
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
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold">{Math.round(actualValue)}%</span>
      </div>
    </div>
  )
}

// Comparison Table Component
interface ComparisonTableProps {
  data: Array<{
    label: string
    values: Record<string, string | number | React.ReactNode>
  }>
  headers: string[]
  columns?: { key: string; label: string; format?: (value: any) => string }[]
  highlightBest?: boolean
  className?: string
}

export function ComparisonTable({ data, headers, columns, highlightBest = true, className }: ComparisonTableProps) {
  // Use either the new columns format or the legacy headers format
  const tableColumns = columns || headers.map((header) => ({ key: header, label: header }))
  const tableHeaders = columns ? columns.map((col) => col.label) : headers

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3 font-semibold">Feature</th>
            {tableHeaders.map((header) => (
              <th key={header} className="text-center p-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b hover:bg-muted/50">
              <td className="p-3 font-medium">{row.label}</td>
              {(columns || headers).map((col) => {
                const key = typeof col === "string" ? col : col.key
                const format = typeof col === "object" ? col.format : undefined
                const value = row.values[key]
                return (
                  <td key={key} className="p-3 text-center">
                    {format ? format(value) : value}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
