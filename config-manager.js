// Config Manager Module
(function() {
    'use strict';
    
    const ConfigManager = {
        config: {
            appName: 'Portnox Total Cost Analyzer',
            version: '2.0.0',
            environment: 'production',
            features: {
                vendorComparison: true,
                complianceMapping: true,
                executiveDashboard: true,
                aiInsights: true
            }
        },
        
        get(key) {
            const keys = key.split('.');
            let value = this.config;
            
            for (const k of keys) {
                value = value[k];
                if (value === undefined) break;
            }
            
            return value;
        },
        
        set(key, value) {
            const keys = key.split('.');
            let obj = this.config;
            
            for (let i = 0; i < keys.length - 1; i++) {
                const k = keys[i];
                if (!obj[k]) obj[k] = {};
                obj = obj[k];
            }
            
            obj[keys[keys.length - 1]] = value;
        }
    };
    
    // Register with ModuleLoader
    if (window.ModuleLoader && window.ModuleLoader.register) {
        window.ModuleLoader.register('ConfigManager', () => ConfigManager);
    }
    
    window.ConfigManager = ConfigManager;
})();
