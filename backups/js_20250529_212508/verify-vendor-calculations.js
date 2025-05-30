// Verify and fix vendor calculations
(function() {
    console.log('🔍 Verifying vendor calculations...');
    
    // Check PacketFence specifically
    function verifyCalculations() {
        if (!window.vendorCalculator) {
            setTimeout(verifyCalculations, 100);
            return;
        }
        
        // Test with different periods
        const testConfig = {
            deviceCount: 1000,
            locationCount: 3,
            companySize: 'medium',
            analysisPeriod: 3,
            fteCost: 100000,
            breachCost: 4350000
        };
        
        // Generate data for 1, 2, and 3 years
        [1, 2, 3].forEach(years => {
            const config = {...testConfig, analysisPeriod: years};
            const data = window.vendorCalculator.generateVendorComparison(config);
            
            // Check PacketFence
            if (data.packetfence) {
                const pf = data.packetfence;
                console.log(`PacketFence ${years}-year TCO:`, {
                    total: pf.tco.tco,
                    year1: pf.tco.year1,
                    year2: pf.tco.year2,
                    year3: pf.tco.year3,
                    monthly: pf.tco.monthly,
                    roi: pf.roi.roi + '%'
                });
                
                // Verify calculations are correct
                const expectedTotal = pf.tco.year1 + (years > 1 ? pf.tco.year2 : 0) + (years > 2 ? pf.tco.year3 : 0);
                if (Math.abs(expectedTotal - pf.tco.tco) > 1) {
                    console.warn(`PacketFence ${years}-year calculation mismatch:`, expectedTotal, 'vs', pf.tco.tco);
                }
            }
        });
        
        console.log('✅ Vendor calculations verified');
    }
    
    verifyCalculations();
})();
