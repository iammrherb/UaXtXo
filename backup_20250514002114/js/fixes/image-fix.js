/**
 * Minimal image loading fix
 */
document.addEventListener('DOMContentLoaded', function() {
    // Fix vendor card images
    var vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(function(card) {
        var img = card.querySelector('img');
        if (img) {
            // Get vendor from card data attribute or class
            var vendor = card.dataset.vendor || card.className.match(/vendor-(\w+)/)?.[1] || '';
            
            // Add error handler
            img.onerror = function() {
                console.warn('Failed to load image:', this.src);
                
                // Try different paths
                if (this.src.includes('/vendors/')) {
                    // Try direct in img folder
                    this.src = this.src.replace('/vendors/', '/');
                } else if (!this.src.includes('vendors/')) {
                    // Try in vendors folder
                    var parts = this.src.split('/');
                    var filename = parts[parts.length - 1];
                    this.src = 'img/vendors/' + filename;
                }
                
                // As a last resort, set a colored background with text
                this.onerror = function() {
                    var container = this.parentNode;
                    if (container) {
                        // Style the parent as a colored box with text
                        container.style.background = getVendorColor(vendor);
                        container.style.display = 'flex';
                        container.style.alignItems = 'center';
                        container.style.justifyContent = 'center';
                        container.style.color = 'white';
                        container.style.fontWeight = 'bold';
                        container.style.textTransform = 'uppercase';
                        container.style.padding = '10px';
                        container.style.height = '80px';
                        container.style.width = '100%';
                        
                        // Add text inside
                        container.textContent = vendor || 'Vendor';
                        
                        // Remove the img element
                        this.style.display = 'none';
                    }
                };
            };
            
            // Force reload to trigger error handler if needed
            var currentSrc = img.src;
            if (currentSrc) {
                img.src = '';
                setTimeout(function() {
                    img.src = currentSrc;
                }, 0);
            }
        }
    });
    
    // Get a color for a vendor
    function getVendorColor(vendor) {
        var colors = {
            cisco: '#049fd9',
            aruba: '#f78e1e',
            forescout: '#d64000',
            fortinac: '#ee3124',
            nps: '#7fba00',
            microsoft: '#7fba00',
            securew2: '#00b2e3',
            noNac: '#b22222'
        };
        
        return colors[vendor] || '#1b67b2';
    }
});
