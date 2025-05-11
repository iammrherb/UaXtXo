/**
 * Wizard Functionality Fixes for NAC Total Cost Analyzer
 * Addresses issues with the wizard and improves the UI
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing wizard fixes');
  
  // Fix vendor cards
  enhanceVendorCards();
  
  // Fix wizard navigation
  enhanceWizardNavigation();
  
  // Add logo images to vendor cards
  addVendorLogos();
  
  // Fix tab navigation
  enhanceTabNavigation();
  
  console.log('Wizard fixes initialized');
});

/**
 * Enhance vendor cards with improved styling and behavior
 */
function enhanceVendorCards() {
  // Find vendor cards
  const vendorCards = document.querySelectorAll('.vendor-card, .vendor-option');
  if (vendorCards.length === 0) return;
  
  console.log(`Found ${vendorCards.length} vendor cards to enhance`);
  
  // Add required classes and attributes
  vendorCards.forEach(card => {
    // Make sure it has the vendor-card class
    card.classList.add('vendor-card');
    
    // Get vendor data
    const vendorId = card.getAttribute('data-vendor') || 
                    card.getAttribute('data-option') || 
                    card.getAttribute('id')?.replace('vendor-', '');
    
    if (!vendorId) return;
    
    // Set data attribute
    card.setAttribute('data-vendor', vendorId);
    
    // Check if it's already selected
    const isSelected = card.classList.contains('selected') || 
                      card.classList.contains('active') || 
                      card.getAttribute('data-selected') === 'true';
    
    if (isSelected) {
      card.classList.add('selected');
    }
    
    // Add click handler if not already present
    if (!card._hasClickHandler) {
      card.addEventListener('click', () => {
        // Remove selected class from all cards
        vendorCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked card
        card.classList.add('selected');
        
        // Trigger vendor selection event
        const event = new CustomEvent('vendor-selected', {
          detail: { vendor: vendorId }
        });
        document.dispatchEvent(event);
        
        // Try to update UI if a controller is available
        if (window.uiController && typeof window.uiController.setActiveVendor === 'function') {
          window.uiController.setActiveVendor(vendorId);
        }
      });
      
      card._hasClickHandler = true;
    }
  });
}

/**
 * Enhance wizard navigation
 */
function enhanceWizardNavigation() {
  // Find wizard steps
  const wizardSteps = document.querySelectorAll('.wizard-step, .step-indicator');
  if (wizardSteps.length === 0) return;
  
  console.log(`Found ${wizardSteps.length} wizard steps to enhance`);
  
  // Find current active step
  const activeStep = Array.from(wizardSteps).findIndex(step => 
    step.classList.contains('active') || 
    step.classList.contains('current')
  );
  
  // Add appropriate classes
  wizardSteps.forEach((step, index) => {
    // Make sure it has the wizard-step class
    step.classList.add('wizard-step');
    
    // Add active class to current step
    if (index === activeStep) {
      step.classList.add('active');
    }
    
    // Add completed class to previous steps
    if (index < activeStep) {
      step.classList.add('completed');
    }
    
    // Set step number if not already present
    if (!step.querySelector('.wizard-step-number')) {
      // Get or create step number
      let stepNumber = step.querySelector('.step-number');
      if (!stepNumber) {
        stepNumber = document.createElement('div');
        stepNumber.className = 'wizard-step-number';
        stepNumber.textContent = index + 1;
        step.prepend(stepNumber);
      } else {
        stepNumber.classList.add('wizard-step-number');
      }
    }
    
    // Set step label if not already present
    if (!step.querySelector('.wizard-step-label')) {
      // Get or create step label
      let stepLabel = step.querySelector('.step-label');
      if (!stepLabel) {
        stepLabel = document.createElement('div');
        stepLabel.className = 'wizard-step-label';
        
        // Try to determine step name
        const stepNames = ['Organization', 'Infrastructure', 'Requirements', 'Preferences', 'Results'];
        stepLabel.textContent = stepNames[index] || `Step ${index + 1}`;
        
        step.appendChild(stepLabel);
      } else {
        stepLabel.classList.add('wizard-step-label');
      }
    }
  });
  
  // Initialize charts if needed
  initializeCharts();
}

/**
 * Initialize charts for wizard
 */
function initializeCharts() {
  if (typeof window.chartBuilder === 'undefined') {
    console.warn('Chart builder not available');
    return;
  }
  
  // Initialize charts
  window.chartBuilder.initCharts();
  
  // Update charts if a vendor is selected
  const activeVendor = document.querySelector('.vendor-card.selected')?.getAttribute('data-vendor');
  if (activeVendor) {
    // Update charts
    window.chartBuilder.updateTCOComparisonChart();
    window.chartBuilder.updateFeatureComparisonChart(activeVendor);
    window.chartBuilder.updateCumulativeCostChart();
    window.chartBuilder.updateROIChart();
  }
}

/**
 * Add logo images to vendor cards
 */
function addVendorLogos() {
  // Find vendor cards
  const vendorCards = document.querySelectorAll('.vendor-card');
  if (vendorCards.length === 0) return;
  
  // Vendor logo URLs
  const logoUrls = {
    portnox: 'img/logos/portnox-logo.png',
    cisco: 'img/logos/cisco-logo.png',
    aruba: 'img/logos/aruba-logo.png',
    forescout: 'img/logos/forescout-logo.png',
    nps: 'img/logos/microsoft-logo.png',
    fortinac: 'img/logos/fortinet-logo.png',
    securew2: 'img/logos/securew2-logo.png'
  };
  
  // Fallback icons
  const fallbackIcons = {
    portnox: '<i class="fas fa-shield-alt" style="color: #2bd25b;"></i>',
    cisco: '<i class="fas fa-network-wired" style="color: #0085ca;"></i>',
    aruba: '<i class="fas fa-wifi" style="color: #ff7a00;"></i>',
    forescout: '<i class="fas fa-eye" style="color: #004f9f;"></i>',
    nps: '<i class="fas fa-windows" style="color: #00a4ef;"></i>',
    fortinac: '<i class="fas fa-lock" style="color: #ee3124;"></i>',
    securew2: '<i class="fas fa-key" style="color: #8bc53f;"></i>'
  };
  
  // Add logos to cards
  vendorCards.forEach(card => {
    // Get vendor data
    const vendorId = card.getAttribute('data-vendor');
    if (!vendorId) return;
    
    // Check if logo container already exists
    if (card.querySelector('.vendor-logo')) return;
    
    // Create vendor header if not exists
    let vendorHeader = card.querySelector('.vendor-card-header');
    if (!vendorHeader) {
      vendorHeader = document.createElement('div');
      vendorHeader.className = 'vendor-card-header';
      
      // Get vendor name element
      const vendorName = card.querySelector('.vendor-name') || card.querySelector('h3');
      
      // If vendor name exists, move it to the header
      if (vendorName) {
        card.removeChild(vendorName);
        vendorHeader.appendChild(vendorName);
      } else {
        // Create vendor name
        const nameElement = document.createElement('div');
        nameElement.className = 'vendor-name';
        
        // Try to get vendor name
        const vendorNames = {
          portnox: 'Portnox Cloud',
          cisco: 'Cisco ISE',
          aruba: 'Aruba ClearPass',
          forescout: 'Forescout',
          nps: 'Microsoft NPS',
          fortinac: 'FortiNAC',
          securew2: 'SecureW2'
        };
        
        nameElement.textContent = vendorNames[vendorId] || vendorId;
        vendorHeader.appendChild(nameElement);
      }
      
      // Insert header at the beginning of the card
      card.prepend(vendorHeader);
    }
    
    // Create logo container
    const logoContainer = document.createElement('div');
    logoContainer.className = 'vendor-logo';
    
    // Try to load logo image
    if (logoUrls[vendorId]) {
      const logoImg = document.createElement('img');
      logoImg.src = logoUrls[vendorId];
      logoImg.alt = vendorId + ' logo';
      
      // Add error handler to use fallback
      logoImg.onerror = () => {
        logoContainer.innerHTML = fallbackIcons[vendorId] || '<i class="fas fa-building"></i>';
      };
      
      logoContainer.appendChild(logoImg);
    } else {
      // Use fallback icon
      logoContainer.innerHTML = fallbackIcons[vendorId] || '<i class="fas fa-building"></i>';
    }
    
    // Add logo to header
    vendorHeader.prepend(logoContainer);
  });
}

/**
 * Enhance tab navigation
 */
function enhanceTabNavigation() {
  // Find tab navigation elements
  const tabNavs = document.querySelectorAll('.tab-navigation, .tabs, .nav-tabs');
  if (tabNavs.length === 0) return;
  
  console.log(`Found ${tabNavs.length} tab navigations to enhance`);
  
  tabNavs.forEach(tabNav => {
    // Add tab-nav class
    tabNav.classList.add('tab-nav');
    
    // Process tab items
    const tabItems = tabNav.querySelectorAll('.tab, .tab-item, .nav-item');
    
    tabItems.forEach(tab => {
      // Add tab-nav-item class
      tab.classList.add('tab-nav-item');
      
      // Check if it's active
      if (tab.classList.contains('active') || tab.getAttribute('data-active') === 'true') {
        tab.classList.add('active');
      }
      
      // Add click handler if not already present
      if (!tab._hasClickHandler) {
        tab.addEventListener('click', () => {
          // Get tab id
          const tabId = tab.getAttribute('data-tab') || 
                       tab.getAttribute('data-target');
          
          if (!tabId) return;
          
          // Remove active class from all tabs
          tabItems.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          tab.classList.add('active');
          
          // Hide all tab content
          const tabContents = document.querySelectorAll('.tab-content, .tab-pane');
          tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
          });
          
          // Show selected tab content
          const selectedContent = document.getElementById(tabId) || 
                                document.querySelector(`[data-id="${tabId}"]`);
          
          if (selectedContent) {
            selectedContent.classList.add('active');
            selectedContent.style.display = 'block';
          }
        });
        
        tab._hasClickHandler = true;
      }
    });
  });
}
