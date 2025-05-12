/**
 * Standalone Wizard Controller
 * Complete implementation that works independently of existing code
 */
const PortnoxWizard = (function() {
    // Private variables
    let currentStep = 1;
    const totalSteps = 5;
    
    // Step data (to be populated from DOM)
    let steps = [];
    
    // DOM elements
    let wizardContainer;
    let progressBar;
    let nextButton;
    let prevButton;
    
    // Initialize
    function init() {
        console.log('Initializing PortnoxWizard...');
        
        try {
            // Find DOM elements
            wizardContainer = document.querySelector('.wizard-container');
            progressBar = document.getElementById('wizard-progress-fill');
            nextButton = document.getElementById('next-step');
            prevButton = document.getElementById('prev-step');
            
            if (!wizardContainer) {
                console.error('Wizard container not found');
                return;
            }
            
            // Find all wizard steps
            const stepElements = document.querySelectorAll('.wizard-step');
            steps = Array.from(stepElements).map((element, index) => ({
                element: element,
                id: index + 1,
                title: element.querySelector('.step-header h2')?.textContent || `Step ${index + 1}`
            }));
            
            // Attach event listeners
            if (nextButton) {
                nextButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    goToNextStep();
                });
            }
            
            if (prevButton) {
                prevButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    goToPrevStep();
                });
            }
            
            // Handle vendor card selection
            document.querySelectorAll('.vendor-card').forEach(card => {
                card.addEventListener('click', function() {
                    document.querySelectorAll('.vendor-card').forEach(c => {
                        c.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });
            
            // Handle industry selection
            const industrySelect = document.getElementById('industry-select');
            if (industrySelect) {
                industrySelect.addEventListener('change', function() {
                    handleIndustryChange(this.value);
                });
            }
            
            // Initialize UI
            showStep(currentStep);
            updateProgressBar();
            
            console.log('PortnoxWizard initialized successfully');
        } catch (error) {
            console.error('Error initializing wizard:', error);
        }
    }
    
    // Show a specific step
    function showStep(stepNumber) {
        try {
            if (stepNumber < 1 || stepNumber > totalSteps) {
                console.error(`Invalid step number: ${stepNumber}`);
                return;
            }
            
            // Update current step
            currentStep = stepNumber;
            
            // Hide all steps
            steps.forEach(step => {
                step.element.classList.remove('active');
            });
            
            // Show current step
            const currentStepElement = steps.find(s => s.id === currentStep)?.element;
            if (currentStepElement) {
                currentStepElement.classList.add('active');
                currentStepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Update UI
            updateButtons();
            updateProgressBar();
            
            console.log(`Showing step ${currentStep} of ${totalSteps}`);
        } catch (error) {
            console.error('Error showing step:', error);
        }
    }
    
    // Go to next step
    function goToNextStep() {
        try {
            if (validateCurrentStep()) {
                if (currentStep < totalSteps) {
                    showStep(currentStep + 1);
                } else {
                    // Final step - show results
                    showResults();
                }
            }
        } catch (error) {
            console.error('Error going to next step:', error);
        }
    }
    
    // Go to previous step
    function goToPrevStep() {
        try {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        } catch (error) {
            console.error('Error going to previous step:', error);
        }
    }
    
    // Validate current step
    function validateCurrentStep() {
        try {
            switch (currentStep) {
                case 1: // Vendor selection
                    const selectedVendor = document.querySelector('.vendor-card.active');
                    if (!selectedVendor) {
                        showError('Please select a vendor or "No NAC" option.');
                        return false;
                    }
                    break;
                    
                case 2: // Industry selection
                    const industrySelect = document.getElementById('industry-select');
                    if (industrySelect && !industrySelect.value) {
                        showError('Please select your industry.');
                        return false;
                    }
                    break;
                    
                case 3: // Organization details
                    const deviceCount = document.getElementById('device-count');
                    if (deviceCount && (!deviceCount.value || parseInt(deviceCount.value) <= 0)) {
                        showError('Please enter a valid number of devices.');
                        return false;
                    }
                    break;
            }
            
            return true;
        } catch (error) {
            console.error('Error validating step:', error);
            return true; // Allow to proceed even if validation fails due to error
        }
    }
    
    // Show error message
    function showError(message) {
        // Try to use NotificationManager if available
        if (window.NotificationManager && typeof window.NotificationManager.showNotification === 'function') {
            window.NotificationManager.showNotification({
                title: 'Validation Error',
                message: message,
                type: 'error',
                duration: 5000
            });
        } else {
            // Fallback to alert
            alert(message);
        }
    }
    
    // Update button states and text
    function updateButtons() {
        try {
            if (prevButton) {
                prevButton.disabled = currentStep === 1;
                prevButton.style.display = currentStep === 1 ? 'none' : 'block';
            }
            
            if (nextButton) {
                nextButton.textContent = currentStep === totalSteps ? 'View Results' : 'Next';
            }
        } catch (error) {
            console.error('Error updating buttons:', error);
        }
    }
    
    // Update progress bar
    function updateProgressBar() {
        try {
            if (progressBar) {
                const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
                progressBar.style.width = `${progress}%`;
            }
        } catch (error) {
            console.error('Error updating progress bar:', error);
        }
    }
    
    // Handle industry change
    function handleIndustryChange(industry) {
        try {
            console.log(`Industry changed to: ${industry}`);
            
            // Update compliance frameworks section
            const frameworksContainer = document.getElementById('compliance-frameworks');
            if (frameworksContainer) {
                // Simple placeholder content
                frameworksContainer.innerHTML = `<p>Showing compliance frameworks for ${industry} industry...</p>`;
            }
        } catch (error) {
            console.error('Error handling industry change:', error);
        }
    }
    
    // Show results
    function showResults() {
        try {
            console.log('Showing results...');
            
            // Hide wizard container
            if (wizardContainer) {
                wizardContainer.style.display = 'none';
            }
            
            // Show results container
            const resultsContainer = document.getElementById('results-container');
            if (resultsContainer) {
                resultsContainer.classList.remove('hidden');
                resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Calculate results if available
            if (window.Calculator && typeof window.Calculator.calculateTCO === 'function') {
                window.Calculator.calculateTCO();
            }
        } catch (error) {
            console.error('Error showing results:', error);
        }
    }
    
    // Public API
    return {
        init: init,
        goToStep: showStep,
        nextStep: goToNextStep,
        prevStep: goToPrevStep,
        getCurrentStep: function() { return currentStep; },
        getTotalSteps: function() { return totalSteps; }
    };
})();

// Initialize wizard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a moment to ensure all other scripts have loaded
    setTimeout(function() {
        PortnoxWizard.init();
    }, 100);
});
