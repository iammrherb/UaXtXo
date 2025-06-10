// Configuration Manager Module
class ConfigManager {
    constructor() {
        this.config = {
            vendors: {
                portnox: {
                    name: 'Portnox',
                    type: 'Cloud-Native',
                    costPerDevice: 36,
                    deploymentDays: 14,
                    fteRequired: 0.25
                },
                cisco: {
                    name: 'Cisco ISE',
                    type: 'Legacy',
                    costPerDevice: 125,
                    hardware: 75000,
                    deploymentDays: 90,
                    fteRequired: 2.0
                }
            },
            compliance: ['HIPAA', 'PCI-DSS', 'SOC2', 'ISO27001', 'NIST'],
            industries: ['Healthcare', 'Finance', 'Education', 'Government']
        };
        console.log('[ConfigManager] Initialized with default config');
    }
    
    get(path) {
        const keys = path.split('.');
        let value = this.config;
        for (const key of keys) {
            value = value[key];
            if (value === undefined) break;
        }
        return value;
    }
    
    set(path, value) {
        const keys = path.split('.');
        let obj = this.config;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!obj[keys[i]]) obj[keys[i]] = {};
            obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = value;
    }
    
    getAll() {
        return { ...this.config };
    }
}

// Register with ModuleLoader
ModuleLoader.register('ConfigManager', ConfigManager);
