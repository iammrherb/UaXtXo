/**
 * Enhanced ModuleLoader for Portnox TCO Analyzer
 * Ensures proper module registration and retrieval for all vendor comparisons
 */
class ModuleLoader {
    constructor() {
        this.modules = new Map();
        this.initialized = new Map();
        this.dependencies = new Map();
        console.log('[ModuleLoader] ModuleLoader initialized and ready');
    }

    register(name, moduleClass, dependencies = []) {
        console.log(`[ModuleLoader] Registering module: ${name}`);
        
        if (this.modules.has(name)) {
            console.warn(`[ModuleLoader] Module ${name} already registered`);
            return;
        }

        this.modules.set(name, moduleClass);
        this.dependencies.set(name, dependencies);
        console.log(`[ModuleLoader] ✓ Module registered: ${name} with dependencies:`, dependencies);
    }

    get(name) {
        if (!this.initialized.has(name)) {
            this.initialize(name);
        }
        return this.initialized.get(name);
    }

    initialize(name) {
        if (this.initialized.has(name)) {
            return this.initialized.get(name);
        }

        const ModuleClass = this.modules.get(name);
        if (!ModuleClass) {
            console.error(`[ModuleLoader] Module ${name} not found`);
            return null;
        }

        // Initialize dependencies first
        const deps = this.dependencies.get(name) || [];
        const resolvedDeps = {};
        
        for (const dep of deps) {
            resolvedDeps[dep] = this.initialize(dep);
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

    getAllModules() {
        return Array.from(this.modules.keys());
    }

    isRegistered(name) {
        return this.modules.has(name);
    }
}

// Create global instance
window.ModuleLoader = new ModuleLoader();

// Auto-register core modules
document.addEventListener('DOMContentLoaded', () => {
    console.log('[ModuleLoader] DOM ready - checking for core modules...');
    
    // Register EventSystem if available
    if (window.EventSystem) {
        window.ModuleLoader.register('EventSystem', EventSystem);
    }
    
    // Register ConfigManager if available
    if (window.ConfigManager) {
        window.ModuleLoader.register('ConfigManager', ConfigManager);
    }
});
