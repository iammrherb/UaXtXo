// Fix TCO showing as 0
(function() {
    console.log('🔧 Fixing TCO zero values...');
    
    // Wait for vendor calculator
    function fixTCO() {
        if (!window.vendorCalculator) {
            setTimeout(fixTCO, 100);
            return;
        }
        
        // Store original method
        const originalGenerate = window.vendorCalculator.generateVendorComparison;
        
        // Override with fixed version
        window.vendorCalculator.generateVendorComparison = function(config) {
            console.log('📊 Generating vendor comparison with TCO fix...');
            
            // Call original method
            let result = originalGenerate.call(this, config);
            
            // Fix TCO calculations for all vendors
            Object.keys(result).forEach(vendorKey => {
                const vendor = result[vendorKey];
                
                // If monthly cost exists but TCO is 0, calculate it
                if (vendor.tco && vendor.tco.monthly > 0 && vendor.tco.tco === 0) {
                    console.log(`Fixing TCO for ${vendor.name}...`);
                    
                    // Get monthly cost
                    const monthlyCost = vendor.tco.monthly;
                    
                    // Calculate yearly costs
                    const yearlyOperational = monthlyCost * 12;
                    
                    // Get implementation cost (if exists)
                    const implementationCost = vendor.tco.breakdown?.implementation || 
                                              vendor.costs?.implementation || 
                                              50000; // Default implementation cost
                    
                    // Calculate each year
                    vendor.tco.year1 = implementationCost + yearlyOperational;
                    vendor.tco.year2 = yearlyOperational;
                    vendor.tco.year3 = yearlyOperational;
                    
                    // Calculate total TCO based on analysis period
                    if (config.analysisPeriod === 1) {
                        vendor.tco.tco = vendor.tco.year1;
                    } else if (config.analysisPeriod === 2) {
                        vendor.tco.tco = vendor.tco.year1 + vendor.tco.year2;
                    } else {
                        vendor.tco.tco = vendor.tco.year1 + vendor.tco.year2 + vendor.tco.year3;
                    }
                    
                    // Update breakdown
                    vendor.tco.breakdown = {
                        license: monthlyCost * 12 * config.analysisPeriod,
                        implementation: implementationCost,
                        operational: (vendor.metrics?.fteRequired || 1) * (config.fteCost || 100000) * config.analysisPeriod,
                        infrastructure: 0,
                        training: 10000,
                        maintenance: 5000 * config.analysisPeriod
                    };
                    
                    console.log(`Fixed ${vendor.name} TCO: $${(vendor.tco.tco / 1000).toFixed(0)}K`);
                }
                
                // Also calculate ROI if missing
                if (!vendor.roi || vendor.roi.roi === 0) {
                    // Use Cisco as baseline for ROI calculation
                    const baseline = result.cisco || result.aruba || Object.values(result)[0];
                    if (baseline && baseline !== vendor) {
                        const savings = baseline.tco.tco - vendor.tco.tco;
                        vendor.roi = {
                            roi: vendor.tco.tco > 0 ? Math.round((savings / vendor.tco.tco) * 100) : 0,
                            annualSavings: Math.round(savings / config.analysisPeriod),
                            paybackMonths: savings > 0 ? Math.round((vendor.tco.tco / (savings / 36)) || 999) : 999,
                            savingsPercent: baseline.tco.tco > 0 ? Math.round((savings / baseline.tco.tco) * 100) : 0
                        };
                    }
                }
            });
            
            return result;
        };
        
        // Force recalculation if dashboard exists
        if (window.dashboard) {
            console.log('🔄 Forcing dashboard recalculation...');
            window.dashboard.refreshVendorData();
            setTimeout(() => {
                window.dashboard.render();
                window.dashboard.updateKPIs();
            }, 500);
        }
    }
    
    // Start fix
    fixTCO();
})();
