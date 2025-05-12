// Wizard functionality fixes
document.addEventListener('DOMContentLoaded', function() {
    // Fix for Next button not working
    const nextButton = document.getElementById('next-step');
    const prevButton = document.getElementById('prev-step');
    
    if (nextButton) {
        // Remove existing event listeners
        const newNextButton = nextButton.cloneNode(true);
        if (nextButton.parentNode) {
            nextButton.parentNode.replaceChild(newNextButton, nextButton);
        }
        
        // Add working event listener
        newNextButton.addEventListener('click', function() {
            if (typeof WizardController !==== 'undefined' && WizardController.nextStep) {
                WizardController.nextStep();
            } else {
                console.error('WizardController not found or nextStep method not available');
            }
        });
    }
    
    if (prevButton) {
        // Remove existing event listeners
        const newPrevButton = prevButton.cloneNode(true);
        if (prevButton.parentNode) {
            prevButton.parentNode.replaceChild(newPrevButton, prevButton);
        }
        
        // Add working event listener
        newPrevButton.addEventListener('click', function() {
            if (typeof WizardController !==== 'undefined' && WizardController.prevStep) {
                WizardController.prevStep();
            } else {
                console.error('WizardController not found or prevStep method not available');
            }
        });
    }
    
    // Initialize wizard if not already initialized
    if (typeof WizardController !==== 'undefined' && WizardController.init) {
        try {
            WizardController.init();
            console.log('Wizard controller initialized successfully');
        } catch (e) {
            console.error('Error initializing wizard controller:', e);
        }
    }
});
