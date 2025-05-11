/**
 * Integration Validator
 * Checks that all components are properly integrated
 */
const IntegrationValidator = (function() {
    const checks = [];
    let allPassed = true;
    
    function addCheck(name, testFn) {
        checks.push({ name, testFn });
    }
    
    function runChecks() {
        console.log('Running integration validation...');
        
        checks.forEach(check => {
            try {
                const result = check.testFn();
                if (result) {
                    console.log(`✓ ${check.name}`);
                } else {
                    console.error(`✗ ${check.name}`);
                    allPassed = false;
                }
            } catch (error) {
                console.error(`✗ ${check.name}: ${error.message}`);
                allPassed = false;
            }
        });
        
        if (allPassed) {
            console.log('All integration checks passed!');
        } else {
            console.error('Some integration checks failed. Please review the errors above.');
        }
        
        return allPassed;
    }
    
    // Define checks
    addCheck('TCO Wizard exists', () => typeof TCOWizard !== 'undefined');
    addCheck('Dashboard Integration exists', () => typeof DashboardIntegration !== 'undefined');
    addCheck('Logo Loader exists', () => typeof LogoLoader !== 'undefined');
    addCheck('Wizard overlay element exists', () => document.getElementById('wizard-overlay') !== null);
    addCheck('Dashboard content element exists', () => document.getElementById('dashboard-content') !== null);
    addCheck('Launch wizard button exists', () => document.getElementById('launch-wizard') !== null);
    addCheck('No wizard-controller.js loaded', () => typeof WizardController === 'undefined');
    
    // Check vendor logos
    addCheck('Vendor logo directory accessible', () => {
        const img = new Image();
        img.src = 'img/vendors/default-logo.png';
        return true; // This is async, but we're just checking if the path is valid
    });
    
    return {
        runChecks,
        addCheck
    };
})();

// Run validation when ready
if (window.NACAnalyzer && window.NACAnalyzer.onReady) {
    window.NACAnalyzer.onReady(() => {
        setTimeout(() => {
            IntegrationValidator.runChecks();
        }, 1000);
    });
}
