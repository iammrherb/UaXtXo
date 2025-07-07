"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertTriangle, Calendar, Shield, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ImplementationTimelineViewProps {
  selectedVendors?: string[]
  config?: any
  results?: any[]
}

export default function ImplementationTimelineView({
  selectedVendors = [],
  config = {},
  results = [],
}: ImplementationTimelineViewProps) {
  const [activeTab, setActiveTab] = useState("timeline")

  // Vendor implementation data
  const vendorData = useMemo(() => {
    const data = {
      portnox: {
        name: "Portnox CLEAR",
        phases: [
          { name: "Planning", duration: 2, description: "Requirements and design" },
          { name: "Setup", duration: 1, description: "Cloud configuration" },
          { name: "Pilot", duration: 3, description: "Test deployment" },
          { name: "Rollout", duration: 7, description: "Full deployment" },
        ],
        totalDays: 13,
        complexity: "Simple",
        fteRequired: 0.1,
        riskLevel: "Low",
      },
      cisco: {
        name: "Cisco ISE",
        phases: [
          { name: "Planning", duration: 28, description: "Architecture and design" },
          { name: "Hardware", duration: 14, description: "Appliance deployment" },
          { name: "Configuration", duration: 35, description: "Complex setup" },
          { name: "Testing", duration: 21, description: "Validation and tuning" },
          { name: "Rollout", duration: 42, description: "Phased deployment" },
        ],
        totalDays: 140,
        complexity: "Very Complex",
        fteRequired: 2.5,
        riskLevel: "High",
      },
      aruba: {
        name: "Aruba ClearPass",
        phases: [
          { name: "Planning", duration: 14, description: "Design and planning" },
          { name: "Hardware", duration: 7, description: "Appliance setup" },
          { name: "Configuration", duration: 21, description: "Policy configuration" },
          { name: "Testing", duration: 14, description: "Validation" },
          { name: "Rollout", duration: 28, description: "Deployment" },
        ],
        totalDays: 84,
        complexity: "Complex",
        fteRequired: 1.5,
        riskLevel: "Medium",
      },
      fortinet: {
        name: "Fortinet FortiNAC",
        phases: [
          { name: "Planning", duration: 21, description: "Architecture design" },
          { name: "Hardware", duration: 10, description: "Appliance deployment" },
          { name: "Configuration", duration: 28, description: "System setup" },
          { name: "Testing", duration: 14, description: "Validation" },
          { name: "Rollout", duration: 35, description: "Full deployment" },
        ],
        totalDays: 108,
        complexity: "Complex",
        fteRequired: 2.0,
        riskLevel: "Medium-High",
      },
    }

    return selectedVendors.map((vendor) => {
      const key = vendor.toLowerCase()
      return data[key] || data.portnox
    })
  }, [selectedVendors])

  // Timeline comparison chart data
  const timelineData = vendorData.map((vendor) => ({
    vendor: vendor.name,
    days: vendor.totalDays,
    weeks: Math.ceil(vendor.totalDays / 7),
  }))

  // Complexity comparison
  const complexityData = vendorData.map((vendor) => ({
    vendor: vendor.name,
    complexity:
      vendor.complexity === "Simple"
        ? 1
        : vendor.complexity === "Complex"
          ? 3
          : vendor.complexity === "Very Complex"
            ? 5
            : 2,
    fte: vendor.fteRequired,
  }))

  // Early return if no vendors selected
  if (selectedVendors.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Vendors Selected</h3>
          <p className="text-muted-foreground">Select vendors to view implementation timeline</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Implementation Timeline Analysis</h2>
          <p className="text-muted-foreground">Compare deployment timelines and complexity across NAC vendors</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="timeline">Timeline Comparison</TabsTrigger>
          <TabsTrigger value="phases">Implementation Phases</TabsTrigger>
          <TabsTrigger value="resources">Resource Requirements</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          {/* Timeline Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vendorData.map((vendor, index) => (
              <Card key={vendor.name} className={index === 0 ? "border-green-200" : ""}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{vendor.name}</CardTitle>
                  {index === 0 && <Badge className="w-fit bg-green-600">Fastest</Badge>}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{vendor.totalDays}</div>
                      <p className="text-sm text-muted-foreground">days</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Complexity</span>
                        <Badge variant="secondary">{vendor.complexity}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>FTE Required</span>
                        <Badge variant="outline">{vendor.fteRequired}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Risk Level</span>
                        <Badge variant={vendor.riskLevel === "Low" ? "default" : "destructive"}>
                          {vendor.riskLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Timeline Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Timeline Comparison</CardTitle>
              <CardDescription>Days required for full deployment</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="days" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Alert className="bg-green-50 border-green-200">
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              <strong>Key Insight:</strong> Portnox CLEAR deploys 90% faster than traditional NAC solutions, delivering
              value in days instead of months. Cloud-native architecture eliminates hardware procurement and complex
              configuration requirements.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="phases" className="space-y-4">
          {vendorData.map((vendor, vendorIndex) => (
            <Card key={vendor.name} className={vendorIndex === 0 ? "border-green-200" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {vendor.name}
                  <Badge variant="outline">{vendor.totalDays} days total</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendor.phases.map((phase, index) => (
                    <div key={phase.name} className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            vendorIndex === 0 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{phase.name}</p>
                            <Badge variant="secondary">{phase.duration} days</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{phase.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          {/* Resource Requirements Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Requirements Comparison</CardTitle>
              <CardDescription>FTE and complexity requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={complexityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="fte" fill="#10b981" name="FTE Required" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Resource Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vendorData.map((vendor, index) => (
              <Card key={vendor.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{vendor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Full-Time Equivalent</span>
                      <Badge variant="outline">{vendor.fteRequired} FTE</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Skill Level Required</span>
                      <Badge variant={index === 0 ? "default" : "secondary"}>{index === 0 ? "Basic" : "Expert"}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Training Required</span>
                      <Badge variant="outline">{index === 0 ? "2 hours" : "40+ hours"}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Certification Cost</span>
                      <Badge variant="outline">{index === 0 ? "$0" : "$15K+"}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          {/* Risk Assessment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Portnox CLEAR - Low Risk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm">No hardware dependencies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Cloud-native reliability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Automated configuration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Instant rollback capability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm">24/7 expert support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Traditional NAC - High Risk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Hardware failure points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Complex configuration errors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Extended downtime windows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Skill dependency risks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Integration challenges</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Mitigation Strategies */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Mitigation Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Portnox Advantages</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Cloud-native architecture eliminates single points of failure</li>
                    <li>• Automated deployment reduces human error</li>
                    <li>• Instant rollback and configuration versioning</li>
                    <li>• Built-in redundancy and 99.99% uptime SLA</li>
                    <li>• Comprehensive monitoring and alerting</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Traditional NAC Challenges</h4>
                  <ul className="space-y-1 text-sm text-orange-700">
                    <li>• Hardware procurement delays and failures</li>
                    <li>• Complex multi-vendor integration issues</li>
                    <li>• Extensive testing and validation requirements</li>
                    <li>• High dependency on specialized expertise</li>
                    <li>• Lengthy troubleshooting and resolution times</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Implementation Summary</h3>
              <p className="text-muted-foreground mt-1">
                Portnox CLEAR delivers 90% faster deployment with 95% less risk
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">13 days</div>
              <p className="text-sm text-muted-foreground">vs 140 days traditional</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
