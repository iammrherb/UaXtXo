// Update main platform to use enhanced financial overview

if (window.PremiumExecutivePlatform) {
    // Override renderFinancialOverview method
    PremiumExecutivePlatform.prototype.renderFinancialOverview = function(container) {
        if (!container) return;
        
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            container.innerHTML = '<div class="no-data">Calculating financial analysis...</div>';
            return;
        }
        
        // Use enhanced financial overview
        if (window.financialOverview) {
            window.financialOverview.render(container, this.calculationResults);
        } else {
            console.error('Enhanced financial overview not loaded');
            // Fallback to basic view
            container.innerHTML = '<div class="no-data">Loading enhanced financial view...</div>';
        }
    };
}
