/**
 * Configuration Manager
 * Centralized configuration and settings management
 */
ModuleLoader.register('ConfigManager', [], function() {
    class ConfigManager {
        constructor() {
            this.config = {
                // Application settings
                app: {
                    name: 'Portnox Total Cost Analyzer',
                    version: '4.0.0',
                    environment: 'production',
                    debug: false
                },
                
                // Default analysis parameters
                defaults: {
                    devices: 2500,
                    users: 1500,
                    locations: 5,
                    years: 3,
                    industry: 'technology',
                    currency: 'USD',
                    locale: 'en-US'
                },
                
                // API endpoints (if needed)
                api: {
                    baseUrl: '',
                    timeout: 30000
                },
                
                // Feature flags
                features: {
                    advancedAnalytics: true,
                    exportPDF: true,
                    exportPPT: true,
                    exportExcel: true,
                    aiInsights: true,
                    collaboration: false
                },
                
                // Theme settings
                theme: {
                    mode: 'light',
                    primaryColor: '#00D4AA',
                    accentColor: '#FF6B35'
                }
            };
            
            this.listeners = new Map();
            this.loadSavedConfig();
        }

        // Get configuration value
        get(path, defaultValue = null) {
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

        // Set configuration value
        set(path, value) {
            const keys = path.split('.');
            const lastKey = keys.pop();
            let target = this.config;
            
            for (const key of keys) {
                if (!(key in target) || typeof target[key] !== 'object') {
                    target[key] = {};
                }
                target = target[key];
            }
            
            const oldValue = target[lastKey];
            target[lastKey] = value;
            
            // Notify listeners
            this.notifyListeners(path, value, oldValue);
            
            // Save to localStorage
            this.saveConfig();
        }

        // Add configuration listener
        on(path, callback) {
            if (!this.listeners.has(path)) {
                this.listeners.set(path, new Set());
            }
            this.listeners.get(path).add(callback);
        }

        // Remove configuration listener
        off(path, callback) {
            const callbacks = this.listeners.get(path);
            if (callbacks) {
                callbacks.delete(callback);
            }
        }

        // Notify listeners of changes
        notifyListeners(path, newValue, oldValue) {
            // Notify exact path listeners
            const callbacks = this.listeners.get(path);
            if (callbacks) {
                callbacks.forEach(cb => cb(newValue, oldValue, path));
            }
            
            // Notify parent path listeners
            const parts = path.split('.');
            for (let i = parts.length - 1; i > 0; i--) {
                const parentPath = parts.slice(0, i).join('.');
                const parentCallbacks = this.listeners.get(parentPath);
                if (parentCallbacks) {
                    parentCallbacks.forEach(cb => cb(this.get(parentPath), null, parentPath));
                }
            }
        }

        // Save configuration to localStorage
        saveConfig() {
            try {
                localStorage.setItem('portnox-tco-config', JSON.stringify(this.config));
            } catch (error) {
                console.error('Failed to save configuration:', error);
            }
        }

        // Load saved configuration
        loadSavedConfig() {
            try {
                const saved = localStorage.getItem('portnox-tco-config');
                if (saved) {
                    const savedConfig = JSON.parse(saved);
                    this.config = this.mergeConfig(this.config, savedConfig);
                }
            } catch (error) {
                console.error('Failed to load saved configuration:', error);
            }
        }

        // Merge configurations
        mergeConfig(target, source) {
            const result = { ...target };
            
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                        result[key] = this.mergeConfig(target[key] || {}, source[key]);
                    } else {
                        result[key] = source[key];
                    }
                }
            }
            
            return result;
        }

        // Reset to defaults
        reset() {
            this.config = this.getDefaultConfig();
            this.saveConfig();
            this.notifyListeners('', this.config, null);
        }

        // Get default configuration
        getDefaultConfig() {
            return JSON.parse(JSON.stringify(this.config));
        }
    }
    
    return new ConfigManager();
});
