"use client"

import type { CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"

interface SettingsPanelProps {
  config: CalculationConfiguration
  onConfigChange: (newConfig: Partial<CalculationConfiguration>) => void
}

export default function SettingsPanel({ config, onConfigChange }: SettingsPanelProps) {
  // Guard clause to prevent crash if config is not ready.
  if (!config) {
    return (
      <Card className="w-full border-0 shadow-none">
        <CardHeader>
          <CardTitle>Loading Settings...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
            <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
            <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleNumericChange = (key: keyof CalculationConfiguration, value: string) => {
    const numValue = value === "" ? 0 : Number.parseInt(value, 10)
    if (!isNaN(numValue)) {
      onConfigChange({ [key]: numValue })
    }
  }

  const handleSliderChange = (key: keyof CalculationConfiguration, value: number[]) => {
    onConfigChange({ [key]: value[0] })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full border-0 bg-transparent shadow-none">
        <CardHeader>
          <CardTitle>Calculation Settings</CardTitle>
          <CardDescription>Adjust the core inputs for the TCO model.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="devices" className="font-medium">
              Device Count
            </Label>
            <Input
              id="devices"
              type="number"
              value={config.devices}
              onChange={(e) => handleNumericChange("devices", e.target.value)}
              min="0"
              className="bg-background"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="years" className="font-medium">
              Analysis Period: <span className="text-primary font-bold">{config.years} Years</span>
            </Label>
            <Slider
              id="years"
              min={1}
              max={5}
              step={1}
              value={[config.years]}
              onValueChange={(val) => handleSliderChange("years", val)}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="staffCount" className="font-medium">
              IT/Security Staff Count
            </Label>
            <Input
              id="staffCount"
              type="number"
              value={config.staffCount}
              onChange={(e) => handleNumericChange("staffCount", e.target.value)}
              min="0"
              className="bg-background"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="hourlyRate" className="font-medium">
              Avg. Staff Hourly Rate ($)
            </Label>
            <Input
              id="hourlyRate"
              type="number"
              value={config.hourlyRate}
              onChange={(e) => handleNumericChange("hourlyRate", e.target.value)}
              min="0"
              className="bg-background"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="breachCost" className="font-medium">
              Avg. Cost of a Data Breach ($)
            </Label>
            <Input
              id="breachCost"
              type="number"
              value={config.breachCost}
              onChange={(e) => handleNumericChange("breachCost", e.target.value)}
              min="0"
              step="10000"
              className="bg-background"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
