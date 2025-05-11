// Wizard initialization fix - ensure steps are defined before use
(function() {
    // Define default wizard steps
    const defaultSteps = [
        { id: 'vendor-selection', title: 'Select Vendor', icon: 'fa-server' },
        { id: 'industry', title: 'Industry & Compliance', icon: 'fa-building' },
        { id: 'organization', title: 'Organization Details', icon: 'fa-sitemap' },
        { id: 'cost-configuration', title: 'Cost Configuration', icon: 'fa-calculator' },
        { id: 'results', title: 'Results & Analysis', icon: 'fa-chart-line' }
    ];

    // Patch the wizard to ensure steps are available
    const originalInit = window.WizardManager ? window.WizardManager.prototype.init : null;
    
    if (window.WizardManager) {
        window.WizardManager.prototype.init = function() {
            // Ensure steps are defined
            if (!this.steps) {
                this.steps = defaultSteps;
            }
            
            // Call original init if it exists
            if (originalInit) {
                originalInit.call(this);
            }
        };
    }

    // Also patch TCOWizard if it exists
    if (window.TCOWizard) {
        const originalTCOInit = window.TCOWizard.init;
        window.TCOWizard.init = function() {
            // Ensure steps are defined for TCOWizard
            if (!window.TCOWizard.steps) {
                window.TCOWizard.steps = defaultSteps;
            }
            
            if (originalTCOInit) {
                originalTCOInit.call(this);
            }
        };
    }
})();
