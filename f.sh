#!/bin/bash

# ==========================================================
# Portnox Total Cost Analyzer - Sidebar Enhancement & Visual Upgrade
# ==========================================================

echo "=== Starting Sidebar Enhancement & Visual Upgrade ==="

# Create backup of current state
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="sidebar_enhancement_$TIMESTAMP"
#mkdir -p "$BACKUP_DIR"
#cp -r * "$BACKUP_DIR" 2>/dev/null || true
cp -r .git "$BACKUP_DIR" 2>/dev/null || true
echo "Created backup in $BACKUP_DIR"

# ==================================================
# 1. Create dedicated sidebar CSS
# ==================================================
echo "Creating dedicated sidebar CSS..."

mkdir -p css/components

cat > css/components/sidebar.css << 'EOL'
/* 
 * Sidebar Styling for Portnox Total Cost Analyzer
 * Advanced, interactive sidebar with vendor selection and configuration
 */

/* Main sidebar container */
.sidebar {
  width: 360px;
  background-color: var(--card-background);
  box-shadow: 2px 0 15px var(--shadow-color);
  overflow-y: auto;
  transition: width 0.3s ease, background-color 0.3s ease;
  z-index: 100;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar.collapsed {
  width: 0;
}

/* Sidebar header */
.sidebar-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  color: white;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.sidebar-header h2 i {
  margin-right: 10px;
  font-size: 20px;
}

/* Sidebar content area (scrollable) */
.sidebar-content {
  padding: 15px;
  overflow-y: auto;
  flex: 1;
}

/* Sidebar footer */
.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border-color);
  background-color: var(--background-color);
}

/* Config cards */
.config-card {
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px var(--shadow-color);
  background-color: var(--card-background);
  transition: all 0.3s ease;
}

.config-card:hover {
  box-shadow: 0 5px 15px var(--shadow-color);
}

/* Config card header */
.config-card-header {
  padding: 12px 15px;
  background: linear-gradient(to right, var(--primary-color), var(--primary-dark-color));
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.config-card-header:hover {
  filter: brightness(1.1);
}

.config-card-header h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.config-card-header h3 i {
  margin-right: 10px;
  font-size: 16px;
}

.config-card-header .toggle-icon {
  transition: transform 0.3s ease;
}

.config-card-header .toggle-icon.collapsed {
  transform: rotate(180deg);
}

/* Config card content */
.config-card-content {
  padding: 15px;
  max-height: 1000px;
  overflow: hidden;
  transition: max-height 0.5s ease, padding 0.3s ease;
}

.config-card-content.collapsed {
  max-height: 0;
  padding: 0 15px;
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
  grid-gap: 8px;
  margin-top: 10px;
}

/* Compact vendor card for sidebar */
.vendor-select-card {
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 80px;
}

.vendor-select-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 10px var(--shadow-color);
  border-color: var(--primary-color);
}

.vendor-select-card .vendor-logo {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.vendor-select-card .vendor-logo img {
  max-height: 30px;
  max-width: 100%;
  object-fit: contain;
}

.vendor-select-card .vendor-name {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Selected vendor styling */
.vendor-select-card.selected {
  border: 2px solid var(--primary-color);
  background-color: var(--highlight-background);
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
  box-shadow: 0 2px 5px var(--shadow-color);
}

/* Badge for vendor cards */
.vendor-select-card .badge {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 8px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.vendor-select-card .badge-primary {
  background-color: var(--primary-color);
  color: white;
}

.vendor-select-card .badge-warning {
  background-color: var(--warning-color);
  color: white;
}

.vendor-select-card .badge-danger {
  background-color: var(--error-color);
  color: white;
}

/* Advanced form styling */
.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
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
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
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

/* Range slider styling */
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
  color: var(--text-color);
}

.range-slider-value {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary-color);
}

input[type="range"] {
  width: 100%;
  height: 10px;
  -webkit-appearance: none;
  background: linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) 50%, var(--border-color) 50%, var(--border-color) 100%);
  border-radius: 5px;
  outline: none;
  padding: 0;
  margin: 0;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
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
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
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
}

/* Checkbox styling */
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
  background-color: var(--input-background);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: all 0.3s ease;
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

/* Transition for sidebar toggle */
.sidebar-toggle {
  position: fixed;
  left: 360px;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--card-background);
  width: 28px;
  height: 56px;
  border-radius: 0 8px 8px 0;
  box-shadow: 2px 0 10px var(--shadow-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  border: 1px solid var(--border-color);
  border-left: none;
}

.sidebar-toggle:hover {
  background-color: var(--primary-color);
  color: white;
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

/* Selected vendor counter */
.vendor-counter {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  border-radius: 6px;
  background-color: var(--highlight-background);
  border: 1px dashed var(--primary-color);
}

.vendor-counter-icon {
  font-size: 16px;
  color: var(--primary-color);
  margin-right: 10px;
}

.vendor-counter-text {
  flex: 1;
  font-size: 13px;
  color: var(--text-color);
}

.vendor-counter-value {
  font-weight: 700;
  color: var(--primary-color);
  font-size: 15px;
  padding: 2px 8px;
  background-color: var(--card-background);
  border-radius: 4px;
  box-shadow: 0 1px 3px var(--shadow-color);
}

/* Calculate button styling */
.btn-calculate {
  position: relative;
  display: block;
  width: 100%;
  padding: 14px 20px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  color: white;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.btn-calculate:hover {
  background: linear-gradient(135deg, var(--primary-dark-color), var(--primary-color));
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.btn-calculate:active {
  transform: translateY(1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.btn-calculate i {
  margin-right: 10px;
}

/* Animation for ripple effect */
.btn-calculate:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.3);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.btn-calculate:hover:after {
  animation: ripple 1s ease-out;
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

/* Responsive adaptations */
@media (max-width: 1024px) {
  .sidebar {
    width: 300px;
  }
  
  .sidebar-toggle {
    left: 300px;
  }
  
  .vendor-select-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 85%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar.active {
    transform: translateX(0);
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
    display: block;
    position: fixed;
    left: 0;
    top: 60px;
    width: 40px;
    height: 40px;
    border-radius: 0 8px 8px 0;
    box-shadow: 2px 0 10px var(--shadow-color);
    z-index: 1001;
  }
}
EOL

echo "Creating updated main CSS with theme enhancements..."

# Update main CSS with enhanced theme colors
cat > css/main.css << 'EOL'
/* Main CSS for Portnox Total Cost Analyzer - Enhanced Theme */
:root {
  /* Primary colors */
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
  --background-color: #f5f7fa;
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
}

/* Base styles */
* {
  box-sizing: border-box;
  margin: a
  padding: 0;
}

body {
  font-family: 'Nunito', sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.5;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

/* Header with particle background */
.app-header {
  background-color: var(--card-background);
  box-shadow: 0 2px 15px var(--shadow-color);
  padding: 10px 0;
  position: relative;
  z-index: 5;
  overflow: hidden;
}

.app-header .particles-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
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
  font-size: 22px;
  color: var(--primary-color);
  font-weight: 700;
  transition: color 0.3s ease;
}

.subtitle {
  margin: 5px 0 0;
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 400;
  transition: color 0.3s ease;
}

.header-actions {
  display: flex;
  gap: 10px;
}

/* Main content layout */
.main-content {
  display: flex;
  flex: 1;
  position: relative;
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
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

body.dark-mode .loading-overlay {
  background-color: rgba(18, 18, 18, 0.8);
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
  z-index: 9999;
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
  color: var(--success-color);
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

/* Help modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal.active {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background-color: var(--card-background);
  border-radius: 8px;
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 20px var(--shadow-dark);
  transform: scale(0.9);
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.modal.active .modal-content {
  transform: scale(1);
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
  color: var(--primary-color);
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--text-light);
  transition: color 0.3s ease;
}

.modal-close:hover {
  color: var(--error-color);
}

.modal-body {
  padding: 20px;
}

/* Buttons */
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 2px 5px var(--shadow-light);
  overflow: hidden;
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
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--primary-dark-color), var(--primary-color));
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow-color);
}

.btn-secondary {
  background: linear-gradient(135deg, var(--secondary-color), var(--secondary-dark-color));
  color: white;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, var(--secondary-dark-color), var(--secondary-color));
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow-color);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
}

.btn-outline:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow-light);
}

.btn-icon i {
  margin-right: 8px;
}

.btn-large {
  padding: 12px 20px;
  font-size: 15px;
}

/* Dashboard grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-bottom: 30px;
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

/* Dashboard cards */
.dashboard-card {
  background-color: var(--card-background);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 15px var(--shadow-color);
  transition: all 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px var(--shadow-color);
}

.dashboard-card h3 {
  margin: 0 0 10px;
  font-size: 16px;
  color: var(--text-secondary);
  font-weight: 600;
}

.metric-value {
  font-size: 28px;
  font-weight: 700;
  margin: 10px 0;
  color: var(--text-color);
}

.highlight-value {
  color: var(--primary-color);
}

.metric-label {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 10px;
}

.metric-trend {
  font-size: 12px;
  display: flex;
  align-items: center;
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

.highlight-card {
  border-left: 4px solid var(--primary-color);
}

/* Responsive design */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .content-area {
    margin-left: 300px;
  }
}

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
  
  .content-area {
    margin-left: 0;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .btn span {
    display: none;
  }
  
  .btn-icon i {
    margin-right: 0;
  }
}

/* Import other CSS components */
@import url('components/sidebar.css');
@import url('components/particle-background.css');
@import url('components/charts.css');
EOL

# ==================================================
# 2. Create dedicated sidebar JS functionality
# ==================================================
echo "Creating sidebar JS functionality..."

mkdir -p js/components

cat > js/components/sidebar-manager.js << 'EOL'
/**
 * Sidebar Manager for Portnox Total Cost Analyzer
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
    
    console.log('Selected vendors:', this.selectedVendors);
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
    
    slider.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, var(--border-color) ${percentage}%, var(--border-color) 100%)`;
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

# ==================================================
# 3. Create particle background for header
# ==================================================
echo "Creating particle background for header..."

cat > js/components/header-particles.js << 'EOL'
/**
 * Header Particle Background for Portnox Total Cost Analyzer
 * Creates a subtle particle effect in the header
 */

class HeaderParticles {
  constructor(containerId = 'particles-header', config = {}) {
    this.containerId = containerId;
    
    // Default configuration - lighter and more subtle than main background
    this.config = {
      particles: {
        number: {
          value: 30,
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
          value: 0.3,
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
          opacity: 0.2,
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.headerParticles = new HeaderParticles();
});
EOL

# ==================================================
# 4. Update the main HTML file
# ==================================================
echo "Updating the main HTML file..."

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
        <!-- Enhanced Header with Particles -->
        <header class="app-header">
            <div id="particles-header" class="particles-header"></div>
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
                        <i class="fas fa-calculator"></i> <span>Calculate</span>
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
                            <i class="fas fa-chevron-up toggle-icon"></i>
                        </div>
                        <div class="config-card-content">
                            <p class="helper-text">Choose up to 3 vendors to compare with Portnox Cloud</p>
                            
                            <div class="vendor-select-grid">
                                <div class="vendor-select-card locked selected" data-vendor="portnox">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/portnox-logo.png" alt="Portnox">
                                    </div>
                                    <div class="vendor-name">Portnox Cloud</div>
                                    <div class="badge badge-primary">Best Value</div>
                                </div>
                                
                                <div class="vendor-select-card" data-vendor="cisco">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/cisco-logo.png" alt="Cisco ISE">
                                    </div>
                                    <div class="vendor-name">Cisco ISE</div>
                                    <div class="badge badge-warning">Complex</div>
                                </div>
                                
                                <div class="vendor-select-card" data-vendor="aruba">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/aruba-logo.png" alt="Aruba ClearPass">
                                    </div>
                                    <div class="vendor-name">Aruba ClearPass</div>
                                </div>
                                
                                <div class="vendor-select-card" data-vendor="forescout">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/forescout-logo.png" alt="Forescout">
                                    </div>
                                    <div class="vendor-name">Forescout</div>
                                </div>
                                
                                <div class="vendor-select-card" data-vendor="fortinac">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/fortinac-logo.png" alt="FortiNAC">
                                    </div>
                                    <div class="vendor-name">FortiNAC</div>
                                </div>
                                
                                <div class="vendor-select-card" data-vendor="juniper">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/juniper-logo.png" alt="Juniper Mist">
                                    </div>
                                    <div class="vendor-name">Juniper Mist</div>
                                </div>
                                
                                <div class="vendor-select-card" data-vendor="securew2">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/securew2-logo.png" alt="SecureW2">
                                    </div>
                                    <div class="vendor-name">SecureW2</div>
                                </div>
                                
                                <div class="vendor-select-card" data-vendor="microsoft">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/microsoft-logo.png" alt="Microsoft NPS">
                                    </div>
                                    <div class="vendor-name">Microsoft NPS</div>
                                </div>
                                
                                <div class="vendor-select-card" data-vendor="arista">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/arista-logo.png" alt="Arista Agni">
                                    </div>
                                    <div class="vendor-name">Arista Agni</div>
                                </div>
                                
                                <div class="vendor-select-card" data-vendor="foxpass">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/foxpass-logo.png" alt="Foxpass">
                                    </div>
                                    <div class="vendor-name">Foxpass</div>
                                </div>
                                
                                <div class="vendor-select-card" data-vendor="no-nac">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/no-nac-icon.png" alt="No NAC">
                                    </div>
                                    <div class="vendor-name">No NAC</div>
                                    <div class="badge badge-danger">High Risk</div>
                                </div>
                            </div>
                            
                            <div class="vendor-counter">
                                <div class="vendor-counter-icon">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                                <div class="vendor-counter-text">
                                    Selected vendors
                                </div>
                                <div class="vendor-counter-value" id="vendor-counter-value">
                                    1
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Organization Details -->
                    <div id="organization-config" class="config-card">
                        <div class="config-card-header">
                            <h3><i class="fas fa-building"></i> Organization</h3>
                            <i class="fas fa-chevron-up toggle-icon"></i>
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
                                <label class="form-label">Network Requirements</label>
                                <div class="checkbox-grid">
                                    <div class="checkbox-item">
                                        <label class="custom-checkbox">
                                            <input type="checkbox" id="cloud-integration">
                                            <span class="checkmark"></span>
                                        </label>
                                        <span>Cloud Integration</span>
                                    </div>
                                    <div class="checkbox-item">
                                        <label class="custom-checkbox">
                                            <input type="checkbox" id="legacy-devices">
                                            <span class="checkmark"></span>
                                        </label>
                                        <span>Legacy Devices</span>
                                    </div>
                                    <div class="checkbox-item">
                                        <label class="custom-checkbox">
                                            <input type="checkbox" id="byod-support" checked>
                                            <span class="checkmark"></span>
                                        </label>
                                        <span>BYOD Support</span>
                                    </div>
                                    <div class="checkbox-item">
                                        <label class="custom-checkbox">
                                            <input type="checkbox" id="iot-support">
                                            <span class="checkmark"></span>
                                        </label>
                                        <span>IoT Devices</span>
                                    </div>
                                    <div class="checkbox-item">
                                        <label class="custom-checkbox">
                                            <input type="checkbox" id="wireless-support" checked>
                                            <span class="checkmark"></span>
                                        </label>
                                        <span>Wireless Network</span>
                                    </div>
                                    <div class="checkbox-item">
                                        <label class="custom-checkbox">
                                            <input type="checkbox" id="remote-work" checked>
                                            <span class="checkmark"></span>
                                        </label>
                                        <span>Remote Users</span>
                                    </div>
                                </div>
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
                    
                    <!-- Cost Parameters -->
                    <div id="cost-config" class="config-card">
                        <div class="config-card-header">
                            <h3><i class="fas fa-dollar-sign"></i> Cost Parameters</h3>
                            <i class="fas fa-chevron-up toggle-icon"></i>
                        </div>
                        <div class="config-card-content">
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Portnox Cost per Device ($/month)</span>
                                    <span class="range-slider-value" id="portnox-base-price-value">$3.00</span>
                                </div>
                                <input type="range" id="portnox-base-price" min="1" max="6" step="0.5" value="3">
                                <div class="helper-text">Adjust the per-device pricing for Portnox Cloud</div>
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Volume Discount (%)</span>
                                    <span class="range-slider-value" id="portnox-discount-value">15%</span>
                                </div>
                                <input type="range" id="portnox-discount" min="0" max="40" value="15" step="5">
                                <div class="helper-text">Volume discount based on device count</div>
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Average FTE Cost ($/year)</span>
                                    <span class="range-slider-value" id="fte-cost-value">$100,000</span>
                                </div>
                                <input type="range" id="fte-cost" min="60000" max="180000" value="100000" step="5000">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">FTE Allocation for NAC (%)</span>
                                    <span class="range-slider-value" id="fte-allocation-value">25%</span>
                                </div>
                                <input type="range" id="fte-allocation" min="5" max="75" value="25" step="5">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Annual Maintenance (%)</span>
                                    <span class="range-slider-value" id="maintenance-value">18%</span>
                                </div>
                                <input type="range" id="maintenance-percentage" min="10" max="30" value="18" step="1">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Downtime Cost ($/hour)</span>
                                    <span class="range-slider-value" id="downtime-cost-value">$5,000</span>
                                </div>
                                <input type="range" id="downtime-cost" min="1000" max="25000" value="5000" step="1000">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Risk of Breach Cost Reduction (%)</span>
                                    <span class="range-slider-value" id="risk-reduction-value">35%</span>
                                </div>
                                <input type="range" id="risk-reduction" min="10" max="50" value="35" step="5">
                                <div class="helper-text">Estimated reduction in breach costs with NAC</div>
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Insurance Premium Reduction (%)</span>
                                    <span class="range-slider-value" id="insurance-reduction-value">10%</span>
                                </div>
                                <input type="range" id="insurance-reduction" min="0" max="20" value="10" step="5">
                                <div class="helper-text">Potential cyber insurance premium reduction</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="sidebar-footer">
                    <button id="calculate-btn" class="btn-calculate">
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
                        
                        <!-- Other executive panels here -->
                    </div>
                    
                    <!-- Other views here (Financial, Security, Technical) -->
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
    
    <!-- Core JavaScript -->
    <script src="js/models/vendor-data.js"></script>
    <script src="js/models/calculator.js"></script>
    <script src="js/components/particle-background.js"></script>
    <script src="js/components/header-particles.js"></script>
    <script src="js/components/sidebar-manager.js"></script>
    <script src="js/charts/chart-placeholders.js"></script>
    <script src="js/portnox-tco-analyzer.js"></script>
</body>
</html>
EOL

# ==================================================
# 5. Update main JS to integrate with sidebar manager
# ==================================================
echo "Updating main JS to integrate with sidebar manager..."

cat > js/portnox-tco-analyzer-update.js << 'EOL'
// Update App object to work with new sidebar manager

// Add integration with sidebar manager
App.init = function() {
  console.log('Initializing Portnox TCO Analyzer...');
  
  // Initialize Calculator
  this.state.calculator = new TcoCalculator(this.state.config);
  
  // Initialize Chart Placeholders
  this.state.chartPlaceholders = window.chartPlaceholders || new ChartPlaceholders();
  
  // Set up event listeners
  this.setupEventListeners();
  
  // Initialize UI state
  this.initUIState();
  
  // Initialize integration with sidebar manager
  this.initSidebarIntegration();
  
  console.log('Portnox TCO Analyzer initialized successfully.');
};

// Add method to integrate with sidebar manager
App.initSidebarIntegration = function() {
  // Listen for vendor selection changes
  document.addEventListener('vendorSelectionChanged', (event) => {
    this.state.selectedVendors = event.detail.selectedVendors;
    console.log('App received vendor selection change:', this.state.selectedVendors);
  });
  
  // Initialize with current sidebar selection
  if (window.sidebarManager) {
    this.state.selectedVendors = window.sidebarManager.getSelectedVendors();
  }
};

// Update toggle vendor selection to work with sidebar manager
App.toggleVendorSelection = function(vendorId, card) {
  if (window.sidebarManager) {
    window.sidebarManager.toggleVendorSelection(vendorId, card);
  } else {
    // Fallback to original implementation
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
  }
};

// Update sidebar toggle
App.toggleSidebar = function() {
  if (window.sidebarManager) {
    window.sidebarManager.toggleSidebar();
  } else {
    // Fallback to original implementation
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
  }
};
EOL

# ==================================================
# 6. Commit changes to git
# ==================================================
echo "Committing changes to git..."

git add .
git commit -m "Enhanced sidebar with vendor selection grid and improved visual design"

# ==================================================
# 7. Final message
# ==================================================
echo "=== Enhancement Complete ==="
echo ""
echo "The Portnox Total Cost Analyzer has been enhanced with:"
echo "  - Redesigned sidebar with side-by-side vendor selection"
echo "  - Limit of 3 vendors for comparison"
echo "  - Expandable/collapsible sidebar sections"
echo "  - Improved Organization and Cost Configuration sections"
echo "  - Dedicated CSS and JS for sidebar functionality"
echo "  - Particle background in header"
echo "  - Enhanced theme with subtle gradients and animations"
echo "  - More visually appealing layout and design"
echo ""
echo "To implement these changes:"
echo "1. Run this script in your project directory"
echo "2. Refresh your browser to see the new design"
echo "3. Replace placeholder logo images with real logos"
echo ""
echo "Next steps could include:"
echo "1. Further enhancing the chart visualizations"
echo "2. Implementing the report generation functionality"
echo "3. Adding more interactive features to the comparison views"
echo ""
echo "Note that this implementation uses the existing directory structure"
echo "and integrates with your current codebase."
