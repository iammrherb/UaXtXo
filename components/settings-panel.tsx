"use client"

import type React from "react"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  configuration: CalculationConfiguration
  onConfigurationChange: (config: CalculationConfiguration) => void
  portnoxAddons: CalculationConfiguration["portnoxAddons"]
  onAddonsChange: (addons: CalculationConfiguration["portnoxAddons"]) => void
  darkMode: boolean
  onDarkModeChange: (darkMode: boolean) => void
}

const ORG_SIZES = ["startup", "smb", "medium", "enterprise", "xlarge"]
const INDUSTRIES = [
  "technology",
  "healthcare",
  "financial",
  "government",
  "education",
  "manufacturing",
  "retail",
  "energy",
]
const REGIONS = ["north-america", "europe", "asia-pacific", "latin-america", "middle-east"]

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
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numericValue = value === "" ? 0 : Number.parseInt(value, 10)
    if (!isNaN(numericValue)) {
      onConfigurationChange({
        ...configuration,
        [name]: numericValue,
      })
    }
  }

  const handleFloatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const floatValue = value === "" ? 0 : Number.parseFloat(value)
    if (!isNaN(floatValue)) {
      onConfigurationChange({
        ...configuration,
        [name]: floatValue,
      })
    }
  }

  const handleSelectChange = (name: string) => (value: string) => {
    onConfigurationChange({
      ...configuration,
      [name]: value,
    })
  }

  const handleAddonChange = (name: keyof typeof portnoxAddons) => (checked: boolean) => {
    onAddonsChange({
      ...portnoxAddons,
      [name]: checked,
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Settings & Configuration</SheetTitle>
          <SheetDescription>Adjust the parameters for the TCO calculation.</SheetDescription>
        </SheetHeader>
        <Separator />
        <ScrollArea className="flex-grow pr-6">
          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <h4 className="font-medium">Organization Profile</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="orgSize">Organization Size</Label>
                  <Select name="orgSize" value={configuration.orgSize} onValueChange={handleSelectChange("orgSize")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {ORG_SIZES.map((size) => (
                        <SelectItem key={size} value={size} className="capitalize">
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="industry">Industry</Label>
                  <Select name="industry" value={configuration.industry} onValueChange={handleSelectChange("industry")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map((industry) => (
                        <SelectItem key={industry} value={industry} className="capitalize">
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Scope</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="devices">Device Count</Label>
                  <Input
                    id="devices"
                    name="devices"
                    type="number"
                    value={configuration.devices}
                    onChange={handleNumericChange}
                    min="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="users">User Count</Label>
                  <Input
                    id="users"
                    name="users"
                    type="number"
                    value={configuration.users}
                    onChange={handleNumericChange}
                    min="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="years">Analysis Period (Years)</Label>
                  <Input
                    id="years"
                    name="years"
                    type="number"
                    value={configuration.years}
                    onChange={handleNumericChange}
                    min="1"
                    max="10"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="region">Region</Label>
                  <Select name="region" value={configuration.region} onValueChange={handleSelectChange("region")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map((region) => (
                        <SelectItem key={region} value={region} className="capitalize">
                          {region.replace("-", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Portnox Specifics</h4>
              <div className="space-y-1">
                <Label htmlFor="portnoxBasePrice">Base Price ($/device/mo)</Label>
                <Input
                  id="portnoxBasePrice"
                  name="portnoxBasePrice"
                  type="number"
                  value={configuration.portnoxBasePrice}
                  onChange={handleFloatChange}
                  step="0.1"
                  min="0"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {Object.keys(portnoxAddons).map((addonKey) => (
                  <div key={addonKey} className="flex items-center space-x-2">
                    <Switch
                      id={addonKey}
                      checked={portnoxAddons[addonKey as keyof typeof portnoxAddons]}
                      onCheckedChange={handleAddonChange(addonKey as keyof typeof portnoxAddons)}
                    />
                    <Label htmlFor={addonKey} className="capitalize">
                      {addonKey} Add-on
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Display Settings</h4>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">Toggle between light and dark themes.</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={onDarkModeChange} />
              </div>
            </div>
          </div>
        </ScrollArea>
        <SheetFooter>
          <Button onClick={onClose}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
