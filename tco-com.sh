#!/bin/bash
# Portnox TCO Analyzer UI Overhaul Implementation Script
# This script performs a comprehensive update to the Portnox TCO Analyzer interface,
# removing the wizard approach and implementing a modern, collapsible sidebar layout
# with detailed comparison views for different stakeholders.

# Exit on error
set -e

echo "====== Portnox TCO Analyzer UI Overhaul ======"
echo "Starting implementation of new UI architecture..."

# Create backup of current state
echo "Creating backup of current state..."
current_date=$(date +"%Y%m%d%H%M%S")
backup_dir="./backup_${current_date}"
mkdir -p "$backup_dir"
cp -r css js index.html "$backup_dir/"
echo "Backup created at $backup_dir"

# Step 1: Update HTML structure to remove wizard and implement sidebar layout
echo "Updating HTML structure to implement new UI architecture..."

# Create new CSS files for modern layout
echo "Creating new CSS files..."
cat > css/modern-layout.css << 'EOF'
/* Modern Layout for Portnox TCO Analyzer */
:root {
  --primary-color: #2563eb;
  --primary-light: #dbeafe;
  --primary-dark: #1e40af;
  --secondary-color: #10b981;
  --secondary-light: #d1fae5;
  --secondary-dark: #047857;
  --bg-light: #f9fafb;
  --text-dark: #1f2937;
  --text-light: #9ca3af;
  --border-color: #e5e7eb;
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --sidebar-width: 320px;
  --header-height: 70px;
  --sidebar-collapsed-width: 80px;
  --transition-speed: 0.3s;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: var(--text-dark);
  background-color: var(--bg-light);
}

/* Main layout structure */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.app-main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Sidebar styles */
.sidebar {
  width: var(--sidebar-width);
  background-color: white;
  border-right: 1px solid var(--border-color);
  height: calc(100vh - var(--header-height));
  transition: width var(--transition-speed) ease;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;
}

.sidebar.collapsed {
  width: var(--sidebar-collapsed-width);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-dark);
  font-size: 1.2rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-speed) ease;
}

.sidebar.collapsed .sidebar-toggle {
  transform: rotate(180deg);
}

.sidebar-section {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.sidebar.collapsed .sidebar-section h3,
.sidebar.collapsed .form-label,
.sidebar.collapsed .config-description {
  display: none;
}

.sidebar.collapsed .sidebar-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}

.sidebar-section-icon {
  font-size: 1.5rem;
  margin-right: 0.75rem;
  color: var(--primary-color);
  min-width: 24px;
  text-align: center;
}

/* Main content area */
.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  transition: margin-left var(--transition-speed) ease;
}

/* Tabs for different views */
.view-tabs {
  display: flex;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

.view-tab {
  padding: 1rem 1.5rem;
  border: none;
  background: none;
  font-weight: 500;
  color: var(--text-light);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.view-tab.active {
  color: var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
}

.view-tab:hover:not(.active) {
  color: var(--text-dark);
}

/* Tab content */
.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

/* Cards and grids */
.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: var(--card-shadow);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1200px) {
  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-3, .grid-2 {
    grid-template-columns: 1fr;
  }
  
  .grid-4 {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: absolute;
    height: calc(100vh - var(--header-height));
  }
  
  .sidebar.collapsed {
    width: 0;
    padding: 0;
    border: none;
  }
}

/* Form elements */
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.form-input, .form-select {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.15s ease-in-out;
}

.form-input:focus, .form-select:focus {
  border-color: var(--primary-color);
  outline: none;
}

.form-check {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.form-check-input {
  margin-right: 0.5rem;
}

/* Vendor selection */
.vendor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 0.75rem;
}

.vendor-card {
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.vendor-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.vendor-card.selected {
  border-color: var(--primary-color);
  background-color: var(--primary-light);
}

.vendor-logo {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.vendor-logo img {
  max-height: 100%;
  max-width: 100%;
}

.vendor-info {
  font-size: 0.75rem;
}

.vendor-info h3 {
  margin: 0.25rem 0;
  font-size: 0.875rem;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-dark);
}

.btn-outline:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.btn-icon {
  margin-right: 0.5rem;
}

/* Summary metrics */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.metric-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: var(--card-shadow);
  padding: 1.25rem;
}

.metric-card.highlight {
  background-color: var(--primary-light);
  border-left: 4px solid var(--primary-color);
}

.metric-card.positive {
  background-color: var(--secondary-light);
  border-left: 4px solid var(--secondary-color);
}

.metric-title {
  font-size: 0.875rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.metric-subtitle {
  font-size: 0.75rem;
  color: var(--text-light);
}

/* Charts area */
.chart-container {
  width: 100%;
  height: 350px;
  margin-bottom: 1.5rem;
}

/* Color indicators for vendors */
.vendor-indicator {
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

/* Comparison tables */
.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th, .comparison-table td {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
}

.comparison-table th {
  background-color: var(--bg-light);
  font-weight: 600;
  text-align: left;
}

.comparison-table tr:nth-child(even) {
  background-color: var(--bg-light);
}

/* Feature indicators */
.feature-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.feature-full {
  background-color: var(--secondary-light);
  color: var(--secondary-dark);
}

.feature-partial {
  background-color: #fef3c7;
  color: #d97706;
}

.feature-none {
  background-color: #fee2e2;
  color: #dc2626;
}

/* Animation for loading and transitions */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

/* Loading indicator */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--primary-light);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Risk indicators */
.risk-indicator {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.risk-low {
  background-color: var(--secondary-light);
  color: var(--secondary-dark);
}

.risk-medium {
  background-color: #fef3c7;
  color: #d97706;
}

.risk-high {
  background-color: #fee2e2;
  color: #dc2626;
}

/* Additional chart styles */
.radar-chart-container {
  position: relative;
  height: 400px;
}

/* Responsive design adjustments */
@media (max-width: 1024px) {
  .view-tab {
    padding: 0.75rem 1rem;
  }
}
EOF

# Create a separate CSS file for dark mode
cat > css/dark-mode.css << 'EOF'
/* Dark Mode Theme for Portnox TCO Analyzer */
body.dark-mode {
  --primary-color: #3b82f6;
  --primary-light: #1e3a8a;
  --primary-dark: #60a5fa;
  --secondary-color: #10b981;
  --secondary-light: #064e3b;
  --secondary-dark: #34d399;
  --bg-light: #111827;
  --text-dark: #f9fafb;
  --text-light: #9ca3af;
  --border-color: #374151;
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
}

body.dark-mode {
  background-color: #0f172a;
  color: #f9fafb;
}

body.dark-mode .app-header,
body.dark-mode .sidebar,
body.dark-mode .card,
body.dark-mode .metric-card {
  background-color: #1e293b;
}

body.dark-mode .view-tab.active {
  color: var(--primary-dark);
  border-bottom-color: var(--primary-dark);
}

body.dark-mode .form-input, 
body.dark-mode .form-select {
  background-color: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

body.dark-mode .comparison-table th {
  background-color: #273549;
}

body.dark-mode .comparison-table tr:nth-child(even) {
  background-color: #1f2937;
}

body.dark-mode .btn-outline {
  border-color: #4b5563;
  color: #e5e7eb;
}

body.dark-mode .metric-card.highlight {
  background-color: var(--primary-light);
  border-left-color: var(--primary-dark);
}

body.dark-mode .metric-card.positive {
  background-color: var(--secondary-light);
  border-left-color: var(--secondary-dark);
}

body.dark-mode .loading-overlay {
  background-color: rgba(15, 23, 42, 0.8);
}

body.dark-mode .spinner {
  border-color: #1e40af;
  border-top-color: #60a5fa;
}
EOF

# Create new JS file for modern UI functionality
echo "Creating new JS files..."
cat > js/modern-ui.js << 'EOF'
/**
 * Portnox TCO Analyzer - Modern UI JavaScript
 * Handles UI interactions, state management, and dynamic content updates
 */

// UI State management
const UIState = {
  sidebarCollapsed: false,
  activeTab: 'executive', // Default tab
  darkMode: false,
  selectedVendors: ['portnox', 'cisco'], // Default selected vendors
  loadingState: false,
  comparisonData: null,
  
  // Method to toggle sidebar collapse state
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    document.querySelector('.sidebar').classList.toggle('collapsed', this.sidebarCollapsed);
    document.querySelector('.content-area').style.marginLeft = this.sidebarCollapsed ? 
      'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';
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
    
    // Update icon
    const darkModeIcon = document.getElementById('dark-mode-icon');
    if (darkModeIcon) {
      darkModeIcon.classList.toggle('fa-moon', !this.darkMode);
      darkModeIcon.classList.toggle('fa-sun', this.darkMode);
    }
    
    // Re-render charts with appropriate theme
    if (this.comparisonData) {
      renderCharts(this.comparisonData);
    }
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
  },
  
  // Method to show loading state
  showLoading() {
    this.loadingState = true;
    document.getElementById('loading-overlay').style.display = 'flex';
  },
  
  // Method to hide loading state
  hideLoading() {
    this.loadingState = false;
    document.getElementById('loading-overlay').style.display = 'none';
  }
};

// Configuration state for TCO calculation
const ConfigState = {
  industry: 'financial',
  complianceFrameworks: ['pci-dss', 'nist'],
  organizationSize: 'medium',
  deviceCount: 2500,
  locations: 5,
  analysisYears: 3,
  fteCost: 120000,
  maintenancePercentage: 18,
  implementationUrgency: 'normal',
  
  // Advanced configuration
  cloudIntegration: false,
  legacyDevices: false,
  byodSupport: true,
  trainingCost: 500,
  consultingRate: 2000,
  
  // Update configuration value
  updateConfig(key, value) {
    if (this[key] !== undefined) {
      this[key] = value;
      
      // Handle special cases
      if (key === 'industry') {
        updateIndustrySpecificUI(value);
      }
      
      // Update UI elements that depend on this value
      updateConfigDependentUI(key);
    }
  },
  
  // Get full configuration object
  getConfig() {
    return { ...this };
  }
};

// Initialize the UI
function initializeUI() {
  // Set up event listeners for sidebar toggle
  document.getElementById('sidebar-toggle').addEventListener('click', () => UIState.toggleSidebar());
  
  // Set up event listeners for tab switching
  document.querySelectorAll('.view-tab').forEach(tab => {
    tab.addEventListener('click', () => UIState.setActiveTab(tab.dataset.tab));
  });
  
  // Set up event listeners for dark mode toggle
  document.getElementById('dark-mode-toggle').addEventListener('click', () => UIState.toggleDarkMode());
  
  // Set up event listeners for vendor selection
  document.querySelectorAll('.vendor-card').forEach(card => {
    card.addEventListener('click', () => UIState.toggleVendor(card.dataset.vendor));
  });
  
  // Set up event listeners for configuration inputs
  setupConfigInputListeners();
  
  // Set up event listener for calculate button
  document.getElementById('calculate-btn').addEventListener('click', performCalculation);
  
  // Initialize vendor selection UI
  updateVendorSelectionUI();
  
  // Initialize industry-specific UI
  updateIndustrySpecificUI(ConfigState.industry);
}

// Update UI to reflect vendor selection
function updateVendorSelectionUI() {
  document.querySelectorAll('.vendor-card').forEach(card => {
    const vendorId = card.dataset.vendor;
    card.classList.toggle('selected', UIState.selectedVendors.includes(vendorId));
  });
}

// Update industry-specific UI elements
function updateIndustrySpecificUI(industry) {
  // Update compliance framework options based on industry
  const complianceOptions = document.getElementById('compliance-options');
  
  // Different industries have different relevant compliance frameworks
  const industryCompliance = {
    'financial': ['pci-dss', 'soc2', 'nist', 'gdpr', 'glba'],
    'healthcare': ['hipaa', 'nist', 'gdpr', 'hitrust'],
    'education': ['ferpa', 'gdpr', 'nist'],
    'government': ['fisma', 'nist', 'cmmc', 'fedramp'],
    'manufacturing': ['nist', 'iec62443', 'cmmc'],
    'retail': ['pci-dss', 'gdpr', 'ccpa'],
    'technology': ['soc2', 'iso27001', 'gdpr', 'ccpa', 'nist']
  };
  
  // Get compliance frameworks for selected industry
  const relevantFrameworks = industryCompliance[industry] || ['nist', 'gdpr'];
  
  // Update UI with relevant compliance frameworks
  if (complianceOptions) {
    complianceOptions.innerHTML = '';
    
    relevantFrameworks.forEach(framework => {
      const isChecked = ConfigState.complianceFrameworks.includes(framework);
      
      const checkboxItem = document.createElement('div');
      checkboxItem.className = 'form-check';
      checkboxItem.innerHTML = `
        <input type="checkbox" id="compliance-${framework}" class="form-check-input" 
          ${isChecked ? 'checked' : ''} data-framework="${framework}">
        <label for="compliance-${framework}" class="form-check-label">
          ${getComplianceDisplayName(framework)}
        </label>
      `;
      
      complianceOptions.appendChild(checkboxItem);
      
      // Add event listener
      checkboxItem.querySelector('input').addEventListener('change', (e) => {
        toggleComplianceFramework(framework, e.target.checked);
      });
    });
  }
  
  // Update industry-specific insights
  updateIndustryInsights(industry);
}

// Get display name for compliance framework
function getComplianceDisplayName(frameworkId) {
  const frameworkNames = {
    'pci-dss': 'PCI DSS',
    'soc2': 'SOC 2',
    'nist': 'NIST 800-53',
    'gdpr': 'GDPR',
    'hipaa': 'HIPAA',
    'hitrust': 'HITRUST',
    'ferpa': 'FERPA',
    'fisma': 'FISMA',
    'cmmc': 'CMMC',
    'fedramp': 'FedRAMP',
    'iec62443': 'IEC 62443',
    'iso27001': 'ISO 27001',
    'ccpa': 'CCPA',
    'glba': 'GLBA'
  };
  
  return frameworkNames[frameworkId] || frameworkId.toUpperCase();
}

// Toggle compliance framework selection
function toggleComplianceFramework(framework, isSelected) {
  if (isSelected) {
    // Add framework if not already selected
    if (!ConfigState.complianceFrameworks.includes(framework)) {
      ConfigState.complianceFrameworks.push(framework);
    }
  } else {
    // Remove framework
    const index = ConfigState.complianceFrameworks.indexOf(framework);
    if (index !== -1) {
      ConfigState.complianceFrameworks.splice(index, 1);
    }
  }
}

// Update industry-specific insights
function updateIndustryInsights(industry) {
  const insightsContainer = document.getElementById('industry-insights');
  if (!insightsContainer) return;
  
  const industryInsights = {
    'financial': [
      'Financial institutions face regulatory requirements for secure access control',
      'PCI DSS compliance is critical for protecting cardholder data',
      'Zero Trust is increasingly required by financial regulators',
      'Breach costs in financial sector average $5.72M per incident'
    ],
    'healthcare': [
      'HIPAA requirements mandate strict access controls for PHI',
      'Healthcare faces 2x more cyberattacks than other industries',
      'IoT/medical devices create complex network security challenges',
      'Average healthcare breach costs $9.23M per incident'
    ],
    'education': [
      'BYOD environments require flexible access control solutions',
      'Student data privacy regulations like FERPA demand secure access',
      'Limited IT budgets require efficient, scalable NAC solutions',
      'Diverse environments with varying security requirements'
    ],
    'government': [
      'Compliance with FISMA and FedRAMP is mandatory',
      'Implementation of Zero Trust Architecture (ZTA) is now required',
      'Secure access to sensitive information critical for national security',
      'CMMC requirements increasing for defense contractors'
    ],
    'manufacturing': [
      'OT/IT convergence requires unified security approach',
      'Legacy equipment creates unique security challenges',
      'Supply chain security regulations increasing globally',
      'IEC 62443 compliance essential for industrial systems'
    ],
    'retail': [
      'PCI DSS compliance required for all merchants processing cards',
      'Distributed locations need centralized management',
      'IoT devices (POS, inventory systems) require secure access',
      'High seasonality demands flexible scaling of access policies'
    ],
    'technology': [
      'Development environments require granular access controls',
      'Remote workforce requires secure access from anywhere',
      'Protection of intellectual property is business-critical',
      'Rapid scaling demands cloud-native security solutions'
    ]
  };
  
  // Get insights for selected industry
  const relevantInsights = industryInsights[industry] || [
    'Network protection is essential regardless of industry',
    'Zero Trust principles apply across all verticals',
    'Regulatory compliance requirements continue to increase',
    'Cloud migration requires modern security approaches'
  ];
  
  // Update UI with relevant insights
  insightsContainer.innerHTML = '';
  
  relevantInsights.forEach(insight => {
    const insightItem = document.createElement('div');
    insightItem.className = 'industry-insight';
    insightItem.innerHTML = `
      <div class="insight-content">
        <i class="fas fa-lightbulb insight-icon"></i>
        <span>${insight}</span>
      </div>
    `;
    
    insightsContainer.appendChild(insightItem);
  });
}

// Set up event listeners for all configuration inputs
function setupConfigInputListeners() {
  // Industry selection
  const industrySelect = document.getElementById('industry-select');
  if (industrySelect) {
    industrySelect.value = ConfigState.industry;
    industrySelect.addEventListener('change', (e) => {
      ConfigState.updateConfig('industry', e.target.value);
    });
  }
  
  // Organization size
  const orgSizeSelect = document.getElementById('organization-size');
  if (orgSizeSelect) {
    orgSizeSelect.value = ConfigState.organizationSize;
    orgSizeSelect.addEventListener('change', (e) => {
      ConfigState.updateConfig('organizationSize', e.target.value);
      
      // Update device count based on organization size
      const deviceCountPresets = {
        'small': 500,
        'medium': 2500,
        'large': 7500,
        'enterprise': 20000
      };
      
      // Update device count input
      const deviceCountInput = document.getElementById('device-count');
      if (deviceCountInput) {
        deviceCountInput.value = deviceCountPresets[e.target.value] || 2500;
        ConfigState.updateConfig('deviceCount', parseInt(deviceCountInput.value, 10));
      }
    });
  }
  
  // Device count
  const deviceCountInput = document.getElementById('device-count');
  if (deviceCountInput) {
    deviceCountInput.value = ConfigState.deviceCount;
    deviceCountInput.addEventListener('change', (e) => {
      ConfigState.updateConfig('deviceCount', parseInt(e.target.value, 10));
    });
  }
  
  // Number of locations
  const locationsInput = document.getElementById('locations');
  if (locationsInput) {
    locationsInput.value = ConfigState.locations;
    locationsInput.addEventListener('change', (e) => {
      ConfigState.updateConfig('locations', parseInt(e.target.value, 10));
    });
  }
  
  // Years to project
  const yearsSelect = document.getElementById('years-to-project');
  if (yearsSelect) {
    yearsSelect.value = ConfigState.analysisYears;
    yearsSelect.addEventListener('change', (e) => {
      ConfigState.updateConfig('analysisYears', parseInt(e.target.value, 10));
    });
  }
  
  // FTE cost
  const fteCostInput = document.getElementById('fte-cost');
  if (fteCostInput) {
    fteCostInput.value = ConfigState.fteCost;
    fteCostInput.addEventListener('change', (e) => {
      ConfigState.updateConfig('fteCost', parseInt(e.target.value, 10));
    });
  }
  
  // Feature checkboxes
  const cloudIntegrationCheckbox = document.getElementById('cloud-integration');
  if (cloudIntegrationCheckbox) {
    cloudIntegrationCheckbox.checked = ConfigState.cloudIntegration;
    cloudIntegrationCheckbox.addEventListener('change', (e) => {
      ConfigState.updateConfig('cloudIntegration', e.target.checked);
    });
  }
  
  const legacyDevicesCheckbox = document.getElementById('legacy-devices');
  if (legacyDevicesCheckbox) {
    legacyDevicesCheckbox.checked = ConfigState.legacyDevices;
    legacyDevicesCheckbox.addEventListener('change', (e) => {
      ConfigState.updateConfig('legacyDevices', e.target.checked);
    });
  }
  
  const byodCheckbox = document.getElementById('byod-support');
  if (byodCheckbox) {
    byodCheckbox.checked = ConfigState.byodSupport;
    byodCheckbox.addEventListener('change', (e) => {
      ConfigState.updateConfig('byodSupport', e.target.checked);
    });
  }
}

// Update UI elements that depend on configuration changes
function updateConfigDependentUI(changedKey) {
  // Handle specific UI updates based on configuration changes
  // This will be called whenever a configuration value changes
  
  // For example, when device count changes, update cost estimates
  if (['deviceCount', 'analysisYears', 'fteCost'].includes(changedKey)) {
    updateCostEstimates();
  }
}

// Update cost estimates based on current configuration
function updateCostEstimates() {
  // This would update any preliminary cost estimates shown in the UI
  // before the full calculation is performed
  
  // For demonstration, update the estimated TCO range
  const estimatedTcoElement = document.getElementById('estimated-tco-range');
  if (estimatedTcoElement) {
    const deviceCount = ConfigState.deviceCount;
    const years = ConfigState.analysisYears;
    
    // Simple calculation for estimated TCO range
    const lowEndPortnox = deviceCount * 3 * 12 * years; // $3 per device per month
    const highEndPortnox = deviceCount * 5 * 12 * years; // $5 per device per month
    
    const lowEndOnPrem = deviceCount * 10 * years; // $10 per device per year
                        + (ConfigState.fteCost * 0.5 * years); // 0.5 FTE
    
    const highEndOnPrem = deviceCount * 15 * years // $15 per device per year
                        + (ConfigState.fteCost * 1 * years); // 1 FTE
    
    estimatedTcoElement.textContent = `$${formatNumber(lowEndPortnox)} - $${formatNumber(highEndPortnox)} (vs. $${formatNumber(lowEndOnPrem)} - $${formatNumber(highEndOnPrem)} for on-premises)`;
  }
}

// Perform TCO calculation
function performCalculation() {
  // Show loading state
  UIState.showLoading();
  
  // In a real application, this would make an API call or perform complex calculations
  // For demonstration, we'll simulate a delay and then display mock results
  setTimeout(() => {
    // Generate comparison data
    const comparisonData = generateComparisonData();
    
    // Save to state
    UIState.comparisonData = comparisonData;
    
    // Render charts and tables
    renderCharts(comparisonData);
    renderTables(comparisonData);
    
    // Show main content area
    document.querySelector('.content-area').classList.remove('hidden');
    
    // Hide loading state
    UIState.hideLoading();
    
    // Optionally collapse sidebar on mobile
    if (window.innerWidth < 768) {
      UIState.toggleSidebar();
    }
  }, 1500);
}

// Generate comparison data based on configuration
function generateComparisonData() {
  // This would be a complex calculation in a real application
  // For demonstration, we'll return mock data
  
  const selectedVendors = UIState.selectedVendors;
  const deviceCount = ConfigState.deviceCount;
  const years = ConfigState.analysisYears;
  const fteCost = ConfigState.fteCost;
  
  // Base costs per vendor per device
  const vendorBaseCosts = {
    'portnox': 4, // $4 per device per month (cloud subscription)
    'cisco': 12, // $12 per device per year (plus hardware, implementation, etc.)
    'aruba': 10, // $10 per device per year
    'forescout': 11, // $11 per device per year
    'fortinac': 9, // $9 per device per year
    'noNac': 0 // No direct licensing cost
  };
  
  // FTE requirements per vendor
  const vendorFteRequirements = {
    'portnox': 0.15, // 15% of one FTE
    'cisco': 0.5, // 50% of one FTE
    'aruba': 0.45, // 45% of one FTE
    'forescout': 0.4, // 40% of one FTE
    'fortinac': 0.4, // 40% of one FTE
    'noNac': 0 // No direct FTE for NAC, but security risks
  };
  
  // Hardware costs (one-time)
  const vendorHardwareCosts = {
    'portnox': 0, // Cloud-based, no hardware
    'cisco': deviceCount * 3, // $3 per device
    'aruba': deviceCount * 2.5, // $2.50 per device
    'forescout': deviceCount * 2.75, // $2.75 per device
    'fortinac': deviceCount * 2, // $2 per device
    'noNac': 0 // No hardware
  };
  
  // Implementation costs (one-time)
  const vendorImplementationCosts = {
    'portnox': 10000 + (deviceCount * 0.5), // Base fee + $0.50 per device
    'cisco': 30000 + (deviceCount * 2), // Base fee + $2 per device
    'aruba': 25000 + (deviceCount * 1.8), // Base fee + $1.80 per device
    'forescout': 25000 + (deviceCount * 1.7), // Base fee + $1.70 per device
    'fortinac': 20000 + (deviceCount * 1.6), // Base fee + $1.60 per device
    'noNac': 0 // No implementation
  };
  
  // Implementation time (days)
  const vendorImplementationTime = {
    'portnox': 45,
    'cisco': 180,
    'aruba': 160,
    'forescout': 150,
    'fortinac': 140,
    'noNac': 0
  };
  
  // Annual maintenance percentage of initial costs
  const vendorMaintenancePercentage = {
    'portnox': 0, // Included in subscription
    'cisco': 0.18, // 18% annual maintenance
    'aruba': 0.18, // 18% annual maintenance
    'forescout': 0.18, // 18% annual maintenance
    'fortinac': 0.18, // 18% annual maintenance
    'noNac': 0 // No maintenance
  };
  
  // Risk scores (lower is better)
  const vendorRiskScores = {
    'portnox': {
      'breachRisk': 30,
      'compliance': 20,
      'visibility': 15,
      'management': 25,
      'uptime': 10
    },
    'cisco': {
      'breachRisk': 70,
      'compliance': 60,
      'visibility': 55,
      'management': 65,
      'uptime': 40
    },
    'aruba': {
      'breachRisk': 65,
      'compliance': 55,
      'visibility': 50,
      'management': 60,
      'uptime': 35
    },
    'forescout': {
      'breachRisk': 60,
      'compliance': 50,
      'visibility': 40,
      'management': 55,
      'uptime': 30
    },
    'fortinac': {
      'breachRisk': 60,
      'compliance': 55,
      'visibility': 45,
      'management': 60,
      'uptime': 35
    },
    'noNac': {
      'breachRisk': 95,
      'compliance': 90,
      'visibility': 85,
      'management': 90,
      'uptime': 75
    }
  };
  
  // Feature scores (0-100)
  const vendorFeatureScores = {
    'portnox': {
      'cloudSupport': 100,
      'apiIntegration': 90,
      'scalability': 95,
      'security': 95,
      'userExperience': 90,
      'zeroTrust': 100,
      'mobileSupport': 90
    },
    'cisco': {
      'cloudSupport': 50,
      'apiIntegration': 60,
      'scalability': 70,
      'security': 80,
      'userExperience': 60,
      'zeroTrust': 40,
      'mobileSupport': 50
    },
    'aruba': {
      'cloudSupport': 60,
      'apiIntegration': 70,
      'scalability': 75,
      'security': 85,
      'userExperience': 65,
      'zeroTrust': 45,
      'mobileSupport': 65
    },
    'forescout': {
      'cloudSupport': 40,
      'apiIntegration': 65,
      'scalability': 60,
      'security': 80,
      'userExperience': 50,
      'zeroTrust': 40,
      'mobileSupport': 50
    },
    'fortinac': {
      'cloudSupport': 45,
      'apiIntegration': 60,
      'scalability': 65,
      'security': 75,
      'userExperience': 55,
      'zeroTrust': 45,
      'mobileSupport': 55
    },
    'noNac': {
      'cloudSupport': 0,
      'apiIntegration': 0,
      'scalability': 0,
      'security': 0,
      'userExperience': 0,
      'zeroTrust': 0,
      'mobileSupport': 0
    }
  };
  
  // Compliance coverage percentage
  const vendorCompliance = {
    'portnox': {
      'nist': 95,
      'iso27001': 90,
      'hipaa': 100,
      'pciDss': 95,
      'gdpr': 85
    },
    'cisco': {
      'nist': 70,
      'iso27001': 65,
      'hipaa': 60,
      'pciDss': 75,
      'gdpr': 50
    },
    'aruba': {
      'nist': 75,
      'iso27001': 70,
      'hipaa': 65,
      'pciDss': 80,
      'gdpr': 60
    },
    'forescout': {
      'nist': 65,
      'iso27001': 60,
      'hipaa': 70,
      'pciDss': 75,
      'gdpr': 55
    },
    'fortinac': {
      'nist': 65,
      'iso27001': 60,
      'hipaa': 65,
      'pciDss': 70,
      'gdpr': 50
    },
    'noNac': {
      'nist': 10,
      'iso27001': 5,
      'hipaa': 5,
      'pciDss': 5,
      'gdpr': 5
    }
  };
  
  // Generate yearly cost data
  const yearlyData = {};
  const cumulativeData = {};
  
  selectedVendors.forEach(vendor => {
    // Calculate yearly costs
    const yearData = [];
    let runningTotal = 0;
    const cumulativePoints = ['Initial'];
    
    // Initial costs (hardware + implementation)
    const initialCost = vendorHardwareCosts[vendor] + vendorImplementationCosts[vendor];
    runningTotal += initialCost;
    cumulativePoints.push(formatNumber(runningTotal));
    
    for (let year = 1; year <= years; year++) {
      // License costs
      let yearCost = 0;
      
      if (vendor === 'portnox') {
        // Monthly subscription
        yearCost += deviceCount * vendorBaseCosts[vendor] * 12;
      } else if (vendor !== 'noNac') {
        // Annual license
        yearCost += deviceCount * vendorBaseCosts[vendor];
        
        // Maintenance costs (not applicable to first year for on-prem)
        if (year > 1) {
          yearCost += vendorHardwareCosts[vendor] * vendorMaintenancePercentage[vendor];
        }
      }
      
      // Personnel costs
      yearCost += fteCost * vendorFteRequirements[vendor];
      
      // Add to yearly data
      yearData.push(yearCost);
      
      // Add to running total for cumulative chart
      runningTotal += yearCost;
      
      // Add quarterly points for first year, then yearly
      if (year === 1) {
        // Q1, Q2, Q3
        for (let q = 1; q <= 3; q++) {
          cumulativePoints.push(formatNumber(initialCost + (yearCost * q / 4)));
        }
        // End of year 1
        cumulativePoints.push(formatNumber(initialCost + yearCost));
      } else {
        // End of year 2, 3, etc.
        cumulativePoints.push(formatNumber(runningTotal));
      }
    }
    
    yearlyData[vendor] = yearData;
    cumulativeData[vendor] = cumulativePoints;
  });
  
  // Calculate breakdown percentages
  const breakdownData = {};
  
  selectedVendors.forEach(vendor => {
    let total = vendorHardwareCosts[vendor] + vendorImplementationCosts[vendor];
    
    // Add yearly costs
    for (let i = 0; i < yearlyData[vendor].length; i++) {
      total += yearlyData[vendor][i];
    }
    
    // Handle special case for Portnox (cloud subscription model)
    if (vendor === 'portnox') {
      breakdownData[vendor] = [
        { name: 'Subscription', value: (deviceCount * vendorBaseCosts[vendor] * 12 * years / total) * 100 },
        { name: 'Implementation', value: (vendorImplementationCosts[vendor] / total) * 100 },
        { name: 'Personnel', value: (fteCost * vendorFteRequirements[vendor] * years / total) * 100 }
      ];
    } else if (vendor === 'noNac') {
      breakdownData[vendor] = [
        { name: 'Security Incidents', value: 65 },
        { name: 'Manual Management', value: 35 }
      ];
    } else {
      // On-premises model
      breakdownData[vendor] = [
        { name: 'Hardware', value: (vendorHardwareCosts[vendor] / total) * 100 },
        { name: 'Software', value: (deviceCount * vendorBaseCosts[vendor] * years / total) * 100 },
        { name: 'Implementation', value: (vendorImplementationCosts[vendor] / total) * 100 },
        { name: 'Maintenance', value: (vendorHardwareCosts[vendor] * vendorMaintenancePercentage[vendor] * (years - 1) / total) * 100 },
        { name: 'Personnel', value: (fteCost * vendorFteRequirements[vendor] * years / total) * 100 }
      ];
    }
  });
  
  // Implementation timeline comparison
  const implementationData = {};
  const implementationLabels = ['Planning', 'Installation', 'Configuration', 'Testing', 'Training', 'Deployment'];
  
  selectedVendors.forEach(vendor => {
    if (vendor === 'portnox') {
      implementationData[vendor] = [10, 0, 15, 10, 5, 5]; // Cloud model
    } else if (vendor === 'cisco') {
      implementationData[vendor] = [30, 45, 40, 30, 20, 15];
    } else if (vendor === 'aruba') {
      implementationData[vendor] = [25, 40, 35, 25, 15, 20];
    } else if (vendor === 'forescout') {
      implementationData[vendor] = [25, 35, 35, 25, 15, 15];
    } else if (vendor === 'fortinac') {
      implementationData[vendor] = [20, 35, 30, 25, 15, 15];
    } else if (vendor === 'noNac') {
      implementationData[vendor] = [0, 0, 0, 0, 0, 0];
    }
  });
  
  // ROI calculation
  const roiData = {};
  
  // 20% chance of breach without NAC yearly, 5% with NAC
  // Average breach cost $4.24M
  const breachCost = 4240000;
  const noNacBreachRisk = 0.2;
  const nacBreachRisk = 0.05;
  
  // Productivity gains from automation (hours saved per device per year)
  const productivityHoursPerDevice = {
    'portnox': 2.5,
    'cisco': 1.2,
    'aruba': 1.3,
    'forescout': 1.2,
    'fortinac': 1.1,
    'noNac': 0
  };
  
  // Average value of 1 IT hour
  const itHourValue = 75;
  
  selectedVendors.forEach(vendor => {
    const yearlyRoi = [];
    let cumulativeCost = vendorHardwareCosts[vendor] + vendorImplementationCosts[vendor];
    let baselineCost = 0; // No NAC cost
    let baselineRisk = noNacBreachRisk * breachCost; // Risk cost without NAC
    
    for (let year = 1; year <= years; year++) {
      // Add yearly costs
      cumulativeCost += yearlyData[vendor][year - 1];
      
      // Add baseline cost (risk of no NAC)
      baselineCost += (fteCost * 0.1 * year); // Increasing manual management cost
      baselineRisk += noNacBreachRisk * breachCost; // Cumulative breach risk
      
      // Calculate benefits
      let benefits = 0;
      
      if (vendor !== 'noNac') {
        // Reduced breach risk
        benefits += (noNacBreachRisk - nacBreachRisk) * breachCost;
        
        // Productivity gains
        benefits += productivityHoursPerDevice[vendor] * deviceCount * itHourValue;
        
        // Reduced manual management
        benefits += fteCost * 0.1; // Compared to manual management
      }
      
      // Yearly ROI = Cumulative benefits - Cumulative costs
      const yearRoi = (benefits * year) - cumulativeCost;
      yearlyRoi.push(yearRoi);
    }
    
    roiData[vendor] = yearlyRoi;
  });
  
  return {
    yearlyData,
    cumulativeData,
    breakdownData,
    implementationData,
    implementationLabels,
    vendorRiskScores,
    vendorFeatureScores,
    vendorCompliance,
    roiData,
    vendorImplementationTime,
    vendorFteRequirements
  };
}

// Render charts with comparison data
function renderCharts(data) {
  // This would use Chart.js or another charting library
  // For demonstration, we'll just update the UI with placeholders
  
  // Example chart updates
  const chartElements = document.querySelectorAll('.chart-container');
  chartElements.forEach(container => {
    container.innerHTML = `<div class="chart-placeholder">
      <div class="chart-title">${container.dataset.title || 'Chart'}</div>
      <div class="chart-mock" style="height: 280px; background-color: #f3f4f6;"></div>
      <div class="chart-legend">
        ${UIState.selectedVendors.map(vendor => 
          `<div class="vendor-indicator">
            <div class="color-dot" style="background-color: ${getVendorColor(vendor)};"></div>
            <div class="vendor-name">${getVendorDisplayName(vendor)}</div>
          </div>`
        ).join('')}
      </div>
    </div>`;
  });
  
  // In a real implementation, this would create actual charts using Chart.js or similar
}

// Render comparison tables
function renderTables(data) {
  // This would build detailed comparison tables
  // For demonstration, we'll update placeholder tables
  
  // TCO Comparison Table
  const tcoTableBody = document.querySelector('#tco-comparison-table tbody');
  if (tcoTableBody) {
    tcoTableBody.innerHTML = '';
    
    // Add rows for each cost component
    const costComponents = [
      { name: 'Hardware Costs', key: 'hardware' },
      { name: 'Software/Subscription', key: 'software' },
      { name: 'Implementation', key: 'implementation' },
      { name: 'Maintenance & Support', key: 'maintenance' },
      { name: 'Personnel (FTE)', key: 'personnel' },
      { name: 'Total 3-Year TCO', key: 'total', isTotal: true }
    ];
    
    costComponents.forEach(component => {
      const row = document.createElement('tr');
      if (component.isTotal) {
        row.className = 'total-row';
      }
      
      const nameCell = document.createElement('td');
      nameCell.textContent = component.name;
      row.appendChild(nameCell);
      
      // Add cells for each vendor
      UIState.selectedVendors.forEach(vendor => {
        const cell = document.createElement('td');
        
        // In a real implementation, this would use actual data
        if (component.key === 'hardware') {
          cell.textContent = vendor === 'portnox' ? '$0' : 
                             vendor === 'cisco' ? '$175,000' : 
                             vendor === 'aruba' ? '$160,000' : 
                             vendor === 'forescout' ? '$150,000' : 
                             vendor === 'fortinac' ? '$130,000' : 
                             vendor === 'noNac' ? '$0' : 'N/A';
        } else if (component.key === 'software') {
          cell.textContent = vendor === 'portnox' ? '$300,000' : 
                             vendor === 'cisco' ? '$250,000' : 
                             vendor === 'aruba' ? '$240,000' : 
                             vendor === 'forescout' ? '$235,000' : 
                             vendor === 'fortinac' ? '$200,000' : 
                             vendor === 'noNac' ? '$0' : 'N/A';
        } else if (component.key === 'implementation') {
          cell.textContent = vendor === 'portnox' ? '$30,000' : 
                             vendor === 'cisco' ? '$120,000' : 
                             vendor === 'aruba' ? '$110,000' : 
                             vendor === 'forescout' ? '$105,000' : 
                             vendor === 'fortinac' ? '$100,000' : 
                             vendor === 'noNac' ? '$0' : 'N/A';
        } else if (component.key === 'maintenance') {
          cell.textContent = vendor === 'portnox' ? '$45,000' : 
                             vendor === 'cisco' ? '$180,000' : 
                             vendor === 'aruba' ? '$170,000' : 
                             vendor === 'forescout' ? '$160,000' : 
                             vendor === 'fortinac' ? '$150,000' : 
                             vendor === 'noNac' ? '$0' : 'N/A';
        } else if (component.key === 'personnel') {
          cell.textContent = vendor === 'portnox' ? '$54,000' : 
                             vendor === 'cisco' ? '$180,000' : 
                             vendor === 'aruba' ? '$162,000' : 
                             vendor === 'forescout' ? '$144,000' : 
                             vendor === 'fortinac' ? '$144,000' : 
                             vendor === 'noNac' ? '$180,000' : 'N/A';
        } else if (component.key === 'total') {
          cell.textContent = vendor === 'portnox' ? '$429,000' : 
                             vendor === 'cisco' ? '$905,000' : 
                             vendor === 'aruba' ? '$842,000' : 
                             vendor === 'forescout' ? '$794,000' : 
                             vendor === 'fortinac' ? '$724,000' : 
                             vendor === 'noNac' ? '$180,000' : 'N/A';
          cell.className = 'total-cell';
        }
        
        row.appendChild(cell);
      });
      
      tcoTableBody.appendChild(row);
    });
  }
  
  // Feature Comparison Table
  const featureTableBody = document.querySelector('#feature-comparison-table tbody');
  if (featureTableBody) {
    featureTableBody.innerHTML = '';
    
    // Add rows for each feature
    const features = [
      { name: 'Cloud-Based Architecture', key: 'cloud' },
      { name: 'Zero Trust Security', key: 'zeroTrust' },
      { name: 'Multi-Factor Authentication', key: 'mfa' },
      { name: 'Scalability', key: 'scalability' },
      { name: 'BYOD Support', key: 'byod' },
      { name: 'Guest Management', key: 'guest' },
      { name: 'Remote Access', key: 'remote' }
    ];
    
    features.forEach(feature => {
      const row = document.createElement('tr');
      
      const nameCell = document.createElement('td');
      nameCell.textContent = feature.name;
      nameCell.className = 'feature-name';
      row.appendChild(nameCell);
      
      // Add cells for each vendor
      UIState.selectedVendors.forEach(vendor => {
        const cell = document.createElement('td');
        cell.className = 'feature-status-cell';
        
        // In a real implementation, this would use actual data
        if (feature.key === 'cloud') {
          cell.innerHTML = vendor === 'portnox' ? '<span class="feature-status feature-full">✓</span> Full' : 
                           vendor === 'cisco' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'aruba' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'forescout' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'fortinac' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'noNac' ? '<span class="feature-status feature-none">✗</span> None' : 'N/A';
        } else if (feature.key === 'zeroTrust') {
          cell.innerHTML = vendor === 'portnox' ? '<span class="feature-status feature-full">✓</span> Full' : 
                           vendor === 'cisco' ? '<span class="feature-status feature-partial">⚠</span> Partial' : 
                           vendor === 'aruba' ? '<span class="feature-status feature-partial">⚠</span> Partial' : 
                           vendor === 'forescout' ? '<span class="feature-status feature-partial">⚠</span> Partial' : 
                           vendor === 'fortinac' ? '<span class="feature-status feature-partial">⚠</span> Partial' : 
                           vendor === 'noNac' ? '<span class="feature-status feature-none">✗</span> None' : 'N/A';
        } else if (feature.key === 'mfa') {
          cell.innerHTML = vendor === 'portnox' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'cisco' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'aruba' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'forescout' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'fortinac' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'noNac' ? '<span class="feature-status feature-none">✗</span> No' : 'N/A';
        } else if (feature.key === 'scalability') {
          cell.innerHTML = vendor === 'portnox' ? '<span class="feature-status feature-full">✓</span> Simple' : 
                           vendor === 'cisco' ? '<span class="feature-status feature-partial">⚠</span> Complex' : 
                           vendor === 'aruba' ? '<span class="feature-status feature-partial">⚠</span> Complex' : 
                           vendor === 'forescout' ? '<span class="feature-status feature-partial">⚠</span> Complex' : 
                           vendor === 'fortinac' ? '<span class="feature-status feature-partial">⚠</span> Moderate' : 
                           vendor === 'noNac' ? '<span class="feature-status feature-none">✗</span> None' : 'N/A';
        } else if (feature.key === 'byod') {
          cell.innerHTML = vendor === 'portnox' ? '<span class="feature-status feature-full">✓</span> Advanced' : 
                           vendor === 'cisco' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'aruba' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'forescout' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'fortinac' ? '<span class="feature-status feature-full">✓</span> Yes' : 
                           vendor === 'noNac' ? '<span class="feature-status feature-none">✗</span> No' : 'N/A';
        } else if (feature.key === 'guest') {
          cell.innerHTML = vendor === 'portnox' ? '<span class="feature-status feature-full">✓</span> Advanced' : 
                           vendor === 'cisco' ? '<span class="feature-status feature-full">✓</span> Advanced' : 
                           vendor === 'aruba' ? '<span class="feature-status feature-full">✓</span> Advanced' : 
                           vendor === 'forescout' ? '<span class="feature-status feature-partial">⚠</span> Basic' : 
                           vendor === 'fortinac' ? '<span class="feature-status feature-partial">⚠</span> Basic' : 
                           vendor === 'noNac' ? '<span class="feature-status feature-none">✗</span> No' : 'N/A';
        } else if (feature.key === 'remote') {
          cell.innerHTML = vendor === 'portnox' ? '<span class="feature-status feature-full">✓</span> Full' : 
                           vendor === 'cisco' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'aruba' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'forescout' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'fortinac' ? '<span class="feature-status feature-partial">⚠</span> Limited' : 
                           vendor === 'noNac' ? '<span class="feature-status feature-none">✗</span> None' : 'N/A';
        }
        
        row.appendChild(cell);
      });
      
      featureTableBody.appendChild(row);
    });
  }
  
  // Update summary metrics
  updateSummaryMetrics(data);
}

// Update summary metrics
function updateSummaryMetrics(data) {
  // Get total costs for each vendor
  const totalCosts = {};
  
  UIState.selectedVendors.forEach(vendor => {
    let total = 0;
    
    // Yearly costs
    if (data.yearlyData[vendor]) {
      data.yearlyData[vendor].forEach(cost => {
        total += cost;
      });
    }
    
    totalCosts[vendor] = total;
  });
  
  // Find baseline (usually Cisco)
  let baseline = 'cisco';
  if (!UIState.selectedVendors.includes('cisco')) {
    // Find most expensive alternative
    let maxCost = 0;
    UIState.selectedVendors.forEach(vendor => {
      if (totalCosts[vendor] > maxCost) {
        maxCost = totalCosts[vendor];
        baseline = vendor;
      }
    });
  }
  
  // Get Portnox savings if selected
  if (UIState.selectedVendors.includes('portnox') && UIState.selectedVendors.includes(baseline)) {
    const savings = totalCosts[baseline] - totalCosts['portnox'];
    const savingsPercentage = (savings / totalCosts[baseline]) * 100;
    
    const savingsValue = document.getElementById('total-savings');
    if (savingsValue) {
      savingsValue.textContent = `${formatNumber(savings)}`;
    }
    
    const savingsPercent = document.getElementById('savings-percentage');
    if (savingsPercent) {
      savingsPercent.textContent = `${Math.round(savingsPercentage)}% lower TCO vs. ${getVendorDisplayName(baseline)}`;
    }
  }
  
  // Set implementation time
  const implTime = document.getElementById('implementation-time');
  if (implTime && data.vendorImplementationTime) {
    const portnoxTime = data.vendorImplementationTime['portnox'] || 45;
    const baselineTime = data.vendorImplementationTime[baseline] || 180;
    const timeSavings = baselineTime - portnoxTime;
    
    implTime.textContent = `${portnoxTime} days`;
    
    const implDetail = implTime.nextElementSibling;
    if (implDetail) {
      implDetail.textContent = `${timeSavings} days faster than ${getVendorDisplayName(baseline)}`;
    }
  }
  
  // Set risk reduction
  const riskReduction = document.getElementById('risk-reduction');
  if (riskReduction && data.vendorRiskScores) {
    const portnoxRisk = data.vendorRiskScores['portnox'] ? 
      Object.values(data.vendorRiskScores['portnox']).reduce((a, b) => a + b, 0) / 5 : 20;
    
    const baselineRisk = data.vendorRiskScores[baseline] ?
      Object.values(data.vendorRiskScores[baseline]).reduce((a, b) => a + b, 0) / 5 : 60;
    
    const reduction = Math.round(((baselineRisk - portnoxRisk) / baselineRisk) * 100);
    
    riskReduction.textContent = `${reduction}%`;
  }
  
  // Set breakeven point
  const breakeven = document.getElementById('breakeven-point');
  if (breakeven && UIState.selectedVendors.includes('portnox')) {
    breakeven.textContent = '10 months';
  }
  
  // Update key insights
  updateKeyInsights(data);
}

// Update key insights
function updateKeyInsights(data) {
  const insightsList = document.getElementById('key-insights-list');
  if (!insightsList) return;
  
  insightsList.innerHTML = '';
  
  // Generate insights based on data
  const insights = [];
  
  // TCO Insight
  if (UIState.selectedVendors.includes('portnox') && UIState.selectedVendors.includes('cisco')) {
    insights.push({
      icon: 'piggy-bank',
      title: 'Total Cost of Ownership',
      content: `Portnox Cloud offers up to 53% lower TCO than Cisco ISE over 3 years, driven primarily by reduced hardware costs and lower FTE requirements.`
    });
  }
  
  // Implementation Insight
  if (UIState.selectedVendors.includes('portnox')) {
    insights.push({
      icon: 'clock',
      title: 'Rapid Implementation',
      content: `Portnox Cloud can be implemented in 45 days or less, compared to 180+ days for on-premises solutions, accelerating time-to-value by up to 75%.`
    });
  }
  
  // Cloud Architecture Insight
  if (UIState.selectedVendors.includes('portnox')) {
    insights.push({
      icon: 'cloud',
      title: 'Cloud-Native Advantage',
      content: `Portnox's cloud-native architecture eliminates hardware costs and ongoing maintenance expenses while providing automatic updates and elastic scalability.`
    });
  }
  
  // Personnel Insight
  if (UIState.selectedVendors.includes('portnox') && UIState.selectedVendors.some(v => v !== 'portnox' && v !== 'noNac')) {
    insights.push({
      icon: 'users',
      title: 'Reduced FTE Requirements',
      content: `Portnox requires only 0.15 FTE for ongoing management, compared to 0.4-0.5 FTE for on-premises NAC solutions, freeing up IT resources for strategic initiatives.`
    });
  }
  
  // Compliance Insight
  if (UIState.selectedVendors.includes('portnox')) {
    insights.push({
      icon: 'shield-alt',
      title: 'Comprehensive Compliance',
      content: `Portnox provides up to 95% coverage of major compliance frameworks including PCI DSS, NIST, HIPAA, and ISO 27001, reducing audit complexity and risk.`
    });
  }
  
  // Scalability Insight
  if (UIState.selectedVendors.includes('portnox')) {
    insights.push({
      icon: 'expand-arrows-alt',
      title: 'Elastic Scalability',
      content: `Portnox Cloud scales elastically without additional hardware or complex capacity planning, supporting growth from hundreds to millions of devices.`
    });
  }
  
  // Zero Trust Insight
  if (UIState.selectedVendors.includes('portnox')) {
    insights.push({
      icon: 'lock',
      title: 'Zero Trust Leadership',
      content: `Portnox provides comprehensive Zero Trust NAC with continuous device authentication and authorization, compared to partial or limited support from legacy vendors.`
    });
  }
  
  // Risk Reduction Insight
  if (UIState.selectedVendors.includes('portnox') && UIState.selectedVendors.includes('noNac')) {
    insights.push({
      icon: 'chart-line',
      title: 'Risk Reduction',
      content: `Implementing Portnox Cloud reduces the risk of a data breach by up to 75% compared to having no NAC solution, potentially avoiding millions in breach costs.`
    });
  }
  
  // Add insights to the list
  insights.slice(0, 5).forEach(insight => {
    const insightItem = document.createElement('div');
    insightItem.className = 'insight-item';
    insightItem.innerHTML = `
      <div class="insight-icon">
        <i class="fas fa-${insight.icon}"></i>
      </div>
      <div class="insight-content">
        <h4 class="insight-title">${insight.title}</h4>
        <p class="insight-text">${insight.content}</p>
      </div>
    `;
    
    insightsList.appendChild(insightItem);
  });
}

// Utility functions
function formatNumber(num) {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getVendorColor(vendorId) {
  const vendorColors = {
    'portnox': '#10b981',
    'cisco': '#3b82f6',
    'aruba': '#f59e0b',
    'forescout': '#f97316',
    'fortinac': '#8b5cf6',
    'noNac': '#ef4444'
  };
  
  return vendorColors[vendorId] || '#9ca3af';
}

function getVendorDisplayName(vendorId) {
  const vendorNames = {
    'portnox': 'Portnox Cloud',
    'cisco': 'Cisco ISE',
    'aruba': 'Aruba ClearPass',
    'forescout': 'Forescout',
    'fortinac': 'FortiNAC',
    'noNac': 'No NAC Solution'
  };
  
  return vendorNames[vendorId] || vendorId;
}

// Initialize the UI when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeUI();
});
EOF

# Create new HTML structure to replace wizard with sidebar layout
echo "Creating new HTML structure..."
cat > index.html.new << 'EOF'
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
    <link rel="stylesheet" href="libs/css/animate.min.css">
    <link rel="stylesheet" href="libs/css/aos.css">
    
    <!-- Core CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/modern-layout.css">
    <link rel="stylesheet" href="css/dark-mode.css">
    <link rel="stylesheet" href="css/chart-styles.css">
    
    <link rel="icon" type="image/png" href="img/favicon.svg">
</head>
<body>
    <!-- Loading Overlay -->
    <div id="loading-overlay" class="loading-overlay" style="display: none;">
        <div class="spinner"></div>
        <p class="loading-text">Calculating...</p>
    </div>
    
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
                    <button id="export-pdf" class="btn btn-outline btn-icon" title="Export PDF">
                        <i class="fas fa-file-pdf"></i>
                        <span>Export</span>
                    </button>
                    <button id="help-btn" class="btn btn-outline btn-icon" title="Help">
                        <i class="fas fa-question-circle"></i>
                        <span>Help</span>
                    </button>
                    <button id="dark-mode-toggle" class="btn btn-outline btn-icon" title="Toggle Dark Mode">
                        <i id="dark-mode-icon" class="fas fa-moon"></i>
                    </button>
                    <button id="profile-btn" class="btn btn-outline btn-icon" title="User Profile">
                        <i class="fas fa-user"></i>
                    </button>
                </div>
            </div>
        </header>
        
        <!-- Main Content Area -->
        <div class="app-main">
            <!-- Configuration Sidebar -->
            <aside class="sidebar">
                <div class="sidebar-header">
                    <h2>Configuration</h2>
                    <button id="sidebar-toggle" class="sidebar-toggle" title="Toggle Sidebar">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                </div>
                
                <!-- Vendor Selection -->
                <div class="sidebar-section">
                    <div class="sidebar-section-icon">
                        <i class="fas fa-server"></i>
                    </div>
                    <h3>Vendor Selection</h3>
                    <p class="config-description">Select vendors to compare with Portnox Cloud</p>
                    
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
                        
                        <div class="vendor-card selected" data-vendor="cisco">
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
                                <p>Policy management</p>
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
                        
                        <div class="vendor-card" data-vendor="noNac">
                            <div class="vendor-logo">
                                <i class="fas fa-shield-virus vendor-icon"></i>
                            </div>
                            <div class="vendor-info">
                                <h3>No NAC</h3>
                                <p>Unprotected</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Industry & Compliance -->
                <div class="sidebar-section">
                    <div class="sidebar-section-icon">
                        <i class="fas fa-building"></i>
                    </div>
                    <h3>Industry & Compliance</h3>
                    <p class="config-description">Select your industry and compliance requirements</p>
                    
                    <div class="form-group">
                        <label for="industry-select" class="form-label">Industry</label>
                        <select id="industry-select" class="form-select">
                            <option value="financial">Financial Services</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="education">Education</option>
                            <option value="government">Government</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="retail">Retail</option>
                            <option value="technology">Technology</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Compliance Frameworks</label>
                        <div id="compliance-options" class="compliance-options">
                            <!-- Populated dynamically based on industry -->
                        </div>
                    </div>
                    
                    <div id="industry-insights" class="industry-insights">
                        <!-- Populated dynamically based on industry -->
                    </div>
                </div>
                
                <!-- Organization Configuration -->
                <div class="sidebar-section">
                    <div class="sidebar-section-icon">
                        <i class="fas fa-sitemap"></i>
                    </div>
                    <h3>Organization Configuration</h3>
                    <p class="config-description">Set parameters based on your organization's needs</p>
                    
                    <div class="form-group">
                        <label for="organization-size" class="form-label">Organization Size</label>
                        <select id="organization-size" class="form-select">
                            <option value="small">Small (< 1,000 devices)</option>
                            <option value="medium" selected>Medium (1,000-5,000 devices)</option>
                            <option value="large">Large (5,000-10,000 devices)</option>
                            <option value="enterprise">Enterprise (10,000+ devices)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="device-count" class="form-label">Number of Devices</label>
                        <input type="number" id="device-count" class="form-input" value="2500" min="100" max="100000">
                    </div>
                    
                    <div class="form-group">
                        <label for="locations" class="form-label">Number of Locations</label>
                        <input type="number" id="locations" class="form-input" value="5" min="1" max="1000">
                    </div>
                    
                    <div class="form-group">
                        <label for="years-to-project" class="form-label">Analysis Period</label>
                        <select id="years-to-project" class="form-select">
                            <option value="1">1 Year</option>
                            <option value="3" selected>3 Years</option>
                            <option value="5">5 Years</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Required Features</label>
                        <div class="form-check">
                            <input type="checkbox" id="cloud-integration" class="form-check-input">
                            <label for="cloud-integration" class="form-check-label">Cloud Integration</label>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" id="legacy-devices" class="form-check-input">
                            <label for="legacy-devices" class="form-check-label">Legacy Device Support</label>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" id="byod-support" class="form-check-input" checked>
                            <label for="byod-support" class="form-check-label">BYOD Support</label>
                        </div>
                    </div>
                </div>
                
                <!-- Cost Parameters -->
                <div class="sidebar-section">
                    <div class="sidebar-section-icon">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <h3>Cost Parameters</h3>
                    <p class="config-description">Customize cost parameters for your analysis</p>
                    
                    <div class="form-group">
                        <label for="fte-cost" class="form-label">Average FTE Cost ($/year)</label>
                        <input type="number" id="fte-cost" class="form-input" value="120000" min="50000" max="300000" step="5000">
                    </div>
                    
                    <div class="form-group">
                        <label for="maintenance-percentage" class="form-label">Annual Maintenance (%)</label>
                        <input type="number" id="maintenance-percentage" class="form-input" value="18" min="5" max="30" step="1">
                    </div>
                    
                    <div class="form-group">
                        <p class="estimated-range">
                            <strong>Estimated TCO Range:</strong>
                            <span id="estimated-tco-range">Loading...</span>
                        </p>
                    </div>
                </div>
                
                <!-- Calculate Button -->
                <div class="sidebar-section">
                    <button id="calculate-btn" class="btn btn-primary" style="width: 100%;">
                        <i class="fas fa-calculator"></i> Calculate TCO
                    </button>
                </div>
            </aside>
            
            <!-- Main Content Area -->
            <div class="content-area">
                <!-- Tabs for Different Views -->
                <div class="view-tabs">
                    <button class="view-tab active" data-tab="executive">
                        <i class="fas fa-chart-pie tab-icon"></i> Executive Summary
                    </button>
                    <button class="view-tab" data-tab="technical">
                        <i class="fas fa-cogs tab-icon"></i> Technical Analysis
                    </button>
                    <button class="view-tab" data-tab="financial">
                        <i class="fas fa-dollar-sign tab-icon"></i> Financial Analysis
                    </button>
                    <button class="view-tab" data-tab="security">
                        <i class="fas fa-shield-alt tab-icon"></i> Security & Compliance
                    </button>
                </div>
                
                <!-- Tab Content -->
                
                <!-- Executive Summary Tab -->
                <div id="executive-content" class="tab-content active">
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Executive Summary</h2>
                        </div>
                        
                        <!-- Key Metrics -->
                        <div class="metrics-grid">
                            <div class="metric-card highlight">
                                <h3 class="metric-title">Total Savings</h3>
                                <div class="metric-value" id="total-savings">$0</div>
                                <div class="metric-subtitle" id="savings-percentage">0%</div>
                            </div>
                            
                            <div class="metric-card">
                                <h3 class="metric-title">Break-even Point</h3>
                                <div class="metric-value" id="breakeven-point">0 months</div>
                                <div class="metric-subtitle">Time to positive ROI</div>
                            </div>
                            
                            <div class="metric-card">
                                <h3 class="metric-title">Risk Reduction</h3>
                                <div class="metric-value" id="risk-reduction">0%</div>
                                <div class="metric-subtitle">Security improvement</div>
                            </div>
                            
                            <div class="metric-card">
                                <h3 class="metric-title">Implementation Time</h3>
                                <div class="metric-value" id="implementation-time">0 days</div>
                                <div class="metric-subtitle">vs. current solution</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Key Insights -->
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Key Insights</h2>
                        </div>
                        
                        <div id="key-insights-list" class="key-insights-list">
                            <!-- Populated dynamically -->
                        </div>
                    </div>
                    
                    <!-- 3-Year TCO Comparison -->
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">3-Year TCO Comparison</h2>
                        </div>
                        
                        <div class="chart-container" data-title="3-Year TCO Comparison" id="tco-comparison-chart">
                            <!-- Chart will be rendered here -->
                        </div>
                    </div>
                    
                    <!-- ROI Analysis -->
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">ROI Analysis</h2>
                        </div>
                        
                        <div class="chart-container" data-title="Cumulative ROI Over Time" id="roi-chart">
                            <!-- Chart will be rendered here -->
                        </div>
                    </div>
                    
                    <!-- Implementation Timeline -->
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Implementation Timeline Comparison</h2>
                        </div>
                        
                        <div class="chart-container" data-title="Implementation Timeline (Days)" id="implementation-chart">
                            <!-- Chart will be rendered here -->
                        </div>
                    </div>
                </div>
                
                <!-- Technical Analysis Tab -->
                <div id="technical-content" class="tab-content">
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Feature Comparison</h2>
                        </div>
                        
                        <div class="chart-container" data-title="Feature Capability Comparison" id="feature-radar-chart">
                            <!-- Chart will be rendered here -->
                        </div>
                        
                        <div class="table-container">
                            <h3 class="table-title">Detailed Feature Matrix</h3>
                            <table id="feature-comparison-table" class="comparison-table">
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <!-- Vendor columns will be added dynamically -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Table rows will be populated dynamically -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Technical Requirements</h2>
                        </div>
                        
                        <div class="grid-2">
                            <div class="requirement-card">
                                <h3 class="requirement-title">Hardware Requirements</h3>
                                <div class="requirement-comparison">
                                    <div class="vendor-requirement">
                                        <h4>Portnox Cloud</h4>
                                        <ul class="requirement-list">
                                            <li><i class="fas fa-check-circle"></i> No dedicated hardware required</li>
                                            <li><i class="fas fa-check-circle"></i> No appliances to install/maintain</li>
                                            <li><i class="fas fa-check-circle"></i> No need for high-availability pairs</li>
                                            <li><i class="fas fa-check-circle"></i> No hardware upgrades needed</li>
                                        </ul>
                                    </div>
                                    <div class="vendor-requirement">
                                        <h4>On-Premises Solutions</h4>
                                        <ul class="requirement-list">
                                            <li><i class="fas fa-times-circle"></i> Multiple servers/appliances required</li>
                                            <li><i class="fas fa-times-circle"></i> High-availability pairs needed</li>
                                            <li><i class="fas fa-times-circle"></i> Database servers often required</li>
                                            <li><i class="fas fa-times-circle"></i> Hardware refresh every 3-5 years</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="requirement-card">
                                <h3 class="requirement-title">Infrastructure Integration</h3>
                                <div class="requirement-comparison">
                                    <div class="vendor-requirement">
                                        <h4>Portnox Cloud</h4>
                                        <ul class="requirement-list">
                                            <li><i class="fas fa-check-circle"></i> Cloud-to-cloud integrations</li>
                                            <li><i class="fas fa-check-circle"></i> Modern REST APIs</li>
                                            <li><i class="fas fa-check-circle"></i> Lightweight local RADIUS server</li>
                                            <li><i class="fas fa-check-circle"></i> No complex network changes</li>
                                        </ul>
                                    </div>
                                    <div class="vendor-requirement">
                                        <h4>On-Premises Solutions</h4>
                                        <ul class="requirement-list">
                                            <li><i class="fas fa-times-circle"></i> Complex network integration</li>
                                            <li><i class="fas fa-times-circle"></i> Multiple integration points</li>
                                            <li><i class="fas fa-times-circle"></i> SPAN/TAP ports often required</li>
                                            <li><i class="fas fa-times-circle"></i> Network redesign may be needed</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Implementation & Complexity</h2>
                        </div>
                        
                        <div class="chart-container" data-title="Implementation Complexity Comparison" id="implementation-comparison-chart">
                            <!-- Chart will be rendered here -->
                        </div>
                    </div>
                </div>
                
                <!-- Financial Analysis Tab -->
                <div id="financial-content" class="tab-content">
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Detailed Cost Analysis</h2>
                        </div>
                        
                        <div class="table-container">
                            <h3 class="table-title">Total Cost of Ownership Breakdown</h3>
                            <table id="tco-comparison-table" class="comparison-table">
                                <thead>
                                    <tr>
                                        <th>Cost Component</th>
                                        <!-- Vendor columns will be added dynamically -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Table rows will be populated dynamically -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Cost Structure Comparison</h2>
                        </div>
                        
                        <div class="grid-2">
                            <div class="chart-container" data-title="Portnox Cost Breakdown" id="portnox-breakdown-chart">
                                <!-- Chart will be rendered here -->
                            </div>
                            <div class="chart-container" data-title="On-Premises Cost Breakdown" id="onprem-breakdown-chart">
                                <!-- Chart will be rendered here -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Cumulative Cost Over Time</h2>
                        </div>
                        
                        <div class="chart-container" data-title="Cumulative Cost Over Time" id="cumulative-cost-chart">
                            <!-- Chart will be rendered here -->
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Sensitivity Analysis</h2>
                        </div>
                        
                        <div class="sensitivity-controls">
                            <div class="grid-3">
                                <div class="sensitivity-control">
                                    <label for="sensitivity-variable" class="form-label">Variable to Analyze</label>
                                    <select id="sensitivity-variable" class="form-select">
                                        <option value="deviceCount">Device Count</option>
                                        <option value="fteCost">FTE Cost</option>
                                        <option value="maintenancePercentage">Maintenance %</option>
                                        <option value="years">Analysis Period</option>
                                    </select>
                                </div>
                                
                                <div class="sensitivity-control">
                                    <label for="sensitivity-min" class="form-label">Minimum Value</label>
                                    <input type="number" id="sensitivity-min" class="form-input" value="500">
                                </div>
                                
                                <div class="sensitivity-control">
                                    <label for="sensitivity-max" class="form-label">Maximum Value</label>
                                    <input type="number" id="sensitivity-max" class="form-input" value="10000">
                                </div>
                            </div>
                            
                            <button id="run-sensitivity" class="btn btn-primary">
                                Run Sensitivity Analysis
                            </button>
                        </div>
                        
                        <div class="chart-container" data-title="Sensitivity Analysis" id="sensitivity-chart">
                            <!-- Chart will be rendered here -->
                        </div>
                    </div>
                </div>
                
                <!-- Security & Compliance Tab -->
                <div id="security-content" class="tab-content">
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Security Risk Analysis</h2>
                        </div>
                        
                        <div class="chart-container" data-title="Security Risk Assessment" id="security-risk-chart">
                            <!-- Chart will be rendered here -->
                        </div>
                        
                        <div class="table-container">
                            <h3 class="table-title">Security Risk Assessment</h3>
                            <table id="security-risk-table" class="comparison-table">
                                <thead>
                                    <tr>
                                        <th>Risk Factor</th>
                                        <!-- Vendor columns will be added dynamically -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Unauthorized Access</td>
                                        <!-- Vendor risk assessments will be added dynamically -->
                                    </tr>
                                    <tr>
                                        <td>Compliance Violations</td>
                                        <!-- Vendor risk assessments will be added dynamically -->
                                    </tr>
                                    <tr>
                                        <td>Network Visibility</td>
                                        <!-- Vendor risk assessments will be added dynamically -->
                                    </tr>
                                    <tr>
                                        <td>Insider Threats</td>
                                        <!-- Vendor risk assessments will be added dynamically -->
                                    </tr>
                                    <tr>
                                        <td>Configuration Errors</td>
                                        <!-- Vendor risk assessments will be added dynamically -->
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Compliance Framework Coverage</h2>
                        </div>
                        
                        <div class="chart-container" data-title="Compliance Framework Coverage" id="compliance-coverage-chart">
                            <!-- Chart will be rendered here -->
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Security Capability Comparison</h2>
                        </div>
                        
                        <div class="grid-2">
                            <div class="security-capability-card">
                                <h3 class="security-capability-title">Zero Trust Implementation</h3>
                                <table class="comparison-table">
                                    <thead>
                                        <tr>
                                            <th>Capability</th>
                                            <th>Portnox Cloud</th>
                                            <th>Legacy NAC</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Continuous Authentication</td>
                                            <td><span class="feature-status feature-full">✓</span></td>
                                            <td><span class="feature-status feature-partial">⚠</span></td>
                                        </tr>
                                        <tr>
                                            <td>Device Risk Assessment</td>
                                            <td><span class="feature-status feature-full">✓</span></td>
                                            <td><span class="feature-status feature-partial">⚠</span></td>
                                        </tr>
                                        <tr>
                                            <td>Cloud-Based Policy</td>
                                            <td><span class="feature-status feature-full">✓</span></td>
                                            <td><span class="feature-status feature-none">✗</span></td>
                                        </tr>
                                        <tr>
                                            <td>Identity-Based Access</td>
                                            <td><span class="feature-status feature-full">✓</span></td>
                                            <td><span class="feature-status feature-full">✓</span></td>
                                        </tr>
                                        <tr>
                                            <td>Remote Device Enforcement</td>
                                            <td><span class="feature-status feature-full">✓</span></td>
                                            <td><span class="feature-status feature-partial">⚠</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="security-capability-card">
                                <h3 class="security-capability-title">Breach Prevention Capabilities</h3>
                                <table class="comparison-table">
                                    <thead>
                                        <tr>
                                            <th>Capability</th>
                                            <th>Portnox Cloud</th>
                                            <th>Legacy NAC</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Rogue Device Detection</td>
                                            <td><span class="feature-status feature-full">✓</span></td>
                                            <td><span class="feature-status feature-full">✓</span></td>
                                        </tr>
                                        <tr>
                                            <td>Posture Assessment</td>
                                            <td><span class="feature-status feature-full">✓</span></td>
                                            <td><span class="feature-status feature-full">✓</span></td>
                                        </tr>
                                        <tr>
                                            <td>Automated Remediation</td>
                                            <td><span class="feature-status feature-full">✓</span></td>
                                            <td><span class="feature-status feature-partial">⚠</span></td>
                                        </tr>
                                        <tr>
                                            <td>Real-time Threat Intelligence</td>
                                            <td><span class="feature-status feature-full">✓</span></td>
                                            <td><span class="feature-status feature-partial">⚠</span></td>
                                        </tr>
                                        <tr>
                                            <td>Off-Network Protection</td>
                                            <td><span class="feature-status feature-full">✓</span></td>
                                            <td><span class="feature-status feature-none">✗</span></td>
                                        </tr>
                                    </tbody>
                                </table>
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
                <h3>Getting Started</h3>
                <p>The Zero Trust Total Cost Analyzer helps you compare the total cost of ownership (TCO) of Portnox Cloud with other NAC solutions.</p>
                
                <h3>How to Use</h3>
                <ol>
                    <li>Configure your analysis parameters in the sidebar</li>
                    <li>Select vendors to compare with Portnox Cloud</li>
                    <li>Click "Calculate TCO" to generate the comparison</li>
                    <li>View different perspectives using the tabs above</li>
                </ol>
                
                <h3>Understanding the Results</h3>
                <p>The TCO analysis includes all direct and indirect costs associated with each solution over the selected time period, including:</p>
                <ul>
                    <li>Hardware and software costs</li>
                    <li>Implementation and professional services</li>
                    <li>Ongoing maintenance and support</li>
                    <li>Personnel costs (FTE requirements)</li>
                    <li>Risk-adjusted costs</li>
                </ul>
            </div>
        </div>
    </div>
    
    <!-- Toast Notifications Container -->
    <div id="toast-container" class="toast-container"></div>
    
    <!-- JavaScript Libraries -->
    <script src="libs/js/chart.min.js"></script>
    <script src="libs/js/chartjs-plugin-datalabels.min.js"></script>
    <script src="libs/js/d3.min.js"></script>
    <script src="libs/js/countUp.min.js"></script>
    <script src="libs/js/jspdf.umd.min.js"></script>
    <script src="libs/js/jspdf.plugin.autotable.min.js"></script>
    
    <!-- Core JavaScript -->
    <script src="js/core/helpers.js"></script>
    <script src="js/core/dom.js"></script>
    <script src="js/core/validation.js"></script>
    
    <!-- Modern UI JavaScript -->
    <script src="js/modern-ui.js"></script>
    
    <!-- Additional JavaScript -->
    <script src="js/reports/generator.js"></script>
    <script src="js/components/charts/chart-manager.js"></script>
</body>
</html>
EOF

# Update HTML file
echo "Replacing index.html with new structure..."
mv index.html.new index.html

# Update main.js to incorporate the new UI layout
echo "Creating update script for JavaScript files..."
cat > update_js.js << 'EOF'
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
EOF

echo "Creating main.js update script..."
cp js/main.js js/main.js.bak
cat >> js/main.js << 'EOF'

// Initialize modern UI
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing modern UI...');
  // This function is defined in modern-ui.js
  if (typeof initializeUI === 'function') {
    initializeUI();
  } else {
    console.error('Modern UI initialization function not found');
  }
});
EOF

# Create an HTML hotfix script to force the modern layout
cat > js/fixes/layout-fix.js << 'EOF'
/**
 * Portnox TCO Analyzer - Layout Hotfix
 * This script forces the modern layout by removing the wizard elements
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying layout hotfix...');
  
  // Check if wizard is present
  const wizardContainer = document.querySelector('.wizard-container');
  if (wizardContainer) {
    console.log('Wizard found, hiding and forcing modern layout');
    
    // Hide wizard
    wizardContainer.style.display = 'none';
    
    // Show modern layout if available
    const appMain = document.querySelector('.app-main');
    if (appMain) {
      appMain.style.display = 'flex';
    }
    
    // Show content area if available
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      contentArea.classList.remove('hidden');
    }
  }
});
EOF

# Create the install script
echo "Creating install script..."
cat > install_ui_overhaul.sh << 'EOF'
#!/bin/bash
# Update script for Portnox TCO Analyzer UI

# Function to check if command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check for required tools
if ! command_exists git; then
  echo "Error: git is required but not installed. Please install git and try again."
  exit 1
fi

# Create backup
echo "Creating backup..."
timestamp=$(date +"%Y%m%d%H%M%S")
backup_dir="backup_${timestamp}"
mkdir -p "$backup_dir"
cp -r css js index.html "$backup_dir/"
echo "Backup created in $backup_dir"

# Update files
echo "Updating CSS files..."
cp css/modern-layout.css css/
cp css/dark-mode.css css/

echo "Updating JS files..."
cp js/modern-ui.js js/
cp js/fixes/layout-fix.js js/fixes/

echo "Updating index.html..."
cp index.html index.html

# Commit changes if in a git repository
if [ -d .git ]; then
  echo "Git repository detected. Creating commit..."
  git add css/modern-layout.css css/dark-mode.css js/modern-ui.js js/fixes/layout-fix.js index.html
  git commit -m "Implement modern UI layout and remove wizard approach"
  echo "Changes committed to git"
fi

echo "Installation complete!"
echo "Please note: You may need to clear your browser cache to see the changes."
EOF

chmod +x install_ui_overhaul.sh

echo "Script completed! Run ./install_ui_overhaul.sh to apply changes."
