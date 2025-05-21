// Simple dashboard test function
function testDashboard() {
    console.log('Testing dashboard functionality...');
    
    // Check if main components are loaded
    const checks = [
        { name: 'Enhanced Vendors', obj: window.ENHANCED_VENDORS },
        { name: 'Zero Trust UI', obj: window.zeroTrustUI },
        { name: 'Zero Trust Calculator', obj: window.ZeroTrustCalculator }
    ];
    
    checks.forEach(check => {
        if (check.obj) {
            console.log(`✅ ${check.name} loaded`);
        } else {
            console.warn(`❌ ${check.name} not loaded`);
        }
    });
    
    // Test calculation with default data
    if (window.zeroTrustUI) {
        try {
            window.zeroTrustUI.performCalculation();
            console.log('✅ Calculation test passed');
        } catch (error) {
            console.error('❌ Calculation test failed:', error);
        }
    }
}

// Auto-run test after page load
window.addEventListener('load', () => {
    setTimeout(testDashboard, 3000);
});
