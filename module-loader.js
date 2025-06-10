/**
 * Enhanced Module Loader for Portnox Total Cost Analyzer
 * Handles proper module instantiation and dependency management
 */
class ModuleLoader {
    constructor() {
        this.modules = new Map();
        this.instances = new Map();
        this.loadOrder = [];
        this.pendingModules = new Set();
        this.debug = true;
        this.initialized = false;
        
        // Configuration
        this.config = {
            autoInitialize: true,
            maxRetries: 3,
            retryDelay: 100,
            timeout: 5000
        };
        
        if (this.debug) {
            console.log('[ModuleLoader] Enhanced ModuleLoader initialized');
        }
    }
    
    /**
     * Register a module with the loader
     */
    register(name, moduleDefinition, dependencies = []) {
        if (this.debug) {
            console.log(`[ModuleLoader] Registering module: ${name}`);
        }
        
        // Validate module definition
        if (!moduleDefinition) {
            error(`Invalid module definition for ${name}`);
            return false;
        }
        
        this.modules.set(name, {
            definition: moduleDefinition,
            dependencies,
            loaded: false,
            retries: 0
        });
        
        this.pendingModules.add(name);
        
        if (this.debug) {
            console.log(`[ModuleLoader] ✓ Module registered: ${name} with dependencies:`, dependencies);
        }
        
        // Auto-initialize if enabled and no dependencies
        if (this.config.autoInitialize && dependencies.length === 0) {
            this.initializeModule(name);
        }
        
        // Try to initialize any pending modules
        this.processPendingModules();
        
        return true;
    }
    
    /**
     * Initialize a specific module
     */
    initializeModule(name, force = false) {
        const module = this.modules.get(name);
        if (!module) {
            console.warn(`[ModuleLoader] Module ${name} not found`);
            return false;
        }
        
        if (module.loaded && !force) {
            return true;
        }
        
        try {
            // Check dependencies
            const missingDeps = [];
            for (const dep of module.dependencies) {
                if (!this.instances.has(dep)) {
                    // Try to initialize the dependency
                    if (!this.initializeModule(dep)) {
                        missingDeps.push(dep);
                    }
                }
            }
            
            if (missingDeps.length > 0) {
                if (this.debug) {
                    console.log(`[ModuleLoader] Waiting for dependencies for ${name}:`, missingDeps);
                }
                return false;
            }
            
            // Gather dependency instances
            const deps = {};
            module.dependencies.forEach(dep => {
                deps[dep] = this.instances.get(dep);
            });
            
            // Create instance
            let instance;
            const ModuleDef = module.definition;
            
            // Handle different module types
            if (typeof ModuleDef === 'function') {
                // Check if it's a class (has prototype with constructor)
                if (ModuleDef.prototype && ModuleDef.prototype.constructor === ModuleDef) {
                    // It's a class - instantiate with new
                    instance = new ModuleDef(deps);
                } else {
                    // It's a function - call it
                    instance = ModuleDef(deps);
                    
                    // If function returns undefined, try as class
                    if (instance === undefined) {
                        try {
                            instance = new ModuleDef(deps);
                        } catch (e) {
                            // Not a class, use the function itself
                            instance = ModuleDef;
                        }
                    }
                }
            } else if (typeof ModuleDef === 'object') {
                // It's already an object instance
                instance = ModuleDef;
            } else {
                throw new Error(`Invalid module type for ${name}: ${typeof ModuleDef}`);
            }
            
            // Store instance
            this.instances.set(name, instance);
            module.loaded = true;
            this.loadOrder.push(name);
            this.pendingModules.delete(name);
            
            if (this.debug) {
                console.log(`[ModuleLoader] ✅ Module initialized: ${name}`);
            }
            
            // Emit module loaded event if EventSystem exists
            const eventSystem = this.instances.get('EventSystem');
            if (eventSystem && eventSystem.emit) {
                eventSystem.emit('module:loaded', { name, instance });
            }
            
            return true;
            
        } catch (error) {
            console.error(`[ModuleLoader] ❌ Failed to initialize module ${name}:`, error);
            module.retries++;
            
            if (module.retries < this.config.maxRetries) {
                setTimeout(() => this.initializeModule(name), this.config.retryDelay * module.retries);
            }
            
            return false;
        }
    }
    
    /**
     * Process all pending modules
     */
    processPendingModules() {
        let progress = true;
        let iterations = 0;
        const maxIterations = 10;
        
        while (progress && iterations < maxIterations) {
            progress = false;
            iterations++;
            
            for (const name of this.pendingModules) {
                if (this.initializeModule(name)) {
                    progress = true;
                }
            }
        }
        
        if (this.pendingModules.size > 0 && this.debug) {
            console.warn('[ModuleLoader] Remaining pending modules:', Array.from(this.pendingModules));
        }
    }
    
    /**
     * Get a module instance
     */
    get(name) {
        // Return existing instance
        if (this.instances.has(name)) {
            return this.instances.get(name);
        }
        
        // Try to initialize if registered
        if (this.modules.has(name)) {
            this.initializeModule(name);
            return this.instances.get(name);
        }
        
        // Check if it exists in global scope
        if (window[name]) {
            if (this.debug) {
                console.log(`[ModuleLoader] Found ${name} in global scope, registering...`);
            }
            this.register(name, window[name]);
            return this.get(name);
        }
        
        if (this.debug) {
            console.warn(`[ModuleLoader] Module ${name} not found`);
        }
        return null;
    }
    
    /**
     * Initialize all registered modules
     */
    initializeAll() {
        if (this.debug) {
            console.log('[ModuleLoader] Initializing all modules...');
        }
        
        // First pass - modules with no dependencies
        for (const [name, module] of this.modules) {
            if (module.dependencies.length === 0 && !module.loaded) {
                this.initializeModule(name);
            }
        }
        
        // Process remaining modules
        this.processPendingModules();
        
        this.initialized = true;
        
        if (this.debug) {
            console.log('[ModuleLoader] Initialization complete');
            console.log('[ModuleLoader] Load order:', this.loadOrder);
            
            if (this.pendingModules.size > 0) {
                console.warn('[ModuleLoader] Failed to initialize:', Array.from(this.pendingModules));
            }
        }
        
        return this.loadOrder.length;
    }
    
    /**
     * Wait for a module to be available
     */
    async waitForModule(name, timeout = null) {
        const timeoutMs = timeout || this.config.timeout;
        const startTime = Date.now();
        
        while (Date.now() - startTime < timeoutMs) {
            const instance = this.get(name);
            if (instance) {
                return instance;
            }
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        throw new Error(`Timeout waiting for module: ${name}`);
    }
    
    /**
     * Get multiple modules at once
     */
    async getServices(...moduleNames) {
        const services = {};
        
        for (const name of moduleNames) {
            try {
                services[name] = await this.waitForModule(name);
            } catch (error) {
                console.error(`[ModuleLoader] Failed to get service ${name}:`, error);
                services[name] = null;
            }
        }
        
        return services;
    }
    
    /**
     * Check if all required modules are loaded
     */
    checkRequiredModules(required) {
        const missing = [];
        for (const name of required) {
            if (!this.instances.has(name)) {
                missing.push(name);
            }
        }
        return missing;
    }
    
    /**
     * Get diagnostic information
     */
    getDiagnostics() {
        return {
            registered: Array.from(this.modules.keys()),
            loaded: Array.from(this.instances.keys()),
            pending: Array.from(this.pendingModules),
            loadOrder: this.loadOrder,
            initialized: this.initialized
        };
    }
    
    /**
     * Reset the module loader
     */
    reset() {
        this.modules.clear();
        this.instances.clear();
        this.loadOrder = [];
        this.pendingModules.clear();
        this.initialized = false;
        console.log('[ModuleLoader] Reset complete');
    }
}

// Create global instance with additional safety
if (!window.ModuleLoader) {
    window.ModuleLoader = new ModuleLoader();
    console.log('[ModuleLoader] Global instance created');
} else {
    console.log('[ModuleLoader] Global instance already exists');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModuleLoader;
}
