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
    } else if (industry === 'energy') {
        document.getElementById('compliance-nist').checked = true;
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
        
        if (header && content) {
            header.addEventListener('click', function() {
                const icon = header.querySelector('i.fas');
                content.classList.toggle('collapsed');
                
                if (content.classList.contains('collapsed')) {
                    icon.className = 'fas fa-chevron-down';
                } else {
                    icon.className = 'fas fa-chevron-up';
                }
            });
        }
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
            
            // Reset sub-tabs to first tab
            const activeViewPanel = document.querySelector(`.view-panel[data-view="${view}"]`);
            if (activeViewPanel) {
                // Reset to first tab within this view
                const firstTab = activeViewPanel.querySelector('.results-tab');
                if (firstTab) {
                    firstTab.click();
                }
            }
        });
    });
    
    // Result tabs functionality
    const resultsTabs = document.querySelectorAll('.results-tab');
    
    resultsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const panelId = this.getAttribute('data-panel');
            const tabsContainer = this.parentElement;
            
            // Update active tab
            tabsContainer.querySelectorAll('.results-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active panel - find all sibling panels of this tab set
            const parentPanel = tabsContainer.closest('.view-panel');
            if (parentPanel) {
                parentPanel.querySelectorAll('.results-panel').forEach(panel => {
                    if (panel.id === panelId) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            }
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
    if (window.particlesJS) {
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
        exportPdfBtn.addEventListener('click', function() {
            console.log('Exporting PDF report...');
            // This will be handled by report-generator.js
        });
    }
    
    // Help button
    const helpBtn = document.getElementById('help-btn');
    const helpModal = document.getElementById('help-modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (helpBtn && helpModal) {
        helpBtn.addEventListener('click', function() {
            helpModal.style.display = 'block';
        });
        
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                helpModal.style.display = 'none';
            });
        }
        
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

// Show toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
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
    if (progressBar) {
        progressBar.style.animationDuration = '4s';
    }
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Export this function for global access
window.showToast = showToast;
