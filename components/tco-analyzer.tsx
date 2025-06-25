"use client"

import React from "react"

import { useState, useMemo, useEffect, useCallback } from "react"
import Image from "next/image"
import { AllVendorData, getVendorLogoPath } from "@/lib/vendor-data" // Added VendorData type
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
import { Badge } from "@/components/ui/badge" // Added Badge import
import {
  BarChart as ReBarChart, // Renamed to avoid conflict if another BarChart is imported
  Bar,
  XAxis,
  YAxis,
  CartesianGrid, // Added CartesianGrid
  Tooltip as ReTooltip, // Renamed
  Legend as ReLegend, // Renamed
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart, // Added RadarChart
  PolarGrid, // Added PolarGrid
  PolarAngleAxis, // Added PolarAngleAxis
  PolarRadiusAxis, // Added PolarRadiusAxis
  Radar, // Added Radar
} from "recharts"
import {
  Download,
  Star,
  BarChart3,
  DollarSign,
  LayoutGrid,
  ShieldCheck,
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
  FileCheck,
  Cpu,
  Check,
  Activity,
  SlidersHorizontal,
  Clock,
  Shield,
  Zap,
  TrendingUp,
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
  { value: "compliance", label: "Compliance & Risk", icon: <ShieldCheck /> },
  { value: "operations", label: "Operations Impact", icon: <SlidersHorizontal /> },
  { value: "vendor-comparison", label: "Feature Matrix", icon: <LayoutGrid /> },
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
    if (!results && !["dashboard", "reports"].includes(activeView))
      // Allow reports view even without results
      return (
        <Card className="p-6 text-center text-muted-foreground animate-fade-in">
          <Info className="mx-auto h-8 w-8 mb-2 text-portnox-primary" />
          Please select vendors and calculate TCO to see this view.
        </Card>
      )
    if (
      !isClient &&
      ["dashboard", "cost-breakdown", "compliance", "operations", "vendor-comparison", "roadmap"].includes(activeView)
    )
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
      case "compliance":
        return <ComplianceRiskView results={results} industry={industry} selectedVendors={selectedVendors} />
      case "operations":
        return (
          <OperationsImpactView
            results={results}
            currentDeviceCount={currentDeviceCount}
            currentUsersCount={currentUsersCount}
            region={region}
          />
        )
      case "vendor-comparison": // Assuming this maps to FeatureComparison
        const safeResults = results || []
        const featureData = safeResults.map((r) => ({
          id: r.vendor,
          name: r.vendorName,
          features: AllVendorData[r.vendor]?.features?.core || {}, // Adjust if features are nested differently
          logo: AllVendorData[r.vendor]?.logo,
        }))
        return <FeatureComparison data={featureData} />
      case "roadmap":
        return (
          <ImplementationRoadmapView
            selectedVendor={selectedVendors[0] || "portnox"}
            deviceCount={currentDeviceCount}
            userCount={currentUsersCount}
          />
        )
      case "reports":
        const reportConfig = {
          orgSize: orgSizeKey,
          devices: currentDeviceCount,
          users: currentUsersCount,
          industry: industry,
          years: projectionYears,
          region: region,
          selectedVendors: selectedVendors,
          portnoxBasePrice: portnoxBasePrice,
          portnoxAddons: portnoxAddons,
        }
        return <ReportsView results={results} config={reportConfig} />
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

// --- NEW VIEWS START ---
const ComplianceRiskView = ({
  results,
  industry,
  selectedVendors,
}: {
  results: CalculationResult[] | null
  industry: string
  selectedVendors: string[]
}) => {
  const frameworks = [
    { id: "soc2", name: "SOC 2", critical: ["technology", "saas"] },
    { id: "iso27001", name: "ISO 27001", critical: ["all"] },
    { id: "hipaa", name: "HIPAA", critical: ["healthcare"] },
    { id: "pci-dss", name: "PCI DSS", critical: ["retail", "finance"] },
    { id: "gdpr", name: "GDPR", critical: ["all"] },
    { id: "nist", name: "NIST CSF", critical: ["government", "critical-infrastructure"] },
    { id: "fedramp", name: "FedRAMP", critical: ["government"] },
    { id: "cmmc", name: "CMMC", critical: ["defense", "government"] },
  ]

  // This data should ideally come from AllVendorData or be calculated
  const vendorCompliance: Record<string, Record<string, { status: string; automation: number }>> = {
    portnox: {
      soc2: { status: "certified", automation: 95 },
      iso27001: { status: "certified", automation: 90 },
      hipaa: { status: "compliant", automation: 85 },
      "pci-dss": { status: "compliant", automation: 80 },
      gdpr: { status: "compliant", automation: 90 },
      nist: { status: "aligned", automation: 85 },
      fedramp: { status: "in-process", automation: 70 },
      cmmc: { status: "aligned", automation: 75 },
    },
    cisco: {
      soc2: { status: "certified", automation: 60 },
      iso27001: { status: "certified", automation: 65 },
      hipaa: { status: "compliant", automation: 55 },
      "pci-dss": { status: "compliant", automation: 50 },
      gdpr: { status: "compliant", automation: 60 },
      nist: { status: "aligned", automation: 65 },
      fedramp: { status: "certified", automation: 70 },
      cmmc: { status: "aligned", automation: 60 },
    },
    aruba: {
      soc2: { status: "partial", automation: 40 },
      iso27001: { status: "certified", automation: 45 },
      hipaa: { status: "partial", automation: 35 },
      "pci-dss": { status: "partial", automation: 30 },
      gdpr: { status: "partial", automation: 40 },
      nist: { status: "partial", automation: 45 },
      fedramp: { status: "none", automation: 0 },
      cmmc: { status: "none", automation: 0 },
    },
    // Add other vendors as needed or fetch dynamically
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; text: string }> = {
      certified: { color: "default", text: "Certified" },
      compliant: { color: "default", text: "Compliant" },
      aligned: { color: "secondary", text: "Aligned" },
      "in-process": { color: "outline", text: "In Process" },
      partial: { color: "outline", text: "Partial" },
      none: { color: "destructive", text: "Not Supported" },
    }
    const variant = variants[status] || variants.none
    return <Badge variant={variant.color as any}>{variant.text}</Badge>
  }

  const displayVendors = selectedVendors.slice(0, 3)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-3">
        {displayVendors.map((vendorId) => {
          const vendor = AllVendorData[vendorId]
          const complianceData = vendorCompliance[vendorId] || {}
          const scores = Object.values(complianceData).map((c: any) => c.automation || 0)
          const avgAutomation = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0

          return (
            <Card key={vendorId}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{vendor?.name}</CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgAutomation}%</div>
                <p className="text-xs text-muted-foreground">Avg. Compliance Automation</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Framework Compliance Matrix</CardTitle>
          <CardDescription>
            Certification status and automation capabilities by framework for top 3 selected vendors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Framework</th>
                  <th className="text-center py-3 px-4">Industry Relevance</th>
                  {displayVendors.map((vendorId) => (
                    <th key={vendorId} className="text-center py-3 px-4" colSpan={2}>
                      {AllVendorData[vendorId]?.name}
                    </th>
                  ))}
                </tr>
                <tr className="border-b text-sm text-muted-foreground">
                  <th></th>
                  <th></th>
                  {displayVendors.map((vendorId) => (
                    <React.Fragment key={`${vendorId}-header`}>
                      <th className="text-center py-2 px-2 font-normal">Status</th>
                      <th className="text-center py-2 px-2 font-normal">Auto %</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {frameworks.map((framework) => {
                  const isRelevant = framework.critical.includes("all") || framework.critical.includes(industry)

                  return (
                    <tr key={framework.id} className={`border-b ${isRelevant ? "bg-primary/5" : ""}`}>
                      <td className="py-3 px-4 font-medium">{framework.name}</td>
                      <td className="py-3 px-4 text-center">
                        {isRelevant && <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mx-auto" />}
                      </td>
                      {displayVendors.map((vendorId) => {
                        const compliance = vendorCompliance[vendorId]?.[framework.id] || {
                          status: "none",
                          automation: 0,
                        }
                        return (
                          <React.Fragment key={`${vendorId}-${framework.id}`}>
                            <td className="py-3 px-2 text-center">{getStatusBadge(compliance.status)}</td>
                            <td className="py-3 px-2 text-center">
                              <span className={compliance.automation >= 70 ? "text-green-600 font-medium" : ""}>
                                {compliance.automation}%
                              </span>
                            </td>
                          </React.Fragment>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Risk Assessment</CardTitle>
          <CardDescription>Comparative risk reduction capabilities for top 3 selected vendors.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ReBarChart
              data={results
                ?.filter((r) => displayVendors.includes(r.vendor))
                .map((r) => ({
                  vendor: r.vendorName,
                  "Breach Risk Reduction": r.roi?.breachReduction || 0,
                  "Compliance Automation": vendorCompliance[r.vendor]?.soc2?.automation || 0, // Example, adjust as needed
                  "Incident Response":
                    r.vendor === "portnox" ? 95 : AllVendorData[r.vendor]?.type === "cloud-native" ? 70 : 50, // Example
                }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vendor" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <ReTooltip formatter={(value: number) => `${value.toFixed(0)}%`} />
              <ReLegend />
              <Bar dataKey="Breach Risk Reduction" fill="#00D4AA" />
              <Bar dataKey="Compliance Automation" fill="#3B82F6" />
              <Bar dataKey="Incident Response" fill="#F59E0B" />
            </ReBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

const OperationsImpactView = ({
  results,
  currentDeviceCount,
  currentUsersCount,
  region,
}: {
  results: CalculationResult[] | null
  currentDeviceCount: number
  currentUsersCount: number
  region: string
}) => {
  if (!results)
    return (
      <Card className="p-6 text-center text-muted-foreground animate-fade-in">
        <Info className="mx-auto h-8 w-8 mb-2 text-portnox-primary" />
        Calculate TCO to see Operations Impact.
      </Card>
    )

  const operationalMetrics = results.map((result) => {
    const vendor = AllVendorData[result.vendor]
    const deploymentHours =
      vendor?.implementation?.deploymentTime?.fullDeployment || (vendor?.type === "on-premise" ? 720 : 48) // Default to 720h (30d) for on-prem, 48h (2d) for others
    const requiredFTE = vendor?.implementation?.requiredResources?.internal || (vendor?.type === "on-premise" ? 2 : 0.5)

    return {
      vendor: result.vendorName,
      vendorId: result.vendor,
      deploymentDays: Math.ceil(deploymentHours / 24),
      requiredFTE, // Initial setup FTE
      maintenanceFTE:
        result.vendor === "portnox"
          ? 0.1
          : vendor?.type === "cloud-native"
            ? 0.5
            : vendor?.type === "on-premise"
              ? 2.0
              : 1.0,
      mttr:
        result.vendor === "portnox"
          ? 15
          : vendor?.type === "cloud-native"
            ? 60
            : vendor?.type === "on-premise"
              ? 240
              : 120, // minutes
      automation:
        result.vendor === "portnox"
          ? 95
          : vendor?.type === "cloud-native"
            ? 75
            : vendor?.type === "on-premise"
              ? 40
              : 60, // percentage
      uptime:
        result.vendor === "portnox"
          ? 99.99
          : vendor?.type === "cloud-native"
            ? 99.9
            : vendor?.type === "on-premise"
              ? 99.5
              : 99.7, // percentage
    }
  })
  const displayMetrics = operationalMetrics.slice(0, 3)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deployment Time</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-portnox-primary">
              {operationalMetrics.find((m) => m.vendorId === "portnox")?.deploymentDays || 0} days
            </div>
            <p className="text-xs text-muted-foreground">Portnox deployment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FTE Required</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {operationalMetrics.find((m) => m.vendorId === "portnox")?.maintenanceFTE || 0}
            </div>
            <p className="text-xs text-muted-foreground">Portnox ongoing maintenance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MTTR</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {operationalMetrics.find((m) => m.vendorId === "portnox")?.mttr || 0} min
            </div>
            <p className="text-xs text-muted-foreground">Portnox mean time to resolve</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automation</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {operationalMetrics.find((m) => m.vendorId === "portnox")?.automation || 0}%
            </div>
            <p className="text-xs text-muted-foreground">Portnox task automation rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Deployment & Maintenance Comparison</CardTitle>
            <CardDescription>Initial setup (days) and ongoing FTE requirements for top 3 vendors.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ReBarChart data={displayMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis />
                <ReTooltip />
                <ReLegend />
                <Bar dataKey="deploymentDays" name="Deployment (days)" fill="#00D4AA" />
                <Bar dataKey="maintenanceFTE" name="Maintenance FTE" fill="#3B82F6" />
              </ReBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational Excellence Metrics</CardTitle>
            <CardDescription>Automation and Uptime percentages for top 3 vendors.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={displayMetrics.map((m) => ({ ...m, uptimeDisplay: m.uptime - 90 }))}>
                {" "}
                {/* Adjusting uptime for better radar display */}
                <PolarGrid />
                <PolarAngleAxis dataKey="vendor" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Automation %" dataKey="automation" stroke="#00D4AA" fill="#00D4AA" fillOpacity={0.3} />
                <Radar
                  name="Uptime % (Adjusted)"
                  dataKey="uptimeDisplay"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                />
                <ReTooltip
                  formatter={(value, name) =>
                    name === "Uptime % (Adjusted)" ? `${(value + 90).toFixed(2)}%` : `${value}%`
                  }
                />
                <ReLegend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const ImplementationRoadmapView = ({
  selectedVendor,
  deviceCount,
  userCount,
}: {
  selectedVendor: string
  deviceCount: number
  userCount: number
}) => {
  const vendor = AllVendorData[selectedVendor] || AllVendorData["portnox"]

  const phases = [
    {
      name: "Planning & Assessment",
      duration: vendor.id === "portnox" ? 5 : vendor.type === "on-premise" ? 15 : 10,
      tasks: [
        "Current state network & security assessment",
        "Define Zero Trust NAC objectives & scope",
        "Identify key stakeholders & resources",
        "Develop high-level architecture design",
        "Vendor solution deep-dive & PoC planning",
      ],
    },
    {
      name: "Pilot / Proof of Concept (PoC)",
      duration: vendor.id === "portnox" ? 5 : vendor.type === "on-premise" ? 20 : 15,
      tasks: [
        "Setup isolated PoC environment",
        "Test core NAC functionalities (visibility, control)",
        "Validate critical integrations (IAM, SIEM)",
        "User acceptance testing (UAT) with pilot group",
        "Refine policies & configurations based on PoC",
      ],
    },
    {
      name: "Phased Deployment",
      duration: vendor.id === "portnox" ? 20 : vendor.type === "on-premise" ? 60 : 40,
      tasks: [
        "Production environment preparation & hardening",
        "Initial rollout to non-critical segments/user groups",
        "Iterative policy deployment & refinement",
        "User communication & training sessions",
        "Monitor performance & address issues",
      ],
    },
    {
      name: "Full Production & Go-Live",
      duration: vendor.id === "portnox" ? 10 : vendor.type === "on-premise" ? 30 : 20,
      tasks: [
        "Complete rollout to all devices & users",
        "Decommission legacy NAC (if applicable)",
        "Finalize operational runbooks & documentation",
        "Conduct post-implementation review",
        "Transition to ongoing operations & support",
      ],
    },
    {
      name: "Optimization & Maturity",
      duration: 30, // Ongoing
      tasks: [
        "Enable advanced security features (e.g., microsegmentation)",
        "Integrate with SOAR & other security tools",
        "Automate compliance reporting & evidence collection",
        "Regularly review & update NAC policies",
        "Measure ROI & business value achieved",
      ],
    },
  ]

  const totalDays = phases.slice(0, 4).reduce((sum, phase) => sum + phase.duration, 0) // Exclude ongoing optimization

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDays} days</div>
            <p className="text-xs text-muted-foreground">To full production for {vendor.name}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time to Value (PoC)</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{phases[0].duration + phases[1].duration} days</div>
            <p className="text-xs text-muted-foreground">To PoC completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devices/Day (Rollout)</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(deviceCount / (phases[2].duration + phases[3].duration)) || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Avg. migration velocity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${vendor.id === "portnox" ? "text-green-600" : vendor.type === "cloud-native" ? "text-yellow-500" : "text-orange-500"}`}
            >
              {vendor.id === "portnox" ? "Low" : vendor.type === "cloud-native" ? "Medium-Low" : "Medium"}
            </div>
            <p className="text-xs text-muted-foreground">Implementation complexity</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{vendor.name} Implementation Timeline</CardTitle>
          <CardDescription>
            Phase-by-phase breakdown for {deviceCount.toLocaleString()} devices and {userCount.toLocaleString()} users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {phases.map((phase, index) => {
              const startDay = phases.slice(0, index).reduce((sum, p) => sum + p.duration, 0)
              const endDay = startDay + phase.duration
              const progress = (phase.duration / totalDays) * 100

              return (
                <div key={phase.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">
                        {index + 1}. {phase.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {phase.name !== "Optimization & Maturity"
                          ? `Days ${startDay + 1} - ${endDay} (${phase.duration} days)`
                          : `Ongoing (${phase.duration} days initial focus)`}
                      </p>
                    </div>
                    <Badge variant={index < 2 ? "default" : index < 4 ? "secondary" : "outline"}>
                      {index === 0
                        ? "Planning"
                        : index === 1
                          ? "Testing/PoC"
                          : index < 4
                            ? "Deployment"
                            : "Optimization"}
                    </Badge>
                  </div>
                  {phase.name !== "Optimization & Maturity" && (
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div
                        className="bg-portnox-primary h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                  <div className="pl-4 pt-2">
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      {phase.tasks.map((task) => (
                        <li key={task} className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const ReportsView = ({
  results,
  config,
}: {
  results: CalculationResult[] | null
  config: any // This will be the specific config object passed from TcoAnalyzerUltimateV3
}) => {
  const reportTemplates = [
    {
      id: "executive-summary",
      name: "Executive Summary Report",
      description: "High-level overview of TCO, ROI, and key recommendations for leadership.",
      pages: 1,
      icon: <BarChart3 className="h-5 w-5 text-portnox-primary" />,
    },
    {
      id: "detailed-tco-analysis",
      name: "Detailed TCO Analysis",
      description: "Comprehensive cost breakdown, vendor comparison, and financial projections.",
      pages: 8,
      icon: <DollarSign className="h-5 w-5 text-portnox-primary" />,
    },
    {
      id: "roi-business-case",
      name: "ROI & Business Case Justification",
      description: "In-depth analysis of return on investment, payback period, and strategic benefits.",
      pages: 5,
      icon: <TrendingUp className="h-5 w-5 text-portnox-primary" />,
    },
    {
      id: "compliance-risk-assessment",
      name: "Compliance & Risk Assessment",
      description: "Framework alignment, risk exposure, and mitigation strategies.",
      pages: 12,
      icon: <Shield className="h-5 w-5 text-portnox-primary" />,
    },
    {
      id: "implementation-strategy",
      name: "Implementation Strategy & Roadmap",
      description: "Phased plan, timelines, resource allocation, and key milestones.",
      pages: 6,
      icon: <Road className="h-5 w-5 text-portnox-primary" />,
    },
  ]

  const handleExport = (format: string, reportId: string) => {
    alert(`Exporting ${reportId} as ${format.toUpperCase()}... (Feature not yet implemented)`)
    // In a real app, you'd trigger a download or API call here.
    // Example: window.open(`/api/reports?format=${format}&reportId=${reportId}&config=${JSON.stringify(config)}`, '_blank');
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Generate & Export Reports</CardTitle>
          <CardDescription>
            Create tailored reports based on your current analysis for stakeholders and decision-makers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg mt-1">{template.icon}</div>
                    <div>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">{template.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-xs text-muted-foreground mb-3">
                    Est. {template.pages} pages. Includes data for {config.selectedVendors.length} selected vendor(s).
                  </p>
                </CardContent>
                <div className="p-4 border-t flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleExport("pdf", template.id)}
                    className="text-xs"
                  >
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    PDF
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleExport("pptx", template.id)}
                    className="text-xs"
                  >
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    PPTX
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Report Configuration</CardTitle>
          <CardDescription>These parameters will be used for generating reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-x-8 gap-y-4 md:grid-cols-2 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-primary">Organization Profile</h4>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size Category:</span>{" "}
                  <span className="font-medium">{config.orgSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Device Count:</span>{" "}
                  <span className="font-medium">{config.devices?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">User Count:</span>{" "}
                  <span className="font-medium">{config.users?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Industry:</span>{" "}
                  <span className="font-medium capitalize">{config.industry}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-primary">Analysis Scope</h4>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Analysis Period:</span>{" "}
                  <span className="font-medium">{config.years} Year(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Region:</span>{" "}
                  <span className="font-medium capitalize">{config.region?.replace("-", " ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vendors Compared:</span>{" "}
                  <span className="font-medium">{config.selectedVendors?.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Portnox Base Price:</span>{" "}
                  <span className="font-medium">${config.portnoxBasePrice?.toFixed(2)}/device/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Portnox Add-ons:</span>
                  <span className="font-medium">
                    {config.portnoxAddons?.atp ? "ATP " : ""}
                    {config.portnoxAddons?.compliance ? "Compliance" : ""}
                    {!config.portnoxAddons?.atp && !config.portnoxAddons?.compliance ? "None" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-6 text-center">
            Report generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Feature Comparison View (Placeholder - assuming it might be different from vendor-comparison)
const FeatureComparison = ({
  data,
}: { data: { id: string; name: string; features: Record<string, any>; logo?: string }[] }) => {
  if (!data || data.length === 0) {
    return (
      <Card className="p-6 text-center text-muted-foreground animate-fade-in">
        <Info className="mx-auto h-8 w-8 mb-2 text-portnox-primary" />
        Select vendors to compare features.
      </Card>
    )
  }

  // Consolidate all unique feature keys from the 'core' features of selected vendors
  const allFeatureKeys = Array.from(new Set(data.flatMap((vendor) => Object.keys(vendor.features || {})))).sort()

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Feature Comparison Matrix</CardTitle>
        <CardDescription>Side-by-side comparison of core features for selected vendors.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left font-semibold text-muted-foreground sticky left-0 bg-card z-10">
                  Feature
                </th>
                {data.map((vendor) => (
                  <th key={vendor.id} className="py-3 px-4 text-center font-semibold text-muted-foreground">
                    <div className="flex flex-col items-center gap-1">
                      {vendor.logo && (
                        <Image
                          src={vendor.logo || "/placeholder.svg"}
                          alt={vendor.name}
                          width={80}
                          height={20}
                          className="h-5 w-auto object-contain mb-1"
                        />
                      )}
                      {vendor.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatureKeys.map((featureKey) => (
                <tr key={featureKey} className="border-b last:border-b-0 hover:bg-muted/50">
                  <td className="py-3 px-4 text-muted-foreground font-medium sticky left-0 bg-card z-10 capitalize">
                    {featureKey.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  {data.map((vendor) => {
                    const featureValue = vendor.features?.[featureKey]
                    let displayValue: React.ReactNode = "-"
                    if (typeof featureValue === "boolean") {
                      displayValue = featureValue ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    } else if (typeof featureValue === "number" || typeof featureValue === "string") {
                      displayValue = String(featureValue)
                    } else if (typeof featureValue === "object" && featureValue !== null && "score" in featureValue) {
                      displayValue = `${(featureValue as any).score}%` // Assuming VendorFeature with score
                    }

                    return (
                      <td key={`${vendor.id}-${featureKey}`} className="py-3 px-4 text-center">
                        {displayValue}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// --- NEW VIEWS END ---
