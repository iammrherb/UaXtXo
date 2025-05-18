/**
 * Enhanced Vendor Selection Fix
 * Resolves issues with vendor selection UI and functionality
 */
(function() {
  // Store selected vendors
  let selectedVendors = [];
  
  // Ensure Portnox is always included
  const PORTNOX_VENDOR_ID = 'portnox';
  
  // Initialize vendor selection
  function initVendorSelection() {
    console.log("🎯 Initializing vendor selection fix...");
    
    // Find all vendor cards
    const vendorCards = document.querySelectorAll('.vendor-card');
    if (!vendorCards || vendorCards.length === 0) {
      console.error("🎯 Vendor cards not found. Will retry later.");
      setTimeout(initVendorSelection, 500);
      return;
    }
    
    // Get initial selected vendors
    selectedVendors = Array.from(document.querySelectorAll('.vendor-card.selected'))
      .map(card => card.getAttribute('data-vendor'))
      .filter(Boolean);
    
    // Ensure Portnox is selected
    if (!selectedVendors.includes(PORTNOX_VENDOR_ID)) {
      const portnoxCard = document.querySelector(`.vendor-card[data-vendor="${PORTNOX_VENDOR_ID}"]`);
      if (portnoxCard) {
        portnoxCard.classList.add('selected');
        selectedVendors.push(PORTNOX_VENDOR_ID);
      }
    }
    
    // Add click event listeners to vendor cards
    vendorCards.forEach(card => {
      // Remove existing listeners
      const newCard = card.cloneNode(true);
      card.parentNode.replaceChild(newCard, card);
      
      // Add new listener
      newCard.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const vendor = this.getAttribute('data-vendor');
        if (!vendor) return;
        
        // Handle selection toggle
        if (vendor === PORTNOX_VENDOR_ID) {
          // Ensure Portnox is always selected
          if (!this.classList.contains('selected')) {
            this.classList.add('selected');
            if (!selectedVendors.includes(vendor)) {
              selectedVendors.push(vendor);
            }
          }
        } else {
          // Toggle other vendors
          this.classList.toggle('selected');
          
          if (this.classList.contains('selected')) {
            // Add to selected vendors if not already included
            if (!selectedVendors.includes(vendor)) {
              selectedVendors.push(vendor);
            }
          } else {
            // Remove from selected vendors
            selectedVendors = selectedVendors.filter(v => v !== vendor);
          }
        }
        
        // Ensure we have at least one vendor selected
        if (selectedVendors.length === 0) {
          const portnoxCard = document.querySelector(`.vendor-card[data-vendor="${PORTNOX_VENDOR_ID}"]`);
          if (portnoxCard) {
            portnoxCard.classList.add('selected');
            selectedVendors.push(PORTNOX_VENDOR_ID);
          }
        }
        
        // Limit to maximum 4 vendors for better visualization
        if (selectedVendors.length > 4) {
          alert("Maximum 4 vendors can be selected for clear comparison");
          
          // Keep only the first 4 selected vendors
          const excessVendors = selectedVendors.slice(4);
          excessVendors.forEach(v => {
            if (v !== PORTNOX_VENDOR_ID) { // Never deselect Portnox
              const excessCard = document.querySelector(`.vendor-card[data-vendor="${v}"]`);
              if (excessCard) {
                excessCard.classList.remove('selected');
              }
            }
          });
          
          selectedVendors = selectedVendors.slice(0, 4);
        }
        
        // Update UI
        updateVendorSelectionUI();
        
        // Trigger calculations
        if (typeof window.updateCalculations === 'function') {
          window.updateCalculations(selectedVendors);
        }
      });
    });
    
    // Fix calculate buttons
    const calculateButtons = document.querySelectorAll('#calculate-btn, #calculate-btn-header, #calculate-tco-roi-btn');
    calculateButtons.forEach(button => {
      // Remove existing listeners
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      
      // Add new listener
      newButton.addEventListener('click', function() {
        // Ensure we have selected vendors
        if (selectedVendors.length === 0) {
          const portnoxCard = document.querySelector(`.vendor-card[data-vendor="${PORTNOX_VENDOR_ID}"]`);
          if (portnoxCard) {
            portnoxCard.classList.add('selected');
            selectedVendors.push(PORTNOX_VENDOR_ID);
          }
        }
        
        // Run calculations
        if (typeof window.updateCalculations === 'function') {
          window.updateCalculations(selectedVendors);
        }
      });
    });
    
    // Initial UI update
    updateVendorSelectionUI();
    
    console.log("🎯 Vendor selection fix initialized with vendors:", selectedVendors);
  }
  
  // Update vendor selection UI
  function updateVendorSelectionUI() {
    // Update display text if it exists
    const vendorDisplay = document.getElementById('selected-vendors-display');
    if (vendorDisplay) {
      vendorDisplay.textContent = selectedVendors.join(', ');
    }
    
    // Update vendor cards' visual state
    document.querySelectorAll('.vendor-card').forEach(card => {
      const vendor = card.getAttribute('data-vendor');
      if (vendor) {
        if (selectedVendors.includes(vendor)) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      }
    });
    
    // Broadcast selected vendors for other components
    console.log("🎯 Selected vendors:", selectedVendors);
    
    // Update charts and metrics
    if (typeof window.updateChartsAndMetrics === 'function') {
      window.updateChartsAndMetrics(selectedVendors);
    }
  }
  
  // Export functions
  window.vendorSelectionUtil = {
    getSelectedVendors: function() {
      return [...selectedVendors];
    },
    setSelectedVendors: function(vendors) {
      if (Array.isArray(vendors) && vendors.length > 0) {
        selectedVendors = [...vendors];
        
        // Ensure Portnox is always included
        if (!selectedVendors.includes(PORTNOX_VENDOR_ID)) {
          selectedVendors.unshift(PORTNOX_VENDOR_ID);
        }
        
        // Update UI
        updateVendorSelectionUI();
      }
    },
    addVendor: function(vendor) {
      if (vendor && !selectedVendors.includes(vendor)) {
        selectedVendors.push(vendor);
        updateVendorSelectionUI();
      }
    },
    removeVendor: function(vendor) {
      if (vendor && vendor !== PORTNOX_VENDOR_ID) {
        selectedVendors = selectedVendors.filter(v => v !== vendor);
        updateVendorSelectionUI();
      }
    }
  };
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', initVendorSelection);
  
  // Also try to initialize immediately in case DOM is already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initVendorSelection, 100);
  }
})();
