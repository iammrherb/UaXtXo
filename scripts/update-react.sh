#!/bin/bash

# NAC Architecture Designer Pro Enhancement Deployment Script
# This script updates the existing NAC Designer with modern UI, enhanced visualizations,
# and detailed vendor comparisons while maintaining compatibility with existing code.

# Exit on error
set -e

echo "🚀 Starting NAC Architecture Designer Pro Enhancement Deployment"
echo "==============================================================="

# Create backup of current files
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backup_$TIMESTAMP"

echo "📂 Creating backup at $BACKUP_DIR"
mkdir -p $BACKUP_DIR
cp -r css js img index.html $BACKUP_DIR

# Install/update required libraries
LIBS_DIR="./libs"
mkdir -p $LIBS_DIR/js $LIBS_DIR/css

echo "📚 Downloading required libraries"

# JavaScript Libraries
JS_LIBS=(
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/recharts/2.5.0/Recharts.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.0.0/countUp.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.41.0/apexcharts.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"
)

for lib in "${JS_LIBS[@]}"; do
    filename=$(basename $lib)
    echo "⬇️ Downloading $filename"
    curl -s -L $lib -o "$LIBS_DIR/js/$filename"
done

# CSS Libraries
CSS_LIBS=(
    "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
)

for lib in "${CSS_LIBS[@]}"; do
    filename=$(basename $lib)
    echo "⬇️ Downloading $filename"
    curl -s -L $lib -o "$LIBS_DIR/css/$filename"
done

# Download Icon Packs
echo "🎨 Downloading Icon Packs"
curl -s -L "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2" -o "img/icons/fa-solid-900.woff2"
curl -s -L "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2" -o "img/icons/fa-brands-400.woff2"

# Create/update directory structure
echo "🗂️ Creating enhanced directory structure"

# CSS Structure
mkdir -p css/themes/enhanced
mkdir -p css/components/advanced
mkdir -p css/animations
mkdir -p css/visualizations

# JS Structure
mkdir -p js/components/enhanced
mkdir -p js/charts/enhanced
mkdir -p js/visualizations
mkdir -p js/animations
mkdir -p js/vendor-comparisons
mkdir -p js/compliance
mkdir -p js/risk-analysis

# Create modern SVG step icons
mkdir -p img/wizard-icons
echo "🧙 Creating themed wizard step icons"

# Generate wizard icon SVGs - Vendor Selection (Wizard)
cat > img/wizard-icons/vendor-selection.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="#3b82f6" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 3a1 1 0 011 1v1h2a1 1 0 110 2h-2v1a1 1 0 11-2 0v-1H9a1 1 0 110-2h2V8a1 1 0 011-1zm0 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
</svg>
EOF

# Generate compliance icon (Shield with Dragon)
cat > img/wizard-icons/compliance.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="#3b82f6" d="M12 1l8.217 1.826a1 1 0 01.783.976v9.987a6 6 0 01-2.672 4.992L12 23l-6.328-4.219A6 6 0 013 13.79V3.802a1 1 0 01.783-.976L12 1zm0 2.049L5 4.604v9.185a4 4 0 001.781 3.328L12 20.597l5.219-3.48A4 4 0 0019 13.79V4.604L12 3.05zm4.452 7.897l-4.11-1.848a.92.92 0 00-.342-.08H12v1h-.107a2.31 2.31 0 00-.049 0l.156-.826-4.452 1.745a1 1 0 01-.817-1.823l5-2.218a1 1 0 01.806 0l5 2.218a1 1 0 01-.817 1.823L16.452 10.947z"/>
</svg>
EOF

# Generate organization icon (Building/Castle)
cat > img/wizard-icons/organization.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="#3b82f6" d="M2 22a8 8 0 1116 0h-2a6 6 0 10-12 0H2zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm8.284 3.703A8.002 8.002 0 0123 22h-2c0-3.95-2.867-7.254-6.716-7.89.82.628 1.908 1.031 3.107 1.512 1.023.408 2.009.801 2.472 1.391.472.601.702 1.29.767 2.027.034.392-.014.805-.129 1.218-.28 1.021-1.067 1.914-2.03 2.659-.147.113-1.233.906-1.375 1.017l-1.127-.886c.136-.105 1.186-.873 1.306-.966.683-.52 1.192-1.116 1.363-1.67.065-.235.084-.436.068-.606-.037-.425-.166-.755-.36-1.01-.259-.33-.929-.614-1.764-.947-1.217-.483-2.721-1.076-3.628-2.157z"/>
</svg>
EOF

# Generate cost configuration icon (Lightning Bolt)
cat > img/wizard-icons/cost-config.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="#3b82f6" d="M13 9h8L11 24v-9H4l9-15v9zm-2 2V7.22L7.532 13H13v4.394L17.263 11H11z"/>
</svg>
EOF

# Generate results icon (Treasure Chest)
cat > img/wizard-icons/results.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="#3b82f6" d="M4 4h16a1 1 0 011 1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1zm2 2v3h12V6H6zm-4 7h16a1 1 0 011 1v9.992A1 1 0 0118 23H2a1 1 0 01-1-.992V14a1 1 0 011-1zm2 2v7h12v-7H4zm2.5 2h7a.5.5 0 110 1h-7a.5.5 0 010-1z"/>
</svg>
EOF

# Create enhanced CSS files
echo "🎨 Creating enhanced CSS files"

# Create enhanced theme CSS
cat > css/themes/enhanced/modern-theme.css << 'EOF'
/**
 * Modern Theme for NAC Architecture Designer Pro
 */

:root {
  /* Color System */
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-primary-light: #60a5fa;
  --color-primary-bg: rgba(59, 130, 246, 0.1);
  
  --color-secondary: #10b981;
  --color-secondary-dark: #059669;
  --color-secondary-light: #34d399;
  
  --color-accent: #8b5cf6;
  --color-accent-dark: #7c3aed;
  --color-accent-light: #a78bfa;
  
  --color-danger: #ef4444;
  --color-warning: #f59e0b;
  --color-success: #10b981;
  --color-info: #3b82f6;
  
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  
  /* Dark Mode Colors */
  --dark-bg: #0f172a;
  --dark-card-bg: #1e293b;
  --dark-border: #334155;
  --dark-text: #f1f5f9;
  --dark-text-secondary: #94a3b8;
  
  /* Typography */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-family-heading: 'Poppins', var(--font-family-base);
  --font-family-mono: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  
  /* Borders */
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.375rem;
  --border-radius-lg: 0.5rem;
  --border-radius-xl: 0.75rem;
  --border-radius-2xl: 1rem;
  --border-radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Z-index */
  --z-negative: -1;
  --z-elevate: 1;
  --z-dropdown: 10;
  --z-sticky: 100;
  --z-drawer: 200;
  --z-modal: 300;
  --z-popover: 400;
  --z-maximum: 9999;
}

/* Dark Mode */
body.dark-mode {
  background-color: var(--dark-bg);
  color: var(--dark-text);
}

body.dark-mode .app-container {
  background-color: var(--dark-bg);
}

body.dark-mode .app-header,
body.dark-mode .app-footer {
  background-color: var(--dark-card-bg);
  border-color: var(--dark-border);
}

body.dark-mode .card,
body.dark-mode .wizard-container,
body.dark-mode .results-container,
body.dark-mode .tab-content {
  background-color: var(--dark-card-bg);
  border-color: var(--dark-border);
}

body.dark-mode .text-gray-600,
body.dark-mode .text-gray-700,
body.dark-mode .text-gray-800 {
  color: var(--dark-text-secondary);
}

body.dark-mode .border-gray-200,
body.dark-mode .border-gray-300 {
  border-color: var(--dark-border);
}

/* Modern Card Styles */
.modern-card {
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  overflow: hidden;
}

.modern-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Enhanced Buttons */
.btn-modern {
  position: relative;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  transition: all var(--transition-normal);
  overflow: hidden;
}

.btn-modern::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.btn-modern:hover::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  20% {
    transform: scale(25, 25);
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    transform: scale(40, 40);
  }
}

.btn-primary-modern {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  border: none;
}

.btn-primary-modern:hover {
  background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-outline-modern {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.btn-outline-modern:hover {
  background-color: var(--color-primary-bg);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

/* Modern Input Styles */
.input-modern {
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-gray-300);
  padding: 0.75rem 1rem;
  transition: all var(--transition-normal);
  background-color: var(--color-gray-50);
}

.input-modern:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-bg);
  outline: none;
}

body.dark-mode .input-modern {
  background-color: var(--dark-card-bg);
  border-color: var(--dark-border);
  color: var(--dark-text);
}

/* Modern Range Input */
.range-modern {
  -webkit-appearance: none;
  height: 8px;
  background: var(--color-gray-200);
  border-radius: var(--border-radius-full);
}

.range-modern::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-primary);
  cursor: pointer;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  transition: all var(--transition-normal);
}

.range-modern::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
}

body.dark-mode .range-modern {
  background: var(--dark-border);
}

/* Modern Wizard Steps */
.wizard-steps-modern {
  display: flex;
  position: relative;
  z-index: 1;
}

.wizard-step-modern {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.wizard-step-modern::before {
  content: '';
  position: absolute;
  top: 24px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-gray-300);
  z-index: -1;
}

.wizard-step-modern:first-child::before {
  left: 50%;
}

.wizard-step-modern:last-child::before {
  right: 50%;
}

.step-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-gray-200);
  color: var(--color-gray-600);
  transition: all var(--transition-normal);
  margin-bottom: 8px;
  z-index: 1;
}

.wizard-step-modern.active .step-icon {
  background-color: var(--color-primary);
  color: white;
  box-shadow: 0 0 0 4px var(--color-primary-bg);
}

.wizard-step-modern.completed .step-icon {
  background-color: var(--color-success);
  color: white;
}

.step-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-gray-600);
  transition: all var(--transition-normal);
}

.wizard-step-modern.active .step-title {
  color: var(--color-primary);
  font-weight: 600;
}

.wizard-step-modern.completed .step-title {
  color: var(--color-success);
}

/* Animations */
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slideInUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-slideInUp {
  animation: slideInUp 0.5s ease-out forwards;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Enhanced Charts */
.chart-container-enhanced {
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.chart-container-enhanced:hover {
  box-shadow: var(--shadow-md);
}

.chart-header-enhanced {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-gray-200);
}

body.dark-mode .chart-container-enhanced {
  background-color: var(--dark-card-bg);
}

body.dark-mode .chart-header-enhanced {
  border-color: var(--dark-border);
}

/* Modern Tabs */
.tabs-modern {
  display: flex;
  border-bottom: 1px solid var(--color-gray-200);
  margin-bottom: var(--spacing-md);
}

.tab-button-modern {
  padding: var(--spacing-md) var(--spacing-lg);
  font-weight: 500;
  color: var(--color-gray-600);
  border-bottom: 2px solid transparent;
  transition: all var(--transition-normal);
}

.tab-button-modern:hover {
  color: var(--color-primary);
}

.tab-button-modern.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

body.dark-mode .tabs-modern {
  border-color: var(--dark-border);
}

body.dark-mode .tab-button-modern {
  color: var(--dark-text-secondary);
}

body.dark-mode .tab-button-modern:hover,
body.dark-mode .tab-button-modern.active {
  color: var(--color-primary-light);
}

/* Vendor Cards */
.vendor-card-modern {
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-gray-200);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all var(--transition-normal);
  cursor: pointer;
}

.vendor-card-modern:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-light);
}

.vendor-card-modern.active {
  border-color: var(--color-primary);
  background-color: var(--color-primary-bg);
  box-shadow: var(--shadow-md);
}

.vendor-icon {
  width: 64px;
  height: 64px;
  object-fit: contain;
  margin-bottom: var(--spacing-md);
  transition: all var(--transition-normal);
}

.vendor-card-modern:hover .vendor-icon {
  transform: scale(1.1);
}

body.dark-mode .vendor-card-modern {
  border-color: var(--dark-border);
  background-color: var(--dark-card-bg);
}

body.dark-mode .vendor-card-modern:hover {
  border-color: var(--color-primary);
}

/* Compliance Framework Cards */
.compliance-card {
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-gray-200);
  padding: var(--spacing-md);
  display: flex;
  align-items: center;
  transition: all var(--transition-normal);
}

.compliance-card:hover {
  border-color: var(--color-primary-light);
  background-color: var(--color-primary-bg);
}

.compliance-icon {
  width: 40px;
  height: 40px;
  margin-right: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-full);
  background-color: var(--color-primary-bg);
  color: var(--color-primary);
}

body.dark-mode .compliance-card {
  border-color: var(--dark-border);
}

body.dark-mode .compliance-card:hover {
  border-color: var(--color-primary);
  background-color: rgba(59, 130, 246, 0.2);
}

/* Custom Checkboxes */
.checkbox-modern {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-gray-300);
  border-radius: var(--border-radius-sm);
  background-color: white;
  position: relative;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.checkbox-modern:checked {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.checkbox-modern:checked::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-modern:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-bg);
}

body.dark-mode .checkbox-modern {
  border-color: var(--dark-border);
  background-color: var(--dark-card-bg);
}

/* Risk Analysis Visualizations */
.risk-heatmap {
  position: relative;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
}

.risk-heatmap-cell {
  border-radius: 4px;
  transition: all var(--transition-normal);
}

.risk-heatmap-cell:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
  z-index: 1;
}

/* Compliance Coverage Matrix */
.compliance-matrix {
  display: grid;
  gap: 1px;
  background-color: var(--color-gray-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

.compliance-matrix-cell {
  background-color: white;
  padding: var(--spacing-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);
}

.compliance-matrix-cell:hover {
  background-color: var(--color-primary-bg);
}

body.dark-mode .compliance-matrix {
  background-color: var(--dark-border);
}

body.dark-mode .compliance-matrix-cell {
  background-color: var(--dark-card-bg);
}

/* Migration Timeline */
.migration-timeline {
  position: relative;
  padding: var(--spacing-md) 0;
}

.migration-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(var(--spacing-xl) + 10px);
  width: 2px;
  background-color: var(--color-gray-300);
}

.timeline-item {
  position: relative;
  padding-left: calc(var(--spacing-2xl) + 20px);
  margin-bottom: var(--spacing-lg);
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: var(--spacing-xl);
  top: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color-primary);
  z-index: 1;
}

.timeline-item-content {
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-sm);
  background-color: white;
}

body.dark-mode .migration-timeline::before {
  background-color: var(--dark-border);
}

body.dark-mode .timeline-item-content {
  background-color: var(--dark-card-bg);
}

/* Progress Indicators */
.progress-modern {
  height: 8px;
  background-color: var(--color-gray-200);
  border-radius: var(--border-radius-full);
  overflow: hidden;
}

.progress-bar-modern {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-dark));
  border-radius: var(--border-radius-full);
  transition: width 1s ease-in-out;
}

body.dark-mode .progress-modern {
  background-color: var(--dark-border);
}

/* FTE Calculator */
.fte-calculator {
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.fte-header {
  background-color: var(--color-primary);
  color: white;
  padding: var(--spacing-md);
  font-weight: 600;
}

.fte-row {
  display: flex;
  border-bottom: 1px solid var(--color-gray-200);
  transition: all var(--transition-normal);
}

.fte-row:hover {
  background-color: var(--color-gray-50);
}

.fte-cell {
  flex: 1;
  padding: var(--spacing-md);
}

.fte-value {
  font-weight: 600;
  color: var(--color-gray-900);
}

body.dark-mode .fte-row {
  border-color: var(--dark-border);
}

body.dark-mode .fte-row:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

body.dark-mode .fte-value {
  color: var(--dark-text);
}

/* Vendor Comparison Visualizations */
.vendor-comparison-card {
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
}

.vendor-comparison-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.vendor-comparison-header {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-md);
  background-color: var(--color-gray-50);
  border-bottom: 1px solid var(--color-gray-200);
}

.vendor-logo-small {
  height: 24px;
  width: auto;
  object-fit: contain;
}

.vendor-comparison-body {
  padding: var(--spacing-md);
}

.comparison-feature-row {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-gray-200);
}

.comparison-feature-row:last-child {
  border-bottom: none;
}

.feature-name {
  font-weight: 500;
  color: var(--color-gray-700);
}

.feature-value {
  display: flex;
  align-items: center;
}

.feature-value-yes {
  color: var(--color-success);
}

.feature-value-no {
  color: var(--color-danger);
}

.feature-value-partial {
  color: var(--color-warning);
}

body.dark-mode .vendor-comparison-header {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: var(--dark-border);
}

body.dark-mode .vendor-comparison-card {
  background-color: var(--dark-card-bg);
}

body.dark-mode .comparison-feature-row {
  border-color: var(--dark-border);
}

body.dark-mode .feature-name {
  color: var(--dark-text);
}

/* Feature Matrix */
.feature-matrix {
  display: grid;
  gap: 1px;
  background-color: var(--color-gray-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

.feature-matrix-cell {
  background-color: white;
  padding: var(--spacing-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);
}

.feature-matrix-cell:hover {
  background-color: var(--color-primary-bg);
}

.feature-matrix-header {
  font-weight: 600;
  background-color: var(--color-gray-100);
}

body.dark-mode .feature-matrix {
  background-color: var(--dark-border);
}

body.dark-mode .feature-matrix-cell {
  background-color: var(--dark-card-bg);
}

body.dark-mode .feature-matrix-header {
  background-color: rgba(255, 255, 255, 0.05);
}

/* Tooltips */
.tooltip-modern {
  position: relative;
  display: inline-block;
}

.tooltip-modern .tooltip-content {
  visibility: hidden;
  width: 200px;
  background-color: var(--color-gray-800);
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 8px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;
  box-shadow: var(--shadow-lg);
}

.tooltip-modern .tooltip-content::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: var(--color-gray-800) transparent transparent transparent;
}

.tooltip-modern:hover .tooltip-content {
  visibility: visible;
  opacity: 1;
}

/* Toast Notifications */
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: var(--z-maximum);
}

.toast {
  margin-top: 10px;
  padding: 15px 20px;
  background-color: white;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  animation: slideInRight 0.3s forwards;
}

.toast-success {
  border-left: 4px solid var(--color-success);
}

.toast-error {
  border-left: 4px solid var(--color-danger);
}

.toast-warning {
  border-left: 4px solid var(--color-warning);
}

.toast-info {
  border-left: 4px solid var(--color-info);
}

.toast-icon {
  margin-right: 10px;
  font-size: 20px;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-weight: 600;
  margin-bottom: 2px;
}

.toast-close {
  color: var(--color-gray-500);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-left: 10px;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

body.dark-mode .toast {
  background-color: var(--dark-card-bg);
  color: var(--dark-text);
}
EOF

# Create animations CSS
cat > css/animations/modern-animations.css << 'EOF'
/**
 * Modern Animations for NAC Architecture Designer Pro
 */

/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Fade In with Delay */
.fade-in-delay-1 {
  animation: fadeIn 0.5s ease-out 0.1s forwards;
  opacity: 0;
}

.fade-in-delay-2 {
  animation: fadeIn 0.5s ease-out 0.2s forwards;
  opacity: 0;
}

.fade-in-delay-3 {
  animation: fadeIn 0.5s ease-out 0.3s forwards;
  opacity: 0;
}

/* Slide In Up */
@keyframes slideInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-in-up {
  animation: slideInUp 0.5s ease-out forwards;
}

.slide-in-up-delay-1 {
  animation: slideInUp 0.5s ease-out 0.1s forwards;
  opacity: 0;
  transform: translateY(20px);
}

.slide-in-up-delay-2 {
  animation: slideInUp 0.5s ease-out 0.2s forwards;
  opacity: 0;
  transform: translateY(20px);
}

.slide-in-up-delay-3 {
  animation: slideInUp 0.5s ease-out 0.3s forwards;
  opacity: 0;
  transform: translateY(20px);
}

/* Slide In Left */
@keyframes slideInLeft {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-left {
  animation: slideInLeft 0.5s ease-out forwards;
}

/* Slide In Right */
@keyframes slideInRight {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-right {
  animation: slideInRight 0.5s ease-out forwards;
}

/* Zoom In */
@keyframes zoomIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.zoom-in {
  animation: zoomIn 0.5s ease-out forwards;
}

/* Pulse */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Bounce */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.bounce {
  animation: bounce 2s ease infinite;
}

/* Spin */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spin 2s linear infinite;
}

/* Flash */
@keyframes flash {
  0%, 50%, 100% {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0.5;
  }
}

.flash {
  animation: flash 2s linear infinite;
}

/* Highlight */
@keyframes highlight {
  0% {
    background-color: rgba(59, 130, 246, 0);
  }
  20% {
    background-color: rgba(59, 130, 246, 0.2);
  }
  100% {
    background-color: rgba(59, 130, 246, 0);
  }
}

.highlight {
  animation: highlight 2s ease-out forwards;
}

/* Progress Bar Animation */
@keyframes progressBar {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.progress-bar-animated {
  animation: progressBar 2s ease-out forwards;
}

/* Number Counter Animation */
@keyframes countUp {
  from {
    content: "0";
  }
  to {
    content: attr(data-target);
  }
}

.counter::after {
  content: "0";
  animation: countUp 2s forwards;
}

/* Path Drawing Animation */
@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}

.draw-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawPath 2s ease-out forwards;
}

/* 3D Rotation */
@keyframes rotate3d {
  from {
    transform: perspective(400px) rotateY(0);
  }
  to {
    transform: perspective(400px) rotateY(360deg);
  }
}

.rotate-3d {
  animation: rotate3d 3s linear infinite;
}

/* Scale In */
@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.scale-in {
  animation: scaleIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

/* Staggered Animation for Lists */
.stagger-item:nth-child(1) {
  animation-delay: 0.1s;
}

.stagger-item:nth-child(2) {
  animation-delay: 0.2s;
}

.stagger-item:nth-child(3) {
  animation-delay: 0.3s;
}

.stagger-item:nth-child(4) {
  animation-delay: 0.4s;
}

.stagger-item:nth-child(5) {
  animation-delay: 0.5s;
}

.stagger-item:nth-child(6) {
  animation-delay: 0.6s;
}

.stagger-item:nth-child(7) {
  animation-delay: 0.7s;
}

.stagger-item:nth-child(8) {
  animation-delay: 0.8s;
}

/* Typing Animation */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

.typing {
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid;
  width: 0;
  animation: 
    typing 3.5s steps(40, end) forwards,
    blink-caret .75s step-end infinite;
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: var(--color-primary); }
}

/* Wave Animation */
@keyframes wave {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
}

.wave {
  animation: wave 3s ease-in-out infinite;
}

/* Ripple */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.ripple-container {
  position: relative;
  overflow: hidden;
}

.ripple-effect {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;
  animation: ripple 1s;
}

/* Shake */
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
}

.shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
}

/* Float */
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.float {
  animation: float 3s ease-in-out infinite;
}
EOF

# Create advanced visualizations CSS
cat > css/visualizations/advanced-charts.css << 'EOF'
/**
 * Advanced Chart Styles for NAC Architecture Designer Pro
 */

/* Enhanced Chart Container */
.chart-container-advanced {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.chart-container-advanced:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.chart-header-advanced {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
}

.chart-title-advanced {
  font-weight: 600;
  font-size: 1.1rem;
  color: #1f2937;
  display: flex;
  align-items: center;
}

.chart-title-icon {
  margin-right: 8px;
  color: #3b82f6;
}

.chart-content-advanced {
  padding: 16px;
  min-height: 300px;
}

.chart-footer-advanced {
  padding: 12px 16px;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
}

/* Dark Mode Support */
.dark-mode .chart-container-advanced {
  background-color: #1e293b;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

.dark-mode .chart-header-advanced {
  border-bottom: 1px solid #334155;
}

.dark-mode .chart-title-advanced {
  color: #f1f5f9;
}

.dark-mode .chart-footer-advanced {
  border-top: 1px solid #334155;
  color: #94a3b8;
}

/* Risk Analysis Heatmap */
.risk-heatmap {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 4px;
  height: 300px;
}

.risk-heatmap-cell {
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
  transition: all 0.3s ease;
  cursor: pointer;
}

.risk-heatmap-cell:hover {
  transform: scale(1.05);
  z-index: 1;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.risk-level-critical {
  background-color: #ef4444;
}

.risk-level-high {
  background-color: #f59e0b;
}

.risk-level-medium {
  background-color: #f59e0b;
}

.risk-level-low {
  background-color: #10b981;
}

.risk-level-minimal {
  background-color: #10b981;
}

/* Risk Table */
.risk-table {
  width: 100%;
  border-collapse: collapse;
}

.risk-table th,
.risk-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.risk-table th {
  font-weight: 600;
  color: #1f2937;
  background-color: #f9fafb;
}

.risk-table td {
  vertical-align: middle;
}

.risk-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.risk-badge.critical {
  background-color: #fee2e2;
  color: #b91c1c;
}

.risk-badge.high {
  background-color: #fff7ed;
  color: #c2410c;
}

.risk-badge.medium {
  background-color: #fef3c7;
  color: #92400e;
}

.risk-badge.low {
  background-color: #d1fae5;
  color: #047857;
}

.risk-badge.minimal {
  background-color: #ecfdf5;
  color: #065f46;
}

.dark-mode .risk-table th,
.dark-mode .risk-table td {
  border-bottom: 1px solid #334155;
}

.dark-mode .risk-table th {
  color: #f1f5f9;
  background-color: #1e293b;
}

/* Compliance Matrix */
.compliance-matrix {
  display: grid;
  grid-template-columns: 200px repeat(5, 1fr);
  gap: 1px;
  background-color: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.compliance-matrix-cell {
  padding: 12px;
  background-color: white;
  display: flex;
  align-items: center;
}

.compliance-matrix-header {
  font-weight: 600;
  background-color: #f3f4f6;
  color: #1f2937;
}

.compliance-status {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.compliance-full {
  background-color: #10b981;
  color: white;
}

.compliance-partial {
  background-color: #f59e0b;
  color: white;
}

.compliance-none {
  background-color: #ef4444;
  color: white;
}

.dark-mode .compliance-matrix {
  background-color: #334155;
}

.dark-mode .compliance-matrix-cell {
  background-color: #1e293b;
}

.dark-mode .compliance-matrix-header {
  background-color: #0f172a;
  color: #f1f5f9;
}

/* Vendor Comparison Radial Chart */
.vendor-comparison-radial {
  position: relative;
  height: 400px;
}

/* Timeline Chart */
.timeline-chart {
  position: relative;
  padding-left: 40px;
}

.timeline-chart::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20px;
  width: 2px;
  background-color: #e5e7eb;
}

.timeline-item {
  position: relative;
  margin-bottom: 24px;
}

.timeline-marker {
  position: absolute;
  left: -40px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #3b82f6;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #3b82f6;
}

.timeline-content {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.timeline-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.timeline-duration {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 8px;
}

.dark-mode .timeline-chart::before {
  background-color: #334155;
}

.dark-mode .timeline-marker {
  border: 3px solid #1e293b;
}

.dark-mode .timeline-content {
  background-color: #1e293b;
}

.dark-mode .timeline-duration {
  color: #94a3b8;
}

/* Feature Comparison Table */
.feature-comparison-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.feature-comparison-table th,
.feature-comparison-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.feature-comparison-table th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #1f2937;
}

.feature-comparison-table th:not(:first-child) {
  text-align: center;
}

.feature-comparison-table td:not(:first-child) {
  text-align: center;
}

.feature-category {
  background-color: #f3f4f6;
  font-weight: 600;
}

.feature-status {
  width: 24px;
  height: 24px;
  margin: 0 auto;
}

.feature-status-excellent {
  color: #10b981;
}

.feature-status-good {
  color: #3b82f6;
}

.feature-status-fair {
  color: #f59e0b;
}

.feature-status-poor {
  color: #ef4444;
}

.dark-mode .feature-comparison-table th,
.dark-mode .feature-comparison-table td {
  border-bottom: 1px solid #334155;
}

.dark-mode .feature-comparison-table th {
  background-color: #1e293b;
  color: #f1f5f9;
}

.dark-mode .feature-category {
  background-color: #0f172a;
}

/* TCO Visualization */
.tco-visualization {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tco-bar {
  display: flex;
  align-items: center;
  height: 60px;
}

.tco-vendor-name {
  width: 120px;
  font-weight: 500;
}

.tco-bar-container {
  flex: 1;
  height: 24px;
  background-color: #f3f4f6;
  border-radius: 9999px;
  overflow: hidden;
  position: relative;
}

.tco-bar-progress {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  border-radius: 9999px;
  transition: width 1s ease-out;
}

.tco-bar-label {
  margin-left: 16px;
  font-weight: 600;
}

.tco-segments {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
}

.tco-segment {
  height: 100%;
  position: relative;
}

.tco-segment-hardware {
  background-color: #3b82f6;
}

.tco-segment-software {
  background-color: #10b981;
}

.tco-segment-services {
  background-color: #f59e0b;
}

.tco-segment-maintenance {
  background-color: #ec4899;
}

.tco-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}

.tco-legend-item {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

.tco-legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  margin-right: 8px;
}

.dark-mode .tco-bar-container {
  background-color: #334155;
}

/* FTE Savings Calculator */
.fte-calculator {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fte-calculator-row {
  display: flex;
  align-items: center;
}

.fte-calculator-label {
  width: 160px;
  font-weight: 500;
}

.fte-calculator-bar {
  flex: 1;
  height: 24px;
  background-color: #f3f4f6;
  border-radius: 9999px;
  overflow: hidden;
  position: relative;
}

.fte-calculator-value {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  border-radius: 9999px;
  transition: width 1s ease-out;
}

.fte-calculator-savings {
  background-color: #10b981;
}

.fte-calculator-number {
  margin-left: 16px;
  font-weight: 600;
  width: 80px;
  text-align: right;
}

.dark-mode .fte-calculator-bar {
  background-color: #334155;
}

/* Breach Impact Visualization */
.breach-impact {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.breach-impact-card {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.breach-impact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.breach-impact-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ef444420;
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.breach-impact-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.breach-impact-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ef4444;
  margin-bottom: 8px;
}

.breach-impact-reduction {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #10b981;
}

.breach-impact-reduction-icon {
  margin-right: 4px;
}

.dark-mode .breach-impact-card {
  background-color: #1e293b;
}
EOF

# Create vendor comparison component CSS
cat > css/components/advanced/vendor-comparison.css << 'EOF'
/**
 * Advanced Vendor Comparison Components
 */

/* Vendor Head-to-Head Container */
.vendor-head-to-head {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: white;
  margin-bottom: 24px;
}

.vendor-head-to-head-header {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  color: white;
}

.vendor-head-to-head-title {
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
}

.vendor-head-to-head-body {
  padding: 0;
}

.vendor-comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.vendor-column {
  padding: 16px;
  position: relative;
}

.vendor-column:first-child {
  border-right: 1px solid #e5e7eb;
}

.vendor-column-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.vendor-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin-right: 12px;
}

.vendor-name {
  font-weight: 600;
  font-size: 1.25rem;
  color: #1f2937;
}

.vendor-description {
  margin-bottom: 16px;
  color: #6b7280;
}

.vendor-feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.vendor-feature-item {
  padding: 8px 0;
  display: flex;
  align-items: flex-start;
}

.vendor-feature-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  margin-top: 2px;
  flex-shrink: 0;
}

.vendor-feature-icon.plus {
  color: #10b981;
}

.vendor-feature-icon.minus {
  color: #ef4444;
}

.vendor-feature-text {
  flex: 1;
}

.vendor-comparison-footer {
  padding: 16px;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
}

.winner-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 70px;
  height: 70px;
  overflow: hidden;
}

.winner-badge::before {
  content: 'WINNER';
  position: absolute;
  top: 15px;
  right: -15px;
  transform: rotate(45deg);
  background-color: #10b981;
  color: white;
  padding: 5px 30px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Dark Mode Support */
.dark-mode .vendor-head-to-head {
  background-color: #1e293b;
}

.dark-mode .vendor-column:first-child {
  border-right: 1px solid #334155;
}

.dark-mode .vendor-column-header {
  border-bottom: 1px solid #334155;
}

.dark-mode .vendor-name {
  color: #f1f5f9;
}

.dark-mode .vendor-description {
  color: #94a3b8;
}

.dark-mode .vendor-comparison-footer {
  background-color: #0f172a;
  border-top: 1px solid #334155;
  color: #94a3b8;
}

/* Feature Comparison Matrix */
.feature-matrix {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.feature-matrix th,
.feature-matrix td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.feature-matrix th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #1f2937;
}

.feature-matrix th:not(:first-child) {
  text-align: center;
}

.feature-matrix td:not(:first-child) {
  text-align: center;
}

.feature-matrix .category-row {
  background-color: #f3f4f6;
  font-weight: 600;
}

.feature-rating {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
}

.feature-rating-10 {
  background-color: #059669;
}

.feature-rating-9,
.feature-rating-8 {
  background-color: #10b981;
}

.feature-rating-7,
.feature-rating-6 {
  background-color: #3b82f6;
}

.feature-rating-5,
.feature-rating-4 {
  background-color: #f59e0b;
}

.feature-rating-3,
.feature-rating-2 {
  background-color: #ef4444;
}

.feature-rating-1 {
  background-color: #dc2626;
}

.dark-mode .feature-matrix th,
.dark-mode .feature-matrix td {
  border-bottom: 1px solid #334155;
}

.dark-mode .feature-matrix th {
  background-color: #1e293b;
  color: #f1f5f9;
}

.dark-mode .feature-matrix .category-row {
  background-color: #0f172a;
}

/* Why Portnox Cards */
.why-portnox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.why-portnox-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.why-portnox-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.why-portnox-header {
  padding: 16px;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
}

.vs-competitor {
  display: flex;
  align-items: center;
}

.vs-competitor-logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin-right: 8px;
}

.vs-competitor-name {
  font-weight: 600;
}

.why-portnox-body {
  padding: 16px;
}

.advantage-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.advantage-item {
  padding: 8px 0;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #e5e7eb;
}

.advantage-item:last-child {
  border-bottom: none;
}

.advantage-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  margin-top: 2px;
  color: #10b981;
  flex-shrink: 0;
}

.advantage-text {
  flex: 1;
}

.why-portnox-footer {
  padding: 12px 16px;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
}

.dark-mode .why-portnox-card {
  background-color: #1e293b;
}

.dark-mode .advantage-item {
  border-bottom: 1px solid #334155;
}

.dark-mode .why-portnox-footer {
  background-color: #0f172a;
  border-top: 1px solid #334155;
  color: #94a3b8;
}

/* Vendor Comparison Radar Chart */
.radar-chart-container {
  height: 400px;
  position: relative;
}

/* Migration Timeline */
.migration-timeline-container {
  position: relative;
  padding-left: 48px;
}

.migration-timeline-container::before {
  content: '';
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #e5e7eb;
}

.migration-timeline-item {
  position: relative;
  margin-bottom: 32px;
}

.migration-timeline-marker {
  position: absolute;
  left: -48px;
  top: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  box-shadow: 0 0 0 4px white;
  z-index: 1;
}

.migration-timeline-content {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.migration-timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.migration-timeline-title {
  font-weight: 600;
  color: #1f2937;
}

.migration-timeline-duration {
  font-size: 0.875rem;
  color: #6b7280;
  display: flex;
  align-items: center;
}

.migration-timeline-duration-icon {
  margin-right: 4px;
}

.migration-timeline-body {
  color: #6b7280;
}

.migration-timeline-comparison {
  margin-top: 12px;
  display: flex;
  gap: 16px;
}

.migration-vendor-timeline {
  flex: 1;
}

.migration-vendor-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.migration-vendor-logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin-right: 8px;
}

.migration-vendor-name {
  font-weight: 500;
  color: #1f2937;
}

.migration-duration-bar {
  height: 24px;
  background-color: #f3f4f6;
  border-radius: 9999px;
  overflow: hidden;
  position: relative;
}

.migration-duration-value {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
}

.migration-duration-portnox {
  background: linear-gradient(90deg, #10b981, #059669);
}

.dark-mode .migration-timeline-container::before {
  background-color: #334155;
}

.dark-mode .migration-timeline-marker {
  box-shadow: 0 0 0 4px #1e293b;
}

.dark-mode .migration-timeline-content {
  background-color: #1e293b;
}

.dark-mode .migration-timeline-title {
  color: #f1f5f9;
}

.dark-mode .migration-timeline-duration,
.dark-mode .migration-timeline-body {
  color: #94a3b8;
}

.dark-mode .migration-vendor-name {
  color: #f1f5f9;
}

.dark-mode .migration-duration-bar {
  background-color: #334155;
}
EOF

# Create sample implementation of the modern charts.js
cat > js/charts/enhanced/modern-charts.js << 'EOF'
/**
 * Modern Charts Implementation for NAC Architecture Designer Pro
 * This file provides enhanced chart visualizations with animations and modern styling
 */

const ModernCharts = (function() {
  // Configuration
  const config = {
    colors: {
      primary: '#3b82f6',
      secondary: '#10b981',
      danger: '#ef4444',
      warning: '#f59e0b',
      info: '#6b7280',
      light: '#f3f4f6',
      dark: '#1f2937',
      cisco: '#1BA0D7',
      aruba: '#A3CE39',
      forescout: '#FF6821',
      fortinac: '#EE3124',
      microsoft: '#7FBA00',
      securew2: '#FDB715',
      portnox: '#2BD25B'
    },
    fonts: {
      base: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      heading: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    },
    darkMode: {
      backgroundColor: '#1e293b',
      textColor: '#f1f5f9',
      gridColor: '#334155'
    }
  };

  // Chart.js Global Configuration
  function setupChartJS() {
    if (typeof Chart !== 'undefined') {
      Chart.defaults.font.family = config.fonts.base;
      Chart.defaults.font.size = 12;
      Chart.defaults.animation.duration = 1000;
      Chart.defaults.animation.easing = 'easeOutQuart';
      Chart.defaults.elements.bar.borderRadius = 4;
      Chart.defaults.elements.point.radius = 4;
      Chart.defaults.elements.point.hoverRadius = 6;
      Chart.defaults.elements.line.tension = 0.3;
      
      // Custom Plugin for Gradient Backgrounds
      const gradientPlugin = {
        id: 'gradientFill',
        beforeDatasetsDraw(chart, _, options) {
          const { ctx, chartArea: { top, bottom, left, width, height } } = chart;
          
          if (chart.config.type === 'bar' || chart.config.type === 'line') {
            chart.data.datasets.forEach((dataset, i) => {
              if (dataset.useGradient) {
                const gradient = ctx.createLinearGradient(0, top, 0, bottom);
                gradient.addColorStop(0, dataset.backgroundColor);
                gradient.addColorStop(1, chart.options.plugins.gradientFill?.endColor || 'rgba(255, 255, 255, 0.1)');
                dataset.backgroundColor = gradient;
              }
            });
          }
        }
      };
      
      Chart.register(gradientPlugin);
    }
  }
  
  // Initialize chart styles based on dark mode
  function updateChartStyles(isDarkMode) {
    if (typeof Chart !== 'undefined') {
      Chart.defaults.color = isDarkMode ? config.darkMode.textColor : config.colors.dark;
      Chart.defaults.scale.grid.color = isDarkMode ? config.darkMode.gridColor : '#e5e7eb';
      
      // Update all existing charts
      Chart.instances.forEach(chart => {
        chart.options.scales.x.grid.color = isDarkMode ? config.darkMode.gridColor : '#e5e7eb';
        chart.options.scales.y.grid.color = isDarkMode ? config.darkMode.gridColor : '#e5e7eb';
        chart.update();
      });
    }
  }
  
  // TCO Comparison Chart
  function createTCOComparisonChart(ctx, data, options = {}) {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Default configuration for TCO comparison
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        delay: (context) => context.dataIndex * 100
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: isDarkMode ? config.darkMode.backgroundColor : 'white',
          titleColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          bodyColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          borderColor: isDarkMode ? config.darkMode.gridColor : '#e5e7eb',
          borderWidth: 1,
          cornerRadius: 8,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            label: (context) => {
              return ` ${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => {
              return '$' + value.toLocaleString();
            }
          }
        }
      }
    };
    
    const chartOptions = { ...defaultOptions, ...options };
    
    return new Chart(ctx, {
      type: 'bar',
      data: data,
      options: chartOptions
    });
  }
  
  // Cumulative Cost Chart
  function createCumulativeCostChart(ctx, data, options = {}) {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        delay: (context) => context.dataIndex * 100
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: isDarkMode ? config.darkMode.backgroundColor : 'white',
          titleColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          bodyColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          borderColor: isDarkMode ? config.darkMode.gridColor : '#e5e7eb',
          borderWidth: 1,
          cornerRadius: 8,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            label: (context) => {
              return ` ${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => {
              return '$' + value.toLocaleString();
            }
          }
        }
      }
    };
    
    const chartOptions = { ...defaultOptions, ...options };
    
    return new Chart(ctx, {
      type: 'line',
      data: data,
      options: chartOptions
    });
  }
  
  // Cost Breakdown Chart
  function createCostBreakdownChart(ctx, data, options = {}) {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: isDarkMode ? config.darkMode.backgroundColor : 'white',
          titleColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          bodyColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          borderColor: isDarkMode ? config.darkMode.gridColor : '#e5e7eb',
          borderWidth: 1,
          cornerRadius: 8,
          boxPadding: 6,
          callbacks: {
            label: (context) => {
              const value = context.raw;
              const total = context.chart.data.datasets[0].data.reduce((sum, val) => sum + val, 0);
              const percentage = Math.round((value / total) * 100);
              return ` ${context.label}: $${value.toLocaleString()} (${percentage}%)`;
            }
          }
        }
      }
    };
    
    const chartOptions = { ...defaultOptions, ...options };
    
    return new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: chartOptions
    });
  }
  
  // Feature Comparison Chart (Radar)
  function createFeatureComparisonChart(ctx, data, options = {}) {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 3,
          hoverRadius: 5
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: isDarkMode ? config.darkMode.backgroundColor : 'white',
          titleColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          bodyColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          borderColor: isDarkMode ? config.darkMode.gridColor : '#e5e7eb',
          borderWidth: 1,
          cornerRadius: 8,
          boxPadding: 6,
          usePointStyle: true
        }
      },
      scales: {
        r: {
          min: 0,
          max: 10,
          ticks: {
            stepSize: 2,
            showLabelBackdrop: false,
            font: {
              size: 10
            }
          },
          pointLabels: {
            font: {
              size: 12
            }
          },
          grid: {
            color: isDarkMode ? config.darkMode.gridColor : '#e5e7eb'
          },
          angleLines: {
            color: isDarkMode ? config.darkMode.gridColor : '#e5e7eb'
          }
        }
      }
    };
    
    const chartOptions = { ...defaultOptions, ...options };
    
    return new Chart(ctx, {
      type: 'radar',
      data: data,
      options: chartOptions
    });
  }
  
  // Implementation Comparison Chart
  function createImplementationComparisonChart(ctx, data, options = {}) {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      animation: {
        delay: (context) => context.dataIndex * 100
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: isDarkMode ? config.darkMode.backgroundColor : 'white',
          titleColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          bodyColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          borderColor: isDarkMode ? config.darkMode.gridColor : '#e5e7eb',
          borderWidth: 1,
          cornerRadius: 8,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            label: (context) => {
              return ` ${context.dataset.label}: ${context.parsed.x} days`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: (value) => {
              return value + ' days';
            }
          }
        },
        y: {
          grid: {
            display: false
          }
        }
      }
    };
    
    const chartOptions = { ...defaultOptions, ...options };
    
    return new Chart(ctx, {
      type: 'bar',
      data: data,
      options: chartOptions
    });
  }
  
  // ROI Chart
  function createROIChart(ctx, data, options = {}) {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        delay: (context) => context.dataIndex * 100
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: isDarkMode ? config.darkMode.backgroundColor : 'white',
          titleColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          bodyColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          borderColor: isDarkMode ? config.darkMode.gridColor : '#e5e7eb',
          borderWidth: 1,
          cornerRadius: 8,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            label: (context) => {
              return ` ${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => {
              return '$' + value.toLocaleString();
            }
          }
        }
      }
    };
    
    const chartOptions = { ...defaultOptions, ...options };
    
    return new Chart(ctx, {
      type: 'line',
      data: data,
      options: chartOptions
    });
  }
  
  // Risk Analysis Chart
  function createRiskAnalysisChart(ctx, data, options = {}) {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: isDarkMode ? config.darkMode.backgroundColor : 'white',
          titleColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          bodyColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          borderColor: isDarkMode ? config.darkMode.gridColor : '#e5e7eb',
          borderWidth: 1,
          cornerRadius: 8,
          boxPadding: 6,
          callbacks: {
            label: (context) => {
              const value = context.raw;
              const total = context.chart.data.datasets[0].data.reduce((sum, val) => sum + val, 0);
              const percentage = Math.round((value / total) * 100);
              return ` ${context.label}: $${value.toLocaleString()} (${percentage}%)`;
            }
          }
        }
      }
    };
    
    const chartOptions = { ...defaultOptions, ...options };
    
    return new Chart(ctx, {
      type: 'polarArea',
      data: data,
      options: chartOptions
    });
  }
  
  // Sensitivity Analysis Chart
  function createSensitivityChart(ctx, data, options = {}) {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        delay: (context) => context.dataIndex * 50
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: isDarkMode ? config.darkMode.backgroundColor : 'white',
          titleColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          bodyColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
          borderColor: isDarkMode ? config.darkMode.gridColor : '#e5e7eb',
          borderWidth: 1,
          cornerRadius: 8,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            label: (context) => {
              return ` ${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: isDarkMode ? config.darkMode.gridColor : '#e5e7eb'
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => {
              return '$' + value.toLocaleString();
            }
          },
          grid: {
            color: isDarkMode ? config.darkMode.gridColor : '#e5e7eb'
          }
        }
      }
    };
    
    const chartOptions = { ...defaultOptions, ...options };
    
    return new Chart(ctx, {
      type: 'line',
      data: data,
      options: chartOptions
    });
  }
  
  // Risk Heatmap Chart using D3.js
  function createRiskHeatmap(selector, data, options = {}) {
    if (typeof d3 === 'undefined') {
      console.error('D3.js is required for the risk heatmap');
      return;
    }
    
    const container = d3.select(selector);
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Clear any existing content
    container.html('');
    
    const width = container.node().getBoundingClientRect().width;
    const height = 400;
    
    const defaultOptions = {
      margin: { top: 30, right: 30, bottom: 30, left: 30 },
      colorRange: ['#10b981', '#f59e0b', '#ef4444'],
      textColor: isDarkMode ? config.darkMode.textColor : config.colors.dark,
      backgroundColor: isDarkMode ? config.darkMode.backgroundColor : 'white'
    };
    
    const chartOptions = { ...defaultOptions, ...options };
    
    const colorScale = d3.scaleSequential()
      .domain([0, data.length - 1])
      .interpolator(d3.interpolate(chartOptions.colorRange[0], chartOptions.colorRange[2]));
    
    const svg = container.append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${chartOptions.margin.left},${chartOptions.margin.top})`);
    
    const xScale = d3.scaleBand()
      .domain(['Low', 'Medium', 'High', 'Critical'])
      .range([0, width - chartOptions.margin.left - chartOptions.margin.right])
      .padding(0.05);
    
    const yScale = d3.scaleBand()
      .domain(['Unlikely', 'Possible', 'Likely', 'Very Likely', 'Almost Certain'])
      .range([height - chartOptions.margin.top - chartOptions.margin.bottom, 0])
      .padding(0.05);
    
    // Create x-axis
    svg.append('g')
      .style('font-size', '12px')
      .style('color', chartOptions.textColor)
      .attr('transform', `translate(0,${height - chartOptions.margin.top - chartOptions.margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSize(0))
      .select('.domain').remove();
    
    // Create y-axis
    svg.append('g')
      .style('font-size', '12px')
      .style('color', chartOptions.textColor)
      .call(d3.axisLeft(yScale).tickSize(0))
      .select('.domain').remove();
    
    // Create the heatmap cells
    svg.selectAll()
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.impact))
      .attr('y', d => yScale(d.likelihood))
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .style('fill', (d, i) => colorScale(i))
      .style('stroke', 'white')
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 50)
      .style('opacity', 1);
    
    // Add text labels
    svg.selectAll()
      .data(data)
      .enter()
      .append('text')
      .attr('x', d => xScale(d.impact) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.likelihood) + yScale.bandwidth() / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .style('font-size', '12px')
      .style('font-weight', '600')
      .style('fill', 'white')
      .style('opacity', 0)
      .text(d => d.score)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 50 + 500)
      .style('opacity', 1);
    
    // Add title
    svg.append('text')
      .attr('x', (width - chartOptions.margin.left - chartOptions.margin.right) / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', '600')
      .style('fill', chartOptions.textColor)
      .text('Risk Assessment Heatmap');
  }
  
  // Create a Compliance Matrix Chart
  function createComplianceMatrix(selector, data, options = {}) {
    const container = document.querySelector(selector);
    
    if (!container) {
      console.error('Container not found');
      return;
    }
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Clear any existing content
    container.innerHTML = '';
    
    const defaultOptions = {
      headerColors: {
        background: isDarkMode ? '#1e293b' : '#f3f4f6',
        text: isDarkMode ? '#f1f5f9' : '#1f2937'
      },
      cellColors: {
        background: isDarkMode ? '#0f172a' : 'white',
        text: isDarkMode ? '#f1f5f9' : '#1f2937'
      },
      statusColors: {
        full: '#10b981',
        partial: '#f59e0b',
        none: '#ef4444'
      }
    };
    
    const chartOptions = { ...defaultOptions, ...options };
    
    const matrix = document.createElement('div');
    matrix.className = 'compliance-matrix';
    container.appendChild(matrix);
    
    // Create headers
    const headerRow = document.createElement('div');
    headerRow.className = 'compliance-matrix-row';
    headerRow.style.display = 'grid';
    headerRow.style.gridTemplateColumns = `200px repeat(${data.vendors.length}, 1fr)`;
    matrix.appendChild(headerRow);
    
    // Framework header
    const frameworkHeader = document.createElement('div');
    frameworkHeader.className = 'compliance-matrix-cell compliance-matrix-header';
    frameworkHeader.textContent = 'Framework';
    frameworkHeader.style.backgroundColor = chartOptions.headerColors.background;
    frameworkHeader.style.color = chartOptions.headerColors.text;
    headerRow.appendChild(frameworkHeader);
    
    // Vendor headers
    data.vendors.forEach(vendor => {
      const vendorHeader = document.createElement('div');
      vendorHeader.className = 'compliance-matrix-cell compliance-matrix-header';
      vendorHeader.textContent = vendor.name;
      vendorHeader.style.backgroundColor = chartOptions.headerColors.background;
      vendorHeader.style.color = chartOptions.headerColors.text;
      headerRow.appendChild(vendorHeader);
    });
    
    // Create rows for each framework
    data.frameworks.forEach((framework, index) => {
      const frameworkRow = document.createElement('div');
      frameworkRow.className = 'compliance-matrix-row stagger-item fade-in';
      frameworkRow.style.display = 'grid';
      frameworkRow.style.gridTemplateColumns = `200px repeat(${data.vendors.length}, 1fr)`;
      frameworkRow.style.animationDelay = `${index * 100}ms`;
      matrix.appendChild(frameworkRow);
      
      // Framework name
      const frameworkName = document.createElement('div');
      frameworkName.className = 'compliance-matrix-cell';
      frameworkName.textContent = framework.name;
      frameworkName.style.backgroundColor = chartOptions.cellColors.background;
      frameworkName.style.color = chartOptions.cellColors.text;
      frameworkName.style.fontWeight = '500';
      frameworkRow.appendChild(frameworkName);
      
      // Vendor compliance statuses
      data.vendors.forEach(vendor => {
        const compliance = framework.compliance[vendor.id];
        const complianceCell = document.createElement('div');
        complianceCell.className = 'compliance-matrix-cell';
        complianceCell.style.backgroundColor = chartOptions.cellColors.background;
        complianceCell.style.justifyContent = 'center';
        frameworkRow.appendChild(complianceCell);
        
        // Create status indicator
        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'compliance-status';
        
        if (compliance === 'full') {
          statusIndicator.classList.add('compliance-full');
          statusIndicator.style.backgroundColor = chartOptions.statusColors.full;
          statusIndicator.innerHTML = '<i class="fas fa-check"></i>';
        } else if (compliance === 'partial') {
          statusIndicator.classList.add('compliance-partial');
          statusIndicator.style.backgroundColor = chartOptions.statusColors.partial;
          statusIndicator.innerHTML = '<i class="fas fa-adjust"></i>';
        } else {
          statusIndicator.classList.add('compliance-none');
          statusIndicator.style.backgroundColor = chartOptions.statusColors.none;
          statusIndicator.innerHTML = '<i class="fas fa-times"></i>';
        }
        
        complianceCell.appendChild(statusIndicator);
      });
    });
  }
  
  // Create Migration Timeline
  function createMigrationTimeline(selector, data, options = {}) {
    const container = document.querySelector(selector);
    
    if (!container) {
      console.error('Container not found');
      return;
    }
    
    // Clear any existing content
    container.innerHTML = '';
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    const defaultOptions = {
      textColor: isDarkMode ? '#f1f5f9' : '#1f2937',
      secondaryTextColor: isDarkMode ? '#94a3b8' : '#6b7280',
      vendorColors: {
        cisco: config.colors.cisco,
        aruba: config.colors.aruba,
        forescout: config.colors.forescout,
        fortinac: config.colors.fortinac,
        microsoft: config.colors.microsoft,
        securew2: config.colors.securew2,
        portnox: config.colors.portnox
      }
    };
    
    const chartOptions = { ...defaultOptions, ...options };
    
    const timeline = document.createElement('div');
    timeline.className = 'migration-timeline-container';
    container.appendChild(timeline);
    
    // Create timeline items
    data.phases.forEach((phase, index) => {
      const timelineItem = document.createElement('div');
      timelineItem.className = 'migration-timeline-item stagger-item slide-in-up';
      timelineItem.style.animationDelay = `${index * 200}ms`;
      timeline.appendChild(timelineItem);
      
      // Phase marker
      const marker = document.createElement('div');
      marker.className = 'migration-timeline-marker';
      marker.textContent = index + 1;
      timelineItem.appendChild(marker);
      
      // Phase content
      const content = document.createElement('div');
      content.className = 'migration-timeline-content';
      timelineItem.appendChild(content);
      
      // Phase header
      const header = document.createElement('div');
      header.className = 'migration-timeline-header';
      content.appendChild(header);
      
      // Phase title
      const title = document.createElement('div');
      title.className = 'migration-timeline-title';
      title.textContent = phase.name;
      title.style.color = chartOptions.textColor;
      header.appendChild(title);
      
      // Phase body
      const body = document.createElement('div');
      body.className = 'migration-timeline-body';
      body.textContent = phase.description;
      body.style.color = chartOptions.secondaryTextColor;
      content.appendChild(body);
      
      // Vendor comparison
      const comparison = document.createElement('div');
      comparison.className = 'migration-timeline-comparison';
      content.appendChild(comparison);
      
      // Competitor timeline
      const competitorTimeline = document.createElement('div');
      competitorTimeline.className = 'migration-vendor-timeline';
      comparison.appendChild(competitorTimeline);
      
      const competitorHeader = document.createElement('div');
      competitorHeader.className = 'migration-vendor-header';
      competitorTimeline.appendChild(competitorHeader);
      
      // Competitor logo (placeholder)
      const competitorLogo = document.createElement('div');
      competitorLogo.className = 'migration-vendor-logo';
      competitorLogo.style.backgroundColor = chartOptions.vendorColors[data.competitor.id];
      competitorLogo.style.width = '16px';
      competitorLogo.style.height = '16px';
      competitorLogo.style.borderRadius = '50%';
      competitorHeader.appendChild(competitorLogo);
      
      // Competitor name
      const competitorName = document.createElement('div');
      competitorName.className = 'migration-vendor-name';
      competitorName.textContent = data.competitor.name;
      competitorName.style.color = chartOptions.textColor;
      competitorHeader.appendChild(competitorName);
      
      // Competitor duration bar
      const competitorBar = document.createElement('div');
      competitorBar.className = 'migration-duration-bar';
      competitorTimeline.appendChild(competitorBar);
      
      const competitorDuration = document.createElement('div');
      competitorDuration.className = 'migration-duration-value';
      competitorDuration.style.width = '100%';
      competitorDuration.style.backgroundColor = chartOptions.vendorColors[data.competitor.id];
      competitorDuration.textContent = `${phase.competitorDuration} ${phase.competitorDuration === 1 ? 'day' : 'days'}`;
      competitorBar.appendChild(competitorDuration);
      
      // Portnox timeline
      const portnoxTimeline = document.createElement('div');
      portnoxTimeline.className = 'migration-vendor-timeline';
      comparison.appendChild(portnoxTimeline);
      
      const portnoxHeader = document.createElement('div');
      portnoxHeader.className = 'migration-vendor-header';
      portnoxTimeline.appendChild(portnoxHeader);
      
      // Portnox logo (placeholder)
      const portnoxLogo = document.createElement('div');
      portnoxLogo.className = 'migration-vendor-logo';
      portnoxLogo.style.backgroundColor = chartOptions.vendorColors.portnox;
      portnoxLogo.style.width = '16px';
      portnoxLogo.style.height = '16px';
      portnoxLogo.style.borderRadius = '50%';
      portnoxHeader.appendChild(portnoxLogo);
      
      // Portnox name
      const portnoxName = document.createElement('div');
      portnoxName.className = 'migration-vendor-name';
      portnoxName.textContent = 'Portnox Cloud';
      portnoxName.style.color = chartOptions.textColor;
      portnoxHeader.appendChild(portnoxName);
      
      // Portnox duration bar
      const portnoxBar = document.createElement('div');
      portnoxBar.className = 'migration-duration-bar';
      portnoxTimeline.appendChild(portnoxBar);
      
      // Calculate percentage based on the ratio
      const percentage = (phase.portnoxDuration / phase.competitorDuration) * 100;
      
      const portnoxDuration = document.createElement('div');
      portnoxDuration.className = 'migration-duration-value migration-duration-portnox';
      portnoxDuration.style.width = `${percentage}%`;
      portnoxDuration.style.backgroundColor = chartOptions.vendorColors.portnox;
      portnoxDuration.textContent = `${phase.portnoxDuration} ${phase.portnoxDuration === 1 ? 'day' : 'days'}`;
      portnoxBar.appendChild(portnoxDuration);
    });
  }
  
  // Public API
  return {
    setup: function() {
      setupChartJS();
    },
    updateDarkMode: function(isDarkMode) {
      updateChartStyles(isDarkMode);
    },
    charts: {
      tcoComparison: createTCOComparisonChart,
      cumulativeCost: createCumulativeCostChart,
      costBreakdown: createCostBreakdownChart,
      featureComparison: createFeatureComparisonChart,
      implementationComparison: createImplementationComparisonChart,
      roi: createROIChart,
      riskAnalysis: createRiskAnalysisChart,
      sensitivity: createSensitivityChart,
      riskHeatmap: createRiskHeatmap,
      complianceMatrix: createComplianceMatrix,
      migrationTimeline: createMigrationTimeline
    },
    colors: config.colors
  };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  ModernCharts.setup();
  
  // Listen for dark mode changes
  document.addEventListener('darkModeChanged', function(e) {
    ModernCharts.updateDarkMode(e.detail.isDarkMode);
  });
});
EOF

# Create vendor comparison JavaScript
cat > js/vendor-comparisons/vendor-advantages.js << 'EOF'
/**
 * Vendor Advantages Module
 * Provides detailed vendor comparison data and visualization functions
 */

const VendorAdvantages = (function() {
  // Vendor data
  const vendors = {
    cisco: {
      id: 'cisco',
      name: 'Cisco ISE',
      logo: 'img/vendors/cisco-logo.png',
      description: 'Comprehensive on-premises NAC solution with extensive enterprise features.',
      type: 'On-Premises',
      deploymentTime: '3-6 months',
      implementation: {
        complexity: 'High',
        expertise: 'Cisco Certified Network Professional (CCNP)',
        resources: '1-2 FTE',
        hardware: 'Dedicated appliances or VMs',
        support: 'Enterprise support required'
      },
      strengths: [
        'Comprehensive network policy management',
        'Deep integration with Cisco network infrastructure',
        'Advanced device profiling',
        'Strong ecosystem of security integrations',
        'Extensive compliance features'
      ],
      weaknesses: [
        'Complex deployment and configuration',
        'High hardware and licensing costs',
        'Significant IT overhead for maintenance',
        'Requires specialized expertise',
        'Long implementation timelines'
      ]
    },
    aruba: {
      id: 'aruba',
      name: 'Aruba ClearPass',
      logo: 'img/vendors/aruba-logo.png',
      description: 'Advanced NAC solution from HPE Aruba with strong multi-vendor support.',
      type: 'On-Premises',
      deploymentTime: '2-4 months',
      implementation: {
        complexity: 'Medium-High',
        expertise: 'Network and security specialists',
        resources: '0.5-1 FTE',
        hardware: 'Dedicated appliances or VMs',
        support: 'Enterprise support recommended'
      },
      strengths: [
        'Strong multi-vendor support',
        'Excellent guest management',
        'Flexible policy model',
        'Integration with MDM solutions',
        'Built-in vulnerability assessment'
      ],
      weaknesses: [
        'Complex configuration interface',
        'Significant hardware requirements',
        'Lengthy implementation process',
        'High licensing costs',
        'Ongoing maintenance overhead'
      ]
    },
    forescout: {
      id: 'forescout',
      name: 'Forescout',
      logo: 'img/vendors/forescout-logo.png',
      description: 'Specialized in device visibility and control with agentless capabilities.',
      type: 'On-Premises',
      deploymentTime: '2-4 months',
      implementation: {
        complexity: 'Medium-High',
        expertise: 'Network security specialists',
        resources: '0.5-1 FTE',
        hardware: 'Dedicated appliances',
        support: 'Enterprise support required'
      },
      strengths: [
        'Agentless device discovery',
        'Extensive OT/IoT device support',
        'Strong network visibility',
        'Real-time monitoring capabilities',
        'Integration with security tools'
      ],
      weaknesses: [
        'High licensing costs',
        'Complex deployment',
        'Significant hardware requirements',
        'Requires specialized expertise',
        'Ongoing maintenance overhead'
      ]
    },
    fortinac: {
      id: 'fortinac',
      name: 'FortiNAC',
      logo: 'img/vendors/fortinac-logo.png',
      description: 'Security-focused NAC solution integrated with Fortinet Security Fabric.',
      type: 'On-Premises',
      deploymentTime: '1-3 months',
      implementation: {
        complexity: 'Medium',
        expertise: 'Network security specialists',
        resources: '0.5-1 FTE',
        hardware: 'Dedicated appliances or VMs',
        support: 'Enterprise support recommended'
      },
      strengths: [
        'Integration with Fortinet Security Fabric',
        'Protection against IoT threats',
        'Automated threat response',
        'Network access control',
        'Device visibility'
      ],
      weaknesses: [
        'Limited multi-vendor support',
        'Less mature than competitors',
        'Complex policy management',
        'Hardware requirements',
        'Ongoing maintenance needs'
      ]
    },
    nps: {
      id: 'nps',
      name: 'Microsoft NPS',
      logo: 'img/vendors/microsoft-logo.png',
      description: 'Basic Windows-integrated NAC solution with limited capabilities.',
      type: 'On-Premises',
      deploymentTime: '2-4 weeks',
      implementation: {
        complexity: 'Low-Medium',
        expertise: 'Windows Server administrators',
        resources: '0.25-0.5 FTE',
        hardware: 'Windows Server',
        support: 'Standard Microsoft support'
      },
      strengths: [
        'Included with Windows Server',
        'Simple Windows integration',
        'Basic authentication capabilities',
        'Low initial cost',
        'Familiar Windows administration'
      ],
      weaknesses: [
        'Very limited feature set',
        'Basic device visibility',
        'Limited authentication options',
        'Minimal IoT support',
        'Windows-centric environment required'
      ]
    },
    securew2: {
      id: 'securew2',
      name: 'SecureW2',
      logo: 'img/vendors/securew2-logo.png',
      description: 'Certificate-focused authentication specialist with cloud management.',
      type: 'Cloud/Hybrid',
      deploymentTime: '1-3 weeks',
      implementation: {
        complexity: 'Medium',
        expertise: 'Certificate and PKI specialists',
        resources: '0.25-0.5 FTE',
        hardware: 'None (cloud-based)',
        support: 'Vendor support included'
      },
      strengths: [
        'Certificate-based authentication expertise',
        'Modern cloud management',
        'Strong integration with identity providers',
        'Passwordless capabilities',
        'Simplified certificate enrollment'
      ],
      weaknesses: [
        'Limited full NAC capabilities',
        'Focused primarily on certificates',
        'Less comprehensive device control',
        'Requires integration with existing systems',
        'May need complementary solutions'
      ]
    },
    portnox: {
      id: 'portnox',
      name: 'Portnox Cloud',
      logo: 'img/vendors/portnox-logo.png',
      description: 'True cloud-native NAC with rapid deployment and simplified management.',
      type: 'Cloud-Native',
      deploymentTime: '1-7 days',
      implementation: {
        complexity: 'Low',
        expertise: 'General IT skills',
        resources: '0.1-0.25 FTE',
        hardware: 'None (cloud-native)',
        support: 'Vendor support included'
      },
      strengths: [
        'Rapid deployment (days vs. months)',
        'No hardware requirements',
        'Minimal IT overhead',
        'Automatic updates and maintenance',
        'AI-powered device fingerprinting'
      ],
      weaknesses: [
        'Newer platform in the market',
        'Internet dependency',
        'Limited on-premises control',
        'Fewer integration points than established vendors',
        'Simpler feature set than enterprise solutions'
      ]
    }
  };
  
  // Comparison data - Portnox advantages over each competitor
  const portnoxAdvantages = {
    cisco: [
      {
        category: 'Deployment & Implementation',
        items: [
          '1-7 days implementation vs. 3-6 months',
          'No hardware procurement or setup',
          'No specialized expertise required',
          'Zero-touch remote location deployment',
          'Near-immediate feature availability'
        ]
      },
      {
        category: 'Operational Costs',
        items: [
          '65-75% lower TCO',
          'No hardware maintenance costs',
          'No infrastructure upgrade costs',
          'Automatic updates without downtime',
          'Reduced IT staff requirements (0.1-0.25 FTE vs. 1-2 FTE)'
        ]
      },
      {
        category: 'Management & Maintenance',
        items: [
          'Intuitive cloud interface vs. complex console',
          'No version upgrades or patches to manage',
          'Centralized management for all locations',
          'No database maintenance required',
          'No performance tuning or capacity planning'
        ]
      },
      {
        category: 'Scalability & Flexibility',
        items: [
          'Instant elastic scaling',
          'No additional hardware for expansion',
          'Consistent performance regardless of scale',
          'Global deployment from central console',
          'No "per-appliance" limitations'
        ]
      }
    ],
    aruba: [
      {
        category: 'Deployment & Implementation',
        items: [
          '1-7 days implementation vs. 2-4 months',
          'No hardware requirements',
          'General IT skills vs. specialized expertise',
          'Simplified configuration process',
          'Automated deployment workflows'
        ]
      },
      {
        category: 'Operational Costs',
        items: [
          '60-70% lower TCO',
          'Elimination of hardware costs',
          'Reduced management overhead',
          'Subscription-based predictable pricing',
          'Minimal training requirements'
        ]
      },
      {
        category: 'Management & Maintenance',
        items: [
          'Modern cloud interface vs. complex portal',
          'Automatic updates and new features',
          'No database maintenance',
          'Simplified policy management',
          'Centralized visibility across all locations'
        ]
      },
      {
        category: 'Scalability & Flexibility',
        items: [
          'On-demand scaling without hardware',
          'Remote location support without appliances',
          'Consistent performance at all scales',
          'Quick adaptation to changing requirements',
          'Support for distributed workforce'
        ]
      }
    ],
    forescout: [
      {
        category: 'Deployment & Implementation',
        items: [
          '1-7 days implementation vs. 2-4 months',
          'No costly appliances required',
          'Simplified network integration',
          'Lower expertise requirements',
          'Faster time to value'
        ]
      },
      {
        category: 'Operational Costs',
        items: [
          '55-65% lower TCO',
          'No hardware refresh costs',
          'Lower ongoing maintenance costs',
          'Reduced personnel requirements',
          'Predictable subscription pricing'
        ]
      },
      {
        category: 'Management & Maintenance',
        items: [
          'Automatic updates vs. manual upgrades',
          'Simplified policy management',
          'No infrastructure tuning required',
          'Reduced administrative overhead',
          'Modern cloud interface'
        ]
      },
      {
        category: 'Visibility & Control',
        items: [
          'Comparable device identification capabilities',
          'AI-powered device fingerprinting',
          '260,000+ device fingerprints',
          'Cloud-enhanced threat intelligence',
          'Cross-customer anonymized data insights'
        ]
      }
    ],
    fortinac: [
      {
        category: 'Deployment & Implementation',
        items: [
          '1-7 days implementation vs. 1-3 months',
          'No hardware procurement',
          'Simplified network integration',
          'Less networking expertise required',
          'Faster time to protection'
        ]
      },
      {
        category: 'Operational Costs',
        items: [
          '50-60% lower TCO',
          'Elimination of appliance costs',
          'Reduced maintenance overhead',
          'Less IT staff time required',
          'No infrastructure upgrade costs'
        ]
      },
      {
        category: 'Management & Maintenance',
        items: [
          'Simpler policy management',
          'Automatic updates and enhancements',
          'Continuous firmware security',
          'No version management',
          'Reduced complexity'
        ]
      },
      {
        category: 'Vendor-Agnostic Approach',
        items: [
          'Multi-vendor support vs. Fortinet-focused',
          'Neutrality in network architecture',
          'Works with all switching vendors',
          'Seamless integration with diverse environments',
          'No vendor lock-in'
        ]
      }
    ],
    nps: [
      {
        category: 'Capabilities & Features',
        items: [
          'Full NAC solution vs. basic authentication',
          'Advanced device fingerprinting',
          'Comprehensive policy controls',
          'Detailed visibility and analytics',
          'Broader compliance capabilities'
        ]
      },
      {
        category: 'Management & Administration',
        items: [
          'Modern cloud interface vs. Windows Server tools',
          'Purpose-built for NAC vs. general RADIUS server',
          'Simplified certificate management',
          'Automated device onboarding',
          'Enhanced guest management'
        ]
      },
      {
        category: 'Scalability & Performance',
        items: [
          'Cloud-native elastic scaling',
          'Consistent performance regardless of load',
          'Global deployment capabilities',
          'No Windows Server dependencies',
          'Cross-platform support'
        ]
      },
      {
        category: 'Security & Compliance',
        items: [
          'Purpose-built security features',
          'Advanced compliance automation',
          'Continuous security updates',
          'Modern authentication methods',
          'Broader regulatory support'
        ]
      }
    ],
    securew2: [
      {
        category: 'NAC Capabilities',
        items: [
          'Complete NAC solution vs. certificate focus',
          'Comprehensive device control',
          'Broader authentication methods',
          'Advanced policy enforcement',
          'More extensive compliance controls'
        ]
      },
      {
        category: 'Device Visibility',
        items: [
          'AI-powered device fingerprinting',
          '260,000+ device fingerprints',
          'Enhanced device classification',
          'Detailed visibility dashboards',
          'Greater context for decision-making'
        ]
      },
      {
        category: 'Operational Simplicity',
        items: [
          'Single platform for all NAC needs',
          'All-inclusive solution vs. component approach',
          'Streamlined management interface',
          'Less integration complexity',
          'Simplified deployment'
        ]
      },
      {
        category: 'Cost Efficiency',
        items: [
          'All-in-one pricing model',
          'No need for complementary solutions',
          'Lower total implementation costs',
          'Reduced integration expenses',
          'Better cost predictability'
        ]
      }
    ]
  };
  
  // Feature comparison matrix data
  const featureMatrix = {
    categories: [
      {
        name: 'Deployment',
        features: [
          { name: 'Cloud-Native Architecture', description: 'True SaaS platform built for the cloud' },
          { name: 'On-Premises Deployment', description: 'Traditional deployment on company hardware' },
          { name: 'Hybrid Deployment', description: 'Mix of cloud and on-premises components' },
          { name: 'Deployment Timeline', description: 'Time required for full implementation' },
          { name: 'Hardware Requirements', description: 'Physical infrastructure needed' }
        ]
      },
      {
        name: 'Authentication & Access',
        features: [
          { name: '802.1X Support', description: 'Standard port-based network access control' },
          { name: 'Certificate-Based Auth', description: 'Using digital certificates for authentication' },
          { name: 'RADIUS Service', description: 'Authentication, Authorization, and Accounting' },
          { name: 'TACACS+ Support', description: 'Network device administration protocol' },
          { name: 'Cloud Identity Support', description: 'Integration with cloud identity providers' }
        ]
      },
      {
        name: 'Device Management',
        features: [
          { name: 'Device Fingerprinting', description: 'Automatic device identification' },
          { name: 'BYOD Support', description: 'Bring Your Own Device management' },
          { name: 'IoT Device Support', description: 'Internet of Things device management' },
          { name: 'Guest Management', description: 'Temporary access for visitors' },
          { name: 'Agentless Operation', description: 'Functions without endpoint agents' }
        ]
      },
      {
        name: 'Management & Operations',
        features: [
          { name: 'Automatic Updates', description: 'Software updates without manual intervention' },
          { name: 'Multi-Site Management', description: 'Centralized control of distributed locations' },
          { name: 'API Availability', description: 'Programmable interfaces for integration' },
          { name: 'Operational Overhead', description: 'Ongoing management requirements' },
          { name: 'Implementation Complexity', description: 'Difficulty of initial setup' }
        ]
      },
      {
        name: 'Security & Compliance',
        features: [
          { name: 'Zero Trust Support', description: 'Never trust, always verify architecture' },
          { name: 'Posture Assessment', description: 'Endpoint security state evaluation' },
          { name: 'Compliance Reporting', description: 'Automated regulatory compliance' },
          { name: 'Threat Response', description: 'Automated actions based on security threats' },
          { name: 'Vulnerability Management', description: 'Identification and remediation of vulnerabilities' }
        ]
      }
    ],
    vendors: [
      { id: 'cisco', name: 'Cisco ISE' },
      { id: 'aruba', name: 'Aruba ClearPass' },
      { id: 'forescout', name: 'Forescout' },
      { id: 'fortinac', name: 'FortiNAC' },
      { id: 'nps', name: 'Microsoft NPS' },
      { id: 'securew2', name: 'SecureW2' },
      { id: 'portnox', name: 'Portnox Cloud' }
    ],
    ratings: {
      cisco: {
        'Cloud-Native Architecture': 3,
        'On-Premises Deployment': 10,
        'Hybrid Deployment': 7,
        'Deployment Timeline': 2,
        'Hardware Requirements': 2,
        '802.1X Support': 10,
        'Certificate-Based Auth': 9,
        'RADIUS Service': 10,
        'TACACS+ Support': 10,
        'Cloud Identity Support': 6,
        'Device Fingerprinting': 8,
        'BYOD Support': 9,
        'IoT Device Support': 8,
        'Guest Management': 9,
        'Agentless Operation': 6,
        'Automatic Updates': 4,
        'Multi-Site Management': 7,
        'API Availability': 8,
        'Operational Overhead': 3,
        'Implementation Complexity': 2,
        'Zero Trust Support': 8,
        'Posture Assessment': 9,
        'Compliance Reporting': 9,
        'Threat Response': 8,
        'Vulnerability Management': 8
      },
      aruba: {
        'Cloud-Native Architecture': 4,
        'On-Premises Deployment': 9,
        'Hybrid Deployment': 8,
        'Deployment Timeline': 3,
        'Hardware Requirements': 3,
        '802.1X Support': 10,
        'Certificate-Based Auth': 9,
        'RADIUS Service': 10,
        'TACACS+ Support': 8,
        'Cloud Identity Support': 7,
        'Device Fingerprinting': 8,
        'BYOD Support': 9,
        'IoT Device Support': 7,
        'Guest Management': 10,
        'Agentless Operation': 7,
        'Automatic Updates': 5,
        'Multi-Site Management': 8,
        'API Availability': 8,
        'Operational Overhead': 4,
        'Implementation Complexity': 3,
        'Zero Trust Support': 8,
        'Posture Assessment': 9,
        'Compliance Reporting': 9,
        'Threat Response': 8,
        'Vulnerability Management': 8
      },
      forescout: {
        'Cloud-Native Architecture': 3,
        'On-Premises Deployment': 9,
        'Hybrid Deployment': 7,
        'Deployment Timeline': 3,
        'Hardware Requirements': 3,
        '802.1X Support': 8,
        'Certificate-Based Auth': 7,
        'RADIUS Service': 8,
        'TACACS+ Support': 6,
        'Cloud Identity Support': 6,
        'Device Fingerprinting': 10,
        'BYOD Support': 8,
        'IoT Device Support': 10,
        'Guest Management': 7,
        'Agentless Operation': 10,
        'Automatic Updates': 4,
        'Multi-Site Management': 7,
        'API Availability': 8,
        'Operational Overhead': 4,
        'Implementation Complexity': 3,
        'Zero Trust Support': 8,
        'Posture Assessment': 9,
        'Compliance Reporting': 8,
        'Threat Response': 9,
        'Vulnerability Management': 9
      },
      fortinac: {
        'Cloud-Native Architecture': 2,
        'On-Premises Deployment': 9,
        'Hybrid Deployment': 6,
        'Deployment Timeline': 4,
        'Hardware Requirements': 3,
        '802.1X Support': 8,
        'Certificate-Based Auth': 7,
        'RADIUS Service': 8,
        'TACACS+ Support': 6,
        'Cloud Identity Support': 5,
        'Device Fingerprinting': 7,
        'BYOD Support': 7,
        'IoT Device Support': 8,
        'Guest Management': 7,
        'Agentless Operation': 7,
        'Automatic Updates': 5,
        'Multi-Site Management': 7,
        'API Availability': 7,
        'Operational Overhead': 5,
        'Implementation Complexity': 4,
        'Zero Trust Support': 7,
        'Posture Assessment': 8,
        'Compliance Reporting': 8,
        'Threat Response': 9,
        'Vulnerability Management': 8
      },
      nps: {
        'Cloud-Native Architecture': 1,
        'On-Premises Deployment': 8,
        'Hybrid Deployment': 3,
        'Deployment Timeline': 6,
        'Hardware Requirements': 5,
        '802.1X Support': 7,
        'Certificate-Based Auth': 6,
        'RADIUS Service': 7,
        'TACACS+ Support': 1,
        'Cloud Identity Support': 6,
        'Device Fingerprinting': 1,
        'BYOD Support': 3,
        'IoT Device Support': 1,
        'Guest Management': 2,
        'Agentless Operation': 7,
        'Automatic Updates': 5,
        'Multi-Site Management': 4,
        'API Availability': 4,
        'Operational Overhead': 5,
        'Implementation Complexity': 5,
        'Zero Trust Support': 3,
        'Posture Assessment': 2,
        'Compliance Reporting': 2,
        'Threat Response': 2,
        'Vulnerability Management': 1
      },
      securew2: {
        'Cloud-Native Architecture': 8,
        'On-Premises Deployment': 3,
        'Hybrid Deployment': 8,
        'Deployment Timeline': 7,
        'Hardware Requirements': 9,
        '802.1X Support': 9,
        'Certificate-Based Auth': 10,
        'RADIUS Service': 9,
        'TACACS+ Support': 3,
        'Cloud Identity Support': 10,
        'Device Fingerprinting': 4,
        'BYOD Support': 9,
        'IoT Device Support': 4,
        'Guest Management': 7,
        'Agentless Operation': 6,
        'Automatic Updates': 9,
        'Multi-Site Management': 9,
        'API Availability': 8,
        'Operational Overhead': 8,
        'Implementation Complexity': 7,
        'Zero Trust Support': 8,
        'Posture Assessment': 5,
        'Compliance Reporting': 6,
        'Threat Response': 4,
        'Vulnerability Management': 3
      },
      portnox: {
        'Cloud-Native Architecture': 10,
        'On-Premises Deployment': 3,
        'Hybrid Deployment': 8,
        'Deployment Timeline': 10,
        'Hardware Requirements': 10,
        '802.1X Support': 9,
        'Certificate-Based Auth': 9,
        'RADIUS Service': 9,
        'TACACS+ Support': 7,
        'Cloud Identity Support': 10,
        'Device Fingerprinting': 9,
        'BYOD Support': 9,
        'IoT Device Support': 9,
        'Guest Management': 9,
        'Agentless Operation': 9,
        'Automatic Updates': 10,
        'Multi-Site Management': 10,
        'API Availability': 9,
        'Operational Overhead': 9,
        'Implementation Complexity': 9,
        'Zero Trust Support': 9,
        'Posture Assessment': 8,
        'Compliance Reporting': 8,
        'Threat Response': 8,
        'Vulnerability Management': 7
      }
    }
  };
  
  // Implementation timeline comparison data
  const implementationTimeline = {
    phases: [
      {
        name: 'Planning & Design',
        description: 'Scoping requirements, designing architecture, and planning deployment',
        ciscoISE: { days: 30, tasks: 12 },
        arubaClearPass: { days: 21, tasks: 10 },
        forescout: { days: 21, tasks: 9 },
        portnox: { days: 1, tasks: 3 }
      },
      {
        name: 'Hardware Procurement',
        description: 'Ordering, shipping, and installing physical appliances',
        ciscoISE: { days: 21, tasks: 5 },
        arubaClearPass: { days: 14, tasks: 5 },
        forescout: { days: 14, tasks: 5 },
        portnox: { days: 0, tasks: 0 }
      },
      {
        name: 'Software Installation',
        description: 'Installing, configuring, and testing base software',
        ciscoISE: { days: 7, tasks: 8 },
        arubaClearPass: { days: 5, tasks: 7 },
        forescout: { days: 5, tasks: 6 },
        portnox: { days: 0.5, tasks: 2 }
      },
      {
        name: 'Network Integration',
        description: 'Integrating with switches, wireless, and existing infrastructure',
        ciscoISE: { days: 14, tasks: 10 },
        arubaClearPass: { days: 10, tasks: 9 },
        forescout: { days: 7, tasks: 7 },
        portnox: { days: 1, tasks: 3 }
      },
      {
        name: 'Policy Configuration',
        description: 'Creating and testing access policies',
        ciscoISE: { days: 21, tasks: 15 },
        arubaClearPass: { days: 14, tasks: 12 },
        forescout: { days: 10, tasks: 10 },
        portnox: { days: 2, tasks: 5 }
      },
      {
        name: 'Testing & Validation',
        description: 'Testing all scenarios and validating functionality',
        ciscoISE: { days: 14, tasks: 20 },
        arubaClearPass: { days: 10, tasks: 15 },
        forescout: { days: 7, tasks: 12 },
        portnox: { days: 1, tasks: 5 }
      },
      {
        name: 'Deployment & Rollout',
        description: 'Rolling out to production environment',
        ciscoISE: { days: 30, tasks: 25 },
        arubaClearPass: { days: 21, tasks: 20 },
        forescout: { days: 14, tasks: 15 },
        portnox: { days: 2, tasks: 6 }
      },
      {
        name: 'Knowledge Transfer',
        description: 'Training IT staff on management and operations',
        ciscoISE: { days: 5, tasks: 6 },
        arubaClearPass: { days: 4, tasks: 5 },
        forescout: { days: 3, tasks: 4 },
        portnox: { days: 0.5, tasks: 2 }
      }
    ]
  };
  
  // Public functions
  function createVendorComparisonCard(selector, competitor) {
    const container = document.querySelector(selector);
    if (!container) return;
    
    const competitorData = vendors[competitor];
    if (!competitorData) return;
    
    const portnoxData = vendors.portnox;
    const advantages = portnoxAdvantages[competitor];
    
    // Create comparison card
    const card = document.createElement('div');
    card.className = 'vendor-head-to-head';
    
    // Header
    const header = document.createElement('div');
    header.className = 'vendor-head-to-head-header';
    header.innerHTML = `
      <div class="vendor-head-to-head-title">
        <i class="fas fa-exchange-alt mr-2"></i>
        Portnox Cloud vs ${competitorData.name}
      </div>
      <div class="vendor-comparison-actions">
        <button class="btn-sm btn-light" id="download-comparison">
          <i class="fas fa-download mr-1"></i> Export
        </button>
      </div>
    `;
    card.appendChild(header);
    
    // Body - Grid with two columns
    const body = document.createElement('div');
    body.className = 'vendor-head-to-head-body';
    
    const grid = document.createElement('div');
    grid.className = 'vendor-comparison-grid';
    
    // Competitor column
    const competitorColumn = document.createElement('div');
    competitorColumn.className = 'vendor-column';
    
    const competitorHeader = document.createElement('div');
    competitorHeader.className = 'vendor-column-header';
    competitorHeader.innerHTML = `
      <img src="${competitorData.logo}" alt="${competitorData.name} Logo" class="vendor-logo">
      <div>
        <div class="vendor-name">${competitorData.name}</div>
        <div class="vendor-type">${competitorData.type}</div>
      </div>
    `;
    competitorColumn.appendChild(competitorHeader);
    
    const competitorDesc = document.createElement('div');
    competitorDesc.className = 'vendor-description';
    competitorDesc.textContent = competitorData.description;
    competitorColumn.appendChild(competitorDesc);
    
    // Implementation details
    const competitorImplementation = document.createElement('div');
    competitorImplementation.className = 'vendor-implementation-details mt-4 mb-4';
    competitorImplementation.innerHTML = `
      <div class="implementation-title font-medium text-gray-700 mb-2">Implementation Details</div>
      <div class="implementation-grid grid grid-cols-2 gap-2">
        <div class="implementation-item">
          <div class="text-sm text-gray-500">Deployment Time</div>
          <div class="font-medium">${competitorData.deploymentTime}</div>
        </div>
        <div class="implementation-item">
          <div class="text-sm text-gray-500">Complexity</div>
          <div class="font-medium">${competitorData.implementation.complexity}</div>
        </div>
        <div class="implementation-item">
          <div class="text-sm text-gray-500">Expertise Required</div>
          <div class="font-medium">${competitorData.implementation.expertise}</div>
        </div>
        <div class="implementation-item">
          <div class="text-sm text-gray-500">IT Resources</div>
          <div class="font-medium">${competitorData.implementation.resources}</div>
        </div>
      </div>
    `;
    competitorColumn.appendChild(competitorImplementation);
    
    // Strengths
    const competitorStrengths = document.createElement('div');
    competitorStrengths.className = 'vendor-feature-section mt-4';
    competitorStrengths.innerHTML = `<div class="font-medium text-gray-700 mb-2">Key Strengths</div>`;
    
    const strengthsList = document.createElement('ul');
    strengthsList.className = 'vendor-feature-list';
    
    competitorData.strengths.forEach(strength => {
      const item = document.createElement('li');
      item.className = 'vendor-feature-item';
      item.innerHTML = `
        <div class="vendor-feature-icon plus">
          <i class="fas fa-plus-circle"></i>
        </div>
        <div class="vendor-feature-text">${strength}</div>
      `;
      strengthsList.appendChild(item);
    });
    
    competitorStrengths.appendChild(strengthsList);
    competitorColumn.appendChild(competitorStrengths);
    
    // Weaknesses
    const competitorWeaknesses = document.createElement('div');
    competitorWeaknesses.className = 'vendor-feature-section mt-4';
    competitorWeaknesses.innerHTML = `<div class="font-medium text-gray-700 mb-2">Limitations</div>`;
    
    const weaknessesList = document.createElement('ul');
    weaknessesList.className = 'vendor-feature-list';
    
    competitorData.weaknesses.forEach(weakness => {
      const item = document.createElement('li');
      item.className = 'vendor-feature-item';
      item.innerHTML = `
        <div class="vendor-feature-icon minus">
          <i class="fas fa-minus-circle"></i>
        </div>
        <div class="vendor-feature-text">${weakness}</div>
      `;
      weaknessesList.appendChild(item);
    });
    
    competitorWeaknesses.appendChild(weaknessesList);
    competitorColumn.appendChild(competitorWeaknesses);
    
    // Portnox column
    const portnoxColumn = document.createElement('div');
    portnoxColumn.className = 'vendor-column';
    
    // Add winner badge
    const winnerBadge = document.createElement('div');
    winnerBadge.className = 'winner-badge';
    portnoxColumn.appendChild(winnerBadge);
    
    const portnoxHeader = document.createElement('div');
    portnoxHeader.className = 'vendor-column-header';
    portnoxHeader.innerHTML = `
      <img src="${portnoxData.logo}" alt="${portnoxData.name} Logo" class="vendor-logo">
      <div>
        <div class="vendor-name">${portnoxData.name}</div>
        <div class="vendor-type">${portnoxData.type}</div>
      </div>
    `;
    portnoxColumn.appendChild(portnoxHeader);
    
    const portnoxDesc = document.createElement('div');
    portnoxDesc.className = 'vendor-description';
    portnoxDesc.textContent = portnoxData.description;
    portnoxColumn.appendChild(portnoxDesc);
    
    // Implementation details
    const portnoxImplementation = document.createElement('div');
    portnoxImplementation.className = 'vendor-implementation-details mt-4 mb-4';
    portnoxImplementation.innerHTML = `
      <div class="implementation-title font-medium text-gray-700 mb-2">Implementation Details</div>
      <div class="implementation-grid grid grid-cols-2 gap-2">
        <div class="implementation-item">
          <div class="text-sm text-gray-500">Deployment Time</div>
          <div class="font-medium text-green-600">${portnoxData.deploymentTime}</div>
        </div>
        <div class="implementation-item">
          <div class="text-sm text-gray-500">Complexity</div>
          <div class="font-medium text-green-600">${portnoxData.implementation.complexity}</div>
        </div>
        <div class="implementation-item">
          <div class="text-sm text-gray-500">Expertise Required</div>
          <div class="font-medium text-green-600">${portnoxData.implementation.expertise}</div>
        </div>
        <div class="implementation-item">
          <div class="text-sm text-gray-500">IT Resources</div>
          <div class="font-medium text-green-600">${portnoxData.implementation.resources}</div>
        </div>
      </div>
    `;
    portnoxColumn.appendChild(portnoxImplementation);
    
    // Advantage categories
    advantages.forEach(category => {
      const categorySection = document.createElement('div');
      categorySection.className = 'vendor-advantage-section mt-4';
      categorySection.innerHTML = `<div class="font-medium text-green-600 mb-2">${category.category}</div>`;
      
      const advantagesList = document.createElement('ul');
      advantagesList.className = 'vendor-feature-list';
      
      category.items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'vendor-feature-item';
        listItem.innerHTML = `
          <div class="vendor-feature-icon plus text-green-600">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="vendor-feature-text">${item}</div>
        `;
        advantagesList.appendChild(listItem);
      });
      
      categorySection.appendChild(advantagesList);
      portnoxColumn.appendChild(categorySection);
    });
    
    grid.appendChild(competitorColumn);
    grid.appendChild(portnoxColumn);
    body.appendChild(grid);
    card.appendChild(body);
    
    // Footer
    const footer = document.createElement('div');
    footer.className = 'vendor-comparison-footer';
    footer.innerHTML = `Based on analysis of vendor documentation, customer feedback, and industry research. TCO calculations based on 1000-device deployment over 3 years.`;
    card.appendChild(footer);
    
    // Add to container
    container.innerHTML = '';
    container.appendChild(card);
  }
  
  function createFeatureMatrixTable(selector, vendorIds = []) {
    const container = document.querySelector(selector);
    if (!container) return;
    
    // If no specific vendors, use all
    if (vendorIds.length === 0) {
      vendorIds = featureMatrix.vendors.map(v => v.id);
    }
    
    // Filter to selected vendors
    const selectedVendors = featureMatrix.vendors.filter(v => vendorIds.includes(v.id));
    
    // Create table
    const table = document.createElement('table');
    table.className = 'feature-matrix';
    
    // Create header row
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Feature column header
    const featureHeader = document.createElement('th');
    featureHeader.textContent = 'Feature';
    headerRow.appendChild(featureHeader);
    
    // Vendor column headers
    selectedVendors.forEach(vendor => {
      const vendorHeader = document.createElement('th');
      vendorHeader.textContent = vendor.name;
      headerRow.appendChild(vendorHeader);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    // Add category rows and feature rows
    featureMatrix.categories.forEach(category => {
      // Category row
      const categoryRow = document.createElement('tr');
      categoryRow.className = 'category-row';
      
      const categoryCell = document.createElement('td');
      categoryCell.textContent = category.name;
      categoryCell.colSpan = selectedVendors.length + 1;
      categoryRow.appendChild(categoryCell);
      tbody.appendChild(categoryRow);
      
      // Feature rows
      category.features.forEach(feature => {
        const featureRow = document.createElement('tr');
        
        const featureCell = document.createElement('td');
        featureCell.innerHTML = `
          <div class="tooltip-modern">
            ${feature.name}
            <div class="tooltip-content">${feature.description}</div>
          </div>
        `;
        featureRow.appendChild(featureCell);
        
        // Add vendor ratings
        selectedVendors.forEach(vendor => {
          const ratingCell = document.createElement('td');
          const rating = featureMatrix.ratings[vendor.id][feature.name];
          
          let ratingClass = '';
          if (rating >= 9) ratingClass = 'feature-rating-10';
          else if (rating >= 7) ratingClass = 'feature-rating-8';
          else if (rating >= 5) ratingClass = 'feature-rating-6';
          else if (rating >= 3) ratingClass = 'feature-rating-4';
          else ratingClass = 'feature-rating-2';
          
          ratingCell.innerHTML = `<div class="feature-rating ${ratingClass}">${rating}</div>`;
          featureRow.appendChild(ratingCell);
        });
        
        tbody.appendChild(featureRow);
      });
    });
    
    table.appendChild(tbody);
    
    // Add to container
    container.innerHTML = '';
    container.appendChild(table);
  }
  
  function createImplementationTimeline(selector, competitorId) {
    const container = document.querySelector(selector);
    if (!container) return;
    
    const competitor = vendors[competitorId];
    if (!competitor) return;
    
    // Create timeline data
    const timelineData = {
      competitor: {
        id: competitorId,
        name: competitor.name
      },
      phases: implementationTimeline.phases.map(phase => {
        let competitorDuration = 0;
        
        // Get the appropriate competitor duration
        if (competitorId === 'cisco') competitorDuration = phase.ciscoISE.days;
        else if (competitorId === 'aruba') competitorDuration = phase.arubaClearPass.days;
        else if (competitorId === 'forescout') competitorDuration = phase.forescout.days;
        else competitorDuration = phase.ciscoISE.days; // Default if not specified
        
        return {
          name: phase.name,
          description: phase.description,
          competitorDuration: competitorDuration,
          portnoxDuration: phase.portnox.days
        };
      })
    };
    
    // Use ModernCharts to create the timeline
    if (typeof ModernCharts !== 'undefined' && ModernCharts.charts.migrationTimeline) {
      ModernCharts.charts.migrationTimeline(selector, timelineData);
    } else {
      console.error('ModernCharts.charts.migrationTimeline is not available');
    }
  }
  
  // Return public API
  return {
    vendors: vendors,
    advantages: portnoxAdvantages,
    featureMatrix: featureMatrix,
    implementationTimeline: implementationTimeline,
    createVendorComparisonCard: createVendorComparisonCard,
    createFeatureMatrixTable: createFeatureMatrixTable,
    createImplementationTimeline: createImplementationTimeline
  };
})();
EOF

# Create risk analysis and breach impact visualization
cat > js/risk-analysis/risk-analysis.js << 'EOF'
/**
 * Risk Analysis and Breach Impact Module
 * Provides advanced visualizations for security risk assessment
 */

const RiskAnalysis = (function() {
  // Risk impact levels
  const impactLevels = ['Low', 'Medium', 'High', 'Critical'];
  
  // Risk likelihood levels
  const likelihoodLevels = ['Unlikely', 'Possible', 'Likely', 'Very Likely', 'Almost Certain'];
  
  // Risk scores by impact and likelihood
  const riskMatrix = {
    'Low': {
      'Unlikely': { score: 1, level: 'minimal' },
      'Possible': { score: 2, level: 'minimal' },
      'Likely': { score: 3, level: 'low' },
      'Very Likely': { score: 4, level: 'low' },
      'Almost Certain': { score: 5, level: 'medium' }
    },
    'Medium': {
      'Unlikely': { score: 2, level: 'minimal' },
      'Possible': { score: 4, level: 'low' },
      'Likely': { score: 6, level: 'medium' },
      'Very Likely': { score: 8, level: 'medium' },
      'Almost Certain': { score: 10, level: 'high' }
    },
    'High': {
      'Unlikely': { score: 3, level: 'low' },
      'Possible': { score: 6, level: 'medium' },
      'Likely': { score: 9, level: 'high' },
      'Very Likely': { score: 12, level: 'high' },
      'Almost Certain': { score: 15, level: 'critical' }
    },
    'Critical': {
      'Unlikely': { score: 4, level: 'low' },
      'Possible': { score: 8, level: 'medium' },
      'Likely': { score: 12, level: 'high' },
      'Very Likely': { score: 16, level: 'critical' },
      'Almost Certain': { score: 20, level: 'critical' }
    }
  };
  
  // Common NAC security risks
  const commonRisks = [
    {
      id: 'unauthorized-access',
      name: 'Unauthorized Network Access',
      description: 'Malicious actors gaining access to the network through compromised credentials or unmanaged devices',
      impact: 'Critical',
      likelihood: {
        'no-nac': 'Almost Certain',
        'traditional-nac': 'Possible',
        'cloud-nac': 'Unlikely'
      },
      mitigations: [
        'Strong authentication enforcement',
        'Real-time device monitoring',
        'Zero-trust network architecture',
        'Continuous revalidation of access'
      ]
    },
    {
      id: 'byod-risks',
      name: 'BYOD Security Risks',
      description: 'Personal devices introducing malware, vulnerabilities or data leakage risks to corporate networks',
      impact: 'High',
      likelihood: {
        'no-nac': 'Very Likely',
        'traditional-nac': 'Likely',
        'cloud-nac': 'Possible'
      },
      mitigations: [
        'Device posture assessment',
        'Automated onboarding workflows',
        'Segmentation of personal devices',
        'Continuous monitoring for abnormal behavior'
      ]
    },
    {
      id: 'iot-vulnerabilities',
      name: 'IoT Device Vulnerabilities',
      description: 'Insecure IoT devices being compromised or used as attack vectors',
      impact: 'High',
      likelihood: {
        'no-nac': 'Almost Certain',
        'traditional-nac': 'Likely',
        'cloud-nac': 'Possible'
      },
      mitigations: [
        'IoT device fingerprinting',
        'Network microsegmentation',
        'Automated quarantine of suspicious devices',
        'Continuous vulnerability monitoring'
      ]
    },
    {
      id: 'compliance-violations',
      name: 'Compliance Violations',
      description: 'Failure to meet regulatory requirements resulting in penalties and reputation damage',
      impact: 'High',
      likelihood: {
        'no-nac': 'Very Likely',
        'traditional-nac': 'Possible',
        'cloud-nac': 'Unlikely'
      },
      mitigations: [
        'Automated compliance reporting',
        'Real-time compliance monitoring',
        'Audit-ready access logs',
        'Continuous validation of security controls'
      ]
    },
    {
      id: 'lateral-movement',
      name: 'Lateral Movement After Breach',
      description: 'Attackers moving through the network after initial compromise',
      impact: 'Critical',
      likelihood: {
        'no-nac': 'Almost Certain',
        'traditional-nac': 'Likely',
        'cloud-nac': 'Possible'
      },
      mitigations: [
        'Zero-trust architecture',
        'Network microsegmentation',
        'Continuous authentication',
        'Abnormal behavior detection'
      ]
    },
    {
      id: 'insider-threats',
      name: 'Insider Threats',
      description: 'Malicious or negligent actions by authorized users causing damage or data breaches',
      impact: 'High',
      likelihood: {
        'no-nac': 'Likely',
        'traditional-nac': 'Possible',
        'cloud-nac': 'Possible'
      },
      mitigations: [
        'Principle of least privilege',
        'Behavior anomaly detection',
        'Privileged access management',
        'Real-time activity monitoring'
      ]
    },
    {
      id: 'outdated-security',
      name: 'Outdated Security Controls',
      description: 'Using obsolete security measures that are ineffective against modern threats',
      impact: 'High',
      likelihood: {
        'no-nac': 'Almost Certain',
        'traditional-nac': 'Likely',
        'cloud-nac': 'Unlikely'
      },
      mitigations: [
        'Automatic security updates',
        'Continuous threat intelligence',
        'Cloud-based adaptive security',
        'AI-powered threat detection'
      ]
    },
    {
      id: 'complex-management',
      name: 'Complex Management Causing Errors',
      description: 'Security gaps due to misconfiguration or management complexity',
      impact: 'Medium',
      likelihood: {
        'no-nac': 'Likely',
        'traditional-nac': 'Very Likely',
        'cloud-nac': 'Unlikely'
      },
      mitigations: [
        'Simplified management interface',
        'Configuration validation',
        'Automated policy deployment',
        'Error prevention safeguards'
      ]
    },
    {
      id: 'lack-visibility',
      name: 'Lack of Network Visibility',
      description: 'Inability to detect unknown or shadow IT devices on the network',
      impact: 'High',
      likelihood: {
        'no-nac': 'Almost Certain',
        'traditional-nac': 'Possible',
        'cloud-nac': 'Unlikely'
      },
      mitigations: [
        'Continuous device discovery',
        'AI-powered device fingerprinting',
        'Automated asset inventory',
        'Real-time network monitoring'
      ]
    },
    {
      id: 'slow-response',
      name: 'Slow Incident Response',
      description: 'Delayed detection and remediation of security incidents',
      impact: 'High',
      likelihood: {
        'no-nac': 'Almost Certain',
        'traditional-nac': 'Likely',
        'cloud-nac': 'Possible'
      },
      mitigations: [
        'Automated threat response',
        'Real-time alerting',
        'Integration with SIEM systems',
        'Predefined remediation workflows'
      ]
    }
  ];
  
  // Breach impact metrics
  const breachImpactMetrics = {
    'no-nac': {
      dataBreachCost: 4200000,
      networkDowntime: 72,
      recoveryTimeHours: 160,
      reputationImpact: 'Severe',
      regulatoryPenalties: 950000,
      customerChurn: 6.8
    },
    'traditional-nac': {
      dataBreachCost: 2100000,
      networkDowntime: 24,
      recoveryTimeHours: 80,
      reputationImpact: 'Moderate',
      regulatoryPenalties: 325000,
      customerChurn: 3.2
    },
    'cloud-nac': {
      dataBreachCost: 750000,
      networkDowntime: 8,
      recoveryTimeHours: 24,
      reputationImpact: 'Minor',
      regulatoryPenalties: 125000,
      customerChurn: 1.5
    }
  };
  
  // Calculate risk score and level based on impact and likelihood
  function calculateRisk(impact, likelihood) {
    if (riskMatrix[impact] && riskMatrix[impact][likelihood]) {
      return riskMatrix[impact][likelihood];
    }
    return { score: 0, level: 'unknown' };
  }
  
  // Create risk heatmap data
  function createRiskHeatmapData(nacType = 'no-nac') {
    const data = [];
    
    // Generate data for all impact and likelihood combinations
    impactLevels.forEach(impact => {
      likelihoodLevels.forEach(likelihood => {
        const risk = calculateRisk(impact, likelihood);
        data.push({
          impact: impact,
          likelihood: likelihood,
          score: risk.score,
          level: risk.level
        });
      });
    });
    
    return data;
  }
  
  // Get risk data for a specific NAC type
  function getRiskDataForNACType(nacType = 'cloud-nac') {
    return commonRisks.map(risk => {
      const likelihood = risk.likelihood[nacType] || 'Possible';
      const calculated = calculateRisk(risk.impact, likelihood);
      
      return {
        ...risk,
        currentLikelihood: likelihood,
        score: calculated.score,
        level: calculated.level
      };
    }).sort((a, b) => b.score - a.score); // Sort by risk score descending
  }
  
  // Calculate risk reduction percentage between NAC types
  function calculateRiskReduction(fromType, toType) {
    const fromRisks = getRiskDataForNACType(fromType);
    const toRisks = getRiskDataForNACType(toType);
    
    // Calculate total risk scores
    const fromTotal = fromRisks.reduce((sum, risk) => sum + risk.score, 0);
    const toTotal = toRisks.reduce((sum, risk) => sum + risk.score, 0);
    
    // Calculate percentage reduction
    const reduction = ((fromTotal - toTotal) / fromTotal) * 100;
    return Math.round(reduction);
  }
  
  // Create a risk analysis table
  function createRiskTable(selector, nacType = 'cloud-nac') {
    const container = document.querySelector(selector);
    if (!container) return;
    
    const risks = getRiskDataForNACType(nacType);
    
    // Create table
    const table = document.createElement('table');
    table.className = 'risk-table';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    ['Risk', 'Impact', 'Likelihood', 'Risk Score', 'Level', 'Mitigations'].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    
    risks.forEach((risk, index) => {
      const row = document.createElement('tr');
      row.className = 'stagger-item fade-in';
      row.style.animationDelay = `${index * 100}ms`;
      
      // Risk name
      const nameCell = document.createElement('td');
      nameCell.innerHTML = `
        <div class="font-medium">${risk.name}</div>
        <div class="text-sm text-gray-500">${risk.description}</div>
      `;
      row.appendChild(nameCell);
      
      // Impact
      const impactCell = document.createElement('td');
      impactCell.textContent = risk.impact;
      row.appendChild(impactCell);
      
      // Likelihood
      const likelihoodCell = document.createElement('td');
      likelihoodCell.textContent = risk.currentLikelihood;
      row.appendChild(likelihoodCell);
      
      // Risk score
      const scoreCell = document.createElement('td');
      scoreCell.textContent = risk.score;
      row.appendChild(scoreCell);
      
      // Risk level
      const levelCell = document.createElement('td');
      const badge = document.createElement('span');
      badge.className = `risk-badge ${risk.level}`;
      badge.textContent = risk.level.charAt(0).toUpperCase() + risk.level.slice(1);
      levelCell.appendChild(badge);
      row.appendChild(levelCell);
      
      // Mitigations
      const mitigationsCell = document.createElement('td');
      const mitigationsList = document.createElement('ul');
      mitigationsList.className = 'mitigations-list text-sm';
      
      risk.mitigations.forEach(mitigation => {
        const item = document.createElement('li');
        item.textContent = mitigation;
        mitigationsList.appendChild(item);
      });
      
      mitigationsCell.appendChild(mitigationsList);
      row.appendChild(mitigationsCell);
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    
    // Add to container
    container.innerHTML = '';
    container.appendChild(table);
    
    return table;
  }
  
  // Create breach impact visualization
  function createBreachImpactVisualization(selector, compareTypes = ['no-nac', 'cloud-nac']) {
    const container = document.querySelector(selector);
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Create breach impact grid
    const grid = document.createElement('div');
    grid.className = 'breach-impact';
    
    // Create cards for each metric
    const metrics = [
      { 
        id: 'data-breach-cost', 
        name: 'Data Breach Cost', 
        icon: 'fa-dollar-sign',
        format: value => `$${(value / 1000000).toFixed(2)}M`,
        reduction: (from, to) => (((from - to) / from) * 100).toFixed(0) + '%'
      },
      { 
        id: 'network-downtime', 
        name: 'Network Downtime', 
        icon: 'fa-network-wired',
        format: value => `${value} hours`,
        reduction: (from, to) => (((from - to) / from) * 100).toFixed(0) + '%'
      },
      { 
        id: 'recovery-time', 
        name: 'Recovery Time', 
        icon: 'fa-clock',
        format: value => `${value} hours`,
        reduction: (from, to) => (((from - to) / from) * 100).toFixed(0) + '%'
      },
      { 
        id: 'regulatory-penalties', 
        name: 'Regulatory Penalties', 
        icon: 'fa-gavel',
        format: value => `$${(value / 1000).toFixed(0)}K`,
        reduction: (from, to) => (((from - to) / from) * 100).toFixed(0) + '%'
      },
      { 
        id: 'customer-churn', 
        name: 'Customer Churn', 
        icon: 'fa-users-slash',
        format: value => `${value}%`,
        reduction: (from, to) => (((from - to) / from) * 100).toFixed(0) + '%'
      },
      { 
        id: 'total-impact-reduction', 
        name: 'Overall Impact Reduction', 
        icon: 'fa-shield-alt',
        special: true
      }
    ];
    
    // Get data for comparison
    const fromData = breachImpactMetrics[compareTypes[0]];
    const toData = breachImpactMetrics[compareTypes[1]];
    
    // Calculate overall impact reduction
    const fromTotal = fromData.dataBreachCost + (fromData.networkDowntime * 10000) + (fromData.recoveryTimeHours * 5000) + fromData.regulatoryPenalties;
    const toTotal = toData.dataBreachCost + (toData.networkDowntime * 10000) + (toData.recoveryTimeHours * 5000) + toData.regulatoryPenalties;
    const overallReduction = (((fromTotal - toTotal) / fromTotal) * 100).toFixed(0);
    
    // Create cards
    metrics.forEach((metric, index) => {
      const card = document.createElement('div');
      card.className = 'breach-impact-card stagger-item fade-in';
      card.style.animationDelay = `${index * 100}ms`;
      
      // Special handling for overall impact
      if (metric.special) {
        card.innerHTML = `
          <div class="breach-impact-icon">
            <i class="fas ${metric.icon}"></i>
          </div>
          <div class="breach-impact-title">${metric.name}</div>
          <div class="breach-impact-value">${overallReduction}%</div>
          <div class="breach-impact-reduction">
            <i class="fas fa-arrow-down breach-impact-reduction-icon"></i>
            Comprehensive risk reduction with ${compareTypes[1] === 'cloud-nac' ? 'Portnox Cloud' : 'Traditional NAC'}
          </div>
        `;
      } else {
        // Get values for metric
        let fromValue, toValue;
        
        if (metric.id === 'data-breach-cost') {
          fromValue = fromData.dataBreachCost;
          toValue = toData.dataBreachCost;
        } else if (metric.id === 'network-downtime') {
          fromValue = fromData.networkDowntime;
          toValue = toData.networkDowntime;
        } else if (metric.id === 'recovery-time') {
          fromValue = fromData.recoveryTimeHours;
          toValue = toData.recoveryTimeHours;
        } else if (metric.id === 'regulatory-penalties') {
          fromValue = fromData.regulatoryPenalties;
          toValue = toData.regulatoryPenalties;
        } else if (metric.id === 'customer-churn') {
          fromValue = fromData.customerChurn;
          toValue = toData.customerChurn;
        }
        
        const reductionValue = metric.reduction(fromValue, toValue);
        
        card.innerHTML = `
          <div class="breach-impact-icon">
            <i class="fas ${metric.icon}"></i>
          </div>
          <div class="breach-impact-title">${metric.name}</div>
          <div class="breach-impact-value">${reductionValue}</div>
          <div class="breach-impact-text">
            <div>From: ${metric.format(fromValue)}</div>
            <div>To: ${metric.format(toValue)}</div>
          </div>
          <div class="breach-impact-reduction">
            <i class="fas fa-arrow-down breach-impact-reduction-icon"></i>
            Reduction with ${compareTypes[1] === 'cloud-nac' ? 'Portnox Cloud' : 'Traditional NAC'}
          </div>
        `;
      }
      
      grid.appendChild(card);
    });
    
    container.appendChild(grid);
  }
  
  // Create risk summary visualization
  function createRiskSummary(selector, nacType = 'cloud-nac') {
    const container = document.querySelector(selector);
    if (!container) return;
    
    const risks = getRiskDataForNACType(nacType);
    
    // Count risks by level
    const riskCounts = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      minimal: 0
    };
    
    risks.forEach(risk => {
      riskCounts[risk.level]++;
    });
    
    // Calculate reduction from no NAC
    const reductionPercent = calculateRiskReduction('no-nac', nacType);
    
    // Create summary card
    const card = document.createElement('div');
    card.className = 'risk-summary-card p-6 bg-white shadow-md rounded-lg';
    
    card.innerHTML = `
      <div class="flex items-center mb-4">
        <div class="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 mr-4">
          <i class="fas fa-shield-alt text-xl"></i>
        </div>
        <div>
          <h3 class="text-lg font-semibold">Risk Summary with ${nacType === 'cloud-nac' ? 'Portnox Cloud' : (nacType === 'traditional-nac' ? 'Traditional NAC' : 'No NAC')}</h3>
          <p class="text-gray-600">Analysis of top network security risks</p>
        </div>
      </div>
      
      <div class="grid grid-cols-5 gap-2 mb-6">
        <div class="text-center">
          <div class="text-xs text-gray-500 mb-1">Critical</div>
          <div class="text-xl font-bold text-red-600">${riskCounts.critical}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-gray-500 mb-1">High</div>
          <div class="text-xl font-bold text-orange-500">${riskCounts.high}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-gray-500 mb-1">Medium</div>
          <div class="text-xl font-bold text-yellow-500">${riskCounts.medium}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-gray-500 mb-1">Low</div>
          <div class="text-xl font-bold text-green-500">${riskCounts.low}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-gray-500 mb-1">Minimal</div>
          <div class="text-xl font-bold text-blue-500">${riskCounts.minimal}</div>
        </div>
      </div>
      
      <div class="border-t border-gray-200 pt-4">
        <div class="flex items-center justify-between mb-2">
          <div class="text-sm text-gray-600">Overall Risk Reduction</div>
          <div class="text-lg font-semibold text-green-600">${reductionPercent}%</div>
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-full bg-green-500 rounded-full" style="width: ${reductionPercent}%"></div>
        </div>
      </div>
    `;
    
    // Add to container
    container.innerHTML = '';
    container.appendChild(card);
  }
  
  // Return public API
  return {
    getRiskData: getRiskDataForNACType,
    calculateRiskReduction: calculateRiskReduction,
    createRiskHeatmapData: createRiskHeatmapData,
    createRiskTable: createRiskTable,
    createBreachImpactVisualization: createBreachImpactVisualization,
    createRiskSummary: createRiskSummary,
    breachImpactMetrics: breachImpactMetrics
  };
})();
EOF

# Create compliance framework details module
cat > js/compliance/compliance-frameworks.js << 'EOF'
/**
 * Compliance Frameworks Module
 * Provides detailed information and visualizations for regulatory compliance
 */

const ComplianceFrameworks = (function() {
  // Comprehensive compliance frameworks data
  const frameworks = [
    {
      id: 'hipaa',
      name: 'HIPAA',
      fullName: 'Health Insurance Portability and Accountability Act',
      category: 'Healthcare',
      description: 'U.S. legislation that provides data privacy and security provisions for safeguarding medical information.',
      keyRequirements: [
        'Access controls and authentication',
        'Audit controls and logging',
        'Transmission security',
        'Device and media controls',
        'Risk analysis and management'
      ],
      nacRelevance: 'High',
      regions: ['United States'],
      industries: ['Healthcare', 'Health Insurance', 'Medical Devices'],
      penalties: 'Up to $1.5 million per violation category per year',
      year: 1996,
      portnoxAdvantages: [
        'Automatic device identification for medical equipment',
        'Comprehensive audit logging for compliance evidence',
        'Secure network access controls for PHI protection',
        'Role-based access policies for healthcare environments',
        'Automated compliance reporting for audits'
      ]
    },
    {
      id: 'pci-dss',
      name: 'PCI DSS',
      fullName: 'Payment Card Industry Data Security Standard',
      category: 'Financial',
      description: 'Information security standard for organizations that handle branded credit cards.',
      keyRequirements: [
        'Secure network architecture',
        'Cardholder data protection',
        'Vulnerability management',
        'Strong access control measures',
        'Network monitoring and testing'
      ],
      nacRelevance: 'High',
      regions: ['Global'],
      industries: ['Retail', 'Financial Services', 'E-commerce', 'Hospitality'],
      penalties: 'Fines from $5,000 to $500,000, plus potential suspension of card processing',
      year: 2004,
      portnoxAdvantages: [
        'Network segmentation for cardholder data environments',
        'Automatic enforcement of security policies for POS systems',
        'Real-time monitoring of device compliance',
        'Continuous validation of network security controls',
        'Simplified audit preparation with detailed reporting'
      ]
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      fullName: 'General Data Protection Regulation',
      category: 'Privacy',
      description: 'Regulation on data protection and privacy in the European Union and the European Economic Area.',
      keyRequirements: [
        'Lawful basis for processing data',
        'Data subject consent',
        'Data protection by design',
        'Security of processing',
        'Breach notification'
      ],
      nacRelevance: 'Medium',
      regions: ['European Union', 'EEA', 'Companies serving EU citizens'],
      industries: ['All'],
      penalties: 'Up to €20 million or 4% of global annual revenue, whichever is higher',
      year: 2018,
      portnoxAdvantages: [
        'Granular access controls for personal data systems',
        'Detailed audit trails for data access events',
        'Network segmentation to protect sensitive data environments',
        'Risk-based authentication for processors of personal data',
        'Rapid response capabilities for data breach scenarios'
      ]
    },
    {
      id: 'nist-csf',
      name: 'NIST CSF',
      fullName: 'NIST Cybersecurity Framework',
      category: 'Cybersecurity',
      description: 'Voluntary framework consisting of standards, guidelines, and best practices to manage cybersecurity risk.',
      keyRequirements: [
        'Identify security risks',
        'Protect critical infrastructure',
        'Detect cybersecurity events',
        'Respond to detected events',
        'Recover from cybersecurity incidents'
      ],
      nacRelevance: 'High',
      regions: ['United States', 'Global Adoption'],
      industries: ['All', 'Government', 'Critical Infrastructure'],
      penalties: 'No direct penalties (compliance framework)',
      year: 2014,
      portnoxAdvantages: [
        'Comprehensive device visibility aligned with Identify function',
        'Network access controls implementing Protect function',
        'Real-time monitoring supporting Detect function',
        'Automated response capabilities for Response function',
        'Resilient architecture contributing to Recover function'
      ]
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      fullName: 'ISO/IEC 27001 - Information Security Management',
      category: 'Information Security',
      description: 'International standard for managing information security through policies and procedures.',
      keyRequirements: [
        'Information security policies',
        'Asset management',
        'Access control',
        'Physical security',
        'Operational security'
      ],
      nacRelevance: 'High',
      regions: ['Global'],
      industries: ['All'],
      penalties: 'No direct penalties, but loss of certification can impact business',
      year: 2005,
      portnoxAdvantages: [
        'Comprehensive access control implementation (ISO control A.9)',
        'Asset inventory automation for devices (ISO control A.8)',
        'Network security management (ISO control A.13)',
        'Information security in supplier relationships (ISO control A.15)',
        'Documented information security controls for certification'
      ]
    },
    {
      id: 'soc2',
      name: 'SOC 2',
      fullName: 'System and Organization Controls 2',
      category: 'Service Providers',
      description: 'Auditing procedure that ensures service providers securely manage customer data.',
      keyRequirements: [
        'Security controls',
        'Availability measures',
        'Processing integrity',
        'Confidentiality protections',
        'Privacy safeguards'
      ],
      nacRelevance: 'Medium',
      regions: ['United States', 'Global Adoption'],
      industries: ['SaaS', 'Cloud Services', 'IT Services'],
      penalties: 'No direct penalties (audit framework)',
      year: 2011,
      portnoxAdvantages: [
        'Logical access controls for Security Trust Service Criteria',
        'Network monitoring for Availability criteria',
        'Device authentication supporting Processing Integrity',
        'Network segmentation enhancing Confidentiality',
        'Access restriction mechanisms for Privacy criteria'
      ]
    },
    {
      id: 'ccpa',
      name: 'CCPA',
      fullName: 'California Consumer Privacy Act',
      category: 'Privacy',
      description: 'State statute intended to enhance privacy rights and consumer protection for residents of California.',
      keyRequirements: [
        'Right to know what information is collected',
        'Right to delete personal information',
        'Right to opt-out of sale of information',
        'Right to non-discrimination',
        'Reasonable security measures'
      ],
      nacRelevance: 'Low',
      regions: ['California, United States'],
      industries: ['All businesses serving California residents'],
      penalties: 'Civil penalties up to $7,500 per intentional violation',
      year: 2018,
      portnoxAdvantages: [
        'Network access controls for systems containing personal information',
        'Identity-based policies for data access management',
        'Audit logging for privacy compliance evidence',
        'Security measures demonstrating reasonable data protection',
        'Data environment isolation capabilities'
      ]
    },
    {
      id: 'glba',
      name: 'GLBA',
      fullName: 'Gramm-Leach-Bliley Act',
      category: 'Financial',
      description: 'Law that requires financial institutions to explain how they share and protect customer data.',
      keyRequirements: [
        'Financial Privacy Rule',
        'Safeguards Rule',
        'Pretexting Protection',
        'Secure data disposal',
        'Access controls'
      ],
      nacRelevance: 'Medium',
      regions: ['United States'],
      industries: ['Financial Services', 'Banking', 'Insurance', 'Financial Advisors'],
      penalties: 'Up to $100,000 per violation for institutions, $10,000 for officers and directors',
      year: 1999,
      portnoxAdvantages: [
        'Network segmentation for financial data environments',
        'Strong authentication for financial systems access',
        'Continuous monitoring of device compliance',
        'Detailed audit trails for regulatory evidence',
        'Simplified implementation of technical safeguards'
      ]
    },
    {
      id: 'ferpa',
      name: 'FERPA',
      fullName: 'Family Educational Rights and Privacy Act',
      category: 'Education',
      description: 'Federal law that protects the privacy of student education records.',
      keyRequirements: [
        'Access control to educational records',
        'Parental/student rights to access records',
        'Amendment of inaccurate information',
        'Consent for disclosure',
        'Annual notification of rights'
      ],
      nacRelevance: 'Medium',
      regions: ['United States'],
      industries: ['Education', 'Higher Education'],
      penalties: 'Loss of federal funding for institutions',
      year: 1974,
      portnoxAdvantages: [
        'Role-based access controls for educational record systems',
        'Device authentication for campus networks',
        'Segmentation of administrative and student networks',
        'Audit logging of access to protected information systems',
        'Simplified compliance for educational technology environments'
      ]
    },
    {
      id: 'fisma',
      name: 'FISMA',
      fullName: 'Federal Information Security Modernization Act',
      category: 'Government',
      description: 'Law that defines a framework for protecting government information and operations.',
      keyRequirements: [
        'Security categorization',
        'Security controls',
        'Risk assessment',
        'Security planning',
        'Continuous monitoring'
      ],
      nacRelevance: 'High',
      regions: ['United States'],
      industries: ['Federal Government', 'Government Contractors'],
      penalties: 'Budget consequences, negative ratings in federal reports',
      year: 2014,
      portnoxAdvantages: [
        'Implementation of NIST SP 800-53 security controls',
        'Network access controls aligned with federal requirements',
        'Continuous monitoring capabilities for real-time assessment',
        'Automated compliance documentation for authorization packages',
        'Implementation of least privilege access principles'
      ]
    },
    {
      id: 'nerc-cip',
      name: 'NERC CIP',
      fullName: 'North American Electric Reliability Corporation Critical Infrastructure Protection',
      category: 'Energy',
      description: 'Standards to ensure the protection of critical cyber assets that control or affect the reliability of North American bulk electric systems.',
      keyRequirements: [
        'Critical Cyber Asset Identification',
        'Security Management Controls',
        'Personnel & Training',
        'Electronic Security Perimeters',
        'Physical Security'
      ],
      nacRelevance: 'High',
      regions: ['North America'],
      industries: ['Electric Utilities', 'Power Generation', 'Energy'],
      penalties: 'Up to $1 million per violation per day',
      year: 2008,
      portnoxAdvantages: [
        'Network segmentation for Electronic Security Perimeters',
        'Access control for Critical Cyber Assets',
        'Detailed audit logging for compliance evidence',
        'Device authentication for secure remote access',
        'Automated enforcement of security policies'
      ]
    },
    {
      id: 'cmmc',
      name: 'CMMC',
      fullName: 'Cybersecurity Maturity Model Certification',
      category: 'Defense',
      description: 'Unified standard for implementing cybersecurity across the Defense Industrial Base.',
      keyRequirements: [
        'Access Control',
        'Asset Management',
        'Audit and Accountability',
        'Configuration Management',
        'Identification and Authentication'
      ],
      nacRelevance: 'High',
      regions: ['United States'],
      industries: ['Defense Contractors', 'Aerospace', 'Military Suppliers'],
      penalties: 'Loss of eligibility for defense contracts',
      year: 2020,
      portnoxAdvantages: [
        'Implementation of access control practices (CMMC AC.1.001-AC.3.014)',
        'Support for identification and authentication (CMMC IA.1.076-IA.3.083)',
        'System and communications protection capabilities (CMMC SC.1.175-SC.5.208)',
        'Audit and accountability features (CMMC AU.2.041-AU.3.046)',
        'System and information integrity controls (CMMC SI.1.210-SI.5.222)'
      ]
    },
    {
      id: 'hitrust',
      name: 'HITRUST',
      fullName: 'Health Information Trust Alliance',
      category: 'Healthcare',
      description: 'Framework that leverages existing regulations and standards to create a comprehensive set of baseline security controls.',
      keyRequirements: [
        'Information Protection Program',
        'Access Control',
        'Human Resources Security',
        'Risk Management',
        'Incident Management'
      ],
      nacRelevance: 'High',
      regions: ['United States', 'Global Adoption'],
      industries: ['Healthcare', 'Health IT', 'Health Information Exchanges'],
      penalties: 'No direct penalties (certification framework)',
      year: 2007,
      portnoxAdvantages: [
        'Implementation of access control domain requirements',
        'Network security measures aligned with HITRUST domains',
        'Device authentication for healthcare environments',
        'Detailed compliance reporting for certification',
        'Automated enforcement of security policies'
      ]
    },
    {
      id: 'disa-stig',
      name: 'DISA STIGs',
      fullName: 'Defense Information Systems Agency Security Technical Implementation Guides',
      category: 'Defense',
      description: 'Configuration standards for DOD IA and IA-enabled devices/systems.',
      keyRequirements: [
        'Access control mechanisms',
        'Authentication requirements',
        'Network protection measures',
        'Auditing capabilities',
        'Configuration management'
      ],
      nacRelevance: 'High',
      regions: ['United States'],
      industries: ['Defense', 'Government', 'Military'],
      penalties: 'System accreditation denial, removal from networks',
      year: 2001,
      portnoxAdvantages: [
        'Enforcement of network STIG compliance',
        'Authentication aligned with DoD requirements',
        'Network segmentation for security boundaries',
        'Device compliance verification',
        'Detailed audit logging for investigation support'
      ]
    },
    {
      id: 'nist-800-171',
      name: 'NIST 800-171',
      fullName: 'NIST Special Publication 800-171',
      category: 'Government',
      description: 'Guidelines for protecting controlled unclassified information in non-federal systems.',
      keyRequirements: [
        'Access Control',
        'Awareness and Training',
        'Configuration Management',
        'Identification and Authentication',
        'System and Communications Protection'
      ],
      nacRelevance: 'High',
      regions: ['United States'],
      industries: ['Defense Contractors', 'Government Suppliers', 'Research Institutions'],
      penalties: 'Loss of contracts, legal liability',
      year: 2015,
      portnoxAdvantages: [
        'Implementation of access control requirements (3.1.1-3.1.22)',
        'Support for identification and authentication requirements (3.5.1-3.5.11)',
        'System and communications protection measures (3.13.1-3.13.16)',
        'Detailed audit capabilities for compliance (3.3.1-3.3.9)',
        'Network segmentation supporting CUI protection'
      ]
    },
    {
      id: 'sox',
      name: 'SOX',
      fullName: 'Sarbanes-Oxley Act',
      category: 'Financial',
      description: 'Law that requires strict financial disclosures and internal control assessments from public companies.',
      keyRequirements: [
        'IT General Controls',
        'Access Control & Segregation of Duties',
        'Change Management',
        'Security Management',
        'System Development & Acquisition'
      ],
      nacRelevance: 'Medium',
      regions: ['United States', 'Companies listed on US exchanges'],
      industries: ['Public Companies', 'Financial Services', 'Accounting'],
      penalties: 'Up to $5 million in fines and 20 years imprisonment for executives',
      year: 2002,
      portnoxAdvantages: [
        'Enforced access controls for financial systems',
        'Detailed audit trails for SOX 404 compliance',
        'Segregation of duties through network segmentation',
        'Continuous monitoring of access to financial resources',
        'Simplified evidence collection for IT general controls'
      ]
    }
  ];
  
  // Vendor compliance coverage mapping
  const vendorCompliance = {
    cisco: {
      hipaa: 'full',
      'pci-dss': 'full',
      gdpr: 'partial',
      'nist-csf': 'full',
      iso27001: 'full',
      soc2: 'partial',
      ccpa: 'partial',
      glba: 'full',
      ferpa: 'partial',
      fisma: 'full',
      'nerc-cip': 'full',
      cmmc: 'full',
      hitrust: 'full',
      'disa-stig': 'full',
      'nist-800-171': 'full',
      sox: 'partial'
    },
    aruba: {
      hipaa: 'full',
      'pci-dss': 'full',
      gdpr: 'partial',
      'nist-csf': 'full',
      iso27001: 'full',
      soc2: 'partial',
      ccpa: 'partial',
      glba: 'full',
      ferpa: 'partial',
      fisma: 'full',
      'nerc-cip': 'full',
      cmmc: 'partial',
      hitrust: 'full',
      'disa-stig': 'partial',
      'nist-800-171': 'full',
      sox: 'partial'
    },
    forescout: {
      hipaa: 'full',
      'pci-dss': 'full',
      gdpr: 'partial',
      'nist-csf': 'full',
      iso27001: 'full',
      soc2: 'partial',
      ccpa: 'partial',
      glba: 'partial',
      ferpa: 'partial',
      fisma: 'full',
      'nerc-cip': 'full',
      cmmc: 'partial',
      hitrust: 'partial',
      'disa-stig': 'partial',
      'nist-800-171': 'full',
      sox: 'partial'
    },
    fortinac: {
      hipaa: 'partial',
      'pci-dss': 'full',
      gdpr: 'partial',
      'nist-csf': 'partial',
      iso27001: 'partial',
      soc2: 'partial',
      ccpa: 'partial',
      glba: 'partial',
      ferpa: 'partial',
      fisma: 'partial',
      'nerc-cip': 'partial',
      cmmc: 'partial',
      hitrust: 'partial',
      'disa-stig': 'partial',
      'nist-800-171': 'partial',
      sox: 'partial'
    },
    nps: {
      hipaa: 'partial',
      'pci-dss': 'partial',
      gdpr: 'none',
      'nist-csf': 'partial',
      iso27001: 'partial',
      soc2: 'none',
      ccpa: 'none',
      glba: 'partial',
      ferpa: 'partial',
      fisma: 'partial',
      'nerc-cip': 'none',
      cmmc: 'none',
      hitrust: 'none',
      'disa-stig': 'none',
      'nist-800-171': 'partial',
      sox: 'none'
    },
    securew2: {
      hipaa: 'partial',
      'pci-dss': 'partial',
      gdpr: 'partial',
      'nist-csf': 'partial',
      iso27001: 'partial',
      soc2: 'partial',
      ccpa: 'none',
      glba: 'partial',
      ferpa: 'partial',
      fisma: 'partial',
      'nerc-cip': 'none',
      cmmc: 'partial',
      hitrust: 'partial',
      'disa-stig': 'partial',
      'nist-800-171': 'partial',
      sox: 'none'
    },
    portnox: {
      hipaa: 'full',
      'pci-dss': 'full',
      gdpr: 'full',
      'nist-csf': 'full',
      iso27001: 'full',
      soc2: 'full',
      ccpa: 'partial',
      glba: 'full',
      ferpa: 'full',
      fisma: 'full',
      'nerc-cip': 'full',
      cmmc: 'full',
      hitrust: 'full',
      'disa-stig': 'full',
      'nist-800-171': 'full',
      sox: 'partial'
    }
  };
  
  // Industry compliance mapping - which frameworks are important for each industry
  const industryCompliance = {
    healthcare: [
      { id: 'hipaa', importance: 'critical' },
      { id: 'hitrust', importance: 'high' },
      { id: 'nist-csf', importance: 'medium' },
      { id: 'iso27001', importance: 'medium' },
      { id: 'gdpr', importance: 'medium' }
    ],
    financial: [
      { id: 'pci-dss', importance: 'critical' },
      { id: 'glba', importance: 'critical' },
      { id: 'sox', importance: 'critical' },
      { id: 'iso27001', importance: 'high' },
      { id: 'nist-csf', importance: 'medium' }
    ],
    retail: [
      { id: 'pci-dss', importance: 'critical' },
      { id: 'gdpr', importance: 'high' },
      { id: 'ccpa', importance: 'high' },
      { id: 'iso27001', importance: 'medium' },
      { id: 'nist-csf', importance: 'medium' }
    ],
    education: [
      { id: 'ferpa', importance: 'critical' },
      { id: 'gdpr', importance: 'high' },
      { id: 'nist-csf', importance: 'medium' },
      { id: 'iso27001', importance: 'medium' },
      { id: 'pci-dss', importance: 'low' }
    ],
    government: [
      { id: 'fisma', importance: 'critical' },
      { id: 'nist-800-171', importance: 'critical' },
      { id: 'disa-stig', importance: 'high' },
      { id: 'cmmc', importance: 'high' },
      { id: 'nist-csf', importance: 'high' }
    ],
    manufacturing: [
      { id: 'nist-csf', importance: 'high' },
      { id: 'iso27001', importance: 'high' },
      { id: 'cmmc', importance: 'medium' },
      { id: 'nist-800-171', importance: 'medium' },
      { id: 'gdpr', importance: 'medium' }
    ],
    energy: [
      { id: 'nerc-cip', importance: 'critical' },
      { id: 'nist-csf', importance: 'high' },
      { id: 'iso27001', importance: 'high' },
      { id: 'fisma', importance: 'medium' },
      { id: 'nist-800-171', importance: 'medium' }
    ],
    telecom: [
      { id: 'nist-csf', importance: 'high' },
      { id: 'iso27001', importance: 'high' },
      { id: 'gdpr', importance: 'high' },
      { id: 'ccpa', importance: 'medium' },
      { id: 'soc2', importance: 'medium' }
    ]
  };
  
  // Get framework data by ID
  function getFrameworkById(id) {
    return frameworks.find(framework => framework.id === id);
  }
  
  // Get all frameworks for a specific industry
  function getFrameworksForIndustry(industry) {
    if (industryCompliance[industry]) {
      return industryCompliance[industry].map(fw => {
        const framework = getFrameworkById(fw.id);
        return {
          ...framework,
          importance: fw.importance
        };
      });
    }
    return [];
  }
  
  // Calculate compliance coverage percentage for a vendor
  function calculateComplianceCoverage(vendorId) {
    if (!vendorCompliance[vendorId]) return 0;
    
    const vendorRatings = vendorCompliance[vendorId];
    const totalFrameworks = Object.keys(vendorRatings).length;
    
    if (totalFrameworks === 0) return 0;
    
    let coverageScore = 0;
    
    Object.values(vendorRatings).forEach(rating => {
      if (rating === 'full') coverageScore += 1;
      else if (rating === 'partial') coverageScore += 0.5;
    });
    
    return Math.round((coverageScore / totalFrameworks) * 100);
  }
  
  // Create compliance matrix visualization
  function createComplianceMatrix(selector, vendorIds = []) {
    // If ModernCharts is available, use it
    if (typeof ModernCharts !== 'undefined' && ModernCharts.charts.complianceMatrix) {
      // Prepare data for the matrix
      const matrixData = {
        frameworks: frameworks.map(fw => ({
          name: fw.name,
          compliance: {}
        })),
        vendors: vendorIds.map(id => ({
          id: id,
          name: id.charAt(0).toUpperCase() + id.slice(1) // Simple capitalization
        }))
      };
      
      // Fill in the compliance data
      matrixData.frameworks.forEach((framework, index) => {
        vendorIds.forEach(vendorId => {
          if (vendorCompliance[vendorId] && vendorCompliance[vendorId][frameworks[index].id]) {
            framework.compliance[vendorId] = vendorCompliance[vendorId][frameworks[index].id];
          } else {
            framework.compliance[vendorId] = 'none';
          }
        });
      });
      
      ModernCharts.charts.complianceMatrix(selector, matrixData);
    } else {
      console.error('ModernCharts.charts.complianceMatrix is not available');
    }
  }
  
  // Create a framework details card
  function createFrameworkDetailsCard(selector, frameworkId) {
    const container = document.querySelector(selector);
    if (!container) return;
    
    const framework = getFrameworkById(frameworkId);
    if (!framework) return;
    
    // Create card
    const card = document.createElement('div');
    card.className = 'framework-details-card bg-white shadow-md rounded-lg overflow-hidden';
    
    // Card header
    const header = document.createElement('div');
    header.className = 'framework-header bg-blue-600 text-white p-4';
    header.innerHTML = `
      <h3 class="text-xl font-semibold">${framework.name}</h3>
      <div class="text-sm opacity-90">${framework.fullName}</div>
    `;
    card.appendChild(header);
    
    // Card body
    const body = document.createElement('div');
    body.className = 'framework-body p-4';
    
    // Framework info
    const info = document.createElement('div');
    info.className = 'framework-info mb-4';
    info.innerHTML = `
      <p class="mb-2">${framework.description}</p>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <div>
          <div class="text-sm text-gray-500">Category</div>
          <div class="font-medium">${framework.category}</div>
        </div>
        <div>
          <div class="text-sm text-gray-500">Year Established</div>
          <div class="font-medium">${framework.year}</div>
        </div>
        <div>
          <div class="text-sm text-gray-500">NAC Relevance</div>
          <div class="font-medium">${framework.nacRelevance}</div>
        </div>
        <div>
          <div class="text-sm text-gray-500">Penalties</div>
          <div class="font-medium">${framework.penalties}</div>
        </div>
      </div>
    `;
    body.appendChild(info);
    
    // Key requirements
    const requirements = document.createElement('div');
    requirements.className = 'framework-requirements mb-4';
    requirements.innerHTML = '<h4 class="font-semibold mb-2">Key Requirements</h4>';
    
    const reqList = document.createElement('ul');
    reqList.className = 'list-disc ml-5 space-y-1';
    
    framework.keyRequirements.forEach(req => {
      const item = document.createElement('li');
      item.textContent = req;
      reqList.appendChild(item);
    });
    
    requirements.appendChild(reqList);
    body.appendChild(requirements);
    
    // Portnox advantages
    const advantages = document.createElement('div');
    advantages.className = 'framework-advantages bg-blue-50 p-4 rounded-md';
    advantages.innerHTML = '<h4 class="font-semibold mb-2 text-blue-700">How Portnox Helps</h4>';
    
    const advList = document.createElement('ul');
    advList.className = 'space-y-2';
    
    framework.portnoxAdvantages.forEach(adv => {
      const item = document.createElement('li');
      item.className = 'flex items-start';
      item.innerHTML = `
        <div class="text-blue-600 mr-2 mt-1"><i class="fas fa-check-circle"></i></div>
        <div>${adv}</div>
      `;
      advList.appendChild(item);
    });
    
    advantages.appendChild(advList);
    body.appendChild(advantages);
    
    // Vendor compliance
    const vendorComp = document.createElement('div');
    vendorComp.className = 'vendor-compliance mt-4';
    vendorComp.innerHTML = '<h4 class="font-semibold mb-2">Vendor Compliance</h4>';
    
    const vendorCompGrid = document.createElement('div');
    vendorCompGrid.className = 'grid grid-cols-4 gap-2';
    
    Object.keys(vendorCompliance).forEach(vendorId => {
      const compliance = vendorCompliance[vendorId][framework.id] || 'none';
      let color = '';
      
      if (compliance === 'full') color = 'bg-green-100 text-green-800';
      else if (compliance === 'partial') color = 'bg-yellow-100 text-yellow-800';
      else color = 'bg-red-100 text-red-800';
      
      const vendorItem = document.createElement('div');
      vendorItem.className = `p-2 text-center rounded ${color}`;
      vendorItem.textContent = vendorId.charAt(0).toUpperCase() + vendorId.slice(1);
      
      vendorCompGrid.appendChild(vendorItem);
    });
    
    vendorComp.appendChild(vendorCompGrid);
    body.appendChild(vendorComp);
    
    card.appendChild(body);
    
    // Clear container and add card
    container.innerHTML = '';
    container.appendChild(card);
  }
  
  // Create industry compliance recommendation
  function createIndustryCompliance(selector, industry) {
    const container = document.querySelector(selector);
    if (!container) return;
    
    const industryFrameworks = getFrameworksForIndustry(industry);
    if (industryFrameworks.length === 0) return;
    
    // Create container
    const wrapper = document.createElement('div');
    wrapper.className = 'industry-compliance-wrapper';
    
    // Header
    const header = document.createElement('div');
    header.className = 'industry-header bg-white p-4 rounded-lg shadow-md mb-4';
    header.innerHTML = `
      <h3 class="text-lg font-semibold">${industry.charAt(0).toUpperCase() + industry.slice(1)} Industry Compliance Requirements</h3>
      <p class="text-gray-600">Key regulatory frameworks and compliance requirements for your industry</p>
    `;
    wrapper.appendChild(header);
    
    // Frameworks grid
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';
    
    industryFrameworks.forEach((framework, index) => {
      const card = document.createElement('div');
      card.className = 'bg-white p-4 rounded-lg shadow-md stagger-item fade-in';
      card.style.animationDelay = `${index * 100}ms`;
      
      // Importance badge
      let importanceBadge = '';
      if (framework.importance === 'critical') {
        importanceBadge = '<span class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Critical</span>';
      } else if (framework.importance === 'high') {
        importanceBadge = '<span class="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">High</span>';
      } else {
        importanceBadge = '<span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Medium</span>';
      }
      
      card.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-lg font-semibold">${framework.name}</h4>
          ${importanceBadge}
        </div>
        <div class="text-sm text-gray-500 mb-2">${framework.fullName}</div>
        <p class="text-gray-600 mb-4">${framework.description}</p>
        
        <div class="bg-blue-50 p-3 rounded">
          <div class="text-sm font-medium text-blue-800 mb-2">Vendor Support</div>
          <div class="grid grid-cols-7 gap-1">
            ${Object.keys(vendorCompliance).map(vendorId => {
              const compliance = vendorCompliance[vendorId][framework.id] || 'none';
              let color = '';
              
              if (compliance === 'full') color = 'bg-green-500';
              else if (compliance === 'partial') color = 'bg-yellow-500';
              else color = 'bg-red-500';
              
              return `
                <div class="flex flex-col items-center">
                  <div class="w-6 h-6 ${color} rounded-full"></div>
                  <div class="text-xs mt-1">${vendorId.substring(0, 3)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
      
      grid.appendChild(card);
    });
    
    wrapper.appendChild(grid);
    
    // Portnox advantage callout
    const portnoxAdvantage = document.createElement('div');
    portnoxAdvantage.className = 'mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4';
    
    // Calculate Portnox coverage for this industry
    const industryFrameworkIds = industryFrameworks.map(fw => fw.id);
    let portnoxCoverage = 0;
    let competitors = Object.keys(vendorCompliance).filter(v => v !== 'portnox');
    let bestCompetitorCoverage = 0;
    
    industryFrameworkIds.forEach(fwId => {
      if (vendorCompliance.portnox[fwId] === 'full') portnoxCoverage += 1;
      else if (vendorCompliance.portnox[fwId] === 'partial') portnoxCoverage += 0.5;
      
      // Find best competitor coverage
      competitors.forEach(comp => {
        let competitorCoverage = 0;
        industryFrameworkIds.forEach(fwId => {
          if (vendorCompliance[comp][fwId] === 'full') competitorCoverage += 1;
          else if (vendorCompliance[comp][fwId] === 'partial') competitorCoverage += 0.5;
        });
        
        if (competitorCoverage > bestCompetitorCoverage) {
          bestCompetitorCoverage = competitorCoverage;
        }
      });
    });
    
    const portnoxCoveragePercent = Math.round((portnoxCoverage / industryFrameworkIds.length) * 100);
    const bestCompCoveragePercent = Math.round((bestCompetitorCoverage / industryFrameworkIds.length) * 100);
    const advantagePercent = portnoxCoveragePercent - bestCompCoveragePercent;
    
    portnoxAdvantage.innerHTML = `
      <div class="flex items-start">
        <div class="mr-4 bg-blue-100 p-3 rounded-full">
          <i class="fas fa-shield-alt text-blue-600 text-xl"></i>
        </div>
        <div>
          <h4 class="text-lg font-semibold text-blue-800 mb-2">Portnox Compliance Advantage</h4>
          <p class="text-blue-700 mb-3">Portnox provides ${portnoxCoveragePercent}% coverage of ${industry} compliance requirements, ${advantagePercent}% better than the next best competitor.</p>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="text-sm text-blue-700 mb-1">Portnox Coverage</div>
              <div class="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-blue-600 rounded-full" style="width: ${portnoxCoveragePercent}%"></div>
              </div>
              <div class="text-right text-sm text-blue-800 mt-1">${portnoxCoveragePercent}%</div>
            </div>
            <div>
              <div class="text-sm text-blue-700 mb-1">Top Competitor Coverage</div>
              <div class="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-gray-400 rounded-full" style="width: ${bestCompCoveragePercent}%"></div>
              </div>
              <div class="text-right text-sm text-blue-800 mt-1">${bestCompCoveragePercent}%</div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    wrapper.appendChild(portnoxAdvantage);
    
    // Clear container and add wrapper
    container.innerHTML = '';
    container.appendChild(wrapper);
  }
  
  // Return public API
  return {
    getAllFrameworks: () => frameworks,
    getFrameworkById: getFrameworkById,
    getFrameworksForIndustry: getFrameworksForIndustry,
    calculateComplianceCoverage: calculateComplianceCoverage,
    createComplianceMatrix: createComplianceMatrix,
    createFrameworkDetailsCard: createFrameworkDetailsCard,
    createIndustryCompliance: createIndustryCompliance,
    vendorCompliance: vendorCompliance,
    industryCompliance: industryCompliance
  };
})();
EOF

# Create enhanced wizard JavaScript
cat > js/components/enhanced/modern-wizard.js << 'EOF'
/**
 * Modern Wizard Component for NAC Architecture Designer Pro
 * Implements an enhanced, animated wizard interface with themed step icons
 */

const ModernWizard = (function() {
  // Configuration
  let config = {
    containerSelector: '#wizard-container',
    stepsSelector: '.wizard-step',
    navigationSelector: '.wizard-navigation',
    prevButtonSelector: '#wizard-prev',
    nextButtonSelector: '#wizard-next',
    stepTitleSelector: '.step-title',
    activeStepClass: 'active',
    completedStepClass: 'completed',
    hiddenClass: 'hidden',
    onStepChange: null,
    darkMode: false,
    animationEnabled: true
  };
  
  // State
  let state = {
    currentStep: 1,
    totalSteps: 0,
    steps: [],
    isInitialized: false
  };
  
  // Initialize the wizard
  function init(options = {}) {
    // Apply custom configuration
    config = { ...config, ...options };
    
    // Get elements
    const container = document.querySelector(config.containerSelector);
    if (!container) {
      console.error('Wizard container not found');
      return false;
    }
    
    const stepElements = container.querySelectorAll(config.stepsSelector);
    if (stepElements.length === 0) {
      console.error('No wizard steps found');
      return false;
    }
    
    // Initialize state
    state.totalSteps = stepElements.length;
    state.steps = Array.from(stepElements);
    
    if (state.currentStep > state.totalSteps) {
      state.currentStep = 1;
    }
    
    // Setup navigation
    setupNavigation();
    
    // Initialize step display
    updateStepDisplay();
    
    // Add modern progress indicator
    createProgressIndicator(container);
    
    state.isInitialized = true;
    
    return true;
  }
  
  // Setup navigation buttons
  function setupNavigation() {
    const prevButton = document.querySelector(config.prevButtonSelector);
    const nextButton = document.querySelector(config.nextButtonSelector);
    
    if (prevButton) {
      prevButton.addEventListener('click', goToPrevStep);
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', goToNextStep);
    }
  }
  
  // Create modern progress indicator
  function createProgressIndicator(container) {
    // Check if progress indicator already exists
    const existingIndicator = container.querySelector('.wizard-progress-modern');
    if (existingIndicator) {
      existingIndicator.remove();
    }
    
    // Create progress container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'wizard-progress-modern';
    
    // Add step indicators
    for (let i = 1; i <= state.totalSteps; i++) {
      const stepIndicator = document.createElement('div');
      stepIndicator.className = 'wizard-step-indicator';
      stepIndicator.dataset.step = i;
      
      // Icon
      const iconContainer = document.createElement('div');
      iconContainer.className = 'step-icon-container';
      
      // Use themed icons based on step
      let iconSrc = '';
      if (i === 1) iconSrc = 'img/wizard-icons/vendor-selection.svg';
      else if (i === 2) iconSrc = 'img/wizard-icons/compliance.svg';
      else if (i === 3) iconSrc = 'img/wizard-icons/organization.svg';
      else if (i === 4) iconSrc = 'img/wizard-icons/cost-config.svg';
      else iconSrc = 'img/wizard-icons/results.svg';
      
      const iconImg = document.createElement('img');
      iconImg.src = iconSrc;
      iconImg.alt = `Step ${i} icon`;
      iconImg.className = 'step-icon';
      
      iconContainer.appendChild(iconImg);
      stepIndicator.appendChild(iconContainer);
      
      // Label
      const label = document.createElement('div');
      label.className = 'step-label';
      
      // Use step titles if available
      if (state.steps[i-1]) {
        const titleElement = state.steps[i-1].querySelector(config.stepTitleSelector);
        if (titleElement) {
          label.textContent = titleElement.textContent;
        } else {
          label.textContent = `Step ${i}`;
        }
      } else {
        label.textContent = `Step ${i}`;
      }
      
      stepIndicator.appendChild(label);
      
      // Add click handler for navigation
      stepIndicator.addEventListener('click', () => {
        if (i < state.currentStep || isStepValid(state.currentStep)) {
          goToStep(i);
        }
      });
      
      progressContainer.appendChild(stepIndicator);
    }
    
    // Add progress line
    const progressLine = document.createElement('div');
    progressLine.className = 'progress-line';
    progressContainer.appendChild(progressLine);
    
    // Insert after the first child (usually the header)
    const firstChild = container.firstChild;
    container.insertBefore(progressContainer, firstChild ? firstChild.nextSibling : firstChild);
    
    // Initial update
    updateProgressIndicator();
  }
  
  // Update progress indicator state
  function updateProgressIndicator() {
    const progressIndicator = document.querySelector('.wizard-progress-modern');
    if (!progressIndicator) return;
    
    // Update step indicators
    const stepIndicators = progressIndicator.querySelectorAll('.wizard-step-indicator');
    stepIndicators.forEach((indicator, index) => {
      const step = index + 1;
      
      if (step === state.currentStep) {
        indicator.classList.add('active');
        indicator.classList.remove('completed');
      } else if (step < state.currentStep) {
        indicator.classList.remove('active');
        indicator.classList.add('completed');
      } else {
        indicator.classList.remove('active');
        indicator.classList.remove('completed');
      }
    });
    
    // Update progress line
    const progressLine = progressIndicator.querySelector('.progress-line');
    if (progressLine) {
      const progress = ((state.currentStep - 1) / (state.totalSteps - 1)) * 100;
      progressLine.style.width = `${progress}%`;
    }
  }
  
  // Update step display
  function updateStepDisplay() {
    // Hide all steps
    state.steps.forEach((step, index) => {
      const stepNumber = index + 1;
      
      if (stepNumber === state.currentStep) {
        showStep(step);
      } else {
        hideStep(step);
      }
    });
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Update progress indicator
    updateProgressIndicator();
    
    // Call onStepChange callback if provided
    if (typeof config.onStepChange === 'function') {
      config.onStepChange(state.currentStep);
    }
  }
  
  // Show a step with animation
  function showStep(stepElement) {
    // Remove hidden class
    stepElement.classList.remove(config.hiddenClass);
    
    // Add active class
    stepElement.classList.add(config.activeStepClass);
    
    // Add animation if enabled
    if (config.animationEnabled) {
      stepElement.classList.add('wizard-step-animate-in');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        stepElement.classList.remove('wizard-step-animate-in');
      }, 500);
    }
  }
  
  // Hide a step
  function hideStep(stepElement) {
    stepElement.classList.add(config.hiddenClass);
    stepElement.classList.remove(config.activeStepClass);
  }
  
  // Update navigation buttons
  function updateNavigationButtons() {
    const prevButton = document.querySelector(config.prevButtonSelector);
    const nextButton = document.querySelector(config.nextButtonSelector);
    
    if (prevButton) {
      if (state.currentStep === 1) {
        prevButton.disabled = true;
        prevButton.classList.add('disabled');
      } else {
        prevButton.disabled = false;
        prevButton.classList.remove('disabled');
      }
    }
    
    if (nextButton) {
      if (state.currentStep === state.totalSteps) {
        nextButton.textContent = 'Finish';
      } else {
        nextButton.textContent = 'Next';
      }
    }
  }
  
  // Go to previous step
  function goToPrevStep() {
    if (state.currentStep > 1) {
      state.currentStep--;
      updateStepDisplay();
    }
  }
  
  // Go to next step
  function goToNextStep() {
    if (isStepValid(state.currentStep)) {
      if (state.currentStep < state.totalSteps) {
        state.currentStep++;
        updateStepDisplay();
      } else {
        // Last step - finish wizard
        finishWizard();
      }
    }
  }
  
  // Go to a specific step
  function goToStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= state.totalSteps) {
      state.currentStep = stepNumber;
      updateStepDisplay();
    }
  }
  
  // Validate current step
  function isStepValid(stepNumber) {
    // Get step element
    const stepElement = state.steps[stepNumber - 1];
    if (!stepElement) return false;
    
    // Get all required inputs in the step
    const requiredInputs = stepElement.querySelectorAll('input[required], select[required], textarea[required]');
    
    // Check if all required inputs have value
    let isValid = true;
    requiredInputs.forEach(input => {
      if (!input.value) {
        isValid = false;
        highlightInvalidInput(input);
      } else {
        removeInvalidHighlight(input);
      }
    });
    
    return isValid;
  }
  
  // Highlight invalid input
  function highlightInvalidInput(input) {
    input.classList.add('invalid-input');
    
    // Add error message if not exists
    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message text-red-500 text-sm mt-1';
      errorMessage.textContent = 'This field is required';
      
      input.parentNode.insertBefore(errorMessage, input.nextSibling);
    }
    
    // Add input event to remove error on input
    input.addEventListener('input', function onInput() {
      if (input.value) {
        removeInvalidHighlight(input);
        input.removeEventListener('input', onInput);
      }
    });
  }
  
  // Remove invalid highlight
  function removeInvalidHighlight(input) {
    input.classList.remove('invalid-input');
    
    // Remove error message if exists
    if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
      input.nextElementSibling.remove();
    }
  }
  
  // Finish wizard
  function finishWizard() {
    // Trigger a custom event
    const event = new CustomEvent('wizardComplete', {
      detail: { currentStep: state.currentStep }
    });
    
    document.dispatchEvent(event);
  }
  
  // Reset wizard to first step
  function reset() {
    state.currentStep = 1;
    updateStepDisplay();
  }
  
  // Update dark mode setting
  function setDarkMode(isDarkMode) {
    config.darkMode = isDarkMode;
    
    const container = document.querySelector(config.containerSelector);
    if (container) {
      if (isDarkMode) {
        container.classList.add('dark-mode');
      } else {
        container.classList.remove('dark-mode');
      }
    }
  }
  
  // Public API
  return {
    init: init,
    next: goToNextStep,
    prev: goToPrevStep,
    goToStep: goToStep,
    reset: reset,
    getCurrentStep: () => state.currentStep,
    getTotalSteps: () => state.totalSteps,
    setDarkMode: setDarkMode,
    isInitialized: () => state.isInitialized
  };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize ModernWizard with custom options
  ModernWizard.init({
    containerSelector: '#wizard-container',
    stepsSelector: '.wizard-step',
    prevButtonSelector: '#wizard-prev',
    nextButtonSelector: '#wizard-next',
    onStepChange: function(step) {
      console.log('Current step:', step);
      
      // You can add custom step change logic here
      // For example, update URL, analytics, etc.
      
      // Update step counter if exists
      const currentStepElement = document.querySelector('#current-step');
      if (currentStepElement) {
        currentStepElement.textContent = step;
      }
    }
  });
  
  // Listen for dark mode changes
  document.addEventListener('darkModeChanged', function(e) {
    ModernWizard.setDarkMode(e.detail.isDarkMode);
  });
});
EOF

# Create main application JavaScript with modern UI
cat > js/main.js << 'EOF'
/**
 * Main Application JavaScript for NAC Architecture Designer Pro
 * Handles core functionality, theme switching, and component coordination
 */

const NACDesignerApp = (function() {
  // Configuration
  let config = {
    darkMode: false,
    selectedVendor: 'cisco',
    currentIndustry: 'healthcare',
    deviceCount: 1000,
    implementationTimeframe: '3-years',
    complianceFrameworks: ['hipaa', 'pci-dss', 'nist-csf', 'gdpr', 'iso27001']
  };
  
  // DOM Elements
  let elements = {
    darkModeToggle: null,
    vendorSelectors: null,
    chartContainers: null,
    tabButtons: null,
    tabContents: null
  };
  
  // Initialize application
  function init() {
    // Get DOM elements
    cacheElements();
    
    // Setup event listeners
    setupEventListeners();
    
    // Check for dark mode preference
    checkDarkModePreference();
    
    // Initialize vendor selection
    initVendorSelection();
    
    // Initialize tabs
    initTabs();
    
    // Initialize charts (if ModernCharts is available)
    initCharts();
    
    // Add startup animation
    addStartupAnimation();
    
    console.log('NAC Designer Pro initialized');
  }
  
  // Cache DOM elements
  function cacheElements() {
    elements.darkModeToggle = document.querySelector('#dark-mode-toggle');
    elements.vendorSelectors = document.querySelectorAll('.vendor-selector');
    elements.chartContainers = document.querySelectorAll('.chart-container');
    elements.tabButtons = document.querySelectorAll('.tab-button');
    elements.tabContents = document.querySelectorAll('.tab-content');
  }
  
  // Setup event listeners
  function setupEventListeners() {
    // Dark mode toggle
    if (elements.darkModeToggle) {
      elements.darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Vendor selectors
    if (elements.vendorSelectors) {
      elements.vendorSelectors.forEach(selector => {
        selector.addEventListener('click', handleVendorSelection);
      });
    }
    
    // Tab buttons
    if (elements.tabButtons) {
      elements.tabButtons.forEach(button => {
        button.addEventListener('click', handleTabClick);
      });
    }
    
    // Listen for wizard completion
    document.addEventListener('wizardComplete', handleWizardCompletion);
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
  }
  
  // Check if user prefers dark mode
  function checkDarkModePreference() {
    // Check localStorage first
    const storedPreference = localStorage.getItem('darkMode');
    
    if (storedPreference) {
      setDarkMode(storedPreference === 'true');
    } else {
      // Check system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
    }
  }
  
  // Toggle dark mode
  function toggleDarkMode() {
    setDarkMode(!config.darkMode);
  }
  
  // Set dark mode state
  function setDarkMode(isDarkMode) {
    config.darkMode = isDarkMode;
    
    // Update DOM
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Update toggle if exists
    if (elements.darkModeToggle) {
      const icon = elements.darkModeToggle.querySelector('i');
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
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
    
    // Dispatch event for other components
    const event = new CustomEvent('darkModeChanged', {
      detail: { isDarkMode: isDarkMode }
    });
    
    document.dispatchEvent(event);
    
    // Update charts if ModernCharts is available
    if (typeof ModernCharts !== 'undefined' && ModernCharts.updateDarkMode) {
      ModernCharts.updateDarkMode(isDarkMode);
    }
  }
  
  // Initialize vendor selection
  function initVendorSelection() {
    // Set initial vendor
    setSelectedVendor(config.selectedVendor);
  }
  
  // Handle vendor selection
  function handleVendorSelection(event) {
    const vendorId = event.currentTarget.dataset.vendor;
    if (vendorId) {
      setSelectedVendor(vendorId);
    }
  }
  
  // Set selected vendor
  function setSelectedVendor(vendorId) {
    config.selectedVendor = vendorId;
    
    // Update UI
    if (elements.vendorSelectors) {
      elements.vendorSelectors.forEach(selector => {
        if (selector.dataset.vendor === vendorId) {
          selector.classList.add('active');
        } else {
          selector.classList.remove('active');
        }
      });
    }
    
    // Update charts
    updateChartsForVendor(vendorId);
    
    // Update vendor comparison
    updateVendorComparison(vendorId);
  }
  
  // Initialize tabs
  function initTabs() {
    // Set first tab as active
    if (elements.tabButtons && elements.tabButtons.length > 0) {
      const firstTab = elements.tabButtons[0];
      const tabId = firstTab.dataset.tab;
      
      firstTab.classList.add('active');
      
      if (tabId && elements.tabContents) {
        const tabContent = document.querySelector(`#${tabId}`);
        if (tabContent) {
          tabContent.classList.add('active');
        }
      }
    }
  }
  
  // Handle tab click
  function handleTabClick(event) {
    const tabButton = event.currentTarget;
    const tabId = tabButton.dataset.tab;
    
    if (!tabId) return;
    
    // Update active tab button
    if (elements.tabButtons) {
      elements.tabButtons.forEach(button => {
        button.classList.remove('active');
      });
    }
    
    tabButton.classList.add('active');
    
    // Update active tab content
    if (elements.tabContents) {
      elements.tabContents.forEach(content => {
        content.classList.remove('active');
      });
      
      const tabContent = document.querySelector(`#${tabId}`);
      if (tabContent) {
        tabContent.classList.add('active');
        
        // Add animation
        tabContent.classList.add('fade-in');
        setTimeout(() => {
          tabContent.classList.remove('fade-in');
        }, 500);
      }
    }
  }
  
  // Initialize charts
  function initCharts() {
    if (typeof ModernCharts === 'undefined') {
      console.warn('ModernCharts not available');
      return;
    }
    
    // Initialize ModernCharts
    ModernCharts.setup();
    
    // Update charts for selected vendor
    updateChartsForVendor(config.selectedVendor);
  }
  
  // Update charts for a specific vendor
  function updateChartsForVendor(vendorId) {
    if (typeof ModernCharts === 'undefined') return;
    
    console.log(`Updating charts for vendor: ${vendorId}`);
    
    // Sample data - in a real application, this would come from your data service
    const tcoChartData = generateTCOChartData(vendorId);
    const cumulativeChartData = generateCumulativeChartData(vendorId);
    const featureChartData = generateFeatureChartData(vendorId);
    const implementationChartData = generateImplementationChartData(vendorId);
    const roiChartData = generateROIChartData(vendorId);
    
    // Update TCO Comparison Chart
    const tcoComparisonChart = document.getElementById('tco-comparison-chart');
    if (tcoComparisonChart && ModernCharts.charts.tcoComparison) {
      ModernCharts.charts.tcoComparison(tcoComparisonChart, tcoChartData);
    }
    
    // Update Cumulative Cost Chart
    const cumulativeCostChart = document.getElementById('cumulative-cost-chart');
    if (cumulativeCostChart && ModernCharts.charts.cumulativeCost) {
      ModernCharts.charts.cumulativeCost(cumulativeCostChart, cumulativeChartData);
    }
    
    // Update Feature Comparison Chart
    const featureComparisonChart = document.getElementById('feature-comparison-chart');
    if (featureComparisonChart && ModernCharts.charts.featureComparison) {
      ModernCharts.charts.featureComparison(featureComparisonChart, featureChartData);
    }
    
    // Update Implementation Comparison Chart
    const implementationComparisonChart = document.getElementById('implementation-comparison-chart');
    if (implementationComparisonChart && ModernCharts.charts.implementationComparison) {
      ModernCharts.charts.implementationComparison(implementationComparisonChart, implementationChartData);
    }
    
    // Update ROI Chart
    const roiChart = document.getElementById('roi-chart');
    if (roiChart && ModernCharts.charts.roi) {
      ModernCharts.charts.roi(roiChart, roiChartData);
    }
    
    // Update Cost Breakdown Charts
    updateCostBreakdownCharts(vendorId);
    
    // Update Risk Analysis
    updateRiskAnalysis(vendorId);
    
    // Update Compliance Matrix
    updateComplianceMatrix(vendorId);
  }
  
  // Update vendor comparison
  function updateVendorComparison(vendorId) {
    // Update vendor comparison card if VendorAdvantages is available
    if (typeof VendorAdvantages !== 'undefined' && VendorAdvantages.createVendorComparisonCard) {
      VendorAdvantages.createVendorComparisonCard('#vendor-comparison-container', vendorId);
    }
    
    // Update feature matrix if VendorAdvantages is available
    if (typeof VendorAdvantages !== 'undefined' && VendorAdvantages.createFeatureMatrixTable) {
      VendorAdvantages.createFeatureMatrixTable('#feature-matrix-container', ['portnox', vendorId]);
    }
    
    // Update implementation timeline if VendorAdvantages is available
    if (typeof VendorAdvantages !== 'undefined' && VendorAdvantages.createImplementationTimeline) {
      VendorAdvantages.createImplementationTimeline('#implementation-timeline-container', vendorId);
    }
  }
  
  // Update cost breakdown charts
  function updateCostBreakdownCharts(vendorId) {
    if (typeof ModernCharts === 'undefined') return;
    
    // Generate data
    const currentBreakdownData = generateCostBreakdownData(vendorId);
    const portnoxBreakdownData = generateCostBreakdownData('portnox');
    
    // Update Current Solution Breakdown Chart
    const currentBreakdownChart = document.getElementById('current-breakdown-chart');
    if (currentBreakdownChart && ModernCharts.charts.costBreakdown) {
      ModernCharts.charts.costBreakdown(currentBreakdownChart, currentBreakdownData);
    }
    
    // Update Portnox Breakdown Chart
    const portnoxBreakdownChart = document.getElementById('alternative-breakdown-chart');
    if (portnoxBreakdownChart && ModernCharts.charts.costBreakdown) {
      ModernCharts.charts.costBreakdown(portnoxBreakdownChart, portnoxBreakdownData);
    }
  }
  
  // Update risk analysis
  function updateRiskAnalysis(vendorId) {
    // Skip if RiskAnalysis is not available
    if (typeof RiskAnalysis === 'undefined') return;
    
    // Map vendor to NAC type
    let nacType = 'traditional-nac';
    if (vendorId === 'portnox' || vendorId === 'securew2') {
      nacType = 'cloud-nac';
    } else if (vendorId === 'noNac') {
      nacType = 'no-nac';
    }
    
    // Update risk table
    RiskAnalysis.createRiskTable('#risk-table-container', nacType);
    
    // Update risk summary
    RiskAnalysis.createRiskSummary('#risk-summary-container', nacType);
    
    // Update breach impact visualization
    RiskAnalysis.createBreachImpactVisualization('#breach-impact-container', ['no-nac', nacType]);
    
    // Update risk heatmap if ModernCharts is available
    if (typeof ModernCharts !== 'undefined' && ModernCharts.charts.riskHeatmap) {
      const riskHeatmapData = RiskAnalysis.createRiskHeatmapData(nacType);
      ModernCharts.charts.riskHeatmap('#risk-heatmap-container', riskHeatmapData);
    }
  }
  
  // Update compliance matrix
  function updateComplianceMatrix(vendorId) {
    // Skip if ComplianceFrameworks is not available
    if (typeof ComplianceFrameworks === 'undefined') return;
    
    // Create compliance matrix
    ComplianceFrameworks.createComplianceMatrix('#compliance-matrix-container', ['portnox', vendorId]);
    
    // Create industry compliance
    ComplianceFrameworks.createIndustryCompliance('#industry-compliance-container', config.currentIndustry);
    
    // Create framework details for HIPAA (default)
    ComplianceFrameworks.createFrameworkDetailsCard('#framework-details-container', 'hipaa');
  }
  
  // Handle wizard completion
  function handleWizardCompletion(event) {
    console.log('Wizard completed');
    
    // Show results section
    const resultsSection = document.querySelector('#results-section');
    if (resultsSection) {
      resultsSection.classList.remove('hidden');
      
      // Add animation
      resultsSection.classList.add('fade-in');
      setTimeout(() => {
        resultsSection.classList.remove('fade-in');
      }, 500);
      
      // Scroll to results
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Hide wizard section
    const wizardSection = document.querySelector('#wizard-section');
    if (wizardSection) {
      wizardSection.classList.add('hidden');
    }
  }
  
  // Handle window resize
  function handleResize() {
    // Update charts if ModernCharts is available
    if (typeof ModernCharts !== 'undefined') {
      console.log('Resizing charts');
      
      // Force chart updates
      updateChartsForVendor(config.selectedVendor);
    }
  }
  
  // Add startup animation
  function addStartupAnimation() {
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    
    if (header) {
      header.classList.add('fade-in');
      setTimeout(() => {
        header.classList.remove('fade-in');
      }, 500);
    }
    
    if (main) {
      main.classList.add('fade-in-delay-1');
      setTimeout(() => {
        main.classList.remove('fade-in-delay-1');
      }, 800);
    }
  }
  
  // Data Generation Functions - Example implementations, replace with real data
  
  function generateTCOChartData(vendorId) {
    // Example data - replace with actual calculations
    return {
      labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
      datasets: [
        {
          label: 'Current Solution',
          data: [250000, 190000, 180000, 170000, 165000],
          backgroundColor: '#ef4444',
          borderColor: '#ef4444',
          borderWidth: 1
        },
        {
          label: 'Portnox Cloud',
          data: [80000, 85000, 85000, 85000, 85000],
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6',
          borderWidth: 1
        }
      ]
    };
  }
  
  function generateCumulativeChartData(vendorId) {
    // Example data - replace with actual calculations
    return {
      labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
      datasets: [
        {
          label: 'Current Solution',
          data: [250000, 440000, 630000, 800000],
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: '#ef4444',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        },
        {
          label: 'Portnox Cloud',
          data: [25000, 110000, 195000, 280000],
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: '#3b82f6',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }
      ]
    };
  }
  
  function generateCostBreakdownData(vendorId) {
    if (vendorId === 'portnox') {
      return {
        labels: ['Setup', 'Subscription', 'Services', 'Support'],
        datasets: [{
          data: [25000, 160000, 45000, 20000],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
          borderWidth: 0
        }]
      };
    } else {
      return {
        labels: ['Hardware', 'Software', 'Services', 'Support'],
        datasets: [{
          data: [250000, 190000, 180000, 100000],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
          borderWidth: 0
        }]
      };
    }
  }
  
  function generateFeatureChartData(vendorId) {
    // Example data - replace with actual ratings
    return {
      labels: ['Deployment Speed', 'Maintenance', 'Scalability', 'Cloud Integration', 'Device Discovery', 'Authentication', 'Policy Management'],
      datasets: [
        {
          label: 'Current Solution',
          data: [3, 4, 6, 4, 7, 8, 7],
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          borderColor: '#ef4444',
          borderWidth: 2,
          pointBackgroundColor: '#ef4444'
        },
        {
          label: 'Portnox Cloud',
          data: [9, 9, 9, 10, 8, 8, 8],
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: '#3b82f6',
          borderWidth: 2,
          pointBackgroundColor: '#3b82f6'
        }
      ]
    };
  }
  
  function generateImplementationChartData(vendorId) {
    // Example data - replace with actual timelines
    return {
      labels: ['Hardware Setup', 'Software Install', 'Configuration', 'Testing', 'Deployment', 'Training'],
      datasets: [
        {
          label: 'Current Solution',
          data: [30, 14, 21, 14, 30, 7],
          backgroundColor: '#ef4444',
          borderColor: '#ef4444',
          borderWidth: 1
        },
        {
          label: 'Portnox Cloud',
          data: [0, 1, 2, 1, 2, 1],
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6',
          borderWidth: 1
        }
      ]
    };
  }
  
  function generateROIChartData(vendorId) {
    // Example data - replace with actual ROI calculations
    return {
      labels: ['Year 1', 'Year 2', 'Year 3'],
      datasets: [
        {
          label: 'Cumulative Savings',
          data: [140000, 335000, 520000],
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderColor: '#10b981',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        },
        {
          label: 'Implementation Cost',
          data: [25000, 25000, 25000],
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: '#3b82f6',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }
      ]
    };
  }
  
  // Public API
  return {
    init: init,
    setDarkMode: setDarkMode,
    setSelectedVendor: setSelectedVendor,
    updateChartsForVendor: updateChartsForVendor,
    config: config
  };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  NACDesignerApp.init();
});
EOF

# Create a dark mode toggle script
cat > js/components/dark-mode-toggle.js << 'EOF'
/**
 * Dark Mode Toggle Component for NAC Architecture Designer Pro
 * Implements a toggle for switching between light and dark themes
 */

const DarkModeToggle = (function() {
  // Configuration
  let config = {
    toggleSelector: '#dark-mode-toggle',
    darkModeClass: 'dark-mode',
    localStorageKey: 'darkMode',
    onToggle: null
  };
  
  // State
  let state = {
    isDarkMode: false,
    isInitialized: false
  };
  
  // Initialize the component
  function init(options = {}) {
    // Apply custom configuration
    config = { ...config, ...options };
    
    // Get toggle element
    const toggleElement = document.querySelector(config.toggleSelector);
    if (!toggleElement) {
      console.warn('Dark mode toggle element not found');
      return false;
    }
    
    // Check for existing preference
    checkStoredPreference();
    
    // Add event listener
    toggleElement.addEventListener('click', toggle);
    
    // Initialize icon
    updateToggleIcon(toggleElement);
    
    state.isInitialized = true;
    
    return true;
  }
  
  // Check for stored dark mode preference
  function checkStoredPreference() {
    const storedPreference = localStorage.getItem(config.localStorageKey);
    
    if (storedPreference !== null) {
      state.isDarkMode = storedPreference === 'true';
      applyDarkMode(state.isDarkMode);
    } else {
      // Check system preference
      checkSystemPreference();
    }
  }
  
  // Check system color scheme preference
  function checkSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      state.isDarkMode = true;
      applyDarkMode(true);
    }
    
    // Listen for changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newDarkMode = e.matches;
        state.isDarkMode = newDarkMode;
        applyDarkMode(newDarkMode);
        savePreference(newDarkMode);
      });
    }
  }
  
  // Toggle dark mode
  function toggle() {
    const newDarkMode = !state.isDarkMode;
    state.isDarkMode = newDarkMode;
    
    applyDarkMode(newDarkMode);
    savePreference(newDarkMode);
    
    // Call onToggle callback if provided
    if (typeof config.onToggle === 'function') {
      config.onToggle(newDarkMode);
    }
  }
  
  // Apply dark mode to the document
  function applyDarkMode(isDarkMode) {
    if (isDarkMode) {
      document.documentElement.classList.add(config.darkModeClass);
      document.body.classList.add(config.darkModeClass);
    } else {
      document.documentElement.classList.remove(config.darkModeClass);
      document.body.classList.remove(config.darkModeClass);
    }
    
    // Update toggle icon
    const toggleElement = document.querySelector(config.toggleSelector);
    if (toggleElement) {
      updateToggleIcon(toggleElement);
    }
    
    // Dispatch event for other components
    const event = new CustomEvent('darkModeChanged', {
      detail: { isDarkMode: isDarkMode }
    });
    
    document.dispatchEvent(event);
  }
  
  // Update toggle icon
  function updateToggleIcon(toggleElement) {
    const icon = toggleElement.querySelector('i');
    if (!icon) return;
    
    if (state.isDarkMode) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      toggleElement.setAttribute('title', 'Switch to Light Mode');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      toggleElement.setAttribute('title', 'Switch to Dark Mode');
    }
  }
  
  // Save preference to localStorage
  function savePreference(isDarkMode) {
    localStorage.setItem(config.localStorageKey, isDarkMode);
  }
  
  // Public API
  return {
    init: init,
    toggle: toggle,
    isDarkMode: () => state.isDarkMode,
    setDarkMode: (isDarkMode) => {
      state.isDarkMode = isDarkMode;
      applyDarkMode(isDarkMode);
      savePreference(isDarkMode);
    }
  };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  DarkModeToggle.init({
    toggleSelector: '#dark-mode-toggle',
    onToggle: function(isDarkMode) {
      console.log('Dark mode toggled:', isDarkMode);
    }
  });
});
EOF

# Create entry script to apply all enhancements
cat > apply-enhancements.sh << 'EOF'
#!/bin/bash

echo "🚀 Applying NAC Architecture Designer Pro Enhancements"
echo "======================================================"

# Check if the script is run with admin privileges
if [ "$EUID" -ne 0 ]; then
  echo "⚠️ Please run this script with sudo or as administrator"
  exit 1
fi

# Create backup
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backup_$TIMESTAMP"

echo "📦 Creating backup at $BACKUP_DIR"
mkdir -p $BACKUP_DIR
cp -r css js img index.html $BACKUP_DIR

# Create directories if they don't exist
echo "📂 Creating directory structure"
mkdir -p css/themes/enhanced
mkdir -p css/components/advanced
mkdir -p css/animations
mkdir -p css/visualizations
mkdir -p js/components/enhanced
mkdir -p js/charts/enhanced
mkdir -p js/visualizations
mkdir -p js/animations
mkdir -p js/vendor-comparisons
mkdir -p js/compliance
mkdir -p js/risk-analysis
mkdir -p img/wizard-icons
mkdir -p img/vendors
mkdir -p libs/js
mkdir -p libs/css

# Copy new CSS files
echo "🎨 Copying enhanced CSS files"
cp css/themes/enhanced/modern-theme.css css/themes/enhanced/
cp css/animations/modern-animations.css css/animations/
cp css/visualizations/advanced-charts.css css/visualizations/
cp css/components/advanced/vendor-comparison.css css/components/advanced/

# Copy new JS files
echo "🔧 Copying enhanced JavaScript files"
cp js/components/enhanced/modern-wizard.js js/components/enhanced/
cp js/components/dark-mode-toggle.js js/components/
cp js/charts/enhanced/modern-charts.js js/charts/enhanced/
cp js/vendor-comparisons/vendor-advantages.js js/vendor-comparisons/
cp js/compliance/compliance-frameworks.js js/compliance/
cp js/risk-analysis/risk-analysis.js js/risk-analysis/
cp js/main.js js/

# Copy wizard icons
echo "🧙 Copying wizard icons"
cp img/wizard-icons/vendor-selection.svg img/wizard-icons/
cp img/wizard-icons/compliance.svg img/wizard-icons/
cp img/wizard-icons/organization.svg img/wizard-icons/
cp img/wizard-icons/cost-config.svg img/wizard-icons/
cp img/wizard-icons/results.svg img/wizard-icons/

# Download required libraries
echo "📚 Downloading required libraries"

# JavaScript Libraries
JS_LIBS=(
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/recharts/2.5.0/Recharts.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.0.0/countUp.min.js"
)

for lib in "${JS_LIBS[@]}"; do
    filename=$(basename $lib)
    echo "⬇️ Downloading $filename"
    curl -s -L $lib -o "libs/js/$filename"
done

# CSS Libraries
CSS_LIBS=(
    "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
)

for lib in "${CSS_LIBS[@]}"; do
    filename=$(basename $lib)
    echo "⬇️ Downloading $filename"
    curl -s -L $lib -o "libs/css/$filename"
done

# Download Icon Packs
echo "🎨 Downloading Icon Packs"
curl -s -L "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2" -o "img/icons/fa-solid-900.woff2"
curl -s -L "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2" -o "img/icons/fa-brands-400.woff2"

# Update index.html to include new styles and scripts
echo "📝 Updating index.html"

# Create a temp file for the new index.html
tmp_file=$(mktemp)

# Add new CSS and JS references to index.html
cat index.html | sed '/<\/head>/i \
    <!-- Enhanced Styles -->\
    <link rel="stylesheet" href="libs/css/tailwind.min.css">\
    <link rel="stylesheet" href="libs/css/all.min.css">\
    <link rel="stylesheet" href="libs/css/animate.min.css">\
    <link rel="stylesheet" href="css/themes/enhanced/modern-theme.css">\
    <link rel="stylesheet" href="css/animations/modern-animations.css">\
    <link rel="stylesheet" href="css/visualizations/advanced-charts.css">\
    <link rel="stylesheet" href="css/components/advanced/vendor-comparison.css">\
' | sed '/<\/body>/i \
    <!-- Enhanced Scripts -->\
    <script src="libs/js/chart.min.js"></script>\
    <script src="libs/js/d3.min.js"></script>\
    <script src="libs/js/gsap.min.js"></script>\
    <script src="libs/js/countUp.min.js"></script>\
    <script src="js/charts/enhanced/modern-charts.js"></script>\
    <script src="js/components/enhanced/modern-wizard.js"></script>\
    <script src="js/components/dark-mode-toggle.js"></script>\
    <script src="js/vendor-comparisons/vendor-advantages.js"></script>\
    <script src="js/compliance/compliance-frameworks.js"></script>\
    <script src="js/risk-analysis/risk-analysis.js"></script>\
    <script src="js/main.js"></script>\
' > "$tmp_file"

# Replace the original index.html with the updated one
mv "$tmp_file" index.html

# Add dark mode toggle to the header
echo "🌙 Adding dark mode toggle to the header"
sed -i '/<header/,/<\/header>/s/<\/div>/<button id="dark-mode-toggle" class="dark-mode-toggle" title="Toggle Dark Mode"><i class="fas fa-moon"><\/i><\/button><\/div>/' index.html

# Fix any circular DOM references
echo "🔄 Fixing circular DOM references"
sed -i 's/element.appendChild(element)/console.warn("Prevented circular DOM reference")/' js/fixes/layout-fixes.js

# Set execute permissions on wizard icons
chmod 644 img/wizard-icons/*.svg

echo "✅ Enhancements applied successfully!"
echo "🌐 Open index.html in your browser to see the enhanced NAC Architecture Designer Pro"
EOF

# Create integration test script
cat > test-integration.sh << 'EOF'
#!/bin/bash

echo "🧪 Running NAC Architecture Designer Pro Integration Tests"
echo "========================================================"

# Check if the enhanced files exist
echo "📂 Checking for enhanced files..."

# Required directories
REQUIRED_DIRS=(
    "css/themes/enhanced"
    "css/animations"
    "css/visualizations"
    "css/components/advanced"
    "js/components/enhanced"
    "js/charts/enhanced"
    "js/vendor-comparisons"
    "js/compliance"
    "js/risk-analysis"
    "img/wizard-icons"
    "libs/js"
    "libs/css"
)

# Required files
REQUIRED_FILES=(
    "css/themes/enhanced/modern-theme.css"
    "css/animations/modern-animations.css"
    "css/visualizations/advanced-charts.css"
    "css/components/advanced/vendor-comparison.css"
    "js/components/enhanced/modern-wizard.js"
    "js/components/dark-mode-toggle.js"
    "js/charts/enhanced/modern-charts.js"
    "js/vendor-comparisons/vendor-advantages.js"
    "js/compliance/compliance-frameworks.js"
    "js/risk-analysis/risk-analysis.js"
    "js/main.js"
    "img/wizard-icons/vendor-selection.svg"
    "img/wizard-icons/compliance.svg"
    "img/wizard-icons/organization.svg"
    "img/wizard-icons/cost-config.svg"
    "img/wizard-icons/results.svg"
)

# Check directories
MISSING_DIRS=0
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
        echo "❌ Missing directory: $dir"
        MISSING_DIRS=$((MISSING_DIRS+1))
    fi
done

if [ $MISSING_DIRS -eq 0 ]; then
    echo "✅ All required directories exist"
else
    echo "❌ Missing $MISSING_DIRS required directories"
fi

# Check files
MISSING_FILES=0
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing file: $file"
        MISSING_FILES=$((MISSING_FILES+1))
    fi
done

if [ $MISSING_FILES -eq 0 ]; then
    echo "✅ All required files exist"
else
    echo "❌ Missing $MISSING_FILES required files"
fi

# Check index.html for the required scripts and styles
echo "🔍 Checking index.html for required scripts and styles..."

# Count required scripts and styles in index.html
SCRIPT_COUNT=$(grep -c "modern-charts.js\|modern-wizard.js\|dark-mode-toggle.js\|vendor-advantages.js\|compliance-frameworks.js\|risk-analysis.js" index.html)
STYLE_COUNT=$(grep -c "modern-theme.css\|modern-animations.css\|advanced-charts.css\|vendor-comparison.css" index.html)

if [ $SCRIPT_COUNT -eq 6 ]; then
    echo "✅ All required scripts are included in index.html"
else
    echo "❌ Missing required scripts in index.html ($SCRIPT_COUNT of 6 found)"
fi

if [ $STYLE_COUNT -eq 4 ]; then
    echo "✅ All required styles are included in index.html"
else
    echo "❌ Missing required styles in index.html ($STYLE_COUNT of 4 found)"
fi

# Check for dark mode toggle
DARK_MODE_TOGGLE=$(grep -c "dark-mode-toggle" index.html)
if [ $DARK_MODE_TOGGLE -gt 0 ]; then
    echo "✅ Dark mode toggle is included in index.html"
else
    echo "❌ Dark mode toggle is missing from index.html"
fi

# Javascript syntax check
echo "🔧 Checking JavaScript syntax..."

JS_FILES=(
    "js/components/enhanced/modern-wizard.js"
    "js/components/dark-mode-toggle.js"
    "js/charts/enhanced/modern-charts.js"
    "js/vendor-comparisons/vendor-advantages.js"
    "js/compliance/compliance-frameworks.js"
    "js/risk-analysis/risk-analysis.js"
    "js/main.js"
)

JS_ERRORS=0
for file in "${JS_FILES[@]}"; do
    if command -v node &> /dev/null; then
        node --check "$file" &> /dev/null
        if [ $? -ne 0 ]; then
            echo "❌ JavaScript syntax error in $file"
            JS_ERRORS=$((JS_ERRORS+1))
        fi
    else
        # Basic syntax check if node is not available
        grep -n "function" "$file" | grep -v "{" &> /dev/null
        if [ $? -eq 0 ]; then
            echo "❌ Possible JavaScript syntax error in $file"
            JS_ERRORS=$((JS_ERRORS+1))
        fi
    fi
done

if [ $JS_ERRORS -eq 0 ]; then
    echo "✅ All JavaScript files passed syntax check"
else
    echo "❌ Found $JS_ERRORS JavaScript syntax errors"
fi

# CSS syntax check
echo "🎨 Checking CSS syntax..."

CSS_FILES=(
    "css/themes/enhanced/modern-theme.css"
    "css/animations/modern-animations.css"
    "css/visualizations/advanced-charts.css"
    "css/components/advanced/vendor-comparison.css"
)

CSS_ERRORS=0
for file in "${CSS_FILES[@]}"; do
    if command -v csslint &> /dev/null; then
        csslint "$file" &> /dev/null
        if [ $? -ne 0 ]; then
            echo "❌ CSS syntax error in $file"
            CSS_ERRORS=$((CSS_ERRORS+1))
        fi
    else
        # Basic syntax check if csslint is not available
        grep -n "}" "$file" | grep -v "{" &> /dev/null
        if [ $? -eq 0 ]; then
            echo "❌ Possible CSS syntax error in $file"
            CSS_ERRORS=$((CSS_ERRORS+1))
        fi
    fi
done

if [ $CSS_ERRORS -eq 0 ]; then
    echo "✅ All CSS files passed syntax check"
else
    echo "❌ Found $CSS_ERRORS CSS syntax errors"
fi

# Summary
echo "========================================================"
echo "🧪 Integration Test Summary:"
echo "Directories: $([ $MISSING_DIRS -eq 0 ] && echo "✅ All present" || echo "❌ $MISSING_DIRS missing")"
echo "Files: $([ $MISSING_FILES -eq 0 ] && echo "✅ All present" || echo "❌ $MISSING_FILES missing")"
echo "Scripts in index.html: $([ $SCRIPT_COUNT -eq 6 ] && echo "✅ All included" || echo "❌ Some missing")"
echo "Styles in index.html: $([ $STYLE_COUNT -eq 4 ] && echo "✅ All included" || echo "❌ Some missing")"
echo "Dark mode toggle: $([ $DARK_MODE_TOGGLE -gt 0 ] && echo "✅ Present" || echo "❌ Missing")"
echo "JavaScript syntax: $([ $JS_ERRORS -eq 0 ] && echo "✅ Valid" || echo "❌ $JS_ERRORS errors")"
echo "CSS syntax: $([ $CSS_ERRORS -eq 0 ] && echo "✅ Valid" || echo "❌ $CSS_ERRORS errors")"

# Final result
if [ $MISSING_DIRS -eq 0 ] && [ $MISSING_FILES -eq 0 ] && [ $SCRIPT_COUNT -eq 6 ] && [ $STYLE_COUNT -eq 4 ] && [ $DARK_MODE_TOGGLE -gt 0 ] && [ $JS_ERRORS -eq 0 ] && [ $CSS_ERRORS -eq 0 ]; then
    echo "✅ All integration tests passed!"
    exit 0
else
    echo "❌ Some integration tests failed. Please check the issues above."
    exit 1
fi
EOF

# Make the scripts executable
chmod +x apply-enhancements.sh
chmod +x test-integration.sh

echo "📑 Deployment scripts created successfully!"
echo "To apply enhancements, run ./apply-enhancements.sh"
echo "To test the integration, run ./test-integration.sh"
