/**
 * Financial Container Fix - Ensures containers are always created
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('📦 Financial container fix loading...');
    
    const fixContainers = () => {
        if (!window.platform) {
            setTimeout(fixContainers, 100);
            return;
        }
        
        // Override renderFinancialOverview to ALWAYS create containers
        const originalRender = window.platform.renderFinancialOverview;
        
        window.platform.renderFinancialOverview = function(container) {
            console.log('📊 Rendering financial overview with guaranteed containers...');
            
            if (!container) {
                console.error('No container provided');
                return;
            }
            
            // Always clear and recreate
            container.innerHTML = '';
            
            // Check for calculation results
            if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                console.log('⏳ No calculation results yet...');
                container.innerHTML = `
                    <div class="financial-overview">
                        <div class="loading-state" style="text-align: center; padding: 60px;">
                            <div class="spinner" style="display: inline-block; width: 50px; height: 50px; border: 3px solid #334155; border-top-color: #00D4AA; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                            <h2 style="color: #CBD5E1; margin-top: 20px;">Calculating Financial Analysis...</h2>
                            <p style="color: #94A3B8;">This will take just a moment.</p>
                        </div>
                    </div>
                    <style>
                        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                    </style>
                `;
                
                // Trigger calculation if needed
                if (!this.isCalculating) {
                    console.log('🔄 Triggering calculation...');
                    this.calculate();
                }
                
                // Check again in a moment
                setTimeout(() => {
                    if (this.activeTab === 'financial-overview' && this.calculationResults) {
                        this.renderFinancialOverview(container);
                    }
                }, 1000);
                
                return;
            }
            
            // Get results
            const portnoxResult = this.calculationResults.portnox;
            if (!portnoxResult) {
                console.error('No Portnox results found');
                container.innerHTML = '<div class="error">No Portnox results available</div>';
                return;
            }
            
            // CREATE THE FULL HTML WITH CONTAINERS
            const html = `
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
                    
                    <!-- IMPORTANT: Chart containers with proper IDs -->
                    <div class="chart-section">
                        <h3>Total Cost of Ownership Comparison</h3>
                        <div class="chart-grid">
                            <div class="chart-container">
                                <h4>3-Year TCO by Vendor</h4>
                                <div id="tco-comparison-chart" style="height: 400px; background: #334155; border-radius: 8px; position: relative;">
                                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #94A3B8;">Loading chart...</div>
                                </div>
                            </div>
                            <div class="chart-container">
                                <h4>ROI Timeline</h4>
                                <div id="roi-timeline-chart" style="height: 400px; background: #334155; border-radius: 8px; position: relative;">
                                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #94A3B8;">Loading chart...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Cost Breakdown -->
                    <div class="cost-breakdown-section">
                        <h3>Detailed Cost Breakdown</h3>
                        <div class="cost-breakdown-grid">
                            ${this.renderCostBreakdown ? this.renderCostBreakdown() : '<p>Loading cost breakdown...</p>'}
                        </div>
                    </div>
                    
                    <!-- Recommendations -->
                    <div class="recommendations-section">
                        <h3>Financial Recommendations</h3>
                        <div class="recommendation-cards">
                            ${this.renderFinancialRecommendations ? this.renderFinancialRecommendations() : '<p>Loading recommendations...</p>'}
                        </div>
                    </div>
                </div>
            `;
            
            // Set the HTML
            container.innerHTML = html;
            
            // Verify containers exist
            setTimeout(() => {
                const tcoContainer = document.getElementById('tco-comparison-chart');
                const roiContainer = document.getElementById('roi-timeline-chart');
                
                console.log('📦 Container check:');
                console.log('  TCO:', tcoContainer ? '✅ Found' : '❌ Missing');
                console.log('  ROI:', roiContainer ? '✅ Found' : '❌ Missing');
                
                if (tcoContainer && roiContainer) {
                    // Clear loading messages
                    tcoContainer.innerHTML = '';
                    roiContainer.innerHTML = '';
                    
                    // Render charts
                    if (this.renderTCOComparison) {
                        console.log('📊 Rendering TCO chart...');
                        this.renderTCOComparison();
                    }
                    
                    if (this.renderROITimeline) {
                        console.log('📊 Rendering ROI chart...');
                        this.renderROITimeline();
                    }
                    
                    // Mark render complete
                    if (window.InitSequence) {
                        window.InitSequence.markComplete('First Render');
                    }
                } else {
                    console.error('❌ Containers still not found after creation!');
                }
            }, 100);
        };
        
        console.log('✅ Financial container fix applied');
    };
    
    fixContainers();
});
