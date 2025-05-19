// @ts-nocheck
import { useCallback } from 'react';
import { useCalculator } from '../context/CalculatorContext';
import { calculateTco, CalculationParams } from '../utils/calculationEngine';

/**
 * Hook to handle calculation logic
 */
export const useCalculations = () => {
  const { state, dispatch } = useCalculator();

  const runCalculations = useCallback(() => {
    // Make sure we have the necessary data to run calculations
    if (!state.deviceCount || state.selectedVendors.length === 0) {
      dispatch({ type: 'SET_CALCULATION_RESULTS', payload: null });
      return;
    }

    // Prepare parameters for calculation
    const params: CalculationParams = {
      selectedVendors: state.selectedVendors,
      deviceCount: state.deviceCount,
      yearsToProject: state.yearsToProject || 3,
      locations: state.locations || 1,
      industry: state.industry || 'general',
      riskProfile: state.riskProfile || 'medium',
      complianceRequirements: state.complianceRequirements || {},
      costParameters: {
        // Provide all required costParameters with defaults if not present in state
        portnoxBasePricePerDevice: state.costParameters?.portnoxBasePricePerDevice || 25,
        portnoxDiscount: state.costParameters?.portnoxDiscount || 0,
        fteCost: state.costParameters?.fteCost || 120000,
        fteAllocation: state.costParameters?.fteAllocation || 0.25,
        maintenancePercentage: state.costParameters?.maintenancePercentage || 0.2,
        downtimeCost: state.costParameters?.downtimeCost || 10000,
        riskReduction: state.costParameters?.riskReduction || 0.65,
        insuranceReduction: state.costParameters?.insuranceReduction || 0.15,
        // Include any additional parameters from the original state
        laborCostPerHour: state.costParameters?.laborCostPerHour || 75,
        itStaffCount: state.costParameters?.itStaffCount || 5,
        avgBreachCost: state.costParameters?.avgBreachCost || 150000,
        securityIncidentsPerYear: state.costParameters?.securityIncidentsPerYear || 12
      },
      networkRequirements: {
        cloudIntegration: state.networkRequirements?.cloudIntegration || false,
        legacyDevices: state.networkRequirements?.legacyDevices || false,
        byodSupport: state.networkRequirements?.byodSupport || false,
        iotSupport: state.networkRequirements?.iotSupport || false,
        wirelessSupport: state.networkRequirements?.wirelessSupport || false,
        remoteWork: state.networkRequirements?.remoteWork || false
      }
    };

    // Calculate results
    const results = calculateTco(params);

    // Update state with calculation results
    dispatch({ type: 'SET_CALCULATION_RESULTS', payload: results });
  }, [
    state.deviceCount,
    state.selectedVendors,
    state.yearsToProject,
    state.locations,
    state.industry,
    state.riskProfile,
    state.complianceRequirements,
    state.costParameters,
    state.networkRequirements,
    dispatch
  ]);

  return { runCalculations };
};

// Also export as default for backward compatibility
export default useCalculations;
