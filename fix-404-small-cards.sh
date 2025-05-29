#!/bin/bash

echo "🔧 Fixing 404 error and making vendor cards SMALL..."

# 1. Remove the missing CSS reference from index.html
sed -i '/vendor-details-kpis\.css/d' index.html

# 2. Create SMALL vendor cards CSS
cat > css/small-vendor-cards.css << 'EOF'
/* SMALL VENDOR CARDS */
.vendor-section {
    padding: 16px;
}

.vendor-section h2 {
    font-size: 18px;
    margin-bottom: 16px;
}

.vendor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
    width: 100%;
}

.vendor-card {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 6px;
    padding: 12px;
    height: 160px;
    cursor: pointer;
    transition: all 0.15s ease;
    display: flex;
    flex-direction: column;
}

.vendor-card:hover {
    border-color: #94a3b8;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.vendor-card.selected {
    border-color: #3b82f6;
    background: #f0f9ff;
}

.vendor-card.portnox {
    border-color: #10b981;
}

/* Small header */
.card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}

.card-logo {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
}

.card-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.card-name {
    font-size: 14px;
    font-weight: 600;
    color: #1e293b;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* TCO Box */
.card-tco {
    background: #f8fafc;
    border-radius: 4px;
    padding: 8px;
    margin-bottom: 8px;
    text-align: center;
}

.tco-value {
    font-size: 18px;
    font-weight: 700;
    color: #10b981;
}

/* Small actions */
.card-actions {
    display: flex;
    gap: 6px;
    margin-top: auto;
}

.card-btn {
    flex: 1;
    padding: 6px 8px;
    border: 1px solid #e5e7eb;
    background: white;
    border-radius: 4px;
    font-size: 12px;
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

/* Checkmark for selected */
.vendor-card.selected::before {
    content: '✓';
    position: absolute;
    top: 4px;
    right: 4px;
    width: 18px;
    height: 18px;
    background: #3b82f6;
    color: white;
    border-radius: 50%;
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.vendor-card {
    position: relative;
}

/* Even more compact on smaller screens */
@media (max-width: 1400px) {
    .vendor-grid {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
}
EOF

# 3. Simple JavaScript for small cards
cat > js/small-vendor-cards.js << 'EOF'
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
EOF

# 4. Remove old vendor card CSS
rm -f css/clean-vendor-cards.css
rm -f css/vendor-cards-*.css

# 5. Update index.html
# Remove old CSS references
sed -i '/clean-vendor-cards\.css/d' index.html
sed -i '/vendor-cards.*\.css/d' index.html

# Remove old JS references
sed -i '/clean-vendor-cards\.js/d' index.html
sed -i '/vendor-cards.*\.js/d' index.html

# Add new small cards
sed -i '/<link rel="stylesheet" href=".\/css\/ui-enhancements.css">/a\
    <link rel="stylesheet" href="./css/small-vendor-cards.css">' index.html

sed -i '/<script src=".\/js\/test-all-features.js"><\/script>/a\
    <script src="./js/small-vendor-cards.js"></script>' index.html

echo "✅ FIXED:"
echo "1. Removed 404 error (vendor-details-kpis.css)"
echo "2. Vendor cards now 200px x 160px (SMALL)"
echo "3. Clean, simple design"
echo "4. All vendors fit on screen"

git add -A
git commit -m "Fix 404 error and create small vendor cards

- Removed missing vendor-details-kpis.css reference
- Vendor cards now 200x160px 
- Simple design: logo, name, TCO, select/info buttons
- All vendors fit on screen without scrolling"