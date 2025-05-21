/**
 * Vendor Manager for Portnox Total Cost Analyzer
 * Manages vendor selection and displays
 */

class VendorManager {
  constructor() {
    this.config = window.TCAConfig || {};
    this.selectedVendors = ['portnox']; // Always include Portnox
    this.initialized = false;
  }
  
  /**
   * Initialize the vendor manager
   */
  init() {
    console.log('Initializing Vendor Manager...');
    
    // Create vendor cards
    this.createVendorCards();
    
    // Set up event listeners
    this.setupEventListeners();
    
    this.initialized = true;
    
    return this;
  }
  
  /**
   * Create vendor selection cards
   */
  createVendorCards() {
    const vendorGrid = document.getElementById('vendor-select-grid');
    if (!vendorGrid) {
      console.error('Vendor grid not found');
      return;
    }
    
    // Clear existing cards
    vendorGrid.innerHTML = '';
    
    // Create a card for each vendor
    Object.keys(this.config.vendors).forEach(vendorId => {
      const vendor = this.config.vendors[vendorId];
      
      const card = document.createElement('div');
      card.className = 'vendor-select-card';
      card.dataset.vendor = vendorId;
      
      // Select Portnox by default
      if (vendorId === 'portnox') {
        card.classList.add('selected');
      }
      
      const logoContainer = document.createElement('div');
      logoContainer.className = 'vendor-logo';
      
      const logo = document.createElement('img');
      logo.src = vendor.logo;
      logo.alt = vendor.name;
      logo.onerror = function() {
        // If logo fails to load, show vendor name as text
        this.style.display = 'none';
        logoContainer.innerHTML = `<span>${vendor.shortName}</span>`;
      };
      
      logoContainer.appendChild(logo);
      
      const name = document.createElement('div');
      name.className = 'vendor-name';
      name.textContent = vendor.name;
      
      card.appendChild(logoContainer);
      card.appendChild(name);
      
      vendorGrid.appendChild(card);
    });
  }
  
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Vendor card click
    const vendorCards = document.querySelectorAll('.vendor-select-card');
    vendorCards.forEach(card => {
      card.addEventListener('click', () => {
        this.toggleVendorSelection(card.dataset.vendor, card);
      });
    });
  }
  
  /**
   * Toggle vendor selection
   * @param {string} vendorId - The ID of the vendor to toggle
   * @param {HTMLElement} card - The vendor card element
   */
  toggleVendorSelection(vendorId, card) {
    // Can't deselect Portnox
    if (vendorId === 'portnox') {
      if (!this.selectedVendors.includes(vendorId)) {
        this.selectedVendors.push(vendorId);
        card.classList.add('selected');
      }
      return;
    }
    
    // Toggle selection
    if (this.selectedVendors.includes(vendorId)) {
      // Remove from selected vendors
      this.selectedVendors = this.selectedVendors.filter(id => id !== vendorId);
      card.classList.remove('selected');
    } else {
      // Check if we're at the limit (3 vendors max)
      if (this.selectedVendors.length >= 3) {
        alert('You can select a maximum of 3 vendors to compare');
        return;
      }
      
      // Add to selected vendors
      this.selectedVendors.push(vendorId);
      card.classList.add('selected');
    }
    
    // Update counter
    this.updateVendorCounter();
    
    // Trigger event for other components
    this.triggerVendorSelectionChange();
  }
  
  /**
   * Update the vendor counter
   */
  updateVendorCounter() {
    const counterElement = document.getElementById('vendor-counter-value');
    if (counterElement) {
      counterElement.textContent = this.selectedVendors.length;
    }
  }
  
  /**
   * Trigger vendor selection change event
   */
  triggerVendorSelectionChange() {
    const event = new CustomEvent('vendorSelectionChange', {
      detail: {
        selectedVendors: this.selectedVendors
      }
    });
    
    document.dispatchEvent(event);
  }
  
  /**
   * Get selected vendors
   * @returns {string[]} - Array of selected vendor IDs
   */
  getSelectedVendors() {
    return this.selectedVendors;
  }
}

// Initialize global vendor manager
document.addEventListener('DOMContentLoaded', function() {
  window.vendorManager = new VendorManager();
  window.vendorManager.init();
});
