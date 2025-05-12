/**
 * Wizard Utilities
 * Provides enhanced wizard functionality and navigation
 * Version: 2.1
 */

(function() {
  // Create namespace for wizard utilities
  window.WizardUtils = window.WizardUtils || {};
  
  // Track wizard state
  window.WizardUtils.state = {
    currentStep: 1,
    totalSteps: 5,
    isComplete: false
  };
  
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', init);
  
  function init() {
    console.log('[Wizard Utils] Initializing wizard utilities...');
    
    // Find wizard elements
    const nextButton = document.getElementById('next-step');
    const prevButton = document.getElementById('prev-button') || document.getElementById('prev-step');
    const wizardSteps = document.querySelectorAll('.wizard-step');
    
    if (!nextButton || !prevButton) {
      console.warn('[Wizard Utils] Navigation buttons not found, attempting to create them');
      createNavigationButtons();
      return;
    }
    
    if (!wizardSteps || wizardSteps.length === 0) {
      console.warn('[Wizard Utils] Wizard steps not found');
      return;
    }
    
    // Set total steps
    window.WizardUtils.state.totalSteps = wizardSteps.length;
    
    // Add enhanced click handlers
    addNavigationHandlers(nextButton, prevButton, wizardSteps);
    
    // Initialize progress indicators
    initializeProgressIndicators(wizardSteps.length);
    
    console.log(`[Wizard Utils] Wizard initialized with ${wizardSteps.length} steps`);
  }
  
  function createNavigationButtons() {
    // Find wizard container to append buttons
    const wizardContainer = document.querySelector('.wizard-container') || 
                           document.querySelector('.calculator-container') || 
                           document.body;
    
    // Create navigation container if it doesn't exist
    let navContainer = document.querySelector('.wizard-navigation');
    if (!navContainer) {
      navContainer = document.createElement('div');
      navContainer.className = 'wizard-navigation';
      wizardContainer.appendChild(navContainer);
    }
    
    // Create previous button if it doesn't exist
    let prevButton = document.getElementById('prev-step');
    if (!prevButton) {
      prevButton = document.createElement('button');
      prevButton.id = 'prev-step';
      prevButton.className = 'btn btn-outline';
      prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
      prevButton.setAttribute('disabled', 'disabled');
      navContainer.appendChild(prevButton);
    }
    
    // Create next button if it doesn't exist
    let nextButton = document.getElementById('next-step');
    if (!nextButton) {
      nextButton = document.createElement('button');
      nextButton.id = 'next-step';
      nextButton.className = 'btn btn-primary';
      nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
      navContainer.appendChild(nextButton);
    }
    
    // Find wizard steps again
    const wizardSteps = document.querySelectorAll('.wizard-step');
    if (wizardSteps && wizardSteps.length > 0) {
      // Add navigation handlers
      addNavigationHandlers(nextButton, prevButton, wizardSteps);
      
      // Initialize progress indicators
      initializeProgressIndicators(wizardSteps.length);
      
      console.log('[Wizard Utils] Created navigation buttons and initialized wizard');
    } else {
      console.warn('[Wizard Utils] Created navigation buttons but wizard steps not found');
    }
  }
  
  function addNavigationHandlers(nextButton, prevButton, wizardSteps) {
    // Next button handler
    nextButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Find current active step
      const activeStep = document.querySelector('.wizard-step.active');
      if (!activeStep) return;
      
      // Get current step number
      const currentStep = parseInt(activeStep.getAttribute('data-step'), 10) || 
                         window.WizardUtils.state.currentStep;
      
      if (isNaN(currentStep)) return;
      
      // Don't proceed if this is the last step
      if (currentStep >= wizardSteps.length) return;
      
      // Find next step
      const nextStep = document.querySelector(`.wizard-step[data-step="${currentStep + 1}"]`);
      if (!nextStep) return;
      
      // Update step display
      activeStep.classList.remove('active');
      nextStep.classList.add('active');
      
      // Update state
      window.WizardUtils.state.currentStep = currentStep + 1;
      
      // Update buttons
      prevButton.removeAttribute('disabled');
      if (currentStep + 1 >= wizardSteps.length) {
        this.textContent = 'Calculate';
        this.classList.add('btn-calculate');
      }
      
      // Update progress
      updateProgress(currentStep + 1, wizardSteps.length);
      
      // Dispatch step change event
      const event = new CustomEvent('wizardStepChange', {
        detail: { 
          currentStep: currentStep + 1,
          totalSteps: wizardSteps.length
        }
      });
      document.dispatchEvent(event);
    });
    
    // Previous button handler
    prevButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Find current active step
      const activeStep = document.querySelector('.wizard-step.active');
      if (!activeStep) return;
      
      // Get current step number
      const currentStep = parseInt(activeStep.getAttribute('data-step'), 10) || 
                         window.WizardUtils.state.currentStep;
      
      if (isNaN(currentStep) || currentStep <= 1) return;
      
      // Find previous step
      const prevStep = document.querySelector(`.wizard-step[data-step="${currentStep - 1}"]`);
      if (!prevStep) return;
      
      // Update step display
      activeStep.classList.remove('active');
      prevStep.classList.add('active');
      
      // Update state
      window.WizardUtils.state.currentStep = currentStep - 1;
      
      // Update buttons
      nextButton.textContent = 'Next';
      nextButton.classList.remove('btn-calculate');
      if (currentStep - 1 <= 1) {
        this.setAttribute('disabled', 'disabled');
      }
      
      // Update progress
      updateProgress(currentStep - 1, wizardSteps.length);
      
      // Dispatch step change event
      const event = new CustomEvent('wizardStepChange', {
        detail: { 
          currentStep: currentStep - 1,
          totalSteps: wizardSteps.length
        }
      });
      document.dispatchEvent(event);
    });
    
    // Also handle calculate click if it exists separately
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', function() {
        // Switch from wizard to results
        const wizardContainer = document.getElementById('wizard-container');
        const resultsContainer = document.getElementById('results-container');
        
        if (wizardContainer && resultsContainer) {
          wizardContainer.classList.add('hidden');
          resultsContainer.classList.remove('hidden');
          
          // Update state
          window.WizardUtils.state.isComplete = true;
          
          // Trigger window resize to ensure charts render properly
          window.dispatchEvent(new Event('resize'));
          
          // Dispatch wizard complete event
          const event = new CustomEvent('wizardComplete', {
            detail: { totalSteps: wizardSteps.length }
          });
          document.dispatchEvent(event);
        }
      });
    }
  }
  
  function initializeProgressIndicators(totalSteps) {
    // Find progress container
    const progressSteps = document.getElementById('progress-steps');
    if (!progressSteps) return;
    
    // Clear existing indicators
    progressSteps.innerHTML = '';
    
    // Create step indicators
    for (let i = 1; i <= totalSteps; i++) {
      const step = document.createElement('div');
      step.className = `progress-step ${i === 1 ? 'active' : ''}`;
      step.setAttribute('data-step', i);
      
      const stepNumber = document.createElement('div');
      stepNumber.className = 'step-number';
      stepNumber.textContent = i;
      
      step.appendChild(stepNumber);
      progressSteps.appendChild(step);
    }
    
    // Initialize progress fill
    updateProgress(1, totalSteps);
  }
  
  function updateProgress(currentStep, totalSteps) {
    const progressFill = document.getElementById('wizard-progress-fill');
    const stepIndicators = document.querySelectorAll('.progress-step');
    
    if (progressFill) {
      const percentage = (currentStep / totalSteps) * 100;
      progressFill.style.width = `${percentage}%`;
    }
    
    if (stepIndicators.length > 0) {
      stepIndicators.forEach((indicator, index) => {
        if (index + 1 < currentStep) {
          indicator.classList.add('completed');
          indicator.classList.remove('active');
        } else if (index + 1 === currentStep) {
          indicator.classList.add('active');
          indicator.classList.remove('completed');
        } else {
          indicator.classList.remove('active', 'completed');
        }
      });
    }
  }
  
  // Public methods
  window.WizardUtils.goToStep = function(stepNumber) {
    const wizardSteps = document.querySelectorAll('.wizard-step');
    if (!wizardSteps || wizardSteps.length === 0) return false;
    
    if (stepNumber < 1 || stepNumber > wizardSteps.length) return false;
    
    // Find target step
    const targetStep = document.querySelector(`.wizard-step[data-step="${stepNumber}"]`);
    if (!targetStep) return false;
    
    // Hide current active step
    const activeStep = document.querySelector('.wizard-step.active');
    if (activeStep) {
      activeStep.classList.remove('active');
    }
    
    // Show target step
    targetStep.classList.add('active');
    
    // Update state
    window.WizardUtils.state.currentStep = stepNumber;
    
    // Update progress
    updateProgress(stepNumber, wizardSteps.length);
    
    // Update buttons
    const nextButton = document.getElementById('next-step');
    const prevButton = document.getElementById('prev-step');
    
    if (prevButton) {
      if (stepNumber <= 1) {
        prevButton.setAttribute('disabled', 'disabled');
      } else {
        prevButton.removeAttribute('disabled');
      }
    }
    
    if (nextButton) {
      if (stepNumber >= wizardSteps.length) {
        nextButton.textContent = 'Calculate';
        nextButton.classList.add('btn-calculate');
      } else {
        nextButton.textContent = 'Next';
        nextButton.classList.remove('btn-calculate');
      }
    }
    
    // Dispatch step change event
    const event = new CustomEvent('wizardStepChange', {
      detail: { 
        currentStep: stepNumber,
        totalSteps: wizardSteps.length
      }
    });
    document.dispatchEvent(event);
    
    return true;
  };
  
  // Complete wizard and show results
  window.WizardUtils.complete = function() {
    const wizardContainer = document.getElementById('wizard-container');
    const resultsContainer = document.getElementById('results-container');
    
    if (wizardContainer && resultsContainer) {
      wizardContainer.classList.add('hidden');
      resultsContainer.classList.remove('hidden');
      
      // Update state
      window.WizardUtils.state.isComplete = true;
      
      // Trigger window resize to ensure charts render properly
      window.dispatchEvent(new Event('resize'));
      
      // Dispatch wizard complete event
      const event = new CustomEvent('wizardComplete', {
        detail: { totalSteps: window.WizardUtils.state.totalSteps }
      });
      document.dispatchEvent(event);
      
      return true;
    }
    
    return false;
  };
  
  // Reset wizard to first step
  window.WizardUtils.reset = function() {
    const wizardContainer = document.getElementById('wizard-container');
    const resultsContainer = document.getElementById('results-container');
    
    if (wizardContainer && resultsContainer) {
      wizardContainer.classList.remove('hidden');
      resultsContainer.classList.add('hidden');
      
      // Go to first step
      window.WizardUtils.goToStep(1);
      
      // Update state
      window.WizardUtils.state.isComplete = false;
      
      return true;
    }
    
    return false;
  };
})();
