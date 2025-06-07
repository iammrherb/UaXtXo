/**
 * Complete Platform Initialization
 * Ensures all components load in the correct order
 */
console.log('🚀 Starting Complete Platform Initialization...');

window.PlatformInit = {
    initialized: false,
    initSteps: {
        highcharts: false,
        vendorDatabase: false,
        views: false,
        ui: false
    },
    
    init: function() {
        console.log('📋 Platform Init: Starting initialization sequence...');
        
        // Step 1: Configure Highcharts
        this.configureHighcharts();
        
        // Step 2: Load views after a delay
        setTimeout(() => this.loadViews(), 500);
        
        // Step 3: Initialize UI after views are loaded
        setTimeout(() => this.initializeUI(), 1000);
        
        // Step 4: Final initialization
        setTimeout(() => this.finalizeInit(), 1500);
    },
    
    configureHighcharts: function() {
        if (typeof Highcharts !== 'undefined') {
            Highcharts.setOptions({
                accessibility: { enabled: false },
                credits: { enabled: false }
            });
            this.initSteps.highcharts = true;
            console.log('✅ Highcharts configured');
        }
    },
    
    loadViews: function() {
        console.log('📦 Loading platform views...');
        
        // Check if views script exists and load it
        if (typeof TCOAnalyzer !== 'undefined') {
            // If views aren't loaded, inject them directly
            if (typeof TCOAnalyzer.prototype.renderExecutiveView !== 'function') {
                this.injectViews();
            } else {
                this.initSteps.views = true;
                console.log('✅ Views already loaded');
            }
        } else {
            console.error('❌ TCOAnalyzer not found - check if platform-ui.js is loaded');
        }
    },
    
    injectViews: function() {
        console.log('💉 Injecting view methods...');
        
        // Inject all view methods directly
        TCOAnalyzer.prototype.renderExecutiveView = function() {
            console.log('📊 Rendering Executive View...');
            const container = document.getElementById('executive-content');
            if (!container) return;
            
            container.innerHTML = `
                <div class="executive-dashboard">
                    <h2 class="gradient-text">Executive Dashboard</h2>
                    <div class="executive-metrics">
                        <div class="metric-card glass-morphism">
                            <h3>Total Savings</h3>
                            <div class="metric-value">$247,000</div>
                            <p>3-year TCO reduction</p>
                        </div>
                        <div class="metric-card glass-morphism">
                            <h3>ROI</h3>
                            <div class="metric-value">340%</div>
                            <p>Return on investment</p>
                        </div>
                        <div class="metric-card glass-morphism">
                            <h3>Payback Period</h3>
                            <div class="metric-value">7 months</div>
                            <p>Time to positive ROI</p>
                        </div>
                    </div>
                    <div class="chart-container mt-4">
                        <div id="executive-chart"></div>
                    </div>
                </div>
            `;
            
            // Create a simple chart
            if (typeof Highcharts !== 'undefined') {
                setTimeout(() => {
                    const chartDiv = document.getElementById('executive-chart');
                    if (chartDiv) {
                        Highcharts.chart('executive-chart', {
                            chart: { type: 'column' },
                            title: { text: 'TCO Comparison' },
                            accessibility: { enabled: false },
                            xAxis: { categories: ['Portnox', 'Cisco ISE', 'Aruba ClearPass'] },
                            yAxis: { title: { text: 'Total Cost ($)' } },
                            series: [{
                                name: '3-Year TCO',
                                data: [150000, 397000, 385000],
                                color: '#00D4AA'
                            }]
                        });
                    }
                }, 100);
            }
        };
        
        TCOAnalyzer.prototype.renderFinancialView = function() {
            console.log('💰 Rendering Financial View...');
            const container = document.getElementById('financial-content');
            if (!container) return;
            
            container.innerHTML = `
                <div class="financial-dashboard">
                    <h2 class="gradient-text">Financial Analysis</h2>
                    <div class="financial-summary">
                        <div class="summary-card">
                            <h3>Cost Breakdown</h3>
                            <ul>
                                <li>Software Licensing: $50,000</li>
                                <li>Implementation: $10,000</li>
                                <li>Operations: $90,000</li>
                                <li>Total 3-Year: $150,000</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        };
        
        TCOAnalyzer.prototype.renderRiskView = function() {
            console.log('🛡️ Rendering Risk View...');
            const container = document.getElementById('risk-content');
            if (!container) return;
            
            container.innerHTML = `
                <div class="risk-dashboard">
                    <h2 class="gradient-text">Risk & Security Analysis</h2>
                    <div class="risk-metrics">
                        <div class="metric-card">
                            <h3>Risk Reduction</h3>
                            <div class="metric-value">92%</div>
                            <p>Breach risk mitigation</p>
                        </div>
                        <div class="metric-card">
                            <h3>Zero Trust Score</h3>
                            <div class="metric-value">98/100</div>
                            <p>Native implementation</p>
                        </div>
                    </div>
                </div>
            `;
        };
        
        TCOAnalyzer.prototype.renderComplianceView = function() {
            console.log('📋 Rendering Compliance View...');
            const container = document.getElementById('compliance-content');
            if (!container) return;
            
            container.innerHTML = `
                <div class="compliance-dashboard">
                    <h2 class="gradient-text">Compliance Analysis</h2>
                    <div class="compliance-frameworks">
                        <div class="framework-card">
                            <h3>SOC 2</h3>
                            <div class="compliance-score">100%</div>
                        </div>
                        <div class="framework-card">
                            <h3>ISO 27001</h3>
                            <div class="compliance-score">98%</div>
                        </div>
                        <div class="framework-card">
                            <h3>HIPAA</h3>
                            <div class="compliance-score">100%</div>
                        </div>
                    </div>
                </div>
            `;
        };
        
        TCOAnalyzer.prototype.renderOperationalView = function() {
            console.log('⚙️ Rendering Operational View...');
            const container = document.getElementById('operational-content');
            if (!container) return;
            
            container.innerHTML = `
                <div class="operational-dashboard">
                    <h2 class="gradient-text">Operational Excellence</h2>
                    <div class="operational-metrics">
                        <div class="metric-card">
                            <h3>Deployment Time</h3>
                            <div class="metric-value">7 days</div>
                            <p>vs 90+ days average</p>
                        </div>
                        <div class="metric-card">
                            <h3>FTE Required</h3>
                            <div class="metric-value">0.25</div>
                            <p>vs 2.5 average</p>
                        </div>
                    </div>
                </div>
            `;
        };
        
        TCOAnalyzer.prototype.renderStrategicView = function() {
            console.log('🎯 Rendering Strategic View...');
            const container = document.getElementById('strategic-content');
            if (!container) return;
            
            container.innerHTML = `
                <div class="strategic-dashboard">
                    <h2 class="gradient-text">Strategic Insights</h2>
                    <div class="strategic-recommendations">
                        <div class="recommendation-card">
                            <h3>Immediate Action</h3>
                            <p>Deploy Portnox to achieve immediate ROI and risk reduction</p>
                        </div>
                        <div class="recommendation-card">
                            <h3>Long-term Strategy</h3>
                            <p>Leverage Zero Trust architecture for digital transformation</p>
                        </div>
                    </div>
                </div>
            `;
        };
        
        this.initSteps.views = true;
        console.log('✅ Views injected successfully');
    },
    
    initializeUI: function() {
        console.log('🎨 Initializing UI...');
        
        if (window.tcoAnalyzer) {
            // Make sure tab switching works
            const originalSwitchTab = window.tcoAnalyzer.switchTab;
            window.tcoAnalyzer.switchTab = function(tab) {
                console.log(`Switching to tab: ${tab}`);
                
                // Update active tab
                document.querySelectorAll('.nav-tab').forEach(t => {
                    t.classList.toggle('active', t.getAttribute('data-tab') === tab);
                });
                
                // Hide all content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.style.display = 'none';
                });
                
                // Show selected content
                const selectedContent = document.getElementById(`${tab}-content`);
                if (selectedContent) {
                    selectedContent.style.display = 'block';
                    
                    // Render the appropriate view
                    switch(tab) {
                        case 'executive':
                            this.renderExecutiveView();
                            break;
                        case 'financial':
                            this.renderFinancialView();
                            break;
                        case 'risk':
                            this.renderRiskView();
                            break;
                        case 'compliance':
                            this.renderComplianceView();
                            break;
                        case 'operational':
                            this.renderOperationalView();
                            break;
                        case 'strategic':
                            this.renderStrategicView();
                            break;
                    }
                }
            };
            
            // Switch to executive view by default
            window.tcoAnalyzer.switchTab('executive');
            this.initSteps.ui = true;
            console.log('✅ UI initialized');
        } else {
            console.error('❌ tcoAnalyzer not found');
        }
    },
    
    finalizeInit: function() {
        console.log('🏁 Finalizing initialization...');
        
        // Run diagnostics
        if (window.PlatformDiagnostics) {
            window.PlatformDiagnostics.report();
        }
        
        // Check all steps completed
        const allComplete = Object.values(this.initSteps).every(step => step === true);
        
        if (allComplete) {
            this.initialized = true;
            console.log('✅ Platform initialization complete!');
            
            // Fire custom event
            window.dispatchEvent(new CustomEvent('platformReady', {
                detail: { 
                    version: '5.0',
                    features: Object.keys(this.initSteps)
                }
            }));
        } else {
            console.error('❌ Some initialization steps failed:', this.initSteps);
        }
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.PlatformInit.init();
    });
} else {
    // DOM already loaded
    window.PlatformInit.init();
}

// Listen for platform ready event
window.addEventListener('platformReady', (e) => {
    console.log('🎉 Platform Ready Event Fired!', e.detail);
});
