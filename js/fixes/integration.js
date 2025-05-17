/**
 * Portnox TCO Analyzer Integration Script
 * Integrates all fixes and enhancements
 */
(function() {
    console.log("🚀 Initializing Portnox TCO Analyzer integration script...");
    
    // List of fix scripts in order of dependency
    const fixScripts = [
        "js/fixes/chart-fix.js",
        "js/fixes/vendor-selection-fix.js",
        "js/executive-view-enhancement.js"
    ];
    
    // Load scripts in sequence
    function loadScripts(scripts, index = 0) {
        if (index >= scripts.length) {
            console.log("All fix scripts loaded successfully");
            initializeApplication();
            return;
        }
        
        const script = document.createElement("script");
        script.src = scripts[index];
        script.onload = function() {
            console.log(`Loaded: ${scripts[index]}`);
            loadScripts(scripts, index + 1);
        };
        script.onerror = function() {
            console.error(`Failed to load: ${scripts[index]}`);
            loadScripts(scripts, index + 1);
        };
        
        document.head.appendChild(script);
    }
    
    // Initialize the application after all scripts are loaded
    function initializeApplication() {
        console.log("Initializing enhanced application...");
        
        // Make sure vendor selection is fixed
        if (window.fixVendorSelection) {
            window.fixVendorSelection();
        }
        
        // Initialize charts
        if (window.destroyAllCharts && window.initVendorComparisonCharts) {
            // Destroy all charts first
            window.destroyAllCharts();
            
            // Get selected vendors
            const selectedVendors = getSelectedVendors();
            
            // Initialize charts with selected vendors
            window.initVendorComparisonCharts(selectedVendors);
        }
        
        console.log("Application initialization complete");
    }
    
    // Helper function to get selected vendors
    function getSelectedVendors() {
        const selectedCards = document.querySelectorAll('.vendor-card.selected');
        const vendors = Array.from(selectedCards).map(card => card.dataset.vendor);
        
        // Ensure Portnox is always included
        if (!vendors.includes('portnox')) {
            vendors.unshift('portnox');
        }
        
        return vendors;
    }
    
    // Load scripts when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadScripts(fixScripts);
        });
    } else {
        loadScripts(fixScripts);
    }
})();
