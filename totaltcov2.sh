#!/bin/bash

# Portnox Total Cost Analysis Tool - Enhancement Update Script
# This script updates and enhances the Portnox TCO Calculator application
# with improved functionality, fixes, and comprehensive reporting capabilities.

echo "Starting Portnox TCO Calculator Enhancement Update..."
BASEDIR=$(dirname "$0")
cd "$BASEDIR"

# Create backup of current files
echo "Creating backup of current files..."
BACKUP_DIR="./backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r css js img index.html "$BACKUP_DIR"

# Create required directories if they don't exist
echo "Ensuring required directories exist..."
mkdir -p css/enhanced
mkdir -p js/components
mkdir -p js/reports
mkdir -p js/charts
mkdir -p js/managers
mkdir -p js/data
mkdir -p js/utils
mkdir -p img

# Update logo files
echo "Updating Portnox logo files..."
cat > img/portnox-logo.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50">
  <style>.logo-text{fill:#05547C;font-family:Arial,sans-serif;font-weight:bold}.accent{fill:#65BD44}</style>
  <rect x="5" y="10" width="30" height="30" rx="5" fill="#05547C"/>
  <circle cx="20" cy="25" r="8" fill="#65BD44"/>
  <text x="45" y="32" class="logo-text" font-size="20">Portnox</text>
  <path class="accent" d="M45 35 h75" stroke="#65BD44" stroke-width="2"/>
</svg>
EOF

# Create a PNG fallback version using base64 embedded image
cat > img/portnox-logo-base64.js << 'EOF'
// Base64 encoded fallback PNG for Portnox logo
(function() {
  // Create base64 encoded SVG
  const svgLogo = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50"><style>.logo-text{fill:#05547C;font-family:Arial,sans-serif;font-weight:bold}.accent{fill:#65BD44}</style><rect x="5" y="10" width="30" height="30" rx="5" fill="#05547C"/><circle cx="20" cy="25" r="8" fill="#65BD44"/><text x="45" y="32" class="logo-text" font-size="20">Portnox</text><path class="accent" d="M45 35 h75" stroke="#65BD44" stroke-width="2"/></svg>';
  const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(svgLogo);
  
  // Set up a listener to replace broken logo
  document.addEventListener('DOMContentLoaded', function() {
    const logoImg = document.querySelector('.logo img');
    if (logoImg) {
      logoImg.onerror = function() {
        console.log('Logo image failed to load, applying SVG replacement');
        this.onerror = null;
        this.src = svgDataUrl;
      };
    }
    
    // Replace all vendor logos if they fail to load
    document.querySelectorAll('.vendor-card img').forEach(img => {
      img.onerror = function() {
        this.onerror = null;
        // Create a canvas with the vendor name
        const canvas = document.createElement('canvas');
        canvas.width = 150;
        canvas.height = 50;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, 150, 50);
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.alt.replace(' Logo', ''), 75, 25);
        this.src = canvas.toDataURL();
      };
    });
  });
})();
EOF

# Update enhanced branding CSS
echo "Updating enhanced branding CSS..."
cat > css/enhanced/branding.css << 'EOF'
/* Enhanced branding colors for Portnox Total Cost Analysis */
:root {
    --primary-color: #05547C;
    --primary-dark: #033E5B;
    --primary-light: #1B8DC0;
    --accent-color: #65BD44;
    --accent-dark: #4D9132;
    --accent-light: #8ED070;
    --danger-color: #B54369;
    --warning-color: #F7941D;
    --text-primary: #202020;
    --text-secondary: #505050;
    --text-light: #707070;
    --text-white: #FFFFFF;
}

/* Logo adjustments */
.logo img {
  height: 45px;
  width: auto;
  object-fit: contain;
  transition: all 0.2s ease;
}

.logo h1 {
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-left: 15px;
}

/* Update header & button colors */
.app-header {
  border-bottom-color: var(--accent-color);
}

.btn-primary {
  background-color: var(--accent-color);
  border-color: var(--accent-dark);
}

.btn-primary:hover {
  background-color: var(--accent-dark);
}

.tab-button.active {
  color: var(--primary-color);
  border-bottom-color: var(--accent-color);
}

/* Update comparison highlight card */
.comparison-highlight-card {
  background: linear-gradient(135deg, rgba(5, 84, 124, 0.1) 0%, rgba(101, 189, 68, 0.1) 100%);
  border: 1px solid rgba(101, 189, 68, 0.3);
}

.metric-value {
  color: var(--accent-color);
}

.progress {
  background-color: var(--accent-color);
}

/* Benefit icons */
.benefit-icon {
  color: var(--accent-color);
}

.benefit-content h5 {
  color: var(--primary-color);
}

.benefit-metric {
  color: var(--accent-color);
}

/* Enhanced chart colors */
.chart-container {
  --chart-primary: var(--primary-color);
  --chart-secondary: var(--accent-color);
}

/* Vendor cards enhancement */
.vendor-card {
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid var(--border-color);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.vendor-card:hover {
  transform: translateY(-3px);
  border-color: var(--primary-light);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.vendor-card.active {
  border-color: var(--accent-color);
  background-color: rgba(101, 189, 68, 0.05);
}

.vendor-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background-color: var(--accent-color);
  transition: width 0.3s ease;
}

.vendor-card:hover::after {
  width: 100%;
}

.vendor-card.active::after {
  width: 100%;
}

/* Enhanced report styling */
.report-header {
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
  color: white;
  padding: 20px;
  border-radius: 5px 5px 0 0;
}

.report-header h1 {
  margin: 0;
  font-size: 24px;
}

.report-section {
  margin-bottom: 20px;
  padding: 15px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 5px;
}

.report-section h2 {
  color: var(--primary-color);
  border-bottom: 2px solid var(--accent-light);
  padding-bottom: 8px;
  margin-top: 0;
}

.customer-logo {
  max-height: 60px;
  max-width: 200px;
  margin-bottom: 10px;
}
EOF

# Update visuals CSS
echo "Updating enhanced visuals CSS..."
cat > css/enhanced/visuals.css << 'EOF'
/* Enhanced visual styles for Portnox Total Cost Analysis */

/* Dashboard cards with improved shadows and details */
.result-card {
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.result-card:hover {
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.result-card h3 {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 12px;
  margin-bottom: 16px;
  color: var(--primary-color);
  font-weight: 600;
}

/* Chart container styles */
.chart-container {
  padding: 10px 0;
  height: 280px;
  position: relative;
}

/* Key metrics highlight */
.metric-container {
  border-radius: 8px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  margin: 8px 0;
}

.metric-label {
  color: var(--primary-color);
  font-weight: 600;
}

/* Progress bars */
.progress-bar {
  height: 8px;
  background-color: rgba(101, 189, 68, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, rgba(101, 189, 68, 0.8) 0%, rgba(101, 189, 68, 1) 100%);
  border-radius: 4px;
  transition: width 1.5s cubic-bezier(0.12, 0.57, 0.65, 1);
}

/* Better tables */
.data-table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.data-table th {
  background-color: var(--primary-color);
  color: white;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
}

.data-table td {
  padding: 10px 16px;
  border-bottom: 1px solid #eee;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:hover td {
  background-color: rgba(5, 84, 124, 0.03);
}

.data-table .total-row {
  font-weight: 600;
  background-color: rgba(5, 84, 124, 0.05);
}

.data-table .positive-savings {
  color: var(--accent-color);
  font-weight: 600;
}

.data-table .negative-savings {
  color: #dc3545;
  font-weight: 600;
}

/* Enhanced export options */
.export-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 20px 0;
  padding: 16px;
  background-color: rgba(5, 84, 124, 0.03);
  border-radius: 8px;
  align-items: center;
}

.export-options .btn {
  padding: 8px 16px;
}

.export-options select {
  min-width: 180px;
}

/* Compliance and Industry Insights */
.compliance-info-card, .industry-metric, .benchmarks-card {
  background-color: #f8f9fa;
  border-left: 4px solid var(--primary-color);
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 0 6px 6px 0;
}

.compliance-info-card h3, .industry-metric h4, .benchmarks-card h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  border-bottom: none;
  padding-bottom: 4px;
}

.compliance-requirements, .architecture-notes {
  padding-left: 20px;
  margin-top: 12px;
}

.compliance-requirements li, .architecture-notes li {
  margin-bottom: 6px;
  position: relative;
  padding-left: 6px;
}

.compliance-requirements li::before {
  content: "•";
  color: var(--accent-color);
  font-weight: bold;
  position: absolute;
  left: -12px;
}

/* Architecture diagrams */
.architecture-diagram {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  background-color: #f8f9fa;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.05);
}

/* Migration phases */
.migration-phases {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
}

.phase {
  background-color: #fff;
  border-left: 4px solid var(--primary-color);
  border-radius: 0 8px 8px 0;
  padding: 16px;
  display: flex;
  gap: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.phase:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.phase-icon {
  font-size: 2rem;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
}

.phase-content h4 {
  margin-bottom: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-color);
}

.phase-content p {
  color: var(--text-secondary);
  margin-bottom: 0;
  line-height: 1.5;
}

/* Benefit cards */
.benefit-card {
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
  border: 1px solid rgba(101, 189, 68, 0.2);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Success factors */
.success-factors {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.success-factors li {
  padding: 12px 16px;
  background-color: rgba(5, 84, 124, 0.03);
  border-left: 3px solid var(--accent-color);
  border-radius: 0 4px 4px 0;
  margin-bottom: 10px;
}

.success-factors li strong {
  color: var(--primary-color);
  font-weight: 600;
}

/* Improved notifications */
.notification {
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transform: translateY(-20px);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  border-left: 4px solid var(--primary-color);
  width: 100%;
  max-width: 400px;
}

.notification.show {
  transform: translateY(0);
  opacity: 1;
}

/* Feature label improvements */
.feature-legend {
  text-align: center;
  padding: 12px;
  margin-top: 16px;
  background-color: rgba(5, 84, 124, 0.03);
  border-radius: 6px;
}

.feature-note {
  font-style: italic;
  color: var(--text-secondary);
}

/* Loading indicator improvements */
.loading-indicator {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.spinner {
  border-top-color: var(--accent-color);
}

/* Comparison table highlights */
.cloud-benefit {
  position: relative;
  color: var(--accent-color);
  font-weight: 500;
}

.cloud-benefit::before {
  content: "✓";
  color: var(--accent-color);
  font-weight: bold;
  margin-right: 5px;
}

/* Enhanced chart tooltips */
.chartjs-tooltip {
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: white !important;
  border-radius: 4px !important;
  padding: 8px 12px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
  font-family: var(--font-family) !important;
  font-size: 0.9rem !important;
  pointer-events: none !important;
}

/* New tab content transitions */
.tab-pane {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  display: none;
}

.tab-pane.active {
  opacity: 1;
  transform: translateY(0);
  display: block;
}

/* Advanced settings section */
.advanced-settings-section {
  background-color: rgba(5, 84, 124, 0.02);
  border-radius: 8px;
  padding: 16px;
  margin: 20px 0;
  border: 1px solid rgba(5, 84, 124, 0.1);
}

.advanced-settings-section h4 {
  color: var(--primary-color);
  margin-bottom: 15px;
  font-weight: 600;
  font-size: 1.1rem;
}

.cost-factor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
}

.cost-factor {
  background-color: white;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.cost-factor label {
  display: block;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 5px;
}

.cost-factor-tooltip {
  cursor: help;
  color: var(--primary-light);
  margin-left: 4px;
}

.cost-factor input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Responsive enhancements */
@media (max-width: 768px) {
  .chart-container {
    height: 320px;
  }
  
  .phase {
    flex-direction: column;
  }
  
  .phase-icon {
    align-self: flex-start;
    margin-bottom: 10px;
  }
  
  .export-options {
    flex-direction: column;
    align-items: stretch;
  }
  
  .metric-value {
    font-size: 1.6rem;
  }
  
  .cost-factor-grid {
    grid-template-columns: 1fr;
  }
}

/* Comparison cards for Cloud vs On-Premises */
.comparison-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
  padding: 0;
  overflow: hidden;
  margin-bottom: 20px;
}

.comparison-card-header {
  background-color: var(--primary-color);
  color: white;
  padding: 15px 20px;
  font-weight: 600;
  font-size: 1.1rem;
}

.comparison-card-body {
  padding: 20px;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.comparison-item {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.comparison-item-icon {
  width: 40px;
  height: 40px;
  background-color: rgba(5, 84, 124, 0.1);
  color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.comparison-item-content h4 {
  margin: 0 0 5px 0;
  font-size: 1rem;
  color: var(--primary-color);
}

.comparison-item-content p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.comparison-cloud .comparison-item-icon {
  background-color: rgba(101, 189, 68, 0.1);
  color: var(--accent-color);
}

.comparison-cloud h4 {
  color: var(--accent-color);
}

/* Sensitivity analysis enhancements */
.sensitivity-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
  padding: 20px;
  margin-bottom: 20px;
}

.sensitivity-header {
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 15px;
}

.sensitivity-header h3 {
  margin: 0 0 10px 0;
  color: var(--primary-color);
}

.sensitivity-header p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
}

.sensitivity-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.sensitivity-control {
  background-color: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.sensitivity-control label {
  display: block;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 5px;
}

.sensitivity-control select,
.sensitivity-control input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.sensitivity-chart-container {
  height: 400px;
  position: relative;
  margin-bottom: 20px;
  width: 100%;
}

.sensitivity-description {
  background-color: rgba(5, 84, 124, 0.03);
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  border-left: 3px solid var(--primary-color);
}

.sensitivity-description p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.5;
}

.breakeven-analysis {
  background-color: rgba(101, 189, 68, 0.05);
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  border-left: 3px solid var(--accent-color);
}

.breakeven-title {
  color: var(--accent-color);
  font-weight: 600;
  margin-bottom: 10px;
}

.breakeven-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.breakeven-item {
  background-color: white;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.breakeven-vendor {
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 5px;
}

.breakeven-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 5px;
}

.breakeven-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
}
EOF

# Update sensitivity CSS
echo "Creating sensitivity analysis CSS..."
cat > css/enhanced/sensitivity.css << 'EOF'
/* Enhanced styling for sensitivity analysis */

.sensitivity-container {
  display: flex;
  flex: 1;
  padding: var(--spacing-xl);
  gap: var(--spacing-xl);
}

.parameter-card,
.instructions-card {
  background-color: var(--bg-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  transition: all 0.3s ease;
}

.parameter-card:hover,
.instructions-card:hover {
  box-shadow: var(--shadow-md);
}

.parameter-card h3,
.instructions-card h3 {
  margin-bottom: var(--spacing-md);
  color: var(--primary-color);
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 10px;
}

.parameter-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: var(--spacing-md) 0;
  padding: var(--spacing-sm);
  background-color: rgba(5, 84, 124, 0.05);
  border-left: 3px solid var(--primary-color);
  border-radius: 0 4px 4px 0;
}

.instructions-card ol {
  padding-left: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.instructions-card li {
  margin-bottom: var(--spacing-xs);
  position: relative;
}

.instructions-card p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
}

#sensitivity-btn {
  width: 100%;
  padding: var(--spacing-md);
  margin-top: var(--spacing-md);
  font-weight: 600;
  transition: all 0.3s ease;
}

#sensitivity-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.scenario-controls {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.scenario-controls button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.scenarios-card {
  margin-bottom: var(--spacing-md);
}

.scenarios-grid {
  display: grid;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.scenario-item {
  background-color: var(--bg-light);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md);
  border-left: 3px solid var(--primary-color);
  transition: all 0.2s ease;
}

.scenario-item:hover {
  background-color: rgba(5, 84, 124, 0.05);
}

.scenario-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.scenario-name {
  font-weight: 600;
  color: var(--primary-color);
}

.scenario-actions {
  display: flex;
  gap: var(--spacing-xs);
}

.scenario-actions button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.scenario-actions button:hover {
  color: var(--primary-color);
}

.scenario-details {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.scenario-breakeven {
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
}

.breakeven-info {
  color: var(--accent-color);
  font-weight: 600;
  margin-bottom: 2px;
}

.breakeven-card {
  margin-bottom: var(--spacing-md);
  border-left: 4px solid var(--accent-color);
}

.breakeven-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
  margin: var(--spacing-md) 0;
}

.breakeven-item {
  background-color: var(--bg-light);
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
}

.breakeven-vendor {
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
}

.breakeven-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: var(--spacing-xs);
}

.breakeven-explanation {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.breakeven-note {
  font-style: italic;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.breakeven-row {
  background-color: rgba(5, 84, 124, 0.05);
}

.best-value {
  color: var(--accent-color);
  font-weight: 600;
}

/* Enhanced chart styles for sensitivity analysis */
.sensitivity-charts {
  display: grid;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-wrapper {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.chart-title {
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.chart-description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.sensitivity-insights {
  background-color: rgba(5, 84, 124, 0.03);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid rgba(5, 84, 124, 0.1);
}

.sensitivity-insights h4 {
  color: var(--primary-color);
  margin-bottom: 10px;
  font-weight: 600;
}

.sensitivity-insight-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.sensitivity-insight-icon {
  color: var(--accent-color);
  flex-shrink: 0;
  margin-top: 3px;
}

.sensitivity-insight-text {
  flex: 1;
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.threshold-line {
  position: absolute;
  border-left: 2px dashed var(--accent-color);
  height: 100%;
  z-index: 1;
}

.threshold-label {
  position: absolute;
  background-color: var(--accent-color);
  color: white;
  font-size: 0.8rem;
  padding: 3px 8px;
  border-radius: 4px;
  top: 10px;
  transform: translateX(-50%);
  white-space: nowrap;
}

/* Responsive adjustments */
@media (max-width: 1100px) {
  .sensitivity-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
  }
  
  .scenario-controls {
    flex-direction: column;
  }
  
  .sensitivity-charts {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .options-grid {
    grid-template-columns: 1fr;
  }
  
  .breakeven-grid {
    grid-template-columns: 1fr;
  }
}
EOF

# Update advanced cost configuration component
echo "Creating advanced cost configuration component..."
cat > js/components/cost-configuration.js << 'EOF'
/**
 * Cost Configuration Manager
 * Handles advanced cost configuration settings
 */
class CostConfigurationManager {
  constructor() {
    this.defaultValues = {
      // Hardware cost multipliers by vendor
      hardwareCostMultipliers: {
        cisco: 1.0,
        aruba: 1.0,
        forescout: 1.0,
        nps: 0.8,
        fortinac: 0.9,
        securew2: 0.7,
        portnox: 0.0 // Cloud solution - no hardware
      },
      
      // Licensing cost multipliers
      licensingCostMultipliers: {
        cisco: 1.0,
        aruba: 0.95,
        forescout: 1.1,
        nps: 0.7,
        fortinac: 0.85,
        securew2: 0.8,
        portnox: 0.75
      },
      
      // Maintenance cost multipliers
      maintenanceCostMultipliers: {
        cisco: 1.0,
        aruba: 0.95,
        forescout: 1.05,
        nps: 0.8,
        fortinac: 0.9,
        securew2: 0.85,
        portnox: 0.7
      },
      
      // Implementation cost multipliers
      implementationCostMultipliers: {
        cisco: 1.0,
        aruba: 0.9,
        forescout: 1.1,
        nps: 0.85,
        fortinac: 0.95,
        securew2: 0.8,
        portnox: 0.6
      },
      
      // Training cost multipliers
      trainingCostMultipliers: {
        cisco: 1.0,
        aruba: 0.95,
        forescout: 1.05,
        nps: 0.9,
        fortinac: 0.95,
        securew2: 0.85,
        portnox: 0.7
      },
      
      // FTE salaries
      fteSalaries: {
        networkAdmin: 120000,
        securityAdmin: 135000,
        systemAdmin: 110000,
        helpDesk: 75000
      },
      
      // Downtime costs
      downtimeCost: 5000 // $ per hour
    };
    
    // Initialize the UI
    this.initUI();
  }
  
  /**
   * Initialize the UI components for cost configuration
   */
  initUI() {
    // Check if the custom costs section exists
    const customCostsSection = document.getElementById('custom-costs-section');
    if (!customCostsSection) {
      // Create the custom costs section if it doesn't exist
      this.createCustomCostsSection();
    }
    
    // Add event listener to show/hide custom costs section
    const advancedOptionsToggle = document.querySelector('.advanced-options-toggle');
    if (advancedOptionsToggle) {
      const customCostsToggle = document.createElement('button');
      customCostsToggle.type = 'button';
      customCostsToggle.className = 'btn btn-text';
      customCostsToggle.setAttribute('aria-expanded', 'false');
      customCostsToggle.setAttribute('aria-controls', 'custom-costs-section');
      customCostsToggle.innerHTML = '<i class="fas fa-angle-down"></i> Cost Configuration';
      
      customCostsToggle.addEventListener('click', function() {
        const panel = document.getElementById('custom-costs-section');
        if (panel) {
          const isHidden = panel.classList.toggle('hidden');
          this.setAttribute('aria-expanded', !isHidden);
          
          // Toggle icon
          const icon = this.querySelector('i');
          if (icon) {
            icon.classList.toggle('fa-angle-down', isHidden);
            icon.classList.toggle('fa-angle-up', !isHidden);
          }
        }
      });
      
      advancedOptionsToggle.appendChild(customCostsToggle);
    }
    
    // Initialize tooltips if available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
    
    // Add event listeners to cost factor inputs
    document.querySelectorAll('[data-cost-factor]').forEach(input => {
      input.addEventListener('change', this.handleCostFactorChange.bind(this));
    });
  }
  
  /**
   * Create the custom costs section
   */
  createCustomCostsSection() {
    // Find the location to add the custom costs section
    const organizationInputs = document.getElementById('organization-inputs');
    if (!organizationInputs) return;
    
    // Create the custom costs section
    const customCostsSection = document.createElement('div');
    customCostsSection.id = 'custom-costs-section';
    customCostsSection.className = 'advanced-settings-section hidden';
    
    // Add section title
    const title = document.createElement('h4');
    title.textContent = 'Advanced Cost Configuration';
    customCostsSection.appendChild(title);
    
    // Add description
    const description = document.createElement('p');
    description.textContent = 'Fine-tune cost factors to match your specific environment.';
    description.style.marginBottom = '15px';
    customCostsSection.appendChild(description);
    
    // Create cost multipliers section
    customCostsSection.appendChild(this.createCostMultipliersSection());
    
    // Create FTE costs section
    customCostsSection.appendChild(this.createFTECostsSection());
    
    // Create downtime costs section
    customCostsSection.appendChild(this.createDowntimeCostsSection());
    
    // Add the custom costs section after the organization inputs
    organizationInputs.parentNode.insertBefore(customCostsSection, organizationInputs.nextSibling);
  }
  
  /**
   * Create the cost multipliers section
   */
  createCostMultipliersSection() {
    const section = document.createElement('div');
    
    // Add section title
    const title = document.createElement('h5');
    title.textContent = 'Cost Multipliers';
    section.appendChild(title);
    
    // Add description
    const description = document.createElement('p');
    description.textContent = 'Adjust multipliers to reflect your cost structure. Default value: 1.0';
    description.style.fontSize = '0.9rem';
    description.style.marginBottom = '15px';
    section.appendChild(description);
    
    // Create cost factors grid
    const grid = document.createElement('div');
    grid.className = 'cost-factor-grid';
    
    // Add hardware cost multiplier
    grid.appendChild(this.createCostFactorInput(
      'custom-hardware-cost',
      'Hardware Cost Multiplier',
      '1.0',
      'Adjust the hardware acquisition cost across all vendors.'
    ));
    
    // Add licensing cost multiplier
    grid.appendChild(this.createCostFactorInput(
      'custom-licensing-cost',
      'Licensing Cost Multiplier',
      '1.0',
      'Adjust the software licensing cost across all vendors.'
    ));
    
    // Add maintenance cost multiplier
    grid.appendChild(this.createCostFactorInput(
      'custom-maintenance-cost',
      'Maintenance Cost Multiplier',
      '1.0',
      'Adjust the annual maintenance cost across all vendors.'
    ));
    
    // Add implementation cost multiplier
    grid.appendChild(this.createCostFactorInput(
      'custom-implementation-cost',
      'Implementation Cost Multiplier',
      '1.0',
      'Adjust the professional services cost for implementation.'
    ));
    
    // Add training cost multiplier
    grid.appendChild(this.createCostFactorInput(
      'training-cost-multiplier',
      'Training Cost Multiplier',
      '1.0',
      'Adjust the cost for staff training across all vendors.'
    ));
    
    section.appendChild(grid);
    return section;
  }
  
  /**
   * Create the FTE costs section
   */
  createFTECostsSection() {
    const section = document.createElement('div');
    section.style.marginTop = '20px';
    
    // Add section title
    const title = document.createElement('h5');
    title.textContent = 'Personnel Costs';
    section.appendChild(title);
    
    // Add description
    const description = document.createElement('p');
    description.textContent = 'Customize yearly salaries for different IT roles.';
    description.style.fontSize = '0.9rem';
    description.style.marginBottom = '15px';
    section.appendChild(description);
    
    // Create cost factors grid
    const grid = document.createElement('div');
    grid.className = 'cost-factor-grid';
    
    // Add Network Admin salary
    grid.appendChild(this.createCostFactorInput(
      'network-admin-salary',
      'Network Admin Salary',
      '120000',
      'Annual fully-loaded cost for Network Administrators.'
    ));
    
    // Add Security Admin salary
    grid.appendChild(this.createCostFactorInput(
      'security-admin-salary',
      'Security Admin Salary',
      '135000',
      'Annual fully-loaded cost for Security Administrators.'
    ));
    
    // Add System Admin salary
    grid.appendChild(this.createCostFactorInput(
      'system-admin-salary',
      'System Admin Salary',
      '110000',
      'Annual fully-loaded cost for System Administrators.'
    ));
    
    // Add Help Desk salary
    grid.appendChild(this.createCostFactorInput(
      'helpdesk-salary',
      'Help Desk Salary',
      '75000',
      'Annual fully-loaded cost for Help Desk personnel.'
    ));
    
    section.appendChild(grid);
    return section;
  }
  
  /**
   * Create the downtime costs section
   */
  createDowntimeCostsSection() {
    const section = document.createElement('div');
    section.style.marginTop = '20px';
    
    // Add section title
    const title = document.createElement('h5');
    title.textContent = 'Downtime Costs';
    section.appendChild(title);
    
    // Add description
    const description = document.createElement('p');
    description.textContent = 'Set the hourly cost of network downtime for your organization.';
    description.style.fontSize = '0.9rem';
    description.style.marginBottom = '15px';
    section.appendChild(description);
    
    // Create cost factors grid
    const grid = document.createElement('div');
    grid.className = 'cost-factor-grid';
    
    // Add downtime cost
    grid.appendChild(this.createCostFactorInput(
      'downtime-cost',
      'Cost per Hour of Downtime',
      '5000',
      'Estimated cost per hour when the network is unavailable.'
    ));
    
    section.appendChild(grid);
    return section;
  }
  
  /**
   * Create a cost factor input
   */
  createCostFactorInput(id, label, defaultValue, tooltip) {
    const container = document.createElement('div');
    container.className = 'cost-factor';
    
    // Create label with tooltip
    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', id);
    labelElement.textContent = label;
    
    if (tooltip) {
      const tooltipIcon = document.createElement('i');
      tooltipIcon.className = 'fas fa-info-circle cost-factor-tooltip';
      tooltipIcon.setAttribute('data-bs-toggle', 'tooltip');
      tooltipIcon.setAttribute('data-bs-placement', 'top');
      tooltipIcon.setAttribute('title', tooltip);
      
      labelElement.appendChild(tooltipIcon);
    }
    
    container.appendChild(labelElement);
    
    // Create input
    const input = document.createElement('input');
    input.type = 'number';
    input.id = id;
    input.name = id;
    input.className = 'form-control';
    input.value = defaultValue;
    input.min = '0';
    input.step = '0.01';
    input.setAttribute('data-cost-factor', id);
    
    container.appendChild(input);
    
    return container;
  }
  
  /**
   * Handle cost factor change
   */
  handleCostFactorChange(event) {
    const input = event.target;
    const factor = input.getAttribute('data-cost-factor');
    const value = parseFloat(input.value);
    
    if (isNaN(value) || value < 0) {
      input.value = this.getDefaultValue(factor);
      return;
    }
    
    // Run calculation if calculator is available
    if (window.calculator && typeof window.calculator.calculate === 'function') {
      window.calculator.calculate();
    }
  }
  
  /**
   * Get default value for a cost factor
   */
  getDefaultValue(factor) {
    switch (factor) {
      case 'custom-hardware-cost':
      case 'custom-licensing-cost':
      case 'custom-maintenance-cost':
      case 'custom-implementation-cost':
      case 'training-cost-multiplier':
        return '1.0';
      case 'network-admin-salary':
        return '120000';
      case 'security-admin-salary':
        return '135000';
      case 'system-admin-salary':
        return '110000';
      case 'helpdesk-salary':
        return '75000';
      case 'downtime-cost':
        return '5000';
      default:
        return '1.0';
    }
  }
  
  /**
   * Get the current value for a cost factor
   */
  getCostFactorValue(factor) {
    const input = document.getElementById(factor);
    if (input) {
      return parseFloat(input.value) || this.getDefaultValue(factor);
    }
    return this.getDefaultValue(factor);
  }
  
  /**
   * Reset all cost factors to default values
   */
  resetToDefaults() {
    document.querySelectorAll('[data-cost-factor]').forEach(input => {
      const factor = input.getAttribute('data-cost-factor');
      input.value = this.getDefaultValue(factor);
    });
    
    // Run calculation if calculator is available
    if (window.calculator && typeof window.calculator.calculate === 'function') {
      window.calculator.calculate();
    }
    
    // Show notification if available
    if (window.notificationManager) {
      window.notificationManager.success('Cost factors reset to default values');
    }
  }
}

// Initialize and make globally available
window.costConfigurationManager = new CostConfigurationManager();
EOF

# Update enhanced sensitivity analyzer component
echo "Creating enhanced sensitivity analyzer component..."
cat > js/components/enhanced-sensitivity.js << 'EOF'
/**
 * Enhanced Sensitivity Analysis Component
 * Provides more configurable options and improved visualizations
 */
class EnhancedSensitivityAnalyzer {
  constructor() {
    this.results = null;
    this.analyzing = false;
    this.charts = {};
    this.scenarios = [];
    
    // Reference to calculator
    this.calculator = window.calculator;
    
    // Chart colors
    this.chartColors = window.chartBuilder ? window.chartBuilder.chartColors : {
      cisco: '#049fd9',
      aruba: '#ff8300',
      forescout: '#005daa',
      nps: '#00a4ef',
      fortinac: '#ee3124',
      securew2: '#8bc53f',
      portnox: '#2bd25b',
      neutral: '#888888'
    };
    
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Run button click handler
    const sensitivityBtn = document.getElementById('sensitivity-btn');
    if (sensitivityBtn) {
      sensitivityBtn.addEventListener('click', () => {
        this.analyze();
      });
    }
    
    // Variable selector change handler
    const variableSelect = document.getElementById('param-variable');
    if (variableSelect) {
      variableSelect.addEventListener('change', () => {
        this.updateRangeDefaults(variableSelect.value);
      });
    }
    
    // Add scenario button click handler
    const addScenarioBtn = document.getElementById('add-scenario-btn');
    if (addScenarioBtn) {
      addScenarioBtn.addEventListener('click', () => {
        this.addCurrentScenario();
      });
    }
    
    // Clear scenarios button click handler
    const clearScenariosBtn = document.getElementById('clear-scenarios-btn');
    if (clearScenariosBtn) {
      clearScenariosBtn.addEventListener('click', () => {
        this.clearScenarios();
      });
    }
    
    // Export buttons
    const exportCsvBtn = document.getElementById('export-sensitivity-csv-btn');
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => {
        this.exportToCSV();
      });
    }
    
    const exportPdfBtn = document.getElementById('export-sensitivity-pdf-btn');
    if (exportPdfBtn) {
      exportPdfBtn.addEventListener('click', () => {
        this.exportToPDF();
      });
    }
  }
  
  updateRangeDefaults(variable) {
    const minInput = document.getElementById('param-min');
    const maxInput = document.getElementById('param-max');
    const stepsInput = document.getElementById('param-steps');
    
    if (!minInput || !maxInput || !stepsInput) return;
    
    // Get current form values for dynamic ranges
    const deviceCount = parseInt(document.getElementById('device-count')?.value) || 1000;
    const legacyPercentage = parseInt(document.getElementById('legacy-percentage')?.value) || 10;
    const locationCount = parseInt(document.getElementById('location-count')?.value) || 2;
    const yearsToProject = parseInt(document.getElementById('years-to-project')?.value) || 3;
    
    switch (variable) {
      case 'deviceCount':
        minInput.value = Math.max(Math.floor(deviceCount * 0.5), 100);
        maxInput.value = Math.ceil(deviceCount * 2);
        stepsInput.value = '10';
        break;
      case 'legacyPercentage':
        minInput.value = '0';
        maxInput.value = '100';
        stepsInput.value = '11';
        break;
      case 'locationCount':
        minInput.value = '1';
        maxInput.value = Math.max(locationCount * 3, 20);
        stepsInput.value = '10';
        break;
      case 'yearsToProject':
        minInput.value = '1';
        maxInput.value = '10';
        stepsInput.value = '10';
        break;
      case 'hardwareCost':
      case 'licensingCost':
      case 'maintenanceCost':
      case 'fteCost':
      case 'implementationCost':
        minInput.value = '0.5';
        maxInput.value = '2.0';
        stepsInput.value = '7';
        break;
      case 'downtimeCost':
        minInput.value = '1000';
        maxInput.value = '10000';
        stepsInput.value = '10';
        break;
      default:
        minInput.value = '0';
        maxInput.value = '100';
        stepsInput.value = '10';
    }
    
    // Update parameter description
    this.updateParameterDescription(variable);
  }
  
  updateParameterDescription(variable) {
    const descriptionElement = document.getElementById('parameter-description');
    if (!descriptionElement) return;
    
    const descriptions = {
      deviceCount: 'Analyze how changes in the total number of devices affect TCO and relative savings. More devices typically increase hardware and licensing costs for on-premises solutions.',
      legacyPercentage: 'Evaluate the impact of legacy device percentages on overall costs. Legacy devices often require additional security measures and management overhead.',
      locationCount: 'Assess how distributed deployments across multiple locations affect total costs. On-premises solutions typically require hardware at each location.',
      yearsToProject: 'Compare short-term vs. long-term TCO projections. Cloud solutions often show higher relative savings over longer time periods.',
      hardwareCost: 'Test sensitivity to hardware cost changes, such as price increases or discounts. This primarily affects on-premises deployments.',
      licensingCost: 'Analyze how licensing cost variations affect overall TCO. Both cloud and on-premises solutions include licensing costs.',
      maintenanceCost: 'Evaluate the impact of maintenance cost changes on long-term TCO. On-premises solutions typically have higher maintenance requirements.',
      implementationCost: 'Assess how implementation cost factors affect initial deployment expenses. Complex deployments increase professional services costs.',
      fteCost: 'Test sensitivity to changes in IT staffing costs or allocation. On-premises solutions typically require more IT staff time.',
      downtimeCost: 'Analyze how the cost of downtime affects overall TCO. Different solutions have varying reliability characteristics.'
    };
    
    descriptionElement.textContent = descriptions[variable] || 'Analyze how changes in this parameter affect the total cost of ownership and potential savings.';
  }
  
  analyze() {
    if (this.analyzing) {
      console.log('Analysis already in progress');
      return;
    }
    
    this.analyzing = true;
    this.showLoading();
    
    try {
      // Get input parameters
      const variableToAnalyze = document.getElementById('param-variable').value;
      const vendorToAnalyze = document.getElementById('param-vendor').value;
      const minValue = parseFloat(document.getElementById('param-min').value);
      const maxValue = parseFloat(document.getElementById('param-max').value);
      const steps = parseInt(document.getElementById('param-steps').value);
      
      console.log(`Running sensitivity analysis for ${variableToAnalyze}, vendor: ${vendorToAnalyze}, range: ${minValue}-${maxValue}, steps: ${steps}`);
      
      // Validate inputs
      if (isNaN(minValue) || isNaN(maxValue) || isNaN(steps)) {
        throw new Error('Invalid input parameters');
      }
      
      if (minValue >= maxValue) {
        throw new Error('Maximum value must be greater than minimum value');
      }
      
      if (steps < 2 || steps > 20) {
        throw new Error('Number of steps must be between 2 and 20');
      }
      
      // Get additional analysis options
      const includeBreakeven = document.getElementById('include-breakeven')?.checked || false;
      const compareToNoNAC = document.getElementById('compare-to-no-nac')?.checked || false;
      
      // Generate data points
      const stepSize = (maxValue - minValue) / (steps - 1);
      const dataPoints = Array.from({length: steps}, (_, i) => minValue + (i * stepSize));
      
      // Run analysis for each data point
      const analysisResults = {
        variable: variableToAnalyze,
        vendor: vendorToAnalyze,
        minValue,
        maxValue,
        steps,
        dataPoints,
        results: [],
        includeBreakeven,
        compareToNoNAC
      };
      
      // Keep a copy of the original form values
      const originalValues = this.saveOriginalValues();
      
      // For each data point, calculate TCO by modifying the relevant form value
      dataPoints.forEach(dataPoint => {
        // Set the form value for the variable being analyzed
        this.setVariableValue(variableToAnalyze, dataPoint);
        
        // Calculate TCO for this data point
        const calculationResults = this.runCalculation();
        
        // Store results
        analysisResults.results.push({
          dataPoint,
          calculationResults
        });
      });
      
      // Calculate breakeven values if requested
      if (includeBreakeven) {
        analysisResults.breakevenPoints = this.calculateBreakevenPoints(analysisResults);
      }
      
      // Restore original form values
      this.restoreOriginalValues(originalValues);
      
      // Save results
      this.results = analysisResults;
      
      // Update UI with results
      this.updateUI();
      
      // Hide loading indicator
      this.hideLoading();
      this.analyzing = false;
      
      return analysisResults;
    } catch (error) {
      console.error("Error in sensitivity analysis:", error);
      
      // Hide loading indicator
      this.hideLoading();
      this.analyzing = false;
      
      // Show error message
      this.showError("Error in sensitivity analysis: " + error.message);
      
      return null;
    }
  }
  
  calculateBreakevenPoints(analysisResults) {
    const breakevenPoints = {};
    
    // Only calculate if comparing to Portnox
    if (analysisResults.vendor !== 'portnox' && analysisResults.vendor !== 'all') {
      const results = analysisResults.results;
      
      // Find where the lines cross (TCO becomes equal)
      for (let i = 0; i < results.length - 1; i++) {
        const current = results[i];
        const next = results[i + 1];
        
        const currentVendorTCO1 = current.calculationResults[analysisResults.vendor]?.totalTCO || 0;
        const portnoxTCO1 = current.calculationResults['portnox']?.totalTCO || 0;
		# Continuing the enhanced-sensitivity.js file:
cat >> js/components/enhanced-sensitivity.js << 'EOF'
  
  saveOriginalValues() {
    return {
      deviceCount: document.getElementById('device-count')?.value,
      legacyPercentage: document.getElementById('legacy-percentage')?.value,
      locationCount: document.getElementById('location-count')?.value,
      yearsToProject: document.getElementById('years-to-project')?.value,
      customHardwareCost: document.getElementById('custom-hardware-cost')?.value,
      customLicensingCost: document.getElementById('custom-licensing-cost')?.value,
      customMaintenanceCost: document.getElementById('custom-maintenance-cost')?.value,
      customImplementationCost: document.getElementById('custom-implementation-cost')?.value,
      trainingCostMultiplier: document.getElementById('training-cost-multiplier')?.value,
      downtimeCost: document.getElementById('downtime-cost')?.value
    };
  }
  
  restoreOriginalValues(originalValues) {
    if (originalValues.deviceCount)
      document.getElementById('device-count').value = originalValues.deviceCount;
      
    if (originalValues.legacyPercentage)
      document.getElementById('legacy-percentage').value = originalValues.legacyPercentage;
      
    if (originalValues.locationCount)
      document.getElementById('location-count').value = originalValues.locationCount;
      
    if (originalValues.yearsToProject)
      document.getElementById('years-to-project').value = originalValues.yearsToProject;
      
    if (originalValues.customHardwareCost && document.getElementById('custom-hardware-cost'))
      document.getElementById('custom-hardware-cost').value = originalValues.customHardwareCost;
      
    if (originalValues.customLicensingCost && document.getElementById('custom-licensing-cost'))
      document.getElementById('custom-licensing-cost').value = originalValues.customLicensingCost;
      
    if (originalValues.customMaintenanceCost && document.getElementById('custom-maintenance-cost'))
      document.getElementById('custom-maintenance-cost').value = originalValues.customMaintenanceCost;
      
    if (originalValues.customImplementationCost && document.getElementById('custom-implementation-cost'))
      document.getElementById('custom-implementation-cost').value = originalValues.customImplementationCost;
      
    if (originalValues.trainingCostMultiplier && document.getElementById('training-cost-multiplier'))
      document.getElementById('training-cost-multiplier').value = originalValues.trainingCostMultiplier;
      
    if (originalValues.downtimeCost && document.getElementById('downtime-cost'))
      document.getElementById('downtime-cost').value = originalValues.downtimeCost;
  }
  
  setVariableValue(variable, value) {
    switch (variable) {
      case 'deviceCount':
        document.getElementById('device-count').value = Math.round(value);
        break;
      case 'legacyPercentage':
        document.getElementById('legacy-percentage').value = Math.round(value);
        if (value > 0) {
          document.getElementById('legacy-devices').checked = true;
        }
        break;
      case 'locationCount':
        document.getElementById('location-count').value = Math.round(value);
        if (value > 1) {
          document.getElementById('multiple-locations').checked = true;
        }
        break;
      case 'yearsToProject':
        document.getElementById('years-to-project').value = Math.round(value);
        break;
      case 'hardwareCost':
        if (document.getElementById('custom-hardware-cost')) {
          document.getElementById('custom-hardware-cost').value = value.toFixed(2);
        }
        break;
      case 'licensingCost':
        if (document.getElementById('custom-licensing-cost')) {
          document.getElementById('custom-licensing-cost').value = value.toFixed(2);
        }
        break;
      case 'maintenanceCost':
        if (document.getElementById('custom-maintenance-cost')) {
          document.getElementById('custom-maintenance-cost').value = value.toFixed(2);
        }
        break;
      case 'implementationCost':
        if (document.getElementById('custom-implementation-cost')) {
          document.getElementById('custom-implementation-cost').value = value.toFixed(2);
        }
        break;
      case 'fteCost':
        if (document.getElementById('network-admin-salary')) {
          const baseSalary = 120000;
          document.getElementById('network-admin-salary').value = Math.round(baseSalary * value);
          document.getElementById('security-admin-salary').value = Math.round(135000 * value);
          document.getElementById('system-admin-salary').value = Math.round(110000 * value);
          document.getElementById('helpdesk-salary').value = Math.round(75000 * value);
        }
        break;
      case 'downtimeCost':
        if (document.getElementById('downtime-cost')) {
          document.getElementById('downtime-cost').value = Math.round(value);
        }
        break;
      default:
        console.warn(`Unknown variable: ${variable}`);
    }
  }
  
  runCalculation() {
    if (!this.calculator) {
      console.error("Calculator not available");
      return null;
    }
    
    try {
      // Get values from form
      const deviceCount = parseInt(document.getElementById('device-count').value) || 1000;
      const orgSize = document.getElementById('organization-size').value;
      const yearsToProject = parseInt(document.getElementById('years-to-project').value) || 3;
      const currentVendor = window.uiController ? window.uiController.activeVendor : 'cisco';
      
      // Calculate TCO for all vendors directly, without updating UI
      const tcoResults = {};
      
      Object.keys(window.vendorData).forEach(vendor => {
        const result = this.calculator.calculateVendorTCO(vendor, currentVendor, orgSize, deviceCount, yearsToProject);
        tcoResults[vendor] = result;
      });
      
      // Add metadata to results
      tcoResults.yearsToProject = yearsToProject;
      tcoResults.deviceCount = deviceCount;
      tcoResults.orgSize = orgSize;
      
      return tcoResults;
    } catch (error) {
      console.error("Error in calculation:", error);
      return null;
    }
  }
  
  updateUI() {
    if (!this.results) {
      console.warn("No analysis results available");
      return;
    }
    
    // Update sensitivity chart
    this.updateSensitivityChart();
    
    // Update savings impact chart
    this.updateSavingsImpactChart();
    
    // Update data table
    this.updateDataTable();
    
    // Update breakeven analysis if available
    if (this.results.includeBreakeven && this.results.breakevenPoints) {
      this.updateBreakevenAnalysis();
    }
    
    // Add or update insights section
    this.updateInsightsSection();
    
    // Show success message
    this.showSuccess("Sensitivity analysis completed successfully");
  }
  
  updateSensitivityChart() {
    const ctx = document.getElementById('sensitivity-chart');
    if (!ctx) {
      console.warn('Sensitivity chart canvas element not found');
      return;
    }
    
    // Prepare chart data
    const labels = this.results.dataPoints.map(dp => this.formatDataPoint(this.results.variable, dp));
    
    const datasets = [];
    const vendors = this.results.vendor === 'all' ? 
      Object.keys(window.vendorData) : 
      [this.results.vendor];
    
    // Add vendor datasets
    vendors.forEach(vendor => {
      const vendorName = window.vendorData[vendor]?.name || vendor;
      const vendorColor = this.chartColors[vendor] || this.chartColors.neutral;
      
      const data = this.results.results.map(result => {
        return result.calculationResults[vendor]?.totalTCO || 0;
      });
      
      datasets.push({
        label: vendorName,
        data: data,
        backgroundColor: vendorColor + '40',
        borderColor: vendorColor,
        borderWidth: 2,
        fill: false,
        tension: 0.1
      });
    });
    
    // Create annotations object for breakeven points
    const annotations = {};
    
    // Add breakeven markers if available
    if (this.results.includeBreakeven && this.results.breakevenPoints) {
      Object.entries(this.results.breakevenPoints).forEach(([vendor, point], index) => {
        // Find the position in the X-axis array
        const positionIndex = this.findClosestDataPointIndex(point.value);
        if (positionIndex !== -1) {
          annotations[`breakeven-${vendor}`] = {
            type: 'line',
            xMin: positionIndex,
            xMax: positionIndex,
            borderColor: 'rgba(255, 0, 0, 0.5)',
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              content: `${window.vendorData[vendor]?.name || vendor} Breakeven`,
              enabled: true,
              position: 'top',
              backgroundColor: 'rgba(255, 0, 0, 0.7)',
              font: {
                size: 10
              }
            }
          };
        }
      });
    }
    
    // Create or update chart
    if (this.charts.sensitivity) {
      this.charts.sensitivity.data.labels = labels;
      this.charts.sensitivity.data.datasets = datasets;
      
      // Update annotations if they exist
      if (this.charts.sensitivity.options.plugins.annotation) {
        this.charts.sensitivity.options.plugins.annotation.annotations = annotations;
      }
      
      this.charts.sensitivity.update();
    } else {
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Cost of Ownership ($)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          },
          x: {
            title: {
              display: true,
              text: this.getVariableLabel(this.results.variable)
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: `TCO Sensitivity to ${this.getVariableLabel(this.results.variable)}`,
            font: {
              size: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + window.formatCurrency(context.parsed.y);
              }
            }
          },
          legend: {
            position: 'bottom'
          }
        }
      };
      
      // Add annotation plugin if breakeven points available
      if (this.results.includeBreakeven && Object.keys(annotations).length > 0) {
        chartOptions.plugins.annotation = {
          annotations: annotations
        };
      }
      
      this.charts.sensitivity = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: chartOptions
      });
    }
  }
  
  findClosestDataPointIndex(value) {
    if (!this.results || !this.results.dataPoints) return -1;
    
    const dataPoints = this.results.dataPoints;
    let closestIndex = -1;
    let minDiff = Number.MAX_VALUE;
    
    dataPoints.forEach((point, index) => {
      const diff = Math.abs(point - value);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });
    
    return closestIndex;
  }
  
  updateSavingsImpactChart() {
    const ctx = document.getElementById('savings-impact-chart');
    if (!ctx) {
      console.warn('Savings impact chart canvas element not found');
      return;
    }
    
    // Only relevant when comparing to Portnox
    if (!window.vendorData.portnox) {
      return;
    }
    
    // Prepare chart data
    const labels = this.results.dataPoints.map(dp => this.formatDataPoint(this.results.variable, dp));
    
    const datasets = [];
    const vendors = this.results.vendor === 'all' ? 
      Object.keys(window.vendorData).filter(v => v !== 'portnox') : 
      [this.results.vendor];
    
    vendors.forEach(vendor => {
      // Skip Portnox as we're calculating savings vs. Portnox
      if (vendor === 'portnox') return;
      
      const vendorName = window.vendorData[vendor]?.name || vendor;
      const vendorColor = this.chartColors[vendor] || this.chartColors.neutral;
      
      const data = this.results.results.map(result => {
        const vendorTCO = result.calculationResults[vendor]?.totalTCO || 0;
        const portnoxTCO = result.calculationResults['portnox']?.totalTCO || 0;
        return vendorTCO > 0 && portnoxTCO > 0 ? 
          ((vendorTCO - portnoxTCO) / vendorTCO) * 100 : 0;
      });
      
      datasets.push({
        label: `Savings vs. ${vendorName}`,
        data: data,
        backgroundColor: vendorColor + '40',
        borderColor: vendorColor,
        borderWidth: 2,
        fill: false,
        tension: 0.1
      });
    });
    
    // Add threshold line at 0%
    const annotations = {
      thresholdLine: {
        type: 'line',
        yMin: 0,
        yMax: 0,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 1,
        borderDash: [5, 5]
      }
    };
    
    // Create or update chart
    if (this.charts.savingsImpact) {
      this.charts.savingsImpact.data.labels = labels;
      this.charts.savingsImpact.data.datasets = datasets;
      
      // Update annotations
      if (this.charts.savingsImpact.options.plugins.annotation) {
        this.charts.savingsImpact.options.plugins.annotation.annotations = annotations;
      }
      
      this.charts.savingsImpact.update();
    } else {
      this.charts.savingsImpact = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              title: {
                display: true,
                text: 'Savings Percentage (%)'
              },
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            },
            x: {
              title: {
                display: true,
                text: this.getVariableLabel(this.results.variable)
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: `Portnox Savings Impact by ${this.getVariableLabel(this.results.variable)}`,
              font: {
                size: 16
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
                }
              }
            },
            legend: {
              position: 'bottom'
            },
            annotation: {
              annotations: annotations
            }
          }
        }
      });
    }
  }
  
  updateBreakevenAnalysis() {
    const container = document.getElementById('breakeven-container');
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Create breakeven card
    const card = document.createElement('div');
    card.className = 'result-card breakeven-card';
    
    // Create card content
    let html = `
      <h3>Breakeven Analysis</h3>
      <p>Points where Portnox Cloud and other solutions have equal TCO:</p>
      <div class="breakeven-grid">
    `;
    
    // Add breakeven points
    Object.entries(this.results.breakevenPoints).forEach(([vendor, point]) => {
      const vendorName = window.vendorData[vendor]?.name || vendor;
      
      html += `
        <div class="breakeven-item">
          <div class="breakeven-vendor">${vendorName}</div>
          <div class="breakeven-value">${this.formatBreakevenValue(point.value, point.unit)}</div>
          <div class="breakeven-explanation">
            Above this value, ${vendorName} costs more than Portnox Cloud.
          </div>
        </div>
      `;
    });
    
    // Close card
    html += `
      </div>
      <div class="breakeven-note">
        <p>Note: Breakeven points indicate where total cost of ownership between solutions becomes equal. 
        These are critical thresholds for decision making.</p>
      </div>
    `;
    
    // Set card content
    card.innerHTML = html;
    
    // Add to container
    container.appendChild(card);
    container.classList.remove('hidden');
  }
  
  updateInsightsSection() {
    const container = document.getElementById('sensitivity-insights');
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Create insights
    const insights = this.generateInsights();
    
    // Create insights HTML
    let html = `
      <h4>Analysis Insights</h4>
      <div class="sensitivity-insights-list">
    `;
    
    // Add insight items
    insights.forEach(insight => {
      html += `
        <div class="sensitivity-insight-item">
          <div class="sensitivity-insight-icon">
            <i class="fas fa-lightbulb"></i>
          </div>
          <div class="sensitivity-insight-text">${insight}</div>
        </div>
      `;
    });
    
    // Close container
    html += `
      </div>
    `;
    
    // Set container content
    container.innerHTML = html;
    container.classList.remove('hidden');
  }
  
  generateInsights() {
    if (!this.results) return [];
    
    const insights = [];
    const variable = this.results.variable;
    
    // Check if there's data for Portnox and at least one other vendor
    const hasPortnox = this.results.results.some(r => r.calculationResults.portnox);
    const hasOtherVendors = this.results.vendor === 'all' || 
                           (this.results.vendor !== 'portnox' && 
                            this.results.results.some(r => r.calculationResults[this.results.vendor]));
    
    if (!hasPortnox || !hasOtherVendors) {
      insights.push("Analysis shows how TCO varies with changes in " + this.getVariableLabel(variable).toLowerCase() + ".");
      return insights;
    }
    
    // Generate variable-specific insights
    switch (variable) {
      case 'deviceCount':
        insights.push("As device count increases, cloud-based solutions like Portnox show better cost scaling compared to on-premises solutions.");
        insights.push("Hardware-based solutions show steeper cost increases with larger device counts due to capacity limitations and hardware scaling.");
        
        // Check for crossover points
        if (this.results.breakevenPoints && Object.keys(this.results.breakevenPoints).length > 0) {
          insights.push("The analysis identified specific device count thresholds where different solutions become more cost-effective than others.");
        }
        break;
        
      case 'yearsToProject':
        insights.push("Longer projection periods tend to favor solutions with lower operational costs over initial investment costs.");
        insights.push("Cloud solutions like Portnox typically show increasing value over time as operational savings accumulate.");
        insights.push("On-premises solutions often have higher long-term costs due to hardware refresh cycles and ongoing maintenance.");
        break;
        
      case 'locationCount':
        insights.push("Multi-location deployments significantly increase costs for on-premises solutions due to hardware requirements at each site.");
        insights.push("Cloud-based solutions maintain more consistent TCO regardless of location count since they require no on-site hardware.");
        insights.push("The cost difference between cloud and on-premises solutions grows proportionally with the number of locations.");
        break;
        
      case 'legacyPercentage':
        insights.push("Higher percentages of legacy devices typically increase management complexity and costs across all solutions.");
        insights.push("Cloud-based solutions often handle legacy device integration more cost-effectively due to centralized policy management.");
        break;
        
      case 'hardwareCost':
        insights.push("Hardware cost variations have minimal impact on cloud solutions but significantly affect on-premises TCO.");
        insights.push("Even with substantial hardware discounts, cloud solutions often maintain a TCO advantage due to eliminated infrastructure needs.");
        break;
        
      case 'licensingCost':
        insights.push("Licensing costs affect all solutions, but their impact varies based on licensing models.");
        insights.push("Subscription-based models provide more predictable costs when licensing fees fluctuate.");
        break;
        
      case 'fteCost':
        insights.push("Higher IT staff costs amplify the savings from solutions requiring less administrative overhead.");
        insights.push("Cloud solutions typically require less staff time for maintenance and operations compared to on-premises alternatives.");
        insights.push("As IT personnel costs increase, the ROI for cloud-based solutions improves correspondingly.");
        break;
        
      default:
        insights.push("This sensitivity analysis provides insights into how changes in " + this.getVariableLabel(variable).toLowerCase() + " affect total cost of ownership.");
        insights.push("Cloud-based NAC solutions typically show more stable TCO across varying parameters compared to on-premises alternatives.");
    }
    
    // Add breakeven insights if available
    if (this.results.breakevenPoints && Object.keys(this.results.breakevenPoints).length > 0) {
      insights.push("The analysis identified specific breakeven points where different solutions have equal TCO. These thresholds are critical for decision-making.");
    }
    
    return insights;
  }
  
  updateDataTable() {
    const tableHeader = document.getElementById('sensitivity-table-header');
    const tableBody = document.getElementById('sensitivity-table-body');
    
    if (!tableHeader || !tableBody) {
      console.warn('Data table elements not found');
      return;
    }
    
    // Clear existing table
    tableHeader.innerHTML = `<th scope="col">${this.getVariableLabel(this.results.variable)}</th>`;
    tableBody.innerHTML = '';
    
    // Add vendor columns to header
    const vendors = this.results.vendor === 'all' ? 
      Object.keys(window.vendorData) : 
      [this.results.vendor];
    
    const vendorNames = vendors.map(v => window.vendorData[v]?.name || v);
    vendorNames.forEach(name => {
      tableHeader.innerHTML += `<th scope="col">${name}</th>`;
    });
    
    // Add savings columns if comparing to Portnox
    if (vendors.length > 1 && vendors.includes('portnox')) {
      vendors.forEach(vendor => {
        if (vendor !== 'portnox') {
          tableHeader.innerHTML += `<th scope="col">Savings vs. ${window.vendorData[vendor]?.name || vendor}</th>`;
        }
      });
    }
    
    // Add data rows
    this.results.results.forEach(result => {
      const row = document.createElement('tr');
      
      // Add data point cell
      const dataPointCell = document.createElement('td');
      dataPointCell.textContent = this.formatDataPoint(this.results.variable, result.dataPoint);
      row.appendChild(dataPointCell);
      
      // Add vendor TCO cells
      vendors.forEach(vendor => {
        const tcoCell = document.createElement('td');
        const tco = result.calculationResults[vendor]?.totalTCO || 0;
        tcoCell.textContent = window.formatCurrency(tco);
        
        // Highlight the best value
        if (vendors.length > 1) {
          const allTCOs = vendors.map(v => result.calculationResults[v]?.totalTCO || 0);
          const minTCO = Math.min(...allTCOs);
          
          if (tco === minTCO) {
            tcoCell.classList.add('best-value');
          }
        }
        
        row.appendChild(tcoCell);
      });
      
      // Add savings cells if comparing to Portnox
      if (vendors.length > 1 && vendors.includes('portnox')) {
        vendors.forEach(vendor => {
          if (vendor !== 'portnox') {
            const savingsCell = document.createElement('td');
            const vendorTCO = result.calculationResults[vendor]?.totalTCO || 0;
            const portnoxTCO = result.calculationResults['portnox']?.totalTCO || 0;
            
            const savingsAmount = vendorTCO - portnoxTCO;
            const savingsPercentage = vendorTCO > 0 ? (savingsAmount / vendorTCO) * 100 : 0;
            
            savingsCell.textContent = `${window.formatCurrency(savingsAmount)} (${savingsPercentage.toFixed(1)}%)`;
            
            // Add class based on savings
            if (savingsAmount > 0) {
              savingsCell.classList.add('positive-savings');
            } else if (savingsAmount < 0) {
              savingsCell.classList.add('negative-savings');
            }
            
            row.appendChild(savingsCell);
          }
        });
      }
      
      tableBody.appendChild(row);
    });
    
    // Add special row for breakeven points if available
    if (this.results.includeBreakeven && this.results.breakevenPoints && Object.keys(this.results.breakevenPoints).length > 0) {
      const breakevenRow = document.createElement('tr');
      breakevenRow.className = 'breakeven-row';
      
      // Add label cell
      const labelCell = document.createElement('td');
      labelCell.textContent = 'Breakeven Points';
      labelCell.style.fontWeight = 'bold';
      breakevenRow.appendChild(labelCell);
      
      // Add cells for each vendor
      vendors.forEach(vendor => {
        const cell = document.createElement('td');
        
        if (vendor === 'portnox') {
          cell.textContent = 'Reference';
        } else if (this.results.breakevenPoints[vendor]) {
          const point = this.results.breakevenPoints[vendor];
          cell.textContent = this.formatBreakevenValue(point.value, point.unit);
        } else {
          cell.textContent = 'N/A';
        }
        
        breakevenRow.appendChild(cell);
      });
      
      // Add empty cells for savings columns
      if (vendors.length > 1 && vendors.includes('portnox')) {
        vendors.forEach(vendor => {
          if (vendor !== 'portnox') {
            const cell = document.createElement('td');
            breakevenRow.appendChild(cell);
          }
        });
      }
      
      tableBody.appendChild(breakevenRow);
    }
  }
  
  formatBreakevenValue(value, unit) {
    if (unit === 'devices' || unit === 'locations') {
      return `${Math.round(value).toLocaleString()} ${unit}`;
    } else if (unit === '%') {
      return `${value.toFixed(1)}${unit}`;
    } else if (unit === 'years') {
      const years = Math.floor(value);
      const months = Math.round((value - years) * 12);
      
      if (months === 0) {
        return `${years} ${years === 1 ? 'year' : 'years'}`;
      } else if (years === 0) {
        return `${months} ${months === 1 ? 'month' : 'months'}`;
      } else {
        return `${years} ${years === 1 ? 'year' : 'years'}, ${months} ${months === 1 ? 'month' : 'months'}`;
      }
    } else if (unit === 'multiplier') {
      return `${value.toFixed(2)}×`;
    } else if (unit === '$/hour') {
      return `$${value.toFixed(0)}/hour`;
    } else {
      return value.toString();
    }
  }
  
  formatDataPoint(variable, value) {
    switch (variable) {
      case 'deviceCount':
        return window.formatNumber(value) + ' devices';
      case 'legacyPercentage':
        return value + '%';
      case 'locationCount':
        return window.formatNumber(value) + ' locations';
      case 'yearsToProject':
        return value + ' years';
      case 'hardwareCost':
      case 'licensingCost':
      case 'maintenanceCost':
      case 'fteCost':
      case 'implementationCost':
        return value.toFixed(2) + '×';
      case 'downtimeCost':
        return '$' + value.toFixed(0) + '/hour';
      default:
        return value.toString();
    }
  }
  
  getVariableLabel(variable) {
    switch (variable) {
      case 'deviceCount':
        return 'Device Count';
      case 'legacyPercentage':
        return 'Legacy Device Percentage';
      case 'locationCount':
        return 'Number of Locations';
      case 'yearsToProject':
        return 'Years to Project';
      case 'hardwareCost':
        return 'Hardware Cost Multiplier';
      case 'licensingCost':
        return 'Licensing Cost Multiplier';
      case 'maintenanceCost':
        return 'Maintenance Cost Multiplier';
      case 'fteCost':
        return 'FTE Cost Multiplier';
      case 'implementationCost':
        return 'Implementation Cost Multiplier';
      case 'downtimeCost':
        return 'Downtime Cost ($/hour)';
      default:
        return variable;
    }
  }
  
  getVariableUnit(variable) {
    switch (variable) {
      case 'deviceCount':
        return 'devices';
      case 'legacyPercentage':
        return '%';
      case 'locationCount':
        return 'locations';
      case 'yearsToProject':
        return 'years';
      case 'hardwareCost':
      case 'licensingCost':
      case 'maintenanceCost':
      case 'fteCost':
      case 'implementationCost':
        return 'multiplier';
      case 'downtimeCost':
        return '$/hour';
      default:
        return '';
    }
  }
  
  addCurrentScenario() {
    if (!this.results) {
      this.showError('No analysis results to save');
      return;
    }
    
    // Create a scenario object
    const scenario = {
      id: Date.now(),
      name: `${this.getVariableLabel(this.results.variable)} Analysis`,
      variable: this.results.variable,
      variableLabel: this.getVariableLabel(this.results.variable),
      vendor: this.results.vendor,
      vendorName: this.results.vendor === 'all' ? 'All Vendors' : (window.vendorData[this.results.vendor]?.name || this.results.vendor),
      minValue: this.results.minValue,
      maxValue: this.results.maxValue,
      dataPoints: this.results.dataPoints.length,
      timestamp: new Date().toLocaleString(),
      breakevenPoints: this.results.breakevenPoints
    };
    
    // Add to scenarios array
    this.scenarios.push(scenario);
    
    // Update scenarios UI
    this.updateScenariosUI();
    
    // Show success message
    this.showSuccess('Scenario added to comparison list');
  }
  
  clearScenarios() {
    this.scenarios = [];
    this.updateScenariosUI();
    this.showSuccess('Scenarios cleared');
  }
  
  updateScenariosUI() {
    const container = document.getElementById('scenarios-container');
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    if (this.scenarios.length === 0) {
      container.classList.add('hidden');
      return;
    }
    
    // Create scenarios card
    const card = document.createElement('div');
    card.className = 'result-card scenarios-card';
    
    // Create card content
    let html = `
      <h3>Saved Analysis Scenarios</h3>
      <div class="scenarios-grid">
    `;
    
    // Add scenarios
    this.scenarios.forEach(scenario => {
      html += `
        <div class="scenario-item" data-id="${scenario.id}">
          <div class="scenario-header">
            <div class="scenario-name">${scenario.name}</div>
            <div class="scenario-actions">
              <button class="scenario-view-btn" data-id="${scenario.id}">
                <i class="fas fa-eye"></i>
              </button>
              <button class="scenario-delete-btn" data-id="${scenario.id}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="scenario-details">
            <div class="scenario-variable">Variable: ${scenario.variableLabel}</div>
            <div class="scenario-vendor">Vendor: ${scenario.vendorName}</div>
            <div class="scenario-range">Range: ${this.formatDataPoint(scenario.variable, scenario.minValue)} to ${this.formatDataPoint(scenario.variable, scenario.maxValue)}</div>
            <div class="scenario-time">Created: ${scenario.timestamp}</div>
          </div>
    `;
    
    // Add breakeven info if available
    if (scenario.breakevenPoints && Object.keys(scenario.breakevenPoints).length > 0) {
      html += `<div class="scenario-breakeven">`;
      
      Object.entries(scenario.breakevenPoints).forEach(([vendor, point]) => {
        const vendorName = window.vendorData[vendor]?.name || vendor;
        
        html += `
          <div class="breakeven-info">
            ${vendorName} Breakeven: ${this.formatBreakevenValue(point.value, point.unit)}
          </div>
        `;
      });
      
      html += `</div>`;
    }
    
    // Close scenario item
    html += `
        </div>
      `;
    });
    
    // Close card
    html += `
      </div>
    `;
    
    // Set card content
    card.innerHTML = html;
    
    // Add event listeners
    card.querySelectorAll('.scenario-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        this.viewScenario(id);
      });
    });
    
    card.querySelectorAll('.scenario-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        this.deleteScenario(id);
      });
    });
    
    // Add to container
    container.appendChild(card);
    container.classList.remove('hidden');
  }
  
  viewScenario(id) {
    const scenario = this.scenarios.find(s => s.id === id);
    if (!scenario) return;
    
    // Set form values to match scenario
    document.getElementById('param-variable').value = scenario.variable;
    document.getElementById('param-vendor').value = scenario.vendor;
    document.getElementById('param-min').value = scenario.minValue;
    document.getElementById('param-max').value = scenario.maxValue;
    document.getElementById('param-steps').value = scenario.dataPoints;
    
    // Update variable description
    this.updateParameterDescription(scenario.variable);
    
    // Show notification
    this.showSuccess(`Loaded scenario: ${scenario.name}`);
  }
  
  deleteScenario(id) {
    this.scenarios = this.scenarios.filter(s => s.id !== id);
    this.updateScenariosUI();
    this.showSuccess('Scenario removed');
  }
  
  exportToCSV() {
    if (!this.results) {
      this.showError('No analysis results to export');
      return;
    }
    
    try {
      // Create CSV content
      let csv = [];
      
      // Add header
      csv.push(['Portnox Total Cost Analysis - Sensitivity Analysis']);
      csv.push([`Variable: ${this.getVariableLabel(this.results.variable)}, Range: ${this.results.minValue} to ${this.results.maxValue}`]);
      csv.push([`Generated on ${new Date().toLocaleDateString()}`]);
      csv.push([]);
      
      // Add table header
      const vendors = this.results.vendor === 'all' ? 
        Object.keys(window.vendorData) : 
        [this.results.vendor];
      
      const header = [this.getVariableLabel(this.results.variable)];
      vendors.forEach(vendor => {
        header.push(window.vendorData[vendor]?.name || vendor);
      });
      
      // Add savings columns if comparing to Portnox
      if (vendors.length > 1 && vendors.includes('portnox')) {
        vendors.forEach(vendor => {
          if (vendor !== 'portnox') {
            header.push(`Savings vs. ${window.vendorData[vendor]?.name || vendor}`);
          }
        });
      }
      
      csv.push(header);
      
      // Add data rows
      this.results.results.forEach(result => {
        const row = [this.formatDataPoint(this.results.variable, result.dataPoint)];
        
        // Add TCO values
        vendors.forEach(vendor => {
          const tco = result.calculationResults[vendor]?.totalTCO || 0;
          row.push(tco);
        });
        
        // Add savings values if comparing to Portnox
        if (vendors.length > 1 && vendors.includes('portnox')) {
          vendors.forEach(vendor => {
            if (vendor !== 'portnox') {
              const vendorTCO = result.calculationResults[vendor]?.totalTCO || 0;
              const portnoxTCO = result.calculationResults['portnox']?.totalTCO || 0;
              
              const savingsAmount = vendorTCO - portnoxTCO;
              const savingsPercentage = vendorTCO > 0 ? (savingsAmount / vendorTCO) * 100 : 0;
              
              row.push(`${savingsAmount} (${savingsPercentage.toFixed(1)}%)`);
            }
          });
        }
        
        csv.push(row);
      });
      
      // Add breakeven points if available
      if (this.results.includeBreakeven && this.results.breakevenPoints) {
        csv.push([]);
        csv.push(['Breakeven Analysis']);
        
        Object.entries(this.results.breakevenPoints).forEach(([vendor, point]) => {
          csv.push([
            `${window.vendorData[vendor]?.name || vendor} Breakeven Point`,
            this.formatBreakevenValue(point.value, point.unit)
          ]);
        });
      }
      
      // Format CSV content
      const csvContent = csv.map(row => {
        return row.map(cell => {
          if (typeof cell === 'number') {
            return cell.toString();
          }
          if (typeof cell === 'string' && cell.includes(',')) {
            return `"${cell}"`;
          }
          return cell;
        }).join(',');
      }).join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Sensitivity_Analysis_${this.results.variable}_${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      this.showSuccess('CSV exported successfully');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      this.showError('Error exporting CSV: ' + error.message);
    }
  }
  
  exportToPDF() {
    if (!this.results) {
      this.showError('No analysis results to export');
      return;
    }
    
    try {
      // Check if jsPDF is available
      if (typeof jsPDF === 'undefined') {
        this.showError('PDF generation library not available');
        return;
      }
      
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(18);
      doc.setTextColor(5, 84, 124); // Portnox blue
      doc.text('Portnox Total Cost Analysis', 105, 15, { align: 'center' });
      doc.setFontSize(16);
      doc.text('Sensitivity Analysis Report', 105, 25, { align: 'center' });
      
      // Add analysis details
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100); // Gray
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 35, { align: 'center' });
      
      // Add analysis parameters
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Analysis Parameters', 20, 45);
      
      const paramTable = [
        ['Variable', this.getVariableLabel(this.results.variable)],
        ['Range', `${this.formatDataPoint(this.results.variable, this.results.minValue)} to ${this.formatDataPoint(this.results.variable, this.results.maxValue)}`],
        ['Steps', this.results.steps.toString()],
        ['Vendor', this.results.vendor === 'all' ? 'All Vendors' : (window.vendorData[this.results.vendor]?.name || this.results.vendor)]
      ];
      
      doc.autoTable({
        head: [['Parameter', 'Value']],
        body: paramTable,
        startY: 50,
        theme: 'plain',
        styles: {
          fontSize: 10
        },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 80 }
        }
      });
      
      // Add sensitivity table
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Sensitivity Analysis Results', 20, doc.autoTable.previous.finalY + 15);
      
      // Prepare table headers and data
      const vendors = this.results.vendor === 'all' ? 
        Object.keys(window.vendorData) : 
        [this.results.vendor];
      
      const headers = [this.getVariableLabel(this.results.variable)];
      vendors.forEach(vendor => {
        headers.push(window.vendorData[vendor]?.name || vendor);
      });
      
      const tableData = this.results.results.map(result => {
        const row = [this.formatDataPoint(this.results.variable, result.dataPoint)];
        
        vendors.forEach(vendor => {
          const tco = result.calculationResults[vendor]?.totalTCO || 0;
          row.push(window.formatCurrency(tco));
        });
        
        return row;
      });
      
      doc.autoTable({
        head: [headers],
        body: tableData,
        startY: doc.autoTable.previous.finalY + 20,
        theme: 'grid',
        headStyles: {
          fillColor: [5, 84, 124],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        styles: {
          cellPadding: 5,
          fontSize: 8
        }
      });
      
      // Add savings table if comparing multiple vendors
      if (vendors.length > 1 && vendors.includes('portnox')) {
        doc.addPage();
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Portnox Savings Analysis', 20, 20);
        
        // Create savings headers
        const savingsHeaders = [this.getVariableLabel(this.results.variable)];
        vendors.forEach(vendor => {
          if (vendor !== 'portnox') {
            savingsHeaders.push(`Savings vs. ${window.vendorData[vendor]?.name || vendor}`);
          }
        });
        
        // Create savings data
        const savingsData = this.results.results.map(result => {
          const row = [this.formatDataPoint(this.results.variable, result.dataPoint)];
          
          vendors.forEach(vendor => {
            if (vendor !== 'portnox') {
              const vendorTCO = result.calculationResults[vendor]?.totalTCO || 0;
              const portnoxTCO = result.calculationResults['portnox']?.totalTCO || 0;
              
              const savingsAmount = vendorTCO - portnoxTCO;
              const savingsPercentage = vendorTCO > 0 ? (savingsAmount / vendorTCO) * 100 : 0;
              
              row.push(`${window.formatCurrency(savingsAmount)} (${savingsPercentage.toFixed(1)}%)`);
            }
          });
          
          return row;
        });
        
        doc.autoTable({
          head: [savingsHeaders],
          body: savingsData,
          startY: 25,
          theme: 'grid',
          headStyles: {
            fillColor: [101, 189, 68], // Portnox green
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245]
          },
          styles: {
            cellPadding: 5,
            fontSize: 8
          }
        });
      }
      
      // Add breakeven analysis if available
      if (this.results.includeBreakeven && this.results.breakevenPoints && Object.keys(this.results.breakevenPoints).length > 0) {
        let yPosition;
        if (doc.autoTable.previous.finalY > 200) {
          doc.addPage();
          yPosition = 20;
        } else {
          yPosition = doc.autoTable.previous.finalY + 20;
        }
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Breakeven Analysis', 20, yPosition);
        
        const breakevenData = Object.entries(this.results.breakevenPoints).map(([vendor, point]) => [
          window.vendorData[vendor]?.name || vendor,
          this.formatBreakevenValue(point.value, point.unit),
          `At this value, ${window.vendorData[vendor]?.name || vendor} and Portnox Cloud have equal TCO.`
        ]);
        
        doc.autoTable({
          head: [['Vendor', 'Breakeven Point', 'Interpretation']],
          body: breakevenData,
          startY: yPosition + 5,
          theme: 'grid',
          headStyles: {
            fillColor: [5, 84, 124],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          styles: {
            cellPadding: 5,
            fontSize: 9
          }
        });
      }
      
      // Add insights
      let yPosition;
      if (doc.autoTable.previous.finalY > 200) {
        doc.addPage();
        yPosition = 20;
      } else {
        yPosition = doc.autoTable.previous.finalY + 20;
      }
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Analysis Insights', 20, yPosition);
      
      // Generate insights for the report
      const insights = this.generateInsights();
      
      // Add insights text
      let insightY = yPosition + 10;
      insights.forEach(insight => {
        doc.text('• ' + insight, 25, insightY);
        insightY += 10;
      });
      
      // Add footer with page numbers
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Portnox Total Cost Analysis - Sensitivity Report', 20, 285);
        doc.text(`Page ${i} of ${pageCount}`, 180, 285);
      }
      
      // Save PDF
      doc.save(`Sensitivity_Analysis_${this.results.variable}_${new Date().toISOString().slice(0, 10)}.pdf`);
      
      this.showSuccess('PDF exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      this.showError('Error exporting PDF: ' + error.message);
    }
  }
  
  showLoading() {
    if (window.loadingManager) {
      window.loadingManager.showGlobal('Running sensitivity analysis...');
    } else {
      const resultsContainer = document.querySelector('.results-container');
      if (!resultsContainer) return;
      
      let loadingOverlay = resultsContainer.querySelector('.loading-overlay');
      if (loadingOverlay) return;
      
      loadingOverlay = document.createElement('div');
      loadingOverlay.className = 'loading-overlay';
      loadingOverlay.innerHTML = `
        <div class="spinner"></div>
        <div class="loading-text">Running sensitivity analysis...</div>
      `;
      
      resultsContainer.appendChild(loadingOverlay);
    }
  }
  
  hideLoading() {
    if (window.loadingManager) {
      window.loadingManager.hideGlobal();
    } else {
      const loadingOverlay = document.querySelector('.loading-overlay');
      if (loadingOverlay) {
        loadingOverlay.parentNode.removeChild(loadingOverlay);
      }
    }
  }
  
  showError(message) {
    if (window.notificationManager) {
      window.notificationManager.error(message);
    } else {
      alert(message);
    }
  }
  
  showSuccess(message) {
    if (window.notificationManager) {
      window.notificationManager.success(message);
    } else {
      console.log(message);
    }
  }
}

// Initialize and make globally available
window.enhancedSensitivityAnalyzer = new EnhancedSensitivityAnalyzer();
EOF

# Create sensitivity analysis page
echo "Creating sensitivity analysis page..."
cat > sensitivity.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sensitivity Analysis - Portnox Total Cost Analysis</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/enhanced/branding.css">
  <link rel="stylesheet" href="css/enhanced/visuals.css">
  <link rel="stylesheet" href="css/enhanced/sensitivity.css">
  <link rel="icon" type="image/png" href="img/favicon.png">
</head>
<body>
  <div class="app-container">
    <header class="app-header">
      <div class="logo">
        <img src="img/portnox-logo.svg" onerror="this.src='img/portnox-logo.png'" alt="Portnox Logo">
        <h1>Portnox Total Cost Analysis</h1>
      </div>
      <div class="header-actions">
        <button id="return-to-calculator" class="btn btn-outline btn-sm">
          <i class="fas fa-arrow-left"></i> Return to Calculator
        </button>
        <button id="guided-tour-btn" class="btn btn-outline btn-sm">
          <i class="fas fa-question-circle"></i> Help
        </button>
      </div>
    </header>

    <div class="calculator-container">
      <div class="sidebar">
        <div id="message-container"></div>

        <!-- Parameter configuration card -->
        <div class="parameter-card">
          <h3>Sensitivity Parameters</h3>
          <p>Configure the parameters for sensitivity analysis.</p>
          
          <div class="input-group">
            <label for="param-variable">Variable to Analyze</label>
            <select id="param-variable" class="form-select">
              <option value="deviceCount">Device Count</option>
              <option value="legacyPercentage">Legacy Device Percentage</option>
              <option value="locationCount">Number of Locations</option>
              <option value="yearsToProject">Years to Project</option>
              <option value="hardwareCost">Hardware Cost Multiplier</option>
              <option value="licensingCost">Licensing Cost Multiplier</option>
              <option value="maintenanceCost">Maintenance Cost Multiplier</option>
              <option value="implementationCost">Implementation Cost Multiplier</option>
              <option value="fteCost">Personnel Cost Multiplier</option>
              <option value="downtimeCost">Downtime Cost ($/hour)</option>
            </select>
          </div>
          
          <div class="parameter-description" id="parameter-description">
            Analyze how changes in the total number of devices affect TCO and relative savings. More devices typically increase hardware and licensing costs for on-premises solutions.
          </div>
          
          <div class="input-group">
            <label for="param-vendor">Vendor to Analyze</label>
            <select id="param-vendor" class="form-select">
              <option value="all">All Vendors</option>
              <option value="cisco">Cisco ISE</option>
              <option value="aruba">Aruba ClearPass</option>
              <option value="forescout">Forescout</option>
              <option value="nps">Microsoft NPS</option>
              <option value="fortinac">FortiNAC</option>
              <option value="securew2">SecureW2</option>
              <option value="portnox">Portnox Cloud</option>
            </select>
          </div>
          
          <div class="options-grid">
            <div class="input-group">
              <label for="param-min">Minimum Value</label>
              <input type="number" id="param-min" value="500" step="any">
            </div>
            
            <div class="input-group">
              <label for="param-max">Maximum Value</label>
              <input type="number" id="param-max" value="2000" step="any">
            </div>
            
            <div class="input-group">
              <label for="param-steps">Steps</label>
              <input type="number" id="param-steps" value="10" min="2" max="20">
            </div>
          </div>
          
          <div class="input-group checkbox-group">
            <input type="checkbox" id="include-breakeven" checked>
            <label for="include-breakeven">Calculate breakeven points</label>
          </div>
          
          <div class="input-group checkbox-group">
            <input type="checkbox" id="compare-to-no-nac">
            <label for="compare-to-no-nac">Compare to no NAC solution</label>
          </div>
          
          <button id="sensitivity-btn" class="btn btn-primary">
            <i class="fas fa-chart-line"></i> Run Sensitivity Analysis
          </button>
        </div>
        
        <!-- Instructions card -->
        <div class="instructions-card">
          <h3>How to Use Sensitivity Analysis</h3>
          <ol>
            <li>Select the variable you want to analyze</li>
            <li>Choose which vendor(s) to include in the analysis</li>
            <li>Specify the range of values to test</li>
            <li>Run the analysis to see how the variable affects TCO</li>
            <li>Review charts, tables and breakeven analysis</li>
            <li>Save scenarios to compare different analyses</li>
          </ol>
          <p>Sensitivity analysis helps identify how specific factors impact the total cost of ownership. This is valuable for making informed decisions based on your organization's specific priorities and risk factors.</p>
        </div>
        
        <!-- Scenario management -->
        <div class="scenarios-card">
          <h3>Scenario Management</h3>
          <div class="scenario-controls">
            <button id="add-scenario-btn" class="btn btn-outline">
              <i class="fas fa-save"></i> Save Current Scenario
            </button>
            <button id="clear-scenarios-btn" class="btn btn-outline">
              <i class="fas fa-trash"></i> Clear All Scenarios
            </button>
          </div>
          
          <div class="export-options">
            <button id="export-sensitivity-csv-btn" class="btn btn-outline">
              <i class="fas fa-file-csv"></i> Export to CSV
            </button>
            <button id="export-sensitivity-pdf-btn" class="btn btn-outline">
              <i class="fas fa-file-pdf"></i> Export to PDF
            </button>
          </div>
        </div>
      </div>

      <div class="results-container">
        <h2>Sensitivity Analysis Results</h2>
        
        <!-- Sensitivity charts -->
        <div class="sensitivity-charts">
          <div class="chart-wrapper">
            <div class="chart-title">TCO Sensitivity Analysis</div>
            <div class="chart-description">
              This chart shows how changes in the analyzed variable affect the Total Cost of Ownership for each vendor.
            </div>
            <div class="chart-container">
              <canvas id="sensitivity-chart"></canvas>
            </div>
          </div>
          
          <div class="chart-wrapper">
            <div class="chart-title">Portnox Savings Impact</div>
            <div class="chart-description">
              This chart shows how changes in the analyzed variable affect the percentage savings when using Portnox Cloud.
            </div>
            <div class="chart-container">
              <canvas id="savings-impact-chart"></canvas>
            </div>
          </div>
        </div>
        
        <!-- Breakeven analysis -->
        <div id="breakeven-container" class="hidden"></div>
        
        <!-- Sensitivity insights -->
        <div id="sensitivity-insights" class="sensitivity-insights hidden"></div>
        
        <!-- Scenarios list -->
        <div id="scenarios-container" class="hidden"></div>
        
        <!-- Data table -->
        <div class="result-card">
          <h3>Detailed Results Table</h3>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr id="sensitivity-table-header">
                  <th scope="col">Variable</th>
                </tr>
              </thead>
              <tbody id="sensitivity-table-body">
                <!-- Table rows will be populated by JavaScript -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <footer class="app-footer">
      <div class="footer-info">
        &copy; 2025 Portnox. All rights reserved.
      </div>
      <div class="footer-links">
        <a href="#" target="_blank">Privacy Policy</a>
        <a href="#" target="_blank">Terms of Service</a>
        <a href="#" target="_blank">Contact Us</a>
      </div>
    </footer>
  </div>

  <!-- JavaScript Libraries -->
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@2.1.0/dist/chartjs-plugin-annotation.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jspdf-autotable@3.5.28/dist/jspdf.plugin.autotable.min.js"></script>

  <!-- Application JavaScript -->
  <script src="img/portnox-logo-base64.js"></script>
  <script src="js/vendors/vendor-data.js"></script>
  <script src="js/utils/helpers.js"></script>
  <script src="js/managers/dom-cache.js"></script>
  <script src="js/managers/validation-manager.js"></script>
  <script src="js/managers/loading-manager.js"></script>
  <script src="js/managers/notification-manager.js"></script>
  <script src="js/managers/tab-manager.js"></script>
  <script src="js/charts/chart-builder.js"></script>
  <script src="js/components/calculator.js"></script>
  <script src="js/components/ui-controller.js"></script>
  <script src="js/components/enhanced-sensitivity.js"></script>
  <script src="js/sensitivity.js"></script>
  
  <script>
    // Initialize page
    document.addEventListener('DOMContentLoaded', function() {
      // Return to calculator button
      document.getElementById('return-to-calculator').addEventListener('click', function() {
        window.location.href = 'index.html';
      });
      
      // Initialize sensitivity analysis
      if (window.enhancedSensitivityAnalyzer) {
        // Update range defaults for initial variable
        window.enhancedSensitivityAnalyzer.updateRangeDefaults('deviceCount');
      }
    });
  </script>
</body>
</html>
EOF

# Create migration planner component
echo "Creating migration planner component..."
cat > js/components/migration-planner.js << 'EOF'
/**
 * Migration Planner Component
 * Provides detailed migration planning from on-premises to cloud-based NAC
 */
class MigrationPlanner {
  constructor() {
    this.phases = [
      {
        id: 'assessment',
        title: 'Assessment & Discovery',
        icon: 'search',
        description: 'Evaluate current environment, identify devices, authentication methods, and network topology.',
        duration: '2-3 weeks',
        tasks: [
          'Inventory all network devices and access points',
          'Document current authentication methods and policies',
          'Analyze network traffic patterns and user behaviors',
          'Identify integration points with existing systems',
          'Assess compliance requirements and security policies'
        ],
        deliverables: [
          'Environment assessment report',
          'Network topology diagram',
          'Authentication flow documentation',
          'Integration requirements document'
        ]
      },
      {
        id: 'planning',
        title: 'Architecture Planning',
        icon: 'project-diagram',
        description: 'Design authentication flows and integration points for cloud NAC solution.',
        duration: '1-2 weeks',
        tasks: [
          'Define cloud connector placement strategy',
          'Design authentication and authorization flows',
          'Plan integration with existing identity systems',
          'Develop migration strategy and timeline',
          'Create rollback procedures'
        ],
        deliverables: [
          'Solution architecture document',
          'Migration timeline and strategy',
          'Integration design',
          'Rollback plan'
        ]
      },
      {
        id: 'setup',
        title: 'Portnox Cloud Setup',
        icon: 'cloud',
        description: 'Configure cloud portal, authentication methods, and deploy local connectors.',
        duration: '1 week',
        tasks: [
          'Set up Portnox Cloud tenant',
          'Configure authentication settings',
          'Deploy cloud connectors in key network segments',
          'Test basic connectivity and authentication',
          'Configure initial policies'
        ],
        deliverables: [
          'Configured Portnox Cloud environment',
          'Deployed and verified cloud connectors',
          'Basic authentication validation'
        ]
      },
      {
        id: 'policies',
        title: 'Policy Migration',
        icon: 'tasks',
        description: 'Transfer and adapt existing policies to the cloud platform.',
        duration: '1-2 weeks',
        tasks: [
          'Map existing policies to Portnox equivalents',
          'Configure device profiling rules',
          'Set up compliance policies',
          'Implement guest access workflows',
          'Create remediation actions'
        ],
        deliverables: [
          'Policy mapping document',
          'Configured policies in Portnox Cloud',
          'Policy testing results',
          'Compliance verification'
        ]
      },
      {
        id: 'pilot',
        title: 'Pilot Deployment',
        icon: 'flask',
        description: 'Test with limited device groups to verify configuration and policy enforcement.',
        duration: '2-3 weeks',
        tasks: [
          'Select pilot user groups and network segments',
          'Monitor authentication and authorization decisions',
          'Gather user feedback',
          'Fine-tune policies and configurations',
          'Validate reporting and visibility'
        ],
        deliverables: [
          'Pilot testing report',
          'Policy adjustment document',
          'User feedback summary',
          'Go/No-Go decision for full deployment'
        ]
      },
      {
        id: 'deployment',
        title: 'Full Deployment',
        icon: 'rocket',
        description: 'Expand to all network segments and user groups, phase out legacy solution.',
        duration: '2-4 weeks',
        tasks: [
          'Deploy in waves across remaining network segments',
          'Monitor system performance and user experience',
          'Address any emerging issues',
          'Begin decommissioning legacy NAC system',
          'Conduct final user training'
        ],
        deliverables: [
          'Deployment completion report',
          'Performance metrics',
          'Issue resolution log',
          'Legacy system retirement plan'
        ]
      },
      {
        id: 'optimization',
        title: 'Optimization & Training',
        icon: 'graduation-cap',
        description: 'Fine-tune the solution and ensure staff is properly trained on the new system.',
        duration: '1-2 weeks',
        tasks: [
          'Optimize policies based on production data',
          'Conduct administrator training sessions',
          'Document operational procedures',
          'Set up monitoring and alerting',
          'Establish regular review cadence'
        ],
        deliverables: [
          'Operational procedures document',
          'Training completion certificates',
          'System performance baseline',
          'Project closure report'
        ]
      }
    ];
    
    this.successFactors = [
      {
        title: 'Executive Sponsorship',
        description: 'Secure active support from senior leadership to ensure proper resource allocation and organizational buy-in.'
      },
      {
        title: 'Clear Success Criteria',
        description: 'Define measurable objectives for each phase that align with overall business and security goals.'
      },
      {
        title: 'Phased Approach',
        description: 'Implement in stages, starting with non-critical segments to validate configuration and minimize disruption.'
      },
      {
        title: 'Dedicated Project Team',
        description: 'Assign specific roles and responsibilities with adequate time allocation to focus on the migration.'
      },
      {
        title: 'User Communication',
        description: 'Develop a comprehensive communication plan to keep all stakeholders informed throughout the process.'
      },
      {
        title: 'Training',
        description: 'Provide comprehensive training before and during migration for both administrators and end-users.'
      },
      {
        title: 'Testing',
        description: 'Thoroughly test each phase with a variety of device types and use cases before moving to production.'
      },
      {
        title: 'Rollback Plan',
        description: 'Maintain the ability to revert changes if critical issues arise during any phase of the migration.'
      }
    ];
    
    this.riskFactors = [
      {
        title: 'Legacy Device Compatibility',
        mitigation: 'Identify all legacy devices early and create specific policies to accommodate them without compromising security.'
      },
      {
        title: 'Network Infrastructure Changes',
        mitigation: 'Document all required network configuration changes and test in a controlled environment before implementation.'
      },
      {
        title: 'Authentication Disruption',
        mitigation: 'Use overlap periods where both old and new systems are active, with gradual transition to minimize user impact.'
      },
      {
        title: 'Integration Complexities',
        mitigation: 'Plan detailed integration testing with existing systems like Active Directory, MDM, and security tools.'
      },
      {
        title: 'User Resistance',
        mitigation: 'Provide clear communication about benefits and changes, with ample support resources during the transition.'
      }
    ];
    
    // Initialize UI when component is created
    this.initUI();
  }
  
  /**
   * Initialize UI components for the migration planner
   */
  initUI() {
    // Populate migration phases in the UI
    this.populateMigrationPhases();
    
    // Populate migration timeline
    this.populateMigrationTimeline();
    
    // Add success factors
    this.populateSuccessFactors();
    
    // Add risk factors
    this.populateRiskFactors();
  }
  
  /**
   * Populate migration phases in the UI
   */
  populateMigrationPhases() {
    const container = document.querySelector('.migration-phases');
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Add phases
    this.phases.forEach(phase => {
      const phaseElement = document.createElement('div');
      phaseElement.className = 'phase';
      phaseElement.id = `phase-${phase.id}`;
      
      // Create phase content
      phaseElement.innerHTML = `
        <div class="phase-icon">
          <i class="fas fa-${phase.icon}"></i>
        </div>
        <div class="phase-content">
          <h4>${phase.title}</h4>
          <p>${phase.description}</p>
          <div class="phase-duration">
            <strong>Duration:</strong> ${phase.duration}
          </div>
          <div class="phase-tasks hidden">
            <strong>Key Tasks:</strong>
            <ul>
              ${phase.tasks.map(task => `<li>${task}</li>`).join('')}
            </ul>
          </div>
          <div class="phase-deliverables hidden">
            <strong>Deliverables:</strong>
            <ul>
              ${phase.deliverables.map(deliverable => `<li>${deliverable}</li>`).join('')}
            </ul>
          </div>
          <button class="btn btn-text phase-details-toggle" data-phase="${phase.id}">
            <i class="fas fa-plus-circle"></i> Show Details
          </button>
        </div>
      `;
      
      // Add to container
      container.appendChild(phaseElement);
      
      // Add event listener to toggle button
      const toggleButton = phaseElement.querySelector('.phase-details-toggle');
      if (toggleButton) {
        toggleButton.addEventListener('click', (e) => {
          const phaseId = e.currentTarget.getAttribute('data-phase');
          this.togglePhaseDetails(phaseId);
        });
      }
    });
  }
  
  /**
   * Toggle phase details visibility
   */
  togglePhaseDetails(phaseId) {
    const phaseElement = document.getElementById(`phase-${phaseId}`);
    if (!phaseElement) return;
    
    const tasksElement = phaseElement.querySelector('.phase-tasks');
    const deliverablesElement = phaseElement.querySelector('.phase-deliverables');
    const toggleButton = phaseElement.querySelector('.phase-details-toggle');
    
    if (tasksElement && deliverablesElement && toggleButton) {
      const isHidden = tasksElement.classList.contains('hidden');
      
      // Toggle visibility
      tasksElement.classList.toggle('hidden', !isHidden);
      deliverablesElement.classList.toggle('hidden', !isHidden);
      
      // Update button text and icon
      if (isHidden) {
        toggleButton.innerHTML = '<i class="fas fa-minus-circle"></i> Hide Details';
      } else {
        toggleButton.innerHTML = '<i class="fas fa-plus-circle"></i> Show Details';
      }
    }
  }
  
  /**
   * Populate migration timeline table
   */
  populateMigrationTimeline() {
    const tableBody = document.getElementById('migration-table-body');
    if (!tableBody) return;
    
    // Clear table
    tableBody.innerHTML = '';
    
    // Add phases to timeline
    this.phases.forEach(phase => {
      const row = document.createElement('tr');
      
      const phaseCell = document.createElement('td');
      phaseCell.textContent = phase.title;
      
      const descriptionCell = document.createElement('td');
      descriptionCell.textContent = phase.description;
      
      const durationCell = document.createElement('td');
      durationCell.textContent = phase.duration;
      
      row.appendChild(phaseCell);
      row.appendChild(descriptionCell);
      row.appendChild(durationCell);
      
      tableBody.appendChild(row);
    });
    
    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.className = 'total-row';
    
    const totalLabelCell = document.createElement('td');
    totalLabelCell.textContent = 'Total Estimated Duration';
    totalLabelCell.style.fontWeight = 'bold';
    
    const emptyCell = document.createElement('td');
    
    const totalDurationCell = document.createElement('td');
    totalDurationCell.textContent = '8-16 weeks';
    totalDurationCell.style.fontWeight = 'bold';
    
    totalRow.appendChild(totalLabelCell);
    totalRow.appendChild(emptyCell);
    totalRow.appendChild(totalDurationCell);
    
    tableBody.appendChild(totalRow);
  }
  
  /**
   * Populate success factors
   */
  populateSuccessFactors() {
    const container = document.querySelector('.success-factors');
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Add success factors
    this.successFactors.forEach(factor => {
      const item = document.createElement('li');
      
      const title = document.createElement('strong');
      title.textContent = factor.title;
      
      item.appendChild(title);
      item.appendChild(document.createTextNode(` - ${factor.description}`));
      
      container.appendChild(item);
    });
  }
  
  /**
   * Populate risk factors
   */
  populateRiskFactors() {
    const container = document.getElementById('risk-factors-container');
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Create risk factors card
    const card = document.createElement('div');
    card.className = 'result-card';
    
    // Add title
    const title = document.createElement('h3');
    title.textContent = 'Risk Management';
    card.appendChild(title);
    
    // Add description
    const description = document.createElement('p');
    description.textContent = 'Potential migration challenges and recommended mitigation strategies:';
    card.appendChild(description);
    
    // Create risks table
    const table = document.createElement('table');
    table.className = 'data-table';
    
    // Add table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const riskHeader = document.createElement('th');
    riskHeader.textContent = 'Risk Factor';
    
    const mitigationHeader = document.createElement('th');
    mitigationHeader.textContent = 'Mitigation Strategy';
    
    headerRow.appendChild(riskHeader);
    headerRow.appendChild(mitigationHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Add table body
    const tbody = document.createElement('tbody');
    
    this.riskFactors.forEach(factor => {
      const row = document.createElement('tr');
      
      const riskCell = document.createElement('td');
      riskCell.textContent = factor.title;
      riskCell.style.fontWeight = '500';
      
      const mitigationCell = document.createElement('td');
      mitigationCell.textContent = factor.mitigation;
      
      row.appendChild(riskCell);
      row.appendChild(mitigationCell);
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    card.appendChild(table);
    
    // Add to container
    container.appendChild(card);
    container.classList.remove('hidden');
  }
  
  /**
   * Generate a customized migration plan based on organization specifics
   */
  generateCustomPlan(organizationDetails) {
    // Implementation would create a customized migration plan
    // based on the organization's specific details
    if (!organizationDetails) return null;
    
    const customPlan = {
      phases: this.phases.map(phase => ({
        ...phase,
        // Adjust duration based on organization size
        duration: this.adjustDurationForSize(phase.duration, organizationDetails.size),
        // Customize tasks based on organization details
        tasks: this.customizeTasks(phase.tasks, organizationDetails)
      })),
      // Calculate total duration
      totalDuration: this.calculateTotalDuration(organizationDetails),
      // Generate resource requirements
      resourceRequirements: this.generateResourceRequirements(organizationDetails),
      // Calculate cost estimates
      costEstimates: this.calculateCostEstimates(organizationDetails)
    };
    
    return customPlan;
  }
  
  /**
   * Adjust duration based on organization size
   */
  adjustDurationForSize(duration, size) {
    const [min, max] = duration.split('-').map(d => parseInt(d));
    
    switch (size) {
      case 'small':
        return `${min} ${min === 1 ? 'week' : 'weeks'}`;
      case 'large':
        return `${max}-${max + 2} weeks`;
      default: // medium
        return duration;
    }
  }
  
  /**
   * Customize tasks based on organization details
   */
  customizeTasks(tasks, details) {
    // Implementation would customize tasks based on:
    // - Current NAC vendor
    // - Organization size
    // - Number of locations
    // - Legacy device percentage
    // - Compliance requirements
    // - etc.
    
    return tasks; // Placeholder
  }
  
  /**
   * Calculate total duration based on organization details
   */
  calculateTotalDuration(details) {
    // Implementation would calculate total duration
    return '8-16 weeks'; // Placeholder
  }
  
  /**
   * Generate resource requirements based on organization details
   */
  generateResourceRequirements(details) {
    // Implementation would generate resource requirements
    return {}; // Placeholder
  }
  
  /**
   * Calculate cost estimates based on organization details
   */
  calculateCostEstimates(details) {
    // Implementation would calculate cost estimates
    return {}; // Placeholder
  }
}

// Initialize and make globally available
window.migrationPlanner = new MigrationPlanner();
EOF

# Create industry-specific compliance information
echo "Creating industry compliance data..."
cat > js/data/industry-templates.js << 'EOF'
/**
 * Industry-specific templates and compliance information
 */
window.industryTemplates = {
  healthcare: {
    name: 'Healthcare',
    defaults: {
      deviceCount: 5000,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 5,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 30,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'Healthcare Compliance Requirements',
      details: 'Healthcare organizations must comply with strict regulations regarding patient data privacy and security, including HIPAA in the US, GDPR in Europe, and various regional healthcare privacy laws.',
      keyRequirements: [
        'Secure authentication for all devices accessing patient data',
        'Real-time device visibility and compliance monitoring',
        'Automatic enforcement of security policies',
        'Detailed audit trails for all network access events',
        'Segmentation of medical devices from administrative networks',
        'Rapid isolation of non-compliant devices'
      ],
      regulations: [
        {
          name: 'HIPAA Security Rule',
          description: 'Requires implementation of technical safeguards for electronic protected health information (ePHI) including access controls, audit controls, integrity controls, and transmission security.',
          relevance: 'NAC solutions provide technical safeguards through authentication, authorization, and audit capabilities, helping satisfy access control and audit control requirements.'
        },
        {
          name: 'HITRUST CSF',
          description: 'Comprehensive security framework that harmonizes requirements from multiple regulations including HIPAA, PCI, NIST, and ISO standards.',
          relevance: 'NAC implementation satisfies numerous HITRUST control requirements related to access control, network protection, and device management.'
        },
        {
          name: 'FDA Cybersecurity Guidance',
          description: 'Guidelines for managing cybersecurity in medical devices throughout the product lifecycle.',
          relevance: 'NAC helps secure connected medical devices by enforcing security policies and isolating vulnerable devices.'
        }
      ]
    },
    hipaaDetails: {
      riskAnalysis: 'Network Access Control is specifically relevant to HIPAA Security Rule requirements for Electronic Protected Health Information (ePHI) safeguards, particularly in access controls, audit controls, and device management.',
      documentationSupport: 'Portnox Cloud provides comprehensive reporting and audit logs that can be used during HIPAA compliance audits to demonstrate adequate security controls.',
      technicalControls: [
        {
          control: '§164.308(a)(4) Information Access Management',
          requirement: 'Implement policies and procedures for authorizing access to ePHI.',
          implementation: 'Portnox enforces role-based access control policies for all network-connected devices, with granular authorization based on device type, user role, location, and compliance status.'
        },
        {
          control: '§164.312(a)(1) Access Control',
          requirement: 'Implement technical policies and procedures for electronic information systems that maintain ePHI to allow access only to authorized persons or software programs.',
          implementation: 'Cloud-based NAC provides centralized authentication and authorization for all network access, with real-time policy enforcement and revocation capabilities.'
        },
        {
          control: '§164.312(b) Audit Controls',
          requirement: 'Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use ePHI.',
          implementation: 'Comprehensive logging of all authentication and authorization decisions, with real-time alerts for policy violations and failed access attempts.'
        },
        {
          control: '§164.312(c)(1) Integrity',
          requirement: 'Implement policies and procedures to protect ePHI from improper alteration or destruction.',
          implementation: 'Device compliance enforcement ensures that only properly secured and updated systems can access sensitive networks containing ePHI.'
        },
        {
          control: '§164.312(e)(1) Transmission Security',
          requirement: 'Implement technical security measures to guard against unauthorized access to ePHI that is being transmitted over an electronic communications network.',
          implementation: 'Secure authentication protocols and encryption enforcement for all network connections, with isolation of non-compliant devices.'
        }
      ]
    },
    challengesMitigated: [
      {
        challenge: 'Medical Device Diversity',
        mitigation: 'Cloud NAC provides flexible authentication options for diverse medical devices, from legacy equipment to modern IoT devices, with custom policies based on device profiles.'
      },
      {
        challenge: 'Continuous Operation Requirements',
        mitigation: 'Zero-downtime deployment model with phased migration ensures critical medical systems remain operational throughout the implementation process.'
      },
      {
        challenge: 'Multi-location Complexity',
        mitigation: 'Centralized cloud management eliminates the need for on-premises hardware at each facility, simplifying deployment across distributed healthcare campuses.'
      },
      {
        challenge: 'Regulatory Documentation',
        mitigation: 'Comprehensive audit logging and compliance reporting capabilities provide evidence for HIPAA audits and security assessments.'
      }
    ],
    benchmarks: {
      averageTCO: 2600000,
      implementationTime: 120,
      fteCost: 450000
    }
  },
  
  finance: {
    name: 'Financial Services',
    defaults: {
      deviceCount: 8000,
      yearsToProject: 5,
      multipleLocations: true,
      locationCount: 15,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 15,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'Financial Services Compliance Requirements',
      details: 'Financial institutions are subject to stringent regulations regarding data security, privacy, and operational resilience, including PCI DSS, SOX, GLBA, and various international banking regulations.',
      keyRequirements: [
        'Multi-factor authentication for all network access',
        'Continuous monitoring and threat detection',
        'Network segmentation for cardholder data environments',
        'Detailed access logs for audit and forensics',
        'Strict device compliance enforcement',
        'Real-time remediation of security violations'
      ],
      regulations: [
        {
          name: 'PCI DSS',
          description: 'Payment Card Industry Data Security Standard provides a framework for developing robust security processes to protect payment systems from breaches and theft of cardholder data.',
          relevance: 'NAC directly supports requirements for restricted network access, least privilege principles, and network segmentation.'
        },
        {
          name: 'GLBA Safeguards Rule',
          description: 'Requires financial institutions to implement comprehensive information security programs to protect customer information.',
          relevance: 'NAC provides technical safeguards through network access controls, device compliance checking, and enforcement of security policies.'
        },
        {
          name: 'SOX (Sarbanes-Oxley)',
          description: 'Requires strict internal controls for financial reporting, including IT systems that process financial data.',
          relevance: 'NAC helps establish traceable access controls for systems containing financial reporting data, supporting audit requirements.'
        },
        {
          name: 'NYDFS Cybersecurity Regulation',
          description: 'Requires financial services companies to implement a cybersecurity program designed to protect consumers' private data.',
          relevance: 'NAC implementation satisfies multiple sections related to access controls, multi-factor authentication, and network monitoring.'
        }
      ]
    },
    challengesMitigated: [
      {
        challenge: 'Complex Multi-Location Deployments',
        mitigation: 'Cloud-based architecture eliminates the need for hardware deployment at each branch location, simplifying implementation across global offices.'
      },
      {
        challenge: 'Strict Change Management Requirements',
        mitigation: 'Phased implementation approach with comprehensive testing at each stage minimizes risk and ensures compliance with change management processes.'
      },
      {
        challenge: 'High Security Standards',
        mitigation: 'Advanced authentication options including certificate-based, RADIUS, SAML, and multi-factor authentication satisfy stringent security requirements.'
      },
      {
        challenge: 'Legacy Banking Systems',
        mitigation: 'Specialized device profiling and policy options for legacy financial systems that cannot support modern authentication methods.'
      }
    ],
    benchmarks: {
      averageTCO: 4500000,
      implementationTime: 180,
      fteCost: 750000
    }
  },
  
  government: {
    name: 'Government',
    defaults: {
      deviceCount: 10000,
      yearsToProject: 5,
      multipleLocations: true,
      locationCount: 25,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 35,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'Government Compliance Requirements',
      details: 'Government agencies must comply with specialized security frameworks including FISMA, NIST SP 800-53, FedRAMP, and various classified information protection standards depending on jurisdiction.',
      keyRequirements: [
        'Strict access controls based on security clearance',
        'Continuous monitoring for unauthorized devices',
        'Network segmentation for classified information',
        'Comprehensive audit logging and reporting',
        'Automated compliance management',
        'Advanced threat prevention capabilities'
      ],
      regulations: [
        {
          name: 'FISMA',
          description: 'Federal Information Security Modernization Act requires federal agencies to develop, document, and implement information security programs.',
          relevance: 'NAC directly supports FISMA requirements for access control, identification and authentication, and system and information integrity.'
        },
        {
          name: 'NIST SP 800-53',
          description: 'Provides security and privacy controls for federal information systems and organizations.',
          relevance: 'NAC implementation satisfies numerous NIST controls, particularly in the AC (Access Control) and IA (Identification and Authentication) families.'
        },
        {
          name: 'FedRAMP',
          description: 'Federal Risk and Authorization Management Program provides a standardized approach to security assessment, authorization, and monitoring for cloud products and services.',
          relevance: 'Cloud-based NAC solutions require FedRAMP certification for government deployment, providing additional security assurances.'
        },
        {
          name: 'CJIS Security Policy',
          description: 'Criminal Justice Information Services Security Policy provides security requirements for criminal justice information systems.',
          relevance: 'NAC helps satisfy advanced authentication requirements for accessing criminal justice information networks.'
        }
      ]
    },
    challengesMitigated: [
      {
        challenge: 'Strict Security Requirements',
        mitigation: 'Advanced authentication options and FedRAMP compliance ensure security standards are met for sensitive government networks.'
      },
      {
        challenge: 'Complex Procurement Processes',
        mitigation: 'Subscription-based cloud model simplifies procurement compared to traditional capital-intensive hardware purchases.'
      },
      {
        challenge: 'Legacy Infrastructure',
        mitigation: 'Specialized authentication options for legacy government systems that cannot support modern protocols.'
      },
      {
        challenge: 'Multi-agency Collaboration',
        mitigation: 'Centralized policy management with role-based administration facilitates secure inter-agency network access.'
      }
    ],
    benchmarks: {
      averageTCO: 5700000,
      implementationTime: 240,
      fteCost: 680000
    }
  },
  
  education: {
    name: 'Education',
    defaults: {
      deviceCount: 15000,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 8,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 25,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'medium'
    },
    complianceInfo: {
      title: 'Education Compliance Requirements',
      details: 'Educational institutions must comply with privacy regulations like FERPA in the US, plus additional data protection laws that vary by region. Higher education institutions with research activities may have additional requirements.',
      keyRequirements: [
        'Secure access for diverse user populations (students, faculty, staff)',
        'BYOD support for student-owned devices',
        'Segmentation of administrative and academic networks',
        'Protection of student records and research data',
        'Guest network access management',
        'Flexible authentication options'
      ],
      regulations: [
        {
          name: 'FERPA',
          description: 'Family Educational Rights and Privacy Act protects the privacy of student education records.',
          relevance: 'NAC helps ensure only authorized personnel can access systems containing educational records.'
        },
        {
          name: 'COPPA',
          description: 'Children\'s Online Privacy Protection Act applies to K-12 institutions and requires protection of personal information collected from children under 13.',
          relevance: 'NAC provides access controls for systems containing protected student information.'
        },
        {
          name: 'GDPR/CCPA',
          description: 'Data protection regulations that may apply to international student data or institutions in specific regions.',
          relevance: 'NAC helps enforce access controls and security policies that support data protection requirements.'
        }
      ]
    },
    challengesMitigated: [
      {
        challenge: 'BYOD Management',
        mitigation: 'Comprehensive support for personally-owned devices with flexible authentication options and automated compliance checking.'
      },
      {
        challenge: 'Limited IT Resources',
        mitigation: 'Cloud management significantly reduces administrative overhead, allowing limited IT staff to manage large numbers of devices.'
      },
      {
        challenge: 'Seasonal User Fluctuations',
        mitigation: 'Elastic licensing model accommodates seasonal changes in device counts without additional costs.'
      },
      {
        challenge: 'Public Wi-Fi Security',
        mitigation: 'Enhanced security for open campus networks with guest access control and dynamic policy enforcement.'
      }
    ],
    benchmarks: {
      averageTCO: 1800000,
      implementationTime: 90,
      fteCost: 320000
    }
  },
  
  manufacturing: {
    name: 'Manufacturing',
    defaults: {
      deviceCount: 12000,
      yearsToProject: 5,
      multipleLocations: true,
      locationCount: 6,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 45,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'Manufacturing Compliance Requirements',
      details: 'Manufacturing organizations often need to comply with industry standards for operational technology (OT) security, industrial control systems protection, and intellectual property safeguards.',
      keyRequirements: [
        'OT/IT network segmentation',
        'Industrial control system protection',
        'Legacy manufacturing equipment support',
        'Intellectual property protection',
        'Supply chain security',
        'Compliance with industry-specific standards'
      ],
      regulations: [
        {
          name: 'IEC 62443',
          description: 'Standard for security for industrial automation and control systems.',
          relevance: 'NAC helps enforce network segmentation between IT and OT networks and protects industrial control systems.'
        },
        {
          name: 'NIST Manufacturing Profile',
          description: 'Framework for improving critical infrastructure cybersecurity in manufacturing environments.',
          relevance: 'NAC supports multiple controls in the NIST Manufacturing Profile, particularly in the access control domain.'
        },
        {
          name: 'ITAR',
          description: 'International Traffic in Arms Regulations that control the export of defense-related articles and services.',
          relevance: 'NAC helps prevent unauthorized access to networks containing ITAR-protected technical data.'
        }
      ]
    },
    challengesMitigated: [
      {
        challenge: 'OT/IT Convergence',
        mitigation: 'Specialized policies for operational technology devices with appropriate security measures that don\'t disrupt manufacturing operations.'
      },
      {
        challenge: 'Legacy Manufacturing Systems',
        mitigation: 'Comprehensive support for legacy industrial systems with specialized authentication methods and security controls.'
      },
      {
        challenge: 'Distributed Production Facilities',
        mitigation: 'Cloud-based management eliminates the need for on-premises hardware at each manufacturing location.'
      },
      {
        challenge: 'Intellectual Property Protection',
        mitigation: 'Advanced network segmentation and access controls protect sensitive design and production data.'
      }
    ],
    benchmarks: {
      averageTCO: 3200000,
      implementationTime: 160,
      fteCost: 520000
    }
  },
  
  retail: {
    name: 'Retail',
    defaults: {
      deviceCount: 8000,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 200,
      complexAuthentication: false,
      legacyDevices: true,
      legacyPercentage: 30,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'medium'
    },
    complianceInfo: {
      title: 'Retail Compliance Requirements',
      details: 'Retail organizations must comply with payment card industry standards and consumer data protection regulations, balancing security requirements with operational efficiency across distributed store locations.',
      keyRequirements: [
        'PCI DSS compliance for payment environments',
        'Point-of-sale system security',
        'Standardized security across all locations',
        'Secure guest Wi-Fi networks',
        'IoT device management for in-store technology',
        'Supply chain access control'
      ],
      regulations: [
        {
          name: 'PCI DSS',
          description: 'Payment Card Industry Data Security Standard provides a framework for developing secure payment systems.',
          relevance: 'NAC directly supports PCI DSS requirements for network segmentation, access control, and authentication.'
        },
        {
          name: 'CCPA/GDPR',
          description: 'Consumer privacy regulations that govern the collection and protection of customer data.',
          relevance: 'NAC helps enforce access controls for systems containing protected consumer information.'
        }
      ]
    },
    challengesMitigated: [
      {
        challenge: 'Highly Distributed Locations',
        mitigation: 'Cloud-based architecture eliminates the need for on-premises hardware at each retail location, significantly reducing deployment complexity.'
      },
      {
        challenge: 'Limited Local IT Support',
        mitigation: 'Centralized management allows headquarters IT to manage security across all locations without requiring local technical expertise.'
      },
      {
        challenge: 'POS System Security',
        mitigation: 'Specialized policies for point-of-sale systems with appropriate segmentation from consumer and guest networks.'
      },
      {
        challenge: 'Seasonal Staffing Fluctuations',
        mitigation: 'Simplified onboarding and offboarding processes for seasonal employees with automated policy enforcement.'
      }
    ],
    benchmarks: {
      averageTCO: 2800000,
      implementationTime: 120,
      fteCost: 380000
    }
  }
};
EOF

# Create enhanced reporting classes
echo "Creating enhanced PDF report generator..."
cat > js/reports/enhanced-pdf-generator.js << 'EOF'
/**
 * Enhanced PDF Report Generator
 * Provides comprehensive, customizable reports for different audiences
 */
class EnhancedPDFReportGenerator {
  constructor() {
    this.defaultOptions = {
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    };
    
    this.colors = {
      primary: [5, 84, 124],      // Portnox blue
      primaryLight: [27, 141, 192],
      accent: [101, 189, 68],     // Portnox green
      accentLight: [142, 208, 112],
      text: [32, 32, 32],
      textLight: [80, 80, 80],
      background: [248, 249, 250],
      border: [224, 224, 224]
    };
    
    this.customerLogo = null;
  }
  
  /**
   * Set customer logo for reports
   * @param {string} logoDataUrl - Base64 encoded logo image
   */
  setCustomerLogo(logoDataUrl) {
    this.customerLogo = logoDataUrl;
  }
  
  /**
   * Generate PDF report based on results and report type
   * @param {Object} results - Calculation results
   * @param {string} currentVendor - Current vendor ID
   * @param {string} reportType - Report type (complete, executive, financial, technical)
   * @param {Object} options - Additional options
   * @returns {Object} jsPDF document object
   */
  generateReport(results, currentVendor, reportType = 'complete', options = {}) {
    if (!results || !results[currentVendor] || !results['portnox']) {
      throw new Error('Invalid results data');
    }
    
    // Create PDF document
    const { jsPDF } = window.jspdf;
    if (!jsPDF) {
      throw new Error('jsPDF library not available');
    }
    
    const doc = new jsPDF(this.defaultOptions);
    
    // Add customer info if provided
    const customerInfo = options.customerInfo || null;
    
    // Generate report based on type
    switch(reportType) {
      case 'executive':
        this.generateExecutiveSummary(doc, results, currentVendor, customerInfo);
        break;
      case 'financial':
        this.generateFinancialAnalysis(doc, results, currentVendor, customerInfo);
        break;
      case 'technical':
        this.generateTechnicalReport(doc, results, currentVendor, customerInfo);
        break;
      case 'compliance':
        this.generateComplianceReport(doc, results, currentVendor, customerInfo, options.industryData);
        break;
      case 'complete':
      default:
        this.generateCompleteReport(doc, results, currentVendor, customerInfo);
    }
    
    return doc;
  }
  
  /**
   * Generate executive summary
   * Brief, high-level overview for decision makers
   */
  generateExecutiveSummary(doc, results, currentVendor, customerInfo) {
    // Get results data
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    const yearsToProject = results.yearsToProject;
    
    // Calculate key metrics
    const savingsAmount = currentResults.totalCosts - portnoxResults.totalCosts;
    const savingsPercentage = (savingsAmount / currentResults.totalCosts) * 100;
    
    // Create cover page
    this.createCoverPage(doc, 'Executive Summary', results, currentVendor, customerInfo);
    
    // Add organization overview
    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(...this.colors.primary);
    doc.text('Executive Summary', 20, 20);
    
    // Key findings section
    doc.setFontSize(14);
    doc.text('Key Findings', 20, 40);
    
    // Create key metrics box
    doc.setFillColor(...this.colors.background);
    doc.setDrawColor(...this.colors.border);
    doc.roundedRect(20, 45, 170, 50, 3, 3, 'FD');
    
    doc.setFontSize(18);
    doc.setTextColor(...this.colors.accent);
    doc.text(`${savingsPercentage.toFixed(1)}% Total Cost Reduction`, 105, 60, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text(`${window.formatCurrency(savingsAmount)} Savings Over ${yearsToProject} Years`, 105, 75, { align: 'center' });
    
    // Implementation time savings
    if (results.implementationResults && results.implementationResults[currentVendor] && results.implementationResults['portnox']) {
      const currentImplementationTime = results.implementationResults[currentVendor];
      const portnoxImplementationTime = results.implementationResults['portnox'];
      const timeSavings = currentImplementationTime - portnoxImplementationTime;
      const timeSavingsPercentage = (timeSavings / currentImplementationTime) * 100;
      
      doc.text(`${timeSavingsPercentage.toFixed(0)}% Faster Implementation (${timeSavings} days)`, 105, 85, { align: 'center' });
    }
    
    // Add summary text
    doc.setFontSize(11);
    doc.setTextColor(...this.colors.text);
    doc.text('This analysis compares the Total Cost of Ownership (TCO) between your current', 20, 110);
    doc.text(`${currentResults.vendorName} NAC solution and Portnox Cloud over a ${yearsToProject}-year period.`, 20, 117);
    doc.text('The analysis includes all direct and indirect costs including hardware, software,', 20, 130);
    doc.text('maintenance, implementation, and ongoing operational expenses.', 20, 137);
    
    // Add TCO comparison table
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('TCO Comparison', 20, 160);
    
    // Prepare table data
    const headers = ['Cost Category', currentResults.vendorName, 'Portnox Cloud', 'Savings'];
    
    const tableData = [
      ['Initial Costs',
        window.formatCurrency(currentResults.totalInitialCosts),
        window.formatCurrency(portnoxResults.totalInitialCosts),
        window.formatCurrency(currentResults.totalInitialCosts - portnoxResults.totalInitialCosts)
      ],
      ['Operational Costs (Annual)',
        window.formatCurrency(currentResults.annualCosts),
        window.formatCurrency(portnoxResults.annualCosts),
        window.formatCurrency(currentResults.annualCosts - portnoxResults.annualCosts)
      ],
      [`Total ${yearsToProject}-Year TCO`,
        window.formatCurrency(currentResults.totalCosts),
        window.formatCurrency(portnoxResults.totalCosts),
        window.formatCurrency(savingsAmount)
      ]
    ];
    
    // Create table
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 165,
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5
      }
    });
    
    // Add key benefits section
    doc.addPage();
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Key Benefits of Portnox Cloud', 20, 20);
    
    // Define benefits
    const benefits = [
      {
        title: 'Reduced Capital Expenditure',
        description: 'Zero hardware deployment eliminates upfront investments in appliances, servers, and infrastructure.',
        metric: '100% Hardware Cost Elimination'
      },
      {
        title: 'Simplified Deployment',
        description: 'Cloud-based architecture with lightweight connectors eliminates complex on-premises installations.',
        metric: `${results.implementationResults ? (results.implementationResults[currentVendor] - results.implementationResults['portnox']) : '60'} Days Faster Implementation`
      },
      {
        title: 'Lower Operational Overhead',
        description: 'Automated updates, maintenance, and scaling reduce IT staff time requirements.',
        metric: `${((currentResults.fteCost - portnoxResults.fteCost) / currentResults.fteCost * 100).toFixed(0)}% IT Staff Time Reduction`
      },
      {
        title: 'Multi-Location Efficiency',
        description: 'Single cloud instance manages all locations without requiring hardware at each site.',
        metric: 'Uniform Security Across All Locations'
      },
      {
        title: 'Continuous Compliance',
        description: 'Automated policy enforcement and comprehensive reporting ensure ongoing security compliance.',
        metric: 'Real-Time Compliance Monitoring'
      },
      {
        title: 'Future-Proof Solution',
        description: 'Automatic updates and new feature releases ensure the solution evolves with security needs.',
        metric: 'No Hardware Refresh Requirements'
      }
    ];
    
    // Create benefits grid
    let yPos = 30;
    benefits.forEach((benefit, index) => {
      // Check if we need to add a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFillColor(...this.colors.background);
      doc.setDrawColor(...this.colors.border);
      doc.roundedRect(20, yPos, 170, 32, 3, 3, 'FD');
      
      doc.setFontSize(12);
      doc.setTextColor(...this.colors.primary);
      doc.text(benefit.title, 25, yPos + 10);
      
      doc.setFontSize(10);
      doc.setTextColor(...this.colors.text);
      doc.text(benefit.description, 25, yPos + 20);
      
      doc.setFontSize(11);
      doc.setTextColor(...this.colors.accent);
      doc.text(benefit.metric, 25, yPos + 28);
      
      yPos += 40;
    });
    
    // Add recommendations
    doc.addPage();
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Strategic Recommendations', 20, 20);
    
    doc.setFontSize(11);
    doc.setTextColor(...this.colors.text);
    
    const recommendations = [
      `Transition from ${currentResults.vendorName} to Portnox Cloud to achieve significant cost savings and operational efficiencies.`,
      'Leverage cloud-based NAC solution to reduce hardware costs and simplify deployment across multiple locations.',
      'Minimize IT staff overhead with a managed NAC solution that requires less administrative time.',
      'Improve security posture with automatic updates and seamless scaling capabilities.',
      'Implement a phased migration approach starting with non-critical network segments to minimize disruption.',
      `Reinvest the projected ${yearsToProject}-year savings of ${window.formatCurrency(savingsAmount)} in other critical security initiatives.`
    ];
    
    yPos = 30;
    recommendations.forEach(recommendation => {
      doc.circle(25, yPos - 2, 1.5, 'F');
      doc.text(recommendation, 30, yPos, { maxWidth: 160 });
      
      // Calculate height of wrapped text and adjust yPos accordingly
      const textLines = doc.splitTextToSize(recommendation, 160);
      yPos += textLines.length * 7;
    });
    
    // Add next steps section
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Next Steps', 20, yPos + 10);
    
    doc.setFontSize(11);
    doc.setTextColor(...this.colors.text);
    
    const nextSteps = [
      'Schedule a Portnox Cloud demo to see the solution in action',
      'Request a detailed migration plan customized to your environment',
      'Identify pilot deployment candidates for initial implementation',
      'Review detailed financial analysis for budgeting purposes'
    ];
    
    yPos += 20;
    nextSteps.forEach(step => {
      doc.setTextColor(...this.colors.accent);
      doc.text(`→`, 25, yPos);
      doc.setTextColor(...this.colors.text);
      doc.text(step, 30, yPos);
      yPos += 10;
    });
    
    // Add footer with page numbers
    this.addFooter(doc, 'Executive Summary');
  }
  
  /**
   * Generate financial analysis
   * Detailed cost breakdown for financial teams
   */
  generateFinancialAnalysis(doc, results, currentVendor, customerInfo) {
    // Get results data
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    const yearsToProject = results.yearsToProject;
    
    // Calculate key metrics
    const savingsAmount = currentResults.totalCosts - portnoxResults.totalCosts;
    const savingsPercentage = (savingsAmount / currentResults.totalCosts) * 100;
    
    // Create cover page
    this.createCoverPage(doc, 'Financial Analysis', results, currentVendor, customerInfo);
    
    // Add financial analysis title
    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(...this.colors.primary);
    doc.text('Financial Analysis', 20, 20);
    
    // Add organization info
    doc.setFontSize(12);
    doc.setTextColor(...this.colors.text);
    doc.text('Organization Parameters', 20, 40);
    
    // Create parameters table
    const paramHeaders = ['Parameter', 'Value'];
    const paramData = [
      ['Device Count', results.deviceCount],
      ['Organization Size', results.orgSize.charAt(0).toUpperCase() + results.orgSize.slice(1)],
      ['Years Projected', yearsToProject],
      ['Multiple Locations', results.multipleLocations ? 'Yes' : 'No'],
      ['Location Count', results.locationCount],
      ['Complex Authentication', results.complexAuthentication ? 'Yes' : 'No'],
      ['Legacy Devices', results.legacyDevices ? 'Yes' : 'No'],
      ['Legacy Percentage', results.legacyPercentage + '%'],
      ['Cloud Integration', results.cloudIntegration ? 'Yes' : 'No']
    ];
    
    doc.autoTable({
      head: [paramHeaders],
      body: paramData,
      startY: 45,
      theme: 'plain',
      styles: {
        fontSize: 10
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 40 }
      }
    });
    
    // Add cost comparison table
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Cost Comparison', 20, doc.autoTable.previous.finalY + 15);
    
    // Prepare cost comparison table
    const costHeaders = ['Cost Component', currentResults.vendorName, 'Portnox Cloud', 'Savings', 'Savings %'];
    
    // Calculate individual savings
    const hardwareSavings = currentResults.hardwareCost - portnoxResults.hardwareCost;
    const networkRedesignSavings = currentResults.networkRedesignCost - portnoxResults.networkRedesignCost;
    const implementationSavings = currentResults.implementationCost - portnoxResults.implementationCost;
    const trainingSavings = currentResults.trainingCost - portnoxResults.trainingCost;
    const migrationCosts = -portnoxResults.migrationCost; // Migration is a cost, not a saving
    const maintenanceSavings = (currentResults.maintenanceCost - portnoxResults.maintenanceCost) * yearsToProject;
    const licensingSavings = (currentResults.licensingCost - portnoxResults.licensingCost) * yearsToProject;
    const fteSavings = (currentResults.fteCost - portnoxResults.fteCost) * yearsToProject;
    const downtimeSavings = (currentResults.annualDowntimeCost - portnoxResults.annualDowntimeCost) * yearsToProject;
    
    // Calculate savings percentages
    const hardwareSavingsPct = currentResults.hardwareCost > 0 ? (hardwareSavings / currentResults.hardwareCost) * 100 : 0;
    const networkRedesignSavingsPct = currentResults.networkRedesignCost > 0 ? (networkRedesignSavings / currentResults.networkRedesignCost) * 100 : 0;
    const implementationSavingsPct = currentResults.implementationCost > 0 ? (implementationSavings / currentResults.implementationCost) * 100 : 0;
    const trainingSavingsPct = currentResults.trainingCost > 0 ? (trainingSavings / currentResults.trainingCost) * 100 : 0;
    const migrationCostsPct = 'N/A';
    const maintenanceSavingsPct = currentResults.maintenanceCost > 0 ? (maintenanceSavings / (currentResults.maintenanceCost * yearsToProject)) * 100 : 0;
    const licensingSavingsPct = currentResults.licensingCost > 0 ? (licensingSavings / (currentResults.licensingCost * yearsToProject)) * 100 : 0;
    const fteSavingsPct = currentResults.fteCost > 0 ? (fteSavings / (currentResults.fteCost * yearsToProject)) * 100 : 0;
    const downtimeSavingsPct = currentResults.annualDowntimeCost > 0 ? (downtimeSavings / (currentResults.annualDowntimeCost * yearsToProject)) * 100 : 0;
    
    const costData = [
      ['Hardware Costs',
        window.formatCurrency(currentResults.hardwareCost),
        window.formatCurrency(portnoxResults.hardwareCost),
        window.formatCurrency(hardwareSavings),
        hardwareSavingsPct.toFixed(1) + '%'
      ],
      ['Network Redesign',
        window.formatCurrency(currentResults.networkRedesignCost),
        window.formatCurrency(portnoxResults.networkRedesignCost),
        window.formatCurrency(networkRedesignSavings),
        networkRedesignSavingsPct.toFixed(1) + '%'
      ],
      ['Implementation',
        window.formatCurrency(currentResults.implementationCost),
        window.formatCurrency(portnoxResults.implementationCost),
        window.formatCurrency(implementationSavings),
        implementationSavingsPct.toFixed(1) + '%'
      ],
      ['Training',
        window.formatCurrency(currentResults.trainingCost),
        window.formatCurrency(portnoxResults.trainingCost),
        window.formatCurrency(trainingSavings),
        trainingSavingsPct.toFixed(1) + '%'
      ],
      ['Migration Costs',
        window.formatCurrency(0),
        window.formatCurrency(portnoxResults.migrationCost),
        window.formatCurrency(migrationCosts),
        migrationCostsPct
      ],
      [`Maintenance (${yearsToProject} years)`,
        window.formatCurrency(currentResults.maintenanceCost * yearsToProject),
        window.formatCurrency(portnoxResults.maintenanceCost * yearsToProject),
        window.formatCurrency(maintenanceSavings),
        maintenanceSavingsPct.toFixed(1) + '%'
      ],
      [`Licensing (${yearsToProject} years)`,
        window.formatCurrency(currentResults.licensingCost * yearsToProject),
        window.formatCurrency(portnoxResults.licensingCost * yearsToProject),
        window.formatCurrency(licensingSavings),
        licensingSavingsPct.toFixed(1) + '%'
      ],
      [`Personnel (${yearsToProject} years)`,
        window.formatCurrency(currentResults.fteCost * yearsToProject),
        window.formatCurrency(portnoxResults.fteCost * yearsToProject),
        window.formatCurrency(fteSavings),
        fteSavingsPct.toFixed(1) + '%'
      ],
      [`Downtime (${yearsToProject} years)`,
        window.formatCurrency(currentResults.annualDowntimeCost * yearsToProject),
        window.formatCurrency(portnoxResults.annualDowntimeCost * yearsToProject),
        window.formatCurrency(downtimeSavings),
        downtimeSavingsPct.toFixed(1) + '%'
      ],
      [`Total ${yearsToProject}-Year TCO`,
        window.formatCurrency(currentResults.totalCosts),
        window.formatCurrency(portnoxResults.totalCosts),
        window.formatCurrency(savingsAmount),
        savingsPercentage.toFixed(1) + '%'
      ]
    ];
    
    doc.autoTable({
      head: [costHeaders],
      body: costData,
      startY: doc.autoTable.previous.finalY + 20,
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 45 },
        1: { cellWidth: 35, halign: 'right' },
        2: { cellWidth: 35, halign: 'right' },
        3: { cellWidth: 35, halign: 'right' },
        4: { cellWidth: 30, halign: 'right' }
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5,
        fontSize: 8
      },
      didParseCell: function(data) {
        // Highlight total row
        if (data.row.index === costData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [230, 230, 230];
        }
        
        // Highlight savings cells
        if (data.column.index === 3 || data.column.index === 4) {
          // Check if the value is a saving (positive) or cost (negative)
          if (data.row.index < costData.length - 1) { // Skip the total row
            const savingsText = costData[data.row.index][3];
            const savingsValue = parseFloat(savingsText.replace(/[^0-9.-]+/g, ''));
            if (savingsValue > 0) {
              data.cell.styles.textColor = [101, 189, 68]; // Green for savings
            } else if (savingsValue < 0) {
              data.cell.styles.textColor = [220, 53, 69]; // Red for costs
            }
          }
        }
      }
    });
    
    // Add annual costs breakdown
    doc.addPage();
    
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Annual Cost Breakdown', 20, 20);
    
    // Prepare annual costs table
	# Continuing with the enhanced-pdf-generator.js file:
cat >> js/reports/enhanced-pdf-generator.js << 'EOF'
    const annualHeaders = ['Annual Cost Component', currentResults.vendorName, 'Portnox Cloud', 'Annual Savings'];

    const annualData = [
      ['Maintenance',
        window.formatCurrency(currentResults.maintenanceCost),
        window.formatCurrency(portnoxResults.maintenanceCost),
        window.formatCurrency(currentResults.maintenanceCost - portnoxResults.maintenanceCost)
      ],
      ['Licensing',
        window.formatCurrency(currentResults.licensingCost),
        window.formatCurrency(portnoxResults.licensingCost),
        window.formatCurrency(currentResults.licensingCost - portnoxResults.licensingCost)
      ],
      ['Personnel (FTE)',
        window.formatCurrency(currentResults.fteCost),
        window.formatCurrency(portnoxResults.fteCost),
        window.formatCurrency(currentResults.fteCost - portnoxResults.fteCost)
      ],
      ['Downtime',
        window.formatCurrency(currentResults.annualDowntimeCost),
        window.formatCurrency(portnoxResults.annualDowntimeCost),
        window.formatCurrency(currentResults.annualDowntimeCost - portnoxResults.annualDowntimeCost)
      ],
      ['Total Annual Cost',
        window.formatCurrency(currentResults.annualCosts),
        window.formatCurrency(portnoxResults.annualCosts),
        window.formatCurrency(currentResults.annualCosts - portnoxResults.annualCosts)
      ]
    ];

    doc.autoTable({
      head: [annualHeaders],
      body: annualData,
      startY: 25,
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5
      },
      didParseCell: function(data) {
        // Highlight total row
        if (data.row.index === annualData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [230, 230, 230];
        }
        
        // Highlight savings cells
        if (data.column.index === 3) {
          const savingsText = annualData[data.row.index][3];
          const savingsValue = parseFloat(savingsText.replace(/[^0-9.-]+/g, ''));
          if (savingsValue > 0) {
            data.cell.styles.textColor = [101, 189, 68]; // Green for savings
          } else if (savingsValue < 0) {
            data.cell.styles.textColor = [220, 53, 69]; // Red for costs
          }
        }
      }
    });

    // Add ROI analysis
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Return on Investment Analysis', 20, doc.autoTable.previous.finalY + 20);

    // Calculate ROI metrics
    const initialInvestment = portnoxResults.totalInitialCosts - currentResults.totalInitialCosts;
    const annualSavings = currentResults.annualCosts - portnoxResults.annualCosts;

    // Only calculate if there are annual savings
    if (annualSavings > 0) {
      const breakEvenYears = initialInvestment > 0 ? initialInvestment / annualSavings : 0;
      const breakEvenMonths = Math.round(breakEvenYears * 12);

      const roi = ((savingsAmount - initialInvestment) / Math.max(initialInvestment, 1)) * 100;

      // Draw ROI box
      doc.setDrawColor(...this.colors.border);
      doc.setFillColor(...this.colors.background);
      doc.roundedRect(20, doc.autoTable.previous.finalY + 25, 170, 50, 3, 3, 'FD');

      // Add ROI metrics
      doc.setFontSize(12);
      doc.setTextColor(...this.colors.text);

      doc.text(`Initial Investment Difference: ${window.formatCurrency(initialInvestment)}`, 30, doc.autoTable.previous.finalY + 35);
      doc.text(`Annual Savings: ${window.formatCurrency(annualSavings)}`, 30, doc.autoTable.previous.finalY + 45);
      doc.text(`Break-even Point: ${breakEvenMonths} months (${breakEvenYears.toFixed(1)} years)`, 30, doc.autoTable.previous.finalY + 55);
      doc.text(`${yearsToProject}-Year ROI: ${roi.toFixed(1)}%`, 30, doc.autoTable.previous.finalY + 65);

      // Add NPV analysis if initial investment is positive
      if (initialInvestment > 0) {
        doc.setFontSize(14);
        doc.setTextColor(...this.colors.primary);
        doc.text('NPV Analysis', 20, doc.autoTable.previous.finalY + 85);

        // Assume 10% discount rate
        const discountRate = 0.10;

        // Calculate NPV
        let npv = -initialInvestment;
        for (let i = 1; i <= yearsToProject; i++) {
          npv += annualSavings / Math.pow(1 + discountRate, i);
        }

        // Draw NPV box
        doc.setDrawColor(...this.colors.border);
        doc.setFillColor(...this.colors.background);
        doc.roundedRect(20, doc.autoTable.previous.finalY + 90, 170, 40, 3, 3, 'FD');

        // Add NPV metrics
        doc.setFontSize(12);
        doc.setTextColor(...this.colors.text);

        doc.text(`Discount Rate: 10%`, 30, doc.autoTable.previous.finalY + 100);
        doc.text(`Net Present Value (NPV): ${window.formatCurrency(npv)}`, 30, doc.autoTable.previous.finalY + 110);
        doc.text(`NPV-to-Investment Ratio: ${(npv / initialInvestment).toFixed(2)}`, 30, doc.autoTable.previous.finalY + 120);
      }
    } else {
      // If no annual savings, indicate immediate savings
      doc.setFontSize(12);
      doc.setTextColor(...this.colors.text);
      doc.text('Portnox provides immediate cost advantages with both lower initial and ongoing costs.', 20, doc.autoTable.previous.finalY + 35);
      doc.text(`No break-even analysis needed as there is immediate ${savingsPercentage.toFixed(1)}% savings.`, 20, doc.autoTable.previous.finalY + 45);
    }

    // Add budget impact section
    doc.addPage();
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Budgetary Impact', 20, 20);

    // Create a simple table showing yearly costs for both solutions
    const budgetHeaders = ['Year', currentResults.vendorName, 'Portnox Cloud', 'Annual Savings', 'Cumulative Savings'];
    const budgetData = [];

    // Initial year (Year 0)
    budgetData.push([
      'Initial Deployment',
      window.formatCurrency(currentResults.totalInitialCosts),
      window.formatCurrency(portnoxResults.totalInitialCosts),
      window.formatCurrency(currentResults.totalInitialCosts - portnoxResults.totalInitialCosts),
      window.formatCurrency(currentResults.totalInitialCosts - portnoxResults.totalInitialCosts)
    ]);

    // Subsequent years
    let cumulativeSavings = currentResults.totalInitialCosts - portnoxResults.totalInitialCosts;
    for (let i = 1; i <= yearsToProject; i++) {
      const annualSaving = currentResults.annualCosts - portnoxResults.annualCosts;
      cumulativeSavings += annualSaving;

      budgetData.push([
        `Year ${i}`,
        window.formatCurrency(currentResults.annualCosts),
        window.formatCurrency(portnoxResults.annualCosts),
        window.formatCurrency(annualSaving),
        window.formatCurrency(cumulativeSavings)
      ]);
    }

    // Total row
    budgetData.push([
      `Total (${yearsToProject} Years)`,
      window.formatCurrency(currentResults.totalCosts),
      window.formatCurrency(portnoxResults.totalCosts),
      window.formatCurrency(savingsAmount),
      ''
    ]);

    doc.autoTable({
      head: [budgetHeaders],
      body: budgetData,
      startY: 30,
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5
      },
      didParseCell: function(data) {
        // Highlight total row
        if (data.row.index === budgetData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [230, 230, 230];
        }
        
        // Highlight savings cells
        if (data.column.index === 3 || data.column.index === 4) {
          const savingsText = data.row.raw[data.column.index];
          if (savingsText) {
            const savingsValue = parseFloat(savingsText.replace(/[^0-9.-]+/g, ''));
            if (savingsValue > 0) {
              data.cell.styles.textColor = [101, 189, 68]; // Green for savings
            } else if (savingsValue < 0) {
              data.cell.styles.textColor = [220, 53, 69]; // Red for costs
            }
          }
        }
      }
    });

    // Add financial summary
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Financial Summary', 20, doc.autoTable.previous.finalY + 20);

    doc.setFontSize(11);
    doc.setTextColor(...this.colors.text);
    
    const summary = [
      `The financial analysis shows a total cost of ownership reduction of ${savingsPercentage.toFixed(1)}% over ${yearsToProject} years by migrating from ${currentResults.vendorName} to Portnox Cloud.`,
      `This represents a total savings of ${window.formatCurrency(savingsAmount)} that could be reallocated to other strategic initiatives.`,
      `The cloud-based architecture eliminates hardware costs and reduces ongoing maintenance and IT staff requirements.`,
      `The subscription-based pricing model converts capital expenditures to operational expenditures, improving budget predictability.`
    ];

    let yPos = doc.autoTable.previous.finalY + 30;
    summary.forEach(paragraph => {
      doc.text(paragraph, 20, yPos, { maxWidth: 170 });
      yPos += 12;
    });

    // Add footer with page numbers
    this.addFooter(doc, 'Financial Analysis');
  }
  
  /**
   * Generate technical report
   * Implementation and technical details for IT teams
   */
  generateTechnicalReport(doc, results, currentVendor, customerInfo) {
    // Get results data
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    const yearsToProject = results.yearsToProject;

    // Create cover page
    this.createCoverPage(doc, 'Technical Report', results, currentVendor, customerInfo);

    // Add technical overview
    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(...this.colors.primary);
    doc.text('Technical Report', 20, 20);

    doc.setFontSize(14);
    doc.text('Environment Details', 20, 40);

    // Create environment table
    const envHeaders = ['Parameter', 'Value'];
    const envData = [
      ['Device Count', results.deviceCount],
      ['Organization Size', results.orgSize.charAt(0).toUpperCase() + results.orgSize.slice(1)],
      ['Multiple Locations', results.multipleLocations ? 'Yes' : 'No'],
      ['Location Count', results.locationCount],
      ['Complex Authentication', results.complexAuthentication ? 'Yes' : 'No'],
      ['Legacy Devices', results.legacyDevices ? 'Yes' : 'No'],
      ['Legacy Percentage', results.legacyPercentage + '%'],
      ['Cloud Integration', results.cloudIntegration ? 'Yes' : 'No'],
      ['Custom Policies', results.customPolicies ? 'Yes' : 'No'],
      ['Policy Complexity', results.policyComplexity.charAt(0).toUpperCase() + results.policyComplexity.slice(1)]
    ];

    doc.autoTable({
      head: [envHeaders],
      body: envData,
      startY: 45,
      theme: 'plain',
      styles: {
        fontSize: 10
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 40 }
      }
    });

    // Add implementation comparison
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Implementation Comparison', 20, doc.autoTable.previous.finalY + 15);

    // Get implementation timeline data
    const vendorData = window.vendorData || {};
    const currentVendorData = vendorData[currentVendor] || {};
    const portnoxData = vendorData['portnox'] || {};

    if (currentVendorData && portnoxData) {
      const orgSize = results.orgSize || 'medium';

      const currentTimeline = currentVendorData[orgSize]?.implementationTimeline || {};
      const portnoxTimeline = portnoxData[orgSize]?.implementationTimeline || {};

      // Combine all phase names
      const phases = new Set([...Object.keys(currentTimeline), ...Object.keys(portnoxTimeline)]);

      // Prepare implementation table
      const implHeaders = ['Implementation Phase', currentResults.vendorName, 'Portnox Cloud', 'Time Savings'];
      const implData = [];

      // Add rows for each phase
      phases.forEach(phase => {
        const currentDays = currentTimeline[phase] || 0;
        const portnoxDays = portnoxTimeline[phase] || 0;
        const savings = currentDays - portnoxDays;

        implData.push([
          phase.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
          currentDays + ' days',
          portnoxDays + ' days',
          savings > 0 ? savings + ' days' : '-'
        ]);
      });

      // Add total row
      const currentTotal = Object.values(currentTimeline).reduce((sum, days) => sum + days, 0);
      const portnoxTotal = Object.values(portnoxTimeline).reduce((sum, days) => sum + days, 0);
      const totalSavings = currentTotal - portnoxTotal;

      implData.push([
        'Total Implementation Time',
        currentTotal + ' days',
        portnoxTotal + ' days',
        totalSavings > 0 ? totalSavings + ' days' : '-'
      ]);

      doc.autoTable({
        head: [implHeaders],
        body: implData,
        startY: doc.autoTable.previous.finalY + 20,
        theme: 'grid',
        headStyles: {
          fillColor: this.colors.primary,
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        styles: {
          cellPadding: 5
        },
        didParseCell: function(data) {
          // Highlight total row
          if (data.row.index === implData.length - 1) {
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.fillColor = [230, 230, 230];
          }
          
          // Highlight savings cells
          if (data.column.index === 3) {
            const savingsText = data.row.raw[data.column.index];
            if (savingsText && savingsText !== '-') {
              data.cell.styles.textColor = [101, 189, 68]; // Green for savings
            }
          }
        }
      });
    }

    // Add architecture comparison
    doc.addPage();

    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Architecture Comparison', 20, 20);

    // Create Cloud vs On-Premises comparison table
    const archHeaders = ['Feature', 'On-Premises NAC', 'Portnox Cloud'];

    const archData = [
      ['Deployment Model', 'Hardware appliances', 'SaaS solution, no hardware'],
      ['Initial Setup', '2-4 weeks typical setup time', 'Same-day deployment'],
      ['Redundancy', 'Requires additional hardware', 'Built-in cloud redundancy'],
      ['Updates & Patching', 'Manual update process', 'Automatic updates'],
      ['Scalability', 'Requires hardware sizing', 'Unlimited elastic scaling'],
      ['Multi-Location Support', 'Requires hardware at each site', 'Single cloud instance for all sites'],
      ['Remote Access', 'VPN or additional appliances', 'Native anywhere access'],
      ['Disaster Recovery', 'Requires separate DR site', 'Built-in geo-redundancy'],
      ['Administrator Overhead', 'High maintenance requirements', 'Minimal administration'],
      ['Implementation Complexity', 'Complex network integration', 'Simple cloud connector model']
    ];

    doc.autoTable({
      head: [archHeaders],
      body: archData,
      startY: 25,
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 70 },
        2: { cellWidth: 70 }
      },
      styles: {
        cellPadding: 5
      },
      didParseCell: function(data) {
        // Highlight cloud advantages
        if (data.column.index === 2) {
          data.cell.styles.textColor = [101, 189, 68]; // Green for Portnox advantages
        }
      }
    });

    // Add migration plan
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Migration Plan', 20, doc.autoTable.previous.finalY + 20);

    // Define migration phases
    const migrationPhases = [
      {
        phase: 'Assessment & Discovery',
        description: 'Evaluate current environment, identify devices, authentication methods, and network topology.',
        duration: '3-5 days'
      },
      {
        phase: 'Architecture Planning',
        description: 'Design authentication flows and integration points for cloud NAC solution.',
        duration: '3-5 days'
      },
      {
        phase: 'Portnox Cloud Setup',
        description: 'Configure cloud portal, authentication methods, and deploy local connectors.',
        duration: '1-2 days'
      },
      {
        phase: 'Policy Migration',
        description: 'Transfer and adapt existing policies to the cloud platform.',
        duration: '2-4 days'
      },
      {
        phase: 'Pilot Deployment',
        description: 'Test with limited device groups to verify configuration and policy enforcement.',
        duration: '3-5 days'
      },
      {
        phase: 'Full Deployment',
        description: 'Expand to all network segments and user groups, phase out legacy solution.',
        duration: '5-10 days'
      }
    ];

    // Create migration plan table
    const migrationHeaders = ['Phase', 'Description', 'Estimated Duration'];
    const migrationData = migrationPhases.map(phase => [
      phase.phase,
      phase.description,
      phase.duration
    ]);

    doc.autoTable({
      head: [migrationHeaders],
      body: migrationData,
      startY: doc.autoTable.previous.finalY + 25,
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 100 },
        2: { cellWidth: 40 }
      },
      styles: {
        cellPadding: 5
      }
    });

    // Add IT resource utilization comparison
    doc.addPage();

    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('IT Resource Utilization Comparison', 20, 20);

    // Get FTE allocation
    const currentFTE = currentVendorData[orgSize]?.fteAllocation || {};
    const portnoxFTE = portnoxData[orgSize]?.fteAllocation || {};

    // Create FTE comparison table
    const fteHeaders = ['IT Role', currentResults.vendorName, 'Portnox Cloud', 'FTE Reduction'];

    const fteData = [
      ['Network Administrator',
        (currentFTE.networkAdmin || 0.5).toFixed(2) + ' FTE',
        (portnoxFTE.networkAdmin || 0.2).toFixed(2) + ' FTE',
        ((currentFTE.networkAdmin || 0.5) - (portnoxFTE.networkAdmin || 0.2)).toFixed(2) + ' FTE'
      ],
      ['Security Administrator',
        (currentFTE.securityAdmin || 0.4).toFixed(2) + ' FTE',
        (portnoxFTE.securityAdmin || 0.15).toFixed(2) + ' FTE',
        ((currentFTE.securityAdmin || 0.4) - (portnoxFTE.securityAdmin || 0.15)).toFixed(2) + ' FTE'
      ],
      ['System Administrator',
        (currentFTE.systemAdmin || 0.3).toFixed(2) + ' FTE',
        (portnoxFTE.systemAdmin || 0.05).toFixed(2) + ' FTE',
        ((currentFTE.systemAdmin || 0.3) - (portnoxFTE.systemAdmin || 0.05)).toFixed(2) + ' FTE'
      ],
      ['Help Desk',
        (currentFTE.helpDesk || 0.1).toFixed(2) + ' FTE',
        (portnoxFTE.helpDesk || 0.05).toFixed(2) + ' FTE',
        ((currentFTE.helpDesk || 0.1) - (portnoxFTE.helpDesk || 0.05)).toFixed(2) + ' FTE'
      ],
      ['Total IT Staff',
        ((currentFTE.networkAdmin || 0.5) + (currentFTE.securityAdmin || 0.4) +
         (currentFTE.systemAdmin || 0.3) + (currentFTE.helpDesk || 0.1)).toFixed(2) + ' FTE',
        ((portnoxFTE.networkAdmin || 0.2) + (portnoxFTE.securityAdmin || 0.15) +
         (portnoxFTE.systemAdmin || 0.05) + (portnoxFTE.helpDesk || 0.05)).toFixed(2) + ' FTE',
        (((currentFTE.networkAdmin || 0.5) + (currentFTE.securityAdmin || 0.4) +
          (currentFTE.systemAdmin || 0.3) + (currentFTE.helpDesk || 0.1)) -
         ((portnoxFTE.networkAdmin || 0.2) + (portnoxFTE.securityAdmin || 0.15) +
          (portnoxFTE.systemAdmin || 0.05) + (portnoxFTE.helpDesk || 0.05))).toFixed(2) + ' FTE'
      ]
    ];

    doc.autoTable({
      head: [fteHeaders],
      body: fteData,
      startY: 25,
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5
      },
      didParseCell: function(data) {
        // Highlight total row
        if (data.row.index === fteData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [230, 230, 230];
        }
        
        // Highlight reduction cells
        if (data.column.index === 3) {
          data.cell.styles.textColor = [101, 189, 68]; // Green for reduction
        }
      }
    });

    // Add feature comparison section
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Feature Comparison', 20, doc.autoTable.previous.finalY + 20);
    
    // Create feature comparison table
    const featureHeaders = ['Feature', currentResults.vendorName, 'Portnox Cloud'];
    
    const featureData = [
      ['Deployment Model', 'On-premises hardware', 'Cloud SaaS'],
      ['Authentication Support', '802.1X, MAC, Web Portal', '802.1X, MAC, Web Portal, SAML, Certificate'],
      ['Multi-factor Authentication', 'Limited', 'Comprehensive'],
      ['BYOD Support', 'Basic', 'Advanced'],
      ['Guest Access', 'Yes', 'Yes, with self-service'],
      ['IoT Device Support', 'Basic', 'Advanced profiling'],
      ['Integration Capabilities', 'Limited APIs', 'Extensive API support'],
      ['HA/DR Capabilities', 'Requires additional hardware', 'Built-in redundancy'],
      ['Automatic Updates', 'Manual process', 'Automatic'],
      ['Compliance Reporting', 'Basic', 'Comprehensive']
    ];
    
    doc.autoTable({
      head: [featureHeaders],
      body: featureData,
      startY: doc.autoTable.previous.finalY + 25,
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5
      }
    });

    // Add technical recommendations
    doc.addPage();
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Technical Recommendations', 20, 20);

    const recommendations = [
      {
        title: 'Phase Migration Approach',
        details: 'Implement a phased migration starting with non-critical segments to validate configurations and minimize disruption.'
      },
      {
        title: 'Authentication Integration',
        details: 'Leverage existing Active Directory/LDAP infrastructure with SAML or RADIUS for seamless authentication.'
      },
      {
        title: 'Policy Migration Strategy',
        details: 'Document existing policies and map to Portnox equivalent constructs, prioritizing critical security policies.'
      },
      {
        title: 'Network Visibility',
        details: 'Deploy cloud connectors at strategic network locations to ensure comprehensive device visibility.'
      },
      {
        title: 'Testing Methodology',
        details: 'Implement A/B testing between current NAC and Portnox to validate policy enforcement before full cutover.'
      },
      {
        title: 'Legacy System Handling',
        details: 'Create custom policies for legacy devices that cannot support modern authentication methods.'
      }
    ];

    let yPos = 30;
    recommendations.forEach(recommendation => {
      doc.setFontSize(12);
      doc.setTextColor(...this.colors.primary);
      doc.setFont(undefined, 'bold');
      doc.text(recommendation.title, 20, yPos);
      doc.setFont(undefined, 'normal');

      doc.setFontSize(10);
      doc.setTextColor(...this.colors.text);
      doc.text(recommendation.details, 25, yPos + 7, { maxWidth: 165 });

      yPos += 20;
    });

    // Add technical benefits section
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Technical Benefits', 20, yPos + 10);

    const benefits = [
      'Simplified architecture with cloud-based management',
      'Reduced hardware footprint and associated maintenance',
      'Automatic updates and new feature rollouts',
      'Improved scalability and performance',
      'Enhanced monitoring and reporting capabilities',
      'Reduced IT staff time for routine management tasks',
      'Greater flexibility for remote and distributed workforces',
      'More comprehensive device profiling and control',
      'Simplified integration with other security tools',
      'Faster response to emerging threats and vulnerabilities'
    ];

    yPos += 20;
    benefits.forEach(benefit => {
      doc.setFontSize(10);
      doc.setTextColor(...this.colors.text);
      doc.circle(25, yPos - 2, 1.5, 'F');
      doc.text(benefit, 30, yPos);
      yPos += 10;
    });

    // Add footer with page numbers
    this.addFooter(doc, 'Technical Report');
  }
  
  /**
   * Generate compliance report
   * Specialized report focusing on compliance aspects
   */
  generateComplianceReport(doc, results, currentVendor, customerInfo, industryData) {
    // Get results data
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    const yearsToProject = results.yearsToProject;
    
    // Create cover page
    this.createCoverPage(doc, 'Compliance Report', results, currentVendor, customerInfo);
    
    // Add compliance overview
    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(...this.colors.primary);
    doc.text('Compliance Requirements Overview', 20, 20);
    
    if (!industryData) {
      // Generic compliance information if industry data is not available
      doc.setFontSize(12);
      doc.setTextColor(...this.colors.text);
      doc.text('Network Access Control solutions are critical components for maintaining', 20, 40);
      doc.text('regulatory compliance across multiple frameworks including PCI DSS, HIPAA,', 20, 47);
      doc.text('NIST, ISO 27001, and other industry-specific regulations.', 20, 54);
      
      // Add general compliance requirements
      doc.setFontSize(14);
      doc.setTextColor(...this.colors.primary);
      doc.text('Key Compliance Requirements Addressed by NAC', 20, 74);
      
      const requirements = [
        'Access Control: Implement technical controls to restrict network access to authorized devices and users',
        'Authentication: Enforce strong authentication mechanisms appropriate to the level of risk',
        'Asset Management: Maintain inventory of devices connecting to the network',
        'Monitoring: Continuously monitor network access events and policy violations',
        'Audit Logging: Generate detailed logs of all authentication and authorization activities',
        'Network Segmentation: Enforce separation between different security zones',
        'Vulnerability Management: Identify and isolate non-compliant or vulnerable devices'
      ];
      
      let yPos = 84;
      requirements.forEach(requirement => {
        doc.setFontSize(10);
        doc.setTextColor(...this.colors.text);
        doc.circle(25, yPos - 2, 1.5, 'F');
        doc.text(requirement, 30, yPos, { maxWidth: 160 });
        
        // Calculate height of wrapped text and adjust yPos accordingly
        const textLines = doc.splitTextToSize(requirement, 160);
        yPos += textLines.length * 7;
      });
    } else {
      // Industry-specific compliance information
      doc.setFontSize(12);
      doc.setTextColor(...this.colors.text);
      doc.text(industryData.complianceInfo.details, 20, 40, { maxWidth: 170 });
      
      // Add industry-specific requirements
      doc.setFontSize(14);
      doc.setTextColor(...this.colors.primary);
      doc.text('Key Compliance Requirements', 20, 70);
      
      let yPos = 80;
      industryData.complianceInfo.keyRequirements.forEach(requirement => {
        doc.setFontSize(10);
        doc.setTextColor(...this.colors.text);
        doc.circle(25, yPos - 2, 1.5, 'F');
        doc.text(requirement, 30, yPos);
        yPos += 10;
      });
      
      // Add applicable regulations
      doc.setFontSize(14);
      doc.setTextColor(...this.colors.primary);
      doc.text('Applicable Regulations', 20, yPos + 10);
      
      const regHeaders = ['Regulation', 'Description', 'NAC Relevance'];
      const regData = industryData.complianceInfo.regulations.map(reg => [
        reg.name,
        reg.description,
        reg.relevance
      ]);
      
      doc.autoTable({
        head: [regHeaders],
        body: regData,
        startY: yPos + 20,
        theme: 'grid',
        headStyles: {
          fillColor: this.colors.primary,
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 70 },
          2: { cellWidth: 70 }
        },
        styles: {
          cellPadding: 5,
          fontSize: 9
        }
      });
    }
    
    // Add compliance gap analysis
    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(...this.colors.primary);
    doc.text('Compliance Gap Analysis', 20, 20);
    
    // Create comparison table for compliance capabilities
    doc.setFontSize(14);
    doc.text('Compliance Capabilities Comparison', 20, 40);
    
    const complianceHeaders = ['Compliance Capability', currentResults.vendorName, 'Portnox Cloud'];
    
    const complianceData = [
      ['Authentication Management', 'Basic methods', 'Comprehensive methods including MFA'],
      ['Detailed Audit Logging', 'Limited retention', 'Extended retention with search'],
      ['Real-time Compliance Checks', 'Limited', 'Comprehensive'],
      ['Automated Remediation', 'Basic', 'Advanced'],
      ['Reporting Capabilities', 'Manual report generation', 'Automated compliance reports'],
      ['Integration with SIEM', 'Limited', 'Comprehensive API'],
      ['Policy Consistency', 'Varies by location', 'Uniform across all locations'],
      ['Compliance Dashboards', 'Basic', 'Advanced with drill-down'],
      ['Continuous Monitoring', 'Periodic', 'Real-time'],
      ['Device Authentication Options', 'Limited', 'Extensive']
    ];
    
    doc.autoTable({
      head: [complianceHeaders],
      body: complianceData,
      startY: 45,
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5
      },
      didParseCell: function(data) {
        // Highlight Portnox advantages
        if (data.column.index === 2) {
          data.cell.styles.textColor = [101, 189, 68]; // Green for Portnox advantages
        }
      }
    });
    
    // Add compliance improvement section
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.primary);
    doc.text('Compliance Improvements with Cloud NAC', 20, doc.autoTable.previous.finalY + 20);
    
    const improvements = [
      {
        title: 'Centralized Policy Management',
        description: 'Ensures consistent application of security policies across all network segments and locations from a single management console.'
      },
      {
        title: 'Enhanced Visibility',
        description: 'Provides comprehensive visibility into all connected devices, their security posture, and compliance status in real time.'
      },
      {
        title: 'Automated Compliance Enforcement',
        description: 'Automatically enforces security policies and quarantines non-compliant devices without manual intervention.'
      },
      {
        title: 'Comprehensive Audit Trail',
        description: 'Maintains detailed logs of all authentication and authorization events to support audit requirements.'
      },
      {
        title: 'Continuous Compliance Monitoring',
        description: 'Continuously monitors device compliance status and detects changes that may affect security posture.'
      },
      {
        title: 'Simplified Compliance Reporting',
        description: 'Provides pre-built reports aligned with common regulatory frameworks to streamline audit processes.'
      }
    ];
    
    let yPos = doc.autoTable.previous.finalY + 35;
    improvements.forEach(improvement => {
      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 30;
      }
      
      doc.setFontSize(12);
      doc.setTextColor(...this.colors.primary);
      doc.setFont(undefined, 'bold');
      doc.text(improvement.title, 20, yPos);
      doc.setFont(undefined, 'normal');
      
      doc.setFontSize(10);
      doc.setTextColor(...this.colors.text);
      doc.text(improvement.description, 25, yPos + 7, { maxWidth: 165 });
      
      yPos += 25;
    });
    
    // Add industry-specific challenges mitigated section if available
    if (industryData && industryData.challengesMitigated) {
      doc.addPage();
      doc.setFontSize(14);
      doc.setTextColor(...this.colors.primary);
      doc.text('Industry-Specific Challenges Mitigated', 20, 20);
      
      let yPos = 35;
      industryData.challengesMitigated.forEach(challenge => {
        doc.setFontSize(12);
        doc.setTextColor(...this.colors.primary);
        doc.setFont(undefined, 'bold');
        doc.text(challenge.challenge, 20, yPos);
        doc.setFont(undefined, 'normal');
        
        doc.setFontSize(10);
        doc.setTextColor(...this.colors.text);
        doc.text(challenge.mitigation, 25, yPos + 7, { maxWidth: 165 });
        
        yPos += 25;
      });
    }
    
    // Add benchmarking if available
    if (industryData && industryData.benchmarks) {
      const benchmarks = industryData.benchmarks;
      
      doc.setFontSize(14);
      doc.setTextColor(...this.colors.primary);
      
      if (yPos > 200) {
        doc.addPage();
        yPos = 20;
      } else {
        yPos += 10;
      }
      
      doc.text('Industry Benchmarking', 20, yPos);
      
      // Create benchmark table
      const benchmarkHeaders = ['Metric', 'Industry Average', 'Your Projected Results', 'Improvement'];
      
      const averageTCO = benchmarks.averageTCO || 3000000;
      const tcoDifference = averageTCO - portnoxResults.totalCosts;
      const tcoPercentage = (tcoDifference / averageTCO) * 100;
      
      const averageImplementationTime = benchmarks.implementationTime || 150;
      const timeProjected = results.implementationResults?.['portnox'] || 60;
      const timeDifference = averageImplementationTime - timeProjected;
      const timePercentage = (timeDifference / averageImplementationTime) * 100;
      
      const averageFTECost = benchmarks.fteCost || 500000;
      const fteProjected = portnoxResults.fteCost * yearsToProject;
      const fteDifference = averageFTECost - fteProjected;
      const ftePercentage = (fteDifference / averageFTECost) * 100;
      
      const benchmarkData = [
        ['Total Cost of Ownership',
          window.formatCurrency(averageTCO),
          window.formatCurrency(portnoxResults.totalCosts),
          tcoPercentage.toFixed(1) + '% below average'
        ],
        ['Implementation Time',
          averageImplementationTime + ' days',
          timeProjected + ' days',
          timePercentage.toFixed(1) + '% faster'
        ],
        ['IT Staff Costs',
          window.formatCurrency(averageFTECost),
          window.formatCurrency(fteProjected),
          ftePercentage.toFixed(1) + '% lower'
        ]
      ];
      
      doc.autoTable({
        head: [benchmarkHeaders],
        body: benchmarkData,
        startY: yPos + 10,
        theme: 'grid',
        headStyles: {
          fillColor: this.colors.primary,
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        styles: {
          cellPadding: 5
        },
        didParseCell: function(data) {
          // Highlight improvements
          if (data.column.index === 3) {
            data.cell.styles.textColor = [101, 189, 68]; // Green for improvements
          }
        }
      });
    }
    
    // Add compliance recommendations
    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(...this.colors.primary);
    doc.text('Compliance Recommendations', 20, 20);
    
    doc.setFontSize(11);
    doc.setTextColor(...this.colors.text);
    doc.text('To maximize compliance benefits from implementing Portnox Cloud NAC, consider the following recommendations:', 20, 35, { maxWidth: 170 });
    
    const recommendations = [
      {
        title: 'Map Compliance Requirements to NAC Policies',
        description: 'Document specific compliance requirements applicable to your organization and map them to NAC policies to ensure comprehensive coverage.'
      },
      {
        title: 'Develop a Phased Implementation Plan',
        description: 'Create a phased approach that prioritizes critical assets and compliance requirements to minimize disruption and maximize security benefits.'
      },
      {
        title: 'Integrate with Existing Security Tools',
        description: 'Leverage Portnox Cloud\'s API capabilities to integrate with SIEM, vulnerability management, and other security tools for a unified security approach.'
      },
      {
        title: 'Establish Compliance Reporting Procedures',
        description: 'Define regular compliance reporting procedures that utilize Portnox Cloud\'s reporting capabilities to support ongoing compliance verification.'
      },
      {
        title: 'Create Role-Based Administration',
        description: 'Define role-based access controls within the NAC management console to comply with least privilege principles.'
      },
      {
        title: 'Document NAC Controls for Auditors',
        description: 'Create comprehensive documentation that maps NAC controls to specific compliance requirements for auditor review.'
      },
      {
        title: 'Test Compliance Scenarios',
        description: 'Regularly test compliance scenarios to validate that NAC policies correctly enforce regulatory requirements.'
      }
    ];
    
    let yPos = 50;
    recommendations.forEach(recommendation => {
      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(12);
      doc.setTextColor(...this.colors.primary);
      doc.setFont(undefined, 'bold');
      doc.text(recommendation.title, 20, yPos);
      doc.setFont(undefined, 'normal');
      
      doc.setFontSize(10);
      doc.setTextColor(...this.colors.text);
      doc.text(recommendation.description, 25, yPos + 7, { maxWidth: 165 });
      
      yPos += 25;
    });
    
    // Add footer with page numbers
    this.addFooter(doc, 'Compliance Report');
  }
  
  /**
   * Generate complete report
   * Comprehensive TCO analysis with all sections
   */
  generateCompleteReport(doc, results, currentVendor, customerInfo) {
    // Create cover page
    this.createCoverPage(doc, 'Complete TCO Analysis', results, currentVendor, customerInfo);

    // Add table of contents
    doc.addPage();
    this.createTableOfContents(doc);

    // Add executive summary (simplified version)
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(...this.colors.primary);
    doc.text('1. Executive Summary', 20, 20);

    // Include executive content (simpler version)
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    const yearsToProject = results.yearsToProject;

    // Calculate key metrics
    const savingsAmount = currentResults.totalCosts - portnoxResults.totalCosts;
    const savingsPercentage = (savingsAmount / currentResults.totalCosts) * 100;

    doc.setFontSize(10);
    doc.setTextColor(...this.colors.text);
    doc.text(`This report analyzes the total cost of ownership (TCO) for Network Access Control solutions,`, 20, 35);
    doc.text(`comparing ${currentResults.vendorName} with Portnox Cloud for an organization with ${results.deviceCount} devices`, 20, 42);
    doc.text(`over a ${yearsToProject}-year period.`, 20, 49);

    // Create key metrics box
    doc.setDrawColor(...this.colors.border);
    doc.setFillColor(...this.colors.background);
    doc.roundedRect(20, 60, 170, 50, 3, 3, 'FD');

    doc.setFontSize(14);
    doc.setTextColor(...this.colors.accent);
    doc.text(`${savingsPercentage.toFixed(1)}% Total Cost Reduction with Portnox Cloud`, 105, 75, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`${window.formatCurrency(savingsAmount)} Savings Over ${yearsToProject} Years`, 105, 85, { align: 'center' });

    // Implementation time savings
    if (results.implementationResults && results.implementationResults[currentVendor] && results.implementationResults['portnox']) {
      const currentImplementationTime = results.implementationResults[currentVendor];
      const portnoxImplementationTime = results.implementationResults['portnox'];
      const timeSavings = currentImplementationTime - portnoxImplementationTime;
      const timeSavingsPercentage = (timeSavings / currentImplementationTime) * 100;

      doc.text(`${timeSavingsPercentage.toFixed(0)}% Faster Implementation (${timeSavings} days)`, 105, 95, { align: 'center' });
    }

    // Add organization details section
    doc.setFontSize(16);
    doc.setTextColor(...this.colors.primary);
    doc.text('2. Organization Profile', 20, 130);

    doc.setFontSize(10);
    doc.setTextColor(...this.colors.text);

    // Create organization details table
    const orgHeaders = ['Parameter', 'Value'];
    const orgData = [
      ['Device Count', results.deviceCount],
      ['Organization Size', results.orgSize.charAt(0).toUpperCase() + results.orgSize.slice(1)],
      ['Years to Project', yearsToProject],
      ['Multiple Locations', results.multipleLocations ? 'Yes' : 'No'],
      ['Location Count', results.locationCount],
      ['Complex Authentication', results.complexAuthentication ? 'Yes' : 'No'],
      ['Legacy Devices', results.legacyDevices ? 'Yes' : 'No'],
      ['Legacy Percentage', results.legacyPercentage + '%'],
      ['Cloud Integration', results.cloudIntegration ? 'Yes' : 'No'],
      ['Custom Policies', results.customPolicies ? 'Yes' : 'No'],
      ['Policy Complexity', results.policyComplexity.charAt(0).toUpperCase() + results.policyComplexity.slice(1)]
    ];

    doc.autoTable({
      head: [orgHeaders],
      body: orgData,
      startY: 140,
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5
      }
    });

    // Add financial analysis section
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(...this.colors.primary);
    doc.text('3. Financial Analysis', 20, 20);

    // TCO comparison
    doc.setFontSize(12);
    doc.text('3.1 TCO Comparison', 20, 35);

    // Prepare TCO table
    const tcoHeaders = ['Cost Component', currentResults.vendorName, 'Portnox Cloud', 'Savings'];

    const tcoData = [
      ['Hardware Costs',
        window.formatCurrency(currentResults.hardwareCost),
        window.formatCurrency(portnoxResults.hardwareCost),
        window.formatCurrency(currentResults.hardwareCost - portnoxResults.hardwareCost)
      ],
      ['Network Redesign',
        window.formatCurrency(currentResults.networkRedesignCost),
        window.formatCurrency(portnoxResults.networkRedesignCost),
        window.formatCurrency(currentResults.networkRedesignCost - portnoxResults.networkRedesignCost)
      ],
      ['Implementation',
        window.formatCurrency(currentResults.implementationCost),
        window.formatCurrency(portnoxResults.implementationCost),
        window.formatCurrency(currentResults.implementationCost - portnoxResults.implementationCost)
      ],
      ['Training',
        window.formatCurrency(currentResults.trainingCost),
        window.formatCurrency(portnoxResults.trainingCost),
        window.formatCurrency(currentResults.trainingCost - portnoxResults.trainingCost)
      ],
      ['Migration Costs',
        window.formatCurrency(0),
        window.formatCurrency(portnoxResults.migrationCost),
        window.formatCurrency(-portnoxResults.migrationCost)
      ],
      [`Maintenance (${yearsToProject} years)`,
        window.formatCurrency(currentResults.maintenanceCost * yearsToProject),
        window.formatCurrency(portnoxResults.maintenanceCost * yearsToProject),
        window.formatCurrency((currentResults.maintenanceCost - portnoxResults.maintenanceCost) * yearsToProject)
      ],
      [`Licensing (${yearsToProject} years)`,
        window.formatCurrency(currentResults.licensingCost * yearsToProject),
        window.formatCurrency(portnoxResults.licensingCost * yearsToProject),
        window.formatCurrency((currentResults.licensingCost - portnoxResults.licensingCost) * yearsToProject)
      ],
      [`Personnel (${yearsToProject} years)`,
        window.formatCurrency(currentResults.fteCost * yearsToProject),
        window.formatCurrency(portnoxResults.fteCost * yearsToProject),
        window.formatCurrency((currentResults.fteCost - portnoxResults.fteCost) * yearsToProject)
      ],
      [`Downtime (${yearsToProject} years)`,
        window.formatCurrency(currentResults.annualDowntimeCost * yearsToProject),
        window.formatCurrency(portnoxResults.annualDowntimeCost * yearsToProject),
        window.formatCurrency((currentResults.annualDowntimeCost - portnoxResults.annualDowntimeCost) * yearsToProject)
      ],
      [`Total ${yearsToProject}-Year TCO`,
        window.formatCurrency(currentResults.totalCosts),
        window.formatCurrency(portnoxResults.totalCosts),
        window.formatCurrency(savingsAmount)
      ]
    ];

    doc.autoTable({
      head: [tcoHeaders],
      body: tcoData,
      startY: 40,
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 45, halign: 'right' },
        2: { cellWidth: 45, halign: 'right' },
        3: { cellWidth: 45, halign: 'right' }
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5,
        fontSize: 8
      },
      didParseCell: function(data) {
        // Highlight total row
        if (data.row.index === tcoData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [230, 230, 230];
        }

        // Highlight savings cells
        if (data.column.index === 3) {
          // Check if the value is a saving (positive) or cost (negative)
          if (data.row.index < tcoData.length - 1) { // Skip the total row
            const savingsText = tcoData[data.row.index][3];
            const savingsValue = parseFloat(savingsText.replace(/[^0-9.-]+/g, ''));
            if (savingsValue > 0) {
              data.cell.styles.textColor = [101, 189, 68]; // Green for savings
            } else if (savingsValue < 0) {
              data.cell.styles.textColor = [220, 53, 69]; // Red for costs
            }
          } else {
            // Total row savings
            data.cell.styles.textColor = [101, 189, 68]; // Green for total savings
          }
        }
      }
    });

    // Add annual costs section
    doc.setFontSize(12);
    doc.setTextColor(...this.colors.primary);
    doc.text('3.2 Annual Operating Costs', 20, doc.autoTable.previous.finalY + 15);

    // Prepare annual costs table
    const annualHeaders = ['Annual Cost Component', currentResults.vendorName, 'Portnox Cloud', 'Annual Savings'];

    const annualData = [
      ['Maintenance',
        window.formatCurrency(currentResults.maintenanceCost),
        window.formatCurrency(portnoxResults.maintenanceCost),
        window.formatCurrency(currentResults.maintenanceCost - portnoxResults.maintenanceCost)
      ],
      ['Licensing',
        window.formatCurrency(currentResults.licensingCost),
        window.formatCurrency(portnoxResults.licensingCost),
        window.formatCurrency(currentResults.licensingCost - portnoxResults.licensingCost)
      ],
      ['Personnel (FTE)',
        window.formatCurrency(currentResults.fteCost),
        window.formatCurrency(portnoxResults.fteCost),
        window.formatCurrency(currentResults.fteCost - portnoxResults.fteCost)
      ],
      ['Downtime',
        window.formatCurrency(currentResults.annualDowntimeCost),
        window.formatCurrency(portnoxResults.annualDowntimeCost),
        window.formatCurrency(currentResults.annualDowntimeCost - portnoxResults.annualDowntimeCost)
      ],
      ['Total Annual Cost',
        window.formatCurrency(currentResults.annualCosts),
        window.formatCurrency(portnoxResults.annualCosts),
        window.formatCurrency(currentResults.annualCosts - portnoxResults.annualCosts)
      ]
    ];

    doc.autoTable({
      head: [annualHeaders],
      body: annualData,
      startY: doc.autoTable.previous.finalY + 20,
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5
      },
      didParseCell: function(data) {
        // Highlight total row
        if (data.row.index === annualData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [230, 230, 230];
        }
        
        // Highlight savings cells
        if (data.column.index === 3) {
          const savingsText = annualData[data.row.index][3];
          const savingsValue = parseFloat(savingsText.replace(/[^0-9.-]+/g, ''));
          if (savingsValue > 0) {
            data.cell.styles.textColor = [101, 189, 68]; // Green for savings
          } else if (savingsValue < 0) {
            data.cell.styles.textColor = [220, 53, 69]; // Red for costs
          }
        }
      }
    });

    // Add ROI analysis
    doc.setFontSize(12);
    doc.setTextColor(...this.colors.primary);
    doc.text('3.3 Return on Investment', 20, doc.autoTable.previous.finalY + 15);

    // Calculate ROI metrics
    const initialInvestment = portnoxResults.totalInitialCosts - currentResults.totalInitialCosts;
    const annualSavings = currentResults.annualCosts - portnoxResults.annualCosts;

    // Add ROI info
    if (annualSavings > 0) {
      const breakEvenYears = initialInvestment > 0 ? initialInvestment / annualSavings : 0;
      const breakEvenMonths = Math.round(breakEvenYears * 12);

      // Create ROI table
      const roiHeaders = ['ROI Metric', 'Value'];
      const roiData = [
        ['Initial Investment', window.formatCurrency(initialInvestment)],
        ['Annual Savings', window.formatCurrency(annualSavings)],
        ['Break-even Point', `${breakEvenMonths} months (${breakEvenYears.toFixed(1)} years)`],
        ['5-Year Savings', window.formatCurrency(annualSavings * 5 - initialInvestment)]
      ];

      doc.autoTable({
        head: [roiHeaders],
        body: roiData,
        startY: doc.autoTable.previous.finalY + 20,
        theme: 'grid',
        headStyles: {
          fillColor: this.colors.primary,
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        styles: {
          cellPadding: 5
        }
      });
    } else {
      // If no annual savings, indicate immediate savings
      doc.setFontSize(10);
      doc.setTextColor(...this.colors.text);
      doc.text('Portnox provides immediate cost advantages with both lower initial and ongoing costs.', 20, doc.autoTable.previous.finalY + 25);
      doc.text(`No break-even analysis needed as there is immediate ${savingsPercentage.toFixed(1)}% savings.`, 20, doc.autoTable.previous.finalY + 32);
    }

    // Add technical analysis section
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(...this.colors.primary);
    doc.text('4. Technical Analysis', 20, 20);

    // Add implementation comparison
    doc.setFontSize(12);
    doc.text('4.1 Implementation Comparison', 20, 35);

    // Get implementation timeline data
    const vendorData = window.vendorData || {};
    const currentVendorData = vendorData[currentVendor] || {};
    const portnoxData = vendorData['portnox'] || {};

    if (currentVendorData && portnoxData) {
      const orgSize = results.orgSize || 'medium';

      const currentTimeline = currentVendorData[orgSize]?.implementationTimeline || {};
      const portnoxTimeline = portnoxData[orgSize]?.implementationTimeline || {};

      // Combine all phase names
      const phases = new Set([...Object.keys(currentTimeline), ...Object.keys(portnoxTimeline)]);

      // Prepare implementation table
      const implHeaders = ['Implementation Phase', currentResults.vendorName, 'Portnox Cloud', 'Time Savings'];
      const implData = [];

      // Add rows
	  # Continuing with the enhanced-pdf-generator.js file:
cat >> js/reports/enhanced-pdf-generator.js << 'EOF'
      // Add rows for each phase
      phases.forEach(phase => {
        const currentDays = currentTimeline[phase] || 0;
        const portnoxDays = portnoxTimeline[phase] || 0;
        const savings = currentDays - portnoxDays;

        implData.push([
          phase.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
          currentDays + ' days',
          portnoxDays + ' days',
          savings > 0 ? savings + ' days' : '-'
        ]);
      });

      // Add total row
      const currentTotal = Object.values(currentTimeline).reduce((sum, days) => sum + days, 0);
      const portnoxTotal = Object.values(portnoxTimeline).reduce((sum, days) => sum + days, 0);
      const totalSavings = currentTotal - portnoxTotal;

      implData.push([
        'Total Implementation Time',
        currentTotal + ' days',
        portnoxTotal + ' days',
        totalSavings > 0 ? totalSavings + ' days' : '-'
      ]);

      doc.autoTable({
        head: [implHeaders],
        body: implData,
        startY: 40,
        theme: 'grid',
        headStyles: {
          fillColor: this.colors.primary,
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        styles: {
          cellPadding: 5
        },
        didParseCell: function(data) {
          // Highlight total row
          if (data.row.index === implData.length - 1) {
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.fillColor = [230, 230, 230];
          }
          
          // Highlight savings cells
          if (data.column.index === 3) {
            const savingsText = data.row.raw[data.column.index];
            if (savingsText && savingsText !== '-') {
              data.cell.styles.textColor = [101, 189, 68]; // Green for savings
            }
          }
        }
      });
    }

    // Add architecture comparison
    doc.setFontSize(12);
    doc.setTextColor(...this.colors.primary);
    doc.text('4.2 Architecture Comparison', 20, doc.autoTable.previous.finalY + 15);

    // Create Cloud vs On-Premises comparison table
    const archHeaders = ['Feature', 'On-Premises NAC', 'Portnox Cloud'];

    const archData = [
      ['Deployment Model', 'Hardware appliances', 'SaaS solution, no hardware'],
      ['Initial Setup', '2-4 weeks typical setup time', 'Same-day deployment'],
      ['Redundancy', 'Requires additional hardware', 'Built-in cloud redundancy'],
      ['Updates & Patching', 'Manual update process', 'Automatic updates'],
      ['Scalability', 'Requires hardware sizing', 'Unlimited elastic scaling'],
      ['Multi-Location Support', 'Requires hardware at each site', 'Single cloud instance for all sites'],
      ['Remote Access', 'VPN or additional appliances', 'Native anywhere access'],
      ['Disaster Recovery', 'Requires separate DR site', 'Built-in geo-redundancy']
    ];

    doc.autoTable({
      head: [archHeaders],
      body: archData,
      startY: doc.autoTable.previous.finalY + 20,
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 70 },
        2: { cellWidth: 70 }
      },
      styles: {
        cellPadding: 5
      },
      didParseCell: function(data) {
        // Highlight cloud advantages
        if (data.column.index === 2) {
          data.cell.styles.textColor = [101, 189, 68]; // Green for Portnox advantages
        }
      }
    });

    // Add IT resource utilization
    doc.addPage();

    doc.setFontSize(12);
    doc.setTextColor(...this.colors.primary);
    doc.text('4.3 IT Resource Utilization', 20, 20);

    // Get FTE allocation
    const currentFTE = currentVendorData[orgSize]?.fteAllocation || {};
    const portnoxFTE = portnoxData[orgSize]?.fteAllocation || {};

    // Create FTE comparison table
    const fteHeaders = ['IT Role', currentResults.vendorName, 'Portnox Cloud', 'FTE Reduction'];

    const fteData = [
      ['Network Administrator',
        (currentFTE.networkAdmin || 0.5).toFixed(2) + ' FTE',
        (portnoxFTE.networkAdmin || 0.2).toFixed(2) + ' FTE',
        ((currentFTE.networkAdmin || 0.5) - (portnoxFTE.networkAdmin || 0.2)).toFixed(2) + ' FTE'
      ],
      ['Security Administrator',
        (currentFTE.securityAdmin || 0.4).toFixed(2) + ' FTE',
        (portnoxFTE.securityAdmin || 0.15).toFixed(2) + ' FTE',
        ((currentFTE.securityAdmin || 0.4) - (portnoxFTE.securityAdmin || 0.15)).toFixed(2) + ' FTE'
      ],
      ['System Administrator',
        (currentFTE.systemAdmin || 0.3).toFixed(2) + ' FTE',
        (portnoxFTE.systemAdmin || 0.05).toFixed(2) + ' FTE',
        ((currentFTE.systemAdmin || 0.3) - (portnoxFTE.systemAdmin || 0.05)).toFixed(2) + ' FTE'
      ],
      ['Help Desk',
        (currentFTE.helpDesk || 0.1).toFixed(2) + ' FTE',
        (portnoxFTE.helpDesk || 0.05).toFixed(2) + ' FTE',
        ((currentFTE.helpDesk || 0.1) - (portnoxFTE.helpDesk || 0.05)).toFixed(2) + ' FTE'
      ],
      ['Total IT Staff',
        ((currentFTE.networkAdmin || 0.5) + (currentFTE.securityAdmin || 0.4) +
         (currentFTE.systemAdmin || 0.3) + (currentFTE.helpDesk || 0.1)).toFixed(2) + ' FTE',
        ((portnoxFTE.networkAdmin || 0.2) + (portnoxFTE.securityAdmin || 0.15) +
         (portnoxFTE.systemAdmin || 0.05) + (portnoxFTE.helpDesk || 0.05)).toFixed(2) + ' FTE',
        (((currentFTE.networkAdmin || 0.5) + (currentFTE.securityAdmin || 0.4) +
          (currentFTE.systemAdmin || 0.3) + (currentFTE.helpDesk || 0.1)) -
         ((portnoxFTE.networkAdmin || 0.2) + (portnoxFTE.securityAdmin || 0.15) +
          (portnoxFTE.systemAdmin || 0.05) + (portnoxFTE.helpDesk || 0.05))).toFixed(2) + ' FTE'
      ]
    ];

    doc.autoTable({
      head: [fteHeaders],
      body: fteData,
      startY: 25,
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5
      },
      didParseCell: function(data) {
        // Highlight total row
        if (data.row.index === fteData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [230, 230, 230];
        }
        
        // Highlight reduction cells
        if (data.column.index === 3) {
          data.cell.styles.textColor = [101, 189, 68]; // Green for reduction
        }
      }
    });

    // Add migration planning section
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(...this.colors.primary);
    doc.text('5. Migration Planning', 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(...this.colors.text);
    doc.text('The migration from your current NAC solution to Portnox Cloud can be implemented using this step-by-step approach:', 20, 35);

    // Define migration phases
    const migrationPhases = [
      {
        phase: 'Assessment & Discovery',
        description: 'Evaluate current environment, identify devices, authentication methods, and network topology.',
        duration: '3-5 days'
      },
      {
        phase: 'Architecture Planning',
        description: 'Design authentication flows and integration points for cloud NAC solution.',
        duration: '3-5 days'
      },
      {
        phase: 'Portnox Cloud Setup',
        description: 'Configure cloud portal, authentication methods, and deploy local connectors.',
        duration: '1-2 days'
      },
      {
        phase: 'Policy Migration',
        description: 'Transfer and adapt existing policies to the cloud platform.',
        duration: '2-4 days'
      },
      {
        phase: 'Pilot Deployment',
        description: 'Test with limited device groups to verify configuration and policy enforcement.',
        duration: '3-5 days'
      },
      {
        phase: 'Full Deployment',
        description: 'Expand to all network segments and user groups, phase out legacy solution.',
        duration: '5-10 days'
      }
    ];

    // Create migration plan table
    const migrationHeaders = ['Phase', 'Description', 'Estimated Duration'];
    const migrationData = migrationPhases.map(phase => [
      phase.phase,
      phase.description,
      phase.duration
    ]);

    doc.autoTable({
      head: [migrationHeaders],
      body: migrationData,
      startY: 45,
      theme: 'grid',
      headStyles: {
        fillColor: this.colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 100 },
        2: { cellWidth: 40 }
      },
      styles: {
        cellPadding: 5
      }
    });

    // Add migration success factors
    doc.setFontSize(12);
    doc.setTextColor(...this.colors.primary);
    doc.text('Migration Success Factors', 20, doc.autoTable.previous.finalY + 20);

    const successFactors = [
      'Phased Approach - Implement in stages, starting with non-critical segments',
      'Clear Success Criteria - Define measurable objectives for each phase',
      'Stakeholder Engagement - Involve all key stakeholders early in the process',
      'Training - Provide comprehensive training before and during migration',
      'Testing - Thoroughly test each phase before moving to production',
      'Rollback Plan - Maintain the ability to revert changes if issues arise',
      'Communication Plan - Keep all affected users informed throughout the process'
    ];

    let yPos = doc.autoTable.previous.finalY + 30;
    successFactors.forEach(factor => {
      doc.setFontSize(10);
      doc.setTextColor(...this.colors.text);
      doc.circle(25, yPos - 2, 1.5, 'F');
      doc.text(factor, 30, yPos);
      yPos += 10;
    });

    // Add recommendations and conclusion
    doc.addPage();

    doc.setFontSize(16);
    doc.setTextColor(...this.colors.primary);
    doc.text('6. Recommendations & Conclusion', 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(...this.colors.text);

    doc.text(`Based on the comprehensive analysis of Network Access Control solutions for an organization`, 20, 35);
    doc.text(`with ${results.deviceCount} devices over a ${yearsToProject}-year period, migrating from ${currentResults.vendorName} to`, 20, 42);
    doc.text(`Portnox Cloud is strongly recommended for the following key reasons:`, 20, 49);

    const keyRecommendations = [
      `Cost Savings: ${savingsPercentage.toFixed(1)}% reduction in TCO resulting in ${window.formatCurrency(savingsAmount)} savings.`,
      'Reduced Implementation Time: Up to 75% faster deployment compared to traditional NAC solutions.',
      'Lower IT Resource Requirements: Decrease NAC administration overhead by up to 80%.',
      'Simplified Architecture: Cloud-based solution eliminates hardware costs and complex deployments.',
      'Improved Scalability: Elastic scaling without hardware sizing constraints.',
      'Reduced Downtime: Automated updates and built-in redundancy minimize business disruption.',
      'Enhanced Multi-Site Support: Single cloud instance manages all locations without local hardware.'
    ];

    yPos = 60;

    keyRecommendations.forEach(recommendation => {
      doc.circle(25, yPos - 2, 1.5, 'F');
      doc.text(recommendation, 30, yPos, { maxWidth: 160 });
      
      // Calculate height of wrapped text and adjust yPos accordingly
      const textLines = doc.splitTextToSize(recommendation, 160);
      yPos += textLines.length * 7;
    });

    doc.setFontSize(12);
    doc.setTextColor(...this.colors.primary);
    doc.text('Conclusion', 20, yPos + 10);

    doc.setFontSize(10);
    doc.setTextColor(...this.colors.text);

    const conclusion = [
      `The transition to Portnox Cloud presents a compelling business case with significant financial and operational benefits. The cloud-based NAC solution aligns with modern network security best practices while reducing complexity and cost.`,
      `Implementing this solution will position the organization for greater security, scalability, and cost efficiency while freeing up IT resources to focus on strategic initiatives.`
    ];

    yPos += 20;
    conclusion.forEach(paragraph => {
      doc.text(paragraph, 20, yPos, { maxWidth: 170 });
      
      // Calculate height of wrapped text and adjust yPos accordingly
      const textLines = doc.splitTextToSize(paragraph, 170);
      yPos += textLines.length * 7;
    });

    // Add footer with page numbers
    this.addFooter(doc, 'Complete TCO Analysis');
  }
  
  /**
   * Create a cover page for the report
   */
  createCoverPage(doc, reportType, results, currentVendor, customerInfo) {
    const currentResults = results[currentVendor];
    
    // Add background rectangle
    doc.setFillColor(...this.colors.primary);
    doc.rect(0, 0, 210, 60, 'F');
    
    // Add accent rectangle
    doc.setFillColor(...this.colors.accent);
    doc.rect(0, 60, 210, 5, 'F');
    
    // Add title
    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.text('NAC Solution', 105, 30, { align: 'center' });
    doc.text(`${reportType}`, 105, 45, { align: 'center' });
    
    // Add subtitle
    doc.setFontSize(16);
    doc.setTextColor(...this.colors.text);
    doc.text(`Comparing ${results[currentVendor].vendorName} vs. Portnox Cloud`, 105, 80, { align: 'center' });
    
    // Add customer logo if available
    if (customerInfo && customerInfo.logo && this.customerLogo) {
      try {
        doc.addImage(this.customerLogo, 'PNG', 20, 100, 50, 25);
      } catch (error) {
        console.warn('Error adding customer logo:', error);
      }
    }
    
    // Add Portnox logo
    // In a real implementation, add your logo here
    
    // Add organization info if available
    if (customerInfo) {
      doc.setFontSize(12);
      doc.setTextColor(...this.colors.text);
      
      let yPos = 140;
      
      if (customerInfo.name) {
        doc.text(`Organization: ${customerInfo.name}`, 20, yPos);
        yPos += 10;
      }
      
      if (customerInfo.contact) {
        doc.text(`Contact: ${customerInfo.contact}`, 20, yPos);
        yPos += 10;
      }
      
      if (customerInfo.email) {
        doc.text(`Email: ${customerInfo.email}`, 20, yPos);
        yPos += 10;
      }
    }
    
    // Add report details
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 190);
    doc.text(`Device Count: ${results.deviceCount}`, 20, 200);
    doc.text(`Projection Period: ${results.yearsToProject} years`, 20, 210);
    
    // Add key metrics
    doc.setFillColor(...this.colors.background);
    doc.roundedRect(105, 180, 85, 40, 3, 3, 'F');
    
    const savingsAmount = currentResults.totalCosts - results['portnox'].totalCosts;
    const savingsPercentage = (savingsAmount / currentResults.totalCosts) * 100;
    
    doc.setFontSize(12);
    doc.setTextColor(...this.colors.primary);
    doc.text('Key Findings:', 110, 190);
    
    doc.setFontSize(14);
    doc.setTextColor(...this.colors.accent);
    doc.text(`${savingsPercentage.toFixed(1)}% Cost Reduction`, 110, 200);
    doc.text(`${window.formatCurrency(savingsAmount)} Savings`, 110, 210);
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(...this.colors.textLight);
    doc.text('Confidential - For Internal Use Only', 105, 277, { align: 'center' });
  }
  
  /**
   * Create a table of contents
   */
  createTableOfContents(doc) {
    doc.setFontSize(20);
    doc.setTextColor(...this.colors.primary);
    doc.text('Table of Contents', 105, 40, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(...this.colors.text);
    
    const tocItems = [
      { title: '1. Executive Summary', page: 3 },
      { title: '2. Organization Profile', page: 3 },
      { title: '3. Financial Analysis', page: 4 },
      { title: '   3.1. TCO Comparison', page: 4 },
      { title: '   3.2. Annual Operating Costs', page: 4 },
      { title: '   3.3. Return on Investment', page: 4 },
      { title: '4. Technical Analysis', page: 5 },
      { title: '   4.1. Implementation Comparison', page: 5 },
      { title: '   4.2. Architecture Comparison', page: 5 },
      { title: '   4.3. IT Resource Utilization', page: 6 },
      { title: '5. Migration Planning', page: 7 },
      { title: '6. Recommendations & Conclusion', page: 8 }
    ];
    
    let yPos = 60;
    
    tocItems.forEach(item => {
      doc.setFontSize(12);
      
      // Check if this is a main section or subsection
      if (item.title.includes('.')) {
        const parts = item.title.split('.');
        if (parts.length > 2) {
          // This is a subsection
          doc.setFont(undefined, 'normal');
        } else {
          // This is a main section
          doc.setFont(undefined, 'bold');
        }
      }
      
      doc.text(item.title, 40, yPos);
      
      // Add dots between title and page number
      const titleWidth = doc.getTextDimensions(item.title).w;
      const pageWidth = doc.getTextDimensions(item.page.toString()).w;
      const maxWidth = 150;
      const dotsWidth = maxWidth - titleWidth - pageWidth - 40;
      
      let dots = '';
      const dotWidth = doc.getTextDimensions('.').w;
      const numberOfDots = Math.floor(dotsWidth / dotWidth);
      
      for (let i = 0; i < numberOfDots; i++) {
        dots += '.';
      }
      
      doc.text(dots, 40 + titleWidth, yPos);
      doc.text(item.page.toString(), 180, yPos);
      
      yPos += 12;
    });
  }
  
  /**
   * Add footer with page numbers to each page
   */
  addFooter(doc, reportType) {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(...this.colors.textLight);
      doc.text('Portnox Cloud NAC Solution - ' + reportType, 20, 285);
      doc.text(`Page ${i} of ${pageCount}`, 180, 285);
    }
  }
}

// Export the enhanced PDF generator class
window.EnhancedPDFReportGenerator = EnhancedPDFReportGenerator;
EOF

# Create integration with main.js to setup the new components
echo "Creating integration with main.js..."
cat > js/reports/report-integration.js << 'EOF'
/**
 * Report generation integration
 * Integrates enhanced report generator with the UI
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize enhanced PDF generator if jsPDF is available
  if (typeof jsPDF !== 'undefined') {
    window.enhancedPDFGenerator = new EnhancedPDFReportGenerator();
    console.log('Enhanced PDF Generator initialized');
    
    // Replace export to PDF function in UI controller
    if (window.uiController) {
      // Store original function as fallback
      window.uiController._originalExportToPDF = window.uiController.exportToPDF;
      
      // Replace with enhanced version
      window.uiController.exportToPDF = function() {
        try {
          if (!window.calculator || !window.calculator.results) {
            throw new Error('No calculation results available');
          }
          
          const results = window.calculator.results;
          const currentVendor = this.activeVendor || 'cisco';
          const reportType = document.getElementById('report-type')?.value || 'complete';
          
          // Get customer info if available
          const customerInfo = this.getCustomerInfo();
          
          // Check if industry data is available for compliance report
          let industryData = null;
          if (reportType === 'compliance' && window.industryTemplates) {
            const industry = document.getElementById('industry-selector')?.value;
            if (industry && industry !== 'none' && window.industryTemplates[industry]) {
              industryData = window.industryTemplates[industry];
            }
          }
          
          // Generate report
          const doc = window.enhancedPDFGenerator.generateReport(
            results, 
            currentVendor, 
            reportType, 
            { 
              customerInfo: customerInfo,
              industryData: industryData
            }
          );
          
          // Save PDF
          doc.save(`NAC_TCO_${reportType}_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
          
          // Show success notification
          if (window.notificationManager) {
            window.notificationManager.success(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report exported successfully`);
          } else {
            alert(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report exported successfully`);
          }
        } catch (error) {
          console.error('Error exporting to PDF:', error);
          
          // Fall back to original export function
          if (this._originalExportToPDF) {
            console.log('Falling back to original PDF export function');
            return this._originalExportToPDF.call(this);
          }
          
          // Show error notification
          if (window.notificationManager) {
            window.notificationManager.error('Error exporting to PDF: ' + error.message);
          } else {
            alert('Error exporting to PDF: ' + error.message);
          }
        }
      };
      
      // Add customer info function
      window.uiController.getCustomerInfo = function() {
        // This would normally come from a form or saved settings
        // For now, return empty object or default values
        return {
          name: '',
          contact: '',
          email: ''
        };
      };
      
      // Add function to set customer logo
      window.uiController.setCustomerLogo = function(logoDataUrl) {
        if (window.enhancedPDFGenerator) {
          window.enhancedPDFGenerator.setCustomerLogo(logoDataUrl);
        }
      };
      
      console.log('Enhanced PDF export function integrated');
    }
    
    // Add customer logo uploader
    createCustomerLogoUploader();
  }
  
  // Add report type selector if missing
  const reportTypeSelector = document.getElementById('report-type');
  if (!reportTypeSelector) {
    const exportOptions = document.querySelector('.export-options');
    if (exportOptions) {
      // Create report type selector
      const select = document.createElement('select');
      select.id = 'report-type';
      select.className = 'form-select';
      
      // Add options
      const options = [
        { value: 'complete', label: 'Complete Report' },
        { value: 'executive', label: 'Executive Summary' },
        { value: 'financial', label: 'Financial Analysis' },
        { value: 'technical', label: 'Technical Report' },
        { value: 'compliance', label: 'Compliance Report' }
      ];
      
      options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.label;
        select.appendChild(opt);
      });
      
      // Add to export options
      exportOptions.appendChild(select);
      console.log('Added report type selector');
    }
  }
});

/**
 * Create customer logo uploader
 */
function createCustomerLogoUploader() {
  const exportOptions = document.querySelector('.export-options');
  if (!exportOptions) return;
  
  // Create logo upload button
  const uploadButton = document.createElement('button');
  uploadButton.id = 'upload-logo-btn';
  uploadButton.className = 'btn btn-outline';
  uploadButton.innerHTML = '<i class="fas fa-image"></i> Add Logo to Reports';
  
  // Create hidden file input
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.id = 'logo-file-input';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none';
  
  // Add event listeners
  uploadButton.addEventListener('click', function() {
    fileInput.click();
  });
  
  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.match('image.*')) {
      if (window.notificationManager) {
        window.notificationManager.error('Please select an image file');
      } else {
        alert('Please select an image file');
      }
      return;
    }
    
    // Read file as data URL
    const reader = new FileReader();
    reader.onload = function(e) {
      const logoDataUrl = e.target.result;
      
      // Set logo in PDF generator
      if (window.uiController && typeof window.uiController.setCustomerLogo === 'function') {
        window.uiController.setCustomerLogo(logoDataUrl);
        
        // Show success notification
        if (window.notificationManager) {
          window.notificationManager.success('Logo added to reports');
        } else {
          alert('Logo added to reports');
        }
        
        // Update button to show logo is set
        uploadButton.innerHTML = '<i class="fas fa-check"></i> Logo Added to Reports';
        
        // Reset after 3 seconds
        setTimeout(function() {
          uploadButton.innerHTML = '<i class="fas fa-image"></i> Update Logo';
        }, 3000);
      }
    };
    
    reader.readAsDataURL(file);
  });
  
  // Add to export options
  exportOptions.appendChild(uploadButton);
  exportOptions.appendChild(fileInput);
}
EOF

# Create industry selector integration
echo "Creating industry selector integration..."
cat > js/components/industry-selector.js << 'EOF'
/**
 * Industry Selector Component
 * Handles industry template selection and application
 */
class IndustrySelectorComponent {
  constructor() {
    this.templates = window.industryTemplates || {};
    this.initEventListeners();
    this.populateIndustrySelector();
  }
  
  /**
   * Initialize event listeners
   */
  initEventListeners() {
    const industrySelector = document.getElementById('industry-selector');
    if (industrySelector) {
      industrySelector.addEventListener('change', this.handleIndustryChange.bind(this));
    }
  }
  
  /**
   * Populate industry selector with available templates
   */
  populateIndustrySelector() {
    const selector = document.getElementById('industry-selector');
    if (!selector) return;
    
    // Clear existing options except the default
    while (selector.options.length > 1) {
      selector.remove(1);
    }
    
    // Add industry options
    Object.entries(this.templates).forEach(([id, industry]) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = industry.name;
      selector.appendChild(option);
    });
  }
  
  /**
   * Handle industry change event
   */
  handleIndustryChange(event) {
    const industryId = event.target.value;
    if (industryId === 'none') {
      // Clear industry-specific content
      this.clearIndustryContent();
      return;
    }
    
    const industry = this.templates[industryId];
    if (!industry) return;
    
    // Apply industry defaults to form
    this.applyIndustryDefaults(industry.defaults);
    
    // Display industry-specific compliance information
    this.displayComplianceInfo(industry.complianceInfo);
    
    // Display industry benchmarks
    this.displayIndustryBenchmarks(industry.benchmarks);
    
    // Display challenges mitigated
    this.displayChallengesMitigated(industry.challengesMitigated);
    
    // Show notification if notification manager is available
    if (window.notificationManager) {
      window.notificationManager.success(`Applied ${industry.name} industry template`);
    }
  }
  
  /**
   * Apply industry defaults to form inputs
   */
  applyIndustryDefaults(defaults) {
    if (!defaults) return;
    
    // Helper function to set input value based on type
    const setInputValue = (id, value) => {
      const input = document.getElementById(id);
      if (!input) return;
      
      if (input.type === 'checkbox') {
        input.checked = value;
        
        // Trigger change event to show dependent fields
        const event = new Event('change');
        input.dispatchEvent(event);
      } else {
        input.value = value;
        
        // For range inputs, update the displayed value
        if (input.type === 'range') {
          const valueDisplay = document.getElementById(`${id}-value`);
          if (valueDisplay) {
            valueDisplay.textContent = value + '%';
          }
        }
      }
    };
    
    // Apply each default value
    Object.entries(defaults).forEach(([key, value]) => {
      setInputValue(key, value);
    });
  }
  
  /**
   * Display industry-specific compliance information
   */
  displayComplianceInfo(complianceInfo) {
    const container = document.getElementById('compliance-info-container');
    if (!container || !complianceInfo) {
      if (container) container.classList.add('hidden');
      return;
    }
    
    // Create compliance info card
    let html = `
      <div class="compliance-info-card">
        <h3>${complianceInfo.title}</h3>
        <p>${complianceInfo.details}</p>
        <h4>Key Requirements</h4>
        <ul class="compliance-requirements">
    `;
    
    // Add requirements
    complianceInfo.keyRequirements.forEach(requirement => {
      html += `<li>${requirement}</li>`;
    });
    
    html += `
        </ul>
        <h4>Applicable Regulations</h4>
        <ul class="compliance-requirements">
    `;
    
    // Add regulations
    complianceInfo.regulations.forEach(regulation => {
      html += `<li><strong>${regulation.name}</strong>: ${regulation.description}</li>`;
    });
    
    html += `
        </ul>
      </div>
    `;
    
    // Update container
    container.innerHTML = html;
    container.classList.remove('hidden');
  }
  
  /**
   * Display industry benchmarks
   */
  displayIndustryBenchmarks(benchmarks) {
    const container = document.getElementById('industry-benchmarks-container');
    if (!container || !benchmarks) {
      if (container) container.classList.add('hidden');
      return;
    }
    
    // Create benchmarks card
    let html = `
      <div class="benchmarks-card">
        <h3>Industry Benchmarks</h3>
        <div class="benchmarks-grid">
    `;
    
    // Add benchmark metrics
    if (benchmarks.averageTCO) {
      html += `
        <div class="industry-metric">
          <h4>Average TCO</h4>
          <div class="metric-value">${window.formatCurrency(benchmarks.averageTCO)}</div>
          <div class="metric-description">Industry average for similar-sized deployments</div>
        </div>
      `;
    }
    
    if (benchmarks.implementationTime) {
      html += `
        <div class="industry-metric">
          <h4>Implementation Time</h4>
          <div class="metric-value">${benchmarks.implementationTime} days</div>
          <div class="metric-description">Average deployment timeline</div>
        </div>
      `;
    }
    
    if (benchmarks.fteCost) {
      html += `
        <div class="industry-metric">
          <h4>IT Staff Cost</h4>
          <div class="metric-value">${window.formatCurrency(benchmarks.fteCost)}</div>
          <div class="metric-description">Average annual personnel costs</div>
        </div>
      `;
    }
    
    html += `
        </div>
      </div>
    `;
    
    // Update container
    container.innerHTML = html;
    container.classList.remove('hidden');
  }
  
  /**
   * Display industry-specific challenges mitigated
   */
  displayChallengesMitigated(challenges) {
    const container = document.getElementById('spotlight-insights');
    if (!container || !challenges || challenges.length === 0) return;
    
    // Create challenges content
    let html = `
      <h3>Industry-Specific Challenges Addressed</h3>
      <div class="challenges-grid">
    `;
    
    // Add each challenge
    challenges.forEach(challenge => {
      html += `
        <div class="challenge-item">
          <h4>${challenge.challenge}</h4>
          <p>${challenge.mitigation}</p>
        </div>
      `;
    });
    
    html += `</div>`;
    
    // Update container
    container.innerHTML = html;
  }
  
  /**
   * Clear industry-specific content
   */
  clearIndustryContent() {
    // Clear compliance info
    const complianceContainer = document.getElementById('compliance-info-container');
    if (complianceContainer) {
      complianceContainer.innerHTML = '';
      complianceContainer.classList.add('hidden');
    }
    
    // Clear benchmarks
    const benchmarksContainer = document.getElementById('industry-benchmarks-container');
    if (benchmarksContainer) {
      benchmarksContainer.innerHTML = '';
      benchmarksContainer.classList.add('hidden');
    }
    
    // Clear spotlight insights
    const spotlightContainer = document.getElementById('spotlight-insights');
    if (spotlightContainer) {
      spotlightContainer.innerHTML = '';
    }
  }
}

// Initialize and make globally available
window.industrySelectorComponent = new IndustrySelectorComponent();
EOF

# Update the main.js file to integrate all components
echo "Updating main.js to integrate all enhancements..."
cat >> js/main.js << 'EOF'

// Initialize enhanced components
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing enhanced components...');
  
  // Initialize industry selector component
  if (window.industryTemplates && !window.industrySelectorComponent) {
    window.industrySelectorComponent = new IndustrySelectorComponent();
    console.log('Industry Selector Component initialized');
  }
  
  // Initialize cost configuration manager
  if (!window.costConfigurationManager) {
    window.costConfigurationManager = new CostConfigurationManager();
    console.log('Cost Configuration Manager initialized');
  }
  
  // Initialize migration planner
  if (!window.migrationPlanner) {
    window.migrationPlanner = new MigrationPlanner();
    console.log('Migration Planner initialized');
  }
  
  // Make sure advanced options are expanded for better visibility
  const advancedOptionsToggle = document.querySelector('.advanced-options-toggle button');
  const advancedOptionsPanel = document.getElementById('advanced-options-panel');
  
  if (advancedOptionsToggle && advancedOptionsPanel) {
    if (advancedOptionsPanel.classList.contains('hidden')) {
      advancedOptionsToggle.click();
    }
  }
  
  // Enable all tool tips
  if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
    const tooltips = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltips.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
  
  console.log('All enhanced components initialized');
});

// Add logo fallback for vendor cards
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.vendor-card img').forEach(img => {
    img.onerror = function() {
      this.onerror = null;
      // Create a canvas with the vendor name
      const canvas = document.createElement('canvas');
      canvas.width = 150;
      canvas.height = 50;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, 150, 50);
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.alt.replace(' Logo', ''), 75, 25);
      this.src = canvas.toDataURL();
    };
  });
});
EOF

# Add links to the new JS files in index.html
echo "Adding new JS files to index.html..."
sed -i '' -e '/<script src="js\/main.js"><\/script>/i\
  <script src="js\/components\/cost-configuration.js"><\/script>\
  <script src="js\/components\/industry-selector.js"><\/script>\
  <script src="js\/components\/migration-planner.js"><\/script>\
  <script src="js\/reports\/enhanced-pdf-generator.js"><\/script>\
  <script src="js\/reports\/report-integration.js"><\/script>' index.html

# Create a risk management section in migration-tab
echo "Adding risk management section to migration tab..."
mkdir -p js/fixes

cat > js/fixes/migration-tab-fix.js << 'EOF'
/**
 * Migration tab enhancement fix
 * Adds risk management section to migration tab
 */
document.addEventListener('DOMContentLoaded', function() {
  const migrationTab = document.getElementById('migration-tab');
  if (!migrationTab) return;
  
  // Add risk factors container if not already present
  if (!document.getElementById('risk-factors-container')) {
    const riskContainer = document.createElement('div');
    riskContainer.id = 'risk-factors-container';
    riskContainer.className = 'hidden';
    migrationTab.appendChild(riskContainer);
  }
});
EOF

# Fix for feature comparison chart
cat > js/fixes/feature-chart-fix.js << 'EOF'
/**
 * Feature comparison chart fix
 * Ensures proper feature comparison between vendors
 */
document.addEventListener('DOMContentLoaded', function() {
  // Check if the chart builder is available
  if (!window.chartBuilder) return;
  
  // Store original method for reference
  const originalUpdateFeatureComparisonChart = window.chartBuilder.updateFeatureComparisonChart;
  
  // Replace with enhanced version
  window.chartBuilder.updateFeatureComparisonChart = function(vendorId) {
    try {
      if (!vendorId) return;
      
      const featureChart = this.charts.featureComparison;
      if (!featureChart) return;
      
      // Define enhanced feature set with more detailed metrics
      const featureSet = [
        { name: 'Deployment Simplicity', portnox: 9.5, cisco: 5, aruba: 5.5, forescout: 6, nps: 7, fortinac: 6, securew2: 7.5 },
        { name: 'Hardware Footprint', portnox: 10, cisco: 3, aruba: 4, forescout: 4.5, nps: 6, fortinac: 4.5, securew2: 7 },
        { name: 'Multi-Site Support', portnox: 9.5, cisco: 5.5, aruba: 6, forescout: 6, nps: 5, fortinac: 5.5, securew2: 7 },
        { name: 'Authentication Options', portnox: 9, cisco: 7.5, aruba: 8, forescout: 7, nps: 6, fortinac: 7, securew2: 8 },
        { name: 'Cloud Integration', portnox: 10, cisco: 5, aruba: 6, forescout: 6.5, nps: 5.5, fortinac: 6, securew2: 8 },
        { name: 'Legacy Device Support', portnox: 8.5, cisco: 7, aruba: 7, forescout: 8, nps: 6, fortinac: 7, securew2: 7 },
        { name: 'Automatic Updates', portnox: 10, cisco: 3, aruba: 3.5, forescout: 4, nps: 3, fortinac: 4, securew2: 7 },
        { name: 'Reporting & Analytics', portnox: 9, cisco: 7, aruba: 7.5, forescout: 8, nps: 5, fortinac: 6.5, securew2: 7 },
        { name: 'Scalability', portnox: 9.5, cisco: 6, aruba: 6.5, forescout: 7, nps: 5, fortinac: 6, securew2: 7.5 },
        { name: 'Operational Simplicity', portnox: 9, cisco: 4.5, aruba: 5, forescout: 5.5, nps: 6, fortinac: 5.5, securew2: 7 }
      ];
      
      // Extract data for the selected vendor and Portnox
      const labels = featureSet.map(feature => feature.name);
      const vendorData = featureSet.map(feature => feature[vendorId] || 0);
      const portnoxData = featureSet.map(feature => feature.portnox || 0);
      
      // Update chart
      featureChart.data.labels = labels;
      featureChart.data.datasets[0].data = portnoxData;
      featureChart.data.datasets[1].data = vendorData;
      featureChart.data.datasets[0].label = 'Portnox Cloud';
      featureChart.data.datasets[1].label = window.vendorData[vendorId]?.name || vendorId;
      
      featureChart.update();
    } catch (error) {
      console.error('Error updating feature comparison chart:', error);
      
      // Fall back to original method
      if (typeof originalUpdateFeatureComparisonChart === 'function') {
        originalUpdateFeatureComparisonChart.call(this, vendorId);
      }
    }
  };
  
  console.log('Enhanced feature comparison chart functionality');
});
EOF

# Add the fixes to index.html
sed -i '' -e '/<script src="js\/main.js"><\/script>/i\
  <script src="js\/fixes\/migration-tab-fix.js"><\/script>\
  <script src="js\/fixes\/feature-chart-fix.js"><\/script>' index.html

# Final success message
echo "Portnox Total Cost Analysis Tool enhancement update completed successfully!"
echo "The following improvements have been made:"
echo "1. Enhanced logo handling with fallback mechanisms"
echo "2. Expanded advanced settings for better configuration"
echo "3. Improved chart visuals and data accuracy"
echo "4. Added comprehensive PDF report generation with multiple report types"
echo "5. Enhanced industry-specific templates and compliance information"
echo "6. Added detailed migration planning with risk management"
echo "7. Enhanced sensitivity analysis capabilities"
echo "8. Improved vendor comparisons with more detailed metrics"
echo "9. Added ability to include customer logos in reports"
echo "10. Overall visual and functional enhancements"
echo ""
echo "Please refresh your browser to see the changes."