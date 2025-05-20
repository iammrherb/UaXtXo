/**
 * Enhanced Image Loader
 * Handles 404 errors for missing images by providing fallbacks
 */
document.addEventListener('DOMContentLoaded', function() {
  // Handle vendor logo image errors
  document.querySelectorAll('img[src*="logo"]').forEach(function(img) {
    img.onerror = function() {
      // Extract vendor name from the image path
      const path = img.src;
      const vendorMatch = path.match(/\/([a-z0-9-]+)-logo\.png/i);
      const vendorName = vendorMatch ? vendorMatch[1] : 'vendor';
      
      // Create a canvas element for the fallback
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 100;
      
      // Get the 2D context
      const ctx = canvas.getContext('2d');
      
      // Fill background
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, 200, 100);
      
      // Draw colored rectangle
      ctx.fillStyle = getVendorColor(vendorName);
      ctx.roundRect(10, 10, 180, 80, 10);
      ctx.fill();
      
      // Add text
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(getVendorDisplayName(vendorName), 100, 50);
      
      // Replace the image source with the canvas data URL
      img.src = canvas.toDataURL('image/png');
    };
  });
  
  // Helper function to get vendor color
  function getVendorColor(vendorName) {
    const vendorColors = {
      'cisco': '#1ba0d7',
      'aruba': '#f58220',
      'forescout': '#3f3f95',
      'fortinac': '#ee3124',
      'microsoft': '#00a4ef',
      'securew2': '#4caf50',
      'portnox': '#65BD44'
    };
    
    return vendorColors[vendorName.toLowerCase()] || '#555555';
  }
  
  // Helper function to get vendor display name
  function getVendorDisplayName(vendorName) {
    const vendorDisplayNames = {
      'cisco': 'Cisco ISE',
      'aruba': 'Aruba ClearPass',
      'forescout': 'Forescout',
      'fortinac': 'FortiNAC',
      'microsoft': 'Microsoft NPS',
      'securew2': 'SecureW2',
      'portnox': 'Portnox Cloud'
    };
    
    return vendorDisplayNames[vendorName.toLowerCase()] || vendorName;
  }
  
  // Add roundRect method if not supported
  if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
      if (width < 2 * radius) radius = width / 2;
      if (height < 2 * radius) radius = height / 2;
      this.beginPath();
      this.moveTo(x + radius, y);
      this.arcTo(x + width, y, x + width, y + height, radius);
      this.arcTo(x + width, y + height, x, y + height, radius);
      this.arcTo(x, y + height, x, y, radius);
      this.arcTo(x, y, x + width, y, radius);
      this.closePath();
      return this;
    };
  }
});
