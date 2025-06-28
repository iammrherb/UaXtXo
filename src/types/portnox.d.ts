// src/types/portnox.d.ts

export interface PortnoxFeatureBenefit {
  featureName: string;
  benefitDescription: string;
  relevantComplianceIds?: string[]; // IDs of compliance standards this helps with
  tcoReductionFactor?: number; // e.g., 0.1 for 10% reduction in a cost category
}

export interface PortnoxCapabilityMetrics {
  riskBasedAuthenticationCoverage: number; // Percentage
  continuousMonitoringEffectiveness: number; // Percentage
  automatedRemediationSuccessRate: number; // Percentage
  isCloudNative: boolean;
  agentlessDeploymentRate: number; // Percentage
}

export interface PortnoxIntegrationStatus {
  systemName: string; // e.g., "Azure AD", "Splunk", "ServiceNow"
  integrationType: "Identity" | "SIEM" | "SOAR" | "ITSM" | "Firewall";
  status: "Native" | "API-based" | "Planned" | "Not Available";
  detailsUrl?: string;
}

// This ensures the file is treated as a module.
export {};
