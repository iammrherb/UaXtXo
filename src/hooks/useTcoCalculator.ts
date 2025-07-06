import { useCallback } from 'react';
import {
  calculateFullTCOForVendor,
  compareMultipleVendorsTCO,
  type TCOResult
} from '@/lib/calculators/tco';
import type { VendorId } from '@/lib/vendors/data';
import type { OrgSizeId, IndustryId } from '@/types/common';

interface CalculateTcoParams {
  vendorIds: VendorId[];
  orgSizeId: OrgSizeId;
  industryId: IndustryId;
  projectionYears: number;
}

export function useTcoCalculator() {
  // This hook primarily provides wrapped calculation functions.
  // It doesn't manage its own state via useQuery directly for the calculation itself,
  // as the calculation is synchronous based on data already "fetched" by other hooks.
  // If calculations were very heavy or server-side, useMutation or useQuery might be used here.

  const calculateAllSelectedVendorsTco = useCallback(
    (params: CalculateTcoParams): TCOResult[] => {
      if (!params.vendorIds || params.vendorIds.length === 0) {
        return [];
      }
      // The compareMultipleVendorsTCO function already handles calling calculateFullTCOForVendor for each
      // and sorts them.
      return compareMultipleVendorsTCO(
        params.vendorIds,
        params.orgSizeId,
        params.industryId,
        params.projectionYears
      );
    },
    [] // No dependencies, as the function itself is stable and relies on imported pure functions.
  );

  const calculateSingleVendorTco = useCallback(
    (vendorId: VendorId, orgSizeId: OrgSizeId, industryId: IndustryId, projectionYears: number): TCOResult | null => {
        return calculateFullTCOForVendor(vendorId, orgSizeId, industryId, projectionYears);
    },
    []
  );

  return {
    calculateAllSelectedVendorsTco,
    calculateSingleVendorTco,
  };
}
