/**
 * Module Integration Script
 * Ensures all modules work together properly
 */

// Wait for all modules to be defined
function waitForModules(callback, timeout = 5000) {
    const requiredModules = [
        'EventSystem',
        'ConfigManager',
        'VendorDatabase',
        'IndustryDatabase',
        'ComplianceDatabase'
    ];
    
    const startTime = Date.now();
    
    function check() {
        const allExist = requiredModules.every(name => !!window[name]);
        
        if (allExist) {
            callback();
        } else if (Date.now() - startTime < timeout) {
            setTimeout(check, 100);
        } else {
            console.error('Timeout waiting for modules:', 
                requiredModules.filter(name => !window[name]));
            callback();
        }
    }
    
    check();
}

// Integration function
function integrateModules() {
    console.log('[Integration] Starting module integration...');
    
    // Ensure all modules are registered
    if (window.ModuleRegistrationHelper) {
        ModuleRegistrationHelper.registerAllModules();
    }
    
    // Initialize ModuleLoader
    if (window.ModuleLoader) {
        ModuleLoader.initializeAll();
        
        // Manual fallback for critical modules
        const criticalModules = ['EventSystem', 'ConfigManager'];
        
        for (const moduleName of criticalModules) {
            if (!ModuleLoader.get(moduleName) && window[moduleName]) {
                try {
                    const instance = new window[moduleName]();
                    ModuleLoader.instances.set(moduleName, instance);
                    console.log(`[Integration] ✅ ${moduleName} created via fallback`);
                } catch (error) {
                    console.error(`[Integration] Failed to create ${moduleName}:`, error);
                }
            }
        }
    }
    
    console.log('[Integration] Module integration complete');
}

// Run integration
waitForModules(() => {
    integrateModules();
    
    // Trigger platform initialization if not already done
    if (window.initializePlatform && !window.__platformServices) {
        window.initializePlatform();
    }
});

// Export integration utilities
window.ModuleIntegration = {
    waitForModules,
    integrateModules,
    
    // Force reload all modules
    forceReload() {
        if (window.ModuleLoader) {
            ModuleLoader.reset();
        }
        integrateModules();
    }
};
