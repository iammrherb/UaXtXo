// Patch vendor database to add monthly pricing
Object.keys(window.ComprehensiveVendorDatabase).forEach(key => {
    const vendor = window.ComprehensiveVendorDatabase[key];
    if (vendor.pricing && vendor.pricing.perDevice) {
        // Add monthly if missing
        if (!vendor.pricing.perDevice.monthly) {
            if (vendor.pricing.perDevice.negotiated) {
                vendor.pricing.perDevice.monthly = vendor.pricing.perDevice.negotiated;
            } else if (vendor.pricing.perDevice.total) {
                vendor.pricing.perDevice.monthly = vendor.pricing.perDevice.total / 12;
            } else if (vendor.pricing.perDevice.annual) {
                vendor.pricing.perDevice.monthly = vendor.pricing.perDevice.annual / 12;
            } else {
                vendor.pricing.perDevice.monthly = 10; // Default
            }
        }
    }
});
