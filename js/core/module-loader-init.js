/**
 * Module Loader Initialization
 * Ensures all modules are properly loaded in the correct order
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Module Loader System...');
    
    // Ensure Highcharts is loaded
    if (typeof Highcharts === 'undefined') {
        console.error('❌ Highcharts is required but not loaded!');
        // Load Highcharts from CDN
        const script = document.createElement('script');
        script.src = 'https://code.highcharts.com/highcharts.js';
        script.onload = function() {
            console.log('✅ Highcharts loaded successfully');
            initializeApplication();
        };
        document.head.appendChild(script);
    } else {
        initializeApplication();
    }
    
    function initializeApplication() {
        // Load comprehensive vendor database
        if (!window.ComprehensiveVendorDatabase && window.VendorDatabase) {
            window.ComprehensiveVendorDatabase = window.VendorDatabase;
        }
        
        // Load module files in sequence
        const moduleFiles = [
            '/js/core/config-manager.js',
            '/js/core/event-system.js',
            // Added data files:
            'js/data/comprehensive-vendor-database.js',
            'js/data/vendor-data-fixes.js',
            'js/data/industry-database.js',
            'js/data/compliance-database.js',
            'js/data/compliance-nac-mapping.js',
            'js/data/risk-security-database.js',
            // Existing vendor-data-manager, ensured it's after the above:
            '/js/data/vendor-data-manager.js',
            '/js/core/ui-manager.js',
            'js/core/platform-enhanced.js',
            'js/views/dashboard-view.js', // Added dashboard view
            'js/views/vendor-selection-view.js', // Added vendor selection view
            'js/views/executive-summary-view.js', // Added executive summary view
            'js/views/financial-analysis-view.js', // Added financial analysis view
            'js/views/risk-security-view.js', // Added new risk and security view
            // '/js/views/risk-security-init.js', // Removed as RiskSecurityView from risk-security-view.js is used directly
            'js/views/compliance-view-enhanced.js', // Added new compliance view
            '/js/views/operational-impact.js',
            '/js/views/strategic-insights.js',
            '/js/modules/ui-integration.js'
        ];
        
        // Convert standalone modules to ModuleLoader format
        window.addEventListener('load', function() {
            // Register analysis modules
            // RiskSecurityAnalysis module (from deleted js/views/risk-security-init.js) registration removed.
            // if (window.RiskSecurityAnalysis) {
            //     ModuleLoader.register('RiskSecurityAnalysis', [], function() {
            //         return window.RiskSecurityAnalysis;
            //     });
            // }
            // ComplianceAnalysis module (from deleted js/views/compliance-analysis.js) registration removed.
            if (window.OperationalImpact) {
                ModuleLoader.register('OperationalImpact', [], function() {
                    return window.OperationalImpact;
                });
            }
            if (window.StrategicInsights) {
                ModuleLoader.register('StrategicInsights', [], function() {
                    return window.StrategicInsights;
                });
            }
            
            // Load UI Integration after all modules are registered
            setTimeout(() => {
                ModuleLoader.load('UIIntegration').then(UIIntegration => {
                    const integration = new UIIntegration();
                    integration.init();
                    console.log('✅ Platform fully initialized');
                }).catch(error => {
                    console.error('❌ Failed to load UI Integration:', error);
                });
            }, 500);
        });
        
        // Load module files
        loadModuleFiles(moduleFiles);
    }
    
    function loadModuleFiles(files) {
        files.forEach(file => {
            const script = document.createElement('script');
            script.src = file;
            script.onerror = function() {
                console.warn(`⚠️ Failed to load ${file}, trying alternate path...`);
                // Try without leading slash
                script.src = file.substring(1);
            };
            document.body.appendChild(script);
        });
    }
});
