// COMPACT VENDOR CARDS WITH PRICING SLIDER
document.addEventListener('DOMContentLoaded', function() {
    if (window.dashboard) {
        // Add pricing slider to overview
        const originalRenderOverview = window.dashboard.renderOverview;
        window.dashboard.renderOverview = function(container) {
            const sliderHTML = `
                <div class="pricing-slider-section">
                    <div class="pricing-slider-header">
                        <h3>Portnox Pricing per Device/Month</h3>
                        <div class="pricing-display">$<span id="pricing-value">${this.config.portnoxPricing || 3.5}</span></div>
                    </div>
                    <div class="slider-container">
                        <input type="range" 
                               id="portnox-pricing-slider" 
                               class="pricing-slider"
                               min="1" 
                               max="10" 
                               step="0.1" 
                               value="${this.config.portnoxPricing || 3.5}">
                        <div class="slider-labels">
                            <span>$1.00</span>
                            <span>$10.00</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Call original render
            originalRenderOverview.call(this, container);
            
            // Add slider at the top
            const firstElement = container.firstElementChild;
            if (firstElement && !document.getElementById('portnox-pricing-slider')) {
                firstElement.insertAdjacentHTML('beforebegin', sliderHTML);
                
                // Setup slider listener
                const slider = document.getElementById('portnox-pricing-slider');
                const display = document.getElementById('pricing-value');
                
                slider.addEventListener('input', (e) => {
                    const value = parseFloat(e.target.value);
                    display.textContent = value.toFixed(2);
                    
                    // Update config and refresh
                    this.config.portnoxPricing = value;
                    window.vendorCalculator.setPortnoxPricing(value);
                    this.refreshVendorData();
                    this.renderVendorCards();
                    
                    // Update charts if visible
                    if (this.renderTCOComparisonChart) {
                        this.renderTCOComparisonChart();
                    }
                });
            }
        };
        
        // Compact vendor card rendering
        window.dashboard.renderVendorCards = function() {
            const vendorGrid = document.getElementById('vendor-grid');
            if (!vendorGrid || !this.vendorData) return;
            
            const vendors = Object.values(this.vendorData).sort((a, b) => b.score - a.score);
            
            vendorGrid.innerHTML = vendors.map(vendor => {
                const isSelected = this.selectedVendors.includes(vendor.key);
                
                return `
                    <div class="vendor-card ${vendor.key === 'portnox' ? 'portnox' : ''} ${isSelected ? 'selected' : ''}">
                        <div class="card-score">${vendor.score}</div>
                        
                        <div class="card-header">
                            <div class="card-logo">
                                <img src="./img/vendors/${vendor.key}-logo.png" 
                                     alt="" 
                                     onerror="this.style.display='none'">
                            </div>
                            <div class="card-name" title="${vendor.name}">${vendor.name}</div>
                        </div>
                        
                        <div class="card-tco">
                            <div class="tco-label">3-Year TCO</div>
                            <div class="tco-value">$${(vendor.tco.tco / 1000).toFixed(0)}K</div>
                        </div>
                        
                        <div class="card-actions">
                            <button class="card-btn ${isSelected ? 'primary' : ''}" 
                                    onclick="dashboard.toggleVendor('${vendor.key}')">
                                ${isSelected ? 'Selected' : 'Select'}
                            </button>
                            <button class="card-btn" onclick="dashboard.showFullDetails('${vendor.key}')">
                                Details
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        };
        
        // Full details modal
        window.dashboard.showFullDetails = function(vendorKey) {
            const vendor = this.vendorData[vendorKey];
            if (!vendor) return;
            
            // Calculate per device cost
            let perDeviceCost = 'N/A';
            if (vendor.key === 'portnox') {
                perDeviceCost = `$${this.config.portnoxPricing}`;
            } else if (vendor.pricing && vendor.pricing.perDevice) {
                perDeviceCost = `$${vendor.pricing.perDevice}`;
            } else {
                // Calculate from monthly cost
                const monthlyPerDevice = (vendor.tco.monthly / this.config.deviceCount).toFixed(2);
                perDeviceCost = `~$${monthlyPerDevice}`;
            }
            
            const modal = document.createElement('div');
            modal.className = 'vendor-details-modal';
            modal.innerHTML = `
                <div class="details-dialog">
                    <div class="details-header">
                        <h2>${vendor.name} - Detailed Analysis</h2>
                        <button class="close-btn" onclick="this.closest('.vendor-details-modal').remove()">×</button>
                    </div>
                    <div class="details-content">
                        <div class="detail-section">
                            <h3>Financial Metrics</h3>
                            <div class="detail-row">
                                <span class="detail-label">3-Year TCO:</span>
                                <span class="detail-value">$${(vendor.tco.tco / 1000).toFixed(0)}K</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Monthly Cost:</span>
                                <span class="detail-value">$${(vendor.tco.monthly / 1000).toFixed(1)}K</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Per Device/Month:</span>
                                <span class="detail-value">${perDeviceCost}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Annual Cost:</span>
                                <span class="detail-value">$${(vendor.tco.monthly * 12 / 1000).toFixed(0)}K</span>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Operational Metrics</h3>
                            <div class="detail-row">
                                <span class="detail-label">Deployment Time:</span>
                                <span class="detail-value">${vendor.metrics.implementationDays} days</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">FTE Required:</span>
                                <span class="detail-value">${vendor.metrics.fteRequired}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">FTE Cost (3 Years):</span>
                                <span class="detail-value">$${(vendor.metrics.fteRequired * this.config.fteCost * 3 / 1000).toFixed(0)}K</span>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Technical Capabilities</h3>
                            <div class="detail-row">
                                <span class="detail-label">Security Score:</span>
                                <span class="detail-value">${vendor.metrics.securityScore}/100</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Cloud Native:</span>
                                <span class="detail-value">${vendor.metrics.cloudNative ? 'Yes' : 'No'}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Zero Trust Ready:</span>
                                <span class="detail-value">${vendor.metrics.zeroTrustScore}%</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Automation Level:</span>
                                <span class="detail-value">${vendor.metrics.automationLevel}%</span>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Cost Breakdown</h3>
                            <div class="detail-row">
                                <span class="detail-label">Licensing:</span>
                                <span class="detail-value">$${((vendor.tco.breakdown?.license || 0) / 1000).toFixed(0)}K</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Implementation:</span>
                                <span class="detail-value">$${((vendor.tco.breakdown?.implementation || 0) / 1000).toFixed(0)}K</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Operations:</span>
                                <span class="detail-value">$${((vendor.tco.breakdown?.operational || 0) / 1000).toFixed(0)}K</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        };
        
        // Ensure compatibility
        if (!window.dashboard.viewDetails) {
            window.dashboard.viewDetails = window.dashboard.showFullDetails;
        }
        if (!window.dashboard.showVendorDetails) {
            window.dashboard.showVendorDetails = window.dashboard.showFullDetails;
        }
        if (!window.dashboard.quickDetails) {
            window.dashboard.quickDetails = window.dashboard.showFullDetails;
        }
        
        // Refresh display
        if (window.dashboard.vendorData) {
            window.dashboard.render();
        }
    }
});
