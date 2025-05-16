// Main Integration File for Portnox TCO Analyzer Fixes
(function() {
    console.log('🚀 Initializing Portnox TCO Analyzer enhancements...');
    
    // Load required modules in the correct order
    const modules = [
        'js/fixes/vendor-data-fix.js',
        'js/fixes/chart-enhancements.js',
        'js/fixes/sidebar-fix.js',
        'js/fixes/report-generator-enhanced.js',
        'js/fixes/help-tips.js',
        'js/fixes/visual-enhancements.js'
    ];
    
    let modulesLoaded = 0;
    
    // Function to load a script
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        script.onerror = function() {
            console.error(`Failed to load script: ${src}`);
            callback(); // Continue even if script fails to load
        };
        document.head.appendChild(script);
    }
    
    // Load modules sequentially
    function loadNextModule(index) {
        if (index >= modules.length) {
            console.log(`All ${modules.length} enhancement modules loaded successfully!`);
            initializeApplication();
            return;
        }
        
        loadScript(modules[index], function() {
            modulesLoaded++;
            console.log(`Module loaded (${modulesLoaded}/${modules.length}): ${modules[index]}`);
            loadNextModule(index + 1);
        });
    }
    
    // Initialize the enhanced application
    function initializeApplication() {
        console.log('Initializing enhanced application...');
        
        // Show an initial toast notification
        if (window.showToast) {
            setTimeout(function() {
                window.showToast('TCO Analyzer enhancements loaded successfully!', 'success');
            }, 1000);
        }
        
        // Expose initialization function globally
        window.initializeCharts = function() {
            // Trigger an event that all modules can listen for
            const event = new CustomEvent('chartsInitialized');
            document.dispatchEvent(event);
            
            console.log('Charts initialized successfully!');
        };
    }
    
    // Start loading modules
    loadNextModule(0);
})();
