/**
 * Comprehensive Executive Dashboard
 * Complete vendor analysis with advanced charts
 */

class ComprehensiveExecutiveDashboard {
    constructor() {
        this.initialized = false;
        this.currentTab = 'overview';
        this.selectedVendors = ['portnox', 'cisco', 'aruba', 'forescout'];
        this.chartInstances = {};
        
        // Complete vendor data
        this.vendorData = {
            'portnox': {
                name: 'Portnox Cloud',
                shortName: 'Portnox',
                logo: './img/vendors/portnox-logo.png',
                color: '#1a5a96',
                tco3Year: 245000,
                roi3Year: 325,
                implementationDays: 21,
                fteRequired: 0.25,
                securityScore: 95,
                licensePerDevice: 45
            },
            'cisco': {
                name: 'Cisco ISE',
                shortName: 'Cisco',
                logo: './img/vendors/cisco-logo.png',
                color: '#00bceb',
                tco3Year: 520000,
                roi3Year: 45,
                implementationDays: 90,
                fteRequired: 2.0,
                securityScore: 85,
                licensePerDevice: 85
            },
            'aruba': {
                name: 'Aruba ClearPass',
                shortName: 'Aruba',
                logo: './img/vendors/aruba-logo.png',
                color: '#ff6900',
                tco3Year: 480000,
                roi3Year: 85,
                implementationDays: 75,
                fteRequired: 1.75,
                securityScore: 82,
                licensePerDevice: 75
            },
            'forescout': {
                name: 'Forescout Platform',
                shortName: 'Forescout',
                logo: './img/vendors/forescout-logo.png',
                color: '#7a2a90',
                tco3Year: 430000,
                roi3Year: 95,
                implementationDays: 60,
                fteRequired: 1.5,
                securityScore: 88,
                licensePerDevice: 70
            },
            'fortinac': {
                name: 'FortiNAC',
                shortName: 'FortiNAC',
                logo: './img/vendors/fortinet-logo.png',
                color: '#ee3124',
                tco3Year: 400000,
                roi3Year: 105,
                implementationDays: 60,
                fteRequired: 1.25,
                securityScore: 80,
                licensePerDevice: 65
            },
            'juniper': {
                name: 'Juniper Mist',
                shortName: 'Juniper',
                logo: './img/vendors/juniper-logo.png',
                color: '#84bd00',
                tco3Year: 350000,
                roi3Year: 125,
                implementationDays: 45,
                fteRequired: 1.0,
                securityScore: 78,
                licensePerDevice: 55
            },
            'arista': {
                name: 'Arista CloudVision',
                shortName: 'Arista',
                logo: './img/vendors/arista-logo.png',
                color: '#ff6600',
                tco3Year: 320000,
                roi3Year: 115,
                implementationDays: 45,
                fteRequired: 1.0,
                securityScore: 75,
                licensePerDevice: 50
            },
            'microsoft': {
                name: 'Microsoft NPS',
                shortName: 'Microsoft',
                logo: './img/vendors/microsoft-logo.png',
                color: '#00bcf2',
                tco3Year: 290000,
                roi3Year: 95,
                implementationDays: 30,
                fteRequired: 1.0,
                securityScore: 65,
                licensePerDevice: 40
            },
            'securew2': {
                name: 'SecureW2',
                shortName: 'SecureW2',
                logo: './img/vendors/securew2-logo.png',
                color: '#2c5aa0',
                tco3Year: 280000,
                roi3Year: 285,
                implementationDays: 30,
                fteRequired: 0.5,
                securityScore: 72,
                licensePerDevice: 35
            },
            'foxpass': {
                name: 'Foxpass',
                shortName: 'Foxpass',
                logo: './img/vendors/foxpass-logo.png',
                color: '#ff4444',
                tco3Year: 270000,
                roi3Year: 265,
                implementationDays: 25,
                fteRequired: 0.5,
                securityScore: 68,
                licensePerDevice: 30
            }
        };
    }
    
    init() {
        if (this.initialized) return this;
        
        console.log("🚀 Initializing Comprehensive Executive Dashboard...");
        
        this.createExecutiveContainer();
        this.createVendorSelection();
        this.createExecutiveKPIs();
        this.createTabNavigation();
        this.createTabContent();
        this.setupEventListeners();
        this.initializeParticles();
        this.startAnimations();
        
        this.initialized = true;
        console.log("✅ Executive Dashboard initialized successfully");
        return this;
    }
    
    createExecutiveContainer() {
        const container = document.querySelector('#executive-view .view-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="comprehensive-executive-dashboard fade-in">
                <!-- Executive Header -->
                <div class="executive-header glass-panel">
                    <div class="executive-branding">
                        <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="executive-logo" style="height: 40px;">
                        <div class="executive-titles">
                            <h1 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Executive Intelligence Center</h1>
                            <p style="color: #666;">Zero Trust NAC Strategic Analysis & Decision Support</p>
                        </div>
                    </div>
                    <div class="executive-actions">
                        <button class="header-btn primary" id="generate-report">
                            <i class="fas fa-file-chart"></i> Generate Report
                        </button>
                        <button class="header-btn secondary" id="export-data">
                            <i class="fas fa-download"></i> Export
                        </button>
                    </div>
                </div>
                
                <!-- Vendor Selection -->
                <div id="vendor-selection-container"></div>
                
                <!-- Executive KPIs -->
                <div id="executive-kpis-container"></div>
                
                <!-- Tab Navigation -->
                <div id="tab-navigation-container"></div>
                
                <!-- Tab Content -->
                <div id="tab-content-container"></div>
            </div>
        `;
    }
    
    createVendorSelection() {
        const container = document.getElementById('vendor-selection-container');
        if (!container) return;
        
        const vendorButtons = Object.keys(this.vendorData).map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const isActive = this.selectedVendors.includes(vendorId);
            
            return `
                <button class="vendor-btn ${isActive ? 'active' : ''}" data-vendor="${vendorId}">
                    <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-btn-logo">
                    <span class="vendor-btn-name">${vendor.shortName}</span>
                </button>
            `;
        }).join('');
        
        container.innerHTML = `
            <div class="vendor-selection-bar slide-up">
                <div class="vendor-label">
                    <i class="fas fa-balance-scale"></i>
                    Compare Solutions:
                </div>
                <div class="vendor-buttons">
                    ${vendorButtons}
                </div>
                <div class="vendor-stats">
                    <span class="selected-count">${this.selectedVendors.length}</span> vendors selected
                </div>
            </div>
        `;
    }
    
    createExecutiveKPIs() {
        const container = document.getElementById('executive-kpis-container');
        if (!container) return;
        
        const portnoxData = this.vendorData.portnox;
        const averageCompetitor = this.calculateAverageCompetitor();
        
        container.innerHTML = `
            <div class="executive-kpis slide-up">
                <div class="kpi-card">
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${Math.round((averageCompetitor.tco3Year - portnoxData.tco3Year) / 1000)}">0</span>
                            <span class="currency">K</span>
                        </div>
                        <div class="metric-label">Cost Savings</div>
                        <div class="metric-subtitle">3-Year TCO Reduction</div>
                        <div class="trend-indicator">
                            <i class="fas fa-trending-down"></i>
                            <span>${Math.round(((averageCompetitor.tco3Year - portnoxData.tco3Year) / averageCompetitor.tco3Year) * 100)}% vs Competition</span>
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card">
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${portnoxData.roi3Year}">0</span>
                            <span class="currency">%</span>
                        </div>
                        <div class="metric-label">ROI</div>
                        <div class="metric-subtitle">3-Year Return</div>
                        <div class="trend-indicator">
                            <i class="fas fa-rocket"></i>
                            <span>7-Month Payback</span>
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card">
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${portnoxData.implementationDays}">0</span>
                            <span class="currency">Days</span>
                        </div>
                        <div class="metric-label">Time to Deploy</div>
                        <div class="metric-subtitle">Implementation Speed</div>
                        <div class="trend-indicator">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>${Math.round(((averageCompetitor.implementationDays - portnoxData.implementationDays) / averageCompetitor.implementationDays) * 100)}% Faster</span>
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card">
                    <div class="kpi-metrics">
                        <div class="primary-metric">
                            <span class="value" data-animate="${portnoxData.securityScore}">0</span>
                            <span class="currency">%</span>
                        </div>
                        <div class="metric-label">Security Score</div>
                        <div class="metric-subtitle">Zero Trust Readiness</div>
                        <div class="trend-indicator">
                            <i class="fas fa-award"></i>
                            <span>Industry Leading</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    calculateAverageCompetitor() {
        const competitors = Object.keys(this.vendorData).filter(id => id !== 'portnox');
        const totals = competitors.reduce((acc, vendorId) => {
            const vendor = this.vendorData[vendorId];
            return {
                tco3Year: acc.tco3Year + vendor.tco3Year,
                implementationDays: acc.implementationDays + vendor.implementationDays,
                securityScore: acc.securityScore + vendor.securityScore
            };
        }, { tco3Year: 0, implementationDays: 0, securityScore: 0 });
        
        return {
            tco3Year: totals.tco3Year / competitors.length,
            implementationDays: totals.implementationDays / competitors.length,
            securityScore: totals.securityScore / competitors.length
        };
    }
    
    createTabNavigation() {
        const container = document.getElementById('tab-navigation-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="tab-navigation fade-in">
                <div class="main-tabs">
                    <button class="main-tab active" data-tab="overview">
                        <div class="tab-icon"><i class="fas fa-tachometer-alt"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Overview</span>
                            <span class="tab-subtitle">Executive Summary</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="financial">
                        <div class="tab-icon"><i class="fas fa-chart-line"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Financial</span>
                            <span class="tab-subtitle">TCO & ROI</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="security">
                        <div class="tab-icon"><i class="fas fa-shield-alt"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Security</span>
                            <span class="tab-subtitle">Risk & Compliance</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="vendors">
                        <div class="tab-icon"><i class="fas fa-balance-scale"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Vendors</span>
                            <span class="tab-subtitle">Matrix</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="compliance">
                        <div class="tab-icon"><i class="fas fa-clipboard-check"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Compliance</span>
                            <span class="tab-subtitle">Frameworks</span>
                        </div>
                    </button>
                    
                    <button class="main-tab" data-tab="insurance">
                        <div class="tab-icon"><i class="fas fa-umbrella"></i></div>
                        <div class="tab-content">
                            <span class="tab-title">Insurance</span>
                            <span class="tab-subtitle">Risk Impact</span>
                        </div>
                    </button>
                </div>
            </div>
        `;
    }
    
    createTabContent() {
        const container = document.getElementById('tab-content-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="tab-content-area">
                <!-- Overview Tab -->
                <div class="tab-panel active" data-panel="overview">
                    <div class="chart-grid">
                        <div class="chart-container">
                            <div class="chart-title">
                                <i class="fas fa-chart-bar"></i>
                                TCO Comparison (3-Year)
                            </div>
                            <div class="chart-subtitle">Total cost of ownership across NAC solutions</div>
                            <div class="chart-wrapper" id="overview-tco-chart"></div>
                        </div>
                        
                        <div class="chart-container">
                            <div class="chart-title">
                                <i class="fas fa-clock"></i>
                                Implementation Timeline
                            </div>
                            <div class="chart-subtitle">Days to full deployment</div>
                            <div class="chart-wrapper" id="overview-timeline-chart"></div>
                        </div>
                        
                        <div class="chart-container full-width">
                            <div class="chart-title">
                                <i class="fas fa-chart-area"></i>
                                Multi-Year ROI Projection
                            </div>
                            <div class="chart-subtitle">Return on investment over 5 years</div>
                            <div class="chart-wrapper" id="overview-roi-chart"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Financial Tab -->
                <div class="tab-panel" data-panel="financial">
                    <div class="chart-grid">
                        <div class="chart-container">
                            <div class="chart-title">
                                <i class="fas fa-dollar-sign"></i>
                                Per Device Cost Analysis
                            </div>
                            <div class="chart-wrapper" id="financial-per-device-chart"></div>
                        </div>
                        
                        <div class="chart-container">
                            <div class="chart-title">
                                <i class="fas fa-users"></i>
                                FTE Requirements
                            </div>
                            <div class="chart-wrapper" id="financial-fte-chart"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Security Tab -->
                <div class="tab-panel" data-panel="security">
                    <div class="chart-grid">
                        <div class="chart-container">
                            <div class="chart-title">
                                <i class="fas fa-shield-alt"></i>
                                Security Capabilities
                            </div>
                            <div class="chart-wrapper" id="security-radar-chart"></div>
                        </div>
                        
                        <div class="chart-container">
                            <div class="chart-title">
                                <i class="fas fa-exclamation-triangle"></i>
                                Risk Reduction
                            </div>
                            <div class="chart-wrapper" id="security-risk-chart"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Vendors Tab -->
                <div class="tab-panel" data-panel="vendors">
                    <div class="chart-container">
                        <div class="chart-title">
                            <i class="fas fa-table"></i>
                            Vendor Comparison Matrix
                        </div>
                        <div id="vendor-comparison-matrix"></div>
                    </div>
                </div>
                
                <!-- Compliance Tab -->
                <div class="tab-panel" data-panel="compliance">
                    <div class="chart-grid">
                        <div class="chart-container full-width">
                            <div class="chart-title">
                                <i class="fas fa-clipboard-check"></i>
                                Compliance Framework Coverage
                            </div>
                            <div class="chart-wrapper" id="compliance-chart"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Insurance Tab -->
                <div class="tab-panel" data-panel="insurance">
                    <div class="chart-grid">
                        <div class="chart-container">
                            <div class="chart-title">
                                <i class="fas fa-umbrella"></i>
                                Cyber Insurance Impact
                            </div>
                            <div class="chart-wrapper" id="insurance-chart"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupEventListeners() {
        // Vendor selection
        document.querySelectorAll('.vendor-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                this.updateSelectedVendors();
                this.updateSelectedCount();
                this.refreshCurrentTab();
            });
        });
        
        // Tab navigation
        document.querySelectorAll('.main-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                this.switchToTab(tabId);
            });
        });
    }
    
    updateSelectedVendors() {
        this.selectedVendors = Array.from(document.querySelectorAll('.vendor-btn.active'))
            .map(btn => btn.getAttribute('data-vendor'));
    }
    
    updateSelectedCount() {
        const counter = document.querySelector('.selected-count');
        if (counter) {
            counter.textContent = this.selectedVendors.length;
        }
    }
    
    switchToTab(tabId) {
        // Update tab UI
        document.querySelectorAll('.main-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        // Update panel UI
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.querySelector(`[data-panel="${tabId}"]`).classList.add('active');
        
        this.currentTab = tabId;
        this.refreshCurrentTab();
    }
    
    refreshCurrentTab() {
        setTimeout(() => {
            switch(this.currentTab) {
                case 'overview':
                    this.createOverviewCharts();
                    break;
                case 'financial':
                    this.createFinancialCharts();
                    break;
                case 'security':
                    this.createSecurityCharts();
                    break;
                case 'vendors':
                    this.createVendorMatrix();
                    break;
                case 'compliance':
                    this.createComplianceCharts();
                    break;
                case 'insurance':
                    this.createInsuranceCharts();
                    break;
            }
        }, 100);
    }
    
    createOverviewCharts() {
        this.createTCOChart();
        this.createTimelineChart();
        this.createROIChart();
    }
    
    createTCOChart() {
        const container = document.getElementById('overview-tco-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const selectedData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                y: vendor.tco3Year,
                color: vendor.color
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'column', height: 400 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: {
                title: { text: '3-Year TCO ($)' },
                labels: {
                    formatter: function() {
                        return '$' + Highcharts.numberFormat(this.value / 1000, 0) + 'K';
                    }
                }
            },
            series: [{
                name: 'TCO',
                data: selectedData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return '$' + Highcharts.numberFormat(this.y / 1000, 0) + 'K';
                    }
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    createTimelineChart() {
        const container = document.getElementById('overview-timeline-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const selectedData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                y: vendor.implementationDays,
                color: vendor.color
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'bar', height: 400 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: { title: { text: 'Days' } },
            series: [{
                name: 'Implementation Days',
                data: selectedData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.y + ' days';
                    }
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    createROIChart() {
        const container = document.getElementById('overview-roi-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const series = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                color: vendor.color,
                data: [0, vendor.roi3Year * 0.3, vendor.roi3Year * 0.6, vendor.roi3Year, vendor.roi3Year * 1.3]
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'line', height: 400 },
            title: { text: null },
            xAxis: { categories: ['Initial', 'Year 1', 'Year 2', 'Year 3', 'Year 5'] },
            yAxis: { title: { text: 'ROI (%)' } },
            series: series,
            credits: { enabled: false }
        });
    }
    
    createFinancialCharts() {
        this.createPerDeviceChart();
        this.createFTEChart();
    }
    
    createPerDeviceChart() {
        const container = document.getElementById('financial-per-device-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const selectedData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                y: vendor.licensePerDevice,
                color: vendor.color
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'column', height: 400 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: { title: { text: 'Cost per Device ($)' } },
            series: [{
                name: 'Per Device Cost',
                data: selectedData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return '$' + this.y;
                    }
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    createFTEChart() {
        const container = document.getElementById('financial-fte-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const selectedData = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                y: vendor.fteRequired,
                color: vendor.color
            };
        });
        
        Highcharts.chart(container, {
            chart: { type: 'column', height: 400 },
            title: { text: null },
            xAxis: { type: 'category' },
            yAxis: { title: { text: 'FTE Required' } },
            series: [{
                name: 'FTE',
                data: selectedData,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.y + ' FTE';
                    }
                }
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    createSecurityCharts() {
        // Security charts implementation
        console.log("Creating security charts...");
    }
    
    createVendorMatrix() {
        const container = document.getElementById('vendor-comparison-matrix');
        if (!container) return;
        
        const metrics = [
            { key: 'tco3Year', label: '3-Year TCO', format: 'currency' },
            { key: 'roi3Year', label: 'ROI (%)', format: 'percentage' },
            { key: 'implementationDays', label: 'Implementation', format: 'days' },
            { key: 'fteRequired', label: 'FTE Required', format: 'number' },
            { key: 'securityScore', label: 'Security Score', format: 'percentage' }
        ];
        
        let tableHTML = `
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                        <th style="padding: 12px; text-align: left;">Metric</th>
                        ${this.selectedVendors.map(vendorId => 
                            `<th style="padding: 12px; text-align: center;">
                                <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                                    <img src="${this.vendorData[vendorId].logo}" alt="${this.vendorData[vendorId].shortName}" style="width: 20px; height: 20px; object-fit: contain;">
                                    ${this.vendorData[vendorId].shortName}
                                </div>
                            </th>`
                        ).join('')}
                    </tr>
                </thead>
                <tbody>
        `;
        
        metrics.forEach((metric, index) => {
            const rowStyle = index % 2 === 0 ? 'background: rgba(255,255,255,0.5);' : 'background: rgba(0,0,0,0.02);';
            tableHTML += `<tr style="${rowStyle}"><td style="padding: 12px; font-weight: 600;">${metric.label}</td>`;
            
            this.selectedVendors.forEach(vendorId => {
                const vendor = this.vendorData[vendorId];
                const value = vendor[metric.key];
                
                let formattedValue;
                switch(metric.format) {
                    case 'currency':
                        formattedValue = '$' + (value / 1000).toLocaleString() + 'K';
                        break;
                    case 'percentage':
                        formattedValue = value + '%';
                        break;
                    case 'days':
                        formattedValue = value + ' days';
                        break;
                    default:
                        formattedValue = value.toString();
                }
                
                tableHTML += `<td style="padding: 12px; text-align: center;">${formattedValue}</td>`;
            });
            tableHTML += `</tr>`;
        });
        
        tableHTML += `</tbody></table>`;
        container.innerHTML = tableHTML;
    }
    
    createComplianceCharts() {
        console.log("Creating compliance charts...");
    }
    
    createInsuranceCharts() {
        console.log("Creating insurance charts...");
    }
    
    initializeParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-header', {
                particles: {
                    number: { value: 50 },
                    color: { value: '#ffffff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.3, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#ffffff',
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true
                    }
                },
                interactivity: {
                    events: {
                        onhover: { enable: true, mode: 'bubble' },
                        resize: true
                    }
                }
            });
        }
    }
    
    startAnimations() {
        // Animate KPI values
        const kpiValues = document.querySelectorAll('[data-animate]');
        kpiValues.forEach(element => {
            const targetValue = parseInt(element.getAttribute('data-animate'));
            this.animateValue(element, 0, targetValue, 2000);
        });
    }
    
    animateValue(element, start, end, duration) {
        const startTime = performance.now();
        
        const updateValue = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const current = Math.round(start + (end - start) * easeOut);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        };
        
        requestAnimationFrame(updateValue);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (!window.comprehensiveExecutiveDashboard) {
            window.comprehensiveExecutiveDashboard = new ComprehensiveExecutiveDashboard();
            
            const executiveView = document.querySelector('#executive-view');
            if (executiveView) {
                window.comprehensiveExecutiveDashboard.init();
            }
        }
    }, 1000);
});
