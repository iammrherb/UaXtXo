/**
 * Portnox Total Cost Analyzer Platform
 * Main controller that orchestrates all components
 */

class PortnoxAnalyzerPlatform {
    constructor() {
        this.vendorData = window.ComprehensiveVendorDatabase;
        this.complianceData = window.ComplianceFrameworkDatabase;
        this.riskData = window.RiskInsuranceDatabase;
        
        // Configuration
        this.configuration = {
            devices: 2500,
            years: 3,
            industry: 'technology',
            complianceFrameworks: ['SOC 2', 'ISO 27001'],
            currentView: 'executive'
        };
        
        // Selected vendors for comparison
        this.selectedVendors = ['portnox', 'cisco', 'aruba', 'forescout'];
        
        // Views
        this.views = {};
        
        // Calculation results cache
        this.calculationResults = {};
        
        // Initialize
        this.init();
    }
    
    init() {
        console.log('🚀 Initializing Portnox Total Cost Analyzer Platform...');
        
        // Initialize views
        this.views.executive = new window.ExecutiveDashboard(this);
        this.views.financial = new window.FinancialAnalysis(this);
        this.views.features = new window.FeatureMatrix(this);
        this.views.risk = new window.RiskComplianceAnalysis(this);
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initial calculation
        this.calculateResults();
        
        // Render initial view
        this.renderCurrentView();
        
        console.log('✅ Platform initialized successfully');
    }
    
    setupEventListeners() {
        // Configuration inputs
        document.getElementById('device-count')?.addEventListener('change', (e) => {
            this.configuration.devices = parseInt(e.target.value) || 2500;
            this.recalculate();
        });
        
        document.getElementById('analysis-years')?.addEventListener('change', (e) => {
            this.configuration.years = parseInt(e.target.value) || 3;
            this.recalculate();
        });
        
        document.getElementById('industry-select')?.addEventListener('change', (e) => {
            this.configuration.industry = e.target.value;
            this.recalculate();
        });
        
        // Navigation
        document.querySelectorAll('[data-view]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchView(e.target.dataset.view);
            });
        });
        
        // Vendor selection
        document.querySelectorAll('.vendor-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.updateVendorSelection(e.target.value, e.target.checked);
            });
        });
    }
    
    calculateResults() {
        console.log('📊 Calculating results for all vendors...');
        
        this.calculationResults = {};
        
        this.selectedVendors.forEach(vendorId => {
            const vendor = this.vendorData[vendorId];
            if (!vendor) return;
            
            // Calculate TCO
            const tco = this.vendorData.calculateTCO(
                vendorId, 
                this.configuration.devices, 
                this.configuration.years
            );
            
            // Calculate ROI
            const roi = this.calculateROI(vendor, tco);
            
            // Get compliance score
            const complianceScore = this.complianceData.getComplianceSummary(vendorId).overallScore;
            
            // Store results
            this.calculationResults[vendorId] = {
                vendor,
                tco,
                roi,
                complianceScore,
                score: this.vendorData.calculateVendorScore(vendorId, this.configuration.devices)
            };
        });
        
        // Calculate comparative metrics
        this.calculateComparativeMetrics();
    }
    
    calculateROI(vendor, tco) {
        // Get average competitor TCO
        const competitorTCOs = Object.entries(this.calculationResults)
            .filter(([k]) => k !== vendor.id)
            .map(([, v]) => v.tco?.total || 0);
        
        const avgCompetitorTCO = competitorTCOs.length > 0 ? 
            competitorTCOs.reduce((sum, val) => sum + val, 0) / competitorTCOs.length : 
            tco.total * 1.5; // Assume 50% higher if no competitors
        
        const savings = avgCompetitorTCO - tco.total;
        const roiPercentage = Math.round((savings / tco.total) * 100);
        
        // Calculate payback period
        const monthlySavings = savings / (this.configuration.years * 12);
        const initialInvestment = vendor.pricing?.additionalCosts?.implementation || 0;
        const paybackMonths = initialInvestment > 0 ? 
            Math.round(initialInvestment / monthlySavings) : 
            3; // Immediate payback for cloud solutions
        
        return {
            savings,
            percentage: roiPercentage,
            paybackMonths,
            avgCompetitorTCO
        };
    }
    
    calculateComparativeMetrics() {
        // Add comparative metrics to each result
        const results = Object.values(this.calculationResults);
        const lowestTCO = Math.min(...results.map(r => r.tco.total));
        const avgTCO = results.reduce((sum, r) => sum + r.tco.total, 0) / results.length;
        
        Object.keys(this.calculationResults).forEach(vendorId => {
            const result = this.calculationResults[vendorId];
            result.tco.vsLowest = result.tco.total - lowestTCO;
            result.tco.vsAverage = result.tco.total - avgTCO;
            result.tco.savedVsAverage = avgTCO - result.tco.total;
        });
    }
    
    recalculate() {
        this.calculateResults();
        this.renderCurrentView();
    }
    
    switchView(viewName) {
        this.configuration.currentView = viewName;
        
        // Update navigation
        document.querySelectorAll('[data-view]').forEach(link => {
            link.classList.toggle('active', link.dataset.view === viewName);
        });
        
        this.renderCurrentView();
    }
    
    renderCurrentView() {
        const container = document.getElementById('main-content');
        if (!container) return;
        
        const view = this.views[this.configuration.currentView];
        if (view) {
            view.render(container);
        }
    }
    
    updateVendorSelection(vendorId, selected) {
        if (selected && !this.selectedVendors.includes(vendorId)) {
            this.selectedVendors.push(vendorId);
        } else if (!selected) {
            this.selectedVendors = this.selectedVendors.filter(v => v !== vendorId);
        }
        
        // Always keep Portnox selected
        if (!this.selectedVendors.includes('portnox')) {
            this.selectedVendors.push('portnox');
        }
        
        this.recalculate();
    }
    
    // Action methods
    scheduleDemo() {
        alert('Demo scheduling functionality would open a calendar widget or redirect to scheduling page');
        // In production: window.open('https://portnox.com/schedule-demo', '_blank');
    }
    
    requestProposal() {
        alert('Proposal request form would open with pre-filled organization details');
        // In production: Show modal with proposal request form
    }
    
    downloadReport() {
        alert('Full PDF report would be generated with all analysis data');
        // In production: Generate and download PDF report
    }
    
    startPilot() {
        alert('Pilot program signup would begin with 30-day trial setup');
        // In production: Redirect to pilot program signup
    }
    
    // Export functionality
    exportData(format = 'json') {
        const exportData = {
            configuration: this.configuration,
            results: this.calculationResults,
            timestamp: new Date().toISOString()
        };
        
        if (format === 'json') {
            const blob = new Blob([JSON.stringify(exportData, null, 2)], 
                { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `portnox-tco-analysis-${Date.now()}.json`;
            a.click();
        }
    }
}

// Make platform globally available
window.PortnoxAnalyzerPlatform = PortnoxAnalyzerPlatform;

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.platform = new PortnoxAnalyzerPlatform();
});

console.log('✅ Platform controller loaded');

// Additional methods for enhanced platform

// Advanced Controls Integration
platform.initializeAdvancedControls = function() {
    this.advancedControls = new window.AdvancedCostControls(this);
    this.charts = new window.AdvancedCharts();
};

platform.applyControls = function() {
    const settings = this.advancedControls.getSettings();
    
    // Apply device settings
    this.configuration.devices = settings.devices.base;
    
    // Apply growth if enabled
    if (settings.devices.growth.enabled) {
        this.configuration.deviceGrowth = settings.devices.growth.annual;
    }
    
    // Apply cost overrides
    if (settings.perDevice) {
        Object.entries(settings.perDevice).forEach(([vendorId, pricing]) => {
            const vendor = this.vendorData[vendorId];
            if (vendor && vendor.pricing) {
                Object.assign(vendor.pricing.perDevice, pricing);
            }
        });
    }
    
    // Recalculate with new settings
    this.recalculate();
    
    // Show notification
    this.showNotification('Settings applied successfully', 'success');
};

platform.resetControls = function() {
    location.reload(); // Simple reset for now
};

platform.openScenarioBuilder = function() {
    // Create modal for scenario builder
    const modal = document.createElement('div');
    modal.className = 'modal scenario-builder-modal';
    modal.innerHTML = `
        <div class="modal-content large">
            <h2>Custom Scenario Builder</h2>
            <div class="scenario-builder">
                <p>Custom scenario builder coming soon...</p>
            </div>
            <button class="btn btn-secondary" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
};

platform.showNotification = function(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type} show`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
};

// Initialize enhanced features on load
const originalInit = platform.init;
platform.init = function() {
    originalInit.call(this);
    this.initializeAdvancedControls();
    
    // Load extended databases
    if (window.ExtendedIndustryDatabase) {
        console.log('✅ Extended databases loaded');
    }
};

console.log('✅ Platform enhancements loaded');
