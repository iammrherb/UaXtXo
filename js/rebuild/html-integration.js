/**
 * HTML Integration for Portnox TCO Analyzer
 * This script integrates the standalone rebuild components with the existing HTML
 */
(function() {
    console.log("🔄 Initializing HTML integration...");
    
    // Create missing elements
    function createMissingElements() {
        // Create loading overlay if it doesn't exist
        if (!document.getElementById('loading-overlay')) {
            const loadingOverlay = document.createElement('div');
            loadingOverlay.id = 'loading-overlay';
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.style.display = 'none';
            
            const loadingSpinner = document.createElement('div');
            loadingSpinner.className = 'loading-spinner';
            
            const spinner = document.createElement('div');
            spinner.className = 'spinner';
            
            const loadingText = document.createElement('p');
            loadingText.textContent = 'Calculating results...';
            
            loadingSpinner.appendChild(spinner);
            loadingSpinner.appendChild(loadingText);
            loadingOverlay.appendChild(loadingSpinner);
            
            document.body.appendChild(loadingOverlay);
            console.log("✅ Created loading overlay");
        }
        
        // Create toast container if it doesn't exist
        if (!document.getElementById('toast-container')) {
            const toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'toast-container';
            
            document.body.appendChild(toastContainer);
            console.log("✅ Created toast container");
        }
    }
    
    // Show toast notification
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = document.createElement('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        
        const messageElement = document.createElement('span');
        messageElement.textContent = message;
        
        toast.appendChild(icon);
        toast.appendChild(messageElement);
        toastContainer.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Fix vendor logo images
    function fixVendorImages() {
        // Check if PORTNOX_DATA is available
        if (!window.PORTNOX_DATA || !window.PORTNOX_DATA.vendors) {
            console.warn("⚠️ Vendor data not available, skipping logo fixes");
            return;
        }
        
        // Fix vendor logos
        document.querySelectorAll('.vendor-card').forEach(card => {
            const vendorId = card.getAttribute('data-vendor');
            if (!vendorId) return;
            
            const vendor = window.PORTNOX_DATA.vendors[vendorId];
            if (!vendor) return;
            
            const logoImg = card.querySelector('.vendor-logo img');
            if (!logoImg) return;
            
            // Add error handler to use fallback if image fails to load
            logoImg.onerror = function() {
                if (vendor.logoFallback) {
                    console.log(`Using fallback logo for ${vendorId}`);
                    this.src = vendor.logoFallback;
                } else {
                    console.log(`Creating fallback logo for ${vendorId}`);
                    // Create SVG fallback
                    this.src = `data:image/svg+xml;base64,${btoa(`
                        <svg width="200" height="50" xmlns="http://www.w3.org/2000/svg">
                            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#333333">${vendor.name}</text>
                        </svg>
                    `)}`;
                }
            };
            
            // Try to reload the image
            const currentSrc = logoImg.src;
            if (currentSrc && !currentSrc.includes('data:image')) {
                const newSrc = currentSrc.includes('?') ? 
                    `${currentSrc}&_cb=${Date.now()}` : 
                    `${currentSrc}?_cb=${Date.now()}`;
                logoImg.src = newSrc;
            }
        });
        
        console.log("✅ Fixed vendor logo images");
    }
    
    // Initialize the integration
    function initialize() {
        console.log("🔄 Initializing integration...");
        
        // Create missing elements
        createMissingElements();
        
        // Fix vendor images
        fixVendorImages();
        
        // Add toast function to window
        window.showToast = showToast;
        
        // Complete initialization and show success message
        setTimeout(() => {
            showToast('Portnox TCO Analyzer enhanced successfully!', 'success');
        }, 1000);
        
        console.log("✅ Integration initialized successfully");
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Also initialize on window load as fallback
    window.addEventListener('load', initialize);
})();
