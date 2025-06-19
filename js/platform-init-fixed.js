// Platform Initialization with Proper Error Handling
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Portnox TCO Analyzer Platform...');
    
    // Initialize global platform object
    window.platform = window.platform || {};
    
    // Ensure all dependencies are loaded
    const requiredModules = [
        'VendorDataComplete',
        'ComplianceDatabase',
        'RiskInsuranceDatabase',
        'ExecutiveDashboard',
        'FinancialAnalysis',
        'FeatureMatrix',
        'ChartManager'
    ];
    
    let allModulesLoaded = true;
    requiredModules.forEach(module => {
        if (!window[module]) {
            console.error(`❌ Required module ${module} not loaded`);
            allModulesLoaded = false;
        }
    });
    
    if (!allModulesLoaded) {
        console.error('❌ Some modules failed to load. Please check console for errors.');
        return;
    }
    
    // Initialize platform with error handling
    try {
        // Destroy any existing charts
        if (window.ChartManager) {
            window.ChartManager.destroyAllCharts();
        }
        
        // Initialize main platform controller
        if (window.PlatformController) {
            window.platform = new PlatformController();
            window.platform.init();
        }
        
        // Initialize tabs
        initializeTabs();
        
        // Initialize vendor selection
        initializeVendorSelection();
        
        // Calculate initial results
        if (window.platform && window.platform.calculate) {
            window.platform.calculate();
        }
        
        console.log('✅ Platform initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing platform:', error);
    }
});

function initializeTabs() {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            // Update active states
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const targetContent = document.getElementById(target);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Destroy existing charts when switching tabs
            if (window.ChartManager) {
                window.ChartManager.destroyAllCharts();
            }
            
            // Render content for active tab
            switch(target) {
                case 'executive':
                    if (window.executiveDashboard) {
                        window.executiveDashboard.render();
                    }
                    break;
                case 'financial':
                    if (window.financialAnalysis) {
                        window.financialAnalysis.render();
                    }
                    break;
                case 'features':
                    if (window.featureMatrix) {
                        window.featureMatrix.render();
                    }
                    break;
                case 'compliance':
                    if (window.riskCompliance) {
                        window.riskCompliance.render();
                    }
                    break;
            }
        });
    });
}

function initializeVendorSelection() {
    const vendorCheckboxes = document.querySelectorAll('.vendor-checkbox');
    
    vendorCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (window.platform && window.platform.calculate) {
                window.platform.calculate();
            }
        });
    });
}
