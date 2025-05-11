/**
 * Vendor Image Fix
 * Handles vendor image loading with existing paths
 */

// Fix vendor images with correct paths
function fixVendorImages() {
    const vendorMappings = {
        'cisco-logo': 'cisco',
        'aruba-logo': 'aruba',
        'forescout-logo': 'forescout',
        'portnox-logo': 'portnox',
        'microsoft-logo': 'microsoft',
        'nps-logo': 'microsoft',
        'securew2-logo': 'securew2',
        'fortinet-logo': 'fortinet',
        'fortinac-logo': 'fortinet',
        'none-logo': 'no-nac',
        'no-nac-icon': 'no-nac'
    };
    
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            const src = this.src;
            const filename = src.split('/').pop().split('.')[0];
            
            // Try to map the filename to a known vendor
            if (vendorMappings[filename]) {
                this.src = `img/vendors/${vendorMappings[filename]}.png`;
            }
            
            // Prevent infinite error loops
            this.onerror = null;
        });
    });
}

// Apply fix on DOM ready and mutation
document.addEventListener('DOMContentLoaded', fixVendorImages);

// Watch for dynamically added images
const observer = new MutationObserver(() => {
    fixVendorImages();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
