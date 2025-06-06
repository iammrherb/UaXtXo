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
