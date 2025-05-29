// COMPLETE FIX FOR VENDOR CARDS
document.addEventListener('DOMContentLoaded', function() {
    if (window.dashboard) {
        window.dashboard.renderVendorCards = function() {
            const vendorGrid = document.getElementById('vendor-grid');
            if (!vendorGrid || !this.vendorData) return;
            
            const vendors = Object.values(this.vendorData).sort((a, b) => b.score - a.score);
            
            vendorGrid.innerHTML = vendors.map(vendor => {
                const isSelected = this.selectedVendors.includes(vendor.key);
                const isPortnox = vendor.key === 'portnox';
                
                // Get per device pricing
                let perDevicePrice = '$3.5';
                if (vendor.pricing && vendor.pricing.perDevice) {
                    perDevicePrice = `$${vendor.pricing.perDevice}`;
                } else if (vendor.key === 'portnox') {
                    perDevicePrice = `$${this.config.portnoxPricing || 3.5}`;
                }
                
                return `
                    <div class="vendor-card ${isPortnox ? 'portnox' : ''} ${isSelected ? 'selected' : ''}">
                        <div class="vendor-header">
                            <div class="vendor-logo">
                                <img src="./img/vendors/${vendor.key}-logo.png" alt="${vendor.name}" 
                                     onerror="this.src='./img/vendors/default-logo.png'">
                            </div>
                            <div class="vendor-info">
                                <h4>${vendor.name}</h4>
                                <div class="vendor-rating">
                                    ${this.renderStars(vendor.score / 20)}
                                    <span class="score-badge">${vendor.score}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="vendor-metrics-row">
                            <div class="metric-box tco">
                                <div class="metric-label">3-YEAR TCO</div>
                                <div class="metric-value" style="color: #10b981;">$${(vendor.tco.tco / 1000).toFixed(0)}K</div>
                            </div>
                            <div class="metric-box price">
                                <div class="metric-label">PER DEVICE/MO</div>
                                <div class="metric-value" style="color: #3b82f6;">${perDevicePrice}</div>
                            </div>
                        </div>
                        
                        <div class="vendor-metrics-row">
                            <div class="metric-box deploy">
                                <div class="metric-label">DEPLOY</div>
                                <div class="metric-value">${vendor.metrics.implementationDays}</div>
                            </div>
                            <div class="metric-box fte">
                                <div class="metric-label">FTE</div>
                                <div class="metric-value">${vendor.metrics.fteRequired}</div>
                            </div>
                        </div>
                        
                        <div class="vendor-features">
                            ${vendor.metrics.cloudNative ? '<span class="feature-tag cloud">CLOUD NATIVE</span>' : ''}
                            ${vendor.metrics.zeroTrustScore >= 85 ? '<span class="feature-tag zt">ZERO TRUST</span>' : ''}
                            ${vendor.metrics.automationLevel >= 85 ? '<span class="feature-tag auto">AUTOMATED</span>' : ''}
                        </div>
                        
                        <div class="vendor-actions">
                            <button class="vendor-btn ${isSelected ? 'selected' : ''}" 
                                    onclick="dashboard.toggleVendor('${vendor.key}')">
                                <i class="fas ${isSelected ? 'fa-check' : 'fa-plus'}"></i>
                                ${isSelected ? 'Selected' : 'Select'}
                            </button>
                            <button class="vendor-btn details" onclick="dashboard.showVendorDetails('${vendor.key}')">
                                <i class="fas fa-info-circle"></i> Details
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        };
        
        // Refresh display
        if (window.dashboard.vendorData) {
            window.dashboard.renderVendorCards();
        }
    }
});
