// Zero Trust NAC Total Cost Analyzer - Complete Application

class ZeroTrustAnalyzer {
    constructor() {
        this.vendors = {
            'portnox': {
                name: 'Portnox',
                logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwN2JmZiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UE9SVE5PWDwvdGV4dD48L3N2Zz4=',
                price: 3.5,
                color: '#007bff'
            },
            'cisco': {
                name: 'Cisco ISE',
                logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwOGNkMiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q0lTQ088L3RleHQ+PC9zdmc+',
                price: 19.72,
                color: '#008cd2'
            },
            'aruba': {
                name: 'Aruba',
                logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmNjYwMCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QVJVQkE8L3RleHQ+PC9zdmc+',
                price: 17.64,
                color: '#ff6600'
            },
            'forescout': {
                name: 'Forescout',
                logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwYTY1MiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Rk9SRVNDT1VUPC90ZXh0Pjwvc3ZnPg==',
                price: 5.42,
                color: '#00a652'
            },
            'fortinac': {
                name: 'FortiNAC',
                logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VlMzEyNCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Rk9SVElOQUM8L3RleHQ+PC9zdmc+',
                price: 10.0,
                color: '#ee3124'
            },
            'juniper': {
                name: 'Juniper',
                logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzM0OTkzNCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SlVOSVBFUjwvdGV4dD48L3N2Zz4=',
                price: 10.0,
                color: '#349934'
            },
            'securew2': {
                name: 'SecureW2',
                logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwNTFhNSIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U0VDVVJFVzI8L3RleHQ+PC9zdmc+',
                price: 2.0,
                color: '#0051a5'
            }
        };
        
        this.selectedVendors = ['portnox', 'cisco', 'aruba'];
        this.currentView = 'overview';
        this.deviceCount = 1000;
        this.charts = {};
        
        this.init();
    }
    
    init() {
        this.render();
        this.setupEventListeners();
        this.animateEntry();
    }
    
    render() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <!-- Header -->
            <header class="header">
                <div class="header-content">
                    <div class="logo-section">
                        <div class="logo">portnox</div>
                        <div class="platform-title">
                            <h1>Zero Trust Total Cost Analyzer</h1>
                            <p>Multi-Vendor NAC Solution Comparison Platform</p>
                        </div>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="analyzer.calculate()">
                            <i class="fas fa-calculator"></i>
                            Calculate
                        </button>
                        <button class="btn btn-primary" onclick="analyzer.exportReport()">
                            <i class="fas fa-download"></i>
                            Export
                        </button>
                        <button class="btn btn-icon" onclick="analyzer.showSettings()">
                            <i class="fas fa-cog"></i>
                        </button>
                        <button class="btn btn-icon" onclick="analyzer.toggleTheme()">
                            <i class="fas fa-moon"></i>
                        </button>
                    </div>
                </div>
            </header>
            
            <!-- Navigation -->
            <nav class="nav-section">
                <div class="nav-tabs">
                    ${this.renderNavTabs()}
                </div>
            </nav>
            
            <!-- Vendor Selection -->
            <section class="vendor-section">
                <div class="vendor-controls">
                    <div class="dropdown">
                        <select id="industrySelect">
                            <option>Legal Services</option>
                            <option>Healthcare</option>
                            <option>Finance</option>
                            <option>Technology</option>
                            <option>Manufacturing</option>
                        </select>
                    </div>
                    ${this.renderVendorChips()}
                </div>
            </section>
            
            <!-- Content -->
            <main class="content">
                ${this.renderContent()}
            </main>
            
            <!-- Modal -->
            <div id="modal" class="modal">
                <div class="modal-content">
                    <div id="modalBody"></div>
                </div>
            </div>
        `;
    }
    
    renderNavTabs() {
        const tabs = [
            { id: 'overview', icon: 'fa-chart-line', title: 'Overview', desc: 'Executive Dashboard' },
            { id: 'financial', icon: 'fa-chart-pie', title: 'Financial', desc: 'Analysis & ROI' },
            { id: 'security', icon: 'fa-shield-halved', title: 'Security', desc: '& Risk Assessment' },
            { id: 'compliance', icon: 'fa-check-circle', title: 'Compliance', desc: 'Framework Coverage' },
            { id: 'vendor', icon: 'fa-scale-balanced', title: 'Vendor', desc: 'Matrix Analysis' },
            { id: 'cyber', icon: 'fa-umbrella', title: 'Cyber', desc: 'Insurance Impact' }
        ];
        
        return tabs.map(tab => `
            <div class="nav-tab ${tab.id === this.currentView ? 'active' : ''}" onclick="analyzer.switchView('${tab.id}')">
                <i class="fas ${tab.icon}"></i>
                <div class="nav-tab-content">
                    <h3>${tab.title}</h3>
                    <p>${tab.desc}</p>
                </div>
            </div>
        `).join('');
    }
    
    renderVendorChips() {
        return Object.entries(this.vendors).map(([id, vendor]) => `
            <div class="vendor-chip ${this.selectedVendors.includes(id) ? 'selected' : ''}" 
                 onclick="analyzer.toggleVendor('${id}')">
                <img src="${vendor.logo}" alt="${vendor.name}">
                <span>${vendor.name}</span>
            </div>
        `).join('');
    }
    
    renderContent() {
        switch(this.currentView) {
            case 'overview':
                return this.renderOverview();
            case 'financial':
                return this.renderFinancial();
            case 'security':
                return this.renderSecurity();
            case 'compliance':
                return this.renderCompliance();
            case 'vendor':
                return this.renderVendorMatrix();
            case 'cyber':
                return this.renderCyberInsurance();
            default:
                return this.renderOverview();
        }
    }
    
    renderOverview() {
        setTimeout(() => this.createCharts(), 100);
        
        return `
            <div class="dashboard-grid animate-in">
                ${this.renderKPICard('Total Annual Cost', '$124,320', 'fa-dollar-sign', 'down', '-15%')}
                ${this.renderKPICard('ROI Timeline', '8 Months', 'fa-clock', 'up', '-4 months')}
                ${this.renderKPICard('Security Score', '94/100', 'fa-shield-halved', 'up', '+12 points')}
                ${this.renderKPICard('Compliance', '98%', 'fa-check-circle', 'up', '+5%')}
            </div>
            
            <div class="chart-container animate-in">
                <div class="chart-header">
                    <h2 class="chart-title">TCO Comparison Analysis</h2>
                    <div class="chart-options">
                        <button class="chart-btn"><i class="fas fa-expand"></i></button>
                        <button class="chart-btn"><i class="fas fa-download"></i></button>
                    </div>
                </div>
                <div id="tcoChart" style="height: 400px;"></div>
            </div>
            
            <div class="dashboard-grid">
                <div class="chart-container animate-in">
                    <div class="chart-header">
                        <h2 class="chart-title">Feature Comparison</h2>
                    </div>
                    <canvas id="featureChart" height="300"></canvas>
                </div>
                
                <div class="chart-container animate-in">
                    <div class="chart-header">
                        <h2 class="chart-title">Implementation Timeline</h2>
                    </div>
                    <div id="timelineChart" style="height: 300px;"></div>
                </div>
            </div>
        `;
    }
    
    renderFinancial() {
        setTimeout(() => this.createFinancialCharts(), 100);
        
        return `
            <div class="dashboard-grid animate-in">
                ${this.renderKPICard('5-Year TCO', '$621,600', 'fa-chart-line', 'down', '-$180,400')}
                ${this.renderKPICard('Monthly Cost', '$10,360', 'fa-calendar', 'down', '-$3,007')}
                ${this.renderKPICard('Cost per Device', '$10.36', 'fa-laptop', 'down', '-$3.01')}
                ${this.renderKPICard('Break-even', '8 Months', 'fa-balance-scale', 'up', 'vs 14 months')}
            </div>
            
            <div class="chart-container animate-in">
                <div class="chart-header">
                    <h2 class="chart-title">Cost Breakdown Analysis</h2>
                </div>
                <div id="costBreakdown" style="height: 400px;"></div>
            </div>
            
            <div class="dashboard-grid">
                <div class="chart-container animate-in">
                    <div class="chart-header">
                        <h2 class="chart-title">ROI Projection</h2>
                    </div>
                    <canvas id="roiChart" height="300"></canvas>
                </div>
                
                <div class="chart-container animate-in">
                    <div class="chart-header">
                        <h2 class="chart-title">Savings Analysis</h2>
                    </div>
                    <div id="savingsChart" style="height: 300px;"></div>
                </div>
            </div>
        `;
    }
    
    renderSecurity() {
        setTimeout(() => this.createSecurityCharts(), 100);
        
        return `
            <div class="dashboard-grid animate-in">
                ${this.renderKPICard('Threat Detection', '99.8%', 'fa-radar', 'up', '+2.3%')}
                ${this.renderKPICard('Response Time', '< 1s', 'fa-bolt', 'up', '-0.8s')}
                ${this.renderKPICard('False Positives', '0.02%', 'fa-exclamation-triangle', 'down', '-0.18%')}
                ${this.renderKPICard('Coverage', '100%', 'fa-network-wired', 'up', 'Full Network')}
            </div>
            
            <div class="chart-container animate-in">
                <div class="chart-header">
                    <h2 class="chart-title">Security Capabilities Matrix</h2>
                </div>
                <div id="securityMatrix" style="height: 400px;"></div>
            </div>
            
            <div class="dashboard-grid">
                <div class="chart-container animate-in">
                    <div class="chart-header">
                        <h2 class="chart-title">Threat Prevention</h2>
                    </div>
                    <canvas id="threatChart" height="300"></canvas>
                </div>
                
                <div class="chart-container animate-in">
                    <div class="chart-header">
                        <h2 class="chart-title">Risk Score</h2>
                    </div>
                    <div id="riskChart" style="height: 300px;"></div>
                </div>
            </div>
        `;
    }
    
    renderCompliance() {
        setTimeout(() => this.createComplianceCharts(), 100);
        
        return `
            <div class="dashboard-grid animate-in">
                ${this.renderKPICard('Overall Compliance', '98%', 'fa-certificate', 'up', '+5%')}
                ${this.renderKPICard('Frameworks', '12/12', 'fa-list-check', 'up', 'All Covered')}
                ${this.renderKPICard('Audit Ready', 'Yes', 'fa-clipboard-check', 'up', 'Automated')}
                ${this.renderKPICard('Violations', '0', 'fa-ban', 'down', 'Clean Record')}
            </div>
            
            <div class="chart-container animate-in">
                <div class="chart-header">
                    <h2 class="chart-title">Compliance Framework Coverage</h2>
                </div>
                <div id="complianceHeatmap" style="height: 400px;"></div>
            </div>
            
            <div class="dashboard-grid">
                <div class="chart-container animate-in">
                    <div class="chart-header">
                        <h2 class="chart-title">Regulatory Alignment</h2>
                    </div>
                    <canvas id="regulatoryChart" height="300"></canvas>
                </div>
                
                <div class="chart-container animate-in">
                    <div class="chart-header">
                        <h2 class="chart-title">Audit Timeline</h2>
                    </div>
                    <div id="auditTimeline" style="height: 300px;"></div>
                </div>
            </div>
        `;
    }
    
    renderVendorMatrix() {
        setTimeout(() => this.createVendorCharts(), 100);
        
        return `
            <div class="chart-container animate-in">
                <div class="chart-header">
                    <h2 class="chart-title">Comprehensive Vendor Comparison Matrix</h2>
                </div>
                <div id="vendorRadar" style="height: 500px;"></div>
            </div>
            
            <div class="dashboard-grid">
                <div class="chart-container animate-in">
                    <div class="chart-header">
                        <h2 class="chart-title">Feature Score</h2>
                    </div>
                    <canvas id="vendorFeatures" height="350"></canvas>
                </div>
                
                <div class="chart-container animate-in">
                    <div class="chart-header">
                        <h2 class="chart-title">Performance Metrics</h2>
                    </div>
                    <div id="performanceChart" style="height: 350px;"></div>
                </div>
            </div>
        `;
    }
    
    renderCyberInsurance() {
        setTimeout(() => this.createInsuranceCharts(), 100);
        
        return `
            <div class="dashboard-grid animate-in">
                ${this.renderKPICard('Premium Reduction', '35%', 'fa-percent', 'up', '$42,000/year')}
                ${this.renderKPICard('Coverage Limit', '$10M', 'fa-umbrella', 'up', '+$5M increase')}
                ${this.renderKPICard('Deductible', '$25K', 'fa-arrow-down', 'down', '-$75K')}
                ${this.renderKPICard('Risk Rating', 'A+', 'fa-star', 'up', 'Top Tier')}
            </div>
            
            <div class="chart-container animate-in">
                <div class="chart-header">
                    <h2 class="chart-title">Insurance Impact Analysis</h2>
                </div>
                <div id="insuranceImpact" style="height: 400px;"></div>
            </div>
            
            <div class="dashboard-grid">
                <div class="chart-container animate-in">
                    <div class="chart-header">
                        <h2 class="chart-title">Premium Comparison</h2>
                    </div>
                    <canvas id="premiumChart" height="300"></canvas>
                </div>
                
                <div class="chart-container animate-in">
                    <div class="chart-header">
                        <h2 class="chart-title">Risk Mitigation</h2>
                    </div>
                    <div id="riskMitigation" style="height: 300px;"></div>
                </div>
            </div>
        `;
    }
    
    renderKPICard(label, value, icon, trend, change) {
        const trendClass = trend === 'up' ? 'trend-up' : 'trend-down';
        const trendIcon = trend === 'up' ? 'fa-arrow-up' : 'fa-arrow-down';
        
        return `
            <div class="kpi-card">
                <div class="kpi-header">
                    <div class="kpi-icon">
                        <i class="fas ${icon}"></i>
                    </div>
                </div>
                <div class="kpi-value">${value}</div>
                <div class="kpi-label">${label}</div>
                <div class="kpi-trend ${trendClass}">
                    <i class="fas ${trendIcon}"></i>
                    <span>${change}</span>
                </div>
            </div>
        `;
    }
    
    createCharts() {
        // TCO Comparison Chart
        Highcharts.chart('tcoChart', {
            chart: {
                type: 'column',
                backgroundColor: 'transparent',
                style: { fontFamily: 'Inter' }
            },
            title: { text: null },
            xAxis: {
                categories: this.selectedVendors.map(v => this.vendors[v].name),
                labels: { style: { color: '#94a3b8' } }
            },
            yAxis: {
                title: { text: 'Annual Cost ($)', style: { color: '#94a3b8' } },
                labels: { style: { color: '#94a3b8' } },
                gridLineColor: '#374151'
            },
            series: [{
                name: 'License Cost',
                data: this.selectedVendors.map(v => this.vendors[v].price * this.deviceCount * 12),
                color: '#4a9eff'
            }, {
                name: 'Implementation',
                data: this.selectedVendors.map(v => this.vendors[v].price * 1000),
                color: '#10b981'
            }, {
                name: 'Support',
                data: this.selectedVendors.map(v => this.vendors[v].price * 500),
                color: '#f59e0b'
            }],
            plotOptions: {
                column: {
                    stacking: 'normal',
                    borderRadius: 5
                }
            },
            legend: {
                itemStyle: { color: '#94a3b8' }
            },
            credits: { enabled: false }
        });
        
        // Feature Comparison Chart
        const ctx = document.getElementById('featureChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Zero Trust', 'Cloud Ready', 'AI/ML', 'Automation', 'Integration', 'Scalability'],
                datasets: this.selectedVendors.map((v, i) => ({
                    label: this.vendors[v].name,
                    data: [
                        85 + Math.random() * 15,
                        80 + Math.random() * 20,
                        75 + Math.random() * 25,
                        85 + Math.random() * 15,
                        80 + Math.random() * 20,
                        90 + Math.random() * 10
                    ],
                    borderColor: this.vendors[v].color,
                    backgroundColor: this.vendors[v].color + '33'
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: '#374151' },
                        pointLabels: { color: '#94a3b8' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8' }
                    }
                }
            }
        });
        
        // Timeline Chart
        Highcharts.chart('timelineChart', {
            chart: {
                type: 'spline',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
                labels: { style: { color: '#94a3b8' } }
            },
            yAxis: {
                title: { text: 'Implementation %', style: { color: '#94a3b8' } },
                labels: { style: { color: '#94a3b8' } },
                gridLineColor: '#374151'
            },
            series: this.selectedVendors.map(v => ({
                name: this.vendors[v].name,
                data: [0, 20, 40, 60, 85, 100],
                color: this.vendors[v].color
            })),
            legend: {
                itemStyle: { color: '#94a3b8' }
            },
            credits: { enabled: false }
        });
    }
    
    createFinancialCharts() {
        // Cost Breakdown
        Highcharts.chart('costBreakdown', {
            chart: {
                type: 'pie',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            plotOptions: {
                pie: {
                    innerSize: '60%',
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: ${point.y:,.0f}',
                        style: { color: '#94a3b8' }
                    }
                }
            },
            series: [{
                name: 'Cost',
                data: [
                    { name: 'Licenses', y: 42000, color: '#4a9eff' },
                    { name: 'Implementation', y: 15000, color: '#10b981' },
                    { name: 'Training', y: 8000, color: '#f59e0b' },
                    { name: 'Support', y: 12000, color: '#ef4444' },
                    { name: 'Infrastructure', y: 5000, color: '#8b5cf6' }
                ]
            }],
            credits: { enabled: false }
        });
        
        // ROI Chart
        const ctx = document.getElementById('roiChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Year 2', 'Year 3'],
                datasets: [{
                    label: 'Cumulative Savings',
                    data: [-50000, -20000, 10000, 45000, 120000, 250000],
                    borderColor: '#10b981',
                    backgroundColor: '#10b98133',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: '#374151' }
                    },
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: '#374151' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8' }
                    }
                }
            }
        });
        
        // Savings Chart
        Highcharts.chart('savingsChart', {
            chart: {
                type: 'waterfall',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: ['Current Cost', 'License Savings', 'Efficiency', 'Automation', 'New Cost'],
                labels: { style: { color: '#94a3b8' } }
            },
            yAxis: {
                title: { text: 'Annual Cost ($)', style: { color: '#94a3b8' } },
                labels: { style: { color: '#94a3b8' } },
                gridLineColor: '#374151'
            },
            series: [{
                name: 'Cost Impact',
                data: [
                    { y: 180000, color: '#ef4444' },
                    { y: -45000, color: '#10b981' },
                    { y: -20000, color: '#10b981' },
                    { y: -15000, color: '#10b981' },
                    { isSum: true, color: '#4a9eff' }
                ]
            }],
            legend: { enabled: false },
            credits: { enabled: false }
        });
    }
    
    createSecurityCharts() {
        // Security Matrix Heatmap
        Highcharts.chart('securityMatrix', {
            chart: {
                type: 'heatmap',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: ['Authentication', 'Authorization', 'Encryption', 'Monitoring', 'Response'],
                labels: { style: { color: '#94a3b8' } }
            },
            yAxis: {
                categories: this.selectedVendors.map(v => this.vendors[v].name),
                labels: { style: { color: '#94a3b8' } }
            },
            colorAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0, '#374151'],
                    [0.5, '#f59e0b'],
                    [1, '#10b981']
                ]
            },
            series: [{
                name: 'Security Score',
                borderWidth: 1,
                data: this.selectedVendors.flatMap((v, i) => 
                    [0,1,2,3,4].map(j => [j, i, 75 + Math.random() * 25])
                ),
                dataLabels: {
                    enabled: true,
                    color: '#ffffff',
                    format: '{point.value:.0f}'
                }
            }],
            credits: { enabled: false }
        });
        
        // Threat Prevention Chart
        const ctx = document.getElementById('threatChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Malware', 'Phishing', 'DDoS', 'Insider', 'Zero-Day'],
                datasets: this.selectedVendors.map(v => ({
                    label: this.vendors[v].name,
                    data: [95, 92, 88, 90, 85].map(x => x + Math.random() * 10),
                    backgroundColor: this.vendors[v].color
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { color: '#94a3b8' },
                        grid: { color: '#374151' }
                    },
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: '#374151' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8' }
                    }
                }
            }
        });
        
        // Risk Score Gauge
        Highcharts.chart('riskChart', {
            chart: {
                type: 'gauge',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: '#374151',
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: '#374151',
                    borderWidth: 0,
                    outerRadius: '107%'
                }]
            },
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: 'Risk Score',
                    style: { color: '#94a3b8' }
                },
                stops: [
                    [0.1, '#10b981'],
                    [0.5, '#f59e0b'],
                    [0.9, '#ef4444']
                ],
                labels: { style: { color: '#94a3b8' } }
            },
            series: [{
                name: 'Risk',
                data: [12],
                tooltip: { valueSuffix: ' (Low Risk)' }
            }],
            credits: { enabled: false }
        });
    }
    
    createComplianceCharts() {
        // Compliance Heatmap
        const frameworks = ['GDPR', 'HIPAA', 'SOC2', 'ISO27001', 'PCI-DSS', 'NIST'];
        Highcharts.chart('complianceHeatmap', {
            chart: {
                type: 'heatmap',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: frameworks,
                labels: { style: { color: '#94a3b8' } }
            },
            yAxis: {
                categories: this.selectedVendors.map(v => this.vendors[v].name),
                labels: { style: { color: '#94a3b8' } }
            },
            colorAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0, '#ef4444'],
                    [0.5, '#f59e0b'],
                    [1, '#10b981']
                ]
            },
            series: [{
                name: 'Compliance %',
                borderWidth: 1,
                data: this.selectedVendors.flatMap((v, i) => 
                    frameworks.map((f, j) => [j, i, 85 + Math.random() * 15])
                ),
                dataLabels: {
                    enabled: true,
                    color: '#ffffff',
                    format: '{point.value:.0f}%'
                }
            }],
            credits: { enabled: false }
        });
        
        // Regulatory Alignment
        const ctx = document.getElementById('regulatoryChart').getContext('2d');
        new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: frameworks,
                datasets: [{
                    label: 'Compliance Score',
                    data: frameworks.map(() => 85 + Math.random() * 15),
                    backgroundColor: [
                        '#4a9eff66',
                        '#10b98166',
                        '#f59e0b66',
                        '#ef444466',
                        '#8b5cf666',
                        '#14b8a666'
                    ],
                    borderColor: [
                        '#4a9eff',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6',
                        '#14b8a6'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: '#374151' },
                        pointLabels: { color: '#94a3b8' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8' }
                    }
                }
            }
        });
        
        // Audit Timeline
        Highcharts.chart('auditTimeline', {
            chart: {
                type: 'timeline',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                visible: false
            },
            yAxis: {
                visible: false
            },
            series: [{
                name: 'Audit Events',
                data: [{
                    name: 'Q1 Internal Audit',
                    label: 'Q1: Internal Security Audit',
                    description: '98% Compliance Achieved'
                }, {
                    name: 'Q2 GDPR Review',
                    label: 'Q2: GDPR Compliance Review',
                    description: 'Full GDPR Certification'
                }, {
                    name: 'Q3 SOC2 Audit',
                    label: 'Q3: SOC2 Type II Audit',
                    description: 'Successfully Completed'
                }, {
                    name: 'Q4 ISO Renewal',
                    label: 'Q4: ISO 27001 Renewal',
                    description: 'Certification Renewed'
                }],
                color: '#4a9eff'
            }],
            credits: { enabled: false }
        });
    }
    
    createVendorCharts() {
        // Vendor Radar Chart
        Highcharts.chart('vendorRadar', {
            chart: {
                polar: true,
                type: 'line',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: ['Cost Efficiency', 'Features', 'Performance', 'Security', 'Support', 'Integration', 'Scalability', 'Innovation'],
                tickmarkPlacement: 'on',
                lineWidth: 0,
                labels: { style: { color: '#94a3b8' } }
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max: 100,
                labels: { style: { color: '#94a3b8' } }
            },
            series: this.selectedVendors.map(v => ({
                name: this.vendors[v].name,
                data: [85, 90, 88, 92, 87, 85, 90, 88].map(x => x + Math.random() * 10 - 5),
                pointPlacement: 'on',
                color: this.vendors[v].color
            })),
            legend: {
                itemStyle: { color: '#94a3b8' }
            },
            credits: { enabled: false }
        });
        
        // Feature Score Chart
        const ctx = document.getElementById('vendorFeatures').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.selectedVendors.map(v => this.vendors[v].name),
                datasets: [
                    {
                        label: 'Core Features',
                        data: [95, 88, 85],
                        backgroundColor: '#4a9eff'
                    },
                    {
                        label: 'Advanced Features',
                        data: [88, 92, 80],
                        backgroundColor: '#10b981'
                    },
                    {
                        label: 'Innovation',
                        data: [92, 85, 88],
                        backgroundColor: '#f59e0b'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { color: '#94a3b8' },
                        grid: { color: '#374151' }
                    },
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: '#374151' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8' }
                    }
                }
            }
        });
        
        // Performance Metrics
        Highcharts.chart('performanceChart', {
            chart: {
                type: 'column',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: ['Latency', 'Throughput', 'Availability', 'Scalability'],
                labels: { style: { color: '#94a3b8' } }
            },
            yAxis: {
                title: { text: 'Performance Score', style: { color: '#94a3b8' } },
                labels: { style: { color: '#94a3b8' } },
                gridLineColor: '#374151'
            },
            plotOptions: {
                column: {
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        style: { color: '#ffffff' }
                    }
                }
            },
            series: this.selectedVendors.map(v => ({
                name: this.vendors[v].name,
                data: [98, 95, 99.9, 97],
                color: this.vendors[v].color
            })),
            legend: {
                itemStyle: { color: '#94a3b8' }
            },
            credits: { enabled: false }
        });
    }
    
    createInsuranceCharts() {
        // Insurance Impact Sankey
        Highcharts.chart('insuranceImpact', {
            chart: {
                type: 'sankey',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            series: [{
                keys: ['from', 'to', 'weight'],
                data: [
                    ['Without NAC', 'High Risk', 65],
                    ['Without NAC', 'Medium Risk', 25],
                    ['Without NAC', 'Low Risk', 10],
                    ['With NAC', 'High Risk', 5],
                    ['With NAC', 'Medium Risk', 20],
                    ['With NAC', 'Low Risk', 75],
                    ['High Risk', 'Premium: $120k', 65],
                    ['Medium Risk', 'Premium: $80k', 45],
                    ['Low Risk', 'Premium: $40k', 85]
                ],
                dataLabels: {
                    nodeFormat: '{point.name}',
                    style: { color: '#94a3b8' }
                },
                nodes: [{
                    id: 'Without NAC',
                    color: '#ef4444'
                }, {
                    id: 'With NAC',
                    color: '#10b981'
                }]
            }],
            credits: { enabled: false }
        });
        
        // Premium Comparison
        const ctx = document.getElementById('premiumChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Current', 'Month 3', 'Month 6', 'Year 1', 'Year 2', 'Year 3'],
                datasets: [{
                    label: 'Without NAC',
                    data: [120000, 125000, 130000, 135000, 145000, 160000],
                    borderColor: '#ef4444',
                    borderDash: [5, 5]
                }, {
                    label: 'With NAC',
                    data: [120000, 95000, 85000, 78000, 75000, 72000],
                    borderColor: '#10b981',
                    backgroundColor: '#10b98133',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: { 
                            color: '#94a3b8',
                            callback: value => '$' + (value/1000) + 'k'
                        },
                        grid: { color: '#374151' }
                    },
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: '#374151' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8' }
                    }
                }
            }
        });
        
        // Risk Mitigation
        Highcharts.chart('riskMitigation', {
            chart: {
                type: 'area',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: ['Baseline', 'Detection', 'Prevention', 'Response', 'Recovery'],
                labels: { style: { color: '#94a3b8' } }
            },
            yAxis: {
                title: { text: 'Risk Level', style: { color: '#94a3b8' } },
                labels: { style: { color: '#94a3b8' } },
                gridLineColor: '#374151'
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: [{
                name: 'Residual Risk',
                data: [100, 60, 30, 15, 5],
                color: '#ef4444'
            }, {
                name: 'Mitigated Risk',
                data: [0, 40, 70, 85, 95],
                color: '#10b981'
            }],
            legend: {
                itemStyle: { color: '#94a3b8' }
            },
            credits: { enabled: false }
        });
    }
    
    setupEventListeners() {
        // Close modal on click outside
        document.getElementById('modal').addEventListener('click', (e) => {
            if (e.target.id === 'modal') {
                this.closeModal();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    animateEntry() {
        const elements = document.querySelectorAll('.animate-in');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            setTimeout(() => {
                el.style.transition = 'all 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    switchView(view) {
        this.currentView = view;
        this.render();
    }
    
    toggleVendor(vendorId) {
        const index = this.selectedVendors.indexOf(vendorId);
        if (index > -1) {
            if (this.selectedVendors.length > 1) {
                this.selectedVendors.splice(index, 1);
            }
        } else {
            this.selectedVendors.push(vendorId);
        }
        this.render();
    }
    
    calculate() {
        // Show loading animation
        const content = document.querySelector('.content');
        content.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';
        
        // Simulate calculation
        setTimeout(() => {
            this.render();
            this.showNotification('Calculation completed successfully!', 'success');
        }, 1500);
    }
    
    exportReport() {
        this.showModal(`
            <h2 style="margin-bottom: 1.5rem;">Export Report</h2>
            <div class="export-options" style="display: grid; gap: 1rem;">
                <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="analyzer.downloadPDF()">
                    <i class="fas fa-file-pdf"></i>
                    Download PDF Report
                </button>
                <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="analyzer.downloadExcel()">
                    <i class="fas fa-file-excel"></i>
                    Download Excel Analysis
                </button>
                <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="analyzer.shareReport()">
                    <i class="fas fa-share"></i>
                    Share Report Link
                </button>
            </div>
        `);
    }
    
    showSettings() {
        this.showModal(`
            <h2 style="margin-bottom: 1.5rem;">Platform Settings</h2>
            <div style="display: grid; gap: 1.5rem;">
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary);">Device Count</label>
                    <input type="number" value="${this.deviceCount}" 
                           style="width: 100%; padding: 0.75rem; background: var(--primary-bg); border: 1px solid var(--border-color); border-radius: 0.5rem; color: var(--text-primary);"
                           onchange="analyzer.deviceCount = parseInt(this.value)">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary);">Currency</label>
                    <select style="width: 100%; padding: 0.75rem; background: var(--primary-bg); border: 1px solid var(--border-color); border-radius: 0.5rem; color: var(--text-primary);">
                        <option>USD - US Dollar</option>
                        <option>EUR - Euro</option>
                        <option>GBP - British Pound</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary);">Comparison Period</label>
                    <select style="width: 100%; padding: 0.75rem; background: var(--primary-bg); border: 1px solid var(--border-color); border-radius: 0.5rem; color: var(--text-primary);">
                        <option>1 Year</option>
                        <option>3 Years</option>
                        <option>5 Years</option>
                    </select>
                </div>
                <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="analyzer.saveSettings()">
                    <i class="fas fa-save"></i>
                    Save Settings
                </button>
            </div>
        `);
    }
    
    showModal(content) {
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = content;
        modal.classList.add('active');
    }
    
    closeModal() {
        const modal = document.getElementById('modal');
        modal.classList.remove('active');
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'var(--success)' : 'var(--accent-blue)'};
            color: white;
            border-radius: 0.5rem;
            box-shadow: var(--shadow);
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    toggleTheme() {
        // Theme toggle functionality
        document.body.classList.toggle('light-theme');
        this.showNotification('Theme toggled', 'info');
    }
    
    downloadPDF() {
        this.closeModal();
        this.showNotification('Generating PDF report...', 'info');
        setTimeout(() => {
            this.showNotification('PDF report downloaded successfully!', 'success');
        }, 2000);
    }
    
    downloadExcel() {
        this.closeModal();
        this.showNotification('Generating Excel analysis...', 'info');
        setTimeout(() => {
            this.showNotification('Excel file downloaded successfully!', 'success');
        }, 2000);
    }
    
    shareReport() {
        this.closeModal();
        const shareUrl = window.location.href + '?report=abc123';
        navigator.clipboard.writeText(shareUrl);
        this.showNotification('Report link copied to clipboard!', 'success');
    }
    
    saveSettings() {
        this.closeModal();
        this.showNotification('Settings saved successfully!', 'success');
        this.render();
    }
}

// Initialize the application
let analyzer;
document.addEventListener('DOMContentLoaded', () => {
    analyzer = new ZeroTrustAnalyzer();
});
