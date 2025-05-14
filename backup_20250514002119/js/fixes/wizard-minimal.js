/**
 * Minimal Wizard Implementation
 * Provides basic wizard functionality with error handling
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing minimal wizard...');
    
    // Find wizard elements
    const wizardSteps = document.querySelectorAll('.wizard-step');
    const nextButton = document.getElementById('next-step');
    const prevButton = document.getElementById('prev-step');
    
    if (!wizardSteps.length) {
        console.error('No wizard steps found');
        return;
    }
    
    let currentStep = 1;
    const totalSteps = wizardSteps.length;
    
    // Initialize wizard
    initWizard();
    
    function initWizard() {
        // Show first step
        showStep(currentStep);
        
        // Add event listeners
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                goToNextStep();
            });
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                goToPrevStep();
            });
        }
        
        // Add click handlers to vendor cards
        document.querySelectorAll('.vendor-card').forEach(card => {
            card.addEventListener('click', function() {
                // Remove active class from all cards
                document.querySelectorAll('.vendor-card').forEach(c => c.classList.remove('active'));
                
                // Add active class to this card
                this.classList.add('active');
            });
        });
        
        console.log('Minimal wizard initialized');
    }
    
    function showStep(step) {
        try {
            // Hide all steps
            wizardSteps.forEach((el, index) => {
                el.classList.remove('active');
            });
            
            // Show current step
            if (wizardSteps[step - 1]) {
                wizardSteps[step - 1].classList.add('active');
                
                // Scroll to current step
                wizardSteps[step - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Update buttons
            updateButtons();
            
            console.log(`Showing step ${step} of ${totalSteps}`);
        } catch (error) {
            console.error('Error showing step:', error);
        }
    }
    
    function goToNextStep() {
        try {
            if (validateCurrentStep()) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    showStep(currentStep);
                } else {
                    // Final step
                    showResults();
                }
            }
        } catch (error) {
            console.error('Error going to next step:', error);
        }
    }
    
    function goToPrevStep() {
        try {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        } catch (error) {
            console.error('Error going to previous step:', error);
        }
    }
    
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
    
    function validateCurrentStep() {
        try {
            switch(currentStep) {
                case 1:
                    // Validate vendor selection
                    const selectedVendor = document.querySelector('.vendor-card.active');
                    if (!selectedVendor) {
                        showError('Please select a NAC vendor or "No NAC" option');
                        return false;
                    }
                    break;
                    
                case 2:
                    // Validate industry selection
                    const industrySelect = document.getElementById('industry-select');
                    if (industrySelect && !industrySelect.value) {
                        showError('Please select your industry');
                        return false;
                    }
                    break;
                    
                case 3:
                    // Validate device count
                    const deviceCount = document.getElementById('device-count');
                    if (deviceCount && (!deviceCount.value || parseInt(deviceCount.value) <= 0)) {
                        showError('Please enter a valid number of devices');
                        return false;
                    }
                    break;
            }
            
            return true;
        } catch (error) {
            console.error('Error validating step:', error);
            return false;
        }
    }
    
    function showError(message) {
        try {
            // Use NotificationManager if available
            if (window.NotificationManager && window.NotificationManager.showNotification) {
                window.NotificationManager.showNotification({
                    title: 'Error',
                    message: message,
                    type: 'error'
                });
            } else {
                // Fallback to alert
                alert(message);
            }
        } catch (error) {
            console.error('Error showing error message:', error);
            // Last resort fallback
            alert(message);
        }
    }
    
    function showResults() {
        try {
            console.log('Showing results...');
            
            // Hide wizard container
            const wizardContainer = document.querySelector('.wizard-container');
            if (wizardContainer) {
                wizardContainer.style.display = 'none';
            }
            
            // Show results container
            const resultsContainer = document.getElementById('results-container');
            if (resultsContainer) {
                resultsContainer.classList.remove('hidden');
                resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Calculate results if calculator is available
            if (window.Calculator && typeof window.Calculator.calculateTCO === 'function') {
                window.Calculator.calculateTCO();
            }
        } catch (error) {
            console.error('Error showing results:', error);
        }
    }
    
    // Expose wizard API to global scope
    window.MinimalWizard = {
        getCurrentStep: function() { return currentStep; },
        getTotalSteps: function() { return totalSteps; },
        goToStep: showStep,
        goToNextStep: goToNextStep,
        goToPrevStep: goToPrevStep
    };
});
