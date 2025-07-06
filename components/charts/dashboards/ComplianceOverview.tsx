"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, XCircle, Shield } from "lucide-react"
import { useDashboardSettings } from "@/context/DashboardContext"

export default function ComplianceOverview() {
  const { settings } = useDashboardSettings()

  const complianceStandards = [
    {
      name: "SOC 2 Type II",
      status: "compliant",
      coverage: 100,
      description: "Security, availability, and confidentiality controls",
    },
    {
      name: "ISO 27001",
      status: "compliant",
      coverage: 98,
      description: "Information security management system",
    },
    {
      name: "NIST Cybersecurity Framework",
      status: "compliant",
      coverage: 95,
      description: "Comprehensive cybersecurity guidelines",
    },
    {
      name: "GDPR",
      status: "partial",
      coverage: 85,
      description: "General Data Protection Regulation",
    },
    {
      name: "HIPAA",
      status: settings.industry === "healthcare" ? "compliant" : "not-applicable",
      coverage: settings.industry === "healthcare" ? 92 : 0,
      description: "Health Insurance Portability and Accountability Act",
    },
    {
      name: "PCI DSS",
      status: settings.industry === "finance" || settings.industry === "retail" ? "compliant" : "partial",
      coverage: settings.industry === "finance" || settings.industry === "retail" ? 90 : 70,
      description: "Payment Card Industry Data Security Standard",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "partial":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "non-compliant":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Compliant</Badge>
      case "partial":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Partial</Badge>
      case "non-compliant":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Non-Compliant</Badge>
      default:
        return <Badge variant="secondary">N/A</Badge>
    }
  }

  const overallScore = Math.round(
    complianceStandards.filter((std) => std.status !== "not-applicable").reduce((acc, std) => acc + std.coverage, 0) /
      complianceStandards.filter((std) => std.status !== "not-applicable").length,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Compliance Overview</h2>
          <p className="text-gray-600">Regulatory compliance status for {settings.industry} industry</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-portnox-blue">{overallScore}%</div>
          <div className="text-sm text-gray-600">Overall Score</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Standards */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-portnox-blue" />
                Compliance Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceStandards.map((standard, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(standard.status)}
                        <span className="font-medium">{standard.name}</span>
                      </div>
                      {getStatusBadge(standard.status)}
                    </div>
                    {standard.status !== "not-applicable" && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{standard.description}</span>
                          <span className="font-medium">{standard.coverage}%</span>
                        </div>
                        <Progress value={standard.coverage} className="h-2" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Summary */}
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Compliant Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {complianceStandards.filter((s) => s.status === "compliant").length}
              </div>
              <p className="text-sm text-green-700">Fully compliant with major standards</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-800">Partial Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {complianceStandards.filter((s) => s.status === "partial").length}
              </div>
              <p className="text-sm text-yellow-700">Standards requiring attention</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-portnox-blue/10 to-portnox-teal/10 border-portnox-blue/20">
            <CardHeader>
              <CardTitle className="text-portnox-blue">Industry Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 capitalize">
                {settings.industry} industry compliance requirements are prioritized in this analysis.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
