/**
 * Wizard Navigation Fix
 * Ensures proper navigation between wizard steps
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get all wizard steps
  const wizardSteps = document.querySelectorAll('.wizard-step');
  if (wizardSteps.length === 0) return;
  
  // Get navigation buttons
  const nextBtn = document.getElementById('next-step');
  const prevBtn = document.getElementById('prev-step');
  
  // Initialize step tracker
  let currentStep = 1;
  
  // Function to show a specific step
  function showStep(stepNumber) {
    // Validate step number
    if (stepNumber < 1 || stepNumber > wizardSteps.length) return;
    
    // Update current step
    currentStep = stepNumber;
    
    // Hide all steps
    wizardSteps.forEach(step => {
      step.classList.remove('active');
    });
    
    // Show current step
    document.querySelector(`.wizard-step[data-step="${currentStep}"]`).classList.add('active');
    
    // Update progress indicators if they exist
    const progressSteps = document.querySelectorAll('.wizard-progress-step');
    progressSteps.forEach((step, index) => {
      step.classList.remove('active', 'completed');
      if (index + 1 < currentStep) {
        step.classList.add('completed');
      } else if (index + 1 === currentStep) {
        step.classList.add('active');
      }
    });
    
    // Update navigation buttons
    if (prevBtn) {
      prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
    }
    
    if (nextBtn) {
      nextBtn.textContent = currentStep === wizardSteps.length ? 'Generate Report' : 'Next';
    }
    
    // Update progress fill if it exists
    const progressFill = document.getElementById('wizard-progress-fill');
    if (progressFill) {
      const progressPercentage = ((currentStep - 1) / (wizardSteps.length - 1)) * 100;
      progressFill.style.width = `${progressPercentage}%`;
    }
  }
  
  // Add click handlers to navigation buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      // Validate current step
      if (validateStep(currentStep)) {
        showStep(currentStep + 1);
      }
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      showStep(currentStep - 1);
    });
  }
  
  // Simple validation function
  function validateStep(step) {
    // Add validation logic based on step
    switch(step) {
      case 1: // Vendor selection
        const selectedVendor = document.querySelector('.vendor-card.active');
        if (!selectedVendor) {
          showError('Please select a vendor to continue.');
          return false;
        }
        return true;
        
      case 2: // Industry selection
        const industrySelect = document.getElementById('industry-select');
        if (industrySelect && !industrySelect.value) {
          showError('Please select an industry to continue.');
          return false;
        }
        return true;
        
      case 3: // Organization details
        const deviceCount = document.getElementById('device-count');
        if (deviceCount && (isNaN(deviceCount.value) || deviceCount.value <= 0)) {
          showError('Please enter a valid device count to continue.');
          return false;
        }
        return true;
        
      default:
        return true;
    }
  }
  
  // Function to show error message
  function showError(message) {
    const errorContainer = document.getElementById('wizard-error-container');
    if (!errorContainer) return;
    
    errorContainer.innerHTML = `
      <div class="error-message-box">
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
        <button class="close-error">×</button>
      </div>
    `;
    
    // Add event listener to close button
    const closeBtn = errorContainer.querySelector('.close-error');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        errorContainer.innerHTML = '';
      });
    }
  }
  
  // Initialize wizard to first step
  showStep(1);
  
  // Make functions available globally
  window.wizardNavigation = {
    showStep,
    validateStep,
    getCurrentStep: () => currentStep,
    getTotalSteps: () => wizardSteps.length
  };
});
