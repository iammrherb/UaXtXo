// MINIMAL VENDOR CARDS
document.addEventListener('DOMContentLoaded', function() {
    if (window.dashboard) {
        window.dashboard.renderVendorCards = function() {
            const vendorGrid = document.getElementById('vendor-grid');
            if (!vendorGrid || !this.vendorData) return;
            
            const vendors = Object.values(this.vendorData).sort((a, b) => b.score - a.score);
            
            vendorGrid.innerHTML = vendors.map(vendor => {
                const isSelected = this.selectedVendors.includes(vendor.key);
                const isPortnox = vendor.key === 'portnox';
                
                return `
                    <div class="vendor-card ${isPortnox ? 'portnox' : ''} ${isSelected ? 'selected' : ''}">
                        <div class="vendor-header">
                            <div class="vendor-logo">
                                <img src="./img/vendors/${vendor.key}-logo.png" 
                                     alt="${vendor.name}" 
                                     onerror="this.style.display='none'">
                            </div>
                            <div class="vendor-name">${vendor.name}</div>
                            <div class="vendor-score">${vendor.score}</div>
                        </div>
                        
                        <div class="vendor-key-metrics">
                            <div class="key-metric">
                                <span class="metric-tiny-label">TCO</span>
                                <span class="metric-compact-value">$${(vendor.tco.tco / 1000).toFixed(0)}K</span>
                            </div>
                            <div class="key-metric">
                                <span class="metric-tiny-label">Deploy</span>
                                <span class="metric-compact-value">${vendor.metrics.implementationDays}d</span>
                            </div>
                        </div>
                        
                        <div class="vendor-compact-actions">
                            <button class="compact-btn ${isSelected ? 'selected' : ''}" 
                                    onclick="dashboard.toggleVendor('${vendor.key}')">
                                ${isSelected ? '<i class="fas fa-check"></i>' : '<i class="fas fa-plus"></i>'}
                                ${isSelected ? 'Selected' : 'Select'}
                            </button>
                            <button class="compact-btn" 
                                    onclick="dashboard.showVendorDetails('${vendor.key}')">
                                <i class="fas fa-info"></i> Details
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        };
    }
});
