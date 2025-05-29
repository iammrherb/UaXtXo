// FIX VENDOR CARD DATA DISPLAY
document.addEventListener('DOMContentLoaded', function() {
    // Override the vendor card rendering
    if (window.dashboard && window.dashboard.renderVendorCards) {
        window.dashboard.renderVendorCards = function() {
            const vendorGrid = document.getElementById('vendor-grid');
            if (!vendorGrid || !this.vendorData) return;
            
            const vendors = Object.values(this.vendorData).sort((a, b) => b.score - a.score);
            
            vendorGrid.innerHTML = vendors.map(vendor => `
                <div class="vendor-card ${vendor.key === 'portnox' ? 'portnox' : ''}" style="min-height: 340px; padding: 20px;">
                    <div class="vendor-header" style="margin-bottom: 15px;">
                        <h4 style="font-size: 16px; margin: 0;">${vendor.name}</h4>
                        <div style="font-size: 12px; color: #666;">Score: ${vendor.score}/100</div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0;">
                        <div style="background: #f5f5f5; padding: 10px; border-radius: 5px; text-align: center;">
                            <div style="font-size: 11px; color: #999;">3-YEAR TCO</div>
                            <div style="font-size: 16px; font-weight: bold;">$${(vendor.tco.tco / 1000).toFixed(0)}K</div>
                        </div>
                        <div style="background: #f5f5f5; padding: 10px; border-radius: 5px; text-align: center;">
                            <div style="font-size: 11px; color: #999;">PER DEVICE/MO</div>
                            <div style="font-size: 16px; font-weight: bold;">$${vendor.pricing?.perDevice || 'N/A'}</div>
                        </div>
                        <div style="background: #f5f5f5; padding: 10px; border-radius: 5px; text-align: center;">
                            <div style="font-size: 11px; color: #999;">DEPLOY</div>
                            <div style="font-size: 16px; font-weight: bold;">${vendor.metrics.implementationDays}d</div>
                        </div>
                        <div style="background: #f5f5f5; padding: 10px; border-radius: 5px; text-align: center;">
                            <div style="font-size: 11px; color: #999;">FTE</div>
                            <div style="font-size: 16px; font-weight: bold;">${vendor.metrics.fteRequired}</div>
                        </div>
                    </div>
                    
                    <div style="margin: 15px 0; min-height: 30px;">
                        ${vendor.metrics.cloudNative ? '<span style="background: #e3f2fd; color: #1565c0; padding: 4px 8px; border-radius: 4px; font-size: 11px; margin-right: 5px;">CLOUD</span>' : ''}
                        ${vendor.metrics.zeroTrustScore >= 85 ? '<span style="background: #fff3cd; color: #856404; padding: 4px 8px; border-radius: 4px; font-size: 11px;">ZERO TRUST</span>' : ''}
                    </div>
                    
                    <div style="display: flex; gap: 10px; margin-top: auto;">
                        <button onclick="dashboard.toggleVendor('${vendor.key}')" style="flex: 1; padding: 10px; background: ${this.selectedVendors.includes(vendor.key) ? '#28a745' : '#007bff'}; color: white; border: none; border-radius: 5px; cursor: pointer;">
                            ${this.selectedVendors.includes(vendor.key) ? 'Selected ✓' : 'Select'}
                        </button>
                        <button onclick="dashboard.showVendorDetails('${vendor.key}')" style="flex: 1; padding: 10px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">
                            Details
                        </button>
                    </div>
                </div>
            `).join('');
        };
    }
});
