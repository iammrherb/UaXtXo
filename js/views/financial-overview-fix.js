/**
 * Financial Overview Fix - Ensures containers are created
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('💰 Applying financial overview fixes...');
    
    const applyFix = () => {
        if (!window.platform) {
            setTimeout(applyFix, 100);
            return;
        }
        
        // Store original render method
        const originalRenderFinancial = window.platform.renderFinancialOverview;
        
        // Override with container-ensuring version
        window.platform.renderFinancialOverview = function(container) {
            if (!container) {
                console.error('No container provided to renderFinancialOverview');
                return;
            }
            
            console.log('📊 Rendering financial overview with container checks...');
            
            // Ensure we have calculation results
            if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                container.innerHTML = `
                    <div class="financial-overview">
                        <div class="no-data" style="padding: 40px; text-align: center; color: #94A3B8;">
                            <h3>Calculating financial analysis...</h3>
                            <p>Please wait while we process the data.</p>
                        </div>
                    </div>
                `;
                
                // Try to calculate if not already doing so
                if (!this.isCalculating) {
                    console.log('🔄 Triggering calculation from financial view...');
                    this.calculate();
                }
                return;
            }
            
            // Create the full financial overview HTML
            const portnoxResult = this.calculationResults.portnox;
            if (!portnoxResult) {
                console.error('No Portnox result found');
                return;
            }
            
            container.innerHTML = `
                <div class="financial-overview">
                    <!-- Executive Summary -->
                    <div class="executive-summary-card">
                        <h2>Executive Financial Summary</h2>
                        <div class="summary-grid">
                            <div class="summary-item highlight">
                                <h3>Total Savings</h3>
                                <div class="value">$${Math.round((portnoxResult.year3?.roi?.dollarValue || 0) / 1000)}K</div>
                                <p>3-year advantage</p>
                            </div>
                            <div class="summary-item">
                                <h3>Payback Period</h3>
                                <div class="value">${portnoxResult.year3?.roi?.paybackMonths || 12} months</div>
                                <p>Time to ROI</p>
                            </div>
                            <div class="summary-item">
                                <h3>3-Year ROI</h3>
                                <div class="value">${portnoxResult.year3?.roi?.percentage || 0}%</div>
                                <p>Return on investment</p>
                            </div>
                            <div class="summary-item">
                                <h3>Per Device Cost</h3>
                                <div class="value">$${Math.round((portnoxResult.year3?.tco?.perDevice || 0) / 36)}/mo</div>
                                <p>All-inclusive</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- TCO Comparison Chart -->
                    <div class="chart-section">
                        <h3>Total Cost of Ownership Comparison</h3>
                        <div class="chart-grid">
                            <div class="chart-container">
                                <h4>3-Year TCO by Vendor</h4>
                                <div id="tco-comparison-chart" class="chart-placeholder" style="height: 400px; background: #334155; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                    <span style="color: #94A3B8;">Loading chart...</span>
                                </div>
                            </div>
                            <div class="chart-container">
                                <h4>ROI Timeline</h4>
                                <div id="roi-timeline-chart" class="chart-placeholder" style="height: 400px; background: #334155; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                    <span style="color: #94A3B8;">Loading chart...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Cost Breakdown -->
                    <div class="cost-breakdown-section">
                        <h3>Detailed Cost Breakdown</h3>
                        <div class="cost-breakdown-grid">
                            ${this.renderCostBreakdown ? this.renderCostBreakdown() : ''}
                        </div>
                    </div>
                    
                    <!-- Recommendations -->
                    <div class="recommendations-section">
                        <h3>Financial Recommendations</h3>
                        <div class="recommendation-cards">
                            ${this.renderFinancialRecommendations ? this.renderFinancialRecommendations() : ''}
                        </div>
                    </div>
                </div>
            `;
            
            // Now render charts after ensuring containers exist
            setTimeout(() => {
                console.log('🎯 Containers should now exist, rendering charts...');
                
                // Check if Highcharts is available
                if (typeof Highcharts === 'undefined') {
                    console.error('❌ Highcharts still not available!');
                    document.querySelectorAll('.chart-placeholder').forEach(el => {
                        el.innerHTML = '<span style="color: #EF4444;">Error: Highcharts not loaded</span>';
                    });
                    return;
                }
                
                // Check containers exist
                const tcoContainer = document.getElementById('tco-comparison-chart');
                const roiContainer = document.getElementById('roi-timeline-chart');
                
                if (tcoContainer) {
                    console.log('✅ TCO container found');
                    if (this.renderTCOComparison) {
                        this.renderTCOComparison();
                    }
                } else {
                    console.error('❌ TCO container still missing!');
                }
                
                if (roiContainer) {
                    console.log('✅ ROI container found');
                    if (this.renderROITimeline) {
                        this.renderROITimeline();
                    }
                } else {
                    console.error('❌ ROI container still missing!');
                }
            }, 300);
        };
        
        console.log('✅ Financial overview fix applied');
        
        // If we're already on financial overview, re-render
        if (window.platform.activeTab === 'financial-overview') {
            const content = document.getElementById('analysis-content');
            if (content) {
                console.log('🔄 Re-rendering financial overview...');
                window.platform.renderFinancialOverview(content);
            }
        }
    };
    
    applyFix();
});
