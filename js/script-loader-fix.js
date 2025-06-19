// Script Loader Fix - Ensures proper loading order
(function() {
    console.log('📦 Fixing script loading order...');
    
    const scriptsToLoad = [
        'js/integration.js',
        'js/vendor-data-complete.js',
        'js/fixes/enhanced-tco-analyzer-fix.js',
        'js/fixes/chart-management-fix.js',
        'js/calculations-comprehensive.js',
        'js/visualizations-enhanced.js',
        'js/tco-analyzer-main.js'
    ];
    
    let loadedCount = 0;
    
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            console.log(`✅ Loaded: ${src}`);
            loadedCount++;
            if (callback) callback();
        };
        script.onerror = () => {
            console.error(`❌ Failed to load: ${src}`);
        };
        document.head.appendChild(script);
    }
    
    function loadNextScript(index) {
        if (index < scriptsToLoad.length) {
            loadScript(scriptsToLoad[index], () => {
                loadNextScript(index + 1);
            });
        } else {
            console.log('🎉 All scripts loaded successfully!');
            // Initialize the application
            if (window.TCOAnalyzer) {
                window.TCOAnalyzer.init();
            }
        }
    }
    
    // Start loading scripts
    loadNextScript(0);
})();
