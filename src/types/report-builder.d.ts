export interface ReportTemplate {
  id: string
  name: string
  description: string
  category: "executive" | "technical" | "compliance" | "custom"
  layout: "single-column" | "two-column" | "grid" | "custom"
  theme: "light" | "dark" | "corporate" | "modern"
  sections: ReportSection[]
  createdAt: string
  updatedAt: string
  author?: string
  tags?: string[]
}

export interface ReportSection {
  id: string
  type: "summary" | "chart" | "table" | "metrics" | "text" | "image" | "recommendations" | "gaps" | "trends"
  title: string
  description?: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  config: SectionConfig
  isVisible: boolean
  dependencies?: string[]
}

export type SectionConfig =
  | ChartConfig
  | TableConfig
  | MetricsConfig
  | TextConfig
  | ImageConfig
  | RecommendationsConfig
  | GapsConfig

export interface ChartConfig {
  chartType: "bar" | "line" | "pie" | "radar" | "area" | "scatter" | "treemap"
  dataSource: string
  xAxis?: string
  yAxis?: string
  groupBy?: string
  aggregation?: "sum" | "avg" | "count" | "max" | "min"
  showLegend: boolean
  showGrid: boolean
  colors?: string[]
  filters?: Record<string, any>
}

export interface TableConfig {
  dataSource: string
  columns: string[]
  sortBy?: string
  sortOrder?: "asc" | "desc"
  filters?: Record<string, any>
  showPagination: boolean
  pageSize: number
  showSearch: boolean
  exportable: boolean
}

export interface MetricsConfig {
  metrics: string[]
  layout: "horizontal" | "vertical" | "grid"
  showTrends: boolean
  showComparisons: boolean
  timeframe?: string
  aggregation?: "sum" | "avg" | "count"
}

export interface TextConfig {
  content: string
  format: "markdown" | "html" | "plain"
  fontSize?: "small" | "medium" | "large"
  alignment?: "left" | "center" | "right"
  style?: "normal" | "bold" | "italic"
}

export interface ImageConfig {
  src: string
  alt: string
  caption?: string
  size: "small" | "medium" | "large" | "full"
  alignment: "left" | "center" | "right"
}

export interface RecommendationsConfig {
  source: "ai" | "manual" | "template"
  categories: string[]
  priorityFilter?: "all" | "high" | "medium" | "low"
  maxItems?: number
  showImplementationSteps: boolean
  showCostBenefit: boolean
}

export interface GapsConfig {
  standardsFilter?: string[]
  riskLevelFilter?: "all" | "critical" | "high" | "medium" | "low"
  maxItems?: number
  showRemediationCost: boolean
  showTimeline: boolean
  groupByStandard: boolean
}

export interface DataSource {
  id: string
  name: string
  description: string
  fields: DataField[]
  category: "vendor" | "risk" | "compliance" | "financial" | "operational"
}

export interface DataField {
  id: string
  name: string
  type: "string" | "number" | "boolean" | "date" | "array" | "object"
  description?: string
  format?: string
}

export interface ReportExportOptions {
  format: "pdf" | "docx" | "html" | "json"
  includeCharts: boolean
  includeData: boolean
  template?: string
  watermark?: string
  headerFooter?: {
    header?: string
    footer?: string
  }
}
