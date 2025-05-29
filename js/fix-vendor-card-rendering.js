// Fix Vendor Card Rendering
console.log("💳 Fixing vendor card rendering...");

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.dashboard && window.dashboard.renderVendorCards) {
            const originalRender = window.dashboard.renderVendorCards;
            
            window.dashboard.renderVendorCards = function() {
                const vendorGrid = document.getElementById('vendor-grid');
                if (!vendorGrid || !this.vendorData) return;
                
                const sortedVendors = Object.values(this.vendorData)
                    .sort((a, b) => b.score - a.score);
                
                vendorGrid.innerHTML = sortedVendors.map(vendor => {
                    const isSelected = this.selectedVendors.includes(vendor.key);
                    const perDevicePrice = vendor.tco.perDeviceMonthly || 
                                         (vendor.tco.monthly / (this.config.deviceCount || 1000)).toFixed(2);
                    
                    return `
                        <div class="vendor-card ${vendor.key === 'portnox' ? 'portnox' : ''} ${isSelected ? 'selected' : ''}" 
                             data-vendor="${vendor.key}">
                            <div class="vendor-header">
                                <div class="vendor-logo">
                                    <img src="./img/vendors/${vendor.key}-logo.png" 
                                         alt="${vendor.name}"
                                         onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-weight:700;color:#6c757d;\\'>${vendor.name.substring(0,3).toUpperCase()}</div>';">
                                </div>
                                <div class="vendor-info">
                                    <h4 class="vendor-name">${vendor.name}</h4>
                                    <div class="vendor-rating">
                                        ${this.renderStars(vendor.score / 20)}
                                        <span class="score-badge">${vendor.score}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="vendor-metrics">
                                <div class="metric-row featured">
                                    <div class="metric-item primary">
                                        <div class="metric-label">3-YEAR TCO</div>
                                        <div class="metric-value large">$${(vendor.tco.total / 1000).toFixed(0)}K</div>
                                    </div>
                                </div>
                                
                                <div class="metric-row">
                                    <div class="metric-item">
                                        <div class="metric-label">PER DEVICE/MO</div>
                                        <div class="metric-value price">$${perDevicePrice}</div>
                                    </div>
                                    <div class="metric-item">
                                        <div class="metric-label">MONTHLY</div>
                                        <div class="metric-value">$${(vendor.tco.monthly / 1000).toFixed(1)}K</div>
                                    </div>
                                </div>
                                
                                <div class="metric-row">
                                    <div class="metric-item">
                                        <div class="metric-label">DEPLOY</div>
                                        <div class="metric-value">${vendor.metrics.implementationDays || 'N/A'}</div>
                                    </div>
                                    <div class="metric-item">
                                        <div class="metric-label">FTE</div>
                                        <div class="metric-value">${vendor.metrics.fteRequired || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="vendor-badges">
                                ${vendor.capabilities?.cloudNative === 100 ? '<span class="badge cloud">CLOUD NATIVE</span>' : ''}
                                ${vendor.capabilities?.zeroTrust >= 85 ? '<span class="badge zt">ZERO TRUST</span>' : ''}
                                ${vendor.capabilities?.automation >= 85 ? '<span class="badge auto">AUTOMATED</span>' : ''}
                            </div>
                            
                            <div class="vendor-actions">
                                <button class="vendor-btn ${isSelected ? 'selected' : ''}" 
                                        onclick="dashboard.toggleVendorAndUpdate('${vendor.key}')">
                                    <i class="fas ${isSelected ? 'fa-check' : 'fa-plus'}"></i>
                                    ${isSelected ? 'Selected' : 'Select'}
                                </button>
                                <button class="vendor-btn details" 
                                        onclick="dashboard.showVendorDetails('${vendor.key}')">
                                    <i class="fas fa-info-circle"></i> Details
                                </button>
                            </div>
                        </div>
                    `;
                }).join('');
            };
            
            // Add renderStars method if missing
            if (!window.dashboard.renderStars) {
                window.dashboard.renderStars = function(rating) {
                    const fullStars = Math.floor(rating);
                    const hasHalf = rating % 1 >= 0.5;
                    let stars = '';
                    
                    for (let i = 0; i < fullStars; i++) {
                        stars += '<i class="fas fa-star"></i>';
                    }
                    if (hasHalf) {
                        stars += '<i class="fas fa-star-half-alt"></i>';
                    }
                    const remaining = 5 - Math.ceil(rating);
                    for (let i = 0; i < remaining; i++) {
                        stars += '<i class="far fa-star"></i>';
                    }
                    
                    return stars;
                };
            }
            
            // Force re-render
            if (window.dashboard.vendorData) {
                window.dashboard.renderVendorCards();
            }
        }
    }, 1000);
});
