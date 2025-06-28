// src/app/(dashboard)/compliance/page.tsx
"use client"; // Required because ComplianceOverview uses client hooks

import React from "react";
import ComplianceOverview from "@/components/charts/dashboards/ComplianceOverview"; // Adjust path if necessary

export default function CompliancePage() {
  return (
    <ComplianceOverview />
  );
}
