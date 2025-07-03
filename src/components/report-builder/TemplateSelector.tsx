"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, BarChart3, Shield, Brain, Plus, Star, Clock, User, Copy, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReportTemplate } from "@/types/report-builder"
import { templateCategories } from "@/lib/report-builder/templates"

interface TemplateSelectorProps {
  templates: ReportTemplate[]
  currentTemplate: ReportTemplate
  onTemplateSelect: (template: ReportTemplate) => void
  onTemplateCreate?: () => void
  onTemplateDuplicate?: (template: ReportTemplate) => void
  onTemplateDelete?: (templateId: string) => void
}

const categoryIcons = {
  executive: FileText,
  technical: BarChart3,
  compliance: Shield,
  custom: Brain,
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  currentTemplate,
  onTemplateSelect,
  onTemplateCreate,
  onTemplateDuplicate,
  onTemplateDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const groupedTemplates = templateCategories.reduce(
    (acc, category) => {
      acc[category.id] = filteredTemplates.filter((template) => template.category === category.id)
      return acc
    },
    {} as Record<string, ReportTemplate[]>,
  )

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Templates</h3>
          {onTemplateCreate && (
            <Button size="sm" onClick={onTemplateCreate} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
          )}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-700 border-slate-600 text-white"
          />
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 bg-slate-700 m-2">
          <TabsTrigger value="all" className="text-xs">
            All
          </TabsTrigger>
          <TabsTrigger value="executive" className="text-xs">
            Executive
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 px-2">
          <TabsContent value="all" className="mt-0">
            <div className="space-y-4">
              {templateCategories.map((category) => {
                const categoryTemplates = groupedTemplates[category.id]
                if (categoryTemplates.length === 0) return null

                const Icon = categoryIcons[category.id as keyof typeof categoryIcons]

                return (
                  <div key={category.id}>
                    <div className="flex items-center gap-2 mb-3 px-2">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <h4 className="text-sm font-medium text-slate-300">{category.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {categoryTemplates.length}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {categoryTemplates.map((template) => (
                        <TemplateCard
                          key={template.id}
                          template={template}
                          isSelected={currentTemplate.id === template.id}
                          onSelect={() => onTemplateSelect(template)}
                          onDuplicate={onTemplateDuplicate ? () => onTemplateDuplicate(template) : undefined}
                          onDelete={onTemplateDelete ? () => onTemplateDelete(template.id) : undefined}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>

          {templateCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="space-y-2">
                {groupedTemplates[category.id]?.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isSelected={currentTemplate.id === template.id}
                    onSelect={() => onTemplateSelect(template)}
                    onDuplicate={onTemplateDuplicate ? () => onTemplateDuplicate(template) : undefined}
                    onDelete={
                      onTemplateDelete && template.category === "custom"
                        ? () => onTemplateDelete(template.id)
                        : undefined
                    }
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </ScrollArea>
      </Tabs>
    </div>
  )
}

const TemplateCard: React.FC<{
  template: ReportTemplate
  isSelected: boolean
  onSelect: () => void
  onDuplicate?: () => void
  onDelete?: () => void
}> = ({ template, isSelected, onSelect, onDuplicate, onDelete }) => {
  const Icon = categoryIcons[template.category as keyof typeof categoryIcons] || FileText

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
      <Card
        className={cn(
          "cursor-pointer transition-all duration-200",
          isSelected
            ? "bg-blue-600/20 border-blue-500 ring-1 ring-blue-500"
            : "bg-slate-700/50 border-slate-600 hover:bg-slate-700/70",
        )}
        onClick={onSelect}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-slate-600/50 rounded-lg">
                <Icon className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-sm text-white truncate">{template.name}</CardTitle>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{template.description}</p>
              </div>
            </div>
            {isSelected && <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs capitalize">
                {template.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {template.sections.length} sections
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              {onDuplicate && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto text-slate-400 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDuplicate()
                  }}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              )}
              {onDelete && template.category === "custom" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto text-slate-400 hover:text-red-400"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(template.updatedAt).toLocaleDateString()}
            </div>
            {template.author && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {template.author}
              </div>
            )}
            <div className="flex items-center gap-1">
              <span>{template.layout}</span>
              <span>•</span>
              <span>{template.theme}</span>
            </div>
          </div>
          {template.tags && template.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {template.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5">
                  {tag}
                </Badge>
              ))}
              {template.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                  +{template.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
