// FIX ALL TAB LOADING
document.addEventListener('DOMContentLoaded', function() {
    if (window.dashboard) {
        // Ensure all render methods exist
        if (!window.dashboard.renderFinancialAnalysis) {
            window.dashboard.renderFinancialAnalysis = function(container) {
                container.innerHTML = `
                    <div class="tab-content-inner">
                        <h2>Financial Analysis</h2>
                        ${this.selectedVendors.length === 0 ? 
                            '<p>Please select vendors to view financial analysis.</p>' :
                            '<div id="financial-charts"></div>'
                        }
                    </div>
                `;
            };
        }
        
        if (!window.dashboard.renderVendorComparison) {
            window.dashboard.renderVendorComparison = function(container) {
                container.innerHTML = `
                    <div class="tab-content-inner">
                        <h2>Vendor Comparison Matrix</h2>
                        ${this.selectedVendors.length === 0 ? 
                            '<p>Please select vendors to compare.</p>' :
                            this.renderComparisonTable()
                        }
                    </div>
                `;
            };
        }
        
        // Comparison table
        window.dashboard.renderComparisonTable = function() {
            const selected = this.selectedVendors.map(key => this.vendorData[key]).filter(v => v);
            
            return `
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>3-Year TCO</th>
                            <th>Monthly Cost</th>
                            <th>Deploy Time</th>
                            <th>FTE Required</th>
                            <th>Security Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${selected.map(v => `
                            <tr class="${v.key === 'portnox' ? 'highlight-row' : ''}">
                                <td><strong>${v.name}</strong></td>
                                <td>$${(v.tco.tco / 1000).toFixed(0)}K</td>
                                <td>$${(v.tco.monthly / 1000).toFixed(1)}K</td>
                                <td>${v.metrics.implementationDays} days</td>
                                <td>${v.metrics.fteRequired}</td>
                                <td>${v.metrics.securityScore}/100</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        };
    }
});
