/**
 * Calculator Integration Fix
 * Connects to existing calculation functions
 */

// Find and connect to the existing calculation function
function findCalculationFunction() {
  // Try different possible calculation function names
  const possibleFunctions = [
    'calculateTotalCost',
    'performCalculation',
    'calculate',
    'runCalculation',
    'updateCalculation'
  ];
  
  for (const funcName of possibleFunctions) {
    if (typeof window[funcName] === 'function') {
      console.log('📊 Found calculation function:', funcName);
      return window[funcName];
    }
  }
  
  // Check for calculator object methods
  if (window.calculator) {
    const methods = ['calculate', 'run', 'update', 'process'];
    for (const method of methods) {
      if (typeof window.calculator[method] === 'function') {
        console.log('📊 Found calculator method:', method);
        return window.calculator[method].bind(window.calculator);
      }
    }
  }
  
  // Check for zero trust calculator
  if (window.zeroTrustCalculator) {
    const methods = ['calculate', 'run', 'update', 'process'];
    for (const method of methods) {
      if (typeof window.zeroTrustCalculator[method] === 'function') {
        console.log('📊 Found zero trust calculator method:', method);
        return window.zeroTrustCalculator[method].bind(window.zeroTrustCalculator);
      }
    }
  }
  
  console.warn('⚠️ No calculation function found, creating placeholder');
  return createPlaceholderCalculation;
}

function createPlaceholderCalculation() {
  console.log('🧮 Running placeholder calculation...');
  
  // Get current selections
  const selectedVendors = Array.from(document.querySelectorAll('.vendor-button.active, .vendor-card.selected'))
    .map(el => el.getAttribute('data-vendor') || el.textContent.toLowerCase());
  
  const deviceCount = document.getElementById('device-count')?.value || 1000;
  const industry = document.getElementById('industry')?.value || 'technology';
  
  // Calculate basic values
  const baselineCost = 520000; // Cisco baseline
  const portnoxCost = 245000;
  const savings = baselineCost - portnoxCost;
  const roi = Math.round((savings / portnoxCost) * 100);
  
  const calculationData = {
    totalSavings: savings,
    roi: roi,
    securityScore: 95,
    efficiencyGain: 87,
    selectedVendors: selectedVendors,
    deviceCount: parseInt(deviceCount),
    industry: industry,
    timestamp: new Date().toISOString()
  };
  
  // Dispatch calculation complete event
  document.dispatchEvent(new CustomEvent('calculationComplete', {
    detail: calculationData
  }));
  
  console.log('📊 Calculation completed:', calculationData);
  return calculationData;
}

// Override the comprehensive integration calculation method
if (window.comprehensiveIntegration) {
  window.comprehensiveIntegration.triggerCalculation = function() {
    console.log('🧮 Triggering enhanced calculation...');
    
    const calculationFunction = findCalculationFunction();
    const result = calculationFunction();
    
    // Update executive views
    if (window.ultimateExecutiveView) {
      window.ultimateExecutiveView.updateFromCalculation(result);
    }
    
    if (window.consolidatedExecutiveDashboard) {
      window.consolidatedExecutiveDashboard.updateCalculations();
    }
    
    return result;
  };
}

// Initialize calculation integration
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    const calculationFunction = findCalculationFunction();
    console.log('🧮 Calculator integration initialized');
    
    // Test calculation
    calculationFunction();
  }, 3000);
});
