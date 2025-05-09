/**
 * Wizard Fixes for NAC Architecture Designer Pro
 * Ensures the wizard UI is properly displayed and functional
 */

// Execute after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying wizard fixes...');
  
  // Fix wizard modal
  fixWizardModal();
  
  // Fix wizard navigation
  fixWizardNavigation();
  
  console.log('Wizard fixes applied');
});

/**
 * Fix wizard modal display
 */
function fixWizardModal() {
  // Ensure the wizard container is properly styled
  const wizardContainer = document.getElementById('wizard-container');
  if (wizardContainer) {
    // Apply proper styling
    wizardContainer.style.maxWidth = '1000px';
    wizardContainer.style.margin = '0 auto';
    wizardContainer.style.padding = '2rem 1rem';
    wizardContainer.style.backgroundColor = 'white';
    wizardContainer.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    wizardContainer.style.borderRadius = '8px';
    
    // Ensure the container is visible
    wizardContainer.style.display = 'block';
  }
  
  // Fix wizard button in header
  const wizardButton = document.querySelector('button[data-target="#wizardModal"], .tco-wizard-btn, #tco-wizard-btn');
  if (wizardButton) {
    wizardButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Show the wizard
      const wizardModal = document.getElementById('wizardModal') || document.getElementById('wizard-container');
      if (wizardModal) {
        wizardModal.style.display = 'block';
      } else {
        console.warn('Wizard modal not found');
      }
    });
  }
}

/**
 * Fix wizard navigation
 */
function fixWizardNavigation() {
  // Find wizard navigation elements
  const nextButton = document.getElementById('wizard-next');
  const prevButton = document.getElementById('wizard-prev');
  const submitButton = document.getElementById('wizard-submit');
  
  // Fix navigation button styling
  [nextButton, prevButton, submitButton].forEach(button => {
    if (button) {
      // Apply consistent styling
      button.style.display = 'inline-flex';
      button.style.alignItems = 'center';
      button.style.justifyContent = 'center';
      button.style.padding = '0.75rem 1.5rem';
      button.style.borderRadius = '0.375rem';
      button.style.fontWeight = '500';
      button.style.cursor = 'pointer';
      button.style.transition = 'all 0.15s ease';
    }
  });
  
  // Fix wizard step visibility
  const wizardSteps = document.querySelectorAll('.wizard-step');
  if (wizardSteps.length > 0) {
    // Hide all steps except the active one
    let activeStepFound = false;
    
    wizardSteps.forEach((step, index) => {
      if (step.classList.contains('active')) {
        step.style.display = 'block';
        activeStepFound = true;
      } else {
        step.style.display = 'none';
      }
    });
    
    // If no active step found, show the first one
    if (!activeStepFound && wizardSteps.length > 0) {
      wizardSteps[0].style.display = 'block';
      wizardSteps[0].classList.add('active');
    }
  }
}
