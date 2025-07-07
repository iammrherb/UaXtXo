"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Settings, Users, Building, Globe, Calendar } from "lucide-react"
import { useDashboardSettings } from "@/context/DashboardContext"

export function ConfigurationBar() {
  const { settings, updateSettings } = useDashboardSettings()

  const orgSizeOptions = [
    { value: "small", label: "Small (1-100)", icon: Users },
    { value: "medium", label: "Medium (101-1000)", icon: Users },
    { value: "large", label: "Large (1001-5000)", icon: Building },
    { value: "enterprise", label: "Enterprise (5000+)", icon: Building },
  ]

  const industryOptions = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Financial Services" },
    { value: "education", label: "Education" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "retail", label: "Retail" },
  ]

  const regionOptions = [
    { value: "north-america", label: "North America" },
    { value: "europe", label: "Europe" },
    { value: "asia-pacific", label: "Asia Pacific" },
    { value: "latin-america", label: "Latin America" },
  ]

  return (
    <Card className="mb-6 border-blue-200 bg-gradient-to-r from-white to-blue-50 dark:border-blue-800 dark:from-slate-900 dark:to-blue-950/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-600 dark:text-blue-400">Analysis Configuration</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Organization Size */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Organization Size
            </label>
            <Select value={settings.orgSize} onValueChange={(value) => updateSettings({ orgSize: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {orgSizeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Building className="h-4 w-4" />
              Industry
            </label>
            <Select value={settings.industry} onValueChange={(value) => updateSettings({ industry: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {industryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Region */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Region
            </label>
            <Select value={settings.region} onValueChange={(value) => updateSettings({ region: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Analysis Period */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Analysis Period: {settings.comparisonYears} years
            </label>
            <Slider
              value={[settings.comparisonYears]}
              onValueChange={([value]) => updateSettings({ comparisonYears: value })}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 year</span>
              <span>5 years</span>
            </div>
          </div>
        </div>

        {/* Selected Vendors */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Selected Vendors:</span>
            <div className="flex gap-2">
              {settings.selectedVendors.map((vendor) => (
                <Badge key={vendor} variant="secondary" className="capitalize">
                  {vendor}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
