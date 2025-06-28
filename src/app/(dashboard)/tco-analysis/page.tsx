// src/app/(dashboard)/tco-analysis/page.tsx
"use client"; // Required because TcoAnalysisView uses client hooks

import React from "react";
import TcoAnalysisView from "@/components/dashboard/tco/TcoAnalysisView"; // Adjust path if necessary

export default function TCOAnalysisPage() {
  return (
    <TcoAnalysisView />
  );
}
