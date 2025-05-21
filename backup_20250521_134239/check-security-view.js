/**
 * Security View Initialization Test Script
 * This script checks if the Security View is properly initialized
 */

// Run the test when the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Running Security View initialization test...');
    
    // Wait for other components to initialize
    setTimeout(function() {
        checkSecurityView();
    }, 1000);
});

// Check if the Security View is properly initialized
function checkSecurityView() {
    // Check if the view panel exists
    const securityPanel = document.querySelector('.view-panel[data-view="security"]');
    if (!securityPanel) {
        console.error('❌ Security view panel not found');
        return false;
    }
    console.log('✅ Security view panel found');
    
    // Check if the tab exists
    const securityTab = document.querySelector('.main-tab[data-view="security"]');
    if (!securityTab) {
        console.error('❌ Security tab not found');
        return false;
    }
    console.log('✅ Security tab found');
    
    // Check if result panels exist
    const panels = [
        'security-overview',
        'compliance-frameworks',
        'threat-analysis',
        'industry-impact'
    ];
    
    let allPanelsFound = true;
    panels.forEach(panelId => {
        const panel = document.getElementById(panelId);
        if (!panel) {
            console.error(`❌ Panel not found: ${panelId}`);
            allPanelsFound = false;
        } else {
            console.log(`✅ Panel found: ${panelId}`);
        }
    });
    
    // Check if chart containers exist
    const charts = [
        'nist-framework-chart',
        'breach-impact-chart',
        'security-frameworks-chart',
        'threat-model-chart',
        'industry-breach-chart',
        'insurance-impact-chart'
    ];
    
    let allChartsFound = true;
    charts.forEach(chartId => {
        const chart = document.getElementById(chartId);
        if (!chart) {
            console.error(`❌ Chart container not found: ${chartId}`);
            allChartsFound = false;
        } else {
            console.log(`✅ Chart container found: ${chartId}`);
        }
    });
    
    // Check if CSS is loaded
    const securityCSS = Array.from(document.styleSheets).some(sheet => {
        return sheet.href && sheet.href.includes('security-view.css');
    });
    
    if (!securityCSS) {
        console.error('❌ Security view CSS not loaded');
    } else {
        console.log('✅ Security view CSS loaded');
    }
    
    // Check if window.securityView object is defined
    if (!window.securityView) {
        console.error('❌ window.securityView object not defined');
        return false;
    }
    console.log('✅ window.securityView object defined');
    
    // Check if securityViewInitialized flag is set
    if (!window.securityViewInitialized) {
        console.error('❌ securityViewInitialized flag not set');
        // Try to initialize it
        if (typeof window.securityView.init === 'function') {
            console.log('Attempting to initialize Security View...');
            const result = window.securityView.init();
            if (result) {
                console.log('✅ Security View initialized successfully');
            } else {
                console.error('❌ Failed to initialize Security View');
            }
        }
    } else {
        console.log('✅ securityViewInitialized flag is set');
    }
    
    console.log('Security View initialization test complete');
    return allPanelsFound && allChartsFound;
}
