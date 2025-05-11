/**
 * Image Fix - Final Version
 * Prevents infinite loops and uses proper paths
 */

// Fix vendor images without creating loops
function fixVendorImages() {
    console.log('Applying final image fix...');
    
    document.querySelectorAll('img').forEach(img => {
        // Skip if already processed or if error occurred
        if (img.dataset.processed === 'true' || img.dataset.errorOccurred === 'true') {
            return;
        }
        
        // Mark as processed immediately
        img.dataset.processed = 'true';
        
        // Add error handler only once
        img.addEventListener('error', function(e) {
            // Prevent infinite loops
            if (this.dataset.errorOccurred === 'true') {
                return;
            }
            
            // Mark that error occurred
            this.dataset.errorOccurred = 'true';
            
            // Remove the error handler to prevent further calls
            this.onerror = null;
            
            const currentSrc = this.src;
            console.log('Image not found:', currentSrc);
            
            // Try lowercase img directory
            if (currentSrc.includes('/IMG/')) {
                const newSrc = currentSrc.replace('/IMG/', '/img/');
                console.log('Trying lowercase img directory:', newSrc);
                this.src = newSrc;
                return;
            }
            
            // Try without vendor directory
            if (currentSrc.includes('/vendors/')) {
                const filename = currentSrc.split('/').pop();
                const newSrc = currentSrc.replace('/vendors/', '/').replace(filename, filename.toLowerCase());
                console.log('Trying without vendors directory:', newSrc);
                this.src = newSrc;
                return;
            }
            
            // Don't set a fallback if none of the attempts work
            // This prevents infinite loops
            console.log('All image loading attempts failed for:', currentSrc);
            
            // Optionally hide broken images
            this.style.display = 'none';
            
            // Or use a data URI placeholder
            // this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiNmMGYwZjAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSI+aW1hZ2U8L3RleHQ+PC9zdmc+';
        }, { once: true }); // Use once: true to ensure handler fires only once
    });
}

// Run the fix
document.addEventListener('DOMContentLoaded', fixVendorImages);

// Also fix dynamically added images
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            setTimeout(fixVendorImages, 100);
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
