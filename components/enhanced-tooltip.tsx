"use client"

import type React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, Shield, DollarSign, AlertTriangle, CheckCircle, Info, Lightbulb, Target } from "lucide-react"

interface EnhancedTooltipProps {
  children: React.ReactNode
  title: string
  description?: string
  metrics?: Array<{
    label: string
    value: string | number
    trend?: "up" | "down" | "neutral"
    color?: "green" | "red" | "blue" | "orange" | "purple"
  }>
  insights?: string[]
  recommendations?: string[]
  confidence?: number
  source?: string
  className?: string
}

export function EnhancedTooltip({
  children,
  title,
  description,
  metrics = [],
  insights = [],
  recommendations = [],
  confidence,
  source,
  className,
}: EnhancedTooltipProps) {
  const getTrendIcon = (trend?: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />
      case "down":
        return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
      default:
        return null
    }
  }

  const getColorClass = (color?: string) => {
    switch (color) {
      case "green":
        return "text-green-600"
      case "red":
        return "text-red-600"
      case "blue":
        return "text-blue-600"
      case "orange":
        return "text-orange-600"
      case "purple":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className={className}>
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-4 bg-white border shadow-lg">
          <div className="space-y-3">
            {/* Header */}
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-1">{title}</h4>
              {description && <p className="text-xs text-gray-600">{description}</p>}
            </div>

            {/* Metrics */}
            {metrics.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
                    <DollarSign className="h-3 w-3" />
                    Key Metrics
                  </div>
                  {metrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{metric.label}</span>
                      <div className="flex items-center gap-1">
                        <span className={`font-medium ${getColorClass(metric.color)}`}>{metric.value}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Insights */}
            {insights.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
                    <Lightbulb className="h-3 w-3" />
                    Key Insights
                  </div>
                  <ul className="space-y-1">
                    {insights.slice(0, 3).map((insight, index) => (
                      <li key={index} className="flex items-start gap-1 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
                    <Target className="h-3 w-3" />
                    Recommendations
                  </div>
                  <ul className="space-y-1">
                    {recommendations.slice(0, 2).map((rec, index) => (
                      <li key={index} className="flex items-start gap-1 text-xs">
                        <AlertTriangle className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Confidence & Source */}
            {(confidence || source) && (
              <>
                <Separator />
                <div className="flex items-center justify-between text-xs">
                  {confidence && (
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3 text-blue-500" />
                      <span className="text-gray-600">
                        Confidence: <span className="font-medium">{confidence}%</span>
                      </span>
                    </div>
                  )}
                  {source && (
                    <div className="flex items-center gap-1">
                      <Info className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-500">{source}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
