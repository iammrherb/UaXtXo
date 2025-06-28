// src/types/visualization.d.ts

import type { OrgSizeId, IndustryId, ComplianceLevel } from "./common";

// For 3D Network Topology (Three.js)
export interface NetworkNode3D {
  id: string;
  type: "user" | "device" | "application" | "data_store" | "network_segment";
  label: string;
  trustScore: number; // 0-100
  complianceStatus: ComplianceLevel; // Reuse from compliance.d.ts
  position?: [x: number, y: number, z: number]; // Optional, can be calculated
  vulnerabilities?: number; // Count of vulnerabilities
  dataSensitivity?: "low" | "medium" | "high";
}

export interface NetworkConnection3D {
  id: string;
  source: string; // ID of source NetworkNode3D
  target: string; // ID of target NetworkNode3D
  trafficType?: string; // e.g., "API Call", "Database Query"
  isEncrypted?: boolean;
  isMonitoredByPortnox?: boolean;
}

// For TCO Waterfall Analysis (Recharts or other)
export interface TCOWaterfallItem {
  category: "License Fees" | "Hardware/Infrastructure" | "Personnel/Labor" | "Training & Development" | "Compliance Overhead" | "Implementation Services" | "Support & Maintenance" | "Hidden Costs";
  vendorId: string; // To associate with a vendor
  value: number; // Positive for cost, negative for savings/reduction
  cumulative?: number; // Calculated for waterfall display
  type?: "cost" | "saving"; // To differentiate bars
}

// General data point for radar charts (Recharts, Nivo)
export interface RadarChartDataPoint {
  subject: string; // e.g., "Feature A", "Security Aspect"
  portnoxScore: number;
  competitorAverageScore?: number;
  traditionalNACScore?: number; // Specifically for Risk Radar
  fullMark?: number; // Optional, defaults to 100
}

// For Treemap (Recharts, Nivo) - visualizing cost savings or TCO components
export interface TreemapNode {
  name: string;
  value?: number; // Size of the node
  color?: string;
  children?: TreemapNode[];
}

// For Funnel Chart (Recharts, Nivo) - e.g., Compliance Funnel
export interface FunnelStep {
  id: string;
  name: string; // e.g., "Initial Assessment", "Policy Definition", "Full Coverage"
  value: number; // Number of entities (devices, users, requirements) at this stage
  fillColor?: string;
}


// This ensures the file is treated as a module.
export {};
