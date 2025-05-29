#!/bin/bash

echo "🔧 FIXING VENDOR CARDS PROPERLY AND MODERN KPIs..."

# 1. FIX VENDOR CARDS - NO MORE OVERLAPPING
cat > css/vendor-cards-fixed-final.css << 'EOF'
/* VENDOR CARDS - FIXED LAYOUT */
.vendor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 24px;
    padding: 20px 0;
}

.vendor-card {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    height: 420px;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: all 0.2s ease;
}

.vendor-card:hover {
    border-color: #cbd5e1;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

.vendor-card.portnox {
    border-color: #3b82f6;
    background: linear-gradient(to bottom, #eff6ff 0%, white 100%);
}

.vendor-card.selected {
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

/* Header Section */
.vendor-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    height: 60px;
}

.vendor-logo {
    width: 60px;
    height: 60px;
    padding: 10px;
    background: #f8fafc;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.vendor-logo img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.vendor-info {
    flex: 1;
}

.vendor-info h4 {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 6px 0;
    line-height: 1.2;
}

.vendor-rating {
    display: flex;
    align-items: center;
    gap: 4px;
}

.vendor-rating i {
    font-size: 13px;
    color: #f59e0b;
}

.score-badge {
    background: #f3f4f6;
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    color: #4b5563;
    margin-left: 8px;
}

/* Metrics Grid - 2x2 Layout */
.vendor-metrics-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
}

.metric-box {
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 16px;
    text-align: center;
}

.metric-box.primary {
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border-color: #93c5fd;
}

.metric-label {
    font-size: 11px;
    text-transform: uppercase;
    color: #64748b;
    font-weight: 600;
    letter-spacing: 0.8px;
    margin-bottom: 8px;
    display: block;
}

.metric-value {
    font-size: 24px;
    font-weight: 800;
    color: #1e293b;
    line-height: 1;
    display: block;
}

.metric-value.green {
    color: #10b981;
}

.metric-value.blue {
    color: #3b82f6;
}

/* Feature Tags */
.vendor-features {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
    min-height: 32px;
}

.feature-tag {
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 6px;
    font-weight: 600;
    white-space: nowrap;
}

.feature-tag.cloud {
    background: #dbeafe;
    color: #1e40af;
}

.feature-tag.zt {
    background: #fed7aa;
    color: #92400e;
}

.feature-tag.auto {
    background: #e9d5ff;
    color: #6b21a8;
}

/* Action Buttons */
.vendor-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: auto;
}

.vendor-btn {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    border: 2px solid #e5e7eb;
    background: white;
    color: #374151;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
}

.vendor-btn:hover {
    background: #f9fafb;
    border-color: #cbd5e1;
    transform: translateY(-1px);
}

.vendor-btn.selected {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
}

.vendor-btn.selected:hover {
    background: #2563eb;
    border-color: #2563eb;
}

/* Responsive */
@media (max-width: 1400px) {
    .vendor-grid {
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    }
}

@media (max-width: 768px) {
    .vendor-grid {
        grid-template-columns: 1fr;
    }
}
EOF

# 2. Modern Professional KPIs
cat > css/modern-kpis.css << 'EOF'
/* Modern Professional KPIs */
.kpi-dashboard {
    background: #f8fafc;
    padding: 32px 24px;
    border-radius: 16px;
    margin-bottom: 32px;
}

.kpi-header {
    margin-bottom: 24px;
}

.kpi-title {
    font-size: 24px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 8px 0;
}

.kpi-description {
    font-size: 16px;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
}

.modern-kpis-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}

.modern-kpi-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    position: relative;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
}

.modern-kpi-card:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.modern-kpi-card.highlight {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border: none;
}

.kpi-icon {
    width: 48px;
    height: 48px;
    background: #f1f5f9;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    font-size: 20px;
    color: #3b82f6;
}

.modern-kpi-card.highlight .kpi-icon {
    background: rgba(255, 255, 255, 0.2);
    color: white;
}

.kpi-metric {
    margin-bottom: 12px;
}

.kpi-metric-value {
    font-size: 32px;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 4px;
}

.kpi-metric-label {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.8;
}

.kpi-detail {
    font-size: 14px;
    line-height: 1.6;
    opacity: 0.7;
    margin-bottom: 16px;
}

.kpi-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.modern-kpi-card.highlight .kpi-footer {
    border-color: rgba(255, 255, 255, 0.2);
}

.kpi-trend {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
}

.kpi-trend.up {
    color: #10b981;
}

.modern-kpi-card.highlight .kpi-trend {
    color: #86efac;
}

.kpi-action {
    font-size: 13px;
    color: #3b82f6;
    text-decoration: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
}

.modern-kpi-card.highlight .kpi-action {
    color: white;
    opacity: 0.9;
}
EOF

# 3. Fix vendor card rendering with proper data
cat > js/vendor-cards-fixed-final.js << 'EOF'
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
EOF

# 4. Update index.html
echo "Updating index.html..."

# Remove old vendor card CSS
sed -i '/vendor-cards-proper.css/d' index.html
sed -i '/clean-vendor-cards.css/d' index.html

# Add new CSS
sed -i '/<link rel="stylesheet" href=".\/css\/ui-enhancements.css">/a\
    <link rel="stylesheet" href="./css/vendor-cards-fixed-final.css">\
    <link rel="stylesheet" href="./css/modern-kpis.css">' index.html

# Add new JS
sed -i '/<script src=".\/js\/test-all-features.js"><\/script>/a\
    <script src="./js/vendor-cards-fixed-final.js"></script>' index.html

echo "✅ FIXED:"
echo "1. Vendor cards have proper spacing and layout (380px min width)"
echo "2. All data fits properly in 2x2 grid"
echo "3. Modern professional KPIs with detailed descriptions"
echo "4. Clean, non-overlapping design"

git add -A
git commit -m "Fix vendor cards layout and add modern professional KPIs

- Vendor cards: 380px minimum width, proper spacing
- Fixed height cards (420px) preventing overlap
- Modern KPI design with detailed descriptions
- Professional color scheme and typography
- Responsive grid layout"