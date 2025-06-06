#!/bin/bash

echo "🎨 Applying final Portnox UI fixes with exact brand colors..."

# Fix 1: Update CSS with exact Portnox colors from the image
cat > css/portnox-exact-colors.css << 'EOF'
/* Exact Portnox Brand Colors from UI */
:root {
    --portnox-teal: #00D4AA;
    --portnox-dark-bg: #1A1F2E;
    --portnox-darker-bg: #151922;
    --portnox-card-bg: #242937;
    --portnox-purple: #8B5CF6;
    --portnox-purple-light: #A78BFA;
    --portnox-text-light: #E5E7EB;
    --portnox-text-muted: #9CA3AF;
    --portnox-border: #374151;
    --portnox-gradient: linear-gradient(135deg, #00D4AA 0%, #00A080 100%);
    --portnox-purple-gradient: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
}

/* Global Reset for Dark Theme */
body {
    background: var(--portnox-dark-bg) !important;
    color: var(--portnox-text-light) !important;
}

/* Fixed Header - No sliding */
.premium-header {
    background: var(--portnox-darker-bg);
    border-bottom: 1px solid var(--portnox-border);
    padding: 1rem 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.header-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Brand Identity */
.brand-identity {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.portnox-logo-wrapper {
    height: 40px;
}

.portnox-logo {
    height: 40px;
    width: auto;
}

.platform-title h1 {
    font-size: 1.75rem;
    font-weight: 300;
    color: var(--portnox-teal);
    margin: 0;
    letter-spacing: -0.5px;
}

.platform-title h1::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 24px;
    background: var(--portnox-teal);
    margin-right: 12px;
    vertical-align: middle;
}

.subtitle-animated {
    font-size: 0.875rem;
    color: var(--portnox-text-muted);
    margin: 0;
    font-weight: 400;
}

/* Header Controls - Purple gradient buttons */
.header-controls {
    display: flex;
    gap: 1rem;
}

.control-btn {
    background: transparent;
    border: 1px solid var(--portnox-border);
    color: var(--portnox-text-light);
    padding: 0.5rem 1.25rem;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.control-btn:hover {
    background: var(--portnox-card-bg);
    border-color: var(--portnox-teal);
    color: var(--portnox-teal);
}

.control-btn i {
    font-size: 1rem;
}

.control-btn.demo {
    background: var(--portnox-purple-gradient);
    border: none;
    color: white;
}

.control-btn.demo:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
}

/* Main container adjustment */
.premium-platform {
    padding-top: 80px;
    background: var(--portnox-dark-bg);
    min-height: 100vh;
}

/* Vendor Selection Section */
.vendor-selection-bar {
    background: var(--portnox-card-bg);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 2rem;
    border: 1px solid var(--portnox-border);
}

.selection-info h3 {
    color: var(--portnox-text-light);
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.selection-info p {
    color: var(--portnox-text-muted);
    font-size: 0.875rem;
}

/* Compact Vendor Pills */
.selected-vendors-display {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin: 1rem 0;
}

.vendor-chip {
    background: var(--portnox-darker-bg);
    border: 1px solid var(--portnox-border);
    border-radius: 20px;
    padding: 0.375rem 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
    cursor: pointer;
    height: 36px;
}

.vendor-chip:hover {
    border-color: var(--portnox-teal);
    background: rgba(0, 212, 170, 0.1);
}

.vendor-chip.portnox-chip {
    background: rgba(0, 212, 170, 0.15);
    border-color: var(--portnox-teal);
}

.vendor-chip img {
    height: 20px;
    width: auto;
    max-width: 80px;
    object-fit: contain;
}

.vendor-chip .vendor-text {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--portnox-text-light);
}

.remove-vendor {
    background: none;
    border: none;
    color: var(--portnox-text-muted);
    cursor: pointer;
    padding: 0;
    margin-left: 0.25rem;
    font-size: 0.875rem;
}

.remove-vendor:hover {
    color: #EF4444;
}

/* Add Competitor Button */
.add-vendor-btn {
    background: transparent;
    border: 1px solid var(--portnox-teal);
    color: var(--portnox-teal);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.add-vendor-btn:hover {
    background: rgba(0, 212, 170, 0.1);
}

/* Navigation Tabs */
.premium-nav {
    background: var(--portnox-card-bg);
    border-radius: 12px;
    padding: 0.5rem;
    margin: 1.5rem 2rem;
    border: 1px solid var(--portnox-border);
    display: flex;
    gap: 0.5rem;
}

.nav-tab {
    background: transparent;
    border: none;
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    flex: 1;
    color: var(--portnox-text-muted);
}

.nav-tab:hover {
    background: var(--portnox-darker-bg);
    color: var(--portnox-text-light);
}

.nav-tab.active {
    background: var(--portnox-purple-gradient);
    color: white;
}

.nav-tab i {
    font-size: 1.25rem;
}

.nav-tab span {
    font-size: 0.875rem;
    font-weight: 500;
}

.tab-subtitle {
    font-size: 0.7rem;
    opacity: 0.8;
}

/* Analysis Content */
.analysis-content {
    background: var(--portnox-card-bg);
    border-radius: 12px;
    padding: 2rem;
    margin: 0 2rem;
    border: 1px solid var(--portnox-border);
}

/* Fixed Portnox Pricing Bar */
.portnox-pricing-bar {
    background: var(--portnox-card-bg);
    border: 1px solid var(--portnox-border);
    border-radius: 12px;
    padding: 1rem 1.5rem;
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 100;
    width: 280px;
}

.pricing-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.pricing-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.portnox-logo-small {
    height: 24px;
    width: auto;
}

.portnox-text {
    color: var(--portnox-teal);
    font-weight: 700;
    font-size: 0.875rem;
}

.pricing-control {
    flex: 1;
}

.price-label {
    color: var(--portnox-text-light);
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    display: block;
}

#portnox-pricing-slider {
    width: 100%;
    height: 4px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--portnox-darker-bg);
    border-radius: 2px;
    outline: none;
}

#portnox-pricing-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: var(--portnox-teal);
    border-radius: 50%;
    cursor: pointer;
}

#portnox-pricing-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: var(--portnox-teal);
    border-radius: 50%;
    cursor: pointer;
    border: none;
}

.price-range {
    display: flex;
    justify-content: space-between;
    color: var(--portnox-text-muted);
    font-size: 0.75rem;
    margin-top: 0.25rem;
}

/* Vendor Selector Modal */
.modal-backdrop {
    background: rgba(0, 0, 0, 0.8);
}

.modal-content {
    background: var(--portnox-card-bg);
    border: 1px solid var(--portnox-border);
}

.modal-header {
    background: var(--portnox-darker-bg);
    border-bottom: 1px solid var(--portnox-border);
    color: var(--portnox-text-light);
}

.vendor-selector-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
}

.vendor-option {
    background: var(--portnox-darker-bg);
    border: 1px solid var(--portnox-border);
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.vendor-option:hover {
    border-color: var(--portnox-teal);
    background: rgba(0, 212, 170, 0.05);
}

.vendor-option.selected {
    background: rgba(0, 212, 170, 0.1);
    border-color: var(--portnox-teal);
}

.vendor-option img {
    height: 40px;
    width: auto;
    max-width: 120px;
    object-fit: contain;
    margin-bottom: 0.75rem;
}

.vendor-option h4 {
    color: var(--portnox-text-light);
    font-size: 0.875rem;
    margin: 0.5rem 0;
}

.vendor-option p {
    color: var(--portnox-text-muted);
    font-size: 0.75rem;
}

.vendor-price {
    color: var(--portnox-teal);
    font-weight: 600;
    font-size: 0.875rem;
}

/* Cards and sections */
.glass-card {
    background: var(--portnox-card-bg);
    border: 1px solid var(--portnox-border);
    border-radius: 12px;
    padding: 2rem;
    color: var(--portnox-text-light);
}

.gradient-text {
    background: var(--portnox-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Fix text visibility */
h1, h2, h3, h4, h5, h6 {
    color: var(--portnox-text-light);
}

p {
    color: var(--portnox-text-muted);
}

/* Button styles */
.btn-primary {
    background: var(--portnox-purple-gradient);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
}

.btn-secondary {
    background: transparent;
    border: 1px solid var(--portnox-border);
    color: var(--portnox-text-light);
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-secondary:hover {
    background: var(--portnox-darker-bg);
    border-color: var(--portnox-teal);
    color: var(--portnox-teal);
}

/* Settings Modal */
.settings-modal .modal-content,
.vendor-selector-modal .modal-content {
    background: var(--portnox-card-bg);
    color: var(--portnox-text-light);
}

.setting-item label {
    color: var(--portnox-text-light);
}

.setting-item input,
.setting-item select {
    background: var(--portnox-darker-bg);
    border: 1px solid var(--portnox-border);
    color: var(--portnox-text-light);
}

.setting-item input:focus,
.setting-item select:focus {
    border-color: var(--portnox-teal);
    box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.1);
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: var(--portnox-darker-bg);
}

::-webkit-scrollbar-thumb {
    background: var(--portnox-teal);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #00A080;
}
EOF

# Fix 2: Update vendor logo handling with proper sizing
cat > js/views/vendor-logo-fixes.js << 'EOF'
// Fix vendor logos with proper paths and sizing
(function() {
    console.log('🖼️ Applying vendor logo fixes...');
    
    // Correct logo mappings
    const vendorLogoMap = {
        'portnox': 'portnox-logo.png',
        'cisco': 'cisco-logo.png',
        'cisco_ise': 'cisco-logo.png',
        'aruba': 'aruba-logo.png',
        'aruba_clearpass': 'aruba-logo.png',
        'microsoft': 'microsoft-logo.png',
        'juniper': 'juniper-logo.png',
        'forescout': 'forescout-logo.png',
        'arista': 'arista-logo.png',
        'securew2': 'securew2-logo.png',
        'extreme': 'extreme-logo.png',
        'foxpass': 'foxpass-logo.png',
        'fortinet': 'fortinet-logo.png',
        'radiusaas': 'radiussaas-logo.png',
        'pulse': 'pulse-logo.png',
        'packetfence': 'packetfence-logo.png'
    };
    
    // Override updateVendorSelection for proper logo display
    const fixVendorDisplay = () => {
        if (window.platform && window.platform.updateVendorSelection) {
            window.platform.updateVendorSelection = function() {
                const display = document.getElementById('selected-vendors-display');
                if (!display) return;
                
                display.innerHTML = this.selectedVendors.map(vendorKey => {
                    const vendor = this.vendorDatabase[vendorKey];
                    const isPortnox = vendorKey === 'portnox';
                    const logoFile = vendorLogoMap[vendorKey] || vendorLogoMap[vendorKey.replace('_', '')] || 'no-nac-logo.png';
                    
                    return `
                        <div class="vendor-chip ${isPortnox ? 'portnox-chip' : ''}" title="${vendor?.name}">
                            <img src="/img/vendors/${logoFile}" 
                                 alt="${vendor?.name}" 
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                            <span class="vendor-text" style="display:none">${vendor?.name || vendorKey}</span>
                            ${!isPortnox ? `
                                <button class="remove-vendor" onclick="platform.removeVendor('${vendorKey}')">
                                    <i class="fas fa-times"></i>
                                </button>
                            ` : ''}
                        </div>
                    `;
                }).join('');
            };
        }
    };
    
    // Fix pricing bar to include Portnox logo
    const fixPricingBar = () => {
        const pricingBar = document.querySelector('.portnox-pricing-bar');
        if (pricingBar) {
            pricingBar.innerHTML = `
                <div class="pricing-container">
                    <div class="pricing-label">
                        <img src="/img/vendors/portnox-logo.png" alt="Portnox" class="portnox-logo-small">
                        <span class="portnox-text">Pricing</span>
                    </div>
                    <div class="pricing-control">
                        <span class="price-label">$<span id="portnox-price-display">${window.platform?.portnoxPricing?.toFixed(2) || '3.50'}</span>/device/mo</span>
                        <input type="range" id="portnox-pricing-slider" 
                               min="1" max="8" step="0.25" value="${window.platform?.portnoxPricing || 3.50}">
                        <div class="price-range">
                            <span>$1.00</span>
                            <span>$8.00</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Re-bind events
            const slider = document.getElementById('portnox-pricing-slider');
            if (slider && window.platform) {
                slider.addEventListener('input', (e) => {
                    window.platform.portnoxPricing = parseFloat(e.target.value);
                    document.getElementById('portnox-price-display').textContent = window.platform.portnoxPricing.toFixed(2);
                    if (window.platform.vendorDatabase.portnox) {
                        window.platform.vendorDatabase.portnox.pricing.perDevice.monthly = window.platform.portnoxPricing;
                        window.platform.vendorDatabase.portnox.pricing.perDevice.annual = window.platform.portnoxPricing * 12;
                    }
                    window.platform.calculate();
                });
            }
        }
    };
    
    // Apply fixes after delay
    setTimeout(() => {
        fixVendorDisplay();
        fixPricingBar();
        
        // Trigger update
        if (window.platform && window.platform.updateVendorSelection) {
            window.platform.updateVendorSelection();
        }
    }, 1000);
})();
EOF

# Fix 3: Update the header with fixed positioning
cat > js/views/header-position-fix.js << 'EOF'
// Fix header positioning
(function() {
    console.log('🔧 Fixing header position...');
    
    // Ensure header stays fixed
    const fixHeaderPosition = () => {
        const header = document.querySelector('.premium-header');
        if (header) {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.right = '0';
            header.style.zIndex = '1000';
        }
        
        // Fix container padding
        const container = document.querySelector('.premium-platform');
        if (container) {
            container.style.paddingTop = '80px';
        }
    };
    
    // Apply fix immediately and after DOM changes
    fixHeaderPosition();
    
    // Monitor for DOM changes
    const observer = new MutationObserver(fixHeaderPosition);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Also fix on window events
    window.addEventListener('load', fixHeaderPosition);
    window.addEventListener('resize', fixHeaderPosition);
})();
EOF

# Update index.html
cat > add-final-fixes.sh << 'EOF'
#!/bin/bash

# Add new CSS file
sed -i '/<link rel="stylesheet" href="\.\/css\/portnox-modern-ui\.css">/a\
    <link rel="stylesheet" href="./css/portnox-exact-colors.css">' index.html

# Add new JS files
sed -i '/<script src="\.\/js\/views\/vendor-modal-fix\.js"><\/script>/a\
    <script src="./js/views/vendor-logo-fixes.js"></script>\
    <script src="./js/views/header-position-fix.js"></script>' index.html

echo "✅ Final fixes added to index.html"
EOF

chmod +x add-final-fixes.sh
./add-final-fixes.sh

# Fix the logo path issue for cisco_ise and aruba_clearpass
cd img/vendors
ln -sf cisco-logo.png cisco_ise-logo.png 2>/dev/null || cp cisco-logo.png cisco_ise-logo.png
ln -sf aruba-logo.png aruba_clearpass-logo.png 2>/dev/null || cp aruba-logo.png aruba_clearpass-logo.png
cd ../..

# Commit all changes
git add -A
git commit -m "Final UI fixes: exact Portnox colors, fixed header, proper logo sizing, dark theme"
git push

echo "✅ Final UI fixes complete!"
echo ""
echo "Fixed:"
echo "1. ✅ Exact Portnox colors matching your image (dark theme)"
echo "2. ✅ Fixed header position (no sliding)"
echo "3. ✅ Smaller vendor pills with visible logos"
echo "4. ✅ Portnox logo in pricing control"
echo "5. ✅ Better contrast for text visibility"
echo "6. ✅ Purple gradient for buttons (matching UI)"
echo "7. ✅ Fixed logo 404 errors"
echo ""
echo "Refresh your browser to see the final Portnox-branded UI!"
