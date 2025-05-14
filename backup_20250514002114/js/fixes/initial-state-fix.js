/**
 * Initial State Fix - Just ensures the wizard loads in the correct initial state
 */
(function() {
    // Wait for document to be ready
    function fixInitialState() {
        console.log("Initial State Fix: Ensuring proper initial wizard state");
        
        // 1. Hide the results container
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
            resultsContainer.classList.add('hidden');
        }
        
        // 2. Show the wizard container
        const wizardContainer = document.getElementById('wizard-container');
        if (wizardContainer) {
            wizardContainer.style.display = 'block';
        }
        
        // 3. Make sure wizard navigation is visible
        const wizardNavigation = document.querySelector('.wizard-navigation');
        if (wizardNavigation) {
            wizardNavigation.style.display = 'flex';
        }
        
        console.log("Initial State Fix: Wizard initial state corrected");
    }
    
    // Run immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixInitialState);
    } else {
        fixInitialState();
    }
    
    // Also run after a short delay (for any late initialization)
    setTimeout(fixInitialState, 500);
})();
