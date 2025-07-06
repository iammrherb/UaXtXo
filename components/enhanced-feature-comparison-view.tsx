"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import {
  CheckCircle2,
  XCircle,
  MinusCircle,
  AlertCircle,
  Search,
  Download,
  Shield,
  Settings,
  Network,
  Globe,
  Lock,
  FileText,
} from "lucide-react"

interface EnhancedFeatureComparisonProps {
  selectedVendors: string[]
}

// Comprehensive feature matrix with detailed capabilities
const FEATURE_CATEGORIES = {
  authentication: {
    name: "Authentication & Identity",
    icon: <Lock className="h-4 w-4" />,
    features: {
      "802.1X Authentication": {
        description: "IEEE 802.1X port-based network access control",
        importance: "Critical",
        category: "Core",
      },
      "Multi-Factor Authentication": {
        description: "Support for multiple authentication factors",
        importance: "High",
        category: "Security",
      },
      "Certificate-Based Auth": {
        description: "PKI certificate authentication support",
        importance: "High",
        category: "Security",
      },
      "SAML 2.0 Integration": {
        description: "Security Assertion Markup Language support",
        importance: "Medium",
        category: "Integration",
      },
      "OAuth 2.0 Support": {
        description: "Open Authorization framework support",
        importance: "Medium",
        category: "Integration",
      },
      "LDAP/Active Directory": {
        description: "Directory service integration",
        importance: "Critical",
        category: "Integration",
      },
      "RADIUS Authentication": {
        description: "Remote Authentication Dial-In User Service",
        importance: "Critical",
        category: "Core",
      },
      "TACACS+ Support": {
        description: "Terminal Access Controller Access-Control System",
        importance: "Medium",
        category: "Core",
      },
      "Biometric Authentication": {
        description: "Fingerprint, facial recognition support",
        importance: "Low",
        category: "Advanced",
      },
      "Risk-Based Authentication": {
        description: "Adaptive authentication based on risk scoring",
        importance: "High",
        category: "Advanced",
      },
    },
  },
  network: {
    name: "Network Access Control",
    icon: <Network className="h-4 w-4" />,
    features: {
      "Dynamic VLAN Assignment": {
        description: "Automatic VLAN assignment based on policies",
        importance: "Critical",
        category: "Core",
      },
      "Network Segmentation": {
        description: "Micro-segmentation and isolation capabilities",
        importance: "Critical",
        category: "Security",
      },
      "Wireless Network Support": {
        description: "Wi-Fi network access control",
        importance: "Critical",
        category: "Core",
      },
      "Wired Network Support": {
        description: "Ethernet network access control",
        importance: "Critical",
        category: "Core",
      },
      "VPN Integration": {
        description: "Virtual Private Network access control",
        importance: "High",
        category: "Integration",
      },
      "Guest Network Management": {
        description: "Dedicated guest access and policies",
        importance: "High",
        category: "Core",
      },
      "BYOD Support": {
        description: "Bring Your Own Device management",
        importance: "High",
        category: "Core",
      },
      "IoT Device Management": {
        description: "Internet of Things device control",
        importance: "High",
        category: "Advanced",
      },
      "Network Visibility": {
        description: "Real-time network monitoring and insights",
        importance: "High",
        category: "Monitoring",
      },
      "Bandwidth Management": {
        description: "Quality of Service and traffic shaping",
        importance: "Medium",
        category: "Performance",
      },
    },
  },
  security: {
    name: "Security & Threat Protection",
    icon: <Shield className="h-4 w-4" />,
    features: {
      "Zero Trust Architecture": {
        description: "Never trust, always verify security model",
        importance: "Critical",
        category: "Advanced",
      },
      "Behavioral Analytics": {
        description: "AI-powered user and device behavior analysis",
        importance: "High",
        category: "Advanced",
      },
      "Threat Detection": {
        description: "Real-time threat identification and alerting",
        importance: "High",
        category: "Security",
      },
      "Automated Remediation": {
        description: "Automatic response to security incidents",
        importance: "High",
        category: "Advanced",
      },
      "Device Fingerprinting": {
        description: "Unique device identification and profiling",
        importance: "High",
        category: "Core",
      },
      "Posture Assessment": {
        description: "Device health and compliance checking",
        importance: "High",
        category: "Security",
      },
      "Vulnerability Scanning": {
        description: "Automated security vulnerability detection",
        importance: "Medium",
        category: "Security",
      },
      "Intrusion Detection": {
        description: "Network intrusion detection and prevention",
        importance: "Medium",
        category: "Security",
      },
      "Encryption Support": {
        description: "Data encryption in transit and at rest",
        importance: "Critical",
        category: "Security",
      },
      "Security Orchestration": {
        description: "Integration with SIEM and SOAR platforms",
        importance: "Medium",
        category: "Integration",
      },
    },
  },
  management: {
    name: "Management & Operations",
    icon: <Settings className="h-4 w-4" />,
    features: {
      "Cloud-Based Management": {
        description: "SaaS management console",
        importance: "High",
        category: "Core",
      },
      "On-Premises Management": {
        description: "Local management server deployment",
        importance: "Medium",
        category: "Core",
      },
      "Hybrid Deployment": {
        description: "Mixed cloud and on-premises deployment",
        importance: "High",
        category: "Core",
      },
      "Policy Management": {
        description: "Centralized policy creation and enforcement",
        importance: "Critical",
        category: "Core",
      },
      "Role-Based Access Control": {
        description: "Granular administrative permissions",
        importance: "High",
        category: "Security",
      },
      "API Integration": {
        description: "RESTful API for third-party integration",
        importance: "High",
        category: "Integration",
      },
      "Workflow Automation": {
        description: "Automated operational workflows",
        importance: "Medium",
        category: "Advanced",
      },
      "Multi-Tenancy": {
        description: "Support for multiple organizations",
        importance: "Medium",
        category: "Advanced",
      },
      "Backup & Recovery": {
        description: "Configuration backup and disaster recovery",
        importance: "High",
        category: "Operations",
      },
      "High Availability": {
        description: "Redundancy and failover capabilities",
        importance: "High",
        category: "Operations",
      },
    },
  },
  compliance: {
    name: "Compliance & Reporting",
    icon: <FileText className="h-4 w-4" />,
    features: {
      "Audit Logging": {
        description: "Comprehensive audit trail and logging",
        importance: "Critical",
        category: "Core",
      },
      "Compliance Reporting": {
        description: "Pre-built compliance reports",
        importance: "High",
        category: "Core",
      },
      "GDPR Compliance": {
        description: "General Data Protection Regulation support",
        importance: "High",
        category: "Compliance",
      },
      "HIPAA Compliance": {
        description: "Health Insurance Portability and Accountability Act",
        importance: "High",
        category: "Compliance",
      },
      "PCI DSS Compliance": {
        description: "Payment Card Industry Data Security Standard",
        importance: "High",
        category: "Compliance",
      },
      "SOC 2 Compliance": {
        description: "Service Organization Control 2 certification",
        importance: "Medium",
        category: "Compliance",
      },
      "Custom Reporting": {
        description: "Customizable reports and dashboards",
        importance: "Medium",
        category: "Core",
      },
      "Real-Time Alerts": {
        description: "Instant notifications for policy violations",
        importance: "High",
        category: "Monitoring",
      },
      "Data Retention Policies": {
        description: "Configurable data retention and purging",
        importance: "Medium",
        category: "Compliance",
      },
      "Forensic Analysis": {
        description: "Detailed incident investigation capabilities",
        importance: "Medium",
        category: "Advanced",
      },
    },
  },
  integration: {
    name: "Integration & Ecosystem",
    icon: <Globe className="h-4 w-4" />,
    features: {
      "SIEM Integration": {
        description: "Security Information and Event Management",
        importance: "High",
        category: "Integration",
      },
      "MDM Integration": {
        description: "Mobile Device Management platform support",
        importance: "High",
        category: "Integration",
      },
      "Firewall Integration": {
        description: "Next-generation firewall integration",
        importance: "High",
        category: "Integration",
      },
      "Switch Integration": {
        description: "Network switch vendor support",
        importance: "Critical",
        category: "Integration",
      },
      "Wireless Controller Integration": {
        description: "Wi-Fi controller platform support",
        importance: "Critical",
        category: "Integration",
      },
      "Cloud Platform Integration": {
        description: "AWS, Azure, GCP integration",
        importance: "High",
        category: "Integration",
      },
      "Ticketing System Integration": {
        description: "ITSM and helpdesk integration",
        importance: "Medium",
        category: "Integration",
      },
      "Threat Intelligence Feeds": {
        description: "External threat intelligence integration",
        importance: "Medium",
        category: "Security",
      },
      "Certificate Authority Integration": {
        description: "PKI and certificate management integration",
        importance: "Medium",
        category: "Security",
      },
      "Identity Provider Integration": {
        description: "SSO and identity provider support",
        importance: "High",
        category: "Integration",
      },
    },
  },
}

// Vendor feature support matrix (simplified for demo)
const VENDOR_FEATURE_SUPPORT = {
  portnox: {
    "802.1X Authentication": "Full",
    "Multi-Factor Authentication": "Full",
    "Certificate-Based Auth": "Full",
    "SAML 2.0 Integration": "Full",
    "OAuth 2.0 Support": "Full",
    "LDAP/Active Directory": "Full",
    "RADIUS Authentication": "Full",
    "TACACS+ Support": "Partial",
    "Biometric Authentication": "None",
    "Risk-Based Authentication": "Full",
    "Dynamic VLAN Assignment": "Full",
    "Network Segmentation": "Full",
    "Wireless Network Support": "Full",
    "Wired Network Support": "Full",
    "VPN Integration": "Partial",
    "Guest Network Management": "Full",
    "BYOD Support": "Full",
    "IoT Device Management": "Full",
    "Network Visibility": "Full",
    "Bandwidth Management": "Partial",
    "Zero Trust Architecture": "Full",
    "Behavioral Analytics": "Full",
    "Threat Detection": "Full",
    "Automated Remediation": "Full",
    "Device Fingerprinting": "Full",
    "Posture Assessment": "Partial",
    "Vulnerability Scanning": "None",
    "Intrusion Detection": "Partial",
    "Encryption Support": "Full",
    "Security Orchestration": "Full",
    "Cloud-Based Management": "Full",
    "On-Premises Management": "None",
    "Hybrid Deployment": "Partial",
    "Policy Management": "Full",
    "Role-Based Access Control": "Full",
    "API Integration": "Full",
    "Workflow Automation": "Full",
    "Multi-Tenancy": "Full",
    "Backup & Recovery": "Full",
    "High Availability": "Full",
    "Audit Logging": "Full",
    "Compliance Reporting": "Full",
    "GDPR Compliance": "Full",
    "HIPAA Compliance": "Full",
    "PCI DSS Compliance": "Full",
    "SOC 2 Compliance": "Full",
    "Custom Reporting": "Full",
    "Real-Time Alerts": "Full",
    "Data Retention Policies": "Full",
    "Forensic Analysis": "Partial",
    "SIEM Integration": "Full",
    "MDM Integration": "Full",
    "Firewall Integration": "Full",
    "Switch Integration": "Full",
    "Wireless Controller Integration": "Full",
    "Cloud Platform Integration": "Full",
    "Ticketing System Integration": "Partial",
    "Threat Intelligence Feeds": "Full",
    "Certificate Authority Integration": "Partial",
    "Identity Provider Integration": "Full",
  },
  cisco: {
    "802.1X Authentication": "Full",
    "Multi-Factor Authentication": "Full",
    "Certificate-Based Auth": "Full",
    "SAML 2.0 Integration": "Full",
    "OAuth 2.0 Support": "Partial",
    "LDAP/Active Directory": "Full",
    "RADIUS Authentication": "Full",
    "TACACS+ Support": "Full",
    "Biometric Authentication": "Partial",
    "Risk-Based Authentication": "Partial",
    "Dynamic VLAN Assignment": "Full",
    "Network Segmentation": "Full",
    "Wireless Network Support": "Full",
    "Wired Network Support": "Full",
    "VPN Integration": "Full",
    "Guest Network Management": "Full",
    "BYOD Support": "Full",
    "IoT Device Management": "Partial",
    "Network Visibility": "Full",
    "Bandwidth Management": "Full",
    "Zero Trust Architecture": "Partial",
    "Behavioral Analytics": "Partial",
    "Threat Detection": "Full",
    "Automated Remediation": "Partial",
    "Device Fingerprinting": "Full",
    "Posture Assessment": "Full",
    "Vulnerability Scanning": "Partial",
    "Intrusion Detection": "Full",
    "Encryption Support": "Full",
    "Security Orchestration": "Full",
    "Cloud-Based Management": "Partial",
    "On-Premises Management": "Full",
    "Hybrid Deployment": "Full",
    "Policy Management": "Full",
    "Role-Based Access Control": "Full",
    "API Integration": "Full",
    "Workflow Automation": "Partial",
    "Multi-Tenancy": "Full",
    "Backup & Recovery": "Full",
    "High Availability": "Full",
    "Audit Logging": "Full",
    "Compliance Reporting": "Full",
    "GDPR Compliance": "Partial",
    "HIPAA Compliance": "Full",
    "PCI DSS Compliance": "Full",
    "SOC 2 Compliance": "Full",
    "Custom Reporting": "Full",
    "Real-Time Alerts": "Full",
    "Data Retention Policies": "Full",
    "Forensic Analysis": "Full",
    "SIEM Integration": "Full",
    "MDM Integration": "Full",
    "Firewall Integration": "Full",
    "Switch Integration": "Full",
    "Wireless Controller Integration": "Full",
    "Cloud Platform Integration": "Partial",
    "Ticketing System Integration": "Full",
    "Threat Intelligence Feeds": "Full",
    "Certificate Authority Integration": "Full",
    "Identity Provider Integration": "Full",
  },
  // Add other vendors with similar structure...
}

export default function EnhancedFeatureComparisonView({ selectedVendors }: EnhancedFeatureComparisonProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedImportance, setSelectedImportance] = useState<string>("all")
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false)

  // Filter features based on search and filters
  const filteredFeatures = useMemo(() => {
    let allFeatures: any[] = []

    Object.entries(FEATURE_CATEGORIES).forEach(([categoryKey, category]) => {
      Object.entries(category.features).forEach(([featureKey, feature]) => {
        allFeatures.push({
          key: featureKey,
          category: categoryKey,
          categoryName: category.name,
          ...feature,
        })
      })
    })

    // Apply filters
    if (searchTerm) {
      allFeatures = allFeatures.filter(
        (feature) =>
          feature.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feature.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      allFeatures = allFeatures.filter((feature) => feature.category === selectedCategory)
    }

    if (selectedImportance !== "all") {
      allFeatures = allFeatures.filter((feature) => feature.importance === selectedImportance)
    }

    if (showOnlyDifferences) {
      allFeatures = allFeatures.filter((feature) => {
        const supports = selectedVendors.map((vendor) => VENDOR_FEATURE_SUPPORT[vendor]?.[feature.key] || "None")
        return new Set(supports).size > 1 // Show only if vendors differ
      })
    }

    return allFeatures
  }, [searchTerm, selectedCategory, selectedImportance, showOnlyDifferences, selectedVendors])

  // Calculate feature coverage scores
  const coverageScores = useMemo(() => {
    return selectedVendors.map((vendor) => {
      const vendorSupport = VENDOR_FEATURE_SUPPORT[vendor] || {}
      let totalScore = 0
      let maxScore = 0

      Object.entries(FEATURE_CATEGORIES).forEach(([categoryKey, category]) => {
        let categoryScore = 0
        let categoryMax = 0

        Object.entries(category.features).forEach(([featureKey, feature]) => {
          const support = vendorSupport[featureKey] || "None"
          const weight = feature.importance === "Critical" ? 3 : feature.importance === "High" ? 2 : 1
          const score = support === "Full" ? weight : support === "Partial" ? weight * 0.5 : 0

          categoryScore += score
          categoryMax += weight
        })

        totalScore += categoryScore
        maxScore += categoryMax
      })

      return {
        vendor,
        score: Math.round((totalScore / maxScore) * 100),
        categoryScores: Object.entries(FEATURE_CATEGORIES).map(([categoryKey, category]) => {
          let categoryScore = 0
          let categoryMax = 0

          Object.entries(category.features).forEach(([featureKey, feature]) => {
            const support = vendorSupport[featureKey] || "None"
            const weight = feature.importance === "Critical" ? 3 : feature.importance === "High" ? 2 : 1
            const score = support === "Full" ? weight : support === "Partial" ? weight * 0.5 : 0

            categoryScore += score
            categoryMax += weight
          })

          return {
            category: category.name,
            score: Math.round((categoryScore / categoryMax) * 100),
          }
        }),
      }
    })
  }, [selectedVendors])

  const getSupportIcon = (support: string) => {
    switch (support) {
      case "Full":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "Partial":
        return <MinusCircle className="h-4 w-4 text-yellow-600" />
      case "None":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getSupportBadge = (support: string) => {
    switch (support) {
      case "Full":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Full
          </Badge>
        )
      case "Partial":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Partial
          </Badge>
        )
      case "None":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            None
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Feature Comparison</h2>
          <p className="text-muted-foreground">Detailed feature analysis across selected vendors</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export Comparison
        </Button>
      </div>

      {/* Feature Coverage Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Feature Coverage Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coverageScores.map((score, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium capitalize">{score.vendor}</span>
                    <Badge variant="outline">{score.score}%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${score.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                score: { label: "Score", color: "hsl(var(--chart-1))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={coverageScores[0]?.categoryScores || []}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  {coverageScores.slice(0, 3).map((vendor, idx) => (
                    <Radar
                      key={idx}
                      name={vendor.vendor}
                      dataKey="score"
                      stroke={`hsl(${idx * 120}, 70%, 50%)`}
                      fill={`hsl(${idx * 120}, 70%, 50%)`}
                      fillOpacity={0.1}
                      data={vendor.categoryScores}
                    />
                  ))}
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">All Categories</option>
              {Object.entries(FEATURE_CATEGORIES).map(([key, category]) => (
                <option key={key} value={key}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={selectedImportance}
              onChange={(e) => setSelectedImportance(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">All Importance</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <div className="flex items-center space-x-2">
              <Checkbox id="differences" checked={showOnlyDifferences} onCheckedChange={setShowOnlyDifferences} />
              <label htmlFor="differences" className="text-sm font-medium">
                Show only differences
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Feature Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Feature</TableHead>
                  <TableHead className="w-[100px]">Importance</TableHead>
                  {selectedVendors.map((vendor) => (
                    <TableHead key={vendor} className="text-center min-w-[120px]">
                      <div className="capitalize font-semibold">{vendor}</div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeatures.map((feature, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{feature.key}</div>
                        <div className="text-sm text-muted-foreground">{feature.description}</div>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {feature.categoryName}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          feature.importance === "Critical"
                            ? "destructive"
                            : feature.importance === "High"
                              ? "default"
                              : feature.importance === "Medium"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        {feature.importance}
                      </Badge>
                    </TableCell>
                    {selectedVendors.map((vendor) => {
                      const support = VENDOR_FEATURE_SUPPORT[vendor]?.[feature.key] || "None"
                      return (
                        <TableCell key={vendor} className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            {getSupportIcon(support)}
                            {getSupportBadge(support)}
                          </div>
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Feature Summary by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(FEATURE_CATEGORIES).map(([categoryKey, category]) => (
          <Card key={categoryKey}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {category.icon}
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedVendors.map((vendor) => {
                  const vendorSupport = VENDOR_FEATURE_SUPPORT[vendor] || {}
                  const categoryFeatures = Object.keys(category.features)
                  const supportedCount = categoryFeatures.filter((feature) => vendorSupport[feature] === "Full").length
                  const partialCount = categoryFeatures.filter((feature) => vendorSupport[feature] === "Partial").length
                  const totalFeatures = categoryFeatures.length
                  const coveragePercent = Math.round(((supportedCount + partialCount * 0.5) / totalFeatures) * 100)

                  return (
                    <div key={vendor} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize">{vendor}</span>
                        <span className="text-sm text-muted-foreground">{coveragePercent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${coveragePercent}%` }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{supportedCount} Full</span>
                        <span>{partialCount} Partial</span>
                        <span>{totalFeatures - supportedCount - partialCount} None</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
