// Enhanced Module Loader System
class ModuleLoader {
    constructor() {
        this.modules = new Map();
        this.instances = new Map();
        this.loadOrder = [];
        this.debug = true;
        this.initialized = false;
        
        console.log('[ModuleLoader] Enhanced ModuleLoader initialized and ready');
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
        
        // Try to initialize immediately if possible
        this.tryInitialize(name);
    }
    
    tryInitialize(name) {
        const module = this.modules.get(name);
        if (!module || module.loaded) return;
        
        // Check if all dependencies are loaded
        const depsLoaded = module.dependencies.every(dep => 
            this.modules.has(dep) && this.modules.get(dep).loaded
        );
        
        if (depsLoaded) {
            this.initializeModule(name);
            
            // Check if any other modules can now be initialized
            this.modules.forEach((mod, modName) => {
                if (!mod.loaded) {
                    this.tryInitialize(modName);
                }
            });
        }
    }
    
    initializeModule(name) {
        const module = this.modules.get(name);
        if (!module || module.loaded) return;
        
        try {
            // Get dependency instances
            const deps = {};
            module.dependencies.forEach(dep => {
                deps[dep] = this.instances.get(dep);
            });
            
            // Create instance
            let instance;
            if (typeof module.definition === 'function') {
                // Check if it's a class (has prototype) or regular function
                if (module.definition.prototype && module.definition.prototype.constructor === module.definition) {
                    instance = new module.definition(deps);
                } else {
                    instance = module.definition(deps);
                }
            } else {
                instance = module.definition;
            }
            
            this.instances.set(name, instance);
            module.loaded = true;
            this.loadOrder.push(name);
            
            if (this.debug) {
                console.log(`[ModuleLoader] ✓ Module initialized: ${name}`);
            }
            
            // Emit module loaded event
            if (window.eventBus) {
                window.eventBus.emit('module:loaded', { name, instance });
            }
        } catch (error) {
            console.error(`[ModuleLoader] ❌ Failed to initialize module ${name}:`, error);
        }
    }
    
    get(name) {
        if (!this.instances.has(name)) {
            this.tryInitialize(name);
        }
        return this.instances.get(name);
    }
    
    initializeAll() {
        // Keep trying to initialize modules until no more can be initialized
        let initialized;
        do {
            initialized = false;
            this.modules.forEach((module, name) => {
                if (!module.loaded) {
                    const before = module.loaded;
                    this.tryInitialize(name);
                    if (!before && module.loaded) {
                        initialized = true;
                    }
                }
            });
        } while (initialized);
        
        this.initialized = true;
        
        if (this.debug) {
            console.log('[ModuleLoader] All possible modules initialized:', this.loadOrder);
            
            // Report any uninitialized modules
            const uninitialized = [];
            this.modules.forEach((module, name) => {
                if (!module.loaded) {
                    uninitialized.push(name);
                }
            });
            
            if (uninitialized.length > 0) {
                console.warn('[ModuleLoader] Failed to initialize modules:', uninitialized);
            }
        }
    }
    
    isReady() {
        return this.initialized;
    }
    
    getLoadOrder() {
        return [...this.loadOrder];
    }
    
    getAllInstances() {
        return Object.fromEntries(this.instances);
    }
}

// Create global instance
window.ModuleLoader = new ModuleLoader();

// Also create a simple event bus for early events
window.eventBus = {
    events: new Map(),
    on(event, handler) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(handler);
    },
    emit(event, data) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(handler => handler(data));
        }
    }
};
