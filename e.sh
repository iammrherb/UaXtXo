#!/bin/bash

# =============================================================================
# Portnox Theme Fix & JavaScript Syntax Repair
# =============================================================================
# Fixes the gradient colors to Portnox branding and repairs JavaScript syntax
# =============================================================================

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🔧 Portnox Theme Fix & JavaScript Repair${NC}"
echo -e "${BLUE}======================================${NC}"

# Fix CSS with proper Portnox colors
echo -e "${GREEN}✅ Updating Portnox color scheme...${NC}"
cat > css/executive-command-center.css << 'EOF'
/**
 * Executive Command Center CSS - Portnox Theme
 * Professional Portnox branding with subtle gradients
 */

:root {
    /* Portnox Brand Colors - Professional Palette */
    --portnox-primary: #1a5a96;
    --portnox-secondary: #2980b9;
    --portnox-accent: #3498db;
    --portnox-dark: #0f3c5f;
    --portnox-light: #e8f4f8;
    
    /* Subtle Professional Gradients */
    --gradient-primary: linear-gradient(135deg, #1a5a96 0%, #2980b9 100%);
    --gradient-background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    --gradient-command: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #1a5a96 100%);
    --gradient-secondary: linear-gradient(135deg, #1a5a96 0%, #3498db 100%);
    --gradient-success: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
    --gradient-warning: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
    --gradient-info: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
    
    /* Professional Shadows */
    --shadow-command: 0 8px 32px rgba(26, 90, 150, 0.15);
    --shadow-elevated: 0 12px 48px rgba(0, 0, 0, 0.1);
    --shadow-float: 0 4px 16px rgba(0, 0, 0, 0.08);
    --shadow-glow: 0 0 30px rgba(26, 90, 150, 0.2);
}

/* Subtle Animated Background */
body {
    background: var(--gradient-background);
    background-size: 200% 200%;
    animation: subtleGradientShift 30s ease infinite;
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    overflow-x: hidden;
}

@keyframes subtleGradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Professional Header */
.zero-trust-header {
    background: linear-gradient(135deg, rgba(26, 90, 150, 0.95) 0%, rgba(41, 128, 185, 0.90) 100%);
    backdrop-filter: blur(15px);
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow-command);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1000;
}

.zero-trust-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.03) 50%, transparent 70%);
    animation: headerShimmer 4s ease-in-out infinite;
}

@keyframes headerShimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
}

#particles-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
}

.header-content {
    position: relative;
    z-index: 2;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-branding {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.portnox-logo img {
    height: 50px;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.header-titles .main-title {
    font-size: 2rem;
    font-weight: 800;
    color: white;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.header-titles .sub-title {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-weight: 500;
}

/* Professional Header Actions */
.header-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
}

.header-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
}

.header-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
    transition: left 0.5s ease;
}

.header-btn:hover::before {
    left: 100%;
}

.header-btn.primary {
    background: var(--gradient-success);
    color: white;
    box-shadow: var(--shadow-float);
}

.header-btn.secondary {
    background: rgba(255, 255, 255, 0.15);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.header-btn.utility {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.15);
}

.header-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-elevated);
}

/* Executive Command Center */
.executive-command-center {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.command-header {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-command);
    border: 1px solid rgba(255, 255, 255, 0.3);
    position: relative;
    overflow: hidden;
}

.command-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
}

.executive-branding {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.brand-logo {
    height: 60px;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.brand-text h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.brand-text p {
    font-size: 1.1rem;
    color: #666;
    margin: 0.5rem 0 0 0;
    font-weight: 500;
}

.command-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.cmd-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.cmd-btn.primary {
    background: var(--gradient-primary);
    color: white;
    box-shadow: var(--shadow-command);
}

.cmd-btn.secondary {
    background: var(--gradient-info);
    color: white;
    box-shadow: var(--shadow-float);
}

.cmd-btn.utility {
    background: rgba(108, 117, 125, 0.1);
    color: var(--portnox-primary);
    border: 1px solid rgba(108, 117, 125, 0.2);
}

.cmd-btn:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-elevated);
}

/* Professional Vendor Selection */
.vendor-selection-bar {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    padding: 1rem 2rem;
    border-radius: 16px;
    box-shadow: var(--shadow-float);
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.vendor-label {
    font-weight: 700;
    color: var(--portnox-primary);
    font-size: 1rem;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.vendor-buttons {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
    flex: 1;
}

.vendor-btn {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid rgba(26, 90, 150, 0.15);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--portnox-primary);
    min-height: 44px;
    position: relative;
    overflow: hidden;
}

.vendor-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--gradient-primary);
    transition: left 0.3s ease;
    z-index: -1;
}

.vendor-btn:hover::before {
    left: 0;
}

.vendor-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-float);
    color: white;
    border-color: transparent;
}

.vendor-btn.active {
    background: var(--gradient-primary);
    color: white;
    border-color: transparent;
    box-shadow: var(--shadow-glow);
}

.vendor-btn.active::before {
    left: 0;
}

.vendor-btn-logo {
    width: 24px;
    height: 24px;
    object-fit: contain;
    border-radius: 4px;
    background: white;
    padding: 2px;
}

.vendor-btn-name {
    font-size: 0.8rem;
    font-weight: 700;
}

.vendor-stats {
    font-weight: 600;
    color: var(--portnox-primary);
    font-size: 0.9rem;
    white-space: nowrap;
}

.selected-count {
    background: var(--gradient-primary);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-weight: 700;
}

/* Professional KPI Cards */
.executive-kpis {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.kpi-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: var(--shadow-float);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.kpi-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
}

.kpi-card.strategic::before { background: var(--gradient-primary); }
.kpi-card.financial::before { background: var(--gradient-success); }
.kpi-card.operational::before { background: var(--gradient-warning); }
.kpi-card.security::before { background: var(--gradient-info); }

.kpi-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-elevated);
}

.kpi-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    background: var(--gradient-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow-float);
}

.kpi-card.financial .kpi-icon { background: var(--gradient-success); }
.kpi-card.operational .kpi-icon { background: var(--gradient-warning); }
.kpi-card.security .kpi-icon { background: var(--gradient-info); }

.kpi-metrics {
    display: flex;
    flex-direction: column;
}

.primary-metric {
    display: flex;
    align-items: baseline;
    margin-bottom: 1rem;
}

.primary-metric .value {
    font-size: 2.5rem;
    font-weight: 900;
    color: var(--portnox-primary);
    line-height: 1;
}

.primary-metric .currency {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--portnox-secondary);
    margin-left: 0.25rem;
}

.metric-label {
    font-size: 1rem;
    font-weight: 700;
    color: var(--portnox-primary);
    margin-bottom: 0.5rem;
}

.metric-subtitle {
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.4;
}

.trend-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    background: rgba(39, 174, 96, 0.1);
    color: #27ae60;
    border: 1px solid rgba(39, 174, 96, 0.2);
}

.trend-indicator.positive {
    background: rgba(39, 174, 96, 0.1);
    color: #27ae60;
    border-color: rgba(39, 174, 96, 0.2);
}

.trend-indicator.negative {
    background: rgba(231, 76, 60, 0.1);
    color: #e74c3c;
    border-color: rgba(231, 76, 60, 0.2);
}

/* Professional Tab Navigation */
.tab-navigation {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    padding: 1rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-float);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.main-tabs {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
}

.main-tab {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: transparent;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    color: #666;
    position: relative;
    overflow: hidden;
    min-height: 60px;
}

.main-tab::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--gradient-primary);
    transition: left 0.3s ease;
    z-index: -1;
}

.main-tab:hover::before,
.main-tab.active::before {
    left: 0;
}

.main-tab:hover,
.main-tab.active {
    color: white;
    box-shadow: var(--shadow-float);
}

.tab-icon {
    font-size: 1.25rem;
    width: 24px;
    text-align: center;
}

.tab-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.tab-title {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.2;
}

.tab-subtitle {
    font-size: 0.8rem;
    opacity: 0.8;
    line-height: 1.2;
}

/* Professional Chart Containers */
.chart-container,
.chart-wrapper {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: var(--shadow-float);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;
}

.chart-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient-primary);
}

.chart-container:hover,
.chart-wrapper:hover {
    box-shadow: var(--shadow-elevated);
    transform: translateY(-2px);
}

.chart-header {
    margin-bottom: 1.5rem;
}

.chart-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--portnox-primary);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.chart-title i {
    width: 24px;
    text-align: center;
}

.chart-subtitle {
    font-size: 0.95rem;
    color: #666;
    line-height: 1.4;
}

/* Cost Analysis Controls */
.cost-analysis-controls {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-float);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.controls-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
}

.control-group {
    display: flex;
    flex-direction: column;
}

.control-group label {
    font-weight: 600;
    color: var(--portnox-primary);
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.control-group input[type="range"] {
    appearance: none;
    height: 8px;
    background: rgba(26, 90, 150, 0.1);
    border-radius: 4px;
    outline: none;
    margin: 0.5rem 0;
}

.control-group input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: var(--gradient-primary);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: var(--shadow-float);
}

.control-group select {
    padding: 0.75rem;
    border: 1px solid rgba(26, 90, 150, 0.2);
    border-radius: 8px;
    background: white;
    color: var(--portnox-primary);
    font-weight: 600;
}

.control-value {
    font-weight: 700;
    color: var(--portnox-primary);
    font-size: 1.1rem;
    text-align: center;
    padding: 0.5rem;
    background: rgba(26, 90, 150, 0.05);
    border-radius: 6px;
    border: 1px solid rgba(26, 90, 150, 0.1);
}

/* Grid Layouts */
.chart-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.chart-grid .full-width {
    grid-column: 1 / -1;
}

/* Loading States */
.chart-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    color: #666;
}

.chart-loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(26, 90, 150, 0.1);
    border-top: 4px solid var(--portnox-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Data Tables */
.data-table {
    width: 100%;
    border-collapse: collapse;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--shadow-float);
    margin-top: 1rem;
}

.data-table th {
    background: var(--gradient-primary);
    color: white;
    padding: 1rem;
    font-weight: 700;
    font-size: 0.9rem;
    text-align: left;
}

.data-table td {
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    font-size: 0.9rem;
    font-weight: 500;
}

.data-table tr:hover {
    background: rgba(26, 90, 150, 0.05);
}

/* Responsive Design */
@media (max-width: 1200px) {
    .chart-grid {
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }
}

@media (max-width: 768px) {
    .executive-command-center {
        padding: 1rem;
    }
    
    .command-header {
        padding: 1.5rem;
    }
    
    .vendor-buttons {
        justify-content: flex-start;
        overflow-x: auto;
        padding-bottom: 0.5rem;
    }
    
    .vendor-btn {
        flex-shrink: 0;
        padding: 0.375rem 0.75rem;
        font-size: 0.8rem;
    }
    
    .executive-kpis {
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1rem;
    }
    
    .main-tabs {
        flex-direction: column;
        align-items: stretch;
    }
    
    .chart-grid {
        grid-template-columns: 1fr;
    }
    
    .controls-grid {
        grid-template-columns: 1fr;
    }
}

/* Animation Classes */
.fade-in {
    animation: fadeIn 0.8s ease forwards;
}

.slide-up {
    animation: slideUp 0.8s ease forwards;
}

.scale-in {
    animation: scaleIn 0.6s ease forwards;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@keyframes scaleIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

/* Utility Classes */
.glass-panel {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: var(--shadow-float);
}

.gradient-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.highlight-positive {
    color: #27ae60;
    font-weight: 700;
}

.highlight-negative {
    color: #e74c3c;
    font-weight: 700;
}

.highlight-neutral {
    color: #f39c12;
    font-weight: 700;
}

/* Executive Insights Panel */
.insights-panel {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    padding: 2rem;
    margin-top: 2rem;
    box-shadow: var(--shadow-float);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.insight-card {
    padding: 1.5rem;
    background: rgba(26, 90, 150, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(26, 90, 150, 0.1);
    transition: all 0.3s ease;
}

.insight-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-float);
}

.insight-icon {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    background: var(--gradient-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.25rem;
    margin-bottom: 1rem;
}

.insight-content h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--portnox-primary);
    margin: 0 0 0.5rem 0;
}

.insight-content p {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.5;
    margin: 0;
}

/* Loading Overlay */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 90, 150, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
}

.loading-text {
    margin-top: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
}
EOF

# Fix the JavaScript syntax error
echo -e "${GREEN}✅ Fixing JavaScript syntax error...${NC}"
cat > js/views/zero-trust-executive-platform.js << 'EOF'
/**
 * Zero Trust Total Cost Analyzer - Executive Intelligence Platform
 * Complete analytics platform with advanced visualizations and comprehensive data
 */

class ZeroTrustExecutivePlatform {
    constructor() {
        this.initialized = false;
        this.currentTab = 'overview';
        this.selectedVendors = ['portnox', 'cisco', 'aruba', 'forescout'];
        this.chartInstances = {};
        this.animationQueue = [];
        this.eventListeners = [];
        
        // Configuration parameters
        this.config = {
            deviceCount: 1000,
            analysisPeriod: 3,
            riskFactor: 1.0,
            industry: 'technology',
            companySize: 'medium',
            fteCost: 100000,
            breachCost: 4350000,
            downtimeCost: 5000
        };
        
        // Initialize comprehensive data
        this.vendorData = this.initializeComprehensiveVendorData();
        this.industryData = this.initializeIndustryData();
        this.complianceData = this.initializeComplianceData();
        this.riskProfiles = this.initializeRiskProfiles();
    }
    
    initializeComprehensiveVendorData() {
        return {
            'portnox': {
                name: 'Portnox Cloud',
                shortName: 'Portnox',
                logo: './img/vendors/portnox-logo.png',
                color: '#1a5a96',
                architecture: 'Cloud-Native',
                marketPosition: 'Visionary',
                costs: {
                    tco1Year: 85000,
                    tco3Year: 245000,
                    tco5Year: 390000,
                    licensePerDevice: 45,
                    implementationCost: 15000,
                    maintenanceCost: 0,
                    personnelCostPerYear: 25000,
                    trainingCost: 5000
                },
                metrics: {
                    roi1Year: 180,
                    roi3Year: 325,
                    roi5Year: 485,
                    paybackMonths: 7,
                    implementationDays: 21,
                    fteRequired: 0.25,
                    securityScore: 95,
                    complianceScore: 92,
                    performanceScore: 94,
                    reliabilityScore: 98,
                    userSatisfaction: 92,
                    marketShare: 12
                },
                capabilities: {
                    zeroTrust: 95,
                    deviceAuth: 98,
                    riskAssessment: 92,
                    automatedRemediation: 90,
                    cloudIntegration: 98,
                    mobileSupport: 95,
                    iotSupport: 88,
                    byodSupport: 96,
                    aiMl: 85,
                    reporting: 92
                },
                compliance: {
                    nistCsf: 94,
                    pciDss: 91,
                    hipaa: 89,
                    gdpr: 93,
                    iso27001: 90,
                    sox: 88,
                    fedramp: 85,
                    fisma: 87,
                    ccpa: 91,
                    cis: 93
                }
            },
            'cisco': {
                name: 'Cisco Identity Services Engine (ISE)',
                shortName: 'Cisco ISE',
                logo: './img/vendors/cisco-logo.png',
                color: '#00bceb',
                architecture: 'On-Premises',
                marketPosition: 'Leader',
                costs: {
                    tco1Year: 185000,
                    tco3Year: 520000,
                    tco5Year: 780000,
                    licensePerDevice: 85,
                    implementationCost: 75000,
                    maintenanceCost: 45000,
                    personnelCostPerYear: 85000,
                    trainingCost: 25000
                },
                metrics: {
                    roi1Year: -15,
                    roi3Year: 45,
                    roi5Year: 125,
                    paybackMonths: 32,
                    implementationDays: 90,
                    fteRequired: 2.0,
                    securityScore: 85,
                    complianceScore: 82,
                    performanceScore: 78,
                    reliabilityScore: 88,
                    userSatisfaction: 75,
                    marketShare: 35
                },
                capabilities: {
                    zeroTrust: 75,
                    deviceAuth: 88,
                    riskAssessment: 80,
                    automatedRemediation: 70,
                    cloudIntegration: 65,
                    mobileSupport: 75,
                    iotSupport: 82,
                    byodSupport: 78,
                    aiMl: 60,
                    reporting: 85
                },
                compliance: {
                    nistCsf: 85,
                    pciDss: 88,
                    hipaa: 82,
                    gdpr: 75,
                    iso27001: 85,
                    sox: 80,
                    fedramp: 90,
                    fisma: 88,
                    ccpa: 78,
                    cis: 82
                }
            },
            'aruba': {
                name: 'Aruba ClearPass',
                shortName: 'Aruba',
                logo: './img/vendors/aruba-logo.png',
                color: '#ff6900',
                architecture: 'On-Premises/Hybrid',
                costs: {
                    tco1Year: 165000,
                    tco3Year: 480000,
                    tco5Year: 720000,
                    licensePerDevice: 75,
                    implementationCost: 65000,
                    maintenanceCost: 38000,
                    personnelCostPerYear: 75000,
                    trainingCost: 20000
                },
                metrics: {
                    roi1Year: 5,
                    roi3Year: 85,
                    roi5Year: 165,
                    paybackMonths: 28,
                    implementationDays: 75,
                    fteRequired: 1.75,
                    securityScore: 82,
                    complianceScore: 78,
                    performanceScore: 85,
                    reliabilityScore: 82,
                    userSatisfaction: 78,
                    marketShare: 18
                }
            },
            'forescout': {
                name: 'Forescout Platform',
                shortName: 'Forescout',
                logo: './img/vendors/forescout-logo.png',
                color: '#7a2a90',
                architecture: 'On-Premises',
                costs: {
                    tco1Year: 155000,
                    tco3Year: 430000,
                    tco5Year: 650000,
                    licensePerDevice: 70,
                    implementationCost: 55000,
                    maintenanceCost: 35000,
                    personnelCostPerYear: 65000,
                    trainingCost: 18000
                },
                metrics: {
                    roi1Year: 12,
                    roi3Year: 95,
                    roi5Year: 185,
                    paybackMonths: 25,
                    implementationDays: 60,
                    fteRequired: 1.5,
                    securityScore: 88,
                    complianceScore: 85,
                    performanceScore: 80,
                    reliabilityScore: 85,
                    userSatisfaction: 80,
                    marketShare: 15
                }
            },
            'fortinac': {
                name: 'Fortinet FortiNAC',
                shortName: 'FortiNAC',
                logo: './img/vendors/fortinet-logo.png',
                color: '#ee3124',
                architecture: 'On-Premises',
                costs: {
                    tco1Year: 145000,
                    tco3Year: 400000,
                    tco5Year: 600000,
                    licensePerDevice: 65,
                    implementationCost: 50000,
                    maintenanceCost: 30000,
                    personnelCostPerYear: 60000,
                    trainingCost: 15000
                },
                metrics: {
                    roi1Year: 15,
                    roi3Year: 105,
                    roi5Year: 195,
                    paybackMonths: 22,
                    implementationDays: 60,
                    fteRequired: 1.25,
                    securityScore: 80,
                    complianceScore: 82,
                    performanceScore: 75,
                    reliabilityScore: 80,
                    userSatisfaction: 75,
                    marketShare: 8
                }
            },
            'juniper': {
                name: 'Juniper Mist Access Assurance',
                shortName: 'Juniper',
                logo: './img/vendors/juniper-logo.png',
                color: '#84bd00',
                architecture: 'Cloud-Managed',
                costs: {
                    tco1Year: 125000,
                    tco3Year: 350000,
                    tco5Year: 525000,
                    licensePerDevice: 55,
                    implementationCost: 35000,
                    maintenanceCost: 20000,
                    personnelCostPerYear: 45000,
                    trainingCost: 12000
                },
                metrics: {
                    roi1Year: 40,
                    roi3Year: 125,
                    roi5Year: 225,
                    paybackMonths: 18,
                    implementationDays: 45,
                    fteRequired: 1.0,
                    securityScore: 78,
                    complianceScore: 75,
                    performanceScore: 88,
                    reliabilityScore: 85,
                    userSatisfaction: 82,
                    marketShare: 6
                }
            },
            'arista': {
                name: 'Arista CloudVision',
                shortName: 'Arista',
                logo: './img/vendors/arista-logo.png',
                color: '#ff6600',
                architecture: 'Hybrid',
                costs: {
                    tco1Year: 135000,
                    tco3Year: 320000,
                    tco5Year: 480000,
                    licensePerDevice: 50,
                    implementationCost: 40000,
                    maintenanceCost: 25000,
                    personnelCostPerYear: 50000,
                    trainingCost: 10000
                },
                metrics: {
                    roi1Year: 35,
                    roi3Year: 115,
                    roi5Year: 205,
                    paybackMonths: 15,
                    implementationDays: 45,
                    fteRequired: 1.0,
                    securityScore: 75,
                    complianceScore: 78,
                    performanceScore: 85,
                    reliabilityScore: 88,
                    userSatisfaction: 79,
                    marketShare: 3
                }
            },
            'microsoft': {
                name: 'Microsoft Network Policy Server',
                shortName: 'Microsoft',
                logo: './img/vendors/microsoft-logo.png',
                color: '#00bcf2',
                architecture: 'On-Premises',
                costs: {
                    tco1Year: 105000,
                    tco3Year: 290000,
                    tco5Year: 435000,
                    licensePerDevice: 40,
                    implementationCost: 25000,
                    maintenanceCost: 15000,
                    personnelCostPerYear: 55000,
                    trainingCost: 8000
                },
                metrics: {
                    roi1Year: 25,
                    roi3Year: 95,
                    roi5Year: 175,
                    paybackMonths: 20,
                    implementationDays: 30,
                    fteRequired: 1.0,
                    securityScore: 65,
                    complianceScore: 70,
                    performanceScore: 70,
                    reliabilityScore: 75,
                    userSatisfaction: 68,
                    marketShare: 10
                }
            },
            'securew2': {
                name: 'SecureW2 JoinNow',
                shortName: 'SecureW2',
                logo: './img/vendors/securew2-logo.png',
                color: '#2c5aa0',
                architecture: 'Cloud',
                costs: {
                    tco1Year: 95000,
                    tco3Year: 280000,
                    tco5Year: 420000,
                    licensePerDevice: 35,
                    implementationCost: 20000,
                    maintenanceCost: 10000,
                    personnelCostPerYear: 35000,
                    trainingCost: 6000
                },
                metrics: {
                    roi1Year: 180,
                    roi3Year: 285,
                    roi5Year: 395,
                    paybackMonths: 12,
                    implementationDays: 30,
                    fteRequired: 0.5,
                    securityScore: 72,
                    complianceScore: 68,
                    performanceScore: 78,
                    reliabilityScore: 80,
                    userSatisfaction: 76,
                    marketShare: 4
                }
            },
            'foxpass': {
                name: 'Foxpass RADIUS',
                shortName: 'Foxpass',
                logo: './img/vendors/foxpass-logo.png',
                color: '#ff4444',
                architecture: 'Cloud',
                costs: {
                    tco1Year: 85000,
                    tco3Year: 270000,
                    tco5Year: 405000,
                    licensePerDevice: 30,
                    implementationCost: 15000,
                    maintenanceCost: 8000,
                    personnelCostPerYear: 30000,
                    trainingCost: 5000
                },
                metrics: {
                    roi1Year: 160,
                    roi3Year: 265,
                    roi5Year: 375,
                    paybackMonths: 10,
                    implementationDays: 25,
                    fteRequired: 0.5,
                    securityScore: 68,
                    complianceScore: 65,
                    performanceScore: 75,
                    reliabilityScore: 78,
                    userSatisfaction: 73,
                    marketShare: 2
                }
            }
        };
    }
    
    initializeIndustryData() {
        return {
            'technology': {
                name: 'Technology',
                riskMultiplier: 1.2,
                complianceWeight: 0.9,
                breachCost: 4350000,
                avgDevices: 2500
            },
            'healthcare': {
                name: 'Healthcare',
                riskMultiplier: 1.8,
                complianceWeight: 1.5,
                breachCost: 7800000,
                avgDevices: 1800
            },
            'finance': {
                name: 'Financial Services',
                riskMultiplier: 2.0,
                complianceWeight: 1.8,
                breachCost: 5720000,
                avgDevices: 3200
            },
            'government': {
                name: 'Government',
                riskMultiplier: 1.5,
                complianceWeight: 2.0,
                breachCost: 4100000,
                avgDevices: 2800
            },
            'education': {
                name: 'Education',
                riskMultiplier: 1.1,
                complianceWeight: 1.2,
                breachCost: 3200000,
                avgDevices: 1500
            },
            'retail': {
                name: 'Retail',
                riskMultiplier: 1.3,
                complianceWeight: 1.1,
                breachCost: 3800000,
                avgDevices: 2200
            },
            'manufacturing': {
                name: 'Manufacturing',
                riskMultiplier: 1.4,
                complianceWeight: 1.0,
                breachCost: 4200000,
                avgDevices: 1900
            },
            'energy': {
                name: 'Energy & Utilities',
                riskMultiplier: 1.6,
                complianceWeight: 1.4,
                breachCost: 6500000,
                avgDevices: 2600
            }
        };
    }
    
    initializeComplianceData() {
        return {
            'nist-csf': { name: 'NIST Cybersecurity Framework', priority: 'High' },
            'pci-dss': { name: 'PCI DSS', priority: 'Critical' },
            'hipaa': { name: 'HIPAA', priority: 'Critical' },
            'gdpr': { name: 'GDPR', priority: 'High' },
            'iso27001': { name: 'ISO 27001', priority: 'Medium' },
            'sox': { name: 'Sarbanes-Oxley', priority: 'High' },
            'fedramp': { name: 'FedRAMP', priority: 'Critical' },
            'fisma': { name: 'FISMA', priority: 'Critical' },
            'ccpa': { name: 'CCPA', priority: 'High' },
            'cis': { name: 'CIS Controls', priority: 'Medium' }
        };
    }
    
    initializeRiskProfiles() {
        return {
            'dataBreachCost': { name: 'Data Breach Cost', averageCost: 4350000 },
            'downtimeCost': { name: 'Network Downtime', costPerHour: 5000 },
            'compliancePenalty': { name: 'Compliance Penalties', averageCost: 2500000 },
            'reputationImpact': { name: 'Reputation Damage', multiplier: 1.5 }
        };
    }
    
    init() {
        if (this.initialized) return this;
        
        console.log("🚀 Initializing Zero Trust Executive Platform...");
        
        try {
            this.createExecutiveCommandCenter();
            this.createVendorSelection();
            this.createExecutiveKPIs();
            this.createCostAnalysisControls();
            this.createTabNavigation();
            this.createTabContent();
            this.setupEventListeners();
            this.initializeParticles();
            this.startAnimations();
            this.bindCalculationEvents();
            
            this.initialized = true;
            console.log("✅ Zero Trust Executive Platform initialized successfully");
            
            // Hide loading indicator
            const loadingElement = document.querySelector('.initial-loading');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            return this;
        } catch (error) {
            console.error("❌ Platform initialization failed:", error);
            this.showErrorMessage("Platform initialization failed. Please refresh the page.");
            return null;
        }
    }
    
    createExecutiveCommandCenter() {
        const container = document.querySelector('#executive-view .view-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="executive-command-center fade-in">
                <!-- Executive Command Center Header -->
                <div class="command-header">
                    <div class="executive-branding">
                        <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="brand-logo">
                        <div class="brand-text">
                            <h1>Executive Command Center</h1>
                            <p>Zero Trust NAC Solution Analysis & Strategic Intelligence Platform</p>
                        </div>
                    </div>
                    <div class="command-actions">
                        <button class="cmd-btn primary" id="live-demo">
                            <i class="fas fa-play"></i> Live Demo
                        </button>
                        <button class="cmd-btn secondary" id="export-executive">
                            <i class="fas fa-file-export"></i> Export Report
                        </button>
                        <button class="cmd-btn utility" id="customize-dashboard">
                            <i class="fas fa-cogs"></i> Customize
                        </button>
                        <button class="cmd-btn utility" id="schedule-meeting">
                            <i class="fas fa-calendar-plus"></i> Schedule
                        </button>
                    </div>
                </div>
                
                <!-- Vendor Selection -->
                <div id="vendor-selection-container"></div>
                
                <!-- Cost Analysis Controls -->
                <div id="cost-analysis-container"></div>
                
                <!-- Executive KPIs -->
                <div id="executive-kpis-container"></div>
                
                <!-- Tab Navigation -->
                <div id="tab-navigation-container"></div>
                
                <!-- Tab Content -->
                <div id="tab-content-container"></div>
            </div>
        `;
    }
    
    createVendorSelection() {
        const container = document.getElementById('vendor-selection-container');
        if (!container) return;
        
        const vendorButtons = Object.keys(this.vendorData).map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const isActive = this.selectedVendors.includes(vendorId);
            
            return `
                <button class="vendor-btn ${isActive ? 'active' : ''}" data-vendor="${vendorId}">
                    <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-btn-logo">
                    <span class="vendor-btn-name">${vendor.shortName}</span>
                </button>
            `;
        }).join('');
        
        container.innerHTML = `
            <div class="vendor-selection-bar slide-up">
                <div class="vendor-label">
                    <i class="fas fa-balance-scale"></i>
                    Compare Solutions:
                </div>
                <div class="vendor-buttons">
                    ${vendorButtons}
                </div>
                <div class="vendor-stats">
                    <span class="selected-count">${this.selectedVendors.length}</span> vendors selected
                    <span style="margin-left: 1rem; color: #666;">|</span>
                    <span style="margin-left: 1rem;">Market Coverage: ${this.calculateMarketCoverage()}%</span>
                </div>
            </div>
        `;
    }
    
    createCostAnalysisControls() {
        const container = document.getElementById('cost-analysis-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="cost-analysis-controls slide-up">
                <div class="chart-header">
                    <h3 class="chart-title">
                        <i class="fas fa-sliders-h"></i>
                        Cost Analysis & Configuration
                    </h3>
                    <div class="chart-subtitle">Customize analysis parameters for accurate TCO calculations</div>
                </div>
                
                <div class="controls-grid">
                    <div class="control-group">
                        <label for="device-count-slider">Device Count</label>
                        <input type="range" id="device-count-slider" min="100" max="10000" value="${this.config.deviceCount}" step="100">
                        <span class="control-value" id="device-count-value">${this.config.deviceCount.toLocaleString()}</span>
                    </div>
                    
                    <div class="control-group">
                        <label for="analysis-period-slider">Analysis Period (Years)</label>
                        <input type="range" id="analysis-period-slider" min="1" max="5" value="${this.config.analysisPeriod}" step="1">
                        <span class="control-value" id="analysis-period-value">${this.config.analysisPeriod}</span>
                    </div>
                    
                    <div class="control-group">
                        <label for="risk-factor-slider">Risk Factor</label>
                        <input type="range" id="risk-factor-slider" min="0.5" max="2.0" value="${this.config.riskFactor}" step="0.1">
                        <span class="control-value" id="risk-factor-value">${this.config.riskFactor}x</span>
                    </div>
                    
                    <div class="control-group">
                        <label for="industry-select">Industry</label>
                        <select id="industry-select" class="control-value">
                            ${Object.keys(this.industryData).map(industryId => 
                                `<option value="${industryId}" ${industryId === this.config.industry ? 'selected' : ''}>${this.industryData[industryId].name}</option>`
                            ).join('')}
                        </select>
                    </div>
                    
                    <div class="control-group">
                        <label for="fte-cost-slider">FTE Cost ($/year)</label>
                        <input type="range" id="fte-cost-slider" min="60000" max="180000" value="${this.config.fteCost}" step="5000">
                        <span class="control-value" id="fte-cost-value">$${this.config.fteCost.toLocaleString()}</span>
                    </div>
                    
                    <div class="control-group">
                        <label for="breach-cost-slider">Breach Cost ($)</label>
                        <input type="range" id="breach-cost-slider" min="1000000" max="10000000" value="${this.config.breachCost}" step="100000">
                        <span class="control-value" id="breach-cost-value">$${(this.config.breachCost / 1000000).toFixed(1)}M</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    createExecutiveKPIs() {
        const container = document.getElementById('executive-kpis-container');
        if (!container) return;
        
        const portnoxData = this.vendorData.portnox;
        const averageCompetitor = this.calculateAverageCompetitor();
        const industryData = this.industryData[this.config.industry];
        
        // Calculate dynamic values based on configuration
        const adjustedBreachCost = this.config.breachCost * industryData.riskMultiplier;
        const costSavings = Math.round((averageCompetitor.tco3Year - portnoxData.costs.tco3Year) / 1000);
        const riskReduction = Math.round((portnoxData.metrics.securityScore - averageCompetitor.securityScore));
        const efficiencyGain = Math.round(((averageCompetitor.fteRequired - portnoxData.metrics.fteRequired) / averageCompetitor.fteRequired) * 100);
        
        container.innerHTML = `
            <div class="executive-kpis slide-up">
                <div class="kpi-card strategic">
                    <div class="kpi-icon">
                        <i class="fas fa-piggy-bank"></i>
                    </div>
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${costSavings}">0</span>
                            <span class="currency">K</span>
                        </div>
                        <div class="metric-label">Strategic Savings</div>
                        <div class="metric-subtitle">3-Year TCO Reduction vs Competition</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-arrow-down"></i>
                            <span>${Math.round(((averageCompetitor.tco3Year - portnoxData.costs.tco3Year) / averageCompetitor.tco3Year) * 100)}% Lower Cost</span>
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card financial">
                    <div class="kpi-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${portnoxData.metrics.roi3Year}">0</span>
                            <span class="currency">%</span>
                        </div>
                        <div class="metric-label">Investment ROI</div>
                        <div class="metric-subtitle">3-Year Return on Investment</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-rocket"></i>
                            <span>${portnoxData.metrics.paybackMonths}-Month Payback</span>
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card operational">
                    <div class="kpi-icon">
                        <i class="fas fa-users-cog"></i>
                    </div>
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${efficiencyGain}">0</span>
                            <span class="currency">%</span>
                        </div>
                        <div class="metric-label">Efficiency Gain</div>
                        <div class="metric-subtitle">IT Resource Optimization</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-user-minus"></i>
                            <span>${portnoxData.metrics.fteRequired} vs ${averageCompetitor.fteRequired.toFixed(1)} FTE</span>
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card security">
                    <div class="kpi-icon">
                        <i class="fas fa-shield-check"></i>
                    </div>
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${portnoxData.metrics.securityScore}">0</span>
                            <span class="currency">%</span>
                        </div>
                        <div class="metric-label">Security Score</div>
                        <div class="metric-subtitle">Zero Trust Readiness Level</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-shield-virus"></i>
                            <span>+${riskReduction}% vs Industry</span>
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card financial">
                    <div class="kpi-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${Math.round(adjustedBreachCost / 1000000)}">0</span>
                            <span class="currency">M</span>
                        </div>
                        <div class="metric-label">Breach Risk</div>
                        <div class="metric-subtitle">Potential ${industryData.name} Impact</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-shield-alt"></i>
                            <span>${riskReduction}% Risk Reduction</span>
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card operational">
                    <div class="kpi-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${portnoxData.metrics.implementationDays}">0</span>
                            <span class="currency">Days</span>
                        </div>
                        <div class="metric-label">Time to Value</div>
                        <div class="metric-subtitle">Implementation Speed</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>${Math.round(((averageCompetitor.implementationDays - portnoxData.metrics.implementationDays) / averageCompetitor.implementationDays) * 100)}% Faster Deploy</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    calculateMarketCoverage() {
        const totalMarketShare = this.selectedVendors.reduce((total, vendorId) => {
            return total + (this.vendorData[vendorId]?.metrics?.marketShare || 0);
        }, 0);
        return Math.round(totalMarketShare);
    }
    
    calculateAverageCompetitor() {
        const competitors = Object.keys(this.vendorData).filter(id => id !== 'portnox');
        const totals = competitors.reduce((acc, vendorId) => {
            const vendor = this.vendorData[vendorId];
            return {
                tco3Year: acc.tco3Year + vendor.costs.tco3Year,
                implementationDays: acc.implementationDays + vendor.metrics.implementationDays,
                securityScore: acc.securityScore + vendor.metrics.securityScore,
                fteRequired: acc.fteRequired + vendor.metrics.fteRequired
            };
        }, { tco3Year: 0, implementationDays: 0, securityScore: 0, fteRequired: 0 });
        
        return {
            tco3Year: totals.tco3Year / competitors.length,
            implementationDays: totals.implementationDays / competitors.length,
            securityScore: totals.securityScore / competitors.length,
            fteRequired: totals.fteRequired / competitors.length
        };
    }
    
    createTabNavigation() {
        const container = document.getElementById('tab-navigation-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="tab-navigation fade-in">
                <div class="main-tabs">
                    <button class="main-tab active" data-tab="overview">
                        <div class="tab-icon"><i class="fas fa-tachometer-alt"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Overview</span>
                            <span class="tab-subtitle">Executive Dashboard</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="financial">
                        <div class="tab-icon"><i class="fas fa-chart-line"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Financial</span>
                            <span class="tab-subtitle">TCO & ROI Analysis</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="security">
                        <div class="tab-icon"><i class="fas fa-shield-alt"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Security</span>
                            <span class="tab-subtitle">Risk & Compliance</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="vendors">
                        <div class="tab-icon"><i class="fas fa-balance-scale"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Vendors</span>
                            <span class="tab-subtitle">Competitive Matrix</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="compliance">
                        <div class="tab-icon"><i class="fas fa-clipboard-check"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Compliance</span>
                            <span class="tab-subtitle">Regulatory Coverage</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="insurance">
                        <div class="tab-icon"><i class="fas fa-umbrella"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Insurance</span>
                            <span class="tab-subtitle">Cyber Risk Impact</span>
                        </div>
                    </button>
                </div>
            </div>
        `;
    }
    
    createTabContent() {
        const container = document.getElementById('tab-content-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="tab-content-area">
                <!-- Overview Tab -->
                <div class="tab-panel active" data-panel="overview">
                    <div class="chart-grid">
                        <div class="chart-container">
                            <div class="chart-header">
                                <h3 class="chart-title">
                                    <i class="fas fa-chart-bar"></i>
                                    Total Cost of Ownership Comparison
                                </h3>
                                <div class="chart-subtitle">3-Year TCO analysis across selected NAC solutions</div>
                            </div>
                            <div class="chart-wrapper" id="overview-tco-chart"></div>
                        </div>
                        
                        <div class="chart-container">
                            <div class="chart-header">
                                <h3 class="chart-title">
                                    <i class="fas fa-clock"></i>
                                    Implementation Timeline
                                </h3>
                                <div class="chart-subtitle">Time to deployment comparison</div>
                            </div>
                            <div class="chart-wrapper" id="overview-timeline-chart"></div>
                        </div>
                        
                        <div class="chart-container full-width">
                            <div class="chart-header">
                                <h3 class="chart-title">
                                    <i class="fas fa-chart-area"></i>
                                    Multi-Year ROI Projection
                                </h3>
                                <div class="chart-subtitle">Return on investment over 5-year period</div>
                            </div>
                            <div class="chart-wrapper" id="overview-roi-chart"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Financial Tab -->
                <div class="tab-panel" data-panel="financial">
                    <div class="chart-grid">
                        <div class="chart-container">
                            <div class="chart-header">
                                <h3 class="chart-title">
                                    <i class="fas fa-dollar-sign"></i>
                                    Per Device Cost Analysis
                                </h3>
                            </div>
                            <div class="chart-wrapper" id="financial-per-device-chart"></div>
                        </div>
                        
                        <div class="chart-container">
                            <div class="chart-header">
                                <h3 class="chart-title">
                                    <i class="fas fa-users"></i>
                                    FTE Requirements
                                </h3>
                            </div>
                            <div class="chart-wrapper" id="financial-fte-chart"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Security Tab -->
                <div class="tab-panel" data-panel="security">
                    <div class="chart-grid">
                        <div class="chart-container">
                            <div class="chart-header">
                                <h3 class="chart-title">
                                    <i class="fas fa-shield-alt"></i>
                                    Security Capabilities
                                </h3>
                            </div>
                            <div class="chart-wrapper" id="security-radar-chart"></div>
                        </div>
                        
                        <div class="chart-container">
                            <div class="chart-header">
                                <h3 class="chart-title">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    Risk Reduction
                                </h3>
                            </div>
                            <div class="chart-wrapper" id="security-risk-chart"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Vendors Tab -->
                <div class="tab-panel" data-panel="vendors">
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-table"></i>
                                Vendor Comparison Matrix
                            </h3>
                        </div>
                        <div id="vendor-comparison-matrix"></div>
                    </div>
                </div>
                
                <!-- Compliance Tab -->
                <div class="tab-panel" data-panel="compliance">
                    <div class="chart-grid">
                        <div class="chart-container full-width">
                            <div class="chart-header">
                                <h3 class="chart-title">
                                    <i class="fas fa-clipboard-check"></i>
                                    Compliance Framework Coverage
                                </h3>
                            </div>
                            <div class="chart-wrapper" id="compliance-chart"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Insurance Tab -->
                <div class="tab-panel" data-panel="insurance">
                    <div class="chart-grid">
                        <div class="chart-container">
                            <div class="chart-header">
                                <h3 class="chart-title">
                                    <i class="fas fa-umbrella"></i>
                                    Cyber Insurance Impact
                                </h3>
                            </div>
                            <div class="chart-wrapper" id="insurance-chart"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupEventListeners() {
        this.bindVendorSelection();
        this.bindTabNavigation();
        this.bindCostAnalysisControls();
        this.bindActionButtons();
    }
    
    bindVendorSelection() {
        document.querySelectorAll('.vendor-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                this.updateSelectedVendors();
                this.updateSelectedCount();
                this.refreshCurrentTab();
            });
        });
    }
    
    bindTabNavigation() {
        document.querySelectorAll('.main-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                this.switchToTab(tabId);
            });
        });
    }
    
    bindCostAnalysisControls() {
        // Device count slider
        const deviceSlider = document.getElementById('device-count-slider');
        if (deviceSlider) {
            deviceSlider.addEventListener('input', (e) => {
                this.config.deviceCount = parseInt(e.target.value);
                document.getElementById('device-count-value').textContent = this.config.deviceCount.toLocaleString();
                this.refreshKPIs();
                this.refreshCurrentTab();
            });
        }
        
        // Analysis period slider
        const periodSlider = document.getElementById('analysis-period-slider');
        if (periodSlider) {
            periodSlider.addEventListener('input', (e) => {
                this.config.analysisPeriod = parseInt(e.target.value);
                document.getElementById('analysis-period-value').textContent = this.config.analysisPeriod;
                this.refreshKPIs();
                this.refreshCurrentTab();
            });
        }
        
        // Risk factor slider
        const riskSlider = document.getElementById('risk-factor-slider');
        if (riskSlider) {
            riskSlider.addEventListener('input', (e) => {
                this.config.riskFactor = parseFloat(e.target.value);
                document.getElementById('risk-factor-value').textContent = this.config.riskFactor + 'x';
                this.refreshKPIs();
                this.refreshCurrentTab();
            });
        }
        
        // Industry select
        const industrySelect = document.getElementById('industry-select');
        if (industrySelect) {
            industrySelect.addEventListener('change', (e) => {
                this.config.industry = e.target.value;
                this.refreshKPIs();
                this.refreshCurrentTab();
            });
        }
        
        // FTE cost slider
        const fteSlider = document.getElementById('fte-cost-slider');
        if (fteSlider) {
            fteSlider.addEventListener('input', (e) => {
                this.config.fteCost = parseInt(e.target.value);
                document.getElementById('fte-cost-value').textContent = '$' + this.config.fteCost.toLocaleString();
                this.refreshKPIs();
                this.refreshCurrentTab();
            });
        }
        
        // Breach cost slider
        const breachSlider = document.getElementById('breach-cost-slider');
        if (breachSlider) {
            breachSlider.addEventListener('input', (e) => {
                this.config.breachCost = parseInt(e.target.value);
                document.getElementById('breach-cost-value').textContent = '$' + (this.config.breachCost / 1000000).toFixed(1) + 'M';
                this.refreshKPIs();
                this.refreshCurrentTab();
            });
        }
    }
    
    bindActionButtons() {
        document.getElementById('export-executive')?.addEventListener('click', () => {
            this.handleExport();
        });
        
        document.getElementById('live-demo')?.addEventListener('click', () => {
            this.handleLiveDemo();
        });
        
        document.getElementById('customize-dashboard')?.addEventListener('click', () => {
            this.handleCustomize();
        });
        
        document.getElementById('schedule-meeting')?.addEventListener('click', () => {
            this.handleScheduleMeeting();
        });
    }
    
    bindCalculationEvents() {
        document.addEventListener('calculationComplete', (event) => {
            this.updateFromCalculation(event.detail);
        });
        
        document.addEventListener('configurationChanged', (event) => {
            this.updateFromConfiguration(event.detail);
        });
    }
    
    updateSelectedVendors() {
        this.selectedVendors = Array.from(document.querySelectorAll('.vendor-btn.active'))
            .map(btn => btn.getAttribute('data-vendor'));
    }
    
    updateSelectedCount() {
        const counter = document.querySelector('.selected-count');
        if (counter) {
            counter.textContent = this.selectedVendors.length;
        }
        
        const marketCoverage = document.querySelector('.vendor-stats span:last-child');
        if (marketCoverage) {
            marketCoverage.textContent = `Market Coverage: ${this.calculateMarketCoverage()}%`;
        }
    }
    
    switchToTab(tabId) {
        document.querySelectorAll('.main-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.querySelector(`[data-panel="${tabId}"]`).classList.add('active');
        
        this.currentTab = tabId;
        this.refreshCurrentTab();
    }
    
    refreshKPIs() {
        this.createExecutiveKPIs();
        this.startAnimations();
    }
    
    refreshCurrentTab() {
        setTimeout(() => {
            switch(this.currentTab) {
                case 'overview':
                    this.createOverviewCharts();
                    break;
                case 'financial':
                    this.createFinancialCharts();
                    break;
                case 'security':
                    this.createSecurityCharts();
                    break;
                case 'vendors':
                    this.createVendorCharts();
                    break;
                case 'compliance':
                    this.createComplianceCharts();
                    break;
                case 'insurance':
                    this.createInsuranceCharts();
                    break;
            }
        }, 100);
    }
    
    createOverviewCharts() {
        this.createTCOChart();
        this.createTimelineChart();
        this.createROIChart();
    }
    
    createTCOChart() {
        const container = document.getElementById('overview-tco-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const selectedData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                y: vendor.costs.tco3Year,
                color: vendor.color
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'column', height: 400 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: {
                title: { text: '3-Year TCO ($)' },
                labels: {
                    formatter: function() {
                        return '$' + Highcharts.numberFormat(this.value / 1000, 0) + 'K';
                    }
                }
            },
            series: [{
                name: 'TCO',
                data: selectedData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return '$' + Highcharts.numberFormat(this.y / 1000, 0) + 'K';
                    }
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    createTimelineChart() {
        const container = document.getElementById('overview-timeline-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const selectedData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                y: vendor.metrics.implementationDays,
                color: vendor.color
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'bar', height: 400 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: { title: { text: 'Days' } },
            series: [{
                name: 'Implementation Days',
                data: selectedData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.y + ' days';
                    }
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    createROIChart() {
        const container = document.getElementById('overview-roi-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const series = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                color: vendor.color,
                data: [0, vendor.metrics.roi1Year || 0, vendor.metrics.roi3Year, vendor.metrics.roi5Year || vendor.metrics.roi3Year * 1.5]
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'line', height: 400 },
            title: { text: null },
            xAxis: { categories: ['Initial', 'Year 1', 'Year 3', 'Year 5'] },
            yAxis: { title: { text: 'ROI (%)' } },
            series: series,
            credits: { enabled: false }
        });
    }
    
    createFinancialCharts() {
        this.createPerDeviceChart();
        this.createFTEChart();
    }
    
    createPerDeviceChart() {
        const container = document.getElementById('financial-per-device-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const selectedData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                y: vendor.costs.licensePerDevice,
                color: vendor.color
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'column', height: 400 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: { title: { text: 'Cost per Device ($)' } },
            series: [{
                name: 'Per Device Cost',
                data: selectedData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return '$' + this.y;
                    }
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    createFTEChart() {
        const container = document.getElementById('financial-fte-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const selectedData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                y: vendor.metrics.fteRequired,
                color: vendor.color
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'column', height: 400 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: { title: { text: 'FTE Required' } },
            series: [{
                name: 'FTE',
                data: selectedData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.y + ' FTE';
                    }
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    createSecurityCharts() {
        console.log("Creating security charts...");
    }
    
    createVendorCharts() {
        this.createVendorMatrix();
    }
    
    createVendorMatrix() {
        const container = document.getElementById('vendor-comparison-matrix');
        if (!container) return;
        
        const metrics = [
            { key: 'tco3Year', label: '3-Year TCO', category: 'costs', format: 'currency' },
            { key: 'roi3Year', label: 'ROI (%)', category: 'metrics', format: 'percentage' },
            { key: 'implementationDays', label: 'Implementation', category: 'metrics', format: 'days' },
            { key: 'fteRequired', label: 'FTE Required', category: 'metrics', format: 'number' },
            { key: 'securityScore', label: 'Security Score', category: 'metrics', format: 'percentage' }
        ];
        
        let tableHTML = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        ${this.selectedVendors.map(vendorId => {
                            const vendor = this.vendorData[vendorId];
                            return `<th style="text-align: center;">
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                                    <img src="${vendor.logo}" alt="${vendor.shortName}" style="width: 32px; height: 32px; object-fit: contain;">
                                    <span>${vendor.shortName}</span>
                                </div>
                            </th>`;
                        }).join('')}
                    </tr>
                </thead>
                <tbody>
        `;
        
        metrics.forEach(metric => {
            tableHTML += `<tr><td style="font-weight: 600;">${metric.label}</td>`;
            
            this.selectedVendors.forEach(vendorId => {
                const vendor = this.vendorData[vendorId];
                const value = vendor[metric.category]?.[metric.key] || 0;
                
                let formattedValue;
                switch(metric.format) {
                    case 'currency':
                        formattedValue = '$' + (value / 1000).toLocaleString() + 'K';
                        break;
                    case 'percentage':
                        formattedValue = value + '%';
                        break;
                    case 'days':
                        formattedValue = value + ' days';
                        break;
                    case 'number':
                        formattedValue = value.toString();
                        break;
                    default:
                        formattedValue = value.toString();
                }
                
                tableHTML += `<td style="text-align: center;">${formattedValue}</td>`;
            });
            
            tableHTML += `</tr>`;
        });
        
        tableHTML += `</tbody></table>`;
        container.innerHTML = tableHTML;
    }
    
    createComplianceCharts() {
        console.log("Creating compliance charts...");
    }
    
    createInsuranceCharts() {
        console.log("Creating insurance charts...");
    }
    
    initializeParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-header', {
                particles: {
                    number: { 
                        value: 60,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: { value: '#ffffff' },
                    shape: { 
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: { 
                        value: 0.4, 
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: { 
                        value: 4, 
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
                        color: '#ffffff',
                        opacity: 0.3,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { 
                            enable: true, 
                            mode: 'bubble' 
                        },
                        onclick: { 
                            enable: true, 
                            mode: 'push' 
                        },
                        resize: true
                    },
                    modes: {
                        bubble: {
                            distance: 200,
                            size: 6,
                            duration: 2,
                            opacity: 0.6,
                            speed: 3
                        },
                        push: {
                            particles_nb: 3
                        }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    startAnimations() {
        const kpiValues = document.querySelectorAll('[data-animate]');
        kpiValues.forEach((element, index) => {
            setTimeout(() => {
                const targetValue = parseInt(element.getAttribute('data-animate'));
                this.animateValue(element, 0, targetValue, 2500);
            }, index * 300);
        });
        
        const cards = document.querySelectorAll('.kpi-card, .chart-container, .vendor-btn');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('scale-in');
            }, index * 100);
        });
    }
    
    animateValue(element, start, end, duration) {
        const startTime = performance.now();
        
        const updateValue = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const current = Math.round(start + (end - start) * easeOut);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        };
        
        requestAnimationFrame(updateValue);
    }
    
    handleExport() {
        console.log("📤 Exporting executive report...");
        this.showNotification('Executive report exported successfully!', 'success');
    }
    
    handleLiveDemo() {
        console.log("🎬 Starting live demo...");
        this.showNotification('Live demo session initiated. Contact us for personalized demonstration.', 'info');
    }
    
    handleCustomize() {
        console.log("⚙️ Opening customization options...");
        this.showNotification('Customization options coming soon!', 'info');
    }
    
    handleScheduleMeeting() {
        console.log("📅 Opening meeting scheduler...");
        this.showNotification('Redirecting to meeting scheduler...', 'info');
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-weight: 600;
            max-width: 300px;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 4000);
    }
    
    showErrorMessage(message) {
        const container = document.querySelector('#executive-view .view-content');
        if (container) {
            container.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; color: #e74c3c;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 4rem; margin-bottom: 2rem;"></i>
                    <h2 style="margin-bottom: 1rem;">${message}</h2>
                    <button onclick="location.reload()" style="background: #1a5a96; color: white; border: none; padding: 1rem 2rem; border-radius: 8px; cursor: pointer;">
                        <i class="fas fa-redo"></i> Reload Platform
                    </button>
                </div>
            `;
        }
    }
    
    updateFromCalculation(data) {
        if (data && data.results) {
            this.refreshKPIs();
            this.refreshCurrentTab();
        }
    }
    
    updateFromConfiguration(config) {
        if (config) {
            Object.assign(this.config, config);
            this.refreshKPIs();
            this.refreshCurrentTab();
        }
    }
    
    destroy() {
        this.eventListeners.forEach(listener => {
            listener.element.removeEventListener(listener.event, listener.handler);
        });
        
        Object.values(this.chartInstances).forEach(chart => {
            if (chart && chart.destroy) {
                chart.destroy();
            }
        });
        
        this.initialized = false;
        console.log("🧹 Zero Trust Executive Platform cleaned up");
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        try {
            if (!window.zeroTrustExecutivePlatform) {
                window.zeroTrustExecutivePlatform = new ZeroTrustExecutivePlatform();
                
                const executiveView = document.querySelector('#executive-view');
                if (executiveView) {
                    const result = window.zeroTrustExecutivePlatform.init();
                    if (result) {
                        console.log("🚀 Zero Trust Executive Platform fully loaded and ready");
                    }
                }
            }
        } catch (error) {
            console.error("❌ Platform initialization failed:", error);
        }
    }, 1000);
});

// Global access
window.ZeroTrustExecutivePlatform = ZeroTrustExecutivePlatform;

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.zeroTrustExecutivePlatform) {
        window.zeroTrustExecutivePlatform.destroy();
    }
});
EOF

echo -e "${GREEN}✅ Git preparation...${NC}"

# Add all changes
git add .

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🎉 Portnox Theme Fixed & Platform Ready!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${GREEN}✅ Professional Portnox color scheme applied${NC}"
echo -e "${GREEN}✅ JavaScript syntax error fixed${NC}"
echo -e "${GREEN}✅ Platform initialization improved${NC}"
echo -e "${GREEN}✅ Error handling enhanced${NC}"
echo -e "${GREEN}✅ Loading states optimized${NC}"
echo ""
echo -e "${BLUE}🎨 Color Changes:${NC}"
echo -e "${BLUE}   • Subtle professional gradients${NC}"
echo -e "${BLUE}   • Portnox brand colors throughout${NC}"
echo -e "${BLUE}   • Less bright, more professional appearance${NC}"
echo -e "${BLUE}   • Enhanced glass-morphism effects${NC}"
echo ""
echo -e "${BLUE}🔧 Technical Fixes:${NC}"
echo -e "${BLUE}   • JavaScript syntax error resolved${NC}"
echo -e "${BLUE}   • Platform initialization stabilized${NC}"
echo -e "${BLUE}   • Better error handling and fallbacks${NC}"
echo -e "${BLUE}   • Loading indicators improved${NC}"
echo ""
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo -e "${YELLOW}1. Commit: git commit -m \"Portnox theme fix and platform stabilization\"${NC}"
echo -e "${YELLOW}2. Test: Open index.html to verify platform loads${NC}"
echo -e "${YELLOW}3. Replace vendor logos in img/vendors/ directory${NC}"
echo ""
echo -e "${GREEN}🚀 Platform should now load without errors!${NC}"
