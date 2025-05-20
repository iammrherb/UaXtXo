#!/bin/bash

# ================================================================
# Portnox Total Cost Analyzer - Layout and Sidebar Fix Script
# ================================================================
# This script fixes layout issues, sidebar toggle functionality,
# and cost configuration panel expansion/collapse
# ================================================================

# Color definitions for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Script constants
REPO_DIR="$(pwd)"
JS_DIR="$REPO_DIR/js"
CSS_DIR="$REPO_DIR/css"
COMPONENTS_DIR="$JS_DIR/components"
HTML_DIR="$REPO_DIR"
BACKUP_DIR="$REPO_DIR/backups/layout_fix_$(date +%Y%m%d_%H%M%S)"

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Portnox Total Cost Analyzer - Layout and Sidebar Fix Script ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}Fixing layout issues, sidebar toggle, and cost configuration${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo ""

# Function to check if a directory exists, if not create it
check_dir() {
  if [ ! -d "$1" ]; then
    mkdir -p "$1"
    echo -e "${YELLOW}Created directory: $1${NC}"
  fi
}

# Create backup directories
mkdir -p "$BACKUP_DIR/js/components" "$BACKUP_DIR/css" "$BACKUP_DIR/html"

# Create/check required directories
check_dir "$JS_DIR"
check_dir "$COMPONENTS_DIR"
check_dir "$CSS_DIR"

# Backup existing files
echo -e "${CYAN}Creating backups of existing files...${NC}"
if [ -f "$COMPONENTS_DIR/sidebar-manager.js" ]; then
  cp "$COMPONENTS_DIR/sidebar-manager.js" "$BACKUP_DIR/js/components/"
  echo -e "${GREEN}Backed up sidebar-manager.js${NC}"
fi

if [ -f "$CSS_DIR/layout.css" ]; then
  cp "$CSS_DIR/layout.css" "$BACKUP_DIR/css/"
  echo -e "${GREEN}Backed up layout.css${NC}"
fi

if [ -f "$CSS_DIR/sidebar.css" ]; then
  cp "$CSS_DIR/sidebar.css" "$BACKUP_DIR/css/"
  echo -e "${GREEN}Backed up sidebar.css${NC}"
fi

if [ -f "$HTML_DIR/index.html" ]; then
  cp "$HTML_DIR/index.html" "$BACKUP_DIR/html/"
  echo -e "${GREEN}Backed up index.html${NC}"
fi

# Step 1: Fix layout CSS
echo -e "${CYAN}Creating/updating enhanced layout CSS...${NC}"
cat > "$CSS_DIR/layout-enhanced.css" << 'EOL'
/**
 * Enhanced Layout Styles for Portnox Total Cost Analyzer
 * Fixes layout issues and improves responsiveness
 */

/* App Container */
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow: hidden;
    background-color: #f7f9fc;
    position: relative;
    z-index: 1;
}

/* Header Styles */
.app-header {
    width: 100%;
    height: 70px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    position: relative;
    z-index: 100;
}

.particles-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    position: relative;
    z-index: 10;
}

.logo-section {
    display: flex;
    align-items: center;
}

.company-logo {
    height: 36px;
    margin-right: 15px;
}

.app-title {
    display: flex;
    flex-direction: column;
}

.app-title h1 {
    font-size: 18px;
    font-weight: 700;
    color: #1a5a96;
    margin: 0;
}

.app-title .subtitle {
    font-size: 12px;
    color: #64748b;
    margin: 0;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* Main Content Layout */
.main-content {
    display: flex;
    flex: 1;
    position: relative;
    overflow: hidden;
    min-height: calc(100vh - 70px);
}

/* Sidebar */
.sidebar {
    width: 320px;
    min-width: 320px;
    max-width: 320px;
    flex-shrink: 0;
    background-color: white;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
    overflow-y: auto;
    height: calc(100vh - 70px);
    z-index: 50;
    transition: width 0.3s ease, min-width 0.3s ease, max-width 0.3s ease, transform 0.3s ease;
    padding: 20px 0;
}

.sidebar.collapsed {
    width: 0 !important;
    min-width: 0 !important;
    max-width: 0 !important;
    padding: 0;
    overflow: hidden;
}

/* Sidebar Toggle */
.sidebar-toggle {
    position: absolute;
    left: 320px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 60px;
    background: white;
    border-radius: 0 8px 8px 0;
    box-shadow: 3px 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 60;
    transition: left 0.3s ease;
    border: 1px solid #e0e0e0;
    border-left: none;
}

.sidebar-toggle.collapsed {
    left: 0;
}

.sidebar-toggle i {
    color: #1a5a96;
    transition: transform 0.3s ease;
}

.sidebar-toggle.collapsed i {
    transform: rotate(180deg);
}

/* Content Area */
.content-area {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    height: calc(100vh - 70px);
    transition: margin-left 0.3s ease;
    position: relative;
}

.content-area.expanded {
    margin-left: 0 !important;
}

/* View Panels */
.view-panel {
    display: none;
    background-color: #f7f9fc;
    border-radius: 10px;
    overflow: hidden;
}

.view-panel.active {
    display: block;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* Main Tabs Navigation */
.main-tabs {
    display: flex;
    background: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    margin-bottom: 20px;
}

.main-tab {
    padding: 15px 20px;
    font-size: 15px;
    font-weight: 600;
    color: #64748b;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
}

.main-tab i {
    margin-right: 8px;
}

.main-tab:hover {
    color: #1a5a96;
    background-color: rgba(26, 90, 150, 0.05);
}

.main-tab.active {
    color: #1a5a96;
    background-color: rgba(26, 90, 150, 0.07);
}

.main-tab.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(to right, #1a5a96, #0d4275);
}

/* Loading Overlay */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.loading-overlay.active {
    opacity: 1;
    visibility: visible;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #1a5a96;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading-message {
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-top: 20px;
    text-align: center;
}

/* Media Queries for Responsive Design */
@media (max-width: 1200px) {
    .app-title h1 {
        font-size: 16px;
    }
    
    .app-title .subtitle {
        font-size: 11px;
    }
    
    .company-logo {
        height: 32px;
    }
}

@media (max-width: 992px) {
    .sidebar {
        position: fixed;
        left: -320px;
        top: 70px;
        transition: left 0.3s ease;
        z-index: 1000;
    }
    
    .sidebar.active {
        left: 0;
    }
    
    .sidebar-toggle {
        left: 0;
        top: 90px;
        border-radius: 0 8px 8px 0;
    }
    
    .sidebar-toggle.active {
        left: 320px;
    }
    
    .content-area {
        margin-left: 0 !important;
        width: 100%;
    }
    
    .header-actions .btn span {
        display: none;
    }
}

@media (max-width: 576px) {
    .app-title h1 {
        font-size: 14px;
    }
    
    .app-title .subtitle {
        display: none;
    }
    
    .company-logo {
        height: 28px;
    }
    
    .header-actions {
        gap: 5px;
    }
    
    .content-area {
        padding: 10px;
    }
    
    .main-tab {
        padding: 12px 15px;
        font-size: 13px;
    }
    
    .main-tab i {
        margin-right: 5px;
        font-size: 12px;
    }
}
EOL

echo -e "${GREEN}Created/updated enhanced layout CSS${NC}"

# Step 2: Fix sidebar CSS
echo -e "${CYAN}Creating/updating enhanced sidebar CSS...${NC}"
cat > "$CSS_DIR/sidebar-enhanced.css" << 'EOL'
/**
 * Enhanced Sidebar Styles for Portnox Total Cost Analyzer
 * Fixes issues with sidebar and cost configuration
 */

/* Sidebar Styles */
.sidebar {
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
}

.sidebar-header {
    padding: 0 20px 15px 20px;
    border-bottom: 1px solid #edf2f7;
}

.sidebar-header h2 {
    font-size: 18px;
    font-weight: 700;
    color: #2d3748;
    margin: 0 0 5px 0;
}

.sidebar-header p {
    font-size: 13px;
    color: #64748b;
    margin: 0;
}

.sidebar-content {
    flex: 1;
    overflow-y: auto;
    padding: 0 20px;
}

/* Configuration Cards */
.config-card {
    background-color: white;
    border-radius: 8px;
    margin-top: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    border: 1px solid #edf2f7;
}

.config-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #f8fafc;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.config-card-header:hover {
    background-color: #f1f5f9;
}

.config-card-header h3 {
    font-size: 15px;
    font-weight: 600;
    color: #334155;
    margin: 0;
    display: flex;
    align-items: center;
}

.config-card-header h3 i {
    margin-right: 8px;
    color: #1a5a96;
}

.toggle-icon {
    color: #64748b;
    transition: transform 0.3s ease;
}

.toggle-icon.collapsed {
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
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
}

/* Range Sliders */
.range-slider {
    margin-bottom: 15px;
}

.range-slider-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}

.range-slider-label {
    font-size: 13px;
    color: #4a5568;
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
    border-radius: 5px;
    background: #e2e8f0;
    outline: none;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #1a5a96;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}

/* Vendor Selection */
.vendor-select-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.vendor-select-title {
    font-size: 14px;
    font-weight: 600;
    color: #4a5568;
}

.vendor-select-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
}

.vendor-select-card {
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.vendor-select-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: #cbd5e0;
}

.vendor-select-card.selected {
    border-color: #1a5a96;
    box-shadow: 0 0 0 2px rgba(26, 90, 150, 0.2);
}

.vendor-select-card.selected::after {
    content: '\f00c';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    position: absolute;
    top: -5px;
    right: -5px;
    width: 18px;
    height: 18px;
    background-color: #1a5a96;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
}

.vendor-logo {
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.vendor-logo img {
    max-height: 30px;
    max-width: 70px;
    object-fit: contain;
}

.vendor-name {
    font-size: 11px;
    text-align: center;
    margin-top: 8px;
    color: #4a5568;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

/* Cost Configuration - Make sure it works properly */
#cost-config .config-card-content {
    transition: max-height 0.3s ease, padding 0.3s ease;
    overflow: hidden;
}

#cost-config .config-card-content.collapsed {
    max-height: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    overflow: hidden !important;
}

/* Calculate Button */
.calculate-btn-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.calculate-btn {
    background: linear-gradient(to right, #1a5a96, #0d4275);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-shadow: 0 4px 6px rgba(26, 90, 150, 0.2);
}

.calculate-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(26, 90, 150, 0.3);
}

.calculate-btn i {
    margin-right: 8px;
}

/* Media Queries */
@media (max-width: 992px) {
    .vendor-select-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 576px) {
    .vendor-select-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .vendor-logo img {
        max-height: 25px;
    }
    
    .vendor-name {
        font-size: 10px;
    }
}
EOL

echo -e "${GREEN}Created/updated enhanced sidebar CSS${NC}"

# Step 3: Fix sidebar-manager.js
echo -e "${CYAN}Creating/updating sidebar-manager.js...${NC}"
cat > "$COMPONENTS_DIR/sidebar-manager.js" << 'EOL'
/**
 * Sidebar Manager for Portnox Total Cost Analyzer
 * Handles sidebar toggle, cost configuration, and vendor selection
 */

// Global sidebar manager instance for access from other components
window.sidebarManager = null;

class SidebarManager {
    constructor() {
        // Sidebar elements
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.querySelector('.sidebar-toggle');
        this.contentArea = document.querySelector('.content-area');
        
        // Configuration cards
        this.configCards = document.querySelectorAll('.config-card');
        
        // Vendor selection
        this.vendorCards = document.querySelectorAll('.vendor-select-card');
        this.selectedVendors = ['portnox']; // Portnox is always selected by default
        
        // Cost config elements
        this.costConfig = document.getElementById('cost-config');
        this.costRangeSliders = document.querySelectorAll('#cost-config input[type="range"]');
        
        // Calculate button
        this.calculateBtn = document.querySelector('.calculate-btn');
        
        // Initialize components
        this.init();
    }
    
    /**
     * Initialize the sidebar manager
     */
    init() {
        console.log('Initializing sidebar manager...');
        
        // Ensure DOM elements exist
        if (!this.sidebar || !this.contentArea) {
            console.error('Sidebar or content area not found');
            return;
        }
        
        // Initialize collapsible sections
        this.initCollapsibleSections();
        
        // Initialize vendor selection
        this.initVendorSelection();
        
        // Initialize range sliders
        this.initRangeSliders();
        
        // Initialize sidebar toggle
        this.initSidebarToggle();
        
        // Initialize calculate button
        this.initCalculateButton();
        
        console.log('Sidebar manager initialized');
    }
    
    /**
     * Initialize collapsible sections
     */
    initCollapsibleSections() {
        console.log('Initializing collapsible sections...');
        
        this.configCards.forEach(card => {
            const header = card.querySelector('.config-card-header');
            const content = card.querySelector('.config-card-content');
            const toggleIcon = header.querySelector('.toggle-icon');
            
            if (!header || !content) return;
            
            // Special handling for cost config
            if (card.id === 'cost-config') {
                this.initCostConfig(card, header, content, toggleIcon);
                return;
            }
            
            // Set initial state (expanded by default)
            if (!content.classList.contains('collapsed')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
            
            // Add click handler
            header.addEventListener('click', () => {
                this.toggleSection(content, toggleIcon);
            });
        });
    }
    
    /**
     * Initialize cost configuration section
     */
    initCostConfig(card, header, content, toggleIcon) {
        // Set initial state (expanded by default)
        if (!content.classList.contains('collapsed')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
        
        // Remove any existing click handlers
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
        
        // Add click handler
        newHeader.addEventListener('click', () => {
            this.toggleCostSection(content, newHeader.querySelector('.toggle-icon'));
        });
    }
    
    /**
     * Toggle a configuration section
     */
    toggleSection(content, toggleIcon) {
        if (content.classList.contains('collapsed')) {
            // Expand
            content.classList.remove('collapsed');
            if (toggleIcon) toggleIcon.classList.remove('collapsed');
            
            // Set explicit max-height to ensure transition works
            content.style.maxHeight = content.scrollHeight + 'px';
            
            // Clear max-height after transition to allow content to grow
            setTimeout(() => {
                content.style.maxHeight = '';
            }, 300);
        } else {
            // Collapse
            const contentHeight = content.scrollHeight;
            content.style.maxHeight = contentHeight + 'px';
            
            // Force reflow
            content.offsetHeight;
            
            // Set collapse height
            content.style.maxHeight = '0px';
            
            // Add collapsed class after transition
            setTimeout(() => {
                content.classList.add('collapsed');
                if (toggleIcon) toggleIcon.classList.add('collapsed');
            }, 300);
        }
    }
    
    /**
     * Toggle cost configuration section (special handling)
     */
    toggleCostSection(content, toggleIcon) {
        console.log('Toggling cost section');
        
        if (content.classList.contains('collapsed')) {
            // Expand
            content.classList.remove('collapsed');
            if (toggleIcon) toggleIcon.classList.remove('collapsed');
            
            // Measure the content height properly
            const contentHeight = this.getExpandedContentHeight(content);
            content.style.maxHeight = '0px';
            
            // Force reflow
            content.offsetHeight;
            
            // Set target height and restore padding
            content.style.maxHeight = contentHeight + 'px';
            content.style.paddingTop = '';
            content.style.paddingBottom = '';
            
            // Clear max-height after transition to allow content to grow
            setTimeout(() => {
                content.style.maxHeight = '';
            }, 300);
        } else {
            // Collapse
            const contentHeight = content.scrollHeight;
            content.style.maxHeight = contentHeight + 'px';
            
            // Force reflow
            content.offsetHeight;
            
            // Set collapse height and remove padding
            content.style.maxHeight = '0px';
            content.style.paddingTop = '0';
            content.style.paddingBottom = '0';
            
            // Add collapsed class after transition
            setTimeout(() => {
                content.classList.add('collapsed');
                if (toggleIcon) toggleIcon.classList.add('collapsed');
            }, 300);
        }
    }
    
    /**
     * Get expanded content height for cost section
     */
    getExpandedContentHeight(content) {
        // Clone the content to measure its expanded height
        const clone = content.cloneNode(true);
        
        // Set styles for measurement
        clone.classList.remove('collapsed');
        clone.style.maxHeight = 'none';
        clone.style.position = 'absolute';
        clone.style.visibility = 'hidden';
        clone.style.padding = '15px';
        
        // Add to DOM, measure, then remove
        document.body.appendChild(clone);
        const height = clone.offsetHeight;
        document.body.removeChild(clone);
        
        return height;
    }
    
    /**
     * Initialize vendor selection
     */
    initVendorSelection() {
        this.vendorCards.forEach(card => {
            // Skip Portnox card (always selected)
            if (card.dataset.vendor === 'portnox') {
                card.classList.add('selected');
                return;
            }
            
            // Add click handler
            card.addEventListener('click', () => {
                this.toggleVendorSelection(card.dataset.vendor, card);
            });
        });
    }
    
    /**
     * Toggle vendor selection
     */
    toggleVendorSelection(vendorId, card) {
        console.log(`Toggle vendor selection for ${vendorId}`);
        
        // Toggle selected class
        if (card) {
            card.classList.toggle('selected');
        } else {
            // Find the card if not provided
            const card = Array.from(this.vendorCards).find(c => c.dataset.vendor === vendorId);
            if (card) card.classList.toggle('selected');
        }
        
        // Update selected vendors array
        const index = this.selectedVendors.indexOf(vendorId);
        if (index === -1) {
            // Add vendor
            this.selectedVendors.push(vendorId);
        } else {
            // Remove vendor
            this.selectedVendors.splice(index, 1);
        }
        
        console.log('Selected vendors:', this.selectedVendors);
        
        // Trigger vendor selection change event
        document.dispatchEvent(new CustomEvent('vendorSelectionChanged', {
            detail: { selectedVendors: this.selectedVendors }
        }));
    }
    
    /**
     * Initialize range sliders
     */
    initRangeSliders() {
        this.costRangeSliders.forEach(slider => {
            // Get value display element
            const valueDisplay = document.getElementById(`${slider.id}-value`);
            
            // Update initial value
            if (valueDisplay) {
                this.updateRangeSliderValue(slider, valueDisplay);
            }
            
            // Update background gradient
            this.updateRangeSliderBackground(slider);
            
            // Add input event listener
            slider.addEventListener('input', () => {
                if (valueDisplay) {
                    this.updateRangeSliderValue(slider, valueDisplay);
                }
                this.updateRangeSliderBackground(slider);
                
                // Dispatch range change event
                document.dispatchEvent(new CustomEvent('costConfigChanged', {
                    detail: { sliderId: slider.id, value: slider.value }
                }));
            });
        });
    }
    
    /**
     * Update range slider value display
     */
    updateRangeSliderValue(slider, valueDisplay) {
        const value = slider.value;
        
        // Format value based on slider ID
        if (slider.id === 'fte-cost') {
            valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
        } else if (slider.id === 'implementation-cost') {
            valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
        } else if (slider.id === 'hardware-cost') {
            valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
        } else if (slider.id === 'license-cost') {
            valueDisplay.textContent = `$${parseInt(value)}`;
        } else if (slider.id.includes('percentage') || slider.id.includes('reduction')) {
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
        
        slider.style.background = `linear-gradient(to right, #1a5a96 0%, #1a5a96 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`;
    }
    
    /**
     * Initialize sidebar toggle
     */
    initSidebarToggle() {
        console.log('Initializing sidebar toggle...');
        
        if (!this.sidebarToggle) {
            console.error('Sidebar toggle button not found');
            this.createSidebarToggle();
            return;
        }
        
        console.log('Sidebar toggle button found, adding event listener');
        
        // Remove any existing event listeners
        const newToggle = this.sidebarToggle.cloneNode(true);
        this.sidebarToggle.parentNode.replaceChild(newToggle, this.sidebarToggle);
        this.sidebarToggle = newToggle;
        
        // Add click handler
        this.sidebarToggle.addEventListener('click', this.toggleSidebar.bind(this));
        
        console.log('Sidebar toggle initialized');
    }
    
    /**
     * Create sidebar toggle if it doesn't exist
     */
    createSidebarToggle() {
        console.log('Creating sidebar toggle button');
        
        // Create toggle button
        const toggle = document.createElement('div');
        toggle.className = 'sidebar-toggle';
        toggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        // Add to DOM
        document.querySelector('.main-content').appendChild(toggle);
        
        // Update reference
        this.sidebarToggle = toggle;
        
        // Add click handler
        toggle.addEventListener('click', this.toggleSidebar.bind(this));
        
        console.log('Sidebar toggle created');
    }
    
    /**
     * Toggle sidebar visibility
     */
    toggleSidebar() {
        this.sidebar.classList.toggle('collapsed');
        this.sidebarToggle.classList.toggle('collapsed');
        this.contentArea.classList.toggle('expanded');
        
        // Dispatch sidebar toggle event
        document.dispatchEvent(new CustomEvent('sidebarToggled', {
            detail: { collapsed: this.sidebar.classList.contains('collapsed') }
        }));
    }
    
    /**
     * Initialize calculate button
     */
    initCalculateButton() {
        if (!this.calculateBtn) return;
        
        this.calculateBtn.addEventListener('click', () => {
            // Trigger calculate event
            document.dispatchEvent(new CustomEvent('calculateRequested', {
                detail: {
                    selectedVendors: this.selectedVendors
                }
            }));
        });
    }
    
    /**
     * Get current cost configuration
     */
    getCostConfiguration() {
        const config = {};
        
        this.costRangeSliders.forEach(slider => {
            config[slider.id] = parseFloat(slider.value);
        });
        
        return config;
    }
}

// Initialize sidebar manager when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure DOM is fully loaded
    setTimeout(() => {
        window.sidebarManager = new SidebarManager();
    }, 100);
});
EOL

echo -e "${GREEN}Created/updated sidebar-manager.js${NC}"

# Step 4: Create cost configuration fix
echo -e "${CYAN}Creating cost-config-fix.js...${NC}"
cat > "$COMPONENTS_DIR/cost-config-fix.js" << 'EOL'
/**
 * Cost Configuration Fix for Portnox Total Cost Analyzer
 * Ensures proper initialization and functionality of cost configuration section
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing cost configuration fix...');
    
    // Wait for sidebar manager to initialize
    setTimeout(initCostConfigFix, 500);
});

/**
 * Initialize cost configuration fix
 */
function initCostConfigFix() {
    // Find cost config card
    const costConfigCard = document.getElementById('cost-config');
    
    // Check if cost config exists
    if (!costConfigCard) {
        console.warn('Cost config card not found, creating it...');
        createCostConfigCard();
        return;
    }
    
    // Fix cost config
    fixCostConfig(costConfigCard);
}

/**
 * Fix existing cost config card
 */
function fixCostConfig(costConfigCard) {
    const header = costConfigCard.querySelector('.config-card-header');
    const content = costConfigCard.querySelector('.config-card-content');
    const toggleIcon = header?.querySelector('.toggle-icon');
    
    if (!header || !content) {
        console.warn('Cost config header or content not found, recreating...');
        recreateCostConfigCard(costConfigCard);
        return;
    }
    
    console.log('Fixing cost config card...');
    
    // Ensure transition styling
    content.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
    
    // Fix toggle icon
    if (!toggleIcon) {
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-up toggle-icon';
        header.appendChild(icon);
    }
    
    // Initialize range sliders
    initRangeSliders();
    
    console.log('Cost config card fixed');
}

/**
 * Recreate cost config card
 */
function recreateCostConfigCard(oldCard) {
    console.log('Recreating cost config card...');
    
    // Create new card
    const newCard = document.createElement('div');
    newCard.id = 'cost-config';
    newCard.className = 'config-card';
    
    // Add inner HTML
    newCard.innerHTML = `
        <div class="config-card-header">
            <h3><i class="fas fa-dollar-sign"></i> Cost Parameters</h3>
            <i class="fas fa-chevron-up toggle-icon"></i>
        </div>
        <div class="config-card-content">
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">License Cost ($/device/year)</span>
                    <span class="range-slider-value" id="license-cost-value">$50</span>
                </div>
                <input type="range" id="license-cost" min="0" max="200" value="50" step="1">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Hardware Cost ($/device)</span>
                    <span class="range-slider-value" id="hardware-cost-value">$100</span>
                </div>
                <input type="range" id="hardware-cost" min="0" max="500" value="100" step="10">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Implementation Cost ($)</span>
                    <span class="range-slider-value" id="implementation-cost-value">$10,000</span>
                </div>
                <input type="range" id="implementation-cost" min="0" max="100000" value="10000" step="1000">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Maintenance (% of license)</span>
                    <span class="range-slider-value" id="maintenance-value">20%</span>
                </div>
                <input type="range" id="maintenance-percentage" min="0" max="40" value="20" step="1">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">FTE Cost ($/year)</span>
                    <span class="range-slider-value" id="fte-cost-value">$100,000</span>
                </div>
                <input type="range" id="fte-cost" min="60000" max="180000" value="100000" step="5000">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Risk Reduction (%)</span>
                    <span class="range-slider-value" id="risk-reduction-value">35%</span>
                </div>
                <input type="range" id="risk-reduction" min="10" max="50" value="35" step="5">
            </div>
        </div>
    `;
    
    // Replace old card
    if (oldCard && oldCard.parentNode) {
        oldCard.parentNode.replaceChild(newCard, oldCard);
    } else {
        // Find sidebar content
        const sidebarContent = document.querySelector('.sidebar-content');
        if (sidebarContent) {
            // Find organization config card
            const orgConfig = document.getElementById('organization-config');
            if (orgConfig) {
                // Insert after org config
                orgConfig.after(newCard);
            } else {
                // Append to sidebar content
                sidebarContent.appendChild(newCard);
            }
        }
    }
    
    // Initialize new card
    initCostConfigEvents(newCard);
    initRangeSliders();
    
    console.log('Cost config card recreated');
}

/**
 * Create cost config card if it doesn't exist
 */
function createCostConfigCard() {
    console.log('Creating cost config card...');
    
    // Find sidebar content
    const sidebarContent = document.querySelector('.sidebar-content');
    if (!sidebarContent) {
        console.error('Sidebar content not found, cannot create cost config card');
        return;
    }
    
    // Create card
    const card = document.createElement('div');
    card.id = 'cost-config';
    card.className = 'config-card';
    
    // Add inner HTML
    card.innerHTML = `
        <div class="config-card-header">
            <h3><i class="fas fa-dollar-sign"></i> Cost Parameters</h3>
            <i class="fas fa-chevron-up toggle-icon"></i>
        </div>
        <div class="config-card-content">
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">License Cost ($/device/year)</span>
                    <span class="range-slider-value" id="license-cost-value">$50</span>
                </div>
                <input type="range" id="license-cost" min="0" max="200" value="50" step="1">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Hardware Cost ($/device)</span>
                    <span class="range-slider-value" id="hardware-cost-value">$100</span>
                </div>
                <input type="range" id="hardware-cost" min="0" max="500" value="100" step="10">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Implementation Cost ($)</span>
                    <span class="range-slider-value" id="implementation-cost-value">$10,000</span>
                </div>
                <input type="range" id="implementation-cost" min="0" max="100000" value="10000" step="1000">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Maintenance (% of license)</span>
                    <span class="range-slider-value" id="maintenance-value">20%</span>
                </div>
                <input type="range" id="maintenance-percentage" min="0" max="40" value="20" step="1">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">FTE Cost ($/year)</span>
                    <span class="range-slider-value" id="fte-cost-value">$100,000</span>
                </div>
                <input type="range" id="fte-cost" min="60000" max="180000" value="100000" step="5000">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Risk Reduction (%)</span>
                    <span class="range-slider-value" id="risk-reduction-value">35%</span>
                </div>
                <input type="range" id="risk-reduction" min="10" max="50" value="35" step="5">
            </div>
        </div>
    `;
    
    // Find position to insert
    const orgConfig = document.getElementById('organization-config');
    if (orgConfig) {
        // Insert after org config
        orgConfig.after(card);
    } else {
        // Append to sidebar content
        sidebarContent.appendChild(card);
    }
    
    // Initialize card
    initCostConfigEvents(card);
    initRangeSliders();
    
    console.log('Cost config card created');
}

/**
 * Initialize cost config events
 */
function initCostConfigEvents(card) {
    const header = card.querySelector('.config-card-header');
    const content = card.querySelector('.config-card-content');
    const toggleIcon = header.querySelector('.toggle-icon');
    
    // Add click handler
    header.addEventListener('click', () => {
        toggleCostConfig(content, toggleIcon);
    });
}

/**
 * Toggle cost config visibility
 */
function toggleCostConfig(content, toggleIcon) {
    if (content.classList.contains('collapsed')) {
        // Expand
        content.classList.remove('collapsed');
        toggleIcon.classList.remove('collapsed');
        
        // Set explicit max-height to ensure transition works
        const contentHeight = getExpandedContentHeight(content);
        content.style.maxHeight = '0px';
        
        // Force reflow
        content.offsetHeight;
        
        // Set target height and restore padding
        content.style.maxHeight = contentHeight + 'px';
        content.style.paddingTop = '';
        content.style.paddingBottom = '';
        
        // Clear max-height after transition to allow content to grow
        setTimeout(() => {
            content.style.maxHeight = '';
        }, 300);
    } else {
        // Collapse
        const contentHeight = content.scrollHeight;
        content.style.maxHeight = contentHeight + 'px';
        
        // Force reflow
        content.offsetHeight;
        
        // Set collapse height and remove padding
        content.style.maxHeight = '0px';
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
        
        // Add collapsed class after transition
        setTimeout(() => {
            content.classList.add('collapsed');
            toggleIcon.classList.add('collapsed');
        }, 300);
    }
}

/**
 * Get expanded content height
 */
function getExpandedContentHeight(content) {
    // Clone the content to measure its expanded height
    const clone = content.cloneNode(true);
    
    // Set styles for measurement
    clone.classList.remove('collapsed');
    clone.style.maxHeight = 'none';
    clone.style.position = 'absolute';
    clone.style.visibility = 'hidden';
    clone.style.padding = '15px';
    
    // Add to DOM, measure, then remove
    document.body.appendChild(clone);
    const height = clone.offsetHeight;
    document.body.removeChild(clone);
    
    return height;
}

/**
 * Initialize range sliders
 */
function initRangeSliders() {
    const rangeSliders = document.querySelectorAll('#cost-config input[type="range"]');
    
    rangeSliders.forEach(slider => {
        // Get value display element
        const valueDisplay = document.getElementById(`${slider.id}-value`);
        
        // Update initial value
        if (valueDisplay) {
            updateRangeSliderValue(slider, valueDisplay);
        }
        
        // Update background gradient
        updateRangeSliderBackground(slider);
        
        // Add input event listener
        slider.addEventListener('input', () => {
            if (valueDisplay) {
                updateRangeSliderValue(slider, valueDisplay);
            }
            updateRangeSliderBackground(slider);
            
            // Dispatch range change event
            document.dispatchEvent(new CustomEvent('costConfigChanged', {
                detail: { sliderId: slider.id, value: slider.value }
            }));
        });
    });
}

/**
 * Update range slider value display
 */
function updateRangeSliderValue(slider, valueDisplay) {
    const value = slider.value;
    
    // Format value based on slider ID
    if (slider.id === 'fte-cost') {
        valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
    } else if (slider.id === 'implementation-cost') {
        valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
    } else if (slider.id === 'hardware-cost') {
        valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
    } else if (slider.id === 'license-cost') {
        valueDisplay.textContent = `$${parseInt(value)}`;
    } else if (slider.id.includes('percentage') || slider.id.includes('reduction')) {
        valueDisplay.textContent = `${value}%`;
    } else {
        valueDisplay.textContent = value;
    }
}

/**
 * Update range slider background gradient
 */
function updateRangeSliderBackground(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const value = parseFloat(slider.value);
    const percentage = ((value - min) / (max - min)) * 100;
    
    slider.style.background = `linear-gradient(to right, #1a5a96 0%, #1a5a96 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`;
}
EOL

echo -e "${GREEN}Created cost-config-fix.js${NC}"

# Step 5: Update index.html to include the new CSS and JS files
echo -e "${CYAN}Updating index.html to include new CSS and JS files...${NC}"
INDEX_HTML="$HTML_DIR/index.html"

if [ ! -f "$INDEX_HTML" ]; then
  echo -e "${RED}Error: index.html not found at $INDEX_HTML${NC}"
  exit 1
fi

# Create a temporary file for modifications
TMP_FILE=$(mktemp)

# Add layout-enhanced.css and sidebar-enhanced.css
if ! grep -q 'layout-enhanced.css' "$INDEX_HTML"; then
  sed '/<link rel="stylesheet".*layout.css/a \    <link rel="stylesheet" href="css/layout-enhanced.css">' "$INDEX_HTML" > "$TMP_FILE"
  mv "$TMP_FILE" "$INDEX_HTML"
  echo -e "${GREEN}Added layout-enhanced.css to index.html${NC}"
fi

if ! grep -q 'sidebar-enhanced.css' "$INDEX_HTML"; then
  sed '/<link rel="stylesheet".*sidebar.css/a \    <link rel="stylesheet" href="css/sidebar-enhanced.css">' "$INDEX_HTML" > "$TMP_FILE"
  mv "$TMP_FILE" "$INDEX_HTML"
  echo -e "${GREEN}Added sidebar-enhanced.css to index.html${NC}"
fi

# Add cost-config-fix.js
if ! grep -q 'cost-config-fix.js' "$INDEX_HTML"; then
  sed '/<script src=".*sidebar-manager.js.*>/a \    <script src="js/components/cost-config-fix.js"></script>' "$INDEX_HTML" > "$TMP_FILE"
  mv "$TMP_FILE" "$INDEX_HTML"
  echo -e "${GREEN}Added cost-config-fix.js to index.html${NC}"
fi

# Create a check script to test if the layout and sidebar fixes work
echo -e "${CYAN}Creating Layout and Sidebar test script...${NC}"
cat > "$REPO_DIR/check-layout-sidebar.js" << 'EOL'
/**
 * Layout and Sidebar Test Script
 * Tests if layout and sidebar fixes are working properly
 */

// Run test when document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Running Layout and Sidebar test...');
    
    // Wait for components to initialize
    setTimeout(function() {
        checkLayoutAndSidebar();
    }, 1000);
});

// Check if layout and sidebar are working properly
function checkLayoutAndSidebar() {
    // Check sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (!sidebarToggle) {
        console.error('❌ Sidebar toggle not found');
    } else {
        console.log('✅ Sidebar toggle found');
        
        // Test toggle functionality
        const sidebar = document.getElementById('sidebar');
        const contentArea = document.querySelector('.content-area');
        
        if (sidebar && contentArea) {
            console.log('Testing sidebar toggle functionality...');
            
            // Save original state
            const sidebarCollapsed = sidebar.classList.contains('collapsed');
            const toggleCollapsed = sidebarToggle.classList.contains('collapsed');
            const contentExpanded = contentArea.classList.contains('expanded');
            
            // Trigger click
            sidebarToggle.click();
            
            // Check if classes toggled
            const sidebarToggled = sidebarCollapsed !== sidebar.classList.contains('collapsed');
            const toggleToggled = toggleCollapsed !== sidebarToggle.classList.contains('collapsed');
            const contentToggled = contentExpanded !== contentArea.classList.contains('expanded');
            
            if (sidebarToggled && toggleToggled && contentToggled) {
                console.log('✅ Sidebar toggle functionality working');
            } else {
                console.error('❌ Sidebar toggle functionality not working properly');
            }
            
            // Restore original state
            if (sidebarToggled) sidebarToggle.click();
        }
    }
    
    // Check cost config
    const costConfig = document.getElementById('cost-config');
    if (!costConfig) {
        console.error('❌ Cost config card not found');
    } else {
        console.log('✅ Cost config card found');
        
        // Check cost config content
        const costContent = costConfig.querySelector('.config-card-content');
        if (!costContent) {
            console.error('❌ Cost config content not found');
        } else {
            console.log('✅ Cost config content found');
            
            // Check range sliders
            const rangeSliders = costContent.querySelectorAll('input[type="range"]');
            if (rangeSliders.length === 0) {
                console.error('❌ Cost config range sliders not found');
            } else {
                console.log(`✅ Found ${rangeSliders.length} range sliders in cost config`);
                
                // Check if range sliders have values and displays
                let allSlidersOk = true;
                rangeSliders.forEach(slider => {
                    const valueDisplay = document.getElementById(`${slider.id}-value`);
                    if (!valueDisplay) {
                        console.error(`❌ Value display not found for slider: ${slider.id}`);
                        allSlidersOk = false;
                    }
                });
                
                if (allSlidersOk) {
                    console.log('✅ All range sliders have value displays');
                }
            }
            
            // Test toggle functionality
            const header = costConfig.querySelector('.config-card-header');
            if (header) {
                console.log('Testing cost config toggle functionality...');
                
                // Save original state
                const contentCollapsed = costContent.classList.contains('collapsed');
                
                // Trigger click
                header.click();
                
                // Check if class toggled
                const contentToggled = contentCollapsed !== costContent.classList.contains('collapsed');
                
                if (contentToggled) {
                    console.log('✅ Cost config toggle functionality working');
                } else {
                    console.error('❌ Cost config toggle functionality not working properly');
                }
                
                // Restore original state
                if (contentToggled) header.click();
            }
        }
    }
    
    // Check CSS files
    const layoutEnhancedCSS = Array.from(document.styleSheets).some(sheet => {
        return sheet.href && sheet.href.includes('layout-enhanced.css');
    });
    
    const sidebarEnhancedCSS = Array.from(document.styleSheets).some(sheet => {
        return sheet.href && sheet.href.includes('sidebar-enhanced.css');
    });
    
    if (!layoutEnhancedCSS) {
        console.error('❌ layout-enhanced.css not loaded');
    } else {
        console.log('✅ layout-enhanced.css loaded');
    }
    
    if (!sidebarEnhancedCSS) {
        console.error('❌ sidebar-enhanced.css not loaded');
    } else {
        console.log('✅ sidebar-enhanced.css loaded');
    }
    
    console.log('Layout and Sidebar test complete');
}
EOL

echo -e "${GREEN}Created Layout and Sidebar test script: check-layout-sidebar.js${NC}"

# Create instructions for running the fix script
echo -e "${CYAN}Creating final instructions...${NC}"
cat > "$REPO_DIR/layout-sidebar-fix-instructions.txt" << EOL
##############################################################
# Layout and Sidebar Fix Instructions
##############################################################

The Layout and Sidebar Fix Script has been applied to fix issues with
the sidebar toggle, layout, and cost configuration. The following
changes were made:

1. Added enhanced layout CSS for improved responsiveness
2. Added enhanced sidebar CSS for better styling and interaction
3. Fixed sidebar-manager.js to properly handle sidebar toggle
4. Added cost-config-fix.js to ensure cost configuration works
5. Updated index.html to include new CSS and JS files

To verify that the fixes work properly:

1. Refresh your browser after applying these changes
2. Open the browser console (F12 or Ctrl+Shift+I)
3. Look for any error messages related to the sidebar or layout
4. Try clicking the sidebar toggle button to collapse/expand the sidebar
5. Try clicking on the cost configuration header to collapse/expand it
6. Check that the range sliders in the cost configuration update properly
7. Run the test script by adding this to your browser console:
   \`\`\`
   var script = document.createElement('script');
   script.src = 'check-layout-sidebar.js';
   document.body.appendChild(script);
   \`\`\`

If you're still experiencing issues, please check:
- That all the files were created in the correct locations
- That there are no JavaScript errors in the console
- That all necessary CSS and JS files are properly linked in index.html

##############################################################
EOL

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Layout and Sidebar Fix Script Complete!                    ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}The following actions were performed:${NC}"
echo -e "  • Created enhanced layout CSS for better responsiveness"
echo -e "  • Created enhanced sidebar CSS for improved styling"
echo -e "  • Fixed sidebar-manager.js for proper toggle functionality"
echo -e "  • Added cost-config-fix.js to ensure cost configuration works"
echo -e "  • Updated index.html to include new CSS and JS files"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}Layout and sidebar should now work properly.${NC}"
echo -e "${YELLOW}Please refresh your browser and check the console for any errors.${NC}"
echo -e "${BLUE}=================================================================${NC}"
