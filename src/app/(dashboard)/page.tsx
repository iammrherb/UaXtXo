// src/app/(dashboard)/page.tsx
"use client"; // Required if ExecutiveSummary or its children use client hooks like useState, useEffect

import React from "react";
import ExecutiveSummary from "@/components/charts/dashboards/ExecutiveSummary"; // Adjust path if necessary

export default function DashboardRootPage() {
  // Here you might fetch global settings or user preferences
  // that could be passed down to ExecutiveSummary, e.g., default comparison vendors, org size.
  // For now, ExecutiveSummary uses its own internal defaults.

  return (
    <div className="space-y-6">
      {/* The main h1 title might be part of the ExecutiveSummary component itself or kept here */}
      {/* <h1 className="text-3xl font-bold text-white">Overview</h1> */}

      <ExecutiveSummary
        // Example of passing props if needed later:
        // selectedOrgSize="enterprise"
        // selectedIndustry="financial_services"
        // comparisonYears={5}
        // primaryVendorId="portnox"
        // competitorVendorIds={["cisco_ise", "aruba_clearpass"]}
      />

      {/* You can add more sections to the overview page if needed */}
      {/*
      <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">Additional Overview Stats</h2>
        <p className="text-gray-300">
          More summary information or quick links could go here.
        </p>
      </div>
      */}
    </div>
  );
}
