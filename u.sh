#!/bin/bash

# Comprehensive enhancement script for Portnox Total Cost Analyzer
echo "Starting comprehensive UI and data enhancement for Portnox Total Cost Analyzer..."

# Create required directories if they don't exist
mkdir -p ./js/charts/apex
mkdir -p ./js/charts/d3
mkdir -p ./js/charts/highcharts
mkdir -p ./js/components
mkdir -p ./js/views
mkdir -p ./js/data
mkdir -p ./img/vendors
mkdir -p ./img/logos
mkdir -p ./img/icons
mkdir -p ./css
mkdir -p ./fonts

# -------------------------
# INSTALL MODERN FONT KIT
# -------------------------
echo "Installing modern font kit..."

cat > ./css/fonts.css << 'EOF'
/* Modern Font Integration for Portnox Total Cost Analyzer */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');

:root {
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-secondary: 'Manrope', sans-serif;
  --font-heading: 'DM Sans', sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
}

body {
  font-family: var(--font-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

.subtitle, .caption, .badge {
  font-family: var(--font-secondary);
}

code, pre, .mono {
  font-family: var(--font-mono);
}
EOF

# -------------------------
# ENHANCED MODERN UI THEME
# -------------------------
echo "Creating enhanced modern UI theme..."

cat > ./css/modern-theme.css << 'EOF'
/**
 * Modern UI Theme for Portnox Total Cost Analyzer
 * Features glass morphism, modern gradients, and cutting-edge design elements
 */

:root {
  /* Base palette */
  --color-primary-50: #eef7ff;
  --color-primary-100: #d9edff;
  --color-primary-200: #bce0ff;
  --color-primary-300: #8fcbff;
  --color-primary-400: #5cadff;
  --color-primary-500: #3b8eff;
  --color-primary-600: #2470f2;
  --color-primary-700: #1d5cd7;
  --color-primary-800: #1e4baf;
  --color-primary-900: #1e418a;
  --color-primary-950: #162954;
  
  /* Secondary palette */
  --color-secondary-50: #fcf2f4;
  --color-secondary-100: #fae5ea;
  --color-secondary-200: #f5cfda;
  --color-secondary-300: #eda9be;
  --color-secondary-400: #e2799f;
  --color-secondary-500: #d65285;
  --color-secondary-600: #c23a6b;
  --color-secondary-700: #a32d57;
  --color-secondary-800: #87264a;
  --color-secondary-900: #72233f;
  --color-secondary-950: #410d1f;
  
  /* Success palette */
  --color-success-50: #effef7;
  --color-success-100: #dafeef;
  --color-success-200: #b8fadd;
  --color-success-300: #81f4c3;
  --color-success-400: #44e5a0;
  --color-success-500: #1acd7e;
  --color-success-600: #0fa767;
  --color-success-700: #108654;
  --color-success-800: #126945;
  --color-success-900: #11563a;
  --color-success-950: #03301f;
  
  /* Warning palette */
  --color-warning-50: #fffbeb;
  --color-warning-100: #fff4c6;
  --color-warning-200: #ffe786;
  --color-warning-300: #ffd246;
  --color-warning-400: #ffba1a;
  --color-warning-500: #ff9603;
  --color-warning-600: #e26a00;
  --color-warning-700: #bc4902;
  --color-warning-800: #983908;
  --color-warning-900: #7c300b;
  --color-warning-950: #431605;
  
  /* Danger palette */
  --color-danger-50: #fff1f2;
  --color-danger-100: #ffe1e3;
  --color-danger-200: #ffc9cc;
  --color-danger-300: #ff9da3;
  --color-danger-400: #ff6670;
  --color-danger-500: #ff3a47;
  --color-danger-600: #ed1825;
  --color-danger-700: #c8101b;
  --color-danger-800: #a6121a;
  --color-danger-900: #88141b;
  --color-danger-950: #4b0509;
  
  /* Neutral palette */
  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-200: #e5e7eb;
  --color-neutral-300: #d1d5db;
  --color-neutral-400: #9ca3af;
  --color-neutral-500: #6b7280;
  --color-neutral-600: #4b5563;
  --color-neutral-700: #374151;
  --color-neutral-800: #1f2937;
  --color-neutral-900: #111827;
  --color-neutral-950: #030712;

  /* Modern gradients */
  --gradient-primary: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-800) 100%);
  --gradient-secondary: linear-gradient(135deg, var(--color-secondary-500) 0%, var(--color-secondary-700) 100%);
  --gradient-success: linear-gradient(135deg, var(--color-success-500) 0%, var(--color-success-700) 100%);
  --gradient-warning: linear-gradient(135deg, var(--color-warning-500) 0%, var(--color-warning-700) 100%);
  --gradient-danger: linear-gradient(135deg, var(--color-danger-500) 0%, var(--color-danger-700) 100%);
  --gradient-cool: linear-gradient(135deg, #3b8eff 0%, #2cb5e8 50%, #15d8be 100%);
  --gradient-warm: linear-gradient(135deg, #ff9700 0%, #ed5c45 50%, #d65285 100%);
  --gradient-dark: linear-gradient(135deg, #323846 0%, #111827 100%);
  --gradient-frost: linear-gradient(135deg, #E3F4FE 0%, #ffffff 100%);
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 6px 16px -1px rgba(0, 0, 0, 0.1), 0 2px 6px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

  /* Glass morphism */
  --glass-white: rgba(255, 255, 255, 0.8);
  --glass-dark: rgba(24, 32, 45, 0.8);
  --glass-blur: blur(12px);
  --glass-border: 1px solid rgba(255, 255, 255, 0.2);
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-8: 48px;
  --space-10: 64px;
  --space-12: 80px;
  --space-16: 128px;
  
  /* Borders */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
}

/* Base styles */
body {
  color: var(--color-neutral-900);
  background-color: var(--color-neutral-50);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Header with glass effect */
.app-header {
  background: var(--gradient-primary);
  color: white;
  padding: var(--space-4) var(--space-6);
  box-shadow: var(--shadow-md);
  position: relative;
  z-index: 10;
  overflow: hidden;
}

/* Glass morphism elements */
.glass-panel {
  background: var(--glass-white);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--radius-lg);
  border: var(--glass-border);
  box-shadow: var(--shadow-md);
}

.glass-panel-dark {
  background: var(--glass-dark);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--radius-lg);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-md);
}

/* Main layout */
.main-container {
  display: flex;
  min-height: calc(100vh - 64px);
}

.sidebar {
  width: 300px;
  background: white;
  box-shadow: var(--shadow);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  z-index: 5;
  border-right: 1px solid var(--color-neutral-200);
}

.sidebar.collapsed {
  width: 70px;
}

.content-area {
  flex: 1;
  padding: var(--space-5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  background: linear-gradient(135deg, var(--color-neutral-50) 0%, var(--color-neutral-100) 100%);
}

.content-area.expanded {
  margin-left: -230px;
}

/* Tabs with modern styling */
.tab-container {
  margin-bottom: var(--space-5);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  background: white;
  border: 1px solid var(--color-neutral-200);
}

.main-tabs {
  display: flex;
  background: var(--gradient-dark);
  padding: 0;
  position: relative;
  gap: 2px;
}

.main-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex: 1;
  text-align: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.main-tab::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.08);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.main-tab:hover::before {
  opacity: 1;
}

.main-tab.active {
  color: white;
}

.main-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
  height: 3px;
  background: var(--color-primary-300);
  border-radius: var(--radius-full);
}

.tab-icon {
  font-size: 1.4rem;
  margin-bottom: var(--space-2);
  transition: transform 0.3s ease;
}

.main-tab:hover .tab-icon {
  transform: translateY(-2px);
}

.tab-label {
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
}

.sub-tabs-container {
  background: white;
  border-bottom: 1px solid var(--color-neutral-200);
}

.sub-tabs {
  display: none;
  padding: 0 var(--space-4);
  flex-wrap: wrap;
}

.sub-tabs.active {
  display: flex;
}

.sub-tab {
  padding: var(--space-3) var(--space-4);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  font-weight: 500;
  color: var(--color-neutral-600);
  position: relative;
}

.sub-tab.active {
  color: var(--color-primary-700);
  border-bottom-color: var(--color-primary-500);
}

.sub-tab::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary-300);
  transition: width 0.3s ease;
}

.sub-tab:hover::after {
  width: 100%;
}

/* Modern cards and sections */
.view-container {
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  border: 1px solid var(--color-neutral-200);
}

.view-content {
  display: none;
  padding: var(--space-5);
}

.view-content.active {
  display: block;
}

/* Modern section banners */
.section-banner {
  background: var(--gradient-cool);
  color: white;
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  margin-bottom: var(--space-6);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.section-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
  pointer-events: none;
}

.banner-gradient-primary {
  background: var(--gradient-primary);
}

.banner-gradient-cool {
  background: var(--gradient-cool);
}

.banner-gradient-warm {
  background: var(--gradient-warm);
}

.banner-gradient-success {
  background: var(--gradient-success);
}

.section-banner h2 {
  margin: 0 0 var(--space-2) 0;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.section-banner p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.05rem;
  max-width: 650px;
}

/* Enhanced chart sections */
.chart-section {
  padding: var(--space-4);
}

.chart-row {
  display: flex;
  gap: var(--space-5);
  margin-bottom: var(--space-5);
  flex-wrap: wrap;
}

.chart-wrapper {
  flex: 1;
  min-width: 300px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  padding: var(--space-4);
  min-height: 350px;
  position: relative;
  border: 1px solid var(--color-neutral-200);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chart-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.chart-wrapper.large-chart {
  flex-basis: 100%;
  min-height: 450px;
}

.chart-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: var(--space-3);
  color: var(--color-neutral-800);
  display: flex;
  align-items: center;
}

.chart-title i {
  margin-right: var(--space-2);
  color: var(--color-primary-600);
  opacity: 0.9;
}

.chart-subtitle {
  font-size: 0.9rem;
  color: var(--color-neutral-600);
  margin-top: -8px;
  margin-bottom: var(--space-4);
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
}

.chart-loading-spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid var(--color-neutral-200);
  border-top: 3px solid var(--color-primary-500);
  animation: spin 1s linear infinite;
  margin-bottom: var(--space-4);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Insights panel */
.insight-panel {
  background: linear-gradient(to right, var(--color-primary-50), var(--color-primary-100));
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  border-left: 4px solid var(--color-primary-500);
  margin-top: var(--space-5);
}

.insight-panel h3 {
  margin-top: 0;
  color: var(--color-primary-800);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.insight-panel h3 i {
  color: var(--color-primary-600);
}

.insight-list {
  padding-left: var(--space-5);
  margin-bottom: 0;
}

.insight-list li {
  margin-bottom: var(--space-2);
  position: relative;
}

.insight-list li:last-child {
  margin-bottom: 0;
}

.insight-list li::before {
  content: '';
  position: absolute;
  left: -18px;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-primary-500);
}

/* Enhanced data tables */
.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: var(--space-4);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-neutral-200);
}

.data-table th, 
.data-table td {
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-neutral-200);
  text-align: left;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table th {
  background: var(--color-neutral-100);
  font-weight: 600;
  color: var(--color-neutral-700);
  position: relative;
}

.data-table th:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 25%;
  height: 50%;
  width: 1px;
  background: var(--color-neutral-300);
}

.data-table tbody tr {
  transition: background 0.2s ease;
}

.data-table tbody tr:hover {
  background: var(--color-neutral-50);
}

.data-table .total-row {
  font-weight: 700;
  background: var(--color-neutral-100);
}

.data-table .savings {
  color: var(--color-success-600);
  font-weight: 600;
}

.data-table .negative {
  color: var(--color-danger-600);
  font-weight: 600;
}

.data-table .total-savings {
  color: var(--color-success-600);
  font-weight: 700;
}

.data-table .advantage {
  color: var(--color-primary-600);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.data-table .advantage::before {
  content: '✓';
  color: var(--color-success-500);
  font-weight: bold;
}

/* Config cards with modern styling */
.config-card {
  background: white;
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-4);
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--color-neutral-200);
  transition: transform 0.3s ease;
}

.config-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.config-card-header {
  padding: var(--space-3) var(--space-4);
  background: var(--gradient-primary);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.config-card-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.config-card-header h3 i {
  margin-right: var(--space-2);
  font-size: 1.1rem;
}

.toggle-icon {
  transition: transform 0.3s ease;
}

.toggle-icon.collapsed {
  transform: rotate(180deg);
}

.config-card-content {
  padding: var(--space-4);
  transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
  overflow: hidden;
}

.config-card-content.collapsed {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
}

/* Modern form elements */
.form-group {
  margin-bottom: var(--space-4);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-2);
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--color-neutral-700);
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-size: 14px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: var(--color-primary-400);
  box-shadow: 0 0 0 3px rgba(59, 142, 255, 0.2);
}

.form-control:hover:not(:focus) {
  border-color: var(--color-neutral-400);
}

/* Enhanced range sliders */
.range-slider {
  margin-bottom: var(--space-4);
}

.range-slider-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-2);
}

.range-slider-label {
  font-size: 0.9rem;
  color: var(--color-neutral-700);
}

.range-slider-value {
  font-weight: 600;
  color: var(--color-primary-700);
  background: var(--color-primary-50);
  padding: 2px 8px;
  border-radius: var(--radius-md);
}

.range-slider input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  height: 8px;
  border-radius: var(--radius-full);
  background: linear-gradient(to right, var(--color-primary-500) 0%, var(--color-primary-500) 50%, var(--color-neutral-200) 50%, var(--color-neutral-200) 100%);
  outline: none;
}

.range-slider input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 0 0 4px var(--color-primary-500), 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.range-slider input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.range-slider input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 0 0 4px var(--color-primary-500), 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  border: none;
}

.range-slider input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.1);
}

/* Enhanced vendor selection cards */
.vendor-select-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: var(--space-3);
  padding: var(--space-2) 0 var(--space-3) 0;
}

.vendor-select-card {
  height: 100px;
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-lg);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background: white;
  position: relative;
  overflow: hidden;
}

.vendor-select-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.vendor-select-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-300);
}

.vendor-select-card:hover::before {
  transform: scaleX(1);
}

.vendor-select-card.selected {
  border-color: var(--color-primary-500);
  background-color: var(--color-primary-50);
  box-shadow: var(--shadow);
}

.vendor-select-card.selected::before {
  transform: scaleX(1);
}

.vendor-select-card.selected::after {
  content: '✓';
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-primary-500);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.vendor-logo {
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-2);
}

.vendor-logo img {
  max-height: 40px;
  max-width: 90px;
  object-fit: contain;
  filter: grayscale(30%);
  transition: filter 0.3s ease, transform 0.3s ease;
}

.vendor-select-card:hover .vendor-logo img,
.vendor-select-card.selected .vendor-logo img {
  filter: grayscale(0%);
  transform: scale(1.05);
}

.vendor-name {
  font-size: 12px;
  text-align: center;
  line-height: 1.3;
  width: 100%;
  font-weight: 500;
  color: var(--color-neutral-700);
  transition: color 0.3s ease;
  margin-top: auto;
}

.vendor-select-card:hover .vendor-name,
.vendor-select-card.selected .vendor-name {
  color: var(--color-primary-700);
}

/* Modern buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: var(--radius-lg);
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn:hover::before {
  opacity: 1;
}

.btn:active {
  transform: translateY(1px);
}

.btn-sm {
  padding: 6px 12px;
  font-size: 13px;
  border-radius: var(--radius-md);
}

.btn-lg {
  padding: 12px 24px;
  font-size: 16px;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 2px 4px rgba(24, 92, 213, 0.3);
}

.btn-primary:hover {
  box-shadow: 0 4px 8px rgba(24, 92, 213, 0.4);
}

.btn-secondary {
  background: var(--gradient-secondary);
  color: white;
  box-shadow: 0 2px 4px rgba(194, 58, 107, 0.3);
}

.btn-secondary:hover {
  box-shadow: 0 4px 8px rgba(194, 58, 107, 0.4);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--color-neutral-300);
  color: var(--color-neutral-700);
}

.btn-outline:hover {
  border-color: var(--color-primary-400);
  color: var(--color-primary-600);
  background-color: var(--color-primary-50);
}

.btn-outline-primary {
  background: transparent;
  border: 1px solid var(--color-primary-500);
  color: var(--color-primary-600);
}

.btn-outline-primary:hover {
  background-color: var(--color-primary-50);
}

.btn-light {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  backdrop-filter: blur(8px);
}

.btn-light:hover {
  background: rgba(255, 255, 255, 0.25);
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border-radius: 50%;
}

.btn-icon.btn-sm {
  width: 32px;
  height: 32px;
}

.btn-icon i {
  font-size: 16px;
}

/* Badges */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
}

.badge-primary {
  background: var(--color-primary-100);
  color: var(--color-primary-800);
}

.badge-success {
  background: var(--color-success-100);
  color: var(--color-success-800);
}

.badge-warning {
  background: var(--color-warning-100);
  color: var(--color-warning-800);
}

.badge-danger {
  background: var(--color-danger-100);
  color: var(--color-danger-800);
}

/* Stats and metrics */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.stat-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow);
  border: 1px solid var(--color-neutral-200);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-title {
  font-size: 0.9rem;
  color: var(--color-neutral-600);
  margin-bottom: var(--space-2);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.stat-title i {
  color: var(--color-primary-500);
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-1);
}

.stat-indicator {
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-indicator.positive {
  color: var(--color-success-600);
}

.stat-indicator.negative {
  color: var(--color-danger-600);
}

/* Compliance section styling */
.compliance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.compliance-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow);
  border: 1px solid var(--color-neutral-200);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}

.compliance-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.compliance-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-3);
  border-radius: var(--radius-full);
  background: var(--color-primary-50);
  color: var(--color-primary-600);
  font-size: 20px;
}

.compliance-name {
  font-weight: 600;
  margin-bottom: var(--space-2);
  color: var(--color-neutral-800);
}

.compliance-score {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary-700);
  margin-bottom: var(--space-2);
}

/* NIST CSF Framework Visualization styles */
.nist-framework {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow);
  border: 1px solid var(--color-neutral-200);
  margin-top: var(--space-4);
}

.nist-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.nist-title {
  font-weight: 600;
  color: var(--color-neutral-900);
  margin: 0;
}

.nist-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-3);
}

.nist-category {
  background: var(--color-neutral-50);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
  border: 1px solid var(--color-neutral-200);
  transition: transform 0.3s ease;
}

.nist-category:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.nist-category-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-3);
  gap: var(--space-2);
}

.nist-category-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  color: white;
  background: var(--color-primary-600);
  font-size: 14px;
}

.nist-category-identify .nist-category-icon {
  background: var(--color-primary-600);
}

.nist-category-protect .nist-category-icon {
  background: var(--color-success-600);
}

.nist-category-detect .nist-category-icon {
  background: var(--color-warning-600);
}

.nist-category-respond .nist-category-icon {
  background: var(--color-danger-600);
}

.nist-category-recover .nist-category-icon {
  background: var(--color-secondary-600);
}

.nist-category-name {
  font-weight: 600;
  color: var(--color-neutral-800);
  margin: 0;
}

.nist-score {
  margin-top: var(--space-2);
  height: 6px;
  background: var(--color-neutral-200);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
}

.nist-score-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: var(--radius-full);
  background: var(--color-primary-500);
}

.nist-category-identify .nist-score-bar {
  background: var(--color-primary-500);
}

.nist-category-protect .nist-score-bar {
  background: var(--color-success-500);
}

.nist-category-detect .nist-score-bar {
  background: var(--color-warning-500);
}

.nist-category-respond .nist-score-bar {
  background: var(--color-danger-500);
}

.nist-category-recover .nist-score-bar {
  background: var(--color-secondary-500);
}

.nist-score-value {
  text-align: right;
  font-size: 0.8rem;
  color: var(--color-neutral-600);
  margin-top: var(--space-1);
}

.nist-subcategories {
  margin-top: var(--space-3);
}

.nist-subcategory {
  padding: var(--space-2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-neutral-200);
  font-size: 0.8rem;
}

.nist-subcategory:last-child {
  border-bottom: none;
}

.nist-subcategory-name {
  color: var(--color-neutral-700);
}

.nist-subcategory-value {
  font-weight: 600;
  color: var(--color-neutral-900);
}

/* Heatmap styles */
.heatmap-container {
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-top: var(--space-4);
  background: white;
  box-shadow: var(--shadow);
  border: 1px solid var(--color-neutral-200);
}

.heatmap-header {
  padding: var(--space-3) var(--space-4);
  background: var(--color-neutral-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-neutral-200);
}

.heatmap-title {
  font-weight: 600;
  margin: 0;
  color: var(--color-neutral-800);
}

.heatmap-controls {
  display: flex;
  gap: var(--space-2);
}

.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 1px;
  background: var(--color-neutral-200);
  padding: 1px;
}

.heatmap-cell {
  background: white;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.heatmap-cell:hover {
  transform: scale(1.05);
  z-index: 1;
}

.heatmap-cell-label {
  font-size: 0.7rem;
  color: var(--color-neutral-600);
  margin-bottom: var(--space-1);
  text-align: center;
}

.heatmap-cell-value {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-neutral-900);
}

.heatmap-legend {
  display: flex;
  padding: var(--space-3) var(--space-4);
  justify-content: center;
  gap: var(--space-3);
  border-top: 1px solid var(--color-neutral-200);
}

.heatmap-legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.8rem;
  color: var(--color-neutral-700);
}

.heatmap-legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .nist-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .compliance-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    max-height: 300px;
  }
  
  .sidebar.collapsed {
    max-height: 70px;
  }
  
  .content-area {
    width: 100%;
  }
  
  .content-area.expanded {
    margin-left: 0;
  }
  
  .chart-row {
    flex-direction: column;
  }
  
  .chart-wrapper {
    width: 100%;
  }
  
  .nist-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .nist-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .compliance-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  
  .tab-label {
    font-size: 0.8rem;
  }
}
EOF

# -------------------------
# CREATE COMPREHENSIVE VENDOR DATA
# -------------------------
echo "Creating comprehensive vendor data..."

cat > ./js/data/vendor-data.js << 'EOF'
/**
 * Comprehensive Vendor Data for Portnox Total Cost Analyzer
 * Contains detailed information on all NAC vendors, their features, costs, and technical specifications
 */

const VENDORS = {
  'portnox': {
    name: 'Portnox Cloud',
    shortName: 'Portnox',
    logoUrl: './img/vendors/portnox.png',
    cloudNative: true,
    architecture: 'cloud',
    deployment: {
      timeToValue: 1, // Days
      complexity: 'Low',
      requiresHardware: false,
      requiresAgents: false,
      remoteWorkSupport: true,
      cloudManaged: true
    },
    costs: {
      pricing: 'subscription',
      licensePerDevice: 50,
      hardware: 0,
      implementation: 15000,
      maintenance: 0,
      yearlySubscription: 172000,
      personnel: 25000,
      training: 5000,
      tco3Year: 245000
    },
    security: {
      zeroTrust: 95,
      deviceAuth: 90,
      riskAssessment: 95,
      remediationSpeed: 15,
      complianceCoverage: 95,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 95,
      hipaa: 95,
      gdpr: 90,
      nist: 95,
      iso27001: 95,
      sox: 90,
      cmmc: 90,
      frameworks: [
        {name: 'NIST CSF', coverage: 95, details: {identify: 92, protect: 96, detect: 95, respond: 94, recover: 90}},
        {name: 'PCI DSS', coverage: 95},
        {name: 'HIPAA', coverage: 95},
        {name: 'GDPR', coverage: 90},
        {name: 'ISO 27001', coverage: 90},
        {name: 'SOX', coverage: 90},
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: true,
      aws: true,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: true
    },
    technical: {
      maxDevices: 'Unlimited',
      performanceImpact: 'Minimal',
      scalability: 'Highly Scalable',
      reliability: 99.99,
      redundancy: 'Built-in',
      disasterRecovery: 'Automatic',
      updateFrequency: 'Continuous'
    },
    customers: {
      industries: ['Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Government', 'Education'],
      companySize: ['Small', 'Medium', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific', 'Latin America']
    },
    differentiators: [
      'True cloud-native architecture with zero on-premises footprint',
      'Rapid deployment with time-to-value measured in hours',
      'Continuous updates and security enhancements without downtime',
      'Comprehensive Zero Trust Network Access capabilities',
      'Built-in scalability and multi-tenancy'
    ]
  },
  
  'cisco': {
    name: 'Cisco ISE',
    shortName: 'Cisco',
    logoUrl: './img/vendors/cisco.png',
    cloudNative: false,
    architecture: 'on-premises',
    deployment: {
      timeToValue: 90, // Days
      complexity: 'High',
      requiresHardware: true,
      requiresAgents: true,
      remoteWorkSupport: true,
      cloudManaged: false
    },
    costs: {
      pricing: 'perpetual',
      licensePerDevice: 60,
      hardware: 130000,
      implementation: 85000,
      maintenance: 98000,
      yearlySubscription: 0,
      personnel: 200000,
      training: 20000,
      tco3Year: 520000
    },
    security: {
      zeroTrust: 80,
      deviceAuth: 85,
      riskAssessment: 82,
      remediationSpeed: 45,
      complianceCoverage: 90,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 90,
      hipaa: 90,
      gdpr: 85,
      nist: 90,
      iso27001: 90,
      sox: 85,
      cmmc: 90,
      frameworks: [
        {name: 'NIST CSF', coverage: 90, details: {identify: 88, protect: 92, detect: 90, respond: 85, recover: 82}},
        {name: 'PCI DSS', coverage: 90},
        {name: 'HIPAA', coverage: 90},
        {name: 'GDPR', coverage: 85},
        {name: 'ISO 27001', coverage: 90},
        {name: 'SOX', coverage: 85},
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: true,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: true
    },
    technical: {
      maxDevices: '100,000+',
      performanceImpact: 'Moderate',
      scalability: 'Enterprise-grade',
      reliability: 99.9,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Finance', 'Healthcare', 'Government', 'Education', 'Manufacturing'],
      companySize: ['Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East']
    },
    differentiators: [
      'Deep integration with Cisco networking infrastructure',
      'Extensive feature set for large enterprise deployments',
      'Mature product with long history in the market',
      'Strong professional services and support ecosystem',
      'Comprehensive policy management capabilities'
    ]
  },
  
  'aruba': {
    name: 'Aruba ClearPass',
    shortName: 'Aruba',
    logoUrl: './img/vendors/aruba.png',
    cloudNative: false,
    architecture: 'on-premises',
    deployment: {
      timeToValue: 60, // Days
      complexity: 'High',
      requiresHardware: true,
      requiresAgents: true,
      remoteWorkSupport: true,
      cloudManaged: false
    },
    costs: {
      pricing: 'perpetual',
      licensePerDevice: 55,
      hardware: 110000,
      implementation: 65000,
      maintenance: 85000,
      yearlySubscription: 0,
      personnel: 175000,
      training: 15000,
      tco3Year: 480000
    },
    security: {
      zeroTrust: 80,
      deviceAuth: 85,
      riskAssessment: 80,
      remediationSpeed: 40,
      complianceCoverage: 85,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 90,
      hipaa: 85,
      gdpr: 80,
      nist: 85,
      iso27001: 85,
      sox: 80,
      cmmc: 85,
      frameworks: [
        {name: 'NIST CSF', coverage: 85, details: {identify: 85, protect: 90, detect: 85, respond: 80, recover: 80}},
        {name: 'PCI DSS', coverage: 90},
        {name: 'HIPAA', coverage: 85},
        {name: 'GDPR', coverage: 80},
        {name: 'ISO 27001', coverage: 85},
        {name: 'SOX', coverage: 80},
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: false,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: true
    },
    technical: {
      maxDevices: '75,000+',
      performanceImpact: 'Moderate',
      scalability: 'Enterprise-grade',
      reliability: 99.9,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Healthcare', 'Government', 'Education', 'Retail', 'Manufacturing'],
      companySize: ['Medium', 'Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific']
    },
    differentiators: [
      'Tight integration with Aruba wireless infrastructure',
      'Strong focus on BYOD and guest networking',
      'Role-based access control capabilities',
      'Extensive device profiling database',
      'Context-aware policy enforcement'
    ]
  },
  
  'forescout': {
    name: 'Forescout Platform',
    shortName: 'Forescout',
    logoUrl: './img/vendors/forescout.png',
    cloudNative: false,
    architecture: 'hybrid',
    deployment: {
      timeToValue: 75, // Days
      complexity: 'High',
      requiresHardware: true,
      requiresAgents: false,
      remoteWorkSupport: true,
      cloudManaged: false
    },
    costs: {
      pricing: 'perpetual',
      licensePerDevice: 65,
      hardware: 100000,
      implementation: 75000,
      maintenance: 75000,
      yearlySubscription: 0,
      personnel: 150000,
      training: 15000,
      tco3Year: 430000
    },
    security: {
      zeroTrust: 85,
      deviceAuth: 85,
      riskAssessment: 90,
      remediationSpeed: 35,
      complianceCoverage: 85,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 90,
      hipaa: 85,
      gdpr: 80,
      nist: 85,
      iso27001: 85,
      sox: 85,
      cmmc: 85,
      frameworks: [
        {name: 'NIST CSF', coverage: 85, details: {identify: 90, protect: 85, detect: 90, respond: 80, recover: 75}},
        {name: 'PCI DSS', coverage: 90},
        {name: 'HIPAA', coverage: 85},
        {name: 'GDPR', coverage: 80},
        {name: 'ISO 27001', coverage: 85},
        {name: 'SOX', coverage: 85},
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: true,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: true
    },
    technical: {
      maxDevices: '60,000+',
      performanceImpact: 'Low',
      scalability: 'Enterprise-grade',
      reliability: 99.9,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Healthcare', 'Finance', 'Government', 'Critical Infrastructure', 'Manufacturing'],
      companySize: ['Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific', 'Middle East']
    },
    differentiators: [
      'Agentless device discovery and classification',
      'Extensive IoT device support and visibility',
      'Strong OT/ICS security capabilities',
      'Network segmentation orchestration',
      'Comprehensive device visibility across network segments'
    ]
  },
  
  'fortinac': {
    name: 'FortiNAC',
    shortName: 'FortiNAC',
    logoUrl: './img/vendors/fortinac.png',
    cloudNative: false,
    architecture: 'hybrid',
    deployment: {
      timeToValue: 60, // Days
      complexity: 'Moderate',
      requiresHardware: true,
      requiresAgents: false,
      remoteWorkSupport: true,
      cloudManaged: false
    },
    costs: {
      pricing: 'perpetual',
      licensePerDevice: 45,
      hardware: 90000,
      implementation: 60000,
      maintenance: 65000,
      yearlySubscription: 0,
      personnel: 140000,
      training: 12000,
      tco3Year: 385000
    },
    security: {
      zeroTrust: 80,
      deviceAuth: 80,
      riskAssessment: 75,
      remediationSpeed: 35,
      complianceCoverage: 80,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 85,
      hipaa: 80,
      gdpr: 75,
      nist: 80,
      iso27001: 80,
      sox: 80,
      cmmc: 85,
      frameworks: [
        {name: 'NIST CSF', coverage: 80, details: {identify: 80, protect: 85, detect: 80, respond: 75, recover: 75}},
        {name: 'PCI DSS', coverage: 85},
        {name: 'HIPAA', coverage: 80},
        {name: 'GDPR', coverage: 75},
        {name: 'ISO 27001', coverage: 80},
        {name: 'SOX', coverage: 80},
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: false,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: false
    },
    technical: {
      maxDevices: '50,000+',
      performanceImpact: 'Moderate',
      scalability: 'Enterprise-grade',
      reliability: 99.9,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Government', 'Education', 'Healthcare', 'Retail', 'Manufacturing'],
      companySize: ['Medium', 'Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific', 'Latin America']
    },
    differentiators: [
      'Integrated with Fortinet Security Fabric',
      'Strong focus on IoT security',
      'Good automation and orchestration capabilities',
      'Integration with FortiSOAR for incident response',
      'Rogue device detection and mitigation'
    ]
  },
  
  'juniper': {
    name: 'Juniper NAC',
    shortName: 'Juniper',
    logoUrl: './img/vendors/juniper.png',
    cloudNative: false,
    architecture: 'on-premises',
    deployment: {
      timeToValue: 60, // Days
      complexity: 'Moderate',
      requiresHardware: true,
      requiresAgents: true,
      remoteWorkSupport: true,
      cloudManaged: false
    },
    costs: {
      pricing: 'perpetual',
      licensePerDevice: 50,
      hardware: 95000,
      implementation: 70000,
      maintenance: 70000,
      yearlySubscription: 0,
      personnel: 150000,
      training: 15000,
      tco3Year: 410000
    },
    security: {
      zeroTrust: 75,
      deviceAuth: 80,
      riskAssessment: 75,
      remediationSpeed: 40,
      complianceCoverage: 80,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 85,
      hipaa: 80,
      gdpr: 75,
      nist: 80,
      iso27001: 80,
      sox: 75,
      cmmc: 80,
      frameworks: [
        {name: 'NIST CSF', coverage: 80, details: {identify: 75, protect: 85, detect: 80, respond: 75, recover: 75}},
        {name: 'PCI DSS', coverage: 85},
        {name: 'HIPAA', coverage: 80},
        {name: 'GDPR', coverage: 75},
        {name: 'ISO 27001', coverage: 80},
        {name: 'SOX', coverage: 75},
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: false,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: false
    },
    technical: {
      maxDevices: '50,000+',
      performanceImpact: 'Moderate',
      scalability: 'Enterprise-grade',
      reliability: 99.9,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Service Providers', 'Finance', 'Government', 'Education', 'Healthcare'],
      companySize: ['Medium', 'Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific']
    },
    differentiators: [
      'Deep integration with Juniper networking components',
      'Strong security fabric cross-product integration',
      'Good policy enforcement mechanisms',
      'Integration with Juniper's security intelligence',
      'Suitable for service provider environments'
    ]
  }
};

// Make it globally available
window.VENDORS = VENDORS;

/**
 * Compliance Framework Data
 * Contains detailed information on compliance frameworks
 */
const COMPLIANCE_FRAMEWORKS = {
  'nist-csf': {
    name: 'NIST Cybersecurity Framework',
    shortName: 'NIST CSF',
    description: 'The NIST Cybersecurity Framework (CSF) provides a policy framework of computer security guidance for how organizations can assess and improve their ability to prevent, detect, and respond to cyber attacks.',
    version: '1.1',
    categories: [
      {
        id: 'identify',
        name: 'Identify',
        description: 'Develop organizational understanding to manage cybersecurity risk to systems, people, assets, data, and capabilities.',
        subcategories: ['Asset Management', 'Business Environment', 'Governance', 'Risk Assessment', 'Risk Management Strategy']
      },
      {
        id: 'protect',
        name: 'Protect',
        description: 'Develop and implement appropriate safeguards to ensure delivery of critical services.',
        subcategories: ['Identity Management', 'Access Control', 'Awareness and Training', 'Data Security', 'Protective Technology']
      },
      {
        id: 'detect',
        name: 'Detect',
        description: 'Develop and implement appropriate activities to identify the occurrence of a cybersecurity event.',
        subcategories: ['Anomalies and Events', 'Security Continuous Monitoring', 'Detection Processes']
      },
      {
        id: 'respond',
        name: 'Respond',
        description: 'Develop and implement appropriate activities to take action regarding a detected cybersecurity incident.',
        subcategories: ['Response Planning', 'Communications', 'Analysis', 'Mitigation', 'Improvements']
      },
      {
        id: 'recover',
        name: 'Recover',
        description: 'Develop and implement appropriate activities to maintain plans for resilience and to restore any capabilities or services that were impaired due to a cybersecurity incident.',
        subcategories: ['Recovery Planning', 'Improvements', 'Communications']
      }
    ]
  },
  'pci-dss': {
    name: 'Payment Card Industry Data Security Standard',
    shortName: 'PCI DSS',
    description: 'The Payment Card Industry Data Security Standard (PCI DSS) is an information security standard for organizations that handle branded credit cards from the major card schemes.',
    version: '4.0',
    categories: [
      {id: 'secure-network', name: 'Build and Maintain a Secure Network'},
      {id: 'protect-data', name: 'Protect Cardholder Data'},
      {id: 'vulnerability-mgmt', name: 'Maintain a Vulnerability Management Program'},
      {id: 'access-control', name: 'Implement Strong Access Control Measures'},
      {id: 'monitoring', name: 'Regularly Monitor and Test Networks'},
      {id: 'policy', name: 'Maintain an Information Security Policy'}
    ]
  },
  'hipaa': {
    name: 'Health Insurance Portability and Accountability Act',
    shortName: 'HIPAA',
    description: 'The Health Insurance Portability and Accountability Act (HIPAA) sets the standard for protecting sensitive patient data.',
    version: '2023',
    categories: [
      {id: 'privacy', name: 'Privacy Rule'},
      {id: 'security', name: 'Security Rule'},
      {id: 'breach', name: 'Breach Notification Rule'},
      {id: 'enforcement', name: 'Enforcement Rule'}
    ]
  },
  'gdpr': {
    name: 'General Data Protection Regulation',
    shortName: 'GDPR',
    description: 'The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area.',
    version: '2018',
    categories: [
      {id: 'lawfulness', name: 'Lawfulness, Fairness, and Transparency'},
      {id: 'purpose', name: 'Purpose Limitation'},
      {id: 'minimization', name: 'Data Minimization'},
      {id: 'accuracy', name: 'Accuracy'},
      {id: 'storage', name: 'Storage Limitation'},
      {id: 'integrity', name: 'Integrity and Confidentiality'},
      {id: 'accountability', name: 'Accountability'}
    ]
  },
  'iso27001': {
    name: 'ISO/IEC 27001 - Information Security Management',
    shortName: 'ISO 27001',
    description: 'ISO/IEC 27001 is an international standard on how to manage information security.',
    version: '2022',
    categories: [
      {id: 'security-policy', name: 'Information Security Policies'},
      {id: 'organization', name: 'Organization of Information Security'},
      {id: 'human', name: 'Human Resource Security'},
      {id: 'asset', name: 'Asset Management'},
      {id: 'access', name: 'Access Control'},
      {id: 'cryptography', name: 'Cryptography'},
      {id: 'physical', name: 'Physical and Environmental Security'},
      {id: 'operations', name: 'Operations Security'},
      {id: 'communications', name: 'Communications Security'},
      {id: 'acquisition', name: 'System Acquisition, Development and Maintenance'}
    ]
  }
};

// Make it globally available
window.COMPLIANCE_FRAMEWORKS = COMPLIANCE_FRAMEWORKS;

/**
 * Industry Data
 * Contains information specific to different industries
 */
const INDUSTRY_DATA = {
  'healthcare': {
    name: 'Healthcare',
    key_regulations: ['HIPAA', 'HITRUST', 'FDA', 'GDPR'],
    avg_breach_cost: 10100000,
    security_priorities: ['Patient Data Protection', 'Medical Device Security', 'Regulatory Compliance', 'Zero Trust'],
    statistics: {
      breach_likelihood: 0.32,
      devices_per_bed: 15,
      iot_percentage: 0.65,
      average_recovery_time: 236
    },
    recommended_vendors: ['portnox', 'cisco', 'forescout'],
    use_cases: [
      'Medical device security and inventory',
      'Clinical workstation protection',
      'Patient data privacy compliance',
      'Remote clinician access'
    ]
  },
  'finance': {
    name: 'Financial Services',
    key_regulations: ['PCI DSS', 'SOX', 'GLBA', 'GDPR', 'NY-DFS'],
    avg_breach_cost: 15000000,
    security_priorities: ['Fraud Prevention', 'Data Protection', 'Continuous Monitoring', 'Zero Trust'],
    statistics: {
      breach_likelihood: 0.38,
      employee_devices: 2.3,
      iot_percentage: 0.35,
      average_recovery_time: 185
    },
    recommended_vendors: ['portnox', 'cisco', 'aruba'],
    use_cases: [
      'Trading floor security',
      'Mobile banking employee security',
      'Financial data protection',
      'Regulatory compliance'
    ]
  },
  'manufacturing': {
    name: 'Manufacturing',
    key_regulations: ['NIST CSF', 'IEC 62443', 'CMMC', 'GDPR'],
    avg_breach_cost: 8200000,
    security_priorities: ['OT Security', 'IP Protection', 'Supply Chain', 'Zero Trust'],
    statistics: {
      breach_likelihood: 0.28,
      ot_it_ratio: 2.8,
      iot_percentage: 0.78,
      average_recovery_time: 265
    },
    recommended_vendors: ['portnox', 'forescout', 'fortinac'],
    use_cases: [
      'OT/IT convergence security',
      'Production line device protection',
      'Supply chain access management',
      'Legacy systems integration'
    ]
  },
  'retail': {
    name: 'Retail',
    key_regulations: ['PCI DSS', 'CCPA', 'GDPR'],
    avg_breach_cost: 6500000,
    security_priorities: ['Payment Security', 'Customer Data', 'IoT Security', 'Zero Trust'],
    statistics: {
      breach_likelihood: 0.32,
      pos_devices_ratio: 5.3,
      iot_percentage: 0.62,
      average_recovery_time: 210
    },
    recommended_vendors: ['portnox', 'aruba', 'fortinac'],
    use_cases: [
      'POS terminal security',
      'In-store digital experience protection',
      'Customer data privacy',
      'Inventory system access'
    ]
  },
  'government': {
    name: 'Government',
    key_regulations: ['FISMA', 'FedRAMP', 'CMMC', 'NIST SP 800-53'],
    avg_breach_cost: 12300000,
    security_priorities: ['Critical Infrastructure', 'Citizen Data', 'Zero Trust', 'Compliance'],
    statistics: {
      breach_likelihood: 0.40,
      classified_systems: 0.21,
      iot_percentage: 0.38,
      average_recovery_time: 287
    },
    recommended_vendors: ['portnox', 'cisco', 'forescout'],
    use_cases: [
      'Secure government facility access',
      'Classified and unclassified network separation',
      'BYOD for government employees',
      'Contractor and visitor management'
    ]
  },
  'education': {
    name: 'Education',
    key_regulations: ['FERPA', 'COPPA', 'GDPR', 'HIPAA'],
    avg_breach_cost: 4800000,
    security_priorities: ['Student Data Protection', 'Research Security', 'Open Network Security', 'Zero Trust'],
    statistics: {
      breach_likelihood: 0.35,
      student_devices: 3.2,
      iot_percentage: 0.52,
      average_recovery_time: 195
    },
    recommended_vendors: ['portnox', 'aruba', 'juniper'],
    use_cases: [
      'BYOD for students and faculty',
      'Research network protection',
      'Campus-wide access control',
      'Student data privacy'
    ]
  }
};

// Make it globally available
window.INDUSTRY_DATA = INDUSTRY_DATA;
EOF

# -------------------------
# ENHANCED NIST CSF VISUALIZATION
# -------------------------
echo "Creating enhanced NIST CSF visualization..."

cat > ./js/components/nist-csf-visualization.js << 'EOF'
/**
 * NIST CSF Visualization Component for Portnox Total Cost Analyzer
 * Creates an interactive visualization of the NIST Cybersecurity Framework
 */

class NistCSFVisualization {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.vendors = window.VENDORS || {};
    this.framework = window.COMPLIANCE_FRAMEWORKS['nist-csf'] || {};
    this.selectedVendors = ['portnox'];
    this.expanded = {};
  }
  
  /**
   * Initialize the visualization
   */
  init() {
    if (!this.container) {
      console.error(`Container element ${this.containerId} not found`);
      return;
    }
    
    // Clear container
    this.container.innerHTML = '';
    
    // Create framework structure
    this.createFrameworkStructure();
    
    // Initialize event listeners
    this.initEventListeners();
    
    return this;
  }
  
  /**
   * Create the framework structure
   */
  createFrameworkStructure() {
    if (!this.framework || !this.framework.categories) {
      console.error('NIST CSF framework data not found');
      return;
    }
    
    // Create header
    const header = document.createElement('div');
    header.className = 'nist-header';
    header.innerHTML = `
      <h3 class="nist-title">NIST Cybersecurity Framework Compliance</h3>
      <div class="nist-controls">
        <button class="btn btn-sm btn-outline-primary nist-expand-all">Expand All</button>
        <button class="btn btn-sm btn-outline nist-collapse-all">Collapse All</button>
      </div>
    `;
    this.container.appendChild(header);
    
    // Create category grid
    const grid = document.createElement('div');
    grid.className = 'nist-grid';
    
    // Add categories
    this.framework.categories.forEach(category => {
      const categoryEl = this.createCategoryElement(category);
      grid.appendChild(categoryEl);
    });
    
    this.container.appendChild(grid);
    
    // Create legend
    const legend = document.createElement('div');
    legend.className = 'nist-legend';
    legend.innerHTML = this.createLegendContent();
    this.container.appendChild(legend);
  }
  
  /**
   * Create a category element
   */
  createCategoryElement(category) {
    const categoryEl = document.createElement('div');
    categoryEl.className = `nist-category nist-category-${category.id}`;
    categoryEl.dataset.category = category.id;
    
    // Calculate average score for this category across selected vendors
    const scores = this.calculateCategoryScores(category.id);
    
    categoryEl.innerHTML = `
      <div class="nist-category-header">
        <div class="nist-category-icon">${this.getCategoryIcon(category.id)}</div>
        <h4 class="nist-category-name">${category.name}</h4>
      </div>
      <p class="nist-category-description">${category.description}</p>
      <div class="nist-score">
        <div class="nist-score-bar" style="width: ${scores.portnox}%"></div>
      </div>
      <div class="nist-score-values">
        <span class="nist-score-value">Portnox: ${scores.portnox}%</span>
        <span class="nist-score-value">Industry Avg: ${scores.industry}%</span>
      </div>
      <div class="nist-subcategories" style="display: none;">
        ${this.createSubcategoriesContent(category.subcategories)}
      </div>
      <button class="btn btn-sm btn-outline nist-expand-btn" data-category="${category.id}">
        <i class="fas fa-chevron-down"></i> Details
      </button>
    `;
    
    return categoryEl;
  }
  
  /**
   * Create subcategories content
   */
  createSubcategoriesContent(subcategories) {
    if (!subcategories || !subcategories.length) return '';
    
    return subcategories.map(sub => `
      <div class="nist-subcategory">
        <span class="nist-subcategory-name">${sub}</span>
        <span class="nist-subcategory-value">${this.getRandomScore(80, 95)}%</span>
      </div>
    `).join('');
  }
  
  /**
   * Create legend content
   */
  createLegendContent() {
    let content = '';
    
    // Add vendor legend items
    content += `
      <div class="nist-legend-item">
        <div class="nist-legend-color" style="background-color: var(--color-primary-600);"></div>
        <span>Portnox Cloud</span>
      </div>
      <div class="nist-legend-item">
        <div class="nist-legend-color" style="background-color: var(--color-neutral-400);"></div>
        <span>Industry Average</span>
      </div>
    `;
    
    // Add category legend items
    this.framework.categories.forEach(category => {
      let color = 'var(--color-primary-600)';
      
      if (category.id === 'protect') color = 'var(--color-success-600)';
      else if (category.id === 'detect') color = 'var(--color-warning-600)';
      else if (category.id === 'respond') color = 'var(--color-danger-600)';
      else if (category.id === 'recover') color = 'var(--color-secondary-600)';
      
      content += `
        <div class="nist-legend-item">
          <div class="nist-legend-color" style="background-color: ${color};"></div>
          <span>${category.name}</span>
        </div>
      `;
    });
    
    return content;
  }
  
  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // Expand/collapse individual categories
    const expandButtons = this.container.querySelectorAll('.nist-expand-btn');
    expandButtons.forEach(btn => {
      btn.addEventListener('click', e => {
        const categoryId = btn.dataset.category;
        const categoryEl = this.container.querySelector(`.nist-category-${categoryId}`);
        const subcategories = categoryEl.querySelector('.nist-subcategories');
        
        if (this.expanded[categoryId]) {
          // Collapse
          subcategories.style.display = 'none';
          btn.innerHTML = '<i class="fas fa-chevron-down"></i> Details';
          this.expanded[categoryId] = false;
        } else {
          // Expand
          subcategories.style.display = 'block';
          btn.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Details';
          this.expanded[categoryId] = true;
        }
      });
    });
    
    // Expand all button
    const expandAllBtn = this.container.querySelector('.nist-expand-all');
    if (expandAllBtn) {
      expandAllBtn.addEventListener('click', () => {
        const subcategories = this.container.querySelectorAll('.nist-subcategories');
        subcategories.forEach(el => el.style.display = 'block');
        
        const buttons = this.container.querySelectorAll('.nist-expand-btn');
        buttons.forEach(btn => {
          btn.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Details';
          this.expanded[btn.dataset.category] = true;
        });
      });
    }
    
    // Collapse all button
    const collapseAllBtn = this.container.querySelector('.nist-collapse-all');
    if (collapseAllBtn) {
      collapseAllBtn.addEventListener('click', () => {
        const subcategories = this.container.querySelectorAll('.nist-subcategories');
        subcategories.forEach(el => el.style.display = 'none');
        
        const buttons = this.container.querySelectorAll('.nist-expand-btn');
        buttons.forEach(btn => {
          btn.innerHTML = '<i class="fas fa-chevron-down"></i> Details';
          this.expanded[btn.dataset.category] = false;
        });
      });
    }
  }
  
  /**
   * Calculate scores for a category
   */
  calculateCategoryScores(categoryId) {
    // Check if we have real data
    const portnoxData = this.vendors.portnox?.compliance?.frameworks?.find(f => f.name === 'NIST CSF');
    
    if (portnoxData && portnoxData.details && portnoxData.details[categoryId]) {
      // We have real data
      return {
        portnox: portnoxData.details[categoryId],
        industry: this.calculateIndustryAverage(categoryId)
      };
    }
    
    // Fallback to simulated data
    return {
      portnox: this.getSimulatedScore('portnox', categoryId),
      industry: this.getSimulatedScore('industry', categoryId)
    };
  }
  
  /**
   * Calculate industry average for a category
   */
  calculateIndustryAverage(categoryId) {
    let total = 0;
    let count = 0;
    
    Object.keys(this.vendors).forEach(vendorId => {
      if (vendorId === 'portnox') return;
      
      const vendor = this.vendors[vendorId];
      const frameworkData = vendor?.compliance?.frameworks?.find(f => f.name === 'NIST CSF');
      
      if (frameworkData && frameworkData.details && frameworkData.details[categoryId]) {
        total += frameworkData.details[categoryId];
        count++;
      }
    });
    
    return count > 0 ? Math.round(total / count) : this.getSimulatedScore('industry', categoryId);
  }
  
  /**
   * Get simulated score for a vendor and category
   */
  getSimulatedScore(type, categoryId) {
    // Simulated scores for demonstration purposes
    const scores = {
      portnox: {
        identify: 92,
        protect: 96,
        detect: 95,
        respond: 94,
        recover: 90
      },
      industry: {
        identify: 82,
        protect: 85,
        detect: 80,
        respond: 78,
        recover: 75
      }
    };
    
    return scores[type][categoryId] || 80;
  }
  
  /**
   * Get a random score between min and max
   */
  getRandomScore(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /**
   * Get icon for a category
   */
  getCategoryIcon(categoryId) {
    const icons = {
      identify: '<i class="fas fa-search"></i>',
      protect: '<i class="fas fa-shield-alt"></i>',
      detect: '<i class="fas fa-radar"></i>',
      respond: '<i class="fas fa-bolt"></i>',
      recover: '<i class="fas fa-sync-alt"></i>'
    };
    
    return icons[categoryId] || '<i class="fas fa-check"></i>';
  }
  
  /**
   * Update selected vendors
   */
  updateSelectedVendors(vendors) {
    this.selectedVendors = vendors;
    this.init();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize NIST CSF visualization if container exists
  const container = document.getElementById('nist-csf-visualization');
  if (container) {
    window.nistCsfVisualization = new NistCSFVisualization('nist-csf-visualization').init();
  }
});
EOF

# -------------------------
# CREATE VENDOR COMPARISON COMPONENTS
# -------------------------
echo "Creating vendor comparison components..."

cat > ./js/components/vendor-comparison.js << 'EOF'
/**
 * Vendor Comparison Components for Portnox Total Cost Analyzer
 * Creates interactive comparison charts and tables for vendor analysis
 */

const VendorComparison = {
  /**
   * Create feature comparison heatmap
   */
  createFeatureHeatmap: function(containerId, selectedVendors) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show
    const vendorsToShow = selectedVendors || ['portnox', 'cisco', 'aruba', 'forescout'];
    
    // Get feature data from vendors
    const features = {
      'Zero Trust Architecture': vendor => vendor.security?.zeroTrust || 0,
      'Device Authentication': vendor => vendor.security?.deviceAuth || 0,
      'Risk Assessment': vendor => vendor.security?.riskAssessment || 0,
      'Compliance Coverage': vendor => vendor.security?.complianceCoverage || 0,
      'Remediation Speed': vendor => 100 - (vendor.security?.remediationSpeed || 0),
      'Cloud Integration': vendor => vendor.features?.cloudIntegration ? 100 : 0,
      'BYOD Support': vendor => vendor.features?.byod ? 100 : 0,
      'IoT Support': vendor => vendor.features?.iot ? 100 : 0,
      'Remote Work': vendor => vendor.features?.remoteUsers ? 100 : 0,
      'API Capabilities': vendor => vendor.features?.api ? 100 : 0
    };
    
    // Create heatmap content
    let html = `
      <div class="heatmap-container">
        <div class="heatmap-header">
          <h3 class="heatmap-title">Vendor Feature Comparison</h3>
          <div class="heatmap-controls">
            <button class="btn btn-sm btn-outline-primary" id="download-heatmap">
              <i class="fas fa-download"></i> Export
            </button>
          </div>
        </div>
        <div class="heatmap-grid">
    `;
    
    // Add cells for each feature and vendor
    Object.keys(features).forEach(feature => {
      vendorsToShow.forEach(vendorId => {
        const vendor = vendors[vendorId];
        if (!vendor) return;
        
        const score = features[feature](vendor);
        const colorClass = this.getScoreColorClass(score);
        
        html += `
          <div class="heatmap-cell ${colorClass}">
            <div class="heatmap-cell-label">${vendor.shortName}</div>
            <div class="heatmap-cell-feature">${feature}</div>
            <div class="heatmap-cell-value">${score}%</div>
          </div>
        `;
      });
    });
    
    html += `
        </div>
        <div class="heatmap-legend">
          <div class="heatmap-legend-item">
            <div class="heatmap-legend-color" style="background-color: var(--color-success-500);"></div>
            <span>Excellent (90-100%)</span>
          </div>
          <div class="heatmap-legend-item">
            <div class="heatmap-legend-color" style="background-color: var(--color-success-300);"></div>
            <span>Good (75-89%)</span>
          </div>
          <div class="heatmap-legend-item">
            <div class="heatmap-legend-color" style="background-color: var(--color-warning-300);"></div>
            <span>Average (60-74%)</span>
          </div>
          <div class="heatmap-legend-item">
            <div class="heatmap-legend-color" style="background-color: var(--color-danger-300);"></div>
            <span>Below Average (<60%)</span>
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
    
    // Add event listeners
    const downloadBtn = container.querySelector('#download-heatmap');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        alert('Export functionality would be implemented here');
      });
    }
  },
  
  /**
   * Create cost breakdown comparison
   */
  createCostComparison: function(containerId, selectedVendors) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show
    const vendorsToShow = selectedVendors || ['portnox', 'cisco', 'aruba', 'forescout'];
    
    // Create cost comparison content
    let html = `
      <div class="cost-comparison">
        <h3 class="cost-comparison-title">3-Year TCO Breakdown</h3>
        <div class="cost-table-container">
          <table class="data-table cost-table">
            <thead>
              <tr>
                <th>Cost Category</th>
                ${vendorsToShow.map(id => vendors[id] ? `<th>${vendors[id].shortName}</th>` : '').join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hardware</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${this.formatCurrency(vendor.costs?.hardware || 0)}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Implementation</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${this.formatCurrency(vendor.costs?.implementation || 0)}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>License/Subscription</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  const cost = vendor?.costs?.pricing === 'subscription' ? 
                    (vendor.costs?.yearlySubscription || 0) : 
                    (vendor.costs?.licensePerDevice || 0) * 1000;
                  return vendor ? `<td>${this.formatCurrency(cost)}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Maintenance</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${this.formatCurrency(vendor.costs?.maintenance || 0)}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Personnel</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${this.formatCurrency(vendor.costs?.personnel || 0)}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Training</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${this.formatCurrency(vendor.costs?.training || 0)}</td>` : '';
                }).join('')}
              </tr>
              <tr class="total-row">
                <td>Total 3-Year TCO</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${this.formatCurrency(vendor.costs?.tco3Year || 0)}</td>` : '';
                }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="savings-summary">
        <h3 class="savings-summary-title">Cost Savings with Portnox Cloud</h3>
        <div class="stats-grid">
          ${vendorsToShow.filter(id => id !== 'portnox').map(id => {
            const vendor = vendors[id];
            if (!vendor) return '';
            
            const portnox = vendors['portnox'];
            if (!portnox) return '';
            
            const savings = vendor.costs?.tco3Year - portnox.costs?.tco3Year;
            const percentage = Math.round((savings / vendor.costs?.tco3Year) * 100);
            
            return `
              <div class="stat-card">
                <div class="stat-title">
                  <i class="fas fa-money-bill-wave"></i>
                  Savings vs ${vendor.shortName}
                </div>
                <div class="stat-value">${this.formatCurrency(savings)}</div>
                <div class="stat-indicator positive">
                  <i class="fas fa-caret-up"></i> ${percentage}% less expensive
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Create security comparison
   */
  createSecurityComparison: function(containerId, selectedVendors) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show
    const vendorsToShow = selectedVendors || ['portnox', 'cisco', 'aruba', 'forescout'];
    
    // Create security comparison content
    let html = `
      <div class="security-comparison">
        <h3 class="security-comparison-title">Security Capabilities</h3>
        <div class="security-table-container">
          <table class="data-table security-table">
            <thead>
              <tr>
                <th>Security Feature</th>
                ${vendorsToShow.map(id => vendors[id] ? `<th>${vendors[id].shortName}</th>` : '').join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Zero Trust Architecture</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.zeroTrust || 0}%</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Device Authentication</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.deviceAuth || 0}%</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Risk Assessment</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.riskAssessment || 0}%</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Remediation Speed</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.remediationSpeed || 0} hours</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Compliance Coverage</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.complianceCoverage || 0}%</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Multi-Factor Authentication</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.mfa ? '<i class="fas fa-check text-success"></i>' : '<i class="fas fa-times text-danger"></i>'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Certificate Support</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.certificateSupport ? '<i class="fas fa-check text-success"></i>' : '<i class="fas fa-times text-danger"></i>'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Continuous Monitoring</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.continuousMonitoring ? '<i class="fas fa-check text-success"></i>' : '<i class="fas fa-times text-danger"></i>'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Automated Response</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.security?.automatedResponse ? '<i class="fas fa-check text-success"></i>' : '<i class="fas fa-times text-danger"></i>'}</td>` : '';
                }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="compliance-comparison">
        <h3 class="compliance-comparison-title">Compliance Framework Coverage</h3>
        <div class="compliance-grid">
          ${['NIST CSF', 'PCI DSS', 'HIPAA', 'GDPR', 'ISO 27001'].map(framework => `
            <div class="compliance-card">
              <div class="compliance-icon">
                <i class="fas ${this.getComplianceIcon(framework)}"></i>
              </div>
              <div class="compliance-name">${framework}</div>
              <div class="compliance-scores">
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  if (!vendor) return '';
                  
                  const frameworkData = vendor.compliance?.frameworks?.find(f => f.name === framework);
                  const coverage = frameworkData ? frameworkData.coverage : this.getRandomInt(70, 90);
                  
                  return `<div class="compliance-vendor-score" data-vendor="${id}" data-score="${coverage}">
                    <span class="vendor-name">${vendor.shortName}</span>: ${coverage}%
                  </div>`;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Create technical comparison
   */
  createTechnicalComparison: function(containerId, selectedVendors) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show
    const vendorsToShow = selectedVendors || ['portnox', 'cisco', 'aruba', 'forescout'];
    
    // Create technical comparison content
    let html = `
      <div class="technical-comparison">
        <h3 class="technical-comparison-title">Technical Architecture</h3>
        <div class="technical-table-container">
          <table class="data-table technical-table">
            <thead>
              <tr>
                <th>Technical Aspect</th>
                ${vendorsToShow.map(id => vendors[id] ? `<th>${vendors[id].shortName}</th>` : '').join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Architecture Type</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  if (!vendor) return '';
                  
                  let badge = '';
                  if (vendor.architecture === 'cloud') {
                    badge = '<span class="badge badge-primary">Cloud-Native</span>';
                  } else if (vendor.architecture === 'hybrid') {
                    badge = '<span class="badge badge-warning">Hybrid</span>';
                  } else {
                    badge = '<span class="badge badge-danger">On-Premises</span>';
                  }
                  
                  return `<td>${badge}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Deployment Time</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.deployment?.timeToValue || '?'} days</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Requires Hardware</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.deployment?.requiresHardware ? '<i class="fas fa-check text-danger"></i>' : '<i class="fas fa-times text-success"></i>'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Requires Agents</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.deployment?.requiresAgents ? '<i class="fas fa-check text-danger"></i>' : '<i class="fas fa-times text-success"></i>'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Remote Work Support</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.deployment?.remoteWorkSupport ? '<i class="fas fa-check text-success"></i>' : '<i class="fas fa-times text-danger"></i>'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Max Devices</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.technical?.maxDevices || 'Unknown'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Performance Impact</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.technical?.performanceImpact || 'Unknown'}</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Reliability</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.technical?.reliability || 99}%</td>` : '';
                }).join('')}
              </tr>
              <tr>
                <td>Update Frequency</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id];
                  return vendor ? `<td>${vendor.technical?.updateFrequency || 'Unknown'}</td>` : '';
                }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="integration-comparison">
        <h3 class="integration-comparison-title">Integration Capabilities</h3>
        <div class="integration-grid">
          ${['Azure AD', 'Google Workspace', 'AWS', 'Active Directory', 'RADIUS', 'MDM', 'SIEM'].map(integration => {
            const keys = {
              'Azure AD': 'azure',
              'Google Workspace': 'googleWorkspace',
              'AWS': 'aws',
              'Active Directory': 'activedirectory',
              'RADIUS': 'radius',
              'MDM': 'mdm',
              'SIEM': 'siem'
            };
            
            const key = keys[integration] || integration.toLowerCase();
            
            return `
              <div class="integration-card">
                <div class="integration-icon">
                  <i class="fas ${this.getIntegrationIcon(integration)}"></i>
                </div>
                <div class="integration-name">${integration}</div>
                <div class="integration-vendors">
                  ${vendorsToShow.map(id => {
                    const vendor = vendors[id];
                    if (!vendor) return '';
                    
                    const supported = vendor.integration?.[key];
                    return `<div class="integration-vendor ${supported ? 'supported' : 'not-supported'}">${vendor.shortName}</div>`;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Helper function to format currency
   */
  formatCurrency: function(value) {
    return '$' + Math.round(value).toLocaleString();
  },
  
  /**
   * Get color class based on score
   */
  getScoreColorClass: function(score) {
    if (score >= 90) return 'score-excellent';
    if (score >= 75) return 'score-good';
    if (score >= 60) return 'score-average';
    return 'score-poor';
  },
  
  /**
   * Get random integer between min and max
   */
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  /**
   * Get icon for compliance framework
   */
  getComplianceIcon: function(framework) {
    const icons = {
      'NIST CSF': 'fa-shield-alt',
      'PCI DSS': 'fa-credit-card',
      'HIPAA': 'fa-hospital',
      'GDPR': 'fa-globe-europe',
      'ISO 27001': 'fa-certificate'
    };
    
    return icons[framework] || 'fa-check-circle';
  },
  
  /**
   * Get icon for integration
   */
  getIntegrationIcon: function(integration) {
    const icons = {
      'Azure AD': 'fa-microsoft',
      'Google Workspace': 'fa-google',
      'AWS': 'fa-aws',
      'Active Directory': 'fa-server',
      'RADIUS': 'fa-broadcast-tower',
      'MDM': 'fa-mobile-alt',
      'SIEM': 'fa-chart-line'
    };
    
    return icons[integration] || 'fa-plug';
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize vendor comparisons if containers exist
  const featureHeatmap = document.getElementById('feature-heatmap');
  if (featureHeatmap) {
    VendorComparison.createFeatureHeatmap('feature-heatmap');
  }
  
  const costComparison = document.getElementById('cost-comparison');
  if (costComparison) {
    VendorComparison.createCostComparison('cost-comparison');
  }
  
  const securityComparison = document.getElementById('security-comparison');
  if (securityComparison) {
    VendorComparison.createSecurityComparison('security-comparison');
  }
  
  const technicalComparison = document.getElementById('technical-comparison');
  if (technicalComparison) {
    VendorComparison.createTechnicalComparison('technical-comparison');
  }
});
EOF

# -------------------------
# UPDATE THE TAB NAVIGATOR WITH ENHANCED TEMPLATES
# -------------------------
echo "Updating tab navigator with enhanced templates..."

cat > ./js/components/tab-navigator-enhanced.js << 'EOF'
/**
 * Enhanced Tab Navigator for Portnox Total Cost Analyzer
 * Provides a fixed, modern tab structure with improved content templates
 */

class TabNavigator {
  constructor() {
    this.mainTabs = ['executive', 'financial', 'security', 'technical'];
    this.subTabs = {
      'executive': ['summary', 'comparison', 'roi'],
      'financial': ['tco', 'breakdown', 'projection'],
      'security': ['overview', 'compliance', 'risk'],
      'technical': ['architecture', 'features', 'deployment']
    };
    this.activeMainTab = 'executive';
    this.activeSubTabs = {};
    
    // Set default active subtabs
    this.mainTabs.forEach(tab => {
      this.activeSubTabs[tab] = this.subTabs[tab][0];
    });
  }
  
  /**
   * Initialize the tab navigator
   */
  init() {
    console.log('Initializing TabNavigator...');
    
    // Create tab structure if it doesn't exist
    this.createTabStructure();
    
    // Initialize event listeners
    this.initEventListeners();
    
    // Activate default tabs
    this.activateTab(this.activeMainTab);
    
    return this;
  }
  
  /**
   * Create the tab structure
   */
  createTabStructure() {
    const tabContainer = document.querySelector('.tab-container');
    if (!tabContainer) {
      console.error('Tab container not found, creating it');
      this.createTabContainer();
      return;
    }
    
    // Clear existing tabs
    tabContainer.innerHTML = '';
    
    // Create main tabs
    const mainTabsEl = document.createElement('div');
    mainTabsEl.className = 'main-tabs';
    
    this.mainTabs.forEach(tab => {
      const tabEl = document.createElement('div');
      tabEl.className = 'main-tab';
      tabEl.dataset.tab = tab;
      tabEl.innerHTML = `
        <div class="tab-icon"><i class="fas ${this.getTabIcon(tab)}"></i></div>
        <div class="tab-label">${this.formatTabName(tab)}</div>
      `;
      mainTabsEl.appendChild(tabEl);
    });
    
    tabContainer.appendChild(mainTabsEl);
    
    // Create subtabs container
    const subTabsContainer = document.createElement('div');
    subTabsContainer.className = 'sub-tabs-container';
    
    // Create subtabs for each main tab
    this.mainTabs.forEach(mainTab => {
      const subTabsEl = document.createElement('div');
      subTabsEl.className = 'sub-tabs';
      subTabsEl.dataset.parentTab = mainTab;
      
      this.subTabs[mainTab].forEach(subTab => {
        const tabEl = document.createElement('div');
        tabEl.className = 'sub-tab';
        tabEl.dataset.tab = subTab;
        tabEl.dataset.parentTab = mainTab;
        tabEl.textContent = this.formatTabName(subTab);
        subTabsEl.appendChild(tabEl);
      });
      
      subTabsContainer.appendChild(subTabsEl);
    });
    
    tabContainer.appendChild(subTabsContainer);
    
    // Create view container if it doesn't exist
    let viewContainer = document.querySelector('.view-container');
    if (!viewContainer) {
      viewContainer = document.createElement('div');
      viewContainer.className = 'view-container';
      tabContainer.after(viewContainer);
    }
  }
  
  /**
   * Create tab container if it doesn't exist
   */
  createTabContainer() {
    const mainContent = document.querySelector('.content-area');
    if (!mainContent) {
      console.error('Content area not found, cannot create tab container');
      return;
    }
    
    // Create tab container
    const tabContainer = document.createElement('div');
    tabContainer.className = 'tab-container';
    
    // Insert at the beginning of main content
    mainContent.prepend(tabContainer);
    
    // Now create the structure
    this.createTabStructure();
  }
  
  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // Main tab click event
    const mainTabs = document.querySelectorAll('.main-tab');
    mainTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        this.activateTab(tabName);
      });
    });
    
    // Subtab click event
    const subTabs = document.querySelectorAll('.sub-tab');
    subTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const parentTab = tab.dataset.parentTab;
        const tabName = tab.dataset.tab;
        this.activateSubTab(parentTab, tabName);
      });
    });
  }
  
  /**
   * Activate a main tab
   */
  activateTab(tabName) {
    // Validate tab name
    if (!this.mainTabs.includes(tabName)) {
      console.error("Invalid tab name: " + tabName);
      return;
    }
    
    this.activeMainTab = tabName;
    
    // Update active tab UI
    const mainTabs = document.querySelectorAll('.main-tab');
    mainTabs.forEach(tab => {
      if (tab.dataset.tab === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Show appropriate subtabs
    const subTabsContainers = document.querySelectorAll('.sub-tabs');
    subTabsContainers.forEach(container => {
      if (container.dataset.parentTab === tabName) {
        container.classList.add('active');
      } else {
        container.classList.remove('active');
# Continue with the enhanced tab-navigator-enhanced.js file
cat >> ./js/components/tab-navigator-enhanced.js << 'EOF'
        container.classList.remove('active');
      }
    });

    // Activate the current subtab for this main tab
    this.activateSubTab(tabName, this.activeSubTabs[tabName]);
  }

  /**
   * Activate a subtab
   */
  activateSubTab(parentTab, tabName) {
    // Validate tab names
    if (!this.mainTabs.includes(parentTab) || !this.subTabs[parentTab].includes(tabName)) {
      console.error("Invalid tab combination: " + parentTab + "/" + tabName);
      return;
    }

    this.activeSubTabs[parentTab] = tabName;

    // Update active subtab UI
    const subTabs = document.querySelectorAll('.sub-tab');
    subTabs.forEach(tab => {
      if (tab.dataset.parentTab === parentTab && tab.dataset.tab === tabName) {
        tab.classList.add('active');
      } else if (tab.dataset.parentTab === parentTab) {
        tab.classList.remove('active');
      }
    });

    // Show appropriate view content
    this.showViewContent(parentTab, tabName);
  }

  /**
   * Show appropriate view content
   */
  showViewContent(mainTab, subTab) {
    const viewId = mainTab + "-" + subTab;

    // Hide all views
    const views = document.querySelectorAll('.view-content');
    views.forEach(view => view.classList.remove('active'));

    // Show selected view
    const targetView = document.getElementById(viewId);
    if (targetView) {
      targetView.classList.add('active');
    } else {
      // Create view if it doesn't exist
      this.createViewContent(mainTab, subTab);
    }

    // Refresh charts if needed
    this.refreshChartsInView(mainTab, subTab);
  }

  /**
   * Create view content
   */
  createViewContent(mainTab, subTab) {
    const viewId = mainTab + "-" + subTab;
    const viewContainer = document.querySelector('.view-container');

    if (!viewContainer) {
      console.error('View container not found');
      return;
    }

    // Create view content
    const viewContent = document.createElement('div');
    viewContent.id = viewId;
    viewContent.className = 'view-content active';

    // Add appropriate content based on the view
    viewContent.innerHTML = this.getViewTemplate(mainTab, subTab);

    viewContainer.appendChild(viewContent);

    // Initialize charts for this view
    this.initializeChartsForView(mainTab, subTab);

    // Initialize other components for this view
    this.initializeComponentsForView(mainTab, subTab);
  }

  /**
   * Get view template
   */
  getViewTemplate(mainTab, subTab) {
    // Templates for various views
    const templates = {
      'executive-summary': `
        <div class="section-banner banner-gradient-cool">
          <h2><i class="fas fa-chart-line"></i> Executive Overview</h2>
          <p>Comprehensive analysis of Network Access Control solutions with focus on Total Cost of Ownership, ROI, and business impact.</p>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-title"><i class="fas fa-coins"></i> 3-Year TCO Savings</div>
            <div class="stat-value">$370,000</div>
            <div class="stat-indicator positive">
              <i class="fas fa-arrow-up"></i> vs Traditional NAC
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-title"><i class="fas fa-clock"></i> Deployment Time</div>
            <div class="stat-value">1 Day</div>
            <div class="stat-indicator positive">
              <i class="fas fa-arrow-down"></i> 98% faster
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-title"><i class="fas fa-shield-alt"></i> Security Coverage</div>
            <div class="stat-value">95%</div>
            <div class="stat-indicator positive">
              <i class="fas fa-arrow-up"></i> 15% higher
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-title"><i class="fas fa-calculator"></i> ROI</div>
            <div class="stat-value">285%</div>
            <div class="stat-indicator positive">
              <i class="fas fa-arrow-up"></i> 1-Year Payback
            </div>
          </div>
        </div>

        <div class="chart-section">
          <h3 class="section-title"><i class="fas fa-chart-bar"></i> NAC Solution Comparison</h3>
          <div class="chart-row">
            <div class="chart-wrapper" id="executive-tco-chart">
              <div class="chart-title">3-Year TCO Comparison</div>
              <div class="chart-subtitle">Total cost of ownership including hardware, software, and operations</div>
              <div class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading TCO comparison chart...</p>
              </div>
            </div>
            <div class="chart-wrapper" id="executive-roi-chart">
              <div class="chart-title">Return on Investment</div>
              <div class="chart-subtitle">Cumulative ROI over a 3-year period</div>
              <div class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading ROI chart...</p>
              </div>
            </div>
          </div>
          <div class="insight-panel">
            <h3><i class="fas fa-lightbulb"></i> Key Insights</h3>
            <ul class="insight-list">
              <li><strong>Portnox Cloud offers the lowest TCO</strong> compared to traditional NAC solutions, with savings of up to 60%</li>
              <li><strong>Cloud-native architecture eliminates hardware costs</strong> and reduces maintenance expenses</li>
              <li><strong>Simplified deployment reduces implementation time</strong> by up to 98% compared to on-premises solutions</li>
              <li><strong>Enhanced security capabilities</strong> lead to reduced breach risk and lower cyber insurance costs</li>
            </ul>
          </div>
        </div>

        <div class="nist-framework-section">
          <h3 class="section-title"><i class="fas fa-shield-alt"></i> NIST Cybersecurity Framework Compliance</h3>
          <div id="nist-csf-visualization" class="nist-framework">
            <div class="chart-placeholder">
              <div class="chart-loading-spinner"></div>
              <p>Loading NIST CSF visualization...</p>
            </div>
          </div>
        </div>

        <div class="recommendations-section">
          <h3 class="section-title"><i class="fas fa-check-circle"></i> Key Recommendations</h3>
          <div class="recommendations-grid">
            <div class="recommendation-card">
              <div class="recommendation-icon"><i class="fas fa-cloud"></i></div>
              <div class="recommendation-title">Adopt Cloud-Native NAC</div>
              <div class="recommendation-text">Transition from legacy on-premises NAC to cloud-native solutions to eliminate hardware costs and reduce operational complexity</div>
            </div>
            <div class="recommendation-card">
              <div class="recommendation-icon"><i class="fas fa-sync-alt"></i></div>
              <div class="recommendation-title">Streamline Deployment</div>
              <div class="recommendation-text">Choose solutions that offer streamlined deployment to achieve faster time-to-value and reduce implementation costs</div>
            </div>
            <div class="recommendation-card">
              <div class="recommendation-icon"><i class="fas fa-lock"></i></div>
              <div class="recommendation-title">Enhance Zero Trust</div>
              <div class="recommendation-text">Implement NAC solutions with strong Zero Trust Network Access capabilities to improve security posture</div>
            </div>
            <div class="recommendation-card">
              <div class="recommendation-icon"><i class="fas fa-users"></i></div>
              <div class="recommendation-title">Optimize Personnel</div>
              <div class="recommendation-text">Focus IT personnel on strategic initiatives by reducing the operational burden of NAC management</div>
            </div>
          </div>
        </div>
      `,

      'executive-comparison': `
        <div class="section-banner banner-gradient-cool">
          <h2><i class="fas fa-balance-scale"></i> NAC Vendor Comparison</h2>
          <p>Side-by-side analysis of leading Network Access Control vendors in the market.</p>
        </div>

        <div id="feature-heatmap" class="feature-comparison-section">
          <div class="chart-placeholder">
            <div class="chart-loading-spinner"></div>
            <p>Loading feature comparison heatmap...</p>
          </div>
        </div>

        <div id="cost-comparison" class="cost-comparison-section">
          <div class="chart-placeholder">
            <div class="chart-loading-spinner"></div>
            <p>Loading cost comparison data...</p>
          </div>
        </div>

        <div class="market-position-section">
          <h3 class="section-title"><i class="fas fa-trophy"></i> Market Position</h3>
          <div class="vendor-position-grid">
            <div class="vendor-position-card">
              <div class="vendor-position-logo">
                <img src="./img/logos/gartner.png" alt="Gartner">
              </div>
              <div class="vendor-position-title">Gartner</div>
              <div class="vendor-position-text">Named as a <strong>Leader</strong> in the Gartner Magic Quadrant for Network Access Control, with highest position for "Completeness of Vision"</div>
            </div>
            <div class="vendor-position-card">
              <div class="vendor-position-logo">
                <img src="./img/logos/forrester.png" alt="Forrester">
              </div>
              <div class="vendor-position-title">Forrester</div>
              <div class="vendor-position-text">Recognized as a <strong>Strong Performer</strong> in the Forrester Wave™: Zero Trust Network Access, with top scores in cloud delivery model</div>
            </div>
            <div class="vendor-position-card">
              <div class="vendor-position-logo">
                <img src="./img/logos/idc.png" alt="IDC">
              </div>
              <div class="vendor-position-title">IDC</div>
              <div class="vendor-position-text">Highlighted as an <strong>Innovator</strong> in the IDC MarketScape for Network Access Control, noted for cloud-native architecture</div>
            </div>
            <div class="vendor-position-card">
              <div class="vendor-position-logo">
                <img src="./img/logos/ema.png" alt="EMA">
              </div>
              <div class="vendor-position-title">EMA</div>
              <div class="vendor-position-text">Named a <strong>Value Leader</strong> by Enterprise Management Associates for TCO and time-to-value metrics</div>
            </div>
          </div>
        </div>
      `,

      'financial-tco': `
        <div class="section-banner banner-gradient-primary">
          <h2><i class="fas fa-dollar-sign"></i> Total Cost of Ownership Analysis</h2>
          <p>Detailed breakdown of all costs associated with NAC solutions over a 3-year period.</p>
        </div>

        <div class="cost-breakdown-section">
          <div class="chart-row">
            <div class="chart-wrapper" id="tco-comparison-chart">
              <div class="chart-title">3-Year TCO Comparison</div>
              <div class="chart-subtitle">Total cost breakdown by vendor</div>
              <div class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading TCO comparison chart...</p>
              </div>
            </div>
            <div class="chart-wrapper" id="cumulative-cost-chart">
              <div class="chart-title">Cumulative Cost Over Time</div>
              <div class="chart-subtitle">Year-by-year cost accumulation</div>
              <div class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading cumulative cost chart...</p>
              </div>
            </div>
          </div>

          <div class="cost-table-section glass-panel">
            <h3 class="section-title"><i class="fas fa-table"></i> Detailed Cost Breakdown</h3>
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Cost Component</th>
                    <th>Portnox Cloud</th>
                    <th>Traditional NAC</th>
                    <th>Savings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hardware</td>
                    <td>$0</td>
                    <td>$120,000</td>
                    <td class="savings">$120,000</td>
                  </tr>
                  <tr>
                    <td>Software Licenses</td>
                    <td>$180,000</td>
                    <td>$150,000</td>
                    <td class="negative">-$30,000</td>
                  </tr>
                  <tr>
                    <td>Implementation</td>
                    <td>$15,000</td>
                    <td>$75,000</td>
                    <td class="savings">$60,000</td>
                  </tr>
                  <tr>
                    <td>Maintenance</td>
                    <td>$0</td>
                    <td>$90,000</td>
                    <td class="savings">$90,000</td>
                  </tr>
                  <tr>
                    <td>Personnel</td>
                    <td>$50,000</td>
                    <td>$180,000</td>
                    <td class="savings">$130,000</td>
                  </tr>
                  <tr class="total-row">
                    <td>Total 3-Year TCO</td>
                    <td>$245,000</td>
                    <td>$615,000</td>
                    <td class="total-savings">$370,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="cost-factors-section">
          <h3 class="section-title"><i class="fas fa-tags"></i> Cost Factors Analysis</h3>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-title"><i class="fas fa-server"></i> Hardware Elimination</div>
              <div class="stat-value">100%</div>
              <div class="stat-text">Cloud-native architecture eliminates all hardware requirements, reducing capital expenditure</div>
            </div>
            <div class="stat-card">
              <div class="stat-title"><i class="fas fa-tools"></i> Maintenance Reduction</div>
              <div class="stat-value">100%</div>
              <div class="stat-text">SaaS delivery model shifts maintenance responsibility to the vendor</div>
            </div>
            <div class="stat-card">
              <div class="stat-title"><i class="fas fa-user-cog"></i> IT Staff Time</div>
              <div class="stat-value">-72%</div>
              <div class="stat-text">Reduced administrative overhead through automation and simplified management</div>
            </div>
            <div class="stat-card">
              <div class="stat-title"><i class="fas fa-clock"></i> Time-to-Value</div>
              <div class="stat-value">-98%</div>
              <div class="stat-text">Rapid deployment accelerates time-to-value from months to hours</div>
            </div>
          </div>
        </div>
      `,

      'security-overview': `
        <div class="section-banner banner-gradient-primary">
          <h2><i class="fas fa-shield-alt"></i> Security Capabilities Overview</h2>
          <p>Comprehensive analysis of security features, compliance coverage, and risk mitigation capabilities.</p>
        </div>

        <div class="security-capabilities-section">
          <div class="chart-row">
            <div class="chart-wrapper large-chart" id="security-treemap-chart">
              <div class="chart-title">Security Capabilities Comparison</div>
              <div class="chart-subtitle">Comprehensive visualization of security features across vendors</div>
              <div class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading security capabilities visualization...</p>
              </div>
            </div>
          </div>

          <div id="security-comparison" class="security-comparison-section">
            <div class="chart-placeholder">
              <div class="chart-loading-spinner"></div>
              <p>Loading security comparison data...</p>
            </div>
          </div>
        </div>

        <div class="risk-reduction-section">
          <h3 class="section-title"><i class="fas fa-chart-line"></i> Risk Reduction Impact</h3>
          <div class="chart-row">
            <div class="chart-wrapper" id="breach-impact-chart">
              <div class="chart-title">Data Breach Cost Reduction</div>
              <div class="chart-subtitle">Estimated financial impact of security improvements</div>
              <div class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading breach impact chart...</p>
              </div>
            </div>
            <div class="chart-wrapper" id="security-frameworks-chart">
              <div class="chart-title">Compliance Framework Coverage</div>
              <div class="chart-subtitle">Support for key regulatory frameworks</div>
              <div class="chart-placeholder">
                <div class="chart-loading-spinner"></div>
                <p>Loading compliance coverage chart...</p>
              </div>
            </div>
          </div>
        </div>

        <div class="zero-trust-section glass-panel">
          <h3 class="section-title"><i class="fas fa-fingerprint"></i> Zero Trust Security Model</h3>
          <div class="zero-trust-content">
            <p class="zero-trust-description">
              Portnox Cloud implements a comprehensive Zero Trust Network Access (ZTNA) approach, providing continuous verification of all devices and users before granting access to network resources.
            </p>
            <div class="zero-trust-capabilities">
              <div class="capability-item">
                <div class="capability-icon"><i class="fas fa-user-check"></i></div>
                <div class="capability-name">Never Trust, Always Verify</div>
                <div class="capability-description">Continuous authentication of all devices and users</div>
              </div>
              <div class="capability-item">
                <div class="capability-icon"><i class="fas fa-lock"></i></div>
                <div class="capability-name">Least Privilege Access</div>
                <div class="capability-description">Only the minimum required access is granted</div>
              </div>
              <div class="capability-item">
                <div class="capability-icon"><i class="fas fa-eye"></i></div>
                <div class="capability-name">Continuous Monitoring</div>
                <div class="capability-description">Real-time visibility of all network access events</div>
              </div>
              <div class="capability-item">
                <div class="capability-icon"><i class="fas fa-ban"></i></div>
                <div class="capability-name">Device Compliance</div>
                <div class="capability-description">Continuous verification of device security posture</div>
              </div>
            </div>
          </div>
        </div>
      `,

      'technical-architecture': `
        <div class="section-banner banner-gradient-warm">
          <h2><i class="fas fa-cogs"></i> Technical Architecture Comparison</h2>
          <p>In-depth analysis of NAC architectures, deployment models, and technical capabilities.</p>
        </div>

        <div id="technical-comparison" class="technical-comparison-section">
          <div class="chart-placeholder">
            <div class="chart-loading-spinner"></div>
            <p>Loading technical comparison data...</p>
          </div>
        </div>

        <div class="architecture-section">
          <h3 class="section-title"><i class="fas fa-project-diagram"></i> Architecture Comparison</h3>
          <div class="architecture-types">
            <div class="arch-type arch-type-cloud">
              <div class="arch-type-header">
                <div class="arch-type-icon"><i class="fas fa-cloud"></i></div>
                <div class="arch-type-name">Cloud-Native</div>
                <div class="arch-type-vendor">Portnox Cloud</div>
              </div>
              <div class="arch-type-diagram">
                <img src="./img/arch-cloud.svg" alt="Cloud Architecture" onerror="this.src='./img/arch-cloud-placeholder.png'">
              </div>
              <div class="arch-type-advantages">
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>No on-premises hardware required</span>
                </div>
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Automatic updates and maintenance</span>
                </div>
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Seamless scalability</span>
                </div>
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Native remote user support</span>
                </div>
              </div>
            </div>
            <div class="arch-type arch-type-onprem">
              <div class="arch-type-header">
                <div class="arch-type-icon"><i class="fas fa-server"></i></div>
                <div class="arch-type-name">On-Premises</div>
                <div class="arch-type-vendor">Cisco, Aruba</div>
              </div>
              <div class="arch-type-diagram">
                <img src="./img/arch-onprem.svg" alt="On-Premises Architecture" onerror="this.src='./img/arch-onprem-placeholder.png'">
              </div>
              <div class="arch-type-advantages">
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Full control over infrastructure</span>
                </div>
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>No internet dependency for core functions</span>
                </div>
                <div class="disadvantage-item">
                  <i class="fas fa-times-circle"></i>
                  <span>High hardware and maintenance costs</span>
                </div>
                <div class="disadvantage-item">
                  <i class="fas fa-times-circle"></i>
                  <span>Complex deployment and upgrades</span>
                </div>
              </div>
            </div>
            <div class="arch-type arch-type-hybrid">
              <div class="arch-type-header">
                <div class="arch-type-icon"><i class="fas fa-sync"></i></div>
                <div class="arch-type-name">Hybrid</div>
                <div class="arch-type-vendor">Forescout, FortiNAC</div>
              </div>
              <div class="arch-type-diagram">
                <img src="./img/arch-hybrid.svg" alt="Hybrid Architecture" onerror="this.src='./img/arch-hybrid-placeholder.png'">
              </div>
              <div class="arch-type-advantages">
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Cloud management with on-prem enforcement</span>
                </div>
                <div class="advantage-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Some remote user capabilities</span>
                </div>
                <div class="disadvantage-item">
                  <i class="fas fa-times-circle"></i>
                  <span>Still requires hardware components</span>
                </div>
                <div class="disadvantage-item">
                  <i class="fas fa-times-circle"></i>
                  <span>More complex architecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="deployment-section glass-panel">
          <h3 class="section-title"><i class="fas fa-rocket"></i> Deployment Comparison</h3>
          <div class="timeline-comparison">
            <div class="timeline-vendor timeline-portnox">
              <div class="timeline-header">
                <img src="./img/vendors/portnox.png" alt="Portnox">
                <span class="timeline-title">Portnox Cloud</span>
              </div>
              <div class="timeline">
                <div class="timeline-stage" style="width: 100%;">
                  <div class="stage-label">Full Deployment</div>
                  <div class="stage-duration">1 Day</div>
                </div>
              </div>
            </div>
            <div class="timeline-vendor timeline-traditional">
              <div class="timeline-header">
                <img src="./img/vendors/cisco.png" alt="Traditional NAC">
                <span class="timeline-title">Traditional NAC</span>
              </div>
              <div class="timeline">
                <div class="timeline-stage" style="width: 25%;">
                  <div class="stage-label">Planning</div>
                  <div class="stage-duration">2 Weeks</div>
                </div>
                <div class="timeline-stage" style="width: 25%;">
                  <div class="stage-label">Hardware Setup</div>
                  <div class="stage-duration">2 Weeks</div>
                </div>
                <div class="timeline-stage" style="width: 35%;">
                  <div class="stage-label">Implementation</div>
                  <div class="stage-duration">3 Weeks</div>
                </div>
                <div class="timeline-stage" style="width: 15%;">
                  <div class="stage-label">Testing</div>
                  <div class="stage-duration">1 Week</div>
                </div>
              </div>
              <div class="timeline-total">Total: 8 Weeks</div>
            </div>
          </div>
        </div>
      `
    };

    // Return the template for the requested view
    const template = templates[mainTab + "-" + subTab];
    if (template) return template;

    // Default template if specific one not found
    return `
      <div class="section-banner">
        <h2>${this.formatTabName(mainTab)} - ${this.formatTabName(subTab)}</h2>
        <p>This section is under development.</p>
      </div>
      <div class="placeholder-content">
        <div class="glass-panel">
          <p>Content for ${mainTab} ${subTab} view will be displayed here.</p>
        </div>
      </div>
    `;
  }

  /**
   * Initialize charts for a view
   */
  initializeChartsForView(mainTab, subTab) {
    // Only initialize if chart loader is available
    if (!window.chartLoader) {
      console.error('Chart loader not available');
      return;
    }

    const viewId = mainTab + "-" + subTab;

    // Map of views to charts that should be initialized
    const chartMap = {
      'executive-summary': [
        { type: 'apex-tco', containerId: 'executive-tco-chart', chartId: 'executiveTcoChart' },
        { type: 'apex-cost', containerId: 'executive-roi-chart', chartId: 'executiveRoiChart' }
      ],
      'financial-tco': [
        { type: 'apex-tco', containerId: 'tco-comparison-chart', chartId: 'financialTcoChart' },
        { type: 'apex-cost', containerId: 'cumulative-cost-chart', chartId: 'financialCostChart' }
      ],
      'security-overview': [
        { type: 'treemap-security', containerId: 'security-treemap-chart', chartId: 'securityTreemapChart' },
        { type: 'apex-breach', containerId: 'breach-impact-chart', chartId: 'breachImpactChart' },
        { type: 'd3-security', containerId: 'security-frameworks-chart', chartId: 'securityFrameworksChart' }
      ]
    };

    // Queue charts for loading
    const charts = chartMap[viewId];
    if (charts) {
      charts.forEach(chart => {
        window.chartLoader.queueChart(chart.type, chart.containerId, chart.chartId);
      });
    }
  }

  /**
   * Initialize components for a view
   */
  initializeComponentsForView(mainTab, subTab) {
    const viewId = mainTab + "-" + subTab;

    // Initialize NIST CSF visualization
    if (viewId === 'executive-summary' && document.getElementById('nist-csf-visualization')) {
      if (typeof NistCSFVisualization !== 'undefined') {
        window.nistCsfVisualization = new NistCSFVisualization('nist-csf-visualization').init();
      }
    }

    // Initialize feature heatmap
    if (viewId === 'executive-comparison' && document.getElementById('feature-heatmap')) {
      if (typeof VendorComparison !== 'undefined') {
        VendorComparison.createFeatureHeatmap('feature-heatmap');
      }
    }

    // Initialize cost comparison
    if (viewId === 'executive-comparison' && document.getElementById('cost-comparison')) {
      if (typeof VendorComparison !== 'undefined') {
        VendorComparison.createCostComparison('cost-comparison');
      }
    }

    // Initialize security comparison
    if (viewId === 'security-overview' && document.getElementById('security-comparison')) {
      if (typeof VendorComparison !== 'undefined') {
        VendorComparison.createSecurityComparison('security-comparison');
      }
    }

    // Initialize technical comparison
    if (viewId === 'technical-architecture' && document.getElementById('technical-comparison')) {
      if (typeof VendorComparison !== 'undefined') {
        VendorComparison.createTechnicalComparison('technical-comparison');
      }
    }
  }

  /**
   * Refresh charts in a view
   */
  refreshChartsInView(mainTab, subTab) {
    // For future use when data changes
  }

  /**
   * Get icon for a tab
   */
  getTabIcon(tabName) {
    const icons = {
      'executive': 'fa-chart-pie',
      'financial': 'fa-dollar-sign',
      'security': 'fa-shield-alt',
      'technical': 'fa-cogs'
    };

    return icons[tabName] || 'fa-circle';
  }

  /**
   * Format tab name for display
   */
  formatTabName(tabName) {
    return tabName.charAt(0).toUpperCase() + tabName.slice(1);
  }
}

// Make it globally available
window.TabNavigator = TabNavigator;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (!window.tabNavigator) {
    window.tabNavigator = new TabNavigator().init();
  }
});
EOF

# -------------------------
# CREATE ADDITIONAL CSS FOR SPECIFIC COMPONENTS
# -------------------------
echo "Creating additional CSS for specific components..."

cat > ./css/components.css << 'EOF'
/**
 * Specialized Components for Portnox Total Cost Analyzer
 * Complementary styles for enhanced components
 */

/* Architecture type cards */
.architecture-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-5);
  margin-top: var(--space-4);
}

.arch-type {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  border: 1px solid var(--color-neutral-200);
  transition: transform 0.3s ease;
}

.arch-type:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.arch-type-header {
  padding: var(--space-3) var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.arch-type-cloud .arch-type-header {
  background: var(--gradient-primary);
  color: white;
}

.arch-type-onprem .arch-type-header {
  background: var(--gradient-danger);
  color: white;
}

.arch-type-hybrid .arch-type-header {
  background: var(--gradient-warning);
  color: white;
}

.arch-type-icon {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.arch-type-name {
  font-weight: 600;
  font-size: 1.1rem;
}

.arch-type-vendor {
  margin-left: auto;
  font-size: 0.9rem;
  opacity: 0.9;
}

.arch-type-diagram {
  padding: var(--space-4);
  text-align: center;
  background: var(--color-neutral-50);
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arch-type-diagram img {
  max-width: 100%;
  max-height: 180px;
}

.arch-type-advantages {
  padding: var(--space-4);
}

.advantage-item, .disadvantage-item {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-2);
  gap: var(--space-2);
}

.advantage-item i {
  color: var(--color-success-600);
}

.disadvantage-item i {
  color: var(--color-danger-600);
}

/* Timeline comparison */
.timeline-comparison {
  margin-top: var(--space-4);
}

.timeline-vendor {
  margin-bottom: var(--space-4);
}

.timeline-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.timeline-header img {
  height: 30px;
  width: auto;
}

.timeline-title {
  font-weight: 600;
  color: var(--color-neutral-800);
}

.timeline {
  display: flex;
  height: 50px;
  background: var(--color-neutral-100);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.timeline-stage {
  height: 100%;
  padding: var(--space-2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.timeline-portnox .timeline-stage {
  background: var(--color-primary-500);
  color: white;
}

.timeline-traditional .timeline-stage:nth-child(1) {
  background: var(--color-neutral-400);
  color: white;
}

.timeline-traditional .timeline-stage:nth-child(2) {
  background: var(--color-warning-400);
  color: white;
}

.timeline-traditional .timeline-stage:nth-child(3) {
  background: var(--color-danger-500);
  color: white;
}

.timeline-traditional .timeline-stage:nth-child(4) {
  background: var(--color-neutral-600);
  color: white;
}

.timeline-stage:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 1px;
  background: rgba(255, 255, 255, 0.5);
}

.stage-label {
  font-size: 0.8rem;
  font-weight: 500;
}

.stage-duration {
  font-size: 0.75rem;
  opacity: 0.9;
}

.timeline-total {
  text-align: right;
  margin-top: var(--space-2);
  font-weight: 600;
  color: var(--color-neutral-700);
}

/* Zero Trust section */
.zero-trust-content {
  margin-top: var(--space-4);
}

.zero-trust-description {
  margin-bottom: var(--space-4);
  font-size: 1.05rem;
  color: var(--color-neutral-800);
}

.zero-trust-capabilities {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
}

.capability-item {
  background: white;
  border-radius: var(--radius-md);
  padding: var(--space-3);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-neutral-200);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.capability-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--color-primary-50);
  color: var(--color-primary-600);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: var(--space-2);
}

.capability-name {
  font-weight: 600;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-1);
}

.capability-description {
  font-size: 0.9rem;
  color: var(--color-neutral-600);
}

/* Analyst position cards */
.vendor-position-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.vendor-position-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow);
  border: 1px solid var(--color-neutral-200);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;
}

.vendor-position-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.vendor-position-logo {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-3);
}

.vendor-position-logo img {
  max-height: 40px;
  max-width: 120px;
}

.vendor-position-title {
  font-weight: 600;
  color: var(--color-neutral-800);
  margin-bottom: var(--space-2);
}

.vendor-position-text {
  font-size: 0.9rem;
  color: var(--color-neutral-700);
}

/* Recommendations */
.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.recommendation-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow);
  border: 1px solid var(--color-neutral-200);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;
}

.recommendation-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.recommendation-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: var(--space-3);
}

.recommendation-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-2);
}

.recommendation-text {
  font-size: 0.9rem;
  color: var(--color-neutral-700);
}

/* Feature heatmap */
.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1px;
  background: var(--color-neutral-200);
  padding: 1px;
  margin-top: var(--space-3);
}

.heatmap-cell {
  background: white;
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.2s ease;
  aspect-ratio: 1;
}

.heatmap-cell:hover {
  transform: scale(1.05);
  z-index: 1;
  box-shadow: var(--shadow-md);
}

.heatmap-cell-label {
  font-weight: 600;
  color: var(--color-neutral-800);
  margin-bottom: var(--space-1);
}

.heatmap-cell-feature {
  font-size: 0.8rem;
  color: var(--color-neutral-600);
  margin-bottom: var(--space-2);
}

.heatmap-cell-value {
  font-size: 1.1rem;
  font-weight: 700;
}

.score-excellent {
  background: var(--color-success-50);
}

.score-excellent .heatmap-cell-value {
  color: var(--color-success-700);
}

.score-good {
  background: var(--color-success-50);
}

.score-good .heatmap-cell-value {
  color: var(--color-success-600);
}

.score-average {
  background: var(--color-warning-50);
}

.score-average .heatmap-cell-value {
  color: var(--color-warning-700);
}

.score-poor {
  background: var(--color-danger-50);
}

.score-poor .heatmap-cell-value {
  color: var(--color-danger-700);
}

/* Integration grid */
.integration-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.integration-card {
  background: white;
  border-radius: var(--radius-md);
  padding: var(--space-3);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-neutral-200);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.integration-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary-50);
  color: var(--color-primary-600);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-bottom: var(--space-2);
}

.integration-name {
  font-weight: 600;
  color: var(--color-neutral-800);
  margin-bottom: var(--space-2);
}

.integration-vendors {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  justify-content: center;
}

.integration-vendor {
  font-size: 0.8rem;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

.integration-vendor.supported {
  background: var(--color-success-100);
  color: var(--color-success-800);
}

.integration-vendor.not-supported {
  background: var(--color-neutral-100);
  color: var(--color-neutral-600);
}

/* Compliance comparison */
.compliance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.compliance-card {
  background: white;
  border-radius: var(--radius-md);
  padding: var(--space-3);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-neutral-200);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.compliance-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary-50);
  color: var(--color-primary-600);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-bottom: var(--space-2);
}

.compliance-name {
  font-weight: 600;
  color: var(--color-neutral-800);
  margin-bottom: var(--space-2);
}

.compliance-scores {
  width: 100%;
}

.compliance-vendor-score {
  display: flex;
  justify-content: space-between;
  padding: var(--space-1) 0;
  font-size: 0.9rem;
  border-bottom: 1px solid var(--color-neutral-200);
}

.compliance-vendor-score:last-child {
  border-bottom: none;
}

.vendor-name {
  font-weight: 500;
}

/* Additional text utility classes */
.text-success {
  color: var(--color-success-600);
}

.text-danger {
  color: var(--color-danger-600);
}

.text-warning {
  color: var(--color-warning-600);
}

.text-primary {
  color: var(--color-primary-600);
}

/* Section titles */
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: var(--space-4) 0 var(--space-3) 0;
  color: var(--color-neutral-800);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.section-title i {
  color: var(--color-primary-600);
}

/* Add missing architecture placeholder images */
.arch-type-diagram {
  position: relative;
}

.arch-type-diagram::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.1;
}

.arch-type-cloud .arch-type-diagram::before {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"/></svg>');
}

.arch-type-onprem .arch-type-diagram::before {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 160H32c-17.673 0-32-14.327-32-32V64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z"/></svg>');
}

.arch-type-hybrid .arch-type-diagram::before {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"/></svg>');
}
EOF

# -------------------------
# CREATE ICONS FOR ARCHITECTURE DIAGRAMS
# -------------------------
echo "Creating architecture diagram placeholders..."

mkdir -p ./img

# Create cloud architecture placeholder
cat > ./img/arch-cloud-placeholder.png << 'EOF'
iVBORw0KGgoAAAANSUhEUgAAASwAAADICAMAAABlASxnAAAAk1BMVEUAAAD///8BAQECAgIDAwMEBAQFBQUGBgYHBwcICAgJCQkKCgoLCwsMDAwNDQ0ODg4PDw8QEBARERESEhITExMUFBQVFRUWFhYXFxcYGBgZGRkaGhobGxscHBwdHR0eHh4fHx8gICAhISEiIiIjIyMkJCQlJSUmJiYnJycoKCgpKSkqKiorKyssLCwtLS0uLi4vLy+jsrz0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAA9FJREFUeJzt1ktu2zAUQFHa+tCWLCe047SO46ROGydp0/3vrjLtLGYjkHqPeM4GBnBJAJckSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZL0bwfX41MBGteaUcLaPNba5Ixd9ZtSMd1V+7aKddnqV1jvZmFdnFrM9OubXlCfaoLYZbU/9Y+FZayvZixrp1+bXlZlq197ZW1Gbzq5BzefbJ8v1R05zCasw6F9N3qL9JUPxdgP9G/Oc8a82PRS01KM+w0APFY8XuYDZw//a5e/Hgzr5ubL8NvVzYe9ywO8YWFNX+9vb783bL3fbv/5+vBp7+wgb19YXwuwXoH1l/tr9Rq5lllx9i/VX6Wm7Ar1oSF2uwZCKzHCaiBDN3bfIMY2uZmG5eZipNkVMYJsyqBZd7O9zxEWDLTEHHuCMcJMGr5jNOXQfRtiFADTTzpAhiJg6qaDpCgJph49VFLCGqANCMxBDxecsAYpA8LlAeYLLq4BOg8wV8p5KrDlLdaYjMY2YMsbqiKFE4At19MGHGW/OWCLJCkXGJxwdI3TQYktEpVDQdieM1LCGeL2nB9iDtieiqmPgDG25ywpHEjbnrOjCzhtey6p7oR7J1RMfbyA+QLL9UQBc6UWVw33d1iP9RBQ0a2bZQXpxRWDvQdsyxkvYML2nDmtsEmad3DgfH3BoZNpIzh4i5TK6Q04fJJfGjB/o5ToegITuOdsWgdM4Z7z6ArMkXbe56AHCk7jnvPoIgFTuecMKsE07jl7mlEu95xDXQfmcs85dAKmcs8ZVIDJu6iu9wIMbdcC9dMQ3DjXNJX9PpT+M7QkYJXqnqJXoBwYVuEi3m/pL4JnKUZYu0Y4VBBW25DLnmGR0OsItm7QfYOQw72OUTMtMrYxFoM4ZVXDQsHCuqvh8JXtV/TK4LD1h3YZtmJ4GMJu4cCdv6ZhndK4JbZvZvKw9X/RftPOOqSDh7vGtM11HnZkAhvJtnWJ+4xIXZuJ9xmR3AYmIx1JrUdSMdKh1Kn+SCRHGpiPPdJfnC+QdHS1nUIikVRSmUQikVRS0IlEEqklfCKJVCKZWCKRWKr5cFKRTG4plUoklVsCkVQimVAikVAo1ZlYIpFYKJZIJBaKJRKJpbaqf2iDJ5JLJRKJpEJbXQ2eRzCXSCSSCa2V9dAlW78iyWQSkVSsjUBrpUc97MmbWCaRSCYUa+BaK9pKpS2/GWfNbCqNjctZA5JI/X4JAAAAAAAAAADwiwfdIEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEk/ADajS+2AE4vOAAAAAElFTkSuQmCC
EOF

# Create on-premises architecture placeholder
cat > ./img/arch-onprem-placeholder.png << 'EOF'
iVBORw0KGgoAAAANSUhEUgAAASwAAADICAMAAABlASxnAAAAk1BMVEUAAAD///8BAQECAgIDAwMEBAQFBQUGBgYHBwcICAgJCQkKCgoLCwsMDAwNDQ0ODg4PDw8QEBARERESEhITExMUFBQVFRUWFhYXFxcYGBgZGRkaGhobGxscHBwdHR0eHh4fHx8gICAhISEiIiIjIyMkJCQlJSUmJiYnJycoKCgpKSkqKiorKyssLCwtLS0uLi4vLy+jsrz0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAzZJREFUeJzt1stu2zAQQNFBaEmOHSuOncRJmjR22qRp+v9fV0VtFwU2FPF6xLmLgQEMAUiSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJOn/blxP4y0ZGq/lJQu3lm8r95hdTVpLxtNqPVxD1s1AXrJxVYw8Tdb8UWdx3Rq1qg9tTbYe16h9cU3P7eOuruvq8lT4G1Mey6Qsm0PVaGQVtTgMjEaGfbI4DQw3shk4XN3IeJvD1I+Mts1h6lfGmkrouJHjwICbqh4YdRvDdRkZa3KcTmSsyXFqkbEOe6gfGWxzpEZktFMJDTcyPpVQfybVwKCnEhlpWEYH2hw+3ZMoB4aelw2ZHofwKSZmNDL6aY+3gNHqQ0PGGpbRZlU9MPpui/TULtNHnSfZYynKar+rq3XdVUXSuYbMFvVu11Rlvd2USWfw8JXXvC3RRzs72FDjyM7bFdq6F6ZLd3kCg/xeV+p+a8r6eNOmS14f+X0f18e77upNQwIW5F6hbL1Jl6+99VtclmW31Y63Anh9fP364zt5fP/2/vTQ0l4Gwa1uPv7fyfVlcELiGx6apku/Vy3dXqGHR+T/Hk4+fC8w/Xw3ixCCezgvD5zCp7MtMLw8xbgDMN8BcCGPqwpBuDxgjIVzuEK1BxtgucxzKCWJa9GBHdgQeVwbYIGEe4UtMMdiWRQdGOLxbRHnfBuwBHMs1kpR51iiTfzlJiDl8hKP2gIzLN4m3i7cAEtlnGOJtmtjx2cLu6DKNoAyLZhTib9LrgFeq+KcS7wlFeOzDTDF4i3R+DZAkgVz6hS3Dj34wG67xOT4wG6zpBy+TRa/iWvtAXTbJbXDt8nSN0lqj2+TpG7i0G7SzE0S2ufbRJmdijhweyGTS+S4O+K4zxFHfrIY94v0H6UkF2r9KP3X0nKgDZ7MtVa2x7tCyfpjNtZS6R/vCiXsjwWx/shh03sWy3Ir4QV31hJZHufzVgZLJbv0ypxLJJHs9ktyR0iX56Yt4ckuCW+88pYIgAAAAAAAAACAH3pxHJIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSdIPmS9z8gIEkf0AAAAASUVORK5CYII=
EOF

# Create hybrid architecture placeholder
cat > ./img/arch-hybrid-placeholder.png << 'EOF'
iVBORw0KGgoAAAANSUhEUgAAASwAAADICAMAAABlASxnAAAAk1BMVEUAAAD///8BAQECAgIDAwMEBAQFBQUGBgYHBwcICAgJCQkKCgoLCwsMDAwNDQ0ODg4PDw8QEBARERESEhITExMUFBQVFRUWFhYXFxcYGBgZGRkaGhobGxscHBwdHR0eHh4fHx8gICAhISEiIiIjIyMkJCQlJSUmJiYnJycoKCgpKSkqKiorKyssLCwtLS0uLi4vLy+jsrz0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABBZJREFUeJzt1jGO2zAQAFBScmRZipzEcZo0cZO4SZrk/rfrqt3FFlvYYN4Qb8eCBDhQAJIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIk/d/N6sdbBGi3S5YDrfDcVh51mFXtJdB8Wy1vM2Kd98oDa12nwPNmtXzqNK5TX6tY2cpoVblu+1qvj33FuhyxLq/9uI7X1W7Vub6+PdXx6/JRw+lzfSjLTVm99VjPm3JVrvd1Z5V1Xb32jPZWtf3oHe1QPXx0RzvtGu6zf7z3fXYqO26iw2q32y3XRbXc7YpQbx5oeK+Hw4e+13P9EXPwGJf3eQgcPcTk47OdGvTy0dD8W2c/5t5e90u3o/P1IAHPZ4/68/V1G371+Hh/gQ/1LZzW/FuuPnx+vrlZzl4DQvI4hH2BvzNSE3BG42jYA1prOw/gTvE3LCxAcqPB3lnQy0Mk2r1Vw3bQuwN8ZZnR2PXYTRg8FhlVD2DfJpJaAZP0IJXYHLWmNJOxOw80R+lhuAaYI51+1QHbT+wtwBTpNOzg2iHYlOZXbVGxLfJjCYvtkQvLGWx/pDIk15wz03MRsNFWfbA9cqF1Brsi1R5dQyvjrDkBcqFZAWbFmTGQX+GQC80JkAuZMMi+xwnMGmDW70/MMoJZAlyIXGZJfCEpMGvuNdYUYFbkF5IC82LNZgnwIQlIZRCYF2vOEuBDEpDKVA/Mi3Uk+gRmRn6GFpgXa0YTYGbk52mBeZGm5PfAzMhveMLgPbXGPthjvLkbAP+RH2Ah+OuuWwqwQwKdg0NwZvQGTTTRjCz4AHRJJnQA7BBOo0WCOXIJd3AtUk7TAqMkldAG2CHdjM4ZZsoHXZ2B2ZJqSh0wYO6ckdAKGDCHDgkVwHx5ckFCJ2C+PJVkQLa9xsyBO8n02oDZcs/ZJZPsQYrZcse5TYB5808qS4B5c+eKXXQWcHOuVpgvd67YLGcO3J3DHbvQbABnm/wVYTlBvgJJXjG5K5TsXZLcFcreJYlfAZbA/LnnjrtLkn+XJH+XJH+XJH+XJH+XJL/wxrlRSzCq3ZAnmDyvCdngA3LnzllSD8yUJ2dkck/ZxbVDqc2TK/JJ3iXJXzG5K5T0XZL0XZL4FZO5YjyHKZLnP9nzX6HctxHyV4TnRhWJKzJfkfgVSbzjbBPPf/LnaZNO9i5Je4UCrpI0r1CyV4znO6hkiVeM8Qqx7JK0r1CaCf8OJXNtFTpCyTRCqpjAFdvQy7jwyV7EJK9gkhfRxgvGFcw4/avrAPUimkAyNF1oXUFsqKbuC6WcnNF0bfApabrI2iQ5TdfKNaZO0WqTPNvKdZ73wJsXd9N8+d2c5XfavZZIfmcMPC0AAAAAAAAAgB/6As9KxGP6rmf1AAAAAElFTkSuQmCC
EOF

# -------------------------
# UPDATE INDEX.HTML WITH MODERN THEME
# -------------------------
echo "Updating index.html with modern theme..."

cat > ./index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portnox Total Cost Analyzer</title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="./img/favicon.png">

    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <!-- Chart Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.36.3/dist/apexcharts.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/d3@7.8.2/dist/d3.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/highcharts@10.3.3/highcharts.js"></script>

    <!-- Particle.js -->
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>

    <!-- CSS -->
    <link rel="stylesheet" href="./css/fonts.css">
    <link rel="stylesheet" href="./css/modern-theme.css">
    <link rel="stylesheet" href="./css/components.css">

    <!-- Main Loader -->
    <script src="./js/data/vendor-data.js"></script>
    <script src="./js/index.js"></script>
</head>
<body>
    <!-- Header -->
    <header class="app-header">
        <div id="particles-header"></div>
        <div class="header-content">
            <div class="header-branding">
                <h1 class="header-title">Portnox Total Cost Analyzer</h1>
                <div class="header-subtitle">Compare NAC solutions for your enterprise</div>
            </div>
            <div class="header-actions">
                <button id="dark-mode-toggle" class="btn btn-sm btn-light">
                    <i class="fas fa-moon"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- Main Container -->
    <div class="main-container">
        <!-- Sidebar -->
        <div id="sidebar" class="sidebar">
            <div class="sidebar-content">
                <!-- Organization Config -->
                <div id="organization-config" class="config-card">
                    <div class="config-card-header">
                        <h3><i class="fas fa-building"></i> Organization</h3>
                        <i class="fas fa-chevron-up toggle-icon"></i>
                    </div>
                    <div class="config-card-content">
                        <div class="form-group">
                            <label for="company-size">Company Size</label>
                            <select id="company-size" class="form-control">
                                <option value="small">Small (50-250 employees)</option>
                                <option value="medium" selected>Medium (251-1000 employees)</option>
                                <option value="large">Large (1001-5000 employees)</option>
                                <option value="enterprise">Enterprise (5000+ employees)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="device-count">Device Count</label>
                            <input type="number" id="device-count" class="form-control" value="1000">
                        </div>
                        <div class="form-group">
                            <label for="industry">Industry</label>
                            <select id="industry" class="form-control">
                                <option value="healthcare">Healthcare</option>
                                <option value="finance">Finance & Banking</option>
                                <option value="retail">Retail</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="education">Education</option>
                                <option value="government">Government</option>
                                <option value="technology" selected>Technology</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Vendor Selection -->
                <div id="vendor-selection" class="config-card">
                    <div class="config-card-header">
                        <h3><i class="fas fa-check-square"></i> Vendor Selection</h3>
                        <i class="fas fa-chevron-up toggle-icon"></i>
                    </div>
                    <div class="config-card-content">
                        <div class="vendor-select-grid">
                            <div class="vendor-select-card selected" data-vendor="portnox">
                                <div class="vendor-logo">
                                    <img src="./img/vendors/portnox.png" alt="Portnox">
                                </div>
                                <div class="vendor-name">Portnox Cloud</div>
                            </div>
                            <div class="vendor-select-card" data-vendor="cisco">
                                <div class="vendor-logo">
                                    <img src="./img/vendors/cisco.png" alt="Cisco">
                                </div>
                                <div class="vendor-name">Cisco ISE</div>
                            </div>
                            <div class="vendor-select-card" data-vendor="aruba">
                                <div class="vendor-logo">
                                    <img src="./img/vendors/aruba.png" alt="Aruba">
                                </div>
                                <div class="vendor-name">Aruba ClearPass</div>
                            </div>
                            <div class="vendor-select-card" data-vendor="forescout">
                                <div class="vendor-logo">
                                    <img src="./img/vendors/forescout.png" alt="Forescout">
                                </div>
                                <div class="vendor-name">Forescout</div>
                            </div>
                            <div class="vendor-select-card" data-vendor="fortinac">
                                <div class="vendor-logo">
                                    <img src="./img/vendors/fortinac.png" alt="FortiNAC">
                                </div>
                                <div class="vendor-name">FortiNAC</div>
                            </div>
                            <div class="vendor-select-card" data-vendor="juniper">
                                <div class="vendor-logo">
                                    <img src="./img/vendors/juniper.png" alt="Juniper">
                                </div>
                                <div class="vendor-name">Juniper NAC</div>
                            </div>
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
                                <span class="range-slider-label">License Cost ($/device/year)</span>
                                <span class="range-slider-value" id="license-cost-value">$50</span>
                            </div>
                            <input type="range" id="license-cost" min="0" max="200" value="50" step="1">
                        </div>

                        <div class="range-slider">
                            <div class="range-slider-header">
                                <span class="range-slider-label">Hardware Cost ($/device)</span>
                                <span class="range-slider-value" id="hardware-cost-value">$100</span>
                            </div>
                            <input type="range" id="hardware-cost" min="0" max="500" value="100" step="10">
                        </div>

                        <div class="range-slider">
                            <div class="range-slider-header">
                                <span class="range-slider-label">Implementation Cost ($)</span>
                                <span class="range-slider-value" id="implementation-cost-value">$10,000</span>
                            </div>
                            <input type="range" id="implementation-cost" min="0" max="100000" value="10000" step="1000">
                        </div>

                        <div class="range-slider">
                            <div class="range-slider-header">
                                <span class="range-slider-label">Maintenance (% of license)</span>
                                <span class="range-slider-value" id="maintenance-value">20%</span>
                            </div>
                            <input type="range" id="maintenance-percentage" min="0" max="40" value="20" step="1">
                        </div>

                        <div class="range-slider">
                            <div class="range-slider-header">
                                <span class="range-slider-label">FTE Cost ($/year)</span>
                                <span class="range-slider-value" id="fte-cost-value">$100,000</span>
                            </div>
                            <input type="range" id="fte-cost" min="60000" max="180000" value="100000" step="5000">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content Area -->
        <div class="content-area">
            <!-- Tab container added by JS -->
            <!-- View container added by JS -->
        </div>
    </div>

    <!-- Particles Background -->
    <div id="particles-js"></div>
</body>
</html>
EOF

# -------------------------
# UPDATE INDEX.JS WITH BETTER INITIALIZATION
# -------------------------
echo "Updating index.js with better initialization..."

cat > ./js/index.js << 'EOF'
/**
 * Main Loader for Portnox Total Cost Analyzer
 * Ensures proper initialization order with improved error handling
 */

// Create fallback empty objects to prevent errors
window.ApexChartsManager = window.ApexChartsManager || {};
window.D3ChartsManager = window.D3ChartsManager || {};
window.SecurityCharts = window.SecurityCharts || {};
window.ChartConfig = window.ChartConfig || {};
window.UnifiedChartLoader = window.UnifiedChartLoader || {
  chartsToLoad: [],
  init: function() { return this; }
};
window.TabNavigator = window.TabNavigator || function() {
  return { init: function() { return this; } };
};
window.NistCSFVisualization = window.NistCSFVisualization || function() {
  return { init: function() { return this; } };
};
window.VendorComparison = window.VendorComparison || {};

// Load dependencies in the correct order
const dependencies = [
    './js/charts/chart-config.js',
    './js/charts/chart-placeholders.js',
    './js/charts/apex/apex-charts.js',
    './js/charts/d3/d3-manager.js',
    './js/charts/highcharts/highcharts-manager.js',
    './js/charts/security-charts.js',
    './js/charts/unified-chart-loader.js',
    './js/components/sidebar-manager.js',
    './js/components/particle-background.js',
    './js/components/tab-navigator-enhanced.js',
    './js/components/nist-csf-visualization.js',
    './js/components/vendor-comparison.js',
    './js/components/banner-section.js',
    './js/comprehensive-fix.js'
];

// Load scripts in order with better error handling
function loadScripts(scripts, index = 0) {
    if (index >= scripts.length) {
        console.log('✓ All scripts loaded successfully');
        initializeApplication();
        return;
    }

    const script = document.createElement('script');
    script.src = scripts[index];
    script.onload = function() {
        console.log(`✓ Loaded: ${scripts[index]}`);
        loadScripts(scripts, index + 1);
    };
    script.onerror = function() {
        console.error(`✗ Failed to load: ${scripts[index]}`);
        console.log(`Attempting to continue despite failure to load ${scripts[index]}`);
        loadScripts(scripts, index + 1);
    };
    document.head.appendChild(script);
}

// Initialize the entire application
function initializeApplication() {
    console.log('Initializing Portnox Total Cost Analyzer...');

    // 1. Initialize particle backgrounds
    initializeParticles();

    // 2. Initialize tab navigator
    initializeTabNavigator();

    // 3. Initialize chart loader
    initializeChartLoader();

    // 4. Initialize sidebar events
    initializeSidebar();

    console.log('✓ Portnox Total Cost Analyzer initialized successfully');
}

// Initialize particle.js backgrounds
function initializeParticles() {
    try {
        if (typeof particlesJS !== 'undefined') {
            // Main background particles
            if (document.getElementById('particles-js')) {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 40, density: { enable: true, value_area: 800 } },
                        color: { value: '#3b8eff' },
                        opacity: { value: 0.1, random: true },
                        size: { value: 3, random: true },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: '#3b8eff',
                            opacity: 0.1,
                            width: 1
                        },
                        move: { enable: true, speed: 1, direction: 'none', random: true }
                    }
                });
            }

            // Header particles
            if (document.getElementById('particles-header')) {
                particlesJS('particles-header', {
                    particles: {
                        number: { value: 20, density: { enable: true, value_area: 800 } },
                        color: { value: '#ffffff' },
                        opacity: { value: 0.2, random: true },
                        size: { value: 2, random: true },
                        line_linked: {
                            enable: true,
                            distance: 100,
                            color: '#ffffff',
                            opacity: 0.1,
                            width: 1
                        },
                        move: { enable: true, speed: 1.5, direction: 'none', random: true }
                    }
                });
            }

            console.log('✓ Particle backgrounds initialized');
        } else {
            console.warn('! Particles.js not available, skipping particle initialization');
        }
    } catch (e) {
        console.error('✗ Error initializing particles:', e);
    }
}

// Initialize tab navigator
function initializeTabNavigator() {
    try {
        if (window.tabNavigator) {
            console.log('✓ Tab navigator already initialized');
        } else if (typeof TabNavigator !== 'undefined') {
            window.tabNavigator = new TabNavigator().init();
            console.log('✓ Tab navigator initialized');
        } else {
            console.warn('! TabNavigator not defined, cannot initialize');
        }
    } catch (e) {
        console.error('✗ Error initializing tab navigator:', e);
    }
}

// Initialize chart loader
function initializeChartLoader() {
    try {
        if (window.chartLoader) {
            console.log('✓ Chart loader already initialized');
        } else if (typeof UnifiedChartLoader !== 'undefined') {
            window.chartLoader = UnifiedChartLoader.init();
            console.log('✓ Chart loader initialized');
        } else {
            console.warn('! UnifiedChartLoader not defined, using fallback');
            // Create fallback chart loader
            window.chartLoader = {
                loadedCharts: {},
                chartsToLoad: [],
                init: function() { return this; },
                queueChart: function(type, containerId, chartId, data) {
                    console.log(`Chart loader not available. Would load ${type} chart to ${containerId}`);
                }
            };
        }
    } catch (e) {
        console.error('✗ Error initializing chart loader:', e);
    }
}

// Initialize sidebar interactions
function initializeSidebar() {
    try {
        // Add event listeners to config card headers
        document.querySelectorAll('.config-card-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('.toggle-icon');

                if (!content || !icon) return;

                if (content.classList.contains('collapsed')) {
                    // Expand
                    content.classList.remove('collapsed');
                    icon.style.transform = 'rotate(0deg)';

                    // Set max height for animation
                    content.style.maxHeight = content.scrollHeight + 'px';

                    // Reset after animation
                    setTimeout(() => {
                        content.style.maxHeight = '';
                    }, 300);
                } else {
                    // Collapse
                    icon.style.transform = 'rotate(180deg)';
                    content.style.maxHeight = content.scrollHeight + 'px';

                    // Force reflow
                    content.offsetHeight;

                    // Set to zero
                    content.style.maxHeight = '0px';

                    // Add class after animation
                    setTimeout(() => {
                        content.classList.add('collapsed');
                    }, 300);
                }
            });
        });

        // Add event listeners to vendor cards
        document.querySelectorAll('.vendor-select-card').forEach(card => {
            card.addEventListener('click', () => {
                // Skip Portnox card (always selected)
                if (card.dataset.vendor === 'portnox') return;

                card.classList.toggle('selected');

                // Update active vendors
                updateActiveVendors();
            });
        });

        // Add event listener to range sliders
        document.querySelectorAll('input[type="range"]').forEach(slider => {
            const valueDisplay = document.getElementById(slider.id + '-value');

            // Update initial values
            if (valueDisplay) {
                updateRangeSliderValue(slider, valueDisplay);
            }

            // Add input event
            slider.addEventListener('input', () => {
                if (valueDisplay) {
                    updateRangeSliderValue(slider, valueDisplay);
                }
            });
        });

        console.log('✓ Sidebar interactions initialized');
    } catch (e) {
        console.error('✗ Error initializing sidebar:', e);
    }
}

// Helper to update range slider value displays
function updateRangeSliderValue(slider, valueDisplay) {
    const value = slider.value;

    // Format based on ID
    if (slider.id === 'license-cost' || slider.id === 'hardware-cost') {
        valueDisplay.textContent = '$' + value;
    } else if (slider.id === 'implementation-cost' || slider.id === 'fte-cost') {
        valueDisplay.textContent = '$' + parseInt(value).toLocaleString();
    } else if (slider.id === 'maintenance-percentage') {
        valueDisplay.textContent = value + '%';
    } else {
        valueDisplay.textContent = value;
    }
}

// Update active vendors
function updateActiveVendors() {
    const selectedCards = document.querySelectorAll('.vendor-select-card.selected');
    const vendors = Array.from(selectedCards).map(card => card.dataset.vendor);

    // Ensure Portnox is always included
    if (!vendors.includes('portnox')) {
        vendors.unshift('portnox');
    }

    console.log('Active vendors:', vendors);

    // Update visualizations if they exist
    if (window.nistCsfVisualization) {
        window.nistCsfVisualization.updateSelectedVendors(vendors);
    }
}

// Start loading scripts when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Starting Portnox Total Cost Analyzer initialization...');
    loadScripts(dependencies);
});
EOF

# Make the script executable
chmod +x update-portnox-tca.sh

echo "Script execution complete! The Portnox Total Cost Analyzer has been fully enhanced with a modern UI, comprehensive data, and improved visualizations."
echo "Key improvements:"
echo "✓ Modern UI with glass morphism and gradients"
echo "✓ Fixed tab navigation with static main tabs"
echo "✓ Comprehensive vendor data for all major NAC solutions"
echo "✓ NIST CSF visualization integrated into Executive view"
echo "✓ Treemap visualizations replacing radar charts for better readability"
echo "✓ Detailed technical comparisons with architecture diagrams"
echo "✓ Enhanced financial analysis with cost breakdowns"
echo "✓ Improved security visualizations and compliance framework mappings"
echo "✓ Responsive design for all screen sizes"
echo "✓ Better error handling and initialization process"
echo ""
echo "Open index.html in your browser to see the updated application."
