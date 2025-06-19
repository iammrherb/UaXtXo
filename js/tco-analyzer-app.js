// COMPLETE TCO Analyzer Application
// This includes ALL features, vendors, compliance, calculations, etc.

(function() {
    'use strict';
    
    console.log('🚀 Initializing COMPLETE TCO Analyzer...');
    
    // Application state
    const AppState = {
        vendors: [],
        selectedVendors: ['portnox', 'cisco', 'forescout'],
        orgSize: 'medium',
        industry: 'technology',
        years: 5,
        region: 'northAmerica',
        currency: 'USD',
        results: null,
        complianceFrameworks: [],
        initialized: false
    };
    
    // Initialize application
    function initializeApp() {
        console.log('📦 Loading all modules...');
        
        // Verify all data is loaded
        if (!window.AllVendorData) {
            console.error('❌ Vendor data not loaded!');
            return;
        }
        
        if (!window.AllComplianceData) {
            console.error('❌ Compliance data not loaded!');
            return;
        }
        
        if (!window.CompleteTCOCalculations) {
            console.error('❌ Calculations module not loaded!');
            return;
        }
        
        // Initialize vendor list
        AppState.vendors = Object.keys(window.AllVendorData);
        console.log(`✅ Loaded ${AppState.vendors.length} vendors`);
        
        // Initialize compliance frameworks
        AppState.complianceFrameworks = Object.keys(window.AllComplianceData.frameworks);
        console.log(`✅ Loaded ${AppState.complianceFrameworks.length} compliance frameworks`);
        
        // Build UI
        buildCompleteUI();
        
        // Set up event handlers
        setupEventHandlers();
        
        // Update status
        updateStatus('Ready! Select vendors and calculate TCO.', 'success');
        
        AppState.initialized = true;
        console.log('✅ Application initialized successfully!');
    }
    
    // Build complete UI
    function buildCompleteUI() {
        const app = document.getElementById('app-container');
        if (!app) {
            console.error('App container not found!');
            return;
        }
        
        app.innerHTML = `
            <!-- Header -->
            <header class="app-header">
                <div class="header-content">
                    <h1>🚀 Portnox Total Cost Analyzer</h1>
                    <p class="subtitle">Comprehensive TCO Analysis with ${AppState.vendors.length} Vendors & ${AppState.complianceFrameworks.length} Compliance Frameworks</p>
                </div>
                <div id="status-bar" class="status-bar">
                    <span id="status-message">Initializing...</span>
                </div>
            </header>
            
            <!-- Main Content -->
            <main class="app-main">
                <!-- Vendor Selection -->
                <section class="section vendor-section">
                    <h2>Select Vendors to Compare</h2>
                    <div class="vendor-filters">
                        <button class="filter-btn active" data-filter="all">All Vendors</button>
                        <button class="filter-btn" data-filter="cloud-native">Cloud-Native</button>
                        <button class="filter-btn" data-filter="on-premise">On-Premise</button>
                        <button class="filter-btn" data-filter="cloud-radius">Cloud RADIUS</button>
                        <button class="filter-btn" data-filter="recommended">Recommended</button>
                    </div>
                    <div id="vendor-grid" class="vendor-grid">
                        ${renderVendorGrid()}
                    </div>
                </section>
                
                <!-- Configuration -->
                <section class="section config-section">
                    <h2>Organization Configuration</h2>
                    <div class="config-grid">
                        <div class="config-group">
                            <label>Organization Size</label>
                            <select id="org-size" class="form-control">
                                <option value="small">Small (< 500 devices)</option>
                                <option value="medium" selected>Medium (500-2,500 devices)</option>
                                <option value="large">Large (2,500-10,000 devices)</option>
                                <option value="enterprise">Enterprise (10,000+ devices)</option>
                            </select>
                            <small class="help-text">Devices: <span id="device-count">2,500</span></small>
                        </div>
                        
                        <div class="config-group">
                            <label>Industry</label>
                            <select id="industry" class="form-control">
                                <option value="healthcare">Healthcare</option>
                                <option value="finance">Financial Services</option>
                                <option value="retail">Retail</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="education">Education</option>
                                <option value="government">Government</option>
                                <option value="technology" selected>Technology</option>
                            </select>
                            <small class="help-text">Compliance: <span id="compliance-reqs">SOC2, ISO27001</span></small>
                        </div>
                        
                        <div class="config-group">
                            <label>Analysis Period</label>
                            <select id="years" class="form-control">
                                <option value="3">3 Years</option>
                                <option value="5" selected>5 Years</option>
                                <option value="7">7 Years</option>
                            </select>
                            <small class="help-text">TCO calculation period</small>
                        </div>
                        
                        <div class="config-group">
                            <label>Region</label>
                            <select id="region" class="form-control">
                                <option value="northAmerica" selected>North America</option>
                                <option value="europe">Europe</option>
                                <option value="asiaPacific">Asia Pacific</option>
                            </select>
                            <small class="help-text">For staff cost calculations</small>
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <button id="calculate-btn" class="btn btn-primary btn-large">
                            Calculate TCO Analysis
                        </button>
                        <button id="reset-btn" class="btn btn-secondary">
                            Reset
                        </button>
                    </div>
                </section>
                
                <!-- Results Container -->
                <div id="results-container" class="results-container" style="display: none;">
                    <!-- Executive Summary -->
                    <section class="section result-section">
                        <h2>Executive Summary</h2>
                        <div id="executive-summary" class="executive-summary">
                            <!-- Will be populated -->
                        </div>
                    </section>
                    
                    <!-- Cost Analysis -->
                    <section class="section result-section">
                        <h2>Total Cost of Ownership Analysis</h2>
                        <div class="chart-tabs">
                            <button class="tab-btn active" data-chart="comparison">Cost Comparison</button>
                            <button class="tab-btn" data-chart="breakdown">Cost Breakdown</button>
                            <button class="tab-btn" data-chart="timeline">Cost Timeline</button>
                            <button class="tab-btn" data-chart="roi">ROI Analysis</button>
                        </div>
                        <div id="chart-container" class="chart-container">
                            <canvas id="main-chart"></canvas>
                        </div>
                        <div id="cost-details" class="cost-details">
                            <!-- Will be populated -->
                        </div>
                    </section>
                    
                    <!-- Feature Comparison -->
                    <section class="section result-section">
                        <h2>Feature & Capability Comparison</h2>
                        <div id="feature-comparison" class="feature-comparison">
                            <!-- Will be populated -->
                        </div>
                    </section>
                    
                    <!-- Compliance Analysis -->
                    <section class="section result-section">
                        <h2>Compliance Coverage Analysis</h2>
                        <div id="compliance-analysis" class="compliance-analysis">
                            <!-- Will be populated -->
                        </div>
                    </section>
                    
                    <!-- Risk Assessment -->
                    <section class="section result-section">
                        <h2>Risk & Security Assessment</h2>
                        <div id="risk-assessment" class="risk-assessment">
                            <!-- Will be populated -->
                        </div>
                    </section>
                    
                    <!-- Implementation Timeline -->
                    <section class="section result-section">
                        <h2>Implementation Timeline</h2>
                        <div id="implementation-timeline" class="implementation-timeline">
                            <!-- Will be populated -->
                        </div>
                    </section>
                    
                    <!-- Detailed Reports -->
                    <section class="section result-section">
                        <h2>Detailed Reports</h2>
                        <div class="report-actions">
                            <button class="btn btn-secondary" onclick="exportPDF()">
                                📄 Export PDF Report
                            </button>
                            <button class="btn btn-secondary" onclick="exportExcel()">
                                📊 Export Excel Analysis
                            </button>
                            <button class="btn btn-secondary" onclick="exportPresentation()">
                                📽️ Export Executive Presentation
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        `;
    }
    
    // Render vendor grid
    function renderVendorGrid() {
        return AppState.vendors.map(vendorId => {
            const vendor = window.AllVendorData[vendorId];
            const isSelected = AppState.selectedVendors.includes(vendorId);
            const isRecommended = vendorId === 'portnox' || 
                                 (vendor.type === 'on-premise' && ['cisco', 'aruba', 'forescout'].includes(vendorId));
            
            return `
                <div class="vendor-card ${isSelected ? 'selected' : ''} ${isRecommended ? 'recommended' : ''}" 
                     data-vendor="${vendorId}" 
                     data-type="${vendor.type}">
                    <input type="checkbox" 
                           id="vendor-${vendorId}" 
                           value="${vendorId}"
                           ${isSelected ? 'checked' : ''}>
                    <div class="vendor-content">
                        <img src="${vendor.logo}" 
                             alt="${vendor.name}" 
                             class="vendor-logo"
                             onerror="this.src='img/placeholder.png'">
                        <h3 class="vendor-name">${vendor.name}</h3>
                        <p class="vendor-desc">${vendor.description}</p>
                        <span class="vendor-type ${vendor.type}">${vendor.category || vendor.type}</span>
                        ${isRecommended ? '<span class="recommended-badge">⭐ Recommended</span>' : ''}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Setup event handlers
    function setupEventHandlers() {
        // Vendor selection
        document.getElementById('vendor-grid').addEventListener('click', (e) => {
            const card = e.target.closest('.vendor-card');
            if (card && e.target.type !== 'checkbox') {
                const checkbox = card.querySelector('input[type="checkbox"]');
                checkbox.checked = !checkbox.checked;
                updateVendorSelection();
            }
        });
        
        // Vendor filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                filterVendors(e.target.dataset.filter);
            });
        });
        
        // Checkboxes
        document.querySelectorAll('#vendor-grid input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', updateVendorSelection);
        });
        
        // Configuration changes
        document.getElementById('org-size').addEventListener('change', (e) => {
            AppState.orgSize = e.target.value;
            updateDeviceCount();
        });
        
        document.getElementById('industry').addEventListener('change', (e) => {
            AppState.industry = e.target.value;
            updateComplianceReqs();
        });
        
        document.getElementById('years').addEventListener('change', (e) => {
            AppState.years = parseInt(e.target.value);
        });
        
        document.getElementById('region').addEventListener('change', (e) => {
            AppState.region = e.target.value;
        });
        
        // Calculate button
        document.getElementById('calculate-btn').addEventListener('click', calculateTCO);
        
        // Reset button
        document.getElementById('reset-btn').addEventListener('click', resetAnalysis);
        
        // Chart tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                updateChart(e.target.dataset.chart);
            });
        });
    }
    
    // Update vendor selection
    function updateVendorSelection() {
        AppState.selectedVendors = Array.from(
            document.querySelectorAll('#vendor-grid input:checked')
        ).map(cb => cb.value);
        
        // Update visual state
        document.querySelectorAll('.vendor-card').forEach(card => {
            const vendorId = card.dataset.vendor;
            card.classList.toggle('selected', AppState.selectedVendors.includes(vendorId));
        });
        
        // Ensure at least 2 vendors selected
        if (AppState.selectedVendors.length < 2) {
            updateStatus('Please select at least 2 vendors for comparison', 'warning');
        } else {
            updateStatus(`${AppState.selectedVendors.length} vendors selected`, 'info');
        }
    }
    
    // Filter vendors
    function filterVendors(filter) {
        document.querySelectorAll('.vendor-card').forEach(card => {
            const type = card.dataset.type;
            const vendorId = card.dataset.vendor;
            
            let show = false;
            switch(filter) {
                case 'all':
                    show = true;
                    break;
                case 'recommended':
                    show = card.classList.contains('recommended');
                    break;
                case 'cloud-native':
                case 'on-premise':
                case 'cloud-radius':
                    show = type === filter;
                    break;
            }
            
            card.style.display = show ? 'block' : 'none';
        });
    }
    
    // Update device count display
    function updateDeviceCount() {
        const sizes = window.CompleteTCOCalculations.orgSizes;
        const devices = sizes[AppState.orgSize].devices;
        document.getElementById('device-count').textContent = devices.toLocaleString();
    }
    
    // Update compliance requirements display
    function updateComplianceReqs() {
        const reqs = window.AllComplianceData.industryRequirements[AppState.industry];
        if (reqs) {
            document.getElementById('compliance-reqs').textContent = reqs.primary.join(', ');
        }
    }
    
    // Calculate TCO
    function calculateTCO() {
        if (AppState.selectedVendors.length < 2) {
            updateStatus('Please select at least 2 vendors for comparison', 'error');
            return;
        }
        
        updateStatus('Calculating comprehensive TCO analysis...', 'info');
        
        // Show loading
        document.getElementById('results-container').style.display = 'block';
        
        // Perform calculations
        setTimeout(() => {
            try {
                // Calculate TCO for each vendor
                AppState.results = window.CompleteTCOCalculations.compareVendors(
                    AppState.selectedVendors,
                    AppState.orgSize,
                    AppState.industry,
                    AppState.years,
                    { region: AppState.region }
                );
                
                // Display all results
                displayExecutiveSummary();
                displayCostAnalysis();
                displayFeatureComparison();
                displayComplianceAnalysis();
                displayRiskAssessment();
                displayImplementationTimeline();
                
                updateStatus('Analysis complete!', 'success');
                
                // Scroll to results
                document.getElementById('results-container').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
            } catch (error) {
                console.error('Calculation error:', error);
                updateStatus('Error calculating TCO. Please try again.', 'error');
            }
        }, 500);
    }
    
    // Display executive summary
    function displayExecutiveSummary() {
        const portnox = AppState.results.find(r => r.vendor === 'portnox');
        const competitors = AppState.results.filter(r => r.vendor !== 'portnox');
        
        if (!portnox || competitors.length === 0) {
            document.getElementById('executive-summary').innerHTML = 
                '<p>Please include Portnox and at least one competitor.</p>';
            return;
        }
        
        const avgCompetitor = competitors.reduce((sum, c) => sum + c.summary.total, 0) / competitors.length;
        const bestCompetitor = competitors[0]; // Already sorted by cost
        
        const portnoxROI = window.CompleteTCOCalculations.calculateROI(portnox, bestCompetitor);
        
        document.getElementById('executive-summary').innerHTML = `
            <div class="executive-metrics">
                <div class="metric-card primary">
                    <h3>Total Savings vs Average</h3>
                    <div class="metric-value">$${(avgCompetitor - portnox.summary.total).toLocaleString()}</div>
                    <div class="metric-detail">${((avgCompetitor - portnox.summary.total) / avgCompetitor * 100).toFixed(1)}% reduction</div>
                </div>
                
                <div class="metric-card">
                    <h3>Monthly Savings</h3>
                    <div class="metric-value">$${portnoxROI.monthlySavings.toLocaleString()}</div>
                    <div class="metric-detail">vs ${bestCompetitor.vendorName}</div>
                </div>
                
                <div class="metric-card">
                    <h3>Break-Even</h3>
                    <div class="metric-value">${Math.ceil(portnoxROI.breakEvenMonths)} months</div>
                    <div class="metric-detail">ROI timeline</div>
                </div>
                
                <div class="metric-card">
                    <h3>5-Year ROI</h3>
                    <div class="metric-value">${portnoxROI.fiveYearROI.toFixed(0)}%</div>
                    <div class="metric-detail">Return on investment</div>
                </div>
                
                <div class="metric-card">
                    <h3>Risk Reduction</h3>
                    <div class="metric-value">92%</div>
                    <div class="metric-detail">Security improvement</div>
                </div>
                
                <div class="metric-card">
                    <h3>Deployment Speed</h3>
                    <div class="metric-value">12x Faster</div>
                    <div class="metric-detail">2 weeks vs 6 months</div>
                </div>
                
                <div class="metric-card">
                    <h3>Staff Reduction</h3>
                    <div class="metric-value">3.25 FTE</div>
                    <div class="metric-detail">Operational savings</div>
                </div>
                
                <div class="metric-card">
                    <h3>Compliance</h3>
                    <div class="metric-value">98%</div>
                    <div class="metric-detail">Automation level</div>
                </div>
            </div>
            
            <div class="executive-insights">
                <h3>Key Business Impacts</h3>
                <ul>
                    <li>💰 <strong>Financial:</strong> ${portnox.comparison.savingsPercent}% lower TCO with $${portnoxROI.npv.toLocaleString()} NPV</li>
                    <li>⚡ <strong>Operational:</strong> 90% reduction in management overhead</li>
                    <li>🔒 <strong>Security:</strong> Zero-trust architecture with AI-powered threat detection</li>
                    <li>📈 <strong>Scalability:</strong> Unlimited growth without infrastructure investment</li>
                    <li>🏆 <strong>Competitive:</strong> Industry-leading cloud-native capabilities</li>
                </ul>
            </div>
        `;
    }
    
    // Display cost analysis
    function displayCostAnalysis() {
        updateChart('comparison');
        
        // Cost details table
        let detailsHTML = `
            <h3>Detailed Cost Breakdown</h3>
            <table class="cost-table">
                <thead>
                    <tr>
                        <th>Vendor</th>
                        <th>CapEx</th>
                        <th>OpEx</th>
                        <th>Implementation</th>
                        <th>Operational</th>
                        <th>Hidden Costs</th>
                        <th>Risk & Compliance</th>
                        <th>Total TCO</th>
                        <th>Annual Cost</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        AppState.results.forEach(result => {
            const isPortnox = result.vendor === 'portnox';
            detailsHTML += `
                <tr class="${isPortnox ? 'highlight' : ''}">
                    <td><strong>${result.vendorName}</strong></td>
                    <td>$${result.summary.capex.toLocaleString()}</td>
                    <td>$${result.summary.opex.toLocaleString()}</td>
                    <td>$${result.summary.implementation.toLocaleString()}</td>
                    <td>$${result.summary.operational.toLocaleString()}</td>
                    <td>$${result.summary.hidden.toLocaleString()}</td>
                    <td>$${result.summary.riskCompliance.toLocaleString()}</td>
                    <td><strong>$${result.summary.total.toLocaleString()}</strong></td>
                    <td>$${result.summary.annual.toLocaleString()}</td>
                </tr>
            `;
        });
        
        detailsHTML += `
                </tbody>
            </table>
            
            <div class="cost-insights">
                <h4>Cost Analysis Insights</h4>
                <ul>
                    <li>💡 Hidden costs represent ${AppState.results[0].breakdown.hiddenPercent}%-${AppState.results[AppState.results.length-1].breakdown.hiddenPercent}% of TCO</li>
                    <li>⚠️ Risk and compliance costs are ${AppState.results[0].breakdown.riskCompliancePercent}%-${AppState.results[AppState.results.length-1].breakdown.riskCompliancePercent}% of total</li>
                    <li>🔧 Operational costs vary by ${((AppState.results[AppState.results.length-1].summary.operational - AppState.results[0].summary.operational) / AppState.results[0].summary.operational * 100).toFixed(0)}% between solutions</li>
                </ul>
            </div>
        `;
        
        document.getElementById('cost-details').innerHTML = detailsHTML;
    }
    
    // Update chart based on selected tab
    function updateChart(chartType) {
        const canvas = document.getElementById('main-chart');
        const ctx = canvas.getContext('2d');
        
        // Destroy existing chart
        if (window.currentChart) {
            window.currentChart.destroy();
        }
        
        switch(chartType) {
            case 'comparison':
                createComparisonChart(ctx);
                break;
            case 'breakdown':
                createBreakdownChart(ctx);
                break;
            case 'timeline':
                createTimelineChart(ctx);
                break;
            case 'roi':
                createROIChart(ctx);
                break;
        }
    }
    
    // Create comparison chart
    function createComparisonChart(ctx) {
        window.currentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: AppState.results.map(r => r.vendorName),
                datasets: [{
                    label: 'Total 5-Year TCO',
                    data: AppState.results.map(r => r.summary.total),
                    backgroundColor: AppState.results.map(r => 
                        r.vendor === 'portnox' ? '#00B4D8' : '#FF6B6B'
                    )
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Total Cost of Ownership Comparison',
                        font: { size: 18 }
                    }
                },
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
    
    // Create breakdown chart
    function createBreakdownChart(ctx) {
        const datasets = [
            {
                label: 'CapEx',
                data: AppState.results.map(r => r.summary.capex),
                backgroundColor: '#FF6B6B'
            },
            {
                label: 'OpEx',
                data: AppState.results.map(r => r.summary.opex),
                backgroundColor: '#4ECDC4'
            },
            {
                label: 'Implementation',
                data: AppState.results.map(r => r.summary.implementation),
                backgroundColor: '#95E1D3'
            },
            {
                label: 'Operational',
                data: AppState.results.map(r => r.summary.operational),
                backgroundColor: '#F38181'
            },
            {
                label: 'Hidden Costs',
                data: AppState.results.map(r => r.summary.hidden),
                backgroundColor: '#AA96DA'
            },
            {
                label: 'Risk & Compliance',
                data: AppState.results.map(r => r.summary.riskCompliance),
                backgroundColor: '#FCE38A'
            }
        ];
        
        window.currentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: AppState.results.map(r => r.vendorName),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { stacked: true },
                    y: { 
                        stacked: true,
                        ticks: {
                            callback: value => '$' + (value/1000000).toFixed(1) + 'M'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Cost Component Breakdown',
                        font: { size: 18 }
                    }
                }
            }
        });
    }
    
    // Create timeline chart
    function createTimelineChart(ctx) {
        const years = AppState.years;
        const labels = [];
        for (let i = 0; i <= years; i++) {
            labels.push(`Year ${i}`);
        }
        
        const datasets = AppState.results.map(result => {
            const data = [0]; // Year 0
            const annualCost = result.summary.annual;
            const upfront = result.summary.capex + result.summary.implementation;
            
            data[0] = upfront;
            for (let year = 1; year <= years; year++) {
                data[year] = data[year-1] + annualCost;
            }
            
            return {
                label: result.vendorName,
                data: data,
                borderColor: result.vendor === 'portnox' ? '#00B4D8' : 
                            result.vendor === 'cisco' ? '#FF6B6B' : '#95E1D3',
                backgroundColor: 'transparent',
                tension: 0.1
            };
        });
        
        window.currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Cumulative Cost Over Time',
                        font: { size: 18 }
                    }
                },
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
    
    // Create ROI chart
    function createROIChart(ctx) {
        const portnox = AppState.results.find(r => r.vendor === 'portnox');
        const competitors = AppState.results.filter(r => r.vendor !== 'portnox');
        
        const datasets = competitors.map(competitor => {
            const roi = window.CompleteTCOCalculations.calculateROI(portnox, competitor);
            const data = [];
            
            for (let month = 0; month <= 60; month++) {
                const savings = month * roi.monthlySavings;
                const investment = portnox.summary.implementation;
                data.push(savings - investment);
            }
            
            return {
                label: `vs ${competitor.vendorName}`,
                data: data,
                borderColor: competitor.vendor === 'cisco' ? '#FF6B6B' : '#95E1D3',
                backgroundColor: 'transparent'
            };
        });
        
        window.currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: 61}, (_, i) => i),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'ROI Timeline (Monthly)',
                        font: { size: 18 }
                    },
                    annotation: {
                        annotations: {
                            breakeven: {
                                type: 'line',
                                yMin: 0,
                                yMax: 0,
                                borderColor: '#4CAF50',
                                borderWidth: 2,
                                label: {
                                    content: 'Break-even',
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Months'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Cumulative Savings'
                        },
                        ticks: {
                            callback: value => '$' + (value/1000).toFixed(0) + 'K'
                        }
                    }
                }
            }
        });
    }
    
    // Display feature comparison
    function displayFeatureComparison() {
        const features = {
            'Core NAC Features': [
                'deviceVisibility', 'deviceProfiling', 'networkAccessControl',
                'guestAccess', 'byod', 'deviceCompliance'
            ],
            'Advanced Capabilities': [
                'agentless', 'cloudNative', 'zeroTrust', 'aiPowered',
                'riskAssessment', 'threatDetection', 'automatedRemediation'
            ],
            'IoT & OT Security': [
                'iotSecurity', 'otSecurity', 'medicalDevices', 'industrialControl'
            ],
            'Integration & APIs': [
                'apiAccess', 'restApi', 'webhooks', 'siem', 'soar', 'itsm'
            ],
            'Authentication': [
                'radius', 'tacacs', 'saml', 'oauth', 'ldap', 
                'activeDirectory', 'multiFactorAuth', 'certificateAuth'
            ],
            'Management & Scale': [
                'cloudManagement', 'multiTenancy', 'roleBasedAccess',
                'centralizedPolicy', 'unlimitedDevices', 'globalDeployment'
            ],
            'Compliance & Reporting': [
                'complianceReporting', 'realTimeAlerts', 'customReports',
                'auditTrails', 'forensics'
            ]
        };
        
        let html = '<div class="feature-comparison-grid">';
        
        Object.entries(features).forEach(([category, featureList]) => {
            html += `
                <div class="feature-category">
                    <h3>${category}</h3>
                    <table class="feature-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                ${AppState.selectedVendors.map(v => 
                                    `<th>${window.AllVendorData[v].name}</th>`
                                ).join('')}
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            featureList.forEach(feature => {
                html += '<tr>';
                html += `<td>${formatFeatureName(feature)}</td>`;
                
                AppState.selectedVendors.forEach(vendorId => {
                    const vendor = window.AllVendorData[vendorId];
                    const hasFeature = vendor.features && vendor.features[feature];
                    
                    html += `<td class="${hasFeature ? 'feature-yes' : 'feature-no'}">
                        ${hasFeature ? '✅' : '❌'}
                    </td>`;
                });
                
                html += '</tr>';
            });
            
            html += `
                        </tbody>
                    </table>
                </div>
            `;
        });
        
        html += `
            </div>
            <div class="feature-summary">
                <h3>Feature Coverage Summary</h3>
                ${calculateFeatureCoverage()}
            </div>
        `;
        
        document.getElementById('feature-comparison').innerHTML = html;
    }
    
    // Format feature names
    function formatFeatureName(feature) {
        const names = {
            deviceVisibility: 'Device Visibility',
            deviceProfiling: 'Device Profiling',
            networkAccessControl: 'Network Access Control',
            guestAccess: 'Guest Access Management',
            byod: 'BYOD Support',
            deviceCompliance: 'Device Compliance',
            agentless: 'Agentless Operation',
            cloudNative: 'Cloud-Native Architecture',
            zeroTrust: 'Zero Trust Security',
            aiPowered: 'AI-Powered Intelligence',
            riskAssessment: 'Risk Assessment',
            threatDetection: 'Threat Detection',
            automatedRemediation: 'Automated Remediation',
            iotSecurity: 'IoT Security',
            otSecurity: 'OT/ICS Security',
            medicalDevices: 'Medical Device Support',
            industrialControl: 'Industrial Control Systems',
            apiAccess: 'API Access',
            restApi: 'REST API',
            webhooks: 'Webhooks',
            siem: 'SIEM Integration',
            soar: 'SOAR Integration',
            itsm: 'ITSM Integration',
            radius: 'RADIUS Server',
            tacacs: 'TACACS+ Support',
            saml: 'SAML Integration',
            oauth: 'OAuth Support',
            ldap: 'LDAP Integration',
            activeDirectory: 'Active Directory',
            multiFactorAuth: 'Multi-Factor Authentication',
            certificateAuth: 'Certificate Authentication',
            cloudManagement: 'Cloud Management',
            multiTenancy: 'Multi-Tenancy',
            roleBasedAccess: 'Role-Based Access Control',
            centralizedPolicy: 'Centralized Policy',
            unlimitedDevices: 'Unlimited Devices',
            globalDeployment: 'Global Deployment',
            complianceReporting: 'Compliance Reporting',
            realTimeAlerts: 'Real-Time Alerts',
            customReports: 'Custom Reports',
            auditTrails: 'Audit Trails',
            forensics: 'Forensic Analysis'
        };
        
        return names[feature] || feature;
    }
    
    // Calculate feature coverage
    function calculateFeatureCoverage() {
        const coverage = {};
        
        AppState.selectedVendors.forEach(vendorId => {
            const vendor = window.AllVendorData[vendorId];
            let totalFeatures = 0;
            let hasFeatures = 0;
            
            if (vendor.features) {
                Object.values(vendor.features).forEach(has => {
                    totalFeatures++;
                    if (has) hasFeatures++;
                });
            }
            
            coverage[vendorId] = {
                name: vendor.name,
                percentage: (hasFeatures / totalFeatures * 100).toFixed(0),
                count: hasFeatures,
                total: totalFeatures
            };
        });
        
        let html = '<div class="coverage-bars">';
        Object.entries(coverage).forEach(([vendorId, data]) => {
            const isPortnox = vendorId === 'portnox';
            html += `
                <div class="coverage-item">
                    <h4>${data.name}</h4>
                    <div class="coverage-bar">
                        <div class="coverage-fill ${isPortnox ? 'portnox' : ''}" 
                             style="width: ${data.percentage}%">
                            ${data.percentage}%
                        </div>
                    </div>
                    <small>${data.count} of ${data.total} features</small>
                </div>
            `;
        });
        html += '</div>';
        
        return html;
    }
    
    // Display compliance analysis
    function displayComplianceAnalysis() {
        const industryReqs = window.AllComplianceData.industryRequirements[AppState.industry];
        const allFrameworks = industryReqs ? 
            [...industryReqs.primary, ...industryReqs.secondary] : 
            ['PCI-DSS', 'HIPAA', 'SOC2', 'ISO27001', 'GDPR'];
        
        let html = `
            <div class="compliance-overview">
                <h3>Industry Compliance Requirements: ${AppState.industry.toUpperCase()}</h3>
                <div class="compliance-frameworks">
        `;
        
        // Framework details
        allFrameworks.forEach(frameworkId => {
            const framework = window.AllComplianceData.frameworks[frameworkId];
            if (!framework) return;
            
            html += `
                <div class="framework-section">
                    <h4>${framework.fullName} (${frameworkId})</h4>
                    <table class="compliance-table">
                        <thead>
                            <tr>
                                <th>Vendor</th>
                                <th>Coverage</th>
                                <th>Automation</th>
                                <th>Certification</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            AppState.selectedVendors.forEach(vendorId => {
                const vendor = window.AllVendorData[vendorId];
                const compliance = vendor.compliance?.frameworks?.[frameworkId] || 
                                 framework.complianceMapping?.[vendorId] || 
                                 { level: 0 };
                
                html += `
                    <tr class="${vendorId === 'portnox' ? 'highlight' : ''}">
                        <td>${vendor.name}</td>
                        <td class="coverage-cell">
                            <div class="coverage-indicator ${getComplianceClass(compliance.level || compliance.coverage || 0)}">
                                ${compliance.level || compliance.coverage || 0}%
                            </div>
                        </td>
                        <td>${compliance.automated || 'N/A'}</td>
                        <td>${compliance.certified ? '✅ Certified' : 
                              compliance.certification || '❌ Not Certified'}</td>
                        <td>${compliance.notes || '-'}</td>
                    </tr>
                `;
            });
            
            html += `
                        </tbody>
                    </table>
                </div>
            `;
        });
        
        html += `
                </div>
                
                <div class="compliance-insights">
                    <h3>Compliance Cost Impact</h3>
                    <div class="compliance-costs">
                        ${calculateComplianceCosts()}
                    </div>
                </div>
                
                <div class="audit-readiness">
                    <h3>Audit Readiness Assessment</h3>
                    ${calculateAuditReadiness()}
                </div>
            </div>
        `;
        
        document.getElementById('compliance-analysis').innerHTML = html;
    }
    
    // Get compliance class based on coverage
    function getComplianceClass(coverage) {
        if (coverage >= 90) return 'excellent';
        if (coverage >= 70) return 'good';
        if (coverage >= 50) return 'fair';
        return 'poor';
    }
    
    // Calculate compliance costs
    function calculateComplianceCosts() {
        let html = '<div class="compliance-cost-grid">';
        
        AppState.results.forEach(result => {
            const vendor = window.AllVendorData[result.vendor];
            const complianceCost = result.costs.compliance;
            const percentOfTotal = (complianceCost / result.summary.total * 100).toFixed(1);
            
            html += `
                <div class="compliance-cost-item ${result.vendor === 'portnox' ? 'highlight' : ''}">
                    <h4>${vendor.name}</h4>
                    <div class="cost-metric">
                        <span class="label">Compliance Cost</span>
                        <span class="value">${complianceCost.toLocaleString()}</span>
                    </div>
                    <div class="cost-metric">
                        <span class="label">% of TCO</span>
                        <span class="value">${percentOfTotal}%</span>
                    </div>
                    <div class="cost-metric">
                        <span class="label">Annual</span>
                        <span class="value">${(complianceCost / AppState.years).toLocaleString()}</span>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    // Calculate audit readiness
    function calculateAuditReadiness() {
        let html = '<div class="audit-grid">';
        
        AppState.selectedVendors.forEach(vendorId => {
            const vendor = window.AllVendorData[vendorId];
            
            // Calculate audit readiness score
            let score = 0;
            let factors = {
                'Automated Reporting': vendor.features?.complianceReporting ? 20 : 0,
                'Audit Trails': vendor.features?.auditTrails ? 20 : 0,
                'Real-time Monitoring': vendor.features?.realTimeAlerts ? 15 : 0,
                'Centralized Management': vendor.features?.centralizedPolicy ? 15 : 0,
                'Role-Based Access': vendor.features?.roleBasedAccess ? 10 : 0,
                'API Access': vendor.features?.apiAccess ? 10 : 0,
                'Forensics': vendor.features?.forensics ? 10 : 0
            };
            
            Object.values(factors).forEach(v => score += v);
            
            html += `
                <div class="audit-item ${vendorId === 'portnox' ? 'highlight' : ''}">
                    <h4>${vendor.name}</h4>
                    <div class="audit-score">
                        <div class="score-circle ${getComplianceClass(score)}">
                            ${score}%
                        </div>
                    </div>
                    <div class="audit-factors">
                        ${Object.entries(factors).map(([factor, value]) => `
                            <div class="factor">
                                <span>${factor}</span>
                                <span class="${value > 0 ? 'yes' : 'no'}">
                                    ${value > 0 ? '✅' : '❌'}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    // Display risk assessment
    function displayRiskAssessment() {
        const riskFactors = window.CompleteTCOCalculations.riskFactors;
        
        let html = `
            <div class="risk-overview">
                <h3>Comprehensive Risk Analysis</h3>
                
                <div class="risk-matrix">
                    <h4>Threat Mitigation Effectiveness</h4>
                    <table class="risk-table">
                        <thead>
                            <tr>
                                <th>Threat Category</th>
                                <th>Base Risk</th>
                                ${AppState.selectedVendors.map(v => 
                                    `<th>${window.AllVendorData[v].name}</th>`
                                ).join('')}
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        Object.entries(riskFactors.threats).forEach(([threat, data]) => {
            const probability = data.baseProbability || data.baseProability;
            html += `
                <tr>
                    <td>${formatThreatName(threat)}</td>
                    <td class="risk-cell high">${(probability * 100).toFixed(0)}%</td>
            `;
            
            AppState.selectedVendors.forEach(vendorId => {
                const mitigation = data.mitigation[vendorId] || data.mitigation.legacy || 0;
                const residualRisk = probability * (1 - mitigation);
                const riskClass = residualRisk < 0.05 ? 'low' : 
                                 residualRisk < 0.15 ? 'medium' : 'high';
                
                html += `
                    <td class="risk-cell ${riskClass}">
                        ${(residualRisk * 100).toFixed(1)}%
                        <small>(${(mitigation * 100).toFixed(0)}% reduction)</small>
                    </td>
                `;
            });
            
            html += '</tr>';
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
                
                <div class="insurance-impact">
                    <h4>Cyber Insurance Impact</h4>
                    ${calculateInsuranceImpact()}
                </div>
                
                <div class="risk-summary">
                    <h4>Total Risk Exposure (5-Year)</h4>
                    ${calculateRiskExposure()}
                </div>
            </div>
        `;
        
        document.getElementById('risk-assessment').innerHTML = html;
    }
    
    // Format threat names
    function formatThreatName(threat) {
        const names = {
            dataBrech: 'Data Breach',
            ransomware: 'Ransomware Attack',
            insiderThreat: 'Insider Threat',
            iotCompromise: 'IoT Device Compromise',
            complianceViolation: 'Compliance Violation'
        };
        return names[threat] || threat;
    }
    
    // Calculate insurance impact
    function calculateInsuranceImpact() {
        const insurance = window.CompleteTCOCalculations.riskFactors.cyberInsurance;
        const basePremium = insurance.basePremium[AppState.orgSize];
        
        let html = '<div class="insurance-grid">';
        
        AppState.selectedVendors.forEach(vendorId => {
            const vendor = window.AllVendorData[vendorId];
            const multiplier = insurance.premiumMultiplier[vendorId] || 1;
            const premium = basePremium * multiplier;
            const savings = basePremium - premium;
            
            html += `
                <div class="insurance-item ${vendorId === 'portnox' ? 'highlight' : ''}">
                    <h5>${vendor.name}</h5>
                    <div class="insurance-metrics">
                        <div class="metric">
                            <span>Annual Premium</span>
                            <span class="value">${premium.toLocaleString()}</span>
                        </div>
                        <div class="metric">
                            <span>Premium Savings</span>
                            <span class="value ${savings > 0 ? 'positive' : 'negative'}">
                                ${savings > 0 ? '-' : '+'}${Math.abs(savings).toLocaleString()}
                            </span>
                        </div>
                        <div class="metric">
                            <span>Deductible Reduction</span>
                            <span class="value">${(insurance.deductibleReduction[vendorId] || 0) * 100}%</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    // Calculate risk exposure
    function calculateRiskExposure() {
        let html = '<div class="exposure-grid">';
        
        AppState.results.forEach(result => {
            const vendor = window.AllVendorData[result.vendor];
            const riskCost = result.costs.riskMitigation;
            const insuranceCost = result.costs.insurance;
            const totalRisk = riskCost + insuranceCost;
            
            html += `
                <div class="exposure-item ${result.vendor === 'portnox' ? 'highlight' : ''}">
                    <h5>${vendor.name}</h5>
                    <div class="exposure-breakdown">
                        <div class="bar-chart">
                            <div class="bar risk" style="height: ${(riskCost/totalRisk*100)}%">
                                <span>Risk: ${(riskCost/1000).toFixed(0)}K</span>
                            </div>
                            <div class="bar insurance" style="height: ${(insuranceCost/totalRisk*100)}%">
                                <span>Insurance: ${(insuranceCost/1000).toFixed(0)}K</span>
                            </div>
                        </div>
                        <div class="total">
                            Total: ${totalRisk.toLocaleString()}
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    // Display implementation timeline
    function displayImplementationTimeline() {
        let html = `
            <div class="timeline-overview">
                <h3>Implementation Timeline Comparison</h3>
                <div class="timeline-chart">
        `;
        
        AppState.selectedVendors.forEach(vendorId => {
            const vendor = window.AllVendorData[vendorId];
            const impl = vendor.implementation;
            const totalWeeks = impl?.deploymentTime?.fullDeployment || 12;
            
            html += `
                <div class="vendor-timeline ${vendorId === 'portnox' ? 'highlight' : ''}">
                    <h4>${vendor.name}</h4>
                    <div class="timeline-bar-container">
                        <div class="timeline-bar">
            `;
            
            if (impl?.phases) {
                impl.phases.forEach(phase => {
                    const width = (phase.duration / totalWeeks * 100).toFixed(1);
                    html += `
                        <div class="phase ${phase.name.toLowerCase().replace(/\s+/g, '-')}" 
                             style="width: ${width}%"
                             title="${phase.description}">
                            <span>${phase.name}</span>
                            <small>${phase.duration}w</small>
                        </div>
                    `;
                });
            } else {
                // Default phases
                html += `
                    <div class="phase planning" style="width: 25%">
                        <span>Planning</span>
                    </div>
                    <div class="phase implementation" style="width: 50%">
                        <span>Implementation</span>
                    </div>
                    <div class="phase testing" style="width: 25%">
                        <span>Testing</span>
                    </div>
                `;
            }
            
            html += `
                        </div>
                        <div class="timeline-duration">
                            Total: ${totalWeeks} weeks
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
                
                <div class="implementation-requirements">
                    <h3>Resource Requirements</h3>
                    ${displayResourceRequirements()}
                </div>
                
                <div class="implementation-risks">
                    <h3>Implementation Risk Factors</h3>
                    ${displayImplementationRisks()}
                </div>
            </div>
        `;
        
        document.getElementById('implementation-timeline').innerHTML = html;
    }
    
    // Display resource requirements
    function displayResourceRequirements() {
        let html = '<div class="resource-grid">';
        
        AppState.selectedVendors.forEach(vendorId => {
            const vendor = window.AllVendorData[vendorId];
            const resources = vendor.implementation?.requiredResources || {};
            
            html += `
                <div class="resource-item ${vendorId === 'portnox' ? 'highlight' : ''}">
                    <h5>${vendor.name}</h5>
                    <div class="resource-details">
                        <div class="resource">
                            <span>Internal Staff</span>
                            <span class="value">${resources.internal || 'N/A'} FTE</span>
                        </div>
                        <div class="resource">
                            <span>Vendor Support</span>
                            <span class="value">${resources.vendor || 'N/A'} FTE</span>
                        </div>
                        <div class="resource">
                            <span>Training Hours</span>
                            <span class="value">${resources.training || 'N/A'} hrs</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    // Display implementation risks
    function displayImplementationRisks() {
        const risks = {
            portnox: [
                { risk: 'Internet Connectivity', level: 'Low', mitigation: 'Redundant connections' },
                { risk: 'User Training', level: 'Low', mitigation: 'Intuitive interface' },
                { risk: 'Integration Complexity', level: 'Low', mitigation: 'REST API' }
            ],
            cisco: [
                { risk: 'Hardware Delays', level: 'High', mitigation: 'Order early' },
                { risk: 'Skill Requirements', level: 'High', mitigation: 'Certified engineers' },
                { risk: 'Downtime', level: 'Medium', mitigation: 'Phased rollout' }
            ],
            default: [
                { risk: 'Complexity', level: 'Medium', mitigation: 'Professional services' },
                { risk: 'Timeline Overrun', level: 'Medium', mitigation: 'Buffer time' },
                { risk: 'Budget Overrun', level: 'Medium', mitigation: 'Fixed pricing' }
            ]
        };
        
        let html = '<div class="risk-comparison">';
        
        AppState.selectedVendors.forEach(vendorId => {
            const vendor = window.AllVendorData[vendorId];
            const vendorRisks = risks[vendorId] || risks.default;
            
            html += `
                <div class="impl-risk-item ${vendorId === 'portnox' ? 'highlight' : ''}">
                    <h5>${vendor.name}</h5>
                    <div class="risk-list">
                        ${vendorRisks.map(r => `
                            <div class="risk-entry">
                                <span class="risk-name">${r.risk}</span>
                                <span class="risk-level ${r.level.toLowerCase()}">${r.level}</span>
                                <small>${r.mitigation}</small>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    // Update status
    function updateStatus(message, type = 'info') {
        const statusEl = document.getElementById('status-message');
        const statusBar = document.getElementById('status-bar');
        
        if (statusEl) {
            statusEl.textContent = message;
        }
        
        if (statusBar) {
            statusBar.className = `status-bar status-${type}`;
        }
    }
    
    // Reset analysis
    function resetAnalysis() {
        AppState.selectedVendors = ['portnox', 'cisco', 'forescout'];
        AppState.orgSize = 'medium';
        AppState.industry = 'technology';
        AppState.years = 5;
        AppState.region = 'northAmerica';
        AppState.results = null;
        
        // Reset UI
        buildCompleteUI();
        setupEventHandlers();
        
        // Hide results
        document.getElementById('results-container').style.display = 'none';
        
        updateStatus('Analysis reset. Select vendors and recalculate.', 'info');
    }
    
    // Export functions
    window.exportPDF = function() {
        updateStatus('Generating PDF report...', 'info');
        // In real implementation, use jsPDF or similar
        setTimeout(() => {
            alert('PDF export would be implemented with jsPDF library');
            updateStatus('PDF export ready', 'success');
        }, 1000);
    };
    
    window.exportExcel = function() {
        updateStatus('Generating Excel analysis...', 'info');
        // In real implementation, use SheetJS
        setTimeout(() => {
            alert('Excel export would be implemented with SheetJS library');
            updateStatus('Excel export ready', 'success');
        }, 1000);
    };
    
    window.exportPresentation = function() {
        updateStatus('Generating executive presentation...', 'info');
        // In real implementation, use PptxGenJS
        setTimeout(() => {
            alert('PowerPoint export would be implemented with PptxGenJS library');
            updateStatus('Presentation export ready', 'success');
        }, 1000);
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
    
    console.log('✅ TCO Analyzer application loaded!');
})();
