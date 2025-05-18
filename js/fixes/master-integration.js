/**
 * Master Integration File for Portnox TCO Analyzer
 * This file loads and initializes all fixes and enhancements
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("🔄 Initializing Portnox TCO Analyzer master integration...");
  
  // Function to load script dynamically
  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }
  
  // Function to load multiple scripts in sequence
  function loadScriptsSequentially(scripts, onComplete) {
    let index = 0;
    
    function loadNext() {
      if (index < scripts.length) {
        loadScript(scripts[index], function() {
          console.log(`✅ Loaded ${scripts[index]}`);
          index++;
          loadNext();
        });
      } else if (typeof onComplete === 'function') {
        onComplete();
      }
    }
    
    loadNext();
  }
  
  // Define the order of scripts to load
  const scripts = [
    'js/fixes/chart-destroyer.js',
    'js/fixes/chart-initializer.js',
    'js/fixes/vendor-selection-fix.js',
    'js/fixes/calculations-fix.js',
    'js/fixes/chart-update-handler.js',
    'js/fixes/main-integration.js'
  ];
  
  // Load all scripts and initialize the application
  loadScriptsSequentially(scripts, function() {
    console.log("🎉 All scripts loaded successfully! Initializing application...");
    
    // Initialize the application
    if (typeof window.initPortnoxTcoAnalyzer === 'function') {
      window.initPortnoxTcoAnalyzer();
    } else {
      console.error("❌ Failed to initialize Portnox TCO Analyzer: initPortnoxTcoAnalyzer not found");
    }
  });
});
