// Fix Vendor Functions
console.log("🔧 Fixing vendor functions...");

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.dashboard) {
            // Add the missing toggleVendorAndUpdate method
            window.dashboard.toggleVendorAndUpdate = function(vendorKey) {
                console.log("Toggle vendor:", vendorKey);
                
                // Toggle selection
                const index = this.selectedVendors.indexOf(vendorKey);
                if (index > -1) {
                    if (this.selectedVendors.length > 1) {
                        this.selectedVendors.splice(index, 1);
                    }
                } else {
                    if (this.selectedVendors.length < 6) {
                        this.selectedVendors.push(vendorKey);
                    } else {
                        this.showNotification('Maximum 6 vendors can be selected', 'warning');
                        return;
                    }
                }
                
                // Re-render
                this.render();
                
                // Update charts
                if (this.renderTCOComparisonChart) {
                    this.renderTCOComparisonChart();
                }
            };
            
            // Fix showVendorDetails method
            window.dashboard.showVendorDetails = function(vendorKey) {
                const vendor = this.vendorData[vendorKey];
                if (!vendor) return;
                
                // Create modal
                const modal = document.createElement('div');
                modal.className = 'vendor-details-modal';
                modal.innerHTML = `
                    <div class="modal-dialog">
                        <div class="modal-header">
                            <h2>${vendor.name} - Detailed Analysis</h2>
                            <button class="close-btn" onclick="this.closest('.vendor-details-modal').remove()">×</button>
                        </div>
                        <div class="modal-content">
                            <div class="detail-section">
                                <h3>Financial Breakdown</h3>
                                <table class="details-table">
                                    <tr><td>3-Year TCO:</td><td><strong>$${(vendor.tco.total/1000).toFixed(0)}K</strong></td></tr>
                                    <tr><td>Monthly Cost:</td><td>$${(vendor.tco.monthly/1000).toFixed(1)}K</td></tr>
                                    <tr><td>Per Device/Month:</td><td>$${vendor.tco.perDeviceMonthly.toFixed(2)}</td></tr>
                                    <tr><td>Implementation:</td><td>$${(vendor.costs.implementation/1000).toFixed(0)}K</td></tr>
                                    <tr><td>Annual Operational:</td><td>$${(vendor.costs.operational/1000).toFixed(0)}K</td></tr>
                                </table>
                            </div>
                            
                            <div class="detail-section">
                                <h3>Technical Capabilities</h3>
                                <div class="capability-grid">
                                    <div class="cap-item">
                                        <span class="cap-label">Cloud Native:</span>
                                        <span class="cap-value">${vendor.capabilities.cloudNative}%</span>
                                    </div>
                                    <div class="cap-item">
                                        <span class="cap-label">Zero Trust:</span>
                                        <span class="cap-value">${vendor.capabilities.zeroTrust}%</span>
                                    </div>
                                    <div class="cap-item">
                                        <span class="cap-label">Automation:</span>
                                        <span class="cap-value">${vendor.capabilities.automation}%</span>
                                    </div>
                                    <div class="cap-item">
                                        <span class="cap-label">AI/ML:</span>
                                        <span class="cap-value">${vendor.capabilities.aiMl}%</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="detail-section">
                                <h3>Implementation & Operations</h3>
                                <table class="details-table">
                                    <tr><td>Deployment Time:</td><td>${vendor.metrics.implementationDays} days</td></tr>
                                    <tr><td>FTE Required:</td><td>${vendor.metrics.fteRequired}</td></tr>
                                    <tr><td>Security Score:</td><td>${vendor.metrics.securityScore}/100</td></tr>
                                    <tr><td>ROI:</td><td>${vendor.roi.roi}%</td></tr>
                                    <tr><td>Payback Period:</td><td>${vendor.roi.paybackMonths} months</td></tr>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
            };
        }
    }, 1000);
});

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .vendor-details-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    
    .modal-dialog {
        background: white;
        border-radius: 12px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    .modal-header {
        background: #00a652;
        color: white;
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h2 {
        margin: 0;
        font-size: 1.5rem;
    }
    
    .close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .close-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
    }
    
    .modal-content {
        padding: 2rem;
        overflow-y: auto;
        max-height: calc(90vh - 80px);
    }
    
    .detail-section {
        margin-bottom: 2rem;
    }
    
    .detail-section h3 {
        color: #00a652;
        margin-bottom: 1rem;
        font-size: 1.125rem;
    }
    
    .details-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .details-table td {
        padding: 0.5rem 0;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .details-table td:first-child {
        color: #666;
    }
    
    .details-table td:last-child {
        text-align: right;
        font-weight: 600;
    }
    
    .capability-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    
    .cap-item {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem;
        background: #f8f9fa;
        border-radius: 6px;
    }
    
    .cap-label {
        color: #666;
        font-size: 0.875rem;
    }
    
    .cap-value {
        font-weight: 700;
        color: #00a652;
    }
`;
document.head.appendChild(modalStyles);
