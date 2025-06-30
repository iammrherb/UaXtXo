"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Activity,
  Plus,
  Settings,
  Save,
  Eye,
  Trash2,
  Copy,
  Edit,
  Grid,
  Layout,
  Move,
  Boxes,
  Download,
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// Widget Types
interface Widget {
  id: string
  type: string
  title: string
  size: "small" | "medium" | "large" | "xl"
  position: { x: number; y: number }
  config: Record<string, any>
  data?: any[]
}

interface DashboardLayout {
  id: string
  name: string
  description: string
  widgets: Widget[]
  createdAt: Date
  updatedAt: Date
}

// Sample data for widgets
const sampleTCOData = [
  { name: "Year 1", portnox: 25000, cisco: 75000, aruba: 58000 },
  { name: "Year 2", portnox: 15000, cisco: 45000, aruba: 35000 },
  { name: "Year 3", portnox: 15000, cisco: 45000, aruba: 35000 },
  { name: "Year 4", portnox: 15000, cisco: 45000, aruba: 35000 },
  { name: "Year 5", portnox: 15000, cisco: 45000, aruba: 35000 },
]

const sampleROIData = [
  { month: "Q1", roi: -25000, savings: 15000 },
  { month: "Q2", roi: -10000, savings: 35000 },
  { month: "Q3", roi: 15000, savings: 55000 },
  { month: "Q4", roi: 45000, savings: 75000 },
]

const sampleComplianceData = [
  { name: "SOX", score: 98 },
  { name: "PCI DSS", score: 96 },
  { name: "HIPAA", score: 94 },
  { name: "GDPR", score: 95 },
  { name: "ISO 27001", score: 97 },
]

// Widget Templates
const widgetTemplates = [
  {
    id: "kpi-card",
    name: "KPI Card",
    description: "Display key performance indicators",
    icon: <Target className="w-5 h-5" />,
    category: "metrics",
    defaultSize: "small" as const,
    config: {
      title: "Total Savings",
      value: "$450,000",
      subtitle: "5-year projection",
      trend: "up",
      color: "green",
    },
  },
  {
    id: "bar-chart",
    name: "Bar Chart",
    description: "Compare values across categories",
    icon: <BarChart3 className="w-5 h-5" />,
    category: "charts",
    defaultSize: "large" as const,
    config: {
      title: "TCO Comparison",
      dataKey: "value",
      xAxisKey: "name",
    },
  },
  {
    id: "line-chart",
    name: "Line Chart",
    description: "Show trends over time",
    icon: <LineChart className="w-5 h-5" />,
    category: "charts",
    defaultSize: "large" as const,
    config: {
      title: "ROI Timeline",
      dataKey: "roi",
      xAxisKey: "month",
    },
  },
  {
    id: "pie-chart",
    name: "Pie Chart",
    description: "Show proportional data",
    icon: <PieChart className="w-5 h-5" />,
    category: "charts",
    defaultSize: "medium" as const,
    config: {
      title: "Cost Breakdown",
      dataKey: "value",
      nameKey: "name",
    },
  },
  {
    id: "progress-widget",
    name: "Progress Widget",
    description: "Show completion or progress",
    icon: <Activity className="w-5 h-5" />,
    category: "metrics",
    defaultSize: "medium" as const,
    config: {
      title: "Implementation Progress",
      progress: 75,
      total: 100,
      color: "blue",
    },
  },
  {
    id: "table-widget",
    name: "Data Table",
    description: "Display tabular data",
    icon: <Grid className="w-5 h-5" />,
    category: "data",
    defaultSize: "xl" as const,
    config: {
      title: "Vendor Comparison",
      columns: ["Vendor", "Cost", "Features", "Rating"],
      showPagination: true,
    },
  },
  {
    id: "metric-grid",
    name: "Metrics Grid",
    description: "Multiple KPIs in a grid",
    icon: <Boxes className="w-5 h-5" />,
    category: "metrics",
    defaultSize: "large" as const,
    config: {
      title: "Key Metrics",
      metrics: [
        { label: "ROI", value: "180%", color: "green" },
        { label: "Savings", value: "$450K", color: "blue" },
        { label: "Risk Reduction", value: "85%", color: "purple" },
        { label: "Efficiency", value: "90%", color: "orange" },
      ],
    },
  },
  {
    id: "text-widget",
    name: "Text Widget",
    description: "Custom text and notes",
    icon: <Edit className="w-5 h-5" />,
    category: "content",
    defaultSize: "medium" as const,
    config: {
      title: "Executive Summary",
      content: "Add your custom content here...",
      fontSize: "medium",
    },
  },
]

// Sortable Widget Component
function SortableWidget({
  widget,
  onEdit,
  onDelete,
  onDuplicate,
}: {
  widget: Widget
  onEdit: (widget: Widget) => void
  onDelete: (id: string) => void
  onDuplicate: (widget: Widget) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: widget.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const getSizeClass = (size: string) => {
    switch (size) {
      case "small":
        return "col-span-1 row-span-1"
      case "medium":
        return "col-span-2 row-span-1"
      case "large":
        return "col-span-3 row-span-2"
      case "xl":
        return "col-span-4 row-span-2"
      default:
        return "col-span-2 row-span-1"
    }
  }

  const renderWidget = () => {
    switch (widget.type) {
      case "kpi-card":
        return (
          <Card className="h-full">
            <CardContent className="p-4 h-full flex flex-col justify-center">
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">{widget.config.title}</p>
                <p className="text-2xl font-bold text-green-600">{widget.config.value}</p>
                <p className="text-xs text-slate-500">{widget.config.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        )

      case "bar-chart":
        return (
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{widget.config.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sampleTCOData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Bar dataKey="portnox" fill="#3b82f6" />
                  <Bar dataKey="cisco" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      case "line-chart":
        return (
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{widget.config.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={sampleROIData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Line type="monotone" dataKey="roi" stroke="#3b82f6" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      case "pie-chart":
        return (
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{widget.config.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={sampleComplianceData} cx="50%" cy="50%" outerRadius={60} dataKey="score" nameKey="name">
                    {sampleComplianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      case "progress-widget":
        return (
          <Card className="h-full">
            <CardContent className="p-4 h-full flex flex-col justify-center">
              <div>
                <p className="text-sm font-medium mb-2">{widget.config.title}</p>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${widget.config.progress}%` }}></div>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {widget.config.progress}% of {widget.config.total}
                </p>
              </div>
            </CardContent>
          </Card>
        )

      case "metric-grid":
        return (
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{widget.config.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="grid grid-cols-2 gap-2 h-full">
                {widget.config.metrics.map((metric: any, index: number) => (
                  <div key={index} className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                    <p className="text-lg font-bold" style={{ color: `var(--${metric.color}-600)` }}>
                      {metric.value}
                    </p>
                    <p className="text-xs text-slate-600">{metric.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case "text-widget":
        return (
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{widget.config.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">{widget.config.content}</p>
            </CardContent>
          </Card>
        )

      default:
        return (
          <Card className="h-full">
            <CardContent className="p-4 h-full flex items-center justify-center">
              <p className="text-slate-400">Unknown widget type</p>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div ref={setNodeRef} style={style} className={`${getSizeClass(widget.size)} relative group`} {...attributes}>
      {renderWidget()}

      {/* Widget Controls */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex space-x-1">
          <Button size="sm" variant="outline" className="w-6 h-6 p-0 bg-transparent" {...listeners}>
            <Move className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="outline" className="w-6 h-6 p-0 bg-transparent" onClick={() => onEdit(widget)}>
            <Settings className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-6 h-6 p-0 bg-transparent"
            onClick={() => onDuplicate(widget)}
          >
            <Copy className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-6 h-6 p-0 bg-transparent"
            onClick={() => onDelete(widget.id)}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Widget Configuration Dialog
function WidgetConfigDialog({
  widget,
  open,
  onOpenChange,
  onSave,
}: {
  widget: Widget | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (widget: Widget) => void
}) {
  const [config, setConfig] = useState(widget?.config || {})

  React.useEffect(() => {
    if (widget) {
      setConfig(widget.config)
    }
  }, [widget])

  const handleSave = () => {
    if (widget) {
      onSave({ ...widget, config })
      onOpenChange(false)
    }
  }

  if (!widget) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configure Widget: {widget.title}</DialogTitle>
          <DialogDescription>Customize the appearance and behavior of your widget</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Widget Title</Label>
            <Input
              value={config.title || ""}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
              placeholder="Enter widget title"
            />
          </div>

          <div>
            <Label>Widget Size</Label>
            <Select value={widget.size} onValueChange={(size) => setConfig({ ...config, size })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (1x1)</SelectItem>
                <SelectItem value="medium">Medium (2x1)</SelectItem>
                <SelectItem value="large">Large (3x2)</SelectItem>
                <SelectItem value="xl">Extra Large (4x2)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Widget-specific configuration */}
          {widget.type === "kpi-card" && (
            <>
              <div>
                <Label>Value</Label>
                <Input
                  value={config.value || ""}
                  onChange={(e) => setConfig({ ...config, value: e.target.value })}
                  placeholder="$450,000"
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={config.subtitle || ""}
                  onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
                  placeholder="5-year projection"
                />
              </div>
              <div>
                <Label>Color Theme</Label>
                <Select value={config.color || "blue"} onValueChange={(color) => setConfig({ ...config, color })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {widget.type === "text-widget" && (
            <>
              <div>
                <Label>Content</Label>
                <Textarea
                  value={config.content || ""}
                  onChange={(e) => setConfig({ ...config, content: e.target.value })}
                  placeholder="Enter your content here..."
                  rows={4}
                />
              </div>
              <div>
                <Label>Font Size</Label>
                <Select
                  value={config.fontSize || "medium"}
                  onValueChange={(fontSize) => setConfig({ ...config, fontSize })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {widget.type === "progress-widget" && (
            <>
              <div>
                <Label>Progress Value: {config.progress || 0}%</Label>
                <Slider
                  value={[config.progress || 0]}
                  onValueChange={(value) => setConfig({ ...config, progress: value[0] })}
                  max={100}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Total Value</Label>
                <Input
                  type="number"
                  value={config.total || 100}
                  onChange={(e) => setConfig({ ...config, total: Number.parseInt(e.target.value) })}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function DashboardBuilder() {
  const [widgets, setWidgets] = useState<Widget[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null)
  const [configDialogOpen, setConfigDialogOpen] = useState(false)
  const [dashboardName, setDashboardName] = useState("My Custom Dashboard")
  const [savedLayouts, setSavedLayouts] = useState<DashboardLayout[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const filteredTemplates = useMemo(() => {
    if (selectedCategory === "all") return widgetTemplates
    return widgetTemplates.filter((template) => template.category === selectedCategory)
  }, [selectedCategory])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }

  const addWidget = (template: (typeof widgetTemplates)[0]) => {
    const newWidget: Widget = {
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: template.id,
      title: template.name,
      size: template.defaultSize,
      position: { x: 0, y: 0 },
      config: { ...template.config },
    }

    setWidgets((prev) => [...prev, newWidget])
  }

  const editWidget = (widget: Widget) => {
    setEditingWidget(widget)
    setConfigDialogOpen(true)
  }

  const saveWidget = (updatedWidget: Widget) => {
    setWidgets((prev) => prev.map((w) => (w.id === updatedWidget.id ? updatedWidget : w)))
  }

  const deleteWidget = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id))
  }

  const duplicateWidget = (widget: Widget) => {
    const newWidget: Widget = {
      ...widget,
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: `${widget.title} (Copy)`,
    }
    setWidgets((prev) => [...prev, newWidget])
  }

  const saveDashboard = () => {
    const layout: DashboardLayout = {
      id: `layout-${Date.now()}`,
      name: dashboardName,
      description: `Custom dashboard with ${widgets.length} widgets`,
      widgets: [...widgets],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setSavedLayouts((prev) => [...prev, layout])

    // In a real app, this would save to a backend
    localStorage.setItem("dashboard-layouts", JSON.stringify([...savedLayouts, layout]))
  }

  const loadDashboard = (layout: DashboardLayout) => {
    setWidgets(layout.widgets)
    setDashboardName(layout.name)
  }

  const clearDashboard = () => {
    setWidgets([])
  }

  const exportDashboard = () => {
    const dashboardData = {
      name: dashboardName,
      widgets: widgets,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(dashboardData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${dashboardName.toLowerCase().replace(/\s+/g, "-")}-dashboard.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Layout className="w-5 h-5 mr-2" />
                Custom Dashboard Builder
              </CardTitle>
              <CardDescription>Create personalized dashboard views with drag-and-drop widgets</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                value={dashboardName}
                onChange={(e) => setDashboardName(e.target.value)}
                placeholder="Dashboard name"
                className="w-48"
              />
              <Button variant="outline" onClick={saveDashboard}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={exportDashboard}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" onClick={clearDashboard}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Widget Library */}
        <div className="lg:col-span-1">
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm sticky top-24">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center">
                <Boxes className="w-5 h-5 mr-2" />
                Widget Library
              </CardTitle>
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Widgets</SelectItem>
                    <SelectItem value="metrics">Metrics</SelectItem>
                    <SelectItem value="charts">Charts</SelectItem>
                    <SelectItem value="data">Data</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 max-h-96 overflow-y-auto">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  onClick={() => addWidget(template)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                      {template.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{template.name}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{template.description}</p>
                    </div>
                    <Plus className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Canvas */}
        <div className="lg:col-span-3">
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>{dashboardName}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{widgets.length} widgets</Badge>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Saved Layouts
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Saved Dashboard Layouts</SheetTitle>
                        <SheetDescription>Load previously saved dashboard configurations</SheetDescription>
                      </SheetHeader>
                      <div className="space-y-4 mt-6">
                        {savedLayouts.map((layout) => (
                          <div
                            key={layout.id}
                            className="p-4 border rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
                            onClick={() => loadDashboard(layout)}
                          >
                            <h4 className="font-medium">{layout.name}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{layout.description}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              Created: {layout.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                        {savedLayouts.length === 0 && (
                          <p className="text-sm text-slate-500 text-center py-8">No saved layouts yet</p>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {widgets.length === 0 ? (
                <div className="h-96 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Layout className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
                      Start Building Your Dashboard
                    </h3>
                    <p className="text-sm text-slate-500">
                      Add widgets from the library to create your personalized dashboard
                    </p>
                  </div>
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <div className="grid grid-cols-4 gap-4 auto-rows-fr min-h-96">
                    <SortableContext items={widgets.map((w) => w.id)} strategy={rectSortingStrategy}>
                      {widgets.map((widget) => (
                        <SortableWidget
                          key={widget.id}
                          widget={widget}
                          onEdit={editWidget}
                          onDelete={deleteWidget}
                          onDuplicate={duplicateWidget}
                        />
                      ))}
                    </SortableContext>
                  </div>

                  <DragOverlay>
                    {activeId ? (
                      <div className="opacity-50">
                        <SortableWidget
                          widget={widgets.find((w) => w.id === activeId)!}
                          onEdit={() => {}}
                          onDelete={() => {}}
                          onDuplicate={() => {}}
                        />
                      </div>
                    ) : null}
                  </DragOverlay>
                </DndContext>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Widget Configuration Dialog */}
      <WidgetConfigDialog
        widget={editingWidget}
        open={configDialogOpen}
        onOpenChange={setConfigDialogOpen}
        onSave={saveWidget}
      />
    </div>
  )
}
