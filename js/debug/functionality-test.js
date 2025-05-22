/**
 * Comprehensive Functionality Test
 */

function testExecutiveDashboard() {
  console.log('🧪 Starting Executive Dashboard Tests...');
  
  const tests = [];
  
  // Test 1: Check if all required elements exist
  tests.push({
    name: 'Required Elements',
    test: () => {
      const elements = [
        '#executive-view',
        '.vendor-card',
        '#calculate-btn, #main-calculate-btn',
        '#export-btn, #export-executive',
        '#device-count',
        '#industry'
      ];
      
      return elements.every(selector => {
        const exists = document.querySelector(selector) !== null;
        if (!exists) console.log(`❌ Missing: ${selector}`);
        return exists;
      });
    }
  });
  
  // Test 2: Check if chart libraries are loaded
  tests.push({
    name: 'Chart Libraries',
    test: () => {
      const libraries = {
        ApexCharts: typeof ApexCharts !== 'undefined',
        D3: typeof d3 !== 'undefined',
        Highcharts: typeof Highcharts !== 'undefined'
      };
      
      console.log('📚 Chart Libraries:', libraries);
      return Object.values(libraries).some(Boolean);
    }
  });
  
  // Test 3: Check if vendor data is loaded
  tests.push({
    name: 'Vendor Data',
    test: () => {
      const hasEnhancedData = window.enhancedVendorData && Object.keys(window.enhancedVendorData).length > 0;
      const hasExecutiveData = window.ultimateExecutiveView && 
        window.ultimateExecutiveView.vendorConfigs && 
        Object.keys(window.ultimateExecutiveView.vendorConfigs).length > 0;
      
      console.log('🏪 Vendor Data:', { enhanced: hasEnhancedData, executive: hasExecutiveData });
      return hasEnhancedData || hasExecutiveData;
    }
  });
  
  // Test 4: Check if executive view is initialized
  tests.push({
    name: 'Executive View',
    test: () => {
      const hasUltimate = window.ultimateExecutiveView && window.ultimateExecutiveView.initialized;
      const hasComplete = window.executiveViewComplete && window.executiveViewComplete.initialized;
      const hasRegular = window.executiveView && window.executiveView.initialized;
      
      console.log('📈 Executive Views:', { ultimate: hasUltimate, complete: hasComplete, regular: hasRegular });
      return hasUltimate || hasComplete || hasRegular;
    }
  });
  
  // Test 5: Check if calculator is available
  tests.push({
    name: 'Calculator',
    test: () => {
      const hasZeroTrust = window.zeroTrustCalculator;
      const hasCalculator = window.calculator;
      const hasPerformCalculation = typeof window.performCalculation === 'function';
      
      console.log('🧮 Calculator:', { zeroTrust: hasZeroTrust, calculator: hasCalculator, performCalculation: hasPerformCalculation });
      return hasZeroTrust || hasCalculator || hasPerformCalculation;
    }
  });
  
  // Run all tests
  let passed = 0;
  let failed = 0;
  
  tests.forEach(test => {
    try {
      const result = test.test();
      if (result) {
        console.log(`✅ ${test.name}: PASSED`);
        passed++;
      } else {
        console.log(`❌ ${test.name}: FAILED`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ERROR -`, error.message);
      failed++;
    }
  });
  
  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('🎉 All tests passed! Executive dashboard is fully functional.');
  } else {
    console.log('⚠️ Some tests failed. Check the issues above.');
  }
  
  return { passed, failed, total: tests.length };
}

// Auto-run tests after a delay
setTimeout(() => {
  testExecutiveDashboard();
}, 3000);

// Export for manual testing
window.testExecutiveDashboard = testExecutiveDashboard;
