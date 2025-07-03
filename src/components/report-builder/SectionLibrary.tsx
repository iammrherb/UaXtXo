"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  BarChart3,
  Table,
  FileText,
  TrendingUp,
  Target,
  Brain,
  PieChart,
  LineChart,
  Grid,
  Type,
  ImageIcon,
} from "lucide-react"
import { sectionCategories, defaultReportSections } from "@/lib/report-builder/templates"

interface SectionLibraryProps {
  onSectionAdd: (sectionType: string) => void
}

const sectionIcons = {
  summary: FileText,
  chart: BarChart3,
  table: Table,
  metrics: TrendingUp,
  text: Type,
  image: ImageIcon,
  recommendations: Brain,
  gaps: Target,
  trends: LineChart,
  vendorRiskChart: BarChart3,
  riskDistribution: PieChart,
  complianceTable: Table,
  keyMetrics: Grid,
  complianceGaps: Target,
  trendAnalysis: LineChart,
}

const sectionDescriptions = {
  summary: "Executive summary and overview content",
  vendorRiskChart: "Bar chart comparing vendor risk scores",
  riskDistribution: "Pie chart showing risk level distribution",
  complianceTable: "Detailed table of compliance gaps",
  keyMetrics: "Key performance indicators and metrics",
  recommendations: "AI-generated recommendations",
  complianceGaps: "Compliance gap analysis",
  trendAnalysis: "Historical trend analysis charts",
  text: "Custom text content",
  image: "Images and visual content",
}

export const SectionLibrary: React.FC<SectionLibraryProps> = ({ onSectionAdd }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredSections = Object.entries(defaultReportSections).filter(([key, section]) => {
    const matchesSearch =
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      key.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedCategory === "all") return matchesSearch

    const category = sectionCategories.find((cat) => cat.sections.includes(key))
    return matchesSearch && category?.id === selectedCategory
  })

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-3">Section Library</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search sections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-700 border-slate-600 text-white"
          />
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 bg-slate-700 m-2">
          <TabsTrigger value="all" className="text-xs">
            All
          </TabsTrigger>
          <TabsTrigger value="visualizations" className="text-xs">
            Charts
          </TabsTrigger>
          <TabsTrigger value="ai" className="text-xs">
            AI
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 px-2">
          <TabsContent value="all" className="mt-0">
            <div className="space-y-3">
              {sectionCategories.map((category) => (
                <div key={category.id}>
                  <h4 className="text-sm font-medium text-slate-300 mb-2 px-2">{category.name}</h4>
                  <div className="space-y-2">
                    {category.sections
                      .filter(
                        (sectionKey) =>
                          Object.keys(defaultReportSections).includes(sectionKey) &&
                          (searchTerm === "" ||
                            defaultReportSections[sectionKey].title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            sectionKey.toLowerCase().includes(searchTerm.toLowerCase())),
                      )
                      .map((sectionKey) => (
                        <SectionCard
                          key={sectionKey}
                          sectionKey={sectionKey}
                          section={defaultReportSections[sectionKey]}
                          onAdd={() => onSectionAdd(sectionKey)}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="visualizations" className="mt-0">
            <div className="space-y-2">
              {filteredSections
                .filter(
                  ([key]) =>
                    key.includes("Chart") ||
                    key.includes("chart") ||
                    key === "riskDistribution" ||
                    key === "trendAnalysis",
                )
                .map(([key, section]) => (
                  <SectionCard key={key} sectionKey={key} section={section} onAdd={() => onSectionAdd(key)} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="ai" className="mt-0">
            <div className="space-y-2">
              {filteredSections
                .filter(([key]) => key === "recommendations" || key === "complianceGaps" || key === "summary")
                .map(([key, section]) => (
                  <SectionCard key={key} sectionKey={key} section={section} onAdd={() => onSectionAdd(key)} />
                ))}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}

const SectionCard: React.FC<{
  sectionKey: string
  section: any
  onAdd: () => void
}> = ({ sectionKey, section, onAdd }) => {
  const Icon = sectionIcons[sectionKey as keyof typeof sectionIcons] || FileText

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
      <Card className="bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 transition-colors cursor-pointer">
        <CardContent className="p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-slate-600/50 rounded-lg">
                <Icon className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white truncate">{section.title}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {section.description || sectionDescriptions[sectionKey as keyof typeof sectionDescriptions]}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {section.type}
                  </Badge>
                  <span className="text-xs text-slate-500">
                    {section.size.width}×{section.size.height}
                  </span>
                </div>
              </div>
            </div>
            <Button size="sm" onClick={onAdd} className="ml-2 p-1 h-auto bg-blue-600 hover:bg-blue-700">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
