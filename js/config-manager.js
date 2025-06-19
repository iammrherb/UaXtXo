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
