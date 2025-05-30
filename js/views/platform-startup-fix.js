/**
 * Platform Startup Fix - Ensures proper initialization
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Platform startup fix initializing...');
    
    let initAttempts = 0;
    const maxAttempts = 10;
    
    function ensurePlatformReady() {
        initAttempts++;
        
        if (!window.platform) {
            if (initAttempts < maxAttempts) {
                setTimeout(ensurePlatformReady, 500);
            }
            return;
        }
        
        console.log('✅ Platform found, ensuring initialization...');
        
        // Override the init method to ensure calculation
        const originalInit = window.platform.init;
        window.platform.init = function() {
            console.log('🎯 Enhanced platform init running...');
            
            // Call original init
            if (originalInit) {
                originalInit.call(this);
            }
            
            // Ensure calculation happens after DOM is ready
            setTimeout(() => {
                if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                    console.log('📊 No calculation results on init, calculating...');
                    this.calculate();
                } else {
                    console.log('✅ Calculation results already exist');
                }
                
                // Ensure we're on financial overview
                if (this.activeTab !== 'financial-overview') {
                    console.log('📊 Switching to financial overview on startup...');
                    this.switchTab('financial-overview');
                }
            }, 1000);
        };
        
        // If platform is already initialized, ensure it has calculations
        if (window.platform.vendorDatabase && !window.platform.calculationResults) {
            console.log('🔄 Platform initialized but no calculations, fixing...');
            window.platform.calculate();
        }
    }
    
    ensurePlatformReady();
});

// Also fix the renderFinancialOverview method
window.addEventListener('DOMContentLoaded', function() {
    const fixFinancialRender = () => {
        if (!window.platform) {
            setTimeout(fixFinancialRender, 100);
            return;
        }
        
        // Store original method
        const originalRender = window.platform.renderFinancialOverview;
        
        window.platform.renderFinancialOverview = function(container) {
            console.log('📊 Enhanced financial overview render...');
            
            if (!container) {
                console.error('No container provided');
                return;
            }
            
            // Check if we have results
            if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                console.log('📊 No results in financial render, showing loading state...');
                
                container.innerHTML = `
                    <div class="financial-overview">
                        <div style="padding: 60px; text-align: center;">
                            <div style="display: inline-block; position: relative;">
                                <div style="width: 50px; height: 50px; border: 3px solid #334155; border-top-color: #00D4AA; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                            </div>
                            <h2 style="color: #CBD5E1; margin-top: 20px;">Calculating Financial Analysis...</h2>
                            <p style="color: #94A3B8;">This will take just a moment.</p>
                        </div>
                    </div>
                    <style>
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    </style>
                `;
                
                // Trigger calculation if not already running
                if (!this.isCalculating) {
                    console.log('🔄 Triggering calculation from financial view...');
                    this.calculate();
                    
                    // Re-render when calculation completes
                    setTimeout(() => {
                        if (this.activeTab === 'financial-overview' && this.calculationResults) {
                            this.renderFinancialOverview(container);
                        }
                    }, 1500);
                }
                return;
            }
            
            // We have results, render normally
            if (originalRender) {
                originalRender.call(this, container);
            } else {
                // Fallback render
                console.log('📊 Using fallback financial render...');
                this.renderFinancialOverviewFallback(container);
            }
        };
        
        // Add fallback render method
        window.platform.renderFinancialOverviewFallback = function(container) {
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
                    
                    <!-- TCO Comparison Chart -->
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
                    
                    <!-- Recommendations -->
                    <div class="recommendations-section">
                        <h3>Financial Recommendations</h3>
                        <div class="recommendation-cards">
                            ${this.renderFinancialRecommendations ? this.renderFinancialRecommendations() : ''}
                        </div>
                    </div>
                </div>
            `;
            
            // Render charts after DOM update
            setTimeout(() => {
                if (this.renderTCOComparison) this.renderTCOComparison();
                if (this.renderROITimeline) this.renderROITimeline();
            }, 100);
        };
        
        console.log('✅ Financial overview render enhanced');
    };
    
    fixFinancialRender();
});
