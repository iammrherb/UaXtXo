/**
 * Wizard Steps Fix
 * Ensures proper display and functionality of wizard steps
 */
document.addEventListener('DOMContentLoaded', function() {
  // Fix step navigation
  const steps = document.querySelectorAll('.wizard-step');
  const progressSteps = document.querySelectorAll('.wizard-progress-step');
  
  function showStep(stepNumber) {
    // Hide all steps
    steps.forEach((step) => {
      step.classList.remove('active');
    });
    
    // Show current step
    const currentStep = document.querySelector(`[data-step="${stepNumber}"]`);
    if (currentStep) {
      currentStep.classList.add('active');
    }
    
    // Update progress indicator
    progressSteps.forEach((progStep, index) => {
      if (index + 1 < stepNumber) {
        progStep.classList.add('completed');
        progStep.classList.remove('active');
      } else if (index + 1 == stepNumber) {
        progStep.classList.add('active');
        progStep.classList.remove('completed');
      } else {
        progStep.classList.remove('active', 'completed');
      }
    });
    
    // Update navigation buttons
    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');
    
    if (prevButton) {
      prevButton.style.display = stepNumber == 1 ? 'none' : 'block';
    }
    
    if (nextButton) {
      const totalSteps = steps.length;
      nextButton.textContent = stepNumber == totalSteps ? 'Generate Report' : 'Next Step';
    }
  }
  
  // Expose the function globally
  window.showWizardStep = showStep;
  
  // Fix next button functionality
  const nextButton = document.getElementById('next-step');
  if (nextButton) {
    nextButton.addEventListener('click', function() {
      const activeStep = document.querySelector('.wizard-step.active');
      if (activeStep) {
        const currentStepNumber = parseInt(activeStep.getAttribute('data-step'));
        if (!isNaN(currentStepNumber)) {
          const nextStepNumber = currentStepNumber + 1;
          if (nextStepNumber <= steps.length) {
            validateAndProceed(currentStepNumber, nextStepNumber);
          } else {
            generateReport();
          }
        }
      }
    });
  }
  
  // Fix previous button functionality
  const prevButton = document.getElementById('prev-step');
  if (prevButton) {
    prevButton.addEventListener('click', function() {
      const activeStep = document.querySelector('.wizard-step.active');
      if (activeStep) {
        const currentStepNumber = parseInt(activeStep.getAttribute('data-step'));
        if (!isNaN(currentStepNumber) && currentStepNumber > 1) {
          showStep(currentStepNumber - 1);
        }
      }
    });
  }
  
  // Validation function before proceeding
  function validateAndProceed(currentStep, nextStep) {
    let isValid = true;
    let errorMessage = '';
    
    // Step-specific validation
    switch(currentStep) {
      case 1: // Vendor selection
        const selectedVendor = document.querySelector('.vendor-card.active');
        if (!selectedVendor) {
          isValid = false;
          errorMessage = 'Please select a current NAC vendor or "No NAC" option.';
        }
        break;
        
      case 2: // Industry & Compliance
        const industrySelect = document.getElementById('industry-select');
        if (!industrySelect || !industrySelect.value) {
          isValid = false;
          errorMessage = 'Please select your industry to continue.';
        }
        break;
        
      case 3: // Organization details
        const deviceCount = document.getElementById('device-count');
        if (!deviceCount || !deviceCount.value || parseInt(deviceCount.value) <= 0) {
          isValid = false;
          errorMessage = 'Please enter a valid number of devices.';
        }
        break;
        
      // Add more validation as needed for other steps
    }
    
    if (isValid) {
      showStep(nextStep);
    } else {
      showError(errorMessage);
    }
  }
  
  // Error display function
  function showError(message) {
    const errorContainer = document.getElementById('wizard-error-container');
    if (errorContainer) {
      errorContainer.innerHTML = `
        <div class="error-message-box">
          <i class="fas fa-exclamation-triangle"></i>
          <span>${message}</span>
          <button class="close-error">×</button>
        </div>
      `;
      
      // Add event listener to close button
      const closeButton = errorContainer.querySelector('.close-error');
      if (closeButton) {
        closeButton.addEventListener('click', function() {
          errorContainer.innerHTML = '';
        });
      }
      
      // Scroll to error
      errorContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Generate report function
  function generateReport() {
    // Show loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'flex';
    }
    
    // Simulate calculation time
    setTimeout(function() {
      // Generate the report data based on collected information
      generateTCOReport();
      
      // Hide loading overlay
      if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
      }
      
      // Show results container
      const resultsContainer = document.getElementById('results-container');
      if (resultsContainer) {
        resultsContainer.classList.remove('hidden');
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
      }
    }, 2000);
  }
  
  // Initialize to first step
  showStep(1);
});
