/**
 * Main Application Initializer (Patched)
 * Includes all missing function definitions
 */

// Global application state
const AppState = {
    initialized: false,
    wizardActive: false,
    dashboardReady: false,
    currentVendors: [],
    currentConfig: null
};

// Main initialization function
async function initializeApplication() {
    console.log('🚀 Starting NAC Total Cost Analyzer...');
    
    try {
        // Phase 1: Initialize core components
        await initializeCoreComponents();
        
        // Phase 2: Load dashboard in background
        await loadDashboardAsync();
        
        // Phase 3: Check wizard state and initialize
        await initializeWizardSystem();
        
        // Phase 4: Set up event handlers
        setupGlobalEventHandlers();
        
        // Phase 5: Fix vendor images with improved logic
        if (typeof fixVendorImagesV2 === 'function') {
            fixVendorImagesV2();
        }
        
        AppState.initialized = true;
        console.log('✅ Application initialized successfully');
        
    } catch (error) {
        console.error('❌ Initialization failed:', error);
    }
}

// Initialize core components
async function initializeCoreComponents() {
    // Set up Chart.js defaults
    if (typeof Chart !== 'undefined') {
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.plugins.legend.position = 'bottom';
        Chart.defaults.animation.duration = 750;
    }
    
    // Initialize vendor data if available
    if (typeof window.vendorDetails === 'undefined') {
        window.vendorDetails = {};
    }
}

// Load dashboard asynchronously
async function loadDashboardAsync() {
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) {
        console.warn('Dashboard content element not found');
        return;
    }
    
    // Show dashboard but keep it initially transparent
    dashboardContent.style.display = 'block';
    dashboardContent.style.opacity = '0';
    
    // Initialize dashboard components
    await Promise.all([
        initializeKPICards(),
        initializeNavigationTabs(),
        createPlaceholderCharts()
    ]);
    
    // Fade in dashboard
    setTimeout(() => {
        dashboardContent.style.opacity = '1';
        AppState.dashboardReady = true;
    }, 300);
}

// Initialize wizard system
async function initializeWizardSystem() {
    // Check if user has completed wizard before
    const wizardCompleted = localStorage.getItem('wizardCompleted');
    const shouldAutoOpen = !wizardCompleted;
    
    // Initialize wizard components
    if (typeof TCOWizard !== 'undefined') {
        TCOWizard.init();
        
        if (shouldAutoOpen) {
            setTimeout(() => {
                console.log('Auto-opening wizard for first-time user');
                TCOWizard.openWizard();
                AppState.wizardActive = true;
            }, 1000);
        }
    } else if (typeof WizardController !== 'undefined') {
        WizardController.init();
        
        if (shouldAutoOpen) {
            setTimeout(() => {
                console.log('Auto-opening wizard for first-time user');
                AppState.wizardActive = true;
            }, 1000);
        }
    }
}

// Initialize KPI cards
async function initializeKPICards() {
    const kpiGrid = document.getElementById('kpi-grid');
    if (!kpiGrid) return;
    
    const defaultKPIs = [
        {
            icon: 'fa-chart-line',
            color: '#2196F3',
            title: 'Average TCO Reduction',
            value: '0%',
            subtitle: 'Total Savings: $0',
            trend: 'Portnox Advantage'
        },
        {
            icon: 'fa-clipboard-check',
            color: '#4CAF50',
            title: 'Average ROI',
            value: '0%',
            subtitle: 'Payback: TBD',
            trend: 'Investment Return'
        },
        {
            icon: 'fa-shield-alt',
            color: '#FF9800',
            title: 'Risk Reduction',
            value: '0%',
            subtitle: 'Security posture improvement',
            trend: 'Enhanced Protection'
        },
        {
            icon: 'fa-rocket',
            color: '#9C27B0',
            title: 'Deployment Speed',
            value: '0% Faster',
            subtitle: 'vs. traditional NAC solutions',
            trend: 'Time to Value'
        }
    ];
    
    kpiGrid.innerHTML = defaultKPIs.map((kpi, index) => `
        <div class="kpi-card stagger-item" style="animation-delay: ${index * 100}ms">
            <div class="kpi-icon" style="background-color: ${kpi.color}20; color: ${kpi.color}">
                <i class="fas ${kpi.icon}"></i>
            </div>
            <div class="kpi-content">
                <div class="kpi-title">${kpi.title}</div>
                <div class="kpi-value">${kpi.value}</div>
                <div class="kpi-subtitle">${kpi.subtitle}</div>
                <div class="kpi-trend">
                    <i class="fas fa-arrow-up"></i> ${kpi.trend}
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize navigation tabs
async function initializeNavigationTabs() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const analysisContent = document.querySelector('.analysis-content');
    
    if (!analysisContent) {
        // Create analysis content container if it doesn't exist
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
        tab.addEventListener('click', async () => {
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
    
    // Activate first tab by default
    if (navTabs.length > 0) {
        navTabs[0].click();
    }
}

// Load tab content (check if functions exist first)
function loadTabContent(tabName) {
    const container = document.getElementById(`${tabName}-content`);
    if (!container || container.dataset.loaded) return;
    
    switch(tabName) {
        case 'financial':
            if (typeof loadFinancialContent === 'function') {
                loadFinancialContent(container);
            } else {
                container.innerHTML = '<p>Financial content loading...</p>';
            }
            break;
        case 'technical':
            if (typeof loadTechnicalContent === 'function') {
                loadTechnicalContent(container);
            } else {
                container.innerHTML = '<p>Technical content loading...</p>';
            }
            break;
        case 'security':
            if (typeof loadSecurityContent === 'function') {
                loadSecurityContent(container);
            } else {
                container.innerHTML = '<p>Security content loading...</p>';
            }
            break;
        case 'implementation':
            if (typeof loadImplementationContent === 'function') {
                loadImplementationContent(container);
            } else {
                container.innerHTML = '<p>Implementation content loading...</p>';
            }
            break;
        case 'vendor':
            if (typeof loadVendorComparison === 'function') {
                loadVendorComparison(container);
            } else {
                container.innerHTML = '<p>Vendor comparison loading...</p>';
            }
            break;
        case 'compliance':
            if (typeof loadComplianceContent === 'function') {
                loadComplianceContent(container);
            } else {
                container.innerHTML = '<p>Compliance content loading...</p>';
            }
            break;
        case 'sensitivity':
            if (typeof loadSensitivityContent === 'function') {
                loadSensitivityContent(container);
            } else {
                container.innerHTML = '<p>Sensitivity analysis loading...</p>';
            }
            break;
    }
    
    container.dataset.loaded = 'true';
}

// Load vendor comparison content
function loadVendorComparison(container) {
    if (typeof window.vendorDetails !== 'undefined') {
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
                <div id="vendor-comparison-result"></div>
            </div>
        `;
        
        // Initialize comparison if function exists
        if (typeof updateFeatureComparison === 'function') {
            updateFeatureComparison('cisco');
            
            document.getElementById('vendor-compare-select')?.addEventListener('change', (e) => {
                updateFeatureComparison(e.target.value);
            });
        }
    } else {
        container.innerHTML = '<p>Vendor comparison data not available.</p>';
    }
}

// Set up global event handlers
function setupGlobalEventHandlers() {
    // Launch wizard button
    const launchWizardBtn = document.getElementById('launch-wizard');
    if (launchWizardBtn) {
        launchWizardBtn.addEventListener('click', () => {
            if (typeof TCOWizard !== 'undefined') {
                TCOWizard.openWizard();
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

// Create placeholder charts
async function createPlaceholderCharts() {
    console.log('Creating placeholder charts...');
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
    initializeApplication();
}

// Export state for debugging
window.AppState = AppState;
