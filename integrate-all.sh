#!/bin/bash

echo "🚀 Integrating all TCO Analyzer enhancements..."

# Check if running in the web directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Please run from your web directory."
    exit 1
fi

# Copy enhancement files
echo "📁 Copying enhancement files..."
cp -r tco-enhancements ./

# Add script tags to index.html if not already present
echo "📝 Updating index.html..."

# Check if enhancements already added
if grep -q "comprehensive-vendor-database.js" index.html; then
    echo "✅ Enhancements already added to index.html"
else
    # Add before closing body tag
    sed -i '/<\/body>/i \
    <!-- TCO Analyzer Enhancements -->\
    <script src="/tco-enhancements/data/comprehensive-vendor-database.js"></script>\
    <script src="/tco-enhancements/ui/vendor-pills-ui.js"></script>\
    <script src="/tco-enhancements/ui/executive-summary-enhanced.js"></script>\
    <script src="/tco-enhancements/visualizations/advanced-charts.js"></script>\
    <script src="/tco-enhancements/ui/explosive-modal.js"></script>\
    <script src="/tco-enhancements/integrate-enhancements.js"></script>' index.html
fi

# Add Highcharts modules if not present
if ! grep -q "highcharts/modules/gantt" index.html; then
    sed -i '/<script.*highcharts\.js/a \
    <script src="https://code.highcharts.com/gantt/highcharts-gantt.js"></script>\
    <script src="https://code.highcharts.com/modules/networkgraph.js"></script>\
    <script src="https://code.highcharts.com/modules/funnel.js"></script>' index.html
fi

echo "✅ Integration complete!"
echo ""
echo "🎉 Your TCO Analyzer now includes:"
echo "   ✓ Comprehensive vendor database (${#vendors[@]} vendors)"
echo "   ✓ ALL hidden costs and licensing details"
echo "   ✓ Enhanced vendor selection pills"
echo "   ✓ Explosive visualizations:"
echo "     - Cost explosion charts"
echo "     - Mind maps"
echo "     - Deployment Gantt charts"
echo "     - Cost reduction funnels"
echo "     - Heat maps"
echo "     - Decision matrices"
echo "   ✓ Enhanced executive summary"
echo ""
echo "🌐 Open your browser and refresh to see all enhancements!"
