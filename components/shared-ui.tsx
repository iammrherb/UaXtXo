"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import React from "react"

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.07,
    },
  },
}

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
    className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-xl bg-card border hover:border-primary/20",
      className,
    )}
    {...props}
  >
    <div className="absolute inset-0 opacity-[0.03] bg-gradient-to-br from-primary to-primary/50" />
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
}: {
  title: string
  value: string
  detail: string
  icon: React.ReactElement
  trend?: "up" | "down"
  trendValue?: string
}) => (
  <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} className="h-full">
    <GradientCard className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {React.cloneElement(icon, {
          className: "h-5 w-5 text-muted-foreground",
        })}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center">
        <div className="text-3xl font-bold text-card-foreground">{value}</div>
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
  <div className="flex items-center space-x-3 mb-6">
    <div className="p-2 bg-primary/10 rounded-lg">
      {React.cloneElement(icon, { className: "h-6 w-6 text-primary" })}
    </div>
    <div>
      <h2 className="text-xl font-bold text-card-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
)
