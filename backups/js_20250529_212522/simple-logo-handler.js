// Simple Logo Handler
document.addEventListener('DOMContentLoaded', function() {
    console.log("🎨 Setting up logo handler...");
    
    // Fix main Portnox logo
    const portnoxLogo = document.querySelector('.portnox-logo img');
    if (portnoxLogo) {
        portnoxLogo.onerror = function() {
            // Create text fallback
            const logoContainer = this.parentElement;
            logoContainer.innerHTML = '<div style="font-size: 24px; font-weight: 700; color: #00a652;">PORTNOX</div>';
        };
        
        // Force reload from local path
        portnoxLogo.src = './img/vendors/portnox-logo.png';
    }
    
    // Fix vendor logos
    document.querySelectorAll('.vendor-logo img').forEach(img => {
        img.onerror = function() {
            const vendorName = this.alt || 'VENDOR';
            this.parentElement.innerHTML = `<div style="font-weight: 700; color: #6b7280;">${vendorName.substring(0, 3).toUpperCase()}</div>`;
        };
    });
});
