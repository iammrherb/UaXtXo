/**
 * Vendor Controller
 * Manages vendor selection and comparison
 */
class VendorController {
  constructor() {
    this.vendorCards = document.querySelectorAll('.vendor-card');
    this.selectedVendors = new Set(['portnox']); // Default to Portnox
    this.vendorData = {
      // Default data structure will be populated from vendor-data.js
    };
    
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Vendor selection
    this.vendorCards.forEach(card => {
      card.addEventListener('click', () => {
        const vendor = card.getAttribute('data-vendor');
        this.toggleVendor(vendor, card);
      });
    });
    
    // Listen for calculate events
    document.addEventListener('calculateResults', () => {
      this.updateComparisonData();
    });
  }
  
  toggleVendor(vendor, card) {
    if (this.selectedVendors.has(vendor)) {
      // Don't allow deselecting if it's the last vendor
      if (this.selectedVendors.size > 1) {
        this.selectedVendors.delete(vendor);
        card.classList.remove('selected');
      }
    } else {
      this.selectedVendors.add(vendor);
      card.classList.add('selected');
    }
    
    // Update state
    this.updateVendorSelectionState();
    
    // Trigger event for other components
    document.dispatchEvent(new CustomEvent('vendorsChanged', { 
      detail: { 
        vendors: Array.from(this.selectedVendors),
        added: this.selectedVendors.has(vendor),
        vendor: vendor
      }
    }));
  }
  
  updateVendorSelectionState() {
    // Update UI to reflect selection state
    this.vendorCards.forEach(card => {
      const vendor = card.getAttribute('data-vendor');
      if (this.selectedVendors.has(vendor)) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });
  }
  
  getSelectedVendors() {
    return Array.from(this.selectedVendors);
  }
  
  // Prepare data for comparison charts
  updateComparisonData() {
    if (!window.chartController) return;
    
    const selectedVendors = this.getSelectedVendors();
    const configState = window.configController ? window.configController.getState() : null;
    
    // Send data to chart controller
    window.chartController.updateChartsWithVendors(selectedVendors, configState);
  }
}

// Initialize the vendor controller when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.vendorController = new VendorController();
});
