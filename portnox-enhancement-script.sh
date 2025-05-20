#!/bin/bash

# Portnox Total Cost Analyzer Enhancement Script
# This script enhances the UI and functionality of the Portnox Total Cost Analyzer
# by updating CSS, JS, and adding new chart components

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

# Display banner
echo -e "${BLUE}=======================================================${NC}"
echo -e "${GREEN}   Portnox Total Cost Analyzer Enhancement Suite       ${NC}"
echo -e "${BLUE}=======================================================${NC}"
echo -e "${YELLOW}This script will enhance the UI and functionality of the${NC}"
echo -e "${YELLOW}Portnox Total Cost Analyzer application.              ${NC}"
echo -e "${BLUE}=======================================================${NC}"
echo ""

# Function to create backup of files before modifying
backup_files() {
  echo -e "${YELLOW}Creating backup of original files...${NC}"
  mkdir -p "$BACKUP_DIR/css" "$BACKUP_DIR/js" "$BACKUP_DIR/js/components" "$BACKUP_DIR/js/charts"
  
  # Backup CSS files
  cp "$CSS_DIR/main.css" "$BACKUP_DIR/css/"
  cp "$CSS_DIR/components/enhanced-ui.css" "$BACKUP_DIR/css/"
  cp "$CSS_DIR/components/charts.css" "$BACKUP_DIR/css/"
  cp "$CSS_DIR/components/sidebar.css" "$BACKUP_DIR/css/"
  cp "$CSS_DIR/components/heatmaps.css" "$BACKUP_DIR/css/"
  cp "$CSS_DIR/components/particle-background.css" "$BACKUP_DIR/css/"
  
  # Backup JS files
  cp "$JS_DIR/portnox-tco-analyzer.js" "$BACKUP_DIR/js/"
  cp "$JS_DIR/integration.js" "$BACKUP_DIR/js/"
  cp "$COMPONENT_DIR/sidebar-manager.js" "$BACKUP_DIR/js/components/"
  cp "$COMPONENT_DIR/particle-background.js" "$BACKUP_DIR/js/components/"
  cp "$COMPONENT_DIR/header-particles.js" "$BACKUP_DIR/js/components/"
  cp "$CHART_DIR/chart-config.js" "$BACKUP_DIR/js/charts/"
  cp "$CHART_DIR/chart-loader.js" "$BACKUP_DIR/js/charts/"
  cp "$CHART_DIR/apex/apex-charts.js" "$BACKUP_DIR/js/charts/"
  cp "$CHART_DIR/d3/d3-manager.js" "$BACKUP_DIR/js/charts/"
  cp "$CHART_DIR/highcharts/highcharts-manager.js" "$BACKUP_DIR/js/charts/"
  
  echo -e "${GREEN}Backup completed! Files stored in $BACKUP_DIR${NC}"
}

# Function to enhance UI with improved colors and animations
enhance_ui() {
  echo -e "${YELLOW}Enhancing UI components...${NC}"
  
  # Update enhanced-ui.css with more modern styles
  cat > "$CSS_DIR/components/enhanced-ui.css" << 'EOL'
/* Enhanced UI Components for Portnox Total Cost Analyzer */

/* Color Variables */
:root {
  --primary-color: #1a5a96;
  --primary-dark-color: #0d4275;
  --primary-light-color: #5b8dc5;
  --primary-color-transparent: rgba(26, 90, 150, 0.2);
  
  /* Secondary colors */
  --secondary-color: #2ecc71;
  --secondary-dark-color: #25a25a;
  --secondary-light-color: #6be095;
  
  /* Accent colors */
  --accent-color: #f39c12;
  --accent-dark-color: #d68910;
  --accent-light-color: #f6be65;
  
  /* Status colors */
  --success-color: #27ae60;
  --error-color: #e74c3c;
  --warning-color: #f39c12;
  --info-color: #3498db;
  
  /* Text colors */
  --text-color: #333333;
  --text-secondary: #666666;
  --text-light: #888888;
  --text-lighter: #aaaaaa;
  
  /* Background colors */
  --background-color: #f9fafb;
  --card-background: #ffffff;
  --input-background: #ffffff;
  --highlight-background: rgba(26, 90, 150, 0.05);
  
  /* Border colors */
  --border-color: #e0e0e0;
  --border-light: #f0f0f0;
  --border-dark: #cccccc;
  
  /* Shadow colors */
  --shadow-color: rgba(0, 0, 0, 0.1);
  --shadow-light: rgba(0, 0, 0, 0.05);
  --shadow-dark: rgba(0, 0, 0, 0.15);
  
  /* Gradient variables */
  --gradient-primary: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  --gradient-secondary: linear-gradient(135deg, var(--secondary-color), var(--secondary-dark-color));
  --gradient-accent: linear-gradient(135deg, var(--accent-color), var(--accent-dark-color));
}

/* Dark mode theme */
body.dark-mode {
  /* Primary colors */
  --primary-color: #2980b9;
  --primary-dark-color: #1d6fa5;
  --primary-light-color: #5499c7;
  --primary-color-transparent: rgba(41, 128, 185, 0.2);
  
  /* Secondary colors */
  --secondary-color: #27ae60;
  --secondary-dark-color: #1f8b4c;
  --secondary-light-color: #52be80;
  
  /* Accent colors */
  --accent-color: #e67e22;
  --accent-dark-color: #d35400;
  --accent-light-color: #eb984e;
  
  /* Status colors */
  --success-color: #2ecc71;
  --error-color: #e74c3c;
  --warning-color: #f39c12;
  --info-color: #3498db;
  
  /* Text colors */
  --text-color: #e0e0e0;
  --text-secondary: #b0b0b0;
  --text-light: #909090;
  --text-lighter: #707070;
  
  /* Background colors */
  --background-color: #121212;
  --card-background: #1e1e1e;
  --input-background: #2c2c2c;
  --highlight-background: rgba(41, 128, 185, 0.1);
  
  /* Border colors */
  --border-color: #333333;
  --border-light: #383838;
  --border-dark: #555555;
  
  /* Shadow colors */
  --shadow-color: rgba(0, 0, 0, 0.3);
  --shadow-light: rgba(0, 0, 0, 0.2);
  --shadow-dark: rgba(0, 0, 0, 0.4);
  
  /* Gradient variables */
  --gradient-primary: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  --gradient-secondary: linear-gradient(135deg, var(--secondary-color), var(--secondary-dark-color));
  --gradient-accent: linear-gradient(135deg, var(--accent-color), var(--accent-dark-color));
}

/* Advanced button styling */
.btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.4);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.btn:hover:after {
  animation: ripple 1s ease-out;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: var(--gradient-secondary);
  color: white;
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-light);
  box-shadow: none;
}

.btn-outline:hover {
  background-color: rgba(0, 0, 0, 0.03);
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow-light);
}

.btn i {
  margin-right: 8px;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.7;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}

/* Enhanced card styling */
.dashboard-card,
.chart-container,
.config-card,
.benefit-card,
.advantage-card {
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: 0 6px 16px var(--shadow-color);
  transition: all 0.4s ease;
  overflow: hidden;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.dashboard-card:hover,
.benefit-card:hover,
.advantage-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px var(--shadow-color);
}

.highlight-card {
  border-left: 4px solid var(--primary-color);
  background: linear-gradient(to right, rgba(26, 90, 150, 0.05), transparent);
}

/* Enhanced metric values */
.metric-value {
  font-size: 32px;
  font-weight: 700;
  margin: 10px 0;
  transition: all 0.3s ease;
}

.highlight-value {
  color: var(--primary-color);
  position: relative;
}

.highlight-value:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 40px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 3px;
}

.metric-label {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 5px;
}

.metric-trend {
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-top: 5px;
  font-weight: 500;
}

.metric-trend.up {
  color: var(--success-color);
}

.metric-trend.down {
  color: var(--error-color);
}

.metric-trend i {
  margin-right: 5px;
}

/* Enhanced vendor card styling */
.vendor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 15px;
  margin-top: 15px;
}

.vendor-card {
  background-color: var(--card-background);
  border-radius: 10px;
  box-shadow: 0 4px 10px var(--shadow-color);
  padding: 15px;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.vendor-card .vendor-logo {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.vendor-card .vendor-logo img {
  max-height: 40px;
  max-width: 90%;
  filter: grayscale(0.3);
  transition: all 0.3s ease;
}

.vendor-card .vendor-info h3 {
  margin: 0 0 5px;
  font-size: 14px;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.vendor-card .vendor-info p {
  margin: 0;
  font-size: 12px;
  color: var(--text-light);
}

.vendor-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 20px var(--shadow-color);
}

.vendor-card:hover .vendor-logo img {
  filter: grayscale(0);
}

.vendor-card.selected {
  border-color: var(--primary-color);
  background-color: var(--highlight-background);
}

.vendor-card.selected .vendor-logo img {
  filter: grayscale(0);
}

.vendor-card.selected:after {
  content: '\f00c';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  position: absolute;
  top: -8px;
  right: -8px;
  color: white;
  background: var(--primary-color);
  width: 22px;
  height: 22px;
  font-size: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px var(--shadow-color);
}

.vendor-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  font-size: 10px;
  font-weight: 600;
  border-radius: 12px;
  text-transform: uppercase;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.badge-primary {
  background: var(--gradient-primary);
  color: white;
}

.badge-warning {
  background: var(--gradient-accent);
  color: white;
}

.badge-danger {
  background: linear-gradient(135deg, var(--error-color), #c0392b);
  color: white;
}

/* Enhanced Config Card Styling */
.config-card {
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px var(--shadow-light);
  background-color: var(--card-background);
  border: 1px solid var(--border-light);
}

.config-card-header {
  padding: 15px;
  background: var(--gradient-primary);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.config-card-header h3 {
  margin: 0;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.config-card-header h3 i {
  margin-right: 10px;
}

.config-card-content {
  padding: 18px;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.3s ease;
}

.config-card-content.collapsed {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.helper-text {
  font-size: 12px;
  color: var(--text-light);
  margin-top: 0;
  margin-bottom: 10px;
}

/* Add section for view tabs (Executive, Financial, etc.) */
.main-tabs {
  display: flex;
  margin-bottom: 25px;
  border-bottom: 1px solid var(--border-color);
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  background-color: var(--card-background);
  border-radius: 10px 10px 0 0;
  box-shadow: 0 2px 10px var(--shadow-light);
}

.main-tabs::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.main-tab {
  padding: 15px 28px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-light);
  background-color: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.main-tab i {
  margin-right: 10px;
}

.main-tab:hover {
  color: var(--primary-color);
}

.main-tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  background-color: rgba(26, 90, 150, 0.05);
}

.main-tab.active:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--gradient-primary);
}

/* Results Tabs Styling */
.results-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 2px;
}

.results-tabs::-webkit-scrollbar {
  display: none;
}

.results-tab {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-light);
  background-color: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  position: relative;
}

.results-tab:hover {
  color: var(--primary-color);
}

.results-tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.results-tab.active:after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--gradient-primary);
  border-radius: 2px;
}

/* View Panel Styling */
.view-panel {
  display: none;
  animation: fadeIn 0.5s ease-in-out;
}

.view-panel.active {
  display: block;
}

/* Results Panel Styling */
.results-panel {
  display: none;
  animation: fadeIn 0.5s ease-in-out;
}

.results-panel.active {
  display: block;
}

.panel-header {
  margin-bottom: 25px;
}

.panel-header h2 {
  margin: 0 0 8px;
  color: var(--text-color);
  font-size: 26px;
  position: relative;
  display: inline-block;
}

.panel-header h2:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 60px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 3px;
}

.panel-header .subtitle {
  margin: 0;
  color: var(--text-light);
  font-size: 16px;
}

/* Advanced Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease forwards;
}

.animate-pulse {
  animation: pulse 2s ease infinite;
}

.animate-shimmer {
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite linear;
}

/* Modern tooltip styling */
.modern-tooltip {
  position: absolute;
  background-color: var(--card-background);
  color: var(--text-color);
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  font-size: 12px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  transform: translateY(10px);
  z-index: 1000;
  border: 1px solid var(--border-light);
  max-width: 250px;
}

.modern-tooltip.visible {
  opacity: 1;
  transform: translateY(0);
}

.modern-tooltip.top {
  transform: translateY(-10px);
}

.modern-tooltip.top.visible {
  transform: translateY(0);
}

/* Dashboard visualization enhancements */
.visualization-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 20px;
  margin-bottom: 30px;
}

.visualization-card {
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: 0 6px 16px var(--shadow-color);
  overflow: hidden;
  transition: all 0.4s ease;
  border: 1px solid rgba(0,0,0,0.03);
}

.visualization-card.col-12 {
  grid-column: span 12;
}

.visualization-card.col-8 {
  grid-column: span 8;
}

.visualization-card.col-6 {
  grid-column: span 6;
}

.visualization-card.col-4 {
  grid-column: span 4;
}

.visualization-card.col-3 {
  grid-column: span 3;
}

.visualization-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px var(--shadow-color);
}

.visualization-card-header {
  padding: 15px 20px;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.visualization-card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.visualization-card-body {
  padding: 20px;
}

.visualization-card-footer {
  padding: 10px 20px;
  border-top: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--text-light);
}
EOL
  
  # Update charts.css with more modern chart styling
  cat > "$CSS_DIR/components/charts.css" << 'EOL'
/* Chart styling for Portnox Total Cost Analyzer */
.chart-container {
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: 0 6px 16px var(--shadow-color);
  padding: 25px;
  margin-bottom: 30px;
  overflow: hidden;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  border: 1px solid rgba(0,0,0,0.03);
}

.chart-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px var(--shadow-color);
}

.chart-container h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  display: flex;
  align-items: center;
}

.chart-container h3 i {
  margin-right: 10px;
  color: var(--primary-color);
}

.chart-wrapper {
  height: 400px;
  width: 100%;
  position: relative;
}

.chart-wrapper.half-height {
  height: 250px;
}

.chart-wrapper.quarter-height {
  height: 150px;
}

.chart-placeholder {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  border: 1px dashed var(--border-color);
}

.chart-placeholder i {
  font-size: 36px;
  color: var(--text-lighter);
  margin-bottom: 15px;
}

.chart-placeholder p {
  font-size: 14px;
  color: var(--text-light);
  margin: 0;
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin: 0 15px 10px 0;
  padding: 4px 12px;
  border-radius: 20px;
  background-color: rgba(0,0,0,0.03);
  transition: all 0.3s ease;
}

.legend-item:hover {
  background-color: rgba(0,0,0,0.05);
  transform: translateY(-2px);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  margin-right: 8px;
}

.legend-label {
  font-size: 13px;
  color: var(--text-color);
  font-weight: 500;
}

/* Chart types */
.donut-chart-container {
  position: relative;
}

.donut-chart-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.donut-chart-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
}

.donut-chart-label {
  font-size: 14px;
  color: var(--text-light);
}

/* Comparison bar styling */
.comparison-bar {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 5px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.comparison-bar:hover {
  background-color: rgba(0,0,0,0.02);
}

.bar-label {
  min-width: 120px;
  font-size: 14px;
  color: var(--text-color);
  font-weight: 500;
}

.bar-track {
  flex: 1;
  height: 12px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  overflow: hidden;
  margin: 0 15px;
}

.bar-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 6px;
  transition: width 1.2s cubic-bezier(0.65, 0, 0.35, 1);
}

.bar-fill.success {
  background: var(--gradient-secondary);
}

.bar-fill.warning {
  background: var(--gradient-accent);
}

.bar-fill.danger {
  background: linear-gradient(135deg, var(--error-color), #c0392b);
}

.bar-value {
  width: 60px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  text-align: right;
}

/* Animation for charts */
@keyframes chartFadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-chart {
  animation: chartFadeIn 0.7s ease forwards;
}

@keyframes fillBar {
  from { width: 0; }
  to { width: 100%; }
}

.animate-bar {
  animation: fillBar 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

/* Heat map styling */
.heatmap-container {
  height: 400px;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.heatmap-cell {
  transition: all 0.3s ease;
}

.heatmap-cell:hover {
  stroke: var(--text-color);
  stroke-width: 2px;
  filter: brightness(1.1);
}

.heatmap-tooltip {
  position: absolute;
  padding: 12px;
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 4px 15px var(--shadow-color);
  pointer-events: none;
  z-index: 10;
  max-width: 220px;
  font-size: 12px;
  border: 1px solid var(--border-light);
}

/* Benefit cards styling */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 25px;
  margin: 30px 0;
}

.benefit-card {
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: 0 6px 16px var(--shadow-color);
  padding: 25px;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(0,0,0,0.03);
}

.benefit-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 30px var(--shadow-color);
}

.benefit-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: var(--highlight-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.benefit-icon:before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: linear-gradient(135deg, var(--primary-color), transparent);
  border-radius: 50%;
  z-index: -1;
  opacity: 0.2;
  transition: all 0.3s ease;
}

.benefit-card:hover .benefit-icon:before {
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  opacity: 0.3;
}

.benefit-icon i {
  font-size: 28px;
  color: var(--primary-color);
  transition: all 0.3s ease;
}

.benefit-card:hover .benefit-icon i {
  transform: scale(1.1);
}

.benefit-card h4 {
  margin: 0 0 12px;
  color: var(--text-color);
  font-size: 18px;
}

.benefit-card p {
  margin: 0;
  color: var(--text-light);
  font-size: 14px;
  line-height: 1.6;
}

/* Table styling */
.table-responsive {
  overflow-x: auto;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px var(--shadow-light);
}

.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
}

.data-table th {
  background: var(--gradient-primary);
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.data-table td {
  padding: 12px 15px;
  border-bottom: 1px solid var(--border-color);
  font-size: 14px;
  color: var(--text-color);
  transition: all 0.2s ease;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.02);
}

.data-table tr:hover td {
  background-color: var(--highlight-color);
}

.data-table .highlight-value {
  color: var(--primary-color);
  font-weight: 600;
}

.data-table .highlight-cell {
  color: var(--primary-color);
  font-weight: 600;
  background-color: rgba(26, 90, 150, 0.05);
}

.data-table .total-row {
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.03);
}

.data-table .total-row td {
  border-top: 2px solid var(--border-color);
}

/* ApexCharts customizations */
.apexcharts-tooltip {
  box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
  border: none !important;
  border-radius: 8px !important;
}

.apexcharts-tooltip-title {
  font-weight: 600 !important;
  background-color: rgba(0,0,0,0.02) !important;
  border-bottom: 1px solid rgba(0,0,0,0.05) !important;
}

.apexcharts-xaxistooltip {
  border-radius: 6px !important;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1) !important;
  border: none !important;
}

.apexcharts-legend-text {
  font-weight: 500 !important;
}

.apexcharts-gridline {
  stroke-width: 1 !important;
  stroke: rgba(0,0,0,0.05) !important;
}

/* Highcharts customizations */
.highcharts-tooltip {
  filter: drop-shadow(0 5px 10px rgba(0,0,0,0.1)) !important;
}

.highcharts-tooltip-box {
  fill: var(--card-background) !important;
  stroke: var(--border-color) !important;
  stroke-width: 1px !important;
  rx: 8px !important;
  ry: 8px !important;
}

.highcharts-tooltip text {
  fill: var(--text-color) !important;
}

.highcharts-grid-line {
  stroke: rgba(0,0,0,0.05) !important;
}

.highcharts-axis-line {
  stroke: rgba(0,0,0,0.1) !important;
}

.highcharts-point {
  transition: fill 0.3s ease, stroke 0.3s ease !important;
}

/* D3 customizations */
.d3-tooltip {
  position: absolute;
  padding: 12px;
  background-color: var(--card-background);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  box-shadow: 0 5px 15px var(--shadow-color);
  pointer-events: none;
  font-size: 12px;
  max-width: 200px;
  z-index: 1000;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.d3-axis path,
.d3-axis line {
  stroke: rgba(0,0,0,0.1);
  stroke-width: 1px;
}

.d3-axis text {
  font-size: 12px;
  fill: var(--text-light);
}

/* Comparison results cards */
.comparison-result-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 25px;
  margin: 30px 0;
}

.comparison-result-card {
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: 0 6px 16px var(--shadow-color);
  overflow: hidden;
  transition: all 0.4s ease;
  border: 1px solid rgba(0,0,0,0.03);
}

.comparison-result-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px var(--shadow-color);
}

.comparison-result-header {
  padding: 15px;
  background: var(--gradient-primary);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comparison-result-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.comparison-result-body {
  padding: 20px;
}

.comparison-result-value {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 5px;
  color: var(--primary-color);
}

.comparison-result-label {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 15px;
}

.comparison-result-details {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid var(--border-light);
}

.comparison-detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.comparison-detail-label {
  color: var(--text-secondary);
}

.comparison-detail-value {
  font-weight: 500;
  color: var(--text-color);
}
EOL
  
  # Update particle-background.css with enhanced styles
  cat > "$CSS_DIR/components/particle-background.css" << 'EOL'
/* Enhanced Particle Background for Portnox Total Cost Analyzer */
#particles-js {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: var(--background-color);
  transition: background-color 0.3s ease;
}

/* Particle colors for light mode */
body:not(.dark-mode) #particles-js {
  --particle-color: var(--primary-color);
  --particle-color-rgb: 26, 90, 150;
  --particle-line-color: rgba(26, 90, 150, 0.2);
}

/* Particle colors for dark mode */
body.dark-mode #particles-js {
  --particle-color: var(--primary-color);
  --particle-color-rgb: 41, 128, 185;
  --particle-line-color: rgba(41, 128, 185, 0.2);
}

/* Header particles container */
.particles-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* Make header content appear above particles */
.header-content {
  position: relative;
  z-index: 1;
}

/* Enhanced header with gradient background and particles */
.app-header {
  position: relative;
  background-image: linear-gradient(to right, rgba(var(--particle-color-rgb), 0.1), rgba(var(--particle-color-rgb), 0.05));
  overflow: hidden;
}

.app-header:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* Ensure content appears above particles */
.app-container {
  position: relative;
  z-index: 1;
}

/* Animated particle dot for loading and calculations */
.particle-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--primary-color);
  position: relative;
  display: inline-block;
  margin: 0 5px;
}

.particle-dot:before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  background-color: var(--primary-color);
  border-radius: 50%;
  z-index: -1;
  opacity: 0.3;
  animation: pulse-dot 1.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
}

@keyframes pulse-dot {
  0% {
    transform: scale(0.8);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.3;
  }
}

/* Particle animation for section transitions */
.section-transition {
  position: relative;
  overflow: hidden;
}

.section-transition:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 60px;
  bottom: -30px;
  left: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(var(--particle-color-rgb), 0.1) 0%, transparent 15%),
    radial-gradient(circle at 50% 30%, rgba(var(--particle-color-rgb), 0.08) 0%, transparent 12%),
    radial-gradient(circle at 80% 60%, rgba(var(--particle-color-rgb), 0.12) 0%, transparent 18%);
  z-index: 0;
  pointer-events: none;
}

/* Animated particle flow for loading states */
.particle-flow {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 3px;
  background-color: rgba(var(--particle-color-rgb), 0.1);
  border-radius: 1.5px;
}

.particle-flow:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 30%;
  background-color: var(--primary-color);
  border-radius: 1.5px;
  animation: particle-flow 2s ease-in-out infinite;
}

@keyframes particle-flow {
  0% {
    left: -30%;
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0.7;
  }
}

/* Enhanced loading overlay with particles */
.loading-overlay .loading-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.loading-overlay .loading-particles:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 30% 40%, rgba(var(--particle-color-rgb), 0.1) 0%, transparent 20%),
    radial-gradient(circle at 70% 60%, rgba(var(--particle-color-rgb), 0.08) 0%, transparent 15%),
    radial-gradient(circle at 40% 80%, rgba(var(--particle-color-rgb), 0.12) 0%, transparent 25%);
  animation: loading-particles 8s ease-in-out infinite alternate;
}

@keyframes loading-particles {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}
EOL
  
  # Update sidebar.css with enhanced styling
  cat > "$CSS_DIR/components/sidebar.css" << 'EOL'
/* 
 * Enhanced Sidebar Styling for Portnox Total Cost Analyzer
 * Modern, interactive sidebar with improved vendor selection and configuration
 */

/* Main sidebar container */
.sidebar {
  width: 360px;
  background-color: var(--card-background);
  box-shadow: 3px 0 20px var(--shadow-color);
  overflow-y: auto;
  transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s ease;
  z-index: 100;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.sidebar.collapsed {
  width: 0;
}

/* Sidebar header */
.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  background: var(--gradient-primary);
  color: white;
  position: relative;
  overflow: hidden;
}

.sidebar-header:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent);
  background-size: 5px 5px;
  opacity: 0.3;
  z-index: 0;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}

.sidebar-header h2 i {
  margin-right: 12px;
  font-size: 20px;
}

/* Sidebar content area (scrollable) */
.sidebar-content {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

/* Sidebar footer */
.sidebar-footer {
  padding: 20px;
  border-top: 1px solid var(--border-color);
  background-color: var(--background-color);
  position: relative;
}

/* Config cards */
.config-card {
  margin-bottom: 25px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px var(--shadow-light);
  background-color: var(--card-background);
  border: 1px solid var(--border-light);
  transition: all 0.4s ease;
}

.config-card:hover {
  box-shadow: 0 8px 20px var(--shadow-color);
  transform: translateY(-3px);
}

/* Config card header */
.config-card-header {
  padding: 15px;
  background: var(--gradient-primary);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.config-card-header:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent);
  background-size: 5px 5px;
  opacity: 0.2;
  z-index: 0;
}

.config-card-header:hover {
  filter: brightness(1.1);
}

.config-card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}

.config-card-header h3 i {
  margin-right: 12px;
  font-size: 18px;
}

.config-card-header .toggle-icon {
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  position: relative;
  z-index: 1;
}

.config-card-header .toggle-icon.collapsed {
  transform: rotate(180deg);
}

/* Config card content */
.config-card-content {
  padding: 20px;
  max-height: 1000px;
  overflow: hidden;
  transition: max-height 0.6s cubic-bezier(0.44, 0.185, 0.575, 0.855), padding 0.4s ease;
}

.config-card-content.collapsed {
  max-height: 0;
  padding: 0 20px;
}

/* Helper text */
.helper-text {
  font-size: 12px;
  color: var(--text-light);
  margin: 5px 0 15px;
  line-height: 1.5;
}

/* Vendor Selection Grid */
.vendor-select-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 12px;
  margin-top: 15px;
}

/* Enhanced vendor selection cards for sidebar */
.vendor-select-card {
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 12px 8px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 90px;
  overflow: hidden;
}

.vendor-select-card:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--primary-color);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.vendor-select-card:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 8px 15px var(--shadow-color);
  border-color: var(--primary-color);
}

.vendor-select-card .vendor-logo {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
}

.vendor-select-card .vendor-logo img {
  max-height: 32px;
  max-width: 100%;
  object-fit: contain;
  transition: all 0.3s ease;
  filter: grayscale(0.3);
}

.vendor-select-card:hover .vendor-logo img {
  filter: grayscale(0);
  transform: scale(1.1);
}

.vendor-select-card .vendor-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

/* Selected vendor styling */
.vendor-select-card.selected {
  border: 2px solid var(--primary-color);
  background-color: var(--highlight-background);
}

.vendor-select-card.selected .vendor-logo img {
  filter: grayscale(0);
}

.vendor-select-card.selected:after {
  content: '\f00c';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  position: absolute;
  top: -8px;
  right: -8px;
  width: 22px;
  height: 22px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  box-shadow: 0 3px 6px var(--shadow-color);
  z-index: 2;
}

/* Badge for vendor cards */
.vendor-select-card .badge {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 8px;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.vendor-select-card .badge-primary {
  background: var(--gradient-primary);
  color: white;
}

.vendor-select-card .badge-warning {
  background: var(--gradient-accent);
  color: white;
}

.vendor-select-card .badge-danger {
  background: linear-gradient(135deg, var(--error-color), #c0392b);
  color: white;
}

/* Advanced form styling */
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.form-control {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: var(--input-background);
  color: var(--text-color);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-color-transparent);
  outline: none;
}

.form-select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: var(--input-background);
  color: var(--text-color);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
}

.form-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-color-transparent);
  outline: none;
}

/* Enhanced range slider styling */
.range-slider {
  margin-bottom: 20px;
}

.range-slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.range-slider-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}

.range-slider-value {
  font-size: 14px;
  font-weight: 700;
  color: var(--primary-color);
  padding: 4px 10px;
  background-color: var(--highlight-background);
  border-radius: 20px;
  min-width: 70px;
  text-align: center;
  border: 1px solid rgba(26, 90, 150, 0.1);
}

input[type="range"] {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  background: linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) 50%, var(--border-color) 50%, var(--border-color) 100%);
  border-radius: 3px;
  outline: none;
  padding: 0;
  margin: 10px 0;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--primary-color);
  cursor: pointer;
  transition: all .3s ease-in-out;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: var(--primary-color);
  border-color: white;
  transform: scale(1.1);
}

input[type="range"]::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--primary-color);
  cursor: pointer;
  transition: all .3s ease-in-out;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb:hover {
  background: var(--primary-color);
  border-color: white;
  transform: scale(1.1);
}

/* Enhanced checkbox styling */
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
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
  width: 20px;
  height: 20px;
  background-color: var(--input-background);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.custom-checkbox:hover .checkmark {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-color-transparent);
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
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Enhanced sidebar toggle button */
.sidebar-toggle {
  position: fixed;
  left: 360px;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--card-background);
  width: 32px;
  height: 64px;
  border-radius: 0 16px 16px 0;
  box-shadow: 3px 0 10px var(--shadow-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 100;
  border: 1px solid var(--border-color);
  border-left: none;
}

.sidebar-toggle:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-50%) scale(1.1);
}

.sidebar-toggle.collapsed {
  left: 0;
}

.sidebar-toggle i {
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.sidebar-toggle.collapsed i {
  transform: rotate(180deg);
}

/* Enhanced selected vendor counter */
.vendor-counter {
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding: 12px;
  border-radius: 10px;
  background-color: var(--highlight-background);
  border: 1px dashed var(--primary-color);
  animation: pulse-light 3s infinite alternate;
}

@keyframes pulse-light {
  0% {
    background-color: var(--highlight-background);
  }
  100% {
    background-color: rgba(26, 90, 150, 0.1);
  }
}

.vendor-counter-icon {
  font-size: 18px;
  color: var(--primary-color);
  margin-right: 12px;
}

.vendor-counter-text {
  flex: 1;
  font-size: 14px;
  color: var(--text-color);
}

.vendor-counter-value {
  font-weight: 700;
  color: var(--primary-color);
  font-size: 16px;
  padding: 4px 12px;
  background-color: var(--card-background);
  border-radius: 20px;
  box-shadow: 0 2px 5px var(--shadow-color);
  min-width: 40px;
  text-align: center;
}

/* Enhanced calculate button styling */
.btn-calculate {
  position: relative;
  display: block;
  width: 100%;
  padding: 16px 20px;
  border-radius: 10px;
  background: var(--gradient-primary);
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  border: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.btn-calculate:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn-calculate:active {
  transform: translateY(1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.btn-calculate i {
  margin-right: 10px;
}

/* Enhanced ripple effect animation */
.btn-calculate:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.4);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.btn-calculate:hover:after {
  animation: ripple-enhanced 1.2s ease-out;
}

@keyframes ripple-enhanced {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(30, 30);
    opacity: 0;
  }
}

/* Interactive hover effects on sidebar sections */
.config-card-content .form-group:hover {
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.checkbox-item:hover {
  transform: translateX(3px);
  transition: transform 0.3s ease;
}
EOL
  
  # Update heatmaps.css for enhanced visualization
  cat > "$CSS_DIR/components/heatmaps.css" << 'EOL'
/* Enhanced Heatmap component styles for Portnox Total Cost Analyzer */
.heatmap-container {
  position: relative;
  height: 400px;
  width: 100%;
  background-color: var(--card-background);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 16px var(--shadow-color);
  border: 1px solid rgba(0,0,0,0.03);
  transition: all 0.4s ease;
}

.heatmap-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px var(--shadow-color);
}

.heatmap-tooltip {
  position: absolute;
  z-index: 10;
  background-color: var(--card-background);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 12px 15px;
  font-size: 12px;
  pointer-events: none;
  box-shadow: 0 5px 15px var(--shadow-color);
  transition: opacity 0.3s ease, transform 0.3s ease;
  max-width: 250px;
}

.heatmap-tooltip strong {
  display: block;
  margin-bottom: 5px;
  color: var(--primary-color);
  font-weight: 600;
  font-size: 13px;
}

.heatmap-tooltip-value {
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
}

.heatmap-tooltip-label {
  color: var(--text-secondary);
  margin-right: 10px;
}

.heatmap-tooltip-metric {
  font-weight: 500;
  color: var(--text-color);
}

/* D3 chart enhancements */
.d3-chart {
  font-family: var(--font-family);
  font-size: 12px;
}

.d3-chart .axis path,
.d3-chart .axis line {
  fill: none;
  stroke: var(--border-color);
  shape-rendering: crispEdges;
  stroke-width: 1px;
}

.d3-chart text {
  fill: var(--text-color);
  font-size: 12px;
}

.d3-chart .axis-title {
  font-size: 13px;
  font-weight: 600;
  fill: var(--text-color);
}

.d3-chart .legend text {
  font-size: 11px;
  fill: var(--text-secondary);
}

.d3-chart .area {
  fill-opacity: 0.7;
  transition: fill-opacity 0.3s ease;
}

.d3-chart .area:hover {
  fill-opacity: 0.9;
}

.d3-chart .node {
  stroke: #fff;
  stroke-width: 1.5px;
  transition: all 0.3s ease;
}

.d3-chart .node:hover {
  stroke-width: 2.5px;
  cursor: pointer;
}

.d3-chart .link {
  fill: none;
  stroke: var(--border-color);
  stroke-width: 1.5px;
  transition: stroke 0.3s ease, stroke-width 0.3s ease;
}

.d3-chart .link:hover {
  stroke: var(--primary-color);
  stroke-width: 2px;
}

/* Gradient background for heatmaps */
.heatmap-gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom right, 
    rgba(var(--primary-color-rgb), 0.05) 0%, 
    rgba(var(--primary-color-rgb), 0.01) 50%,
    rgba(var(--primary-color-rgb), 0.05) 100%);
  pointer-events: none;
  z-index: 0;
}

/* Enhanced heatmap visualization */
.heatmap-grid {
  position: relative;
  z-index: 1;
}

.heatmap-cell {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  stroke: var(--card-background);
  stroke-width: 1px;
}

.heatmap-cell:hover {
  transform: scale(1.05);
  stroke: var(--text-color);
  stroke-width: 2px;
  filter: brightness(1.1);
  cursor: pointer;
}

.heatmap-title {
  font-size: 18px;
  font-weight: 600;
  text-anchor: middle;
  fill: var(--text-color);
}

.heatmap-subtitle {
  font-size: 14px;
  text-anchor: middle;
  fill: var(--text-secondary);
  font-weight: normal;
}

/* Heatmap legend enhancement */
.heatmap-legend {
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-color: var(--card-background);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 3px 8px var(--shadow-light);
  border: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.heatmap-legend-title {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-color);
}

.heatmap-legend-gradient {
  width: 20px;
  height: 150px;
  margin: 0 auto;
  position: relative;
  border-radius: 3px;
  overflow: hidden;
}

.heatmap-legend-labels {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  margin-left: 10px;
}

.heatmap-legend-label {
  font-size: 10px;
  color: var(--text-secondary);
}

/* Vector field visualization for flow analysis */
.vector-field {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background-color: var(--card-background);
  box-shadow: 0 4px 12px var(--shadow-light);
}

.vector-field-arrow {
  transition: fill 0.3s ease, transform 0.3s ease;
  fill: var(--primary-color);
  opacity: 0.7;
}

.vector-field-arrow:hover {
  fill: var(--primary-dark-color);
  opacity: 1;
  transform: scale(1.2);
}

/* Histogram styling for distribution analysis */
.histogram-bar {
  transition: all 0.3s ease;
  fill: var(--primary-color);
  stroke: var(--card-background);
  stroke-width: 1px;
}

.histogram-bar:hover {
  fill: var(--primary-dark-color);
  transform: scaleY(1.05);
}

.histogram-axis path,
.histogram-axis line {
  stroke: var(--text-lighter);
  stroke-width: 1px;
}

.histogram-axis text {
  fill: var(--text-light);
  font-size: 11px;
}

/* Interactive legend with highlight effect */
.interactive-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.legend-item-interactive {
  display: flex;
  align-items: center;
  padding: 5px 12px;
  margin: 0 8px 8px 0;
  border-radius: 20px;
  background-color: rgba(0,0,0,0.03);
  transition: all 0.3s ease;
  cursor: pointer;
}

.legend-item-interactive:hover {
  background-color: rgba(0,0,0,0.07);
  transform: translateY(-2px);
}

.legend-item-interactive.inactive {
  opacity: 0.5;
}

.legend-color-interactive {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  margin-right: 8px;
}

.legend-label-interactive {
  font-size: 13px;
  color: var(--text-color);
  font-weight: 500;
}

/* Animated axis transitions */
.axis-animate {
  transition: transform 0.7s ease;
}
EOL
  
  echo -e "${GREEN}Enhanced UI components successfully!${NC}"
}

# Function to enhance particle background for better visual effects
enhance_particle_background() {
  echo -e "${YELLOW}Enhancing particle background...${NC}"
  
  # Update particle-background.js with improved effects
  cat > "$COMPONENT_DIR/particle-background.js" << 'EOL'
/**
 * Enhanced Particle Background for Portnox Total Cost Analyzer
 * Creates a dynamic, interactive particle background with AI-powered effects
 */

class ParticleBackground {
  constructor(containerId = 'particles-js', config = {}) {
    this.containerId = containerId;
    
    // Default configuration
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
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: 'img/github.svg',
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.6,
          random: true,
          anim: {
            enable: true,
            speed: 0.8,
            opacity_min: 0.2,
            sync: false
          }
        },
        size: {
          value: 4,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.5,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#1a5a96',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,
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
      retina_detect: true,
      ...config
    };
    
    // Update colors based on dark mode
    this.updateColors();
    
    // Initialize particles.js
    this.init();
    
    // Set up dark mode listener
    this.setupDarkModeListener();
    
    // Intelligent behavior based on user interaction
    this.setupIntelligentBehavior();
  }
  
  /**
   * Initialize particles.js
   */
  init() {
    if (typeof particlesJS !== 'undefined' && document.getElementById(this.containerId)) {
      particlesJS(this.containerId, this.config);
      console.log('Particle background initialized');
    } else {
      console.warn('particles.js not loaded or container not found');
    }
  }
  
  /**
   * Update particle colors based on dark mode
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
   * Set up dark mode listener
   */
  setupDarkModeListener() {
    // Listen for theme changes
    window.addEventListener('themechange', (event) => {
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
   * Setup intelligent particle behavior based on user activity
   */
  setupIntelligentBehavior() {
    // Track time since last interaction
    let lastActivity = Date.now();
    let isIdle = false;
    const idleThreshold = 30000; // 30 seconds
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    // Update activity timestamp on user interaction
    const updateActivity = () => {
      lastActivity = Date.now();
      if (isIdle) {
        isIdle = false;
        this.becomeActive();
      }
    };
    
    // Events that indicate user activity
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    
    activityEvents.forEach(eventType => {
      document.addEventListener(eventType, updateActivity);
    });
    
    // Track mouse position for directed movement
    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });
    
    // Check for idle state periodically
    setInterval(() => {
      if (!isIdle && Date.now() - lastActivity > idleThreshold) {
        isIdle = true;
        this.becomeIdle();
      }
    }, 5000);
    
    // Monitor scroll position to adjust particle density
    window.addEventListener('scroll', this.throttle(() => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollY / maxScroll;
      
      // Gradually reduce particles as user scrolls down
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
    
    // Monitor clicks to add particle bursts
    document.addEventListener('click', this.throttle((event) => {
      if (typeof pJSDom !== 'undefined' && pJSDom.length > 0 && pJSDom[0].pJS) {
        const pJS = pJSDom[0].pJS;
        
        // Only add particle burst on specific elements
        const targetElement = event.target;
        const isButton = targetElement.classList.contains('btn') || 
                         targetElement.classList.contains('vendor-select-card') ||
                         targetElement.closest('.btn') || 
                         targetElement.closest('.vendor-select-card');
        
        if (isButton) {
          // Create a small burst of particles
          for (let i = 0; i < 5; i++) {
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
    }, 200));
  }
  
  /**
   * Transition to idle state (more gentle, slower movement)
   */
  becomeIdle() {
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0 && pJSDom[0].pJS) {
      const pJS = pJSDom[0].pJS;
      
      // Slow down the particles and reduce opacity
      pJS.particles.move.speed = 0.8;
      pJS.particles.opacity.value = 0.4;
      pJS.particles.line_linked.opacity = 0.3;
      
      // Apply changes
      pJS.fn.particlesRefresh();
    }
  }
  
  /**
   * Transition to active state (more energetic, faster movement)
   */
  becomeActive() {
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0 && pJSDom[0].pJS) {
      const pJS = pJSDom[0].pJS;
      
      // Speed up the particles and increase opacity
      pJS.particles.move.speed = 1.5;
      pJS.particles.opacity.value = 0.6;
      pJS.particles.line_linked.opacity = 0.4;
      
      // Apply changes
      pJS.fn.particlesRefresh();
    }
  }
  
  /**
   * Throttle function to limit function call frequency
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
  
  # Update header-particles.js with enhanced visuals
  cat > "$COMPONENT_DIR/header-particles.js" << 'EOL'
/**
 * Enhanced Header Particle Background for Portnox Total Cost Analyzer
 * Creates a subtle yet engaging particle effect in the header
 */

class HeaderParticles {
  constructor(containerId = 'particles-header', config = {}) {
    this.containerId = containerId;
    
    // Default configuration - lighter and more subtle than main background
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
          type: ['circle', 'triangle', 'polygon'],
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 6
          }
        },
        opacity: {
          value: 0.4,
          random: true,
          anim: {
            enable: true,
            speed: 0.8,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 5,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.5,
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
          speed: 1.2,
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
            enable: false,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5
            }
          }
        }
      },
      retina_detect: true,
      ...config
    };
    
    // Update colors based on dark mode
    this.updateColors();
    
    // Initialize particles.js
    this.init();
    
    // Set up dark mode listener
    this.setupDarkModeListener();
    
    // Set up logo interaction
    this.setupLogoInteraction();
  }
  
  /**
   * Initialize particles.js
   */
  init() {
    if (typeof particlesJS !== 'undefined' && document.getElementById(this.containerId)) {
      particlesJS(this.containerId, this.config);
    } else {
      console.warn('particles.js not loaded or container not found for header');
    }
  }
  
  /**
   * Update particle colors based on dark mode
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
   * Set up dark mode listener
   */
  setupDarkModeListener() {
    // Listen for theme changes
    window.addEventListener('themechange', (event) => {
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
   * Set up logo interaction with particles
   */
  setupLogoInteraction() {
    const logo = document.querySelector('.company-logo');
    if (!logo) return;
    
    // Add magic animation to the logo
    logo.style.transition = 'all 0.3s ease';
    logo.style.cursor = 'pointer';
    
    logo.addEventListener('mouseenter', () => {
      // Create excitement in nearby particles
      if (typeof pJSDom !== 'undefined' && pJSDom.length > 1 && pJSDom[1].pJS) {
        const pJS = pJSDom[1].pJS;
        
        // Temporarily increase particle speed around the logo
        const origSpeed = pJS.particles.move.speed;
        pJS.particles.move.speed = origSpeed * 3;
        
        // Reset after a short time
        setTimeout(() => {
          pJS.particles.move.speed = origSpeed;
        }, 800);
      }
      
      // Add subtle scale effect to logo
      logo.style.transform = 'scale(1.05)';
    });
    
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'scale(1)';
    });
    
    logo.addEventListener('click', () => {
      // Create a particle explosion from the logo
      if (typeof pJSDom !== 'undefined' && pJSDom.length > 1 && pJSDom[1].pJS) {
        const pJS = pJSDom[1].pJS;
        
        // Get logo position
        const rect = logo.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Create a burst of particles
        for (let i = 0; i < 10; i++) {
          pJS.particles.array.push(
            new pJS.fn.particle(
              pJS.particles.color,
              pJS.particles.opacity.value,
              {
                'x': x,
                'y': y
              }
            )
          );
        }
      }
      
      // Add extra visual feedback
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
  
  echo -e "${GREEN}Particle background enhanced successfully!${NC}"
}

# Function to enhance charts with improved visualizations
enhance_charts() {
  echo -e "${YELLOW}Enhancing charts and visualizations...${NC}"
  
  # Update chart-config.js with enhanced configurations
  cat > "$CHART_DIR/chart-config.js" << 'EOL'
/**
 * Enhanced Chart Configuration for Portnox Total Cost Analyzer
 * Central configuration for all charts with improved styling and readability
 */

const ChartConfig = {
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
    background: '#f9f9f9',
    text: '#333333',
    // Add gradient definitions for enhanced visuals
    gradients: {
      primary: ['#1a5a96', '#0d4275'],
      secondary: ['#2ecc71', '#25a25a'],
      warning: ['#f39c12', '#d68910'],
      danger: ['#e74c3c', '#c0392b']
    }
  },
  
  themes: {
    light: {
      background: '#f9f9f9',
      cardBackground: '#ffffff',
      textColor: '#333333',
      textLight: '#666666',
      borderColor: '#e0e0e0',
      gridColor: 'rgba(0, 0, 0, 0.05)'
    },
    dark: {
      background: '#121212',
      cardBackground: '#1e1e1e',
      textColor: '#e0e0e0',
      textLight: '#b0b0b0',
      borderColor: '#333333',
      gridColor: 'rgba(255, 255, 255, 0.05)'
    }
  },
  
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
  
  // Enhanced ApexCharts default theme
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
  
  // Enhanced D3 theme
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
  
  // Get color for a vendor
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
    return document.body.classList.contains('dark-mode') ? this.themes.dark : this.themes.light;
  },
  
  // Update chart theme for dark/light mode
  updateChartTheme: function(isDarkMode) {
    if (isDarkMode) {
      this.apexTheme.chart.foreColor = this.themes.dark.textColor;
      this.apexTheme.tooltip.theme = 'dark';
      this.apexTheme.grid.borderColor = this.themes.dark.gridColor;
      this.apexTheme.xaxis.axisBorder.color = this.themes.dark.borderColor;
      this.apexTheme.xaxis.axisTicks.color = this.themes.dark.borderColor;
      
      this.d3Theme.axisStyles.strokeColor = 'rgba(255, 255, 255, 0.1)';
      this.d3Theme.axisStyles.textColor = this.themes.dark.textLight;
      this.d3Theme.tooltipStyles.backgroundColor = 'rgba(30, 30, 30, 0.95)';
      this.d3Theme.tooltipStyles.borderColor = this.themes.dark.borderColor;
    } else {
      this.apexTheme.chart.foreColor = this.themes.light.textColor;
      this.apexTheme.tooltip.theme = 'light';
      this.apexTheme.grid.borderColor = this.themes.light.gridColor;
      this.apexTheme.xaxis.axisBorder.color = this.themes.light.borderColor;
      this.apexTheme.xaxis.axisTicks.color = this.themes.light.borderColor;
      
      this.d3Theme.axisStyles.strokeColor = 'rgba(0, 0, 0, 0.1)';
      this.d3Theme.axisStyles.textColor = this.themes.light.textLight;
      this.d3Theme.tooltipStyles.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      this.d3Theme.tooltipStyles.borderColor = this.themes.light.borderColor;
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
}
EOL
  
  # Update d3-manager.js with enhanced visualizations
  cat > "$CHART_DIR/d3/d3-manager.js" << 'EOL'
/**
 * Enhanced D3.js implementation for Portnox Total Cost Analyzer
 * Creates advanced, interactive visualizations for complex data
 */

class D3Manager {
  constructor(config = {}) {
    this.config = {
      colors: ChartConfig.colors,
      theme: ChartConfig.d3Theme,
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
   * Create enhanced security heatmap using D3
   * Shows security capabilities across vendors in a interactive heatmap
   */
  createSecurityHeatmap(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element) return null;
    
    // Clear any existing chart
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    
    const vendors = Object.keys(data.security).filter(v => v !== 'no-nac');
    
    // Security capabilities to display
    const capabilities = [
      { id: 'zeroTrust', name: 'Zero Trust Architecture' },
      { id: 'deviceAuth', name: 'Device Authentication' },
      { id: 'riskAssessment', name: 'Risk Assessment' },
      { id: 'remediationSpeed', name: 'Remediation Speed' },
      { id: 'compliance', name: 'Compliance Coverage' }
    ];
    
    // Prepare data for heatmap
    const heatmapData = [];
    
    vendors.forEach(vendorId => {
      const security = data.security[vendorId];
      const vendor = VENDORS[vendorId];
      
      capabilities.forEach(capability => {
        let value;
        if (capability.id === 'remediationSpeed') {
          // For remediation speed, lower is better, so invert scale
          // Convert minutes to a 0-100 scale (0 min -> 100, 60+ min -> 0)
          const minutes = security.securityScores.remediationSpeed;
          value = Math.max(0, 100 - (minutes * 1.67));
        } else if (capability.id === 'compliance') {
          // For compliance, use the coverage percentage
          value = security.compliance.coverage;
        } else {
          value = security.securityScores[capability.id];
        }
        
        heatmapData.push({
          vendor: vendor.name,
          vendorId: vendorId,
          capability: capability.name,
          capabilityId: capability.id,
          value: value
        });
      });
    });
    
    // Get theme colors
    const isDarkMode = document.body.classList.contains('dark-mode');
    const theme = ChartConfig.getCurrentTheme();
    
    // Set up dimensions
    const margin = { top: 60, right: 80, bottom: 100, left: 160 };
    const width = Math.max(600, element.clientWidth) - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Add heatmap background with subtle gradient
    svg.append('rect')
      .attr('class', 'heatmap-gradient-bg')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'transparent');
    
    // Create scales
    const x = d3.scaleBand()
      .range([0, width])
      .domain(capabilities.map(d => d.name))
      .padding(0.05);
    
    const y = d3.scaleBand()
      .range([height, 0])
      .domain(vendors.map(v => VENDORS[v].name))
      .padding(0.05);
    
    // Add X axis
    svg.append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)')
      .style('font-size', '12px')
      .style('fill', theme.textLight);
    
    // Add Y axis
    svg.append('g')
      .attr('class', 'axis y-axis')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', theme.textLight);
    
    // Build color scale
    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateViridis)
      .domain([0, 100]);
    
    // Create tooltip
    const tooltip = d3.select(element)
      .append('div')
      .attr('class', 'heatmap-tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('z-index', 10)
      .style('background-color', theme.cardBackground)
      .style('border', `1px solid ${theme.borderColor}`)
      .style('border-radius', '8px')
      .style('padding', '12px')
      .style('box-shadow', '0 4px 15px rgba(0, 0, 0, 0.1)');
    
    // Functions for mouseover events
    const mouseover = function(event, d) {
      tooltip.style('opacity', 1);
      d3.select(this)
        .style('stroke', theme.textColor)
        .style('opacity', 1)
        .transition()
        .duration(200)
        .attr('rx', 8)
        .attr('ry', 8);
    };
    
    const mousemove = function(event, d) {
      // Get comparison text for Portnox vs this vendor
      let comparisonText = '';
      
      if (d.vendorId !== 'portnox') {
        // Find Portnox value for same capability
        const portnoxData = heatmapData.find(item => 
          item.vendorId === 'portnox' && item.capabilityId === d.capabilityId
        );
        
        if (portnoxData) {
          const diff = d.value - portnoxData.value;
          if (Math.abs(diff) > 0) {
            const diffStr = Math.abs(diff).toFixed(1);
            if (diff < 0) {
              comparisonText = `<br><span style="color:#e74c3c;font-weight:500;">${diffStr}% lower than Portnox</span>`;
            } else {
              comparisonText = `<br><span style="color:#2ecc71;font-weight:500;">${diffStr}% higher than Portnox</span>`;
            }
          }
        }
      }
      
      tooltip
        .html(`
          <strong>${d.vendor}</strong><br>
          ${d.capability}: <span style="font-weight:600">${Math.round(d.value)}%</span>
          ${comparisonText}
        `)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px');
    };
    
    const mouseleave = function(event, d) {
      tooltip.style('opacity', 0);
      d3.select(this)
        .style('stroke', 'none')
        .style('opacity', 0.95)
        .transition()
        .duration(200)
        .attr('rx', 4)
        .attr('ry', 4);
    };
    
    // Add color squares with animation
    const cells = svg.selectAll()
      .data(heatmapData)
      .enter()
      .append('rect')
      .attr('class', 'heatmap-cell')
      .attr('x', d => x(d.capability))
      .attr('y', d => y(d.vendor))
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => colorScale(d.value))
      .style('stroke-width', 1)
      .style('stroke', 'none')
      .style('opacity', 0)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);
    
    // Add animated entrance for cells
    cells.transition()
      .duration(800)
      .delay((d, i) => i * 10)
      .style('opacity', 0.95);
    
    // Add value text to cells
    svg.selectAll()
      .data(heatmapData)
      .enter()
      .append('text')
      .attr('x', d => x(d.capability) + x.bandwidth()/2)
      .attr('y', d => y(d.vendor) + y.bandwidth()/2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('font-size', '11px')
      .style('font-weight', '600')
      .style('fill', d => d.value > 70 ? 'white' : '#333')
      .style('opacity', 0)
      .text(d => Math.round(d.value))
      .transition()
      .duration(800)
      .delay((d, i) => 300 + i * 10)
      .style('opacity', 1);
    
    // Highlight Portnox row with a subtle glow
    const portnoxRow = heatmapData.filter(d => d.vendorId === 'portnox');
    
    // Add highlight for Portnox row
    svg.selectAll()
      .data(portnoxRow)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', y(portnoxRow[0].vendor))
      .attr('width', width)
      .attr('height', y.bandwidth())
      .attr('fill', 'none')
      .attr('stroke', ChartConfig.colors.vendors.portnox)
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '3,3')
      .attr('rx', 4)
      .attr('ry', 4)
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(800)
      .style('opacity', 0.8);
    
    // Add title
    svg.append('text')
      .attr('class', 'heatmap-title')
      .attr('x', width / 2)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', theme.textColor)
      .text('Security Capabilities Comparison')
      .style('opacity', 0)
      .transition()
      .duration(500)
      .style('opacity', 1);
    
    // Add subtitle with animation
    svg.append('text')
      .attr('class', 'heatmap-subtitle')
      .attr('x', width / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', theme.textLight)
      .text('Higher scores indicate better performance in each category')
      .style('opacity', 0)
      .transition()
      .duration(500)
      .delay(300)
      .style('opacity', 1);
    
    // Add legend
    const legendWidth = 20;
    const legendHeight = 200;
    
    const legendScale = d3.scaleSequential()
      .domain([0, 100])
      .interpolator(d3.interpolateViridis);
    
    // Create a gradient for the legend
    const defs = svg.append('defs');
    
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'linear-gradient')
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '0%')
      .attr('y2', '0%');
    
    linearGradient.selectAll('stop')
      .data(d3.range(0, 1.1, 0.1))
      .enter().append('stop')
      .attr('offset', d => d * 100 + '%')
      .attr('stop-color', d => legendScale(d * 100));
    
    // Add the legend rectangle
    svg.append('rect')
      .attr('x', width + 20)
      .attr('y', 0)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#linear-gradient)')
      .attr('rx', 3)
      .attr('ry', 3)
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(500)
      .style('opacity', 1);
    
    // Create a scale for the legend
    const legendY = d3.scaleLinear()
      .domain([0, 100])
      .range([legendHeight, 0]);
    
    // Add the legend axis
    const legendAxis = d3.axisRight(legendY)
      .tickSize(3)
      .tickValues([0, 25, 50, 75, 100])
      .tickFormat(d => d + '%');
    
    const legendAxisG = svg.append('g')
      .attr('transform', `translate(${width + 20 + legendWidth},0)`)
      .style('opacity', 0);
      
    legendAxisG.call(legendAxis)
      .transition()
      .duration(800)
      .delay(500)
      .style('opacity', 1);
    
    legendAxisG.selectAll('text')
      .style('font-size', '10px')
      .style('fill', theme.textLight);
    
    // Add legend title
    svg.append('text')
      .attr('transform', `translate(${width + 40},${legendHeight + 30})`)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', theme.textColor)
      .text('Capability Score')
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(700)
      .style('opacity', 1);
    
    // Store reference to svg and data
    this.charts[chartId] = {
      svg,
      data: heatmapData,
      resize: () => {
        // Resize handling code
        const newWidth = Math.max(600, element.clientWidth) - margin.left - margin.right;
        
        // Update scales
        x.range([0, newWidth]);
        
        // Update all elements
        svg.selectAll('.heatmap-cell')
          .attr('x', d => x(d.capability))
          .attr('width', x.bandwidth());
          
        svg.selectAll('text')
          .filter(function() {
            return !this.classList.contains('heatmap-title') && 
                   !this.classList.contains('heatmap-subtitle');
          })
          .attr('x', d => x(d.capability) + x.bandwidth()/2);
          
        // Update highlight rectangle
        svg.selectAll('rect')
          .filter(function() {
            return this.getAttribute('stroke-dasharray') === '3,3';
          })
          .attr('width', newWidth);
          
        // Update title positions
        svg.select('.heatmap-title')
          .attr('x', newWidth / 2);
          
        svg.select('.heatmap-subtitle')
          .attr('x', newWidth / 2);
          
        // Update legend position
        svg.selectAll('.legend')
          .attr('transform', `translate(${newWidth + 20},0)`);
      },
      updateTheme: () => {
        // Update theme colors
        const newTheme = ChartConfig.getCurrentTheme();
        
        // Update text colors
        svg.selectAll('text')
          .style('fill', d => {
            if (d3.select(this).classed('heatmap-title')) {
              return newTheme.textColor;
            } else if (d3.select(this).classed('heatmap-subtitle')) {
              return newTheme.textLight;
            } else {
              return newTheme.textLight;
            }
          });
          
        // Update tooltip styles
        tooltip
          .style('background-color', newTheme.cardBackground)
          .style('border', `1px solid ${newTheme.borderColor}`);
          
        // Update axes
        svg.selectAll('.axis text')
          .style('fill', newTheme.textLight);
      },
      destroy: () => {
        if (element) {
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          }
        }
      }
    };
    
    return this.charts[chartId];
  }
  
  /**
   * Create vendor radar chart with enhanced interactivity
   * Shows multi-dimensional comparison of vendor capabilities
   */
  createVendorRadarChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element) return null;
    
    // Clear any existing chart
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    
    // Define dimensions for comparison
    const dimensions = [
      { name: 'Total Cost', key: 'cost' },
      { name: 'Security', key: 'security' },
      { name: 'Ease of Use', key: 'easeOfUse' },
      { name: 'Implementation', key: 'implementation' },
      { name: 'Scalability', key: 'scalability' },
      { name: 'Features', key: 'features' }
    ];
    
    // Select vendors to compare (limit to top 4 for readability)
    const vendors = Object.keys(data.vendors)
      .filter(v => v !== 'no-nac')
      .slice(0, 4);
    
    // Calculate scores for each vendor across dimensions
    const vendorScores = vendors.map(vendorId => {
      const vendor = VENDORS[vendorId];
      const vendorTco = data.vendors[vendorId];
      const security = data.security[vendorId];
      
      const scores = {};
      
      // Calculate normalized scores for each dimension
      
      // Cost - lower is better, normalize to 0-100
      const maxTco = Math.max(...Object.values(data.vendors).map(v => v.totalTco));
      const minTco = Math.min(...Object.values(data.vendors).map(v => v.totalTco));
      scores.cost = 100 - (((vendorTco.totalTco - minTco) / (maxTco - minTco)) * 100);
      
      // Security - higher is better
      scores.security = security.improvements.overall;
      
      // Ease of Use - based on architecture (cloud is easier)
      scores.easeOfUse = vendor.architecture === 'cloud' ? 90 : 
                         (vendor.architecture === 'hybrid' ? 70 : 50);
      
      // Implementation - faster is better, normalize to 0-100
      const maxTime = Math.max(...Object.values(data.vendors).map(v => v.implementation.time));
      const minTime = Math.min(...Object.values(data.vendors).map(v => v.implementation.time));
      scores.implementation = 100 - (((vendorTco.implementation.time - minTime) / (maxTime - minTime)) * 100);
      
      // Scalability - based on architecture and vendor capabilities
      scores.scalability = vendor.architecture === 'cloud' ? 90 : 
                          (vendor.architecture === 'hybrid' ? 75 : 60);
      
      // Features - based on feature support
      const featureCount = Object.values(vendor.features).filter(v => v).length;
      const maxFeatures = 6; // Maximum number of features in our model
      scores.features = (featureCount / maxFeatures) * 100;
      
      return {
        name: vendor.name,
        id: vendorId,
        color: ChartConfig.getVendorColor(vendorId),
        scores
      };
    });
    
    // Get theme colors
    const isDarkMode = document.body.classList.contains('dark-mode');
    const theme = ChartConfig.getCurrentTheme();
    
    // Set up dimensions
    const margin = { top: 60, right: 120, bottom: 60, left: 120 };
    const width = Math.max(500, element.clientWidth) - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const radius = Math.min(width / 2, height / 2);
    
    // Create SVG
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left + width/2},${margin.top + height/2})`);
    
    // Create scales
    const angleScale = d3.scalePoint()
      .range([0, Math.PI * 2])
      .domain(dimensions.map(d => d.key))
      .padding(1);
    
    const radiusScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, 100]);
    
    // Create axes
    const axes = dimensions.map(dim => {
      const angle = angleScale(dim.key);
      return {
        name: dim.name,
        key: dim.key,
        angle,
        x1: 0,
        y1: 0,
        x2: radius * Math.cos(angle - Math.PI / 2),
        y2: radius * Math.sin(angle - Math.PI / 2)
      };
    });
    
    // Add radar background with concentric circles
    const circles = [20, 40, 60, 80, 100];
    
    svg.selectAll('.radar-circle')
      .data(circles)
      .enter()
      .append('circle')
      .attr('class', 'radar-circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 0)
      .attr('fill', 'none')
      .attr('stroke', theme.borderColor)
      .attr('stroke-width', d => d === 100 ? 1.5 : 1)
      .attr('stroke-dasharray', d => d % 40 === 0 ? 'none' : '3,3')
      .attr('opacity', d => (d === 100 ? 0.4 : 0.25))
      .transition()
      .duration(1000)
      .delay((d, i) => i * 200)
      .attr('r', d => radiusScale(d));
    
    // Add axes
    svg.selectAll('.radar-axis')
      .data(axes)
      .enter()
      .append('line')
      .attr('class', 'radar-axis')
      .attr('x1', d => d.x1)
      .attr('y1', d => d.y1)
      .attr('x2', 0)
      .attr('y2', 0)
      .attr('stroke', theme.borderColor)
      .attr('stroke-width', 1.5)
      .transition()
      .duration(1000)
      .attr('x2', d => d.x2)
      .attr('y2', d => d.y2);
    
    // Add axis labels with animated fade-in
    svg.selectAll('.radar-axis-label')
      .data(axes)
      .enter()
      .append('text')
      .attr('class', 'radar-axis-label')
      .attr('x', d => (radius + 20) * Math.cos(d.angle - Math.PI / 2))
      .attr('y', d => (radius + 20) * Math.sin(d.angle - Math.PI / 2))
      .attr('text-anchor', d => {
        const angle = d.angle;
        if (Math.abs(angle - Math.PI) < 0.1) return 'middle';
        return angle > Math.PI ? 'end' : 'start';
      })
      .attr('alignment-baseline', d => {
        const angle = d.angle;
        if (Math.abs(angle - Math.PI / 2) < 0.1) return 'before-edge';
        if (Math.abs(angle - 3 * Math.PI / 2) < 0.1) return 'after-edge';
        return 'middle';
      })
      .style('font-size', '13px')
      .style('font-weight', '600')
      .style('fill', theme.textColor)
      .style('opacity', 0)
      .text(d => d.name)
      .transition()
      .duration(800)
      .delay((d, i) => 1000 + i * 100)
      .style('opacity', 1);
    
    // Add circle labels
    svg.selectAll('.radar-circle-label')
      .data(circles)
      .enter()
      .append('text')
      .attr('class', 'radar-circle-label')
      .attr('x', 5)
      .attr('y', d => -radiusScale(d) + 3)
      .attr('text-anchor', 'start')
      .style('font-size', '9px')
      .style('fill', theme.textLight)
      .style('opacity', 0)
      .text(d => d)
      .transition()
      .duration(500)
      .delay((d, i) => 1200 + i * 100)
      .style('opacity', 0.7);
    
    // Create tooltip
    const tooltip = d3.select(element)
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('z-index', 10)
      .style('background-color', theme.cardBackground)
      .style('border', `1px solid ${theme.borderColor}`)
      .style('border-radius', '8px')
      .style('padding', '12px')
      .style('box-shadow', '0 4px 15px rgba(0, 0, 0, 0.1)');
    
    // Create line generator
    const lineGenerator = d3.lineRadial()
      .angle((d, i) => angleScale(dimensions[i].key) - Math.PI / 2)
      .radius(d => radiusScale(d))
      .curve(d3.curveLinearClosed);
    
    // Add vendor radar paths with animation
    vendorScores.forEach((vendor, index) => {
      const values = dimensions.map(dim => vendor.scores[dim.key]);
      
      // Create group for each vendor
      const vendorGroup = svg.append('g')
        .attr('class', `vendor-${vendor.id}`);
      
      // Draw radar path with animation
      const path = vendorGroup.append('path')
        .datum(values)
        .attr('fill', ChartConfig.getTransparentColor(vendor.color, 0.15))
        .attr('stroke', vendor.color)
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.8)
        .attr('d', d => {
          // Start with a point at the center
          const startValues = dimensions.map(() => 0);
          return lineGenerator(startValues);
        });
      
      // Animate the path expansion
      path.transition()
        .duration(1500)
        .delay(index * 300 + 500)
        .attrTween('d', () => {
          return t => {
            // Interpolate each value from 0 to its final value
            const interpolatedValues = values.map(val => val * t);
            return lineGenerator(interpolatedValues);
          };
        });
      
      // Add points at each dimension with animation
      dimensions.forEach((dim, i) => {
        const angle = angleScale(dim.key) - Math.PI / 2;
        const value = vendor.scores[dim.key];
        
        vendorGroup.append('circle')
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('r', 4)
          .attr('fill', vendor.color)
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5)
          .style('opacity', 0)
          .on('mouseover', function(event, d) {
            d3.select(this).transition()
              .duration(200)
              .attr('r', 6);
              
            tooltip.style('opacity', 1);
            
            // Get comparison with Portnox
            let comparisonText = '';
            if (vendor.id !== 'portnox') {
              const portnoxVendor = vendorScores.find(v => v.id === 'portnox');
              if (portnoxVendor) {
                const portnoxScore = portnoxVendor.scores[dim.key];
                const diff = value - portnoxScore;
                if (Math.abs(diff) > 1) {
                  const diffStr = Math.abs(diff).toFixed(1);
                  if (diff < 0) {
                    comparisonText = `<br><span style="color:#e74c3c;">${diffStr}% lower than Portnox</span>`;
                  } else {
                    comparisonText = `<br><span style="color:#2ecc71;">${diffStr}% higher than Portnox</span>`;
                  }
                }
              }
            }
            
            tooltip.html(`
              <strong>${vendor.name}: ${dim.name}</strong><br>
              Score: <strong>${Math.round(value)}%</strong>
              ${comparisonText}
            `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px');
          })
          .on('mouseout', function() {
            d3.select(this).transition()
              .duration(200)
              .attr('r', 4);
              
            tooltip.style('opacity', 0);
          })
          .transition()
          .duration(500)
          .delay(index * 300 + 2000 + i * 100)
          .attr('cx', radiusScale(value) * Math.cos(angle))
          .attr('cy', radiusScale(value) * Math.sin(angle))
          .style('opacity', 1);
      });
    });
    
    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${radius + 20},-${radius})`)
      .attr('class', 'radar-legend');
    
    vendorScores.forEach((vendor, i) => {
      const legendGroup = legend.append('g')
        .attr('transform', `translate(0,${i * 25})`)
        .style('opacity', 0)
        .transition()
        .duration(500)
        .delay(2500 + i * 200)
        .style('opacity', 1);
      
      legendGroup.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('rx', 2)
        .attr('ry', 2)
        .attr('fill', vendor.color);
      
      legendGroup.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .text(vendor.name)
        .style('font-size', '13px')
        .style('fill', theme.textColor);
    });
    
    // Add chart title
    svg.append('text')
      .attr('class', 'radar-title')
      .attr('x', 0)
      .attr('y', -radius - 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', theme.textColor)
      .text('Vendor Capability Comparison')
      .style('opacity', 0)
      .transition()
      .duration(800)
      .style('opacity', 1);
    
    // Add interaction note
    svg.append('text')
      .attr('x', 0)
      .attr('y', radius + 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', theme.textLight)
      .style('opacity', 0)
      .text('Hover over points for detailed comparison')
      .transition()
      .duration(800)
      .delay(3000)
      .style('opacity', 0.8);
    
    // Store reference to svg and data
    this.charts[chartId] = {
      svg,
      data: vendorScores,
      resize: () => {
        // Resize handling code...
      },
      updateTheme: () => {
        // Theme update handling code...
      },
      destroy: () => {
        if (element) {
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          }
        }
      }
    };
    
    return this.charts[chartId];
  }
  
  /**
   * Initialize charts for Executive View
   */
  initExecutiveCharts(resultsData) {
    // Create vendor radar chart
    this.createVendorRadarChart(resultsData, 'vendor-radar-chart', 'vendorRadarChart');
    
    return this.charts;
  }
  
  /**
   * Initialize charts for Security View
   */
  initSecurityCharts(resultsData) {
    // Create security heatmap
    this.createSecurityHeatmap(resultsData, 'security-heatmap', 'securityHeatmap');
    
    // Create risk heatmap
    this.createRiskHeatmap(resultsData, 'risk-heatmap', 'riskHeatmap');
    
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

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { D3Manager };
}
EOL
  
  # Update ApexCharts implementation with modern visualizations
  cat > "$CHART_DIR/apex/apex-charts.js" << 'EOL'
/**
 * Enhanced ApexCharts implementation for Portnox Total Cost Analyzer
 * Creates modern, interactive charts with advanced features
 */

class ApexChartManager {
  constructor(config = {}) {
    this.config = {
      colors: ChartConfig.colors,
      theme: ChartConfig.apexTheme,
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
    // Update theme in config
    this.config.theme.chart.foreColor = isDarkMode ? '#e0e0e0' : '#333333';
    this.config.theme.tooltip.theme = isDarkMode ? 'dark' : 'light';
    this.config.theme.grid.borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
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
      if (chart) {
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
    const colors = vendors.map(v => ChartConfig.getVendorColor(v));
    
    // Find index of Portnox for highlighting
    const portnoxIndex = vendors.indexOf('portnox');
    
    // Create distributed colors array with Portnox highlighted
    const distributedColors = vendors.map((v, i) => {
      if (i === portnoxIndex) {
        return {
          // Portnox gets a gradient fill
          fillType: 'gradient',
          opacity: 1,
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.2,
          gradientToColors: [ChartConfig.adjustColor(ChartConfig.getVendorColor(v), -15)],
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
          return ChartConfig.formatCurrency(val);
        },
        offsetY: -20,
        style: {
          ...this.config.theme.dataLabels.style,
          colors: ['#555']
        }
      },
      xaxis: {
        categories: vendors.map(v => VENDORS[v].name),
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
            return ChartConfig.formatCurrency(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const vendorId = vendors[dataPointIndex];
          const vendor = VENDORS[vendorId];
          const tcoValue = series[seriesIndex][dataPointIndex];
          
          // Calculate savings compared to most expensive option
          const maxTco = Math.max(...series[seriesIndex]);
          const savings = maxTco - tcoValue;
          const savingsPercent = Math.round((savings / maxTco) * 100);
          
          // Create custom tooltip
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${vendor.name}</div>
              <div class="tooltip-value">${ChartConfig.formatCurrency(tcoValue)}</div>
              ${savings > 0 ? 
                `<div class="tooltip-savings">
                  <span style="color:#2ecc71">Save ${ChartConfig.formatCurrency(savings)}</span>
                  <span style="color:#2ecc71">(${savingsPercent}%)</span>
                 </div>` : ''
              }
              <div class="tooltip-arch">${vendor.architecture === 'cloud' ? 'Cloud Solution' : 
                                         vendor.architecture === 'hybrid' ? 'Hybrid Solution' : 
                                         'On-Premises Solution'}</div>
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
            x: VENDORS[vendors[portnoxIndex]].name,
            y: tcoValues[portnoxIndex],
            marker: {
              size: 0
            },
            label: {
              text: 'Best Value',
              borderColor: ChartConfig.getVendorColor(vendors[portnoxIndex]),
              style: {
                background: ChartConfig.getVendorColor(vendors[portnoxIndex]),
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
        name: VENDORS[vendorId].name,
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
          show: false
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
      colors: vendors.map(v => ChartConfig.getVendorColor(v)),
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
            return ChartConfig.formatCurrency(val);
          }
        }
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
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
              fillColor: ChartConfig.getVendorColor('portnox'),
              strokeColor: '#fff',
              strokeWidth: 2,
              radius: 2
            },
            label: {
              text: `${ChartConfig.formatCurrency(portnoxSeries.data[portnoxSeries.data.length - 1])}`,
              borderColor: ChartConfig.getVendorColor('portnox'),
              style: {
                background: ChartConfig.getVendorColor('portnox'),
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
    const colors = vendors.map(v => ChartConfig.getVendorColor(v));
    
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
        height: 400
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
        categories: vendors.map(v => VENDORS[v].name),
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
          const vendor = VENDORS[vendorId];
          const roiValue = series[seriesIndex][dataPointIndex];
          const payback = data.roi[vendorId].paybackPeriod;
          
          // Create custom tooltip
          return `
            <div class="custom-tooltip">
              <div class="tooltip-title">${vendor.name}</div>
              <div class="tooltip-value">${Math.round(roiValue)}% ROI</div>
              <div class="tooltip-payback">Payback in ${Math.round(payback)} months</div>
              <div class="tooltip-arch">${vendor.architecture === 'cloud' ? 'Cloud Solution' : 
                                         vendor.architecture === 'hybrid' ? 'Hybrid Solution' : 
                                         'On-Premises Solution'}</div>
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
            x: VENDORS[vendors[portnoxIndex]].name,
            y: roiValues[portnoxIndex],
            marker: {
              size: 0
            },
            label: {
              text: 'Best ROI',
              borderColor: ChartConfig.getVendorColor(vendors[portnoxIndex]),
              style: {
                background: ChartConfig.getVendorColor(vendors[portnoxIndex]),
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
          show: false
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
        ChartConfig.colors.chart[0],
        ChartConfig.colors.chart[1],
        ChartConfig.colors.chart[2],
        ChartConfig.colors.chart[3],
        ChartConfig.colors.chart[4]
      ],
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return ChartConfig.formatCurrency(val);
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
            return ChartConfig.formatCurrency(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
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
   * Create Cost Structure Chart
   * Stacked bar chart showing cost breakdown by component
   */
  createCostStructureChart(data, elementId, chartId) {
    const vendors = Object.keys(data.vendors).filter(v => v !== 'no-nac');
    
    // Prepare series data for a stacked bar chart
    const series = [
      { name: 'Hardware', data: [] },
      { name: 'Software', data: [] },
      { name: 'Subscription', data: [] },
      { name: 'Implementation', data: [] },
      { name: 'Maintenance', data: [] },
      { name: 'Personnel', data: [] },
      { name: 'Operational', data: [] },
      { name: 'Downtime', data: [] }
    ];
    
    const categories = [];
    
    vendors.forEach(vendorId => {
      const vendor = data.vendors[vendorId];
      categories.push(VENDORS[vendorId].name);
      
      // Add each cost component to the series
      series[0].data.push(vendor.breakdown.hardware || 0);
      series[1].data.push(vendor.breakdown.software || 0);
      series[2].data.push(vendor.breakdown.subscription || 0);
      series[3].data.push(vendor.breakdown.implementation || 0);
      series[4].data.push(vendor.breakdown.maintenance || 0);
      series[5].data.push(vendor.breakdown.personnel || 0);
      series[6].data.push(vendor.breakdown.operational || 0);
      series[7].data.push(vendor.breakdown.downtime || 0);
    });
    
    // Filter out empty series
    const filteredSeries = series.filter(s => s.data.some(v => v > 0));
    
    const options = {
      ...this.config.theme,
      series: filteredSeries,
      chart: {
        ...this.config.theme.chart,
        type: 'bar',
        height: 450,
        stacked: true
      },
      colors: [
        '#3498db', // Hardware
        '#2ecc71', // Software
        '#1abc9c', // Subscription
        '#9b59b6', // Implementation
        '#f39c12', // Maintenance
        '#e74c3c', // Personnel
        '#34495e', // Operational
        '#d35400'  // Downtime
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          borderRadius: 0
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: categories,
        labels: {
          ...this.config.theme.xaxis.labels
        }
      },
      yaxis: {
        title: {
          text: 'Cost Breakdown ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '13px',
        offsetY: 10,
        markers: {
          fillColors: [
            '#3498db', '#2ecc71', '#1abc9c', '#9b59b6',
            '#f39c12', '#e74c3c', '#34495e', '#d35400'
          ]
        }
      },
      title: {
        text: 'Cost Structure Breakdown',
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
   * Create Cost Projection Chart
   * Line chart showing yearly costs for different vendors
   */
  createCostProjectionChart(data, elementId, chartId) {
    const vendors = Object.keys(data.vendors).filter(v => v !== 'no-nac');
    const series = [];
    
    vendors.forEach(vendorId => {
      const vendor = data.vendors[vendorId];
      const yearlyData = vendor.yearlyBreakdown.map(y => y.cost);
      
      series.push({
        name: VENDORS[vendorId].name,
        data: yearlyData
      });
    });
    
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
        }
      },
      colors: vendors.map(v => ChartConfig.getVendorColor(v)),
      stroke: {
        curve: 'straight',
        width: 3
      },
      markers: {
        size: 5,
        hover: {
          size: 7
        }
      },
      grid: {
        padding: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        }
      },
      xaxis: {
        categories: data.vendors[vendors[0]].yearlyBreakdown.map(y => `Year ${y.year}`),
        labels: {
          ...this.config.theme.xaxis.labels
        }
      },
      yaxis: {
        title: {
          text: 'Annual Cost ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
          }
        }
      },
      tooltip: {
        shared: true,
        y: {
          formatter: function(val) {
            return ChartConfig.formatCurrency(val);
          }
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '13px',
        offsetY: 10,
        itemMargin: {
          horizontal: 10,
          vertical: 5
        }
      },
      title: {
        text: '3-Year Cost Projection',
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
   * Initialize charts for Financial View
   */
  initFinancialCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['costStructureChart', 'costProjectionChart']);
    
    // Create cost structure chart
    this.createCostStructureChart(resultsData, 'cost-structure-chart', 'costStructureChart');
    
    // Create cost projection chart
    this.createCostProjectionChart(resultsData, 'cost-projection-chart', 'costProjectionChart');
    
    return this.charts;
  }
  
  /**
   * Helper method to destroy charts
   */
  destroyCharts(chartIds) {
    chartIds.forEach(id => {
      if (this.charts[id]) {
        this.charts[id].destroy();
        delete this.charts[id];
      }
    });
  }
}

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ApexChartManager };
}
EOL
  
  # Update sidebar-manager.js with enhanced interactions
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
    this.isDraggingSlider = false; // Track slider drag state
    
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
    
    // Initialize collapsible sections
    this.initCollapsibleSections();
    
    // Initialize vendor selection
    this.initVendorSelection();
    
    // Initialize range sliders
    this.initRangeSliders();
    
    // Initialize sidebar toggle
    this.initSidebarToggle();
    
    // Initialize enhanced features
    this.initEnhancedFeatures();
    
    this.initialized = true;
    console.log('Enhanced Sidebar manager initialized');
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
   * Toggle section expand/collapse with animation
   */
  toggleSection(cardId) {
    const card = document.getElementById(cardId);
    const content = card.querySelector('.config-card-content');
    const toggleIcon = card.querySelector('.toggle-icon');
    
    if (this.expanded[cardId]) {
      // Collapse
      content.style.maxHeight = content.scrollHeight + 'px';
      setTimeout(() => {
        content.style.maxHeight = '0px';
        content.classList.add('collapsed');
      }, 10);
      
      // Animate icon
      toggleIcon.style.transform = 'rotate(0deg)';
      toggleIcon.classList.add('collapsed');
    } else {
      // Expand
      content.classList.remove('collapsed');
      content.style.maxHeight = '0px';
      setTimeout(() => {
        content.style.maxHeight = content.scrollHeight + 'px';
        
        // Reset maxHeight after animation completes
        setTimeout(() => {
          content.style.maxHeight = '';
        }, 300);
      }, 10);
      
      // Animate icon
      toggleIcon.style.transform = 'rotate(180deg)';
      toggleIcon.classList.remove('collapsed');
    }
    
    this.expanded[cardId] = !this.expanded[cardId];
  }
  
  /**
   * Initialize vendor selection with enhanced effects
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
      
      // Add click handler with better visual feedback
      card.addEventListener('click', (e) => {
        // Add ripple effect on click
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        
        ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
        
        card.appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
          ripple.remove();
        }, 600);
        
        // Toggle selection
        this.toggleVendorSelection(vendorId, card);
      });
      
      // Add hover animation
      card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('selected') && vendorId !== 'portnox') {
          card.style.transform = 'translateY(-5px)';
          
          // Highlight all logos
          const logo = card.querySelector('.vendor-logo img');
          if (logo) {
            logo.style.filter = 'grayscale(0)';
          }
        }
      });
      
      card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('selected') && vendorId !== 'portnox') {
          card.style.transform = '';
          
          // Reset logo filter if not selected
          const logo = card.querySelector('.vendor-logo img');
          if (logo && !card.classList.contains('selected')) {
            logo.style.filter = '';
          }
        }
      });
    });
    
    // Update initial counter
    if (vendorCounter) {
      vendorCounter.textContent = this.selectedVendors.length;
    }
  }
  
  /**
   * Toggle vendor selection with enhanced animations
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
        
        // Animate selection
        card.classList.add('selecting');
        setTimeout(() => {
          card.classList.remove('selecting');
          card.classList.add('selected');
        }, 300);
        
        // Enhance logo
        const logo = card.querySelector('.vendor-logo img');
        if (logo) {
          logo.style.filter = 'grayscale(0)';
          logo.style.transform = 'scale(1.1)';
          setTimeout(() => {
            logo.style.transform = '';
          }, 300);
        }
        
        // Play selection animation
        card.animate([
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(1.05)', opacity: 1 },
          { transform: 'scale(1)', opacity: 1 }
        ], {
          duration: 300,
          easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
      } else {
        // Show max vendors reached message
        this.showMaxVendorsMessage();
      }
    } else {
      // Remove vendor
      this.selectedVendors.splice(index, 1);
      
      // Animate deselection
      card.classList.add('deselecting');
      setTimeout(() => {
        card.classList.remove('selected');
        card.classList.remove('deselecting');
      }, 300);
      
      // Reset logo
      const logo = card.querySelector('.vendor-logo img');
      if (logo) {
        logo.style.filter = '';
      }
    }
    
    // Update counter with animation
    if (vendorCounter) {
      vendorCounter.classList.add('updating');
      setTimeout(() => {
        vendorCounter.textContent = this.selectedVendors.length;
        vendorCounter.classList.remove('updating');
      }, 150);
    }
    
    // Trigger event for other components
    this.triggerVendorSelectionEvent();
    
    console.log('Selected vendors:', this.selectedVendors);
  }
  
  /**
   * Show max vendors reached message with enhanced styling
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
    text.innerHTML = `Maximum of <strong>${this.maxVendors} vendors</strong> can be compared at once.<br>Please deselect a vendor first.`;
    
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
   * Initialize range sliders with enhanced interaction
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
      
      // Add drag start/end tracking for animations
      slider.addEventListener('mousedown', () => {
        this.isDraggingSlider = true;
        document.body.classList.add('slider-dragging');
        if (valueDisplay) {
          valueDisplay.classList.add('active');
        }
      });
      
      // Listen for drag end
      document.addEventListener('mouseup', () => {
        if (this.isDraggingSlider) {
          this.isDraggingSlider = false;
          document.body.classList.remove('slider-dragging');
          if (valueDisplay) {
            valueDisplay.classList.remove('active');
            
            // Pulse animation when value changes
            valueDisplay.classList.add('pulse');
            setTimeout(() => {
              valueDisplay.classList.remove('pulse');
            }, 300);
          }
        }
      });
      
      // Touch events for mobile
      slider.addEventListener('touchstart', () => {
        this.isDraggingSlider = true;
        document.body.classList.add('slider-dragging');
        if (valueDisplay) {
          valueDisplay.classList.add('active');
        }
      });
      
      document.addEventListener('touchend', () => {
        if (this.isDraggingSlider) {
          this.isDraggingSlider = false;
          document.body.classList.remove('slider-dragging');
          if (valueDisplay) {
            valueDisplay.classList.remove('active');
            valueDisplay.classList.add('pulse');
            setTimeout(() => {
              valueDisplay.classList.remove('pulse');
            }, 300);
          }
        }
      });
      
      // Add double-click to reset to default
      slider.addEventListener('dblclick', () => {
        slider.value = slider.getAttribute('data-default') || slider.value;
        if (valueDisplay) {
          this.updateRangeSliderValue(slider, valueDisplay);
        }
        this.updateRangeSliderBackground(slider);
        
        // Animate the value display
        if (valueDisplay) {
          valueDisplay.classList.add('reset');
          setTimeout(() => {
            valueDisplay.classList.remove('reset');
          }, 300);
        }
      });
      
      // Store default value
      slider.setAttribute('data-default', slider.value);
    });
  }
  
  /**
   * Update range slider value display with formatting
   */
  updateRangeSliderValue(slider, valueDisplay) {
    const value = slider.value;
    
    // Format value based on id
    if (slider.id.includes('cost') || slider.id.includes('fte-cost')) {
      valueDisplay.textContent = `${parseInt(value).toLocaleString()}`;
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
    
    // Enhanced gradient with better visual feedback
    slider.style.background = `linear-gradient(to right, 
      var(--primary-color) 0%, 
      var(--primary-color) ${percentage}%, 
      var(--border-color) ${percentage}%, 
      var(--border-color) 100%)`;
  }
  
  /**
   * Initialize sidebar toggle with enhanced animations
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
   * Toggle sidebar visibility with smooth animations
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
        
        // Animate the toggle icon
        const icon = sidebarToggle.querySelector('i');
        if (icon) {
          icon.classList.add('rotating');
          setTimeout(() => {
            icon.classList.remove('rotating');
          }, 300);
        }
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
        
        // Add slide animation for mobile
        if (sidebar.classList.contains('active')) {
          sidebar.style.transform = 'translateX(0)';
        } else {
          sidebar.style.transform = 'translateX(-100%)';
        }
      }
    }
  }
  
  /**
   * Initialize enhanced features for better UX
   */
  initEnhancedFeatures() {
    // Add tooltips to form elements
    this.addFormTooltips();
    
    // Add option to reset all inputs
    this.addResetOption();
    
    // Add keyboard navigation
    this.addKeyboardNavigation();
    
    // Add smooth scrolling within sidebar
    this.addSmoothScrolling();
  }
  
  /**
   * Add tooltips to form elements
   */
  addFormTooltips() {
    const formLabels = document.querySelectorAll('.form-label');
    
    formLabels.forEach(label => {
      const infoIcon = document.createElement('i');
      infoIcon.className = 'fas fa-info-circle tooltip-trigger';
      infoIcon.style.marginLeft = '5px';
      infoIcon.style.color = 'var(--text-light)';
      infoIcon.style.fontSize = '12px';
      infoIcon.style.cursor = 'help';
      
      // Get tooltip text from data attribute or create default
      const tooltipText = label.getAttribute('data-tooltip') || `Information about ${label.textContent}`;
      infoIcon.setAttribute('data-tooltip', tooltipText);
      
      label.appendChild(infoIcon);
      
      // Create tooltip element
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = tooltipText;
      tooltip.style.position = 'absolute';
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
      tooltip.style.backgroundColor = 'var(--card-background)';
      tooltip.style.color = 'var(--text-color)';
      tooltip.style.padding = '8px 12px';
      tooltip.style.borderRadius = '6px';
      tooltip.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
      tooltip.style.fontSize = '12px';
      tooltip.style.maxWidth = '250px';
      tooltip.style.zIndex = '1000';
      tooltip.style.transition = 'opacity 0.2s, visibility 0.2s';
      
      document.body.appendChild(tooltip);
      
      // Show tooltip on hover
      infoIcon.addEventListener('mouseenter', (e) => {
        const rect = infoIcon.getBoundingClientRect();
        tooltip.style.top = `${rect.bottom + 10}px`;
        tooltip.style.left = `${rect.left - 125 + rect.width / 2}px`;
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
      });
      
      infoIcon.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
      });
    });
  }
  
  /**
   * Add reset option to sidebar
   */
  addResetOption() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    const resetButton = document.createElement('button');
    resetButton.className = 'btn btn-outline reset-config-btn';
    resetButton.innerHTML = '<i class="fas fa-undo"></i> Reset All Settings';
    resetButton.style.marginTop = '15px';
    resetButton.style.width = '100%';
    resetButton.style.padding = '8px';
    
    const sidebarFooter = sidebar.querySelector('.sidebar-footer');
    if (sidebarFooter) {
      sidebarFooter.insertBefore(resetButton, sidebarFooter.firstChild);
      
      // Add click handler
      resetButton.addEventListener('click', () => {
        this.resetAllSettings();
      });
    }
  }
  
  /**
   * Reset all form controls to defaults
   */
  resetAllSettings() {
    // Reset range sliders
    const rangeSliders = document.querySelectorAll('input[type="range"]');
    rangeSliders.forEach(slider => {
      const defaultValue = slider.getAttribute('data-default');
      if (defaultValue) {
        slider.value = defaultValue;
        
        // Update display and background
        const valueDisplay = document.getElementById(`${slider.id}-value`);
        if (valueDisplay) {
          this.updateRangeSliderValue(slider, valueDisplay);
          valueDisplay.classList.add('reset');
          setTimeout(() => {
            valueDisplay.classList.remove('reset');
          }, 300);
        }
        
        this.updateRangeSliderBackground(slider);
      }
    });
    
    // Reset checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      const defaultChecked = checkbox.getAttribute('data-default') === 'true';
      checkbox.checked = defaultChecked;
    });
    
    // Reset select boxes
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
      const defaultValue = select.getAttribute('data-default');
      if (defaultValue) {
        select.value = defaultValue;
      }
    });
    
    // Reset input fields
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => {
      const defaultValue = input.getAttribute('data-default');
      if (defaultValue) {
        input.value = defaultValue;
      }
    });
    
    // Show confirmation message
    this.showToast('All settings have been reset to defaults', 'info');
  }
  
  /**
   * Add keyboard navigation for better accessibility
   */
  addKeyboardNavigation() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    // Add tabindex to all interactive elements
    const interactiveElements = sidebar.querySelectorAll('button, input, select, .vendor-select-card');
    interactiveElements.forEach((element, index) => {
      element.setAttribute('tabindex', index + 1);
    });
    
    // Add keyboard handler for vendor cards
    const vendorCards = sidebar.querySelectorAll('.vendor-select-card');
    vendorCards.forEach(card => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }
  
  /**
   * Add smooth scrolling within sidebar
   */
  addSmoothScrolling() {
    const sidebarContent = document.querySelector('.sidebar-content');
    if (!sidebarContent) return;
    
    // Improve scroll behavior
    sidebarContent.style.scrollBehavior = 'smooth';
    
    // Add scroll to section functionality
    const headers = sidebarContent.querySelectorAll('.config-card-header');
    headers.forEach(header => {
      header.addEventListener('click', () => {
        // Scroll section into view when opening
        const card = header.closest('.config-card');
        const cardId = card.id;
        
        // Only scroll if expanding
        if (!this.expanded[cardId]) {
          setTimeout(() => {
            header.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      });
    });
  }
  
  /**
   * Display a toast message
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
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
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
    
    const text = document.createElement('span');
    text.textContent = message;
    
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
  
  echo -e "${GREEN}Chart visualizations enhanced successfully!${NC}"
}

# Function to update integration script
update_integration() {
  echo -e "${YELLOW}Updating application integration...${NC}"
  
  # Update integration.js with enhanced logic
  cat > "$JS_DIR/integration.js" << 'EOL'
/**
 * Enhanced Integration script for Portnox Total Cost Analyzer
 * This script integrates all the components into the main application with improved UX
 */

document.addEventListener('DOMContentLoaded', () => {
  // Integration of UI manager
  if (App.state) {
    console.log('Initializing enhanced integration...');
    
    // Add enhanced components to App.state
    App.state.uiManager = new UIManager(App);
    App.state.themeManager = new ThemeManager();
    App.state.vendorComparison = new VendorComparisonView(App);
    
    // Initialize vendor comparison
    App.state.vendorComparison.init('vendor-radar-chart');
    
    // Override App methods with enhanced versions
    const originalInit = App.init;
    App.init = function() {
      // Call original init
      const result = originalInit.apply(this, arguments);
      
      // Initialize UI manager
      this.state.uiManager.init();
      
      // Set up advanced integrations
      this.setupAdvancedIntegrations();
      
      return result;
    };
    
    // Add new method for advanced integrations
    App.setupAdvancedIntegrations = function() {
      // Set up integration between UI manager and chart loader
      if (this.state.chartLoader && this.state.uiManager) {
        // Notify UI manager when charts are loaded
        const originalCreateChart = this.state.chartLoader.loadExecutiveCharts;
        this.state.chartLoader.loadExecutiveCharts = function() {
          const result = originalCreateChart.apply(this, arguments);
          App.state.uiManager.notifyChartsLoaded('executive');
          return result;
        };
      }
      
      // Set up integration between vendors and chart display
      document.addEventListener('vendorSelectionChanged', (event) => {
        const { selectedVendors } = event.detail;
        
        // If we already have results, update charts with new vendor selection
        if (this.state.results) {
          // Show loading overlay
          if (this.state.uiManager) {
            this.state.uiManager.showLoading('Updating charts...');
          }
          
          // Short delay for better UX
          setTimeout(() => {
            this.updateChartsForActiveView();
            
            // Hide loading overlay
            if (this.state.uiManager) {
              this.state.uiManager.hideLoading();
            }
          }, 500);
        }
      });
      
      // Set up integration with theme manager and charts
      window.addEventListener('themechange', (event) => {
        const isDarkMode = event.detail.theme === 'dark';
        
        // Update chart colors if charts exist
        if (this.state.chartLoader) {
          this.updateChartsForActiveView();
        }
      });
      
      // Extend App with quick actions
      this.extendWithQuickActions();
    };
    
    // Add method to extend app with quick actions
    App.extendWithQuickActions = function() {
      // Add quick vendor selector
      this.addQuickVendorSelector();
      
      // Add quick view switcher
      this.addQuickViewSwitcher();
      
      // Add quick calculator button
      this.enhanceCalculateButton();
    };
    
    // Add quick vendor selector
    App.addQuickVendorSelector = function() {
      const headerActions = document.querySelector('.header-actions');
      if (!headerActions) return;
      
      // Create the selector
      const vendorSelector = document.createElement('div');
      vendorSelector.className = 'quick-vendor-selector';
      vendorSelector.innerHTML = `
        <button class="btn btn-outline btn-icon">
          <i class="fas fa-server"></i>
          <span>Vendors</span>
        </button>
        <div class="quick-vendor-dropdown">
          <div class="quick-vendor-list"></div>
        </div>
      `;
      
      headerActions.insertBefore(vendorSelector, headerActions.firstChild);
      
      // Populate vendor list
      const vendorList = vendorSelector.querySelector('.quick-vendor-list');
      const vendors = Object.keys(VENDORS).filter(v => v !== 'portnox' && v !== 'no-nac');
      
      vendors.forEach(vendorId => {
        const vendor = VENDORS[vendorId];
        const vendorItem = document.createElement('div');
        vendorItem.className = 'quick-vendor-item';
        vendorItem.dataset.vendor = vendorId;
        
        vendorItem.innerHTML = `
          <div class="quick-vendor-logo">
            <img src="${vendor.logo}" alt="${vendor.name}">
          </div>
          <div class="quick-vendor-name">${vendor.name}</div>
        `;
        
        vendorList.appendChild(vendorItem);
        
        // Add click handler
        vendorItem.addEventListener('click', () => {
          // Toggle vendor selection
          if (window.sidebarManager) {
            const isSelected = window.sidebarManager.selectedVendors.includes(vendorId);
            if (isSelected) {
              window.sidebarManager.deselectVendor(vendorId);
              vendorItem.classList.remove('selected');
            } else {
              window.sidebarManager.selectVendor(vendorId);
              vendorItem.classList.add('selected');
            }
          }
        });
      });
      
      // Toggle dropdown on button click
      const selectorButton = vendorSelector.querySelector('button');
      const dropdown = vendorSelector.querySelector('.quick-vendor-dropdown');
      
      selectorButton.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
        dropdown.classList.remove('active');
      });
      
      // Update quick selector when vendors change
      document.addEventListener('vendorSelectionChanged', (event) => {
        const { selectedVendors } = event.detail;
        
        // Update selected state in quick selector
        const vendorItems = vendorList.querySelectorAll('.quick-vendor-item');
        vendorItems.forEach(item => {
          const vendorId = item.dataset.vendor;
          if (selectedVendors.includes(vendorId)) {
            item.classList.add('selected');
          } else {
            item.classList.remove('selected');
          }
        });
      });
    };
    
    // Add quick view switcher
    App.addQuickViewSwitcher = function() {
      // Already have view tabs in the UI, so we'll just improve them
      const viewTabs = document.querySelectorAll('.main-tab');
      viewTabs.forEach(tab => {
        // Add hover effect
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
        
        // Add click animation
        tab.addEventListener('click', () => {
          tab.animate([
            { transform: 'scale(0.95)' },
            { transform: 'scale(1)' }
          ], {
            duration: 200,
            easing: 'ease-out'
          });
        });
      });
    };
    
    // Enhance calculate button
    App.enhanceCalculateButton = function() {
      const calculateBtn = document.getElementById('calculate-btn');
      const calculateHeaderBtn = document.getElementById('calculate-btn-header');
      
      [calculateBtn, calculateHeaderBtn].forEach(btn => {
        if (!btn) return;
        
        // Add loading state
        const originalText = btn.innerHTML;
        const spinner = '<i class="fas fa-spinner fa-spin"></i>';
        
        // Override click handler
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Show loading state
          btn.innerHTML = spinner + ' Calculating...';
          btn.disabled = true;
          
          // Call calculate after small delay for better UX
          setTimeout(() => {
            this.calculate();
            
            // Reset button after calculation
            setTimeout(() => {
              btn.innerHTML = originalText;
              btn.disabled = false;
              
              // Add success animation
              btn.classList.add('calculation-complete');
              setTimeout(() => {
                btn.classList.remove('calculation-complete');
              }, 1000);
            }, 500);
          }, 200);
        }, true); // Use capturing to override existing handler
      });
    };
    
    // Fix any initialization issues
    if (App.initialized) {
      // App already initialized, just initialize UI manager
      App.state.uiManager.init();
      App.setupAdvancedIntegrations();
    }
    
    // Apply final UI enhancements
    const enhanceUI = () => {
      // Add animation classes
      document.querySelectorAll('.dashboard-card, .chart-container')
        .forEach((el, index) => {
          el.classList.add('animate-fade-in');
          el.style.animationDelay = `${index * 100}ms`;
        });
      
      // Add tooltip data attributes
      document.querySelectorAll('.btn[title]').forEach(btn => {
        btn.setAttribute('data-tooltip', btn.getAttribute('title'));
        btn.removeAttribute('title');
      });
      
      // Add vendor card hover effects
      document.querySelectorAll('.vendor-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          if (!card.classList.contains('selected')) {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
          }
        });
        
        card.addEventListener('mouseleave', () => {
          if (!card.classList.contains('selected')) {
            card.style.transform = '';
            card.style.boxShadow = '';
          }
        });
      });
    };
    
    // Run UI enhancements
    enhanceUI();
    
    // Add resize handler for responsiveness
    window.addEventListener('resize', () => {
      if (App.state.uiManager) {
        App.state.uiManager.handleResize();
      }
    });
    
    console.log('Enhanced integration applied successfully');
  } else {
    console.error('App not initialized. Integration failed.');
  }
});
EOL
  
  echo -e "${GREEN}Application integration updated successfully!${NC}"
}

# Function to update finalization and custom styling
finalize_application() {
  echo -e "${YELLOW}Finalizing application enhancements...${NC}"
  
  # Create a custom.css file for additional styling
  mkdir -p "$CSS_DIR/custom"
  
  cat > "$CSS_DIR/custom/enhanced-animations.css" << 'EOL'
/* Enhanced animations and transitions for Portnox Total Cost Analyzer */

/* Ripple effect animation for buttons and cards */
.ripple-effect {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  transform: scale(0);
  animation: ripple 0.6s ease-out;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* Smooth transitions for all interactive elements */
button, a, input, select, .vendor-select-card, .config-card, .chart-container, .dashboard-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Enhanced loading animations */
.loading-spinner .spinner {
  border-top-color: var(--primary-color);
  animation: enhanced-spin 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}

@keyframes enhanced-spin {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(540deg); }
  100% { transform: rotate(1080deg); }
}

/* Pulse animation for highlighting elements */
.pulse {
  animation: pulse-animation 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
}

@keyframes pulse-animation {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Rotating animation for icons */
.rotating {
  animation: rotate-animation 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@keyframes rotate-animation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(180deg); }
}

/* Staggered entrance animations for dashboard cards */
.dashboard-card {
  opacity: 0;
  transform: translateY(20px);
}

.dashboard-card.animate-in {
  animation: card-entrance 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes card-entrance {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Value change animations for slider values */
.range-slider-value {
  transition: all 0.3s ease;
}

.range-slider-value.pulse {
  animation: value-pulse 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

@keyframes value-pulse {
  0% { transform: scale(1); background-color: rgba(26, 90, 150, 0.1); }
  50% { transform: scale(1.1); background-color: rgba(26, 90, 150, 0.2); }
  100% { transform: scale(1); background-color: rgba(26, 90, 150, 0.1); }
}

.range-slider-value.reset {
  animation: value-reset 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

@keyframes value-reset {
  0% { background-color: rgba(46, 204, 113, 0.1); }
  50% { background-color: rgba(46, 204, 113, 0.3); }
  100% { background-color: rgba(26, 90, 150, 0.1); }
}

/* Enhanced toast animations */
.toast {
  transform: translateX(120%);
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.toast.show {
  transform: translateX(0);
}

/* Quick vendor selector animation */
.quick-vendor-selector {
  position: relative;
}

.quick-vendor-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 250px;
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  z-index: 1000;
  overflow: hidden;
  border: 1px solid var(--border-color);
  margin-top: 10px;
}

.quick-vendor-dropdown.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.quick-vendor-list {
  max-height: 300px;
  overflow-y: auto;
}

.quick-vendor-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid var(--border-light);
}

.quick-vendor-item:last-child {
  border-bottom: none;
}

.quick-vendor-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.quick-vendor-item.selected {
  background-color: rgba(26, 90, 150, 0.1);
}

.quick-vendor-logo {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.quick-vendor-logo img {
  max-width: 100%;
  max-height: 100%;
}

.quick-vendor-name {
  font-size: 14px;
  font-weight: 500;
}

/* Calculate button success animation */
.btn-calculate.calculation-complete {
  animation: calc-success 1s ease;
}

@keyframes calc-success {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Tooltips */
[data-tooltip] {
  position: relative;
}

[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-5px);
  background-color: var(--card-background);
  color: var(--text-color);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  pointer-events: none;
  z-index: 1000;
}

[data-tooltip]:hover::after {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
  visibility: visible;
}
EOL
  
  # Create a new file for enhancing the report export functionality
  cat > "$JS_DIR/utils/enhanced-report-generator.js" << 'EOL'
/**
 * Enhanced Report Generator for Portnox Total Cost Analyzer
 * Creates beautiful, comprehensive PDF reports with charts and analysis
 */

class EnhancedReportGenerator {
  constructor(config = {}) {
    this.config = {
      fileName: 'Portnox_TCO_Analysis_Report.pdf',
      pageSize: 'a4',
      pageOrientation: 'portrait',
      pageMargins: [40, 60, 40, 60],
      enableCharts: true,
      addWatermark: false,
      companyLogo: null,
      ...config
    };
    
    // Set up chart capturing functionality
    this.setupChartCapturing();
  }
  
  /**
   * Set up chart capturing for adding to PDF
   */
  setupChartCapturing() {
    // Setup chart to image conversion if html2canvas is available
    this.canCaptureCharts = typeof html2canvas !== 'undefined';
    
    if (!this.canCaptureCharts) {
      console.warn('html2canvas not available, charts will not be included in PDF report');
    }
  }
  
  /**
   * Generate a PDF report from the TCO analysis results
   */
  generateReport(resultsData, userConfig, selectedVendors) {
    console.log('Generating enhanced PDF report...');
    
    // Capture charts first if enabled
    if (this.config.enableCharts && this.canCaptureCharts) {
      return this.captureCharts()
        .then(chartImages => {
          // Create document with chart images
          const docDefinition = this.createDocDefinition(resultsData, userConfig, selectedVendors, chartImages);
          return this.generatePDF(docDefinition);
        });
    } else {
      // Create document without charts
      const docDefinition = this.createDocDefinition(resultsData, userConfig, selectedVendors);
      return this.generatePDF(docDefinition);
    }
  }
  
  /**
   * Capture charts from the page
   */
  captureCharts() {
    // Find all chart containers
    const chartContainers = document.querySelectorAll('.chart-wrapper');
    const chartPromises = [];
    
    // Capture each chart as an image
    chartContainers.forEach(container => {
      if (container.id) {
        const chartPromise = html2canvas(container, {
          scale: 2, // Higher resolution
          backgroundColor: null, // Transparent background
          logging: false,
          useCORS: true // For external images
        }).then(canvas => {
          return {
            id: container.id,
            data: canvas.toDataURL('image/png')
          };
        }).catch(error => {
          console.error(`Error capturing chart ${container.id}:`, error);
          return null;
        });
        
        chartPromises.push(chartPromise);
      }
    });
    
    return Promise.all(chartPromises).then(results => {
      // Filter out any failed captures
      return results.filter(result => result !== null);
    });
  }
  
  /**
   * Create document definition for pdfmake
   */
  createDocDefinition(resultsData, userConfig, selectedVendors, chartImages = []) {
    const vendors = selectedVendors.map(id => VENDORS[id]);
    const currentDate = new Date().toLocaleDateString();
    
    // Build document content
    const content = [
      // Cover page
      this.createCoverPage(resultsData, currentDate),
      
      // Table of Contents
      this.createTableOfContents(),
      
      // Executive Summary
      this.createExecutiveSummary(resultsData, userConfig, vendors, chartImages),
      
      // Financial Analysis
      this.createFinancialAnalysis(resultsData, userConfig, vendors, chartImages),
      
      // Security & Compliance
      this.createSecurityAnalysis(resultsData, userConfig, vendors, chartImages),
      
      // Technical Comparison
      this.createTechnicalAnalysis(resultsData, userConfig, vendors, chartImages),
      
      // Appendix: Configuration Details
      this.createConfigurationDetails(userConfig)
    ];
    
    // Create document definition
    return {
      info: {
        title: 'Portnox TCO Analysis Report',
        author: 'Portnox',
        subject: 'Network Access Control Total Cost of Ownership Analysis',
        keywords: 'NAC, TCO, ROI, Portnox, Zero Trust'
      },
      pageSize: this.config.pageSize,
      pageOrientation: this.config.pageOrientation,
      pageMargins: this.config.pageMargins,
      footer: function(currentPage, pageCount) {
        return {
          text: `Page ${currentPage} of ${pageCount}`,
          alignment: 'center',
          margin: [0, 10, 0, 0],
          fontSize: 9,
          color: '#666666'
        };
      },
      header: function(currentPage) {
        if (currentPage === 1) return null; // No header on cover page
        
        return {
          columns: [
            {
              image: 'data:image/png;base64,...', // Base64 Portnox logo
              width: 100,
              margin: [40, 20, 0, 0]
            },
            {
              text: 'Total Cost Analyzer Report',
              alignment: 'right',
              margin: [0, 20, 40, 0],
              fontSize: 9,
              color: '#666666'
            }
          ]
        };
      },
      content: content,
      styles: this.getDocumentStyles(),
      defaultStyle: {
        fontSize: 10,
        color: '#333333'
      }
    };
  }
  
  /**
   * Generate the PDF from the document definition
   */
  generatePDF(docDefinition) {
    // Generate PDF using pdfmake
    return new Promise((resolve, reject) => {
      try {
        pdfMake.createPdf(docDefinition).download(this.config.fileName);
        resolve(true);
      } catch (error) {
        console.error('Error generating PDF report:', error);
        reject(error);
      }
    });
  }
  
  /**
   * Create cover page content
   */
  createCoverPage(resultsData, currentDate) {
    return {
      stack: [
        {
          text: 'Zero Trust Total Cost Analyzer',
          style: 'title',
          margin: [0, 100, 0, 20]
        },
        {
          text: 'Multi-Vendor NAC Solution Comparison Report',
          style: 'subtitle',
          margin: [0, 0, 0, 40]
        },
        {
          image: 'data:image/png;base64,...', // Base64 Portnox logo
          width: 200,
          alignment: 'center',
          margin: [0, 0, 0, 40]
        },
        {
          text: `Generated on: ${currentDate}`,
          alignment: 'center',
          margin: [0, 60, 0, 0]
        }
      ],
      pageBreak: 'after'
    };
  }
  
  /**
   * Create table of contents
   */
  createTableOfContents() {
    return {
      toc: {
        title: { text: 'Table of Contents', style: 'header1' }
      },
      pageBreak: 'after'
    };
  }
  
  /**
   * Create executive summary content
   */
  createExecutiveSummary(resultsData, userConfig, vendors, chartImages) {
    // Add implementation for executive summary section
    // ...
    
    return {
      stack: [
        { text: 'Executive Summary', style: 'header1', tocItem: true },
        // Executive summary content
      ],
      pageBreak: 'after'
    };
  }
  
  /**
   * Create financial analysis content
   */
  createFinancialAnalysis(resultsData, userConfig, vendors, chartImages) {
    // Add implementation for financial analysis section
    // ...
    
    return {
      stack: [
        { text: 'Financial Analysis', style: 'header1', tocItem: true },
        // Financial analysis content
      ],
      pageBreak: 'after'
    };
  }
  
  /**
   * Create security analysis content
   */
  createSecurityAnalysis(resultsData, userConfig, vendors, chartImages) {
    // Add implementation for security analysis section
    // ...
    
    return {
      stack: [
        { text: 'Security & Compliance Analysis', style: 'header1', tocItem: true },
        // Security analysis content
      ],
      pageBreak: 'after'
    };
  }
  
  /**
   * Create technical analysis content
   */
  createTechnicalAnalysis(resultsData, userConfig, vendors, chartImages) {
    // Add implementation for technical analysis section
    // ...
    
    return {
      stack: [
        { text: 'Technical Comparison', style: 'header1', tocItem: true },
        // Technical analysis content
      ],
      pageBreak: 'after'
    };
  }
  
  /**
   * Create configuration details
   */
  createConfigurationDetails(userConfig) {
    // Add implementation for configuration details section
    // ...
    
    return {
      stack: [
        { text: 'Appendix: Configuration Details', style: 'header1', tocItem: true },
        // Configuration details content
      ]
    };
  }
  
  /**
   * Get document styles
   */
  getDocumentStyles() {
    return {
      title: {
        fontSize: 28,
        bold: true,
        color: '#1a5a96',
        alignment: 'center'
      },
      subtitle: {
        fontSize: 16,
        color: '#666666',
        alignment: 'center'
      },
      header1: {
        fontSize: 18,
        bold: true,
        color: '#1a5a96',
        margin: [0, 20, 0, 10]
      },
      header2: {
        fontSize: 14,
        bold: true,
        color: '#333333',
        margin: [0, 15, 0, 5]
      },
      header3: {
        fontSize: 12,
        bold: true,
        color: '#333333',
        margin: [0, 10, 0, 5]
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        color: '#ffffff',
        fillColor: '#1a5a96',
        alignment: 'center'
      },
      default: {
        fontSize: 10,
        color: '#333333'
      },
      tableCell: {
        fontSize: 10
      },
      highlightCell: {
        fontSize: 10,
        color: '#1a5a96',
        bold: true
      }
    };
  }
}

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EnhancedReportGenerator };
} else {
  // Global access
  window.EnhancedReportGenerator = EnhancedReportGenerator;
}
EOL
  
  # Create a new index.js file for main initialization
  cat > "$JS_DIR/index.js" << 'EOL'
/**
 * Main Entry Point for Portnox Total Cost Analyzer
 * Initializes the application with enhanced features
 */

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Portnox Total Cost Analyzer with enhancements...');
  
  // Initialize application
  if (window.App) {
    App.init();
    
    // Check and add dark mode support based on system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode && !localStorage.getItem('theme')) {
      document.body.classList.add('dark-mode');
      
      // Dispatch theme change event
      window.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme: 'dark' }
      }));
    }
    
    // Log initialization complete
    console.log('Portnox Total Cost Analyzer initialized successfully');
  } else {
    console.error('Application not found. Initialization failed.');
  }
});
EOL
  
  echo -e "${GREEN}Application enhancements finalized successfully!${NC}"
}

# Function to update imports in main HTML file
update_html_imports() {
  echo -e "${YELLOW}Updating HTML imports...${NC}"
  
  # Find index.html in root directory
  INDEX_FILE="$APP_ROOT/index.html"
  
  if [ ! -f "$INDEX_FILE" ]; then
    echo -e "${RED}Error: index.html not found!${NC}"
    return 1
  fi
  
  # Create a temporary file
  TMP_FILE=$(mktemp)
  
  # Add new CSS and JS imports
  sed '/<\/head>/i \
    <!-- Enhanced styling -->\
    <link rel="stylesheet" href="css/custom/enhanced-animations.css">\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.min.js"></script>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/pdfmake.min.js"></script>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/vfs_fonts.js"></script>' "$INDEX_FILE" > "$TMP_FILE"
  
  # Update body scripts
  sed '/<\/body>/i \
    <!-- Enhanced components -->\
    <script src="js/utils/enhanced-report-generator.js"></script>\
    <script src="js/index.js"></script>' "$TMP_FILE" > "$INDEX_FILE"
  
  # Remove temporary file
  rm "$TMP_FILE"
  
  echo -e "${GREEN}HTML imports updated successfully!${NC}"
}

# Main execution
main() {
  echo -e "\n${BLUE}Starting Portnox Total Cost Analyzer enhancement process...${NC}\n"
  
  # Create backup of original files
  backup_files
  
  # Enhance UI components
  enhance_ui
  
  # Enhance particle background for better visual effects
  enhance_particle_background
  
  # Enhance charts with improved visualizations
  enhance_charts
  
  # Update integration script
  update_integration
  
  # Finalize application with added features
  finalize_application
  
  # Update imports in HTML
  update_html_imports
  
  echo -e "\n${GREEN}==================================================${NC}"
  echo -e "${GREEN}  Portnox Total Cost Analyzer Enhancement Complete!  ${NC}"
  echo -e "${GREEN}==================================================${NC}"
  echo -e "${YELLOW}A backup of the original files was created in: ${BACKUP_DIR}${NC}\n"
  echo -e "${BLUE}The enhancements include:${NC}"
  echo -e " - Modern UI with improved colors and animations"
  echo -e " - Enhanced interactive charts with better data visualization"
  echo -e " - Improved sidebar with better vendor selection"
  echo -e " - Dynamic particle background effects"
  echo -e " - Enhanced report generation"
  echo -e " - Better theme support (light/dark mode)"
  echo -e " - Optimized performance and responsiveness\n"
  echo -e "${YELLOW}Refresh your browser to see the changes.${NC}\n"
}

# Execute main function
main

exit 0
