"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

export default function SettingsPanel({
  isOpen,
  onClose,
  configuration,
  onConfigurationChange,
  darkMode,
  onDarkModeChange,
}: {
  isOpen: boolean
  onClose: () => void
  configuration: CalculationConfiguration
  onConfigurationChange: (config: CalculationConfiguration) => void
  darkMode: boolean
  onDarkModeChange: (isDark: boolean) => void
}) {
  const handlechange = (key: keyof CalculationConfiguration, value: any) => {
    onConfigurationChange({ ...configuration, [key]: value })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings & Configuration</SheetTitle>
          <SheetDescription>Adjust the parameters for the TCO calculation.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="devices" className="text-right">
              Devices
            </Label>
            <Input
              id="devices"
              type="number"
              value={configuration.devices}
              onChange={(e) => handlechange("devices", Number.parseInt(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="users" className="text-right">
              Users
            </Label>
            <Input
              id="users"
              type="number"
              value={configuration.users}
              onChange={(e) => handlechange("users", Number.parseInt(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="years" className="text-right">
              Years
            </Label>
            <Select
              value={String(configuration.years)}
              onValueChange={(val) => handlechange("years", Number.parseInt(val))}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Year</SelectItem>
                <SelectItem value="3">3 Years</SelectItem>
                <SelectItem value="5">5 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="licenseTier" className="text-right">
              License Tier
            </Label>
            <Select value={configuration.licenseTier} onValueChange={(val) => handlechange("licenseTier", val)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Essentials">Essentials</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode" checked={darkMode} onCheckedChange={onDarkModeChange} />
          </div>
        </div>
        <SheetFooter>
          <Button onClick={onClose}>Done</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
