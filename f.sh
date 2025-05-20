#!/bin/bash

# Portnox Total Cost Analyzer Enhancement Script
# This script enhances the UI and functionality with a focus on fixing sidebar logo sizing

# Color definitions for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script constants
APP_ROOT="."
CSS_DIR="$APP_ROOT/css"
JS_DIR="$APP_ROOT/js"
COMPONENT_DIR="$JS_DIR/components"
BACKUP_DIR="$APP_ROOT/backups/$(date +%Y%m%d_%H%M%S)"

# Display banner
echo -e "${BLUE}=======================================================${NC}"
echo -e "${GREEN}   Portnox Total Cost Analyzer Enhancement Suite       ${NC}"
echo -e "${BLUE}=======================================================${NC}"
echo -e "${YELLOW}Fixing sidebar logo sizing and implementing enhancements${NC}"
echo -e "${BLUE}=======================================================${NC}"
echo ""

# Create backup of original files
mkdir -p "$BACKUP_DIR/css/components" "$BACKUP_DIR/js/components"
cp "$CSS_DIR/components/sidebar.css" "$BACKUP_DIR/css/components/"
cp "$COMPONENT_DIR/sidebar-manager.js" "$BACKUP_DIR/js/components/"

# Fix sidebar vendor cards with proper logo sizing
echo -e "${YELLOW}Fixing sidebar vendor logo sizing...${NC}"

# Update sidebar.css with fixed vendor card styling
cat > "$CSS_DIR/components/sidebar.css" << 'EOL'
/* 
 * Enhanced Sidebar Styling for Portnox Total Cost Analyzer
 * With fixed logo sizing and improved vendor selection cards
 */

/* Main sidebar container */
.sidebar {
  width: 360px;
  background-color: var(--card-background);
  box-shadow: 2px 0 15px var(--shadow-color);
  overflow-y: auto;
  transition: width 0.3s ease, background-color 0.3s ease;
  z-index: 100;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar.collapsed {
  width: 0;
}

/* Sidebar header */
.sidebar-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  color: white;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.sidebar-header h2 i {
  margin-right: 10px;
  font-size: 20px;
}

/* Sidebar content area (scrollable) */
.sidebar-content {
  padding: 15px;
  overflow-y: auto;
  flex: 1;
}

/* Sidebar footer */
.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border-color);
  background-color: var(--background-color);
}

/* Config cards */
.config-card {
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px var(--shadow-color);
  background-color: var(--card-background);
  transition: all 0.3s ease;
}

.config-card:hover {
  box-shadow: 0 5px 15px var(--shadow-color);
}

/* Config card header */
.config-card-header {
  padding: 12px 15px;
  background: linear-gradient(to right, var(--primary-color), var(--primary-dark-color));
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.config-card-header:hover {
  filter: brightness(1.1);
}

.config-card-header h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.config-card-header h3 i {
  margin-right: 10px;
  font-size: 16px;
}

.config-card-header .toggle-icon {
  transition: transform 0.3s ease;
}

.config-card-header .toggle-icon.collapsed {
  transform: rotate(180deg);
}

/* Config card content */
.config-card-content {
  padding: 15px;
  max-height: 1000px;
  overflow: hidden;
  transition: max-height 0.5s ease, padding 0.3s ease;
}

.config-card-content.collapsed {
  max-height: 0;
  padding: 0 15px;
}

/* Helper text */
.helper-text {
  font-size: 12px;
  color: var(--text-light);
  margin: 5px 0 15px;
  line-height: 1.5;
}

/* Vendor Selection Grid */
.vendor-select-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
  margin-top: 10px;
}

/* Fixed vendor card for sidebar with proper logo sizing */
.vendor-select-card {
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 80px;
}

.vendor-select-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 10px var(--shadow-color);
  border-color: var(--primary-color);
}

.vendor-select-card .vendor-logo {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.vendor-select-card .vendor-logo img {
  max-height: 30px;
  max-width: 100%;
  object-fit: contain;
}

.vendor-select-card .vendor-name {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Selected vendor styling */
.vendor-select-card.selected {
  border: 2px solid var(--primary-color);
  background-color: var(--highlight-background);
}

.vendor-select-card.selected:after {
  content: '\f00c';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  position: absolute;
  top: -8px;
  right: -8px;
  width: 18px;
  height: 18px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  box-shadow: 0 2px 5px var(--shadow-color);
}

/* Badge for vendor cards */
.vendor-select-card .badge {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 8px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.vendor-select-card .badge-primary {
  background-color: var(--primary-color);
  color: white;
}

.vendor-select-card .badge-warning {
  background-color: var(--warning-color);
  color: white;
}

.vendor-select-card .badge-danger {
  background-color: var(--error-color);
  color: white;
}

/* Advanced form styling */
.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: var(--input-background);
  color: var(--text-color);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-color-transparent);
  outline: none;
}

.form-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: var(--input-background);
  color: var(--text-color);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
}

.form-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-color-transparent);
  outline: none;
}

/* Range slider styling */
.range-slider {
  margin-bottom: 15px;
}

.range-slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.range-slider-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
}

.range-slider-value {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary-color);
}

input[type="range"] {
  width: 100%;
  height: 10px;
  -webkit-appearance: none;
  background: linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) 50%, var(--border-color) 50%, var(--border-color) 100%);
  border-radius: 5px;
  outline: none;
  padding: 0;
  margin: 0;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--primary-color);
  cursor: pointer;
  transition: all .3s ease-in-out;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: var(--primary-color);
  border-color: white;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--primary-color);
  cursor: pointer;
  transition: all .3s ease-in-out;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb:hover {
  background: var(--primary-color);
  border-color: white;
}

/* Checkbox styling */
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  margin-top: 10px;
}

.checkbox-item {
  display: flex;
  align-items: center;
}

.custom-checkbox {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.custom-checkbox input {
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  width: 18px;
  height: 18px;
  background-color: var(--input-background);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.custom-checkbox:hover .checkmark {
  border-color: var(--primary-color);
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Transition for sidebar toggle */
.sidebar-toggle {
  position: fixed;
  left: 360px;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--card-background);
  width: 28px;
  height: 56px;
  border-radius: 0 8px 8px 0;
  box-shadow: 2px 0 10px var(--shadow-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  border: 1px solid var(--border-color);
  border-left: none;
}

.sidebar-toggle:hover {
  background-color: var(--primary-color);
  color: white;
}

.sidebar-toggle.collapsed {
  left: 0;
}

.sidebar-toggle i {
  transition: transform 0.3s ease;
}

.sidebar-toggle.collapsed i {
  transform: rotate(180deg);
}

/* Selected vendor counter */
.vendor-counter {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  border-radius: 6px;
  background-color: var(--highlight-background);
  border: 1px dashed var(--primary-color);
}

.vendor-counter-icon {
  font-size: 16px;
  color: var(--primary-color);
  margin-right: 10px;
}

.vendor-counter-text {
  flex: 1;
  font-size: 13px;
  color: var(--text-color);
}

.vendor-counter-value {
  font-weight: 700;
  color: var(--primary-color);
  font-size: 15px;
  padding: 2px 8px;
  background-color: var(--card-background);
  border-radius: 4px;
  box-shadow: 0 1px 3px var(--shadow-color);
}

/* Calculate button styling */
.btn-calculate {
  position: relative;
  display: block;
  width: 100%;
  padding: 14px 20px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  color: white;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.btn-calculate:hover {
  background: linear-gradient(135deg, var(--primary-dark-color), var(--primary-color));
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.btn-calculate:active {
  transform: translateY(1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.btn-calculate i {
  margin-right: 10px;
}

/* Animation for ripple effect */
.btn-calculate:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.3);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.btn-calculate:hover:after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}

/* Responsive adaptations */
@media (max-width: 1024px) {
  .sidebar {
    width: 300px;
  }
  
  .sidebar-toggle {
    left: 300px;
  }
  
  .vendor-select-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 85%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar.active {
    transform: translateX(0);
  }
  
  .sidebar-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
  
  .sidebar-backdrop.active {
    opacity: 1;
    visibility: visible;
  }
  
  .sidebar-toggle {
    display: block;
    position: fixed;
    left: 0;
    top: 60px;
    width: 40px;
    height: 40px;
    border-radius: 0 8px 8px 0;
    box-shadow: 2px 0 10px var(--shadow-color);
    z-index: 1001;
  }
}
EOL

# Update sidebar-manager.js with fixes for vendor cards
echo -e "${YELLOW}Updating sidebar manager for proper vendor handling...${NC}"

cat > "$COMPONENT_DIR/sidebar-manager.js" << 'EOL'
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
EOL

# Create enhanced styles.css for better overall look
echo -e "${YELLOW}Creating enhanced styles for overall UI improvement...${NC}"

mkdir -p "$CSS_DIR/custom"
cat > "$CSS_DIR/custom/enhanced-styles.css" << 'EOL'
/* Enhanced styles for Portnox Total Cost Analyzer */

/* Dashboard metric cards */
.dashboard-card {
  background-color: var(--card-background);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.dashboard-card h3 {
  margin: 0 0 8px;
  font-size: 16px;
  color: var(--text-secondary);
}

.dashboard-card .metric-value {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 6px;
  color: var(--primary-color);
}

.dashboard-card .metric-label {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 10px;
}

.dashboard-card .metric-trend {
  font-size: 12px;
  display: flex;
  align-items: center;
  color: #2ecc71;
}

.dashboard-card .metric-trend i {
  margin-right: 5px;
}

/* Tabs styling */
.main-tabs, .results-tabs {
  display: flex;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 20px;
}

.main-tab, .results-tab {
  padding: 12px 18px;
  cursor: pointer;
  position: relative;
  font-weight: 600;
  color: var(--text-light);
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
}

.main-tab.active, .results-tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.main-tab:hover, .results-tab:hover {
  color: var(--primary-color);
  background-color: rgba(26, 90, 150, 0.05);
}

.main-tab i {
  margin-right: 8px;
}

/* Chart container styling */
.chart-container {
  background-color: var(--card-background);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.chart-container h3 {
  margin: 0 0 15px;
  font-size: 18px;
  color: var(--text-color);
}

/* Header styling */
.app-header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  padding: 15px 0;
  color: white;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.app-title h1 {
  margin: 0;
  font-size: 22px;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.app-title .subtitle {
  margin: 5px 0 0;
  font-size: 14px;
  opacity: 0.9;
}

/* Enhanced buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.btn-outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.btn i {
  margin-right: 6px;
}

/* Panel header styling */
.panel-header {
  margin-bottom: 25px;
}

.panel-header h2 {
  margin: 0 0 5px;
  font-size: 24px;
  color: var(--text-color);
}

.panel-header .subtitle {
  margin: 0;
  font-size: 16px;
  color: var(--text-light);
}

/* Executive summary panel styling */
.executive-summary h2, .executive-summary h3 {
  color: var(--primary-color);
}

.executive-summary .metric-value.highlight-value {
  color: var(--primary-color);
}

/* Benefits grid */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.benefit-card {
  background-color: var(--card-background);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.benefit-card .benefit-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(26, 90, 150, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

.benefit-card .benefit-icon i {
  font-size: 24px;
  color: var(--primary-color);
}

.benefit-card h4 {
  margin: 0 0 10px;
  font-size: 16px;
  color: var(--text-color);
}

.benefit-card p {
  margin: 0;
  font-size: 14px;
  color: var(--text-light);
}

/* Animations for dashboard cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dashboard-card {
  animation: fadeInUp 0.5s ease forwards;
}

.dashboard-card:nth-child(1) { animation-delay: 0.1s; }
.dashboard-card:nth-child(2) { animation-delay: 0.2s; }
.dashboard-card:nth-child(3) { animation-delay: 0.3s; }
.dashboard-card:nth-child(4) { animation-delay: 0.4s; }

/* Better table styling */
.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.data-table th {
  background-color: var(--primary-color);
  color: white;
  font-weight: 600;
  padding: 12px 15px;
  text-align: left;
}

.data-table td {
  padding: 12px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.01);
}

.data-table tr:hover td {
  background-color: rgba(26, 90, 150, 0.05);
}
EOL

# Update HTML file to include the new styles
echo -e "${YELLOW}Updating HTML to include enhanced styles...${NC}"

# Find index.html and add our custom CSS
INDEX_HTML=$(find "$APP_ROOT" -name "index.html" -type f | head -n 1)

if [ -f "$INDEX_HTML" ]; then
    # Use sed to add our custom CSS before the closing head tag
    sed -i '/<\/head>/i \    <link rel="stylesheet" href="css/custom/enhanced-styles.css">' "$INDEX_HTML"
    echo -e "${GREEN}Updated index.html with enhanced styles${NC}"
else
    echo -e "${RED}Could not find index.html - manual update required${NC}"
fi

echo -e "${GREEN}Sidebar logo sizing fixed and UI enhancements implemented!${NC}"
echo -e "${BLUE}A backup of the original files was created in: $BACKUP_DIR${NC}"
echo -e "${YELLOW}Refresh your browser to see the changes.${NC}"
