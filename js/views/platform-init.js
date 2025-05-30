// Platform initialization helper
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Platform initialization helper loaded');
    
    // Add sample vendors after a delay (only once)
    if (!window.vendorsAdded) {
        window.vendorsAdded = true;
        
        setTimeout(() => {
            if (window.platform && window.platform.selectedVendors.length === 1) {
                console.log('📊 Adding sample competitors...');
                
                // Add 2 competitors for demo
                const competitors = ['cisco', 'aruba'];
                competitors.forEach((vendor, index) => {
                    if (window.platform.vendorDatabase[vendor]) {
                        window.platform.selectedVendors.push(vendor);
                    }
                });
                
                window.platform.updateVendorSelection();
                window.platform.calculate();
            }
        }, 1500);
    }
});
