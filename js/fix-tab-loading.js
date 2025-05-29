/**
 * Fix all tab loading issues
 */

// Override tab switching to ensure proper loading
if (window.dashboard) {
    const originalRender = window.dashboard.render;
    
    window.dashboard.render = function() {
        const content = document.getElementById('tab-content');
        if (!content) return;
        
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
                if (window.industriesComplianceTab) {
                    window.industriesComplianceTab.render(content);
                } else {
                    content.innerHTML = '<p>Loading Industries & Compliance...</p>';
                }
                break;
                
            case 'risk':
                this.renderRiskAnalysis(content);
                break;
                
            case 'insights':
                if (window.aiInsightsEngine) {
                    window.aiInsightsEngine.render(content);
                } else {
                    content.innerHTML = '<p>Loading AI Insights...</p>';
                }
                break;
        }
    };
    
    // Implement Vendor Comparison tab
    window.dashboard.renderVendorComparison = function(container) {
        const vendors = Object.values(this.vendorData || {});
        
        container.innerHTML = `
            <div class="vendor-comparison-container">
                <div class="comparison-header">
                    <h2>Comprehensive Vendor Comparison</h2>
                    <div class="comparison-controls">
                        <button class="control-btn" onclick="dashboard.exportVendorComparison()">
                            <i class="fas fa-download"></i> Export Comparison
                        </button>
                    </div>
                </div>
                
                <div class="comparison-grid">
                    <div class="chart-container">
                        <h3>Total Cost of Ownership Comparison</h3>
                        <div id="vendor-tco-comparison" style="height: 400px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Feature Comparison Matrix</h3>
                        <div id="vendor-feature-matrix" style="height: 400px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Implementation Timeline</h3>
                        <div id="vendor-timeline-chart" style="height: 350px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Security & Compliance Scores</h3>
                        <div id="vendor-security-chart" style="height: 350px;"></div>
                    </div>
                </div>
                
                <div class="vendor-details-table">
                    <h3>Detailed Vendor Comparison</h3>
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Vendor</th>
                                <th>3-Year TCO</th>
                                <th>Monthly Cost</th>
                                <th>Deploy Time</th>
                                <th>FTE Required</th>
                                <th>Security Score</th>
                                <th>Cloud Native</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${vendors.slice(0, 10).map(v => `
                                <tr class="${v.key === 'portnox' ? 'highlight-row' : ''}">
                                    <td><strong>${v.name}</strong></td>
                                    <td>$${(v.tco.tco / 1000).toFixed(0)}K</td>
                                    <td>$${(v.tco.monthly / 1000).toFixed(1)}K</td>
                                    <td>${v.metrics.implementationDays} days</td>
                                    <td>${v.metrics.fteRequired}</td>
                                    <td>${v.metrics.securityScore}/100</td>
                                    <td>${v.metrics.cloudNative ? '✅' : '❌'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        // Render comparison charts
        setTimeout(() => {
            this.renderVendorTCOComparison();
            this.renderVendorFeatureMatrix();
            this.renderVendorTimeline();
            this.renderVendorSecurity();
        }, 100);
    };
    
    // Implement Risk Analysis tab
    window.dashboard.renderRiskAnalysis = function(container) {
        container.innerHTML = `
            <div class="risk-analysis-container">
                <div class="risk-header">
                    <h2>Risk & Security Analysis</h2>
                    <p>Comprehensive security posture and risk assessment</p>
                </div>
                
                <div class="risk-summary-cards">
                    <div class="risk-card high-priority">
                        <i class="fas fa-shield-alt"></i>
                        <h3>Security Score</h3>
                        <div class="risk-value">94/100</div>
                        <p>Industry-leading protection</p>
                    </div>
                    
                    <div class="risk-card">
                        <i class="fas fa-percentage"></i>
                        <h3>Risk Reduction</h3>
                        <div class="risk-value">30%</div>
                        <p>Breach probability decrease</p>
                    </div>
                    
                    <div class="risk-card">
                        <i class="fas fa-dollar-sign"></i>
                        <h3>Potential Savings</h3>
                        <div class="risk-value">$1.3M</div>
                        <p>Avoided breach costs</p>
                    </div>
                    
                    <div class="risk-card">
                        <i class="fas fa-clock"></i>
                        <h3>MTTR Improvement</h3>
                        <div class="risk-value">78%</div>
                        <p>Faster incident response</p>
                    </div>
                </div>
                
                <div class="risk-charts-grid">
                    <div class="chart-container">
                        <h3>Risk Assessment Matrix</h3>
                        <div id="risk-matrix-chart" style="height: 400px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Threat Coverage Analysis</h3>
                        <div id="threat-coverage-chart" style="height: 400px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Breach Cost Impact</h3>
                        <div id="breach-cost-analysis-chart" style="height: 350px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Security Maturity Timeline</h3>
                        <div id="security-maturity-chart" style="height: 350px;"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Render risk charts
        setTimeout(() => {
            if (window.riskAssessmentCharts) {
                window.riskAssessmentCharts.renderRiskMatrix('risk-matrix-chart');
                window.riskAssessmentCharts.renderThreatCoverage('threat-coverage-chart');
                window.riskAssessmentCharts.renderBreachCostAnalysis('breach-cost-analysis-chart');
            }
        }, 100);
    };
}

// Add vendor comparison chart methods
window.dashboard.renderVendorTCOComparison = function() {
    const vendors = Object.values(this.vendorData || {}).slice(0, 8);
    
    Highcharts.chart('vendor-tco-comparison', {
        chart: { type: 'column' },
        title: { text: null },
        xAxis: { 
            categories: vendors.map(v => v.name),
            labels: { rotation: -45 }
        },
        yAxis: {
            title: { text: 'Total Cost ($)' },
            labels: {
                formatter: function() {
                    return '$' + (this.value / 1000) + 'K';
                }
            }
        },
        series: [{
            name: '3-Year TCO',
            data: vendors.map(v => ({
                y: v.tco.tco,
                color: v.key === 'portnox' ? '#10b981' : '#6b7280'
            }))
        }],
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return '$' + (this.y / 1000).toFixed(0) + 'K';
                    }
                }
            }
        }
    });
};

console.log('✅ Tab loading fixes applied');
