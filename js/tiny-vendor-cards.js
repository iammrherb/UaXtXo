// TINY VENDOR CARDS
document.addEventListener('DOMContentLoaded', function() {
    if (window.dashboard) {
        // Override vendor card rendering with tiny cards
        window.dashboard.renderVendorCards = function() {
            const vendorGrid = document.getElementById('vendor-grid');
            if (!vendorGrid || !this.vendorData) return;
            
            const vendors = Object.values(this.vendorData).sort((a, b) => b.score - a.score);
            
            vendorGrid.innerHTML = vendors.map(vendor => {
                const isSelected = this.selectedVendors.includes(vendor.key);
                const isPortnox = vendor.key === 'portnox';
                const tcoDisplay = vendor.tco.tco === 0 ? '$0' : `$${(vendor.tco.tco / 1000).toFixed(0)}K`;
                
                return `
                    <div class="vendor-card ${isPortnox ? 'portnox' : ''} ${isSelected ? 'selected' : ''}"
                         title="${vendor.name} - Score: ${vendor.score}">
                        <div class="vendor-tiny-header">
                            <div class="vendor-tiny-logo">
                                <img src="./img/vendors/${vendor.key}-logo.png" 
                                     alt="${vendor.name}" 
                                     onerror="this.style.display='none'">
                            </div>
                            <div class="vendor-tiny-name">${vendor.name}</div>
                        </div>
                        
                        <div class="vendor-tiny-metrics">
                            <div class="tiny-metric">
                                <span>TCO:</span>
                                <span class="tiny-metric-value">${tcoDisplay}</span>
                            </div>
                            <div class="tiny-metric">
                                <span>Deploy:</span>
                                <span class="tiny-metric-value">${vendor.metrics.implementationDays}d</span>
                            </div>
                            <div class="tiny-metric">
                                <span>FTE:</span>
                                <span class="tiny-metric-value">${vendor.metrics.fteRequired}</span>
                            </div>
                        </div>
                        
                        <div class="vendor-tiny-actions">
                            <button class="tiny-btn ${isSelected ? 'selected' : ''}" 
                                    onclick="event.stopPropagation(); dashboard.toggleVendor('${vendor.key}')">
                                ${isSelected ? 'Selected' : 'Select'}
                            </button>
                            <button class="tiny-btn" 
                                    onclick="event.stopPropagation(); dashboard.quickInfo('${vendor.key}')">
                                Info
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        };
        
        // Simple info popup
        window.dashboard.quickInfo = function(vendorKey) {
            const vendor = this.vendorData[vendorKey];
            if (!vendor) return;
            
            alert(`${vendor.name}
            
3-Year TCO: $${(vendor.tco.tco / 1000).toFixed(0)}K
Monthly: $${(vendor.tco.monthly / 1000).toFixed(1)}K
Deploy Time: ${vendor.metrics.implementationDays} days
FTE Required: ${vendor.metrics.fteRequired}
Security Score: ${vendor.metrics.securityScore}/100
Cloud Native: ${vendor.metrics.cloudNative ? 'Yes' : 'No'}`);
        };
        
        // Make sure showVendorDetails exists
        if (!window.dashboard.showVendorDetails) {
            window.dashboard.showVendorDetails = window.dashboard.quickInfo;
        }
        
        // Refresh the display
        if (window.dashboard.vendorData) {
            window.dashboard.render();
        }
    }
});
