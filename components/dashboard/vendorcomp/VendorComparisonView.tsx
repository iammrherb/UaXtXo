"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
} from "recharts"
import { Shield, Zap, Users, Settings, Award, CheckCircle, AlertTriangle, Star, TrendingUp } from "lucide-react"

const vendorData = [
  {
    id: "portnox",
    name: "Portnox CLEAR",
    logo: "/portnox-logo.png",
    category: "Cloud-Native NAC",
    overallScore: 95,
    pricing: { tier: "Premium", value: 4.5 },
    features: {
      zeroTrust: 95,
      cloudNative: 100,
      easeOfUse: 92,
      scalability: 96,
      integration: 90,
      support: 88,
      compliance: 94,
      performance: 93,
    },
    strengths: [
      "Cloud-native architecture",
      "Fastest deployment (7 days)",
      "Highest Zero Trust maturity",
      "Lowest TCO",
      "No hardware requirements",
    ],
    weaknesses: ["Newer market presence", "Limited on-premise options"],
    certifications: ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS"],
    deploymentTime: 7,
    complexity: "Low",
  },
  {
    id: "cisco",
    name: "Cisco ISE",
    logo: "/cisco-logo.png",
    category: "Enterprise NAC",
    overallScore: 85,
    pricing: { tier: "Enterprise", value: 2.5 },
    features: {
      zeroTrust: 85,
      cloudNative: 60,
      easeOfUse: 65,
      scalability: 88,
      integration: 92,
      support: 90,
      compliance: 87,
      performance: 85,
    },
    strengths: ["Market leader", "Extensive integrations", "Strong enterprise support", "Comprehensive feature set"],
    weaknesses: ["Complex implementation", "High TCO", "Requires significant hardware", "Long deployment times"],
    certifications: ["Common Criteria", "FIPS 140-2"],
    deploymentTime: 90,
    complexity: "Very High",
  },
  {
    id: "aruba",
    name: "Aruba ClearPass",
    logo: "/aruba-logo.png",
    category: "Network Access Control",
    overallScore: 82,
    pricing: { tier: "Mid-Market", value: 3.2 },
    features: {
      zeroTrust: 82,
      cloudNative: 70,
      easeOfUse: 78,
      scalability: 85,
      integration: 88,
      support: 85,
      compliance: 84,
      performance: 82,
    },
    strengths: ["Good balance of features", "Reasonable pricing", "Solid performance", "HPE ecosystem integration"],
    weaknesses: ["Limited cloud-native features", "Moderate complexity", "Average Zero Trust capabilities"],
    certifications: ["Common Criteria"],
    deploymentTime: 60,
    complexity: "High",
  },
  {
    id: "forescout",
    name: "Forescout",
    logo: "/forescout-logo.png",
    category: "Device Visibility & Control",
    overallScore: 78,
    pricing: { tier: "Enterprise", value: 2.8 },
    features: {
      zeroTrust: 78,
      cloudNative: 65,
      easeOfUse: 70,
      scalability: 82,
      integration: 85,
      support: 82,
      compliance: 80,
      performance: 79,
    },
    strengths: ["Strong device visibility", "Good OT/IoT support", "Comprehensive discovery"],
    weaknesses: ["Complex deployment", "High operational overhead", "Limited cloud capabilities"],
    certifications: ["Common Criteria"],
    deploymentTime: 120,
    complexity: "Very High",
  },
  {
    id: "juniper",
    name: "Juniper Mist",
    logo: "/juniper-logo.png",
    category: "AI-Driven NAC",
    overallScore: 88,
    pricing: { tier: "Premium", value: 3.8 },
    features: {
      zeroTrust: 88,
      cloudNative: 85,
      easeOfUse: 85,
      scalability: 90,
      integration: 82,
      support: 88,
      compliance: 86,
      performance: 87,
    },
    strengths: ["AI-driven insights", "Cloud-first approach", "Good user experience", "Strong wireless integration"],
    weaknesses: ["Limited wired NAC features", "Newer to market", "Higher pricing"],
    certifications: ["SOC 2", "ISO 27001"],
    deploymentTime: 45,
    complexity: "Medium",
  },
]

const featureCategories = [
  { key: "zeroTrust", label: "Zero Trust", icon: Shield },
  { key: "cloudNative", label: "Cloud Native", icon: Zap },
  { key: "easeOfUse", label: "Ease of Use", icon: Users },
  { key: "scalability", label: "Scalability", icon: TrendingUp },
  { key: "integration", label: "Integration", icon: Settings },
  { key: "support", label: "Support", icon: Award },
  { key: "compliance", label: "Compliance", icon: Shield },
  { key: "performance", label: "Performance", icon: Zap },
]

export function VendorComparisonView() {
  const [selectedVendors, setSelectedVendors] = useState(["portnox", "cisco", "aruba"])
  const [comparisonMode, setComparisonMode] = useState("features")

  const filteredVendors = vendorData.filter((vendor) => selectedVendors.includes(vendor.id))

  const radarData = featureCategories.map((category) => {
    const dataPoint = { category: category.label }
    filteredVendors.forEach((vendor) => {
      dataPoint[vendor.name] = vendor.features[category.key]
    })
    return dataPoint
  })

  const scatterData = vendorData.map((vendor) => ({
    name: vendor.name,
    x: vendor.features.easeOfUse,
    y: vendor.features.zeroTrust,
    z: vendor.overallScore,
  }))

  return (
    <div className="space-y-6">
      {/* Vendor Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Vendors to Compare</CardTitle>
          <CardDescription>Choose up to 4 vendors for detailed comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {vendorData.map((vendor) => (
              <div key={vendor.id} className="flex items-center space-x-2">
                <Checkbox
                  id={vendor.id}
                  checked={selectedVendors.includes(vendor.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedVendors([...selectedVendors, vendor.id])
                    } else {
                      setSelectedVendors(selectedVendors.filter((id) => id !== vendor.id))
                    }
                  }}
                />
                <label htmlFor={vendor.id} className="text-sm font-medium cursor-pointer">
                  {vendor.name}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Alert */}
      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
        <Award className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Comparison Insight:</strong> Portnox CLEAR leads in Zero Trust maturity (95/100), deployment speed (7
          days), and overall value proposition across all comparison categories.
        </AlertDescription>
      </Alert>

      <Tabs value={comparisonMode} onValueChange={setComparisonMode} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="features">Feature Matrix</TabsTrigger>
          <TabsTrigger value="radar">Capability Radar</TabsTrigger>
          <TabsTrigger value="deployment">Implementation</TabsTrigger>
          <TabsTrigger value="strengths">Pros & Cons</TabsTrigger>
          <TabsTrigger value="positioning">Market Position</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Feature Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle>Feature Comparison Matrix</CardTitle>
                <CardDescription>Detailed capability assessment across key areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Feature Category</th>
                        {filteredVendors.map((vendor) => (
                          <th key={vendor.id} className="text-center p-2 min-w-[120px]">
                            {vendor.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {featureCategories.map((category) => (
                        <tr key={category.key} className="border-b">
                          <td className="p-2 font-medium flex items-center gap-2">
                            <category.icon className="h-4 w-4" />
                            {category.label}
                          </td>
                          {filteredVendors.map((vendor) => (
                            <td key={vendor.id} className="p-2 text-center">
                              <div className="flex flex-col items-center gap-1">
                                <span className="font-bold">{vendor.features[category.key]}</span>
                                <Progress value={vendor.features[category.key]} className="w-16 h-2" />
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Overall Scores */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Vendor Scores</CardTitle>
                <CardDescription>Comprehensive assessment based on all criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filteredVendors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="overallScore" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="radar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Capability Radar Chart</CardTitle>
                <CardDescription>Multi-dimensional vendor comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    {filteredVendors.map((vendor, index) => (
                      <Radar
                        key={vendor.id}
                        name={vendor.name}
                        dataKey={vendor.name}
                        stroke={["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"][index]}
                        fill={["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"][index]}
                        fillOpacity={0.1}
                      />
                    ))}
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Feature Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Feature Category Leaders</CardTitle>
                <CardDescription>Top performer in each category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureCategories.map((category) => {
                    const leader = filteredVendors.reduce((prev, current) =>
                      prev.features[category.key] > current.features[category.key] ? prev : current,
                    )
                    return (
                      <div key={category.key} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <category.icon className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">{category.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={leader.id === "portnox" ? "default" : "secondary"}>{leader.name}</Badge>
                          <span className="font-bold">{leader.features[category.key]}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Deployment Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Implementation Timeline</CardTitle>
                <CardDescription>Time to deployment comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filteredVendors} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `${value}d`} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip formatter={(value) => `${value} days`} />
                    <Bar dataKey="deploymentTime" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Complexity Assessment */}
            <Card>
              <CardHeader>
                <CardTitle>Implementation Complexity</CardTitle>
                <CardDescription>Deployment difficulty and resource requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredVendors.map((vendor) => (
                    <div key={vendor.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{vendor.name}</h4>
                        <Badge
                          variant={
                            vendor.complexity === "Low"
                              ? "default"
                              : vendor.complexity === "Medium"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {vendor.complexity}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Deployment Time:</span>
                          <span className="font-bold ml-2">{vendor.deploymentTime} days</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Category:</span>
                          <span className="font-bold ml-2">{vendor.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="strengths" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <Card key={vendor.id} className={vendor.id === "portnox" ? "border-green-500" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {vendor.id === "portnox" && <Star className="h-5 w-5 text-yellow-500" />}
                    {vendor.name}
                  </CardTitle>
                  <CardDescription>{vendor.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-600 flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4" />
                        Strengths
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {vendor.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-amber-600 flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4" />
                        Considerations
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {vendor.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-amber-500 mt-1">•</span>
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Certifications</h4>
                      <div className="flex flex-wrap gap-1">
                        {vendor.certifications.map((cert) => (
                          <Badge key={cert} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="positioning" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Position Scatter */}
            <Card>
              <CardHeader>
                <CardTitle>Market Positioning</CardTitle>
                <CardDescription>Ease of Use vs Zero Trust Capability</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart data={scatterData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="x"
                      name="Ease of Use"
                      domain={[60, 100]}
                      label={{ value: "Ease of Use", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                      dataKey="y"
                      name="Zero Trust Score"
                      domain={[70, 100]}
                      label={{ value: "Zero Trust Score", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      formatter={(value, name) => [value, name]}
                      labelFormatter={(label) => `Vendor: ${label}`}
                    />
                    <Scatter dataKey="z" fill="#3b82f6" name="Overall Score" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Vendor Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Vendor Recommendations</CardTitle>
                <CardDescription>Best fit scenarios for each vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/20">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                      🏆 Recommended: Portnox CLEAR
                    </h4>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                      Best for organizations seeking modern, cloud-native NAC with rapid deployment
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Cloud-first organizations</li>
                      <li>• Rapid deployment requirements</li>
                      <li>• Zero Trust initiatives</li>
                      <li>• Cost-conscious buyers</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Cisco ISE</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Best for large enterprises with existing Cisco infrastructure
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Cisco-centric environments</li>
                      <li>• Complex policy requirements</li>
                      <li>• Large IT teams</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Aruba ClearPass</h4>
                    <p className="text-sm text-muted-foreground mb-2">Good balance for mid-market organizations</p>
                    <ul className="text-xs space-y-1">
                      <li>• HPE/Aruba environments</li>
                      <li>• Moderate complexity needs</li>
                      <li>• Budget-conscious</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
