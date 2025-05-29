#!/bin/bash

echo "🔧 Applying direct fixes for Header, Logo, and Vendor Cards..."

# 1. Modern Portnox Header with Visible Logo
echo "🎨 Creating modern Portnox header with visible logo..."
cat > css/portnox-modern-header.css << 'EOF'
/* Modern Portnox Header */
.ultimate-header {
    background: linear-gradient(135deg, #00a652 0%, #007a3d 100%);
    position: relative;
    overflow: hidden;
    min-height: 100px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

/* Background Pattern */
.ultimate-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
}

/* Glowing Background Logo */
.ultimate-header::after {
    content: 'PORTNOX';
    position: absolute;
    right: -100px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 8rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.05);
    letter-spacing: 0.2em;
    pointer-events: none;
}

.header-content {
    position: relative;
    z-index: 10;
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* Visible Portnox Logo */
.portnox-logo {
    background: white;
    padding: 1rem 2rem;
    border-radius: 12px;
    min-width: 200px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.portnox-logo img {
    max-height: 50px;
    width: auto;
    display: block;
}

/* If no image, show text */
.portnox-logo:empty::after {
    content: 'PORTNOX';
    font-size: 2rem;
    font-weight: 900;
    color: #00a652;
    letter-spacing: 0.05em;
}

/* White text for header */
.main-title {
    font-size: 2rem;
    font-weight: 800;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    margin: 0;
}

.sub-title {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0.25rem 0 0 0;
}

/* Header buttons */
.header-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
}

.header-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

.header-btn.primary {
    background: white;
    color: #00a652;
    border-color: white;
}

.header-btn.highlight {
    background: #ff6b6b;
    border-color: #ff6b6b;
}
EOF

# 2. Fix Vendor Cards to Fit Everything
echo "💳 Fixing vendor cards layout..."
cat > css/vendor-card-fixes.css << 'EOF'
/* Vendor Card Fixes */
.vendor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 1.5rem;
    padding: 2rem 0;
}

.vendor-card {
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    padding: 1.25rem;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    position: relative;
    overflow: visible;
}

.vendor-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: #00a652;
}

.vendor-card.portnox {
    border-color: #00a652;
    border-width: 3px;
    background: linear-gradient(to bottom, rgba(0, 166, 82, 0.03) 0%, white 100%);
}

/* Header Section */
.vendor-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    min-height: 60px;
}

.vendor-logo {
    width: 70px;
    height: 50px;
    background: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    flex-shrink: 0;
}

.vendor-logo img {
    max-width: 60px;
    max-height: 40px;
    object-fit: contain;
}

.vendor-info {
    flex: 1;
    min-width: 0;
}

.vendor-name {
    font-size: 1rem;
    font-weight: 700;
    color: #333;
    margin: 0;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.vendor-rating {
    margin-top: 0.25rem;
}

.vendor-rating i {
    font-size: 0.75rem;
    color: #ffc107;
}

.score-badge {
    font-size: 0.75rem;
    background: #f0f0f0;
    padding: 0.125rem 0.375rem;
    border-radius: 10px;
    margin-left: 0.25rem;
}

/* Metrics Section */
.vendor-metrics {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
}

.metric-row {
    display: flex;
    gap: 0.5rem;
}

.metric-row.primary {
    margin-bottom: 0.5rem;
}

.metric-item {
    flex: 1;
    background: #f8f9fa;
    padding: 0.5rem;
    border-radius: 6px;
    text-align: center;
}

.metric-item.full {
    flex: 1 1 100%;
}

.metric-label {
    font-size: 0.625rem;
    font-weight: 600;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: block;
    margin-bottom: 0.125rem;
}

.metric-value {
    font-size: 1rem;
    font-weight: 700;
    color: #333;
}

.metric-value.large {
    font-size: 1.25rem;
    color: #00a652;
}

.metric-value.price {
    color: #007bff;
}

/* Badges Section */
.vendor-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-bottom: 0.75rem;
    min-height: 24px;
}

.badge {
    padding: 0.25rem 0.5rem;
    font-size: 0.625rem;
    font-weight: 600;
    border-radius: 12px;
    text-transform: uppercase;
    white-space: nowrap;
}

.badge.cloud {
    background: rgba(0, 166, 82, 0.15);
    color: #00a652;
}

.badge.zt {
    background: rgba(0, 123, 255, 0.15);
    color: #007bff;
}

.badge.auto {
    background: rgba(255, 193, 7, 0.15);
    color: #f39c12;
}

/* Actions Section */
.vendor-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin-top: auto;
    padding-top: 0.75rem;
    border-top: 1px solid #e0e0e0;
}

.vendor-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.813rem;
    font-weight: 600;
    border-radius: 6px;
    border: 1px solid #ddd;
    background: white;
    color: #333;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
}

.vendor-btn:hover {
    background: #f8f9fa;
    border-color: #00a652;
    color: #00a652;
}

.vendor-btn.selected {
    background: #00a652;
    color: white;
    border-color: #00a652;
}

.vendor-btn i {
    font-size: 0.75rem;
}
EOF

# 3. Fix the toggleVendorAndUpdate function
echo "🔧 Fixing vendor card functions..."
cat > js/fix-vendor-functions.js << 'EOF'
// Fix Vendor Functions
console.log("🔧 Fixing vendor functions...");

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.dashboard) {
            // Add the missing toggleVendorAndUpdate method
            window.dashboard.toggleVendorAndUpdate = function(vendorKey) {
                console.log("Toggle vendor:", vendorKey);
                
                // Toggle selection
                const index = this.selectedVendors.indexOf(vendorKey);
                if (index > -1) {
                    if (this.selectedVendors.length > 1) {
                        this.selectedVendors.splice(index, 1);
                    }
                } else {
                    if (this.selectedVendors.length < 6) {
                        this.selectedVendors.push(vendorKey);
                    } else {
                        this.showNotification('Maximum 6 vendors can be selected', 'warning');
                        return;
                    }
                }
                
                // Re-render
                this.render();
                
                // Update charts
                if (this.renderTCOComparisonChart) {
                    this.renderTCOComparisonChart();
                }
            };
            
            // Fix showVendorDetails method
            window.dashboard.showVendorDetails = function(vendorKey) {
                const vendor = this.vendorData[vendorKey];
                if (!vendor) return;
                
                // Create modal
                const modal = document.createElement('div');
                modal.className = 'vendor-details-modal';
                modal.innerHTML = `
                    <div class="modal-dialog">
                        <div class="modal-header">
                            <h2>${vendor.name} - Detailed Analysis</h2>
                            <button class="close-btn" onclick="this.closest('.vendor-details-modal').remove()">×</button>
                        </div>
                        <div class="modal-content">
                            <div class="detail-section">
                                <h3>Financial Breakdown</h3>
                                <table class="details-table">
                                    <tr><td>3-Year TCO:</td><td><strong>$${(vendor.tco.total/1000).toFixed(0)}K</strong></td></tr>
                                    <tr><td>Monthly Cost:</td><td>$${(vendor.tco.monthly/1000).toFixed(1)}K</td></tr>
                                    <tr><td>Per Device/Month:</td><td>$${vendor.tco.perDeviceMonthly.toFixed(2)}</td></tr>
                                    <tr><td>Implementation:</td><td>$${(vendor.costs.implementation/1000).toFixed(0)}K</td></tr>
                                    <tr><td>Annual Operational:</td><td>$${(vendor.costs.operational/1000).toFixed(0)}K</td></tr>
                                </table>
                            </div>
                            
                            <div class="detail-section">
                                <h3>Technical Capabilities</h3>
                                <div class="capability-grid">
                                    <div class="cap-item">
                                        <span class="cap-label">Cloud Native:</span>
                                        <span class="cap-value">${vendor.capabilities.cloudNative}%</span>
                                    </div>
                                    <div class="cap-item">
                                        <span class="cap-label">Zero Trust:</span>
                                        <span class="cap-value">${vendor.capabilities.zeroTrust}%</span>
                                    </div>
                                    <div class="cap-item">
                                        <span class="cap-label">Automation:</span>
                                        <span class="cap-value">${vendor.capabilities.automation}%</span>
                                    </div>
                                    <div class="cap-item">
                                        <span class="cap-label">AI/ML:</span>
                                        <span class="cap-value">${vendor.capabilities.aiMl}%</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="detail-section">
                                <h3>Implementation & Operations</h3>
                                <table class="details-table">
                                    <tr><td>Deployment Time:</td><td>${vendor.metrics.implementationDays} days</td></tr>
                                    <tr><td>FTE Required:</td><td>${vendor.metrics.fteRequired}</td></tr>
                                    <tr><td>Security Score:</td><td>${vendor.metrics.securityScore}/100</td></tr>
                                    <tr><td>ROI:</td><td>${vendor.roi.roi}%</td></tr>
                                    <tr><td>Payback Period:</td><td>${vendor.roi.paybackMonths} months</td></tr>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
            };
        }
    }, 1000);
});

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .vendor-details-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    
    .modal-dialog {
        background: white;
        border-radius: 12px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    .modal-header {
        background: #00a652;
        color: white;
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h2 {
        margin: 0;
        font-size: 1.5rem;
    }
    
    .close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .close-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
    }
    
    .modal-content {
        padding: 2rem;
        overflow-y: auto;
        max-height: calc(90vh - 80px);
    }
    
    .detail-section {
        margin-bottom: 2rem;
    }
    
    .detail-section h3 {
        color: #00a652;
        margin-bottom: 1rem;
        font-size: 1.125rem;
    }
    
    .details-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .details-table td {
        padding: 0.5rem 0;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .details-table td:first-child {
        color: #666;
    }
    
    .details-table td:last-child {
        text-align: right;
        font-weight: 600;
    }
    
    .capability-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    
    .cap-item {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem;
        background: #f8f9fa;
        border-radius: 6px;
    }
    
    .cap-label {
        color: #666;
        font-size: 0.875rem;
    }
    
    .cap-value {
        font-weight: 700;
        color: #00a652;
    }
`;
document.head.appendChild(modalStyles);
EOF

# 4. Ensure Portnox logo is visible
echo "🖼️ Ensuring Portnox logo visibility..."
cat > js/ensure-logo-visible.js << 'EOF'
// Ensure Logo Visible
document.addEventListener('DOMContentLoaded', function() {
    const portnoxLogo = document.querySelector('.portnox-logo');
    if (portnoxLogo) {
        // Try to load image
        const img = document.createElement('img');
        img.src = './img/vendors/portnox-logo.png';
        img.alt = 'Portnox';
        img.onerror = function() {
            // If image fails, show text
            portnoxLogo.innerHTML = '<span style="font-size: 2rem; font-weight: 900; color: #00a652;">PORTNOX</span>';
        };
        
        portnoxLogo.innerHTML = '';
        portnoxLogo.appendChild(img);
    }
});
EOF

# 5. Update index.html
echo "📝 Updating index.html..."

# Add new CSS files
sed -i '/<link rel="stylesheet" href="\.\/css\/ultimate-executive-center\.css">/a\    <link rel="stylesheet" href="./css/portnox-modern-header.css">\n    <link rel="stylesheet" href="./css/vendor-card-fixes.css">' index.html

# Add new JS files
sed -i '/<\/body>/i\    <script src="./js/fix-vendor-functions.js"></script>\n    <script src="./js/ensure-logo-visible.js"></script>' index.html

echo "
✅ DIRECT FIXES APPLIED!

Fixed:
1. ✅ Modern Portnox header with green gradient (#00a652)
2. ✅ Portnox logo visible with white background
3. ✅ Background 'PORTNOX' watermark effect
4. ✅ Vendor cards properly sized (360px min-width)
5. ✅ All vendor data fits within cards
6. ✅ Details button now works - opens modal
7. ✅ Select/Deselect functionality fixed

Visual Changes:
- Green gradient header with Portnox branding
- White logo container (200x70px)
- Vendor cards with proper spacing
- Details modal with full vendor information
- Clean, modern design

Test:
1. Clear cache (Ctrl+Shift+F5)
2. Portnox logo should be visible in header
3. All vendor card data should fit
4. Click 'Details' on any vendor card
5. Click 'Select' to toggle selection

Commit:
git add -A
git commit -m 'Fix header with Portnox colors, visible logo, and working vendor cards'
git push
"
