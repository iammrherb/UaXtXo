/**
 * Working Initialization - Simple and reliable
 */

window.addEventListener('load', function() {
    console.log('🚀 Starting simple initialization...');
    
    setTimeout(() => {
        if (window.platform) {
            // Ensure calculation happens once
            if (!window.platform.calculationResults) {
                console.log('📊 Triggering initial calculation...');
                window.platform.calculate();
            }
            
            // Add competitors after calculation
            setTimeout(() => {
                if (window.platform.selectedVendors.length === 1) {
                    console.log('📊 Adding competitors...');
                    ['cisco', 'aruba'].forEach(v => {
                        if (window.platform.vendorDatabase[v]) {
                            window.platform.selectedVendors.push(v);
                        }
                    });
                    window.platform.updateVendorSelection();
                    window.platform.calculate();
                }
            }, 2000);
        }
    }, 1000);
});
