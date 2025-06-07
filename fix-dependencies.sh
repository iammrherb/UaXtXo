#!/bin/bash
# Fix module loading dependencies

echo "🔧 Checking and fixing dependencies..."

# Ensure all JS files exist
js_files=(
    "module-loader.js"
    "vendor-database.js"
    "compliance-database.js"
    "risk-security-database.js"
    "industry-database.js"
    "tco-calculator.js"
    "roi-calculator.js"
    "chart-manager.js"
    "vendor-selection-ui.js"
    "report-generator.js"
    "platform-app.js"
    "init.js"
)

for file in "${js_files[@]}"; do
    if [ ! -f "js/$file" ]; then
        echo "⚠️  Missing: js/$file"
    else
        echo "✓ Found: js/$file"
    fi
done

# Check for external dependencies
echo ""
echo "📦 External dependencies required:"
echo "- Highcharts (loaded from CDN)"
echo "- jsPDF (loaded from CDN)"
echo "- html2canvas (loaded from CDN)"

echo ""
echo "✅ Dependency check complete"
