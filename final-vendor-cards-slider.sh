#!/bin/bash

echo "🔧 Creating 160x160 vendor cards with pricing slider and full details..."

# 1. Create 160x160 vendor cards CSS
cat > css/compact-vendor-cards.css << 'EOF'
/* COMPACT 160x160 VENDOR CARDS */
.vendor-section {
    padding: 16px;
}

.vendor-section h2 {
    font-size: 18px;
    margin-bottom: 16px;
}

.vendor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
    width: 100%;
}

.vendor-card {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 6px;
    padding: 10px;
    width: 160px;
    height: 160px;
    cursor: pointer;
    transition: all 0.15s ease;
    display: flex;
    flex-direction: column;
    position: relative;
}

.vendor-card:hover {
    border-color: #94a3b8;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.vendor-card.selected {
    border-color: #3b82f6;
    background: #f0f9ff;
}

.vendor-card.portnox {
    border-color: #10b981;
}

/* Compact header */
.card-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
}

.card-logo {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
}

.card-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.card-name {
    font-size: 13px;
    font-weight: 600;
    color: #1e293b;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Score badge */
.card-score {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 10px;
    background: #f1f5f9;
    padding: 2px 6px;
    border-radius: 4px;
    color: #64748b;
}

/* TCO Display */
.card-tco {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 8px 0;
}

.tco-label {
    font-size: 10px;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 4px;
}

.tco-value {
    font-size: 22px;
    font-weight: 700;
    color: #10b981;
}

/* Compact actions */
.card-actions {
    display: flex;
    gap: 4px;
}

.card-btn {
    flex: 1;
    padding: 5px 8px;
    border: 1px solid #e5e7eb;
    background: white;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
    text-align: center;
}

.card-btn:hover {
    background: #f9fafb;
}

.card-btn.primary {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
}

/* Selected indicator */
.vendor-card.selected::after {
    content: '✓';
    position: absolute;
    top: 8px;
    left: 8px;
    width: 16px;
    height: 16px;
    background: #3b82f6;
    color: white;
    border-radius: 50%;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Portnox Pricing Slider */
.pricing-slider-section {
    background: white;
    padding: 20px;
    margin: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.pricing-slider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.pricing-slider-header h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
}

.pricing-display {
    font-size: 24px;
    font-weight: 700;
    color: #10b981;
}

.slider-container {
    position: relative;
}

.pricing-slider {
    width: 100%;
    height: 6px;
    -webkit-appearance: none;
    appearance: none;
    background: #e5e7eb;
    border-radius: 3px;
    outline: none;
}

.pricing-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #10b981;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.pricing-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #10b981;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 12px;
    color: #64748b;
}

/* Details Modal */
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
    padding: 20px;
}

.details-dialog {
    background: white;
    border-radius: 12px;
    width: 100%;
    max-width: 500px;
    max-height: 80vh;
    overflow: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.details-header {
    padding: 20px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.details-header h2 {
    margin: 0;
    font-size: 20px;
    color: #1e293b;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    color: #6b7280;
    cursor: pointer;
}

.details-content {
    padding: 20px;
}

.detail-section {
    margin-bottom: 24px;
}

.detail-section h3 {
    font-size: 14px;
    text-transform: uppercase;
    color: #64748b;
    margin: 0 0 12px 0;
    letter-spacing: 0.5px;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #f3f4f6;
}

.detail-label {
    color: #6b7280;
    font-size: 14px;
}

.detail-value {
    color: #1e293b;
    font-weight: 600;
    font-size: 14px;
}

.detail-row:last-child {
    border-bottom: none;
}
EOF

# 2. JavaScript with pricing slider and full details
cat > js/compact-vendor-cards.js << 'EOF'
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
EOF

# 3. Update index.html
# Remove old CSS
sed -i '/small-vendor-cards\.css/d' index.html

# Remove old JS
sed -i '/small-vendor-cards\.js/d' index.html

# Add new files
sed -i '/<link rel="stylesheet" href=".\/css\/ui-enhancements.css">/a\
    <link rel="stylesheet" href="./css/compact-vendor-cards.css">' index.html

sed -i '/<script src=".\/js\/test-all-features.js"><\/script>/a\
    <script src="./js/compact-vendor-cards.js"></script>' index.html

echo "✅ COMPLETE:"
echo "1. Vendor cards now 160x160px"
echo "2. Portnox pricing slider added (updates all calculations)"
echo "3. Full details modal with:"
echo "   - 3-Year TCO and Monthly costs"
echo "   - Per device/month pricing"
echo "   - FTE required and costs"
echo "   - Security scores and capabilities"
echo "   - Complete cost breakdown"
echo "4. Clean, compact design"

git add -A
git commit -m "160x160 vendor cards with pricing slider and full details

- Vendor cards shrunk to 160x160px
- Added Portnox pricing slider ($1-$10/device/month)
- Slider updates all calculations and charts
- Full details modal with comprehensive metrics
- Clean, professional design"