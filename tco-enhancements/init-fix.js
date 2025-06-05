// Fix initialization order
(function() {
    console.log('🔧 Initializing TCO fixes...');
    
    // Ensure Highcharts is loaded properly
    if (typeof Highcharts === 'undefined') {
        console.error('Highcharts not loaded!');
        return;
    }
    
    // Initialize selected vendors if not exists
    if (!window.selectedVendors) {
        window.selectedVendors = ['portnox', 'cisco', 'aruba'];
    }
    
    // Fix any undefined functions
    window.calculateQuickTCO = window.calculateQuickTCO || function(vendor) {
        const devices = 5000;
        const years = 3;
        let tco = 0;
        
        if (vendor.pricing && vendor.pricing.perDevice) {
            if (vendor.pricing.perDevice.negotiated) {
                tco = vendor.pricing.perDevice.negotiated * devices * 12 * years;
            }
        }
        
        tco += vendor.operations.fte * 120000 * years;
        tco += vendor.hiddenCosts.total || 0;
        
        return tco;
    };
    
    console.log('✅ Initialization fixes applied');
})();
