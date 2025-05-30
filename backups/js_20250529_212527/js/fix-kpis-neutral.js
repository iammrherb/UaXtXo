// FIX KPIs - Neutral until vendors selected
document.addEventListener('DOMContentLoaded', function() {
    if (window.dashboard) {
        const originalRenderOverview = window.dashboard.renderOverview;
        
        window.dashboard.renderOverview = function(container) {
            if (this.selectedVendors.length === 0) {
                container.innerHTML = `
                    <div class="no-selection-dashboard">
                        <div class="selection-prompt">
                            <i class="fas fa-mouse-pointer" style="font-size: 48px; color: #3b82f6; margin-bottom: 16px;"></i>
                            <h2>Welcome to the Zero Trust TCO Analyzer</h2>
                            <p>Select one or more vendors below to begin your cost and risk analysis.</p>
                        </div>
                        
                        <div class="default-metrics">
                            <div class="metric-card">
                                <i class="fas fa-server"></i>
                                <div class="metric-value">${this.config.deviceCount}</div>
                                <div class="metric-label">Devices</div>
                            </div>
                            <div class="metric-card">
                                <i class="fas fa-building"></i>
                                <div class="metric-value">${this.config.locationCount}</div>
                                <div class="metric-label">Location${this.config.locationCount > 1 ? 's' : ''}</div>
                            </div>
                            <div class="metric-card">
                                <i class="fas fa-calendar"></i>
                                <div class="metric-value">${this.config.analysisPeriod}</div>
                                <div class="metric-label">Year Analysis</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="vendor-section">
                        <h2>Available Vendors</h2>
                        <div class="vendor-grid" id="vendor-grid"></div>
                    </div>
                `;
                
                setTimeout(() => this.renderVendorCards(), 100);
            } else {
                // Show actual KPIs based on selected vendors
                const portnox = this.vendorData.portnox;
                let comparisonVendor = null;
                let comparisonName = '';
                
                // Find highest cost vendor that's selected (not Portnox)
                this.selectedVendors.forEach(key => {
                    if (key !== 'portnox' && this.vendorData[key]) {
                        if (!comparisonVendor || this.vendorData[key].tco.tco > comparisonVendor.tco.tco) {
                            comparisonVendor = this.vendorData[key];
                            comparisonName = this.vendorData[key].name;
                        }
                    }
                });
                
                if (comparisonVendor) {
                    const savings = comparisonVendor.tco.tco - portnox.tco.tco;
                    const savingsPercent = Math.round((savings / comparisonVendor.tco.tco) * 100);
                    
                    container.innerHTML = `
                        <div class="kpi-dashboard">
                            <h2>TCO Analysis Results</h2>
                            <p>Comparing ${this.selectedVendors.length} vendors for ${this.config.deviceCount} devices</p>
                            
                            <div class="kpi-grid">
                                <div class="kpi-card highlight">
                                    <i class="fas fa-piggy-bank"></i>
                                    <div class="kpi-value">$${(savings / 1000).toFixed(0)}K</div>
                                    <div class="kpi-label">Potential Savings</div>
                                    <div class="kpi-detail">vs ${comparisonName}</div>
                                </div>
                                
                                <div class="kpi-card">
                                    <i class="fas fa-percentage"></i>
                                    <div class="kpi-value">${savingsPercent}%</div>
                                    <div class="kpi-label">Cost Reduction</div>
                                    <div class="kpi-detail">Lower TCO</div>
                                </div>
                                
                                <div class="kpi-card">
                                    <i class="fas fa-rocket"></i>
                                    <div class="kpi-value">${portnox.metrics.implementationDays}</div>
                                    <div class="kpi-label">Days to Deploy</div>
                                    <div class="kpi-detail">Portnox CLEAR</div>
                                </div>
                                
                                <div class="kpi-card">
                                    <i class="fas fa-shield-alt"></i>
                                    <div class="kpi-value">${portnox.metrics.securityScore}</div>
                                    <div class="kpi-label">Security Score</div>
                                    <div class="kpi-detail">Out of 100</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="vendor-section">
                            <h2>Vendor Comparison</h2>
                            <div class="vendor-grid" id="vendor-grid"></div>
                        </div>
                        
                        <div class="chart-section">
                            <div id="tco-comparison-chart" style="height: 400px;"></div>
                        </div>
                    `;
                } else {
                    container.innerHTML = `
                        <p>Please select at least one vendor besides Portnox for comparison.</p>
                        <div class="vendor-section">
                            <h2>Available Vendors</h2>
                            <div class="vendor-grid" id="vendor-grid"></div>
                        </div>
                    `;
                }
                
                setTimeout(() => {
                    this.renderVendorCards();
                    if (comparisonVendor) {
                        this.renderTCOComparisonChart();
                    }
                }, 100);
            }
        };
    }
});
