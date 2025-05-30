/**
 * Fix vendor card display and ensure proper data population
 */

console.log("🔧 Fixing vendor card display and selection...");

// Override vendor card rendering with proper formatting
document.addEventListener('DOMContentLoaded', function() {
    const enhanceVendorCards = setInterval(() => {
        if (window.dashboard && window.dashboard.renderVendorCards) {
            clearInterval(enhanceVendorCards);
            
            // Override renderVendorCards method
            window.dashboard.renderVendorCards = function() {
                const vendorGrid = document.getElementById('vendor-grid');
                if (!vendorGrid || !this.vendorData) return;
                
                const sortedVendors = Object.values(this.vendorData)
                    .sort((a, b) => b.score - a.score);
                
                vendorGrid.innerHTML = sortedVendors.map(vendor => {
                    const isSelected = this.selectedVendors.includes(vendor.key);
                    const deployDays = vendor.metrics?.implementationDays || 'N/A';
                    
                    return `
                        <div class="vendor-card ${vendor.key === 'portnox' ? 'portnox' : ''} ${isSelected ? 'selected' : ''}" 
                             data-vendor="${vendor.key}">
                            <div class="vendor-header">
                                <div class="vendor-logo">
                                    <img src="./img/vendors/${vendor.key}-logo.png" alt="${vendor.name}" 
                                         onerror="this.src='./img/vendors/default-logo.png'">
                                </div>
                                <div class="vendor-info">
                                    <h4 class="vendor-name">${vendor.name}</h4>
                                    <div class="vendor-rating">
                                        ${renderStars(vendor.score / 20)}
                                        <span class="score-badge">${vendor.score}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="vendor-metrics">
                                <div class="metric-row">
                                    <div class="metric-item">
                                        <div class="metric-label">3-YEAR TCO</div>
                                        <div class="metric-value primary">$${(vendor.tco.total / 1000).toFixed(0)}K</div>
                                    </div>
                                    <div class="metric-item">
                                        <div class="metric-label">MONTHLY</div>
                                        <div class="metric-value">$${(vendor.tco.monthly / 1000).toFixed(1)}K</div>
                                    </div>
                                    <div class="metric-item">
                                        <div class="metric-label">DEPLOY</div>
                                        <div class="metric-value">${deployDays}d</div>
                                    </div>
                                </div>
                                <div class="metric-row">
                                    <div class="metric-item">
                                        <div class="metric-label">FTE</div>
                                        <div class="metric-value highlight">${vendor.metrics.fteRequired}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="vendor-badges">
                                ${vendor.capabilities.cloudNative === 100 ? '<span class="badge cloud">CLOUD NATIVE</span>' : ''}
                                ${vendor.capabilities.zeroTrust >= 85 ? '<span class="badge zt">ZERO TRUST</span>' : ''}
                                ${vendor.capabilities.automation >= 85 ? '<span class="badge auto">AUTOMATED</span>' : ''}
                            </div>
                            
                            <div class="vendor-actions">
                                <button class="vendor-btn ${isSelected ? 'selected' : ''}" 
                                        onclick="dashboard.toggleVendorAndUpdate('${vendor.key}')">
                                    <i class="fas ${isSelected ? 'fa-check' : 'fa-plus'}"></i>
                                    ${isSelected ? 'Selected' : 'Select'}
                                </button>
                                <button class="vendor-btn details" onclick="dashboard.showVendorDetails('${vendor.key}')">
                                    <i class="fas fa-info-circle"></i> Details
                                </button>
                            </div>
                        </div>
                    `;
                }).join('');
                
                function renderStars(rating) {
                    const fullStars = Math.floor(rating);
                    const hasHalf = rating % 1 >= 0.5;
                    let stars = '';
                    
                    for (let i = 0; i < fullStars; i++) {
                        stars += '<i class="fas fa-star"></i>';
                    }
                    if (hasHalf) {
                        stars += '<i class="fas fa-star-half-alt"></i>';
                    }
                    const remaining = 5 - Math.ceil(rating);
                    for (let i = 0; i < remaining; i++) {
                        stars += '<i class="far fa-star"></i>';
                    }
                    
                    return stars;
                }
            };
            
            // Add toggleVendorAndUpdate method
            window.dashboard.toggleVendorAndUpdate = function(vendorKey) {
                this.toggleVendor(vendorKey);
                // Update all charts when vendor selection changes
                this.updateAllCharts();
            };
            
            // Add updateAllCharts method
            window.dashboard.updateAllCharts = function() {
                console.log("📊 Updating all charts with selected vendors:", this.selectedVendors);
                
                // Update main comparison chart
                if (this.renderTCOComparisonChart) {
                    this.renderTCOComparisonChart();
                }
                
                // Update financial charts
                if (this.currentTab === 'financial') {
                    this.switchFinancialSubtab(this.currentSubtab || 'breakdown');
                }
                
                // Update vendor comparison
                if (this.currentTab === 'vendors' && this.updateComparisonView) {
                    this.updateComparisonView(document.getElementById('comparison-metric')?.value || 'tco');
                }
                
                // Update risk assessment
                if (this.currentTab === 'risk' && window.riskAssessmentTab) {
                    window.riskAssessmentTab.updateCharts();
                }
            };
            
            console.log("✅ Vendor card display fixed");
        }
    }, 100);
});
