"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useDashboardSettings } from "@/context/DashboardContext"
import { useVendorData } from "@/hooks/useVendorData"
import { useTcoCalculator } from "@/hooks/useTcoCalculator"
import { useModalStore } from "@/src/stores/useModalStore"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import {
  Download,
  BarChart3,
  DollarSign,
  ShieldCheck,
  InfoIcon,
  MoonIcon,
  SunIcon,
  TrendingUp,
  Filter,
  Settings,
  Search,
  X,
  RefreshCw,
  Save,
  ChevronsLeft,
  ChevronsRight,
  Star,
  Wrench,
  Layers,
  Check,
} from "lucide-react"

// Import Tabs
import DetailedCostAnalysisTab from "./dashboard/tco/DetailedCostAnalysisTab"
import RoiAnalysisTab from "./dashboard/tco/RoiAnalysisTab"
import ComplianceRiskTab from "./dashboard/tco/ComplianceRiskTab"
import OperationsImpactTab from "./dashboard/tco/OperationsImpactTab"
import FeatureMatrixTab from "./dashboard/tco/FeatureMatrixTab"
import ImplementationTab from "./dashboard/tco/ImplementationTab"
import VendorDetailModal from "./dashboard/tco/VendorDetailModal"

// Enhanced Vendor Selection Panel Component
const EnhancedVendorSelectionPanel = ({
  searchTerm,
  setSearchTerm,
  isCollapsed,
}: {
  searchTerm: string
  setSearchTerm: (term: string) => void
  isCollapsed: boolean
}) => {
  const { settings, toggleVendor } = useDashboardSettings()
  const { vendors } = useVendorData()
  const { openModal } = useModalStore()

  const filteredVendors = useMemo(
    () => vendors.filter((vendor) => vendor.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [vendors, searchTerm],
  )

  return (
    <motion.div
      animate={{ width: isCollapsed ? 0 : 320 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="border-r flex flex-col flex-shrink-0 overflow-hidden relative bg-slate-900/50 border-slate-800/50"
    >
      <div className="w-[320px] flex flex-col h-full">
        <div className="p-4 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-bold text-lg text-white">Vendor Selection</h3>
            <Badge variant="secondary" className="ml-auto bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              {settings.selectedVendorIds.length} selected
            </Badge>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-8 border-0 bg-black/20 backdrop-blur-xl h-9 text-sm text-white placeholder:text-slate-400 focus:ring-emerald-500/50"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-3 grid grid-cols-1 gap-3">
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} onToggle={toggleVendor} onDetails={openModal} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  )
}

const VendorCard = ({ vendor, onToggle, onDetails }) => {
  const { settings } = useDashboardSettings()
  const isSelected = settings.selectedVendorIds.includes(vendor.id)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group"
    >
      <Card
        onClick={() => onToggle(vendor.id)}
        className={cn(
          "relative cursor-pointer transition-all duration-300 h-full border-slate-700 overflow-hidden",
          "backdrop-blur-xl bg-slate-800/50",
          isSelected && "ring-2 ring-emerald-500/80 shadow-2xl",
          "hover:bg-slate-700/50",
        )}
      >
        {isSelected && (
          <div className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <Image
              src={vendor.logoUrl || "/placeholder.svg"}
              alt={vendor.name}
              width={100}
              height={24}
              className="h-6 object-contain filter brightness-110"
            />
            {vendor.id === "portnox" && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
          </div>
          <CardTitle className="text-base font-bold leading-tight text-white">{vendor.name}</CardTitle>
          <p className="text-xs text-slate-400 mt-1">{vendor.vendorType}</p>
        </CardHeader>
        <CardContent className="p-4 pt-2 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Security Score</span>
            <span className="font-semibold text-white">{vendor.comparativeScores?.securityEffectiveness}/100</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
              initial={{ width: 0 }}
              animate={{ width: `${vendor.comparativeScores?.securityEffectiveness || 0}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-8 text-xs bg-transparent border-slate-600 hover:bg-slate-700 text-slate-300"
              onClick={(e) => {
                e.stopPropagation()
                onDetails(vendor.id)
              }}
            >
              <InfoIcon className="w-3 h-3 mr-1" />
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Settings Panel Component
const SettingsPanel = ({ isOpen, onClose }) => {
  const { settings, updateSettings, resetSettings } = useDashboardSettings()
  const [activeTab, setActiveTab] = useState("organization")

  const handleUpdate = (key, value) => {
    updateSettings({ [key]: value })
  }

  const handleAddonUpdate = (addonKey, checked) => {
    updateSettings({
      portnoxAddons: { ...settings.portnoxAddons, [addonKey]: checked },
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border shadow-2xl bg-slate-900/80 border-slate-700/50 backdrop-blur-lg"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Settings & Configuration</h2>
                  <p className="text-sm text-slate-400">Customize your TCO analysis parameters</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" onClick={onClose} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="border-b border-slate-700/50">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-transparent p-2">
                  <TabsTrigger value="organization">Organization</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <ScrollArea className="h-[calc(90vh-160px)] p-6">
              {activeTab === "organization" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-slate-300">Number of Devices</Label>
                      <Input
                        type="number"
                        value={settings.customDevices}
                        onChange={(e) => handleUpdate("customDevices", Number(e.target.value))}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Number of Users</Label>
                      <Input
                        type="number"
                        value={settings.customUsers}
                        onChange={(e) => handleUpdate("customUsers", Number(e.target.value))}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Industry</Label>
                      <Select value={settings.industry} onValueChange={(v) => handleUpdate("industry", v)}>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="financial_services">Financial Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Region</Label>
                      <Select value={settings.region} onValueChange={(v) => handleUpdate("region", v)}>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
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
                  <div>
                    <Label className="text-slate-300">Analysis Period: {settings.projectionYears} years</Label>
                    <Slider
                      value={[settings.projectionYears]}
                      onValueChange={(v) => handleUpdate("projectionYears", v[0])}
                      max={7}
                      min={1}
                      step={1}
                    />
                  </div>
                </div>
              )}
              {activeTab === "pricing" && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300">Portnox Base Price ($/device/month)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={settings.portnoxBasePrice}
                      onChange={(e) => handleUpdate("portnoxBasePrice", Number(e.target.value))}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Portnox Add-ons</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {Object.entries(settings.portnoxAddons).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2 p-3 bg-slate-800/50 rounded-md">
                          <Switch
                            id={key}
                            checked={value}
                            onCheckedChange={(checked) => handleAddonUpdate(key, checked)}
                          />
                          <Label htmlFor={key} className="capitalize text-slate-300">
                            {key}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "preferences" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-md">
                    <Label className="text-slate-300">Dark Mode</Label>
                    <Switch
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => handleUpdate("darkMode", checked)}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Currency</Label>
                    <Select value={settings.currency} onValueChange={(v) => handleUpdate("currency", v)}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              <div className="mt-8 flex justify-end gap-4">
                <Button variant="outline" onClick={resetSettings}>
                  <RefreshCw className="w-4 h-4 mr-2" /> Reset to Defaults
                </Button>
                <Button onClick={onClose}>
                  <Save className="w-4 h-4 mr-2" /> Apply & Close
                </Button>
              </div>
            </ScrollArea>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Main Component
export default function TcoAnalyzer() {
  const { settings, setDarkMode } = useDashboardSettings()
  const { tcoResults, isLoading } = useTcoCalculator()
  const { vendors: allVendors, isLoading: isLoadingVendors } = useVendorData()

  const [isClient, setIsClient] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeMainTab, setActiveMainTab] = useState("costs")

  useEffect(() => {
    setIsClient(true)
    document.documentElement.classList.toggle("dark", settings.darkMode)
  }, [settings.darkMode])

  const vendorDataForAnalysis = useMemo(
    () => settings.selectedVendorIds.map((id) => allVendors.find((v) => v.id === id)).filter(Boolean),
    [settings.selectedVendorIds, allVendors],
  )

  const TABS_CONFIG = [
    { value: "costs", label: "Cost Analysis", icon: DollarSign, component: DetailedCostAnalysisTab },
    { value: "roi", label: "ROI & Business Value", icon: TrendingUp, component: RoiAnalysisTab },
    { value: "compliance", label: "Compliance & Risk", icon: ShieldCheck, component: ComplianceRiskTab },
    { value: "operations", label: "Operations Impact", icon: Wrench, component: OperationsImpactTab },
    { value: "features", label: "Feature Matrix", icon: Layers, component: FeatureMatrixTab },
    { value: "implementation", label: "Implementation", icon: BarChart3, component: ImplementationTab },
  ]

  const ActiveTabComponent = TABS_CONFIG.find((tab) => tab.value === activeMainTab)?.component

  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-500",
        settings.darkMode ? "dark bg-slate-950" : "bg-slate-50",
      )}
    >
      <TooltipProvider>
        <header className="sticky top-0 z-40 backdrop-blur-lg border-b bg-slate-900/80 border-slate-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-4">
                <Image src="/portnox-logo-color.png" alt="Portnox Logo" width={160} height={40} priority />
                <Separator orientation="vertical" className="h-8 bg-slate-700" />
                <h1 className="text-xl font-bold text-white hidden md:block">Total Cost Analyzer</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
                  <Settings className="h-5 w-5 text-slate-400" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setDarkMode(!settings.darkMode)}>
                  {settings.darkMode ? (
                    <SunIcon className="h-5 w-5 text-slate-400" />
                  ) : (
                    <MoonIcon className="h-5 w-5 text-slate-400" />
                  )}
                </Button>
                <Button className="hidden sm:flex">
                  <Download className="h-4 w-4 mr-2" /> Export PDF
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex min-h-[calc(100vh-80px)]">
          <EnhancedVendorSelectionPanel
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isCollapsed={sidebarCollapsed}
          />
          <motion.button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="fixed top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 backdrop-blur-md"
            animate={{ left: sidebarCollapsed ? 8 : 320 - 16 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {sidebarCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
          </motion.button>

          <main className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <div className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
                <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
                  <TabsList className="flex items-center h-auto py-0 bg-transparent rounded-none justify-start overflow-x-auto container mx-auto px-4">
                    {TABS_CONFIG.map((tab) => (
                      <TabsTrigger key={tab.value} value={tab.value} className="flex-shrink-0">
                        <tab.icon className="w-4 h-4 mr-2" />
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMainTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isLoading || isLoadingVendors ? (
                      <div className="flex justify-center items-center h-96">
                        <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
                      </div>
                    ) : ActiveTabComponent ? (
                      <ActiveTabComponent
                        tcoResults={tcoResults}
                        vendorData={vendorDataForAnalysis}
                        comparisonYears={settings.projectionYears}
                      />
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </main>
        </div>
        <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
        <VendorDetailModal />
      </TooltipProvider>
    </div>
  )
}
