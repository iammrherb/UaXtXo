/**
 * Portnox TCO Analyzer - New Wizard Implementation
 * This is a complete rewrite of the wizard functionality to ensure it works correctly
 */
const TCOWizard = (function() {
    // Private variables
    let currentStep = 1;
    const totalSteps = 5;
    
    // DOM elements
    let wizardContainer;
    let wizardSteps;
    let prevButton;
    let nextButton;
    let stepIndicators;
    
    // Configuration
    const config = {
        selectors: {
            container: '.wizard-container',
            steps: '.wizard-step',
            prevButton: '#prev-step',
            nextButton: '#next-step',
            progressBar: '#wizard-progress-fill',
            stepIndicators: '.wizard-step-indicator'
        },
        classes: {
            active: 'active',
            completed: 'completed'
        }
    };
    
    // Initialize wizard
    function init() {
        console.log('Initializing TCO Wizard...');
        
        // Find DOM elements
        wizardContainer = document.querySelector(config.selectors.container);
        wizardSteps = document.querySelectorAll(config.selectors.steps);
        prevButton = document.querySelector(config.selectors.prevButton);
        nextButton = document.querySelector(config.selectors.nextButton);
        stepIndicators = document.querySelectorAll(config.selectors.stepIndicators);
        
        if (!wizardContainer || !wizardSteps.length) {
            console.error('Wizard container or steps not found');
            return;
        }
        
        // Setup navigation
        setupNavigation();
        
        // Show initial step
        showStep(currentStep);
        
        // Setup event listeners for wizard interactions (vendor selection, etc.)
        setupWizardInteractions();
        
        console.log('TCO Wizard initialized');
    }
    
    // Setup navigation buttons
    function setupNavigation() {
        if (prevButton) {
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                goToPrevStep();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                goToNextStep();
            });
        }
        
        // Setup step indicators if they exist
        if (stepIndicators && stepIndicators.length) {
            stepIndicators.forEach(indicator => {
                indicator.addEventListener('click', function() {
                    const step = parseInt(this.dataset.step);
                    if (step <= currentStep) {
                        goToStep(step);
                    }
                });
            });
        }
    }
    
    // Go to next step
    function goToNextStep() {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                goToStep(currentStep + 1);
            } else {
                // This is the last step, perform final action (show results)
                showResults();
            }
        }
    }
    
    // Go to previous step
    function goToPrevStep() {
        if (currentStep > 1) {
            goToStep(currentStep - 1);
        }
    }
    
    // Go to specific step
    function goToStep(step) {
        if (step < 1 || step > totalSteps) {
            console.error('Invalid step number:', step);
            return;
        }
        
        currentStep = step;
        showStep(currentStep);
    }
    
    // Show specific step
    function showStep(step) {
        try {
            // Hide all steps
            wizardSteps.forEach(stepEl => {
                stepEl.classList.remove(config.classes.active);
            });
            
            // Show current step
            const currentStepElement = wizardSteps[step - 1];
            if (currentStepElement) {
                currentStepElement.classList.add(config.classes.active);
                
                // Scroll to the step
                currentStepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Update step indicators
            updateStepIndicators();
            
            // Update navigation buttons
            updateNavigationButtons();
            
            // Update progress bar if exists
            updateProgressBar();
            
            console.log(`Showing step ${step} of ${totalSteps}`);
        } catch (error) {
            console.error('Error showing step:', error);
        }
    }
    
    // Update step indicators
    function updateStepIndicators() {
        if (!stepIndicators || !stepIndicators.length) return;
        
        stepIndicators.forEach(indicator => {
            const step = parseInt(indicator.dataset.step);
            
            indicator.classList.remove(config.classes.active, config.classes.completed);
            
            if (step === currentStep) {
                indicator.classList.add(config.classes.active);
            } else if (step < currentStep) {
                indicator.classList.add(config.classes.completed);
            }
        });
    }
    
    // Update navigation buttons
    function updateNavigationButtons() {
        if (prevButton) {
            prevButton.disabled = currentStep === 1;
            prevButton.style.display = currentStep === 1 ? 'none' : 'block';
        }
        
        if (nextButton) {
            nextButton.textContent = currentStep === totalSteps ? 'View Results' : 'Next';
        }
    }
    
    // Update progress bar
    function updateProgressBar() {
        const progressBar = document.querySelector(config.selectors.progressBar);
        if (progressBar) {
            const progress = (currentStep - 1) / (totalSteps - 1) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }
    
    // Validate current step before proceeding
    function validateCurrentStep() {
        try {
            // Check which step we're on and validate accordingly
            switch(currentStep) {
                case 1:
                    // Vendor selection
                    const selectedVendor = document.querySelector('.vendor-card.active');
                    if (!selectedVendor) {
                        showValidationError('Please select a current NAC vendor or "No NAC" option');
                        return false;
                    }
                    break;
                
                case 2:
                    // Industry selection
                    const industrySelect = document.getElementById('industry-select');
                    if (industrySelect && !industrySelect.value) {
                        showValidationError('Please select your industry');
                        return false;
                    }
                    break;
                    
                case 3:
                    // Organization details
                    const deviceCount = document.getElementById('device-count');
                    if (deviceCount && (!deviceCount.value || parseInt(deviceCount.value) <= 0)) {
                        showValidationError('Please enter a valid device count');
                        return false;
                    }
                    break;
                    
                // Add more validation as needed
            }
            
            // If we get here, validation passed
            return true;
        } catch (error) {
            console.error('Error validating step:', error);
            return false;
        }
    }
    
    // Show validation error
    function showValidationError(message) {
        // Check if we have a notification manager
        if (typeof NotificationManager !== 'undefined' && NotificationManager.showNotification) {
            NotificationManager.showNotification({
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
    
    // Show results
    function showResults() {
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
        
        // If we have a calculator, calculate the results
        if (typeof Calculator !== 'undefined' && Calculator.calculateTCO) {
            try {
                Calculator.calculateTCO();
            } catch (error) {
                console.error('Error calculating TCO:', error);
            }
        }
    }
    
    // Setup wizard interactions
    function setupWizardInteractions() {
        // Vendor selection
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach(card => {
            card.addEventListener('click', function() {
                // Remove active class from all cards
                vendorCards.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked card
                this.classList.add('active');
            });
        });
        
        // Industry selection change
        const industrySelect = document.getElementById('industry-select');
        if (industrySelect) {
            industrySelect.addEventListener('change', function() {
                // Update compliance frameworks based on industry
                updateComplianceFrameworks(this.value);
            });
        }
    }
    
    // Update compliance frameworks based on selected industry
    function updateComplianceFrameworks(industry) {
        const frameworksContainer = document.getElementById('compliance-frameworks');
        if (!frameworksContainer) return;
        
        // Show loading state
        frameworksContainer.innerHTML = '<div class="loading">Loading compliance frameworks...</div>';
        
        // Map of industries to relevant compliance frameworks
        const industryFrameworks = {
            healthcare: ['HIPAA', 'HITRUST', 'NIST'],
            financial: ['PCI DSS', 'SOX', 'GLBA', 'NIST'],
            education: ['FERPA', 'COPPA', 'NIST'],
            government: ['FISMA', 'FedRAMP', 'NIST'],
            manufacturing: ['ISO 27001', 'NIST', 'CMMC'],
            retail: ['PCI DSS', 'GDPR', 'CCPA'],
            technology: ['ISO 27001', 'SOC 2', 'NIST'],
            energy: ['NERC CIP', 'ISO 27001', 'NIST']
        };
        
        // Get relevant frameworks for selected industry
        const frameworks = industryFrameworks[industry] || [];
        
        if (frameworks.length === 0) {
            frameworksContainer.innerHTML = '<div class="no-frameworks">No specific compliance frameworks for this industry</div>';
            return;
        }
        
        // Build HTML for frameworks
        let html = '<div class="frameworks-grid">';
        frameworks.forEach(framework => {
            html += `
                <div class="framework-card">
                    <div class="framework-header">
                        <h4>${framework}</h4>
                        <div class="framework-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                    </div>
                    <p>Portnox Cloud helps achieve compliance with ${framework} requirements.</p>
                </div>
            `;
        });
        html += '</div>';
        
        // Update container
        frameworksContainer.innerHTML = html;
    }
    
    // Public API
    return {
        init: init,
        goToStep: goToStep,
        goToNextStep: goToNextStep,
        goToPrevStep: goToPrevStep,
        getCurrentStep: function() { return currentStep; },
        getTotalSteps: function() { return totalSteps; }
    };
})();

// Initialize wizard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the new wizard
    TCOWizard.init();
});
