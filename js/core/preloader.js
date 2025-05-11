/**
 * Preloader to ensure proper initialization order
 */
window.NACAnalyzer = window.NACAnalyzer || {};
window.NACAnalyzer.ready = false;
window.NACAnalyzer.modules = {};

// Module registry
window.NACAnalyzer.register = function(moduleName, module) {
    this.modules[moduleName] = module;
    console.log(`Module registered: ${moduleName}`);
};

// Wait for all modules
window.NACAnalyzer.onReady = function(callback) {
    if (this.ready) {
        callback();
    } else {
        document.addEventListener('nac-analyzer-ready', callback);
    }
};

// Check if all required modules are loaded
window.NACAnalyzer.checkModules = function() {
    const requiredModules = ['TCOWizard', 'DashboardIntegration', 'LogoLoader'];
    const loadedModules = Object.keys(this.modules);
    
    const allLoaded = requiredModules.every(module => loadedModules.includes(module));
    
    if (allLoaded) {
        this.ready = true;
        document.dispatchEvent(new CustomEvent('nac-analyzer-ready'));
        console.log('All modules loaded successfully');
    }
};
