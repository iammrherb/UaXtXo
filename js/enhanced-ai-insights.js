// Enhanced AI Insights
console.log("🤖 Loading enhanced AI insights...");

// Override the AI insights render method
document.addEventListener('DOMContentLoaded', function() {
    if (window.aiInsightsEngine) {
        const originalRender = window.aiInsightsEngine.render;
        
        window.aiInsightsEngine.render = function(container) {
            const vendorData = window.dashboard?.vendorData;
            if (!vendorData) {
                container.innerHTML = '<p>Loading AI insights...</p>';
                return;
            }
            
            const portnox = vendorData.portnox;
            const competitors = Object.values(vendorData).filter(v => v.key !== 'portnox');
            
            if (!portnox || competitors.length === 0) {
                container.innerHTML = '<p>Calculating insights...</p>';
                return;
            }
            
            // Calculate key metrics
            const avgCompetitorTCO = competitors.reduce((sum, v) => sum + v.tco.total, 0) / competitors.length;
            const savings = avgCompetitorTCO - portnox.tco.total;
            const savingsPercent = Math.round((savings / avgCompetitorTCO) * 100);
            
            container.innerHTML = `
                <div class="ai-insights-container">
                    <div class="ai-header">
                        <h2><i class="fas fa-brain"></i> AI-Powered Strategic Intelligence</h2>
                        <p>Advanced analysis revealing transformative opportunities</p>
                    </div>
                    
                    <div class="executive-summary-card">
                        <h3>Executive Summary</h3>
                        <div class="summary-metrics">
                            <div class="metric-item">
                                <span class="metric-value">${savingsPercent}%</span>
                                <span class="metric-label">Cost Reduction</span>
                            </div>
                            <div class="metric-item">
                                <span class="metric-value">$${(savings/1000).toFixed(0)}K</span>
                                <span class="metric-label">3-Year Savings</span>
                            </div>
                            <div class="metric-item">
                                <span class="metric-value">${portnox.roi.paybackMonths}mo</span>
                                <span class="metric-label">Payback Period</span>
                            </div>
                            <div class="metric-item">
                                <span class="metric-value">${portnox.roi.roi}%</span>
                                <span class="metric-label">ROI</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ai-insights-grid">
                        <div class="insight-card critical">
                            <div class="insight-icon">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <h3>Financial Transformation</h3>
                            <p>Portnox delivers <strong>${savingsPercent}% lower TCO</strong> than the market average, saving <strong>$${(savings/1000).toFixed(0)}K</strong> over 3 years. This represents a fundamental shift from CapEx to OpEx model.</p>
                            <div class="insight-details">
                                <ul>
                                    <li>Monthly savings: $${Math.round(savings/36).toLocaleString()}</li>
                                    <li>5-year projection: $${Math.round(savings*5/3/1000)}K</li>
                                    <li>Budget reallocation opportunity</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="insight-card high">
                            <div class="insight-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <h3>Security Excellence</h3>
                            <p>Achieve <strong>${portnox.metrics.securityScore}/100</strong> security score with advanced Zero Trust capabilities, reducing breach risk by <strong>${portnox.risk.breachReduction}%</strong>.</p>
                            <div class="insight-details">
                                <ul>
                                    <li>Automated threat response</li>
                                    <li>Real-time device profiling</li>
                                    <li>AI-powered anomaly detection</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="insight-card high">
                            <div class="insight-icon">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <h3>Operational Velocity</h3>
                            <p>Deploy in just <strong>${portnox.metrics.implementationDays} days</strong> vs. industry average of 75 days. Reduce IT overhead by <strong>${((2.0 - portnox.metrics.fteRequired)/2.0*100).toFixed(0)}%</strong>.</p>
                            <div class="insight-details">
                                <ul>
                                    <li>Cloud-native architecture</li>
                                    <li>No infrastructure required</li>
                                    <li>Automated operations</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="insight-card medium">
                            <div class="insight-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <h3>Strategic Positioning</h3>
                            <p>Position your organization as a digital leader with <strong>100% cloud-native</strong> NAC, enabling unlimited scalability and continuous innovation.</p>
                            <div class="insight-details">
                                <ul>
                                    <li>Future-proof architecture</li>
                                    <li>API-first integration</li>
                                    <li>Continuous feature updates</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="recommendations-section">
                        <h3>Strategic Recommendations</h3>
                        <div class="recommendations-timeline">
                            <div class="recommendation-item">
                                <div class="step">1</div>
                                <div class="content">
                                    <h4>Immediate Action (0-30 days)</h4>
                                    <p>Approve Portnox implementation to start realizing $${Math.round(savings/36)}K monthly savings immediately.</p>
                                </div>
                            </div>
                            <div class="recommendation-item">
                                <div class="step">2</div>
                                <div class="content">
                                    <h4>Pilot Phase (30-60 days)</h4>
                                    <p>Deploy to 10% of devices to validate ROI and build internal champions.</p>
                                </div>
                            </div>
                            <div class="recommendation-item">
                                <div class="step">3</div>
                                <div class="content">
                                    <h4>Full Rollout (60-120 days)</h4>
                                    <p>Complete organization-wide deployment with phased approach.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ai-actions">
                        <button class="action-btn primary" onclick="window.comprehensiveReportGenerator?.generateExecutiveReport({})">
                            <i class="fas fa-file-pdf"></i> Generate Executive Report
                        </button>
                        <button class="action-btn secondary" onclick="window.open('https://portnox.com/demo', '_blank')">
                            <i class="fas fa-calendar"></i> Schedule Demo
                        </button>
                    </div>
                </div>
            `;
        };
        
        // Re-render if on AI insights tab
        if (window.dashboard?.currentTab === 'insights') {
            window.dashboard.render();
        }
    }
});
