/**
 * Implementation Fix - Applies specific fixes for the TCO Analyzer
 */
(function() {
    console.log("Implementation Fix: Applying specific fixes for the TCO Analyzer");
    
    // Fix selector issue in final-patch.js
    document.addEventListener("DOMContentLoaded", function() {
        // Fix button selector
        const showResultsBtn = document.getElementById('calculate-btn');
        if (showResultsBtn) {
            showResultsBtn.addEventListener('click', function() {
                const resultsContainer = document.getElementById('results-container');
                if (resultsContainer) {
                    resultsContainer.classList.remove('hidden');
                    resultsContainer.scrollIntoView({ behavior: 'smooth' });
                }
            });
            console.log("Implementation Fix: Added event listener to calculate button");
        }
        
        // Ensure charts are properly initialized when switching tabs
        const resultTabs = document.querySelectorAll('.result-tab');
        if (resultTabs.length > 0) {
            resultTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    const panels = document.querySelectorAll('.result-panel');
                    const tabs = document.querySelectorAll('.result-tab');
                    
                    // Remove active class from all tabs and panels
                    tabs.forEach(t => t.classList.remove('active'));
                    panels.forEach(p => p.classList.remove('active'));
                    
                    // Add active class to current tab and panel
                    this.classList.add('active');
                    const panel = document.getElementById(`${tabId}-panel`);
                    if (panel) {
                        panel.classList.add('active');
                    }
                });
            });
            console.log("Implementation Fix: Added tab switching logic");
        }
    });
    
    // Fix wizard navigation
    const fixWizardNavigation = function() {
        const prevButton = document.getElementById('prev-step');
        const nextButton = document.getElementById('next-step');
        
        if (prevButton && nextButton && window.WizardController) {
            prevButton.addEventListener('click', function() {
                window.WizardController.prevStep();
            });
            
            nextButton.addEventListener('click', function() {
                window.WizardController.nextStep();
            });
            
            console.log("Implementation Fix: Fixed wizard navigation");
        }
    };
    
    // Run the fix when the document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixWizardNavigation);
    } else {
        fixWizardNavigation();
    }
    
    console.log("Implementation Fix: All fixes applied");
})();
