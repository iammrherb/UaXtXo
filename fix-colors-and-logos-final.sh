#!/bin/bash

echo "🎨 Fixing colors to match Portnox EXACTLY and making logos LARGE..."

# Fix 1: CORRECT Portnox colors - NO TEAL, NO DARK MODE
cat > css/portnox-actual-colors.css << 'EOF'
/* ACTUAL Portnox Colors - NO TEAL */
:root {
    --portnox-green: #00D96F;  /* Portnox actual green */
    --portnox-purple: #8B5CF6;
    --portnox-purple-dark: #7C3AED;
    --portnox-blue: #3B82F6;
    --portnox-dark-text: #1F2937;
    --portnox-light-text: #6B7280;
    --portnox-bg: #F9FAFB;
    --portnox-white: #FFFFFF;
    --portnox-gray-light: #F3F4F6;
    --portnox-gray: #E5E7EB;
    --portnox-border: #D1D5DB;
    --portnox-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* LIGHT THEME ONLY */
body {
    background: var(--portnox-bg) !important;
    color: var(--portnox-dark-text) !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* ALL TEXT MUST BE DARK ON LIGHT */
h1, h2, h3, h4, h5, h6, p, span, div {
    color: var(--portnox-dark-text) !important;
}

/* Header - Dark background ONLY for header */
.premium-header {
    background: #2D3748;  /* Dark gray, not black */
    padding: 1rem 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

.header-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Header text is light on dark background */
.platform-title h1 {
    color: var(--portnox-green) !important;
    font-size: 1.75rem;
    font-weight: 400;
}

.subtitle-animated {
    color: #CBD5E0 !important;
    font-size: 0.875rem;
}

/* ALL CONTENT AREAS - LIGHT BACKGROUNDS */
.premium-platform {
    background: var(--portnox-bg) !important;
    padding-top: 80px;
}

.vendor-selection-bar,
.premium-nav,
.analysis-content,
.glass-card,
.metric-card,
.chart-container {
    background: var(--portnox-white) !important;
    box-shadow: var(--portnox-shadow);
    border-radius: 8px;
}

/* Vendor Pills - LIGHT with LARGE LOGOS */
.vendor-chip {
    background: var(--portnox-white) !important;
    border: 2px solid var(--portnox-gray);
    border-radius: 24px;
    padding: 0.75rem 1.25rem;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    min-height: 56px;
    transition: all 0.2s;
}

.vendor-chip:hover {
    border-color: var(--portnox-green);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 217, 111, 0.2);
}

.vendor-chip.portnox-chip {
    background: #F0FDF4 !important;
    border-color: var(--portnox-green);
}

/* LARGE VENDOR LOGOS */
.vendor-chip img {
    height: 36px !important;
    width: auto !important;
    max-width: 120px !important;
    object-fit: contain !important;
}

.vendor-chip .vendor-text {
    color: var(--portnox-dark-text) !important;
    font-weight: 500;
    font-size: 0.875rem;
}

/* Vendor Selector Modal - LARGE LOGOS */
.vendor-option {
    background: var(--portnox-white) !important;
    border: 2px solid var(--portnox-gray);
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
}

.vendor-option:hover {
    border-color: var(--portnox-green);
    transform: translateY(-2px);
}

.vendor-option img {
    height: 60px !important;
    width: auto !important;
    max-width: 160px !important;
    object-fit: contain !important;
    margin-bottom: 1rem;
}

/* Navigation Tabs */
.nav-tab {
    background: transparent;
    color: var(--portnox-light-text) !important;
    padding: 1rem;
    border-radius: 8px;
    transition: all 0.2s;
}

.nav-tab:hover {
    background: var(--portnox-gray-light);
}

.nav-tab.active {
    background: var(--portnox-purple) !important;
    color: white !important;
}

.nav-tab.active * {
    color: white !important;
}

/* Buttons - Purple theme */
.control-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white !important;
    padding: 0.625rem 1.25rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}

.control-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--portnox-green);
}

.control-btn.cost-controls,
.control-btn.demo {
    background: var(--portnox-purple);
    border-color: var(--portnox-purple);
}

.btn-primary {
    background: var(--portnox-purple) !important;
    color: white !important;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
}

.btn-primary:hover {
    background: var(--portnox-purple-dark) !important;
}

/* Add Competitor Button */
.add-vendor-btn {
    background: var(--portnox-green) !important;
    color: white !important;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

/* Pricing Bar - Keep at bottom */
.portnox-pricing-bar {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: #2D3748;
    border-radius: 12px;
    padding: 1rem 1.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 100;
}

.pricing-label {
    color: white !important;
}

.price-label {
    color: var(--portnox-green) !important;
    font-size: 1.25rem;
    font-weight: 700;
}

/* Fix all text visibility */
.vendor-selection-bar h3,
.vendor-selection-bar p,
.analysis-content h2,
.analysis-content h3,
.analysis-content p,
.metric-card h4,
.metric-card p {
    color: var(--portnox-dark-text) !important;
}

/* Modal backgrounds - LIGHT */
.modal-content {
    background: var(--portnox-white) !important;
}

.modal-header {
    background: var(--portnox-gray-light) !important;
    border-bottom: 1px solid var(--portnox-border);
}

.modal-header h2 {
    color: var(--portnox-dark-text) !important;
}

/* Remove ANY dark backgrounds except header and pricing bar */
.vendor-selector-modal .modal-content,
.settings-modal .modal-content,
.setting-item input,
.setting-item select {
    background: var(--portnox-white) !important;
    color: var(--portnox-dark-text) !important;
}
EOF

# Fix 2: Update vendor logo display with LARGER sizes
cat > js/views/vendor-logos-large.js << 'EOF'
// Make vendor logos LARGE and VISIBLE
(function() {
    console.log('📏 Making vendor logos LARGE...');
    
    // Fix vendor pills
    if (window.platform && window.platform.updateVendorSelection) {
        window.platform.updateVendorSelection = function() {
            const display = document.getElementById('selected-vendors-display');
            if (!display) return;
            
            display.innerHTML = this.selectedVendors.map(vendorKey => {
                const vendor = this.vendorDatabase[vendorKey];
                const isPortnox = vendorKey === 'portnox';
                
                // Map to correct logo files
                let logoFile = vendorKey + '-logo.png';
                if (vendorKey === 'cisco' || vendorKey === 'cisco_ise') logoFile = 'cisco-logo.png';
                if (vendorKey === 'aruba' || vendorKey === 'aruba_clearpass') logoFile = 'aruba-logo.png';
                
                return `
                    <div class="vendor-chip ${isPortnox ? 'portnox-chip' : ''}">
                        <img src="/img/vendors/${logoFile}" 
                             alt="${vendor?.name}" 
                             style="height: 36px !important; width: auto !important; max-width: 120px !important;">
                        <span class="vendor-text">${vendor?.name || vendorKey}</span>
                        ${!isPortnox ? `
                            <button class="remove-vendor" onclick="platform.removeVendor('${vendorKey}')" 
                                    style="background: none; border: none; color: #6B7280; cursor: pointer; font-size: 1.25rem; padding: 0 0 0 0.5rem;">
                                ×
                            </button>
                        ` : ''}
                    </div>
                `;
            }).join('');
        };
    }
    
    // Fix vendor selector modal
    if (window.platform && window.platform.renderVendorSelectorModal) {
        const original = window.platform.renderVendorSelectorModal;
        window.platform.renderVendorSelectorModal = function() {
            return `
                <div class="vendor-selector-modal modal-backdrop" id="vendor-selector-modal" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>Select Competitors to Compare</h2>
                            <button class="close-modal" onclick="platform.closeVendorSelector()" 
                                    style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">
                                ×
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Select up to ${this.maxAdditionalVendors} vendors to compare against Portnox</p>
                            <div class="vendor-selector-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; padding: 1rem 0;">
                                ${Object.entries(this.vendorDatabase).filter(([key]) => key !== 'portnox').map(([key, vendor]) => {
                                    let logoFile = key + '-logo.png';
                                    if (key === 'cisco' || key === 'cisco_ise') logoFile = 'cisco-logo.png';
                                    if (key === 'aruba' || key === 'aruba_clearpass') logoFile = 'aruba-logo.png';
                                    
                                    return `
                                        <div class="vendor-option ${this.selectedVendors.includes(key) ? 'selected' : ''}" 
                                             data-vendor="${key}" onclick="platform.toggleVendor('${key}')">
                                            <img src="/img/vendors/${logoFile}" 
                                                 alt="${vendor.name}" 
                                                 style="height: 60px !important; width: auto !important; max-width: 160px !important; object-fit: contain !important;">
                                            <h4 style="color: #1F2937; margin: 0.5rem 0;">${vendor.name}</h4>
                                            <p style="color: #6B7280; font-size: 0.875rem;">${vendor.category}</p>
                                            <span style="color: #00D96F; font-weight: 600;">$${vendor.pricing?.perDevice?.monthly || 10}/device/mo</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                        <div class="modal-footer" style="padding: 1.5rem; border-top: 1px solid #E5E7EB;">
                            <button class="btn-primary" onclick="platform.applyVendorSelection()">
                                Update Comparison
                            </button>
                        </div>
                    </div>
                </div>
            `;
        };
    }
    
    // Trigger update
    setTimeout(() => {
        if (window.platform && window.platform.updateVendorSelection) {
            window.platform.updateVendorSelection();
        }
    }, 500);
})();
EOF

# Update index.html
cat > fix-colors-final.sh << 'EOF'
#!/bin/bash

# Replace CSS file
sed -i 's/portnox-correct-theme\.css/portnox-actual-colors.css/g' index.html

# Add large logos JS
sed -i '/<script src="\.\/js\/views\/export-modal\.js"><\/script>/a\
    <script src="./js/views/vendor-logos-large.js"></script>' index.html

echo "✅ Colors and logos fixed"
EOF

chmod +x fix-colors-final.sh
./fix-colors-final.sh

# Commit
git add -A
git commit -m "Fix colors to actual Portnox green, remove teal, make logos LARGE, light theme everywhere"
git push

echo "✅ FIXED!"
echo ""
echo "Changes:"
echo "1. ✅ NO MORE TEAL - Using Portnox green (#00D96F)"
echo "2. ✅ NO DARK MODE - Everything is light except header"
echo "3. ✅ LARGE LOGOS - 36px in pills, 60px in modal"
echo "4. ✅ All text is dark on light backgrounds"
echo "5. ✅ Purple accents for buttons"
echo ""
echo "Refresh to see the correct colors and large logos!"
