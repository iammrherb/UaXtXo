#!/bin/bash

# UI Update Script for Portnox Total Cost Analyzer
# This script updates the UI elements including the collapsible sidebar

set -e  # Exit on any error

# Color definitions
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================${NC}"
echo -e "${BLUE}   Updating UI for TCO Multi-Vendor Analyzer   ${NC}"
echo -e "${BLUE}=================================================${NC}"

# Create necessary directories
mkdir -p css/components
mkdir -p js/components/ui

# Create new CSS for the collapsible sidebar
echo -e "${YELLOW}Creating collapsible sidebar CSS...${NC}"
cat > "css/components/sidebar.css" << 'EOL'
/* Collapsible Sidebar Styles */
.tco-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background-color: #f8f9fa;
  border-right: 1px solid #e9ecef;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  transform: translateX(-100%);
}

.tco-sidebar.expanded {
  transform: translateX(0);
}

.tco-sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
  background-color: #0078d4;
  color: white;
}

.tco-sidebar-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.tco-sidebar-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}

.tco-sidebar-content {
  padding: 15px;
}

.tco-sidebar-section {
  margin-bottom: 20px;
}

.tco-sidebar-section-title {
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
  font-size: 1rem;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 5px;
}

.tco-sidebar-item {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  color: #495057;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
  cursor: pointer;
}

.tco-sidebar-item:hover {
  background-color: #e9ecef;
}

.tco-sidebar-item.active {
  background-color: #0078d4;
  color: white;
}

.tco-sidebar-item i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

.tco-sidebar-toggle {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: #0078d4;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  width: 30px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.tco-sidebar-toggle i {
  transition: transform 0.3s;
}

.tco-sidebar.expanded + .tco-sidebar-toggle i {
  transform: rotate(180deg);
}

/* Main content shift when sidebar is expanded */
.app-container {
  transition: margin-left 0.3s ease;
}

.app-container.sidebar-expanded {
  margin-left: 280px;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .tco-sidebar {
    width: 100%;
  }
  
  .app-container.sidebar-expanded {
    margin-left: 0;
  }
}

/* Dark mode adjustments */
body.dark-mode .tco-sidebar {
  background-color: #2d3748;
  border-color: #4a5568;
}

body.dark-mode .tco-sidebar-header {
  background-color: #1a202c;
  border-color: #4a5568;
}

body.dark-mode .tco-sidebar-section-title {
  color: #e2e8f0;
  border-color: #4a5568;
}

body.dark-mode .tco-sidebar-item {
  color: #e2e8f0;
}

body.dark-mode .tco-sidebar-item:hover {
  background-color: #4a5568;
}

body.dark-mode .tco-sidebar-item.active {
  background-color: #0078d4;
}
EOL

# Create CSS for enhanced multi-vendor grid
echo -e "${YELLOW}Creating multi-vendor grid CSS...${NC}"
cat > "css/components/vendor-grid.css" << 'EOL'
/* Enhanced Multi-Vendor Grid */
.vendor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px;
  margin: 20px 0;
}

.vendor-card {
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.vendor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.vendor-card.selected {
  border-color: #0078d4;
  background-color: rgba(0, 120, 212, 0.05);
}

.vendor-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  margin-bottom: 15px;
}

.vendor-logo img {
  max-height: 100%;
  max-width: 80%;
  object-fit: contain;
}

.vendor-info {
  flex-grow: 1;
}

.vendor-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  color: #333;
}

.vendor-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.vendor-badge {
  position: absolute;
  top: 10px;
  right: 10px;
}

.badge-market-leader,
.badge-warning,
.badge-recommended {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
}

.badge-market-leader {
  background-color: #ffda6a;
  color: #6d5200;
}

.badge-warning {
  background-color: #ff6b6b;
  color: #fff;
}

.badge-recommended {
  background-color: #4cd964;
  color: #fff;
}

.vendor-card.portnox {
  background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);
  border-width: 2px;
}

.vendor-card.portnox .vendor-badge {
  display: flex;
  flex-direction: column;
}

.vendor-metrics {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 0.8rem;
}

.vendor-metric {
  text-align: center;
  flex: 1;
}

.metric-value {
  font-weight: 600;
  color: #0078d4;
}

.metric-label {
  color: #666;
  font-size: 0.7rem;
}

/* Animations */
.animate-card {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s forwards;
}

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

.vendor-card:nth-child(1) { animation-delay: 0.1s; }
.vendor-card:nth-child(2) { animation-delay: 0.2s; }
.vendor-card:nth-child(3) { animation-delay: 0.3s; }
.vendor-card:nth-child(4) { animation-delay: 0.4s; }
.vendor-card:nth-child(5) { animation-delay: 0.5s; }
.vendor-card:nth-child(6) { animation-delay: 0.6s; }
.vendor-card:nth-child(7) { animation-delay: 0.7s; }
.vendor-card:nth-child(8) { animation-delay: 0.8s; }

/* Dark mode adjustments */
body.dark-mode .vendor-card {
  background-color: #2d3748;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

body.dark-mode .vendor-info h3 {
  color: #e2e8f0;
}

body.dark-mode .vendor-info p {
  color: #a0aec0;
}

body.dark-mode .vendor-card.portnox {
  background: linear-gradient(135deg, #2d3748 0%, #1a365d 100%);
}

body.dark-mode .vendor-card.selected {
  border-color: #63b3ed;
  background-color: rgba(99, 179, 237, 0.1);
}

body.dark-mode .metric-value {
  color: #63b3ed;
}

body.dark-mode .metric-label {
  color: #a0aec0;
}
EOL

# Create CSS for enhanced charts and results display
echo -e "${YELLOW}Creating enhanced charts and results CSS...${NC}"
cat > "css/components/enhanced-charts.css" << 'EOL'
/* Enhanced Charts and Results Styles */
.chart-container {
  position: relative;
  margin: 20px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.3s ease;
}

.chart-container:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.chart-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.chart-actions {
  display: flex;
  gap: 10px;
}

.chart-action-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.2s;
}

.chart-action-btn:hover {
  background-color: #f0f0f0;
  color: #333;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1.1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  margin: 20px 0;
}

.result-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.result-header {
  margin-bottom: 15px;
}

.result-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 5px 0;
}

.result-subtitle {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.result-metric {
  display: flex;
  align-items: center;
  gap: 10px;
}

.result-metric-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f7ff;
  color: #0078d4;
  border-radius: 50%;
  font-size: 1.2rem;
}

.result-metric-info {
  flex-grow: 1;
}

.result-metric-value {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.result-metric-label {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
}

.result-footer {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  text-align: right;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.9rem;
}

.data-table th,
.data-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.data-table tr:hover {
  background-color: #f5f5f5;
}

.data-table tr:last-child td {
  border-bottom: none;
}

/* Highlighting */
.highlight-positive {
  color: #2ecc71;
}

.highlight-negative {
  color: #e74c3c;
}

.highlight-warning {
  color: #f39c12;
}

.highlight-neutral {
  color: #3498db;
}

/* Tooltips */
.has-tooltip {
  position: relative;
  cursor: help;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}

.has-tooltip:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

/* Dark mode adjustments */
body.dark-mode .chart-container,
body.dark-mode .result-card {
  background-color: #2d3748;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

body.dark-mode .chart-title,
body.dark-mode .result-title,
body.dark-mode .result-metric-value {
  color: #e2e8f0;
}

body.dark-mode .chart-subtitle,
body.dark-mode .result-subtitle,
body.dark-mode .result-metric-label {
  color: #a0aec0;
}

body.dark-mode .chart-action-btn {
  color: #a0aec0;
}

body.dark-mode .chart-action-btn:hover {
  background-color: #4a5568;
  color: #e2e8f0;
}

body.dark-mode .chart-placeholder {
  background-color: #4a5568;
  color: #a0aec0;
}

body.dark-mode .result-metric-icon {
  background-color: #4a5568;
  color: #63b3ed;
}

body.dark-mode .data-table th {
  background-color: #4a5568;
  color: #e2e8f0;
}

body.dark-mode .data-table td,
body.dark-mode .data-table th {
  border-color: #4a5568;
}

body.dark-mode .data-table tr:hover {
  background-color: #4a5568;
}

body.dark-mode .result-footer {
  border-color: #4a5568;
}
EOL

# Create CSS for wizard enhancements
echo -e "${YELLOW}Creating wizard enhancements CSS...${NC}"
cat > "css/components/enhanced-wizard.css" << 'EOL'
/* Enhanced Wizard Styles */
.wizard-container {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  overflow: hidden;
}

.wizard-step {
  display: none;
  padding: 30px;
  transition: all 0.3s ease;
}

.wizard-step.active {
  display: block;
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.step-header {
  margin-bottom: 25px;
  position: relative;
}

.step-header h2 {
  margin: 0 0 10px 0;
  font-size: 1.8rem;
  color: #333;
  font-weight: 600;
}

.step-header p {
  margin: 0;
  color: #666;
  font-size: 1rem;
}

.wizard-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.wizard-navigation button {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.wizard-navigation button i {
  font-size: 0.9rem;
}

.btn-primary {
  background-color: #0078d4;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #0069b8;
}

.btn-outline {
  background-color: transparent;
  color: #555;
  border: 1px solid #ddd;
}

.btn-outline:hover {
  background-color: #f5f5f5;
}

.wizard-progress {
  position: relative;
  margin-bottom: 20px;
}

.progress-bar {
  height: 6px;
  background-color: #eee;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 15px;
}

.progress-fill {
  height: 100%;
  background-color: #0078d4;
  width: 0;
  transition: width 0.5s ease;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}

.step-indicator {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #eee;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
  transition: all 0.3s;
}

.step-label {
  font-size: 0.8rem;
  color: #666;
  text-align: center;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.progress-step.completed .step-indicator {
  background-color: #0078d4;
  color: white;
}

.progress-step.active .step-indicator {
  background-color: #0078d4;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 2px 5px rgba(0, 120, 212, 0.3);
}

.progress-step.completed .step-label,
.progress-step.active .step-label {
  color: #0078d4;
  font-weight: 500;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}

.form-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s;
}

.form-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.form-card h3 {
  margin: 0 0 15px 0;
  font-size: 1.2rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-card h3 i {
  color: #0078d4;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #555;
  font-weight: 500;
}

.form-input,
.form-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #333;
  transition: all 0.3s;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #0078d4;
  box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.2);
}

.input-helper {
  font-size: 0.8rem;
  color: #666;
  margin-top: 5px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #555;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #0078d4;
}

/* Dark mode adjustments */
body.dark-mode .wizard-container {
  background-color: #2d3748;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

body.dark-mode .step-header h2 {
  color: #e2e8f0;
}

body.dark-mode .step-header p {
  color: #a0aec0;
}

body.dark-mode .btn-outline {
  color: #e2e8f0;
  border-color: #4a5568;
}

body.dark-mode .btn-outline:hover {
  background-color: #4a5568;
}

body.dark-mode .progress-bar {
  background-color: #4a5568;
}

body.dark-mode .step-indicator {
  background-color: #4a5568;
  color: #e2e8f0;
}

body.dark-mode .step-label {
  color: #a0aec0;
}

body.dark-mode .progress-step.completed .step-label,
body.dark-mode .progress-step.active .step-label {
  color: #63b3ed;
}

body.dark-mode .form-card {
  background-color: #1a202c;
}

body.dark-mode .form-card h3 {
  color: #e2e8f0;
}

body.dark-mode .form-card h3 i {
  color: #63b3ed;
}

body.dark-mode .input-group label {
  color: #e2e8f0;
}

body.dark-mode .form-input,
body.dark-mode .form-select {
  background-color: #2d3748;
  border-color: #4a5568;
  color: #e2e8f0;
}

body.dark-mode .form-input:focus,
body.dark-mode .form-select:focus {
  border-color: #63b3ed;
  box-shadow: 0 0 0 3px rgba(99, 179, 237, 0.2);
}

body.dark-mode .input-helper {
  color: #a0aec0;
}

body.dark-mode .checkbox-label {
  color: #e2e8f0;
}
EOL

# Create JS for sidebar functionality
echo -e "${YELLOW}Creating sidebar JavaScript...${NC}"
cat > "js/components/ui/sidebar.js" << 'EOL'
/**
 * Sidebar Component for TCO Multi-Vendor Analyzer
 */
class TcoSidebar {
    constructor() {
        this.sidebar = null;
        this.toggleButton = null;
        this.appContainer = null;
        this.isExpanded = false;
        
        this.init();
    }
    
    init() {
        // Create sidebar HTML structure
        this.createSidebarHTML();
        
        // Initialize sidebar state
        this.isExpanded = localStorage.getItem('tco_sidebar_expanded') === 'true';
        
        // Get references to DOM elements
        this.sidebar = document.querySelector('.tco-sidebar');
        this.toggleButton = document.querySelector('.tco-sidebar-toggle');
        this.appContainer = document.querySelector('.app-container');
        
        // Set initial state
        if (this.isExpanded) {
            this.sidebar.classList.add('expanded');
            this.appContainer.classList.add('sidebar-expanded');
        }
        
        // Attach event listeners
        this.attachEventListeners();
    }
    
    createSidebarHTML() {
        // Create sidebar HTML
        const sidebarHTML = `
            <div class="tco-sidebar">
                <div class="tco-sidebar-header">
                    <h2 class="tco-sidebar-title">TCO Multi-Vendor</h2>
                    <button class="tco-sidebar-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="tco-sidebar-content">
                    <div class="tco-sidebar-section">
                        <h3 class="tco-sidebar-section-title">Navigation</h3>
                        <div class="tco-sidebar-item active" data-target="vendor-selection">
                            <i class="fas fa-server"></i> Vendor Selection
                        </div>
                        <div class="tco-sidebar-item" data-target="industry-compliance">
                            <i class="fas fa-industry"></i> Industry & Compliance
                        </div>
                        <div class="tco-sidebar-item" data-target="organization-config">
                            <i class="fas fa-building"></i> Organization Config
                        </div>
                        <div class="tco-sidebar-item" data-target="advanced-config">
                            <i class="fas fa-sliders-h"></i> Advanced Configuration
                        </div>
                        <div class="tco-sidebar-item" data-target="results">
                            <i class="fas fa-chart-bar"></i> Results & Analysis
                        </div>
                    </div>
                    
                    <div class="tco-sidebar-section">
                        <h3 class="tco-sidebar-section-title">Tools</h3>
                        <div class="tco-sidebar-item" data-target="sensitivity-analysis">
                            <i class="fas fa-chart-line"></i> Sensitivity Analysis
                        </div>
                        <div class="tco-sidebar-item" data-target="export-report">
                            <i class="fas fa-file-export"></i> Export Report
                        </div>
                    </div>
                    
                    <div class="tco-sidebar-section">
                        <h3 class="tco-sidebar-section-title">Settings</h3>
                        <div class="tco-sidebar-item" data-target="help">
                            <i class="fas fa-question-circle"></i> Help & Documentation
                        </div>
                        <div class="tco-sidebar-item" id="dark-mode-toggle-sidebar">
                            <i class="fas fa-moon"></i> Dark Mode
                        </div>
                    </div>
                </div>
            </div>
            <button class="tco-sidebar-toggle">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        // Insert sidebar HTML into the document
        document.querySelector('.app-container').insertAdjacentHTML('afterbegin', sidebarHTML);
    }
    
    attachEventListeners() {
        // Toggle sidebar
        this.toggleButton.addEventListener('click', () => this.toggleSidebar());
        
        // Close sidebar
        document.querySelector('.tco-sidebar-close').addEventListener('click', () => this.closeSidebar());
        
        // Navigation items
        document.querySelectorAll('.tco-sidebar-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.target;
                
                // Handle specific actions
                if (target === 'help') {
                    // Open help modal
                    const helpBtn = document.getElementById('help-btn');
                    if (helpBtn) helpBtn.click();
                    return;
                }
                
                if (e.currentTarget.id === 'dark-mode-toggle-sidebar') {
                    // Toggle dark mode
                    const darkModeBtn = document.getElementById('dark-mode-toggle');
                    if (darkModeBtn) darkModeBtn.click();
                    return;
                }
                
                if (target === 'sensitivity-analysis') {
                    // Open sensitivity analysis panel
                    const sensitivityBtn = document.getElementById('sensitivity-toggle');
                    if (sensitivityBtn) sensitivityBtn.click();
                    return;
                }
                
                if (target === 'export-report') {
                    // Trigger export PDF action
                    const exportBtn = document.getElementById('export-pdf');
                    if (exportBtn) exportBtn.click();
                    return;
                }
                
                // Handle wizard navigation
                this.navigateToStep(target);
                
                // Update active state
                document.querySelectorAll('.tco-sidebar-item').forEach(navItem => {
                    navItem.classList.remove('active');
                });
                e.currentTarget.classList.add('active');
                
                // Close sidebar on mobile
                if (window.innerWidth <= 768) {
                    this.closeSidebar();
                }
            });
        });
    }
    
    toggleSidebar() {
        this.isExpanded = !this.isExpanded;
        this.sidebar.classList.toggle('expanded');
        this.appContainer.classList.toggle('sidebar-expanded');
        localStorage.setItem('tco_sidebar_expanded', this.isExpanded);
    }
    
    closeSidebar() {
        this.isExpanded = false;
        this.sidebar.classList.remove('expanded');
        this.appContainer.classList.remove('sidebar-expanded');
        localStorage.setItem('tco_sidebar_expanded', false);
    }
    
    navigateToStep(target) {
        // Map target to step number
        const stepMap = {
            'vendor-selection': 1,
            'industry-compliance': 2,
            'organization-config': 3,
            'advanced-config': 4,
            'results': 5
        };
        
        const stepNumber = stepMap[target];
        
        if (stepNumber) {
            // Find wizard manager and navigate to step
            if (window.wizardManager) {
                window.wizardManager.goToStep(stepNumber);
            } else {
                // Fallback: Direct DOM manipulation
                document.querySelectorAll('.wizard-step').forEach((step, index) => {
                    step.classList.remove('active');
                    if (index === stepNumber - 1) {
                        step.classList.add('active');
                    }
                });
                
                // Update progress
                const progressFill = document.getElementById('wizard-progress-fill');
                if (progressFill) {
                    progressFill.style.width = `${(stepNumber / 5) * 100}%`;
                }
            }
        }
    }
}

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tcoSidebar = new TcoSidebar();
});
EOL

# Create dark mode toggle enhancement
echo -e "${YELLOW}Creating enhanced dark mode toggle...${NC}"
cat > "js/components/ui/dark-mode.js" << 'EOL'
/**
 * Enhanced Dark Mode Toggle
 */
class DarkModeToggle {
    constructor() {
        this.darkModeEnabled = localStorage.getItem('darkMode') === 'true';
        this.toggleButton = document.getElementById('dark-mode-toggle');
        
        this.init();
    }
    
    init() {
        // Set initial state
        if (this.darkModeEnabled) {
            document.body.classList.add('dark-mode');
            this.updateToggleIcon(true);
        }
        
        // Attach event listener
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => this.toggleDarkMode());
        }
        
        // Listen for sidebar dark mode toggle
        document.addEventListener('DOMContentLoaded', () => {
            const sidebarToggle = document.getElementById('dark-mode-toggle-sidebar');
            if (sidebarToggle) {
                sidebarToggle.addEventListener('click', () => this.toggleDarkMode());
            }
        });
    }
    
    toggleDarkMode() {
        this.darkModeEnabled = !this.darkModeEnabled;
        
        // Update body class
        document.body.classList.toggle('dark-mode', this.darkModeEnabled);
        
        // Update toggle icon
        this.updateToggleIcon(this.darkModeEnabled);
        
        // Save preference
        localStorage.setItem('darkMode', this.darkModeEnabled);
        
        // Update charts if they exist
        this.updateCharts();
    }
    
    updateToggleIcon(isDarkMode) {
        if (this.toggleButton) {
            const icon = this.toggleButton.querySelector('i');
            if (icon) {
                if (isDarkMode) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        }
        
        // Update sidebar toggle icon if it exists
        const sidebarToggle = document.getElementById('dark-mode-toggle-sidebar');
        if (sidebarToggle) {
            const sidebarIcon = sidebarToggle.querySelector('i');
            if (sidebarIcon) {
                if (isDarkMode) {
                    sidebarIcon.classList.remove('fa-moon');
                    sidebarIcon.classList.add('fa-sun');
                    sidebarToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
                } else {
                    sidebarIcon.classList.remove('fa-sun');
                    sidebarIcon.classList.add('fa-moon');
                    sidebarToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
                }
            }
        }
    }
    
    updateCharts() {
        // If Chart.js is loaded and charts exist, update their theme
        if (window.Chart && window.charts) {
            const textColor = this.darkModeEnabled ? '#e2e8f0' : '#333';
            const gridColor = this.darkModeEnabled ? '#4a5568' : '#e9e9e9';
            
            // Update Chart.js defaults
            Chart.defaults.color = textColor;
            Chart.defaults.borderColor = gridColor;
            
            // Update existing charts
            Object.values(window.charts).forEach(chart => {
                if (chart && chart.options) {
                    // Update scales
                    if (chart.options.scales) {
                        Object.values(chart.options.scales).forEach(scale => {
                            scale.grid = scale.grid || {};
                            scale.grid.color = gridColor;
                            scale.ticks = scale.ticks || {};
                            scale.ticks.color = textColor;
                        });
                    }
                    
                    // Update legends
                    if (chart.options.plugins && chart.options.plugins.legend) {
                        chart.options.plugins.legend.labels = chart.options.plugins.legend.labels || {};
                        chart.options.plugins.legend.labels.color = textColor;
                    }
                    
                    // Update the chart
                    chart.update();
                }
            });
        }
        
        // If ApexCharts is loaded, update its theme
        if (window.ApexCharts && window.apexCharts) {
            const foreColor = this.darkModeEnabled ? '#e2e8f0' : '#333';
            const gridColor = this.darkModeEnabled ? '#4a5568' : '#e9e9e9';
            
            Object.values(window.apexCharts).forEach(chart => {
                chart.updateOptions({
                    chart: {
                        foreColor: foreColor
                    },
                    grid: {
                        borderColor: gridColor
                    },
                    theme: {
                        mode: this.darkModeEnabled ? 'dark' : 'light'
                    }
                });
            });
        }
    }
}

// Initialize dark mode toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.darkModeToggle = new DarkModeToggle();
});
EOL

# Update the index.html file to include new CSS and JS files
echo -e "${YELLOW}Updating index.html with new CSS and JS files...${NC}"

# Add new CSS files
sed -i.bak '/<link rel="stylesheet" href="css\/fixes\/navigation-fix.css">/a \
    <link rel="stylesheet" href="css/components/sidebar.css">\
    <link rel="stylesheet" href="css/components/vendor-grid.css">\
    <link rel="stylesheet" href="css/components/enhanced-charts.css">\
    <link rel="stylesheet" href="css/components/enhanced-wizard.css">' index.html

# Add new JS files
sed -i.bak '/<script src="js\/components\/enhanced-ui.js"><\/script>/a \
    <script src="js/components/ui/sidebar.js"></script>\
    <script src="js/components/ui/dark-mode.js"></script>' index.html

# Create or update main.css to include dark mode styles
echo -e "${YELLOW}Updating main CSS with dark mode support...${NC}"
cat >> "css/main.css" << 'EOL'

/* Dark Mode Support */
body.dark-mode {
  background-color: #1a202c;
  color: #e2e8f0;
}

body.dark-mode .app-header {
  background-color: #2d3748;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

body.dark-mode .app-header h1,
body.dark-mode .app-header .subtitle {
  color: #e2e8f0;
}

body.dark-mode .header-actions .btn-outline {
  border-color: #4a5568;
  color: #e2e8f0;
}

body.dark-mode .header-actions .btn-outline:hover {
  background-color: #4a5568;
}

body.dark-mode .app-footer {
  background-color: #2d3748;
  border-top: 1px solid #4a5568;
}

body.dark-mode .footer-copyright,
body.dark-mode .footer-links a {
  color: #a0aec0;
}

body.dark-mode .footer-links a:hover {
  color: #e2e8f0;
}

body.dark-mode .footer-social .social-link {
  color: #a0aec0;
  border-color: #4a5568;
}

body.dark-mode .footer-social .social-link:hover {
  background-color: #4a5568;
  color: #e2e8f0;
}

body.dark-mode .btn-primary {
  background-color: #3182ce;
}

body.dark-mode .btn-primary:hover {
  background-color: #2b6cb0;
}

body.dark-mode .modal-content {
  background-color: #2d3748;
  border-color: #4a5568;
}

body.dark-mode .modal-header {
  border-bottom-color: #4a5568;
}

body.dark-mode .modal-header h2 {
  color: #e2e8f0;
}

body.dark-mode .modal-close {
  color: #a0aec0;
}

body.dark-mode .loading-overlay {
  background-color: rgba(26, 32, 44, 0.8);
}

body.dark-mode .loading-spinner p {
  color: #e2e8f0;
}

body.dark-mode .spinner:before {
  border-color: #3182ce;
}
EOL

echo -e "${GREEN}UI update completed successfully!${NC}"
