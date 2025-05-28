// Complete fix for TCO calculations
(function() {
    console.log('🔧 Fixing TCO calculations completely...');
    
    // Wait for vendor calculator to be available
    function fixCalculations() {
        if (!window.vendorCalculator || !window.dashboard) {
            setTimeout(fixCalculations, 100);
            return;
        }
        
        // Debug current state
        console.log('Vendor Calculator available:', !!window.vendorCalculator);
        console.log('Dashboard available:', !!window.dashboard);
        
        // Fix the calculation by ensuring proper data flow
        const originalRefresh = window.dashboard.refreshVendorData;
        window.dashboard.refreshVendorData = function() {
            console.log('Refreshing vendor data with config:', this.config);
            
            if (window.vendorCalculator) {
                // Set Portnox pricing
                if (this.config.portnoxPricing) {
                    window.vendorCalculator.setPortnoxPricing(this.config.portnoxPricing);
                }
                
                // Generate comparison data
                this.vendorData = window.vendorCalculator.generateVendorComparison(this.config);
                
                // Verify data was generated
                if (this.vendorData) {
                    console.log('Generated vendor data:', Object.keys(this.vendorData));
                    
                    // Log sample vendor data for debugging
                    const sampleVendor = Object.values(this.vendorData)[0];
                    if (sampleVendor) {
                        console.log('Sample vendor TCO:', sampleVendor.tco);
                    }
                } else {
                    console.error('Failed to generate vendor data');
                }
            }
        };
        
        // Force initial calculation
        window.dashboard.refreshVendorData();
        window.dashboard.render();
    }
    
    // Also fix the vendor card rendering to show correct values
    if (window.dashboard && window.dashboard.renderVendorCards) {
        const originalRenderCards = window.dashboard.renderVendorCards;
        window.dashboard.renderVendorCards = function() {
            console.log('Rendering vendor cards with data:', this.vendorData);
            originalRenderCards.call(this);
        };
    }
    
    fixCalculations();
})();
