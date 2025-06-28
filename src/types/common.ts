// src/types/common.ts

export type OrgSizeId =
  | "small_business"     // 1-100 users
  | "mid_market"         // 100-1K users
  | "enterprise"         // 1K-10K users
  | "global_enterprise"; // 10K+ users

export type IndustryId =
  | "healthcare"
  | "financial_services"
  | "government"
  | "education"
  | "retail"
  | "manufacturing"
  | "technology"
  | "energy_utilities"
  | "pharmaceuticals"
  | "telecommunications"
  | "legal_services"
  | "insurance";

// Add other common types/enums here as needed
// For example, a more structured way for ComplianceLevel could also be here
export type ComplianceLevel = "NotCovered" | "Partial" | "Covered" | "Exceeds";
