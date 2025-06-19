// ModuleLoader Patch for Portnox TCO Analyzer
// Ensures proper module registration and retrieval

// This patch should be applied to your existing module-loader.js
// Add this method to the ModuleLoader class:

// Inside the ModuleLoader class, update the get method:
get(name) {
    // Check if already initialized
    if (this.initialized.has(name)) {
        return this.initialized.get(name);
    }
    
    // Try to initialize
    const instance = this.initialize(name);
    
    // If initialization failed, try direct instantiation
    if (!instance && window[name]) {
        try {
            console.log(`[ModuleLoader] Attempting direct instantiation of ${name}`);
            const directInstance = new window[name]();
            this.initialized.set(name, directInstance);
            return directInstance;
        } catch (error) {
            console.error(`[ModuleLoader] Direct instantiation failed for ${name}:`, error);
        }
    }
    
    return instance;
}

// Update the initialize method:
initialize(name) {
    if (this.initialized.has(name)) {
        return this.initialized.get(name);
    }

    const ModuleClass = this.modules.get(name);
    
    // If not found in registry, check global scope
    if (!ModuleClass && window[name]) {
        console.log(`[ModuleLoader] Module ${name} not in registry, using global`);
        this.modules.set(name, window[name]);
        return this.initialize(name);
    }
    
    if (!ModuleClass) {
        console.error(`[ModuleLoader] Module ${name} not found`);
        return null;
    }

    // Initialize dependencies first
    const deps = this.dependencies.get(name) || [];
    const resolvedDeps = {};
    
    for (const dep of deps) {
        resolvedDeps[dep] = this.get(dep); // Use get instead of initialize for recursion
        if (!resolvedDeps[dep]) {
            console.error(`[ModuleLoader] Failed to initialize dependency ${dep} for ${name}`);
            return null;
        }
    }

    try {
        const instance = new ModuleClass(resolvedDeps);
        this.initialized.set(name, instance);
        console.log(`[ModuleLoader] ✓ Module initialized: ${name}`);
        return instance;
    } catch (error) {
        console.error(`[ModuleLoader] Failed to initialize module ${name}:`, error);
        return null;
    }
}

// Add a debug method to ModuleLoader:
debug() {
    console.log('[ModuleLoader] Debug Information:');
    console.log('Registered modules:', Array.from(this.modules.keys()));
    console.log('Initialized modules:', Array.from(this.initialized.keys()));
    console.log('Dependencies:', Array.from(this.dependencies.entries()));
}

// Make sure ModuleLoader is globally accessible
window.ModuleLoader = window.ModuleLoader || new ModuleLoader();

// Auto-register modules that are already loaded
document.addEventListener('DOMContentLoaded', () => {
    const modulesToRegister = [
        'EventSystem',
        'ConfigManager',
        'MasterVendorDatabase',
        'IndustryDatabase',
        'ComplianceDatabase',
        'RiskSecurityView',
        'ComplianceViewEnhanced',
        'OperationalImpact',
        'StrategicInsights'
    ];
    
    modulesToRegister.forEach(moduleName => {
        if (window[moduleName] && !window.ModuleLoader.isRegistered(moduleName)) {
            window.ModuleLoader.register(moduleName, window[moduleName]);
            console.log(`[ModuleLoader] Auto-registered: ${moduleName}`);
        }
    });
    
    // Debug output
    window.ModuleLoader.debug();
});
