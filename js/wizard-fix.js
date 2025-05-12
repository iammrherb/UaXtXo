/**
 * Wizard Fix - Ensures proper loading and functionality of the TCO Wizard
 */
console.log("Wizard Fix: Applying patches to wizard functionality...");

(function() {
    // Function to check if wizard.js is loaded
    function isWizardLoaded() {
        return typeof TCOWizard !== 'undefined';
    }
    
    // Function to load wizard.js if not loaded
    function loadWizardScript() {
        if (isWizardLoaded()) {
            console.log("Wizard script is already loaded");
            return Promise.resolve();
        }
        
        return new Promise((resolve, reject) => {
            console.log("Loading wizard script...");
            const script = document.createElement('script');
            script.src = 'js/wizards/tco-wizard.js';
            script.onload = () => {
                console.log("Wizard script loaded successfully");
                resolve();
            };
            script.onerror = () => {
                console.error("Failed to load wizard script");
                reject(new Error("Failed to load wizard script"));
            };
            document.head.appendChild(script);
        });
    }
    
    // Function to initialize wizard if not already initialized
    function initializeWizard() {
        if (isWizardLoaded()) {
            console.log("Initializing TCO Wizard...");
            
            // Check if wizard is already initialized
            if (document.querySelector('.wizard-overlay')) {
                console.log("Wizard is already initialized");
            } else {
                // Initialize the wizard
                TCOWizard.init();
                console.log("Wizard initialized successfully");
                
                // Fix any potential issues with the wizard navigation
                fixWizardNavigation();
            }
        } else {
            console.error("Cannot initialize wizard: TCOWizard is not defined");
        }
    }
    
    // Function to fix wizard navigation
    function fixWizardNavigation() {
        const prevButton = document.getElementById('wizard-prev');
        const nextButton = document.getElementById('wizard-next');
        
        if (prevButton && nextButton) {
            // Ensure event listeners are properly attached
            const newPrevButton = prevButton.cloneNode(true);
            const newNextButton = nextButton.cloneNode(true);
            
            prevButton.parentNode.replaceChild(newPrevButton, prevButton);
            nextButton.parentNode.replaceChild(newNextButton, nextButton);
            
            newPrevButton.addEventListener('click', function() {
                if (TCOWizard && typeof TCOWizard.goToPreviousStep === 'function') {
                    TCOWizard.goToPreviousStep();
                }
            });
            
            newNextButton.addEventListener('click', function() {
                if (TCOWizard && typeof TCOWizard.goToNextStep === 'function') {
                    TCOWizard.goToNextStep();
                }
            });
            
            console.log("Wizard navigation fixed");
        } else {
            console.warn("Wizard navigation buttons not found");
        }
    }
    
    // Fix wizard steps
    function fixWizardSteps() {
        const wizardSteps = document.querySelectorAll('.wizard-step');
        if (wizardSteps.length > 0) {
            wizardSteps.forEach((step, index) => {
                // Ensure data-step attribute is correctly set
                step.setAttribute('data-step', index + 1);
                
                // Remove active class from all steps except the first
                if (index === 0) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
            console.log("Wizard steps fixed");
        } else {
            console.warn("Wizard steps not found");
        }
    }
    
    // Load and initialize wizard when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Load the wizard script if not already loaded
        loadWizardScript()
            .then(() => {
                // Initialize the wizard
                initializeWizard();
                
                // Fix wizard steps
                fixWizardSteps();
                
                console.log("Wizard Fix: Patches applied successfully");
            })
            .catch(error => {
                console.error("Wizard Fix: Error applying patches:", error);
            });
    });
})();
