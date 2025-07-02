import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

export const SectionTitle = ({
  title,
  tooltip,
  children,
}: {
  title: string
  tooltip?: string
  children?: React.ReactNode
}) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
    {children}
  </div>
)

export const DataCard = ({
  title,
  value,
  change,
  unit,
  tooltip,
  children,
  className,
}: {
  title: string
  value: string | number
  change?: number
  unit?: string
  tooltip?: string
  children?: React.ReactNode
  className?: string
}) => (
  <Card className={cn("flex flex-col", className)}>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center justify-between">
        <span>{title}</span>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardTitle>
    </CardHeader>
    <CardContent className="flex-grow flex flex-col justify-center">
      {children ? (
        children
      ) : (
        <>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {value}
            {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
          </div>
          {change !== undefined && (
            <p className={cn("text-xs text-muted-foreground mt-1", change > 0 ? "text-green-600" : "text-red-600")}>
              {change > 0 ? "+" : ""}
              {change.toFixed(2)}% vs. average
            </p>
          )}
        </>
      )}
    </CardContent>
  </Card>
)

export const formatCurrency = (value: number, decimals = 0) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value)
}
