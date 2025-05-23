#!/bin/bash

# =============================================================================
# Portnox Total Cost Analyzer - Comprehensive Update Script
# =============================================================================
# This script updates the entire Portnox TCO Analyzer with enhanced features:
# - Advanced UI with gradient backgrounds and particle effects
# - Comprehensive vendor coverage (10+ vendors)
# - Executive-level dashboards with KPIs and analytics
# - State-of-the-art charts using Highcharts and D3.js
# - Full compliance and industry coverage
# - Interactive cost calculators and projections
# =============================================================================

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
REPO_NAME="portnox-tco-analyzer"
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}🚀 Portnox TCO Analyzer Update Script${NC}"
echo -e "${BLUE}========================================${NC}"

# Function to print status messages
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Create backup
create_backup() {
    print_info "Creating backup of current version..."
    if [ -d ".git" ]; then
        mkdir -p "$BACKUP_DIR"
        cp -r . "$BACKUP_DIR/" 2>/dev/null || true
        print_status "Backup created in $BACKUP_DIR"
    fi
}

# Update Enhanced CSS with Gradient Background and Improved UI
update_enhanced_css() {
    print_info "Updating enhanced CSS with gradient backgrounds..."
    
    cat > css/enhanced-executive-dashboard.css << 'EOF'
/**
 * Enhanced Executive Dashboard CSS
 * Advanced gradient backgrounds, improved UI, and visual enhancements
 */

:root {
    /* Enhanced Color Palette */
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --gradient-success: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --gradient-warning: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    --gradient-background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #43e97b 75%, #667eea 100%);
    
    /* Portnox Brand Colors */
    --portnox-primary: #1a5a96;
    --portnox-secondary: #2980b9;
    --portnox-accent: #3498db;
    
    /* Enhanced Shadows */
    --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.15);
    --shadow-heavy: 0 8px 32px rgba(0, 0, 0, 0.2);
    --shadow-glow: 0 0 20px rgba(102, 126, 234, 0.3);
}

/* Enhanced Body Background */
body {
    background: var(--gradient-background);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Enhanced Header with Particles */
.zero-trust-header {
    background: linear-gradient(135deg, rgba(26, 90, 150, 0.95) 0%, rgba(41, 128, 185, 0.95) 100%);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow-heavy);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Enhanced Vendor Buttons - Smaller Design */
.vendor-selection-bar {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    box-shadow: var(--shadow-medium);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.vendor-label {
    font-weight: 600;
    color: var(--portnox-primary);
    white-space: nowrap;
    font-size: 0.9rem;
}

.vendor-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    align-items: center;
}

.vendor-btn {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.75rem;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(26, 90, 150, 0.2);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--portnox-primary);
    min-height: 36px;
}

.vendor-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
    background: rgba(255, 255, 255, 0.95);
    border-color: var(--portnox-secondary);
}

.vendor-btn.active {
    background: var(--gradient-primary);
    color: white;
    border-color: transparent;
    box-shadow: var(--shadow-glow);
}

.vendor-btn-logo {
    width: 20px;
    height: 20px;
    object-fit: contain;
    border-radius: 3px;
}

.vendor-btn-name {
    font-size: 0.75rem;
    font-weight: 600;
}

/* Enhanced KPI Cards - Smaller and Cleaner */
.executive-kpis {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.kpi-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 1rem;
    box-shadow: var(--shadow-medium);
    border: 1px solid rgba(255, 255, 255, 0.2);
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
    height: 3px;
    background: var(--gradient-primary);
}

.kpi-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-heavy);
}

.kpi-card.strategic::before { background: var(--gradient-primary); }
.kpi-card.financial::before { background: var(--gradient-success); }
.kpi-card.operational::before { background: var(--gradient-warning); }
.kpi-card.security::before { background: var(--gradient-secondary); }

.kpi-metrics {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.primary-metric {
    display: flex;
    align-items: baseline;
    margin-bottom: 0.5rem;
}

.primary-metric .value {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--portnox-primary);
    line-height: 1;
}

.primary-metric .currency {
    font-size: 1rem;
    font-weight: 600;
    color: var(--portnox-secondary);
    margin-left: 0.25rem;
}

.metric-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--portnox-primary);
    margin-bottom: 0.25rem;
}

.metric-subtitle {
    font-size: 0.75rem;
    color: #666;
    margin-bottom: 0.5rem;
}

.trend-indicator {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    background: rgba(76, 175, 80, 0.1);
    color: #4caf50;
}

/* Enhanced Tab Navigation */
.tab-navigation {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 0.5rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow-medium);
}

.main-tabs {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

.main-tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    color: #666;
    position: relative;
    overflow: hidden;
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
    box-shadow: var(--shadow-medium);
}

.tab-icon {
    font-size: 1.1rem;
}

.tab-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.tab-title {
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1;
}

.tab-subtitle {
    font-size: 0.75rem;
    opacity: 0.8;
    line-height: 1;
}

/* Enhanced Chart Containers */
.chart-container,
.chart-wrapper {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: var(--shadow-medium);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    margin-bottom: 1rem;
    position: relative;
    overflow: hidden;
}

.chart-container:hover,
.chart-wrapper:hover {
    box-shadow: var(--shadow-heavy);
    transform: translateY(-2px);
}

.chart-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--portnox-primary);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.chart-subtitle {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 1rem;
}

/* Enhanced Loading States */
.chart-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    color: #666;
}

.chart-loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(26, 90, 150, 0.1);
    border-top: 3px solid var(--portnox-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Enhanced Data Tables */
.data-table {
    width: 100%;
    border-collapse: collapse;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow-light);
}

.data-table th {
    background: var(--gradient-primary);
    color: white;
    padding: 0.75rem;
    font-weight: 600;
    font-size: 0.875rem;
    text-align: left;
}

.data-table td {
    padding: 0.75rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    font-size: 0.875rem;
}

.data-table tr:hover {
    background: rgba(102, 126, 234, 0.05);
}

/* Enhanced Responsive Design */
@media (max-width: 768px) {
    .vendor-buttons {
        justify-content: flex-start;
        overflow-x: auto;
        padding-bottom: 0.5rem;
    }
    
    .vendor-btn {
        flex-shrink: 0;
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
    }
    
    .executive-kpis {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 0.75rem;
    }
    
    .main-tabs {
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    
    .main-tab {
        padding: 0.5rem 0.75rem;
        font-size: 0.8rem;
    }
}

/* Enhanced Animation Classes */
.fade-in {
    animation: fadeIn 0.6s ease forwards;
}

.slide-up {
    animation: slideUp 0.6s ease forwards;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

/* Enhanced Utility Classes */
.glass-panel {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: var(--shadow-medium);
}

.gradient-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.highlight-positive {
    color: #4caf50;
    font-weight: 600;
}

.highlight-negative {
    color: #f44336;
    font-weight: 600;
}

.highlight-neutral {
    color: #ff9800;
    font-weight: 600;
}
EOF

    print_status "Enhanced CSS updated with gradient backgrounds and improved UI"
}

# Update Comprehensive Executive Dashboard
update_executive_dashboard() {
    print_info "Creating comprehensive executive dashboard..."
    
    cat > js/views/comprehensive-executive-dashboard.js << 'EOF'
/**
 * Comprehensive Executive Dashboard for Portnox Total Cost Analyzer
 * Advanced analytics, vendor comparisons, and executive-level insights
 */

class ComprehensiveExecutiveDashboard {
    constructor() {
        this.initialized = false;
        this.currentTab = 'overview';
        this.selectedVendors = ['portnox', 'cisco', 'aruba', 'forescout'];
        this.chartInstances = {};
        this.animationQueue = [];
        
        // Comprehensive vendor data with complete market coverage
        this.vendorData = this.initializeVendorData();
        this.industryData = this.initializeIndustryData();
        this.complianceData = this.initializeComplianceData();
        this.riskFactors = this.initializeRiskFactors();
    }
    
    initializeVendorData() {
        return {
            'portnox': {
                name: 'Portnox Cloud',
                shortName: 'Portnox',
                logo: './img/vendors/portnox-logo.png',
                color: '#1a5a96',
                architecture: 'Cloud-Native',
                deploymentModel: 'SaaS',
                marketPosition: 'Leader',
                founded: 2014,
                headquarters: 'New York, USA',
                employees: '100-500',
                funding: '$50M+',
                costs: {
                    tco1Year: 85000,
                    tco3Year: 245000,
                    tco5Year: 390000,
                    licensePerDevice: 45,
                    implementationCost: 15000,
                    maintenanceCost: 0,
                    personnelCostPerYear: 25000
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
                    reliabilityScore: 98
                },
                capabilities: {
                    zeroTrust: 95,
                    deviceAuth: 98,
                    riskAssessment: 92,
                    automatedRemediation: 90,
                    cloudIntegration: 98,
                    mobileSupport: 95,
                    iotSupport: 88,
                    byodSupport: 96
                },
                compliance: {
                    nistCsf: 94,
                    pciDss: 91,
                    hipaa: 89,
                    gdpr: 93,
                    iso27001: 90,
                    sox: 88,
                    fedramp: 85
                },
                integrations: {
                    azure: true,
                    aws: true,
                    googleWorkspace: true,
                    okta: true,
                    activedirectory: true,
                    radius: true,
                    siem: true,
                    mdm: true
                }
            },
            'cisco': {
                name: 'Cisco Identity Services Engine (ISE)',
                shortName: 'Cisco ISE',
                logo: './img/vendors/cisco-logo.png',
                color: '#00bceb',
                architecture: 'On-Premises',
                deploymentModel: 'Hardware/VM',
                marketPosition: 'Established',
                founded: 1984,
                headquarters: 'San Jose, USA',
                employees: '75,000+',
                funding: 'Public',
                costs: {
                    tco1Year: 185000,
                    tco3Year: 520000,
                    tco5Year: 780000,
                    licensePerDevice: 85,
                    implementationCost: 75000,
                    maintenanceCost: 45000,
                    personnelCostPerYear: 85000
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
                    reliabilityScore: 88
                },
                capabilities: {
                    zeroTrust: 75,
                    deviceAuth: 88,
                    riskAssessment: 80,
                    automatedRemediation: 70,
                    cloudIntegration: 65,
                    mobileSupport: 75,
                    iotSupport: 82,
                    byodSupport: 78
                },
                compliance: {
                    nistCsf: 85,
                    pciDss: 88,
                    hipaa: 82,
                    gdpr: 75,
                    iso27001: 85,
                    sox: 80,
                    fedramp: 90
                }
            },
            'aruba': {
                name: 'Aruba ClearPass',
                shortName: 'Aruba',
                logo: './img/vendors/aruba-logo.png',
                color: '#ff6900',
                architecture: 'On-Premises/Hybrid',
                deploymentModel: 'Hardware/Cloud',
                marketPosition: 'Strong Performer',
                costs: {
                    tco1Year: 165000,
                    tco3Year: 480000,
                    tco5Year: 720000,
                    licensePerDevice: 75,
                    implementationCost: 65000,
                    maintenanceCost: 38000,
                    personnelCostPerYear: 75000
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
                    reliabilityScore: 82
                }
            },
            'forescout': {
                name: 'Forescout Platform',
                shortName: 'Forescout',
                logo: './img/vendors/forescout-logo.png',
                color: '#7a2a90',
                architecture: 'On-Premises',
                deploymentModel: 'Appliance',
                marketPosition: 'Challenger',
                costs: {
                    tco1Year: 155000,
                    tco3Year: 430000,
                    tco5Year: 650000,
                    licensePerDevice: 70,
                    implementationCost: 55000,
                    maintenanceCost: 35000,
                    personnelCostPerYear: 65000
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
                    reliabilityScore: 85
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
                    personnelCostPerYear: 60000
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
                    reliabilityScore: 80
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
                    personnelCostPerYear: 45000
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
                    reliabilityScore: 85
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
                    personnelCostPerYear: 50000
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
                    reliabilityScore: 88
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
                    personnelCostPerYear: 55000
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
                    reliabilityScore: 75
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
                    personnelCostPerYear: 35000
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
                    reliabilityScore: 80
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
                    personnelCostPerYear: 30000
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
                    reliabilityScore: 78
                }
            }
        };
    }
    
    initializeIndustryData() {
        return {
            'technology': { name: 'Technology', riskMultiplier: 1.2, complianceWeight: 0.9 },
            'healthcare': { name: 'Healthcare', riskMultiplier: 1.8, complianceWeight: 1.5 },
            'finance': { name: 'Financial Services', riskMultiplier: 2.0, complianceWeight: 1.8 },
            'government': { name: 'Government', riskMultiplier: 1.5, complianceWeight: 2.0 },
            'education': { name: 'Education', riskMultiplier: 1.1, complianceWeight: 1.2 },
            'retail': { name: 'Retail', riskMultiplier: 1.3, complianceWeight: 1.1 },
            'manufacturing': { name: 'Manufacturing', riskMultiplier: 1.4, complianceWeight: 1.0 },
            'energy': { name: 'Energy & Utilities', riskMultiplier: 1.6, complianceWeight: 1.4 }
        };
    }
    
    initializeComplianceData() {
        return {
            'nist-csf': { name: 'NIST Cybersecurity Framework', priority: 'High' },
            'pci-dss': { name: 'PCI DSS', priority: 'High' },
            'hipaa': { name: 'HIPAA', priority: 'Critical' },
            'gdpr': { name: 'GDPR', priority: 'High' },
            'iso27001': { name: 'ISO 27001', priority: 'Medium' },
            'sox': { name: 'Sarbanes-Oxley', priority: 'High' },
            'fedramp': { name: 'FedRAMP', priority: 'Critical' }
        };
    }
    
    initializeRiskFactors() {
        return {
            'breach-cost': { name: 'Data Breach Cost', averageCost: 4350000 },
            'downtime-cost': { name: 'Network Downtime', costPerHour: 5000 },
            'compliance-penalty': { name: 'Compliance Penalties', averageCost: 2500000 },
            'reputation-impact': { name: 'Reputation Damage', multiplier: 1.5 }
        };
    }
    
    init() {
        if (this.initialized) return this;
        
        print_info("Initializing Comprehensive Executive Dashboard...");
        
        this.createExecutiveContainer();
        this.createVendorSelection();
        this.createExecutiveKPIs();
        this.createTabNavigation();
        this.createTabContent();
        this.setupEventListeners();
        this.initializeParticles();
        this.startAnimations();
        
        this.initialized = true;
        print_status("Executive Dashboard initialized successfully");
        return this;
    }
    
    createExecutiveContainer() {
        const container = document.querySelector('#executive-view .view-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="comprehensive-executive-dashboard fade-in">
                <!-- Executive Header -->
                <div class="executive-header glass-panel">
                    <div class="executive-branding">
                        <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="executive-logo">
                        <div class="executive-titles">
                            <h1 class="gradient-text">Executive Intelligence Center</h1>
                            <p class="executive-subtitle">Zero Trust NAC Strategic Analysis & Decision Support</p>
                        </div>
                    </div>
                    <div class="executive-actions">
                        <button class="action-btn primary" id="generate-report">
                            <i class="fas fa-file-chart"></i> Generate Report
                        </button>
                        <button class="action-btn secondary" id="schedule-demo">
                            <i class="fas fa-calendar-plus"></i> Schedule Demo
                        </button>
                        <button class="action-btn utility" id="export-data">
                            <i class="fas fa-download"></i> Export
                        </button>
                    </div>
                </div>
                
                <!-- Vendor Selection -->
                <div id="vendor-selection-container"></div>
                
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
                </div>
            </div>
        `;
    }
    
    createExecutiveKPIs() {
        const container = document.getElementById('executive-kpis-container');
        if (!container) return;
        
        const portnoxData = this.vendorData.portnox;
        const averageCompetitor = this.calculateAverageCompetitor();
        
        container.innerHTML = `
            <div class="executive-kpis slide-up">
                <div class="kpi-card strategic">
                    <div class="kpi-icon">
                        <i class="fas fa-piggy-bank"></i>
                    </div>
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${Math.round((averageCompetitor.tco3Year - portnoxData.costs.tco3Year) / 1000)}">0</span>
                            <span class="currency">K</span>
                        </div>
                        <div class="metric-label">Cost Savings</div>
                        <div class="metric-subtitle">3-Year TCO Reduction</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-trending-down"></i>
                            <span>${Math.round(((averageCompetitor.tco3Year - portnoxData.costs.tco3Year) / averageCompetitor.tco3Year) * 100)}% vs Competition</span>
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
                        <div class="metric-label">ROI</div>
                        <div class="metric-subtitle">3-Year Return</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-rocket"></i>
                            <span>${portnoxData.metrics.paybackMonths}-Month Payback</span>
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
                        <div class="metric-label">Time to Deploy</div>
                        <div class="metric-subtitle">Implementation Speed</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>${Math.round(((averageCompetitor.implementationDays - portnoxData.metrics.implementationDays) / averageCompetitor.implementationDays) * 100)}% Faster</span>
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
                        <div class="metric-subtitle">Zero Trust Readiness</div>
                        <div class="trend-indicator positive">
                            <i class="fas fa-award"></i>
                            <span>Industry Leading</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    calculateAverageCompetitor() {
        const competitors = Object.keys(this.vendorData).filter(id => id !== 'portnox');
        const totals = competitors.reduce((acc, vendorId) => {
            const vendor = this.vendorData[vendorId];
            return {
                tco3Year: acc.tco3Year + vendor.costs.tco3Year,
                implementationDays: acc.implementationDays + vendor.metrics.implementationDays,
                securityScore: acc.securityScore + vendor.metrics.securityScore
            };
        }, { tco3Year: 0, implementationDays: 0, securityScore: 0 });
        
        return {
            tco3Year: totals.tco3Year / competitors.length,
            implementationDays: totals.implementationDays / competitors.length,
            securityScore: totals.securityScore / competitors.length
        };
    }
    
    createTabNavigation() {
        const container = document.getElementById('tab-navigation-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="tab-navigation fade-in">
                <div class="main-tabs">
                    <button class="main-tab active" data-tab="overview">
                        <div class="tab-icon">
                            <i class="fas fa-tachometer-alt"></i>
                        </div>
                        <div class="tab-content">
                            <span class="tab-title">Overview</span>
                            <span class="tab-subtitle">Executive Summary</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="financial">
                        <div class="tab-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="tab-content">
                            <span class="tab-title">Financial</span>
                            <span class="tab-subtitle">TCO & ROI Analysis</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="security">
                        <div class="tab-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <div class="tab-content">
                            <span class="tab-title">Security</span>
                            <span class="tab-subtitle">Risk & Compliance</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="vendors">
                        <div class="tab-icon">
                            <i class="fas fa-balance-scale"></i>
                        </div>
                        <div class="tab-content">
                            <span class="tab-title">Vendors</span>
                            <span class="tab-subtitle">Competitive Matrix</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="compliance">
                        <div class="tab-icon">
                            <i class="fas fa-clipboard-check"></i>
                        </div>
                        <div class="tab-content">
                            <span class="tab-title">Compliance</span>
                            <span class="tab-subtitle">Regulatory Coverage</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="insurance">
                        <div class="tab-icon">
                            <i class="fas fa-umbrella"></i>
                        </div>
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
                    ${this.createOverviewContent()}
                </div>
                
                <!-- Financial Tab -->
                <div class="tab-panel" data-panel="financial">
                    ${this.createFinancialContent()}
                </div>
                
                <!-- Security Tab -->
                <div class="tab-panel" data-panel="security">
                    ${this.createSecurityContent()}
                </div>
                
                <!-- Vendors Tab -->
                <div class="tab-panel" data-panel="vendors">
                    ${this.createVendorsContent()}
                </div>
                
                <!-- Compliance Tab -->
                <div class="tab-panel" data-panel="compliance">
                    ${this.createComplianceContent()}
                </div>
                
                <!-- Insurance Tab -->
                <div class="tab-panel" data-panel="insurance">
                    ${this.createInsuranceContent()}
                </div>
            </div>
        `;
    }
    
    createOverviewContent() {
        return `
            <div class="overview-dashboard">
                <div class="chart-grid">
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-chart-bar"></i>
                                TCO Comparison (3-Year)
                            </h3>
                            <div class="chart-subtitle">Total cost of ownership across leading NAC solutions</div>
                        </div>
                        <div class="chart-wrapper" id="overview-tco-chart"></div>
                    </div>
                    
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-clock"></i>
                                Implementation Timeline
                            </h3>
                            <div class="chart-subtitle">Days to full deployment and value realization</div>
                        </div>
                        <div class="chart-wrapper" id="overview-timeline-chart"></div>
                    </div>
                    
                    <div class="chart-container full-width">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-chart-area"></i>
                                ROI Projection Analysis
                            </h3>
                            <div class="chart-subtitle">Return on investment over 5-year period</div>
                        </div>
                        <div class="chart-wrapper" id="overview-roi-projection-chart"></div>
                    </div>
                </div>
                
                <div class="insights-panel glass-panel">
                    <h3><i class="fas fa-lightbulb"></i> Executive Insights</h3>
                    <div class="insights-grid">
                        <div class="insight-card">
                            <div class="insight-icon"><i class="fas fa-trophy"></i></div>
                            <div class="insight-content">
                                <h4>Market Leadership</h4>
                                <p>Portnox Cloud demonstrates superior TCO and fastest implementation timeline compared to traditional NAC solutions.</p>
                            </div>
                        </div>
                        <div class="insight-card">
                            <div class="insight-icon"><i class="fas fa-rocket"></i></div>
                            <div class="insight-content">
                                <h4>Accelerated Value</h4>
                                <p>Cloud-native architecture delivers immediate value with 21-day implementation vs 90+ days for on-premises solutions.</p>
                            </div>
                        </div>
                        <div class="insight-card">
                            <div class="insight-icon"><i class="fas fa-shield-check"></i></div>
                            <div class="insight-content">
                                <h4>Enhanced Security</h4>
                                <p>95% security score with comprehensive Zero Trust capabilities reduces breach risk and compliance burden.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    createFinancialContent() {
        return `
            <div class="financial-dashboard">
                <div class="financial-controls glass-panel">
                    <h3><i class="fas fa-sliders-h"></i> Cost Analysis Controls</h3>
                    <div class="controls-grid">
                        <div class="control-group">
                            <label for="device-count-slider">Device Count</label>
                            <input type="range" id="device-count-slider" min="100" max="10000" value="1000" step="100">
                            <span class="control-value" id="device-count-value">1,000</span>
                        </div>
                        <div class="control-group">
                            <label for="analysis-period-slider">Analysis Period (Years)</label>
                            <input type="range" id="analysis-period-slider" min="1" max="5" value="3" step="1">
                            <span class="control-value" id="analysis-period-value">3</span>
                        </div>
                        <div class="control-group">
                            <label for="risk-factor-slider">Risk Factor</label>
                            <input type="range" id="risk-factor-slider" min="0.5" max="2.0" value="1.0" step="0.1">
                            <span class="control-value" id="risk-factor-value">1.0x</span>
                        </div>
                    </div>
                </div>
                
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
                    
                    <div class="chart-container full-width">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-chart-line"></i>
                                Multi-Year ROI Projections
                            </h3>
                        </div>
                        <div class="chart-wrapper" id="financial-multi-year-roi-chart"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    createSecurityContent() {
        return `
            <div class="security-dashboard">
                <div class="chart-grid">
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-shield-alt"></i>
                                Security Capabilities Radar
                            </h3>
                        </div>
                        <div class="chart-wrapper" id="security-radar-chart"></div>
                    </div>
                    
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-exclamation-triangle"></i>
                                Risk Reduction Impact
                            </h3>
                        </div>
                        <div class="chart-wrapper" id="security-risk-chart"></div>
                    </div>
                    
                    <div class="chart-container full-width">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-chart-area"></i>
                                Breach Cost Comparison
                            </h3>
                        </div>
                        <div class="chart-wrapper" id="security-breach-cost-chart"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    createVendorsContent() {
        return `
            <div class="vendors-dashboard">
                <div class="vendor-matrix-container">
                    <div class="chart-header">
                        <h3 class="chart-title">
                            <i class="fas fa-table"></i>
                            Comprehensive Vendor Comparison Matrix
                        </h3>
                    </div>
                    <div id="vendor-comparison-matrix"></div>
                </div>
                
                <div class="chart-grid">
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-chart-pie"></i>
                                Market Share Analysis
                            </h3>
                        </div>
                        <div class="chart-wrapper" id="vendors-market-share-chart"></div>
                    </div>
                    
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-trending-up"></i>
                                Growth Trajectory
                            </h3>
                        </div>
                        <div class="chart-wrapper" id="vendors-growth-chart"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    createComplianceContent() {
        return `
            <div class="compliance-dashboard">
                <div class="chart-grid">
                    <div class="chart-container full-width">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-clipboard-check"></i>
                                Regulatory Framework Coverage
                            </h3>
                        </div>
                        <div class="chart-wrapper" id="compliance-framework-chart"></div>
                    </div>
                    
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-chart-radar"></i>
                                NIST CSF Compliance
                            </h3>
                        </div>
                        <div class="chart-wrapper" id="compliance-nist-chart"></div>
                    </div>
                    
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-industry"></i>
                                Industry-Specific Requirements
                            </h3>
                        </div>
                        <div class="chart-wrapper" id="compliance-industry-chart"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    createInsuranceContent() {
        return `
            <div class="insurance-dashboard">
                <div class="chart-grid">
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-umbrella"></i>
                                Cyber Insurance Impact
                            </h3>
                        </div>
                        <div class="chart-wrapper" id="insurance-impact-chart"></div>
                    </div>
                    
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-calculator"></i>
                                Premium Reduction Calculator
                            </h3>
                        </div>
                        <div class="chart-wrapper" id="insurance-calculator-chart"></div>
                    </div>
                    
                    <div class="chart-container full-width">
                        <div class="chart-header">
                            <h3 class="chart-title">
                                <i class="fas fa-chart-line"></i>
                                Risk Score Improvement Timeline
                            </h3>
                        </div>
                        <div class="chart-wrapper" id="insurance-timeline-chart"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupEventListeners() {
        // Vendor selection
        document.querySelectorAll('.vendor-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                this.updateSelectedVendors();
                this.updateSelectedCount();
                this.refreshCurrentTab();
            });
        });
        
        // Tab navigation
        document.querySelectorAll('.main-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                this.switchToTab(tabId);
            });
        });
        
        // Financial controls
        const deviceSlider = document.getElementById('device-count-slider');
        const periodSlider = document.getElementById('analysis-period-slider');
        const riskSlider = document.getElementById('risk-factor-slider');
        
        if (deviceSlider) {
            deviceSlider.addEventListener('input', () => {
                document.getElementById('device-count-value').textContent = 
                    parseInt(deviceSlider.value).toLocaleString();
                this.refreshFinancialCharts();
            });
        }
        
        if (periodSlider) {
            periodSlider.addEventListener('input', () => {
                document.getElementById('analysis-period-value').textContent = periodSlider.value;
                this.refreshFinancialCharts();
            });
        }
        
        if (riskSlider) {
            riskSlider.addEventListener('input', () => {
                document.getElementById('risk-factor-value').textContent = riskSlider.value + 'x';
                this.refreshFinancialCharts();
            });
        }
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
    }
    
    switchToTab(tabId) {
        // Update tab UI
        document.querySelectorAll('.main-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        // Update panel UI
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.querySelector(`[data-panel="${tabId}"]`).classList.add('active');
        
        this.currentTab = tabId;
        this.refreshCurrentTab();
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
        this.createTCOComparisonChart();
        this.createTimelineChart();
        this.createROIProjectionChart();
    }
    
    createTCOComparisonChart() {
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
            yAxis: {
                title: { text: 'Implementation Days' }
            },
            series: [{
                name: 'Days',
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
    
    createROIProjectionChart() {
        const container = document.getElementById('overview-roi-projection-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const series = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                color: vendor.color,
                data: [0, vendor.metrics.roi1Year, vendor.metrics.roi3Year, vendor.metrics.roi5Year]
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'line', height: 400 },
            title: { text: null },
            xAxis: {
                categories: ['Initial', 'Year 1', 'Year 3', 'Year 5']
            },
            yAxis: {
                title: { text: 'ROI (%)' },
                labels: {
                    formatter: function() {
                        return this.value + '%';
                    }
                }
            },
            series: series,
            credits: { enabled: false }
        });
    }
    
    createFinancialCharts() {
        this.createPerDeviceChart();
        this.createFTEChart();
        this.createMultiYearROIChart();
    }
    
    createPerDeviceChart() {
        const container = document.getElementById('financial-per-device-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const deviceCount = parseInt(document.getElementById('device-count-slider')?.value || 1000);
        
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
            yAxis: {
                title: { text: 'Cost per Device ($)' },
                labels: {
                    formatter: function() {
                        return '$' + this.value;
                    }
                }
            },
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
            yAxis: {
                title: { text: 'FTE Required' }
            },
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
    
    createMultiYearROIChart() {
        const container = document.getElementById('financial-multi-year-roi-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const series = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                color: vendor.color,
                data: [
                    0,
                    vendor.metrics.roi1Year,
                    vendor.metrics.roi1Year + (vendor.metrics.roi3Year - vendor.metrics.roi1Year) * 0.67,
                    vendor.metrics.roi3Year,
                    vendor.metrics.roi3Year + (vendor.metrics.roi5Year - vendor.metrics.roi3Year) * 0.5,
                    vendor.metrics.roi5Year
                ]
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'area', height: 400 },
            title: { text: null },
            xAxis: {
                categories: ['Initial', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']
            },
            yAxis: {
                title: { text: 'ROI (%)' },
                labels: {
                    formatter: function() {
                        return this.value + '%';
                    }
                }
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.3,
                    marker: {
                        enabled: true,
                        radius: 4
                    }
                }
            },
            series: series,
            credits: { enabled: false }
        });
    }
    
    refreshFinancialCharts() {
        if (this.currentTab === 'financial') {
            this.createFinancialCharts();
        }
    }
    
    createSecurityCharts() {
        this.createSecurityRadarChart();
        this.createRiskChart();
        this.createBreachCostChart();
    }
    
    createSecurityRadarChart() {
        const container = document.getElementById('security-radar-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const categories = ['Zero Trust', 'Device Auth', 'Risk Assessment', 'Auto Remediation', 'Cloud Integration', 'Mobile Support', 'IoT Support', 'BYOD Support'];
        
        const series = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const capabilities = vendor.capabilities || {};
            return {
                name: vendor.shortName,
                color: vendor.color,
                data: [
                    capabilities.zeroTrust || 0,
                    capabilities.deviceAuth || 0,
                    capabilities.riskAssessment || 0,
                    capabilities.automatedRemediation || 0,
                    capabilities.cloudIntegration || 0,
                    capabilities.mobileSupport || 0,
                    capabilities.iotSupport || 0,
                    capabilities.byodSupport || 0
                ]
            };
        });
        
        Highcharts.chart(container, {
            chart: { polar: true, height: 400 },
            title: { text: null },
            pane: { size: '80%' },
            xAxis: {
                categories: categories,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max: 100
            },
            series: series,
            credits: { enabled: false }
        });
    }
    
    createRiskChart() {
        const container = document.getElementById('security-risk-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const selectedData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const riskReduction = 100 - vendor.metrics.securityScore;
            return {
                name: vendor.shortName,
                y: riskReduction,
                color: vendor.color
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'column', height: 400 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: {
                title: { text: 'Risk Reduction (%)' },
                labels: {
                    formatter: function() {
                        return this.value + '%';
                    }
                }
            },
            series: [{
                name: 'Risk Reduction',
                data: selectedData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.y + '%';
                    }
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    createBreachCostChart() {
        const container = document.getElementById('security-breach-cost-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const baseCost = this.riskFactors['breach-cost'].averageCost;
        
        const series = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const riskMultiplier = (100 - vendor.metrics.securityScore) / 100;
            return {
                name: vendor.shortName,
                color: vendor.color,
                data: [
                    baseCost,
                    baseCost * (1 - riskMultiplier * 0.3),
                    baseCost * (1 - riskMultiplier * 0.5),
                    baseCost * (1 - riskMultiplier * 0.7)
                ]
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'line', height: 400 },
            title: { text: null },
            xAxis: {
                categories: ['Baseline', 'Year 1', 'Year 2', 'Year 3+']
            },
            yAxis: {
                title: { text: 'Potential Breach Cost ($)' },
                labels: {
                    formatter: function() {
                        return '$' + Highcharts.numberFormat(this.value / 1000000, 1) + 'M';
                    }
                }
            },
            series: series,
            credits: { enabled: false }
        });
    }
    
    createVendorCharts() {
        this.createVendorMatrix();
        this.createMarketShareChart();
        this.createGrowthChart();
    }
    
    createVendorMatrix() {
        const container = document.getElementById('vendor-comparison-matrix');
        if (!container) return;
        
        const metrics = [
            { key: 'tco3Year', label: '3-Year TCO', format: 'currency' },
            { key: 'roi3Year', label: 'ROI (%)', format: 'percentage' },
            { key: 'implementationDays', label: 'Implementation', format: 'days' },
            { key: 'fteRequired', label: 'FTE Required', format: 'number' },
            { key: 'securityScore', label: 'Security Score', format: 'percentage' },
            { key: 'complianceScore', label: 'Compliance', format: 'percentage' }
        ];
        
        let tableHTML = `
            <table class="vendor-matrix-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        ${this.selectedVendors.map(vendorId => 
                            `<th>
                                <img src="${this.vendorData[vendorId].logo}" alt="${this.vendorData[vendorId].shortName}" class="vendor-logo">
                                ${this.vendorData[vendorId].shortName}
                            </th>`
                        ).join('')}
                    </tr>
                </thead>
                <tbody>
        `;
        
        metrics.forEach(metric => {
            tableHTML += `<tr><td>${metric.label}</td>`;
            this.selectedVendors.forEach(vendorId => {
                const vendor = this.vendorData[vendorId];
                let value;
                
                if (metric.key.includes('.')) {
                    const keys = metric.key.split('.');
                    value = vendor[keys[0]][keys[1]];
                } else if (vendor.costs && vendor.costs[metric.key] !== undefined) {
                    value = vendor.costs[metric.key];
                } else if (vendor.metrics && vendor.metrics[metric.key] !== undefined) {
                    value = vendor.metrics[metric.key];
                } else {
                    value = 0;
                }
                
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
                
                tableHTML += `<td>${formattedValue}</td>`;
            });
            tableHTML += `</tr>`;
        });
        
        tableHTML += `</tbody></table>`;
        container.innerHTML = tableHTML;
    }
    
    createMarketShareChart() {
        const container = document.getElementById('vendors-market-share-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const marketData = [
            { name: 'Cisco', y: 35, color: '#00bceb' },
            { name: 'Aruba', y: 18, color: '#ff6900' },
            { name: 'Forescout', y: 15, color: '#7a2a90' },
            { name: 'Portnox', y: 12, color: '#1a5a96' },
            { name: 'Microsoft', y: 10, color: '#00bcf2' },
            { name: 'Others', y: 10, color: '#cccccc' }
        ];
        
        Highcharts.chart(container, {
            chart: { type: 'pie', height: 400 },
            title: { text: null },
            series: [{
                name: 'Market Share',
                data: marketData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.point.name + ': ' + this.y + '%';
                    }
                }
            }],
            credits: { enabled: false }
        });
    }
    
    createGrowthChart() {
        const container = document.getElementById('vendors-growth-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const growthData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const growth = vendorId === 'portnox' ? 85 : 
                          vendorId === 'cisco' ? -5 :
                          vendorId === 'aruba' ? 8 :
                          vendorId === 'forescout' ? -12 : 15;
            return {
                name: vendor.shortName,
                y: growth,
                color: vendor.color
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'column', height: 400 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: {
                title: { text: 'YoY Growth (%)' },
                labels: {
                    formatter: function() {
                        return this.value + '%';
                    }
                }
            },
            series: [{
                name: 'Growth Rate',
                data: growthData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.y + '%';
                    }
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    createComplianceCharts() {
        this.createComplianceFrameworkChart();
        this.createNISTChart();
        this.createIndustryChart();
    }
    
    createComplianceFrameworkChart() {
        const container = document.getElementById('compliance-framework-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const frameworks = ['NIST CSF', 'PCI DSS', 'HIPAA', 'GDPR', 'ISO 27001', 'SOX', 'FedRAMP'];
        
        const series = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const compliance = vendor.compliance || {};
            return {
                name: vendor.shortName,
                color: vendor.color,
                data: [
                    compliance.nistCsf || 0,
                    compliance.pciDss || 0,
                    compliance.hipaa || 0,
                    compliance.gdpr || 0,
                    compliance.iso27001 || 0,
                    compliance.sox || 0,
                    compliance.fedramp || 0
                ]
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'column', height: 400 },
            title: { text: null },
            xAxis: { categories: frameworks },
            yAxis: {
                title: { text: 'Compliance Score (%)' },
                labels: {
                    formatter: function() {
                        return this.value + '%';
                    }
                }
            },
            series: series,
            credits: { enabled: false }
        });
    }
    
    createNISTChart() {
        const container = document.getElementById('compliance-nist-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const nistCategories = ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'];
        
        const portnoxData = [92, 96, 95, 94, 90];
        const industryAvg = [75, 78, 72, 70, 68];
        
        Highcharts.chart(container, {
            chart: { polar: true, height: 400 },
            title: { text: null },
            pane: { size: '80%' },
            xAxis: {
                categories: nistCategories,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max: 100
            },
            series: [{
                name: 'Portnox',
                data: portnoxData,
                color: '#1a5a96'
            }, {
                name: 'Industry Average',
                data: industryAvg,
                color: '#cccccc'
            }],
            credits: { enabled: false }
        });
    }
    
    createIndustryChart() {
        const container = document.getElementById('compliance-industry-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const industries = Object.keys(this.industryData);
        const complianceScores = industries.map(industry => {
            const data = this.industryData[industry];
            return {
                name: data.name,
                y: Math.round(85 + (data.complianceWeight * 10))
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'bar', height: 400 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: {
                title: { text: 'Compliance Readiness (%)' },
                labels: {
                    formatter: function() {
                        return this.value + '%';
                    }
                }
            },
            series: [{
                name: 'Compliance Score',
                data: complianceScores,
                colorByPoint: true
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    createInsuranceCharts() {
        this.createInsuranceImpactChart();
        this.createInsuranceCalculatorChart();
        this.createInsuranceTimelineChart();
    }
    
    createInsuranceImpactChart() {
        const container = document.getElementById('insurance-impact-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const impactData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const reduction = Math.round((vendor.metrics.securityScore - 60) / 40 * 30);
            return {
                name: vendor.shortName,
                y: Math.max(5, reduction),
                color: vendor.color
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'column', height: 400 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: {
                title: { text: 'Premium Reduction (%)' },
                labels: {
                    formatter: function() {
                        return this.value + '%';
                    }
                }
            },
            series: [{
                name: 'Premium Reduction',
                data: impactData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.y + '%';
                    }
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    createInsuranceCalculatorChart() {
        const container = document.getElementById('insurance-calculator-chart');
        if (!container) return;
        
        const portnoxData = this.vendorData.portnox;
        const basePremium = 50000;
        const reduction = Math.round((portnoxData.metrics.securityScore - 60) / 40 * 30);
        const newPremium = basePremium * (1 - reduction / 100);
        const savings = basePremium - newPremium;
        
        container.innerHTML = `
            <div class="insurance-calculator">
                <div class="calc-section">
                    <h4>Current Premium Estimate</h4>
                    <div class="calc-value">$${basePremium.toLocaleString()}</div>
                </div>
                <div class="calc-section">
                    <h4>With Portnox Cloud</h4>
                    <div class="calc-value highlight-positive">$${newPremium.toLocaleString()}</div>
                </div>
                <div class="calc-section">
                    <h4>Annual Savings</h4>
                    <div class="calc-value highlight-positive">$${savings.toLocaleString()}</div>
                </div>
                <div class="calc-section">
                    <h4>Reduction Percentage</h4>
                    <div class="calc-value highlight-positive">${reduction}%</div>
                </div>
            </div>
        `;
    }
    
    createInsuranceTimelineChart() {
        const container = document.getElementById('insurance-timeline-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const timeline = ['Baseline', '3 Months', '6 Months', '1 Year', '2 Years', '3 Years'];
        const riskScore = [40, 60, 75, 85, 90, 95];
        
        Highcharts.chart(container, {
            chart: { type: 'area', height: 400 },
            title: { text: null },
            xAxis: { categories: timeline },
            yAxis: {
                title: { text: 'Risk Score Improvement' },
                labels: {
                    formatter: function() {
                        return this.value + '%';
                    }
                }
            },
            series: [{
                name: 'Security Posture',
                data: riskScore,
                color: '#1a5a96',
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, 'rgba(26, 90, 150, 0.3)'],
                        [1, 'rgba(26, 90, 150, 0.05)']
                    ]
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    initializeParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-header', {
                particles: {
                    number: { value: 50 },
                    color: { value: '#ffffff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.3, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#ffffff',
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true
                    }
                },
                interactivity: {
                    events: {
                        onhover: { enable: true, mode: 'bubble' },
                        resize: true
                    }
                }
            });
        }
    }
    
    startAnimations() {
        // Animate KPI values
        const kpiValues = document.querySelectorAll('[data-animate]');
        kpiValues.forEach(element => {
            const targetValue = parseInt(element.getAttribute('data-animate'));
            this.animateValue(element, 0, targetValue, 2000);
        });
        
        // Add staggered animations to cards
        const cards = document.querySelectorAll('.kpi-card, .chart-container');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('slide-up');
            }, index * 200);
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
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (!window.comprehensiveExecutiveDashboard) {
            window.comprehensiveExecutiveDashboard = new ComprehensiveExecutiveDashboard();
            
            const executiveView = document.querySelector('#executive-view');
            if (executiveView) {
                window.comprehensiveExecutiveDashboard.init();
            }
        }
    }, 1000);
});

// Export for global access
window.ComprehensiveExecutiveDashboard = ComprehensiveExecutiveDashboard;
EOF

    print_status "Comprehensive Executive Dashboard created"
}

# Update index.html with enhanced structure
update_index_html() {
    print_info "Updating index.html with enhanced structure..."
    
    cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zero Trust Total Cost Analyzer | Portnox</title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="./img/vendors/portnox-icon.png">

    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Chart Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/highcharts@11.1.0/highcharts.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/highcharts@11.1.0/highcharts-more.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/highcharts@11.1.0/modules/exporting.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/d3@7.8.5/dist/d3.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.44.0/dist/apexcharts.min.js"></script>

    <!-- Particle.js -->
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>

    <!-- Enhanced CSS -->
    <link rel="stylesheet" href="./css/enhanced-executive-dashboard.css">
    <link rel="stylesheet" href="./css/zero-trust-enhanced.css">
    <link rel="stylesheet" href="./css/modern-theme.css">
</head>
<body>
    <!-- Enhanced Header with Particles -->
    <header class="zero-trust-header">
        <div id="particles-header"></div>
        <div class="header-content">
            <div class="header-branding">
                <div class="portnox-logo">
                    <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="logo-image">
                </div>
                <div class="header-titles">
                    <h1 class="main-title">Zero Trust Total Cost Analyzer</h1>
                    <p class="sub-title">Executive Intelligence & Competitive Analysis Platform</p>
                </div>
            </div>
            <div class="header-actions">
                <button id="calculate-btn" class="header-btn primary">
                    <i class="fas fa-calculator"></i>
                    <span>Calculate</span>
                </button>
                <button id="export-btn" class="header-btn secondary">
                    <i class="fas fa-download"></i>
                    <span>Export</span>
                </button>
                <button id="refresh-btn" class="header-btn utility">
                    <i class="fas fa-sync-alt"></i>
                </button>
                <button id="dark-mode-toggle" class="header-btn utility">
                    <i class="fas fa-moon"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- Main Container -->
    <div class="main-container">
        <!-- Main Content Area -->
        <main class="content-area">
            <!-- View Container -->
            <div class="view-container">
                <!-- Executive View -->
                <div id="executive-view" class="view-panel active" data-view="executive">
                    <div class="view-content">
                        <!-- Dynamic content will be loaded here -->
                    </div>
                </div>

                <!-- Financial View -->
                <div id="financial-view" class="view-panel" data-view="financial">
                    <div class="view-content">
                        <!-- Dynamic content will be loaded here -->
                    </div>
                </div>

                <!-- Security View -->
                <div id="security-view" class="view-panel" data-view="security">
                    <div class="view-content">
                        <!-- Dynamic content will be loaded here -->
                    </div>
                </div>

                <!-- Technical View -->
                <div id="technical-view" class="view-panel" data-view="technical">
                    <div class="view-content">
                        <!-- Dynamic content will be loaded here -->
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Particles Background -->
    <div id="particles-js"></div>

    <!-- Loading Overlay -->
    <div id="loading-overlay" class="loading-overlay" style="display: none;">
        <div class="loading-spinner">
            <div class="spinner"></div>
            <div class="loading-text">Loading Executive Intelligence...</div>
        </div>
    </div>

    <!-- Core Scripts -->
    <script src="./js/views/comprehensive-executive-dashboard.js"></script>
    
    <!-- Initialize Particles -->
    <script>
        // Initialize background particles
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 40 },
                    color: { value: '#ffffff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.1, random: true },
                    size: { value: 2, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#ffffff',
                        opacity: 0.05,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: 'none',
                        random: true
                    }
                }
            });
        }
    </script>
</body>
</html>
EOF

    print_status "Index.html updated with enhanced structure"
}

# Create vendor logo placeholders
create_vendor_assets() {
    print_info "Creating vendor asset directories and placeholders..."
    
    mkdir -p img/vendors
    
    # Create placeholder images for vendors (you'll need to replace with actual logos)
    vendors=("portnox" "cisco" "aruba" "forescout" "fortinet" "juniper" "arista" "microsoft" "securew2" "foxpass")
    
    for vendor in "${vendors[@]}"; do
        if [ ! -f "img/vendors/${vendor}-logo.png" ]; then
            # Create a simple colored rectangle as placeholder
            touch "img/vendors/${vendor}-logo.png"
            print_warning "Placeholder created for img/vendors/${vendor}-logo.png - replace with actual logo"
        fi
    done
    
    print_status "Vendor assets directory structure created"
}

# Git operations
perform_git_operations() {
    print_info "Performing Git operations..."
    
    # Check if git repo exists
    if [ ! -d ".git" ]; then
        git init
        print_status "Git repository initialized"
    fi
    
    # Add all files
    git add .
    
    # Create comprehensive commit
    git commit -m "🚀 Comprehensive Portnox TCO Analyzer Update

✨ Enhanced Features:
- Executive Intelligence Center with advanced KPIs
- Comprehensive vendor coverage (10+ NAC solutions)
- Interactive cost calculators with device sliders
- Multi-year TCO and ROI projections (1-5 years)
- Advanced security and compliance analytics
- Gradient UI with particle effects
- State-of-the-art Highcharts and D3.js visualizations

📊 New Analytics:
- Per device cost analysis
- FTE requirement comparisons
- Risk assessment and cyber insurance impact
- Regulatory compliance coverage (NIST, PCI, HIPAA, GDPR)
- Market share and growth trajectory analysis

🎨 UI Enhancements:
- Gradient background animations
- Smaller, cleaner vendor buttons
- Enhanced KPI cards with animations
- Particle effects in header
- Responsive design improvements
- Executive-level insights and recommendations

🔧 Technical Improvements:
- Comprehensive vendor data models
- Advanced chart animations and interactions
- Multi-tab navigation with sub-panels
- Real-time cost calculations
- Interactive compliance frameworks
- Export and reporting capabilities"
    
    print_status "Git commit completed with comprehensive update message"
    
    # Push if remote exists
    if git remote get-url origin > /dev/null 2>&1; then
        print_info "Pushing to remote repository..."
        git push origin main || git push origin master
        print_status "Changes pushed to remote repository"
    else
        print_warning "No remote repository configured. Add remote with:"
        echo "git remote add origin <your-repo-url>"
    fi
}

# Main execution flow
main() {
    echo -e "${PURPLE}Starting comprehensive Portnox TCO Analyzer update...${NC}"
    
    # Create backup
    create_backup
    
    # Update all components
    update_enhanced_css
    update_executive_dashboard
    update_index_html
    create_vendor_assets
    
    # Git operations
    perform_git_operations
    
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}🎉 Update Complete!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}✅ Enhanced UI with gradient backgrounds${NC}"
    echo -e "${GREEN}✅ Comprehensive executive dashboard${NC}"
    echo -e "${GREEN}✅ Advanced vendor comparison (10+ vendors)${NC}"
    echo -e "${GREEN}✅ Interactive cost calculators${NC}"
    echo -e "${GREEN}✅ Multi-year projections (1-5 years)${NC}"
    echo -e "${GREEN}✅ Security and compliance analytics${NC}"
    echo -e "${GREEN}✅ State-of-the-art charts and visualizations${NC}"
    echo -e "${GREEN}✅ Particle effects and animations${NC}"
    echo -e "${GREEN}✅ Executive-level insights and KPIs${NC}"
    echo -e "${GREEN}✅ Git repository updated${NC}"
    echo ""
    echo -e "${BLUE}📁 Backup created in: $BACKUP_DIR${NC}"
    echo -e "${BLUE}🌐 Open index.html in your browser to see the updates${NC}"
    echo -e "${BLUE}📊 Features comprehensive analytics for all stakeholders${NC}"
    echo ""
    echo -e "${YELLOW}📝 Next Steps:${NC}"
    echo -e "${YELLOW}- Replace placeholder vendor logos with actual images${NC}"
    echo -e "${YELLOW}- Customize industry-specific compliance requirements${NC}"
    echo -e "${YELLOW}- Configure real-time data sources if needed${NC}"
    echo -e "${YELLOW}- Test all interactive features and charts${NC}"
    echo -e "${YELLOW}- Deploy to production environment${NC}"
}

# Run the script
main "$@"
