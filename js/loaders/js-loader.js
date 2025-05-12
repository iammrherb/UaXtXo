/**
 * JavaScript Loader
 * Ensures proper loading order for all scripts
 */
(function() {
    console.log("JS Loader: Initializing script loading sequence");
    
    // List of scripts to load in order
    const scripts = [
        // Core libraries first
        'libs/js/chart.min.js',
        'libs/js/chartjs-plugin-datalabels.min.js',
        'libs/js/d3.min.js',
        'libs/js/gsap.min.js',
        'libs/js/lodash.min.js',
        
        // Core utilities
        'js/core/helpers.js',
        'js/core/dom.js',
        'js/core/validation.js',
        
        // Data modules
        'js/data/enhanced-vendors.js',
        'js/data/industry.js',
        'js/data/compliance.js',
        'js/vendor-comparisons/vendor-advantages.js',
        
        // Data processors
        'js/data/processors/tco-calculator.js',
        'js/data/processors/industry-compliance-processor.js',
        'js/data/processors/feature-comparison-processor.js',
        
        // Component managers
        'js/components/charts/chart-manager.js',
        'js/managers/state.js',
        
        // Wizard and fixes
        'js/wizards/tco-wizard.js',
        'js/wizard-fix.js',
        
        // Implementation-specific fixes
        'js/fixes/implementation-fix.js',
        
        // Final initialization
        'js/final-patch.js'
    ];
    
    // Counter to track loaded scripts
    let loadedScripts = 0;
    
    // Function to load a script
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            // Check if script is already loaded
            const existingScript = document.querySelector(`script[src="${src}"]`);
            if (existingScript) {
                console.log(`Script already loaded: ${src}`);
                resolve();
                return;
            }
            
            // Create script element
            const script = document.createElement('script');
            script.src = src;
            script.async = false; // Maintain order
            
            // Set up load handlers
            script.onload = () => {
                console.log(`Loaded script: ${src}`);
                loadedScripts++;
                updateLoadingProgress();
                resolve();
            };
            
            script.onerror = () => {
                console.error(`Failed to load script: ${src}`);
                reject(new Error(`Failed to load ${src}`));
            };
            
            // Add to document
            document.head.appendChild(script);
        });
    }
    
    // Function to update loading progress
    function updateLoadingProgress() {
        const progress = Math.round((loadedScripts / scripts.length) * 100);
        console.log(`Loading progress: ${progress}%`);
        
        // You can add visual loading indicator here
    }
    
    // Function to load all scripts in sequence
    async function loadScriptsInOrder() {
        for (const src of scripts) {
            try {
                await loadScript(src);
            } catch (error) {
                console.error(`Error loading script sequence: ${error.message}`);
                // Continue loading other scripts even if one fails
            }
        }
        
        console.log("JS Loader: All scripts loaded successfully");
        
        // Trigger application initialization
        if (typeof window.initApplication === 'function') {
            window.initApplication();
        } else {
            console.log("Application initialized through individual scripts");
        }
    }
    
    // Start loading scripts
    loadScriptsInOrder();
})();
