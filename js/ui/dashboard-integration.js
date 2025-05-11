/**
 * Dashboard Integration Module
 * Connects TCO Wizard data to dashboard displays
 */
const DashboardIntegration = (function() {
    let wizardData = null;
    
    // Listen for wizard completion
    function setupEventListeners() {
        // Listen for custom event from TCO wizard
        document.addEventListener('tco-wizard-complete', function(event) {
            wizardData = event.detail;
            updateDashboard();
        });
        
        // Listen for skip to dashboard button
        document.getElementById('skip-to-dashboard')?.addEventListener('click', function() {
            showDashboard();
        });
    }
    
    // Update dashboard with wizard data
    function updateDashboard() {
        if (!wizardData) return;
        
        // Update vendor comparison info
        const comparisonInfo = document.getElementById('vendor-comparison-info');
        if (comparisonInfo) {
            comparisonInfo.innerHTML = generateVendorComparisonHTML(wizardData.vendors);
        }
        
        // Update KPIs
        const kpiGrid = document.getElementById('kpi-grid');
        if (kpiGrid) {
            kpiGrid.innerHTML = generateKPIHTML(wizardData.calculations);
        }
        
        // Show dashboard
        showDashboard();
        
        // Initialize charts
        if (typeof ChartManager !== 'undefined') {
            ChartManager.updateCharts(wizardData);
        }
    }
    
    // Show dashboard and hide wizard
    function showDashboard() {
        const dashboardContent = document.getElementById('dashboard-content');
        const wizardOverlay = document.getElementById('wizard-overlay');
        
        if (dashboardContent) {
            dashboardContent.style.display = 'block';
        }
        
        if (wizardOverlay) {
            wizardOverlay.classList.add('hidden');
        }
    }
    
    // Generate vendor comparison HTML
    function generateVendorComparisonHTML(vendors) {
        if (!vendors || vendors.length === 0) {
            return '<p>No vendors selected. Please run the TCO wizard to compare vendors.</p>';
        }
        
        return `
            <div class="vendor-comparison-grid">
                ${vendors.map(vendor => `
                    <div class="vendor-comparison-card">
                        <img src="img/vendors/${vendor.logo}" 
                             alt="${vendor.name}" 
                             data-vendor-logo="${vendor.id}"
                             class="vendor-logo">
                        <h3>${vendor.name}</h3>
                        <p class="vendor-type">${vendor.type}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Generate KPI HTML
    function generateKPIHTML(calculations) {
        if (!calculations) {
            return '<p>No calculations available. Please complete the TCO wizard.</p>';
        }
        
        return `
            <div class="kpi-card">
                <div class="kpi-icon">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="kpi-content">
                    <div class="kpi-value">$${calculations.totalSavings?.toLocaleString() || '0'}</div>
                    <div class="kpi-label">Total Savings</div>
                </div>
            </div>
            <div class="kpi-card">
                <div class="kpi-icon">
                    <i class="fas fa-percentage"></i>
                </div>
                <div class="kpi-content">
                    <div class="kpi-value">${calculations.roiPercentage?.toFixed(1) || '0'}%</div>
                    <div class="kpi-label">ROI</div>
                </div>
            </div>
            <div class="kpi-card">
                <div class="kpi-icon">
                    <i class="fas fa-calendar"></i>
                </div>
                <div class="kpi-content">
                    <div class="kpi-value">${calculations.paybackMonths || '0'}</div>
                    <div class="kpi-label">Months to Payback</div>
                </div>
            </div>
        `;
    }
    
    // Initialize
    function init() {
        setupEventListeners();
        
        // Load logo images after dashboard updates
        if (typeof LogoLoader !== 'undefined') {
            document.addEventListener('dashboard-updated', function() {
                LogoLoader.loadAllVendorLogos();
            });
        }
    }
    
    return {
        init,
        updateDashboard,
        showDashboard,
        setWizardData: function(data) {
            wizardData = data;
            updateDashboard();
        }
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', DashboardIntegration.init);
} else {
    DashboardIntegration.init();
}
