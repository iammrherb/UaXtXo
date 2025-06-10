// Platform Ultimate Module Retrieval Fix
// This fix ensures proper module retrieval for the Portnox TCO Analyzer

// Replace the problematic initialization section in platform-ultimate.js
// Look for the DOMContentLoaded event handler around line 1137

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌟 DOM Ready - Initializing Ultimate Platform with services...');
    
    // Function to safely get module instance
    const getModuleInstance = (moduleName) => {
        try {
            // First, check if ModuleLoader exists and has the get method
            if (window.ModuleLoader && typeof window.ModuleLoader.get === 'function') {
                const instance = window.ModuleLoader.get(moduleName);
                if (instance) {
                    console.log(`✅ ${moduleName} retrieved from ModuleLoader`);
                    return instance;
                }
            }
            
            // Fallback: Check if the module class exists globally
            if (window[moduleName]) {
                console.log(`🔄 ${moduleName} found globally, creating instance...`);
                const instance = new window[moduleName]();
                // Store for future reference
                if (window.ModuleLoader && typeof window.ModuleLoader.initialized === 'object') {
                    window.ModuleLoader.initialized.set(moduleName, instance);
                }
                return instance;
            }
            
            console.error(`❌ ${moduleName} not found`);
            return null;
        } catch (error) {
            console.error(`❌ Error getting ${moduleName}:`, error);
            return null;
        }
    };
    
    // Initialize core services
    let eventSystem = null;
    let configManager = null;
    
    // Try multiple approaches to get the services
    try {
        // Approach 1: Direct module retrieval
        eventSystem = getModuleInstance('EventSystem');
        configManager = getModuleInstance('ConfigManager');
        
        // Approach 2: If ModuleLoader failed, create instances directly
        if (!eventSystem || !configManager) {
            console.log('🔄 Attempting direct initialization...');
            
            // Initialize EventSystem
            if (!eventSystem && window.EventSystem) {
                eventSystem = new window.EventSystem();
                console.log('✅ EventSystem initialized directly');
            }
            
            // Initialize ConfigManager
            if (!configManager && window.ConfigManager) {
                configManager = new window.ConfigManager();
                console.log('✅ ConfigManager initialized directly');
            }
        }
        
        // Verify initialization
        if (eventSystem && configManager) {
            console.log('✅ Core services initialized successfully');
            
            // Store globally for other modules
            window.eventSystemInstance = eventSystem;
            window.configManagerInstance = configManager;
            
            // Initialize the platform with vendor data
            initializePlatformWithVendorData(eventSystem, configManager);
        } else {
            throw new Error('Core services could not be initialized');
        }
        
    } catch (error) {
        console.error('❌ Platform initialization failed:', error);
        
        // Ultimate fallback - create minimal services
        console.log('🚨 Activating emergency fallback mode...');
        createFallbackServices();
    }
});

// Function to initialize platform with comprehensive vendor data
function initializePlatformWithVendorData(eventSystem, configManager) {
    console.log('🚀 Initializing platform with vendor comparison data...');
    
    // Comprehensive vendor configuration for TCO analysis
    const vendorConfig = {
        vendors: {
            portnox: {
                name: 'Portnox',
                category: 'Cloud-Native Zero Trust NAC',
                advantages: {
                    tco: {
                        reduction: '67%',
                        factors: ['No hardware', 'Reduced FTE', 'Automated operations']
                    },
                    deployment: {
                        time: '1-2 days',
                        complexity: 'Low',
                        professionalServices: 'Not required'
                    },
                    scalability: {
                        model: 'Linear subscription',
                        limits: 'Unlimited',
                        multiTenant: true
                    }
                }
            },
            legacyNAC: {
                'Cisco ISE': {
                    category: 'Traditional NAC',
                    tcoCost: 'High',
                    deploymentTime: '3-6 months',
                    hardwareRequired: true,
                    annualMaintenance: '20% of license cost'
                },
                'Aruba ClearPass': {
                    category: 'Traditional NAC',
                    tcoCost: 'High',
                    deploymentTime: '2-4 months',
                    hardwareRequired: true,
                    annualMaintenance: '18% of license cost'
                },
                'Forescout': {
                    category: 'Agentless NAC',
                    tcoCost: 'Medium-High',
                    deploymentTime: '1-3 months',
                    hardwareRequired: true,
                    annualMaintenance: '20% of license cost'
                },
                'Fortinet': {
                    category: 'Security-Focused NAC',
                    tcoCost: 'Medium',
                    deploymentTime: '1-2 months',
                    hardwareRequired: true,
                    annualMaintenance: '15% of license cost'
                }
            },
            cloudCompetitors: {
                'Foxpass': {
                    category: 'Cloud RADIUS',
                    tcoCost: 'Low-Medium',
                    deploymentTime: '1-2 weeks',
                    limitations: ['RADIUS only', 'Limited visibility']
                },
                'SecureW2': {
                    category: 'Cloud RADIUS/PKI',
                    tcoCost: 'Medium',
                    deploymentTime: '2-4 weeks',
                    limitations: ['Certificate-focused', 'Limited NAC features']
                }
            }
        },
        complianceFrameworks: {
            'SOC2': {
                nacControls: ['Access Control', 'Monitoring', 'Incident Response'],
                portnoxAdvantage: 'Automated compliance reporting'
            },
            'ISO27001': {
                nacControls: ['A.9.1.2', 'A.13.1.1', 'A.12.4.1'],
                portnoxAdvantage: 'Continuous compliance monitoring'
            },
            'HIPAA': {
                nacControls: ['164.312(a)', '164.312(d)', '164.308(a)(6)'],
                portnoxAdvantage: 'Built-in healthcare compliance templates'
            },
            'PCI-DSS': {
                nacControls: ['1.1.4', '1.2.1', '8.1-8.3'],
                portnoxAdvantage: 'Network segmentation automation'
            },
            'NIST': {
                nacControls: ['AC-2', 'AC-3', 'IA-2', 'CA-7'],
                portnoxAdvantage: 'Zero Trust architecture alignment'
            }
        },
        executiveMetrics: {
            roi: {
                portnox: '287% over 3 years',
                breakeven: '7 months',
                savingsAreas: ['Hardware elimination', 'FTE reduction', 'Incident prevention']
            },
            riskReduction: {
                breachRisk: '-73%',
                complianceFines: '-89%',
                insurancePremiums: '-15-25%'
            },
            operationalEfficiency: {
                automationRate: '85%',
                mttrReduction: '68%',
                adminTimeeSaved: '32 hours/week'
            }
        }
    };
    
    // Store configuration
    if (configManager && typeof configManager.set === 'function') {
        configManager.set('vendorConfig', vendorConfig);
        console.log('✅ Vendor configuration stored');
    }
    
    // Emit initialization event
    if (eventSystem && typeof eventSystem.emit === 'function') {
        eventSystem.emit('platform:initialized', { vendorConfig });
        console.log('✅ Platform initialization event emitted');
    }
    
    // Initialize UI if available
    if (typeof window.initializePlatformUI === 'function') {
        window.initializePlatformUI();
        console.log('✅ Platform UI initialized');
    }
}

// Emergency fallback function
function createFallbackServices() {
    // Create minimal EventSystem
    if (!window.eventSystemInstance) {
        window.eventSystemInstance = {
            events: {},
            emit: function(event, data) {
                console.log(`[Fallback EventSystem] Event: ${event}`, data);
                if (this.events[event]) {
                    this.events[event].forEach(callback => callback(data));
                }
            },
            on: function(event, callback) {
                if (!this.events[event]) this.events[event] = [];
                this.events[event].push(callback);
            }
        };
        console.log('✅ Fallback EventSystem created');
    }
    
    // Create minimal ConfigManager
    if (!window.configManagerInstance) {
        window.configManagerInstance = {
            config: {},
            set: function(key, value) {
                this.config[key] = value;
                console.log(`[Fallback ConfigManager] Set: ${key}`);
            },
            get: function(key) {
                return this.config[key];
            }
        };
        console.log('✅ Fallback ConfigManager created');
    }
    
    // Continue with initialization
    initializePlatformWithVendorData(
        window.eventSystemInstance,
        window.configManagerInstance
    );
}
