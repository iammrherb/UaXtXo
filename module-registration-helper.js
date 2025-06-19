/**
 * Module Registration Helper
 * Ensures all modules are properly registered with the ModuleLoader
 */

console.log('[Registration Helper] Starting module registration...');

// Core module definitions
const moduleDefinitions = {
    EventSystem: {
        dependencies: [],
        critical: true
    },
    ConfigManager: {
        dependencies: [],
        critical: true
    },
    VendorDatabase: {
        dependencies: ['ConfigManager'],
        critical: true
    },
    IndustryDatabase: {
        dependencies: ['ConfigManager'],
        critical: true
    },
    ComplianceDatabase: {
        dependencies: ['ConfigManager'],
        critical: true
    },
    RiskSecurityView: {
        dependencies: ['EventSystem', 'VendorDatabase'],
        critical: false
    },
    ComplianceView: {
        dependencies: ['EventSystem', 'ComplianceDatabase'],
        critical: false
    },
    OperationalImpact: {
        dependencies: ['EventSystem', 'VendorDatabase'],
        critical: false
    },
    StrategicInsights: {
        dependencies: ['EventSystem', 'VendorDatabase', 'IndustryDatabase'],
        critical: false
    }
};

// Function to register modules
function registerAllModules() {
    let registered = 0;
    let failed = [];
    
    for (const [name, config] of Object.entries(moduleDefinitions)) {
        // Check if module exists in global scope
        if (window[name]) {
            if (!ModuleLoader.get(name)) {
                const success = ModuleLoader.register(name, window[name], config.dependencies);
                if (success) {
                    registered++;
                    console.log(`✅ Registered: ${name}`);
                } else {
                    failed.push(name);
                    console.error(`❌ Failed to register: ${name}`);
                }
            } else {
                console.log(`✓ Already registered: ${name}`);
            }
        } else if (config.critical) {
            console.warn(`⚠️ Critical module not found: ${name}`);
            failed.push(name);
        }
    }
    
    console.log(`[Registration Helper] Registered ${registered} modules`);
    if (failed.length > 0) {
        console.warn('[Registration Helper] Failed modules:', failed);
    }
    
    return { registered, failed };
}

// Register modules immediately
registerAllModules();

// Also register after a delay to catch late-loading modules
setTimeout(() => {
    console.log('[Registration Helper] Checking for late-loading modules...');
    registerAllModules();
    
    // Force initialization
    ModuleLoader.initializeAll();
}, 500);

// Export helper functions
window.ModuleRegistrationHelper = {
    registerAllModules,
    moduleDefinitions,
    
    // Check module status
    checkModuleStatus() {
        const status = {};
        for (const name of Object.keys(moduleDefinitions)) {
            status[name] = {
                exists: !!window[name],
                registered: ModuleLoader.modules.has(name),
                loaded: ModuleLoader.instances.has(name)
            };
        }
        return status;
    },
    
    // Force register a specific module
    forceRegister(name, dependencies = []) {
        if (window[name]) {
            ModuleLoader.register(name, window[name], dependencies);
            ModuleLoader.initializeModule(name, true);
            return true;
        }
        return false;
    }
};
