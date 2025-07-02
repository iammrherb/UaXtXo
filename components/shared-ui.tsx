"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Animation variants
export const staggerChildren = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Color palettes
export const VIBRANT_COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Violet
  "#06B6D4", // Cyan
  "#84CC16", // Lime
  "#F97316", // Orange
]

export const GRADIENTS = {
  primary: "from-blue-500 to-purple-600",
  success: "from-green-500 to-emerald-600",
  warning: "from-yellow-500 to-orange-600",
  danger: "from-red-500 to-pink-600",
  info: "from-cyan-500 to-blue-600",
}

export const colorPalette = {
  primary: VIBRANT_COLORS,
  gradients: GRADIENTS,
}

// Utility Components
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

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: React.ReactNode
  detail?: string
  gradient?: keyof typeof GRADIENTS
}

export function MetricCard({ title, value, change, changeType, icon, detail, gradient }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold">{value}</p>
              {change && (
                <Badge
                  variant={
                    changeType === "positive" ? "default" : changeType === "negative" ? "destructive" : "secondary"
                  }
                  className="text-xs"
                >
                  {change}
                </Badge>
              )}
            </div>
            {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
          </div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  )
}

interface GradientCardProps {
  title: string
  value: string | number
  subtitle?: string
  gradient: keyof typeof GRADIENTS
  icon?: React.ReactNode
}

export function GradientCard({ title, value, subtitle, gradient, icon }: GradientCardProps) {
  return (
    <Card className={cn("bg-gradient-to-r", GRADIENTS[gradient], "text-white")}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium opacity-90">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {subtitle && <p className="text-sm opacity-75">{subtitle}</p>}
          </div>
          {icon && <div className="opacity-75">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  )
}

interface StatusBadgeProps {
  status: "high" | "medium" | "low"
  label?: string
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const variants = {
    high: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-red-100 text-red-800 border-red-200",
  }

  return (
    <Badge variant="outline" className={variants[status]}>
      {label || status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
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
    <div className={cn("relative", className)}>
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
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{Math.round(value)}%</span>
      </div>
    </div>
  )
}

interface ComparisonTableProps {
  data: Array<Record<string, any>>
  columns: Array<{
    key: string
    label: string
    format?: (value: any) => string
  }>
  highlightBest?: boolean
}

export function ComparisonTable({ data, columns, highlightBest }: ComparisonTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column.key} className="font-medium">
                {column.format ? column.format(row[column.key]) : row[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
      <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
      <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
    </div>
  )
}
