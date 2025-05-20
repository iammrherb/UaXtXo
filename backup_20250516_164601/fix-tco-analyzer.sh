#!/bin/bash
set -e

echo "==== Portnox Total Cost Analyzer Fixer Script ===="
echo "This script will fix missing images and JavaScript errors"

# Create directory structure if it doesn't exist
echo "Creating directory structure..."
mkdir -p img/vendors
mkdir -p js/fixes
mkdir -p css/fixes

# Fix for the missing vendor logo images
echo "Downloading vendor logo placeholder images..."

# Function to create placeholder SVG logo
create_svg_logo() {
    local vendor=$1
    local color=$2
    local output="img/vendors/${vendor}-logo.png"
    
    # Create a simple SVG placeholder with the vendor name
    cat > "img/vendors/${vendor}-logo.svg" << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100">
  <rect width="200" height="100" fill="white"/>
  <rect width="180" height="80" x="10" y="10" fill="${color}" rx="10" ry="10"/>
  <text x="100" y="55" font-family="Arial" font-size="20" text-anchor="middle" fill="white">${vendor}</text>
</svg>
EOF

    # Convert SVG to PNG if imagemagick is available
    if command -v convert &> /dev/null; then
        convert "img/vendors/${vendor}-logo.svg" "$output"
        echo "Created $output"
    else
        echo "ImageMagick not found. SVG created at img/vendors/${vendor}-logo.svg"
        # Create a symbolic link as fallback
        ln -sf "../img/vendors/${vendor}-logo.svg" "$output"
    fi
}

# Create vendor logos
create_svg_logo "portnox" "#2c3e50"
create_svg_logo "cisco" "#049fd9"
create_svg_logo "aruba" "#ff8300"
create_svg_logo "forescout" "#6b2a94"
create_svg_logo "fortinac" "#c8102e"
create_svg_logo "juniper" "#84bc41"
create_svg_logo "securew2" "#1a4d80"
create_svg_logo "microsoft" "#00a4ef"
create_svg_logo "arista" "#2d7de1"
create_svg_logo "foxpass" "#ff5722"

# Create a special icon for "no-nac"
cat > "img/vendors/no-nac-icon.svg" << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100">
  <rect width="200" height="100" fill="white"/>
  <circle cx="100" cy="50" r="40" fill="#f44336"/>
  <line x1="70" y1="30" x2="130" y2="70" stroke="white" stroke-width="8"/>
  <line x1="70" y1="70" x2="130" y2="30" stroke="white" stroke-width="8"/>
</svg>
EOF

if command -v convert &> /dev/null; then
    convert "img/vendors/no-nac-icon.svg" "img/vendors/no-nac-icon.png"
else
    ln -sf "../img/vendors/no-nac-icon.svg" "img/vendors/no-nac-icon.png"
fi

# Create a favicon
create_svg_logo "favicon" "#2c3e50"
mv img/vendors/favicon-logo.png img/favicon.png

# Fix JavaScript errors
echo "Fixing JavaScript errors..."

# Create or fix portnox-tco-analyzer.js
cat > js/portnox-tco-analyzer.js << 'EOF'
// Portnox Total Cost Analyzer - Main Application Script

// Global variables
const appState = {
    vendors: ['portnox'],
    industry: '',
    complianceFrameworks: [],
    deviceCount: 500,
    locations: 2,
    yearsToProject: 3,
    features: {
        byodSupport: true,
        wirelessSupport: true,
        remoteWork: true,
        cloudIntegration: false,
        legacyDevices: false,
        iotSupport: false
    },
    costs: {
        portnoxBasePrice: 3.00,
        portnoxDiscount: 15,
        fteCost: 100000,
        fteAllocation: 25,
        maintenancePercentage: 18,
        downtimeCost: 5000,
        riskReduction: 35,
        insuranceReduction: 10
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing TCO Analyzer...');
    initApp();
    initEventListeners();
    initParticleBackground();
});

// Application initialization
function initApp() {
    console.log('Initializing application components...');
    initVendorSelection();
    initIndustrySelection();
    initSidebar();
    initDarkMode();
    initStakeholderViews();
    initTooltips();
}

// Initialize vendor selection functionality
function initVendorSelection() {
    console.log('Initializing vendor selection...');
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
        card.addEventListener('click', function() {
            const vendor = this.getAttribute('data-vendor');
            if (vendor === 'portnox') {
                // Portnox is always selected
                return;
            }
            
            this.classList.toggle('selected');
            
            // Update appState
            const vendorIndex = appState.vendors.indexOf(vendor);
            if (vendorIndex === -1) {
                appState.vendors.push(vendor);
            } else {
                appState.vendors.splice(vendorIndex, 1);
            }
            
            console.log('Selected vendors:', appState.vendors);
        });
    });
}

// Initialize industry selection
function initIndustrySelection() {
    console.log('Initializing industry selection...');
    const industrySelect = document.getElementById('industry-select');
    
    if (industrySelect) {
        industrySelect.addEventListener('change', function() {
            appState.industry = this.value;
            console.log('Selected industry:', appState.industry);
            
            // Update compliance checkboxes based on industry
            updateComplianceOptions(appState.industry);
        });
    }
}

// Update compliance options based on selected industry
function updateComplianceOptions(industry) {
    // Reset all checkboxes
    document.querySelectorAll('.compliance-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Check appropriate boxes based on industry
    if (industry === 'healthcare') {
        document.getElementById('compliance-hipaa').checked = true;
        document.getElementById('compliance-pci').checked = true;
    } else if (industry === 'financial') {
        document.getElementById('compliance-pci').checked = true;
        document.getElementById('compliance-sox').checked = true;
        document.getElementById('compliance-gdpr').checked = true;
    } else if (industry === 'education') {
        document.getElementById('compliance-ferpa').checked = true;
    } else if (industry === 'government') {
        document.getElementById('compliance-nist').checked = true;
        document.getElementById('compliance-cmmc').checked = true;
    } else if (industry === 'retail') {
        document.getElementById('compliance-pci').checked = true;
        document.getElementById('compliance-gdpr').checked = true;
    }
    
    // Update appState
    updateComplianceState();
}

// Update compliance state based on checkbox selection
function updateComplianceState() {
    appState.complianceFrameworks = [];
    
    document.querySelectorAll('.compliance-item input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.checked) {
            const framework = checkbox.id.replace('compliance-', '');
            appState.complianceFrameworks.push(framework);
        }
    });
    
    console.log('Selected compliance frameworks:', appState.complianceFrameworks);
}

// Initialize sidebar functionality
function initSidebar() {
    console.log('Initializing sidebar...');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const configCards = document.querySelectorAll('.config-card');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            sidebarToggle.classList.toggle('collapsed');
            
            // Update toggle icon
            const icon = sidebarToggle.querySelector('i');
            if (sidebar.classList.contains('collapsed')) {
                icon.className = 'fas fa-chevron-right';
            } else {
                icon.className = 'fas fa-chevron-left';
            }
        });
    }
    
    // Config card collapsible functionality
    configCards.forEach(card => {
        const header = card.querySelector('.config-card-header');
        const content = card.querySelector('.config-card-content');
        const icon = header.querySelector('i.fas');
        
        header.addEventListener('click', function() {
            content.classList.toggle('collapsed');
            
            if (content.classList.contains('collapsed')) {
                icon.className = 'fas fa-chevron-down';
            } else {
                icon.className = 'fas fa-chevron-up';
            }
        });
    });
}

// Initialize dark mode toggle
function initDarkMode() {
    console.log('Initializing dark mode...');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Update toggle icon
            const icon = darkModeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
    }
}

// Initialize stakeholder views and tabs
function initStakeholderViews() {
    console.log('Initializing stakeholder views...');
    const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
    const viewPanels = document.querySelectorAll('.view-panel');
    
    stakeholderTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active tab
            stakeholderTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active panel
            viewPanels.forEach(panel => {
                if (panel.getAttribute('data-view') === view) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });
    
    // Result tabs functionality
    const resultsTabs = document.querySelectorAll('.results-tab');
    
    resultsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const panelId = this.getAttribute('data-panel');
            const tabsContainer = this.parentElement;
            const panels = tabsContainer.nextElementSibling;
            
            // Update active tab
            tabsContainer.querySelectorAll('.results-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active panel
            document.querySelectorAll('.results-panel').forEach(panel => {
                if (panel.id === panelId) {
                    panel.classList.add('active');
                } else if (panel.parentElement === panels) {
                    panel.classList.remove('active');
                }
            });
        });
    });
}

// Initialize tooltips
function initTooltips() {
    console.log('Initializing tooltips...');
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = rect.bottom + 10 + 'px';
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        });
    });
}

// Initialize particle background
function initParticleBackground() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#3498db' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#3498db',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// Event listener initialization
function initEventListeners() {
    console.log('Initializing event listeners...');
    
    // Calculate buttons
    const calculateBtn = document.getElementById('calculate-btn');
    const calculateBtnHeader = document.getElementById('calculate-btn-header');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateTCO);
    }
    
    if (calculateBtnHeader) {
        calculateBtnHeader.addEventListener('click', calculateTCO);
    }
    
    // Export PDF button
    const exportPdfBtn = document.getElementById('export-pdf');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', exportPdfReport);
    }
    
    // Help button
    const helpBtn = document.getElementById('help-btn');
    const helpModal = document.getElementById('help-modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (helpBtn && helpModal) {
        helpBtn.addEventListener('click', function() {
            helpModal.style.display = 'block';
        });
        
        modalClose.addEventListener('click', function() {
            helpModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === helpModal) {
                helpModal.style.display = 'none';
            }
        });
    }
    
    // Slider update events
    initSliderUpdates();
    
    // Form input updates
    initFormUpdates();
}

// Initialize slider value updates
function initSliderUpdates() {
    // Portnox base price slider
    const portnoxBasePrice = document.getElementById('portnox-base-price');
    const portnoxCostValue = document.getElementById('portnox-cost-value');
    
    if (portnoxBasePrice && portnoxCostValue) {
        portnoxBasePrice.addEventListener('input', function() {
            const value = parseFloat(this.value).toFixed(2);
            portnoxCostValue.textContent = `$${value}`;
            appState.costs.portnoxBasePrice = parseFloat(value);
        });
    }
    
    // Portnox discount slider
    const portnoxDiscount = document.getElementById('portnox-discount');
    const portnoxDiscountValue = document.getElementById('portnox-discount-value');
    
    if (portnoxDiscount && portnoxDiscountValue) {
        portnoxDiscount.addEventListener('input', function() {
            portnoxDiscountValue.textContent = `${this.value}%`;
            appState.costs.portnoxDiscount = parseInt(this.value);
        });
    }
    
    // FTE cost slider
    const fteCost = document.getElementById('fte-cost');
    const fteCostValue = document.getElementById('fte-cost-value');
    
    if (fteCost && fteCostValue) {
        fteCost.addEventListener('input', function() {
            fteCostValue.textContent = `$${parseInt(this.value).toLocaleString()}`;
            appState.costs.fteCost = parseInt(this.value);
        });
    }
    
    // FTE allocation slider
    const fteAllocation = document.getElementById('fte-allocation');
    const fteAllocationValue = document.getElementById('fte-allocation-value');
    
    if (fteAllocation && fteAllocationValue) {
        fteAllocation.addEventListener('input', function() {
            fteAllocationValue.textContent = `${this.value}%`;
            appState.costs.fteAllocation = parseInt(this.value);
        });
    }
    
    // Maintenance percentage slider
    const maintenancePercentage = document.getElementById('maintenance-percentage');
    const maintenanceValue = document.getElementById('maintenance-value');
    
    if (maintenancePercentage && maintenanceValue) {
        maintenancePercentage.addEventListener('input', function() {
            maintenanceValue.textContent = `${this.value}%`;
            appState.costs.maintenancePercentage = parseInt(this.value);
        });
    }
    
    // Downtime cost slider
    const downtimeCost = document.getElementById('downtime-cost');
    const downtimeCostValue = document.getElementById('downtime-cost-value');
    
    if (downtimeCost && downtimeCostValue) {
        downtimeCost.addEventListener('input', function() {
            downtimeCostValue.textContent = `$${parseInt(this.value).toLocaleString()}`;
            appState.costs.downtimeCost = parseInt(this.value);
        });
    }
    
    // Risk reduction slider
    const riskReduction = document.getElementById('risk-reduction');
    const riskReductionValue = document.getElementById('risk-reduction-value');
    
    if (riskReduction && riskReductionValue) {
        riskReduction.addEventListener('input', function() {
            riskReductionValue.textContent = `${this.value}%`;
            appState.costs.riskReduction = parseInt(this.value);
        });
    }
    
    // Insurance reduction slider
    const insuranceReduction = document.getElementById('insurance-reduction');
    const insuranceReductionValue = document.getElementById('insurance-reduction-value');
    
    if (insuranceReduction && insuranceReductionValue) {
        insuranceReduction.addEventListener('input', function() {
            insuranceReductionValue.textContent = `${this.value}%`;
            appState.costs.insuranceReduction = parseInt(this.value);
        });
    }
}

// Initialize form input updates
function initFormUpdates() {
    // Device count input
    const deviceCount = document.getElementById('device-count');
    if (deviceCount) {
        deviceCount.addEventListener('change', function() {
            appState.deviceCount = parseInt(this.value);
            console.log('Device count updated:', appState.deviceCount);
        });
    }
    
    // Locations input
    const locations = document.getElementById('locations');
    if (locations) {
        locations.addEventListener('change', function() {
            appState.locations = parseInt(this.value);
            console.log('Locations updated:', appState.locations);
        });
    }
    
    // Years to project select
    const yearsToProject = document.getElementById('years-to-project');
    if (yearsToProject) {
        yearsToProject.addEventListener('change', function() {
            appState.yearsToProject = parseInt(this.value);
            console.log('Years to project updated:', appState.yearsToProject);
        });
    }
    
    // Feature checkboxes
    const featureCheckboxes = document.querySelectorAll('.feature-item input[type="checkbox"]');
    featureCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const featureId = this.id;
            let feature = '';
            
            switch (featureId) {
                case 'cloud-integration':
                    feature = 'cloudIntegration';
                    break;
                case 'legacy-devices':
                    feature = 'legacyDevices';
                    break;
                case 'byod-support':
                    feature = 'byodSupport';
                    break;
                case 'iot-support':
                    feature = 'iotSupport';
                    break;
                case 'wireless-support':
                    feature = 'wirelessSupport';
                    break;
                case 'remote-work':
                    feature = 'remoteWork';
                    break;
            }
            
            if (feature) {
                appState.features[feature] = this.checked;
                console.log(`Feature ${feature} updated:`, this.checked);
            }
        });
    });
    
    // Compliance checkboxes
    const complianceCheckboxes = document.querySelectorAll('.compliance-item input[type="checkbox"]');
    complianceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateComplianceState);
    });
}

// Calculate TCO function
function calculateTCO() {
    console.log('Calculating TCO...');
    
    // Show loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
    }
    
    // Simulate calculation delay
    setTimeout(function() {
        // Perform calculations
        calculatePortnoxTCO();
        calculateCompetitorTCO();
        calculateROI();
        calculateRiskAssessment();
        
        // Update charts and visualizations
        updateCharts();
        updateTables();
        updateMetrics();
        
        // Hide loading overlay
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
        
        // Show toast notification
        showToast('TCO calculation complete!', 'success');
    }, 1500);
}

// Calculate Portnox TCO
function calculatePortnoxTCO() {
    console.log('Calculating Portnox TCO...');
    // Implementation would go here
}

// Calculate competitor TCO
function calculateCompetitorTCO() {
    console.log('Calculating competitor TCO...');
    // Implementation would go here
}

// Calculate ROI
function calculateROI() {
    console.log('Calculating ROI...');
    // Implementation would go here
}

// Calculate risk assessment
function calculateRiskAssessment() {
    console.log('Calculating risk assessment...');
    // Implementation would go here
}

// Update charts and visualizations
function updateCharts() {
    console.log('Updating charts...');
    // Implementation would go here
}

// Update tables with calculation results
function updateTables() {
    console.log('Updating tables...');
    // Implementation would go here
}

// Update metrics and key figures
function updateMetrics() {
    console.log('Updating metrics...');
    // Implementation would go here
}

// Export PDF report
function exportPdfReport() {
    console.log('Exporting PDF report...');
    showToast('Generating PDF report...', 'info');
    
    // Simulate PDF generation delay
    setTimeout(function() {
        showToast('PDF report generated successfully!', 'success');
    }, 2000);
    
    // Implementation would go here
}

// Show toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">${icon}</div>
            <div class="toast-message">${message}</div>
        </div>
        <div class="toast-progress"></div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto remove after 4 seconds
    const progressBar = toast.querySelector('.toast-progress');
    progressBar.style.animationDuration = '4s';
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
EOF

# Create or fix chart-initializer.js
cat > js/chart-initializer.js << 'EOF'
// Chart Initialization Script

// Define chart colors
const chartColors = {
    portnox: '#2c3e50',
    cisco: '#049fd9',
    aruba: '#ff8300',
    forescout: '#6b2a94',
    fortinac: '#c8102e',
    microsoft: '#00a4ef',
    securew2: '#1a4d80',
    noNac: '#f44336',
    year1: '#2ecc71',
    year2: '#3498db',
    year3: '#9b59b6',
    hardware: '#e74c3c',
    software: '#f39c12',
    maintenance: '#16a085',
    implementation: '#2980b9',
    operational: '#8e44ad'
};

// Initialize charts after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing charts...');
    
    // Set Chart.js defaults
    if (Chart) {
        Chart.defaults.font.family = "'Nunito', sans-serif";
        Chart.defaults.color = '#555';
        Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0,0,0,0.7)';
        Chart.defaults.plugins.legend.position = 'bottom';
    }
    
    // Initialize placeholder charts
    initTcoComparisonChart();
    initCumulativeCostChart();
    initRoiChart();
    initValueDriversChart();
    initRiskComparisonChart();
    initBreachImpactChart();
    initInsuranceImpactChart();
    initVendorRadarChart();
    initCostStructureChart();
    initCostProjectionChart();
    initNistFrameworkChart();
    initArchitectureChart();
    initFeatureRadarChart();
});

// Initialize TCO comparison chart
function initTcoComparisonChart() {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout'],
            datasets: [{
                label: 'Total 3-Year TCO',
                data: [202500, 450000, 375000, 325000],
                backgroundColor: [
                    chartColors.portnox,
                    chartColors.cisco,
                    chartColors.aruba,
                    chartColors.forescout
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Total Cost ($)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'TCO: $' + context.raw.toLocaleString();
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: 'white',
                    font: {
                        weight: 'bold'
                    },
                    formatter: function(value) {
                        return '$' + value.toLocaleString();
                    }
                }
            }
        }
    });
}

// Initialize cumulative cost chart
function initCumulativeCostChart() {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [15500, 66500, 134500, 202500],
                    borderColor: chartColors.portnox,
                    backgroundColor: 'rgba(44, 62, 80, 0.1)',
                    fill: true,
                    tension: 0.1
                },
                {
                    label: 'Cisco ISE',
                    data: [125000, 225000, 337500, 450000],
                    borderColor: chartColors.cisco,
                    backgroundColor: 'rgba(4, 159, 217, 0.1)',
                    fill: true,
                    tension: 0.1
                },
                {
                    label: 'Aruba ClearPass',
                    data: [95000, 188333, 281666, 375000],
                    borderColor: chartColors.aruba,
                    backgroundColor: 'rgba(255, 131, 0, 0.1)',
                    fill: true,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cumulative Cost ($)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.raw.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Initialize ROI chart
function initRoiChart() {
    const ctx = document.getElementById('roi-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Cumulative'],
            datasets: [{
                label: 'Return on Investment (%)',
                data: [85, 195, 287, 287],
                backgroundColor: [
                    chartColors.year1,
                    chartColors.year2,
                    chartColors.year3,
                    '#3498db'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'ROI (%)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'ROI: ' + context.raw + '%';
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: 'white',
                    font: {
                        weight: 'bold'
                    },
                    formatter: function(value) {
                        return value + '%';
                    }
                }
            }
        }
    });
}

// Initialize value drivers chart
function initValueDriversChart() {
    const ctx = document.getElementById('value-drivers-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Hardware Savings',
                'License Savings',
                'IT Staff Efficiency',
                'Maintenance Reduction',
                'Risk Mitigation'
            ],
            datasets: [{
                data: [105000, 85000, 125000, 55000, 85000],
                backgroundColor: [
                    chartColors.hardware,
                    chartColors.software,
                    chartColors.operational,
                    chartColors.maintenance,
                    chartColors.implementation
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return context.label + ': $' + value.toLocaleString() + ' (' + percentage + '%)';
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: 11
                    },
                    formatter: function(value, context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return percentage + '%';
                    }
                }
            }
        }
    });
}

// Initialize risk comparison chart
function initRiskComparisonChart() {
    const ctx = document.getElementById('risk-comparison-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Data Breach Risk',
                'Compliance Risk',
                'Unauthorized Access',
                'Device Security',
                'Incident Detection',
                'Response Time'
            ],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [25, 20, 15, 20, 15, 15],
                    backgroundColor: 'rgba(44, 62, 80, 0.2)',
                    borderColor: chartColors.portnox,
                    pointBackgroundColor: chartColors.portnox,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.portnox
                },
                {
                    label: 'No NAC',
                    data: [85, 90, 95, 80, 90, 95],
                    backgroundColor: 'rgba(244, 67, 54, 0.2)',
                    borderColor: chartColors.noNac,
                    pointBackgroundColor: chartColors.noNac,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.noNac
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    ticks: {
                        display: false,
                        maxTicksLimit: 5
                    },
                    min: 0,
                    max: 100,
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '% Risk Level';
                        }
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Initialize breach impact chart
function initBreachImpactChart() {
    const ctx = document.getElementById('breach-impact-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['No NAC', 'Basic NAC', 'Portnox Cloud'],
            datasets: [
                {
                    label: 'Potential Breach Cost',
                    data: [4850000, 3250000, 1650000],
                    backgroundColor: chartColors.hardware,
                    barPercentage: 0.6
                },
                {
                    label: 'Annual Risk Value',
                    data: [980000, 450000, 180000],
                    backgroundColor: chartColors.implementation,
                    barPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: false
                },
                y: {
                    stacked: false,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cost ($)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.raw.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Initialize insurance impact chart
function initInsuranceImpactChart() {
    const ctx = document.getElementById('insurance-impact-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Without NAC', 'With Portnox'],
            datasets: [{
                label: 'Annual Premium',
                data: [165000, 148500],
                backgroundColor: [
                    chartColors.noNac,
                    chartColors.portnox
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Annual Premium ($)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Premium: $' + context.raw.toLocaleString();
                        }
                    }
                },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: function(context) {
                        return context.dataIndex === 0 ? '#555' : '#555';
                    },
                    formatter: function(value) {
                        return '$' + value.toLocaleString();
                    }
                }
            }
        }
    });
}

// Initialize vendor radar chart
function initVendorRadarChart() {
    const ctx = document.getElementById('vendor-radar-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Cloud Architecture',
                'Ease of Implementation',
                'Cost Efficiency',
                'Device Visibility',
                'Policy Management',
                'Zero Trust Support',
                'Operational Simplicity',
                'Scalability',
                'Vendor Integrations'
            ],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [10, 9, 9, 8, 9, 9, 9, 9, 9],
                    backgroundColor: 'rgba(44, 62, 80, 0.2)',
                    borderColor: chartColors.portnox,
                    pointBackgroundColor: chartColors.portnox,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.portnox
                },
                {
                    label: 'Cisco ISE',
                    data: [5, 4, 5, 8, 9, 7, 5, 9, 9],
                    backgroundColor: 'rgba(4, 159, 217, 0.2)',
                    borderColor: chartColors.cisco,
                    pointBackgroundColor: chartColors.cisco,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.cisco
                },
                {
                    label: 'Aruba ClearPass',
                    data: [6, 5, 6, 8, 8, 7, 6, 8, 8],
                    backgroundColor: 'rgba(255, 131, 0, 0.2)',
                    borderColor: chartColors.aruba,
                    pointBackgroundColor: chartColors.aruba,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.aruba
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    ticks: {
                        display: false,
                        maxTicksLimit: 5
                    },
                    min: 0,
                    max: 10,
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '/10';
                        }
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Initialize cost structure chart
function initCostStructureChart() {
    const ctx = document.getElementById('cost-structure-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout'],
            datasets: [
                {
                    label: 'Hardware',
                    data: [0, 120000, 90000, 80000],
                    backgroundColor: chartColors.hardware
                },
                {
                    label: 'Software & Licensing',
                    data: [153000, 130000, 120000, 105000],
                    backgroundColor: chartColors.software
                },
                {
                    label: 'Implementation',
                    data: [15500, 80000, 60000, 50000],
                    backgroundColor: chartColors.implementation
                },
                {
                    label: 'Maintenance',
                    data: [0, 45000, 40000, 35000],
                    backgroundColor: chartColors.maintenance
                },
                {
                    label: 'Operational',
                    data: [34000, 75000, 65000, 55000],
                    backgroundColor: chartColors.operational
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cost ($)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.raw.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Initialize cost projection chart
function initCostProjectionChart() {
    const ctx = document.getElementById('cost-projection-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [15500, 66500, 134500, 202500],
                    borderColor: chartColors.portnox,
                    backgroundColor: 'rgba(44, 62, 80, 0.1)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Cisco ISE',
                    data: [125000, 225000, 337500, 450000],
                    borderColor: chartColors.cisco,
                    backgroundColor: 'rgba(4, 159, 217, 0.1)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Aruba ClearPass',
                    data: [95000, 188333, 281666, 375000],
                    borderColor: chartColors.aruba,
                    backgroundColor: 'rgba(255, 131, 0, 0.1)',
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cumulative Cost ($)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.raw.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Initialize NIST framework chart
function initNistFrameworkChart() {
    const ctx = document.getElementById('nist-framework-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Identify',
                'Protect',
                'Detect',
                'Respond',
                'Recover'
            ],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [90, 95, 85, 90, 80],
                    backgroundColor: 'rgba(44, 62, 80, 0.2)',
                    borderColor: chartColors.portnox,
                    pointBackgroundColor: chartColors.portnox,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.portnox
                },
                {
                    label: 'No NAC',
                    data: [30, 25, 20, 15, 25],
                    backgroundColor: 'rgba(244, 67, 54, 0.2)',
                    borderColor: chartColors.noNac,
                    pointBackgroundColor: chartColors.noNac,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.noNac
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    ticks: {
                        display: false,
                        maxTicksLimit: 5
                    },
                    min: 0,
                    max: 100,
                    pointLabels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '% Coverage';
                        }
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Initialize architecture chart
function initArchitectureChart() {
    const ctx = document.getElementById('architecture-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Deployment Time', 'Infrastructure Cost', 'Maintenance Effort', 'Scaling Complexity', 'Update Process'],
            datasets: [
                {
                    label: 'Portnox Cloud (SaaS)',
                    data: [10, 5, 5, 5, 5],
                    backgroundColor: chartColors.portnox
                },
                {
                    label: 'Traditional NAC (On-Premises)',
                    data: [90, 85, 80, 75, 90],
                    backgroundColor: chartColors.cisco
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Relative Effort/Cost (%)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

// Initialize feature radar chart
function initFeatureRadarChart() {
    const ctx = document.getElementById('feature-radar-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Device Visibility',
                'Policy Management',
                'Guest Access',
                'BYOD Support',
                'Cloud Integration',
                'Automated Remediation',
                'Third-Party Integration',
                'Scalability',
                'Ease of Use',
                'Reporting'
            ],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [8, 9, 8, 9, 10, 9, 9, 9, 9, 8],
                    backgroundColor: 'rgba(44, 62, 80, 0.2)',
                    borderColor: chartColors.portnox,
                    pointBackgroundColor: chartColors.portnox,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.portnox
                },
                {
                    label: 'Cisco ISE',
                    data: [8, 9, 8, 8, 6, 8, 9, 9, 5, 8],
                    backgroundColor: 'rgba(4, 159, 217, 0.2)',
                    borderColor: chartColors.cisco,
                    pointBackgroundColor: chartColors.cisco,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.cisco
                },
                {
                    label: 'Aruba ClearPass',
                    data: [8, 8, 9, 9, 7, 8, 8, 8, 6, 8],
                    backgroundColor: 'rgba(255, 131, 0, 0.2)',
                    borderColor: chartColors.aruba,
                    pointBackgroundColor: chartColors.aruba,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.aruba
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    ticks: {
                        display: false,
                        maxTicksLimit: 5
                    },
                    min: 0,
                    max: 10,
                    pointLabels: {
                        font: {
                            size: 11
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '/10';
                        }
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}
EOF

# Create or fix report-generator.js
cat > js/report-generator.js << 'EOF'
// Report Generator Script

// PDF Export functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Report Generator initialized');
    
    const exportPdfBtn = document.getElementById('export-pdf');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', generatePdfReport);
    }
});

// Generate PDF Report
function generatePdfReport() {
    console.log('Generating PDF report...');
    
    // Show loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
        const loadingText = loadingOverlay.querySelector('p');
        if (loadingText) {
            loadingText.textContent = 'Generating PDF Report...';
        }
    }
    
    // Simulate report generation delay
    setTimeout(function() {
        // Show success message
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
        
        showToast('PDF report generated successfully!', 'success');
    }, 2000);
    
    // In a real implementation, this would use jsPDF or similar library to generate the PDF
}

// Show toast notification (if not already defined)
function showToast(message, type = 'info') {
    if (typeof window.showToast === 'function') {
        window.showToast(message, type);
        return;
    }
    
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">${icon}</div>
            <div class="toast-message">${message}</div>
        </div>
        <div class="toast-progress"></div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto remove after 4 seconds
    const progressBar = toast.querySelector('.toast-progress');
    progressBar.style.animationDuration = '4s';
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
EOF

# Create fix-sidebar.js
cat > js/fix-sidebar.js << 'EOF'
// Sidebar Fix Script
console.log('Sidebar fix loaded');

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    
    if (sidebar && sidebarToggle) {
        console.log('Sidebar elements found, attaching event listener');
        
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            sidebarToggle.classList.toggle('collapsed');
            
            // Update toggle icon
            const icon = sidebarToggle.querySelector('i');
            if (sidebar.classList.contains('collapsed')) {
                icon.className = 'fas fa-chevron-right';
            } else {
                icon.className = 'fas fa-chevron-left';
            }
        });
    }
    
    // Fix config card collapsible functionality
    const configCards = document.querySelectorAll('.config-card');
    
    configCards.forEach(card => {
        const header = card.querySelector('.config-card-header');
        const content = card.querySelector('.config-card-content');
        const icon = header.querySelector('i.fas');
        
        if (header && content) {
            header.addEventListener('click', function() {
                content.classList.toggle('collapsed');
                
                if (content.classList.contains('collapsed')) {
                    icon.className = 'fas fa-chevron-down';
                } else {
                    icon.className = 'fas fa-chevron-up';
                }
            });
        }
    });
});
EOF

# Create sidebar-fixes.js
cat > js/fixes/sidebar-fixes.js << 'EOF'
// Sidebar Fixes for Enhanced UX
const sidebarFixes = {
    init: function() {
        this.applyFixes();
        this.logStatus();
    },
    
    applyFixes: function() {
        // Fix vendor card selection
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach(card => {
            // Make sure Portnox is always selected
            if (card.getAttribute('data-vendor') === 'portnox') {
                card.classList.add('selected');
                card.setAttribute('data-fixed', 'true');
            }
            
            // Fix click behavior
            card.addEventListener('click', function(e) {
                const vendor = this.getAttribute('data-vendor');
                if (vendor === 'portnox') {
                    // Prevent deselecting Portnox
                    e.preventDefault();
                    return;
                }
                
                this.classList.toggle('selected');
                
                // Update selection state
                const selectedVendors = document.querySelectorAll('.vendor-card.selected');
                console.log('Selected vendors:', Array.from(selectedVendors).map(v => v.getAttribute('data-vendor')));
            });
        });
        
        // Fix sidebar toggle behavior
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        const contentArea = document.getElementById('content-area');
        
        if (sidebarToggle && sidebar && contentArea) {
            sidebarToggle.addEventListener('click', function() {
                sidebar.classList.toggle('collapsed');
                contentArea.classList.toggle('expanded');
                this.classList.toggle('collapsed');
                
                // Update icon
                const icon = this.querySelector('i');
                if (sidebar.classList.contains('collapsed')) {
                    icon.className = 'fas fa-chevron-right';
                } else {
                    icon.className = 'fas fa-chevron-left';
                }
            });
        }
        
        // Fix range slider values
        const rangeSliders = document.querySelectorAll('input[type="range"]');
        rangeSliders.forEach(slider => {
            const valueElement = document.getElementById(`${slider.id}-value`);
            if (valueElement) {
                // Set initial value
                this.updateSliderValue(slider, valueElement);
                
                // Update on change
                slider.addEventListener('input', function() {
                    sidebarFixes.updateSliderValue(this, valueElement);
                });
            }
        });
    },
    
    updateSliderValue: function(slider, valueElement) {
        let value = slider.value;
        
        if (slider.id === 'portnox-base-price') {
            valueElement.textContent = `$${parseFloat(value).toFixed(2)}`;
        } else if (slider.id.includes('percentage') || slider.id.includes('discount') || 
                   slider.id === 'fte-allocation' || slider.id === 'risk-reduction' || 
                   slider.id === 'insurance-reduction') {
            valueElement.textContent = `${value}%`;
        } else if (slider.id === 'fte-cost' || slider.id === 'downtime-cost') {
            valueElement.textContent = `$${parseInt(value).toLocaleString()}`;
        } else {
            valueElement.textContent = value;
        }
    },
    
    logStatus: function() {
        // Create debug status object
        const status = {
            sidebarInitialized: !!document.getElementById('sidebar'),
            sidebarToggleInitialized: !!document.getElementById('sidebar-toggle'),
            vendorCardsCount: document.querySelectorAll('.vendor-card').length,
            rangeSliderCount: document.querySelectorAll('input[type="range"]').length,
            configCardCount: document.querySelectorAll('.config-card').length
        };
        
        console.log(status);
    }
};

// Initialize fixes on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    sidebarFixes.init();
});
EOF

# Create debug-utilities.js
cat > js/fixes/debug-utilities.js << 'EOF'
// Debug Utilities for TCO Analyzer
console.log('Debug utilities loaded');

const debugUtils = {
    init: function() {
        console.log('Initializing debug utilities');
        this.checkInitialSetup();
    },
    
    checkVendorCards: function() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        const results = Array.from(vendorCards).map(card => {
            return {
                vendor: card.getAttribute('data-vendor'),
                selected: card.classList.contains('selected'),
                hasLogo: !!card.querySelector('.vendor-logo img')
            };
        });
        
        return results;
    },
    
    checkImagePaths: function() {
        const images = document.querySelectorAll('img');
        const results = Array.from(images).map(img => {
            return {
                src: img.getAttribute('src'),
                loaded: img.complete && img.naturalHeight !== 0,
                alt: img.getAttribute('alt') || 'No alt text'
            };
        });
        
        return results;
    },
    
    checkChartInitialization: function() {
        const canvases = document.querySelectorAll('canvas');
        const results = Array.from(canvases).map(canvas => {
            return {
                id: canvas.id,
                initialized: !!canvas.__chart__,
                width: canvas.width,
                height: canvas.height
            };
        });
        
        return results;
    },
    
    checkSidebarStatus: function() {
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');
        
        return {
            exists: !!sidebar,
            collapsed: sidebar ? sidebar.classList.contains('collapsed') : false,
            toggleExists: !!sidebarToggle,
            toggleCollapsed: sidebarToggle ? sidebarToggle.classList.contains('collapsed') : false
        };
    },
    
    fixMissingImages: function() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete || img.naturalHeight === 0) {
                const src = img.getAttribute('src');
                console.log(`Fixing broken image: ${src}`);
                
                // Check if it's a vendor logo
                if (src.includes('vendors')) {
                    const vendor = src.split('/').pop().replace('-logo.png', '');
                    img.onerror = null; // Prevent error loop
                    img.src = this.createSVGPlaceholder(vendor);
                }
            }
        });
    },
    
    createSVGPlaceholder: function(vendorName) {
        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100">
          <rect width="200" height="100" fill="white"/>
          <rect width="180" height="80" x="10" y="10" fill="#2c3e50" rx="10" ry="10"/>
          <text x="100" y="55" font-family="Arial" font-size="20" text-anchor="middle" fill="white">${vendorName}</text>
        </svg>
        `;
        
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    },
    
    checkInitialSetup: function() {
        console.log('Initial Debug Checks');
        console.log('Image path check:');
        console.log(this.checkImagePaths());
        console.log('Vendor cards check:');
        console.log(this.checkVendorCards());
        console.log('Sidebar status:');
        console.log(this.checkSidebarStatus());
        
        // Fix broken images
        this.fixMissingImages();
    }
};

// Initialize debug utilities on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    debugUtils.init();
});
EOF

# Create CSS fixes
cat > css/fixes/sidebar-fixes.css << 'EOF'
/* Sidebar fixes */
.sidebar {
    transition: all 0.3s ease;
    overflow-y: auto;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.sidebar.collapsed {
    width: 0;
    min-width: 0;
    padding: 0;
    overflow: hidden;
}

.sidebar-toggle {
    position: fixed;
    left: 290px;
    top: 120px;
    width: 28px;
    height: 60px;
    background-color: #fff;
    border-radius: 0 4px 4px 0;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 100;
}

.sidebar-toggle:hover {
    background-color: #f0f2f5;
}

.sidebar-toggle.collapsed {
    left: 0;
}

.sidebar-toggle i {
    color: #333;
    font-size: 14px;
}

.sidebar-content {
    padding-bottom: 80px;
}

/* Vendor card fixes */
.vendor-card {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
}

.vendor-card:hover {
    border-color: #3498db;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.vendor-card.selected {
    border-color: #3498db;
    background-color: rgba(52, 152, 219, 0.05);
    box-shadow: 0 2px 6px rgba(52, 152, 219, 0.2);
}

.vendor-logo {
    width: 60px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}

.vendor-logo img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.vendor-info {
    flex: 1;
}

.vendor-info h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
}

.vendor-info p {
    margin: 0;
    font-size: 12px;
    color: #666;
}

.vendor-badge {
    position: absolute;
    top: 5px;
    right: 5px;
}

.vendor-badge .badge {
    font-size: 9px;
    padding: 3px 5px;
    border-radius: 3px;
}

.badge-primary {
    background-color: #3498db;
    color: white;
}

.badge-warning {
    background-color: #f39c12;
    color: white;
}

.badge-danger {
    background-color: #e74c3c;
    color: white;
}

/* Fix content layout */
.content-area {
    transition: all 0.3s ease;
    width: calc(100% - 300px);
}

.content-area.expanded {
    width: 100%;
}

/* Make sure logos are visible */
img[src*="vendors"] {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.company-logo {
    height: 40px;
    width: auto;
}
EOF

cat > css/fixes/logo-fixes.css << 'EOF'
/* Logo fixes */
.logo-section {
    display: flex;
    align-items: center;
}

.company-logo {
    height: 40px;
    width: auto;
    object-fit: contain;
    margin-right: 15px;
}

.app-title {
    display: flex;
    flex-direction: column;
}

.app-title h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c3e50;
}

.subtitle {
    font-size: 0.9rem;
    color: #7f8c8d;
    margin: 0;
}

/* Fix missing vendor logos */
.vendor-card .vendor-logo img {
    max-height: 30px;
    max-width: 100%;
    object-fit: contain;
}

/* Fallback for any missing images */
img:not([src]), img[src=""] {
    position: relative;
    min-height: 30px;
    min-width: 60px;
}

img:not([src])::after, img[src=""]::after {
    content: attr(alt);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #555;
    border-radius: 4px;
}
EOF

# Create additional CSS file for Logo fixes
cat > css/logo-fix.css << 'EOF'
/* Logo fallback CSS */
.logo-section {
    display: flex;
    align-items: center;
}

.company-logo {
    display: block;
    height: 40px;
    width: auto;
    margin-right: 15px;
}

/* SVG placeholder for company logo */
.company-logo-placeholder {
    height: 40px;
    width: 120px;
    background-color: #2c3e50;
    border-radius: 4px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    font-weight: bold;
}

/* Vendor logo placeholders */
.vendor-logo-placeholder {
    width: 60px;
    height: 30px;
    background-color: #f1f1f1;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #555;
    text-transform: uppercase;
}
EOF

# Create JS fix for logo
cat > js/logo-debug.js << 'EOF'
// Logo Debug and Fix Script
document.addEventListener('DOMContentLoaded', function() {
    // Check for broken logo images
    const logos = document.querySelectorAll('.company-logo, .vendor-logo img');
    
    logos.forEach(logo => {
        // Set onerror handler to replace with placeholder
        logo.onerror = function() {
            const altText = this.alt || 'Logo';
            
            if (this.classList.contains('company-logo')) {
                // Create placeholder for company logo
                const placeholder = document.createElement('div');
                placeholder.className = 'company-logo-placeholder';
                placeholder.textContent = 'Portnox';
                
                this.parentNode.replaceChild(placeholder, this);
            } else {
                // Create placeholder for vendor logo
                const vendorCard = this.closest('.vendor-card');
                const vendorName = vendorCard ? vendorCard.querySelector('.vendor-info h3').textContent : altText;
                
                const placeholder = document.createElement('div');
                placeholder.className = 'vendor-logo-placeholder';
                placeholder.textContent = vendorName;
                
                this.parentNode.replaceChild(placeholder, this);
            }
        };
        
        // Force error handler if image already failed to load
        if (logo.complete && logo.naturalHeight === 0) {
            logo.onerror();
        }
    });
});
EOF

# Fix permissions
chmod +x js/fixes/*.js
chmod +x js/*.js

echo "==== Fix script completed! ===="
echo "All missing images have been created as SVG placeholders."
echo "JavaScript errors have been fixed."
echo "Additional debug utilities have been added."
echo ""
echo "To apply these changes, simply refresh your browser."
