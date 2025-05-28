// Diagnostic script for TCO calculations
(function() {
    console.log('🔍 DIAGNOSTIC: Starting TCO diagnostic...');
    
    // Check what's available
    console.log('Window objects available:', {
        vendorCalculator: !!window.vendorCalculator,
        dashboard: !!window.dashboard,
        vendorData: !!window.comprehensiveVendorData,
        enhancedCalculations: !!window.EnhancedVendorCalculator
    });
    
    // Test vendor calculator directly
    if (window.vendorCalculator) {
        console.log('📊 Testing vendor calculator...');
        
        const testConfig = {
            deviceCount: 1000,
            locationCount: 3,
            companySize: 'medium',
            analysisPeriod: 3,
            fteCost: 100000,
            breachCost: 4350000
        };
        
        try {
            const result = window.vendorCalculator.generateVendorComparison(testConfig);
            console.log('✅ Vendor calculator result:', result);
            
            // Check Portnox specifically
            if (result && result.portnox) {
                console.log('Portnox data:', {
                    tco: result.portnox.tco,
                    costs: result.portnox.costs,
                    roi: result.portnox.roi,
                    metrics: result.portnox.metrics
                });
            } else {
                console.error('❌ No Portnox data in result');
            }
        } catch (error) {
            console.error('❌ Error calling vendor calculator:', error);
        }
    }
    
    // Check the enhanced vendor calculator
    if (window.EnhancedVendorCalculator) {
        console.log('🔧 Found EnhancedVendorCalculator, creating instance...');
        window.vendorCalculator = new window.EnhancedVendorCalculator();
        console.log('✅ Created new vendor calculator instance');
    }
    
    // Force dashboard to use correct calculator
    if (window.dashboard && window.vendorCalculator) {
        console.log('🔄 Reconnecting dashboard to vendor calculator...');
        
        window.dashboard.refreshVendorData = function() {
            console.log('📊 Dashboard refreshing vendor data...');
            
            try {
                this.vendorData = window.vendorCalculator.generateVendorComparison(this.config);
                console.log('✅ Vendor data generated:', Object.keys(this.vendorData || {}));
                
                // Verify Portnox data
                if (this.vendorData && this.vendorData.portnox) {
                    const portnoxTCO = this.vendorData.portnox.tco?.tco || 0;
                    console.log('Portnox 3-Year TCO: $' + (portnoxTCO / 1000).toFixed(0) + 'K');
                }
            } catch (error) {
                console.error('❌ Error in refreshVendorData:', error);
            }
        };
        
        // Force refresh
        window.dashboard.refreshVendorData();
        window.dashboard.render();
    }
})();
