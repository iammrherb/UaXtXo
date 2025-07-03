"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AlertTriangle, CheckCircle, Banknote, ShieldCheck } from "lucide-react"
import { ComprehensiveVendorDatabase, ComplianceFrameworks } from "@/lib/comprehensive-vendor-data"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

const safeNumber = (value: any, fallback = 0): number => {
  const num = Number(value)
  return isNaN(num) || !isFinite(num) ? fallback : num
}

const formatCurrency = (value: any): string => {
  const num = safeNumber(value)
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `$${(num / 1_000).toFixed(0)}K`
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num)
}

export default function CybersecurityPostureView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  if (!results || results.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>No security data available. Please select vendors to analyze.</p>
        </CardContent>
      </Card>
    )
  }

  const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

  const financialRiskData = results.map((r) => ({
    name: r.vendorName,
    "Breach Cost Avoidance": safeNumber(r.risk.potentialBreachCost) - safeNumber(r.risk.mitigatedBreachCost),
    "Insurance Savings": safeNumber(r.risk.insurancePremiumReduction),
  }))

  const complianceCoverageData = Object.keys(ComplianceFrameworks).map((frameworkKey) => {
    const framework = ComplianceFrameworks[frameworkKey]
    const vendorCoverage = results.map((r) => {
      const vendor = ComprehensiveVendorDatabase[r.vendor]
      const coveredControls = vendor?.complianceMapping?.[frameworkKey]?.length || 0
      return {
        vendorName: r.vendorName,
        coverage: (coveredControls / framework.controls.length) * 100,
      }
    })
    return {
      framework: framework.name,
      ...vendorCoverage.reduce((acc, v) => ({ ...acc, [v.vendorName]: v.coverage }), {}),
    }
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Breach Cost Reduction</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                results.reduce((sum, r) => sum + (r.risk.potentialBreachCost - r.risk.mitigatedBreachCost), 0) /
                  results.length,
              )}
            </div>
            <p className="text-xs text-muted-foreground">Annualized risk mitigation value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Insurance Savings</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(results.reduce((sum, r) => sum + r.risk.insurancePremiumReduction, 0) / results.length)}
            </div>
            <p className="text-xs text-muted-foreground">Estimated annual premium reduction</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Compliance Coverage</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Portnox</div>
            <p className="text-xs text-muted-foreground">Highest overall framework mapping</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="financial-impact">
        <TabsList>
          <TabsTrigger value="financial-impact">Financial Impact</TabsTrigger>
          <TabsTrigger value="compliance-mapping">Compliance Mapping</TabsTrigger>
        </TabsList>
        <TabsContent value="financial-impact" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Annual Financial Risk Mitigation</CardTitle>
              <CardDescription>
                Comparison of annual savings from breach cost avoidance and reduced insurance premiums.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={financialRiskData} layout="vertical" stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `${value * 100}%`} />
                  <YAxis type="category" dataKey="name" width={120} />
                  <Tooltip formatter={(value, name, props) => [formatCurrency(props.payload[name]), name]} />
                  <Bar dataKey="Breach Cost Avoidance" fill="#00D4AA" stackId="a" />
                  <Bar dataKey="Insurance Savings" fill="#0EA5E9" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="compliance-mapping" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Control Mapping</CardTitle>
              <CardDescription>
                How each vendor solution maps to key controls in major security frameworks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {Object.keys(ComplianceFrameworks).map((frameworkKey) => {
                  const framework = ComplianceFrameworks[frameworkKey]
                  return (
                    <AccordionItem value={frameworkKey} key={frameworkKey}>
                      <AccordionTrigger>{framework.name}</AccordionTrigger>
                      <AccordionContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Control ID</TableHead>
                              <TableHead>Control Name</TableHead>
                              {results.map((r) => (
                                <TableHead key={r.vendor} className="text-center">
                                  {r.vendorName}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {framework.controls.map((control) => (
                              <TableRow key={control.id}>
                                <TableCell>
                                  <Badge variant="secondary">{control.id}</Badge>
                                </TableCell>
                                <TableCell>{control.name}</TableCell>
                                {results.map((r) => {
                                  const vendor = ComprehensiveVendorDatabase[r.vendor]
                                  const isCovered = vendor?.complianceMapping?.[frameworkKey]?.includes(control.id)
                                  return (
                                    <TableCell key={r.vendor} className="text-center">
                                      {isCovered ? (
                                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                                      ) : (
                                        <span className="text-gray-400">-</span>
                                      )}
                                    </TableCell>
                                  )
                                })}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
