/**
 * Sidebar Manager for Portnox Total Cost Analyzer
 * Handles sidebar interactions, vendor selection, and configuration
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
   * Initialize collapsible sections
   */
  initCollapsibleSections() {
    const configCards = document.querySelectorAll('.config-card');
    
    configCards.forEach(card => {
      const header = card.querySelector('.config-card-header');
      const content = card.querySelector('.config-card-content');
      const toggleIcon = header.querySelector('.toggle-icon');
      const cardId = card.id;
      
      // Set initial state (all expanded by default except cost-config)
      if (cardId === 'cost-config') {
        content.classList.add('collapsed');
        toggleIcon.classList.add('collapsed');
        this.expanded[cardId] = false;
      } else {
        this.expanded[cardId] = true;
      }
      
      header.addEventListener('click', () => {
        this.toggleSection(cardId);
      });
    });
  }
  
  /**
   * Toggle section expand/collapse
   */
  toggleSection(cardId) {
    const card = document.getElementById(cardId);
    const content = card.querySelector('.config-card-content');
    const toggleIcon = card.querySelector('.toggle-icon');
    
    content.classList.toggle('collapsed');
    toggleIcon.classList.toggle('collapsed');
    this.expanded[cardId] = !this.expanded[cardId];
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
      
      card.addEventListener('click', () => {
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
    
    slider.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, var(--border-color) ${percentage}%, var(--border-color) 100%)`;
  }
  
  /**
   * Initialize sidebar toggle
   */
  initSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.querySelector('.content-area');
    
    if (sidebarToggle && sidebar && contentArea) {
      sidebarToggle.addEventListener('click', () => {
        this.toggleSidebar();
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
    }
  }
  
  /**
   * Toggle sidebar visibility
   */
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const contentArea = document.querySelector('.content-area');
    
    if (sidebar && sidebarToggle && contentArea) {
      // For desktop
      if (window.innerWidth > 768) {
        sidebar.classList.toggle('collapsed');
        sidebarToggle.classList.toggle('collapsed');
        contentArea.classList.toggle('expanded');
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
      }
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
