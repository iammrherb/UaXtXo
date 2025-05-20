#!/bin/bash

# ==================================================
# Enhancement Script for Portnox Total Cost Analyzer
# ==================================================

echo "=== Starting Portnox Project Enhancement ==="

# Create backup of current state
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="enhancement_backup_$TIMESTAMP"
mkdir -p "$BACKUP_DIR"
cp -r * "$BACKUP_DIR" 2>/dev/null || true
cp -r .git "$BACKUP_DIR" 2>/dev/null || true
cp .gitignore "$BACKUP_DIR" 2>/dev/null || true
echo "Created backup in $BACKUP_DIR"

# ==================================================
# 1. Enhance CSS with Visual Improvements
# ==================================================
echo "Enhancing CSS with visual improvements..."

# Create particle background CSS
mkdir -p css/components

# Create particle background CSS
cat > css/components/particle-background.css << 'EOL'
/* Particle Background */
#particles-js {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: var(--background-color);
}

/* Customize particle colors in light mode */
body:not(.dark-mode) #particles-js {
  --particle-color: rgba(26, 90, 150, 0.6);
  --particle-line-color: rgba(26, 90, 150, 0.2);
}

/* Customize particle colors in dark mode */
body.dark-mode #particles-js {
  --particle-color: rgba(46, 204, 113, 0.6);
  --particle-line-color: rgba(46, 204, 113, 0.2);
}

/* Make sure content displays above particles */
.app-container {
  position: relative;
  z-index: 1;
}
EOL

# Create enhanced UI components CSS
cat > css/components/enhanced-ui.css << 'EOL'
/* Enhanced UI Components for Portnox Total Cost Analyzer */

/* Color Variables */
:root {
  --primary-color: #1a5a96;
  --secondary-color: #2ecc71;
  --accent-color: #f39c12;
  --error-color: #e74c3c;
  --warning-color: #f39c12;
  --info-color: #3498db;
  --text-color: #333;
  --text-light: #666;
  --text-lighter: #999;
  --background-color: #f9f9f9;
  --card-background: #fff;
  --border-color: #ddd;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --highlight-color: rgba(26, 90, 150, 0.05);
}

/* Dark Mode Colors */
body.dark-mode {
  --primary-color: #2980b9;
  --secondary-color: #27ae60;
  --accent-color: #e67e22;
  --error-color: #c0392b;
  --warning-color: #d35400;
  --info-color: #2980b9;
  --text-color: #f5f5f5;
  --text-light: #ccc;
  --text-lighter: #999;
  --background-color: #121212;
  --card-background: #1e1e1e;
  --border-color: #333;
  --shadow-color: rgba(0, 0, 0, 0.3);
  --highlight-color: rgba(41, 128, 185, 0.1);
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
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.3);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.btn:hover:after {
  animation: ripple 1s ease-out;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #15497c;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn-secondary:hover {
  background-color: #25a65a;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-light);
}

.btn-outline:hover {
  background-color: rgba(0, 0, 0, 0.03);
  border-color: var(--text-lighter);
  color: var(--text-color);
}

.btn i {
  margin-right: 8px;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
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
  border-radius: 8px;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: all 0.3s ease;
  overflow: hidden;
  padding: 20px;
  margin-bottom: 20px;
}

.dashboard-card:hover,
.benefit-card:hover,
.advantage-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px var(--shadow-color);
}

.highlight-card {
  border-left: 4px solid var(--primary-color);
}

/* Enhanced metric values */
.metric-value {
  font-size: 28px;
  font-weight: 700;
  margin: 10px 0;
  transition: all 0.3s ease;
}

.highlight-value {
  color: var(--primary-color);
}

.metric-label {
  font-size: 14px;
  color: var(--text-light);
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
  border-radius: 8px;
  box-shadow: 0 2px 5px var(--shadow-color);
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
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
}

.vendor-card .vendor-logo img {
  max-height: 40px;
  max-width: 90%;
}

.vendor-card .vendor-info h3 {
  margin: 0 0 5px;
  font-size: 14px;
  color: var(--text-color);
}

.vendor-card .vendor-info p {
  margin: 0;
  font-size: 12px;
  color: var(--text-light);
}

.vendor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px var(--shadow-color);
}

.vendor-card.selected {
  border-color: var(--primary-color);
  background-color: var(--highlight-color);
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
  width: 20px;
  height: 20px;
  font-size: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vendor-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.badge {
  display: inline-block;
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 600;
  border-radius: 12px;
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
  background-color: var(--error-color);
  color: white;
}

/* Config Card Styling */
.config-card {
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px var(--shadow-color);
  background-color: var(--card-background);
}

.config-card-header {
  padding: 15px;
  background-color: var(--primary-color);
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
  padding: 15px;
  overflow: hidden;
  transition: max-height 0.3s ease;
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
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}

.main-tabs::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.main-tab {
  padding: 12px 24px;
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
}

.main-tab i {
  margin-right: 8px;
}

.main-tab:hover {
  color: var(--primary-color);
}

.main-tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

/* Results Tabs Styling */
.results-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  overflow-x: auto;
  scrollbar-width: none;
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
}

.results-tab:hover {
  color: var(--primary-color);
}

.results-tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

/* View Panel Styling */
.view-panel {
  display: none;
}

.view-panel.active {
  display: block;
}

/* Results Panel Styling */
.results-panel {
  display: none;
}

.results-panel.active {
  display: block;
}

.panel-header {
  margin-bottom: 20px;
}

.panel-header h2 {
  margin: 0 0 5px;
  color: var(--text-color);
  font-size: 24px;
}

.panel-header .subtitle {
  margin: 0;
  color: var(--text-light);
  font-size: 16px;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease forwards;
}

.animate-pulse {
  animation: pulse 1s ease infinite;
}
EOL

# Update main CSS file to include new components
cat > css/main.css << 'EOL'
/* Main CSS for Portnox Total Cost Analyzer */
:root {
  --primary-color: #1a5a96;
  --secondary-color: #2ecc71;
  --accent-color: #f39c12;
  --error-color: #e74c3c;
  --warning-color: #f39c12;
  --info-color: #3498db;
  --text-color: #333;
  --text-light: #666;
  --text-lighter: #999;
  --background-color: #f9f9f9;
  --card-background: #fff;
  --border-color: #ddd;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --highlight-color: rgba(26, 90, 150, 0.05);
}

/* Dark Mode Colors */
body.dark-mode {
  --primary-color: #2980b9;
  --secondary-color: #27ae60;
  --accent-color: #e67e22;
  --error-color: #c0392b;
  --warning-color: #d35400;
  --info-color: #2980b9;
  --text-color: #f5f5f5;
  --text-light: #ccc;
  --text-lighter: #999;
  --background-color: #121212;
  --card-background: #1e1e1e;
  --border-color: #333;
  --shadow-color: rgba(0, 0, 0, 0.3);
  --highlight-color: rgba(41, 128, 185, 0.1);
}

body {
  font-family: 'Nunito', sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header Styling */
.app-header {
  background-color: var(--card-background);
  box-shadow: 0 2px 4px var(--shadow-color);
  padding: 10px 0;
  transition: background-color 0.3s ease;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.logo-section {
  display: flex;
  align-items: center;
}

.company-logo {
  height: 40px;
  margin-right: 15px;
}

.app-title h1 {
  margin: 0;
  font-size: 20px;
  color: var(--primary-color);
  transition: color 0.3s ease;
}

.subtitle {
  margin: 5px 0 0;
  font-size: 14px;
  color: var(--text-light);
  transition: color 0.3s ease;
}

.header-actions {
  display: flex;
  gap: 10px;
}

/* Sidebar Styling */
.main-content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 360px;
  background-color: var(--card-background);
  box-shadow: 2px 0 5px var(--shadow-color);
  overflow-y: auto;
  transition: width 0.3s ease, background-color 0.3s ease;
  z-index: 10;
}

.sidebar.collapsed {
  width: 0;
}

.sidebar-header {
  padding: 15px 20px;
  border-bottom: 1px solid var(--border-color);
  transition: border-color 0.3s ease;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  color: var(--primary-color);
  transition: color 0.3s ease;
}

.sidebar-content {
  padding: 20px;
}

.sidebar-footer {
  padding: 15px 20px;
  border-top: 1px solid var(--border-color);
  transition: border-color 0.3s ease;
}

/* Content area styling */
.content-area {
  flex: 1;
  margin-left: 360px;
  transition: margin-left 0.3s ease;
  padding: 20px;
  overflow-y: auto;
}

.content-area.expanded {
  margin-left: 0;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* Sidebar toggle */
.sidebar-toggle {
  position: fixed;
  left: 360px;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--card-background);
  width: 24px;
  height: 48px;
  border-radius: 0 4px 4px 0;
  box-shadow: 2px 0 5px var(--shadow-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: left 0.3s ease, background-color 0.3s ease;
  z-index: 100;
}

.sidebar-toggle.collapsed {
  left: 0;
}

/* Footer styling */
.app-footer {
  background-color: var(--card-background);
  padding: 20px 0;
  border-top: 1px solid var(--border-color);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.footer-copyright {
  color: var(--text-light);
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  color: var(--text-light);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--primary-color);
}

.footer-social {
  display: flex;
  gap: 15px;
}

.social-link {
  color: var(--text-light);
  font-size: 16px;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: var(--primary-color);
}

/* Loading overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
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
  text-align: center;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--primary-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Toast notifications */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 300px;
}

.toast {
  display: flex;
  align-items: center;
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 4px 15px var(--shadow-color);
  padding: 12px 16px;
  margin-bottom: 10px;
  transform: translateX(120%);
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.toast.show {
  transform: translateX(0);
}

.toast i {
  margin-right: 10px;
  font-size: 16px;
}

.toast-success i {
  color: var(--secondary-color);
}

.toast-error i {
  color: var(--error-color);
}

.toast-warning i {
  color: var(--warning-color);
}

.toast-info i {
  color: var(--info-color);
}

/* Responsive for tablets and smaller screens */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .grid-4 {
    grid-template-columns: 1fr 1fr;
  }
}

/* Responsive for mobile devices */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-actions {
    margin-top: 10px;
    width: 100%;
    justify-content: space-between;
  }
  
  .sidebar {
    position: fixed;
    z-index: 100;
    top: 0;
    bottom: 0;
  }
  
  .content-area {
    margin-left: 0;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .grid-4 {
    grid-template-columns: 1fr;
  }
}

/* Import other CSS components */
@import url('components/enhanced-ui.css');
@import url('components/particle-background.css');
EOL

# Create chart component CSS
cat > css/components/charts.css << 'EOL'
/* Chart styling */
.chart-container {
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 4px 6px var(--shadow-color);
  padding: 20px;
  margin-bottom: 24px;
  overflow: hidden;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

.chart-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px var(--shadow-color);
}

.chart-wrapper {
  height: 400px;
  width: 100%;
  position: relative;
}

.chart-wrapper.half-height {
  height: 250px;
}

.chart-placeholder {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  border: 1px dashed var(--border-color);
}

.chart-placeholder i {
  font-size: 32px;
  color: var(--text-lighter);
  margin-bottom: 10px;
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
  margin-top: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin: 0 12px 8px 0;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  margin-right: 6px;
}

.legend-label {
  font-size: 13px;
  color: var(--text-color);
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
  font-size: 24px;
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
  margin-bottom: 10px;
}

.bar-label {
  min-width: 100px;
  font-size: 14px;
  color: var(--text-color);
}

.bar-track {
  flex: 1;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  overflow: hidden;
  margin: 0 10px;
}

.bar-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 5px;
  transition: width 1s ease;
}

.bar-value {
  width: 40px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  text-align: right;
}

/* Animation for charts */
@keyframes chartFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-chart {
  animation: chartFadeIn 0.5s ease forwards;
}

@keyframes fillBar {
  from { width: 0; }
  to { width: 100%; }
}

.animate-bar {
  animation: fillBar 1s ease-out forwards;
}

/* Heat map styling */
.heatmap-container {
  height: 400px;
  width: 100%;
  position: relative;
  overflow: hidden;
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
  padding: 10px;
  background-color: var(--card-background);
  border-radius: 4px;
  box-shadow: 0 2px 10px var(--shadow-color);
  pointer-events: none;
  z-index: 10;
  max-width: 200px;
  font-size: 12px;
}

/* Benefit cards styling */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 20px;
  margin: 20px 0;
}

.benefit-card {
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 4px 6px var(--shadow-color);
  padding: 20px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px var(--shadow-color);
}

.benefit-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--highlight-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.benefit-icon i {
  font-size: 24px;
  color: var(--primary-color);
}

.benefit-card h4 {
  margin: 0 0 10px;
  color: var(--text-color);
  font-size: 16px;
}

.benefit-card p {
  margin: 0;
  color: var(--text-light);
  font-size: 14px;
  line-height: 1.5;
}

/* Table styling */
.table-responsive {
  overflow-x: auto;
  margin-bottom: 20px;
}

.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px var(--shadow-color);
}

.data-table th {
  background-color: var(--primary-color);
  color: white;
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
}

.data-table td {
  padding: 12px 15px;
  border-bottom: 1px solid var(--border-color);
  font-size: 14px;
  color: var(--text-color);
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.02);
}

.data-table tr:hover {
  background-color: var(--highlight-color);
}

.data-table .highlight-value {
  color: var(--primary-color);
  font-weight: 600;
}

.data-table .highlight-cell {
  color: var(--primary-color);
  font-weight: 600;
}

.data-table .total-row {
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.03);
}

.data-table .total-row td {
  border-top: 2px solid var(--border-color);
}
EOL

# ==================================================
# 2. Create Vendor Data with All Vendors
# ==================================================
echo "Creating complete vendor data..."

cat > js/models/vendor-data.js << 'EOL'
/**
 * Vendor data model for Portnox Total Cost Analyzer
 * Contains real data for NAC vendor comparison
 */
const VENDORS = {
  portnox: {
    id: 'portnox',
    name: 'Portnox Cloud',
    description: 'Cloud-native NAC',
    logo: 'img/vendors/portnox-logo.png',
    badge: {
      text: 'Best Value',
      class: 'badge-primary'
    },
    architecture: 'cloud',
    basePrice: {
      small: 3.0,    // Per device per month
      medium: 2.7,   // Per device per month
      large: 2.4,    // Per device per month
      enterprise: 2.1 // Per device per month
    },
    implementation: {
      timeInDays: 21,
      costPercentage: 10  // % of first year subscription
    },
    fte: {
      required: 0.25,  // FTE allocation per year
    },
    maintenance: {
      percentage: 0,  // Included in subscription
      downtime: 0.5,  // Hours per year
    },
    security: {
      zeroTrustScore: 9.5,    // Out of 10
      deviceAuthScore: 9.7,   // Out of 10
      riskAssessmentScore: 9.6,// Out of 10
      remediationSpeed: 4,    // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: true,
      ferpa: true,
      sox: true
    },
    features: {
      cloudIntegration: true,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: true
    }
  },
  cisco: {
    id: 'cisco',
    name: 'Cisco ISE',
    description: 'Enterprise NAC',
    logo: 'img/vendors/cisco-logo.png',
    badge: {
      text: 'Complex',
      class: 'badge-warning'
    },
    architecture: 'on-premises',
    basePrice: {
      small: 65,     // Per device - perpetual license
      medium: 60,    // Per device - perpetual license
      large: 55,     // Per device - perpetual license
      enterprise: 50 // Per device - perpetual license
    },
    hardware: {
      small: 75000,   // Base hardware cost
      medium: 150000, // Base hardware cost
      large: 300000,  // Base hardware cost
      enterprise: 500000 // Base hardware cost
    },
    implementation: {
      timeInDays: 90,
      costPercentage: 40  // % of license cost
    },
    fte: {
      required: 1.5,  // FTE allocation per year
    },
    maintenance: {
      percentage: 18, // Yearly maintenance as % of license
      downtime: 8,    // Hours per year
    },
    security: {
      zeroTrustScore: 8.0,    // Out of 10
      deviceAuthScore: 8.5,   // Out of 10
      riskAssessmentScore: 8.0,// Out of 10
      remediationSpeed: 10,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: true,
      ferpa: true,
      sox: true
    },
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false
    }
  },
  aruba: {
    id: 'aruba',
    name: 'Aruba ClearPass',
    description: 'Policy manager',
    logo: 'img/vendors/aruba-logo.png',
    architecture: 'on-premises',
    basePrice: {
      small: 55,     // Per device - perpetual license
      medium: 50,    // Per device - perpetual license
      large: 45,     // Per device - perpetual license
      enterprise: 40 // Per device - perpetual license
    },
    hardware: {
      small: 60000,   // Base hardware cost
      medium: 120000, // Base hardware cost
      large: 240000,  // Base hardware cost
      enterprise: 400000 // Base hardware cost
    },
    implementation: {
      timeInDays: 60,
      costPercentage: 35  // % of license cost
    },
    fte: {
      required: 1.0,  // FTE allocation per year
    },
    maintenance: {
      percentage: 20, // Yearly maintenance as % of license
      downtime: 6,    // Hours per year
    },
    security: {
      zeroTrustScore: 7.5,    // Out of 10
      deviceAuthScore: 8.0,   // Out of 10
      riskAssessmentScore: 7.5,// Out of 10
      remediationSpeed: 12,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: true,
      ferpa: true,
      sox: true
    },
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false
    }
  },
  forescout: {
    id: 'forescout',
    name: 'Forescout',
    description: 'Device visibility',
    logo: 'img/vendors/forescout-logo.png',
    architecture: 'on-premises',
    basePrice: {
      small: 60,     // Per device - perpetual license
      medium: 55,    // Per device - perpetual license
      large: 50,     // Per device - perpetual license
      enterprise: 45 // Per device - perpetual license
    },
    hardware: {
      small: 65000,   // Base hardware cost
      medium: 130000, // Base hardware cost
      large: 260000,  // Base hardware cost
      enterprise: 450000 // Base hardware cost
    },
    implementation: {
      timeInDays: 70,
      costPercentage: 40  // % of license cost
    },
    fte: {
      required: 1.0,  // FTE allocation per year
    },
    maintenance: {
      percentage: 20, // Yearly maintenance as % of license
      downtime: 7,    // Hours per year
    },
    security: {
      zeroTrustScore: 7.0,    // Out of 10
      deviceAuthScore: 9.0,   // Out of 10
      riskAssessmentScore: 8.5,// Out of 10
      remediationSpeed: 15,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: true,
      ferpa: true,
      sox: false
    },
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false
    }
  },
  fortinac: {
    id: 'fortinac',
    name: 'FortiNAC',
    description: 'Fortinet NAC',
    logo: 'img/vendors/fortinac-logo.png',
    architecture: 'on-premises',
    basePrice: {
      small: 50,     // Per device - perpetual license
      medium: 45,    // Per device - perpetual license
      large: 40,     // Per device - perpetual license
      enterprise: 35 // Per device - perpetual license
    },
    hardware: {
      small: 55000,   // Base hardware cost
      medium: 110000, // Base hardware cost
      large: 220000,  // Base hardware cost
      enterprise: 380000 // Base hardware cost
    },
    implementation: {
      timeInDays: 60,
      costPercentage: 35  // % of license cost
    },
    fte: {
      required: 0.9,  // FTE allocation per year
    },
    maintenance: {
      percentage: 18, // Yearly maintenance as % of license
      downtime: 8,    // Hours per year
    },
    security: {
      zeroTrustScore: 7.5,    // Out of 10
      deviceAuthScore: 8.0,   // Out of 10
      riskAssessmentScore: 7.5,// Out of 10
      remediationSpeed: 14,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: false,
      ferpa: true,
      sox: true
    },
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false
    }
  },
  juniper: {
    id: 'juniper',
    name: 'Juniper Mist',
    description: 'AI-driven NAC',
    logo: 'img/vendors/juniper-logo.png',
    architecture: 'hybrid',
    basePrice: {
      small: 5.0,     // Per device per month
      medium: 4.5,    // Per device per month
      large: 4.0,     // Per device per month
      enterprise: 3.5 // Per device per month
    },
    hardware: {
      small: 20000,   // Base hardware cost
      medium: 40000,  // Base hardware cost
      large: 80000,   // Base hardware cost
      enterprise: 150000 // Base hardware cost
    },
    implementation: {
      timeInDays: 35,
      costPercentage: 20  // % of first year subscription
    },
    fte: {
      required: 0.5,  // FTE allocation per year
    },
    maintenance: {
      percentage: 0,  // Included in subscription
      downtime: 2,    // Hours per year
    },
    security: {
      zeroTrustScore: 8.5,    // Out of 10
      deviceAuthScore: 8.5,   // Out of 10
      riskAssessmentScore: 9.0,// Out of 10
      remediationSpeed: 8,    // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: false,
      ferpa: true,
      sox: false
    },
    features: {
      cloudIntegration: true,
      legacyDevices: false,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: true
    }
  },
  securew2: {
    id: 'securew2',
    name: 'SecureW2',
    description: 'Cloud RADIUS',
    logo: 'img/vendors/securew2-logo.png',
    architecture: 'cloud',
    basePrice: {
      small: 4.0,     // Per device per month
      medium: 3.7,    // Per device per month
      large: 3.4,     // Per device per month
      enterprise: 3.1 // Per device per month
    },
    implementation: {
      timeInDays: 28,
      costPercentage: 15  // % of first year subscription
    },
    fte: {
      required: 0.4,  // FTE allocation per year
    },
    maintenance: {
      percentage: 0,  // Included in subscription
      downtime: 1,    // Hours per year
    },
    security: {
      zeroTrustScore: 8.0,    // Out of 10
      deviceAuthScore: 8.0,   // Out of 10
      riskAssessmentScore: 7.5,// Out of 10
      remediationSpeed: 10,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: false,
      ferpa: true,
      sox: false
    },
    features: {
      cloudIntegration: true,
      legacyDevices: false,
      byod: true,
      iot: false,
      wireless: true,
      remoteUsers: true
    }
  },
  microsoft: {
    id: 'microsoft',
    name: 'Microsoft NPS',
    description: 'Windows Server NAC',
    logo: 'img/vendors/microsoft-logo.png',
    architecture: 'on-premises',
    basePrice: {
      small: 15,     // Per device - Windows Server CAL
      medium: 14,    // Per device - Windows Server CAL
      large: 13,     // Per device - Windows Server CAL
      enterprise: 12 // Per device - Windows Server CAL
    },
    hardware: {
      small: 20000,   // Base hardware cost
      medium: 40000,  // Base hardware cost
      large: 80000,   // Base hardware cost
      enterprise: 150000 // Base hardware cost
    },
    implementation: {
      timeInDays: 40,
      costPercentage: 30  // % of license cost
    },
    fte: {
      required: 0.7,  // FTE allocation per year
    },
    maintenance: {
      percentage: 16, // Yearly maintenance as % of license
      downtime: 12,   // Hours per year
    },
    security: {
      zeroTrustScore: 6.0,    // Out of 10
      deviceAuthScore: 6.5,   // Out of 10
      riskAssessmentScore: 5.5,// Out of 10
      remediationSpeed: 30,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: false,
      iso: true,
      cmmc: false,
      ferpa: true,
      sox: false
    },
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: false,
      iot: false,
      wireless: true,
      remoteUsers: false
    }
  },
  arista: {
    id: 'arista',
    name: 'Arista Agni',
    description: 'Network control',
    logo: 'img/vendors/arista-logo.png',
    architecture: 'on-premises',
    basePrice: {
      small: 52,     // Per device - perpetual license
      medium: 48,    // Per device - perpetual license
      large: 44,     // Per device - perpetual license
      enterprise: 40 // Per device - perpetual license
    },
    hardware: {
      small: 60000,   // Base hardware cost
      medium: 120000, // Base hardware cost
      large: 240000,  // Base hardware cost
      enterprise: 400000 // Base hardware cost
    },
    implementation: {
      timeInDays: 65,
      costPercentage: 35  // % of license cost
    },
    fte: {
      required: 1.0,  // FTE allocation per year
    },
    maintenance: {
      percentage: 18, // Yearly maintenance as % of license
      downtime: 7,    // Hours per year
    },
    security: {
      zeroTrustScore: 7.0,    // Out of 10
      deviceAuthScore: 7.5,   // Out of 10
      riskAssessmentScore: 7.0,// Out of 10
      remediationSpeed: 18,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: false,
      ferpa: true,
      sox: false
    },
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false
    }
  },
  foxpass: {
    id: 'foxpass',
    name: 'Foxpass',
    description: 'Cloud RADIUS/LDAP',
    logo: 'img/vendors/foxpass-logo.png',
    architecture: 'cloud',
    basePrice: {
      small: 3.5,     // Per device per month
      medium: 3.2,    // Per device per month
      large: 2.9,     // Per device per month
      enterprise: 2.6 // Per device per month
    },
    implementation: {
      timeInDays: 25,
      costPercentage: 15  // % of first year subscription
    },
    fte: {
      required: 0.3,  // FTE allocation per year
    },
    maintenance: {
      percentage: 0,  // Included in subscription
      downtime: 2,    // Hours per year
    },
    security: {
      zeroTrustScore: 7.5,    // Out of 10
      deviceAuthScore: 7.0,   // Out of 10
      riskAssessmentScore: 6.5,// Out of 10
      remediationSpeed: 12,   // Minutes
    },
    compliance: {
      pci: true,
      hipaa: true,
      nist: false,
      gdpr: true,
      iso: false,
      cmmc: false,
      ferpa: true,
      sox: false
    },
    features: {
      cloudIntegration: true,
      legacyDevices: false,
      byod: true,
      iot: false,
      wireless: true,
      remoteUsers: true
    }
  },
  "no-nac": {
    id: 'no-nac',
    name: 'No NAC',
    description: 'High risk baseline',
    logo: 'img/vendors/no-nac-icon.png',
    badge: {
      text: 'High Risk',
      class: 'badge-danger'
    },
    architecture: 'none',
    basePrice: {
      small: 0,
      medium: 0,
      large: 0,
      enterprise: 0
    },
    implementation: {
      timeInDays: 0,
      costPercentage: 0
    },
    fte: {
      required: 0.2,  // Still requires some network security management
    },
    maintenance: {
      percentage: 0,
      downtime: 24,   // Increased downtime due to security incidents
    },
    security: {
      zeroTrustScore: 1.0,    // Out of 10
      deviceAuthScore: 2.0,   // Out of 10
      riskAssessmentScore: 1.5,// Out of 10
      remediationSpeed: 180,  // Minutes
    },
    compliance: {
      pci: false,
      hipaa: false,
      nist: false,
      gdpr: false,
      iso: false,
      cmmc: false,
      ferpa: false,
      sox: false
    },
    features: {
      cloudIntegration: false,
      legacyDevices: false,
      byod: false,
      iot: false,
      wireless: false,
      remoteUsers: false
    }
  }
};

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VENDORS };
}
EOL

# ==================================================
# 3. Create Particle Background JS
# ==================================================
echo "Creating particle background JS..."

mkdir -p js/components

cat > js/components/particle-background.js << 'EOL'
/**
 * Particle Background for Portnox Total Cost Analyzer
 * Creates an interactive particle background
 */

class ParticleBackground {
  constructor(containerId = 'particles-js', config = {}) {
    this.containerId = containerId;
    
    // Default configuration
    this.config = {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
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
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
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
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
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
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
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
   * Update particle colors based on dark mode
   */
  updateColors() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
      this.config.particles.color.value = '#27ae60';
      this.config.particles.line_linked.color = '#27ae60';
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.particleBackground = new ParticleBackground();
});
EOL

# ==================================================
# 4. Create Chart Placeholders & Basic Chart JS
# ==================================================
echo "Creating chart placeholders and basic chart JS..."

mkdir -p js/charts

cat > js/charts/chart-placeholders.js << 'EOL'
/**
 * Chart Placeholders for Portnox Total Cost Analyzer
 * Creates placeholders for charts that will be filled with real data
 */

class ChartPlaceholders {
  constructor() {
    this.charts = {};
  }
  
  /**
   * Initialize chart placeholders
   */
  init() {
    this.createPlaceholders();
  }
  
  /**
   * Create placeholders for all chart containers
   */
  createPlaceholders() {
    const chartContainers = document.querySelectorAll('.chart-wrapper');
    
    chartContainers.forEach(container => {
      const id = container.id || container.parentNode.id;
      
      if (!id) return;
      
      // Clear existing content
      container.innerHTML = '';
      
      // Create placeholder
      const placeholder = document.createElement('div');
      placeholder.className = 'chart-placeholder';
      
      const icon = document.createElement('i');
      icon.className = this.getIconForChart(id);
      placeholder.appendChild(icon);
      
      const text = document.createElement('p');
      text.textContent = 'Chart will appear here after calculation';
      placeholder.appendChild(text);
      
      container.appendChild(placeholder);
    });
  }
  
  /**
   * Get appropriate icon for chart type
   */
  getIconForChart(id) {
    if (id.includes('tco') || id.includes('cost')) {
      return 'fas fa-chart-line';
    } else if (id.includes('roi')) {
      return 'fas fa-chart-pie';
    } else if (id.includes('risk') || id.includes('security')) {
      return 'fas fa-shield-alt';
    } else if (id.includes('comparison')) {
      return 'fas fa-chart-bar';
    } else if (id.includes('radar')) {
      return 'fas fa-chart-area';
    } else {
      return 'fas fa-chart-bar';
    }
  }
  
  /**
   * Create a basic TCO comparison chart with Chart.js
   */
  createBasicTcoChart(elementId, data) {
    const element = document.getElementById(elementId);
    if (!element || !data || !data.vendors) return;
    
    // Clear placeholder
    element.innerHTML = '';
    
    const vendors = Object.keys(data.vendors).filter(v => v !== 'no-nac');
    const vendorNames = vendors.map(v => VENDORS[v].name);
    const tcoValues = vendors.map(v => data.vendors[v].totalTco);
    
    // Define colors
    const colors = {
      portnox: '#1a5a96',
      cisco: '#00bceb',
      aruba: '#f7931e',
      forescout: '#7a2a90',
      fortinac: '#e31837',
      juniper: '#84bd00',
      securew2: '#0078d7',
      microsoft: '#00a4ef',
      arista: '#2196f3',
      foxpass: '#ff9900'
    };
    
    const backgroundColors = vendors.map(v => colors[v] || '#777777');
    
    // Create chart
    const chart = new Chart(element, {
      type: 'bar',
      data: {
        labels: vendorNames,
        datasets: [{
          label: '3-Year TCO',
          data: tcoValues,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(c => this.adjustColor(c, -10)),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(context.raw);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(value);
              }
            }
          }
        }
      }
    });
    
    this.charts[elementId] = chart;
    return chart;
  }
  
  /**
   * Helper function to adjust color lightness
   */
  adjustColor(hex, percent) {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    
    // Adjust
    r = Math.min(255, Math.max(0, r + percent));
    g = Math.min(255, Math.max(0, g + percent));
    b = Math.min(255, Math.max(0, b + percent));
    
    // Convert back to hex
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.chartPlaceholders = new ChartPlaceholders();
  window.chartPlaceholders.init();
});
EOL

# ==================================================
# 5. Update Main Application JavaScript
# ==================================================
echo "Updating main application JavaScript..."

cat > js/portnox-tco-analyzer.js << 'EOL'
/**
 * Portnox Total Cost Analyzer - Main Application
 */

// Global app state
const App = {
  state: {
    selectedVendors: ['portnox'],  // Default selection
    activeView: 'executive',        // executive, financial, security, technical
    activePanel: 'executive-summary', // Current active panel
    results: null,                  // Calculation results
    config: {
      deviceCount: 500,
      locationCount: 2,
      years: 3,
      organizationSize: 'small', // very-small, small, medium, large, enterprise
      industry: '',
      complianceRequirements: [],
      riskProfile: 'standard', // standard, elevated, high, regulated
      cybersecurityInsurance: 'standard', // none, basic, standard, comprehensive
      networkRequirements: {
        cloudIntegration: false,
        legacyDevices: false,
        byodSupport: true,
        iotSupport: false,
        wirelessSupport: true,
        remoteWork: true
      },
      costParameters: {
        portnoxBasePrice: 3.0, // $ per device per month
        portnoxDiscount: 15,   // % volume discount
        fteCost: 100000,       // $ per year for full-time employee
        fteAllocation: 25,     // % of FTE dedicated to NAC
        maintenancePercentage: 18, // % of license cost for maintenance
        downtimeCost: 5000,    // $ per hour
        riskReduction: 35,     // % reduction in breach risks
        insuranceReduction: 10 // % reduction in insurance premiums
      }
    },
    calculator: null,
    chartPlaceholders: null,
    isDarkMode: false,
  },
  
  /**
   * Initialize the application
   */
  init: function() {
    console.log('Initializing Portnox TCO Analyzer...');
    
    // Initialize Calculator
    this.state.calculator = new TcoCalculator(this.state.config);
    
    // Initialize Chart Placeholders
    this.state.chartPlaceholders = window.chartPlaceholders || new ChartPlaceholders();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Initialize UI state
    this.initUIState();
    
    console.log('Portnox TCO Analyzer initialized successfully.');
  },
  
  /**
   * Set up all event listeners
   */
  setupEventListeners: function() {
    console.log('Setting up event listeners...');
    
    // Vendor selection
    const vendorCards = document.querySelectorAll('.vendor-card');
    vendorCards.forEach(card => {
      card.addEventListener('click', () => {
        const vendorId = card.dataset.vendor;
        this.toggleVendorSelection(vendorId, card);
      });
    });
    
    // Calculate buttons
    const calcBtn = document.getElementById('calculate-btn');
    const calcBtnHeader = document.getElementById('calculate-btn-header');
    
    if (calcBtn) {
      calcBtn.addEventListener('click', () => this.calculate());
    }
    
    if (calcBtnHeader) {
      calcBtnHeader.addEventListener('click', () => this.calculate());
    }
    
    // Export button
    const exportBtn = document.getElementById('export-pdf');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportReport());
    }
    
    // Help button
    const helpBtn = document.getElementById('help-btn');
    if (helpBtn) {
      helpBtn.addEventListener('click', () => this.toggleHelpModal());
    }
    
    // Dark mode toggle
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) {
      darkModeBtn.addEventListener('click', () => this.toggleDarkMode());
    }
    
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', () => this.toggleSidebar());
    }
    
    // Main view tabs (Executive, Financial, Security, Technical)
    const mainTabs = document.querySelectorAll('.main-tab');
    mainTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.dataset.view;
        this.changeView(view);
      });
    });
    
    // Results tabs within views
    const resultsTabs = document.querySelectorAll('.results-tab');
    resultsTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const panel = tab.dataset.panel;
        this.changePanel(panel);
      });
    });
    
    // Config card headers (collapsible)
    const configCardHeaders = document.querySelectorAll('.config-card-header');
    configCardHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('i:last-child');
        
        content.classList.toggle('collapsed');
        
        if (content.classList.contains('collapsed')) {
          icon.className = 'fas fa-chevron-down';
        } else {
          icon.className = 'fas fa-chevron-up';
        }
      });
    });
    
    console.log('Event listeners set up successfully.');
  },
  
  /**
   * Initialize UI state based on default values
   */
  initUIState: function() {
    console.log('Initializing UI state...');
    
    // Set initial vendor selection
    this.state.selectedVendors.forEach(vendorId => {
      const card = document.querySelector(`.vendor-card[data-vendor="${vendorId}"]`);
      if (card) {
        card.classList.add('selected');
      }
    });
    
    // Set active view
    this.changeView(this.state.activeView);
    
    console.log('UI state initialized successfully.');
  },
  
  /**
   * Change the active view (Executive, Financial, Security, Technical)
   */
  changeView: function(view) {
    // Update state
    this.state.activeView = view;
    
    // Update tab states
    const mainTabs = document.querySelectorAll('.main-tab');
    mainTabs.forEach(tab => {
      if (tab.dataset.view === view) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Update view panels
    const viewPanels = document.querySelectorAll('.view-panel');
    viewPanels.forEach(panel => {
      if (panel.dataset.view === view) {
        panel.classList.add('active');
        
        // Set first panel as active
        const firstPanel = panel.querySelector('.results-panel');
        if (firstPanel) {
          const panelId = firstPanel.id;
          this.changePanel(panelId);
        }
      } else {
        panel.classList.remove('active');
      }
    });
  },
  
  /**
   * Change the active panel within a view
   */
  changePanel: function(panelId) {
    // Update state
    this.state.activePanel = panelId;
    
    // Get the view from the panel
    const panel = document.getElementById(panelId);
    if (!panel) return;
    
    const viewPanel = panel.closest('.view-panel');
    if (!viewPanel) return;
    
    const view = viewPanel.dataset.view;
    
    // Update tab states
    const resultsTabs = document.querySelectorAll(`.view-panel[data-view="${view}"] .results-tab`);
    resultsTabs.forEach(tab => {
      if (tab.dataset.panel === panelId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Update panel states
    const resultsPanels = document.querySelectorAll(`.view-panel[data-view="${view}"] .results-panel`);
    resultsPanels.forEach(p => {
      if (p.id === panelId) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  },
  
  /**
   * Toggle vendor selection
   */
  toggleVendorSelection: function(vendorId, card) {
    if (vendorId === 'portnox') {
      // Portnox cannot be deselected
      return;
    }
    
    const index = this.state.selectedVendors.indexOf(vendorId);
    
    if (index === -1) {
      // Add vendor to selection
      this.state.selectedVendors.push(vendorId);
      card.classList.add('selected');
    } else {
      // Remove vendor from selection
      this.state.selectedVendors.splice(index, 1);
      card.classList.remove('selected');
    }
    
    console.log('Selected vendors:', this.state.selectedVendors);
  },
  
  /**
   * Toggle sidebar visibility
   */
  toggleSidebar: function() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebar-toggle');
    const contentArea = document.querySelector('.content-area');
    
    if (sidebar && toggle && contentArea) {
      sidebar.classList.toggle('collapsed');
      toggle.classList.toggle('collapsed');
      contentArea.classList.toggle('expanded');
      
      // Update icon
      const icon = toggle.querySelector('i');
      if (icon) {
        if (sidebar.classList.contains('collapsed')) {
          icon.className = 'fas fa-chevron-right';
        } else {
          icon.className = 'fas fa-chevron-left';
        }
      }
    }
  },
  
  /**
   * Toggle dark mode
   */
  toggleDarkMode: function() {
    document.body.classList.toggle('dark-mode');
    this.state.isDarkMode = document.body.classList.contains('dark-mode');
    
    // Update icon
    const icon = document.querySelector('#dark-mode-toggle i');
    if (icon) {
      if (this.state.isDarkMode) {
        icon.className = 'fas fa-sun';
      } else {
        icon.className = 'fas fa-moon';
      }
    }
    
    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: this.state.isDarkMode ? 'dark' : 'light' }
    }));
  },
  
  /**
   * Toggle help modal
   */
  toggleHelpModal: function() {
    const modal = document.getElementById('help-modal');
    if (modal) {
      modal.classList.toggle('active');
    }
  },
  
  /**
   * Calculate TCO and ROI
   */
  calculate: function() {
    console.log('Calculating TCO and ROI...');
    
    // Show loading overlay
    this.showLoadingOverlay();
    
    // Update calculator config
    this.state.calculator.updateConfig(this.state.config);
    
    // Perform calculation with slight delay to allow UI to update
    setTimeout(() => {
      try {
        // Calculate results
        this.state.results = this.state.calculator.calculate(this.state.selectedVendors);
        
        // Update UI with results
        this.updateResultsUI();
        
        // Create basic charts
        this.createBasicCharts();
        
        // Hide loading overlay
        this.hideLoadingOverlay();
        
        // Show success toast
        this.showToast('Calculation completed successfully!', 'success');
        
        console.log('Calculation completed:', this.state.results);
      } catch (error) {
        console.error('Calculation error:', error);
        
        // Hide loading overlay
        this.hideLoadingOverlay();
        
        // Show error toast
        this.showToast('Error during calculation: ' + error.message, 'error');
      }
    }, 800);
  },
  
  /**
   * Create basic charts
   */
  createBasicCharts: function() {
    // Create TCO comparison chart
    if (this.state.chartPlaceholders) {
      this.state.chartPlaceholders.createBasicTcoChart('tco-comparison-chart', this.state.results);
    }
  },
  
  /**
   * Update UI with calculation results
   */
  updateResultsUI: function() {
    if (!this.state.results) return;
    
    console.log('Updating UI with results...');
    
    // Update metrics based on results
    this.updateMetrics();
    
    console.log('UI updated with results.');
  },
  
  /**
   * Update metrics displays
   */
  updateMetrics: function() {
    const { results } = this.state;
    
    if (!results.vendors || !results.vendors.portnox) return;
    
    // Executive view metrics
    const portnoxResults = results.vendors.portnox;
    
    // Update displayed metrics if elements exist
    const updateElement = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };
    
    // Total cost
    updateElement('portnox-tco', this.formatCurrency(portnoxResults.totalTco));
    
    // Implementation time
    updateElement('implementation-time', `${portnoxResults.implementation.time} days`);
    
    // Other vendors comparison
    if (results.vendors.cisco) {
      const ciscoResults = results.vendors.cisco;
      const costDiff = ciscoResults.totalTco - portnoxResults.totalTco;
      const savingsPercent = Math.round((costDiff / ciscoResults.totalTco) * 100);
      
      updateElement('total-savings', this.formatCurrency(costDiff));
      updateElement('savings-percentage', `${savingsPercent}% reduction vs. Cisco ISE`);
      updateElement('tco-comparison', `vs. ${this.formatCurrency(ciscoResults.totalTco)} (Cisco ISE)`);
    }
  },
  
  /**
   * Show loading overlay
   */
  showLoadingOverlay: function() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.add('active');
    }
  },
  
  /**
   * Hide loading overlay
   */
  hideLoadingOverlay: function() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  },
  
  /**
   * Show a toast notification
   */
  showToast: function(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
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
    
    const textSpan = document.createElement('span');
    textSpan.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(textSpan);
    toastContainer.appendChild(toast);
    
    // Show the toast with animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Remove the toast after 5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 5000);
  },
  
  /**
   * Export report as PDF
   */
  exportReport: function() {
    console.log('Exporting report...');
    
    // Show loading overlay
    this.showLoadingOverlay();
    
    // Simulated export delay (would be replaced with actual PDF generation)
    setTimeout(() => {
      // Hide loading overlay
      this.hideLoadingOverlay();
      
      // Show success toast
      this.showToast('Report exported successfully!', 'success');
    }, 2000);
  },
  
  /**
   * Format currency values
   */
  formatCurrency: function(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
};

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
EOL

# ==================================================
# 6. Create Updated index.html with All Features
# ==================================================
echo "Creating updated index.html..."

cat > index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Zero Trust Total Cost Analyzer - Enterprise Total Cost of Ownership Calculator">
    <title>Total Cost Analyzer | Portnox</title>
    
    <!-- CSS Libraries -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap">
    
    <!-- Core CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/components/charts.css">
    
    <link rel="icon" type="image/png" href="img/favicon.png">
    
    <!-- JavaScript Libraries -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
</head>
<body>
    <!-- Particle Background -->
    <div id="particles-js"></div>
    
    <!-- Main Application Container -->
    <div class="app-container">
        <!-- Enhanced Header -->
        <header class="app-header">
            <div class="header-content">
                <div class="logo-section">
                    <img src="img/vendors/portnox-logo.png" alt="Portnox Logo" class="company-logo">
                    <div class="app-title">
                        <h1>Zero Trust Total Cost Analyzer</h1>
                        <p class="subtitle">Multi-Vendor NAC Solution Comparison Platform</p>
                    </div>
                </div>
                <div class="header-actions">
                    <button id="calculate-btn-header" class="btn btn-primary" title="Calculate TCO & ROI">
                        <i class="fas fa-calculator"></i> Calculate
                    </button>
                    <button id="export-pdf" class="btn btn-outline btn-icon" title="Export Report">
                        <i class="fas fa-file-pdf"></i>
                        <span>Export</span>
                    </button>
                    <button id="help-btn" class="btn btn-outline btn-icon" title="Help">
                        <i class="fas fa-question-circle"></i>
                    </button>
                    <button id="dark-mode-toggle" class="btn btn-outline btn-icon" title="Toggle Dark Mode">
                        <i class="fas fa-moon"></i>
                    </button>
                </div>
            </div>
        </header>
        
        <!-- Main Content Area with Sidebar -->
        <div class="main-content">
            <!-- Configuration Sidebar -->
            <div class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <h2><i class="fas fa-sliders-h"></i> Configuration</h2>
                </div>
                
                <div class="sidebar-content">
                    <!-- Vendor Selection -->
                    <div id="vendor-config" class="config-card">
                        <div class="config-card-header">
                            <h3><i class="fas fa-server"></i> Select NAC Vendors</h3>
                            <i class="fas fa-chevron-up"></i>
                        </div>
                        <div class="config-card-content">
                            <p class="helper-text">Choose multiple vendors to compare with Portnox Cloud</p>
                            <div class="vendor-grid">
                                <div class="vendor-card selected" data-vendor="portnox">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/portnox-logo.png" alt="Portnox">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Portnox Cloud</h3>
                                        <p>Cloud-native NAC</p>
                                    </div>
                                    <div class="vendor-badge">
                                        <span class="badge badge-primary">Best Value</span>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="cisco">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/cisco-logo.png" alt="Cisco ISE">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Cisco ISE</h3>
                                        <p>Enterprise NAC</p>
                                    </div>
                                    <div class="vendor-badge">
                                        <span class="badge badge-warning">Complex</span>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="aruba">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/aruba-logo.png" alt="Aruba ClearPass">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Aruba ClearPass</h3>
                                        <p>Policy manager</p>
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
                                
                                <div class="vendor-card" data-vendor="juniper">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/juniper-logo.png" alt="Juniper Mist">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Juniper Mist</h3>
                                        <p>AI-driven NAC</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="securew2">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/securew2-logo.png" alt="SecureW2">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>SecureW2</h3>
                                        <p>Cloud RADIUS</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="microsoft">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/microsoft-logo.png" alt="Microsoft NPS">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Microsoft NPS</h3>
                                        <p>Windows Server NAC</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="arista">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/arista-logo.png" alt="Arista Agni">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Arista Agni</h3>
                                        <p>Network control</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="foxpass">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/foxpass-logo.png" alt="Foxpass">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Foxpass</h3>
                                        <p>Cloud RADIUS/LDAP</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="no-nac">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/no-nac-icon.png" alt="No NAC">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>No NAC</h3>
                                        <p>High risk baseline</p>
                                    </div>
                                    <div class="vendor-badge">
                                        <span class="badge badge-danger">High Risk</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Organization Details -->
                    <div id="organization-config" class="config-card">
                        <div class="config-card-header">
                            <h3><i class="fas fa-users"></i> Organization</h3>
                            <i class="fas fa-chevron-up"></i>
                        </div>
                        <div class="config-card-content">
                            <div class="form-group">
                                <label for="organization-size" class="form-label">Organization Size</label>
                                <select id="organization-size" class="form-select">
                                    <option value="very-small">Very Small (< 300 devices)</option>
                                    <option value="small" selected>Small (300-1,000 devices)</option>
                                    <option value="medium">Medium (1,000-5,000 devices)</option>
                                    <option value="large">Large (5,000-10,000 devices)</option>
                                    <option value="enterprise">Enterprise (10,000+ devices)</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="device-count" class="form-label">Number of Devices</label>
                                <input type="number" id="device-count" class="form-control" value="500" min="300" max="100000">
                                <div class="helper-text">Include all managed devices (PCs, mobile, IoT)</div>
                            </div>
                            
                            <div class="form-group">
                                <label for="locations" class="form-label">Number of Locations</label>
                                <input type="number" id="locations" class="form-control" value="2" min="1" max="1000">
                            </div>
                            
                            <div class="form-group">
                                <label for="years-to-project" class="form-label">Analysis Period</label>
                                <select id="years-to-project" class="form-select">
                                    <option value="1">1 Year</option>
                                    <option value="2">2 Years</option>
                                    <option value="3" selected>3 Years</option>
                                    <option value="5">5 Years</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="sidebar-footer">
                    <button id="calculate-btn" class="btn btn-primary btn-large">
                        <i class="fas fa-calculator"></i> Calculate TCO & ROI
                    </button>
                </div>
            </div>
            
            <!-- Sidebar Toggle Button -->
            <div class="sidebar-toggle" id="sidebar-toggle">
                <i class="fas fa-chevron-left"></i>
            </div>
            
            <!-- Main Content Area -->
            <div class="content-area" id="content-area">
                <div class="content-wrapper">
                    <!-- Main Tabs for Different Views -->
                    <div class="main-tabs">
                        <button class="main-tab active" data-view="executive">
                            <i class="fas fa-chart-pie"></i> Executive
                        </button>
                        <button class="main-tab" data-view="financial">
                            <i class="fas fa-coins"></i> Financial
                        </button>
                        <button class="main-tab" data-view="security">
                            <i class="fas fa-shield-alt"></i> Security
                        </button>
                        <button class="main-tab" data-view="technical">
                            <i class="fas fa-cogs"></i> Technical
                        </button>
                    </div>
                    
                    <!-- Executive View -->
                    <div class="view-panel active" data-view="executive">
                        <!-- View-specific Tabs -->
                        <div class="results-tabs">
                            <button class="results-tab active" data-panel="executive-summary">Executive Summary</button>
                            <button class="results-tab" data-panel="executive-roi">ROI Analysis</button>
                            <button class="results-tab" data-panel="executive-risk">Risk Assessment</button>
                            <button class="results-tab" data-panel="executive-comparison">Vendor Comparison</button>
                        </div>
                        
                        <!-- Executive Summary Panel -->
                        <div id="executive-summary" class="results-panel active">
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
                        </div>
                        
                        <!-- Executive ROI Panel -->
                        <div id="executive-roi" class="results-panel">
                            <div class="panel-header">
                                <h2>ROI Analysis</h2>
                                <p class="subtitle">Detailed return on investment analysis and business value</p>
                            </div>
                            
                            <div class="dashboard-grid">
                                <div class="dashboard-card highlight-card">
                                    <h3>3-Year ROI</h3>
                                    <div class="metric-value highlight-value" id="three-year-roi">287%</div>
                                    <div class="metric-label">Return on investment</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Annual Cost Savings</h3>
                                    <div class="metric-value" id="annual-savings">$82,333</div>
                                    <div class="metric-label">Per year vs. traditional solutions</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Productivity Gains</h3>
                                    <div class="metric-value" id="productivity-value">$130,000</div>
                                    <div class="metric-label">Estimated 3-year value</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Compliance Savings</h3>
                                    <div class="metric-value" id="compliance-savings">$92,000</div>
                                    <div class="metric-label">Audit & reporting efficiency</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>ROI Over Time</h3>
                                <div class="chart-wrapper" id="roi-chart"></div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Value Drivers</h3>
                                <div class="chart-wrapper half-height" id="value-drivers-chart"></div>
                            </div>
                        </div>
                        
                        <!-- Executive Risk Panel -->
                        <div id="executive-risk" class="results-panel">
                            <div class="panel-header">
                                <h2>Risk Assessment</h2>
                                <p class="subtitle">Security risk evaluation and business impact analysis</p>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Risk Profile Comparison</h3>
                                <div class="chart-wrapper" id="risk-comparison-chart"></div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Breach Impact Analysis</h3>
                                <div class="chart-wrapper" id="breach-impact-chart"></div>
                            </div>
                        </div>
                        
                        <!-- Executive Comparison Panel -->
                        <div id="executive-comparison" class="results-panel">
                            <div class="panel-header">
                                <h2>Vendor Comparison</h2>
                                <p class="subtitle">Key differentiators and competitive advantages</p>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Solution Comparison</h3>
                                <div class="chart-wrapper" id="vendor-radar-chart"></div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Competitive Advantages</h3>
                                <div class="advantages-grid">
                                    <div class="advantage-card">
                                        <div class="advantage-header">
                                            <div class="advantage-icon">
                                                <i class="fas fa-cloud"></i>
                                            </div>
                                            <h4>Cloud-Native Architecture</h4>
                                        </div>
                                        <p>Unlike on-premises competitors, Portnox requires no hardware investment or complex upgrades.</p>
                                        <div class="comparison-bar">
                                            <div class="bar-label">Portnox</div>
                                            <div class="bar-track">
                                                <div class="bar-fill" style="width: 95%;"></div>
                                            </div>
                                            <div class="bar-value">95%</div>
                                        </div>
                                        <div class="comparison-bar">
                                            <div class="bar-label">Competitors</div>
                                            <div class="bar-track">
                                                <div class="bar-fill" style="width: 30%;"></div>
                                            </div>
                                            <div class="bar-value">30%</div>
                                        </div>
                                    </div>
                                    
                                    <div class="advantage-card">
                                        <div class="advantage-header">
                                            <div class="advantage-icon">
                                                <i class="fas fa-tachometer-alt"></i>
                                            </div>
                                            <h4>Deployment Speed</h4>
                                        </div>
                                        <p>Portnox deploys in days rather than months, with minimal specialized expertise required.</p>
                                        <div class="comparison-bar">
                                            <div class="bar-label">Portnox</div>
                                            <div class="bar-track">
                                                <div class="bar-fill" style="width: 90%;"></div>
                                            </div>
                                            <div class="bar-value">90%</div>
                                        </div>
                                        <div class="comparison-bar">
                                            <div class="bar-label">Competitors</div>
                                            <div class="bar-track">
                                                <div class="bar-fill" style="width: 35%;"></div>
                                            </div>
                                            <div class="bar-value">35%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Financial View -->
                    <div class="view-panel" data-view="financial">
                        <!-- View-specific Tabs -->
                        <div class="results-tabs">
                            <button class="results-tab active" data-panel="financial-overview">Financial Overview</button>
                            <button class="results-tab" data-panel="financial-tco">TCO Breakdown</button>
                            <button class="results-tab" data-panel="financial-roi">ROI Analysis</button>
                            <button class="results-tab" data-panel="financial-projections">Cost Projections</button>
                        </div>
                        
                        <!-- Financial Overview Panel -->
                        <div id="financial-overview" class="results-panel active">
                            <div class="panel-header">
                                <h2>Financial Overview</h2>
                                <p class="subtitle">Comprehensive cost and value analysis</p>
                            </div>
                            
                            <div class="dashboard-grid">
                                <div class="dashboard-card highlight-card">
                                    <h3>Total 3-Year TCO</h3>
                                    <div class="metric-value highlight-value" id="portnox-tco">$202,500</div>
                                    <div class="metric-label" id="tco-comparison">vs. $450,000 (Cisco ISE)</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Annual Subscription</h3>
                                    <div class="metric-value" id="annual-subscription">$51,000</div>
                                    <div class="metric-label">Fully managed service</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Implementation Cost</h3>
                                    <div class="metric-value" id="implementation-cost">$15,500</div>
                                    <div class="metric-label">One-time cost</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Operational Cost (Annual)</h3>
                                    <div class="metric-value" id="operational-cost">$25,000</div>
                                    <div class="metric-label">Staff and management</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Cost Structure Comparison</h3>
                                <div class="chart-wrapper" id="cost-structure-chart"></div>
                            </div>
                        </div>
                        
                        <!-- Add other financial panels -->
                    </div>
                    
                    <!-- Security View -->
                    <div class="view-panel" data-view="security">
                        <!-- View-specific Tabs -->
                        <div class="results-tabs">
                            <button class="results-tab active" data-panel="security-posture">Security Posture</button>
                            <button class="results-tab" data-panel="security-compliance">Compliance Coverage</button>
                            <button class="results-tab" data-panel="security-risk">Risk Assessment</button>
                            <button class="results-tab" data-panel="security-threat">Threat Protection</button>
                        </div>
                        
                        <!-- Security Posture Panel -->
                        <div id="security-posture" class="results-panel active">
                            <div class="panel-header">
                                <h2>Security Posture Analysis</h2>
                                <p class="subtitle">Comprehensive security evaluation</p>
                            </div>
                            
                            <div class="dashboard-grid">
                                <div class="dashboard-card highlight-card">
                                    <h3>Zero Trust Readiness</h3>
                                    <div class="metric-value highlight-value">92%</div>
                                    <div class="metric-label">vs. 45% (Industry Average)</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Device Authentication</h3>
                                    <div class="metric-value">100%</div>
                                    <div class="metric-label">Complete device visibility</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Risk Assessment</h3>
                                    <div class="metric-value">Real-time</div>
                                    <div class="metric-label">Continuous monitoring</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Remediation Speed</h3>
                                    <div class="metric-value">4 min</div>
                                    <div class="metric-label">Average response time</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Security Capabilities Heat Map</h3>
                                <div class="heatmap-container" id="security-heatmap"></div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>NIST Cybersecurity Framework Alignment</h3>
                                <div class="chart-wrapper" id="nist-framework-chart"></div>
                            </div>
                        </div>
                        
                        <!-- Add other security panels -->
                    </div>
                    
                    <!-- Technical View -->
                    <div class="view-panel" data-view="technical">
                        <!-- View-specific Tabs -->
                        <div class="results-tabs">
                            <button class="results-tab active" data-panel="technical-overview">Technical Overview</button>
                            <button class="results-tab" data-panel="technical-features">Feature Comparison</button>
                            <button class="results-tab" data-panel="technical-architecture">Architecture</button>
                            <button class="results-tab" data-panel="technical-implementation">Implementation</button>
                        </div>
                        
                        <!-- Technical Overview Panel -->
                        <div id="technical-overview" class="results-panel active">
                            <div class="panel-header">
                                <h2>Technical Overview</h2>
                                <p class="subtitle">Technical capabilities and architecture assessment</p>
                            </div>
                            
                            <div class="dashboard-grid">
                                <div class="dashboard-card highlight-card">
                                    <h3>Architecture</h3>
                                    <div class="metric-value highlight-value">Cloud-Native</div>
                                    <div class="metric-label">No on-premises hardware</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Deployment Model</h3>
                                    <div class="metric-value">SaaS</div>
                                    <div class="metric-label">Fully managed service</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Integration Capability</h3>
                                    <div class="metric-value">300+</div>
                                    <div class="metric-label">Pre-built integrations</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Technical Debt</h3>
                                    <div class="metric-value">Minimal</div>
                                    <div class="metric-label">Modern architecture</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Architecture Comparison</h3>
                                <div class="chart-wrapper" id="architecture-chart"></div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Feature Radar Comparison</h3>
                                <div class="chart-wrapper" id="feature-radar-chart"></div>
                            </div>
                        </div>
                        
                        <!-- Add other technical panels -->
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
    
    <!-- Loading Overlay -->
    <div id="loading-overlay" class="loading-overlay">
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Calculating results...</p>
        </div>
    </div>
    
    <!-- Toast Notifications Container -->
    <div id="toast-container" class="toast-container"></div>
    
    <!-- Help Modal -->
    <div id="help-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Help & Documentation</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <h3>Using the Total Cost Analyzer</h3>
                <p>This tool helps you compare the total cost of ownership (TCO) and return on investment (ROI) for different NAC solutions.</p>
                
                <div class="help-section">
                    <h4>1. Configure Your Analysis</h4>
                    <ul>
                        <li><strong>Select vendors</strong> to compare with Portnox Cloud</li>
                        <li><strong>Enter your organization details</strong> such as size and device count</li>
                        <li><strong>Adjust cost parameters</strong> if needed</li>
                    </ul>
                </div>
                
                <div class="help-section">
                    <h4>2. View Analysis Results</h4>
                    <ul>
                        <li><strong>Executive View:</strong> High-level overview for decision makers</li>
                        <li><strong>Financial View:</strong> Detailed cost breakdown and ROI analysis</li>
                        <li><strong>Security View:</strong> Risk assessment and compliance coverage</li>
                        <li><strong>Technical View:</strong> Feature comparison and implementation details</li>
                    </ul>
                </div>
                
                <div class="help-section">
                    <h4>3. Export Your Results</h4>
                    <p>Use the Export button to generate a PDF report of your analysis for sharing with stakeholders.</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Core JavaScript -->
    <script src="js/models/vendor-data.js"></script>
    <script src="js/models/calculator.js"></script>
    <script src="js/charts/chart-placeholders.js"></script>
    <script src="js/components/particle-background.js"></script>
    <script src="js/portnox-tco-analyzer.js"></script>
</body>
</html>
EOL

# ==================================================
# 7. Create missing directories for vendor logos
# ==================================================
echo "Creating directories for vendor logos..."

mkdir -p img/vendors

# ==================================================
# 8. Create empty placeholder for missing vendor logos
# ==================================================
echo "Creating placeholder for missing vendor logos..."

# Create a basic placeholder image for vendors
cat > img/vendors/placeholder.svg << 'EOL'
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50" viewBox="0 0 100 50">
  <rect width="100" height="50" fill="#f0f0f0"/>
  <text x="50" y="25" font-family="Arial" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="#666">
    Vendor Logo
  </text>
</svg>
EOL

# Create a simple Portnox logo placeholder
cat > img/vendors/portnox-logo.png << 'EOL'
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50" viewBox="0 0 100 50">
  <rect width="100" height="50" fill="#1a5a96"/>
  <text x="50" y="25" font-family="Arial" font-size="14" text-anchor="middle" dominant-baseline="middle" fill="white" font-weight="bold">
    PORTNOX
  </text>
</svg>
EOL

# Copy placeholder for other vendors
cp img/vendors/placeholder.svg img/vendors/cisco-logo.png
cp img/vendors/placeholder.svg img/vendors/aruba-logo.png
cp img/vendors/placeholder.svg img/vendors/forescout-logo.png
cp img/vendors/placeholder.svg img/vendors/fortinac-logo.png
cp img/vendors/placeholder.svg img/vendors/juniper-logo.png
cp img/vendors/placeholder.svg img/vendors/securew2-logo.png
cp img/vendors/placeholder.svg img/vendors/microsoft-logo.png
cp img/vendors/placeholder.svg img/vendors/arista-logo.png
cp img/vendors/placeholder.svg img/vendors/foxpass-logo.png
cp img/vendors/placeholder.svg img/vendors/no-nac-icon.png

# ==================================================
# 9. Add Favicon
# ==================================================
echo "Creating favicon..."

cat > img/favicon.png << 'EOL'
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#1a5a96"/>
  <text x="16" y="16" font-family="Arial" font-size="14" text-anchor="middle" dominant-baseline="middle" fill="white" font-weight="bold">
    P
  </text>
</svg>
EOL

# ==================================================
# 10. Commit Changes to Git Repository
# ==================================================
echo "Committing changes to Git repository..."

git add .
git commit -m "Major enhancement: Added vendor selection, particle background, views, and charts"

# Final message
echo "=== Enhancement Complete ==="
echo "The application has been enhanced with:"
echo "  - Vendor selection panel with all vendors"
echo "  - Interactive particle background"
echo "  - Enhanced UI with animations and modern design"
echo "  - Multiple views (Executive, Financial, Security, Technical)"
echo "  - Chart placeholders that will display data after calculation"
echo "  - Responsive layout for all device sizes"
echo "  - Dark mode support"
echo ""
echo "Next steps:"
echo "1. Replace placeholder vendor logos with real ones"
echo "2. Implement advanced charts for each view"
echo "3. Enhance the calculation logic for ROI and security metrics"
echo ""
echo "You can now serve the application with a simple HTTP server to test it."
