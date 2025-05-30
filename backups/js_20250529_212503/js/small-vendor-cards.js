// SMALL VENDOR CARDS
document.addEventListener('DOMContentLoaded', function() {
    if (window.dashboard) {
        window.dashboard.renderVendorCards = function() {
            const vendorGrid = document.getElementById('vendor-grid');
            if (!vendorGrid || !this.vendorData) return;
            
            const vendors = Object.values(this.vendorData).sort((a, b) => b.score - a.score);
            
            vendorGrid.innerHTML = vendors.map(vendor => {
                const isSelected = this.selectedVendors.includes(vendor.key);
                
                return `
                    <div class="vendor-card ${vendor.key === 'portnox' ? 'portnox' : ''} ${isSelected ? 'selected' : ''}">
                        <div class="card-header">
                            <div class="card-logo">
                                <img src="./img/vendors/${vendor.key}-logo.png" 
                                     alt="" 
                                     onerror="this.style.display='none'">
                            </div>
                            <div class="card-name" title="${vendor.name}">${vendor.name}</div>
                        </div>
                        
                        <div class="card-tco">
                            <div class="tco-value">$${(vendor.tco.tco / 1000).toFixed(0)}K</div>
                        </div>
                        
                        <div class="card-actions">
                            <button class="card-btn ${isSelected ? 'primary' : ''}" 
                                    onclick="dashboard.toggleVendor('${vendor.key}')">
                                ${isSelected ? 'Selected' : 'Select'}
                            </button>
                            <button class="card-btn" onclick="dashboard.quickDetails('${vendor.key}')">
                                Info
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        };
        
        // Quick details
        window.dashboard.quickDetails = function(vendorKey) {
            const v = this.vendorData[vendorKey];
            if (!v) return;
            
            alert(`${v.name}
TCO: $${(v.tco.tco/1000).toFixed(0)}K
Deploy: ${v.metrics.implementationDays} days
FTE: ${v.metrics.fteRequired}`);
        };
        
        // Ensure compatibility
        if (!window.dashboard.viewDetails) {
            window.dashboard.viewDetails = window.dashboard.quickDetails;
        }
        if (!window.dashboard.showVendorDetails) {
            window.dashboard.showVendorDetails = window.dashboard.quickDetails;
        }
        
        // Refresh
        if (window.dashboard.vendorData) {
            window.dashboard.render();
        }
    }
});
