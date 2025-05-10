// Total Cost Analyzer - Main Application
document.addEventListener('DOMContentLoaded', () => {
    console.log('💰 Initializing Total Cost Analyzer...');
    
    // Initialize Wizard Manager
    if (window.wizardManager) {
        console.log('✓ Wizard Manager initialized');
    }
    
    // Initialize Chart Manager
    if (window.chartManager) {
        console.log('✓ Chart Manager initialized');
    }
    
    // Initialize navigation tabs
    initializeNavigation();
    
    // Open wizard by default
    setTimeout(() => {
        if (window.wizardManager) {
            window.wizardManager.openWizard();
        }
    }, 100);
    
    console.log('✅ Total Cost Analyzer ready');
});

// Initialize navigation tabs
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.analysis-section');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            // Update tab states
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update section visibility
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${tabName}-analysis`) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// Export report functionality
const exportBtn = document.getElementById('export-report');
if (exportBtn) {
    exportBtn.addEventListener('click', () => {
        alert('Export functionality will be implemented here');
    });
}

// Help functionality
const helpBtn = document.getElementById('help-btn');
if (helpBtn) {
    helpBtn.addEventListener('click', () => {
        alert('Help documentation will be available here');
    });
}
