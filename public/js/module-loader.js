// Portnox Module Loader - Final Implementation
// This is the ONLY module loader - no other versions should exist

(function(global) {
    'use strict';
    
    console.log('[ModuleLoader] Starting initialization...');
    
    // Module Loader Implementation
    class ModuleLoaderImpl {
        constructor() {
            this.modules = new Map();
            this.loadOrder = [];
            this.initialized = false;
            this.initPromises = new Map();
            console.log('[ModuleLoader] Core created');
        }
        
        register(name, module) {
            if (typeof name !== 'string' || !name) {
                console.error('[ModuleLoader] Invalid module name:', name);
                return false;
            }
            
            if (!module || typeof module !== 'object') {
                console.error('[ModuleLoader] Invalid module object:', module);
                return false;
            }
            
            console.log(`[ModuleLoader] Registering module: ${name}`);
            
            this.modules.set(name, {
                name: name,
                module: module,
                initialized: false,
                dependencies: module.dependencies || []
            });
            
            if (!this.loadOrder.includes(name)) {
                this.loadOrder.push(name);
            }
            
            console.log(`[ModuleLoader] ✓ Module ${name} registered successfully`);
            return true;
        }
        
        async initializeModule(name) {
            const moduleInfo = this.modules.get(name);
            if (!moduleInfo) {
                console.error(`[ModuleLoader] Module not found: ${name}`);
                return false;
            }
            
            if (moduleInfo.initialized) {
                return true;
            }
            
            // Prevent circular initialization
            if (this.initPromises.has(name)) {
                return this.initPromises.get(name);
            }
            
            const initPromise = this._doInitializeModule(name, moduleInfo);
            this.initPromises.set(name, initPromise);
            
            try {
                const result = await initPromise;
                this.initPromises.delete(name);
                return result;
            } catch (error) {
                this.initPromises.delete(name);
                throw error;
            }
        }
        
        async _doInitializeModule(name, moduleInfo) {
            console.log(`[ModuleLoader] Initializing module: ${name}`);
            
            // Initialize dependencies first
            for (const dep of moduleInfo.dependencies) {
                const depSuccess = await this.initializeModule(dep);
                if (!depSuccess) {
                    console.error(`[ModuleLoader] Failed to initialize dependency ${dep} for module ${name}`);
                    return false;
                }
            }
            
            try {
                // Initialize the module
                if (moduleInfo.module.initialize && typeof moduleInfo.module.initialize === 'function') {
                    await moduleInfo.module.initialize();
                }
                
                moduleInfo.initialized = true;
                console.log(`[ModuleLoader] ✓ Module ${name} initialized`);
                return true;
                
            } catch (error) {
                console.error(`[ModuleLoader] Error initializing module ${name}:`, error);
                return false;
            }
        }
        
        async initializeAll() {
            console.log('[ModuleLoader] Starting batch initialization...');
            const startTime = Date.now();
            
            // Get initialization order
            const order = this.getInitializationOrder();
            console.log('[ModuleLoader] Initialization order:', order);
            
            let successCount = 0;
            const results = [];
            
            for (const moduleName of order) {
                try {
                    const success = await this.initializeModule(moduleName);
                    if (success) {
                        successCount++;
                        results.push({ name: moduleName, success: true });
                    } else {
                        results.push({ name: moduleName, success: false });
                    }
                } catch (error) {
                    console.error(`[ModuleLoader] Failed to initialize ${moduleName}:`, error);
                    results.push({ name: moduleName, success: false, error });
                }
            }
            
            const duration = Date.now() - startTime;
            this.initialized = successCount === order.length;
            
            console.log(`[ModuleLoader] Batch initialization complete in ${duration}ms`);
            console.log(`[ModuleLoader] Success: ${successCount}/${order.length} modules`);
            
            return this.initialized;
        }
        
        getInitializationOrder() {
            const visited = new Set();
            const result = [];
            
            const visit = (name) => {
                if (visited.has(name)) return;
                
                visited.add(name);
                const moduleInfo = this.modules.get(name);
                
                if (moduleInfo && moduleInfo.dependencies) {
                    for (const dep of moduleInfo.dependencies) {
                        if (this.modules.has(dep)) {
                            visit(dep);
                        }
                    }
                }
                
                result.push(name);
            };
            
            // Visit all modules
            for (const name of this.loadOrder) {
                visit(name);
            }
            
            return result;
        }
        
        getModule(name) {
            const moduleInfo = this.modules.get(name);
            return moduleInfo ? moduleInfo.module : null;
        }
        
        isInitialized() {
            return this.initialized;
        }
        
        getRegisteredModules() {
            return Array.from(this.modules.keys());
        }
        
        getAllModules() {
            const result = {};
            this.modules.forEach((info, name) => {
                result[name] = {
                    module: info.module,
                    initialized: info.initialized,
                    dependencies: info.dependencies
                };
            });
            return result;
        }
    }
    
    // Create the singleton instance
    const moduleLoaderInstance = new ModuleLoaderImpl();
    
    // Create the public API with bound methods
    const ModuleLoaderAPI = {
        // Core methods
        register: function(name, module) {
            return moduleLoaderInstance.register(name, module);
        },
        
        initializeAll: function() {
            return moduleLoaderInstance.initializeAll();
        },
        
        initializeModule: function(name) {
            return moduleLoaderInstance.initializeModule(name);
        },
        
        getModule: function(name) {
            return moduleLoaderInstance.getModule(name);
        },
        
        isInitialized: function() {
            return moduleLoaderInstance.isInitialized();
        },
        
        getRegisteredModules: function() {
            return moduleLoaderInstance.getRegisteredModules();
        },
        
        getAllModules: function() {
            return moduleLoaderInstance.getAllModules();
        },
        
        // Debug method
        _getInstance: function() {
            return moduleLoaderInstance;
        }
    };
    
    // Expose to global scope (window in browser)
    global.ModuleLoader = ModuleLoaderAPI;
    
    // Also expose as AMD module if available
    if (typeof define === 'function' && define.amd) {
        define([], function() { return ModuleLoaderAPI; });
    }
    
    // Also expose as CommonJS module if available
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ModuleLoaderAPI;
    }
    
    console.log('[ModuleLoader] ✓ Module Loader ready and exposed globally');
    console.log('[ModuleLoader] Available methods:', Object.keys(ModuleLoaderAPI));
    
    // Verify the methods are actually functions
    console.log('[ModuleLoader] Method check:');
    console.log('  - register:', typeof ModuleLoaderAPI.register);
    console.log('  - initializeAll:', typeof ModuleLoaderAPI.initializeAll);
    console.log('  - getModule:', typeof ModuleLoaderAPI.getModule);
    
})(typeof window !== 'undefined' ? window : global);

// Final verification
if (typeof window !== 'undefined') {
    console.log('[ModuleLoader] Final check - window.ModuleLoader:', window.ModuleLoader);
    console.log('[ModuleLoader] Final check - window.ModuleLoader.register:', typeof window.ModuleLoader.register);
}
