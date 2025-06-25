"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import Image from "next/image"
import { AllVendorData, getVendorLogoPath } from "@/lib/vendor-data"
import { compareVendors, type calculateVendorTCO } from "@/lib/tco-calculator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Legend as ReLegend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Download,
  Star,
  BarChart3,
  DollarSign,
  LayoutGrid,
  ShieldCheck,
  Settings2,
  Info,
  Filter,
  XCircle,
  HelpCircle,
  Settings,
  BarChartHorizontal,
  FileText,
  RouteIcon as Road,
  FilePieChart,
  AlertTriangle,
  Rocket,
  Users,
  Server,
  Wrench,
  GraduationCap,
  LifeBuoy,
  SlashIcon as EyeSlash,
  Calculator,
} from "lucide-react"
import type { JSX } from "react/jsx-runtime"

type CalculationResult = NonNullable<ReturnType<typeof calculateVendorTCO>> & { id?: string }

const VENDOR_IDS = Object.keys(AllVendorData)
const COMPLIANCE_FRAMEWORKS = ["SOC 2", "ISO 27001", "HIPAA", "GDPR", "PCI DSS", "NIST", "FedRAMP", "CMMC"]
const COLORS = [
  "#00D4AA",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#6B7280",
  "#FF6B35",
  "#06B6D4",
  "#10B981",
  "#EC4899",
  "#6366F1",
]

const initialOrgSizeDetails: Record<string, { devices: number; users: number }> = {
  startup: { devices: 100, users: 50 },
  smb: { devices: 500, users: 250 },
  medium: { devices: 2500, users: 1500 },
  enterprise: { devices: 10000, users: 7500 },
  xlarge: { devices: 50000, users: 35000 },
}

const TABS_CONFIG = [
  { value: "dashboard", label: "Executive Dashboard", icon: <BarChartHorizontal /> },
  { value: "cost-breakdown", label: "Detailed Costs", icon: <FilePieChart /> },
  { value: "roi-analysis", label: "ROI & Business Value", icon: <BarChart3 /> },
  { value: "vendor-comparison", label: "Feature Matrix", icon: <LayoutGrid /> },
  { value: "compliance", label: "Compliance & Risk", icon: <ShieldCheck /> },
  { value: "operations", label: "Operations Impact", icon: <Settings2 /> },
  { value: "roadmap", label: "Implementation Roadmap", icon: <Road /> },
  { value: "reports", label: "Reports", icon: <FileText /> },
]

export default function TcoAnalyzerUltimateV3() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])

  const [orgSizeKey, setOrgSizeKey] = useState("medium")
  const [customDevices, setCustomDevices] = useState(initialOrgSizeDetails.medium.devices)
  const [customUsers, setCustomUsers] = useState(initialOrgSizeDetails.medium.users)
  const [industry, setIndustry] = useState("technology")
  const [projectionYears, setProjectionYears] = useState(3)
  const [region, setRegion] = useState("north-america")
  const [portnoxBasePrice, setPortnoxBasePrice] = useState(4.0)
  const [portnoxAddons, setPortnoxAddons] = useState({ atp: false, compliance: false })

  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco", "aruba"])
  const [activeView, setActiveView] = useState("dashboard")

  const [results, setResults] = useState<CalculationResult[] | null>(null)
  const [calculationError, setCalculationError] = useState<string | null>(null)

  const currentDeviceCount = useMemo(
    () => (orgSizeKey === "custom" ? customDevices : initialOrgSizeDetails[orgSizeKey]?.devices || 2500),
    [orgSizeKey, customDevices],
  )
  const currentUsersCount = useMemo(
    () => (orgSizeKey === "custom" ? customUsers : initialOrgSizeDetails[orgSizeKey]?.users || 1500),
    [orgSizeKey, customUsers],
  )

  const handleCalculate = useCallback(() => {
    setCalculationError(null)
    try {
      const calculatedResults = compareVendors(
        selectedVendors,
        orgSizeKey,
        currentDeviceCount,
        currentUsersCount,
        industry,
        projectionYears,
        region,
        portnoxBasePrice,
        portnoxAddons,
      )
      setResults(calculatedResults as CalculationResult[])
    } catch (error) {
      console.error("Calculation error:", error)
      setCalculationError("Failed to calculate TCO. Please check inputs.")
      setResults(null)
    }
  }, [
    selectedVendors,
    orgSizeKey,
    currentDeviceCount,
    currentUsersCount,
    industry,
    projectionYears,
    region,
    portnoxBasePrice,
    portnoxAddons,
  ])

  useEffect(() => {
    if (selectedVendors.length > 0) {
      handleCalculate()
    } else {
      setResults(null)
    }
  }, [handleCalculate, selectedVendors.length])

  const handleVendorSelection = (vendorId: string) => {
    setSelectedVendors((prev) => {
      const isSelected = prev.includes(vendorId)
      if (vendorId === "portnox" && isSelected && prev.length === 1) return prev

      let newSelection
      if (isSelected) {
        newSelection = prev.filter((id) => id !== vendorId)
      } else {
        if (prev.length >= 6) {
          return prev
        }
        newSelection = [...prev, vendorId]
      }
      if (newSelection.includes("portnox")) {
        return ["portnox", ...newSelection.filter((id) => id !== "portnox")]
      }
      return newSelection
    })
  }

  const clearVendors = () => setSelectedVendors(["portnox"])
  const selectRecommended = () => setSelectedVendors(["portnox", "cisco", "aruba", "forescout"])

  const portnoxResult = useMemo(() => results?.find((r) => r?.vendor === "portnox"), [results])
  const competitors = useMemo(() => results?.filter((r) => r?.vendor !== "portnox") || [], [results])
  const lowestCompetitor = useMemo(
    () =>
      competitors.sort((a, b) => (a?.total ?? Number.POSITIVE_INFINITY) - (b?.total ?? Number.POSITIVE_INFINITY))[0],
    [competitors],
  )

  const totalSavingsVsLowestCompetitor = useMemo(() => {
    if (!portnoxResult || !lowestCompetitor) return 0
    return lowestCompetitor.total - portnoxResult.total
  }, [portnoxResult, lowestCompetitor])

  const savingsPercentVsLowestCompetitor = useMemo(() => {
    if (!portnoxResult || !lowestCompetitor || lowestCompetitor.total === 0) return 0
    return (totalSavingsVsLowestCompetitor / lowestCompetitor.total) * 100
  }, [totalSavingsVsLowestCompetitor, lowestCompetitor, portnoxResult])

  const renderView = () => {
    if (calculationError)
      return (
        <Card className="p-6 text-center text-destructive animate-fade-in">
          <AlertTriangle className="mx-auto h-8 w-8 mb-2" />
          {calculationError}
        </Card>
      )
    if (!results && activeView !== "dashboard")
      return (
        <Card className="p-6 text-center text-muted-foreground animate-fade-in">
          <Info className="mx-auto h-8 w-8 mb-2 text-portnox-primary" />
          Please select vendors and calculate TCO to see this view.
        </Card>
      )
    if (!isClient && (activeView === "dashboard" || activeView === "cost-breakdown"))
      return <Card className="p-6 text-center text-muted-foreground animate-fade-in">Loading charts...</Card>

    switch (activeView) {
      case "dashboard":
        return (
          <ExecutiveDashboardView
            results={results}
            years={projectionYears}
            savings={totalSavingsVsLowestCompetitor}
            savingsPercent={savingsPercentVsLowestCompetitor}
            portnoxResult={portnoxResult}
            lowestCompetitor={lowestCompetitor}
          />
        )
      case "cost-breakdown":
        return <DetailedCostsView results={results} years={projectionYears} />
      default:
        return (
          <Card className="p-6 text-center text-muted-foreground animate-fade-in">
            <Info className="mx-auto h-8 w-8 mb-2 text-portnox-primary" />
            View not implemented yet: {TABS_CONFIG.find((t) => t.value === activeView)?.label || activeView}
          </Card>
        )
    }
  }

  return (
    <TooltipProvider>
      <div className="platform-wrapper bg-background text-foreground min-h-screen flex flex-col font-sans">
        <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image
                src={getVendorLogoPath("portnox") || "/placeholder.svg"}
                alt="Portnox Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-lg font-bold font-display text-portnox-secondary">Total Cost Analyzer</h1>
                <p className="text-xs text-muted-foreground">Executive Decision Platform for Zero Trust NAC</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-portnox-primary">
                <HelpCircle className="h-4 w-4 mr-1" /> Help
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Export
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-portnox-primary">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="bg-secondary border-b border-border py-4 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 items-end">
            <div>
              <Label htmlFor="org-size" className="text-xs font-medium text-muted-foreground">
                Organization Size
              </Label>
              <Select value={orgSizeKey} onValueChange={setOrgSizeKey}>
                <SelectTrigger id="org-size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(initialOrgSizeDetails).map((key) => (
                    <SelectItem key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {orgSizeKey === "custom" && (
              <>
                <div>
                  <Label htmlFor="custom-devices" className="text-xs font-medium text-muted-foreground">
                    Number of Devices
                  </Label>
                  <Input
                    type="number"
                    id="custom-devices"
                    value={customDevices}
                    onChange={(e) => setCustomDevices(Math.max(10, Number.parseInt(e.target.value)))}
                    placeholder="e.g. 3000"
                  />
                </div>
                <div>
                  <Label htmlFor="custom-users" className="text-xs font-medium text-muted-foreground">
                    Number of Users
                  </Label>
                  <Input
                    type="number"
                    id="custom-users"
                    value={customUsers}
                    onChange={(e) => setCustomUsers(Math.max(10, Number.parseInt(e.target.value)))}
                    placeholder="e.g. 2000"
                  />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="industry" className="text-xs font-medium text-muted-foreground">
                Industry
              </Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger id="industry">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance & Banking</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="years" className="text-xs font-medium text-muted-foreground">
                Analysis Period
              </Label>
              <Select value={String(projectionYears)} onValueChange={(val) => setProjectionYears(Number.parseInt(val))}>
                <SelectTrigger id="years">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Year</SelectItem>
                  <SelectItem value="3">3 Years</SelectItem>
                  <SelectItem value="5">5 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="region" className="text-xs font-medium text-muted-foreground">
                Region
              </Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger id="region">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-card border-b border-border py-4 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-foreground">Select Vendors to Compare</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => {}} className="text-xs">
                  <Filter className="h-3 w-3 mr-1" /> Filter
                </Button>
                <Button variant="ghost" size="sm" onClick={clearVendors} className="text-xs">
                  <XCircle className="h-3 w-3 mr-1" /> Clear All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectRecommended}
                  className="text-xs border-portnox-primary text-portnox-primary hover:bg-portnox-primary/10"
                >
                  <Star className="h-3 w-3 mr-1 fill-portnox-primary" /> Recommended
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
              {VENDOR_IDS.map((vendorId) => {
                const vendor = AllVendorData[vendorId]
                const isSelected = selectedVendors.includes(vendorId)
                const isPortnox = vendorId === "portnox"
                return (
                  <Tooltip key={vendorId} delayDuration={200}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => handleVendorSelection(vendorId)}
                        className={`h-auto py-2 px-3 flex flex-col items-center justify-center transition-all duration-200 transform hover:scale-105
                        ${isSelected ? (isPortnox ? "bg-portnox-primary hover:bg-portnox-primary-dark text-primary-foreground shadow-lg ring-2 ring-portnox-primary-light" : "bg-portnox-secondary hover:bg-portnox-secondary-light text-secondary-foreground") : "bg-card hover:border-portnox-primary"}
                        ${isPortnox && !isSelected ? "border-portnox-primary/50 text-portnox-primary" : ""}
                      `}
                      >
                        <Image
                          src={getVendorLogoPath(vendorId) || "/placeholder.svg"}
                          alt={vendor.name}
                          width={isPortnox ? 60 : 50}
                          height={isPortnox ? 24 : 20}
                          className={`object-contain ${isPortnox ? "h-6" : "h-5"} mb-1.5 filter ${isSelected && !isPortnox ? "brightness-0 invert" : ""} ${!isSelected && isPortnox ? "" : ""}`}
                        />
                        <span
                          className={`text-[10px] font-medium truncate max-w-[80px] ${isSelected && isPortnox ? "text-primary-foreground" : isSelected ? "text-secondary-foreground" : "text-muted-foreground"}`}
                        >
                          {vendor.name}
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-popover text-popover-foreground text-xs p-2 rounded-md shadow-lg">
                      <p className="font-semibold">{vendor.name}</p>
                      <p>{vendor.category}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          </div>
        </div>

        <div className="bg-secondary border-b border-border py-3 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="portnox-price-slider"
                className="text-xs font-medium text-muted-foreground whitespace-nowrap"
              >
                Portnox Price/Device/Month:
              </Label>
              {isClient && (
                <Slider
                  id="portnox-price-slider"
                  min={1}
                  max={10}
                  step={0.1}
                  value={[portnoxBasePrice]}
                  onValueChange={(val) => setPortnoxBasePrice(val[0])}
                  className="w-32 sm:w-40"
                />
              )}
              <span className="text-sm font-semibold text-portnox-primary w-16 text-right">
                ${portnoxBasePrice.toFixed(2)}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex items-center space-x-1.5">
                <Checkbox
                  id="addon-atp"
                  checked={portnoxAddons.atp}
                  onCheckedChange={(checked) => setPortnoxAddons((prev) => ({ ...prev, atp: !!checked }))}
                />
                <Label htmlFor="addon-atp" className="text-xs text-muted-foreground">
                  Adv. Threat Protection
                </Label>
              </div>
              <div className="flex items-center space-x-1.5">
                <Checkbox
                  id="addon-compliance"
                  checked={portnoxAddons.compliance}
                  onCheckedChange={(checked) => setPortnoxAddons((prev) => ({ ...prev, compliance: !!checked }))}
                />
                <Label htmlFor="addon-compliance" className="text-xs text-muted-foreground">
                  Compliance Automation
                </Label>
              </div>
            </div>
          </div>
        </div>

        <nav className="bg-card border-b border-border sticky top-[61px] z-40">
          <div className="container mx-auto px-0 sm:px-4">
            <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
              <TabsList className="grid w-full grid-cols-4 sm:grid-cols-8 h-auto py-0 rounded-none border-none">
                {TABS_CONFIG.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex-col sm:flex-row h-14 sm:h-12 text-xs data-[state=active]:bg-background data-[state=active]:text-portnox-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-portnox-primary"
                  >
                    <div className="h-4 w-4 mr-0 mb-0.5 sm:mr-1.5 sm:mb-0">{tab.icon}</div>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="inline sm:hidden text-[10px] leading-tight mt-0.5">{tab.label.split(" ")[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </nav>

        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">{renderView()}</div>
        </main>

        <footer className="bg-secondary border-t border-border py-8 text-center">
          <div className="container mx-auto">
            <Image
              src={getVendorLogoPath("portnox") || "/placeholder.svg"}
              alt="Portnox Logo"
              width={120}
              height={30}
              className="mx-auto mb-4 h-8 w-auto"
            />
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Portnox. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">Results are estimates. Actual costs may vary.</p>
            <div className="mt-3 space-x-3">
              <Button variant="link" size="sm" className="text-xs text-muted-foreground hover:text-portnox-primary">
                Privacy Policy
              </Button>
              <Button variant="link" size="sm" className="text-xs text-muted-foreground hover:text-portnox-primary">
                Terms of Use
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}

const ExecutiveDashboardView = ({
  results,
  years,
  savings,
  savingsPercent,
  portnoxResult,
  lowestCompetitor,
}: {
  results: CalculationResult[] | null
  years: number
  savings: number
  savingsPercent: number
  portnoxResult: CalculationResult | null | undefined
  lowestCompetitor: CalculationResult | null | undefined
}) => {
  if (!results || !portnoxResult)
    return (
      <Card className="p-6 text-center text-muted-foreground animate-fade-in">
        <Info className="mx-auto h-8 w-8 mb-2 text-portnox-primary" />
        Select vendors and calculate TCO to see the Executive Dashboard.
      </Card>
    )

  const keyMetrics = [
    {
      label: "Total Savings",
      value: `$${Math.round(Math.abs(savings) / 1000).toLocaleString()}K`,
      detail: `vs. ${lowestCompetitor?.vendorName || "Competitor"}`,
      icon: <DollarSign />,
    },
    {
      label: "Cost Reduction",
      value: `${Math.abs(savingsPercent).toFixed(0)}%`,
      detail: "Lower TCO",
      icon: <BarChart3 />,
    },
    {
      label: "Months to ROI",
      value: `${portnoxResult.roi?.paybackMonths?.toFixed(0) || "N/A"}`,
      detail: "Portnox Payback",
      icon: <Rocket />,
    },
    {
      label: "ROI Percentage",
      value: `${portnoxResult.roi?.percentage?.toFixed(0) || 0}%`,
      detail: "Portnox ROI",
      icon: <BarChartHorizontal />,
    },
  ]

  const costCategoriesForBreakdown = ["Software", "Hardware", "Implementation", "Operations", "Hidden"]

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-r from-portnox-secondary to-portnox-secondary-light text-primary-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Executive Summary</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Key financial and operational highlights for Portnox.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {keyMetrics.map((metric) => (
            <div key={metric.label} className="bg-black/10 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-portnox-primary">{metric.value}</div>
              <div className="text-sm font-medium mt-1">{metric.label}</div>
              <div className="text-xs text-primary-foreground/70">{metric.detail}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Total Cost of Ownership ({years}-Year)</CardTitle>
            <CardDescription>Comparison of total costs for selected vendors.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ReBarChart data={results} layout="vertical" margin={{ right: 30 }}>
                <XAxis
                  type="number"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <YAxis
                  type="category"
                  dataKey="vendorName"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  width={80}
                  interval={0}
                />
                <ReTooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Total TCO"]}
                />
                <Bar dataKey="total" radius={[0, 4, 4, 0]} barSize={20}>
                  {results.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.vendor === "portnox" ? "hsl(var(--primary))" : COLORS[(index + 1) % COLORS.length]}
                    />
                  ))}
                </Bar>
              </ReBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portnox Cost Breakdown</CardTitle>
            <CardDescription>{years}-Year TCO components for Portnox.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={portnoxResult.breakdown?.filter((b) => costCategoriesForBreakdown.includes(b.name))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                    const RADIAN = Math.PI / 180
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
                    const x = cx + (radius + 10) * Math.cos(-midAngle * RADIAN)
                    const y = cy + (radius + 10) * Math.sin(-midAngle * RADIAN)
                    return percent * 100 > 3 ? (
                      <text
                        x={x}
                        y={y}
                        fill="hsl(var(--foreground))"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                        fontSize="10px"
                      >
                        {`${name} (${(percent * 100).toFixed(0)}%)`}
                      </text>
                    ) : null
                  }}
                >
                  {portnoxResult.breakdown
                    ?.filter((b) => costCategoriesForBreakdown.includes(b.name))
                    .map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <ReTooltip formatter={(value: number, name) => [`$${value.toLocaleString()}`, name]} />
                <ReLegend
                  wrapperStyle={{ fontSize: "10px", marginTop: "10px" }}
                  layout="vertical"
                  align="center"
                  verticalAlign="bottom"
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const DetailedCostsView = ({ results, years }: { results: CalculationResult[] | null; years: number }) => {
  if (!results)
    return (
      <Card className="p-6 text-center text-muted-foreground animate-fade-in">
        <Info className="mx-auto h-8 w-8 mb-2 text-portnox-primary" />
        Calculate TCO to see Detailed Costs.
      </Card>
    )

  const costCategories = ["Software", "Hardware", "Implementation", "Training", "Support", "Operations", "Hidden"]
  const categoryIcons: Record<string, JSX.Element> = {
    Software: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    Hardware: <Server className="h-4 w-4 text-muted-foreground" />,
    Implementation: <Wrench className="h-4 w-4 text-muted-foreground" />,
    Training: <GraduationCap className="h-4 w-4 text-muted-foreground" />,
    Support: <LifeBuoy className="h-4 w-4 text-muted-foreground" />,
    Operations: <Users className="h-4 w-4 text-muted-foreground" />,
    Hidden: <EyeSlash className="h-4 w-4 text-muted-foreground" />,
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Detailed Cost Comparison Matrix ({years}-Year)</CardTitle>
          <CardDescription>Side-by-side breakdown of cost components for each selected vendor.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-semibold text-muted-foreground">Cost Category</th>
                  {results.map((res) => (
                    <th key={res.vendor} className="py-3 px-4 text-right font-semibold text-muted-foreground">
                      <div className="flex items-center justify-end gap-2">
                        <Image
                          src={getVendorLogoPath(res.vendor) || "/placeholder.svg"}
                          alt={res.vendorName}
                          width={20}
                          height={20}
                          className="h-5 w-auto object-contain"
                        />
                        {res.vendorName}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {costCategories.map((category) => (
                  <tr key={category} className="border-b last:border-b-0 hover:bg-muted/50">
                    <td className="py-3 px-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        {categoryIcons[category]}
                        {category}
                      </div>
                    </td>
                    {results.map((res) => {
                      const costItem = res.breakdown?.find((b) => b.name === category)
                      const costValue = costItem?.value || 0
                      return (
                        <td key={`${res.vendor}-${category}`} className="py-3 px-4 text-right font-mono">
                          ${costValue.toLocaleString()}
                        </td>
                      )
                    })}
                  </tr>
                ))}
                <tr className="bg-secondary font-semibold">
                  <td className="py-3 px-4 text-foreground">
                    <div className="flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-portnox-primary" />
                      TOTAL TCO
                    </div>
                  </td>
                  {results.map((res) => (
                    <td
                      key={`${res.vendor}-total`}
                      className={`py-3 px-4 text-right font-mono ${res.vendor === "portnox" ? "text-portnox-primary" : "text-foreground"}`}
                    >
                      ${res.total.toLocaleString()}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
