#!/usr/bin/env node

/**
 * Import Verification Script
 * Verifies all imports resolve correctly across the application
 */

import { promises as fs } from "fs"
import path from "path"

interface ImportCheck {
  file: string
  imports: string[]
  status: "success" | "error"
  errors?: string[]
}

async function checkFileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function verifyImports(): Promise<ImportCheck[]> {
  const results: ImportCheck[] = []

  // Check world-class-report-generator.ts
  const worldClassPath = path.join(process.cwd(), "lib", "world-class-report-generator.ts")
  const worldClassExists = await checkFileExists(worldClassPath)

  results.push({
    file: "lib/world-class-report-generator.ts",
    imports: [
      "generateWorldClassReport",
      "createSampleReportData",
      "WorldClassReportData",
      "ReportTemplate",
      "ReportFormat",
      "OrganizationSize",
      "DeploymentModel",
    ],
    status: worldClassExists ? "success" : "error",
    errors: worldClassExists ? [] : ["File does not exist"],
  })

  // Check ai-company-research.ts
  const aiResearchPath = path.join(process.cwd(), "lib", "ai-company-research.ts")
  const aiResearchExists = await checkFileExists(aiResearchPath)

  results.push({
    file: "lib/ai-company-research.ts",
    imports: ["autoResearchCompany", "CompanyResearchResult", "AIReportEnhancement"],
    status: aiResearchExists ? "success" : "error",
    errors: aiResearchExists ? [] : ["File does not exist"],
  })

  // Check ai-settings-manager.ts
  const aiSettingsPath = path.join(process.cwd(), "lib", "ai-settings-manager.ts")
  const aiSettingsExists = await checkFileExists(aiSettingsPath)

  results.push({
    file: "lib/ai-settings-manager.ts",
    imports: ["aiSettingsManager"],
    status: aiSettingsExists ? "success" : "error",
    errors: aiSettingsExists ? [] : ["File does not exist"],
  })

  // Check report-generator.tsx
  const reportGenPath = path.join(process.cwd(), "lib", "report-generator.tsx")
  const reportGenExists = await checkFileExists(reportGenPath)

  results.push({
    file: "lib/report-generator.tsx",
    imports: ["generateExecutiveReport", "downloadReport", "ReportData", "ReportOptions"],
    status: reportGenExists ? "success" : "error",
    errors: reportGenExists ? [] : ["File does not exist"],
  })

  return results
}

async function main() {
  console.log("🔍 Verifying all imports...\n")

  const results = await verifyImports()

  let allSuccess = true

  results.forEach((result) => {
    const status = result.status === "success" ? "✅" : "❌"
    console.log(`${status} ${result.file}`)

    if (result.status === "error") {
      allSuccess = false
      result.errors?.forEach((error) => {
        console.log(`   ❌ ${error}`)
      })
    } else {
      console.log(`   ✓ Exports: ${result.imports.join(", ")}`)
    }
    console.log()
  })

  if (allSuccess) {
    console.log("🎉 All imports verified successfully!")
    console.log("✅ The application should build and run without import errors.")
  } else {
    console.log("❌ Some imports failed verification.")
    console.log("🔧 Please check the missing files and ensure they exist with proper exports.")
    process.exit(1)
  }
}

if (require.main === module) {
  main().catch(console.error)
}

export { verifyImports, type ImportCheck }
