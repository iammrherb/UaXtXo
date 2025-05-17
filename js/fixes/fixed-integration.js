/**
 * Portnox TCO Analyzer Fix Integration
 * This script integrates all the fixes and ensures they run in the correct order
 */

(function() {
    console.log("🚀 Initializing Portnox TCO Analyzer fix integration");

    // Fix load timing
    const VENDOR_FIX_LOAD_DELAY = 200;
    const CHART_FIX_LOAD_DELAY = 400;
    const IMAGE_FIX_LOAD_DELAY = 100;

    // Load fixes in the correct order
    function loadFixes() {
        // Step 1: Load image fixes first (crucial for UI rendering)
        setTimeout(() => {
            loadScript('js/fixes/image-loader-fix-update.js', 'image-loader-fix', function() {
                console.log("✅ Image loader fix loaded successfully");
                
                // Step 2: Load vendor selection fix
                setTimeout(() => {
                    loadScript('js/fixes/vendor-selection-fix.js', 'vendor-selection-fix', function() {
                        console.log("✅ Vendor selection fix loaded successfully");
                        
                        // Step 3: Load chart fix
                        setTimeout(() => {
                            loadScript('js/fixes/chart-fix-update.js', 'chart-fix', function() {
                                console.log("✅ Chart fix loaded successfully");
                                console.log("🚀 All fixes loaded successfully");
                                
                                // Run initial calculations after all fixes are loaded
                                setTimeout(() => {
                                    if (window.selectedVendors && window.selectedVendors.length > 0 && 
                                        typeof window.updateCalculations === 'function') {
                                        console.log("Running initial calculations with vendors:", window.selectedVendors);
                                        window.updateCalculations(window.selectedVendors);
                                    }
                                }, 500);
                            });
                        }, CHART_FIX_LOAD_DELAY);
                    });
                }, VENDOR_FIX_LOAD_DELAY);
            });
        }, IMAGE_FIX_LOAD_DELAY);
    }

    // Utility function to load scripts
    function loadScript(src, id, callback) {
        // Check if script already exists
        if (document.getElementById(id)) {
            console.log(`Script ${id} already loaded`);
            if (callback) callback();
            return;
        }
        
        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.async = true;
        
        script.onload = function() {
            console.log(`Script loaded: ${src}`);
            if (callback) callback();
        };
        
        script.onerror = function() {
            console.error(`Error loading script: ${src}`);
            if (callback) callback();
        };
        
        document.head.appendChild(script);
    }

    // Run the fix loader when DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        loadFixes();
    } else {
        document.addEventListener('DOMContentLoaded', loadFixes);
    }

    // Also run on window load as a fallback
    window.addEventListener('load', function() {
        // Only run if not already loaded
        if (!document.getElementById('image-loader-fix')) {
            console.log("Running fix loader on window load (fallback)");
            loadFixes();
        }
    });

    console.log("🚀 Portnox TCO Analyzer fix integration initialized");
})();
