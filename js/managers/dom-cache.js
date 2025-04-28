/**
 * DOM cache and performance optimization
 * Enhanced to improve document access performance
 */
class DOMCache {
  constructor() {
    this.elements = {};
    this.initialized = false;
    this.observedElements = new Map();
    this.debounceTimers = {};
    this.throttleTimers = {};
    this.mutationObserver = null;
    
    // Initialize mutation observer for watching DOM changes
    this.initMutationObserver();
  }
  
  initMutationObserver() {
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          this.handleDomChanges(mutation.addedNodes);
        }
      });
    });
  }
  
  handleDomChanges(nodes) {
    // Check if any observed elements have been added to the DOM
    this.observedElements.forEach((callback, selector) => {
      nodes.forEach(node => {
        if (node.nodeType === 1) { // Element node
          if (node.matches && node.matches(selector)) {
            callback(node);
          }
          
          // Check if any children match the selector
          const matches = node.querySelectorAll(selector);
          matches.forEach(match => callback(match));
        }
      });
    });
  }
  
  observeElement(selector, callback) {
    this.observedElements.set(selector, callback);
    
    // Immediately check for existing elements
    document.querySelectorAll(selector).forEach(elem => {
      callback(elem);
    });
  }
  
  init() {
    if (this.initialized) return;
    
    // Cache frequently accessed elements
    this.cacheElement('device-count');
    this.cacheElement('organization-size');
    this.cacheElement('years-to-project');
    this.cacheElement('multiple-locations');
    this.cacheElement('location-count');
    this.cacheElement('complex-authentication');
    this.cacheElement('legacy-devices');
    this.cacheElement('legacy-percentage');
    this.cacheElement('cloud-integration');
    this.cacheElement('custom-policies');
    this.cacheElement('policy-complexity');
    this.cacheElement('calculate-btn');
    this.cacheElement('results-container');
    this.cacheElement('tco-summary-table-body');
    this.cacheElement('message-container');
    this.cacheElement('portnox-savings-amount');
    this.cacheElement('portnox-savings-percentage');
    this.cacheElement('portnox-implementation-time');
    this.cacheElement('comparison-savings');
    this.cacheElement('comparison-implementation');
    this.cacheElement('legacy-percentage-value');
    this.cacheElement('annual-costs-table-body');
    this.cacheElement('implementation-table-body');
    
    // Cache all charts
    this.cacheElement('tco-comparison-chart');
    this.cacheElement('cumulative-cost-chart');
    this.cacheElement('current-breakdown-chart');
    this.cacheElement('alternative-breakdown-chart');
    
    // Cache vendor cards
    document.querySelectorAll('.vendor-card').forEach(card => {
      const vendor = card.getAttribute('data-vendor');
      if (vendor) {
        this.elements[`vendor-card-${vendor}`] = card;
      }
    });
    
    // Start observing the body for future DOM changes
    this.mutationObserver.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // Setup range input event bindings
    this.setupRangeValueDisplay('legacy-percentage', 'legacy-percentage-value', '%');
    
    // Setup toggle functionality
    this.setupToggleHandlers();
    
    this.initialized = true;
  }
  
  setupRangeValueDisplay(rangeId, valueId, suffix = '') {
    const rangeEl = this.get(rangeId);
    const valueEl = this.get(valueId);
    
    if (rangeEl && valueEl) {
      // Set initial value
      valueEl.textContent = rangeEl.value + suffix;
      
      // Update value on input
      rangeEl.addEventListener('input', () => {
        valueEl.textContent = rangeEl.value + suffix;
      });
    }
  }
  
  setupToggleHandlers() {
    // Advanced options toggle
    const advancedOptionsToggle = document.querySelector('.advanced-options-toggle button');
    const advancedOptionsPanel = document.getElementById('advanced-options-panel');
    
    if (advancedOptionsToggle && advancedOptionsPanel) {
      advancedOptionsToggle.addEventListener('click', () => {
        advancedOptionsPanel.classList.toggle('hidden');
        
        // Update the icon
        const icon = advancedOptionsToggle.querySelector('i');
        if (icon) {
          if (advancedOptionsPanel.classList.contains('hidden')) {
            icon.className = 'fas fa-angle-down';
          } else {
            icon.className = 'fas fa-angle-up';
          }
        }
      });
    }
    
    // Handle conditional displays
    const multipleLocations = this.get('multiple-locations');
    const locationCountContainer = document.getElementById('location-count').closest('.input-group');
    
    if (multipleLocations && locationCountContainer) {
      multipleLocations.addEventListener('change', () => {
        locationCountContainer.style.display = multipleLocations.checked ? 'block' : 'none';
      });
      
      // Set initial state
      locationCountContainer.style.display = multipleLocations.checked ? 'block' : 'none';
    }
    
    const legacyDevices = this.get('legacy-devices');
    const legacyPercentageContainer = document.getElementById('legacy-percentage').closest('.input-group');
    
    if (legacyDevices && legacyPercentageContainer) {
      legacyDevices.addEventListener('change', () => {
        legacyPercentageContainer.style.display = legacyDevices.checked ? 'block' : 'none';
      });
      
      // Set initial state
      legacyPercentageContainer.style.display = legacyDevices.checked ? 'block' : 'none';
    }
    
    const customPolicies = this.get('custom-policies');
    const policyComplexityContainer = document.getElementById('policy-complexity').closest('.input-group');
    
    if (customPolicies && policyComplexityContainer) {
      customPolicies.addEventListener('change', () => {
        policyComplexityContainer.style.display = customPolicies.checked ? 'block' : 'none';
      });
      
      // Set initial state
      policyComplexityContainer.style.display = customPolicies.checked ? 'block' : 'none';
    }
  }
  
  cacheElement(id) {
    const element = document.getElementById(id);
    if (element) {
      this.elements[id] = element;
    }
  }
  
  get(id) {
    if (!this.initialized) this.init();
    
    // If element is not cached, try to get it and cache it
    if (!this.elements[id]) {
      this.cacheElement(id);
    }
    
    return this.elements[id];
  }
  
  // Helper methods for common operations
  getInputValue(id) {
    const element = this.get(id);
    if (!element) return null;
    
    if (element.type === 'checkbox') {
      return element.checked;
    } else if (element.type === 'number') {
      return parseFloat(element.value) || 0;
    } else {
      return element.value;
    }
  }
  
  setInputValue(id, value) {
    const element = this.get(id);
    if (!element) return;
    
    if (element.type === 'checkbox') {
      element.checked = Boolean(value);
    } else {
      element.value = value;
    }
    
    // Trigger change event to update dependent elements
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }
  
  // Debounce method for limiting rapid execution of functions
  debounce(func, wait, id) {
    return (...args) => {
      clearTimeout(this.debounceTimers[id]);
      this.debounceTimers[id] = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }
  
  // Throttle method for limiting execution frequency
  throttle(func, limit, id) {
    return (...args) => {
      if (!this.throttleTimers[id]) {
        func.apply(this, args);
        this.throttleTimers[id] = true;
        setTimeout(() => {
          this.throttleTimers[id] = false;
        }, limit);
      }
    };
  }
}
