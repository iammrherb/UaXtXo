"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, Cloud, Zap, Users, Network, Lock, CheckCircle, ArrowRight, Star } from "lucide-react"
import { useDashboardSettings } from "@/context/DashboardContext"
import Image from "next/image"

export default function PortnoxPlatformView() {
  const { settings } = useDashboardSettings()

  const platformFeatures = [
    {
      icon: Shield,
      title: "Zero Trust Network Access",
      description: "Comprehensive device and user authentication with continuous monitoring",
      score: 98,
      highlight: true,
    },
    {
      icon: Cloud,
      title: "Cloud-Native Architecture",
      description: "Scalable, resilient infrastructure with global deployment capabilities",
      score: 95,
      highlight: true,
    },
    {
      icon: Zap,
      title: "Automated Policy Enforcement",
      description: "Dynamic policy application based on device posture and user context",
      score: 92,
      highlight: false,
    },
    {
      icon: Network,
      title: "Network Visibility",
      description: "Real-time network monitoring and threat detection across all endpoints",
      score: 90,
      highlight: false,
    },
    {
      icon: Users,
      title: "User Experience",
      description: "Seamless authentication with minimal user friction",
      score: 94,
      highlight: false,
    },
    {
      icon: Lock,
      title: "Compliance Management",
      description: "Built-in compliance reporting for major industry standards",
      score: 96,
      highlight: true,
    },
  ]

  const competitiveAdvantages = [
    "Industry-leading deployment speed (6 weeks vs 16 weeks average)",
    "40% lower total cost of ownership compared to legacy solutions",
    "99.9% uptime SLA with global cloud infrastructure",
    "Native integration with 200+ enterprise applications",
    "AI-powered threat detection and response capabilities",
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="/portnox-logo-color.png" alt="Portnox" width={48} height={48} className="rounded-lg" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Portnox Platform</h2>
            <p className="text-gray-600">Cloud-native NAC solution for {settings.industry} organizations</p>
          </div>
        </div>
        <Badge className="bg-portnox-blue text-white hover:bg-portnox-blue/90">Recommended Solution</Badge>
      </div>

      {/* Platform Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Platform Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {platformFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      feature.highlight ? "bg-portnox-blue/5 border-portnox-blue/20" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          feature.highlight ? "bg-portnox-blue text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{feature.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{feature.score}%</span>
                            {feature.highlight && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                        <Progress value={feature.score} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics */}
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-portnox-blue to-portnox-teal text-white">
            <CardHeader>
              <CardTitle className="text-white">Platform Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">94/100</div>
              <p className="text-portnox-blue-light text-sm">
                Overall platform rating based on security, performance, and usability
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deployment Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Planning & Design</span>
                  <span className="text-sm font-medium">1 week</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Infrastructure Setup</span>
                  <span className="text-sm font-medium">2 weeks</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Policy Configuration</span>
                  <span className="text-sm font-medium">2 weeks</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Testing & Go-Live</span>
                  <span className="text-sm font-medium">1 week</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Timeline</span>
                    <span className="text-portnox-blue">6 weeks</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ROI Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">285%</div>
                <p className="text-sm text-gray-600">{settings.comparisonYears}-year ROI</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Competitive Advantages */}
      <Card>
        <CardHeader>
          <CardTitle>Competitive Advantages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competitiveAdvantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{advantage}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-portnox-blue/10 to-portnox-teal/10 border-portnox-blue/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-portnox-blue mb-2">
                Ready to Transform Your Network Security?
              </h3>
              <p className="text-gray-600">
                Schedule a personalized demo to see how Portnox can secure your {settings.industry} organization.
              </p>
            </div>
            <Button className="bg-portnox-blue hover:bg-portnox-blue/90 text-white">
              Schedule Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
