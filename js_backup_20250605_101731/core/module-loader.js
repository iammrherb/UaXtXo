/**
 * Module Loader System
 * Handles dynamic loading and dependency management
 */
(function() {
    class ModuleLoader {
        constructor() {
            this.modules = new Map();
            this.loadQueue = [];
            this.loadedModules = new Set();
            this.dependencies = new Map();
            this.loadPromises = new Map();
            this.debug = true; // Enable debugging
        }

        log(message, ...args) {
            if (this.debug) {
                console.log(`[ModuleLoader] ${message}`, ...args);
            }
        }

        // Register a module with its dependencies
        register(name, dependencies = [], factory) {
            this.log(`Registering module: ${name}`);
            
            if (typeof dependencies === 'function') {
                factory = dependencies;
                dependencies = [];
            }
            
            this.modules.set(name, { factory, dependencies });
            this.dependencies.set(name, dependencies);
            this.log(`✓ Module registered: ${name} with dependencies:`, dependencies);
        }

        // Load a module and its dependencies
        async load(name) {
            this.log(`Loading module: ${name}`);
            
            // Check if already loaded
            if (this.loadedModules.has(name)) {
                this.log(`Module already loaded: ${name}`);
                return this.modules.get(name).instance;
            }

            // Check if currently loading
            if (this.loadPromises.has(name)) {
                this.log(`Module currently loading: ${name}`);
                return this.loadPromises.get(name);
            }

            // Create loading promise
            const loadPromise = this._loadModule(name);
            this.loadPromises.set(name, loadPromise);
            
            try {
                const result = await loadPromise;
                this.loadPromises.delete(name);
                return result;
            } catch (error) {
                this.loadPromises.delete(name);
                throw error;
            }
        }

        async _loadModule(name) {
            const module = this.modules.get(name);
            
            if (!module) {
                this.log(`❌ Module not found: ${name}`);
                this.log('Available modules:', Array.from(this.modules.keys()));
                throw new Error(`Module '${name}' not found. Available: ${Array.from(this.modules.keys()).join(', ')}`);
            }

            this.log(`Loading dependencies for ${name}:`, module.dependencies);
            
            // Load dependencies first
            const deps = await Promise.all(
                module.dependencies.map(dep => this.load(dep))
            );

            this.log(`Creating instance of ${name}`);
            
            // Create module instance
            const instance = await module.factory(...deps);
            module.instance = instance;
            this.loadedModules.add(name);
            
            this.log(`✓ Loaded module: ${name}`);
            return instance;
        }

        // Load multiple modules
        async loadAll(moduleNames) {
            this.log(`Loading multiple modules:`, moduleNames);
            return Promise.all(moduleNames.map(name => this.load(name)));
        }

        // Get loaded module
        get(name) {
            const module = this.modules.get(name);
            return module ? module.instance : null;
        }

        // Check if module is loaded
        isLoaded(name) {
            return this.loadedModules.has(name);
        }

        // List all registered modules
        listModules() {
            return Array.from(this.modules.keys());
        }
    }

    // Create global instance and ensure it's available
    window.ModuleLoader = new ModuleLoader();
    window.ModuleLoader.log('ModuleLoader initialized and ready');
    
    // Expose globally for debugging
    window.ML = window.ModuleLoader;
})();
