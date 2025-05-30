/**
 * Simple Financial Render - No loops, just works
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('💰 Simple financial render loading...');
    
    let renderCount = 0;
    const maxRenders = 3;
    
    const setupRender = () => {
        if (!window.platform) {
            setTimeout(setupRender, 100);
            return;
        }
        
        // Override renderFinancialOverview with simple version
        window.platform.renderFinancialOverview = function(container) {
            renderCount++;
            
            if (renderCount > maxRenders) {
                console.log('🛑 Max render attempts reached');
                return;
            }
            
            console.log(`📊 Financial render attempt ${renderCount}`);
            
            if (!container) return;
            
            // Check for results
            if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                container.innerHTML = `
                    <div class="financial-overview">
                        <div style="text-align: center; padding: 60px;">
                            <h2 style="color: #CBD5E1;">Initializing Financial Analysis...</h2>
                            <p style="color: #94A3B8;">Calculating TCO/ROI data...</p>
                        </div>
                    </div>
                `;
                
                // Trigger ONE calculation
                if (!this._calculationTriggered) {
                    this._calculationTriggered = true;
                    console.log('🔄 Triggering single calculation...');
                    this.calculate();
                }
                return;
            }
            
            // Render the financial overview
            const portnoxResult = this.calculationResults.portnox;
            if (!portnoxResult) return;
            
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
                    
                    <!-- Chart Section -->
                    <div class="chart-section">
                        <h3>Total Cost of Ownership Comparison</h3>
                        <div class="chart-grid">
                            <div class="chart-container">
                                <h4>3-Year TCO by Vendor</h4>
                                <div id="tco-comparison-chart" style="height: 400px;"></div>
                            </div>
                            <div class="chart-container">
                                <h4>ROI Timeline</h4>
                                <div id="roi-timeline-chart" style="height: 400px;"></div>
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
                </div>
            `;
            
            // Render charts once
            setTimeout(() => {
                if (this.renderTCOComparison) this.renderTCOComparison();
                if (this.renderROITimeline) this.renderROITimeline();
            }, 100);
        };
        
        console.log('✅ Simple financial render ready');
    };
    
    setupRender();
});
