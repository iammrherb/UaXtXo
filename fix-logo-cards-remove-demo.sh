#!/bin/bash

echo "🔧 Fixing logo, vendor cards, and removing Live Demo button..."

# 1. FIX THE LOGO - SHOW ACTUAL PORTNOX LOGO
cat > css/fix-portnox-logo-final.css << 'EOF'
/* FIX PORTNOX LOGO - SHOW ACTUAL IMAGE */
.portnox-logo {
    position: relative !important;
    background: transparent !important;
    padding: 0 !important;
    box-shadow: none !important;
    border: none !important;
    display: flex;
    align-items: center;
}

.portnox-logo img {
    height: 40px !important;
    width: auto !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    /* Remove any filters that make it white */
    filter: none !important;
}

/* Remove any white box or pill styling */
.portnox-logo::before,
.portnox-logo::after {
    display: none !important;
}

/* Hide Live Demo button */
#live-demo,
.header-btn.highlight {
    display: none !important;
}
EOF

# 2. FIX VENDOR CARDS TO SHOW ALL DATA PROPERLY
cat > js/fix-vendor-cards-complete.js << 'EOF'
// COMPLETE FIX FOR VENDOR CARDS
document.addEventListener('DOMContentLoaded', function() {
    if (window.dashboard) {
        window.dashboard.renderVendorCards = function() {
            const vendorGrid = document.getElementById('vendor-grid');
            if (!vendorGrid || !this.vendorData) return;
            
            const vendors = Object.values(this.vendorData).sort((a, b) => b.score - a.score);
            
            vendorGrid.innerHTML = vendors.map(vendor => {
                const isSelected = this.selectedVendors.includes(vendor.key);
                const isPortnox = vendor.key === 'portnox';
                
                // Get per device pricing
                let perDevicePrice = '$3.5';
                if (vendor.pricing && vendor.pricing.perDevice) {
                    perDevicePrice = `$${vendor.pricing.perDevice}`;
                } else if (vendor.key === 'portnox') {
                    perDevicePrice = `$${this.config.portnoxPricing || 3.5}`;
                }
                
                return `
                    <div class="vendor-card ${isPortnox ? 'portnox' : ''} ${isSelected ? 'selected' : ''}">
                        <div class="vendor-header">
                            <div class="vendor-logo">
                                <img src="./img/vendors/${vendor.key}-logo.png" alt="${vendor.name}" 
                                     onerror="this.src='./img/vendors/default-logo.png'">
                            </div>
                            <div class="vendor-info">
                                <h4>${vendor.name}</h4>
                                <div class="vendor-rating">
                                    ${this.renderStars(vendor.score / 20)}
                                    <span class="score-badge">${vendor.score}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="vendor-metrics-row">
                            <div class="metric-box tco">
                                <div class="metric-label">3-YEAR TCO</div>
                                <div class="metric-value" style="color: #10b981;">$${(vendor.tco.tco / 1000).toFixed(0)}K</div>
                            </div>
                            <div class="metric-box price">
                                <div class="metric-label">PER DEVICE/MO</div>
                                <div class="metric-value" style="color: #3b82f6;">${perDevicePrice}</div>
                            </div>
                        </div>
                        
                        <div class="vendor-metrics-row">
                            <div class="metric-box deploy">
                                <div class="metric-label">DEPLOY</div>
                                <div class="metric-value">${vendor.metrics.implementationDays}</div>
                            </div>
                            <div class="metric-box fte">
                                <div class="metric-label">FTE</div>
                                <div class="metric-value">${vendor.metrics.fteRequired}</div>
                            </div>
                        </div>
                        
                        <div class="vendor-features">
                            ${vendor.metrics.cloudNative ? '<span class="feature-tag cloud">CLOUD NATIVE</span>' : ''}
                            ${vendor.metrics.zeroTrustScore >= 85 ? '<span class="feature-tag zt">ZERO TRUST</span>' : ''}
                            ${vendor.metrics.automationLevel >= 85 ? '<span class="feature-tag auto">AUTOMATED</span>' : ''}
                        </div>
                        
                        <div class="vendor-actions">
                            <button class="vendor-btn ${isSelected ? 'selected' : ''}" 
                                    onclick="dashboard.toggleVendor('${vendor.key}')">
                                <i class="fas ${isSelected ? 'fa-check' : 'fa-plus'}"></i>
                                ${isSelected ? 'Selected' : 'Select'}
                            </button>
                            <button class="vendor-btn details" onclick="dashboard.showVendorDetails('${vendor.key}')">
                                <i class="fas fa-info-circle"></i> Details
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        };
        
        // Refresh display
        if (window.dashboard.vendorData) {
            window.dashboard.renderVendorCards();
        }
    }
});
EOF

# 3. PROPER VENDOR CARD STYLING
cat > css/vendor-cards-proper.css << 'EOF'
/* VENDOR CARDS WITH ALL DATA */
.vendor-card {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    min-height: 380px;
    display: flex;
    flex-direction: column;
}

.vendor-card.portnox {
    border-color: #3b82f6;
    background: #f0f9ff;
}

.vendor-card.selected {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.vendor-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}

.vendor-logo {
    width: 50px;
    height: 50px;
}

.vendor-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.vendor-info h4 {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 4px 0;
}

.vendor-rating {
    display: flex;
    align-items: center;
    gap: 4px;
}

.vendor-rating i {
    font-size: 14px;
    color: #facc15;
}

.score-badge {
    font-size: 13px;
    color: #64748b;
    margin-left: 4px;
}

/* Metrics rows */
.vendor-metrics-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
}

.metric-box {
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 12px;
    text-align: center;
}

.metric-label {
    font-size: 11px;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.5px;
    font-weight: 500;
    margin-bottom: 8px;
}

.metric-value {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
}

/* Feature tags */
.vendor-features {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 16px 0;
    min-height: 28px;
}

.feature-tag {
    font-size: 11px;
    padding: 4px 10px;
    border-radius: 6px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.feature-tag.cloud {
    background: #dbeafe;
    color: #1e40af;
}

.feature-tag.zt {
    background: #fef3c7;
    color: #92400e;
}

.feature-tag.auto {
    background: #ede9fe;
    color: #5b21b6;
}

/* Actions */
.vendor-actions {
    display: flex;
    gap: 8px;
    margin-top: auto;
}

.vendor-btn {
    flex: 1;
    padding: 10px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #e5e7eb;
    background: white;
    color: #374151;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.vendor-btn.selected {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
}

.vendor-btn:hover:not(.selected) {
    background: #f9fafb;
    border-color: #d1d5db;
}
EOF

# 4. Remove the vendor pills that were hiding the logo
cat > js/remove-vendor-pills.js << 'EOF'
// Remove vendor pills from header area
document.addEventListener('DOMContentLoaded', function() {
    // Remove any vendor pills in the header
    const vendorPills = document.querySelector('.vendor-selection-container');
    if (vendorPills) {
        vendorPills.remove();
    }
    
    // Make sure logo is visible
    const logo = document.querySelector('.portnox-logo img');
    if (logo) {
        logo.style.display = 'block';
        logo.style.visibility = 'visible';
        logo.style.opacity = '1';
    }
});
EOF

# 5. Update index.html
echo "Updating index.html..."

# Add our fixes
sed -i '/<link rel="stylesheet" href=".\/css\/ui-enhancements.css">/a\
    <link rel="stylesheet" href="./css/fix-portnox-logo-final.css">\
    <link rel="stylesheet" href="./css/vendor-cards-proper.css">' index.html

sed -i '/<script src=".\/js\/test-all-features.js"><\/script>/a\
    <script src="./js/fix-vendor-cards-complete.js"></script>\
    <script src="./js/remove-vendor-pills.js"></script>' index.html

echo "✅ FIXED:"
echo "1. Portnox logo now visible (removed white pill/box)"
echo "2. Vendor cards show ALL data in proper layout"
echo "3. Live Demo button removed"
echo "4. Clean professional design"

git add -A
git commit -m "Fix logo visibility, vendor cards data, remove Live Demo

- Portnox logo now shows actual image (no white box)
- Vendor cards display all metrics properly
- Live Demo button removed
- Clean layout matching screenshots"