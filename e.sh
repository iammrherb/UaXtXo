#!/bin/bash

# ================================================================================
# PORTNOX TCO PLATFORM - SCRIPT 5: FINAL INTEGRATION
# ================================================================================

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║                    Script 5: Final Integration & Launch                       ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"

# Create index.html
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portnox Total Cost Analyzer | Zero Trust NAC TCO Calculator</title>
    <meta name="description" content="Compare Zero Trust NAC solutions with comprehensive TCO/ROI analysis. See why Portnox CLEAR delivers superior value.">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="./img/vendors/portnox-logo.png">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1"></script>
    
    <!-- Custom Styles -->
    <link rel="stylesheet" href="./css/theme/modern-platform.css">
    <link rel="stylesheet" href="./css/components/vendor-selection.css">
    
    <style>
        /* Core styles while main CSS loads */
        body {
            margin: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #F8FAFB;
            color: #0F172A;
        }
        
        #app {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .initial-loading {
            text-align: center;
            padding: 2rem;
        }
        
        .loading-logo {
            width: 200px;
            margin-bottom: 2rem;
        }
        
        .loading-spinner {
            width: 48px;
            height: 48px;
            border: 3px solid #E2E8F0;
            border-top-color: #00D4AA;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .loading-text {
            color: #475569;
            font-size: 1.125rem;
        }
        
        .loading-progress {
            margin-top: 1rem;
            font-size: 0.875rem;
            color: #94A3B8;
        }
    </style>
</head>
<body>
    <!-- Application Container -->
    <div id="app">
        <div class="initial-loading">
            <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="loading-logo"
                 onerror="this.style.display='none'">
            <div class="loading-spinner"></div>
            <p class="loading-text">Initializing Total Cost Analyzer...</p>
            <p class="loading-progress" id="loading-progress">Loading vendor database...</p>
        </div>
    </div>
    
    <!-- Vendor Logo Helper -->
    <script>
        window.getVendorLogo = function(vendorId) {
            const logos = {
                portnox: './img/vendors/portnox-logo.png',
                cisco: './img/vendors/cisco-logo.png',
                aruba: './img/vendors/aruba-logo.png',
                forescout: './img/vendors/forescout-logo.png',
                extreme: './img/vendors/extreme-logo.png',
                arista: './img/vendors/arista-logo.png',
                juniper: './img/vendors/juniper-logo.png',
                fortinet: './img/vendors/fortinet-logo.png',
                microsoft: './img/vendors/microsoft-logo.png',
                packetfence: './img/vendors/packetfence-logo.png',
                foxpass: './img/vendors/foxpass-logo.png',
                securew2: './img/vendors/securew2-logo.png',
                radiusaas: './img/vendors/radiusaas-logo.png',
                default: './img/vendors/default-logo.png'
            };
            return logos[vendorId] || logos.default;
        };
    </script>
    
    <!-- Core Data -->
    <script src="./js/data/vendor-database.js"></script>
    <script src="./js/data/industry-database.js"></script>
    <script src="./js/data/compliance-database.js"></script>
    <script src="./js/data/risk-security-database.js"></script>
    
    <!-- Components -->
    <script src="./js/components/vendor-selection-ui.js"></script>
    
    <!-- Main Application -->
    <script src="./js/core/platform-app.js"></script>
    
    <!-- Loading Progress -->
    <script>
        // Update loading progress
        const updateProgress = (message) => {
            const progress = document.getElementById('loading-progress');
            if (progress) progress.textContent = message;
        };
        
        // Monitor loading
        let loadedModules = 0;
        const requiredModules = 5;
        
        const checkModule = (moduleName) => {
            if (window[moduleName]) {
                loadedModules++;
                updateProgress(`Loading modules... (${loadedModules}/${requiredModules})`);
                
                if (loadedModules === requiredModules) {
                    updateProgress('Initializing application...');
                }
            }
        };
        
        // Check modules as they load
        const moduleInterval = setInterval(() => {
            checkModule('VendorDatabase');
            checkModule('IndustryDatabase');
            checkModule('ComplianceDatabase');
            checkModule('RiskSecurityDatabase');
            checkModule('VendorSelectionUI');
            
            if (loadedModules === requiredModules) {
                clearInterval(moduleInterval);
            }
        }, 100);
    </script>
    
    <!-- Analytics (Optional) -->
    <script>
        // Google Analytics or other tracking would go here
        console.log('🚀 Portnox Total Cost Analyzer v5.0');
        console.log('📊 Comprehensive TCO/ROI analysis platform');
    </script>
</body>
</html>
EOF

# Create main theme CSS
cat > css/theme/modern-platform.css << 'EOF'
/* Modern Platform Theme - Complete Implementation */

:root {
    /* Portnox Brand Colors */
    --portnox-primary: #00D4AA;
    --portnox-primary-dark: #00A085;
    --portnox-primary-light: #4DE5C9;
    --portnox-secondary: #1B2951;
    --portnox-accent: #FF6B35;
    
    /* UI Colors */
    --bg-main: #F8FAFB;
    --bg-card: #FFFFFF;
    --bg-hover: #F1F5F9;
    --bg-accent: #E5F9F5;
    --text-primary: #0F172A;
    --text-secondary: #475569;
    --text-muted: #94A3B8;
    --text-inverse: #FFFFFF;
    
    /* Semantic Colors */
    --success: #10B981;
    --warning: #F59E0B;
    --danger: #EF4444;
    --info: #3B82F6;
    
    /* Shadows & Borders */
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --border-color: #E2E8F0;
    
    /* Typography */
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: var(--font-primary);
    background: var(--bg-main);
    color: var(--text-primary);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
}

/* Layout */
.platform-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Header */
.platform-header {
    background: var(--bg-card);
    border-bottom: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo-section {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.company-logo {
    height: 40px;
    width: auto;
}

.platform-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--portnox-secondary);
    margin: 0;
}

.platform-subtitle {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
}

.header-actions {
    display: flex;
    gap: 1rem;
}

/* Configuration Section */
.config-section {
    background: var(--bg-card);
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
}

.config-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
}

.config-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1rem;
}

.config-group label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
}

/* Forms */
.form-select,
.form-input {
    width: 100%;
    padding: 0.625rem 1rem;
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
    transition: all 0.2s;
}

.form-select:hover,
.form-input:hover {
    border-color: var(--portnox-primary);
}

.form-select:focus,
.form-input:focus {
    outline: none;
    border-color: var(--portnox-primary);
    box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.1);
}

/* Advanced Config */
.advanced-config {
    margin-top: 1rem;
}

.advanced-config-panel {
    background: var(--bg-hover);
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 1rem;
}

/* Toggle Switches */
.toggle-switch {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    margin-right: 1.5rem;
}

.toggle-switch input {
    display: none;
}

.toggle-slider {
    width: 48px;
    height: 24px;
    background: var(--border-color);
    border-radius: 12px;
    position: relative;
    transition: all 0.3s;
    margin-right: 0.75rem;
}

.toggle-slider::after {
    content: '';
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 3px;
    transition: all 0.3s;
}

.toggle-switch input:checked + .toggle-slider {
    background: var(--portnox-primary);
}

.toggle-switch input:checked + .toggle-slider::after {
    transform: translateX(24px);
}

.toggle-label {
    font-size: 0.875rem;
    color: var(--text-primary);
}

/* Compliance Section */
.compliance-section {
    margin-top: 1.5rem;
}

.compliance-section h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.compliance-selector {
    display: grid;
    gap: 1.5rem;
}

.compliance-category {
    background: var(--bg-hover);
    padding: 1rem;
    border-radius: 8px;
}

.compliance-category h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.compliance-checkboxes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 0.5rem;
}

.compliance-checkbox {
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background 0.2s;
}

.compliance-checkbox:hover {
    background: var(--bg-card);
}

.compliance-checkbox input {
    margin-top: 0.125rem;
    margin-right: 0.75rem;
    cursor: pointer;
}

.checkbox-label {
    font-weight: 600;
    font-size: 0.875rem;
    display: block;
}

.checkbox-hint {
    font-size: 0.75rem;
    color: var(--text-muted);
    display: block;
}

/* Vendor Selection Section */
.vendor-selection-section {
    background: var(--bg-main);
    padding: 2rem 0;
}

/* Navigation */
.nav-section {
    background: var(--bg-card);
    border-bottom: 1px solid var(--border-color);
    overflow-x: auto;
    position: sticky;
    top: 73px;
    z-index: 90;
}

.nav-tabs {
    display: flex;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
}

.nav-tab {
    background: none;
    border: none;
    padding: 1rem 1.5rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border-bottom: 3px solid transparent;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.nav-tab:hover {
    color: var(--text-primary);
    background: var(--bg-hover);
}

.nav-tab.active {
    color: var(--portnox-primary);
    border-bottom-color: var(--portnox-primary);
}

/* Main Content */
.main-content {
    flex: 1;
    padding: 2rem 1rem;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
}

/* View Headers */
.view-header {
    margin-bottom: 2rem;
}

.view-header h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.view-subtitle {
    font-size: 1.125rem;
    color: var(--text-secondary);
}

/* Dashboard Metrics */
.dashboard-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.metric-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.3s;
}

.metric-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.metric-card.primary {
    background: linear-gradient(135deg, var(--portnox-primary), var(--portnox-primary-dark));
    color: var(--text-inverse);
    border: none;
}

.metric-card.large {
    grid-column: span 2;
}

.metric-header {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.metric-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 212, 170, 0.1);
    border-radius: 12px;
    font-size: 1.5rem;
}

.metric-card.primary .metric-icon {
    background: rgba(255, 255, 255, 0.2);
}

.metric-value {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
}

.metric-label {
    font-size: 0.875rem;
    opacity: 0.8;
    margin-top: 0.25rem;
}

.metric-detail {
    font-size: 0.75rem;
    opacity: 0.7;
    margin-top: 0.25rem;
}

/* Charts */
.dashboard-charts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.chart-container {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1.5rem;
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.chart-header h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
}

/* Tables */
.dashboard-table {
    background: var(--bg-card);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
}

.dashboard-table h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.table-responsive {
    overflow-x: auto;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
}

.data-table th {
    background: var(--bg-hover);
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--text-secondary);
    border-bottom: 2px solid var(--border-color);
}

.data-table td {
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
}

.data-table tr:hover {
    background: var(--bg-hover);
}

.highlight-row {
    background: var(--bg-accent);
}

.vendor-name-cell {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.vendor-logo-small {
    height: 24px;
    width: auto;
}

/* Badges */
.badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.badge-primary {
    background: var(--portnox-primary);
    color: white;
}

/* Risk Badges */
.risk-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.875rem;
}

.risk-low {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success);
}

.risk-medium {
    background: rgba(245, 158, 11, 0.1);
    color: var(--warning);
}

.risk-high {
    background: rgba(239, 68, 68, 0.1);
    color: var(--danger);
}

.risk-critical {
    background: var(--danger);
    color: white;
}

/* Overall Score */
.overall-score {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 700;
}

.score-excellent {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success);
}

.score-good {
    background: rgba(0, 212, 170, 0.1);
    color: var(--portnox-primary);
}

.score-average {
    background: rgba(245, 158, 11, 0.1);
    color: var(--warning);
}

.score-poor {
    background: rgba(239, 68, 68, 0.1);
    color: var(--danger);
}

/* Insights */
.dashboard-insights {
    margin-top: 2rem;
}

.dashboard-insights h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}

.insight-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    gap: 1rem;
}

.insight-card.success {
    border-color: var(--success);
    background: rgba(16, 185, 129, 0.05);
}

.insight-card.info {
    border-color: var(--info);
    background: rgba(59, 130, 246, 0.05);
}

.insight-card.primary {
    border-color: var(--portnox-primary);
    background: var(--bg-accent);
}

.insight-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 1.25rem;
}

.insight-card.success .insight-icon {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success);
}

.insight-card.info .insight-icon {
    background: rgba(59, 130, 246, 0.1);
    color: var(--info);
}

.insight-card.primary .insight-icon {
    background: rgba(0, 212, 170, 0.1);
    color: var(--portnox-primary);
}

.insight-content h4 {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.insight-content p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
}

/* Buttons */
.btn {
    padding: 0.625rem 1.25rem;
    border: none;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-primary {
    background: var(--portnox-primary);
    color: var(--text-inverse);
}

.btn-primary:hover {
    background: var(--portnox-primary-dark);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.btn-secondary {
    background: var(--bg-card);
    color: var(--portnox-primary);
    border: 2px solid var(--portnox-primary);
}

.btn-secondary:hover {
    background: var(--bg-accent);
}

.btn-sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
}

/* Footer */
.platform-footer {
    background: var(--bg-card);
    border-top: 1px solid var(--border-color);
    padding: 1.5rem;
    margin-top: auto;
}

.footer-content {
    max-width: 1400px;
    margin: 0 auto;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.875rem;
}

.footer-content a {
    color: var(--portnox-primary);
    text-decoration: none;
}

.footer-content a:hover {
    text-decoration: underline;
}

/* Loading States */
.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    flex-direction: column;
}

.loading-spinner {
    width: 48px;
    height: 48px;
    border: 3px solid var(--border-color);
    border-top-color: var(--portnox-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading p {
    margin-top: 1rem;
    color: var(--text-muted);
}

/* Error States */
.error-state {
    text-align: center;
    padding: 3rem;
    color: var(--text-muted);
}

.error-state i {
    font-size: 3rem;
    color: var(--danger);
    margin-bottom: 1rem;
}

.error-state h3 {
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

/* Responsive */
@media (max-width: 1024px) {
    .config-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .dashboard-metrics {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .metric-card.large {
        grid-column: span 2;
    }
}

@media (max-width: 768px) {
    .header-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .header-actions {
        width: 100%;
        justify-content: center;
    }
    
    .config-grid {
        grid-template-columns: 1fr;
    }
    
    .dashboard-metrics {
        grid-template-columns: 1fr;
    }
    
    .metric-card.large {
        grid-column: span 1;
    }
    
    .dashboard-charts {
        grid-template-columns: 1fr;
    }
    
    .nav-tabs {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
    
    .nav-tab {
        font-size: 0.75rem;
        padding: 0.75rem 1rem;
    }
    
    .data-table {
        font-size: 0.875rem;
    }
    
    .data-table th,
    .data-table td {
        padding: 0.75rem 0.5rem;
    }
}

/* Print Styles */
@media print {
    .platform-header,
    .config-section,
    .vendor-selection-section,
    .nav-section,
    .platform-footer {
        display: none;
    }
    
    .main-content {
        padding: 0;
    }
    
    .chart-container,
    .metric-card {
        break-inside: avoid;
    }
}

/* Animations */
.fade-in {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Utilities */
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-left { text-align: left; }
.text-muted { color: var(--text-muted); }
.text-success { color: var(--success); }
.text-danger { color: var(--danger); }
.text-warning { color: var(--warning); }
.text-primary { color: var(--portnox-primary); }

.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mt-3 { margin-top: 1.5rem; }
.mt-4 { margin-top: 2rem; }

.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 2rem; }

.grid {
    display: grid;
    gap: 1.5rem;
}

.grid-2 {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-3 {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.grid-4 {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
EOF

# Create launch script
cat > launch.sh << 'EOF'
#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║              🚀 PORTNOX TOTAL COST ANALYZER - LAUNCH 🚀                       ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""
echo "Platform is ready to launch!"
echo ""
echo "To run the platform:"
echo ""
echo "1. Using Python:"
echo "   python3 -m http.server 8000"
echo ""
echo "2. Using Node.js:"
echo "   npx serve"
echo ""
echo "3. Using PHP:"
echo "   php -S localhost:8000"
echo ""
echo "Then open http://localhost:8000 in your browser"
echo ""
echo "Features implemented:"
echo "✅ All 13 vendors with complete pricing"
echo "✅ All industries (15+) with specific requirements"
echo "✅ All compliance frameworks (20+) with NAC mappings"
echo "✅ Comprehensive risk and security analysis"
echo "✅ Cyber insurance impact calculations"
echo "✅ Enhanced vendor selection with pills"
echo "✅ Executive, Financial, Risk, Compliance, Operational views"
echo "✅ Interactive charts and visualizations"
echo "✅ Export functionality"
echo "✅ Fully responsive design"
echo ""
echo "Note: Add vendor logo PNG files to img/vendors/ for best experience"
EOF

chmod +x launch.sh
