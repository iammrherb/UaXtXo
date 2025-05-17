/**
 * Image Loading Fixes for Portnox TCO Analyzer
 * This script fixes issues with vendor logo loading and prevents infinite error loops
 * 
 * Version: 1.1.0 - Fixed infinite fallback loop
 */

(function() {
    console.log("🖼️ Applying improved image loading fixes...");

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
            fallback: null, // Set to null to avoid infinite loop
            text: 'No NAC'
        }
    };

    // Track which images we've already tried to fallback to avoid loops
    const attemptedFallbacks = new Set();

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
                    handleImageError(this, vendorId);
                };
                
                logoContainer.appendChild(newImg);
            } else {
                // Fix existing image
                logoImg.onerror = function() {
                    handleImageError(this, vendorId);
                };
                
                // Force reload the image if it failed to load
                if (logoImg.complete && (logoImg.naturalWidth === 0 || logoImg.naturalHeight === 0)) {
                    if (vendorLogos[vendorId]) {
                        logoImg.src = vendorLogos[vendorId].src;
                    }
                }
            }
        });
    };

    // Unified error handler to prevent loops
    function handleImageError(imgElement, vendorId) {
        // Create a unique identifier for this image
        const imgId = `${vendorId}-${imgElement.src}`;
        
        // If we've already tried to handle this specific image, go directly to text fallback
        if (attemptedFallbacks.has(imgId)) {
            applyTextFallback(imgElement, vendorId);
            return;
        }
        
        // Mark this image as attempted
        attemptedFallbacks.add(imgId);
        
        // Check if we have a fallback image
        if (vendorLogos[vendorId] && vendorLogos[vendorId].fallback) {
            console.log(`Could not load logo for ${vendorId}, trying fallback`);
            imgElement.src = vendorLogos[vendorId].fallback;
        } else {
            // No fallback image, use text fallback
            applyTextFallback(imgElement, vendorId);
        }
    }

    // Apply text fallback for missing images
    function applyTextFallback(imgElement, vendorId) {
        console.log(`Applying text fallback for ${vendorId}`);
        
        const parent = imgElement.parentNode;
        
        // Check if text fallback already exists
        if (parent.querySelector('.logo-text-fallback')) {
            return; // Already applied
        }
        
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
        textFallback.style.textAlign = 'center'; // Ensure text is centered
        
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

    // Create a base64 "No NAC" icon to prevent 404 errors
    function createNoNacIcon() {
        // Generate a simple base64 icon
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Draw a red circle with a slash
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 64, 64);
        
        ctx.beginPath();
        ctx.arc(32, 32, 25, 0, 2 * Math.PI);
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(18, 18);
        ctx.lineTo(46, 46);
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // Add "NAC" text
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.fillText('NAC', 32, 36);
        
        // Create a blob URL or data URL
        try {
            // Try to save as an actual file if we're in a context that allows it
            const dataURL = canvas.toDataURL('image/png');
            saveBase64AsFile(dataURL, 'img/vendors/no-nac-icon.png');
        } catch (e) {
            console.log('Could not save No NAC icon as file:', e);
        }
    }

    // Utility to try to save a base64 image as a file
    function saveBase64AsFile(base64, filename) {
        // This will only work in very specific contexts, but it's worth a try
        try {
            const link = document.createElement('a');
            link.href = base64;
            link.download = filename.split('/').pop();
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            console.log('Could not save file:', e);
        }
    }

    // Initialize the fix
    function init() {
        // Try to create the No NAC icon
        createNoNacIcon();
        
        // Fix vendor logos
        fixVendorLogos();
        
        console.log("✅ Image loading fixes applied with loop protection");
    }

    // Run when DOM is ready
    function runFix() {
        init();
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
})();
