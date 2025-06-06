// Restore complete header with all buttons
(function() {
    console.log('🔧 Restoring complete header...');
    
    const restoreHeader = () => {
        if (window.platform && window.platform.setupPremiumUI) {
            const original = window.platform.setupPremiumUI;
            window.platform.setupPremiumUI = function() {
                const app = document.getElementById('app-container') || document.body;
                app.innerHTML = `
                    <div class="premium-platform">
                        <!-- Complete Header -->
                        <header class="premium-header">
                            <div class="header-container">
                                <div class="brand-identity">
                                    <img src="/img/vendors/portnox-logo.png" alt="Portnox" class="portnox-logo">
                                    <div class="platform-title">
                                        <h1>Executive Decision Platform</h1>
                                        <p class="subtitle-animated">Zero Trust NAC Investment Analysis & Risk Assessment</p>
                                    </div>
                                </div>
                                
                                <div class="header-controls">
                                    <button class="control-btn cost-controls" onclick="platform.openSettings()">
                                        <i class="fas fa-sliders-h"></i>
                                        <span>Cost Controls</span>
                                    </button>
                                    <button class="control-btn calculate" onclick="platform.calculate()">
                                        <i class="fas fa-calculator"></i>
                                        <span>Recalculate</span>
                                    </button>
                                    <button class="control-btn export" onclick="platform.showExportOptions()">
                                        <i class="fas fa-download"></i>
                                        <span>Export</span>
                                    </button>
                                    <button class="control-btn demo" onclick="platform.scheduleDemo()">
                                        <i class="fas fa-calendar"></i>
                                        <span>Schedule Demo</span>
                                    </button>
                                </div>
                            </div>
                        </header>
                        
                        <!-- Vendor Selection -->
                        <div class="vendor-selection-bar">
                            <div class="selection-info">
                                <h3>Vendor Comparison</h3>
                                <p>Portnox + select up to ${this.maxAdditionalVendors} competitors</p>
                            </div>
                            <div class="selected-vendors-display" id="selected-vendors-display"></div>
                            <button class="btn-primary" onclick="platform.openVendorSelector()">
                                <i class="fas fa-plus"></i> Add Competitor
                            </button>
                        </div>
                        
                        <!-- Navigation -->
                        <nav class="premium-nav">
                            <button class="nav-tab active" data-tab="executive-summary" onclick="platform.switchTab('executive-summary')">
                                <i class="fas fa-crown"></i>
                                <span>Executive Summary</span>
                            </button>
                            <button class="nav-tab" data-tab="financial-overview" onclick="platform.switchTab('financial-overview')">
                                <i class="fas fa-chart-line"></i>
                                <span>Financial Overview</span>
                            </button>
                            <button class="nav-tab" data-tab="compliance-analysis" onclick="platform.switchTab('compliance-analysis')">
                                <i class="fas fa-clipboard-check"></i>
                                <span>Compliance</span>
                            </button>
                            <button class="nav-tab" data-tab="risk-assessment" onclick="platform.switchTab('risk-assessment')">
                                <i class="fas fa-shield-alt"></i>
                                <span>Risk & Security</span>
                            </button>
                            <button class="nav-tab" data-tab="operational-impact" onclick="platform.switchTab('operational-impact')">
                                <i class="fas fa-cogs"></i>
                                <span>Operational</span>
                            </button>
                            <button class="nav-tab" data-tab="strategic-insights" onclick="platform.switchTab('strategic-insights')">
                                <i class="fas fa-lightbulb"></i>
                                <span>Strategic Insights</span>
                            </button>
                        </nav>
                        
                        <!-- Content -->
                        <div class="analysis-content" id="analysis-content"></div>
                        
                        <!-- Pricing Slider at Bottom -->
                        <div class="portnox-pricing-bar">
                            <div class="pricing-container">
                                <div class="pricing-label">
                                    <img src="/img/vendors/portnox-logo.png" alt="Portnox" class="portnox-logo-small">
                                    <span style="color: white; font-weight: 600;">Pricing Adjustment</span>
                                </div>
                                <div class="pricing-control">
                                    <span class="price-label">$<span id="portnox-price-display">${this.portnoxPricing.toFixed(2)}</span>/device/month</span>
                                    <input type="range" id="portnox-pricing-slider" 
                                           min="1" max="8" step="0.1" value="${this.portnoxPricing}">
                                    <div class="price-range" style="color: rgba(255,255,255,0.6); font-size: 0.75rem; display: flex; justify-content: space-between;">
                                        <span>$1.00</span>
                                        <span>$8.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Modals -->
                        ${this.renderSettingsModal()}
                        ${this.renderVendorSelectorModal()}
                        ${this.renderExportModal()}
                    </div>
                `;
                
                this.bindEvents();
                this.updateVendorSelection();
                this.calculate();
                setTimeout(() => this.switchTab('executive-summary'), 100);
            };
        }
    };
    
    setTimeout(restoreHeader, 500);
})();
