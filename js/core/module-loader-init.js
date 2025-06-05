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
            '/js/modules/premium-executive-platform.js',
            '/js/views/risk-security-init.js',
            '/js/views/compliance-analysis.js',
            '/js/views/operational-impact.js',
            '/js/views/strategic-insights.js',
            '/js/modules/ui-integration.js'
        ];
        
        // Convert standalone modules to ModuleLoader format
        window.addEventListener('load', function() {
            // Register analysis modules
            if (window.RiskSecurityAnalysis) {
                ModuleLoader.register('RiskSecurityAnalysis', [], function() {
                    return window.RiskSecurityAnalysis;
                });
            }
            if (window.ComplianceAnalysis) {
                ModuleLoader.register('ComplianceAnalysis', [], function() {
                    return window.ComplianceAnalysis;
                });
            }
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
