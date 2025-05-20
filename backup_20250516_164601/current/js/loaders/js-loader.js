/**
 * JS Loader - Handles script loading sequence for the TCO Analyzer
 */
(function() {
    console.log("JS Loader: Initializing script loading sequence");
    
    // List of scripts to load in order
    const scripts = [
        // Fix scripts
        "js/fixes/chart-destroyer.js",
        "js/fixes/implementation-fix.js",
        
        // Enhancement scripts
        "js/vendor-comparisons/vendor-advantages.js",
        "js/charts/enhanced/chart-enhancer.js"
    ];
    
    // Keep track of loaded scripts
    let loadedScripts = 0;
    
    // Check if script is already loaded
    function isScriptLoaded(src) {
        return document.querySelector(`script[src="${src}"]`) !== null;
    }
    
    // Load a script
    function loadScript(src) {
        if (isScriptLoaded(src)) {
            console.log(`Script already loaded: ${src}`);
            loadedScripts++;
            updateProgress();
            loadNextScript();
            return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.onload = function() {
            console.log(`Loaded script: ${src}`);
            loadedScripts++;
            updateProgress();
            loadNextScript();
        };
        script.onerror = function() {
            console.error(`Failed to load script: ${src}`);
            loadedScripts++;
            updateProgress();
            loadNextScript();
        };
        document.body.appendChild(script);
    }
    
    // Update loading progress
    function updateProgress() {
        const progress = Math.floor((loadedScripts / scripts.length) * 100);
        console.log(`Loading progress: ${progress}%`);
    }
    
    // Load the next script in the queue
    function loadNextScript() {
        if (loadedScripts < scripts.length) {
            loadScript(scripts[loadedScripts]);
        } else {
            console.log("JS Loader: All scripts loaded successfully");
            
            // Initialize the application
            if (window.AppController && typeof window.AppController.initialize === 'function') {
                window.AppController.initialize();
            } else {
                console.log("Application initialized through individual scripts");
                
                // Create event to notify that all scripts are loaded
                const event = new CustomEvent('js-loader-complete');
                document.dispatchEvent(event);
            }
        }
    }
    
    // Start loading scripts
    loadNextScript();
})();
