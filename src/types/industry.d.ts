// src/types/industry.d.ts

import { Standard } from "./compliance"; // Assuming Standard is defined in compliance.d.ts
import type { IndustryId } from "./common";

export interface Industry {
  id: IndustryId;
  name: string;
  description?: string;
  complianceStandards: Standard[]; // List of applicable standards
  keyPainPoints: string[];
  averageTCOForNAC?: number; // For comparison
  portnoxMarketSharePercent?: number;
  // ... other industry-specific data points mentioned in the spec
}

// Example for the matrix provided in the spec
export interface IndustryMatrixRecord {
  industry: IndustryId;
  primaryStandards: string; // Could be Standard[] later
  secondaryStandards: string; // Could be Standard[] later
  keyRequirements: string;
}

// This ensures the file is treated as a module.
export {};
