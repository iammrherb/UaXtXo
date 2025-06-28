import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { industriesList, getIndustryById as getIndustryByIdFromLib, type Industry } from '@/lib/industries/data';
import type { IndustryId } from '@/types/common';

// Simulate async data fetching
const fetchAllIndustries = async (): Promise<Industry[]> => {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
  return industriesList;
};

const fetchIndustryById = async (id: IndustryId): Promise<Industry | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 50));
  return getIndustryByIdFromLib(id);
};

export function useIndustryData() {
  const { data: allIndustries, isLoading: isLoadingAllIndustries, error: errorAllIndustries } = useQuery<Industry[], Error>({
    queryKey: ['allIndustries'],
    queryFn: fetchAllIndustries,
    staleTime: Infinity, // Data is static
  });

  const getIndustryById = useCallback((id: IndustryId): Industry | undefined => {
    return allIndustries?.find(industry => industry.id === id);
  }, [allIndustries]);

  // Hook for a single industry
  const useSingleIndustry = (id: IndustryId | null) => {
    return useQuery<Industry | undefined, Error>({
      queryKey: ['industry', id],
      queryFn: () => id ? fetchIndustryById(id) : Promise.resolve(undefined),
      enabled: !!id,
      staleTime: Infinity,
    });
  };

  return {
    allIndustries, // This is the list: Industry[]
    isLoadingAllIndustries,
    errorAllIndustries,
    getIndustryById, // Function to get one by ID from the list
    useSingleIndustry, // Hook for reactive single industry fetch
  };
}
