/**
 * Image loader fix
 * Ensures vendor logos load correctly
 */
document.addEventListener('DOMContentLoaded', function() {
    // Fix vendor logo images
    document.querySelectorAll('.vendor-card img').forEach(img => {
        // Add error handler
        img.onerror = function() {
            console.warn(`Failed to load image: ${this.src}`);
            
            // Extract vendor ID from parent card if possible
            const vendorCard = this.closest('.vendor-card');
            const vendorId = vendorCard ? vendorCard.dataset.vendor : '';
            
            // Try to fix the path
            if (this.src.includes('svg')) {
                // Try PNG instead
                this.src = this.src.replace('.svg', '.png');
            } else if (vendorId) {
                // Try direct path to vendor folder
                this.src = `img/vendors/${vendorId}-logo.png`;
            }
        };
        
        // Force reload to trigger error handler if needed
        const currentSrc = img.src;
        img.src = '';
        setTimeout(() => {
            img.src = currentSrc;
        }, 0);
    });
    
    console.log('Image loader fix applied');
});
