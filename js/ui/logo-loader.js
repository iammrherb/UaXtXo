/**
 * Fixed Logo Loader - Prevents infinite loading loops
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
    
    // Keep track of failed loads to prevent infinite loops
    const failedLoads = new Set();
    const loadAttempts = new Map();
    const MAX_ATTEMPTS = 2;
    
    function loadVendorLogo(vendorId, imageElement) {
        if (!vendorId || !imageElement) {
            console.error('Invalid parameters for logo loading');
            return;
        }
        
        // Check if we've already failed to load this image multiple times
        const attemptKey = `${vendorId}-${imageElement.id || imageElement.src}`;
        const attempts = loadAttempts.get(attemptKey) || 0;
        
        if (attempts >= MAX_ATTEMPTS) {
            console.warn(`Max attempts reached for ${vendorId} logo`);
            imageElement.style.display = 'none';
            return;
        }
        
        loadAttempts.set(attemptKey, attempts + 1);
        
        const logoFile = VENDOR_LOGOS[vendorId] || 'default-logo.png';
        const logoPath = LOGO_BASE_PATH + logoFile;
        
        // Check if this specific logo has already failed
        if (failedLoads.has(logoPath)) {
            handleFailedLogo(imageElement, vendorId);
            return;
        }
        
        // Set loading state
        imageElement.classList.add('loading');
        
        // Create new image to test loading
        const testImage = new Image();
        
        testImage.onload = function() {
            imageElement.src = logoPath;
            imageElement.classList.remove('loading');
            imageElement.classList.add('loaded');
            imageElement.onerror = null; // Remove error handler after successful load
        };
        
        testImage.onerror = function() {
            console.warn(`Failed to load logo for ${vendorId}, using fallback`);
            failedLoads.add(logoPath);
            handleFailedLogo(imageElement, vendorId);
        };
        
        // Start loading
        testImage.src = logoPath;
    }
    
    function handleFailedLogo(imageElement, vendorId) {
        // Try default logo once
        if (!failedLoads.has(DEFAULT_LOGO)) {
            const defaultTest = new Image();
            
            defaultTest.onload = function() {
                imageElement.src = DEFAULT_LOGO;
                imageElement.classList.remove('loading');
                imageElement.classList.add('error');
                imageElement.onerror = null; // Remove error handler
            };
            
            defaultTest.onerror = function() {
                failedLoads.add(DEFAULT_LOGO);
                // If default also fails, hide the image
                imageElement.style.display = 'none';
                imageElement.onerror = null; // Remove error handler
            };
            
            defaultTest.src = DEFAULT_LOGO;
        } else {
            // If default has already failed, just hide the image
            imageElement.style.display = 'none';
            imageElement.onerror = null; // Remove error handler
        }
    }
    
    function loadAllVendorLogos() {
        // Clear previous attempts for a fresh start
        loadAttempts.clear();
        
        const vendorImages = document.querySelectorAll('[data-vendor-logo]');
        vendorImages.forEach(img => {
            const vendorId = img.getAttribute('data-vendor-logo');
            // Remove any existing error handlers to prevent loops
            img.onerror = null;
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
        loadAllVendorLogos,
        clearFailedLoads: () => { failedLoads.clear(); loadAttempts.clear(); }
    };
})();

// Auto-initialize
LogoLoader.init();
