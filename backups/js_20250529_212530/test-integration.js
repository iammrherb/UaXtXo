/**
 * Integration Test Suite
 * Verifies all enhancements are working correctly
 */

function testIntegration() {
    console.log('🧪 Running Integration Tests...');
    
    const tests = {
        'Executive Platform': () => !!window.zeroTrustExecutivePlatform,
        'Platform Integration': () => !!window.executivePlatformIntegration,
        'Enhanced Calculations': () => !!window.enhancedCalculationSystem,
        'Chart Enhancements': () => !!window.chartEnhancementLayer,
        'Comprehensive Integration': () => !!window.comprehensiveIntegration,
        'Highcharts Loaded': () => typeof Highcharts !== 'undefined',
        'Vendor Data Available': () => !!window.zeroTrustExecutivePlatform?.vendorData
    };
    
    let passed = 0;
    let failed = 0;
    
    Object.entries(tests).forEach(([name, test]) => {
        try {
            const result = test();
            console.log(`${result ? '✅' : '❌'} ${name}`);
            result ? passed++ : failed++;
        } catch (error) {
            console.log(`❌ ${name} - Error: ${error.message}`);
            failed++;
        }
    });
    
    console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
    
    if (failed === 0) {
        console.log('🎉 All integration tests passed!');
    } else {
        console.log('⚠️  Some tests failed. Check the implementation.');
    }
}

// Run tests after page load
window.addEventListener('load', () => {
    setTimeout(testIntegration, 3000);
});
