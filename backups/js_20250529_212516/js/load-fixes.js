/**
 * Load all fixes for Portnox Total Cost Analyzer
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log("Loading fixes for Portnox Total Cost Analyzer...");
  
  // Load CSS fixes
  function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    console.log(`Loaded CSS: ${href}`);
  }
  
  // Load JavaScript fixes
  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    if (callback) {
      script.onload = callback;
    }
    document.head.appendChild(script);
    console.log(`Loaded script: ${src}`);
  }
  
  // Load essential CSS fixes
  loadCSS('css/custom/enhanced-styles.css');
  loadCSS('css/security-view.css');
  
  // Load JavaScript fixes in sequence
  loadScript('js/models/vendors-data-fix.js', function() {
    loadScript('js/charts/chart-config.js', function() {
      loadScript('js/charts/apex/apex-charts.js', function() {
        loadScript('js/charts/security-charts.js', function() {
          loadScript('js/charts/d3/d3-manager.js', function() {
            loadScript('js/comprehensive-fix.js', function() {
              console.log("All fixes loaded successfully!");
            });
          });
        });
      });
    });
  });
});
