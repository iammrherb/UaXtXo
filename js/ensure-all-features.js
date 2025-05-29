// Ensure All Features Work
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Ensuring all features are working...");
    
    // Ensure all tabs work
    if (window.dashboard) {
        // Make sure all tab methods exist
        const tabMethods = {
            'overview': 'renderOverview',
            'financial': 'renderFinancialAnalysis',
            'vendors': 'renderVendorComparison',
            'industries': 'renderIndustriesCompliance',
            'risk': 'renderRiskAnalysis',
            'insights': 'renderAIInsights'
        };
        
        for (const [tab, method] of Object.entries(tabMethods)) {
            if (!window.dashboard[method]) {
                console.warn(`Missing method ${method} for tab ${tab}`);
            }
        }
        
        // Ensure vendor comparison works
        if (!window.dashboard.renderVendorComparison) {
            window.dashboard.renderVendorComparison = function(container) {
                container.innerHTML = `
                    <div class="vendor-comparison-container">
                        <h2>Comprehensive Vendor Comparison</h2>
                        <div class="comparison-controls">
                            <button onclick="dashboard.updateComparisonView('capabilities')">Capabilities</button>
                            <button onclick="dashboard.updateComparisonView('tco')">Total Cost</button>
                            <button onclick="dashboard.updateComparisonView('deployment')">Deployment</button>
                        </div>
                        <div id="vendor-comparison-chart" style="height: 500px;"></div>
                    </div>
                `;
                if (window.dashboard.updateComparisonView) {
                    window.dashboard.updateComparisonView('tco');
                }
            };
        }
        
        // Ensure risk assessment works
        if (!window.dashboard.renderRiskAnalysis) {
            window.dashboard.renderRiskAnalysis = function(container) {
                if (window.comprehensiveRiskAssessment) {
                    window.comprehensiveRiskAssessment.render(container);
                } else {
                    container.innerHTML = '<p>Risk assessment module loading...</p>';
                }
            };
        }
    }
});
