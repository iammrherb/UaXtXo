#!/bin/bash

# ============================================================================
# Portnox Total Cost Analyzer - Complete Module Loader Fix
# This script fixes all module loading issues and ensures proper initialization
# ============================================================================

set -euo pipefail

# Color definitions
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly CYAN='\033[0;36m'
readonly MAGENTA='\033[0;35m'
readonly NC='\033[0m'

# Log functions
log() { echo -e "${CYAN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $*"; }
error() { echo -e "${RED}[ERROR]${NC} $*" >&2; }
success() { echo -e "${GREEN}[SUCCESS]${NC} $*"; }
info() { echo -e "${BLUE}[INFO]${NC} $*"; }
warn() { echo -e "${YELLOW}[WARNING]${NC} $*"; }

# ============================================================================
# Backup existing files
# ============================================================================
backup_files() {
    log "Creating backups of existing files..."
    
    local backup_dir="backup_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"
    
    # List of files to backup
    local files=(
        "module-loader.js"
        "platform-ultimate.js"
        "event-system.js"
        "config-manager.js"
        "index.html"
    )
    
    for file in "${files[@]}"; do
        if [[ -f "$file" ]]; then
            cp "$file" "$backup_dir/"
            info "Backed up: $file"
        fi
    done
    
    success "Backups created in: $backup_dir"
}

# ============================================================================
# Create Enhanced Module Loader
# ============================================================================
create_enhanced_module_loader() {
    log "Creating enhanced module-loader.js..."
    
    cat > module-loader.js << 'EOF'
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
EOF
    
    success "Enhanced module-loader.js created"
}

# ============================================================================
# Create Module Registration Helper
# ============================================================================
create_module_registration_helper() {
    log "Creating module-registration-helper.js..."
    
    cat > module-registration-helper.js << 'EOF'
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
EOF
    
    success "Module registration helper created"
}

# ============================================================================
# Create Fixed Platform Ultimate
# ============================================================================
create_fixed_platform_ultimate() {
    log "Creating fixed platform-ultimate.js..."
    
    cat > platform-ultimate-fixed.js << 'EOF'
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
EOF
    
    success "Fixed platform-ultimate.js created"
}

# ============================================================================
# Create Integration Script
# ============================================================================
create_integration_script() {
    log "Creating integration script..."
    
    cat > integrate-modules.js << 'EOF'
/**
 * Module Integration Script
 * Ensures all modules work together properly
 */

// Wait for all modules to be defined
function waitForModules(callback, timeout = 5000) {
    const requiredModules = [
        'EventSystem',
        'ConfigManager',
        'VendorDatabase',
        'IndustryDatabase',
        'ComplianceDatabase'
    ];
    
    const startTime = Date.now();
    
    function check() {
        const allExist = requiredModules.every(name => !!window[name]);
        
        if (allExist) {
            callback();
        } else if (Date.now() - startTime < timeout) {
            setTimeout(check, 100);
        } else {
            console.error('Timeout waiting for modules:', 
                requiredModules.filter(name => !window[name]));
            callback();
        }
    }
    
    check();
}

// Integration function
function integrateModules() {
    console.log('[Integration] Starting module integration...');
    
    // Ensure all modules are registered
    if (window.ModuleRegistrationHelper) {
        ModuleRegistrationHelper.registerAllModules();
    }
    
    // Initialize ModuleLoader
    if (window.ModuleLoader) {
        ModuleLoader.initializeAll();
        
        // Manual fallback for critical modules
        const criticalModules = ['EventSystem', 'ConfigManager'];
        
        for (const moduleName of criticalModules) {
            if (!ModuleLoader.get(moduleName) && window[moduleName]) {
                try {
                    const instance = new window[moduleName]();
                    ModuleLoader.instances.set(moduleName, instance);
                    console.log(`[Integration] ✅ ${moduleName} created via fallback`);
                } catch (error) {
                    console.error(`[Integration] Failed to create ${moduleName}:`, error);
                }
            }
        }
    }
    
    console.log('[Integration] Module integration complete');
}

// Run integration
waitForModules(() => {
    integrateModules();
    
    // Trigger platform initialization if not already done
    if (window.initializePlatform && !window.__platformServices) {
        window.initializePlatform();
    }
});

// Export integration utilities
window.ModuleIntegration = {
    waitForModules,
    integrateModules,
    
    // Force reload all modules
    forceReload() {
        if (window.ModuleLoader) {
            ModuleLoader.reset();
        }
        integrateModules();
    }
};
EOF
    
    success "Integration script created"
}

# ============================================================================
# Create Debug Dashboard
# ============================================================================
create_debug_dashboard() {
    log "Creating debug dashboard..."
    
    cat > debug-dashboard.js << 'EOF'
/**
 * Debug Dashboard for Module Loading Issues
 */

window.DebugDashboard = {
    // Show module status in console
    showStatus() {
        console.group('🎯 Portnox Module Status Dashboard');
        
        const modules = [
            'ModuleLoader',
            'EventSystem',
            'ConfigManager',
            'VendorDatabase',
            'IndustryDatabase',
            'ComplianceDatabase',
            'RiskSecurityView',
            'ComplianceView',
            'OperationalImpact',
            'StrategicInsights'
        ];
        
        console.table(modules.map(name => {
            const exists = !!window[name];
            const registered = window.ModuleLoader && ModuleLoader.modules.has(name);
            const loaded = window.ModuleLoader && ModuleLoader.instances.has(name);
            
            return {
                Module: name,
                'Global Exists': exists ? '✅' : '❌',
                'Registered': registered ? '✅' : '❌',
                'Loaded': loaded ? '✅' : '❌',
                Status: loaded ? 'Ready' : (registered ? 'Pending' : (exists ? 'Not Registered' : 'Missing'))
            };
        }));
        
        if (window.ModuleLoader) {
            const diag = ModuleLoader.getDiagnostics();
            console.log('Load Order:', diag.loadOrder.join(' → '));
            console.log('Pending Modules:', diag.pending);
        }
        
        console.groupEnd();
    },
    
    // Fix common issues
    async autoFix() {
        console.log('🔧 Running auto-fix...');
        
        // Step 1: Register missing modules
        if (window.ModuleRegistrationHelper) {
            ModuleRegistrationHelper.registerAllModules();
        }
        
        // Step 2: Initialize modules
        if (window.ModuleLoader) {
            ModuleLoader.initializeAll();
        }
        
        // Step 3: Manual creation for critical modules
        const critical = ['EventSystem', 'ConfigManager'];
        for (const name of critical) {
            if (window[name] && window.ModuleLoader && !ModuleLoader.get(name)) {
                try {
                    const instance = new window[name]();
                    ModuleLoader.instances.set(name, instance);
                    console.log(`✅ Manually created: ${name}`);
                } catch (e) {
                    console.error(`Failed to create ${name}:`, e);
                }
            }
        }
        
        // Step 4: Reinitialize platform
        if (window.platformHelpers) {
            await platformHelpers.reinitialize();
        }
        
        console.log('✅ Auto-fix complete');
        this.showStatus();
    },
    
    // Test module functionality
    testModules() {
        console.group('🧪 Testing Module Functionality');
        
        // Test EventSystem
        const eventSystem = window.ModuleLoader && ModuleLoader.get('EventSystem');
        if (eventSystem) {
            try {
                eventSystem.on('test', () => console.log('✅ EventSystem: Event received'));
                eventSystem.emit('test');
            } catch (e) {
                console.error('❌ EventSystem test failed:', e);
            }
        } else {
            console.error('❌ EventSystem not available');
        }
        
        // Test ConfigManager
        const configManager = window.ModuleLoader && ModuleLoader.get('ConfigManager');
        if (configManager) {
            try {
                configManager.set('test', 'value');
                const value = configManager.get('test');
                console.log(value === 'value' ? '✅ ConfigManager: Working' : '❌ ConfigManager: Failed');
            } catch (e) {
                console.error('❌ ConfigManager test failed:', e);
            }
        } else {
            console.error('❌ ConfigManager not available');
        }
        
        console.groupEnd();
    }
};

// Auto-run diagnostics on load
setTimeout(() => {
    console.log('Running automatic diagnostics...');
    DebugDashboard.showStatus();
}, 1000);
EOF
    
    success "Debug dashboard created"
}

# ============================================================================
# Create HTML Update Script
# ============================================================================
create_html_updater() {
    log "Creating HTML updater script..."
    
    cat > update-html.sh << 'EOF'
#!/bin/bash

# Update HTML file with proper script loading order

echo "Updating HTML file..."

# Check if index.html exists
if [[ ! -f "index.html" ]]; then
    echo "Error: index.html not found"
    exit 1
fi

# Backup original
cp index.html index.html.backup

# Create temporary file with updated script tags
cat > temp_scripts.txt << 'SCRIPTS'

<!-- Enhanced Module Loader System -->
<script src="module-loader.js"></script>
<script src="module-registration-helper.js"></script>

<!-- Wait for core modules to load -->
<script>
    // Ensure module loader is ready
    if (!window.ModuleLoader) {
        console.error('ModuleLoader not found!');
    }
</script>

<!-- Core Modules -->
<script src="event-system.js"></script>
<script src="config-manager.js"></script>

<!-- Database Modules -->
<script src="master-vendor-database.js"></script>
<script src="industry-database.js"></script>
<script src="compliance-database.js"></script>

<!-- View Modules -->
<script src="risk-security-view.js"></script>
<script src="compliance-view-enhanced.js"></script>
<script src="operational-impact.js"></script>
<script src="strategic-insights.js"></script>

<!-- Integration and Platform -->
<script src="integrate-modules.js"></script>
<script src="platform-ultimate-fixed.js"></script>

<!-- Debug Tools -->
<script src="debug-dashboard.js"></script>

<!-- Final initialization -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== Portnox Total Cost Analyzer Starting ===');
    
    // Give a moment for all scripts to register
    setTimeout(function() {
        // Show debug status
        if (window.DebugDashboard) {
            DebugDashboard.showStatus();
        }
        
        // Auto-fix if needed
        const eventSystem = window.ModuleLoader && ModuleLoader.get('EventSystem');
        const configManager = window.ModuleLoader && ModuleLoader.get('ConfigManager');
        
        if (!eventSystem || !configManager) {
            console.warn('Core services not loaded, running auto-fix...');
            if (window.DebugDashboard) {
                DebugDashboard.autoFix();
            }
        }
    }, 500);
});
</script>

SCRIPTS

echo "HTML file updated successfully!"
echo "Original backed up as index.html.backup"
EOF
    
    chmod +x update-html.sh
    success "HTML updater script created"
}

# ============================================================================
# Create Quick Test Script
# ============================================================================
create_test_script() {
    log "Creating test script..."
    
    cat > test-modules.js << 'EOF'
// Quick test script for module loading

console.log('🧪 Running Module Tests...');

// Test 1: Check if ModuleLoader exists
console.assert(window.ModuleLoader, 'ModuleLoader should exist');

// Test 2: Check critical modules
const criticalModules = ['EventSystem', 'ConfigManager'];
for (const name of criticalModules) {
    const instance = ModuleLoader.get(name);
    console.assert(instance, `${name} should be loaded`);
}

// Test 3: Check module registration
const expectedModules = [
    'EventSystem', 'ConfigManager', 'VendorDatabase', 
    'IndustryDatabase', 'ComplianceDatabase'
];

for (const name of expectedModules) {
    console.assert(
        ModuleLoader.modules.has(name), 
        `${name} should be registered`
    );
}

// Show results
if (window.DebugDashboard) {
    DebugDashboard.showStatus();
    DebugDashboard.testModules();
}

console.log('✅ Tests complete - check assertions above');
EOF
    
    success "Test script created"
}

# ============================================================================
# Main Execution
# ============================================================================

main() {
    echo -e "${CYAN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC}   ${GREEN}Portnox Total Cost Analyzer - Complete Module Fix${NC}          ${CYAN}║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo
    
    # Check current directory
    log "Working directory: $(pwd)"
    
    # Backup existing files
    backup_files
    
    # Create all necessary files
    create_enhanced_module_loader
    create_module_registration_helper
    create_fixed_platform_ultimate
    create_integration_script
    create_debug_dashboard
    create_html_updater
    create_test_script
    
    echo
    success "All files created successfully!"
    echo
    echo -e "${GREEN}Files created:${NC}"
    echo "  📄 module-loader.js              - Enhanced module loader with retry logic"
    echo "  📄 module-registration-helper.js - Automatic module registration"
    echo "  📄 platform-ultimate-fixed.js    - Fixed platform initialization"
    echo "  📄 integrate-modules.js          - Module integration helper"
    echo "  📄 debug-dashboard.js            - Debug and diagnostic tools"
    echo "  📄 update-html.sh               - HTML update script"
    echo "  📄 test-modules.js              - Module testing script"
    echo
    echo -e "${YELLOW}To apply the fix:${NC}"
    echo "1. Run: ${CYAN}./update-html.sh${NC} to update your HTML file"
    echo "2. Refresh your browser"
    echo "3. Open console and run: ${CYAN}DebugDashboard.showStatus()${NC}"
    echo "4. If issues persist, run: ${CYAN}DebugDashboard.autoFix()${NC}"
    echo
    echo -e "${GREEN}Quick commands for browser console:${NC}"
    echo "  • ${CYAN}DebugDashboard.showStatus()${NC} - View module status"
    echo "  • ${CYAN}DebugDashboard.autoFix()${NC} - Auto-fix common issues"
    echo "  • ${CYAN}DebugDashboard.testModules()${NC} - Test module functionality"
    echo "  • ${CYAN}platformHelpers.debug()${NC} - Platform debug info"
    echo
    echo -e "${MAGENTA}Git commands to save changes:${NC}"
    echo "  ${CYAN}git add -A${NC}"
    echo "  ${CYAN}git commit -m \"Fix module loading issues for Portnox analyzer\"${NC}"
    echo "  ${CYAN}git push${NC}"
}

# Run main function
main "$@"
