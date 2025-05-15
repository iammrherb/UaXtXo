/**
 * Image Fallback Handler
 * Provides fallback for vendor logos that fail to load
 */
document.addEventListener('DOMContentLoaded', function() {
  // Handle all vendor logo images
  document.querySelectorAll('img[src*="logo"]').forEach(function(img) {
    img.onerror = function() {
      // Extract vendor name from src
      const src = img.src;
      let vendorName = "vendor";
      
      if (src.includes('cisco')) vendorName = "Cisco";
      else if (src.includes('aruba')) vendorName = "Aruba";
      else if (src.includes('forescout')) vendorName = "Forescout";
      else if (src.includes('fortinac')) vendorName = "FortiNAC";
      else if (src.includes('microsoft')) vendorName = "Microsoft";
      else if (src.includes('securew2')) vendorName = "SecureW2";
      else if (src.includes('portnox')) vendorName = "Portnox";
      
      // Create canvas element for fallback
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      
      // Draw background
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, 200, 100);
      
      // Draw colored rectangle
      let color = '#555555';
      if (src.includes('cisco')) color = '#1BA0D7';
      else if (src.includes('aruba')) color = '#F58220';
      else if (src.includes('forescout')) color = '#3F3F95';
      else if (src.includes('fortinac')) color = '#EE3124';
      else if (src.includes('microsoft')) color = '#00A4EF';
      else if (src.includes('securew2')) color = '#4CAF50';
      else if (src.includes('portnox')) color = '#65BD44';
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(10, 10, 180, 80, 10);
      ctx.fill();
      
      // Draw text
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(vendorName + ' Logo', 100, 50);
      
      // Replace img src with canvas data URL
      img.src = canvas.toDataURL('image/png');
    };
  });
  
  // Add roundRect method if not supported by browser
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
