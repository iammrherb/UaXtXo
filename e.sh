#!/bin/bash

# Portnox Total Cost Analyzer - Targeted Fix Script
# This script addresses specific issues with view organization and UI

# Set color variables for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Portnox Total Cost Analyzer - Targeted Fix Script ===${NC}"
echo "Fixing specific issues with JavaScript errors, view organization, and UI..."

# Create a backup directory
BACKUP_DIR="./portnox-fix-backup-$(date +%Y%m%d%H%M%S)"
mkdir -p $BACKUP_DIR

# Function to backup a file before modifying it
backup_file() {
  local file=$1
  if [ -f "$file" ]; then
    cp "$file" "$BACKUP_DIR/$(basename $file)"
    echo -e "${GREEN}✓${NC} Backed up $file"
  else
    echo -e "${RED}✗${NC} File not found: $file"
    return 1
  fi
}

# ============================================================
# 1. Fix JavaScript syntax errors
# ============================================================
echo -e "\n${BLUE}Fixing JavaScript syntax errors...${NC}"

# Fix chart-config.js
if [ -f "js/charts/chart-config.js" ]; then
  backup_file "js/charts/chart-config.js"
  
  # Rename global variables to avoid conflicts
  sed -i 's/const CHART_COLORS/const PORTNOX_CHART_COLORS/g' js/charts/chart-config.js
  sed -i 's/const CHART_FONT_FAMILY/const PORTNOX_CHART_FONT_FAMILY/g' js/charts/chart-config.js
  sed -i 's/const CHART_ANIMATIONS/const PORTNOX_CHART_ANIMATIONS/g' js/charts/chart-config.js
  sed -i 's/const APEX_COMMON_OPTIONS/const PORTNOX_APEX_COMMON_OPTIONS/g' js/charts/chart-config.js
  sed -i 's/const APEX_DARK_MODE_OVERRIDES/const PORTNOX_APEX_DARK_MODE_OVERRIDES/g' js/charts/chart-config.js
  
  echo -e "${GREEN}✓${NC} Fixed chart-config.js variable conflicts"
fi

# Fix security-charts.js
if [ -f "js/charts/security-charts.js" ]; then
  backup_file "js/charts/security-charts.js"
  
  # Check for syntax errors at line 1
  head -n 5 js/charts/security-charts.js > /tmp/security-charts-head.txt
  if grep -q ":" /tmp/security-charts-head.txt; then
    # Fix unexpected token by ensuring the file starts with a proper JS statement
    cat > js/charts/security-charts.js << 'EOF'
/**
 * Security Charts for Portnox Total Cost Analyzer
 * Provides security-specific chart configurations
 */

class SecurityCharts {
  constructor() {
    this.charts = {};
    this.colors = {
      primary: '#1a5a96',
      secondary: '#2ecc71',
      warning: '#f39c12',
      danger: '#e74c3c',
      info: '#3498db'
    };
  }
  
  // The rest of the file remains the same
EOF
    
    # Append the original file content starting from line 6
    tail -n +6 "$BACKUP_DIR/security-charts.js" >> js/charts/security-charts.js
    
    echo -e "${GREEN}✓${NC} Fixed security-charts.js syntax error"
  else
    echo -e "${BLUE}✓${NC} security-charts.js appears to have no syntax error at beginning"
  fi
fi

# Fix apex-charts.js
if [ -f "js/charts/apex/apex-charts.js" ]; then
  backup_file "js/charts/apex/apex-charts.js"
  
  # Change class name to avoid conflicts
  sed -i 's/class ApexChartManager/class PortnoxApexChartManager/g' js/charts/apex/apex-charts.js
  # Update instance creation
  sed -i 's/window.apexChartManager = new ApexChartManager/window.apexChartManager = new PortnoxApexChartManager/g' js/charts/apex/apex-charts.js
  
  echo -e "${GREEN}✓${NC} Fixed apex-charts.js class conflicts"
fi

# Fix d3-manager.js
if [ -f "js/charts/d3/d3-manager.js" ]; then
  backup_file "js/charts/d3/d3-manager.js"
  
  # Change class name to avoid conflicts
  sed -i 's/class D3Manager/class PortnoxD3Manager/g' js/charts/d3/d3-manager.js
  # Update instance creation
  sed -i 's/window.d3Manager = new D3Manager/window.d3Manager = new PortnoxD3Manager/g' js/charts/d3/d3-manager.js
  
  echo -e "${GREEN}✓${NC} Fixed d3-manager.js class conflicts"
fi

# ============================================================
# 2. Create View Organization Fix
# ============================================================
echo -e "\n${BLUE}Creating view organization fix...${NC}"

mkdir -p js/fixes
cat > js/fixes/view-organization-fix.js << 'EOF'
/**
 * View Organization Fix for Portnox Total Cost Analyzer
 * Ensures each view is properly placed under its correct tab
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying view organization fix...');
  
  // Wait for the DOM to be fully ready
  setTimeout(organizeViews, 500);
  
  function organizeViews() {
    // Get main content container
    const contentArea = document.querySelector('.content-area');
    if (!contentArea) {
      console.error('Content area not found, cannot organize views');
      return;
    }
    
    // Get all view panels
    const viewPanels = contentArea.querySelectorAll('.view-panel');
    if (!viewPanels || viewPanels.length === 0) {
      console.error('No view panels found, cannot organize views');
      return;
    }
    
    // Ensure each main tab exists
    const mainTabs = ['executive', 'financial', 'security', 'technical'];
    const mainTabsContainer = document.querySelector('.main-tabs');
    
    // Create main tabs if they don't exist
    if (!mainTabsContainer) {
      console.log('Creating main tabs container...');
      const newMainTabsContainer = document.createElement('div');
      newMainTabsContainer.className = 'main-tabs';
      
      mainTabs.forEach((tabId, index) => {
        const tabButton = document.createElement('button');
        tabButton.className = 'main-tab' + (index === 0 ? ' active' : '');
        tabButton.setAttribute('data-view', tabId);
        
        let icon, text;
        switch(tabId) {
          case 'executive':
            icon = 'chart-pie';
            text = 'Executive';
            break;
          case 'financial':
            icon = 'coins';
            text = 'Financial';
            break;
          case 'security':
            icon = 'shield-alt';
            text = 'Security';
            break;
          case 'technical':
            icon = 'cogs';
            text = 'Technical';
            break;
        }
        
        tabButton.innerHTML = `<i class="fas fa-${icon}"></i> ${text}`;
        newMainTabsContainer.appendChild(tabButton);
      });
      
      // Add to content area
      const contentWrapper = contentArea.querySelector('.content-wrapper');
      if (contentWrapper) {
        contentWrapper.prepend(newMainTabsContainer);
      } else {
        // Create content wrapper if it doesn't exist
        const newContentWrapper = document.createElement('div');
        newContentWrapper.className = 'content-wrapper';
        newContentWrapper.appendChild(newMainTabsContainer);
        contentArea.appendChild(newContentWrapper);
      }
      
      // Store for further use
      mainTabsContainer = newMainTabsContainer;
    }
    
    // Ensure each view panel exists
    mainTabs.forEach((viewId) => {
      let viewPanel = contentArea.querySelector(`.view-panel[data-view="${viewId}"]`);
      
      // Create the view panel if it doesn't exist
      if (!viewPanel) {
        console.log(`Creating view panel for ${viewId}...`);
        viewPanel = document.createElement('div');
        viewPanel.className = 'view-panel';
        viewPanel.setAttribute('data-view', viewId);
        
        // Add to content wrapper
        const contentWrapper = contentArea.querySelector('.content-wrapper');
        if (contentWrapper) {
          contentWrapper.appendChild(viewPanel);
        }
      }
      
      // Ensure only the first view panel is active
      if (viewId === 'executive') {
        viewPanel.classList.add('active');
      } else {
        viewPanel.classList.remove('active');
      }
    });
    
    // Move any misplaced panels to their correct locations
    viewPanels.forEach((panel) => {
      const panelId = panel.id || '';
      let targetViewId = '';
      
      // Determine which main view this panel belongs to
      if (panelId.startsWith('executive-') || panelId === 'executive-summary') {
        targetViewId = 'executive';
      } else if (panelId.startsWith('financial-') || panelId === 'financial-summary') {
        targetViewId = 'financial';
      } else if (panelId.startsWith('security-') || panelId === 'security-overview') {
        targetViewId = 'security';
      } else if (panelId.startsWith('technical-') || panelId === 'technical-overview') {
        targetViewId = 'technical';
      } else {
        // If no match, check the data-panel attribute instead
        const dataPanelAttr = panel.getAttribute('data-panel');
        if (dataPanelAttr) {
          if (dataPanelAttr.startsWith('executive-')) targetViewId = 'executive';
          else if (dataPanelAttr.startsWith('financial-')) targetViewId = 'financial';
          else if (dataPanelAttr.startsWith('security-')) targetViewId = 'security';
          else if (dataPanelAttr.startsWith('technical-')) targetViewId = 'technical';
        }
      }
      
      // Skip if we couldn't determine the target view
      if (!targetViewId) return;
      
      // Get the target view panel
      const targetPanel = contentArea.querySelector(`.view-panel[data-view="${targetViewId}"]`);
      if (!targetPanel) return;
      
      // Move the panel to the target view if it's not already there
      const currentParent = panel.parentElement;
      if (currentParent && !currentParent.classList.contains('view-panel')) {
        console.log(`Moving ${panelId} to ${targetViewId} view...`);
        targetPanel.appendChild(panel);
      }
    });
    
    // Set up tab navigation
    setupTabNavigation();
    console.log('Views organized successfully');
  }
  
  function setupTabNavigation() {
    // Add click event to main tabs
    const mainTabs = document.querySelectorAll('.main-tab');
    const viewPanels = document.querySelectorAll('.view-panel');
    
    mainTabs.forEach(tab => {
      // Remove existing event listeners by cloning
      const newTab = tab.cloneNode(true);
      tab.parentNode.replaceChild(newTab, tab);
      
      // Add new event listener
      newTab.addEventListener('click', function() {
        const view = this.getAttribute('data-view');
        
        // Remove active class from all tabs and panels
        mainTabs.forEach(t => t.classList.remove('active'));
        viewPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        this.classList.add('active');
        const viewPanel = document.querySelector(`.view-panel[data-view="${view}"]`);
        if (viewPanel) {
          viewPanel.classList.add('active');
          
          // Refresh charts in the active view
          if (view === 'executive' && window.executiveView) {
            window.executiveView.refreshChartsInPanel(window.executiveView.currentTab);
          } else if (view === 'security' && window.securityView) {
            window.securityView.refreshChartsInPanel(window.securityView.currentTab);
          }
        }
      });
    });
  }
});
EOF

echo -e "${GREEN}✓${NC} Created view organization fix"

# ============================================================
# 3. Create modern Portnox theme
# ============================================================
echo -e "\n${BLUE}Creating modern Portnox theme...${NC}"

mkdir -p css/fixes
cat > css/fixes/portnox-modern-theme.css << 'EOF'
/**
 * Modern Portnox Theme for Total Cost Analyzer
 * Creates a sleek, modern UI with Portnox branding
 */

:root {
  /* Portnox Brand Colors */
  --portnox-primary: #1a5a96;  /* Portnox Blue */
  --portnox-primary-dark: #0d4275;
  --portnox-primary-light: #4c90d2;
  --portnox-secondary: #2ecc71;  /* Accent Green */
  --portnox-secondary-dark: #27ae60;
  --portnox-accent: #f65c20;  /* Portnox Orange */
  --portnox-accent-dark: #d14210;
  
  /* UI Colors */
  --portnox-bg-light: #f8f9fc;
  --portnox-bg-dark: #1a2130;
  --portnox-card-light: #ffffff;
  --portnox-card-dark: #2d3748;
  --portnox-text-light: #333333;
  --portnox-text-dark: #f0f2f5;
  
  /* Update global variables */
  --primary-color: var(--portnox-primary);
  --primary-dark-color: var(--portnox-primary-dark);
  --highlight-background: rgba(26, 90, 150, 0.05);
  --bg-color: var(--portnox-bg-light);
  --card-bg: var(--portnox-card-light);
  --text-primary: var(--portnox-text-light);
}

/* Dark mode variables */
.dark-mode {
  --primary-color: var(--portnox-primary-light);
  --primary-dark-color: var(--portnox-primary);
  --bg-color: var(--portnox-bg-dark);
  --card-bg: var(--portnox-card-dark);
  --text-primary: var(--portnox-text-dark);
}

/* Enhanced Modern Header */
.app-header, .enhanced-header {
  background: linear-gradient(135deg, var(--portnox-primary), var(--portnox-primary-dark));
  border-bottom: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  height: auto;
  padding: 0;
}

.header-content {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 5;
}

.logo-section {
  display: flex;
  align-items: center;
}

.company-logo {
  height: 45px;
  margin-right: 1.5rem;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2));
}

.app-title h1 {
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.app-title .subtitle {
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}

.header-actions {
  display: flex;
  gap: 0.8rem;
}

.header-actions .btn {
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-actions .btn i {
  font-size: 1rem;
}

.header-actions .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.header-actions .btn-primary {
  background: var(--portnox-accent);
  border: 1px solid var(--portnox-accent);
  color: white;
}

.header-actions .btn-primary:hover {
  background: var(--portnox-accent-dark);
}

.header-actions .btn-outline {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.header-actions .btn-outline:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Particles Header Enhancement */
.particles-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Animated Entry Effects */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.app-title h1 {
  animation: fade-in-up 0.6s ease forwards;
}

.app-title .subtitle {
  animation: fade-in-up 0.6s ease 0.2s forwards;
  opacity: 0;
}

.header-actions {
  animation: fade-in-up 0.6s ease 0.4s forwards;
  opacity: 0;
}

/* Enhanced Main Tabs */
.main-tabs {
  background: linear-gradient(to right, rgba(26, 90, 150, 0.05), rgba(26, 90, 150, 0.1));
  border-radius: 10px;
  padding: 8px;
  margin-bottom: 25px;
  display: flex;
  gap: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.main-tab {
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 8px;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.main-tab i {
  font-size: 16px;
  color: var(--primary-color);
}

.main-tab:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.main-tab.active {
  background: var(--primary-color);
  color: white;
  box-shadow: 0 4px 10px rgba(26, 90, 150, 0.3);
}

.main-tab.active i {
  color: white;
}

/* Enhanced Results Tabs */
.results-tabs {
  display: flex;
  border-bottom: 2px solid rgba(26, 90, 150, 0.1);
  margin-bottom: 25px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 2px;
}

.results-tabs::-webkit-scrollbar {
  display: none;
}

.results-tab {
  padding: 12px 22px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  outline: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: -2px;
}

.results-tab i {
  font-size: 14px;
}

.results-tab:hover {
  color: var(--primary-color);
  border-bottom-color: rgba(26, 90, 150, 0.5);
}

.results-tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  font-weight: 600;
}

/* Enhanced Metric Cards */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.metric-card, .dashboard-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.metric-card:hover, .dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.metric-card.primary, .dashboard-card.highlight-card {
  background: linear-gradient(135deg, var(--portnox-primary), var(--portnox-primary-dark));
  color: white;
  border: none;
}

.metric-card.secondary, .dashboard-card.secondary-card {
  background: linear-gradient(135deg, var(--portnox-secondary), var(--portnox-secondary-dark));
  color: white;
  border: none;
}

.metric-card.accent, .dashboard-card.accent-card {
  background: linear-gradient(135deg, var(--portnox-accent), var(--portnox-accent-dark));
  color: white;
  border: none;
}

.metric-card .card-icon, .dashboard-card .card-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  opacity: 0.8;
}

.metric-card h3, .dashboard-card h3 {
  font-size: 16px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 12px;
}

.metric-card .metric-value, .dashboard-card .metric-value {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}

.metric-card .metric-description, .dashboard-card .metric-label {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 12px;
}

.metric-card .metric-trend, .dashboard-card .metric-trend {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  margin-top: auto;
}

.metric-card .metric-trend i, .dashboard-card .metric-trend i {
  margin-right: 5px;
}

.metric-card .metric-trend.up, .dashboard-card .metric-trend.up {
  color: var(--portnox-secondary);
}

.metric-card .metric-trend.down, .dashboard-card .metric-trend.down {
  color: var(--portnox-accent);
}

.metric-card.primary .metric-trend.up,
.metric-card.secondary .metric-trend.up,
.metric-card.accent .metric-trend.up,
.dashboard-card.highlight-card .metric-trend.up,
.dashboard-card.secondary-card .metric-trend.up,
.dashboard-card.accent-card .metric-trend.up {
  color: rgba(255, 255, 255, 0.9);
}

.metric-card.primary .metric-trend.down,
.metric-card.secondary .metric-trend.down,
.metric-card.accent .metric-trend.down,
.dashboard-card.highlight-card .metric-trend.down,
.dashboard-card.secondary-card .metric-trend.down,
.dashboard-card.accent-card .metric-trend.down {
  color: rgba(255, 255, 255, 0.9);
}

/* Enhanced Chart Containers */
.chart-container, .executive-chart-container {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.chart-container .chart-title, .executive-chart-container .chart-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.chart-container .chart-title i, .executive-chart-container .chart-title i {
  margin-right: 10px;
  color: var(--primary-color);
}

.chart-container .chart-subtitle, .executive-chart-container .chart-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: -15px;
  margin-bottom: 20px;
}

.chart-container .chart-wrapper, .executive-chart-container .chart-wrapper {
  height: 400px;
  position: relative;
}

/* Dark Mode Adjustments */
.dark-mode .main-tab {
  background: rgba(45, 55, 72, 0.8);
  color: var(--text-primary);
}

.dark-mode .main-tab:hover {
  background: rgba(45, 55, 72, 0.95);
}

.dark-mode .main-tab.active {
  background: var(--primary-color);
  color: white;
}

.dark-mode .metric-card,
.dark-mode .dashboard-card,
.dark-mode .chart-container,
.dark-mode .executive-chart-container {
  border-color: rgba(255, 255, 255, 0.05);
}

/* Modern Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(26, 90, 150, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(26, 90, 150, 0.7);
}

.dark-mode ::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.dark-mode ::-webkit-scrollbar-thumb {
  background: rgba(26, 90, 150, 0.6);
}

.dark-mode ::-webkit-scrollbar-thumb:hover {
  background: rgba(26, 90, 150, 0.8);
}

/* Sidebar Enhancements */
.sidebar {
  background-color: var(--card-bg);
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.05);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.sidebar-header h2 {
  font-size: 18px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--primary-color);
}

.sidebar-header h2 i {
  font-size: 20px;
}

.config-card {
  border-radius: 10px;
  margin-bottom: 15px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.config-card-header {
  padding: 15px 20px;
  background-color: rgba(26, 90, 150, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.config-card-header h3 {
  font-size: 16px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.config-card-header h3 i {
  color: var(--primary-color);
}

.config-card-content {
  padding: 15px 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
}

.form-control, .form-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-control:focus, .form-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(26, 90, 150, 0.15);
  outline: none;
}

.dark-mode .sidebar {
  border-color: rgba(255, 255, 255, 0.05);
}

.dark-mode .sidebar-header {
  border-color: rgba(255, 255, 255, 0.05);
}

.dark-mode .config-card {
  border-color: rgba(255, 255, 255, 0.05);
}

.dark-mode .config-card-header {
  background-color: rgba(26, 90, 150, 0.1);
  border-color: rgba(255, 255, 255, 0.05);
}

.dark-mode .form-control, .dark-mode .form-select {
  background-color: rgba(45, 55, 72, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}

.dark-mode .form-control:focus, .dark-mode .form-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(26, 90, 150, 0.25);
}

/* Sidebar Toggle Button */
.sidebar-toggle {
  background-color: var(--primary-color);
  color: white;
  border-radius: 0 6px 6px 0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.sidebar-toggle:hover {
  background-color: var(--primary-dark-color);
}

/* Calculate Button */
.btn-calculate {
  background: linear-gradient(135deg, var(--portnox-accent), var(--portnox-accent-dark));
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 20px;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-calculate:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(246, 92, 32, 0.3);
}

.btn-calculate i {
  font-size: 16px;
}
EOF

echo -e "${GREEN}✓${NC} Created modern Portnox theme"

# ============================================================
# 4. Create view initialization fix
# ============================================================
echo -e "\n${BLUE}Creating view initialization fix...${NC}"

cat > js/fixes/view-init-fix.js << 'EOF'
/**
 * View Initialization Fix for Portnox Total Cost Analyzer
 * Ensures each view is properly initialized with its container
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying view initialization fix...');
  
  // Wait for content to be properly loaded
  setTimeout(initializeViews, 800);
  
  function initializeViews() {
    // Initialize executive view
    if (window.executiveView) {
      const executivePanel = document.querySelector('.view-panel[data-view="executive"]');
      if (executivePanel) {
        console.log('Re-initializing executive view with proper container...');
        
        // Save current tab if already initialized
        const currentTab = window.executiveView.currentTab || 'executive-summary';
        
        // Re-initialize with correct container
        window.executiveView.container = executivePanel;
        window.executiveView.currentTab = currentTab;
        window.executiveView.initialized = true;
        
        // Initialize tabs if needed
        if (!executivePanel.querySelector('.results-tabs')) {
          window.executiveView.createTabsIfNeeded();
        }
        
        // Initialize panels if needed
        window.executiveView.createPanelsIfNeeded();
        
        // Refresh current panel
        window.executiveView.refreshChartsInPanel(currentTab);
        
        console.log('Executive view re-initialized successfully');
      }
    }
    
    // Initialize security view
    if (window.securityView) {
      const securityPanel = document.querySelector('.view-panel[data-view="security"]');
      if (securityPanel) {
        console.log('Re-initializing security view with proper container...');
        
        // Save current tab if already initialized
        const currentTab = window.securityView.currentTab || 'security-overview';
        
        // Re-initialize with correct container
        window.securityView.container = securityPanel;
        window.securityView.currentTab = currentTab;
        window.securityView.initialized = true;
        
        // Initialize tabs if needed
        if (!securityPanel.querySelector('.results-tabs')) {
          window.securityView.createTabsIfNeeded();
        }
        
        // Initialize panels if needed
        window.securityView.createPanelsIfNeeded();
        
        // Refresh current panel
        window.securityView.refreshChartsInPanel(currentTab);
        
        console.log('Security view re-initialized successfully');
      }
    }
    
    // Initialize financial view if needed
    initializeFinancialView();
    
    // Initialize technical view if needed
    initializeTechnicalView();
    
    // Setup main tab navigation
    setupMainTabsNavigation();
  }
  
  function initializeFinancialView() {
    const financialPanel = document.querySelector('.view-panel[data-view="financial"]');
    if (!financialPanel) return;
    
    // Check if any content exists
    if (financialPanel.children.length === 0) {
      console.log('Creating basic financial view content...');
      
      // Create tabs
      const tabsContainer = document.createElement('div');
      tabsContainer.className = 'results-tabs';
      tabsContainer.innerHTML = `
        <button class="results-tab active" data-panel="financial-summary">
          <i class="fas fa-chart-line"></i> Financial Summary
        </button>
        <button class="results-tab" data-panel="financial-tco">
          <i class="fas fa-money-bill-wave"></i> TCO Analysis
        </button>
        <button class="results-tab" data-panel="financial-roi">
          <i class="fas fa-percentage"></i> ROI Calculation
        </button>
        <button class="results-tab" data-panel="financial-projections">
          <i class="fas fa-chart-area"></i> Projections
        </button>
      `;
      financialPanel.appendChild(tabsContainer);
      
      // Create first panel
      const summaryPanel = document.createElement('div');
      summaryPanel.id = 'financial-summary';
      summaryPanel.className = 'results-panel active';
      summaryPanel.innerHTML = `
        <div class="panel-header">
          <h2>Financial Summary</h2>
          <p class="subtitle">Comprehensive financial analysis and TCO breakdown</p>
        </div>
        
        <div class="dashboard-grid">
          <div class="metric-card primary">
            <div class="card-icon"><i class="fas fa-dollar-sign"></i></div>
            <div class="metric-title">3-Year TCO</div>
            <div class="metric-value" id="financial-tco-value">$245,000</div>
            <div class="metric-description">Total cost of ownership</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> 53% below competitors
            </div>
          </div>
          
          <div class="metric-card secondary">
            <div class="card-icon"><i class="fas fa-percentage"></i></div>
            <div class="metric-title">ROI</div>
            <div class="metric-value" id="financial-roi-value">325%</div>
            <div class="metric-description">Return on investment</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> Industry leading returns
            </div>
          </div>
          
          <div class="metric-card accent">
            <div class="card-icon"><i class="fas fa-calendar-check"></i></div>
            <div class="metric-title">Payback Period</div>
            <div class="metric-value" id="financial-payback-value">7 months</div>
            <div class="metric-description">Time to positive ROI</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> 4.5x faster than on-premises
            </div>
          </div>
          
          <div class="metric-card">
            <div class="card-icon"><i class="fas fa-money-bill-alt"></i></div>
            <div class="metric-title">Annual Savings</div>
            <div class="metric-value" id="financial-savings-value">$91,700</div>
            <div class="metric-description">Average yearly benefit</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> Significant cost reduction
            </div>
          </div>
        </div>
        
        <div class="chart-container">
          <div class="chart-title"><i class="fas fa-chart-bar"></i> Total Cost of Ownership Breakdown</div>
          <div class="chart-subtitle">Detailed cost analysis by category over 3 years</div>
          <div class="chart-wrapper" id="financial-tco-breakdown-chart"></div>
        </div>
      `;
      
      financialPanel.appendChild(summaryPanel);
      
      // Setup tab navigation
      setupTabsNavigation(financialPanel);
    }
  }
  
  function initializeTechnicalView() {
    const technicalPanel = document.querySelector('.view-panel[data-view="technical"]');
    if (!technicalPanel) return;
    
    // Check if any content exists
    if (technicalPanel.children.length === 0) {
      console.log('Creating basic technical view content...');
      
      // Create tabs
      const tabsContainer = document.createElement('div');
      tabsContainer.className = 'results-tabs';
      tabsContainer.innerHTML = `
        <button class="results-tab active" data-panel="technical-overview">
          <i class="fas fa-cogs"></i> Technical Overview
        </button>
        <button class="results-tab" data-panel="technical-architecture">
          <i class="fas fa-network-wired"></i> Architecture
        </button>
        <button class="results-tab" data-panel="technical-deployment">
          <i class="fas fa-rocket"></i> Deployment
        </button>
        <button class="results-tab" data-panel="technical-integrations">
          <i class="fas fa-plug"></i> Integrations
        </button>
      `;
      technicalPanel.appendChild(tabsContainer);
      
      // Create first panel
      const overviewPanel = document.createElement('div');
      overviewPanel.id = 'technical-overview';
      overviewPanel.className = 'results-panel active';
      overviewPanel.innerHTML = `
        <div class="panel-header">
          <h2>Technical Overview</h2>
          <p class="subtitle">Comprehensive technical analysis and comparison</p>
        </div>
        
        <div class="dashboard-grid">
          <div class="metric-card primary">
            <div class="card-icon"><i class="fas fa-server"></i></div>
            <div class="metric-title">Architecture</div>
            <div class="metric-value">Cloud-Native</div>
            <div class="metric-description">No on-premises infrastructure required</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> Zero hardware maintenance
            </div>
          </div>
          
          <div class="metric-card secondary">
            <div class="card-icon"><i class="fas fa-clock"></i></div>
            <div class="metric-title">Deployment Time</div>
            <div class="metric-value">3 weeks</div>
            <div class="metric-description">Average implementation timeframe</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> 75% faster than competitors
            </div>
          </div>
          
          <div class="metric-card accent">
            <div class="card-icon"><i class="fas fa-users-cog"></i></div>
            <div class="metric-title">IT Resources</div>
            <div class="metric-value">0.25 FTE</div>
            <div class="metric-description">IT staff allocation required</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> 8x less than on-premises
            </div>
          </div>
          
          <div class="metric-card">
            <div class="card-icon"><i class="fas fa-sync-alt"></i></div>
            <div class="metric-title">Updates</div>
            <div class="metric-value">Automatic</div>
            <div class="metric-description">No manual updates required</div>
            <div class="metric-trend up">
              <i class="fas fa-arrow-up"></i> Always up-to-date
            </div>
          </div>
        </div>
        
        <div class="chart-container">
          <div class="chart-title"><i class="fas fa-network-wired"></i> Architecture Comparison</div>
          <div class="chart-subtitle">Key differences between deployment models</div>
          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon" style="background: linear-gradient(135deg, #1a5a96, #0d4275);">
                <i class="fas fa-cloud"></i>
              </div>
              <h3>Portnox: Cloud-Native</h3>
              <p><strong>Pros:</strong> No infrastructure, automatic updates, global scalability, rapid deployment, no maintenance overhead</p>
              <p><strong>Cons:</strong> Internet connectivity required</p>
            </div>
            
            <div class="benefit-card">
              <div class="benefit-icon" style="background: linear-gradient(135deg, #00bceb, #0078d4);">
                <i class="fas fa-server"></i>
              </div>
              <h3>Competitors: On-Premises</h3>
              <p><strong>Pros:</strong> Full control over infrastructure, offline operation capability</p>
              <p><strong>Cons:</strong> High hardware costs, complex deployment, significant maintenance, long implementation</p>
            </div>
          </div>
        </div>
      `;
      
      technicalPanel.appendChild(overviewPanel);
      
      // Setup tab navigation
      setupTabsNavigation(technicalPanel);
    }
  }
  
  function setupTabsNavigation(panel) {
    const tabs = panel.querySelectorAll('.results-tab');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const panelId = this.getAttribute('data-panel');
        
        // Remove active class from all tabs and panels
        tabs.forEach(t => t.classList.remove('active'));
        const panels = panel.querySelectorAll('.results-panel');
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding panel
        const targetPanel = document.getElementById(panelId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        } else {
          // Create panel if it doesn't exist
          const newPanel = document.createElement('div');
          newPanel.id = panelId;
          newPanel.className = 'results-panel active';
          
          // Add basic content based on panel id
          newPanel.innerHTML = `
            <div class="panel-header">
              <h2>${getPanelTitle(panelId)}</h2>
              <p class="subtitle">${getPanelSubtitle(panelId)}</p>
            </div>
            
            <div class="chart-container">
              <div class="chart-title"><i class="fas fa-info-circle"></i> Panel Content</div>
              <div class="chart-subtitle">This panel content will be populated with data</div>
              <div class="chart-wrapper" id="${panelId}-chart"></div>
            </div>
          `;
          
          panel.appendChild(newPanel);
        }
      });
    });
  }
  
  function getPanelTitle(panelId) {
    switch(panelId) {
      case 'financial-tco': return 'TCO Analysis';
      case 'financial-roi': return 'ROI Calculation';
      case 'financial-projections': return 'Financial Projections';
      case 'technical-architecture': return 'Technical Architecture';
      case 'technical-deployment': return 'Deployment Process';
      case 'technical-integrations': return 'Integration Capabilities';
      default: return panelId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  }
  
  function getPanelSubtitle(panelId) {
    switch(panelId) {
      case 'financial-tco': return 'Detailed total cost of ownership breakdown and analysis';
      case 'financial-roi': return 'Return on investment calculation and value drivers';
      case 'financial-projections': return 'Multi-year financial projections and forecasts';
      case 'technical-architecture': return 'Technical architecture details and comparison';
      case 'technical-deployment': return 'Deployment process and implementation timeline';
      case 'technical-integrations': return 'Integration capabilities with existing systems';
      default: return 'Detailed analysis and metrics';
    }
  }
  
  function setupMainTabsNavigation() {
    // Add click event to main tabs if not already set up
    const mainTabs = document.querySelectorAll('.main-tab');
    if (!mainTabs || mainTabs.length === 0) return;
    
    mainTabs.forEach(tab => {
      // Check if event listener is already attached (by presence of data attribute)
      if (tab.getAttribute('data-event-attached') === 'true') return;
      
      // Clone to remove any existing event listeners
      const newTab = tab.cloneNode(true);
      tab.parentNode.replaceChild(newTab, tab);
      
      // Add new event listener
      newTab.addEventListener('click', function() {
        const view = this.getAttribute('data-view');
        
        // Remove active class from all tabs
        mainTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding panel
        const viewPanels = document.querySelectorAll('.view-panel');
        viewPanels.forEach(p => p.classList.remove('active'));
        
        const viewPanel = document.querySelector(`.view-panel[data-view="${view}"]`);
        if (viewPanel) {
          viewPanel.classList.add('active');
          
          // Refresh charts in the active view
          if (view === 'executive' && window.executiveView) {
            window.executiveView.refreshChartsInPanel(window.executiveView.currentTab);
          } else if (view === 'security' && window.securityView) {
            window.securityView.refreshChartsInPanel(window.securityView.currentTab);
          }
        }
      });
      
      // Mark as event attached
      newTab.setAttribute('data-event-attached', 'true');
    });
  }
});
EOF

echo -e "${GREEN}✓${NC} Created view initialization fix"

# ============================================================
# 5. Add fix scripts to index.html
# ============================================================
echo -e "\n${BLUE}Adding fix scripts to index.html...${NC}"
backup_file "index.html"

if [ -f "index.html" ]; then
  # Add CSS file reference
  sed -i '/<link rel="stylesheet" href="css\/main.css">/a \    <link rel="stylesheet" href="css/fixes/portnox-modern-theme.css">' index.html
  
  # Add JS file references
  sed -i 's|</body>|    <!-- Targeted Fixes -->\\n    <script src="js/fixes/view-organization-fix.js"></script>\\n    <script src="js/fixes/view-init-fix.js"></script>\\n</body>|' index.html
  
  echo -e "${GREEN}✓${NC} Added fix scripts to index.html"
fi

# ============================================================
# 6. Update header in index.html
# ============================================================
echo -e "\n${BLUE}Updating header in index.html...${NC}"

if [ -f "index.html" ]; then
  # Update header classes for modern styling
  sed -i 's/class="app-header"/class="app-header enhanced-header"/g' index.html
  
  # Update header content with more modern layout if not already using enhanced header
  if ! grep -q "header-content" index.html; then
    sed -i '/<header class="app-header enhanced-header">/,/<\/header>/c\
    <!-- Enhanced Modern Header -->\\n    <header class="app-header enhanced-header">\\n        <div id="particles-header" class="particles-header"></div>\\n        <div class="header-content">\\n            <div class="logo-section">\\n                <img src="img/vendors/portnox-logo.png" alt="Portnox Logo" class="company-logo">\\n                <div class="app-title">\\n                    <h1>Zero Trust Total Cost Analyzer</h1>\\n                    <p class="subtitle">Multi-Vendor NAC Solution Comparison Platform</p>\\n                </div>\\n            </div>\\n            <div class="header-actions">\\n                <button id="calculate-btn-header" class="btn btn-primary" title="Calculate TCO & ROI">\\n                    <i class="fas fa-calculator"></i> <span>Calculate</span>\\n                </button>\\n                <button id="export-pdf" class="btn btn-outline btn-icon" title="Export Report">\\n                    <i class="fas fa-file-pdf"></i>\\n                    <span>Export</span>\\n                </button>\\n                <button id="help-btn" class="btn btn-outline btn-icon" title="Help">\\n                    <i class="fas fa-question-circle"></i>\\n                </button>\\n                <button id="dark-mode-toggle" class="btn btn-outline btn-icon" title="Toggle Dark Mode">\\n                    <i class="fas fa-moon"></i>\\n                </button>\\n            </div>\\n        </div>\\n    </header>' index.html
  fi
  
  echo -e "${GREEN}✓${NC} Updated header in index.html"
fi

# ============================================================
# 7. Git commands to stage and commit changes
# ============================================================
echo -e "\n${BLUE}Preparing Git operations...${NC}"

GIT_MESSAGE="Fixed Portnox Total Cost Analyzer UI Issues

- Fixed JavaScript syntax errors in chart files
- Properly organized views under their respective tabs (Executive, Financial, Security, Technical)
- Updated banner and header with modern Portnox branding
- Enhanced UI with better color scheme and visual improvements
- Fixed view initialization issues
- Added placeholder content for Financial and Technical views"

echo -e "Would you like to commit these changes with the following message?
${GREEN}${GIT_MESSAGE}${NC}
"
echo -e "Type 'yes' to proceed or any other key to skip Git operations:"
read -p "> " PROCEED_GIT

if [ "$PROCEED_GIT" = "yes" ]; then
  # Check if git is installed
  if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed. Please install Git to use version control.${NC}"
  else
    # Check if we're in a git repository
    if ! git rev-parse --is-inside-work-tree &> /dev/null; then
      echo -e "${RED}Not inside a Git repository. Initializing a new repository...${NC}"
      git init
      echo -e "${GREEN}Git repository initialized.${NC}"
    fi
    
    # Stage all changed files
    git add .
    echo -e "${GREEN}✓${NC} Staged all changes"
    
    # Commit the changes
    git commit -m "$GIT_MESSAGE"
    echo -e "${GREEN}✓${NC} Committed changes"
    
    # Ask if user wants to push
    echo -e "Do you want to push these changes to remote repository?"
    echo -e "Type 'yes' to proceed or any other key to skip pushing:"
    read -p "> " PROCEED_PUSH
    
    if [ "$PROCEED_PUSH" = "yes" ]; then
      # Check if remote exists
      if git remote -v | grep origin &> /dev/null; then
        git push origin HEAD
        PUSH_STATUS=$?
        
        if [ $PUSH_STATUS -eq 0 ]; then
          echo -e "${GREEN}✓${NC} Successfully pushed changes to remote repository"
        else
          echo -e "${RED}✗${NC} Failed to push changes. Please check your connection and repository permissions."
        fi
      else
        echo -e "${RED}No remote repository found.${NC}"
        echo -e "Please set up a remote repository with:"
        echo -e "  git remote add origin <repository-url>"
        echo -e "Then push your changes with:"
        echo -e "  git push -u origin master"
      fi
    else
      echo -e "${BLUE}Skipping push operation.${NC}"
    fi
  fi
else
  echo -e "${BLUE}Skipping Git operations.${NC}"
fi

# ============================================================
# 8. Final message
# ============================================================
echo -e "\n${GREEN}=== Portnox Total Cost Analyzer Fixes Complete ===${NC}"
echo -e "The following issues have been fixed:"
echo -e "  1. JavaScript syntax errors in chart files"
echo -e "  2. View organization issues (views now properly under respective tabs)"
echo -e "  3. Enhanced banner and header with modern Portnox branding"
echo -e "  4. Improved UI with better color scheme and visual components"
echo -e "  5. Fixed view initialization issues"
echo -e "  6. Added placeholder content for Financial and Technical views"
echo -e "\nBackups of all modified files are stored in: ${BACKUP_DIR}"
echo -e "\n${BLUE}To test the changes, open index.html in your browser.${NC}"
echo -e "\n${GREEN}Complete!${NC}"
