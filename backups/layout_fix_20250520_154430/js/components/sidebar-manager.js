/**
 * Fixed Sidebar Manager for Portnox Total Cost Analyzer
 * Handles sidebar interactions, vendor selection, and configuration
 * This version fixes retraction and section expansion/collapse
 */

class SidebarManager {
  constructor() {
    this.maxVendors = 3; // Maximum number of vendors to compare
    this.selectedVendors = ['portnox']; // Portnox is always selected
    this.expanded = {}; // Track expanded/collapsed sections
    this.initialized = false;
    
    // Initialize on DOM loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }
  
  /**
   * Initialize sidebar components
   */
  init() {
    if (this.initialized) return;
    
    console.log('Initializing sidebar manager...');
    
    // Fix vendor logos first to ensure they display correctly
    this.fixVendorLogos();
    
    // Initialize collapsible sections
    this.initCollapsibleSections();
    
    // Initialize vendor selection
    this.initVendorSelection();
    
    // Initialize range sliders
    this.initRangeSliders();
    
    // Initialize sidebar toggle
    this.initSidebarToggle();
    
    this.initialized = true;
    console.log('Sidebar manager initialized');
  }
  
  /**
   * Fix vendor logos that might be too big
   */
  fixVendorLogos() {
    const vendorCards = document.querySelectorAll('.vendor-select-card');
    
    vendorCards.forEach(card => {
      const logoImg = card.querySelector('.vendor-logo img');
      if (logoImg) {
        // Ensure proper sizing with !important to override any inline styles
        logoImg.style.cssText = 'max-height: 28px !important; max-width: 80px !important; object-fit: contain !important;';
      }
      
      // Fix card height
      card.style.cssText = 'height: 80px !important; padding: 8px 4px !important;';
      
      // Fix vendor name
      const nameElement = card.querySelector('.vendor-name');
      if (nameElement) {
        nameElement.style.cssText = 'font-size: 11px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; max-width: 95% !important; text-align: center !important;';
      }
    });
  }
  
  /**
   * Initialize collapsible sections
   * Fixed to ensure proper expansion/collapse
   */
  initCollapsibleSections() {
    console.log('Initializing collapsible sections...');
    const configCards = document.querySelectorAll('.config-card');
    
    configCards.forEach(card => {
      if (!card) return;
      
      const header = card.querySelector('.config-card-header');
      const content = card.querySelector('.config-card-content');
      const toggleIcon = header?.querySelector('.toggle-icon');
      
      if (!header || !content) return;
      
      const cardId = card.id || `config-card-${Math.random().toString(36).substr(2, 9)}`;
      if (!card.id) card.id = cardId;
      
      // Set initial state (all expanded by default except cost-config)
      if (cardId === 'cost-config') {
        content.classList.add('collapsed');
        if (toggleIcon) toggleIcon.classList.add('collapsed');
        this.expanded[cardId] = false;
      } else {
        this.expanded[cardId] = true;
      }
      
      header.addEventListener('click', (e) => {
        console.log(`Header clicked for ${cardId}`);
        e.preventDefault();
        this.toggleSection(cardId);
      });
    });
  }
  
  /**
   * Toggle section expand/collapse
   * Fixed to ensure proper functionality
   */
  toggleSection(cardId) {
    console.log(`Toggling section ${cardId}`);
    const card = document.getElementById(cardId);
    if (!card) {
      console.warn(`Card with ID ${cardId} not found`);
      return;
    }
    
    const content = card.querySelector('.config-card-content');
    const toggleIcon = card.querySelector('.toggle-icon');
    
    if (!content) {
      console.warn(`Content not found in card ${cardId}`);
      return;
    }
    
    // Toggle collapsed state
    if (content.classList.contains('collapsed')) {
      // Expand
      content.classList.remove('collapsed');
      if (toggleIcon) toggleIcon.classList.remove('collapsed');
      this.expanded[cardId] = true;
      
      // Set explicit max-height to ensure transition works
      const contentHeight = content.scrollHeight;
      content.style.maxHeight = '0px';
      
      // Force reflow
      content.offsetHeight;
      
      // Set target height
      content.style.maxHeight = `${contentHeight}px`;
      
      // Clear max-height after transition to allow content to grow if needed
      setTimeout(() => {
        content.style.maxHeight = '';
      }, 300);
    } else {
      // Collapse
      const contentHeight = content.scrollHeight;
      content.style.maxHeight = `${contentHeight}px`;
      
      // Force reflow
      content.offsetHeight;
      
      // Set collapse height
      content.style.maxHeight = '0px';
      
      // Add collapsed class after transition
      setTimeout(() => {
        content.classList.add('collapsed');
        if (toggleIcon) toggleIcon.classList.add('collapsed');
      }, 300);
      
      this.expanded[cardId] = false;
    }
    
    console.log(`Section ${cardId} toggled to ${this.expanded[cardId] ? 'expanded' : 'collapsed'}`);
  }
  
  /**
   * Initialize vendor selection
   */
  initVendorSelection() {
    const vendorCards = document.querySelectorAll('.vendor-select-card');
    const vendorCounter = document.getElementById('vendor-counter-value');
    
    vendorCards.forEach(card => {
      const vendorId = card.dataset.vendor;
      
      // Portnox is always selected and can't be deselected
      if (vendorId === 'portnox') {
        card.classList.add('selected');
        card.classList.add('locked');
      }
      
      card.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleVendorSelection(vendorId, card);
      });
    });
    
    // Update initial counter
    if (vendorCounter) {
      vendorCounter.textContent = this.selectedVendors.length;
    }
  }
  
  /**
   * Toggle vendor selection
   */
  toggleVendorSelection(vendorId, card) {
    console.log(`Toggle vendor selection for ${vendorId}`);
    
    // Portnox can't be deselected
    if (vendorId === 'portnox') return;
    
    const index = this.selectedVendors.indexOf(vendorId);
    const vendorCounter = document.getElementById('vendor-counter-value');
    
    if (index === -1) {
      // Add vendor if under max limit
      if (this.selectedVendors.length < this.maxVendors) {
        this.selectedVendors.push(vendorId);
        card.classList.add('selected');
        
        // Play selection animation
        card.animate([
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(1.05)', opacity: 1 },
          { transform: 'scale(1)', opacity: 1 }
        ], {
          duration: 300,
          easing: 'ease-in-out'
        });
      } else {
        // Show max vendors reached message
        this.showMaxVendorsMessage();
      }
    } else {
      // Remove vendor
      this.selectedVendors.splice(index, 1);
      card.classList.remove('selected');
    }
    
    // Update counter
    if (vendorCounter) {
      vendorCounter.textContent = this.selectedVendors.length;
    }
    
    // Trigger event for other components
    this.triggerVendorSelectionEvent();
    
    console.log('Selected vendors:', this.selectedVendors);
  }
  
  /**
   * Show max vendors reached message
   */
  showMaxVendorsMessage() {
    // Find or create toast container
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast toast-warning';
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-exclamation-triangle';
    
    const text = document.createElement('span');
    text.textContent = `Maximum of ${this.maxVendors} vendors can be compared at once. Please deselect a vendor first.`;
    
    toast.appendChild(icon);
    toast.appendChild(text);
    toastContainer.appendChild(toast);
    
    // Show the toast with animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Remove the toast after a delay
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 5000);
  }
  
  /**
   * Initialize range sliders
   */
  initRangeSliders() {
    const rangeSliders = document.querySelectorAll('input[type="range"]');
    
    rangeSliders.forEach(slider => {
      // Setup initial value display
      const valueDisplay = document.getElementById(`${slider.id}-value`);
      if (valueDisplay) {
        this.updateRangeSliderValue(slider, valueDisplay);
      }
      
      // Setup background gradient based on initial value
      this.updateRangeSliderBackground(slider);
      
      // Add input event listener
      slider.addEventListener('input', () => {
        if (valueDisplay) {
          this.updateRangeSliderValue(slider, valueDisplay);
        }
        this.updateRangeSliderBackground(slider);
      });
    });
  }
  
  /**
   * Update range slider value display
   */
  updateRangeSliderValue(slider, valueDisplay) {
    const value = slider.value;
    
    // Format value based on id
    if (slider.id.includes('cost') || slider.id.includes('fte-cost')) {
      valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
    } else if (slider.id.includes('discount') || slider.id.includes('percentage') || slider.id.includes('reduction')) {
      valueDisplay.textContent = `${value}%`;
    } else {
      valueDisplay.textContent = value;
    }
  }
  
  /**
   * Update range slider background gradient
   */
  updateRangeSliderBackground(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const value = parseFloat(slider.value);
    const percentage = ((value - min) / (max - min)) * 100;
    
    slider.style.background = `linear-gradient(to right, #1a5a96 0%, #1a5a96 ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
  }
  
  /**
   * Initialize sidebar toggle - fixed to ensure proper retraction
   */
  initSidebarToggle() {
    console.log('Initializing sidebar toggle...');
    const sidebarToggleButtons = document.querySelectorAll('.sidebar-toggle, #sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.querySelector('.content-area');
    
    if (sidebar && contentArea) {
      // Initialize all sidebar toggle buttons
      sidebarToggleButtons.forEach(sidebarToggle => {
        if (sidebarToggle) {
          console.log('Sidebar toggle button found, adding event listener');
          sidebarToggle.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Sidebar toggle clicked');
            this.toggleSidebar();
          });
        }
      });
      
      // For mobile
      document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          const backdrop = document.querySelector('.sidebar-backdrop');
          
          if (backdrop && e.target === backdrop) {
            this.toggleSidebar();
          }
        }
      });
      
      console.log('Sidebar toggle initialized');
    } else {
      console.warn('Sidebar or content area not found');
    }
  }
  
  /**
   * Toggle sidebar visibility - fixed to ensure proper retraction
   */
  toggleSidebar() {
    console.log('Toggling sidebar visibility');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle, #sidebar-toggle');
    const contentArea = document.querySelector('.content-area');
    
    if (sidebar && contentArea) {
      // For desktop
      if (window.innerWidth > 768) {
        const isCollapsed = sidebar.classList.contains('collapsed');
        console.log(`Sidebar is currently ${isCollapsed ? 'collapsed' : 'expanded'}`);
        
        sidebar.classList.toggle('collapsed');
        if (sidebarToggle) sidebarToggle.classList.toggle('collapsed');
        contentArea.classList.toggle('expanded');
        
        console.log(`Sidebar is now ${sidebar.classList.contains('collapsed') ? 'collapsed' : 'expanded'}`);
      } 
      // For mobile
      else {
        let backdrop = document.querySelector('.sidebar-backdrop');
        
        if (!backdrop) {
          backdrop = document.createElement('div');
          backdrop.className = 'sidebar-backdrop';
          document.body.appendChild(backdrop);
        }
        
        sidebar.classList.toggle('active');
        backdrop.classList.toggle('active');
        
        console.log(`Sidebar is now ${sidebar.classList.contains('active') ? 'active' : 'inactive'} (mobile)`);
      }
    } else {
      console.warn('Sidebar or content area not found for toggle');
    }
  }
  
  /**
   * Trigger vendor selection event
   */
  triggerVendorSelectionEvent() {
    const event = new CustomEvent('vendorSelectionChanged', {
      detail: {
        selectedVendors: this.selectedVendors
      }
    });
    
    document.dispatchEvent(event);
  }
  
  /**
   * Get selected vendors
   */
  getSelectedVendors() {
    return [...this.selectedVendors];
  }
  
  /**
   * Select vendor programmatically
   */
  selectVendor(vendorId) {
    if (vendorId === 'portnox' || this.selectedVendors.includes(vendorId)) {
      return;
    }
    
    const card = document.querySelector(`.vendor-select-card[data-vendor="${vendorId}"]`);
    
    if (card && this.selectedVendors.length < this.maxVendors) {
      this.selectedVendors.push(vendorId);
      card.classList.add('selected');
      
      // Update counter
      const vendorCounter = document.getElementById('vendor-counter-value');
      if (vendorCounter) {
        vendorCounter.textContent = this.selectedVendors.length;
      }
      
      // Trigger event
      this.triggerVendorSelectionEvent();
    }
  }
  
  /**
   * Deselect vendor programmatically
   */
  deselectVendor(vendorId) {
    if (vendorId === 'portnox') {
      return;
    }
    
    const index = this.selectedVendors.indexOf(vendorId);
    
    if (index !== -1) {
      this.selectedVendors.splice(index, 1);
      
      const card = document.querySelector(`.vendor-select-card[data-vendor="${vendorId}"]`);
      if (card) {
        card.classList.remove('selected');
      }
      
      // Update counter
      const vendorCounter = document.getElementById('vendor-counter-value');
      if (vendorCounter) {
        vendorCounter.textContent = this.selectedVendors.length;
      }
      
      // Trigger event
      this.triggerVendorSelectionEvent();
    }
  }
}

// Create instance and export
window.sidebarManager = new SidebarManager();

// Execute immediately to ensure sidebar is initialized
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Re-initialize to be sure
    if (!window.sidebarManager.initialized) {
      window.sidebarManager.init();
    }
  });
} else {
  // Re-initialize to be sure
  if (!window.sidebarManager.initialized) {
    window.sidebarManager.init();
  }
}
