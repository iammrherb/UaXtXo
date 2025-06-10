#!/bin/bash

# ============================================================================
# Portnox Ultimate Platform - Update Current Directory
# Version: 6.0.0
# Purpose: Updates current directory with complete platform files
# ============================================================================

set -euo pipefail

# Color definitions
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly PURPLE='\033[0;35m'
readonly CYAN='\033[0;36m'
readonly WHITE='\033[1;37m'
readonly NC='\033[0m'

# Script info
readonly SCRIPT_VERSION="6.0.0"
readonly TIMESTAMP=$(date +'%Y%m%d_%H%M%S')

# Logging functions
log() {
    echo -e "${CYAN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $*"
}

error() {
    echo -e "${RED}[ERROR]${NC} $*" >&2
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $*"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $*"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $*"
}

# Backup existing files
backup_existing() {
    local backup_dir="backup_${TIMESTAMP}"
    local files_to_backup=(
        "index.html"
        "js/module-loader.js"
        "js/event-system.js" 
        "js/config-manager.js"
        "js/vendor-database.js"
        "js/industry-database.js"
        "js/compliance-database.js"
        "js/platform.js"
        "css/platform.css"
    )
    
    local need_backup=false
    for file in "${files_to_backup[@]}"; do
        if [[ -f "$file" ]]; then
            need_backup=true
            break
        fi
    done
    
    if [[ "$need_backup" == true ]]; then
        log "Creating backup of existing files..."
        mkdir -p "$backup_dir"
        
        for file in "${files_to_backup[@]}"; do
            if [[ -f "$file" ]]; then
                local dir=$(dirname "$file")
                mkdir -p "$backup_dir/$dir"
                cp "$file" "$backup_dir/$file"
                info "Backed up: $file"
            fi
        done
        
        success "Backup created in: $backup_dir"
    fi
}

# Create directory structure
create_directories() {
    log "Creating directory structure..."
    mkdir -p js css img data reports
    success "Directories created"
}

# ============================================================================
# Create Module Loader
# ============================================================================
create_module_loader() {
    log "Creating Module Loader..."
    cat > js/module-loader.js << 'EOF'
// Enhanced Module Loader System
class ModuleLoader {
    constructor() {
        this.modules = new Map();
        this.instances = new Map();
        this.loadOrder = [];
        this.debug = true;
        this.initialized = false;
        
        console.log('[ModuleLoader] Enhanced ModuleLoader initialized and ready');
    }
    
    register(name, moduleDefinition, dependencies = []) {
        if (this.debug) {
            console.log(`[ModuleLoader] Registering module: ${name}`);
        }
        
        this.modules.set(name, {
            definition: moduleDefinition,
            dependencies,
            loaded: false
        });
        
        if (this.debug) {
            console.log(`[ModuleLoader] ✓ Module registered: ${name} with dependencies:`, dependencies);
        }
        
        // Try to initialize immediately if possible
        this.tryInitialize(name);
    }
    
    tryInitialize(name) {
        const module = this.modules.get(name);
        if (!module || module.loaded) return;
        
        // Check if all dependencies are loaded
        const depsLoaded = module.dependencies.every(dep => 
            this.modules.has(dep) && this.modules.get(dep).loaded
        );
        
        if (depsLoaded) {
            this.initializeModule(name);
            
            // Check if any other modules can now be initialized
            this.modules.forEach((mod, modName) => {
                if (!mod.loaded) {
                    this.tryInitialize(modName);
                }
            });
        }
    }
    
    initializeModule(name) {
        const module = this.modules.get(name);
        if (!module || module.loaded) return;
        
        try {
            // Get dependency instances
            const deps = {};
            module.dependencies.forEach(dep => {
                deps[dep] = this.instances.get(dep);
            });
            
            // Create instance
            let instance;
            if (typeof module.definition === 'function') {
                // Check if it's a class (has prototype) or regular function
                if (module.definition.prototype && module.definition.prototype.constructor === module.definition) {
                    instance = new module.definition(deps);
                } else {
                    instance = module.definition(deps);
                }
            } else {
                instance = module.definition;
            }
            
            this.instances.set(name, instance);
            module.loaded = true;
            this.loadOrder.push(name);
            
            if (this.debug) {
                console.log(`[ModuleLoader] ✓ Module initialized: ${name}`);
            }
            
            // Emit module loaded event
            if (window.eventBus) {
                window.eventBus.emit('module:loaded', { name, instance });
            }
        } catch (error) {
            console.error(`[ModuleLoader] ❌ Failed to initialize module ${name}:`, error);
        }
    }
    
    get(name) {
        if (!this.instances.has(name)) {
            this.tryInitialize(name);
        }
        return this.instances.get(name);
    }
    
    initializeAll() {
        // Keep trying to initialize modules until no more can be initialized
        let initialized;
        do {
            initialized = false;
            this.modules.forEach((module, name) => {
                if (!module.loaded) {
                    const before = module.loaded;
                    this.tryInitialize(name);
                    if (!before && module.loaded) {
                        initialized = true;
                    }
                }
            });
        } while (initialized);
        
        this.initialized = true;
        
        if (this.debug) {
            console.log('[ModuleLoader] All possible modules initialized:', this.loadOrder);
            
            // Report any uninitialized modules
            const uninitialized = [];
            this.modules.forEach((module, name) => {
                if (!module.loaded) {
                    uninitialized.push(name);
                }
            });
            
            if (uninitialized.length > 0) {
                console.warn('[ModuleLoader] Failed to initialize modules:', uninitialized);
            }
        }
    }
    
    isReady() {
        return this.initialized;
    }
    
    getLoadOrder() {
        return [...this.loadOrder];
    }
    
    getAllInstances() {
        return Object.fromEntries(this.instances);
    }
}

// Create global instance
window.ModuleLoader = new ModuleLoader();

// Also create a simple event bus for early events
window.eventBus = {
    events: new Map(),
    on(event, handler) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(handler);
    },
    emit(event, data) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(handler => handler(data));
        }
    }
};
EOF
    success "Module Loader created"
}

# ============================================================================
# Create Event System
# ============================================================================
create_event_system() {
    log "Creating Event System..."
    cat > js/event-system.js << 'EOF'
// Enhanced Event System Module
class EventSystem {
    constructor() {
        this.events = new Map();
        this.debug = true;
        this.history = [];
        console.log('[EventSystem] Enhanced Event System initialized');
    }
    
    on(event, handler, context = null) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push({ handler, context });
        if (this.debug) {
            console.log(`[EventSystem] Handler registered for: ${event}`);
        }
        return () => this.off(event, handler); // Return unsubscribe function
    }
    
    off(event, handler) {
        if (this.events.has(event)) {
            const handlers = this.events.get(event);
            const index = handlers.findIndex(h => h.handler === handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }
    
    emit(event, data = {}) {
        if (this.debug) {
            console.log(`[EventSystem] Emitting event: ${event}`, data);
        }
        
        // Add to history
        this.history.push({ event, data, timestamp: Date.now() });
        if (this.history.length > 100) {
            this.history.shift(); // Keep only last 100 events
        }
        
        if (this.events.has(event)) {
            this.events.get(event).forEach(({ handler, context }) => {
                try {
                    if (context) {
                        handler.call(context, data);
                    } else {
                        handler(data);
                    }
                } catch (error) {
                    console.error(`[EventSystem] Error in handler for ${event}:`, error);
                }
            });
        }
        
        // Also emit a wildcard event
        this.emit('*', { event, data });
    }
    
    once(event, handler, context = null) {
        const wrapper = (data) => {
            this.off(event, wrapper);
            if (context) {
                handler.call(context, data);
            } else {
                handler(data);
            }
        };
        this.on(event, wrapper);
    }
    
    getHistory(event = null) {
        if (event) {
            return this.history.filter(h => h.event === event);
        }
        return [...this.history];
    }
}

// Register with ModuleLoader
ModuleLoader.register('EventSystem', EventSystem);

// Replace global eventBus with the real EventSystem when loaded
ModuleLoader.get('EventSystem');
const eventSystem = ModuleLoader.get('EventSystem');
if (eventSystem) {
    window.eventBus = eventSystem;
}
EOF
    success "Event System created"
}

# ============================================================================
# Create Config Manager
# ============================================================================
create_config_manager() {
    log "Creating Config Manager..."
    cat > js/config-manager.js << 'EOF'
// Enhanced Configuration Manager
class ConfigManager {
    constructor() {
        this.config = {
            app: {
                name: 'Portnox Ultimate TCO & NAC Platform',
                version: '6.0.0',
                debug: true
            },
            api: {
                baseUrl: window.location.origin,
                timeout: 30000
            },
            features: {
                animations: true,
                darkMode: true,
                autoSave: true,
                autoSaveInterval: 30000
            },
            vendors: {
                portnox: {
                    name: 'Portnox',
                    type: 'Cloud-Native',
                    costPerDevice: 36,
                    deploymentDays: 14,
                    fteRequired: 0.25
                }
            },
            compliance: {
                frameworks: ['HIPAA', 'PCI-DSS', 'SOC2', 'ISO27001', 'NIST', 'GDPR', 'CCPA', 'FERPA', 'FedRAMP', 'CMMC']
            },
            industries: [
                'Healthcare', 'Financial Services', 'Education', 'Government',
                'Manufacturing', 'Retail', 'Technology', 'Energy & Utilities',
                'Hospitality', 'Legal Services', 'Non-Profit', 'Pharmaceutical'
            ]
        };
        
        // Load saved config
        this.loadFromStorage();
        
        console.log('[ConfigManager] Initialized with configuration');
    }
    
    get(path, defaultValue = undefined) {
        const keys = path.split('.');
        let value = this.config;
        
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                return defaultValue;
            }
        }
        
        return value;
    }
    
    set(path, value) {
        const keys = path.split('.');
        let obj = this.config;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in obj) || typeof obj[key] !== 'object') {
                obj[key] = {};
            }
            obj = obj[key];
        }
        
        const lastKey = keys[keys.length - 1];
        obj[lastKey] = value;
        
        // Save to storage
        this.saveToStorage();
        
        // Emit change event
        if (window.eventBus) {
            window.eventBus.emit('config:changed', { path, value });
        }
    }
    
    getAll() {
        return JSON.parse(JSON.stringify(this.config));
    }
    
    merge(newConfig) {
        this.config = this.deepMerge(this.config, newConfig);
        this.saveToStorage();
    }
    
    deepMerge(target, source) {
        const output = Object.assign({}, target);
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    } else {
                        output[key] = this.deepMerge(target[key], source[key]);
                    }
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    }
    
    isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    }
    
    loadFromStorage() {
        try {
            const saved = localStorage.getItem('portnoxConfig');
            if (saved) {
                const savedConfig = JSON.parse(saved);
                this.merge(savedConfig);
            }
        } catch (error) {
            console.error('[ConfigManager] Error loading config from storage:', error);
        }
    }
    
    saveToStorage() {
        try {
            localStorage.setItem('portnoxConfig', JSON.stringify(this.config));
        } catch (error) {
            console.error('[ConfigManager] Error saving config to storage:', error);
        }
    }
    
    reset() {
        localStorage.removeItem('portnoxConfig');
        location.reload();
    }
}

// Register with ModuleLoader
ModuleLoader.register('ConfigManager', ConfigManager);
EOF
    success "Config Manager created"
}

# ============================================================================
# Create Vendor Database
# ============================================================================
create_vendor_database() {
    log "Creating Vendor Database..."
    cat > js/vendor-database.js << 'EOF'
// Comprehensive Vendor Database
class VendorDatabase {
    constructor() {
        this.vendors = {
            // Cloud-Native Solutions
            portnox: {
                id: 'portnox',
                name: 'Portnox',
                type: 'Cloud-Native NAC',
                category: 'cloud',
                logo: '✨',
                color: '#1B67B2',
                description: 'Cloud-native, agentless NAC with zero hardware requirements',
                licensing: {
                    model: 'Per-Device Annual',
                    costPerDevice: 36,
                    volumeDiscounts: {
                        1000: 0.10,
                        5000: 0.15,
                        10000: 0.20,
                        25000: 0.25
                    }
                },
                deployment: {
                    days: 14,
                    complexity: 'Low',
                    professionalServices: 5000,
                    training: 2500
                },
                operations: {
                    fteRequired: 0.25,
                    automationLevel: 0.85,
                    maintenanceHours: 10
                },
                features: {
                    cloudNative: true,
                    zeroTrust: true,
                    passwordless: true,
                    riskScoring: true,
                    apiIntegration: true,
                    multiVendor: true,
                    certificateManagement: true,
                    byod: true,
                    guestAccess: true,
                    deviceProfiling: true
                },
                compliance: {
                    certifications: ['SOC2', 'ISO27001', 'HIPAA'],
                    frameworks: ['NIST', 'PCI-DSS', 'GDPR', 'CCPA']
                },
                support: {
                    sla: '99.99%',
                    support24x7: true,
                    dedicatedTam: true
                }
            },
            
            // Legacy NAC Vendors
            cisco_ise: {
                id: 'cisco_ise',
                name: 'Cisco ISE',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🔷',
                color: '#1BA0D7',
                description: 'Traditional on-premise NAC requiring dedicated hardware',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 125,
                    maintenanceRate: 0.22,
                    hardwareCost: 75000
                },
                deployment: {
                    days: 90,
                    complexity: 'High',
                    professionalServices: 45000,
                    training: 15000
                },
                operations: {
                    fteRequired: 2.0,
                    automationLevel: 0.30,
                    maintenanceHours: 160
                },
                features: {
                    cloudNative: false,
                    zeroTrust: false,
                    passwordless: false,
                    riskScoring: false,
                    apiIntegration: true,
                    multiVendor: false,
                    certificateManagement: true,
                    byod: true,
                    guestAccess: true,
                    deviceProfiling: true
                }
            },
            
            aruba_clearpass: {
                id: 'aruba_clearpass',
                name: 'Aruba ClearPass',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🟠',
                color: '#F8991D',
                description: 'HPE Aruba on-premise NAC solution',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 95,
                    maintenanceRate: 0.20,
                    hardwareCost: 50000
                },
                deployment: {
                    days: 75,
                    complexity: 'High',
                    professionalServices: 35000,
                    training: 10000
                },
                operations: {
                    fteRequired: 1.75,
                    automationLevel: 0.35,
                    maintenanceHours: 140
                }
            },
            
            forescout: {
                id: 'forescout',
                name: 'Forescout',
                type: 'Hybrid',
                category: 'legacy',
                logo: '🟣',
                color: '#662D91',
                description: 'Agentless device visibility and control',
                licensing: {
                    model: 'Annual Subscription',
                    costPerDevice: 85,
                    hardwareCost: 40000
                },
                deployment: {
                    days: 60,
                    complexity: 'Medium',
                    professionalServices: 30000,
                    training: 8000
                },
                operations: {
                    fteRequired: 1.5,
                    automationLevel: 0.40,
                    maintenanceHours: 120
                }
            },
            
            extreme_nac: {
                id: 'extreme_nac',
                name: 'Extreme Networks NAC',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🟪',
                color: '#702F8A',
                description: 'Extreme Networks Control solution',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 78,
                    maintenanceRate: 0.20,
                    hardwareCost: 35000
                },
                deployment: {
                    days: 60,
                    complexity: 'Medium',
                    professionalServices: 28000,
                    training: 7000
                },
                operations: {
                    fteRequired: 1.5,
                    automationLevel: 0.35,
                    maintenanceHours: 120
                }
            },
            
            juniper_nac: {
                id: 'juniper_nac',
                name: 'Juniper Access Control',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🔵',
                color: '#00BCF2',
                description: 'Juniper Networks access control',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 92,
                    maintenanceRate: 0.22,
                    hardwareCost: 45000
                },
                deployment: {
                    days: 70,
                    complexity: 'High',
                    professionalServices: 32000,
                    training: 9000
                },
                operations: {
                    fteRequired: 1.75,
                    automationLevel: 0.35,
                    maintenanceHours: 140
                }
            },
            
            fortinet_nac: {
                id: 'fortinet_nac',
                name: 'Fortinet NAC',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🔴',
                color: '#E21D38',
                description: 'FortiNAC network access control',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 75,
                    maintenanceRate: 0.20,
                    hardwareCost: 30000
                },
                deployment: {
                    days: 55,
                    complexity: 'Medium',
                    professionalServices: 25000,
                    training: 6500
                },
                operations: {
                    fteRequired: 1.25,
                    automationLevel: 0.40,
                    maintenanceHours: 100
                }
            },
            
            pulse_secure: {
                id: 'pulse_secure',
                name: 'Pulse Secure',
                type: 'Legacy On-Premise',
                category: 'legacy',
                logo: '🟠',
                color: '#FF6900',
                description: 'Pulse Policy Secure NAC',
                licensing: {
                    model: 'Perpetual + Maintenance',
                    costPerDevice: 82,
                    maintenanceRate: 0.21,
                    hardwareCost: 35000
                },
                deployment: {
                    days: 60,
                    complexity: 'Medium',
                    professionalServices: 28000,
                    training: 7500
                },
                operations: {
                    fteRequired: 1.5,
                    automationLevel: 0.35,
                    maintenanceHours: 120
                }
            },
            
            arista_nac: {
                id: 'arista_nac',
                name: 'Arista CloudVision',
                type: 'Cloud-Managed',
                category: 'hybrid',
                logo: '💙',
                color: '#0088CE',
                description: 'Cloud-managed network access',
                licensing: {
                    model: 'Annual Subscription',
                    costPerDevice: 88,
                    hardwareCost: 42000
                },
                deployment: {
                    days: 65,
                    complexity: 'Medium',
                    professionalServices: 30000,
                    training: 8000
                },
                operations: {
                    fteRequired: 1.5,
                    automationLevel: 0.45,
                    maintenanceHours: 100
                }
            },
            
            packetfence: {
                id: 'packetfence',
                name: 'PacketFence',
                type: 'Open Source',
                category: 'opensource',
                logo: '🆓',
                color: '#FDB813',
                description: 'Open source NAC solution',
                licensing: {
                    model: 'Open Source + Support',
                    costPerDevice: 0,
                    supportCost: 25000,
                    hardwareCost: 25000
                },
                deployment: {
                    days: 120,
                    complexity: 'Very High',
                    professionalServices: 50000,
                    training: 12000
                },
                operations: {
                    fteRequired: 2.5,
                    automationLevel: 0.25,
                    maintenanceHours: 200
                }
            },
            
            // Cloud Competitors
            foxpass: {
                id: 'foxpass',
                name: 'Foxpass',
                type: 'Cloud RADIUS',
                category: 'cloud',
                logo: '🦊',
                color: '#FF6B35',
                description: 'Cloud-hosted RADIUS service',
                licensing: {
                    model: 'Per-User Monthly',
                    costPerDevice: 45,
                    volumeDiscounts: {
                        1000: 0.05,
                        5000: 0.10
                    }
                },
                deployment: {
                    days: 21,
                    complexity: 'Low',
                    professionalServices: 8000,
                    training: 3000
                },
                operations: {
                    fteRequired: 0.5,
                    automationLevel: 0.60,
                    maintenanceHours: 40
                }
            },
            
            securew2: {
                id: 'securew2',
                name: 'SecureW2',
                type: 'Cloud PKI/RADIUS',
                category: 'cloud',
                logo: '🔐',
                color: '#2C5AA0',
                description: 'Cloud PKI and RADIUS services',
                licensing: {
                    model: 'Per-Device Annual',
                    costPerDevice: 42,
                    volumeDiscounts: {
                        1000: 0.08,
                        5000: 0.12
                    }
                },
                deployment: {
                    days: 18,
                    complexity: 'Low',
                    professionalServices: 7000,
                    training: 2500
                },
                operations: {
                    fteRequired: 0.4,
                    automationLevel: 0.70,
                    maintenanceHours: 30
                }
            }
        };
        
        console.log(`✅ Vendor Database loaded with ${Object.keys(this.vendors).length} vendors`);
    }
    
    getAll() {
        return this.vendors;
    }
    
    get(vendorId) {
        return this.vendors[vendorId];
    }
    
    getByCategory(category) {
        return Object.values(this.vendors).filter(v => v.category === category);
    }
    
    calculateTCO(vendorId, devices, years = 3) {
        const vendor = this.vendors[vendorId];
        if (!vendor) return null;
        
        const avgSalary = 120000; // Average IT salary
        let licensing = 0;
        let hardware = vendor.licensing.hardwareCost || 0;
        let support = vendor.licensing.supportCost || 0;
        
        // Calculate licensing based on model
        if (vendor.licensing.model === 'Per-Device Annual' || vendor.licensing.model === 'Per-User Monthly') {
            let costPerDevice = vendor.licensing.costPerDevice;
            
            // Apply volume discounts
            if (vendor.licensing.volumeDiscounts) {
                let discount = 0;
                for (const [threshold, disc] of Object.entries(vendor.licensing.volumeDiscounts)) {
                    if (devices >= parseInt(threshold)) {
                        discount = disc;
                    }
                }
                costPerDevice = costPerDevice * (1 - discount);
            }
            
            licensing = devices * costPerDevice * years;
            if (vendor.licensing.model === 'Per-User Monthly') {
                licensing = licensing * 12; // Convert to annual
            }
        } else if (vendor.licensing.model === 'Perpetual + Maintenance') {
            const initial = devices * vendor.licensing.costPerDevice;
            const maintenance = initial * vendor.licensing.maintenanceRate * (years - 1);
            licensing = initial + maintenance;
        } else if (vendor.licensing.model === 'Annual Subscription') {
            licensing = devices * vendor.licensing.costPerDevice * years;
        } else if (vendor.licensing.model === 'Open Source + Support') {
            licensing = support * years;
        }
        
        // Calculate other costs
        const implementation = vendor.deployment.professionalServices + (vendor.deployment.training || 0);
        const operations = vendor.operations.fteRequired * avgSalary * years;
        
        // Calculate total
        const total = licensing + hardware + implementation + operations;
        
        return {
            vendor: vendor.name,
            vendorId: vendorId,
            devices: devices,
            years: years,
            costs: {
                licensing: Math.round(licensing),
                hardware: Math.round(hardware),
                implementation: Math.round(implementation),
                operations: Math.round(operations),
                total: Math.round(total)
            },
            metrics: {
                costPerDeviceYear: Math.round(total / devices / years),
                deploymentDays: vendor.deployment.days,
                fteRequired: vendor.operations.fteRequired,
                automationLevel: vendor.operations.automationLevel
            }
        };
    }
    
    compareVendors(vendorIds, devices, years = 3) {
        const results = {};
        vendorIds.forEach(vendorId => {
            results[vendorId] = this.calculateTCO(vendorId, devices, years);
        });
        return results;
    }
    
    getBestValue(devices, years = 3) {
        const allTCO = {};
        Object.keys(this.vendors).forEach(vendorId => {
            allTCO[vendorId] = this.calculateTCO(vendorId, devices, years);
        });
        
        // Sort by total cost
        const sorted = Object.entries(allTCO)
            .sort((a, b) => a[1].costs.total - b[1].costs.total);
        
        return {
            best: sorted[0][1],
            all: sorted.map(([id, tco]) => tco)
        };
    }
}

// Register with ModuleLoader
ModuleLoader.register('VendorDatabase', VendorDatabase);
EOF
    success "Vendor Database created"
}

# ============================================================================
# Create Industry Database
# ============================================================================
create_industry_database() {
    log "Creating Industry Database..."
    cat > js/industry-database.js << 'EOF'
// Comprehensive Industry Database
class IndustryDatabase {
    constructor() {
        this.industries = {
            healthcare: {
                id: 'healthcare',
                name: 'Healthcare',
                icon: '🏥',
                description: 'Hospitals, clinics, and healthcare providers',
                compliance: ['HIPAA', 'HITECH', 'FDA', 'Joint Commission'],
                challenges: [
                    'Patient data protection',
                    'Medical device security',
                    'BYOD for healthcare workers',
                    'Guest network for patients'
                ],
                avgDevices: 5000,
                nacRequirements: {
                    critical: ['Device profiling', 'Medical device isolation', 'Guest access', 'HIPAA compliance'],
                    important: ['BYOD support', 'Location tracking', 'Risk scoring'],
                    nice: ['API integration', 'Automated remediation']
                }
            },
            finance: {
                id: 'finance',
                name: 'Financial Services',
                icon: '🏦',
                description: 'Banks, insurance, and financial institutions',
                compliance: ['PCI-DSS', 'SOX', 'GLBA', 'FINRA'],
                challenges: [
                    'Regulatory compliance',
                    'Insider threat prevention',
                    'Third-party access',
                    'Branch connectivity'
                ],
                avgDevices: 8000,
                nacRequirements: {
                    critical: ['Strong authentication', 'Audit logging', 'Compliance reporting', 'Segmentation'],
                    important: ['Risk-based access', 'Third-party management', 'Encryption'],
                    nice: ['Behavioral analytics', 'AI threat detection']
                }
            },
            education: {
                id: 'education',
                name: 'Education',
                icon: '🎓',
                description: 'K-12 schools and higher education',
                compliance: ['FERPA', 'COPPA', 'CIPA', 'State regulations'],
                challenges: [
                    'Student BYOD',
                    'IoT device proliferation',
                    'Limited IT staff',
                    'Budget constraints'
                ],
                avgDevices: 10000,
                nacRequirements: {
                    critical: ['Easy BYOD onboarding', 'Student/staff segmentation', 'Content filtering'],
                    important: ['Chromebook support', 'Guest access', 'Simple management'],
                    nice: ['Parent portal', 'Usage analytics']
                }
            },
            government: {
                id: 'government',
                name: 'Government',
                icon: '🏛️',
                description: 'Federal, state, and local government',
                compliance: ['FedRAMP', 'FISMA', 'NIST 800-53', 'CJIS'],
                challenges: [
                    'Strict compliance requirements',
                    'Legacy system integration',
                    'Multi-agency coordination',
                    'Security clearance levels'
                ],
                avgDevices: 7500,
                nacRequirements: {
                    critical: ['CAC/PIV support', 'FIPS compliance', 'Audit trails', 'Air gap support'],
                    important: ['Multi-level security', 'Legacy support', 'Offline capability'],
                    nice: ['Cross-agency federation', 'Automated compliance']
                }
            },
            manufacturing: {
                id: 'manufacturing',
                name: 'Manufacturing',
                icon: '🏭',
                description: 'Industrial and manufacturing facilities',
                compliance: ['ISO 27001', 'NIST', 'Industry specific'],
                challenges: [
                    'OT/IT convergence',
                    'Legacy equipment',
                    'Supply chain security',
                    'Remote site connectivity'
                ],
                avgDevices: 6000,
                nacRequirements: {
                    critical: ['OT device support', 'Network segmentation', 'Vendor access'],
                    important: ['SCADA integration', 'Ruggedized options', 'Offline operation'],
                    nice: ['Predictive maintenance', 'IoT analytics']
                }
            },
            retail: {
                id: 'retail',
                name: 'Retail',
                icon: '🛍️',
                description: 'Retail stores and e-commerce',
                compliance: ['PCI-DSS', 'State privacy laws'],
                challenges: [
                    'POS system security',
                    'Guest WiFi',
                    'Seasonal staff',
                    'Multi-location management'
                ],
                avgDevices: 3000,
                nacRequirements: {
                    critical: ['PCI compliance', 'Guest isolation', 'POS protection'],
                    important: ['Quick onboarding', 'Central management', 'Franchise support'],
                    nice: ['Customer analytics', 'Marketing integration']
                }
            },
            technology: {
                id: 'technology',
                name: 'Technology',
                icon: '💻',
                description: 'Software and technology companies',
                compliance: ['SOC2', 'ISO 27001', 'GDPR'],
                challenges: [
                    'Developer access needs',
                    'Cloud integration',
                    'Remote workforce',
                    'Rapid scaling'
                ],
                avgDevices: 4000,
                nacRequirements: {
                    critical: ['API-first approach', 'Cloud native', 'Developer friendly'],
                    important: ['CI/CD integration', 'Container support', 'Zero trust'],
                    nice: ['GitOps integration', 'Kubernetes support']
                }
            },
            energy: {
                id: 'energy',
                name: 'Energy & Utilities',
                icon: '⚡',
                description: 'Power, water, and utility companies',
                compliance: ['NERC CIP', 'TSA', 'DOE'],
                challenges: [
                    'Critical infrastructure protection',
                    'SCADA security',
                    'Remote facility access',
                    'Regulatory compliance'
                ],
                avgDevices: 5500,
                nacRequirements: {
                    critical: ['NERC CIP compliance', 'Critical asset protection', 'SCADA isolation'],
                    important: ['Remote access security', 'Vendor management', 'Change control'],
                    nice: ['Predictive analytics', 'Integration with SIEM']
                }
            },
            hospitality: {
                id: 'hospitality',
                name: 'Hospitality',
                icon: '🏨',
                description: 'Hotels, restaurants, and entertainment',
                compliance: ['PCI-DSS', 'Privacy laws'],
                challenges: [
                    'Guest WiFi management',
                    'POS security',
                    'Franchise variations',
                    'Seasonal traffic'
                ],
                avgDevices: 2000,
                nacRequirements: {
                    critical: ['Guest access portal', 'PCI compliance', 'Multi-site management'],
                    important: ['Bandwidth management', 'Easy provisioning', 'Brand customization'],
                    nice: ['Guest analytics', 'Loyalty integration']
                }
            },
            legal: {
                id: 'legal',
                name: 'Legal Services',
                icon: '⚖️',
                description: 'Law firms and legal departments',
                compliance: ['Client confidentiality', 'State bar rules', 'GDPR'],
                challenges: [
                    'Client data protection',
                    'Matter-based access',
                    'Guest attorney access',
                    'Document security'
                ],
                avgDevices: 1500,
                nacRequirements: {
                    critical: ['Strong authentication', 'Audit logging', 'Client isolation'],
                    important: ['Matter-based segmentation', 'Guest access', 'Mobile support'],
                    nice: ['DMS integration', 'Time tracking integration']
                }
            },
            nonprofit: {
                id: 'nonprofit',
                name: 'Non-Profit',
                icon: '🤝',
                description: 'Non-profit organizations and NGOs',
                compliance: ['Donor privacy', 'Grant requirements'],
                challenges: [
                    'Limited budget',
                    'Volunteer access',
                    'Multiple locations',
                    'Grant compliance'
                ],
                avgDevices: 1000,
                nacRequirements: {
                    critical: ['Cost-effective', 'Easy management', 'Multi-site support'],
                    important: ['Volunteer onboarding', 'BYOD support', 'Basic compliance'],
                    nice: ['Donor portal integration', 'Grant reporting']
                }
            },
            pharmaceutical: {
                id: 'pharmaceutical',
                name: 'Pharmaceutical',
                icon: '💊',
                description: 'Drug manufacturers and biotech',
                compliance: ['FDA 21 CFR Part 11', 'HIPAA', 'GxP'],
                challenges: [
                    'Research data protection',
                    'Manufacturing compliance',
                    'Clinical trial security',
                    'IP protection'
                ],
                avgDevices: 6500,
                nacRequirements: {
                    critical: ['21 CFR Part 11 compliance', 'Audit trails', 'Data integrity'],
                    important: ['Lab equipment support', 'Cleanroom compatibility', 'Validation support'],
                    nice: ['LIMS integration', 'Research collaboration tools']
                }
            },
            transportation: {
                id: 'transportation',
                name: 'Transportation & Logistics',
                icon: '🚚',
                description: 'Shipping, logistics, and transportation',
                compliance: ['TSA', 'DOT', 'Industry standards'],
                challenges: [
                    'Mobile workforce',
                    'Vehicle connectivity',
                    'Warehouse security',
                    'Supply chain visibility'
                ],
                avgDevices: 4500,
                nacRequirements: {
                    critical: ['Mobile device support', 'Location awareness', 'Offline capability'],
                    important: ['IoT/telematics support', 'Warehouse segmentation', 'API integration'],
                    nice: ['Fleet management integration', 'Predictive analytics']
                }
            },
            media: {
                id: 'media',
                name: 'Media & Entertainment',
                icon: '🎬',
                description: 'Broadcasting, streaming, and content creation',
                compliance: ['Content protection', 'DMCA', 'Privacy laws'],
                challenges: [
                    'Content security',
                    'Remote production',
                    'Contractor access',
                    'High bandwidth needs'
                ],
                avgDevices: 3500,
                nacRequirements: {
                    critical: ['Content protection', 'High performance', 'Contractor management'],
                    important: ['Remote access', 'Bandwidth prioritization', 'Project isolation'],
                    nice: ['CDN integration', 'Workflow automation']
                }
            },
            insurance: {
                id: 'insurance',
                name: 'Insurance',
                icon: '🛡️',
                description: 'Insurance carriers and brokers',
                compliance: ['State regulations', 'HIPAA (health)', 'PCI-DSS'],
                challenges: [
                    'Agent/broker access',
                    'Customer data protection',
                    'Regulatory compliance',
                    'Multi-state operations'
                ],
                avgDevices: 5000,
                nacRequirements: {
                    critical: ['Compliance reporting', 'Agent portal', 'Data protection'],
                    important: ['Multi-tenancy', 'API access', 'Mobile support'],
                    nice: ['Claims system integration', 'Risk analytics']
                }
            }
        };
        
        console.log(`[IndustryDatabase] Loaded ${Object.keys(this.industries).length} industries`);
    }
    
    getAll() {
        return this.industries;
    }
    
    get(industryId) {
        return this.industries[industryId];
    }
    
    getCompliance(industryId) {
        const industry = this.industries[industryId];
        return industry ? industry.compliance : [];
    }
    
    getRequirements(industryId) {
        const industry = this.industries[industryId];
        return industry ? industry.nacRequirements : null;
    }
    
    getRecommendedVendors(industryId) {
        const industry = this.industries[industryId];
        if (!industry) return [];
        
        // Logic to recommend vendors based on industry needs
        const recommendations = {
            healthcare: ['portnox', 'cisco_ise', 'aruba_clearpass'],
            finance: ['portnox', 'cisco_ise', 'forescout'],
            education: ['portnox', 'packetfence', 'aruba_clearpass'],
            government: ['cisco_ise', 'forescout', 'portnox'],
            manufacturing: ['portnox', 'forescout', 'fortinet_nac'],
            technology: ['portnox', 'securew2', 'foxpass']
        };
        
        return recommendations[industryId] || ['portnox', 'cisco_ise', 'aruba_clearpass'];
    }
}

// Register with ModuleLoader
ModuleLoader.register('IndustryDatabase', IndustryDatabase, ['VendorDatabase']);
EOF
    success "Industry Database created"
}

# ============================================================================
# Create Compliance Database
# ============================================================================
create_compliance_database() {
    log "Creating Compliance Database..."
    cat > js/compliance-database.js << 'EOF'
// Comprehensive Compliance Database
class ComplianceDatabase {
    constructor() {
        this.frameworks = {
            hipaa: {
                id: 'hipaa',
                name: 'HIPAA',
                fullName: 'Health Insurance Portability and Accountability Act',
                icon: '🏥',
                category: 'Healthcare',
                description: 'US healthcare data protection and privacy requirements',
                nacControls: [
                    {
                        id: '164.308(a)(1)',
                        title: 'Access Control',
                        description: 'Implement technical policies for electronic information systems',
                        nacCapability: 'User authentication and device authorization',
                        required: true
                    },
                    {
                        id: '164.308(a)(3)',
                        title: 'Workforce Security',
                        description: 'Procedures to ensure workforce member access is appropriate',
                        nacCapability: 'Role-based access control and segmentation',
                        required: true
                    },
                    {
                        id: '164.308(a)(4)',
                        title: 'Information Access Management',
                        description: 'Policies for granting access to ePHI',
                        nacCapability: 'Dynamic access policies based on user/device context',
                        required: true
                    },
                    {
                        id: '164.312(a)(1)',
                        title: 'Access Control Technical',
                        description: 'Technical measures to allow only authorized access',
                        nacCapability: '802.1X authentication and encryption',
                        required: true
                    },
                    {
                        id: '164.312(b)',
                        title: 'Audit Controls',
                        description: 'Hardware, software, procedural mechanisms for audit',
                        nacCapability: 'Comprehensive logging and reporting',
                        required: true
                    }
                ]
            },
            
            pci_dss: {
                id: 'pci_dss',
                name: 'PCI-DSS',
                fullName: 'Payment Card Industry Data Security Standard',
                icon: '💳',
                category: 'Financial',
                description: 'Security standards for organizations handling credit cards',
                nacControls: [
                    {
                        id: '1.1.2',
                        title: 'Network Segmentation',
                        description: 'Current network diagram with cardholder data flows',
                        nacCapability: 'VLAN assignment and micro-segmentation',
                        required: true
                    },
                    {
                        id: '2.3',
                        title: 'Encrypt Non-Console Access',
                        description: 'Encrypt all non-console administrative access',
                        nacCapability: 'Certificate-based authentication and encryption',
                        required: true
                    },
                    {
                        id: '7.1',
                        title: 'Limit Access to System Components',
                        description: 'Limit access to system components by business need',
                        nacCapability: 'Role-based network access control',
                        required: true
                    },
                    {
                        id: '8.1',
                        title: 'User Identification',
                        description: 'Assign unique ID to each person with computer access',
                        nacCapability: 'Unique user authentication and tracking',
                        required: true
                    },
                    {
                        id: '10.1',
                        title: 'Audit Trails',
                        description: 'Link all access to system components to users',
                        nacCapability: 'Complete access audit trails',
                        required: true
                    }
                ]
            },
            
            soc2: {
                id: 'soc2',
                name: 'SOC 2',
                fullName: 'Service Organization Control 2',
                icon: '🔒',
                category: 'General',
                description: 'Auditing standard for service organizations',
                nacControls: [
                    {
                        id: 'CC6.1',
                        title: 'Logical and Physical Access Controls',
                        description: 'Implement logical access security measures',
                        nacCapability: 'Network access control and authentication',
                        required: true
                    },
                    {
                        id: 'CC6.2',
                        title: 'Prior to Issuing System Credentials',
                        description: 'Registration and authorization of new users',
                        nacCapability: 'User onboarding and provisioning workflows',
                        required: true
                    },
                    {
                        id: 'CC6.3',
                        title: 'User Access Modification',
                        description: 'Process to modify or remove access',
                        nacCapability: 'Dynamic access control and deprovisioning',
                        required: true
                    },
                    {
                        id: 'CC7.2',
                        title: 'System Monitoring',
                        description: 'Monitor system components for anomalies',
                        nacCapability: 'Real-time network monitoring and alerting',
                        required: true
                    }
                ]
            },
            
            iso27001: {
                id: 'iso27001',
                name: 'ISO 27001',
                fullName: 'ISO/IEC 27001:2013',
                icon: '🌐',
                category: 'International',
                description: 'International information security management standard',
                nacControls: [
                    {
                        id: 'A.9.1',
                        title: 'Access Control Policy',
                        description: 'Business requirements for access control',
                        nacCapability: 'Policy-based network access control',
                        required: true
                    },
                    {
                        id: 'A.9.2',
                        title: 'User Access Management',
                        description: 'Formal user registration and de-registration',
                        nacCapability: 'User lifecycle management',
                        required: true
                    },
                    {
                        id: 'A.9.4',
                        title: 'System and Application Access Control',
                        description: 'Prevent unauthorized access to systems',
                        nacCapability: '802.1X and certificate-based authentication',
                        required: true
                    },
                    {
                        id: 'A.12.4',
                        title: 'Logging and Monitoring',
                        description: 'Recording events and generating evidence',
                        nacCapability: 'Comprehensive audit logging',
                        required: true
                    }
                ]
            },
            
            nist: {
                id: 'nist',
                name: 'NIST',
                fullName: 'NIST Cybersecurity Framework',
                icon: '🛡️',
                category: 'Government',
                description: 'Framework for improving critical infrastructure cybersecurity',
                nacControls: [
                    {
                        id: 'PR.AC-1',
                        title: 'Identity Management',
                        description: 'Identities and credentials are managed',
                        nacCapability: 'Comprehensive identity and device management',
                        required: true
                    },
                    {
                        id: 'PR.AC-3',
                        title: 'Remote Access',
                        description: 'Remote access is managed',
                        nacCapability: 'Secure remote access with posture checking',
                        required: true
                    },
                    {
                        id: 'PR.AC-4',
                        title: 'Access Permissions',
                        description: 'Access permissions with least privilege',
                        nacCapability: 'Least privilege and network segmentation',
                        required: true
                    },
                    {
                        id: 'PR.AC-5',
                        title: 'Network Integrity',
                        description: 'Network integrity is protected',
                        nacCapability: 'Network segmentation and isolation',
                        required: true
                    }
                ]
            },
            
            gdpr: {
                id: 'gdpr',
                name: 'GDPR',
                fullName: 'General Data Protection Regulation',
                icon: '🇪🇺',
                category: 'Privacy',
                description: 'EU data protection and privacy regulation',
                nacControls: [
                    {
                        id: 'Article 32',
                        title: 'Security of Processing',
                        description: 'Appropriate technical and organizational measures',
                        nacCapability: 'Access control and encryption',
                        required: true
                    },
                    {
                        id: 'Article 25',
                        title: 'Data Protection by Design',
                        description: 'Built-in data protection measures',
                        nacCapability: 'Privacy-preserving network access',
                        required: true
                    },
                    {
                        id: 'Article 35',
                        title: 'Data Protection Impact Assessment',
                        description: 'Assessment of high-risk processing',
                        nacCapability: 'Risk-based access control',
                        required: false
                    }
                ]
            },
            
            ccpa: {
                id: 'ccpa',
                name: 'CCPA',
                fullName: 'California Consumer Privacy Act',
                icon: '🐻',
                category: 'Privacy',
                description: 'California state privacy law',
                nacControls: [
                    {
                        id: '1798.150',
                        title: 'Security Breach',
                        description: 'Reasonable security procedures',
                        nacCapability: 'Access control and monitoring',
                        required: true
                    },
                    {
                        id: 'Reasonable Security',
                        title: 'Reasonable Security Measures',
                        description: 'Appropriate safeguards for personal information',
                        nacCapability: 'Network segmentation and access control',
                        required: true
                    }
                ]
            },
            
            ferpa: {
                id: 'ferpa',
                name: 'FERPA',
                fullName: 'Family Educational Rights and Privacy Act',
                icon: '🎓',
                category: 'Education',
                description: 'US student education records privacy law',
                nacControls: [
                    {
                        id: '99.31',
                        title: 'Prior Consent',
                        description: 'Consent before disclosure of education records',
                        nacCapability: 'Role-based access to student data',
                        required: true
                    },
                    {
                        id: '99.35',
                        title: 'Record of Disclosures',
                        description: 'Maintain record of disclosures',
                        nacCapability: 'Audit logging of access',
                        required: true
                    }
                ]
            },
            
            fedramp: {
                id: 'fedramp',
                name: 'FedRAMP',
                fullName: 'Federal Risk and Authorization Management Program',
                icon: '🏛️',
                category: 'Government',
                description: 'US government cloud security requirements',
                nacControls: [
                    {
                        id: 'AC-2',
                        title: 'Account Management',
                        description: 'Manage information system accounts',
                        nacCapability: 'Automated account management',
                        required: true
                    },
                    {
                        id: 'AC-3',
                        title: 'Access Enforcement',
                        description: 'Enforce approved authorizations',
                        nacCapability: 'Policy enforcement points',
                        required: true
                    },
                    {
                        id: 'AC-7',
                        title: 'Unsuccessful Login Attempts',
                        description: 'Limit consecutive invalid login attempts',
                        nacCapability: 'Account lockout and alerting',
                        required: true
                    }
                ]
            },
            
            cmmc: {
                id: 'cmmc',
                name: 'CMMC',
                fullName: 'Cybersecurity Maturity Model Certification',
                icon: '🎯',
                category: 'Defense',
                description: 'US DoD contractor cybersecurity requirements',
                nacControls: [
                    {
                        id: 'AC.1.001',
                        title: 'Limit System Access',
                        description: 'Limit access to authorized users',
                        nacCapability: 'User authentication and authorization',
                        required: true
                    },
                    {
                        id: 'AC.1.002',
                        title: 'Limit System Access to Transactions',
                        description: 'Limit access to types of transactions',
                        nacCapability: 'Role-based access control',
                        required: true
                    },
                    {
                        id: 'AC.2.016',
                        title: 'Control CUI Flow',
                        description: 'Control flow of CUI in accordance with authorizations',
                        nacCapability: 'Data-aware network segmentation',
                        required: true
                    }
                ]
            },
            
            nerc_cip: {
                id: 'nerc_cip',
                name: 'NERC CIP',
                fullName: 'North American Electric Reliability Corporation Critical Infrastructure Protection',
                icon: '⚡',
                category: 'Energy',
                description: 'Electric utility cybersecurity standards',
                nacControls: [
                    {
                        id: 'CIP-005-5',
                        title: 'Electronic Security Perimeter',
                        description: 'Manage electronic access to BES Cyber Systems',
                        nacCapability: 'Network segmentation and access control',
                        required: true
                    },
                    {
                        id: 'CIP-007-5',
                        title: 'System Security Management',
                        description: 'Manage system security through technical controls',
                        nacCapability: 'Device authentication and monitoring',
                        required: true
                    }
                ]
            },
            
            sox: {
                id: 'sox',
                name: 'SOX',
                fullName: 'Sarbanes-Oxley Act',
                icon: '📊',
                category: 'Financial',
                description: 'US public company accounting reform',
                nacControls: [
                    {
                        id: 'Section 404',
                        title: 'Internal Controls',
                        description: 'Assessment of internal controls',
                        nacCapability: 'Access control to financial systems',
                        required: true
                    },
                    {
                        id: 'IT General Controls',
                        title: 'ITGC',
                        description: 'IT controls over financial reporting',
                        nacCapability: 'User access management and monitoring',
                        required: true
                    }
                ]
            },
            
            glba: {
                id: 'glba',
                name: 'GLBA',
                fullName: 'Gramm-Leach-Bliley Act',
                icon: '🏦',
                category: 'Financial',
                description: 'US financial services privacy and security',
                nacControls: [
                    {
                        id: 'Safeguards Rule',
                        title: 'Administrative Safeguards',
                        description: 'Designate employees to coordinate safeguards',
                        nacCapability: 'Access control and user management',
                        required: true
                    },
                    {
                        id: 'Technical Safeguards',
                        title: 'Access Controls',
                        description: 'Implement access controls on customer information',
                        nacCapability: 'Network segmentation and authentication',
                        required: true
                    }
                ]
            }
        };
        
        console.log(`[ComplianceDatabase] Loaded ${Object.keys(this.frameworks).length} frameworks`);
    }
    
    getAll() {
        return this.frameworks;
    }
    
    get(frameworkId) {
        return this.frameworks[frameworkId];
    }
    
    getByCategory(category) {
        return Object.values(this.frameworks).filter(f => f.category === category);
    }
    
    getControls(frameworkId) {
        const framework = this.frameworks[frameworkId];
        return framework ? framework.nacControls : [];
    }
    
    getRequiredControls(frameworkId) {
        const framework = this.frameworks[frameworkId];
        return framework ? framework.nacControls.filter(c => c.required) : [];
    }
    
    assessVendorCompliance(vendorFeatures, frameworkId) {
        const framework = this.frameworks[frameworkId];
        if (!framework) return null;
        
        const assessment = {
            framework: framework.name,
            totalControls: framework.nacControls.length,
            metControls: 0,
            partialControls: 0,
            unmetControls: 0,
            score: 0,
            details: []
        };
        
        // Simple assessment logic - in real implementation would be more sophisticated
        framework.nacControls.forEach(control => {
            let status = 'unmet';
            
            // Check vendor features against control requirements
            if (vendorFeatures.certificateManagement && control.nacCapability.includes('authentication')) {
                status = 'met';
            } else if (vendorFeatures.apiIntegration && control.nacCapability.includes('audit')) {
                status = 'met';
            } else if (vendorFeatures.riskScoring && control.nacCapability.includes('risk')) {
                status = 'met';
            } else if (vendorFeatures.multiVendor) {
                status = 'partial';
            }
            
            assessment.details.push({
                control: control.id,
                title: control.title,
                status: status
            });
            
            if (status === 'met') assessment.metControls++;
            else if (status === 'partial') assessment.partialControls++;
            else assessment.unmetControls++;
        });
        
        assessment.score = Math.round((assessment.metControls / assessment.totalControls) * 100);
        
        return assessment;
    }
}

// Register with ModuleLoader
ModuleLoader.register('ComplianceDatabase', ComplianceDatabase);
EOF
    success "Compliance Database created"
}

# ============================================================================
# Create Main Platform JavaScript
# ============================================================================
create_platform_js() {
    log "Creating Main Platform JavaScript..."
    cat > js/platform.js << 'EOF'
// Main Platform Application
class PortnoxPlatform {
    constructor() {
        this.modules = {};
        this.state = {
            currentSection: 'dashboard',
            organization: {},
            devices: {},
            infrastructure: {},
            compliance: [],
            analysis: {},
            selectedVendors: ['portnox', 'cisco_ise', 'aruba_clearpass', 'forescout']
        };
        this.initialized = false;
    }
    
    async initialize() {
        console.log('🌟 Initializing Portnox Ultimate Platform...');
        
        try {
            // Initialize all modules
            ModuleLoader.initializeAll();
            
            // Get module instances
            this.modules = {
                eventSystem: ModuleLoader.get('EventSystem'),
                configManager: ModuleLoader.get('ConfigManager'),
                vendorDatabase: ModuleLoader.get('VendorDatabase'),
                industryDatabase: ModuleLoader.get('IndustryDatabase'),
                complianceDatabase: ModuleLoader.get('ComplianceDatabase')
            };
            
            // Verify all modules loaded
            const missingModules = [];
            Object.entries(this.modules).forEach(([name, module]) => {
                if (!module) {
                    missingModules.push(name);
                }
            });
            
            if (missingModules.length > 0) {
                throw new Error(`Failed to load modules: ${missingModules.join(', ')}`);
            }
            
            console.log('✅ All modules loaded successfully');
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Load saved state
            this.loadState();
            
            // Update UI
            this.updateDashboard();
            
            // Setup auto-save
            if (this.modules.configManager.get('features.autoSave')) {
                setInterval(() => this.saveState(), 30000);
            }
            
            this.initialized = true;
            console.log('✅ Platform fully initialized!');
            
            return true;
            
        } catch (error) {
            console.error('❌ Platform initialization failed:', error);
            this.showError('Platform initialization failed. Please refresh the page.');
            return false;
        }
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.navigateToSection(section);
            });
        });
        
        // Buttons
        const startBtn = document.getElementById('startAssessment');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startAssessment());
        }
        
        const saveBtn = document.getElementById('saveProgress');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveState());
        }
        
        const exportBtn = document.getElementById('exportReport');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportReport());
        }
        
        // Form inputs
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('change', () => this.handleInputChange(input));
        });
        
        // Device counters
        document.querySelectorAll('.device-increment').forEach(btn => {
            btn.addEventListener('click', () => {
                const device = btn.dataset.device;
                this.incrementDevice(device);
            });
        });
        
        document.querySelectorAll('.device-decrement').forEach(btn => {
            btn.addEventListener('click', () => {
                const device = btn.dataset.device;
                this.decrementDevice(device);
            });
        });
        
        // Vendor selection
        document.querySelectorAll('.vendor-select').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateSelectedVendors());
        });
        
        // Listen to module events
        if (this.modules.eventSystem) {
            this.modules.eventSystem.on('config:changed', (data) => {
                console.log('Config changed:', data);
            });
        }
    }
    
    navigateToSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === section) {
                item.classList.add('active');
            }
        });
        
        // Update content
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });
        
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        this.state.currentSection = section;
        
        // Section-specific logic
        switch (section) {
            case 'tco':
                this.calculateTCO();
                break;
            case 'roi':
                this.calculateROI();
                break;
            case 'compliance':
                this.updateComplianceView();
                break;
            case 'vendors':
                this.updateVendorComparison();
                break;
            case 'timeline':
                this.updateTimeline();
                break;
        }
        
        // Emit navigation event
        if (this.modules.eventSystem) {
            this.modules.eventSystem.emit('navigation', { section });
        }
    }
    
    startAssessment() {
        this.navigateToSection('organization');
        this.updateProgress('organization');
    }
    
    handleInputChange(input) {
        const section = input.closest('.content-section')?.id;
        
        switch (section) {
            case 'organization':
                this.updateOrganizationData(input);
                break;
            case 'scoping':
                this.updateScopingData(input);
                break;
        }
        
        // Auto-save if enabled
        if (this.modules.configManager?.get('features.autoSave')) {
            this.saveState();
        }
    }
    
    updateOrganizationData(input) {
        const field = input.id;
        const value = input.type === 'checkbox' ? input.checked : input.value;
        
        if (field === 'compliance') {
            if (!this.state.compliance) this.state.compliance = [];
            if (input.checked) {
                this.state.compliance.push(value);
            } else {
                this.state.compliance = this.state.compliance.filter(c => c !== value);
            }
        } else {
            this.state.organization[field] = value;
        }
    }
    
    updateScopingData(input) {
        const field = input.id;
        const value = input.value;
        
        if (field.includes('-count')) {
            const device = field.replace('-count', '');
            this.state.devices[device] = parseInt(value) || 0;
            this.updateDeviceTotal();
        } else {
            this.state.infrastructure[field] = value;
        }
    }
    
    incrementDevice(device) {
        const input = document.getElementById(`${device}-count`);
        if (input) {
            input.value = parseInt(input.value) + 1;
            this.state.devices[device] = parseInt(input.value);
            this.updateDeviceTotal();
        }
    }
    
    decrementDevice(device) {
        const input = document.getElementById(`${device}-count`);
        if (input && parseInt(input.value) > 0) {
            input.value = parseInt(input.value) - 1;
            this.state.devices[device] = parseInt(input.value);
            this.updateDeviceTotal();
        }
    }
    
    updateDeviceTotal() {
        const total = Object.values(this.state.devices).reduce((sum, count) => sum + (count || 0), 0);
        
        const totalElement = document.getElementById('totalDevices');
        if (totalElement) {
            totalElement.textContent = total.toLocaleString();
        }
        
        // Update dashboard metrics
        this.updateDashboardMetrics(total);
    }
    
    updateDashboardMetrics(deviceCount) {
        if (!deviceCount || !this.modules.vendorDatabase) return;
        
        // Calculate quick metrics
        const portnoxTCO = this.modules.vendorDatabase.calculateTCO('portnox', deviceCount, 3);
        const ciscoTCO = this.modules.vendorDatabase.calculateTCO('cisco_ise', deviceCount, 3);
        
        if (portnoxTCO && ciscoTCO) {
            const savings = ciscoTCO.costs.total - portnoxTCO.costs.total;
            const savingsPercent = Math.round((savings / ciscoTCO.costs.total) * 100);
            
            // Update metric cards
            const savingsElement = document.querySelector('[data-metric="savings"]');
            if (savingsElement) {
                savingsElement.textContent = `$${(savings / 1000).toFixed(0)}K`;
            }
            
            const percentElement = document.querySelector('[data-metric="reduction"]');
            if (percentElement) {
                percentElement.textContent = `${savingsPercent}%`;
            }
        }
    }
    
    calculateTCO() {
        const totalDevices = Object.values(this.state.devices).reduce((sum, count) => sum + (count || 0), 0);
        
        if (totalDevices === 0) {
            this.showNotification('Please add devices first', 'warning');
            return;
        }
        
        if (!this.modules.vendorDatabase) {
            this.showError('Vendor database not loaded');
            return;
        }
        
        // Calculate TCO for selected vendors
        const results = {};
        this.state.selectedVendors.forEach(vendorId => {
            results[vendorId] = this.modules.vendorDatabase.calculateTCO(vendorId, totalDevices, 3);
        });
        
        this.state.analysis.tco = results;
        this.updateTCODisplay();
    }
    
    updateTCODisplay() {
        const tbody = document.getElementById('tcoTableBody');
        if (!tbody || !this.state.analysis.tco) return;
        
        tbody.innerHTML = '';
        
        // Sort by total cost
        const sorted = Object.entries(this.state.analysis.tco)
            .filter(([_, tco]) => tco !== null)
            .sort((a, b) => a[1].costs.total - b[1].costs.total);
        
        sorted.forEach(([vendorId, tco]) => {
            const vendor = this.modules.vendorDatabase.get(vendorId);
            if (!vendor) return;
            
            const row = document.createElement('tr');
            if (vendorId === 'portnox') {
                row.classList.add('vendor-highlight');
            }
            
            row.innerHTML = `
                <td>${vendor.logo} ${vendor.name}</td>
                <td>$${tco.costs.licensing.toLocaleString()}</td>
                <td>$${tco.costs.hardware.toLocaleString()}</td>
                <td>$${tco.costs.implementation.toLocaleString()}</td>
                <td>$${tco.costs.operations.toLocaleString()}</td>
                <td><strong>$${tco.costs.total.toLocaleString()}</strong></td>
            `;
            
            tbody.appendChild(row);
        });
        
        // Update summary metrics
        this.updateTCOMetrics();
    }
    
    updateTCOMetrics() {
        if (!this.state.analysis.tco) return;
        
        const portnox = this.state.analysis.tco.portnox;
        const others = Object.entries(this.state.analysis.tco)
            .filter(([id, _]) => id !== 'portnox')
            .map(([_, tco]) => tco);
        
        if (!portnox || others.length === 0) return;
        
        // Find highest cost vendor
        const highest = others.reduce((max, tco) => 
            tco.costs.total > max.costs.total ? tco : max
        );
        
        const savings = highest.costs.total - portnox.costs.total;
        const savingsPercent = Math.round((savings / highest.costs.total) * 100);
        
        // Update metric displays
        document.getElementById('totalSavings').textContent = `$${(savings / 1000).toFixed(0)}K`;
        document.getElementById('costReduction').textContent = `${savingsPercent}%`;
        document.getElementById('costPerDevice').textContent = `$${portnox.metrics.costPerDeviceYear}`;
        document.getElementById('fteSavings').textContent = 
            `${(highest.metrics.fteRequired - portnox.metrics.fteRequired).toFixed(2)} FTE`;
    }
    
    calculateROI() {
        // Implement ROI calculation logic
        console.log('Calculating ROI...');
    }
    
    updateComplianceView() {
        // Update compliance view with selected frameworks
        console.log('Updating compliance view...');
    }
    
    updateVendorComparison() {
        // Update vendor comparison view
        console.log('Updating vendor comparison...');
    }
    
    updateTimeline() {
        // Update implementation timeline
        console.log('Updating timeline...');
    }
    
    updateProgress(step) {
        // Update workflow progress indicators
        document.querySelectorAll('.workflow-step').forEach(ws => {
            ws.classList.remove('active', 'completed');
            const wsStep = ws.dataset.step;
            if (wsStep === step) {
                ws.classList.add('active');
            } else if (this.state.progress?.[wsStep]) {
                ws.classList.add('completed');
            }
        });
    }
    
    updateDashboard() {
        // Update device total
        this.updateDeviceTotal();
        
        // Update other dashboard elements
        const orgName = this.state.organization?.companyName;
        if (orgName) {
            const nameDisplay = document.getElementById('dashboardOrgName');
            if (nameDisplay) {
                nameDisplay.textContent = orgName;
            }
        }
    }
    
    saveState() {
        try {
            localStorage.setItem('portnoxPlatformState', JSON.stringify(this.state));
            this.showNotification('Progress saved', 'success');
        } catch (error) {
            console.error('Error saving state:', error);
            this.showError('Failed to save progress');
        }
    }
    
    loadState() {
        try {
            const saved = localStorage.getItem('portnoxPlatformState');
            if (saved) {
                this.state = JSON.parse(saved);
                this.restoreFormData();
                console.log('State loaded from storage');
            }
        } catch (error) {
            console.error('Error loading state:', error);
        }
    }
    
    restoreFormData() {
        // Restore organization data
        if (this.state.organization) {
            Object.entries(this.state.organization).forEach(([field, value]) => {
                const input = document.getElementById(field);
                if (input) {
                    input.value = value;
                }
            });
        }
        
        // Restore device counts
        if (this.state.devices) {
            Object.entries(this.state.devices).forEach(([device, count]) => {
                const input = document.getElementById(`${device}-count`);
                if (input) {
                    input.value = count || 0;
                }
            });
        }
        
        // Restore compliance selections
        if (this.state.compliance) {
            this.state.compliance.forEach(framework => {
                const checkbox = document.querySelector(`input[value="${framework}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
    }
    
    exportReport() {
        console.log('Exporting comprehensive report...');
        // Implement report export
        this.showNotification('Report generation started...', 'info');
    }
    
    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.className = `notification show ${type}`;
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }
    
    showError(message) {
        this.showNotification(message, 'error');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌟 DOM Ready - Starting platform initialization...');
    
    // Create global platform instance
    window.platform = new PortnoxPlatform();
    
    // Initialize platform
    const initialized = await window.platform.initialize();
    
    if (initialized) {
        console.log('✅ Portnox Ultimate Platform ready!');
    } else {
        console.error('❌ Failed to initialize platform');
    }
});

// Export for module access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortnoxPlatform;
}
EOF
    success "Platform JavaScript created"
}

# ============================================================================
# Create Main CSS
# ============================================================================
create_platform_css() {
    log "Creating Platform CSS..."
    cat > css/platform.css << 'EOF'
/* Portnox Ultimate Platform - Main Styles */

:root {
    /* Brand Colors */
    --portnox-primary: #1B67B2;
    --portnox-secondary: #0066FF;
    --portnox-accent: #00B2BA;
    --portnox-dark: #0e5495;
    
    /* UI Colors */
    --bg-dark: #0A0E27;
    --bg-darker: #050816;
    --bg-card: rgba(17, 25, 58, 0.75);
    --bg-glass: rgba(255, 255, 255, 0.05);
    --border-glass: rgba(255, 255, 255, 0.1);
    --text-primary: #FFFFFF;
    --text-secondary: #94A3B8;
    --text-accent: #64FFDA;
    
    /* Status Colors */
    --status-success: #10B981;
    --status-warning: #F59E0B;
    --status-error: #EF4444;
    --status-info: #3B82F6;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg-darker);
    color: var(--text-primary);
    line-height: 1.6;
    min-height: 100vh;
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

/* Loading States */
.loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid var(--border-glass);
    border-top-color: var(--portnox-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Utility Classes */
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-secondary { color: var(--text-secondary); }
.text-accent { color: var(--text-accent); }
.text-success { color: var(--status-success); }
.text-warning { color: var(--status-warning); }
.text-error { color: var(--status-error); }

.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mt-3 { margin-top: 1.5rem; }
.mt-4 { margin-top: 2rem; }

.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 2rem; }

.p-1 { padding: 0.5rem; }
.p-2 { padding: 1rem; }
.p-3 { padding: 1.5rem; }
.p-4 { padding: 2rem; }

/* Responsive Grid */
.grid {
    display: grid;
    gap: 1.5rem;
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 768px) {
    .grid-cols-2,
    .grid-cols-3,
    .grid-cols-4 {
        grid-template-columns: 1fr;
    }
}

@media (min-width: 768px) and (max-width: 1024px) {
    .grid-cols-3,
    .grid-cols-4 {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Components */
.card {
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border-glass);
    border-radius: 16px;
    padding: 24px;
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: var(--bg-glass);
    border: 1px solid var(--border-glass);
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
}

.btn:hover {
    background: rgba(255,255,255,0.1);
    transform: translateY(-2px);
}

.btn-primary {
    background: linear-gradient(135deg, var(--portnox-primary), var(--portnox-accent));
    border: none;
    color: white;
}

.btn-primary:hover {
    box-shadow: 0 10px 30px rgba(27, 103, 178, 0.3);
}

.btn-sm {
    padding: 8px 16px;
    font-size: 13px;
}

.btn-lg {
    padding: 16px 32px;
    font-size: 16px;
}

/* Forms */
.form-group {
    margin-bottom: 20px;
}

.form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--text-primary);
}

.form-control {
    width: 100%;
    padding: 12px 16px;
    background: var(--bg-glass);
    border: 1px solid var(--border-glass);
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 14px;
    transition: all 0.3s ease;
}

.form-control:focus {
    outline: none;
    border-color: var(--portnox-primary);
    box-shadow: 0 0 0 3px rgba(27, 103, 178, 0.1);
}

/* Tables */
.table-responsive {
    overflow-x: auto;
    margin: 20px 0;
}

.table {
    width: 100%;
    border-collapse: collapse;
    background: var(--bg-card);
    border-radius: 12px;
    overflow: hidden;
}

.table th {
    background: var(--bg-glass);
    padding: 16px;
    text-align: left;
    font-weight: 600;
    border-bottom: 1px solid var(--border-glass);
}

.table td {
    padding: 16px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}

.table tr:last-child td {
    border-bottom: none;
}

.table tr:hover td {
    background: rgba(255,255,255,0.02);
}

.table .vendor-highlight {
    background: rgba(27, 103, 178, 0.1);
}

/* Notifications */
.notification {
    position: fixed;
    top: 100px;
    right: 40px;
    background: var(--bg-card);
    border: 1px solid var(--border-glass);
    border-radius: 12px;
    padding: 20px;
    min-width: 300px;
    transform: translateX(400px);
    transition: transform 0.3s ease-out;
    z-index: 1000;
}

.notification.show {
    transform: translateX(0);
}

.notification.success {
    border-color: var(--status-success);
    background: rgba(16, 185, 129, 0.1);
}

.notification.warning {
    border-color: var(--status-warning);
    background: rgba(245, 158, 11, 0.1);
}

.notification.error {
    border-color: var(--status-error);
    background: rgba(239, 68, 68, 0.1);
}

.notification.info {
    border-color: var(--status-info);
    background: rgba(59, 130, 246, 0.1);
}

/* Metrics */
.metric-card {
    background: var(--bg-card);
    border: 1px solid var(--border-glass);
    border-radius: 16px;
    padding: 24px;
    position: relative;
    overflow: hidden;
}

.metric-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, var(--portnox-primary), var(--portnox-accent));
}

.metric-value {
    font-size: 36px;
    font-weight: 700;
    background: linear-gradient(135deg, var(--text-primary), var(--text-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 5px;
}

.metric-label {
    font-size: 14px;
    color: var(--text-secondary);
}

/* Device Counter */
.device-counter {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
}

.device-counter button {
    width: 30px;
    height: 30px;
    border: 1px solid var(--border-glass);
    background: var(--bg-glass);
    color: var(--text-primary);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
}

.device-counter button:hover {
    background: var(--portnox-primary);
    color: white;
    transform: scale(1.1);
}

.device-counter input {
    width: 60px;
    text-align: center;
    background: transparent;
    border: 1px solid var(--border-glass);
    border-radius: 6px;
    padding: 5px;
    color: var(--text-primary);
}

/* Progress Bar */
.progress {
    width: 100%;
    height: 8px;
    background: var(--bg-glass);
    border-radius: 4px;
    overflow: hidden;
    margin: 20px 0;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(135deg, var(--portnox-primary), var(--portnox-accent));
    border-radius: 4px;
    transition: width 0.5s ease;
    position: relative;
    overflow: hidden;
}

.progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
    );
    animation: progressShine 2s linear infinite;
}

@keyframes progressShine {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
}

/* Vendor Logos */
.vendor-logo {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
}

.vendor-icon {
    font-size: 24px;
}

/* Responsive */
@media (max-width: 768px) {
    .header {
        padding: 15px 20px;
    }
    
    .sidebar-nav {
        display: none;
    }
    
    .content-area {
        padding: 20px;
    }
    
    .metrics-grid {
        grid-template-columns: 1fr;
    }
    
    .device-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
    
    .notification {
        right: 20px;
        left: 20px;
        min-width: auto;
    }
}

/* Print Styles */
@media print {
    body {
        background: white;
        color: black;
    }
    
    .sidebar-nav,
    .header-controls,
    .btn,
    .device-counter button {
        display: none !important;
    }
    
    .card {
        background: white;
        border: 1px solid #ddd;
        page-break-inside: avoid;
    }
    
    .table {
        background: white;
    }
    
    .table th {
        background: #f5f5f5;
        color: black;
    }
}
EOF
    success "Platform CSS created"
}

# ============================================================================
# Create Main HTML
# ============================================================================
create_index_html() {
    log "Creating index.html..."
    cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portnox Ultimate TCO & NAC Platform</title>
    
    <!-- External Dependencies -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.3.0/chart.umd.js"></script>
    
    <!-- Platform Styles -->
    <link rel="stylesheet" href="css/platform.css">
    
    <style>
        /* Inline critical styles for faster loading */
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0A0E27;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        
        .loading-logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #1B67B2, #00B2BA);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            color: white;
            margin-bottom: 30px;
            animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        .loading-text {
            color: #94A3B8;
            font-size: 18px;
            margin-bottom: 20px;
        }
        
        .loading-progress {
            width: 200px;
            height: 4px;
            background: rgba(255,255,255,0.1);
            border-radius: 2px;
            overflow: hidden;
        }
        
        .loading-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #1B67B2, #00B2BA);
            animation: loadingProgress 2s ease-in-out;
        }
        
        @keyframes loadingProgress {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        
        /* Header Styles */
        .header {
            background: rgba(17, 25, 58, 0.75);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px 40px;
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        
        .header-content {
            max-width: 1800px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .logo-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #1B67B2, #00B2BA);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: white;
        }
        
        /* Main Layout */
        .main-container {
            display: flex;
            min-height: calc(100vh - 88px);
        }
        
        /* Sidebar Navigation */
        .sidebar-nav {
            width: 280px;
            background: rgba(17, 25, 58, 0.75);
            backdrop-filter: blur(20px);
            padding: 30px 20px;
            overflow-y: auto;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-section {
            margin-bottom: 30px;
        }
        
        .nav-section-title {
            font-size: 12px;
            font-weight: 600;
            color: #94A3B8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 15px;
            padding-left: 10px;
        }
        
        .nav-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 12px 15px;
            margin-bottom: 5px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #FFFFFF;
            text-decoration: none;
            position: relative;
            overflow: hidden;
        }
        
        .nav-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 3px;
            background: #00B2BA;
            transform: scaleY(0);
            transition: transform 0.3s ease;
        }
        
        .nav-item:hover {
            background: rgba(255, 255, 255, 0.05);
            transform: translateX(5px);
        }
        
        .nav-item.active {
            background: rgba(27, 103, 178, 0.15);
            color: #64FFDA;
        }
        
        .nav-item.active::before {
            transform: scaleY(1);
        }
        
        .nav-icon {
            width: 20px;
            text-align: center;
        }
        
        /* Content Area */
        .content-area {
            flex: 1;
            padding: 30px 40px;
            overflow-y: auto;
            background: #050816;
        }
        
        .content-section {
            display: none;
            animation: fadeIn 0.5s ease-out;
        }
        
        .content-section.active {
            display: block;
        }
        
        /* Dashboard Specific */
        .dashboard-header {
            margin-bottom: 40px;
        }
        
        .dashboard-header h1 {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 10px;
            background: linear-gradient(135deg, #FFFFFF, #64FFDA);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
            margin-bottom: 40px;
        }
        
        /* Device Grid */
        .device-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .device-item {
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .device-item:hover {
            transform: translateY(-3px);
            border-color: #1B67B2;
            background: rgba(27, 103, 178, 0.1);
        }
        
        .device-icon {
            font-size: 32px;
            margin-bottom: 10px;
        }
        
        .device-name {
            font-weight: 500;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <!-- Loading Screen -->
    <div class="loading-screen" id="loadingScreen">
        <div class="loading-logo">
            <i class="fas fa-shield-alt"></i>
        </div>
        <div class="loading-text">Initializing Portnox Platform...</div>
        <div class="loading-progress">
            <div class="loading-progress-bar"></div>
        </div>
    </div>

    <!-- Header -->
    <header class="header">
        <div class="header-content">
            <div class="logo">
                <div class="logo-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div>
                    <h1 style="font-size: 24px; font-weight: 700;">Portnox Ultimate Platform</h1>
                    <p style="font-size: 14px; color: #94A3B8;">Complete TCO & NAC Solution</p>
                </div>
            </div>
            <div class="header-controls">
                <button class="btn" id="saveProgress">
                    <i class="fas fa-save"></i> Save Progress
                </button>
                <button class="btn btn-primary" id="exportReport">
                    <i class="fas fa-download"></i> Export Report
                </button>
            </div>
        </div>
    </header>

    <!-- Main Container -->
    <div class="main-container">
        <!-- Sidebar Navigation -->
        <nav class="sidebar-nav">
            <div class="nav-section">
                <div class="nav-section-title">Assessment Workflow</div>
                <a class="nav-item active" data-section="dashboard">
                    <i class="nav-icon fas fa-dashboard"></i>
                    <span>Dashboard</span>
                </a>
                <a class="nav-item" data-section="organization">
                    <i class="nav-icon fas fa-building"></i>
                    <span>Organization</span>
                </a>
                <a class="nav-item" data-section="scoping">
                    <i class="nav-icon fas fa-network-wired"></i>
                    <span>Environment Scoping</span>
                </a>
                <a class="nav-item" data-section="architecture">
                    <i class="nav-icon fas fa-project-diagram"></i>
                    <span>Architecture Design</span>
                </a>
                <a class="nav-item" data-section="workflows">
                    <i class="nav-icon fas fa-exchange-alt"></i>
                    <span>Auth Workflows</span>
                </a>
            </div>
            
            <div class="nav-section">
                <div class="nav-section-title">Analysis & Reports</div>
                <a class="nav-item" data-section="tco">
                    <i class="nav-icon fas fa-calculator"></i>
                    <span>TCO Analysis</span>
                </a>
                <a class="nav-item" data-section="roi">
                    <i class="nav-icon fas fa-chart-line"></i>
                    <span>ROI Calculator</span>
                </a>
                <a class="nav-item" data-section="compliance">
                    <i class="nav-icon fas fa-check-circle"></i>
                    <span>Compliance Mapping</span>
                </a>
                <a class="nav-item" data-section="vendors">
                    <i class="nav-icon fas fa-th"></i>
                    <span>Vendor Comparison</span>
                </a>
                <a class="nav-item" data-section="executive">
                    <i class="nav-icon fas fa-chart-pie"></i>
                    <span>Executive Summary</span>
                </a>
            </div>
            
            <div class="nav-section">
                <div class="nav-section-title">Implementation</div>
                <a class="nav-item" data-section="timeline">
                    <i class="nav-icon fas fa-calendar-alt"></i>
                    <span>Timeline</span>
                </a>
                <a class="nav-item" data-section="deployment">
                    <i class="nav-icon fas fa-rocket"></i>
                    <span>Deployment Guide</span>
                </a>
            </div>
        </nav>

        <!-- Content Area -->
        <div class="content-area">
            <!-- Dashboard Section -->
            <section class="content-section active" id="dashboard">
                <div class="dashboard-header">
                    <h1>Welcome to Portnox Ultimate Platform</h1>
                    <p class="text-secondary">Your complete one-stop shop for Zero Trust NAC assessment, design, and ROI analysis</p>
                </div>
                
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-value" data-metric="savings">$1.2M</div>
                        <div class="metric-label">Projected 3-Year Savings</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" data-metric="roi">312%</div>
                        <div class="metric-label">Return on Investment</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" data-metric="deployment">14 Days</div>
                        <div class="metric-label">Time to Deploy</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" data-metric="reduction">78%</div>
                        <div class="metric-label">Cost Reduction</div>
                    </div>
                </div>

                <button class="btn btn-primary btn-lg" id="startAssessment">
                    <i class="fas fa-play"></i> Start Complete Assessment
                </button>
            </section>

            <!-- Organization Profile -->
            <section class="content-section" id="organization">
                <h2>Organization Profile</h2>
                <p class="text-secondary mb-4">Tell us about your organization to customize recommendations</p>
                
                <div class="card">
                    <div class="grid grid-cols-2">
                        <div class="form-group">
                            <label class="form-label">Company Name</label>
                            <input type="text" class="form-control" id="companyName" placeholder="Enter company name">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Industry</label>
                            <select class="form-control" id="industry">
                                <option value="">Select industry</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="finance">Financial Services</option>
                                <option value="education">Education</option>
                                <option value="government">Government</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="retail">Retail</option>
                                <option value="technology">Technology</option>
                                <option value="energy">Energy & Utilities</option>
                                <option value="hospitality">Hospitality</option>
                                <option value="legal">Legal Services</option>
                                <option value="nonprofit">Non-Profit</option>
                                <option value="pharmaceutical">Pharmaceutical</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Number of Employees</label>
                            <input type="number" class="form-control" id="employees" placeholder="Total employees">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Number of Locations</label>
                            <input type="number" class="form-control" id="locations" placeholder="Office locations">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Compliance Requirements</label>
                        <div class="grid grid-cols-4">
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" id="compliance" value="HIPAA">
                                <span>HIPAA</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" id="compliance" value="PCI-DSS">
                                <span>PCI-DSS</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" id="compliance" value="SOC2">
                                <span>SOC 2</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" id="compliance" value="ISO27001">
                                <span>ISO 27001</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" id="compliance" value="NIST">
                                <span>NIST</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" id="compliance" value="GDPR">
                                <span>GDPR</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" id="compliance" value="CCPA">
                                <span>CCPA</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" id="compliance" value="FERPA">
                                <span>FERPA</span>
                            </label>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary mt-4" onclick="platform.navigateToSection('scoping')">
                        Next: Environment Scoping <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </section>

            <!-- Environment Scoping -->
            <section class="content-section" id="scoping">
                <h2>Environment Scoping</h2>
                <p class="text-secondary mb-4">Define your network infrastructure and device inventory</p>
                
                <div class="card">
                    <h3>Device Inventory</h3>
                    <p class="mb-3">Total Devices: <strong id="totalDevices">0</strong></p>
                    
                    <div class="device-grid">
                        <div class="device-item">
                            <div class="device-icon">💻</div>
                            <div class="device-name">Windows</div>
                            <div class="device-counter">
                                <button class="device-decrement" data-device="windows">-</button>
                                <input type="number" id="windows-count" value="0" min="0">
                                <button class="device-increment" data-device="windows">+</button>
                            </div>
                        </div>
                        
                        <div class="device-item">
                            <div class="device-icon">🖥️</div>
                            <div class="device-name">Mac</div>
                            <div class="device-counter">
                                <button class="device-decrement" data-device="mac">-</button>
                                <input type="number" id="mac-count" value="0" min="0">
                                <button class="device-increment" data-device="mac">+</button>
                            </div>
                        </div>
                        
                        <div class="device-item">
                            <div class="device-icon">🐧</div>
                            <div class="device-name">Linux</div>
                            <div class="device-counter">
                                <button class="device-decrement" data-device="linux">-</button>
                                <input type="number" id="linux-count" value="0" min="0">
                                <button class="device-increment" data-device="linux">+</button>
                            </div>
                        </div>
                        
                        <div class="device-item">
                            <div class="device-icon">📱</div>
                            <div class="device-name">Mobile</div>
                            <div class="device-counter">
                                <button class="device-decrement" data-device="mobile">-</button>
                                <input type="number" id="mobile-count" value="0" min="0">
                                <button class="device-increment" data-device="mobile">+</button>
                            </div>
                        </div>
                        
                        <div class="device-item">
                            <div class="device-icon">📡</div>
                            <div class="device-name">IoT</div>
                            <div class="device-counter">
                                <button class="device-decrement" data-device="iot">-</button>
                                <input type="number" id="iot-count" value="0" min="0">
                                <button class="device-increment" data-device="iot">+</button>
                            </div>
                        </div>
                        
                        <div class="device-item">
                            <div class="device-icon">🖨️</div>
                            <div class="device-name">Printers</div>
                            <div class="device-counter">
                                <button class="device-decrement" data-device="printers">-</button>
                                <input type="number" id="printers-count" value="0" min="0">
                                <button class="device-increment" data-device="printers">+</button>
                            </div>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary mt-4" onclick="platform.navigateToSection('tco')">
                        Next: TCO Analysis <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </section>

            <!-- TCO Analysis -->
            <section class="content-section" id="tco">
                <h2>Total Cost of Ownership Analysis</h2>
                <p class="text-secondary mb-4">Comprehensive cost comparison across all vendors</p>
                
                <div class="card">
                    <h3>3-Year TCO Comparison</h3>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Vendor</th>
                                    <th>Software Licensing</th>
                                    <th>Hardware</th>
                                    <th>Implementation</th>
                                    <th>Operations</th>
                                    <th>Total TCO</th>
                                </tr>
                            </thead>
                            <tbody id="tcoTableBody">
                                <!-- Will be populated dynamically -->
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="metrics-grid mt-4">
                    <div class="metric-card">
                        <div class="metric-value" id="totalSavings">$0</div>
                        <div class="metric-label">Total Savings vs Legacy NAC</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" id="costReduction">0%</div>
                        <div class="metric-label">Cost Reduction</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" id="costPerDevice">$0</div>
                        <div class="metric-label">Annual Cost per Device</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" id="fteSavings">0 FTE</div>
                        <div class="metric-label">Staff Savings</div>
                    </div>
                </div>
            </section>
        </div>
    </div>

    <!-- Notification -->
    <div class="notification" id="notification"></div>

    <!-- JavaScript Modules -->
    <script src="js/module-loader.js"></script>
    <script src="js/event-system.js"></script>
    <script src="js/config-manager.js"></script>
    <script src="js/vendor-database.js"></script>
    <script src="js/industry-database.js"></script>
    <script src="js/compliance-database.js"></script>
    <script src="js/platform.js"></script>
    
    <script>
        // Hide loading screen when ready
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loadingScreen').style.display = 'none';
            }, 2000);
        });
    </script>
</body>
</html>
EOF
    success "index.html created"
}

# ============================================================================
# Create Server Script
# ============================================================================
create_server_script() {
    log "Creating server script..."
    cat > server.sh << 'EOF'
#!/bin/bash

echo "🚀 Starting Portnox Ultimate Platform Server..."
echo "📡 Access the platform at: http://localhost:8080"
echo "Press Ctrl+C to stop the server"
echo

# Check if Python 3 is installed
if command -v python3 &> /dev/null; then
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    python -m http.server 8080
else
    echo "❌ Python is not installed. Please install Python to run the server."
    exit 1
fi
EOF
    
    chmod +x server.sh
    success "Server script created"
}

# ============================================================================
# Main Execution
# ============================================================================

main() {
    echo -e "${CYAN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC}     ${WHITE}Portnox Ultimate Platform - Directory Update${NC}              ${CYAN}║${NC}"
    echo -e "${CYAN}║${NC}     ${WHITE}Version: ${SCRIPT_VERSION}${NC}                                          ${CYAN}║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo
    
    log "Starting directory update process..."
    
    # Backup existing files
    backup_existing
    
    # Create directory structure
    create_directories
    
    # Create all JavaScript modules
    create_module_loader
    create_event_system
    create_config_manager
    create_vendor_database
    create_industry_database
    create_compliance_database
    create_platform_js
    
    # Create CSS
    create_platform_css
    
    # Create main HTML
    create_index_html
    
    # Create server script
    create_server_script
    
    echo
    success "Directory update complete!"
    echo
    info "Directory structure:"
    echo "  📁 js/           - JavaScript modules"
    echo "  📁 css/          - Stylesheets"
    echo "  📁 data/         - Application data"
    echo "  📁 reports/      - Generated reports"
    echo "  📄 index.html    - Main application"
    echo "  🚀 server.sh     - Development server"
    echo
    echo -e "${GREEN}Features included:${NC}"
    echo "  ✅ Fixed module loading system"
    echo "  ✅ 12+ vendor database with accurate pricing"
    echo "  ✅ 15+ industries with specific requirements"
    echo "  ✅ 13+ compliance frameworks with control mappings"
    echo "  ✅ Real-time TCO/ROI calculations"
    echo "  ✅ Interactive device inventory"
    echo "  ✅ Comprehensive reporting"
    echo "  ✅ Responsive modern UI"
    echo
    
    # Ask if user wants to start the server
    read -p "$(echo -e ${GREEN}Start the platform server now? [y/N]:${NC} )" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log "Starting server..."
        ./server.sh
    else
        echo
        info "To start the platform later:"
        echo "  1. Run: ./server.sh"
        echo "  2. Open: http://localhost:8080"
        echo
        info "Or use a different port:"
        echo "  python3 -m http.server 8081"
    fi
}

# Check dependencies
check_dependencies() {
    local missing=()
    
    # Check for Python
    if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
        missing+=("Python")
    fi
    
    # Check for web browser
    if ! command -v xdg-open &> /dev/null && ! command -v open &> /dev/null; then
        warning "No default browser command found. You'll need to manually open http://localhost:8080"
    fi
    
    if [ ${#missing[@]} -gt 0 ]; then
        error "Missing dependencies: ${missing[*]}"
        echo "Please install them before running the platform."
        exit 1
    fi
}

# Verify files created
verify_installation() {
    local required_files=(
        "index.html"
        "js/module-loader.js"
        "js/event-system.js"
        "js/config-manager.js"
        "js/vendor-database.js"
        "js/industry-database.js"
        "js/compliance-database.js"
        "js/platform.js"
        "css/platform.css"
        "server.sh"
    )
    
    local missing_files=()
    
    for file in "${required_files[@]}"; do
        if [[ ! -f "$file" ]]; then
            missing_files+=("$file")
        fi
    done
    
    if [ ${#missing_files[@]} -gt 0 ]; then
        error "Missing files after installation:"
        for file in "${missing_files[@]}"; do
            echo "  ❌ $file"
        done
        return 1
    else
        success "All files created successfully!"
        return 0
    fi
}

# Cleanup function
cleanup() {
    if [[ -d "backup_${TIMESTAMP}" ]] && [[ -z "$(ls -A backup_${TIMESTAMP})" ]]; then
        rmdir "backup_${TIMESTAMP}" 2>/dev/null
    fi
}

# Set trap for cleanup
trap cleanup EXIT

# Run main function
check_dependencies
main
verify_installation

# End of script
