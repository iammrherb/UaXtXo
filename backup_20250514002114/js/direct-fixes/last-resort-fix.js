/**
 * LAST RESORT FIX - Final attempt to fix any remaining issues
 * This script will be loaded at the very end of the page
 */
(function() {
    console.log("LAST RESORT FIX: Starting final fixes");
    
    // Wait for everything else to load
    window.addEventListener('load', function() {
        // Wait a bit more for any async operations
        setTimeout(function() {
            console.log("LAST RESORT FIX: Applying final UI fixes");
            
            // 1. Forcibly hide the results container again
            const resultsContainer = document.getElementById('results-container');
            if (resultsContainer) {
                resultsContainer.style.display = 'none';
                resultsContainer.classList.add('hidden');
            }
            
            // 2. Forcibly show the wizard container
            const wizardContainer = document.getElementById('wizard-container');
            if (wizardContainer) {
                wizardContainer.style.display = 'block';
            }
            
            // 3. Forcibly show the wizard navigation
            const wizardNavigation = document.querySelector('.wizard-navigation');
            if (wizardNavigation) {
                wizardNavigation.style.display = 'flex';
            }
            
            // 4. Make sure the wizard step is visible
            const wizardSteps = document.querySelectorAll('.wizard-step');
            let activeStepFound = false;
            
            wizardSteps.forEach(function(step) {
                if (step.classList.contains('active')) {
                    step.style.display = 'block';
                    activeStepFound = true;
                } else {
                    step.style.display = 'none';
                }
            });
            
            // If no active step, show the first one
            if (!activeStepFound && wizardSteps.length > 0) {
                wizardSteps[0].classList.add('active');
                wizardSteps[0].style.display = 'block';
            }
            
            console.log("LAST RESORT FIX: Applied final UI fixes");
        }, 2000);
    });
})();
