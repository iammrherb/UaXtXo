// Proper Logo Handler
document.addEventListener('DOMContentLoaded', function() {
    console.log("🖼️ Setting up proper logo handler...");
    
    // Fix Portnox logo in header
    const headerLogo = document.querySelector('.portnox-logo');
    if (headerLogo) {
        headerLogo.innerHTML = `
            <img src="./img/vendors/portnox-logo.png" 
                 alt="Portnox" 
                 onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:1.5rem;font-weight:700;color:#00a652;\\'>PORTNOX</span>';"
                 style="max-height: 40px; width: auto;">
        `;
    }
    
    // Handle vendor logos with text fallback
    function fixVendorLogos() {
        document.querySelectorAll('.vendor-logo').forEach(logo => {
            const img = logo.querySelector('img');
            if (img) {
                img.onerror = function() {
                    const vendorName = this.alt || 'VENDOR';
                    const abbr = vendorName.substring(0, 3).toUpperCase();
                    this.parentElement.innerHTML = `
                        <div style="font-size: 1rem; font-weight: 700; color: #6c757d;">
                            ${abbr}
                        </div>
                    `;
                };
            }
        });
    }
    
    // Initial fix
    fixVendorLogos();
    
    // Monitor for changes
    const observer = new MutationObserver(fixVendorLogos);
    const vendorGrid = document.getElementById('vendor-grid');
    if (vendorGrid) {
        observer.observe(vendorGrid, { childList: true, subtree: true });
    }
});
