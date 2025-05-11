// Initialize dashboard by default
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing dashboard by default...');
    
    // Show dashboard content
    const dashboardContent = document.getElementById('dashboard-content');
    if (dashboardContent) {
        dashboardContent.style.display = 'block';
    }
    
    // Hide wizard modal initially
    const wizardModal = document.getElementById('tco-wizard-modal');
    if (wizardModal) {
        wizardModal.classList.add('hidden');
    }
    
    // Initialize default dashboard data
    if (window.Calculator) {
        // Set default calculation parameters
        const defaultParams = {
            deviceCount: 1000,
            industry: 'technology',
            yearsToProject: 3,
            currentVendor: 'none',
            comparisonVendors: ['portnox', 'cisco', 'aruba']
        };
        
        // Update calculator state
        if (window.Calculator.updateState) {
            window.Calculator.updateState(defaultParams);
        }
        
        // Trigger initial calculation
        if (window.Calculator.calculateTCO) {
            window.Calculator.calculateTCO();
        }
    }
    
    // Setup wizard launch buttons
    const launchWizardBtn = document.getElementById('launch-wizard');
    const openWizardBtn = document.getElementById('open-wizard-btn');
    
    if (launchWizardBtn) {
        launchWizardBtn.addEventListener('click', function() {
            if (window.TCOWizard && window.TCOWizard.openWizard) {
                window.TCOWizard.openWizard();
            } else if (window.WizardManager && window.WizardManager.openWizard) {
                window.WizardManager.openWizard();
            }
        });
    }
    
    if (openWizardBtn) {
        openWizardBtn.addEventListener('click', function() {
            if (window.TCOWizard && window.TCOWizard.openWizard) {
                window.TCOWizard.openWizard();
            } else if (window.WizardManager && window.WizardManager.openWizard) {
                window.WizardManager.openWizard();
            }
        });
    }
    
    // Setup skip to dashboard button
    const skipToDashboardBtn = document.getElementById('skip-to-dashboard');
    if (skipToDashboardBtn) {
        skipToDashboardBtn.addEventListener('click', function() {
            // Hide wizard if open
            if (wizardModal) {
                wizardModal.classList.add('hidden');
            }
            
            // Show dashboard
            if (dashboardContent) {
                dashboardContent.style.display = 'block';
                dashboardContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
