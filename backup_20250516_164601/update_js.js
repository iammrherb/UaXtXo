// This script handles initialization of the new UI
document.addEventListener('DOMContentLoaded', function() {
  // Initialize UI state
  const UIState = {
    sidebarCollapsed: false,
    activeTab: 'executive', // Default tab
    darkMode: false,
    selectedVendors: ['portnox', 'cisco'], // Default selected vendors
    
    // Method to toggle sidebar collapse state
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
      document.querySelector('.sidebar').classList.toggle('collapsed', this.sidebarCollapsed);
    },
    
    // Method to switch active tab
    setActiveTab(tabId) {
      this.activeTab = tabId;
      // Update UI
      document.querySelectorAll('.view-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabId);
      });
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tabId}-content`);
      });
    },
    
    // Method to toggle dark mode
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      document.body.classList.toggle('dark-mode', this.darkMode);
    },
    
    // Method to toggle vendor selection
    toggleVendor(vendorId) {
      const index = this.selectedVendors.indexOf(vendorId);
      
      if (index === -1) {
        // Add vendor if not already selected
        this.selectedVendors.push(vendorId);
      } else if (this.selectedVendors.length > 1) {
        // Remove vendor if already selected and there's more than one vendor selected
        this.selectedVendors.splice(index, 1);
      }
      
      // Update UI
      updateVendorSelectionUI();
    }
  };

  // Set up event listeners
  function initializeUIListeners() {
    // Sidebar toggle
    document.getElementById('sidebar-toggle').addEventListener('click', () => UIState.toggleSidebar());
    
    // Tab switching
    document.querySelectorAll('.view-tab').forEach(tab => {
      tab.addEventListener('click', () => UIState.setActiveTab(tab.dataset.tab));
    });
    
    // Dark mode toggle
    document.getElementById('dark-mode-toggle').addEventListener('click', () => UIState.toggleDarkMode());
    
    // Vendor selection
    document.querySelectorAll('.vendor-card').forEach(card => {
      card.addEventListener('click', () => UIState.toggleVendor(card.dataset.vendor));
    });
    
    // Initialize vendor selection UI
    updateVendorSelectionUI();
  }
  
  // Update vendor selection UI
  function updateVendorSelectionUI() {
    document.querySelectorAll('.vendor-card').forEach(card => {
      const vendorId = card.dataset.vendor;
      card.classList.toggle('selected', UIState.selectedVendors.includes(vendorId));
    });
  }
  
  // Initialize the UI
  initializeUIListeners();
});
