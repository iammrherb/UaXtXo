// Fix vendor image paths
document.addEventListener('DOMContentLoaded', function() {
    // Fix vendor card images
    const fixVendorImages = () => {
        const vendorImages = document.querySelectorAll('.vendor-card img');
        vendorImages.forEach(img => {
            img.onerror = function() {
                // Try different paths in order
                const vendorName = this.alt.toLowerCase().replace(/\s+/g, '-');
                const paths = [
                    `img/vendors/${vendorName}-logo.png`,
                    `img/vendors/${vendorName}.png`,
                    `img/${vendorName}-logo.png`,
                    `img/portnox-logo.png` // Fallback to Portnox logo
                ];
                
                let pathIndex = 0;
                const tryNextPath = () => {
                    if (pathIndex < paths.length) {
                        this.src = paths[pathIndex];
                        pathIndex++;
                    }
                };
                
                this.onerror = tryNextPath;
                tryNextPath();
            };
        });
    };
    
    // Run fix initially and after any dynamic content loads
    fixVendorImages();
    
    // Observer for dynamic content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                fixVendorImages();
            }
        });
    });
    
    // Observe the body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
