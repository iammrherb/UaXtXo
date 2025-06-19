// Master Loader - Ensures proper loading sequence
(function() {
    console.log('🚀 Master Loader starting...');
    
    const scripts = [
        // Core infrastructure
        { src: 'js/module-loader.js', name: 'ModuleLoader' },
        
        // Data modules
        { src: 'js/vendor-data-complete.js', name: 'VendorData' },
        { src: 'js/compliance-database.js', name: 'ComplianceDB' },
        { src: 'js/complete-industry-compliance-fixed.js', name: 'IndustryCompliance' },
        
        // Feature modules
        { src: 'js/executive-dashboard.js', name: 'ExecutiveDashboard' },
        { src: 'js/financial-analysis.js', name: 'FinancialAnalysis' },
        { src: 'js/feature-matrix.js', name: 'FeatureMatrix' },
        { src: 'js/risk-compliance.js', name: 'RiskCompliance' },
        
        // UI modules
        { src: 'js/advanced-controls.js', name: 'AdvancedControls' },
        { src: 'js/advanced-charts-fixed.js', name: 'AdvancedCharts' },
        
        // Platform
        { src: 'js/platform-fixed.js', name: 'Platform' },
        { src: 'js/platform-init-fixed.js', name: 'PlatformInit' }
    ];
    
    let loadIndex = 0;
    
    function loadNextScript() {
        if (loadIndex >= scripts.length) {
            console.log('✅ All scripts loaded!');
            return;
        }
        
        const scriptInfo = scripts[loadIndex];
        const script = document.createElement('script');
        script.src = scriptInfo.src;
        
        script.onload = () => {
            console.log(`✅ Loaded: ${scriptInfo.name}`);
            loadIndex++;
            // Small delay to ensure execution
            setTimeout(loadNextScript, 50);
        };
        
        script.onerror = () => {
            console.error(`❌ Failed to load: ${scriptInfo.name}`);
            loadIndex++;
            loadNextScript();
        };
        
        document.head.appendChild(script);
    }
    
    // Start loading
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNextScript);
    } else {
        loadNextScript();
    }
})();
