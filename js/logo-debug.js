// Logo Debug and Fix Script
document.addEventListener('DOMContentLoaded', function() {
    // Check for broken logo images
    const logos = document.querySelectorAll('.company-logo, .vendor-logo img');
    
    logos.forEach(logo => {
        // Set onerror handler to replace with placeholder
        logo.onerror = function() {
            const altText = this.alt || 'Logo';
            
            if (this.classList.contains('company-logo')) {
                // Create placeholder for company logo
                const placeholder = document.createElement('div');
                placeholder.className = 'company-logo-placeholder';
                placeholder.textContent = 'Portnox';
                
                this.parentNode.replaceChild(placeholder, this);
            } else {
                // Create placeholder for vendor logo
                const vendorCard = this.closest('.vendor-card');
                const vendorName = vendorCard ? vendorCard.querySelector('.vendor-info h3').textContent : altText;
                
                const placeholder = document.createElement('div');
                placeholder.className = 'vendor-logo-placeholder';
                placeholder.textContent = vendorName;
                
                this.parentNode.replaceChild(placeholder, this);
            }
        };
        
        // Force error handler if image already failed to load
        if (logo.complete && logo.naturalHeight === 0) {
            logo.onerror();
        }
    });
});
