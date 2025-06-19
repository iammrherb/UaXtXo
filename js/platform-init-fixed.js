// Platform Initialization - Fixed Version
console.log('🚀 Starting platform initialization...');

// Create initialization queue
window.initQueue = [];
window.modulesReady = false;

// Module check function
function checkModulesAndInit() {
    const requiredModules = [
        'ModuleLoader',
        'VendorDataComplete',
        'ComplianceDatabase',
        'CompleteIndustryCompliance',
        'AdvancedControls',
        'AdvancedCharts'
    ];
    
    // Check if all modules are available
    const missingModules = requiredModules.filter(module => {
        const isLoaded = window[module] || 
                        (window.ModuleLoader && window.ModuleLoader.isLoaded(module));
        if (!isLoaded) {
            console.log(`⏳ Waiting for module: ${module}`);
        }
        return !isLoaded;
    });
    
    if (missingModules.length === 0) {
        console.log('✅ All modules loaded successfully!');
        window.modulesReady = true;
        
        // Process initialization queue
        while (window.initQueue.length > 0) {
            const fn = window.initQueue.shift();
            try {
                fn();
            } catch (error) {
                console.error('Error in queued initialization:', error);
            }
        }
        
        // Initialize platform if not already done
        if (!window.platformInitialized) {
            initializePlatform();
        }
    } else {
        // Check again in 100ms
        setTimeout(checkModulesAndInit, 100);
    }
}

// Platform initialization
function initializePlatform() {
    console.log('🎯 Initializing platform components...');
    
    try {
        // Initialize platform if available
        if (window.platform && typeof window.platform.init === 'function') {
            window.platform.init();
        } else {
            console.log('Creating new platform instance...');
            window.platform = new window.PortnoxAnalyzerPlatform();
            window.platform.init();
        }
        
        window.platformInitialized = true;
        console.log('✅ Platform initialization complete!');
    } catch (error) {
        console.error('❌ Platform initialization error:', error);
    }
}

// Start checking for modules
checkModulesAndInit();

// Helper function to queue initialization tasks
window.queueInit = function(fn) {
    if (window.modulesReady) {
        fn();
    } else {
        window.initQueue.push(fn);
    }
};

console.log('✅ Platform initialization script loaded');
