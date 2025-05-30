// Platform initialization helper - Fixed
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Platform initialization helper loaded');
    
    // Only add sample vendors once, with proper timing
    let vendorsInitialized = false;
    
    const initializeVendors = () => {
        if (vendorsInitialized || !window.platform) {
            return;
        }
        
        // Check if platform is fully initialized
        if (!window.platform.calculationResults || !window.platform.vendorDatabase) {
            setTimeout(initializeVendors, 500);
            return;
        }
        
        vendorsInitialized = true;
        
        // Add sample vendors only if we have just Portnox
        if (window.platform.selectedVendors.length === 1) {
            console.log('📊 Adding sample competitors...');
            
            // Disable auto-calculation temporarily
            const originalCalculate = window.platform.calculate;
            window.platform.calculate = () => {};
            
            // Add vendors
            const competitors = ['cisco', 'aruba'];
            competitors.forEach(vendor => {
                if (window.platform.vendorDatabase[vendor]) {
                    window.platform.selectedVendors.push(vendor);
                }
            });
            
            // Update UI
            window.platform.updateVendorSelection();
            
            // Re-enable and trigger calculation
            setTimeout(() => {
                window.platform.calculate = originalCalculate;
                window.platform.calculate();
            }, 100);
        }
    };
    
    // Start initialization after a delay
    setTimeout(initializeVendors, 1500);
});
