import type React from "react"
import html2canvas from "html2canvas"

export interface ChartCaptureOptions {
  width?: number
  height?: number
  scale?: number
  backgroundColor?: string
  useCORS?: boolean
  allowTaint?: boolean
}

export interface CapturedChart {
  id: string
  dataUrl: string
  width: number
  height: number
}

// Chart capture utility class
export class ChartCaptureService {
  private static instance: ChartCaptureService
  private capturedCharts: Map<string, CapturedChart> = new Map()

  static getInstance(): ChartCaptureService {
    if (!ChartCaptureService.instance) {
      ChartCaptureService.instance = new ChartCaptureService()
    }
    return ChartCaptureService.instance
  }

  // Capture a single chart element
  async captureChart(element: HTMLElement, chartId: string, options: ChartCaptureOptions = {}): Promise<CapturedChart> {
    const defaultOptions: ChartCaptureOptions = {
      width: 800,
      height: 400,
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      allowTaint: true,
      ...options,
    }

    try {
      // Wait for any animations to complete
      await this.waitForAnimations(element)

      const canvas = await html2canvas(element, {
        width: defaultOptions.width,
        height: defaultOptions.height,
        scale: defaultOptions.scale,
        backgroundColor: defaultOptions.backgroundColor,
        useCORS: defaultOptions.useCORS,
        allowTaint: defaultOptions.allowTaint,
        logging: false,
        removeContainer: true,
      })

      const dataUrl = canvas.toDataURL("image/png", 0.95)

      const capturedChart: CapturedChart = {
        id: chartId,
        dataUrl,
        width: canvas.width,
        height: canvas.height,
      }

      this.capturedCharts.set(chartId, capturedChart)
      return capturedChart
    } catch (error) {
      console.error(`Failed to capture chart ${chartId}:`, error)
      throw new Error(`Chart capture failed for ${chartId}`)
    }
  }

  // Capture multiple charts at once
  async captureMultipleCharts(
    chartElements: Array<{ element: HTMLElement; id: string; options?: ChartCaptureOptions }>,
  ): Promise<CapturedChart[]> {
    const capturePromises = chartElements.map(({ element, id, options }) => this.captureChart(element, id, options))

    try {
      return await Promise.all(capturePromises)
    } catch (error) {
      console.error("Failed to capture multiple charts:", error)
      throw new Error("Multiple chart capture failed")
    }
  }

  // Get a captured chart by ID
  getCapturedChart(chartId: string): CapturedChart | undefined {
    return this.capturedCharts.get(chartId)
  }

  // Get all captured charts
  getAllCapturedCharts(): CapturedChart[] {
    return Array.from(this.capturedCharts.values())
  }

  // Clear captured charts
  clearCapturedCharts(): void {
    this.capturedCharts.clear()
  }

  // Wait for animations and transitions to complete
  private async waitForAnimations(element: HTMLElement, timeout = 2000): Promise<void> {
    return new Promise((resolve) => {
      let animationCount = 0
      const animations = element.getAnimations?.() || []

      if (animations.length === 0) {
        // No animations, wait a short time for any pending renders
        setTimeout(resolve, 100)
        return
      }

      const checkAnimations = () => {
        const runningAnimations = element.getAnimations?.() || []
        if (runningAnimations.length === 0 || animationCount > timeout / 100) {
          resolve()
        } else {
          animationCount++
          setTimeout(checkAnimations, 100)
        }
      }

      checkAnimations()
    })
  }

  // Capture chart from a React component reference
  async captureChartFromRef(
    chartRef: React.RefObject<HTMLDivElement>,
    chartId: string,
    options?: ChartCaptureOptions,
  ): Promise<CapturedChart | null> {
    if (!chartRef.current) {
      console.warn(`Chart ref for ${chartId} is not available`)
      return null
    }

    try {
      return await this.captureChart(chartRef.current, chartId, options)
    } catch (error) {
      console.error(`Failed to capture chart from ref ${chartId}:`, error)
      return null
    }
  }

  // Capture charts by selector
  async captureChartsBySelector(
    selector: string,
    baseId: string,
    options?: ChartCaptureOptions,
  ): Promise<CapturedChart[]> {
    const elements = document.querySelectorAll(selector)
    const capturePromises: Promise<CapturedChart>[] = []

    elements.forEach((element, index) => {
      if (element instanceof HTMLElement) {
        const chartId = `${baseId}-${index}`
        capturePromises.push(this.captureChart(element, chartId, options))
      }
    })

    try {
      return await Promise.all(capturePromises)
    } catch (error) {
      console.error("Failed to capture charts by selector:", error)
      return []
    }
  }
}

// Utility functions for common chart capture scenarios
export const captureRechartsChart = async (
  chartContainer: HTMLElement,
  chartId: string,
  options?: ChartCaptureOptions,
): Promise<CapturedChart> => {
  const service = ChartCaptureService.getInstance()

  // Wait for Recharts to fully render
  await new Promise((resolve) => setTimeout(resolve, 500))

  return service.captureChart(chartContainer, chartId, {
    width: 800,
    height: 400,
    scale: 2,
    backgroundColor: "#ffffff",
    ...options,
  })
}

export const captureDashboardCharts = async (): Promise<CapturedChart[]> => {
  const service = ChartCaptureService.getInstance()

  // Common selectors for dashboard charts
  const chartSelectors = [".recharts-wrapper", "[data-chart-id]", ".chart-container"]

  const allCharts: CapturedChart[] = []

  for (const selector of chartSelectors) {
    try {
      const charts = await service.captureChartsBySelector(selector, `dashboard-chart`, {
        width: 800,
        height: 400,
        scale: 2,
      })
      allCharts.push(...charts)
    } catch (error) {
      console.warn(`Failed to capture charts with selector ${selector}:`, error)
    }
  }

  return allCharts
}

// Export utility for creating chart data URLs
export const createChartDataUrl = (
  canvas: HTMLCanvasElement,
  format: "png" | "jpeg" = "png",
  quality = 0.95,
): string => {
  return canvas.toDataURL(`image/${format}`, quality)
}

// Utility to resize captured chart for PDF
export const resizeChartForPDF = (
  capturedChart: CapturedChart,
  maxWidth: number,
  maxHeight: number,
): { width: number; height: number; dataUrl: string } => {
  const { width: originalWidth, height: originalHeight, dataUrl } = capturedChart

  // Calculate aspect ratio
  const aspectRatio = originalWidth / originalHeight

  let newWidth = originalWidth
  let newHeight = originalHeight

  // Scale down if necessary
  if (newWidth > maxWidth) {
    newWidth = maxWidth
    newHeight = newWidth / aspectRatio
  }

  if (newHeight > maxHeight) {
    newHeight = maxHeight
    newWidth = newHeight * aspectRatio
  }

  return {
    width: newWidth,
    height: newHeight,
    dataUrl,
  }
}

// Chart capture hook for React components
export const useChartCapture = () => {
  const service = ChartCaptureService.getInstance()

  const captureChart = async (
    element: HTMLElement | React.RefObject<HTMLDivElement>,
    chartId: string,
    options?: ChartCaptureOptions,
  ): Promise<CapturedChart | null> => {
    try {
      if ("current" in element) {
        return await service.captureChartFromRef(element, chartId, options)
      } else {
        return await service.captureChart(element, chartId, options)
      }
    } catch (error) {
      console.error("Chart capture failed:", error)
      return null
    }
  }

  const captureMultipleCharts = async (
    charts: Array<{
      element: HTMLElement | React.RefObject<HTMLDivElement>
      id: string
      options?: ChartCaptureOptions
    }>,
  ): Promise<CapturedChart[]> => {
    const results: CapturedChart[] = []

    for (const chart of charts) {
      const captured = await captureChart(chart.element, chart.id, chart.options)
      if (captured) {
        results.push(captured)
      }
    }

    return results
  }

  const getCapturedChart = (chartId: string) => service.getCapturedChart(chartId)
  const getAllCapturedCharts = () => service.getAllCapturedCharts()
  const clearCapturedCharts = () => service.clearCapturedCharts()

  return {
    captureChart,
    captureMultipleCharts,
    getCapturedChart,
    getAllCapturedCharts,
    clearCapturedCharts,
  }
}
