"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  configuration: any
  onConfigurationChange: (config: any) => void
  darkMode: boolean
  onDarkModeChange: (darkMode: boolean) => void
}

export default function SettingsPanel({
  isOpen,
  onClose,
  configuration,
  onConfigurationChange,
  darkMode,
  onDarkModeChange,
}: SettingsPanelProps) {
  const [localConfig, setLocalConfig] = useState({ ...configuration })

  useEffect(() => {
    setLocalConfig({ ...configuration })
  }, [configuration])

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target
    const newValue = type === "checkbox" ? checked : value
    setLocalConfig((prev) => ({ ...prev, [name]: newValue }))
  }

  const handleSave = () => {
    onConfigurationChange(localConfig)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Analysis Configuration</DialogTitle>
          <DialogDescription>Adjust settings to customize the TCO analysis</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="devices">Number of Devices</Label>
            <Input type="number" id="devices" name="devices" value={localConfig.devices} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="users">Number of Users</Label>
            <Input type="number" id="users" name="users" value={localConfig.users} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="years">Analysis Years</Label>
            <Input type="number" id="years" name="years" value={localConfig.years} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="avgFteCost">Average FTE Cost</Label>
            <Input
              type="number"
              id="avgFteCost"
              name="avgFteCost"
              value={localConfig.avgFteCost}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="portnoxDeviceCost">Portnox Device Cost</Label>
            <Input
              type="number"
              id="portnoxDeviceCost"
              name="portnoxDeviceCost"
              value={localConfig.portnoxDeviceCost}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Label htmlFor="darkMode">Dark Mode</Label>
          <Switch checked={darkMode} onCheckedChange={onDarkModeChange} id="darkMode" />
        </div>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
