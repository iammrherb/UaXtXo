"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Download, FileText, Mail, Calendar, TrendingUp, DollarSign, Shield, Clock } from "lucide-react"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"

interface ExecutiveReportViewProps {
  results: any[]
  config: any
}

export default function ExecutiveReportView({ results, config }: ExecutiveReportViewProps) {
  if (!results || results.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>No data available for executive report</p>
        </CardContent>
      </Card>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

  // Calculate key metrics
  const bestOption = results.reduce((best, current) =>
    (current.roi?.percentage || 0) > (best.roi?.percentage || 0) ? current : best,
  )

  const lowestCost = results.reduce((lowest, current) => (current.total < lowest.total ? current : lowest))

  const totalInvestment = results.reduce((sum, r) => sum + (r.total || 0), 0)
  const averageROI = results.reduce((sum, r) => sum + (r.roi?.percentage || 0), 0) / results.length
  const totalSavings = results.reduce((sum, r) => sum + (r.roi?.annualSavings || 0) * (config.years || 3), 0)

  // Prepare executive summary data
  const summaryData = results.map((result) => ({
    vendor: result.vendorName,
    cost: result.total,
    roi: result.roi?.percentage || 0,
    payback: result.roi?.paybackMonths || 0,
    risk: (result.risk?.breachReduction || 0) * 100,
  }))

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Report Header */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img src="/portnox-logo.png" alt="Portnox" className="h-8" />
          </div>
          <CardTitle className="text-2xl">Network Access Control (NAC)</CardTitle>
          <CardTitle className="text-3xl font-bold">Total Cost of Ownership Analysis</CardTitle>
          <p className="text-muted-foreground mt-2">Executive Summary Report</p>
          <p className="text-sm text-muted-foreground">Generated on {currentDate}</p>
        </CardHeader>
      </Card>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Executive Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Analysis Overview</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>Scope:</strong> {config.devices?.toLocaleString() || "N/A"} devices,{" "}
                  {config.users?.toLocaleString() || "N/A"} users
                </li>
                <li>
                  • <strong>Timeline:</strong> {config.years || 3}-year analysis period
                </li>
                <li>
                  • <strong>Vendors Evaluated:</strong> {results.length} solutions
                </li>
                <li>
                  • <strong>License Tier:</strong> {config.licenseTier || "Enterprise"}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Key Findings</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>Best ROI:</strong> {bestOption.vendorName} ({Math.round(bestOption.roi?.percentage || 0)}%)
                </li>
                <li>
                  • <strong>Lowest TCO:</strong> {lowestCost.vendorName} ({formatCurrency(lowestCost.total)})
                </li>
                <li>
                  • <strong>Fastest Payback:</strong> {Math.min(...results.map((r) => r.roi?.paybackMonths || 999))}{" "}
                  months
                </li>
                <li>
                  • <strong>Total Potential Savings:</strong> {formatCurrency(totalSavings)}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Total Investment</p>
                <p className="text-2xl font-bold">{formatCurrency(totalInvestment)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Average ROI</p>
                <p className="text-2xl font-bold">{Math.round(averageROI)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Risk Reduction</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    (results.reduce((sum, r) => sum + (r.risk?.breachReduction || 0), 0) / results.length) * 100,
                  )}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Analysis Period</p>
                <p className="text-2xl font-bold">{config.years || 3} Years</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Total Cost of Ownership Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vendor" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Total Cost"]} />
              <Bar dataKey="cost" fill="#00D4AA" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Vendor Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Vendor Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Vendor</th>
                  <th className="text-right p-3">3-Year TCO</th>
                  <th className="text-right p-3">ROI</th>
                  <th className="text-right p-3">Payback Period</th>
                  <th className="text-right p-3">Annual Savings</th>
                  <th className="text-center p-3">Risk Level</th>
                  <th className="text-center p-3">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={result.vendor} className="border-b">
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{result.vendorName}</span>
                      </div>
                    </td>
                    <td className="text-right p-3 font-semibold">{formatCurrency(result.total)}</td>
                    <td className="text-right p-3">
                      <Badge variant={result.roi?.percentage > 0 ? "default" : "destructive"}>
                        {Math.round(result.roi?.percentage || 0)}%
                      </Badge>
                    </td>
                    <td className="text-right p-3">{result.roi?.paybackMonths || "N/A"} months</td>
                    <td className="text-right p-3">{formatCurrency(result.roi?.annualSavings || 0)}</td>
                    <td className="text-center p-3">
                      <Badge
                        variant={
                          (result.risk?.breachReduction || 0) > 0.5
                            ? "default"
                            : (result.risk?.breachReduction || 0) > 0.3
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {(result.risk?.breachReduction || 0) > 0.5
                          ? "Low"
                          : (result.risk?.breachReduction || 0) > 0.3
                            ? "Medium"
                            : "High"}
                      </Badge>
                    </td>
                    <td className="text-center p-3">
                      {result === bestOption && <Badge>Recommended</Badge>}
                      {result === lowestCost && result !== bestOption && <Badge variant="outline">Lowest Cost</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-green-700">Primary Recommendation: {bestOption.vendorName}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Offers the best return on investment with {Math.round(bestOption.roi?.percentage || 0)}% ROI and
                {bestOption.roi?.paybackMonths || "N/A"} month payback period.
                {ComprehensiveVendorDatabase[bestOption.vendor]?.category === "cloud-native" &&
                  " Cloud-native architecture provides scalability and reduced operational overhead."}
              </p>
            </div>

            {lowestCost !== bestOption && (
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-blue-700">Budget-Conscious Option: {lowestCost.vendorName}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Lowest total cost of ownership at {formatCurrency(lowestCost.total)} over {config.years || 3} years.
                  Consider if budget constraints are the primary concern.
                </p>
              </div>
            )}

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-orange-700">Implementation Considerations</h3>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>
                  • Plan for {Math.min(...results.map((r) => r.roi?.paybackMonths || 999))}-
                  {Math.max(...results.map((r) => r.roi?.paybackMonths || 0))} month implementation timeline
                </li>
                <li>• Budget for professional services and training</li>
                <li>• Consider integration complexity with existing infrastructure</li>
                <li>• Plan for change management and user adoption</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Immediate Actions (Next 30 Days)</h3>
              <ul className="space-y-2 text-sm">
                <li>• Schedule vendor demonstrations</li>
                <li>• Conduct proof of concept with top 2 vendors</li>
                <li>• Validate integration requirements</li>
                <li>• Secure budget approval</li>
                <li>• Form project team</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Medium-term Planning (Next 90 Days)</h3>
              <ul className="space-y-2 text-sm">
                <li>• Finalize vendor selection</li>
                <li>• Negotiate contract terms</li>
                <li>• Develop implementation plan</li>
                <li>• Plan user training program</li>
                <li>• Establish success metrics</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Report Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Email Report
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Review
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Presentation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> This analysis is based on publicly available information and standard industry
            assumptions. Actual costs and results may vary based on specific requirements, negotiated pricing, and
            implementation factors. This report is intended for informational purposes and should be supplemented with
            detailed vendor evaluations and proof-of-concept testing before making final decisions.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
