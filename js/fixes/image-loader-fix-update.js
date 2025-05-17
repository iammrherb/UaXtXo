/**
 * Image Loading Fixes for Portnox TCO Analyzer
 * This script fixes issues with vendor logo loading
 */

(function() {
    console.log("🖼️ Applying image loading fixes...");

    // Vendor logo information
    const vendorLogos = {
        'portnox': {
            src: 'img/vendors/portnox-logo.png',
            fallback: 'img/vendors/portnox-logo-alt.png',
            text: 'Portnox'
        },
        'cisco': {
            src: 'img/vendors/cisco-logo.png',
            fallback: 'img/vendors/cisco-logo-alt.png',
            text: 'Cisco ISE'
        },
        'aruba': {
            src: 'img/vendors/aruba-logo.png',
            fallback: 'img/vendors/aruba-logo-alt.png',
            text: 'Aruba'
        },
        'forescout': {
            src: 'img/vendors/forescout-logo.png',
            fallback: 'img/vendors/forescout-logo-alt.png',
            text: 'Forescout'
        },
        'fortinac': {
            src: 'img/vendors/fortinac-logo.png',
            fallback: 'img/vendors/fortinet-logo.png',
            text: 'FortiNAC'
        },
        'juniper': {
            src: 'img/vendors/juniper-logo.png',
            fallback: 'img/vendors/juniper-logo-alt.png',
            text: 'Juniper'
        },
        'securew2': {
            src: 'img/vendors/securew2-logo.png',
            fallback: 'img/vendors/securew2-logo-alt.png',
            text: 'SecureW2'
        },
        'microsoft': {
            src: 'img/vendors/microsoft-logo.png',
            fallback: 'img/vendors/microsoft-logo-alt.png',
            text: 'Microsoft'
        },
        'arista': {
            src: 'img/vendors/arista-logo.png',
            fallback: 'img/vendors/arista-logo-alt.png',
            text: 'Arista'
        },
        'foxpass': {
            src: 'img/vendors/foxpass-logo.png',
            fallback: 'img/vendors/foxpass-logo-alt.png',
            text: 'Foxpass'
        },
        'no-nac': {
            src: 'img/vendors/no-nac-icon.png',
            fallback: 'img/vendors/no-nac-logo-alt.png',
            text: 'No NAC'
        }
    };

    // Fix vendor logo images
    const fixVendorLogos = function() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        
        vendorCards.forEach(card => {
            const vendorId = card.getAttribute('data-vendor');
            if (!vendorId) return;
            
            const logoContainer = card.querySelector('.vendor-logo');
            if (!logoContainer) return;
            
            const logoImg = logoContainer.querySelector('img');
            if (!logoImg) {
                // Create image if it doesn't exist
                const newImg = document.createElement('img');
                if (vendorLogos[vendorId]) {
                    newImg.src = vendorLogos[vendorId].src;
                    newImg.alt = vendorLogos[vendorId].text;
                } else {
                    newImg.alt = vendorId;
                }
                
                // Add error handler for fallback
                newImg.onerror = function() {
                    console.log(`Could not load logo for ${vendorId}, trying fallback`);
                    
                    if (vendorLogos[vendorId] && vendorLogos[vendorId].fallback) {
                        this.src = vendorLogos[vendorId].fallback;
                    } else {
                        // Apply text fallback
                        applyTextFallback(this, vendorId);
                    }
                };
                
                logoContainer.appendChild(newImg);
            } else {
                // Fix existing image
                logoImg.onerror = function() {
                    console.log(`Could not load logo for ${vendorId}, trying fallback`);
                    
                    if (vendorLogos[vendorId] && vendorLogos[vendorId].fallback) {
                        this.src = vendorLogos[vendorId].fallback;
                    } else {
                        // Apply text fallback
                        applyTextFallback(this, vendorId);
                    }
                };
                
                // Force reload the image
                if (logoImg.complete && (logoImg.naturalWidth === 0 || logoImg.naturalHeight === 0)) {
                    if (vendorLogos[vendorId]) {
                        logoImg.src = vendorLogos[vendorId].src;
                    }
                }
            }
        });
    };

    // Apply text fallback for missing images
    function applyTextFallback(imgElement, vendorId) {
        console.log(`Could not load logo for ${vendorId}, applying text fallback`);
        
        const parent = imgElement.parentNode;
        
        // Create text fallback
        const textFallback = document.createElement('div');
        textFallback.className = 'logo-text-fallback';
        textFallback.style.display = 'flex';
        textFallback.style.alignItems = 'center';
        textFallback.style.justifyContent = 'center';
        textFallback.style.width = '100%';
        textFallback.style.height = '100%';
        textFallback.style.color = '#333';
        textFallback.style.fontWeight = 'bold';
        textFallback.style.fontSize = '14px';
        
        // Use vendor name from mapping or capitalize vendor ID
        if (vendorLogos[vendorId] && vendorLogos[vendorId].text) {
            textFallback.textContent = vendorLogos[vendorId].text;
        } else {
            textFallback.textContent = vendorId.charAt(0).toUpperCase() + vendorId.slice(1);
        }
        
        // Hide the image and add text
        imgElement.style.display = 'none';
        parent.appendChild(textFallback);
    }

    // Run fix when DOM is ready
    function runFix() {
        fixVendorLogos();
    }

    // Run immediately if DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        runFix();
    } else {
        // Otherwise wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', runFix);
    }

    // Also add a window.onload handler as a fallback
    window.addEventListener('load', runFix);

    console.log("✅ Image loading fixes applied");
})();
