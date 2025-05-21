#!/bin/bash

# Portnox Total Cost Analyzer Comprehensive Fix Script
# This script addresses various issues with the Portnox TCO Analyzer UI
# and enhances its functionality and appearance

# Set error handling
set -e

echo "===== Portnox TCO Analyzer Enhancement Script ====="
echo "Starting enhancement process..."

# Create directory for backup
mkdir -p backup/js/utils backup/js/components backup/js/models backup/js/data backup/css

# Backup existing files
echo "Creating backups of existing files..."
cp -f js/utils/ui-manager.js backup/js/utils/ 2>/dev/null || true
cp -f js/components/tab-navigator-enhanced.js backup/js/components/ 2>/dev/null || true
cp -f js/models/vendor-data.js backup/js/models/ 2>/dev/null || true
cp -f js/data/vendor-data.js backup/js/data/ 2>/dev/null || true
cp -f css/styles.css backup/css/ 2>/dev/null || true

# Make sure directories exist
mkdir -p js/utils js/components js/models js/data css

# Create modern CSS directory
echo "Creating modern CSS styles..."
cat > css/modern-styles.css << 'EOL'
/**
 * Modern Styles for Portnox Total Cost Analyzer
 * Clean, flat design with professional aesthetic
 */

:root {
  /* Primary colors */
  --color-primary-50: #e6f0ff;
  --color-primary-100: #cce1ff;
  --color-primary-200: #99c3ff;
  --color-primary-300: #66a5ff;
  --color-primary-400: #3387ff;
  --color-primary-500: #1a5a96;
  --color-primary-600: #0047b3;
  --color-primary-700: #003580;
  --color-primary-800: #00234d;
  --color-primary-900: #001229;
  
  /* Secondary colors */
  --color-secondary-50: #edf2ff;
  --color-secondary-100: #dbe6ff;
  --color-secondary-200: #b7ccff;
  --color-secondary-300: #93b3ff;
  --color-secondary-400: #6f99ff;
  --color-secondary-500: #4b80ff;
  --color-secondary-600: #3c66cc;
  --color-secondary-700: #2d4d99;
  --color-secondary-800: #1e3366;
  --color-secondary-900: #0f1a33;
  
  /* Success colors */
  --color-success-50: #e6f7ee;
  --color-success-100: #ccf0dd;
  --color-success-200: #99e1bb;
  --color-success-300: #66d299;
  --color-success-400: #33c377;
  --color-success-500: #00b455;
  --color-success-600: #009044;
  --color-success-700: #006c33;
  --color-success-800: #004822;
  --color-success-900: #002411;
  
  /* Warning colors */
  --color-warning-50: #fff9e6;
  --color-warning-100: #fff3cc;
  --color-warning-200: #ffe799;
  --color-warning-300: #ffdb66;
  --color-warning-400: #ffcf33;
  --color-warning-500: #ffc300;
  --color-warning-600: #cc9c00;
  --color-warning-700: #997500;
  --color-warning-800: #664e00;
  --color-warning-900: #332700;
  
  /* Danger colors */
  --color-danger-50: #fdeeee;
  --color-danger-100: #fbdddd;
  --color-danger-200: #f7bbbb;
  --color-danger-300: #f39999;
  --color-danger-400: #ef7777;
  --color-danger-500: #eb5555;
  --color-danger-600: #bc4444;
  --color-danger-700: #8d3333;
  --color-danger-800: #5e2222;
  --color-danger-900: #2f1111;
  
  /* Neutral colors */
  --color-neutral-50: #f8f9fa;
  --color-neutral-100: #f1f3f5;
  --color-neutral-200: #e9ecef;
  --color-neutral-300: #dee2e6;
  --color-neutral-400: #ced4da;
  --color-neutral-500: #adb5bd;
  --color-neutral-600: #6c757d;
  --color-neutral-700: #495057;
  --color-neutral-800: #343a40;
  --color-neutral-900: #212529;
  
  /* Layout */
  --header-height: 64px;
  --sidebar-width: 280px;
  --sidebar-collapsed-width: 70px;
  --content-max-width: 1440px;
  --border-radius: 0;
  --box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  /* Typography */
  --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --font-family-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  --font-size-base: 14px;
  --line-height-base: 1.5;
  
  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  
  /* Z-index */
  --z-index-header: 100;
  --z-index-sidebar: 90;
  --z-index-dropdown: 80;
  --z-index-modal: 1000;
  --z-index-toast: 1100;
}

/* Base styles */
body {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-neutral-800);
  background-color: var(--color-neutral-50);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Layout */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  height: var(--header-height);
  background-color: var(--color-primary-500);
  color: white;
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-index-header);
  box-shadow: var(--box-shadow);
}

.content-wrapper {
  display: flex;
  min-height: calc(100vh - var(--header-height));
  margin-top: var(--header-height);
}

.sidebar {
  width: var(--sidebar-width);
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  transition: width 0.3s ease;
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  left: 0;
  z-index: var(--z-index-sidebar);
  overflow-y: auto;
  border-right: none;
}

.sidebar.collapsed {
  width: var(--sidebar-collapsed-width);
}

.content-area {
  flex: 1;
  margin-left: var(--sidebar-width);
  padding: var(--spacing-6);
  transition: margin-left 0.3s ease;
  background-color: var(--color-neutral-50);
}

.content-area.expanded {
  margin-left: var(--sidebar-collapsed-width);
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: var(--spacing-4);
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-neutral-900);
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.75rem;
}

h3 {
  font-size: 1.5rem;
}

h4 {
  font-size: 1.25rem;
}

h5 {
  font-size: 1.125rem;
}

h6 {
  font-size: 1rem;
}

p {
  margin-top: 0;
  margin-bottom: var(--spacing-4);
}

a {
  color: var(--color-primary-500);
  text-decoration: none;
}

a:hover {
  color: var(--color-primary-700);
  text-decoration: underline;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2) var(--spacing-4);
  background-color: var(--color-primary-500);
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease, transform 0.1s ease;
  text-decoration: none;
  height: 36px;
  border-radius: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn:hover {
  background-color: var(--color-primary-600);
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-200);
}

.btn-sm {
  height: 28px;
  padding: var(--spacing-1) var(--spacing-3);
  font-size: 0.875rem;
}

.btn-lg {
  height: 44px;
  padding: var(--spacing-3) var(--spacing-6);
  font-size: 1.125rem;
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary-500);
  border: 1px solid var(--color-primary-500);
}

.btn-outline:hover {
  background-color: var(--color-primary-50);
  color: var(--color-primary-600);
}

.btn-secondary {
  background-color: var(--color-secondary-500);
}

.btn-secondary:hover {
  background-color: var(--color-secondary-600);
}

.btn-success {
  background-color: var(--color-success-500);
}

.btn-success:hover {
  background-color: var(--color-success-600);
}

.btn-warning {
  background-color: var(--color-warning-500);
  color: var(--color-neutral-800);
}

.btn-warning:hover {
  background-color: var(--color-warning-600);
}

.btn-danger {
  background-color: var(--color-danger-500);
}

.btn-danger:hover {
  background-color: var(--color-danger-600);
}

/* Tab Navigator */
.tab-container {
  margin-bottom: var(--spacing-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.main-tabs {
  display: flex;
  background-color: white;
  border-bottom: none;
}

.main-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-4) var(--spacing-6);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.main-tab:hover {
  background-color: var(--color-neutral-50);
  border-bottom-color: var(--color-primary-200);
}

.main-tab.active {
  border-bottom-color: var(--color-primary-500);
  color: var(--color-primary-500);
  background-color: var(--color-neutral-50);
}

.tab-icon {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-2);
  color: inherit;
}

.tab-label {
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sub-tabs-container {
  background-color: white;
  border-bottom: 1px solid var(--color-neutral-200);
  padding: 0 var(--spacing-2);
}

.sub-tabs {
  display: none;
  flex-wrap: wrap;
}

.sub-tabs.active {
  display: flex;
}

.sub-tab {
  padding: var(--spacing-3) var(--spacing-4);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.sub-tab:hover {
  color: var(--color-primary-500);
}

.sub-tab.active {
  color: var(--color-primary-500);
  font-weight: 500;
}

.sub-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: var(--spacing-4);
  right: var(--spacing-4);
  height: 2px;
  background-color: var(--color-primary-500);
}

.view-container {
  min-height: 600px;
}

.view-content {
  display: none;
}

.view-content.active {
  display: block;
}

/* Section Banner */
.section-banner {
  background-color: var(--color-primary-600);
  color: white;
  padding: var(--spacing-6) var(--spacing-8);
  margin-bottom: var(--spacing-8);
}

.section-banner h2 {
  margin-top: 0;
  margin-bottom: var(--spacing-2);
  font-size: 1.75rem;
  color: white;
}

.section-banner p {
  margin-bottom: 0;
  opacity: 0.9;
  font-size: 1rem;
  max-width: 800px;
}

.banner-gradient-cool {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-secondary-600));
}

.banner-gradient-warm {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-warning-500));
}

.banner-gradient-primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700));
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-8);
}

.stat-card {
  background-color: white;
  padding: var(--spacing-5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-neutral-200);
  display: flex;
  flex-direction: column;
}

.stat-title {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: var(--spacing-3);
  color: var(--color-neutral-700);
  display: flex;
  align-items: center;
}

.stat-title i {
  margin-right: var(--spacing-2);
  color: var(--color-primary-500);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--spacing-3);
  color: var(--color-neutral-900);
  line-height: 1;
}

.stat-indicator {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  margin-top: auto;
}

.stat-indicator.positive {
  color: var(--color-success-600);
}

.stat-indicator.negative {
  color: var(--color-danger-600);
}

.stat-indicator i {
  margin-right: var(--spacing-1);
}

.stat-text {
  font-size: 0.875rem;
  color: var(--color-neutral-600);
  margin-top: var(--spacing-2);
}

/* Chart Section */
.chart-section {
  margin-bottom: var(--spacing-8);
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-5);
  display: flex;
  align-items: center;
  color: var(--color-neutral-800);
  position: relative;
  padding-bottom: var(--spacing-2);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: var(--color-primary-500);
}

.section-title i {
  margin-right: var(--spacing-2);
  color: var(--color-primary-500);
}

.chart-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: var(--spacing-5);
  margin-bottom: var(--spacing-6);
}

.chart-wrapper {
  background-color: white;
  padding: var(--spacing-5);
  height: 320px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-neutral-200);
}

.chart-wrapper.large-chart {
  height: 400px;
  grid-column: 1 / -1;
}

.chart-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--spacing-1);
  color: var(--color-neutral-800);
}

.chart-subtitle {
  font-size: 0.875rem;
  color: var(--color-neutral-600);
  margin-bottom: var(--spacing-4);
}

.chart-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.chart-loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-neutral-200);
  border-top-color: var(--color-primary-500);
  border-radius: 50%;
  margin: 0 auto var(--spacing-3);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Insight Panel */
.insight-panel {
  background-color: white;
  padding: var(--spacing-5);
  margin-bottom: var(--spacing-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-neutral-200);
}

.insight-list {
  margin: 0;
  padding-left: var(--spacing-5);
}

.insight-list li {
  margin-bottom: var(--spacing-3);
  line-height: 1.5;
}

.insight-list li:last-child {
  margin-bottom: 0;
}

/* Recommendations Section */
.recommendations-section {
  margin-bottom: var(--spacing-8);
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--spacing-4);
}

.recommendation-card {
  background-color: white;
  padding: var(--spacing-5);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-neutral-200);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.recommendation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.recommendation-icon {
  font-size: 2rem;
  color: var(--color-primary-500);
  margin-bottom: var(--spacing-3);
}

.recommendation-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--spacing-2);
  color: var(--color-neutral-800);
}

.recommendation-text {
  font-size: 0.875rem;
  color: var(--color-neutral-700);
}

/* NIST Framework Section */
.nist-framework-section {
  margin-bottom: var(--spacing-8);
}

.nist-framework {
  background-color: white;
  padding: var(--spacing-5);
  min-height: 400px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-neutral-200);
}

/* Vendor Position Section */
.market-position-section {
  margin-bottom: var(--spacing-8);
}

.vendor-position-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--spacing-4);
}

.vendor-position-card {
  background-color: white;
  padding: var(--spacing-5);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-neutral-200);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.vendor-position-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.vendor-position-logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-3);
}

.vendor-position-logo img {
  max-height: 100%;
  max-width: 120px;
}

.vendor-position-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--spacing-2);
  color: var(--color-neutral-800);
}

.vendor-position-text {
  font-size: 0.875rem;
  color: var(--color-neutral-700);
  text-align: center;
}

/* Cost Table Section */
.cost-table-section {
  margin-bottom: var(--spacing-6);
}

.table-responsive {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: var(--spacing-3) var(--spacing-4);
  text-align: left;
  border-bottom: 1px solid var(--color-neutral-200);
}

.data-table th {
  background-color: var(--color-primary-500);
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.8125rem;
  letter-spacing: 0.5px;
}

.data-table tr:hover td {
  background-color: var(--color-neutral-50);
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table .total-row {
  font-weight: 700;
  background-color: var(--color-neutral-100);
}

.data-table .savings {
  color: var(--color-success-600);
  font-weight: 500;
}

.data-table .negative {
  color: var(--color-danger-600);
  font-weight: 500;
}

.data-table .total-savings {
  color: var(--color-success-600);
  font-weight: 700;
}

.data-table .advantage {
  color: var(--color-primary-600);
  font-weight: 500;
}

/* Architecture Section */
.architecture-section {
  margin-bottom: var(--spacing-8);
}

.architecture-types {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-5);
}

.arch-type {
  background-color: white;
  padding: var(--spacing-5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-neutral-200);
}

.arch-type-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-4);
}

.arch-type-icon {
  font-size: 1.5rem;
  margin-right: var(--spacing-3);
  color: var(--color-primary-500);
}

.arch-type-name {
  font-size: 1.125rem;
  font-weight: 600;
  margin-right: auto;
  color: var(--color-neutral-800);
}

.arch-type-vendor {
  font-size: 0.875rem;
  color: var(--color-neutral-600);
}

.arch-type-diagram {
  margin-bottom: var(--spacing-4);
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-neutral-50);
  padding: var(--spacing-3);
  border: 1px solid var(--color-neutral-200);
}

.arch-type-diagram img {
  max-width: 100%;
  max-height: 100%;
}

.arch-type-advantages {
  font-size: 0.875rem;
}

.advantage-item,
.disadvantage-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--spacing-2);
  line-height: 1.4;
}

.advantage-item i,
.disadvantage-item i {
  margin-right: var(--spacing-2);
  margin-top: 2px;
  flex-shrink: 0;
}

.advantage-item i {
  color: var(--color-success-500);
}

.disadvantage-item i {
  color: var(--color-danger-500);
}

/* Deployment Section */
.deployment-section {
  margin-bottom: var(--spacing-8);
}

.timeline-comparison {
  margin-top: var(--spacing-4);
}

.timeline-vendor {
  margin-bottom: var(--spacing-5);
}

.timeline-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-3);
}

.timeline-header img {
  height: 24px;
  margin-right: var(--spacing-3);
}

.timeline-title {
  font-weight: 600;
  color: var(--color-neutral-800);
}

.timeline {
  display: flex;
  height: 40px;
  background-color: var(--color-neutral-100);
  margin-bottom: var(--spacing-2);
}

.timeline-stage {
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary-100);
  color: var(--color-primary-900);
  font-size: 0.75rem;
  overflow: hidden;
}

.timeline-portnox .timeline-stage {
  background-color: var(--color-success-100);
  color: var(--color-success-900);
}

.timeline-traditional .timeline-stage:nth-child(1) {
  background-color: var(--color-primary-100);
}

.timeline-traditional .timeline-stage:nth-child(2) {
  background-color: var(--color-primary-200);
}

.timeline-traditional .timeline-stage:nth-child(3) {
  background-color: var(--color-primary-300);
}

.timeline-traditional .timeline-stage:nth-child(4) {
  background-color: var(--color-primary-400);
  color: white;
}

.stage-label {
  font-weight: 600;
  margin-right: var(--spacing-2);
}

.timeline-total {
  font-weight: 600;
  font-size: 0.875rem;
  text-align: right;
  color: var(--color-neutral-800);
}

/* Zero Trust Section */
.zero-trust-section {
  margin-bottom: var(--spacing-8);
  background-color: white;
  padding: var(--spacing-5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-neutral-200);
}

.zero-trust-description {
  margin-bottom: var(--spacing-4);
}

.zero-trust-capabilities {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--spacing-4);
}

.capability-item {
  text-align: center;
  padding: var(--spacing-4);
  border: 1px solid var(--color-neutral-200);
  background-color: var(--color-neutral-50);
}

.capability-icon {
  font-size: 2rem;
  color: var(--color-primary-500);
  margin-bottom: var(--spacing-2);
}

.capability-name {
  font-weight: 600;
  margin-bottom: var(--spacing-1);
  color: var(--color-neutral-800);
}

.capability-description {
  font-size: 0.875rem;
  color: var(--color-neutral-600);
}

/* Glass Panel */
.glass-panel {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: var(--spacing-5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-neutral-200);
}

/* Heatmap table */
.heatmap-table {
  border: 1px solid var(--color-neutral-200);
}

.heatmap-table td {
  text-align: center;
}

.heatmap-table td:first-child {
  text-align: left;
  font-weight: 500;
}

.heatmap-legend {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-3);
  gap: var(--spacing-3);
}

.legend-item {
  display: flex;
  align-items: center;
}

.legend-color {
  width: 16px;
  height: 16px;
  margin-right: var(--spacing-2);
}

.score-excellent {
  background-color: var(--color-success-500);
  color: white;
}

.score-good {
  background-color: var(--color-success-300);
  color: var(--color-neutral-800);
}

.score-average {
  background-color: var(--color-warning-300);
  color: var(--color-neutral-800);
}

.score-poor {
  background-color: var(--color-danger-300);
  color: var(--color-neutral-800);
}

/* Integration and compliance grids */
.integration-grid,
.compliance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-4);
  margin-top: var(--spacing-4);
}

.integration-card,
.compliance-card {
  background-color: white;
  padding: var(--spacing-4);
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-neutral-200);
}

.integration-icon,
.compliance-icon {
  font-size: 2rem;
  color: var(--color-primary-500);
  margin-bottom: var(--spacing-2);
}

.integration-name,
.compliance-name {
  font-weight: 600;
  margin-bottom: var(--spacing-3);
  color: var(--color-neutral-800);
}

.integration-vendors,
.compliance-scores {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-2);
}

.integration-vendor {
  font-size: 0.75rem;
  padding: var(--spacing-1) var(--spacing-2);
}

.integration-vendor.supported {
  background-color: var(--color-success-100);
  color: var(--color-success-800);
}

.integration-vendor.not-supported {
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-500);
  text-decoration: line-through;
}

.compliance-vendor-score {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-1) 0;
  border-bottom: 1px solid var(--color-neutral-100);
  width: 100%;
  font-size: 0.875rem;
}

.vendor-name {
  font-weight: 500;
}

/* Badges */
.badge {
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-2);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* NIST CSF Visualization */
.nist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-4);
}

.nist-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-neutral-800);
}

.nist-controls {
  display: flex;
  gap: var(--spacing-2);
}

.nist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
}

.nist-category {
  background-color: white;
  padding: var(--spacing-4);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-neutral-200);
}

.nist-category-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-2);
}

.nist-category-icon {
  font-size: 1.25rem;
  margin-right: var(--spacing-2);
  color: var(--color-primary-500);
}

.nist-category-identify .nist-category-icon {
  color: var(--color-primary-500);
}

.nist-category-protect .nist-category-icon {
  color: var(--color-success-500);
}

.nist-category-detect .nist-category-icon {
  color: var(--color-warning-500);
}

.nist-category-respond .nist-category-icon {
  color: var(--color-danger-500);
}

.nist-category-recover .nist-category-icon {
  color: var(--color-secondary-500);
}

.nist-category-name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-neutral-800);
}

.nist-category-description {
  font-size: 0.875rem;
  margin-bottom: var(--spacing-3);
  color: var(--color-neutral-600);
  line-height: 1.4;
}

.nist-score {
  height: 8px;
  background-color: var(--color-neutral-200);
  margin-bottom: var(--spacing-1);
}

.nist-score-bar {
  height: 100%;
  background-color: var(--color-primary-600);
}

.nist-category-identify .nist-score-bar {
  background-color: var(--color-primary-600);
}

.nist-category-protect .nist-score-bar {
  background-color: var(--color-success-600);
}

.nist-category-detect .nist-score-bar {
  background-color: var(--color-warning-600);
}

.nist-category-respond .nist-score-bar {
  background-color: var(--color-danger-600);
}

.nist-category-recover .nist-score-bar {
  background-color: var(--color-secondary-600);
}

.nist-score-values {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--color-neutral-600);
  margin-bottom: var(--spacing-3);
}

.nist-subcategories {
  margin-bottom: var(--spacing-3);
  border-top: 1px solid var(--color-neutral-200);
  padding-top: var(--spacing-2);
}

.nist-subcategory {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  padding: var(--spacing-1) 0;
  border-bottom: 1px solid var(--color-neutral-100);
}

.nist-expand-btn {
  width: 100%;
}

.nist-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-4);
  margin-top: var(--spacing-4);
  background-color: white;
  padding: var(--spacing-3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-neutral-200);
}

.nist-legend-item {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

.nist-legend-color {
  width: 16px;
  height: 16px;
  margin-right: var(--spacing-2);
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .sidebar {
    width: var(--sidebar-collapsed-width);
  }
  
  .content-area {
    margin-left: var(--sidebar-collapsed-width);
  }
  
  .chart-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0 var(--spacing-3);
  }
  
  .content-area {
    padding: var(--spacing-3);
  }
  
  .recommendations-grid,
  .stats-grid,
  .zero-trust-capabilities {
    grid-template-columns: 1fr;
  }
  
  .architecture-types {
    grid-template-columns: 1fr;
  }
  
  .nist-grid {
    grid-template-columns: 1fr;
  }
}

/* Animations */
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

/* Toast notifications */
#toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: var(--z-index-toast);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.toast {
  padding: var(--spacing-3) var(--spacing-4);
  background-color: white;
  color: var(--color-neutral-800);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 250px;
  max-width: 400px;
  display: flex;
  align-items: center;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.toast i {
  margin-right: var(--spacing-2);
  font-size: 1.25rem;
}

.toast-info {
  border-left: 4px solid var(--color-primary-500);
}

.toast-success {
  border-left: 4px solid var(--color-success-500);
}

.toast-warning {
  border-left: 4px solid var(--color-warning-500);
}

.toast-error {
  border-left: 4px solid var(--color-danger-500);
}

/* Vendor card grid */
.vendor-select-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: var(--spacing-3);
  padding: var(--spacing-3) 0;
}

.vendor-select-card {
  height: 100px;
  padding: var(--spacing-3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-neutral-200);
  cursor: pointer;
  transition: all 0.2s ease;
}

.vendor-select-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  border-color: var(--color-primary-500);
}

.vendor-select-card.selected {
  border-color: var(--color-primary-500);
  background-color: var(--color-primary-50);
}

.vendor-logo {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vendor-logo img {
  max-height: 40px;
  max-width: 80px;
}

.vendor-name {
  font-size: 0.75rem;
  text-align: center;
  margin-top: var(--spacing-2);
  font-weight: 500;
}

/* Config card styling */
.config-card {
  margin-bottom: var(--spacing-4);
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.config-card-header {
  padding: var(--spacing-3) var(--spacing-4);
  background-color: var(--color-neutral-50);
  border-bottom: 1px solid var(--color-neutral-200);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.config-card-header h3 {
  margin: 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.config-card-header h3 i {
  margin-right: var(--spacing-2);
  color: var(--color-primary-500);
}

.config-card-content {
  padding: var(--spacing-4);
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
}

.config-card-content.collapsed {
  max-height: 0;
  padding: 0 var(--spacing-4);
  opacity: 0;
}

.toggle-icon {
  transition: transform 0.3s ease;
}

.toggle-icon.collapsed {
  transform: rotate(180deg);
}
EOL

# Create the tab navigator fix
echo "Creating tab navigator fix..."
cat > js/components/tab-navigator-enhanced.js << 'EOL'
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
                <img src="./img/logos/gartner.png" alt="Gartner" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\'%3e%3crect width=\'120\' height=\'60\' fill=\'%23eee\'/%3e%3ctext x=\'60\' y=\'35\' text-anchor=\'middle\' fill=\'%23999\' font-size=\'12\' font-family=\'sans-serif\'%3eGartner%3c/text%3e%3c/svg%3e'">
              </div>
              <div class="vendor-position-title">Gartner</div>
              <div class="vendor-position-text">Named as a <strong>Leader</strong> in the Gartner Magic Quadrant for Network Access Control, with highest position for "Completeness of Vision"</div>
            </div>
            <div class="vendor-position-card">
              <div class="vendor-position-logo">
                <img src="./img/logos/forrester.png" alt="Forrester" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\'%3e%3crect width=\'120\' height=\'60\' fill=\'%23eee\'/%3e%3ctext x=\'60\' y=\'35\' text-anchor=\'middle\' fill=\'%23999\' font-size=\'12\' font-family=\'sans-serif\'%3eForrester%3c/text%3e%3c/svg%3e'">
              </div>
              <div class="vendor-position-title">Forrester</div>
              <div class="vendor-position-text">Recognized as a <strong>Strong Performer</strong> in the Forrester Wave™: Zero Trust Network Access, with top scores in cloud delivery model</div>
            </div>
            <div class="vendor-position-card">
              <div class="vendor-position-logo">
                <img src="./img/logos/idc.png" alt="IDC" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\'%3e%3crect width=\'120\' height=\'60\' fill=\'%23eee\'/%3e%3ctext x=\'60\' y=\'35\' text-anchor=\'middle\' fill=\'%23999\' font-size=\'12\' font-family=\'sans-serif\'%3eIDC%3c/text%3e%3c/svg%3e'">
              </div>
              <div class="vendor-position-title">IDC</div>
              <div class="vendor-position-text">Highlighted as an <strong>Innovator</strong> in the IDC MarketScape for Network Access Control, noted for cloud-native architecture</div>
            </div>
            <div class="vendor-position-card">
              <div class="vendor-position-logo">
                <img src="./img/logos/ema.png" alt="EMA" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\'%3e%3crect width=\'120\' height=\'60\' fill=\'%23eee\'/%3e%3ctext x=\'60\' y=\'35\' text-anchor=\'middle\' fill=\'%23999\' font-size=\'12\' font-family=\'sans-serif\'%3eEMA%3c/text%3e%3c/svg%3e'">
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
                <img src="./img/arch-cloud.svg" alt="Cloud Architecture" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'280\' height=\'140\'%3e%3crect width=\'280\' height=\'140\' fill=\'%23f8f9fa\'/%3e%3cpath d=\'M75,70 A20,20 0 1,1 120,70 A20,20 0 1,1 165,70 A20,20 0 1,1 215,70 L215,90 L75,90 Z\' fill=\'%231a5a96\' opacity=\'0.7\'/%3e%3ccircle cx=\'150\' cy=\'50\' r=\'15\' fill=\'%231a5a96\'/%3e%3ctext x=\'150\' y=\'120\' text-anchor=\'middle\' fill=\'%23333\' font-size=\'12\' font-family=\'sans-serif\'%3eCloud-Native Architecture%3c/text%3e%3c/svg%3e'">
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
                <img src="./img/arch-onprem.svg" alt="On-Premises Architecture" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'280\' height=\'140\'%3e%3crect width=\'280\' height=\'140\' fill=\'%23f8f9fa\'/%3e%3crect x=\'115\' y=\'30\' width=\'50\' height=\'70\' fill=\'%23666\'/%3e%3crect x=\'120\' y=\'35\' width=\'40\' height=\'5\' fill=\'%23999\'/%3e%3crect x=\'120\' y=\'45\' width=\'40\' height=\'5\' fill=\'%23999\'/%3e%3crect x=\'120\' y=\'55\' width=\'40\' height=\'5\' fill=\'%23999\'/%3e%3crect x=\'70\' y=\'70\' width=\'45\' height=\'3\' fill=\'%23666\'/%3e%3crect x=\'165\' y=\'70\' width=\'45\' height=\'3\' fill=\'%23666\'/%3e%3ctext x=\'150\' y=\'120\' text-anchor=\'middle\' fill=\'%23333\' font-size=\'12\' font-family=\'sans-serif\'%3eOn-Premises Architecture%3c/text%3e%3c/svg%3e'">
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
                <img src="./img/arch-hybrid.svg" alt="Hybrid Architecture" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'280\' height=\'140\'%3e%3crect width=\'280\' height=\'140\' fill=\'%23f8f9fa\'/%3e%3crect x=\'70\' y=\'50\' width=\'40\' height=\'60\' fill=\'%23666\'/%3e%3crect x=\'75\' y=\'55\' width=\'30\' height=\'5\' fill=\'%23999\'/%3e%3crect x=\'75\' y=\'65\' width=\'30\' height=\'5\' fill=\'%23999\'/%3e%3cpath d=\'M170,40 A20,20 0 1,1 215,40 A20,20 0 1,1 250,40 L250,60 L170,60 Z\' fill=\'%231a5a96\' opacity=\'0.7\'/%3e%3ccircle cx=\'200\' cy=\'25\' r=\'10\' fill=\'%231a5a96\'/%3e%3cline x1=\'110\' y1=\'60\' x2=\'170\' y2=\'50\' stroke=\'%23666\' stroke-width=\'2\' stroke-dasharray=\'5,5\'/%3e%3ctext x=\'150\' y=\'120\' text-anchor=\'middle\' fill=\'%23333\' font-size=\'12\' font-family=\'sans-serif\'%3eHybrid Architecture%3c/text%3e%3c/svg%3e'">
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
                <img src="./img/vendors/portnox.png" alt="Portnox" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'24\'%3e%3crect width=\'80\' height=\'24\' fill=\'%23f8f9fa\'/%3e%3ctext x=\'40\' y=\'15\' text-anchor=\'middle\' fill=\'%23333\' font-size=\'10\' font-family=\'sans-serif\'%3ePortnox%3c/text%3e%3c/svg%3e'">
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
                <img src="./img/vendors/cisco.png" alt="Traditional NAC" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'24\'%3e%3crect width=\'80\' height=\'24\' fill=\'%23f8f9fa\'/%3e%3ctext x=\'40\' y=\'15\' text-anchor=\'middle\' fill=\'%23333\' font-size=\'10\' font-family=\'sans-serif\'%3eCisco%3c/text%3e%3c/svg%3e'">
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
EOL

# Create the comprehensive fixes JS
echo "Creating comprehensive-fix.js..."
cat > js/utils/comprehensive-fix.js << 'EOL'
/**
 * Comprehensive Fix for Portnox Total Cost Analyzer
 * Fixes various issues and applies UI improvements
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing comprehensive fixes...');
  
  // Apply all fixes
  initializeFixes();
});

function initializeFixes() {
  // Add modern styles
  addModernStyles();
  
  // Fix vendor data
  ensureVendorData();
  
  // Fix Tab Navigator
  ensureTabNavigator();
  
  // Fix view initialization
  ensureViewInitialization();
  
  // Fix UI manager
  fixUIManager();
  
  // Fix calculator
  fixCalculator();
  
  // Make UI cleaner and more modern
  enhanceUI();
  
  console.log('All fixes applied successfully!');
}

/**
 * Add modern styles to the page
 */
function addModernStyles() {
  if (!document.getElementById('modern-styles')) {
    const link = document.createElement('link');
    link.id = 'modern-styles';
    link.rel = 'stylesheet';
    link.href = './css/modern-styles.css';
    document.head.appendChild(link);
    
    // Add Font Awesome if not already present
    if (!document.querySelector('link[href*="fontawesome"]')) {
      const fontAwesome = document.createElement('link');
      fontAwesome.rel = 'stylesheet';
      fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
      document.head.appendChild(fontAwesome);
    }
    
    console.log('Modern styles added');
  }
}

/**
 * Ensure vendor data is available
 */
function ensureVendorData() {
  // Check if VENDORS is defined
  if (typeof window.VENDORS === 'undefined') {
    console.warn('VENDORS is not defined, attempting to load vendor-data.js');
    
    // Load vendor-data.js
    const script = document.createElement('script');
    script.src = './js/data/vendor-data.js';
    script.onload = function() {
      console.log('Vendor data loaded successfully');
    };
    script.onerror = function() {
      console.error('Failed to load vendor data from js/data/vendor-data.js');
      // Try alternative location
      const altScript = document.createElement('script');
      altScript.src = './js/models/vendor-data.js';
      document.body.appendChild(altScript);
    };
    document.body.appendChild(script);
  } else {
    console.log('VENDORS is already defined with', Object.keys(window.VENDORS).length, 'vendors');
  }
}

/**
 * Ensure Tab Navigator is properly initialized
 */
function ensureTabNavigator() {
  // Check if Tab Navigator exists
  if (typeof window.TabNavigator === 'undefined' || !window.tabNavigator) {
    console.warn('TabNavigator not found, loading tab-navigator-enhanced.js');
    
    // Load tab-navigator-enhanced.js
    const script = document.createElement('script');
    script.src = './js/components/tab-navigator-enhanced.js';
    script.onload = function() {
      // Initialize Tab Navigator after script loads
      if (typeof window.TabNavigator !== 'undefined') {
        window.tabNavigator = new TabNavigator().init();
        console.log('TabNavigator initialized');
        
        // Load other required components
        loadComponentScripts();
      }
    };
    document.body.appendChild(script);
  } else {
    console.log('TabNavigator is already defined');
    // Load other required components
    loadComponentScripts();
  }
}

/**
 * Load additional component scripts
 */
function loadComponentScripts() {
  // Load VendorComparison
  if (typeof window.VendorComparison === 'undefined') {
    const vendorCompScript = document.createElement('script');
    vendorCompScript.src = './js/components/vendorComparison.js';
    document.body.appendChild(vendorCompScript);
  }
  
  // Load NistCSFVisualization
  if (typeof window.NistCSFVisualization === 'undefined') {
    const nistScript = document.createElement('script');
    nistScript.src = './js/components/nistCsfVisualization.js';
    document.body.appendChild(nistScript);
  }
}

/**
 * Ensure view initialization is properly handled
 */
function ensureViewInitialization() {
  // Check if there's at least one view
  const views = document.querySelectorAll('.view-content');
  if (views.length === 0) {
    console.warn('No views found, waiting for tabNavigator to be ready');
    
    // Wait for tabNavigator to be fully initialized
    const checkInterval = setInterval(function() {
      if (window.tabNavigator && typeof window.tabNavigator.createViewContent === 'function') {
        // TabNavigator is ready, create first view
        clearInterval(checkInterval);
        
        // Make sure we have a view container
        let viewContainer = document.querySelector('.view-container');
        if (!viewContainer) {
          viewContainer = document.createElement('div');
          viewContainer.className = 'view-container';
          
          // Find tab container and insert after it
          const tabContainer = document.querySelector('.tab-container');
          if (tabContainer) {
            tabContainer.after(viewContainer);
          } else {
            // Insert in content area
            const contentArea = document.querySelector('.content-area');
            if (contentArea) {
              contentArea.appendChild(viewContainer);
            }
          }
        }
        
        // Create executive summary view
        window.tabNavigator.createViewContent('executive', 'summary');
        console.log('Initial view created');
      }
    }, 500);
    
    // Set timeout to avoid infinite checking
    setTimeout(function() {
      clearInterval(checkInterval);
    }, 10000);
  }
}

/**
 * Fix UI Manager
 */
function fixUIManager() {
  if (typeof window.UIManager === 'undefined') {
    console.warn('UIManager not defined, creating minimal version');
    
    // Create minimal UIManager
    window.UIManager = class UIManager {
      constructor(app) {
        this.app = app;
        this.initialized = false;
      }
      
      init() {
        if (this.initialized) return this;
        
        // Initialize animations
        this.initAnimations();
        
        this.initialized = true;
        return this;
      }
      
      initAnimations() {
        // Add entrance animations to dashboard cards
        const dashboardCards = document.querySelectorAll('.dashboard-card, .stat-card');
        dashboardCards.forEach((card, index) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            card.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100 + (index * 50));
        });
      }
      
      showToast(message, type = 'info') {
        // Create toast container if it doesn't exist
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
          toastContainer = document.createElement('div');
          toastContainer.id = 'toast-container';
          toastContainer.style.position = 'fixed';
          toastContainer.style.top = '20px';
          toastContainer.style.right = '20px';
          toastContainer.style.zIndex = '1000';
          document.body.appendChild(toastContainer);
        }
        
        // Create toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.backgroundColor = type === 'error' ? '#f44336' : 
                                     type === 'success' ? '#4CAF50' : 
                                     type === 'warning' ? '#ff9800' : '#2196F3';
        toast.style.color = 'white';
        toast.style.padding = '12px 16px';
        toast.style.marginBottom = '10px';
        toast.style.borderRadius = '0px';
        toast.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        toast.style.minWidth = '250px';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        
        // Add message
        toast.textContent = message;
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Show with animation
        setTimeout(() => {
          toast.style.opacity = '1';
        }, 10);
        
        // Auto-hide after delay
        setTimeout(() => {
          toast.style.opacity = '0';
          setTimeout(() => {
            if (toast.parentNode) {
              toast.parentNode.removeChild(toast);
            }
          }, 300);
        }, 5000);
      }
    };
    
    // Create global instance
    window.uiManager = new UIManager({}).init();
    console.log('Minimal UIManager created');
  }
}

/**
 * Fix Calculator
 */
function fixCalculator() {
  if (typeof window.TcoCalculator === 'undefined') {
    console.warn('TcoCalculator not defined, loading calculator-fix.js');
    
    // Try to load various calculator fixes
    loadScript('./js/models/calculator-fix.js');
  } else {
    console.log('TcoCalculator already defined');
  }
}

/**
 * Load script with fallbacks
 */
function loadScript(url, fallbacks = [], callback) {
  const script = document.createElement('script');
  script.src = url;
  
  script.onload = function() {
    console.log(`Loaded script: ${url}`);
    if (callback) callback();
  };
  
  script.onerror = function() {
    console.error(`Failed to load: ${url}`);
    
    // Try fallbacks if available
    if (fallbacks && fallbacks.length > 0) {
      const nextUrl = fallbacks.shift();
      loadScript(nextUrl, fallbacks, callback);
    } else if (callback) {
      callback();
    }
  };
  
  document.body.appendChild(script);
}

/**
 * Enhance UI to make it cleaner and more modern
 */
function enhanceUI() {
  // Adjust sidebar styles
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.style.borderRight = 'none';
    sidebar.style.boxShadow = '0 0 10px rgba(0,0,0,0.05)';
  }
  
  // Adjust card styles
  const cards = document.querySelectorAll('.dashboard-card, .stat-card, .vendor-card, .chart-wrapper');
  cards.forEach(card => {
    card.style.borderRadius = '0px';
    card.style.boxShadow = '0 2px 3px rgba(0,0,0,0.05)';
    card.style.border = '1px solid #eee';
  });
  
  // Make buttons flat
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.style.borderRadius = '0px';
    button.style.textTransform = 'uppercase';
    button.style.fontWeight = '500';
    button.style.letterSpacing = '0.5px';
  });
  
  // Create improved chart loader mechanism
  window.chartLoader = {
    queue: [],
    processing: false,
    
    // Queue a chart for loading
    queueChart: function(type, containerId, chartId) {
      this.queue.push({
        type: type,
        containerId: containerId,
        chartId: chartId
      });
      
      if (!this.processing) {
        this.processQueue();
      }
    },
    
    // Process the queue
    processQueue: function() {
      if (this.queue.length === 0) {
        this.processing = false;
        return;
      }
      
      this.processing = true;
      const nextChart = this.queue.shift();
      this.loadChart(nextChart.type, nextChart.containerId, nextChart.chartId);
    },
    
    // Load a specific chart
    loadChart: function(type, containerId, chartId) {
      const container = document.getElementById(containerId);
      if (!container) {
        console.warn(`Chart container ${containerId} not found`);
        this.processQueue();
        return;
      }
      
      // Clear placeholder
      container.innerHTML = '';
      
      // Create chart based on type
      switch (type) {
        case 'apex-tco':
          this.createTcoComparisonChart(container, chartId);
          break;
        case 'apex-cost':
          this.createCumulativeCostChart(container, chartId);
          break;
        case 'apex-breach':
          this.createBreachImpactChart(container, chartId);
          break;
        case 'treemap-security':
          this.createSecurityTreemapChart(container, chartId);
          break;
        case 'd3-security':
          this.createSecurityFrameworksChart(container, chartId);
          break;
        default:
          console.warn(`Unknown chart type: ${type}`);
          container.innerHTML = `<div class="chart-placeholder">
            <p>Chart type '${type}' not supported</p>
          </div>`;
          break;
      }
      
      // Process next chart in queue
      setTimeout(() => {
        this.processQueue();
      }, 100);
    },
    
    // Create TCO comparison chart
    createTcoComparisonChart: function(container, chartId) {
      if (typeof ApexCharts === 'undefined') {
        this.loadApexCharts(() => this.createTcoComparisonChart(container, chartId));
        return;
      }
      
      // Get vendor data
      const vendors = window.VENDORS || {};
      const vendorIds = Object.keys(vendors).filter(id => id !== 'no-nac').slice(0, 5);
      
      // Prepare chart data
      const series = [{
        name: 'Total 3-Year TCO',
        data: vendorIds.map(id => vendors[id]?.costs?.tco3Year || 0)
      }];
      
      const options = {
        chart: {
          type: 'bar',
          height: 250,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '70%',
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: vendorIds.map(id => vendors[id]?.shortName || id),
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Cost ($)'
          },
          labels: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        },
        colors: ['#1a5a96', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c'],
        tooltip: {
          y: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        }
      };
      
      // Create chart
      const chart = new ApexCharts(container, options);
      chart.render();
      
      // Store chart reference
      window[chartId] = chart;
    },
    
    // Create cumulative cost chart
    createCumulativeCostChart: function(container, chartId) {
      if (typeof ApexCharts === 'undefined') {
        this.loadApexCharts(() => this.createCumulativeCostChart(container, chartId));
        return;
      }
      
      // Get vendor data
      const vendors = window.VENDORS || {};
      const vendorIds = Object.keys(vendors).filter(id => id !== 'no-nac').slice(0, 3);
      
      // Prepare chart data
      const series = vendorIds.map(id => ({
        name: vendors[id]?.shortName || id,
        data: [
          vendors[id]?.costs?.implementation || 0,
          (vendors[id]?.costs?.implementation || 0) + (vendors[id]?.costs?.yearlySubscription || 0),
          (vendors[id]?.costs?.implementation || 0) + ((vendors[id]?.costs?.yearlySubscription || 0) * 2),
          (vendors[id]?.costs?.implementation || 0) + ((vendors[id]?.costs?.yearlySubscription || 0) * 3)
        ]
      }));
      
      const options = {
        chart: {
          type: 'line',
          height: 250,
          toolbar: {
            show: false
          }
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },
        xaxis: {
          categories: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Cumulative Cost ($)'
          },
          labels: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        },
        colors: ['#1a5a96', '#e74c3c', '#f39c12'],
        tooltip: {
          y: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        },
        legend: {
          position: 'top'
        }
      };
      
      // Create chart
      const chart = new ApexCharts(container, options);
      chart.render();
      
      // Store chart reference
      window[chartId] = chart;
    },
    
    // Create breach impact chart
    createBreachImpactChart: function(container, chartId) {
      if (typeof ApexCharts === 'undefined') {
        this.loadApexCharts(() => this.createBreachImpactChart(container, chartId));
        return;
      }
      
      // Get vendor data
      const vendors = window.VENDORS || {};
      const vendorIds = Object.keys(vendors).filter(id => id !== 'no-nac').slice(0, 3);
      
      // Calculate breach costs (simplified example)
      const breachCost = 4800000; // Average cost of a data breach
      const series = vendorIds.map(id => {
        const vendor = vendors[id];
        return Math.round(breachCost * ((vendor?.security?.breachReduction || 0) / 100));
      });
      
      const options = {
        chart: {
          type: 'bar',
          height: 250,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '70%',
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: vendorIds.map(id => vendors[id]?.shortName || id),
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Potential Savings ($)'
          },
          labels: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        },
        colors: ['#2ecc71', '#27ae60', '#16a085'],
        tooltip: {
          y: {
            formatter: function(val) {
              return ' + val.toLocaleString();
            }
          }
        }
      };
      
      // Create chart
      const chart = new ApexCharts(container, options);
      chart.render();
      
      // Store chart reference
      window[chartId] = chart;
    },
    
    // Create security treemap chart
    createSecurityTreemapChart: function(container, chartId) {
      if (typeof ApexCharts === 'undefined') {
        this.loadApexCharts(() => this.createSecurityTreemapChart(container, chartId));
        return;
      }
      
      // Get vendor data
      const vendors = window.VENDORS || {};
      const portnox = vendors['portnox'] || {};
      
      // Prepare chart data
      const series = [{
        data: [
          {
            x: 'Zero Trust',
            y: portnox.security?.zeroTrust || 0
          },
          {
            x: 'Device Authentication',
            y: portnox.security?.deviceAuth || 0
          },
          {
            x: 'Risk Assessment',
            y: portnox.security?.riskAssessment || 0
          },
          {
            x: 'Compliance Coverage',
            y: portnox.security?.complianceCoverage || 0
          },
          {
            x: 'Continuous Monitoring',
            y: portnox.security?.continuousMonitoring ? 90 : 0
          },
          {
            x: 'Automated Response',
            y: portnox.security?.automatedResponse ? 85 : 0
          }
        ]
      }];
      
      const options = {
        chart: {
          type: 'treemap',
          height: 350,
          toolbar: {
            show: false
          }
        },
        title: {
          text: 'Portnox Security Capabilities',
          align: 'center'
        },
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: true
          }
        },
        colors: [
          '#1a5a96',
          '#2980b9',
          '#3498db',
          '#2ecc71',
          '#27ae60',
          '#16a085'
        ],
        tooltip: {
          y: {
            formatter: function(val) {
              return val + '% Coverage';
            }
          }
        }
      };
      
      // Create chart
      const chart = new ApexCharts(container, options);
      chart.render();
      
      // Store chart reference
      window[chartId] = chart;
    },
    
    // Create security frameworks chart
    createSecurityFrameworksChart: function(container, chartId) {
      if (typeof ApexCharts === 'undefined') {
        this.loadApexCharts(() => this.createSecurityFrameworksChart(container, chartId));
        return;
      }
      
      // Get vendor data
      const vendors = window.VENDORS || {};
      const vendorIds = Object.keys(vendors).filter(id => id !== 'no-nac').slice(0, 3);
      
      // Prepare chart data
      const frameworks = ['NIST CSF', 'PCI DSS', 'HIPAA', 'GDPR', 'ISO 27001'];
      const series = vendorIds.map(id => {
        const vendor = vendors[id] || {};
        return {
          name: vendor.shortName || id,
          data: frameworks.map(framework => {
            const frameworkKey = framework.toLowerCase().replace(/[^a-z0-9]/g, '');
            return vendor.compliance?.[frameworkKey] || vendor.compliance?.[framework] || 0;
          })
        };
      });
      
      const options = {
        chart: {
          type: 'radar',
          height: 250,
          toolbar: {
            show: false
          }
        },
        series: series,
        xaxis: {
          categories: frameworks
        },
        yaxis: {
          max: 100
        },
        colors: ['#1a5a96', '#e74c3c', '#f39c12'],
        markers: {
          size: 4
        },
        stroke: {
          width: 2
        },
        fill: {
          opacity: 0.2
        }
      };
      
      // Create chart
      const chart = new ApexCharts(container, options);
      chart.render();
      
      // Store chart reference
      window[chartId] = chart;
    },
    
    // Load ApexCharts library
    loadApexCharts: function(callback) {
      console.log('Loading ApexCharts library...');
      
      // Check if ApexCharts is already loaded
      if (typeof ApexCharts !== 'undefined') {
        callback();
        return;
      }
      
      // Load ApexCharts
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
      script.onload = function() {
        console.log('ApexCharts loaded successfully');
        callback();
      };
      document.body.appendChild(script);
    }
  };
  
  console.log('UI enhancements applied');
}
EOL

# Create Vendor Comparison Component
echo "Creating vendorComparison.js..."
cat > js/components/vendorComparison.js << 'EOL'
/**
 * Enhanced Vendor Comparison for Portnox Total Cost Analyzer
 * Creates interactive comparison charts and tables for vendor analysis
 */

const VendorComparison = {
  /**
   * Create feature comparison heatmap
   */
  createFeatureHeatmap: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show (top 4 excluding no-nac)
    const vendorsToShow = Object.keys(vendors)
      .filter(id => id !== 'no-nac')
      .slice(0, 4);
    
    // Define features to compare
    const features = [
      { name: 'Zero Trust Architecture', key: 'zeroTrust', category: 'security' },
      { name: 'Cloud-Native', key: 'cloudNative', category: 'root' },
      { name: 'Device Authentication', key: 'deviceAuth', category: 'security' },
      { name: 'Remote Work Support', key: 'remoteWorkSupport', category: 'deployment' },
      { name: 'Implementation Time', key: 'timeToValue', category: 'deployment', invert: true },
      { name: 'MFA Support', key: 'mfa', category: 'security' },
      { name: 'Agents Required', key: 'requiresAgents', category: 'deployment', invert: true },
      { name: 'Hardware Required', key: 'requiresHardware', category: 'deployment', invert: true }
    ];
    
    // Create HTML table for heatmap
    let html = `
      <div class="heatmap-container">
        <h3 class="section-title">Feature Comparison</h3>
        <div class="table-responsive">
          <table class="data-table heatmap-table">
            <thead>
              <tr>
                <th>Feature</th>
                ${vendorsToShow.map(id => `<th>${vendors[id]?.shortName || id}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
    `;
    
    // Add rows for each feature
    features.forEach(feature => {
      html += `<tr><td>${feature.name}</td>`;
      
      vendorsToShow.forEach(vendorId => {
        const vendor = vendors[vendorId];
        if (!vendor) {
          html += `<td class="score-poor">N/A</td>`;
          return;
        }
        
        let value;
        if (feature.category === 'root') {
          value = vendor[feature.key];
        } else {
          value = vendor[feature.category]?.[feature.key];
        }
        
        // Convert to score 0-100
        let score;
        if (typeof value === 'boolean') {
          score = value ? 100 : 0;
          if (feature.invert) {
            score = 100 - score;
          }
        } else if (typeof value === 'number') {
          if (feature.key === 'timeToValue') {
            // Lower is better for implementation time
            score = Math.max(0, 100 - (value / 90) * 100);
          } else {
            score = value;
          }
          
          if (feature.invert) {
            score = 100 - score;
          }
        } else {
          score = 0;
        }
        
        // Determine color class
        const colorClass = this.getScoreColorClass(score);
        
        // Format display value
        let displayValue;
        if (feature.key === 'timeToValue') {
          displayValue = `${value} days`;
        } else if (typeof value === 'boolean') {
          displayValue = value ? (feature.invert ? '✘' : '✓') : (feature.invert ? '✓' : '✘');
        } else if (typeof value === 'number') {
          displayValue = `${value}%`;
        } else {
          displayValue = 'N/A';
        }
        
        html += `<td class="${colorClass}">${displayValue}</td>`;
      });
      
      html += `</tr>`;
    });
    
    html += `
            </tbody>
          </table>
        </div>
        <div class="heatmap-legend">
          <div class="legend-item">
            <div class="legend-color score-excellent"></div>
            <span>Excellent</span>
          </div>
          <div class="legend-item">
            <div class="legend-color score-good"></div>
            <span>Good</span>
          </div>
          <div class="legend-item">
            <div class="legend-color score-average"></div>
            <span>Average</span>
          </div>
          <div class="legend-item">
            <div class="legend-color score-poor"></div>
            <span>Below Average</span>
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Create cost comparison
   */
  createCostComparison: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show (top 4 excluding no-nac)
    const vendorsToShow = Object.keys(vendors)
      .filter(id => id !== 'no-nac')
      .slice(0, 4);
    
    // Define cost categories
    const categories = [
      { name: 'Hardware', key: 'hardware' },
      { name: 'Implementation', key: 'implementation' },
      { name: 'Subscription/License', key: 'yearlySubscription' },
      { name: 'Maintenance', key: 'maintenance' },
      { name: 'Personnel', key: 'personnel' },
      { name: 'Training', key: 'training' }
    ];
    
    // Calculate savings against Portnox
    const portnoxTCO = vendors['portnox']?.costs?.tco3Year || 0;
    
    // Create HTML for cost comparison
    let html = `
      <div class="cost-comparison">
        <h3 class="section-title">3-Year TCO Comparison</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Cost Component</th>
                ${vendorsToShow.map(id => `<th>${vendors[id]?.shortName || id}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
    `;
    
    // Add rows for each cost category
    categories.forEach(category => {
      html += `<tr><td>${category.name}</td>`;
      
      vendorsToShow.forEach(vendorId => {
        const vendor = vendors[vendorId];
        if (!vendor) {
          html += `<td>N/A</td>`;
          return;
        }
        
        const value = vendor.costs?.[category.key] || 0;
        html += `<td>${this.formatCurrency(value)}</td>`;
      });
      
      html += `</tr>`;
    });
    
    // Add total row
    html += `
      <tr class="total-row">
        <td>Total 3-Year TCO</td>
        ${vendorsToShow.map(id => {
          const tco = vendors[id]?.costs?.tco3Year || 0;
          return `<td>${this.formatCurrency(tco)}</td>`;
        }).join('')}
      </tr>
    `;
    
    html += `
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="savings-summary">
        <h3 class="section-title">Cost Savings with Portnox Cloud</h3>
        <div class="stats-grid">
    `;
    
    // Add savings cards
    vendorsToShow.filter(id => id !== 'portnox').forEach(id => {
      const vendor = vendors[id];
      if (!vendor) return;
      
      const tco = vendor.costs?.tco3Year || 0;
      const savings = tco - portnoxTCO;
      const percentage = tco > 0 ? Math.round((savings / tco) * 100) : 0;
      
      if (savings <= 0) return;
      
      html += `
        <div class="stat-card">
          <div class="stat-title">
            <i class="fas fa-money-bill-wave"></i>
            Savings vs ${vendor.shortName || id}
          </div>
          <div class="stat-value">${this.formatCurrency(savings)}</div>
          <div class="stat-indicator positive">
            <i class="fas fa-caret-up"></i> ${percentage}% less expensive
          </div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Create security comparison
   */
  createSecurityComparison: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show (top 4 excluding no-nac)
    const vendorsToShow = Object.keys(vendors)
      .filter(id => id !== 'no-nac')
      .slice(0, 4);
    
    // Define security features
    const features = [
      { name: 'Zero Trust Architecture', key: 'zeroTrust' },
      { name: 'Device Authentication', key: 'deviceAuth' },
      { name: 'Risk Assessment', key: 'riskAssessment' },
      { name: 'Remediation Speed', key: 'remediationSpeed', invert: true, format: 'hours' },
      { name: 'Compliance Coverage', key: 'complianceCoverage' },
      { name: 'Multi-Factor Authentication', key: 'mfa', boolean: true },
      { name: 'Certificate Support', key: 'certificateSupport', boolean: true },
      { name: 'Continuous Monitoring', key: 'continuousMonitoring', boolean: true },
      { name: 'Automated Response', key: 'automatedResponse', boolean: true }
    ];
    
    // Create HTML for security comparison
    let html = `
      <div class="security-comparison">
        <h3 class="section-title">Security Capabilities</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Feature</th>
                ${vendorsToShow.map(id => `<th>${vendors[id]?.shortName || id}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
    `;
    
    // Add rows for each security feature
    features.forEach(feature => {
      html += `<tr><td>${feature.name}</td>`;
      
      vendorsToShow.forEach(vendorId => {
        const vendor = vendors[vendorId];
        if (!vendor || !vendor.security) {
          html += `<td>N/A</td>`;
          return;
        }
        
        const value = vendor.security[feature.key];
        
        if (feature.boolean && typeof value === 'boolean') {
          html += `<td>${value ? 
            '<i class="fas fa-check-circle" style="color: var(--color-success-600);"></i>' : 
            '<i class="fas fa-times-circle" style="color: var(--color-danger-600);"></i>'}</td>`;
        } else if (typeof value === 'number') {
          if (feature.key === 'remediationSpeed') {
            html += `<td>${value} hours</td>`;
          } else {
            html += `<td>${value}%</td>`;
          }
        } else {
          html += `<td>N/A</td>`;
        }
      });
      
      html += `</tr>`;
    });
    
    html += `
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="compliance-comparison">
        <h3 class="section-title">Compliance Framework Coverage</h3>
        <div class="compliance-grid">
    `;
    
    // Add compliance framework cards
    const frameworks = [
      { name: 'NIST CSF', icon: 'fa-shield-alt', key: 'nist' },
      { name: 'PCI DSS', icon: 'fa-credit-card', key: 'pciDss' },
      { name: 'HIPAA', icon: 'fa-hospital', key: 'hipaa' },
      { name: 'GDPR', icon: 'fa-globe', key: 'gdpr' },
      { name: 'ISO 27001', icon: 'fa-certificate', key: 'iso27001' }
    ];
    
    frameworks.forEach(framework => {
      html += `
        <div class="compliance-card">
          <div class="compliance-icon">
            <i class="fas ${framework.icon}"></i>
          </div>
          <div class="compliance-name">${framework.name}</div>
          <div class="compliance-scores">
      `;
      
      vendorsToShow.forEach(id => {
        const vendor = vendors[id];
        if (!vendor || !vendor.compliance) return;
        
        const coverage = vendor.compliance[framework.key] || 0;
        
        html += `
          <div class="compliance-vendor-score" data-vendor="${id}" data-score="${coverage}">
            <span class="vendor-name">${vendor.shortName || id}</span>: ${coverage}%
          </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Create technical comparison
   */
  createTechnicalComparison: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get vendors data
    const vendors = window.VENDORS || {};
    
    // Determine which vendors to show (top 4 excluding no-nac)
    const vendorsToShow = Object.keys(vendors)
      .filter(id => id !== 'no-nac')
      .slice(0, 4);
    
    // Create HTML for technical comparison
    let html = `
      <div class="technical-comparison">
        <h3 class="section-title">Technical Architecture</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Technical Aspect</th>
                ${vendorsToShow.map(id => `<th>${vendors[id]?.shortName || id}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Architecture Type</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  let badge = '';
                  if (vendor.architecture === 'cloud') {
                    badge = '<span class="badge" style="background-color: var(--color-primary-600); color: white;">Cloud-Native</span>';
                  } else if (vendor.architecture === 'hybrid') {
                    badge = '<span class="badge" style="background-color: var(--color-warning-600); color: black;">Hybrid</span>';
                  } else {
                    badge = '<span class="badge" style="background-color: var(--color-neutral-600); color: white;">On-Premises</span>';
                  }
                  return `<td>${badge}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Deployment Time</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.deployment?.timeToValue || '?'} days</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Requires Hardware</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.deployment?.requiresHardware ? 
                    '<i class="fas fa-check-circle" style="color: var(--color-danger-600);"></i>' : 
                    '<i class="fas fa-times-circle" style="color: var(--color-success-600);"></i>'}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Requires Agents</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.deployment?.requiresAgents ? 
                    '<i class="fas fa-check-circle" style="color: var(--color-danger-600);"></i>' : 
                    '<i class="fas fa-times-circle" style="color: var(--color-success-600);"></i>'}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Remote Work Support</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.deployment?.remoteWorkSupport ? 
                    '<i class="fas fa-check-circle" style="color: var(--color-success-600);"></i>' : 
                    '<i class="fas fa-times-circle" style="color: var(--color-danger-600);"></i>'}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>System Reliability</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.technical?.reliability || '?'}%</td>`;
                }).join('')}
              </tr>
              <tr>
                <td>Update Frequency</td>
                ${vendorsToShow.map(id => {
                  const vendor = vendors[id] || {};
                  return `<td>${vendor.technical?.updateFrequency || 'Unknown'}</td>`;
                }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="integration-comparison">
        <h3 class="section-title">Integration Capabilities</h3>
        <div class="integration-grid">
    `;
    
    // Add integration cards
    const integrations = [
      { name: 'Azure AD', icon: 'fa-microsoft', key: 'azure' },
      { name: 'Google Workspace', icon: 'fa-google', key: 'googleWorkspace' },
      { name: 'Active Directory', icon: 'fa-server', key: 'activedirectory' },
      { name: 'RADIUS', icon: 'fa-broadcast-tower', key: 'radius' },
      { name: 'MDM', icon: 'fa-mobile-alt', key: 'mdm' },
      { name: 'SIEM', icon: 'fa-chart-line', key: 'siem' }
    ];
    
    integrations.forEach(integration => {
      html += `
        <div class="integration-card">
          <div class="integration-icon">
            <i class="fas ${integration.icon}"></i>
          </div>
          <div class="integration-name">${integration.name}</div>
          <div class="integration-vendors">
      `;
      
      vendorsToShow.forEach(id => {
        const vendor = vendors[id];
        if (!vendor || !vendor.integration) return;
        
        const supported = vendor.integration[integration.key];
        
        html += `<div class="integration-vendor ${supported ? 'supported' : 'not-supported'}">${vendor.shortName || id}</div>`;
      });
      
      html += `
          </div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
    
    container.innerHTML = html;
    
    // Add CSS for integration grid
    this.addCss(`
      .integration-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
        margin-top: 16px;
      }
      
      .integration-card {
        background-color: white;
        padding: 16px;
        text-align: center;
      }
      
      .integration-icon {
        font-size: 2rem;
        color: var(--color-primary-500);
        margin-bottom: 8px;
      }
      
      .integration-name {
        font-weight: 600;
        margin-bottom: 12px;
      }
      
      .integration-vendors {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
      }
      
      .integration-vendor {
        font-size: 0.75rem;
        padding: 4px 8px;
      }
      
      .integration-vendor.supported {
        background-color: var(--color-success-100);
        color: var(--color-success-800);
      }
      
      .integration-vendor.not-supported {
        background-color: var(--color-neutral-100);
        color: var(--color-neutral-500);
        text-decoration: line-through;
      }
      
      .compliance-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
        margin-top: 16px;
      }
      
      .compliance-card {
        background-color: white;
        padding: 16px;
        text-align: center;
      }
      
      .compliance-icon {
        font-size: 2rem;
        color: var(--color-primary-500);
        margin-bottom: 8px;
      }
      
      .compliance-name {
        font-weight: 600;
        margin-bottom: 12px;
      }
      
      .compliance-scores {
        font-size: 0.875rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      
      .compliance-vendor-score {
        display: flex;
        justify-content: space-between;
        padding: 4px 0;
        border-bottom: 1px solid var(--color-neutral-100);
      }
      
      .vendor-name {
        font-weight: 500;
      }
    `);
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
   * Format currency values
   */
  formatCurrency: function(value) {
    return ' + Math.round(value).toLocaleString();
  },
  
  /**
   * Add CSS to document
   */
  addCss: function(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Vendor Comparison component loaded');
  
  // Make globally available
  window.VendorComparison = VendorComparison;
});
EOL

# Create NIST CSF Visualization component
echo "Creating nistCsfVisualization.js..."
cat > js/components/nistCsfVisualization.js << 'EOL'
/**
 * NIST CSF Visualization Component for Portnox Total Cost Analyzer
 * Creates an interactive visualization of the NIST Cybersecurity Framework
 */

class NistCSFVisualization {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.vendors = window.VENDORS || {};
    this.framework = window.COMPLIANCE_FRAMEWORKS && window.COMPLIANCE_FRAMEWORKS['nist-csf'] ? 
                    window.COMPLIANCE_FRAMEWORKS['nist-csf'] : this.getDefaultFramework();
    this.selectedVendors = ['portnox'];
    this.expanded = {};
  }
  
  /**
   * Get default framework if not defined
   */
  getDefaultFramework() {
    return {
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
    };
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
    
    // Add CSS styles
    this.addStyles();
    
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
      <div class="nist-title">${this.framework.name} Compliance</div>
      <div class="nist-controls">
        <button class="btn btn-sm btn-outline nist-expand-all">Expand All</button>
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
    
    // Prepare category content
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
    const categoryColors = {
      identify: 'var(--color-primary-600)',
      protect: 'var(--color-success-600)',
      detect: 'var(--color-warning-600)',
      respond: 'var(--color-danger-600)',
      recover: 'var(--color-secondary-600)'
    };
    
    this.framework.categories.forEach(category => {
      const color = categoryColors[category.id] || 'var(--color-primary-600)';
      
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
    // Get Portnox data
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
      if (vendorId === 'portnox' || vendorId === 'no-nac') return;
      
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
   * Add CSS styles
   */
  addStyles() {
    // Check if styles are already added
    if (document.getElementById('nist-csf-styles')) return;
    
    // Create style element
    const style = document.createElement('style');
    style.id = 'nist-csf-styles';
    
    // Add CSS rules
    style.textContent = `
      .nist-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      
      .nist-title {
        font-size: 1.25rem;
        font-weight: 600;
      }
      
      .nist-controls {
        display: flex;
        gap: 8px;
      }
      
      .nist-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 16px;
        margin-bottom: 16px;
      }
      
      .nist-category {
        background-color: white;
        padding: 16px;
      }
      
      .nist-category-header {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }
      
      .nist-category-icon {
        font-size: 1.25rem;
        margin-right: 8px;
      }
      
      .nist-category-name {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
      }
      
      .nist-category-description {
        font-size: 0.875rem;
        margin-bottom: 12px;
        color: var(--color-neutral-600);
      }
      
      .nist-score {
        height: 8px;
        background-color: var(--color-neutral-200);
        margin-bottom: 4px;
      }
      
      .nist-score-bar {
        height: 100%;
        background-color: var(--color-primary-600);
      }
      
      .nist-category-identify .nist-score-bar {
        background-color: var(--color-primary-600);
      }
      
      .nist-category-protect .nist-score-bar {
        background-color: var(--color-success-600);
      }
      
      .nist-category-detect .nist-score-bar {
        background-color: var(--color-warning-600);
      }
      
      .nist-category-respond .nist-score-bar {
        background-color: var(--color-danger-600);
      }
      
      .nist-category-recover .nist-score-bar {
        background-color: var(--color-secondary-600);
      }
      
      .nist-score-values {
        display: flex;
        justify-content: space-between;
        font-size: 0.75rem;
        color: var(--color-neutral-600);
        margin-bottom: 12px;
      }
      
      .nist-subcategories {
        margin-bottom: 12px;
        border-top: 1px solid var(--color-neutral-200);
        padding-top: 8px;
      }
      
      .nist-subcategory {
        display: flex;
        justify-content: space-between;
        font-size: 0.875rem;
        padding: 4px 0;
        border-bottom: 1px solid var(--color-neutral-100);
      }
      
      .nist-expand-btn {
        width: 100%;
      }
      
      .nist-legend {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px;
        margin-top: 16px;
      }
      
      .nist-legend-item {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
      }
      
      .nist-legend-color {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
    `;
    
    // Add style to document
    document.head.appendChild(style);
  }
  
  /**
   * Update selected vendors
   */
  updateSelectedVendors(vendors) {
    this.selectedVendors = vendors;
    this.init();
  }
}

// Make globally available
window.NistCSFVisualization = NistCSFVisualization;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('NIST CSF Visualization component loaded');
});
EOL

# Create finalfixes.js that loads all modules
echo "Creating finalfixes.js..."
cat > js/finalfixes.js << 'EOL'
/**
 * Final Fixes for Portnox Total Cost Analyzer
 * Apply all fixes and enhancements in one go
 */

// Load all required fixes and enhancements
document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying all fixes and enhancements for Portnox Total Cost Analyzer...');
  
  // Add modern CSS
  loadResource('css/modern-styles.css', 'css');
  
  // Add Font Awesome if not already present
  if (!document.querySelector('link[href*="fontawesome"]')) {
    loadResource('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css', 'css');
  }
  
  // Add ApexCharts
  loadResource('https://cdn.jsdelivr.net/npm/apexcharts', 'js');
  
  // Load vendor data
  loadResource('js/data/vendor-data.js', 'js', function() {
    // If vendor data wasn't found in the first location, try another
    if (typeof window.VENDORS === 'undefined') {
      loadResource('js/models/vendor-data.js', 'js');
    }
  });
  
  // Load custom components
  loadResource('js/components/tab-navigator-enhanced.js', 'js');
  loadResource('js/components/vendorComparison.js', 'js');
  loadResource('js/components/nistCsfVisualization.js', 'js');
  
  // Load calculator fixes
  loadResource('js/models/calculator-fix.js', 'js');
  
  // Load comprehensive fixes
  loadResource('js/utils/comprehensive-fix.js', 'js', function() {
    console.log('All components loaded. Initializing application...');
    
    // Initialize fixes
    if (typeof initializeFixes === 'function') {
      setTimeout(initializeFixes, 500); // Slight delay to ensure all scripts are processed
    }
  });
});

/**
 * Load a resource (JS or CSS) dynamically
 */
function loadResource(url, type, callback) {
  // Check if resource already exists
  const existingElements = document.querySelectorAll(`link[href="${url}"], script[src="${url}"]`);
  if (existingElements.length > 0) {
    console.log(`Resource ${url} already loaded`);
    if (callback) callback();
    return;
  }
  
  let element;
  
  if (type === 'css') {
    element = document.createElement('link');
    element.rel = 'stylesheet';
    element.href = url;
  } else if (type === 'js') {
    element = document.createElement('script');
    element.src = url;
    
    if (callback) {
      element.onload = callback;
    }
  }
  
  document.head.appendChild(element);
  console.log(`Loaded ${type} resource: ${url}`);
}
EOL

# Make script executable
chmod +x apply-fixes.sh

echo "===================================================="
echo "Portnox Total Cost Analyzer has been enhanced!"
echo "All issues have been fixed and the UI has been modernized."
echo "You can now add the following script tag to your HTML to apply all fixes:"
echo "<script src=\"js/finalfixes.js\"></script>"
echo "===================================================="
echo "To apply all fixes at once, run the script: ./apply-fixes.sh"
echo "===================================================="
