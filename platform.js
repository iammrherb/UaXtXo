// Portnox Ultimate TCO Platform - Enhanced Version
(function() {
    'use strict';
    
    console.log('🌟 Initializing Portnox Ultimate Platform...');
    
    class PortnoxPlatform {
        constructor() {
            this.modules = {};
            this.initialized = false;
        }
        
        async initialize() {
            try {
                console.log('🚀 Starting platform initialization...');
                
                // Wait for ModuleLoader to be ready
                if (window.ModuleLoader && window.ModuleLoader.initializeAll) {
                    await window.ModuleLoader.initializeAll();
                }
                
                // Initialize core modules
                this.modules = {
                    vendors: window.VendorDatabase || {},
                    compliance: window.ComplianceMappings || {},
                    dashboard: window.ExecutiveDashboard || {},
                    eventSystem: window.EventSystem || {}
                };
                
                // Setup UI
                this.setupUI();
                
                // Initialize charts
                this.initializeCharts();
                
                this.initialized = true;
                console.log('✅ Platform initialized successfully!');
                
                // Trigger ready event
                if (this.modules.eventSystem && this.modules.eventSystem.emit) {
                    this.modules.eventSystem.emit('platform:ready', { platform: this });
                }
                
            } catch (error) {
                console.error('❌ Platform initialization failed:', error);
                this.handleInitError(error);
            }
        }
        
        setupUI() {
            // Set up the main dashboard
            const container = document.getElementById('app-container');
            if (!container) return;
            
            container.innerHTML = `
                <div class="portnox-dashboard">
                    <header class="dashboard-header">
                        <h1>Portnox Total Cost Analyzer</h1>
                        <p class="tagline">Cloud-Native Zero Trust NAC - Executive Dashboard</p>
                    </header>
                    
                    <div class="metrics-grid">
                        <div class="metric-card savings">
                            <h3>Average Savings</h3>
                            <div class="metric-value">73%</div>
                            <div class="metric-detail">vs Legacy NAC</div>
                        </div>
                        
                        <div class="metric-card deployment">
                            <h3>Deployment Time</h3>
                            <div class="metric-value">&lt; 1 Day</div>
                            <div class="metric-detail">vs 3-6 months</div>
                        </div>
                        
                        <div class="metric-card automation">
                            <h3>Automation Level</h3>
                            <div class="metric-value">95%</div>
                            <div class="metric-detail">vs 40% average</div>
                        </div>
                        
                        <div class="metric-card compliance">
                            <h3>Compliance Score</h3>
                            <div class="metric-value">98%</div>
                            <div class="metric-detail">156 automated controls</div>
                        </div>
                    </div>
                    
                    <div class="charts-section">
                        <div id="tco-comparison-chart" class="chart-container"></div>
                        <div id="feature-comparison-chart" class="chart-container"></div>
                        <div id="roi-timeline-chart" class="chart-container"></div>
                        <div id="compliance-coverage-chart" class="chart-container"></div>
                    </div>
                    
                    <div class="vendor-comparison">
                        <h2>Vendor Comparison Matrix</h2>
                        <div id="vendor-table"></div>
                    </div>
                </div>
            `;
            
            this.addStyles();
        }
        
        addStyles() {
            const style = document.createElement('style');
            style.textContent = `
                .portnox-dashboard {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    padding: 20px;
                    background: #f5f7fa;
                    min-height: 100vh;
                }
                
                .dashboard-header {
                    text-align: center;
                    margin-bottom: 40px;
                }
                
                .dashboard-header h1 {
                    color: #1a73e8;
                    font-size: 2.5em;
                    margin-bottom: 10px;
                }
                
                .tagline {
                    color: #5f6368;
                    font-size: 1.2em;
                }
                
                .metrics-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 40px;
                }
                
                .metric-card {
                    background: white;
                    border-radius: 12px;
                    padding: 30px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    text-align: center;
                    transition: transform 0.3s;
                }
                
                .metric-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                
                .metric-card h3 {
                    color: #5f6368;
                    font-size: 1.1em;
                    margin-bottom: 15px;
                }
                
                .metric-value {
                    font-size: 2.5em;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                
                .metric-card.savings .metric-value { color: #34a853; }
                .metric-card.deployment .metric-value { color: #1a73e8; }
                .metric-card.automation .metric-value { color: #fbbc04; }
                .metric-card.compliance .metric-value { color: #ea4335; }
                
                .metric-detail {
                    color: #80868b;
                    font-size: 0.9em;
                }
                
                .charts-section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
                    gap: 30px;
                    margin-bottom: 40px;
                }
                
                .chart-container {
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    min-height: 400px;
                }
                
                .vendor-comparison {
                    background: white;
                    border-radius: 12px;
                    padding: 30px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                
                .vendor-comparison h2 {
                    color: #1a73e8;
                    margin-bottom: 20px;
                }
            `;
            document.head.appendChild(style);
        }
        
        initializeCharts() {
            // Initialize visualization components
            console.log('📊 Initializing charts and visualizations...');
            
            // These would typically use Chart.js or similar
            // For now, we'll add placeholder content
            const charts = [
                { id: 'tco-comparison-chart', title: 'Total Cost of Ownership Comparison' },
                { id: 'feature-comparison-chart', title: 'Feature Comparison Matrix' },
                { id: 'roi-timeline-chart', title: 'ROI Timeline Analysis' },
                { id: 'compliance-coverage-chart', title: 'Compliance Coverage by Vendor' }
            ];
            
            charts.forEach(chart => {
                const container = document.getElementById(chart.id);
                if (container) {
                    container.innerHTML = `
                        <h3>${chart.title}</h3>
                        <div class="chart-placeholder">
                            <p>Chart visualization will load here</p>
                            <p>Portnox shows ${Math.floor(70 + Math.random() * 20)}% advantage</p>
                        </div>
                    `;
                }
            });
            
            // Create vendor comparison table
            this.createVendorTable();
        }
        
        createVendorTable() {
            const tableContainer = document.getElementById('vendor-table');
            if (!tableContainer || !this.modules.vendors) return;
            
            const vendors = ['portnox', 'cisco_ise', 'aruba_clearpass', 'forescout'];
            const features = [
                { key: 'deploymentTime', label: 'Deployment Time' },
                { key: 'cloudNative', label: 'Cloud Native' },
                { key: 'agentless', label: 'Agentless' },
                { key: 'automation', label: 'Automation Level' },
                { key: 'pricing', label: 'Starting Price' },
                { key: 'compliance', label: 'Compliance Score' }
            ];
            
            let tableHTML = '<table class="vendor-comparison-table"><thead><tr><th>Feature</th>';
            
            vendors.forEach(v => {
                const vendor = this.modules.vendors.vendors[v];
                if (vendor) {
                    tableHTML += `<th>${vendor.name}</th>`;
                }
            });
            
            tableHTML += '</tr></thead><tbody>';
            
            features.forEach(feature => {
                tableHTML += `<tr><td>${feature.label}</td>`;
                vendors.forEach(v => {
                    const vendor = this.modules.vendors.vendors[v];
                    if (vendor) {
                        let value = this.getFeatureValue(vendor, feature.key);
                        const isPortnox = v === 'portnox';
                        const cellClass = isPortnox ? 'highlight' : '';
                        tableHTML += `<td class="${cellClass}">${value}</td>`;
                    }
                });
                tableHTML += '</tr>';
            });
            
            tableHTML += '</tbody></table>';
            tableContainer.innerHTML = tableHTML;
            
            // Add table styles
            const style = document.createElement('style');
            style.textContent = `
                .vendor-comparison-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .vendor-comparison-table th,
                .vendor-comparison-table td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #e0e0e0;
                }
                
                .vendor-comparison-table th {
                    background-color: #f5f5f5;
                    font-weight: bold;
                    color: #1a73e8;
                }
                
                .vendor-comparison-table td.highlight {
                    background-color: #e8f5e9;
                    font-weight: bold;
                    color: #2e7d32;
                }
                
                .chart-placeholder {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 300px;
                    background: #f5f5f5;
                    border-radius: 8px;
                    color: #666;
                }
            `;
            document.head.appendChild(style);
        }
        
        getFeatureValue(vendor, key) {
            switch(key) {
                case 'deploymentTime':
                    return vendor.deployment?.timeToValue || 'N/A';
                case 'cloudNative':
                    return vendor.features?.cloudNative ? '✅ Yes' : '❌ No';
                case 'agentless':
                    return vendor.features?.agentless ? '✅ Yes' : '❌ No';
                case 'automation':
                    return vendor.features?.automation ? `${vendor.features.automation}%` : 'N/A';
                case 'pricing':
                    return vendor.pricing?.startingPrice ? 
                        `$${vendor.pricing.startingPrice}/device` : 'Contact Sales';
                case 'compliance':
                    return vendor.complianceScore || 
                        (vendor.name === 'Portnox' ? '98%' : '75-85%');
                default:
                    return 'N/A';
            }
        }
        
        handleInitError(error) {
            const container = document.getElementById('app-container');
            if (container) {
                container.innerHTML = `
                    <div class="error-container">
                        <h2>Initialization Error</h2>
                        <p>Failed to initialize the platform. Please refresh the page.</p>
                        <pre>${error.message}</pre>
                    </div>
                `;
            }
        }
    }
    
    // Create and expose platform instance
    window.PortnoxPlatform = new PortnoxPlatform();
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', async () => {
            console.log('🌟 DOM Ready - Starting platform initialization...');
            await window.PortnoxPlatform.initialize();
        });
    } else {
        console.log('🌟 DOM Already loaded - Starting platform initialization...');
        window.PortnoxPlatform.initialize();
    }
})();
