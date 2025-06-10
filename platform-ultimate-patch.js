// Platform Ultimate Initialization Fix
// This ensures proper module loading for all vendor comparisons and TCO calculations

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌟 DOM Ready - Initializing Ultimate Platform with services...');
    
    // Add retry mechanism for module loading
    const getModuleWithRetry = async (moduleName, maxRetries = 5) => {
        for (let i = 0; i < maxRetries; i++) {
            const module = window.ModuleLoader.get(moduleName);
            if (module) {
                return module;
            }
            
            // Wait and retry
            await new Promise(resolve => setTimeout(resolve, 100 * (i + 1)));
            console.log(`Retry ${i + 1}/${maxRetries} for ${moduleName}`);
        }
        return null;
    };
    
    try {
        // Initialize core services with retry
        const eventSystem = await getModuleWithRetry('EventSystem');
        const configManager = await getModuleWithRetry('ConfigManager');
        
        if (!eventSystem || !configManager) {
            console.error('❌ Core services could not be initialized after retries');
            
            // Fallback initialization
            console.log('🔄 Attempting fallback initialization...');
            
            // Initialize services directly if ModuleLoader fails
            if (!eventSystem && window.EventSystem) {
                window.eventSystemInstance = new EventSystem();
                console.log('✓ EventSystem initialized via fallback');
            }
            
            if (!configManager && window.ConfigManager) {
                window.configManagerInstance = new ConfigManager();
                console.log('✓ ConfigManager initialized via fallback');
            }
        } else {
            console.log('✅ Core services retrieved successfully');
            window.eventSystemInstance = eventSystem;
            window.configManagerInstance = configManager;
        }
        
        // Initialize vendor comparison modules
        const vendorModules = [
            'MasterVendorDatabase',
            'IndustryDatabase',
            'ComplianceDatabase',
            'RiskSecurityView',
            'ComplianceViewEnhanced',
            'OperationalImpact',
            'StrategicInsights'
        ];
        
        for (const moduleName of vendorModules) {
            try {
                const module = await getModuleWithRetry(moduleName, 3);
                if (module) {
                    console.log(`✅ ${moduleName} loaded successfully`);
                }
            } catch (error) {
                console.warn(`⚠️ ${moduleName} could not be loaded:`, error);
            }
        }
        
        // Initialize the platform
        if (window.initializePlatform) {
            window.initializePlatform();
        }
        
    } catch (error) {
        console.error('❌ Platform initialization error:', error);
    }
});
