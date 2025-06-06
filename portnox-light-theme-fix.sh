#!/bin/bash

echo "🎨 Applying Portnox light theme with proper visibility..."

# Fix 1: Light theme CSS with exact Portnox colors
cat > css/portnox-light-theme.css << 'EOF'
/* Portnox Light Theme - Exact Colors */
:root {
    --portnox-teal: #00D4AA;
    --portnox-teal-dark: #00A080;
    --portnox-purple: #8B5CF6;
    --portnox-purple-dark: #7C3AED;
    --portnox-bg-primary: #F8F9FB;
    --portnox-bg-secondary: #FFFFFF;
    --portnox-bg-dark: #1A1F2E;
    --portnox-bg-card: #242937;
    --portnox-text-primary: #1A1F2E;
    --portnox-text-secondary: #6B7280;
    --portnox-text-light: #9CA3AF;
    --portnox-border: #E5E7EB;
    --portnox-border-dark: #374151;
    --portnox-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    --portnox-shadow-lg: 0 10px 24px rgba(0, 0, 0, 0.1);
}

/* Global Light Theme */
body {
    background: var(--portnox-bg-primary) !important;
    color: var(--portnox-text-primary) !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Header - Dark with teal accent */
.premium-header {
    background: var(--portnox-bg-dark);
    padding: 1rem 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    box-shadow: var(--portnox-shadow-lg);
    height: auto;
    min-height: 70px;
}

.header-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

/* Brand Identity */
.brand-identity {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.portnox-logo-wrapper {
    height: 45px;
    display: flex;
    align-items: center;
}

.portnox-logo {
    height: 45px;
    width: auto;
}

.platform-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.platform-title h1 {
    font-size: 1.75rem;
    font-weight: 300;
    color: var(--portnox-teal);
    margin: 0;
    line-height: 1.2;
}

.subtitle-animated {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
}

/* Header Controls */
.header-controls {
    display: flex;
    gap: 0.75rem;
    align-items: center;
}

.control-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 0.625rem 1.25rem;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
}

.control-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--portnox-teal);
}

.control-btn.settings {
    background: var(--portnox-purple);
    border-color: var(--portnox-purple);
}

.control-btn.settings:hover {
    background: var(--portnox-purple-dark);
}

.control-btn.demo {
    background: var(--portnox-purple);
    border: none;
    color: white;
}

/* Organization Size Selector */
.org-size-selector {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    color: white;
    font-size: 0.875rem;
    cursor: pointer;
    min-width: 200px;
}

/* Main Container */
.premium-platform {
    padding-top: 90px;
    background: var(--portnox-bg-primary);
    min-height: 100vh;
}

/* Vendor Selection - Light background */
.vendor-selection-bar {
    background: var(--portnox-bg-secondary);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 2rem;
    box-shadow: var(--portnox-shadow);
}

.selection-info h3 {
    color: var(--portnox-text-primary);
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.selection-info p {
    color: var(--portnox-text-secondary);
    font-size: 0.875rem;
}

/* Vendor Pills - Better visibility */
.selected-vendors-display {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin: 1rem 0;
}

.vendor-chip {
    background: var(--portnox-bg-primary);
    border: 2px solid var(--portnox-border);
    border-radius: 24px;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.2s ease;
    cursor: pointer;
    min-height: 44px;
}

.vendor-chip:hover {
    border-color: var(--portnox-teal);
    box-shadow: 0 2px 8px rgba(0, 212, 170, 0.2);
    transform: translateY(-1px);
}

.vendor-chip.portnox-chip {
    background: rgba(0, 212, 170, 0.1);
    border-color: var(--portnox-teal);
}

.vendor-chip img {
    height: 28px;
    width: auto;
    max-width: 100px;
    object-fit: contain;
}

.vendor-chip .vendor-text {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--portnox-text-primary);
}

.remove-vendor {
    background: none;
    border: none;
    color: var(--portnox-text-secondary);
    cursor: pointer;
    padding: 0 0 0 0.5rem;
    font-size: 1rem;
    opacity: 0.6;
    transition: all 0.2s;
}

.remove-vendor:hover {
    color: #EF4444;
    opacity: 1;
}

/* Add Competitor Button */
.add-vendor-btn {
    background: var(--portnox-teal);
    border: none;
    color: white;
    padding: 0.625rem 1.25rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.add-vendor-btn:hover {
    background: var(--portnox-teal-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 212, 170, 0.3);
}

/* Navigation Tabs */
.premium-nav {
    background: var(--portnox-bg-secondary);
    border-radius: 12px;
    padding: 0.5rem;
    margin: 1.5rem 2rem;
    box-shadow: var(--portnox-shadow);
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
    color: var(--portnox-text-secondary);
}

.nav-tab:hover {
    background: var(--portnox-bg-primary);
    color: var(--portnox-text-primary);
}

.nav-tab.active {
    background: var(--portnox-purple);
    color: white;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
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
    background: var(--portnox-bg-secondary);
    border-radius: 12px;
    padding: 2rem;
    margin: 0 2rem 2rem;
    box-shadow: var(--portnox-shadow);
}

/* Pricing Bar - Moved to header area */
.portnox-pricing-bar {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-left: auto;
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
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
}

.portnox-logo-small {
    height: 20px;
    width: auto;
}

.portnox-text {
    color: var(--portnox-teal);
}

.pricing-control {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.price-label {
    color: white;
    font-weight: 700;
    font-size: 1rem;
    white-space: nowrap;
}

#portnox-pricing-slider {
    width: 120px;
    height: 4px;
    -webkit-appearance: none;
    appearance: none;
    background: rgba(255, 255, 255, 0.3);
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Vendor Selector Modal */
.modal-backdrop {
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background: var(--portnox-bg-secondary);
    border-radius: 16px;
    box-shadow: var(--portnox-shadow-lg);
}

.modal-header {
    background: var(--portnox-bg-primary);
    border-bottom: 1px solid var(--portnox-border);
    padding: 1.5rem;
}

.modal-header h2 {
    color: var(--portnox-text-primary);
    margin: 0;
}

.vendor-selector-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem 0;
}

.vendor-option {
    background: var(--portnox-bg-primary);
    border: 2px solid var(--portnox-border);
    border-radius: 12px;
    padding: 1.5rem 1rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
}

.vendor-option:hover {
    border-color: var(--portnox-teal);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 212, 170, 0.2);
}

.vendor-option.selected {
    background: rgba(0, 212, 170, 0.1);
    border-color: var(--portnox-teal);
}

.vendor-option img {
    height: 50px;
    width: auto;
    max-width: 140px;
    object-fit: contain;
    margin-bottom: 1rem;
}

.vendor-option h4 {
    color: var(--portnox-text-primary);
    font-size: 0.9rem;
    margin: 0.5rem 0;
    font-weight: 600;
}

.vendor-option p {
    color: var(--portnox-text-secondary);
    font-size: 0.75rem;
    margin: 0.25rem 0;
}

.vendor-price {
    color: var(--portnox-teal);
    font-weight: 700;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    display: block;
}

.check-icon {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    color: var(--portnox-teal);
    font-size: 1.25rem;
    opacity: 0;
    transition: opacity 0.2s;
}

.vendor-option.selected .check-icon {
    opacity: 1;
}

/* Cards and sections */
.glass-card {
    background: var(--portnox-bg-secondary);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: var(--portnox-shadow);
}

/* Text visibility fixes */
h1, h2, h3, h4, h5, h6 {
    color: var(--portnox-text-primary);
}

p {
    color: var(--portnox-text-secondary);
}

/* Buttons */
.btn-primary {
    background: var(--portnox-purple);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-primary:hover {
    background: var(--portnox-purple-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.btn-secondary {
    background: transparent;
    border: 2px solid var(--portnox-border);
    color: var(--portnox-text-primary);
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-secondary:hover {
    background: var(--portnox-bg-primary);
    border-color: var(--portnox-teal);
    color: var(--portnox-teal);
}

/* Settings Modal */
.settings-modal .modal-content {
    background: var(--portnox-bg-secondary);
}

.setting-item label {
    color: var(--portnox-text-primary);
    font-weight: 600;
}

.setting-item input,
.setting-item select {
    background: var(--portnox-bg-primary);
    border: 2px solid var(--portnox-border);
    color: var(--portnox-text-primary);
    padding: 0.75rem;
    border-radius: 8px;
}

.setting-item input:focus,
.setting-item select:focus {
    border-color: var(--portnox-teal);
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.1);
}

/* Responsive */
@media (max-width: 1400px) {
    .header-controls {
        flex-wrap: wrap;
    }
    
    .portnox-pricing-bar {
        width: 100%;
        margin-top: 0.5rem;
    }
}

/* Fix content overlap */
.analysis-container {
    position: relative;
    z-index: 1;
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: var(--portnox-bg-primary);
}

::-webkit-scrollbar-thumb {
    background: var(--portnox-teal);
    border-radius: 4px;
}
EOF

# Fix 2: Update header layout to include pricing in header
cat > js/views/header-pricing-integration.js << 'EOF'
// Integrate pricing into header
(function() {
    console.log('🔧 Integrating pricing into header...');
    
    const updateHeaderLayout = () => {
        if (window.platform && window.platform.setupPremiumUI) {
            const original = window.platform.setupPremiumUI;
            window.platform.setupPremiumUI = function() {
                const app = document.getElementById('app-container') || document.body;
                app.innerHTML = `
                    <div class="premium-platform ultimate-visual">
                        <!-- Modern Header with integrated pricing -->
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
                                
                                <!-- Organization Selector -->
                                <select class="org-size-selector" id="org-size-quick" onchange="platform.updateFromQuickSelect(this.value)">
                                    <option value="medium">Medium (251-1000)</option>
                                    <option value="small">Small (51-250)</option>
                                    <option value="large">Large (1001-5000)</option>
                                    <option value="xlarge">XL (5001-10000)</option>
                                    <option value="global">Global (10000+)</option>
                                </select>
                                
                                <div class="header-controls">
                                    <button class="control-btn settings" onclick="platform.openSettings()">
                                        <i class="fas fa-cog"></i>
                                        <span>Settings</span>
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
                                        <i class="fas fa-calendar"></i>
                                        <span>Schedule Demo</span>
                                    </button>
                                </div>
                                
                                <!-- Portnox Pricing in Header -->
                                <div class="portnox-pricing-bar">
                                    <div class="pricing-container">
                                        <div class="pricing-label">
                                            <img src="/img/vendors/portnox-logo.png" alt="Portnox" class="portnox-logo-small">
                                            <span>Pricing</span>
                                        </div>
                                        <div class="pricing-control">
                                            <span class="price-label">$<span id="portnox-price-display">${this.portnoxPricing.toFixed(2)}</span>/device/mo</span>
                                            <input type="range" id="portnox-pricing-slider" 
                                                   min="1" max="8" step="0.25" value="${this.portnoxPricing}">
                                        </div>
                                    </div>
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
                                    <i class="fas fa-shield-alt"></i>
                                    <span>Risk & Security</span>
                                    <span class="tab-subtitle">Breach & Incident Impact</span>
                                </button>
                                <button class="nav-tab" data-tab="compliance-analysis" onclick="platform.switchTab('compliance-analysis')">
                                    <i class="fas fa-check-circle"></i>
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
            
            // Add quick select handler
            window.platform.updateFromQuickSelect = function(size) {
                const sizeMap = {
                    'small': 150,
                    'medium': 500,
                    'large': 2500,
                    'xlarge': 7500,
                    'global': 25000
                };
                this.config.deviceCount = sizeMap[size] || 500;
                this.calculate();
            };
        }
    };
    
    setTimeout(updateHeaderLayout, 500);
})();
EOF

# Fix 3: Improve logo visibility in vendor selection
cat > js/views/vendor-logo-visibility.js << 'EOF'
// Improve vendor logo visibility
(function() {
    console.log('🖼️ Improving vendor logo visibility...');
    
    const improveLogos = () => {
        // Update vendor chip display
        if (window.platform && window.platform.updateVendorSelection) {
            window.platform.updateVendorSelection = function() {
                const display = document.getElementById('selected-vendors-display');
                if (!display) return;
                
                display.innerHTML = this.selectedVendors.map(vendorKey => {
                    const vendor = this.vendorDatabase[vendorKey];
                    const isPortnox = vendorKey === 'portnox';
                    const logoMap = {
                        'cisco_ise': 'cisco-logo.png',
                        'aruba_clearpass': 'aruba-logo.png'
                    };
                    const logoFile = logoMap[vendorKey] || `${vendorKey}-logo.png`;
                    
                    return `
                        <div class="vendor-chip ${isPortnox ? 'portnox-chip' : ''}" title="${vendor?.name}">
                            <img src="/img/vendors/${logoFile}" 
                                 alt="${vendor?.name}" 
                                 style="height: 28px; width: auto; object-fit: contain;">
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
        }
        
        // Fix vendor modal logos
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
                                        const logoMap = {
                                            'cisco_ise': 'cisco-logo.png',
                                            'aruba_clearpass': 'aruba-logo.png'
                                        };
                                        const logoFile = logoMap[key] || `${key}-logo.png`;
                                        
                                        return `
                                            <div class="vendor-option ${this.selectedVendors.includes(key) ? 'selected' : ''}" 
                                                 data-vendor="${key}" onclick="platform.toggleVendor('${key}')">
                                                <div class="vendor-option-content">
                                                    <img src="/img/vendors/${logoFile}" 
                                                         alt="${vendor.name}" 
                                                         style="height: 50px; width: auto; object-fit: contain;">
                                                    <h4>${vendor.name}</h4>
                                                    <p>${vendor.category}</p>
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
    
    setTimeout(improveLogos, 1000);
})();
EOF

# Update index.html
cat > add-light-theme.sh << 'EOF'
#!/bin/bash

# Replace dark theme CSS with light theme
sed -i 's/portnox-exact-colors\.css/portnox-light-theme.css/g' index.html

# Add new JS files
sed -i '/<script src="\.\/js\/views\/header-position-fix\.js"><\/script>/a\
    <script src="./js/views/header-pricing-integration.js"></script>\
    <script src="./js/views/vendor-logo-visibility.js"></script>' index.html

echo "✅ Light theme updates added to index.html"
EOF

chmod +x add-light-theme.sh
./add-light-theme.sh

# Commit changes
git add -A
git commit -m "Light theme UI with improved visibility, larger logos, pricing in header"
git push

echo "✅ Light theme UI complete!"
echo ""
echo "Fixed:"
echo "1. ✅ Light background theme (no more dark mode)"
echo "2. ✅ Larger, visible vendor logos (28px in pills, 50px in modal)"
echo "3. ✅ Better contrast and text visibility"
echo "4. ✅ Pricing slider moved to header"
echo "5. ✅ Fixed header cutoff issue"
echo "6. ✅ Modern light color scheme matching Portnox brand"
echo "7. ✅ Organization size selector in header"
echo ""
echo "Refresh your browser to see the modern light theme!"
