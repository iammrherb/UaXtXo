#!/bin/bash

# Comprehensive Fix for Portnox Total Cost Analyzer UI
# This script fully restores the sidebar and main dashboard display

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
CHART_DIR="$JS_DIR/charts"
BACKUP_DIR="$APP_ROOT/backups/$(date +%Y%m%d_%H%M%S)"

echo -e "${BLUE}=======================================================${NC}"
echo -e "${GREEN}   Portnox Total Cost Analyzer - Complete UI Restore   ${NC}"
echo -e "${BLUE}=======================================================${NC}"
echo -e "${YELLOW}Completely restoring sidebar and main dashboard layout${NC}"
echo -e "${BLUE}=======================================================${NC}"
echo ""

# Create backup directories
mkdir -p "$BACKUP_DIR/css" "$BACKUP_DIR/js/components" "$BACKUP_DIR/js/charts"

# 1. Back up existing files
echo -e "${YELLOW}Creating backup of existing files...${NC}"
cp -r "$CSS_DIR" "$BACKUP_DIR/"
cp -r "$JS_DIR" "$BACKUP_DIR/"
cp "$APP_ROOT/index.html" "$BACKUP_DIR/" 2>/dev/null

# 2. Create or update main.css with proper styling
mkdir -p "$CSS_DIR"
echo -e "${YELLOW}Updating main CSS file with proper styling...${NC}"

cat > "$CSS_DIR/main.css" << 'EOL'
/**
 * Main Stylesheet for Portnox Total Cost Analyzer
 */

/* === Base Styles === */
:root {
  --primary-color: #1a5a96;
  --primary-light: #5b8dc5;
  --primary-dark: #0d4275;
  --secondary-color: #4CAF50;
  --secondary-light: #81C784;
  --secondary-dark: #388E3C;
  --warning-color: #f39c12;
  --danger-color: #e74c3c;
  --success-color: #2ecc71;
  --info-color: #3498db;
  --text-color: #333333;
  --text-light: #666666;
  --bg-color: #f9fafb;
  --card-bg: #ffffff;
  --border-color: #e0e0e0;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --highlight-color: rgba(26, 90, 150, 0.05);
  --sidebar-width: 350px;
  --sidebar-collapsed-width: 0;
  --header-height: 70px;
  --footer-height: 50px;
}

body.dark-mode {
  --primary-color: #2980b9;
  --primary-light: #3498db;
  --primary-dark: #1a5a96;
  --text-color: #e0e0e0;
  --text-light: #bbbbbb;
  --bg-color: #121212;
  --card-bg: #1e1e1e;
  --border-color: #333333;
  --shadow-color: rgba(0, 0, 0, 0.2);
  --highlight-color: rgba(41, 128, 185, 0.1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-color);
  background-color: var(--bg-color);
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  color: var(--text-color);
  margin-bottom: 0.5em;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* === Layout === */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.app-header {
  height: var(--header-height);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.logo-section {
  display: flex;
  align-items: center;
}

.company-logo {
  height: 35px;
  margin-right: 15px;
}

.app-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.app-title h1 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  color: white;
}

.subtitle {
  font-size: 14px;
  font-weight: 400;
  margin-top: 3px;
  color: rgba(255, 255, 255, 0.9);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.main-content {
  display: flex;
  flex: 1;
  position: relative;
}

.content-area {
  flex: 1;
  transition: margin-left 0.3s ease;
  margin-left: var(--sidebar-width);
  overflow-x: hidden;
}

.content-area.expanded {
  margin-left: var(--sidebar-collapsed-width);
}

.content-wrapper {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.app-footer {
  background-color: var(--bg-color);
  border-top: 1px solid var(--border-color);
  padding: 15px 0;
  height: var(--footer-height);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-copyright {
  color: var(--text-light);
  font-size: 13px;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  color: var(--text-light);
  font-size: 13px;
}

.footer-social {
  display: flex;
  gap: 15px;
}

.social-link {
  color: var(--text-light);
  font-size: 16px;
}

/* === Sidebar === */
.sidebar {
  width: var(--sidebar-width);
  height: calc(100vh - var(--header-height) - var(--footer-height));
  background-color: var(--card-bg);
  border-right: 1px solid var(--border-color);
  transition: width 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: var(--header-height);
  left: 0;
  bottom: var(--footer-height);
  z-index: 99;
}

.sidebar.collapsed {
  width: var(--sidebar-collapsed-width);
}

.sidebar-header {
  padding: 15px;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
}

.sidebar-header h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  color: white;
}

.sidebar-header h2 i {
  margin-right: 10px;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.sidebar-footer {
  padding: 15px;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-color);
}

.sidebar-toggle {
  position: fixed;
  left: var(--sidebar-width);
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 50px;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-left: none;
  border-radius: 0 5px 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 99;
  transition: left 0.3s ease;
  box-shadow: 2px 0 5px var(--shadow-color);
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

/* Config Cards */
.config-card {
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px var(--shadow-color);
  margin-bottom: 15px;
}

.config-card-header {
  background: linear-gradient(to right, var(--primary-color), var(--primary-dark));
  color: white;
  padding: 12px 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.config-card-header h3 {
  margin: 0;
  font-size: 15px;
  color: white;
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
  transition: max-height 0.3s ease, padding 0.3s ease;
  max-height: 1000px;
  overflow: hidden;
}

.config-card-content.collapsed {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

/* Form Elements */
.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 14px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-size: 14px;
  color: var(--text-color);
  background-color: var(--card-bg);
}

.form-control:focus {
  border-color: var(--primary-color);
  outline: none;
  box-shadow: 0 0 0 3px rgba(26, 90, 150, 0.1);
}

.form-select {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-size: 14px;
  color: var(--text-color);
  background-color: var(--card-bg);
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
}

.form-select:focus {
  border-color: var(--primary-color);
  outline: none;
  box-shadow: 0 0 0 3px rgba(26, 90, 150, 0.1);
}

.helper-text {
  font-size: 12px;
  color: var(--text-light);
  margin-top: 5px;
}

/* === Vendor Selection === */
.vendor-select-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
  margin-bottom: 15px;
}

.vendor-select-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
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
  box-shadow: 0 4px 8px var(--shadow-color);
  border-color: var(--primary-color);
}

.vendor-select-card .vendor-logo {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.vendor-select-card .vendor-logo img {
  max-height: 28px;
  max-width: 80px;
  object-fit: contain;
}

.vendor-select-card .vendor-name {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-color);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 95%;
}

.vendor-select-card.selected {
  border: 2px solid var(--primary-color);
  background-color: var(--highlight-color);
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
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

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
}

.badge-primary {
  background-color: var(--primary-color);
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

.vendor-counter {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  background-color: var(--highlight-color);
  border-radius: 6px;
  border: 1px dashed var(--primary-color);
}

.vendor-counter-icon {
  color: var(--primary-color);
  margin-right: 10px;
}

.vendor-counter-text {
  flex: 1;
  font-size: 12px;
}

.vendor-counter-value {
  font-weight: 700;
  color: var(--primary-color);
  padding: 2px 8px;
  background-color: var(--card-bg);
  border-radius: 4px;
  box-shadow: 0 1px 3px var(--shadow-color);
}

/* Range Slider */
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
  color: var(--primary-color);
}

input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e0e0e0;
  outline: none;
  margin: 10px 0;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--primary-color);
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--primary-color);
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Checkbox */
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  margin-top: 10px;
}

.checkbox-item {
  display: flex;
  align-items: center;
}

.custom-checkbox {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.custom-checkbox input {
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  width: 18px;
  height: 18px;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.custom-checkbox:hover .checkmark {
  border-color: var(--primary-color);
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Calculate Button */
.btn-calculate {
  width: 100%;
  padding: 12px 20px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
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

/* === Button Styles === */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.btn-icon {
  padding: 8px 12px;
}

.btn-icon i {
  margin-right: 6px;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* === Main Content Sections === */
.main-tabs {
  display: flex;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 20px;
  background-color: var(--card-bg);
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

.main-tab {
  padding: 15px 20px;
  font-weight: 600;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  color: var(--text-light);
  display: flex;
  align-items: center;
}

.main-tab i {
  margin-right: 8px;
  font-size: 16px;
}

.main-tab:hover {
  background-color: var(--highlight-color);
  color: var(--primary-color);
}

.main-tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  background-color: var(--highlight-color);
}

.view-panel {
  display: none;
}

.view-panel.active {
  display: block;
}

.results-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.results-tab {
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  color: var(--text-light);
}

.results-tab:hover {
  color: var(--primary-color);
}

.results-tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.results-panel {
  display: none;
}

.results-panel.active {
  display: block;
}

.panel-header {
  margin-bottom: 25px;
}

.panel-header h2 {
  font-size: 24px;
  margin-bottom: 5px;
}

.panel-header .subtitle {
  color: var(--text-light);
  font-size: 16px;
}

/* Dashboard Cards */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
  margin-bottom: 30px;
}

.dashboard-card {
  background-color: var(--card-bg);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px var(--shadow-color);
  transition: all 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px var(--shadow-color);
}

.dashboard-card h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: var(--text-light);
}

.dashboard-card .metric-value {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 5px;
  color: var(--text-color);
}

.highlight-value {
  color: var(--primary-color);
}

.dashboard-card .metric-label {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 10px;
}

.dashboard-card .metric-trend {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: var(--success-color);
}

.dashboard-card .metric-trend i {
  margin-right: 5px;
}

.highlight-card {
  border-left: 4px solid var(--primary-color);
}

/* Chart Containers */
.chart-container {
  background-color: var(--card-bg);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px var(--shadow-color);
}

.chart-container h3 {
  font-size: 18px;
  margin-bottom: 20px;
}

.chart-wrapper {
  height: 400px;
  width: 100%;
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

/* Benefits Grid */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
}

.benefit-card {
  background-color: var(--card-bg);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px var(--shadow-color);
  transition: all 0.3s ease;
  text-align: center;
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px var(--shadow-color);
}

.benefit-card .benefit-icon {
  width: 60px;
  height: 60px;
  background-color: var(--highlight-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

.benefit-card .benefit-icon i {
  font-size: 24px;
  color: var(--primary-color);
}

.benefit-card h4 {
  font-size: 16px;
  margin-bottom: 10px;
}

.benefit-card p {
  font-size: 14px;
  color: var(--text-light);
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
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.loading-overlay.show {
  opacity: 1;
  visibility: visible;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--primary-color);
  animation: spin 1s infinite linear;
}

.loading-spinner p {
  margin-top: 20px;
  color: white;
  font-size: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Toast Notifications */
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.toast {
  background-color: var(--card-bg);
  border-left: 4px solid var(--primary-color);
  border-radius: 6px;
  box-shadow: 0 4px 15px var(--shadow-color);
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  transform: translateX(120%);
  transition: transform 0.3s ease;
  max-width: 350px;
}

.toast.show {
  transform: translateX(0);
}

.toast i {
  margin-right: 10px;
  font-size: 18px;
}

.toast-success {
  border-left-color: var(--success-color);
}

.toast-success i {
  color: var(--success-color);
}

.toast-error {
  border-left-color: var(--danger-color);
}

.toast-error i {
  color: var(--danger-color);
}

.toast-warning {
  border-left-color: var(--warning-color);
}

.toast-warning i {
  color: var(--warning-color);
}

/* Tables */
.table-responsive {
  overflow-x: auto;
  margin-bottom: 30px;
}

.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px var(--shadow-color);
}

.data-table th {
  background-color: var(--primary-color);
  color: white;
  font-weight: 600;
  padding: 12px 15px;
  text-align: left;
}

.data-table td {
  padding: 12px 15px;
  border-bottom: 1px solid var(--border-color);
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:nth-child(even) {
  background-color: var(--highlight-color);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}

@media (max-width: 992px) {
  .app-title h1 {
    font-size: 18px;
  }
  
  .subtitle {
    font-size: 12px;
  }
  
  .btn {
    padding: 6px 12px;
    font-size: 13px;
  }
  
  .content-wrapper {
    padding: 15px;
  }
  
  .dashboard-grid {
    grid-gap: 15px;
  }
  
  .benefits-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
}

@media (max-width: 768px) {
  :root {
    --sidebar-width: 280px;
  }
  
  .sidebar {
    position: fixed;
    top: var(--header-height);
    left: -280px;
    height: calc(100vh - var(--header-height));
    z-index: 1000;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    transition: left 0.3s ease;
  }
  
  .sidebar.active {
    left: 0;
  }
  
  .content-area {
    margin-left: 0 !important;
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
  
  .app-header {
    padding: 0 10px;
  }
  
  .header-content {
    padding: 0 10px;
  }
  
  .app-title h1 {
    font-size: 16px;
  }
  
  .company-logo {
    height: 30px;
  }
  
  .subtitle {
    font-size: 11px;
  }
  
  .header-actions .btn span {
    display: none;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
  
  .panel-header h2 {
    font-size: 20px;
  }
  
  .panel-header .subtitle {
    font-size: 14px;
  }
  
  .main-tab {
    padding: 10px 15px;
    font-size: 13px;
  }
  
  .results-tab {
    padding: 8px 15px;
    font-size: 13px;
  }
}

@media (max-width: 576px) {
  .main-tabs {
    flex-wrap: wrap;
  }
  
  .main-tab {
    flex: 1 0 50%;
    text-align: center;
    padding: 8px;
  }
  
  .results-tabs {
    flex-wrap: wrap;
  }
  
  .results-tab {
    flex: 1 0 50%;
    text-align: center;
    padding: 8px;
  }
  
  .chart-container {
    padding: 15px 10px;
  }
  
  .chart-wrapper {
    height: 300px;
  }
  
  .vendor-select-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .checkbox-grid {
    grid-template-columns: 1fr;
  }
}
EOL

# 3. Update vendor-logo-fix.js to ensure proper logo sizing
echo -e "${YELLOW}Creating vendor logo fix script...${NC}"

mkdir -p "$JS_DIR"
cat > "$JS_DIR/vendor-logo-fix.js" << 'EOL'
/**
 * Immediate fix for vendor logos in sidebar
 * This script ensures all vendor logos are properly sized
 */
(function() {
  // Function to apply fixes to all vendor cards
  function fixVendorLogos() {
    const vendorCards = document.querySelectorAll('.vendor-select-card');
    
    vendorCards.forEach(card => {
      const logoImg = card.querySelector('.vendor-logo img');
      if (logoImg) {
        // Apply important style rules to override any inline styles
        logoImg.style.cssText = 'max-height: 28px !important; max-width: 80px !important; object-fit: contain !important;';
      }
      
      // Fix card height and padding
      card.style.cssText = 'height: 80px !important; padding: 8px 4px !important;';
      
      // Fix vendor name text
      const nameElement = card.querySelector('.vendor-name');
      if (nameElement) {
        nameElement.style.cssText = 'font-size: 11px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; max-width: 95% !important; text-align: center !important;';
      }
    });
  }
  
  // Apply fixes on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixVendorLogos);
  } else {
    fixVendorLogos();
  }
  
  // Set up a MutationObserver to apply fixes when the DOM changes
  const observer = new MutationObserver(function(mutations) {
    fixVendorLogos();
  });
  
  // Start observing once the DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Also run fix when content is loaded
    window.addEventListener('load', fixVendorLogos);
  });
})();
EOL

# 4. Update sidebar-manager.js for proper vendor card management
echo -e "${YELLOW}Updating sidebar manager with proper vendor handling...${NC}"

mkdir -p "$COMPONENT_DIR"
cat > "$COMPONENT_DIR/sidebar-manager.js" << 'EOL'
/**
 * Enhanced Sidebar Manager for Portnox Total Cost Analyzer
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

# 5. Update index.html with proper structure and styles
echo -e "${YELLOW}Updating index.html with proper structure...${NC}"

# Try to find index.html
INDEX_HTML=$(find "$APP_ROOT" -name "index.html" -type f | head -n 1)

if [ -f "$INDEX_HTML" ]; then
  # Create a temporary file
  TMP_FILE=$(mktemp)
  
  # Insert inline styles to fix vendor cards immediately
  sed '/<\/head>/i \
    <!-- Emergency fixes for vendor cards -->\
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
        max-width: 95% !important;\
        text-align: center !important;\
      }\
    </style>' "$INDEX_HTML" > "$TMP_FILE"
  
  # Add emergency logo fix script
  sed '/<\/body>/i \
    <!-- Immediate fix for vendor logos -->\
    <script src="js/vendor-logo-fix.js"></script>' "$TMP_FILE" > "$INDEX_HTML"
  
  echo -e "${GREEN}Successfully updated index.html${NC}"
else
  echo -e "${RED}Could not find index.html. Some changes were not applied.${NC}"
fi

# 6. Create dashboard enhancement file
echo -e "${YELLOW}Creating dashboard enhancement file...${NC}"

mkdir -p "$JS_DIR/utils"
cat > "$JS_DIR/utils/dashboard-enhancer.js" << 'EOL'
/**
 * Dashboard Enhancer for Portnox Total Cost Analyzer
 * Improves the appearance and functionality of dashboard components
 */

(function() {
  // Function to enhance dashboard cards
  function enhanceDashboardCards() {
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    
    // Add staggered fade-in animation
    dashboardCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 * index);
    });
    
    // Enhance metric values
    const metricValues = document.querySelectorAll('.metric-value');
    metricValues.forEach(value => {
      // Add subtle pulse effect on load
      value.animate([
        { opacity: 0.7, transform: 'scale(0.95)' },
        { opacity: 1, transform: 'scale(1)' }
      ], {
        duration: 800,
        easing: 'ease-out',
        fill: 'forwards'
      });
    });
  }
  
  // Function to enhance chart containers
  function enhanceChartContainers() {
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach((container, index) => {
      container.style.opacity = '0';
      container.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 300 + (100 * index));
    });
  }
  
  // Function to enhance tabs
  function enhanceTabs() {
    const mainTabs = document.querySelectorAll('.main-tab');
    const resultsTabs = document.querySelectorAll('.results-tab');
    
    // Add hover effect to main tabs
    mainTabs.forEach(tab => {
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
    });
    
    // Add hover effect to results tabs
    resultsTabs.forEach(tab => {
      tab.addEventListener('mouseenter', () => {
        if (!tab.classList.contains('active')) {
          tab.style.color = '#1a5a96';
        }
      });
      
      tab.addEventListener('mouseleave', () => {
        if (!tab.classList.contains('active')) {
          tab.style.color = '';
        }
      });
    });
  }
  
  // Initialize all enhancements
  function initEnhancements() {
    enhanceDashboardCards();
    enhanceChartContainers();
    enhanceTabs();
  }
  
  // Run enhancements when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancements);
  } else {
    initEnhancements();
  }
  
  // Also run when view changes
  document.addEventListener('viewChanged', initEnhancements);
})();
EOL

# 7. Add dashboard-enhancer.js to index.html
if [ -f "$INDEX_HTML" ]; then
  # Create a temporary file
  TMP_FILE=$(mktemp)
  
  # Add dashboard enhancer script
  sed '/<\/body>/i \
    <!-- Dashboard enhancements -->\
    <script src="js/utils/dashboard-enhancer.js"></script>' "$INDEX_HTML" > "$TMP_FILE"
  
  # Replace the original
  mv "$TMP_FILE" "$INDEX_HTML"
  
  echo -e "${GREEN}Added dashboard enhancer script to index.html${NC}"
else
  echo -e "${RED}Could not add dashboard enhancer to index.html${NC}"
fi

# 8. Create CSS for enhanced views
echo -e "${YELLOW}Creating additional CSS for enhanced views...${NC}"

mkdir -p "$CSS_DIR/views"
cat > "$CSS_DIR/views/enhanced-views.css" << 'EOL'
/**
 * Enhanced view styles for Portnox Total Cost Analyzer
 */

/* Executive View Enhancements */
.executive-view {
  animation: fadeIn 0.5s ease-in-out;
}

.executive-summary {
  margin-bottom: 30px;
}

.executive-summary .dashboard-grid {
  margin-bottom: 30px;
}

.executive-summary .highlight-card {
  position: relative;
  overflow: hidden;
}

.executive-summary .highlight-card:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(26, 90, 150, 0.05) 0%, rgba(26, 90, 150, 0) 70%);
  z-index: 0;
}

.executive-summary .highlight-value {
  position: relative;
  z-index: 1;
  color: #1a5a96;
  font-weight: 700;
}

.executive-summary .metric-label {
  position: relative;
  z-index: 1;
}

/* Financial View Enhancements */
.financial-view {
  animation: fadeIn 0.5s ease-in-out;
}

.financial-analysis .comparison-table {
  margin-bottom: 30px;
}

.financial-analysis .highlight-cell {
  color: #1a5a96;
  font-weight: 700;
  background-color: rgba(26, 90, 150, 0.05);
}

/* Security View Enhancements */
.security-view {
  animation: fadeIn 0.5s ease-in-out;
}

.security-analysis .score-card {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.security-analysis .score-indicator {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-right: 20px;
  background: linear-gradient(135deg, #1a5a96, #0d4275);
}

.security-analysis .score-details {
  flex: 1;
}

.security-analysis .score-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 5px;
}

.security-analysis .score-description {
  font-size: 14px;
  color: #666;
  margin: 0;
}

/* Technical View Enhancements */
.technical-view {
  animation: fadeIn 0.5s ease-in-out;
}

.technical-view .feature-comparison {
  margin-bottom: 30px;
}

.technical-view .feature-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.technical-view .feature-table th {
  background-color: #1a5a96;
  color: white;
  padding: 12px 15px;
  text-align: center;
  font-size: 14px;
}

.technical-view .feature-table td {
  padding: 12px 15px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

.technical-view .feature-table td:first-child {
  text-align: left;
  font-weight: 600;
}

.technical-view .feature-table tr:last-child td {
  border-bottom: none;
}

.technical-view .feature-table tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.02);
}

.technical-view .feature-table .feature-supported {
  color: #2ecc71;
  font-size: 18px;
}

.technical-view .feature-table .feature-unsupported {
  color: #e74c3c;
  font-size: 18px;
}

.technical-view .feature-table .feature-partial {
  color: #f39c12;
  font-size: 18px;
}

/* Architecture cards */
.architecture-comparison {
  margin-top: 30px;
}

.architecture-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
}

.architecture-card {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.architecture-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.arch-badge {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
  color: white;
}

.arch-badge.cloud {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.arch-badge.hybrid {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
}

.arch-badge.on-premises {
  background: linear-gradient(135deg, #e67e22, #d35400);
}

.architecture-card h4 {
  font-size: 18px;
  margin: 0 0 15px;
}

.architecture-card p {
  font-size: 14px;
  color: #666;
  margin: 0 0 15px;
}

.architecture-benefits {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.architecture-benefits li {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.architecture-benefits li:before {
  content: '\f00c';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  margin-right: 10px;
  color: #2ecc71;
}

.architecture-benefits li:last-child {
  border-bottom: none;
}

/* Animation keyframes */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Animations for elements */
.animate-fadeIn {
  animation: fadeIn 0.5s ease forwards;
}

.animate-slideInRight {
  animation: slideInRight 0.5s ease forwards;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

/* Enhanced vendor comparison styles */
.vendor-comparison-container {
  margin-top: 30px;
}

.comparison-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.comparison-table th {
  background-color: #1a5a96;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 14px;
  vertical-align: middle;
}

.comparison-table th:first-child {
  text-align: left;
}

.comparison-table th .vendor-logo-small {
  max-height: 25px;
  max-width: 70px;
  margin-bottom: 5px;
}

.comparison-table td {
  padding: 12px 15px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

.comparison-table td:first-child {
  text-align: left;
  font-weight: 600;
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.comparison-table tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.02);
}

.comparison-table .highlight-cell {
  background-color: rgba(26, 90, 150, 0.05);
  font-weight: 700;
  color: #1a5a96;
}
EOL

# 9. Create enhanced particle background with connectivity visuals
echo -e "${YELLOW}Creating enhanced particle background...${NC}"

cat > "$COMPONENT_DIR/particle-background.js" << 'EOL'
/**
 * Enhanced Particle Background for Portnox Total Cost Analyzer
 * Creates an interactive network background visualization
 */

class ParticleBackground {
  constructor(containerId = 'particles-js') {
    this.containerId = containerId;
    
    // Default particle configuration
    this.config = {
      particles: {
        number: {
          value: 60,
          density: {
            enable: true,
            value_area: 900
          }
        },
        color: {
          value: '#1a5a96'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 0.8,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#1a5a96',
          opacity: 0.3,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 180,
            line_linked: {
              opacity: 0.8
            }
          },
          bubble: {
            distance: 400,
            size: 6,
            duration: 2,
            opacity: 0.8,
            speed: 3
          },
          repulse: {
            distance: 150,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    };
    
    // Update colors based on theme
    this.updateColors();
    
    // Initialize particles
    this.init();
    
    // Set up theme change listener
    this.setupThemeListener();
    
    // Setup intelligent behavior
    this.setupIntelligentBehavior();
  }
  
  /**
   * Initialize particles.js
   */
  init() {
    if (typeof particlesJS !== 'undefined' && document.getElementById(this.containerId)) {
      particlesJS(this.containerId, this.config);
    } else {
      console.warn('particles.js not loaded or container not found');
    }
  }
  
  /**
   * Update colors based on theme (light/dark)
   */
  updateColors() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
      this.config.particles.color.value = '#2980b9';
      this.config.particles.line_linked.color = '#2980b9';
    } else {
      this.config.particles.color.value = '#1a5a96';
      this.config.particles.line_linked.color = '#1a5a96';
    }
  }
  
  /**
   * Set up theme change listener
   */
  setupThemeListener() {
    // Listen for theme changes
    window.addEventListener('themechange', () => {
      this.updateColors();
      this.init();
    });
    
    // Detect dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        setTimeout(() => {
          this.updateColors();
          this.init();
        }, 100);
      });
    }
  }
  
  /**
   * Set up intelligent behavior for particle interactions
   */
  setupIntelligentBehavior() {
    // Track mouse activity
    let lastActivity = Date.now();
    let isIdle = false;
    const idleThreshold = 30000; // 30 seconds
    
    // Update activity timestamp
    const updateActivity = () => {
      lastActivity = Date.now();
      if (isIdle) {
        isIdle = false;
        this.becomeActive();
      }
    };
    
    // Events that signal user activity
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    activityEvents.forEach(eventType => {
      document.addEventListener(eventType, updateActivity);
    });
    
    // Check for idle state
    setInterval(() => {
      if (!isIdle && Date.now() - lastActivity > idleThreshold) {
        isIdle = true;
        this.becomeIdle();
      }
    }, 5000);
    
    // Adjust particles based on scroll position
    window.addEventListener('scroll', this.throttle(() => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollY / maxScroll;
      
      if (typeof pJSDom !== 'undefined' && pJSDom.length > 0 && pJSDom[0].pJS) {
        const maxParticles = 60;
        const minParticles = 20;
        const newParticleCount = Math.max(minParticles, Math.round(maxParticles - (scrollPercent * (maxParticles - minParticles))));
        
        if (Math.abs(pJSDom[0].pJS.particles.array.length - newParticleCount) > 5) {
          pJSDom[0].pJS.particles.number.value = newParticleCount;
          pJSDom[0].pJS.fn.particlesRefresh();
        }
      }
    }, 200));
    
    // Add particle bursts on important clicks
    document.addEventListener('click', this.throttle((event) => {
      if (typeof pJSDom !== 'undefined' && pJSDom.length > 0 && pJSDom[0].pJS) {
        const pJS = pJSDom[0].pJS;
        
        // Only add burst for important UI elements
        const targetElement = event.target;
        const isImportantElement = 
          targetElement.classList.contains('btn') || 
          targetElement.classList.contains('vendor-select-card') ||
          targetElement.closest('.btn') || 
          targetElement.closest('.vendor-select-card');
        
        if (isImportantElement) {
          // Create particle burst effect
          for (let i = 0; i < 5; i++) {
            if (pJS.particles.array.length < pJS.particles.number.value * 1.2) {
              pJS.particles.array.push(
                new pJS.fn.particle(
                  pJS.particles.color,
                  pJS.particles.opacity.value,
                  {
                    'x': event.clientX,
                    'y': event.clientY
                  }
                )
              );
            }
          }
        }
      }
    }, 200));
  }
  
  /**
   * Transition to idle state (calmer, slower)
   */
  becomeIdle() {
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0 && pJSDom[0].pJS) {
      const pJS = pJSDom[0].pJS;
      
      // Reduce activity for idle state
      pJS.particles.move.speed = 0.7;
      pJS.particles.opacity.value = 0.3;
      pJS.particles.line_linked.opacity = 0.2;
      
      // Apply changes
      pJS.fn.particlesRefresh();
    }
  }
  
  /**
   * Transition to active state (more energetic)
   */
  becomeActive() {
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0 && pJSDom[0].pJS) {
      const pJS = pJSDom[0].pJS;
      
      // Increase activity for active state
      pJS.particles.move.speed = 1.5;
      pJS.particles.opacity.value = 0.5;
      pJS.particles.line_linked.opacity = 0.3;
      
      // Apply changes
      pJS.fn.particlesRefresh();
    }
  }
  
  /**
   * Throttle function to limit execution frequency
   */
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.particleBackground = new ParticleBackground();
});
EOL

# 10. Create enhanced header particles for better header visualization
echo -e "${YELLOW}Creating enhanced header particles...${NC}"

cat > "$COMPONENT_DIR/header-particles.js" << 'EOL'
/**
 * Enhanced Header Particles for Portnox Total Cost Analyzer
 * Creates a subtle network animation in the header
 */

class HeaderParticles {
  constructor(containerId = 'particles-header') {
    this.containerId = containerId;
    
    // Configure lighter particles for header
    this.config = {
      particles: {
        number: {
          value: 15,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#1a5a96'
        },
        shape: {
          type: ['circle', 'triangle'],
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: true,
            speed: 0.5,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#1a5a96',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: false
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.4
            }
          }
        }
      },
      retina_detect: true
    };
    
    // Update colors based on theme
    this.updateColors();
    
    // Initialize particles
    this.init();
    
    // Set up theme listener
    this.setupThemeListener();
    
    // Set up logo interaction
    this.setupLogoInteraction();
  }
  
  /**
   * Initialize particles in the header
   */
  init() {
    if (typeof particlesJS !== 'undefined' && document.getElementById(this.containerId)) {
      particlesJS(this.containerId, this.config);
    } else {
      console.warn('particles.js not loaded or header container not found');
    }
  }
  
  /**
   * Update colors based on theme
   */
  updateColors() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
      this.config.particles.color.value = '#2980b9';
      this.config.particles.line_linked.color = '#2980b9';
    } else {
      this.config.particles.color.value = '#1a5a96';
      this.config.particles.line_linked.color = '#1a5a96';
    }
  }
  
  /**
   * Set up theme change listener
   */
  setupThemeListener() {
    // Listen for theme changes
    window.addEventListener('themechange', () => {
      this.updateColors();
      this.init();
    });
    
    // Detect dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        setTimeout(() => {
          this.updateColors();
          this.init();
        }, 100);
      });
    }
  }
  
  /**
   * Make the logo interactive with particle effects
   */
  setupLogoInteraction() {
    const logo = document.querySelector('.company-logo');
    if (!logo) return;
    
    // Make logo interactive
    logo.style.transition = 'all 0.3s ease';
    logo.style.cursor = 'pointer';
    
    // Add hover effect
    logo.addEventListener('mouseenter', () => {
      // Create particle excitement effect
      if (typeof pJSDom !== 'undefined' && pJSDom.length > 1 && pJSDom[1].pJS) {
        const pJS = pJSDom[1].pJS;
        
        // Speed up particles near logo
        const origSpeed = pJS.particles.move.speed;
        pJS.particles.move.speed = origSpeed * 2;
        
        // Reset after a short time
        setTimeout(() => {
          pJS.particles.move.speed = origSpeed;
        }, 800);
      }
      
      // Scale logo slightly
      logo.style.transform = 'scale(1.05)';
    });
    
    // Reset on mouse leave
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'scale(1)';
    });
    
    // Add click effect
    logo.addEventListener('click', () => {
      // Create particle burst from logo
      if (typeof pJSDom !== 'undefined' && pJSDom.length > 1 && pJSDom[1].pJS) {
        const pJS = pJSDom[1].pJS;
        
        // Get logo position
        const rect = logo.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Add a burst of particles from logo
        for (let i = 0; i < 8; i++) {
          pJS.particles.array.push(
            new pJS.fn.particle(
              pJS.particles.color,
              pJS.particles.opacity.value,
              {
                'x': centerX,
                'y': centerY
              }
            )
          );
        }
      }
      
      // Add bounce animation
      logo.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(0.9)' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(1)' }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'
      });
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.headerParticles = new HeaderParticles();
});
EOL

# 11. Create main app initialization file
echo -e "${YELLOW}Creating main app initialization file...${NC}"

cat > "$JS_DIR/app-init.js" << 'EOL'
/**
 * Main Application Initialization for Portnox Total Cost Analyzer
 * Ensures all components load properly and fixes UI issues
 */

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Portnox Total Cost Analyzer...');
  
  // Initialize sidebar first to ensure proper vendor card display
  initializeSidebar();
  
  // Initialize particles for visual effects
  initializeParticles();
  
  // Initialize UI enhancements
  initializeUI();
  
  // Initialize event listeners
  initializeEvents();
  
  console.log('Portnox Total Cost Analyzer initialized successfully');
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
 * Initialize particle effects
 */
function initializeParticles() {
  // Check if particles.js is loaded
  if (typeof particlesJS !== 'undefined') {
    // Create main background particles
    if (!window.particleBackground) {
      window.particleBackground = new ParticleBackground();
    }
    
    // Create header particles
    if (!window.headerParticles) {
      window.headerParticles = new HeaderParticles();
    }
  } else {
    console.warn('particles.js not loaded, visual effects will be limited');
  }
}

/**
 * Initialize UI enhancements
 */
function initializeUI() {
  // Add fade-in animation to dashboard cards
  const dashboardCards = document.querySelectorAll('.dashboard-card');
  dashboardCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 100}ms`;
    card.classList.add('animate-fadeIn');
  });
  
  // Add fade-in animation to chart containers
  const chartContainers = document.querySelectorAll('.chart-container');
  chartContainers.forEach((container, index) => {
    container.style.animationDelay = `${300 + (index * 100)}ms`;
    container.classList.add('animate-fadeIn');
  });
  
  // Enhance tabs with hover effects
  const tabs = document.querySelectorAll('.main-tab, .results-tab');
  tabs.forEach(tab => {
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
  });
}

/**
 * Initialize event listeners
 */
function initializeEvents() {
  // Handle tab switching
  const mainTabs = document.querySelectorAll('.main-tab');
  const viewPanels = document.querySelectorAll('.view-panel');
  
  mainTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const viewName = tab.dataset.view;
      
      // Update active tab
      mainTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show corresponding view panel
      viewPanels.forEach(panel => {
        if (panel.dataset.view === viewName) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
      
      // Trigger view changed event
      document.dispatchEvent(new CustomEvent('viewChanged', {
        detail: { view: viewName }
      }));
    });
  });
  
  // Handle results tab switching
  document.querySelectorAll('.results-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabGroup = tab.closest('.results-tabs');
      const panelName = tab.dataset.panel;
      
      // Update active tab in this group
      tabGroup.querySelectorAll('.results-tab').forEach(t => {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      
      // Show corresponding panel
      const panelContainer = tabGroup.parentElement;
      panelContainer.querySelectorAll('.results-panel').forEach(panel => {
        if (panel.id === panelName) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
  
  // Handle dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
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

# 12. Add app-init.js to index.html
if [ -f "$INDEX_HTML" ]; then
  # Create a temporary file
  TMP_FILE=$(mktemp)
  
  # Add app initialization script
  sed '/<\/body>/i \
    <!-- Main application initialization -->\
    <script src="js/app-init.js"></script>' "$INDEX_HTML" > "$TMP_FILE"
  
  # Replace the original
  mv "$TMP_FILE" "$INDEX_HTML"
  
  echo -e "${GREEN}Added app initialization script to index.html${NC}"
else
  echo -e "${RED}Could not add app initialization to index.html${NC}"
fi

echo -e "${GREEN}UI fully restored and enhanced!${NC}"
echo -e "${BLUE}All components have been updated to work properly.${NC}"
echo -e "${YELLOW}Refresh your browser to see the changes.${NC}"
