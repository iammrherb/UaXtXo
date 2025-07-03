"use client"

import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { SectionLibrary } from "./SectionLibrary"
import { ReportCanvas } from "./ReportCanvas"
import { ReportPreview } from "./ReportPreview"
import { TemplateSelector } from "./TemplateSelector"
import type { ReportSection, ReportTemplate } from "@/types/report-builder"
import { reportTemplates } from "@/lib/report-builder/templates"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"

export function ReportBuilder() {
  const [sections, setSections] = useState<ReportSection[]>([])
  const [isPreviewing, setIsPreviewing] = useState(false)

  const handleTemplateSelect = (template: ReportTemplate) => {
    setSections(template.sections)
  }

  const handleAddSection = (section: ReportSection) => {
    setSections((prev) => [...prev, { ...section, id: `${section.type}-${Date.now()}` }])
  }

  const handleMoveSection = (dragIndex: number, hoverIndex: number) => {
    setSections((prev) => {
      const newSections = [...prev]
      const [draggedItem] = newSections.splice(dragIndex, 1)
      newSections.splice(hoverIndex, 0, draggedItem)
      return newSections
    })
  }

  const handleRemoveSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id))
  }

  const handleUpdateSectionContent = (id: string, content: string) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, content } : s)))
  }

  const handleGenerateReport = () => {
    // In a real app, this would generate a PDF or other format
    console.log("Generating report with sections:", sections)
    alert("Report generated! Check the console for details.")
  }

  if (isPreviewing) {
    return (
      <div className="p-4">
        <Button onClick={() => setIsPreviewing(false)} className="mb-4">
          Back to Editor
        </Button>
        <ReportPreview sections={sections} />
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <h1 className="text-2xl font-bold">Report Builder</h1>
          <div className="flex items-center gap-2">
            <TemplateSelector templates={reportTemplates} onSelect={handleTemplateSelect} />
            <Button onClick={() => setIsPreviewing(true)} variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button onClick={handleGenerateReport}>
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>
        <ResizablePanelGroup direction="horizontal" className="flex-grow">
          <ResizablePanel defaultSize={25} minSize={20}>
            <SectionLibrary onAddSection={handleAddSection} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75} minSize={50}>
            <ReportCanvas
              sections={sections}
              onMoveSection={handleMoveSection}
              onRemoveSection={handleRemoveSection}
              onUpdateSectionContent={handleUpdateSectionContent}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </DndProvider>
  )
}
