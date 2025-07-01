"use client"

import type React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import type { CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { cn } from "@/lib/utils"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  configuration: CalculationConfiguration
  onConfigurationChange: (config: CalculationConfiguration) => void
  portnoxAddons: CalculationConfiguration["portnoxAddons"]
  onAddonsChange: (addons: CalculationConfiguration["portnoxAddons"]) => void
  darkMode: boolean
  onDarkModeChange: (isDark: boolean) => void
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  configuration,
  onConfigurationChange,
  portnoxAddons,
  onAddonsChange,
  darkMode,
  onDarkModeChange,
}) => {
  const handleConfigChange = (key: keyof CalculationConfiguration, value: any) => {
    onConfigurationChange({ ...configuration, [key]: value })
  }

  const handleAddonToggle = (addon: keyof typeof portnoxAddons) => {
    onAddonsChange({ ...portnoxAddons, [addon]: !portnoxAddons[addon] })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className={cn("w-[400px] sm:w-[540px]", darkMode ? "dark" : "")}>
        <SheetHeader>
          <SheetTitle>Settings & Configuration</SheetTitle>
          <SheetDescription>Adjust the parameters for a more accurate TCO calculation.</SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="devices">Number of Devices</Label>
              <Input
                id="devices"
                type="number"
                value={configuration.devices}
                onChange={(e) => handleConfigChange("devices", Number.parseInt(e.target.value, 10))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="users">Number of Users</Label>
              <Input
                id="users"
                type="number"
                value={configuration.users}
                onChange={(e) => handleConfigChange("users", Number.parseInt(e.target.value, 10))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select value={configuration.industry} onValueChange={(value) => handleConfigChange("industry", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="financial">Financial Services</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="energy">Energy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">Analysis Period (Years)</Label>
            <Select
              value={String(configuration.years)}
              onValueChange={(v) => handleConfigChange("years", Number.parseInt(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Year</SelectItem>
                <SelectItem value="3">3 Years</SelectItem>
                <SelectItem value="5">5 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Portnox Add-ons</h4>
            {Object.entries(portnoxAddons).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={`addon-${key}`} className="capitalize">
                  {key}
                </Label>
                <Switch id={`addon-${key}`} checked={value} onCheckedChange={() => handleAddonToggle(key as any)} />
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <Label>Dark Mode</Label>
            <Switch checked={darkMode} onCheckedChange={onDarkModeChange} />
          </div>
        </div>
        <SheetFooter>
          <Button onClick={onClose}>Done</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default SettingsPanel
