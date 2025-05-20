#!/bin/bash

# Focused Fix for Sidebar Issues and JS Integration
# This script targets specific sidebar functionality and JS initialization conflicts

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

echo -e "${BLUE}=======================================================${NC}"
echo -e "${GREEN}   Portnox Sidebar Functionality Fix                  ${NC}"
echo -e "${BLUE}=======================================================${NC}"
echo -e "${YELLOW}Fixing sidebar retraction and JS initialization conflicts${NC}"
echo -e "${BLUE}=======================================================${NC}"
echo ""

# Create backup directories
mkdir -p "$BACKUP_DIR/js/components" "$BACKUP_DIR/css"

# 1. Back up existing files
echo -e "${YELLOW}Creating backups of existing files...${NC}"
cp -r "$COMPONENT_DIR/sidebar-manager.js" "$BACKUP_DIR/js/components/" 2>/dev/null
cp "$JS_DIR/portnox-tco-analyzer.js" "$BACKUP_DIR/js/" 2>/dev/null
cp "$JS_DIR/index.js" "$BACKUP_DIR/js/" 2>/dev/null
cp "$JS_DIR/app-init.js" "$BACKUP_DIR/js/" 2>/dev/null
cp "$CSS_DIR/main.css" "$BACKUP_DIR/css/" 2>/dev/null
cp "$CSS_DIR/components/sidebar.css" "$BACKUP_DIR/css/" 2>/dev/null

# 2. Update sidebar-manager.js to fix expansion/collapse functionality
echo -e "${YELLOW}Updating sidebar-manager.js to fix expansion/collapse functionality...${NC}"

mkdir -p "$COMPONENT_DIR"
cat > "$COMPONENT_DIR/sidebar-manager.js" << 'EOL'
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
EOL

# 3. Fix the sidebar CSS to ensure proper retraction
echo -e "${YELLOW}Updating sidebar CSS to ensure proper retraction...${NC}"

mkdir -p "$CSS_DIR/components"
cat > "$CSS_DIR/components/sidebar.css" << 'EOL'
/* 
 * Fixed Sidebar Styling for Portnox Total Cost Analyzer
 * Ensures proper retraction and section expansion/collapse
 */

/* Main sidebar container */
.sidebar {
  width: 350px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: width 0.3s ease;
  z-index: 100;
  border-right: 1px solid #e0e0e0;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.sidebar.collapsed {
  width: 0;
  overflow: hidden;
}

.sidebar-header {
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
  background: linear-gradient(135deg, #1a5a96, #0d4275);
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
}

.sidebar-content {
  padding: 15px;
  overflow-y: auto;
  flex: 1;
}

.sidebar-footer {
  padding: 15px;
  border-top: 1px solid #e0e0e0;
  background-color: #f9fafb;
}

/* Config cards with fixed expansion/collapse */
.config-card {
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.config-card-header {
  padding: 12px 15px;
  background: linear-gradient(to right, #1a5a96, #0d4275);
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
}

.config-card-header .toggle-icon {
  transition: transform 0.3s ease;
}

.config-card-header .toggle-icon.collapsed {
  transform: rotate(180deg);
}

/* Fixed content area for proper expansion/collapse */
.config-card-content {
  padding: 15px;
  max-height: 1000px;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  background-color: #fff;
}

.config-card-content.collapsed {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

/* Helper text */
.helper-text {
  font-size: 12px;
  color: #666;
  margin: 5px 0 10px;
}

/* Vendor Selection Grid with fixed sizing */
.vendor-select-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
  margin-top: 10px;
}

/* Fixed vendor card styling */
.vendor-select-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 8px 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
}

.vendor-select-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #1a5a96;
}

/* Fixed logo container with strict size constraints */
.vendor-select-card .vendor-logo {
  height: 40px;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

/* Fixed logo sizing */
.vendor-select-card .vendor-logo img {
  max-height: 28px;
  max-width: 80px;
  object-fit: contain;
}

/* Fixed vendor name styling */
.vendor-select-card .vendor-name {
  font-size: 11px;
  font-weight: 600;
  color: #333;
  margin: 0;
  max-width: 95%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

/* Selected vendor styling */
.vendor-select-card.selected {
  border: 2px solid #1a5a96;
  background-color: rgba(26, 90, 150, 0.05);
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
  background-color: #1a5a96;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Badge for vendor cards */
.vendor-select-card .badge {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 8px;
  padding: 2px 6px;
  border-radius: 8px;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.badge-primary {
  background-color: #1a5a96;
  color: white;
}

.badge-warning {
  background-color: #f39c12;
  color: white;
}

.badge-danger {
  background-color: #e74c3c;
  color: white;
}

/* Vendor counter styling */
.vendor-counter {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: rgba(26, 90, 150, 0.05);
  border: 1px dashed #1a5a96;
}

.vendor-counter-icon {
  color: #1a5a96;
  margin-right: 8px;
}

.vendor-counter-text {
  flex: 1;
  font-size: 12px;
  color: #333;
}

.vendor-counter-value {
  font-weight: 700;
  color: #1a5a96;
  font-size: 14px;
  padding: 2px 8px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Fixed sidebar toggle for proper retraction */
.sidebar-toggle {
  position: fixed;
  left: 350px;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  width: 24px;
  height: 50px;
  border-radius: 0 8px 8px 0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: left 0.3s ease;
  z-index: 99;
  border: 1px solid #e0e0e0;
  border-left: none;
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

/* Calculate button */
.btn-calculate {
  width: 100%;
  padding: 12px 20px;
  background: linear-gradient(135deg, #1a5a96, #0d4275);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.btn-calculate:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.btn-calculate i {
  margin-right: 8px;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: -350px;
    z-index: 1000;
    transition: transform 0.3s ease;
  }
  
  .sidebar.active {
    transform: translateX(350px);
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
    top: 70px;
    border-radius: 0 4px 4px 0;
    width: 30px;
    height: 40px;
  }
}
EOL

# 4. Fix app initialization conflict by updating index.js
echo -e "${YELLOW}Fixing JS initialization conflicts...${NC}"

cat > "$JS_DIR/index.js" << 'EOL'
/**
 * Main Entry Point for Portnox Total Cost Analyzer
 * Modified to integrate with existing code without conflicts
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Portnox Total Cost Analyzer enhancements...');
  
  // Check if the main application is initialized
  if (window.App) {
    console.log('Main application found, integrating enhancements...');
    
    // Add dark mode support if not already present
    if (!window.hasOwnProperty('themeManager')) {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDarkMode && !localStorage.getItem('theme')) {
        document.body.classList.add('dark-mode');
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themechange', {
          detail: { theme: 'dark' }
        }));
      }
    }
    
    // Make sure sidebar manager is initialized
    if (!window.sidebarManager || !window.sidebarManager.initialized) {
      console.log('Re-initializing sidebar manager...');
      window.sidebarManager = new SidebarManager();
    }
    
    console.log('Portnox Total Cost Analyzer enhancements initialized successfully');
  } else {
    console.log('Waiting for main application to initialize...');
    
    // Listen for the main app initialization
    window.addEventListener('appInitialized', () => {
      console.log('Main application initialized, now applying enhancements');
      // Re-initialize sidebar manager when main app is ready
      if (!window.sidebarManager || !window.sidebarManager.initialized) {
        window.sidebarManager = new SidebarManager();
      }
    });
  }
});
EOL

# 5. Update portnox-tco-analyzer.js to integrate with other components
echo -e "${YELLOW}Updating main app initialization to work with sidebar-manager...${NC}"

# First check if the file exists
if [ -f "$JS_DIR/portnox-tco-analyzer.js" ]; then
  # Create a temporary file
  TMP_FILE=$(mktemp)
  
  # Update the file to properly integrate with sidebar-manager
  cat "$JS_DIR/portnox-tco-analyzer.js" | 
  sed '/Portnox TCO Analyzer initialized successfully/a \
    // Dispatch event for other components to know we are ready\
    window.dispatchEvent(new CustomEvent("appInitialized"));' > "$TMP_FILE"
  
  # Replace the original file
  mv "$TMP_FILE" "$JS_DIR/portnox-tco-analyzer.js"
  
  echo -e "${GREEN}Main app initialization updated successfully${NC}"
else
  echo -e "${YELLOW}portnox-tco-analyzer.js not found, creating integration compatibility file...${NC}"
  
  # Create a minimal compatibility file
  cat > "$JS_DIR/portnox-tco-analyzer.js" << 'EOL'
/**
 * Portnox TCO Analyzer Integration Compatibility
 * This ensures components work together if the main file is elsewhere
 */

// Create a minimal App object if not exists
if (!window.App) {
  window.App = {
    init: function() {
      console.log('Initializing Portnox TCO Analyzer...');
      
      // Setup essential state
      this.state = {
        results: null,
        config: {},
        uiState: {
          activeView: 'executive',
          activePanels: {}
        }
      };
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Initialize UI state
      this.initUIState();
      
      console.log('Portnox TCO Analyzer initialized successfully');
      
      // Dispatch event for other components to know we are ready
      window.dispatchEvent(new CustomEvent("appInitialized"));
      
      return true;
    },
    
    setupEventListeners: function() {
      console.log('Setting up event listeners...');
      
      // Set up tab switching
      document.querySelectorAll('.main-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
          const view = tab.dataset.view;
          this.switchView(view);
        });
      });
      
      // Set up vendor selection change listener
      document.addEventListener('vendorSelectionChanged', (event) => {
        const { selectedVendors } = event.detail;
        this.state.selectedVendors = selectedVendors;
      });
      
      console.log('Event listeners set up successfully.');
    },
    
    initUIState: function() {
      console.log('Initializing UI state...');
      
      // Set initial selected vendors
      if (window.sidebarManager) {
        this.state.selectedVendors = window.sidebarManager.getSelectedVendors();
      } else {
        this.state.selectedVendors = ['portnox'];
      }
      
      // Set initial active view
      const activeTab = document.querySelector('.main-tab.active');
      if (activeTab) {
        this.state.uiState.activeView = activeTab.dataset.view;
      }
      
      console.log('UI state initialized successfully.');
    },
    
    switchView: function(view) {
      // Update active tab
      document.querySelectorAll('.main-tab').forEach(tab => {
        if (tab.dataset.view === view) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
      
      // Update active view panel
      document.querySelectorAll('.view-panel').forEach(panel => {
        if (panel.dataset.view === view) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
      
      // Update UI state
      this.state.uiState.activeView = view;
      
      // Trigger view changed event
      document.dispatchEvent(new CustomEvent('viewChanged', {
        detail: { view }
      }));
    }
  };
  
  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }
}
EOL

  echo -e "${GREEN}Integration compatibility file created${NC}"
fi

# 6. Update app-init.js to avoid conflicts
echo -e "${YELLOW}Updating app-init.js to avoid initialization conflicts...${NC}"

if [ -f "$JS_DIR/app-init.js" ]; then
  cat > "$JS_DIR/app-init.js" << 'EOL'
/**
 * Main Application Initialization for Portnox Total Cost Analyzer
 * Modified to integrate with existing code and avoid conflicts
 */

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Portnox Total Cost Analyzer additional components...');
  
  // Check if main app is already initialized
  if (!window.appInitCalled) {
    window.appInitCalled = true;
    
    // Initialize sidebar if not already done
    initializeSidebar();
    
    // Initialize UI enhancements
    initializeUI();
    
    // Initialize event listeners that don't conflict
    initializeAdditionalEvents();
    
    console.log('Additional components initialized successfully');
  }
});

/**
 * Initialize sidebar with proper vendor cards
 */
function initializeSidebar() {
  // Fix vendor logos immediately
  fixVendorLogos();
  
  // Create sidebar manager if not already initialized
  if (!window.sidebarManager) {
    window.sidebarManager = new SidebarManager();
  } else if (!window.sidebarManager.initialized) {
    window.sidebarManager.init();
  }
}

/**
 * Fix vendor logos immediately
 */
function fixVendorLogos() {
  const vendorCards = document.querySelectorAll('.vendor-select-card');
  
  vendorCards.forEach(card => {
    const logoImg = card.querySelector('.vendor-logo img');
    if (logoImg) {
      // Apply important styling to override any inline styles
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
 * Initialize UI enhancements
 */
function initializeUI() {
  // Add fade-in animation to dashboard cards
  const dashboardCards = document.querySelectorAll('.dashboard-card');
  dashboardCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 100}ms`;
    if (!card.classList.contains('animate-fadeIn')) {
      card.classList.add('animate-fadeIn');
    }
  });
  
  // Add fade-in animation to chart containers
  const chartContainers = document.querySelectorAll('.chart-container');
  chartContainers.forEach((container, index) => {
    container.style.animationDelay = `${300 + (index * 100)}ms`;
    if (!container.classList.contains('animate-fadeIn')) {
      container.classList.add('animate-fadeIn');
    }
  });
  
  // Enhance tabs with hover effects
  const tabs = document.querySelectorAll('.main-tab, .results-tab');
  tabs.forEach(tab => {
    // Only add event listener if not already added
    if (!tab.hasHoverEffect) {
      tab.hasHoverEffect = true;
      
      tab.addEventListener('mouseenter', () => {
        if (!tab.classList.contains('active')) {
          tab.style.backgroundColor = 'rgba(26, 90, 150, 0.05)';
        }
      });
      
      tab.addEventListener('mouseleave', () => {
        if (!tab.classList.contains('active')) {
          tab.style.backgroundColor = '';
        }
      });
    }
  });
}

/**
 * Initialize additional events that don't conflict
 */
function initializeAdditionalEvents() {
  // Handle dark mode toggle if not already handled
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle && !darkModeToggle.hasEventListener) {
    darkModeToggle.hasEventListener = true;
    
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      
      // Dispatch theme change event
      const isDarkMode = document.body.classList.contains('dark-mode');
      window.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme: isDarkMode ? 'dark' : 'light' }
      }));
    });
  }
}
EOL
  echo -e "${GREEN}app-init.js updated successfully${NC}"
else
  echo -e "${YELLOW}app-init.js not found, skipping update${NC}"
fi

# 7. Create emergency fix for sidebar in main CSS
echo -e "${YELLOW}Creating emergency fixes for sidebar in main CSS...${NC}"

if [ -f "$CSS_DIR/main.css" ]; then
  # Create a temporary file
  TMP_FILE=$(mktemp)
  
  # Add emergency sidebar fixes to main.css
  cat "$CSS_DIR/main.css" | sed '/\/\* === Sidebar === \*\//a \
\
/* Emergency fixes for sidebar */\
.sidebar {\
  z-index: 99 !important;\
  position: relative !important;\
}\
\
.sidebar.collapsed {\
  width: 0 !important;\
  overflow: hidden !important;\
}\
\
.content-area {\
  transition: margin-left 0.3s ease !important;\
}\
\
.content-area.expanded {\
  margin-left: 0 !important;\
}\
\
.sidebar-toggle {\
  position: fixed !important;\
  z-index: 99 !important;\
  transition: left 0.3s ease !important;\
}\
\
.sidebar-toggle.collapsed {\
  left: 0 !important;\
}\
\
/* Fix for vendor cards in sidebar */\
.vendor-select-card .vendor-logo img {\
  max-height: 28px !important;\
  max-width: 80px !important;\
  object-fit: contain !important;\
}\
\
.vendor-select-card {\
  height: 80px !important;\
  padding: 8px 4px !important;\
}\
\
.vendor-select-card .vendor-name {\
  font-size: 11px !important;\
  white-space: nowrap !important;\
  overflow: hidden !important;\
  text-overflow: ellipsis !important;\
  max-width: 95% !important;\
  text-align: center !important;\
}\
\
/* Config card expansion/collapse fix */\
.config-card-content {\
  transition: max-height 0.3s ease, padding 0.3s ease !important;\
  overflow: hidden !important;\
}\
\
.config-card-content.collapsed {\
  max-height: 0 !important;\
  padding-top: 0 !important;\
  padding-bottom: 0 !important;\
  overflow: hidden !important;\
}' > "$TMP_FILE"
  
  # Replace the original file
  mv "$TMP_FILE" "$CSS_DIR/main.css"
  
  echo -e "${GREEN}Main CSS updated with emergency sidebar fixes${NC}"
else
  echo -e "${RED}main.css not found, creating new file with fixes...${NC}"
  
  # Create a minimal CSS file with fixes
  mkdir -p "$CSS_DIR"
  cat > "$CSS_DIR/emergency-fixes.css" << 'EOL'
/**
 * Emergency fixes for sidebar and vendor cards
 */

/* Fix sidebar retraction */
.sidebar {
  z-index: 99 !important;
  position: relative !important;
  width: 350px !important;
  transition: width 0.3s ease !important;
}

.sidebar.collapsed {
  width: 0 !important;
  overflow: hidden !important;
}

.content-area {
  transition: margin-left 0.3s ease !important;
  margin-left: 350px !important;
}

.content-area.expanded {
  margin-left: 0 !important;
}

.sidebar-toggle {
  position: fixed !important;
  z-index: 99 !important;
  transition: left 0.3s ease !important;
  left: 350px !important;
}

.sidebar-toggle.collapsed {
  left: 0 !important;
}

/* Fix vendor cards in sidebar */
.vendor-select-card .vendor-logo img {
  max-height: 28px !important;
  max-width: 80px !important;
  object-fit: contain !important;
}

.vendor-select-card {
  height: 80px !important;
  padding: 8px 4px !important;
}

.vendor-select-card .vendor-name {
  font-size: 11px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  max-width: 95% !important;
  text-align: center !important;
}

/* Fix config card expansion/collapse */
.config-card-content {
  transition: max-height 0.3s ease, padding 0.3s ease !important;
  overflow: hidden !important;
  max-height: 1000px !important;
}

.config-card-content.collapsed {
  max-height: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  overflow: hidden !important;
}
EOL

  # Find index.html to add this CSS
  INDEX_HTML=$(find "$APP_ROOT" -name "index.html" -type f | head -n 1)
  if [ -f "$INDEX_HTML" ]; then
    # Create a temporary file
    TMP_FILE=$(mktemp)
    
    # Add our emergency CSS
    sed '/<\/head>/i \    <link rel="stylesheet" href="css/emergency-fixes.css">' "$INDEX_HTML" > "$TMP_FILE"
    
    # Replace the original
    mv "$TMP_FILE" "$INDEX_HTML"
    
    echo -e "${GREEN}Added emergency CSS to index.html${NC}"
  else
    echo -e "${RED}Could not find index.html to add emergency CSS${NC}"
  fi
fi

# 8. Add emergency JS fix directly to HTML
echo -e "${YELLOW}Adding emergency JS fix to HTML...${NC}"

# Find index.html
INDEX_HTML=$(find "$APP_ROOT" -name "index.html" -type f | head -n 1)
if [ -f "$INDEX_HTML" ]; then
  # Create a temporary file
  TMP_FILE=$(mktemp)
  
  # Add emergency sidebar fix script before closing body tag
  sed '/<\/body>/i \
    <script>\
      // Emergency sidebar fix\
      document.addEventListener("DOMContentLoaded", function() {\
        // Fix sidebar toggle button\
        const sidebarToggleButtons = document.querySelectorAll(".sidebar-toggle, #sidebar-toggle");\
        const sidebar = document.getElementById("sidebar");\
        const contentArea = document.querySelector(".content-area");\
        \
        if (sidebar && contentArea) {\
          sidebarToggleButtons.forEach(function(sidebarToggle) {\
            if (sidebarToggle) {\
              sidebarToggle.addEventListener("click", function(e) {\
                e.preventDefault();\
                sidebar.classList.toggle("collapsed");\
                sidebarToggle.classList.toggle("collapsed");\
                contentArea.classList.toggle("expanded");\
                console.log("Emergency sidebar toggle executed");\
              });\
            }\
          });\
        }\
        \
        // Fix vendor cards\
        const vendorCards = document.querySelectorAll(".vendor-select-card");\
        vendorCards.forEach(function(card) {\
          const logoImg = card.querySelector(".vendor-logo img");\
          if (logoImg) {\
            logoImg.style.cssText = "max-height: 28px !important; max-width: 80px !important; object-fit: contain !important;";\
          }\
          \
          card.style.cssText = "height: 80px !important; padding: 8px 4px !important;";\
          \
          const nameElement = card.querySelector(".vendor-name");\
          if (nameElement) {\
            nameElement.style.cssText = "font-size: 11px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; max-width: 95% !important; text-align: center !important;";\
          }\
        });\
      });\
    </script>' "$INDEX_HTML" > "$TMP_FILE"
  
  # Replace the original
  mv "$TMP_FILE" "$INDEX_HTML"
  
  echo -e "${GREEN}Added emergency JS fix to index.html${NC}"
else
  echo -e "${RED}Could not find index.html to add emergency JS fix${NC}"
fi

echo -e "${GREEN}Sidebar functionality fixed successfully!${NC}"
echo -e "${BLUE}A backup of the original files was created in: $BACKUP_DIR${NC}"
echo -e "${YELLOW}Refresh your browser to see the fixed sidebar and proper section expansion/collapse.${NC}"
