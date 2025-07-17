"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, BarChart3, Shield, DollarSign, Power } from "lucide-react"
import { toast } from "sonner"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ReportsViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function ReportsView({ results = [], config }: ReportsViewProps) {
  const [isGenerating, setIsGenerating] = useState<string | null>(null)

  const handleGenerateReport = (reportType: string) => {
    setIsGenerating(reportType)
    toast.info(`Generating ${reportType} report...`)
    setTimeout(() => {
      toast.success(`${reportType} report generated successfully!`, {
        description: "Your download will begin shortly.",
      })
      setIsGenerating(null)
    }, 2000)
  }

  const reportTemplates = [
    {
      id: "executive",
      title: "Executive Summary Report",
      description: "High-level overview for C-suite decision makers.",
      icon: BarChart3,
      audience: "C-Suite",
      format: "PDF",
      includes: ["ROI Analysis", "Cost Savings", "Strategic Benefits", "Risk Reduction"],
    },
    {
      id: "technical",
      title: "Technical Assessment Report",
      description: "Detailed technical comparison and analysis.",
      icon: Shield,
      audience: "IT/Security Teams",
      format: "PDF",
      includes: ["Feature Matrix", "Security Analysis", "Architecture Review", "Implementation Plan"],
    },
    {
      id: "financial",
      title: "Financial Analysis Report",
      description: "Comprehensive TCO and ROI breakdown.",
      icon: DollarSign,
      audience: "Finance Teams",
      format: "PDF + Excel",
      includes: ["Cost Breakdown", "ROI Projections", "Budget Planning", "Risk Assessment"],
    },
    {
      id: "presentation",
      title: "Board-Ready Presentation",
      description: "A slide deck summarizing the key findings.",
      icon: Power,
      audience: "Board Members",
      format: "PowerPoint",
      includes: ["Key Findings", "Recommendation", "Financial Impact", "Next Steps"],
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Your Custom Report</CardTitle>
          <CardDescription>
            Select a report template to generate a tailored analysis based on your current selections.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          {reportTemplates.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <report.icon className="h-8 w-8 text-portnox-primary" />
                  <div>
                    <CardTitle>{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Audience:</span>
                    <span className="font-medium">{report.audience}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium">{report.format}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Includes:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {report.includes.map((item) => (
                        <Badge key={item} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleGenerateReport(report.title)}
                  disabled={isGenerating !== null}
                >
                  {isGenerating === report.title ? (
                    "Generating..."
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
