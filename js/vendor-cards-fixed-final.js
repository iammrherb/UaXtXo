// FIX VENDOR CARDS WITH PROPER LAYOUT
document.addEventListener('DOMContentLoaded', function() {
    if (window.dashboard) {
        window.dashboard.renderVendorCards = function() {
            const vendorGrid = document.getElementById('vendor-grid');
            if (!vendorGrid || !this.vendorData) return;
            
            const vendors = Object.values(this.vendorData).sort((a, b) => b.score - a.score);
            
            vendorGrid.innerHTML = vendors.map(vendor => {
                const isSelected = this.selectedVendors.includes(vendor.key);
                const isPortnox = vendor.key === 'portnox';
                
                // Calculate monthly cost
                const monthlyTco = vendor.tco.monthly || (vendor.tco.tco / 36);
                
                // Get per device price
                let perDevicePrice = '-';
                if (vendor.key === 'portnox') {
                    perDevicePrice = `$${this.config.portnoxPricing || 3.5}`;
                } else if (vendor.pricing && vendor.pricing.perDevice) {
                    perDevicePrice = `$${vendor.pricing.perDevice}`;
                }
                
                return `
                    <div class="vendor-card ${isPortnox ? 'portnox' : ''} ${isSelected ? 'selected' : ''}">
                        <div class="vendor-header">
                            <div class="vendor-logo">
                                <img src="./img/vendors/${vendor.key}-logo.png" 
                                     alt="${vendor.name}" 
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
                        
                        <div class="vendor-metrics-container">
                            <div class="metric-box ${isPortnox ? 'primary' : ''}">
                                <span class="metric-label">3-Year TCO</span>
                                <span class="metric-value green">$${(vendor.tco.tco / 1000).toFixed(0)}K</span>
                            </div>
                            <div class="metric-box">
                                <span class="metric-label">Monthly Cost</span>
                                <span class="metric-value blue">$${(monthlyTco / 1000).toFixed(1)}K</span>
                            </div>
                            <div class="metric-box">
                                <span class="metric-label">Deploy Time</span>
                                <span class="metric-value">${vendor.metrics.implementationDays}d</span>
                            </div>
                            <div class="metric-box">
                                <span class="metric-label">FTE Required</span>
                                <span class="metric-value">${vendor.metrics.fteRequired}</span>
                            </div>
                        </div>
                        
                        <div class="vendor-features">
                            ${vendor.metrics.cloudNative ? '<span class="feature-tag cloud">Cloud Native</span>' : ''}
                            ${vendor.metrics.zeroTrustScore >= 85 ? '<span class="feature-tag zt">Zero Trust</span>' : ''}
                            ${vendor.metrics.automationLevel >= 85 ? '<span class="feature-tag auto">Automated</span>' : ''}
                        </div>
                        
                        <div class="vendor-actions">
                            <button class="vendor-btn ${isSelected ? 'selected' : ''}" 
                                    onclick="dashboard.toggleVendor('${vendor.key}')">
                                <i class="fas ${isSelected ? 'fa-check' : 'fa-plus'}"></i>
                                ${isSelected ? 'Selected' : 'Select'}
                            </button>
                            <button class="vendor-btn" 
                                    onclick="dashboard.showVendorDetails('${vendor.key}')">
                                <i class="fas fa-info-circle"></i> Details
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        };
        
        // Modern KPIs
        window.dashboard.renderModernKPIs = function() {
            const portnox = this.vendorData?.portnox;
            const cisco = this.vendorData?.cisco;
            if (!portnox || !cisco) return '';
            
            const savings = cisco.tco.tco - portnox.tco.tco;
            const savingsPercent = Math.round((savings / cisco.tco.tco) * 100);
            
            return `
                <div class="kpi-dashboard">
                    <div class="kpi-header">
                        <h2 class="kpi-title">Executive Summary - Total Cost & Risk Analysis</h2>
                        <p class="kpi-description">
                            Comprehensive analysis comparing Portnox Cloud-Native Zero Trust NAC against traditional solutions. 
                            Based on ${this.config.deviceCount.toLocaleString()} devices across ${this.config.locationCount} locations 
                            with a ${this.config.analysisPeriod}-year analysis period.
                        </p>
                    </div>
                    
                    <div class="modern-kpis-grid">
                        <div class="modern-kpi-card highlight">
                            <div class="kpi-icon">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div class="kpi-metric">
                                <div class="kpi-metric-value">$${(savings / 1000).toFixed(0)}K</div>
                                <div class="kpi-metric-label">Total Cost Savings</div>
                            </div>
                            <div class="kpi-detail">
                                ${savingsPercent}% reduction in TCO compared to Cisco ISE. 
                                Includes licensing, deployment, and operational costs.
                            </div>
                            <div class="kpi-footer">
                                <div class="kpi-trend up">
                                    <i class="fas fa-arrow-up"></i> ${savingsPercent}%
                                </div>
                                <a href="#" class="kpi-action">
                                    View breakdown <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div class="modern-kpi-card">
                            <div class="kpi-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="kpi-metric">
                                <div class="kpi-metric-value">${portnox.roi.roi}%</div>
                                <div class="kpi-metric-label">Return on Investment</div>
                            </div>
                            <div class="kpi-detail">
                                Payback in ${portnox.roi.paybackMonths} months with annual 
                                savings of $${(portnox.roi.annualSavings / 1000).toFixed(0)}K.
                            </div>
                            <div class="kpi-footer">
                                <div class="kpi-trend up">
                                    <i class="fas fa-arrow-up"></i> 3.2x
                                </div>
                                <a href="#" class="kpi-action">
                                    ROI details <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div class="modern-kpi-card">
                            <div class="kpi-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <div class="kpi-metric">
                                <div class="kpi-metric-value">30%</div>
                                <div class="kpi-metric-label">Risk Reduction</div>
                            </div>
                            <div class="kpi-detail">
                                Reduced breach probability saves $${(this.config.breachCost * 0.3 / 1000000).toFixed(1)}M 
                                in potential breach costs.
                            </div>
                            <div class="kpi-footer">
                                <div class="kpi-trend up">
                                    <i class="fas fa-arrow-up"></i> Critical
                                </div>
                                <a href="#" class="kpi-action">
                                    Risk analysis <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div class="modern-kpi-card">
                            <div class="kpi-icon">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <div class="kpi-metric">
                                <div class="kpi-metric-value">${portnox.metrics.implementationDays}</div>
                                <div class="kpi-metric-label">Days to Deploy</div>
                            </div>
                            <div class="kpi-detail">
                                ${Math.round((90 - portnox.metrics.implementationDays) / 90 * 100)}% faster 
                                deployment than traditional NAC solutions.
                            </div>
                            <div class="kpi-footer">
                                <div class="kpi-trend up">
                                    <i class="fas fa-arrow-up"></i> 76% faster
                                </div>
                                <a href="#" class="kpi-action">
                                    Timeline <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        };
        
        // Update overview to use modern KPIs
        const originalRenderOverview = window.dashboard.renderOverview;
        window.dashboard.renderOverview = function(container) {
            container.innerHTML = `
                ${this.renderModernKPIs()}
                
                <div class="vendor-section">
                    <h2 class="section-title">Select Vendors for Detailed Comparison</h2>
                    <div class="vendor-grid" id="vendor-grid"></div>
                </div>
                
                <div class="chart-section">
                    <div class="chart-container">
                        <h3>Total Cost of Ownership Analysis</h3>
                        <div id="tco-comparison-chart" style="height: 400px;"></div>
                    </div>
                </div>
            `;
            
            setTimeout(() => {
                this.renderVendorCards();
                this.renderTCOComparisonChart();
            }, 100);
        };
        
        // Refresh
        if (window.dashboard.vendorData) {
            window.dashboard.render();
        }
    }
});
