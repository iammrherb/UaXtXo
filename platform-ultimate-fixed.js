/**
 * Fixed Platform Ultimate for Portnox Total Cost Analyzer
 * Properly initializes with all required services
 */

// Platform initialization function
async function initializePlatform() {
    console.log('🚀 Initializing Portnox Total Cost Analyzer Platform...');
    
    try {
        // Ensure ModuleLoader is ready
        if (!window.ModuleLoader) {
            throw new Error('ModuleLoader not found');
        }
        
        // Initialize all modules
        const moduleCount = ModuleLoader.initializeAll();
        console.log(`✅ Initialized ${moduleCount} modules`);
        
        // Get required services
        const requiredServices = [
            'EventSystem',
            'ConfigManager',
            'VendorDatabase',
            'IndustryDatabase',
            'ComplianceDatabase'
        ];
        
        // Check for missing modules
        const missing = ModuleLoader.checkRequiredModules(requiredServices);
        if (missing.length > 0) {
            console.warn('⚠️ Missing required modules:', missing);
            
            // Try to create missing core modules
            if (missing.includes('EventSystem') && window.EventSystem) {
                const instance = new EventSystem();
                ModuleLoader.instances.set('EventSystem', instance);
                console.log('✅ EventSystem created manually');
            }
            
            if (missing.includes('ConfigManager') && window.ConfigManager) {
                const instance = new ConfigManager();
                ModuleLoader.instances.set('ConfigManager', instance);
                console.log('✅ ConfigManager created manually');
            }
        }
        
        // Get all services
        const services = await ModuleLoader.getServices(...requiredServices);
        
        // Validate services
        const validServices = {};
        let allValid = true;
        
        for (const [name, service] of Object.entries(services)) {
            if (service) {
                validServices[name] = service;
                console.log(`✅ Service loaded: ${name}`);
            } else {
                console.error(`❌ Service failed: ${name}`);
                allValid = false;
            }
        }
        
        if (!allValid) {
            console.warn('⚠️ Some services failed to load, platform may have limited functionality');
        }
        
        // Initialize UI components
        if (services.EventSystem) {
            services.EventSystem.emit('platform:ready', { services: validServices });
        }
        
        // Store services globally for debugging
        window.__platformServices = validServices;
        
        console.log('🎉 Platform initialization complete!');
        console.log('Available services:', Object.keys(validServices));
        
        // Return services for use
        return validServices;
        
    } catch (error) {
        console.error('❌ Platform initialization failed:', error);
        console.error(error.stack);
        
        // Provide diagnostics
        if (window.ModuleLoader) {
            console.log('Module diagnostics:', ModuleLoader.getDiagnostics());
        }
        
        throw error;
    }
}

// DOM Ready Handler
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        console.log('📄 DOM Ready - Starting platform initialization...');
        
        // Wait a bit for all scripts to load
        await new Promise(resolve => setTimeout(resolve, 100));
        
        try {
            await initializePlatform();
        } catch (error) {
            console.error('Failed to initialize platform:', error);
        }
    });
} else {
    // DOM already loaded
    console.log('📄 DOM already loaded - Starting platform initialization...');
    initializePlatform().catch(error => {
        console.error('Failed to initialize platform:', error);
    });
}

// Export initialization function
window.initializePlatform = initializePlatform;

// Provide manual initialization helpers
window.platformHelpers = {
    // Reinitialize platform
    async reinitialize() {
        console.log('🔄 Reinitializing platform...');
        ModuleLoader.reset();
        
        // Re-register all modules
        if (window.ModuleRegistrationHelper) {
            ModuleRegistrationHelper.registerAllModules();
        }
        
        return await initializePlatform();
    },
    
    // Get platform status
    getStatus() {
        return {
            moduleLoader: !!window.ModuleLoader,
            services: window.__platformServices || {},
            diagnostics: ModuleLoader ? ModuleLoader.getDiagnostics() : null
        };
    },
    
    // Debug helper
    debug() {
        console.group('🔍 Platform Debug Information');
        
        if (window.ModuleLoader) {
            const diag = ModuleLoader.getDiagnostics();
            console.log('Registered modules:', diag.registered);
            console.log('Loaded modules:', diag.loaded);
            console.log('Pending modules:', diag.pending);
            console.log('Load order:', diag.loadOrder);
        }
        
        if (window.__platformServices) {
            console.log('Platform services:', Object.keys(window.__platformServices));
        }
        
        if (window.ModuleRegistrationHelper) {
            console.log('Module status:', ModuleRegistrationHelper.checkModuleStatus());
        }
        
        console.groupEnd();
    }
};
