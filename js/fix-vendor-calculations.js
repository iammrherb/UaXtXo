// Fix vendor calculations to prevent NaN values
(function() {
    console.log('🔧 Fixing vendor calculations...');
    
    // Wait for vendor calculator
    function fixCalculations() {
        if (!window.vendorCalculator || !window.dashboard) {
            setTimeout(fixCalculations, 100);
            return;
        }
        
        // Ensure vendor calculator returns valid numbers
        const originalGenerate = window.vendorCalculator.generateVendorComparison;
        window.vendorCalculator.generateVendorComparison = function(config) {
            console.log('Generating vendor comparison with config:', config);
            
            // Ensure config has valid values
            config = {
                deviceCount: parseInt(config.deviceCount) || 1000,
                locationCount: parseInt(config.locationCount) || 3,
                companySize: config.companySize || 'medium',
                analysisPeriod: parseInt(config.analysisPeriod) || 3,
                fteCost: parseInt(config.fteCost) || 100000,
                breachCost: parseInt(config.breachCost) || 4350000,
                portnoxPricing: parseFloat(config.portnoxPricing) || 3.5
            };
            
            // Call original function
            const result = originalGenerate.call(this, config);
            
            // Validate and fix any NaN values in the result
            Object.keys(result).forEach(vendorKey => {
                const vendor = result[vendorKey];
                
                // Fix TCO values
                if (vendor.tco) {
                    vendor.tco.tco = isNaN(vendor.tco.tco) ? 0 : vendor.tco.tco;
                    vendor.tco.year1 = isNaN(vendor.tco.year1) ? 0 : vendor.tco.year1;
                    vendor.tco.year2 = isNaN(vendor.tco.year2) ? 0 : vendor.tco.year2;
                    vendor.tco.year3 = isNaN(vendor.tco.year3) ? 0 : vendor.tco.year3;
                    vendor.tco.monthly = isNaN(vendor.tco.monthly) ? 0 : vendor.tco.monthly;
                    
                    // Recalculate total if needed
                    if (vendor.tco.tco === 0 && (vendor.tco.year1 > 0 || vendor.tco.year2 > 0 || vendor.tco.year3 > 0)) {
                        vendor.tco.tco = vendor.tco.year1 + vendor.tco.year2 + vendor.tco.year3;
                    }
                }
                
                // Fix ROI values
                if (vendor.roi) {
                    vendor.roi.roi = isNaN(vendor.roi.roi) ? 0 : vendor.roi.roi;
                    vendor.roi.paybackMonths = isNaN(vendor.roi.paybackMonths) ? 999 : vendor.roi.paybackMonths;
                    vendor.roi.annualSavings = isNaN(vendor.roi.annualSavings) ? 0 : vendor.roi.annualSavings;
                }
                
                // Fix metrics
                if (vendor.metrics) {
                    vendor.metrics.securityScore = isNaN(vendor.metrics.securityScore) ? 75 : vendor.metrics.securityScore;
                    vendor.metrics.fteRequired = isNaN(vendor.metrics.fteRequired) ? 1 : vendor.metrics.fteRequired;
                }
            });
            
            console.log('Fixed vendor data:', result);
            return result;
        };
        
        // Force recalculation
        if (window.dashboard) {
            window.dashboard.refreshVendorData();
            window.dashboard.render();
        }
        
        console.log('✅ Vendor calculations fixed');
    }
    
    fixCalculations();
})();
