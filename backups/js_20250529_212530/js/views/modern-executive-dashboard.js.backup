/**
 * Modern Executive Dashboard - Complete Implementation
 */

class ModernExecutiveDashboard {
    constructor() {
        this.currentTab = 'overview';
        this.currentSubtab = 'financial';
        this.selectedVendors = ['portnox'];
        this.config = this.loadConfiguration();
        this.vendorData = null;
        this.charts = {};
        
        this.init();
    }
    
    init() {
        console.log('🚀 Initializing Modern Executive Dashboard...');
        
        // Calculate vendor data
        this.refreshVendorData();
        
        // Setup UI
        this.setupDashboard();
        this.setupEventListeners();
        
        // Initial render
        this.render();
    }
    
    loadConfiguration() {
        return {
            deviceCount: parseInt(document.getElementById('device-count')?.value || 1000),
            locationCount: parseInt(document.getElementById('location-count')?.value || 3),
            companySize: document.getElementById('company-size')?.value || 'medium',
            analysisPeriod: parseInt(document.getElementById('analysis-period')?.value || 3),
            fteCost: parseInt(document.getElementById('fte-cost')?.value || 100000),
            breachCost: parseInt(document.getElementById('breach-cost')?.value || 4350000)
        };
    }
    
    refreshVendorData() {
        if (window.vendorCalculator) {
            this.vendorData = window.vendorCalculator.generateVendorComparison(this.config);
        }
    }
    
    setupDashboard() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <!-- Tab Navigation -->
            <div class="tab-navigation">
                <button class="tab-btn active" data-tab="overview">
                    <i class="fas fa-chart-line"></i> Executive Overview
                </button>
                <button class="tab-btn" data-tab="financial">
                    <i class="fas fa-dollar-sign"></i> Financial Analysis
                </button>
                <button class="tab-btn" data-tab="vendors">
                    <i class="fas fa-users"></i> Vendor Comparison
                </button>
                <button class="tab-btn" data-tab="industries">
                    <i class="fas fa-industry"></i> Industries & Compliance
                </button>
                <button class="tab-btn" data-tab="insights">
                    <i class="fas fa-brain"></i> AI Insights
                </button>
            </div>
            
            <!-- Tab Content -->
            <div class="tab-content" id="tab-content">
                <!-- Dynamic content -->
            </div>
        `;
    }
    
    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });
        
        // Configuration changes
        document.querySelectorAll('.enhanced-input, .enhanced-select').forEach(input => {
            input.addEventListener('change', () => {
                this.config = this.loadConfiguration();
                this.refreshVendorData();
                this.render();
            });
        });
        
        // Header buttons
        document.getElementById('main-calculate-btn')?.addEventListener('click', () => {
            this.refreshVendorData();
            this.render();
            this.showNotification('TCO calculation completed!', 'success');
        });
        
        document.getElementById('export-btn')?.addEventListener('click', () => {
            this.exportReport();
        });
        
        document.getElementById('ai-insights-btn')?.addEventListener('click', () => {
            this.switchTab('insights');
        });
    }
    
    switchTab(tab) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        
        this.currentTab = tab;
        this.render();
    }
    
    render() {
        const content = document.getElementById('tab-content');
        
        switch(this.currentTab) {
            case 'overview':
                this.renderOverview(content);
                break;
            case 'financial':
                this.renderFinancialAnalysis(content);
                break;
            case 'vendors':
                this.renderVendorComparison(content);
                break;
            case 'industries':
                this.renderIndustriesCompliance(content);
                break;
            case 'insights':
                this.renderAIInsights(content);
                break;
        }
    }
    
    renderOverview(container) {
        const portnox = this.vendorData.portnox;
        const cisco = this.vendorData.cisco;
        const savings = cisco.tco.tco - portnox.tco.tco;
        
        container.innerHTML = `
            <!-- KPI Cards -->
            <div class="kpis-grid">
                <div class="kpi-card animate-in">
                    <div class="kpi-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <i class="fas fa-piggy-bank"></i>
                    </div>
                    <div class="kpi-value">$${(savings / 1000).toFixed(0)}K</div>
                    <div class="kpi-label">3-Year Savings with Portnox</div>
                </div>
                
                <div class="kpi-card animate-in" style="animation-delay: 0.1s">
                    <div class="kpi-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                        <i class="fas fa-percentage"></i>
                    </div>
                    <div class="kpi-value">${portnox.roi.roi}%</div>
                    <div class="kpi-label">Return on Investment</div>
                </div>
                
                <div class="kpi-card animate-in" style="animation-delay: 0.2s">
                    <div class="kpi-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="kpi-value">${portnox.roi.paybackMonths}</div>
                    <div class="kpi-label">Months to Payback</div>
                </div>
                
                <div class="kpi-card animate-in" style="animation-delay: 0.3s">
                    <div class="kpi-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="kpi-value">${portnox.metrics.securityScore}/100</div>
                    <div class="kpi-label">Security Score</div>
                </div>
            </div>
            
            <!-- Quick Comparison -->
            <div class="chart-container">
                <div class="chart-header">
                    <h3 class="chart-title">TCO Quick Comparison</h3>
                    <div class="chart-actions">
                        <button class="vendor-btn" onclick="dashboard.switchTab('financial')">
                            <i class="fas fa-chart-bar"></i> Detailed Analysis
                        </button>
                    </div>
                </div>
                <div id="tco-comparison-chart" style="height: 400px;"></div>
            </div>
            
            <!-- Vendor Selection -->
            <div class="vendor-selection-section">
                <h3 style="margin-bottom: 1rem;">Select Vendors for Comparison</h3>
                <div class="vendor-grid" id="vendor-grid">
                    <!-- Vendor cards will be rendered here -->
                </div>
            </div>
        `;
        
        // Render vendor cards
        this.renderVendorCards();
        
        // Render TCO comparison chart
        this.renderTCOComparisonChart();
    }
    
    renderVendorCards() {
        const vendorGrid = document.getElementById('vendor-grid');
        if (!vendorGrid) return;
        
        vendorGrid.innerHTML = Object.values(this.vendorData).map(vendor => `
            <div class="vendor-card ${vendor.key === 'portnox' ? 'portnox' : ''} ${this.selectedVendors.includes(vendor.key) ? 'selected' : ''}" 
                 data-vendor="${vendor.key}">
                <div class="vendor-header">
                    <div class="vendor-logo">
                        <img src="./img/vendors/${vendor.key}-logo.png" alt="${vendor.name}">
                    </div>
                    <div class="vendor-info">
                        <h4>${vendor.name}</h4>
                        <div class="vendor-rating">
                            ${this.renderStars(vendor.score / 20)}
                        </div>
                    </div>
                </div>
                
                <div class="vendor-metrics">
                    <div class="metric-item">
                        <div class="metric-label">3-Year TCO</div>
                        <div class="metric-value">$${(vendor.tco.tco / 1000).toFixed(0)}K</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-label">Monthly</div>
                        <div class="metric-value">$${(vendor.tco.monthly / 1000).toFixed(1)}K</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-label">Deploy Time</div>
                        <div class="metric-value">${vendor.metrics.implementationDays}d</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-label">FTE Needed</div>
                        <div class="metric-value">${vendor.metrics.fteRequired}</div>
                    </div>
                </div>
                
                <div class="vendor-actions">
                    <button class="vendor-btn" onclick="dashboard.toggleVendor('${vendor.key}')">
                        ${this.selectedVendors.includes(vendor.key) ? 'Selected' : 'Select'}
                    </button>
                    <button class="vendor-btn" onclick="dashboard.showVendorDetails('${vendor.key}')">
                        Details
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star" style="color: #fbbf24;"></i>';
        }
        if (hasHalf) {
            stars += '<i class="fas fa-star-half-alt" style="color: #fbbf24;"></i>';
        }
        const remaining = 5 - Math.ceil(rating);
        for (let i = 0; i < remaining; i++) {
            stars += '<i class="far fa-star" style="color: #e5e7eb;"></i>';
        }
        
        return stars;
    }
    
    renderTCOComparisonChart() {
        const categories = [];
        const data = [];
        
        this.selectedVendors.forEach(vendorKey => {
            const vendor = this.vendorData[vendorKey];
            if (vendor) {
                categories.push(vendor.name);
                data.push(vendor.tco.tco);
            }
        });
        
        Highcharts.chart('tco-comparison-chart', {
            chart: {
                type: 'column',
                style: { fontFamily: 'Inter, sans-serif' }
            },
            title: { text: null },
            xAxis: {
                categories: categories,
                labels: { style: { fontSize: '12px' } }
            },
            yAxis: {
                title: { text: 'Total Cost of Ownership ($)' },
                labels: {
                    formatter: function() {
                        return '$' + (this.value / 1000) + 'K';
                    }
                }
            },
            series: [{
                name: '3-Year TCO',
                data: data,
                colorByPoint: true,
                colors: ['#28a745', '#2E7EE5', '#ffc107', '#dc3545', '#6f42c1']
            }],
            plotOptions: {
                column: {
                    borderRadius: 8,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + (this.y / 1000).toFixed(0) + 'K';
                        }
                    }
                }
            },
            legend: { enabled: false },
            credits: { enabled: false }
        });
    }
    
    renderFinancialAnalysis(container) {
        container.innerHTML = `
            <!-- Subtab Navigation -->
            <div class="subtab-navigation">
                <button class="subtab-btn active" data-subtab="breakdown">
                    <i class="fas fa-chart-pie"></i> Cost Breakdown
                </button>
                <button class="subtab-btn" data-subtab="roi">
                    <i class="fas fa-chart-line"></i> ROI Analysis
                </button>
                <button class="subtab-btn" data-subtab="cashflow">
                    <i class="fas fa-coins"></i> Cash Flow
                </button>
                <button class="subtab-btn" data-subtab="sensitivity">
                    <i class="fas fa-sliders-h"></i> Sensitivity
                </button>
            </div>
            
            <div class="subtab-content" id="financial-subtab-content">
                <!-- Dynamic subtab content -->
            </div>
        `;
        
        // Setup subtab listeners
        document.querySelectorAll('.subtab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchFinancialSubtab(e.currentTarget.dataset.subtab);
            });
        });
        
        // Render default subtab
        this.switchFinancialSubtab('breakdown');
    }
    
    switchFinancialSubtab(subtab) {
        // Update active subtab
        document.querySelectorAll('.subtab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.subtab === subtab);
        });
        
        const content = document.getElementById('financial-subtab-content');
        
        switch(subtab) {
            case 'breakdown':
                this.renderCostBreakdown(content);
                break;
            case 'roi':
                this.renderROIAnalysis(content);
                break;
            case 'cashflow':
                this.renderCashFlow(content);
                break;
            case 'sensitivity':
                this.renderSensitivityAnalysis(content);
                break;
        }
    }
    
    renderCostBreakdown(container) {
        container.innerHTML = `
            <div class="chart-grid">
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">TCO Component Breakdown</h3>
                    </div>
                    <div id="cost-breakdown-chart" style="height: 400px;"></div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">Cost Distribution by Vendor</h3>
                    </div>
                    <div id="vendor-cost-chart" style="height: 400px;"></div>
                </div>
            </div>
        `;
        
        // Render charts
        this.renderCostBreakdownChart();
        this.renderVendorCostChart();
    }
    
    renderCostBreakdownChart() {
        const portnox = this.vendorData.portnox;
        
        Highcharts.chart('cost-breakdown-chart', {
            chart: {
                type: 'pie',
                style: { fontFamily: 'Inter, sans-serif' }
            },
            title: { text: null },
            series: [{
                name: 'Cost',
                data: [
                    { name: 'Licensing', y: portnox.tco.breakdown.license, color: '#2E7EE5' },
                    { name: 'Implementation', y: portnox.tco.breakdown.implementation, color: '#28a745' },
                    { name: 'Operational', y: portnox.tco.breakdown.operational, color: '#ffc107' },
                    { name: 'Infrastructure', y: portnox.tco.breakdown.infrastructure, color: '#dc3545' },
                    { name: 'Training', y: portnox.tco.breakdown.training, color: '#6f42c1' }
                ]
            }],
            plotOptions: {
                pie: {
                    innerSize: '60%',
                    dataLabels: {
                        formatter: function() {
                            return this.point.name + '<br>$' + (this.y / 1000).toFixed(0) + 'K';
                        }
                    }
                }
            },
            credits: { enabled: false }
        });
    }
    
    renderVendorCostChart() {
        const series = Object.keys(this.vendorData[Object.keys(this.vendorData)[0]].tco.breakdown).map(component => {
            return {
                name: component.charAt(0).toUpperCase() + component.slice(1),
                data: this.selectedVendors.map(vendorKey => {
                    const vendor = this.vendorData[vendorKey];
                    return vendor ? vendor.tco.breakdown[component] : 0;
                })
            };
        });
        
        Highcharts.chart('vendor-cost-chart', {
            chart: {
                type: 'bar',
                style: { fontFamily: 'Inter, sans-serif' }
            },
            title: { text: null },
            xAxis: {
                categories: this.selectedVendors.map(v => this.vendorData[v]?.name || v)
            },
            yAxis: {
                title: { text: 'Cost ($)' },
                labels: {
                    formatter: function() {
                        return '$' + (this.value / 1000) + 'K';
                    }
                }
            },
            series: series,
            plotOptions: {
                bar: {
                    stacking: 'normal',
                    borderRadius: 4,
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            legend: {
                reversed: true
            },
            credits: { enabled: false }
        });
    }
    
    renderIndustriesCompliance(container) {
        // This will be handled by the Industries & Compliance tab module
        if (window.industriesComplianceTab) {
            window.industriesComplianceTab.render(container);
        } else {
            container.innerHTML = '<p>Loading Industries & Compliance data...</p>';
        }
    }
    
    renderAIInsights(container) {
        // This will be handled by the AI Insights module
        if (window.aiInsightsEngine) {
            window.aiInsightsEngine.render(container);
        } else {
            container.innerHTML = '<p>Loading AI Insights...</p>';
        }
    }
    
    toggleVendor(vendorKey) {
        const index = this.selectedVendors.indexOf(vendorKey);
        if (index > -1) {
            if (this.selectedVendors.length > 1) {
                this.selectedVendors.splice(index, 1);
            }
        } else {
            this.selectedVendors.push(vendorKey);
        }
        
        this.render();
    }
    
    showVendorDetails(vendorKey) {
        const vendor = this.vendorData[vendorKey];
        // Implement vendor details modal
        console.log('Show details for:', vendor);
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    exportReport() {
        this.showNotification('Generating comprehensive report...', 'info');
        // Implement export functionality
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new ModernExecutiveDashboard();
});

console.log('✅ Modern Executive Dashboard loaded');

    // Add export functionality integration
    async exportReport() {
        const exportData = {
            vendors: this.vendorData,
            config: this.config,
            selectedVendors: this.selectedVendors,
            generatedDate: new Date().toISOString()
        };
        
        // Show export options modal
        this.showExportModal(exportData);
    }
    
    showExportModal(data) {
        const modal = document.createElement('div');
        modal.className = 'export-modal';
        modal.innerHTML = `
            <div class="export-dialog">
                <div class="export-header">
                    <h2>Export Executive Report</h2>
                    <button class="close-btn" onclick="this.closest('.export-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="export-content">
                    <h3>Select Export Format:</h3>
                    <div class="export-options">
                        <button class="export-option" onclick="dashboard.exportPDF()">
                            <i class="fas fa-file-pdf fa-3x"></i>
                            <h4>PDF Report</h4>
                            <p>Comprehensive executive report with charts and analysis</p>
                        </button>
                        <button class="export-option" onclick="dashboard.exportExcel()">
                            <i class="fas fa-file-excel fa-3x"></i>
                            <h4>Excel Workbook</h4>
                            <p>Detailed data with multiple analysis sheets</p>
                        </button>
                        <button class="export-option" onclick="dashboard.exportPowerPoint()">
                            <i class="fas fa-file-powerpoint fa-3x"></i>
                            <h4>PowerPoint Presentation</h4>
                            <p>Executive presentation ready for meetings</p>
                        </button>
                    </div>
                    <div class="export-all">
                        <button class="action-btn primary" onclick="dashboard.exportAll()">
                            <i class="fas fa-download"></i> Export All Formats
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Store export data
        this.exportData = data;
    }
    
    async exportPDF() {
        document.querySelector('.export-modal')?.remove();
        if (window.professionalExportSystem) {
            await window.professionalExportSystem.generateExecutivePDF(this.exportData);
        }
    }
    
    async exportExcel() {
        document.querySelector('.export-modal')?.remove();
        if (window.professionalExportSystem) {
            await window.professionalExportSystem.generateExcelReport(this.exportData);
        }
    }
    
    async exportPowerPoint() {
        document.querySelector('.export-modal')?.remove();
        if (window.professionalExportSystem) {
            await window.professionalExportSystem.generatePowerPointPresentation(this.exportData);
        }
    }
    
    async exportAll() {
        document.querySelector('.export-modal')?.remove();
        if (window.professionalExportSystem) {
            await window.professionalExportSystem.exportAll(this.exportData);
        }
    }
