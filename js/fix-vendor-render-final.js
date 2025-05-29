// Fix vendor card rendering
document.addEventListener('DOMContentLoaded', function() {
    if (window.dashboard) {
        window.dashboard.renderVendorCards = function() {
            const vendorGrid = document.getElementById('vendor-grid');
            if (!vendorGrid || !this.vendorData) return;
            
            const vendors = Object.values(this.vendorData).sort((a, b) => b.score - a.score);
            
            vendorGrid.innerHTML = vendors.map(vendor => {
                const isSelected = this.selectedVendors.includes(vendor.key);
                const isPornox = vendor.key === 'portnox';
                
                // Calculate monthly cost properly
                const monthlyDisplay = vendor.tco.monthly ? 
                    `$${(vendor.tco.monthly / 1000).toFixed(1)}K` : 
                    `$${(vendor.tco.tco / 36 / 1000).toFixed(1)}K`;
                
                return `
                    <div class="vendor-card ${isPornox ? 'portnox' : ''} ${isSelected ? 'selected' : ''}">
                        <div class="vendor-header">
                            <div class="vendor-logo">
                                <img src="./img/vendors/${vendor.key}-logo.png" alt="${vendor.name}" 
                                     onerror="this.src='./img/vendors/default-logo.png'">
                            </div>
                            <div class="vendor-info">
                                <h4>${vendor.name}</h4>
                                <div class="vendor-rating">
                                    ${Array(Math.floor(vendor.score/20)).fill('<i class="fas fa-star"></i>').join('')}
                                    ${vendor.score % 20 >= 10 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                                    <span class="score-badge">${vendor.score}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="vendor-metrics">
                            <div class="metric-group">
                                <div class="metric-label">3-YEAR TCO</div>
                                <div class="metric-value">$${vendor.tco.tco === 0 ? '0' : (vendor.tco.tco / 1000).toFixed(0)}K</div>
                            </div>
                            <div class="metric-group">
                                <div class="metric-label">MONTHLY</div>
                                <div class="metric-value">${monthlyDisplay}</div>
                            </div>
                        </div>
                        
                        <div class="metric-row">
                            <div class="metric-group">
                                <div class="metric-label">DEPLOY</div>
                                <div class="metric-value" style="color: #4A90E2;">${vendor.metrics.implementationDays}d</div>
                            </div>
                            <div class="metric-group">
                                <div class="metric-label">FTE</div>
                                <div class="metric-value" style="color: #4A90E2;">${vendor.metrics.fteRequired}</div>
                            </div>
                        </div>
                        
                        <div class="vendor-badges">
                            ${vendor.metrics.cloudNative ? 'Cloud Native' : ''} 
                            ${vendor.metrics.zeroTrustScore >= 85 ? 'Zero Trust' : ''} 
                            ${vendor.metrics.automationLevel >= 85 ? 'Automated' : ''}
                        </div>
                        
                        <div class="vendor-actions">
                            <button class="vendor-btn ${isSelected ? 'selected' : ''}" 
                                    onclick="dashboard.toggleVendor('${vendor.key}')">
                                <i class="fas ${isSelected ? 'fa-check' : 'fa-plus'}"></i>
                                ${isSelected ? 'Selected' : 'Select'}
                            </button>
                            <button class="vendor-btn" onclick="dashboard.showVendorDetails('${vendor.key}')">
                                <i class="fas fa-info-circle"></i> Details
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        };
        
        // Refresh the display
        if (window.dashboard.vendorData) {
            window.dashboard.renderVendorCards();
        }
    }
});
