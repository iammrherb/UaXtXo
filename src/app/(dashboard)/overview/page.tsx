// src/app/(dashboard)/overview/page.tsx
import React from "react";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Overview</h1>
      <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
        <p className="text-gray-300">
          Welcome to the Executive Summary. Key metrics and insights will be displayed here.
          (Content for TCO Reduction, Compliance Coverage, ROI Timeline summary, Risk Reduction, etc.)
        </p>
      </div>
      {/* Placeholder for ExecutiveSummary.tsx component */}
    </div>
  );
}
