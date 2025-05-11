/**
 * Enhanced Logo Loader with proper error handling
 */
const LogoLoader = (function() {
    const VENDOR_LOGOS = {
        cisco: 'cisco-logo.png',
        aruba: 'aruba-logo.png',
        forescout: 'forescout-logo.png',
        fortinac: 'fortinac-logo.png',
        portnox: 'portnox-logo.png',
        securew2: 'securew2-logo.png',
        nps: 'microsoft-logo.png',
        none: 'no-nac-logo.png'
    };
    
    const DEFAULT_LOGO = 'img/vendors/default-logo.png';
    const LOGO_BASE_PATH = 'img/vendors/';
    
    function loadVendorLogo(vendorId, imageElement) {
        if (!vendorId || !imageElement) {
            console.error('Invalid parameters for logo loading');
            return;
        }
        
        const logoFile = VENDOR_LOGOS[vendorId] || 'default-logo.png';
        const logoPath = LOGO_BASE_PATH + logoFile;
        
        // Set loading state
        imageElement.classList.add('loading');
        
        // Create new image to test loading
        const testImage = new Image();
        
        testImage.onload = function() {
            imageElement.src = logoPath;
            imageElement.classList.remove('loading');
            imageElement.classList.add('loaded');
        };
        
        testImage.onerror = function() {
            console.warn(`Failed to load logo for ${vendorId}, using default`);
            imageElement.src = DEFAULT_LOGO;
            imageElement.classList.remove('loading');
            imageElement.classList.add('error');
        };
        
        // Start loading
        testImage.src = logoPath;
    }
    
    function loadAllVendorLogos() {
        const vendorImages = document.querySelectorAll('[data-vendor-logo]');
        vendorImages.forEach(img => {
            const vendorId = img.getAttribute('data-vendor-logo');
            loadVendorLogo(vendorId, img);
        });
    }
    
    // Initialize when DOM is ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadAllVendorLogos);
        } else {
            loadAllVendorLogos();
        }
    }
    
    return {
        init,
        loadVendorLogo,
        loadAllVendorLogos
    };
})();

// Auto-initialize
LogoLoader.init();
