// Fix vendor card display
(function() {
    console.log('🔧 Fixing vendor card display...');
    
    // Override renderVendorCards to ensure proper display
    function fixVendorCards() {
        if (!window.dashboard || !window.dashboard.renderVendorCards) {
            setTimeout(fixVendorCards, 500);
            return;
        }
        
        const originalRenderCards = window.dashboard.renderVendorCards;
        
        window.dashboard.renderVendorCards = function() {
            const vendorGrid = document.getElementById('vendor-grid');
            if (!vendorGrid || !this.vendorData) {
                console.log('❌ Missing vendor grid or data');
                return;
            }
            
            console.log('📇 Rendering vendor cards with data:', this.vendorData);
            
            const sortedVendors = Object.values(this.vendorData)
                .sort((a, b) => b.score - a.score);
            
            vendorGrid.innerHTML = sortedVendors.map(vendor => {
                // Ensure we have valid TCO data
                const tco = vendor.tco?.tco || 0;
                const monthly = vendor.tco?.monthly || 0;
                const deployDays = vendor.metrics?.implementationDays || 0;
                const fteRequired = vendor.metrics?.fteRequired || 0;
                
                console.log(`${vendor.name} TCO:`, tco, 'Monthly:', monthly);
                
                return `
                    <div class="vendor-card ${vendor.key === 'portnox' ? 'portnox' : ''} ${this.selectedVendors.includes(vendor.key) ? 'selected' : ''}" 
                         data-vendor="${vendor.key}">
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
                        
                        <div class="vendor-metrics">
                            <div class="metric-item">
                                <div class="metric-label">3-Year TCO</div>
                                <div class="metric-value">$${tco > 0 ? (tco / 1000).toFixed(0) : '0'}K</div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-label">Monthly</div>
                                <div class="metric-value">$${monthly > 0 ? (monthly / 1000).toFixed(1) : '0'}K</div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-label">Deploy</div>
                                <div class="metric-value">${deployDays}d</div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-label">FTE</div>
                                <div class="metric-value">${fteRequired}</div>
                            </div>
                        </div>
                        
                        <div class="vendor-badges">
                            ${vendor.metrics?.cloudNative ? '<span class="badge cloud">Cloud Native</span>' : ''}
                            ${vendor.metrics?.zeroTrustScore >= 85 ? '<span class="badge zt">Zero Trust</span>' : ''}
                            ${vendor.metrics?.automationLevel >= 85 ? '<span class="badge auto">Automated</span>' : ''}
                        </div>
                        
                        <div class="vendor-actions">
                            <button class="vendor-btn ${this.selectedVendors.includes(vendor.key) ? 'selected' : ''}" 
                                    onclick="dashboard.toggleVendor('${vendor.key}')">
                                <i class="fas ${this.selectedVendors.includes(vendor.key) ? 'fa-check' : 'fa-plus'}"></i>
                                ${this.selectedVendors.includes(vendor.key) ? 'Selected' : 'Select'}
                            </button>
                            <button class="vendor-btn" onclick="dashboard.showVendorDetails('${vendor.key}')">
                                <i class="fas fa-info-circle"></i> Details
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        };
    }
    
    fixVendorCards();
})();
