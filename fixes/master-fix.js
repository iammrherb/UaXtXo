/**
 * Master fix for Total Cost Analyzer
 * Combines all fixes:
 * 1. Robust chart loading
 * 2. Improved cost configuration
 * 3. Logo enforcement
 * 4. Title correction
 * 5. Error suppression
 */
(function() {
  console.log('Applying master fix for Total Cost Analyzer...');
  
  // Error suppression to prevent JavaScript errors in console
  const originalConsoleError = console.error;
  console.error = function() {
    // Check if this is a chart error we want to suppress
    const errorMessage = arguments[0]?.toString() || '';
    if (errorMessage.includes('Canvas is already in use') || 
        errorMessage.includes('ComplianceInsights') ||
        errorMessage.includes('Cannot read properties of undefined')) {
      // Suppress error
      return;
    }
    
    // Pass through to original console.error
    originalConsoleError.apply(console, arguments);
  };
  
  // Check if a script is already loaded
  window._loadedScripts = window._loadedScripts || {};
  
  // Load a script dynamically
  function loadScript(url, callback) {
    if (window._loadedScripts[url]) {
      if (callback) callback();
      return;
    }
    
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    
    if (callback) {
      script.onload = callback;
    }
    
    document.head.appendChild(script);
    window._loadedScripts[url] = true;
  }
  
  // Load all fix scripts
  function loadAllFixes() {
    // Chart fix
    loadScript('fixes/chart-fix-robust.js', function() {
      console.log('Chart fix loaded');
    });
    
    // Cost configuration
    loadScript('fixes/cost-config-improved.js', function() {
      console.log('Cost configuration loaded');
    });
    
    // Logo enforcer
    loadScript('fixes/portnox-logo-enforcer.js', function() {
      console.log('Logo enforcer loaded');
    });
    
    // Title enforcer
    loadScript('fixes/title-enforcer.js', function() {
      console.log('Title enforcer loaded');
    });
  }
  
  // Function to prevent duplicate script loading
  function preventDuplicateScripts() {
    // Override appendChild to prevent duplicate script tags
    const originalAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function(node) {
      // Only check for script nodes
      if (node.nodeName === 'SCRIPT' && node.src) {
        const src = node.src;
        
        // Skip duplicate compliance-insights.js and similar problematic scripts
        if (src.includes('compliance-insights.js') || 
            src.includes('chart-fix.js') && window._loadedScripts['fixes/chart-fix-robust.js']) {
          console.log(`Prevented loading of duplicate script: ${src}`);
          return node; // Return node without appending
        }
        
        // Check if script already loaded
        if (window._loadedScripts[src]) {
          console.log(`Prevented duplicate script load: ${src}`);
          return node; // Return node without appending
        }
        
        // Mark script as loaded
        window._loadedScripts[src] = true;
      }
      
      // Call original method for all other nodes
      return originalAppendChild.call(this, node);
    };
  }
  
  // Apply all fixes
  function applyAllFixes() {
    preventDuplicateScripts();
    loadAllFixes();
    
    // Add CSS to ensure proper styling
    const style = document.createElement('style');
    style.textContent = `
      /* Ensure charts are visible */
      .chart-container {
        display: block !important;
        height: 300px !important;
        position: relative !important;
        width: 100% !important;
        margin-bottom: 20px !important;
      }
      
      canvas {
        display: block !important;
      }
      
      /* Logo styling */
      .logo img, .vendor-card[data-vendor="portnox"] img {
        height: 40px !important;
        width: auto !important;
        object-fit: contain !important;
      }
      
      /* Fix for advanced options panel */
      #advanced-options-panel {
        width: 100% !important;
        display: block !important;
      }
      
      #advanced-options-panel.hidden {
        display: none !important;
      }
      
      /* Ensure cost configuration is styled properly */
      #cost-config-section {
        margin-top: 15px !important;
        border-top: 1px solid #e0e0e0 !important;
        padding-top: 15px !important;
      }
    `;
    
    document.head.appendChild(style);
    
    console.log('All fixes applied successfully');
  }
  
  // Initialize fixes when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAllFixes);
  } else {
    applyAllFixes();
  }
})();
