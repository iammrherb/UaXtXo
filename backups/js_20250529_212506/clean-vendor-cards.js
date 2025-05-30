// CLEAN VENDOR CARD RENDERING
document.addEventListener('DOMContentLoaded', function() {
    // Wait for dashboard to be available
    const initVendorCards = () => {
        if (!window.dashboard) {
            setTimeout(initVendorCards, 100);
            return;
        }
        
        // Clean vendor card rendering
        window.dashboard.renderVendorCards = function() {
            const vendorGrid = document.getElementById('vendor-grid');
            if (!vendorGrid || !this.vendorData) return;
            
            const vendors = Object.values(this.vendorData).sort((a, b) => b.score - a.score);
            
            vendorGrid.innerHTML = vendors.map(vendor => {
                const isSelected = this.selectedVendors.includes(vendor.key);
                const stars = Math.floor(vendor.score / 20);
                
                // Build features text
                const features = [];
                if (vendor.metrics.cloudNative) features.push('CLOUD NATIVE');
                if (vendor.metrics.zeroTrustScore >= 85) features.push('ZERO TRUST');
                if (vendor.metrics.automationLevel >= 85) features.push('AUTOMATED');
                
                return `
                    <div class="vendor-card ${vendor.key === 'portnox' ? 'portnox' : ''} ${isSelected ? 'selected' : ''}">
                        <div class="card-header">
                            <div class="card-logo">
                                <img src="./img/vendors/${vendor.key}-logo.png" 
                                     alt="${vendor.name}" 
                                     onerror="this.style.visibility='hidden'">
                            </div>
                            <div class="card-title">
                                <div class="card-name">${vendor.name}</div>
                                <div class="card-stars">
                                    ${Array(stars).fill('<i class="fas fa-star"></i>').join('')}
                                    <span style="margin-left: 4px; color: #6b7280;">${vendor.score}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card-tco">
                            <div class="tco-label">3-YEAR TCO</div>
                            <div class="tco-value">$${(vendor.tco.tco / 1000).toFixed(0)}K</div>
                        </div>
                        
                        <div class="card-features">
                            ${features.join(' ')}
                        </div>
                        
                        <div class="card-actions">
                            <button class="card-btn ${isSelected ? 'primary' : ''}" 
                                    onclick="dashboard.toggleVendor('${vendor.key}')">
                                ${isSelected ? '✓ Selected' : '+ Select'}
                            </button>
                            <button class="card-btn" onclick="dashboard.viewDetails('${vendor.key}')">
                                <i class="fas fa-info-circle"></i> Details
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        };
        
        // Simple details view
        window.dashboard.viewDetails = function(vendorKey) {
            const vendor = this.vendorData[vendorKey];
            if (!vendor) return;
            
            const details = `
${vendor.name} Details:
━━━━━━━━━━━━━━━━━━━━
Financial:
• 3-Year TCO: $${(vendor.tco.tco / 1000).toFixed(0)}K
• Monthly Cost: $${(vendor.tco.monthly / 1000).toFixed(1)}K

Operations:
• Deploy Time: ${vendor.metrics.implementationDays} days
• FTE Required: ${vendor.metrics.fteRequired}

Security:
• Security Score: ${vendor.metrics.securityScore}/100
• Zero Trust: ${vendor.metrics.zeroTrustScore}%
            `;
            
            alert(details);
        };
        
        // Make sure missing functions exist
        if (!window.dashboard.showVendorDetails) {
            window.dashboard.showVendorDetails = window.dashboard.viewDetails;
        }
        
        // Render if we have data
        if (window.dashboard.vendorData) {
            window.dashboard.render();
        }
    };
    
    initVendorCards();
});
