// Configuration Manager Module
(function() {
    'use strict';
    
    class ConfigManager {
        constructor() {
            this.config = new Map();
            this.defaults = new Map();
            this.validators = new Map();
            this.listeners = new Map();
            
            this.setupDefaults();
        }
        
        initialize() {
            console.log('[ConfigManager] Initializing...');
            this.loadStoredConfig();
            return Promise.resolve();
        }
        
        setupDefaults() {
            // Application defaults
            this.setDefault('app.name', 'Portnox Total Cost Analyzer');
            this.setDefault('app.version', '2.0.0');
            this.setDefault('app.environment', 'production');
            
            // Feature flags
            this.setDefault('features.animations', true);
            this.setDefault('features.advancedAnalytics', true);
            this.setDefault('features.exportReports', true);
            this.setDefault('features.realTimeUpdates', true);
            
            // API configuration
            this.setDefault('api.timeout', 30000);
            this.setDefault('api.retryAttempts', 3);
            this.setDefault('api.baseUrl', '/api');
            
            // UI configuration
            this.setDefault('ui.theme', 'light');
            this.setDefault('ui.density', 'comfortable');
            this.setDefault('ui.animations', true);
            
            // Analysis defaults
            this.setDefault('analysis.defaultDeviceCount', 1000);
            this.setDefault('analysis.defaultYears', 3);
            this.setDefault('analysis.currency', 'USD');
            
            console.log('[ConfigManager] ✓ Defaults configured');
        }
        
        setDefault(key, value) {
            this.defaults.set(key, value);
            if (!this.config.has(key)) {
                this.config.set(key, value);
            }
        }
        
        get(key, defaultValue = null) {
            if (this.config.has(key)) {
                return this.config.get(key);
            }
            return defaultValue !== null ? defaultValue : this.defaults.get(key);
        }
        
        set(key, value) {
            const oldValue = this.config.get(key);
            
            // Validate if validator exists
            if (this.validators.has(key)) {
                const validator = this.validators.get(key);
                if (!validator(value)) {
                    console.error(`[ConfigManager] Invalid value for ${key}:`, value);
                    return false;
                }
            }
            
            this.config.set(key, value);
            this.saveConfig();
            
            // Notify listeners
            this.notifyListeners(key, value, oldValue);
            
            return true;
        }
        
        addValidator(key, validator) {
            this.validators.set(key, validator);
        }
        
        onChange(key, callback) {
            if (!this.listeners.has(key)) {
                this.listeners.set(key, []);
            }
            
            this.listeners.get(key).push(callback);
            
            return () => {
                const callbacks = this.listeners.get(key);
                const index = callbacks.indexOf(callback);
                if (index !== -1) {
                    callbacks.splice(index, 1);
                }
            };
        }
        
        notifyListeners(key, newValue, oldValue) {
            if (this.listeners.has(key)) {
                this.listeners.get(key).forEach(callback => {
                    try {
                        callback(newValue, oldValue, key);
                    } catch (error) {
                        console.error(`[ConfigManager] Error in listener for ${key}:`, error);
                    }
                });
            }
            
            // Notify wildcard listeners
            const wildcardKey = key.split('.')[0] + '.*';
            if (this.listeners.has(wildcardKey)) {
                this.listeners.get(wildcardKey).forEach(callback => {
                    try {
                        callback(newValue, oldValue, key);
                    } catch (error) {
                        console.error(`[ConfigManager] Error in wildcard listener:`, error);
                    }
                });
            }
        }
        
        loadStoredConfig() {
            try {
                const stored = localStorage.getItem('portnox_config');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    Object.entries(parsed).forEach(([key, value]) => {
                        this.config.set(key, value);
                    });
                    console.log('[ConfigManager] ✓ Loaded stored configuration');
                }
            } catch (error) {
                console.error('[ConfigManager] Error loading stored config:', error);
            }
        }
        
        saveConfig() {
            try {
                const configObj = {};
                this.config.forEach((value, key) => {
                    configObj[key] = value;
                });
                localStorage.setItem('portnox_config', JSON.stringify(configObj));
            } catch (error) {
                console.error('[ConfigManager] Error saving config:', error);
            }
        }
        
        reset(key = null) {
            if (key) {
                if (this.defaults.has(key)) {
                    this.set(key, this.defaults.get(key));
                } else {
                    this.config.delete(key);
                }
            } else {
                this.config.clear();
                this.defaults.forEach((value, key) => {
                    this.config.set(key, value);
                });
                this.saveConfig();
            }
        }
        
        export() {
            const configObj = {};
            this.config.forEach((value, key) => {
                configObj[key] = value;
            });
            return configObj;
        }
        
        import(configObj) {
            Object.entries(configObj).forEach(([key, value]) => {
                this.set(key, value);
            });
        }
    }
    
    // Create instance and register
    const configManager = new ConfigManager();
    
    if (window.ModuleLoader && window.ModuleLoader.register) {
        window.ModuleLoader.register('ConfigManager', configManager);
        console.log('[ConfigManager] ✓ Registered with ModuleLoader');
    } else {
        console.error('[ConfigManager] ModuleLoader not available');
    }
    
    // Also expose globally
    window.ConfigManager = configManager;
})();
