/**
 * Master Fix Script for Portnox TCO Analyzer
 * Integrates all fixes and enhancements
 */
(function() {
  console.log("🔄 Initializing Portnox TCO Analyzer master fix script...");
  
  // Load all fix scripts in the correct order
  function loadScript(src, callback) {
    console.log(`🔄 Loading script: ${src}`);
    
    const script = document.createElement('script');
    script.src = src;
    script.onload = function() {
      console.log(`✅ Loaded: ${src}`);
      if (callback) callback();
    };
    script.onerror = function() {
      console.error(`❌ Failed to load: ${src}`);
      if (callback) callback();
    };
    
    document.head.appendChild(script);
  }
  
  // Load CSS
  function loadCSS(href) {
    console.log(`🔄 Loading CSS: ${href}`);
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
  
  // Load scripts sequentially
  function loadScriptsSequentially(scripts, callback) {
    let index = 0;
    
    function loadNext() {
      if (index < scripts.length) {
        loadScript(scripts[index], function() {
          index++;
          loadNext();
        });
      } else if (callback) {
        callback();
      }
    }
    
    loadNext();
  }
  
  // Scripts to load in order
  const fixScripts = [
    'js/fixes/chart-destroyer-fix.js',
    'js/fixes/vendor-selection-fix.js',
    'js/fixes/ui-layout-fix.js'
  ];
  
  // CSS to load
  const fixStyles = [
    'css/fixes/vendor-selection-fix.css'
  ];
  
  // Load CSS files
  fixStyles.forEach(css => {
    loadCSS(css);
  });
  
  // Load scripts sequentially and run initialization
  loadScriptsSequentially(fixScripts, function() {
    console.log("🎉 All fix scripts loaded successfully!");
    
    // Initialize application with fixes
    console.log("🚀 Initializing application with fixes applied");
    
    // Run initialization when DOM is ready
    function initializeApp() {
      console.log("🚀 DOM ready, applying remaining fixes");
      
      // Clean up charts
      if (typeof window.destroyAllCharts === 'function') {
        window.destroyAllCharts();
      }
      
      // Make sure vendor selection is working
      if (window.vendorSelectionUtil) {
        // Default vendors: portnox and one other
        console.log("Selecting default vendors");
        window.vendorSelectionUtil.setSelectedVendors(['portnox', 'cisco']);
      }
      
      // Trigger initial calculations
      console.log("Running initial calculations");
      setTimeout(function() {
        const selectedVendors = window.vendorSelectionUtil ? 
          window.vendorSelectionUtil.getSelectedVendors() : 
          document.querySelectorAll('.vendor-card.selected')
            .map(card => card.getAttribute('data-vendor'))
            .filter(Boolean);
        
        if (typeof window.updateCalculations === 'function') {
          window.updateCalculations(selectedVendors);
        }
      }, 500);
    }
    
    // Initialize app when DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
      initializeApp();
    }
  });
})();
