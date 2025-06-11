/**
 * Module Loader Fix for Portnox Total Cost Analyzer
 * This fix ensures modules are properly instantiated using their factory functions
 */

(function() {
    'use strict';
    
    console.log('[ModuleLoaderFix] Initializing permanent fixes...');
    
    function applyFixes() {
        if (!window.ModuleLoader) {
            console.error('[ModuleLoaderFix] ModuleLoader not found!');
            return false;
        }
        
        // Ensure instances Map exists
        if (!window.ModuleLoader.instances) {
            window.ModuleLoader.instances = new Map();
        }
        
        // Fix the get method to handle factories
        window.ModuleLoader.get = function(name) {
            if (this.instances && this.instances.has(name)) {
                return this.instances.get(name);
            }
            
            if (this.modules && this.modules.has(name)) {
                const moduleConfig = this.modules.get(name);
                let instance = null;
                
                // Handle factory pattern (your modules use this)
                if (moduleConfig && moduleConfig.factory && typeof moduleConfig.factory === 'function') {
                    try {
                        const deps = {};
                        if (moduleConfig.dependencies && Array.isArray(moduleConfig.dependencies)) {
                            moduleConfig.dependencies.forEach(depName => {
                                deps[depName] = this.get(depName);
                            });
                        }
                        instance = moduleConfig.factory(deps);
                    } catch (e) {
                        console.error(`[ModuleLoaderFix] Factory error for ${name}:`, e);
                    }
                }
                
                if (instance) {
                    this.instances.set(name, instance);
                    if (this.loadedModules && this.loadedModules.add) {
                        this.loadedModules.add(name);
                    }
                    return instance;
                }
            }
            
            return null;
        };
        
        // Initialize core modules immediately
        ['EventSystem', 'ConfigManager'].forEach(name => {
            const instance = window.ModuleLoader.get(name);
            if (instance) {
                console.log(`[ModuleLoaderFix] ✅ ${name} ready`);
            }
        });
        
        return true;
    }
    
    // Apply fixes when ModuleLoader is ready
    if (window.ModuleLoader) {
        applyFixes();
    } else {
        // Wait for ModuleLoader
        const observer = new MutationObserver(() => {
            if (window.ModuleLoader) {
                observer.disconnect();
                applyFixes();
            }
        });
        observer.observe(document, { childList: true, subtree: true });
        
        // Fallback timeout
        setTimeout(() => {
            observer.disconnect();
            if (window.ModuleLoader) {
                applyFixes();
            }
        }, 5000);
    }
})();
