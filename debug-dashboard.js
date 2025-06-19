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
