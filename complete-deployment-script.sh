#!/bin/bash

# Complete Deployment Script for Enhanced Portnox Total Cost Analyzer
# This script applies all updates including CSS enhancements

echo "🚀 Complete Deployment for Enhanced Portnox Total Cost Analyzer"
echo "=============================================================="

# Set colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to display status
show_status() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

# Function to display success
show_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to display error
show_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Step 1: First run the main update script
show_status "Running main update script..."

# Make it executable and run
chmod +x git-update-enhanced.sh
./git-update-enhanced.sh

if [ $? -ne 0 ]; then
    show_error "Main update script failed. Please check errors above."
    exit 1
fi

show_success "Main updates applied successfully"

# Step 2: Add the enhanced CSS styles
show_status "Adding enhanced chart styles to CSS..."

# Create the enhanced styles CSS file
cat > css/enhanced-chart-styles.css << 'EOF'
/**
 * Enhanced Chart Styles for Portnox Total Cost Analyzer
 * Professional styling for executive-focused visualizations
 */

/* Executive Dashboard Styles */
.executive-dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
    animation: fadeInUp 0.6s ease-out;
}

.metric-card {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.metric-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.metric-card.hero-metric {
    grid-column: span 2;
    background: linear-gradient(135deg, #2E7EE5 0%, #1e5eb8 100%);
    color: white;
}

.metric-card.hero-metric .metric-icon {
    color: rgba(255, 255, 255, 0.9);
}

.metric-icon {
    width: 48px;
    height: 48px;
    background: rgba(46, 126, 229, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #2E7EE5;
    margin-bottom: 16px;
}

.hero-metric .metric-icon {
    background: rgba(255, 255, 255, 0.2);
}

.metric-content h3 {
    font-size: 14px;
    font-weight: 600;
    color: #64748b;
    margin: 0 0 8px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.hero-metric .metric-content h3 {
    color: rgba(255, 255, 255, 0.9);
}

.metric-value {
    font-size: 36px;
    font-weight: 800;
    color: #1e293b;
    margin: 8px 0;
    line-height: 1;
}

.hero-metric .metric-value {
    color: white;
    font-size: 42px;
}

.metric-change {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    margin-right: 8px;
}

.metric-change.positive {
    background: rgba(0, 212, 170, 0.15);
    color: #00a882;
}

.hero-metric .metric-change.positive {
    background: rgba(255, 255, 255, 0.2);
    color: white;
}

.metric-detail {
    font-size: 13px;
    color: #64748b;
    margin-top: 8px;
}

.hero-metric .metric-detail {
    color: rgba(255, 255, 255, 0.8);
}

/* Chart Container Enhancements */
.chart-container {
    background: white;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

.chart-container:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.chart-container.full-width {
    grid-column: 1 / -1;
}

.chart-container h3 {
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.chart-container h3::before {
    content: '';
    width: 4px;
    height: 24px;
    background: #2E7EE5;
    border-radius: 2px;
}

/* Decision Matrix Styles */
.decision-matrix {
    padding: 20px;
}

.matrix-title {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 24px;
    text-align: center;
}

.decision-factors {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.factor-card {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 20px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.factor-card.high-impact {
    border-color: #2E7EE5;
    background: linear-gradient(135deg, #f0f7ff 0%, #e6f2ff 100%);
}

.factor-card.medium-impact {
    border-color: #00D4AA;
    background: linear-gradient(135deg, #f0fdf9 0%, #e6f9f5 100%);
}

.factor-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}

.factor-header i {
    font-size: 24px;
    color: #2E7EE5;
}

.factor-header h4 {
    font-size: 16px;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
    flex: 1;
}

.impact-badge {
    font-size: 11px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.high-impact .impact-badge {
    background: #2E7EE5;
    color: white;
}

.medium-impact .impact-badge {
    background: #00D4AA;
    color: white;
}

.factor-metric {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.factor-metric:last-child {
    border-bottom: none;
}

.metric-label {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
}

.metric-value {
    font-size: 16px;
    font-weight: 700;
    color: #1e293b;
}

/* Recommendation Panel */
.recommendation-panel {
    background: linear-gradient(135deg, #2E7EE5 0%, #1e5eb8 100%);
    color: white;
    border-radius: 16px;
    padding: 30px;
    margin-top: 30px;
    position: relative;
    overflow: hidden;
}

.recommendation-panel::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: pulse 4s ease-in-out infinite;
}

.recommendation-panel h4 {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
    gap: 12px;
}

.recommendation-panel h4 i {
    font-size: 28px;
    color: #FFE66D;
}

.recommendation-content {
    position: relative;
    z-index: 1;
}

.recommendation-text {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 24px;
    color: rgba(255, 255, 255, 0.95);
}

.recommendation-text strong {
    color: #FFE66D;
    font-weight: 700;
}

.action-items {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
    backdrop-filter: blur(10px);
}

.action-items h5 {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 16px 0;
    color: #FFE66D;
}

.action-items ol {
    margin: 0;
    padding-left: 20px;
}

.action-items li {
    font-size: 14px;
    line-height: 1.8;
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.9);
}

/* Chart-specific enhancements */
.highcharts-root {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
}

.highcharts-title {
    font-weight: 700 !important;
}

.highcharts-subtitle {
    font-weight: 400 !important;
    color: #64748b !important;
}

.highcharts-axis-title {
    font-weight: 600 !important;
}

.highcharts-legend-item text {
    font-weight: 500 !important;
}

.highcharts-data-label {
    font-weight: 600 !important;
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1) rotate(0deg);
    }
    50% {
        transform: scale(1.1) rotate(180deg);
    }
}

/* Responsive Design */
@media (max-width: 1200px) {
    .executive-dashboard-grid {
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
    
    .metric-card.hero-metric {
        grid-column: span 1;
    }
    
    .decision-factors {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .executive-dashboard-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }
    
    .metric-value {
        font-size: 28px;
    }
    
    .hero-metric .metric-value {
        font-size: 32px;
    }
    
    .chart-container {
        padding: 16px;
        margin-bottom: 16px;
    }
    
    .recommendation-panel {
        padding: 20px;
    }
}

/* Print Styles */
@media print {
    .metric-card {
        break-inside: avoid;
        box-shadow: none;
        border: 1px solid #e5e7eb;
    }
    
    .chart-container {
        break-inside: avoid;
        box-shadow: none;
        border: 1px solid #e5e7eb;
        margin-bottom: 20px;
    }
    
    .recommendation-panel {
        background: #f8f9fa;
        color: #1e293b;
        border: 2px solid #2E7EE5;
    }
    
    .recommendation-panel h4 i,
    .recommendation-text strong {
        color: #2E7EE5;
    }
    
    .action-items {
        background: white;
        border: 1px solid #e5e7eb;
    }
    
    .action-items h5 {
        color: #2E7EE5;
    }
    
    .action-items li {
        color: #1e293b;
    }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
    .metric-card {
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        border-color: rgba(255, 255, 255, 0.1);
        color: #e5e7eb;
    }
    
    .metric-icon {
        background: rgba(46, 126, 229, 0.2);
    }
    
    .metric-content h3 {
        color: #94a3b8;
    }
    
    .metric-value {
        color: white;
    }
    
    .metric-detail {
        color: #94a3b8;
    }
    
    .chart-container {
        background: #1e293b;
        border-color: rgba(255, 255, 255, 0.1);
    }
    
    .chart-container h3 {
        color: white;
    }
    
    .factor-card {
        background: #0f172a;
        color: #e5e7eb;
    }
    
    .factor-header h4 {
        color: white;
    }
    
    .metric-label {
        color: #94a3b8;
    }
    
    .metric-value {
        color: white;
    }
}
EOF

# Append to existing CSS file
if [ -f "css/ultimate-executive-center.css" ]; then
    show_status "Appending enhanced styles to ultimate-executive-center.css..."
    echo "" >> css/ultimate-executive-center.css
    echo "/* Enhanced Chart Styles - Added $(date) */" >> css/ultimate-executive-center.css
    cat css/enhanced-chart-styles.css >> css/ultimate-executive-center.css
    show_success "Enhanced styles added to existing CSS"
else
    show_error "ultimate-executive-center.css not found. Creating new file..."
    cp css/enhanced-chart-styles.css css/ultimate-executive-center.css
    show_success "Created new CSS file with enhanced styles"
fi

# Step 3: Verify all files are in place
show_status "Verifying installation..."

files_to_check=(
    "js/data/complete-vendor-data.js"
    "js/enhancements/ultimate-chart-system.js"
    "js/integration/enhanced-platform-integration.js"
    "css/enhanced-chart-styles.css"
)

all_files_present=true
for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        show_success "$file is present"
    else
        show_error "$file is missing"
        all_files_present=false
    fi
done

if [ "$all_files_present" = false ]; then
    show_error "Some files are missing. Please check the installation."
    exit 1
fi

# Step 4: Create a test HTML file for quick verification
show_status "Creating test verification file..."

cat > test-enhanced-features.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Enhanced Features Test - Portnox Total Cost Analyzer</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            padding: 20px;
            background: #f5f5f5;
        }
        .test-section {
            background: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .status { 
            padding: 5px 10px;
            border-radius: 4px;
            display: inline-block;
            font-weight: bold;
        }
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
        h1 { color: #2E7EE5; }
    </style>
</head>
<body>
    <h1>Enhanced Features Test</h1>
    
    <div class="test-section">
        <h2>Component Status</h2>
        <div id="status-checks"></div>
    </div>
    
    <div class="test-section">
        <h2>Vendor Data Summary</h2>
        <div id="vendor-summary"></div>
    </div>
    
    <script>
        // Check if components are loaded
        const checks = [
            { name: 'Complete Vendor Data', test: () => window.completeVendorData && Object.keys(window.completeVendorData).length === 15 },
            { name: 'Ultimate Chart System', test: () => window.ultimateChartSystem },
            { name: 'Comprehensive Industries', test: () => window.comprehensiveIndustries },
            { name: 'Comprehensive Compliance', test: () => window.comprehensiveCompliance }
        ];
        
        const statusDiv = document.getElementById('status-checks');
        checks.forEach(check => {
            const status = check.test() ? 'success' : 'error';
            const text = check.test() ? 'Loaded' : 'Not Found';
            statusDiv.innerHTML += `<p>${check.name}: <span class="status ${status}">${text}</span></p>`;
        });
        
        // Show vendor summary if loaded
        if (window.completeVendorData) {
            const summaryDiv = document.getElementById('vendor-summary');
            const vendors = Object.values(window.completeVendorData);
            summaryDiv.innerHTML = `
                <p>Total Vendors: ${vendors.length}</p>
                <p>Vendors: ${vendors.map(v => v.name).join(', ')}</p>
                <p>Portnox TCO: $${(window.completeVendorData.portnox.costs.tco3Year / 1000).toFixed(0)}K</p>
            `;
        }
    </script>
    
    <script src="./js/data/complete-vendor-data.js"></script>
    <script src="./js/enhancements/ultimate-chart-system.js"></script>
</body>
</html>
EOF

show_success "Created test-enhanced-features.html"

# Step 5: Commit all changes
show_status "Committing all enhanced features to git..."

git add -A
git commit -m "Complete deployment of enhanced Portnox Total Cost Analyzer

- Added enhanced CSS styles for executive dashboard and charts
- Integrated all chart improvements with professional styling
- Added responsive design and dark mode support
- Created test verification file
- Full deployment with all 15 vendors and 7 new chart types
- Executive-focused visualizations ready for all audiences"

show_success "All changes committed to git"

# Step 6: Final summary
echo ""
echo "=============================================================="
show_success "Complete Deployment Successful! 🎉"
echo ""
echo "📊 Enhanced Features Deployed:"
echo "   ✅ 15 complete vendor profiles with detailed metrics"
echo "   ✅ Executive Dashboard with key performance indicators"
echo "   ✅ TCO Waterfall Chart showing savings breakdown"
echo "   ✅ Competitive Positioning Matrix"
echo "   ✅ ROI Timeline Comparison"
echo "   ✅ Security Capabilities Radar Chart"
echo "   ✅ Compliance Coverage Heatmap"
echo "   ✅ Executive Decision Matrix"
echo "   ✅ Professional CSS styling with animations"
echo "   ✅ Responsive design for all devices"
echo "   ✅ Dark mode support"
echo ""
echo "🧪 To verify installation:"
echo "   1. Open test-enhanced-features.html in your browser"
echo "   2. Check that all components show 'Loaded' status"
echo "   3. Open index.html to see the full application"
echo ""
echo "📈 Next Steps:"
echo "   1. Test with stakeholders from each target audience"
echo "   2. Gather feedback on chart effectiveness"
echo "   3. Fine-tune metrics based on actual use cases"
echo "   4. Consider adding real-time data integration"
echo ""
echo "🚀 To push to remote repository:"
echo "   git push origin main"
echo ""
show_success "Portnox Total Cost Analyzer is now fully enhanced and ready!"
echo "=============================================================="
