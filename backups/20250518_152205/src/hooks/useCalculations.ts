import { useCallback } from 'react';
import { useCalculator } from '../context/CalculatorContext';
import { calculateTco, CalculationResults } from '../utils/calculationEngine';

export const useCalculations = () => {
  const { state, dispatch } = useCalculator();
  
  // Perform TCO calculation with current state
  const performCalculation = useCallback(() => {
    // Prepare calculation parameters from state
    const params = {
      selectedVendors: state.selectedVendors,
      deviceCount: state.deviceCount,
      yearsToProject: state.yearsToProject,
      locations: state.locations,
      industry: state.industry,
      riskProfile: state.riskProfile,
      complianceRequirements: state.complianceRequirements,
      costParameters: {
        portnoxBasePricePerDevice: state.costParameters.portnoxBasePricePerDevice,
        portnoxDiscount: state.costParameters.portnoxDiscount,
        fteCost: state.costParameters.fteCost,
        fteAllocation: state.costParameters.fteAllocation,
        maintenancePercentage: state.costParameters.maintenancePercentage,
        downtimeCost: state.costParameters.downtimeCost,
        riskReduction: state.costParameters.riskReduction,
        insuranceReduction: state.costParameters.insuranceReduction,
      },
      networkRequirements: state.networkRequirements
    };
    
    // Calculate results
    const results = calculateTco(params);
    
    // Update state with calculation results
    dispatch({ type: 'SET_CALCULATION_RESULTS', payload: results });
    
    return results;
  }, [state, dispatch]);
  
  return {
    calculationResults: state.calculationResults,
    performCalculation,
    isCalculated: state.calculationResults !== null
  };
};
