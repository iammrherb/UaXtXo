// Module Loader System for Portnox TCO Analyzer
(function(global) {
    'use strict';

    class ModuleLoader {
        constructor() {
            this.modules = new Map();
            this.loadingModules = new Map();
            this.moduleCallbacks = new Map();
            this.initialized = false;
        }

        register(name, dependencies, factory) {
            if (this.modules.has(name)) {
                console.warn(`Module ${name} already registered`);
                return;
            }

            const module = {
                name,
                dependencies,
                factory,
                exports: null,
                loaded: false
            };

            this.modules.set(name, module);
            this.tryLoadModule(name);
        }

        tryLoadModule(name) {
            const module = this.modules.get(name);
            if (!module || module.loaded || this.loadingModules.has(name)) {
                return;
            }

            // Check if all dependencies are loaded
            const depsLoaded = module.dependencies.every(dep => {
                const depModule = this.modules.get(dep);
                return depModule && depModule.loaded;
            });

            if (!depsLoaded) {
                // Set up dependency tracking
                module.dependencies.forEach(dep => {
                    if (!this.moduleCallbacks.has(dep)) {
                        this.moduleCallbacks.set(dep, []);
                    }
                    this.moduleCallbacks.get(dep).push(name);
                });
                return;
            }

            // Load the module
            this.loadingModules.set(name, true);
            
            try {
                const deps = module.dependencies.map(dep => this.modules.get(dep).exports);
                module.exports = module.factory(...deps);
                module.loaded = true;
                
                console.log(`✓ Module loaded: ${name}`);
                
                // Trigger dependent modules
                const callbacks = this.moduleCallbacks.get(name) || [];
                callbacks.forEach(depName => this.tryLoadModule(depName));
                
                // Clean up
                this.moduleCallbacks.delete(name);
                this.loadingModules.delete(name);
                
                // Dispatch loaded event
                window.dispatchEvent(new CustomEvent('moduleLoaded', { detail: { name, exports: module.exports } }));
                
            } catch (error) {
                console.error(`Failed to load module ${name}:`, error);
                this.loadingModules.delete(name);
            }
        }

        get(name) {
            const module = this.modules.get(name);
            return module && module.loaded ? module.exports : null;
        }

        isLoaded(name) {
            const module = this.modules.get(name);
            return module && module.loaded;
        }

        whenReady(modules, callback) {
            const checkReady = () => {
                const allLoaded = modules.every(name => this.isLoaded(name));
                if (allLoaded) {
                    const exports = modules.map(name => this.get(name));
                    callback(...exports);
                } else {
                    setTimeout(checkReady, 50);
                }
            };
            checkReady();
        }
    }

    // Create global instance
    global.ModuleLoader = new ModuleLoader();
    
    // Helper function for defining modules
    global.defineModule = function(name, dependencies, factory) {
        if (typeof dependencies === 'function') {
            factory = dependencies;
            dependencies = [];
        }
        global.ModuleLoader.register(name, dependencies, factory);
    };

})(window);
