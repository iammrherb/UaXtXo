#!/bin/bash

# ================================================================
# Portnox Total Cost Analyzer - Dashboard Enhancement Script
# ================================================================
# This script updates the Portnox TCO Analyzer with:
# - Modern layout and interactive charts
# - Comprehensive Executive View with detailed visualizations
# - Enhanced Security & Compliance with industry frameworks
# - Interactive vendor comparison capabilities
# - Cyber insurance and threat modeling visuals
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
CSS_DIR="$REPO_DIR/css"
JS_DIR="$REPO_DIR/js"
CHARTS_DIR="$JS_DIR/charts"
COMPONENTS_DIR="$JS_DIR/components"
VIEWS_DIR="$JS_DIR/views"
UTILS_DIR="$JS_DIR/utils"
BACKUP_DIR="$REPO_DIR/backups/$(date +%Y%m%d_%H%M%S)"

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Portnox Total Cost Analyzer - Complete Enhancement Script    ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}Enhancing UI, charts, and implementing comprehensive views${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo ""

# Function to check if a directory exists, if not create it
check_dir() {
  if [ ! -d "$1" ]; then
    mkdir -p "$1"
    echo -e "${YELLOW}Created directory: $1${NC}"
  fi
}

# Function to check if a file exists
check_file() {
  if [ ! -f "$1" ]; then
    echo -e "${RED}Warning: File $1 does not exist${NC}"
    return 1
  fi
  return 0
}

# Function to create backup of existing files
create_backup() {
  echo -e "${YELLOW}Creating backup of existing files...${NC}"
  
  # Create backup directories
  mkdir -p "$BACKUP_DIR"/{css,js,js/charts,js/components,js/views,js/utils,html}
  
  # Back up existing files
  cp -r "$CSS_DIR" "$BACKUP_DIR/" 2>/dev/null
  cp -r "$JS_DIR" "$BACKUP_DIR/" 2>/dev/null
  cp "$REPO_DIR/index.html" "$BACKUP_DIR/html/" 2>/dev/null
  
  echo -e "${GREEN}Backup created at: $BACKUP_DIR${NC}"
}

# Function to ensure required directories exist
ensure_directories() {
  echo -e "${YELLOW}Ensuring required directories exist...${NC}"
  
  check_dir "$CSS_DIR"
  check_dir "$JS_DIR"
  check_dir "$CHARTS_DIR"
  check_dir "$CHARTS_DIR/apex"
  check_dir "$CHARTS_DIR/d3"
  check_dir "$CHARTS_DIR/highcharts"
  check_dir "$COMPONENTS_DIR"
  check_dir "$VIEWS_DIR" 
  check_dir "$UTILS_DIR"
  
  echo -e "${GREEN}Directory structure verified${NC}"
}

# Create backup
create_backup

# Ensure directories exist
ensure_directories

# ================================================================
# 1. Enhanced Layout CSS
# ================================================================
echo -e "${CYAN}Creating enhanced layout styling...${NC}"

cat > "$CSS_DIR/enhanced-layout.css" << 'EOL'
/**
 * Enhanced Layout for Portnox Total Cost Analyzer
 * Modern, responsive design with gradient themes
 */

:root {
  /* Primary color scheme */
  --primary-color: #1a5a96;
  --primary-dark: #0d4275;
  --primary-light: #2980b9;
  --secondary-color: #2ecc71;
  --secondary-dark: #27ae60;
  --warning-color: #f39c12;
  --danger-color: #e74c3c;
  --success-color: #2ecc71;
  --info-color: #3498db;
  
  /* Gradients */
  --primary-gradient: linear-gradient(135deg, #1a5a96 0%, #0d4275 100%);
  --primary-gradient-hover: linear-gradient(135deg, #0d4275 0%, #1a5a96 100%);
  --secondary-gradient: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  --warning-gradient: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  --danger-gradient: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  
  /* UI colors */
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --border-color: #e0e0e0;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
  
  /* Spacings */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
}

/* Dark theme variables */
.dark-mode {
  --primary-color: #3498db;
  --primary-dark: #2980b9;
  --primary-light: #5dade2;
  --bg-color: #0f172a;
  --card-bg: #1e293b;
  --border-color: #334155;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-muted: #94a3b8;
  
  --primary-gradient: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  --primary-gradient-hover: linear-gradient(135deg, #2980b9 0%, #3498db 100%);
}

/* Base Layout */
body {
  font-family: 'Nunito', sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  color: var(--text-primary);
  min-height: 100vh;
  transition: background-color var(--transition-normal), color var(--transition-normal);
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Header with enhanced styling */
.app-header {
  background: var(--primary-gradient);
  color: white;
  padding: 0;
  height: 70px;
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: var(--shadow-lg);
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 var(--space-5);
}

.logo-section {
  display: flex;
  align-items: center;
}

.company-logo {
  height: 40px;
  transition: transform var(--transition-normal);
}

.company-logo:hover {
  transform: scale(1.05);
}

.app-title {
  margin-left: var(--space-4);
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

.header-actions {
  display: flex;
  gap: var(--space-2);
}

/* Main Content */
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

/* Enhanced Sidebar */
.sidebar {
  width: 350px;
  background-color: var(--card-bg);
  box-shadow: var(--shadow-md);
  position: relative;
  flex-shrink: 0;
  transition: width var(--transition-normal), transform var(--transition-normal);
  overflow-y: auto;
  z-index: 90;
  height: calc(100vh - 70px);
  border-right: 1px solid var(--border-color);
}

.sidebar.collapsed {
  width: 0;
  overflow: hidden;
}

.sidebar-header {
  padding: var(--space-4);
  background: var(--primary-gradient);
  color: white;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  display: flex;
  align-items: center;
}

.sidebar-header h2 i {
  margin-right: var(--space-3);
}

.sidebar-content {
  padding: var(--space-4);
  overflow-y: auto;
}

.sidebar-footer {
  padding: var(--space-4);
  border-top: 1px solid var(--border-color);
}

/* Sidebar Toggle Button */
.sidebar-toggle {
  position: fixed;
  left: 350px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 50px;
  background-color: var(--card-bg);
  border-radius: 0 5px 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  z-index: 100;
  transition: left var(--transition-normal);
  border: 1px solid var(--border-color);
  border-left: none;
}

.sidebar-toggle.collapsed {
  left: 0;
}

.sidebar-toggle i {
  color: var(--primary-color);
  transition: transform var(--transition-normal);
}

.sidebar-toggle.collapsed i {
  transform: rotate(180deg);
}

/* Content Area */
.content-area {
  flex: 1;
  margin-left: 350px;
  transition: margin-left var(--transition-normal);
  overflow-y: auto;
  height: calc(100vh - 70px);
  padding: var(--space-5);
}

.content-area.expanded {
  margin-left: 0;
}

.content-wrapper {
  max-width: 1600px;
  margin: 0 auto;
}

/* Main Navigation Tabs */
.main-tabs {
  display: flex;
  background-color: var(--card-bg);
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  margin-bottom: 0;
  border-bottom: 1px solid var(--border-color);
}

.main-tab {
  padding: var(--space-4) var(--space-5);
  font-size: 15px;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
}

.main-tab i {
  margin-right: var(--space-2);
  font-size: 16px;
}

.main-tab:hover {
  color: var(--primary-color);
  background-color: rgba(26, 90, 150, 0.05);
}

.main-tab.active {
  color: var(--primary-color);
  background-color: rgba(26, 90, 150, 0.07);
}

.main-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--primary-gradient);
}

/* Secondary Tabs */
.results-tabs {
  display: flex;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--card-bg);
  padding: 0 var(--space-4);
}

.results-tab {
  padding: var(--space-3) var(--space-5);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  border: none;
  background: transparent;
}

.results-tab:hover {
  color: var(--primary-color);
}

.results-tab.active {
  color: var(--primary-color);
}

.results-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--primary-gradient);
}

/* View Panels */
.view-panel {
  display: none;
  background-color: var(--card-bg);
  border-radius: 0 0 8px 8px;
  box-shadow: var(--shadow-sm);
}

.view-panel.active {
  display: block;
}

.results-panel {
  display: none;
  padding: var(--space-5);
}

.results-panel.active {
  display: block;
}

.panel-header {
  margin-bottom: var(--space-5);
}

.panel-header h2 {
  margin: 0 0 var(--space-2) 0;
  font-size: 24px;
  color: var(--text-primary);
}

.panel-header .subtitle {
  color: var(--text-secondary);
  margin: 0;
}

/* Enhanced Dashboard Cards */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-5);
  margin-bottom: var(--space-8);
}

.dashboard-card {
  background: var(--card-bg);
  border-radius: 10px;
  box-shadow: var(--shadow-md);
  padding: var(--space-5);
  transition: all var(--transition-normal);
  height: 100%;
  display: flex;
  flex-direction: column;
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
  transition: opacity var(--transition-normal);
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.dashboard-card:hover::before {
  opacity: 1;
}

.dashboard-card h3 {
  font-size: 16px;
  color: var(--text-secondary);
  margin-top: 0;
  margin-bottom: var(--space-4);
}

.dashboard-card .metric-value {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 var(--space-1);
  color: var(--text-primary);
}

.highlight-value {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dashboard-card .metric-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
}

.dashboard-card .metric-trend {
  margin-top: auto;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: var(--success-color);
}

.metric-trend.up {
  color: var(--success-color);
}

.metric-trend.down {
  color: var(--danger-color);
}

.dashboard-card .metric-trend i {
  margin-right: var(--space-1);
}

/* Enhanced Chart Containers */
.chart-container {
  background: var(--card-bg);
  border-radius: 10px;
  box-shadow: var(--shadow-md);
  padding: var(--space-5);
  margin-bottom: var(--space-8);
  transition: all var(--transition-normal);
}

.chart-container:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.chart-container h3 {
  font-size: 18px;
  margin-top: 0;
  margin-bottom: var(--space-5);
  color: var(--text-primary);
}

.chart-wrapper {
  width: 100%;
  height: 400px;
  position: relative;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  margin-top: var(--space-4);
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: var(--text-secondary);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: var(--space-2);
}

/* Benefits Grid */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-5);
  margin-top: var(--space-5);
}

.benefit-card {
  background: var(--card-bg);
  border-radius: 8px;
  padding: var(--space-4);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
}

.benefit-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.benefit-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-3);
}

.benefit-icon i {
  font-size: 24px;
  color: white;
}

.benefit-card h4 {
  font-size: 16px;
  margin: var(--space-3) 0;
  color: var(--text-primary);
}

.benefit-card p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

/* Button Styles */
.btn {
  padding: var(--space-2) var(--space-4);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);
  border: none;
  gap: var(--space-2);
}

.btn-primary {
  background: var(--primary-gradient);
  color: white;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background: var(--primary-gradient-hover);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: var(--primary-color);
  border: 1px solid var(--border-color);
}

.btn-outline:hover {
  background: rgba(26, 90, 150, 0.05);
  border-color: var(--primary-color);
}

.btn-calculate {
  width: 100%;
  padding: var(--space-3) var(--space-5);
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
}

.btn-calculate:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-calculate i {
  margin-right: var(--space-2);
}

/* Footer */
.app-footer {
  background-color: var(--card-bg);
  border-top: 1px solid var(--border-color);
  padding: var(--space-4) 0;
  color: var(--text-secondary);
  font-size: 13px;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--space-5);
}

.footer-links {
  display: flex;
  gap: var(--space-4);
}

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition-normal);
}

.footer-links a:hover {
  color: var(--primary-color);
}

.footer-social {
  display: flex;
  gap: var(--space-3);
}

.social-link {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all var(--transition-normal);
}

.social-link:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

/* Config Cards */
.config-card {
  background-color: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-4);
  border: 1px solid var(--border-color);
}

.config-card-header {
  padding: var(--space-3) var(--space-4);
  background: var(--primary-gradient);
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
  margin-right: var(--space-2);
}

.toggle-icon {
  transition: transform var(--transition-normal);
}

.toggle-icon.collapsed {
  transform: rotate(180deg);
}

.config-card-content {
  padding: var(--space-4);
  max-height: 1000px;
  overflow: hidden;
  transition: max-height var(--transition-normal), padding var(--transition-normal);
}

.config-card-content.collapsed {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
}

/* Form elements */
.form-group {
  margin-bottom: var(--space-4);
}

.form-label {
  display: block;
  margin-bottom: var(--space-2);
  font-weight: 600;
  color: var(--text-primary);
  font-size: 14px;
}

.form-control {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--card-bg);
  color: var(--text-primary);
  transition: border-color var(--transition-normal);
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-select {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--card-bg);
  color: var(--text-primary);
  transition: border-color var(--transition-normal);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231a5a96'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px;
}

.form-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.helper-text {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: var(--space-1);
}

/* Range sliders */
.range-slider {
  margin-bottom: var(--space-4);
}

.range-slider-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-2);
}

.range-slider-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.range-slider-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--primary-color);
}

input[type="range"] {
  width: 100%;
  height: 6px;
  border-radius: 5px;
  background: #e0e0e0;
  outline: none;
  -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}

/* Vendor Selection */
.vendor-select-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2);
  margin-top: var(--space-3);
}

.vendor-select-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: var(--space-2) var(--space-1);
  cursor: pointer;
  transition: all var(--transition-normal);
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.vendor-select-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-sm);
  border-color: var(--primary-color);
}

.vendor-select-card .vendor-logo {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-2);
}

.vendor-select-card .vendor-logo img {
  max-height: 30px;
  max-width: 80px;
  object-fit: contain;
}

.vendor-select-card .vendor-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
}

.vendor-select-card.selected {
  border: 2px solid var(--primary-color);
  background-color: rgba(26, 90, 150, 0.05);
}

.vendor-select-card.selected::after {
  content: '✓';
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.badge {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: var(--space-1);
}

.badge-primary {
  background-color: var(--primary-color);
  color: white;
}

.badge-success {
  background-color: var(--success-color);
  color: white;
}

.badge-warning {
  background-color: var(--warning-color);
  color: white;
}

.badge-danger {
  background-color: var(--danger-color);
  color: white;
}

/* Loading state */
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
  transition: opacity var(--transition-normal), visibility var(--transition-normal);
}

.loading-overlay.active {
  opacity: 1;
  visibility: visible;
}

.loading-spinner {
  background-color: var(--card-bg);
  padding: var(--space-5);
  border-radius: 10px;
  box-shadow: var(--shadow-lg);
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto var(--space-3) auto;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Toast notifications */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.toast {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: var(--space-3) var(--space-4);
  margin-bottom: var(--space-3);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  min-width: 300px;
  max-width: 450px;
  transform: translateX(120%);
  transition: transform var(--transition-normal);
}

.toast.show {
  transform: translateX(0);
}

.toast i {
  margin-right: var(--space-3);
  font-size: 18px;
}

.toast-info i {
  color: var(--info-color);
}

.toast-success i {
  color: var(--success-color);
}

.toast-warning i {
  color: var(--warning-color);
}

.toast-error i {
  color: var(--danger-color);
}

/* Responsive design */
@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 992px) {
  .sidebar {
    width: 300px;
  }
  
  .sidebar-toggle {
    left: 300px;
  }
  
  .content-area {
    margin-left: 300px;
  }
  
  .vendor-select-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 70px;
    left: -350px;
    height: calc(100vh - 70px);
    z-index: 1000;
    width: 320px;
    transition: transform var(--transition-normal);
  }
  
  .sidebar.active {
    transform: translateX(350px);
  }
  
  .content-area {
    margin-left: 0 !important;
    width: 100%;
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
    transition: opacity var(--transition-normal), visibility var(--transition-normal);
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
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    padding: var(--space-3);
  }
  
  .app-header {
    height: auto;
    padding: var(--space-3) 0;
  }
  
  .header-actions {
    margin-top: var(--space-3);
    width: 100%;
    justify-content: flex-end;
  }
  
  .logo-section {
    width: 100%;
    justify-content: space-between;
  }
  
  .app-title h1 {
    font-size: 18px;
  }
  
  .app-title .subtitle {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .main-tab {
    padding: var(--space-3) var(--space-2);
    font-size: 13px;
  }
  
  .main-tab i {
    margin-right: var(--space-1);
  }
  
  .results-tab {
    padding: var(--space-2) var(--space-3);
    font-size: 13px;
  }
  
  .panel-header h2 {
    font-size: 20px;
  }
  
  .panel-header .subtitle {
    font-size: 14px;
  }
  
  .vendor-select-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .vendor-select-card .vendor-name {
    font-size: 11px;
  }
}
EOL

echo -e "${GREEN}Enhanced layout styling created${NC}"

# ================================================================
# 2. Enhanced Chart Configurations
# ================================================================
echo -e "${CYAN}Creating enhanced chart configurations...${NC}"

cat > "$CHARTS_DIR/chart-config.js" << 'EOL'
/**
 * Enhanced Chart Configuration for Portnox Total Cost Analyzer
 * Provides unified styling and configuration for all charts
 */

const ChartConfig = {
  // Color schemes
  colors: {
    vendors: {
      portnox: '#1a5a96',
      cisco: '#00bceb',
      aruba: '#f7931e',
      forescout: '#7a2a90',
      fortinac: '#e31837',
      juniper: '#84bd00',
      securew2: '#0078d7',
      microsoft: '#00a4ef',
      arista: '#2196f3',
      foxpass: '#ff9900',
      extreme: '#00c389',
      'no-nac': '#777777'
    },
    chart: [
      '#1a5a96', '#2ecc71', '#f39c12', '#e74c3c',
      '#9b59b6', '#3498db', '#1abc9c', '#d35400',
      '#34495e', '#27ae60', '#c0392b', '#8e44ad'
    ],
    positive: '#2ecc71',
    negative: '#e74c3c',
    neutral: '#f39c12',
    // Add dark/light mode specific colors
    light: {
      background: '#f8fafc',
      cardBackground: '#ffffff',
      textColor: '#333333',
      textLight: '#666666',
      borderColor: '#e0e0e0',
      gridColor: 'rgba(0, 0, 0, 0.05)'
    },
    dark: {
      background: '#0f172a',
      cardBackground: '#1e293b',
      textColor: '#f1f5f9',
      textLight: '#cbd5e1',
      borderColor: '#334155',
      gridColor: 'rgba(255, 255, 255, 0.05)'
    },
    // Gradients for enhanced visuals
    gradients: {
      primary: ['#1a5a96', '#0d4275'],
      secondary: ['#2ecc71', '#25a25a'],
      warning: ['#f39c12', '#d68910'],
      danger: ['#e74c3c', '#c0392b']
    }
  },
  
  // Default styling for all charts
  defaults: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: 13,
    tooltipFontSize: 12,
    borderWidth: 2,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    responsiveAnimationDuration: 500,
    hover: {
      mode: 'nearest',
      intersect: true
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(50, 50, 50, 0.95)',
      titleFontFamily: "'Nunito', sans-serif",
      bodyFontFamily: "'Nunito', sans-serif",
      titleFontSize: 13,
      bodyFontSize: 12,
      xPadding: 10,
      yPadding: 10,
      cornerRadius: 8,
      displayColors: true
    },
    legend: {
      position: 'bottom',
      labels: {
        fontFamily: "'Nunito', sans-serif",
        fontSize: 12,
        padding: 20,
        usePointStyle: true,
        boxWidth: 8
      }
    }
  },
  
  // ApexCharts theme
  apexTheme: {
    chart: {
      background: 'transparent',
      fontFamily: "'Nunito', sans-serif",
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    colors: ['#1a5a96', '#2ecc71', '#f39c12', '#e74c3c', 
             '#9b59b6', '#3498db', '#1abc9c', '#d35400'],
    grid: {
      borderColor: 'rgba(0, 0, 0, 0.05)',
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      }
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      style: {
        fontSize: '12px',
        fontFamily: "'Nunito', sans-serif"
      }
    },
    xaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: "'Nunito', sans-serif"
        }
      },
      axisBorder: {
        color: 'rgba(0, 0, 0, 0.1)'
      },
      axisTicks: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: "'Nunito', sans-serif"
        }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '70%'
      },
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontFamily: "'Nunito', sans-serif",
              fontSize: '14px'
            },
            value: {
              fontFamily: "'Nunito', sans-serif",
              fontSize: '20px',
              fontWeight: 600
            },
            total: {
              show: true,
              fontFamily: "'Nunito', sans-serif",
              fontSize: '18px',
              fontWeight: 600
            }
          }
        }
      },
      radialBar: {
        dataLabels: {
          name: {
            fontFamily: "'Nunito', sans-serif",
            fontSize: '14px'
          },
          value: {
            fontFamily: "'Nunito', sans-serif",
            fontSize: '20px',
            fontWeight: 600
          },
          total: {
            show: true,
            fontFamily: "'Nunito', sans-serif",
            fontSize: '16px',
            fontWeight: 600
          }
        }
      }
    },
    dataLabels: {
      style: {
        fontFamily: "'Nunito', sans-serif",
        fontSize: '12px',
        fontWeight: 600
      }
    },
    legend: {
      fontFamily: "'Nunito', sans-serif",
      fontSize: '12px',
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    }
  },
  
  // D3 Charts theme
  d3Theme: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: 12,
    axisStyles: {
      strokeWidth: 1,
      strokeColor: 'rgba(0, 0, 0, 0.1)',
      textColor: '#666666',
      fontSize: 12
    },
    tooltipStyles: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Nunito', sans-serif",
      fontSize: 12,
      padding: 10,
      borderRadius: 8
    },
    transitionDuration: 700
  },
  
  // Helper methods
  
  // Get color for a specific vendor
  getVendorColor: function(vendorId) {
    return this.colors.vendors[vendorId] || this.colors.chart[0];
  },
  
  // Get array of colors for multiple vendors
  getVendorColors: function(vendorIds) {
    return vendorIds.map(id => this.getVendorColor(id));
  },
  
  // Get gradient for a vendor
  getVendorGradient: function(vendorId) {
    if (vendorId === 'portnox') {
      return this.getGradient(this.colors.vendors.portnox, this.adjustColor(this.colors.vendors.portnox, -10));
    }
    
    return this.getGradient(this.getVendorColor(vendorId), this.adjustColor(this.getVendorColor(vendorId), -10));
  },
  
  // Create gradient string for CSS
  getGradient: function(startColor, endColor, angle = 135) {
    return `linear-gradient(${angle}deg, ${startColor}, ${endColor})`;
  },
  
  // Format currency values
  formatCurrency: function(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  },
  
  // Format percentage values
  formatPercentage: function(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(value / 100);
  },
  
  // Format number values with commas
  formatNumber: function(value) {
    return new Intl.NumberFormat('en-US').format(value);
  },
  
  // Calculate lighter/darker shades of a color
  adjustColor: function(hex, percent) {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    
    // Adjust
    r = Math.min(255, Math.max(0, Math.round(r * (1 + percent / 100))));
    g = Math.min(255, Math.max(0, Math.round(g * (1 + percent / 100))));
    b = Math.min(255, Math.max(0, Math.round(b * (1 + percent / 100))));
    
    // Convert back to hex
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },
  
  // Generate transparency variants of a color
  getTransparentColor: function(color, opacity) {
    // Convert hex to RGB
    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    };
    
    if (color.startsWith('#')) {
      const [r, g, b] = hexToRgb(color);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    return color;
  },
  
  // Get current theme colors based on dark mode
  getCurrentTheme: function() {
    return document.body.classList.contains('dark-mode') ? this.colors.dark : this.colors.light;
  },
  
  // Update chart theme for dark/light mode
  updateChartTheme: function(isDarkMode) {
    if (isDarkMode) {
      this.apexTheme.chart.foreColor = this.colors.dark.textColor;
      this.apexTheme.tooltip.theme = 'dark';
      this.apexTheme.grid.borderColor = this.colors.dark.gridColor;
      this.apexTheme.xaxis.axisBorder.color = this.colors.dark.borderColor;
      this.apexTheme.xaxis.axisTicks.color = this.colors.dark.borderColor;
      
      this.d3Theme.axisStyles.strokeColor = 'rgba(255, 255, 255, 0.1)';
      this.d3Theme.axisStyles.textColor = this.colors.dark.textLight;
      this.d3Theme.tooltipStyles.backgroundColor = 'rgba(30, 30, 30, 0.95)';
      this.d3Theme.tooltipStyles.borderColor = this.colors.dark.borderColor;
    } else {
      this.apexTheme.chart.foreColor = this.colors.light.textColor;
      this.apexTheme.tooltip.theme = 'light';
      this.apexTheme.grid.borderColor = this.colors.light.gridColor;
      this.apexTheme.xaxis.axisBorder.color = this.colors.light.borderColor;
      this.apexTheme.xaxis.axisTicks.color = this.colors.light.borderColor;
      
      this.d3Theme.axisStyles.strokeColor = 'rgba(0, 0, 0, 0.1)';
      this.d3Theme.axisStyles.textColor = this.colors.light.textLight;
      this.d3Theme.tooltipStyles.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      this.d3Theme.tooltipStyles.borderColor = this.colors.light.borderColor;
    }
  }
};

// Initialize theme based on current setting
ChartConfig.updateChartTheme(document.body.classList.contains('dark-mode'));

// Update theme on dark mode toggle
window.addEventListener('themechange', (event) => {
  const isDarkMode = event.detail.theme === 'dark';
  ChartConfig.updateChartTheme(isDarkMode);
});

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChartConfig };
} else {
  // Global access
  window.ChartConfig = ChartConfig;
}
EOL

echo -e "${GREEN}Enhanced chart configurations created${NC}"

# ================================================================
# 3. Enhanced ApexCharts Implementation
# ================================================================
echo -e "${CYAN}Creating enhanced ApexCharts implementation...${NC}"

# Ensure directory exists
check_dir "$CHARTS_DIR/apex"

cat > "$CHARTS_DIR/apex/apex-charts.js" << 'EOL'
/**
 * Enhanced ApexCharts implementation for Portnox Total Cost Analyzer
 * Creates modern, interactive charts with advanced features
 */

class ApexChartManager {
  constructor(config = {}) {
    this.config = {
      colors: window.ChartConfig ? window.ChartConfig.colors : {
        chart: ['#1a5a96', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6', '#3498db']
      },
      theme: window.ChartConfig ? window.ChartConfig.apexTheme : {
        chart: { fontFamily: "'Nunito', sans-serif" }
      },
      ...config
    };
    
    this.charts = {};
    this.animations = true;
    
    // Initialize event listeners
    this.initEventListeners();
  }
  
  /**
   * Initialize event listeners for theme changes and responsiveness
   */
  initEventListeners() {
    // Listen for theme changes
    window.addEventListener('themechange', (event) => {
      const isDarkMode = event.detail.theme === 'dark';
      this.updateChartsTheme(isDarkMode);
    });
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resizeAllCharts();
      }, 250);
    });
  }
  
  /**
   * Update all charts when theme changes
   */
  updateChartsTheme(isDarkMode) {
    if (!window.ChartConfig) return;
    
    // Update theme in config
    this.config.theme.chart.foreColor = isDarkMode ? window.ChartConfig.colors.dark.textColor : window.ChartConfig.colors.light.textColor;
    this.config.theme.tooltip.theme = isDarkMode ? 'dark' : 'light';
    this.config.theme.grid.borderColor = isDarkMode ? window.ChartConfig.colors.dark.gridColor : window.ChartConfig.colors.light.gridColor;
    
    // Update all active charts
    Object.keys(this.charts).forEach(chartId => {
      const chart = this.charts[chartId];
      if (chart && chart.updateOptions) {
        chart.updateOptions({
          chart: {
            foreColor: this.config.theme.chart.foreColor
          },
          tooltip: {
            theme: this.config.theme.tooltip.theme
          },
          grid: {
            borderColor: this.config.theme.grid.borderColor
          }
        }, false, true);
      }
    });
  }
  
  /**
   * Resize all charts
   */
  resizeAllCharts() {
    Object.keys(this.charts).forEach(chartId => {
      const chart = this.charts[chartId];
      if (chart && chart.render) {
        try {
          chart.render();
        } catch (e) {
          console.error(`Error resizing chart ${chartId}:`, e);
        }
      }
    });
  }
  
  /**
   * Create TCO comparison chart with ApexCharts
   * Enhanced bar chart with animations and tooltips
   */
  createTcoComparisonChart(data, elementId, chartId) {
    const vendors = Object.keys(data.vendors).filter(v => v !== 'no-nac');
    const tcoValues = vendors.map(v => data.vendors[v].totalTco);
    const colors = vendors.map(v => window.ChartConfig ? window.ChartConfig.getVendorColor(v) : this.config.colors.chart[0]);
    
    // Find index of Portnox for highlighting
    const portnoxIndex = vendors.indexOf('portnox');
    
    // Create distributed colors array with Portnox highlighted
    const distributedColors = vendors.map((v, i) => {
      if (i === portnoxIndex) {
        // Portnox gets a gradient fill
        return {
          fillType: 'gradient',
          opacity: 1,
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.2,
          gradientToColors: [window.ChartConfig ? window.ChartConfig.adjustColor(window.ChartConfig.getVendorColor(v), -15) : colors[i]],
          inverseColors: false,
          stops: [0, 100]
        };
      } else {
        // Other vendors get solid colors with less opacity
        return {
          fillType: 'solid',
          opacity: 0.85
        };
      }
    });
    
    const options = {
      ...this.config.theme,
      series: [{
        name: 'Total Cost of Ownership',
        data: tcoValues
      }],
      chart: {
        ...this.config.theme.chart,
        type: 'bar',
        height: 400,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            // Handle bar click for drill-down
            const vendorId = vendors[config.dataPointIndex];
            // Example: Trigger vendor detail view
            document.dispatchEvent(new CustomEvent('showVendorDetail', {
              detail: { vendorId }
            }));
          }
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          ...this.config.theme.plotOptions.bar,
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      fill: {
        opacity: distributedColors.map(d => d.opacity),
        type: distributedColors.map(d => d.fillType),
        gradient: distributedColors.map((d, i) => {
          if (d.fillType === 'gradient') {
            return {
              shade: d.shade,
              type: d.type,
              shadeIntensity: d.shadeIntensity,
              gradientToColors: d.gradientToColors,
              inverseColors: d.inverseColors,
              opacityFrom: 1,
              opacityTo: 1,
              stops: d.stops
            };
          }
          return null;
        }).filter(g => g !== null)
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return window.ChartConfig ? 
            window.ChartConfig.formatCurrency(val) : 
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(val);
        },
        offsetY: -20,
        style: {
          ...this.config.theme.dataLabels.style,
          colors: ['#555']
        }
      },
      xaxis: {
        categories: vendors.map(v => window.VENDORS ? window.VENDORS[v].name : v),
        labels: {
          ...this.config.theme.xaxis.labels,
          style: {
            ...this.config.theme.xaxis.labels.style,
            colors: vendors.map((v, i) => i === portnoxIndex ? colors[i] : this.config.theme.chart.foreColor)
          }
        }
      },
      yaxis: {
        title: {
          text: '3-Year TCO ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const vendorId = vendors[dataPointIndex];
          const vendorName = window.VENDORS ? window.VENDORS[vendorId].name : vendorId;
          const tcoValue = series[seriesIndex][dataPointIndex];
          
          // Calculate savings compared to most expensive option
          const maxTco = Math.max(...series[seriesIndex]);
          const savings = maxTco - tcoValue;
          const savingsPercent = Math.round((savings / maxTco) * 100);
          
          const formatCurrency = val => window.ChartConfig ? 
            window.ChartConfig.formatCurrency(val) : 
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(val);
          
          // Create custom tooltip
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${vendorName}</div>
              <div class="tooltip-value">${formatCurrency(tcoValue)}</div>
              ${savings > 0 ? 
                `<div class="tooltip-savings">
                  <span style="color:#2ecc71">Save ${formatCurrency(savings)}</span>
                  <span style="color:#2ecc71">(${savingsPercent}%)</span>
                 </div>` : ''
              }
              <div class="tooltip-arch">${window.VENDORS ? 
                (window.VENDORS[vendorId].architecture === 'cloud' ? 'Cloud Solution' : 
                 window.VENDORS[vendorId].architecture === 'hybrid' ? 'Hybrid Solution' : 
                 'On-Premises Solution') : 'Solution'}</div>
            </div>
          `;
        }
      },
      legend: {
        show: false
      },
      title: {
        text: '3-Year Total Cost of Ownership',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      },
      annotations: {
        points: portnoxIndex >= 0 ? [
          {
            x: window.VENDORS ? window.VENDORS[vendors[portnoxIndex]].name : vendors[portnoxIndex],
            y: tcoValues[portnoxIndex],
            marker: {
              size: 0
            },
            label: {
              text: 'Best Value',
              borderColor: window.ChartConfig ? window.ChartConfig.getVendorColor(vendors[portnoxIndex]) : colors[portnoxIndex],
              style: {
                background: window.ChartConfig ? window.ChartConfig.getVendorColor(vendors[portnoxIndex]) : colors[portnoxIndex],
                color: '#fff',
                fontSize: '11px',
                fontWeight: 600
              },
              offsetY: -15
            }
          }
        ] : []
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create Cumulative Cost Chart with ApexCharts
   * Line chart showing cost over time for different vendors
   */
  createCumulativeCostChart(data, elementId, chartId) {
    const vendors = Object.keys(data.vendors).filter(v => v !== 'no-nac');
    const years = data.vendors[vendors[0]].yearlyBreakdown.map(y => `Year ${y.year}`);
    
    const series = vendors.map(vendorId => {
      return {
        name: window.VENDORS ? window.VENDORS[vendorId].name : vendorId,
        data: data.vendors[vendorId].yearlyBreakdown.map(year => year.cumulativeCost)
      };
    });
    
    // Find Portnox series for annotations
    const portnoxIndex = vendors.indexOf('portnox');
    const portnoxSeries = portnoxIndex >= 0 ? series[portnoxIndex] : null;
    
    const options = {
      ...this.config.theme,
      series: series,
      chart: {
        ...this.config.theme.chart,
        type: 'line',
        height: 400,
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
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        },
        animations: {
          enabled: this.animations,
          easing: 'easeinout',
          speed: 900,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 450
          }
        }
      },
      colors: vendors.map(v => window.ChartConfig ? window.ChartConfig.getVendorColor(v) : this.config.colors.chart[0]),
      stroke: {
        width: 3,
        curve: 'smooth',
        dashArray: vendors.map(v => v === 'portnox' ? 0 : 0)
      },
      markers: {
        size: 5,
        shape: "circle",
        strokeWidth: 1,
        hover: {
          size: 7
        }
      },
      xaxis: {
        categories: years,
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: "'Nunito', sans-serif"
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
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '14px',
        offsetY: 10,
        itemMargin: {
          horizontal: 10,
          vertical: 5
        }
      },
      title: {
        text: 'Cumulative Cost Over Time',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      },
      grid: {
        borderColor: '#e0e0e0',
        row: {
          colors: ['transparent', 'transparent'],
          opacity: 0.2
        }
      },
      annotations: portnoxSeries ? {
        points: [
          {
            x: `Year ${years.length}`,
            y: portnoxSeries.data[portnoxSeries.data.length - 1],
            marker: {
              size: 6,
              fillColor: window.ChartConfig ? window.ChartConfig.getVendorColor('portnox') : this.config.colors.chart[0],
              strokeColor: '#fff',
              strokeWidth: 2,
              radius: 2
            },
            label: {
              text: `${window.ChartConfig ? 
                window.ChartConfig.formatCurrency(portnoxSeries.data[portnoxSeries.data.length - 1]) : 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(portnoxSeries.data[portnoxSeries.data.length - 1])}`,
              borderColor: window.ChartConfig ? window.ChartConfig.getVendorColor('portnox') : this.config.colors.chart[0],
              style: {
                background: window.ChartConfig ? window.ChartConfig.getVendorColor('portnox') : this.config.colors.chart[0],
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600,
                padding: {
                  left: 10,
                  right: 10,
                  top: 5,
                  bottom: 5
                }
              },
              offsetY: -15
            }
          }
        ]
      } : {}
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create ROI Chart with ApexCharts
   * Bar chart showing Return on Investment for different vendors
   */
  createRoiChart(data, elementId, chartId) {
    const vendors = Object.keys(data.roi).filter(v => v !== 'no-nac');
    const roiValues = vendors.map(v => data.roi[v].roiPercentage);
    const colors = vendors.map(v => window.ChartConfig ? window.ChartConfig.getVendorColor(v) : this.config.colors.chart[0]);
    
    // Find index of Portnox for highlighting
    const portnoxIndex = vendors.indexOf('portnox');
    
    const options = {
      ...this.config.theme,
      series: [{
        name: 'Return on Investment',
        data: roiValues
      }],
      chart: {
        ...this.config.theme.chart,
        type: 'bar',
        height: 400,
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
      colors: colors,
      plotOptions: {
        bar: {
          ...this.config.theme.plotOptions.bar,
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return Math.round(val) + '%';
        },
        offsetY: -20,
        style: {
          ...this.config.theme.dataLabels.style,
          colors: ['#555']
        }
      },
      xaxis: {
        categories: vendors.map(v => window.VENDORS ? window.VENDORS[v].name : v),
        labels: {
          ...this.config.theme.xaxis.labels,
          style: {
            ...this.config.theme.xaxis.labels.style,
            colors: vendors.map((v, i) => i === portnoxIndex ? colors[i] : this.config.theme.chart.foreColor)
          }
        }
      },
      yaxis: {
        title: {
          text: '3-Year ROI (%)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return Math.round(val) + '%';
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return Math.round(val) + '%';
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const vendorId = vendors[dataPointIndex];
          const vendorName = window.VENDORS ? window.VENDORS[vendorId].name : vendorId;
          const roiValue = series[seriesIndex][dataPointIndex];
          const payback = data.roi[vendorId].paybackPeriod;
          
          // Create custom tooltip
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${vendorName}</div>
              <div class="tooltip-value">${Math.round(roiValue)}% ROI</div>
              <div class="tooltip-payback">Payback in ${Math.round(payback)} months</div>
              <div class="tooltip-arch">${window.VENDORS ? 
                (window.VENDORS[vendorId].architecture === 'cloud' ? 'Cloud Solution' : 
                 window.VENDORS[vendorId].architecture === 'hybrid' ? 'Hybrid Solution' : 
                 'On-Premises Solution') : 'Solution'}</div>
            </div>
          `;
        }
      },
      legend: {
        show: false
      },
      title: {
        text: '3-Year Return on Investment',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      },
      annotations: portnoxIndex >= 0 && roiValues[portnoxIndex] === Math.max(...roiValues) ? {
        points: [
          {
            x: window.VENDORS ? window.VENDORS[vendors[portnoxIndex]].name : vendors[portnoxIndex],
            y: roiValues[portnoxIndex],
            marker: {
              size: 0
            },
            label: {
              text: 'Best ROI',
              borderColor: window.ChartConfig ? window.ChartConfig.getVendorColor(vendors[portnoxIndex]) : colors[portnoxIndex],
              style: {
                background: window.ChartConfig ? window.ChartConfig.getVendorColor(vendors[portnoxIndex]) : colors[portnoxIndex],
                color: '#fff',
                fontSize: '11px',
                fontWeight: 600
              },
              offsetY: -15
            }
          }
        ]
      } : {}
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create Value Drivers Chart
   * Horizontal bar chart showing ROI value drivers
   */
  createValueDriversChart(data, elementId, chartId) {
    const portnoxRoi = data.roi.portnox;
    
    if (!portnoxRoi) return;
    
    const series = [{
      name: 'Value',
      data: [
        portnoxRoi.costSavings,
        portnoxRoi.riskReductionBenefit,
        portnoxRoi.productivityBenefit,
        portnoxRoi.complianceSavings,
        portnoxRoi.insuranceSavings
      ]
    }];
    
    const options = {
      ...this.config.theme,
      series: series,
      chart: {
        ...this.config.theme.chart,
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
          barHeight: '70%',
          borderRadius: 6,
          distributed: true,
          dataLabels: {
            position: 'right'
          }
        }
      },
      colors: [
        '#1a5a96',
        '#2ecc71',
        '#f39c12',
        '#e74c3c',
        '#9b59b6'
      ],
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return window.ChartConfig ? 
            window.ChartConfig.formatCurrency(val) : 
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(val);
        },
        textAnchor: 'start',
        offsetX: 10,
        style: {
          ...this.config.theme.dataLabels.style,
          colors: ['#555']
        }
      },
      xaxis: {
        categories: [
          'Direct Cost Savings',
          'Risk Reduction',
          'Productivity Gains',
          'Compliance Automation',
          'Insurance Savings'
        ],
        labels: {
          ...this.config.theme.xaxis.labels
        }
      },
      yaxis: {
        labels: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      legend: {
        show: false
      },
      title: {
        text: 'Value Drivers',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create Security Framework Coverage Chart
   * Horizontal bar chart showing compliance framework coverage
   */
  createSecurityFrameworksChart(data, elementId, chartId) {
    // Framework coverage for Portnox
    const frameworkData = {
      'NIST CSF': 95,
      'ISO 27001': 88,
      'SOC 2': 92,
      'HIPAA': 85,
      'PCI DSS': 90,
      'GDPR': 80,
      'CMMC': 82
    };
    
    // For competitor comparison
    const competitorData = {
      'cisco': {
        'NIST CSF': 85,
        'ISO 27001': 85,
        'SOC 2': 82,
        'HIPAA': 80,
        'PCI DSS': 85,
        'GDPR': 75,
        'CMMC': 78
      },
      'forescout': {
        'NIST CSF': 83,
        'ISO 27001': 80,
        'SOC 2': 85,
        'HIPAA': 78,
        'PCI DSS': 82,
        'GDPR': 72,
        'CMMC': 75
      }
    };
    
    // Create series array for all vendors to compare
    const series = [
      {
        name: 'Portnox',
        data: Object.values(frameworkData)
      }
    ];
    
    // Add competitors if selected
    const selectedVendors = window.sidebarManager ? window.sidebarManager.getSelectedVendors() : [];
    
    if (selectedVendors.includes('cisco')) {
      series.push({
        name: 'Cisco ISE',
        data: Object.values(competitorData.cisco)
      });
    }
    
    if (selectedVendors.includes('forescout')) {
      series.push({
        name: 'Forescout',
        data: Object.values(competitorData.forescout)
      });
    }
    
    const options = {
      ...this.config.theme,
      series: series,
      chart: {
        ...this.config.theme.chart,
        type: 'bar',
        height: 450,
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
          barHeight: '80%',
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
          return val + '%';
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: Object.keys(frameworkData),
        labels: {
          ...this.config.theme.xaxis.labels
        },
        max: 100
      },
      yaxis: {
        title: {
          text: 'Compliance Frameworks',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      },
      colors: [
        window.ChartConfig ? window.ChartConfig.getVendorColor('portnox') : '#1a5a96',
        window.ChartConfig ? window.ChartConfig.getVendorColor('cisco') : '#00bceb',
        window.ChartConfig ? window.ChartConfig.getVendorColor('forescout') : '#7a2a90'
      ],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '% Coverage';
          }
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        offsetY: 10
      },
      title: {
        text: 'Industry Compliance Framework Coverage',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create Cyber Insurance Impact Chart
   * Bar chart showing insurance premium reductions
   */
  createInsuranceImpactChart(data, elementId, chartId) {
    // Insurance data - percentage reduction in premiums
    const insuranceData = {
      'portnox': 25,
      'cisco': 18,
      'aruba': 15,
      'forescout': 20,
      'fortinac': 15
    };
    
    // Filter to selected vendors
    const selectedVendors = window.sidebarManager ? 
      window.sidebarManager.getSelectedVendors() : 
      Object.keys(insuranceData);
    
    const vendors = selectedVendors.filter(v => insuranceData[v] !== undefined);
    
    // Annual premium before reductions
    const annualPremium = 150000;
    
    // Calculate actual dollar savings
    const series = [{
      name: 'Annual Premium Savings',
      data: vendors.map(v => (insuranceData[v] / 100) * annualPremium)
    }];
    
    const options = {
      ...this.config.theme,
      series: series,
      chart: {
        ...this.config.theme.chart,
        type: 'bar',
        height: 400,
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
          borderRadius: 6,
          columnWidth: '60%',
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      colors: vendors.map(v => window.ChartConfig ? window.ChartConfig.getVendorColor(v) : this.config.colors.chart[0]),
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return window.ChartConfig ? 
            window.ChartConfig.formatCurrency(val) : 
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(val);
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#333"]
        }
      },
      xaxis: {
        categories: vendors.map(v => window.VENDORS ? window.VENDORS[v].name : v),
        labels: {
          ...this.config.theme.xaxis.labels
        }
      },
      yaxis: {
        title: {
          text: 'Annual Premium Savings ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const vendorId = vendors[dataPointIndex];
          const vendorName = window.VENDORS ? window.VENDORS[vendorId].name : vendorId;
          const value = series[seriesIndex][dataPointIndex];
          const percent = insuranceData[vendorId];
          
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${vendorName}</div>
              <div class="tooltip-value">${window.ChartConfig ? 
                window.ChartConfig.formatCurrency(value) : 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(value)}</div>
              <div>Premium reduction: ${percent}%</div>
              <div>Base premium: ${window.ChartConfig ? 
                window.ChartConfig.formatCurrency(annualPremium) : 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(annualPremium)}</div>
            </div>
          `;
        }
      },
      legend: {
        show: false
      },
      title: {
        text: 'Cyber Insurance Premium Reduction',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      },
      annotations: {
        points: vendors.indexOf('portnox') >= 0 ? [
          {
            x: window.VENDORS ? window.VENDORS['portnox'].name : 'portnox',
            y: (insuranceData['portnox'] / 100) * annualPremium,
            marker: {
              size: 0
            },
            label: {
              text: 'Highest Savings',
              borderColor: window.ChartConfig ? window.ChartConfig.getVendorColor('portnox') : this.config.colors.chart[0],
              style: {
                background: window.ChartConfig ? window.ChartConfig.getVendorColor('portnox') : this.config.colors.chart[0],
                color: '#fff',
                fontSize: '11px',
                fontWeight: 600
              },
              offsetY: -15
            }
          }
        ] : []
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create Breach Impact Chart
   * Bar chart comparing data breach costs with and without NAC
   */
  createBreachImpactChart(data, elementId, chartId) {
    // Define breach impact data
    const breachCost = 4800000; // Average cost of a data breach
    const breachProbability = 0.32; // Probability of a breach without NAC
    
    // Reduction percentages for different vendors
    const riskReduction = {
      'portnox': 0.89,
      'cisco': 0.76,
      'aruba': 0.74,
      'forescout': 0.81,
      'fortinac': 0.72
    };
    
    // Filter to selected vendors
    const selectedVendors = window.sidebarManager ? 
      window.sidebarManager.getSelectedVendors() : 
      Object.keys(riskReduction);
    
    const vendors = selectedVendors.filter(v => riskReduction[v] !== undefined);
    
    // Calculate expected annual loss (EAL)
    const withoutNac = breachCost * breachProbability;
    const vendorEALs = vendors.map(v => withoutNac * (1 - riskReduction[v]));
    
    // Create series data
    const series = [
      {
        name: 'Expected Annual Loss',
        data: [...vendorEALs, withoutNac]
      }
    ];
    
    const options = {
      ...this.config.theme,
      series: series,
      chart: {
        ...this.config.theme.chart,
        type: 'bar',
        height: 400,
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
          borderRadius: 6,
          columnWidth: '60%',
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      colors: [
        ...vendors.map(v => window.ChartConfig ? window.ChartConfig.getVendorColor(v) : this.config.colors.chart[0]), 
        '#777777' // color for "No NAC"
      ],
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return window.ChartConfig ? 
            window.ChartConfig.formatCurrency(val) : 
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(val);
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#333"]
        }
      },
      xaxis: {
        categories: [
          ...vendors.map(v => window.VENDORS ? window.VENDORS[v].name : v),
          'No NAC'
        ],
        labels: {
          ...this.config.theme.xaxis.labels
        }
      },
      yaxis: {
        title: {
          text: 'Expected Annual Loss ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const categories = [
            ...vendors.map(v => window.VENDORS ? window.VENDORS[v].name : v),
            'No NAC'
          ];
          
          const vendorName = categories[dataPointIndex];
          const value = series[seriesIndex][dataPointIndex];
          
          let reduction = 0;
          let reductionPercent = 0;
          
          if (dataPointIndex < vendors.length) {
            reduction = withoutNac - value;
            reductionPercent = riskReduction[vendors[dataPointIndex]] * 100;
          }
          
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${vendorName}</div>
              <div class="tooltip-value">${window.ChartConfig ? 
                window.ChartConfig.formatCurrency(value) : 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(value)}</div>
              ${dataPointIndex < vendors.length ? `
                <div style="color:#2ecc71">Risk reduction: ${reductionPercent.toFixed(0)}%</div>
                <div style="color:#2ecc71">Savings: ${window.ChartConfig ? 
                  window.ChartConfig.formatCurrency(reduction) : 
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(reduction)}</div>
              ` : ''}
              <div>Based on an average breach cost of ${window.ChartConfig ? 
                window.ChartConfig.formatCurrency(breachCost) : 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(breachCost)}</div>
            </div>
          `;
        }
      },
      legend: {
        show: false
      },
      title: {
        text: 'Data Breach Cost Impact Analysis',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create Industry Breach Data Chart
   * Shows breach statistics across different industries
   */
  createIndustryBreachChart(data, elementId, chartId) {
    // Industry breach data
    const industryData = [
      { industry: 'Healthcare', breachCost: 9230000, records: 29000 },
      { industry: 'Financial', breachCost: 5850000, records: 22000 },
      { industry: 'Technology', breachCost: 5150000, records: 25000 },
      { industry: 'Energy & Utilities', breachCost: 4770000, records: 21000 },
      { industry: 'Education', breachCost: 3850000, records: 28000 },
      { industry: 'Retail', breachCost: 3270000, records: 19000 },
      { industry: 'Manufacturing', breachCost: 4100000, records: 17000 }
    ];
    
    const series = [{
      name: 'Average Breach Cost',
      data: industryData.map(item => item.breachCost)
    }];
    
    const options = {
      ...this.config.theme,
      series: series,
      chart: {
        ...this.config.theme.chart,
        type: 'bar',
        height: 400,
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
          horizontal: false,
          columnWidth: '70%',
          borderRadius: 6,
          colors: {
            ranges: [{
              from: 0,
              to: 4000000,
              color: '#2ecc71'
            }, {
              from: 4000001,
              to: 6000000,
              color: '#f39c12'
            }, {
              from: 6000001,
              to: 10000000,
              color: '#e74c3c'
            }]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: industryData.map(item => item.industry),
        labels: {
          ...this.config.theme.xaxis.labels
        }
      },
      yaxis: {
        title: {
          text: 'Average Breach Cost ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return window.ChartConfig ? 
              window.ChartConfig.formatCurrency(val) : 
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(val);
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const industry = industryData[dataPointIndex].industry;
          const cost = industryData[dataPointIndex].breachCost;
          const records = industryData[dataPointIndex].records;
          
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${industry}</div>
              <div class="tooltip-value">${window.ChartConfig ? 
                window.ChartConfig.formatCurrency(cost) : 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(cost)}</div>
              <div>Average records exposed: ${records.toLocaleString()}</div>
              <div>Per record cost: ${window.ChartConfig ? 
                window.ChartConfig.formatCurrency(cost / records) : 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(cost / records)}</div>
            </div>
          `;
        }
      },
      colors: ['#1a5a96'],
      title: {
        text: 'Data Breach Costs by Industry',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      },
      annotations: {
        points: [{
          x: 'Healthcare',
          y: 9230000,
          marker: {
            size: 5,
            fillColor: '#e74c3c',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Highest Risk',
            borderColor: '#e74c3c',
            style: {
              background: '#e74c3c',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create Technical Impact Radar Chart
   * Compares technical capabilities across vendors
   */
  createTechnicalRadarChart(data, elementId, chartId) {
    // Technical dimensions for comparison
    const dimensions = [
      'Cloud Integration', 
      'Legacy Support', 
      'Wireless', 
      'BYOD', 
      'IoT', 
      'Remote Access'
    ];
    
    // Selected vendors for comparison
    const selectedVendors = window.sidebarManager ? 
      window.sidebarManager.getSelectedVendors() : 
      ['portnox', 'cisco', 'forescout'];
    
    // Technical ratings (0-100 scale)
    const vendorRatings = {
      'portnox': [95, 85, 90, 95, 90, 95],
      'cisco': [75, 90, 85, 80, 75, 80],
      'forescout': [70, 85, 80, 85, 90, 75],
      'aruba': [70, 80, 95, 85, 80, 80],
      'fortinac': [65, 85, 80, 75, 80, 70]
    };
    
    // Create series from selected vendors
    const series = selectedVendors
      .filter(v => vendorRatings[v] !== undefined)
      .map(vendorId => ({
        name: window.VENDORS ? window.VENDORS[vendorId].name : vendorId,
        data: vendorRatings[vendorId]
      }));
    
    const options = {
      ...this.config.theme,
      series: series,
      chart: {
        ...this.config.theme.chart,
        type: 'radar',
        height: 500,
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        },
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        }
      },
      stroke: {
        width: 2
      },
      fill: {
        opacity: 0.1
      },
      markers: {
        size: 5,
        hover: {
          size: 7
        }
      },
      xaxis: {
        categories: dimensions
      },
      yaxis: {
        max: 100,
        labels: {
          formatter: function(val) {
            return val + '%';
          }
        }
      },
      colors: selectedVendors
        .filter(v => vendorRatings[v] !== undefined)
        .map(v => window.ChartConfig ? window.ChartConfig.getVendorColor(v) : this.config.colors.chart[0]),
      title: {
        text: 'Technical Capabilities Comparison',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 600
        }
      },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        offsetY: 10
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      // Create and store new chart
      this.charts[chartId] = new ApexCharts(element, options);
      this.charts[chartId].render();
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Initialize charts for Executive View
   */
  initExecutiveCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['tcoComparisonChart', 'cumulativeCostChart', 'roiChart', 'valueDriversChart']);
    
    // Create TCO comparison chart
    this.createTcoComparisonChart(resultsData, 'tco-comparison-chart', 'tcoComparisonChart');
    
    // Create cumulative cost chart
    this.createCumulativeCostChart(resultsData, 'cumulative-cost-chart', 'cumulativeCostChart');
    
    // Create ROI chart
    this.createRoiChart(resultsData, 'roi-chart', 'roiChart');
    
    // Create value drivers chart
    this.createValueDriversChart(resultsData, 'value-drivers-chart', 'valueDriversChart');
    
    return this.charts;
  }
  
  /**
   * Initialize charts for Security & Compliance View
   */
  initSecurityCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['securityFrameworksChart', 'breachImpactChart', 'insuranceImpactChart', 'industryBreachChart']);
    
    // Create security frameworks chart
    this.createSecurityFrameworksChart(resultsData, 'security-frameworks-chart', 'securityFrameworksChart');
    
    // Create breach impact chart
    this.createBreachImpactChart(resultsData, 'breach-impact-chart', 'breachImpactChart');
    
    // Create insurance impact chart
    this.createInsuranceImpactChart(resultsData, 'insurance-impact-chart', 'insuranceImpactChart');
    
    // Create industry breach chart
    this.createIndustryBreachChart(resultsData, 'industry-breach-chart', 'industryBreachChart');
    
    return this.charts;
  }
  
  /**
   * Initialize charts for Technical View
   */
  initTechnicalCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['technicalRadarChart']);
    
    // Create technical radar chart
    this.createTechnicalRadarChart(resultsData, 'technical-radar-chart', 'technicalRadarChart');
    
    return this.charts;
  }
  
  /**
   * Helper method to destroy charts
   */
  destroyCharts(chartIds) {
    chartIds.forEach(id => {
      if (this.charts[id]) {
        try {
          this.charts[id].destroy();
        } catch (e) {
          console.error(`Error destroying chart ${id}:`, e);
        }
        delete this.charts[id];
      }
    });
  }
}

// Create global instance
window.apexChartManager = new ApexChartManager();

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ApexChartManager };
}
EOL

echo -e "${GREEN}Enhanced ApexCharts implementation created${NC}"

# ================================================================
# 4. D3 Chart Implementation
# ================================================================
echo -e "${CYAN}Creating D3 chart implementation...${NC}"

# Ensure directory exists
check_dir "$CHARTS_DIR/d3"

cat > "$CHARTS_DIR/d3/d3-manager.js" << 'EOL'
/**
 * Enhanced D3 implementation for Portnox Total Cost Analyzer
 * Creates advanced, interactive visualizations for complex data
 */

class D3Manager {
  constructor(config = {}) {
    this.config = {
      colors: window.ChartConfig ? window.ChartConfig.colors : {
        chart: ['#1a5a96', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6', '#3498db']
      },
      theme: window.ChartConfig ? window.ChartConfig.d3Theme : {
        fontFamily: "'Nunito', sans-serif"
      },
      ...config
    };
    
    this.charts = {};
    
    // Initialize responsive handlers
    this.initResponsiveHandlers();
  }
  
  /**
   * Initialize responsive handlers for resizing
   */
  initResponsiveHandlers() {
    // Debounced resize handler for chart responsiveness
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Redraw all active charts on resize
        Object.keys(this.charts).forEach(chartId => {
          const chart = this.charts[chartId];
          if (chart && chart.resize) {
            chart.resize();
          }
        });
      }, 250);
    });
    
    // Handle theme changes
    window.addEventListener('themechange', () => {
      // Update all active charts with new theme
      Object.keys(this.charts).forEach(chartId => {
        const chart = this.charts[chartId];
        if (chart && chart.updateTheme) {
          chart.updateTheme();
        }
      });
    });
  }
  
  /**
   * Create Vendor Comparison Heatmap
   * Shows strengths and weaknesses across different categories
   */
  createVendorHeatmap(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.d3) return null;
    
    // Clear any existing chart
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    
    // Define comparison data
    const categories = [
      'Implementation', 'User Experience', 'Cloud Integration', 
      'On-Premises Support', 'Legacy Devices', 'BYOD Support',
      'IoT Security', 'API Flexibility', 'Compliance', 'Cost Efficiency'
    ];
    
    // Selected vendors for comparison
    const selectedVendors = window.sidebarManager ? 
      window.sidebarManager.getSelectedVendors() : 
      ['portnox', 'cisco', 'forescout'];
    
    // Vendor capabilities data (0-100 scale)
    const vendorCapabilities = {
      'portnox': {
        'Implementation': 95,
        'User Experience': 90,
        'Cloud Integration': 95,
        'On-Premises Support': 80,
        'Legacy Devices': 85,
        'BYOD Support': 95,
        'IoT Security': 90,
        'API Flexibility': 90,
        'Compliance': 95,
        'Cost Efficiency': 95
      },
      'cisco': {
        'Implementation': 70,
        'User Experience': 75,
        'Cloud Integration': 75,
        'On-Premises Support': 90,
        'Legacy Devices': 90,
        'BYOD Support': 80,
        'IoT Security': 85,
        'API Flexibility': 75,
        'Compliance': 90,
        'Cost Efficiency': 65
      },
      'forescout': {
        'Implementation': 75,
        'User Experience': 80,
        'Cloud Integration': 70,
        'On-Premises Support': 85,
        'Legacy Devices': 90,
        'BYOD Support': 85,
        'IoT Security': 90,
        'API Flexibility': 80,
        'Compliance': 85,
        'Cost Efficiency': 70
      },
      'aruba': {
        'Implementation': 75,
        'User Experience': 80,
        'Cloud Integration': 75,
        'On-Premises Support': 85,
        'Legacy Devices': 80,
        'BYOD Support': 85,
        'IoT Security': 80,
        'API Flexibility': 75,
        'Compliance': 85,
        'Cost Efficiency': 75
      },
      'fortinac': {
        'Implementation': 70,
        'User Experience': 75,
        'Cloud Integration': 65,
        'On-Premises Support': 85,
        'Legacy Devices': 85,
        'BYOD Support': 75,
        'IoT Security': 80,
        'API Flexibility': 70,
        'Compliance': 80,
        'Cost Efficiency': 70
      }
    };
    
    // Filter vendors
    const vendors = selectedVendors.filter(v => vendorCapabilities[v] !== undefined);
    
    // Create heatmap data
    const heatmapData = [];
    vendors.forEach(vendorId => {
      categories.forEach(category => {
        heatmapData.push({
          vendor: window.VENDORS ? window.VENDORS[vendorId].name : vendorId,
          vendorId: vendorId,
          category: category,
          value: vendorCapabilities[vendorId][category]
        });
      });
    });
    
    // Get theme
    const isDarkMode = document.body.classList.contains('dark-mode');
    const theme = window.ChartConfig ? window.ChartConfig.getCurrentTheme() : 
      (isDarkMode ? this.config.colors.dark : this.config.colors.light);
    
    // Set dimensions
    const margin = { top: 50, right: 80, bottom: 70, left: 140 };
    const width = Math.max(600, element.clientWidth) - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Scales
    const x = d3.scaleBand()
      .range([0, width])
      .domain(categories)
      .padding(0.05);
    
    const y = d3.scaleBand()
      .range([height, 0])
      .domain(vendors.map(v => window.VENDORS ? window.VENDORS[v].name : v))
      .padding(0.05);
    
    // Color scale
    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateViridis)
      .domain([0, 100]);
    
    // Add axes
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '12px')
      .style('fill', theme.textColor);
    
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', theme.textColor);
    
    // Create tooltip
    const tooltip = d3.select(element)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('background-color', theme.cardBackground)
      .style('color', theme.textColor)
      .style('border', `1px solid ${theme.borderColor}`)
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('box-shadow', '0 4px 10px rgba(0, 0, 0, 0.15)')
      .style('pointer-events', 'none')
      .style('z-index', 10)
      .style('font-family', this.config.theme.fontFamily)
      .style('font-size', '12px');
    
    // Mouse functions
    const mouseover = function(event, d) {
      tooltip.style('opacity', 1);
      d3.select(this)
        .style('stroke', 'black')
        .style('opacity', 1);
    };
    
    const mousemove = function(event, d) {
      // Find Portnox value for comparison
      let comparisonText = '';
      if (d.vendorId !== 'portnox' && vendors.includes('portnox')) {
        const portnoxValue = vendorCapabilities['portnox'][d.category];
        const diff = d.value - portnoxValue;
        if (Math.abs(diff) > 0) {
          if (diff < 0) {
            comparisonText = `<br><span style="color:#e74c3c;">${Math.abs(diff)} points below Portnox</span>`;
          } else {
            comparisonText = `<br><span style="color:#2ecc71;">${diff} points above Portnox</span>`;
          }
        }
      }
      
      // Show tooltip
      tooltip
        .html(`
          <strong>${d.vendor}</strong><br>
          ${d.category}: <strong>${d.value}/100</strong>
          ${comparisonText}
        `)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 15) + 'px');
    };
    
    const mouseleave = function(event, d) {
      tooltip.style('opacity', 0);
      d3.select(this)
        .style('stroke', 'none')
        .style('opacity', 0.9);
    };
    
    // Add cells with animation
    const cells = svg.selectAll()
      .data(heatmapData)
      .enter()
      .append('rect')
      .attr('x', d => x(d.category))
      .attr('y', d => y(d.vendor))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => colorScale(d.value))
      .style('rx', 3)
      .style('ry', 3)
      .style('stroke-width', 0)
      .style('opacity', 0)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);
    
    // Add animation
    cells.transition()
      .duration(700)
      .delay((d, i) => i * 20)
      .style('opacity', 0.9);
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', theme.textColor)
      .text('Vendor Capability Comparison');
    
    // Add legend
    const legendWidth = 20;
    const legendHeight = 150;
    
    const defs = svg.append('defs');
    
    // Create gradient for legend
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'heatmap-gradient')
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '0%')
      .attr('y2', '0%');
    
    // Add color stops
    linearGradient.selectAll('stop')
      .data(d3.range(0, 1.01, 0.1))
      .enter()
      .append('stop')
      .attr('offset', d => d * 100 + '%')
      .attr('stop-color', d => colorScale(d * 100));
    
    // Add legend rectangle
    svg.append('rect')
      .attr('x', width + 20)
      .attr('y', 0)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#heatmap-gradient)')
      .style('rx', 3)
      .style('ry', 3);
    
    // Add legend scale
    const legendScale = d3.scaleLinear()
      .domain([0, 100])
      .range([legendHeight, 0]);
    
    const legendAxis = d3.axisRight(legendScale)
      .tickValues([0, 25, 50, 75, 100])
      .tickFormat(d => d + '%');
    
    svg.append('g')
      .attr('transform', `translate(${width + 20 + legendWidth},0)`)
      .call(legendAxis)
      .selectAll('text')
      .style('font-size', '10px')
      .style('fill', theme.textColor);
    
    // Add legend title
    svg.append('text')
      .attr('transform', `translate(${width + 20 + legendWidth / 2},${legendHeight + 35})`)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', theme.textColor)
      .text('Score');
    
    // Store reference for updates
    this.charts[chartId] = {
      svg,
      data: heatmapData,
      resize: () => {
        // Resize handling
        const newWidth = Math.max(600, element.clientWidth) - margin.left - margin.right;
        
        // Update scales
        x.range([0, newWidth]);
        
        // Update elements
        svg.selectAll('rect')
          .filter(function() { return !this.classList.contains('legend-rect'); })
          .attr('x', d => x(d.category))
          .attr('width', x.bandwidth());
          
        // Update legend position
        svg.selectAll('.legend')
          .attr('transform', `translate(${newWidth + 20},0)`);
          
        // Update title position
        svg.select('text').attr('x', newWidth / 2);
      },
      updateTheme: () => {
        // Update theme colors
        const newTheme = window.ChartConfig ? window.ChartConfig.getCurrentTheme() : 
          (document.body.classList.contains('dark-mode') ? this.config.colors.dark : this.config.colors.light);
        
        // Update text colors
        svg.selectAll('text').style('fill', newTheme.textColor);
        svg.selectAll('.x-axis text, .y-axis text').style('fill', newTheme.textColor);
        
        // Update tooltip style
        tooltip
          .style('background-color', newTheme.cardBackground)
          .style('color', newTheme.textColor)
          .style('border', `1px solid ${newTheme.borderColor}`);
      },
      destroy: () => {
        // Remove chart
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
    };
    
    return this.charts[chartId];
  }
  
  /**
   * Create NIST Framework Radar Chart
   * Shows coverage across different NIST Cybersecurity Framework categories
   */
  createNistFrameworkChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.d3) return null;
    
    // Clear any existing chart
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    
    // Define NIST framework categories
    const categories = [
      'Identify', 'Protect', 'Detect', 'Respond', 'Recover'
    ];
    
    // Selected vendors for comparison
    const selectedVendors = window.sidebarManager ? 
      window.sidebarManager.getSelectedVendors() : 
      ['portnox', 'cisco', 'forescout'];
      
    // NIST framework coverage data (0-100 scale)
    const frameworkCoverage = {
      'portnox': {
        'Identify': 92,
        'Protect': 95,
        'Detect': 90,
        'Respond': 85,
        'Recover': 80
      },
      'cisco': {
        'Identify': 85,
        'Protect': 90,
        'Detect': 85,
        'Respond': 80,
        'Recover': 75
      },
      'forescout': {
        'Identify': 90,
        'Protect': 85,
        'Detect': 90,
        'Respond': 80,
        'Recover': 70
      },
      'aruba': {
        'Identify': 80,
        'Protect': 85,
        'Detect': 80,
        'Respond': 75,
        'Recover': 70
      },
      'fortinac': {
        'Identify': 80,
        'Protect': 80,
        'Detect': 85,
        'Respond': 75,
        'Recover': 65
      }
    };
    
    // Filter vendors
    const vendors = selectedVendors.filter(v => frameworkCoverage[v] !== undefined);
    
    // Get theme
    const isDarkMode = document.body.classList.contains('dark-mode');
    const theme = window.ChartConfig ? window.ChartConfig.getCurrentTheme() : 
      (isDarkMode ? this.config.colors.dark : this.config.colors.light);
    
    // Set dimensions
    const margin = { top: 70, right: 70, bottom: 70, left: 70 };
    const width = Math.min(600, element.clientWidth) - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    
    // Create SVG
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left + width/2},${margin.top + height/2})`);
    
    // Scales and axes
    const angleScale = d3.scalePoint()
      .range([0, 2 * Math.PI])
      .domain(categories)
      .padding(0.5);
    
    const radiusScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, 100]);
    
    // Create axes (spokes)
    categories.forEach(category => {
      const angle = angleScale(category);
      
      // Draw axis line
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', radius * Math.cos(angle - Math.PI / 2))
        .attr('y2', radius * Math.sin(angle - Math.PI / 2))
        .attr('stroke', theme.borderColor)
        .attr('stroke-width', 1)
        .attr('opacity', 0.7);
      
      // Add axis label
      svg.append('text')
        .attr('x', (radius + 20) * Math.cos(angle - Math.PI / 2))
        .attr('y', (radius + 20) * Math.sin(angle - Math.PI / 2))
        .attr('text-anchor', angle === 0 || angle === Math.PI ? 'middle' : (angle < Math.PI ? 'start' : 'end'))
        .attr('dominant-baseline', angle === Math.PI / 2 || angle === 3 * Math.PI / 2 ? 'middle' : (angle < Math.PI ? 'hanging' : 'auto'))
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', theme.textColor)
        .text(category);
    });
    
    // Draw concentric circles
    [20, 40, 60, 80, 100].forEach(value => {
      svg.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', radiusScale(value))
        .attr('fill', 'none')
        .attr('stroke', theme.borderColor)
        .attr('stroke-width', value === 100 ? 1.5 : 0.7)
        .attr('stroke-dasharray', value % 40 === 0 ? 'none' : '2,2')
        .attr('opacity', value === 100 ? 0.7 : 0.4);
        
      // Add value label (only for major ticks)
      if (value % 40 === 0) {
        svg.append('text')
          .attr('x', 5)
          .attr('y', -radiusScale(value) + 3)
          .attr('font-size', '10px')
          .attr('fill', theme.textLight)
          .text(value);
      }
    });
    
    // Create tooltip
    const tooltip = d3.select(element)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('background-color', theme.cardBackground)
      .style('color', theme.textColor)
      .style('border', `1px solid ${theme.borderColor}`)
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('box-shadow', '0 4px 10px rgba(0, 0, 0, 0.15)')
      .style('pointer-events', 'none')
      .style('z-index', 10)
      .style('font-family', this.config.theme.fontFamily)
      .style('font-size', '12px');
    
    // Create line generator
    const lineGenerator = d3.lineRadial()
      .angle(d => angleScale(d.category) - Math.PI / 2)
      .radius(d => radiusScale(d.value))
      .curve(d3.curveLinearClosed);
    
    // Create paths for each vendor
    vendors.forEach((vendorId, index) => {
      // Create data array
      const vendorData = categories.map(category => ({
        category: category,
        value: frameworkCoverage[vendorId][category]
      }));
      
      // Get vendor color
      const vendorColor = window.ChartConfig ? 
        window.ChartConfig.getVendorColor(vendorId) : 
        this.config.colors.chart[index % this.config.colors.chart.length];
      
      // Create path with animation
      const path = svg.append('path')
        .datum(vendorData)
        .attr('fill', vendorColor)
        .attr('fill-opacity', 0.2)
        .attr('stroke', vendorColor)
        .attr('stroke-width', 2)
        .attr('d', lineGenerator)
        .attr('opacity', 0);
      
      // Animate path
      path.transition()
        .duration(1000)
        .delay(index * 200)
        .attr('opacity', 1);
      
      // Add points with tooltips
      vendorData.forEach((d, i) => {
        const angle = angleScale(d.category) - Math.PI / 2;
        const x = radiusScale(d.value) * Math.cos(angle);
        const y = radiusScale(d.value) * Math.sin(angle);
        
        svg.append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 5)
          .attr('fill', vendorColor)
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5)
          .attr('opacity', 0)
          .on('mouseover', function(event) {
            d3.select(this).attr('r', 7);
            tooltip.style('opacity', 1);
          })
          .on('mousemove', function(event) {
            tooltip
              .html(`
                <strong>${window.VENDORS ? window.VENDORS[vendorId].name : vendorId}</strong><br>
                ${d.category}: <strong>${d.value}%</strong>
              `)
              .style('left', (event.pageX + 10) + 'px')
              .style('top', (event.pageY - 15) + 'px');
          })
          .on('mouseleave', function() {
            d3.select(this).attr('r', 5);
            tooltip.style('opacity', 0);
          })
          .transition()
          .duration(500)
          .delay(index * 200 + 200 + i * 100)
          .attr('opacity', 1);
      });
    });
    
    // Add title
    svg.append('text')
      .attr('x', 0)
      .attr('y', -radius - 40)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .attr('fill', theme.textColor)
      .text('NIST Cybersecurity Framework Coverage');
    
    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${0},${radius + 30})`);
      
    vendors.forEach((vendorId, i) => {
      const vendorColor = window.ChartConfig ? 
        window.ChartConfig.getVendorColor(vendorId) : 
        this.config.colors.chart[i % this.config.colors.chart.length];
      
      const legendItem = legend.append('g')
        .attr('transform', `translate(${(-vendors.length / 2 + i) * 120},0)`)
        .style('cursor', 'pointer')
        .on('mouseover', function() {
          // Highlight this vendor's path
          svg.selectAll('path')
            .filter((d, j) => j !== i)
            .transition()
            .duration(200)
            .attr('opacity', 0.2);
        })
        .on('mouseleave', function() {
          // Reset all paths
          svg.selectAll('path')
            .transition()
            .duration(200)
            .attr('opacity', 1);
        });
      
      legendItem.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('rx', 2)
        .attr('fill', vendorColor);
      
      legendItem.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .attr('font-size', '12px')
        .attr('fill', theme.textColor)
        .text(window.VENDORS ? window.VENDORS[vendorId].name : vendorId);
    });
    
    // Store reference for updates
    this.charts[chartId] = {
      svg,
      resize: () => {
        // Resize functionality
      },
      updateTheme: () => {
        // Theme update functionality
      },
      destroy: () => {
        // Remove chart
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
    };
    
    return this.charts[chartId];
  }
  
  /**
   * Create Threat Model Visualization
   * Shows different threat types and their impact before/after NAC
   */
  createThreatModelVisualization(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.d3) return null;
    
    // Clear any existing chart
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    
    // Define threat categories and impact
    const threats = [
      { name: 'Unauthorized Access', beforeNAC: 85, afterNAC: 25, description: 'External actors gaining access to network resources' },
      { name: 'Data Exfiltration', beforeNAC: 75, afterNAC: 30, description: 'Theft of sensitive data from the network' },
      { name: 'Lateral Movement', beforeNAC: 80, afterNAC: 20, description: 'Attackers moving between systems after initial breach' },
      { name: 'Shadow IT', beforeNAC: 70, afterNAC: 15, description: 'Unauthorized devices and applications on network' },
      { name: 'Malware Spread', beforeNAC: 75, afterNAC: 30, description: 'Rapid infection across network systems' },
      { name: 'Device Spoofing', beforeNAC: 90, afterNAC: 10, description: 'Impersonation of legitimate network devices' },
      { name: 'Privilege Escalation', beforeNAC: 65, afterNAC: 35, description: 'Gaining higher access rights than authorized' }
    ];
    
    // Get theme
    const isDarkMode = document.body.classList.contains('dark-mode');
    const theme = window.ChartConfig ? window.ChartConfig.getCurrentTheme() : 
      (isDarkMode ? this.config.colors.dark : this.config.colors.light);
    
    // Set dimensions
    const margin = { top: 50, right: 180, bottom: 70, left: 150 };
    const width = Math.max(500, element.clientWidth) - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Scales
    const y = d3.scaleBand()
      .range([0, height])
      .domain(threats.map(d => d.name))
      .padding(0.2);
    
    const x = d3.scaleLinear()
      .range([0, width])
      .domain([0, 100]);
    
    // Axes
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => d + '%'))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', theme.textColor);
    
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', theme.textColor);
    
    // Create tooltip
    const tooltip = d3.select(element)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('background-color', theme.cardBackground)
      .style('color', theme.textColor)
      .style('border', `1px solid ${theme.borderColor}`)
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('box-shadow', '0 4px 10px rgba(0, 0, 0, 0.15)')
      .style('pointer-events', 'none')
      .style('z-index', 10)
      .style('font-family', this.config.theme.fontFamily)
      .style('font-size', '12px')
      .style('max-width', '250px');
    
    // Add bars for before NAC (risk level)
    svg.selectAll('.bar-before')
      .data(threats)
      .enter()
      .append('rect')
      .attr('class', 'bar-before')
      .attr('y', d => y(d.name))
      .attr('height', y.bandwidth() / 2)
      .attr('x', 0)
      .attr('width', 0) // Start at 0 for animation
      .attr('fill', '#e74c3c')
      .attr('opacity', 0.8)
      .attr('rx', 4)
      .attr('ry', 4)
      .on('mouseover', function(event, d) {
        tooltip.style('opacity', 1);
        d3.select(this).attr('opacity', 1);
      })
      .on('mousemove', function(event, d) {
        tooltip
          .html(`
            <strong>${d.name}</strong><br>
            <div>${d.description}</div><br>
            <strong>Risk Level Before NAC:</strong> ${d.beforeNAC}%
          `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 15) + 'px');
      })
      .on('mouseleave', function() {
        tooltip.style('opacity', 0);
        d3.select(this).attr('opacity', 0.8);
      })
      // Animate the bars
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr('width', d => x(d.beforeNAC));
    
    // Add bars for after NAC (reduced risk)
    svg.selectAll('.bar-after')
      .data(threats)
      .enter()
      .append('rect')
      .attr('class', 'bar-after')
      .attr('y', d => y(d.name) + y.bandwidth() / 2)
      .attr('height', y.bandwidth() / 2)
      .attr('x', 0)
      .attr('width', 0) // Start at 0 for animation
      .attr('fill', '#2ecc71')
      .attr('opacity', 0.8)
      .attr('rx', 4)
      .attr('ry', 4)
      .on('mouseover', function(event, d) {
        tooltip.style('opacity', 1);
        d3.select(this).attr('opacity', 1);
      })
      .on('mousemove', function(event, d) {
        const reduction = d.beforeNAC - d.afterNAC;
        tooltip
          .html(`
            <strong>${d.name}</strong><br>
            <div>${d.description}</div><br>
            <strong>Risk Level After NAC:</strong> ${d.afterNAC}%<br>
            <strong>Reduction:</strong> ${reduction}% (${Math.round(reduction / d.beforeNAC * 100)}%)
          `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 15) + 'px');
      })
      .on('mouseleave', function() {
        tooltip.style('opacity', 0);
        d3.select(this).attr('opacity', 0.8);
      })
      // Animate the bars
      .transition()
      .duration(1000)
      .delay((d, i) => 500 + i * 100)
      .attr('width', d => x(d.afterNAC));
    
    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width + 20},0)`);
    
    // Before NAC legend item
    const beforeLegend = legend.append('g')
      .attr('transform', 'translate(0,0)');
    
    beforeLegend.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', '#e74c3c')
      .attr('opacity', 0.8)
      .attr('rx', 2)
      .attr('ry', 2);
    
    beforeLegend.append('text')
      .attr('x', 25)
      .attr('y', 12)
      .attr('font-size', '12px')
      .attr('fill', theme.textColor)
      .text('Before NAC');
    
    // After NAC legend item
    const afterLegend = legend.append('g')
      .attr('transform', 'translate(0,25)');
    
    afterLegend.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', '#2ecc71')
      .attr('opacity', 0.8)
      .attr('rx', 2)
      .attr('ry', 2);
    
    afterLegend.append('text')
      .attr('x', 25)
      .attr('y', 12)
      .attr('font-size', '12px')
      .attr('fill', theme.textColor)
      .text('After NAC');
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .attr('fill', theme.textColor)
      .text('Threat Impact Analysis');
    
    // Add subtitle
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', theme.textLight)
      .text('Risk level before and after implementing NAC');
    
    // Add X-axis label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', theme.textColor)
      .text('Risk Level (%)');
    
    // Store reference for updates
    this.charts[chartId] = {
      svg,
      resize: () => {
        // Resize functionality
      },
      updateTheme: () => {
        // Theme update functionality
      },
      destroy: () => {
        // Remove chart
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
    };
    
    return this.charts[chartId];
  }
  
  /**
   * Initialize charts for Security & Compliance View
   */
  initSecurityCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['nistFrameworkChart', 'threatModelChart']);
    
    // Create NIST framework radar chart
    this.createNistFrameworkChart(resultsData, 'nist-framework-chart', 'nistFrameworkChart');
    
    // Create threat model visualization
    this.createThreatModelVisualization(resultsData, 'threat-model-chart', 'threatModelChart');
    
    return this.charts;
  }
  
  /**
   * Initialize charts for Executive View
   */
  initExecutiveCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['vendorRadarChart']);
    
    // Create vendor radar chart
    this.createVendorHeatmap(resultsData, 'vendor-radar-chart', 'vendorRadarChart');
    
    return this.charts;
  }
  
  /**
   * Helper method to destroy charts
   */
  destroyCharts(chartIds) {
    chartIds.forEach(id => {
      if (this.charts[id] && this.charts[id].destroy) {
        this.charts[id].destroy();
        delete this.charts[id];
      }
    });
  }
}

// Create global instance
window.d3Manager = new D3Manager();

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { D3Manager };
}
EOL

echo -e "${GREEN}D3 chart implementation created${NC}"

# ================================================================
# 5. Enhanced Executive View Implementation
# ================================================================
echo -e "${CYAN}Creating enhanced Executive View...${NC}"

# Ensure directory exists
check_dir "$VIEWS_DIR"

cat > "$VIEWS_DIR/executive-view.js" << 'EOL'
/**
 * Enhanced Executive View for Portnox Total Cost Analyzer
 * Provides strategic overview with advanced visualizations
 */

class ExecutiveView {
  constructor() {
    this.initialized = false;
    this.container = null;
    this.currentTab = 'executive-summary';
    this.data = null;
  }
  
  /**
   * Initialize the view
   */
  init(viewId = 'executive') {
    console.log('Initializing Executive View...');
    
    // Find container
    this.container = document.querySelector(`.view-panel[data-view="${viewId}"]`);
    
    if (!this.container) {
      console.error(`Container not found for view: ${viewId}`);
      return false;
    }
    
    // Set up tab navigation
    this.initTabs();
    
    // Create html structure for panels if they don't exist
    this.createPanelsIfNeeded();
    
    this.initialized = true;
    return true;
  }
  
  /**
   * Set up tab navigation
   */
  initTabs() {
    const tabsContainer = this.container.querySelector('.results-tabs');
    
    if (!tabsContainer) return;
    
    // Get all tabs
    const tabs = tabsContainer.querySelectorAll('.results-tab');
    
    // Add click event to each tab
    tabs.forEach(tab => {
      const panel = tab.getAttribute('data-panel');
      
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all tabs and panels
        tabs.forEach(t => t.classList.remove('active'));
        
        const panels = this.container.querySelectorAll('.results-panel');
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding panel
        const activePanel = this.container.querySelector(`#${panel}`);
        if (activePanel) {
          activePanel.classList.add('active');
          this.currentTab = panel;
          
          // Refresh charts in this panel
          this.refreshChartsInPanel(panel);
        }
      });
    });
  }
  
  /**
   * Create panels structure if they don't exist
   */
  createPanelsIfNeeded() {
    // Check if panels already exist
    const executiveSummary = this.container.querySelector('#executive-summary');
    const executiveRoi = this.container.querySelector('#executive-roi');
    const executiveRisk = this.container.querySelector('#executive-risk');
    const executiveComparison = this.container.querySelector('#executive-comparison');
    
    // Create executive summary panel if needed
    if (!executiveSummary) {
      this.createExecutiveSummaryPanel();
    }
    
    // Create ROI analysis panel if needed
    if (!executiveRoi) {
      this.createRoiPanel();
    }
    
    // Create risk assessment panel if needed
    if (!executiveRisk) {
      this.createRiskPanel();
    }
    
    // Create vendor comparison panel if needed
    if (!executiveComparison) {
      this.createComparisonPanel();
    }
  }
  
  /**
   * Create executive summary panel
   */
  createExecutiveSummaryPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-summary';
    panel.className = 'results-panel active';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Executive Summary</h2>
        <p class="subtitle">Strategic overview of cost savings and business benefits</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card highlight-card">
          <h3>Total 3-Year Savings</h3>
          <div class="metric-value highlight-value" id="total-savings">$247,000</div>
          <div class="metric-label" id="savings-percentage">48% reduction vs. Cisco ISE</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 15% higher than industry average
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Payback Period</h3>
          <div class="metric-value" id="payback-period">7 months</div>
          <div class="metric-label">Time to positive ROI</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 5 months faster than competitors
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Risk Reduction</h3>
          <div class="metric-value" id="risk-reduction-total">58%</div>
          <div class="metric-label">Overall security improvement</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 20% better than alternatives
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Implementation Time</h3>
          <div class="metric-value" id="implementation-time">21 days</div>
          <div class="metric-label" id="implementation-comparison">75% faster than on-premises</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Leading time-to-security
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>3-Year TCO Comparison</h3>
        <div class="chart-wrapper" id="tco-comparison-chart"></div>
        <div class="chart-legend" id="tco-comparison-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Cumulative Cost Comparison</h3>
        <div class="chart-wrapper" id="cumulative-cost-chart"></div>
        <div class="chart-legend" id="cumulative-cost-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Key Strategic Benefits</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-cloud"></i>
            </div>
            <h4>Cloud-Native Solution</h4>
            <p>Zero infrastructure costs, automatic updates, and global scalability</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-bolt"></i>
            </div>
            <h4>Rapid Deployment</h4>
            <p>75% faster implementation than on-premises alternatives</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h4>Zero Trust Security</h4>
            <p>Comprehensive, continuous device authentication and verification</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <h4>Future-Proof Solution</h4>
            <p>Automatic updates, continuous innovation, and AI-powered security</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create ROI analysis panel
   */
  createRoiPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-roi';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>ROI Analysis</h2>
        <p class="subtitle">Detailed return on investment metrics and value drivers</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card highlight-card">
          <h3>3-Year ROI</h3>
          <div class="metric-value highlight-value" id="roi-percentage">325%</div>
          <div class="metric-label">Return on investment</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 120% higher than industry average
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Annual Savings</h3>
          <div class="metric-value" id="annual-savings">$82,300</div>
          <div class="metric-label">Average yearly benefit</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> 25% above competitors
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Net Present Value</h3>
          <div class="metric-value" id="npv-value">$195,000</div>
          <div class="metric-label">Discounted cash flow value</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Strong investment case
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Payback Period</h3>
          <div class="metric-value" id="payback-detail">7 months</div>
          <div class="metric-label">Time to recoup investment</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Quick value realization
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Return on Investment Comparison</h3>
        <div class="chart-wrapper" id="roi-chart"></div>
        <div class="chart-legend" id="roi-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Value Drivers Analysis</h3>
        <div class="chart-wrapper" id="value-drivers-chart"></div>
        <div class="chart-legend" id="value-drivers-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Value Drivers Explanation</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-dollar-sign"></i>
            </div>
            <h4>Direct Cost Savings</h4>
            <p>Lower hardware, infrastructure, and operating expenses compared to on-premises solutions</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h4>Risk Reduction</h4>
            <p>Reduced incident frequency and impact, resulting in fewer breaches and associated costs</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-user-clock"></i>
            </div>
            <h4>Productivity Gains</h4>
            <p>Less IT staff time spent on maintenance, troubleshooting, and managing access control</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h4>Compliance Benefits</h4>
            <p>Streamlined audits, automated compliance reporting, and reduced regulatory overhead</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create risk assessment panel
   */
  createRiskPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-risk';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Risk Assessment</h2>
        <p class="subtitle">Security risk reduction and financial impact analysis</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card highlight-card">
          <h3>Overall Risk Reduction</h3>
          <div class="metric-value highlight-value" id="risk-reduction-percent">85%</div>
          <div class="metric-label">Improvement in security posture</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Significant threat mitigation
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Breach Cost Avoidance</h3>
          <div class="metric-value" id="breach-cost-reduction">$1.2M</div>
          <div class="metric-label">Reduction in expected annual loss</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Strong risk management ROI
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Insurance Premium Reduction</h3>
          <div class="metric-value" id="insurance-reduction">25%</div>
          <div class="metric-label">Potential cybersecurity insurance savings</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Additional financial benefit
          </div>
        </div>
        
        <div class="dashboard-card">
          <h3>Compliance Coverage</h3>
          <div class="metric-value" id="compliance-coverage">95%</div>
          <div class="metric-label">Framework and regulation coverage</div>
          <div class="metric-trend up">
            <i class="fas fa-arrow-up"></i> Comprehensive controls
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Threat Impact Reduction</h3>
        <div class="chart-wrapper" id="threat-model-chart"></div>
        <div class="chart-legend" id="threat-model-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Data Breach Cost Impact</h3>
        <div class="chart-wrapper" id="breach-impact-chart"></div>
        <div class="chart-legend" id="breach-impact-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Zero Trust Security Benefits</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-user-shield"></i>
            </div>
            <h4>Continuous Authentication</h4>
            <p>Every device and user must authenticate before gaining network access</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-project-diagram"></i>
            </div>
            <h4>Network Segmentation</h4>
            <p>Micro-segmentation prevents lateral movement of threats</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-eye"></i>
            </div>
            <h4>Complete Visibility</h4>
            <p>Full inventory and real-time monitoring of all network devices</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-robot"></i>
            </div>
            <h4>Automated Response</h4>
            <p>Immediate containment and remediation of security incidents</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create vendor comparison panel
   */
  createComparisonPanel() {
    const panel = document.createElement('div');
    panel.id = 'executive-comparison';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
      <div class="panel-header">
        <h2>Vendor Comparison</h2>
        <p class="subtitle">Strategic comparison of NAC solutions across key dimensions</p>
      </div>
      
      <div class="chart-container">
        <h3>Capability Comparison Matrix</h3>
        <div class="chart-wrapper" id="vendor-radar-chart"></div>
        <div class="chart-legend" id="vendor-radar-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Implementation & Maintenance</h3>
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
                <td>Deployment Time</td>
                <td class="highlight-cell">3 weeks</td>
                <td>12-16 weeks</td>
                <td>8-12 weeks</td>
              </tr>
              <tr>
                <td>Implementation Cost</td>
                <td class="highlight-cell">$15,000</td>
                <td>$85,000</td>
                <td>$65,000</td>
              </tr>
              <tr>
                <td>IT Resources Required</td>
                <td class="highlight-cell">0.25 FTE</td>
                <td>2.0 FTE</td>
                <td>1.5 FTE</td>
              </tr>
              <tr>
                <td>Hardware Required</td>
                <td class="highlight-cell">None</td>
                <td>Multiple Servers</td>
                <td>Appliances</td>
              </tr>
              <tr>
                <td>Subscription Model</td>
                <td class="highlight-cell">Per Device</td>
                <td>License Tiers</td>
                <td>License Tiers</td>
              </tr>
              <tr>
                <td>Automatic Updates</td>
                <td class="highlight-cell">Yes</td>
                <td>No</td>
                <td>No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Architecture Comparison</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #1a5a96, #0d4275);">
              <i class="fas fa-cloud"></i>
            </div>
            <h4>Portnox: Cloud-Native</h4>
            <p>No infrastructure, automatic updates, global scalability, rapid deployment, no maintenance overhead</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #00bceb, #0078d4);">
              <i class="fas fa-server"></i>
            </div>
            <h4>Cisco ISE: On-Premises</h4>
            <p>Requires servers, ongoing maintenance, complex scaling, slower deployment, higher operational costs</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #7a2a90, #5b1769);">
              <i class="fas fa-network-wired"></i>
            </div>
            <h4>Forescout: Appliance-Based</h4>
            <p>Requires hardware appliances, medium complexity deployment, moderate scaling capabilities</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon" style="background: linear-gradient(135deg, #f7931e, #c97916);">
              <i class="fas fa-exchange-alt"></i>
            </div>
            <h4>Others: Hybrid</h4>
            <p>Mix of cloud and on-premises components, moderate complexity, varied operational requirements</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Refresh charts in the current panel
   */
  refreshChartsInPanel(panelId) {
    if (!this.data) {
      console.warn('No data available for charts');
      return;
    }
    
    console.log(`Refreshing charts in panel: ${panelId}`);
    
    // Initialize appropriate charts based on panel
    switch (panelId) {
      case 'executive-summary':
        if (window.apexChartManager) {
          window.apexChartManager.createTcoComparisonChart(this.data, 'tco-comparison-chart', 'tcoComparisonChart');
          window.apexChartManager.createCumulativeCostChart(this.data, 'cumulative-cost-chart', 'cumulativeCostChart');
        }
        break;
        
      case 'executive-roi':
        if (window.apexChartManager) {
          window.apexChartManager.createRoiChart(this.data, 'roi-chart', 'roiChart');
          window.apexChartManager.createValueDriversChart(this.data, 'value-drivers-chart', 'valueDriversChart');
        }
        break;
        
      case 'executive-risk':
        if (window.apexChartManager) {
          window.apexChartManager.createBreachImpactChart(this.data, 'breach-impact-chart', 'breachImpactChart');
        }
        if (window.d3Manager) {
          window.d3Manager.createThreatModelVisualization(this.data, 'threat-model-chart', 'threatModelChart');
        }
        break;
        
      case 'executive-comparison':
        if (window.d3Manager) {
          window.d3Manager.createVendorHeatmap(this.data, 'vendor-radar-chart', 'vendorRadarChart');
        }
        break;
    }
  }
  
  /**
   * Update the view with results data
   */
  update(data) {
    console.log('Updating Executive View with data');
    this.data = data;
    
    if (!this.initialized) {
      console.warn('Executive View not initialized');
      return;
    }
    
    // Update dashboard metrics
    this.updateDashboardMetrics(data);
    
    // Refresh charts in current tab
    this.refreshChartsInPanel(this.currentTab);
  }
  
  /**
   * Update dashboard metrics with calculated values
   */
  updateDashboardMetrics(data) {
    // Only proceed if we have valid data
    if (!data || !data.vendors) return;
    
    try {
      // Get vendor data
      const portnoxData = data.vendors.portnox;
      
      // Find highest TCO vendor for comparison
      let highestTcoVendor = null;
      let highestTco = 0;
      
      for (const vendorId in data.vendors) {
        if (vendorId !== 'portnox' && vendorId !== 'no-nac') {
          const tco = data.vendors[vendorId].totalTco;
          if (tco > highestTco) {
            highestTco = tco;
            highestTcoVendor = vendorId;
          }
        }
      }
      
      // Calculate savings
      const savings = highestTco - portnoxData.totalTco;
      const savingsPercentage = Math.round((savings / highestTco) * 100);
      
      // Update executive summary metrics
      const totalSavings = document.getElementById('total-savings');
      const savingsPercentageEl = document.getElementById('savings-percentage');
      const paybackPeriod = document.getElementById('payback-period');
      const riskReductionTotal = document.getElementById('risk-reduction-total');
      const implementationTime = document.getElementById('implementation-time');
      const implementationComparison = document.getElementById('implementation-comparison');
      
      if (totalSavings) {
        totalSavings.textContent = `${savings.toLocaleString()}`;
      }
      
      if (savingsPercentageEl && highestTcoVendor) {
        savingsPercentageEl.textContent = `${savingsPercentage}% reduction vs. ${data.vendors[highestTcoVendor].name || highestTcoVendor}`;
      }
      
      // ROI and payback period
      if (data.roi && data.roi.portnox) {
        const roiData = data.roi.portnox;
        
        if (paybackPeriod) {
          paybackPeriod.textContent = `${Math.round(roiData.paybackPeriod)} months`;
        }
        
        // Also update ROI panel if it exists
        const roiPercentage = document.getElementById('roi-percentage');
        const annualSavings = document.getElementById('annual-savings');
        const npvValue = document.getElementById('npv-value');
        const paybackDetail = document.getElementById('payback-detail');
        
        if (roiPercentage) {
          roiPercentage.textContent = `${Math.round(roiData.roiPercentage)}%`;
        }
        
        if (annualSavings) {
          const annualSavingsValue = Math.round(roiData.totalBenefit / 3);
          annualSavings.textContent = `${annualSavingsValue.toLocaleString()}`;
        }
        
        if (npvValue && roiData.npv) {
          npvValue.textContent = `${Math.round(roiData.npv).toLocaleString()}`;
        }
        
        if (paybackDetail) {
          paybackDetail.textContent = `${Math.round(roiData.paybackPeriod)} months`;
        }
      }
      
      // Risk reduction metrics
      if (data.security && data.security.portnox) {
        const securityData = data.security.portnox;
        
        if (riskReductionTotal) {
          riskReductionTotal.textContent = `${Math.round(securityData.improvements.overall)}%`;
        }
        
        // Also update risk panel if it exists
        const riskReductionPercent = document.getElementById('risk-reduction-percent');
        const breachCostReduction = document.getElementById('breach-cost-reduction');
        const insuranceReduction = document.getElementById('insurance-reduction');
        const complianceCoverage = document.getElementById('compliance-coverage');
        
        if (riskReductionPercent) {
          riskReductionPercent.textContent = `${Math.round(securityData.improvements.overall)}%`;
        }
        
        if (breachCostReduction && securityData.breachCostReduction) {
          breachCostReduction.textContent = `${Math.round(securityData.breachCostReduction).toLocaleString()}`;
        }
        
        if (insuranceReduction && securityData.insuranceReduction) {
          insuranceReduction.textContent = `${Math.round(securityData.insuranceReduction)}%`;
        }
        
        if (complianceCoverage && securityData.compliance) {
          complianceCoverage.textContent = `${Math.round(securityData.compliance.coverage)}%`;
        }
      }
      
      // Implementation time
      if (implementationTime && portnoxData.implementation) {
        implementationTime.textContent = `${Math.round(portnoxData.implementation.time)} days`;
      }
      
      if (implementationComparison && highestTcoVendor && data.vendors[highestTcoVendor].implementation) {
        const competitorTime = data.vendors[highestTcoVendor].implementation.time;
        const portnoxTime = portnoxData.implementation.time;
        const timeSavingsPercent = Math.round(((competitorTime - portnoxTime) / competitorTime) * 100);
        
        implementationComparison.textContent = `${timeSavingsPercent}% faster than ${data.vendors[highestTcoVendor].name || 'competitors'}`;
      }
      
    } catch (error) {
      console.error('Error updating dashboard metrics:', error);
    }
  }
}

// Create global instance
window.executiveView = new ExecutiveView();

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ExecutiveView };
}
EOL

echo -e "${GREEN}Enhanced Executive View created${NC}"

# ================================================================
# 6. Enhanced Security & Compliance View
# ================================================================
echo -e "${CYAN}Creating enhanced Security & Compliance View...${NC}"

cat > "$VIEWS_DIR/security-view.js" << 'EOL'
/**
 * Enhanced Security & Compliance View for Portnox Total Cost Analyzer
 * Provides comprehensive security analysis and compliance mappings
 */

class SecurityView {
  constructor() {
    this.initialized = false;
    this.container = null;
    this.currentTab = 'security-overview';
    this.data = null;
  }
  
  /**
   * Initialize the view
   */
  init(viewId = 'security') {
    console.log('Initializing Security & Compliance View...');
    
    // Find container
    this.container = document.querySelector(`.view-panel[data-view="${viewId}"]`);
    
    if (!this.container) {
      console.error(`Container not found for view: ${viewId}`);
      return false;
    }
    
    // Create tabs if they don't exist
    this.createTabsIfNeeded();
    
    // Set up tab navigation
    this.initTabs();
    
    // Create html structure for panels if they don't exist
    this.createPanelsIfNeeded();
    
    this.initialized = true;
    return true;
  }
  
  /**
   * Create tabs if they don't exist
   */
  createTabsIfNeeded() {
    let tabsContainer = this.container.querySelector('.results-tabs');
    
    if (!tabsContainer) {
      tabsContainer = document.createElement('div');
      tabsContainer.className = 'results-tabs';
      
      tabsContainer.innerHTML = `
        <button class="results-tab active" data-panel="security-overview">Security Overview</button>
        <button class="results-tab" data-panel="compliance-frameworks">Compliance Frameworks</button>
        <button class="results-tab" data-panel="threat-analysis">Threat Analysis</button>
        <button class="results-tab" data-panel="industry-impact">Industry Impact</button>
      `;
      
      // Insert tabs at the beginning of the container
      this.container.prepend(tabsContainer);
    }
  }
  
  /**
   * Set up tab navigation
   */
  initTabs() {
    const tabsContainer = this.container.querySelector('.results-tabs');
    
    if (!tabsContainer) return;
    
    // Get all tabs
    const tabs = tabsContainer.querySelectorAll('.results-tab');
    
    // Add click event to each tab
    tabs.forEach(tab => {
      const panel = tab.getAttribute('data-panel');
      
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all tabs and panels
        tabs.forEach(t => t.classList.remove('active'));
        
        const panels = this.container.querySelectorAll('.results-panel');
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding panel
        const activePanel = this.container.querySelector(`#${panel}`);
        if (activePanel) {
          activePanel.classList.add('active');
          this.currentTab = panel;
          
          // Refresh charts in this panel
          this.refreshChartsInPanel(panel);
        }
      });
    });
  }
  
  /**
   * Create panels structure if they don't exist
   */
  createPanelsIfNeeded() {
    // Check if panels already exist
    const securityOverview = this.container.querySelector('#security-overview');
    const complianceFrameworks = this.container.querySelector('#compliance-frameworks');
    const threatAnalysis = this.container.querySelector('#threat-analysis');
    const industryImpact = this.container.querySelector('#industry-impact');
    
    // Create security overview panel if needed
    if (!securityOverview) {
      this.createSecurityOverviewPanel();
    }
    
    // Create compliance frameworks panel if needed
    if (!complianceFrameworks) {
      this.createComplianceFrameworksPanel();
    }
    
    // Create threat analysis panel if needed
    if (!threatAnalysis) {
      this.createThreatAnalysisPanel();
    }
    
    // Create industry impact panel if needed
    if (!industryImpact) {
      this.createIndustryImpactPanel();
    }
  }
  
  /**
   * Create security overview panel
   */
  createSecurityOverviewPanel() {
    const panel = document.createElement('div');
    panel.id = 'security-overview';
    panel.className = 'results-panel active';
    
    panel.innerHTML = `
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
        <div class="chart-legend" id="nist-framework-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Security Architecture Benefits</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h4>Zero Trust Architecture</h4>
            <p>Never trust, always verify approach to network security with continuous authentication</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-fingerprint"></i>
            </div>
            <h4>Device Identity</h4>
            <p>Strong device identification and continuous verification of device posture</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-laptop-code"></i>
            </div>
            <h4>Agentless Design</h4>
            <p>No endpoint agents required, simplifying deployment and reducing complexity</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-lock"></i>
            </div>
            <h4>Least Privilege Access</h4>
            <p>Granular access controls based on device identity, risk, and security posture</p>
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Data Breach Cost Impact</h3>
        <div class="chart-wrapper" id="breach-impact-chart"></div>
        <div class="chart-legend" id="breach-impact-legend"></div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create compliance frameworks panel
   */
  createComplianceFrameworksPanel() {
    const panel = document.createElement('div');
    panel.id = 'compliance-frameworks';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
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
        <div class="chart-legend" id="security-frameworks-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Key Compliance Frameworks</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-tasks"></i>
            </div>
            <h4>NIST Cybersecurity Framework</h4>
            <p>Identifies, protects, detects, responds to, and recovers from cyber threats</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-hospital"></i>
            </div>
            <h4>HIPAA</h4>
            <p>Ensures protection of sensitive patient health information</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-credit-card"></i>
            </div>
            <h4>PCI DSS</h4>
            <p>Secures credit card data and payment processing environments</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-globe-europe"></i>
            </div>
            <h4>GDPR</h4>
            <p>Protects personal data and privacy for EU citizens</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-lock"></i>
            </div>
            <h4>ISO 27001</h4>
            <p>Information security management system framework</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h4>SOC 2</h4>
            <p>Controls for security, availability, and confidentiality</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-fighter-jet"></i>
            </div>
            <h4>CMMC</h4>
            <p>Cybersecurity standards for defense contractors</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-university"></i>
            </div>
            <h4>FERPA</h4>
            <p>Protection of student education records</p>
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Compliance Automation Benefits</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-file-alt"></i>
            </div>
            <h4>Automatic Evidence Collection</h4>
            <p>Continuously collects and stores compliance evidence for audits</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-chart-bar"></i>
            </div>
            <h4>Real-Time Compliance Dashboards</h4>
            <p>Monitors compliance status with real-time visibility</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h4>Proactive Gap Identification</h4>
            <p>Identifies and alerts on compliance gaps before audits</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-clock"></i>
            </div>
            <h4>Reduced Audit Overhead</h4>
            <p>Streamlines audit processes and reduces preparation time</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Create threat analysis panel
   */
  createThreatAnalysisPanel() {
    const panel = document.createElement('div');
    panel.id = 'threat-analysis';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
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
        <div class="chart-legend" id="threat-model-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>MITRE ATT&CK Coverage</h3>
        <div class="mitre-grid">
          <div class="mitre-section">
            <h4>Initial Access</h4>
            <div class="mitre-items">
              <div class="mitre-item covered">Drive-by Compromise</div>
              <div class="mitre-item covered">External Remote Services</div>
              <div class="mitre-item covered">Hardware Additions</div>
              <div class="mitre-item covered">Replication Through Removable Media</div>
              <div class="mitre-item covered">Trusted Relationship</div>
              <div class="mitre-item covered">Valid Accounts</div>
            </div>
          </div>
          
          <div class="mitre-section">
            <h4>Execution</h4>
            <div class="mitre-items">
              <div class="mitre-item covered">Command and Scripting Interpreter</div>
              <div class="mitre-item covered">Native API</div>
              <div class="mitre-item covered">System Services</div>
              <div class="mitre-item covered">Windows Management Instrumentation</div>
              <div class="mitre-item partial">Software Deployment Tools</div>
            </div>
          </div>
          
          <div class="mitre-section">
            <h4>Persistence</h4>
            <div class="mitre-items">
              <div class="mitre-item covered">Account Manipulation</div>
              <div class="mitre-item covered">Boot or Logon Autostart Execution</div>
              <div class="mitre-item covered">Create Account</div>
              <div class="mitre-item covered">External Remote Services</div>
              <div class="mitre-item covered">Valid Accounts</div>
            </div>
          </div>
          
          <div class="mitre-section">
            <h4>Privilege Escalation</h4>
            <div class="mitre-items">
              <div class="mitre-item covered">Access Token Manipulation</div>
              <div class="mitre-item covered">Boot or Logon Autostart Execution</div>
              <div class="mitre-item covered">Valid Accounts</div>
              <div class="mitre-item partial">Exploitation for Privilege Escalation</div>
            </div>
          </div>
          
          <div class="mitre-section">
            <h4>Defense Evasion</h4>
            <div class="mitre-items">
              <div class="mitre-item covered">Disable or Modify Tools</div>
              <div class="mitre-item covered">Impair Defenses</div>
              <div class="mitre-item covered">Indicator Removal</div>
              <div class="mitre-item covered">Valid Accounts</div>
              <div class="mitre-item partial">Masquerading</div>
            </div>
          </div>
          
          <div class="mitre-section">
            <h4>Lateral Movement</h4>
            <div class="mitre-items">
              <div class="mitre-item covered">Internal Spearphishing</div>
              <div class="mitre-item covered">Lateral Tool Transfer</div>
              <div class="mitre-item covered">Remote Services</div>
              <div class="mitre-item covered">Valid Accounts</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Advanced Threat Protection</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-user-shield"></i>
            </div>
            <h4>Zero Trust Authentication</h4>
            <p>Continuous authentication and verification of all network access attempts</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-network-wired"></i>
            </div>
            <h4>Micro-Segmentation</h4>
            <p>Granular network segmentation to contain lateral movement of threats</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-laptop-medical"></i>
            </div>
            <h4>Device Posture Assessment</h4>
            <p>Real-time evaluation of device security status and compliance</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-robot"></i>
            </div>
            <h4>Automated Remediation</h4>
            <p>Immediate automated response to security incidents and policy violations</p>
          </div>
        </div>
      </div>
    `;
    
    // Add custom styles for MITRE ATT&CK grid
    const style = document.createElement('style');
    style.textContent = `
      .mitre-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }
      
      .mitre-section {
        background: var(--card-bg);
        border-radius: 8px;
        padding: 15px;
        box-shadow: var(--shadow-sm);
        border: 1px solid var(--border-color);
      }
      
      .mitre-section h4 {
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 16px;
        color: var(--text-primary);
      }
      
      .mitre-items {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      .mitre-item {
        padding: 6px 10px;
        border-radius: 4px;
        font-size: 13px;
        position: relative;
        padding-left: 25px;
      }
      
      .mitre-item::before {
        content: '';
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      
      .mitre-item.covered {
        background-color: rgba(46, 204, 113, 0.1);
        border: 1px solid rgba(46, 204, 113, 0.3);
      }
      
      .mitre-item.covered::before {
        background-color: #2ecc71;
      }
      
      .mitre-item.partial {
        background-color: rgba(243, 156, 18, 0.1);
        border: 1px solid rgba(243, 156, 18, 0.3);
      }
      
      .mitre-item.partial::before {
        background-color: #f39c12;
      }
      
      .dark-mode .mitre-item.covered {
        background-color: rgba(46, 204, 113, 0.2);
      }
      
      .dark-mode .mitre-item.partial {
        background-color: rgba(243, 156, 18, 0.2);
      }
    `;
    
    document.head.appendChild(style);
    this.container.appendChild(panel);
  }
  
  /**
   * Create industry impact panel
   */
  createIndustryImpactPanel() {
    const panel = document.createElement('div');
    panel.id = 'industry-impact';
    panel.className = 'results-panel';
    
    panel.innerHTML = `
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
        <div class="chart-legend" id="industry-breach-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Cyber Insurance Premium Reduction</h3>
        <div class="chart-wrapper" id="insurance-impact-chart"></div>
        <div class="chart-legend" id="insurance-impact-legend"></div>
      </div>
      
      <div class="chart-container">
        <h3>Industry-Specific Security Considerations</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-hospital"></i>
            </div>
            <h4>Healthcare</h4>
            <p>Protection of electronic health records, medical devices, and HIPAA compliance</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-university"></i>
            </div>
            <h4>Financial Services</h4>
            <p>Securing financial transactions, customer data, and meeting regulatory requirements</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-industry"></i>
            </div>
            <h4>Manufacturing</h4>
            <p>Securing operational technology, IoT devices, and protecting intellectual property</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <h4>Education</h4>
            <p>Protecting student data, research information, and managing BYOD environments</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <h4>Retail</h4>
            <p>Securing payment systems, customer data, and meeting PCI DSS requirements</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-government"></i>
            </div>
            <h4>Government</h4>
            <p>Protecting sensitive information, critical infrastructure, and citizen data</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-plug"></i>
            </div>
            <h4>Energy & Utilities</h4>
            <p>Securing critical infrastructure, industrial control systems, and SCADA networks</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <i class="fas fa-plane"></i>
            </div>
            <h4>Transportation</h4>
            <p>Protecting transportation systems, passenger data, and operational technology</p>
          </div>
        </div>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  /**
   * Refresh charts in the current panel
   */
  refreshChartsInPanel(panelId) {
    if (!this.data) {
      console.warn('No data available for charts');
      return;
    }
    
    console.log(`Refreshing charts in panel: ${panelId}`);
    
    // Initialize appropriate charts based on panel
    switch (panelId) {
      case 'security-overview':
        if (window.d3Manager) {
          window.d3Manager.createNistFrameworkChart(this.data, 'nist-framework-chart', 'nistFrameworkChart');
        }
        if (window.apexChartManager) {
          window.apexChartManager.createBreachImpactChart(this.data, 'breach-impact-chart', 'breachImpactChart');
        }
        break;
        
      case 'compliance-frameworks':
        if (window.apexChartManager) {
          window.apexChartManager.createSecurityFrameworksChart(this.data, 'security-frameworks-chart', 'securityFrameworksChart');
        }
        break;
        
      case 'threat-analysis':
        if (window.d3Manager) {
          window.d3Manager.createThreatModelVisualization(this.data, 'threat-model-chart', 'threatModelChart');
        }
        break;
        
      case 'industry-impact':
        if (window.apexChartManager) {
          window.apexChartManager.createIndustryBreachChart(this.data, 'industry-breach-chart', 'industryBreachChart');
          window.apexChartManager.createInsuranceImpactChart(this.data, 'insurance-impact-chart', 'insuranceImpactChart');
        }
        break;
    }
  }
  
  /**
   * Update the view with results data
   */
  update(data) {
    console.log('Updating Security View with data');
    this.data = data;
    
    if (!this.initialized) {
      console.warn('Security View not initialized');
      return;
    }
    
    // Update dashboard metrics
    this.updateDashboardMetrics(data);
    
    // Refresh charts in current tab
    this.refreshChartsInPanel(this.currentTab);
  }
  
  /**
   * Update dashboard metrics with calculated values
   */
  updateDashboardMetrics(data) {
    // Only proceed if we have valid data
    if (!data || !data.security) return;
    
    try {
      // Get security data for Portnox
      const securityData = data.security.portnox;
      
      if (!securityData) return;
      
      // Update security overview metrics
      const securityImprovement = document.getElementById('security-improvement');
      const zeroTrustScore = document.getElementById('zero-trust-score');
      const deviceAuthScore = document.getElementById('device-auth-score');
      const responseTime = document.getElementById('response-time');
      
      if (securityImprovement) {
        securityImprovement.textContent = `${Math.round(securityData.improvements.overall)}%`;
      }
      
      if (zeroTrustScore && securityData.securityScores) {
        zeroTrustScore.textContent = `${Math.round(securityData.securityScores.zeroTrust)}%`;
      }
      
      if (deviceAuthScore && securityData.securityScores) {
        deviceAuthScore.textContent = `${Math.round(securityData.securityScores.deviceAuth)}%`;
      }
      
      if (responseTime && securityData.securityScores) {
        responseTime.textContent = `${Math.round(securityData.securityScores.remediationSpeed)} min`;
      }
      
      // Update compliance metrics
      const complianceCoverage = document.getElementById('compliance-coverage');
      const automatedReporting = document.getElementById('automated-reporting');
      const auditReduction = document.getElementById('audit-reduction');
      const frameworkCount = document.getElementById('framework-count');
      
      if (complianceCoverage && securityData.compliance) {
        complianceCoverage.textContent = `${Math.round(securityData.compliance.coverage)}%`;
      }
      
      if (automatedReporting && securityData.compliance) {
        const automationScore = securityData.compliance.automationLevel || 85;
        automatedReporting.textContent = `${automationScore}%`;
      }
      
      if (auditReduction && securityData.compliance) {
        const reductionPercent = securityData.compliance.auditTimeReduction || 65;
        auditReduction.textContent = `${reductionPercent}%`;
      }
      
      if (frameworkCount && securityData.compliance) {
        const frameworks = securityData.compliance.frameworks || 7;
        frameworkCount.textContent = `${frameworks}+`;
      }
      
      // Update threat analysis metrics
      const threatReduction = document.getElementById('threat-reduction');
      const unauthorizedPrevention = document.getElementById('unauthorized-prevention');
      const lateralReduction = document.getElementById('lateral-reduction');
      const shadowIt = document.getElementById('shadow-it');
      
      if (threatReduction && securityData.improvements) {
        threatReduction.textContent = `${Math.round(securityData.improvements.overall)}%`;
      }
      
      if (unauthorizedPrevention && securityData.threatReduction) {
        const unauthorizedScore = securityData.threatReduction.unauthorizedAccess || 95;
        unauthorizedPrevention.textContent = `${unauthorizedScore}%`;
      }
      
      if (lateralReduction && securityData.threatReduction) {
        const lateralScore = securityData.threatReduction.lateralMovement || 90;
        lateralReduction.textContent = `${lateralScore}%`;
      }
      
      if (shadowIt && securityData.threatReduction) {
        const shadowItScore = securityData.threatReduction.shadowIt || 95;
        shadowIt.textContent = `${shadowItScore}%`;
      }
      
      // Update industry impact metrics
      const avgBreachCost = document.getElementById('avg-breach-cost');
      const healthcareBreachCost = document.getElementById('healthcare-breach-cost');
      const financialBreachCost = document.getElementById('financial-breach-cost');
      const mttiValue = document.getElementById('mtti-value');
      
      if (avgBreachCost) {
        avgBreachCost.textContent = '$4.35M';
      }
      
      if (healthcareBreachCost) {
        healthcareBreachCost.textContent = '$9.23M';
      }
      
      if (financialBreachCost) {
        financialBreachCost.textContent = '$5.97M';
      }
      
      if (mttiValue) {
        mttiValue.textContent = '287';
      }
      
    } catch (error) {
      console.error('Error updating security dashboard metrics:', error);
    }
  }
}

// Create global instance
window.securityView = new SecurityView();

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SecurityView };
}
EOL

echo -e "${GREEN}Enhanced Security & Compliance View created${NC}"

# ================================================================
# 7. Main Application Integration
# ================================================================
echo -e "${CYAN}Creating main application integration...${NC}"

cat > "$JS_DIR/app-integration.js" << 'EOL'
/**
 * Main Application Integration for Portnox Total Cost Analyzer
 * Coordinates views, charts, and components
 */

class AppIntegration {
  constructor() {
    this.initialized = false;
    this.activeView = null;
    this.viewMap = {
      'executive': window.executiveView,
      'security': window.securityView
    };
    
    // Data
    this.resultsData = null;
    
    // Initialize on DOM loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }
  
  /**
   * Initialize the application integration
   */
  init() {
    if (this.initialized) return;
    
    console.log('Initializing Application Integration...');
    
    // Initialize views
    this.initializeViews();
    
    // Set up view navigation
    this.initializeViewNavigation();
    
    // Add event listeners for recalculation
    this.initializeCalculationEvents();
    
    // Add theme toggle
    this.initializeThemeToggle();
    
    // Initialize with dummy data if needed
    this.initializeWithDummyData();
    
    this.initialized = true;
  }
  
  /**
   * Initialize all views
   */
  initializeViews() {
    // Initialize Executive View
    if (window.executiveView) {
      window.executiveView.init('executive');
    }
    
    // Initialize Security View
    if (window.securityView) {
      window.securityView.init('security');
    }
    
    // Set active view based on active tab
    const activeTab = document.querySelector('.main-tab.active');
    if (activeTab) {
      const viewId = activeTab.getAttribute('data-view');
      this.activeView = this.viewMap[viewId];
    } else {
      // Default to executive view if no active tab
      this.activeView = window.executiveView;
    }
  }
  
  /**
   * Initialize view navigation
   */
  initializeViewNavigation() {
    const mainTabs = document.querySelectorAll('.main-tab');
    
    mainTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all tabs and panels
        mainTabs.forEach(t => t.classList.remove('active'));
        
        const viewPanels = document.querySelectorAll('.view-panel');
        viewPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding panel
        const viewId = tab.getAttribute('data-view');
        const panel = document.querySelector(`.view-panel[data-view="${viewId}"]`);
        
        if (panel) {
          panel.classList.add('active');
          
          // Set active view
          this.activeView = this.viewMap[viewId];
          
          // Update view with current data
          if (this.activeView && this.resultsData) {
            this.activeView.update(this.resultsData);
          }
          
          // Dispatch view change event
          document.dispatchEvent(new CustomEvent('viewChanged', {
            detail: { view: viewId }
          }));
        }
      });
    });
  }
  
  /**
   * Initialize calculation events
   */
  initializeCalculationEvents() {
    const calculateButtons = document.querySelectorAll('#calculate-btn, #calculate-btn-header');
    
    calculateButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show loading overlay
        this.showLoading();
        
        // Simulate calculation time
        setTimeout(() => {
          // Generate or get results data
          this.resultsData = this.getResultsData();
          
          // Update views with data
          this.updateViews(this.resultsData);
          
          // Hide loading overlay
          this.hideLoading();
          
          // Show success message
          this.showToast('Calculation completed successfully', 'success');
        }, 1500);
      });
    });
  }
  
  /**
   * Initialize theme toggle
   */
  initializeThemeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
      // Check if dark mode is already set
      const isDarkMode = localStorage.getItem('darkMode') === 'true';
      
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
      
      darkModeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Toggle dark mode class
        document.body.classList.toggle('dark-mode');
        
        // Update localStorage
        const newDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', newDarkMode);
        
        // Update button icon
        darkModeToggle.innerHTML = newDarkMode ? 
          '<i class="fas fa-sun"></i>' : 
          '<i class="fas fa-moon"></i>';
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themechange', {
          detail: { theme: newDarkMode ? 'dark' : 'light' }
        }));
      });
    }
  }
  
  /**
   * Initialize with dummy data if needed
   */
  initializeWithDummyData() {
    // Generate dummy data
    this.resultsData = this.getResultsData();
    
    // Update views with data
    this.updateViews(this.resultsData);
  }
  
  /**
   * Update all views with data
   */
  updateViews(data) {
    // Update Executive View
    if (window.executiveView) {
      window.executiveView.update(data);
    }
    
    // Update Security View
    if (window.securityView) {
      window.securityView.update(data);
    }
  }
  
  /**
   * Show loading overlay
   */
  showLoading(message = 'Calculating results...') {
    const loadingOverlay = document.getElementById('loading-overlay');
    
    if (loadingOverlay) {
      const messageElement = loadingOverlay.querySelector('p');
      
      if (messageElement) {
        messageElement.textContent = message;
      }
      
      loadingOverlay.classList.add('active');
    }
  }
  
  /**
   * Hide loading overlay
   */
  hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    
    if (loadingOverlay) {
      loadingOverlay.classList.remove('active');
    }
  }
  
  /**
   * Show toast notification
   */
  showToast(message, type = 'info') {
    // Find or create toast container
    let toastContainer = document.getElementById('toast-container');
    
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Add icon based on type
    const icon = document.createElement('i');
    
    switch (type) {
      case 'success':
        icon.className = 'fas fa-check-circle';
        break;
      case 'error':
        icon.className = 'fas fa-exclamation-circle';
        break;
      case 'warning':
        icon.className = 'fas fa-exclamation-triangle';
        break;
      default:
        icon.className = 'fas fa-info-circle';
    }
    
    // Add message
    const text = document.createElement('span');
    text.textContent = message;
    
    // Assemble toast
    toast.appendChild(icon);
    toast.appendChild(text);
    toastContainer.appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Remove toast after delay
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
   * Generate dummy results data
   */
  getResultsData() {
    // Get selected vendors
    const selectedVendors = window.sidebarManager ? 
      window.sidebarManager.getSelectedVendors() : 
      ['portnox', 'cisco', 'forescout'];
      
    // Generate TCO data
    const vendors = {};
    
    // Define base TCO for each vendor
    const vendorTcoBase = {
      'portnox': 245000,
      'cisco': 520000,
      'aruba': 480000,
      'forescout': 430000,
      'fortinac': 400000,
      'juniper': 350000,
      'securew2': 280000,
      'microsoft': 290000,
      'arista': 320000,
      'foxpass': 270000,
      'no-nac': 0
    };
    
    // Add data for each selected vendor
    selectedVendors.forEach(vendorId => {
      // Base TCO
      const baseTco = vendorTcoBase[vendorId] || 400000;
      
      // Create vendor data object
      vendors[vendorId] = {
        name: window.VENDORS ? window.VENDORS[vendorId].name : vendorId,
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
          time: vendorId === 'portnox' ? 21 : (vendorId === 'cisco' ? 90 : 60),
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
    });
    
    // Generate ROI data
    const roi = {};
    
    selectedVendors.forEach(vendorId => {
      // Skip no-nac
      if (vendorId === 'no-nac') return;
      
      // Base TCO
      const baseTco = vendorTcoBase[vendorId] || 400000;
      
      // Calculate ROI components
      const costSavings = vendorId === 'portnox' ? 150000 : 50000;
      const riskReductionBenefit = vendorId === 'portnox' ? 300000 : 200000;
      const productivityBenefit = vendorId === 'portnox' ? 180000 : 120000;
      const complianceSavings = vendorId === 'portnox' ? 120000 : 80000;
      const insuranceSavings = vendorId === 'portnox' ? 50000 : 30000;
      
      // Total benefit
      const totalBenefit = costSavings + riskReductionBenefit + productivityBenefit + complianceSavings + insuranceSavings;
      
      // ROI calculation
      const roiPercentage = (totalBenefit - baseTco) / baseTco * 100;
      
      // Payback period (in months)
      const paybackPeriod = vendorId === 'portnox' ? 7 : 12;
      
      // Create ROI data object
      roi[vendorId] = {
        costSavings,
        riskReductionBenefit,
        productivityBenefit,
        complianceSavings,
        insuranceSavings,
        totalBenefit,
        roiPercentage,
        paybackPeriod,
        npv: totalBenefit - baseTco
      };
    });
    
    // Generate security data
    const security = {};
    
    selectedVendors.forEach(vendorId => {
      // Skip no-nac
      if (vendorId === 'no-nac') return;
      
      // Base security improvement percentage
      const baseImprovement = vendorId === 'portnox' ? 85 : 
                              (vendorId === 'cisco' || vendorId === 'forescout' ? 75 : 65);
      
      // Security scores
      const zeroTrustScore = vendorId === 'portnox' ? 92 : 
                            (vendorId === 'cisco' ? 85 : 
                             vendorId === 'forescout' ? 78 : 70);
      
      const deviceAuthScore = vendorId === 'portnox' ? 95 : 
                             (vendorId === 'cisco' ? 88 : 
                              vendorId === 'forescout' ? 92 : 80);
      
      const riskAssessmentScore = vendorId === 'portnox' ? 90 : 
                                 (vendorId === 'cisco' ? 85 : 
                                  vendorId === 'forescout' ? 88 : 75);
      
      const remediationSpeed = vendorId === 'portnox' ? 5 : 
                              (vendorId === 'cisco' ? 15 : 
                               vendorId === 'forescout' ? 10 : 20);
      
      // Compliance coverage
      const complianceCoverage = vendorId === 'portnox' ? 95 : 
                                (vendorId === 'cisco' ? 90 : 
                                 vendorId === 'forescout' ? 85 : 80);
      
      // Create security data object
      security[vendorId] = {
        improvements: {
          overall: baseImprovement,
          unauthorized: baseImprovement + 10,
          lateral: baseImprovement + 5,
          deviceVisibility: baseImprovement + 7
        },
        securityScores: {
          zeroTrust: zeroTrustScore,
          deviceAuth: deviceAuthScore,
          riskAssessment: riskAssessmentScore,
          remediationSpeed: remediationSpeed
        },
        compliance: {
          coverage: complianceCoverage,
          frameworks: 7,
          automationLevel: vendorId === 'portnox' ? 85 : 65,
          auditTimeReduction: vendorId === 'portnox' ? 65 : 40
        },
        threatReduction: {
          unauthorizedAccess: vendorId === 'portnox' ? 95 : 80,
          lateralMovement: vendorId === 'portnox' ? 90 : 70,
          shadowIt: vendorId === 'portnox' ? 95 : 75
        },
        breachCostReduction: vendorId === 'portnox' ? 1200000 : 800000,
        insuranceReduction: vendorId === 'portnox' ? 25 : 15
      };
    });
    
    // Return complete results data
    return {
      vendors,
      roi,
      security,
      calculator: {
        config: {
          deviceCount: 1000,
          years: 3
        }
      }
    };
  }
}

// Create global instance
window.appIntegration = new AppIntegration();
EOL

echo -e "${GREEN}Main application integration created${NC}"

# ================================================================
# 8. CSS for enhancing specific components
# ================================================================
echo -e "${CYAN}Creating CSS for enhancing specific components...${NC}"

cat > "$CSS_DIR/components.css" << 'EOL'
/**
 * Enhanced Component Styles for Portnox Total Cost Analyzer
 * Special styling for comparison tables, MITRE charts, etc.
 */

/* Enhanced Comparison Table */
.comparison-table-container {
  overflow-x: auto;
  margin-top: 20px;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.comparison-table th,
.comparison-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.comparison-table th {
  background-color: var(--primary-color);
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.comparison-table th:first-child {
  border-top-left-radius: 8px;
}

.comparison-table th:last-child {
  border-top-right-radius: 8px;
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.comparison-table td {
  font-size: 14px;
  color: var(--text-primary);
}

.comparison-table td.highlight-cell {
  color: var(--primary-color);
  font-weight: 600;
}

.comparison-table tr:hover {
  background-color: rgba(26, 90, 150, 0.05);
}

/* Enhanced MITRE ATT&CK Framework */
.mitre-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.mitre-section {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 15px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
}

.mitre-section h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: var(--text-primary);
}

.mitre-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mitre-item {
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 13px;
  position: relative;
  padding-left: 25px;
}

.mitre-item::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.mitre-item.covered {
  background-color: rgba(46, 204, 113, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.3);
}

.mitre-item.covered::before {
  background-color: #2ecc71;
}

.mitre-item.partial {
  background-color: rgba(243, 156, 18, 0.1);
  border: 1px solid rgba(243, 156, 18, 0.3);
}

.mitre-item.partial::before {
  background-color: #f39c12;
}

.dark-mode .mitre-item.covered {
  background-color: rgba(46, 204, 113, 0.2);
}

.dark-mode .mitre-item.partial {
  background-color: rgba(243, 156, 18, 0.2);
}

/* Enhanced Tooltips */
.d3-tooltip {
  position: absolute;
  z-index: 100;
  padding: 10px 12px;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  box-shadow: var(--shadow-md);
  pointer-events: none;
  max-width: 300px;
  font-size: 12px;
  transition: opacity 0.3s ease;
}

.d3-tooltip strong {
  display: block;
  margin-bottom: 5px;
  color: var(--primary-color);
  font-size: 13px;
}

.custom-tooltip {
  padding: 8px 0;
}

.tooltip-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 5px;
}

.tooltip-value {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 3px;
}

.tooltip-savings {
  font-size: 13px;
  margin-bottom: 3px;
}

.tooltip-arch {
  font-size: 12px;
  opacity: 0.8;
}

/* Enhanced Chart Legends */
.chart-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: var(--text-secondary);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
}

/* Enhanced Animated Loading */
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

.loading-spinner {
  background-color: var(--card-bg);
  padding: 30px;
  border-radius: 10px;
  box-shadow: var(--shadow-lg);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 15px auto;
  border: 4px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Enhanced Toast Notifications */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 15px;
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  min-width: 300px;
  max-width: 450px;
  transform: translateX(120%);
  transition: transform 0.3s ease;
  border-left: 4px solid;
}

.toast.show {
  transform: translateX(0);
}

.toast i {
  margin-right: 15px;
  font-size: 18px;
}

.toast-info {
  border-left-color: var(--info-color);
}

.toast-info i {
  color: var(--info-color);
}

.toast-success {
  border-left-color: var(--success-color);
}

.toast-success i {
  color: var(--success-color);
}

.toast-warning {
  border-left-color: var(--warning-color);
}

.toast-warning i {
  color: var(--warning-color);
}

.toast-error {
  border-left-color: var(--danger-color);
}

.toast-error i {
  color: var(--danger-color);
}

/* Animations for Charts */
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

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.chart-container {
  animation: fadeInUp 0.6s ease-out;
}

.dashboard-card {
  animation: scaleIn 0.5s ease-out;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .comparison-table th,
  .comparison-table td {
    padding: 10px;
    font-size: 13px;
  }
  
  .mitre-grid {
    grid-template-columns: 1fr;
  }
  
  .toast {
    min-width: auto;
    max-width: 300px;
  }
}
EOL

echo -e "${GREEN}CSS for enhancing specific components created${NC}"

# ================================================================
# 9. Create index.html or update existing
# ================================================================
echo -e "${CYAN}Creating JS stylesheet loader...${NC}"

cat > "$JS_DIR/style-loader.js" << 'EOL'
/**
 * Style Loader for Portnox Total Cost Analyzer
 * Dynamically loads CSS files and applies theme
 */

document.addEventListener('DOMContentLoaded', function() {
  // Load CSS files dynamically
  loadStylesheet('css/enhanced-layout.css');
  loadStylesheet('css/components.css');
  
  // Apply saved theme
  applyTheme();
  
  // Setup font awesome if needed
  setupFontAwesome();
});

/**
 * Load a stylesheet dynamically
 */
function loadStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) {
    return; // Already loaded
  }
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  
  document.head.appendChild(link);
}

/**
 * Apply saved theme
 */
function applyTheme() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    
    // Update dark mode toggle button if it exists
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }
}

/**
 * Setup Font Awesome if not already loaded
 */
function setupFontAwesome() {
  if (!document.querySelector('link[href*="font-awesome"], script[src*="font-awesome"]')) {
    // Try to load from CDN
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    
    document.head.appendChild(link);
  }
}
EOL

echo -e "${GREEN}JS stylesheet loader created${NC}"

# ================================================================
# 10. Create update script to apply all changes
# ================================================================
echo -e "${CYAN}Creating update script to apply all changes...${NC}"

cat > "$REPO_DIR/update.sh" << 'EOL'
#!/bin/bash

# ================================================================
# Portnox Total Cost Analyzer - Update Script
# ================================================================
# This script applies all dashboard enhancement changes to the app
# ================================================================

# Color definitions for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Portnox Total Cost Analyzer - Update Script                  ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}Applying all dashboard enhancements to the application${NC}"
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

# Update index.html to include new CSS and JS files
echo -e "${YELLOW}Updating index.html...${NC}"

# Create temporary file
TMP_FILE=$(mktemp)

# Add CSS references before </head>
sed '/<\/head>/i \
    <!-- Enhanced UI Files -->\
    <link rel="stylesheet" href="css/enhanced-layout.css">\
    <link rel="stylesheet" href="css/components.css">\
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>\
    <script src="https://d3js.org/d3.v7.min.js"></script>' "$INDEX_HTML" > "$TMP_FILE"

# Add JS references before </body>
sed '/<\/body>/i \
    <!-- Enhanced JS Files -->\
    <script src="js/charts/chart-config.js"></script>\
    <script src="js/charts/apex/apex-charts.js"></script>\
    <script src="js/charts/d3/d3-manager.js"></script>\
    <script src="js/views/executive-view.js"></script>\
    <script src="js/views/security-view.js"></script>\
    <script src="js/app-integration.js"></script>\
    <script src="js/style-loader.js"></script>' "$TMP_FILE" > "$INDEX_HTML"

echo -e "${GREEN}index.html updated successfully${NC}"

# Add JavaScript for immediate style fixes
echo -e "${YELLOW}Adding immediate style fixes...${NC}"

# Create temporary file
TMP_FILE=$(mktemp)

# Add style fixes before </body>
sed '/<\/body>/i \
    <script>\
      document.addEventListener("DOMContentLoaded", function() {\
        // Apply modern styling to vendor cards\
        const vendorCards = document.querySelectorAll(".vendor-select-card");\
        vendorCards.forEach(card => {\
          card.style.transition = "all 0.3s ease";\
          card.style.borderRadius = "6px";\
          card.addEventListener("mouseenter", function() {\
            this.style.transform = "translateY(-3px)";\
            this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";\
          });\
          card.addEventListener("mouseleave", function() {\
            this.style.transform = "";\
            this.style.boxShadow = "";\
          });\
        });\
        \
        // Apply modern styling to buttons\
        const buttons = document.querySelectorAll(".btn, .btn-calculate");\
        buttons.forEach(button => {\
          button.style.transition = "all 0.3s ease";\
          button.addEventListener("mouseenter", function() {\
            this.style.transform = "translateY(-2px)";\
          });\
          button.addEventListener("mouseleave", function() {\
            this.style.transform = "";\
          });\
        });\
      });\
    </script>' "$INDEX_HTML" > "$TMP_FILE"

mv "$TMP_FILE" "$INDEX_HTML"

echo -e "${GREEN}Immediate style fixes added${NC}"

# Ensure necessary directories exist
echo -e "${YELLOW}Ensuring necessary directories exist...${NC}"

mkdir -p "$APP_DIR/css" "$APP_DIR/js/charts/apex" "$APP_DIR/js/charts/d3" "$APP_DIR/js/views" "$APP_DIR/js/components" "$APP_DIR/js/utils"

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

echo -e "${GREEN}File permissions fixed${NC}"

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Dashboard Enhancement Update Complete!                       ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}The Portnox Total Cost Analyzer has been enhanced with:${NC}"
echo -e "  • Modern UI with responsive design"
echo -e "  • Advanced interactive charts with ApexCharts and D3"
echo -e "  • Comprehensive Executive View with strategic metrics"
echo -e "  • Detailed Security & Compliance View with framework mapping"
echo -e "  • Industry-specific analysis with threat modeling"
echo -e "  • Improved vendor comparison capabilities"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}Refresh your browser to see the changes.${NC}"
EOL

# Make update script executable
chmod +x "$REPO_DIR/update.sh"

echo -e "${GREEN}Update script created${NC}"

# ================================================================
# 11. Create final vendor data file
# ================================================================
echo -e "${CYAN}Creating vendor data file...${NC}"

cat > "$JS_DIR/models/vendor-data.js" << 'EOL'
/**
 * Vendor Data for Portnox Total Cost Analyzer
 * Contains detailed information about NAC vendors
 */

const VENDORS = {
  'portnox': {
    name: 'Portnox Cloud',
    logo: 'img/vendors/portnox-logo.png',
    architecture: 'cloud',
    description: 'Cloud-native NAC solution with zero infrastructure requirements',
    features: {
      cloudIntegration: true,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: true,
      agentless: true,
      aiThreatPrevention: true,
      zeroDayProtection: true,
      multiCloud: true,
      hybridEnvironment: true,
      automatedRemediation: true
    },
    strengths: [
      'Zero infrastructure requirements',
      'Rapid deployment (3 weeks average)',
      'Automatic updates and scaling',
      'Global coverage',
      'Lowest TCO',
      'Agentless architecture',
      'Cloud-native design',
      'Continuous compliance monitoring'
    ],
    weaknesses: [
      'Newer to enterprise market',
      'Limited on-premises options'
    ],
    bestFor: [
      'Organizations seeking cost-effective NAC',
      'Multi-site deployments',
      'Cloud-first organizations',
      'Hybrid work environments',
      'Organizations with limited IT resources'
    ]
  },
  
  'cisco': {
    name: 'Cisco ISE',
    logo: 'img/vendors/cisco-logo.png',
    architecture: 'on-premises',
    description: 'Enterprise on-premises NAC solution with extensive integration capabilities',
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: true,
      agentless: false,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: true,
      automatedRemediation: true
    },
    strengths: [
      'Extensive integration with Cisco ecosystem',
      'Mature solution with large install base',
      'Strong enterprise support',
      'Comprehensive policy management',
      'Scalable for large enterprises'
    ],
    weaknesses: [
      'High implementation and maintenance costs',
      'Complex deployment and management',
      'Requires dedicated IT staff',
      'Long implementation timeframes (3-4 months)'
    ],
    bestFor: [
      'Large enterprises with substantial IT resources',
      'Organizations with extensive Cisco infrastructure',
      'Complex network environments',
      'Organizations requiring deep customization'
    ]
  },
  
  'aruba': {
    name: 'Aruba ClearPass',
    logo: 'img/vendors/aruba-logo.png',
    architecture: 'on-premises',
    description: 'On-premises NAC solution with strong wireless capabilities',
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: true,
      agentless: false,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: false,
      automatedRemediation: true
    },
    strengths: [
      'Strong wireless integration',
      'Good BYOD support',
      'Solid device profiling',
      'Integration with HP ecosystem',
      'Context-aware policy management'
    ],
    weaknesses: [
      'Limited cloud management capabilities',
      'High hardware costs',
      'Complex implementation',
      'Moderate learning curve'
    ],
    bestFor: [
      'Organizations with Aruba wireless infrastructure',
      'Mid-size to large enterprises',
      'Environments with extensive wireless needs',
      'Organizations with sufficient IT staff'
    ]
  },
  
  'forescout': {
    name: 'Forescout',
    logo: 'img/vendors/forescout-logo.png',
    architecture: 'on-premises',
    description: 'On-premises NAC solution with strong device discovery capabilities',
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false,
      agentless: true,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: false,
      automatedRemediation: true
    },
    strengths: [
      'Excellent device discovery',
      'Strong IoT security',
      'Agentless architecture',
      'Good legacy device support',
      'Strong compliance capabilities'
    ],
    weaknesses: [
      'High acquisition costs',
      'Limited cloud capabilities',
      'Complex licensing model',
      'Performance challenges at scale'
    ],
    bestFor: [
      'Organizations with diverse device types',
      'Environments with many IoT devices',
      'Organizations requiring strong device visibility',
      'Mid-size to large enterprises'
    ]
  },
  
  'fortinac': {
    name: 'FortiNAC',
    logo: 'img/vendors/fortinac-logo.png',
    architecture: 'on-premises',
    description: 'On-premises NAC solution integrated with Fortinet security ecosystem',
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false,
      agentless: false,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: false,
      automatedRemediation: true
    },
    strengths: [
      'Integration with Fortinet products',
      'Solid IoT protection',
      'Good device profiling',
      'Security fabric integration',
      'Moderate learning curve'
    ],
    weaknesses: [
      'Limited cloud management',
      'Restricted third-party integrations',
      'Complex policies for multi-vendor environments',
      'Moderate deployment complexity'
    ],
    bestFor: [
      'Organizations with Fortinet infrastructure',
      'Mid-size enterprises',
      'Organizations wanting unified security vendor',
      'Environments with moderate complexity'
    ]
  },
  
  'juniper': {
    name: 'Juniper Mist',
    logo: 'img/vendors/juniper-logo.png',
    architecture: 'hybrid',
    description: 'Cloud-managed NAC with on-premises components and strong AI capabilities',
    features: {
      cloudIntegration: true,
      legacyDevices: false,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: true,
      agentless: true,
      aiThreatPrevention: true,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: true,
      automatedRemediation: true
    },
    strengths: [
      'Strong AI-driven insights',
      'Excellent wireless management',
      'Cloud-managed architecture',
      'Good user experience',
      'Solid troubleshooting capabilities'
    ],
    weaknesses: [
      'Limited legacy device support',
      'Less mature NAC capabilities',
      'Primarily focused on wireless',
      'More limited enterprise deployments'
    ],
    bestFor: [
      'Organizations with Juniper infrastructure',
      'Wireless-focused environments',
      'Organizations valuing AI insights',
      'Mid-size enterprises with modern infrastructure'
    ]
  },
  
  'securew2': {
    name: 'SecureW2',
    logo: 'img/vendors/securew2-logo.png',
    architecture: 'cloud',
    description: 'Cloud-based identity and access management focused on certificate-based authentication',
    features: {
      cloudIntegration: true,
      legacyDevices: false,
      byod: true,
      iot: false,
      wireless: true,
      remoteUsers: true,
      agentless: false,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: true,
      hybridEnvironment: true,
      automatedRemediation: false
    },
    strengths: [
      'Strong certificate-based authentication',
      'Good cloud integration',
      'Solid identity management',
      'Modern architecture',
      'Easier deployment than traditional NAC'
    ],
    weaknesses: [
      'More limited NAC feature set',
      'Less comprehensive device management',
      'Limited legacy device support',
      'Less mature solution'
    ],
    bestFor: [
      'Organizations focusing on identity-first security',
      'Cloud-first environments',
      'Organizations using certificate-based authentication',
      'Environments with primarily modern devices'
    ]
  },
  
  'microsoft': {
    name: 'Microsoft NPS',
    logo: 'img/vendors/microsoft-logo.png',
    architecture: 'on-premises',
    description: 'Basic on-premises RADIUS server built into Windows Server',
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: false,
      iot: false,
      wireless: true,
      remoteUsers: false,
      agentless: false,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: false,
      automatedRemediation: false
    },
    strengths: [
      'Included with Windows Server',
      'Familiar to Windows administrators',
      'Basic authentication capabilities',
      'Low additional licensing cost',
      'Integration with Active Directory'
    ],
    weaknesses: [
      'Very limited NAC capabilities',
      'No advanced features',
      'Limited device visibility',
      'Poor IoT and BYOD support',
      'Minimal automation'
    ],
    bestFor: [
      'Small organizations with limited requirements',
      'Windows-centric environments',
      'Organizations needing basic authentication only',
      'Environments with limited budget'
    ]
  },
  
  'arista': {
    name: 'Arista CloudVision',
    logo: 'img/vendors/arista-logo.png',
    architecture: 'hybrid',
    description: 'Hybrid network management with NAC capabilities focused on campus networks',
    features: {
      cloudIntegration: true,
      legacyDevices: false,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false,
      agentless: true,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: true,
      automatedRemediation: false
    },
    strengths: [
      'Good network visibility',
      'Strong integration with Arista switches',
      'Solid campus network support',
      'Centralized management',
      'Analytical capabilities'
    ],
    weaknesses: [
      'Limited traditional NAC features',
      'Less mature solution for NAC use cases',
      'More focused on network management than security',
      'Moderate complexity'
    ],
    bestFor: [
      'Organizations with Arista infrastructure',
      'Campus network environments',
      'Organizations wanting integrated network management',
      'Mid-size to large enterprises'
    ]
  },
  
  'foxpass': {
    name: 'Foxpass',
    logo: 'img/vendors/foxpass-logo.png',
    architecture: 'cloud',
    description: 'Cloud-based RADIUS and LDAP server with basic NAC capabilities',
    features: {
      cloudIntegration: true,
      legacyDevices: false,
      byod: true,
      iot: false,
      wireless: true,
      remoteUsers: false,
      agentless: true,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: true,
      hybridEnvironment: false,
      automatedRemediation: false
    },
    strengths: [
      'Simple cloud-based solution',
      'Easy deployment',
      'Good for basic authentication',
      'SSO capabilities',
      'User-friendly interface'
    ],
    weaknesses: [
      'Limited enterprise NAC features',
      'Basic device profiling',
      'Limited security automation',
      'Less mature for large enterprises'
    ],
    bestFor: [
      'Small to mid-size organizations',
      'Cloud-first environments',
      'Organizations needing basic wireless authentication',
      'Environments with limited complexity'
    ]
  },
  
  'no-nac': {
    name: 'No NAC',
    logo: 'img/vendors/no-nac-icon.png',
    architecture: 'none',
    description: 'No network access control solution in place',
    features: {
      cloudIntegration: false,
      legacyDevices: false,
      byod: false,
      iot: false,
      wireless: false,
      remoteUsers: false,
      agentless: false,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: false,
      automatedRemediation: false
    },
    strengths: [
      'No upfront investment',
      'No implementation effort',
      'No maintenance overhead',
      'No complexity'
    ],
    weaknesses: [
      'No device visibility',
      'No access control',
      'No security enforcement',
      'No compliance capabilities',
      'High security risk',
      'Vulnerable to unauthorized access',
      'No protection against malicious devices'
    ],
    bestFor: [
      'Not recommended for any organization',
      'Extremely high-risk approach',
      'Fails to meet basic security requirements',
      'Non-compliant with most regulations'
    ]
  }
};

// Export vendor data if in a module context
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VENDORS };
}
EOL

echo -e "${GREEN}Vendor data file created${NC}"

# ================================================================
# 12. Complete the script
# ================================================================
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Portnox Dashboard Enhancement Script Complete!               ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}The following enhancements have been created:${NC}"
echo -e "  • Modern UI with responsive design"
echo -e "  • Advanced interactive charts with ApexCharts and D3"
echo -e "  • Comprehensive Executive View with strategic metrics"
echo -e "  • Detailed Security & Compliance View with framework mapping"
echo -e "  • Industry-specific analysis with threat modeling"
echo -e "  • Improved vendor comparison capabilities"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}To apply these changes, run: ./update.sh${NC}"
echo -e "${BLUE}=================================================================${NC}"

# Exit with success
exit 0
