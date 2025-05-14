#!/bin/bash

echo "Starting Portnox Total Cost Analyzer UI Update"
echo "==============================================="
echo "This script will update the interface from wizard to collapsible sidebar."

# Create backup of original files
echo "Creating backup of original files..."
TIMESTAMP=$(date +%Y%m%d%H%M%S)
BACKUP_DIR="./backup_$TIMESTAMP"
mkdir -p "$BACKUP_DIR"
cp -r ./css "$BACKUP_DIR"
cp -r ./js "$BACKUP_DIR"
cp index.html "$BACKUP_DIR"
echo "Backup created at $BACKUP_DIR"

# Create new CSS file for the sidebar layout
echo "Creating new layout CSS file..."
cat > ./css/sidebar-layout.css << 'EOF'
/* Sidebar Layout Styles */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 320px;
  background-color: #f8f9fa;
  border-right: 1px solid #e3e6f0;
  transition: transform 0.3s ease;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.sidebar.collapsed {
  transform: translateX(-320px);
}

.sidebar-toggle {
  position: absolute;
  left: 320px;
  top: 70px;
  background: #fff;
  border: 1px solid #e3e6f0;
  border-left: none;
  width: 24px;
  height: 40px;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: left 0.3s ease;
  z-index: 100;
}

.sidebar.collapsed + .content-area .sidebar-toggle {
  left: 0;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #e3e6f0;
}

.sidebar-content {
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid #e3e6f0;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  position: relative;
  transition: margin-left 0.3s ease;
}

.content-wrapper {
  padding: 1.5rem;
}

/* Section Cards */
.config-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  margin-bottom: 1rem;
}

.config-card-header {
  padding: 1rem;
  border-bottom: 1px solid #e3e6f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.config-card-content {
  padding: 1rem;
  display: block;
}

.config-card-content.collapsed {
  display: none;
}

/* Vendor Selection Grid */
.vendor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem;
}

.vendor-card {
  border: 1px solid #e3e6f0;
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.vendor-card:hover {
  box-shadow: 0 0.25rem 0.5rem rgba(58, 59, 69, 0.15);
}

.vendor-card.selected {
  border-color: #4e73df;
  background-color: rgba(78, 115, 223, 0.1);
}

/* Analysis Views Tabs */
.view-tabs {
  display: flex;
  border-bottom: 1px solid #e3e6f0;
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

.view-tab {
  padding: 0.75rem 1.25rem;
  font-weight: 500;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  white-space: nowrap;
}

.view-tab.active {
  border-bottom-color: #4e73df;
  color: #4e73df;
}

/* Results Tabs */
.results-tabs {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #e3e6f0;
  margin-bottom: 1rem;
}

.results-tab {
  padding: 0.75rem 1.25rem;
  font-weight: 500;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  margin-bottom: -1px;
}

.results-tab.active {
  border-bottom-color: #4e73df;
  color: #4e73df;
}

.results-panel {
  display: none;
}

.results-panel.active {
  display: block;
}

/* Dashboard Cards */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.dashboard-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  padding: 1.25rem;
}

.dashboard-card h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e3e6f0;
  padding-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.metric-label {
  font-size: 0.875rem;
  color: #6c757d;
}

.highlight-value {
  color: #1cc88a;
}

.negative-value {
  color: #e74a3b;
}

/* Chart Containers */
.chart-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.chart-container h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e3e6f0;
  padding-bottom: 0.5rem;
}

.chart-wrapper {
  height: 300px;
  width: 100%;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .sidebar {
    width: 280px;
  }
  
  .sidebar-toggle {
    left: 280px;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e3e6f0;
    max-height: 50vh;
  }
  
  .sidebar.collapsed {
    transform: translateY(-100%);
    max-height: 0;
  }
  
  .sidebar-toggle {
    left: auto;
    right: 1rem;
    top: 1rem;
    border: 1px solid #e3e6f0;
    border-radius: 4px;
  }
  
  .content-area {
    margin-left: 0 !important;
  }
}
EOF
echo "Created sidebar-layout.css"

# Update the main CSS file to include the new layout
echo "Updating main.css to include the new layout..."
cat >> ./css/main.css << 'EOF'

/* Import new sidebar layout */
@import url('sidebar-layout.css');

/* Additional Theming for TCO Analyzer */
:root {
  --primary-color: #4e73df;
  --success-color: #1cc88a;
  --warning-color: #f6c23e;
  --danger-color: #e74a3b;
  --info-color: #36b9cc;
  --dark-color: #5a5c69;
  --light-color: #f8f9fa;
  --body-bg: #f8f9fa;
  --card-bg: #fff;
  --card-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  --border-color: #e3e6f0;
  --text-primary: #3a3b45;
  --text-secondary: #6c757d;
  --font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

body {
  font-family: var(--font-family);
  background-color: var(--body-bg);
  color: var(--text-primary);
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Modernized Vendor Card Styles */
.vendor-card {
  transition: all 0.2s ease;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.vendor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.vendor-card.selected {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.25);
}

.vendor-logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 0.5rem;
}

.vendor-logo img {
  max-height: 40px;
  max-width: 100%;
  object-fit: contain;
}

.vendor-info {
  padding: 0.75rem;
  background-color: #f8f9fa;
  text-align: center;
}

.vendor-info h3 {
  font-size: 0.9rem;
  margin: 0 0 0.25rem;
}

.vendor-info p {
  font-size: 0.75rem;
  color: #6c757d;
  margin: 0;
}

.vendor-badge {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  text-align: center;
  background-color: #e8f4fd;
  color: #0d6efd;
}

/* Button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  border: 1px solid transparent;
  font-size: 0.875rem;
}

.btn i {
  margin-right: 0.5rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: #fff;
}

.btn-primary:hover {
  background-color: #2653d4;
}

.btn-outline {
  background-color: transparent;
  border-color: var(--border-color);
  color: var(--text-primary);
}

.btn-outline:hover {
  background-color: #f8f9fa;
}

.btn-success {
  background-color: var(--success-color);
  color: #fff;
}

.btn-large {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

/* Form Controls */
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  border-color: #a1c0ff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
}

.form-select {
  display: block;
  width: 100%;
  padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  appearance: none;
}

.form-check {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.form-check-input {
  margin-right: 0.5rem;
}

/* Slider controls */
.range-slider {
  width: 100%;
  margin-bottom: 1rem;
}

.range-slider-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.range-slider-label {
  font-weight: 500;
  font-size: 0.875rem;
}

.range-slider-value {
  font-weight: 600;
  color: var(--primary-color);
}

.range-slider input {
  width: 100%;
}

/* Helper elements */
.helper-text {
  font-size: 0.75rem;
  color: #6c757d;
  margin-top: 0.25rem;
}

.divider {
  margin: 1.5rem 0;
  border-top: 1px solid var(--border-color);
}

/* Dark mode support */
.dark-mode {
  --body-bg: #1e2126;
  --card-bg: #282d33;
  --border-color: #374151;
  --text-primary: #e5e7eb;
  --text-secondary: #9ca3af;
}

.dark-mode .vendor-card {
  background-color: #282d33;
}

.dark-mode .vendor-info {
  background-color: #323941;
}

.dark-mode .form-control,
.dark-mode .form-select {
  background-color: #323941;
  border-color: #4b5563;
  color: #e5e7eb;
}

.dark-mode .btn-outline {
  border-color: #4b5563;
  color: #e5e7eb;
}

.dark-mode .btn-outline:hover {
  background-color: #323941;
}
EOF
echo "Updated main.css"

# Create JavaScript file for the sidebar functionality
echo "Creating sidebar controller JS file..."
mkdir -p ./js/components
cat > ./js/components/sidebar-controller.js << 'EOF'
/**
 * Sidebar Controller
 * Manages the sidebar behavior and interactions
 */
class SidebarController {
  constructor() {
    this.sidebar = document.querySelector('.sidebar');
    this.toggle = document.querySelector('.sidebar-toggle');
    this.contentArea = document.querySelector('.content-area');
    this.configCards = document.querySelectorAll('.config-card');
    
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Toggle sidebar
    if (this.toggle) {
      this.toggle.addEventListener('click', () => this.toggleSidebar());
    }
    
    // Toggle config card sections
    this.configCards.forEach(card => {
      const header = card.querySelector('.config-card-header');
      const content = card.querySelector('.config-card-content');
      
      if (header && content) {
        header.addEventListener('click', () => {
          content.classList.toggle('collapsed');
          const icon = header.querySelector('i.fa-chevron-down, i.fa-chevron-up');
          
          if (icon) {
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
          }
        });
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        this.contentArea.style.marginLeft = '0';
      } else if (!this.sidebar.classList.contains('collapsed')) {
        this.contentArea.style.marginLeft = '320px';
      }
    });
  }
  
  toggleSidebar() {
    this.sidebar.classList.toggle('collapsed');
    
    if (window.innerWidth >= 768) {
      if (this.sidebar.classList.contains('collapsed')) {
        this.contentArea.style.marginLeft = '0';
      } else {
        this.contentArea.style.marginLeft = '320px';
      }
    }
    
    // Update toggle icon
    const toggleIcon = this.toggle.querySelector('i');
    if (toggleIcon) {
      toggleIcon.classList.toggle('fa-chevron-left');
      toggleIcon.classList.toggle('fa-chevron-right');
    }
    
    // Trigger window resize to adjust charts
    window.dispatchEvent(new Event('resize'));
  }
  
  // Open a specific config card
  openConfigCard(cardId) {
    const card = document.getElementById(cardId);
    if (card) {
      const content = card.querySelector('.config-card-content');
      const header = card.querySelector('.config-card-header');
      
      if (content && content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        
        const icon = header.querySelector('i.fa-chevron-down');
        if (icon) {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-up');
        }
      }
      
      // Ensure sidebar is open
      if (this.sidebar.classList.contains('collapsed')) {
        this.toggleSidebar();
      }
      
      // Scroll to the card
      card.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Initialize the sidebar controller when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.sidebarController = new SidebarController();
});
EOF
echo "Created sidebar-controller.js"

# Create main view controller
echo "Creating view controller JS file..."
cat > ./js/components/view-controller.js << 'EOF'
/**
 * View Controller
 * Manages the different stakeholder views and results panels
 */
class ViewController {
  constructor() {
    // Stakeholder view tabs
    this.viewTabs = document.querySelectorAll('.view-tab');
    this.viewPanels = document.querySelectorAll('.view-panel');
    
    // Results tabs within each view
    this.resultsTabs = document.querySelectorAll('.results-tab');
    this.resultsPanels = document.querySelectorAll('.results-panel');
    
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Stakeholder view switching
    this.viewTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.getAttribute('data-view');
        this.activateView(view);
      });
    });
    
    // Results tab switching
    this.resultsTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const panel = tab.getAttribute('data-panel');
        const view = tab.closest('.view-panel').getAttribute('data-view');
        this.activateResultsPanel(panel, view);
      });
    });
  }
  
  activateView(view) {
    // Update tab states
    this.viewTabs.forEach(tab => {
      if (tab.getAttribute('data-view') === view) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Update panel visibility
    this.viewPanels.forEach(panel => {
      if (panel.getAttribute('data-view') === view) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
    
    // Trigger event for other components
    document.dispatchEvent(new CustomEvent('viewChanged', { 
      detail: { view: view }
    }));
    
    // Trigger resize to fix chart display
    window.dispatchEvent(new Event('resize'));
  }
  
  activateResultsPanel(panelId, view) {
    // Get tabs and panels within the current view
    const viewPanel = document.querySelector(`.view-panel[data-view="${view}"]`);
    
    if (!viewPanel) return;
    
    const tabs = viewPanel.querySelectorAll('.results-tab');
    const panels = viewPanel.querySelectorAll('.results-panel');
    
    // Update tab states
    tabs.forEach(tab => {
      if (tab.getAttribute('data-panel') === panelId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Update panel visibility
    panels.forEach(panel => {
      if (panel.getAttribute('id') === panelId) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
    
    // Trigger resize to fix chart display
    window.dispatchEvent(new Event('resize'));
  }
  
  // Navigate to a specific view and panel
  navigateTo(view, panel) {
    this.activateView(view);
    if (panel) {
      this.activateResultsPanel(panel, view);
    }
  }
}

// Initialize the view controller when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.viewController = new ViewController();
});
EOF
echo "Created view-controller.js"

# Create vendor selection controller
echo "Creating vendor selection controller JS file..."
cat > ./js/components/vendor-controller.js << 'EOF'
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
EOF
echo "Created vendor-controller.js"

# Update the index.html file
echo "Updating index.html with new structure..."
cat > ./index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Zero Trust Total Cost Analyzer - Enterprise Total Cost of Ownership Calculator">
    <title>Total Cost Analyzer | Portnox</title>
    
    <!-- CSS Libraries -->
    <link rel="stylesheet" href="libs/css/tailwind.min.css">
    <link rel="stylesheet" href="libs/css/all.min.css">
    <link rel="stylesheet" href="css/fontawesome-local.css">
    <link rel="stylesheet" href="libs/css/animate.min.css">
    <link rel="stylesheet" href="libs/css/aos.css">
    <link rel="stylesheet" href="libs/css/hover.min.css">
    
    <!-- Core CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/chart-styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <link rel="icon" type="image/png" href="img/favicon.svg">
</head>
<body>
    <!-- Particle Background -->
    <div id="particles-js"></div>
    
    <!-- Main Application Container -->
    <div class="app-container">
        <!-- Enhanced Header -->
        <header class="app-header">
            <div class="header-content">
                <div class="logo-section">
                    <img src="img/portnox-logo.svg" alt="Portnox Logo" class="company-logo">
                    <div class="app-title">
                        <h1>Zero Trust Total Cost Analyzer</h1>
                        <p class="subtitle">Zero Trust NAC Solution Comparison Platform</p>
                    </div>
                </div>
                <div class="header-actions">
                    <button id="export-pdf" class="btn btn-outline btn-icon" title="Export Report">
                        <i class="fas fa-file-pdf"></i>
                        <span>Export</span>
                    </button>
                    <button id="help-btn" class="btn btn-outline btn-icon" title="Help">
                        <i class="fas fa-question-circle"></i>
                        <span>Help</span>
                    </button>
                    <button id="dark-mode-toggle" class="btn btn-outline btn-icon" title="Toggle Dark Mode">
                        <i class="fas fa-moon"></i>
                    </button>
                </div>
            </div>
        </header>
        
        <!-- Main Content Area with Sidebar -->
        <div class="main-content">
            <!-- Configuration Sidebar -->
            <div class="sidebar">
                <div class="sidebar-header">
                    <h2>Configuration</h2>
                </div>
                
                <div class="sidebar-content">
                    <!-- Vendor Selection -->
                    <div id="vendor-config" class="config-card">
                        <div class="config-card-header">
                            <h3><i class="fas fa-server"></i> Select NAC Vendors</h3>
                            <i class="fas fa-chevron-up"></i>
                        </div>
                        <div class="config-card-content">
                            <p class="helper-text">Choose multiple vendors to compare with Portnox Cloud</p>
                            <div class="vendor-grid">
                                <div class="vendor-card selected" data-vendor="portnox">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/portnox-logo.png" alt="Portnox">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Portnox Cloud</h3>
                                        <p>Cloud-native NAC</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="cisco">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/cisco-logo.png" alt="Cisco ISE">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Cisco ISE</h3>
                                        <p>Enterprise NAC</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="aruba">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/aruba-logo.png" alt="Aruba ClearPass">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Aruba ClearPass</h3>
                                        <p>Policy manager</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="forescout">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/forescout-logo.png" alt="Forescout">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Forescout</h3>
                                        <p>Device visibility</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="fortinac">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/fortinac-logo.png" alt="FortiNAC">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>FortiNAC</h3>
                                        <p>Fortinet NAC</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="juniper">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/juniper-logo.png" alt="Juniper Mist">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Juniper Mist</h3>
                                        <p>AI-driven NAC</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="securew2">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/securew2-logo.png" alt="SecureW2">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>SecureW2</h3>
                                        <p>Cloud RADIUS</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="nps">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/microsoft-logo.png" alt="Microsoft NPS">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Microsoft NPS</h3>
                                        <p>Windows Server NAC</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="noNac">
                                    <div class="vendor-logo">
                                        <i class="fas fa-shield-virus fa-3x"></i>
                                    </div>
                                    <div class="vendor-info">
                                        <h3>No NAC</h3>
                                        <p>Baseline</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Industry & Compliance -->
                    <div id="industry-config" class="config-card">
                        <div class="config-card-header">
                            <h3><i class="fas fa-building"></i> Industry & Compliance</h3>
                            <i class="fas fa-chevron-up"></i>
                        </div>
                        <div class="config-card-content">
                            <div class="form-group">
                                <label for="industry-select" class="form-label">Industry</label>
                                <select id="industry-select" class="form-select">
                                    <option value="">Choose an industry...</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="financial">Financial Services</option>
                                    <option value="education">Education</option>
                                    <option value="government">Government</option>
                                    <option value="manufacturing">Manufacturing</option>
                                    <option value="retail">Retail</option>
                                    <option value="technology">Technology</option>
                                    <option value="energy">Energy & Utilities</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Compliance Requirements</label>
                                <div class="form-check">
                                    <input type="checkbox" id="compliance-pci" class="form-check-input">
                                    <label for="compliance-pci">PCI DSS</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" id="compliance-hipaa" class="form-check-input">
                                    <label for="compliance-hipaa">HIPAA</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" id="compliance-nist" class="form-check-input">
                                    <label for="compliance-nist">NIST 800-53</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" id="compliance-gdpr" class="form-check-input">
                                    <label for="compliance-gdpr">GDPR</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" id="compliance-iso" class="form-check-input">
                                    <label for="compliance-iso">ISO 27001</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Organization Details -->
                    <div id="organization-config" class="config-card">
                        <div class="config-card-header">
                            <h3><i class="fas fa-users"></i> Organization</h3>
                            <i class="fas fa-chevron-up"></i>
                        </div>
                        <div class="config-card-content">
                            <div class="form-group">
                                <label for="organization-size" class="form-label">Organization Size</label>
                                <select id="organization-size" class="form-select">
                                    <option value="small">Small (< 1,000 devices)</option>
                                    <option value="medium" selected>Medium (1,000-5,000 devices)</option>
                                    <option value="large">Large (5,000+ devices)</option>
                                    <option value="enterprise">Enterprise (10,000+ devices)</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="device-count" class="form-label">Number of Devices</label>
                                <input type="number" id="device-count" class="form-control" value="2500" min="300" max="100000">
                                <div class="helper-text">Include all managed devices (PCs, mobile, IoT)</div>
                            </div>
                            
                            <div class="form-group">
                                <label for="locations" class="form-label">Number of Locations</label>
                                <input type="number" id="locations" class="form-control" value="5" min="1" max="1000">
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Network Requirements</label>
                                <div class="form-check">
                                    <input type="checkbox" id="cloud-integration" class="form-check-input">
                                    <label for="cloud-integration">Cloud Integration Required</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" id="legacy-devices" class="form-check-input">
                                    <label for="legacy-devices">Legacy Device Support</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" id="byod-support" class="form-check-input">
                                    <label for="byod-support">BYOD Support</label>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="years-to-project" class="form-label">Analysis Period</label>
                                <select id="years-to-project" class="form-select">
                                    <option value="1">1 Year</option>
                                    <option value="3" selected>3 Years</option>
                                    <option value="5">5 Years</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Cost Configuration -->
                    <div id="cost-config" class="config-card">
                        <div class="config-card-header">
                            <h3><i class="fas fa-dollar-sign"></i> Cost Parameters</h3>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="config-card-content collapsed">
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Average FTE Cost ($/year)</span>
                                    <span class="range-slider-value" id="fte-cost-value">$120,000</span>
                                </div>
                                <input type="range" id="fte-cost" min="60000" max="200000" value="120000" step="5000">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">FTE Allocation for NAC (%)</span>
                                    <span class="range-slider-value" id="fte-allocation-value">50%</span>
                                </div>
                                <input type="range" id="fte-allocation" min="10" max="100" value="50" step="5">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Annual Maintenance (%)</span>
                                    <span class="range-slider-value" id="maintenance-value">18%</span>
                                </div>
                                <input type="range" id="maintenance-percentage" min="10" max="30" value="18" step="1">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Downtime Cost ($/hour)</span>
                                    <span class="range-slider-value" id="downtime-cost-value">$10,000</span>
                                </div>
                                <input type="range" id="downtime-cost" min="1000" max="50000" value="10000" step="1000">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Implementation Days (On-Prem)</span>
                                    <span class="range-slider-value" id="implementation-days-value">60 days</span>
                                </div>
                                <input type="range" id="implementation-days" min="10" max="200" value="60" step="5">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Portnox Monthly Cost per Device ($)</span>
                                    <span class="range-slider-value" id="portnox-cost-value">$4.00</span>
                                </div>
                                <input type="range" id="portnox-base-price" min="1" max="10" step="0.5" value="4">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Volume Discount (%)</span>
                                    <span class="range-slider-value" id="portnox-discount-value">20%</span>
                                </div>
                                <input type="range" id="portnox-discount" min="0" max="50" value="20" step="5">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="sidebar-footer">
                    <button id="calculate-btn" class="btn btn-primary btn-large">
                        <i class="fas fa-calculator"></i> Calculate
                    </button>
                </div>
            </div>
            
            <!-- Sidebar Toggle Button -->
            <div class="sidebar-toggle">
                <i class="fas fa-chevron-left"></i>
            </div>
            
            <!-- Main Content Area -->
            <div class="content-area">
                <div class="content-wrapper">
                    <!-- Stakeholder View Tabs -->
                    <div class="view-tabs">
                        <div class="view-tab active" data-view="executive">Executive & Financial</div>
                        <div class="view-tab" data-view="technical">Technical & Security</div>
                    </div>
                    
                    <!-- Executive & Financial View -->
                    <div class="view-panel active" data-view="executive">
                        <!-- View-specific Tabs -->
                        <div class="results-tabs">
                            <div class="results-tab active" data-panel="executive-overview">Overview</div>
                            <div class="results-tab" data-panel="executive-tco">TCO Analysis</div>
                            <div class="results-tab" data-panel="executive-roi">ROI Analysis</div>
                            <div class="results-tab" data-panel="executive-risk">Risk Assessment</div>
                        </div>
                        
                        <!-- Executive Overview Panel -->
                        <div id="executive-overview" class="results-panel active">
                            <h2>Executive Summary</h2>
                            
                            <div class="dashboard-grid">
                                <div class="dashboard-card">
                                    <h3>Total Cost Savings</h3>
                                    <div class="metric-value highlight-value" id="total-savings">$476,000</div>
                                    <div class="metric-label" id="savings-percentage">53% reduction vs. Cisco ISE</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Break-even Point</h3>
                                    <div class="metric-value" id="breakeven-point">10 months</div>
                                    <div class="metric-label">Time to positive ROI</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Total 3-Year TCO</h3>
                                    <div class="metric-value" id="portnox-tco">$429,000</div>
                                    <div class="metric-label" id="tco-comparison">vs. $905,000 (Cisco ISE)</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Implementation Time</h3>
                                    <div class="metric-value" id="implementation-time">45 days</div>
                                    <div class="metric-label" id="implementation-comparison">75% faster than Cisco ISE</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>3-Year TCO Comparison</h3>
                                <div class="chart-wrapper">
                                    <canvas id="tco-comparison-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Key Benefits</h3>
                                <div id="key-benefits">
                                    <ul class="benefits-list">
                                        <li><strong>Lower Total Cost:</strong> Portnox Cloud eliminates hardware costs and reduces implementation expenses.</li>
                                        <li><strong>Reduced Operational Overhead:</strong> Cloud-native architecture requires 70% less FTE allocation.</li>
                                        <li><strong>Faster Time-to-Value:</strong> Deploy Portnox 4x faster than on-premises alternatives.</li>
                                        <li><strong>Superior Compliance Coverage:</strong> Meet 95% of compliance requirements with built-in controls.</li>
                                        <li><strong>Zero Trust Ready:</strong> Designed for modern Zero Trust security architecture.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <!-- TCO Analysis Panel -->
                        <div id="executive-tco" class="results-panel">
                            <h2>Total Cost of Ownership Analysis</h2>
                            
                            <div class="chart-container">
                                <h3>Detailed 3-Year TCO Breakdown</h3>
                                <div class="chart-wrapper">
                                    <canvas id="detailed-tco-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Cumulative Cost Over Time</h3>
                                <div class="chart-wrapper">
                                    <canvas id="cumulative-cost-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Cost Component Comparison</h3>
                                <div class="responsive-table">
                                    <table class="data-table" id="cost-component-table">
                                        <thead>
                                            <tr>
                                                <th>Cost Component</th>
                                                <th>Portnox Cloud</th>
                                                <th>Cisco ISE</th>
                                                <th>Difference</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Hardware</td>
                                                <td>$0</td>
                                                <td>$175,000</td>
                                                <td class="highlight-value">-$175,000</td>
                                            </tr>
                                            <tr>
                                                <td>Software/Subscription</td>
                                                <td>$300,000</td>
                                                <td>$250,000</td>
                                                <td class="negative-value">+$50,000</td>
                                            </tr>
                                            <tr>
                                                <td>Implementation</td>
                                                <td>$30,000</td>
                                                <td>$120,000</td>
                                                <td class="highlight-value">-$90,000</td>
                                            </tr>
                                            <tr>
                                                <td>Maintenance & Support</td>
                                                <td>$45,000</td>
                                                <td>$180,000</td>
                                                <td class="highlight-value">-$135,000</td>
                                            </tr>
                                            <tr>
                                                <td>Personnel (FTE)</td>
                                                <td>$54,000</td>
                                                <td>$180,000</td>
                                                <td class="highlight-value">-$126,000</td>
                                            </tr>
                                            <tr class="total-row">
                                                <td>Total 3-Year TCO</td>
                                                <td>$429,000</td>
                                                <td>$905,000</td>
                                                <td class="highlight-value">-$476,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <!-- ROI Analysis Panel -->
                        <div id="executive-roi" class="results-panel">
                            <h2>Return on Investment Analysis</h2>
                            
                            <div class="dashboard-grid">
                                <div class="dashboard-card">
                                    <h3>3-Year ROI</h3>
                                    <div class="metric-value highlight-value" id="three-year-roi">125%</div>
                                    <div class="metric-label">Return on investment</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Annual Cost Savings</h3>
                                    <div class="metric-value" id="annual-savings">$158,667</div>
                                    <div class="metric-label">Per year vs. Cisco ISE</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Productivity Gains</h3>
                                    <div class="metric-value" id="productivity-value">$300,000</div>
                                    <div class="metric-label">Estimated 3-year value</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Payback Period</h3>
                                    <div class="metric-value" id="payback-period">10 months</div>
                                    <div class="metric-label">Time to recoup investment</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>ROI Over Time</h3>
                                <div class="chart-wrapper">
                                    <canvas id="roi-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Value Drivers</h3>
                                <div class="chart-wrapper">
                                    <canvas id="value-drivers-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Benefit Details</h3>
                                <div class="responsive-table">
                                    <table class="data-table" id="benefits-table">
                                        <thead>
                                            <tr>
                                                <th>Benefit Category</th>
                                                <th>Description</th>
                                                <th>Estimated Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Cost Avoidance</td>
                                                <td>Hardware, implementation, and maintenance savings</td>
                                                <td>$400,000</td>
                                            </tr>
                                            <tr>
                                                <td>Operational Efficiency</td>
                                                <td>Reduced FTE requirements for management</td>
                                                <td>$126,000</td>
                                            </tr>
                                            <tr>
                                                <td>Faster Deployment</td>
                                                <td>Accelerated time-to-value and productivity</td>
                                                <td>$75,000</td>
                                            </tr>
                                            <tr>
                                                <td>Security Improvement</td>
                                                <td>Reduced breach risk and compliance violations</td>
                                                <td>$125,000</td>
                                            </tr>
                                            <tr>
                                                <td>Future-Proofing</td>
                                                <td>Automatic updates and scalability benefits</td>
                                                <td>$50,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Risk Assessment Panel -->
                        <div id="executive-risk" class="results-panel">
                            <h2>Risk Assessment</h2>
                            
                            <div class="dashboard-grid">
                                <div class="dashboard-card">
                                    <h3>Risk Reduction</h3>
                                    <div class="metric-value highlight-value" id="risk-reduction">57%</div>
                                    <div class="metric-label">Overall risk reduction</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Breach Risk</h3>
                                    <div class="metric-value" id="breach-risk">Low</div>
                                    <div class="metric-label">vs. Medium (Cisco ISE)</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Compliance Risk</h3>
                                    <div class="metric-value" id="compliance-risk">Low</div>
                                    <div class="metric-label">vs. Medium (Cisco ISE)</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Implementation Risk</h3>
                                    <div class="metric-value" id="implementation-risk">Low</div>
                                    <div class="metric-label">vs. High (Cisco ISE)</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Risk Assessment Analysis</h3>
                                <div class="chart-wrapper">
                                    <canvas id="risk-analysis-chart"></canvas>
                                </div>
                                <p class="helper-text text-center">Lower scores indicate better risk mitigation</p>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Breach Impact Analysis</h3>
                                <div class="chart-wrapper">
                                    <canvas id="breach-impact-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Risk Assessment Matrix</h3>
                                <div class="responsive-table">
                                    <table class="data-table" id="risk-matrix-table">
                                        <thead>
                                            <tr>
                                                <th>Risk Factor</th>
                                                <th>Portnox Cloud</th>
                                                <th>Cisco ISE</th>
                                                <th>Industry Average</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Unauthorized Access</td>
                                                <td><span class="badge badge-success">Low Risk</span></td>
                                                <td><span class="badge badge-warning">Medium Risk</span></td>
                                                <td><span class="badge badge-warning">Medium Risk</span></td>
                                            </tr>
                                            <tr>
                                                <td>Compliance Violations</td>
                                                <td><span class="badge badge-success">Low Risk</span></td>
                                                <td><span class="badge badge-warning">Medium Risk</span></td>
                                                <td><span class="badge badge-warning">Medium Risk</span></td>
                                            </tr>
                                            <tr>
                                                <td>Network Visibility</td>
                                                <td><span class="badge badge-success">High Visibility</span></td>
                                                <td><span class="badge badge-warning">Medium Visibility</span></td>
                                                <td><span class="badge badge-warning">Medium Visibility</span></td>
                                            </tr>
                                            <tr>
                                                <td>Insider Threats</td>
                                                <td><span class="badge badge-success">Low Risk</span></td>
                                                <td><span class="badge badge-warning">Medium Risk</span></td>
                                                <td><span class="badge badge-warning">Medium Risk</span></td>
                                            </tr>
                                            <tr>
                                                <td>Configuration Errors</td>
                                                <td><span class="badge badge-success">Low Risk</span></td>
                                                <td><span class="badge badge-danger">High Risk</span></td>
                                                <td><span class="badge badge-warning">Medium Risk</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Technical & Security View -->
                    <div class="view-panel" data-view="technical">
                        <!-- View-specific Tabs -->
                        <div class="results-tabs">
                            <div class="results-tab active" data-panel="technical-overview">Overview</div>
                            <div class="results-tab" data-panel="technical-features">Feature Comparison</div>
                            <div class="results-tab" data-panel="technical-implementation">Implementation</div>
                            <div class="results-tab" data-panel="technical-compliance">Compliance</div>
                            <div class="results-tab" data-panel="technical-sensitivity">Sensitivity</div>
                        </div>
                        
                        <!-- Technical Overview Panel -->
                        <div id="technical-overview" class="results-panel active">
                            <h2>Technical Overview</h2>
                            
                            <div class="dashboard-grid">
                                <div class="dashboard-card">
                                    <h3>Cloud Architecture</h3>
                                    <div class="metric-value highlight-value">100%</div>
                                    <div class="metric-label">Cloud-native platform</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Zero Trust Support</h3>
                                    <div class="metric-value highlight-value">Full</div>
                                    <div class="metric-label">vs. Partial (competitors)</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>API Integration</h3>
                                    <div class="metric-value">300+</div>
                                    <div class="metric-label">Pre-built integrations</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Technical Debt</h3>
                                    <div class="metric-value highlight-value">Minimal</div>
                                    <div class="metric-label">Modern architecture</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Architecture Comparison</h3>
                                <div class="chart-wrapper">
                                    <canvas id="architecture-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Technical Advantages</h3>
                                <div id="technical-advantages">
                                    <ul class="benefits-list">
                                        <li><strong>Cloud-Native Platform:</strong> No hardware to deploy or maintain, automatic updates.</li>
                                        <li><strong>Agentless Architecture:</strong> Simplifies deployment and reduces endpoint management.</li>
                                        <li><strong>Comprehensive API:</strong> Seamless integration with existing security tools and IT systems.</li>
                                        <li><strong>Centralized Management:</strong> Single console for all locations and remote users.</li>
                                        <li><strong>Continuous Posture Assessment:</strong> Real-time security evaluation for all endpoints.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Feature Comparison Panel -->
                        <div id="technical-features" class="results-panel">
                            <h2>Feature Comparison</h2>
                            
                            <div class="chart-container">
                                <h3>Feature Capability Comparison</h3>
                                <div class="chart-wrapper">
                                    <canvas id="feature-radar-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Detailed Feature Matrix</h3>
                                <div class="responsive-table">
                                    <table class="data-table" id="feature-matrix-table">
                                        <thead>
                                            <tr>
                                                <th>Feature</th>
                                                <th>Portnox</th>
                                                <th>Cisco ISE</th>
                                                <th>Aruba ClearPass</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Cloud-Based Architecture</td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                                <td><span class="badge badge-warning">⚠ Limited</span></td>
                                                <td><span class="badge badge-warning">⚠ Limited</span></td>
                                            </tr>
                                            <tr>
                                                <td>Zero Trust Security</td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                                <td><span class="badge badge-warning">⚠ Partial</span></td>
                                                <td><span class="badge badge-warning">⚠ Partial</span></td>
                                            </tr>
                                            <tr>
                                                <td>Multi-Factor Authentication</td>
                                                <td><span class="badge badge-success">✓ Yes</span></td>
                                                <td><span class="badge badge-success">✓ Yes</span></td>
                                                <td><span class="badge badge-success">✓ Yes</span></td>
                                            </tr>
                                            <tr>
                                                <td>Scalability</td>
                                                <td><span class="badge badge-success">✓ Simple</span></td>
                                                <td><span class="badge badge-warning">⚠ Complex</span></td>
                                                <td><span class="badge badge-warning">⚠ Complex</span></td>
                                            </tr>
                                            <tr>
                                                <td>BYOD Support</td>
                                                <td><span class="badge badge-success">✓ Advanced</span></td>
                                                <td><span class="badge badge-success">✓ Yes</span></td>
                                                <td><span class="badge badge-success">✓ Yes</span></td>
                                            </tr>
                                            <tr>
                                                <td>Guest Management</td>
                                                <td><span class="badge badge-success">✓ Advanced</span></td>
                                                <td><span class="badge badge-success">✓ Advanced</span></td>
                                                <td><span class="badge badge-success">✓ Advanced</span></td>
                                            </tr>
                                            <tr>
                                                <td>Remote Access</td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                                <td><span class="badge badge-warning">⚠ Limited</span></td>
                                                <td><span class="badge badge-warning">⚠ Limited</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Feature Strength Analysis</h3>
                                <div class="chart-wrapper">
                                    <canvas id="feature-strength-chart"></canvas>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Implementation Panel -->
                        <div id="technical-implementation" class="results-panel">
                            <h2>Implementation Analysis</h2>
                            
                            <div class="chart-container">
                                <h3>Implementation Timeline Comparison</h3>
                                <div class="chart-wrapper">
                                    <canvas id="implementation-timeline-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Implementation Complexity</h3>
                                <div class="responsive-table">
                                    <table class="data-table" id="implementation-complexity-table">
                                        <thead>
                                            <tr>
                                                <th>Implementation Factor</th>
                                                <th>Portnox</th>
                                                <th>Cisco ISE</th>
                                                <th>Aruba ClearPass</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Hardware Installation</td>
                                                <td>None Required</td>
                                                <td>Required</td>
                                                <td>Required</td>
                                            </tr>
                                            <tr>
                                                <td>Integration Complexity</td>
                                                <td>⭐ Low</td>
                                                <td>⭐⭐⭐ High</td>
                                                <td>⭐⭐⭐ High</td>
                                            </tr>
                                            <tr>
                                                <td>Time to First Policy</td>
                                                <td>1 day</td>
                                                <td>14 days</td>
                                                <td>10 days</td>
                                            </tr>
                                            <tr>
                                                <td>Required Expertise</td>
                                                <td>Low</td>
                                                <td>High (Certification)</td>
                                                <td>High (Certification)</td>
                                            </tr>
                                            <tr>
                                                <td>Training Duration</td>
                                                <td>5 days</td>
                                                <td>20 days</td>
                                                <td>15 days</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Resource Requirements</h3>
                                <div class="chart-wrapper">
                                    <canvas id="resource-requirements-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Implementation Phases & Timeline</h3>
                                <div id="implementation-timeline">
                                    <!-- Timeline content -->
                                </div>
                            </div>
                        </div>
                        
                        <!-- Compliance Panel -->
                        <div id="technical-compliance" class="results-panel">
                            <h2>Compliance Framework Coverage</h2>
                            
                            <div class="chart-container">
                                <h3>Compliance Framework Coverage</h3>
                                <div class="chart-wrapper">
                                    <canvas id="compliance-radar-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Industry-Specific Compliance</h3>
                                <div class="chart-wrapper">
                                    <canvas id="industry-compliance-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Detailed Compliance Matrix</h3>
                                <div class="responsive-table">
                                    <table class="data-table" id="compliance-matrix-table">
                                        <thead>
                                            <tr>
                                                <th>Requirement</th>
                                                <th>Portnox</th>
                                                <th>Cisco ISE</th>
                                                <th>Aruba ClearPass</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>PCI DSS 3.2.1 Requirement 1.3</td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                                <td><span class="badge badge-warning">⚠ Partial</span></td>
                                                <td><span class="badge badge-warning">⚠ Partial</span></td>
                                            </tr>
                                            <tr>
                                                <td>PCI DSS 3.2.1 Requirement 7.1</td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                            </tr>
                                            <tr>
                                                <td>PCI DSS 3.2.1 Requirement 8.1</td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                            </tr>
                                            <tr>
                                                <td>PCI DSS 3.2.1 Requirement 10.1</td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                                <td><span class="badge badge-warning">⚠ Partial</span></td>
                                                <td><span class="badge badge-warning">⚠ Partial</span></td>
                                            </tr>
                                            <tr>
                                                <td>NIST 800-53 AC-1</td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                            </tr>
                                            <tr>
                                                <td>NIST 800-53 AC-17</td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                                <td><span class="badge badge-warning">⚠ Partial</span></td>
                                                <td><span class="badge badge-warning">⚠ Partial</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Sensitivity Analysis Panel -->
                        <div id="technical-sensitivity" class="results-panel">
                            <h2>Sensitivity Analysis</h2>
                            
                            <div class="sensitivity-controls">
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label for="sensitivity-variable" class="form-label">Variable to Analyze</label>
                                        <select id="sensitivity-variable" class="form-select">
                                            <option value="deviceCount">Device Count</option>
                                            <option value="cost">Cost per Device</option>
                                            <option value="fte">FTE Requirements</option>
                                            <option value="implementation">Implementation Time</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="sensitivity-min" class="form-label">Min Value</label>
                                        <input type="number" id="sensitivity-min" class="form-control">
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="sensitivity-max" class="form-label">Max Value</label>
                                        <input type="number" id="sensitivity-max" class="form-control">
                                    </div>
                                </div>
                                <button id="run-sensitivity" class="btn btn-primary">
                                    Run Sensitivity Analysis
                                </button>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Sensitivity Analysis Results</h3>
                                <div class="chart-wrapper">
                                    <canvas id="sensitivity-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Break-even Analysis</h3>
                                <div class="chart-wrapper">
                                    <canvas id="breakeven-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>FTE Impact Analysis</h3>
                                <div class="chart-wrapper">
                                    <canvas id="fte-impact-chart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <footer class="app-footer">
            <div class="footer-content">
                <div class="footer-copyright">
                    &copy; 2025 Portnox. All rights reserved.
                </div>
                <div class="footer-links">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Service</a>
                    <a href="#contact">Contact Us</a>
                    <a href="#support">Support</a>
                </div>
                <div class="footer-social">
                    <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
                </div>
            </div>
        </footer>
    </div>
    
    <!-- Modals -->
    <div id="help-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Help & Documentation</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <!-- Help content -->
            </div>
        </div>
    </div>
    
    <!-- Error Container -->
    <div id="error-container"></div>
    
    <!-- Loading Overlay -->
    <div id="loading-overlay" class="loading-overlay">
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Calculating...</p>
        </div>
    </div>
    
    <!-- Toast Notifications Container -->
    <div id="toast-container" class="toast-container"></div>
    
    <!-- JavaScript Libraries -->
    <script src="libs/js/chart.min.js"></script>
    <script src="libs/js/chartjs-plugin-datalabels.min.js"></script>
    <script src="libs/js/d3.min.js"></script>
    <script src="libs/js/gsap.min.js"></script>
    <script src="libs/js/ScrollTrigger.min.js"></script>
    <script src="libs/js/countUp.min.js"></script>
    <script src="libs/js/aos.js"></script>
    <script src="libs/js/particles.min.js"></script>
    <script src="libs/js/lodash.min.js"></script>
    <script src="libs/js/jspdf.umd.min.js"></script>
    <script src="libs/js/jspdf.plugin.autotable.min.js"></script>
    
    <!-- Core JavaScript -->
    <script src="js/core/helpers.js"></script>
    <script src="js/core/dom.js"></script>
    <script src="js/core/validation.js"></script>
    
    <!-- New Components -->
    <script src="js/components/sidebar-controller.js"></script>
    <script src="js/components/view-controller.js"></script>
    <script src="js/components/vendor-controller.js"></script>
    
    <!-- Existing Components -->
    <script src="js/managers/loading.js"></script>
    <script src="js/managers/notification.js"></script>
    <script src="js/managers/state.js"></script>
    <script src="js/components/enhanced-ui.js"></script>
    <script src="js/components/calculator.js"></script>
    <script src="js/components/sensitivity.js"></script>
    <script src="js/components/charts.js"></script>
    <script src="js/data/enhanced-vendors.js"></script>
    <script src="js/data/industry.js"></script>
    <script src="js/data/compliance.js"></script>
    <script src="js/data/industry-compliance.js"></script>
    <script src="js/charts/enhanced-charts.js"></script>
    <script src="js/reports/generator.js"></script>
    <script src="js/reports/enhanced-generator.js"></script>
    
    <!-- Main Application -->
    <script src="js/app-controller.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
EOF
echo "Updated index.html with new UI"

echo "UI structure update complete."
echo "To update the chart functionality and data models, run the next script."
read -p "Press any key to continue..." -n1 -s
echo
echo "==============================================="
#!/bin/bash

echo "Starting Portnox Total Cost Analyzer Data & Charts Update"
echo "========================================================="
echo "This script will update data models and chart functionality."

# Create vendor data module
echo "Creating vendor data module..."
mkdir -p ./js/data
cat > ./js/data/vendor-data.js << 'EOF'
/**
 * Vendor Data Module
 * Contains data for all NAC vendors for comparison
 */
const VendorData = {
  // Vendor display names
  vendorNames: {
    'portnox': 'Portnox Cloud',
    'cisco': 'Cisco ISE',
    'aruba': 'Aruba ClearPass',
    'forescout': 'Forescout',
    'fortinac': 'FortiNAC',
    'juniper': 'Juniper Mist',
    'securew2': 'SecureW2',
    'nps': 'Microsoft NPS',
    'arista': 'Arista Agni',
    'foxpass': 'Foxpass',
    'noNac': 'No NAC Solution'
  },
  
  // Vendor colors for charts
  vendorColors: {
    'portnox': '#36B37E',
    'cisco': '#0D5BD9',
    'aruba': '#A44CFE',
    'forescout': '#FF8C3B',
    'fortinac': '#0088FE',
    'juniper': '#7E57C2',
    'securew2': '#00ACC1',
    'nps': '#00A8E8',
    'arista': '#8D99AE',
    'foxpass': '#EC7063',
    'noNac': '#FF5252'
  },
  
  // TCO data for 3 years (Year 1, Year 2, Year 3) in USD
  tcoData: {
    'portnox': [180000, 150000, 145000],
    'cisco': [350000, 250000, 260000],
    'aruba': [320000, 240000, 250000],
    'forescout': [310000, 230000, 240000],
    'fortinac': [290000, 220000, 230000],
    'juniper': [300000, 230000, 235000],
    'securew2': [200000, 180000, 170000],
    'nps': [150000, 170000, 190000],
    'noNac': [50000, 60000, 70000]
  },
  
  // Cumulative cost over time (Initial, Month 3, Month 6, Month 9, Year 1, Year 2, Year 3)
  cumulativeData: {
    'portnox': [70000, 90000, 110000, 130000, 150000, 300000, 445000],
    'cisco': [120000, 180000, 240000, 310000, 350000, 600000, 860000],
    'aruba': [100000, 160000, 220000, 290000, 320000, 560000, 810000],
    'forescout': [110000, 170000, 230000, 280000, 310000, 540000, 780000],
    'fortinac': [100000, 150000, 210000, 270000, 290000, 510000, 740000],
    'juniper': [110000, 165000, 220000, 275000, 300000, 530000, 765000],
    'securew2': [80000, 110000, 140000, 170000, 200000, 380000, 550000],
    'nps': [70000, 90000, 110000, 130000, 150000, 320000, 510000],
    'noNac': [10000, 20000, 30000, 40000, 50000, 110000, 180000]
  },
  
  // Cost breakdown by category (percentages)
  breakdownData: {
    'portnox': [
      { name: 'Subscription', value: 70 },
      { name: 'Implementation', value: 15 },
      { name: 'Support', value: 10 },
      { name: 'Training', value: 5 }
    ],
    'cisco': [
      { name: 'Hardware', value: 35 },
      { name: 'Software', value: 25 },
      { name: 'Implementation', value: 20 },
      { name: 'Maintenance', value: 15 },
      { name: 'Training', value: 5 }
    ],
    'aruba': [
      { name: 'Hardware', value: 30 },
      { name: 'Software', value: 28 },
      { name: 'Implementation', value: 22 },
      { name: 'Maintenance', value: 13 },
      { name: 'Training', value: 7 }
    ],
    'forescout': [
      { name: 'Hardware', value: 30 },
      { name: 'Software', value: 30 },
      { name: 'Implementation', value: 20 },
      { name: 'Maintenance', value: 15 },
      { name: 'Training', value: 5 }
    ],
    'fortinac': [
      { name: 'Hardware', value: 25 },
      { name: 'Software', value: 30 },
      { name: 'Implementation', value: 25 },
      { name: 'Maintenance', value: 15 },
      { name: 'Training', value: 5 }
    ]
  },
  
  // Implementation data (days per phase: Planning, Installation, Configuration, Testing, Training, Deployment)
  implementationData: {
    'portnox': [10, 5, 15, 10, 5, 10],
    'cisco': [30, 45, 60, 30, 20, 45],
    'aruba': [25, 40, 55, 25, 15, 40],
    'forescout': [20, 40, 50, 25, 15, 40],
    'fortinac': [25, 35, 45, 20, 15, 30],
    'juniper': [20, 30, 45, 25, 15, 35],
    'securew2': [15, 10, 20, 15, 10, 15],
    'nps': [15, 15, 30, 20, 10, 20]
  },
  
  // Feature scores (0-100) for different categories
  // Categories: Cloud Support, API Integration, Scalability, Security, User Experience, Zero Trust, Mobile Support
  featureData: {
    'portnox': [100, 90, 95, 95, 90, 100, 90],
    'cisco': [50, 60, 70, 80, 60, 40, 50],
    'aruba': [60, 70, 75, 85, 65, 45, 65],
    'forescout': [55, 75, 70, 90, 70, 50, 60],
    'fortinac': [50, 65, 75, 80, 60, 40, 55],
    'juniper': [65, 70, 75, 80, 75, 50, 70],
    'securew2': [90, 75, 85, 75, 80, 70, 85],
    'nps': [30, 40, 65, 60, 40, 30, 30],
    'noNac': [0, 0, 0, 10, 0, 0, 0]
  },
  
  // Compliance coverage scores (0-100) for different frameworks
  // Frameworks: NIST, ISO 27001, HIPAA, PCI DSS, GDPR
  complianceData: {
    'portnox': [95, 90, 100, 95, 85],
    'cisco': [70, 65, 60, 75, 50],
    'aruba': [75, 70, 65, 80, 60],
    'forescout': [65, 60, 70, 75, 55],
    'fortinac': [60, 55, 65, 70, 50],
    'juniper': [65, 60, 70, 75, 55],
    'securew2': [80, 75, 85, 80, 70],
    'nps': [45, 40, 50, 55, 35],
    'noNac': [10, 10, 10, 10, 10]
  },
  
  // ROI data over time (Year 1, Year 2, Year 3) in USD
  roiData: {
    'portnox': [20000, 150000, 280000],
    'cisco': [-30000, 20000, 75000],
    'aruba': [-20000, 30000, 85000],
    'forescout': [-25000, 25000, 80000],
    'fortinac': [-15000, 35000, 90000],
    'juniper': [-20000, 30000, 85000],
    'securew2': [10000, 100000, 200000],
    'nps': [0, 50000, 100000],
    'noNac': [-100000, -150000, -200000]
  },
  
  // Risk scores (lower is better) for different categories
  // Categories: Breach Risk, Compliance, Visibility, Management, Uptime
  riskData: {
    'portnox': [30, 20, 15, 25, 10],
    'cisco': [70, 60, 55, 65, 40],
    'aruba': [65, 55, 50, 60, 35],
    'forescout': [60, 50, 40, 55, 30],
    'fortinac': [65, 55, 45, 60, 35],
    'juniper': [60, 50, 45, 55, 30],
    'securew2': [40, 30, 35, 40, 25],
    'nps': [80, 70, 75, 65, 50],
    'noNac': [100, 90, 95, 90, 80]
  },
  
  // Detailed cost components for TCO calculator
  costComponents: {
    'portnox': {
      hardware: 0,
      software: 300000,
      implementation: 30000,
      maintenance: 45000,
      personnel: 54000
    },
    'cisco': {
      hardware: 175000,
      software: 250000,
      implementation: 120000,
      maintenance: 180000,
      personnel: 180000
    },
    'aruba': {
      hardware: 160000,
      software: 240000,
      implementation: 110000,
      maintenance: 170000,
      personnel: 162000
    },
    'forescout': {
      hardware: 150000,
      software: 235000,
      implementation: 105000,
      maintenance: 160000,
      personnel: 144000
    },
    'fortinac': {
      hardware: 130000,
      software: 200000,
      implementation: 100000,
      maintenance: 150000,
      personnel: 144000
    },
    'juniper': {
      hardware: 140000,
      software: 220000,
      implementation: 105000,
      maintenance: 155000,
      personnel: 144000
    },
    'securew2': {
      hardware: 0,
      software: 250000,
      implementation: 45000,
      maintenance: 60000,
      personnel: 72000
    },
    'nps': {
      hardware: 50000,
      software: 0,
      implementation: 90000,
      maintenance: 45000,
      personnel: 216000
    },
    'noNac': {
      hardware: 0,
      software: 0,
      implementation: 0,
      maintenance: 0,
      personnel: 180000
    }
  },
  
  // Implementation timelines in days
  implementationTimelines: {
    'portnox': 45,
    'cisco': 180,
    'aruba': 160,
    'forescout': 150,
    'fortinac': 140,
    'juniper': 145,
    'securew2': 60,
    'nps': 90,
    'noNac': 0
  },
  
  // FTE requirements (full-time equivalent)
  fteRequirements: {
    'portnox': 0.15,
    'cisco': 0.5,
    'aruba': 0.45,
    'forescout': 0.4,
    'fortinac': 0.4,
    'juniper': 0.4,
    'securew2': 0.2,
    'nps': 0.6,
    'noNac': 0.5
  },
  
  // Value drivers for ROI analysis
  valueDrivers: {
    'portnox': [
      { name: 'Cost Reduction', value: 40 },
      { name: 'Operational Efficiency', value: 25 },
      { name: 'Risk Mitigation', value: 20 },
      { name: 'Agility', value: 15 }
    ],
    'cisco': [
      { name: 'Cost Reduction', value: 20 },
      { name: 'Operational Efficiency', value: 15 },
      { name: 'Risk Mitigation', value: 45 },
      { name: 'Agility', value: 20 }
    ],
    'aruba': [
      { name: 'Cost Reduction', value: 25 },
      { name: 'Operational Efficiency', value: 20 },
      { name: 'Risk Mitigation', value: 40 },
      { name: 'Agility', value: 15 }
    ]
  },
  
  // Benefit categories with estimated values
  benefitDetails: {
    'portnox': [
      { category: 'Cost Avoidance', description: 'Hardware, implementation, and maintenance savings', value: 400000 },
      { category: 'Operational Efficiency', description: 'Reduced FTE requirements for management', value: 126000 },
      { category: 'Faster Deployment', description: 'Accelerated time-to-value and productivity', value: 75000 },
      { category: 'Security Improvement', description: 'Reduced breach risk and compliance violations', value: 125000 },
      { category: 'Future-Proofing', description: 'Automatic updates and scalability benefits', value: 50000 }
    ]
  },
  
  // Feature details with comparison data
  featureDetails: {
    'Cloud-Based Architecture': {
      'portnox': { value: 'Full', score: 100 },
      'cisco': { value: 'Limited', score: 50 },
      'aruba': { value: 'Limited', score: 60 },
      'forescout': { value: 'Limited', score: 55 },
      'fortinac': { value: 'Limited', score: 50 },
      'juniper': { value: 'Limited', score: 65 },
      'securew2': { value: 'Full', score: 90 },
      'nps': { value: 'None', score: 30 },
      'noNac': { value: 'None', score: 0 }
    },
    'Zero Trust Security': {
      'portnox': { value: 'Full', score: 100 },
      'cisco': { value: 'Partial', score: 40 },
      'aruba': { value: 'Partial', score: 45 },
      'forescout': { value: 'Partial', score: 50 },
      'fortinac': { value: 'Partial', score: 40 },
      'juniper': { value: 'Partial', score: 50 },
      'securew2': { value: 'Partial', score: 70 },
      'nps': { value: 'Limited', score: 30 },
      'noNac': { value: 'None', score: 0 }
    },
    'Multi-Factor Authentication': {
      'portnox': { value: 'Yes', score: 100 },
      'cisco': { value: 'Yes', score: 100 },
      'aruba': { value: 'Yes', score: 100 },
      'forescout': { value: 'Yes', score: 100 },
      'fortinac': { value: 'Yes', score: 100 },
      'juniper': { value: 'Yes', score: 100 },
      'securew2': { value: 'Yes', score: 100 },
      'nps': { value: 'Limited', score: 60 },
      'noNac': { value: 'No', score: 0 }
    },
    'Scalability': {
      'portnox': { value: 'Simple', score: 95 },
      'cisco': { value: 'Complex', score: 70 },
      'aruba': { value: 'Complex', score: 75 },
      'forescout': { value: 'Complex', score: 70 },
      'fortinac': { value: 'Moderate', score: 75 },
      'juniper': { value: 'Moderate', score: 75 },
      'securew2': { value: 'Simple', score: 85 },
      'nps': { value: 'Limited', score: 65 },
      'noNac': { value: 'None', score: 0 }
    }
  },
  
  // Calculate TCO based on organization parameters
  calculateTCO: function(vendor, params) {
    const { deviceCount, yearsToProject, fteCost, fteAllocation, maintenancePercentage } = params;
    const baseTCO = this.costComponents[vendor];
    
    // Scale costs based on device count
    const scaleFactor = deviceCount / 2500; // Base calculations are for 2500 devices
    
    let hardware = baseTCO.hardware * scaleFactor;
    let software = baseTCO.software * scaleFactor;
    let implementation = baseTCO.implementation * (0.5 + (0.5 * scaleFactor)); // Implementation scales non-linearly
    let maintenance = baseTCO.maintenance * scaleFactor * (maintenancePercentage / 18); // Adjust for maintenance percentage
    let personnel = baseTCO.personnel * (fteCost / 120000) * (fteAllocation / 50); // Adjust for FTE cost and allocation
    
    // Special case for Portnox with volume discount
    if (vendor === 'portnox' && params.portnoxDiscount) {
      software = software * (1 - (params.portnoxDiscount / 100));
    }
    
    // Adjust for years to project
    if (yearsToProject !== 3) {
      const yearlyFactor = yearsToProject / 3;
      maintenance = maintenance * yearlyFactor;
      personnel = personnel * yearlyFactor;
      software = software * yearlyFactor;
    }
    
    return {
      hardware,
      software,
      implementation,
      maintenance,
      personnel,
      total: hardware + software + implementation + maintenance + personnel
    };
  }
};

// Make available globally
window.VendorData = VendorData;
EOF
echo "Created vendor-data.js"

# Create chart controller
echo "Creating chart controller module..."
mkdir -p ./js/charts
cat > ./js/charts/chart-controller.js << 'EOF'
/**
 * Chart Controller
 * Manages all chart creation and updates throughout the application
 */
class ChartController {
  constructor() {
    this.charts = {};
    this.chartDefaults = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 15
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
                label += new Intl.NumberFormat('en-US', { 
                  style: 'currency', 
                  currency: 'USD',
                  maximumFractionDigits: 0 
                }).format(context.parsed.y);
              }
              return label;
            }
          }
        }
      }
    };
    
    // Register chart.js plugins
    Chart.register(ChartDataLabels);
    
    // Set up event listeners
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Listen for calculation events
    document.addEventListener('calculateResults', (e) => {
      this.updateAllCharts(e.detail);
    });
    
    // Listen for vendor selection changes
    document.addEventListener('vendorsChanged', () => {
      if (window.vendorController) {
        const selectedVendors = window.vendorController.getSelectedVendors();
        const configState = window.configController ? window.configController.getState() : null;
        
        this.updateChartsWithVendors(selectedVendors, configState);
      }
    });
    
    // Listen for view changes to redraw charts
    document.addEventListener('viewChanged', () => {
      // Trigger resize to fix chart display
      window.setTimeout(() => {
        Object.values(this.charts).forEach(chart => {
          if (chart) chart.resize();
        });
      }, 100);
    });
    
    // Listen for window resize to redraw charts
    window.addEventListener('resize', () => {
      // Debounce resize event
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        Object.values(this.charts).forEach(chart => {
          if (chart) chart.resize();
        });
      }, 250);
    });
  }
  
  // Initialize all charts
  initializeCharts() {
    this.initTcoComparisonChart();
    this.initCumulativeCostChart();
    this.initDetailedTcoChart();
    this.initRoiChart();
    this.initValueDriversChart();
    this.initRiskAnalysisChart();
    this.initBreachImpactChart();
    this.initFeatureRadarChart();
    this.initFeatureStrengthChart();
    this.initImplementationTimelineChart();
    this.initResourceRequirementsChart();
    this.initComplianceRadarChart();
    this.initIndustryComplianceChart();
    this.initSensitivityChart();
    this.initBreakevenChart();
    this.initFteImpactChart();
    this.initArchitectureChart();
  }
  
  // Update all charts with new data
  updateAllCharts(data) {
    Object.keys(this.charts).forEach(chartId => {
      if (this.charts[chartId]) {
        const updateMethod = `update${chartId.replace(/-/g, '')}Chart`;
        if (typeof this[updateMethod] === 'function') {
          this[updateMethod](data);
        }
      }
    });
  }
  
  // Update charts based on selected vendors
  updateChartsWithVendors(selectedVendors, configState) {
    if (!selectedVendors || selectedVendors.length === 0) return;
    
    // Prepare data for charts
    const chartData = this.prepareChartData(selectedVendors, configState);
    
    // Update each chart with the new data
    Object.keys(this.charts).forEach(chartId => {
      if (this.charts[chartId]) {
        const updateMethod = `update${chartId.replace(/-/g, '')}Chart`;
        if (typeof this[updateMethod] === 'function') {
          this[updateMethod](chartData);
        }
      }
    });
  }
  
  // Prepare data for all charts based on selected vendors and configuration
  prepareChartData(selectedVendors, configState) {
    if (!window.VendorData) return {};
    
    const data = {
      selectedVendors,
      configState,
      tcoData: {},
      cumulativeData: {},
      breakdownData: {},
      implementationData: {},
      featureData: {},
      complianceData: {},
      roiData: {},
      riskData: {}
    };
    
    // Prepare data for each selected vendor
    selectedVendors.forEach(vendor => {
      // Get raw data from VendorData
      data.tcoData[vendor] = VendorData.tcoData[vendor];
      data.cumulativeData[vendor] = VendorData.cumulativeData[vendor];
      data.breakdownData[vendor] = VendorData.breakdownData[vendor];
      data.implementationData[vendor] = VendorData.implementationData[vendor];
      data.featureData[vendor] = VendorData.featureData[vendor];
      data.complianceData[vendor] = VendorData.complianceData[vendor];
      data.roiData[vendor] = VendorData.roiData[vendor];
      data.riskData[vendor] = VendorData.riskData[vendor];
      
      // Apply configuration adjustments if available
      if (configState) {
        // Calculate TCO based on configuration
        const tcoParams = {
          deviceCount: configState.deviceCount || 2500,
          yearsToProject: configState.yearsToProject || 3,
          fteCost: configState.fteCost || 120000,
          fteAllocation: configState.fteAllocation || 50,
          maintenancePercentage: configState.maintenancePercentage || 18,
          portnoxDiscount: vendor === 'portnox' ? (configState.portnoxDiscount || 0) : 0
        };
        
        const calculatedTCO = VendorData.calculateTCO(vendor, tcoParams);
        data.calculatedTCO = data.calculatedTCO || {};
        data.calculatedTCO[vendor] = calculatedTCO;
      }
    });
    
    return data;
  }
  
  // TCO Comparison Chart
  initTcoComparisonChart() {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx) return;
    
    const timeLabels = ['Year 1', 'Year 2', 'Year 3'];
    
    this.charts['tco-comparison-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: timeLabels,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cost (USD)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: '3-Year TCO Comparison',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }
  
  updateTcoComparisonChart(data) {
    const chart = this.charts['tco-comparison-chart'];
    if (!chart) return;
    
    const timeLabels = ['Year 1', 'Year 2', 'Year 3'];
    const datasets = [];
    
    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      if (data.tcoData[vendor]) {
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: data.tcoData[vendor],
          backgroundColor: VendorData.vendorColors[vendor],
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 1
        });
      }
    });
    
    chart.data.labels = timeLabels;
    chart.data.datasets = datasets;
    chart.update();
  }
  
  // Cumulative Cost Chart
  initCumulativeCostChart() {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx) return;
    
    const timeLabels = ['Initial', 'Month 3', 'Month 6', 'Month 9', 'Year 1', 'Year 2', 'Year 3'];
    
    this.charts['cumulative-cost-chart'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeLabels,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cumulative Cost (USD)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Cumulative Cost Over Time',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }
  
  updateCumulativeCostChart(data) {
    const chart = this.charts['cumulative-cost-chart'];
    if (!chart) return;
    
    const timeLabels = ['Initial', 'Month 3', 'Month 6', 'Month 9', 'Year 1', 'Year 2', 'Year 3'];
    const datasets = [];
    
    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      if (data.cumulativeData[vendor]) {
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: data.cumulativeData[vendor],
          backgroundColor: 'transparent',
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 3,
          pointRadius: 4,
          tension: 0.2
        });
      }
    });
    
    chart.data.labels = timeLabels;
    chart.data.datasets = datasets;
    chart.update();
  }
  
  // Detailed TCO Chart
  initDetailedTcoChart() {
    const ctx = document.getElementById('detailed-tco-chart');
    if (!ctx) return;
    
    const categories = ['Hardware', 'Software', 'Implementation', 'Maintenance', 'Personnel'];
    
    this.charts['detailed-tco-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: categories,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cost (USD)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Detailed TCO Breakdown',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }
  
  updateDetailedTcoChart(data) {
    const chart = this.charts['detailed-tco-chart'];
    if (!chart) return;
    
    const categories = ['Hardware', 'Software', 'Implementation', 'Maintenance', 'Personnel'];
    const datasets = [];
    
    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      const vendorData = [];
      
      if (data.calculatedTCO && data.calculatedTCO[vendor]) {
        // Use calculated TCO if available
        const tco = data.calculatedTCO[vendor];
        vendorData.push(tco.hardware);
        vendorData.push(tco.software);
        vendorData.push(tco.implementation);
        vendorData.push(tco.maintenance);
        vendorData.push(tco.personnel);
      } else if (VendorData.costComponents[vendor]) {
        // Use default cost components if calculated TCO not available
        const costs = VendorData.costComponents[vendor];
        vendorData.push(costs.hardware);
        vendorData.push(costs.software);
        vendorData.push(costs.implementation);
        vendorData.push(costs.maintenance);
        vendorData.push(costs.personnel);
      }
      
      if (vendorData.length > 0) {
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: vendorData,
          backgroundColor: VendorData.vendorColors[vendor],
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 1
        });
      }
    });
    
    chart.data.labels = categories;
    chart.data.datasets = datasets;
    chart.update();
  }
  
  // ROI Chart
  initRoiChart() {
    const ctx = document.getElementById('roi-chart');
    if (!ctx) return;
    
    const timeLabels = ['Year 1', 'Year 2', 'Year 3'];
    
    this.charts['roi-chart'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeLabels,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            title: {
              display: true,
              text: 'ROI Value (USD)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'ROI Over Time',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }
  
  updateRoiChart(data) {
    const chart = this.charts['roi-chart'];
    if (!chart) return;
    
    const timeLabels = ['Year 1', 'Year 2', 'Year 3'];
    const datasets = [];
    
    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      if (data.roiData[vendor]) {
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: data.roiData[vendor],
          backgroundColor: `${VendorData.vendorColors[vendor]}40`,
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 3,
          pointRadius: 4,
          tension: 0.2,
          fill: true
        });
      }
    });
    
    chart.data.labels = timeLabels;
    chart.data.datasets = datasets;
    chart.update();
    
    // Update metrics based on ROI data
    this.updateRoiMetrics(data);
  }
  
  updateRoiMetrics(data) {
    // Update ROI metrics if Portnox is selected
    if (data.selectedVendors.includes('portnox') && data.roiData['portnox']) {
      const portnoxRoi = data.roiData['portnox'];
      const threeYearRoi = portnoxRoi[2];
      const initialInvestment = data.calculatedTCO && data.calculatedTCO['portnox'] ? 
        data.calculatedTCO['portnox'].total : VendorData.costComponents['portnox'].total;
      
      // Calculate ROI percentage
      const roiPercentage = Math.round((threeYearRoi / initialInvestment) * 100);
      
      // Update metrics display
      const roiElement = document.getElementById('three-year-roi');
      if (roiElement) {
        roiElement.textContent = `${roiPercentage}%`;
      }
      
      // Update annual savings
      const annualSavingsElement = document.getElementById('annual-savings');
      if (annualSavingsElement && data.selectedVendors.includes('cisco')) {
        const portnoxTotal = initialInvestment;
        const ciscoTotal = data.calculatedTCO && data.calculatedTCO['cisco'] ? 
          data.calculatedTCO['cisco'].total : VendorData.costComponents['cisco'].total;
        
        const annualSavings = Math.round((ciscoTotal - portnoxTotal) / 3);
        annualSavingsElement.textContent = `$${annualSavings.toLocaleString()}`;
      }
    }
  }
  
  // Value Drivers Chart
  initValueDriversChart() {
    const ctx = document.getElementById('value-drivers-chart');
    if (!ctx) return;
    
    this.charts['value-drivers-chart'] = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [
            '#36B37E', // Green
            '#0052CC', // Blue
            '#6554C0', // Purple
            '#FF5630'  // Red
          ],
          borderWidth: 1
        }]
      },
      options: {
        ...this.chartDefaults,
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Value Drivers',
            padding: {
              top: 10,
              bottom: 20
            }
          },
          datalabels: {
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map(data => {
                sum += data;
              });
              let percentage = (value * 100 / sum).toFixed(0) + "%";
              return percentage;
            },
            color: '#fff',
            font: {
              weight: 'bold'
            }
          }
        }
      }
    });
  }
  
  updateValueDriversChart(data) {
    const chart = this.charts['value-drivers-chart'];
    if (!chart) return;
    
    // Default to Portnox value drivers
    const vendor = data.selectedVendors.includes('portnox') ? 'portnox' : data.selectedVendors[0];
    
    if (VendorData.valueDrivers[vendor]) {
      const valueDrivers = VendorData.valueDrivers[vendor];
      const labels = valueDrivers.map(driver => driver.name);
      const values = valueDrivers.map(driver => driver.value);
      
      chart.data.labels = labels;
      chart.data.datasets[0].data = values;
      chart.update();
    }
  }
  
  // Risk Analysis Chart
  initRiskAnalysisChart() {
    const ctx = document.getElementById('risk-analysis-chart');
    if (!ctx) return;
    
    const riskLabels = ['Breach Risk', 'Compliance', 'Visibility', 'Management', 'Uptime'];
    
    this.charts['risk-analysis-chart'] = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: riskLabels,
        datasets: []
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Risk Assessment Analysis',
            padding: {
              top: 10,
              bottom: 20
            }
          },
          subtitle: {
            display: true,
            text: 'Lower scores indicate better risk mitigation',
            padding: {
              bottom: 10
            }
          }
        }
      }
    });
  }
  
  updateRiskAnalysisChart(data) {
    const chart = this.charts['risk-analysis-chart'];
    if (!chart) return;
    
    const riskLabels = ['Breach Risk', 'Compliance', 'Visibility', 'Management', 'Uptime'];
    const datasets = [];
    
    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      if (data.riskData[vendor]) {
#!/bin/bash

echo "Continuing with chart controller implementation..."

cat >> ./js/charts/chart-controller.js << 'EOF'
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: data.riskData[vendor],
          backgroundColor: `${VendorData.vendorColors[vendor]}40`,
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 2,
          pointRadius: 3,
          fill: true
        });
      }
    });

    chart.data.labels = riskLabels;
    chart.data.datasets = datasets;
    chart.update();

    // Update risk metrics based on data
    this.updateRiskMetrics(data);
  }

  updateRiskMetrics(data) {
    // Update risk metrics if Portnox is selected
    if (data.selectedVendors.includes('portnox') && data.riskData['portnox']) {
      // Calculate risk reduction if Cisco is also selected
      if (data.selectedVendors.includes('cisco') && data.riskData['cisco']) {
        const portnoxRiskAvg = data.riskData['portnox'].reduce((a, b) => a + b, 0) / data.riskData['portnox'].length;
        const ciscoRiskAvg = data.riskData['cisco'].reduce((a, b) => a + b, 0) / data.riskData['cisco'].length;

        // Calculate percentage reduction
        const riskReduction = Math.round(((ciscoRiskAvg - portnoxRiskAvg) / ciscoRiskAvg) * 100);

        // Update risk reduction metric
        const riskReductionElement = document.getElementById('risk-reduction');
        if (riskReductionElement) {
          riskReductionElement.textContent = `${riskReduction}%`;
        }
      }
    }
  }

  // Breach Impact Chart
  initBreachImpactChart() {
    const ctx = document.getElementById('breach-impact-chart');
    if (!ctx) return;

    const impactCategories = ['Data Breach', 'Compliance Violation', 'Operational Disruption', 'Reputational Damage'];

    this.charts['breach-impact-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: impactCategories,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Estimated Cost (USD)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Breach Impact Analysis',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateBreachImpactChart(data) {
    const chart = this.charts['breach-impact-chart'];
    if (!chart) return;

    const impactCategories = ['Data Breach', 'Compliance Violation', 'Operational Disruption', 'Reputational Damage'];
    const datasets = [];

    // Create datasets for "No NAC" and Portnox (if selected)
    if (data.selectedVendors.includes('noNac')) {
      datasets.push({
        label: 'No NAC Solution',
        data: [750000, 500000, 300000, 450000],
        backgroundColor: VendorData.vendorColors['noNac'],
        borderColor: VendorData.vendorColors['noNac'],
        borderWidth: 1
      });
    }

    if (data.selectedVendors.includes('portnox')) {
      datasets.push({
        label: 'With Portnox',
        data: [150000, 50000, 75000, 100000],
        backgroundColor: VendorData.vendorColors['portnox'],
        borderColor: VendorData.vendorColors['portnox'],
        borderWidth: 1
      });
    } else if (data.selectedVendors.includes('cisco')) {
      datasets.push({
        label: 'With Cisco ISE',
        data: [300000, 150000, 125000, 200000],
        backgroundColor: VendorData.vendorColors['cisco'],
        borderColor: VendorData.vendorColors['cisco'],
        borderWidth: 1
      });
    }

    chart.data.labels = impactCategories;
    chart.data.datasets = datasets;
    chart.update();
  }

  // Feature Radar Chart
  initFeatureRadarChart() {
    const ctx = document.getElementById('feature-radar-chart');
    if (!ctx) return;

    const featureLabels = ['Cloud Support', 'API Integration', 'Scalability', 'Security', 'User Experience', 'Zero Trust', 'Mobile Support'];

    this.charts['feature-radar-chart'] = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: featureLabels,
        datasets: []
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Feature Capability Comparison',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateFeatureRadarChart(data) {
    const chart = this.charts['feature-radar-chart'];
    if (!chart) return;

    const featureLabels = ['Cloud Support', 'API Integration', 'Scalability', 'Security', 'User Experience', 'Zero Trust', 'Mobile Support'];
    const datasets = [];

    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      if (data.featureData[vendor]) {
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: data.featureData[vendor],
          backgroundColor: `${VendorData.vendorColors[vendor]}40`,
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 2,
          pointRadius: 3,
          fill: true
        });
      }
    });

    chart.data.labels = featureLabels;
    chart.data.datasets = datasets;
    chart.update();
  }

  // Feature Strength Chart
  initFeatureStrengthChart() {
    const ctx = document.getElementById('feature-strength-chart');
    if (!ctx) return;

    const features = ['Cloud Architecture', 'Zero Trust', 'Implementation Ease', 'Management Overhead'];

    this.charts['feature-strength-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: features,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Strength Score'
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Feature Strength Analysis',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateFeatureStrengthChart(data) {
    const chart = this.charts['feature-strength-chart'];
    if (!chart) return;

    const features = ['Cloud Architecture', 'Zero Trust', 'Implementation Ease', 'Management Overhead'];
    const datasets = [];

    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      // Derived scores for each feature based on existing feature data
      const cloudScore = vendor === 'portnox' ? 100 : (vendor === 'securew2' ? 90 : 50);
      const zeroTrustScore = vendor === 'portnox' ? 100 : (vendor === 'securew2' ? 70 : 40);
      const easeScore = vendor === 'portnox' ? 90 : (vendor === 'securew2' ? 80 : 40);
      const mgmtScore = vendor === 'portnox' ? 85 : (vendor === 'securew2' ? 75 : 45);

      datasets.push({
        label: VendorData.vendorNames[vendor],
        data: [cloudScore, zeroTrustScore, easeScore, mgmtScore],
        backgroundColor: VendorData.vendorColors[vendor],
        borderColor: VendorData.vendorColors[vendor],
        borderWidth: 1
      });
    });

    chart.data.labels = features;
    chart.data.datasets = datasets;
    chart.update();
  }

  // Implementation Timeline Chart
  initImplementationTimelineChart() {
    const ctx = document.getElementById('implementation-timeline-chart');
    if (!ctx) return;

    const phases = ['Planning', 'Installation', 'Configuration', 'Testing', 'Training', 'Deployment'];

    this.charts['implementation-timeline-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: phases,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Days'
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Implementation Timeline Comparison',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateImplementationTimelineChart(data) {
    const chart = this.charts['implementation-timeline-chart'];
    if (!chart) return;

    const phases = ['Planning', 'Installation', 'Configuration', 'Testing', 'Training', 'Deployment'];
    const datasets = [];

    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      if (data.implementationData[vendor]) {
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: data.implementationData[vendor],
          backgroundColor: VendorData.vendorColors[vendor],
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 1
        });
      }
    });

    chart.data.labels = phases;
    chart.data.datasets = datasets;
    chart.update();

    // Update implementation time metric
    if (data.selectedVendors.includes('portnox')) {
      const implementationTimeElement = document.getElementById('implementation-time');
      if (implementationTimeElement) {
        const portnoxTime = VendorData.implementationTimelines['portnox'];
        implementationTimeElement.textContent = `${portnoxTime} days`;

        // Add comparison if Cisco is selected
        if (data.selectedVendors.includes('cisco')) {
          const ciscoTime = VendorData.implementationTimelines['cisco'];
          const comparisonElement = document.getElementById('implementation-comparison');
          if (comparisonElement) {
            const reduction = Math.round(((ciscoTime - portnoxTime) / ciscoTime) * 100);
            comparisonElement.textContent = `${reduction}% faster than Cisco ISE`;
          }
        }
      }
    }
  }

  // Resource Requirements Chart
  initResourceRequirementsChart() {
    const ctx = document.getElementById('resource-requirements-chart');
    if (!ctx) return;

    const resources = ['Hardware Servers', 'Software Licenses', 'IT Staff (FTE)', 'Installation Time'];

    this.charts['resource-requirements-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: resources,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Relative Requirement'
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Resource Requirements',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateResourceRequirementsChart(data) {
    const chart = this.charts['resource-requirements-chart'];
    if (!chart) return;

    const resources = ['Hardware Servers', 'Software Licenses', 'IT Staff (FTE)', 'Installation Time'];
    const datasets = [];

    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      let resourceData = [];

      if (vendor === 'portnox') {
        resourceData = [0, 100, 30, 25]; // Cloud-based, no hardware
      } else if (vendor === 'securew2') {
        resourceData = [0, 100, 40, 35]; // Cloud-based, no hardware
      } else if (vendor === 'cisco') {
        resourceData = [100, 100, 100, 100]; // Baseline
      } else if (vendor === 'aruba') {
        resourceData = [90, 95, 90, 90];
      } else if (vendor === 'forescout') {
        resourceData = [85, 90, 80, 85];
      } else if (vendor === 'fortinac') {
        resourceData = [75, 85, 80, 80];
      } else if (vendor === 'juniper') {
        resourceData = [80, 90, 80, 80];
      } else if (vendor === 'nps') {
        resourceData = [45, 0, 120, 50]; // Free software, high staff requirements
      } else if (vendor === 'noNac') {
        resourceData = [0, 0, 0, 0]; // No solution
      }

      datasets.push({
        label: VendorData.vendorNames[vendor],
        data: resourceData,
        backgroundColor: VendorData.vendorColors[vendor],
        borderColor: VendorData.vendorColors[vendor],
        borderWidth: 1
      });
    });

    chart.data.labels = resources;
    chart.data.datasets = datasets;
    chart.update();
  }

  // Compliance Radar Chart
  initComplianceRadarChart() {
    const ctx = document.getElementById('compliance-radar-chart');
    if (!ctx) return;

    const complianceLabels = ['NIST', 'ISO 27001', 'HIPAA', 'PCI DSS', 'GDPR'];

    this.charts['compliance-radar-chart'] = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: complianceLabels,
        datasets: []
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Compliance Framework Coverage',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateComplianceRadarChart(data) {
    const chart = this.charts['compliance-radar-chart'];
    if (!chart) return;

    const complianceLabels = ['NIST', 'ISO 27001', 'HIPAA', 'PCI DSS', 'GDPR'];
    const datasets = [];

    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      if (data.complianceData[vendor]) {
        datasets.push({
          label: VendorData.vendorNames[vendor],
          data: data.complianceData[vendor],
          backgroundColor: `${VendorData.vendorColors[vendor]}40`,
          borderColor: VendorData.vendorColors[vendor],
          borderWidth: 2,
          pointRadius: 3,
          fill: true
        });
      }
    });

    chart.data.labels = complianceLabels;
    chart.data.datasets = datasets;
    chart.update();
  }

  // Industry Compliance Chart
  initIndustryComplianceChart() {
    const ctx = document.getElementById('industry-compliance-chart');
    if (!ctx) return;

    const industries = ['Healthcare', 'Financial', 'Education', 'Government', 'Manufacturing', 'Retail'];

    this.charts['industry-compliance-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: industries,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Coverage Score'
            },
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Industry-Specific Compliance',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateIndustryComplianceChart(data) {
    const chart = this.charts['industry-compliance-chart'];
    if (!chart) return;

    const industries = ['Healthcare', 'Financial', 'Education', 'Government', 'Manufacturing', 'Retail'];
    const datasets = [];

    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      let complianceData = [];

      if (vendor === 'portnox') {
        complianceData = [95, 90, 100, 90, 95, 100];
      } else if (vendor === 'cisco') {
        complianceData = [70, 75, 65, 80, 65, 60];
      } else if (vendor === 'aruba') {
        complianceData = [75, 80, 70, 85, 70, 65];
      } else if (vendor === 'forescout') {
        complianceData = [65, 70, 60, 75, 60, 55];
      } else if (vendor === 'fortinac') {
        complianceData = [60, 65, 55, 70, 55, 50];
      } else if (vendor === 'juniper') {
        complianceData = [65, 70, 60, 75, 60, 55];
      } else if (vendor === 'securew2') {
        complianceData = [80, 85, 75, 80, 75, 70];
      } else if (vendor === 'nps') {
        complianceData = [45, 50, 40, 55, 40, 35];
      } else if (vendor === 'noNac') {
        complianceData = [10, 10, 10, 10, 10, 10];
      }

      datasets.push({
        label: VendorData.vendorNames[vendor],
        data: complianceData,
        backgroundColor: VendorData.vendorColors[vendor],
        borderColor: VendorData.vendorColors[vendor],
        borderWidth: 1
      });
    });

    chart.data.labels = industries;
    chart.data.datasets = datasets;
    chart.update();
  }

  // Sensitivity Chart
  initSensitivityChart() {
    const ctx = document.getElementById('sensitivity-chart');
    if (!ctx) return;

    this.charts['sensitivity-chart'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Variable Value'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Total Cost (USD)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Sensitivity Analysis',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });

    // Set up sensitivity analysis controls
    this.setupSensitivityControls();
  }

  setupSensitivityControls() {
    const runButton = document.getElementById('run-sensitivity');
    const variableSelect = document.getElementById('sensitivity-variable');
    const minInput = document.getElementById('sensitivity-min');
    const maxInput = document.getElementById('sensitivity-max');

    if (runButton && variableSelect && minInput && maxInput) {
      // Set default values based on selected variable
      variableSelect.addEventListener('change', () => {
        const variable = variableSelect.value;

        switch (variable) {
          case 'deviceCount':
            minInput.value = '500';
            maxInput.value = '10000';
            break;
          case 'cost':
            minInput.value = '2';
            maxInput.value = '8';
            break;
          case 'fte':
            minInput.value = '0.1';
            maxInput.value = '1.0';
            break;
          case 'implementation':
            minInput.value = '30';
            maxInput.value = '180';
            break;
        }
      });

      // Trigger change event to set initial values
      variableSelect.dispatchEvent(new Event('change'));

      // Run sensitivity analysis
      runButton.addEventListener('click', () => {
        this.runSensitivityAnalysis(
          variableSelect.value,
          parseFloat(minInput.value),
          parseFloat(maxInput.value)
        );
      });
    }
  }

  runSensitivityAnalysis(variable, min, max) {
    const chart = this.charts['sensitivity-chart'];
    if (!chart) return;

    // Get selected vendors
    const selectedVendors = window.vendorController ?
      window.vendorController.getSelectedVendors() :
      ['portnox', 'cisco'];

    // Get config state
    const configState = window.configController ?
      window.configController.getState() :
      {
        deviceCount: 2500,
        yearsToProject: 3,
        fteCost: 120000,
        fteAllocation: 50,
        maintenancePercentage: 18,
        portnoxDiscount: 20
      };

    // Create data points for sensitivity analysis
    const steps = 10;
    const stepSize = (max - min) / steps;
    const labels = [];
    const datasets = [];

    // Create a dataset for each vendor
    selectedVendors.forEach(vendor => {
      const data = [];

      for (let i = 0; i <= steps; i++) {
        const value = min + (stepSize * i);
        if (i === 0) labels.push(value);

        // Create a copy of the config state
        const config = { ...configState };

        // Update the variable being analyzed
        switch (variable) {
          case 'deviceCount':
            config.deviceCount = value;
            if (i === 0) labels[i] = value.toLocaleString(); // Format device count
            break;
          case 'cost':
            if (vendor === 'portnox') config.portnoxBasePrice = value;
            break;
          case 'fte':
            config.fteAllocation = value * 100; // Convert to percentage
            break;
          case 'implementation':
            // Implementation time doesn't directly affect TCO calculation
            // Use a simple scaling factor for demonstration
            config.implementationDays = value;
            break;
        }

        // Calculate TCO for this configuration
        const tco = VendorData.calculateTCO(vendor, config);
        data.push(tco.total);
      }

      datasets.push({
        label: VendorData.vendorNames[vendor],
        data: data,
        backgroundColor: 'transparent',
        borderColor: VendorData.vendorColors[vendor],
        borderWidth: 3,
        pointRadius: 4,
        tension: 0.2
      });
    });

    // Update chart
    chart.data.labels = labels;
    chart.data.datasets = datasets;

    // Update chart title based on variable
    let title = 'Sensitivity Analysis: ';
    switch (variable) {
      case 'deviceCount':
        title += 'Device Count';
        chart.options.scales.x.title.text = 'Number of Devices';
        break;
      case 'cost':
        title += 'Cost per Device';
        chart.options.scales.x.title.text = 'Cost per Device ($)';
        break;
      case 'fte':
        title += 'FTE Allocation';
        chart.options.scales.x.title.text = 'FTE Allocation';
        break;
      case 'implementation':
        title += 'Implementation Time';
        chart.options.scales.x.title.text = 'Implementation Days';
        break;
    }

    chart.options.plugins.title.text = title;
    chart.update();
  }

  // Breakeven Chart
  initBreakevenChart() {
    const ctx = document.getElementById('breakeven-chart');
    if (!ctx) return;

    const months = Array.from({length: 36}, (_, i) => `Month ${i+1}`);

    this.charts['breakeven-chart'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time'
            },
            ticks: {
              callback: function(value, index) {
                return index % 6 === 0 ? `Month ${index+1}` : '';
              },
              autoSkip: false
            }
          },
          y: {
            title: {
              display: true,
              text: 'Cumulative Cost (USD)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Break-even Analysis',
            padding: {
              top: 10,
              bottom: 20
            }
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                xMin: 9.5,
                xMax: 9.5,
                borderColor: '#FF5252',
                borderWidth: 2,
                label: {
                  content: 'Break-even (Month 10)',
                  enabled: true,
                  position: 'top'
                }
              }
            }
          }
        }
      }
    });
  }

  updateBreakevenChart(data) {
    const chart = this.charts['breakeven-chart'];
    if (!chart) return;

    const months = Array.from({length: 36}, (_, i) => `Month ${i+1}`);
    const datasets = [];

    // Only show Cisco and Portnox for breakeven analysis
    const relevantVendors = data.selectedVendors.filter(v => v === 'cisco' || v === 'portnox');

    if (relevantVendors.includes('cisco') && relevantVendors.includes('portnox')) {
      // Generate month-by-month cumulative costs
      const ciscoCosts = [50000];
      const portnoxCosts = [30000];

      for (let i = 1; i < 36; i++) {
        const ciscoMonthly = i === 0 ? 50000 : 25000;
        const portnoxMonthly = i === 0 ? 30000 : 12000;

        ciscoCosts.push(ciscoCosts[i-1] + ciscoMonthly);
        portnoxCosts.push(portnoxCosts[i-1] + portnoxMonthly);
      }

      datasets.push({
        label: 'Cisco ISE',
        data: ciscoCosts,
        backgroundColor: 'transparent',
        borderColor: VendorData.vendorColors['cisco'],
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.2
      });

      datasets.push({
        label: 'Portnox Cloud',
        data: portnoxCosts,
        backgroundColor: 'transparent',
        borderColor: VendorData.vendorColors['portnox'],
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.2
      });

      // Find breakeven point
      let breakevenMonth = 0;
      for (let i = 0; i < ciscoCosts.length; i++) {
        if (ciscoCosts[i] >= portnoxCosts[i]) {
          breakevenMonth = i + 1;
          break;
        }
      }

      // Update annotation
      if (chart.options.plugins.annotation) {
        chart.options.plugins.annotation.annotations.line1.xMin = breakevenMonth - 0.5;
        chart.options.plugins.annotation.annotations.line1.xMax = breakevenMonth - 0.5;
        chart.options.plugins.annotation.annotations.line1.label.content = `Break-even (Month ${breakevenMonth})`;
      }

      // Update breakeven metric
      const breakevenElement = document.getElementById('breakeven-point');
      if (breakevenElement) {
        breakevenElement.textContent = `${breakevenMonth} months`;
      }
    }

    chart.data.labels = months;
    chart.data.datasets = datasets;
    chart.update();
  }

  // FTE Impact Chart
  initFteImpactChart() {
    const ctx = document.getElementById('fte-impact-chart');
    if (!ctx) return;

    const fteLabels = ['Setup', 'Ongoing Management', 'Troubleshooting', 'Upgrades'];

    this.charts['fte-impact-chart'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: fteLabels,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'FTE Hours per Month'
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'FTE Impact Analysis',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateFteImpactChart(data) {
    const chart = this.charts['fte-impact-chart'];
    if (!chart) return;

    const fteLabels = ['Setup', 'Ongoing Management', 'Troubleshooting', 'Upgrades'];
    const datasets = [];

    // Create datasets for each selected vendor
    data.selectedVendors.forEach(vendor => {
      let fteData = [];

      if (vendor === 'portnox') {
        fteData = [20, 10, 8, 2]; // Cloud-based, minimal management
      } else if (vendor === 'cisco') {
        fteData = [80, 40, 30, 20]; // On-premises, high management
      } else if (vendor === 'aruba') {
        fteData = [70, 35, 25, 18];
      } else if (vendor === 'forescout') {
        fteData = [65, 30, 25, 15];
      } else if (vendor === 'fortinac') {
        fteData = [60, 30, 20, 15];
      } else if (vendor === 'juniper') {
        fteData = [65, 30, 25, 15];
      } else if (vendor === 'securew2') {
        fteData = [25, 15, 10, 5];
      } else if (vendor === 'nps') {
        fteData = [40, 50, 35, 25]; // Free but high ongoing management
      } else if (vendor === 'noNac') {
        fteData = [0, 0, 40, 0]; // No solution, high troubleshooting
      }

      datasets.push({
        label: VendorData.vendorNames[vendor],
        data: fteData,
        backgroundColor: VendorData.vendorColors[vendor],
        borderColor: VendorData.vendorColors[vendor],
        borderWidth: 1
      });
    });

    chart.data.labels = fteLabels;
    chart.data.datasets = datasets;
    chart.update();
  }

  // Architecture Chart
  initArchitectureChart() {
    const ctx = document.getElementById('architecture-chart');
    if (!ctx) return;

    const architectureLabels = ['Cloud Native', 'On-Premises', 'Hybrid'];

    this.charts['architecture-chart'] = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: architectureLabels,
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        scales: {
          r: {
            beginAtZero: true,
            ticks: {
              display: false
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Architecture Comparison',
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }

  updateArchitectureChart(data) {
    const chart = this.charts['architecture-chart'];
    if (!chart) return;

    const architectureLabels = ['Cloud Native', 'On-Premises', 'Hybrid'];
    const datasets = [];

    // Create a single dataset with architecture scores for each vendor
    const values = [];
    const bgColors = [];

    data.selectedVendors.forEach(vendor => {
      let architectureScores = [];

      if (vendor === 'portnox') {
        architectureScores = [100, 0, 0]; // Fully cloud-native
      } else if (vendor === 'cisco') {
        architectureScores = [20, 70, 10]; // Primarily on-premises
      } else if (vendor === 'aruba') {
        architectureScores = [30, 60, 10];
      } else if (vendor === 'forescout') {
        architectureScores = [20, 70, 10];
      } else if (vendor === 'fortinac') {
        architectureScores = [10, 80, 10];
      } else if (vendor === 'juniper') {
        architectureScores = [30, 60, 10];
      } else if (vendor === 'securew2') {
        architectureScores = [90, 0, 10];
      } else if (vendor === 'nps') {
        architectureScores = [0, 100, 0];
      } else if (vendor === 'noNac') {
        architectureScores = [0, 0, 0];
      }

      values.push(...architectureScores);
      bgColors.push(
        VendorData.vendorColors[vendor],
        `${VendorData.vendorColors[vendor]}aa`,
        `${VendorData.vendorColors[vendor]}55`
      );
    });

    datasets.push({
      data: values,
      backgroundColor: bgColors
    });

    chart.data.labels = Array(values.length).fill('').map((_, i) =>
      `${architectureLabels[i % 3]} (${VendorData.vendorNames[data.selectedVendors[Math.floor(i / 3)]]})`
    );
    chart.data.datasets = datasets;
    chart.update();
  }
}

// Initialize the chart controller when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.chartController = new ChartController();
  window.chartController.initializeCharts();
});
EOF
echo "Created chart-controller.js"

# Create configuration controller
echo "Creating configuration controller module..."
cat > ./js/components/config-controller.js << 'EOF'
/**
 * Configuration Controller
 * Manages application configuration state and interactions
 */
class ConfigController {
  constructor() {
    this.state = {
      // Organization
      organizationSize: 'medium',
      deviceCount: 2500,
      locations: 5,

      // Features
      cloudIntegration: false,
      legacyDevices: false,
      byodSupport: false,

      // Analysis
      yearsToProject: 3,
      implementationUrgency: 'normal',

      // Industry & Compliance
      industry: '',
      compliance: {
        pci: false,
        hipaa: false,
        nist: false,
        gdpr: false,
        iso: false
      },

      // Cost parameters
      fteCost: 120000,
      fteAllocation: 50,
      maintenancePercentage: 18,
      downtimeCost: 10000,
      implementationDays: 60,
      portnoxBasePrice: 4,
      portnoxDiscount: 20
    };

    this.initEventListeners();
  }

  initEventListeners() {
    // Organization size
    const sizeSelect = document.getElementById('organization-size');
    if (sizeSelect) {
      sizeSelect.addEventListener('change', () => {
        this.state.organizationSize = sizeSelect.value;
        this.updateDeviceCount(sizeSelect.value);
      });
    }

    // Device count
    const deviceCountInput = document.getElementById('device-count');
    if (deviceCountInput) {
      deviceCountInput.addEventListener('change', () => {
        this.state.deviceCount = parseInt(deviceCountInput.value);
      });
    }

    // Locations
    const locationsInput = document.getElementById('locations');
    if (locationsInput) {
      locationsInput.addEventListener('change', () => {
        this.state.locations = parseInt(locationsInput.value);
      });
    }

    // Network features
    const cloudIntegrationCheck = document.getElementById('cloud-integration');
    if (cloudIntegrationCheck) {
      cloudIntegrationCheck.addEventListener('change', () => {
        this.state.cloudIntegration = cloudIntegrationCheck.checked;
      });
    }

    const legacyDevicesCheck = document.getElementById('legacy-devices');
    if (legacyDevicesCheck) {
      legacyDevicesCheck.addEventListener('change', () => {
        this.state.legacyDevices = legacyDevicesCheck.checked;
      });
    }

    const byodSupportCheck = document.getElementById('byod-support');
    if (byodSupportCheck) {
      byodSupportCheck.addEventListener('change', () => {
        this.state.byodSupport = byodSupportCheck.checked;
      });
    }

    // Analysis period
    const yearsSelect = document.getElementById('years-to-project');
    if (yearsSelect) {
      yearsSelect.addEventListener('change', () => {
        this.state.yearsToProject = parseInt(yearsSelect.value);
      });
    }

    // Industry
    const industrySelect = document.getElementById('industry-select');
    if (industrySelect) {
      industrySelect.addEventListener('change', () => {
        this.state.industry = industrySelect.value;
        this.updateComplianceFrameworks(industrySelect.value);
      });
    }

    // Compliance
    const complianceChecks = {
      'compliance-pci': 'pci',
      'compliance-hipaa': 'hipaa',
      'compliance-nist': 'nist',
      'compliance-gdpr': 'gdpr',
      'compliance-iso': 'iso'
    };

    Object.entries(complianceChecks).forEach(([elementId, stateKey]) => {
      const checkbox = document.getElementById(elementId);
      if (checkbox) {
        checkbox.addEventListener('change', () => {
          this.state.compliance[stateKey] = checkbox.checked;
        });
      }
    });

    // Cost parameters
    this.initRangeSlider('fte-cost', 'fte-cost-value', (value) => {
      this.state.fteCost = parseInt(value);
      return `$${parseInt(value).toLocaleString()}`;
    });

    this.initRangeSlider('fte-allocation', 'fte-allocation-value', (value) => {
      this.state.fteAllocation = parseInt(value);
      return `${value}%`;
    });

    this.initRangeSlider('maintenance-percentage', 'maintenance-value', (value) => {
      this.state.maintenancePercentage = parseInt(value);
      return `${value}%`;
    });

    this.initRangeSlider('downtime-cost', 'downtime-cost-value', (value) => {
      this.state.downtimeCost = parseInt(value);
      return `$${parseInt(value).toLocaleString()}`;
    });

    this.initRangeSlider('implementation-days', 'implementation-days-value', (value) => {
      this.state.implementationDays = parseInt(value);
      return `${value} days`;
    });

    this.initRangeSlider('portnox-base-price', 'portnox-cost-value', (value) => {
      this.state.portnoxBasePrice = parseFloat(value);
      return `$${parseFloat(value).toFixed(2)}`;
    });

    this.initRangeSlider('portnox-discount', 'portnox-discount-value', (value) => {
      this.state.portnoxDiscount = parseInt(value);
      return `${value}%`;
    });

    // Calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => this.calculateResults());
    }
  }

  initRangeSlider(sliderId, valueId, formatter) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);

    if (slider && valueDisplay) {
      // Set initial value
      valueDisplay.textContent = formatter(slider.value);

      // Update on change
      slider.addEventListener('input', () => {
        valueDisplay.textContent = formatter(slider.value);
      });
    }
  }

  updateDeviceCount(size) {
    // Update device count based on organization size
    const deviceCountInput = document.getElementById('device-count');

    if (deviceCountInput) {
      let count = 2500;

      switch (size) {
        case 'small':
          count = 500;
          break;
        case 'medium':
          count = 2500;
          break;
        case 'large':
          count = 7500;
          break;
        case 'enterprise':
          count = 15000;
          break;
      }

      deviceCountInput.value = count;
      this.state.deviceCount = count;
    }
  }

  updateComplianceFrameworks(industry) {
    // Auto-check relevant compliance frameworks based on industry
    const complianceMap = {
      'healthcare': ['hipaa', 'nist'],
      'financial': ['pci', 'nist', 'gdpr'],
      'education': ['ferpa', 'nist'],
      'government': ['nist', 'fisma'],
      'manufacturing': ['nist', 'iso'],
      'retail': ['pci', 'gdpr'],
      'technology': ['iso', 'gdpr'],
      'energy': ['nist', 'nerc']
    };

    // Reset all checkboxes
    Object.keys(this.state.compliance).forEach(framework => {
      this.state.compliance[framework] = false;
      const checkbox = document.getElementById(`compliance-${framework}`);
      if (checkbox) checkbox.checked = false;
    });

    // Check relevant frameworks
    if (complianceMap[industry]) {
      complianceMap[industry].forEach(framework => {
        if (this.state.compliance.hasOwnProperty(framework)) {
          this.state.compliance[framework] = true;
          const checkbox = document.getElementById(`compliance-${framework}`);
          if (checkbox) checkbox.checked = true;
        }
      });
    }
  }

  calculateResults() {
    // Show loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) loadingOverlay.classList.add('active');

    // Validate inputs
    if (!this.validateInputs()) {
      // Hide loading overlay
      if (loadingOverlay) loadingOverlay.classList.remove('active');

      // Show error notification
      this.showNotification('Please complete all required fields', 'error');
      return;
    }

    // Simulate calculation time (replace with actual calculation)
    setTimeout(() => {
      // Hide loading overlay
      if (loadingOverlay) loadingOverlay.classList.remove('active');

      // Dispatch calculation event
      document.dispatchEvent(new CustomEvent('calculateResults', {
        detail: { ...this.state }
      }));

      // Update TCO metrics
      this.updateTcoMetrics();

      // Navigate to results
      const calculateBtn = document.getElementById('calculate-btn');
      if (calculateBtn) {
        calculateBtn.textContent = 'Update Results';
      }

      // Check if view controller exists
      if (window.viewController) {
        window.viewController.navigateTo('executive', 'executive-overview');
      }

      // Show success notification
      this.showNotification('Calculation completed successfully', 'success');
    }, 1500);
  }

  validateInputs() {
    // Check required fields
    if (this.state.deviceCount < 300 || this.state.deviceCount > 100000) {
      return false;
    }

    if (this.state.locations < 1) {
      return false;
    }

    return true;
  }

  showNotification(message, type = 'info') {
    // Use existing notification manager if available
    if (window.NotificationManager) {
      window.NotificationManager.show(message, type);
      return;
    }

    // Simple fallback notification
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      </div>
      <div class="toast-content">${message}</div>
      <button class="toast-close">&times;</button>
    `;

    toastContainer.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    }, 5000);

    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toast.classList.add('fade-out');
        setTimeout(() => {
          toastContainer.removeChild(toast);
        }, 300);
      });
    }
  }

  updateTcoMetrics() {
    // Get selected vendors
    const selectedVendors = window.vendorController ?
      window.vendorController.getSelectedVendors() :
      ['portnox', 'cisco'];

    // Calculate TCO for selected vendors
    if (selectedVendors.includes('portnox')) {
      const portnoxTco = window.VendorData.calculateTCO('portnox', this.state);

      // Update metrics
      const portnoxTcoElement = document.getElementById('portnox-tco');
      if (portnoxTcoElement) {
        portnoxTcoElement.textContent = `$${Math.round(portnoxTco.total).toLocaleString()}`;
      }

      // If Cisco is also selected, calculate savings
      if (selectedVendors.includes('cisco')) {
        const ciscoTco = window.VendorData.calculateTCO('cisco', this.state);

        const tcoComparisonElement = document.getElementById('tco-comparison');
        if (tcoComparisonElement) {
          tcoComparisonElement.textContent = `vs. $${Math.round(ciscoTco.total).toLocaleString()} (Cisco ISE)`;
        }

        const totalSavingsElement = document.getElementById('total-savings');
        if (totalSavingsElement) {
          const savings = ciscoTco.total - portnoxTco.total;
          totalSavingsElement.textContent = `$${Math.round(savings).toLocaleString()}`;
        }

        const savingsPercentageElement = document.getElementById('savings-percentage');
        if (savingsPercentageElement) {
          const percentage = Math.round(((ciscoTco.total - portnoxTco.total) / ciscoTco.total) * 100);
          savingsPercentageElement.textContent = `${percentage}% reduction vs. Cisco ISE`;
        }
      }
    }
  }

  getState() {
    return { ...this.state };
  }
}

// Initialize the configuration controller when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.configController = new ConfigController();
});
EOF
echo "Created config-controller.js"

# Update main.js to initialize new components
echo "Updating main.js to initialize new components..."
cat > ./js/main.js << 'EOF'
/**
 * Main application script
 * Initializes all components and handles global events
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize controllers
  initializeControllers();

  // Set up global event listeners
  setupEventListeners();

  // Initialize particles background
  initializeParticles();

  // Initialize dark mode toggle
  initializeDarkMode();

  // Show initial notification
  showWelcomeNotification();
});

function initializeControllers() {
  // These controllers will initialize themselves when imported
  // But we need to ensure they're instantiated in the correct order

  // Configuration controller (loads configuration state)
  if (!window.configController && typeof ConfigController !== 'undefined') {
    window.configController = new ConfigController();
  }

  // Vendor controller (manages vendor selection)
  if (!window.vendorController && typeof VendorController !== 'undefined') {
    window.vendorController = new VendorController();
  }

  // View controller (manages view navigation)
  if (!window.viewController && typeof ViewController !== 'undefined') {
    window.viewController = new ViewController();
  }

  // Sidebar controller (manages sidebar interaction)
  if (!window.sidebarController && typeof SidebarController !== 'undefined') {
    window.sidebarController = new SidebarController();
  }

  // Chart controller (initializes and updates charts)
  if (!window.chartController && typeof ChartController !== 'undefined') {
    window.chartController = new ChartController();
    window.chartController.initializeCharts();
  }
}

function setupEventListeners() {
  // Export PDF button
  const exportPdfBtn = document.getElementById('export-pdf');
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', exportPdf);
  }

  // Help button
  const helpBtn = document.getElementById('help-btn');
  const helpModal = document.getElementById('help-modal');
  if (helpBtn && helpModal) {
    helpBtn.addEventListener('click', () => {
      helpModal.style.display = 'block';
    });

    // Close modal on X click
    const closeBtn = helpModal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        helpModal.style.display = 'none';
      });
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
      if (e.target === helpModal) {
        helpModal.style.display = 'none';
      }
    });
  }
}

function initializeParticles() {
  // Initialize particles.js if available
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#4e73df'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.1,
          random: false,
          anim: {
            enable: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#4e73df',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
}

function initializeDarkMode() {
  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    // Check for stored preference
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';

    // Set initial state
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');

      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }

      // Update charts
      if (window.chartController) {
        Object.values(window.chartController.charts).forEach(chart => {
          if (chart) chart.update();
        });
      }
    });
  }
}

function showWelcomeNotification() {
  // Show welcome notification
  if (window.NotificationManager) {
    window.NotificationManager.show(
      'Welcome to the Portnox Total Cost Analyzer. Select your current NAC vendor and configuration to begin.',
      'info'
    );
  }
}

function exportPdf() {
  // Export results as PDF
  if (window.jspdf && window.jspdf.jsPDF) {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Add logo
      // doc.addImage('img/portnox-logo.png', 'PNG', 10, 10, 50, 20);

      // Add title
      doc.setFontSize(20);
      doc.text('Portnox Zero Trust Total Cost Analysis', 105, 20, { align: 'center' });

      // Add date
      doc.setFontSize(10);
      const today = new Date();
      doc.text(`Generated on ${today.toLocaleDateString()}`, 105, 30, { align: 'center' });

      // Get selected vendors
      const selectedVendors = window.vendorController ?
        window.vendorController.getSelectedVendors() :
        ['portnox', 'cisco'];

      // Add TCO summary
      doc.setFontSize(16);
      doc.text('TCO Summary', 20, 40);

      doc.setFontSize(12);
      let yPos = 50;

      selectedVendors.forEach(vendor => {
        if (window.VendorData) {
          const vendorName = window.VendorData.vendorNames[vendor];
          const configState = window.configController ? window.configController.getState() : null;

          if (configState) {
            const tco = window.VendorData.calculateTCO(vendor, configState);
            doc.text(`${vendorName}: $${Math.round(tco.total).toLocaleString()}`, 20, yPos);
            yPos += 10;
          }
        }
      });

      // Add canvas charts
      if (window.chartController) {
        // Add TCO comparison chart
        const tcoCanvas = document.getElementById('tco-comparison-chart');
        if (tcoCanvas) {
          const tcoImgData = tcoCanvas.toDataURL('image/png');
          doc.text('TCO Comparison Chart', 20, yPos + 10);
          doc.addImage(tcoImgData, 'PNG', 20, yPos + 15, 120, 60);
          yPos += 80;
        }

        // Add feature radar chart
        const featureCanvas = document.getElementById('feature-radar-chart');
        if (featureCanvas) {
          const featureImgData = featureCanvas.toDataURL('image/png');
          doc.text('Feature Comparison', 150, 50);
          doc.addImage(featureImgData, 'PNG', 150, 55, 120, 60);
        }

        // Add more charts as needed
      }

      // Add notes
      doc.setFontSize(10);
      doc.text('This analysis was generated using the Portnox Total Cost Analyzer. For more information, visit portnox.com', 20, 200);

      // Save the PDF
      doc.save('portnox-tco-analysis.pdf');

      // Show success notification
      if (window.NotificationManager) {
        window.NotificationManager.show('PDF exported successfully', 'success');
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);

      // Show error notification
      if (window.NotificationManager) {
        window.NotificationManager.show('Error exporting PDF. Please try again.', 'error');
      }
    }
  } else {
    // Show error notification
    if (window.NotificationManager) {
      window.NotificationManager.show('PDF export library not loaded. Please try again later.', 'error');
    }
  }
}
EOF
echo "Updated main.js"

echo "Data and charts update complete."
echo "To update the notification and UI enhancements, run the next script."
read -p "Press any key to continue..." -n1 -s
echo
echo "========================================================="

#!/bin/bash

echo "Starting Portnox Total Cost Analyzer Notification & UI Enhancements"
echo "=================================================================="
echo "This script will update notification manager and enhance UI components."

# Create notification manager
echo "Creating notification manager..."
mkdir -p ./js/managers
cat > ./js/managers/notification.js << 'EOF'
/**
 * Notification Manager
 * Handles displaying toast notifications to the user
 */
class NotificationManager {
  constructor() {
    this.container = document.getElementById('toast-container');

    // Create container if it doesn't exist
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  }

  /**
   * Show a notification
   * @param {string} message - The message to display
   * @param {string} type - The notification type (info, success, warning, error)
   * @param {number} duration - Duration in milliseconds (0 for no auto-close)
   */
  show(message, type = 'info', duration = 5000) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Set toast content
    toast.innerHTML = `
      <div class="toast-icon">
        <i class="fas fa-${this.getIconForType(type)}"></i>
      </div>
      <div class="toast-content">${message}</div>
      <button class="toast-close">&times;</button>
    `;

    // Add to container
    this.container.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
      toast.classList.add('toast-visible');
    }, 10);

    // Set up auto-close
    let timeout;
    if (duration > 0) {
      timeout = setTimeout(() => {
        this.close(toast);
      }, duration);
    }

    // Set up close button
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (timeout) clearTimeout(timeout);
        this.close(toast);
      });
    }

    // Return the toast element
    return toast;
  }

  /**
   * Close a notification
   * @param {HTMLElement} toast - The toast element to close
   */
  close(toast) {
    // Trigger exit animation
    toast.classList.remove('toast-visible');
    toast.classList.add('toast-hidden');

    // Remove from DOM after animation
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  /**
   * Get the appropriate icon for the notification type
   * @param {string} type - The notification type
   * @returns {string} The icon class name
   */
  getIconForType(type) {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'exclamation-triangle';
      case 'error':
        return 'exclamation-circle';
      case 'info':
      default:
        return 'info-circle';
    }
  }
}

// Initialize the notification manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.NotificationManager = new NotificationManager();
});
EOF
echo "Created notification.js"

# Create loading manager
echo "Creating loading manager..."
cat > ./js/managers/loading.js << 'EOF'
/**
 * Loading Manager
 * Handles the display of loading indicators and overlays
 */
class LoadingManager {
  constructor() {
    this.overlay = document.getElementById('loading-overlay');

    // Create overlay if it doesn't exist
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.id = 'loading-overlay';
      this.overlay.className = 'loading-overlay';

      this.overlay.innerHTML = `
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Calculating...</p>
        </div>
      `;

      document.body.appendChild(this.overlay);
    }
  }

  /**
   * Show the loading overlay
   * @param {string} message - Optional message to display
   */
  show(message = 'Calculating...') {
    // Update message if provided
    const messageElement = this.overlay.querySelector('p');
    if (messageElement) {
      messageElement.textContent = message;
    }

    // Show overlay
    this.overlay.classList.add('active');

    // Lock body scroll
    document.body.style.overflow = 'hidden';
  }

  /**
   * Hide the loading overlay
   */
  hide() {
    // Hide overlay
    this.overlay.classList.remove('active');

    // Restore body scroll
    document.body.style.overflow = '';
  }
}

// Initialize the loading manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.LoadingManager = new LoadingManager();
});
EOF
echo "Created loading.js"

# Create a CSS file for notifications and enhanced UI
echo "Creating enhanced CSS styles..."
cat > ./css/enhanced-ui.css << 'EOF'
/**
 * Enhanced UI Components
 * Additional styling for notifications, cards, and UI components
 */

/* Toast Notifications */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  width: 320px;
  max-width: 100%;
}

.toast {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  position: relative;
}

.toast-visible {
  opacity: 1;
  transform: translateX(0);
}

.toast-hidden {
  opacity: 0;
  transform: translateX(100%);
}

.toast-icon {
  margin-right: 0.75rem;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.toast-content {
  flex: 1;
  margin-right: 0.75rem;
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #999;
  padding: 0;
  margin: 0;
  line-height: 1;
  align-self: flex-start;
}

.toast-info {
  border-left: 4px solid #3498db;
}

.toast-info .toast-icon {
  color: #3498db;
}

.toast-success {
  border-left: 4px solid #2ecc71;
}

.toast-success .toast-icon {
  color: #2ecc71;
}

.toast-warning {
  border-left: 4px solid #f39c12;
}

.toast-warning .toast-icon {
  color: #f39c12;
}

.toast-error {
  border-left: 4px solid #e74c3c;
}

.toast-error .toast-icon {
  color: #e74c3c;
}

/* Loading Overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.loading-overlay.active {
  opacity: 1;
  visibility: visible;
}

.loading-spinner {
  text-align: center;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #4e73df;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Enhanced UI Elements */

/* Badges */
.badge {
  display: inline-block;
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.375rem;
}

.badge-success {
  background-color: #e6f7f0;
  color: #36B37E;
}

.badge-warning {
  background-color: #fff8e6;
  color: #FFAB00;
}

.badge-danger {
  background-color: #ffebe6;
  color: #FF5630;
}

.badge-info {
  background-color: #e6f4ff;
  color: #0065FF;
}

.badge-primary {
  background-color: #e6f0ff;
  color: #4C9AFF;
}

/* Data Tables */
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.data-table th,
.data-table td {
  padding: 0.75rem;
  border: 1px solid #e3e6f0;
}

.data-table th {
  background-color: #f8f9fc;
  font-weight: 700;
  text-align: left;
}

.data-table tbody tr:nth-child(even) {
  background-color: #f8f9fc;
}

.data-table tbody tr:hover {
  background-color: #eaecf4;
}

.data-table .highlight-value {
  color: #36B37E;
  font-weight: 700;
}

.data-table .negative-value {
  color: #FF5630;
  font-weight: 700;
}

.data-table .total-row {
  background-color: #f8f9fc;
  font-weight: 700;
}

/* Benefits List */
.benefits-list {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 0;
}

.benefits-list li {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 0.75rem;
}

.benefits-list li:before {
  content: "\f00c";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  position: absolute;
  left: 0;
  top: 0;
  color: #36B37E;
}

/* Implementation Timeline */
.implementation-timeline {
  position: relative;
  padding: 1rem 0;
}

.timeline-item {
  padding: 1rem;
  border-left: 2px solid #4e73df;
  margin-left: 20px;
  position: relative;
  margin-bottom: 1.5rem;
}

.timeline-item:before {
  content: "";
  position: absolute;
  left: -10px;
  top: 1.25rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #4e73df;
}

.timeline-item h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.timeline-item p {
  margin-bottom: 0;
}

/* Dark Mode Support */
.dark-mode .toast {
  background-color: #2d3748;
  color: #e2e8f0;
}

.dark-mode .toast-close {
  color: #cbd5e0;
}

.dark-mode .loading-overlay {
  background-color: rgba(26, 32, 44, 0.8);
}

.dark-mode .spinner {
  border-color: #2d3748;
  border-top-color: #4e73df;
}

.dark-mode .data-table th {
  background-color: #2d3748;
}

.dark-mode .data-table th,
.dark-mode .data-table td {
  border-color: #4a5568;
}

.dark-mode .data-table tbody tr:nth-child(even) {
  background-color: #2d3748;
}

.dark-mode .data-table tbody tr:hover {
  background-color: #4a5568;
}

/* Responsive Fixes */
@media (max-width: 768px) {
  .toast-container {
    width: calc(100% - 40px);
  }

  .chart-wrapper {
    height: 250px;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
EOF
echo "Created enhanced-ui.css"

# Update CSS link in index.html
echo "Updating CSS references in index.html..."
sed -i '' -e '/<link rel="stylesheet" href="css\/main.css">/a\
    <link rel="stylesheet" href="css\/enhanced-ui.css">' index.html 2>/dev/null || sed -i '/<link rel="stylesheet" href="css\/main.css">/a\
    <link rel="stylesheet" href="css\/enhanced-ui.css">' index.html

# Create implementation timeline utility
echo "Creating implementation timeline utility..."
cat > ./js/components/implementation-timeline.js << 'EOF'
/**
 * Implementation Timeline Component
 * Generates implementation timeline visualization for different vendors
 */
class ImplementationTimeline {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    if (!this.container) {
      console.error(`Element with ID "${elementId}" not found.`);
      return;
    }
  }

  /**
   * Generate a timeline for a vendor
   * @param {string} vendor - The vendor ID
   */
  generate(vendor) {
    if (!this.container) return;

    // Clear existing content
    this.container.innerHTML = '';

    // Get timeline phases based on vendor
    const phases = this.getTimelinePhases(vendor);

    // Create timeline HTML
    const timeline = document.createElement('div');
    timeline.className = 'implementation-timeline';

    phases.forEach(phase => {
      const item = document.createElement('div');
      item.className = 'timeline-item';

      item.innerHTML = `
        <h4>${phase.name} <span class="duration">(${phase.duration})</span></h4>
        <p>${phase.description}</p>
      `;

      timeline.appendChild(item);
    });

    this.container.appendChild(timeline);
  }

  /**
   * Get timeline phases for a vendor
   * @param {string} vendor - The vendor ID
   * @returns {Array} Array of timeline phases
   */
  getTimelinePhases(vendor) {
    // Default phases
    const defaultPhases = [
      {
        name: 'Planning & Assessment',
        duration: '1-2 weeks',
        description: 'Evaluate environment, define requirements, and create deployment plan.'
      },
      {
        name: 'Initial Setup',
        duration: '1 week',
        description: 'Set up core components and establish baseline configuration.'
      },
      {
        name: 'Configuration & Integration',
        duration: '2-4 weeks',
        description: 'Configure policies, integrate with existing systems, and test functionality.'
      },
      {
        name: 'Pilot Deployment',
        duration: '1-2 weeks',
        description: 'Deploy to a limited group of users for testing and feedback.'
      },
      {
        name: 'Training & Knowledge Transfer',
        duration: '1 week',
        description: 'Train IT staff on administration, monitoring, and troubleshooting.'
      },
      {
        name: 'Full Deployment',
        duration: '2-4 weeks',
        description: 'Roll out solution to all users and devices across the organization.'
      }
    ];

    // Vendor-specific phases
    switch (vendor) {
      case 'portnox':
        return [
          {
            name: 'Planning & Assessment',
            duration: '3-5 days',
            description: 'Rapid environment assessment and cloud deployment plan creation.'
          },
          {
            name: 'Cloud Instance Setup',
            duration: '1 day',
            description: 'Provision and configure Portnox Cloud instance.'
          },
          {
            name: 'Directory Integration',
            duration: '1-2 days',
            description: 'Connect to Active Directory, Azure AD, or other identity providers.'
          },
          {
            name: 'Network Integration',
            duration: '2-3 days',
            description: 'Configure switches, wireless controllers, and VPN for RADIUS authentication.'
          },
          {
            name: 'Policy Configuration',
            duration: '1-2 days',
            description: 'Define access policies, authentication methods, and enforcement actions.'
          },
          {
            name: 'Pilot Deployment',
            duration: '3-5 days',
            description: 'Limited rollout with monitoring and policy tuning.'
          },
          {
            name: 'Training',
            duration: '1 day',
            description: 'Knowledge transfer to IT staff (minimal training required).'
          },
          {
            name: 'Full Deployment',
            duration: '1-2 weeks',
            description: 'Phased rollout across the organization with minimal disruption.'
          }
        ];

      case 'cisco':
        return [
          {
            name: 'Planning & Assessment',
            duration: '2-4 weeks',
            description: 'Detailed environment assessment, hardware sizing, and architecture design.'
          },
          {
            name: 'Hardware Procurement',
            duration: '2-4 weeks',
            description: 'Order, receive, and rack ISE appliances or prepare virtual machines.'
          },
          {
            name: 'Initial Installation',
            duration: '1-2 weeks',
            description: 'Install ISE software, configure high availability, and establish baseline settings.'
          },
          {
            name: 'Certificate Configuration',
            duration: '1 week',
            description: 'Set up certificate authority and deploy certificates for secure authentication.'
          },
          {
            name: 'Network Integration',
            duration: '3-4 weeks',
            description: 'Configure switches, wireless controllers, and VPN concentrators for ISE integration.'
          },
          {
            name: 'Identity Store Integration',
            duration: '1-2 weeks',
            description: 'Connect to Active Directory and other identity sources.'
          },
          {
            name: 'Policy Configuration',
            duration: '2-3 weeks',
            description: 'Create detailed authorization policies and profiles.'
          },
          {
            name: 'Guest & BYOD Services',
            duration: '1-2 weeks',
            description: 'Configure guest access and BYOD onboarding processes.'
          },
          {
            name: 'Extensive Testing',
            duration: '2-3 weeks',
            description: 'Test all access scenarios and troubleshoot issues.'
          },
          {
            name: 'Team Training',
            duration: '1-2 weeks',
            description: 'Formal training for administrators on ISE management (certification recommended).'
          },
          {
            name: 'Pilot Deployment',
            duration: '2-4 weeks',
            description: 'Controlled rollout with extensive monitoring and problem resolution.'
          },
          {
            name: 'Full Deployment',
            duration: '4-8 weeks',
            description: 'Phased rollout by location or department with fallback options.'
          }
        ];

      case 'aruba':
        return [
          {
            name: 'Planning & Assessment',
            duration: '2-3 weeks',
            description: 'Environment assessment, hardware sizing, and architecture design.'
          },
          {
            name: 'Hardware Deployment',
            duration: '1-3 weeks',
            description: 'Install ClearPass appliances or configure virtual machines.'
          },
          {
            name: 'Initial Configuration',
            duration: '1-2 weeks',
            description: 'Basic setup, licensing, and high availability configuration.'
          },
          {
            name: 'Network Integration',
            duration: '2-3 weeks',
            description: 'Configure network devices for RADIUS and enforcement.'
          },
          {
            name: 'Authentication Setup',
            duration: '1-2 weeks',
            description: 'Configure authentication methods and identity stores.'
          },
          {
            name: 'Policy Creation',
            duration: '2-3 weeks',
            description: 'Develop enforcement profiles and access rules.'
          },
          {
            name: 'Onboarding Setup',
            duration: '1-2 weeks',
            description: 'Configure guest access and device onboarding.'
          },
          {
            name: 'Testing & Tuning',
            duration: '2 weeks',
            description: 'Validate functionality and optimize performance.'
          },
          {
            name: 'Administrator Training',
            duration: '1 week',
            description: 'Train IT staff on ClearPass management.'
          },
          {
            name: 'Pilot Deployment',
            duration: '2-3 weeks',
            description: 'Limited production deployment with monitoring.'
          },
          {
            name: 'Full Deployment',
            duration: '3-6 weeks',
            description: 'Organization-wide rollout in phases.'
          }
        ];

      case 'forescout':
        return [
          {
            name: 'Planning & Assessment',
            duration: '2-3 weeks',
            description: 'Network assessment and deployment architecture design.'
          },
          {
            name: 'Appliance Installation',
            duration: '1-2 weeks',
            description: 'Deploy physical or virtual appliances and establish communication.'
          },
          {
            name: 'Initial Configuration',
            duration: '1-2 weeks',
            description: 'Configure management access, licensing, and basic settings.'
          },
          {
            name: 'Network Integration',
            duration: '2-3 weeks',
            description: 'Set up SPAN ports, network access, and API integrations.'
          },
          {
            name: 'Discovery Configuration',
            duration: '1-2 weeks',
            description: 'Configure device discovery and classification mechanisms.'
          },
          {
            name: 'Policy Definition',
            duration: '2-3 weeks',
            description: 'Create compliance policies and enforcement actions.'
          },
          {
            name: 'Integration Testing',
            duration: '1-2 weeks',
            description: 'Test all integrations and policy enforcement.'
          },
          {
            name: 'Administrator Training',
            duration: '1 week',
            description: 'Train IT staff on management and operations.'
          },
          {
            name: 'Pilot Phase',
            duration: '2-3 weeks',
            description: 'Limited deployment with monitoring and adjustment.'
          },
          {
            name: 'Full Deployment',
            duration: '3-5 weeks',
            description: 'Organization-wide rollout in phases.'
          }
        ];

      default:
        return defaultPhases;
    }
  }
}

// Make available globally
window.ImplementationTimeline = ImplementationTimeline;

// Initialize the timeline when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const timeline = new ImplementationTimeline('implementation-timeline');

  // Generate timeline for Portnox by default
  if (timeline) {
    timeline.generate('portnox');
  }

  // Listen for vendor changes
  document.addEventListener('vendorsChanged', (e) => {
    const { vendor, added } = e.detail;

    // Update timeline when a vendor is selected
    if (added && timeline) {
      timeline.generate(vendor);
    }
  });
});
EOF
echo "Created implementation-timeline.js"

# Create a final cleanup and update script
echo "Creating final update script..."
cat > ./update_final.sh << 'EOF'
#!/bin/bash

echo "Performing final cleanup and updates..."

# Ensure all files have correct permissions
chmod -R 755 ./js
chmod -R 755 ./css

# Update script references in index.html
sed -i '' -e '/<script src="js\/main.js"><\/script>/i\
    <script src="js\/components\/implementation-timeline.js"><\/script>\
    <script src="js\/charts\/chart-controller.js"><\/script>\
    <script src="js\/components\/config-controller.js"><\/script>' index.html 2>/dev/null || sed -i '/<script src="js\/main.js"><\/script>/i\
    <script src="js\/components\/implementation-timeline.js"><\/script>\
    <script src="js\/charts\/chart-controller.js"><\/script>\
    <script src="js\/components\/config-controller.js"><\/script>' index.html

# Create missing directories if needed
mkdir -p img/vendors

# Verify JS and CSS integrity
echo "Verifying file integrity..."
if [ ! -f ./js/components/sidebar-controller.js ]; then
    echo "Error: sidebar-controller.js is missing!"
fi

if [ ! -f ./js/components/view-controller.js ]; then
    echo "Error: view-controller.js is missing!"
fi

if [ ! -f ./js/components/vendor-controller.js ]; then
    echo "Error: vendor-controller.js is missing!"
fi

if [ ! -f ./css/sidebar-layout.css ]; then
    echo "Error: sidebar-layout.css is missing!"
fi

if [ ! -f ./css/enhanced-ui.css ]; then
    echo "Error: enhanced-ui.css is missing!"
fi

# Check for vendor logos
if [ ! -d ./img/vendors ]; then
    echo "Warning: vendor logos directory is missing. Creating it now."
    mkdir -p ./img/vendors
fi

# Display success message
echo "Update complete! Please check for any errors above."
echo "You can now open index.html in your browser to view the updated Portnox Total Cost Analyzer."
EOF
chmod +x ./update_final.sh
echo "Created final update script"

echo "Notification and UI enhancement update complete."
echo "To perform final cleanup and updates, run the update_final.sh script."
read -p "Press any key to continue..." -n1 -s
echo
echo "=================================================================="

# Execute the final script
echo "Running final update script..."
./update_final.sh
