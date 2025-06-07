#!/bin/bash
# Deploy Enhanced NAC Platform

echo "🚀 Deploying Enhanced NAC Executive Platform"
echo "==========================================="

# Create all necessary directories
echo "📁 Creating directory structure..."
directories=(
    "css"
    "js/controllers"
    "js/data"
    "js/views"
    "js/utils"
    "img/vendors"
    "img/integrations"
)

for dir in "${directories[@]}"; do
    mkdir -p "$dir"
    echo "✓ Created $dir"
done

# Run vendor logo setup
echo "🖼️ Setting up vendor and integration logos..."
if [ -f "create-integration-logos.sh" ]; then
    chmod +x create-integration-logos.sh
    ./create-integration-logos.sh
fi

# Backup existing index.html if it exists
if [ -f "index.html" ]; then
    timestamp=$(date +%Y%m%d-%H%M%S)
    cp index.html "index-backup-${timestamp}.html"
    echo "✓ Backed up existing index.html"
fi

# Copy the complete index.html
if [ -f "index-complete.html" ]; then
    cp index-complete.html index.html
    echo "✓ Updated index.html"
fi

# Add platform comprehensive CSS to index if not already included
if ! grep -q "platform-comprehensive.css" index.html; then
    sed -i '/<\/head>/i <link rel="stylesheet" href="./css/platform-comprehensive.css">' index.html
    echo "✓ Added platform-comprehensive.css to index.html"
fi

# Verify all critical files exist
echo ""
echo "🔍 Verifying installation..."
critical_files=(
    # CSS files
    "css/portnox-brand-colors.css"
    "css/portnox-modern-ui.css"
    "css/compliance-view.css"
    "css/global-settings.css"
    "css/platform-comprehensive.css"
    
    # Controller
    "js/controllers/platform-controller.js"
    
    # Data files
    "js/data/vendor-database-complete.js"
    "js/data/compliance-frameworks-complete.js"
    
    # View files
    "js/views/compliance-view-fixed.js"
    "js/views/compliance-view-enhanced.js"
    "js/views/financial-view.js"
    "js/views/risk-security-view.js"
    "js/views/operational-view.js"
    "js/views/platform-view-integration.js"
    
    # Fix files
    "js/views/platform-fixes.js"
    "js/views/fix-vendor-logos.js"
)

all_good=true
missing_files=()

for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file"
    else
        echo "✗ Missing: $file"
        missing_files+=("$file")
        all_good=false
    fi
done

# Check for logo files
echo ""
echo "🖼️ Checking logo files..."
logo_count=$(ls -1 img/vendors/*.svg 2>/dev/null | wc -l)
integration_count=$(ls -1 img/integrations/*.svg 2>/dev/null | wc -l)
echo "✓ Found $logo_count vendor logos"
echo "✓ Found $integration_count integration logos"

if $all_good; then
    echo ""
    echo "✅ Enhanced NAC Executive Platform deployed successfully!"
    echo ""
    echo "🎉 Platform Features:"
    echo "   ✓ Global organization settings panel"
    echo "   ✓ Industry and size dropdowns"
    echo "   ✓ Device count slider with pricing control"
    echo "   ✓ All compliance frameworks integrated"
    echo "   ✓ Vendor comparison with all competitors"
    echo "   ✓ Financial analysis view"
    echo "   ✓ Risk & Security assessment"
    echo "   ✓ Operational efficiency analysis"
    echo "   ✓ Enhanced compliance charts and workflows"
    echo ""
    echo "📊 Key Enhancements:"
    echo "   • Comprehensive TCO/ROI calculations"
    echo "   • Industry-specific risk analysis"
    echo "   • Automated compliance scoring"
    echo "   • Real-time financial projections"
    echo "   • Operational KPI tracking"
    echo ""
    echo "🚀 To start using the platform:"
    echo "   1. Open index.html in your browser"
    echo "   2. Click the settings gear to configure your organization"
    echo "   3. Navigate through all views for comprehensive analysis"
    echo ""
    echo "💡 Pro Tips:"
    echo "   • Use the global settings panel to customize all calculations"
    echo "   • Select your industry for tailored compliance recommendations"
    echo "   • Compare multiple vendors side-by-side"
    echo "   • Export comprehensive reports for executive presentations"
else
    echo ""
    echo "⚠️  Some files are missing. Creating them now..."
    
    # Attempt to create missing files with placeholder content
    for file in "${missing_files[@]}"; do
        dir=$(dirname "$file")
        mkdir -p "$dir"
        
        if [[ $file == *.css ]]; then
            echo "/* Placeholder for $file */" > "$file"
        elif [[ $file == *.js ]]; then
            echo "// Placeholder for $file" > "$file"
            echo "console.log('$file loaded');" >> "$file"
        fi
        
        echo "✓ Created placeholder: $file"
    done
    
    echo ""
    echo "⚠️  Created placeholder files. Run the main script to populate with actual content."
fi

echo ""
echo "📝 Configuration Notes:"
echo "   - Default organization: Medium business, Technology industry"
echo "   - Default devices: 5,000"
echo "   - Default Portnox price: $12/device/year"
echo "   - Selected frameworks: SOX, PCI-DSS, GDPR"
echo "   - Comparison vendors: Portnox, Cisco ISE, Aruba ClearPass"
echo ""
echo "All settings can be changed in the global settings panel (gear icon)."
