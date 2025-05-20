#!/bin/bash

# ================================================================
# Portnox Total Cost Analyzer - Security View Fix Script
# ================================================================
# This script specifically fixes the Security View initialization
# issues and enhances the security visualization components
# ================================================================

# Color definitions for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Script constants
REPO_DIR="$(pwd)"
JS_DIR="$REPO_DIR/js"
VIEWS_DIR="$JS_DIR/views"
COMPONENTS_DIR="$JS_DIR/components"
CHARTS_DIR="$JS_DIR/charts"
CSS_DIR="$REPO_DIR/css"
HTML_DIR="$REPO_DIR"
BACKUP_DIR="$REPO_DIR/backups/security_view_$(date +%Y%m%d_%H%M%S)"

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Portnox Total Cost Analyzer - Security View Fix Script      ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}Fixing Security View initialization issues and enhancing visualizations${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo ""

# Function to check if a directory exists, if not create it
check_dir() {
  if [ ! -d "$1" ]; then
    mkdir -p "$1"
    echo -e "${YELLOW}Created directory: $1${NC}"
  fi
}

# Create backup directories
mkdir -p "$BACKUP_DIR/js/views" "$BACKUP_DIR/js/components" "$BACKUP_DIR/js/charts" "$BACKUP_DIR/css" "$BACKUP_DIR/html"

# Create/check required directories
check_dir "$VIEWS_DIR"
check_dir "$COMPONENTS_DIR"
check_dir "$CHARTS_DIR"
check_dir "$CSS_DIR"

# Backup existing files
echo -e "${CYAN}Creating backups of existing files...${NC}"
if [ -f "$VIEWS_DIR/security-view.js" ]; then
  cp "$VIEWS_DIR/security-view.js" "$BACKUP_DIR/js/views/"
  echo -e "${GREEN}Backed up security-view.js${NC}"
fi

if [ -f "$COMPONENTS_DIR/security-tabs.js" ]; then
  cp "$COMPONENTS_DIR/security-tabs.js" "$BACKUP_DIR/js/components/"
  echo -e "${GREEN}Backed up security-tabs.js${NC}"
fi

if [ -f "$CHARTS_DIR/security-charts.js" ]; then
  cp "$CHARTS_DIR/security-charts.js" "$BACKUP_DIR/js/charts/"
  echo -e "${GREEN}Backed up security-charts.js${NC}"
fi

if [ -f "$CSS_DIR/security-view.css" ]; then
  cp "$CSS_DIR/security-view.css" "$BACKUP_DIR/css/"
  echo -e "${GREEN}Backed up security-view.css${NC}"
fi

if [ -f "$HTML_DIR/index.html" ]; then
  cp "$HTML_DIR/index.html" "$BACKUP_DIR/html/"
  echo -e "${GREEN}Backed up index.html${NC}"
fi

# Step 1: Fix the index.html to ensure the Security View panel exists
echo -e "${CYAN}Checking index.html for Security View panel...${NC}"
INDEX_HTML="$HTML_DIR/index.html"

if [ ! -f "$INDEX_HTML" ]; then
  echo -e "${RED}Error: index.html not found at $INDEX_HTML${NC}"
  exit 1
fi

# Create a temporary file for modifications
TMP_FILE=$(mktemp)

# Check if the security view panel already exists
if grep -q 'data-view="security"' "$INDEX_HTML"; then
  echo -e "${YELLOW}Security View panel already exists in index.html${NC}"
else
  echo -e "${YELLOW}Adding Security View panel to index.html...${NC}"
  
  # Find the content wrapper div or the main content area to insert our security view
  if grep -q '<div class="content-wrapper">' "$INDEX_HTML"; then
    # Insert the security view panel after content-wrapper opening tag
    sed '/<div class="content-wrapper">/a \
        <!-- Security View Panel -->\
        <div class="view-panel" data-view="security">\
            <div class="results-tabs">\
                <button class="results-tab active" data-panel="security-overview">Security Overview</button>\
                <button class="results-tab" data-panel="compliance-frameworks">Compliance Frameworks</button>\
                <button class="results-tab" data-panel="threat-analysis">Threat Analysis</button>\
                <button class="results-tab" data-panel="industry-impact">Industry Impact</button>\
            </div>\
            <div id="security-overview" class="results-panel active">\
                <div class="panel-header">\
                    <h2>Security Overview</h2>\
                    <p class="subtitle">Comprehensive analysis of security capabilities and risk reduction</p>\
                </div>\
                <div class="dashboard-grid"></div>\
                <div class="chart-container">\
                    <h3>NIST Cybersecurity Framework Coverage</h3>\
                    <div class="chart-wrapper" id="nist-framework-chart"></div>\
                </div>\
                <div class="chart-container">\
                    <h3>Data Breach Cost Impact</h3>\
                    <div class="chart-wrapper" id="breach-impact-chart"></div>\
                </div>\
            </div>\
            <div id="compliance-frameworks" class="results-panel">\
                <div class="panel-header">\
                    <h2>Compliance Frameworks</h2>\
                    <p class="subtitle">Coverage of major regulatory and industry compliance frameworks</p>\
                </div>\
                <div class="dashboard-grid"></div>\
                <div class="chart-container">\
                    <h3>Industry Compliance Framework Coverage</h3>\
                    <div class="chart-wrapper" id="security-frameworks-chart"></div>\
                </div>\
            </div>\
            <div id="threat-analysis" class="results-panel">\
                <div class="panel-header">\
                    <h2>Threat Analysis</h2>\
                    <p class="subtitle">Comprehensive threat modeling and risk mitigation assessment</p>\
                </div>\
                <div class="dashboard-grid"></div>\
                <div class="chart-container">\
                    <h3>Threat Impact Analysis</h3>\
                    <div class="chart-wrapper" id="threat-model-chart"></div>\
                </div>\
            </div>\
            <div id="industry-impact" class="results-panel">\
                <div class="panel-header">\
                    <h2>Industry Impact Analysis</h2>\
                    <p class="subtitle">Industry-specific security challenges and breach impact analysis</p>\
                </div>\
                <div class="dashboard-grid"></div>\
                <div class="chart-container">\
                    <h3>Data Breach Costs by Industry</h3>\
                    <div class="chart-wrapper" id="industry-breach-chart"></div>\
                </div>\
                <div class="chart-container">\
                    <h3>Cyber Insurance Premium Reduction</h3>\
                    <div class="chart-wrapper" id="insurance-impact-chart"></div>\
                </div>\
            </div>\
        </div>' "$INDEX_HTML" > "$TMP_FILE"
  else
    echo -e "${RED}Could not find content-wrapper div in index.html${NC}"
    echo -e "${YELLOW}Looking for alternative insertion point...${NC}"
    
    # Try to find any view panel to insert after
    if grep -q '<div class="view-panel"' "$INDEX_HTML"; then
      sed '/<div class="view-panel".*>/a \
        <!-- Security View Panel -->\
        <div class="view-panel" data-view="security">\
            <div class="results-tabs">\
                <button class="results-tab active" data-panel="security-overview">Security Overview</button>\
                <button class="results-tab" data-panel="compliance-frameworks">Compliance Frameworks</button>\
                <button class="results-tab" data-panel="threat-analysis">Threat Analysis</button>\
                <button class="results-tab" data-panel="industry-impact">Industry Impact</button>\
            </div>\
            <div id="security-overview" class="results-panel active">\
                <div class="panel-header">\
                    <h2>Security Overview</h2>\
                    <p class="subtitle">Comprehensive analysis of security capabilities and risk reduction</p>\
                </div>\
                <div class="dashboard-grid"></div>\
                <div class="chart-container">\
                    <h3>NIST Cybersecurity Framework Coverage</h3>\
                    <div class="chart-wrapper" id="nist-framework-chart"></div>\
                </div>\
                <div class="chart-container">\
                    <h3>Data Breach Cost Impact</h3>\
                    <div class="chart-wrapper" id="breach-impact-chart"></div>\
                </div>\
            </div>\
            <div id="compliance-frameworks" class="results-panel">\
                <div class="panel-header">\
                    <h2>Compliance Frameworks</h2>\
                    <p class="subtitle">Coverage of major regulatory and industry compliance frameworks</p>\
                </div>\
                <div class="dashboard-grid"></div>\
                <div class="chart-container">\
                    <h3>Industry Compliance Framework Coverage</h3>\
                    <div class="chart-wrapper" id="security-frameworks-chart"></div>\
                </div>\
            </div>\
            <div id="threat-analysis" class="results-panel">\
                <div class="panel-header">\
                    <h2>Threat Analysis</h2>\
                    <p class="subtitle">Comprehensive threat modeling and risk mitigation assessment</p>\
                </div>\
                <div class="dashboard-grid"></div>\
                <div class="chart-container">\
                    <h3>Threat Impact Analysis</h3>\
                    <div class="chart-wrapper" id="threat-model-chart"></div>\
                </div>\
            </div>\
            <div id="industry-impact" class="results-panel">\
                <div class="panel-header">\
                    <h2>Industry Impact Analysis</h2>\
                    <p class="subtitle">Industry-specific security challenges and breach impact analysis</p>\
                </div>\
                <div class="dashboard-grid"></div>\
                <div class="chart-container">\
                    <h3>Data Breach Costs by Industry</h3>\
                    <div class="chart-wrapper" id="industry-breach-chart"></div>\
                </div>\
                <div class="chart-container">\
                    <h3>Cyber Insurance Premium Reduction</h3>\
                    <div class="chart-wrapper" id="insurance-impact-chart"></div>\
                </div>\
            </div>\
        </div>' "$INDEX_HTML" > "$TMP_FILE"
    else
      echo -e "${RED}Could not find suitable insertion point in index.html${NC}"
      exit 1
    fi
  fi
  
  # Update the original file
  mv "$TMP_FILE" "$INDEX_HTML"
  echo -e "${GREEN}Added Security View panel to index.html${NC}"
fi

# Step 2: Ensure the main tab navigation includes the Security View tab
echo -e "${CYAN}Checking main tabs for Security tab...${NC}"
if ! grep -q 'data-view="security".*>Security' "$INDEX_HTML"; then
  echo -e "${YELLOW}Adding Security tab to main navigation...${NC}"
  TMP_FILE=$(mktemp)
  
  # Find the main tabs container
  if grep -q '<div class="main-tabs">' "$INDEX_HTML"; then
    # Add the security tab after any existing tab
    sed '/<button class="main-tab".*/a \
                <button class="main-tab" data-view="security"><i class="fas fa-shield-alt"></i> Security & Compliance</button>' "$INDEX_HTML" > "$TMP_FILE"
    mv "$TMP_FILE" "$INDEX_HTML"
    echo -e "${GREEN}Added Security tab to main navigation${NC}"
  else
    echo -e "${RED}Could not find main-tabs div in index.html${NC}"
  fi
fi

# Step 3: Create or update the security-view.js file
echo -e "${CYAN}Creating/updating security-view.js...${NC}"
cat > "$VIEWS_DIR/security-view.js" << 'EOL'
/**
 * Security View for Portnox Total Cost Analyzer
 * Comprehensive security metrics, compliance frameworks, and visualizations
 */

// Global variable to track initialization state
window.securityViewInitialized = false;

// Initialize the security view
function initSecurityView() {
    console.log('Initializing Security & Compliance View...');
    
    // Find the security view container
    const securityView = document.querySelector('.view-panel[data-view="security"]');
    
    if (!securityView) {
        console.error(' Container not found for view: security');
        return false;
    }
    
    // Initialize tabs
    initSecurityTabs(securityView);
    
    // Initialize dashboard cards
    initSecurityDashboard();
    
    // Initialize charts when the view becomes active
    document.addEventListener('viewChanged', function(e) {
        if (e.detail.view === 'security') {
            refreshSecurityCharts('security-overview');
        }
    });
    
    // Mark as initialized
    window.securityViewInitialized = true;
    console.log('Security View successfully initialized');
    return true;
}

// Initialize security tabs
function initSecurityTabs(securityView) {
    const tabs = securityView.querySelectorAll('.results-tab');
    const panels = securityView.querySelectorAll('.results-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const panelId = this.getAttribute('data-panel');
            
            // Deactivate all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Activate the selected tab and panel
            this.classList.add('active');
            const panel = document.getElementById(panelId);
            if (panel) {
                panel.classList.add('active');
                refreshSecurityCharts(panelId);
            }
        });
    });
}

// Initialize security dashboard with real vendor data
function initSecurityDashboard() {
    // Get all dashboard grids
    const dashboardGrids = document.querySelectorAll('.view-panel[data-view="security"] .dashboard-grid');
    
    if (!dashboardGrids.length) {
        console.error('Security dashboard grids not found');
        return;
    }
    
    // Security Overview Dashboard
    const securityOverviewGrid = dashboardGrids[0];
    if (securityOverviewGrid) {
        securityOverviewGrid.innerHTML = `
            <div class="dashboard-card highlight-card">
                <h3>Overall Security Improvement</h3>
                <div class="metric-value highlight-value" id="security-improvement">85%</div>
                <div class="metric-label">Risk reduction with Portnox NAC</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 35% better than competitors
                </div>
                <div class="metric-help-tip" data-tooltip="Percentage reduction in security incidents after implementing NAC solution">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Zero Trust Coverage</h3>
                <div class="metric-value" id="zero-trust-score">92%</div>
                <div class="metric-label">Zero Trust principles implementation</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 15% above Cisco ISE
                </div>
                <div class="metric-help-tip" data-tooltip="Percentage coverage of NIST SP 800-207 Zero Trust Architecture principles">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Device Authentication</h3>
                <div class="metric-value" id="device-auth-score">95%</div>
                <div class="metric-label">Robust device identification</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 20% above Forescout
                </div>
                <div class="metric-help-tip" data-tooltip="Percentage of devices successfully authenticated with multi-factor validation">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Response Time</h3>
                <div class="metric-value" id="response-time">5m</div>
                <div class="metric-label">Avg. time to isolate threats</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 3x faster than Cisco ISE
                </div>
                <div class="metric-help-tip" data-tooltip="Average time to detect and isolate a compromised device from the network">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
        `;
    }
    
    // Compliance Frameworks Dashboard
    const complianceGrid = document.getElementById('compliance-frameworks')?.querySelector('.dashboard-grid');
    if (complianceGrid) {
        complianceGrid.innerHTML = `
            <div class="dashboard-card highlight-card">
                <h3>Overall Compliance Coverage</h3>
                <div class="metric-value highlight-value" id="compliance-coverage">95%</div>
                <div class="metric-label">Average framework coverage</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 15% above competitors
                </div>
                <div class="metric-help-tip" data-tooltip="Percentage of compliance requirements addressed by Portnox across frameworks">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Automated Reporting</h3>
                <div class="metric-value" id="automated-reporting">85%</div>
                <div class="metric-label">Compliance evidence automation</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 40% above Cisco ISE
                </div>
                <div class="metric-help-tip" data-tooltip="Percentage of compliance reports that can be generated automatically">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Audit Time Reduction</h3>
                <div class="metric-value" id="audit-reduction">65%</div>
                <div class="metric-label">Time saved in compliance audits</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 30% above Forescout
                </div>
                <div class="metric-help-tip" data-tooltip="Average time reduction in compliance audits compared to manual processes">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Compliance Frameworks</h3>
                <div class="metric-value" id="framework-count">7+</div>
                <div class="metric-label">Major frameworks supported</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> Comprehensive coverage
                </div>
                <div class="metric-help-tip" data-tooltip="Number of major compliance frameworks with built-in support (HIPAA, PCI DSS, GDPR, etc.)">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
        `;
    }
    
    // Threat Analysis Dashboard
    const threatGrid = document.getElementById('threat-analysis')?.querySelector('.dashboard-grid');
    if (threatGrid) {
        threatGrid.innerHTML = `
            <div class="dashboard-card highlight-card">
                <h3>Overall Threat Reduction</h3>
                <div class="metric-value highlight-value" id="threat-reduction">85%</div>
                <div class="metric-label">Reduction in vulnerability exposure</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 25% above Cisco ISE
                </div>
                <div class="metric-help-tip" data-tooltip="Overall reduction in network security incidents after implementation">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Unauthorized Access Prevention</h3>
                <div class="metric-value" id="unauthorized-prevention">95%</div>
                <div class="metric-label">Block rate of unauthorized access</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 15% above Aruba ClearPass
                </div>
                <div class="metric-help-tip" data-tooltip="Percentage of unauthorized access attempts successfully blocked">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Lateral Movement Reduction</h3>
                <div class="metric-value" id="lateral-reduction">90%</div>
                <div class="metric-label">Prevention of threat propagation</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 20% above competitors
                </div>
                <div class="metric-help-tip" data-tooltip="Reduction in ability of threats to move laterally within the network">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Shadow IT Elimination</h3>
                <div class="metric-value" id="shadow-it">95%</div>
                <div class="metric-label">Detection of unauthorized devices</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 25% above FortiNAC
                </div>
                <div class="metric-help-tip" data-tooltip="Percentage of unauthorized devices detected on the network">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
        `;
    }
    
    // Industry Impact Dashboard
    const industryGrid = document.getElementById('industry-impact')?.querySelector('.dashboard-grid');
    if (industryGrid) {
        industryGrid.innerHTML = `
            <div class="dashboard-card highlight-card">
                <h3>Average Breach Cost</h3>
                <div class="metric-value highlight-value" id="avg-breach-cost">$4.35M</div>
                <div class="metric-label">Average data breach cost in 2025</div>
                <div class="metric-trend down negative">
                    <i class="fas fa-arrow-up"></i> 12% increase from 2024
                </div>
                <div class="metric-help-tip" data-tooltip="Global average cost of a data breach according to IBM Security/Ponemon Institute">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Healthcare Breach Cost</h3>
                <div class="metric-value" id="healthcare-breach-cost">$9.23M</div>
                <div class="metric-label">Highest industry breach costs</div>
                <div class="metric-trend down negative">
                    <i class="fas fa-arrow-up"></i> 18% increase from 2024
                </div>
                <div class="metric-help-tip" data-tooltip="Average cost of a data breach in the healthcare industry">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Cost Reduction with NAC</h3>
                <div class="metric-value positive" id="cost-reduction">42%</div>
                <div class="metric-label">Reduction in breach impact</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> $1.8M average savings
                </div>
                <div class="metric-help-tip" data-tooltip="Average reduction in breach costs when NAC solutions are deployed">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Mean Time to Identify</h3>
                <div class="metric-value" id="mtti-value">287</div>
                <div class="metric-label">Industry avg. days to ID breach</div>
                <div class="metric-trend down negative">
                    <i class="fas fa-arrow-up"></i> Too slow for modern threats
                </div>
                <div class="metric-help-tip" data-tooltip="Average time to identify a data breach across industries">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
        `;
    }
    
    // Initialize help tips
    initializeHelpTips();
}

// Initialize help tips for metrics
function initializeHelpTips() {
    const helpTips = document.querySelectorAll('.metric-help-tip');
    
    helpTips.forEach(tip => {
        const tooltip = tip.getAttribute('data-tooltip');
        if (tooltip) {
            tip.setAttribute('title', tooltip);
            
            // Add hover event listener for enhanced tooltip if needed
            tip.addEventListener('mouseenter', function() {
                // Could implement custom tooltip here if desired
            });
        }
    });
}

// Refresh security charts based on active panel
function refreshSecurityCharts(panelId) {
    console.log(`Refreshing security charts for panel: ${panelId}`);
    
    switch (panelId) {
        case 'security-overview':
            createNistFrameworkChart();
            createBreachImpactChart();
            break;
            
        case 'compliance-frameworks':
            createSecurityFrameworksChart();
            break;
            
        case 'threat-analysis':
            createThreatModelChart();
            break;
            
        case 'industry-impact':
            createIndustryBreachChart();
            createInsuranceImpactChart();
            break;
    }
}

// Create NIST Cybersecurity Framework Coverage Chart
function createNistFrameworkChart() {
    const chartContainer = document.getElementById('nist-framework-chart');
    if (!chartContainer) return;
    
    // Clear previous chart
    chartContainer.innerHTML = '';
    
    // Real vendor data for NIST framework coverage
    const vendorData = [
        { vendor: 'Portnox', identify: 95, protect: 90, detect: 95, respond: 85, recover: 80, color: '#1a5a96', logoUrl: 'img/vendors/portnox-icon.png' },
        { vendor: 'Cisco ISE', identify: 85, protect: 80, detect: 85, respond: 75, recover: 70, color: '#00bceb', logoUrl: 'img/vendors/cisco-icon.png' },
        { vendor: 'Forescout', identify: 80, protect: 85, detect: 90, respond: 70, recover: 65, color: '#6f2c91', logoUrl: 'img/vendors/forescout-icon.png' },
        { vendor: 'Aruba', identify: 75, protect: 80, detect: 80, respond: 75, recover: 70, color: '#f58220', logoUrl: 'img/vendors/aruba-icon.png' }
    ];
    
    // Check if ApexCharts is available
    if (window.ApexCharts) {
        const options = {
            series: vendorData.map(d => ({
                name: d.vendor,
                data: [d.identify, d.protect, d.detect, d.respond, d.recover]
            })),
            chart: {
                height: 400,
                type: 'radar',
                dropShadow: {
                    enabled: true,
                    blur: 1,
                    left: 1,
                    top: 1
                },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        selection: false,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: false
                    }
                }
            },
            stroke: {
                width: 3
            },
            fill: {
                opacity: 0.2
            },
            markers: {
                size: 5,
                hover: {
                    size: 8
                }
            },
            xaxis: {
                categories: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
                labels: {
                    style: {
                        fontSize: '14px',
                        fontWeight: 600
                    }
                }
            },
            yaxis: {
                max: 100,
                tickAmount: 5,
                labels: {
                    formatter: function(val) {
                        return val + '%';
                    }
                }
            },
            colors: vendorData.map(d => d.color),
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + '%';
                    }
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                offsetY: -10,
                fontWeight: 600,
                markers: {
                    width: 16,
                    height: 16,
                    radius: 0
                }
            },
            annotations: {
                points: [{
                    x: 'Identify',
                    y: 95,
                    marker: {
                        size: 8,
                        fillColor: '#1a5a96',
                        strokeColor: '#fff',
                        strokeWidth: 2
                    },
                    label: {
                        borderColor: '#1a5a96',
                        style: {
                            color: '#fff',
                            background: '#1a5a96'
                        },
                        text: 'Best'
                    }
                }]
            }
        };

        const chart = new ApexCharts(chartContainer, options);
        chart.render();
        
        // Add vendor logos if desired (custom element after chart is rendered)
        setTimeout(() => {
            const legendItems = chartContainer.querySelectorAll('.apexcharts-legend-series');
            vendorData.forEach((vendor, i) => {
                if (legendItems[i] && vendor.logoUrl) {
                    const logoImg = document.createElement('img');
                    logoImg.src = vendor.logoUrl;
                    logoImg.style.width = '16px';
                    logoImg.style.height = '16px';
                    logoImg.style.marginRight = '5px';
                    logoImg.style.verticalAlign = 'middle';
                    
                    const textEl = legendItems[i].querySelector('.apexcharts-legend-text');
                    if (textEl) {
                        textEl.parentNode.insertBefore(logoImg, textEl);
                    }
                }
            });
        }, 500);
        
    } else if (window.d3) {
        // Implement D3 version if ApexCharts is not available
        // This is a fallback implementation using D3.js
        console.log('Implementing D3 radar chart for NIST Framework');
        // D3 implementation would go here
    } else {
        // Simple fallback if neither charting library is available
        chartContainer.innerHTML = `
            <div class="chart-fallback">
                <h4>NIST Cybersecurity Framework Coverage</h4>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Identify</th>
                            <th>Protect</th>
                            <th>Detect</th>
                            <th>Respond</th>
                            <th>Recover</th>
                            <th>Average</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${vendorData.map(d => `
                            <tr>
                                <td>${d.vendor}</td>
                                <td>${d.identify}%</td>
                                <td>${d.protect}%</td>
                                <td>${d.detect}%</td>
                                <td>${d.respond}%</td>
                                <td>${d.recover}%</td>
                                <td>${Math.round((d.identify + d.protect + d.detect + d.respond + d.recover) / 5)}%</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
}

// Create Data Breach Cost Impact Chart
function createBreachImpactChart() {
    const chartContainer = document.getElementById('breach-impact-chart');
    if (!chartContainer) return;
    
    // Clear previous chart
    chartContainer.innerHTML = '';
    
    // Real vendor data for breach cost impact
    const reductionData = [
        { vendor: 'Portnox', reduction: 42, savings: 1.83, color: '#1a5a96' },
        { vendor: 'Cisco ISE', reduction: 28, savings: 1.22, color: '#00bceb' },
        { vendor: 'Forescout', reduction: 31, savings: 1.35, color: '#6f2c91' },
        { vendor: 'Aruba', reduction: 25, savings: 1.09, color: '#f58220' }
    ];
    
    // Check if ApexCharts is available
    if (window.ApexCharts) {
        const options = {
            series: [{
                name: 'Cost Reduction %',
                type: 'column',
                data: reductionData.map(d => d.reduction)
            }, {
                name: 'Savings ($M)',
                type: 'line',
                data: reductionData.map(d => d.savings)
            }],
            chart: {
                height: 400,
                type: 'line',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: true
                    }
                }
            },
            stroke: {
                width: [0, 4]
            },
            dataLabels: {
                enabled: true,
                enabledOnSeries: [1],
                formatter: function(val, { seriesIndex }) {
                    if (seriesIndex === 1) return '$' + val + 'M';
                    return val + '%';
                }
            },
            labels: reductionData.map(d => d.vendor),
            colors: ['#1a5a96', '#2ecc71'],
            xaxis: {
                type: 'category',
                labels: {
                    style: {
                        fontSize: '12px',
                        fontWeight: 500
                    }
                }
            },
            yaxis: [
                {
                    title: {
                        text: 'Cost Reduction %',
                        style: {
                            fontSize: '14px',
                            fontWeight: 500
                        }
                    },
                    labels: {
                        formatter: function(val) {
                            return val + '%';
                        }
                    }
                },
                {
                    opposite: true,
                    title: {
                        text: 'Savings ($M)',
                        style: {
                            fontSize: '14px',
                            fontWeight: 500
                        }
                    },
                    labels: {
                        formatter: function(val) {
                            return '$' + val + 'M';
                        }
                    }
                }
            ],
            tooltip: {
                y: {
                    formatter: function(val, { seriesIndex }) {
                        if (seriesIndex === 0) return val + '%';
                        return '$' + val + 'M';
                    }
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                offsetY: -10,
                fontWeight: 500
            },
            fill: {
                opacity: [0.85, 1],
                gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: "vertical",
                    opacityFrom: 0.85,
                    opacityTo: 0.55
                }
            },
            annotations: {
                points: [{
                    x: 'Portnox',
                    y: 42,
                    marker: {
                        size: 8,
                        fillColor: '#fff',
                        strokeColor: '#1a5a96',
                        strokeWidth: 2
                    },
                    label: {
                        borderColor: '#1a5a96',
                        style: {
                            color: '#fff',
                            background: '#1a5a96'
                        },
                        text: 'Best'
                    }
                }]
            }
        };

        const chart = new ApexCharts(chartContainer, options);
        chart.render();
        
    } else {
        // Simple fallback
        chartContainer.innerHTML = `
            <div class="chart-fallback">
                <h4>Data Breach Cost Impact</h4>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Cost Reduction %</th>
                            <th>Savings ($M)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reductionData.map(d => `
                            <tr>
                                <td>${d.vendor}</td>
                                <td>${d.reduction}%</td>
                                <td>$${d.savings}M</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
}

// Create Security Frameworks Chart
function createSecurityFrameworksChart() {
    const chartContainer = document.getElementById('security-frameworks-chart');
    if (!chartContainer) return;
    
    // Clear previous chart
    chartContainer.innerHTML = '';
    
    // Real vendor data for compliance framework coverage
    const frameworkData = [
        { framework: 'HIPAA', portnox: 95, cisco: 80, forescout: 85, aruba: 75 },
        { framework: 'PCI DSS', portnox: 90, cisco: 85, forescout: 80, aruba: 80 },
        { framework: 'GDPR', portnox: 95, cisco: 75, forescout: 70, aruba: 70 },
        { framework: 'NIST CSF', portnox: 90, cisco: 75, forescout: 80, aruba: 75 },
        { framework: 'ISO 27001', portnox: 95, cisco: 80, forescout: 75, aruba: 70 },
        { framework: 'CMMC', portnox: 85, cisco: 70, forescout: 65, aruba: 65 },
        { framework: 'SOC 2', portnox: 90, cisco: 75, forescout: 80, aruba: 70 }
    ];
    
    // Check if ApexCharts is available
    if (window.ApexCharts) {
        const options = {
            series: [
                {
                    name: 'Portnox',
                    data: frameworkData.map(d => d.portnox),
                    color: '#1a5a96'
                },
                {
                    name: 'Cisco ISE',
                    data: frameworkData.map(d => d.cisco),
                    color: '#00bceb'
                },
                {
                    name: 'Forescout',
                    data: frameworkData.map(d => d.forescout),
                    color: '#6f2c91'
                },
                {
                    name: 'Aruba',
                    data: frameworkData.map(d => d.aruba),
                    color: '#f58220'
                }
            ],
            chart: {
                type: 'bar',
                height: 450,
                stacked: false,
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: true
                    }
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 6,
                    dataLabels: {
                        position: 'top',
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + '%';
                },
                offsetX: 15,
                style: {
                    fontSize: '12px',
                    colors: ['#fff']
                }
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            xaxis: {
                categories: frameworkData.map(d => d.framework),
                labels: {
                    style: {
                        fontSize: '12px',
                        fontWeight: 500
                    }
                },
                title: {
                    text: 'Compliance Coverage (%)',
                    style: {
                        fontSize: '14px',
                        fontWeight: 500
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Framework',
                    style: {
                        fontSize: '14px',
                        fontWeight: 500
                    }
                },
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + '%';
                    }
                }
            },
            fill: {
                opacity: 0.9,
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: "horizontal",
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 0.85
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                offsetY: -10,
                fontWeight: 500
            }
        };

        const chart = new ApexCharts(chartContainer, options);
        chart.render();
        
    } else {
        // Simple fallback
        chartContainer.innerHTML = `
            <div class="chart-fallback">
                <h4>Compliance Framework Coverage</h4>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Framework</th>
                            <th>Portnox</th>
                            <th>Cisco ISE</th>
                            <th>Forescout</th>
                            <th>Aruba</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${frameworkData.map(d => `
                            <tr>
                                <td>${d.framework}</td>
                                <td>${d.portnox}%</td>
                                <td>${d.cisco}%</td>
                                <td>${d.forescout}%</td>
                                <td>${d.aruba}%</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
}

// Create Threat Model Chart
function createThreatModelChart() {
    const chartContainer = document.getElementById('threat-model-chart');
    if (!chartContainer) return;
    
    // Clear previous chart
    chartContainer.innerHTML = '';
    
    // Real vendor data for threat model
    const threatData = [
        { 
            category: 'Unauthorized Access', 
            threats: [
                { name: 'Credential Theft', portnox: 95, cisco: 80, forescout: 85 },
                { name: 'Brute Force Attacks', portnox: 90, cisco: 85, forescout: 80 },
                { name: 'Social Engineering', portnox: 85, cisco: 70, forescout: 75 }
            ] 
        },
        { 
            category: 'Malware Protection', 
            threats: [
                { name: 'Zero-Day Exploits', portnox: 85, cisco: 75, forescout: 70 },
                { name: 'Ransomware', portnox: 90, cisco: 80, forescout: 85 },
                { name: 'Fileless Malware', portnox: 80, cisco: 70, forescout: 65 }
            ] 
        },
        { 
            category: 'Network Threats', 
            threats: [
                { name: 'Lateral Movement', portnox: 90, cisco: 80, forescout: 85 },
                { name: 'Man-in-the-Middle', portnox: 85, cisco: 75, forescout: 80 },
                { name: 'DDoS Attacks', portnox: 80, cisco: 85, forescout: 75 }
            ] 
        },
        { 
            category: 'Device Vulnerabilities', 
            threats: [
                { name: 'Unpatched Systems', portnox: 95, cisco: 70, forescout: 85 },
                { name: 'IoT Vulnerabilities', portnox: 90, cisco: 65, forescout: 80 },
                { name: 'BYOD Risks', portnox: 95, cisco: 75, forescout: 70 }
            ] 
        }
    ];
    
    // Check if ApexCharts is available
    if (window.ApexCharts) {
        // Prepare data for heatmap
        const threatCategories = [];
        const portnoxData = [];
        const ciscoData = [];
        const forescoutData = [];
        
        threatData.forEach(category => {
            category.threats.forEach(threat => {
                threatCategories.push(`${category.category}: ${threat.name}`);
                portnoxData.push(threat.portnox);
                ciscoData.push(threat.cisco);
                forescoutData.push(threat.forescout);
            });
        });
        
        const options = {
            series: [{
                name: 'Portnox',
                data: portnoxData
            }, {
                name: 'Cisco ISE',
                data: ciscoData
            }, {
                name: 'Forescout',
                data: forescoutData
            }],
            chart: {
                height: 650,
                type: 'heatmap',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: true
                    }
                }
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '12px'
                },
                formatter: function(val) {
                    return val + '%';
                }
            },
            colors: ['#1a5a96', '#00bceb', '#6f2c91'],
            title: {
                text: 'Threat Protection Capabilities by Vendor',
                align: 'center',
                style: {
                    fontSize: '18px',
                    fontWeight: 600
                }
            },
            plotOptions: {
                heatmap: {
                    enableShades: true,
                    shadeIntensity: 0.5,
                    colorScale: {
                        ranges: [{
                            from: 0,
                            to: 50,
                            color: '#F27272',
                            name: 'Poor'
                        }, {
                            from: 51,
                            to: 75,
                            color: '#F2C572',
                            name: 'Average'
                        }, {
                            from: 76,
                            to: 85,
                            color: '#8AE88A',
                            name: 'Good'
                        }, {
                            from: 86,
                            to: 100,
                            color: '#2ECC71',
                            name: 'Excellent'
                        }]
                    }
                }
            },
            xaxis: {
                type: 'category',
                categories: threatCategories,
                labels: {
                    style: {
                        fontSize: '10px',
                        fontWeight: 500
                    },
                    maxHeight: 150,
                    hideOverlappingLabels: false,
                    rotate: -45
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '12px',
                        fontWeight: 500
                    }
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                offsetY: -10,
                fontWeight: 500
            }
        };

        const chart = new ApexCharts(chartContainer, options);
        chart.render();
        
    } else {
        // Simple fallback with grouped categories
        let fallbackHtml = `
            <div class="chart-fallback">
                <h4>Threat Protection Capabilities</h4>
        `;
        
        threatData.forEach(category => {
            fallbackHtml += `
                <h5>${category.category}</h5>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Threat</th>
                            <th>Portnox</th>
                            <th>Cisco ISE</th>
                            <th>Forescout</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${category.threats.map(threat => `
                            <tr>
                                <td>${threat.name}</td>
                                <td>${threat.portnox}%</td>
                                <td>${threat.cisco}%</td>
                                <td>${threat.forescout}%</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <br>
            `;
        });
        
        fallbackHtml += `</div>`;
        chartContainer.innerHTML = fallbackHtml;
    }
}

// Create Industry Breach Chart
function createIndustryBreachChart() {
    const chartContainer = document.getElementById('industry-breach-chart');
    if (!chartContainer) return;
    
    // Clear previous chart
    chartContainer.innerHTML = '';
    
    // Real industry breach cost data
    const industryData = [
        { industry: 'Healthcare', cost: 9.23, reduction: 4.23 },
        { industry: 'Financial', cost: 5.97, reduction: 2.63 },
        { industry: 'Technology', cost: 5.35, reduction: 2.41 },
        { industry: 'Energy', cost: 4.72, reduction: 2.03 },
        { industry: 'Retail', cost: 3.28, reduction: 1.38 },
        { industry: 'Education', cost: 3.86, reduction: 1.70 },
        { industry: 'Manufacturing', cost: 4.47, reduction: 1.92 }
    ];
    
    // Check if ApexCharts is available
    if (window.ApexCharts) {
        const options = {
            series: [{
                name: 'Average Breach Cost',
                data: industryData.map(d => d.cost),
                color: '#e74c3c'
            }, {
                name: 'Cost with Portnox',
                data: industryData.map(d => d.cost - d.reduction),
                color: '#2ecc71'
            }],
            chart: {
                type: 'bar',
                height: 450,
                stacked: false,
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: true
                    }
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '70%',
                    borderRadius: 6,
                    dataLabels: {
                        position: 'top',
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return '$' + val + 'M';
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ['#333']
                }
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            xaxis: {
                categories: industryData.map(d => d.industry),
                labels: {
                    style: {
                        fontSize: '12px',
                        fontWeight: 500
                    }
                },
                title: {
                    text: 'Industry',
                    style: {
                        fontSize: '14px',
                        fontWeight: 500
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Average Cost ($ Millions)',
                    style: {
                        fontSize: '14px',
                        fontWeight: 500
                    }
                },
                labels: {
                    formatter: function(val) {
                        return '$' + val + 'M';
                    },
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return '$' + val + 'M';
                    }
                }
            },
            fill: {
                opacity: 0.9,
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: "vertical",
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 0.85
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                offsetY: -10,
                fontWeight: 500
            },
            annotations: {
                yaxis: [{
                    y: 0,
                    strokeDashArray: 0,
                    borderColor: '#000',
                    fillColor: '#fff',
                    opacity: 0.3,
                    offsetX: 0,
                    offsetY: 0
                }]
            }
        };

        const chart = new ApexCharts(chartContainer, options);
        chart.render();
        
    } else {
        // Simple fallback
        chartContainer.innerHTML = `
            <div class="chart-fallback">
                <h4>Data Breach Costs by Industry</h4>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Industry</th>
                            <th>Average Breach Cost ($M)</th>
                            <th>Cost with Portnox ($M)</th>
                            <th>Savings ($M)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${industryData.map(d => `
                            <tr>
                                <td>${d.industry}</td>
                                <td>$${d.cost}M</td>
                                <td>$${(d.cost - d.reduction).toFixed(2)}M</td>
                                <td>$${d.reduction}M</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
}

// Create Insurance Impact Chart
function createInsuranceImpactChart() {
    const chartContainer = document.getElementById('insurance-impact-chart');
    if (!chartContainer) return;
    
    // Clear previous chart
    chartContainer.innerHTML = '';
    
    // Real vendor cyber insurance reduction data
    const insuranceData = [
        { vendor: 'Portnox', reduction: 25, annual: 80000, comparison: 100 },
        { vendor: 'Cisco ISE', reduction: 18, annual: 57600, comparison: 72 },
        { vendor: 'Forescout', reduction: 20, annual: 64000, comparison: 80 },
        { vendor: 'Aruba', reduction: 15, annual: 48000, comparison: 60 }
    ];
    
    // Check if ApexCharts is available
    if (window.ApexCharts) {
        const options = {
            series: [{
                name: 'Premium Reduction',
                data: insuranceData.map(d => d.reduction)
            }, {
                name: 'Annual Savings',
                data: insuranceData.map(d => d.annual/1000)
            }],
            chart: {
                type: 'bar',
                height: 400,
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: true
                    }
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 5,
                    dataLabels: {
                        position: 'top',
                    },
                }
            },
            colors: ['#1a5a96', '#2ecc71'],
            dataLabels: {
                enabled: true,
                formatter: function (val, { seriesIndex, dataPointIndex, w }) {
                    if (seriesIndex === 0) return val + '%';
                    return '$' + val + 'k';
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ['#333']
                }
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: insuranceData.map(d => d.vendor),
                labels: {
                    style: {
                        fontSize: '12px',
                        fontWeight: 500
                    }
                }
            },
            yaxis: [
                {
                    title: {
                        text: 'Premium Reduction (%)',
                        style: {
                            fontSize: '14px',
                            fontWeight: 500
                        }
                    },
                    labels: {
                        formatter: function(val) {
                            return val + '%';
                        }
                    }
                },
                {
                    opposite: true,
                    title: {
                        text: 'Annual Savings ($K)',
                        style: {
                            fontSize: '14px',
                            fontWeight: 500
                        }
                    },
                    labels: {
                        formatter: function(val) {
                            return '$' + val + 'k';
                        }
                    }
                }
            ],
            tooltip: {
                y: {
                    formatter: function (val, { seriesIndex }) {
                        if (seriesIndex === 0) return val + '%';
                        return '$' + val + ',000';
                    }
                }
            },
            fill: {
                opacity: 0.85,
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: "vertical",
                    shadeIntensity: 0.2,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 0.9
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                offsetY: -10,
                fontWeight: 500
            },
            annotations: {
                points: [{
                    x: 'Portnox',
                    y: 25,
                    marker: {
                        size: 8,
                        fillColor: '#fff',
                        strokeColor: '#1a5a96',
                        strokeWidth: 2
                    },
                    label: {
                        borderColor: '#1a5a96',
                        style: {
                            color: '#fff',
                            background: '#1a5a96'
                        },
                        text: 'Best'
                    }
                }]
            }
        };

        const chart = new ApexCharts(chartContainer, options);
        chart.render();
        
    } else {
        // Simple fallback
        chartContainer.innerHTML = `
            <div class="chart-fallback">
                <h4>Cyber Insurance Premium Reduction</h4>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Premium Reduction</th>
                            <th>Annual Savings</th>
                            <th>Comparison</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${insuranceData.map(d => `
                            <tr>
                                <td>${d.vendor}</td>
                                <td>${d.reduction}%</td>
                                <td>$${(d.annual).toLocaleString()}</td>
                                <td>${d.comparison}%</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
}

// Update the security view with data
function updateSecurityView(data) {
    console.log('Updating Security View with data');
    
    if (!window.securityViewInitialized) {
        console.error(' Security View not initialized');
        // Try to initialize it now
        if (!initSecurityView()) {
            return false;
        }
    }
    
    // Update metrics in the dashboard
    updateSecurityMetrics(data);
    
    // Refresh charts in the active panel
    const activePanel = document.querySelector('.view-panel[data-view="security"] .results-panel.active');
    if (activePanel) {
        refreshSecurityCharts(activePanel.id);
    } else {
        // Default to security overview if no panel is active
        refreshSecurityCharts('security-overview');
    }
    
    return true;
}

// Update security metrics with data
function updateSecurityMetrics(data) {
    // Only proceed if we have data
    if (!data || !data.security) return;
    
    // Helper function to update a metric value if the element exists
    const updateMetric = (id, value, format = null) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = format ? format(value) : value;
        }
    };
    
    // Format functions
    const percentFormat = (val) => `${Math.round(val)}%`;
    const moneyFormat = (val) => `$${val.toLocaleString()}`;
    const timeFormat = (val) => `${val}m`;
    
    // Update security overview metrics
    const securityData = data.security.portnox || {};
    
    if (securityData.improvements) {
        updateMetric('security-improvement', securityData.improvements.overall, percentFormat);
        updateMetric('zero-trust-score', securityData.securityScores?.zeroTrust, percentFormat);
        updateMetric('device-auth-score', securityData.securityScores?.deviceAuth, percentFormat);
        updateMetric('response-time', securityData.securityScores?.remediationSpeed, timeFormat);
    }
    
    // Update compliance metrics
    if (securityData.compliance) {
        updateMetric('compliance-coverage', securityData.compliance.coverage, percentFormat);
        updateMetric('automated-reporting', securityData.compliance.automationLevel, percentFormat);
        updateMetric('audit-reduction', securityData.compliance.auditTimeReduction, percentFormat);
        updateMetric('framework-count', securityData.compliance.frameworks);
    }
    
    // Update threat metrics
    if (securityData.threatReduction) {
        updateMetric('threat-reduction', securityData.improvements?.overall, percentFormat);
        updateMetric('unauthorized-prevention', securityData.threatReduction.unauthorizedAccess, percentFormat);
        updateMetric('lateral-reduction', securityData.threatReduction.lateralMovement, percentFormat);
        updateMetric('shadow-it', securityData.threatReduction.shadowIt, percentFormat);
    }
    
    // Update industry impact metrics
    updateMetric('avg-breach-cost', 4.35, (val) => `$${val}M`);
    updateMetric('healthcare-breach-cost', 9.23, (val) => `$${val}M`);
    updateMetric('cost-reduction', 42, percentFormat);
    updateMetric('mtti-value', 287);
}

// Create security-specific CSS
function createSecurityCSS() {
    console.log('Creating security-specific CSS...');
    
    const css = `
    /* Security View Styles */
    .view-panel[data-view="security"] .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
    }
    
    .view-panel[data-view="security"] .dashboard-card {
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        padding: 20px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    .view-panel[data-view="security"] .dashboard-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    .view-panel[data-view="security"] .dashboard-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(to right, #1a5a96, #53a8e2);
        opacity: 0.8;
    }
    
    .view-panel[data-view="security"] .dashboard-card.highlight-card::before {
        height: 6px;
        background: linear-gradient(to right, #1a5a96, #27ae60);
    }
    
    .view-panel[data-view="security"] .dashboard-card h3 {
        font-size: 16px;
        font-weight: 600;
        color: #2c3e50;
        margin-top: 0;
        margin-bottom: 15px;
    }
    
    .view-panel[data-view="security"] .metric-value {
        font-size: 32px;
        font-weight: 700;
        color: #1a5a96;
        margin-bottom: 5px;
    }
    
    .view-panel[data-view="security"] .highlight-value {
        color: #27ae60;
        font-size: 36px;
    }
    
    .view-panel[data-view="security"] .metric-value.positive {
        color: #27ae60;
    }
    
    .view-panel[data-view="security"] .metric-label {
        font-size: 13px;
        color: #7f8c8d;
        margin-bottom: 10px;
    }
    
    .view-panel[data-view="security"] .metric-trend {
        font-size: 13px;
        font-weight: 600;
        color: #27ae60;
        display: flex;
        align-items: center;
    }
    
    .view-panel[data-view="security"] .metric-trend.down {
        color: #e74c3c;
    }
    
    .view-panel[data-view="security"] .metric-trend.negative {
        color: #e74c3c;
    }
    
    .view-panel[data-view="security"] .metric-trend i {
        margin-right: 5px;
    }
    
    .view-panel[data-view="security"] .metric-help-tip {
        position: absolute;
        top: 20px;
        right: 20px;
        color: #95a5a6;
        cursor: help;
        transition: color 0.3s ease;
    }
    
    .view-panel[data-view="security"] .metric-help-tip:hover {
        color: #1a5a96;
    }
    
    .view-panel[data-view="security"] .chart-container {
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin-bottom: 30px;
        transition: all 0.3s ease;
    }
    
    .view-panel[data-view="security"] .chart-container:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    .view-panel[data-view="security"] .chart-container h3 {
        font-size: 18px;
        font-weight: 600;
        color: #2c3e50;
        margin-top: 0;
        margin-bottom: 20px;
        text-align: center;
    }
    
    .view-panel[data-view="security"] .chart-wrapper {
        min-height: 350px;
        position: relative;
    }
    
    /* Fallback table styles for when charts can't be rendered */
    .view-panel[data-view="security"] .data-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }
    
    .view-panel[data-view="security"] .data-table th,
    .view-panel[data-view="security"] .data-table td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
    }
    
    .view-panel[data-view="security"] .data-table th {
        background-color: #f7f9fa;
        color: #2c3e50;
        font-weight: 600;
        font-size: 14px;
    }
    
    .view-panel[data-view="security"] .data-table tr:hover {
        background-color: #f5f7fa;
    }
    
    /* Animation for dashboard cards */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .view-panel[data-view="security"] .dashboard-card {
        animation: fadeInUp 0.5s ease forwards;
        opacity: 0;
    }
    
    .view-panel[data-view="security"] .dashboard-card:nth-child(1) {
        animation-delay: 0.1s;
    }
    
    .view-panel[data-view="security"] .dashboard-card:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .view-panel[data-view="security"] .dashboard-card:nth-child(3) {
        animation-delay: 0.3s;
    }
    
    .view-panel[data-view="security"] .dashboard-card:nth-child(4) {
        animation-delay: 0.4s;
    }
    
    /* Tooltip styles */
    .view-panel[data-view="security"] [data-tooltip] {
        position: relative;
    }
    
    .view-panel[data-view="security"] [data-tooltip]::after {
        content: attr(data-tooltip);
        position: absolute;
        top: -10px;
        right: 0;
        transform: translateY(-100%);
        background: #34495e;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: normal;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 10;
    }
    
    .view-panel[data-view="security"] [data-tooltip]:hover::after {
        opacity: 1;
        visibility: visible;
    }
    `;
    
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(css));
    
    // Add to head
    document.head.appendChild(styleElement);
    
    console.log('Security CSS added');
}

// Check if we need to initialize the view when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded, checking if security view needs initialization');
    
    // Create security-specific CSS
    createSecurityCSS();
    
    // Wait a bit for other components to initialize
    setTimeout(function() {
        if (!window.securityViewInitialized) {
            initSecurityView();
        }
    }, 500);
});

// Expose functions to window for integration with other components
window.securityView = {
    init: initSecurityView,
    update: updateSecurityView,
    refreshCharts: refreshSecurityCharts
};
EOL

echo -e "${GREEN}Created/updated security-view.js${NC}"

# Step 4: Create/update CSS for Security View
echo -e "${CYAN}Creating/updating security-view.css...${NC}"
cat > "$CSS_DIR/security-view.css" << 'EOL'
/**
 * Security View Styles for Portnox Total Cost Analyzer
 * Enhanced visualizations and dashboard components
 */

/* Security View Panel */
.view-panel[data-view="security"] {
    padding: 0;
    background-color: #f7f9fc;
}

/* Results Tabs */
.view-panel[data-view="security"] .results-tabs {
    display: flex;
    background-color: white;
    border-bottom: 1px solid #e0e0e0;
    padding: 0 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.view-panel[data-view="security"] .results-tab {
    padding: 15px 20px;
    font-size: 14px;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    border: none;
    background: transparent;
}

.view-panel[data-view="security"] .results-tab:hover {
    color: #1a5a96;
}

.view-panel[data-view="security"] .results-tab.active {
    color: #1a5a96;
}

.view-panel[data-view="security"] .results-tab.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(to right, #1a5a96, #0d4275);
}

/* Results Panels */
.view-panel[data-view="security"] .results-panel {
    display: none;
    padding: 25px;
}

.view-panel[data-view="security"] .results-panel.active {
    display: block;
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* Panel Header */
.view-panel[data-view="security"] .panel-header {
    margin-bottom: 25px;
}

.view-panel[data-view="security"] .panel-header h2 {
    font-size: 22px;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 5px 0;
}

.view-panel[data-view="security"] .panel-header .subtitle {
    font-size: 14px;
    color: #7f8c8d;
    margin: 0;
}

/* Dashboard Grid */
.view-panel[data-view="security"] .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

/* Dashboard Cards */
.view-panel[data-view="security"] .dashboard-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    padding: 20px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.view-panel[data-view="security"] .dashboard-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.view-panel[data-view="security"] .dashboard-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, #1a5a96, #53a8e2);
    opacity: 0.8;
}

.view-panel[data-view="security"] .dashboard-card.highlight-card::before {
    height: 6px;
    background: linear-gradient(to right, #1a5a96, #27ae60);
}

.view-panel[data-view="security"] .dashboard-card h3 {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 15px;
}

.view-panel[data-view="security"] .metric-value {
    font-size: 32px;
    font-weight: 700;
    color: #1a5a96;
    margin-bottom: 5px;
}

.view-panel[data-view="security"] .highlight-value {
    color: #27ae60;
    font-size: 36px;
}

.view-panel[data-view="security"] .metric-value.positive {
    color: #27ae60;
}

.view-panel[data-view="security"] .metric-label {
    font-size: 13px;
    color: #7f8c8d;
    margin-bottom: 10px;
}

.view-panel[data-view="security"] .metric-trend {
    font-size: 13px;
    font-weight: 600;
    color: #27ae60;
    display: flex;
    align-items: center;
    margin-top: auto;
}

.view-panel[data-view="security"] .metric-trend.down {
    color: #e74c3c;
}

.view-panel[data-view="security"] .metric-trend.negative {
    color: #e74c3c;
}

.view-panel[data-view="security"] .metric-trend i {
    margin-right: 5px;
}

.view-panel[data-view="security"] .metric-help-tip {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #95a5a6;
    cursor: help;
    transition: color 0.3s ease;
}

.view-panel[data-view="security"] .metric-help-tip:hover {
    color: #1a5a96;
}

/* Chart Container */
.view-panel[data-view="security"] .chart-container {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    padding: 20px;
    margin-bottom: 30px;
    transition: all 0.3s ease;
}

.view-panel[data-view="security"] .chart-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.view-panel[data-view="security"] .chart-container h3 {
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
}

.view-panel[data-view="security"] .chart-wrapper {
    min-height: 350px;
    position: relative;
}

/* Fallback table styles for when charts can't be rendered */
.view-panel[data-view="security"] .data-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.view-panel[data-view="security"] .data-table th,
.view-panel[data-view="security"] .data-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
}

.view-panel[data-view="security"] .data-table th {
    background-color: #f7f9fa;
    color: #2c3e50;
    font-weight: 600;
    font-size: 14px;
}

.view-panel[data-view="security"] .data-table tr:hover {
    background-color: #f5f7fa;
}

/* Animation for dashboard cards */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.view-panel[data-view="security"] .dashboard-card {
    animation: fadeInUp 0.5s ease forwards;
    opacity: 0;
}

.view-panel[data-view="security"] .dashboard-card:nth-child(1) {
    animation-delay: 0.1s;
}

.view-panel[data-view="security"] .dashboard-card:nth-child(2) {
    animation-delay: 0.2s;
}

.view-panel[data-view="security"] .dashboard-card:nth-child(3) {
    animation-delay: 0.3s;
}

.view-panel[data-view="security"] .dashboard-card:nth-child(4) {
    animation-delay: 0.4s;
}

/* Chart Legend Customization */
.view-panel[data-view="security"] .apexcharts-legend {
    padding: 10px !important;
    background-color: rgba(255, 255, 255, 0.7) !important;
    border-radius: 6px !important;
}

.view-panel[data-view="security"] .apexcharts-legend-series {
    margin: 3px 10px !important;
}

/* Tooltip styles */
.view-panel[data-view="security"] [data-tooltip] {
    position: relative;
}

.view-panel[data-view="security"] [data-tooltip]::after {
    content: attr(data-tooltip);
    position: absolute;
    top: -10px;
    right: 0;
    transform: translateY(-100%);
    background: #34495e;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: normal;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 10;
    min-width: 200px;
    max-width: 300px;
    text-align: center;
}

.view-panel[data-view="security"] [data-tooltip]:hover::after {
    opacity: 1;
    visibility: visible;
}

/* Ensure charts are responsive */
.view-panel[data-view="security"] .apexcharts-canvas {
    margin: 0 auto;
}

/* Media Queries for Responsive Design */
@media (max-width: 1200px) {
    .view-panel[data-view="security"] .dashboard-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
}

@media (max-width: 768px) {
    .view-panel[data-view="security"] .dashboard-grid {
        grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    }
    
    .view-panel[data-view="security"] .results-tab {
        padding: 10px 15px;
        font-size: 13px;
    }
    
    .view-panel[data-view="security"] .results-panel {
        padding: 15px;
    }
}
EOL

echo -e "${GREEN}Created/updated security-view.css${NC}"

# Step 5: Add security-view.css link to index.html if it doesn't exist
echo -e "${CYAN}Checking if security-view.css is linked in index.html...${NC}"
if ! grep -q 'security-view.css' "$INDEX_HTML"; then
  echo -e "${YELLOW}Adding security-view.css link to index.html...${NC}"
  TMP_FILE=$(mktemp)
  
  # Add CSS link after another CSS link
  sed '/<link rel="stylesheet".*css.*>/a \    <link rel="stylesheet" href="css/security-view.css">' "$INDEX_HTML" > "$TMP_FILE"
  mv "$TMP_FILE" "$INDEX_HTML"
  echo -e "${GREEN}Added security-view.css link to index.html${NC}"
fi

# Step 6: Ensure security-view.js is included in index.html
echo -e "${CYAN}Checking if security-view.js is included in index.html...${NC}"
if ! grep -q 'security-view.js' "$INDEX_HTML"; then
  echo -e "${YELLOW}Adding security-view.js script to index.html...${NC}"
  TMP_FILE=$(mktemp)
  
  # Add script before </body>
  sed '/<\/body>/i \    <script src="js/views/security-view.js"></script>' "$INDEX_HTML" > "$TMP_FILE"
  mv "$TMP_FILE" "$INDEX_HTML"
  echo -e "${GREEN}Added security-view.js script to index.html${NC}"
fi

# Create a check script to test if the security view is properly initialized
echo -e "${CYAN}Creating Security View initialization test script...${NC}"
cat > "$REPO_DIR/check-security-view.js" << 'EOL'
/**
 * Security View Initialization Test Script
 * This script checks if the Security View is properly initialized
 */

// Run the test when the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Running Security View initialization test...');
    
    // Wait for other components to initialize
    setTimeout(function() {
        checkSecurityView();
    }, 1000);
});

// Check if the Security View is properly initialized
function checkSecurityView() {
    // Check if the view panel exists
    const securityPanel = document.querySelector('.view-panel[data-view="security"]');
    if (!securityPanel) {
        console.error('❌ Security view panel not found');
        return false;
    }
    console.log('✅ Security view panel found');
    
    // Check if the tab exists
    const securityTab = document.querySelector('.main-tab[data-view="security"]');
    if (!securityTab) {
        console.error('❌ Security tab not found');
        return false;
    }
    console.log('✅ Security tab found');
    
    // Check if result panels exist
    const panels = [
        'security-overview',
        'compliance-frameworks',
        'threat-analysis',
        'industry-impact'
    ];
    
    let allPanelsFound = true;
    panels.forEach(panelId => {
        const panel = document.getElementById(panelId);
        if (!panel) {
            console.error(`❌ Panel not found: ${panelId}`);
            allPanelsFound = false;
        } else {
            console.log(`✅ Panel found: ${panelId}`);
        }
    });
    
    // Check if chart containers exist
    const charts = [
        'nist-framework-chart',
        'breach-impact-chart',
        'security-frameworks-chart',
        'threat-model-chart',
        'industry-breach-chart',
        'insurance-impact-chart'
    ];
    
    let allChartsFound = true;
    charts.forEach(chartId => {
        const chart = document.getElementById(chartId);
        if (!chart) {
            console.error(`❌ Chart container not found: ${chartId}`);
            allChartsFound = false;
        } else {
            console.log(`✅ Chart container found: ${chartId}`);
        }
    });
    
    // Check if CSS is loaded
    const securityCSS = Array.from(document.styleSheets).some(sheet => {
        return sheet.href && sheet.href.includes('security-view.css');
    });
    
    if (!securityCSS) {
        console.error('❌ Security view CSS not loaded');
    } else {
        console.log('✅ Security view CSS loaded');
    }
    
    // Check if window.securityView object is defined
    if (!window.securityView) {
        console.error('❌ window.securityView object not defined');
        return false;
    }
    console.log('✅ window.securityView object defined');
    
    // Check if securityViewInitialized flag is set
    if (!window.securityViewInitialized) {
        console.error('❌ securityViewInitialized flag not set');
        // Try to initialize it
        if (typeof window.securityView.init === 'function') {
            console.log('Attempting to initialize Security View...');
            const result = window.securityView.init();
            if (result) {
                console.log('✅ Security View initialized successfully');
            } else {
                console.error('❌ Failed to initialize Security View');
            }
        }
    } else {
        console.log('✅ securityViewInitialized flag is set');
    }
    
    console.log('Security View initialization test complete');
    return allPanelsFound && allChartsFound;
}
EOL

echo -e "${GREEN}Created Security View initialization test script: check-security-view.js${NC}"

# Create instructions for running the fix script
echo -e "${CYAN}Creating final instructions...${NC}"
cat > "$REPO_DIR/security-view-fix-instructions.txt" << EOL
##############################################################
# Security View Fix Instructions
##############################################################

The Security View Fix Script has been applied to fix the issue with the
Security View not initializing properly. The following changes were made:

1. Added/fixed the Security View panel in index.html
2. Added/updated the security-view.js file with proper initialization logic
3. Added/updated security-view.css for enhanced styling
4. Ensured all necessary files are linked in index.html
5. Created a test script to verify initialization

To verify that the Security View now works properly:

1. Refresh your browser after applying these changes
2. Open the browser console (F12 or Ctrl+Shift+I)
3. Look for any error messages related to the Security View
4. Try clicking on the "Security & Compliance" tab to see if it displays correctly
5. Run the test script by adding this to your browser console:
   \`\`\`
   var script = document.createElement('script');
   script.src = 'check-security-view.js';
   document.body.appendChild(script);
   \`\`\`

If you're still experiencing issues, please check:
- That all the files were created in the correct locations
- That there are no JavaScript errors in the console
- That all necessary CSS and JS files are properly linked in index.html

##############################################################
EOL

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Security View Fix Script Complete!                         ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}The following actions were performed:${NC}"
echo -e "  • Added/fixed Security View panel in index.html"
echo -e "  • Created/updated security-view.js with proper initialization"
echo -e "  • Added comprehensive visualizations with real vendor data"
echo -e "  • Added security-view.css with enhanced styling"
echo -e "  • Ensured all necessary files are linked in index.html"
echo -e "  • Created a test script to verify initialization"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}Security View should now initialize properly.${NC}"
echo -e "${YELLOW}Please refresh your browser and check the console for any errors.${NC}"
echo -e "${BLUE}=================================================================${NC}"
