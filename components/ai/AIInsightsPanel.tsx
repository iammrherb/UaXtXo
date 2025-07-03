"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Sparkles } from "lucide-react"
import type { AIInsight, ExecutiveSummary, SmartRecommendation } from "@/lib/ai/insight-generator"

export const AIInsightsPanel: React.FC<{
  executiveSummary: ExecutiveSummary | null
  insights: AIInsight[]
  recommendations: SmartRecommendation[]
  isLoading: boolean
  onGenerateAll: () => void
}> = ({ executiveSummary, insights, recommendations, isLoading, onGenerateAll }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI-Powered Insights</h2>
            <p className="text-slate-400">Intelligent analysis and recommendations</p>
          </div>
        </div>
        <Button
          onClick={onGenerateAll}
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {isLoading ? "Generating..." : "Generate Insights"}
        </Button>
      </div>
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="mt-6">
          {isLoading ? <p>Loading...</p> : <p>{executiveSummary?.overview}</p>}
        </TabsContent>
        <TabsContent value="insights" className="mt-6">
          {isLoading ? <p>Loading...</p> : insights.map((i) => <p key={i.id}>{i.title}</p>)}
        </TabsContent>
        <TabsContent value="recommendations" className="mt-6">
          {isLoading ? <p>Loading...</p> : recommendations.map((r) => <p key={r.id}>{r.title}</p>)}
        </TabsContent>
      </Tabs>
    </div>
  )
}
