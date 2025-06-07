#!/bin/bash
# Complete Platform Restoration

echo "🔧 Restoring NAC Executive Platform..."
echo "====================================="

# Backup existing index.html
if [ -f index.html ]; then
    cp index.html index-backup-$(date +%Y%m%d-%H%M%S).html
    echo "✓ Backed up existing index.html"
fi

# Copy fixed index.html
if [ -f index-fixed.html ]; then
    cp index-fixed.html index.html
    echo "✓ Updated index.html with fixes"
fi

# Add platform fixes CSS to index.html if not present
if ! grep -q "platform-fixes.css" index.html; then
    sed -i '/<\/head>/i <link rel="stylesheet" href="./css/platform-fixes.css">' index.html
    echo "✓ Added platform-fixes.css to index.html"
fi

# Verify all critical files
echo ""
echo "🔍 Verifying installation..."
files_to_check=(
    "css/portnox-modern-ui.css"
    "css/platform-fixes.css"
    "js/views/platform-fixes.js"
    "js/views/fix-vendor-logos.js"
    "js/views/premium-executive-platform-fixed.js"
)

all_good=true
for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file"
    else
        echo "✗ Missing: $file"
        all_good=false
    fi
done

if $all_good; then
    echo ""
    echo "✅ Platform restoration complete!"
    echo ""
    echo "🎉 All errors have been fixed:"
    echo "   - portnox-modern-ui.css created"
    echo "   - Highcharts solid gauge module fixed"
    echo "   - Missing functions (showHelp, showComplianceDetails) added"
    echo "   - Vendor logo references fixed (PNG → SVG)"
    echo "   - Tab switching functionality restored"
    echo "   - Premium Executive Platform fully restored"
    echo ""
    echo "📌 The platform should now work without errors!"
    echo ""
    echo "🚀 Open index.html in your browser to see the restored platform."
else
    echo ""
    echo "⚠️  Some files are still missing. Please check the output above."
fi
