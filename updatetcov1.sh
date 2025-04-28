#!/bin/bash

# TCO Calculator Enhancement Script
# ------------------------------------------------------
# This script implements fixes and enhancements to the TCO Calculator
# Addressing initialization issues, UI improvements, and code organization

# Set up colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting TCO Calculator enhancement script...${NC}"

# Create a backup of current files
echo -e "\n${YELLOW}Creating backup of current files...${NC}"
BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR
cp -r js/* $BACKUP_DIR/ 2>/dev/null
cp -r css/* $BACKUP_DIR/ 2>/dev/null
cp index.html $BACKUP_DIR/ 2>/dev/null

echo -e "${GREEN}Backup created in $BACKUP_DIR${NC}"

# Create necessary directories if they don't exist
mkdir -p js/managers
mkdir -p js/components
mkdir -p js/charts
mkdir -p js/utils
mkdir -p js/vendors
mkdir -p libs
mkdir -p css
mkdir -p img

# Set up Font Awesome locally
echo -e "\n${YELLOW}Setting up Font Awesome...${NC}"
mkdir -p libs/fontawesome/css
mkdir -p libs/fontawesome/webfonts

echo "Downloading Font Awesome CSS..."
curl -s -o libs/fontawesome/css/all.min.css https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css

echo "Downloading Font Awesome webfonts..."
curl -s -o libs/fontawesome/webfonts/fa-solid-900.woff2 https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/webfonts/fa-solid-900.woff2
curl -s -o libs/fontawesome/webfonts/fa-solid-900.woff https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/webfonts/fa-solid-900.woff
curl -s -o libs/fontawesome/webfonts/fa-solid-900.ttf https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/webfonts/fa-solid-900.ttf

# Fix path in downloaded CSS to point to correct font locations
sed -i 's/\/\/cdnjs.cloudflare.com\/ajax\/libs\/font-awesome\/5.15.4\/webfonts\//..\/webfonts\//g' libs/fontawesome/css/all.min.css 2>/dev/null
# For macOS compatibility
sed -i '' 's/\/\/cdnjs.cloudflare.com\/ajax\/libs\/font-awesome\/5.15.4\/webfonts\//..\/webfonts\//g' libs/fontawesome/css/all.min.css 2>/dev/null

echo -e "${GREEN}Font Awesome setup completed${NC}"

# Install Chart.js for visualizations
echo -e "\n${YELLOW}Setting up Chart.js...${NC}"
mkdir -p libs/charts
curl -s -o libs/charts/chart.min.js https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js

echo -e "${GREEN}Chart.js setup completed${NC}"

# Create the DOM Cache Manager
echo -e "\n${YELLOW}Creating DOMCache class...${NC}"
cat > js/managers/dom-cache.js << 'EOL'
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
EOL

echo -e "${GREEN}DOMCache class created successfully${NC}"

# Create the enhanced Tab Manager
echo -e "\n${YELLOW}Creating Tab Manager...${NC}"
cat > js/managers/tab-manager.js << 'EOL'
/**
 * Enhanced tab management system with better event handling and accessibility
 */
class TabManager {
  constructor() {
    this.activeTab = null;
    this.activeSubTab = null;
    this.tabHistory = [];
    this.eventListeners = {};
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Main tabs
    document.querySelectorAll('.tab-button').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = button.getAttribute('data-tab');
        this.setActiveTab(tabId);
      });
      
      // Make tabs keyboard accessible
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const tabId = button.getAttribute('data-tab');
          this.setActiveTab(tabId);
        }
        
        // Keyboard navigation with arrow keys
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          
          const tabs = Array.from(document.querySelectorAll('.tab-button'));
          const currentIndex = tabs.indexOf(button);
          let newIndex;
          
          if (e.key === 'ArrowRight') {
            newIndex = (currentIndex + 1) % tabs.length;
          } else {
            newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          }
          
          tabs[newIndex].focus();
        }
      });
    });
    
    // Sub tabs
    document.querySelectorAll('.sub-tab-button').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const subtabId = button.getAttribute('data-subtab');
        this.setActiveSubTab(subtabId);
      });
      
      // Make sub-tabs keyboard accessible
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const subtabId = button.getAttribute('data-subtab');
          this.setActiveSubTab(subtabId);
        }
        
        // Keyboard navigation with arrow keys
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          
          const subtabs = Array.from(document.querySelectorAll('.sub-tab-button'));
          const currentIndex = subtabs.indexOf(button);
          let newIndex;
          
          if (e.key === 'ArrowRight') {
            newIndex = (currentIndex + 1) % subtabs.length;
          } else {
            newIndex = (currentIndex - 1 + subtabs.length) % subtabs.length;
          }
          
          subtabs[newIndex].focus();
        }
      });
    });
    
    // Set initial active tabs from URL hash if present
    this.handleUrlHash();
    
    // Update URL hash when tabs change
    window.addEventListener('hashchange', () => this.handleUrlHash());
  }
  
  handleUrlHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const [mainTab, subTab] = hash.split('-');
      if (mainTab) {
        this.setActiveTab(mainTab, false); // Don't update URL again
        if (subTab) {
          this.setActiveSubTab(subTab, false); // Don't update URL again
        }
      }
    } else {
      // Set default tabs
      const defaultTab = document.querySelector('.tab-button')?.getAttribute('data-tab');
      if (defaultTab) {
        this.setActiveTab(defaultTab, false);
      }
    }
  }
  
  setActiveTab(tabId, updateUrl = true) {
    if (this.activeTab === tabId) return;
    
    // Store previous tab for history
    if (this.activeTab) {
      this.tabHistory.push(this.activeTab);
      // Limit history to 10 items
      if (this.tabHistory.length > 10) {
        this.tabHistory.shift();
      }
    }
    
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
      const isActive = button.getAttribute('data-tab') === tabId;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', isActive.toString());
      button.setAttribute('tabindex', isActive ? '0' : '-1');
    });
    
    // Update tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
      const isActive = pane.id === tabId;
      pane.classList.toggle('active', isActive);
      pane.setAttribute('aria-hidden', (!isActive).toString());
    });
    
    this.activeTab = tabId;
    
    // Update URL hash
    if (updateUrl) {
      if (this.activeSubTab) {
        window.history.pushState(null, '', `#${tabId}-${this.activeSubTab}`);
      } else {
        window.history.pushState(null, '', `#${tabId}`);
      }
    }
    
    // Trigger event for other components
    this.triggerEvent('tabChanged', { tabId, type: 'main' });
  }
  
  setActiveSubTab(subtabId, updateUrl = true) {
    if (this.activeSubTab === subtabId) return;
    
    // Update sub-tab buttons
    document.querySelectorAll('.sub-tab-button').forEach(button => {
      const isActive = button.getAttribute('data-subtab') === subtabId;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', isActive.toString());
      button.setAttribute('tabindex', isActive ? '0' : '-1');
    });
    
    // Update sub-tab panes
    document.querySelectorAll('.sub-tab-pane').forEach(pane => {
      const isActive = pane.id === subtabId;
      pane.classList.toggle('active', isActive);
      pane.setAttribute('aria-hidden', (!isActive).toString());
    });
    
    this.activeSubTab = subtabId;
    
    // Update URL hash
    if (updateUrl && this.activeTab) {
      window.history.pushState(null, '', `#${this.activeTab}-${subtabId}`);
    }
    
    // Trigger event for other components
    this.triggerEvent('tabChanged', { tabId: subtabId, type: 'sub' });
  }
  
  on(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    
    this.eventListeners[eventName].push(callback);
  }
  
  off(eventName, callback) {
    if (!this.eventListeners[eventName]) return;
    
    this.eventListeners[eventName] = this.eventListeners[eventName]
      .filter(listener => listener !== callback);
  }
  
  triggerEvent(eventName, data) {
    if (!this.eventListeners[eventName]) return;
    
    this.eventListeners[eventName].forEach(callback => {
      callback(data);
    });
  }
  
  goBack() {
    if (this.tabHistory.length > 0) {
      const previousTab = this.tabHistory.pop();
      this.setActiveTab(previousTab);
    }
  }
}
EOL

echo -e "${GREEN}Tab Manager created successfully${NC}"

# Create the enhanced Notification Manager
echo -e "\n${YELLOW}Creating Notification Manager...${NC}"
cat > js/managers/notification-manager.js << 'EOL'
/**
 * Enhanced notification system for user feedback with accessibility improvements
 */
class NotificationManager {
  constructor() {
    this.container = null;
    this.notificationQueue = [];
    this.isProcessingQueue = false;
    this.animationDuration = 300; // ms
    this.displayDuration = 5000; // ms for success/info, doubled for errors
    this.maxNotifications = 5; // Maximum number of notifications to show at once
    this.notificationCount = 0; // Current number of notifications shown
    this.isMobile = window.innerWidth < 768;
    
    this.createContainer();
    
    // Listen for window resize to update mobile state
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }
  
  createContainer() {
    // Check if container already exists
    if (document.getElementById('notification-container')) {
      this.container = document.getElementById('notification-container');
      return;
    }
    
    // Create container
    this.container = document.createElement('div');
    this.container.id = 'notification-container';
    this.container.className = 'notification-container';
    this.container.setAttribute('role', 'region');
    this.container.setAttribute('aria-live', 'polite');
    this.container.setAttribute('aria-relevant', 'additions');
    
    // Add to document
    document.body.appendChild(this.container);
  }
  
  // Show a notification message
  show(message, type = 'info', duration = null) {
    if (!message) return;
    
    // Add to queue
    this.notificationQueue.push({
      message,
      type,
      duration: duration || (type === 'error' ? this.displayDuration * 2 : this.displayDuration)
    });
    
    // Process queue if not already processing
    if (!this.isProcessingQueue) {
      this.processQueue();
    }
  }
  
  // Process notification queue
  processQueue() {
    if (this.notificationQueue.length === 0) {
      this.isProcessingQueue = false;
      return;
    }
    
    this.isProcessingQueue = true;
    
    // If we've reached max notifications, wait for some to disappear
    if (this.notificationCount >= this.maxNotifications) {
      setTimeout(() => {
        this.processQueue();
      }, 500);
      return;
    }
    
    const notification = this.notificationQueue.shift();
    this.displayNotification(notification);
  }
  
  // Display a notification
  displayNotification(notification) {
    this.notificationCount++;
    
    // Create notification element
    const element = document.createElement('div');
    element.className = `notification notification-${notification.type}`;
    element.setAttribute('role', 'alert');
    
    // Add an icon based on type
    const iconElement = document.createElement('div');
    iconElement.className = 'notification-icon';
    
    switch (notification.type) {
      case 'success':
        iconElement.innerHTML = '<i class="fas fa-check-circle"></i>';
        break;
      case 'error':
        iconElement.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        break;
      case 'warning':
        iconElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        break;
      default: 
        iconElement.innerHTML = '<i class="fas fa-info-circle"></i>';
    }
    
    // Create message text
    const messageText = document.createElement('div');
    messageText.className = 'notification-message';
    messageText.textContent = notification.message;
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close notification');
    closeButton.addEventListener('click', () => {
      this.hideNotification(element);
    });
    
    // Assemble notification
    element.appendChild(iconElement);
    element.appendChild(messageText);
    element.appendChild(closeButton);
    
    // Add to container
    this.container.appendChild(element);
    
    // Trigger animation
    setTimeout(() => {
      element.classList.add('show');
    }, 10);
    
    // Mobile notifications should stack on top of each other
    if (this.isMobile) {
      element.style.top = `${(this.notificationCount - 1) * 10}px`;
    }
    
    // Set timeout to hide
    const notificationTimeout = setTimeout(() => {
      this.hideNotification(element);
    }, notification.duration);
    
    // Store timeout reference in element for cancellation if needed
    element.dataset.timeoutId = notificationTimeout;
    
    // Add hover behavior to pause timer
    element.addEventListener('mouseenter', () => {
      clearTimeout(element.dataset.timeoutId);
    });
    
    element.addEventListener('mouseleave', () => {
      element.dataset.timeoutId = setTimeout(() => {
        this.hideNotification(element);
      }, notification.duration / 2); // Reduce time on resume
    });
  }
  
  // Hide a notification
  hideNotification(element) {
    // Check if element still exists
    if (!element || !element.parentNode) {
      this.processQueue();
      return;
    }
    
    // Clear any pending timeout
    if (element.dataset.timeoutId) {
      clearTimeout(element.dataset.timeoutId);
    }
    
    // Start hide animation
    element.classList.remove('show');
    
    // Remove after animation
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
        this.notificationCount--;
      }
      this.processQueue();
    }, this.animationDuration);
  }
  
  // Clear all notifications
  clearAll() {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
      this.hideNotification(notification);
    });
    
    // Clear the queue
    this.notificationQueue = [];
  }
  
  // Helper methods for common notification types
  success(message, duration) {
    this.show(message, 'success', duration);
  }
  
  error(message, duration) {
    this.show(message, 'error', duration);
  }
  
  warn(message, duration) {
    this.show(message, 'warning', duration);
  }
  
  info(message, duration) {
    this.show(message, 'info', duration);
  }
}
EOL

echo -e "${GREEN}Notification Manager created successfully${NC}"

# Create the enhanced Loading Manager
echo -e "\n${YELLOW}Creating Loading Manager...${NC}"
cat > js/managers/loading-manager.js << 'EOL'
/**
 * Enhanced loading indicator management with progress support
 */
class LoadingManager {
  constructor() {
    this.activeLoaders = new Map();
    this.defaultText = 'Loading...';
    this.progressTimers = new Map();
    this.globalLoader = null;
  }
  
  // Show loading indicator in a container
  show(containerId, text = this.defaultText, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    
    // Check if already has a loader
    if (this.activeLoaders.has(containerId)) {
      const existingLoader = this.activeLoaders.get(containerId);
      this.updateText(containerId, text);
      return existingLoader;
    }
    
    // Set default options
    const defaultOptions = {
      showSpinner: true,
      showProgress: false,
      color: null,
      overlay: true
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    // Create loading indicator
    const loader = document.createElement('div');
    loader.className = 'loading-indicator';
    
    if (!mergedOptions.overlay) {
      loader.classList.add('no-overlay');
    }
    
    if (mergedOptions.color) {
      loader.style.setProperty('--loader-color', mergedOptions.color);
    }
    
    // Add aria attributes
    loader.setAttribute('role', 'status');
    loader.setAttribute('aria-busy', 'true');
    loader.setAttribute('aria-live', 'polite');
    
    // Create spinner
    if (mergedOptions.showSpinner) {
      const spinner = document.createElement('div');
      spinner.className = 'spinner';
      loader.appendChild(spinner);
    }
    
    // Create progress bar if requested
    if (mergedOptions.showProgress) {
      const progressContainer = document.createElement('div');
      progressContainer.className = 'progress-container';
      
      const progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      
      const progressFill = document.createElement('div');
      progressFill.className = 'progress-fill';
      progressFill.style.width = '0%';
      
      progressBar.appendChild(progressFill);
      progressContainer.appendChild(progressBar);
      loader.appendChild(progressContainer);
    }
    
    // Create text
    const textElement = document.createElement('div');
    textElement.className = 'loading-text';
    textElement.textContent = text;
    loader.appendChild(textElement);
    
    // Add to container
    container.appendChild(loader);
    
    // Set container position relative if not already
    const containerPosition = window.getComputedStyle(container).position;
    if (containerPosition === 'static') {
      container.style.position = 'relative';
    }
    
    // Store reference
    this.activeLoaders.set(containerId, loader);
    
    return loader;
  }
  
  // Show global loading indicator
  showGlobal(text = 'Processing...') {
    if (this.globalLoader) {
      this.updateGlobalText(text);
      return this.globalLoader;
    }
    
    // Create global loader
    const loader = document.createElement('div');
    loader.className = 'global-loading-indicator';
    
    // Add aria attributes
    loader.setAttribute('role', 'status');
    loader.setAttribute('aria-busy', 'true');
    loader.setAttribute('aria-live', 'polite');
    
    // Create spinner container
    const spinnerContainer = document.createElement('div');
    spinnerContainer.className = 'global-spinner-container';
    
    // Create spinner
    const spinner = document.createElement('div');
    spinner.className = 'global-spinner';
    spinnerContainer.appendChild(spinner);
    
    // Create text
    const textElement = document.createElement('div');
    textElement.className = 'global-loading-text';
    textElement.textContent = text;
    
    // Assemble
    loader.appendChild(spinnerContainer);
    loader.appendChild(textElement);
    
    // Add to document
    document.body.appendChild(loader);
    
    // Store reference
    this.globalLoader = loader;
    
    // Add show class to trigger animation
    setTimeout(() => {
      loader.classList.add('show');
    }, 10);
    
    return loader;
  }
  
  // Hide global loading indicator
  hideGlobal() {
    if (!this.globalLoader) return;
    
    this.globalLoader.classList.remove('show');
    
    setTimeout(() => {
      if (this.globalLoader && this.globalLoader.parentNode) {
        this.globalLoader.parentNode.removeChild(this.globalLoader);
      }
      this.globalLoader = null;
    }, 300);
  }
  
  // Update global loading text
  updateGlobalText(text) {
    if (!this.globalLoader) return;
    
    const textElement = this.globalLoader.querySelector('.global-loading-text');
    if (textElement) {
      textElement.textContent = text;
    }
  }
  
  // Update loading text
  updateText(containerId, text) {
    const loader = this.activeLoaders.get(containerId);
    if (!loader) return;
    
    const textElement = loader.querySelector('.loading-text');
    if (textElement) {
      textElement.textContent = text;
    }
  }
  
  // Update progress bar
  updateProgress(containerId, percentage) {
    const loader = this.activeLoaders.get(containerId);
    if (!loader) return;
    
    const progressFill = loader.querySelector('.progress-fill');
    if (progressFill) {
      progressFill.style.width = `${percentage}%`;
    }
  }
  
  // Start automatic progress simulation
  startProgressSimulation(containerId, duration = 5000, finalValue = 90) {
    if (this.progressTimers.has(containerId)) {
      clearInterval(this.progressTimers.get(containerId));
    }
    
    // Reset progress
    this.updateProgress(containerId, 0);
    
    // Number of steps
    const steps = 20;
    const interval = duration / steps;
    
    // Use easeInOutQuad for more natural progress
    const easeInOutQuad = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      
      if (currentStep > steps) {
        clearInterval(timer);
        return;
      }
      
      const progress = easeInOutQuad(currentStep / steps) * finalValue;
      this.updateProgress(containerId, progress);
    }, interval);
    
    this.progressTimers.set(containerId, timer);
  }
  
  // Complete progress to 100%
  completeProgress(containerId) {
    if (this.progressTimers.has(containerId)) {
      clearInterval(this.progressTimers.get(containerId));
      this.progressTimers.delete(containerId);
    }
    
    this.updateProgress(containerId, 100);
    
    // Delay hiding to let the user see the completed progress
    setTimeout(() => {
      this.hide(containerId);
    }, 500);
  }
  
  // Hide loading indicator
  hide(containerId) {
    const loader = this.activeLoaders.get(containerId);
    if (!loader || !loader.parentNode) return;
    
    // Stop any active progress simulation
    if (this.progressTimers.has(containerId)) {
      clearInterval(this.progressTimers.get(containerId));
      this.progressTimers.delete(containerId);
    }
    
    // Add fade-out class
    loader.classList.add('fade-out');
    
    // Remove loader after animation
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
      this.activeLoaders.delete(containerId);
    }, 300);
  }
  
  // Hide all loading indicators
  hideAll() {
    this.activeLoaders.forEach((loader, containerId) => {
      this.hide(containerId);
    });
    
    // Also hide global loader if active
    this.hideGlobal();
  }
}
EOL

echo -e "${GREEN}Loading Manager created successfully${NC}"

# Create the enhanced Validation Manager
echo -e "\n${YELLOW}Creating Validation Manager...${NC}"
cat > js/managers/validation-manager.js << 'EOL'
/**
 * Enhanced error handling and validation framework with runtime validation creation
 */
class ValidationManager {
  constructor() {
    this.errorMessages = {
      required: '{label} is required',
      minValue: '{label} must be at least {min}',
      maxValue: '{label} must be at most {max}',
      integer: '{label} must be a whole number',
      positive: '{label} must be positive',
      regex: '{label} is not in the correct format',
      email: '{label} must be a valid email address',
      url: '{label} must be a valid URL',
      date: '{label} must be a valid date'
    };
    
    this.validationRules = {
      'device-count': { 
        required: true, 
        minValue: 1,
        maxValue: 1000000,
        integer: true,
        label: 'Device Count' 
      },
      'years-to-project': { 
        required: true, 
        minValue: 1, 
        maxValue: 10, 
        integer: true,
        label: 'Years to Project' 
      },
      'location-count': { 
        required: true, 
        minValue: 1, 
        integer: true,
        label: 'Location Count' 
      },
      'legacy-percentage': { 
        required: true, 
        minValue: 0, 
        maxValue: 100,
        label: 'Legacy Percentage' 
      }
    };
    
    this.fieldDependencies = {};
    this.validationEvents = {};
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Add validation to all form inputs
    document.querySelectorAll('input, select').forEach(input => {
      const id = input.id;
      if (id && this.validationRules[id]) {
        input.addEventListener('change', () => {
          this.validateInput(id);
          this.checkDependencies(id);
        });
        
        input.addEventListener('blur', () => {
          this.validateInput(id);
        });
      }
    });
    
    // Whenever form data is changed, update dependent field validation
    document.addEventListener('input', (e) => {
      const id = e.target.id;
      if (id) {
        this.checkDependencies(id);
      }
    });
  }
  
  // Add validation rule for a field at runtime
  addValidationRule(id, rules) {
    this.validationRules[id] = { ...rules };
    
    // Add listeners if the element exists
    const input = document.getElementById(id);
    if (input) {
      // Remove existing listeners
      const newInput = input.cloneNode(true);
      input.parentNode.replaceChild(newInput, input);
      
      // Add new listeners
      newInput.addEventListener('change', () => {
        this.validateInput(id);
        this.checkDependencies(id);
      });
      
      newInput.addEventListener('blur', () => {
        this.validateInput(id);
      });
    }
  }
  
  // Add dependency between fields
  addDependency(sourceId, targetId, condition) {
    if (!this.fieldDependencies[sourceId]) {
      this.fieldDependencies[sourceId] = [];
    }
    
    this.fieldDependencies[sourceId].push({
      targetId,
      condition
    });
  }
  
  // Check dependencies for a field
  checkDependencies(id) {
    if (!this.fieldDependencies[id]) return;
    
    const sourceInput = document.getElementById(id);
    if (!sourceInput) return;
    
    const sourceValue = sourceInput.type === 'checkbox' 
      ? sourceInput.checked 
      : sourceInput.value;
    
    this.fieldDependencies[id].forEach(dependency => {
      const targetInput = document.getElementById(dependency.targetId);
      if (!targetInput) return;
      
      const conditionMet = dependency.condition(sourceValue, targetInput.value);
      
      // Get parent container
      const container = targetInput.closest('.input-group') || targetInput.parentNode;
      
      if (conditionMet) {
        container.classList.remove('disabled');
        targetInput.disabled = false;
      } else {
        container.classList.add('disabled');
        targetInput.disabled = true;
        this.clearError(dependency.targetId);
      }
    });
  }
  
  validateInput(id) {
    const input = document.getElementById(id);
    if (!input || !this.validationRules[id]) return true;
    
    const rules = this.validationRules[id];
    const value = input.type === 'checkbox' ? input.checked : input.value;
    
    // Skip validation for disabled fields
    if (input.disabled) {
      this.clearError(id);
      return true;
    }
    
    // Remove existing error message
    this.clearError(id);
    
    // Add validation error class for styling
    const inputGroup = input.closest('.input-group');
    if (inputGroup) {
      inputGroup.classList.remove('has-error');
    }
    
    // Validate according to rules
    if (rules.required && (value === '' || value === null || value === undefined)) {
      this.showError(id, this.formatErrorMessage('required', rules));
      if (inputGroup) {
        inputGroup.classList.add('has-error');
      }
      return false;
    }
    
    // Skip other validations if empty and not required
    if (value === '' || value === null || value === undefined) {
      return true;
    }
    
    if (rules.minValue !== undefined && parseFloat(value) < rules.minValue) {
      this.showError(id, this.formatErrorMessage('minValue', rules));
      if (inputGroup) {
        inputGroup.classList.add('has-error');
      }
      return false;
    }
    
    if (rules.maxValue !== undefined && parseFloat(value) > rules.maxValue) {
      this.showError(id, this.formatErrorMessage('maxValue', rules));
      if (inputGroup) {
        inputGroup.classList.add('has-error');
      }
      return false;
    }
    
    if (rules.integer && !Number.isInteger(parseFloat(value))) {
      this.showError(id, this.formatErrorMessage('integer', rules));
      if (inputGroup) {
        inputGroup.classList.add('has-error');
      }
      return false;
    }
    
    if (rules.positive && parseFloat(value) <= 0) {
      this.showError(id, this.formatErrorMessage('positive', rules));
      if (inputGroup) {
        inputGroup.classList.add('has-error');
      }
      return false;
    }
    
    if (rules.regex && !new RegExp(rules.regex).test(value)) {
      this.showError(id, this.formatErrorMessage('regex', rules));
      if (inputGroup) {
        inputGroup.classList.add('has-error');
      }
      return false;
    }
    
    if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      this.showError(id, this.formatErrorMessage('email', rules));
      if (inputGroup) {
        inputGroup.classList.add('has-error');
      }
      return false;
    }
    
    if (rules.url && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(value)) {
      this.showError(id, this.formatErrorMessage('url', rules));
      if (inputGroup) {
        inputGroup.classList.add('has-error');
      }
      return false;
    }
    
    if (rules.date && isNaN(Date.parse(value))) {
      this.showError(id, this.formatErrorMessage('date', rules));
      if (inputGroup) {
        inputGroup.classList.add('has-error');
      }
      return false;
    }
    
    // Custom validation if provided
    if (rules.validate && typeof rules.validate === 'function') {
      const result = rules.validate(value);
      if (result !== true) {
        this.showError(id, result || this.formatErrorMessage(rules.validateMessage || 'This field is invalid', rules));
        if (inputGroup) {
          inputGroup.classList.add('has-error');
        }
        return false;
      }
    }
    
    // If we get here, validation passed
    if (typeof this.validationEvents.onValidationSuccess === 'function') {
      this.validationEvents.onValidationSuccess(id, input);
    }
    
    return true;
  }
  
  validateAll() {
    let isValid = true;
    
    for (const id in this.validationRules) {
      if (!this.validateInput(id)) {
        isValid = false;
        
        // Focus the first invalid field
        if (isValid === false) {
          setTimeout(() => {
            document.getElementById(id)?.focus();
          }, 100);
        }
      }
    }
    
    return isValid;
  }
  
  // Set validation event handlers
  on(eventName, callback) {
    this.validationEvents[eventName] = callback;
  }
  
  formatErrorMessage(rule, ruleConfig) {
    let message = this.errorMessages[rule] || rule;
    
    // Replace placeholders
    message = message.replace('{label}', ruleConfig.label || 'Field');
    
    // Replace other placeholders if they exist in the rule config
    for (const key in ruleConfig) {
      message = message.replace(`{${key}}`, ruleConfig[key]);
    }
    
    return message;
  }
  
  showError(id, message) {
    const input = document.getElementById(id);
    if (!input) return;
    
    input.classList.add('invalid');
    input.setAttribute('aria-invalid', 'true');
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.id = `error-${id}`;
    errorDiv.textContent = message;
    
    // Set aria-describedby to link input with error message
    input.setAttribute('aria-describedby', `error-${id}`);
    
    // Find the parent input-group if it exists, otherwise use input's parent
    const container = input.closest('.input-group') || input.parentNode;
    
    // Add error message after input or at end of container
    container.appendChild(errorDiv);
    
    // Trigger event
    if (typeof this.validationEvents.onValidationError === 'function') {
      this.validationEvents.onValidationError(id, message, input);
    }
  }
  
  clearError(id) {
    const input = document.getElementById(id);
    if (!input) return;
    
    input.classList.remove('invalid');
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
    
    // Remove error message if exists
    const errorDiv = document.getElementById(`error-${id}`);
    if (errorDiv) {
      errorDiv.parentNode.removeChild(errorDiv);
    }
    
    // Remove error class from input group
    const inputGroup = input.closest('.input-group');
    if (inputGroup) {
      inputGroup.classList.remove('has-error');
    }
  }
  
  clearAllErrors() {
    for (const id in this.validationRules) {
      this.clearError(id);
    }
  }
}
EOL

echo -e "${GREEN}Validation Manager created successfully${NC}"

# Create enhanced helpers.js with improved utility functions
echo -e "\n${YELLOW}Updating utility functions in helpers.js...${NC}"
cat > js/utils/helpers.js << 'EOL'
/**
 * Enhanced utility functions for the TCO Calculator
 */

// Format currency - make globally available for chart tooltips
window.formatCurrency = function(value) {
  if (value === undefined || value === null) return '$0';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

// Format percentage with customizable precision
window.formatPercentage = function(value, precision = 1) {
  if (value === undefined || value === null) return '0.0%';
  
  return `${value.toFixed(precision)}%`;
};

// Format number with commas
window.formatNumber = function(value, precision = 0) {
  if (value === undefined || value === null) return '0';
  
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: precision
  }).format(value);
};

// Format duration in days to readable format
window.formatDuration = function(days) {
  if (!days) return '0 days';
  
  if (days < 1) {
    const hours = Math.round(days * 24);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }
  
  if (days >= 30) {
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;
    
    if (remainingDays === 0) {
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    }
    
    return `${months} ${months === 1 ? 'month' : 'months'}, ${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`;
  }
  
  return `${Math.round(days)} ${Math.round(days) === 1 ? 'day' : 'days'}`;
};

// Calculate complexity multiplier based on settings
function calculateComplexityMultiplier(vendor, cloudBased) {
  let multiplier = 1.0;
  
  // Cloud vendors are less affected by complexity factors
  const cloudReductionFactor = cloudBased ? 0.4 : 1.0;
  
  if (document.getElementById('multiple-locations')?.checked) {
    // Additional 10% per location beyond the first, up to a max of 100% extra
    const locationCount = parseInt(document.getElementById('location-count')?.value) || 1;
    multiplier += Math.min(0.1 * (locationCount - 1), 1.0) * cloudReductionFactor;
  }
  
  if (document.getElementById('complex-authentication')?.checked) {
    multiplier += 0.15 * cloudReductionFactor;
  }
  
  if (document.getElementById('legacy-devices')?.checked) {
    // Additional 0-30% based on percentage of legacy devices
    const legacyPercentage = parseInt(document.getElementById('legacy-percentage')?.value) || 10;
    multiplier += (legacyPercentage / 100) * 0.3 * cloudReductionFactor;
  }
  
  if (document.getElementById('cloud-integration')?.checked) {
    // Cloud vendors handle this better
    multiplier += 0.1 * cloudReductionFactor;
  }
  
  if (document.getElementById('custom-policies')?.checked) {
    // Different multipliers based on policy complexity
    const policyComplexity = document.getElementById('policy-complexity')?.value || 'medium';
    if (policyComplexity === 'low') {
      multiplier += 0.05 * cloudReductionFactor;
    } else if (policyComplexity === 'medium') {
      multiplier += 0.15 * cloudReductionFactor;
    } else if (policyComplexity === 'high') {
      multiplier += 0.25 * cloudReductionFactor;
    }
  }
  
  return multiplier;
}

// Enhanced version using DOM Cache
window.calculateComplexityMultiplier = function(vendor, cloudBased) {
  // Use DOM Cache if available
  const domCache = window.domCache;
  
  let multiplier = 1.0;
  
  // Cloud vendors are less affected by complexity factors
  const cloudReductionFactor = cloudBased ? 0.4 : 1.0;
  
  // Use DOM Cache if available, otherwise fallback to document.getElementById
  const getElement = (id) => {
    return domCache ? domCache.get(id) : document.getElementById(id);
  };
  
  const getInputValue = (id, defaultValue) => {
    const element = getElement(id);
    if (!element) return defaultValue;
    
    if (element.type === 'checkbox') {
      return element.checked;
    } else if (element.type === 'number') {
      return parseFloat(element.value) || defaultValue;
    } else {
      return element.value;
    }
  };
  
  if (getInputValue('multiple-locations', false)) {
    // Additional 10% per location beyond the first, up to a max of 100% extra
    const locationCount = getInputValue('location-count', 1);
    multiplier += Math.min(0.1 * (locationCount - 1), 1.0) * cloudReductionFactor;
  }
  
  if (getInputValue('complex-authentication', false)) {
    multiplier += 0.15 * cloudReductionFactor;
  }
  
  if (getInputValue('legacy-devices', false)) {
    // Additional 0-30% based on percentage of legacy devices
    const legacyPercentage = getInputValue('legacy-percentage', 10);
    multiplier += (legacyPercentage / 100) * 0.3 * cloudReductionFactor;
  }
  
  if (getInputValue('cloud-integration', false)) {
    // Cloud vendors handle this better
    multiplier += 0.1 * cloudReductionFactor;
  }
  
  if (getInputValue('custom-policies', false)) {
    // Different multipliers based on policy complexity
    const policyComplexity = getInputValue('policy-complexity', 'medium');
    if (policyComplexity === 'low') {
      multiplier += 0.05 * cloudReductionFactor;
    } else if (policyComplexity === 'medium') {
      multiplier += 0.15 * cloudReductionFactor;
    } else if (policyComplexity === 'high') {
      multiplier += 0.25 * cloudReductionFactor;
    }
  }
  
  return multiplier;
};

// Enhanced migration complexity factor calculation
window.calculateMigrationFactor = function(fromVendor, toVendor) {
  if (!fromVendor || !toVendor) return 0.5; // Default factor
  
  const migrationFactors = {
    cisco: {
      aruba: 0.7,
      forescout: 0.6,
      nps: 0.5,
      portnox: 0.3
    },
    aruba: {
      cisco: 0.7,
      forescout: 0.6,
      nps: 0.5,
      portnox: 0.3
    },
    forescout: {
      cisco: 0.7,
      aruba: 0.6,
      nps: 0.5,
      portnox: 0.3
    },
    nps: {
      cisco: 0.8,
      aruba: 0.7,
      forescout: 0.7,
      portnox: 0.3
    },
    portnox: {
      cisco: 0.8,
      aruba: 0.7,
      forescout: 0.7,
      nps: 0.6
    }
  };
  
  if (fromVendor === toVendor) {
    return 0; // Same vendor has no migration cost
  }
  
  if (migrationFactors[fromVendor] && migrationFactors[fromVendor][toVendor]) {
    return migrationFactors[fromVendor][toVendor];
  }
  
  return 0.5; // Default factor if not found
};

// Get FTE costs with enhanced accuracy
window.calculateFTECosts = function(allocation) {
  if (!allocation) return 0;
  
  const fteCosts = {
    networkAdmin: 120000,
    securityAdmin: 135000,
    systemAdmin: 110000,
    helpDesk: 75000
  };
  
  let totalCost = 0;
  for (const [role, amount] of Object.entries(allocation)) {
    totalCost += fteCosts[role] * amount;
  }
  
  return totalCost;
};

// Function to toggle visibility of an element
window.toggleVisibility = function(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle('hidden');
    
    // Update aria-expanded if it's a toggle control
    const controls = document.querySelectorAll(`[aria-controls="${elementId}"]`);
    controls.forEach(control => {
      if (control.hasAttribute('aria-expanded')) {
        const isExpanded = !element.classList.contains('hidden');
        control.setAttribute('aria-expanded', isExpanded.toString());
      }
    });
    
    return !element.classList.contains('hidden');
  }
  return false;
};

// Function to set active tab - deprecated, use TabManager instead
window.setActiveTab = function(tabId) {
  console.warn('setActiveTab is deprecated, use window.tabManager.setActiveTab instead');
  if (window.tabManager) {
    window.tabManager.setActiveTab(tabId);
    return;
  }
  
  // Fallback implementation
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
  });
  
  const selectedPane = document.getElementById(tabId);
  if (selectedPane) {
    selectedPane.classList.add('active');
  }
  
  document.querySelectorAll(`.tab-button[data-tab="${tabId}"]`).forEach(button => {
    button.classList.add('active');
  });
};

// Function to set active sub tab - deprecated, use TabManager instead
window.setActiveSubTab = function(subtabId) {
  console.warn('setActiveSubTab is deprecated, use window.tabManager.setActiveSubTab instead');
  if (window.tabManager) {
    window.tabManager.setActiveSubTab(subtabId);
    return;
  }
  
  // Fallback implementation
  document.querySelectorAll('.sub-tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  
  document.querySelectorAll('.sub-tab-button').forEach(button => {
    button.classList.remove('active');
  });
  
  const selectedPane = document.getElementById(subtabId);
  if (selectedPane) {
    selectedPane.classList.add('active');
  }
  
  document.querySelectorAll(`.sub-tab-button[data-subtab="${subtabId}"]`).forEach(button => {
    button.classList.add('active');
  });
};

// Function to create a HTML element with class and text
window.createElement = function(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};

// Enhanced deep copy function to avoid circular references
window.deepCopy = function(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => window.deepCopy(item));
  }
  
  const copy = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = window.deepCopy(obj[key]);
    }
  }
  
  return copy;
};

// Utility for efficient DOM manipulation
window.batchDOMUpdates = function(updates, callback) {
  // Use requestAnimationFrame to batch DOM updates
  requestAnimationFrame(() => {
    const fragment = document.createDocumentFragment();
    
    updates.forEach(update => {
      if (typeof update.render === 'function') {
        fragment.appendChild(update.render());
      } else if (update.element) {
        if (update.innerHTML !== undefined) {
          update.element.innerHTML = update.innerHTML;
        }
        if (update.textContent !== undefined) {
          update.element.textContent = update.textContent;
        }
        if (update.attributes) {
          Object.entries(update.attributes).forEach(([attr, value]) => {
            update.element.setAttribute(attr, value);
          });
        }
        if (update.styles) {
          Object.entries(update.styles).forEach(([prop, value]) => {
            update.element.style[prop] = value;
          });
        }
        if (update.classes) {
          update.classes.add?.forEach(cls => update.element.classList.add(cls));
          update.classes.remove?.forEach(cls => update.element.classList.remove(cls));
        }
      }
    });
    
    if (fragment.hasChildNodes() && updates[0].container) {
      updates[0].container.appendChild(fragment);
    }
    
    if (typeof callback === 'function') {
      callback();
    }
  });
};

// Export functions for CVS or Excel
window.exportTableToCSV = function(tableId, filename) {
  const table = document.getElementById(tableId);
  if (!table) return false;
  
  let csv = [];
  const rows = table.querySelectorAll('tr');
  
  for (let i = 0; i < rows.length; i++) {
    const row = [], cols = rows[i].querySelectorAll('td, th');
    
    for (let j = 0; j < cols.length; j++) {
      // Clean data: remove tabs, newlines, double quotes (replace with single quotes)
      let data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, ' ').replace(/(\s\s)/gm, ' ').replace(/"/g, "'");
      // Escape commas in data
      data = data.includes(',') ? `"${data}"` : data;
      row.push(data);
    }
    
    csv.push(row.join(','));
  }
  
  // Download CSV file
  const csvContent = csv.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename || 'export.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
};

// Download data as JSON file
window.downloadJSON = function(data, filename) {
  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename || 'export.json');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Utility to get correct element dimensions even for hidden elements
window.getHiddenElementDimensions = function(element) {
  if (!element) return { width: 0, height: 0 };
  
  const clone = element.cloneNode(true);
  const style = {
    display: 'block',
    position: 'absolute',
    visibility: 'hidden',
    maxHeight: 'none',
    maxWidth: 'none',
    width: 'auto',
    height: 'auto'
  };
  
  Object.assign(clone.style, style);
  document.body.appendChild(clone);
  
  const dimensions = {
    width: clone.offsetWidth,
    height: clone.offsetHeight
  };
  
  document.body.removeChild(clone);
  return dimensions;
};

// Debounce function to limit rapid execution
window.debounce = function(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    
    if (immediate && !timeout) func.apply(context, args);
  };
};

// Throttle function to limit execution frequency
window.throttle = function(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
EOL

echo -e "${GREEN}Helpers.js updated successfully${NC}"

# Enhance the Calculator.js
echo -e "\n${YELLOW}Enhancing Calculator.js...${NC}"
cat > js/components/calculator.js << 'EOL'
/**
 * Enhanced TCO Calculator for computing cost comparisons and ROI
 * Includes performance improvements and better error handling
 */

class Calculator {
  constructor() {
    this.results = null;
    this.resultsAvailable = false;
    this.isCalculating = false;
    this.lastInputs = {};
    this.eventListeners = {};
    this.cacheEnabled = true;
    this.calculationCount = 0;
  }
  
  // Calculate TCO with progress indicators and validation
  calculate() {
    try {
      if (this.isCalculating) {
        console.warn("Calculation already in progress, please wait");
        return Promise.reject(new Error("Calculation in progress"));
      }
      
      this.isCalculating = true;
      
      // Show loading indicator in results container
      if (window.loadingManager) {
        window.loadingManager.show('results-container', 'Calculating TCO...', {
          showProgress: true
        });
        window.loadingManager.startProgressSimulation('results-container', 3000);
      }
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            if (!window.vendorData) {
              throw new Error("Vendor data not available");
            }
            
            // Get input values
            const currentVendor = window.uiController ? window.uiController.activeVendor : 'cisco';
            
            // Use DOM Cache if available for better performance
            const getInputValue = (id, defaultValue) => {
              if (window.domCache) {
                return window.domCache.getInputValue(id) || defaultValue;
              }
              
              const element = document.getElementById(id);
              if (!element) return defaultValue;
              
              if (element.type === 'checkbox') {
                return element.checked;
              } else if (element.type === 'number') {
                return parseInt(element.value) || defaultValue;
              } else {
                return element.value;
              }
            };
            
            const deviceCount = getInputValue('device-count', 1000);
            const orgSize = getInputValue('organization-size', 'medium');
            const yearsToProject = getInputValue('years-to-project', 3);
            
            // Additional inputs
            const multipleLocations = getInputValue('multiple-locations', false);
            const locationCount = getInputValue('location-count', 1);
            const complexAuth = getInputValue('complex-authentication', false);
            const legacyDevices = getInputValue('legacy-devices', false);
            const legacyPercentage = getInputValue('legacy-percentage', 10);
            const cloudIntegration = getInputValue('cloud-integration', false);
            const customPolicies = getInputValue('custom-policies', false);
            const policyComplexity = getInputValue('policy-complexity', 'medium');
            
            // Store input values for caching
            const inputs = {
              currentVendor,
              deviceCount,
              orgSize,
              yearsToProject,
              multipleLocations,
              locationCount,
              complexAuth,
              legacyDevices,
              legacyPercentage,
              cloudIntegration,
              customPolicies,
              policyComplexity
            };
            
            // Check if inputs are the same as last calculation
            if (this.cacheEnabled && this.resultsAvailable && this.resultsMatch(inputs)) {
              if (window.loadingManager) {
                window.loadingManager.completeProgress('results-container');
              }
              this.isCalculating = false;
              this.triggerEvent('calculationComplete', this.results);
              resolve(this.results);
              return;
            }
            
            // Update last inputs
            this.lastInputs = { ...inputs };
            
            // Track calculation progress
            let progress = 0;
            const totalSteps = Object.keys(window.vendorData).length * 2 + 3;
            let currentStep = 0;
            
            const updateProgress = (message) => {
              currentStep++;
              progress = (currentStep / totalSteps) * 100;
              
              if (window.loadingManager) {
                window.loadingManager.updateProgress('results-container', progress);
                window.loadingManager.updateText('results-container', message);
              }
            };
            
            updateProgress('Initializing calculation...');
            
            // Calculate TCO for all vendors
            const tcoResults = {};
            const implementationResults = {};
            
            // Get vendors array
            const vendors = Object.keys(window.vendorData);
            
            // First pass: Calculate basic TCO for all vendors
            vendors.forEach(vendor => {
              updateProgress(`Calculating TCO for ${window.vendorData[vendor].name}...`);
              const result = this.calculateVendorTCO(vendor, currentVendor, orgSize, deviceCount, yearsToProject);
              tcoResults[vendor] = result;
            });
            
            updateProgress('Calculating migration costs...');
            
            // Second pass: Calculate implementation times
            vendors.forEach(vendor => {
              updateProgress(`Calculating implementation time for ${window.vendorData[vendor].name}...`);
              implementationResults[vendor] = this.calculateImplementationTime(vendor, orgSize);
            });
            
            // Add metadata to results
            tcoResults.yearsToProject = yearsToProject;
            tcoResults.deviceCount = deviceCount;
            tcoResults.orgSize = orgSize;
            tcoResults.implementationResults = implementationResults;
            tcoResults.calculationDate = new Date().toISOString();
            tcoResults.calculationId = Date.now().toString(36) + Math.random().toString(36).substring(2);
            
            updateProgress('Finalizing results...');
            
            // Store results
            this.results = tcoResults;
            this.resultsAvailable = true;
            this.calculationCount++;
            
            // Update charts and UI
            this.updateUI();
            
            updateProgress('Calculation complete!');
            
            // Finish loading
            if (window.loadingManager) {
              window.loadingManager.completeProgress('results-container');
            }
            
            // Trigger event
            this.triggerEvent('calculationComplete', tcoResults);
            
            this.isCalculating = false;
            resolve(tcoResults);
          } catch (error) {
            console.error("Error calculating TCO:", error);
            this.isCalculating = false;
            
            // Show error message
            if (window.loadingManager) {
              window.loadingManager.hide('results-container');
            }
            
            if (window.notificationManager) {
              window.notificationManager.error(`Error calculating TCO: ${error.message}`);
            }
            
            reject(error);
          }
        }, 100);
      });
    } catch (error) {
      console.error("Error in calculator.calculate():", error);
      this.isCalculating = false;
      
      // Show error message
      if (window.loadingManager) {
        window.loadingManager.hide('results-container');
      }
      
      if (window.notificationManager) {
        window.notificationManager.error(`Calculation error: ${error.message}`);
      }
      
      return Promise.reject(error);
    }
  }
  
  // Check if current inputs match last calculation
  resultsMatch(inputs) {
    const lastInputs = this.lastInputs;
    
    for (const key in inputs) {
      if (inputs[key] !== lastInputs[key]) {
        return false;
      }
    }
    
    return true;
  }
  
  // Event system for calculator
  on(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    
    this.eventListeners[eventName].push(callback);
    return this;
  }
  
  off(eventName, callback) {
    if (!this.eventListeners[eventName]) return this;
    
    if (callback) {
      this.eventListeners[eventName] = this.eventListeners[eventName]
        .filter(cb => cb !== callback);
    } else {
      this.eventListeners[eventName] = [];
    }
    
    return this;
  }
  
  triggerEvent(eventName, data) {
    if (!this.eventListeners[eventName]) return;
    
    this.eventListeners[eventName].forEach(callback => {
      callback(data);
    });
  }
  
  calculateVendorTCO(vendor, currentVendor, orgSize, deviceCount, yearsToProject) {
    try {
      if (!window.vendorData[vendor] || !window.vendorData[vendor][orgSize]) {
        console.error(`Invalid vendor or organization size: ${vendor}, ${orgSize}`);
        return {
          totalTCO: 0,
          totalInitialCosts: 0,
          annualCosts: 0,
          migrationCost: 0,
          totalSavings: 0,
          savingsPercentage: 0,
          annualSavings: 0,
          costBreakdown: {
            hardware: 0,
            networkRedesign: 0,
            implementation: 0,
            training: 0,
            maintenance: 0,
            licensing: 0,
            personnel: 0,
            downtime: 0
          }
        };
      }
      
      const vendorInfo = window.vendorData[vendor][orgSize];
      const cloudBased = window.vendorData[vendor].cloudBased;
      const complexityMultiplier = window.calculateComplexityMultiplier(vendor, cloudBased);
      
      // Scale costs based on device count relative to organization size
      const deviceMultiplier = this.calculateDeviceMultiplier(orgSize, deviceCount);
      
      // Calculate initial costs
      const initialHardware = vendorInfo.initialHardware * deviceMultiplier;
      const networkRedesign = vendorInfo.networkRedesign * deviceMultiplier;
      const implementation = vendorInfo.implementation * deviceMultiplier;
      const training = vendorInfo.training;
      
      const totalInitialCosts = (initialHardware + networkRedesign + implementation + training) * complexityMultiplier;
      
      // Calculate annual costs
      const annualMaintenance = vendorInfo.annualMaintenance * deviceMultiplier;
      const annualLicensing = vendorInfo.annualLicensing * deviceMultiplier;
      const fteCost = window.calculateFTECosts(vendorInfo.fteAllocation);
      const downtimeCost = vendorInfo.annualDowntime * 5000 * deviceMultiplier; // Assuming $5000 per hour of downtime
      
      const annualCosts = (annualMaintenance + annualLicensing + fteCost + downtimeCost) * complexityMultiplier;
      
      // Calculate TCO
      const totalTCO = totalInitialCosts + (annualCosts * yearsToProject);
      
      // Calculate migration cost (if different from current vendor)
      let migrationCost = 0;
      if (vendor !== currentVendor) {
        const migrationFactor = window.calculateMigrationFactor(currentVendor, vendor);
        migrationCost = implementation * complexityMultiplier * migrationFactor;
      }
      
      // Calculate savings vs current solution
      let totalSavings = 0;
      let savingsPercentage = 0;
      let annualSavings = 0;
      
      if (vendor !== currentVendor) {
        const currentVendorInfo = window.vendorData[currentVendor][orgSize];
        const currentCloudBased = window.vendorData[currentVendor].cloudBased;
        const currentComplexity = window.calculateComplexityMultiplier(currentVendor, currentCloudBased);
        
        const currentInitialHardware = currentVendorInfo.initialHardware * deviceMultiplier;
        const currentNetworkRedesign = currentVendorInfo.networkRedesign * deviceMultiplier;
        const currentImplementation = currentVendorInfo.implementation * deviceMultiplier;
        const currentTraining = currentVendorInfo.training;
        
        const currentInitial = (currentInitialHardware + currentNetworkRedesign + 
                              currentImplementation + currentTraining) * currentComplexity;
        
        const currentMaintenance = currentVendorInfo.annualMaintenance * deviceMultiplier;
        const currentLicensing = currentVendorInfo.annualLicensing * deviceMultiplier;
        const currentFteCost = window.calculateFTECosts(currentVendorInfo.fteAllocation);
        const currentDowntimeCost = currentVendorInfo.annualDowntime * 5000 * deviceMultiplier;
        
        const currentAnnual = (currentMaintenance + currentLicensing + 
                              currentFteCost + currentDowntimeCost) * currentComplexity;
        
        const currentTCO = currentInitial + (currentAnnual * yearsToProject);
        
        totalSavings = currentTCO - totalTCO - migrationCost;
        savingsPercentage = currentTCO > 0 ? (totalSavings / currentTCO) * 100 : 0;
        annualSavings = currentAnnual - annualCosts;
      }
      
      // Create cost breakdown
      const costBreakdown = {
        hardware: initialHardware * complexityMultiplier,
        networkRedesign: networkRedesign * complexityMultiplier,
        implementation: implementation * complexityMultiplier,
        training: training * complexityMultiplier,
        maintenance: annualMaintenance * yearsToProject * complexityMultiplier,
        licensing: annualLicensing * yearsToProject * complexityMultiplier,
        personnel: fteCost * yearsToProject * complexityMultiplier,
        downtime: downtimeCost * yearsToProject * complexityMultiplier
      };
      
      return {
        totalTCO,
        totalInitialCosts,
        annualCosts,
        migrationCost,
        totalSavings,
        savingsPercentage,
        annualSavings,
        costBreakdown,
        complexityMultiplier,
        deviceMultiplier
      };
    } catch (error) {
      console.error(`Error calculating TCO for vendor ${vendor}:`, error);
      return {
        totalTCO: 0,
        totalInitialCosts: 0,
        annualCosts: 0,
        migrationCost: 0,
        totalSavings: 0,
        savingsPercentage: 0,
        annualSavings: 0,
        costBreakdown: {
          hardware: 0,
          networkRedesign: 0,
          implementation: 0,
          training: 0,
          maintenance: 0,
          licensing: 0,
          personnel: 0,
          downtime: 0
        },
        error: error.message
      };
    }
  }
  
  // Calculate device count multiplier based on org size
  calculateDeviceMultiplier(orgSize, deviceCount) {
    let baseDeviceCount;
    
    // Standard device counts for org sizes
    switch (orgSize) {
      case 'small':
        baseDeviceCount = 500;
        break;
      case 'medium':
        baseDeviceCount = 2500;
        break;
      case 'large':
        baseDeviceCount = 10000;
        break;
      default:
        baseDeviceCount = 2500;
    }
    
    // Scale using square root for diminishing returns on larger scale
    return Math.pow(deviceCount / baseDeviceCount, 0.85);
  }
  
  calculateImplementationTime(vendor, orgSize) {
    try {
      if (!window.vendorData[vendor] || !window.vendorData[vendor][orgSize] || !window.vendorData[vendor][orgSize].implementationTimeline) {
        return {
          totalDays: 0,
          phases: {}
        };
      }
      
      const vendorInfo = window.vendorData[vendor][orgSize];
      const timeline = vendorInfo.implementationTimeline;
      const cloudBased = window.vendorData[vendor].cloudBased;
      const complexityMultiplier = window.calculateComplexityMultiplier(vendor, cloudBased);
      
      // Calculate adjusted timeline for each phase
      const adjustedTimeline = {};
      let totalDays = 0;
      
      for (const phase in timeline) {
        const phaseDays = timeline[phase] * complexityMultiplier;
        adjustedTimeline[phase] = phaseDays;
        totalDays += phaseDays;
      }
      
      return {
        totalDays,
        phases: adjustedTimeline,
        complexityMultiplier
      };
    } catch (error) {
      console.error(`Error calculating implementation time for vendor ${vendor}:`, error);
      return {
        totalDays: 0,
        phases: {},
        error: error.message
      };
    }
  }
  
  updateUI() {
    try {
      if (!this.results) return;
      
      // Update charts
      if (window.chartBuilder) {
        window.chartBuilder.updateTCOComparisonChart(this.results);
        window.chartBuilder.updateCumulativeCostChart(this.results);
        
        // Get current active vendor and portnox for breakdown charts
        const currentVendor = window.uiController ? window.uiController.activeVendor : 'cisco';
        window.chartBuilder.updateBreakdownCharts(currentVendor, 'portnox');
      }
      
      // Update TCO summary table
      if (window.uiController) {
        window.uiController.populateTCOSummaryTable(this.results);
        window.uiController.updateAnnualCostsTable(this.results);
        window.uiController.updateImplementationTable(this.results);
        window.uiController.updatePortnoxAdvantageSection(this.results);
      }
      
      // Show success notification
      if (window.notificationManager && this.calculationCount > 1) {
        window.notificationManager.success('TCO calculation completed successfully');
      }
    } catch (error) {
      console.error("Error updating UI with calculation results:", error);
      
      if (window.notificationManager) {
        window.notificationManager.error(`Error updating UI: ${error.message}`);
      }
    }
  }
  
  // Export results to CSV
  exportResultsToCSV() {
    if (!this.resultsAvailable) {
      if (window.notificationManager) {
        window.notificationManager.warn('No calculation results available to export');
      }
      return false;
    }
    
    try {
      const results = this.results;
      const vendors = Object.keys(window.vendorData);
      
      // Prepare CSV data
      let csvData = [
        ['Vendor', 'Initial Costs', 'Annual Costs', 'Migration Costs', 'Total TCO', 'Savings vs Current', 'Savings %']
      ];
      
      vendors.forEach(vendor => {
        if (!results[vendor]) return;
        
        csvData.push([
          window.vendorData[vendor].name,
          results[vendor].totalInitialCosts.toFixed(2),
          results[vendor].annualCosts.toFixed(2),
          results[vendor].migrationCost.toFixed(2),
          results[vendor].totalTCO.toFixed(2),
          results[vendor].totalSavings.toFixed(2),
          results[vendor].savingsPercentage.toFixed(2)
        ]);
      });
      
      // Create CSV content
      const csvContent = csvData.map(row => row.join(',')).join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `nac-tco-comparison-${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return true;
    } catch (error) {
      console.error('Error exporting results to CSV:', error);
      
      if (window.notificationManager) {
        window.notificationManager.error(`Error exporting to CSV: ${error.message}`);
      }
      
      return false;
    }
  }
  
  // Export detailed results as JSON
  exportResultsAsJSON() {
    if (!this.resultsAvailable) {
      if (window.notificationManager) {
        window.notificationManager.warn('No calculation results available to export');
      }
      return false;
    }
    
    try {
      const jsonData = JSON.stringify(this.results, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `nac-tco-detailed-results-${new Date().toISOString().slice(0, 10)}.json`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return true;
    } catch (error) {
      console.error('Error exporting results as JSON:', error);
      
      if (window.notificationManager) {
        window.notificationManager.error(`Error exporting to JSON: ${error.message}`);
      }
      
      return false;
    }
  }
}
EOL

echo -e "${GREEN}Calculator.js enhanced successfully${NC}"

# Enhance the ChartBuilder class
echo -e "\n${YELLOW}Enhancing Chart Builder...${NC}"
cat > js/charts/chart-builder.js << 'EOL'
/**
 * Enhanced Chart Builder for creating and updating charts
 * Includes better mobile responsiveness and accessibility
 */

class ChartBuilder {
  constructor() {
    this.charts = {};
    this.chartDefaults = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 15,
            usePointStyle: true,
            pointStyle: 'square'
          }
        },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
          padding: 10,
          bodySpacing: 5,
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          },
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += window.formatCurrency(context.parsed.y);
              }
              return label;
            }
          }
        }
      }
    };
    
    this.chartColors = {
      cisco: '#049fd9',      // Cisco blue
      aruba: '#ff8300',      // Aruba orange
      forescout: '#005daa',  // Forescout blue
      nps: '#00a4ef',        // Microsoft blue
      portnox: '#2bd25b',    // Portnox green
      neutral: '#888888'     // Neutral gray
    };
    
    this.breakdownColors = [
      '#1B67B2', // Primary blue
      '#4D44AB', // Purple
      '#568C1C', // Green
      '#C77F1A', // Orange
      '#B54369', // Pink
      '#1CA43F', // Darker green
      '#5E5E5E', // Dark gray
      '#8884d8'  // Lavender
    ];
    
    this.isMobile = window.innerWidth < 768;
    
    // Listen for window resize to update mobile state
    window.addEventListener('resize', () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth < 768;
      
      // If mobile state changed, update charts
      if (wasMobile !== this.isMobile) {
        this.updateAllCharts();
      }
    });
  }
  
  updateAllCharts() {
    if (this.charts.tcoComparison) {
      this.charts.tcoComparison.update();
    }
    
    if (this.charts.cumulativeCost) {
      this.charts.cumulativeCost.update();
    }
    
    if (this.charts.currentBreakdown) {
      this.charts.currentBreakdown.update();
    }
    
    if (this.charts.altBreakdown) {
      this.charts.altBreakdown.update();
    }
  }
  
  initCharts() {
    this.initTCOComparisonChart();
    this.initCumulativeCostChart();
    this.initBreakdownCharts('cisco', 'portnox');
  }
  
  initTCOComparisonChart() {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx) {
      console.warn('TCO Comparison chart canvas element not found');
      return;
    }
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) {
      console.warn('Could not get 2D context for TCO Comparison chart');
      return;
    }
    
    // Define chart configuration
    const chartConfig = {
      type: 'bar',
      data: {
        labels: ['Cisco ISE', 'Aruba ClearPass', 'Forescout', 'Microsoft NPS', 'Portnox Cloud'],
        datasets: [
          {
            label: 'Initial Costs',
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'Migration Costs',
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(255, 159, 64, 0.7)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'Ongoing Costs',
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          }
        ]
      },
      options: {
        ...this.chartDefaults,
        indexAxis: this.isMobile ? 'y' : 'x', // Horizontal bars on mobile
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false
            },
            ticks: {
              autoSkip: false,
              maxRotation: this.isMobile ? 0 : 45,
              minRotation: 0
            },
            title: {
              display: !this.isMobile,
              text: 'Vendors'
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            },
            title: {
              display: true,
              text: 'Cost ($)'
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Total Cost of Ownership Comparison',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          datalabels: {
            display: false
          }
        }
      }
    };
    
    // Create the chart
    this.charts.tcoComparison = new Chart(ctxCanvas, chartConfig);
  }
  
  updateTCOComparisonChart(results) {
    if (!this.charts.tcoComparison || !results) {
      console.warn('TCO Comparison chart or results not available');
      return;
    }
    
    // Safely get vendors
    const vendors = Object.keys(window.vendorData || {});
    if (!vendors.length) {
      console.warn('No vendor data available');
      return;
    }
    
    const labels = vendors.map(vendor => window.vendorData[vendor].name);
    const initialCostsData = vendors.map(vendor => {
      return results[vendor] ? results[vendor].totalInitialCosts : 0;
    });
    const migrationCostsData = vendors.map(vendor => {
      return results[vendor] ? results[vendor].migrationCost || 0 : 0;
    });
    const ongoingCostsData = vendors.map(vendor => {
      return results[vendor] ? results[vendor].annualCosts * results.yearsToProject : 0;
    });
    
    // Update chart data
    this.charts.tcoComparison.data.labels = labels;
    this.charts.tcoComparison.data.datasets[0].data = initialCostsData;
    this.charts.tcoComparison.data.datasets[1].data = migrationCostsData;
    this.charts.tcoComparison.data.datasets[2].data = ongoingCostsData;
    
    // Update title to include years
    const chartTitle = `Total Cost of Ownership Comparison (${results.yearsToProject} Years)`;
    this.charts.tcoComparison.options.plugins.title.text = chartTitle;
    
    // Update indexAxis based on mobile state
    this.charts.tcoComparison.options.indexAxis = this.isMobile ? 'y' : 'x';
    
    // Update chart
    this.charts.tcoComparison.update();
  }
  
  initCumulativeCostChart() {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx) {
      console.warn('Cumulative Cost chart canvas element not found');
      return;
    }
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) {
      console.warn('Could not get 2D context for Cumulative Cost chart');
      return;
    }
    
    // Define chart configuration
    const chartConfig = {
      type: 'line',
      data: {
        labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        elements: {
          line: {
            tension: 0.1,
            borderWidth: 2
          },
          point: {
            radius: 3,
            hoverRadius: 6
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            title: {
              display: !this.isMobile,
              text: 'Timeline'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            },
            title: {
              display: true,
              text: 'Cumulative Cost ($)'
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Cumulative Costs Over Time',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    };
    
    // Create the chart
    this.charts.cumulativeCost = new Chart(ctxCanvas, chartConfig);
  }
  
  updateCumulativeCostChart(results) {
    if (!this.charts.cumulativeCost || !results) {
      console.warn('Cumulative Cost chart or results not available');
      return;
    }
    
    // Safely get vendors
    const vendors = Object.keys(window.vendorData || {});
    if (!vendors.length) {
      console.warn('No vendor data available');
      return;
    }
    
    const yearsToProject = results.yearsToProject || 3;
    const currentVendor = window.uiController ? window.uiController.activeVendor : null;
    
    // Generate labels
    const labels = ['Initial'];
    for (let i = 1; i <= yearsToProject; i++) {
      labels.push(`Year ${i}`);
    }
    
    // Create datasets for each vendor
    const datasets = [];
    
    vendors.forEach(vendor => {
      if (!results[vendor]) return;
      
      const vendorColor = this.chartColors[vendor] || this.chartColors.neutral;
      const isCurrentVendor = vendor === currentVendor;
      const isPortnox = vendor === 'portnox';
      const data = [];
      
      // Initial costs
      const initialCost = results[vendor].totalInitialCosts + (results[vendor].migrationCost || 0);
      data.push(initialCost);
      
      // Cumulative costs for each year
      for (let i = 1; i <= yearsToProject; i++) {
        data.push(initialCost + (results[vendor].annualCosts * i));
      }
      
      datasets.push({
        label: window.vendorData[vendor].name,
        data: data,
        backgroundColor: vendorColor,
        borderColor: vendorColor,
        borderWidth: (isCurrentVendor || isPortnox) ? 3 : 2,
        pointRadius: (isCurrentVendor || isPortnox) ? 4 : 3,
        pointHoverRadius: 7,
        tension: 0.1,
        // Dashed line for anything except current vendor and Portnox
        borderDash: (!isCurrentVendor && !isPortnox) ? [5, 5] : []
      });
    });
    
    // Update chart data
    this.charts.cumulativeCost.data.labels = labels;
    this.charts.cumulativeCost.data.datasets = datasets;
    
    // Update chart
    this.charts.cumulativeCost.update();
  }
  
  initBreakdownCharts(currentVendor, altVendor) {
    const currentCtx = document.getElementById('current-breakdown-chart');
    const altCtx = document.getElementById('alternative-breakdown-chart');
    
    if (!currentCtx || !altCtx) {
      console.warn('Breakdown chart canvas elements not found');
      return;
    }
    
    const currentCtxCanvas = currentCtx.getContext('2d');
    const altCtxCanvas = altCtx.getContext('2d');
    
    if (!currentCtxCanvas || !altCtxCanvas) {
      console.warn('Could not get 2D context for breakdown charts');
      return;
    }
    
    // Common pie chart options
    const pieOptions = {
      ...this.chartDefaults,
      cutout: '35%', // Make it a doughnut chart for better visibility
      plugins: {
        ...this.chartDefaults.plugins,
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
              return `${label}: ${window.formatCurrency(value)} (${percentage}%)`;
            }
          }
        },
        datalabels: {
          display: context => {
            // Only show labels for segments that are at least 5% of the total
            const data = context.dataset.data;
            const total = data.reduce((a, b) => a + b, 0);
            return context.dataIndex >= 0 && (data[context.dataIndex] / total) >= 0.05;
          },
          formatter: (value, context) => {
            const data = context.dataset.data;
            const total = data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(0) : '0';
            return percentage + '%';
          },
          color: '#fff',
          font: {
            weight: 'bold'
          }
        }
      }
    };
    
    // Labels common to both charts
    const labels = [
      'Hardware', 
      'Network Redesign', 
      'Implementation', 
      'Training', 
      'Maintenance', 
      'Licensing', 
      'Personnel', 
      'Downtime'
    ];
    
    // Create placeholder charts, to be updated with actual data
    this.charts.currentBreakdown = new Chart(currentCtxCanvas, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: this.breakdownColors,
          borderWidth: 1,
          borderColor: '#ffffff'
        }]
      },
      options: {
        ...pieOptions,
        plugins: {
          ...pieOptions.plugins,
          title: {
            display: true,
            text: window.vendorData[currentVendor]?.name || 'Current Solution',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
    
    this.charts.altBreakdown = new Chart(altCtxCanvas, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: this.breakdownColors,
          borderWidth: 1,
          borderColor: '#ffffff'
        }]
      },
      options: {
        ...pieOptions,
        plugins: {
          ...pieOptions.plugins,
          title: {
            display: true,
            text: window.vendorData[altVendor]?.name || 'Alternative Solution',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }
  
  updateBreakdownCharts(currentVendor, altVendor) {
    if (!this.charts.currentBreakdown || !this.charts.altBreakdown || !window.calculator || !window.calculator.results) {
      console.warn('Breakdown charts or results not available');
      return;
    }
    
    const results = window.calculator.results;
    
    const createBreakdownData = (vendor) => {
      // Check if vendor exists in results
      const vendorResults = results[vendor];
      if (!vendorResults || !vendorResults.costBreakdown) {
        console.warn(`No cost breakdown data found for vendor: ${vendor}`);
        return [0, 0, 0, 0, 0, 0, 0, 0];
      }
      
      // Create breakdown data from costBreakdown object
      return [
        vendorResults.costBreakdown.hardware || 0,
        vendorResults.costBreakdown.networkRedesign || 0,
        vendorResults.costBreakdown.implementation || 0,
        vendorResults.costBreakdown.training || 0,
        vendorResults.costBreakdown.maintenance || 0,
        vendorResults.costBreakdown.licensing || 0,
        vendorResults.costBreakdown.personnel || 0,
        vendorResults.costBreakdown.downtime || 0
      ];
    };
    
    // Update chart titles
    this.charts.currentBreakdown.options.plugins.title.text = window.vendorData[currentVendor]?.name || 'Current Solution';
    this.charts.altBreakdown.options.plugins.title.text = window.vendorData[altVendor]?.name || 'Alternative Solution';
    
    // Update charts
    try {
      this.charts.currentBreakdown.data.datasets[0].data = createBreakdownData(currentVendor);
      this.charts.currentBreakdown.update();
    } catch (err) {
      console.error("Error updating current breakdown chart:", err);
    }
    
    try {
      this.charts.altBreakdown.data.datasets[0].data = createBreakdownData(altVendor);
      this.charts.altBreakdown.update();
    } catch (err) {
      console.error("Error updating alternative breakdown chart:", err);
    }
  }
  
  // Additional method to create implementation timeline chart
  createImplementationChart(containerId, currentVendor, alternativeVendor) {
    const ctx = document.getElementById(containerId);
    if (!ctx) {
      console.warn(`Implementation chart canvas element not found: ${containerId}`);
      return null;
    }
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) {
      console.warn(`Could not get 2D context for implementation chart: ${containerId}`);
      return null;
    }
    
    const results = window.calculator?.results;
    if (!results || !results.implementationResults) {
      console.warn('Implementation results not available');
      return null;
    }
    
    const currentImplementation = results.implementationResults[currentVendor];
    const altImplementation = results.implementationResults[alternativeVendor];
    
    if (!currentImplementation || !altImplementation) {
      console.warn('Implementation data not available for one or both vendors');
      return null;
    }
    
    // Get implementation phases
    const phases = [];
    for (const phase in currentImplementation.phases) {
      if (!phases.includes(phase)) {
        phases.push(phase);
      }
    }
    
    for (const phase in altImplementation.phases) {
      if (!phases.includes(phase)) {
        phases.push(phase);
      }
    }
    
    // Prepare data
    const currentData = phases.map(phase => currentImplementation.phases[phase] || 0);
    const altData = phases.map(phase => altImplementation.phases[phase] || 0);
    
    // Format phase labels for display
    const formattedPhases = phases.map(phase => {
      // Convert camelCase to Title Case
      return phase
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
    });
    
    // Create chart
    const chart = new Chart(ctxCanvas, {
      type: 'bar',
      data: {
        labels: formattedPhases,
        datasets: [
          {
            label: window.vendorData[currentVendor]?.name || 'Current Solution',
            data: currentData,
            backgroundColor: this.chartColors[currentVendor] || this.chartColors.neutral,
            borderColor: this.chartColors[currentVendor] || this.chartColors.neutral,
            borderWidth: 1
          },
          {
            label: window.vendorData[alternativeVendor]?.name || 'Alternative Solution',
            data: altData,
            backgroundColor: this.chartColors[alternativeVendor] || this.chartColors.neutral,
            borderColor: this.chartColors[alternativeVendor] || this.chartColors.neutral,
            borderWidth: 1
          }
        ]
      },
      options: {
        ...this.chartDefaults,
        indexAxis: this.isMobile ? 'y' : 'x',
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Days'
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Implementation Timeline Comparison',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y.toFixed(1) + ' days';
                }
                return label;
              }
            }
          }
        }
      }
    });
    
    return chart;
  }
}
EOL

echo -e "${GREEN}Chart Builder enhanced successfully${NC}"

# Create enhanced UI Controller
echo -e "\n${YELLOW}Enhancing UI Controller...${NC}"
cat > js/components/ui-controller.js << 'EOL'
/**
 * Enhanced UI Controller for managing user interface interactions and state
 */

class UIController {
  constructor() {
    this.activeVendor = null;
    this.isInitialized = false;
    this.eventListeners = {};
    this.sensitivityAnalysis = {
      enabled: false,
      factors: {
        deviceCount: [0.5, 1, 1.5, 2],
        yearsToProject: [1, 3, 5, 10],
        complexity: [0.75, 1, 1.25, 1.5]
      }
    };
    
    this.init();
  }
  
  init() {
    if (this.isInitialized) return;
    
    // Initialize vendor selection
    this.initVendorSelection();
    
    // Initialize export buttons
    this.initExportButtons();
    
    // Set default active vendor
    this.setActiveVendor('cisco');
    
    this.isInitialized = true;
  }
  
  initVendorSelection() {
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
      const vendor = card.getAttribute('data-vendor');
      
      if (!vendor) return;
      
      // Add click event listener
      card.addEventListener('click', () => {
        this.setActiveVendor(vendor);
      });
      
      // Add keyboard accessibility
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-pressed', 'false');
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.setActiveVendor(vendor);
        }
      });
    });
  }
  
  initExportButtons() {
    const exportCsvBtn = document.getElementById('export-csv-btn');
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => {
        this.exportToCSV();
      });
    }
    
    if (exportPdfBtn) {
      exportPdfBtn.addEventListener('click', () => {
        this.exportToPDF();
      });
    }
  }
  
  // Export to CSV
  exportToCSV() {
    if (!window.calculator || !window.calculator.resultsAvailable) {
      if (window.notificationManager) {
        window.notificationManager.warn('No calculation results to export. Please calculate TCO first.');
      }
      return;
    }
    
    try {
      // Export TCO summary table
      const exported = window.exportTableToCSV('tco-summary-table', `nac-tco-comparison-${new Date().toISOString().slice(0, 10)}.csv`);
      
      if (exported && window.notificationManager) {
        window.notificationManager.success('TCO comparison exported to CSV successfully');
      }
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      
      if (window.notificationManager) {
        window.notificationManager.error(`Error exporting to CSV: ${error.message}`);
      }
    }
  }
  
  // Export to PDF
  exportToPDF() {
    if (!window.calculator || !window.calculator.resultsAvailable) {
      if (window.notificationManager) {
        window.notificationManager.warn('No calculation results to export. Please calculate TCO first.');
      }
      return;
    }
    
    try {
      if (window.notificationManager) {
        window.notificationManager.info('Preparing PDF export...');
      }
      
      // This is a placeholder for PDF export functionality
      // Would normally use a library like jsPDF or html2pdf
      
      alert('PDF export functionality is not implemented in this version. Please use CSV export instead.');
      
      if (window.notificationManager) {
        window.notificationManager.warn('PDF export is not fully implemented yet');
      }
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      
      if (window.notificationManager) {
        window.notificationManager.error(`Error exporting to PDF: ${error.message}`);
      }
    }
  }
  
  // Set active vendor
  setActiveVendor(vendor) {
    // Skip if already active
    if (this.activeVendor === vendor) return;
    
    const oldVendor = this.activeVendor;
    this.activeVendor = vendor;
    
    // Update vendor cards UI
    document.querySelectorAll('.vendor-card').forEach(card => {
      const cardVendor = card.getAttribute('data-vendor');
      const isActive = cardVendor === vendor;
      
      card.classList.toggle('active', isActive);
      card.setAttribute('aria-pressed', isActive.toString());
    });
    
    // Update charts if results are available
    if (window.chartBuilder && window.calculator && window.calculator.resultsAvailable) {
      window.chartBuilder.updateBreakdownCharts(vendor, 'portnox');
    }
    
    // Update comparison section
    this.updatePortnoxAdvantageSection();
    
    // Trigger event
    this.triggerEvent('vendorChanged', { oldVendor, newVendor: vendor });
  }
  
  // Populate TCO summary table
  populateTCOSummaryTable(results) {
    if (!results) return;
    
    const tableBody = document.getElementById('tco-summary-table-body');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get vendors
    const vendors = Object.keys(window.vendorData || {});
    if (!vendors.length) return;
    
    // Create rows for each vendor
    vendors.forEach(vendor => {
      if (!results[vendor]) return;
      
      const vendorName = window.vendorData[vendor].name;
      const initialCosts = results[vendor].totalInitialCosts;
      const annualCosts = results[vendor].annualCosts;
      const migrationCost = results[vendor].migrationCost || 0;
      const totalTCO = results[vendor].totalTCO;
      
      // Create row element
      const row = document.createElement('tr');
      
      // Add classes for highlighting
      if (vendor === this.activeVendor) {
        row.classList.add('current-vendor');
      }
      
      if (vendor === 'portnox') {
        row.classList.add('portnox-vendor');
      }
      
      // Populate cells
      row.innerHTML = `
        <td>${vendorName}</td>
        <td>${window.formatCurrency(initialCosts)}</td>
        <td>${window.formatCurrency(annualCosts)}/year</td>
        <td>${window.formatCurrency(migrationCost)}</td>
        <td>${window.formatCurrency(totalTCO)}</td>
      `;
      
      // Add to table
      tableBody.appendChild(row);
    });
  }
  
  // Update annual costs table
  updateAnnualCostsTable(results) {
    if (!results) return;
    
    const tableBody = document.getElementById('annual-costs-table-body');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get current vendor and portnox data
    const currentVendor = this.activeVendor;
    const currentVendorName = window.vendorData[currentVendor]?.name || 'Current';
    
    if (!results[currentVendor] || !results['portnox']) return;
    
    // Cost categories
    const categories = [
      { id: 'maintenance', name: 'Maintenance' },
      { id: 'licensing', name: 'Licensing' },
      { id: 'personnel', name: 'Personnel' },
      { id: 'downtime', name: 'Downtime Costs' },
      { id: 'total', name: 'Total Annual Costs' }
    ];
    
    // Calculate annual costs
    const currentAnnual = {
      maintenance: results[currentVendor].costBreakdown.maintenance / results.yearsToProject,
      licensing: results[currentVendor].costBreakdown.licensing / results.yearsToProject,
      personnel: results[currentVendor].costBreakdown.personnel / results.yearsToProject,
      downtime: results[currentVendor].costBreakdown.downtime / results.yearsToProject
    };
    
    const portnoxAnnual = {
      maintenance: results['portnox'].costBreakdown.maintenance / results.yearsToProject,
      licensing: results['portnox'].costBreakdown.licensing / results.yearsToProject,
      personnel: results['portnox'].costBreakdown.personnel / results.yearsToProject,
      downtime: results['portnox'].costBreakdown.downtime / results.yearsToProject
    };
    
    // Calculate totals
    currentAnnual.total = currentAnnual.maintenance + currentAnnual.licensing + 
                          currentAnnual.personnel + currentAnnual.downtime;
    
    portnoxAnnual.total = portnoxAnnual.maintenance + portnoxAnnual.licensing + 
                           portnoxAnnual.personnel + portnoxAnnual.downtime;
    
    // Create rows
    categories.forEach(category => {
      const current = currentAnnual[category.id];
      const portnox = portnoxAnnual[category.id];
      const savings = current - portnox;
      const savingsPercentage = current > 0 ? (savings / current) * 100 : 0;
      
      // Create row
      const row = document.createElement('tr');
      
      // Add classes for total row
      if (category.id === 'total') {
        row.classList.add('total-row');
      }
      
      // Add classes for savings
      const savingsClass = savings > 0 ? 'positive-savings' : (savings < 0 ? 'negative-savings' : '');
      
      // Populate cells
      row.innerHTML = `
        <td>${category.name}</td>
        <td>${window.formatCurrency(current)}</td>
        <td>${window.formatCurrency(portnox)}</td>
        <td class="${savingsClass}">${window.formatCurrency(savings)} (${window.formatPercentage(savingsPercentage)})</td>
      `;
      
      // Add to table
      tableBody.appendChild(row);
    });
  }
  
  // Update implementation table
  updateImplementationTable(results) {
    if (!results) return;
    
    const tableBody = document.getElementById('implementation-table-body');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get implementation data
    const implementationResults = results.implementationResults;
    if (!implementationResults) return;
    
    const currentVendor = this.activeVendor;
    const currentVendorName = window.vendorData[currentVendor]?.name || 'Current';
    
    if (!implementationResults[currentVendor] || !implementationResults['portnox']) return;
    
    const currentImplementation = implementationResults[currentVendor];
    const portnoxImplementation = implementationResults['portnox'];
    
    // Get all phases
    const allPhases = new Set();
    
    // Add current vendor phases
    for (const phase in currentImplementation.phases) {
      allPhases.add(phase);
    }
    
    // Add portnox phases
    for (const phase in portnoxImplementation.phases) {
      allPhases.add(phase);
    }
    
    // Create rows for each phase
    Array.from(allPhases).forEach(phaseId => {
      // Format phase name from camelCase to Title Case
      const phaseName = phaseId
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
      
      const currentDays = currentImplementation.phases[phaseId] || 0;
      const portnoxDays = portnoxImplementation.phases[phaseId] || 0;
      const timeSavings = currentDays - portnoxDays;
      const savingsPercentage = currentDays > 0 ? (timeSavings / currentDays) * 100 : 0;
      
      // Create row
      const row = document.createElement('tr');
      
      // Add classes for savings
      const savingsClass = timeSavings > 0 ? 'positive-savings' : (timeSavings < 0 ? 'negative-savings' : '');
      
      // Populate cells
      row.innerHTML = `
        <td>${phaseName}</td>
        <td>${currentDays.toFixed(1)} days</td>
        <td>${portnoxDays.toFixed(1)} days</td>
        <td class="${savingsClass}">${timeSavings.toFixed(1)} days (${savingsPercentage.toFixed(1)}%)</td>
      `;
      
      // Add to table
      tableBody.appendChild(row);
    });
    
    // Add total row
    const totalCurrentDays = currentImplementation.totalDays || 0;
    const totalPortnoxDays = portnoxImplementation.totalDays || 0;
    const totalTimeSavings = totalCurrentDays - totalPortnoxDays;
    const totalSavingsPercentage = totalCurrentDays > 0 ? (totalTimeSavings / totalCurrentDays) * 100 : 0;
    
    // Create total row
    const totalRow = document.createElement('tr');
    totalRow.classList.add('total-row');
    
    // Add classes for savings
    const totalSavingsClass = totalTimeSavings > 0 ? 'positive-savings' : (totalTimeSavings < 0 ? 'negative-savings' : '');
    
    // Populate cells
    totalRow.innerHTML = `
      <td><strong>Total Implementation Time</strong></td>
      <td><strong>${totalCurrentDays.toFixed(1)} days</strong></td>
      <td><strong>${totalPortnoxDays.toFixed(1)} days</strong></td>
      <td class="${totalSavingsClass}"><strong>${totalTimeSavings.toFixed(1)} days (${totalSavingsPercentage.toFixed(1)}%)</strong></td>
    `;
    
    // Add to table
    tableBody.appendChild(totalRow);
  }
  
  // Update Portnox advantage section
  updatePortnoxAdvantageSection(results) {
    if (!results) return;
    
    const currentVendor = this.activeVendor;
    
    // Skip if current vendor is portnox
    if (currentVendor === 'portnox') {
      document.querySelectorAll('.portnox-spotlight, .comparison-highlight-card').forEach(element => {
        element.classList.add('hidden');
      });
      return;
    } else {
      document.querySelectorAll('.portnox-spotlight, .comparison-highlight-card').forEach(element => {
        element.classList.remove('hidden');
      });
    }
    
    if (!results[currentVendor] || !results['portnox']) return;
    
    // Get comparison data
    const currentResult = results[currentVendor];
    const portnoxResult = results['portnox'];
    
    // Calculate savings
    const totalSavings = portnoxResult.totalSavings;
    const savingsPercentage = portnoxResult.savingsPercentage;
    
    // Calculate implementation time savings
    const implementationResults = results.implementationResults;
    
    if (implementationResults && implementationResults[currentVendor] && implementationResults['portnox']) {
      const currentImplementation = implementationResults[currentVendor];
      const portnoxImplementation = implementationResults['portnox'];
      
      const timeSavings = currentImplementation.totalDays - portnoxImplementation.totalDays;
      const timeSavingsPercentage = currentImplementation.totalDays > 0 
        ? (timeSavings / currentImplementation.totalDays) * 100 
        : 0;
      
      // Update implementation time display
      const implementationTimeElement = document.getElementById('portnox-implementation-time');
      if (implementationTimeElement) {
        implementationTimeElement.textContent = `${timeSavingsPercentage.toFixed(1)}%`;
      }
      
      // Update comparison implementation display
      const comparisonImplementationElement = document.getElementById('comparison-implementation');
      if (comparisonImplementationElement) {
        comparisonImplementationElement.textContent = `${timeSavingsPercentage.toFixed(1)}%`;
      }
      
      // Update progress bar
      const progressBar = document.querySelector('.comparison-metrics .progress');
      if (progressBar) {
        progressBar.style.width = `${Math.min(100, timeSavingsPercentage)}%`;
      }
      
      // Update progress labels
      const progressLabels = document.querySelector('.comparison-metrics .progress-labels');
      if (progressLabels) {
        progressLabels.innerHTML = `
          <span>0%</span>
          <span>${timeSavingsPercentage.toFixed(1)}% Faster</span>
        `;
      }
    }
    
    // Update savings display
    const savingsAmountElement = document.getElementById('portnox-savings-amount');
    if (savingsAmountElement) {
      savingsAmountElement.textContent = window.formatCurrency(totalSavings);
    }
    
    const savingsPercentageElement = document.getElementById('portnox-savings-percentage');
    if (savingsPercentageElement) {
      savingsPercentageElement.textContent = `${savingsPercentage.toFixed(1)}%`;
    }
    
    // Update comparison savings display
    const comparisonSavingsElement = document.getElementById('comparison-savings');
    if (comparisonSavingsElement) {
      comparisonSavingsElement.textContent = window.formatCurrency(totalSavings);
    }
    
    // Update savings progress bar
    const savingsProgressBar = document.querySelector('.comparison-metrics:first-child .progress');
    if (savingsProgressBar) {
      savingsProgressBar.style.width = `${Math.min(100, savingsPercentage)}%`;
    }
    
    // Update savings progress labels
    const savingsProgressLabels = document.querySelector('.comparison-metrics:first-child .progress-labels');
    if (savingsProgressLabels) {
      savingsProgressLabels.innerHTML = `
        <span>0%</span>
        <span>${savingsPercentage.toFixed(1)}% Savings</span>
      `;
    }
  }
  
  // Run sensitivity analysis
  runSensitivityAnalysis() {
    if (!this.sensitivityAnalysis.enabled || !window.calculator) return null;
    
    const baselineResults = window.calculator.results;
    if (!baselineResults) return null;
    
    // Store original input values
    const originalInputs = {
      deviceCount: document.getElementById('device-count').value,
      yearsToProject: document.getElementById('years-to-project').value
    };
    
    const analysisResults = {
      deviceCount: {},
      yearsToProject: {},
      complexity: {}
    };
    
    // Run analysis for device count variations
    this.sensitivityAnalysis.factors.deviceCount.forEach(factor => {
      const deviceCount = Math.round(originalInputs.deviceCount * factor);
      document.getElementById('device-count').value = deviceCount;
      
      // Calculate TCO with new device count
      const results = window.calculator.calculate();
      
      // Store results
      analysisResults.deviceCount[factor] = {
        deviceCount,
        results: window.deepCopy(results)
      };
    });
    
    // Restore original device count
    document.getElementById('device-count').value = originalInputs.deviceCount;
    
    // Run analysis for years to project variations
    this.sensitivityAnalysis.factors.yearsToProject.forEach(years => {
      document.getElementById('years-to-project').value = years;
      
      // Calculate TCO with new years
      const results = window.calculator.calculate();
      
      // Store results
      analysisResults.yearsToProject[years] = {
        years,
        results: window.deepCopy(results)
      };
    });
    
    // Restore original years to project
    document.getElementById('years-to-project').value = originalInputs.yearsToProject;
    
    // Recalculate with original values
    window.calculator.calculate();
    
    return analysisResults;
  }
  
  // Event system
  on(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    
    this.eventListeners[eventName].push(callback);
    return this;
  }
  
  off(eventName, callback) {
    if (!this.eventListeners[eventName]) return this;
    
    if (callback) {
      this.eventListeners[eventName] = this.eventListeners[eventName]
        .filter(cb => cb !== callback);
    } else {
      this.eventListeners[eventName] = [];
    }
    
    return this;
  }
  
  triggerEvent(eventName, data) {
    if (!this.eventListeners[eventName]) return;
    
    this.eventListeners[eventName].forEach(callback => {
      callback(data);
    });
  }
}
EOL

echo -e "${GREEN}UI Controller enhanced successfully${NC}"

# Update CSS with enhancements and fixes
echo -e "\n${YELLOW}Enhancing CSS...${NC}"
cat >> css/styles.css << 'EOL'

/* Enhanced styles for TCO Calculator */

/* Notification system */
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notification {
  background-color: var(--bg-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-md);
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  transform: translateX(120%);
  transition: transform 0.3s ease-out;
  border-left: 4px solid var(--primary-color);
  width: 100%;
  box-sizing: border-box;
}

.notification.show {
  transform: translateX(0);
}

.notification-icon {
  font-size: 1.2rem;
  color: var(--primary-color);
  flex-shrink: 0;
}

.notification-message {
  flex: 1;
  font-size: 0.95rem;
}

.notification-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0;
  margin-left: var(--spacing-xs);
  flex-shrink: 0;
}

.notification-success {
  border-left-color: var(--accent-color);
}

.notification-success .notification-icon {
  color: var(--accent-color);
}

.notification-error {
  border-left-color: var(--danger-color);
}

.notification-error .notification-icon {
  color: var(--danger-color);
}

.notification-warning {
  border-left-color: var(--warning-color);
}

.notification-warning .notification-icon {
  color: var(--warning-color);
}

.notification-info {
  border-left-color: var(--primary-light);
}

.notification-info .notification-icon {
  color: var(--primary-light);
}

/* Loading indicators */
.loading-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 100;
  transition: opacity 0.3s ease;
}

.loading-indicator.fade-out {
  opacity: 0;
}

.loading-indicator.no-overlay {
  position: relative;
  background-color: transparent;
  padding: var(--spacing-md);
  height: auto;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-md);
}

.loading-text {
  color: var(--text-secondary);
  font-size: 0.95rem;
  text-align: center;
  margin-bottom: var(--spacing-md);
}

/* Progress bar in loading indicator */
.progress-container {
  width: 200px;
  margin-bottom: var(--spacing-md);
}

.progress-bar {
  height: 6px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--accent-color);
  width: 0%;
  transition: width 0.3s ease;
}

/* Global loading indicator */
.global-loading-indicator {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.global-loading-indicator.show {
  opacity: 1;
}

.global-spinner-container {
  background-color: var(--bg-white);
  border-radius: 50%;
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-lg);
  margin-bottom: var(--spacing-md);
}

.global-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.global-loading-text {
  color: var(--text-white);
  font-size: 1.1rem;
  font-weight: 600;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Form validation */
.input-group.has-error input,
.input-group.has-error select,
.invalid {
  border-color: var(--danger-color) !important;
  background-color: rgba(181, 67, 105, 0.05) !important;
}

.error-message {
  color: var(--danger-color);
  font-size: 0.8rem;
  margin-top: var(--spacing-xs);
}

/* Disabled form elements */
.input-group.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.input-group.disabled label {
  color: var(--text-light);
}

/* Table enhancements */
.data-table .total-row {
  font-weight: 600;
  background-color: var(--bg-light);
}

.data-table .current-vendor {
  background-color: rgba(27, 103, 178, 0.1);
}

.data-table .portnox-vendor {
  background-color: rgba(43, 210, 91, 0.1);
}

.data-table .positive-savings {
  color: var(--accent-dark);
}

.data-table .negative-savings {
  color: var(--danger-color);
}

/* Tooltip */
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltip-text {
  visibility: hidden;
  width: 200px;
  background-color: var(--text-primary);
  color: var(--text-white);
  text-align: center;
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm);
  position: absolute;
  z-index: 999;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  box-shadow: var(--shadow-md);
  font-size: 0.85rem;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

.tooltip .tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: var(--text-primary) transparent transparent transparent;
}

/* Keyboard focus styles */
:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.tab-button:focus-visible,
.sub-tab-button:focus-visible,
.vendor-card:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.btn:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Accessibility enhancements */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Skip to content link for keyboard users */
.skip-to-content {
  position: absolute;
  top: -50px;
  left: 0;
  background: var(--accent-color);
  color: var(--text-white);
  padding: var(--spacing-sm) var(--spacing-md);
  z-index: 999;
  transition: top 0.3s;
}

.skip-to-content:focus {
  top: 0;
}

/* Updated responsive design */
@media (max-width: 1100px) {
  .calculator-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
  .notification-container {
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .results-grid {
    grid-template-columns: 1fr;
  }

  .comparison-metrics {
    grid-template-columns: 1fr;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .app-header {
    flex-direction: column;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
  }

  .header-actions {
    width: 100%;
    justify-content: center;
  }

  .tabs {
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .notification-container {
    left: 20px;
    right: 20px;
    max-width: none;
  }
  
  .tab-button {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 0.9rem;
  }
  
  .chart-container {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .calculator-container {
    padding: var(--spacing-md);
  }

  .vendor-options {
    grid-template-columns: 1fr;
  }
  
  .export-options {
    flex-direction: column;
  }
  
  .chart-container {
    height: 250px;
  }
}

/* Print styles */
@media print {
  .app-header,
  .app-footer,
  .sidebar,
  .tabs,
  .export-options {
    display: none !important;
  }
  
  .calculator-container {
    display: block;
    padding: 0;
  }
  
  .results-container {
    box-shadow: none;
    border: none;
  }
  
  .chart-container {
    height: 400px;
  }
  
  .result-card {
    break-inside: avoid;
    margin-bottom: 20px;
  }
  
  .tab-content {
    display: block !important;
  }
  
  .tab-pane {
    display: block !important;
    margin-bottom: 30px;
  }
}
EOL

echo -e "${GREEN}CSS enhancements added successfully${NC}"

# Update main.js to properly initialize everything
echo -e "\n${YELLOW}Updating main.js...${NC}"
cat > js/main.js << 'EOL'
/**
 * Main JavaScript file for the TCO Calculator
 * Enhanced version with proper initialization and error handling
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing TCO Calculator...');
  
  try {
    // Add skip-to-content link for accessibility
    addSkipToContentLink();
    
    // Initialize DOM Cache
    if (typeof DOMCache === 'undefined') {
      throw new Error("DOMCache class is not defined. Make sure js/managers/dom-cache.js is loaded properly.");
    }
    window.domCache = new DOMCache();
    window.domCache.init();
    console.log('DOM Cache initialized');
    
    // Initialize Tab Manager
    if (typeof TabManager === 'undefined') {
      throw new Error("TabManager class is not defined. Make sure js/managers/tab-manager.js is loaded properly.");
    }
    window.tabManager = new TabManager();
    console.log('Tab Manager initialized');
    
    // Initialize Validation Manager
    if (typeof ValidationManager === 'undefined') {
      throw new Error("ValidationManager class is not defined. Make sure js/managers/validation-manager.js is loaded properly.");
    }
    window.validationManager = new ValidationManager();
    console.log('Validation Manager initialized');
    
    // Initialize Notification Manager
    if (typeof NotificationManager === 'undefined') {
      throw new Error("NotificationManager class is not defined. Make sure js/managers/notification-manager.js is loaded properly.");
    }
    window.notificationManager = new NotificationManager();
    console.log('Notification Manager initialized');
    
    // Initialize Loading Manager
    if (typeof LoadingManager === 'undefined') {
      throw new Error("LoadingManager class is not defined. Make sure js/managers/loading-manager.js is loaded properly.");
    }
    window.loadingManager = new LoadingManager();
    console.log('Loading Manager initialized');
    
    // Initialize UI Controller
    if (typeof UIController === 'undefined') {
      throw new Error("UIController class is not defined. Make sure js/components/ui-controller.js is loaded properly.");
    }
    window.uiController = new UIController();
    console.log('UI Controller initialized');
    
    // Initialize Chart Builder
    if (typeof ChartBuilder === 'undefined') {
      throw new Error("ChartBuilder class is not defined. Make sure js/charts/chart-builder.js is loaded properly.");
    }
    window.chartBuilder = new ChartBuilder();
    window.chartBuilder.initCharts();
    console.log('Chart Builder initialized');
    
    // Initialize Calculator
    if (typeof Calculator === 'undefined') {
      throw new Error("Calculator class is not defined. Make sure js/components/calculator.js is loaded properly.");
    }
    window.calculator = new Calculator();
    console.log('Calculator initialized');
    
    // Set up calculate button
    const calculateBtn = window.domCache.get('calculate-btn') || document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        // Validate inputs before calculating
        if (window.validationManager.validateAll()) {
          window.calculator.calculate()
            .then(() => {
              console.log('Calculation completed successfully');
            })
            .catch(err => {
              console.error('Calculation error:', err);
            });
        } else {
          if (window.notificationManager) {
            window.notificationManager.error('Please correct the errors before calculating');
          }
        }
      });
    }
    
    // Set default active vendor
    if (window.uiController) {
      console.log('Setting default active vendor...');
      window.uiController.setActiveVendor('cisco');
    }
    
    // Set up event listeners for calculator
    if (window.calculator) {
      window.calculator.on('calculationComplete', (results) => {
        console.log('Calculation event received with results', results?.calculationId || 'unknown');
      });
    }
    
    // Add version info to footer
    addVersionInfo();
    
    // Pre-calculate for initial state after a short delay to ensure DOM is ready
    setTimeout(() => {
      try {
        console.log('Running initial calculation...');
        
        if (window.loadingManager) {
          window.loadingManager.show('results-container', 'Running initial calculation...');
        }
        
        window.calculator.calculate()
          .then(() => {
            console.log('Initial calculation completed');
            
            setTimeout(() => {
              // Show welcome notification only after everything is ready
              if (window.notificationManager) {
                window.notificationManager.info('Welcome to the NAC TCO Calculator!');
              }
            }, 500);
          })
          .catch(err => {
            console.error('Error during initial calculation:', err);
            
            if (window.notificationManager) {
              window.notificationManager.error('Error during initial calculation: ' + err.message);
            }
          });
      } catch (err) {
        console.error('Error during initial calculation:', err);
        
        if (window.notificationManager) {
          window.notificationManager.error('Error during initial calculation: ' + err.message);
        }
      }
    }, 800); // Increased delay for better reliability
    
    console.log('TCO Calculator initialized and ready');
  } catch (error) {
    console.error('Error initializing TCO Calculator:', error);
    
    // Create an alert for critical errors since notification manager might not be available
    alert('Error initializing the TCO Calculator: ' + error.message + '\n\nPlease check your browser console for more details.');
  }
});

function addSkipToContentLink() {
  const skipLink = document.createElement('a');
  skipLink.textContent = 'Skip to content';
  skipLink.className = 'skip-to-content';
  skipLink.href = '#results-container';
  skipLink.setAttribute('tabindex', '0');
  
  document.body.insertBefore(skipLink, document.body.firstChild);
}

function addVersionInfo() {
  const footer = document.querySelector('.app-footer');
  if (!footer) return;
  
  const versionInfo = document.createElement('div');
  versionInfo.className = 'version-info';
  versionInfo.textContent = 'Version 1.1.0';
  
  footer.appendChild(versionInfo);
}
EOL

echo -e "${GREEN}main.js updated successfully${NC}"

# Update HTML file to include proper accessibility attributes
echo -e "\n${YELLOW}Creating improved index.html...${NC}"
cat > index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="NAC Solution TCO Calculator - Compare costs between different Network Access Control solutions">
    <title>NAC Solution TCO Calculator</title>
    <link rel="stylesheet" href="libs/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="app-container">
        <header class="app-header">
            <div class="logo">
                <img src="img/portnox-logo.png" alt="Portnox Logo">
                <h1>NAC Solution TCO Calculator</h1>
            </div>
            <div class="header-actions">
                <a href="sensitivity.html" class="btn btn-outline">Sensitivity Analysis</a>
            </div>
        </header>
        
        <div class="calculator-container">
            <div class="sidebar" aria-label="Calculator Inputs">
                <div class="vendor-selection-card">
                    <h3>Current NAC Solution</h3>
                    <div class="vendor-options" role="radiogroup" aria-label="Select your current NAC vendor">
                        <div class="vendor-card" data-vendor="cisco" role="radio" aria-checked="false" tabindex="0">
                            <img src="img/cisco-logo.png" alt="Cisco">
                            <span>Cisco ISE</span>
                        </div>
                        <div class="vendor-card" data-vendor="aruba" role="radio" aria-checked="false" tabindex="0">
                            <img src="img/aruba-logo.png" alt="Aruba">
                            <span>Aruba ClearPass</span>
                        </div>
                        <div class="vendor-card" data-vendor="forescout" role="radio" aria-checked="false" tabindex="0">
                            <img src="img/forescout-logo.png" alt="Forescout">
                            <span>Forescout</span>
                        </div>
                        <div class="vendor-card" data-vendor="nps" role="radio" aria-checked="false" tabindex="0">
                            <img src="img/microsoft-logo.png" alt="Microsoft">
                            <span>Microsoft NPS</span>
                        </div>
                    </div>
                </div>
                
                <div class="organization-inputs">
                    <h3>Organization Details</h3>
                    <form id="calculator-form">
                        <div class="input-group">
                            <label for="organization-size">Organization Size</label>
                            <select id="organization-size" aria-describedby="org-size-tip">
                                <option value="small">Small (500-1000 endpoints)</option>
                                <option value="medium" selected>Medium (1000-5000 endpoints)</option>
                                <option value="large">Large (5000+ endpoints)</option>
                            </select>
                            <div id="org-size-tip" class="tooltip">
                                <i class="fas fa-info-circle"></i>
                                <span class="tooltip-text">Select the size that best matches your organization's scale</span>
                            </div>
                        </div>
                        <div class="input-group">
                            <label for="device-count">Number of Devices</label>
                            <input type="number" id="device-count" value="2500" min="100" aria-describedby="device-count-tip">
                            <div id="device-count-tip" class="tooltip">
                                <i class="fas fa-info-circle"></i>
                                <span class="tooltip-text">The total number of devices that will be managed by your NAC solution</span>
                            </div>
                        </div>
                        <div class="input-group">
                            <label for="years-to-project">Years to Project</label>
                            <input type="number" id="years-to-project" value="3" min="1" max="10" aria-describedby="years-tip">
                            <div id="years-tip" class="tooltip">
                                <i class="fas fa-info-circle"></i>
                                <span class="tooltip-text">The number of years to project costs into the future</span>
                            </div>
                        </div>
                        
                        <div class="advanced-options-toggle">
                            <button type="button" class="btn btn-text" aria-expanded="false" aria-controls="advanced-options-panel">
                                Advanced Options <i class="fas fa-angle-down"></i>
                            </button>
                        </div>
                        
                        <div id="advanced-options-panel" class="advanced-options-panel hidden" aria-labelledby="advanced-options-heading">
                            <h4 id="advanced-options-heading" class="sr-only">Advanced Options</h4>
                            
                            <div class="input-group checkbox-group">
                                <input type="checkbox" id="multiple-locations" aria-describedby="locations-tip">
                                <label for="multiple-locations">Multiple Locations</label>
                                <div id="locations-tip" class="tooltip">
                                    <i class="fas fa-info-circle"></i>
                                    <span class="tooltip-text">Check if your NAC solution needs to support multiple physical locations</span>
                                </div>
                            </div>
                            
                            <div class="input-group">
                                <label for="location-count">Number of Locations</label>
                                <input type="number" id="location-count" value="3" min="1">
                            </div>
                            
                            <div class="input-group checkbox-group">
                                <input type="checkbox" id="complex-authentication" aria-describedby="auth-tip">
                                <label for="complex-authentication">Complex Authentication</label>
                                <div id="auth-tip" class="tooltip">
                                    <i class="fas fa-info-circle"></i>
                                    <span class="tooltip-text">Check if you require multi-factor authentication or complex authentication chains</span>
                                </div>
                            </div>
                            
                            <div class="input-group checkbox-group">
                                <input type="checkbox" id="legacy-devices" aria-describedby="legacy-tip">
                                <label for="legacy-devices">Legacy Devices</label>
                                <div id="legacy-tip" class="tooltip">
                                    <i class="fas fa-info-circle"></i>
                                    <span class="tooltip-text">Check if your environment includes legacy devices that require special handling</span>
                                </div>
                            </div>
                            
                            <div class="input-group">
                                <label for="legacy-percentage">Legacy Device Percentage</label>
                                <div class="range-container">
                                    <input type="range" id="legacy-percentage" min="0" max="100" value="30" aria-valuemin="0" aria-valuemax="100" aria-valuenow="30">
                                    <span id="legacy-percentage-value">30%</span>
                                </div>
                            </div>
                            
                            <div class="input-group checkbox-group">
                                <input type="checkbox" id="cloud-integration" aria-describedby="cloud-tip">
                                <label for="cloud-integration">Cloud Integration</label>
                                <div id="cloud-tip" class="tooltip">
                                    <i class="fas fa-info-circle"></i>
                                    <span class="tooltip-text">Check if you require integration with cloud services</span>
                                </div>
                            </div>
                            
                            <div class="input-group checkbox-group">
                                <input type="checkbox" id="custom-policies" aria-describedby="policies-tip">
                                <label for="custom-policies">Custom Policies</label>
                                <div id="policies-tip" class="tooltip">
                                    <i class="fas fa-info-circle"></i>
                                    <span class="tooltip-text">Check if you need to implement custom security policies</span>
                                </div>
                            </div>
                            
                            <div class="input-group">
                                <label for="policy-complexity">Policy Complexity</label>
                                <select id="policy-complexity">
                                    <option value="low">Low</option>
                                    <option value="medium" selected>Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>
                        
                        <button id="calculate-btn" type="button" class="btn btn-primary">
                            <i class="fas fa-calculator"></i> Calculate TCO
                        </button>
                    </form>
                </div>
                
                <div class="portnox-spotlight">
                    <h3>Portnox Cloud Advantage</h3>
                    <p>Portnox Cloud offers a zero-hardware, cloud-native NAC solution that dramatically reduces implementation time and ongoing maintenance costs.</p>
                    
                    <div class="potential-savings-container">
                        <div class="savings-metric">
                            <label>Potential Savings:</label>
                            <span id="portnox-savings-amount" class="savings-amount">$0</span>
                        </div>
                        <div class="savings-metric">
                            <label>Savings Percentage:</label>
                            <span id="portnox-savings-percentage" class="savings-amount">0.0%</span>
                        </div>
                        <div class="savings-metric">
                            <label>Implementation Time Reduction:</label>
                            <span id="portnox-implementation-time" class="savings-amount">0.0%</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="results-container" class="results-container" aria-label="Calculation Results" tabindex="-1">
                <div class="tabs" role="tablist" aria-label="Results Tabs">
                    <button class="tab-button active" id="tab-comparison" role="tab" aria-selected="true" aria-controls="comparison-tab" data-tab="comparison-tab" tabindex="0">Comparison</button>
                    <button class="tab-button" id="tab-details" role="tab" aria-selected="false" aria-controls="details-tab" data-tab="details-tab" tabindex="-1">Details</button>
                    <button class="tab-button" id="tab-implementation" role="tab" aria-selected="false" aria-controls="implementation-tab" data-tab="implementation-tab" tabindex="-1">Implementation</button>
                </div>
                
                <div class="tab-content">
                    <div id="message-container"></div>
                    <div class="export-options">
                        <button id="export-csv-btn" class="btn btn-outline"><i class="fas fa-file-csv"></i> Export CSV</button>
                        <button id="export-pdf-btn" class="btn btn-outline"><i class="fas fa-file-pdf"></i> Export PDF</button>
                    </div>
                    
                    <div id="comparison-tab" class="tab-pane active" role="tabpanel" aria-labelledby="tab-comparison">
                        <div class="results-grid">
                            <div class="result-card">
                                <h3>Total Cost of Ownership</h3>
                                <div class="chart-container" aria-label="TCO Comparison Chart">
                                    <canvas id="tco-comparison-chart"></canvas>
                                </div>
                            </div>
                            <div class="result-card">
                                <h3>Cumulative Costs Over Time</h3>
                                <div class="chart-container" aria-label="Cumulative Cost Chart">
                                    <canvas id="cumulative-cost-chart"></canvas>
                                </div>
                            </div>
                        </div>
                        
                        <div class="result-card">
                            <h3>TCO Summary</h3>
                            <div class="table-container">
                                <table class="data-table" id="tco-summary-table">
                                    <caption class="sr-only">TCO Summary by Vendor</caption>
                                    <thead>
                                        <tr>
                                            <th scope="col">Vendor</th>
                                            <th scope="col">Initial Costs</th>
                                            <th scope="col">Annual Costs</th>
                                            <th scope="col">Migration Costs</th>
                                            <th scope="col">Total TCO</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tco-summary-table-body">
                                        <!-- Populated by JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="comparison-highlight-card">
                            <h3>Why Portnox Cloud?</h3>
                            
                            <div class="comparison-metrics">
                                <div class="metric-container">
                                    <span class="metric-label">Cost Savings vs Current Solution</span>
                                    <span id="comparison-savings" class="metric-value">$0</span>
                                    <div class="progress-bar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                                        <div class="progress" style="width: 0%"></div>
                                    </div>
                                    <div class="progress-labels">
                                        <span>0%</span>
                                        <span>0% Savings</span>
                                    </div>
                                </div>
                                
                                <div class="metric-container">
                                    <span class="metric-label">Implementation Time Reduction</span>
                                    <span id="comparison-implementation" class="metric-value">0%</span>
                                    <div class="progress-bar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                                        <div class="progress" style="width: 0%"></div>
                                    </div>
                                    <div class="progress-labels">
                                        <span>0%</span>
                                        <span>0% Faster</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="key-benefits">
                                <h4>Key Benefits</h4>
                                <div class="benefits-grid">
                                    <div class="benefit-card">
                                        <div class="benefit-icon"><i class="fas fa-coins"></i></div>
                                        <div class="benefit-content">
                                            <h5>Zero Hardware Costs</h5>
                                            <p>Cloud-native solution eliminates infrastructure expenses</p>
                                            <span class="benefit-metric">100% hardware savings</span>
                                        </div>
                                    </div>
                                    
                                    <div class="benefit-card">
                                        <div class="benefit-icon"><i class="fas fa-rocket"></i></div>
                                        <div class="benefit-content">
                                            <h5>Rapid Deployment</h5>
                                            <p>Get up and running in days instead of months</p>
                                            <span class="benefit-metric">75% faster implementation</span>
                                        </div>
                                    </div>
                                    
                                    <div class="benefit-card">
                                        <div class="benefit-icon"><i class="fas fa-user-cog"></i></div>
                                        <div class="benefit-content">
                                            <h5>Lower IT Burden</h5>
                                            <p>Reduce administrative overhead significantly</p>
                                            <span class="benefit-metric">80% less staff time</span>
                                        </div>
                                    </div>
                                    
                                    <div class="benefit-card">
                                        <div class="benefit-icon"><i class="fas fa-cloud-upload-alt"></i></div>
                                        <div class="benefit-content">
                                            <h5>Automatic Updates</h5>
                                            <p>Always up-to-date without maintenance windows</p>
                                            <span class="benefit-metric">Zero downtime updates</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="details-tab" class="tab-pane" role="tabpanel" aria-labelledby="tab-details">
                        <div class="sub-tabs" role="tablist" aria-label="Cost Details Tabs">
                            <button class="sub-tab-button active" id="subtab-cost-breakdown" role="tab" aria-selected="true" aria-controls="cost-breakdown" data-subtab="cost-breakdown" tabindex="0">Cost Breakdown</button>
                            <button class="sub-tab-button" id="subtab-annual-costs" role="tab" aria-selected="false" aria-controls="annual-costs" data-subtab="annual-costs" tabindex="-1">Annual Costs</button>
                        </div>
                        
                        <div id="cost-breakdown" class="sub-tab-pane active" role="tabpanel" aria-labelledby="subtab-cost-breakdown">
                            <div class="results-grid">
                                <div class="result-card">
                                    <h3>Current Solution Cost Breakdown</h3>
                                    <div class="chart-container" aria-label="Current Solution Cost Breakdown Chart">
                                        <canvas id="current-breakdown-chart"></canvas>
                                    </div>
                                </div>
                                <div class="result-card">
                                    <h3>Portnox Cloud Cost Breakdown</h3>
                                    <div class="chart-container" aria-label="Portnox Cloud Cost Breakdown Chart">
                                        <canvas id="alternative-breakdown-chart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="annual-costs" class="sub-tab-pane" role="tabpanel" aria-labelledby="subtab-annual-costs">
                            <div class="result-card">
                                <h3>Annual Cost Comparison</h3>
                                <div class="table-container">
                                    <table class="data-table">
                                        <caption class="sr-only">Annual Cost Comparison Between Current Solution and Portnox Cloud</caption>
                                        <thead>
                                            <tr>
                                                <th scope="col">Cost Category</th>
                                                <th scope="col">Current Solution</th>
                                                <th scope="col">Portnox Cloud</th>
                                                <th scope="col">Savings</th>
                                            </tr>
                                        </thead>
                                        <tbody id="annual-costs-table-body">
                                            <!-- Populated by JavaScript -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="implementation-tab" class="tab-pane" role="tabpanel" aria-labelledby="tab-implementation">
                        <div class="result-card">
                            <h3>Implementation Timeline Comparison</h3>
                            <div class="table-container">
                                <table class="data-table">
                                    <caption class="sr-only">Implementation Timeline Comparison Between Current Solution and Portnox Cloud</caption>
                                    <thead>
                                        <tr>
                                            <th scope="col">Phase</th>
                                            <th scope="col">Current Solution (days)</th>
                                            <th scope="col">Portnox Cloud (days)</th>
                                            <th scope="col">Time Savings</th>
                                        </tr>
                                    </thead>
                                    <tbody id="implementation-table-body">
                                        <!-- Populated by JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <footer class="app-footer">
            <div class="copyright">
                &copy; 2025 Portnox | All Rights Reserved
            </div>
            <div class="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Contact Us</a>
            </div>
        </footer>
    </div>
    
    <!-- Chart.js -->
    <script src="libs/charts/chart.min.js"></script>
    
    <!-- Core JavaScript -->
    <script src="js/utils/helpers.js"></script>
    <script src="js/managers/dom-cache.js"></script>
    <script src="js/managers/tab-manager.js"></script>
    <script src="js/managers/validation-manager.js"></script>
    <script src="js/managers/notification-manager.js"></script>
    <script src="js/managers/loading-manager.js"></script>
    
    <!-- Application Components -->
    <script src="js/vendors/vendor-data.js"></script>
    <script src="js/charts/chart-builder.js"></script>
    <script src="js/components/calculator.js"></script>
    <script src="js/components/ui-controller.js"></script>
    
    <!-- Main Entry Point -->
    <script src="js/main.js"></script>
</body>
</html>
EOL

echo -e "${GREEN}index.html created successfully${NC}"

# Create placeholder logos if they don't exist
echo -e "\n${YELLOW}Creating placeholder logos if they don't exist...${NC}"

# Create Cisco logo placeholder if it doesn't exist
if [ ! -f "img/cisco-logo.png" ]; then
    echo "Creating Cisco logo placeholder..."
    cat > img/cisco-logo.png << 'EOL'
<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <text x="25" y="35" font-family="Arial" font-size="20" fill="#049fd9" font-weight="bold">CISCO</text>
</svg>
EOL
fi

# Create Aruba logo placeholder if it doesn't exist
if [ ! -f "img/aruba-logo.png" ]; then
    echo "Creating Aruba logo placeholder..."
    cat > img/aruba-logo.png << 'EOL'
<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <text x="25" y="35" font-family="Arial" font-size="20" fill="#ff8300" font-weight="bold">ARUBA</text>
</svg>
EOL
fi

# Create Forescout logo placeholder if it doesn't exist
if [ ! -f "img/forescout-logo.png" ]; then
    echo "Creating Forescout logo placeholder..."
    cat > img/forescout-logo.png << 'EOL'
<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <text x="15" y="35" font-family="Arial" font-size="18" fill="#005daa" font-weight="bold">FORESCOUT</text>
</svg>
EOL
fi

# Create Microsoft logo placeholder if it doesn't exist
if [ ! -f "img/microsoft-logo.png" ]; then
    echo "Creating Microsoft logo placeholder..."
    cat > img/microsoft-logo.png << 'EOL'
<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <text x="15" y="35" font-family="Arial" font-size="18" fill="#00a4ef" font-weight="bold">MICROSOFT</text>
</svg>
EOL
fi

# Create Portnox logo placeholder if it doesn't exist
if [ ! -f "img/portnox-logo.png" ]; then
    echo "Creating Portnox logo placeholder..."
    cat > img/portnox-logo.png << 'EOL'
<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <text x="20" y="35" font-family="Arial" font-size="18" fill="#2bd25b" font-weight="bold">PORTNOX</text>
</svg>
EOL
fi

echo -e "${GREEN}Placeholder logos created successfully${NC}"

# Final summary and instructions
echo -e "\n${GREEN}TCO Calculator Enhancement Script Completed${NC}"
echo -e "\n${YELLOW}Summary of Enhancements:${NC}"
echo -e "  1. Improved calculation engine with device count scaling and better error handling"
echo -e "  2. Enhanced charts with better mobile responsiveness and accessibility"
echo -e "  3. Added comprehensive notification system for user feedback"
echo -e "  4. Improved validation system for form inputs"
echo -e "  5. Added loading indicators and progress feedback"
echo -e "  6. Enhanced UI with tooltips and better keyboard navigation"
echo -e "  7. Improved accessibility with ARIA attributes and screen reader support"
echo -e "  8. Added detailed cost breakdowns and implementation timelines"
echo -e "  9. Improved mobile responsiveness and print styles"
echo -e "  10. Better initialization sequence and error handling"

echo -e "\n${YELLOW}Next Steps:${NC}"
echo -e "  1. Open index.html in your browser to test the application"
echo -e "  2. Check browser console for any remaining errors"
echo -e "  3. Replace placeholder logos with actual vendor logos"
echo -e "  4. Test the calculator with different input combinations"
echo -e "  5. Verify mobile responsiveness by resizing the browser window"

echo -e "\n${GREEN}Your TCO Calculator is now enhanced and ready to use!${NC}"
