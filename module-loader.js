// Enhanced ModuleLoader with all required methods
(function() {
    'use strict';
    
    class EnhancedModuleLoader {
        constructor() {
            this.modules = new Map();
            this.initialized = new Set();
            this.dependencies = new Map();
            console.log('[ModuleLoader] Enhanced ModuleLoader initialized');
        }
        
        register(name, moduleFactory) {
            if (typeof name !== 'string' || typeof moduleFactory !== 'function') {
                throw new Error('Invalid module registration');
            }
            
            this.modules.set(name, {
                factory: moduleFactory,
                instance: null,
                initialized: false
            });
            
            console.log(`[ModuleLoader] Module registered: ${name}`);
            return this;
        }
        
        async initializeAll() {
            console.log('[ModuleLoader] Initializing all modules...');
            const initPromises = [];
            
            for (const [name, module] of this.modules) {
                if (!module.initialized) {
                    initPromises.push(this.initialize(name));
                }
            }
            
            await Promise.all(initPromises);
            console.log('[ModuleLoader] All modules initialized successfully');
            return true;
        }
        
        async initialize(name) {
            const module = this.modules.get(name);
            if (!module) {
                throw new Error(`Module ${name} not found`);
            }
            
            if (module.initialized) {
                return module.instance;
            }
            
            try {
                module.instance = await module.factory();
                module.initialized = true;
                this.initialized.add(name);
                console.log(`[ModuleLoader] Module initialized: ${name}`);
                return module.instance;
            } catch (error) {
                console.error(`[ModuleLoader] Failed to initialize ${name}:`, error);
                throw error;
            }
        }
        
        get(name) {
            const module = this.modules.get(name);
            return module ? module.instance : null;
        }
        
        isInitialized(name) {
            return this.initialized.has(name);
        }
        
        reset() {
            this.modules.clear();
            this.initialized.clear();
            this.dependencies.clear();
        }
    }
    
    // Create global instance
    window.ModuleLoader = new EnhancedModuleLoader();
    
    // Auto-register core modules
    const coreModules = [
        'EventSystem',
        'ConfigManager',
        'VendorDatabase',
        'IndustryDatabase',
        'ComplianceDatabase'
    ];
    
    coreModules.forEach(module => {
        if (window[module]) {
            window.ModuleLoader.register(module, () => window[module]);
        }
    });
    
    console.log('[ModuleLoader] Core module loader ready');
})();
