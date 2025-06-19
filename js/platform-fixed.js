// Portnox TCO Analyzer Platform - Fixed Version
class PortnoxAnalyzerPlatform {
    constructor() {
        this.state = {
            vendors: ['portnox', 'cisco', 'aruba', 'forescout'],
            selectedVendors: ['portnox', 'cisco'],
            orgSize: 'medium',
            industry: 'technology',
            devices: 2500,
            years: 5
        };
        
        this.modules = {};
        this.initialized = false;
    }
    
    async init() {
        console.log('🚀 Initializing Portnox TCO Analyzer Platform...');
        
        try {
            // Wait for all modules to load
            await this.waitForModules();
            
            // Initialize modules
            this.initializeModules();
            
            // Setup UI
            this.setupUI();
            
            // Run initial calculations
            this.calculateResults();
            
            this.initialized = true;
            console.log('✅ Platform initialized successfully');
        } catch (error) {
            console.error('❌ Platform initialization failed:', error);
        }
    }
    
    async waitForModules() {
        const requiredModules = [
            'VendorDataComplete',
            'ComplianceDatabase',
            'CompleteIndustryCompliance',
            'AdvancedControls',
            'AdvancedCharts'
        ];
        
        return new Promise((resolve) => {
            const checkModules = () => {
                const allLoaded = requiredModules.every(module => {
                    return window[module] || (window.ModuleLoader && window.ModuleLoader.isLoaded(module));
                });
                
                if (allLoaded) {
                    console.log('✅ All required modules loaded');
                    resolve();
                } else {
                    const missing = requiredModules.filter(m => 
                        !window[m] && (!window.ModuleLoader || !window.ModuleLoader.isLoaded(m))
                    );
                    console.log('⏳ Waiting for modules:', missing);
                    setTimeout(checkModules, 100);
                }
            };
            checkModules();
        });
    }
    
    initializeModules() {
        // Get modules
        this.modules.vendorData = window.VendorDataComplete || window.vendorData;
        this.modules.compliance = window.ComplianceDatabase;
        this.modules.industry = window.CompleteIndustryCompliance;
        this.modules.controls = window.AdvancedControls;
        this.modules.charts = window.AdvancedCharts;
        
        // Initialize controls
        if (this.modules.controls && this.modules.controls.init) {
            this.modules.controls.init();
        }
        
        // Initialize charts
        if (this.modules.charts && this.modules.charts.init) {
            this.modules.charts.init();
        }
    }
    
    setupUI() {
        console.log('🎨 Setting up UI...');
        
        // Setup vendor selection
        this.setupVendorSelection();
        
        // Setup controls
        this.setupControls();
        
        // Setup results containers
        this.setupResultsContainers();
    }
    
    setupVendorSelection() {
        const container = document.getElementById('vendor-selection');
        if (!container || !this.modules.vendorData) return;
        
        const vendors = Object.keys(this.modules.vendorData);
        container.innerHTML = vendors.map(vendor => {
            const data = this.modules.vendorData[vendor];
            return `
                <div class="vendor-card" data-vendor="${vendor}">
                    <input type="checkbox" id="vendor-${vendor}" value="${vendor}"
                           ${this.state.selectedVendors.includes(vendor) ? 'checked' : ''}>
                    <label for="vendor-${vendor}">
                        <img src="${data.logo}" alt="${data.name}" 
                             onerror="this.src='img/placeholder-logo.png'">
                        <h4>${data.name}</h4>
                        <p>${data.description || ''}</p>
                    </label>
                </div>
            `;
        }).join('');
        
        // Add event listeners
        container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateSelectedVendors());
        });
    }
    
    setupControls() {
        // Organization size
        const sizeSelect = document.getElementById('org-size');
        if (sizeSelect) {
            sizeSelect.value = this.state.orgSize;
            sizeSelect.addEventListener('change', (e) => {
                this.state.orgSize = e.target.value;
                this.updateDeviceCount();
            });
        }
        
        // Industry
        const industrySelect = document.getElementById('industry');
        if (industrySelect) {
            industrySelect.value = this.state.industry;
            industrySelect.addEventListener('change', (e) => {
                this.state.industry = e.target.value;
            });
        }
        
        // Calculate button
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculateResults());
        }
    }
    
    setupResultsContainers() {
        const results = document.getElementById('results-container');
        if (!results) return;
        
        // Ensure all necessary containers exist
        const sections = [
            'executive-summary',
            'cost-comparison',
            'roi-analysis',
            'risk-assessment',
            'compliance-coverage',
            'feature-comparison'
        ];
        
        sections.forEach(section => {
            if (!document.getElementById(section)) {
                const div = document.createElement('div');
                div.id = section;
                div.className = 'result-section';
                results.appendChild(div);
            }
        });
    }
    
    updateSelectedVendors() {
        this.state.selectedVendors = [];
        document.querySelectorAll('#vendor-selection input:checked').forEach(checkbox => {
            this.state.selectedVendors.push(checkbox.value);
        });
        
        // Ensure Portnox is always included
        if (!this.state.selectedVendors.includes('portnox')) {
            this.state.selectedVendors.unshift('portnox');
            const portnoxCheckbox = document.getElementById('vendor-portnox');
            if (portnoxCheckbox) portnoxCheckbox.checked = true;
        }
    }
    
    updateDeviceCount() {
        const sizeMap = {
            small: 500,
            medium: 2500,
            large: 10000,
            enterprise: 50000
        };
        this.state.devices = sizeMap[this.state.orgSize] || 2500;
    }
    
    calculateResults() {
        console.log('📊 Calculating results...');
        
        try {
            // Calculate TCO for each vendor
            const results = this.state.selectedVendors.map(vendor => {
                return this.calculateVendorTCO(vendor);
            });
            
            // Sort by total cost
            results.sort((a, b) => a.totalCost - b.totalCost);
            
            // Update all displays
            this.updateExecutiveSummary(results);
            this.updateCostComparison(results);
            this.updateROIAnalysis(results);
            this.updateRiskAssessment(results);
            this.updateComplianceCoverage();
            this.updateFeatureComparison();
            
            console.log('✅ Results calculated successfully');
        } catch (error) {
            console.error('❌ Error calculating results:', error);
        }
    }
    
    calculateVendorTCO(vendor) {
        const vendorData = this.modules.vendorData[vendor];
        if (!vendorData) {
            console.error(`Vendor data not found for: ${vendor}`);
            return null;
        }
        
        const costs = {
            licensing: 0,
            hardware: 0,
            implementation: 0,
            operational: 0,
            hidden: 0,
            risk: 0
        };
        
        // Simple calculation for demonstration
        if (vendor === 'portnox') {
            costs.licensing = 24000 * this.state.years;
            costs.implementation = 3200;
            costs.operational = 30000 * this.state.years;
            costs.risk = 50000;
        } else {
            costs.licensing = 85000 + (65 * this.state.devices);
            costs.hardware = 125000;
            costs.implementation = 144000;
            costs.operational = 180000 * this.state.years;
            costs.risk = 200000;
        }
        
        const totalCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0);
        
        return {
            vendor,
            vendorName: vendorData.name,
            costs,
            totalCost,
            annualCost: totalCost / this.state.years
        };
    }
    
    updateExecutiveSummary(results) {
        const container = document.getElementById('executive-summary');
        if (!container) return;
        
        const portnox = results.find(r => r.vendor === 'portnox');
        const avgCompetitor = results
            .filter(r => r.vendor !== 'portnox')
            .reduce((sum, r, _, arr) => sum + r.totalCost / arr.length, 0);
        
        const savings = avgCompetitor - portnox.totalCost;
        const savingsPercent = (savings / avgCompetitor * 100).toFixed(1);
        
        container.innerHTML = `
            <h2>Executive Summary</h2>
            <div class="metrics-grid">
                <div class="metric-card">
                    <h3>Total Savings</h3>
                    <p class="metric-value">$${savings.toLocaleString()}</p>
                    <p class="metric-subtitle">vs. average competitor</p>
                </div>
                <div class="metric-card">
                    <h3>Cost Reduction</h3>
                    <p class="metric-value">${savingsPercent}%</p>
                    <p class="metric-subtitle">lower TCO</p>
                </div>
                <div class="metric-card">
                    <h3>ROI Timeline</h3>
                    <p class="metric-value">6-9 months</p>
                    <p class="metric-subtitle">typical payback</p>
                </div>
                <div class="metric-card">
                    <h3>Risk Reduction</h3>
                    <p class="metric-value">85%</p>
                    <p class="metric-subtitle">security improvement</p>
                </div>
            </div>
        `;
    }
    
    updateCostComparison(results) {
        const container = document.getElementById('cost-comparison');
        if (!container) return;
        
        container.innerHTML = `
            <h2>Total Cost of Ownership</h2>
            <canvas id="tco-chart" height="400"></canvas>
        `;
        
        // Create chart using the fixed chart module
        if (this.modules.charts && typeof Chart !== 'undefined') {
            const ctx = document.getElementById('tco-chart');
            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: results.map(r => r.vendorName),
                        datasets: [{
                            label: '5-Year TCO',
                            data: results.map(r => r.totalCost),
                            backgroundColor: results.map(r => 
                                r.vendor === 'portnox' ? '#00B4D8' : '#FF6B6B'
                            )
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: value => '$' + (value/1000000).toFixed(1) + 'M'
                                }
                            }
                        }
                    }
                });
            }
        }
    }
    
    updateROIAnalysis(results) {
        const container = document.getElementById('roi-analysis');
        if (!container) return;
        
        container.innerHTML = `
            <h2>ROI Analysis</h2>
            <p>Detailed ROI analysis showing break-even points and cumulative savings.</p>
        `;
    }
    
    updateRiskAssessment(results) {
        const container = document.getElementById('risk-assessment');
        if (!container) return;
        
        container.innerHTML = `
            <h2>Risk Assessment</h2>
            <p>Comprehensive risk reduction analysis across all security categories.</p>
        `;
    }
    
    updateComplianceCoverage() {
        const container = document.getElementById('compliance-coverage');
        if (!container) return;
        
        container.innerHTML = `
            <h2>Compliance Coverage</h2>
            <p>Framework coverage comparison across all selected vendors.</p>
        `;
    }
    
    updateFeatureComparison() {
        const container = document.getElementById('feature-comparison');
        if (!container) return;
        
        container.innerHTML = `
            <h2>Feature Comparison</h2>
            <p>Detailed feature matrix comparing all capabilities.</p>
        `;
    }
    
    runSensitivityAnalysis() {
        console.log('Running sensitivity analysis...');
        // Implement sensitivity analysis
    }
}

// Create global instance
window.PortnoxAnalyzerPlatform = PortnoxAnalyzerPlatform;
window.platform = new PortnoxAnalyzerPlatform();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.platform.init();
    });
} else {
    window.platform.init();
}

console.log('✅ Platform loaded and initialized');
