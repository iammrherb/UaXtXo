import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DetailedCostResults } from "@/lib/validators/detailed-cost"
import type { DetailedCostConfig } from "@/lib/validators/detailed-cost-config"
import CostComparisonChart from "@/components/charts/cost-comparison-chart"
import CostBreakdownComparison from "@/components/charts/cost-breakdown-comparison"

interface DetailedCostsViewProps {
  results: DetailedCostResults
  config: DetailedCostConfig
}

const DetailedCostsView: React.FC<DetailedCostsViewProps> = ({ results, config }) => {
  return (
    <div className="flex flex-col space-y-4">
      {/* Cost Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Comparison</CardTitle>
          <CardDescription>Visual comparison of total costs</CardDescription>
        </CardHeader>
        <CardContent>
          <CostComparisonChart results={results} />
        </CardContent>
      </Card>

      {/* Enhanced Cost Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Cost Breakdown Analysis</CardTitle>
          <CardDescription>Comprehensive cost comparison with savings breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <CostBreakdownComparison results={results} config={config} />
        </CardContent>
      </Card>
    </div>
  )
}

export default DetailedCostsView
