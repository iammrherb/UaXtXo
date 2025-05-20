// Inject the new CSS and JS files
document.addEventListener('DOMContentLoaded', function() {
    // Add new CSS files
    addStylesheet('css/fixes/logo-fixes.css');
    addStylesheet('css/tab-fixes.css');
    addStylesheet('css/heatmap.css');
    
    // Add new JS files
    addScript('js/fixes/tab-switching-fix.js');
    addScript('js/fixes/heatmap-fix.js');
    addScript('js/index.js');
    
    // Fix Portnox logo
    const portnoxLogos = document.querySelectorAll('.company-logo');
    portnoxLogos.forEach(logo => {
        logo.src = 'img/portnox-logo.png';
        logo.onerror = function() {
            this.src = 'img/vendors/portnox-logo.png';
        };
    });
    
    // Fix vendor logos
    const vendorLogos = document.querySelectorAll('.vendor-logo img');
    vendorLogos.forEach(logo => {
        const vendor = logo.closest('.vendor-card').getAttribute('data-vendor');
        if (vendor) {
            logo.src = `img/vendors/${vendor}-logo.png`;
        }
    });
});

// Helper functions
function addStylesheet(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

function addScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
}
