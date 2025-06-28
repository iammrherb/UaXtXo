"use client"

import { CardDescription } from "@/components/ui/card"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Settings,
  Save,
  RotateCcw,
  Download,
  Upload,
  Moon,
  Sun,
  Building,
  DollarSign,
  Zap,
  Shield,
  Clock,
  Info,
} from "lucide-react"
import type { CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  configuration: CalculationConfiguration
  onConfigurationChange: (config: Partial<CalculationConfiguration>) => void
  portnoxAddons: {
    atp: boolean
    compliance: boolean
    iot: boolean
    analytics: boolean
  }
  onAddonsChange: (addons: any) => void
  darkMode: boolean
  onDarkModeChange: (enabled: boolean) => void
}

const ORG_SIZES = [
  { id: "small", name: "Small (< 500 devices)", devices: 250, users: 150 },
  { id: "medium", name: "Medium (500-5000 devices)", devices: 2500, users: 1500 },
  { id: "large", name: "Large (5000-20000 devices)", devices: 10000, users: 6000 },
  { id: "enterprise", name: "Enterprise (20000+ devices)", devices: 50000, users: 30000 },
]

const INDUSTRIES = [
  { id: "technology", name: "Technology", riskMultiplier: 1.2 },
  { id: "healthcare", name: "Healthcare", riskMultiplier: 1.5 },
  { id: "financial", name: "Financial Services", riskMultiplier: 1.8 },
  { id: "government", name: "Government", riskMultiplier: 1.6 },
  { id: "education", name: "Education", riskMultiplier: 1.1 },
  { id: "retail", name: "Retail", riskMultiplier: 1.3 },
  { id: "manufacturing", name: "Manufacturing", riskMultiplier: 1.2 },
  { id: "other", name: "Other", riskMultiplier: 1.0 },
]

const REGIONS = [
  { id: "north-america", name: "North America", costMultiplier: 1.0 },
  { id: "europe", name: "Europe", costMultiplier: 1.1 },
  { id: "asia-pacific", name: "Asia Pacific", costMultiplier: 0.8 },
  { id: "latin-america", name: "Latin America", costMultiplier: 0.7 },
  { id: "middle-east", name: "Middle East", costMultiplier: 0.9 },
]

const PORTNOX_ADDONS = [
  {
    id: "atp",
    name: "Advanced Threat Protection",
    description: "AI-powered threat detection and response",
    price: 1.5,
    icon: Shield,
  },
  {
    id: "compliance",
    name: "Compliance Automation",
    description: "Automated compliance reporting and audit trails",
    price: 1.0,
    icon: Clock,
  },
  {
    id: "iot",
    name: "IoT Security",
    description: "Specialized IoT device discovery and protection",
    price: 2.0,
    icon: Zap,
  },
  {
    id: "analytics",
    name: "Advanced Analytics",
    description: "Enhanced reporting and business intelligence",
    price: 0.8,
    icon: Info,
  },
]

export default function SettingsPanel({
  isOpen,
  onClose,
  configuration,
  onConfigurationChange,
  portnoxAddons,
  onAddonsChange,
  darkMode,
  onDarkModeChange,
}: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState("organization")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Track changes
  useEffect(() => {
    setHasUnsavedChanges(true)
  }, [configuration, portnoxAddons, darkMode])

  const handleSave = () => {
    try {
      const saveData = {
        configuration,
        portnoxAddons,
        darkMode,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem("portnox-tco-config", JSON.stringify(saveData))
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error("Failed to save configuration:", error)
    }
  }

  const handleReset = () => {
    const defaultConfig: CalculationConfiguration = {
      orgSize: "medium",
      devices: 2500,
      users: 1500,
      industry: "technology",
      years: 3,
      region: "north-america",
      portnoxBasePrice: 3.0,
      portnoxAddons: {
        atp: false,
        compliance: false,
        iot: false,
        analytics: false,
      },
    }

    onConfigurationChange(defaultConfig)
    onAddonsChange({
      atp: false,
      compliance: false,
      iot: false,
      analytics: false,
    })
    onDarkModeChange(false)
  }

  const handleExport = () => {
    const exportData = {
      configuration,
      portnoxAddons,
      darkMode,
      exportDate: new Date().toISOString(),
      version: "3.0",
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `portnox-tco-config-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target?.result as string)
        if (importData.configuration) {
          onConfigurationChange(importData.configuration)
        }
        if (importData.portnoxAddons) {
          onAddonsChange(importData.portnoxAddons)
        }
        if (typeof importData.darkMode === "boolean") {
          onDarkModeChange(importData.darkMode)
        }
      } catch (error) {
        console.error("Failed to import configuration:", error)
      }
    }
    reader.readAsText(file)
  }

  const handleOrgSizeChange = (sizeId: string) => {
    const orgSize = ORG_SIZES.find((s) => s.id === sizeId)
    if (orgSize) {
      onConfigurationChange({
        orgSize: sizeId as any,
        devices: orgSize.devices,
        users: orgSize.users,
      })
    }
  }

  const calculateAddonCost = () => {
    return PORTNOX_ADDONS.reduce((total, addon) => {
      return total + (portnoxAddons[addon.id as keyof typeof portnoxAddons] ? addon.price : 0)
    }, 0)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuration Settings
          </DialogTitle>
          <DialogDescription>Customize your TCO analysis parameters and preferences</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="addons">Add-ons</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          {/* Organization Tab */}
          <TabsContent value="organization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Organization Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Organization Size */}
                <div className="space-y-3">
                  <Label>Organization Size</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {ORG_SIZES.map((size) => (
                      <Card
                        key={size.id}
                        className={`cursor-pointer transition-all ${
                          configuration.orgSize === size.id
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "hover:border-gray-300"
                        }`}
                        onClick={() => handleOrgSizeChange(size.id)}
                      >
                        <CardContent className="p-4">
                          <h4 className="font-medium">{size.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {size.devices.toLocaleString()} devices, {size.users.toLocaleString()} users
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Custom Values */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="devices">Number of Devices</Label>
                    <Input
                      id="devices"
                      type="number"
                      value={configuration.devices || 0}
                      onChange={(e) => onConfigurationChange({ devices: Number.parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="users">Number of Users</Label>
                    <Input
                      id="users"
                      type="number"
                      value={configuration.users || 0}
                      onChange={(e) => onConfigurationChange({ users: Number.parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <select
                    id="industry"
                    value={configuration.industry}
                    onChange={(e) => onConfigurationChange({ industry: e.target.value as any })}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    {INDUSTRIES.map((industry) => (
                      <option key={industry.id} value={industry.id}>
                        {industry.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Region */}
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <select
                    id="region"
                    value={configuration.region}
                    onChange={(e) => onConfigurationChange({ region: e.target.value as any })}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    {REGIONS.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Analysis Period */}
                <div className="space-y-3">
                  <Label>Analysis Period: {configuration.years} years</Label>
                  <Slider
                    value={[configuration.years || 3]}
                    onValueChange={(value) => onConfigurationChange({ years: value[0] })}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1 year</span>
                    <span>10 years</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Portnox Pricing Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>
                    Base Price per Device per Month: ${configuration.portnoxBasePrice?.toFixed(2) || "3.00"}
                  </Label>
                  <Slider
                    value={[configuration.portnoxBasePrice || 3.0]}
                    onValueChange={(value) => onConfigurationChange({ portnoxBasePrice: value[0] })}
                    max={10}
                    min={1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>$1.00</span>
                    <span>$10.00</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Pricing Calculator</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-700 dark:text-blue-300">Monthly Cost</p>
                      <p className="font-bold text-blue-900 dark:text-blue-100">
                        ${((configuration.devices || 0) * (configuration.portnoxBasePrice || 3.0)).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-700 dark:text-blue-300">Annual Cost</p>
                      <p className="font-bold text-blue-900 dark:text-blue-100">
                        $
                        {((configuration.devices || 0) * (configuration.portnoxBasePrice || 3.0) * 12).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add-ons Tab */}
          <TabsContent value="addons" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Portnox Add-on Modules
                </CardTitle>
                <CardDescription>Enhance your Portnox deployment with additional capabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {PORTNOX_ADDONS.map((addon) => (
                  <div key={addon.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <addon.icon className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">{addon.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{addon.description}</p>
                        <Badge variant="outline" className="mt-1">
                          +${addon.price}/device/month
                        </Badge>
                      </div>
                    </div>
                    <Switch
                      checked={portnoxAddons[addon.id as keyof typeof portnoxAddons]}
                      onCheckedChange={(checked) =>
                        onAddonsChange({
                          ...portnoxAddons,
                          [addon.id]: checked,
                        })
                      }
                    />
                  </div>
                ))}

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Add-on Cost Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-green-700 dark:text-green-300">Additional Monthly Cost</p>
                      <p className="font-bold text-green-900 dark:text-green-100">
                        ${((configuration.devices || 0) * calculateAddonCost()).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-green-700 dark:text-green-300">Total Monthly Cost</p>
                      <p className="font-bold text-green-900 dark:text-green-100">
                        $
                        {(
                          (configuration.devices || 0) *
                          ((configuration.portnoxBasePrice || 3.0) + calculateAddonCost())
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    <div>
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Toggle between light and dark themes</p>
                    </div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={onDarkModeChange} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Button onClick={handleExport} variant="outline" className="gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Export Configuration
                  </Button>
                  <div>
                    <input type="file" accept=".json" onChange={handleImport} className="hidden" id="import-config" />
                    <Button asChild variant="outline" className="gap-2 bg-transparent">
                      <label htmlFor="import-config" className="cursor-pointer">
                        <Upload className="h-4 w-4" />
                        Import Configuration
                      </label>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex gap-2">
            <Button onClick={handleReset} variant="outline" className="gap-2 bg-transparent">
              <RotateCcw className="h-4 w-4" />
              Reset to Defaults
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={onClose} variant="outline" className="bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
              {hasUnsavedChanges && (
                <Badge variant="secondary" className="ml-2">
                  •
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
