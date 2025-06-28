// src/app/(dashboard)/vendor-comparison/page.tsx
"use client"; // Required because VendorComparisonView uses client hooks

import React from "react";
import VendorComparisonView from "@/components/dashboard/vendorcomp/VendorComparisonView"; // Adjust path if necessary

export default function VendorComparisonPage() {
  return (
    <VendorComparisonView />
  );
}
