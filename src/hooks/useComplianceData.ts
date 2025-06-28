import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { complianceStandardsList, getComplianceStandardById as getStandardByIdFromLib, type ComplianceStandard } from '@/lib/compliance/standards';
import type { IndustryId } from '@/types/common';

// Simulate async data fetching
const fetchAllComplianceStandards = async (): Promise<ComplianceStandard[]> => {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
  return complianceStandardsList;
};

const fetchComplianceStandardById = async (id: string): Promise<ComplianceStandard | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 50));
  return getStandardByIdFromLib(id);
};

export function useComplianceData() {
  const { data: allStandards, isLoading: isLoadingAllStandards, error: errorAllStandards } = useQuery<ComplianceStandard[], Error>({
    queryKey: ['allComplianceStandards'],
    queryFn: fetchAllComplianceStandards,
    staleTime: Infinity, // Data is static
  });

  const getComplianceStandardById = useCallback((id: string): ComplianceStandard | undefined => {
    // Can use the function from the lib directly if data is already loaded and transformed by useQuery,
    // or filter the 'allStandards' array. For simplicity with static data:
    return allStandards?.find(standard => standard.id === id);
  }, [allStandards]);

  const getStandardsByIndustry = useCallback((industryId: IndustryId): ComplianceStandard[] => {
    if (!allStandards) return [];
    return allStandards.filter(standard => standard.applicableIndustries.includes(industryId));
  }, [allStandards]);

  // Hook for a single standard, could be useful for detail pages
  const useSingleComplianceStandard = (id: string | null) => {
    return useQuery<ComplianceStandard | undefined, Error>({
      queryKey: ['complianceStandard', id],
      queryFn: () => id ? fetchComplianceStandardById(id) : Promise.resolve(undefined),
      enabled: !!id,
      staleTime: Infinity,
    });
  };

  return {
    allStandards,
    isLoadingAllStandards,
    errorAllStandards,
    getComplianceStandardById,
    getStandardsByIndustry,
    useSingleComplianceStandard,
  };
}
