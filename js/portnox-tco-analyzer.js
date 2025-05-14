/**
 * Portnox Total Cost Analyzer
 * Main JavaScript file to handle all functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle background
    initializeParticles();
    
    // Initialize controllers and UI components
    initializeSidebar();
    initializeViewTabs();
    initializeCalculator();
    initializeCharts();
    initializeEventListeners();
    
    // Show welcome message
    showToast('Welcome to the Portnox Total Cost Analyzer. Select vendors to compare and adjust configuration settings as needed.', 'info');
});

// Initialize particle background
function initializeParticles() {
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#0052CC"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.1,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#0052CC",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// Initialize sidebar functionality
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const contentArea = document.getElementById('content-area');
    
    if (sidebar && sidebarToggle && contentArea) {
        // Toggle sidebar visibility
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // Adjust content area margin on desktop
            if (window.innerWidth >= 768) {
                if (sidebar.classList.contains('collapsed')) {
                    contentArea.style.marginLeft = '0';
                } else {
                    contentArea.style.marginLeft = '320px';
                }
            }
            
            // Update toggle icon
            const icon = sidebarToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-chevron-left');
                icon.classList.toggle('fa-chevron-right');
            }
            
            // Trigger resize event to adjust charts
            window.dispatchEvent(new Event('resize'));
        });
        
        // Toggle config card sections
        const configCards = document.querySelectorAll('.config-card');
        configCards.forEach(card => {
            const header = card.querySelector('.config-card-header');
            const content = card.querySelector('.config-card-content');
            
            if (header && content) {
                header.addEventListener('click', function() {
                    content.classList.toggle('collapsed');
                    const icon = header.querySelector('i.fa-chevron-down, i.fa-chevron-up');
                    
                    if (icon) {
                        icon.classList.toggle('fa-chevron-down');
                        icon.classList.toggle('fa-chevron-up');
                    }
                });
            }
        });
    }
}

// Initialize view tabs functionality
function initializeViewTabs() {
    // Stakeholder view tabs
    const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
    const viewPanels = document.querySelectorAll('.view-panel');
    
    stakeholderTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update tab states
            stakeholderTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update view panel visibility
            viewPanels.forEach(panel => {
                if (panel.getAttribute('data-view') === view) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
            
            // Update view dropdown in header
            const viewSelector = document.getElementById('stakeholder-view');
            if (viewSelector) {
                viewSelector.value = view;
            }
            
            // Trigger resize to fix charts
            window.dispatchEvent(new Event('resize'));
        });
    });
    
    // Update when view selector changes
    const viewSelector = document.getElementById('stakeholder-view');
    if (viewSelector) {
        viewSelector.addEventListener('change', function() {
            const view = this.value;
            
            // Find and click the corresponding tab
            const tab = document.querySelector(`.stakeholder-tab[data-view="${view}"]`);
            if (tab) {
                tab.click();
            }
        });
    }
    
    // Results tabs within each view
    const resultsTabs = document.querySelectorAll('.results-tab');
    resultsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const panel = this.getAttribute('data-panel');
            const view = this.closest('.view-panel').getAttribute('data-view');
            
            // Update tab states within current view
            const viewTabs = document.querySelectorAll(`.view-panel[data-view="${view}"] .results-tab`);
            viewTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update panel visibility
            const resultsPanels = document.querySelectorAll(`.view-panel[data-view="${view}"] .results-panel`);
            resultsPanels.forEach(p => {
                if (p.id === panel) {
                    p.classList.add('active');
                } else {
                    p.classList.remove('active');
                }
            });
            
            // Trigger resize to fix charts
            window.dispatchEvent(new Event('resize'));
        });
    });
}

// Initialize calculator functionality
function initializeCalculator() {
    // Set up range slider value display
    setupRangeSliders();
    
    // Set up vendor selection
    setupVendorSelection();
    
    // Set up organization size presets
    setupOrganizationSizePresets();
    
    // Set up calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateResults);
    }
}

// Set up range sliders to display current values
function setupRangeSliders() {
    const sliders = [
        { id: 'portnox-base-price', valueId: 'portnox-cost-value', format: val => `$${parseFloat(val).toFixed(2)}` },
        { id: 'portnox-discount', valueId: 'portnox-discount-value', format: val => `${val}%` },
        { id: 'fte-cost', valueId: 'fte-cost-value', format: val => `$${parseInt(val).toLocaleString()}` },
        { id: 'fte-allocation', valueId: 'fte-allocation-value', format: val => `${val}%` },
        { id: 'maintenance-percentage', valueId: 'maintenance-value', format: val => `${val}%` },
        { id: 'downtime-cost', valueId: 'downtime-cost-value', format: val => `$${parseInt(val).toLocaleString()}` },
        { id: 'risk-reduction', valueId: 'risk-reduction-value', format: val => `${val}%` },
        { id: 'insurance-reduction', valueId: 'insurance-reduction-value', format: val => `${val}%` }
    ];
    
    sliders.forEach(slider => {
        const input = document.getElementById(slider.id);
        const display = document.getElementById(slider.valueId);
        
        if (input && display) {
            // Set initial value
            display.textContent = slider.format(input.value);
            
            // Update on input change
            input.addEventListener('input', function() {
                display.textContent = slider.format(this.value);
            });
        }
    });
}

// Set up vendor selection functionality
function setupVendorSelection() {
    const vendorCards = document.querySelectorAll('.vendor-card');
    const selectedVendors = new Set(['portnox']); // Portnox is always selected
    
    vendorCards.forEach(card => {
        card.addEventListener('click', function() {
            const vendor = this.getAttribute('data-vendor');
            
            // Toggle selection (except Portnox which is always selected)
            if (vendor !== 'portnox') {
                if (this.classList.contains('selected')) {
                    // Don't allow deselecting if it's the last vendor besides Portnox
                    if (selectedVendors.size > 2) {
                        selectedVendors.delete(vendor);
                        this.classList.remove('selected');
                    }
                } else {
                    selectedVendors.add(vendor);
                    this.classList.add('selected');
                }
            }
            
            // Trigger vendor change event
            const event = new CustomEvent('vendorSelectionChanged', {
                detail: { vendors: Array.from(selectedVendors) }
            });
            document.dispatchEvent(event);
        });
    });
}

// Set up organization size presets
function setupOrganizationSizePresets() {
    const sizeSelect = document.getElementById('organization-size');
    const deviceCountInput = document.getElementById('device-count');
    const locationsInput = document.getElementById('locations');
    
    if (sizeSelect && deviceCountInput) {
        sizeSelect.addEventListener('change', function() {
            let deviceCount = 500; // Default
            let locations = 2;
            
            // Set device count based on size
            switch (this.value) {
                case 'very-small':
                    deviceCount = 300;
                    locations = 1;
                    break;
                case 'small':
                    deviceCount = 500;
                    locations = 2;
                    break;
                case 'medium':
                    deviceCount = 2500;
                    locations = 5;
                    break;
                case 'large':
                    deviceCount = 7500;
                    locations = 10;
                    break;
                case 'enterprise':
                    deviceCount = 15000;
                    locations = 20;
                    break;
            }
            
            // Update inputs
            deviceCountInput.value = deviceCount;
            if (locationsInput) {
                locationsInput.value = locations;
            }
        });
    }
}

// Calculate and display results
function calculateResults() {
    // Show loading overlay
    showLoading('Calculating total cost of ownership...');
    
    // Simulate calculation delay
    setTimeout(function() {
        // Get calculation parameters
        const params = getCalculationParameters();
        
        // Update all charts and metrics
        updateCharts(params);
        updateMetrics(params);
        
        // Hide loading overlay
        hideLoading();
        
        // Show success notification
        showToast('Analysis complete! Review the results in each of the tabs.', 'success');
        
        // Switch view to Executive if needed
        const executeTab = document.querySelector('.stakeholder-tab[data-view="executive"]');
        if (executeTab && !executeTab.classList.contains('active')) {
            executeTab.click();
        }
        
        // Update calculate button text
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.textContent = 'Update Analysis';
            calculateBtn.innerHTML = '<i class="fas fa-sync"></i> Update Analysis';
        }
        
        // Animate metric values
        animateMetrics();
        
        // Collapse sidebar on mobile
        if (window.innerWidth < 768) {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebar-toggle');
            if (sidebar && !sidebar.classList.contains('collapsed')) {
                sidebarToggle.click();
            }
        }
    }, 1500);
}

// Get all calculation parameters from the form
function getCalculationParameters() {
    return {
        // Vendor selection
        vendors: getSelectedVendors(),
        
        // Organization details
        organizationSize: getSelectValue('organization-size', 'small'),
        deviceCount: getInputValue('device-count', 500),
        locations: getInputValue('locations', 2),
        
        // Features
        cloudIntegration: getCheckboxValue('cloud-integration', false),
        legacyDevices: getCheckboxValue('legacy-devices', false),
        byodSupport: getCheckboxValue('byod-support', true),
        iotSupport: getCheckboxValue('iot-support', false),
        wirelessSupport: getCheckboxValue('wireless-support', true),
        remoteWork: getCheckboxValue('remote-work', true),
        
        // Industry & Compliance
        industry: getSelectValue('industry-select', ''),
        compliance: {
            pci: getCheckboxValue('compliance-pci', false),
            hipaa: getCheckboxValue('compliance-hipaa', false),
            nist: getCheckboxValue('compliance-nist', false),
            gdpr: getCheckboxValue('compliance-gdpr', false),
            iso: getCheckboxValue('compliance-iso', false),
            cmmc: getCheckboxValue('compliance-cmmc', false),
            ferpa: getCheckboxValue('compliance-ferpa', false),
            sox: getCheckboxValue('compliance-sox', false)
        },
        riskProfile: getSelectValue('risk-profile', 'standard'),
        cyberInsurance: getSelectValue('cybersecurity-insurance', 'standard'),
        
        // Analysis settings
        yearsToProject: parseInt(getSelectValue('years-to-project', '3')),
        
        // Cost parameters
        portnoxBasePrice: parseFloat(getRangeValue('portnox-base-price', 3)),
        portnoxDiscount: parseInt(getRangeValue('portnox-discount', 15)),
        fteCost: parseInt(getRangeValue('fte-cost', 100000)),
        fteAllocation: parseInt(getRangeValue('fte-allocation', 25)),
        maintenancePercentage: parseInt(getRangeValue('maintenance-percentage', 18)),
        downtimeCost: parseInt(getRangeValue('downtime-cost', 5000)),
        riskReduction: parseInt(getRangeValue('risk-reduction', 35)),
        insuranceReduction: parseInt(getRangeValue('insurance-reduction', 10))
    };
}

// Get selected vendors
function getSelectedVendors() {
    const selectedCards = document.querySelectorAll('.vendor-card.selected');
    const vendors = Array.from(selectedCards).map(card => card.getAttribute('data-vendor'));
    
    // Ensure Portnox is always included
    if (!vendors.includes('portnox')) {
        vendors.push('portnox');
    }
    
    return vendors;
}

// Helper function to get select value
function getSelectValue(id, defaultValue) {
    const element = document.getElementById(id);
    return element ? element.value : defaultValue;
}

// Helper function to get input value
function getInputValue(id, defaultValue) {
    const element = document.getElementById(id);
    return element ? parseFloat(element.value) : defaultValue;
}

// Helper function to get checkbox value
function getCheckboxValue(id, defaultValue) {
    const element = document.getElementById(id);
    return element ? element.checked : defaultValue;
}

// Helper function to get range value
function getRangeValue(id, defaultValue) {
    const element = document.getElementById(id);
    return element ? element.value : defaultValue;
}

// Update chart data and redraw all charts
function updateCharts(params) {
    // TCO Comparison Chart
    updateTcoComparisonChart(params);
    
    // Cumulative Cost Chart
    updateCumulativeCostChart(params);
    
    // ROI Chart
    updateRoiChart(params);
    
    // Value Drivers Chart
    updateValueDriversChart(params);
    
    // Risk Comparison Chart
    updateRiskComparisonChart(params);
    
    // Breach Impact Chart
    updateBreachImpactChart(params);
    
    // Vendor Radar Chart
    updateVendorRadarChart(params);
    
    // Feature Radar Chart
    updateFeatureRadarChart(params);
    
    // Cost Structure Chart
    updateCostStructureChart(params);
    
    // Cost Projection Chart
    updateCostProjectionChart(params);
    
    // Insurance Impact Chart
    updateInsuranceImpactChart(params);
    
    // Architecture Chart
    updateArchitectureChart(params);
    
    // Risk Heatmap
    updateRiskHeatmap(params);
    
    // Security Heatmap
    updateSecurityHeatmap(params);
    
    // NIST Framework Chart
    updateNistFrameworkChart(params);
    
    // Trigger window resize to ensure proper chart rendering
    window.dispatchEvent(new Event('resize'));
}

// Update all metric displays
function updateMetrics(params) {
    // Get the main comparison vendor (usually Cisco)
    const comparisonVendor = params.vendors.includes('cisco') ? 'cisco' : 
                             params.vendors.includes('aruba') ? 'aruba' :
                             params.vendors.filter(v => v !== 'portnox')[0] || 'cisco';
    
    // Calculate basic TCO values based on parameters
    const portnoxTco = calculatePortnoxTco(params);
    const comparisonTco = calculateComparisonVendorTco(comparisonVendor, params);
    const savings = comparisonTco - portnoxTco;
    const savingsPercentage = Math.round((savings / comparisonTco) * 100);
    
    // Executive summary metrics
    updateElementText('total-savings', formatCurrency(savings));
    updateElementText('savings-percentage', `${savingsPercentage}% reduction vs. ${getVendorDisplayName(comparisonVendor)}`);
    updateElementText('payback-period', `${calculatePaybackPeriod(params)} months`);
    updateElementText('portnox-tco', formatCurrency(portnoxTco));
    updateElementText('tco-comparison', `vs. ${formatCurrency(comparisonTco)} (${getVendorDisplayName(comparisonVendor)})`);
    updateElementText('implementation-time', `${calculateImplementationTime(params)} days`);
    updateElementText('implementation-comparison', `${calculateImplementationSavingsPercentage(params)}% faster than on-premises`);
    
    // ROI metrics
    updateElementText('three-year-roi', `${calculateRoi(params)}%`);
    updateElementText('annual-savings', formatCurrency(savings / params.yearsToProject));
    updateElementText('productivity-value', formatCurrency(calculateProductivityGains(params)));
    updateElementText('compliance-savings', formatCurrency(calculateComplianceSavings(params)));
    
    // Risk metrics
    updateElementText('risk-reduction-total', `${params.riskReduction}%`);
    updateElementText('security-improvement', `${calculateSecurityImprovement(params)}%`);
    updateElementText('compliance-coverage', `${calculateComplianceCoverage(params)}%`);
    
    // Financial metrics
    updateElementText('annual-subscription', formatCurrency(calculateAnnualSubscription(params)));
    updateElementText('implementation-cost', formatCurrency(calculateImplementationCost(params)));
    updateElementText('operational-cost', formatCurrency(calculateOperationalCost(params)));
}

// Animate metric values for visual appeal
function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-value');
    
    metrics.forEach(metric => {
        // Add a subtle animation class
        metric.classList.add('animate-fade-in');
        
        // Remove the class after animation completes
        setTimeout(() => {
            metric.classList.remove('animate-fade-in');
        }, 1000);
    });
}

// Helper function to update element text
function updateElementText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

// Format currency values
function formatCurrency(value) {
    return '$' + Math.round(value).toLocaleString();
}

// Get vendor display name
function getVendorDisplayName(vendorId) {
    const vendorNames = {
        'portnox': 'Portnox Cloud',
        'cisco': 'Cisco ISE',
        'aruba': 'Aruba ClearPass',
        'forescout': 'Forescout',
        'fortinac': 'FortiNAC',
        'juniper': 'Juniper Mist',
        'securew2': 'SecureW2',
        'nps': 'Microsoft NPS',
        'arista': 'Arista Agni',
        'foxpass': 'Foxpass',
        'noNac': 'No NAC Solution'
    };
    
    return vendorNames[vendorId] || vendorId;
}

// Show loading overlay
function showLoading(message = 'Loading...') {
    const overlay = document.getElementById('loading-overlay');
    const messageElement = overlay ? overlay.querySelector('p') : null;
    
    if (overlay) {
        if (messageElement) {
            messageElement.textContent = message;
        }
        overlay.classList.add('active');
    }
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Show toast notification
function showToast(message, type = 'info', duration = 5000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Get icon based on type
    let icon = 'info-circle';
    switch (type) {
        case 'success': icon = 'check-circle'; break;
        case 'warning': icon = 'exclamation-triangle'; break;
        case 'error': icon = 'exclamation-circle'; break;
    }
    
    // Set toast content
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${icon}"></i>
        </div>
        <div class="toast-content">${message}</div>
        <button class="toast-close">&times;</button>
    `;
    
    // Add to container
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('toast-visible');
    }, 10);
    
    // Set up auto-close
    let timeout;
    if (duration > 0) {
        timeout = setTimeout(() => {
            closeToast(toast);
        }, duration);
    }
    
    // Set up close button
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (timeout) clearTimeout(timeout);
            closeToast(toast);
        });
    }
}

// Close toast notification
function closeToast(toast) {
    if (!toast) return;
    
    toast.classList.remove('toast-visible');
    toast.classList.add('toast-hidden');
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// Initialize chart.js charts
function initializeCharts() {
    // Configure Chart.js defaults
    if (window.Chart) {
        Chart.defaults.font.family = "'Nunito', sans-serif";
        Chart.defaults.font.size = 12;
        Chart.defaults.color = '#5E6C84';
        Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(23, 43, 77, 0.8)';
        Chart.defaults.plugins.tooltip.titleFont = { weight: 'bold' };
        Chart.defaults.plugins.tooltip.bodyFont = { size: 12 };
        Chart.defaults.plugins.tooltip.padding = 10;
        Chart.defaults.plugins.tooltip.cornerRadius = 4;
        Chart.defaults.plugins.legend.position = 'bottom';
        Chart.defaults.plugins.legend.labels.usePointStyle = true;
        Chart.defaults.plugins.legend.labels.padding = 15;
    }
    
    // Initialize common charts with placeholders
    initTcoComparisonChart();
    initCumulativeCostChart();
    initRoiChart();
    initValueDriversChart();
    initRiskComparisonChart();
    initBreachImpactChart();
    initVendorRadarChart();
    initFeatureRadarChart();
    initCostStructureChart();
    initCostProjectionChart();
    initInsuranceImpactChart();
    initArchitectureChart();
    initNistFrameworkChart();
    
    // Initialize heatmaps
    initRiskHeatmap();
    initSecurityHeatmap();
}

// TCO Comparison Chart
function initTcoComparisonChart() {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx || !window.Chart) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3'],
            datasets: [{
                label: 'Portnox Cloud',
                data: [80000, 70000, 70000],
                backgroundColor: '#36B37E',
                borderWidth: 0,
                borderRadius: 4
            }, {
                label: 'Cisco ISE',
                data: [200000, 150000, 150000],
                backgroundColor: '#0052CC',
                borderWidth: 0,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
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
                            return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Update TCO comparison chart
function updateTcoComparisonChart(params) {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx || !window.Chart) return;
    
    const chart = Chart.getChart(ctx);
    if (!chart) return;
    
    // Calculate TCO values for each vendor over years
    const datasets = [];
    
    params.vendors.forEach(vendor => {
        let yearlyData = [];
        
        for (let year = 1; year <= 3; year++) {
            if (vendor === 'portnox') {
                // Portnox yearly costs
                const subscription = calculateAnnualSubscription(params);
                const operationalCost = calculateOperationalCost(params);
                const implCost = year === 1 ? calculateImplementationCost(params) : 0;
                yearlyData.push(subscription + operationalCost + implCost);
            } else {
                // Other vendors yearly costs
                yearlyData.push(calculateYearlyVendorCost(vendor, year, params));
            }
        }
        
        // Add vendor dataset
        datasets.push({
            label: getVendorDisplayName(vendor),
            data: yearlyData,
            backgroundColor: getVendorColor(vendor),
            borderWidth: 0,
            borderRadius: 4
        });
    });
    
    // Update chart data
    chart.data.datasets = datasets;
    chart.update();
}

// Cumulative Cost Chart
function initCumulativeCostChart() {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx || !window.Chart) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Initial', 'Month 6', 'Month 12', 'Month 18', 'Month 24', 'Month 30', 'Month 36'],
            datasets: [{
                label: 'Portnox Cloud',
                data: [25000, 70000, 120000, 170000, 220000, 270000, 320000],
                borderColor: '#36B37E',
                backgroundColor: 'rgba(54, 179, 126, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#36B37E'
            }, {
                label: 'Cisco ISE',
                data: [100000, 175000, 250000, 350000, 450000, 550000, 650000],
                borderColor: '#0052CC',
                backgroundColor: 'rgba(0, 82, 204, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#0052CC'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
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
                            return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Update cumulative cost chart
function updateCumulativeCostChart(params) {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx || !window.Chart) return;
    
    const chart = Chart.getChart(ctx);
    if (!chart) return;
    
    // Calculate cumulative costs over time
    const timePoints = ['Initial', 'Month 6', 'Month 12', 'Month 18', 'Month 24', 'Month 30', 'Month 36'];
    const datasets = [];
    
    params.vendors.forEach(vendor => {
        let cumulativeData = [];
        let runningTotal = 0;
        
        timePoints.forEach((time, index) => {
            if (index === 0) {
                // Initial costs
                runningTotal = calculateInitialCost(vendor, params);
            } else {
                // Add 6-month costs
                runningTotal += calculate6MonthCost(vendor, index, params);
            }
            cumulativeData.push(runningTotal);
        });
        
        // Add vendor dataset
        datasets.push({
            label: getVendorDisplayName(vendor),
            data: cumulativeData,
            borderColor: getVendorColor(vendor),
            backgroundColor: getVendorColorWithOpacity(vendor, 0.1),
            borderWidth: 3,
            tension: 0.3,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: getVendorColor(vendor)
        });
    });
    
    // Update chart data
    chart.data.labels = timePoints;
    chart.data.datasets = datasets;
    chart.update();
}

// ROI Chart
function initRoiChart() {
    const ctx = document.getElementById('roi-chart');
    if (!ctx || !window.Chart) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Month 6', 'Month 12', 'Month 18', 'Month 24', 'Month 30', 'Month 36'],
            datasets: [{
                label: 'Portnox Cloud',
                data: [-10000, 50000, 120000, 190000, 260000, 330000],
                borderColor: '#36B37E',
                backgroundColor: 'rgba(54, 179, 126, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#36B37E'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
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
                            const value = context.parsed.y;
                            return context.dataset.label + ': ' + (value >= 0 ? '+' : '') + '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Update ROI chart
function updateRoiChart(params) {
    const ctx = document.getElementById('roi-chart');
    if (!ctx || !window.Chart) return;
    
    const chart = Chart.getChart(ctx);
    if (!chart) return;
    
    // Calculate ROI over time (comparing to primary comparison vendor)
    const comparisonVendor = params.vendors.includes('cisco') ? 'cisco' : 
                              params.vendors.includes('aruba') ? 'aruba' :
                              params.vendors.filter(v => v !== 'portnox')[0] || 'cisco';
    
    const timePoints = ['Month 6', 'Month 12', 'Month 18', 'Month 24', 'Month 30', 'Month 36'];
    const roiData = [];
    
    // Calculate cumulative savings at each time point
    timePoints.forEach((time, index) => {
        const month = (index + 1) * 6;
        const portnoxCost = calculateCumulativeCost('portnox', month, params);
        const comparisonCost = calculateCumulativeCost(comparisonVendor, month, params);
        const savings = comparisonCost - portnoxCost;
        
        // Subtract initial investment
        const initialInvestment = calculateInitialCost('portnox', params);
        const roi = savings - initialInvestment;
        
        roiData.push(roi);
    });
    
    // Update chart data
    chart.data.labels = timePoints;
    chart.data.datasets = [{
        label: 'Net Value',
        data: roiData,
        borderColor: '#36B37E',
        backgroundColor: 'rgba(54, 179, 126, 0.1)',
        borderWidth: 3,
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#36B37E'
    }];
    chart.update();
    
    // Update break-even line
    addBreakEvenLine(chart, roiData);
}

// Add break-even line to ROI chart
function addBreakEvenLine(chart, roiData) {
    if (!chart) return;
    
    // Find break-even point (where ROI turns positive)
    let breakEvenIndex = -1;
    for (let i = 0; i < roiData.length; i++) {
        if (roiData[i] >= 0) {
            breakEvenIndex = i;
            break;
        }
    }
    
    if (breakEvenIndex > 0) {
        // Calculate more precise break-even between points
        const negValue = roiData[breakEvenIndex - 1];
        const posValue = roiData[breakEvenIndex];
        const ratio = Math.abs(negValue) / (Math.abs(negValue) + posValue);
        const breakEvenPoint = breakEvenIndex - 1 + ratio;
        
        // Add vertical line annotation
        if (!chart.options.plugins.annotation) {
            chart.options.plugins.annotation = {
                annotations: {}
            };
        }
        
        chart.options.plugins.annotation.annotations.breakEven = {
            type: 'line',
            xMin: breakEvenPoint,
            xMax: breakEvenPoint,
            borderColor: '#FF8B00',
            borderWidth: 2,
            label: {
                content: 'Break-Even Point',
                enabled: true,
                position: 'top',
                backgroundColor: '#FF8B00'
            }
        };
        
        chart.update();
    }
}

// Value Drivers Chart
function initValueDriversChart() {
    const ctx = document.getElementById('value-drivers-chart');
    if (!ctx || !window.Chart) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Hardware Savings', 'Operational Efficiency', 'Risk Reduction', 'Implementation Speed'],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: [
                    '#36B37E',
                    '#0052CC',
                    '#6554C0',
                    '#FF8B00'
                ],
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '50%',
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                },
                legend: {
                    position: 'right',
                    align: 'center'
                }
            }
        }
    });
}

// Update value drivers chart
function updateValueDriversChart(params) {
    const ctx = document.getElementById('value-drivers-chart');
    if (!ctx || !window.Chart) return;
    
    const chart = Chart.getChart(ctx);
    if (!chart) return;
    
    // Calculate value driver distribution based on parameters
    let hardwareSavings = 40;
    let operationalEfficiency = 25;
    let riskReduction = 20;
    let implementationSpeed = 15;
    
    // Adjust based on organization size
    if (params.deviceCount >= 5000) {
        // For larger organizations, operational efficiency is more important
        hardwareSavings -= 5;
        operationalEfficiency += 5;
    } else if (params.deviceCount <= 500) {
        // For smaller organizations, implementation speed is more important
        operationalEfficiency -= 5;
        implementationSpeed += 5;
    }
    
    // Adjust based on risk profile
    if (params.riskProfile === 'high' || params.riskProfile === 'regulated') {
        // For high-risk organizations, risk reduction is more important
        hardwareSavings -= 5;
        riskReduction += 5;
    }
    
    // Calculate total compliance requirements
    const complianceCount = Object.values(params.compliance).filter(Boolean).length;
    if (complianceCount >= 3) {
        // For highly regulated organizations, risk reduction is more important
        implementationSpeed -= 5;
        riskReduction += 5;
    }
    
    // Update chart data
    chart.data.datasets[0].data = [hardwareSavings, operationalEfficiency, riskReduction, implementationSpeed];
    chart.update();
}

// Risk Comparison Chart
function initRiskComparisonChart() {
    const ctx = document.getElementById('risk-comparison-chart');
    if (!ctx || !window.Chart) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Data Breach', 'Compliance Violation', 'Unauthorized Access', 'Shadow IT', 'Insider Threat'],
            datasets: [{
                label: 'Portnox Cloud',
                data: [20, 15, 10, 25, 15],
                backgroundColor: 'rgba(54, 179, 126, 0.2)',
                borderColor: '#36B37E',
                borderWidth: 2,
                pointBackgroundColor: '#36B37E',
                pointRadius: 4
            }, {
                label: 'Cisco ISE',
                data: [40, 35, 25, 45, 35],
                backgroundColor: 'rgba(0, 82, 204, 0.2)',
                borderColor: '#0052CC',
                borderWidth: 2,
                pointBackgroundColor: '#0052CC',
                pointRadius: 4
            }, {
                label: 'No NAC',
                data: [85, 90, 80, 95, 75],
                backgroundColor: 'rgba(255, 86, 48, 0.2)',
                borderColor: '#FF5630',
                borderWidth: 2,
                pointBackgroundColor: '#FF5630',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    },
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.r + '% risk';
                        }
                    }
                }
            }
        }
    });
}

// Update risk comparison chart
function updateRiskComparisonChart(params) {
    const ctx = document.getElementById('risk-comparison-chart');
    if (!ctx || !window.Chart) return;
    
    const chart = Chart.getChart(ctx);
    if (!chart) return;
    
    // Build datasets based on selected vendors
    const datasets = [];
    
    // Always include Portnox
    datasets.push({
        label: 'Portnox Cloud',
        data: calculateRiskScores('portnox', params),
        backgroundColor: 'rgba(54, 179, 126, 0.2)',
        borderColor: '#36B37E',
        borderWidth: 2,
        pointBackgroundColor: '#36B37E',
        pointRadius: 4
    });
    
    // Add main comparison vendor if selected
    if (params.vendors.includes('cisco')) {
        datasets.push({
            label: 'Cisco ISE',
            data: calculateRiskScores('cisco', params),
            backgroundColor: 'rgba(0, 82, 204, 0.2)',
            borderColor: '#0052CC',
            borderWidth: 2,
            pointBackgroundColor: '#0052CC',
            pointRadius: 4
        });
    } else if (params.vendors.includes('aruba')) {
        datasets.push({
            label: 'Aruba ClearPass',
            data: calculateRiskScores('aruba', params),
            backgroundColor: 'rgba(164, 76, 254, 0.2)',
            borderColor: '#A44CFE',
            borderWidth: 2,
            pointBackgroundColor: '#A44CFE',
            pointRadius: 4
        });
    }
    
    // Always include No NAC for comparison
    datasets.push({
        label: 'No NAC Solution',
        data: calculateRiskScores('noNac', params),
        backgroundColor: 'rgba(255, 86, 48, 0.2)',
        borderColor: '#FF5630',
        borderWidth: 2,
        pointBackgroundColor: '#FF5630',
        pointRadius: 4
    });
    
    // Update chart data
    chart.data.datasets = datasets;
    chart.update();
}

// Calculate risk scores for a vendor
function calculateRiskScores(vendor, params) {
    const riskCategories = ['Data Breach', 'Compliance Violation', 'Unauthorized Access', 'Shadow IT', 'Insider Threat'];
    const baseScores = {
        'portnox': [20, 15, 10, 25, 15],
        'cisco': [40, 35, 25, 45, 35],
        'aruba': [35, 30, 30, 40, 30],
        'forescout': [30, 35, 25, 45, 30],
        'fortinac': [35, 40, 30, 45, 35],
        'juniper': [40, 35, 30, 40, 30],
        'securew2': [25, 30, 20, 35, 20],
        'nps': [50, 60, 45, 70, 50],
        'noNac': [85, 90, 80, 95, 75]
    };
    
    // Adjust based on organization parameters
    const scores = [...(baseScores[vendor] || baseScores.noNac)];
    
    // Adjust for risk profile
    const riskMultiplier = {
        'standard': 1,
        'elevated': 1.2,
        'high': 1.4,
        'regulated': 1.5
    }[params.riskProfile] || 1;
    
    // Apply risk adjustment (higher profile means higher risk for unprotected systems)
    if (vendor === 'noNac') {
        scores.forEach((score, i) => {
            scores[i] = Math.min(100, Math.round(score * riskMultiplier));
        });
    } else if (vendor !== 'portnox') {
        // Other vendors get smaller adjustment
        scores.forEach((score, i) => {
            scores[i] = Math.min(100, Math.round(score * (1 + (riskMultiplier - 1) / 2)));
        });
    }
    
    // Adjust for compliance requirements
    const complianceCount = Object.values(params.compliance).filter(Boolean).length;
    if (complianceCount >= 3) {
        // More compliance requirements increase compliance violation risk
        scores[1] = Math.min(100, Math.round(scores[1] * 1.2));
    }
    
    // Adjust for device count
    if (params.deviceCount >= 5000) {
        // More devices increase risk for traditional solutions
        if (vendor !== 'portnox' && vendor !== 'securew2') {
            scores.forEach((score, i) => {
                scores[i] = Math.min(100, Math.round(score * 1.1));
            });
        }
    }
    
    return scores;
}

// Breach Impact Chart
function initBreachImpactChart() {
    const ctx = document.getElementById('breach-impact-chart');
    if (!ctx || !window.Chart) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Direct Costs', 'Reputation Damage', 'Business Disruption', 'Regulatory Penalties'],
            datasets: [{
                label: 'With Portnox',
                data: [100000, 80000, 50000, 30000],
                backgroundColor: '#36B37E',
                borderWidth: 0,
                borderRadius: 4
            }, {
                label: 'Without NAC',
                data: [250000, 200000, 120000, 180000],
                backgroundColor: '#FF5630',
                borderWidth: 0,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.parsed.x.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Update breach impact chart
function updateBreachImpactChart(params) {
    const ctx = document.getElementById('breach-impact-chart');
    if (!ctx || !window.Chart) return;
    
    const chart = Chart.getChart(ctx);
    if (!chart) return;
    
    // Calculate breach impact costs based on parameters
    const noNacCosts = calculateBreachCosts(false, params);
    const withPortnoxCosts = calculateBreachCosts(true, params);
    
    // Update chart data
    chart.data.datasets = [{
        label: 'With Portnox',
        data: withPortnoxCosts,
        backgroundColor: '#36B37E',
        borderWidth: 0,
        borderRadius: 4
    }, {
        label: 'Without NAC',
        data: noNacCosts,
        backgroundColor: '#FF5630',
        borderWidth: 0,
        borderRadius: 4
    }];
    chart.update();
}

// Calculate breach costs
function calculateBreachCosts(withNac, params) {
    // Base costs without NAC for a medium organization
    const baseCosts = [250000, 200000, 120000, 180000];
    
    // Scale based on organization size
    let sizeFactor = 1;
    if (params.deviceCount <= 500) {
        sizeFactor = 0.5;
    } else if (params.deviceCount >= 5000) {
        sizeFactor = 2.5;
    } else if (params.deviceCount >= 10000) {
        sizeFactor = 5;
    }
    
    // Apply size factor
    const scaledCosts = baseCosts.map(cost => Math.round(cost * sizeFactor));
    
    // If with NAC, apply risk reduction
    if (withNac) {
        const reduction = params.riskReduction / 100;
        return scaledCosts.map(cost => Math.round(cost * (1 - reduction)));
    }
    
    return scaledCosts;
}

// Vendor Radar Chart
function initVendorRadarChart() {
    const ctx = document.getElementById('vendor-radar-chart');
    if (!ctx || !window.Chart) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Cloud-Native', 'Zero Trust', 'Ease of Use', 'Scalability', 'Cost Efficiency', 'Time to Value'],
            datasets: [{
                label: 'Portnox Cloud',
                data: [100, 95, 90, 95, 95, 90],
                backgroundColor: 'rgba(54, 179, 126, 0.2)',
                borderColor: '#36B37E',
                borderWidth: 2,
                pointBackgroundColor: '#36B37E',
                pointRadius: 4
            }, {
                label: 'Cisco ISE',
                data: [40, 60, 50, 70, 40, 30],
                backgroundColor: 'rgba(0, 82, 204, 0.2)',
                borderColor: '#0052CC',
                borderWidth: 2,
                pointBackgroundColor: '#0052CC',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    },
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Update vendor radar chart
function updateVendorRadarChart(params) {
    const ctx = document.getElementById('vendor-radar-chart');
    if (!ctx || !window.Chart) return;
    
    const chart = Chart.getChart(ctx);
    if (!chart) return;
    
    // Build datasets based on selected vendors
    const datasets = [];
    
    // Always include Portnox
    datasets.push({
        label: 'Portnox Cloud',
        data: [100, 95, 90, 95, 95, 90],
        backgroundColor: 'rgba(54, 179, 126, 0.2)',
        borderColor: '#36B37E',
        borderWidth: 2,
        pointBackgroundColor: '#36B37E',
        pointRadius: 4
    });
    
    // Add other selected vendors (up to 3 total)
    const otherVendors = params.vendors.filter(v => v !== 'portnox' && v !== 'noNac').slice(0, 2);
    
    const vendorScores = {
        'cisco': [40, 60, 50, 70, 40, 30],
        'aruba': [45, 65, 60, 75, 45, 35],
        'forescout': [30, 70, 55, 65, 35, 30],
        'fortinac': [35, 60, 50, 60, 45, 35],
        'juniper': [50, 65, 60, 70, 50, 40],
        'securew2': [90, 70, 85, 80, 75, 80],
        'nps': [20, 30, 40, 50, 70, 30],
        'arista': [30, 55, 50, 65, 45, 35],
        'foxpass': [80, 60, 75, 70, 80, 75]
    };
    
    otherVendors.forEach(vendor => {
        if (vendorScores[vendor]) {
            datasets.push({
                label: getVendorDisplayName(vendor),
                data: vendorScores[vendor],
                backgroundColor: getVendorColorWithOpacity(vendor, 0.2),
                borderColor: getVendorColor(vendor),
                borderWidth: 2,
                pointBackgroundColor: getVendorColor(vendor),
                pointRadius: 4
            });
        }
    });
    
    // Update chart data
    chart.data.datasets = datasets;
    chart.update();
}

// Feature Radar Chart
function initFeatureRadarChart() {
    const ctx = document.getElementById('feature-radar-chart');
    if (!ctx || !window.Chart) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Network Control', 'Device Visibility', 'Compliance', 'Authentication', 'Guest Access', 'Cloud Management'],
            datasets: [{
                label: 'Portnox Cloud',
                data: [90, 95, 95, 90, 95, 100],
                backgroundColor: 'rgba(54, 179, 126, 0.2)',
                borderColor: '#36B37E',
                borderWidth: 2,
                pointBackgroundColor: '#36B37E',
                pointRadius: 4
            }, {
                label: 'Cisco ISE',
                data: [95, 85, 80, 90, 90, 30],
                backgroundColor: 'rgba(0, 82, 204, 0.2)',
                borderColor: '#0052CC',
                borderWidth: 2,
                pointBackgroundColor: '#0052CC',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    },
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Update feature radar chart
function updateFeatureRadarChart(params) {
    const ctx = document.getElementById('feature-radar-chart');
    if (!ctx || !window.Chart) return;
    
    const chart = Chart.getChart(ctx);
    if (!chart) return;
    
    // Build datasets based on selected vendors
    const datasets = [];
    
    // Always include Portnox
    datasets.push({
        label: 'Portnox Cloud',
        data: [90, 95, 95, 90, 95, 100],
        backgroundColor: 'rgba(54, 179, 126, 0.2)',
        borderColor: '#36B37E',
        borderWidth: 2,
        pointBackgroundColor: '#36B37E',
        pointRadius: 4
    });
    
    // Add other selected vendors (up to 3 total)
    const otherVendors = params.vendors.filter(v => v !== 'portnox' && v !== 'noNac').slice(0, 2);
    
    const featureScores = {
        'cisco': [95, 85, 80, 90, 90, 30],
        'aruba': [90, 80, 85, 90, 85, 35],
        'forescout': [85, 95, 75, 60, 70, 30],
        'fortinac': [85, 80, 70, 85, 80, 30],
        'juniper': [85, 75, 75, 85, 80, 40],
        'securew2': [70, 70, 75, 90, 85, 95],
        'nps': [60, 50, 60, 70, 50, 20],
        'arista': [80, 75, 70, 80, 75, 30],
        'foxpass': [65, 60, 65, 85, 80, 90]
    };
    
    otherVendors.forEach(vendor => {
        if (featureScores[vendor]) {
            datasets.push({
                label: getVendorDisplayName(vendor),
                data: featureScores[vendor],
                backgroundColor: getVendorColorWithOpacity(vendor, 0.2),
                borderColor: getVendorColor(vendor),
                borderWidth: 2,
                pointBackgroundColor: getVendorColor(vendor),
                pointRadius: 4
            });
        }
    });
    
    // Update chart data
    chart.data.datasets = datasets;
    chart.update();
}

// Cost Structure Chart
function initCostStructureChart() {
    const ctx = document.getElementById('cost-structure-chart');
    if (!ctx || !window.Chart) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Hardware', 'Software', 'Implementation', 'Maintenance', 'Personnel'],
            datasets: [{
                label: 'Portnox Cloud',
                data: [0, 70000, 15000, 15000, 20000],
                backgroundColor: '#36B37E',
                borderWidth: 0,
                borderRadius: 4
            }, {
                label: 'Cisco ISE',
                data: [80000, 50000, 40000, 30000, 50000],
                backgroundColor: '#0052CC',
                borderWidth: 0,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Update cost structure chart
function updateCostStructureChart(params) {
    const ctx = document.getElementById('cost-structure-chart');
    if (!ctx || !window.Chart) return;
    
    const chart = Chart.getChart(ctx);
    if (!chart) return;
    
    // Calculate cost components for each vendor
    const datasets = [];
    
    // Get main comparison vendor
    const comparisonVendor = params.vendors.includes('cisco') ? 'cisco' : 
                             params.vendors.includes('aruba') ? 'aruba' :
                             params.vendors.filter(v => v !== 'portnox')[0] || 'cisco';
    
    // Portnox costs
    const portnoxTco = calculatePortnoxTco(params);
    datasets.push({
        label: 'Portnox Cloud',
        data: [
            0, // No hardware
            portnoxTco.subscription,
            portnoxTco.implementation,
            portnoxTco.maintenance,
            portnoxTco.personnel
        ],
        backgroundColor: '#36B37E',
        borderWidth: 0,
        borderRadius: 4
    });
    
    // Comparison vendor costs
    const comparisonTco = calculateComparisonVendorTco(comparisonVendor, params);
    datasets.push({
        label: getVendorDisplayName(comparisonVendor),
        data: [
            comparisonTco.hardware,
            comparisonTco.software,
            comparisonTco.implementation,
            comparisonTco.maintenance,
            comparisonTco.personnel
        ],
        backgroundColor: getVendorColor(comparisonVendor),
        borderWidth: 0,
        borderRadius: 4
    });
    
    // Update chart data
    chart.data.datasets = datasets;
    chart.update();
}

// Cost Projection Chart
function initCostProjectionChart() {
    const ctx = document.getElementById('cost-projection-chart');
    if (!ctx || !window.Chart) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
            datasets: [{
                label: 'Portnox Cloud',
                data: [120000, 220000, 320000, 420000, 520000],
                borderColor: '#36B37E',
                backgroundColor: 'rgba(54, 179, 126, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#36B37E'
            }, {
                label: 'Cisco ISE',
                data: [250000, 400000, 550000, 750000, 950000],
                borderColor: '#0052CC',
                backgroundColor: 'rgba(0, 82, 204, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#0052CC'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
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
                            return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Update cost projection chart
function updateCostProjectionChart(params) {
    const ctx = document.getElementById('cost-projection-chart');
    if (!ctx || !window.Chart) return;
    
    const chart = Chart.getChart(ctx);
    if (!chart) return;
    
    // Calculate 5-year projection for each vendor
    const datasets = [];
    
    // Always include Portnox
    const portnoxProjection = [];
    let portnoxCumulative = 0;
    
    for (let year = 1; year <= 5; year++) {
        const yearlyParams = { ...params, yearsToProject: year };
        const portnoxTco = calculatePortnoxTco(yearlyParams);
        portnoxCumulative = portnoxTco.total;
        portnoxProjection.push(portnoxCumulative);
    }
    
    datasets.push({
        label: 'Portnox Cloud',
        data: portnoxProjection,
        borderColor: '#36B37E',
        backgroundColor: 'rgba(54, 179, 126, 0.1)',
        borderWidth: 3,
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#36B37E'
    });
    
    // Add comparison vendor
    const comparisonVendor = params.vendors.includes('cisco') ? 'cisco' : 
                             params.vendors.includes('aruba') ? 'aruba' :
                             params.vendors.filter(v => v !== 'portnox')[0] || 'cisco';
    
    const comparisonProjection = [];
    let comparisonCumulative = 0;
    
    for (let year = 1; year <= 5; year++) {
        const yearlyParams = { ...params, yearsToProject: year };
        const comparisonTco = calculateComparisonVendorTco(comparisonVendor, yearlyParams);
        comparisonCumulative = comparisonTco.total;
        comparisonProjection.push(comparisonCumulative);
    }
    
    datasets.push({
        label: getVendorDisplayName(comparisonVendor),
        data: comparisonProjection,
        borderColor: getVendorColor(comparisonVendor),
        backgroundColor: getVendorColorWithOpacity(comparisonVendor, 0.1),
        borderWidth: 3,
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: getVendorColor(comparisonVendor)
    });
    
    // Update chart data
    chart.data.datasets = datasets;
    chart.update();
}

// Insurance Impact Chart
function initInsuranceImpactChart() {
    const ctx = document.getElementById('insurance-impact-chart');
    if (!ctx || !window.Chart) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3'],
            datasets: [{
                label: 'Premium without NAC',
                data: [50000, 55000, 60000],
                backgroundColor: '#FF8B00',
                borderWidth: 0,
                borderRadius: 4
            }, {
                label: 'Premium with Portnox',
                data: [45000, 49500, 54000],
                backgroundColor: '#36B37E',
                borderWidth: 0,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Update insurance impact chart
function updateInsuranceImpactChart(params) {
    const ctx = document.getElementById('insurance-impact-chart');
    if (!ctx || !window.Chart) return;
    
    const chart = Chart.getChart(ctx);
    if (!chart) return;
    
    // Calculate insurance costs based on parameters
    const baseInsuranceCost = calculateBaseInsuranceCost(params);
    const withoutNacCosts = [];
    const withPortnoxCosts = [];
    
    // Apply premium reduction
    const reduction = params.insuranceReduction / 100;
    
    for (let year = 1; year <= 3; year++) {
        // Add 5% year-over-year increase
        const yearlyIncrease = 1 + ((year - 1) * 0.05);
        const yearCost = baseInsuranceCost * yearlyIncrease;
        
        withoutNacCosts.push(yearCost);
        withPortnoxCosts.push(yearCost * (1 - reduction));
    }
    
    // Update chart data
    chart.data.datasets = [{
        label: 'Premium without NAC',
        data: withoutNacCosts,
        backgroundColor: '#FF8B00',
        borderWidth: 0,
        borderRadius: 4
    }, {
        label: 'Premium with Portnox',
        data: withPortnoxCosts,
        backgroundColor: '#36B37E',
        borderWidth: 0,
        borderRadius: 4
    }];
    chart.update();
}

// Calculate base insurance cost
function calculateBaseInsuranceCost(params) {
    // Base cost for medium organization
    let baseCost = 50000;
    
    // Scale based on organization size
    if (params.deviceCount <= 500) {
        baseCost = 25000;
    } else if (params.deviceCount >= 5000) {
        baseCost = 100000;
    } else if (params.deviceCount >= 10000) {
        baseCost = 200000;
    }
    
    // Adjust based on industry risk
    const industryMultiplier = {
        'financial': 1.5,
        'healthcare': 1.4,
        'retail': 1.3,
        'government': 1.2,
        'education': 1.1,
        'manufacturing': 1.0,
        'technology': 1.2,
        'energy': 1.3
    }[params.industry] || 1;
    
    // Apply industry multiplier
    baseCost *= industryMultiplier;
    
    // Adjust based on compliance requirements
    const complianceCount = Object.values(params.compliance).filter(Boolean).length;
    if (complianceCount >= 3) {
        baseCost *= 1.2;
    }
    
    return Math.round(baseCost);
}

// Architecture Chart
function initArchitectureChart() {
    const ctx = document.getElementById('architecture-chart');
    if (!ctx || !window.Chart) return;
    
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['Cloud Native', 'Hybrid', 'On-Premises'],
            datasets: [{
                data: [100, 0, 0],
                backgroundColor: [
                    '#36B37E',
                    '#6554C0',
                    '#0052CC'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Update architecture chart
function updateArchitectureChart(params) {
    const ctx = document.getElementById('architecture-chart');
    if (!ctx || !window.Chart) return;
    
    const chart = Chart.getChart(ctx);
    if (!chart) return;
    
    // Get architecture breakdown for selected vendors
    const architectureData = [];
    const labels = [];
    
    params.vendors.forEach(vendor => {
        const vendorName = getVendorDisplayName(vendor);
        
        // Add architecture data
        if (vendor === 'portnox' || vendor === 'securew2') {
            labels.push(`${vendorName} - Cloud Native`);
            architectureData.push(100);
        } else if (vendor === 'cisco' || vendor === 'aruba' || vendor === 'forescout') {
            labels.push(`${vendorName} - Hybrid`);
            architectureData.push(25);
            
            labels.push(`${vendorName} - On-Premises`);
            architectureData.push(75);
        } else if (vendor === 'fortinac' || vendor === 'juniper' || vendor === 'arista') {
            labels.push(`${vendorName} - Hybrid`);
            architectureData.push(20);
            
            labels.push(`${vendorName} - On-Premises`);
            architectureData.push(80);
        } else if (vendor === 'nps') {
            labels.push(`${vendorName} - On-Premises`);
            architectureData.push(100);
        } else if (vendor === 'foxpass') {
            labels.push(`${vendorName} - Cloud Native`);
            architectureData.push(95);
            
            labels.push(`${vendorName} - Hybrid`);
            architectureData.push(5);
        }
    });
    
    // Generate colors
    const colors = [];
    let index = 0;
    params.vendors.forEach(vendor => {
        if (vendor === 'portnox' || vendor === 'securew2' || vendor === 'foxpass') {
            colors.push('#36B37E'); // Cloud Native
        } else if (vendor === 'nps') {
            colors.push('#0052CC'); // On-Premises
        } else {
            // Hybrid and On-Premises
            colors.push('#6554C0'); // Hybrid
            colors.push('#0052CC'); // On-Premises
        }
    });
    
    // Update chart data
    chart.data.labels = labels;
    chart.data.datasets[0].data = architectureData;
    chart.data.datasets[0].backgroundColor = colors;
    chart.update();
}

// NIST Framework Chart
function initNistFrameworkChart() {
    const ctx = document.getElementById('nist-framework-chart');
    if (!ctx || !window.Chart) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
            datasets: [{
                label: 'Portnox Cloud',
                data: [90, 95, 90, 85, 80],
                backgroundColor: '#36B37E',
                borderWidth: 0,
                borderRadius: 4
            }, {
                label: 'Cisco ISE',
                data: [70, 85, 75, 65, 60],
                backgroundColor: '#0052CC',
                borderWidth: 0,
                borderRadius: 4
            }, {
                label: 'No NAC',
                data: [20, 10, 15, 5, 10],
                backgroundColor: '#FF5630',
                borderWidth: 0,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Coverage (%)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            }
        }
    });
}

// Update NIST framework chart
function updateNistFrameworkChart(params) {
    const ctx = document.getElementById('nist-framework-chart');
    if (!ctx || !window.Chart) return;
    
    const chart = Chart.getChart(ctx);
    if (!chart) return;
    
    // Build datasets based on selected vendors
    const datasets = [];
    
    // Always include Portnox
    datasets.push({
        label: 'Portnox Cloud',
        data: [90, 95, 90, 85, 80],
        backgroundColor: '#36B37E',
        borderWidth: 0,
        borderRadius: 4
    });
    
    // Add main comparison vendor if selected
    if (params.vendors.includes('cisco')) {
        datasets.push({
            label: 'Cisco ISE',
            data: [70, 85, 75, 65, 60],
            backgroundColor: '#0052CC',
            borderWidth: 0,
            borderRadius: 4
        });
    } else if (params.vendors.includes('aruba')) {
        datasets.push({
            label: 'Aruba ClearPass',
            data: [65, 80, 70, 60, 55],
            backgroundColor: '#A44CFE',
            borderWidth: 0,
            borderRadius: 4
        });
    }
    
    // Always include No NAC for comparison
    datasets.push({
        label: 'No NAC Solution',
        data: [20, 10, 15, 5, 10],
        backgroundColor: '#FF5630',
        borderWidth: 0,
        borderRadius: 4
    });
    
    // Update chart data
    chart.data.datasets = datasets;
    chart.update();
}

// Initialize risk heatmap
function initRiskHeatmap() {
    const container = document.getElementById('risk-heatmap');
    if (!container) return;
    
    // Create placeholder content
    container.innerHTML = '<div class="placeholder-text">Select vendors and calculate to view risk heatmap</div>';
}

// Update risk heatmap
function updateRiskHeatmap(params) {
    const container = document.getElementById('risk-heatmap');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    // Define heatmap data
    const threats = ['Data Breach', 'Unauthorized Access', 'Compliance Violation', 'Shadow IT', 'Ransomware'];
    const impacts = ['Financial', 'Operational', 'Reputational', 'Regulatory'];
    
    // Create heatmap table
    const table = document.createElement('table');
    table.className = 'heatmap-table';
    
    // Create header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th></th>' + threats.map(threat => `<th>${threat}</th>`).join('');
    table.appendChild(headerRow);
    
    // Create data rows
    impacts.forEach(impact => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.className = 'impact-label';
        cell.textContent = impact;
        row.appendChild(cell);
        
        // Create heat cells
        threats.forEach(threat => {
            const heatCell = document.createElement('td');
            
            // Calculate risk level (1-5) based on threat + impact + params
            let riskLevel = calculateRiskLevel(threat, impact, params);
            
            heatCell.className = `heat-cell risk-level-${riskLevel}`;
            heatCell.setAttribute('data-risk', riskLevel);
            heatCell.textContent = getRiskLabel(riskLevel);
            
            // Add tooltip
            heatCell.setAttribute('title', `${threat} / ${impact}: ${getRiskLabel(riskLevel)} Risk`);
            
            row.appendChild(heatCell);
        });
        
        table.appendChild(row);
    });
    
    // Add table to container
    container.appendChild(table);
    
    // Add legend
    const legend = document.createElement('div');
    legend.className = 'heatmap-legend';
    legend.innerHTML = `
        <div class="legend-item"><span class="legend-color risk-level-1"></span> Very Low</div>
        <div class="legend-item"><span class="legend-color risk-level-2"></span> Low</div>
        <div class="legend-item"><span class="legend-color risk-level-3"></span> Medium</div>
        <div class="legend-item"><span class="legend-color risk-level-4"></span> High</div>
        <div class="legend-item"><span class="legend-color risk-level-5"></span> Very High</div>
    `;
    container.appendChild(legend);
    
    // Add heatmap styles
    const style = document.createElement('style');
    style.textContent = `
        .heatmap-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1rem;
        }
        .heatmap-table th, .heatmap-table td {
            border: 1px solid #DFE1E6;
            padding: 0.75rem;
            text-align: center;
        }
        .heatmap-table th {
            background-color: #F4F5F7;
            font-weight: 600;
        }
        .impact-label {
            text-align: left;
            font-weight: 600;
            background-color: #F4F5F7;
        }
        .heat-cell {
            color: white;
            font-weight: 600;
        }
        .risk-level-1 { background-color: #36B37E; }
        .risk-level-2 { background-color: #00B8D9; }
        .risk-level-3 { background-color: #FF991F; }
        .risk-level-4 { background-color: #FF5630; }
        .risk-level-5 { background-color: #DE350B; }
        .heatmap-legend {
            display: flex;
            justify-content: center;
            margin-top: 1rem;
            gap: 1rem;
        }
        .legend-item {
            display: flex;
            align-items: center;
            font-size: 0.75rem;
        }
        .legend-color {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 0.5rem;
            border-radius: 3px;
        }
        .placeholder-text {
            text-align: center;
            padding: 2rem;
            color: #5E6C84;
        }
    `;
    document.head.appendChild(style);
}

// Calculate risk level (1-5) based on threat + impact + params
function calculateRiskLevel(threat, impact, params) {
    // Base risk level (with NAC solution)
    let baseRisk = 2; // Low risk
    
    // Adjust based on threat type
    if (threat === 'Data Breach' || threat === 'Ransomware') {
        baseRisk += 1;
    }
    
    // Adjust based on impact
    if (impact === 'Financial' || impact === 'Reputational') {
        baseRisk += 1;
    }
    
    // Adjust based on organization size
    if (params.deviceCount >= 5000) {
        baseRisk += 1;
    } else if (params.deviceCount <= 500) {
        baseRisk -= 1;
    }
    
    // Adjust based on industry
    if (params.industry === 'financial' || params.industry === 'healthcare' || params.industry === 'government') {
        baseRisk += 1;
    }
    
    // Adjust based on compliance requirements
    const complianceCount = Object.values(params.compliance).filter(Boolean).length;
    if (complianceCount >= 3) {
        baseRisk += 1;
    }
    
    // Ensure risk level is between 1-5
    return Math.max(1, Math.min(5, baseRisk));
}

// Get risk label based on level
function getRiskLabel(level) {
    const labels = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
    return labels[level - 1] || 'Unknown';
}

// Initialize security heatmap
function initSecurityHeatmap() {
    const container = document.getElementById('security-heatmap');
    if (!container) return;
    
    // Create placeholder content
    container.innerHTML = '<div class="placeholder-text">Select vendors and calculate to view security capabilities heatmap</div>';
}

// Update security heatmap
function updateSecurityHeatmap(params) {
    const container = document.getElementById('security-heatmap');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    // Define heatmap data
    const capabilities = [
        'Device Authentication', 
        'Network Access Control', 
        'Policy Enforcement', 
        'Continuous Monitoring',
        'Threat Detection',
        'Remediation',
        'Guest Management',
        'BYOD Support',
        'Cloud Access',
        'Remote Access'
    ];
    
    // Get vendors to display (Portnox + up to 2 others)
    const displayVendors = ['portnox'];
    const otherVendors = params.vendors.filter(v => v !== 'portnox' && v !== 'noNac').slice(0, 2);
    displayVendors.push(...otherVendors);
    
    // Create heatmap table
    const table = document.createElement('table');
    table.className = 'heatmap-table';
    
    // Create header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Capability</th>' + displayVendors.map(vendor => 
        `<th>${getVendorDisplayName(vendor)}</th>`).join('');
    table.appendChild(headerRow);
    
    // Create data rows
    capabilities.forEach(capability => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.className = 'capability-label';
        cell.textContent = capability;
        row.appendChild(cell);
        
        // Create capability cells for each vendor
        displayVendors.forEach(vendor => {
            const capabilityCell = document.createElement('td');
            
            // Get capability rating (1-5) based on vendor and capability
            let rating = getCapabilityRating(vendor, capability);
            
            capabilityCell.className = `capability-cell rating-level-${rating}`;
            capabilityCell.setAttribute('data-rating', rating);
            capabilityCell.textContent = getRatingLabel(rating);
            
            // Add tooltip
            capabilityCell.setAttribute('title', `${getVendorDisplayName(vendor)} ${capability}: ${getRatingLabel(rating)}`);
            
            row.appendChild(capabilityCell);
        });
        
        table.appendChild(row);
    });
    
    // Add table to container
    container.appendChild(table);
    
    // Add legend
    const legend = document.createElement('div');
    legend.className = 'heatmap-legend';
    legend.innerHTML = `
        <div class="legend-item"><span class="legend-color rating-level-5"></span> Excellent</div>
        <div class="legend-item"><span class="legend-color rating-level-4"></span> Good</div>
        <div class="legend-item"><span class="legend-color rating-level-3"></span> Average</div>
        <div class="legend-item"><span class="legend-color rating-level-2"></span> Basic</div>
        <div class="legend-item"><span class="legend-color rating-level-1"></span> Limited</div>
    `;
    container.appendChild(legend);
    
    // Add heatmap styles
    const style = document.createElement('style');
    style.textContent = `
        .capability-label {
            text-align: left;
            font-weight: 600;
            background-color: #F4F5F7;
        }
        .capability-cell {
            color: white;
            font-weight: 600;
        }
        .rating-level-5 { background-color: #36B37E; }
        .rating-level-4 { background-color: #00B8D9; }
        .rating-level-3 { background-color: #0052CC; }
        .rating-level-2 { background-color: #6554C0; }
        .rating-level-1 { background-color: #BABFC7; }
    `;
    document.head.appendChild(style);
}

// Get capability rating (1-5) based on vendor and capability
function getCapabilityRating(vendor, capability) {
    // Default ratings by vendor
    const vendorRatings = {
        'portnox': {
            'Device Authentication': 5,
            'Network Access Control': 5,
            'Policy Enforcement': 5,
            'Continuous Monitoring': 5,
            'Threat Detection': 4,
            'Remediation': 4,
            'Guest Management': 5,
            'BYOD Support': 5,
            'Cloud Access': 5,
            'Remote Access': 5
        },
        'cisco': {
            'Device Authentication': 5,
            'Network Access Control': 5,
            'Policy Enforcement': 4,
            'Continuous Monitoring': 4,
            'Threat Detection': 4,
            'Remediation': 4,
            'Guest Management': 5,
            'BYOD Support': 4,
            'Cloud Access': 2,
            'Remote Access': 3
        },
        'aruba': {
            'Device Authentication': 5,
            'Network Access Control': 5,
            'Policy Enforcement': 4,
            'Continuous Monitoring': 4,
            'Threat Detection': 3,
            'Remediation': 3,
            'Guest Management': 5,
            'BYOD Support': 4,
            'Cloud Access': 2,
            'Remote Access': 3
        },
        'forescout': {
            'Device Authentication': 4,
            'Network Access Control': 4,
            'Policy Enforcement': 4,
            'Continuous Monitoring': 5,
            'Threat Detection': 5,
            'Remediation': 4,
            'Guest Management': 3,
            'BYOD Support': 3,
            'Cloud Access': 2,
            'Remote Access': 2
        },
        'fortinac': {
            'Device Authentication': 4,
            'Network Access Control': 4,
            'Policy Enforcement': 4,
            'Continuous Monitoring': 4,
            'Threat Detection': 4,
            'Remediation': 4,
            'Guest Management': 4,
            'BYOD Support': 3,
            'Cloud Access': 2,
            'Remote Access': 2
        },
        'juniper': {
            'Device Authentication': 4,
            'Network Access Control': 4,
            'Policy Enforcement': 4,
            'Continuous Monitoring': 3,
            'Threat Detection': 3,
            'Remediation': 3,
            'Guest Management': 4,
            'BYOD Support': 3,
            'Cloud Access': 2,
            'Remote Access': 3
        },
        'securew2': {
            'Device Authentication': 5,
            'Network Access Control': 4,
            'Policy Enforcement': 4,
            'Continuous Monitoring': 3,
            'Threat Detection': 3,
            'Remediation': 3,
            'Guest Management': 5,
            'BYOD Support': 5,
            'Cloud Access': 5,
            'Remote Access': 5
        },
        'nps': {
            'Device Authentication': 3,
            'Network Access Control': 3,
            'Policy Enforcement': 3,
            'Continuous Monitoring': 2,
            'Threat Detection': 1,
            'Remediation': 1,
            'Guest Management': 2,
            'BYOD Support': 2,
            'Cloud Access': 1,
            'Remote Access': 2
        },
        'arista': {
            'Device Authentication': 4,
            'Network Access Control': 4,
            'Policy Enforcement': 3,
            'Continuous Monitoring': 3,
            'Threat Detection': 3,
            'Remediation': 3,
            'Guest Management': 3,
            'BYOD Support': 3,
            'Cloud Access': 2,
            'Remote Access': 2
        },
        'foxpass': {
            'Device Authentication': 4,
            'Network Access Control': 3,
            'Policy Enforcement': 3,
            'Continuous Monitoring': 2,
            'Threat Detection': 2,
            'Remediation': 2,
            'Guest Management': 4,
            'BYOD Support': 4,
            'Cloud Access': 5,
            'Remote Access': 4
        }
    };
    
    // Return rating if available, otherwise return 1 (Limited)
    return (vendorRatings[vendor] && vendorRatings[vendor][capability]) || 1;
}

// Get rating label based on level
function getRatingLabel(level) {
    const labels = ['Limited', 'Basic', 'Average', 'Good', 'Excellent'];
    return labels[level - 1] || 'Unknown';
}

// Initialize additional event listeners
function initializeEventListeners() {
    // Help modal
    const helpBtn = document.getElementById('help-btn');
    const helpModal = document.getElementById('help-modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (helpBtn && helpModal && modalClose) {
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
    
    // Export PDF button
    const exportBtn = document.getElementById('export-pdf');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            showToast('Generating PDF report...', 'info');
            
            // Simulate PDF generation
            setTimeout(function() {
                showToast('PDF report generated and downloaded.', 'success');
            }, 2000);
        });
    }
    
    // Dark mode toggle
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            const icon = darkModeBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon');
                icon.classList.toggle('fa-sun');
            }
            
            // Update charts
            if (window.Chart) {
                Object.values(Chart.instances).forEach(chart => {
                    chart.update();
                });
            }
        });
    }
}

// TCO Calculation functions

// Calculate Portnox TCO
function calculatePortnoxTco(params) {
    // Basic parameters
    const deviceCount = params.deviceCount;
    const years = params.yearsToProject;
    
    // Subscription cost
    let monthlyPerDevice = params.portnoxBasePrice;
    
    // Apply volume discount
    let discount = 0;
    if (deviceCount >= 10000) {
        discount = 0.25; // 25% discount for very large deployments
    } else if (deviceCount >= 5000) {
        discount = 0.20; // 20% discount for large deployments
    } else if (deviceCount >= 1000) {
        discount = 0.15; // 15% discount for medium deployments
    } else if (deviceCount >= 500) {
        discount = 0.10; // 10% discount for small-medium deployments
    } else {
        discount = 0.05; // 5% discount for small deployments
    }
    
    // Apply additional discount if specified
    if (params.portnoxDiscount > 0) {
        discount = params.portnoxDiscount / 100;
    }
    
    // Calculate effective monthly cost
    const effectiveMonthlyRate = monthlyPerDevice * (1 - discount);
    
    // Annual subscription
    const annualSubscription = effectiveMonthlyRate * 12 * deviceCount;
    
    // Implementation costs (one-time)
    let implementationCost = 0;
    
    // Base implementation fee
    if (deviceCount <= 500) {
        implementationCost = 5000;
    } else if (deviceCount <= 1000) {
        implementationCost = 10000;
    } else if (deviceCount <= 5000) {
        implementationCost = 15000;
    } else if (deviceCount <= 10000) {
        implementationCost = 25000;
    } else {
        implementationCost = 40000;
    }
    
    // Maintenance costs (included in subscription for Portnox)
    const maintenanceCost = 0;
    
    // Personnel costs
    const fteCost = params.fteCost;
    let fteAllocation = 0;
    
    // FTE allocation based on device count
    if (deviceCount <= 500) {
        fteAllocation = 0.1; // 10% of one FTE
    } else if (deviceCount <= 1000) {
        fteAllocation = 0.15; // 15% of one FTE
    } else if (deviceCount <= 5000) {
        fteAllocation = 0.25; // 25% of one FTE
    } else if (deviceCount <= 10000) {
        fteAllocation = 0.3; // 30% of one FTE
    } else {
        fteAllocation = 0.4; // 40% of one FTE
    }
    
    // Override FTE allocation if specified
    if (params.fteAllocation > 0) {
        fteAllocation = params.fteAllocation / 100;
    }
    
    // Annual personnel cost
    const personnelCost = fteCost * fteAllocation;
    
    // Calculate total costs
    const subscription = annualSubscription * years;
    const implementation = implementationCost; // One-time cost
    const maintenance = maintenanceCost * years;
    const personnel = personnelCost * years;
    
    // Total TCO
    const total = subscription + implementation + maintenance + personnel;
    
    return {
        subscription,
        implementation,
        maintenance,
        personnel,
        total
    };
}

// Calculate comparison vendor TCO
function calculateComparisonVendorTco(vendor, params) {
    // Basic parameters
    const deviceCount = params.deviceCount;
    const years = params.yearsToProject;
    
    // Default vendor costs
    const defaults = {
        'cisco': {
            hardwarePerDevice: 70,
            softwarePerDevice: 100,
            implementationFactor: 1.0,
            maintenancePercentage: 20,
            fteAllocationFactor: 1.0
        },
        'aruba': {
            hardwarePerDevice: 65,
            softwarePerDevice: 95,
            implementationFactor: 0.9,
            maintenancePercentage: 18,
            fteAllocationFactor: 0.9
        },
        'forescout': {
            hardwarePerDevice: 60,
            softwarePerDevice: 90,
            implementationFactor: 0.85,
            maintenancePercentage: 18,
            fteAllocationFactor: 0.8
        },
        'fortinac': {
            hardwarePerDevice: 55,
            softwarePerDevice: 80,
            implementationFactor: 0.8,
            maintenancePercentage: 18,
            fteAllocationFactor: 0.8
        },
        'juniper': {
            hardwarePerDevice: 60,
            softwarePerDevice: 85,
            implementationFactor: 0.85,
            maintenancePercentage: 18,
            fteAllocationFactor: 0.8
        },
        'securew2': {
            hardwarePerDevice: 0, // Cloud-based
            softwarePerDevice: 60,
            implementationFactor: 0.5,
            maintenancePercentage: 15,
            fteAllocationFactor: 0.5
        },
        'nps': {
            hardwarePerDevice: 20, // Windows Server
            softwarePerDevice: 0, // Free
            implementationFactor: 0.7,
            maintenancePercentage: 10,
            fteAllocationFactor: 1.2 // Higher FTE due to manual configuration
        },
        'arista': {
            hardwarePerDevice: 55,
            softwarePerDevice: 75,
            implementationFactor: 0.8,
            maintenancePercentage: 18,
            fteAllocationFactor: 0.8
        },
        'foxpass': {
            hardwarePerDevice: 0, // Cloud-based
            softwarePerDevice: 55,
            implementationFactor: 0.5,
            maintenancePercentage: 15,
            fteAllocationFactor: 0.5
        }
    };
    
    // Use default vendor or cisco as fallback
    const vendorDefaults = defaults[vendor] || defaults.cisco;
    
    // Hardware costs
    const hardwareCost = deviceCount * vendorDefaults.hardwarePerDevice;
    
    // Software license costs
    const softwareCost = deviceCount * vendorDefaults.softwarePerDevice * years;
    
    // Implementation costs
    let baseImplementationCost = 0;
    
    // Base implementation fee based on device count
    if (deviceCount <= 500) {
        baseImplementationCost = 15000;
    } else if (deviceCount <= 1000) {
        baseImplementationCost = 30000;
    } else if (deviceCount <= 5000) {
        baseImplementationCost = 60000;
    } else if (deviceCount <= 10000) {
        baseImplementationCost = 100000;
    } else {
        baseImplementationCost = 150000;
    }
    
    // Apply vendor-specific implementation factor
    const implementationCost = baseImplementationCost * vendorDefaults.implementationFactor;
    
    // Maintenance costs
    const maintenancePercentage = params.maintenancePercentage || vendorDefaults.maintenancePercentage;
    const maintenanceCost = (hardwareCost + softwareCost) * (maintenancePercentage / 100) * years;
    
    // Personnel costs
    const fteCost = params.fteCost;
    let baseFteAllocation = 0;
    
    // Base FTE allocation based on device count
    if (deviceCount <= 500) {
        baseFteAllocation = 0.2; // 20% of one FTE
    } else if (deviceCount <= 1000) {
        baseFteAllocation = 0.3; // 30% of one FTE
    } else if (deviceCount <= 5000) {
        baseFteAllocation = 0.5; // 50% of one FTE
    } else if (deviceCount <= 10000) {
        baseFteAllocation = 0.75; // 75% of one FTE
    } else {
        baseFteAllocation = 1.0; // 100% of one FTE
    }
    
    // Apply vendor-specific FTE allocation factor
    const fteAllocation = baseFteAllocation * vendorDefaults.fteAllocationFactor;
    
    // Annual personnel cost
    const personnelCost = fteCost * fteAllocation * years;
    
    // Total TCO
    const total = hardwareCost + softwareCost + implementationCost + maintenanceCost + personnelCost;
    
    return {
        hardware: hardwareCost,
        software: softwareCost,
        implementation: implementationCost,
        maintenance: maintenanceCost,
        personnel: personnelCost,
        total
    };
}

// Calculate yearly vendor cost
function calculateYearlyVendorCost(vendor, year, params) {
    // Get full TCO
    const vendorTco = calculateComparisonVendorTco(vendor, { ...params, yearsToProject: 3 });
    
    // Year 1 includes hardware and implementation
    if (year === 1) {
        const softwarePerYear = vendorTco.software / 3;
        const maintenancePerYear = vendorTco.maintenance / 3;
        const personnelPerYear = vendorTco.personnel / 3;
        
        return vendorTco.hardware + vendorTco.implementation + softwarePerYear + maintenancePerYear + personnelPerYear;
    } else {
        // Later years only include software, maintenance, and personnel
        const softwarePerYear = vendorTco.software / 3;
        const maintenancePerYear = vendorTco.maintenance / 3;
        const personnelPerYear = vendorTco.personnel / 3;
        
        return softwarePerYear + maintenancePerYear + personnelPerYear;
    }
}

// Calculate initial cost
function calculateInitialCost(vendor, params) {
    if (vendor === 'portnox') {
        // Portnox initial costs
        const portnoxTco = calculatePortnoxTco(params);
        return portnoxTco.implementation + (portnoxTco.subscription / (params.yearsToProject * 12)) * 3; // Implementation + 3 months subscription
    } else {
        // Other vendors initial costs
        const vendorTco = calculateComparisonVendorTco(vendor, params);
        return vendorTco.hardware + vendorTco.implementation; // Hardware + Implementation
    }
}

// Calculate 6-month cost
function calculate6MonthCost(vendor, periodIndex, params) {
    if (vendor === 'portnox') {
        // Portnox 6-month costs
        const portnoxTco = calculatePortnoxTco(params);
        return (portnoxTco.subscription / params.yearsToProject) / 2; // Half-year subscription
    } else {
        // Other vendors 6-month costs
        const vendorTco = calculateComparisonVendorTco(vendor, params);
        
        if (periodIndex === 1) {
            // First 6 months after initial costs
            return ((vendorTco.software / params.yearsToProject) +
                   (vendorTco.maintenance / params.yearsToProject) +
                   (vendorTco.personnel / params.yearsToProject)) / 2;
        } else {
            // Later 6-month periods
            return ((vendorTco.software / params.yearsToProject) +
                   (vendorTco.maintenance / params.yearsToProject) +
                   (vendorTco.personnel / params.yearsToProject)) / 2;
        }
    }
}

// Calculate cumulative cost up to a specific month
function calculateCumulativeCost(vendor, month, params) {
    // Initial cost
    let cost = calculateInitialCost(vendor, params);
    
    // Add monthly costs
    const monthlyParams = { ...params };
    
    // Calculate 6-month chunks
    const periods = Math.floor(month / 6);
    for (let i = 1; i <= periods; i++) {
        cost += calculate6MonthCost(vendor, i, monthlyParams);
    }
    
    // Add partial period if needed
    const remainingMonths = month % 6;
    if (remainingMonths > 0) {
        cost += (calculate6MonthCost(vendor, periods + 1, monthlyParams) / 6) * remainingMonths;
    }
    
    return cost;
}

// Calculate annual subscription cost
function calculateAnnualSubscription(params) {
    // Get subscription component of TCO
    const portnoxTco = calculatePortnoxTco(params);
    return portnoxTco.subscription / params.yearsToProject;
}

// Calculate implementation cost
function calculateImplementationCost(params) {
    // Get implementation component of TCO
    const portnoxTco = calculatePortnoxTco(params);
    return portnoxTco.implementation;
}

// Calculate operational cost
function calculateOperationalCost(params) {
    // Get personnel component of TCO
    const portnoxTco = calculatePortnoxTco(params);
    return portnoxTco.personnel / params.yearsToProject;
}

// Calculate payback period
function calculatePaybackPeriod(params) {
    // Get main comparison vendor
    const comparisonVendor = params.vendors.includes('cisco') ? 'cisco' : 
                             params.vendors.includes('aruba') ? 'aruba' :
                             params.vendors.filter(v => v !== 'portnox')[0] || 'cisco';
    
    // Calculate savings per month
    const portnoxTco = calculatePortnoxTco(params);
    const comparisonTco = calculateComparisonVendorTco(comparisonVendor, params);
    
    // Initial investment (implementation cost + hardware cost difference)
    const initialInvestment = portnoxTco.implementation;
    
    // Monthly savings
    const monthlySavings = (comparisonTco.total - portnoxTco.total) / (params.yearsToProject * 12);
    
    // Calculate payback period in months
    const paybackPeriod = Math.ceil(initialInvestment / monthlySavings);
    
    return Math.min(paybackPeriod, params.yearsToProject * 12);
}

// Calculate implementation time
function calculateImplementationTime(params) {
    // Base implementation time based on device count
    let baseTime = 21; // days
    
    if (params.deviceCount <= 500) {
        baseTime = 14;
    } else if (params.deviceCount >= 5000) {
        baseTime = 30;
    } else if (params.deviceCount >= 10000) {
        baseTime = 45;
    }
    
    // Adjust for features
    if (params.cloudIntegration) {
        baseTime += 3;
    }
    
    if (params.legacyDevices) {
        baseTime += 5;
    }
    
    if (params.byodSupport) {
        baseTime += 2;
    }
    
    return baseTime;
}

// Calculate implementation savings percentage
function calculateImplementationSavingsPercentage(params) {
    // Portnox implementation time
    const portnoxTime = calculateImplementationTime(params);
    
    // Typical on-premises solution time (4x longer)
    const onPremTime = portnoxTime * 4;
    
    // Calculate savings percentage
    return Math.round(((onPremTime - portnoxTime) / onPremTime) * 100);
}

// Calculate ROI percentage
function calculateRoi(params) {
    // Get main comparison vendor
    const comparisonVendor = params.vendors.includes('cisco') ? 'cisco' : 
                             params.vendors.includes('aruba') ? 'aruba' :
                             params.vendors.filter(v => v !== 'portnox')[0] || 'cisco';
    
    // Calculate TCO for both solutions
    const portnoxTco = calculatePortnoxTco(params);
    const comparisonTco = calculateComparisonVendorTco(comparisonVendor, params);
    
    // Calculate savings
    const savings = comparisonTco.total - portnoxTco.total;
    
    // Calculate productivity gains (implementation time savings)
    const productivityGains = calculateProductivityGains(params);
    
    // Calculate compliance savings
    const complianceSavings = calculateComplianceSavings(params);
    
    // Calculate breach risk reduction savings
    const riskSavings = calculateRiskReductionSavings(params);
    
    // Calculate total benefits
    const totalBenefits = savings + productivityGains + complianceSavings + riskSavings;
    
    // Calculate investment
    const investment = portnoxTco.total;
    
    // Calculate ROI percentage
    const roi = (totalBenefits / investment) * 100;
    
    return Math.round(roi);
}

// Calculate productivity gains from faster implementation
function calculateProductivityGains(params) {
    // Portnox implementation time
    const portnoxTime = calculateImplementationTime(params);
    
    // Typical on-premises solution time (4x longer)
    const onPremTime = portnoxTime * 4;
    
    // Time saved in days
    const daysSaved = onPremTime - portnoxTime;
    
    // Value per day (based on downtime cost)
    const valuePerDay = params.downtimeCost * 4; // Assuming 4 hours of productivity impact per day
    
    // Total productivity gains
    return daysSaved * valuePerDay;
}

// Calculate compliance savings
function calculateComplianceSavings(params) {
    // Base compliance cost savings
    let baseSavings = 25000;
    
    // Scale based on organization size
    if (params.deviceCount <= 500) {
        baseSavings = 10000;
    } else if (params.deviceCount >= 5000) {
        baseSavings = 50000;
    } else if (params.deviceCount >= 10000) {
        baseSavings = 100000;
    }
    
    // Adjust based on compliance requirements
    const complianceCount = Object.values(params.compliance).filter(Boolean).length;
    const complianceMultiplier = 1 + (complianceCount / 10);
    
    // Apply multiplier
    return Math.round(baseSavings * complianceMultiplier);
}

// Calculate risk reduction savings
function calculateRiskReductionSavings(params) {
    // Base breach cost for a medium organization
    let baseCost = 250000;
    
    // Scale based on organization size
    if (params.deviceCount <= 500) {
        baseCost = 100000;
    } else if (params.deviceCount >= 5000) {
        baseCost = 500000;
    } else if (params.deviceCount >= 10000) {
        baseCost = 1000000;
    }
    
    // Apply risk reduction percentage
    const reduction = params.riskReduction / 100;
    
    // Calculate savings
    return Math.round(baseCost * reduction);
}

// Calculate security improvement percentage
function calculateSecurityImprovement(params) {
    // Base improvement
    let baseImprovement = 70;
    
    // Adjust based on features
    if (params.cloudIntegration) {
        baseImprovement += 5;
    }
    
    if (params.byodSupport) {
        baseImprovement += 2;
    }
    
    if (params.legacyDevices) {
        baseImprovement -= 3;
    }
    
    // Ensure within range
    return Math.min(95, Math.max(50, baseImprovement));
}

// Calculate compliance coverage percentage
function calculateComplianceCoverage(params) {
    // Base coverage
    let baseCoverage = 90;
    
    // Adjust based on compliance requirements
    const complianceCount = Object.values(params.compliance).filter(Boolean).length;
    baseCoverage += complianceCount * 0.5;
    
    // Adjust based on features
    if (params.cloudIntegration) {
        baseCoverage += 1;
    }
    
    if (params.byodSupport) {
        baseCoverage += 1;
    }
    
    if (params.legacyDevices) {
        baseCoverage -= 2;
    }
    
    // Ensure within range
    return Math.min(100, Math.max(80, Math.round(baseCoverage)));
}

// Get vendor color
function getVendorColor(vendor) {
    const vendorColors = {
        'portnox': '#36B37E',
        'cisco': '#0052CC',
        'aruba': '#A44CFE',
        'forescout': '#FF8B00',
        'fortinac': '#6554C0',
        'juniper': '#0747A6',
        'securew2': '#00C7E6',
        'nps': '#00B8D9',
        'arista': '#505F79',
        'foxpass': '#FF5630',
        'noNac': '#FF5630'
    };
    
    return vendorColors[vendor] || '#6B778C';
}

// Get vendor color with opacity
function getVendorColorWithOpacity(vendor, opacity) {
    const color = getVendorColor(vendor);
    
    // Add opacity if color is hex
    if (color.startsWith('#')) {
        // Convert hex to rgb
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    return color;
}
