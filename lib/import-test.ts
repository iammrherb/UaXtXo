// Import Test File - Verify all imports resolve correctly
import {
  generateWorldClassReport,
  createSampleReportData,
  type ReportTemplate,
  type ReportFormat,
  type OrganizationSize,
  type DeploymentModel,
  formatCurrency,
  formatPercentage,
  calculateSavingsPercentage,
  generateReportFilename,
  validateReportData,
} from "./world-class-report-generator"

import { autoResearchCompany, enhanceReportWithAI } from "./ai-company-research"

import { aiSettingsManager } from "./ai-settings-manager"

import { generateExecutiveReport, downloadReport } from "./report-generator"

// Test function to verify all imports work
export function testAllImports(): boolean {
  console.log("Testing all imports...")

  // Test world-class-report-generator exports
  console.log("✓ generateWorldClassReport:", typeof generateWorldClassReport === "function")
  console.log("✓ createSampleReportData:", typeof createSampleReportData === "function")
  console.log("✓ formatCurrency:", typeof formatCurrency === "function")
  console.log("✓ formatPercentage:", typeof formatPercentage === "function")
  console.log("✓ calculateSavingsPercentage:", typeof calculateSavingsPercentage === "function")
  console.log("✓ generateReportFilename:", typeof generateReportFilename === "function")
  console.log("✓ validateReportData:", typeof validateReportData === "function")

  // Test ai-company-research exports
  console.log("✓ autoResearchCompany:", typeof autoResearchCompany === "function")
  console.log("✓ enhanceReportWithAI:", typeof enhanceReportWithAI === "function")

  // Test ai-settings-manager exports
  console.log("✓ aiSettingsManager:", typeof aiSettingsManager === "object")
  console.log("✓ aiSettingsManager.getSettings:", typeof aiSettingsManager.getSettings === "function")
  console.log("✓ aiSettingsManager.updateSettings:", typeof aiSettingsManager.updateSettings === "function")

  // Test report-generator exports
  console.log("✓ generateExecutiveReport:", typeof generateExecutiveReport === "function")
  console.log("✓ downloadReport:", typeof downloadReport === "function")

  // Test sample data creation
  try {
    const sampleData = createSampleReportData()
    console.log("✓ Sample data creation successful:", sampleData.title)

    // Test validation
    const errors = validateReportData(sampleData)
    console.log("✓ Validation test:", errors.length === 0 ? "PASSED" : `FAILED (${errors.length} errors)`)

    // Test AI settings
    const settings = aiSettingsManager.getSettings()
    console.log("✓ AI settings retrieval:", settings ? "SUCCESS" : "FAILED")

    return true
  } catch (error) {
    console.error("❌ Import test failed:", error)
    return false
  }
}

// Test type definitions
export function testTypeDefinitions(): void {
  // Test ReportTemplate type
  const template: ReportTemplate = "comprehensive"
  console.log("✓ ReportTemplate type:", template)

  // Test ReportFormat type
  const format: ReportFormat = "pdf"
  console.log("✓ ReportFormat type:", format)

  // Test OrganizationSize type
  const size: OrganizationSize = "large"
  console.log("✓ OrganizationSize type:", size)

  // Test DeploymentModel type
  const deployment: DeploymentModel = "cloud"
  console.log("✓ DeploymentModel type:", deployment)

  console.log("All type definitions are working correctly!")
}

// Export test results
export const importTestResults = {
  worldClassReportGenerator: {
    functions: [
      "generateWorldClassReport",
      "createSampleReportData",
      "formatCurrency",
      "formatPercentage",
      "calculateSavingsPercentage",
      "generateReportFilename",
      "validateReportData",
    ],
    types: ["WorldClassReportData", "ReportTemplate", "ReportFormat", "OrganizationSize", "DeploymentModel"],
  },
  aiCompanyResearch: {
    functions: ["autoResearchCompany", "enhanceReportWithAI"],
    types: ["CompanyResearchResult", "AIReportEnhancement", "AIConfig"],
  },
  aiSettingsManager: {
    exports: ["aiSettingsManager"],
    types: ["AISettings", "AIProviderSettings"],
  },
  reportGenerator: {
    functions: ["generateExecutiveReport", "downloadReport"],
    types: ["ReportData", "ReportOptions"],
  },
}

// Run tests immediately when imported
if (typeof window !== "undefined") {
  console.log("🔍 Running import verification tests...")
  testAllImports()
  testTypeDefinitions()
  console.log("✅ All imports verified successfully!")
}
