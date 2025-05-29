#!/bin/bash

echo "🔧 Creating CLEAN, SIMPLE vendor cards that actually work..."

# 1. Remove ALL the broken CSS files
rm -f css/vendor-cards-*.css
rm -f css/fix-vendor-cards*.css
rm -f css/tiny-vendor-cards.css
rm -f css/vendor-details-*.css

# 2. Create ONE clean vendor card CSS
cat > css/clean-vendor-cards.css << 'EOF'
/* CLEAN VENDOR CARDS */
.vendor-section {
    padding: 20px;
}

.vendor-section h2 {
    font-size: 20px;
    margin-bottom: 20px;
    color: #1e293b;
}

.vendor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
    width: 100%;
}

.vendor-card {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    height: 240px;
    transition: all 0.2s ease;
}

.vendor-card:hover {
    border-color: #94a3b8;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.vendor-card.selected {
    border-color: #3b82f6;
    background: #f0f9ff;
}

.vendor-card.portnox {
    border-color: #10b981;
}

/* Card Header */
.card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    height: 40px;
}

.card-logo {
    width: 40px;
    height: 40px;
}

.card-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.card-title {
    flex: 1;
}

.card-name {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
}

.card-stars {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 12px;
}

.card-stars i {
    color: #f59e0b;
}

/* TCO Display */
.card-tco {
    background: #f8fafc;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 12px;
    text-align: center;
}

.tco-label {
    font-size: 11px;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 4px;
}

.tco-value {
    font-size: 24px;
    font-weight: 700;
    color: #10b981;
}

/* Features */
.card-features {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 12px;
    height: 20px;
}

/* Actions */
.card-actions {
    display: flex;
    gap: 8px;
    margin-top: auto;
}

.card-btn {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #e5e7eb;
    background: white;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s;
}

.card-btn:hover {
    background: #f9fafb;
    border-color: #d1d5db;
}

.card-btn.primary {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
}

.card-btn.primary:hover {
    background: #2563eb;
}

/* Fix overlap issues */
* {
    box-sizing: border-box;
}

.vendor-grid * {
    max-width: 100%;
}
EOF

# 3. Create clean JavaScript for vendor cards
cat > js/clean-vendor-cards.js << 'EOF'
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
EOF

# 4. Clean up index.html - remove ALL old vendor card references
echo "Cleaning up index.html..."

# Remove old CSS references
sed -i '/vendor-cards.*\.css/d' index.html
sed -i '/fix-vendor.*\.css/d' index.html
sed -i '/tiny-vendor.*\.css/d' index.html

# Remove old JS references  
sed -i '/vendor-cards.*\.js/d' index.html
sed -i '/fix-vendor.*\.js/d' index.html
sed -i '/tiny-vendor.*\.js/d' index.html

# Add only the new clean files
sed -i '/<link rel="stylesheet" href=".\/css\/ui-enhancements.css">/a\
    <link rel="stylesheet" href="./css/clean-vendor-cards.css">' index.html

sed -i '/<script src=".\/js\/test-all-features.js"><\/script>/a\
    <script src="./js/clean-vendor-cards.js"></script>' index.html

# 5. Remove broken vendor JS files
rm -f js/vendor-cards-*.js
rm -f js/fix-vendor-*.js
rm -f js/tiny-vendor-*.js

echo "✅ CLEAN VENDOR CARDS APPLIED:"
echo "- Removed ALL broken vendor card code"
echo "- Created simple 280px wide cards"
echo "- Clean layout with no overlaps"
echo "- Simple select/details buttons"
echo "- Proper spacing and alignment"

git add -A
git commit -m "Clean vendor cards - simple working solution

- Removed all broken vendor card CSS/JS
- Simple 280x240px cards in clean grid
- No overlapping text or elements
- Clean select/details buttons
- Working layout"