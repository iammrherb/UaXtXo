/**
 * Resource Fallbacks - Handles missing resources gracefully
 */
(function() {
  console.log('Setting up resource fallbacks...');
  
  document.addEventListener('DOMContentLoaded', function() {
    // Create fallback vendor logos
    const vendorColors = {
      'cisco': '#049fd9',
      'aruba': '#ff7a00',
      'forescout': '#005da8',
      'fortinet': '#ee3124',
      'fortinac': '#ee3124',
      'portnox': '#2bd25b',
      'microsoft': '#00a4ef',
      'nps': '#00a4ef',
      'securew2': '#8bc53f'
    };
    
    // Find all images that are likely vendor logos
    const vendorImages = document.querySelectorAll('img[src*="logo"], img[alt*="logo"]');
    vendorImages.forEach(img => {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || '';
      
      // Find which vendor this logo is for
      let vendor = '';
      Object.keys(vendorColors).forEach(v => {
        if (src && src.toLowerCase().includes(v) || alt.toLowerCase().includes(v)) {
          vendor = v;
        }
      });
      
      if (vendor && vendorColors[vendor]) {
        // Set up error handler to create text-based fallback
        img.onerror = function() {
          console.log(`Creating fallback for ${vendor} logo`);
          // Create a canvas element as a fallback
          const canvas = document.createElement('canvas');
          canvas.width = 150;
          canvas.height = 50;
          
          // Draw vendor name on canvas
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = vendorColors[vendor];
          ctx.font = 'bold 20px Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(vendor.toUpperCase(), 75, 25);
          
          // Replace the img src with the canvas data
          img.src = canvas.toDataURL();
        };
        
        // Force error handler to run if already failed
        if (img.complete && img.naturalWidth === 0) {
          img.onerror();
        }
      }
    });
    
    // Handle missing font files
    const createFontFallback = () => {
      // Inject a fallback font-face declaration
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'FontAwesome';
          src: local('Arial');
          font-weight: normal;
          font-style: normal;
        }
        
        [class^="fa-"], [class*=" fa-"] {
          font-family: 'FontAwesome', Arial, sans-serif;
        }
        
        .fa-calculator:before { content: "📊"; }
        .fa-building:before { content: "🏢"; }
        .fa-magic:before { content: "✨"; }
        .fa-chart-line:before { content: "📈"; }
        .fa-check:before { content: "✓"; }
        .fa-check-circle:before { content: "✓"; }
        .fa-shield:before { content: "🛡️"; }
        .fa-dollar-sign:before { content: "$"; }
        .fa-exchange-alt:before { content: "⇄"; }
      `;
      document.head.appendChild(style);
    };
    
    // Apply font fallback after a short delay
    setTimeout(createFontFallback, 1000);
    
    console.log('Resource fallbacks established');
  });
})();
