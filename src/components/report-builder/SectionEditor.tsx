"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Trash2, Copy } from "lucide-react"
import type { ReportSection, ChartConfig, TableConfig, MetricsConfig } from "@/types/report-builder"
import { availableDataSources } from "@/lib/report-builder/templates"

interface SectionEditorProps {
  section: ReportSection
  onUpdate: (updates: Partial<ReportSection>) => void
  onDelete: () => void
  onDuplicate: () => void
}

export const SectionEditor: React.FC<SectionEditorProps> = ({ section, onUpdate, onDelete, onDuplicate }) => {
  const [localSection, setLocalSection] = useState(section)

  const handleUpdate = (updates: Partial<ReportSection>) => {
    const newSection = { ...localSection, ...updates }
    setLocalSection(newSection)
    onUpdate(updates)
  }

  const renderTypeSpecificSettings = () => {
    switch (section.type) {
      case "chart":
        return <ChartSettings config={section.config as ChartConfig} onUpdate={handleUpdate} />
      case "table":
        return <TableSettings config={section.config as TableConfig} onUpdate={handleUpdate} />
      case "metrics":
        return <MetricsSettings config={section.config as MetricsConfig} onUpdate={handleUpdate} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Section Settings</h3>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost" onClick={onDuplicate} className="p-2">
            <Copy className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={onDelete} className="p-2 text-red-400 hover:text-red-300">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card className="bg-slate-700/50 border-slate-600">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-white flex items-center gap-2">
            <Settings className="w-4 h-4" />
            {section.title}
            <Badge variant="outline" className="text-xs ml-auto">
              {section.type}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-600">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Title
                </Label>
                <Input
                  id="title"
                  value={localSection.title}
                  onChange={(e) => handleUpdate({ title: e.target.value })}
                  className="bg-slate-600 border-slate-500 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={localSection.description || ""}
                  onChange={(e) => handleUpdate({ description: e.target.value })}
                  className="bg-slate-600 border-slate-500 text-white"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="visible" className="text-white">
                  Visible in Report
                </Label>
                <Switch
                  id="visible"
                  checked={localSection.isVisible}
                  onCheckedChange={(checked) => handleUpdate({ isVisible: checked })}
                />
              </div>
            </TabsContent>

            <TabsContent value="layout" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Width (columns)</Label>
                  <Slider
                    value={[localSection.size.width]}
                    onValueChange={([width]) => handleUpdate({ size: { ...localSection.size, width } })}
                    max={12}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-slate-400 text-center">{localSection.size.width} columns</div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Height (rows)</Label>
                  <Slider
                    value={[localSection.size.height]}
                    onValueChange={([height]) => handleUpdate({ size: { ...localSection.size, height } })}
                    max={12}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-slate-400 text-center">{localSection.size.height} rows</div>
                </div>
              </div>

              <Separator className="bg-slate-600" />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">X Position</Label>
                  <Input
                    type="number"
                    value={localSection.position.x}
                    onChange={(e) =>
                      handleUpdate({
                        position: { ...localSection.position, x: Number.parseInt(e.target.value) || 0 },
                      })
                    }
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Y Position</Label>
                  <Input
                    type="number"
                    value={localSection.position.y}
                    onChange={(e) =>
                      handleUpdate({
                        position: { ...localSection.position, y: Number.parseInt(e.target.value) || 0 },
                      })
                    }
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4 mt-4">
              {renderTypeSpecificSettings()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

const ChartSettings: React.FC<{
  config: ChartConfig
  onUpdate: (updates: Partial<ReportSection>) => void
}> = ({ config, onUpdate }) => {
  const handleConfigUpdate = (updates: Partial<ChartConfig>) => {
    onUpdate({ config: { ...config, ...updates } })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-white">Chart Type</Label>
        <Select value={config.chartType} onValueChange={(value) => handleConfigUpdate({ chartType: value as any })}>
          <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            <SelectItem value="bar">Bar Chart</SelectItem>
            <SelectItem value="line">Line Chart</SelectItem>
            <SelectItem value="pie">Pie Chart</SelectItem>
            <SelectItem value="radar">Radar Chart</SelectItem>
            <SelectItem value="area">Area Chart</SelectItem>
            <SelectItem value="scatter">Scatter Plot</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-white">Data Source</Label>
        <Select value={config.dataSource} onValueChange={(value) => handleConfigUpdate({ dataSource: value })}>
          <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            {availableDataSources.map((source) => (
              <SelectItem key={source.id} value={source.id}>
                {source.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-white">X Axis</Label>
          <Input
            value={config.xAxis || ""}
            onChange={(e) => handleConfigUpdate({ xAxis: e.target.value })}
            className="bg-slate-600 border-slate-500 text-white"
            placeholder="e.g., vendor"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Y Axis</Label>
          <Input
            value={config.yAxis || ""}
            onChange={(e) => handleConfigUpdate({ yAxis: e.target.value })}
            className="bg-slate-600 border-slate-500 text-white"
            placeholder="e.g., riskScore"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-white">Show Legend</Label>
        <Switch
          checked={config.showLegend}
          onCheckedChange={(checked) => handleConfigUpdate({ showLegend: checked })}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-white">Show Grid</Label>
        <Switch checked={config.showGrid} onCheckedChange={(checked) => handleConfigUpdate({ showGrid: checked })} />
      </div>
    </div>
  )
}

const TableSettings: React.FC<{
  config: TableConfig
  onUpdate: (updates: Partial<ReportSection>) => void
}> = ({ config, onUpdate }) => {
  const handleConfigUpdate = (updates: Partial<TableConfig>) => {
    onUpdate({ config: { ...config, ...updates } })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-white">Columns (comma-separated)</Label>
        <Textarea
          value={config.columns.join(", ")}
          onChange={(e) => handleConfigUpdate({ columns: e.target.value.split(",").map((col) => col.trim()) })}
          className="bg-slate-600 border-slate-500 text-white"
          rows={3}
          placeholder="vendor, riskScore, complianceGaps"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-white">Sort By</Label>
          <Input
            value={config.sortBy || ""}
            onChange={(e) => handleConfigUpdate({ sortBy: e.target.value })}
            className="bg-slate-600 border-slate-500 text-white"
            placeholder="e.g., riskScore"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Sort Order</Label>
          <Select
            value={config.sortOrder || "asc"}
            onValueChange={(value) => handleConfigUpdate({ sortOrder: value as "asc" | "desc" })}
          >
            <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-white">Show Pagination</Label>
        <Switch
          checked={config.showPagination}
          onCheckedChange={(checked) => handleConfigUpdate({ showPagination: checked })}
        />
      </div>

      {config.showPagination && (
        <div className="space-y-2">
          <Label className="text-white">Page Size</Label>
          <Slider
            value={[config.pageSize]}
            onValueChange={([pageSize]) => handleConfigUpdate({ pageSize })}
            max={50}
            min={5}
            step={5}
            className="w-full"
          />
          <div className="text-xs text-slate-400 text-center">{config.pageSize} rows per page</div>
        </div>
      )}
    </div>
  )
}

const MetricsSettings: React.FC<{
  config: MetricsConfig
  onUpdate: (updates: Partial<ReportSection>) => void
}> = ({ config, onUpdate }) => {
  const handleConfigUpdate = (updates: Partial<MetricsConfig>) => {
    onUpdate({ config: { ...config, ...updates } })
  }

  const availableMetrics = [
    "avgRiskScore",
    "totalGaps",
    "avgCostRisk",
    "highRiskVendors",
    "complianceCoverage",
    "securityScore",
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-white">Metrics to Display</Label>
        <div className="grid grid-cols-2 gap-2">
          {availableMetrics.map((metric) => (
            <div key={metric} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={metric}
                checked={config.metrics.includes(metric)}
                onChange={(e) => {
                  const newMetrics = e.target.checked
                    ? [...config.metrics, metric]
                    : config.metrics.filter((m) => m !== metric)
                  handleConfigUpdate({ metrics: newMetrics })
                }}
                className="rounded border-slate-500 bg-slate-600"
              />
              <Label htmlFor={metric} className="text-sm text-slate-300">
                {metric.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-white">Layout</Label>
        <Select value={config.layout} onValueChange={(value) => handleConfigUpdate({ layout: value as any })}>
          <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            <SelectItem value="horizontal">Horizontal</SelectItem>
            <SelectItem value="vertical">Vertical</SelectItem>
            <SelectItem value="grid">Grid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-white">Show Trends</Label>
        <Switch
          checked={config.showTrends}
          onCheckedChange={(checked) => handleConfigUpdate({ showTrends: checked })}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-white">Show Comparisons</Label>
        <Switch
          checked={config.showComparisons}
          onCheckedChange={(checked) => handleConfigUpdate({ showComparisons: checked })}
        />
      </div>
    </div>
  )
}
