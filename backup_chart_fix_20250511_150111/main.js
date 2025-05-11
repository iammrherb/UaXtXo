/**
 * Main Application Controller
 * Orchestrates TCO Wizard and Dashboard Integration
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing NAC TCO Analyzer...');
    
    // Initialize TCO Wizard
    if (typeof TCOWizard !== 'undefined') {
        TCOWizard.init();
        
        // Launch wizard button
        document.getElementById('launch-wizard')?.addEventListener('click', function() {
            TCOWizard.openWizard();
        });
    }
    
    // Initialize Dashboard Integration
    if (typeof DashboardIntegration !== 'undefined') {
        DashboardIntegration.init();
    }
    
    // Initialize Logo Loader
    if (typeof LogoLoader !== 'undefined') {
        LogoLoader.init();
    }
    
    // Setup analysis tab navigation
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Handle tab content switching (you can implement this based on your needs)
            const tabName = this.getAttribute('data-tab');
            console.log('Switching to tab:', tabName);
        });
    });
    
    // Export report functionality
    document.getElementById('export-report')?.addEventListener('click', function() {
        console.log('Export report clicked');
        // Implement report export functionality
    });
    
    console.log('NAC TCO Analyzer initialized successfully');
});
