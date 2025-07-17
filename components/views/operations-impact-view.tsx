"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Users, Clock, Zap, ShieldCheck } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface OperationsImpactViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function OperationsImpactView({ results = [], config }: OperationsImpactViewProps) {
  const staffingData = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      "Technical FTEs": result.vendorData.implementation.resourcesRequired.technical,
      "Admin FTEs": result.vendorData.implementation.resourcesRequired.administrative,
      "Total FTEs":
        result.vendorData.implementation.resourcesRequired.technical +
        result.vendorData.implementation.resourcesRequired.administrative,
    }))
  }, [results])

  const timeSavingsData = useMemo(() => {
    return [
      { name: "Policy Management", portnox: 4, traditional: 20 },
      { name: "Troubleshooting", portnox: 2, traditional: 32 },
      { name: "Updates & Patching", portnox: 0, traditional: 40 },
      { name: "Onboarding New Devices", portnox: 1, traditional: 15 },
    ]
  }, [])

  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const avgCompetitorFTE =
    staffingData.filter((d) => d.vendor !== "Portnox CLEAR").reduce((sum, d) => sum + d["Total FTEs"], 0) /
    (staffingData.length - 1 || 1)
  const fteReduction = portnoxResult
    ? ((avgCompetitorFTE -
        (portnoxResult.vendorData.implementation.resourcesRequired.technical +
          portnoxResult.vendorData.implementation.resourcesRequired.administrative)) /
        avgCompetitorFTE) *
      100
    : 0

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Please select vendors to compare operational impact.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FTE Reduction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{fteReduction.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">Less staff required for management</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time to Resolution</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">85% Faster</div>
            <p className="text-xs text-muted-foreground">MTTR for security incidents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automation Level</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">95%</div>
            <p className="text-xs text-muted-foreground">of tasks automated with Portnox</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Zero Maintenance</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 Hours</div>
            <p className="text-xs text-muted-foreground">on hardware/software updates</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Staffing Requirements (FTEs)</CardTitle>
            <CardDescription>Full-Time Equivalents needed for NAC management.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={staffingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Technical FTEs" stackId="a" fill="#3b82f6" />
                <Bar dataKey="Admin FTEs" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Operational Time Savings (Hours/Month)</CardTitle>
            <CardDescription>Comparison of time spent on common operational tasks.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeSavingsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="portnox" fill="#10b981" name="Portnox" radius={[0, 4, 4, 0]} />
                <Bar dataKey="traditional" fill="#ef4444" name="Traditional NAC" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
