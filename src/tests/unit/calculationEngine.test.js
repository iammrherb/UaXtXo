/**
 * Unit tests for the calculation engine
 */

// Import the calculation engine
const { calculateTco } = require('../../utils/calculationEngine');

describe('Calculation Engine', () => {
  // Test data
  const testParams = {
    selectedVendors: ['portnox', 'cisco'],
    deviceCount: 500,
    yearsToProject: 3,
    locations: 2,
    industry: 'financial',
    riskProfile: 'standard',
    complianceRequirements: {
      pci: true,
      hipaa: false,
      nist: false,
      gdpr: false,
      iso: false,
      cmmc: false,
      ferpa: false,
      sox: false
    },
    costParameters: {
      portnoxBasePricePerDevice: 3.00,
      portnoxDiscount: 15,
      fteCost: 100000,
      fteAllocation: 25,
      maintenancePercentage: 18,
      downtimeCost: 5000,
      riskReduction: 35,
      insuranceReduction: 10,
    },
    networkRequirements: {
      cloudIntegration: false,
      legacyDevices: false,
      byodSupport: true,
      iotSupport: false,
      wirelessSupport: true,
      remoteWork: true
    }
  };

  test('returns results for all selected vendors', () => {
    const results = calculateTco(testParams);
    
    expect(results.vendorResults).toBeDefined();
    expect(Array.isArray(results.vendorResults)).toBe(true);
    
    // Check if all vendors are present
    const vendorIds = results.vendorResults.map(v => v.vendorId);
    expect(vendorIds).toEqual(expect.arrayContaining(testParams.selectedVendors));
  });

  test('calculates TCO correctly for Portnox', () => {
    const results = calculateTco(testParams);
    const portnoxResult = results.vendorResults.find(v => v.vendorId === 'portnox');
    
    expect(portnoxResult).toBeDefined();
    
    // Basic smoke test: TCO should equal sum of all cost components
    const { totalTco, subscriptionCost, implementationCost, staffingCost, hardwareCost, infrastructureCost } = portnoxResult;
    const calculatedTotal = subscriptionCost + implementationCost + staffingCost + hardwareCost + infrastructureCost;
    
    expect(totalTco).toBeCloseTo(calculatedTotal, 2); // Allow for rounding differences
  });

  test('calculates savings and comparison metrics', () => {
    const results = calculateTco(testParams);
    
    // Check comparison section exists
    expect(results.comparisonResults).toBeDefined();
    
    // Cisco comparison should exist (since it's in the selectedVendors)
    const ciscoComparison = results.comparisonResults.cisco;
    expect(ciscoComparison).toBeDefined();
    
    // Sanity checks on comparison metrics
    expect(ciscoComparison.savings).toBeGreaterThan(0); // Portnox should be cheaper
    expect(ciscoComparison.savingsPercentage).toBeGreaterThan(0);
  });

  test('calculates executive summary metrics', () => {
    const results = calculateTco(testParams);
    
    expect(results.executiveSummary).toBeDefined();
    
    const { totalSavings, savingsPercentage, paybackPeriod, riskReduction } = results.executiveSummary;
    
    // Basic sanity checks
    expect(totalSavings).toBeGreaterThanOrEqual(0);
    expect(savingsPercentage).toBeGreaterThanOrEqual(0);
    expect(paybackPeriod).toBeGreaterThanOrEqual(0);
    expect(riskReduction).toBeGreaterThanOrEqual(0);
  });
});
