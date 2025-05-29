// VENDOR CARDS - EXACT RENDERING
document.addEventListener('DOMContentLoaded', function() {
    if (window.dashboard) {
        // Override vendor card rendering
        window.dashboard.renderVendorCards = function() {
            const vendorGrid = document.getElementById('vendor-grid');
            if (!vendorGrid || !this.vendorData) return;
            
            const vendors = Object.values(this.vendorData).sort((a, b) => b.score - a.score);
            
            vendorGrid.innerHTML = vendors.map(vendor => {
                const isSelected = this.selectedVendors.includes(vendor.key);
                const isPortnox = vendor.key === 'portnox';
                
                // Get monthly cost
                const monthlyDisplay = vendor.tco.monthly ? 
                    `$${(vendor.tco.monthly / 1000).toFixed(1)}K` : 
                    `$${(vendor.tco.tco / 36 / 1000).toFixed(1)}K`;
                
                // Build features text
                const features = [];
                if (vendor.metrics.cloudNative) features.push('Cloud Native');
                if (vendor.metrics.zeroTrustScore >= 85) features.push('Zero Trust');
                if (vendor.metrics.automationLevel >= 85) features.push('Automated');
                const featuresText = features.join(' ');
                
                return `
                    <div class="vendor-card ${isPortnox ? 'portnox' : ''} ${isSelected ? 'selected' : ''}">
                        <div class="vendor-header">
                            <div class="vendor-logo">
                                <img src="./img/vendors/${vendor.key}-logo.png" 
                                     alt="${vendor.name}" 
                                     onerror="this.style.display='none'">
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
                        
                        <div class="vendor-main-metrics">
                            <div class="main-metric">
                                <span class="metric-small-label">3-YEAR TCO</span>
                                <span class="metric-large-value">$${vendor.tco.tco === 0 ? '0' : (vendor.tco.tco / 1000).toFixed(0)}K</span>
                            </div>
                            <div class="main-metric">
                                <span class="metric-small-label">MONTHLY</span>
                                <span class="metric-large-value">${monthlyDisplay}</span>
                            </div>
                        </div>
                        
                        <div class="vendor-sub-metrics">
                            <div class="sub-metric">
                                <span class="metric-small-label">DEPLOY</span>
                                <span class="sub-metric-value">${vendor.metrics.implementationDays}d</span>
                            </div>
                            <div class="sub-metric">
                                <span class="metric-small-label">FTE</span>
                                <span class="sub-metric-value">${vendor.metrics.fteRequired}</span>
                            </div>
                        </div>
                        
                        <div class="vendor-features-text">
                            ${featuresText}
                        </div>
                        
                        <div class="vendor-actions">
                            <button class="vendor-btn select-btn ${isSelected ? 'selected' : ''}" 
                                    onclick="dashboard.toggleVendor('${vendor.key}')">
                                ${isSelected ? '<i class="fas fa-check"></i> Selected' : '<i class="fas fa-plus"></i> Select'}
                            </button>
                            <button class="vendor-btn details-btn" 
                                    onclick="dashboard.showVendorDetails('${vendor.key}')">
                                <i class="fas fa-info-circle"></i> Details
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        };
        
        // Override renderOverview to show selection prompt when no vendors selected
        const originalRenderOverview = window.dashboard.renderOverview;
        window.dashboard.renderOverview = function(container) {
            if (this.selectedVendors.length === 0) {
                container.innerHTML = `
                    <div class="vendor-selection-prompt">
                        <i class="fas fa-hand-pointer" style="font-size: 48px; color: #3b82f6; margin-bottom: 16px;"></i>
                        <h3>Select Vendors to Begin Analysis</h3>
                        <p>Please select at least one vendor below to start your TCO comparison and risk analysis.</p>
                    </div>
                    
                    <div class="vendor-section">
                        <h2 class="section-title">Available Vendors</h2>
                        <div class="vendor-grid" id="vendor-grid"></div>
                    </div>
                `;
                
                setTimeout(() => this.renderVendorCards(), 100);
            } else {
                // Show normal overview with data
                originalRenderOverview.call(this, container);
            }
        };
    }
});
