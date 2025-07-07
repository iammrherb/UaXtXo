"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: Record<string, any>
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, children, config, ...props }, ref) => {
    const configContext = React.useMemo(() => config, [config])

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <ChartConfigContext.Provider value={configContext}>{children}</ChartConfigContext.Provider>
      </div>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content?: React.ReactNode
}

const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(({ className, content, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("pointer-events-none", className)} {...props}>
      {content}
    </div>
  )
})
ChartTooltip.displayName = "ChartTooltip"

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("bg-secondary text-secondary-foreground p-2 rounded-md shadow-md", className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

interface ChartConfigContextProps {
  config?: Record<string, any>
}

const ChartConfigContext = React.createContext<ChartConfigContextProps>({})

function useChartConfig() {
  return React.useContext(ChartConfigContext)
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, useChartConfig }
