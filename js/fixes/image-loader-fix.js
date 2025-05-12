// Fix vendor logo loading issues
document.addEventListener('DOMContentLoaded', function() {
    // Function to handle image loading errors
    function handleImageError(img) {
        const vendorName = img.closest('.vendor-card')?.dataset?.vendor || 'unknown';
        console.warn(`Failed to load image for vendor: ${vendorName}`);
        
        // Set appropriate fallback image based on vendor
        switch(vendorName) {
            case 'cisco':
                img.src = 'img/vendors/fallback/cisco.png';
                break;
            case 'aruba':
                img.src = 'img/vendors/fallback/aruba.png';
                break;
            case 'forescout':
                img.src = 'img/vendors/fallback/forescout.png';
                break;
            case 'fortinac':
                img.src = 'img/vendors/fallback/fortinac.png';
                break;
            case 'nps':
                img.src = 'img/vendors/fallback/microsoft.png';
                break;
            case 'securew2':
                img.src = 'img/vendors/fallback/securew2.png';
                break;
            default:
                // Default vendor icon
                img.src = 'img/vendors/fallback/generic-vendor.png';
        }
    }
    
    // Apply error handling to all vendor images
    document.querySelectorAll('.vendor-card img').forEach(img => {
        img.onerror = function() { handleImageError(this); };
        
        // Force reload
        const currentSrc = img.src;
        img.src = '';
        img.src = currentSrc;
    });
});
