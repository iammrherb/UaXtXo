#!/bin/bash

echo "🎨 Matching the dark blue professional theme from screenshot..."

# 1. Dark Blue Professional Header
cat > css/dark-professional-theme.css << 'EOF'
/* Dark Professional Theme - Matching Screenshot */
body {
    background: #f5f7fa;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Header with dark blue */
.ultimate-header {
    background: #1a365d;
    padding: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: none;
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    max-width: 100%;
}

/* Logo and title */
.header-branding {
    display: flex;
    align-items: center;
    gap: 20px;
}

.portnox-logo img {
    height: 36px;
    width: auto;
    filter: brightness(0) invert(1);
}

.header-titles {
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    padding-left: 20px;
    margin-left: 20px;
}

.main-title {
    font-size: 20px;
    font-weight: 600;
    color: white;
    margin: 0;
}

.sub-title {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    margin: 2px 0 0 0;
}

/* Header buttons */
.header-actions {
    display: flex;
    gap: 12px;
}

.header-btn {
    background: rgba(255, 255, 255, 0.15);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
}

.header-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.3);
}

.header-btn.primary {
    background: white;
    color: #1a365d;
    border: none;
}

.header-btn.primary:hover {
    background: #f0f0f0;
}

/* Tab Navigation */
.tab-navigation {
    background: white;
    padding: 0;
    display: flex;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.tab-btn {
    background: none;
    border: none;
    padding: 20px 30px;
    color: #64748b;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    position: relative;
    transition: all 0.2s;
}

.tab-btn i {
    font-size: 20px;
}

.tab-btn:hover {
    color: #334155;
    background: #f8fafc;
}

.tab-btn.active {
    color: #2563eb;
    background: #eff6ff;
}

.tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #2563eb;
}

/* Vendor Selection Pills */
.vendor-selection-container {
    background: white;
    padding: 20px;
    margin: 20px;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.vendor-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
}

.vendor-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s;
}

.vendor-pill:hover {
    border-color: #9ca3af;
    background: #f9fafb;
}

.vendor-pill.selected {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
}

.vendor-pill img {
    height: 20px;
    width: 20px;
    object-fit: contain;
}

/* Industry Dropdown */
.industry-selector {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
}

.industry-selector label {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
}

.industry-selector select {
    padding: 8px 32px 8px 12px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    background: white;
    cursor: pointer;
}

/* Content Area */
.tab-content {
    padding: 20px;
}

/* KPI Cards */
.kpis-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.kpi-card {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.kpi-icon {
    width: 48px;
    height: 48px;
    background: #eff6ff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
}

.kpi-icon i {
    font-size: 24px;
    color: #2563eb;
}

.kpi-value {
    font-size: 32px;
    font-weight: 700;
    color: #1e293b;
    margin: 8px 0;
}

.kpi-label {
    font-size: 14px;
    color: #64748b;
    margin: 0;
}

.kpi-change {
    font-size: 13px;
    color: #10b981;
    margin-top: 8px;
}

/* Charts */
.chart-container {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    margin-bottom: 20px;
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.chart-title {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
}

/* Sidebar */
.ultimate-sidebar {
    background: white;
    border-right: 1px solid #e5e7eb;
    padding: 20px;
}

.config-section {
    margin-bottom: 24px;
}

.config-section h4 {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    margin: 0 0 12px 0;
    display: flex;
    align-items: center;
    gap: 8px;
}

.config-section h4 i {
    color: #6b7280;
}

.enhanced-input,
.enhanced-select {
    width: 100%;
    padding: 8px 12px;
    border: 2px solid #e5e7eb;
    border-radius: 6px;
    font-size: 14px;
    transition: all 0.2s;
}

.enhanced-input:focus,
.enhanced-select:focus {
    outline: none;
    border-color: #2563eb;
}

/* Update main container */
.ultimate-container {
    display: flex;
    height: calc(100vh - 60px);
    background: #f5f7fa;
}

.ultimate-content {
    flex: 1;
    overflow-y: auto;
    background: #f5f7fa;
}
EOF

# 2. Fix vendor card display to be cleaner
cat > css/clean-vendor-cards.css << 'EOF'
/* Clean Vendor Cards */
.vendor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    padding: 0;
}

.vendor-card {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    transition: all 0.2s;
    cursor: pointer;
}

.vendor-card:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.vendor-card.portnox {
    border-color: #2563eb;
}

.vendor-card.selected {
    border-color: #2563eb;
    background: #f0f9ff;
}

.vendor-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}

.vendor-logo {
    width: 40px;
    height: 40px;
}

.vendor-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.vendor-info h4 {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
}

.vendor-rating {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 4px;
}

.vendor-rating i {
    font-size: 12px;
    color: #facc15;
}

.score-badge {
    font-size: 12px;
    color: #64748b;
    margin-left: 4px;
}

.vendor-metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 16px 0;
}

.metric-item {
    text-align: center;
}

.metric-label {
    font-size: 11px;
    text-transform: uppercase;
    color: #6b7280;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
}

.metric-value {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
}

.vendor-badges {
    font-size: 12px;
    color: #64748b;
    margin: 12px 0;
    min-height: 20px;
}

.vendor-actions {
    display: flex;
    gap: 8px;
    margin-top: 16px;
}

.vendor-btn {
    flex: 1;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    border: 1px solid #e5e7eb;
    background: white;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s;
}

.vendor-btn:hover {
    background: #f9fafb;
    border-color: #d1d5db;
}

.vendor-btn.selected {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
}
EOF

# 3. Update JavaScript to create vendor pills
cat > js/create-vendor-pills.js << 'EOF'
// Create vendor selection pills
document.addEventListener('DOMContentLoaded', function() {
    // Create vendor pills UI after overview renders
    const originalRenderOverview = window.dashboard?.renderOverview;
    if (originalRenderOverview) {
        window.dashboard.renderOverview = function(container) {
            // Call original
            originalRenderOverview.call(this, container);
            
            // Add vendor pills section
            const kpisGrid = container.querySelector('.kpis-grid');
            if (kpisGrid && !container.querySelector('.vendor-selection-container')) {
                const vendorPillsHTML = `
                    <div class="vendor-selection-container">
                        <div class="vendor-pills">
                            ${Object.values(this.vendorData || {}).slice(0, 8).map(vendor => `
                                <div class="vendor-pill ${this.selectedVendors.includes(vendor.key) ? 'selected' : ''}" 
                                     onclick="dashboard.toggleVendorPill('${vendor.key}')">
                                    <img src="./img/vendors/${vendor.key}-logo.png" 
                                         onerror="this.style.display='none'">
                                    ${vendor.name}
                                </div>
                            `).join('')}
                            
                            <div class="industry-selector">
                                <label>Industry:</label>
                                <select onchange="dashboard.updateIndustry(this.value)">
                                    <option value="all">All Industries</option>
                                    <option value="technology">Technology</option>
                                    <option value="finance">Financial Services</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="government">Government</option>
                                </select>
                            </div>
                        </div>
                    </div>
                `;
                
                kpisGrid.insertAdjacentHTML('afterend', vendorPillsHTML);
            }
        };
        
        // Add toggle method for pills
        window.dashboard.toggleVendorPill = function(vendorKey) {
            this.toggleVendor(vendorKey);
            
            // Update pill UI
            document.querySelectorAll('.vendor-pill').forEach(pill => {
                const vendorName = pill.textContent.trim();
                const vendor = Object.values(this.vendorData).find(v => v.name === vendorName);
                if (vendor) {
                    pill.classList.toggle('selected', this.selectedVendors.includes(vendor.key));
                }
            });
        };
        
        window.dashboard.updateIndustry = function(industry) {
            console.log('Industry selected:', industry);
            // Add industry filtering logic here
        };
    }
});
EOF

# 4. Update index.html
echo "Updating index.html..."

# Remove old theme CSS
sed -i '/restore-portnox-header.css/d' index.html
sed -i '/fix-vendor-cards-final.css/d' index.html

# Add new theme CSS
sed -i '/<link rel="stylesheet" href=".\/css\/ui-enhancements.css">/a\
    <link rel="stylesheet" href="./css/dark-professional-theme.css">\
    <link rel="stylesheet" href="./css/clean-vendor-cards.css">' index.html

# Add vendor pills script
sed -i '/<script src=".\/js\/test-all-features.js"><\/script>/a\
    <script src="./js/create-vendor-pills.js"></script>' index.html

# 5. Fix tab icons
cat > js/add-tab-icons.js << 'EOF'
// Add icons to tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabIcons = {
        'overview': 'fa-chart-line',
        'financial': 'fa-dollar-sign',
        'vendors': 'fa-users',
        'industries': 'fa-industry',
        'risk': 'fa-shield-alt',
        'insights': 'fa-brain'
    };
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const tabName = btn.dataset.tab;
        const icon = tabIcons[tabName];
        if (icon && !btn.querySelector('i')) {
            const iconHtml = `<i class="fas ${icon}"></i>`;
            btn.innerHTML = iconHtml + btn.innerHTML;
        }
    });
});
EOF

sed -i '/<script src=".\/js\/create-vendor-pills.js"><\/script>/a\
    <script src="./js/add-tab-icons.js"></script>' index.html

echo "✅ Done! Dark blue professional theme applied:"
echo "- Dark blue header (#1a365d) matching screenshot"
echo "- Clean white content areas with subtle shadows"
echo "- Vendor selection pills with logos"
echo "- Tab navigation with icons"
echo "- Professional typography and spacing"

git add -A
git commit -m "Apply dark blue professional theme matching screenshot

- Dark blue header (#1a365d) with white text
- Vendor selection pills with logos
- Tab navigation with icons
- Clean white cards with subtle shadows
- Professional spacing and typography
- Industry dropdown selector"