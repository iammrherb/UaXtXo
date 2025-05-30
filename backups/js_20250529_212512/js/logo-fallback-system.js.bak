// Comprehensive Logo Fallback System
document.addEventListener('DOMContentLoaded', function() {
    console.log("🎨 Initializing logo fallback system...");
    
    // Logo mapping
    const logoUrls = {
        'portnox': 'https://www.portnox.com/wp-content/uploads/2021/03/Portnotx_Logo_Color-768x193.png',
        'cisco': 'https://www.cisco.com/c/dam/en_us/about/ac50/ac47/images/logo-cisco.png',
        'default': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
    };
    
    // Fix all vendor logos
    function fixLogos() {
        // Fix main Portnox logo
        const mainLogo = document.querySelector('.portnox-logo img');
        if (mainLogo) {
            mainLogo.onerror = function() {
                this.src = logoUrls.portnox;
                this.onerror = null;
            };
            if (!mainLogo.complete || mainLogo.naturalHeight === 0) {
                mainLogo.src = logoUrls.portnox;
            }
        }
        
        // Fix all vendor logos
        document.querySelectorAll('.vendor-logo img').forEach(img => {
            const vendorKey = img.src.match(/\/([^\/]+)-logo\.png/)?.[1];
            
            img.onerror = function() {
                this.style.display = 'none';
                const textFallback = document.createElement('div');
                textFallback.style.cssText = 'font-weight: 700; font-size: 14px; color: #6b7280; text-align: center;';
                textFallback.textContent = this.alt || 'LOGO';
                this.parentElement.appendChild(textFallback);
                this.onerror = null;
            };
            
            // Force reload if image failed
            if (!img.complete || img.naturalHeight === 0) {
                const newSrc = img.src + '?t=' + Date.now();
                img.src = newSrc;
            }
        });
    }
    
    // Initial fix
    fixLogos();
    
    // Fix logos when vendor cards are rendered
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                setTimeout(fixLogos, 100);
            }
        });
    });
    
    const vendorGrid = document.getElementById('vendor-grid');
    if (vendorGrid) {
        observer.observe(vendorGrid, { childList: true, subtree: true });
    }
});
