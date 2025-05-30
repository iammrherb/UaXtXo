/**
 * Initialization Monitor - Ensures single initialization
 */

(function() {
    // Track initialization state
    window._initState = {
        dashboard: false,
        vendorData: false,
        charts: false,
        complete: false
    };
    
    // Monitor initialization
    const checkInit = setInterval(() => {
        if (window.dashboard && !window._initState.dashboard) {
            window._initState.dashboard = true;
            console.log('✅ Dashboard initialized');
        }
        
        if (window.vendorCalculator && !window._initState.vendorData) {
            window._initState.vendorData = true;
            console.log('✅ Vendor data initialized');
        }
        
        if (window.riskAssessmentCharts && window.complianceCharts && !window._initState.charts) {
            window._initState.charts = true;
            console.log('✅ Charts initialized');
        }
        
        if (window._initState.dashboard && window._initState.vendorData && window._initState.charts && !window._initState.complete) {
            window._initState.complete = true;
            clearInterval(checkInit);
            console.log('🎉 All systems operational!');
            
            // Run feature test automatically
            if (window.testAllFeatures) {
                setTimeout(window.testAllFeatures, 1000);
            }
        }
    }, 500);
    
    // Timeout after 10 seconds
    setTimeout(() => clearInterval(checkInit), 10000);
})();
