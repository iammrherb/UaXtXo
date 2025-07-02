"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

// Animation variants
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

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerContainer = {
  initial: "initial",
  animate: "animate",
  variants: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
}

// Color palettes
export const VIBRANT_COLORS = [
  "#00D4AA", // Portnox Green
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#F59E0B", // Amber
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
  "#10B981", // Emerald
  "#F97316", // Orange
]

export const GRADIENTS = {
  portnox: "from-emerald-500 to-teal-600",
  forest: "from-green-500 to-emerald-600",
  ocean: "from-blue-500 to-cyan-600",
  royal: "from-purple-500 to-indigo-600",
  sunset: "from-orange-500 to-red-600",
  success: "from-green-400 to-emerald-500",
  primary: "from-blue-400 to-indigo-500",
}

export const colorPalette = {
  primary: ["#00D4AA", "#00B894", "#00A085", "#008876"],
  success: ["#10B981", "#059669", "#047857", "#065F46"],
  neutral: ["#6B7280", "#4B5563", "#374151", "#1F2937"],
  warning: ["#F59E0B", "#D97706", "#B45309", "#92400E"],
  danger: ["#EF4444", "#DC2626", "#B91C1C", "#991B1B"],
}

// Utility Components
interface SectionTitleProps {
  title: string
  subtitle?: string
  icon?: ReactNode
}

export function SectionTitle({ title, subtitle, icon }: SectionTitleProps) {
  return (
    <motion.div variants={fadeInUp} className="mb-6">
      <div className="flex items-center space-x-3 mb-2">
        {icon && <div className="text-primary">{icon}</div>}
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </motion.div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: ReactNode
  className?: string
}

export function MetricCard({ title, value, change, changeType = "neutral", icon, className }: MetricCardProps) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className={cn("p-6", className)}>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <p
                className={cn("text-xs", {
                  "text-green-600": changeType === "positive",
                  "text-red-600": changeType === "negative",
                  "text-muted-foreground": changeType === "neutral",
                })}
              >
                {change}
              </p>
            )}
          </div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </Card>
    </motion.div>
  )
}

interface GradientCardProps {
  title: string
  gradient: keyof typeof GRADIENTS
  children: ReactNode
  className?: string
}

export function GradientCard({ title, gradient, children, className }: GradientCardProps) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className={cn("overflow-hidden", className)}>
        <div className={cn("h-2 bg-gradient-to-r", GRADIENTS[gradient])} />
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  )
}

interface StatusBadgeProps {
  status: "high" | "medium" | "low"
  label: string
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const variants = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  }

  return <Badge className={variants[status]}>{label}</Badge>
}

interface ProgressRingProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
}

export function ProgressRing({ value, size = 120, strokeWidth = 8, className }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (value / 100) * circumference

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
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-semibold">{value}%</span>
      </div>
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
            <tr key={index} className="border-b hover:bg-muted/50">
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

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  )
}
