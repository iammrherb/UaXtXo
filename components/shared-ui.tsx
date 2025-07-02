"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

// Section Title Component
interface SectionTitleProps {
  icon: React.ReactNode
  title: string
  description?: string
  className?: string
}

export function SectionTitle({ icon, title, description, className }: SectionTitleProps) {
  return (
    <div className={cn("flex items-start gap-3 mb-6", className)}>
      <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
    </div>
  )
}

// Metric Card Component
interface MetricCardProps {
  title: string
  value: string | number
  detail?: string
  icon?: React.ReactNode
  gradient?: keyof typeof GRADIENTS
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function MetricCard({ title, value, detail, icon, gradient = "portnox", trend, className }: MetricCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-2xl font-bold">{value}</div>
          {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
          {trend && (
            <div className={cn("flex items-center text-xs", trend.isPositive ? "text-green-600" : "text-red-600")}>
              <span>{trend.isPositive ? "↗" : "↘"}</span>
              <span className="ml-1">{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
      </CardContent>
      <div className={cn("absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r", GRADIENTS[gradient])} />
    </Card>
  )
}

// Gradient Card Component
interface GradientCardProps {
  children: React.ReactNode
  gradient?: keyof typeof GRADIENTS
  className?: string
}

export function GradientCard({ children, gradient = "portnox", className }: GradientCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-5", GRADIENTS[gradient])} />
      <div className="relative">{children}</div>
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
  children: React.ReactNode
  className?: string
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  const statusStyles = {
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error: "bg-red-100 text-red-800 border-red-200",
    info: "bg-blue-100 text-blue-800 border-blue-200",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[status],
        className,
      )}
    >
      {children}
    </span>
  )
}

// Progress Ring Component
interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
}

export function ProgressRing({ progress, size = 60, strokeWidth = 4, className }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted"
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
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold">{Math.round(progress)}%</span>
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
  className?: string
}

export function ComparisonTable({ data, headers, className }: ComparisonTableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3 font-semibold">Feature</th>
            {headers.map((header) => (
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
              {headers.map((header) => (
                <td key={header} className="p-3 text-center">
                  {row.values[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
