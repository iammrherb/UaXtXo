"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  TrendingUp,
  Target,
  Brain,
  BarChart3,
  Zap,
  Shield,
  DollarSign,
  Clock,
  Activity,
} from "lucide-react"
import WhatIfScenarioBuilder from "@/components/analysis/WhatIfScenarioBuilder"
import SensitivityAnalyzer from "@/components/analysis/SensitivityAnalyzer"
import MonteCarloSimulator from "@/components/analysis/MonteCarloSimulator"
import ScenarioComparison from "@/components/analysis/ScenarioComparison"
import { motion } from "framer-motion"

export default function Home() {
  const [activeTab, setActiveTab] = useState("scenarios")

  const analysisTools = [
    {
      id: "scenarios",
      name: "What-If Scenarios",
      description: "Build and test different business scenarios with varying assumptions",
      icon: Calculator,
      color: "bg-emerald-500",
      features: ["Parameter adjustment", "Scenario templates", "Real-time calculations", "Risk assessment"],
    },
    {
      id: "sensitivity",
      name: "Sensitivity Analysis",
      description: "Understand which parameters have the greatest impact on your TCO",
      icon: Target,
      color: "bg-blue-500",
      features: ["Tornado charts", "Spider diagrams", "Parameter ranking", "Impact quantification"],
    },
    {
      id: "montecarlo",
      name: "Monte Carlo Simulation",
      description: "Statistical analysis with uncertainty and probability distributions",
      icon: Brain,
      color: "bg-purple-500",
      features: ["10,000+ simulations", "Risk metrics", "Confidence intervals", "Distribution analysis"],
    },
    {
      id: "comparison",
      name: "Scenario Comparison",
      description: "Compare multiple scenarios side-by-side to identify the best path forward",
      icon: BarChart3,
      color: "bg-orange-500",
      features: ["Side-by-side comparison", "Performance ranking", "Trade-off analysis", "Visual insights"],
    },
  ]

  const keyBenefits = [
    {
      icon: DollarSign,
      title: "Cost Optimization",
      description: "Identify scenarios that minimize TCO while maximizing value",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Quantify and mitigate risks through scenario planning",
    },
    {
      icon: TrendingUp,
      title: "ROI Maximization",
      description: "Find the optimal balance between investment and returns",
    },
    {
      icon: Clock,
      title: "Time to Value",
      description: "Accelerate decision-making with data-driven insights",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <motion.div
          className="text-center space-y-6 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
              <Zap className="h-8 w-8 text-emerald-400" />
            </div>
            <h1 className="text-5xl font-bold text-white">Advanced TCO Analysis Suite</h1>
          </div>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive what-if scenarios and sensitivity analysis tools to optimize your Network Access Control
            investment decisions with confidence and precision.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Badge variant="outline" className="px-4 py-2 text-emerald-400 border-emerald-400/50">
              <Activity className="h-4 w-4 mr-2" />
              Real-time Analysis
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-blue-400 border-blue-400/50">
              <Brain className="h-4 w-4 mr-2" />
              AI-Powered Insights
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-purple-400 border-purple-400/50">
              <Shield className="h-4 w-4 mr-2" />
              Risk Assessment
            </Badge>
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {keyBenefits.map((benefit, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="p-3 rounded-xl bg-slate-700/50 w-fit mx-auto mb-4">
                  <benefit.icon className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-400">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Analysis Tools Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {analysisTools.map((tool, index) => (
            <Card
              key={tool.id}
              className={`bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer ${
                activeTab === tool.id ? "ring-2 ring-emerald-500/50" : ""
              }`}
              onClick={() => setActiveTab(tool.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${tool.color}/20 border ${tool.color}/30`}>
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white">{tool.name}</CardTitle>
                    <p className="text-slate-400 text-sm mt-1">{tool.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {tool.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Analysis Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 mb-8">
              {analysisTools.map((tool) => (
                <TabsTrigger
                  key={tool.id}
                  value={tool.id}
                  className="flex items-center gap-2 data-[state=active]:bg-emerald-600"
                >
                  <tool.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tool.name.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="scenarios" className="space-y-6">
              <WhatIfScenarioBuilder />
            </TabsContent>

            <TabsContent value="sensitivity" className="space-y-6">
              <SensitivityAnalyzer />
            </TabsContent>

            <TabsContent value="montecarlo" className="space-y-6">
              <MonteCarloSimulator />
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <ScenarioComparison />
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center py-8 border-t border-slate-700/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-slate-400 text-sm">
            Advanced TCO Analysis Suite - Empowering data-driven NAC investment decisions
          </p>
        </motion.div>
      </div>
    </div>
  )
}
