#!/bin/bash

# Premium Executive Layout Restoration Script
# Restores original layout with enhanced visibility

echo "🚀 RESTORING PREMIUM EXECUTIVE LAYOUT"
echo "===================================="

# Set your project directory
PROJECT_DIR="/path/to/your/project"
cd "$PROJECT_DIR"

# Create the restored CSS with original premium layout
cat > css/premium-executive-platform.css << 'EOCSS'
/* Premium Executive Platform - Original Layout Restored */

:root {
    /* Premium Color System */
    --primary: #00D4AA;
    --primary-dark: #00A085;
    --primary-light: #33DDBB;
    --secondary: #1B2951;
    --accent: #FF6B35;
    --success: #10B981;
    --warning: #F59E0B;
    --danger: #EF4444;
    --info: #3B82F6;
    
    /* Neutral Palette - Enhanced for visibility */
    --gray-50: #FAFAFA;
    --gray-100: #F4F4F5;
    --gray-200: #E4E4E7;
    --gray-300: #D4D4D8;
    --gray-400: #A1A1AA;
    --gray-500: #71717A;
    --gray-600: #52525B;
    --gray-700: #3F3F46;
    --gray-800: #27272A;
    --gray-900: #18181B;
    
    /* Background Colors for Dark Theme */
    --bg-primary: #0F172A;
    --bg-secondary: #1E293B;
    --bg-card: #334155;
    --bg-hover: #475569;
    
    /* Text Colors for Dark Theme */
    --text-primary: #F8FAFC;
    --text-secondary: #CBD5E1;
    --text-muted: #94A3B8;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    
    /* Gradients */
    --gradient-primary: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    --gradient-dark: linear-gradient(135deg, var(--secondary) 0%, #0F172A 100%);
    --gradient-light: linear-gradient(135deg, #FFFFFF 0%, var(--gray-50) 100%);
}

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.premium-platform {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Premium Header - Original Layout */
.premium-header {
    background: var(--gradient-dark);
    color: white;
    padding: 1.5rem 0;
    box-shadow: var(--shadow-lg);
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
}

.brand-identity {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.portnox-logo {
    height: 42px;
    width: auto;
}

.platform-title h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.025em;
    color: white;
}

.platform-title p {
    margin: 0.25rem 0 0 0;
    font-size: 0.875rem;
    opacity: 0.8;
    color: rgba(255, 255, 255, 0.9);
}

.header-controls {
    display: flex;
    gap: 0.75rem;
}

.control-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    border: none;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
}

.control-btn.settings {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.control-btn.settings:hover {
    background: rgba(255, 255, 255, 0.2);
}

.control-btn.calculate {
    background: var(--primary);
    color: var(--secondary);
    font-weight: 600;
}

.control-btn.calculate:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.control-btn.export {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.control-btn.demo {
    background: var(--accent);
    color: white;
}

/* Vendor Selection Bar - Original Layout */
.vendor-selection-bar {
    background: white;
    border-bottom: 1px solid var(--gray-200);
    padding: 1.5rem 0;
}

.selection-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
}

.selection-info h3 {
    margin: 0;
    font-size: 1.125rem;
    color: var(--gray-800);
}

.selection-info p {
    margin: 0.25rem 0 0 0;
    font-size: 0.875rem;
    color: var(--gray-600);
}

.selected-vendors {
    display: flex;
    gap: 0.75rem;
    flex: 1;
}

.selected-vendor-chip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--gray-100);
    border: 1px solid var(--gray-300);
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--gray-800);
}

.selected-vendor-chip.portnox-chip {
    background: var(--primary);
    color: white;
    border-color: var(--primary-dark);
}

.selected-vendor-chip img {
    height: 20px;
    width: auto;
}

.remove-vendor {
    margin-left: 0.5rem;
    padding: 0.25rem;
    background: none;
    border: none;
    color: var(--gray-500);
    cursor: pointer;
    transition: color 0.2s;
}

.remove-vendor:hover {
    color: var(--danger);
}

.add-vendor-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    background: var(--gray-100);
    border: 2px dashed var(--gray-300);
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--gray-700);
}

.add-vendor-btn:hover {
    background: var(--gray-200);
    border-color: var(--gray-400);
}

.add-vendor-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Analysis Container */
.analysis-container {
    flex: 1;
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
    padding: 2rem;
    background: var(--bg-primary);
}

/* Premium Navigation Tabs - Original Style */
.premium-nav {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    background: var(--bg-card);
    padding: 0.5rem;
    border-radius: 12px;
    box-shadow: var(--shadow);
    overflow-x: auto;
}

.nav-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 1.5rem;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 140px;
    color: var(--text-secondary);
}

.nav-tab:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
}

.nav-tab.active {
    background: var(--gradient-primary);
    color: white;
}

.nav-tab i {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
}

.nav-tab span {
    font-size: 0.875rem;
    font-weight: 600;
}

.nav-tab .tab-subtitle {
    font-size: 0.75rem;
    font-weight: 400;
    opacity: 0.8;
}

/* Analysis Content */
.analysis-content {
    background: var(--bg-card);
    border-radius: 12px;
    box-shadow: var(--shadow);
    padding: 2rem;
    min-height: 600px;
}

/* Modals */
.settings-modal,
.vendor-selector-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
}

.modal-content {
    background: var(--bg-card);
    border-radius: 16px;
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-2xl);
}

.modal-header {
    padding: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg-secondary);
}

.modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-primary);
}

.close-modal {
    padding: 0.5rem;
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 1.25rem;
    transition: color 0.2s;
}

.close-modal:hover {
    color: var(--text-primary);
}

.modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
    background: var(--bg-card);
}

.modal-footer {
    padding: 1.5rem 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    background: var(--bg-secondary);
}

/* Settings Grid */
.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
}

.settings-section {
    background: var(--bg-secondary);
    padding: 1.5rem;
    border-radius: 12px;
}

.settings-section h3 {
    margin: 0 0 1.5rem 0;
    font-size: 1.125rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.settings-section h3 i {
    color: var(--primary);
}

.setting-group {
    margin-bottom: 1.5rem;
}

.setting-group:last-child {
    margin-bottom: 0;
}

.setting-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
    font-size: 0.875rem;
    margin-bottom: 0.75rem;
}

.info-tip {
    color: var(--text-muted);
    cursor: help;
    font-size: 0.875rem;
}

.info-tip:hover {
    color: var(--primary);
}

.setting-group input[type="range"] {
    width: 100%;
    height: 6px;
    background: var(--bg-hover);
    border-radius: 3px;
    outline: none;
    -webkit-appearance: none;
}

.setting-group input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    background: var(--primary);
    border-radius: 50%;
    cursor: pointer;
}

.setting-group input[type="number"],
.setting-group select {
    width: 100%;
    padding: 0.625rem 0.875rem;
    background: var(--bg-primary);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    font-size: 0.875rem;
    color: var(--text-primary);
    transition: all 0.2s;
}

.setting-group input[type="number"]:focus,
.setting-group select:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.1);
}

.currency-input {
    position: relative;
    display: flex;
    align-items: center;
}

.currency-input span {
    position: absolute;
    left: 0.875rem;
    color: var(--text-muted);
    font-weight: 500;
}

.currency-input input {
    padding-left: 2rem !important;
}

.value-display {
    font-weight: 600;
    color: var(--primary);
    margin-left: 1rem;
}

.checkbox-group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
}

.checkbox-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 400;
    cursor: pointer;
    color: var(--text-secondary);
}

.checkbox-group input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
}

/* Buttons */
.btn-primary,
.btn-secondary {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-primary {
    background: var(--primary);
    color: white;
}

.btn-primary:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.btn-secondary {
    background: var(--bg-hover);
    color: var(--text-primary);
}

.btn-secondary:hover {
    background: var(--bg-secondary);
}

/* Vendor Selector Grid */
.vendor-selector-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
}

.vendor-option {
    padding: 1.5rem;
    background: var(--bg-secondary);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
}

.vendor-option:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.vendor-option.selected {
    border-color: var(--primary);
    background: rgba(0, 212, 170, 0.1);
}

.vendor-option-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.vendor-option-header h4 {
    margin: 0;
    font-size: 1rem;
    color: var(--text-primary);
}

.vendor-type {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    background: var(--bg-hover);
    color: var(--text-secondary);
    border-radius: 999px;
}

.vendor-option-metrics {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.vendor-option-metrics .metric {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.vendor-option-metrics i {
    color: var(--primary);
}

.selection-indicator {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: var(--primary);
    font-size: 1.5rem;
    opacity: 0;
    transform: scale(0);
    transition: all 0.2s;
}

.vendor-option.selected .selection-indicator {
    opacity: 1;
    transform: scale(1);
}

/* Portnox Pricing Bar */
.portnox-pricing-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--bg-secondary);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1rem 0;
    box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1);
    z-index: 50;
}

.pricing-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
}

.pricing-label {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 600;
    color: var(--text-primary);
}

.inline-logo {
    height: 24px;
    width: auto;
}

.pricing-control {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex: 1;
    max-width: 600px;
}

.price-label {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--primary);
}

#portnox-pricing-slider {
    flex: 1;
    height: 8px;
    background: var(--bg-hover);
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
}

#portnox-pricing-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    background: var(--primary);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: var(--shadow);
}

.price-range {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--text-muted);
    min-width: 100px;
}

/* Financial Overview Styles */
.financial-overview {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.executive-summary-card {
    background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.executive-summary-card h2 {
    margin: 0 0 1.5rem 0;
    color: var(--text-primary);
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.summary-item {
    text-align: center;
    padding: 1.5rem;
    background: var(--bg-primary);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.summary-item.highlight {
    background: var(--gradient-primary);
    color: white;
    border: none;
}

.summary-item h3 {
    margin: 0 0 0.5rem 0;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.8;
}

.summary-item .value {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0.5rem 0;
}

.summary-item p {
    margin: 0;
    font-size: 0.875rem;
    opacity: 0.8;
}

.chart-section {
    background: var(--bg-secondary);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.chart-section h3 {
    margin: 0 0 1.5rem 0;
    color: var(--text-primary);
}

.chart-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2rem;
}

.chart-container {
    background: var(--bg-card);
    padding: 1.5rem;
    border-radius: 8px;
}

.chart-container h4 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    color: var(--text-primary);
}

.cost-breakdown-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
}

.cost-breakdown-card {
    background: var(--bg-secondary);
    padding: 1.5rem;
    border-radius: 12px;
    border: 2px solid rgba(255, 255, 255, 0.1);
}

.cost-breakdown-card.portnox-highlight {
    border-color: var(--primary);
    background: rgba(0, 212, 170, 0.05);
}

.cost-breakdown-card h4 {
    margin: 0 0 1rem 0;
    color: var(--text-primary);
}

.cost-categories {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.cost-category {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.cost-category .label {
    font-size: 0.75rem;
    color: var(--text-muted);
}

.cost-category .value {
    font-weight: 600;
    color: var(--text-primary);
}

.cost-category .bar {
    height: 6px;
    background: var(--bg-hover);
    border-radius: 3px;
    overflow: hidden;
}

.cost-category .fill {
    height: 100%;
    background: var(--primary);
    transition: width 0.5s ease-out;
}

.total-cost {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
}

.total-cost strong {
    font-size: 1.25rem;
    color: var(--primary);
}

.roi-insights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.roi-insights .insight {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    background: var(--bg-secondary);
    border-radius: 8px;
}

.roi-insights .insight i {
    font-size: 2rem;
    color: var(--primary);
}

.roi-insights .insight h4 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
}

.roi-insights .insight p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.recommendations-section {
    background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%);
    padding: 2rem;
    border-radius: 12px;
}

.recommendations-section h3 {
    margin: 0 0 1.5rem 0;
    color: var(--text-primary);
}

.recommendation-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

.recommendation-card {
    background: var(--bg-primary);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
}

.recommendation-card i {
    font-size: 2rem;
    color: var(--primary);
    margin-bottom: 1rem;
}

.recommendation-card h4 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
}

.recommendation-card p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

/* No Data State */
.no-data {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--text-muted);
    font-size: 1.125rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .header-container,
    .selection-container {
        flex-direction: column;
        align-items: stretch;
    }
    
    .header-controls {
        justify-content: center;
    }
    
    .selected-vendors {
        flex-wrap: wrap;
    }
    
    .pricing-container {
        flex-direction: column;
        align-items: stretch;
    }
    
    .pricing-control {
        max-width: 100%;
    }
    
    .chart-grid {
        grid-template-columns: 1fr;
    }
    
    .settings-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .platform-title h1 {
        font-size: 1.25rem;
    }
    
    .premium-nav {
        flex-wrap: wrap;
    }
    
    .nav-tab {
        min-width: 120px;
        padding: 0.75rem 1rem;
    }
    
    .summary-grid {
        grid-template-columns: 1fr;
    }
    
    .cost-breakdown-grid {
        grid-template-columns: 1fr;
    }
}

/* Print Styles */
@media print {
    .premium-header,
    .vendor-selection-bar,
    .premium-nav,
    .portnox-pricing-bar,
    .control-btn {
        display: none;
    }
    
    .analysis-content {
        box-shadow: none;
    }
}

/* Highcharts Dark Theme Override */
.highcharts-background {
    fill: var(--bg-card);
}

.highcharts-title {
    fill: var(--text-primary) !important;
}

.highcharts-axis-title {
    fill: var(--text-secondary) !important;
}

.highcharts-axis-labels text {
    fill: var(--text-secondary) !important;
}

.highcharts-legend-item text {
    fill: var(--text-secondary) !important;
}

.highcharts-grid-line {
    stroke: rgba(255, 255, 255, 0.1);
}

.highcharts-tooltip {
    filter: none !important;
}

.highcharts-tooltip-box {
    fill: var(--bg-card);
    stroke: rgba(255, 255, 255, 0.1);
}

.highcharts-tooltip text {
    fill: var(--text-primary) !important;
}

.highcharts-data-label text {
    fill: var(--text-primary) !important;
}
EOCSS

# Update JavaScript to fix tab functionality and vendor selection
cat > js/views/premium-executive-platform-fix.js << 'EOJS'
// Fix for Premium Executive Platform functionality

// Ensure proper initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Applying Premium Executive Platform fixes...');
    
    // Set Highcharts dark theme
    if (typeof Highcharts !== 'undefined') {
        Highcharts.setOptions({
            accessibility: { enabled: false },
            chart: {
                backgroundColor: '#334155',
                style: {
                    fontFamily: 'Inter, sans-serif'
                }
            },
            title: {
                style: {
                    color: '#F8FAFC',
                    fontSize: '16px'
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#CBD5E1'
                    }
                },
                gridLineColor: 'rgba(255, 255, 255, 0.1)'
            },
            yAxis: {
                labels: {
                    style: {
                        color: '#CBD5E1'
                    }
                },
                gridLineColor: 'rgba(255, 255, 255, 0.1)'
            },
            tooltip: {
                backgroundColor: '#1E293B',
                borderColor: '#00D4AA',
                style: {
                    color: '#F8FAFC'
                }
            },
            legend: {
                itemStyle: {
                    color: '#CBD5E1'
                },
                itemHoverStyle: {
                    color: '#F8FAFC'
                }
            }
        });
    }
    
    // Fix tab click handling
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            if (window.platform && tabName) {
                window.platform.switchTab(tabName);
            }
        });
    });
    
    // Ensure vendor selection works
    if (!window.platform && window.PremiumExecutivePlatform) {
        window.platform = new PremiumExecutivePlatform();
    }
    
    // Add sample vendors if none selected
    setTimeout(() => {
        if (window.platform && window.platform.selectedVendors.length === 1) {
            console.log('📊 Adding sample competitors for demonstration...');
            // Add a few competitors for demo
            ['cisco', 'aruba', 'forescout'].forEach((vendor, index) => {
                setTimeout(() => {
                    if (window.platform.selectedVendors.length < 4) {
                        window.platform.selectedVendors.push(vendor);
                        window.platform.updateVendorSelection();
                    }
                }, index * 500);
            });
            
            // Recalculate after adding vendors
            setTimeout(() => {
                window.platform.calculate();
            }, 2000);
        }
    }, 1000);
});

// Override the switchTab method for better visibility
if (window.PremiumExecutivePlatform) {
    const originalSwitchTab = PremiumExecutivePlatform.prototype.switchTab;
    PremiumExecutivePlatform.prototype.switchTab = function(tabName) {
        console.log('🔄 Switching to tab:', tabName);
        
        // Update tab UI immediately
        document.querySelectorAll('.nav-tab').forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Call original method
        originalSwitchTab.call(this, tabName);
    };
}

// Add vendor hover effects
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.selected-vendor-chip')) {
        e.target.closest('.selected-vendor-chip').style.transform = 'translateY(-2px)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.selected-vendor-chip')) {
        e.target.closest('.selected-vendor-chip').style.transform = 'translateY(0)';
    }
});

console.log('✅ Premium Executive Platform fixes applied');
EOJS

# Update HTML to ensure proper loading order
cat > index.html << 'EOHTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Executive Decision Platform | Portnox Zero Trust NAC</title>
    <meta name="description" content="Premium Executive Platform for Zero Trust NAC Investment Analysis">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="./img/vendors/portnox-icon.png">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Chart Libraries -->
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/heatmap.js"></script>
    <script src="https://code.highcharts.com/modules/sankey.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    
    <!-- Styles -->
    <link rel="stylesheet" href="./css/premium-executive-platform.css">
</head>
<body>
    <div id="app-container">
        <!-- Premium Platform will be rendered here -->
    </div>
    
    <!-- Scripts -->
    <script src="./js/data/comprehensive-vendor-database.js"></script>
    <script src="./js/views/premium-executive-platform.js"></script>
    <script src="./js/views/premium-executive-platform-fix.js"></script>
</body>
</html>
EOHTML

# Create demo images placeholder script
cat > create-demo-images.sh << 'EOSH'
#!/bin/bash
# Create placeholder vendor logos
mkdir -p img/vendors
for vendor in portnox cisco aruba forescout arista clearpass fortinet; do
    echo "Creating placeholder for $vendor"
    # Create a simple SVG placeholder
    cat > img/vendors/${vendor}-logo.png << EOF
<svg width="100" height="40" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="40" fill="#334155" rx="4"/>
  <text x="50" y="25" text-anchor="middle" fill="#CBD5E1" font-family="Inter" font-size="14">${vendor}</text>
</svg>
EOF
done
EOSH

chmod +x create-demo-images.sh

# Commit all changes
git add -A
git commit -m "Restore Premium Executive Layout with Enhanced Visibility

- Restored original premium header layout
- Fixed vendor selection bar with proper styling
- Enhanced navigation tabs with original design
- Improved dark theme with better text visibility
- Added proper vendor chip styling
- Fixed modal designs
- Enhanced chart visibility for dark theme
- Added auto-vendor selection for demo
- Fixed all tab functionality
- Restored pricing slider styling
- Improved responsive design
- Added hover effects and transitions"

echo "✅ PREMIUM EXECUTIVE LAYOUT RESTORED!"
echo ""
echo "🎨 Layout Restored With:"
echo "- Original header design with gradient background"
echo "- Vendor selection bar with white background"
echo "- Premium navigation tabs with proper styling"
echo "- Dark theme for content areas with good visibility"
echo "- All original spacing and organization"
echo ""
echo "🔧 Functionality Fixed:"
echo "- All tabs working properly"
echo "- Vendor selection and removal"
echo "- Settings and modals"
echo "- Charts with dark theme"
echo "- Pricing slider"
echo ""
echo "📋 Next Steps:"
echo "1. Update PROJECT_DIR in the script"
echo "2. Run: chmod +x restore-premium-layout.sh"
echo "3. Run: ./restore-premium-layout.sh"
echo "4. Run: ./create-demo-images.sh (for vendor logos)"
echo "5. Clear browser cache and refresh"
echo ""
echo "💡 The platform will auto-add sample vendors for demonstration"
echo "   and properly display all content with the original premium design!"
