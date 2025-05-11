/**
 * NAC Total Cost Analyzer - Comprehensive Main Script
 * This includes all necessary functions in one file to avoid loading issues
 */

// Global application state
const AppState = {
    initialized: false,
    wizardActive: false,
    dashboardReady: false,
    currentVendors: [],
    currentConfig: null
};

// Tab content loading functions
function loadFinancialContent(container) {
    console.log('Loading financial content...');
    container.innerHTML = `
        <div class="content-grid">
            <div class="chart-container">
                <h3>TCO Comparison</h3>
                <canvas id="tco-comparison-chart"></canvas>
            </div>
            <div class="chart-container">
                <h3>Cost Breakdown</h3>
                <canvas id="cost-breakdown-chart"></canvas>
            </div>
            <div class="chart-container">
                <h3>ROI Analysis</h3>
                <canvas id="roi-analysis-chart"></canvas>
            </div>
            <div class="metrics-container">
                <h3>Financial Metrics</h3>
                <div id="financial-metrics">
                    <p>Financial metrics will be populated after wizard completion.</p>
                </div>
            </div>
        </div>
    `;
    
    // Initialize charts
    setTimeout(() => {
        const tcoCanvas = document.getElementById('tco-comparison-chart');
        if (tcoCanvas && typeof Chart !== 'undefined') {
            new Chart(tcoCanvas, {
                type: 'bar',
                data: {
                    labels: ['Year 1', 'Year 2', 'Year 3', 'Total'],
                    datasets: [{
                        label: 'Current Solution',
                        data: [0, 0, 0, 0],
                        backgroundColor: 'rgba(255, 99, 132, 0.7)'
                    }, {
                        label: 'Portnox Cloud',
                        data: [0, 0, 0, 0],
                        backgroundColor: 'rgba(75, 192, 192, 0.7)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: value => '$' + value.toLocaleString()
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'TCO Comparison Over Time'
                        }
                    }
                }
            });
        }
    }, 100);
}

function loadTechnicalContent(container) {
    console.log('Loading technical content...');
    container.innerHTML = `
        <div class="technical-analysis">
            <h3>Technical Assessment</h3>
            <div class="technical-metrics">
                <div class="metric-card">
                    <h4>Deployment Time</h4>
                    <p>Analysis will be available after wizard completion.</p>
                </div>
                <div class="metric-card">
                    <h4>Integration Complexity</h4>
                    <p>Analysis will be available after wizard completion.</p>
                </div>
                <div class="metric-card">
                    <h4>Scalability</h4>
                    <p>Analysis will be available after wizard completion.</p>
                </div>
            </div>
        </div>
    `;
}

function loadSecurityContent(container) {
    console.log('Loading security content...');
    container.innerHTML = `
        <div class="security-analysis">
            <div class="risk-matrix-container">
                <h3>Risk Assessment Matrix</h3>
                <div id="risk-matrix">
                    <p>Risk analysis will be populated after wizard completion.</p>
                </div>
            </div>
            <div class="breach-impact-container">
                <h3>Breach Impact Analysis</h3>
                <div id="breach-impact">
                    <p>Breach impact analysis will be populated after wizard completion.</p>
                </div>
            </div>
        </div>
    `;
    
    // Initialize security visualizations if available
    if (typeof RiskAnalysis !== 'undefined') {
        setTimeout(() => {
            RiskAnalysis.createRiskTable('#risk-matrix', 'cloud-nac');
            RiskAnalysis.createBreachImpactVisualization('#breach-impact', ['no-nac', 'cloud-nac']);
        }, 100);
    }
}

function loadImplementationContent(container) {
    console.log('Loading implementation content...');
    container.innerHTML = `
        <div class="implementation-timeline">
            <h3>Implementation Timeline</h3>
            <div class="timeline-chart">
                <p>Implementation timeline will be available after wizard completion.</p>
            </div>
        </div>
    `;
}

function loadVendorComparison(container) {
    console.log('Loading vendor comparison...');
    container.innerHTML = `
        <div class="vendor-comparison-section">
            <div class="vendor-selector-container">
                <label for="vendor-compare-select">Compare Portnox Cloud with:</label>
                <select id="vendor-compare-select" class="form-control">
                    <option value="cisco">Cisco ISE</option>
                    <option value="aruba">Aruba ClearPass</option>
                    <option value="forescout">Forescout</option>
                    <option value="fortinac">FortiNAC</option>
                </select>
            </div>
            <div id="vendor-comparison-result">
                <p>Select vendors in the wizard to see detailed comparison.</p>
            </div>
        </div>
    `;
    
    // Initialize comparison if function exists
    setTimeout(() => {
        if (typeof updateFeatureComparison === 'function') {
            updateFeatureComparison('cisco');
            
            document.getElementById('vendor-compare-select')?.addEventListener('change', (e) => {
                updateFeatureComparison(e.target.value);
            });
        }
    }, 100);
}

function loadComplianceContent(container) {
    console.log('Loading compliance content...');
    container.innerHTML = `
        <div class="compliance-impact">
            <h3>Compliance Impact Analysis</h3>
            <div class="compliance-matrix">
                <p>Compliance analysis will be available after wizard completion.</p>
            </div>
        </div>
    `;
}

function loadSensitivityContent(container) {
    console.log('Loading sensitivity content...');
    container.innerHTML = `
        <div class="sensitivity-analysis">
            <h3>Sensitivity Analysis</h3>
            <div class="sensitivity-chart">
                <p>Sensitivity analysis will be available after wizard completion.</p>
            </div>
        </div>
    `;
}

// Main initialization function
async function initializeApplication() {
    console.log('🚀 Starting NAC Total Cost Analyzer (Comprehensive)...');
    
    try {
        // Initialize Chart.js defaults
        if (typeof Chart !== 'undefined') {
            Chart.defaults.font.family = "'Inter', sans-serif";
            Chart.defaults.plugins.legend.position = 'bottom';
            Chart.defaults.animation.duration = 750;
        }
        
        // Load dashboard
        await loadDashboardAsync();
        
        // Initialize wizard
        await initializeWizardSystem();
        
        // Set up event handlers
        setupGlobalEventHandlers();
        
        // Fix vendor images
        fixVendorImages();
        
        AppState.initialized = true;
        console.log('✅ Application initialized successfully');
        
    } catch (error) {
        console.error('❌ Initialization failed:', error);
    }
}

// Load dashboard
async function loadDashboardAsync() {
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) return;
    
    // Show dashboard but keep it transparent initially
    dashboardContent.style.display = 'block';
    dashboardContent.style.opacity = '0';
    
    // Initialize components
    initializeKPICards();
    initializeNavigationTabs();
    
    // Fade in
    setTimeout(() => {
        dashboardContent.style.opacity = '1';
        AppState.dashboardReady = true;
    }, 300);
}

// Initialize KPI cards
function initializeKPICards() {
    const kpiGrid = document.getElementById('kpi-grid');
    if (!kpiGrid) return;
    
    const defaultKPIs = [
        {
            icon: 'fa-chart-line',
            color: '#2196F3',
            title: 'Average TCO Reduction',
            value: '0%',
            subtitle: 'Complete wizard to calculate',
            trend: 'Portnox Advantage'
        },
        {
            icon: 'fa-clipboard-check',
            color: '#4CAF50',
            title: 'Average ROI',
            value: '0%',
            subtitle: 'Complete wizard to calculate',
            trend: 'Investment Return'
        },
        {
            icon: 'fa-shield-alt',
            color: '#FF9800',
            title: 'Risk Reduction',
            value: '0%',
            subtitle: 'Complete wizard to calculate',
            trend: 'Enhanced Protection'
        },
        {
            icon: 'fa-rocket',
            color: '#9C27B0',
            title: 'Deployment Speed',
            value: '0% Faster',
            subtitle: 'Complete wizard to calculate',
            trend: 'Time to Value'
        }
    ];
    
    kpiGrid.innerHTML = defaultKPIs.map((kpi, index) => `
        <div class="kpi-card" style="animation-delay: ${index * 100}ms">
            <div class="kpi-icon" style="background-color: ${kpi.color}20; color: ${kpi.color}">
                <i class="fas ${kpi.icon}"></i>
            </div>
            <div class="kpi-content">
                <div class="kpi-title">${kpi.title}</div>
                <div class="kpi-value">${kpi.value}</div>
                <div class="kpi-subtitle">${kpi.subtitle}</div>
                <div class="kpi-trend" style="color: ${kpi.color}">
                    <i class="fas fa-arrow-up"></i> ${kpi.trend}
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize navigation tabs
function initializeNavigationTabs() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const analysisContent = document.querySelector('.analysis-content');
    
    if (!analysisContent) {
        const container = document.createElement('div');
        container.className = 'analysis-content';
        document.querySelector('.main-content')?.appendChild(container);
    }
    
    // Create tab content containers
    const tabNames = ['financial', 'technical', 'security', 'implementation', 'vendor', 'compliance', 'sensitivity'];
    
    tabNames.forEach(tabName => {
        if (!document.getElementById(`${tabName}-content`)) {
            const tabContent = document.createElement('div');
            tabContent.id = `${tabName}-content`;
            tabContent.className = 'tab-content';
            document.querySelector('.analysis-content')?.appendChild(tabContent);
        }
    });
    
    // Set up tab click handlers
    navTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Update active states
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding content
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            const targetContent = document.getElementById(`${tabName}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Load tab content
                loadTabContent(tabName);
            }
        });
    });
    
    // Activate first tab
    if (navTabs.length > 0) {
        navTabs[0].click();
    }
}

// Load tab content
function loadTabContent(tabName) {
    const container = document.getElementById(`${tabName}-content`);
    if (!container || container.dataset.loaded === 'true') return;
    
    switch(tabName) {
        case 'financial':
            loadFinancialContent(container);
            break;
        case 'technical':
            loadTechnicalContent(container);
            break;
        case 'security':
            loadSecurityContent(container);
            break;
        case 'implementation':
            loadImplementationContent(container);
            break;
        case 'vendor':
            loadVendorComparison(container);
            break;
        case 'compliance':
            loadComplianceContent(container);
            break;
        case 'sensitivity':
            loadSensitivityContent(container);
            break;
    }
    
    container.dataset.loaded = 'true';
}

// Initialize wizard system
async function initializeWizardSystem() {
    const wizardCompleted = localStorage.getItem('wizardCompleted');
    const shouldAutoOpen = !wizardCompleted;
    
    // Initialize wizard based on what's available
    if (typeof TCOWizard !== 'undefined') {
        console.log('Initializing TCOWizard...');
        TCOWizard.init();
        
        if (shouldAutoOpen) {
            setTimeout(() => {
                console.log('Auto-opening TCOWizard for first-time user');
                TCOWizard.openWizard();
                AppState.wizardActive = true;
            }, 1000);
        }
    } else if (typeof WizardController !== 'undefined') {
        console.log('Initializing WizardController...');
        WizardController.init();
        
        if (shouldAutoOpen) {
            setTimeout(() => {
                console.log('Auto-opening WizardController');
                AppState.wizardActive = true;
            }, 1000);
        }
    } else {
        console.log('No wizard system found, checking for modal...');
        // Fallback to modal if available
        const wizardModal = document.getElementById('tco-wizard-modal');
        if (wizardModal && shouldAutoOpen) {
            setTimeout(() => {
                wizardModal.classList.remove('hidden');
                wizardModal.classList.add('active');
                AppState.wizardActive = true;
            }, 1000);
        }
    }
}

// Fix vendor images
function fixVendorImages() {
    console.log('Fixing vendor images...');
    
    // Common image paths to try
    const imagePaths = {
        'cisco': ['img/vendors/cisco-logo.png', 'img/vendors/cisco.png', 'img/cisco-logo.png'],
        'aruba': ['img/vendors/aruba-logo.png', 'img/vendors/aruba.png', 'img/aruba-logo.png'],
        'forescout': ['img/vendors/forescout-logo.png', 'img/vendors/forescout.png', 'img/forescout-logo.png'],
        'portnox': ['img/vendors/portnox-logo.png', 'img/vendors/portnox.png', 'img/portnox-logo.png'],
        'microsoft': ['img/vendors/microsoft-logo.png', 'img/vendors/nps-logo.png', 'img/microsoft-logo.png'],
        'securew2': ['img/vendors/securew2-logo.png', 'img/vendors/securew2.png', 'img/securew2-logo.png'],
        'fortinac': ['img/vendors/fortinac-logo.png', 'img/vendors/fortinet-logo.png', 'img/fortinet-logo.png'],
        'no-nac': ['img/vendors/no-nac.png', 'img/vendors/no-nac-icon.png', 'img/no-nac.png']
    };
    
    document.querySelectorAll('img').forEach(img => {
        if (img.dataset.imageFixed === 'true') return;
        
        img.addEventListener('error', function() {
            const src = this.src;
            const filename = src.split('/').pop().split('.')[0].toLowerCase();
            
            // Try to match vendor name
            for (const [vendor, paths] of Object.entries(imagePaths)) {
                if (filename.includes(vendor) || filename.includes(vendor.replace('-', ''))) {
                    const currentPathIndex = parseInt(this.dataset.pathIndex || '0');
                    
                    if (currentPathIndex < paths.length) {
                        this.src = paths[currentPathIndex];
                        this.dataset.pathIndex = (currentPathIndex + 1).toString();
                    } else {
                        // Final fallback
                        this.src = 'img/portnox-logo.png';
                        this.dataset.imageFixed = 'true';
                    }
                    return;
                }
            }
            
            // Unknown vendor - use main logo
            this.src = 'img/portnox-logo.png';
            this.dataset.imageFixed = 'true';
        });
    });
}

// Set up global event handlers
function setupGlobalEventHandlers() {
    // Launch wizard button
    const launchWizardBtn = document.getElementById('launch-wizard');
    if (launchWizardBtn) {
        launchWizardBtn.addEventListener('click', () => {
            console.log('Launch wizard clicked');
            
            if (typeof TCOWizard !== 'undefined' && TCOWizard.openWizard) {
                TCOWizard.openWizard();
            } else if (typeof WizardController !== 'undefined' && WizardController.openWizard) {
                WizardController.openWizard();
            } else {
                const wizardModal = document.getElementById('tco-wizard-modal');
                if (wizardModal) {
                    wizardModal.classList.remove('hidden');
                    wizardModal.classList.add('active');
                }
            }
            AppState.wizardActive = true;
        });
    }
    
    // Skip to dashboard button
    const skipToDashboardBtn = document.getElementById('skip-to-dashboard');
    if (skipToDashboardBtn) {
        skipToDashboardBtn.addEventListener('click', () => {
            closeWizardAndShowDashboard();
        });
    }
    
    // Wizard close button
    const wizardCloseBtn = document.getElementById('wizard-close');
    if (wizardCloseBtn) {
        wizardCloseBtn.addEventListener('click', () => {
            closeWizardAndShowDashboard();
        });
    }
}

// Close wizard and show dashboard
function closeWizardAndShowDashboard() {
    if (typeof TCOWizard !== 'undefined' && TCOWizard.closeWizard) {
        TCOWizard.closeWizard();
    }
    
    const wizardModal = document.getElementById('tco-wizard-modal');
    if (wizardModal) {
        wizardModal.classList.add('hidden');
        wizardModal.classList.remove('active');
    }
    
    const dashboardContent = document.getElementById('dashboard-content');
    if (dashboardContent) {
        dashboardContent.style.opacity = '1';
        dashboardContent.style.display = 'block';
    }
    
    AppState.wizardActive = false;
    localStorage.setItem('wizardCompleted', 'true');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
    initializeApplication();
}

// Export functions globally
window.loadFinancialContent = loadFinancialContent;
window.loadTechnicalContent = loadTechnicalContent;
window.loadSecurityContent = loadSecurityContent;
window.loadImplementationContent = loadImplementationContent;
window.loadVendorComparison = loadVendorComparison;
window.loadComplianceContent = loadComplianceContent;
window.loadSensitivityContent = loadSensitivityContent;
window.AppState = AppState;
