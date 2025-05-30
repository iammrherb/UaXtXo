/**
 * Force Financial Render - Ensures financial overview renders properly
 */

window.ForceFinancialRender = {
    render() {
        console.log('💪 Force rendering financial overview...');
        
        const content = document.getElementById('analysis-content');
        if (!content) {
            console.error('No analysis-content container');
            return;
        }
        
        // Check for results
        if (!window.platform?.calculationResults?.portnox) {
            console.log('⏳ Waiting for calculation results...');
            
            content.innerHTML = `
                <div class="financial-overview">
                    <div style="text-align: center; padding: 60px;">
                        <div class="spinner" style="display: inline-block; width: 50px; height: 50px; 
                             border: 3px solid #334155; border-top-color: #00D4AA; 
                             border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        <h2 style="color: #CBD5E1; margin-top: 20px;">Calculating Financial Analysis...</h2>
                        <p style="color: #94A3B8;">Please wait...</p>
                    </div>
                </div>
                <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
            `;
            
            // Try again in a moment
            setTimeout(() => this.render(), 1000);
            return;
        }
        
        const portnoxResult = window.platform.calculationResults.portnox;
        
        // Create complete financial overview
        content.innerHTML = `
            <div class="financial-overview" id="financial-overview-root">
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
                            <div id="tco-comparison-chart" style="height: 400px; background: #334155; border-radius: 8px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>ROI Timeline</h4>
                            <div id="roi-timeline-chart" style="height: 400px; background: #334155; border-radius: 8px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Cost Breakdown -->
                <div class="cost-breakdown-section">
                    <h3>Detailed Cost Breakdown</h3>
                    <div class="cost-breakdown-grid">
                        ${this.renderCostBreakdown()}
                    </div>
                </div>
                
                <!-- Recommendations -->
                <div class="recommendations-section">
                    <h3>Financial Recommendations</h3>
                    <div class="recommendation-cards">
                        ${this.renderRecommendations()}
                    </div>
                </div>
            </div>
        `;
        
        console.log('✅ Financial HTML created, rendering charts...');
        
        // Render charts after a brief delay
        setTimeout(() => {
            this.renderCharts();
        }, 100);
    },
    
    renderCostBreakdown() {
        if (!window.platform?.calculationResults) return '<p>Loading...</p>';
        
        return Object.entries(window.platform.calculationResults).map(([key, result]) => {
            const breakdown = result.year3?.tco?.breakdown || {};
            const total = result.year3?.tco?.total || 0;
            
            return `
                <div class="cost-breakdown-card ${key === 'portnox' ? 'portnox-highlight' : ''}">
                    <h4>${result.vendor?.name || key}</h4>
                    <div class="cost-categories">
                        <div class="cost-category">
                            <span class="label">Software</span>
                            <span class="value">$${Math.round((breakdown.software || 0) / 1000)}K</span>
                        </div>
                        <div class="cost-category">
                            <span class="label">Implementation</span>
                            <span class="value">$${Math.round((breakdown.implementation || 0) / 1000)}K</span>
                        </div>
                        <div class="cost-category">
                            <span class="label">Operations</span>
                            <span class="value">$${Math.round((breakdown.personnel || 0) / 1000)}K</span>
                        </div>
                    </div>
                    <div class="total-cost">
                        <strong>Total: $${Math.round(total / 1000)}K</strong>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    renderRecommendations() {
        const portnox = window.platform?.calculationResults?.portnox;
        if (!portnox) return '<p>Loading...</p>';
        
        const savings = Math.round((portnox.year3?.roi?.dollarValue || 0) / 1000);
        
        return `
            <div class="recommendation-card">
                <i class="fas fa-rocket"></i>
                <h4>Immediate Implementation</h4>
                <p>Deploy Portnox to start saving $${Math.round(savings / 36)}K monthly</p>
            </div>
            <div class="recommendation-card">
                <i class="fas fa-piggy-bank"></i>
                <h4>Budget Optimization</h4>
                <p>Reallocate ${savings}K in savings to strategic initiatives</p>
            </div>
            <div class="recommendation-card">
                <i class="fas fa-shield-alt"></i>
                <h4>Risk Reduction</h4>
                <p>Lower breach risk by 50% with Zero Trust architecture</p>
            </div>
        `;
    },
    
    renderCharts() {
        const tcoContainer = document.getElementById('tco-comparison-chart');
        const roiContainer = document.getElementById('roi-timeline-chart');
        
        if (!tcoContainer || !roiContainer) {
            console.error('Chart containers not found!');
            return;
        }
        
        console.log('📊 Rendering charts...');
        
        // Clear containers
        tcoContainer.innerHTML = '';
        roiContainer.innerHTML = '';
        
        // Render TCO Chart
        const results = window.platform.calculationResults;
        const categories = [];
        const data = [];
        
        Object.entries(results).forEach(([key, result]) => {
            if (result?.vendor?.name && result?.year3?.tco?.total) {
                categories.push(result.vendor.name);
                data.push({
                    y: result.year3.tco.total,
                    color: key === 'portnox' ? '#00D4AA' : '#94A3B8'
                });
            }
        });
        
        if (categories.length > 0 && window.Highcharts) {
            Highcharts.chart(tcoContainer, {
                chart: { type: 'column', backgroundColor: '#334155' },
                title: { text: null },
                xAxis: { categories: categories, labels: { style: { color: '#CBD5E1' } } },
                yAxis: {
                    title: { text: 'Total Cost ($)', style: { color: '#CBD5E1' } },
                    labels: {
                        formatter: function() { return '$' + Math.round(this.value/1000) + 'K'; },
                        style: { color: '#CBD5E1' }
                    }
                },
                plotOptions: {
                    column: {
                        borderRadius: 8,
                        dataLabels: {
                            enabled: true,
                            formatter: function() { return '$' + Math.round(this.y/1000) + 'K'; },
                            style: { color: '#FFFFFF', textOutline: '2px #334155' }
                        }
                    }
                },
                series: [{ name: '3-Year TCO', data: data }],
                credits: { enabled: false }
            });
            
            console.log('✅ TCO chart rendered');
        }
        
        // Render ROI Timeline
        const series = [];
        
        Object.entries(results).forEach(([key, result]) => {
            if (result?.vendor?.name) {
                const monthlyData = [];
                const implementation = result.year1?.tco?.breakdown?.implementation || 0;
                const monthlyBenefit = (result.year3?.roi?.dollarValue || 0) / 36;
                
                let cumulative = -implementation;
                for (let month = 0; month <= 36; month++) {
                    if (month > 0) cumulative += monthlyBenefit;
                    monthlyData.push([month, Math.round(cumulative)]);
                }
                
                series.push({
                    name: result.vendor.name,
                    data: monthlyData,
                    color: key === 'portnox' ? '#00D4AA' : null
                });
            }
        });
        
        if (series.length > 0 && window.Highcharts) {
            Highcharts.chart(roiContainer, {
                chart: { type: 'line', backgroundColor: '#334155' },
                title: { text: null },
                xAxis: {
                    title: { text: 'Months', style: { color: '#CBD5E1' } },
                    labels: { style: { color: '#CBD5E1' } }
                },
                yAxis: {
                    title: { text: 'Cumulative Value ($)', style: { color: '#CBD5E1' } },
                    labels: {
                        formatter: function() { return '$' + Math.round(this.value/1000) + 'K'; },
                        style: { color: '#CBD5E1' }
                    },
                    plotLines: [{
                        value: 0,
                        width: 2,
                        color: '#94A3B8',
                        dashStyle: 'dash'
                    }]
                },
                series: series,
                legend: { itemStyle: { color: '#CBD5E1' } },
                credits: { enabled: false }
            });
            
            console.log('✅ ROI timeline rendered');
        }
    }
};

// Auto-run when platform is ready
window.addEventListener('DOMContentLoaded', function() {
    const checkAndRender = setInterval(() => {
        if (window.platform && window.platform.activeTab === 'financial-overview') {
            clearInterval(checkAndRender);
            
            // Override the platform's render method
            window.platform.renderFinancialOverview = function(container) {
                window.ForceFinancialRender.render();
            };
            
            console.log('✅ Force financial render ready');
        }
    }, 100);
});
