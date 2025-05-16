// Debug Utilities for TCO Analyzer
console.log('Debug utilities loaded');

const debugUtils = {
    init: function() {
        console.log('Initializing debug utilities');
        this.checkInitialSetup();
    },
    
    checkVendorCards: function() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        const results = Array.from(vendorCards).map(card => {
            return {
                vendor: card.getAttribute('data-vendor'),
                selected: card.classList.contains('selected'),
                hasLogo: !!card.querySelector('.vendor-logo img')
            };
        });
        
        return results;
    },
    
    checkImagePaths: function() {
        const images = document.querySelectorAll('img');
        const results = Array.from(images).map(img => {
            return {
                src: img.getAttribute('src'),
                loaded: img.complete && img.naturalHeight !== 0,
                alt: img.getAttribute('alt') || 'No alt text'
            };
        });
        
        return results;
    },
    
    checkChartInitialization: function() {
        const canvases = document.querySelectorAll('canvas');
        const results = Array.from(canvases).map(canvas => {
            return {
                id: canvas.id,
                initialized: !!canvas.__chart__,
                width: canvas.width,
                height: canvas.height
            };
        });
        
        return results;
    },
    
    checkSidebarStatus: function() {
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');
        
        return {
            exists: !!sidebar,
            collapsed: sidebar ? sidebar.classList.contains('collapsed') : false,
            toggleExists: !!sidebarToggle,
            toggleCollapsed: sidebarToggle ? sidebarToggle.classList.contains('collapsed') : false
        };
    },
    
    fixMissingImages: function() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete || img.naturalHeight === 0) {
                const src = img.getAttribute('src');
                console.log(`Fixing broken image: ${src}`);
                
                // Check if it's a vendor logo
                if (src.includes('vendors')) {
                    const vendor = src.split('/').pop().replace('-logo.png', '');
                    img.onerror = null; // Prevent error loop
                    img.src = this.createSVGPlaceholder(vendor);
                }
            }
        });
    },
    
    createSVGPlaceholder: function(vendorName) {
        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100">
          <rect width="200" height="100" fill="white"/>
          <rect width="180" height="80" x="10" y="10" fill="#2c3e50" rx="10" ry="10"/>
          <text x="100" y="55" font-family="Arial" font-size="20" text-anchor="middle" fill="white">${vendorName}</text>
        </svg>
        `;
        
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    },
    
    checkInitialSetup: function() {
        console.log('Initial Debug Checks');
        console.log('Image path check:');
        console.log(this.checkImagePaths());
        console.log('Vendor cards check:');
        console.log(this.checkVendorCards());
        console.log('Sidebar status:');
        console.log(this.checkSidebarStatus());
        
        // Fix broken images
        this.fixMissingImages();
    }
};

// Initialize debug utilities on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    debugUtils.init();
});
