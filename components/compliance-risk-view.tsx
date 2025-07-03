"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ComplianceRiskViewProps {
  results: any[]
  config: any
}

export default function ComplianceRiskView({ results, config }: ComplianceRiskViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance & Risk View</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Compliance and Risk data will be displayed here.</div>
      </CardContent>
    </Card>
  )
}
