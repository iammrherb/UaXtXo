// Implement vendor details modal
(function() {
    console.log('🔧 Implementing vendor details modal...');
    
    // Add showVendorDetails method
    function implementVendorDetails() {
        if (!window.dashboard) {
            setTimeout(implementVendorDetails, 100);
            return;
        }
        
        window.dashboard.showVendorDetails = function(vendorKey) {
            const vendor = this.vendorData[vendorKey];
            if (!vendor) return;
            
            // Remove existing modal if any
            const existingModal = document.querySelector('.vendor-details-modal');
            if (existingModal) existingModal.remove();
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'vendor-details-modal';
            modal.innerHTML = `
                <div class="vendor-details-dialog">
                    <div class="vendor-details-header">
                        <h2>${vendor.name} - Detailed Analysis</h2>
                        <button class="close-btn" onclick="this.closest('.vendor-details-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="vendor-details-content">
                        <div class="details-section">
                            <h3>Financial Analysis</h3>
                            <div class="details-grid">
                                <div class="detail-item">
                                    <span class="label">1-Year TCO:</span>
                                    <span class="value">$${(vendor.tco.year1 / 1000).toFixed(0)}K</span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">2-Year TCO:</span>
                                    <span class="value">$${((vendor.tco.year1 + vendor.tco.year2) / 1000).toFixed(0)}K</span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">3-Year TCO:</span>
                                    <span class="value">$${(vendor.tco.tco / 1000).toFixed(0)}K</span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">Monthly Cost:</span>
                                    <span class="value">$${(vendor.tco.monthly / 1000).toFixed(1)}K</span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">ROI:</span>
                                    <span class="value">${vendor.roi.roi}%</span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">Payback Period:</span>
                                    <span class="value">${vendor.roi.paybackMonths} months</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="details-section">
                            <h3>Technical Capabilities</h3>
                            <div class="capabilities-grid">
                                <div class="capability">
                                    <i class="fas ${vendor.metrics.cloudNative ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'}"></i>
                                    <span>Cloud Native</span>
                                </div>
                                <div class="capability">
                                    <i class="fas ${vendor.metrics.zeroTrustScore >= 85 ? 'fa-check-circle text-success' : 'fa-exclamation-circle text-warning'}"></i>
                                    <span>Zero Trust Ready</span>
                                </div>
                                <div class="capability">
                                    <i class="fas ${vendor.metrics.automationLevel >= 85 ? 'fa-check-circle text-success' : 'fa-exclamation-circle text-warning'}"></i>
                                    <span>Automation: ${vendor.metrics.automationLevel}%</span>
                                </div>
                                <div class="capability">
                                    <i class="fas fa-shield-alt"></i>
                                    <span>Security Score: ${vendor.metrics.securityScore}/100</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="details-section">
                            <h3>Operational Impact</h3>
                            <div class="details-grid">
                                <div class="detail-item">
                                    <span class="label">FTE Required:</span>
                                    <span class="value">${vendor.metrics.fteRequired}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">Implementation Time:</span>
                                    <span class="value">${vendor.metrics.implementationDays} days</span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">Support Level:</span>
                                    <span class="value">${vendor.metrics.supportLevel || 'Standard'}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="details-actions">
                            <button class="action-btn primary" onclick="dashboard.exportVendorReport('${vendorKey}')">
                                <i class="fas fa-file-pdf"></i> Export Report
                            </button>
                            <button class="action-btn secondary" onclick="dashboard.compareWithPortnox('${vendorKey}')">
                                <i class="fas fa-exchange-alt"></i> Compare with Portnox
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
        };
        
        console.log('✅ Vendor details modal implemented');
    }
    
    implementVendorDetails();
})();
