/**
 * Wizard Navigation Fix
 * Ensures proper navigation between all wizard steps
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get all wizard steps
  const wizardSteps = document.querySelectorAll('.wizard-step');
  if (wizardSteps.length === 0) return;
  
  // Get navigation buttons
  const nextBtn = document.getElementById('next-step');
  const prevBtn = document.getElementById('prev-step');
  const calculateBtn = document.getElementById('calculate-btn');
  
  // Initialize step tracker (1-indexed for readability)
  let currentStep = 1;
  
  // Function to show a specific step
  function showStep(stepNumber) {
    console.log("Navigating to step", stepNumber);
    
    // Validate step number
    if (stepNumber < 1 || stepNumber > wizardSteps.length) {
      console.warn("Invalid step number:", stepNumber);
      return;
    }
    
    // Update current step
    currentStep = stepNumber;
    
    // Hide all steps
    wizardSteps.forEach(step => {
      step.classList.remove('active');
    });
    
    // Show current step
    const stepToShow = document.querySelector(`.wizard-step[data-step="${currentStep}"]`);
    if (stepToShow) {
      stepToShow.classList.add('active');
    } else {
      console.warn(`Step with data-step="${currentStep}" not found`);
    }
    
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
      if (currentStep === wizardSteps.length) {
        nextBtn.textContent = 'Generate Report';
      } else {
        nextBtn.textContent = 'Next';
      }
    }
    
    // Update progress fill if it exists
    const progressFill = document.getElementById('wizard-progress-fill');
    if (progressFill) {
      const progressPercentage = ((currentStep - 1) / (wizardSteps.length - 1)) * 100;
      progressFill.style.width = `${progressPercentage}%`;
    }
    
    // Update progress steps if they exist
    const progressStepsContainer = document.getElementById('progress-steps');
    if (progressStepsContainer) {
      updateProgressSteps(currentStep);
    }
  }
  
  // Function to update progress steps
  function updateProgressSteps(currentStep) {
    const progressStepsContainer = document.getElementById('progress-steps');
    if (!progressStepsContainer) return;
    
    // Clear existing progress steps
    progressStepsContainer.innerHTML = '';
    
    // Create new progress steps
    for (let i = 1; i <= wizardSteps.length; i++) {
      const stepElement = document.createElement('div');
      stepElement.className = 'progress-step';
      
      if (i < currentStep) {
        stepElement.classList.add('completed');
      } else if (i === currentStep) {
        stepElement.classList.add('active');
      }
      
      // Get step label from step content
      let stepLabel = `Step ${i}`;
      const stepH2 = document.querySelector(`.wizard-step[data-step="${i}"] h2`);
      if (stepH2) {
        stepLabel = stepH2.textContent;
      }
      
      stepElement.innerHTML = `
        <div class="step-number">${i}</div>
        <div class="step-label">${stepLabel}</div>
      `;
      
      // Add click handler to navigate to step
      stepElement.addEventListener('click', () => {
        if (i <= currentStep || i === currentStep + 1) {
          showStep(i);
        }
      });
      
      progressStepsContainer.appendChild(stepElement);
    }
  }
  
  // Add click handler to next button
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      // Validate step before proceeding
      if (validateStep(currentStep)) {
        // If we're on the last step, show results
        if (currentStep === wizardSteps.length) {
          showResults();
        } else {
          showStep(currentStep + 1);
        }
      }
    });
  }
  
  // Add click handler to previous button
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      showStep(currentStep - 1);
    });
  }
  
  // Add click handler to calculate button
  if (calculateBtn) {
    calculateBtn.addEventListener('click', function() {
      showResults();
    });
  }
  
  // Function to show results
  function showResults() {
    console.log("Showing results");
    
    // Show loading overlay if it exists
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'flex';
    }
    
    // Generate the report with a slight delay to show the loading animation
    setTimeout(function() {
      // Calculate TCO if the function exists
      if (typeof window.Calculator !== 'undefined' && typeof window.Calculator.calculateTCO === 'function') {
        window.Calculator.calculateTCO();
      } else {
        console.warn("Calculator.calculateTCO is not defined");
        
        // Trigger chart generation directly if needed
        if (typeof window.ChartManager !== 'undefined' && typeof window.ChartManager.generateAllCharts === 'function') {
          window.ChartManager.generateAllCharts();
        } else if (typeof window.generateDummyCharts === 'function') {
          window.generateDummyCharts();
        }
      }
      
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
    }, 1000);
  }
  
  // Simple validation function for steps
  function validateStep(step) {
    console.log("Validating step", step);
    
    // Validation logic based on step
    switch(step) {
      case 1: // Vendor selection
        const selectedVendor = document.querySelector('.vendor-card.active');
        if (!selectedVendor) {
          showError('Please select a vendor to continue.');
          return false;
        }
        return true;
        
      case 2: // Industry & Compliance
        const industrySelect = document.getElementById('industry-select');
        if (industrySelect && !industrySelect.value) {
          showError('Please select an industry to continue.');
          return false;
        }
        return true;
        
      case 3: // Organization details
        const deviceCount = document.getElementById('device-count');
        if (deviceCount && (isNaN(parseInt(deviceCount.value)) || parseInt(deviceCount.value) <= 0)) {
          showError('Please enter a valid number of devices to continue.');
          return false;
        }
        return true;
        
      default:
        return true;
    }
  }
  
  // Function to show validation error
  function showError(message) {
    console.warn("Validation error:", message);
    
    const errorContainer = document.getElementById('wizard-error-container');
    if (!errorContainer) {
      console.error("Error container not found");
      alert(message); // Fallback to alert if error container doesn't exist
      return;
    }
    
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
    
    // Scroll to error
    errorContainer.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Initialize to first step
  showStep(1);
  
  // Make navigation functions available globally
  window.WizardNavigation = {
    showStep,
    validateStep,
    getCurrentStep: () => currentStep,
    getTotalSteps: () => wizardSteps.length,
    showResults
  };
});
