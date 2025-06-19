/**
 * Fix Vendor Logo References
 * Converts PNG to SVG references
 */

document.addEventListener('DOMContentLoaded', function() {
    // Fix all image sources that reference .png files
    const images = document.querySelectorAll('img[src*="-logo.png"]');
    
    images.forEach(img => {
        const src = img.src;
        const svgSrc = src.replace('.png', '.svg');
        img.src = svgSrc;
        
        // Add error handler to create placeholder if SVG doesn't exist
        img.onerror = function() {
            const vendorName = this.alt || 'Vendor';
            const placeholder = `data:image/svg+xml;base64,${btoa(`
                <svg width="120" height="40" xmlns="http://www.w3.org/2000/svg">
                    <rect width="120" height="40" fill="#0046ad" rx="4"/>
                    <text x="60" y="25" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">
                        ${vendorName.toUpperCase()}
                    </text>
                </svg>
            `)}`;
            this.src = placeholder;
        };
    });
    
    console.log('✅ Vendor logo references fixed');
});
