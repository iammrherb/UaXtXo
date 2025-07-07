"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Shield,
  Cloud,
  Zap,
  Users,
  CheckCircle,
  Star,
  TrendingUp,
  Lock,
  Eye,
  Smartphone,
  Wifi,
  Server,
  Globe,
} from "lucide-react"

const platformCapabilities = [
  {
    category: "Zero Trust Architecture",
    icon: Shield,
    score: 95,
    features: ["Continuous verification", "Least privilege access", "Micro-segmentation", "Risk-based authentication"],
    description: "Industry-leading Zero Trust implementation with continuous verification and adaptive policies",
  },
  {
    category: "Cloud-Native Platform",
    icon: Cloud,
    score: 100,
    features: ["Multi-tenant SaaS", "Global deployment", "Auto-scaling", "99.9% uptime SLA"],
    description: "Born-in-the-cloud architecture delivering unmatched scalability and reliability",
  },
  {
    category: "Rapid Deployment",
    icon: Zap,
    score: 98,
    features: ["7-day implementation", "Zero hardware required", "Automated configuration", "24-hour POC"],
    description: "Fastest time-to-value in the industry with automated deployment and configuration",
  },
  {
    category: "User Experience",
    icon: Users,
    score: 92,
    features: ["Intuitive dashboard", "Self-service portal", "Mobile app", "Single sign-on"],
    description: "Designed for both IT administrators and end-users with intuitive interfaces",
  },
]

const deploymentMetrics = [
  { phase: "Planning", traditional: 14, portnox: 1, description: "Requirements gathering and design" },
  { phase: "Hardware", traditional: 21, portnox: 0, description: "Procurement and installation" },
  { phase: "Configuration", traditional: 28, portnox: 3, description: "System setup and policies" },
  { phase: "Testing", traditional: 14, portnox: 2, description: "Validation and optimization" },
  { phase: "Rollout", traditional: 7, portnox: 1, description: "Production deployment" },
]

const securityFeatures = [
  { feature: "Device Discovery", coverage: 100, automation: 95 },
  { feature: "Risk Assessment", coverage: 98, automation: 92 },
  { feature: "Policy Enforcement", coverage: 96, automation: 90 },
  { feature: "Threat Response", coverage: 94, automation: 88 },
  { feature: "Compliance Monitoring", coverage: 97, automation: 93 },
]

const customerMetrics = [
  { metric: "Deployment Time", value: "7 days", improvement: "95% faster" },
  { metric: "TCO Reduction", value: "68%", improvement: "vs Cisco ISE" },
  { metric: "Security Incidents", value: "92%", improvement: "reduction" },
  { metric: "Admin Productivity", value: "75%", improvement: "increase" },
]

const integrationEcosystem = [
  { category: "Identity Providers", count: 25, examples: ["Azure AD", "Okta", "Ping"] },
  { category: "SIEM/SOAR", count: 15, examples: ["Splunk", "QRadar", "Phantom"] },
  { category: "Network Infrastructure", count: 30, examples: ["Cisco", "Aruba", "Juniper"] },
  { category: "Endpoint Security", count: 20, examples: ["CrowdStrike", "SentinelOne", "Defender"] },
  { category: "Cloud Platforms", count: 10, examples: ["AWS", "Azure", "GCP"] },
]

export function PortnoxPlatformView() {
  const [activeDemo, setActiveDemo] = useState("dashboard")

  return (
    <div className="space-y-6">
      {/* Platform Overview */}
      <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <Star className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          <strong>Portnox CLEAR Platform:</strong> The industry's first cloud-native NAC solution delivering Zero Trust
          security with 7-day deployment and 68% lower TCO than traditional alternatives.
        </AlertDescription>
      </Alert>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {customerMetrics.map((metric, index) => (
          <Card key={metric.metric} className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.improvement}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="capabilities" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="capabilities">Platform Capabilities</TabsTrigger>
          <TabsTrigger value="deployment">Deployment Advantage</TabsTrigger>
          <TabsTrigger value="security">Security Features</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
        </TabsList>

        <TabsContent value="capabilities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platformCapabilities.map((capability) => (
              <Card key={capability.category} className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <capability.icon className="h-5 w-5 text-blue-600" />
                    {capability.category}
                  </CardTitle>
                  <CardDescription>{capability.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Capability Score:</span>
                      <Progress value={capability.score} className="flex-1" />
                      <span className="font-bold text-blue-600">{capability.score}/100</span>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {capability.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Deployment Timeline Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Deployment Timeline Comparison</CardTitle>
                <CardDescription>Portnox vs Traditional NAC Implementation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={deploymentMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="phase" />
                    <YAxis tickFormatter={(value) => `${value}d`} />
                    <Tooltip formatter={(value) => `${value} days`} />
                    <Bar dataKey="traditional" fill="#ef4444" name="Traditional NAC" />
                    <Bar dataKey="portnox" fill="#10b981" name="Portnox CLEAR" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Deployment Advantages */}
            <Card>
              <CardHeader>
                <CardTitle>Deployment Advantages</CardTitle>
                <CardDescription>Why Portnox CLEAR deploys 95% faster</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deploymentMetrics.map((phase) => (
                    <div key={phase.phase} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{phase.phase}</h4>
                        <Badge variant="outline">{phase.traditional - phase.portnox} days saved</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-red-600">Traditional: {phase.traditional} days</span>
                        </div>
                        <div>
                          <span className="text-green-600">Portnox: {phase.portnox} days</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Deployment Process */}
          <Card>
            <CardHeader>
              <CardTitle>7-Day Deployment Process</CardTitle>
              <CardDescription>Step-by-step implementation timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {[
                  { day: 1, title: "Initial Setup", tasks: ["Account provisioning", "Basic configuration"] },
                  { day: 2, title: "Discovery", tasks: ["Network scanning", "Device identification"] },
                  { day: 3, title: "Policies", tasks: ["Policy creation", "Rule definition"] },
                  { day: 4, title: "Integration", tasks: ["AD/LDAP sync", "SIEM connection"] },
                  { day: 5, title: "Testing", tasks: ["Pilot group", "Validation"] },
                  { day: 6, title: "Rollout", tasks: ["Phased deployment", "Monitoring"] },
                  { day: 7, title: "Go-Live", tasks: ["Full production", "Support handoff"] },
                ].map((day) => (
                  <div key={day.day} className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-blue-600">{day.day}</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{day.title}</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {day.tasks.map((task, index) => (
                        <li key={index}>• {task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Coverage */}
            <Card>
              <CardHeader>
                <CardTitle>Security Feature Coverage</CardTitle>
                <CardDescription>Comprehensive protection across all attack vectors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityFeatures.map((feature) => (
                    <div key={feature.feature} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{feature.feature}</span>
                        <span className="text-sm font-bold">{feature.coverage}%</span>
                      </div>
                      <Progress value={feature.coverage} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Coverage: {feature.coverage}%</span>
                        <span>Automation: {feature.automation}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Zero Trust Pillars */}
            <Card>
              <CardHeader>
                <CardTitle>Zero Trust Implementation</CardTitle>
                <CardDescription>Comprehensive Zero Trust architecture coverage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { pillar: "Identity", score: 95, icon: Users },
                    { pillar: "Device", score: 92, icon: Smartphone },
                    { pillar: "Network", score: 94, icon: Wifi },
                    { pillar: "Application", score: 91, icon: Server },
                    { pillar: "Data", score: 96, icon: Lock },
                    { pillar: "Visibility", score: 98, icon: Eye },
                  ].map((pillar) => (
                    <div key={pillar.pillar} className="text-center p-4 border rounded-lg">
                      <pillar.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-semibold">{pillar.pillar}</h4>
                      <div className="text-2xl font-bold text-blue-600">{pillar.score}</div>
                      <Progress value={pillar.score} className="mt-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Security Benefits & ROI</CardTitle>
              <CardDescription>Quantified security improvements and risk reduction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-semibold">Breach Risk Reduction</h4>
                  <div className="text-3xl font-bold text-green-600">92%</div>
                  <p className="text-sm text-muted-foreground">Average risk reduction</p>
                </div>

                <div className="text-center p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <Eye className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold">Visibility Improvement</h4>
                  <div className="text-3xl font-bold text-blue-600">98%</div>
                  <p className="text-sm text-muted-foreground">Network visibility</p>
                </div>

                <div className="text-center p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-semibold">Response Time</h4>
                  <div className="text-3xl font-bold text-purple-600">85%</div>
                  <p className="text-sm text-muted-foreground">Faster incident response</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Integration Ecosystem */}
            <Card>
              <CardHeader>
                <CardTitle>Integration Ecosystem</CardTitle>
                <CardDescription>100+ pre-built integrations across security stack</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrationEcosystem.map((category) => (
                    <div key={category.category} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{category.category}</h4>
                        <Badge variant="secondary">{category.count} integrations</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.examples.map((example) => (
                          <Badge key={example} variant="outline" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* API & Automation */}
            <Card>
              <CardHeader>
                <CardTitle>API & Automation</CardTitle>
                <CardDescription>Comprehensive automation and orchestration capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">REST</div>
                      <p className="text-sm text-muted-foreground">Full REST API</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">GraphQL</div>
                      <p className="text-sm text-muted-foreground">Modern queries</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Automation Features:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Automated device onboarding
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Dynamic policy enforcement
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Threat response orchestration
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Compliance reporting
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Platform Demo</CardTitle>
              <CardDescription>Experience the Portnox CLEAR interface</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {["dashboard", "devices", "policies", "reports"].map((demo) => (
                    <Button
                      key={demo}
                      variant={activeDemo === demo ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveDemo(demo)}
                      className="capitalize"
                    >
                      {demo}
                    </Button>
                  ))}
                </div>

                <div className="border rounded-lg p-6 bg-slate-50 dark:bg-slate-900 min-h-[400px]">
                  <div className="text-center py-20">
                    <Globe className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-xl font-semibold mb-2">Interactive Demo</h3>
                    <p className="text-muted-foreground mb-4">Experience the Portnox CLEAR {activeDemo} interface</p>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Launch Live Demo
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo CTA */}
          <Card className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <Star className="h-5 w-5" />
                Ready to Experience Portnox CLEAR?
              </CardTitle>
              <CardDescription>Get hands-on with our 24-hour proof of concept</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Start 24-Hour POC
                </Button>
                <Button variant="outline" size="lg">
                  Schedule Demo
                </Button>
                <Button variant="ghost" size="lg">
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
