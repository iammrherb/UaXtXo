// Fix infinite calculation loop
(function() {
    console.log('🔧 Fixing calculation loop...');
    
    // Flag to prevent infinite loops
    let isCalculating = false;
    
    // Fix the dashboard refresh method
    if (window.dashboard) {
        const originalRefresh = window.dashboard.refreshVendorData;
        
        window.dashboard.refreshVendorData = function() {
            if (isCalculating) {
                console.log('⚠️ Preventing recursive calculation');
                return;
            }
            
            isCalculating = true;
            console.log('📊 Calculating vendor data...');
            
            try {
                // Call original method
                if (originalRefresh) {
                    originalRefresh.call(this);
                } else if (window.vendorCalculator) {
                    // Direct calculation if original method missing
                    if (this.config.portnoxPricing && window.vendorCalculator.setPortnoxPricing) {
                        window.vendorCalculator.setPortnoxPricing(this.config.portnoxPricing);
                    }
                    this.vendorData = window.vendorCalculator.generateVendorComparison(this.config);
                }
                
                // Log the actual TCO values for debugging
                if (this.vendorData && this.vendorData.portnox) {
                    console.log('Portnox TCO:', this.vendorData.portnox.tco);
                    console.log('Portnox 3-Year TCO:', this.vendorData.portnox.tco.tco);
                }
            } finally {
                isCalculating = false;
            }
        };
        
        // Also fix the render method to not trigger refresh
        const originalRender = window.dashboard.render;
        window.dashboard.render = function() {
            console.log('🎨 Rendering dashboard...');
            if (originalRender) {
                originalRender.call(this);
            }
        };
    }
})();
