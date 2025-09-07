import type React from "react"
// Advanced Chart Library Integration
// Provides enhanced visualization capabilities with multiple chart types

import {
  BarChart,
  Bar,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  ScatterChart,
  Scatter,
  ComposedChart,
  Treemap,
  FunnelChart,
  Funnel,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"

// Chart color palettes
export const CHART_COLORS = {
  primary: ["#00D4AA", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"],
  portnox: ["#00D4AA", "#00B894", "#00A085", "#008876", "#007067"],
  gradient: ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe", "#00f2fe"],
  security: ["#e74c3c", "#f39c12", "#f1c40f", "#2ecc71", "#27ae60"],
  risk: ["#c0392b", "#e67e22", "#f39c12", "#f1c40f", "#2ecc71"],
}

// Chart configuration interfaces
export interface ChartConfig {
  type: "bar" | "line" | "area" | "pie" | "radar" | "scatter" | "composed" | "treemap" | "funnel"
  data: any[]
  colors?: string[]
  title?: string
  subtitle?: string
  xAxisKey?: string
  yAxisKey?: string
  dataKeys?: string[]
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  height?: number
  width?: number
  responsive?: boolean
}

export interface AdvancedChartProps extends ChartConfig {
  className?: string
  onDataPointClick?: (data: any) => void
  customTooltip?: React.ComponentType<any>
  customLegend?: React.ComponentType<any>
}

// Enhanced TCO Comparison Chart
export const TCOComparisonChart = ({ data, colors = CHART_COLORS.primary }: AdvancedChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="vendor" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          formatter={(value: number, name: string) => [`$${(value / 1000).toFixed(0)}K`, name]}
        />
        <Legend />
        <Bar dataKey="licensing" stackId="a" fill={colors[0]} name="Licensing" />
        <Bar dataKey="hardware" stackId="a" fill={colors[1]} name="Hardware" />
        <Bar dataKey="services" stackId="a" fill={colors[2]} name="Services" />
        <Bar dataKey="operations" stackId="a" fill={colors[3]} name="Operations" />
        <Line type="monotone" dataKey="totalCost" stroke={colors[4]} strokeWidth={3} name="Total Cost" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

// ROI Timeline Chart with Projections
export const ROITimelineChart = ({ data, colors = CHART_COLORS.portnox }: AdvancedChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors[0]} stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors[1]} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors[1]} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          formatter={(value: number, name: string) => [
            name === "roi" ? `${value.toFixed(1)}%` : `$${value.toFixed(0)}K`,
            name === "roi" ? "ROI" : name === "savings" ? "Cumulative Savings" : "Investment",
          ]}
        />
        <Legend />
        <Area type="monotone" dataKey="roi" stroke={colors[0]} fillOpacity={1} fill="url(#roiGradient)" name="ROI %" />
        <Area
          type="monotone"
          dataKey="savings"
          stroke={colors[1]}
          fillOpacity={1}
          fill="url(#savingsGradient)"
          name="Cumulative Savings"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// Security Posture Radar Chart
export const SecurityPostureRadar = ({ data, colors = CHART_COLORS.security }: AdvancedChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
        <PolarGrid gridType="polygon" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fontSize: 10 }}
          tickCount={6}
          axisLine={false}
          tickLine={false}
        />
        <Radar
          name="Portnox CLEAR"
          dataKey="portnox"
          stroke={colors[4]}
          fill={colors[4]}
          fillOpacity={0.3}
          strokeWidth={2}
          dot={{ fill: colors[4], strokeWidth: 2, r: 4 }}
        />
        <Radar
          name="Industry Average"
          dataKey="industry"
          stroke={colors[0]}
          fill={colors[0]}
          fillOpacity={0.1}
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
        />
        <Legend />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

// Risk Reduction Funnel Chart
export const RiskReductionFunnel = ({ data, colors = CHART_COLORS.risk }: AdvancedChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <FunnelChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          formatter={(value: number, name: string) => [`${value}%`, "Risk Reduction"]}
        />
        <Funnel dataKey="reduction" data={data} isAnimationActive>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  )
}

// Cost Breakdown Treemap
export const CostBreakdownTreemap = ({ data, colors = CHART_COLORS.primary }: AdvancedChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <Treemap
        data={data}
        dataKey="value"
        ratio={4 / 3}
        stroke="#fff"
        strokeWidth={2}
        content={({ root, depth, x, y, width, height, index, payload, colors: treeColors, name }) => {
          return (
            <g>
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                  fill: depth < 2 ? colors[index % colors.length] : "#fff",
                  stroke: "#fff",
                  strokeWidth: 2 / (depth + 1),
                  strokeOpacity: 1 / (depth + 1),
                }}
              />
              {depth === 1 ? (
                <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize="12">
                  {name}
                </text>
              ) : null}
              {depth === 1 ? (
                <text x={x + width / 2} y={y + height / 2 - 7} textAnchor="middle" fill="#fff" fontSize="16">
                  ${Math.round((payload?.value || 0) / 1000)}K
                </text>
              ) : null}
            </g>
          )
        }}
      />
    </ResponsiveContainer>
  )
}

// Vendor Comparison Scatter Plot
export const VendorComparisonScatter = ({ data, colors = CHART_COLORS.gradient }: AdvancedChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          type="number"
          dataKey="totalCost"
          name="Total Cost"
          unit="K"
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
        />
        <YAxis
          type="number"
          dataKey="securityScore"
          name="Security Score"
          unit=""
          tick={{ fontSize: 12 }}
          domain={[0, 100]}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          formatter={(value: number, name: string) => [
            name === "totalCost" ? `$${(value / 1000).toFixed(0)}K` : `${value}/100`,
            name === "totalCost" ? "Total Cost" : "Security Score",
          ]}
        />
        <Scatter name="Vendors" data={data} fill={colors[0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  )
}

// Deployment Timeline Gantt Chart (simplified)
export const DeploymentTimelineChart = ({ data, colors = CHART_COLORS.portnox }: AdvancedChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        layout="horizontal"
        data={data}
        margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
        barCategoryGap="20%"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis type="number" tick={{ fontSize: 12 }} />
        <YAxis dataKey="vendor" type="category" tick={{ fontSize: 12 }} width={90} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          formatter={(value: number) => [`${value} days`, "Deployment Time"]}
        />
        <Bar dataKey="deploymentDays" fill={colors[0]} radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// Compliance Coverage Pie Chart
export const ComplianceCoveragePie = ({ data, colors = CHART_COLORS.primary }: AdvancedChartProps) => {
  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    percent: number
    index: number
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize="12">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

// Export all chart components and utilities

// Chart data transformation utilities
export const transformTCOData = (results: any[]) => {
  return results.map((result) => ({
    vendor: result.vendorName || result.vendor || "Unknown",
    totalCost: result.totalCost || 0,
    licensing: result.costBreakdown?.licensing || 0,
    hardware: result.costBreakdown?.hardware || 0,
    services: result.costBreakdown?.services || 0,
    operations: result.costBreakdown?.operational || 0,
  }))
}

export const transformSecurityData = (results: any[]) => {
  return [
    { subject: "Threat Detection", portnox: 95, industry: 72 },
    { subject: "Zero Trust", portnox: 95, industry: 45 },
    { subject: "Compliance", portnox: 98, industry: 68 },
    { subject: "Automation", portnox: 92, industry: 35 },
    { subject: "Integration", portnox: 90, industry: 58 },
    { subject: "Scalability", portnox: 96, industry: 62 },
  ]
}

export const transformRiskData = (results: any[]) => {
  return [
    { category: "Breach Risk", reduction: 92, value: 920000 },
    { category: "Compliance Risk", reduction: 94, value: 470000 },
    { category: "Operational Risk", reduction: 86, value: 215000 },
    { category: "Reputation Risk", reduction: 85, value: 850000 },
  ]
}
