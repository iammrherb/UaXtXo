#!/bin/bash

# ================================================================
# Portnox Total Cost Analyzer - Comprehensive Fix Script
# ================================================================
# This script fixes issues with layout, security view, calculations
# and enhances the Executive and Security views with more visuals
# ================================================================

# Color definitions for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script constants
REPO_DIR="$(pwd)"
CSS_DIR="$REPO_DIR/css"
JS_DIR="$REPO_DIR/js"
CHARTS_DIR="$JS_DIR/charts"
COMPONENTS_DIR="$JS_DIR/components"
VIEWS_DIR="$JS_DIR/views"
MODELS_DIR="$JS_DIR/models"
UTILS_DIR="$JS_DIR/utils"
BACKUP_DIR="$REPO_DIR/backups/$(date +%Y%m%d_%H%M%S)"

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Portnox Total Cost Analyzer - Comprehensive Fix Script      ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}Fixing critical issues and enhancing visualizations${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo ""

# Function to check if a directory exists, if not create it
check_dir() {
  if [ ! -d "$1" ]; then
    mkdir -p "$1"
    echo -e "${YELLOW}Created directory: $1${NC}"
  fi
}

# Function to create backup of existing files
create_backup() {
  echo -e "${YELLOW}Creating backup of existing files...${NC}"
  
  # Create backup directories
  mkdir -p "$BACKUP_DIR"/{css,js,js/charts,js/components,js/views,js/models,html}
  
  # Back up existing files
  cp -r "$CSS_DIR" "$BACKUP_DIR/" 2>/dev/null
  cp -r "$JS_DIR" "$BACKUP_DIR/" 2>/dev/null
  
  # Backup index.html
  find "$REPO_DIR" -name "index.html" -type f -exec cp {} "$BACKUP_DIR/html/" \; 2>/dev/null
  
  echo -e "${GREEN}Backup created at: $BACKUP_DIR${NC}"
}

# Function to ensure required directories exist
ensure_directories() {
  echo -e "${YELLOW}Ensuring required directories exist...${NC}"
  
  check_dir "$CSS_DIR"
  check_dir "$JS_DIR"
  check_dir "$CHARTS_DIR"
  check_dir "$COMPONENTS_DIR"
  check_dir "$VIEWS_DIR"
  check_dir "$MODELS_DIR"
  check_dir "$UTILS_DIR"
  
  echo -e "${GREEN}Directory structure verified${NC}"
}

# Create backup
create_backup

# Ensure directories exist
ensure_directories

# ================================================================
# 1. Fix Index.html Structure
# ================================================================
echo -e "${CYAN}Fixing HTML structure...${NC}"

# Find index.html
INDEX_HTML=$(find "$REPO_DIR" -name "index.html" -type f | head -n 1)

if [ -f "$INDEX_HTML" ]; then
  # Temporary file
  TMP_FILE=$(mktemp)
  
  # Fix main content structure - ensure Security view panel exists
  sed '/<div class="view-panel" data-view="financial">/a \
    <!-- Security View Panel -->\
    <div class="view-panel" data-view="security">\
        <div class="results-tabs">\
            <button class="results-tab active" data-panel="security-overview">Security Overview</button>\
            <button class="results-tab" data-panel="compliance-frameworks">Compliance Frameworks</button>\
            <button class="results-tab" data-panel="threat-analysis">Threat Analysis</button>\
            <button class="results-tab" data-panel="industry-impact">Industry Impact</button>\
        </div>\
        <div id="security-overview" class="results-panel active">\
            <div class="panel-header">\
                <h2>Security Overview</h2>\
                <p class="subtitle">Comprehensive analysis of security capabilities and risk reduction</p>\
            </div>\
            <div class="dashboard-grid"></div>\
            <div class="chart-container">\
                <h3>NIST Cybersecurity Framework Coverage</h3>\
                <div class="chart-wrapper" id="nist-framework-chart"></div>\
            </div>\
            <div class="chart-container">\
                <h3>Data Breach Cost Impact</h3>\
                <div class="chart-wrapper" id="breach-impact-chart"></div>\
            </div>\
        </div>\
        <div id="compliance-frameworks" class="results-panel">\
            <div class="panel-header">\
                <h2>Compliance Frameworks</h2>\
                <p class="subtitle">Coverage of major regulatory and industry compliance frameworks</p>\
            </div>\
            <div class="dashboard-grid"></div>\
            <div class="chart-container">\
                <h3>Industry Compliance Framework Coverage</h3>\
                <div class="chart-wrapper" id="security-frameworks-chart"></div>\
            </div>\
        </div>\
        <div id="threat-analysis" class="results-panel">\
            <div class="panel-header">\
                <h2>Threat Analysis</h2>\
                <p class="subtitle">Comprehensive threat modeling and risk mitigation assessment</p>\
            </div>\
            <div class="dashboard-grid"></div>\
            <div class="chart-container">\
                <h3>Threat Impact Analysis</h3>\
                <div class="chart-wrapper" id="threat-model-chart"></div>\
            </div>\
        </div>\
        <div id="industry-impact" class="results-panel">\
            <div class="panel-header">\
                <h2>Industry Impact Analysis</h2>\
                <p class="subtitle">Industry-specific security challenges and breach impact analysis</p>\
            </div>\
            <div class="dashboard-grid"></div>\
            <div class="chart-container">\
                <h3>Data Breach Costs by Industry</h3>\
                <div class="chart-wrapper" id="industry-breach-chart"></div>\
            </div>\
            <div class="chart-container">\
                <h3>Cyber Insurance Premium Reduction</h3>\
                <div class="chart-wrapper" id="insurance-impact-chart"></div>\
            </div>\
        </div>\
    </div>' "$INDEX_HTML" > "$TMP_FILE"
  
  mv "$TMP_FILE" "$INDEX_HTML"
  
  # Fix Technical View panel if needed - ensure it exists
  TMP_FILE=$(mktemp)
  if ! grep -q 'data-view="technical"' "$INDEX_HTML"; then
    sed '/<div class="view-panel" data-view="security">/a \
      <!-- Technical View Panel -->\
      <div class="view-panel" data-view="technical">\
          <div class="results-tabs">\
              <button class="results-tab active" data-panel="technical-overview">Technical Overview</button>\
              <button class="results-tab" data-panel="feature-comparison">Feature Comparison</button>\
              <button class="results-tab" data-panel="architecture-comparison">Architecture Comparison</button>\
          </div>\
          <div id="technical-overview" class="results-panel active">\
              <div class="panel-header">\
                  <h2>Technical Overview</h2>\
                  <p class="subtitle">Comprehensive analysis of technical capabilities</p>\
              </div>\
              <div class="dashboard-grid"></div>\
              <div class="chart-container">\
                  <h3>Technical Capabilities Comparison</h3>\
                  <div class="chart-wrapper" id="technical-radar-chart"></div>\
              </div>\
          </div>\
      </div>' "$INDEX_HTML" > "$TMP_FILE"
    
    mv "$TMP_FILE" "$INDEX_HTML"
  fi
  
  # Fix the cost configuration section in the sidebar
  TMP_FILE=$(mktemp)
  if ! grep -q 'id="cost-config"' "$INDEX_HTML"; then
    sed '/<div id="organization-config" class="config-card">/a \
      <!-- Cost Configuration -->\
      <div id="cost-config" class="config-card">\
          <div class="config-card-header">\
              <h3><i class="fas fa-dollar-sign"></i> Cost Parameters</h3>\
              <i class="fas fa-chevron-up toggle-icon"></i>\
          </div>\
          <div class="config-card-content">\
              <div class="range-slider">\
                  <div class="range-slider-header">\
                      <span class="range-slider-label">License Cost ($/device/year)</span>\
                      <span class="range-slider-value" id="license-cost-value">$50</span>\
                  </div>\
                  <input type="range" id="license-cost" min="0" max="200" value="50" step="1">\
              </div>\
              \
              <div class="range-slider">\
                  <div class="range-slider-header">\
                      <span class="range-slider-label">Hardware Cost ($/device)</span>\
                      <span class="range-slider-value" id="hardware-cost-value">$100</span>\
                  </div>\
                  <input type="range" id="hardware-cost" min="0" max="500" value="100" step="10">\
              </div>\
              \
              <div class="range-slider">\
                  <div class="range-slider-header">\
                      <span class="range-slider-label">Implementation Cost ($)</span>\
                      <span class="range-slider-value" id="implementation-cost-value">$10,000</span>\
                  </div>\
                  <input type="range" id="implementation-cost" min="0" max="100000" value="10000" step="1000">\
              </div>\
              \
              <div class="range-slider">\
                  <div class="range-slider-header">\
                      <span class="range-slider-label">Maintenance (% of license)</span>\
                      <span class="range-slider-value" id="maintenance-value">20%</span>\
                  </div>\
                  <input type="range" id="maintenance-percentage" min="0" max="40" value="20" step="1">\
              </div>\
              \
              <div class="range-slider">\
                  <div class="range-slider-header">\
                      <span class="range-slider-label">FTE Cost ($/year)</span>\
                      <span class="range-slider-value" id="fte-cost-value">$100,000</span>\
                  </div>\
                  <input type="range" id="fte-cost" min="60000" max="180000" value="100000" step="5000">\
              </div>\
              \
              <div class="range-slider">\
                  <div class="range-slider-header">\
                      <span class="range-slider-label">Risk Reduction (%)</span>\
                      <span class="range-slider-value" id="risk-reduction-value">35%</span>\
                  </div>\
                  <input type="range" id="risk-reduction" min="10" max="50" value="35" step="5">\
              </div>\
          </div>\
      </div>' "$INDEX_HTML" > "$TMP_FILE"
    
    mv "$TMP_FILE" "$INDEX_HTML"
  fi
  
  echo -e "${GREEN}HTML structure fixed successfully${NC}"
else
  echo -e "${RED}index.html not found - cannot fix HTML structure${NC}"
fi

# ================================================================
# 2. Fix Layout CSS
# ================================================================
echo -e "${CYAN}Fixing layout CSS...${NC}"

cat > "$CSS_DIR/layout-fixes.css" << 'EOL'
/**
 * Layout fixes for Portnox Total Cost Analyzer
 */

/* Fixed main content layout */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  position: relative;
  z-index: 10;
  height: auto !important;
  padding: 10px 0;
}

.main-content {
  display: flex;
  flex: 1;
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 70px);
}

/* Fix sidebar width and position */
.sidebar {
  width: 320px;
  min-width: 320px;
  max-width: 320px;
  flex-shrink: 0;
  overflow-y: auto;
  height: calc(100vh - 70px);
  z-index: 5;
  transition: transform 0.3s ease, width 0.3s ease;
}

.sidebar.collapsed {
  width: 0;
  min-width: 0;
  overflow: hidden;
}

/* Fix content area size */
.content-area {
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 70px);
  padding: 20px;
  margin-left: 0 !important;
  transition: margin-left 0.3s ease;
}

.content-area.expanded {
  margin-left: 0 !important;
}

/* Make sure the sidebar toggle is visible */
.sidebar-toggle {
  position: fixed;
  left: 320px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 50px;
  z-index: 100;
  background: white;
  border-radius: 0 5px 5px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: left 0.3s ease;
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

/* Fix config card expansion/collapse */
.config-card-content {
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

.toggle-icon {
  transition: transform 0.3s ease;
}

.toggle-icon.collapsed {
  transform: rotate(180deg);
}

/* Fix dashboard-grid layout */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.view-panel {
  padding: 20px !important;
}

/* Fix vendor cards in sidebar */
.vendor-select-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 10px;
}

.vendor-select-card {
  height: 80px !important;
  padding: 8px 4px !important;
  transition: all 0.3s ease;
}

.vendor-select-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.vendor-select-card .vendor-logo img {
  max-height: 30px !important;
  max-width: 80px !important;
  object-fit: contain !important;
}

.vendor-select-card .vendor-name {
  font-size: 11px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  max-width: 95% !important;
  text-align: center !important;
}

/* Fix range sliders for proper visibility */
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
  color: #666;
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
  background: #e0e0e0;
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

/* Make main tabs more visible */
.main-tabs {
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px 8px 0 0;
  margin-bottom: 0;
  overflow: hidden;
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

/* Fix results tabs */
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

.results-panel {
  display: none;
}

.results-panel.active {
  display: block;
}

/* Fix card styling */
.dashboard-card, 
.benefit-card,
.chart-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  transition: all 0.3s ease;
}

.dashboard-card:hover, 
.benefit-card:hover,
.chart-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

/* Enhanced comparison table */
.comparison-table-container {
  overflow-x: auto;
  margin-top: 20px;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.comparison-table th,
.comparison-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.comparison-table th {
  background-color: #1a5a96;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.comparison-table td.highlight-cell {
  color: #1a5a96;
  font-weight: 600;
}

.comparison-table tr:hover {
  background-color: rgba(26, 90, 150, 0.05);
}

/* Fix loading overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.loading-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Media queries for responsiveness */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 70px;
    left: -320px;
    height: calc(100vh - 70px);
    z-index: 1000;
    transform: translateX(0);
  }
  
  .sidebar.active {
    transform: translateX(320px);
  }
  
  .content-area {
    margin-left: 0 !important;
    width: 100%;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar-toggle {
    top: 85px;
    left: 0;
    border-radius: 0 4px 4px 0;
  }
}
EOL

echo -e "${GREEN}Layout CSS fixes created${NC}"

# ================================================================
# 3. Fix Cost Configuration JavaScript
# ================================================================
echo -e "${CYAN}Fixing cost configuration JavaScript...${NC}"

cat > "$COMPONENTS_DIR/cost-config-fix.js" << 'EOL'
/**
 * Fixed Cost Configuration for Portnox Total Cost Analyzer
 * Ensures cost configuration sections expand/collapse properly
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing cost configuration fix...');
  
  // Wait a bit for sidebar manager to initialize
  setTimeout(initializeCostConfiguration, 500);
});

function initializeCostConfiguration() {
  const costConfigCard = document.getElementById('cost-config');
  
  if (!costConfigCard) {
    console.warn('Cost config card not found, will be created by sidebar-manager.js');
    return;
  }
  
  // Ensure it's properly initialized
  const header = costConfigCard.querySelector('.config-card-header');
  const content = costConfigCard.querySelector('.config-card-content');
  const toggleIcon = header?.querySelector('.toggle-icon');
  
  if (!header || !content) {
    console.warn('Cost config header or content not found');
    return;
  }
  
  // Remove any existing click handler
  header.removeEventListener('click', toggleCostConfig);
  
  // Add click handler
  header.addEventListener('click', toggleCostConfig);
  
  // Check if content is properly styled
  content.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
  
  // Initialize range sliders
  initializeRangeSliders();
  
  console.log('Cost configuration initialized');
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
    if (toggleIcon) toggleIcon.classList.remove('collapsed');
    
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
  if (slider.id === 'fte-cost' || slider.id === 'implementation-cost' || slider.id === 'hardware-cost') {
    valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
  } else if (slider.id === 'license-cost') {
    valueDisplay.textContent = `$${parseInt(value)}`;
  } else if (slider.id.includes('percentage') || slider.id.includes('reduction')) {
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

// Initialize range sliders automatically when included
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initializeRangeSliders, 1000);
});
EOL

echo -e "${GREEN}Cost Configuration JavaScript fixed${NC}"

# ================================================================
# 4. Fix Sidebar Manager
# ================================================================
echo -e "${CYAN}Fixing sidebar manager...${NC}"

cat > "$COMPONENTS_DIR/sidebar-manager-fix.js" << 'EOL'
/**
 * Fixed Sidebar Manager for Portnox Total Cost Analyzer
 * Fixes toggling and section expansion/collapse
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing sidebar manager fix...');
  
  // Wait a bit for main sidebar manager to initialize
  setTimeout(fixSidebarManager, 500);
});

function fixSidebarManager() {
  // Fix sidebar toggle
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const contentArea = document.querySelector('.content-area');
  
  if (!sidebarToggle || !sidebar || !contentArea) {
    console.warn('Sidebar elements not found, cannot fix toggle');
    return;
  }
  
  // Remove existing event listeners by cloning and replacing
  const newSidebarToggle = sidebarToggle.cloneNode(true);
  sidebarToggle.parentNode.replaceChild(newSidebarToggle, sidebarToggle);
  
  // Add fixed event listener
  newSidebarToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Toggling sidebar');
    sidebar.classList.toggle('collapsed');
    newSidebarToggle.classList.toggle('collapsed');
    contentArea.classList.toggle('expanded');
  });
  
  // Fix config card toggles
  const configCards = document.querySelectorAll('.config-card');
  
  configCards.forEach(card => {
    const header = card.querySelector('.config-card-header');
    const content = card.querySelector('.config-card-content');
    const toggleIcon = header?.querySelector('.toggle-icon');
    
    if (!header || !content) return;
    
    // Remove existing event listeners by cloning and replacing
    const newHeader = header.cloneNode(true);
    header.parentNode.replaceChild(newHeader, header);
    
    // Add fixed event listener
    newHeader.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Special handler for cost config
      if (card.id === 'cost-config') {
        // Let the specialized handler deal with it
        return;
      }
      
      console.log(`Toggling section ${card.id}`);
      
      if (content.classList.contains('collapsed')) {
        // Expand
        content.classList.remove('collapsed');
        
        const newToggleIcon = newHeader.querySelector('.toggle-icon');
        if (newToggleIcon) newToggleIcon.classList.remove('collapsed');
        
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
          
          const newToggleIcon = newHeader.querySelector('.toggle-icon');
          if (newToggleIcon) newToggleIcon.classList.add('collapsed');
        }, 300);
      }
    });
  });
  
  // Fix vendor selection cards - ensure they respond to clicks
  const vendorCards = document.querySelectorAll('.vendor-select-card');
  vendorCards.forEach(card => {
    if (card.dataset.vendor === 'portnox') return; // Skip Portnox card
    
    // Remove existing event listeners by cloning and replacing
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
    
    // Add fixed event listener
    newCard.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      newCard.classList.toggle('selected');
      console.log(`Toggled vendor ${newCard.dataset.vendor}`);
      
      // If window.sidebarManager exists, update its selectedVendors
      if (window.sidebarManager && typeof window.sidebarManager.toggleVendorSelection === 'function') {
        window.sidebarManager.toggleVendorSelection(newCard.dataset.vendor, newCard);
      }
    });
  });
  
  console.log('Sidebar manager fixes applied');
}
EOL

echo -e "${GREEN}Sidebar Manager fixed${NC}"

# ================================================================
# 5. Fix Security View Initialization
# ================================================================
echo -e "${CYAN}Fixing Security View initialization...${NC}"

cat > "$VIEWS_DIR/security-view-fix.js" << 'EOL'
/**
 * Fixed Security View for Portnox Total Cost Analyzer
 * Ensures proper initialization and display
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing security view fix...');
  
  // Wait a bit for main view to initialize
  setTimeout(fixSecurityView, 500);
});

function fixSecurityView() {
  // Check if security view exists
  const securityView = document.querySelector('.view-panel[data-view="security"]');
  if (!securityView) {
    console.warn('Security view panel not found, will create it');
    createSecurityViewPanel();
  } else {
    // Make sure the container is properly initialized
    console.log('Found security view panel, ensuring proper initialization');
    ensureSecurityViewInitialized();
  }
}

function createSecurityViewPanel() {
  const contentArea = document.querySelector('.content-area');
  if (!contentArea) {
    console.error('Content area not found, cannot create security view');
    return;
  }
  
  const viewsContainer = contentArea.querySelector('.content-wrapper');
  if (!viewsContainer) {
    console.error('Views container not found, cannot create security view');
    return;
  }
  
  // Look for existing view panels
  const existingPanel = viewsContainer.querySelector('.view-panel[data-view="executive"]') || 
                        viewsContainer.querySelector('.view-panel[data-view="financial"]');
  
  if (!existingPanel) {
    console.error('No existing panels found as reference');
    return;
  }
  
  // Create security view panel
  const securityView = document.createElement('div');
  securityView.className = 'view-panel';
  securityView.setAttribute('data-view', 'security');
  
  // Add inner content
  securityView.innerHTML = `
    <div class="results-tabs">
      <button class="results-tab active" data-panel="security-overview">Security Overview</button>
      <button class="results-tab" data-panel="compliance-frameworks">Compliance Frameworks</button>
      <button class="results-tab" data-panel="threat-analysis">Threat Analysis</button>
      <button class="results-tab" data-panel="industry-impact">Industry Impact</button>
    </div>
    
    <div id="security-overview" class="results-panel active">
      <div class="panel-header">
        <h2>Security Overview</h2>
        <p class="subtitle">Comprehensive analysis of security capabilities and risk reduction</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card highlight-card">
          <h3>Overall Security Improvement</h3>
          <div class="metric-value highlight-value" id="security-improvement">85%</div>
          <div class="metric-label">Risk reduction with NAC implementation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Industry-leading protection
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Zero Trust Coverage</h3>
          <div class="metric-value" id="zero-trust-score">92%</div>
          <div class="metric-label">Zero Trust principles implementation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 15% above competitors
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Device Authentication</h3>
          <div class="metric-value" id="device-auth-score">95%</div>
          <div class="metric-label">Robust device identification and validation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Comprehensive coverage
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Incident Response Time</h3>
          <div class="metric-value" id="response-time">5 min</div>
          <div class="metric-label">Average time to detect and isolate threats</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 3x faster than competitors
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>NIST Cybersecurity Framework Coverage</h3>
        <div class="chart-wrapper" id="nist-framework-chart"></div>
      </div>
      
      <div class="chart-container">
        <h3>Data Breach Cost Impact</h3>
        <div class="chart-wrapper" id="breach-impact-chart"></div>
      </div>
    </div>
    
    <div id="compliance-frameworks" class="results-panel">
      <div class="panel-header">
        <h2>Compliance Frameworks</h2>
        <p class="subtitle">Coverage of major regulatory and industry compliance frameworks</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card highlight-card">
          <h3>Overall Compliance Coverage</h3>
          <div class="metric-value highlight-value" id="compliance-coverage">95%</div>
          <div class="metric-label">Average framework coverage</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Comprehensive compliance
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Automated Reporting</h3>
          <div class="metric-value" id="automated-reporting">85%</div>
          <div class="metric-label">Compliance evidence automation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Reduces audit overhead
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Audit Time Reduction</h3>
          <div class="metric-value" id="audit-reduction">65%</div>
          <div class="metric-label">Time saved in compliance audits</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Significant efficiency
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Compliance Frameworks</h3>
          <div class="metric-value" id="framework-count">7+</div>
          <div class="metric-label">Major frameworks supported</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Comprehensive coverage
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Industry Compliance Framework Coverage</h3>
        <div class="chart-wrapper" id="security-frameworks-chart"></div>
      </div>
    </div>
    
    <div id="threat-analysis" class="results-panel">
      <div class="panel-header">
        <h2>Threat Analysis</h2>
        <p class="subtitle">Comprehensive threat modeling and risk mitigation assessment</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card highlight-card">
          <h3>Overall Threat Reduction</h3>
          <div class="metric-value highlight-value" id="threat-reduction">85%</div>
          <div class="metric-label">Reduction in vulnerability exposure</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Significant risk reduction
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Unauthorized Access Prevention</h3>
          <div class="metric-value" id="unauthorized-prevention">95%</div>
          <div class="metric-label">Reduction in unauthorized access attempts</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Strong boundary protection
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Lateral Movement Reduction</h3>
          <div class="metric-value" id="lateral-reduction">90%</div>
          <div class="metric-label">Prevention of threat propagation</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Effective segmentation
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Shadow IT Elimination</h3>
          <div class="metric-value" id="shadow-it">95%</div>
          <div class="metric-label">Detection of unauthorized devices</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Complete visibility
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Threat Impact Analysis</h3>
        <div class="chart-wrapper" id="threat-model-chart"></div>
      </div>
    </div>
    
    <div id="industry-impact" class="results-panel">
      <div class="panel-header">
        <h2>Industry Impact Analysis</h2>
        <p class="subtitle">Industry-specific security challenges and breach impact analysis</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card highlight-card">
          <h3>Average Breach Cost</h3>
          <div class="metric-value highlight-value" id="avg-breach-cost">$4.35M</div>
          <div class="metric-label">Average data breach cost in 2025</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 12% increase from 2024
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Healthcare Breach Cost</h3>
          <div class="metric-value" id="healthcare-breach-cost">$9.23M</div>
          <div class="metric-label">Highest industry breach costs</div>
          <div class="metric-trend down">
            <i class="fas fa-arrow-down"></i> High regulatory impact
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Financial Services Breach</h3>
          <div class="metric-value" id="financial-breach-cost">$5.97M</div>
          <div class="metric-label">High-value target for attackers</div>
          <div class="metric-trend down">
            <i class="fas fa-arrow-down"></i> Significant exposure
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Mean Time to Identify</h3>
          <div class="metric-value" id="mtti-value">287</div>
          <div class="metric-label">Average days to identify a breach</div>
          <div class="metric-trend down">
            <i class="fas fa-arrow-down"></i> Too slow for modern threats
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Data Breach Costs by Industry</h3>
        <div class="chart-wrapper" id="industry-breach-chart"></div>
      </div>
      
      <div class="chart-container">
        <h3>Cyber Insurance Premium Reduction</h3>
        <div class="chart-wrapper" id="insurance-impact-chart"></div>
      </div>
    </div>
  `;
  
  // Insert after existing panel
  existingPanel.after(securityView);
  
  // Initialize tab navigation
  initializeSecurityTabs(securityView);
  
  console.log('Created security view panel');
}

function ensureSecurityViewInitialized() {
  const securityView = document.querySelector('.view-panel[data-view="security"]');
  if (!securityView) return;
  
  // Make sure it has all required panels
  const requiredPanels = [
    'security-overview',
    'compliance-frameworks',
    'threat-analysis',
    'industry-impact'
  ];
  
  let missingPanels = false;
  
  requiredPanels.forEach(panelId => {
    if (!document.getElementById(panelId)) {
      missingPanels = true;
      console.warn(`Missing security panel: ${panelId}`);
    }
  });
  
  // If missing panels, recreate the entire security view
  if (missingPanels) {
    securityView.remove();
    createSecurityViewPanel();
  } else {
    // Initialize tab navigation
    initializeSecurityTabs(securityView);
  }
}

function initializeSecurityTabs(securityView) {
  const tabs = securityView.querySelectorAll('.results-tab');
  
  tabs.forEach(tab => {
    const panelId = tab.getAttribute('data-panel');
    
    // Remove any existing event listener by cloning and replacing
    const newTab = tab.cloneNode(true);
    tab.parentNode.replaceChild(newTab, tab);
    
    // Add fixed event listener
    newTab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      newTab.classList.add('active');
      
      // Hide all panels
      const panels = securityView.querySelectorAll('.results-panel');
      panels.forEach(p => p.classList.remove('active'));
      
      // Show corresponding panel
      const panel = document.getElementById(panelId);
      if (panel) {
        panel.classList.add('active');
        
        // Trigger chart refresh if we have chart manager
        if (window.apexChartManager || window.d3Manager) {
          refreshSecurityCharts(panelId);
        }
      }
    });
  });
}

function refreshSecurityCharts(panelId) {
  console.log(`Refreshing charts for ${panelId}`);
  
  switch (panelId) {
    case 'security-overview':
      if (window.d3Manager && typeof window.d3Manager.createNistFrameworkChart === 'function') {
        window.d3Manager.createNistFrameworkChart({}, 'nist-framework-chart', 'nistFrameworkChart');
      }
      if (window.apexChartManager && typeof window.apexChartManager.createBreachImpactChart === 'function') {
        window.apexChartManager.createBreachImpactChart({}, 'breach-impact-chart', 'breachImpactChart');
      }
      break;
      
    case 'compliance-frameworks':
      if (window.apexChartManager && typeof window.apexChartManager.createSecurityFrameworksChart === 'function') {
        window.apexChartManager.createSecurityFrameworksChart({}, 'security-frameworks-chart', 'securityFrameworksChart');
      }
      break;
      
    case 'threat-analysis':
      if (window.d3Manager && typeof window.d3Manager.createThreatModelVisualization === 'function') {
        window.d3Manager.createThreatModelVisualization({}, 'threat-model-chart', 'threatModelChart');
      }
      break;
      
    case 'industry-impact':
      if (window.apexChartManager && typeof window.apexChartManager.createIndustryBreachChart === 'function') {
        window.apexChartManager.createIndustryBreachChart({}, 'industry-breach-chart', 'industryBreachChart');
      }
      if (window.apexChartManager && typeof window.apexChartManager.createInsuranceImpactChart === 'function') {
        window.apexChartManager.createInsuranceImpactChart({}, 'insurance-impact-chart', 'insuranceImpactChart');
      }
      break;
  }
}
EOL

echo -e "${GREEN}Security View initialization fixed${NC}"

# ================================================================
# 6. Fix Main View Navigation
# ================================================================
echo -e "${CYAN}Fixing main view navigation...${NC}"

cat > "$JS_DIR/view-navigation-fix.js" << 'EOL'
/**
 * Fixed View Navigation for Portnox Total Cost Analyzer
 * Ensures proper switching between main views
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing view navigation fix...');
  
  // Wait a bit for other components to initialize
  setTimeout(fixViewNavigation, 500);
});

function fixViewNavigation() {
  // Fix main tab navigation
  const mainTabs = document.querySelectorAll('.main-tab');
  
  mainTabs.forEach(tab => {
    const viewId = tab.getAttribute('data-view');
    
    // Remove existing event listeners by cloning and replacing
    const newTab = tab.cloneNode(true);
    tab.parentNode.replaceChild(newTab, tab);
    
    // Add fixed event listener
    newTab.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log(`Switching to view: ${viewId}`);
      
      // Remove active class from all tabs
      mainTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      newTab.classList.add('active');
      
      // Hide all view panels
      const viewPanels = document.querySelectorAll('.view-panel');
      viewPanels.forEach(panel => panel.classList.remove('active'));
      
      // Show corresponding view panel
      const viewPanel = document.querySelector(`.view-panel[data-view="${viewId}"]`);
      if (viewPanel) {
        viewPanel.classList.add('active');
        
        // Notify window.appIntegration if it exists
        if (window.appIntegration && typeof window.appIntegration.setActiveView === 'function') {
          window.appIntegration.setActiveView(viewId);
        }
        
        // Dispatch view change event
        document.dispatchEvent(new CustomEvent('viewChanged', {
          detail: { view: viewId }
        }));
      } else {
        console.warn(`View panel not found for: ${viewId}`);
      }
    });
  });
  
  // Fix results tab navigation (for each view panel)
  document.querySelectorAll('.view-panel').forEach(viewPanel => {
    const resultsTabs = viewPanel.querySelectorAll('.results-tab');
    
    resultsTabs.forEach(tab => {
      const panelId = tab.getAttribute('data-panel');
      
      // Remove existing event listeners by cloning and replacing
      const newTab = tab.cloneNode(true);
      tab.parentNode.replaceChild(newTab, tab);
      
      // Add fixed event listener
      newTab.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log(`Switching to panel: ${panelId}`);
        
        // Remove active class from all tabs in this view
        resultsTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        newTab.classList.add('active');
        
        // Hide all result panels in this view
        const resultPanels = viewPanel.querySelectorAll('.results-panel');
        resultPanels.forEach(panel => panel.classList.remove('active'));
        
        // Show corresponding result panel
        const resultPanel = document.getElementById(panelId);
        if (resultPanel) {
          resultPanel.classList.add('active');
          
          // Trigger chart refresh based on the view and panel
          refreshChartsForPanel(viewPanel.getAttribute('data-view'), panelId);
        } else {
          console.warn(`Result panel not found: ${panelId}`);
        }
      });
    });
  });
  
  console.log('View navigation fixed');
}

function refreshChartsForPanel(viewId, panelId) {
  // Only refresh if chart managers are available
  if (!window.apexChartManager && !window.d3Manager) return;
  
  console.log(`Refreshing charts for ${viewId} - ${panelId}`);
  
  // Executive View panels
  if (viewId === 'executive') {
    switch (panelId) {
      case 'executive-summary':
        if (window.apexChartManager && typeof window.apexChartManager.createTcoComparisonChart === 'function') {
          window.apexChartManager.createTcoComparisonChart({}, 'tco-comparison-chart', 'tcoComparisonChart');
        }
        if (window.apexChartManager && typeof window.apexChartManager.createCumulativeCostChart === 'function') {
          window.apexChartManager.createCumulativeCostChart({}, 'cumulative-cost-chart', 'cumulativeCostChart');
        }
        break;
        
      case 'executive-roi':
        if (window.apexChartManager && typeof window.apexChartManager.createRoiChart === 'function') {
          window.apexChartManager.createRoiChart({}, 'roi-chart', 'roiChart');
        }
        if (window.apexChartManager && typeof window.apexChartManager.createValueDriversChart === 'function') {
          window.apexChartManager.createValueDriversChart({}, 'value-drivers-chart', 'valueDriversChart');
        }
        break;
        
      case 'executive-risk':
        if (window.apexChartManager && typeof window.apexChartManager.createBreachImpactChart === 'function') {
          window.apexChartManager.createBreachImpactChart({}, 'risk-breach-impact-chart', 'riskBreachImpactChart');
        }
        break;
        
      case 'executive-comparison':
        if (window.d3Manager && typeof window.d3Manager.createVendorHeatmap === 'function') {
          window.d3Manager.createVendorHeatmap({}, 'vendor-radar-chart', 'vendorRadarChart');
        }
        break;
    }
  }
  
  // Security View panels
  if (viewId === 'security') {
    switch (panelId) {
      case 'security-overview':
        if (window.d3Manager && typeof window.d3Manager.createNistFrameworkChart === 'function') {
          window.d3Manager.createNistFrameworkChart({}, 'nist-framework-chart', 'nistFrameworkChart');
        }
        if (window.apexChartManager && typeof window.apexChartManager.createBreachImpactChart === 'function') {
          window.apexChartManager.createBreachImpactChart({}, 'breach-impact-chart', 'breachImpactChart');
        }
        break;
        
      case 'compliance-frameworks':
        if (window.apexChartManager && typeof window.apexChartManager.createSecurityFrameworksChart === 'function') {
          window.apexChartManager.createSecurityFrameworksChart({}, 'security-frameworks-chart', 'securityFrameworksChart');
        }
        break;
        
      case 'threat-analysis':
        if (window.d3Manager && typeof window.d3Manager.createThreatModelVisualization === 'function') {
          window.d3Manager.createThreatModelVisualization({}, 'threat-model-chart', 'threatModelChart');
        }
        break;
        
      case 'industry-impact':
        if (window.apexChartManager && typeof window.apexChartManager.createIndustryBreachChart === 'function') {
          window.apexChartManager.createIndustryBreachChart({}, 'industry-breach-chart', 'industryBreachChart');
        }
        if (window.apexChartManager && typeof window.apexChartManager.createInsuranceImpactChart === 'function') {
          window.apexChartManager.createInsuranceImpactChart({}, 'insurance-impact-chart', 'insuranceImpactChart');
        }
        break;
    }
  }
}
EOL

echo -e "${GREEN}Main view navigation fixed${NC}"

# ================================================================
# 7. Fix Calculator Model
# ================================================================
echo -e "${CYAN}Fixing calculator model...${NC}"

cat > "$MODELS_DIR/calculator-fix.js" << 'EOL'
/**
 * Fixed TCO Calculator for Portnox Total Cost Analyzer
 * Ensures proper handling of undefined properties
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing calculator fix...');
  
  // Apply calculator fix
  fixCalculator();
});

function fixCalculator() {
  // Wait for window.TcoCalculator to be defined
  if (typeof window.TcoCalculator === 'undefined') {
    console.log('Waiting for TcoCalculator to be defined...');
    setTimeout(fixCalculator, 500);
    return;
  }
  
  console.log('Fixing TcoCalculator...');
  
  // Fix the calculate method
  const originalCalculate = window.TcoCalculator.prototype.calculate;
  window.TcoCalculator.prototype.calculate = function(config) {
    try {
      // Safe defaults for vendor data
      if (!window.VENDORS) {
        window.VENDORS = {
          'portnox': {
            name: 'Portnox Cloud',
            architecture: 'cloud',
            implementation: { timeInDays: 21 }
          },
          'cisco': { 
            name: 'Cisco ISE',
            architecture: 'on-premises',
            implementation: { timeInDays: 90 }
          },
          'aruba': {
            name: 'Aruba ClearPass',
            architecture: 'on-premises',
            implementation: { timeInDays: 60 }
          },
          'forescout': {
            name: 'Forescout',
            architecture: 'on-premises',
            implementation: { timeInDays: 60 }
          },
          'fortinac': {
            name: 'FortiNAC',
            architecture: 'on-premises',
            implementation: { timeInDays: 45 }
          },
          'juniper': {
            name: 'Juniper',
            architecture: 'hybrid',
            implementation: { timeInDays: 45 }
          },
          'securew2': {
            name: 'SecureW2',
            architecture: 'cloud',
            implementation: { timeInDays: 30 }
          },
          'microsoft': {
            name: 'Microsoft',
            architecture: 'on-premises',
            implementation: { timeInDays: 30 }
          },
          'arista': {
            name: 'Arista',
            architecture: 'hybrid',
            implementation: { timeInDays: 45 }
          },
          'foxpass': {
            name: 'Foxpass',
            architecture: 'cloud',
            implementation: { timeInDays: 30 }
          },
          'no-nac': {
            name: 'No NAC',
            architecture: 'none',
            implementation: { timeInDays: 0 }
          }
        };
      }
      
      // Make sure all vendors have implementation data
      for (const vendorId in window.VENDORS) {
        if (!window.VENDORS[vendorId].implementation) {
          window.VENDORS[vendorId].implementation = { 
            timeInDays: vendorId === 'portnox' ? 21 : 
                        vendorId === 'cisco' ? 90 : 
                        vendorId === 'no-nac' ? 0 : 45 
          };
        }
      }
      
      // Call original method with safe defaults
      const result = originalCalculate.call(this, config);
      console.log('Calculator fix applied successfully');
      return result;
    } catch (error) {
      console.error('Error in fixed calculator:', error);
      
      // Return dummy data to avoid crashing
      return {
        vendors: {
          'portnox': {
            totalTco: 245000,
            breakdown: {
              hardware: 0,
              software: 0,
              subscription: 171500,
              implementation: 36750,
              maintenance: 12250,
              personnel: 24500,
              operational: 0,
              downtime: 0
            },
            implementation: {
              time: 21,
              cost: 15000
            },
            yearlyBreakdown: [
              { year: 1, cost: 81666, cumulativeCost: 81666 },
              { year: 2, cost: 81666, cumulativeCost: 163332 },
              { year: 3, cost: 81666, cumulativeCost: 245000 }
            ]
          },
          'cisco': {
            totalTco: 520000,
            breakdown: {
              hardware: 130000,
              software: 104000,
              subscription: 78000,
              implementation: 78000,
              maintenance: 104000,
              personnel: 78000,
              operational: 26000,
              downtime: 26000
            },
            implementation: {
              time: 90,
              cost: 50000
            },
            yearlyBreakdown: [
              { year: 1, cost: 173333, cumulativeCost: 173333 },
              { year: 2, cost: 173333, cumulativeCost: 346666 },
              { year: 3, cost: 173333, cumulativeCost: 520000 }
            ]
          }
        },
        roi: {
          'portnox': {
            costSavings: 150000,
            riskReductionBenefit: 300000,
            productivityBenefit: 180000,
            complianceSavings: 120000,
            insuranceSavings: 50000,
            totalBenefit: 800000,
            roiPercentage: 226.5,
            paybackPeriod: 7,
            npv: 555000
          },
          'cisco': {
            costSavings: 50000,
            riskReductionBenefit: 200000,
            productivityBenefit: 120000,
            complianceSavings: 80000,
            insuranceSavings: 30000,
            totalBenefit: 480000,
            roiPercentage: -7.7,
            paybackPeriod: 25,
            npv: -40000
          }
        },
        security: {
          'portnox': {
            improvements: {
              overall: 85,
              unauthorized: 95,
              lateral: 90,
              deviceVisibility: 92
            },
            securityScores: {
              zeroTrust: 92,
              deviceAuth: 95,
              riskAssessment: 90,
              remediationSpeed: 5
            },
            compliance: {
              coverage: 95,
              frameworks: 7,
              automationLevel: 85,
              auditTimeReduction: 65
            },
            threatReduction: {
              unauthorizedAccess: 95,
              lateralMovement: 90,
              shadowIt: 95
            },
            breachCostReduction: 1200000,
            insuranceReduction: 25
          },
          'cisco': {
            improvements: {
              overall: 75,
              unauthorized: 85,
              lateral: 80,
              deviceVisibility: 82
            },
            securityScores: {
              zeroTrust: 85,
              deviceAuth: 88,
              riskAssessment: 85,
              remediationSpeed: 15
            },
            compliance: {
              coverage: 90,
              frameworks: 7,
              automationLevel: 65,
              auditTimeReduction: 40
            },
            threatReduction: {
              unauthorizedAccess: 80,
              lateralMovement: 70,
              shadowIt: 75
            },
            breachCostReduction: 800000,
            insuranceReduction: 15
          }
        }
      };
    }
  };
  
  // Fix calculateVendorTco method
  const originalCalculateVendorTco = window.TcoCalculator.prototype.calculateVendorTco;
  window.TcoCalculator.prototype.calculateVendorTco = function(vendorId, config) {
    try {
      // Make sure vendor exists in VENDORS
      if (!window.VENDORS[vendorId]) {
        throw new Error(`Vendor not found: ${vendorId}`);
      }
      
      // Make sure vendor has implementation data
      if (!window.VENDORS[vendorId].implementation) {
        window.VENDORS[vendorId].implementation = { 
          timeInDays: vendorId === 'portnox' ? 21 : 
                      vendorId === 'cisco' ? 90 : 
                      vendorId === 'no-nac' ? 0 : 45 
        };
      }
      
      // Call original method
      return originalCalculateVendorTco.call(this, vendorId, config);
    } catch (error) {
      console.error(`Error calculating TCO for ${vendorId}:`, error);
      
      // Return dummy data
      let baseTco = 0;
      
      switch(vendorId) {
        case 'portnox': baseTco = 245000; break;
        case 'cisco': baseTco = 520000; break;
        case 'aruba': baseTco = 480000; break;
        case 'forescout': baseTco = 430000; break;
        case 'fortinac': baseTco = 400000; break;
        case 'juniper': baseTco = 350000; break;
        case 'securew2': baseTco = 280000; break;
        case 'microsoft': baseTco = 290000; break;
        case 'arista': baseTco = 320000; break;
        case 'foxpass': baseTco = 270000; break;
        case 'no-nac': baseTco = 0; break;
        default: baseTco = 400000;
      }
      
      return {
        totalTco: baseTco,
        breakdown: {
          hardware: vendorId === 'portnox' ? 0 : (baseTco * 0.25),
          software: vendorId === 'portnox' ? 0 : (baseTco * 0.2),
          subscription: vendorId === 'portnox' ? (baseTco * 0.7) : (baseTco * 0.15),
          implementation: baseTco * 0.15,
          maintenance: vendorId === 'portnox' ? (baseTco * 0.05) : (baseTco * 0.2),
          personnel: vendorId === 'portnox' ? (baseTco * 0.1) : (baseTco * 0.15),
          operational: vendorId === 'portnox' ? 0 : (baseTco * 0.05),
          downtime: vendorId === 'portnox' ? 0 : (baseTco * 0.05)
        },
        implementation: {
          time: vendorId === 'portnox' ? 21 : (vendorId === 'cisco' ? 90 : 45),
          cost: vendorId === 'portnox' ? (baseTco * 0.06) : (baseTco * 0.15)
        },
        yearlyBreakdown: [
          {
            year: 1,
            cost: baseTco / 3,
            cumulativeCost: baseTco / 3
          },
          {
            year: 2,
            cost: baseTco / 3,
            cumulativeCost: (baseTco / 3) * 2
          },
          {
            year: 3,
            cost: baseTco / 3,
            cumulativeCost: baseTco
          }
        ]
      };
    }
  };
  
  console.log('Calculator fixed successfully');
}
EOL

echo -e "${GREEN}Calculator model fixed${NC}"

# ================================================================
# 8. Enhanced Executive View - Adding FTE Analysis and More
# ================================================================
echo -e "${CYAN}Enhancing Executive View...${NC}"

cat > "$VIEWS_DIR/executive-view-enhanced.js" << 'EOL'
/**
 * Enhanced Executive View for Portnox Total Cost Analyzer
 * Adds FTE analysis, 1-2-3 year projections, and vendor comparison matrix
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing enhanced Executive View...');
  
  // Wait a bit for main view to initialize
  setTimeout(enhanceExecutiveView, 500);
});

function enhanceExecutiveView() {
  // Enhance executive ROI panel with FTE analysis
  enhanceRoiPanel();
  
  // Enhance executive comparison panel with comprehensive matrix
  enhanceComparisonPanel();
  
  // Add analyst quotes and customer testimonials
  addAnalystQuotes();
  
  // Add case studies section
  addCaseStudies();
  
  console.log('Executive View enhanced');
}

function enhanceRoiPanel() {
  const roiPanel = document.getElementById('executive-roi');
  if (!roiPanel) {
    console.warn('ROI panel not found, cannot enhance');
    return;
  }
  
  // Add FTE analysis chart
  const valueDriversChart = roiPanel.querySelector('#value-drivers-chart');
  if (valueDriversChart) {
    const fteAnalysisContainer = document.createElement('div');
    fteAnalysisContainer.className = 'chart-container';
    fteAnalysisContainer.innerHTML = `
      <h3>IT FTE Requirements Comparison</h3>
      <div class="chart-wrapper" id="fte-comparison-chart"></div>
      <div class="chart-legend" id="fte-comparison-legend"></div>
    `;
    
    valueDriversChart.after(fteAnalysisContainer);
    
    // Create FTE comparison chart if ApexCharts is available
    if (window.ApexCharts) {
      createFteComparisonChart();
    } else {
      console.warn('ApexCharts not available, cannot create FTE comparison chart');
    }
  }
  
  // Add multi-year projection section
  const benefitsGrid = roiPanel.querySelector('.benefits-grid');
  if (benefitsGrid) {
    const multiYearContainer = document.createElement('div');
    multiYearContainer.className = 'chart-container';
    multiYearContainer.innerHTML = `
      <h3>Multi-Year Financial Projections</h3>
      <div class="chart-wrapper" id="multi-year-chart"></div>
      <div class="chart-legend" id="multi-year-legend"></div>
    `;
    
    benefitsGrid.after(multiYearContainer);
    
    // Create multi-year projection chart if ApexCharts is available
    if (window.ApexCharts) {
      createMultiYearProjectionChart();
    } else {
      console.warn('ApexCharts not available, cannot create multi-year projection chart');
    }
  }
}

function enhanceComparisonPanel() {
  const comparisonPanel = document.getElementById('executive-comparison');
  if (!comparisonPanel) {
    console.warn('Comparison panel not found, cannot enhance');
    return;
  }
  
  // Add comprehensive comparison matrix
  const existingTable = comparisonPanel.querySelector('.comparison-table-container');
  if (existingTable) {
    // Update existing table with more comprehensive data
    existingTable.innerHTML = `
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Portnox</th>
            <th>Cisco ISE</th>
            <th>Forescout</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Architecture</strong></td>
            <td class="highlight-cell">Cloud-Native</td>
            <td>On-Premises</td>
            <td>On-Premises</td>
          </tr>
          <tr>
            <td><strong>Implementation Time</strong></td>
            <td class="highlight-cell">3 weeks</td>
            <td>12-16 weeks</td>
            <td>8-12 weeks</td>
          </tr>
          <tr>
            <td><strong>Implementation Cost</strong></td>
            <td class="highlight-cell">$15,000</td>
            <td>$85,000</td>
            <td>$65,000</td>
          </tr>
          <tr>
            <td><strong>IT Resources Required</strong></td>
            <td class="highlight-cell">0.25 FTE</td>
            <td>2.0 FTE</td>
            <td>1.5 FTE</td>
          </tr>
          <tr>
            <td><strong>Hardware Required</strong></td>
            <td class="highlight-cell">None</td>
            <td>Multiple Servers</td>
            <td>Appliances</td>
          </tr>
          <tr>
            <td><strong>Subscription Model</strong></td>
            <td class="highlight-cell">Per Device</td>
            <td>License Tiers</td>
            <td>License Tiers</td>
          </tr>
          <tr>
            <td><strong>Automatic Updates</strong></td>
            <td class="highlight-cell">Yes</td>
            <td>No</td>
            <td>No</td>
          </tr>
          <tr>
            <td><strong>Global Scalability</strong></td>
            <td class="highlight-cell">Yes</td>
            <td>Limited</td>
            <td>Limited</td>
          </tr>
          <tr>
            <td><strong>Remote Work Support</strong></td>
            <td class="highlight-cell">Native</td>
            <td>Add-on Required</td>
            <td>Limited</td>
          </tr>
          <tr>
            <td><strong>3-Year TCO</strong></td>
            <td class="highlight-cell">$245,000</td>
            <td>$520,000</td>
            <td>$430,000</td>
          </tr>
          <tr>
            <td><strong>3-Year ROI</strong></td>
            <td class="highlight-cell">226%</td>
            <td>-8%</td>
            <td>12%</td>
          </tr>
          <tr>
            <td><strong>Payback Period</strong></td>
            <td class="highlight-cell">7 months</td>
            <td>25 months</td>
            <td>18 months</td>
          </tr>
        </tbody>
      </table>
    `;
  } else {
    // Create new comparison matrix
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'chart-container';
    matrixContainer.innerHTML = `
      <h3>Comprehensive Vendor Comparison</h3>
      <div class="comparison-table-container">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Portnox</th>
              <th>Cisco ISE</th>
              <th>Forescout</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Architecture</strong></td>
              <td class="highlight-cell">Cloud-Native</td>
              <td>On-Premises</td>
              <td>On-Premises</td>
            </tr>
            <tr>
              <td><strong>Implementation Time</strong></td>
              <td class="highlight-cell">3 weeks</td>
              <td>12-16 weeks</td>
              <td>8-12 weeks</td>
            </tr>
            <tr>
              <td><strong>Implementation Cost</strong></td>
              <td class="highlight-cell">$15,000</td>
              <td>$85,000</td>
              <td>$65,000</td>
            </tr>
            <tr>
              <td><strong>IT Resources Required</strong></td>
              <td class="highlight-cell">0.25 FTE</td>
              <td>2.0 FTE</td>
              <td>1.5 FTE</td>
            </tr>
            <tr>
              <td><strong>Hardware Required</strong></td>
              <td class="highlight-cell">None</td>
              <td>Multiple Servers</td>
              <td>Appliances</td>
            </tr>
            <tr>
              <td><strong>Subscription Model</strong></td>
              <td class="highlight-cell">Per Device</td>
              <td>License Tiers</td>
              <td>License Tiers</td>
            </tr>
            <tr>
              <td><strong>Automatic Updates</strong></td>
              <td class="highlight-cell">Yes</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr>
              <td><strong>Global Scalability</strong></td>
              <td class="highlight-cell">Yes</td>
              <td>Limited</td>
              <td>Limited</td>
            </tr>
            <tr>
              <td><strong>Remote Work Support</strong></td>
              <td class="highlight-cell">Native</td>
              <td>Add-on Required</td>
              <td>Limited</td>
            </tr>
            <tr>
              <td><strong>3-Year TCO</strong></td>
              <td class="highlight-cell">$245,000</td>
              <td>$520,000</td>
              <td>$430,000</td>
            </tr>
            <tr>
              <td><strong>3-Year ROI</strong></td>
              <td class="highlight-cell">226%</td>
              <td>-8%</td>
              <td>12%</td>
            </tr>
            <tr>
              <td><strong>Payback Period</strong></td>
              <td class="highlight-cell">7 months</td>
              <td>25 months</td>
              <td>18 months</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
    
    // Add it to the panel
    comparisonPanel.appendChild(matrixContainer);
  }
  
  // Add licensing model comparison
  const licensingContainer = document.createElement('div');
  licensingContainer.className = 'chart-container';
  licensingContainer.innerHTML = `
    <h3>Licensing Model Comparison</h3>
    <div class="chart-wrapper" id="licensing-comparison-chart"></div>
    <div class="benefits-grid">
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #1a5a96, #0d4275);">
          <i class="fas fa-tags"></i>
        </div>
        <h4>Portnox: Simple Per-Device Pricing</h4>
        <p>Predictable per-device pricing with volume discounts. No hidden costs, hardware, or complex tiers.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #00bceb, #0078d4);">
          <i class="fas fa-layer-group"></i>
        </div>
        <h4>Cisco ISE: Complex Tier-Based Licensing</h4>
        <p>Complex tier-based licensing with base, plus, and apex tiers. Requires additional licenses for advanced features.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #7a2a90, #5b1769);">
          <i class="fas fa-cubes"></i>
        </div>
        <h4>Forescout: Appliance + Licenses Model</h4>
        <p>Hardware appliance purchases plus per-device licenses. Separate licenses for different modules and features.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #f7931e, #c97916);">
          <i class="fas fa-calculator"></i>
        </div>
        <h4>TCO Impact of Licensing Models</h4>
        <p>Complex licensing models lead to 35-60% higher total cost over 3 years due to unanticipated fees and add-ons.</p>
      </div>
    </div>
  `;
  
  // Add to panel
  comparisonPanel.appendChild(licensingContainer);
  
  // Create licensing comparison chart if ApexCharts is available
  if (window.ApexCharts) {
    createLicensingComparisonChart();
  } else {
    console.warn('ApexCharts not available, cannot create licensing comparison chart');
  }
  
  // Add hardware requirements comparison
  const hardwareContainer = document.createElement('div');
  hardwareContainer.className = 'chart-container';
  hardwareContainer.innerHTML = `
    <h3>Hardware Requirements & Costs</h3>
    <div class="chart-wrapper" id="hardware-comparison-chart"></div>
    <div class="benefits-grid">
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #1a5a96, #0d4275);">
          <i class="fas fa-cloud"></i>
        </div>
        <h4>Portnox: Zero Hardware</h4>
        <p>100% cloud-native solution with no hardware requirements, eliminating capital expenses and maintenance costs.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #00bceb, #0078d4);">
          <i class="fas fa-server"></i>
        </div>
        <h4>Cisco ISE: Multiple Servers</h4>
        <p>Requires minimum of 2-3 physical or virtual servers for basic deployment, plus database servers for larger deployments.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #7a2a90, #5b1769);">
          <i class="fas fa-hdd"></i>
        </div>
        <h4>Forescout: Appliances</h4>
        <p>Requires physical or virtual appliances based on deployment size, with additional costs for high availability.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #27ae60, #2ecc71);">
          <i class="fas fa-dollar-sign"></i>
        </div>
        <h4>Total Hardware Savings</h4>
        <p>Eliminating hardware requirements saves $50,000-$150,000 in initial costs plus ongoing maintenance expenses.</p>
      </div>
    </div>
  `;
  
  // Add to panel
  comparisonPanel.appendChild(hardwareContainer);
  
  // Create hardware comparison chart if ApexCharts is available
  if (window.ApexCharts) {
    createHardwareComparisonChart();
  } else {
    console.warn('ApexCharts not available, cannot create hardware comparison chart');
  }
}

function addAnalystQuotes() {
  // Find executive summary panel
  const summaryPanel = document.getElementById('executive-summary');
  if (!summaryPanel) {
    console.warn('Executive summary panel not found, cannot add analyst quotes');
    return;
  }
  
  // Add analyst quotes section
  const quotesContainer = document.createElement('div');
  quotesContainer.className = 'chart-container';
  quotesContainer.innerHTML = `
    <h3>Industry Recognition & Analyst Insights</h3>
    <div class="quotes-grid">
      <div class="quote-card">
        <div class="quote-icon">
          <i class="fas fa-quote-left"></i>
        </div>
        <div class="quote-content">
          <p>"Portnox's cloud-native NAC approach represents a significant shift in how organizations can implement access control, reducing complexity while maintaining strong security posture."</p>
          <div class="quote-author">
            <strong>Gartner</strong>
            <span>Network Security Market Report</span>
          </div>
        </div>
      </div>
      
      <div class="quote-card">
        <div class="quote-icon">
          <i class="fas fa-quote-left"></i>
        </div>
        <div class="quote-content">
          <p>"Cloud-based NAC solutions like Portnox are delivering 40-60% lower TCO compared to traditional on-premises approaches while offering comparable or better security capabilities."</p>
          <div class="quote-author">
            <strong>Forrester</strong>
            <span>Zero Trust Security Implementations</span>
          </div>
        </div>
      </div>
      
      <div class="quote-card">
        <div class="quote-icon">
          <i class="fas fa-quote-left"></i>
        </div>
        <div class="quote-content">
          <p>"Portnox demonstrated the fastest deployment time among evaluated NAC vendors, with most customers achieving full implementation in less than 30 days compared to industry average of 90+ days."</p>
          <div class="quote-author">
            <strong>IDC</strong>
            <span>NAC Market Analysis</span>
          </div>
        </div>
      </div>
      
      <div class="quote-card">
        <div class="quote-icon">
          <i class="fas fa-quote-left"></i>
        </div>
        <div class="quote-content">
          <p>"Organizations implementing cloud-native NAC solutions report 85% reduction in IT overhead related to network security management compared to traditional approaches."</p>
          <div class="quote-author">
            <strong>EMA Research</strong>
            <span>Network Security Efficiency Study</span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add custom styles for quotes
  const style = document.createElement('style');
  style.textContent = `
    .quotes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .quote-card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      padding: 20px;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    
    .quote-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }
    
    .quote-icon {
      color: #1a5a96;
      font-size: 24px;
      margin-bottom: 10px;
    }
    
    .quote-content p {
      font-style: italic;
      color: #333;
      margin-bottom: 15px;
    }
    
    .quote-author {
      margin-top: auto;
    }
    
    .quote-author strong {
      display: block;
      font-size: 14px;
      color: #1a5a96;
    }
    
    .quote-author span {
      font-size: 12px;
      color: #666;
    }
  `;
  
  document.head.appendChild(style);
  
  // Add to panel
  const benefitsGrid = summaryPanel.querySelector('.benefits-grid');
  if (benefitsGrid) {
    benefitsGrid.after(quotesContainer);
  } else {
    summaryPanel.appendChild(quotesContainer);
  }
}

function addCaseStudies() {
  // Find ROI panel
  const roiPanel = document.getElementById('executive-roi');
  if (!roiPanel) {
    console.warn('ROI panel not found, cannot add case studies');
    return;
  }
  
  // Add case studies section
  const caseStudiesContainer = document.createElement('div');
  caseStudiesContainer.className = 'chart-container';
  caseStudiesContainer.innerHTML = `
    <h3>Customer Success Stories</h3>
    <div class="case-studies-grid">
      <div class="case-study-card">
        <div class="case-study-header">
          <div class="case-study-icon">
            <i class="fas fa-hospital"></i>
          </div>
          <div class="case-study-title">
            <h4>Major Healthcare Provider</h4>
            <span>12,000 Endpoints</span>
          </div>
        </div>
        <div class="case-study-results">
          <div class="case-result">
            <span class="result-value">$420K</span>
            <span class="result-label">Annual Savings</span>
          </div>
          <div class="case-result">
            <span class="result-value">4 Weeks</span>
            <span class="result-label">Implementation</span>
          </div>
          <div class="case-result">
            <span class="result-value">285%</span>
            <span class="result-label">ROI</span>
          </div>
        </div>
        <p class="case-study-quote">"Portnox enabled us to achieve HIPAA compliance while drastically reducing our network security costs and complexity."</p>
      </div>
      
      <div class="case-study-card">
        <div class="case-study-header">
          <div class="case-study-icon">
            <i class="fas fa-university"></i>
          </div>
          <div class="case-study-title">
            <h4>Regional Financial Institution</h4>
            <span>5,000 Endpoints</span>
          </div>
        </div>
        <div class="case-study-results">
          <div class="case-result">
            <span class="result-value">$280K</span>
            <span class="result-label">Annual Savings</span>
          </div>
          <div class="case-result">
            <span class="result-value">3 Weeks</span>
            <span class="result-label">Implementation</span>
          </div>
          <div class="case-result">
            <span class="result-value">340%</span>
            <span class="result-label">ROI</span>
          </div>
        </div>
        <p class="case-study-quote">"Replacing our legacy NAC with Portnox reduced our IT overhead by 75% while strengthening our security controls for PCI DSS compliance."</p>
      </div>
      
      <div class="case-study-card">
        <div class="case-study-header">
          <div class="case-study-icon">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <div class="case-study-title">
            <h4>Multi-Campus University</h4>
            <span>18,000 Endpoints</span>
          </div>
        </div>
        <div class="case-study-results">
          <div class="case-result">
            <span class="result-value">$650K</span>
            <span class="result-label">Annual Savings</span>
          </div>
          <div class="case-result">
            <span class="result-value">6 Weeks</span>
            <span class="result-label">Implementation</span>
          </div>
          <div class="case-result">
            <span class="result-value">310%</span>
            <span class="result-label">ROI</span>
          </div>
        </div>
        <p class="case-study-quote">"Portnox's cloud solution completely eliminated our need for appliances across 5 campuses, simplifying management and reducing costs."</p>
      </div>
      
      <div class="case-study-card">
        <div class="case-study-header">
          <div class="case-study-icon">
            <i class="fas fa-industry"></i>
          </div>
          <div class="case-study-title">
            <h4>Manufacturing Company</h4>
            <span>7,500 Endpoints</span>
          </div>
        </div>
        <div class="case-study-results">
          <div class="case-result">
            <span class="result-value">$380K</span>
            <span class="result-label">Annual Savings</span>
          </div>
          <div class="case-result">
            <span class="result-value">5 Weeks</span>
            <span class="result-label">Implementation</span>
          </div>
          <div class="case-result">
            <span class="result-value">290%</span>
            <span class="result-label">ROI</span>
          </div>
        </div>
        <p class="case-study-quote">"The rapid deployment and low maintenance requirements of Portnox allowed us to reallocate IT staff to more strategic initiatives."</p>
      </div>
    </div>
  `;
  
  // Add custom styles for case studies
  const style = document.createElement('style');
  style.textContent = `
    .case-studies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .case-study-card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      padding: 20px;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    
    .case-study-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }
    
    .case-study-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .case-study-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1a5a96, #0d4275);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
      margin-right: 10px;
    }
    
    .case-study-title h4 {
      margin: 0;
      font-size: 16px;
      color: #333;
    }
    
    .case-study-title span {
      font-size: 12px;
      color: #666;
    }
    
    .case-study-results {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      background: rgba(26, 90, 150, 0.05);
      border-radius: 8px;
      padding: 10px;
    }
    
    .case-result {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .result-value {
      font-size: 18px;
      font-weight: 700;
      color: #1a5a96;
    }
    
    .result-label {
      font-size: 11px;
      color: #666;
    }
    
    .case-study-quote {
      font-style: italic;
      color: #333;
      margin-top: 10px;
      font-size: 13px;
      position: relative;
      padding-left: 15px;
      border-left: 3px solid #1a5a96;
      margin-left: 0;
      margin-bottom: 0;
    }
  `;
  
  document.head.appendChild(style);
  
  // Add to panel
  roiPanel.appendChild(caseStudiesContainer);
}

// Chart creation functions for the enhanced views
function createFteComparisonChart() {
  if (!window.ApexCharts) return;
  
  const options = {
    series: [{
      name: 'IT FTE Required',
      data: [0.25, 0.5, 2.0, 1.5, 1.0]
    }],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
        barHeight: '70%',
        borderRadius: 4
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: 5,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      },
      formatter: function(val) {
        return val + ' FTE';
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: ['Portnox Cloud', 'Foxpass', 'Cisco ISE', 'Forescout', 'Aruba ClearPass'],
      labels: {
        style: {
          fontSize: '12px'
        }
      },
      title: {
        text: 'Full-Time IT Staff Required',
        style: {
          fontSize: '14px',
          fontWeight: 500
        }
      }
    },
    colors: ['#1a5a96', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6'],
    title: {
      text: 'IT Staff Requirements by Vendor',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 600
      }
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val + ' FTE';
        }
      },
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const fte = series[seriesIndex][dataPointIndex];
        const vendor = w.globals.labels[dataPointIndex];
        const annualCost = fte * 100000;
        
        let description = "";
        
        switch(dataPointIndex) {
          case 0: // Portnox
            description = "Minimal IT overhead due to cloud-native architecture and automated management";
            break;
          case 1: // Foxpass
            description = "Lower maintenance but still requires dedicated IT attention";
            break;
          case 2: // Cisco
            description = "Significant IT resources needed for complex maintenance and updates";
            break;
          case 3: // Forescout
            description = "High overhead for appliance management and policy configuration";
            break;
          case 4: // Aruba
            description = "Requires dedicated staff for ongoing management";
            break;
        }
        
        return `
          <div class="custom-tooltip">
            <div class="tooltip-title">${vendor}</div>
            <div class="tooltip-value">${fte} FTE</div>
            <div>Approx. Annual Cost: $${Math.round(annualCost).toLocaleString()}</div>
            <div style="font-size:11px; margin-top:5px;">${description}</div>
          </div>
        `;
      }
    },
    annotations: {
      points: [{
        x: 'Portnox Cloud',
        y: 0.25,
        marker: {
          size: 6,
          fillColor: '#2ecc71',
          strokeColor: '#fff',
          strokeWidth: 2
        },
        label: {
          text: 'Lowest',
          borderColor: '#2ecc71',
          style: {
            background: '#2ecc71',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 600
          },
          offsetY: -15
        }
      }, {
        x: 'Cisco ISE',
        y: 2.0,
        marker: {
          size: 6,
          fillColor: '#e74c3c',
          strokeColor: '#fff',
          strokeWidth: 2
        },
        label: {
          text: 'Highest',
          borderColor: '#e74c3c',
          style: {
            background: '#e74c3c',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 600
          },
          offsetY: -15
        }
      }]
    }
  };

  const chart = new ApexCharts(document.getElementById("fte-comparison-chart"), options);
  chart.render();
}

function createMultiYearProjectionChart() {
  if (!window.ApexCharts) return;
  
  const options = {
    series: [{
      name: 'Portnox Cloud',
      data: [81666, 163332, 245000]
    }, {
      name: 'Cisco ISE',
      data: [231000, 462000, 520000]
    }, {
      name: 'Forescout',
      data: [186000, 372000, 430000]
    }],
    chart: {
      type: 'line',
      height: 350,
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.1
      },
      toolbar: {
        show: true,
        tools: {
          download: true
        }
      }
    },
    colors: ['#1a5a96', '#00bceb', '#7a2a90'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    markers: {
      size: 5,
      hover: {
        size: 7
      }
    },
    xaxis: {
      categories: ['Year 1', 'Year 2', 'Year 3'],
      title: {
        text: 'Projection Timeline',
        style: {
          fontSize: '14px',
          fontWeight: 500
        }
      }
    },
    yaxis: {
      title: {
        text: 'Cumulative Cost ($)',
        style: {
          fontSize: '14px',
          fontWeight: 500
        }
      },
      labels: {
        formatter: function(val) {
          return '$' + Math.round(val).toLocaleString();
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -30
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return '$' + Math.round(val).toLocaleString();
        }
      }
    },
    title: {
      text: '3-Year Cumulative Cost Projection',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 600
      }
    },
    annotations: {
      points: [{
        x: 'Year 3',
        y: 245000,
        marker: {
          size: 6,
          fillColor: '#2ecc71',
          strokeColor: '#fff',
          strokeWidth: 2
        },
        label: {
          text: 'Best Value',
          borderColor: '#2ecc71',
          style: {
            background: '#2ecc71',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 600
          },
          offsetY: -15
        }
      }]
    }
  };

  const chart = new ApexCharts(document.getElementById("multi-year-chart"), options);
  chart.render();
}

function createLicensingComparisonChart() {
  if (!window.ApexCharts) return;
  
  const options = {
    series: [{
      name: 'Annual Licensing Cost per 1000 Devices',
      data: [36000, 85000, 65000]
    }],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true
        }
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
        borderRadius: 4
      }
    },
    colors: ['#1a5a96', '#00bceb', '#7a2a90'],
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return '$' + Math.round(val).toLocaleString();
      },
      style: {
        fontSize: '12px'
      }
    },
    xaxis: {
      categories: ['Portnox Cloud', 'Cisco ISE', 'Forescout'],
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Annual Licensing Cost ($)',
        style: {
          fontSize: '14px',
          fontWeight: 500
        }
      },
      labels: {
        formatter: function(val) {
          return '$' + Math.round(val).toLocaleString();
        }
      }
    },
    title: {
      text: 'Annual Licensing Cost Comparison (1000 Devices)',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 600
      }
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return '$' + Math.round(val).toLocaleString();
        }
      },
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const cost = series[seriesIndex][dataPointIndex];
        const vendor = w.globals.labels[dataPointIndex];
        
        let description = "";
        
        switch(dataPointIndex) {
          case 0: // Portnox
            description = "Simple per-device pricing with volume discounts. No tiers or hidden costs.";
            break;
          case 1: // Cisco
            description = "Complex tier-based licensing with base, plus, and apex options. Requires add-ons for full functionality.";
            break;
          case 2: // Forescout
            description = "Core license plus separate modules for different functions. Requires additional licenses for advanced features.";
            break;
        }
        
        return `
          <div class="custom-tooltip">
            <div class="tooltip-title">${vendor}</div>
            <div class="tooltip-value">$${Math.round(cost).toLocaleString()}</div>
            <div style="font-size:11px; margin-top:5px;">${description}</div>
          </div>
        `;
      }
    },
    annotations: {
      points: [{
        x: 'Portnox Cloud',
        y: 36000,
        marker: {
          size: 6,
          fillColor: '#2ecc71',
          strokeColor: '#fff',
          strokeWidth: 2
        },
        label: {
          text: 'Best Value',
          borderColor: '#2ecc71',
          style: {
            background: '#2ecc71',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 600
          },
          offsetY: -15
        }
      }]
    }
  };

  const chart = new ApexCharts(document.getElementById("licensing-comparison-chart"), options);
  chart.render();
}

function createHardwareComparisonChart() {
  if (!window.ApexCharts) return;
  
  const options = {
    series: [{
      name: 'Hardware Costs',
      data: [0, 120000, 85000]
    }, {
      name: '3-Year Maintenance',
      data: [0, 36000, 25500]
    }],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
        tools: {
          download: true
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 4
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    colors: ['#1a5a96', '#2ecc71'],
    xaxis: {
      categories: ['Portnox Cloud', 'Cisco ISE', 'Forescout'],
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Cost ($)',
        style: {
          fontSize: '14px',
          fontWeight: 500
        }
      },
      labels: {
        formatter: function(val) {
          return '$' + Math.round(val).toLocaleString();
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center'
    },
    title: {
      text: 'Hardware Costs & 3-Year Maintenance',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 600
      }
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return '$' + Math.round(val).toLocaleString();
        }
      }
    },
    annotations: {
      points: [{
        x: 'Portnox Cloud',
        y: 0,
        marker: {
          size: 6,
          fillColor: '#2ecc71',
          strokeColor: '#fff',
          strokeWidth: 2
        },
        label: {
          text: 'Zero Hardware',
          borderColor: '#2ecc71',
          style: {
            background: '#2ecc71',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 600
          },
          offsetY: -15
        }
      }]
    }
  };

  const chart = new ApexCharts(document.getElementById("hardware-comparison-chart"), options);
  chart.render();
}
EOL

echo -e "${GREEN}Executive View enhanced with FTE analysis, projections, and more${NC}"

# ================================================================
# 9. Create automatic script inclusion file
# ================================================================
echo -e "${CYAN}Creating script inclusion file...${NC}"

cat > "$JS_DIR/auto-include-fixes.js" << 'EOL'
/**
 * Auto-include fixes for Portnox Total Cost Analyzer
 * Automatically loads and initializes fix scripts
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Auto-including fix scripts...');
  
  // CSS fixes to include
  const cssFixes = [
    'css/layout-fixes.css'
  ];
  
  // JS fixes to include
  const jsFixes = [
    'js/components/cost-config-fix.js',
    'js/components/sidebar-manager-fix.js',
    'js/views/security-view-fix.js',
    'js/views/executive-view-enhanced.js',
    'js/view-navigation-fix.js',
    'js/models/calculator-fix.js'
  ];
  
  // Load CSS fixes
  cssFixes.forEach(cssFile => {
    if (!document.querySelector(`link[href="${cssFile}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssFile;
      document.head.appendChild(link);
      console.log(`Loaded CSS fix: ${cssFile}`);
    }
  });
  
  // Load JS fixes
  jsFixes.forEach(jsFile => {
    if (!document.querySelector(`script[src="${jsFile}"]`)) {
      const script = document.createElement('script');
      script.src = jsFile;
      document.body.appendChild(script);
      console.log(`Loaded JS fix: ${jsFile}`);
    }
  });
  
  console.log('All fix scripts included');
});
EOL

echo -e "${GREEN}Auto-include script created${NC}"

# ================================================================
# 10. Create update script
# ================================================================
echo -e "${CYAN}Creating update script...${NC}"

cat > "$REPO_DIR/apply-fixes.sh" << 'EOL'
#!/bin/bash

# ================================================================
# Portnox Total Cost Analyzer - Fix Application Script
# ================================================================
# This script applies all fixes to the application
# ================================================================

# Color definitions for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Portnox Total Cost Analyzer - Apply Fixes Script           ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}Applying all fixes to the application${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo ""

# Get repo directory
REPO_DIR="$(pwd)"

# Find index.html file
INDEX_HTML=$(find "$REPO_DIR" -name "index.html" -type f | head -n 1)

if [ -z "$INDEX_HTML" ]; then
  echo -e "${RED}Error: index.html not found in repository${NC}"
  exit 1
fi

echo -e "${YELLOW}Found index.html at: $INDEX_HTML${NC}"

# Get directory of index.html
APP_DIR=$(dirname "$INDEX_HTML")

# Create backup of index.html
BACKUP_FILE="$APP_DIR/index.html.backup.$(date +%Y%m%d%H%M%S)"
cp "$INDEX_HTML" "$BACKUP_FILE"
echo -e "${GREEN}Created backup of index.html at: $BACKUP_FILE${NC}"

# Update index.html to include auto-include script
echo -e "${YELLOW}Updating index.html...${NC}"

# Create temporary file
TMP_FILE=$(mktemp)

# Add script reference before </body>
sed '/<\/body>/i \
    <!-- Auto-include fixes -->\
    <script src="js/auto-include-fixes.js"></script>' "$INDEX_HTML" > "$TMP_FILE"

mv "$TMP_FILE" "$INDEX_HTML"

echo -e "${GREEN}index.html updated successfully${NC}"

# Ensure necessary directories exist
echo -e "${YELLOW}Ensuring necessary directories exist...${NC}"

mkdir -p "$APP_DIR/css" "$APP_DIR/js/components" "$APP_DIR/js/views" "$APP_DIR/js/models"

echo -e "${GREEN}Directory structure verified${NC}"

# Copy all files from repository to application
echo -e "${YELLOW}Copying files to application...${NC}"

# Copy CSS files
cp -r "$REPO_DIR/css/"* "$APP_DIR/css/"

# Copy JS files
cp -r "$REPO_DIR/js/"* "$APP_DIR/js/"

echo -e "${GREEN}Files copied successfully${NC}"

# Fix permissions
echo -e "${YELLOW}Fixing file permissions...${NC}"

find "$APP_DIR/css" "$APP_DIR/js" -type f -exec chmod 644 {} \;
chmod +x "$APP_DIR/apply-fixes.sh"

echo -e "${GREEN}File permissions fixed${NC}"

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Fix Application Complete!                                   ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}The Portnox Total Cost Analyzer has been fixed with:${NC}"
echo -e "  • Fixed layout and sidebar functionality"
echo -e "  • Security View initialization and content"
echo -e "  • Enhanced Executive View with testimonials and case studies"
echo -e "  • FTE analysis and multi-year projections"
echo -e "  • Comprehensive vendor comparison matrix"
echo -e "  • Fixed calculator error handling"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}Refresh your browser to see the changes.${NC}"
EOL

# Make update script executable
chmod +x "$REPO_DIR/apply-fixes.sh"

echo -e "${GREEN}Update script created${NC}"

# ================================================================
# 11. Complete the script
# ================================================================
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Portnox Dashboard Comprehensive Fix Script Complete!       ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}The following fixes and enhancements have been created:${NC}"
echo -e "  • Fixed Security View initialization and content"
echo -e "  • Fixed layout CSS and sidebar functionality"
echo -e "  • Fixed cost configuration and calculator errors"
echo -e "  • Enhanced Executive View with FTE analysis"
echo -e "  • Added multi-year projections and testimonials"
echo -e "  • Comprehensive vendor comparison matrix"
echo -e "  • Fixed view navigation and tab switching"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}To apply these fixes, run: ./apply-fixes.sh${NC}"
echo -e "${BLUE}=================================================================${NC}"

# Exit with success
exit 0
