"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export const PORTNOX_COLORS = {
  primary: "#00D4AA",
  primaryDark: "#00A88A",
  primaryLight: "#33DDBB",
  secondary: "#0A1628",
  secondaryLight: "#1A2638",
  accent: "#FF6B35",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
  purple: "#8B5CF6",
  pink: "#EC4899",
  textPrimaryDark: "#E0E0E0",
  textSecondaryDark: "#A0A0A0",
  textPrimaryLight: "#1F2937",
  textSecondaryLight: "#6B7280",
  gradient: {
    primary: "linear-gradient(135deg, #00D4AA 0%, #00A88A 100%)",
    secondary: "linear-gradient(135deg, #0A1628 0%, #1A2638 100%)",
    vibrant: "linear-gradient(135deg, #00D4AA 0%, #3B82F6 50%, #8B5CF6 100%)",
    fire: "linear-gradient(135deg, #FF6B35 0%, #F59E0B 50%, #EF4444 100%)",
    ocean: "linear-gradient(135deg, #00D4AA 0%, #06B6D4 50%, #3B82F6 100%)",
    sunset: "linear-gradient(135deg, #FF6B35 0%, #EC4899 50%, #8B5CF6 100%)",
  },
}

export const VIBRANT_COLORS = [
  PORTNOX_COLORS.primary,
  PORTNOX_COLORS.accent,
  PORTNOX_COLORS.info,
  PORTNOX_COLORS.success,
  PORTNOX_COLORS.warning,
  PORTNOX_COLORS.purple,
  PORTNOX_COLORS.pink,
  "#06B6D4",
  "#EF4444",
  "#6366F1",
  "#14B8A6",
  "#F97316",
]

export const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } }
export const staggerChildren = { animate: { transition: { staggerChildren: 0.07 } } }

export const GradientCard = ({
  children,
  className,
  gradient = "primary",
  ...props
}: {
  children: React.ReactNode
  className?: string
  gradient?: keyof typeof PORTNOX_COLORS.gradient
  [key: string]: any
}) => (
  <Card
    className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-xl border-border/50 hover:border-primary/50",
      className,
    )}
    {...props}
  >
    <div className="absolute inset-0 opacity-5" style={{ background: PORTNOX_COLORS.gradient[gradient] }} />
    <div className="relative z-10">{children}</div>
  </Card>
)

export const MetricCard = ({
  title,
  value,
  detail,
  icon,
  trend,
  trendValue,
  gradient = "primary",
}: {
  title: string
  value: string
  detail: string
  icon: React.ReactElement
  trend?: "up" | "down"
  trendValue?: string
  gradient?: keyof typeof PORTNOX_COLORS.gradient
}) => (
  <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} className="h-full">
    <GradientCard gradient={gradient} className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {React.cloneElement(icon, { className: "h-5 w-5 text-primary" })}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center">
        <div className="text-3xl font-bold">{value}</div>
        {trend && (
          <div className={cn("flex items-center text-xs mt-1", trend === "up" ? "text-green-500" : "text-red-500")}>
            {trend === "up" ? (
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-0.5" />
            )}
            <span>{trendValue}</span>
          </div>
        )}
        <p className="text-xs mt-1 text-muted-foreground">{detail}</p>
      </CardContent>
    </GradientCard>
  </motion.div>
)

export const SectionTitle = ({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactElement
}) => (
  <div className="flex items-center space-x-3 mb-4">
    <div className="p-2 bg-primary/10 rounded-lg">
      {React.cloneElement(icon, { className: "h-6 w-6 text-primary" })}
    </div>
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
)
