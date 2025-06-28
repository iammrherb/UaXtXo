// src/app/(dashboard)/portnox/page.tsx
"use client"; // Required because PortnoxPlatformView uses client hooks

import React from "react";
import PortnoxPlatformView from "@/components/dashboard/portnox/PortnoxPlatformView"; // Adjust path if necessary

export default function PortnoxPlatformPage() {
  return (
    <PortnoxPlatformView />
  );
}
