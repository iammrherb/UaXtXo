"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Building2, TrendingUp, Shield, Users, Globe, DollarSign, AlertTriangle, Target, Zap } from "lucide-react"

interface IndustryAnalysisViewProps {
  results: any[]
  config: any
}

const INDUSTRY_SECTORS = [
  {
    name: "Healthcare",
    marketSize: 2.8,
    growth: 12.5,
    nacAdoption: 68,
    avgDevices: 1200,
    complianceReq: ["HIPAA", "SOC 2", "HITECH"],
    challenges: ["Patient Privacy", "Medical Device Security", "Compliance"],
    trends: ["Zero Trust", "IoMT Security", "Cloud Migration"],
  },
  {
    name: "Financial Services",
    marketSize: 4.2,
    growth: 15.8,
    nacAdoption: 85,
    avgDevices: 2500,
    complianceReq: ["PCI DSS", "SOX", "GDPR", "FFIEC"],
    challenges: ["Regulatory Compliance", "Fraud Prevention", "Data Protection"],
    trends: ["AI/ML Security", "Open Banking", "Digital Transformation"],
  },
  {
    name: "Education",
    marketSize: 1.9,
    growth: 18.2,
    nacAdoption: 45,
    avgDevices: 800,
    complianceReq: ["FERPA", "COPPA", "State Privacy Laws"],
    challenges: ["BYOD Management", "Student Privacy", "Budget Constraints"],
    trends: ["Remote Learning", "1:1 Device Programs", "Cloud Services"],
  },
  {
    name: "Manufacturing",
    marketSize: 3.5,
    growth: 22.1,
    nacAdoption: 52,
    avgDevices: 1800,
    complianceReq: ["ISO 27001", "NIST", "Industry Standards"],
    challenges: ["OT/IT Convergence", "Legacy Systems", "Supply Chain"],
    trends: ["Industry 4.0", "IIoT Security", "Smart Manufacturing"],
  },
  {
    name: "Government",
    marketSize: 2.1,
    growth: 8.9,
    nacAdoption: 78,
    avgDevices: 1500,
    complianceReq: ["FedRAMP", "FISMA", "NIST 800-53"],
    challenges: ["Budget Cycles", "Legacy Infrastructure", "Security Clearance"],
    trends: ["Zero Trust Architecture", "Cloud First", "Modernization"],
  },
  {
    name: "Retail",
    marketSize: 1.6,
    growth: 14.3,
    nacAdoption: 38,
    avgDevices: 600,
    complianceReq: ["PCI DSS", "GDPR", "CCPA"],
    challenges: ["Customer Data", "POS Security", "Seasonal Traffic"],
    trends: ["Omnichannel", "Mobile Commerce", "Edge Computing"],
  },
]

const REGIONAL_DATA = [
  {
    region: "North America",
    marketShare: 42,
    growth: 12.8,
    avgTco: 285000,
    topVendors: ["Cisco", "Aruba", "Fortinet"],
    regulations: ["SOX", "HIPAA", "PCI DSS"],
  },
  {
    region: "Europe",
    marketShare: 28,
    growth: 15.2,
    avgTco: 320000,
    topVendors: ["Cisco", "Fortinet", "Microsoft"],
    regulations: ["GDPR", "NIS2", "ISO 27001"],
  },
  {
    region: "Asia Pacific",
    marketShare: 22,
    growth: 24.5,
    avgTco: 195000,
    topVendors: ["Fortinet", "Aruba", "Local Vendors"],
    regulations: ["Local Privacy Laws", "Industry Standards"],
  },
  {
    region: "Rest of World",
    marketShare: 8,
    growth: 18.7,
    avgTco: 165000,
    topVendors: ["Fortinet", "Open Source", "Local Solutions"],
    regulations: ["Emerging Frameworks", "Basic Compliance"],
  },
]

const MARKET_TRENDS = [
  {
    trend: "Zero Trust Adoption",
    impact: 95,
    timeline: "2024-2026",
    description: "Shift from perimeter-based to identity-centric security",
    drivers: ["Remote Work", "Cloud Migration", "Advanced Threats"],
  },
  {
    trend: "Cloud-Native NAC",
    impact: 88,
    timeline: "2023-2025",
    description: "Migration from on-premises to cloud-delivered solutions",
    drivers: ["Scalability", "Cost Reduction", "Simplified Management"],
  },
  {
    trend: "AI/ML Integration",
    impact: 82,
    timeline: "2024-2027",
    description: "Intelligent threat detection and automated response",
    drivers: ["Advanced Threats", "Operational Efficiency", "Predictive Analytics"],
  },
  {
    trend: "IoT Device Management",
    impact: 78,
    timeline: "2023-2026",
    description: "Specialized controls for IoT and OT devices",
    drivers: ["IoT Growth", "OT/IT Convergence", "Device Diversity"],
  },
  {
    trend: "Compliance Automation",
    impact: 75,
    timeline: "2024-2025",
    description: "Automated compliance reporting and enforcement",
    drivers: ["Regulatory Pressure", "Audit Efficiency", "Risk Management"],
  },
]

const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

export default function IndustryAnalysisView({ results, config }: IndustryAnalysisViewProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Industry Analysis</h2>
          <p className="text-muted-foreground">Market trends, sector analysis, and regional insights</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          Global NAC Market: $2.1B
        </Badge>
      </div>

      <Tabs defaultValue="sectors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sectors">Industry Sectors</TabsTrigger>
          <TabsTrigger value="regions">Regional Analysis</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="sectors" className="space-y-6">
          {/* Market Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Market Size</p>
                    <p className="text-3xl font-bold">$2.1B</p>
                    <p className="text-xs text-muted-foreground">Global NAC Market</p>
                  </div>
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Growth Rate</p>
                    <p className="text-3xl font-bold">15.2%</p>
                    <p className="text-xs text-muted-foreground">CAGR 2023-2028</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Adoption Rate</p>
                    <p className="text-3xl font-bold">62%</p>
                    <p className="text-xs text-muted-foreground">Enterprise adoption</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Investment</p>
                    <p className="text-3xl font-bold">$245K</p>
                    <p className="text-xs text-muted-foreground">Per deployment</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Industry Sectors Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Size by Industry</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={INDUSTRY_SECTORS}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}B`, "Market Size"]} />
                    <Bar dataKey="marketSize" fill="#00D4AA" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>NAC Adoption by Sector</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={INDUSTRY_SECTORS}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="nacAdoption"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {INDUSTRY_SECTORS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Adoption Rate"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Sector Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Industry Sector Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {INDUSTRY_SECTORS.map((sector, index) => (
                  <div key={sector.name} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <h3 className="text-lg font-semibold">{sector.name}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant="outline">Market: ${sector.marketSize}B</Badge>
                        <Badge variant="outline">Growth: {sector.growth}%</Badge>
                        <Badge variant="outline">Adoption: {sector.nacAdoption}%</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium mb-2 text-blue-600">Compliance Requirements</h4>
                        <div className="flex flex-wrap gap-1">
                          {sector.complianceReq.map((req, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-orange-600">Key Challenges</h4>
                        <ul className="space-y-1 text-sm">
                          {sector.challenges.map((challenge, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <AlertTriangle className="h-3 w-3 text-orange-600" />
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 text-green-600">Emerging Trends</h4>
                        <ul className="space-y-1 text-sm">
                          {sector.trends.map((trend, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <TrendingUp className="h-3 w-3 text-green-600" />
                              {trend}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span>Average Devices: {sector.avgDevices.toLocaleString()}</span>
                        <span>Market Growth: {sector.growth}% CAGR</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Market Share</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={REGIONAL_DATA}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="marketShare"
                      label={({ region, marketShare }) => `${region}: ${marketShare}%`}
                    >
                      {REGIONAL_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Market Share"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Growth Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={REGIONAL_DATA}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, "Growth Rate"]} />
                    <Bar dataKey="growth" fill="#0EA5E9" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Regional Analysis Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {REGIONAL_DATA.map((region, index) => (
                  <div key={region.region} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <h3 className="font-semibold">{region.region}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{region.marketShare}% share</Badge>
                        <Badge variant="outline">{region.growth}% growth</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Avg TCO: </span>
                        <span>{formatCurrency(region.avgTco)}</span>
                      </div>
                      <div>
                        <span className="font-medium">Top Vendors: </span>
                        <span>{region.topVendors.join(", ")}</span>
                      </div>
                      <div>
                        <span className="font-medium">Key Regulations: </span>
                        <span>{region.regulations.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Trends Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={MARKET_TRENDS}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="trend" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Impact Score" dataKey="impact" stroke="#00D4AA" fill="#00D4AA" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {MARKET_TRENDS.map((trend, index) => (
              <Card key={trend.trend}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-600" />
                    {trend.trend}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Impact Score</span>
                        <span className="text-sm font-medium">{trend.impact}/100</span>
                      </div>
                      <Progress value={trend.impact} className="h-2" />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">{trend.description}</p>
                      <Badge variant="outline" className="text-xs">
                        Timeline: {trend.timeline}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Drivers</h4>
                      <div className="flex flex-wrap gap-1">
                        {trend.drivers.map((driver, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {driver}
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

        <TabsContent value="benchmarks" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Building2 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">1,250</div>
                  <div className="text-sm text-muted-foreground">Avg Devices</div>
                  <div className="text-xs text-muted-foreground mt-1">Per Enterprise</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">$245K</div>
                  <div className="text-sm text-muted-foreground">Avg TCO</div>
                  <div className="text-xs text-muted-foreground mt-1">3-Year Total</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold">68%</div>
                  <div className="text-sm text-muted-foreground">Risk Reduction</div>
                  <div className="text-xs text-muted-foreground mt-1">Average Improvement</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-2xl font-bold">2.3</div>
                  <div className="text-sm text-muted-foreground">FTE Saved</div>
                  <div className="text-xs text-muted-foreground mt-1">Per 1000 Devices</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Industry Benchmarks by Sector</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Industry</th>
                      <th className="text-right p-2">Avg Devices</th>
                      <th className="text-right p-2">Avg TCO</th>
                      <th className="text-right p-2">Adoption Rate</th>
                      <th className="text-right p-2">Growth Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INDUSTRY_SECTORS.map((sector, index) => (
                      <tr key={sector.name} className="border-b">
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            {sector.name}
                          </div>
                        </td>
                        <td className="text-right p-2">{sector.avgDevices.toLocaleString()}</td>
                        <td className="text-right p-2">${(sector.marketSize * 100).toFixed(0)}K</td>
                        <td className="text-right p-2">
                          <Badge variant={sector.nacAdoption > 70 ? "default" : "secondary"}>
                            {sector.nacAdoption}%
                          </Badge>
                        </td>
                        <td className="text-right p-2">
                          <Badge variant={sector.growth > 15 ? "default" : "outline"}>{sector.growth}%</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
