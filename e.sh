#!/bin/bash
#
# Portnox Total Cost Analyzer - Comprehensive Fix Script
# This script resolves JS errors, missing resources, and enhances the UI

# Color configuration for script output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================================${NC}"
echo -e "${BLUE}    Portnox Total Cost Analyzer - Fix & Enhancement Script    ${NC}"
echo -e "${BLUE}=========================================================${NC}"

# Create backup directory
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="portnox_backup_${TIMESTAMP}"

echo -e "${YELLOW}Creating backup directory: ${BACKUP_DIR}${NC}"
mkdir -p "${BACKUP_DIR}"

# Function to copy existing files to backup
backup_files() {
  echo -e "${YELLOW}Backing up existing files...${NC}"
  
  # JS Files
  mkdir -p "${BACKUP_DIR}/js/charts"
  cp -r js/charts/* "${BACKUP_DIR}/js/charts/"
  
  # CSS Files
  mkdir -p "${BACKUP_DIR}/css/components"
  mkdir -p "${BACKUP_DIR}/css/themes"
  mkdir -p "${BACKUP_DIR}/css/fixes"
  cp -r css/* "${BACKUP_DIR}/css/"
  
  echo -e "${GREEN}Backup complete.${NC}"
}

# Function to fix JavaScript duplicate declaration issues
fix_js_duplicates() {
  echo -e "${YELLOW}Fixing JavaScript duplicate declarations...${NC}"
  
  # Create a consolidated load script
  cat << 'EOF' > js/load-manager.js
/**
 * Consolidated Script Loader for Portnox Total Cost Analyzer
 * Prevents duplicate declarations and manages script loading order
 */

// Global namespace for all chart managers
window.Portnox = window.Portnox || {};

// Script loading tracker
window.Portnox.loadedScripts = window.Portnox.loadedScripts || {};

/**
 * Load a script only if it hasn't been loaded yet
 * @param {string} url - Script URL to load
 * @param {Function} callback - Optional callback after loading
 */
window.Portnox.loadScript = function(url, callback) {
  // If already loaded, just run callback
  if (window.Portnox.loadedScripts[url]) {
    if (callback && typeof callback === 'function') {
      callback();
    }
    return;
  }
  
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  
  // Handle callback
  if (callback && typeof callback === 'function') {
    script.onload = callback;
  }
  
  // Mark as loaded
  window.Portnox.loadedScripts[url] = true;
  
  // Add to document
  document.head.appendChild(script);
  console.log('Loaded script: ' + url);
};

/**
 * Initialize all chart managers in the correct order
 */
window.Portnox.initializeCharts = function() {
  // Define script loading order
  const scripts = [
    'js/charts/chart-config.js',
    'js/charts/highcharts/highcharts-manager.js',
    'js/charts/apex/apex-charts.js',
    'js/charts/d3/d3-manager.js',
    'js/charts/security-charts.js',
    'js/charts/chart-loader.js'
  ];
  
  // Load scripts in sequence
  let index = 0;
  function loadNext() {
    if (index < scripts.length) {
      const script = scripts[index++];
      window.Portnox.loadScript(script, loadNext);
    } else {
      // All scripts loaded, now initialize
      console.log('All chart scripts loaded successfully');
      
      // Initialize chart loader if available
      if (window.ChartLoader) {
        window.chartLoader = new ChartLoader().init();
      }
    }
  }
  
  // Start loading
  loadNext();
};

// Fix for chart configuration to prevent duplicate declaration
window.Portnox.initChartConfig = function() {
  if (!window.ChartConfig) {
    window.ChartConfig = {
      colors: {
        primary: '#1a5a96',
        secondary: '#0d4275',
        highlight: '#27ae60',
        warning: '#e74c3c',
        neutral: '#3498db',
        chart: [
          '#1a5a96', // Portnox Blue
          '#e74c3c', // Cisco Red
          '#e67e22', // Aruba Orange
          '#f39c12', // Forescout Amber
          '#2ecc71', // FortiNAC Green
          '#3498db', // Juniper Blue
          '#9b59b6', // SecureW2 Purple
          '#34495e', // Microsoft Navy
          '#16a085', // Arista Teal
          '#27ae60'  // Foxpass Green
        ]
      },
      
      defaults: {
        fontFamily: '"Nunito", sans-serif',
        fontSize: 12
      },
      
      // Get colors for vendor IDs
      getVendorColor: function(vendorId) {
        // Map vendor IDs to color indexes
        const vendorColorMap = {
          'portnox': 0,
          'cisco': 1,
          'aruba': 2,
          'forescout': 3,
          'fortinac': 4,
          'juniper': 5,
          'securew2': 6,
          'microsoft': 7,
          'arista': 8,
          'foxpass': 9
        };
        
        const colorIndex = vendorColorMap[vendorId] !== undefined ? vendorColorMap[vendorId] : 0;
        return this.colors.chart[colorIndex];
      },
      
      // Format currency values
      formatCurrency: function(value) {
        return '$' + value.toLocaleString();
      }
    };
  }
};

// Initialize chart config immediately
window.Portnox.initChartConfig();

// Document ready handler
document.addEventListener('DOMContentLoaded', function() {
  window.Portnox.initializeCharts();
  
  // Initialize view organization after charts
  if (typeof organizeViews === 'function') {
    setTimeout(organizeViews, 500);
  }
  
  // Initialize views
  if (typeof initializeViews === 'function') {
    setTimeout(initializeViews, 1000);
  }
});
EOF

  echo -e "${GREEN}Created consolidated script loader.${NC}"
}

# Function to fix missing images
fix_missing_images() {
  echo -e "${YELLOW}Fixing missing image resources...${NC}"
  
  # Create images directory if it doesn't exist
  mkdir -p img/analysts
  
  # Create placeholder images for missing analyst logos
  create_placeholder_image() {
    local file=$1
    local text=$2
    local background=$3
    local foreground=$4
    
    # Create a simple SVG placeholder
    cat > "$file" << EOF
<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="100" fill="$background"/>
  <text x="50%" y="50%" font-family="Arial" font-size="16" fill="$foreground" text-anchor="middle" dominant-baseline="middle">$text</text>
</svg>
EOF
    
    echo -e "${GREEN}Created placeholder image: $file${NC}"
  }
  
  # Create analyst logo placeholders
  create_placeholder_image "img/analysts/gartner.svg" "Gartner" "#0A2339" "#FFFFFF"
  create_placeholder_image "img/analysts/forrester.svg" "Forrester" "#242A35" "#FFFFFF"
  create_placeholder_image "img/analysts/idc.svg" "IDC" "#0076CE" "#FFFFFF"
  create_placeholder_image "img/analysts/ema.svg" "EMA" "#1A5A96" "#FFFFFF"
  
  # Create HTML file to reference SVG files instead of missing PNGs
  cat << 'EOF' > js/fix-images.js
/**
 * Fix missing images by replacing with SVG versions
 */
document.addEventListener('DOMContentLoaded', function() {
  // Map of PNG files to SVG replacements
  const imageReplacements = {
    'gartner.png': 'img/analysts/gartner.svg',
    'forrester.png': 'img/analysts/forrester.svg',
    'idc.png': 'img/analysts/idc.svg',
    'ema.png': 'img/analysts/ema.svg'
  };
  
  // Replace image sources
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    
    // Check if this is one of our missing images
    if (src) {
      const filename = src.split('/').pop();
      if (imageReplacements[filename]) {
        img.setAttribute('src', imageReplacements[filename]);
        console.log('Replaced image source: ' + src + ' -> ' + imageReplacements[filename]);
      }
    }
  });
});
EOF

  echo -e "${GREEN}Created image fixer script.${NC}"
}

# Function to fix view organization issues
fix_view_organization() {
  echo -e "${YELLOW}Fixing view organization issues...${NC}"
  
  # Create a fixed version of the view organization script
  cat << 'EOF' > js/view-organization-fix.js
/**
 * Fixed View Organization for Portnox Total Cost Analyzer
 * Ensures proper DOM hierarchy and prevents circular references
 */

// Store references to views
window.viewReferences = {
  executive: null,
  financial: null,
  security: null,
  technical: null
};

// Initialize security view with necessary methods
window.securityView = {
  createPanelsIfNeeded: function() {
    console.log('Creating security view panels');
    
    const securityPanel = document.querySelector('.view-panel[data-view="security"]');
    if (!securityPanel) return;
    
    // Check if panels already exist
    if (securityPanel.querySelector('.results-tabs')) return;
    
    // Create tabs container
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'results-tabs';
    
    // Create risk tab
    const riskTab = document.createElement('button');
    riskTab.className = 'results-tab active';
    riskTab.setAttribute('data-tab', 'risk');
    riskTab.innerHTML = '<i class="fas fa-shield-alt"></i> Risk Assessment';
    tabsContainer.appendChild(riskTab);
    
    // Create compliance tab
    const complianceTab = document.createElement('button');
    complianceTab.className = 'results-tab';
    complianceTab.setAttribute('data-tab', 'compliance');
    complianceTab.innerHTML = '<i class="fas fa-check-circle"></i> Compliance';
    tabsContainer.appendChild(complianceTab);
    
    // Create breach tab
    const breachTab = document.createElement('button');
    breachTab.className = 'results-tab';
    breachTab.setAttribute('data-tab', 'breach');
    breachTab.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Breach Impact';
    tabsContainer.appendChild(breachTab);
    
    // Add tabs to panel
    securityPanel.appendChild(tabsContainer);
    
    // Create panel containers
    const panels = ['risk', 'compliance', 'breach'];
    panels.forEach(panelId => {
      const panelElement = document.createElement('div');
      panelElement.className = 'results-panel';
      panelElement.setAttribute('data-panel', panelId);
      
      if (panelId === 'risk') {
        panelElement.classList.add('active');
        
        // Add risk assessment content
        panelElement.innerHTML = `
          <div class="panel-header">
            <h2>Security Risk Assessment</h2>
            <p class="subtitle">Analysis of security posture and risk mitigation with Portnox Cloud</p>
          </div>
          
          <div class="dashboard-grid">
            <div class="dashboard-card highlight-card">
              <h3>Risk Reduction</h3>
              <div class="metric-value highlight-value">85%</div>
              <div class="metric-label">Overall risk reduction with Portnox Cloud</div>
              <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 15% better than industry average</div>
            </div>
            
            <div class="dashboard-card">
              <h3>Threat Detection</h3>
              <div class="metric-value">97%</div>
              <div class="metric-label">Accuracy in identifying threats</div>
              <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 12% improvement</div>
            </div>
            
            <div class="dashboard-card">
              <h3>Response Time</h3>
              <div class="metric-value">4.5 min</div>
              <div class="metric-label">Average time to respond to incidents</div>
              <div class="metric-trend down"><i class="fas fa-arrow-down"></i> 68% faster</div>
            </div>
            
            <div class="dashboard-card">
              <h3>Compliance Score</h3>
              <div class="metric-value">94%</div>
              <div class="metric-label">Overall compliance status</div>
              <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 23% increase</div>
            </div>
          </div>
          
          <div class="chart-container">
            <h3><i class="fas fa-shield-alt"></i> NIST Cybersecurity Framework</h3>
            <div class="chart-wrapper" id="nist-framework-chart"></div>
          </div>
        `;
      } else if (panelId === 'compliance') {
        // Add compliance content
        panelElement.innerHTML = `
          <div class="panel-header">
            <h2>Compliance Coverage</h2>
            <p class="subtitle">Regulatory compliance capabilities across industry standards</p>
          </div>
          
          <div class="chart-container">
            <h3><i class="fas fa-check-circle"></i> Compliance Framework Coverage</h3>
            <div class="chart-wrapper" id="security-frameworks-chart"></div>
          </div>
        `;
      } else if (panelId === 'breach') {
        // Add breach impact content
        panelElement.innerHTML = `
          <div class="panel-header">
            <h2>Breach Impact Analysis</h2>
            <p class="subtitle">Financial impact of security breaches and mitigation</p>
          </div>
          
          <div class="chart-container">
            <h3><i class="fas fa-exclamation-triangle"></i> Breach Cost & Response Time</h3>
            <div class="chart-wrapper" id="breach-impact-chart"></div>
          </div>
        `;
      }
      
      securityPanel.appendChild(panelElement);
    });
    
    // Add event listeners to tabs
    tabsContainer.querySelectorAll('.results-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        tabsContainer.querySelectorAll('.results-tab').forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Hide all panels
        const panels = securityPanel.querySelectorAll('.results-panel');
        panels.forEach(p => p.classList.remove('active'));
        
        // Show selected panel
        const tabId = this.getAttribute('data-tab');
        securityPanel.querySelector(`.results-panel[data-panel="${tabId}"]`).classList.add('active');
      });
    });
  }
};

// Safe organizeViews function that avoids hierarchy issues
function organizeViews() {
  console.log('Organizing views safely...');
  
  // Get all view panels
  const viewPanels = document.querySelectorAll('.view-panel');
  
  // First, detach all panels from their parents to avoid hierarchy issues
  viewPanels.forEach(panel => {
    if (panel.parentNode) {
      window.viewReferences[panel.getAttribute('data-view')] = panel.cloneNode(true);
      panel.parentNode.removeChild(panel);
    }
  });
  
  // Get the main container
  const contentArea = document.querySelector('.content-area');
  if (!contentArea) {
    console.error('Content area not found');
    return;
  }
  
  // Reattach all panels to the content area
  Object.values(window.viewReferences).forEach(panel => {
    if (panel) {
      contentArea.appendChild(panel);
    }
  });
  
  // Setup tab navigation
  setupTabNavigation();
  
  console.log('Views organized successfully');
}

// Set up tab navigation
function setupTabNavigation() {
  const mainTabs = document.querySelectorAll('.main-tab');
  const viewPanels = document.querySelectorAll('.view-panel');
  
  mainTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      mainTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Hide all panels
      viewPanels.forEach(p => p.classList.remove('active'));
      
      // Show selected panel
      const view = this.getAttribute('data-view');
      const panel = document.querySelector(`.view-panel[data-view="${view}"]`);
      if (panel) {
        panel.classList.add('active');
        
        // If security view, create panels if needed
        if (view === 'security' && window.securityView && typeof window.securityView.createPanelsIfNeeded === 'function') {
          window.securityView.createPanelsIfNeeded();
        }
      }
    });
  });
}

// Initialize views
function initializeViews() {
  console.log('Initializing views...');
  
  // Set first tab as active if none are active
  const mainTabs = document.querySelectorAll('.main-tab');
  const activeTab = document.querySelector('.main-tab.active');
  
  if (!activeTab && mainTabs.length > 0) {
    mainTabs[0].classList.add('active');
    const view = mainTabs[0].getAttribute('data-view');
    const panel = document.querySelector(`.view-panel[data-view="${view}"]`);
    if (panel) {
      panel.classList.add('active');
    }
  }
  
  // Initialize security view if showing
  const activePanel = document.querySelector('.view-panel.active');
  if (activePanel && activePanel.getAttribute('data-view') === 'security') {
    if (window.securityView && typeof window.securityView.createPanelsIfNeeded === 'function') {
      window.securityView.createPanelsIfNeeded();
    }
  }
  
  console.log('Views initialized successfully');
}

// Attach to window to make accessible
window.organizeViews = organizeViews;
window.initializeViews = initializeViews;
EOF

  echo -e "${GREEN}Created fixed view organization script.${NC}"
}

# Function to enhance theme and layout
enhance_theme() {
  echo -e "${YELLOW}Enhancing theme and layout...${NC}"
  
  # Create enhanced theme CSS
  mkdir -p css/themes
  cat << 'EOF' > css/themes/enhanced-theme.css
/**
 * Enhanced Theme for Portnox Total Cost Analyzer
 * Modern, responsive design with better layout management
 */

:root {
  /* Primary color scheme */
  --primary-color: #0063B2;
  --primary-dark: #004D8C;
  --primary-light: #3E8DDD;
  --accent-color: #00BFA5;
  --accent-dark: #00A28C;
  
  /* Secondary colors */
  --secondary-color: #5039C6;
  --warning-color: #FF8F00;
  --error-color: #D50000;
  --success-color: #00C853;
  
  /* Neutral colors */
  --neutral-900: #102A43;
  --neutral-800: #243B53;
  --neutral-700: #334E68;
  --neutral-600: #486581;
  --neutral-500: #627D98;
  --neutral-400: #829AB1;
  --neutral-300: #9FB3C8;
  --neutral-200: #BCCCDC;
  --neutral-100: #D9E2EC;
  --neutral-50: #F0F4F8;
  
  /* UI colors */
  --background-color: var(--neutral-50);
  --card-background: #FFFFFF;
  --text-primary: var(--neutral-900);
  --text-secondary: var(--neutral-700);
  --text-tertiary: var(--neutral-500);
  --border-color: var(--neutral-200);
  
  /* Shadow effects */
  --shadow-sm: 0 1px 3px rgba(16, 42, 67, 0.1);
  --shadow-md: 0 4px 6px rgba(16, 42, 67, 0.1);
  --shadow-lg: 0 10px 15px rgba(16, 42, 67, 0.1);
  --shadow-xl: 0 20px 25px rgba(16, 42, 67, 0.1);
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px; 
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  
  /* Layout dimensions */
  --header-height: 72px;
  --sidebar-width: 280px;
  --content-max-width: 1400px;
}

/* Dark mode colors */
.dark-mode {
  --primary-color: #3E8DDD;
  --primary-dark: #0063B2;
  --primary-light: #64A7E6;
  --accent-color: #00E5CC;
  
  /* UI backgrounds */
  --background-color: #121212;
  --card-background: #1E1E1E;
  --text-primary: #F0F4F8;
  --text-secondary: #BCCCDC;
  --text-tertiary: #829AB1;
  --border-color: #334E68;
  
  /* Shadows in dark mode */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.35);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.35);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.35);
}

/* ====== Base styling ====== */
html, body {
  scroll-behavior: smooth;
}

body {
  background-color: var(--background-color);
  color: var(--text-primary);
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

*, *::before, *::after {
  box-sizing: border-box;
}

/* ====== Layout structure ====== */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
  position: relative;
}

.content-area {
  flex: 1;
  margin-left: var(--sidebar-width);
  padding: var(--spacing-xl);
  overflow-y: auto;
  max-width: calc(100vw - var(--sidebar-width));
  transition: margin-left 0.3s ease, max-width 0.3s ease;
}

.content-area.expanded {
  margin-left: 0;
  max-width: 100vw;
}

/* ====== Header styling ====== */
.app-header {
  height: var(--header-height);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background 0.3s ease;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

.logo-section {
  display: flex;
  align-items: center;
}

.company-logo {
  height: 36px;
  margin-right: var(--spacing-md);
}

.app-title h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: white;
}

.app-title .subtitle {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

/* ====== Sidebar styling ====== */
.sidebar {
  width: var(--sidebar-width);
  background-color: var(--card-background);
  border-right: 1px solid var(--border-color);
  position: fixed;
  top: var(--header-height);
  left: 0;
  bottom: 0;
  z-index: 90;
  overflow-y: auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.sidebar.collapsed {
  transform: translateX(-100%);
}

.sidebar-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(to right, var(--primary-color), var(--primary-dark));
  color: white;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.sidebar-content {
  padding: var(--spacing-lg);
}

.sidebar-toggle {
  position: fixed;
  top: 50%;
  left: var(--sidebar-width);
  transform: translateY(-50%);
  background-color: var(--primary-color);
  color: white;
  width: 24px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  cursor: pointer;
  z-index: 95;
  transition: left 0.3s ease, background-color 0.2s ease;
  box-shadow: var(--shadow-md);
}

.sidebar-toggle:hover {
  background-color: var(--primary-dark);
}

.sidebar-toggle.collapsed {
  left: 0;
}

/* ====== Config Card styling ====== */
.config-card {
  background-color: var(--card-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-lg);
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.config-card:hover {
  box-shadow: var(--shadow-lg);
}

.config-card-header {
  padding: var(--spacing-md) var(--spacing-lg);
  background: linear-gradient(to right, var(--primary-color), var(--primary-dark));
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.config-card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.config-card-header h3 i {
  margin-right: var(--spacing-sm);
}

.config-card-content {
  padding: var(--spacing-lg);
  transition: max-height 0.3s ease, padding 0.3s ease;
  max-height: 1000px;
  overflow: hidden;
}

.config-card-content.collapsed {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

/* ====== Main Tabs styling ====== */
.main-tabs {
  display: flex;
  background-color: var(--card-background);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: var(--header-height);
  z-index: 80;
  margin: 0 0 var(--spacing-lg) 0;
  padding: var(--spacing-sm);
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none; /* Firefox */
}

.main-tabs::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.main-tab {
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: transparent;
  color: var(--text-secondary);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: var(--spacing-sm);
  display: flex;
  align-items: center;
}

.main-tab i {
  margin-right: var(--spacing-sm);
}

.main-tab:hover {
  background-color: rgba(var(--primary-color-rgb), 0.1);
  color: var(--primary-color);
}

.main-tab.active {
  background-color: var(--primary-color);
  color: white;
}

/* ====== Results Tabs styling ====== */
.results-tabs {
  display: flex;
  background-color: var(--card-background);
  margin: 0 0 var(--spacing-lg) 0;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: calc(var(--header-height) + 56px); /* header + main tabs height */
  z-index: 75;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}

.results-tabs::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.results-tab {
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: transparent;
  color: var(--text-secondary);
  border: none;
  border-bottom: 3px solid transparent;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.results-tab i {
  margin-right: var(--spacing-sm);
}

.results-tab:hover {
  color: var(--primary-color);
}

.results-tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

/* ====== View Panels styling ====== */
.view-panel {
  display: none;
  animation: fadeIn 0.3s ease-in-out;
}

.view-panel.active {
  display: block;
}

.results-panel {
  display: none;
  animation: fadeIn 0.3s ease-in-out;
}

.results-panel.active {
  display: block;
}

.panel-header {
  margin-bottom: var(--spacing-xl);
  background: linear-gradient(to right, var(--primary-color), var(--primary-dark));
  color: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.panel-header h2 {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: 24px;
  font-weight: 700;
}

.panel-header .subtitle {
  margin: 0;
  font-size: 16px;
  opacity: 0.9;
}

/* ====== Dashboard Grid styling ====== */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

/* ====== Dashboard Card styling ====== */
.dashboard-card {
  background-color: var(--card-background);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.dashboard-card h3 {
  margin: 0 0 var(--spacing-md) 0;
  font-size: 16px;
  color: var(--text-secondary);
  font-weight: 600;
}

.metric-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  line-height: 1.2;
}

.highlight-value {
  color: var(--primary-color);
}

.metric-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
}

.metric-trend {
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
}

.metric-trend.up {
  color: var(--success-color);
}

.metric-trend.down {
  color: var(--error-color);
}

.metric-trend i {
  margin-right: var(--spacing-xs);
}

.highlight-card {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
}

.highlight-card h3,
.highlight-card .metric-label,
.highlight-card .metric-trend {
  color: rgba(255, 255, 255, 0.9);
}

.highlight-card .metric-value {
  color: white;
}

.highlight-card .metric-trend.up {
  color: rgba(255, 255, 255, 0.9);
}

.highlight-card .metric-trend.down {
  color: rgba(255, 255, 255, 0.9);
}

/* ====== Chart Container styling ====== */
.chart-container {
  background-color: var(--card-background);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chart-container:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.chart-container h3 {
  margin: 0 0 var(--spacing-lg) 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
}

.chart-container h3 i {
  margin-right: var(--spacing-sm);
  color: var(--primary-color);
}

.chart-wrapper {
  width: 100%;
  height: 400px;
  position: relative;
}

/* ====== Button styling ====== */
.btn {
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-outline:hover {
  background-color: rgba(var(--primary-color-rgb), 0.1);
}

.btn-calculate {
  background: linear-gradient(to right, var(--primary-color), var(--primary-dark));
  color: white;
  width: 100%;
  padding: var(--spacing-lg);
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.btn-calculate:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.btn i {
  margin-right: var(--spacing-sm);
}

/* ====== Animation keyframes ====== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ====== Override fixes for specific components ====== */
/* Fix for vendor cards in sidebar */
.vendor-select-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.vendor-select-card {
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.vendor-select-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.vendor-select-card.selected {
  border: 2px solid var(--primary-color);
  background-color: rgba(var(--primary-color-rgb), 0.05);
}

.vendor-select-card .vendor-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  margin-bottom: var(--spacing-xs);
}

.vendor-select-card .vendor-logo img {
  max-height: 28px;
  max-width: 80px;
  object-fit: contain;
}

.vendor-select-card .vendor-name {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 95%;
}

/* ====== Media Queries ====== */
@media (max-width: 1200px) {
  :root {
    --sidebar-width: 240px;
  }
  
  .content-area {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 992px) {
  .dashboard-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
  
  .app-title h1 {
    font-size: 18px;
  }
  
  .app-title .subtitle {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  :root {
    --sidebar-width: 280px;
  }
  
  .content-area {
    margin-left: 0;
    max-width: 100vw;
    padding: var(--spacing-md);
  }
  
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar.active {
    transform: translateX(0);
  }
  
  .sidebar-toggle {
    left: 0;
  }
  
  .sidebar-toggle.expanded {
    left: var(--sidebar-width);
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .panel-header {
    padding: var(--spacing-lg);
  }
  
  .panel-header h2 {
    font-size: 20px;
  }
  
  .panel-header .subtitle {
    font-size: 14px;
  }
  
  .app-header {
    height: auto;
    padding: var(--spacing-sm) 0;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .logo-section {
    margin-bottom: var(--spacing-sm);
  }
  
  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }
}

@media (max-width: 576px) {
  .main-tabs {
    gap: 0;
    padding: var(--spacing-xs);
  }
  
  .main-tab {
    padding: var(--spacing-md) var(--spacing-sm);
    font-size: 13px;
  }
  
  .main-tab i {
    margin-right: var(--spacing-xs);
  }
  
  .results-tab {
    padding: var(--spacing-md) var(--spacing-sm);
    font-size: 13px;
  }
  
  .chart-container, .dashboard-card {
    padding: var(--spacing-md);
  }
  
  .chart-wrapper {
    height: 300px;
  }
  
  .vendor-select-grid {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  }
}
EOF

  # Update HTML to include the new theme file
  cat << 'EOF' > js/theme-loader.js
/**
 * Theme Loader for Portnox Total Cost Analyzer
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add CSS custom properties (variables) for chart colors and use in JavaScript
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    :root {
      --primary-color-rgb: 0, 99, 178; /* Match the value in enhanced-theme.css */
      --text-primary-rgb: 16, 42, 67;
      --text-secondary-rgb: 36, 59, 83;
    }
    
    .dark-mode {
      --primary-color-rgb: 62, 141, 221;
      --text-primary-rgb: 240, 244, 248;
      --text-secondary-rgb: 188, 204, 220;
    }
  `;
  document.head.appendChild(styleElement);
  
  // Function to toggle between light and dark mode
  window.toggleDarkMode = function() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Update icon on toggle button
    const darkModeIcon = document.querySelector('#dark-mode-toggle i');
    if (darkModeIcon) {
      darkModeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
  };
  
  // Check user preference from localStorage
  const prefersDarkMode = localStorage.getItem('darkMode') === 'true';
  if (prefersDarkMode) {
    document.body.classList.add('dark-mode');
  }
  
  // Add dark mode toggle button to header if it doesn't exist
  const headerActions = document.querySelector('.header-actions');
  if (headerActions && !document.getElementById('dark-mode-toggle')) {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.className = 'btn btn-outline';
    darkModeToggle.innerHTML = `<i class="${prefersDarkMode ? 'fas fa-sun' : 'fas fa-moon'}"></i>`;
    darkModeToggle.addEventListener('click', window.toggleDarkMode);
    headerActions.appendChild(darkModeToggle);
  }
  
  // Fix sticky positioning for tabs
  const mainTabs = document.querySelector('.main-tabs');
  if (mainTabs) {
    // Observer to adjust sticky positioning based on header visibility
    const headerObserver = new IntersectionObserver((entries) => {
      const header = entries[0];
      if (header.isIntersecting) {
        mainTabs.style.top = '72px'; // Match header height
      } else {
        mainTabs.style.top = '0';
      }
    }, { threshold: 0 });
    
    const header = document.querySelector('.app-header');
    if (header) {
      headerObserver.observe(header);
    }
  }
});
EOF

  echo -e "${GREEN}Created enhanced theme and layout files.${NC}"
}

# Function to fix HTML
fix_html() {
  echo -e "${YELLOW}Creating updated HTML structure...${NC}"
  
  # Create HTML file to add all the fixes to the index
  cat << 'EOF' > js/fix-html.js
/**
 * HTML Structure Fixes for Portnox Total Cost Analyzer
 */
document.addEventListener('DOMContentLoaded', function() {
  // Fix script loading order
  const head = document.head;
  
  // Add theme CSS if not present
  if (!document.querySelector('link[href="css/themes/enhanced-theme.css"]')) {
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = 'css/themes/enhanced-theme.css';
    head.appendChild(themeLink);
  }
  
  // Add new scripts if not present
  const scriptsToAdd = [
    'js/theme-loader.js',
    'js/load-manager.js',
    'js/fix-images.js',
    'js/view-organization-fix.js'
  ];
  
  scriptsToAdd.forEach(scriptSrc => {
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      head.appendChild(script);
    }
  });
  
  // Check if body structure is correct
  const appContainer = document.querySelector('.app-container');
  if (!appContainer) {
    console.error('App container not found, cannot fix HTML structure');
    return;
  }
  
  // Fix header structure if needed
  let header = document.querySelector('.app-header');
  if (!header) {
    header = document.createElement('div');
    header.className = 'app-header';
    
    // Create header content
    const headerContent = document.createElement('div');
    headerContent.className = 'header-content';
    
    // Create logo section
    const logoSection = document.createElement('div');
    logoSection.className = 'logo-section';
    
    const logo = document.createElement('img');
    logo.className = 'company-logo';
    logo.src = 'img/portnox-logo.svg';
    logo.alt = 'Portnox';
    logo.onerror = function() {
      // Fallback if logo is missing
      this.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iNTAiPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iNTAiIGZpbGw9IiMwMDYzQjIiLz48dGV4dCB4PSIxMCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiPlBPUlROT1g8L3RleHQ+PC9zdmc+';
    };
    logoSection.appendChild(logo);
    
    const appTitle = document.createElement('div');
    appTitle.className = 'app-title';
    
    const title = document.createElement('h1');
    title.textContent = 'Total Cost Analyzer';
    appTitle.appendChild(title);
    
    const subtitle = document.createElement('div');
    subtitle.className = 'subtitle';
    subtitle.textContent = 'Compare TCO across NAC vendors';
    appTitle.appendChild(subtitle);
    
    logoSection.appendChild(appTitle);
    headerContent.appendChild(logoSection);
    
    // Create header actions
    const headerActions = document.createElement('div');
    headerActions.className = 'header-actions';
    
    const exportBtn = document.createElement('button');
    exportBtn.className = 'btn btn-outline';
    exportBtn.innerHTML = '<i class="fas fa-file-export"></i> Export';
    headerActions.appendChild(exportBtn);
    
    headerContent.appendChild(headerActions);
    header.appendChild(headerContent);
    
    // Add header to the beginning of app container
    appContainer.insertBefore(header, appContainer.firstChild);
  }
  
  // Fix main content structure if needed
  let mainContent = document.querySelector('.main-content');
  if (!mainContent) {
    mainContent = document.createElement('div');
    mainContent.className = 'main-content';
    
    // Move existing content into main-content
    const existingChildren = Array.from(appContainer.children);
    existingChildren.forEach(child => {
      if (child !== header && !child.classList.contains('app-footer')) {
        mainContent.appendChild(child);
      }
    });
    
    // Add main content after header
    if (header.nextSibling) {
      appContainer.insertBefore(mainContent, header.nextSibling);
    } else {
      appContainer.appendChild(mainContent);
    }
  }
  
  // Fix sidebar structure if needed
  let sidebar = document.querySelector('.sidebar');
  if (!sidebar) {
    sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    
    // Create sidebar header
    const sidebarHeader = document.createElement('div');
    sidebarHeader.className = 'sidebar-header';
    
    const sidebarTitle = document.createElement('h2');
    sidebarTitle.innerHTML = '<i class="fas fa-cogs"></i> Configuration';
    sidebarHeader.appendChild(sidebarTitle);
    sidebar.appendChild(sidebarHeader);
    
    // Create sidebar content
    const sidebarContent = document.createElement('div');
    sidebarContent.className = 'sidebar-content';
    sidebar.appendChild(sidebarContent);
    
    // Add sidebar to main content
    mainContent.insertBefore(sidebar, mainContent.firstChild);
  }
  
  // Fix sidebar toggle if needed
  let sidebarToggle = document.querySelector('.sidebar-toggle');
  if (!sidebarToggle) {
    sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      this.classList.toggle('collapsed');
      
      const contentArea = document.querySelector('.content-area');
      if (contentArea) {
        contentArea.classList.toggle('expanded');
      }
    });
    
    mainContent.appendChild(sidebarToggle);
  }
  
  // Fix content area if needed
  let contentArea = document.querySelector('.content-area');
  if (!contentArea) {
    contentArea = document.createElement('div');
    contentArea.className = 'content-area';
    
    // Move existing view content into content area
    const viewPanels = Array.from(mainContent.querySelectorAll('.view-panel'));
    if (viewPanels.length > 0) {
      viewPanels.forEach(panel => {
        contentArea.appendChild(panel);
      });
    } else {
      // Create default view structure if no views exist
      const executiveView = document.createElement('div');
      executiveView.className = 'view-panel active';
      executiveView.setAttribute('data-view', 'executive');
      
      const viewHeader = document.createElement('div');
      viewHeader.className = 'panel-header';
      
      const viewTitle = document.createElement('h2');
      viewTitle.textContent = 'Executive Summary';
      viewHeader.appendChild(viewTitle);
      
      const viewSubtitle = document.createElement('p');
      viewSubtitle.className = 'subtitle';
      viewSubtitle.textContent = 'Overview of NAC solution comparisons';
      viewHeader.appendChild(viewSubtitle);
      
      executiveView.appendChild(viewHeader);
      contentArea.appendChild(executiveView);
    }
    
    mainContent.appendChild(contentArea);
  }
  
  // Fix main tabs if needed
  let mainTabs = document.querySelector('.main-tabs');
  if (!mainTabs) {
    mainTabs = document.createElement('div');
    mainTabs.className = 'main-tabs';
    
    // Create default tabs
    const tabs = [
      { view: 'executive', icon: 'chart-pie', label: 'Executive Summary' },
      { view: 'financial', icon: 'money-bill-wave', label: 'Financial Analysis' },
      { view: 'security', icon: 'shield-alt', label: 'Security & Compliance' },
      { view: 'technical', icon: 'code', label: 'Technical Comparison' }
    ];
    
    tabs.forEach((tab, index) => {
      const tabElement = document.createElement('button');
      tabElement.className = 'main-tab' + (index === 0 ? ' active' : '');
      tabElement.setAttribute('data-view', tab.view);
      tabElement.innerHTML = `<i class="fas fa-${tab.icon}"></i> ${tab.label}`;
      mainTabs.appendChild(tabElement);
    });
    
    contentArea.insertBefore(mainTabs, contentArea.firstChild);
    
    // Add click event to tabs
    mainTabs.querySelectorAll('.main-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        mainTabs.querySelectorAll('.main-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const viewId = this.getAttribute('data-view');
        contentArea.querySelectorAll('.view-panel').forEach(panel => {
          panel.classList.remove('active');
        });
        
        const targetPanel = contentArea.querySelector(`.view-panel[data-view="${viewId}"]`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        } else {
          console.error(`View panel for ${viewId} not found`);
        }
      });
    });
  }
  
  // Fix footer if needed
  let footer = document.querySelector('.app-footer');
  if (!footer) {
    footer = document.createElement('div');
    footer.className = 'app-footer';
    
    const footerContent = document.createElement('div');
    footerContent.className = 'footer-content';
    
    const copyright = document.createElement('div');
    copyright.className = 'footer-copyright';
    copyright.textContent = '© ' + new Date().getFullYear() + ' Portnox. All rights reserved.';
    footerContent.appendChild(copyright);
    
    const footerLinks = document.createElement('div');
    footerLinks.className = 'footer-links';
    
    const links = [
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Terms of Service' },
      { href: '#', label: 'Contact Us' }
    ];
    
    links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      footerLinks.appendChild(a);
    });
    
    footerContent.appendChild(footerLinks);
    footer.appendChild(footerContent);
    
    appContainer.appendChild(footer);
  }
});
EOF

  echo -e "${GREEN}Created HTML structure fixes.${NC}"
}

# Create a consolidated fix script
create_fix_script() {
  echo -e "${YELLOW}Creating consolidated fix script...${NC}"
  
  cat << 'EOF' > fix-all.js
/**
 * Consolidated fixes for Portnox Total Cost Analyzer
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying fixes for Portnox Total Cost Analyzer...');
  
  // Fix duplicate declarations
  if (typeof window.Portnox === 'undefined') {
    window.Portnox = {};
    window.Portnox.loadedScripts = {};
  }
  
  // Fix missing images
  const imageReplacements = {
    'gartner.png': 'img/analysts/gartner.svg',
    'forrester.png': 'img/analysts/forrester.svg',
    'idc.png': 'img/analysts/idc.svg',
    'ema.png': 'img/analysts/ema.svg'
  };
  
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const filename = src.split('/').pop();
      if (imageReplacements[filename]) {
        img.setAttribute('src', imageReplacements[filename]);
      }
    }
  });
  
  // Initialize security view if not already
  if (typeof window.securityView === 'undefined') {
    window.securityView = {
      createPanelsIfNeeded: function() {
        console.log('Creating security view panels');
        
        const securityPanel = document.querySelector('.view-panel[data-view="security"]');
        if (!securityPanel) return;
        
        // Check if panels already exist
        if (securityPanel.querySelector('.results-tabs')) return;
        
        // Create tabs container
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'results-tabs';
        
        // Create risk tab
        const riskTab = document.createElement('button');
        riskTab.className = 'results-tab active';
        riskTab.setAttribute('data-tab', 'risk');
        riskTab.innerHTML = '<i class="fas fa-shield-alt"></i> Risk Assessment';
        tabsContainer.appendChild(riskTab);
        
        // Create compliance tab
        const complianceTab = document.createElement('button');
        complianceTab.className = 'results-tab';
        complianceTab.setAttribute('data-tab', 'compliance');
        complianceTab.innerHTML = '<i class="fas fa-check-circle"></i> Compliance';
        tabsContainer.appendChild(complianceTab);
        
        // Create breach tab
        const breachTab = document.createElement('button');
        breachTab.className = 'results-tab';
        breachTab.setAttribute('data-tab', 'breach');
        breachTab.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Breach Impact';
        tabsContainer.appendChild(breachTab);
        
        // Add tabs to panel
        securityPanel.appendChild(tabsContainer);
        
        // Create panel containers
        const panels = ['risk', 'compliance', 'breach'];
        panels.forEach(panelId => {
          const panelElement = document.createElement('div');
          panelElement.className = 'results-panel';
          panelElement.setAttribute('data-panel', panelId);
          
          if (panelId === 'risk') {
            panelElement.classList.add('active');
            
            // Add risk assessment content
            panelElement.innerHTML = `
              <div class="panel-header">
                <h2>Security Risk Assessment</h2>
                <p class="subtitle">Analysis of security posture and risk mitigation with Portnox Cloud</p>
              </div>
              
              <div class="dashboard-grid">
                <div class="dashboard-card highlight-card">
                  <h3>Risk Reduction</h3>
                  <div class="metric-value highlight-value">85%</div>
                  <div class="metric-label">Overall risk reduction with Portnox Cloud</div>
                  <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 15% better than industry average</div>
                </div>
                
                <div class="dashboard-card">
                  <h3>Threat Detection</h3>
                  <div class="metric-value">97%</div>
                  <div class="metric-label">Accuracy in identifying threats</div>
                  <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 12% improvement</div>
                </div>
                
                <div class="dashboard-card">
                  <h3>Response Time</h3>
                  <div class="metric-value">4.5 min</div>
                  <div class="metric-label">Average time to respond to incidents</div>
                  <div class="metric-trend down"><i class="fas fa-arrow-down"></i> 68% faster</div>
                </div>
                
                <div class="dashboard-card">
                  <h3>Compliance Score</h3>
                  <div class="metric-value">94%</div>
                  <div class="metric-label">Overall compliance status</div>
                  <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 23% increase</div>
                </div>
              </div>
              
              <div class="chart-container">
                <h3><i class="fas fa-shield-alt"></i> NIST Cybersecurity Framework</h3>
                <div class="chart-wrapper" id="nist-framework-chart"></div>
              </div>
            `;
          } else if (panelId === 'compliance') {
            // Add compliance content
            panelElement.innerHTML = `
              <div class="panel-header">
                <h2>Compliance Coverage</h2>
                <p class="subtitle">Regulatory compliance capabilities across industry standards</p>
              </div>
              
              <div class="chart-container">
                <h3><i class="fas fa-check-circle"></i> Compliance Framework Coverage</h3>
                <div class="chart-wrapper" id="security-frameworks-chart"></div>
              </div>
            `;
          } else if (panelId === 'breach') {
            // Add breach impact content
            panelElement.innerHTML = `
              <div class="panel-header">
                <h2>Breach Impact Analysis</h2>
                <p class="subtitle">Financial impact of security breaches and mitigation</p>
              </div>
              
              <div class="chart-container">
                <h3><i class="fas fa-exclamation-triangle"></i> Breach Cost & Response Time</h3>
                <div class="chart-wrapper" id="breach-impact-chart"></div>
              </div>
            `;
          }
          
          securityPanel.appendChild(panelElement);
        });
        
        // Add event listeners to tabs
        tabsContainer.querySelectorAll('.results-tab').forEach(tab => {
          tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabsContainer.querySelectorAll('.results-tab').forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all panels
            const panels = securityPanel.querySelectorAll('.results-panel');
            panels.forEach(p => p.classList.remove('active'));
            
            // Show selected panel
            const tabId = this.getAttribute('data-tab');
            securityPanel.querySelector(`.results-panel[data-panel="${tabId}"]`).classList.add('active');
          });
        });
      }
    };
  }
  
  // Fix view organization
  window.viewReferences = {
    executive: null,
    financial: null,
    security: null,
    technical: null
  };
  
  // Safer version of organizeViews function
  window.organizeViews = function() {
    console.log('Organizing views safely...');
    
    // Get all view panels
    const viewPanels = document.querySelectorAll('.view-panel');
    
    // First, detach all panels from their parents to avoid hierarchy issues
    viewPanels.forEach(panel => {
      if (panel.parentNode) {
        window.viewReferences[panel.getAttribute('data-view')] = panel.cloneNode(true);
        panel.parentNode.removeChild(panel);
      }
    });
    
    // Get the main container
    const contentArea = document.querySelector('.content-area');
    if (!contentArea) {
      console.error('Content area not found');
      return;
    }
    
    // Reattach all panels to the content area
    Object.values(window.viewReferences).forEach(panel => {
      if (panel) {
        contentArea.appendChild(panel);
      }
    });
    
    // Set up tab navigation
    setupTabNavigation();
    
    console.log('Views organized successfully');
  };
  
  // Helper for tab navigation
  window.setupTabNavigation = function() {
    const mainTabs = document.querySelectorAll('.main-tab');
    const viewPanels = document.querySelectorAll('.view-panel');
    
    mainTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        mainTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Hide all panels
        viewPanels.forEach(p => p.classList.remove('active'));
        
        // Show selected panel
        const view = this.getAttribute('data-view');
        const panel = document.querySelector(`.view-panel[data-view="${view}"]`);
        if (panel) {
          panel.classList.add('active');
          
          // If security view, create panels if needed
          if (view === 'security' && window.securityView && typeof window.securityView.createPanelsIfNeeded === 'function') {
            window.securityView.createPanelsIfNeeded();
          }
        }
      });
    });
  };
  
  // Initialize views function
  window.initializeViews = function() {
    console.log('Initializing views...');
    
    // Set first tab as active if none are active
    const mainTabs = document.querySelectorAll('.main-tab');
    const activeTab = document.querySelector('.main-tab.active');
    
    if (!activeTab && mainTabs.length > 0) {
      mainTabs[0].classList.add('active');
      const view = mainTabs[0].getAttribute('data-view');
      const panel = document.querySelector(`.view-panel[data-view="${view}"]`);
      if (panel) {
        panel.classList.add('active');
      }
    }
    
    // Initialize security view if showing
    const activePanel = document.querySelector('.view-panel.active');
    if (activePanel && activePanel.getAttribute('data-view') === 'security') {
      if (window.securityView && typeof window.securityView.createPanelsIfNeeded === 'function') {
        window.securityView.createPanelsIfNeeded();
      }
    }
    
    console.log('Views initialized successfully');
  };
  
  // Call initialization functions
  setTimeout(function() {
    if (typeof window.organizeViews === 'function') {
      window.organizeViews();
    }
    
    setTimeout(function() {
      if (typeof window.initializeViews === 'function') {
        window.initializeViews();
      }
    }, 300);
  }, 300);
  
  console.log('All fixes applied successfully.');
});
EOF

  echo -e "${GREEN}Created consolidated fix script.${NC}"
}

# Main function to run all fixes
run_all_fixes() {
  echo -e "${YELLOW}Running all fixes...${NC}"
  
  # Create directories if they don't exist
  mkdir -p js/charts/apex
  mkdir -p js/charts/highcharts
  mkdir -p js/charts/d3
  mkdir -p css/themes
  mkdir -p css/components
  mkdir -p css/fixes
  mkdir -p img/analysts
  
  # Run all fix functions
  backup_files
  fix_js_duplicates
  fix_missing_images
  fix_view_organization
  enhance_theme
  fix_html
  create_fix_script
  
  echo -e "${GREEN}All fixes completed successfully.${NC}"
  echo -e "${BLUE}=========================================================${NC}"
  echo -e "${BLUE}                Fix Script Complete                       ${NC}"
  echo -e "${BLUE}=========================================================${NC}"
  echo -e "${YELLOW}To implement these changes:${NC}"
  echo -e "1. Add the following script tag to your HTML file:"
  echo -e "${GREEN}   <script src=\"fix-all.js\"></script>${NC}"
  echo -e "2. Make sure you load the enhanced theme:"
  echo -e "${GREEN}   <link rel=\"stylesheet\" href=\"css/themes/enhanced-theme.css\">${NC}"
  echo -e "3. Add Font Awesome if not already added:"
  echo -e "${GREEN}   <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css\">${NC}"
  echo -e "${BLUE}=========================================================${NC}"
  echo -e "${YELLOW}Your backup files are in: ${BACKUP_DIR}${NC}"
}

# Run the script
run_all_fixes
