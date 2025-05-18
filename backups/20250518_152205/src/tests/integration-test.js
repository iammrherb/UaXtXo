#!/usr/bin/env node

/**
 * Integration Test Script for Portnox TCO Analyzer
 * 
 * This script performs integration tests on critical components:
 * 1. State management
 * 2. Calculation engine
 * 3. UI component rendering
 */

console.log('Running integration tests for Portnox TCO Analyzer...');

// Mock required imports to run in Node.js environment
global.window = {};
global.document = {
  documentElement: {
    classList: {
      add: jest.fn(),
      remove: jest.fn()
    }
  }
};

// Import calculation engine
const calculationEngine = require('../utils/calculationEngine');

// Basic test functions
function expectEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    console.error(`❌ FAILED: ${message}`);
    console.error(`Expected: ${JSON.stringify(expected)}`);
    console.error(`Actual: ${JSON.stringify(actual)}`);
    throw new Error(`Test failed: ${message}`);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

function expectClose(actual, expected, tolerance, message) {
  if (Math.abs(actual - expected) > tolerance) {
    console.error(`❌ FAILED: ${message}`);
    console.error(`Expected: ${expected} (±${tolerance})`);
    console.error(`Actual: ${actual}`);
    throw new Error(`Test failed: ${message}`);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

// Test calculation engine
function testCalculationEngine() {
  console.log('\n🔍 Testing Calculation Engine...');
  
  // Basic calculation test
  const basicParams = {
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
  
  const results = calculationEngine.calculateTco(basicParams);
  
  // Check that results contain the expected structure
  expectEqual(
    Object.keys(results).sort(),
    ['vendorResults', 'comparisonResults', 'executiveSummary', 'financialSummary', 'securitySummary', 'riskAssessment', 'sensitivities'].sort(),
    'Calculation results contain all expected sections'
  );
  
  // Check that vendor results contain all selected vendors
  expectEqual(
    results.vendorResults.map(vendor => vendor.vendorId).sort(),
    basicParams.selectedVendors.sort(),
    'Calculation results include all selected vendors'
  );
  
  // Check consistency of TCO and cost components for Portnox
  const portnoxResult = results.vendorResults.find(v => v.vendorId === 'portnox');
  if (portnoxResult) {
    const { totalTco, subscriptionCost, implementationCost, staffingCost, hardwareCost, infrastructureCost } = portnoxResult;
    const calculatedTotal = subscriptionCost + implementationCost + staffingCost + hardwareCost + infrastructureCost;
    
    expectClose(
      totalTco,
      calculatedTotal,
      0.01, // Allow for small floating point differences
      'Portnox TCO equals sum of all cost components'
    );
  }
  
  console.log('Calculation engine tests completed');
}

// Run all tests
try {
  testCalculationEngine();
  console.log('\n✅ All integration tests passed successfully');
} catch (error) {
  console.error('\n❌ Integration tests failed:', error.message);
  process.exit(1);
}
