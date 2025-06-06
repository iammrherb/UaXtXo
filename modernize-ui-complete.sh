#!/bin/bash

echo "🎨 Modernizing UI with Portnox branding..."

# Fix 1: Update vendor database to use correct logo filenames
cat > js/views/fix-vendor-logos.js << 'EOF'
// Fix vendor logo paths
(function() {
    console.log('🖼️ Fixing vendor logo paths...');
    
    // Map vendor IDs to correct logo filenames
    const logoMap = {
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
    
    // Update getVendorLogo function if it exists
    window.getVendorLogo = function(vendorId) {
        return `/img/vendors/${logoMap[vendorId] || 'no-nac-logo.png'}`;
    };
    
    console.log('✅ Vendor logo paths fixed');
})();
EOF

# Fix 2: Modern Portnox-branded CSS
cat > css/portnox-modern-ui.css << 'EOF'
/* Portnox Brand Colors */
:root {
    --portnox-primary: #00D4AA;
    --portnox-dark: #00A080;
    --portnox-darker: #007A5C;
    --portnox-light: #E6FAF6;
    --portnox-gradient: linear-gradient(135deg, #00D4AA 0%, #00A080 100%);
    --portnox-gradient-dark: linear-gradient(135deg, #00A080 0%, #007A5C 100%);
}

/* Compact Modern Header */
.premium-header {
    background: var(--portnox-gradient);
    padding: 0.75rem 0;
    box-shadow: 0 2px 10px rgba(0, 212, 170, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

.header-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
}

/* Brand Identity */
.brand-identity {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.portnox-logo-wrapper {
    background: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    height: 44px;
}

.portnox-logo {
    height: 28px;
    width: auto;
}

.platform-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.platform-title h1 {
    font-size: 1.5rem;
    font-weight: 800;
    color: white;
    margin: 0;
    line-height: 1.2;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.subtitle-animated {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-weight: 500;
}

/* Compact Header Controls */
.header-controls {
    display: flex;
    gap: 0.75rem;
}

.control-btn {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 36px;
}

.control-btn:hover {
    background: white;
    color: var(--portnox-dark);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.control-btn.demo {
    background: white;
    color: var(--portnox-dark);
    border: none;
    font-weight: 700;
}

.control-btn.demo:hover {
    background: var(--portnox-light);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 212, 170, 0.4);
}

/* Content adjustment for fixed header */
.app-container,
.premium-platform {
    padding-top: 76px;
}

/* Modern Vendor Selection Pills */
.vendor-selection-bar {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1rem 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 212, 170, 0.1);
}

.selected-vendors-display {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.vendor-chip {
    background: white;
    border: 2px solid #E9ECEF;
    border-radius: 24px;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
    cursor: pointer;
}

.vendor-chip:hover {
    border-color: var(--portnox-primary);
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 212, 170, 0.2);
}

.vendor-chip.portnox-chip {
    background: var(--portnox-light);
    border-color: var(--portnox-primary);
    font-weight: 600;
}

.vendor-chip img {
    height: 20px;
    width: auto;
    object-fit: contain;
}

.vendor-chip .vendor-text {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--dark);
}

.remove-vendor {
    background: none;
    border: none;
    color: #6C757D;
    cursor: pointer;
    padding: 0;
    margin-left: 0.5rem;
    transition: color 0.2s;
}

.remove-vendor:hover {
    color: var(--danger);
}

/* Compact Portnox Pricing Bar */
.portnox-pricing-bar {
    background: var(--portnox-gradient);
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    margin: 1rem 0;
    box-shadow: 0 2px 8px rgba(0, 212, 170, 0.2);
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 100;
    max-width: 320px;
}

.pricing-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.pricing-label {
    display: flex;
    flex-direction: column;
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
}

.portnox-text {
    font-size: 0.875rem;
    font-weight: 800;
}

.pricing-control {
    flex: 1;
}

.price-label {
    color: white;
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 0.25rem;
    display: block;
}

#portnox-pricing-slider {
    width: 100%;
    height: 6px;
    -webkit-appearance: none;
    appearance: none;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    outline: none;
}

#portnox-pricing-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

#portnox-pricing-slider::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border: none;
}

.price-range {
    display: flex;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.7rem;
    margin-top: 0.25rem;
}

/* Navigation Tabs */
.premium-nav {
    background: white;
    border-radius: 12px;
    padding: 0.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    display: flex;
    gap: 0.5rem;
}

.nav-tab {
    background: transparent;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    flex: 1;
}

.nav-tab:hover {
    background: var(--portnox-light);
}

.nav-tab.active {
    background: var(--portnox-gradient);
    color: white;
    box-shadow: 0 2px 8px rgba(0, 212, 170, 0.3);
}

.nav-tab i {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
}

.nav-tab span {
    font-size: 0.875rem;
    font-weight: 600;
}

.tab-subtitle {
    font-size: 0.7rem;
    opacity: 0.8;
    font-weight: 400;
}

/* Modern Cards */
.glass-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 212, 170, 0.1);
}

.gradient-text {
    background: var(--portnox-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 800;
}

/* Vendor Pills Modal */
.vendor-pill {
    transition: all 0.2s ease;
}

.vendor-pill.selected {
    background: var(--portnox-light);
    border-color: var(--portnox-primary);
    box-shadow: 0 2px 8px rgba(0, 212, 170, 0.2);
}

.vendor-pill-score {
    background: var(--portnox-gradient);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 16px;
    font-size: 0.75rem;
    font-weight: 700;
}

.vendor-badge {
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
}

.badge-cloud-native { 
    background: var(--portnox-light); 
    color: var(--portnox-dark); 
}

.badge-zero-trust { 
    background: #E8F5E9; 
    color: #2E7D32; 
}

.badge-automated { 
    background: #FFF3E0; 
    color: #E65100; 
}

/* Settings/Cost Controls Button Specific */
.control-btn.settings {
    background: rgba(255, 255, 255, 0.2);
}

.control-btn.settings:hover {
    background: white;
    color: var(--portnox-dark);
}

/* Fix vendor images in pills */
.vendor-pill img,
.selected-vendor-chip img {
    height: 24px;
    width: auto;
    object-fit: contain;
    max-width: 100px;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
    .platform-title h1 {
        font-size: 1.25rem;
    }
    
    .subtitle-animated {
        display: none;
    }
    
    .control-btn span {
        display: none;
    }
    
    .control-btn {
        padding: 0.5rem;
    }
}

/* Animation for loading */
@keyframes slideIn {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.premium-header {
    animation: slideIn 0.3s ease-out;
}

/* Modern scrollbar */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #F8F9FA;
}

::-webkit-scrollbar-thumb {
    background: var(--portnox-primary);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--portnox-dark);
}
EOF

# Fix 3: Update the header layout in premium-executive-platform.js
cat > js/views/header-layout-fix.js << 'EOF'
// Fix header layout
(function() {
    console.log('🎨 Updating header layout...');
    
    const updateHeader = () => {
        // Wait for platform to be ready
        if (window.platform && window.platform.setupPremiumUI) {
            const original = window.platform.setupPremiumUI;
            window.platform.setupPremiumUI = function() {
                const app = document.getElementById('app-container') || document.body;
                app.innerHTML = `
                    <div class="premium-platform ultimate-visual">
                        <!-- Compact Modern Header -->
                        <header class="premium-header">
                            <div class="header-container">
                                <div class="brand-identity">
                                    <div class="portnox-logo-wrapper">
                                        <img src="/img/vendors/portnox-logo.png" alt="Portnox" class="portnox-logo">
                                    </div>
                                    <div class="platform-title">
                                        <h1>Executive Decision Platform</h1>
                                        <p class="subtitle-animated">Zero Trust NAC Investment Analysis</p>
                                    </div>
                                </div>
                                <div class="header-controls">
                                    <button class="control-btn settings" onclick="platform.openSettings()">
                                        <i class="fas fa-sliders-h"></i>
                                        <span>Cost Controls</span>
                                    </button>
                                    <button class="control-btn calculate" onclick="platform.calculate()">
                                        <i class="fas fa-calculator"></i>
                                        <span>Recalculate</span>
                                    </button>
                                    <button class="control-btn export" onclick="platform.exportAnalysis()">
                                        <i class="fas fa-download"></i>
                                        <span>Export</span>
                                    </button>
                                    <button class="control-btn demo" onclick="platform.scheduleDemo()">
                                        <i class="fas fa-rocket"></i>
                                        <span>Schedule Demo</span>
                                    </button>
                                </div>
                            </div>
                        </header>
                        
                        <!-- Vendor Selection Bar -->
                        <div class="vendor-selection-bar">
                            <div class="selection-container">
                                <div class="selection-info">
                                    <h3>Vendor Comparison</h3>
                                    <p>Portnox + select up to ${this.maxAdditionalVendors} competitors</p>
                                </div>
                                <div class="selected-vendors-display" id="selected-vendors-display">
                                    <!-- Vendors display here -->
                                </div>
                                <button class="add-vendor-btn hover-lift" onclick="platform.openVendorSelector()">
                                    <i class="fas fa-plus-circle"></i>
                                    Add Competitor
                                </button>
                            </div>
                        </div>
                        
                        <!-- Navigation and Content -->
                        <div class="analysis-container">
                            <nav class="premium-nav">
                                <button class="nav-tab active" data-tab="financial-overview" onclick="platform.switchTab('financial-overview')">
                                    <i class="fas fa-chart-line"></i>
                                    <span>Financial Overview</span>
                                    <span class="tab-subtitle">TCO & ROI Analysis</span>
                                </button>
                                <button class="nav-tab" data-tab="risk-assessment" onclick="platform.switchTab('risk-assessment')">
                                    <i class="fas fa-shield-virus"></i>
                                    <span>Risk & Security</span>
                                    <span class="tab-subtitle">Breach & Incident Impact</span>
                                </button>
                                <button class="nav-tab" data-tab="compliance-analysis" onclick="platform.switchTab('compliance-analysis')">
                                    <i class="fas fa-clipboard-check"></i>
                                    <span>Compliance</span>
                                    <span class="tab-subtitle">Regulatory Alignment</span>
                                </button>
                                <button class="nav-tab" data-tab="operational-impact" onclick="platform.switchTab('operational-impact')">
                                    <i class="fas fa-cogs"></i>
                                    <span>Operational</span>
                                    <span class="tab-subtitle">Efficiency & Timeline</span>
                                </button>
                                <button class="nav-tab" data-tab="strategic-insights" onclick="platform.switchTab('strategic-insights')">
                                    <i class="fas fa-lightbulb"></i>
                                    <span>Strategic Insights</span>
                                    <span class="tab-subtitle">Recommendations</span>
                                </button>
                            </nav>
                            
                            <div class="analysis-content glass-content" id="analysis-content">
                                <!-- Dynamic content -->
                            </div>
                        </div>
                        
                        <!-- Settings Modal -->
                        ${this.renderSettingsModal()}
                        
                        <!-- Vendor Selector Modal -->
                        ${this.renderVendorSelectorModal()}
                        
                        <!-- Compact Portnox Pricing Control -->
                        <div class="portnox-pricing-bar">
                            <div class="pricing-container">
                                <div class="pricing-label">
                                    <span class="portnox-text">PORTNOX</span>
                                    <span>Pricing</span>
                                </div>
                                <div class="pricing-control">
                                    <span class="price-label">$<span id="portnox-price-display">${this.portnoxPricing.toFixed(2)}</span>/device/mo</span>
                                    <input type="range" id="portnox-pricing-slider" 
                                           min="1" max="8" step="0.25" value="${this.portnoxPricing}">
                                    <div class="price-range">
                                        <span>$1.00</span>
                                        <span>$8.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Call original init functions
                this.bindEvents();
                this.updateVendorSelection();
                this.calculate();
                
                // Set initial tab after a short delay
                setTimeout(() => {
                    this.switchTab('financial-overview');
                }, 100);
            };
        }
    };
    
    // Try to update after a delay
    setTimeout(updateHeader, 500);
})();
EOF

# Fix 4: Update vendor selection display to use correct logos
cat > js/views/vendor-selection-fix.js << 'EOF'
// Fix vendor selection display
(function() {
    console.log('🔧 Fixing vendor selection display...');
    
    const fixVendorSelection = () => {
        if (window.platform && window.platform.updateVendorSelection) {
            const original = window.platform.updateVendorSelection;
            window.platform.updateVendorSelection = function() {
                const display = document.getElementById('selected-vendors-display');
                if (!display) return;
                
                display.innerHTML = this.selectedVendors.map(vendorKey => {
                    const vendor = this.vendorDatabase[vendorKey];
                    const isPortnox = vendorKey === 'portnox';
                    const logoPath = window.getVendorLogo ? window.getVendorLogo(vendorKey) : 
                                   `/img/vendors/${vendorKey === 'cisco' ? 'cisco-logo.png' : 
                                                  vendorKey === 'aruba' ? 'aruba-logo.png' :
                                                  vendorKey + '-logo.png'}`;
                    
                    return `
                        <div class="vendor-chip ${isPortnox ? 'portnox-chip' : ''}">
                            <img src="${logoPath}" alt="${vendor?.name}" 
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                            <span class="vendor-text" style="display:none">${vendor?.name || vendorKey}</span>
                            <span class="vendor-text">${vendor?.name || vendorKey}</span>
                            ${!isPortnox ? `
                                <button class="remove-vendor" onclick="platform.removeVendor('${vendorKey}')">
                                    <i class="fas fa-times"></i>
                                </button>
                            ` : ''}
                        </div>
                    `;
                }).join('');
            };
            
            // Trigger update
            if (window.platform.updateVendorSelection) {
                window.platform.updateVendorSelection();
            }
        }
    };
    
    // Apply fix after delay
    setTimeout(fixVendorSelection, 1000);
})();
EOF

# Fix 5: Update the vendor selector modal to use correct logos
cat > js/views/vendor-modal-fix.js << 'EOF'
// Fix vendor modal logos
(function() {
    const fixVendorModal = () => {
        if (window.platform && window.platform.renderVendorSelectorModal) {
            const original = window.platform.renderVendorSelectorModal;
            window.platform.renderVendorSelectorModal = function() {
                return `
                    <div class="vendor-selector-modal modal-backdrop" id="vendor-selector-modal" style="display: none;">
                        <div class="modal-content glass-modal animated-modal">
                            <div class="modal-header">
                                <h2>Select Competitors to Compare</h2>
                                <button class="close-modal" onclick="platform.closeVendorSelector()">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p class="selector-hint">Select up to ${this.maxAdditionalVendors} vendors to compare against Portnox</p>
                                <div class="vendor-selector-grid" id="vendor-selector-grid">
                                    ${Object.entries(this.vendorDatabase).filter(([key]) => key !== 'portnox').map(([key, vendor]) => {
                                        const logoPath = window.getVendorLogo ? window.getVendorLogo(key) : 
                                                       `/img/vendors/${key === 'cisco' || key === 'cisco_ise' ? 'cisco-logo.png' : 
                                                                      key === 'aruba' || key === 'aruba_clearpass' ? 'aruba-logo.png' :
                                                                      key + '-logo.png'}`;
                                        return `
                                            <div class="vendor-option ${this.selectedVendors.includes(key) ? 'selected' : ''}" 
                                                 data-vendor="${key}" onclick="platform.toggleVendor('${key}')">
                                                <div class="vendor-option-content">
                                                    <img src="${logoPath}" alt="${vendor.name}" style="height: 30px; margin-bottom: 8px;">
                                                    <h4>${vendor.name}</h4>
                                                    <p>${vendor.category} - Score: ${vendor.score}</p>
                                                    <span class="vendor-price">$${vendor.pricing?.perDevice?.monthly || 10}/device/mo</span>
                                                </div>
                                                <i class="fas fa-check-circle check-icon"></i>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn-primary hover-lift" onclick="platform.applyVendorSelection()">
                                    Update Comparison
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            };
        }
    };
    
    setTimeout(fixVendorModal, 1000);
})();
EOF

# Update index.html to include all fixes
cat > add-modern-ui.sh << 'EOF'
#!/bin/bash

# Add new CSS
sed -i '/<link rel="stylesheet" href="\.\/css\/header-enhancement\.css">/a\
    <link rel="stylesheet" href="./css/portnox-modern-ui.css">' index.html

# Add new JS files after existing ones
sed -i '/<script src="\.\/js\/views\/header-text-update\.js"><\/script>/a\
    <script src="./js/views/fix-vendor-logos.js"></script>\
    <script src="./js/views/header-layout-fix.js"></script>\
    <script src="./js/views/vendor-selection-fix.js"></script>\
    <script src="./js/views/vendor-modal-fix.js"></script>' index.html

echo "✅ Modern UI scripts added to index.html"
EOF

chmod +x add-modern-ui.sh
./add-modern-ui.sh

# Create enhanced vendor selector styles
cat >> css/portnox-modern-ui.css << 'EOF'

/* Vendor Selector Modal Enhancements */
.vendor-selector-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    max-height: 60vh;
    overflow-y: auto;
    padding: 1rem 0;
}

.vendor-option {
    background: white;
    border: 2px solid #E9ECEF;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
}

.vendor-option:hover {
    border-color: var(--portnox-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 212, 170, 0.2);
}

.vendor-option.selected {
    background: var(--portnox-light);
    border-color: var(--portnox-primary);
}

.vendor-option img {
    height: 30px;
    width: auto;
    object-fit: contain;
    margin-bottom: 0.5rem;
}

.vendor-option h4 {
    font-size: 0.9rem;
    margin: 0.5rem 0;
    color: var(--dark);
}

.vendor-option p {
    font-size: 0.75rem;
    color: #6C757D;
    margin: 0.25rem 0;
}

.vendor-price {
    display: block;
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--portnox-primary);
    margin-top: 0.5rem;
}

.check-icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: var(--portnox-primary);
    font-size: 1.25rem;
    opacity: 0;
    transition: opacity 0.2s;
}

.vendor-option.selected .check-icon {
    opacity: 1;
}

/* Modal improvements */
.modal-content {
    border-radius: 16px;
    overflow: hidden;
}

.modal-header {
    background: var(--portnox-gradient);
    color: white;
    padding: 1.5rem;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
}

.close-modal {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
}

.close-modal:hover {
    background: white;
    color: var(--portnox-dark);
}

/* Button styles */
.btn-primary {
    background: var(--portnox-gradient);
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 212, 170, 0.4);
}

/* Add vendor button */
.add-vendor-btn {
    background: var(--portnox-gradient);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.add-vendor-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 212, 170, 0.4);
}
EOF

# Commit changes
git add -A
git commit -m "Complete UI modernization with Portnox branding, compact header, proper vendor logos"
git push

echo "✅ UI Modernization Complete!"
echo ""
echo "Improvements:"
echo "1. ✅ Portnox color scheme throughout"
echo "2. ✅ Controls moved to top right in compact header"
echo "3. ✅ Enhanced vendor pills with proper colors"
echo "4. ✅ Reduced header size (60px height)"
echo "5. ✅ Bold and vibrant Portnox branding"
echo "6. ✅ Compact Portnox pricing slider (bottom right)"
echo "7. ✅ Proper vendor logo paths (using your PNG files)"
echo "8. ✅ Modern, impressive UI design"
echo ""
echo "Refresh your browser to see the modern Portnox-branded UI!"
