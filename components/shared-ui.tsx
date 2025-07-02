"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertCircle, XCircle } from "lucide-react"

// Animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Color palettes
export const colorPalette = {
  primary: ["#3b82f6", "#1d4ed8", "#1e40af", "#1e3a8a"],
  success: ["#10b981", "#059669", "#047857", "#065f46"],
  warning: ["#f59e0b", "#d97706", "#b45309", "#92400e"],
  danger: ["#ef4444", "#dc2626", "#b91c1c", "#991b1b"],
  neutral: ["#6b7280", "#4b5563", "#374151", "#1f2937"],
}

// Section Title Component
export function SectionTitle({
  title,
  subtitle,
  className,
}: {
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={cn("mb-6", className)}>
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  )
}

// Metric Card Component
export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  className,
}: {
  title: string
  value: string | number
  change?: string | number
  changeType?: "positive" | "negative" | "neutral"
  icon?: React.ReactNode
  className?: string
}) {
  const getTrendIcon = () => {
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
    <motion.div variants={fadeInUp}>
      <Card className={cn("p-6", className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {icon && <div className="text-primary">{icon}</div>}
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          {change && (
            <div className="flex items-center space-x-1">
              {getTrendIcon()}
              <span
                className={cn(
                  "text-sm font-medium",
                  changeType === "positive" && "text-green-500",
                  changeType === "negative" && "text-red-500",
                  changeType === "neutral" && "text-gray-500",
                )}
              >
                {change}
              </span>
            </div>
          )}
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </Card>
    </motion.div>
  )
}

// Gradient Card Component
export function GradientCard({
  title,
  children,
  gradient = "primary",
  className,
}: {
  title: string
  children: React.ReactNode
  gradient?: "primary" | "success" | "warning" | "danger"
  className?: string
}) {
  const gradients = {
    primary: "from-blue-500 to-blue-600",
    success: "from-green-500 to-green-600",
    warning: "from-yellow-500 to-yellow-600",
    danger: "from-red-500 to-red-600",
  }

  return (
    <motion.div variants={fadeInUp}>
      <Card className={cn("overflow-hidden", className)}>
        <div className={cn("bg-gradient-to-r p-6 text-white", gradients[gradient])}>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <CardContent className="p-6">{children}</CardContent>
      </Card>
    </motion.div>
  )
}

// Comparison Table Component
export function ComparisonTable({
  data,
  columns,
  highlightBest = true,
  className,
}: {
  data: any[]
  columns: { key: string; label: string; format?: (value: any) => string }[]
  highlightBest?: boolean
  className?: string
}) {
  return (
    <motion.div variants={fadeInUp} className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            {columns.map((column) => (
              <th key={column.key} className="text-left p-3 font-semibold">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b hover:bg-muted/50">
              {columns.map((column) => (
                <td key={column.key} className="p-3">
                  {column.format ? column.format(row[column.key]) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}

// Progress Ring Component
export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
  color = "#3b82f6",
  className,
}: {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
  className?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

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

// Status Badge Component
export function StatusBadge({
  status,
  className,
}: {
  status: "success" | "warning" | "error" | "info"
  className?: string
}) {
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
      <span className="capitalize">{status}</span>
    </Badge>
  )
}
