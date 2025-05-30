// Proper initialization
(function() {
    console.log('🚀 Starting proper initialization...');
    
    function initialize() {
        if (!window.dashboard || !window.vendorCalculator) {
            console.log('⏳ Waiting for components...');
            setTimeout(initialize, 100);
            return;
        }
        
        console.log('✅ All components ready, initializing...');
        
        // Force a single calculation
        window.dashboard.config = window.dashboard.loadConfiguration();
        window.dashboard.refreshVendorData();
        
        // Wait for data then render
        setTimeout(() => {
            window.dashboard.render();
            window.dashboard.updateKPIs();
            window.dashboard.addHelpToKPIs();
            console.log('✅ Initialization complete');
        }, 100);
    }
    
    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
