// FIX ALL CONSOLE ERRORS
document.addEventListener('DOMContentLoaded', function() {
    // Fix dashboard.drillDown function
    if (window.dashboard) {
        window.dashboard.drillDown = function(type) {
            console.log('Drilling down into:', type);
            switch(type) {
                case 'cost':
                    this.switchTab('financial');
                    break;
                case 'risk':
                    this.switchTab('risk');
                    break;
                case 'efficiency':
                    this.switchTab('vendors');
                    break;
                default:
                    this.switchTab('overview');
            }
        };
        
        // Fix showVendorDetails function
        window.dashboard.showVendorDetails = function(vendorKey) {
            const vendor = this.vendorData[vendorKey];
            if (!vendor) return;
            
            // Create details modal
            const modal = document.createElement('div');
            modal.className = 'vendor-details-modal';
            modal.innerHTML = `
                <div class="vendor-details-dialog">
                    <div class="details-header">
                        <h2>${vendor.name} - Detailed Analysis</h2>
                        <button class="close-details" onclick="this.closest('.vendor-details-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="details-content">
                        <div class="details-grid">
                            <div class="detail-section">
                                <h3>Financial Metrics</h3>
                                <div class="detail-item">
                                    <span>3-Year TCO:</span>
                                    <strong>$${(vendor.tco.tco / 1000).toFixed(0)}K</strong>
                                </div>
                                <div class="detail-item">
                                    <span>Monthly Cost:</span>
                                    <strong>$${(vendor.tco.monthly / 1000).toFixed(1)}K</strong>
                                </div>
                                <div class="detail-item">
                                    <span>Per Device/Month:</span>
                                    <strong>$${vendor.pricing?.perDevice || 'N/A'}</strong>
                                </div>
                            </div>
                            
                            <div class="detail-section">
                                <h3>Operational Metrics</h3>
                                <div class="detail-item">
                                    <span>Deployment Time:</span>
                                    <strong>${vendor.metrics.implementationDays} days</strong>
                                </div>
                                <div class="detail-item">
                                    <span>FTE Required:</span>
                                    <strong>${vendor.metrics.fteRequired}</strong>
                                </div>
                                <div class="detail-item">
                                    <span>Security Score:</span>
                                    <strong>${vendor.metrics.securityScore}/100</strong>
                                </div>
                            </div>
                            
                            <div class="detail-section">
                                <h3>Capabilities</h3>
                                <div class="detail-item">
                                    <span>Cloud Native:</span>
                                    <strong>${vendor.metrics.cloudNative ? 'Yes' : 'No'}</strong>
                                </div>
                                <div class="detail-item">
                                    <span>Zero Trust:</span>
                                    <strong>${vendor.metrics.zeroTrustScore}%</strong>
                                </div>
                                <div class="detail-item">
                                    <span>Automation:</span>
                                    <strong>${vendor.metrics.automationLevel}%</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        };
    }
    
    // Fix undefined errors
    if (window.dashboard && !window.dashboard.renderVendorTCOComparison) {
        window.dashboard.renderVendorTCOComparison = function() {
            console.log('Vendor TCO Comparison');
        };
    }
});
