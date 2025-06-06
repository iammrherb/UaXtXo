#!/bin/bash

echo "🎨 Fixing to EXACT Portnox theme - LIGHT and VISIBLE..."

# Fix 1: EXACT colors from the image - NO DARK MODE
cat > css/portnox-exact-theme.css << 'EOF'
/* EXACT Portnox Colors from Image */
:root {
    --portnox-teal: #00D4AA;  /* The actual teal from logo */
    --portnox-purple: #8B5CF6;
    --portnox-green: #10B981;
    --portnox-blue: #3B82F6;
    
    /* Backgrounds - ALL LIGHT */
    --portnox-bg-main: #F9FAFB;
    --portnox-bg-white: #FFFFFF;
    --portnox-bg-light-gray: #F3F4F6;
    --portnox-bg-header: #2D3748;  /* Only header is dark */
    
    /* Text colors */
    --portnox-text-dark: #111827;
    --portnox-text-medium: #4B5563;
    --portnox-text-light: #6B7280;
    
    /* Borders and shadows */
    --portnox-border: #E5E7EB;
    --portnox-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    --portnox-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* FORCE LIGHT THEME EVERYWHERE */
* {
    box-sizing: border-box;
}

body {
    background: var(--portnox-bg-main) !important;
    color: var(--portnox-text-dark) !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
}

/* Header - Dark but with proper contrast */
.premium-header {
    background: var(--portnox-bg-header);
    padding: 1rem 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.platform-title h1 {
    color: var(--portnox-teal) !important;
    font-size: 1.75rem;
    font-weight: 400;
}

.subtitle-animated {
    color: #CBD5E0 !important;
}

/* Header buttons */
.control-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white !important;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
}

.control-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: var(--portnox-teal);
}

.control-btn i {
    color: white !important;
}

.control-btn.cost-controls {
    background: var(--portnox-purple);
    border-color: var(--portnox-purple);
}

.control-btn.demo {
    background: var(--portnox-purple);
    border: none;
}

/* Main container - LIGHT */
.premium-platform {
    background: var(--portnox-bg-main) !important;
    padding-top: 80px;
    min-height: 100vh;
}

/* Vendor Selection - WHITE background */
.vendor-selection-bar {
    background: var(--portnox-bg-white) !important;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem;
    box-shadow: var(--portnox-shadow);
}

.vendor-selection-bar h3 {
    color: var(--portnox-text-dark) !important;
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
}

.vendor-selection-bar p {
    color: var(--portnox-text-medium) !important;
    font-size: 0.875rem;
}

/* Vendor Pills - WHITE with visible borders */
.vendor-chip {
    background: var(--portnox-bg-white) !important;
    border: 2px solid var(--portnox-border) !important;
    border-radius: 24px;
    padding: 0.625rem 1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    min-height: 48px;
    margin: 0.25rem;
    transition: all 0.2s;
}

.vendor-chip:hover {
    border-color: var(--portnox-teal) !important;
    box-shadow: 0 2px 8px rgba(0, 212, 170, 0.2);
}

.vendor-chip.portnox-chip {
    background: rgba(0, 212, 170, 0.1) !important;
    border-color: var(--portnox-teal) !important;
}

/* LARGE LOGOS */
.vendor-chip img {
    height: 32px !important;
    width: auto !important;
    max-width: 100px !important;
    object-fit: contain !important;
}

.vendor-chip .vendor-text {
    color: var(--portnox-text-dark) !important;
    font-weight: 500;
    font-size: 0.875rem;
}

.remove-vendor {
    background: none !important;
    border: none !important;
    color: var(--portnox-text-light) !important;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0 0 0 0.5rem;
    line-height: 1;
}

/* Add Competitor Button - Bright Green */
.add-vendor-btn {
    background: var(--portnox-teal) !important;
    color: white !important;
    border: none;
    padding: 0.625rem 1.25rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.add-vendor-btn:hover {
    background: #00B894 !important;
    transform: translateY(-1px);
}

/* Navigation Tabs - WHITE background */
.premium-nav {
    background: var(--portnox-bg-white) !important;
    border-radius: 12px;
    padding: 0.5rem;
    margin: 1.5rem;
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
    flex: 1;
    text-align: center;
    transition: all 0.2s;
}

.nav-tab * {
    color: var(--portnox-text-medium) !important;
}

.nav-tab:hover {
    background: var(--portnox-bg-light-gray);
}

.nav-tab.active {
    background: var(--portnox-purple) !important;
}

.nav-tab.active * {
    color: white !important;
}

/* Content Area - WHITE */
.analysis-content {
    background: var(--portnox-bg-white) !important;
    border-radius: 12px;
    padding: 2rem;
    margin: 0 1.5rem 2rem;
    box-shadow: var(--portnox-shadow);
}

/* ALL TEXT MUST BE DARK */
.analysis-content h1,
.analysis-content h2,
.analysis-content h3,
.analysis-content h4,
.analysis-content p,
.analysis-content span,
.analysis-content div {
    color: var(--portnox-text-dark) !important;
}

/* Metric Cards - WHITE */
.metric-card {
    background: var(--portnox-bg-white) !important;
    border: 1px solid var(--portnox-border) !important;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: var(--portnox-shadow);
}

.metric-card h4 {
    color: var(--portnox-text-dark) !important;
    font-size: 0.875rem;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
}

.metric-value {
    color: var(--portnox-teal) !important;
    font-size: 2.5rem !important;
    font-weight: 700 !important;
    margin: 0.5rem 0;
}

.metric-card p {
    color: var(--portnox-text-medium) !important;
    font-size: 0.875rem;
}

/* Charts - WHITE background with visible data */
.chart-container {
    background: var(--portnox-bg-white) !important;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: var(--portnox-shadow);
}

.chart-container h3 {
    color: var(--portnox-text-dark) !important;
    margin-bottom: 1rem;
}

/* Highcharts text visibility */
.highcharts-background {
    fill: #FFFFFF;
}

.highcharts-title,
.highcharts-axis-title,
.highcharts-axis-labels text,
.highcharts-legend-item text,
.highcharts-data-label text {
    fill: var(--portnox-text-dark) !important;
}

/* Pricing Bar - Bottom left with dark background */
.portnox-pricing-bar {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: var(--portnox-bg-header);
    border-radius: 12px;
    padding: 1rem 1.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 100;
    min-width: 300px;
}

.pricing-label {
    color: white !important;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.portnox-logo-small {
    height: 24px;
}

.price-label {
    color: var(--portnox-teal) !important;
    font-size: 1.25rem;
    font-weight: 700;
}

#portnox-pricing-slider {
    width: 100%;
    margin-top: 0.5rem;
}

/* Modal - LIGHT backgrounds */
.modal-backdrop {
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background: var(--portnox-bg-white) !important;
    border-radius: 12px;
    box-shadow: var(--portnox-shadow-lg);
}

.modal-header {
    background: var(--portnox-bg-light-gray) !important;
    padding: 1.5rem;
    border-bottom: 1px solid var(--portnox-border);
    border-radius: 12px 12px 0 0;
}

.modal-header h2 {
    color: var(--portnox-text-dark) !important;
    margin: 0;
}

/* Vendor Selector Modal - LARGE LOGOS */
.vendor-option {
    background: var(--portnox-bg-white) !important;
    border: 2px solid var(--portnox-border) !important;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
}

.vendor-option:hover {
    border-color: var(--portnox-teal) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 212, 170, 0.2);
}

.vendor-option.selected {
    background: rgba(0, 212, 170, 0.1) !important;
    border-color: var(--portnox-teal) !important;
}

.vendor-option img {
    height: 50px !important;
    width: auto !important;
    max-width: 140px !important;
    object-fit: contain !important;
    margin-bottom: 0.75rem;
}

.vendor-option h4 {
    color: var(--portnox-text-dark) !important;
    font-size: 0.9rem;
    margin: 0.5rem 0;
}

.vendor-option p {
    color: var(--portnox-text-medium) !important;
    font-size: 0.75rem;
}

.vendor-price {
    color: var(--portnox-teal) !important;
    font-weight: 600;
    font-size: 0.875rem;
}

/* Fix ALL dark backgrounds except header */
.glass-card,
.settings-modal .modal-content,
.vendor-selector-modal .modal-content,
.setting-item,
.compliance-card,
.framework-card,
.report-card,
.advantage-card,
.recommendations-section {
    background: var(--portnox-bg-white) !important;
}

/* Ensure all text is visible */
h1, h2, h3, h4, h5, h6, p, span, div, label, td, th {
    color: var(--portnox-text-dark) !important;
}

/* Only allow white text in dark areas */
.premium-header *,
.portnox-pricing-bar *,
.nav-tab.active *,
.btn-primary,
.control-btn {
    color: white !important;
}

/* Button styles */
.btn-primary {
    background: var(--portnox-purple) !important;
    color: white !important;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
}

.btn-secondary {
    background: var(--portnox-bg-white) !important;
    border: 2px solid var(--portnox-border) !important;
    color: var(--portnox-text-dark) !important;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
}
EOF

# Fix 2: Update chart visibility
cat > js/views/fix-chart-visibility.js << 'EOF'
// Fix chart visibility
(function() {
    console.log('📊 Fixing chart visibility...');
    
    // Override Highcharts default theme
    if (window.Highcharts) {
        Highcharts.setOptions({
            chart: {
                backgroundColor: '#FFFFFF',
                style: {
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }
            },
            title: {
                style: {
                    color: '#111827',
                    fontSize: '18px',
                    fontWeight: '600'
                }
            },
            subtitle: {
                style: {
                    color: '#4B5563'
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#4B5563'
                    }
                },
                title: {
                    style: {
                        color: '#111827'
                    }
                }
            },
            yAxis: {
                labels: {
                    style: {
                        color: '#4B5563'
                    }
                },
                title: {
                    style: {
                        color: '#111827'
                    }
                }
            },
            legend: {
                itemStyle: {
                    color: '#111827'
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        color: '#111827',
                        style: {
                            textOutline: 'none'
                        }
                    }
                }
            },
            colors: ['#00D4AA', '#8B5CF6', '#10B981', '#3B82F6', '#F59E0B', '#EF4444']
        });
    }
})();
EOF

# Update index.html
cat > apply-exact-theme.sh << 'EOF'
#!/bin/bash

# Replace CSS
sed -i 's/portnox-actual-colors\.css/portnox-exact-theme.css/g' index.html

# Add chart visibility fix
sed -i '/<script src="\.\/js\/views\/vendor-logos-large\.js"><\/script>/a\
    <script src="./js/views/fix-chart-visibility.js"></script>' index.html

echo "✅ Exact theme applied"
EOF

chmod +x apply-exact-theme.sh
./apply-exact-theme.sh

# Commit
git add -A
git commit -m "Fix to EXACT Portnox theme - light backgrounds, visible text, proper teal color"
git push

echo "✅ FIXED to EXACT theme!"
echo ""
echo "Changes:"
echo "1. ✅ Using EXACT colors from image (including teal #00D4AA)"
echo "2. ✅ ALL LIGHT BACKGROUNDS (white cards on light gray)"
echo "3. ✅ ALL TEXT IS DARK AND VISIBLE"
echo "4. ✅ Charts have white backgrounds with dark text"
echo "5. ✅ Only header and pricing bar are dark"
echo "6. ✅ Large vendor logos (32px pills, 50px modal)"
echo ""
echo "Refresh to see the EXACT Portnox theme!"
