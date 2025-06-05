#!/bin/bash

echo "🚀 Deploying TCO Analyzer Enhancements..."

# Copy enhancement files to web directory
cp -r tco-enhancements /var/www/html/

# Update index.html
echo "📝 Updating index.html..."
# Add script tags before closing body tag
sed -i '/<\/body>/i \
<script src="/tco-enhancements/data/comprehensive-vendor-database.js"></script>\
<script src="/tco-enhancements/ui/vendor-pills-ui.js"></script>\
<script src="/tco-enhancements/visualizations/explosive-charts.js"></script>\
<script src="/tco-enhancements/integrate-enhancements.js"></script>' /var/www/html/index.html

echo "✅ Deployment complete!"
echo "🎉 Your TCO Analyzer now has:"
echo "   - Comprehensive vendor database with ALL costs"
echo "   - Enhanced vendor selection pills"
echo "   - Explosive visualizations"
echo "   - Complete hidden cost analysis"
echo ""
echo "Open your browser and refresh to see the enhancements!"
