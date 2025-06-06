// Comprehensive Executive Summary View
window.ExecutiveSummaryView = {
    render: function(analysis) {
        const portnox = analysis.vendors.find(v => v.id === 'portnox');
        const competitors = analysis.vendors.filter(v => v.id !== 'portnox');
        const bestCompetitor = competitors.sort((a, b) => a.tco.total - b.tco.total)[0];
        
        return `
            <div class="executive-summary-view">
                <div class="executive-header">
                    <h2>Executive Summary</h2>
                    <p>Comprehensive TCO, ROI, and Strategic Analysis</p>
                </div>
                
                <!-- Key Metrics -->
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="icon-circle icon-teal">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="metric-content">
                            <h4>Total Savings with Portnox</h4>
                            <div class="metric-value">$${((bestCompetitor.tco.total - portnox.tco.total) / 1000).toFixed(0)}K</div>
                            <p>${((bestCompetitor.tco.total - portnox.tco.total) / bestCompetitor.tco.total * 100).toFixed(0)}% reduction vs ${bestCompetitor.name}</p>
                        </div>
                    </div>
                    
                    <div class="metric-card">
                        <div class="icon-circle icon-purple">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="metric-content">
                            <h4>ROI Timeline</h4>
                            <div class="metric-value">${analysis.roiMonths} months</div>
                            <p>Time to positive ROI</p>
                        </div>
                    </div>
                    
                    <div class="metric-card">
                        <div class="icon-circle icon-teal">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="metric-content">
                            <h4>FTE Reduction</h4>
                            <div class="metric-value">${(bestCompetitor.fte - portnox.fte).toFixed(1)} FTE</div>
                            <p>Operational efficiency gain</p>
                        </div>
                    </div>
                    
                    <div class="metric-card">
                        <div class="icon-circle icon-purple">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="metric-content">
                            <h4>Deployment Speed</h4>
                            <div class="metric-value">${portnox.deploymentDays} days</div>
                            <p>vs ${bestCompetitor.deploymentDays} days average</p>
                        </div>
                    </div>
                </div>
                
                <!-- Comprehensive Charts -->
                <div class="charts-grid">
                    <div class="chart-container">
                        <h3>3-Year TCO Comparison</h3>
                        <div id="tco-comparison-chart" style="height: 400px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>ROI Timeline Analysis</h3>
                        <div id="roi-timeline-chart" style="height: 400px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Feature Comparison Matrix</h3>
                        <div id="feature-matrix-chart" style="height: 400px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Licensing & Add-ons Breakdown</h3>
                        <div id="licensing-breakdown-chart" style="height: 400px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>FTE Requirements Analysis</h3>
                        <div id="fte-analysis-chart" style="height: 400px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Hidden Costs Exposure</h3>
                        <div id="hidden-costs-chart" style="height: 400px;"></div>
                    </div>
                </div>
                
                <!-- Key Advantages -->
                <div class="advantages-section">
                    <h3>Portnox CLEAR Key Advantages</h3>
                    <div class="advantages-grid">
                        <div class="advantage-card">
                            <i class="fas fa-cloud icon-teal"></i>
                            <h4>100% Cloud Native</h4>
                            <p>Zero infrastructure requirements, instant deployment</p>
                        </div>
                        <div class="advantage-card">
                            <i class="fas fa-infinity icon-purple"></i>
                            <h4>All-Inclusive Licensing</h4>
                            <p>No hidden fees, add-ons, or module costs</p>
                        </div>
                        <div class="advantage-card">
                            <i class="fas fa-robot icon-teal"></i>
                            <h4>95% Automation</h4>
                            <p>Minimal FTE requirements, self-healing</p>
                        </div>
                        <div class="advantage-card">
                            <i class="fas fa-shield-check icon-purple"></i>
                            <h4>Built-in Zero Trust</h4>
                            <p>Native zero trust architecture included</p>
                        </div>
                    </div>
                </div>
                
                <!-- Strategic Recommendations -->
                <div class="recommendations-section">
                    <h3>Strategic Recommendations</h3>
                    <ol class="recommendations-list">
                        <li><strong>Immediate Migration:</strong> Begin Portnox CLEAR deployment to realize ${((bestCompetitor.tco.total - portnox.tco.total) / 1000).toFixed(0)}K in savings</li>
                        <li><strong>Sunset Legacy Infrastructure:</strong> Eliminate ${bestCompetitor.infrastructure || 0} infrastructure components</li>
                        <li><strong>Redeploy IT Resources:</strong> Reallocate ${(bestCompetitor.fte - portnox.fte).toFixed(1)} FTE to strategic initiatives</li>
                        <li><strong>Enhance Security Posture:</strong> Leverage built-in Zero Trust capabilities</li>
                        <li><strong>Accelerate Compliance:</strong> Utilize automated compliance reporting</li>
                    </ol>
                </div>
            </div>
        `;
    },
    
    renderCharts: function(analysis) {
        // Render all executive charts
        this.renderTCOComparison(analysis);
        this.renderROITimeline(analysis);
        this.renderFeatureMatrix(analysis);
        this.renderLicensingBreakdown(analysis);
        this.renderFTEAnalysis(analysis);
        this.renderHiddenCosts(analysis);
    },
    
    renderTCOComparison: function(analysis) {
        const chartData = analysis.vendors.map(v => ({
            name: v.name,
            data: [
                v.tco.software || 0,
                v.tco.infrastructure || 0,
                v.tco.services || 0,
                v.tco.operations || 0,
                v.tco.hidden || 0
            ]
        }));
        
        Highcharts.chart('tco-comparison-chart', {
            chart: { type: 'column' },
            title: { text: '' },
            xAxis: { categories: ['Software', 'Infrastructure', 'Services', 'Operations', 'Hidden Costs'] },
            yAxis: { title: { text: 'Cost (USD)' } },
            plotOptions: { column: { stacking: 'normal' } },
            series: chartData
        });
    },
    
    renderROITimeline: function(analysis) {
        // ROI timeline implementation
    },
    
    renderFeatureMatrix: function(analysis) {
        // Feature comparison matrix
    },
    
    renderLicensingBreakdown: function(analysis) {
        // Licensing breakdown chart
    },
    
    renderFTEAnalysis: function(analysis) {
        // FTE analysis chart
    },
    
    renderHiddenCosts: function(analysis) {
        // Hidden costs chart
    }
};

console.log('✅ Executive Summary View loaded');
