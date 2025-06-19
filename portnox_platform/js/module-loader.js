// Fixed Module Loader System
class ModuleLoader {
    constructor() {
        this.modules = new Map();
        this.instances = new Map();
        this.loadOrder = [];
        this.debug = true;
        this.initialized = false;
        
        if (this.debug) {
            console.log('[ModuleLoader] ModuleLoader initialized and ready');
        }
    }
    
    register(name, moduleDefinition, dependencies = []) {
        if (this.debug) {
            console.log(`[ModuleLoader] Registering module: ${name}`);
        }
        
        this.modules.set(name, {
            definition: moduleDefinition,
            dependencies,
            loaded: false
        });
        
        if (this.debug) {
            console.log(`[ModuleLoader] ✓ Module registered: ${name} with dependencies:`, dependencies);
        }
        
        // Auto-initialize if no dependencies
        if (dependencies.length === 0) {
            this.initializeModule(name);
        }
    }
    
    initializeModule(name) {
        const module = this.modules.get(name);
        if (!module || module.loaded) return;
        
        try {
            // Initialize dependencies first
            module.dependencies.forEach(dep => {
                if (!this.instances.has(dep)) {
                    this.initializeModule(dep);
                }
            });
            
            // Get dependency instances
            const deps = {};
            module.dependencies.forEach(dep => {
                deps[dep] = this.instances.get(dep);
            });
            
            // Create instance
            const instance = typeof module.definition === 'function' 
                ? new module.definition(deps)
                : module.definition;
            
            this.instances.set(name, instance);
            module.loaded = true;
            this.loadOrder.push(name);
            
            if (this.debug) {
                console.log(`[ModuleLoader] ✓ Module initialized: ${name}`);
            }
        } catch (error) {
            console.error(`[ModuleLoader] ❌ Failed to initialize module ${name}:`, error);
        }
    }
    
    get(name) {
        if (!this.instances.has(name)) {
            // Try to initialize if not already done
            this.initializeModule(name);
        }
        
        const instance = this.instances.get(name);
        if (!instance && this.debug) {
            console.warn(`[ModuleLoader] Module ${name} not found or not initialized`);
        }
        return instance;
    }
    
    initializeAll() {
        // Initialize all registered modules
        for (const [name, module] of this.modules) {
            if (!module.loaded) {
                this.initializeModule(name);
            }
        }
        this.initialized = true;
        if (this.debug) {
            console.log('[ModuleLoader] All modules initialized:', this.loadOrder);
        }
    }
    
    isReady() {
        return this.initialized;
    }
    
    getLoadOrder() {
        return [...this.loadOrder];
    }
}

// Create global instance
window.ModuleLoader = new ModuleLoader();
