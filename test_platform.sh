#!/bin/bash

echo "🧪 Testing Portnox Executive Platform..."

# Function to check URL
check_url() {
    if curl -s -o /dev/null -w "%{http_code}" "$1" | grep -q "200"; then
        echo "✅ $2"
    else
        echo "❌ $2"
    fi
}

# Check local files
echo "📁 Checking local files..."
files_to_check=(
    "index.html"
    "css/main.css"
    "js/modules/executive-platform.js"
    "js/modules/platform-init.js"
    "js/core/module-loader.js"
    "js/data/vendor-database.js"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

# Check CDN resources
echo ""
echo "🌐 Checking CDN resources..."
check_url "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" "Font Awesome CSS"
check_url "https://code.highcharts.com/highcharts.js" "Highcharts Core"

echo ""
echo "📋 Manual Testing Checklist:"
echo "================================"
echo "1. Visual Design"
echo "   □ Dark theme with gradient backgrounds"
echo "   □ Teal accent color (#00d4aa) visible"
echo "   □ Professional card layouts"
echo "   □ Smooth hover effects"
echo ""
echo "2. Navigation"
echo "   □ All tabs clickable and load content"
echo "   □ Active tab highlighted with gradient"
echo "   □ Sticky header and navigation"
echo ""
echo "3. Executive Dashboard"
echo "   □ 4 KPI cards with metrics"
echo "   □ TCO comparison chart loads"
echo "   □ ROI timeline chart loads"
echo "   □ Quick action buttons work"
echo ""
echo "4. Vendor Selection"
echo "   □ Shows selected vendors with badges"
echo "   □ Can add/remove vendors"
echo "   □ Portnox marked as recommended"
echo ""
echo "5. Interactive Elements"
echo "   □ Device selector changes values"
echo "   □ Price slider updates pricing"
echo "   □ Export dropdown shows options"
echo "   □ Recalculate button works"
echo ""
echo "6. Responsive Design"
echo "   □ Looks good on desktop (1920x1080)"
echo "   □ Tablet view (768px) responsive"
echo "   □ Mobile view stacks properly"
echo ""
echo "🚀 Run './deploy.sh' to start testing!"
