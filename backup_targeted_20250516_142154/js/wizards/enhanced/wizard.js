/**
 * Enhanced Wizard Controller for Total Cost Analyzer
 * Manages the wizard flow and navigation
 */

const WizardController = (function() {
  // Wizard configuration
  const config = {
    stepCount: 5,
    currentStep: 1,
    stepIds: ['step-1', 'step-2', 'step-3', 'step-4', 'step-5'],
    stepTitles: [
      'Select Your Current NAC Solution',
      'Industry & Compliance Requirements',
      'Organization Configuration',
      'Advanced Cost Configuration',
      'Review Configuration'
    ]
  };
  
  // Initialize wizard
  function init() {
    console.log('Initializing Wizard Controller...');
    
    // Create step indicators
    createStepIndicators();
    
    // Initialize navigation buttons
    initNavigation();
    
    // Add event listeners to vendor cards
    addVendorCardListeners();
    
    // Add event listeners to industry select
    addIndustrySelectListeners();
    
    // Initialize cost configuration tabs
    initCostTabs();
    
    // Add event listeners to sliders
    addSliderListeners();
    
    // Set up calculation button
    setupCalculationButton();
    
    console.log('Wizard Controller initialized');
  }
  
  // Create step indicators
  function createStepIndicators() {
    const stepsContainer = document.getElementById('progress-steps');
    if (!stepsContainer) return;
    
    stepsContainer.innerHTML = '';
    
    for (let i = 0; i < config.stepCount; i++) {
      const stepIndex = i + 1;
      const isActive = stepIndex === config.currentStep;
      const isCompleted = stepIndex < config.currentStep;
      
      const stepIndicator = document.createElement('div');
      stepIndicator.className = 'step-indicator';
      stepIndicator.dataset.step = stepIndex;
      
      const stepDot = document.createElement('div');
      stepDot.className = `step-dot${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`;
      
      const stepLabel = document.createElement('div');
      stepLabel.className = `step-label${isActive ? ' active' : ''}`;
      stepLabel.textContent = config.stepTitles[i];
      
      stepIndicator.appendChild(stepDot);
      stepIndicator.appendChild(stepLabel);
      stepsContainer.appendChild(stepIndicator);
    }
    
    // Update progress bar
    updateProgressBar();
  }
  
  // Update progress bar
  function updateProgressBar() {
    const progressFill = document.getElementById('wizard-progress-fill');
    if (progressFill) {
      const progressPercentage = ((config.currentStep - 1) / (config.stepCount - 1)) * 100;
      progressFill.style.width = `${progressPercentage}%`;
    }
  }
  
  // Initialize navigation buttons
  function initNavigation() {
    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');
    
    if (prevButton) {
      prevButton.addEventListener('click', function() {
        goToPreviousStep();
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', function() {
        goToNextStep();
      });
    }
    
    // Add navigation buttons to all steps if they don't exist
    document.querySelectorAll('.wizard-step').forEach(step => {
      if (!step.querySelector('.wizard-navigation')) {
        const nav = document.createElement('div');
        nav.className = 'wizard-navigation';
        nav.innerHTML = `
          <button class="btn btn-outline prev-step"><i class="fas fa-chevron-left"></i> Previous</button>
          <button class="btn btn-primary next-step">Next <i class="fas fa-chevron-right"></i></button>
        `;
        
        step.appendChild(nav);
        
        // Add event listeners to the new buttons
        const newPrevButton = nav.querySelector('.prev-step');
        const newNextButton = nav.querySelector('.next-step');
        
        if (newPrevButton) {
          newPrevButton.addEventListener('click', function() {
            goToPreviousStep();
          });
        }
        
        if (newNextButton) {
          newNextButton.addEventListener('click', function() {
            goToNextStep();
          });
        }
      }
    });
    
    // Update button states based on current step
    updateNavigationButtons();
  }
  
  // Update navigation buttons
  function updateNavigationButtons() {
    const prevButtons = document.querySelectorAll('.prev-step, #prev-step');
    const nextButtons = document.querySelectorAll('.next-step, #next-step');
    
    // Update previous button
    prevButtons.forEach(button => {
      if (config.currentStep === 1) {
        button.disabled = true;
        button.classList.add('disabled');
      } else {
        button.disabled = false;
        button.classList.remove('disabled');
      }
    });
    
    // Update next button
    nextButtons.forEach(button => {
      if (config.currentStep === config.stepCount) {
        button.innerHTML = '<i class="fas fa-calculator"></i> Calculate';
        button.classList.add('btn-success');
      } else {
        button.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        button.classList.remove('btn-success');
      }
    });
  }
  
  // Go to previous step
  function goToPreviousStep() {
    if (config.currentStep > 1) {
      goToStep(config.currentStep - 1);
    }
  }
  
  // Go to next step
  function goToNextStep() {
    if (config.currentStep < config.stepCount) {
      // Validate current step
      if (validateStep(config.currentStep)) {
        goToStep(config.currentStep + 1);
      }
    } else {
      // Last step - trigger calculation
      if (validateStep(config.currentStep)) {
        triggerCalculation();
      }
    }
  }
  
  // Go to specific step
  function goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > config.stepCount) {
      console.error(`Invalid step number: ${stepNumber}`);
      return;
    }
    
    // Hide current step
    const currentStepEl = document.getElementById(config.stepIds[config.currentStep - 1]);
    if (currentStepEl) {
      currentStepEl.classList.remove('active');
    }
    
    // Show new step
    const newStepEl = document.getElementById(config.stepIds[stepNumber - 1]);
    if (newStepEl) {
      newStepEl.classList.add('active');
    }
    
    // Update current step
    config.currentStep = stepNumber;
    
    // Update step indicators
    createStepIndicators();
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Scroll to top of step
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Validate current step
  function validateStep(stepNumber) {
    switch (stepNumber) {
      case 1:
        // Validate vendor selection
        const selectedVendor = document.querySelector('.vendor-card.active');
        if (!selectedVendor) {
          showValidationError('Please select a vendor');
          return false;
        }
        return true;
        
      case 2:
        // Validate industry selection
        const industrySelect = document.getElementById('industry-select');
        if (!industrySelect || !industrySelect.value) {
          showValidationError('Please select an industry');
          return false;
        }
        return true;
        
      case 3:
        // Validate organization details
        const deviceCount = document.getElementById('device-count');
        if (!deviceCount || isNaN(parseInt(deviceCount.value)) || parseInt(deviceCount.value) <= 0) {
          showValidationError('Please enter a valid device count');
          return false;
        }
        return true;
        
      case 4:
        // Validate cost configuration
        return true; // All inputs have defaults
        
      case 5:
        // Validate review
        return true; // Just a review screen
        
      default:
        return true;
    }
  }
  
  // Show validation error
  function showValidationError(message) {
    if (typeof NotificationManager !== 'undefined' && 
        typeof NotificationManager.error === 'function') {
      NotificationManager.error(message);
    } else {
      alert(message);
    }
  }
  
  // Add event listeners to vendor cards
  function addVendorCardListeners() {
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
      card.addEventListener('click', function() {
        // Remove active class from all cards
        vendorCards.forEach(c => c.classList.remove('active'));
        
        // Add active class to selected card
        this.classList.add('active');
        
        // Show vendor preview if available
        const vendorId = this.dataset.vendor;
        showVendorPreview(vendorId);
      });
    });
  }
  
  // Show vendor preview
  function showVendorPreview(vendorId) {
    const previewContainer = document.getElementById('vendor-preview');
    if (!previewContainer) return;
    
    // If vendor data is available
    if (typeof VendorData !== 'undefined' && 
        typeof VendorData.getVendorById === 'function') {
      
      const vendor = VendorData.getVendorById(vendorId);
      
      if (vendor) {
        previewContainer.innerHTML = `
          <div class="vendor-preview-card">
            <h3>Selected Vendor: ${vendor.name}</h3>
            <div class="preview-details">
              <div class="preview-item">
                <span class="label">Deployment Type:</span>
                <span class="value">${vendor.deploymentType}</span>
              </div>
              <div class="preview-item">
                <span class="label">Hardware Required:</span>
                <span class="value">${vendor.hardwareRequired ? 'Yes' : 'No'}</span>
              </div>
              <div class="preview-item">
                <span class="label">Licensing Model:</span>
                <span class="value">${vendor.licensingModel}</span>
              </div>
            </div>
          </div>
        `;
      } else {
        previewContainer.innerHTML = '';
      }
    } else {
      // Fallback if vendor data is not available
      const vendorNames = {
        'cisco': 'Cisco ISE',
        'aruba': 'Aruba ClearPass',
        'forescout': 'Forescout',
        'fortinac': 'FortiNAC',
        'nps': 'Microsoft NPS',
        'securew2': 'SecureW2',
        'juniper': 'Juniper Mist',
        'foxpass': 'Foxpass',
        'arista': 'Arista Agni',
        'noNac': 'No NAC Solution'
      };
      
      const vendorName = vendorNames[vendorId] || vendorId;
      
      previewContainer.innerHTML = `
        <div class="vendor-preview-card">
          <h3>Selected: ${vendorName}</h3>
          <p>You will compare this solution with Portnox Cloud.</p>
        </div>
      `;
    }
  }
  
  // Add event listeners to industry select
  function addIndustrySelectListeners() {
    const industrySelect = document.getElementById('industry-select');
    if (!industrySelect) return;
    
    industrySelect.addEventListener('change', function() {
      const selectedIndustry = this.value;
      
      // If compliance frameworks component is available
      if (typeof IndustryCompliance !== 'undefined' && 
          typeof IndustryCompliance.init === 'function') {
        
        IndustryCompliance.init();
      } else {
        // Simple fallback
        const frameworksContainer = document.getElementById('compliance-frameworks');
        if (frameworksContainer) {
          frameworksContainer.innerHTML = '<div class="loading">Loading compliance frameworks...</div>';
        }
      }
    });
  }
  
  // Initialize cost configuration tabs
  function initCostTabs() {
    const tabButtons = document.querySelectorAll('.cost-tab');
    const tabPanels = document.querySelectorAll('.cost-panel');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabName = this.dataset.tab;
        
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to selected button and panel
        this.classList.add('active');
        document.getElementById(`${tabName}-costs`)?.classList.add('active');
      });
    });
  }
  
  // Add event listeners to sliders
  function addSliderListeners() {
    const sliders = document.querySelectorAll('input[type="range"]');
    
    sliders.forEach(slider => {
      const valueDisplay = slider.nextElementSibling;
      
      // Update display value on input
      slider.addEventListener('input', function() {
        if (valueDisplay && valueDisplay.classList.contains('slider-value')) {
          let displayValue = this.value;
          
          // Format based on slider ID
          if (this.id.includes('cost') || this.id.includes('rate')) {
            displayValue = `$${parseInt(displayValue).toLocaleString()}`;
          } else if (this.id.includes('percentage') || this.id.includes('allocation') || this.id.includes('discount')) {
            displayValue = `${displayValue}%`;
          } else if (this.id.includes('days')) {
            displayValue = `${displayValue} days`;
          } else if (this.id.includes('portnox-base-price')) {
            displayValue = `$${parseFloat(displayValue).toFixed(2)}`;
          }
          
          valueDisplay.textContent = displayValue;
          
          // Update Portnox pricing summary if relevant
          if (this.id === 'portnox-base-price' || this.id === 'portnox-discount' || this.id === 'device-count') {
            updatePortnoxPricingSummary();
          }
        }
      });
    });
    
    // Initial update for all sliders
    sliders.forEach(slider => {
      const event = new Event('input');
      slider.dispatchEvent(event);
    });
  }
  
  // Update Portnox pricing summary
  function updatePortnoxPricingSummary() {
    const basePrice = parseFloat(document.getElementById('portnox-base-price')?.value || 4);
    const discount = parseFloat(document.getElementById('portnox-discount')?.value || 20);
    const deviceCount = parseInt(document.getElementById('device-count')?.value || 2500);
    
    const effectivePrice = basePrice * (1 - discount / 100);
    const annualCost = effectivePrice * deviceCount * 12;
    
    document.getElementById('effective-price')?.textContent = `$${effectivePrice.toFixed(2)}`;
    document.getElementById('annual-cost')?.textContent = `$${annualCost.toLocaleString()}`;
  }
  
  // Set up calculation button
  function setupCalculationButton() {
    const calculateBtn = document.getElementById('calculate-btn');
    if (!calculateBtn) return;
    
    calculateBtn.addEventListener('click', function() {
      triggerCalculation();
    });
    
    // Also set up modify button
    const modifyBtn = document.getElementById('modify-btn');
    if (modifyBtn) {
      modifyBtn.addEventListener('click', function() {
        goToStep(1);
      });
    }
  }
  
  // Trigger calculation
  function triggerCalculation() {
    // Show loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.add('active');
    }
    
    // If AppController is available, use it
    if (typeof AppController !== 'undefined' && 
        typeof AppController.startCalculation === 'function') {
      
      AppController.startCalculation();
    } else {
      // Fallback behavior
      setTimeout(function() {
        // Hide wizard container
        const wizardContainer = document.getElementById('wizard-container');
        if (wizardContainer) {
          wizardContainer.classList.add('hidden');
        }
        
        // Show results container
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
          resultsContainer.classList.remove('hidden');
        }
        
        // Hide loading overlay
        if (loadingOverlay) {
          loadingOverlay.classList.remove('active');
        }
        
        // Initialize results tabs
        initResultsTabs();
        
        // Populate summary values with dummy data
        populateSummaryValues();
      }, 1500);
    }
  }
  
  // Initialize results tabs
  function initResultsTabs() {
    const tabButtons = document.querySelectorAll('.result-tab');
    const tabPanels = document.querySelectorAll('.result-panel');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabName = this.dataset.tab;
        
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to selected button and panel
        this.classList.add('active');
        document.getElementById(`${tabName}-panel`)?.classList.add('active');
      });
    });
  }
  
  // Populate summary values with dummy data
  function populateSummaryValues() {
    // Get sample values
    const sampleTotalSavings = '$250,000';
    const sampleSavingsPercentage = '65%';
    const sampleBreakeven = '3.5 months';
    const sampleRiskReduction = '75%';
    const sampleImplementationTime = '15 days';
    
    // Populate summary values
    document.getElementById('total-savings')?.textContent = sampleTotalSavings;
    document.getElementById('savings-percentage')?.textContent = sampleSavingsPercentage;
    document.getElementById('breakeven-point')?.textContent = sampleBreakeven;
    document.getElementById('risk-reduction')?.textContent = sampleRiskReduction;
    document.getElementById('implementation-time')?.textContent = sampleImplementationTime;
    
    // Populate key insights
    const insightsList = document.getElementById('key-insights-list');
    if (insightsList) {
      insightsList.innerHTML = `
        <div class="insight-item">
          <div class="insight-icon"><i class="fas fa-dollar-sign"></i></div>
          <div class="insight-content">
            <h4>Cost Savings</h4>
            <p>Portnox Cloud provides significant cost savings by eliminating hardware requirements and reducing maintenance costs.</p>
          </div>
        </div>
        <div class="insight-item">
          <div class="insight-icon"><i class="fas fa-tachometer-alt"></i></div>
          <div class="insight-content">
            <h4>Faster Implementation</h4>
            <p>Cloud-based deployment enables rapid implementation with minimal IT overhead.</p>
          </div>
        </div>
        <div class="insight-item">
          <div class="insight-icon"><i class="fas fa-shield-alt"></i></div>
          <div class="insight-content">
            <h4>Enhanced Security</h4>
            <p>Continuous compliance monitoring and zero-trust architecture significantly reduce security risks.</p>
          </div>
        </div>
        <div class="insight-item">
          <div class="insight-icon"><i class="fas fa-chart-line"></i></div>
          <div class="insight-content">
            <h4>Scalability</h4>
            <p>Cloud-based solution scales effortlessly with your organization's growth without additional hardware.</p>
          </div>
        </div>
      `;
    }
  }
  
  // Return public API
  return {
    init: init,
    goToStep: goToStep,
    goToNextStep: goToNextStep,
    goToPreviousStep: goToPreviousStep
  };
})();

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
  WizardController.init();
});

// Set the global WizardManager reference for compatibility
window.WizardManager = WizardController;
