/**
 * Wizard Steps Fix
 * Ensures that wizard navigation buttons are properly displayed in each step
 */

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Select all wizard steps
    const wizardSteps = document.querySelectorAll('.wizard-step');
    
    wizardSteps.forEach((step, index) => {
      // Check if step already has navigation
      if (!step.querySelector('.wizard-navigation')) {
        // Create navigation container
        const navigationContainer = document.createElement('div');
        navigationContainer.className = 'wizard-navigation';
        
        // Create previous button
        const prevButton = document.createElement('button');
        prevButton.id = `prev-step-${index + 1}`;
        prevButton.className = 'btn btn-outline prev-step';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
        
        // Disable previous button for first step
        if (index === 0) {
          prevButton.disabled = true;
          prevButton.classList.add('disabled');
        }
        
        // Create next button
        const nextButton = document.createElement('button');
        nextButton.id = `next-step-${index + 1}`;
        nextButton.className = 'btn btn-primary next-step';
        
        // Use different text for last step
        if (index === wizardSteps.length - 1) {
          nextButton.innerHTML = '<i class="fas fa-calculator"></i> Calculate';
          nextButton.classList.add('btn-success');
        } else {
          nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        }
        
        // Add buttons to navigation container
        navigationContainer.appendChild(prevButton);
        navigationContainer.appendChild(nextButton);
        
        // Find header or create footer section to add navigation
        const stepHeader = step.querySelector('.step-header');
        if (stepHeader) {
          // Check if navigation already exists in header
          if (!stepHeader.querySelector('.wizard-navigation')) {
            stepHeader.appendChild(navigationContainer);
          }
        } else {
          // Create footer section if header doesn't exist
          const stepFooter = document.createElement('div');
          stepFooter.className = 'step-footer';
          stepFooter.appendChild(navigationContainer);
          step.appendChild(stepFooter);
        }
      }
    });
    
    // Add event listeners to all navigation buttons
    document.querySelectorAll('.prev-step').forEach(button => {
      button.addEventListener('click', function() {
        if (typeof WizardManager !== 'undefined' && typeof WizardManager.goToPreviousStep === 'function') {
          WizardManager.goToPreviousStep();
        }
      });
    });
    
    document.querySelectorAll('.next-step').forEach(button => {
      button.addEventListener('click', function() {
        if (typeof WizardManager !== 'undefined' && typeof WizardManager.goToNextStep === 'function') {
          WizardManager.goToNextStep();
        }
      });
    });
  });
})();
