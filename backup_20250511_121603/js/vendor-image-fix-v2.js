/**
 * Vendor Image Fix V2
 * Better handling of vendor images with multiple fallback options
 */

// Comprehensive vendor image mapping
const vendorImageMap = {
    'cisco': ['cisco-logo.png', 'cisco.png', 'vendors/cisco.png'],
    'aruba': ['aruba-logo.png', 'aruba.png', 'vendors/aruba.png'],
    'forescout': ['forescout-logo.png', 'forescout.png', 'vendors/forescout.png'],
    'portnox': ['portnox-logo.png', 'portnox.png', '../portnox-logo.png'],
    'microsoft': ['microsoft-logo.png', 'nps-logo.png', 'microsoft.png'],
    'nps': ['nps-logo.png', 'microsoft-logo.png', 'microsoft.png'],
    'securew2': ['securew2-logo.png', 'securew2.png', 'vendors/securew2.png'],
    'fortinet': ['fortinac-logo.png', 'fortinet-logo.png', 'fortinet.png'],
    'fortinac': ['fortinac-logo.png', 'fortinet-logo.png', 'fortinet.png'],
    'none': ['no-nac.png', 'no-nac-icon.png', 'none.png'],
    'no-nac': ['no-nac.png', 'no-nac-icon.png', 'none.png']
};

// Fix vendor images with better fallback logic
function fixVendorImagesV2() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Only process if not already processed
        if (img.dataset.processed === 'true') return;
        
        img.addEventListener('error', function() {
            // Prevent infinite loops
            if (this.dataset.errorHandled === 'true') return;
            
            const src = this.src;
            const urlParts = src.split('/');
            const filename = urlParts[urlParts.length - 1];
            const baseDir = urlParts.slice(0, -1).join('/');
            
            // Extract vendor name from filename
            let vendorKey = filename.split('.')[0].replace('-logo', '').replace('-icon', '');
            
            // Try to find the vendor in our map
            if (vendorImageMap[vendorKey]) {
                const alternatives = vendorImageMap[vendorKey];
                let currentIndex = parseInt(this.dataset.fallbackIndex || '0');
                
                if (currentIndex < alternatives.length) {
                    // Try next alternative
                    this.src = `${baseDir}/${alternatives[currentIndex]}`;
                    this.dataset.fallbackIndex = (currentIndex + 1).toString();
                } else {
                    // All alternatives failed, use the main portnox logo as final fallback
                    this.src = 'img/portnox-logo.png';
                    this.dataset.errorHandled = 'true';
                }
            } else {
                // Unknown vendor, use main logo as fallback
                this.src = 'img/portnox-logo.png';
                this.dataset.errorHandled = 'true';
            }
        });
        
        img.dataset.processed = 'true';
    });
}

// Apply fix immediately and on DOM changes
document.addEventListener('DOMContentLoaded', fixVendorImagesV2);

// Watch for new images
const imageObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeName === 'IMG' || (node.querySelectorAll && node.querySelectorAll('img').length > 0)) {
                    setTimeout(fixVendorImagesV2, 100);
                }
            });
        }
    });
});

imageObserver.observe(document.body, {
    childList: true,
    subtree: true
});

// Export for global use
window.fixVendorImagesV2 = fixVendorImagesV2;
