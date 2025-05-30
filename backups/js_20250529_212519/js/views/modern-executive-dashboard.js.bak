/**
 * Modern Executive Dashboard - Complete Implementation
 */

class ModernExecutiveDashboard {
    constructor() {
        this.currentTab = 'overview';
        this.currentSubtab = 'financial';
        this.selectedVendors = ['portnox', 'cisco', 'aruba'];
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
            breachCost: parseInt(document.getElementById('breach-cost')?.value || 4350000),
            portnoxPricing: parseFloat(document.getElementById('portnox-pricing')?.value || 3.5)
        };
    }
    
    refreshVendorData() {
        if (window.vendorCalculator) {
            // Update Portnox pricing if slider exists
            if (this.config.portnoxPricing) {
                window.vendorCalculator.setPortnoxPricing(this.config.portnoxPricing);
            }
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
                <button class="tab-btn" data-tab="risk">
                    <i class="fas fa-shield-alt"></i> Risk & Security
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
            case 'risk':
                this.renderRiskAnalysis(content);
                break;
            case 'insights':
                this.renderAIInsights(content);
                break;
        }
    }
    
    renderOverview(container) {
        const portnox = this.vendorData?.portnox;
        const cisco = this.vendorData?.cisco;
        
        if (!portnox || !cisco) {
            container.innerHTML = '<p>Loading vendor data...</p>';
            return;
        }
        
        const savings = cisco.tco.tco - portnox.tco.tco;
        const avgCompetitorTCO = this.calculateAverageCompetitorTCO();
        const portnoxSavingsPercent = Math.round(((avgCompetitorTCO - portnox.tco.tco) / avgCompetitorTCO) * 100);
        
        container.innerHTML = `
            <!-- Portnox Pricing Slider -->
            <div class="pricing-slider-container">
                <h3>Portnox Pricing per Device/Month</h3>
                <div class="slider-wrapper">
                    <input type="range" id="portnox-pricing" class="pricing-slider" 
                           min="1" max="6" step="0.1" value="${this.config.portnoxPricing}">
                    <div class="slider-labels">
                        <span>$1.00</span>
                        <span id="portnox-price-display">$${this.config.portnoxPricing.toFixed(2)}</span>
                        <span>$6.00</span>
                    </div>
                </div>
            </div>
            
            <!-- KPI Cards -->
            <div class="kpis-grid">
                <div class="kpi-card animate-in">
                    <div class="kpi-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <i class="fas fa-piggy-bank"></i>
                    </div>
                    <div class="kpi-value">$${(savings / 1000).toFixed(0)}K</div>
                    <div class="kpi-label">3-Year Savings vs Cisco ISE</div>
                    <div class="kpi-change positive">+${portnoxSavingsPercent}% vs Market Avg</div>
                </div>
                
                <div class="kpi-card animate-in" style="animation-delay: 0.1s">
                    <div class="kpi-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                        <i class="fas fa-percentage"></i>
                    </div>
                    <div class="kpi-value">${portnox.roi.roi}%</div>
                    <div class="kpi-label">Return on Investment</div>
                    <div class="kpi-change">Annual: $${(portnox.roi.annualSavings / 1000).toFixed(0)}K</div>
                </div>
                
                <div class="kpi-card animate-in" style="animation-delay: 0.2s">
                    <div class="kpi-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="kpi-value">${portnox.roi.paybackMonths}</div>
                    <div class="kpi-label">Months to Payback</div>
                    <div class="kpi-change">${portnox.metrics.implementationDays} Days Deploy</div>
                </div>
                
                <div class="kpi-card animate-in" style="animation-delay: 0.3s">
                    <div class="kpi-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="kpi-value">${portnox.risk?.riskReduction || 30}%</div>
                    <div class="kpi-label">Risk Reduction</div>
                    <div class="kpi-change">Score: ${portnox.metrics.securityScore}/100</div>
                </div>
            </div>
            
            <!-- Quick Comparison Chart -->
            <div class="chart-container">
                <div class="chart-header">
                    <h3 class="chart-title">TCO Comparison - Top Vendors</h3>
                    <div class="chart-actions">
                        <button class="vendor-btn" onclick="dashboard.switchTab('vendors')">
                            <i class="fas fa-users"></i> All Vendors
                        </button>
                    </div>
                </div>
                <div id="tco-comparison-chart" style="height: 400px;"></div>
            </div>
            
            <!-- Vendor Selection Grid -->
            <div class="vendor-selection-section">
                <h3 style="margin-bottom: 1rem;">Select Vendors for Detailed Comparison</h3>
                <div class="vendor-grid" id="vendor-grid">
                    <!-- Vendor cards will be rendered here -->
                </div>
            </div>
        `;
        
        // Setup pricing slider listener
        const slider = document.getElementById('portnox-pricing');
        if (slider) {
            slider.addEventListener('input', (e) => {
                const price = parseFloat(e.target.value);
                document.getElementById('portnox-price-display').textContent = `$${price.toFixed(2)}`;
                this.config.portnoxPricing = price;
                this.refreshVendorData();
                this.updateKPIs();
                this.renderTCOComparisonChart();
            });
        }
        
        // Render components
        this.renderVendorCards();
        this.renderTCOComparisonChart();
    }
    
    calculateAverageCompetitorTCO() {
        if (!this.vendorData) return 0;
        const competitors = Object.values(this.vendorData).filter(v => v.key !== 'portnox');
        const total = competitors.reduce((sum, v) => sum + v.tco.tco, 0);
        return total / competitors.length;
    }
    
    updateKPIs() {
        const portnox = this.vendorData?.portnox;
        const cisco = this.vendorData?.cisco;
        
        if (!portnox || !cisco) return;
        
        const savings = cisco.tco.tco - portnox.tco.tco;
        const avgCompetitorTCO = this.calculateAverageCompetitorTCO();
        const portnoxSavingsPercent = Math.round(((avgCompetitorTCO - portnox.tco.tco) / avgCompetitorTCO) * 100);
        
        // Update KPI values
        const kpiCards = document.querySelectorAll('.kpi-card');
        if (kpiCards[0]) {
            kpiCards[0].querySelector('.kpi-value').textContent = `$${(savings / 1000).toFixed(0)}K`;
            kpiCards[0].querySelector('.kpi-change').textContent = `+${portnoxSavingsPercent}% vs Market Avg`;
        }
        if (kpiCards[1]) {
            kpiCards[1].querySelector('.kpi-value').textContent = `${portnox.roi.roi}%`;
        }
        if (kpiCards[2]) {
            kpiCards[2].querySelector('.kpi-value').textContent = `${portnox.roi.paybackMonths}`;
        }
    }
    
    renderVendorCards() {
        const vendorGrid = document.getElementById('vendor-grid');
        if (!vendorGrid || !this.vendorData) return;
        
        const sortedVendors = Object.values(this.vendorData)
            .sort((a, b) => b.score - a.score);
        
        vendorGrid.innerHTML = sortedVendors.map(vendor => `
            <div class="vendor-card ${vendor.key === 'portnox' ? 'portnox' : ''} ${this.selectedVendors.includes(vendor.key) ? 'selected' : ''}" 
                 data-vendor="${vendor.key}">
                <div class="vendor-header">
                    <div class="vendor-logo">
                        <img src="./img/vendors/${vendor.key}-logo.png" alt="${vendor.name}" 
                             onerror="this.src='./img/vendors/default-logo.png'">
                    </div>
                    <div class="vendor-info">
                        <h4>${vendor.name}</h4>
                        <div class="vendor-rating">
                            ${this.renderStars(vendor.score / 20)}
                            <span class="score-badge">${vendor.score}</span>
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
                        <div class="metric-label">Deploy</div>
                        <div class="metric-value">${vendor.metrics.implementationDays}d</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-label">FTE</div>
                        <div class="metric-value">${vendor.metrics.fteRequired}</div>
                    </div>
                </div>
                
                <div class="vendor-badges">
                    ${vendor.metrics.cloudNative ? '<span class="badge cloud">Cloud Native</span>' : ''}
                    ${vendor.metrics.zeroTrustScore >= 85 ? '<span class="badge zt">Zero Trust</span>' : ''}
                    ${vendor.metrics.automationLevel >= 85 ? '<span class="badge auto">Automated</span>' : ''}
                </div>
                
                <div class="vendor-actions">
                    <button class="vendor-btn ${this.selectedVendors.includes(vendor.key) ? 'selected' : ''}" 
                            onclick="dashboard.toggleVendor('${vendor.key}')">
                        <i class="fas ${this.selectedVendors.includes(vendor.key) ? 'fa-check' : 'fa-plus'}"></i>
                        ${this.selectedVendors.includes(vendor.key) ? 'Selected' : 'Select'}
                    </button>
                    <button class="vendor-btn" onclick="dashboard.showVendorDetails('${vendor.key}')">
                        <i class="fas fa-info-circle"></i> Details
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
        const tcoData = [];
        const colors = [];
        
        // Get top 8 vendors by score
        const topVendors = Object.values(this.vendorData || {})
            .sort((a, b) => b.score - a.score)
            .slice(0, 8);
        
        topVendors.forEach(vendor => {
            categories.push(vendor.name);
            tcoData.push(vendor.tco.tco);
            colors.push(vendor.key === 'portnox' ? '#28a745' : '#2E7EE5');
        });
        
        if (typeof Highcharts !== 'undefined') {
            Highcharts.chart('tco-comparison-chart', {
                chart: {
                    type: 'column',
                    style: { fontFamily: 'Inter, sans-serif' }
                },
                title: { text: null },
                xAxis: {
                    categories: categories,
                    labels: { 
                        style: { fontSize: '11px' },
                        rotation: -45
                    }
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
                    data: tcoData,
                    colorByPoint: true,
                    colors: colors
                }],
                plotOptions: {
                    column: {
                        borderRadius: 8,
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                                return '$' + (this.y / 1000).toFixed(0) + 'K';
                            },
                            style: { fontSize: '10px' }
                        }
                    }
                },
                legend: { enabled: false },
                credits: { enabled: false }
            });
        }
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
                        <h3 class="chart-title">Portnox TCO Component Breakdown</h3>
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
            
            <div class="chart-container">
                <div class="chart-header">
                    <h3 class="chart-title">FTE Requirements Comparison</h3>
                </div>
                <div id="fte-comparison-chart" style="height: 350px;"></div>
            </div>
        `;
        
        // Render charts
        this.renderCostBreakdownChart();
        this.renderVendorCostChart();
        this.renderFTEComparisonChart();
    }
    
    renderCostBreakdownChart() {
        const portnox = this.vendorData?.portnox;
        if (!portnox || typeof Highcharts === 'undefined') return;
        
        Highcharts.chart('cost-breakdown-chart', {
            chart: {
                type: 'pie',
                style: { fontFamily: 'Inter, sans-serif' }
            },
            title: { text: null },
            series: [{
                name: 'Cost',
                innerSize: '60%',
                data: [
                    { 
                        name: 'Licensing', 
                        y: portnox.tco.breakdown.license || 0, 
                        color: '#2E7EE5' 
                    },
                    { 
                        name: 'Implementation', 
                        y: portnox.tco.breakdown.implementation || 0, 
                        color: '#28a745' 
                    },
                    { 
                        name: 'Operational (FTE)', 
                        y: portnox.tco.breakdown.operational || 0, 
                        color: '#ffc107' 
                    },
                    { 
                        name: 'Infrastructure', 
                        y: portnox.tco.breakdown.infrastructure || 0, 
                        color: '#dc3545' 
                    },
                    { 
                        name: 'Training', 
                        y: portnox.tco.breakdown.training || 0, 
                        color: '#6f42c1' 
                    },
                    { 
                        name: 'Maintenance', 
                        y: portnox.tco.breakdown.maintenance || 0, 
                        color: '#17a2b8' 
                    }
                ].filter(item => item.y > 0)
            }],
            plotOptions: {
                pie: {
                    dataLabels: {
                        formatter: function() {
                            return this.point.name + '<br>$' + (this.y / 1000).toFixed(0) + 'K<br>' + 
                                   '(' + this.percentage.toFixed(1) + '%)';
                        }
                    }
                }
            },
            credits: { enabled: false }
        });
    }
    
    renderVendorCostChart() {
        if (!this.vendorData || typeof Highcharts === 'undefined') return;
        
        const series = [];
        const categories = this.selectedVendors.map(v => this.vendorData[v]?.name || v);
        
        // Create series for each cost component
        const components = ['license', 'implementation', 'operational', 'infrastructure', 'training', 'maintenance'];
        const componentNames = {
            license: 'Licensing',
            implementation: 'Implementation',
            operational: 'Operational (FTE)',
            infrastructure: 'Infrastructure',
            training: 'Training',
            maintenance: 'Maintenance'
        };
        
        components.forEach(component => {
            series.push({
                name: componentNames[component],
                data: this.selectedVendors.map(vendorKey => {
                    const vendor = this.vendorData[vendorKey];
                    return vendor?.tco.breakdown[component] || 0;
                })
            });
        });
        
        Highcharts.chart('vendor-cost-chart', {
            chart: {
                type: 'bar',
                style: { fontFamily: 'Inter, sans-serif' }
            },
            title: { text: null },
            xAxis: {
                categories: categories
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
    
    renderFTEComparisonChart() {
        if (!this.vendorData || typeof Highcharts === 'undefined') return;
        
        const vendors = Object.values(this.vendorData)
            .sort((a, b) => a.metrics.fteRequired - b.metrics.fteRequired)
            .slice(0, 10);
        
        const categories = vendors.map(v => v.name);
        const fteData = vendors.map(v => v.metrics.fteRequired);
        const fteCosts = vendors.map(v => v.metrics.fteRequired * this.config.fteCost * this.config.analysisPeriod);
        
        Highcharts.chart('fte-comparison-chart', {
            chart: {
                type: 'bar',
                style: { fontFamily: 'Inter, sans-serif' }
            },
            title: { text: null },
            xAxis: {
                categories: categories,
                labels: { style: { fontSize: '11px' } }
            },
            yAxis: [{
                title: { text: 'FTE Required' },
                labels: {
                    formatter: function() {
                        return this.value + ' FTE';
                    }
                }
            }, {
                title: { text: 'FTE Cost (3 Years)' },
                opposite: true,
                labels: {
                    formatter: function() {
                        return '$' + (this.value / 1000) + 'K';
                    }
                }
            }],
            series: [{
                name: 'FTE Required',
                data: fteData,
                color: '#2E7EE5'
            }, {
                name: '3-Year FTE Cost',
                data: fteCosts,
                yAxis: 1,
                color: '#ffc107'
            }],
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            if (this.series.name === 'FTE Required') {
                                return this.y + ' FTE';
                            } else {
                                return '$' + (this.y / 1000).toFixed(0) + 'K';
                            }
                        },
                        style: { fontSize: '10px' }
                    }
                }
            },
            legend: {
                align: 'center',
                verticalAlign: 'top'
            },
            credits: { enabled: false }
        });
    }
    
    renderROIAnalysis(container) {
        container.innerHTML = '<p>ROI Analysis - Implementation in progress</p>';
    }
    
    renderCashFlow(container) {
        container.innerHTML = '<p>Cash Flow Analysis - Implementation in progress</p>';
    }
    
    renderSensitivityAnalysis(container) {
        container.innerHTML = '<p>Sensitivity Analysis - Implementation in progress</p>';
    }
    
    renderVendorComparison(container) {
        container.innerHTML = '<p>Full Vendor Comparison - Implementation in progress</p>';
    }
    
    renderRiskAnalysis(container) {
        container.innerHTML = '<p>Risk & Security Analysis - Implementation in progress</p>';
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
            if (this.selectedVendors.length < 6) {
                this.selectedVendors.push(vendorKey);
            } else {
                this.showNotification('Maximum 6 vendors can be selected', 'warning');
            }
        }
        
        this.render();
    }
    
    showVendorDetails(vendorKey) {
        const vendor = this.vendorData[vendorKey];
        console.log('Show details for:', vendor);
        this.showNotification(`Showing details for ${vendor.name}`, 'info');
    }
    
    sortVendors(criteria) {
        console.log('Sort by:', criteria);
        this.renderVendorComparisonGrid();
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                           type === 'warning' ? 'exclamation-triangle' : 
                           type === 'error' ? 'times-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    async exportReport() {
        const exportData = {
            vendors: this.vendorData,
            config: this.config,
            selectedVendors: this.selectedVendors,
            generatedDate: new Date().toISOString()
        };
        
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
    
    generateDetailedReport() {
        this.showNotification('Generating detailed AI report...', 'info');
    }
    
    scheduleDemo() {
        this.showNotification('Opening demo scheduling...', 'info');
        window.open('https://portnox.com/demo', '_blank');
    }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new ModernExecutiveDashboard();
});

console.log('✅ Modern Executive Dashboard loaded');
