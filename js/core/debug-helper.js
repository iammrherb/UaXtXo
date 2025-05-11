/**
 * Debug Helper for NAC TCO Analyzer
 */
window.NACDebug = {
    // Show current wizard state
    showWizardState: function() {
        if (typeof TCOWizard !== 'undefined') {
            console.log('TCO Wizard State:', {
                currentStep: TCOWizard.currentStep,
                totalSteps: TCOWizard.totalSteps,
                wizardData: TCOWizard.wizardData
            });
        } else {
            console.error('TCO Wizard not found');
        }
    },
    
    // Show dashboard state
    showDashboardState: function() {
        if (typeof DashboardIntegration !== 'undefined') {
            console.log('Dashboard State:', {
                visible: document.getElementById('dashboard-content')?.style.display !== 'none',
                wizardData: DashboardIntegration.wizardData
            });
        } else {
            console.error('Dashboard Integration not found');
        }
    },
    
    // Test logo loading
    testLogoLoading: function(vendorId) {
        if (typeof LogoLoader !== 'undefined') {
            const testImg = document.createElement('img');
            document.body.appendChild(testImg);
            LogoLoader.loadVendorLogo(vendorId, testImg);
            setTimeout(() => {
                console.log(`Logo test for ${vendorId}:`, testImg.src);
                document.body.removeChild(testImg);
            }, 1000);
        } else {
            console.error('Logo Loader not found');
        }
    },
    
    // Simulate wizard completion
    simulateWizardComplete: function() {
        const mockData = {
            config: {
                vendors: ['portnox', 'cisco'],
                deviceCount: 1000,
                analysisYears: 3
            },
            calculations: {
                totalSavings: 150000,
                roiPercentage: 245,
                paybackMonths: 8
            },
            vendors: [
                { id: 'portnox', name: 'Portnox Cloud', type: 'Cloud-Native', logo: 'portnox-logo.png' },
                { id: 'cisco', name: 'Cisco ISE', type: 'On-Premises', logo: 'cisco-logo.png' }
            ]
        };
        
        const event = new CustomEvent('tco-wizard-complete', { detail: mockData });
        document.dispatchEvent(event);
        console.log('Simulated wizard completion with mock data');
    },
    
    // List all registered modules
    listModules: function() {
        if (window.NACAnalyzer && window.NACAnalyzer.modules) {
            console.log('Registered Modules:', Object.keys(window.NACAnalyzer.modules));
        } else {
            console.error('Module system not found');
        }
    }
};

console.log('Debug helper loaded. Use window.NACDebug for debugging functions.');
