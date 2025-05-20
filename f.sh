#!/bin/bash
# Fix Portnox Total Cost Analyzer Sidebar Issues
# This script focuses on fixing the sidebar vendor logo sizing issues

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
HTML_DIR="$APP_ROOT"
COMPONENT_DIR="$JS_DIR/components"

# Create backups
BACKUP_DIR="$APP_ROOT/backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR/css/components" "$BACKUP_DIR/js/components" "$BACKUP_DIR/html"

echo -e "${BLUE}=======================================================${NC}"
echo -e "${GREEN}   Portnox Sidebar Fix - Direct Code Update           ${NC}"
echo -e "${BLUE}=======================================================${NC}"
echo -e "${YELLOW}Fixing sidebar vendor card and logo sizing issues     ${NC}"
echo -e "${BLUE}=======================================================${NC}"

# Back up files before modifying
echo -e "${YELLOW}Backing up files...${NC}"
cp "$CSS_DIR/components/sidebar.css" "$BACKUP_DIR/css/components/" 2>/dev/null || echo "No sidebar.css found to backup"
cp "$COMPONENT_DIR/sidebar-manager.js" "$BACKUP_DIR/js/components/" 2>/dev/null || echo "No sidebar-manager.js found to backup"
cp "$HTML_DIR/index.html" "$BACKUP_DIR/html/" 2>/dev/null || echo "No index.html found to backup"

# Create directories if they don't exist
mkdir -p "$CSS_DIR/components"
mkdir -p "$COMPONENT_DIR"

# 1. Fix sidebar CSS with precise vendor card and logo sizing
echo -e "${YELLOW}Updating sidebar CSS with fixed vendor card and logo styling...${NC}"
cat > "$CSS_DIR/components/sidebar.css" << 'EOL'
/* Sidebar styling with fixed vendor card and logo sizing */
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

/* Config cards */
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

.config-card-content {
  padding: 15px;
  max-height: 1000px;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.config-card-content.collapsed {
  max-height: 0;
  padding: 0 15px;
}

/* FIXED: Vendor Selection Grid with proper sizing */
.vendor-select-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
  margin-top: 10px;
}

/* FIXED: Vendor card styling with proper constraints */
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
  height: 80px;
  overflow: hidden;
}

.vendor-select-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #1a5a96;
}

/* FIXED: Logo container with strict size constraints */
.vendor-select-card .vendor-logo {
  height: 40px;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

/* FIXED: Proper logo sizing */
.vendor-select-card .vendor-logo img {
  max-height: 28px;
  max-width: 80px;
  object-fit: contain;
}

/* Vendor name with proper sizing */
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

/* Fixed vendor description below name */
.vendor-select-card .vendor-description {
  font-size: 9px;
  color: #666;
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
  top: -6px;
  right: -6px;
  width: 16px;
  height: 16px;
  background-color: #1a5a96;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

/* Helper text */
.helper-text {
  font-size: 12px;
  color: #666;
  margin: 5px 0 10px;
}

/* Form styling */
.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
}

.form-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
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
}

.range-slider-value {
  font-size: 13px;
  font-weight: 600;
  color: #1a5a96;
}

input[type="range"] {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  background: linear-gradient(to right, #1a5a96 0%, #1a5a96 50%, #e0e0e0 50%, #e0e0e0 100%);
  border-radius: 3px;
  outline: none;
  padding: 0;
  margin: 10px 0;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  border: 2px solid #1a5a96;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  border: 2px solid #1a5a96;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Checkbox styling */
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  margin-top: 5px;
}

.checkbox-item {
  display: flex;
  align-items: center;
}

.checkbox-item span {
  margin-left: 8px;
  font-size: 12px;
}

/* Sidebar toggle button */
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

/* Mobile responsive */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 280px;
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
    top: 70px;
    border-radius: 0 4px 4px 0;
    width: 30px;
    height: 40px;
  }
}
EOL

# 2. Ensure vendor cards render properly with controlled logo sizes in HTML
echo -e "${YELLOW}Updating HTML index file to ensure proper vendor card rendering...${NC}"

# Find index.html file
INDEX_HTML=$(find "$HTML_DIR" -name "index.html" -type f | head -n 1)

if [ -f "$INDEX_HTML" ]; then
  # Create a temporary file
  TMP_FILE=$(mktemp)
  
  # Add CSS variable definitions to head section
  sed '/<\/head>/i \
    <style>\
      :root {\
        --primary-color: #1a5a96;\
        --primary-dark-color: #0d4275;\
        --highlight-background: rgba(26, 90, 150, 0.05);\
      }\
      /* Fix for vendor cards in sidebar */\
      .vendor-select-card .vendor-logo img {\
        max-height: 28px !important;\
        max-width: 80px !important;\
        object-fit: contain !important;\
      }\
      .vendor-select-card {\
        height: 80px !important;\
        padding: 8px 4px !important;\
      }\
      .vendor-select-card .vendor-name {\
        font-size: 11px !important;\
        white-space: nowrap !important;\
        overflow: hidden !important;\
        text-overflow: ellipsis !important;\
      }\
    </style>' "$INDEX_HTML" > "$TMP_FILE"
  
  # Replace the original with our modified version
  mv "$TMP_FILE" "$INDEX_HTML"
  
  echo -e "${GREEN}Successfully updated index.html${NC}"
else
  echo -e "${RED}Could not find index.html - some changes were not applied${NC}"
fi

# 3. Update sidebar-manager.js to ensure proper handling of vendor selection
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
    
    // Fix vendor logos if they're too big
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
        // Ensure proper sizing
        logoImg.style.maxHeight = '28px';
        logoImg.style.maxWidth = '80px';
        logoImg.style.objectFit = 'contain';
      }
      
      // Fix card height
      card.style.height = '80px';
      card.style.padding = '8px 4px';
      
      // Fix vendor name
      const nameElement = card.querySelector('.vendor-name');
      if (nameElement) {
        nameElement.style.fontSize = '11px';
        nameElement.style.whiteSpace = 'nowrap';
        nameElement.style.overflow = 'hidden';
        nameElement.style.textOverflow = 'ellipsis';
        nameElement.style.maxWidth = '95%';
        nameElement.style.textAlign = 'center';
      }
    });
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
    
    slider.style.background = `linear-gradient(to right, #1a5a96 0%, #1a5a96 ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
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

# 4. Create CSS for immediate logo fixes (applied via JavaScript)
echo -e "${YELLOW}Creating logo fix script to be immediately applied...${NC}"

cat > "$JS_DIR/vendor-logo-fix.js" << 'EOL'
/**
 * Immediate fix for vendor logos in sidebar
 */
(function fixVendorLogos() {
  // Function to fix vendor logos
  function applyLogoFixes() {
    const vendorCards = document.querySelectorAll('.vendor-select-card');
    
    vendorCards.forEach(card => {
      const logoImg = card.querySelector('.vendor-logo img');
      if (logoImg) {
        // Ensure proper sizing - important flags to override any inline styles
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
  
  // Apply fixes immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLogoFixes);
  } else {
    applyLogoFixes();
  }
  
  // Also apply fixes after any updates to the DOM
  const observer = new MutationObserver(function(mutations) {
    applyLogoFixes();
  });
  
  // Start observing once the DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
EOL

# 5. Add the logo fix script to the HTML
if [ -f "$INDEX_HTML" ]; then
  # Create a temporary file
  TMP_FILE=$(mktemp)
  
  # Add our script right before the closing body tag
  sed '/<\/body>/i \    <script src="js/vendor-logo-fix.js"></script>' "$INDEX_HTML" > "$TMP_FILE"
  
  # Replace the original with our modified version
  mv "$TMP_FILE" "$INDEX_HTML"
  
  echo -e "${GREEN}Added logo fix script to index.html${NC}"
else
  echo -e "${RED}Could not find index.html to add logo fix script${NC}"
fi

echo -e "${GREEN}Sidebar fixes applied successfully!${NC}"
echo -e "${BLUE}A backup of the original files was created in: $BACKUP_DIR${NC}"
echo -e "${YELLOW}Refresh your browser to see the changes.${NC}"
