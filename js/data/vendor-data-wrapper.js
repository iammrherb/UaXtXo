/**
 * Vendor Data Wrapper - Fixes syntax errors
 */
(function() {
    console.log("📊 Loading vendor data wrapper...");
    
    // Ensure window.vendorPricingData exists
    if (typeof window.vendorPricingData === 'undefined') {
        window.vendorPricingData = {};
    }
    
    // Ensure window.vendorCapabilities exists
    if (typeof window.vendorCapabilities === 'undefined') {
        window.vendorCapabilities = {};
    }
    
    // Ensure VendorCalculator class exists
    if (typeof window.VendorCalculator === 'undefined') {
        window.VendorCalculator = function() {};
    }
})();
