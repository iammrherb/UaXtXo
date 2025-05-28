// Verify TCO fix
setTimeout(() => {
    console.log('🔍 Verifying TCO fix...');
    
    if (window.dashboard && window.dashboard.vendorData) {
        const vendors = ['portnox', 'cisco', 'aruba'];
        
        vendors.forEach(vendorKey => {
            const vendor = window.dashboard.vendorData[vendorKey];
            if (vendor) {
                console.log(`${vendor.name}:`, {
                    'Monthly': `$${(vendor.tco.monthly / 1000).toFixed(1)}K`,
                    '3-Year TCO': `$${(vendor.tco.tco / 1000).toFixed(0)}K`,
                    'Year 1': `$${(vendor.tco.year1 / 1000).toFixed(0)}K`,
                    'ROI': `${vendor.roi?.roi || 0}%`
                });
            }
        });
    }
}, 3000);
