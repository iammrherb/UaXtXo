"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Info } from "lucide-react"

interface EnhancedTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
  type?: "cost" | "roi" | "risk" | "timeline" | "comparison"
  config?: any
  vendorData?: any
}

export function EnhancedTooltip({ active, payload, label, type = "cost", config, vendorData }: EnhancedTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null
  }

  const formatCurrency = (value: number) => {
    if (typeof value !== "number" || isNaN(value) || !isFinite(value)) {
      return "$0"
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    if (typeof value !== "number" || isNaN(value) || !isFinite(value)) {
      return "0%"
    }
    return `${value.toFixed(1)}%`
  }

  const safeNumber = (value: any, defaultValue = 0) => {
    const num = Number(value)
    return isNaN(num) || !isFinite(num) ? defaultValue : num
  }

  const getInsight = (value: number, type: string, vendor?: string) => {
    const safeValue = safeNumber(value)

    switch (type) {
      case "cost":
        if (safeValue < 100000)
          return { text: "Excellent value for money", icon: CheckCircle2, color: "text-green-600" }
        if (safeValue < 500000) return { text: "Competitive pricing", icon: Info, color: "text-blue-600" }
        return { text: "Premium pricing - evaluate ROI carefully", icon: AlertTriangle, color: "text-amber-600" }

      case "roi":
        if (safeValue > 300)
          return { text: "Exceptional ROI - Strong investment", icon: TrendingUp, color: "text-green-600" }
        if (safeValue > 100) return { text: "Good ROI - Recommended", icon: TrendingUp, color: "text-blue-600" }
        if (safeValue > 50) return { text: "Moderate ROI - Consider alternatives", icon: Info, color: "text-amber-600" }
        return { text: "Low ROI - High risk investment", icon: TrendingDown, color: "text-red-600" }

      case "risk":
        if (safeValue < 20)
          return { text: "Low risk - Highly recommended", icon: CheckCircle2, color: "text-green-600" }
        if (safeValue < 50) return { text: "Moderate risk - Acceptable", icon: Info, color: "text-blue-600" }
        if (safeValue < 70)
          return { text: "High risk - Requires mitigation", icon: AlertTriangle, color: "text-amber-600" }
        return { text: "Very high risk - Not recommended", icon: AlertTriangle, color: "text-red-600" }

      default:
        return { text: "Standard performance", icon: Info, color: "text-gray-600" }
    }
  }

  const getBenchmark = (value: number, type: string) => {
    const safeValue = safeNumber(value)

    const benchmarks = {
      cost: { excellent: 200000, good: 500000, average: 1000000 },
      roi: { excellent: 300, good: 150, average: 75 },
      risk: { excellent: 20, good: 40, average: 60 },
      payback: { excellent: 6, good: 12, average: 24 },
    }

    const benchmark = benchmarks[type as keyof typeof benchmarks]
    if (!benchmark) return "Standard"

    if (type === "risk") {
      if (safeValue <= benchmark.excellent) return "Industry Leading"
      if (safeValue <= benchmark.good) return "Above Average"
      if (safeValue <= benchmark.average) return "Industry Average"
      return "Below Average"
    } else {
      if (safeValue >= benchmark.excellent) return "Industry Leading"
      if (safeValue >= benchmark.good) return "Above Average"
      if (safeValue >= benchmark.average) return "Industry Average"
      return "Below Average"
    }
  }

  const renderCostTooltip = () => {
    const data = payload[0]?.payload
    const totalCost = safeNumber(data?.totalCost || data?.value)
    const vendor = data?.vendor || label || "Unknown Vendor"
    const isPortnox = data?.isPortnox || vendor?.toLowerCase().includes("portnox")

    return (
      <Card className="w-80 shadow-lg border-2">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg">{vendor}</h4>
            {isPortnox && <Badge className="bg-green-600">Recommended</Badge>}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Cost:</span>
              <span className="text-lg font-bold">{formatCurrency(totalCost)}</span>
            </div>

            {config?.devices && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Per Device:</span>
                <span>{formatCurrency(totalCost / config.devices)}</span>
              </div>
            )}

            {config?.years && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Annual Cost:</span>
                <span>{formatCurrency(totalCost / config.years)}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Cost Breakdown */}
          {data?.licensing && (
            <div className="space-y-1">
              <h5 className="font-medium text-sm">Cost Breakdown:</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span>Licensing:</span>
                  <span>{formatCurrency(safeNumber(data.licensing))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hardware:</span>
                  <span>{formatCurrency(safeNumber(data.hardware))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Services:</span>
                  <span>{formatCurrency(safeNumber(data.services))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Training:</span>
                  <span>{formatCurrency(safeNumber(data.training))}</span>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Insights */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              {(() => {
                const insight = getInsight(totalCost, "cost", vendor)
                const Icon = insight.icon
                return (
                  <>
                    <Icon className={`h-4 w-4 mt-0.5 ${insight.color}`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${insight.color}`}>{insight.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">Benchmark: {getBenchmark(totalCost, "cost")}</p>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>

          {/* Additional Context */}
          <div className="bg-muted/50 p-2 rounded text-xs">
            <p className="font-medium mb-1">💡 Key Considerations:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Include hidden costs in evaluation</li>
              <li>• Consider long-term scalability needs</li>
              <li>• Factor in implementation complexity</li>
              {isPortnox && <li>• Zero infrastructure requirements</li>}
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderROITooltip = () => {
    const data = payload[0]?.payload
    const roi = safeNumber(data?.roi || data?.value)
    const vendor = data?.vendor || label || "Unknown Vendor"
    const payback = safeNumber(data?.payback || data?.paybackMonths)
    const savings = safeNumber(data?.savings || data?.totalSavings)

    return (
      <Card className="w-80 shadow-lg border-2">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg">{vendor}</h4>
            <Badge variant={roi > 200 ? "default" : roi > 100 ? "secondary" : "outline"}>
              {formatPercentage(roi)} ROI
            </Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Return on Investment</p>
              <p className="text-2xl font-bold text-green-600">{formatPercentage(roi)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payback Period</p>
              <p className="text-2xl font-bold text-blue-600">{payback.toFixed(1)}m</p>
            </div>
          </div>

          {savings > 0 && (
            <div>
              <p className="text-sm text-muted-foreground">Total Savings</p>
              <p className="text-lg font-semibold">{formatCurrency(savings)}</p>
            </div>
          )}

          <Separator />

          {/* ROI Analysis */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              {(() => {
                const insight = getInsight(roi, "roi", vendor)
                const Icon = insight.icon
                return (
                  <>
                    <Icon className={`h-4 w-4 mt-0.5 ${insight.color}`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${insight.color}`}>{insight.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">Performance: {getBenchmark(roi, "roi")}</p>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>

          {/* ROI Breakdown */}
          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded">
            <h5 className="font-medium text-sm mb-2">ROI Components:</h5>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Cost Savings:</span>
                <span className="text-green-600">+{formatPercentage(roi * 0.4)}</span>
              </div>
              <div className="flex justify-between">
                <span>Productivity Gains:</span>
                <span className="text-green-600">+{formatPercentage(roi * 0.3)}</span>
              </div>
              <div className="flex justify-between">
                <span>Risk Reduction:</span>
                <span className="text-green-600">+{formatPercentage(roi * 0.2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Compliance Benefits:</span>
                <span className="text-green-600">+{formatPercentage(roi * 0.1)}</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-muted/50 p-2 rounded text-xs">
            <p className="font-medium mb-1">📊 Investment Analysis:</p>
            <ul className="space-y-1 text-muted-foreground">
              {roi > 200 && <li>• Exceptional investment opportunity</li>}
              {payback < 12 && <li>• Rapid payback period</li>}
              {roi > 100 && <li>• Strong business case for approval</li>}
              <li>• Consider implementation timeline</li>
              <li>• Validate assumptions with stakeholders</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderRiskTooltip = () => {
    const data = payload[0]?.payload
    const overallRisk = safeNumber(data?.overallRisk || data?.value)
    const vendor = data?.vendor || label || "Unknown Vendor"
    const securityRisk = safeNumber(data?.securityRisk)
    const operationalRisk = safeNumber(data?.operationalRisk)
    const financialRisk = safeNumber(data?.financialRisk)

    return (
      <Card className="w-80 shadow-lg border-2">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg">{vendor}</h4>
            <Badge variant={overallRisk < 30 ? "default" : overallRisk < 60 ? "secondary" : "destructive"}>
              {overallRisk.toFixed(0)} Risk Score
            </Badge>
          </div>

          <Separator />

          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Risk Breakdown:</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Security Risk:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: `${Math.min(securityRisk, 100)}%` }} />
                    </div>
                    <span className="text-sm font-medium">{securityRisk.toFixed(0)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Operational Risk:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: `${Math.min(operationalRisk, 100)}%` }} />
                    </div>
                    <span className="text-sm font-medium">{operationalRisk.toFixed(0)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Financial Risk:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${Math.min(financialRisk, 100)}%` }} />
                    </div>
                    <span className="text-sm font-medium">{financialRisk.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Risk Assessment */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              {(() => {
                const insight = getInsight(overallRisk, "risk", vendor)
                const Icon = insight.icon
                return (
                  <>
                    <Icon className={`h-4 w-4 mt-0.5 ${insight.color}`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${insight.color}`}>{insight.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Risk Level: {getBenchmark(overallRisk, "risk")}
                      </p>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>

          {/* Risk Mitigation */}
          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded">
            <h5 className="font-medium text-sm mb-2">Risk Mitigation Strategies:</h5>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {securityRisk > 50 && <li>• Implement additional security controls</li>}
              {operationalRisk > 50 && <li>• Plan comprehensive training program</li>}
              {financialRisk > 50 && <li>• Negotiate flexible payment terms</li>}
              <li>• Establish clear success metrics</li>
              <li>• Create contingency plans</li>
            </ul>
          </div>

          {/* Industry Context */}
          <div className="bg-muted/50 p-2 rounded text-xs">
            <p className="font-medium mb-1">🎯 Industry Benchmarks:</p>
            <div className="grid grid-cols-2 gap-2 text-muted-foreground">
              <div>Average Risk: 45-65</div>
              <div>Best-in-Class: &lt;25</div>
              <div>High Risk: &gt;70</div>
              <div>Your Score: {overallRisk.toFixed(0)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderTimelineTooltip = () => {
    const data = payload[0]?.payload
    const timeline = safeNumber(data?.timeline || data?.value)
    const vendor = data?.vendor || label || "Unknown Vendor"
    const complexity = data?.complexity || "Medium"
    const resources = safeNumber(data?.resources)

    return (
      <Card className="w-80 shadow-lg border-2">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg">{vendor}</h4>
            <Badge variant={timeline < 30 ? "default" : timeline < 90 ? "secondary" : "outline"}>{timeline} days</Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Implementation Time</p>
              <p className="text-2xl font-bold text-blue-600">{timeline} days</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Complexity Level</p>
              <p className="text-lg font-semibold">{complexity}</p>
            </div>
          </div>

          {resources > 0 && (
            <div>
              <p className="text-sm text-muted-foreground">Resource Requirements</p>
              <p className="text-lg font-semibold">{resources.toFixed(1)} FTE</p>
            </div>
          )}

          <Separator />

          {/* Timeline Analysis */}
          <div className="space-y-2">
            <h5 className="font-medium text-sm">Implementation Phases:</h5>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Planning & Design:</span>
                <span>{Math.round(timeline * 0.2)} days</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Installation & Config:</span>
                <span>{Math.round(timeline * 0.4)} days</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Testing & Validation:</span>
                <span>{Math.round(timeline * 0.25)} days</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Training & Go-Live:</span>
                <span>{Math.round(timeline * 0.15)} days</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Success Factors */}
          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
            <h5 className="font-medium text-sm mb-2">Success Factors:</h5>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Executive sponsorship and support</li>
              <li>• Dedicated project team</li>
              <li>• Clear communication plan</li>
              {timeline < 30 && <li>• Rapid deployment advantage</li>}
              {complexity === "Low" && <li>• Minimal disruption to operations</li>}
            </ul>
          </div>

          {/* Benchmark Comparison */}
          <div className="bg-muted/50 p-2 rounded text-xs">
            <p className="font-medium mb-1">⏱️ Industry Benchmarks:</p>
            <div className="grid grid-cols-2 gap-2 text-muted-foreground">
              <div>Cloud Solutions: 7-30 days</div>
              <div>On-Premise: 90-180 days</div>
              <div>Hybrid: 45-120 days</div>
              <div>Your Timeline: {timeline} days</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderComparisonTooltip = () => {
    const data = payload[0]?.payload
    const vendor = data?.vendor || label || "Unknown Vendor"
    const isPortnox = data?.isPortnox || vendor?.toLowerCase().includes("portnox")

    return (
      <Card className="w-80 shadow-lg border-2">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg">{vendor}</h4>
            {isPortnox && <Badge className="bg-green-600">Recommended</Badge>}
          </div>

          <Separator />

          <div className="space-y-3">
            {payload.map((entry, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm capitalize">{entry.dataKey}:</span>
                <span className="font-medium">
                  {typeof entry.value === "number"
                    ? entry.dataKey.includes("cost") || entry.dataKey.includes("saving")
                      ? formatCurrency(entry.value)
                      : entry.dataKey.includes("roi") || entry.dataKey.includes("percentage")
                        ? formatPercentage(entry.value)
                        : safeNumber(entry.value).toLocaleString()
                    : String(entry.value || "N/A")}
                </span>
              </div>
            ))}
          </div>

          <Separator />

          {/* Competitive Analysis */}
          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded">
            <h5 className="font-medium text-sm mb-2">Competitive Position:</h5>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {isPortnox && (
                <>
                  <li>• Market-leading cloud-native architecture</li>
                  <li>• Zero infrastructure requirements</li>
                  <li>• Fastest deployment in industry</li>
                </>
              )}
              <li>• Compare total cost of ownership</li>
              <li>• Evaluate long-term strategic fit</li>
              <li>• Consider vendor roadmap alignment</li>
            </ul>
          </div>

          {/* Decision Framework */}
          <div className="bg-muted/50 p-2 rounded text-xs">
            <p className="font-medium mb-1">🎯 Evaluation Criteria:</p>
            <div className="space-y-1 text-muted-foreground">
              <div>✓ Total Cost of Ownership</div>
              <div>✓ Implementation Complexity</div>
              <div>✓ Security & Compliance</div>
              <div>✓ Scalability & Future-Proofing</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Route to appropriate tooltip based on type
  switch (type) {
    case "cost":
      return renderCostTooltip()
    case "roi":
      return renderROITooltip()
    case "risk":
      return renderRiskTooltip()
    case "timeline":
      return renderTimelineTooltip()
    case "comparison":
      return renderComparisonTooltip()
    default:
      return renderCostTooltip()
  }
}
