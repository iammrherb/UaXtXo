/**
 * Improved Portnox TCO Analyzer Fix Integration
 * Version 2.0 - Focused and sequential loading
 */

(function() {
    console.log("🚀 Initializing Portnox TCO Analyzer improved fix integration");

    // Track loaded scripts to avoid duplicates
    const loadedScripts = new Set();

    // List of fix scripts to load in order
    const fixScripts = [
        {
            id: 'chart-fix-update',
            src: 'js/fixes/chart-fix-update.js',
            priority: 1,
            loaded: false
        },
        {
            id: 'calculations-fix',
            src: 'js/fixes/calculations-fix.js',
            priority: 2,
            loaded: false
        },
        {
            id: 'vendor-selection-fix',
            src: 'js/fixes/vendor-selection-fix.js',
            priority: 3,
            loaded: false
        }
    ];

    // Load scripts in sequence
    function loadScriptsSequentially(index = 0) {
        if (index >= fixScripts.length) {
            console.log("🎉 All fix scripts loaded successfully!");
            
            // At this point, we can run initial calculations
            runInitialCalculations();
            return;
        }
        
        const script = fixScripts[index];
        
        // Skip if already loaded
        if (document.getElementById(script.id) || loadedScripts.has(script.id)) {
            console.log(`Script ${script.id} already loaded, skipping`);
            script.loaded = true;
            loadScriptsSequentially(index + 1);
            return;
        }
        
        // Load the script
        const scriptElement = document.createElement('script');
        scriptElement.id = script.id;
        scriptElement.src = script.src;
        scriptElement.async = false;
        
        scriptElement.onload = function() {
            console.log(`✅ Script ${script.id} loaded successfully`);
            script.loaded = true;
            loadedScripts.add(script.id);
            
            // Continue with the next script
            setTimeout(() => loadScriptsSequentially(index + 1), 100);
        };
        
        scriptElement.onerror = function() {
            console.error(`❌ Error loading script ${script.id}`);
            // Continue with the next script despite error
            setTimeout(() => loadScriptsSequentially(index + 1), 100);
        };
        
        document.head.appendChild(scriptElement);
    }

    // Run initial calculations once all scripts are loaded
    function runInitialCalculations() {
        console.log("📊 Running initial calculations");
        
        // Ensure we have selected vendors
        if (!window.selectedVendors || window.selectedVendors.length === 0) {
            window.selectedVendors = ['portnox', 'cisco'];
        }
        
        // Make sure portnox is included
        if (!window.selectedVendors.includes('portnox')) {
            window.selectedVendors.unshift('portnox');
        }
        
        console.log("Selected vendors for calculations:", window.selectedVendors);
        
        // Update calculations
        try {
            if (typeof window.updateCalculations === 'function') {
                window.updateCalculations(window.selectedVendors);
            } else if (typeof window.updateAllCharts === 'function') {
                window.updateAllCharts(window.selectedVendors);
            }
        } catch (error) {
            console.error("Error in initial calculations:", error);
        }
    }

    // Start loading scripts in sequence when DOM is ready
    function init() {
        loadScriptsSequentially();
    }

    // Run immediately if DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        // Otherwise wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', init);
    }

    // Also add a window.onload handler as a fallback
    window.addEventListener('load', function() {
        if (loadedScripts.size === 0) {
            console.log("Running fix loader on window load (fallback)");
            init();
        }
    });

    console.log("🚀 Portnox TCO Analyzer improved fix integration initialized");
})();
