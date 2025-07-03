"use client"

import { Lightbulb, Zap, AlertTriangle, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAIInsights } from "@/hooks/useAIInsights"
import type { AIInsight } from "@/lib/ai/insight-generator"

const InsightIcon = ({ category }: { category: AIInsight["category"] }) => {
  switch (category) {
    case "recommendation":
      return <Lightbulb className="h-4 w-4 text-blue-500" />
    case "opportunity":
      return <Zap className="h-4 w-4 text-green-500" />
    case "risk":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case "strength":
      return <ShieldCheck className="h-4 w-4 text-purple-500" />
    default:
      return <Lightbulb className="h-4 w-4 text-gray-500" />
  }
}

export function AIInsightsSummary() {
  const { insights, isLoading, error } = useAIInsights()

  const summaryInsights = insights?.slice(0, 3) // Show top 3 insights

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Could not load AI summary.</AlertDescription>
      </Alert>
    )
  }

  if (!summaryInsights || summaryInsights.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Insights Summary</CardTitle>
          <CardDescription>Key takeaways from the analysis.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No summary available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insights Summary</CardTitle>
        <CardDescription>Key takeaways from the analysis.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {summaryInsights.map((insight, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <InsightIcon category={insight.category} />
            </div>
            <p className="text-sm text-muted-foreground">{insight.title}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
