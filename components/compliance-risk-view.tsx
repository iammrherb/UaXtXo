"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign,
  FileText,
  Users,
  Lock,
  Eye,
} from "lucide-react"

interface ComplianceRiskViewProps {
  results: any[]
  config: any
}

export default function ComplianceRiskView({ results, config }: ComplianceRiskViewProps) {
  const complianceFrameworks = [
    { id: "nist-csf", name: "NIST Cybersecurity Framework", critical: true },
    { id: "pci-dss", name: "PCI DSS", critical: true },
    { id: "hipaa", name: "HIPAA", critical: false },
    { id: "gdpr", name: "GDPR", critical: true },
    { id: "iso27001", name: "ISO 27001", critical: false },
    { id: "sox", name: "SOX", critical: false },
    { id: "fedramp", name: "FedRAMP", critical: false },
    { id: "fisma", name: "FISMA", critical: false },
  ]

  const securityMetrics = [
    { name: "Zero Trust Score", icon: Shield, color: "text-blue-500" },
    { name: "Threat Detection", icon: Eye, color: "text-green-500" },
    { name: "Incident Response", icon: AlertTriangle, color: "text-orange-500" },
    { name: "Access Control", icon: Lock, color: "text-purple-500" },
  ]

  const riskCategories = [
    {
      name: "Data Breach Risk",
      description: "Probability and impact of data breaches",
      avgCost: 4350000,
      icon: AlertTriangle,
    },
    {
      name: "Compliance Violations",
      description: "Risk of regulatory penalties",
      avgCost: 500000,
      icon: FileText,
    },
    {
      name: "Operational Disruption",
      description: "Business continuity risks",
      avgCost: 250000,
      icon: Users,
    },
    {
      name: "Cyber Insurance",
      description: "Premium costs and coverage gaps",
      avgCost: 75000,
      icon: DollarSign,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Security & Compliance Risk Analysis</h2>
          <p className="text-muted-foreground">Comprehensive assessment of security posture and compliance coverage</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {config.devices} Devices
        </Badge>
      </div>

      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {riskCategories.map((category) => (
          <Card key={category.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
              <category.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(category.avgCost / 1000).toFixed(0)}K</div>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="frameworks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="frameworks">Compliance Frameworks</TabsTrigger>
          <TabsTrigger value="security">Security Posture</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="insurance">Cyber Insurance</TabsTrigger>
        </TabsList>

        <TabsContent value="frameworks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Coverage</CardTitle>
              <p className="text-sm text-muted-foreground">
                Assessment of vendor compliance with major regulatory frameworks
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {complianceFrameworks.map((framework) => (
                  <div key={framework.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{framework.name}</span>
                        {framework.critical && (
                          <Badge variant="destructive" className="text-xs">
                            Critical
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {results.slice(0, 4).map((result) => {
                        const coverage = Math.floor(Math.random() * 40) + 60 // Mock data
                        return (
                          <div key={result.vendorId} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>{result.vendorName}</span>
                              <span className="font-medium">{coverage}%</span>
                            </div>
                            <Progress value={coverage} className="h-2" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Capabilities Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityMetrics.map((metric) => (
                    <div key={metric.name} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <metric.icon className={`h-4 w-4 ${metric.color}`} />
                        <span className="font-medium">{metric.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {results.slice(0, 4).map((result) => {
                          const score = Math.floor(Math.random() * 40) + 60
                          return (
                            <div key={result.vendorId} className="flex items-center justify-between text-sm">
                              <span>{result.vendorName}</span>
                              <Badge variant={score > 80 ? "default" : score > 60 ? "secondary" : "destructive"}>
                                {score}%
                              </Badge>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zero Trust Maturity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.slice(0, 4).map((result) => {
                    const maturity = result.vendorId === "portnox" ? 95 : Math.floor(Math.random() * 30) + 50
                    return (
                      <div key={result.vendorId} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{result.vendorName}</span>
                          <span className="text-sm font-medium">{maturity}%</span>
                        </div>
                        <Progress value={maturity} className="h-2" />
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          {maturity > 90 ? (
                            <>
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>Advanced Zero Trust</span>
                            </>
                          ) : maturity > 70 ? (
                            <>
                              <AlertTriangle className="h-3 w-3 text-yellow-500" />
                              <span>Developing Zero Trust</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 text-red-500" />
                              <span>Basic Security</span>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Reduction Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Quantified risk reduction by vendor solution</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.slice(0, 4).map((result) => {
                    const riskReduction = result.vendorId === "portnox" ? 85 : Math.floor(Math.random() * 30) + 40
                    const costAvoidance = (4350000 * riskReduction) / 100
                    return (
                      <div key={result.vendorId} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{result.vendorName}</span>
                          <Badge variant={riskReduction > 80 ? "default" : "secondary"}>
                            {riskReduction}% Risk Reduction
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Potential Cost Avoidance:</span>
                            <div className="font-medium">${(costAvoidance / 1000000).toFixed(1)}M</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Annual Risk Value:</span>
                            <div className="font-medium">${((costAvoidance * 0.28) / 1000).toFixed(0)}K</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Cost Impact</CardTitle>
                <p className="text-sm text-muted-foreground">Cost of non-compliance vs. solution investment</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Average compliance violation penalty: $500K - $5M depending on framework
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    {complianceFrameworks
                      .filter((f) => f.critical)
                      .map((framework) => (
                        <div key={framework.id} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <span className="font-medium">{framework.name}</span>
                            <div className="text-sm text-muted-foreground">Avg. penalty: $1.2M</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-green-600">95% Violation Risk Reduction</div>
                            <div className="text-xs text-muted-foreground">with Portnox</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cyber Insurance Impact</CardTitle>
                <p className="text-sm text-muted-foreground">
                  How NAC solutions affect insurance premiums and coverage
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">Current Annual Premium</div>
                    <div className="text-2xl font-bold text-primary">$75,000</div>
                    <div className="text-sm text-muted-foreground">Based on {config.devices} devices</div>
                  </div>

                  <div className="space-y-3">
                    {results.slice(0, 4).map((result) => {
                      const reduction = result.vendorId === "portnox" ? 25 : Math.floor(Math.random() * 15) + 5
                      const newPremium = 75000 * (1 - reduction / 100)
                      const savings = 75000 - newPremium

                      return (
                        <div key={result.vendorId} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <span className="font-medium">{result.vendorName}</span>
                            <div className="text-sm text-muted-foreground">{reduction}% premium reduction</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${newPremium.toLocaleString()}</div>
                            <div className="text-sm text-green-600">Save ${savings.toLocaleString()}/year</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coverage Enhancement</CardTitle>
                <p className="text-sm text-muted-foreground">Improved coverage terms with enhanced security posture</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded">
                      <div className="text-sm text-muted-foreground">Current Deductible</div>
                      <div className="text-lg font-semibold">$100,000</div>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="text-sm text-muted-foreground">With Portnox</div>
                      <div className="text-lg font-semibold text-green-600">$50,000</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Business Interruption Coverage</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Regulatory Defense Costs</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Crisis Management</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cyber Extortion</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>

                  <Alert>
                    <TrendingUp className="h-4 w-4" />
                    <AlertDescription>
                      Enhanced security posture can improve coverage limits by up to 50% and reduce exclusions
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
