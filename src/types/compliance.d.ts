// src/types/compliance.d.ts

import { IndustryId } from "./common"; // Updated import path
import type { OrgSizeId, ComplianceLevel } from "./common";

export interface Standard {
  id: string;
  name: string;
  version?: string;
  description?: string;
}

export interface ComplianceDataPoint {
  standardId: string;
  vendorId: string;
  coveragePercentage: number; // 0-100
  status: ComplianceLevel;
  details?: string;
  automatedByPortnox?: boolean; // Specific to Portnox value proposition
}

export interface ComplianceMatrixEntry {
  industryId: IndustryId;
  standardId: string;
  organizationSize: OrgSizeId; // Assuming OrgSizeId will be defined
  portnoxCoverage: number; // 0-100%
  competitorAverageCoverage?: number; // 0-100%
  riskScoreWithoutSolution: number; // e.g. 1-10
  riskScoreWithPortnox: number; // e.g. 1-10
}

// For Compliance Journey Visualization (React Flow)
export interface ComplianceStage {
  id: string;
  name: string;
  description: string;
  estimatedDurationDays: number;
  status: "pending" | "in-progress" | "completed" | "blocked";
  tasks: string[];
}

export interface Blocker {
  id: string;
  stageId: string;
  description: string;
  resolved: boolean;
}

// Add other compliance-related types as needed from the spec
// e.g., types for audit readiness, mappings, etc.

// This ensures the file is treated as a module.
export {};
