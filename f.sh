#!/bin/bash

# Comprehensive Fix for Portnox Dashboard and Sidebar Issues
# This script specifically targets layout issues, cost configurations, and design elements

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
echo -e "${GREEN}   Portnox Dashboard and Sidebar Complete Fix         ${NC}"
echo -e "${BLUE}=======================================================${NC}"
echo -e "${YELLOW}Fixing title positioning, cost configurations, and design${NC}"
echo -e "${BLUE}=======================================================${NC}"
echo ""

# Create backup directories
mkdir -p "$BACKUP_DIR/css" "$BACKUP_DIR/js" "$BACKUP_DIR/js/components" "$BACKUP_DIR/html"

# Back up existing files
echo -e "${YELLOW}Backing up existing files...${NC}"
cp -r "$CSS_DIR" "$BACKUP_DIR/" 2>/dev/null
cp -r "$JS_DIR" "$BACKUP_DIR/" 2>/dev/null
cp "$APP_ROOT/index.html" "$BACKUP_DIR/html/" 2>/dev/null

# 1. Fix the layout CSS
echo -e "${YELLOW}Fixing layout and applying modern gradient theme...${NC}"

mkdir -p "$CSS_DIR"
cat > "$CSS_DIR/layout-fix.css" << 'EOL'
/**
 * Comprehensive Layout Fix for Portnox Total Cost Analyzer
 * Fixes title positioning, layout issues, and applies modern design
 */

/* Fixed layout containers */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #f8fafc;
}

/* Modern header with gradient */
.app-header {
  background: linear-gradient(135deg, #0d4275 0%, #1a5a96 100%);
  color: white;
  padding: 0;
  height: 70px;
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
}

.logo-section {
  display: flex;
  align-items: center;
}

.company-logo {
  height: 40px;
}

.app-title {
  margin-left: 15px;
}

.app-title h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: white;
}

.app-title .subtitle {
  font-size: 14px;
  opacity: 0.9;
  margin: 2px 0 0 0;
}

/* Fix for main content layout */
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

/* Fixed sidebar layout */
.sidebar {
  width: 350px;
  background-color: white;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  position: relative;
  flex-shrink: 0;
  transition: width 0.3s ease;
  overflow-y: auto;
  z-index: 90;
  height: calc(100vh - 70px);
}

.sidebar.collapsed {
  width: 0;
  overflow: hidden;
}

/* Fixed content area */
.content-area {
  flex: 1;
  margin-left: 350px;
  transition: margin-left 0.3s ease;
  overflow-y: auto;
  min-height: calc(100vh - 70px);
  padding: 20px;
}

.content-area.expanded {
  margin-left: 0;
}

/* Properly positioned sidebar toggle */
.sidebar-toggle {
  position: fixed;
  left: 350px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 50px;
  background-color: white;
  border-radius: 0 5px 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 100;
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

/* Modern main tabs */
.main-tabs {
  display: flex;
  background-color: white;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 0;
}

.main-tab {
  padding: 15px 20px;
  font-size: 15px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
}

.main-tab i {
  margin-right: 8px;
  font-size: 16px;
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

/* Results tabs styling */
.results-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
  padding: 0 15px;
}

.results-tab {
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border: none;
  background: transparent;
}

.results-tab:hover {
  color: #1a5a96;
}

.results-tab.active {
  color: #1a5a96;
}

.results-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #1a5a96, #0d4275);
}

/* Fix content panels */
.view-panel {
  display: none;
  background-color: white;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  padding: 20px;
  margin-bottom: 30px;
}

.view-panel.active {
  display: block;
}

.results-panel {
  display: none;
}

.results-panel.active {
  display: block;
}

/* Enhanced dashboard cards */
.dashboard-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.dashboard-card h3 {
  font-size: 16px;
  color: #64748b;
  margin-top: 0;
  margin-bottom: 15px;
}

.dashboard-card .metric-value {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 5px;
  color: #0f172a;
}

.highlight-value {
  background: linear-gradient(135deg, #1a5a96, #0d4275);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dashboard-card .metric-label {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 15px;
}

.dashboard-card .metric-trend {
  margin-top: auto;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #2ecc71;
}

.dashboard-card .metric-trend i {
  margin-right: 5px;
}

/* Modern dashboard card grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  margin-bottom: 30px;
}

/* Chart container with modern styling */
.chart-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  margin-bottom: 30px;
  transition: all 0.3s ease;
}

.chart-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.chart-container h3 {
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 20px;
  color: #0f172a;
}

/* Fix for bottom banner issue */
.app-footer {
  background-color: white;
  border-top: 1px solid #e0e0e0;
  padding: 15px 0;
  color: #64748b;
  font-size: 13px;
  margin-top: auto;
  position: relative;
  z-index: 10;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

/* Fix for the banner at the bottom */
.banner-section {
  position: relative;
  z-index: 5;
  top: auto;
  bottom: auto;
  left: auto;
  right: auto;
  background: white;
  padding: 15px 0;
  border-top: 1px solid #e0e0e0;
}

.banner-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.banner-logo {
  height: 40px;
}

.banner-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #1a5a96, #0d4275);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.banner-subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 5px 0 0 0;
}

/* Make sure sidebar content is visible */
.sidebar-content {
  padding: 15px;
  overflow-y: auto;
}

/* Fix for sidebar headers */
.sidebar-header {
  padding: 15px;
  background: linear-gradient(135deg, #1a5a96, #0d4275);
  color: white;
  border-bottom: 1px solid #e0e0e0;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  display: flex;
  align-items: center;
}

.sidebar-header h2 i {
  margin-right: 10px;
}

/* Fix for vendor select cards */
.vendor-select-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
  margin-top: 10px;
}

.vendor-select-card {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 8px 4px !important;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 80px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.vendor-select-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #1a5a96;
}

.vendor-select-card .vendor-logo {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.vendor-select-card .vendor-logo img {
  max-height: 28px !important;
  max-width: 80px !important;
  object-fit: contain !important;
}

.vendor-select-card .vendor-name {
  font-size: 11px !important;
  font-weight: 600;
  color: #0f172a;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  max-width: 95% !important;
  text-align: center !important;
}

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

/* Config section styling fix */
.config-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 15px;
}

.config-card-header {
  padding: 12px 15px;
  background: linear-gradient(135deg, #1a5a96, #0d4275);
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
  color: white;
}

.config-card-header h3 i {
  margin-right: 10px;
}

.config-card-content {
  padding: 15px;
  max-height: 1000px;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.config-card-content.collapsed {
  max-height: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  overflow: hidden !important;
}

/* Fix for calculate button */
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.btn-calculate:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.btn-calculate i {
  margin-right: 8px;
}

/* Media Queries for responsiveness */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 70px;
    left: -350px;
    height: calc(100vh - 70px);
    z-index: 1000;
    transition: transform 0.3s ease;
  }
  
  .sidebar.active {
    transform: translateX(350px);
  }
  
  .content-area {
    margin-left: 0 !important;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
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
    top: 85px;
    left: 0;
    border-radius: 0 4px 4px 0;
  }
}
EOL

# 2. Fix the cost configuration section
echo -e "${YELLOW}Creating cost configuration fix...${NC}"

mkdir -p "$COMPONENT_DIR"
cat > "$COMPONENT_DIR/cost-config-fix.js" << 'EOL'
/**
 * Cost Configuration Fix for Portnox Total Cost Analyzer
 * Ensures cost configuration sections expand/collapse properly
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing cost configuration fix...');
  
  // Make sure cost configuration is visible and properly initialized
  initializeCostConfiguration();
  
  // Force re-initialization if needed
  setTimeout(initializeCostConfiguration, 1000);
});

function initializeCostConfiguration() {
  const costConfigCard = document.getElementById('cost-config');
  
  // If cost-config card doesn't exist, create it
  if (!costConfigCard) {
    createCostConfigurationCard();
  } else {
    // Ensure it's properly initialized
    const header = costConfigCard.querySelector('.config-card-header');
    const content = costConfigCard.querySelector('.config-card-content');
    
    if (header && content) {
      // Make sure the click handler is attached
      if (!header.hasClickHandler) {
        header.hasClickHandler = true;
        
        header.addEventListener('click', function() {
          console.log('Cost config header clicked');
          toggleCostConfig();
        });
      }
      
      // Check if content is properly styled
      content.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
      
      // If collapsed, make sure it's properly collapsed
      if (content.classList.contains('collapsed')) {
        content.style.maxHeight = '0';
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
        content.style.overflow = 'hidden';
      }
    }
  }
}

function createCostConfigurationCard() {
  console.log('Creating cost configuration card...');
  
  // Find the sidebar content where we'll add the card
  const sidebarContent = document.querySelector('.sidebar-content');
  if (!sidebarContent) {
    console.warn('Could not find sidebar content to add cost config card');
    return;
  }
  
  // Create cost configuration card
  const costConfigCard = document.createElement('div');
  costConfigCard.id = 'cost-config';
  costConfigCard.className = 'config-card';
  
  // Create header
  const header = document.createElement('div');
  header.className = 'config-card-header';
  header.innerHTML = `
    <h3><i class="fas fa-dollar-sign"></i> Cost Configuration</h3>
    <span class="toggle-icon collapsed"><i class="fas fa-chevron-up"></i></span>
  `;
  
  // Create content
  const content = document.createElement('div');
  content.className = 'config-card-content collapsed';
  content.style.maxHeight = '0';
  content.style.paddingTop = '0';
  content.style.paddingBottom = '0';
  content.style.overflow = 'hidden';
  
  // Add cost configuration form
  content.innerHTML = `
    <div class="form-group">
      <label class="form-label" for="license-cost">License Cost</label>
      <div class="range-slider">
        <div class="range-slider-header">
          <span class="range-slider-label">Annual per device</span>
          <span class="range-slider-value" id="license-cost-value">$50</span>
        </div>
        <input type="range" id="license-cost" min="0" max="200" value="50" step="1">
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label" for="hardware-cost">Hardware Cost</label>
      <div class="range-slider">
        <div class="range-slider-header">
          <span class="range-slider-label">Per appliance</span>
          <span class="range-slider-value" id="hardware-cost-value">$5,000</span>
        </div>
        <input type="range" id="hardware-cost" min="0" max="50000" value="5000" step="500">
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label" for="implementation-cost">Implementation Cost</label>
      <div class="range-slider">
        <div class="range-slider-header">
          <span class="range-slider-label">Professional services</span>
          <span class="range-slider-value" id="implementation-cost-value">$10,000</span>
        </div>
        <input type="range" id="implementation-cost" min="0" max="100000" value="10000" step="1000">
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label" for="maintenance-percentage">Maintenance Cost</label>
      <div class="range-slider">
        <div class="range-slider-header">
          <span class="range-slider-label">Percentage of license</span>
          <span class="range-slider-value" id="maintenance-percentage-value">20%</span>
        </div>
        <input type="range" id="maintenance-percentage" min="0" max="40" value="20" step="1">
      </div>
    </div>
  `;
  
  // Add elements to the card
  costConfigCard.appendChild(header);
  costConfigCard.appendChild(content);
  
  // Add card to sidebar content
  sidebarContent.prepend(costConfigCard);
  
  // Add click handler to toggle
  header.addEventListener('click', function() {
    console.log('New cost config header clicked');
    toggleCostConfig();
  });
  header.hasClickHandler = true;
  
  // Initialize range sliders
  initializeRangeSliders();
}

function toggleCostConfig() {
  const costConfigCard = document.getElementById('cost-config');
  if (!costConfigCard) return;
  
  const content = costConfigCard.querySelector('.config-card-content');
  const toggleIcon = costConfigCard.querySelector('.toggle-icon');
  
  console.log('Toggling cost config');
  
  if (content.classList.contains('collapsed')) {
    // Expand
    content.classList.remove('collapsed');
    toggleIcon.classList.remove('collapsed');
    
    // Set explicit max-height to ensure transition works
    const contentHeight = getExpandedContentHeight(content);
    content.style.maxHeight = '0px';
    
    // Force reflow
    content.offsetHeight;
    
    // Set target height
    content.style.maxHeight = contentHeight + 'px';
    content.style.paddingTop = '';
    content.style.paddingBottom = '';
    
    // Clear max-height after transition to allow content to grow if needed
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
    content.style.paddingTop = '0';
    content.style.paddingBottom = '0';
    
    // Add collapsed class after transition
    setTimeout(() => {
      content.classList.add('collapsed');
      if (toggleIcon) toggleIcon.classList.add('collapsed');
    }, 300);
  }
}

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

function initializeRangeSliders() {
  const rangeSliders = document.querySelectorAll('#cost-config input[type="range"]');
  
  rangeSliders.forEach(slider => {
    // Setup initial value display
    const valueDisplay = document.getElementById(`${slider.id}-value`);
    if (valueDisplay) {
      updateRangeSliderValue(slider, valueDisplay);
    }
    
    // Setup background gradient based on initial value
    updateRangeSliderBackground(slider);
    
    // Add input event listener
    slider.addEventListener('input', () => {
      if (valueDisplay) {
        updateRangeSliderValue(slider, valueDisplay);
      }
      updateRangeSliderBackground(slider);
    });
  });
}

function updateRangeSliderValue(slider, valueDisplay) {
  const value = slider.value;
  
  // Format value based on id
  if (slider.id.includes('cost')) {
    valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
  } else if (slider.id.includes('percentage')) {
    valueDisplay.textContent = `${value}%`;
  } else {
    valueDisplay.textContent = value;
  }
}

function updateRangeSliderBackground(slider) {
  const min = parseFloat(slider.min);
  const max = parseFloat(slider.max);
  const value = parseFloat(slider.value);
  const percentage = ((value - min) / (max - min)) * 100;
  
  slider.style.background = `linear-gradient(to right, #1a5a96 0%, #1a5a96 ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
}
EOL

# 3. Fix the banner positioning
echo -e "${YELLOW}Creating banner position fix...${NC}"

cat > "$JS_DIR/banner-fix.js" << 'EOL'
/**
 * Banner Position Fix for Portnox Total Cost Analyzer
 * Ensures the banner is properly positioned
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing banner position fix...');
  
  // Check if banner is at the bottom and fix it
  fixBannerPosition();
  
  // Force re-positioning after a delay to ensure all content is loaded
  setTimeout(fixBannerPosition, 1000);
});

function fixBannerPosition() {
  // Find misplaced banner elements
  const misplacedBanner = document.querySelector('.main-content > .portnox-banner, .content-area > .portnox-banner, .footer-content > .portnox-banner, body > .portnox-banner');
  
  if (misplacedBanner) {
    console.log('Found misplaced banner, fixing position...');
    
    // Remove the misplaced banner
    misplacedBanner.parentNode.removeChild(misplacedBanner);
    
    // Create a new properly positioned banner
    createProperBanner();
  } else {
    // If banner doesn't exist at all, create it
    const existingBanner = document.querySelector('.app-header .banner-content');
    
    if (!existingBanner) {
      console.log('No banner found, creating new one...');
      createProperBanner();
    }
  }
}

function createProperBanner() {
  // Find the header where we'll add the banner
  const header = document.querySelector('.app-header');
  if (!header) {
    console.warn('Could not find header to add banner');
    return;
  }
  
  // Clear existing header content
  const headerContent = header.querySelector('.header-content');
  if (headerContent) {
    // Keep header content and enhance it
    headerContent.innerHTML = `
      <div class="logo-section">
        <img src="assets/images/portnox-logo.png" alt="Portnox" class="company-logo" onerror="this.src='https://www.portnox.com/wp-content/themes/portnox/assets/images/portnox-logo.svg'; this.onerror=null;">
        <div class="app-title">
          <h1>Zero Trust Total Cost Analyzer</h1>
          <div class="subtitle">Multi-Vendor NAC Solution Comparison Platform</div>
        </div>
      </div>
      <div class="header-actions">
        <button class="btn btn-outline" id="dark-mode-toggle">
          <i class="fas fa-moon"></i>
        </button>
        <button class="btn btn-outline" id="export-btn">
          <i class="fas fa-file-export"></i>
          <span>Export</span>
        </button>
        <button class="btn btn-outline" id="help-btn">
          <i class="fas fa-question-circle"></i>
        </button>
      </div>
    `;
  } else {
    // Create new header content
    const newHeaderContent = document.createElement('div');
    newHeaderContent.className = 'header-content';
    newHeaderContent.innerHTML = `
      <div class="logo-section">
        <img src="assets/images/portnox-logo.png" alt="Portnox" class="company-logo" onerror="this.src='https://www.portnox.com/wp-content/themes/portnox/assets/images/portnox-logo.svg'; this.onerror=null;">
        <div class="app-title">
          <h1>Zero Trust Total Cost Analyzer</h1>
          <div class="subtitle">Multi-Vendor NAC Solution Comparison Platform</div>
        </div>
      </div>
      <div class="header-actions">
        <button class="btn btn-outline" id="dark-mode-toggle">
          <i class="fas fa-moon"></i>
        </button>
        <button class="btn btn-outline" id="export-btn">
          <i class="fas fa-file-export"></i>
          <span>Export</span>
        </button>
        <button class="btn btn-outline" id="help-btn">
          <i class="fas fa-question-circle"></i>
        </button>
      </div>
    `;
    header.appendChild(newHeaderContent);
  }
  
  // Add event listeners for header buttons
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      this.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      
      // Dispatch theme change event
      window.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme: isDarkMode ? 'dark' : 'light' }
      }));
    });
  }
}
EOL

# 4. Add modern tech icons replacement
echo -e "${YELLOW}Updating icons with modern tech icons...${NC}"

cat > "$JS_DIR/icon-modernizer.js" << 'EOL'
/**
 * Icon Modernizer for Portnox Total Cost Analyzer
 * Replaces basic icons with more modern and tech-oriented ones
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing icon modernizer...');
  
  // Replace with modern icons
  modernizeIcons();
  
  // Force icon update after a delay to ensure all content is loaded
  setTimeout(modernizeIcons, 1000);
  
  // Listen for DOM changes to update new elements
  observeDomChanges();
});

function modernizeIcons() {
  // Icon mapping
  const iconMapping = {
    // Main navigation
    'Executive': 'fas fa-chart-line',
    'Financial': 'fas fa-coins',
    'Security': 'fas fa-shield-alt',
    'Technical': 'fas fa-cogs',
    
    // Configuration
    'Configuration': 'fas fa-sliders-h',
    'Select NAC Vendors': 'fas fa-server',
    'Cost Configuration': 'fas fa-dollar-sign',
    'Network Configuration': 'fas fa-network-wired',
    'Security Configuration': 'fas fa-lock',
    
    // Executive view
    'Executive Summary': 'fas fa-chart-pie',
    'ROI Analysis': 'fas fa-chart-bar',
    'Risk Assessment': 'fas fa-exclamation-triangle',
    'Vendor Comparison': 'fas fa-balance-scale',
    
    // Charts
    'TCO Comparison': 'fas fa-chart-bar',
    'ROI Chart': 'fas fa-percentage',
    'Value Drivers': 'fas fa-long-arrow-alt-up',
    
    // Metrics
    'Total Savings': 'fas fa-hand-holding-usd',
    'Payback Period': 'fas fa-calendar-check',
    'Risk Reduction': 'fas fa-shield-alt',
    'Implementation Time': 'fas fa-hourglass-half',
    
    // Buttons
    'Calculate': 'fas fa-calculator',
    'Export': 'fas fa-file-export',
    'Dark Mode': 'fas fa-moon',
    'Light Mode': 'fas fa-sun',
    'Help': 'fas fa-question-circle'
  };
  
  // Update tab icons
  updateTabIcons();
  
  // Update config card icons
  updateConfigCardIcons();
  
  // Update button icons
  updateButtonIcons();
  
  // Update metric icons
  updateMetricIcons();
  
  function updateTabIcons() {
    const tabs = document.querySelectorAll('.main-tab');
    
    tabs.forEach(tab => {
      const tabText = tab.textContent.trim();
      const iconEl = tab.querySelector('i');
      
      for (const [key, iconClass] of Object.entries(iconMapping)) {
        if (tabText.includes(key) && iconEl) {
          // Replace with modern icon
          iconEl.className = iconClass;
          break;
        } else if (tabText.includes(key) && !iconEl) {
          // Add icon if missing
          const icon = document.createElement('i');
          icon.className = iconClass;
          tab.insertBefore(icon, tab.firstChild);
          
          // Add space after icon
          tab.insertBefore(document.createTextNode(' '), icon.nextSibling);
          break;
        }
      }
    });
  }
  
  function updateConfigCardIcons() {
    const configHeaders = document.querySelectorAll('.config-card-header h3');
    
    configHeaders.forEach(header => {
      const headerText = header.textContent.trim();
      const iconEl = header.querySelector('i');
      
      for (const [key, iconClass] of Object.entries(iconMapping)) {
        if (headerText.includes(key) && iconEl) {
          // Replace with modern icon
          iconEl.className = iconClass;
          break;
        } else if (headerText.includes(key) && !iconEl) {
          // Add icon if missing
          const icon = document.createElement('i');
          icon.className = iconClass;
          header.insertBefore(icon, header.firstChild);
          
          // Add space after icon
          header.insertBefore(document.createTextNode(' '), icon.nextSibling);
          break;
        }
      }
    });
  }
  
  function updateButtonIcons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      const buttonText = button.textContent.trim();
      const iconEl = button.querySelector('i');
      
      for (const [key, iconClass] of Object.entries(iconMapping)) {
        if (buttonText.includes(key) && iconEl) {
          // Replace with modern icon
          iconEl.className = iconClass;
          break;
        } else if (buttonText.includes(key) && !iconEl) {
          // Add icon if missing
          const icon = document.createElement('i');
          icon.className = iconClass;
          button.insertBefore(icon, button.firstChild);
          
          // Add space after icon
          button.insertBefore(document.createTextNode(' '), icon.nextSibling);
          break;
        }
      }
    });
    
    // Special case for dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      const isDarkMode = document.body.classList.contains('dark-mode');
      darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
  }
  
  function updateMetricIcons() {
    const metricTrends = document.querySelectorAll('.metric-trend');
    
    metricTrends.forEach(trend => {
      // Check if it's a positive or negative trend
      const isPositive = trend.textContent.includes('higher') || 
                         trend.textContent.includes('faster') || 
                         trend.textContent.includes('better');
      
      const iconEl = trend.querySelector('i');
      
      if (iconEl) {
        // Update existing icon
        iconEl.className = isPositive ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
      } else {
        // Add icon if missing
        const icon = document.createElement('i');
        icon.className = isPositive ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
        trend.insertBefore(icon, trend.firstChild);
      }
    });
  }
}

function observeDomChanges() {
  // Create a MutationObserver to watch for DOM changes
  const observer = new MutationObserver(function(mutations) {
    // Check if we need to modernize icons
    let needsUpdate = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        // Check if any added nodes might need icon updates
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          
          if (node.nodeType === 1) { // Element node
            if (node.querySelector('.btn, .config-card-header, .main-tab, .metric-trend') || 
                node.classList && (
                node.classList.contains('btn') || 
                node.classList.contains('config-card-header') || 
                node.classList.contains('main-tab') || 
                node.classList.contains('metric-trend'))) {
              needsUpdate = true;
              break;
            }
          }
        }
      }
    });
    
    if (needsUpdate) {
      // Update icons for new elements
      modernizeIcons();
    }
  });
  
  // Start observing
  observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: false,
    characterData: false
  });
}
EOL

# 5. Add modern gradient theme support
echo -e "${YELLOW}Adding modern gradient theme support...${NC}"

cat > "$CSS_DIR/theme-gradients.css" << 'EOL'
/**
 * Modern Gradient Theme for Portnox Total Cost Analyzer
 * Enhanced visuals with gradient themes and modern styling
 */

:root {
  /* Primary color scheme */
  --primary-gradient: linear-gradient(135deg, #1a5a96 0%, #0d4275 100%);
  --primary-gradient-hover: linear-gradient(135deg, #0d4275 0%, #1a5a96 100%);
  --secondary-gradient: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  --warning-gradient: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  --danger-gradient: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  --info-gradient: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  
  /* Text gradients */
  --primary-text-gradient: linear-gradient(135deg, #1a5a96, #0d4275);
  --secondary-text-gradient: linear-gradient(135deg, #2ecc71, #27ae60);
  
  /* Card gradients */
  --card-hover-gradient: linear-gradient(135deg, rgba(26, 90, 150, 0.07) 0%, rgba(13, 66, 117, 0.03) 100%);
}

/* Add gradient backgrounds to various elements */
.app-header,
.sidebar-header,
.config-card-header,
.btn-calculate,
.btn-primary {
  background: var(--primary-gradient);
}

.btn-calculate:hover,
.btn-primary:hover {
  background: var(--primary-gradient-hover);
}

/* Add gradient text to important elements */
.highlight-value,
.banner-title {
  background: var(--primary-text-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Add gradient bottom borders to active tabs */
.main-tab.active::after,
.results-tab.active::after {
  background: var(--primary-gradient);
}

/* Add card hover effects with gradients */
.dashboard-card:hover,
.chart-container:hover {
  background: white;
  background-image: var(--card-hover-gradient);
}

/* Enhanced shadow effects */
.app-header {
  box-shadow: 0 4px 12px rgba(13, 66, 117, 0.15);
}

.dashboard-card:hover,
.chart-container:hover,
.btn-calculate:hover,
.btn-primary:hover {
  box-shadow: 0 8px 20px rgba(13, 66, 117, 0.2);
}

/* Enhance dashboard cards */
.dashboard-card {
  position: relative;
  overflow: hidden;
}

.dashboard-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--primary-gradient);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.dashboard-card:hover::before {
  opacity: 1;
}

/* Gradient buttons */
.btn.btn-success {
  background: var(--secondary-gradient);
}

.btn.btn-warning {
  background: var(--warning-gradient);
}

.btn.btn-danger {
  background: var(--danger-gradient);
}

.btn.btn-info {
  background: var(--info-gradient);
}

/* Enhance metric trends */
.metric-trend {
  transition: all 0.3s ease;
}

.metric-trend:hover {
  transform: translateX(5px);
}

/* Dark theme support */
body.dark-mode {
  --primary-gradient: linear-gradient(135deg, #2980b9 0%, #1a5a96 100%);
  --primary-gradient-hover: linear-gradient(135deg, #1a5a96 0%, #2980b9 100%);
  --card-hover-gradient: linear-gradient(135deg, rgba(41, 128, 185, 0.1) 0%, rgba(26, 90, 150, 0.05) 100%);
}

body.dark-mode .app-header,
body.dark-mode .sidebar-header,
body.dark-mode .config-card-header {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Enhance buttons with gradient transitions */
.btn {
  position: relative;
  overflow: hidden;
}

.btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1) translate(-50%);
  transform-origin: 50% 50%;
}

.btn:active::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(40);
    opacity: 0;
  }
}

/* Enhanced toggle icons in config cards */
.config-card-header .toggle-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.config-card-header .toggle-icon:hover {
  background: rgba(255, 255, 255, 0.3);
}

.config-card-header .toggle-icon i {
  transition: transform 0.3s ease;
}

.config-card-header .toggle-icon.collapsed i {
  transform: rotate(180deg);
}
EOL

# 6. Create comprehensive layout fixer for index.html
echo -e "${YELLOW}Creating comprehensive layout fixer for HTML...${NC}"

INDEX_HTML=$(find "$APP_ROOT" -name "index.html" -type f | head -n 1)

if [ -f "$INDEX_HTML" ]; then
  # Create a temporary file
  TMP_FILE=$(mktemp)
  
  # Add our CSS and JS files
  sed '/<\/head>/i \
    <!-- Modern layout fixes -->\
    <link rel="stylesheet" href="css/layout-fix.css">\
    <link rel="stylesheet" href="css/theme-gradients.css">\
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous" onerror="this.onerror=null;this.src=\'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js\';"></script>' "$INDEX_HTML" > "$TMP_FILE"
  
  # Add our JS fixes
  sed '/<\/body>/i \
    <!-- Fix scripts -->\
    <script src="js/banner-fix.js"></script>\
    <script src="js/cost-config-fix.js"></script>\
    <script src="js/icon-modernizer.js"></script>\
    <script>\
      document.addEventListener("DOMContentLoaded", function() {\
        // Layout Emergency Fix\
        function applyEmergencyFixes() {\
          // Fix sidebar toggle button\
          const sidebarToggle = document.querySelector(".sidebar-toggle");\
          const sidebar = document.getElementById("sidebar");\
          const contentArea = document.querySelector(".content-area");\
          \
          if (sidebar && contentArea && sidebarToggle) {\
            sidebarToggle.addEventListener("click", function(e) {\
              e.preventDefault();\
              sidebar.classList.toggle("collapsed");\
              sidebarToggle.classList.toggle("collapsed");\
              contentArea.classList.toggle("expanded");\
              console.log("Emergency layout fix - sidebar toggle");\
            });\
          }\
          \
          // Ensure proper structure\
          const appContainer = document.querySelector(".app-container");\
          if (!appContainer) {\
            // Create proper app structure\
            const body = document.body;\
            const wrapper = document.createElement("div");\
            wrapper.className = "app-container";\
            \
            // Move all direct body children to wrapper\
            while (body.firstChild) {\
              wrapper.appendChild(body.firstChild);\
            }\
            \
            // Add wrapper back to body\
            body.appendChild(wrapper);\
            console.log("Emergency layout fix - created app container");\
          }\
          \
          // Fix banner if it\'s at the bottom\
          const mainContentElements = document.querySelectorAll(".main-content > *");\
          mainContentElements.forEach(el => {\
            if (el.textContent.includes("Zero Trust Total Cost Analyzer") && !el.closest(".app-header")) {\
              // Remove misplaced banner\
              el.parentNode.removeChild(el);\
              console.log("Emergency layout fix - removed misplaced banner");\
            }\
          });\
        }\
        \
        // Apply emergency fixes\
        applyEmergencyFixes();\
        \
        // Apply again after a short delay\
        setTimeout(applyEmergencyFixes, 1000);\
      });\
    </script>' "$TMP_FILE" > "$INDEX_HTML"
  
  echo -e "${GREEN}Updated index.html with comprehensive fixes${NC}"
else
  echo -e "${RED}Could not find index.html for comprehensive fixes${NC}"
fi

# 7. Create a layout structure fixer script to run on page load
echo -e "${YELLOW}Creating layout structure fixer script...${NC}"

cat > "$JS_DIR/layout-structure-fixer.js" << 'EOL'
/**
 * Layout Structure Fixer for Portnox Total Cost Analyzer
 * This script reorganizes the DOM structure to fix layout issues
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing layout structure fixer...');
  
  // Wait a bit to ensure all elements are loaded
  setTimeout(function() {
    fixLayoutStructure();
  }, 500);
  
  // Apply again after more time to catch late loading elements
  setTimeout(function() {
    fixLayoutStructure();
  }, 2000);
});

function fixLayoutStructure() {
  console.log('Fixing layout structure...');
  
  // 1. Ensure proper app container
  ensureAppContainer();
  
  // 2. Fix header and banner position
  fixHeaderStructure();
  
  // 3. Fix main content area
  fixMainContentStructure();
  
  // 4. Fix sidebar structure
  fixSidebarStructure();
  
  // 5. Check for misplaced elements and fix them
  fixMisplacedElements();
  
  console.log('Layout structure fixes applied');
}

function ensureAppContainer() {
  const appContainer = document.querySelector('.app-container');
  
  if (!appContainer) {
    console.log('Creating app container...');
    
    // Create app container
    const container = document.createElement('div');
    container.className = 'app-container';
    
    // Move all body children to container
    while (document.body.firstChild) {
      container.appendChild(document.body.firstChild);
    }
    
    // Add container to body
    document.body.appendChild(container);
  }
}

function fixHeaderStructure() {
  const appContainer = document.querySelector('.app-container');
  let header = document.querySelector('.app-header');
  
  if (!header) {
    console.log('Creating app header...');
    
    // Create header
    header = document.createElement('div');
    header.className = 'app-header';
    header.innerHTML = `
      <div class="header-content">
        <div class="logo-section">
          <img src="assets/images/portnox-logo.png" alt="Portnox" class="company-logo" onerror="this.src='https://www.portnox.com/wp-content/themes/portnox/assets/images/portnox-logo.svg'; this.onerror=null;">
          <div class="app-title">
            <h1>Zero Trust Total Cost Analyzer</h1>
            <div class="subtitle">Multi-Vendor NAC Solution Comparison Platform</div>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn btn-outline" id="dark-mode-toggle">
            <i class="fas fa-moon"></i>
          </button>
          <button class="btn btn-outline" id="export-btn">
            <i class="fas fa-file-export"></i>
            <span>Export</span>
          </button>
          <button class="btn btn-outline" id="help-btn">
            <i class="fas fa-question-circle"></i>
          </button>
        </div>
      </div>
    `;
    
    // Insert at beginning of app container
    appContainer.insertBefore(header, appContainer.firstChild);
  }
  
  // Check for misplaced banner in content area
  const misplacedBanners = document.querySelectorAll('.main-content .banner, .content-area .banner, .footer .banner, .banner-section:not(.app-header .banner-section)');
  
  misplacedBanners.forEach(banner => {
    console.log('Removing misplaced banner...');
    banner.parentNode.removeChild(banner);
  });
}

function fixMainContentStructure() {
  const appContainer = document.querySelector('.app-container');
  let mainContent = document.querySelector('.main-content');
  
  if (!mainContent) {
    console.log('Creating main content area...');
    
    // Create main content
    mainContent = document.createElement('div');
    mainContent.className = 'main-content';
    
    // Find all content that should be in main content
    const contentElements = [];
    
    // Find sidebar
    const sidebar = document.querySelector('.sidebar, #sidebar');
    if (sidebar) {
      contentElements.push(sidebar);
    }
    
    // Find content area
    let contentArea = document.querySelector('.content-area, #content');
    if (!contentArea) {
      // Create content area if not found
      contentArea = document.createElement('div');
      contentArea.className = 'content-area';
      
      // Move all remaining elements (except header) to content area
      Array.from(appContainer.children).forEach(child => {
        if (!child.classList.contains('app-header') && child !== sidebar && !contentElements.includes(child)) {
          contentArea.appendChild(child);
        }
      });
    }
    contentElements.push(contentArea);
    
    // Add elements to main content
    contentElements.forEach(el => {
      mainContent.appendChild(el);
    });
    
    // Insert after header
    const header = document.querySelector('.app-header');
    if (header) {
      header.after(mainContent);
    } else {
      appContainer.insertBefore(mainContent, appContainer.firstChild);
    }
  }
}

function fixSidebarStructure() {
  const mainContent = document.querySelector('.main-content');
  let sidebar = document.querySelector('.sidebar, #sidebar');
  
  if (!sidebar && mainContent) {
    console.log('Creating sidebar...');
    
    // Create sidebar
    sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.id = 'sidebar';
    sidebar.innerHTML = `
      <div class="sidebar-header">
        <h2><i class="fas fa-sliders-h"></i> Configuration</h2>
      </div>
      <div class="sidebar-content">
        <!-- Configuration cards will go here -->
      </div>
      <div class="sidebar-footer">
        <button class="btn-calculate">
          <i class="fas fa-calculator"></i> Calculate TCO & ROI
        </button>
      </div>
    `;
    
    // Insert at beginning of main content
    mainContent.insertBefore(sidebar, mainContent.firstChild);
    
    // Add sidebar toggle
    const sidebarToggle = document.createElement('div');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    mainContent.appendChild(sidebarToggle);
    
    // Add click handler
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      sidebarToggle.classList.toggle('collapsed');
      
      const contentArea = document.querySelector('.content-area');
      if (contentArea) {
        contentArea.classList.toggle('expanded');
      }
    });
  }
  
  // Ensure sidebar has proper structure
  if (sidebar) {
    let sidebarHeader = sidebar.querySelector('.sidebar-header');
    if (!sidebarHeader) {
      sidebarHeader = document.createElement('div');
      sidebarHeader.className = 'sidebar-header';
      sidebarHeader.innerHTML = '<h2><i class="fas fa-sliders-h"></i> Configuration</h2>';
      sidebar.insertBefore(sidebarHeader, sidebar.firstChild);
    }
    
    let sidebarContent = sidebar.querySelector('.sidebar-content');
    if (!sidebarContent) {
      sidebarContent = document.createElement('div');
      sidebarContent.className = 'sidebar-content';
      sidebar.insertBefore(sidebarContent, sidebarHeader.nextSibling);
    }
    
    let sidebarFooter = sidebar.querySelector('.sidebar-footer');
    if (!sidebarFooter) {
      sidebarFooter = document.createElement('div');
      sidebarFooter.className = 'sidebar-footer';
      sidebarFooter.innerHTML = '<button class="btn-calculate"><i class="fas fa-calculator"></i> Calculate TCO & ROI</button>';
      sidebar.appendChild(sidebarFooter);
    }
  }
}

function fixMisplacedElements() {
  // Fix any remaining banner at the bottom
  const bannerElements = document.querySelectorAll('[class*="banner"], [class*="portnox"], [class*="logo"]');
  
  bannerElements.forEach(element => {
    // Check if it contains the app title text
    if (element.textContent && element.textContent.includes('Zero Trust Total Cost Analyzer') && 
        !element.closest('.app-header') && 
        !element.classList.contains('sidebar') && 
        !element.classList.contains('sidebar-header') &&
        !element.classList.contains('content-area') &&
        !element.classList.contains('app-container')) {
      
      console.log('Found misplaced banner element, removing...');
      element.parentNode.removeChild(element);
    }
  });
}
EOL

# 8. Add layout structure fixer to index.html
if [ -f "$INDEX_HTML" ]; then
  # Create a temporary file
  TMP_FILE=$(mktemp)
  
  # Add layout structure fixer
  sed '/<\/body>/i \
    <!-- Layout structure fixer -->\
    <script src="js/layout-structure-fixer.js"></script>' "$INDEX_HTML" > "$TMP_FILE"
  
  # Replace the original
  mv "$TMP_FILE" "$INDEX_HTML"
  
  echo -e "${GREEN}Added layout structure fixer to index.html${NC}"
else
  echo -e "${RED}Could not add layout structure fixer to index.html${NC}"
fi

echo -e "${GREEN}All fixes applied successfully!${NC}"
echo -e "${BLUE}The following issues have been fixed:${NC}"
echo -e "  - Title and banner positioning"
echo -e "  - Cost configuration visibility and functionality"
echo -e "  - Modern gradient theme with improved colors"
echo -e "  - Updated tech icons throughout the interface"
echo -e "  - Layout structure reorganization"
echo -e "  - Sidebar toggle functionality"
echo -e "${YELLOW}Refresh your browser to see all the changes.${NC}"
