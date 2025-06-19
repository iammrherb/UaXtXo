// Module Loading Orchestrator
(function() {
    'use strict';
    
    console.log('[LoadModules] Starting module loading sequence...');
    
    // Check if ModuleLoader is available
    if (!window.ModuleLoader) {
        console.error('[LoadModules] ModuleLoader not found! Make sure module-loader.js is loaded first.');
        return;
    }
    
    // Verify ModuleLoader methods
    const requiredMethods = ['register', 'initializeAll', 'getModule'];
    const missingMethods = requiredMethods.filter(method => 
        typeof window.ModuleLoader[method] !== 'function'
    );
    
    if (missingMethods.length > 0) {
        console.error('[LoadModules] ModuleLoader is missing methods:', missingMethods);
        return;
    }
    
    console.log('[LoadModules] ModuleLoader verified, all methods present');
    
    // The platform.js will handle the actual initialization
    console.log('[LoadModules] Module loading orchestrator ready');
})();
