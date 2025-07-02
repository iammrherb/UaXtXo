"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } }
export const staggerChildren = { animate: { transition: { staggerChildren: 0.07 } } }

export const VIBRANT_COLORS = ["#00D4AA", "#3B82F6", "#FF6B35", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#6366F1"]

export const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <motion.div variants={fadeInUp} className="mb-6">
    <h2 className="text-2xl font-bold text-primary">{title}</h2>
    <p className="text-muted-foreground">{subtitle}</p>
  </motion.div>
)

export const GradientCard = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
  [key: string]: any
}) => (
  <Card
    className={cn("relative overflow-hidden transition-all duration-300 hover:shadow-xl h-full bg-card", className)}
    {...props}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10" />
    <div className="relative z-10 h-full flex flex-col">{children}</div>
  </Card>
)

export const MetricCard = ({
  title,
  value,
  detail,
  icon,
  trend,
  trendValue,
}: {
  title: string
  value: string
  detail: string
  icon: React.ReactElement
  trend?: "up" | "down"
  trendValue?: string
}) => (
  <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} className="h-full">
    <GradientCard>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {React.cloneElement(icon, { className: "h-5 w-5 text-primary" })}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center">
        <motion.div
          className="text-3xl font-bold text-foreground"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {value}
        </motion.div>
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
