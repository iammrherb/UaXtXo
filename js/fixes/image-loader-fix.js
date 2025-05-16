// Image Loader Fix for Portnox TCO Analyzer
(function() {
    console.log('🖼️ Initializing image loader fix...');
    
    // Function to ensure images are loaded properly
    function ensureImagesLoaded() {
        // Fix any broken paths in the HTML
        fixImagePaths();
        
        // Check vendor logo elements
        checkVendorLogos();
        
        console.log('Image loader fix applied');
    }
    
    // Fix image paths in the document
    function fixImagePaths() {
        // Fix all image paths starting with /img/
        const images = document.querySelectorAll('img[src^="/img/"]');
        images.forEach(img => {
            const currentSrc = img.getAttribute('src');
            const newSrc = currentSrc.replace(/^\/img\//, 'img/');
            console.log(`Fixing image path: ${currentSrc} -> ${newSrc}`);
            img.setAttribute('src', newSrc);
        });
        
        // Fix vendor logo paths specifically
        const vendorLogos = document.querySelectorAll('img[src*="vendors/"]');
        vendorLogos.forEach(img => {
            const currentSrc = img.getAttribute('src');
            if (!currentSrc.match(/^img\/vendors\//)) {
                const filename = currentSrc.split('/').pop();
                const newSrc = `img/vendors/${filename}`;
                console.log(`Fixing vendor logo path: ${currentSrc} -> ${newSrc}`);
                img.setAttribute('src', newSrc);
            }
        });
    }
    
    // Check vendor logos and apply fallback only when needed
    function checkVendorLogos() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        
        vendorCards.forEach(card => {
            const vendor = card.getAttribute('data-vendor');
            const logoContainer = card.querySelector('.vendor-logo');
            
            if (logoContainer) {
                const logoImg = logoContainer.querySelector('img');
                
                if (logoImg) {
                    // Fix path if needed
                    const currentSrc = logoImg.getAttribute('src');
                    if (!currentSrc.match(/^img\/vendors\//)) {
                        const filename = currentSrc.split('/').pop();
                        logoImg.setAttribute('src', `img/vendors/${filename}`);
                    }
                    
                    // Set up error handler to apply fallback only if needed
                    logoImg.onerror = function() {
                        console.warn(`Could not load logo for ${vendor}, applying text fallback`);
                        this.style.display = 'none';
                        
                        // Check if fallback already exists
                        if (!logoContainer.querySelector('svg')) {
                            const vendorColors = {
                                portnox: '#2c3e50',
                                cisco: '#049fd9',
                                aruba: '#ff8300',
                                forescout: '#6b2a94',
                                fortinac: '#c8102e',
                                juniper: '#84bc41',
                                securew2: '#1a4d80',
                                microsoft: '#00a4ef',
                                arista: '#2d7de1',
                                foxpass: '#ff5722',
                                'no-nac': '#f44336'
                            };
                            
                            // Create fallback text 
                            const text = document.createElement('div');
                            text.className = 'vendor-text-fallback';
                            text.textContent = vendor.charAt(0).toUpperCase() + vendor.slice(1).replace('-', ' ');
                            text.style.color = vendorColors[vendor] || '#666666';
                            text.style.fontWeight = 'bold';
                            text.style.textAlign = 'center';
                            text.style.fontSize = '14px';
                            text.style.padding = '5px';
                            logoContainer.appendChild(text);
                        }
                    };
                    
                    // Reset any existing error handler
                    logoImg.style.display = '';
                }
            }
        });
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', ensureImagesLoaded);
    
    // Also initialize on window load as a fallback
    window.addEventListener('load', ensureImagesLoaded);
})();
