"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { OrgSizeId, IndustryId } from '@/types/common';

interface DashboardContextType {
  selectedOrgSize: OrgSizeId;
  setSelectedOrgSize: (orgSize: OrgSizeId) => void;
  selectedIndustry: IndustryId;
  setSelectedIndustry: (industry: IndustryId) => void;
  comparisonYears: number;
  setComparisonYears: (years: number) => void;
  // Add other global settings as needed, e.g., selected competitor vendors for comparison
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [selectedOrgSize, setSelectedOrgSize] = useState<OrgSizeId>("mid_market");
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId>("technology");
  const [comparisonYears, setComparisonYears] = useState<number>(3);

  return (
    <DashboardContext.Provider value={{
      selectedOrgSize,
      setSelectedOrgSize,
      selectedIndustry,
      setSelectedIndustry,
      comparisonYears,
      setComparisonYears,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardSettings = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboardSettings must be used within a DashboardProvider');
  }
  return context;
};
