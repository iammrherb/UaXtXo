// Base64 encoded fallback PNG for Portnox logo
(function() {
  // Create base64 encoded SVG
  const svgLogo = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50"><style>.logo-text{fill:#05547C;font-family:Arial,sans-serif;font-weight:bold}.accent{fill:#65BD44}</style><rect x="5" y="10" width="30" height="30" rx="5" fill="#05547C"/><circle cx="20" cy="25" r="8" fill="#65BD44"/><text x="45" y="32" class="logo-text" font-size="20">Portnox</text><path class="accent" d="M45 35 h75" stroke="#65BD44" stroke-width="2"/></svg>';
  const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(svgLogo);
  
  // Set up a listener to replace broken logo
  document.addEventListener('DOMContentLoaded', function() {
    const logoImg = document.querySelector('.logo img');
    if (logoImg) {
      logoImg.onerror = function() {
        console.log('Logo image failed to load, applying SVG replacement');
        this.onerror = null;
        this.src = svgDataUrl;
      };
    }
    
    // Replace all vendor logos if they fail to load
    document.querySelectorAll('.vendor-card img').forEach(img => {
      img.onerror = function() {
        this.onerror = null;
        // Create a canvas with the vendor name
        const canvas = document.createElement('canvas');
        canvas.width = 150;
        canvas.height = 50;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, 150, 50);
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.alt.replace(' Logo', ''), 75, 25);
        this.src = canvas.toDataURL();
      };
    });
  });
})();
