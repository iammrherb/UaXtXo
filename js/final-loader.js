// Final Loader - Ensures everything is loaded properly
(function() {
    console.log('🚀 Starting final loader...');
    
    // Check if all required components are loaded
    function checkDependencies() {
        const required = [
            'Chart',
            'vendorData',
            'ComprehensiveCalculations',
            'EnhancedVisualizations',
            'TCOAnalyzer'
        ];
        
        const missing = required.filter(dep => !window[dep]);
        
        if (missing.length > 0) {
            console.warn('Missing dependencies:', missing);
            return false;
        }
        
        return true;
    }
    
    // Initialize application when everything is ready
    function initializeApp() {
        if (!checkDependencies()) {
            console.log('⏳ Waiting for dependencies...');
            setTimeout(initializeApp, 500);
            return;
        }
        
        console.log('✅ All dependencies loaded!');
        
        // Initialize TCO Analyzer
        if (window.TCOAnalyzer && typeof window.TCOAnalyzer.init === 'function') {
            window.TCOAnalyzer.init();
        }
        
        // Add CSS file
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/tco-analyzer-enhanced.css';
        document.head.appendChild(link);
        
        console.log('🎉 Application fully initialized!');
    }
    
    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
})();
