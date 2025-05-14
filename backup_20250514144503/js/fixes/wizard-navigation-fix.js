/**
 * Wizard Navigation Fix
 * Ensures wizard navigation buttons are present and functioning correctly
 */

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Check if navigation container exists
    let navigationContainer = document.getElementById('wizard-navigation');
    
    if (!navigationContainer) {
      // Create navigation container
      navigationContainer = document.createElement('div');
      navigationContainer.id = 'wizard-navigation';
      navigationContainer.className = 'wizard-navigation';
      
      // Create navigation buttons
      const prevButton = document.createElement('button');
      prevButton.id = 'prev-step';
      prevButton.className = 'btn btn-outline';
      prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
      
      const nextButton = document.createElement('button');
      nextButton.id = 'next-step';
      nextButton.className = 'btn btn-primary';
      nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
      
      // Add buttons to container
      navigationContainer.appendChild(prevButton);
      navigationContainer.appendChild(nextButton);
      
      // Add container to each step header
      const stepHeaders = document.querySelectorAll('.step-header');
      stepHeaders.forEach(header => {
        // Clone navigation container
        const navClone = navigationContainer.cloneNode(true);
        
        // Add event listeners to navigation buttons
        const prevBtn = navClone.querySelector('#prev-step');
        const nextBtn = navClone.querySelector('#next-step');
        
        if (prevBtn) {
          prevBtn.addEventListener('click', function() {
            if (typeof WizardManager !== 'undefined' && 
                typeof WizardManager.goToPreviousStep === 'function') {
              WizardManager.goToPreviousStep();
            }
          });
        }
        
        if (nextBtn) {
          nextBtn.addEventListener('click', function() {
            if (typeof WizardManager !== 'undefined' && 
                typeof WizardManager.goToNextStep === 'function') {
              WizardManager.goToNextStep();
            }
          });
        }
        
        // Add navigation to header
        header.appendChild(navClone);
      });
    }
    
    // Check if wizard steps have active classes
    const wizardSteps = document.querySelectorAll('.wizard-step');
    let hasActiveStep = false;
    
    wizardSteps.forEach(step => {
      if (step.classList.contains('active')) {
        hasActiveStep = true;
      }
    });
    
    // If no step is active, activate the first step
    if (!hasActiveStep && wizardSteps.length > 0) {
      wizardSteps[0].classList.add('active');
    }
    
    // Update button states based on active step
    updateNavigationButtons();
    
    // Add helper function to window
    window.updateNavigationButtons = updateNavigationButtons;
  });
  
  // Update navigation buttons
  function updateNavigationButtons() {
    const wizardSteps = document.querySelectorAll('.wizard-step');
    let activeStepIndex = -1;
    
    // Find active step
    wizardSteps.forEach((step, index) => {
      if (step.classList.contains('active')) {
        activeStepIndex = index;
      }
    });
    
    if (activeStepIndex < 0) return;
    
    // Update all previous buttons
    const prevButtons = document.querySelectorAll('#prev-step');
    prevButtons.forEach(button => {
      if (activeStepIndex === 0) {
        button.disabled = true;
        button.classList.add('disabled');
      } else {
        button.disabled = false;
        button.classList.remove('disabled');
      }
    });
    
    // Update all next buttons
    const nextButtons = document.querySelectorAll('#next-step');
    nextButtons.forEach(button => {
      if (activeStepIndex === wizardSteps.length - 1) {
        button.innerHTML = '<i class="fas fa-calculator"></i> Calculate';
        button.classList.add('btn-success');
      } else {
        button.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        button.classList.remove('btn-success');
      }
    });
  }
})();
