// Fix vendor data with real pricing
(function() {
    console.log('🔧 Fixing vendor data with accurate pricing...');
    
    // Update vendor database with accurate pricing
    const vendorPricing = {
        portnox: { monthly: 3.50, annual: 42.00 },
        cisco: { monthly: 19.72, annual: 236.67 }, // Based on $710 total per device
        aruba: { monthly: 17.64, annual: 211.67 }, // Based on $635 total per device
        microsoft: { monthly: 12.00, annual: 144.00 }, // Intune standalone
        juniper: { monthly: 7.00, annual: 84.00 }, // Wired assurance
        forescout: { monthly: 5.42, annual: 65.00 }, // Annual pricing
        arista: { monthly: 4.00, annual: 48.00 }, // Standard pricing
        securew2: { monthly: 2.00, annual: 24.00 }, // Per user
        extreme: { monthly: 4.00, annual: 48.00 }, // Connect pricing
        foxpass: { monthly: 2.50, annual: 30.00 }, // Per user
        fortinet: { monthly: 3.33, annual: 40.00 }, // Base pricing
        radiusaas: { monthly: 2.08, annual: 25.00 }, // Per device
        pulse: { monthly: 7.08, annual: 85.00 }, // Appliance pricing
        packetfence: { monthly: 2.92, annual: 35.00 } // Support only
    };
    
    // Update each vendor
    Object.keys(window.ComprehensiveVendorDatabase).forEach(key => {
        const vendor = window.ComprehensiveVendorDatabase[key];
        const pricing = vendorPricing[key];
        
        if (pricing) {
            vendor.pricing.perDevice.monthly = pricing.monthly;
            vendor.pricing.perDevice.annual = pricing.annual;
        }
        
        // Fix logo paths
        vendor.logo = `/img/vendors/${key}-logo.png`;
        
        // Add vendor type and architecture if missing
        if (!vendor.type) {
            vendor.type = vendor.category;
        }
        if (!vendor.architecture) {
            vendor.architecture = vendor.category === 'cloud-native' ? 'SaaS' : 
                                vendor.category === 'legacy-onprem' ? 'On-Premise' : 'Hybrid';
        }
    });
    
    console.log('✅ Vendor data fixed with accurate pricing');
})();
