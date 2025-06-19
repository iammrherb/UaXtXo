// Module Loader System
window.ModuleLoader = {
    modules: {},
    loaded: {},
    
    register(name, module) {
        console.log(`📦 Registering module: ${name}`);
        this.modules[name] = module;
        this.loaded[name] = true;
        
        // Dispatch event for module loaded
        window.dispatchEvent(new CustomEvent('moduleLoaded', { 
            detail: { name, module } 
        }));
    },
    
    get(name) {
        if (!this.loaded[name]) {
            console.warn(`⚠️ Module ${name} not loaded yet`);
            return null;
        }
        return this.modules[name];
    },
    
    isLoaded(name) {
        return !!this.loaded[name];
    },
    
    waitForModules(moduleNames, callback) {
        const checkModules = () => {
            const allLoaded = moduleNames.every(name => this.isLoaded(name));
            if (allLoaded) {
                callback();
            } else {
                setTimeout(checkModules, 100);
            }
        };
        checkModules();
    },
    
    getAllModules() {
        return Object.keys(this.modules);
    }
};

// Create global instance
window.moduleLoader = window.ModuleLoader;
console.log('✅ ModuleLoader system created');
