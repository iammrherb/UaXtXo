// Fix vendor logo paths
(function() {
    console.log('🖼️ Fixing vendor logo paths...');
    
    // Map vendor IDs to correct logo filenames
    const logoMap = {
        'portnox': 'portnox-logo.png',
        'cisco': 'cisco-logo.png',
        'cisco_ise': 'cisco-logo.png',
        'aruba': 'aruba-logo.png',
        'aruba_clearpass': 'aruba-logo.png',
        'microsoft': 'microsoft-logo.png',
        'juniper': 'juniper-logo.png',
        'forescout': 'forescout-logo.png',
        'arista': 'arista-logo.png',
        'securew2': 'securew2-logo.png',
        'extreme': 'extreme-logo.png',
        'foxpass': 'foxpass-logo.png',
        'fortinet': 'fortinet-logo.png',
        'radiusaas': 'radiussaas-logo.png',
        'pulse': 'pulse-logo.png',
        'packetfence': 'packetfence-logo.png'
    };
    
    // Update getVendorLogo function if it exists
    window.getVendorLogo = function(vendorId) {
        return `/img/vendors/${logoMap[vendorId] || 'no-nac-logo.png'}`;
    };
    
    console.log('✅ Vendor logo paths fixed');
})();
