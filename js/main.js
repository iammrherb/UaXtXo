/**
 * Main script file for Total Cost Analyzer
 * Loads and initializes all components
 */

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Total Cost Analyzer is initializing...');
    
    // Initialize components
    if (typeof WizardManager !== 'undefined') {
        console.log('Initializing Wizard Manager');
        WizardManager.init();
    } else {
        console.warn('Wizard Manager not found');
    }
    
    if (typeof EnhancedUI !== 'undefined') {
        console.log('Initializing Enhanced UI');
        EnhancedUI.init();
    } else {
        console.warn('Enhanced UI not found');
    }
    
    if (typeof ChartsManager !== 'undefined') {
        console.log('Initializing Charts Manager');
        ChartsManager.initCharts();
    } else {
        console.warn('Charts Manager not found');
    }
    
    if (typeof SensitivityAnalyzer !== 'undefined') {
        console.log('Initializing Sensitivity Analyzer');
        SensitivityAnalyzer.init();
    } else {
        console.warn('Sensitivity Analyzer not found');
    }
    
    // Bind export PDF button
    const exportPdfButton = document.getElementById('export-pdf');
    if (exportPdfButton) {
        exportPdfButton.addEventListener('click', function() {
            console.log('Exporting PDF...');
            // Implementation will be in reports/generator.js
        });
    }
    
    // Bind share results button
    const shareResultsButton = document.getElementById('share-results');
    if (shareResultsButton) {
        shareResultsButton.addEventListener('click', function() {
            console.log('Sharing results...');
            // Implementation will be in app-controller.js
        });
    }
    
    // Bind new calculation button
    const newCalculationButton = document.getElementById('new-calculation');
    if (newCalculationButton) {
        newCalculationButton.addEventListener('click', function() {
            console.log('Starting new calculation...');
            
            // Hide results container
            const resultsContainer = document.getElementById('results-container');
            if (resultsContainer) {
                resultsContainer.classList.add('hidden');
            }
            
            // Show wizard container
            const wizardContainer = document.getElementById('wizard-container');
            if (wizardContainer) {
                wizardContainer.classList.remove('hidden');
            }
            
            // Show wizard navigation
            const wizardNavigation = document.querySelector('.wizard-navigation');
            if (wizardNavigation) {
                wizardNavigation.classList.remove('hidden');
            }
            
            // Reset wizard to first step
            if (typeof WizardManager !== 'undefined') {
                WizardManager.goToStep(1);
            }
        });
    }
    
    console.log('Total Cost Analyzer initialized successfully');
});
