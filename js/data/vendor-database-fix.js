// Fix vendor database structure
(function() {
    console.log('🔧 Fixing vendor database structure...');
    
    Object.keys(window.ComprehensiveVendorDatabase).forEach(key => {
        const vendor = window.ComprehensiveVendorDatabase[key];
        
        // Ensure pricing structure exists
        if (!vendor.pricing) {
            vendor.pricing = {};
        }
        
        if (!vendor.pricing.perDevice) {
            vendor.pricing.perDevice = {};
        }
        
        // Add monthly pricing if missing
        if (!vendor.pricing.perDevice.monthly) {
            if (vendor.pricing.perDevice.negotiated) {
                vendor.pricing.perDevice.monthly = vendor.pricing.perDevice.negotiated;
            } else if (vendor.pricing.perDevice.total) {
                vendor.pricing.perDevice.monthly = vendor.pricing.perDevice.total / 36; // 3 year total
            } else if (vendor.pricing.perDevice.annual) {
                vendor.pricing.perDevice.monthly = vendor.pricing.perDevice.annual / 12;
            } else if (vendor.pricing.perUser && vendor.pricing.perUser.annual) {
                vendor.pricing.perDevice.monthly = vendor.pricing.perUser.annual / 12;
            } else if (vendor.pricing.perUser && vendor.pricing.perUser.monthly) {
                vendor.pricing.perDevice.monthly = vendor.pricing.perUser.monthly;
            } else {
                vendor.pricing.perDevice.monthly = 10; // Default fallback
            }
        }
        
        console.log(`✓ Fixed ${vendor.name}: $${vendor.pricing.perDevice.monthly}/device/month`);
    });
    
    console.log('✅ Vendor database structure fixed');
})();
