// Update App object to work with new sidebar manager

// Add integration with sidebar manager
App.init = function() {
  console.log('Initializing Portnox TCO Analyzer...');
  
  // Initialize Calculator
  this.state.calculator = new TcoCalculator(this.state.config);
  
  // Initialize Chart Placeholders
  this.state.chartPlaceholders = window.chartPlaceholders || new ChartPlaceholders();
  
  // Set up event listeners
  this.setupEventListeners();
  
  // Initialize UI state
  this.initUIState();
  
  // Initialize integration with sidebar manager
  this.initSidebarIntegration();
  
  console.log('Portnox TCO Analyzer initialized successfully.');
};

// Add method to integrate with sidebar manager
App.initSidebarIntegration = function() {
  // Listen for vendor selection changes
  document.addEventListener('vendorSelectionChanged', (event) => {
    this.state.selectedVendors = event.detail.selectedVendors;
    console.log('App received vendor selection change:', this.state.selectedVendors);
  });
  
  // Initialize with current sidebar selection
  if (window.sidebarManager) {
    this.state.selectedVendors = window.sidebarManager.getSelectedVendors();
  }
};

// Update toggle vendor selection to work with sidebar manager
App.toggleVendorSelection = function(vendorId, card) {
  if (window.sidebarManager) {
    window.sidebarManager.toggleVendorSelection(vendorId, card);
  } else {
    // Fallback to original implementation
    if (vendorId === 'portnox') {
      // Portnox cannot be deselected
      return;
    }
    
    const index = this.state.selectedVendors.indexOf(vendorId);
    
    if (index === -1) {
      // Add vendor to selection
      this.state.selectedVendors.push(vendorId);
      card.classList.add('selected');
    } else {
      // Remove vendor from selection
      this.state.selectedVendors.splice(index, 1);
      card.classList.remove('selected');
    }
    
    console.log('Selected vendors:', this.state.selectedVendors);
  }
};

// Update sidebar toggle
App.toggleSidebar = function() {
  if (window.sidebarManager) {
    window.sidebarManager.toggleSidebar();
  } else {
    // Fallback to original implementation
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebar-toggle');
    const contentArea = document.querySelector('.content-area');
    
    if (sidebar && toggle && contentArea) {
      sidebar.classList.toggle('collapsed');
      toggle.classList.toggle('collapsed');
      contentArea.classList.toggle('expanded');
      
      // Update icon
      const icon = toggle.querySelector('i');
      if (icon) {
        if (sidebar.classList.contains('collapsed')) {
          icon.className = 'fas fa-chevron-right';
        } else {
          icon.className = 'fas fa-chevron-left';
        }
      }
    }
  }
};
